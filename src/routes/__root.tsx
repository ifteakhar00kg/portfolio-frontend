import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ifteakar." },
      { name: "description", content: "Portfolio of Ifteakar Ahmed" },
      { name: "author", content: "Ifteakar" },
      { property: "og:title", content: "Ifteakar." },
      { property: "og:description", content: "Portfolio of Ifteakar Ahmed" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // 🧙‍♂️ জাদুকরী জাভাস্ক্রিপ্ট যা লাভেলের সমস্ত ডিফল্ট আইকন মুছে আপনার সবুজ কার্সর বসাবে
  useEffect(() => {
    const base64Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE2ElEQVR4AeyWe2wURRzHv7N7u7fXuz7wgmKoaCEGLUQDPrBoIgEhgpgYQzE1UUM0/oMmChgDCVp8hAAaCQ9JQxSDRB7nH+hRxSKKlAqC2CC0KbQoUo4ebe/R23vszu7OOEcgaUht9xBiTJjM72Z2f7/9/j4zN7OzEv7jcgPg/z0DL4dR9PrP8P2bZVTwDHAOsic3el49Dfz+1CyfPn2SLy36x+tTt7yU9xUKUxBA3a/3KY20cqspxz6JJu3xnT0WSWQpceTcOKU4WXcgV7mt9kd4CoEoCODeyuDKs920+p1aitdqgAVzZbw9X8LuvQRpQ4Hiy82ZPbH6g+sCsOcCjMmxPv7q4sVd5HCDBD3lQSanoqPFi41LFezYaZBemkVRwHpla8eMyW4hXM+AJntql68/RjpPEQ5FotBkSnwy4PPAklTs3KBib3Oc2IThpuJA7TUFePensRWHWjumHtqnM0Ls3YrsLPTIbC3RSEEDeLiM98CwFezeQXA81ULKisumVm/WKtxAuJoBWWVPhndFCTOdLbzUmGsdyK4fNlxb5g3Iq2UfSclFMieajNNHVTS1R8C1KLl1lGf2NQMwbavqxG+5JCN0ERqQyQvizedbUvAnpQ1iUuqBGpJaD4I0p47juAwtSofN5RJQwXk/d1xY4ypk/04jFj++rJVxaqivjI17NGkLPFKnEgEkXaJn4vr4Ny563LcYK0rAD3Bgszmf1wpFAqFHH+J0iJ7pbgkEwICpHslEu02QU1rxJXxA127AuCWUObEGUjA69UyskLMiz4G2BRIpigxTaq5eTO6ASAsI1tidOUXk/t/4SAOsYPiVgkYB3cYHJtzAoZc2hEowjNEdQMAG/Q890iTUQ21v96UZVNkm9oTRdJhzBATRIUJJL84njI6uvvH/lPfDQA/dS7Rcscof7kvW/J0f6G4P36baThPWBlbcbI2YDGoAYZgGXg6jlNiVfQPH7DvBgA955yDFZUqYZJnxcgFo6ZNWDNh+PhV4+9J6Nk3DN2ZROMW4WkLkvgfKu62UVIk4cwJcmTAjFfcdAWQiuP74hHMKClWy9M558vz5xP1PbHMdj1GX8xGDc1OijWYs6EEGXlspoxUp5e1NbHvRC4ubNDqCmBmKWLNJ+O7ap4pB6V2aV/UvD8VMcamO7MK7TaAPgvEw/Dos8CkO4P84Fc4rMr4c9DMl5yuAEIHSUfP7AwaxGDklkecTRTvnZ5d4NloBGtYvOIB4eqbgGQeCSh57rMdZ9uONMQbvwF06c5eG4hR/V8jspxBA07baxakj6mR/lGyOgSiZmwIatrANSC0dFoT0Toe19vurDlo7dSF7av4872NcSpW8pje+rYN5m/+GrxwmrGBFw8sOCiuAfIi30GA2VoFlvvw76T9pJIk72iq4mtTLXy980kXyf24X4x+ihCcOCyFAaQFw0jCx1t8KNefH5+DhVfiDYMDUcQRAQdoPkwt1Y4QF65VSSZgV6MFVvtdnSgFGfRhjiOwhJuLsx1vTqAvHwtGEIC5FuYV5M4L5G3qwfIP30N7LoDDMX4NwAAAP///uYg1wAAAAZJREFUAwBbxyNfe/NYDAAAAABJRU5ErkJggg==";

    // ১. আগের যত গ্লোব বা লাভেলের তৈরি ফেভআইকন আছে সব রিমুভ করা
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(el => el.remove());

    // ২. একদম নতুন আপনার সবুজ নিয়ন কার্সরের লিঙ্ক ট্যাগ তৈরি করা
    const link = document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = base64Icon;

    // ৩. হেডের ভেতর জোরপূর্বক ইনজেক্ট করে দেওয়া
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}