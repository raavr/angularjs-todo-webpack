'use strict';
export default function MaxLenFilter() {
	return function(value, maxLen) {
		if(typeof value !== 'undefined' && value.length > maxLen) {
			return value.substr(0, maxLen - 3) + '...';
		}

		return value;
	};
}