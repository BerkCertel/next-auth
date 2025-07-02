import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Giriş yapılmadan erişilmemesi gereken sayfalar
const protectedRoutes = ["/"];

// Giriş yapılmış kullanıcıların erişmemesi gereken sayfalar
const guestOnlyRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const isLoggedIn = !!token;
  const { pathname } = request.nextUrl;

  // Giriş yapılmamışsa ve korumalı sayfaya erişiliyorsa → login'e yönlendir
  if (protectedRoutes.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Giriş yapılmışsa ve login/register sayfalarına erişiliyorsa → anasayfaya yönlendir
  if (guestOnlyRoutes.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"], // izlenen yollar
};
