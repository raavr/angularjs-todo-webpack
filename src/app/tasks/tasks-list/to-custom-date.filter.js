'use strict';
export default function ToCustomDateFilter($filter) {
	return function(value) {
		var dValue = $filter('date')(value, 'dd.MM.yyyy');
		var dNow = $filter('date')(new Date().getTime(), 'dd.MM.yyyy');
		var tomorrow = new Date().setDate(new Date().getDate() + 1);
		var yesterday = new Date().setDate(new Date().getDate() - 1);
		var dYesterday = $filter('date')(yesterday, 'dd.MM.yyyy');
		var dTomorrow = $filter('date')(tomorrow, 'dd.MM.yyyy');

		if(dValue === dNow) {
			return 'Today';
		} else if(dValue === dTomorrow) {
			return 'Tomorrow';
		} else if(dValue === dYesterday) {
			return 'Yesterday';
		} else {
			return dValue;
		}

	};
}

ToCustomDateFilter.$inject = ['$filter'];