import { TodoApi } from "../7/todo-api";
import { TodoService } from "../8/todo-service";
import { Todo, TodoStatus } from "../1/type";

jest.mock("../7/todo-api");

describe("TodoService", () => {
  let service: TodoService;
  let mockApi: jest.Mocked<TodoApi>;

  beforeEach(() => {
    mockApi = new TodoApi() as jest.Mocked<TodoApi>;
    service = new TodoService(mockApi);
  });

  it("create для правильного создание задачи, при правильном заголовке", async () => {
    const todoTitle = "Hi";
    const obj1 = {
      title: todoTitle,
      description: "",
      status: TodoStatus.PENDING,
    };
    const fakeObj = {
      id: 1,
      createdAt: new Date(),
      ...obj1,
    };

    mockApi.add.mockResolvedValue(fakeObj);
    const result = await service.create(todoTitle);
    expect(mockApi.add).toHaveBeenCalledWith(obj1);
    expect(result).toEqual(fakeObj);
  });

  it("create для ошибок, если заголовок пустой или состоит из пробелов", async () => {
    await expect(service.create("")).rejects.toThrow("Нет титла");
    await expect(service.create(" ")).rejects.toThrow("Нет титла");
    expect(mockApi.add).not.toHaveBeenCalledTimes(1);
  });

  it("toggleStatus для правильной смены TodoStatue c pending на completed", async () => {
    const obj: Todo = {
      id: 1,
      title: "Hi",
      description: "",
      status: TodoStatus.PENDING,
      createdAt: new Date(),
    };
    mockApi.getAll.mockResolvedValue([obj]);
    await service.toggleStatus(1);
    expect(mockApi.getAll).toHaveBeenCalledTimes(1);
    expect(mockApi.update).toHaveBeenCalledTimes(1);
    expect(mockApi.update).toHaveBeenCalledWith(1, {
      status: TodoStatus.COMPLETED,
    });
  });

  it("toggleStatus для правильной смены TodoStatue c completed на pending", async () => {
    const obj: Todo = {
      id: 1,
      title: "Hi",
      description: "",
      status: TodoStatus.COMPLETED,
      createdAt: new Date(),
    };
    mockApi.getAll.mockResolvedValue([obj]);
    await service.toggleStatus(1);
    expect(mockApi.getAll).toHaveBeenCalledTimes(1);
    expect(mockApi.update).toHaveBeenCalledTimes(1);
    expect(mockApi.update).toHaveBeenCalledWith(1, {
      status: TodoStatus.PENDING,
    });
  });

  it("toggleStatus ошибки при изменении статуса", async () => {
    mockApi.getAll.mockResolvedValue([]);
    await expect(service.toggleStatus(100000000000)).rejects.toThrow(
      "Не найден Todo с таким id"
    );
    expect(mockApi.update).not.toHaveBeenCalled();
  });

  it("toggleStatus с некорректным вводом", async () => {
    await expect(service.toggleStatus(-1)).rejects.toThrow("Нету такого айди");
    expect(mockApi.getAll).not.toHaveBeenCalled();
    expect(mockApi.update).not.toHaveBeenCalled();
  });

  it("search при правильном ключевом слове", async () => {
    const arr: Todo[] = [
      {
        id: 1,
        title: "hi",
        description: "Todo",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "goodbye",
        description: "Exp",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Nice",
        description: "Some",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "Lucky",
        description: "Papa",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
    ];
    mockApi.getAll.mockResolvedValue(arr);
    let result = await service.search("Exp");
    expect(mockApi.getAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(arr[1]);
  });

  it("search если нет подходящих слов для ключа", async () => {
    const arr: Todo[] = [
      {
        id: 1,
        title: "hi",
        description: "Todo",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "goodbye",
        description: "Exp",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Nice",
        description: "Some",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "Lucky",
        description: "Papa",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
    ];
    mockApi.getAll.mockResolvedValue(arr);
    let result = await service.search("Xxaxa");
    expect(result).toHaveLength(0);
  });

  it("search если ключевое слово пустое", async () => {
    const arr: Todo[] = [
      {
        id: 1,
        title: "hi",
        description: "Todo",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "goodbye",
        description: "Exp",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Nice",
        description: "Some",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "Lucky",
        description: "Papa",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
    ];
    mockApi.getAll.mockResolvedValue(arr);
    let result = await service.search("");
    let result2 = await service.search(" ");
    expect(result).toHaveLength(4);
    expect(result2).toHaveLength(4);
    expect(result).toEqual(arr);
    expect(result2).toEqual(arr);
  });

  it("проверка регистра", async () => {
    const arr: Todo[] = [
      {
        id: 1,
        title: "hi",
        description: "Todo",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "goodbye",
        description: "Exp",
        status: TodoStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Nice",
        description: "Some",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "Lucky",
        description: "Papa",
        status: TodoStatus.COMPLETED,
        createdAt: new Date(),
      },
    ];
    mockApi.getAll.mockResolvedValue(arr);
    let result = await service.search("GOODBYE");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(arr[1]);
  });
});
