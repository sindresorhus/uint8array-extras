const objectToString = Object.prototype.toString;

export function isUint8Array(value) {
	return value && objectToString.call(value) === '[object Uint8Array]';
}

export function assertUint8Array(value) {
	if (!isUint8Array(value)) {
		throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof value}\``);
	}
}

export function concatUint8Arrays(arrays, totalLength) {
	if (arrays.length === 0) {
		return new Uint8Array(0);
	}

	totalLength ??= arrays.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0);

	const returnValue = new Uint8Array(totalLength);

	let offset = 0;
	for (const array of arrays) {
		assertUint8Array(array);
		returnValue.set(array, offset);
		offset += array.length;
	}

	return returnValue;
}

export function areUint8ArraysEqual(a, b) {
	assertUint8Array(a);
	assertUint8Array(b);

	if (a === b) {
		return true;
	}

	if (a.length !== b.length) {
		return false;
	}

	// eslint-disable-next-line unicorn/no-for-loop
	for (let index = 0; index < a.length; index++) {
		if (a[index] !== b[index]) {
			return false;
		}
	}

	return true;
}

export function compareUint8Arrays(a, b) {
	assertUint8Array(a);
	assertUint8Array(b);

	const length = Math.min(a.length, b.length);

	for (let index = 0; index < length; index++) {
		if (a[index] < b[index]) {
			return -1;
		}

		if (a[index] > b[index]) {
			return 1;
		}
	}

	// At this point, all the compared elements are equal.
	// The shorter array should come first if the arrays are of different lengths.
	if (a.length > b.length) {
		return 1;
	}

	if (a.length < b.length) {
		return -1;
	}

	return 0;
}

export function uint8ArrayToString(array) {
	assertUint8Array(array);
	return (new globalThis.TextDecoder()).decode(array);
}

function assertString(value) {
	if (typeof value !== 'string') {
		throw new TypeError(`Expected \`string\`, got \`${typeof value}\``);
	}
}

export function stringToUint8Array(string) {
	assertString(string);
	return (new globalThis.TextEncoder()).encode(string);
}

export function uint8ArrayToBase64(bytes) {
	assertUint8Array(bytes);
	// Required as `btoa` and `atob` don't properly support Unicode: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
	return globalThis.btoa(String.fromCodePoint(...bytes));
}

export function base64ToUint8Array(base64String) {
	assertString(base64String);
	return Uint8Array.from(globalThis.atob(base64String), x => x.codePointAt(0));
}

export function stringToBase64(string) {
	assertString(string);
	return uint8ArrayToBase64(stringToUint8Array(string));
}

export function base64ToString(base64String) {
	assertString(base64String);
	return uint8ArrayToString(base64ToUint8Array(base64String));
}
