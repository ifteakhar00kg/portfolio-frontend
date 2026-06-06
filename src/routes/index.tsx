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
      // টাইটেল বদলে ডটসহ Ifteakar. করা হলো
      { title: "Ifteakar." },
      {
        name: "description",
        content:
          "Portfolio of Ifteakar Ahmed, backend developer and AI integration enthusiast based in Dhaka building scalable APIs and intelligent web apps.",
      },
      // ওপেন গ্রাফ (OG) টাইটেলও আপডেট করা হলো
      { property: "og:title", content: "Ifteakar." },
      {
        property: "og:description",
        content: "Backend Developer & AI Integration Enthusiast based in Dhaka.",
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