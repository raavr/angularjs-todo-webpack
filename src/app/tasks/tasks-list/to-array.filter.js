'use strict';
export default function ToArrayFilter() {
	return function (obj) {
		if (!(obj instanceof Object)) return obj;

		return Object.keys(obj).map(function (key) {
			return Object.defineProperty(obj[key], '$key', { enumerable: false, value: key});
		});
	};
}