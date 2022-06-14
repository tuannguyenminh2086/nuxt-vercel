import { CompatibilityEvent, H3Error, send, sendError } from 'h3';

export const responseSuccess = async (event: CompatibilityEvent, data: Object) => {
  return await send(event, JSON.stringify(data), 'application/json');
};

export const responseError = async (
  event: CompatibilityEvent,
  errorMessage: string,
  code: number = 200
) => {
  const error: H3Error = {
    name: 'request Error',
    message: errorMessage,
    statusCode: code,
    statusMessage: errorMessage,
    data: {
      status: false,
      message: errorMessage,
    },
  };
  await sendError(event, error);
};
