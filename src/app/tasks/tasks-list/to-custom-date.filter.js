'use strict';
export default function ToCustomDateFilter($filter) {
	return function(value) {
		const dValue = $filter('date')(value, 'dd.MM.yyyy'),
			  dNow = $filter('date')(new Date().getTime(), 'dd.MM.yyyy'),
			  tomorrow = new Date().setDate(new Date().getDate() + 1),
			  yesterday = new Date().setDate(new Date().getDate() - 1),
			  dYesterday = $filter('date')(yesterday, 'dd.MM.yyyy'),
			  dTomorrow = $filter('date')(tomorrow, 'dd.MM.yyyy');

		switch(dValue) {
			case dNow:
				return 'Today';
			case dTomorrow:
				return 'Tomorrow';
			case dYesterday:
				return 'Yesterday';
			default:
				return dValue;
		}
	};
}

ToCustomDateFilter.$inject = ['$filter'];