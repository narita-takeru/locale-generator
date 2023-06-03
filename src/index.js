import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

if (4 !== process.argv.length) {
  console.error('require two arguments. [tsv path], [outout directory]')
  process.exit(1)
}

const tsvPath = process.argv[2]
if (tsvPath.length <= 0) {
  console.error('tsv path is required.')
  process.exit(1)
}

const basePath = process.argv[3]
if (basePath.length <= 0) {
  console.error('output directory is required.')
  process.exit(1)
}

const countryMap = {}

const parser = parse()
const data = fs.readFileSync(tsvPath)
const records = parse(data, { columns: true, delimiter: "\t" })
for (const record of records) {
  const key = record['_key']
  delete record['_key']

  const countryKeys = Object.keys(record)
  for (let i = 0; i < countryKeys.length; i++) {
    const country = countryKeys[i]
    countryMap[country] ||= {}
    countryMap[country][key] = record[country]
  }
}

const countries = Object.keys(countryMap)
for (let i = 0; i < countries.length; i++) {
  const country = countries[i]
  const json = JSON.stringify(countryMap[country], null, 2)
  const parentPath = `${basePath}/${country}`
  if (!fs.existsSync(parentPath)) {
    fs.mkdirSync(parentPath)
  }

  fs.writeFileSync(`${parentPath}/common.json`, json)
}

