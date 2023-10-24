/**
Check if the given value is an instance of `Uint8Array`.

@example
````
import {isUint8Array} from 'uint8array-extras';

console.log(isUint8Array(new Uint8Array()));
//=> true

console.log(isUint8Array(new ArrayBuffer(10)));
//=> false
````
*/
export function isUint8Array(value: unknown): value is Uint8Array;

/**
Throw a `TypeError` if the given value is not an instance of `Uint8Array`.

@example
````
import {assertUint8Array} from 'uint8array-extras';

try {
	assertUint8Array(new ArrayBuffer(10)); // Throws a TypeError
} catch (error) {
	console.error(error.message);
}
````
*/
export function assertUint8Array(value: unknown): asserts Uint8Array;

/**
Concatenate the given arrays into a new array.

If `arrays` is empty, it will return a zero-sized `Uint8Array`.

If `totalLength` is not specified, it is calculated from summing the lengths of the given arrays.

@example
````
import {concatUint8Arrays} from 'uint8array-extras';

const a = new Uint8Array([1, 2, 3]);
const b = new Uint8Array([4, 5, 6]);

console.log(concatUint8Arrays([a, b]));
//=> Uint8Array [1, 2, 3, 4, 5, 6]
````
*/
export function concatUint8Arrays(arrays: Uint8Array[], totalLength?: number): Uint8Array;

/**
Check if two arrays are identical by verifying that they contain the same bytes in the same sequence.

@example
```
import {areUint8ArraysEqual} from 'uint8array-extras';

const a = new Uint8Array([1, 2, 3]);
const b = new Uint8Array([1, 2, 3]);
const c = new Uint8Array([4, 5, 6]);

console.log(areUint8ArraysEqual(a, b));
//=> true

console.log(areUint8ArraysEqual(a, c));
//=> false
```
*/
export function areUint8ArraysEqual(a: Uint8Array, b: Uint8Array): boolean;

/**
Compare two arrays and indicate their relative order or equality. Useful for sorting.

@example
```
import {compareUint8Arrays} from 'uint8array-extras';

const array1 = new Uint8Array([1, 2, 3]);
const array2 = new Uint8Array([4, 5, 6]);
const array3 = new Uint8Array([7, 8, 9]);

[array3, array1, array2].sort(compareUint8Arrays);
//=> [1, 2, 3], [4, 5, 6], [7, 8, 9]
```
*/
export function compareUint8Arrays(a: Uint8Array, b: Uint8Array): 0 | 1 | -1;
