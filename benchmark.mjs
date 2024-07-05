/* eslint no-undef: "off" */

import {Buffer} from 'node:buffer';
import {randomBytes} from 'node:crypto';
import benchmark from 'benchmark';
import {
	base64ToString,
	compareUint8Arrays,
	concatUint8Arrays,
	hexToUint8Array,
	isUint8Array,
	stringToBase64,
	stringToUint8Array,
	uint8ArrayToBase64,
	uint8ArrayToHex,
	uint8ArrayToString,
	getUintBE,
	indexOf,
	includes,
} from './index.js';

const oneMb = 1024 * 1024;
const largeUint8Array = new Uint8Array(randomBytes(oneMb).buffer);
// eslint-disable-next-line unicorn/prefer-spread
const largeUint8ArrayDuplicate = largeUint8Array.slice();
const partOfUint8Array = largeUint8Array.slice(-1024);
const textFromUint8Array = uint8ArrayToString(largeUint8Array);
const base64FromUint8Array = Buffer.from(textFromUint8Array).toString('base64');
const hexFromUint8Array = uint8ArrayToHex(largeUint8Array);
const view = new DataView(largeUint8Array.buffer, 0, 10);

const suite = new benchmark.Suite();

suite.add('isUint8Array', () => isUint8Array(largeUint8Array));

suite.add('compareUint8Arrays', () => compareUint8Arrays(largeUint8Array, largeUint8ArrayDuplicate));

suite.add('concatUint8Arrays with 2 arrays', () => concatUint8Arrays([largeUint8Array, largeUint8Array]));

suite.add('concatUint8Arrays with 3 arrays', () => concatUint8Arrays([largeUint8Array, largeUint8Array]));

suite.add('concatUint8Arrays with 4 arrays', () => concatUint8Arrays([largeUint8Array, largeUint8Array, largeUint8Array, largeUint8Array]));

suite.add('uint8ArrayToString', () => uint8ArrayToString(largeUint8Array));

suite.add('uint8ArrayToString - latin1', () => uint8ArrayToString(largeUint8Array, 'latin1'));

suite.add('stringToUint8Array', () => stringToUint8Array(textFromUint8Array));

suite.add('uint8ArrayToBase64', () => uint8ArrayToBase64(largeUint8Array));

suite.add('stringToBase64', () => stringToBase64(textFromUint8Array));

suite.add('base64ToString', () => base64ToString(base64FromUint8Array));

suite.add('uint8ArrayToHex', () => uint8ArrayToHex(largeUint8Array));

suite.add('hexToUint8Array', () => hexToUint8Array(hexFromUint8Array));

suite.add('getUintBE', () => getUintBE(view));

suite.add('indexOf', () => indexOf(largeUint8Array, partOfUint8Array));

suite.add('includes', () => includes(largeUint8Array, partOfUint8Array));

suite.on('cycle', event => console.log(event.target.toString()));
suite.run({async: false});
