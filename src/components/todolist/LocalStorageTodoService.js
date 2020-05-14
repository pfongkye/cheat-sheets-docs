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
}
