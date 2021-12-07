export default (previousState = '', { type, payload }) => {
  if (type === 'BATCH_RECEIVED') {
    return payload.batch;
  }
  return previousState;
};
