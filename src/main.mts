#!node

import { check } from "./check.mjs"
import { generate } from "./generate.mjs"
import { indices } from "./keys.mjs"
import { read } from "./stdin.mjs"
import { render } from "./render.mjs"
import { state } from "./state.mjs"

const ai = process.argv.includes("--ai", 2)
const win_message = ai ? ["You win.", "You lose."] : ["x wins.", "0 wins."]

do {
	tic_tac_toe()
	state.fill(0)
	process.stdout.write(`Press <RETURN> to continue.\n`)
} while (read() === -35)

function tic_tac_toe(): void {
	let current = 0
	let move = 0

	do {
		process.stdout.write(`\x1bc${render()}`)
		if (ai && current !== 0) move = generate()
		else {
			const input = read()
			if (input < 1 || input > 9) continue
			move = indices[input]
			if (state[move] !== 0) continue
		}
		state[move] = current + 4
		const c = current
		current = ~current
		if (!check(c, move)) continue
		process.stdout.write(`\x1bc${render()}\n${win_message[-c]}\n`)
		return
	} while (state.includes(0))

	process.stdout.write(`\x1bc${render()}\nTie.\n`)
}
