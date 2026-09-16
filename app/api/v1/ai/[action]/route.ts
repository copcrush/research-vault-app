import { NextRequest } from "next/server";

export const runtime = "nodejs";
async function proxy(request: NextRequest, context: { params: Promise<{ action: string; }>; }) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return Response.json({ error: { message: "Live AI is unavailable in the portfolio demo." } }, { status: 404 });
  const { action } = await context.params;
  if (!((action === "status" && request.method === "GET") || (action === "chat" && request.method === "POST"))) return new Response(null, { status: 404 });
  // Bound the proxy body before buffering; Go independently validates the JSON.
  let body: Uint8Array | undefined;
  if (request.method === "POST") {
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    if (reader) for (; ;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > 65536) { await reader.cancel(); return Response.json({ error: { message: "Chat request is too large." } }, { status: 413 }); }
      chunks.push(chunk.value);
    }
    body = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  }
  try {
    const response = await fetch(`${process.env.API_ORIGIN ?? "http://127.0.0.1:8080"}/api/v1/ai/${action}`, {
      method: request.method,
      headers: { "Content-Type": "application/json" },
      body: body ? new TextDecoder().decode(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(125000)]),
    });
    return new Response(response.body, { status: response.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: { message: "The local AI API is unavailable or timed out. Check the Go API and Ollama, then retry." } }, { status: 503 });
  }
}
export { proxy as GET, proxy as POST };
