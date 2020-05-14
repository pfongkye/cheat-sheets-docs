export default class LocalStorageTodoService {
  constructor(localStorage) {
    this.localStorage = localStorage;
  }
  getTodos() {
    const todos = this.localStorage.getItem("todos");
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  }
  saveTodo(todo) {
    if (todo && todo.value && todo.id) {
      const todos = this.getTodos().filter((td) => td.id !== todo.id);
      this.localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    }
  }
}
