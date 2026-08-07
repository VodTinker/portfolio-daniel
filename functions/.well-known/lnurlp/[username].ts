// Cloudflare Pages Function — handles /.well-known/lnurlp/[username]

import { finalizeEvent, nip04 } from 'nostr-tools';

const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

interface EventParams {
  request: Request;
  params: {
    username: string;
  };
}

export const onRequestGet = async ({ request, params }: EventParams) => {
  const username = (params.username || 'bitcoin').toLowerCase();
  const url = new URL(request.url);
  const amountMsat = url.searchParams.get('amount');

  const isTestnet = username === 'testnet' || username === 'signet';

  const identifier = `${username}@vodtinker.dev`;
  const description = isTestnet
    ? `Pago a ${identifier} (Signet Testnet)`
    : `Pago a ${identifier} (Bitcoin Mainnet)`;

  const metadata = JSON.stringify([
    ['text/plain', description],
    ['text/identifier', identifier]
  ]);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // Paso 1: Devolver la metadata oficial del LNURL-pay
  if (!amountMsat) {
    return new Response(
      JSON.stringify({
        callback: `https://vodtinker.dev/.well-known/lnurlp/${username}`,
        maxSendable: 100000000000,
        minSendable: 1000,
        metadata: metadata,
        tag: 'payRequest'
      }),
      { headers }
    );
  }

  // Selección de credenciales NWC según la dirección solicitada
  // testnet@vodtinker.dev -> lnd-testnet (Signet)
  // bitcoin@vodtinker.dev -> lnd-mainnet (Mainnet)
  const secretHex = isTestnet
    ? 'bdcb8c94237472c0df977596310ae86431312fa735c571e012e8e7d8f01fa28e'
    : 'b55affb99d04b16b54d96ee7b6b8970546551a26bcd7d0e9ca4e3abd2df13232';

  const walletPubkey = isTestnet
    ? 'f15205b046e89dd798f0c59490c18f740a485f6fa797840da04b8db8c2a95605'
    : 'd4c485eeba8e017faccfe4a41f1703e95fcdd5bf6a927be75cb3108bf0be25ce';

  const relayUrl = 'wss://relay.getalby.com';

  try {
    const amountSats = Math.max(1, Math.floor(parseInt(amountMsat, 10) / 1000));
    const secretBytes = hexToBytes(secretHex);

    const payload = JSON.stringify({
      method: 'make_invoice',
      params: {
        amount: amountSats * 1000,
        description: description
      }
    });

    const encryptedContent = await nip04.encrypt(secretHex, walletPubkey, payload);

    const event = finalizeEvent({
      kind: 23194,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['p', walletPubkey]],
      content: encryptedContent,
    }, secretBytes);

    const invoice = await new Promise<string>((resolve, reject) => {
      const ws = new WebSocket(relayUrl);
      const timer = setTimeout(() => {
        try { ws.close(); } catch {}
        reject(new Error('Timeout conectando con Alby Hub vía Nostr'));
      }, 7000);

      ws.onopen = () => {
        ws.send(JSON.stringify(['REQ', 'sub_nwc', { kinds: [23195], authors: [walletPubkey], '#e': [event.id] }]));
        ws.send(JSON.stringify(['EVENT', event]));
      };

      ws.onmessage = async (msg) => {
        try {
          const data = JSON.parse(msg.data.toString());
          if (Array.isArray(data) && data[0] === 'EVENT' && data[2]?.kind === 23195) {
            clearTimeout(timer);
            ws.close();
            const decrypted = await nip04.decrypt(secretHex, walletPubkey, data[2].content);
            const res = JSON.parse(decrypted);
            if (res.result?.invoice) {
              resolve(res.result.invoice);
            } else {
              reject(new Error(res.error?.message || 'Factura no generada por el nodo'));
            }
          }
        } catch {}
      };

      ws.onerror = (e) => {
        clearTimeout(timer);
        reject(e);
      };
    });

    return new Response(
      JSON.stringify({
        pr: invoice,
        routes: []
      }),
      { headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: 'ERROR', reason: err?.message || 'Error al solicitar la factura NWC' }),
      { status: 500, headers }
    );
  }
};
