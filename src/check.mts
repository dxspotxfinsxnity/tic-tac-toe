export const comb = new Uint8Array(8)

export function check(expected: number, index: number): boolean {
	const v = (expected += 4)

	expected += expected << 1

	switch (index) {
		case 0:
			return (
				expected === (comb[0] += v) ||
				expected === (comb[1] += v) ||
				expected === (comb[2] += v)
			)
		case 1:
			return (
				expected === (comb[0] += v) ||
				expected === (comb[3] += v)
			)
		case 2:
			return (
				expected === (comb[0] += v) ||
				expected === (comb[4] += v) ||
				expected === (comb[5] += v)
			)
		case 3:
			return (
				expected === (comb[1] += v) ||
				expected === (comb[6] += v)
			)
		case 4:
			return (
				expected === (comb[2] += v) ||
				expected === (comb[3] += v) ||
				expected === (comb[4] += v) ||
				expected === (comb[6] += v)
			)
		case 5:
			return (
				expected === (comb[5] += v) ||
				expected === (comb[6] += v)
			)
		case 6:
			return (
				expected === (comb[1] += v) ||
				expected === (comb[4] += v) ||
				expected === (comb[7] += v)
			)
		case 7:
			return (
				expected === (comb[3] += v) ||
				expected === (comb[7] += v)
			)
	}

	return (
		expected === (comb[2] += v) ||
		expected === (comb[5] += v) ||
		expected === (comb[7] += v)
	)
}
