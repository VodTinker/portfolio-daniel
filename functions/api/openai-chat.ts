// Cloudflare Pages Function — handles /api/openai-chat
// No Astro adapter needed — Cloudflare Pages detects functions/ automatically

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'deepseek-ai/deepseek-v4-flash';

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
      JSON.stringify({ error: 'ERROR: NVIDIA_API_KEY no está definida' }),
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

    // Language detection
    const detectionResponse = await fetch(NVIDIA_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a language detection assistant. Detect the language of the user input and respond with the ISO 639-1 language code only (e.g., "en" for English, "es" for Spanish). Reply with the code only, nothing else.',
          },
          { role: 'user', content: message },
        ],
        max_tokens: 5,
      }),
    });

    const detection = await detectionResponse.json();
    const rawLang = detection.choices?.[0]?.message?.content ?? 'en';
    const langCode = rawLang.trim().slice(0, 2).toLowerCase().replace(/[^a-z]/g, '');

    const systemPrompt = `Responde en ${langCode === 'es' ? 'español' : 'inglés'}.
Eres un asistente de la página web personal de Daniel, desarrollador frontend y estudiante de ASIR.
Responde de forma cercana, profesional y práctica.`;

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
