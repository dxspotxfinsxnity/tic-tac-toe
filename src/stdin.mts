import { readSync } from "node:fs"

process.stdin.setRawMode(true)

const stdin = Buffer.alloc(1)

export function read() {
	readSync(process.stdin.fd, stdin, 0, 1, null)
	return stdin[0] - 48
}
