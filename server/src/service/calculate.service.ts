import { PostedData } from './../types';

export default class CalculateService {
  calculate(data: PostedData) {
    this.findDevisionsAndReturnResult(data);
    this.findMultiplyAndReturnResult(data);

    let finalResult = 0;
    data.forEach((item) => {
      if (item.type === '+') {
        finalResult = this.add(finalResult, item.value);
      } else if (item.type === '-') {
        finalResult = this.sub(finalResult, item.value);
      }
    });
    return finalResult;
  }

  add(first: number, second: number) {
    return first + second;
  }

  sub(first: number, second: number) {
    return first - second;
  }

  multiply(first: number, second: number) {
    if (first === 0 || second === 0) {
      return 0;
    }
    return first * second;
  }

  divide(first: number, second: number) {
    // just to make sure that we don't divide by 0 ! (if we do, we will get Infinity)
    if (second === 0) {
      return 0;
    }
    return first / second;
  }

  findDevisionsAndReturnResult(data: PostedData) {
    const divideIndex = data.findIndex(
      (item, index) => item.type === '/' && index !== 0
    );

    if (divideIndex !== -1) {
      const devisions = data[divideIndex];
      const devisionsResult = this.divide(
        data[divideIndex - 1].value,
        devisions.value
      );
      data.splice(divideIndex - 1, 2, { type: '+', value: devisionsResult });
      this.findDevisionsAndReturnResult(data);
    }
  }

  findMultiplyAndReturnResult(data: PostedData) {
    const multiplyIndex = data.findIndex((operation) => operation.type === '*');
    if (multiplyIndex !== -1) {
      const multiply = data[multiplyIndex];
      const multiplyResult = this.multiply(
        data[multiplyIndex - 1].value,
        multiply.value
      );
      data.splice(multiplyIndex - 1, 2, { type: '+', value: multiplyResult });
      this.findMultiplyAndReturnResult(data);
    }
  }
}
