import {render} from "../lib/render";
import indentString from "indent-string";

export const NodeTypes = (element, depth) => {
	switch (element.type) {
		case 'source':
		case 'Symbol(react.fragment)': {
			return source(element, depth)
		}
		case 'line': return line(element, depth)
		case 'indent': return indent(element, depth)
		default:
			throw new Error(`Unknown base node type ${element.type}`)
	}
}


const source = (element, depth) => {
	const children = element.props.children || []

	if (!Array.isArray(children)) {
		return render(children, depth + 1)
	}

	const delineator = element.props.delineator || ''

	return children.map(child => render(child, depth + 1)).join(delineator)
}

const line = ({props}, depth) => '\n'

const indent = (element, depth) => {

	const level = element.props.level || 1
	const delineator = element.props.delineator || ''

	const padBy = level * 2

	const children = element.props.children || []

	if (!Array.isArray(children)) {
		return indentString(render(children, depth + 1), padBy)
	}

	return indentString(
		children.map(child => render(child, depth + 1)).join(delineator),
		padBy
	)

}
