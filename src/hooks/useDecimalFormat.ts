export const useDecimalFormat = () => {
  const formatter = (number: number) => {
    const [, decimalPart] = number.toString().split(".");
    if (!decimalPart || decimalPart.length <= 2) {
      return number.toString();
    } else {
      return number.toFixed(2).toString();
    }
  };
  return { formatter };
};
