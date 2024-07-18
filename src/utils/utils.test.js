import { msToTimestamp, getAverage, getSymbol } from "./utils"
import "jest-to-equal-type"

describe("msToTimestamp", () => {
	test("引数0のとき、出力結果が00:00:00", () => {
		expect(msToTimestamp(0)).toBe("00:00:00")
	})
	test("引数3599999のとき、出力結果が59:59:99", () => {
		expect(msToTimestamp(3599999)).toBe("59:59:99")
	})
	test("引数3600000のとき、出力結果が59:59:99", () => {
		expect(msToTimestamp(3600000)).toBe("59:59:99")
	})
	test("引数が数値以外のとき、エラー発生", () => {
		expect(() => msToTimestamp("0")).toThrow()
	})
})

describe("getAverage", () => {
	test("引数10000のとき、出力結果が1.0", () => {
		expect(getAverage(10000)).toBe("1.0")
	})
	test("引数15000のとき、出力結果が0.6", () => {
		expect(getAverage(15000)).toBe("0.7")
	})
	test("引数が数値以外のとき、エラー発生", () => {
		expect(() => getAverage("10000")).toThrow()
	})
})

describe("getSymbol", () => {
	test("返り値が文字列型かつ1文字である", () => {
		expect(getSymbol()).toEqualType("string")
		expect(getSymbol()).toHaveLength(1)
	})
})
