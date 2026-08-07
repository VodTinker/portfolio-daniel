// Cloudflare Pages Function — handles /.well-known/lnurlp/bitcoin

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

  // Paso 1: Si no hay cantidad, devolver la metadata oficial del LNURL-pay
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

  // Paso 2: Si la cartera solicita una factura para la cantidad dada
  try {
    const albyResp = await fetch(`https://getalby.com/.well-known/lnurlp/vodtinker/cb?amount=${amountMsat}`);
    const albyData = await albyResp.text();

    return new Response(albyData, { headers });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: 'ERROR', reason: err?.message || 'Error en Cloudflare Function' }),
      { status: 500, headers }
    );
  }
};
