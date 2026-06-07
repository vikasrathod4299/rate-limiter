import type { RateLimitStrategy } from "../strategies/RateLimiterStrategy.ts";

export class TokenBucket implements RateLimitStrategy {
  private capacity: number;
  private tokens: number
  private refillRate: number;
  private lastRefill: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.tokens = capacity; // Start with a full bucket
    this.refillRate = refillRate; // Tokens per second
    this.lastRefill = Date.now();
  }

  async isAllowed(): Promise<boolean> {
    return true
  }

  private refillTokens() { }

}
