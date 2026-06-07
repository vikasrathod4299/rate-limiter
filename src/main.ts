import { Algorithm } from "./constants/Alogrithm";
import { StrategyRegistry } from "./factories/StrategyRegistory";
import { RateLimiter } from "./RateLimiter";
import { InMemoryRuleRepository } from "./repository/InMemoryRuleRepository";
import { MemoryStore } from "./stores/MemoryStore";
import { FixedWindowStrategy } from "./strategies/FixedWindowStrategy";
import { SlidingWindowStrategy } from "./strategies/SlidingWindowStrategy";
import { TokenBucketStrategy } from "./strategies/TokenBucketStrategy";

const store = new MemoryStore()

const ruleRepository = new InMemoryRuleRepository()
const strategyRegistry = new StrategyRegistry()

strategyRegistry.register(Algorithm.FIXED_WINDOW, new FixedWindowStrategy(store))
strategyRegistry.register(Algorithm.SLIDING_WINDOW, new SlidingWindowStrategy(store))
strategyRegistry.register(Algorithm.TOKEN_BUCKET, new TokenBucketStrategy(store))

const rateLimiter = new RateLimiter(ruleRepository, strategyRegistry)

console.log(rateLimiter.isAllowed({ userId: "1", endpoint: "/api/run", timestamp: Date.now() }))
