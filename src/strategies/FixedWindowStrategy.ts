import type { RateLimitRule } from "../model/RateLimitRule";
import type { Request } from "../model/Request";
import type { RateLimitStore } from "../stores/RateLimitStore";
import type { RateLimitStrategy } from "./RateLimiterStrategy";

interface FixedWindowState {
  windowStart: number;
  count: number;
}

export class FixedWindowStrategy implements RateLimitStrategy {

  constructor(private store: RateLimitStore) { }

  async isAllowed(request: Request, rule: RateLimitRule): Promise<boolean> {

    const key = `${"rate-limit"}-${request.userId}:${rule.algorithm}`;

    const state = await this.store.get<FixedWindowState>(key);

    const now = Date.now();

    if (!state) {
      await this.store.save(key, { windowStart: now, count: 1 });
      return true;
    }

    if (now - state.windowStart > rule.windowSize) {
      await this.store.update(key, { windowStart: now, count: 1 });
      return true;
    }

    if (state.count >= rule.limit) {
      return false;
    }

    await this.store.update(key, { ...state, count: state.count + 1 });

    return true
  }
}
