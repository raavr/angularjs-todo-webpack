import todoApp from '../../app';

describe('TasksListCtrl', () => {
  let tasksListCtrl, stateParams, deffered, rootScope, categorySample;
  const dateKey = '1465941600000', index = 0;

  beforeEach(() => {
    angular.mock.module(todoApp.name);
  });

  beforeEach(() => {
    categorySample = {
      id: 'bbe6e867-dbb7-4566-bbd8-61371e1786ea',
      category: 'My Fav Movies',
      items: {
        1465941600000: [
          { title: 'Avengers', done: false }
        ]
      }
    };
    stateParams = { id: 'bbe6e867-dbb7-4566-bbd8-61371e1786ea' };

    angular.mock.inject(($controller, todoService, $q, $uibModal, $rootScope) => {
      deffered = $q.defer();
      rootScope = $rootScope.$new();

      spyOn(todoService, 'getCategoryById').and.returnValue(deffered.promise);
      spyOn(todoService, 'removeTask').and.returnValue(deffered.promise);
      spyOn(rootScope, '$broadcast');

      tasksListCtrl = $controller('TasksListCtrl', {
        todoService: todoService,
        $stateParams: stateParams,
        $uibModal: $uibModal,
        $rootScope: rootScope
      });

    });
  });

  it('should editedTask be defined', () => {
    expect(tasksListCtrl.editedTask).toBeDefined();
  });

  it('should isEdited return false', () => {
    const id = 'bbe6e867-dbb7-4566-bbd8-61371e1786ea';
    expect(tasksListCtrl.isEdited(id, index)).toEqual(false);
  });

  it('should categoryItem has no value', () => {
    expect(tasksListCtrl.hasTasks()).toBe(false);
  });

  describe('when category data is loaded', () => {

    beforeEach(() => {
      deffered.resolve(categorySample);
      rootScope.$digest();
    });

    it('should categoryItem be defined', () => {
      expect(tasksListCtrl.categoryItem).toBeDefined();
    });

    it('should categoryItem contain movies category', () => {
      expect(tasksListCtrl.categoryItem.category).toEqual('My Fav Movies');
    });

    it('should categoryItem has value', () => {
      expect(tasksListCtrl.hasTasks()).toBe(true);
    });

    it('should task be finished', () => {
      expect(tasksListCtrl.categoryItem.items[dateKey][index].done).toBe(false);
      tasksListCtrl.finishTask(dateKey, index);
      expect(tasksListCtrl.categoryItem.items[dateKey][index].done).toBe(true);
    });

    it('remove entire dateKey with all task', () => {
      expect(tasksListCtrl.categoryItem.items[dateKey]).toBeDefined();

      tasksListCtrl.removeTask(dateKey, index);
      deffered.resolve();
      rootScope.$digest();

      expect(tasksListCtrl.categoryItem.items[dateKey]).not.toBeDefined();

    });

    it('should call $broadcast', () => {
      tasksListCtrl.removeTask(dateKey, index);
      deffered.resolve();
      rootScope.$digest();

      expect(rootScope.$broadcast).toHaveBeenCalled();
    });
  });

  it('remove only one task', () => {

    categorySample.items[dateKey].push({ title: 'Batman', done: false });

    deffered.resolve(categorySample);
    rootScope.$digest();

    expect(tasksListCtrl.categoryItem.items[dateKey].length).toEqual(2);

    tasksListCtrl.removeTask(dateKey, index);
    deffered.resolve();
    rootScope.$digest();

    expect(tasksListCtrl.categoryItem.items[dateKey].length).toEqual(1);

  });
});
