import { keys } from "./keys.mts"
import { state } from "./state.mts"

const character = ["", "", "", " 0 ", " x "]
const separator = [" | ", " | ", "\n", " | ", " | ", "\n", " | ", " | ", ""]

function data(index: number): string {
	const value = state[index]
	if (value === 0) return `[${keys[index]}]` + separator[index]
	return character[value] + separator[index]
}

export function render(): string {
	return (
		data(0) +
		data(1) +
		data(2) +
		data(3) +
		data(4) +
		data(5) +
		data(6) +
		data(7) +
		data(8)
	)
}
