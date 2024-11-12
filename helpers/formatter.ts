export function formatNumberWithCommas(number: number) {
	const numberString = String(number);
	const numberWithOutCommas = numberString.replace(/,/g, "");
	const num = Number(numberWithOutCommas); // Convert string to number
	return num.toLocaleString(); // Format number with commas
}
