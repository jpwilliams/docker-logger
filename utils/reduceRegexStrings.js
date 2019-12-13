function reduceRegexStrings (reStrings) {
	const normalisedLen = reStrings.length - 1

	const combinedStr = reStrings.reduce((str, reStr, index) => {
		const wrappedRe = `\(${reStr}\)`
		str += wrappedRe
		if (index !== normalisedLen) str += '|'

		return str
	}, '')

	return new RegExp(combinedStr)
}

module.exports = reduceRegexStrings
