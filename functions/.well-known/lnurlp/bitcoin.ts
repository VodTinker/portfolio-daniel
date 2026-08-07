// Cloudflare Pages Function — handles /.well-known/lnurlp/bitcoin

import { finalizeEvent, nip04 } from 'nostr-tools';

const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

export const onRequestGet = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const amountMsat = url.searchParams.get('amount');

  const metadata = JSON.stringify([
    ['text/plain', 'Pago a bitcoin@vodtinker.dev'],
    ['text/identifier', 'bitcoin@vodtinker.dev']
  ]);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // Paso 1: Devolver la metadata oficial del LNURL-pay
  if (!amountMsat) {
    return new Response(
      JSON.stringify({
        callback: 'https://vodtinker.dev/.well-known/lnurlp/bitcoin',
        maxSendable: 100000000000,
        minSendable: 1000,
        metadata: metadata,
        tag: 'payRequest'
      }),
      { headers }
    );
  }

  // Paso 2: Generar la factura dinámicamente mediante Nostr NWC con tu Alby Hub de casa
  const secretHex = 'bdcb8c94237472c0df977596310ae86431312fa735c571e012e8e7d8f01fa28e';
  const walletPubkey = 'f15205b046e89dd798f0c59490c18f740a485f6fa797840da04b8db8c2a95605';
  const relayUrl = 'wss://relay.getalby.com';

  try {
    const amountSats = Math.max(1, Math.floor(parseInt(amountMsat, 10) / 1000));
    const secretBytes = hexToBytes(secretHex);

    const payload = JSON.stringify({
      method: 'make_invoice',
      params: {
        amount: amountSats * 1000,
        description: 'Pago a bitcoin@vodtinker.dev'
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
        reject(new Error('Timeout conectando con Alby Hub local vía Nostr'));
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
