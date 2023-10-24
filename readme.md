# uint8array-extras

> Useful utilities for working with [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (and [`Buffer`](https://nodejs.org/api/buffer.html))

This package tries to fill in the gaps when moving from Node.js `Buffer` to `Uint8Array`.

Note that `Buffer` is a `Uint8Array` subclass, so you can use this package with `Buffer` too.

This package is tree-shakeable.

## Install

```sh
npm install uint8array-extras
```

## Usage

```js
import {concatUint8Arrays} from 'uint8array-extras';

const a = new Uint8Array([1, 2, 3]);
const b = new Uint8Array([4, 5, 6]);

console.log(concatUint8Arrays([a, b]));
//=> Uint8Array [1, 2, 3, 4, 5, 6]
```

## API

### `isUint8Array(value: unknown): boolean`

Check if the given value is an instance of `Uint8Array`.

### `assertUint8Array(value: unknown)`

Throw a `TypeError` if the given value is not an instance of `Uint8Array`.

### `concatUint8Arrays(arrays: Uint8Array[], totalLength?: number): Uint8Array`

Concatenate the given arrays into a new array.

If `arrays` is empty, it will return a zero-sized `Uint8Array`.

If `totalLength` is not specified, it is calculated from summing the lengths of the given arrays.

### `areUint8ArraysEqual(a: Uint8Array, b: Uint8Array): boolean`

Check if two arrays are identical by verifying that they contain the same bytes in the same sequence.

### `compareUint8Arrays(a: Uint8Array, b: Uint8Array): 0 | 1 | -1`

Compare two arrays and indicate their relative order or equality. Useful for sorting.
