import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhooks/user",
  "/api/create-payment-intent",
  "/api/webhooks/stripe",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (!isPublicRoute(req)) {
      auth().protect();
    }
  },
  { debug: process.env.NODE_ENV === "development" }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
