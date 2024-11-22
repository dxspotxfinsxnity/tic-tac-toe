import { state } from "./state.mts"

/**
 * This array represents the weights of possible game combinations, ranging from
 * an empty combination (0) to the maximum non-winning combination (11), which
 * consists of two filled slots for the Player and one for the AI (4 + 4 + 3).
 *
 * - 8: Represents an empty combination.
 * - 16: AI has one slot filled, all other slots are empty.
 * - 24: Player has one slot filled, all other slots are empty.
 * - 32: AI has two slots filled, one slot is empty.
 * - 40: Player has two slots filled, one slot is empty.
 */
const weight = Uint8Array.of(8, 0, 0, 16, 24, 0, 32, 0, 40, 0, 0, 0)

/**
 * Tic-Tac-Toe AI that generates the next move based on the current game state.
 *
 * This function evaluates potential moves for the AI by calculating weights for
 * various winning combinations. It uses the global `state` array to assess the
 * current state of the game board and selects the best move based on the
 * highest weight value. The weights are derived from the `weight` array, which
 * contains pre-defined values for various combinations of filled slots.
 *
 * @returns The index of the AI's next move (0-8) corresponding to the empty
 * slot on the Tic-Tac-Toe board.
 */
export function generate(): number {
	const best = Math.max(
		weight[state[0] + state[1] + state[2]],
		weight[state[0] + state[3] + state[6]] | 1,
		weight[state[0] + state[4] + state[8]] | 2,
		weight[state[1] + state[4] + state[7]] | 3,
		weight[state[2] + state[4] + state[6]] | 4,
		weight[state[2] + state[5] + state[8]] | 5,
		weight[state[3] + state[4] + state[5]] | 6,
		weight[state[6] + state[7] + state[8]] | 7
	)

	switch (best & 7) {
		case 0:
			return empty(0, 1, 2)
		case 1:
			return empty(0, 3, 6)
		case 2:
			return empty(0, 4, 8)
		case 3:
			return empty(1, 4, 7)
		case 4:
			return empty(2, 4, 6)
		case 5:
			return empty(2, 5, 8)
		case 6:
			return empty(3, 4, 5)
	}

	return empty(6, 7, 8)
}

/**
 * Returns the index of the first empty slot among the specified indices (v0,
 * v1, v2). The function shifts the state of each slot left by 4 bits, combines
 * the state with its index using a bitwise OR operation, and then finds the
 * minimum value among the three. The result is masked with 15 (0b1111) to
 * return the index of the first empty slot.
 */
function empty(v0: number, v1: number, v2: number): number {
	return (
		Math.min(
			(state[v0] << 4) | v0,
			(state[v1] << 4) | v1,
			(state[v2] << 4) | v2
		) & 15
	)
}
