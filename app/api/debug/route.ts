import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function GET() {
  const checks: Record<string, string> = {};

  // Env vars check
  checks.KV_REST_API_URL = process.env.KV_REST_API_URL ? "set" : "missing";
  checks.KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN ? "set" : "missing";
  checks.UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL ? "set" : "missing";
  checks.UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ? "set" : "missing";
  checks.RESEND_API_KEY = process.env.RESEND_API_KEY ? "set" : "missing";
  checks.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ? "set" : "missing";

  // Redis test
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const redis = new Redis({ url, token });
      await redis.set("test", "ok");
      const val = await redis.get("test");
      checks.redis = `connected (test=${val})`;
    } catch (e) {
      checks.redis = `error: ${e instanceof Error ? e.message : String(e)}`;
    }
  } else {
    checks.redis = "no credentials";
  }

  return NextResponse.json(checks);
}
