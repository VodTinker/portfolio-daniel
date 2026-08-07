export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const amountMsat = url.searchParams.get('amount');

  // Metadata de la dirección bitcoin@vodtinker.dev
  const metadata = JSON.stringify([
    ['text/plain', 'Pago a bitcoin@vodtinker.dev'],
    ['text/identifier', 'bitcoin@vodtinker.dev']
  ]);

  // Si no se especifica cantidad, se devuelve el objeto LNURL-pay inicial
  if (!amountMsat) {
    return new Response(
      JSON.stringify({
        callback: `${url.origin}/.well-known/lnurlp/bitcoin`,
        maxSendable: 100000000000, // 100 BTC max
        minSendable: 1000,          // 1 sat min
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

  // Si se pasa la cantidad, se genera la factura
  const sats = Math.floor(parseInt(amountMsat, 10) / 1000);

  return new Response(
    JSON.stringify({
      status: 'OK',
      reason: 'Genera factura en tu Alby Hub o nodo de casa'
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};
