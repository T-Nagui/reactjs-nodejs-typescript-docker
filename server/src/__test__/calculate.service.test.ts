import CalculateService from '../service/calculate.service';

describe('CalculateService', () => {
  it('should be defined', () => {
    expect(CalculateService).toBeDefined();
  });

  it('should add tow number', () => {
    const service = new CalculateService();
    expect(service.add(1, 2)).toBe(3);
  });
  it('should subtract tow number', () => {
    const service = new CalculateService();
    expect(service.sub(1, 2)).toBe(-1);
  });
  it('should multiply tow number', () => {
    const service = new CalculateService();
    expect(service.multiply(1, 2)).toBe(2);
  });
  it('should divide tow number', () => {
    const service = new CalculateService();
    expect(service.divide(1, 2)).toBe(0.5);
  });

  it('should calculate from array of operation', () => {
    const service = new CalculateService();
    expect(
      service.calculate([
        { type: '+', value: 1 },
        { type: '+', value: 2 },
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 }
      ])
    ).toBe(15);
  });

  it('should calculate from array of operation with ordre of multiply and devisions', () => {
    const service = new CalculateService();
    expect(
      service.calculate([
        { type: '+', value: 1 },
        { type: '+', value: 2 },
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '-', value: 5 }
      ])
    ).toBe(15.5);
  });

  it('should calculate from array of operation with ordre of multiply and devisions with more than one', () => {
    const service = new CalculateService();
    expect(
      service.calculate([
        { type: '+', value: 1 },
        { type: '/', value: 2 },
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '/', value: 5 }
      ])
    ).toBe(13.8);
  });

  it('should calculate multiplication by 0', () => {
    const service = new CalculateService();
    expect(
      service.calculate([
        { type: '+', value: 0 },
        { type: '*', value: 3 }
      ])
    ).toBe(0);
  });

  it('should calculate devisions by 0 and give 0 instead of infinity', () => {
    const service = new CalculateService();
    expect(
      service.calculate([
        { type: '+', value: 5 },
        { type: '/', value: 0 }
      ])
    ).toBe(0);
  });

  //  TODO: learn how to test error if user submit wrong data even we typed
  // it('should give error if array is not valid object PostedData', () => {
  //     const service = new CalculateService();
  //     expect(() => {
  //       service.calculate([
  //         { type: '+', value: 0 },
  //         { type: '+', value: 2 },
  //         { type: '+', value: 3 },
  //         { type: '+', value: 4 },
  //         { type: '+', value: 5 }
  //       ]);
  //     }).toThrowError('Invalid data');
  //   });
});
