import { nwc } from '@getalby/sdk';

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

  // Paso 2: Generar la factura dinámica solicitándosela a tu Alby Hub en casa vía Nostr NWC
  const nwcUrl = 'nostr+walletconnect://f15205b046e89dd798f0c59490c18f740a485f6fa797840da04b8db8c2a95605?relay=wss://relay.getalby.com&secret=bdcb8c94237472c0df977596310ae86431312fa735c571e012e8e7d8f01fa28e';

  try {
    const client = new nwc.NWCClient({ nostrWalletConnectUrl: nwcUrl });
    const amountSats = Math.max(1, Math.floor(parseInt(amountMsat, 10) / 1000));
    
    const invoiceResp = await client.makeInvoice({
      amount: amountSats,
      description: 'Pago a bitcoin@vodtinker.dev'
    });

    return new Response(
      JSON.stringify({
        pr: invoiceResp.invoice,
        routes: []
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
      JSON.stringify({
        status: 'ERROR',
        reason: err?.message || 'Error al generar factura NWC'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};
