const fs = require('fs')
const path = require('path')

const mjml2json = require('mjml2json')
console.log(mjml2json.default)
const input = fs.readFileSync('email.mjml', 'utf8')
const opts = {
  // stringify: !!program.stringify,
}
const output = mjml2json.default(input, opts)

fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(output))

// const stringified = opts.stringify ? ' (stringified)' : ''
// console.log(
//   `${inputFilename} was converted to JSON format in ${outputFilename}${stringified}`
// ) // eslint-disable-line no-console
