import { readSync, run } from "./io.mts"
import { gameModes, options } from "./options.mts"
import { TicTacToe } from "./TicTacToe.mts"

let cursor: number

start: do {
	cursor = 2
	const checked = options(cursor)
	if (checked === -1) continue
	if (checked === gameModes.EXIT) break

	do {
		if (TicTacToe(cursor)) continue start
		if (readSync()) break
	} while (run())
} while (run())
