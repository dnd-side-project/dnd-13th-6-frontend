import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APP_HEADER_KEY = 'X-App-Auth';
const SESSION_COOKIE_NAME = 'app-webview-session';

export function middleware(request: NextRequest) {
  const expectedSecret = process.env.APP_WEBVIEW_SECRET;
  if (!expectedSecret) {
    console.error('APP_WEBVIEW_SECRET is not configured.');
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 1. Check for the session cookie first
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (sessionCookie && sessionCookie.value === expectedSecret) {
    // Valid session, allow request
    return NextResponse.next();
  }

  // 2. If no valid cookie, check for the initial auth header
  const providedSecret = request.headers.get(APP_HEADER_KEY);
  if (providedSecret && providedSecret === expectedSecret) {
    // Valid header, it's the first request.
    // Create a response to set the cookie and then proceed.
    const response = NextResponse.next();
    response.cookies.set(SESSION_COOKIE_NAME, expectedSecret, {
      httpOnly: true,
      secure: true, // Always true for HTTPS (local and prod)
      sameSite: 'strict',
      path: '/',
    });
    return response;
  }

  // 3. If neither is valid, block the request
  console.error(
    `Access denied for URL: ${request.url}. No valid session or secret.`
  );
  return new NextResponse('Forbidden', { status: 403 });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internal files, includes static, image, data, etc.)
     * - (paths with a dot) (static assets like .png, .ico, .svg, etc.)
     */
    '/((?!api|_next|main|.*\\..*).*)'
  ]
};
