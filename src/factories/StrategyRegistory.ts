import { Algorithm } from "../constants/Alogrithm";
import type { RateLimitStrategy } from "../strategies/RateLimiterStrategy";

export class StrategyRegistry {
  private strategies = new Map<Algorithm, RateLimitStrategy>();

  register(algorithm: Algorithm, strategy: RateLimitStrategy): void {
    this.strategies.set(algorithm, strategy)
  }

  getStrategy(algorithm: Algorithm): RateLimitStrategy {
    const strategy = this.strategies.get(algorithm);
    if (!strategy) {
      throw new Error(`Unsupported algorithm ${algorithm}`)
    }
    return strategy
  }
}
