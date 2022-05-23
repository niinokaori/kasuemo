import { handler } from "./index";
import { Context } from "aws-lambda";

describe('lambda handler', () => {
    it('is executed successfully', () => {
      expect(handler(`unko`,{} as Context,() => {}))
    })
  })