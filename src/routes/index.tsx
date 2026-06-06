import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Chatbot } from "@/components/Chatbot";
import { MagneticCursor } from "@/components/MagneticCursor";
import { TechMarquee } from "@/components/TechMarquee";
import { GithubContributions } from "@/components/GithubContributions";
import { Footer } from "@/components/Footer";
import { Achievements } from "@/components/Achievements";
import { CodeRainBackground } from "@/components/CodeRainBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      // টাইটেল ডটসহ Ifteakar.
      { title: "Ifteakar." },
      {
        name: "description",
        content:
          "Portfolio of Ifteakar Ahmed, backend developer and AI integration enthusiast based in Dhaka building scalable APIs and intelligent web apps.",
      },
      // ওপেন গ্রাফ (OG) টাইটেল
      { property: "og:title", content: "Ifteakar." },
      {
        property: "og:description",
        content: "Backend Developer & AI Integration Enthusiast based in Dhaka.",
      },
    ],
    // 🔗 এখানেও সরাসরি আপনার সবুজ কার্সরের আসল Base64 কোড ইনজেক্ট করে দেওয়া হলো
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE2ElEQVR4AeyWe2wURRzHv7N7u7fXuz7wgmKoaCEGLUQDPrBoIgEhgpgYQzE1UUM0/oMmChgDCVp8hAAaCQ9JQxSDRB7nH+hRxSKKlAqC2CC0KbQoUo4ebe/R23vszu7OOEcgaUht9xBiTJjM72Z2f7/9/j4zN7OzEv7jcgPg/z0DL4dR9PrP8P2bZVTwDHAOsic3el49Dfz+1CyfPn2SLy36x+tTt7yU9xUKUxBA3a/3KY20cqspxz6JJu3xnT0WSWQpceTcOKU4WXcgV7mt9kd4CoEoCODeyuDKs920+p1aitdqgAVzZbw9X8LuvQRpQ4Hiy82ZPbH6g+sCsOcCjMmxPv7q4sVd5HCDBD3lQSanoqPFi41LFezYaZBemkVRwHpla8eMyW4hXM+AJntql68/RjpPEQ5FotBkSnwy4PPAklTs3KBib3Oc2IThpuJA7TUFePensRWHWjumHtqnM0Ls3YrsLPTIbC3RSEEDeLiM98CwFezeQXA81ULKisumVm/WKtxAuJoBWWVPhndFCTOdLbzUmGsdyK4fNlxb5g3Iq2UfSclFMieajNNHVTS1R8C1KLl1lGf2NQMwbavqxG+5JCN0ERqQyQvizedbUvAnpQ1iUuqBGpJaD4I0p47juAwtSofN5RJQwXk/d1xY4ypk/04jFj++rJVxaqivjI17NGkLPFKnEgEkXaJn4vr4Ny563LcYK0rAD3Bgszmf1wpFAqFHH+J0iJ7pbgkEwICpHslEu02QU1rxJXxA127AuCWUObEGUjA69UyskLMiz4G2BRIpigxTaq5eTO6ASAsI1tidOUXk/t/4SAOsYPiVgkYB3cYHJtzAoZc2hEowjNEdQMAG/Q890iTUQ21v96UZVNkm9oTRdJhzBATRIUJJL84njI6uvvH/lPfDQA/dS7Rcscof7kvW/J0f6G4P36baThPWBlbcbI2YDGoAYZgGXg6jlNiVfQPH7DvBgA955yDFZUqYZJnxcgFo6ZNWDNh+PhV4+9J6Nk3DN2ZROMW4WkLkvgfKu62UVIk4cwJcmTAjFfcdAWQiuP74hHMKClWy9M558vz5xP1PbHMdj1GX8xGDc1OijWYs6EEGXlspoxUp5e1NbHvRC4ubNDqCmBmKWLNJ+O7ap4pB6V2aV/UvD8VMcamO7MK7TaAPgvEw/Dos8CkO4P84Fc4rMr4c9DMl5yuAEIHSUfP7AwaxGDklkecTRTvnZ5d4NloBGtYvOIB4eqbgGQeCSh57rMdZ9uONMQbvwF06c5eG4hR/V8jspxBA07baxakj6mR/lGyOgSiZmwIatrANSC0dFoT0Toe19vurDlo7dSF7av4872NcSpW8pje+rYN5m/+GrxwmrGBFw8sOCiuAfIi30GA2VoFlvvw76T9pJIk72iq4mtTLXy980kXyf24X4x+ihCcOCyFAaQFw0jCx1t8KNefH5+DhVfiDYMDUcQRAQdoPkwt1Y4QF65VSSZgV6MFVvtdnSgFGfRhjiOwhJu Lsx1vTqAvHwtGEIC5FuYV5M4L5G3qwfIP30N7LoDDMX4NwAAAP///uYg1wAAAAZJREFUAwBbxyNfe/NYDAAAAABJRU5ErkJggg==",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <CodeRainBackground />
      <MagneticCursor />
      <main className="relative text-foreground">
        <Hero />
        <TechMarquee />
        <Skills />
        <GithubContributions />
        <Projects />
        <Achievements />
      </main>
      <Footer />
      <Chatbot />
    </SmoothScroll>
  );
}