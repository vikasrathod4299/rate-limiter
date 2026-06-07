import type { RateLimitRule } from "../model/RateLimitRule";
import type { Request } from "../model/Request";

export interface RateLimitStrategy {
  isAllowed(request: Request, rule: RateLimitRule): Promise<boolean>;
}
