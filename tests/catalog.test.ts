import assert from 'node:assert/strict';
import test from 'node:test';
import {findProduct,listProducts} from '../src/catalog.js';
test('catalog returns products',()=>assert.equal(listProducts().length,3));
test('search is case insensitive',()=>assert.equal(listProducts('KEYBOARD')[0]?.id,'p-102'));
test('missing product returns undefined',()=>assert.equal(findProduct('unknown'),undefined));
