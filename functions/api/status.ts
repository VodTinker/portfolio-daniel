// Cloudflare Pages Function — handles /api/status
// Exposes the retro status API documented in the README

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const onRequestOptions = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestGet = async () => {
  const statusData = {
    status: 'online',
    uptime: '99.99%',
    preferred_sfx: '8-bit chiptunes',
    current_quest: 'Building awesome retro systems',
  };

  return new Response(JSON.stringify(statusData, null, 2), {
    status: 200,
    headers: HEADERS,
  });
};
