import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  const apiKey = import.meta.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ERROR: OPENAI_API_KEY no está definida' }), 
      { status: 500, headers }
    );
  }

  try {
    const { message } = await request.json();

    const detectionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a language detection assistant. Detect the language of the user input and respond with the ISO 639-1 language code only (e.g., "en" for English, "es" for Spanish).'
          },
          { role: 'user', content: message }
        ],
      }),
    });

    const detection = await detectionResponse.json();
    const rawLang = detection.choices?.[0]?.message?.content ?? 'en';
    const langCode = rawLang.trim().slice(0, 2).toLowerCase().replace(/[^a-z]/g, '');

    const systemPrompt = `Responde en ${langCode === 'es' ? 'español' : 'inglés'}.
Eres un asistente de la página web personal de Daniel, desarrollador frontend y estudiante de ASIR.
Responde de forma cercana, profesional y práctica.`;

    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
      }),
    });

    const completion = await completionResponse.json();
    const reply = completion.choices?.[0]?.message?.content ?? '';

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('OpenAI Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error al llamar a OpenAI' }),
      { status: 500, headers }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
