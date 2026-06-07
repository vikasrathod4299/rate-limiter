import type { RateLimitRule } from "../model/RateLimitRule";
import type { Request } from "../model/Request";
import type { RateLimitStore } from "../stores/RateLimitStore";
import type { RateLimitStrategy } from "./RateLimiterStrategy";

export interface SlidingWindowState {
  timestamps: Array<number>;
}

export class SlidingWindowStrategy implements RateLimitStrategy {

  constructor(private store: RateLimitStore) { }

  async isAllowed(request: Request, rule: RateLimitRule): Promise<boolean> {

    const key = `${"rate-limit"}-${request.userId}:${rule.algorithm}`;

    const state = await this.store.get<SlidingWindowState>(key)
    const now = Date.now()

    const windowStart = now - rule.windowSize

    if (!state) {
      await this.store.save<SlidingWindowState>(key, { timestamps: [now] })
      return true
    }

    const updatedTimestamps = state.timestamps.filter(timestamp => timestamp > windowStart)

    if (updatedTimestamps.length >= rule.limit) {
      await this.store.update<SlidingWindowState>(key, { timestamps: updatedTimestamps })
      return false
    }

    updatedTimestamps.push(now)

    await this.store.update<SlidingWindowState>(key, { timestamps: updatedTimestamps })

    return true
  }
}
