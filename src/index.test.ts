import { handler } from "./index";
import { Context } from "aws-lambda";

describe('lambda handler', () => {
    it('is executed successfully', async () => {
      await handler(`unko`,{} as Context,() => {})
    })
  })