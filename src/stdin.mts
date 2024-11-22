Deno.stdin.setRaw(true)

export const stdin = new Uint8Array(3)

export let readCount: number | null

export function readSync(): boolean {
	readCount = Deno.stdin.readSync(stdin)
	return readCount === null
}
