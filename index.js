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

export function uint8ArrayToBase64(array) {
	assertUint8Array(array);

	// Required as `btoa` and `atob` don't properly support Unicode: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
	return globalThis.btoa(String.fromCodePoint(...array));
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

const byteToHexLookupTable = Array.from({length: 256}, (_, index) => index.toString(16).padStart(2, '0'));

export function uint8ArrayToHex(array) {
	assertUint8Array(array);

	// Concatenating a string is faster than using an array.
	let hexString = '';

	// eslint-disable-next-line unicorn/no-for-loop -- Max performance is critical.
	for (let index = 0; index < array.length; index++) {
		hexString += byteToHexLookupTable[array[index]];
	}

	return hexString;
}

const hexToDecimalLookupTable = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
};

export function hexToUint8Array(hexString) {
	assertString(hexString);

	if (hexString.length % 2 !== 0) {
		throw new Error('Invalid Hex string length.');
	}

	const resultLength = hexString.length / 2;
	const bytes = new Uint8Array(resultLength);

	for (let index = 0; index < resultLength; index++) {
		const highNibble = hexToDecimalLookupTable[hexString[index * 2]];
		const lowNibble = hexToDecimalLookupTable[hexString[(index * 2) + 1]];

		if (highNibble === undefined || lowNibble === undefined) {
			throw new Error(`Invalid Hex character encountered at position ${index * 2}`);
		}

		bytes[index] = (highNibble << 4) | lowNibble; // eslint-disable-line no-bitwise
	}

	return bytes;
}
