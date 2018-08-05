const angular = require('angular');
const uuid = require('uuid');

const TODOS_KEY = 'TODOS_KEY';

function getDatetimeFromNow(days) {
  const now = new Date();
  const next = now.setDate(now.getDate() + days);

  return new Date(next);
}

function createTask(todosObj, date, title) {
  const timestamp = date.getTime();
  const currentItems = todosObj[timestamp] || [];

  todosObj[timestamp] = [
    ...currentItems,
    { title: title, done: false }
  ];

  return todosObj;
}

function countTasks(todosObj) {
  return Object.keys(todosObj).reduce((sum, key) => sum += todosObj[key].length, 0);
}

function createSampleTodos() {
  const itemsPersonal = createTask({}, getDatetimeFromNow(0), 'Walk the dog');
  createTask(itemsPersonal, getDatetimeFromNow(1), 'Make hotel reservation');

  const itemsShopping = createTask({}, getDatetimeFromNow(0), 'Milk');
  createTask(itemsShopping, getDatetimeFromNow(0), 'Fruit');
  createTask(itemsShopping, getDatetimeFromNow(0), 'Bread');

  const itemsMovies = createTask({}, getDatetimeFromNow(1), 'Interstellar');
  createTask(itemsMovies, getDatetimeFromNow(1), 'The Revenant');
  createTask(itemsMovies, getDatetimeFromNow(17), 'Avengers');

  const todosObj = {
    todos: [
      {
        id: uuid.v4(),
        name: 'Personal',
        items: itemsPersonal
      },
      {
        id: uuid.v4(),
        name: 'Shopping List',
        items: itemsShopping
      },
      {
        id: uuid.v4(),
        name: 'Movies to watch',
        items: itemsMovies
      }
    ]
  }

  return todosObj;
}

export default class TodoService {

  constructor($q, $window) {
    this.$q = $q;
    this.localStorage = $window.localStorage;
  }

  _getSampleTodos() {
    const todos = createSampleTodos();
    this._save(todos);

    return todos;
  }

  _getAll() {
    const deferred = this.$q.defer();
    let todos = angular.fromJson(this.localStorage.getItem(TODOS_KEY));
    if (!todos) {
      todos = this._getSampleTodos();
    }
    deferred.resolve(todos);

    return deferred.promise;
  }

  _save(data) {
    this.localStorage.setItem(TODOS_KEY, angular.toJson(data));
  }

  addCategory(categoryName) {
    return this._getAll().then((data) => {
      const catObj = {
        id: uuid.v4(),
        name: categoryName,
        items: {}
      };
      data.todos.push(catObj);
      this._save(data);

      return catObj;
    });
  }

  getAllCategoriesWithQuantity() {
    return this._getAll().then((data) => {
      return data.todos.reduce((categories, elem) => {
        const category = {
          id: elem.id,
          name: elem.name,
          quantity: countTasks(elem.items)
        };
        return [...categories, category];
      }, []);
    });
  }

  getCategoryById(catId) {
    return this._getAll().then((data) => {
      return data.todos.filter(d => d.id === catId)[0];
    });
  }

  addTask(categoryTask) {
    return this._getAll().then((data) => {
      const category = data.todos.filter(d => d.id === categoryTask.catId)[0];
      if (!category) {
        return data;
      }

      category.items = createTask(category.items, categoryTask.task.date, categoryTask.task.title);
      this._save(data);
      return data;
    });
  }

  deleteCategory(catId) {
    return this._getAll().then((data) => {
      const index = data.todos.findIndex((d) => d.id === catId);

      if (index > -1) {
        data.todos.splice(index, 1);
      }
      this._save(data);

      return index;
    });
  }

  updateTask(categoryTask) {
    return this._getAll().then((data) => {
      const category = data.todos.filter((d) => d.id === categoryTask.catId)[0];
      if (!category || !category.items) {
        return null;
      }

      category.items[categoryTask.task.key][categoryTask.task.index] = categoryTask.task.data;
      this._save(data);

      return category;
    });
  }

  removeTask(categoryTask) {
    return this._getAll().then((data) => {
      const category = data.todos.filter((d) => d.id === categoryTask.catId)[0];
      if (!category || !category.items) {
        return null;
      }
      const tasks = category.items;
      if (tasks[categoryTask.task.key].length > 1) {
        tasks[categoryTask.task.key].splice(categoryTask.task.index, 1);
      } else {
        delete tasks[categoryTask.task.key];
      }
      this._save(data);

      return category;
    });
  }

}

TodoService.$inject = ['$q', '$window'];
