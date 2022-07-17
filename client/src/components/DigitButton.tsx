type DigitButtonProps = {
  digit: string;
};
export default function DigitButton({ digit }: DigitButtonProps) {
  return (
    <button
    // onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
