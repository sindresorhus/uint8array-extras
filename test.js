import test from 'ava';
import {isUint8Array, assertUint8Array, concatUint8Arrays, areUint8ArraysEqual, compareUint8Arrays} from './index.js';

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
