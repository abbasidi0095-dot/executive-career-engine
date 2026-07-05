import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const hostname = request.headers.get("host") || "";

  // 1. Exclude static assets and standard internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Identify hostnames representing subdomains or custom domains
  // Local: alex.localhost:3000 -> subdomain is alex
  // Prod: alex.careerenvoy.co -> subdomain is alex
  // Prod: alexsmith.com -> custom domain (not localhost, nor ending in careerenvoy.co)
  let subdomain = "";
  const cleanHost = hostname.toLowerCase();

  const isLocal = cleanHost.includes("localhost");
  const isApexProd = cleanHost === "careerenvoy.co" || cleanHost === "www.careerenvoy.co";

  if (isLocal) {
    // If it has multiple parts (e.g. alex.localhost:3000)
    const parts = cleanHost.split(".");
    if (parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "www") {
      subdomain = parts[0];
    }
  } else if (!isApexProd) {
    // Check if it ends with .careerenvoy.co
    if (cleanHost.endsWith(".careerenvoy.co")) {
      const parts = cleanHost.replace(".careerenvoy.co", "").split(".");
      subdomain = parts[parts.length - 1]; // e.g., "alex"
    } else {
      // Custom Domain (e.g., alexsmith.com) -> use it directly or map it
      // For this prototype, we'll map custom domains to the slug matching the domain prefix, or we can look up by customDomain.
      // To keep it simple, let's treat the apex word as slug, e.g. alexsmith
      const parts = cleanHost.split(".");
      if (parts.length > 0) {
        subdomain = parts[0];
      }
    }
  }

  // 3. If a valid subdomain/tenant slug is resolved, rewrite the request
  if (subdomain && subdomain !== "localhost" && subdomain !== "www") {
    // Rewrite path to /portfolios/[tenant] internally
    // Preserve the original path queries or sub-routes (e.g. /resume -> /portfolios/[tenant]/resume)
    url.pathname = `/portfolios/${subdomain}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Ensure middleware matches all paths except API and static assets
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. Static files (.svg, .png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
