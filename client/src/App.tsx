import { useReducer } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import './App.css';

// export const ACTIONS = {
//   ADD_DIGIT: 'add-digit',
//   CHOOSE_OPERATION: 'choose-operation',
//   CLEAR: 'clear',
//   DELETE_DIGIT: 'delete-digit',
//   EVALUATE: 'evaluate'
// };

// function reducer(state, { type, payload }) {
//   switch (type) {
//     case ACTIONS.ADD_DIGIT:
//       if (state.overwrite) {
//         return {
//           ...state,
//           currentOperand: payload.digit,
//           overwrite: false
//         };
//       }
//       if (payload.digit === '0' && state.currentOperand === '0') {
//         return state;
//       }
//       if (payload.digit === '.' && state.currentOperand.includes('.')) {
//         return state;
//       }

//       return {
//         ...state,
//         currentOperand: `${state.currentOperand || ''}${payload.digit}`
//       };
//     case ACTIONS.CHOOSE_OPERATION:
//       if (state.currentOperand == null && state.previousOperand == null) {
//         return state;
//       }

//       if (state.currentOperand == null) {
//         return {
//           ...state,
//           operation: payload.operation
//         };
//       }

//       if (state.previousOperand == null) {
//         return {
//           ...state,
//           operation: payload.operation,
//           previousOperand: state.currentOperand,
//           currentOperand: null
//         };
//       }

//       return {
//         ...state,
//         previousOperand: evaluate(state),
//         operation: payload.operation,
//         currentOperand: null
//       };
//     case ACTIONS.CLEAR:
//       return {};
//     case ACTIONS.DELETE_DIGIT:
//       if (state.overwrite) {
//         return {
//           ...state,
//           overwrite: false,
//           currentOperand: null
//         };
//       }
//       if (state.currentOperand == null) return state;
//       if (state.currentOperand.length === 1) {
//         return { ...state, currentOperand: null };
//       }

//       return {
//         ...state,
//         currentOperand: state.currentOperand.slice(0, -1)
//       };
//     case ACTIONS.EVALUATE:
//       if (
//         state.operation == null ||
//         state.currentOperand == null ||
//         state.previousOperand == null
//       ) {
//         return state;
//       }

//       return {
//         ...state,
//         overwrite: true,
//         previousOperand: null,
//         operation: null,
//         currentOperand: evaluate(state)
//       };
//   }
// }

// function evaluate({ currentOperand, previousOperand, operation }) {
//   const prev = parseFloat(previousOperand);
//   const current = parseFloat(currentOperand);
//   if (isNaN(prev) || isNaN(current)) return '';
//   let computation = '';
//   switch (operation) {
//     case '+':
//       computation = prev + current;
//       break;
//     case '-':
//       computation = prev - current;
//       break;
//     case '*':
//       computation = prev * current;
//       break;
//     case '÷':
//       computation = prev / current;
//       break;
//   }

//   return computation.toString();
// }

// const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
//   maximumFractionDigits: 0
// });
// function formatOperand(operand) {
//   if (operand == null) return;
//   const [integer, decimal] = operand.split('.');
//   if (decimal == null) return INTEGER_FORMATTER.format(integer);
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
// }

const App = () => {
  // const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
  //   reducer,
  //   {}
  // );

  const getResult = async () => {
    const response = await fetch('http://localhost:8080/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '-', value: 5 }
      ])
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className='calculator-grid'>
      <h4>Simple Calculator</h4>
      <div className='output'>
        <div className='previous-operand'>
          {/* {formatOperand(previousOperand)} {operation} */}
        </div>
        <div className='current-operand'>
          {/* {formatOperand(currentOperand)} */}
        </div>
      </div>
      <button
        className='span-two'
        // onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
      // onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        DEL
      </button>
      <OperationButton operation='÷' />
      <DigitButton digit='1' />
      <DigitButton digit='2' />
      <DigitButton digit='3' />
      <OperationButton operation='*' />
      <DigitButton digit='4' />
      <DigitButton digit='5' />
      <DigitButton digit='6' />
      <OperationButton operation='+' />
      <DigitButton digit='7' />
      <DigitButton digit='8' />
      <DigitButton digit='9' />
      <OperationButton operation='-' />
      <DigitButton digit='.' />
      <DigitButton digit='0' />
      <button className='span-two' onClick={getResult}>
        =
      </button>
    </div>
  );
};

export default App;
