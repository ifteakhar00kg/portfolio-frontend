import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { API_BASE_URL } from "./api-config";

// মেসেজ স্কিমা ঠিক রাখা হলো
const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
});

export const chatWithIfteakarBot = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ব্যাকএন্ডের ChatbotController যেভাবে messages অ্যারে আশা করছে
          messages: data.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        console.error("Spring Boot Backend Error Status:", res.status);
        return { reply: "", error: "Backend server is currently unreachable." };
      }

      // ব্যাকএন্ড থেকে Map.of("reply", botReply) আকারে JSON আসবে
      const json = (await res.json()) as { reply?: string };
      const reply = json.reply?.trim() ?? "";

      if (!reply) {
        return { reply: "", error: "Empty response from the backend." };
      }

      return { reply, error: null as string | null };
    } catch (err) {
      console.error("chatWithIfteakarBot connection failed:", err);
      return { reply: "", error: "Network error. Make sure Spring Boot (8083) is running." };
    }
  });