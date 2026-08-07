import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
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

  // Paso 2: Petición de factura dinámica
  const amountSats = Math.max(1, Math.floor(parseInt(amountMsat, 10) / 1000));

  try {
    const albyResp = await fetch(`https://getalby.com/.well-known/lnurlp/vodtinker/cb?amount=${amountMsat}`);
    const albyData = await albyResp.text();

    return new Response(albyData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: 'ERROR', reason: err?.message || 'Error en Astro SSR' }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
};
