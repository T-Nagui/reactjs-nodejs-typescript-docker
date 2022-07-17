import { PostedData } from './../types';
import CalculateService from '../service/calculate.service';
import { Router, Request, Response } from 'express';
import Ajv from 'ajv';
const ajv = new Ajv();

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['*', '/', '+', '-'] },
      value: { type: 'number' }
    },
    required: ['type', 'value'],
    additionalProperties: false
  }
};
const validate = ajv.compile(schema);

const CalculateController = Router();

const service = new CalculateService();

type RequestBody = Request<{}, {}, PostedData>;

CalculateController.route('/').post((req: RequestBody, res: Response) => {
  const operations = req.body;
  if (!validate(operations)) {
    return res.status(400).send('Invalid request');
  }

  if (!operations.length || ['*', '/'].includes(operations[0].type)) {
    return res.status(400).send('Invalid request');
  }

  const result = service.calculate(operations);

  return res.send({
    result
  });
});

export { CalculateController };
