#! /usr/bin/env node

// core
const stream = require('stream')
const { promisify } = require('util')

// public
const loghose = require('docker-loghose')
const str2color = require('string-to-color')
const chalk = require('chalk')
const program = require('commander')

// local
const version = require('./package.json').version
const collect = require('./utils/collect')
const reduceRegexStrings = require('./utils/reduceRegexStrings')
const generateStrFromLabels = require('./utils/generateStrFromLabels')

// setup
const pipeline = promisify(stream.pipeline)

program
	.version(version)
	.usage('[options]')
	.option('--name-label <label>', 'The label to use to name containers with')
	.option('--include-current', 'Include current container logs')
	.option('--match-image <regex>', 'Only include logs matching image name regexes', collect, [])
	.option('--match-name <regex>', 'Only include logs matching container name regexes', collect, [])
	.option('--skip-image <regex>', 'Exclude logs matching image name regexes', collect, [])
	.option('--skip-name <regex>', 'Exclude logs matching container name regexes', collect, [])
	.option('--add-labels', 'Enrich log events with labels set on container.')
	.option('--labels-match <regex>', 'Only include labels matching regexes. Assumes --add-labels.', collect, [])
	.parse(process.argv)

const opts = {
	includeCurrentContainer: Boolean(program.includeCurrent)
}

if (program.nameLabel) opts.nameLabel = program.nameLabel
if (program.matchImage.length) opts.matchByImage = reduceRegexStrings(program.matchImage)
if (program.matchName.length) opts.matchByName = reduceRegexStrings(program.matchName)
if (program.skipImage.length) opts.skipByImage = reduceRegexStrings(program.skipImage)
if (program.skipName.length) opts.skipByName = reduceRegexStrings(program.skipName)

if (program.addLabels || program.labelsMatch.length) {
	opts.addLabels = true
	opts.labelsKey = 'labels'

	if (program.labelsMatch.length) {
		opts.labelsMatch = reduceRegexStrings(program.labelsMatch)
	}
}

const lh = loghose(opts)

const filter = new stream.Transform({
	writableObjectMode: true,

	transform: (chunk, encoding, callback) => {		
		const color = str2color(chunk.name)
		const labelStr = generateStrFromLabels(chunk.labels)

		const log = `[${chalk.hex(color)(chunk.name)} : ${chunk.image}]`
			+ (labelStr ? ` [${labelStr}]` : '')
			+ `\t${chunk.line}`
			+ `\n`

		return callback(null, log)
	}
})

async function run () {
	await pipeline(
		lh,
		filter,
		process.stdout
	)
}

run().catch(console.error)
