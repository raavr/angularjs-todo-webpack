'use strict';
var angular = require('angular');
var uuid = require('uuid');

const TODOS_KEY = 'TODOS_KEY';

function getDatetimeFromNow(days) {
	let date = new Date();
	date.setDate(new Date().getDate() + days);
	return date;
}

function createTask(task, obj) {
	let timestamp = task.date.getTime();
	if(typeof obj[timestamp] === 'undefined') {
		obj[timestamp] = [];
	}

	obj[timestamp].push({title : task.title, done : false});

	return obj;
}

function countTasks(object) {
	let keys = Object.keys(object);
	let sum = 0;
	keys.forEach((key) => {
		sum += object[key].length;
	});

	return sum;
}

export default class TodoService {
	
	constructor($q, $window) {
		this.$q = $q;
		this.localStorage = $window.localStorage;
	}


	_createSampleTask() {
		let itemsPersonal = createTask({'date' : getDatetimeFromNow(0), 'title':'Walk the dog'}, {});
		createTask({'date' : getDatetimeFromNow(1), 'title':'Make hotel reservation'}, itemsPersonal);

		let itemsShopping = createTask({'date' : getDatetimeFromNow(0), 'title':'Milk'}, {});
		createTask({'date' : getDatetimeFromNow(0), 'title':'Fruit'}, itemsShopping);
		createTask({'date' : getDatetimeFromNow(0), 'title':'Bread'}, itemsShopping);

		let itemsMovies = createTask({'date' : getDatetimeFromNow(1), 'title':'Interstellar'}, {});
		createTask({'date' : getDatetimeFromNow(1), 'title':'The Revenant'}, itemsMovies);
		createTask({'date' : getDatetimeFromNow(17), 'title':'Avengers'}, itemsMovies);

		let list = {'todos':[
					{'id':uuid.v4(),'name':'Personal','items':itemsPersonal},
					{'id':uuid.v4(),'name':'Shopping List','items':itemsShopping},
					{'id': uuid.v4(),'name':'Movies to watch','items':itemsMovies}
					]};
		this._save(list);

		return list;
	}

	_getAll() {
		let deferred = this.$q.defer();
		let list = angular.fromJson(this.localStorage.getItem(TODOS_KEY));
		if(!list) {
			list = this._createSampleTask();
		} 
		deferred.resolve(list);

		return deferred.promise;
	}

	 _save(data) {
		this.localStorage.setItem(TODOS_KEY, angular.toJson(data));
	}

	addCategory(categoryName) {
		return this._getAll().then((data) => {
			let catObj = {
				id : uuid.v4(), 
				name : categoryName, 
				items: {}
			};
			data.todos.push(catObj);
			this._save(data);
			return catObj;
		});
	}

	getAllCategoryWithQuantity() {
		return this._getAll().then((data) => {
			let categories = [];
			data.todos.forEach((elem) => {
				let obj = {
					id: elem.id, 
					name: elem.name, 
					quantity: countTasks(elem.items)
				};
				categories.push(obj);
			});

			return categories;
		});
	}

	getCategoryById(id) {
		return this._getAll().then((data) => {
			let item = data.todos.filter((d) => {
				if(d.id === id)
					return d;

				return null;
			});


			return item[0];
		});
	}

	addTask(task, catId) {
		return this._getAll().then((data) => {
			data.todos.forEach((d) => {
				if(d.id === catId) {
					d.items = createTask(task, d.items);
				}
			});

			this._save(data);
			return data;
		});
	}

	deleteCategory(id) {
		return this._getAll().then((data) => {
			let index = data.todos.findIndex((d) => {
				return d.id === id;
			});

			if(index > -1) {
				data.todos.splice(index, 1);
			}
			this._save(data);

			return index;
		});
	}

	updateTask(obj) {
		return this._getAll().then((data) => {
			let item = data.todos.filter((d) => {
				if(d.id === obj.catId) {
					return d;
				}

				return null;
			});

			item[0].items[obj.dateKey][obj.taskId] = obj.task;
			this._save(data);

			return item[0];
		});
	}

	removeTask(catId, dateKey, taskId) {
		return this._getAll().then((data) => {
			let item = data.todos.filter((d) => {
				if(d.id === catId) {
					return d;
				}

				return null;
			});

			let dateTask = item[0].items;
			if(dateTask[dateKey].length > 1) {
				dateTask[dateKey].splice(taskId, 1);
			} else {
				delete dateTask[dateKey];
			}
			this._save(data);

			return item[0];
		});

		
	}

}

TodoService.$inject = ['$q', '$window'];
