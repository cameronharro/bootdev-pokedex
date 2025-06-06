type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval
    this.#startReapLoop()
  }


  add<T>(key: string, val: T): T {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val
    }
    this.#cache.set(key, entry)
    return val
  }

  get<T>(key: string):T | undefined {
    const entry = this.#cache.get(key)
    return entry?.val
  }

  #reap() {
    for (const entry of this.#cache.entries()) {
      const [key, value] = entry
      if (value.createdAt < Date.now() - this.#interval){
        this.#cache.delete(key)
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap()
      this.#startReapLoop()
    }, this.#interval)
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
  }
}
