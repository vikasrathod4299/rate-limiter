import type { Algorithm } from "../constants/Alogrithm";

export interface RateLimitRule {
  userId: string;
  limit: number;
  windowSize: number;
  algorithm: Algorithm;
}
