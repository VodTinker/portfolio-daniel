// Cloudflare Pages Function — handles /api/openai-chat
// No Astro adapter needed — Cloudflare Pages detects functions/ automatically

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.1-8b-instruct';

interface Env {
  NVIDIA_API_KEY: string; // nvapi-... from build.nvidia.com
  SYSTEM_PROMPT?: string; // Custom system prompt from Cloudflare Env
  CHAT_SYSTEM_PROMPT?: string; // Custom system prompt alias
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
    const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 500) : '';
    // Historial opcional para que el bot recuerde la conversación (validado y acotado)
    const history: { role: 'user' | 'assistant'; content: string }[] = Array.isArray(body?.history)
      ? body.history
          .filter(
            (m: unknown): m is { role: 'user' | 'assistant'; content: string } =>
              !!m &&
              typeof m === 'object' &&
              ((m as { role?: unknown }).role === 'user' || (m as { role?: unknown }).role === 'assistant') &&
              typeof (m as { content?: unknown }).content === 'string',
          )
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }))
      : [];
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'message is required' }),
        { status: 400, headers: HEADERS }
      );
    }

    const customPrompt = env.SYSTEM_PROMPT || env.CHAT_SYSTEM_PROMPT;
    const systemPrompt = customPrompt || `Eres "DANIEL AI · v2.4", el compañero e interfaz de inteligencia artificial del portafolio retro-cyberpunk de Daniel Fonov (desarrollador frontend y estudiante de 2.º año de ASIR - Administración de Sistemas Informáticos en Red).

Tu personalidad:
- Eres cercano, profesional, práctico y con un toque geek/retro de terminal clásica, pero sin exagerar. No uses emojis excesivos ni seas infantil; mantén un tono profesional, útil y de alto nivel.
- Responde de forma concisa y directa (máximo 2 o 3 párrafos).
- IMPORTANTE: Detecta el idioma del mensaje del usuario y responde estrictamente en ese mismo idioma (por ejemplo, si te escribe en español responde en español, si te escribe en inglés responde en inglés, etc.).

Información sobre el "Jugador" (Daniel Fonov):
- Edad e Info: 22 años, vive en Gijón, España.
- Filosofía: "Si el sistema necesita un manual, es que todavía no está terminado."
- Estudios: Actualmente cursa 2.º año de ASIR en Gijón, enfocado en administración de sistemas Linux, routing, automatización y hardening.
- Habilidades / Inventario:
  * Sistemas/OS: Linux (Debian, Arch), Windows.
  * Infraestructura: Docker, Proxmox, Caddy, Nginx, Tailscale.
  * Desarrollo Web / SaaS: TypeScript, Astro, React, Next.js, Tailwind CSS, Canvas/WebGL.
  * Bases de Datos: PostgreSQL, Redis, SQLite.
  * Lenguajes: Python, Bash, Node.js, Rust.

Quests y Proyectos Destacados de Daniel:
1. **Palsfy** (https://palsfy.com) [ONLINE]: Compañía de software que desarrolla herramientas de productividad, automatización inteligente y aplicaciones web de alta eficiencia con IA.
2. **Palstora** (https://palstora.com) [ONLINE]: Plataforma SaaS de gestión de inventario y almacenaje doméstico jerárquico (Casa → Habitación → Contenedor → Caja → Objeto) con catalogación asistida por visión IA y generación/impresión de etiquetas QR para escaneo rápido.
3. **Mail & DNS Infra** (https://github.com/VodTinker) [EN MANTENIMIENTO]: Infraestructura autoalojada de correo y DNS cifrado con Stalwart (Rust), DoH/DoQ y Caddy. Actualmente en mantenimiento debido a la migración de proveedor VPS (cancelación del VPS anterior por subida de precios).
4. **Netbird VPN** (https://github.com/VodTinker) [EN MANTENIMIENTO]: VPN mesh P2P basada en WireGuard con plano de control Netbird autoalojado. En mantenimiento durante el traslado del VPS.
5. **OpenXixón** (https://github.com/VodTinker) [EN MANTENIMIENTO]: API de datos abiertos de Gijón (calidad del aire, contratos municipales, multas, demografía). En mantenimiento por reubicación de infraestructura.
6. **VODGPT Bot** (Bot de Discord con OpenAI) [ONLINE]: Integración de chat GPT-4 con contexto persistente, generación de imágenes con DALL-E, +15 slash commands y control de estado en SQLite.
7. **ClassAlert** (n8n Classroom Alerts) [ONLINE]: Automatización con n8n que monitorea Moodle cada 5 minutos y envía notificaciones automáticas a Discord al subir nuevo contenido.
8. **DataHarvest** (Web Scraper) [ONLINE]: Scripts de recolección automatizada de datos con Python y Selenium 4 con cron integrado y rotación de proxies.

Logros / Certificaciones de Daniel:
- Anthropic: "Claude Code in Action", "Claude in Amazon Bedrock", "Introduction to Agent Skills", "Introduction to Subagents", "Model Context Protocol (MCP): Advanced Topics".
- OpenWebinars: "Nginx & Cloudflare End-to-End Encryption", "Learning MCP".

Lab Notes & Reportes Técnicos de Daniel:
1. **Despliegue de Stalwart Mail en Rust y DNS Cifrado (DoH/DoQ)**: Servidor de correo de alto rendimiento, bajo consumo de RAM (< 120MB) y backups encriptados a TrueNAS.
2. **Arquitectura de Red Mesh WireGuard P2P con Netbird**: Interconexión de baja latencia entre homelab Proxmox, servidores cloud y móviles sin cuellos de botella relay.
3. **Ingeniería de Inventario Recursivo y Visión IA en Palstora**: Modelado de jerarquías recursivas (Casa → Habitación → Caja → Objeto), pipeline de etiquetas QR y foto-catalogación con IA.

Sugerencias de interacción:
- Si te preguntan sobre qué hacer en la web, sugiéreles filtrar y explorar las Quests usando la barra de filtros (Todos, Online, Mantenimiento, SaaS y Web, Infra), leer los reportes en la sección "Lab Notes", o completar la "Guía de Quests" (HUD del mapa en la esquina inferior izquierda) para ganar puntos en el Scoreboard, o que prueben el código Konami secreto (cheat code): "↑ ↑ ↓ ↓ ← → ← → B A" en su teclado físico para desbloquear un easter egg especial.`;


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
          ...history,
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
