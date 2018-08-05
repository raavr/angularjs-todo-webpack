import todoApp from '../../app';

describe('tasksContainer', () => {
  let ctrl, deffered, scope, categorySample, taskGroup;
  const dateKey = '1465941600000', index = 0;

  beforeEach(() => {
    angular.mock.module(todoApp.name);
  });

  beforeEach(() => {
    categorySample = {
      id: 'bbe6e867-dbb7-4566-bbd8-61371e1786ea',
      name: 'My Fav Movies',
      items: {
        1465941600000: [
          { title: 'Avengers', done: false }
        ]
      }
    };
    taskGroup = { 
      key: dateKey, 
      taskIdx: index
    }
  });

  beforeEach(angular.mock.inject(($injector, todoService, $q, $uibModal) => {
    const $rootScope = $injector.get("$rootScope");
    const $compile = $injector.get("$compile");

    scope = $rootScope.$new();
    const element = $compile("<tasks-container></tasks-container>")(scope);
    ctrl = element.controller("tasksContainer");
    scope.$apply();

    deffered = $q.defer();
    spyOn(todoService, 'getCategoryById').and.returnValue(deffered.promise);
    spyOn(todoService, 'removeTask').and.returnValue(deffered.promise);
    spyOn(ctrl.$rootScope, '$broadcast');
  }));

  it('should editedTask be defined', () => {
    expect(ctrl.editedTask).toBeDefined();
  });

  it('should categoryItem has no value', () => {
    expect(ctrl.hasTasks()).toBe(false);
  });

  describe('when category data is loaded', () => {
    
    beforeEach(() => {
      ctrl.$onInit();
      deffered.resolve(categorySample);
      scope.$apply();
    });

    it('should categoryItem be defined', () => {
      expect(ctrl.categoryItem).toBeDefined();
    });

    it('should categoryItem contain movies category', () => {
      expect(ctrl.categoryItem.name).toEqual('My Fav Movies');
    });

    it('should categoryItem has value', () => {
      expect(ctrl.hasTasks()).toBe(true);
    });

    it('should task be finished', () => {
      expect(ctrl.categoryItem.items[dateKey][index].done).toBe(false);
      ctrl.finishTask({taskGroup});
      expect(ctrl.categoryItem.items[dateKey][index].done).toBe(true);
    });

    it('remove entire dateKey with all task', () => {
      expect(ctrl.categoryItem.items[dateKey]).toBeDefined();
      ctrl.removeTask({taskGroup});
      scope.$apply();

      expect(ctrl.categoryItem.items[dateKey]).not.toBeDefined();

    });

    it('should call $broadcast', () => {
      ctrl.removeTask({taskGroup});
      scope.$apply();

      expect(ctrl.$rootScope.$broadcast).toHaveBeenCalled();
    });
  });
    
  it('remove the only one task', () => {
    
    categorySample.items[dateKey].push({ title: 'Batman', done: false });

    ctrl.$onInit();
    deffered.resolve(categorySample);
    scope.$apply();
    
    expect(ctrl.categoryItem.items[dateKey].length).toEqual(2);
    
    ctrl.removeTask({taskGroup});
    scope.$apply();
    
    expect(ctrl.categoryItem.items[dateKey].length).toEqual(1);
  });
});
