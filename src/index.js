import * as fs from 'fs'

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

const data = fs.readFileSync(tsvPath).toString()
const lines = data.split("\n")
const headers = {}

const headerRow = lines[0].split("\t")
for (let i = 0; i < headerRow.length; i++) {
  headers[i] = headerRow[i].trim() // remove bom.
}

const records = []
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim()
  const tokens = line.split("\t")
  const record = {}
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j]
    const index = headers[j]
    record[index] = token
  }

  records.push(record)
}

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

