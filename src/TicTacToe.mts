import { charCodes } from "./charCodes.mts"
import { check, combinations } from "./check.mts"
import { generate } from "./generate.mts"
import { readSync, run, screen, stdin } from "./io.mts"
import { indices } from "./keys.mts"
import { checked, gameModes } from "./options.mts"
import { render } from "./render.mts"
import { state } from "./state.mts"

const t = new TextEncoder()
const TIE = t.encode("Tie")
const WINS = t.encode("wins")
const PLAYER = Uint8Array.of(charCodes.ZERO, charCodes.LETTER_X)

export function TicTacToe(cursor: number): boolean {
	let count = 9
	let current = 0
	let EOF = false
	let i = 0

	do {
		const startIndex = render(2)
		screen.fill(0, startIndex)
		Deno.stdout.writeSync(screen)

		if (checked === gameModes.HEAD_TO_HEAD || current === 0) {
			if ((EOF = (i = input()) === -1)) break
		} else if (checked === gameModes.LONE_WOLF) i = generate()

		if (checked === gameModes.JOIN) continue

		const v = current + 4
		state[i] = v
		current = ~current

		if (!check(v, i)) {
			if (--count > 0) continue
			cursor = render(2)
			screen[cursor] = charCodes.LF
			screen.set(TIE, cursor + 1)
			Deno.stdout.writeSync(screen)
			break
		}

		cursor = render(2)
		screen[cursor] = charCodes.LF
		screen[cursor + 1] = PLAYER[v - 3]
		screen[cursor + 2] = charCodes.SPACE
		screen.set(WINS, cursor + 3)
		Deno.stdout.writeSync(screen)
		break
	} while (run())

	combinations.fill(0)
	state.fill(0)
	return EOF
}

function input(): number {
	let i

	do {
		if (readSync() || !run()) return -1
		i = stdin[0] - charCodes.ZERO
		if (i < 1 || i > 9) continue
		i = indices[i]
	} while (state[i] !== 0)

	return i
}
