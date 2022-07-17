import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

type operationType = '*' | '/' | '+' | '-';

type OperandType = {
  type: operationType;
  value?: string;
};

const acceptedKeyboardStrokeForDigit = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.'
];

const acceptedKeyboardStrokeForOperation = ['+', '-', '*', '/'];

const App = () => {
  const [operand, setOperand] = useState<OperandType[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const getResult = useCallback(async () => {
    if (operand.length === 0) return;
    const response = await fetch(process.env.REACT_APP_API_URL + '/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        operand.map((o) => {
          return {
            ...o,
            value: Number(o.value)
          };
        })
      )
    });
    const { result: val } = await response.json();
    setResult(val);
  }, [operand]);

  const handleDigit = useCallback(
    (digit: string) => {
      setResult(null);
      if (operand.length === 0 && digit !== '.') {
        setOperand([{ type: '+', value: digit }]);
        return;
      }
      const lastOperand = operand[operand.length - 1];

      if (
        digit === '.' &&
        (!lastOperand.value || lastOperand?.value?.toString()?.includes('.'))
      ) {
        return;
      }

      if (digit === '0' && lastOperand.value === '0') {
        return;
      }

      if (!lastOperand.value) {
        setOperand([...operand.slice(0, -1), { ...lastOperand, value: digit }]);
        return;
      }

      setOperand([
        ...operand.slice(0, -1),
        { ...lastOperand, value: lastOperand?.value + digit }
      ]);
    },
    [operand]
  );

  const handleOperation = useCallback(
    (operation: operationType) => {
      setResult(null);
      if (operand.length === 0 && (operation === '+' || operation === '-')) {
        setOperand([{ type: operation }]);
        return;
      }
      const lastOperand = operand[operand.length - 1];
      if (operand.length === 0 && (operation === '*' || operation === '/')) {
        return;
      }
      if (lastOperand.type === operation && !lastOperand.value) {
        return;
      }

      if (lastOperand.value) {
        setOperand([...operand, { type: operation }]);
        return;
      }
      setOperand([...operand.slice(0, -1), { type: operation }]);
    },
    [operand]
  );

  const removeLastElement = useCallback(() => {
    if (result) {
      setResult(null);
      return;
    }

    if (operand.length === 0) {
      return;
    }
    const lastOperand = operand[operand.length - 1];
    if (lastOperand.value) {
      setOperand([...operand.slice(0, -1), { type: lastOperand.type }]);
      return;
    }
    setOperand([...operand.slice(0, -1)]);
  }, [operand, result]);

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (acceptedKeyboardStrokeForDigit.includes(event.key)) {
        handleDigit(event.key);
      }
      if (acceptedKeyboardStrokeForOperation.includes(event.key)) {
        // @ts-ignore - typescript doesn't know about event.key and filters out the event.key
        handleOperation(event.key);
      }

      if (event.key === 'Enter') {
        getResult();
      }
      if (event.key === 'Backspace') {
        removeLastElement();
      }
      if (
        event.key === 'Escape' ||
        event.key === 'Esc' ||
        event.key === 'Delete'
      ) {
        setOperand([]);
        setResult(null);
      }
    },
    [getResult, handleDigit, handleOperation, removeLastElement]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className='calculator-grid'>
      <div className='message-grid'>
        <h4>Simple Calculator</h4>
      </div>

      <div className='output'>
        <div className='previous-operand'>
          {operand
            ?.reduce((acc, op) => {
              if (op.value) {
                return `${acc} ${op.type} ${op.value}`;
              }
              return `${acc} ${op.type} `;
            }, '')
            ?.slice(1)}
        </div>
        <div className='current-operand'>{result}</div>
      </div>
      <button
        className='span-two'
        onClick={() => {
          setOperand([]);
          setResult(null);
        }}
      >
        AC
      </button>
      <button onClick={removeLastElement}>DEL</button>
      <OperationButton operation='/' handleOperation={handleOperation} />
      <DigitButton digit='1' handleDigit={handleDigit} />
      <DigitButton digit='2' handleDigit={handleDigit} />
      <DigitButton digit='3' handleDigit={handleDigit} />
      <OperationButton operation='*' handleOperation={handleOperation} />
      <DigitButton digit='4' handleDigit={handleDigit} />
      <DigitButton digit='5' handleDigit={handleDigit} />
      <DigitButton digit='6' handleDigit={handleDigit} />
      <OperationButton operation='+' handleOperation={handleOperation} />
      <DigitButton digit='7' handleDigit={handleDigit} />
      <DigitButton digit='8' handleDigit={handleDigit} />
      <DigitButton digit='9' handleDigit={handleDigit} />
      <OperationButton operation='-' handleOperation={handleOperation} />
      <DigitButton digit='.' handleDigit={handleDigit} />
      <DigitButton digit='0' handleDigit={handleDigit} />
      <button className='span-two' onClick={getResult}>
        =
      </button>
    </div>
  );
};

export default App;
