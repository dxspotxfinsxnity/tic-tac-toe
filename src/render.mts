import { charCodes } from "./charCodes.mts"
import { screen } from "./io.mts"
import { keys } from "./keys.mts"
import { state } from "./state.mts"

const resources = Uint8Array.of(
	charCodes.SPACE,
	charCodes.LINE,
	charCodes.SPACE,
	charCodes.ZERO,
	charCodes.LETTER_X,
	charCodes.LF
)

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
		screen[cursor] = charCodes.LEFT_SQUARE_BRACKET
		screen[cursor + 1] = keys[index] + charCodes.ZERO
		screen[cursor + 2] = charCodes.RIGHT_SQUARE_BRACKET
	} else {
		screen[cursor] = charCodes.SPACE
		screen[cursor + 1] = resources[value]
		screen[cursor + 2] = charCodes.SPACE
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
