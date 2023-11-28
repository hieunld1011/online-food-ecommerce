import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { PATH_CART } from "./app/routes/router.path";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";

export default withAuth(
    function middleware(req:NextRequestWithAuth) {
        // console.log(req.nextauth.token?.role)
        if (req.nextUrl.pathname.startsWith("/dashboard")
            && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", req.url)
            )
    }

        if ((req.nextUrl.pathname.startsWith("/profile")||req.nextUrl.pathname.startsWith("/cart")||req.nextUrl.pathname.startsWith("/checkout"))
            && req.nextauth.token?.role !== "admin"
            && req.nextauth.token?.role !== "user") {
                // console.log(req.nextauth.token?.role)
                toast.error("Please login to continue")
            return NextResponse.rewrite(
                new URL("/login", req.url)
            )
        }

        if(req.nextUrl.pathname.startsWith("/login")&&req.nextauth.token)
            return NextResponse.rewrite(new URL("/",req.url))
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return true;
            }
        },
    }
)

export const config = {
    matcher: [
        "/profile/:path*",
        "/dashboard/:path*",
        "/cart",
        "/login",
        "/checkout"
    ]
}