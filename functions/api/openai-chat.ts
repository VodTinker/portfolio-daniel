// Cloudflare Pages Function — handles /api/openai-chat
// No Astro adapter needed — Cloudflare Pages detects functions/ automatically

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.1-8b-instruct';

interface Env {
  NVIDIA_API_KEY: string; // nvapi-... from build.nvidia.com
}

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const onRequestOptions = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  const apiKey = env.NVIDIA_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ERROR: NVIDIA_API_KEY no está definida en las variables de entorno de Cloudflare' }),
      { status: 500, headers: HEADERS }
    );
  }

  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'message is required' }),
        { status: 400, headers: HEADERS }
      );
    }

    const systemPrompt = `Eres un asistente virtual de la página web personal de Daniel.
Daniel es desarrollador frontend y estudiante de ASIR (Administración de Sistemas Informáticos en Red).
Responde de forma muy cercana, profesional, práctica y breve (máximo 2 o 3 párrafos).
IMPORTANTE: Detecta el idioma del mensaje del usuario y responde estrictamente en ese mismo idioma (por ejemplo, si te escribe en español responde en español, si te escribe en inglés responde en inglés, etc.).`;

    const completionResponse = await fetch(NVIDIA_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 1024,
      }),
    });

    if (!completionResponse.ok) {
      const errorText = await completionResponse.text();
      console.error('NVIDIA API error response:', errorText);
      return new Response(
        JSON.stringify({ error: `NVIDIA API returned error: ${completionResponse.status}` }),
        { status: 502, headers: HEADERS }
      );
    }

    const completion = await completionResponse.json();
    const reply = completion.choices?.[0]?.message?.content ?? '';

    return new Response(JSON.stringify({ reply }), { status: 200, headers: HEADERS });
  } catch (error) {
    console.error('NVIDIA API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error al llamar a la API de NVIDIA' }),
      { status: 500, headers: HEADERS }
    );
  }
};
