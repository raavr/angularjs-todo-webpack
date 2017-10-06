'use strict';
export default function ToArrayFilter() {
	return function (obj, addKey) {
		if (!(obj instanceof Object)) return obj;

		if (!addKey) return Object.values(obj);

		return Object.keys(obj).map(function (key) {
			return Object.defineProperty(obj[key], '$key', { enumerable: false, value: key});
		});
	};
}