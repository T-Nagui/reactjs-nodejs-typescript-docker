type DigitButtonProps = {
  digit: string;
  handleDigit: (digit: string) => void;
};
export default function DigitButton({ digit, handleDigit }: DigitButtonProps) {
  return <button onClick={() => handleDigit(digit)}>{digit}</button>;
}
