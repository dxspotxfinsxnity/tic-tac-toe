import { state } from "./state.mjs"

// @ts-ignore
export function generate(): number {
	const highest = Math.max(
		weight(state[0] + state[1] + state[2]),
		weight(state[0] + state[3] + state[6]) | 1,
		weight(state[0] + state[4] + state[8]) | 2,
		weight(state[1] + state[4] + state[7]) | 3,
		weight(state[2] + state[4] + state[6]) | 4,
		weight(state[2] + state[5] + state[8]) | 5,
		weight(state[3] + state[4] + state[5]) | 6,
		weight(state[6] + state[7] + state[8]) | 7
	)

	// prettier-ignore
	switch (highest & 7) {
		case 0: return empty(0, 1, 2)
		case 1: return empty(0, 3, 6)
		case 2: return empty(0, 4, 8)
		case 3: return empty(1, 4, 7)
		case 4: return empty(2, 4, 6)
		case 5: return empty(2, 5, 8)
		case 6: return empty(3, 4, 5)
		case 7: return empty(6, 7, 8)
	}

	// unreachable
}

function weight(value: number): number {
	// prettier-ignore
	switch (value) {
		case 0: return 8
		case 3: return 16
		case 4: return 24
		case 6: return 32
		case 8: return 40
	}

	return 0
}

function empty(v0: number, v1: number, v2: number): number {
	return (
		Math.min(
			(state[v0] << 4) | v0,
			(state[v1] << 4) | v1,
			(state[v2] << 4) | v2
		) & 0xf
	)
}
