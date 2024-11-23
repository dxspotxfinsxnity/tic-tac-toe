import { check, combinations } from "./check.mts"
import { generate } from "./generate.mts"
import { readCount, readSync, screen, stdin } from "./io.mts"
import { indices } from "./keys.mts"
import { render } from "./render.mts"
import { resources } from "./resources.mts"
import { state } from "./state.mts"

const t = new TextEncoder()
const TIE = t.encode("Tie")
const WINS = t.encode("wins")

const CHECKED = resources[5]
const OPT_COUNT = 5

const LF = 10
const RETURN = 13
const SPACE = 32
const ZERO = 48
const ARROW_UP = 65
const ARROW_DOWN = 66
const LETTER_X = 120
const BACKSPACE = 127

const PLAYER = Uint8Array.of(ZERO, LETTER_X)

const JOIN = 0
const COMMAND_CENTER = 1
const HEAD_TO_HEAD = 2
const LONE_WOLF = 3
const EXIT = 4

let checked = 0
let cursor: number

start: do {
	cursor = 2
	const c = options()
	if (c === -1) continue
	if (c === EXIT) break

	do {
		if (TicTacToe()) continue start
		if (readSync()) break
	} while (run())
} while (run())

function TicTacToe(): boolean {
	let count = 9
	let current = 0
	let EOF = false
	let i = 0

	do {
		const startIndex = render(2)
		screen.fill(0, startIndex)
		Deno.stdout.writeSync(screen)

		if (checked === HEAD_TO_HEAD || current === 0) {
			if ((EOF = (i = input()) === -1)) break
		} else if (checked === LONE_WOLF) i = generate()

		if (checked === JOIN) continue

		const v = current + 4
		state[i] = v
		current = ~current

		if (!check(v, i)) {
			if (--count > 0) continue
			cursor = render(2)
			screen[cursor] = LF
			screen.set(TIE, cursor + 1)
			Deno.stdout.writeSync(screen)
			break
		}

		cursor = render(2)
		screen[cursor] = LF
		screen[cursor + 1] = PLAYER[v - 3]
		screen[cursor + 2] = SPACE
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
		i = stdin[0] - ZERO
		if (i < 1 || i > 9) continue
		i = indices[i]
	} while (state[i] !== 0)

	return i
}

function option(option: Uint8Array, end: number): void {
	screen.set(option, cursor)
	cursor += option.length
	screen[cursor] = end
	++cursor
}

function options(): number {
	for (let i = 0; i < OPT_COUNT; ++i) {
		if (i === checked) option(CHECKED, SPACE)
		option(resources[i], LF)
	}

	Deno.stdout.writeSync(screen)

	if (readSync()) return EXIT

	if (readCount === 3) {
		switch (stdin[2]) {
			case ARROW_UP:
				checked = (checked + OPT_COUNT - 1) % OPT_COUNT
				break
			case ARROW_DOWN:
				checked = (checked + 1) % OPT_COUNT
				break
		}
	} else if (stdin[0] === RETURN) return checked

	return -1
}

function run(): boolean {
	if (readCount !== 1 || stdin[0] !== BACKSPACE) {
		return true
	}

	stdin[0] = 0 // consume
	return false
}
