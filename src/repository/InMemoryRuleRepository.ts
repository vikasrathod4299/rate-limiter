import type { RateLimitRule } from "../model/RateLimitRule";
import type { RuleRepository } from "./RuleRepository";

export class InMemoryRuleRepository implements RuleRepository {

  private rules = new Map<string, RateLimitRule>();

  async getRule(userId: string) {
    return this.rules.get(userId) || null;
  }
  async saveRule(rule: RateLimitRule) {
    this.rules.set(rule.userId, rule);
  }
  async updateRule(rule: RateLimitRule) {
    if (!this.rules.has(rule.userId)) {
      throw new Error(`Rule for user ${rule.userId} does not exist.`);
    }
    this.rules.set(rule.userId, rule);
  }
}
