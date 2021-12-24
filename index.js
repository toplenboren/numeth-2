/**
 * @param x {number[]} should contain 3 items
 * @param y {number[]}  should contain 3 items
 * @return {number}
 */
const norm = (x, y) => {
	return Math.abs((x[0] - y[0])) + Math.abs((x[1] - y[1])) + Math.abs((x[2] - y[2]))
}

/**
 *
 * @param A {number[][]} 3x3 matrix
 * @param b {number[]} 3 items vector
 * @param eps {number}
 * @return {[number[], number]}
 */
const jacobi = (A, b, eps) => {

	const _firstEl = (x, A, b) => {
		return -((1 / A[0][0]) * (A[0][1] * x[1] + A[0][2] * x[2] - b[0]))
	}

	const _secondEl = (x, A, b) => {
		return -((1 / A[1][1]) * (A[1][0] * x[0] + A[1][2] * x[2] - b[1]))
	}

	const _thirdEl = (x, A, b) => {
		return -((1 / A[2][2]) * (A[2][0] * x[0] + A[2][1] * x[1] - b[2]))
	}

	const x0 = [1, 1, 1]

	let count = 0

	let nextX = x0
	let currentX = x0

	while (true) {

		count += 1
		currentX = nextX
		nextX = [
			_firstEl(currentX, A, b), _secondEl(currentX, A, b), _thirdEl(currentX, A, b)
		]
		if (norm(nextX, currentX) <= eps) { break } // т.к (1-q) /q = 1

		// Если начали встречать NaN -- скорее всего итерационный процесс расходится
		if (isNaN(nextX[0])) { break }
	}

	return [nextX, count]
}

/**
 *
 * @param A {number[][]} 3x3 matrix
 * @param b {number[]} 3 items vector
 * @param eps {number}
 * @return {[number[], number]}
 */
const seidel = (A, b, eps) => {

	const _firstEl = (x, A, b) => {
		return -((1 / A[0][0]) * (A[0][1] * x[1] + A[0][2] * x[2] - b[0]))
	}

	const _secondEl = (x, A, b, x1) => {
		return -((1 / A[1][1]) * (A[1][0] * x1 + A[1][2] * x[2] - b[1]))
	}

	const _thirdEl = (A, b, x1, x2) => {
		return -((1 / A[2][2]) * (A[2][0] * x1 + A[2][1] * x2 - b[2]))
	}

	const x0 = [1, 1, 1]

	let count = 0

	let nextX = x0
	let currentX = x0

	while (true) {

		count += 1
		currentX = nextX

		const x1 = _firstEl(currentX, A, b)
		const x2 = _secondEl(currentX, A, b, x1)
		const x3 = _thirdEl(A, b, x1, x2)

		nextX = [x1, x2, x3]

		if (norm(nextX, currentX) <= eps) { break } // т.к (1-q) /q = 1

		// Если начали встречать NaN -- скорее всего итерационный процесс расходится
		if (isNaN(nextX[0]) || !isFinite(nextX[0])) { break }
	}

	return [nextX, count]
}

// Оптимизированая матрица А -- на главной диалгонали стоят наибольшие по модулю элементы
const AOpt = [
	[1.7, 0.01, 0.2], [-0.1, 0.8, 0.4], [-0.1, -0.4, -0.5]
]

const BOpt = [2.32, 2.7, -2.4]

const EPS = 0.00005


const [jacobiResult, jacobiCount] = jacobi(AOpt, BOpt, EPS)
const [seidelResult, seidelCount] = seidel(AOpt, BOpt, EPS)

console.log('Jacobi Method:')
console.log(`result: ${jacobiResult.join(', ')}, iterations ${jacobiCount}`)
console.log('')
console.log('---')
console.log('')
console.log('Seidel Method:')
console.log(`result: ${seidelResult.join(', ')}, iterations ${seidelCount}`)