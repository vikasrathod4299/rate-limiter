import type { RateLimitRule } from "../model/RateLimitRule";
import type { Request } from "../model/Request";
import type { RateLimitStore } from "../stores/RateLimitStore";
import type { RateLimitStrategy } from "./RateLimiterStrategy"

interface TokenBucketState {
  tokens: number;
  lastRefill: number;
}

export class TokenBucketStrategy implements RateLimitStrategy {

  constructor(private store: RateLimitStore) { }

  async isAllowed(request: Request, rule: RateLimitRule): Promise<boolean> {
    const key = `${"rate-limit"}-${request.userId}:${rule.algorithm}`;
    const state = await this.store.get<TokenBucketState>(key)

    const now = Date.now()

    const refillRate = rule.limit / (rule.windowSize / 1000)

    if (!state) {
      await this.store.save<TokenBucketState>(key, { tokens: rule.limit - 1, lastRefill: now })
      return true
    }

    const elapsed = now - state.lastRefill
    const tokensToAdd = Math.floor(elapsed * refillRate / 1000)

    const newTokens = Math.min(state.tokens + tokensToAdd, rule.limit)

    if (newTokens <= 0) {
      await this.store.update<TokenBucketState>(key, { tokens: newTokens, lastRefill: now })
      return false
    }

    await this.store.update<TokenBucketState>(key, { tokens: newTokens - 1, lastRefill: now })

    return true
  }
}
