import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isMaintenanceModeEnabled } from "@/config/maintenance";

export function middleware(request: NextRequest) {
  const isMaintenance = isMaintenanceModeEnabled();
  const { pathname } = request.nextUrl;

  // Static assets and internal Next.js requests bypass maintenance checks
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|ico|pdf|txt)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // When maintenance mode is DISABLED:
  if (!isMaintenance) {
    // If a user navigates directly to /maintenance, redirect them to home
    if (pathname === "/maintenance") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // When maintenance mode is ENABLED:
  if (pathname === "/maintenance") {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("X-Maintenance-Mode", "active");
    return response;
  }

  // Rewrite all other requests to /maintenance
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  const rewriteResponse = NextResponse.rewrite(url);
  rewriteResponse.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  rewriteResponse.headers.set("Pragma", "no-cache");
  rewriteResponse.headers.set("X-Maintenance-Mode", "active");
  return rewriteResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
