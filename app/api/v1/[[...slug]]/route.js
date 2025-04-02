import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function proxyRequest(request, paramsPromise) {
  // In development, disable TLS rejection warnings
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  try {
    // Retrieve the slug parameter from the route
    const { slug: pathSegments = [] } = await paramsPromise;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Construct the target URL including any search parameters
    const targetUrl = `${baseUrl}/${pathSegments.join("/")}${new URL(
      request.url
    ).search}`;

    // Clone headers and update the host header if needed
    const headers = new Headers(request.headers);
    headers.set("host", process.env.NEXT_PUBLIC_API_BASE);

    const init = {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? null
        : await request.text(),
      agent,
    };

    const response = await fetch(targetUrl, init);
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage;
      if (contentType && contentType.includes("application/json")) {
        errorMessage = await response.json();
      } else {
        errorMessage = { error: await response.text() };
      }
      return new Response(JSON.stringify(errorMessage), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Clean up headers from the proxied response if needed
    const newHeaders = new Headers(response.headers);
    newHeaders.delete("content-encoding");
    if (!newHeaders.has("Content-Type")) {
      newHeaders.set("Content-Type", "application/json");
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Each HTTP method is handled here
export async function GET(request, { params }) {
  const resolvedParams = await params;
  return proxyRequest(request, { slug: resolvedParams.slug });
}

export async function POST(request, { params }) {
  const resolvedParams = await params;
  return proxyRequest(request, { slug: resolvedParams.slug });
}

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  return proxyRequest(request, { slug: resolvedParams.slug });
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  return proxyRequest(request, { slug: resolvedParams.slug });
}

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  return proxyRequest(request, { slug: resolvedParams.slug });
}
