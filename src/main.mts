#!node

import process from "node:process"
import { check, comb } from "./check.mts"
import { generate } from "./generate.mts"
import { indices } from "./keys.mts"
import { render } from "./render.mts"
import { state } from "./state.mts"
import { readSync, stdin, readCount } from "./stdin.mts"

const ai = process.argv.includes("--ai", 2)
const win_message = ai ? ["You win.", "You lose."] : ["x wins.", "0 wins."]

do {
	if (tic_tac_toe()) break
	comb.fill(0)
	state.fill(0)
	process.stdout.write(`Press <BACKSPACE> to exit.\n`)
	readSync()
} while (readCount !== 1 || stdin[0] !== 127)

function tic_tac_toe(): boolean {
	let current = 0
	let move = 0

	do {
		process.stdout.write(`\x1bc${render()}`)
		if (ai && current !== 0) move = generate()
		else {
			move = input()
			if (move === -1) return true
		}
		state[move] = current + 4
		const c = current
		current = ~current
		if (!check(c, move)) continue
		process.stdout.write(`\x1bc${render()}\n${win_message[-c]}\n`)
		return false
	} while (state.includes(0))

	process.stdout.write(`\x1bc${render()}\nTie.\n`)
	return false
}

function input(): number {
	let i

	do {
		if (readSync() || (readCount === 1 && stdin[0] === 127))
			return -1
		i = stdin[0] - 48
		if (i < 1 || i > 9) continue
		i = indices[i]
	} while (state[i] !== 0)

	return i
}
