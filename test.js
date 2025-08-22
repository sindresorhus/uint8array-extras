import test from 'ava';
import {
	isUint8Array,
	assertUint8Array,
	assertUint8ArrayOrArrayBuffer,
	toUint8Array,
	concatUint8Arrays,
	areUint8ArraysEqual,
	compareUint8Arrays,
	uint8ArrayToString,
	stringToUint8Array,
	uint8ArrayToBase64,
	base64ToUint8Array,
	stringToBase64,
	base64ToString,
	uint8ArrayToHex,
	hexToUint8Array,
	getUintBE,
	indexOf,
	includes,
} from './index.js';

test('isUint8Array', t => {
	t.true(isUint8Array(new Uint8Array()));
	t.false(isUint8Array(new Uint16Array()));
});

test('assertUint8Array', t => {
	t.throws(() => {
		assertUint8Array(1);
	}, {
		instanceOf: TypeError,
	});
});

const isUint8ArrayStrict = value => Object.getPrototypeOf(value) === Uint8Array.prototype;

test('toUint8Array - TypedArray', t => {
	const fixture = new Float32Array(1);
	t.true(isUint8ArrayStrict(toUint8Array(fixture)));
});

test('toUint8Array - ArrayBuffer', t => {
	const fixture = new ArrayBuffer(1);
	t.true(isUint8ArrayStrict(toUint8Array(fixture)));
});

test('toUint8Array - DataView', t => {
	const fixture = new DataView(new ArrayBuffer(1));
	t.true(isUint8ArrayStrict(toUint8Array(fixture)));
});

test('toUint8Array - unsupported value throws', t => {
	t.throws(() => {
		toUint8Array(123);
	}, {instanceOf: TypeError});
});

test('concatUint8Arrays - combining multiple Uint8Arrays', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array2 = new Uint8Array([4, 5, 6]);
	const array3 = new Uint8Array([7, 8, 9]);

	const result = concatUint8Arrays([array1, array2, array3]);
	t.deepEqual(result, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
});

test('concatUint8Arrays - with an empty array', t => {
	const emptyResult = concatUint8Arrays([]);
	t.deepEqual(emptyResult, new Uint8Array(0));
});

test('concatUint8Arrays - throws when input is not a Uint8Array', t => {
	t.throws(() => {
		concatUint8Arrays([123]);
	}, {
		instanceOf: TypeError,
		message: 'Expected `Uint8Array`, got `number`',
	});
});

test('areUint8ArraysEqual - with identical Uint8Arrays', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array2 = new Uint8Array([1, 2, 3]);
	t.true(areUint8ArraysEqual(array1, array2));
});

test('areUint8ArraysEqual - with different content', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array3 = new Uint8Array([1, 2, 4]);
	t.false(areUint8ArraysEqual(array1, array3));
});

test('areUint8ArraysEqual - with different sizes', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array4 = new Uint8Array([1, 2, 3, 4]);
	t.false(areUint8ArraysEqual(array1, array4));
});

test('compareUint8Arrays - with identical Uint8Arrays', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array2 = new Uint8Array([1, 2, 3]);
	t.is(compareUint8Arrays(array1, array2), 0);
});

test('compareUint8Arrays - first array is less than the second', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array3 = new Uint8Array([1, 1, 3]);
	t.is(compareUint8Arrays(array1, array3), 1);
});

test('compareUint8Arrays - first array is greater than the second', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array4 = new Uint8Array([1, 3, 3]);
	t.is(compareUint8Arrays(array1, array4), -1);
});

test('compareUint8Arrays - with different lengths', t => {
	const array1 = new Uint8Array([1, 2, 3]);
	const array5 = new Uint8Array([1, 2, 3, 4]);
	t.is(compareUint8Arrays(array1, array5), -1);
	t.is(compareUint8Arrays(array5, array1), 1);
});

