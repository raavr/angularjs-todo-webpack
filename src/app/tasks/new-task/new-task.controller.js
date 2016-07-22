'use strict';
export default class NewTaskCtrl {

	constructor($uibModalInstance) {
		this.$uibModalInstance = $uibModalInstance;
		this.task = {};
		this.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1,
			opened: false
		};

	}

	openCal() {
		this.dateOptions.opened = true;
	}

	addTask() {
        this.$uibModalInstance.close(this.task);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

NewTaskCtrl.$inject = ['$uibModalInstance'];