import test from 'node:test';
import assert from 'assert'
import { getBrokenUrls } from './functions.js';
// import urls from './links/fixed.js'

// Run this test after update links manually
test('should pass if no link has status 400', async () => {
  const list = await getBrokenUrls(urls)
  assert.strictEqual(list.length, 0);
});