import type { RateLimitRule } from "../model/RateLimitRule";

export interface RuleRepository {
  getRule(userId: string): Promise<RateLimitRule | null>;
  saveRule(rule: RateLimitRule): Promise<void>;
  updateRule(rule: RateLimitRule): Promise<void>;
}
