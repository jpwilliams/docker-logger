function generateStrFromLabels (labels = {}) {
	return Object.keys(labels).reduce((items, key) => {
		const val = labels[key]
		items.push(`${key}${val ? `: ${val}` : ''}`)

		return items
	}, []).join(', ')
}

module.exports = generateStrFromLabels
