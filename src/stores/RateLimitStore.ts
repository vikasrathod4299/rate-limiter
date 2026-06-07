
export interface RateLimitStore {
  get<T>(key: string): Promise<T | null>;
  save<T>(key: string, value: T): Promise<void>;
  update<T>(key: string, value: T): Promise<void>;
}
