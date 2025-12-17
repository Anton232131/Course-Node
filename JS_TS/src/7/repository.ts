export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    const maxId =
      this.items.length > 0
        ? Math.max(...this.items.map((item) => item.id))
        : 0;
    let newId = maxId + 1;

    const entitySecond = {
      ...entity,
      id: newId,
    } as T;

    this.items.push(entitySecond);
    return entitySecond;
  }

  update(id: number, patch: Partial<T>): T {
    let index = this.items.findIndex((element) => element.id === id);
    if (index == -1) {
      throw new EntityNotFoundError(id);
    }
    const element = this.items[index];
    let result = { ...element, ...patch } as T;
    this.items[index] = result;
    return result;
  }

  remove(id: number): void {
    let index = this.items.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new EntityNotFoundError(id);
    }
    this.items.splice(index, 1);
  }

  findById(id: number): T | undefined {
    let element = this.items.find((item) => item.id === id);
    return element;
  }

  findAll(): T[] {
    return this.items.slice();
  }
}

export class EntityNotFoundError extends Error {
  constructor(id: number) {
    super(`Entity with this ${id} not found`);
    this.name = "TodoNotFoundError";
  }
}
