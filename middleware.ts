import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  console.log("Is authenticated:", !!token);
  console.log("User role:", token?.role);
  
  const isAuthenticated = !!token;
  
  // Define protected routes that require authentication
  const protectedPaths = [
    "/dashboard",
    "/events/register",
    "/profile",
    "/submissions",
  ];
  
  // Define admin-only routes
  const adminPaths = [
    "/admin",
  ];

  const path = request.nextUrl.pathname;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );
  
  // Check if the path is admin-only
  const isAdminPath = adminPaths.some(adminPath => 
    path.startsWith(adminPath)
  );
  
  // Redirect to login if trying to access protected route without being authenticated
  if (isProtectedPath && !isAuthenticated) {
    const redirectUrl = new URL("/auth/signin", request.url);
    redirectUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Redirect to home if trying to access admin route without admin role
  if (isAdminPath && (!isAuthenticated || token?.role !== "ADMIN")) {
    console.log("Redirecting from admin route - isAuthenticated:", isAuthenticated, "role:", token?.role);
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/events/register/:path*",
    "/profile/:path*",
    "/submissions/:path*",
    "/admin/:path*",
  ],
}; 