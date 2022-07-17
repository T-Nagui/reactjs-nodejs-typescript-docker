type Props = {
  operation: '*' | '/' | '+' | '-';
  handleOperation: (operation: '*' | '/' | '+' | '-') => void;
};

const OperationButton = ({ operation, handleOperation }: Props) => {
  return (
    <button onClick={() => handleOperation(operation)}>{operation}</button>
  );
};

export default OperationButton;
