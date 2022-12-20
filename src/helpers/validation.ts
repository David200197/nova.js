export const startsWithLowercase = (word: string) => {
  return /[a-z]/.test(word.charAt(0));
};
