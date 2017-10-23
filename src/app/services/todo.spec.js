import todoApp from '../app';
import uuid from 'uuid';

describe('Todo Service', () => {
	const TODOS_KEY = 'TODOS_KEY';
	let mTodoService, rootScope, fakeLocalStorage;

	beforeEach(() => {
		fakeLocalStorage = { 'TODOS_KEY' : {
				'todos' : [{ 
					'id': 'bbe6e867-dbb7-4566-bbd8-61371e1786ea', 
					'name': 'My Fav Movies', 
					'items': { 
						'1465941600000': [
							{ 'title': 'Avengers', 'done': false }
						] 
					}
				}]
			}
		};
	});

    beforeEach(() => {
        angular.mock.module(todoApp.name);
    });

    beforeEach(() => {
		angular.mock.inject(($window, todoService, $rootScope) => {
			mTodoService = todoService;
			rootScope = $rootScope.$new();

			spyOn(uuid, 'v4').and.returnValue('aae6e867-dbb7-4566-bbd8-61371e1786ea');
			spyOn($window.localStorage, 'getItem').and.callFake((key) => fakeLocalStorage[key]);
			spyOn($window.localStorage, 'setItem').and.callFake((key, value) => fakeLocalStorage[key] = angular.fromJson(value));
		});
    });

    it('should add new category', () => {
		let newCat = { 
			id: 'aae6e867-dbb7-4566-bbd8-61371e1786ea', 
			name: 'Fav things', 
			items : {}
		};
		mTodoService.addCategory('Fav things');
		rootScope.$digest();

		expect(fakeLocalStorage[TODOS_KEY].todos[1]).toEqual(newCat);
    });

    it('should return category with quantity', () => {
		fakeLocalStorage[TODOS_KEY].todos.push({ 
			id: 'aae6e867-dbb7-4566-bbd8-61371e1786ea', 
			name: 'Fav things', 
			items : {}
		});

		let expectedObject = [
			{
				id: 'bbe6e867-dbb7-4566-bbd8-61371e1786ea',
				name: 'My Fav Movies',
				quantity: 1
			},
			{
				id: 'aae6e867-dbb7-4566-bbd8-61371e1786ea',
				name: 'Fav things',
				quantity: 0
			}
		];

		let returnedObject;
		mTodoService.getAllCategoryWithQuantity()
			.then((data) => returnedObject = data);
		rootScope.$digest();

		expect(returnedObject).toEqual(expectedObject);

    });

    it('should remove category by id', () => {
		let categoryId = 'bbe6e867-dbb7-4566-bbd8-61371e1786ea';
		let index = fakeLocalStorage[TODOS_KEY].todos.findIndex((elem) => elem.id === categoryId);
		expect(index).toBeGreaterThan(-1);

		mTodoService.deleteCategory(categoryId);
		rootScope.$digest();

		index = fakeLocalStorage[TODOS_KEY].todos.findIndex((elem) => elem.id === categoryId);
		expect(index).toEqual(-1);
    });
});