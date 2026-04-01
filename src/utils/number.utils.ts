export function stringToNumber(text: string): Number {
	return Number(text.replace(",", "."))
}