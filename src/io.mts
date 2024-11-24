import { charCodes } from "./charCodes.mts"

Deno.stdin.setRaw(true)

const { columns, rows } = Deno.consoleSize()

export const screen = new Uint8Array(columns * rows)
export const stdin = new Uint8Array(3)

export let readCount: number | null

screen[0] = 27
screen[1] = 99

export function readSync(): boolean {
	readCount = Deno.stdin.readSync(stdin)
	return readCount === null
}

export function run(): boolean {
	if (readCount !== 1 || stdin[0] !== charCodes.BACKSPACE) {
		return true
	}

	stdin[0] = 0 // consume
	return false
}
