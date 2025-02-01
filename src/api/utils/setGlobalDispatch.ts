import { Dispatch } from 'react';

let globalDispatch: Dispatch<any> | null = null;

export const setGlobalDispatch = (dispatch: Dispatch<any>) => {
  globalDispatch = dispatch;
};

export const getGlobalDispatch = () => {
  if (!globalDispatch) {
    throw new Error('globalDispatch is not set. Make sure to call setGlobalDispatch first.');
  }
  return globalDispatch;
};
