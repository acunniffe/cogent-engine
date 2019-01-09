import {NodeTypes} from "./NodeTypes";

export function render(element, depth = 0) {

	if (depth > 150) {
		throw new Error('Tree exceeds depth limit 150. This constraint precludes infinite loops.')
	}

	if (!element) {
		return ''
	}

	if (typeof element === 'string') {
		return element
	}

	const {type, props} = element

	if (typeof type === 'function') {
		return render(type(props))
	} else if (typeof type === 'string') {
		return NodeTypes(element, depth)
	} else if (typeof type === 'symbol') {
		return props.children.map(child => render(child, depth + 1)).join('')
	}
}
