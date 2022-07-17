import React from 'react';

type Props = {
  operation: string;
};

const OperationButton = ({ operation }: Props) => {
  return (
    <button
    // //   onClick={() =>
    // //    // dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
    // //   }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
