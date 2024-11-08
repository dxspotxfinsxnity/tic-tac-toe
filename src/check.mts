import { state } from "./state.mjs"

export function check(expected: number, move: number): boolean {
	expected += 4
	expected += expected << 1

	switch (move) {
		case 0:
			return (
				expected === state[0] + state[1] + state[2] ||
				expected === state[0] + state[3] + state[6] ||
				expected === state[0] + state[4] + state[8]
			)
		case 1:
			return (
				expected === state[0] + state[1] + state[2] ||
				expected === state[1] + state[4] + state[7]
			)
		case 2:
			return (
				expected === state[0] + state[1] + state[2] ||
				expected === state[2] + state[4] + state[6] ||
				expected === state[2] + state[5] + state[8]
			)
		case 3:
			return (
				expected === state[0] + state[3] + state[6] ||
				expected === state[3] + state[4] + state[5]
			)
		case 4:
			return (
				expected === state[0] + state[4] + state[8] ||
				expected === state[1] + state[4] + state[7] ||
				expected === state[2] + state[4] + state[6] ||
				expected === state[3] + state[4] + state[5]
			)
		case 5:
			return (
				expected === state[2] + state[5] + state[8] ||
				expected === state[3] + state[4] + state[5]
			)
		case 6:
			return (
				expected === state[0] + state[3] + state[6] ||
				expected === state[2] + state[4] + state[6] ||
				expected === state[6] + state[7] + state[8]
			)
		case 7:
			return (
				expected === state[1] + state[4] + state[7] ||
				expected === state[6] + state[7] + state[8]
			)
		case 8:
			return (
				expected === state[0] + state[4] + state[8] ||
				expected === state[2] + state[5] + state[8] ||
				expected === state[6] + state[7] + state[8]
			)
	}

	return false
}
