function num(n) {
	if (n === 1) return 1;
	return num(n - 1) + n;
}
console.log(num(100));
