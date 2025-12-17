var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["PENDING"] = 0] = "PENDING";
    TodoStatus[TodoStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    TodoStatus[TodoStatus["COMPLETED"] = 2] = "COMPLETED";
})(TodoStatus || (TodoStatus = {}));
var todo = {
    id: 42,
    title: "Finish project",
    description: "Refactor the data layer",
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date(),
};
var todo2 = {
    title: "Finish project",
    description: "Refactor the data layer",
    status: TodoStatus.IN_PROGRESS,
};
