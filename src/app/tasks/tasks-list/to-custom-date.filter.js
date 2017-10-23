'use strict';
export default function ToCustomDateFilter($filter) {
	return function(value) {
		const dValue = $filter('date')(value, 'dd.MM.yyyy'),
			  dNow = $filter('date')(new Date().getTime(), 'dd.MM.yyyy'),
			  tomorrow = new Date().setDate(new Date().getDate() + 1),
			  yesterday = new Date().setDate(new Date().getDate() - 1),
			  dYesterday = $filter('date')(yesterday, 'dd.MM.yyyy'),
			  dTomorrow = $filter('date')(tomorrow, 'dd.MM.yyyy');

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