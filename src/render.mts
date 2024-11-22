import { screen } from "./io.mts"
import { keys } from "./keys.mts"
import { state } from "./state.mts"

const LF = 10
const SPACE = 32
const ZERO = 48
const LEFT_SQUARE_BRACKET = 91
const RIGHT_SQUARE_BRACKET = 93
const LETTER_X = 120
const LINE = 124

const resources = Uint8Array.of(SPACE, LINE, SPACE, ZERO, LETTER_X, LF)

const GUIDE = resources.subarray(0, 3)
const LINE_BREAK = resources.subarray(5)

const separator = [
	GUIDE,
	GUIDE,
	LINE_BREAK,
	GUIDE,
	GUIDE,
	LINE_BREAK,
	GUIDE,
	GUIDE,
	LINE_BREAK,
]

function data(cursor: number, index: number): number {
	const value = state[index]

	if (value === 0) {
		screen[cursor] = LEFT_SQUARE_BRACKET
		screen[cursor + 1] = keys[index] + ZERO
		screen[cursor + 2] = RIGHT_SQUARE_BRACKET
	} else {
		screen[cursor] = SPACE
		screen[cursor + 1] = resources[value]
		screen[cursor + 2] = SPACE
	}

	cursor += 3
	const s = separator[index]
	screen.set(s, cursor)
	return cursor + s.length
}

export function render(cursor: number): number {
	for (let i = 0; i < state.length; ++i) cursor = data(cursor, i)
	return cursor
}
