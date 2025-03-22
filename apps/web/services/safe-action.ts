import { createSafeActionClient } from 'next-safe-action';
import { zodAdapter } from 'next-safe-action/adapters/zod';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  validationAdapter: zodAdapter(),
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      description: z.string().optional(),
    });
  },
  handleServerError(e: any, utils: any) {
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;

    // Log to console.
    console.error('Action error:', e.message, clientInput);

    // Return generic message
    return;
  },
}).use(
  async ({
    next,
    metadata,
    clientInput,
    bindArgsClientInputs,
    ctx,
  }: {
    next: any;
    metadata: any;
    clientInput: any;
    bindArgsClientInputs: any;
    ctx: any;
  }) => {
    const { actionName } = metadata;
    // Here we use a logging middleware.
    const start = Date.now();

    // Here we await the next middleware.
    const result = await next({ ctx });

    const end = Date.now();

    const durationInMs = end - start;

    const logObject: Record<string, any> = { durationInMs };

    if (process.env.NODE_ENV === 'development') {
      logObject.clientInput = clientInput;
    }

    logObject.bindArgsClientInputs = bindArgsClientInputs;
    logObject.metadata = metadata;

    if (process.env.NODE_ENV !== 'development') {
      logObject.result = result;
    }

    console.log('LOGGING FROM MIDDLEWARE:');
    console.dir(logObject, { depth: null });
    console.log(`Running action: ${actionName}`);

    return result;
  },
);