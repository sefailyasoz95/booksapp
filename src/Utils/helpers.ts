export const checkEmailFormat = (email: string) => {
	const emailRegex: RegExp = /^[a-zA-Z0-9_\u00C0-\u017F]+@[a-zA-Z0-9_\u00C0-\u017F]+\.[a-zA-Z0-9_\u00C0-\u017F]+$/;
	return emailRegex.test(email);
};
