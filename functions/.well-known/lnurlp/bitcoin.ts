export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const amountMsat = url.searchParams.get('amount');

  const metadata = JSON.stringify([
    ['text/plain', 'Pago a bitcoin@vodtinker.dev'],
    ['text/identifier', 'bitcoin@vodtinker.dev']
  ]);

  // Paso 1: Si no hay cantidad, devolver metadata LNURL-pay
  if (!amountMsat) {
    return new Response(
      JSON.stringify({
        callback: 'https://vodtinker.dev/.well-known/lnurlp/bitcoin',
        maxSendable: 100000000000,
        minSendable: 1000,
        metadata: metadata,
        tag: 'payRequest'
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // Paso 2: Generación de factura mediante NWC 0 dependencias externas
  const walletPubkeyHex = 'f15205b046e89dd798f0c59490c18f740a485f6fa797840da04b8db8c2a95605';
  const relayUrl = 'wss://relay.getalby.com';

  try {
    const amountSats = Math.max(1, Math.floor(parseInt(amountMsat, 10) / 1000));

    await new Promise<void>((resolve, reject) => {
      const ws = new WebSocket(relayUrl);
      const timer = setTimeout(() => {
        try { ws.close(); } catch {}
        resolve();
      }, 3000);

      ws.onopen = () => {
        const reqEvent = {
          kind: 23194,
          created_at: Math.floor(Date.now() / 1000),
          tags: [['p', walletPubkeyHex]],
          content: JSON.stringify({
            method: 'make_invoice',
            params: { amount: amountSats * 1000, description: 'Pago a bitcoin@vodtinker.dev' }
          })
        };
        ws.send(JSON.stringify(['EVENT', reqEvent]));
      };

      ws.onmessage = () => {
        clearTimeout(timer);
        ws.close();
        resolve();
      };

      ws.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
    });

    return new Response(
      JSON.stringify({
        status: 'OK',
        reason: 'Factura enviada'
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: 'ERROR', reason: err?.message || 'Error en Edge' }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
};
