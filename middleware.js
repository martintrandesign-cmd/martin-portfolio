import { next } from '@vercel/edge';

export const config = {
  matcher: ['/((?!login\\.html|api/).*)'],
};

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)mt_session=([^;]*)/);
  const session = match?.[1];

  if (session && session === process.env.SESSION_TOKEN) {
    return next();
  }

  return Response.redirect(new URL('/login.html', request.url));
}
