import { charCodes } from "./charCodes.mts";

const contents = Deno.readFileSync("resources.txt")
const count = 6

export const resources = new Array<Uint8Array>(count)

for (let i = 0, endIndex = 0; i < count; ++i) {
	const startIndex = endIndex
	endIndex = contents.indexOf(charCodes.LF, endIndex) + 1
	resources[i] = contents.subarray(startIndex, endIndex - 1)
}