test('stringToUint8Array and uint8ArrayToString', t => {
	const fixture = 'Hello';
	const array = stringToUint8Array(fixture);
	t.deepEqual(array, new Uint8Array([72, 101, 108, 108, 111]));
	t.is(uint8ArrayToString(array), fixture);
});

test('uint8ArrayToString with encoding', t => {
	t.is(uint8ArrayToString(new Uint8Array([
		207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33,
	]), 'windows-1251'), 'Привет, мир!');

	t.is(uint8ArrayToString(new Uint8Array([
		167, 65, 166, 110,
	]), 'big5'), '你好');

	t.is(uint8ArrayToString(new Uint8Array([
		130, 177, 130, 241, 130, 201, 130, 191, 130, 205,
	]), 'shift-jis'), 'こんにちは');
});

test('uint8ArrayToString with ArrayBuffer', t => {
	const fixture = new Uint8Array([72, 101, 108, 108, 111]).buffer;
	t.is(uint8ArrayToString(fixture), 'Hello');
});

test('assertUint8ArrayOrArrayBuffer', t => {
	const u8 = new Uint8Array(0);
	const ab = new ArrayBuffer(0);
	// Should not throw
	assertUint8ArrayOrArrayBuffer(u8);
	assertUint8ArrayOrArrayBuffer(ab);
	// Should throw on invalid types
	t.throws(() => {
		assertUint8ArrayOrArrayBuffer(null);
	}, {instanceOf: TypeError});
	t.throws(() => {
		assertUint8ArrayOrArrayBuffer({});
	}, {instanceOf: TypeError});
});

test('uint8ArrayToBase64 and base64ToUint8Array', t => {
	const fixture = stringToUint8Array('Hello');
	const base64 = uint8ArrayToBase64(fixture);
	t.is(base64, 'SGVsbG8=');
	t.deepEqual(base64ToUint8Array(base64), fixture);
});

test('should handle uint8ArrayToBase64 with 200k items', t => {
	const fixture = stringToUint8Array('H'.repeat(200_000));
	const base64 = uint8ArrayToBase64(fixture);
	t.deepEqual(base64ToUint8Array(base64), fixture);
});

test('uint8ArrayToBase64 and base64ToUint8Array #2', t => {
	const fixture = stringToUint8Array('a Ā 𐀀 文 🦄');
	t.deepEqual(base64ToUint8Array(uint8ArrayToBase64(base64ToUint8Array(uint8ArrayToBase64(fixture)))), fixture);
});

test('stringToBase64 and base64ToString', t => {
	const fixture = 'a Ā 𐀀 文 🦄';
	t.is(base64ToString(stringToBase64(base64ToString(stringToBase64(fixture)))), fixture);
});

test('stringToBase64 - urlSafe option', t => {
	const fixture = 'subjects?_d=1 🦄';
	t.is(stringToBase64(fixture, {urlSafe: true}), Buffer.from(fixture).toString('base64url')); // eslint-disable-line n/prefer-global/buffer
	t.is(base64ToString(stringToBase64(base64ToString(stringToBase64(fixture, {urlSafe: true})), {urlSafe: true})), fixture);
});

test('uint8ArrayToHex', t => {
	const fixture = stringToUint8Array('Hello - a Ā 𐀀 文 🦄');
	t.is(uint8ArrayToHex(fixture), Buffer.from(fixture).toString('hex')); // eslint-disable-line n/prefer-global/buffer
});

test('hexToUint8Array', t => {
	const fixtureString = 'Hello - a Ā 𐀀 文 🦄';
	const fixtureHex = Buffer.from(fixtureString).toString('hex'); // eslint-disable-line n/prefer-global/buffer
	t.deepEqual(hexToUint8Array(fixtureHex), new Uint8Array(Buffer.from(fixtureHex, 'hex'))); // eslint-disable-line n/prefer-global/buffer
});

test('hexToUint8Array - invalid length throws', t => {
	t.throws(() => {
		hexToUint8Array('A');
	}, {message: 'Invalid Hex string length.'});
});

