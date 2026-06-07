import { Algorithm } from "./constants/Alogrithm";
import type { StrategyRegistry } from "./factories/StrategyRegistory";
import type { Request } from "./model/Request";
import type { RuleRepository } from "./repository/RuleRepository";

export class RateLimiter {
  constructor(private ruleRepository: RuleRepository, private strategyRegistry: StrategyRegistry) { }

  async isAllowed(request: Request): Promise<boolean> {
    const rule = await this.ruleRepository.getRule(request.userId)
    if (!rule) return true
    const strategy = this.strategyRegistry.getStrategy(rule.algorithm)
    return strategy.isAllowed(request, rule);
  }
}
