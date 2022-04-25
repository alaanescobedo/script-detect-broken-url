import fs from 'fs'
import urlList from './links/all.js'
import { sortUrlsToJSON, getBrokenUrls } from './functions.js'

const brokenUrls = await getBrokenUrls(urlList)

if (brokenUrls.length === 0) {
  console.log('No broken links found')
  process.exit(0)
}

const build = sortUrlsToJSON({ urls: brokenUrls })
// console.log('BROKEN>>>', build)
fs.writeFileSync('./jsons/broken.json', JSON.stringify(build))