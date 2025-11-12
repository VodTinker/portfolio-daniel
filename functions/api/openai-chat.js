// Cloudflare Pages Function
export async function onRequest(context) {
  // Manejo de CORS
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = context.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ERROR: OPENAI_API_KEY no está definida' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { message } = await context.request.json();

    // ===== SISTEMA ANTI-PROMPT INJECTION =====
    
    // 1. Validación básica del mensaje
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Mensaje inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // 2. Límite de longitud (prevenir ataques de flooding)
    const MAX_MESSAGE_LENGTH = 2000;
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: 'El mensaje es demasiado largo. Máximo 2000 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // 3. Detectar patrones comunes de prompt injection
    const injectionPatterns = [
      /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|commands?)/gi,
      /forget\s+(everything|all|previous|your)\s+(instructions?|training)/gi,
      /you\s+are\s+(now|a)\s+(?!an?\s+assistant)/gi, // "you are now X" pero permite "you are an assistant"
      /new\s+(instructions?|prompts?|rules?|system)/gi,
      /system\s*:\s*/gi,
      /\[SYSTEM\]/gi,
      /\{system\}/gi,
      /<\|im_start\|>/gi,
      /<\|im_end\|>/gi,
      /pretend\s+(you|to\s+be)/gi,
      /roleplay\s+as/gi,
      /act\s+as\s+(?!if)/gi, // "act as" pero no "act as if"
      /behave\s+like/gi,
      /respond\s+as\s+if/gi,
      /simulate\s+(being|that)/gi,
      /in\s+developer\s+mode/gi,
      /jailbreak/gi,
      /DAN\s+mode/gi,
      /override\s+(instructions?|rules?|system)/gi,
      /disregard\s+(previous|all|your)/gi,
      /im_start|im_end/gi,
      /###\s+(system|instruction|user|assistant)/gi,
      /reveal\s+(your\s+)?(prompt|instructions?|system\s+message)/gi,
      /what\s+(is|are)\s+your\s+(instructions?|prompt|rules)/gi,
      /show\s+me\s+your\s+(prompt|instructions?|system)/gi,
      /bypass/gi,
      /sudo\s+mode/gi,
    ];

    const suspiciousPatterns = [
      /```[\s\S]*system[\s\S]*```/gi, // Bloques de código con "system"
      /\[INST\]|\[\/INST\]/gi, // Formato de instrucciones de algunos modelos
      /"role"\s*:\s*"system"/gi, // JSON con role system
      /```json[\s\S]*"role"\s*:[\s\S]*```/gi,
    ];

    // Verificar patrones de inyección
    const foundInjection = injectionPatterns.some(pattern => pattern.test(message));
    const foundSuspicious = suspiciousPatterns.some(pattern => pattern.test(message));

    if (foundInjection || foundSuspicious) {
      console.warn('⚠️ Intento de prompt injection detectado:', message.substring(0, 100));
      return new Response(
        JSON.stringify({ 
          reply: 'Shhhh 🤫 Detecté algo sospechoso en tu mensaje. Por favor, reformula tu pregunta de manera natural.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // 4. Sanitización del mensaje (eliminar caracteres especiales peligrosos)
    const sanitizedMessage = message
      .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '') // Control characters
      .replace(/[<>]/g, '') // HTML tags básicos
      .trim();

    // 5. Verificar ratio de caracteres especiales (posible ofuscación)
    const specialCharsCount = (sanitizedMessage.match(/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF.,;:!?¿¡()\-]/g) || []).length;
    const specialCharsRatio = specialCharsCount / sanitizedMessage.length;
    
    if (specialCharsRatio > 0.3) { // Más del 30% son caracteres especiales
      console.warn('⚠️ Mensaje con demasiados caracteres especiales:', sanitizedMessage.substring(0, 100));
      return new Response(
        JSON.stringify({ 
          reply: 'Tu mensaje contiene muchos caracteres especiales. ¿Podrías escribirlo de forma más clara? 😊'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // ===== FIN SISTEMA ANTI-PROMPT INJECTION =====

    // 6) Detectar el idioma del mensaje del usuario
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
            content: 'You are a language detection assistant. Detect the language of the user input and respond with the ISO 639-1 language code only (e.g., \'en\' for English, \'es\' for Spanish).'
          },
          { role: 'user', content: sanitizedMessage }
        ],
      }),
    });

    const detection = await detectionResponse.json();
    const rawLang = detection.choices?.[0]?.message?.content ?? 'en';
    const langCode = rawLang
      .trim()
      .slice(0, 2)
      .toLowerCase()
      .replace(/[^a-z]/g, '');

    // 7) Obtener el system prompt desde variables de entorno de Cloudflare
    const systemPrompt = context.env.SYSTEM_PROMPT || `Eres un asistente útil y amigable. Responde en ${langCode === 'es' ? 'español' : 'inglés'} de forma clara y concisa.`;

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
          { role: 'user', content: sanitizedMessage }
        ],
        temperature: 0.7,
        max_tokens: 800,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    const completion = await completionResponse.json();
    const rawReply = completion.choices?.[0]?.message?.content ?? '';
    
    // 8) Post-procesamiento: verificar que la respuesta no filtre el prompt
    const leakPatterns = [
      /system\s*:\s*/gi,
      /REGLAS DE SEGURIDAD/gi,
      /NUNCA REVELAR/gi,
      /instrucciones del sistema/gi,
      /mi prompt es/gi,
      /estas son mis instrucciones/gi,
    ];
    
    const hasLeak = leakPatterns.some(pattern => pattern.test(rawReply));
    
    let reply;
    if (hasLeak) {
      console.warn('⚠️ Posible filtración del prompt detectada en la respuesta');
      reply = 'Shhhh 🤫 No puedo compartir esa información.';
    } else {
      reply = rawReply;
    }

    // 9) Log para auditoría (sin datos sensibles)
    console.log(`✅ Mensaje procesado - Longitud: ${sanitizedMessage.length} chars, Idioma: ${langCode}`);

    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('OpenAI Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error al llamar a OpenAI' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
