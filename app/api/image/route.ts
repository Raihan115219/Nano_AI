import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt are required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount are required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("IMAGE_ERROR", error);
    return new NextResponse("INTERNAL ERROR_FROM IMAGE API", { status: 500 });
  }
}
