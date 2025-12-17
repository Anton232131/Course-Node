import { EntityNotFoundError, InMemoryRepository } from "../7/repository";

describe("Task 07: Generic Repository", () => {
  interface Entity {
    id: number;
    value: string;
  }
  const repo = new InMemoryRepository<Entity>();

  it("add and findAll should work", () => {
    repo.add({ id: 1, value: "A" });
    repo.add({ id: 2, value: "B" });
    expect(repo.findAll().length).toBe(2);
  });

  it("findById should return correct entity", () => {
    const e = repo.findById(1);
    expect(e?.value).toBe("A");
  });

  it("update should patch entity", () => {
    repo.update(1, { value: "AA" });
    expect(repo.findById(1)?.value).toBe("AA");
  });

  it("remove should delete entity", () => {
    repo.remove(2);
    expect(repo.findById(2)).toBeUndefined();
  });

  it("ошибка EnityNotFound при обновлении несуществуещего айди", () => {
    expect(() => {
      repo.update(10000, { value: "AA" });
    }).toThrow(EntityNotFoundError);
  });

  it("ошибка EnityMotFound при удалении несуществуещего айди", () => {
    expect(() => {
      repo.remove(999);
    }).toThrow(EntityNotFoundError);
  });
});
