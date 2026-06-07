import type { RateLimitStore } from "./RateLimitStore";

export class MemoryStore implements RateLimitStore {
  private storage = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | null> {
    return null
  }

  async save<T>(key: string, value: T): Promise<void> {

  }

  async update<T>(key: string, value: T): Promise<void> {

  }
}
