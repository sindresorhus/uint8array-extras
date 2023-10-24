/**
Check if the given value is an instance of `Uint8Array`.

Replacement for [`Buffer.isBuffer()`](https://nodejs.org/api/buffer.html#static-method-bufferisbufferobj).

@example
```
import {isUint8Array} from 'uint8array-extras';

console.log(isUint8Array(new Uint8Array()));
//=> true

console.log(isUint8Array(new ArrayBuffer(10)));
//=> false
```
*/
export function isUint8Array(value: unknown): value is Uint8Array;

/**
Throw a `TypeError` if the given value is not an instance of `Uint8Array`.

@example
```
import {assertUint8Array} from 'uint8array-extras';

try {
	assertUint8Array(new ArrayBuffer(10)); // Throws a TypeError
} catch (error) {
	console.error(error.message);
}
```
*/
export function assertUint8Array(value: unknown): asserts value is Uint8Array;

/**
Concatenate the given arrays into a new array.

If `arrays` is empty, it will return a zero-sized `Uint8Array`.

If `totalLength` is not specified, it is calculated from summing the lengths of the given arrays.

Replacement for [`Buffer.concat()`](https://nodejs.org/api/buffer.html#static-method-bufferconcatlist-totallength).

@example
```
import {concatUint8Arrays} from 'uint8array-extras';

const a = new Uint8Array([1, 2, 3]);
const b = new Uint8Array([4, 5, 6]);

console.log(concatUint8Arrays([a, b]));
//=> Uint8Array [1, 2, 3, 4, 5, 6]
```
*/
export function concatUint8Arrays(arrays: Uint8Array[], totalLength?: number): Uint8Array;

/**
Check if two arrays are identical by verifying that they contain the same bytes in the same sequence.

Replacement for [`Buffer#equals()`](https://nodejs.org/api/buffer.html#bufequalsotherbuffer).

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

Replacement for [`Buffer.compare()`](https://nodejs.org/api/buffer.html#static-method-buffercomparebuf1-buf2).

@example
```
import {compareUint8Arrays} from 'uint8array-extras';

const array1 = new Uint8Array([1, 2, 3]);
const array2 = new Uint8Array([4, 5, 6]);
const array3 = new Uint8Array([7, 8, 9]);

[array3, array1, array2].sort(compareUint8Arrays);
//=> [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```
*/
export function compareUint8Arrays(a: Uint8Array, b: Uint8Array): 0 | 1 | -1;

/**
Convert a `Uint8Array` (containing a UTF-8 string) to a string.

Replacement for [`Buffer#toString()`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).

@example
```
import {uint8ArrayToString} from 'uint8array-extras';

const byteArray = new Uint8Array([72, 101, 108, 108, 111]);

console.log(uint8ArrayToString(byteArray));
//=> 'Hello'
```
*/
export function uint8ArrayToString(array: Uint8Array): string;

/**
Convert a string to a `Uint8Array` (using UTF-8 encoding).

Replacement for [`Buffer.from('Hello')`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding).

@example
```
import {stringToUint8Array} from 'uint8array-extras';

console.log(stringToUint8Array('Hello'));
//=> Uint8Array [72, 101, 108, 108, 111]
```
*/
export function stringToUint8Array(string: string): Uint8Array;

/**
Convert a `Uint8Array` to a Base64-encoded string.

Replacement for [`Buffer#toString('base64')`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).

@example
```
import {uint8ArrayToBase64} from 'uint8array-extras';

const byteArray = new Uint8Array([72, 101, 108, 108, 111]);

console.log(uint8ArrayToBase64(byteArray));
//=> 'SGVsbG8='
```
*/
export function uint8ArrayToBase64(array: Uint8Array): string;

/**
Convert a Base64-encoded string to a `Uint8Array`.

Replacement for [`Buffer.from('SGVsbG8=', 'base64')`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding).

@example
```
import {base64ToUint8Array} from 'uint8array-extras';

console.log(base64ToUint8Array('SGVsbG8='));
//=> Uint8Array [72, 101, 108, 108, 111]
```
*/
export function base64ToUint8Array(string: string): Uint8Array;

/**
Encode a string to Base64-encoded string.

Replacement for `Buffer.from('🦄').toString('base64')`.

@example
```
import {stringToBase64} from 'uint8array-extras';

console.log(stringToBase64('Hello'));
//=> 'SGVsbG8='
```
*/
export function stringToBase64(string: string): string;

/**
Decode a Base64-encoded string to a string.

Replacement for `Buffer.from('SGVsbG8=', 'base64').toString()`.

@example
```
import {base64ToString} from 'uint8array-extras';

console.log(base64ToString('SGVsbG8='));
//=> 'Hello'
```
*/
export function base64ToString(base64String: string): string;

/**
Convert a `Uint8Array` to a Hex string.

Replacement for [`Buffer#toString('hex')`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).

@example
```
import {uint8ArrayToHex} from 'uint8array-extras';

const byteArray = new Uint8Array([72, 101, 108, 108, 111]);

console.log(uint8ArrayToHex(byteArray));
//=> '48656c6c6f'
```
*/
export function uint8ArrayToHex(array: Uint8Array): string;

/**
Convert a Hex string to a `Uint8Array`.

Replacement for [`Buffer.from('48656c6c6f', 'hex')`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding).

@example
```
import {hexToUint8Array} from 'uint8array-extras';

console.log(hexToUint8Array('48656c6c6f'));
//=> Uint8Array [72, 101, 108, 108, 111]
```
*/
export function hexToUint8Array(hexString: string): Uint8Array;
