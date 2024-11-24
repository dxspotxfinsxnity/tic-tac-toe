import { charCodes } from "./charCodes.mts"
import { readCount, readSync, screen, stdin } from "./io.mts"
import { resources } from "./resources.mts"

const CHECKED = resources[5]
const COUNT = 5

export const enum gameModes {
	JOIN = 0,
	COMMAND_CENTER = 1,
	HEAD_TO_HEAD = 2,
	LONE_WOLF = 3,
	EXIT = 4,
}

export let checked = 0

function option(cursor: number, option: Uint8Array, end: number): number {
	screen.set(option, cursor)
	cursor += option.length
	screen[cursor] = end
	++cursor
	return cursor
}

export function options(cursor: number): number {
	for (let i = 0; i < COUNT; ++i) {
		if (i === checked)
			cursor = option(cursor, CHECKED, charCodes.SPACE)
		cursor = option(cursor, resources[i], charCodes.LF)
	}

	Deno.stdout.writeSync(screen)

	if (readSync()) return gameModes.EXIT

	if (readCount === 3) {
		switch (stdin[2]) {
			case charCodes.ARROW_UP:
				checked = (checked + COUNT - 1) % COUNT
				break
			case charCodes.ARROW_DOWN:
				checked = (checked + 1) % COUNT
				break
		}
	} else if (stdin[0] === charCodes.RETURN) return checked

	return -1
}
