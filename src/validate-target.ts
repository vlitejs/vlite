/**
 * @link https://github.com/yoriiis/validate-target/blob/main/src/index.ts
 *
 * @param {Object} options
 * @param {HTMLElement} options.target Target element
 * @param {String} options.selectorString Any valid CSS selector string (class, id, attribute) with Element.matches()
 * @param {(String|String[])} options.nodeName List of possible nodes name
 * @returns {Boolean} Is the target valid
 */
export default function validateTarget({
	target,
	selectorString,
	nodeName
}: {
	target: HTMLElement
	selectorString: string
	nodeName: string | string[]
}): boolean {
	nodeName = ([] as string[]).concat(nodeName)

	return nodeName.some(
		(item) => target.nodeName.toLowerCase() === item && target.matches(selectorString)
	)
}
