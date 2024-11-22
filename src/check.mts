/**
 * Incremental values that represent the state of different winning
 * combinations.
 */
export const combinations = new Uint8Array(8)

/**
 * Checks if the current player's move results in a winning combination.
 *
 * @param expected The current player (-1, 0).
 * @param index The current slot where the move has been made.
 * @returns A boolean indicating whether the current move results in a win.
 */
export function check(expected: number, index: number): boolean {
	const v = (expected += 4)

	expected += expected << 1

	switch (index) {
		case 0:
			return (
				expected === (combinations[0] += v) ||
				expected === (combinations[1] += v) ||
				expected === (combinations[2] += v)
			)
		case 1:
			return (
				expected === (combinations[0] += v) ||
				expected === (combinations[3] += v)
			)
		case 2:
			return (
				expected === (combinations[0] += v) ||
				expected === (combinations[4] += v) ||
				expected === (combinations[5] += v)
			)
		case 3:
			return (
				expected === (combinations[1] += v) ||
				expected === (combinations[6] += v)
			)
		case 4:
			return (
				expected === (combinations[2] += v) ||
				expected === (combinations[3] += v) ||
				expected === (combinations[4] += v) ||
				expected === (combinations[6] += v)
			)
		case 5:
			return (
				expected === (combinations[5] += v) ||
				expected === (combinations[6] += v)
			)
		case 6:
			return (
				expected === (combinations[1] += v) ||
				expected === (combinations[4] += v) ||
				expected === (combinations[7] += v)
			)
		case 7:
			return (
				expected === (combinations[3] += v) ||
				expected === (combinations[7] += v)
			)
	}

	return (
		expected === (combinations[2] += v) ||
		expected === (combinations[5] += v) ||
		expected === (combinations[7] += v)
	)
}
