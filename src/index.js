import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

const csvPath = process.argv[2]
const basePath = process.argv[3]

const countryMap = {}

const parser = parse()
const data = fs.readFileSync(csvPath)
const records = parse(data, { columns: true })
for (const record of records) {
  const key = record['_key']
  console.log(key)
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