test('hexToUint8Array - invalid character throws', t => {
	t.throws(() => {
		hexToUint8Array('0G');
	}, {message: /Invalid Hex character encountered at position 0|position 1/});
});

test('getUintBE', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab]; // eslint-disable-line unicorn/number-literal-case

	for (let index = 1; index < 6; index += 1) {
		t.is(getUintBE(new DataView(new Uint8Array(fixture).buffer, 0, index)), Buffer.from(fixture).readUintBE(0, index)); // eslint-disable-line n/prefer-global/buffer
	}

	for (let index = 0; index < 5; index += 1) {
		t.is(getUintBE(new DataView(new Uint8Array(fixture).buffer, index, 6 - index)), Buffer.from(fixture).readUintBE(index, 6 - index)); // eslint-disable-line n/prefer-global/buffer
	}
});

test('indexOf - sequence found in the middle', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	const sequence = [0x78, 0x90];
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array(sequence)), 3);
});

test('indexOf - sequence found at the end', t => {
	const fixture2 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab]; // eslint-disable-line unicorn/number-literal-case
	const sequence2 = [0x90, 0xab]; // eslint-disable-line unicorn/number-literal-case
	t.is(indexOf(new Uint8Array(fixture2), new Uint8Array(sequence2)), 4);
});

test('indexOf - sequence not found', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array([0x00, 0x01])), -1);
});

test('indexOf - sequence found at the beginning', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	const sequence3 = [0x12, 0x34];
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array(sequence3)), 0);
});

test('indexOf - sequence is the entire array', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	const sequence4 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array(sequence4)), 0);
});

test('indexOf - empty array as sequence', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	const emptyArray = [];
	t.is(indexOf(new Uint8Array(emptyArray), new Uint8Array([0x78, 0x90])), -1);
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array(emptyArray)), -1);
});

test('indexOf - single element found', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	const singleElement = [0x56];
	t.is(indexOf(new Uint8Array(fixture), new Uint8Array(singleElement)), 2);
});

test('includes', t => {
	const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]; // eslint-disable-line unicorn/number-literal-case
	t.true(includes(new Uint8Array(fixture), new Uint8Array([0x78, 0x90])));
	t.false(includes(new Uint8Array(fixture), new Uint8Array([0x90, 0x78])));
});

test('uint8ArrayToBase64 - empty input returns empty string', t => {
	const empty = new Uint8Array(0);
	t.is(uint8ArrayToBase64(empty), '');
	// And decode back
	t.deepEqual(base64ToUint8Array(''), empty);
});

test('uint8ArrayToBase64 - chunk boundaries and padding are correct', t => {
	const make = length => new Uint8Array(Array.from({length}, () => 0x41)); // 0x41 = 'A'
	const sizes = [
		65_534, // Chunk size - 1 (length % 3 === 2)
		65_535, // Exact chunk size (length % 3 === 0)
		65_536, // Chunk size + 1 (length % 3 === 1)
		(2 * 65_535) - 2,
		(2 * 65_535) - 1,
		(2 * 65_535),
		(2 * 65_535) + 1,
	];

	for (const size of sizes) {
		const u8 = make(size);
		const b64 = uint8ArrayToBase64(u8);
		const roundTrip = base64ToUint8Array(b64);
		t.deepEqual(roundTrip, u8);
	}
});

test('base64ToUint8Array - accepts Base64URL without padding', t => {
	const cases = [
		['f', 'Zg'],
		['fo', 'Zm8'],
		['foo', 'Zm9v'],
		['foob', 'Zm9vYg'],
		['fooba', 'Zm9vYmE'],
		['foobar', 'Zm9vYmFy'],
	];

	for (const [plain, base64url] of cases) {
		const decoded = base64ToString(base64url);
		t.is(decoded, plain);
		// And Uint8Array path
		const u8 = base64ToUint8Array(base64url);
		t.is(uint8ArrayToString(u8), plain);
	}
});
