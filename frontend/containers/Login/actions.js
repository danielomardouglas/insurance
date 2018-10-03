/*
 * Home Actions
 */

import { LOGIN } from './constants';

export const login = (values, resolve, reject) => ({
  type: LOGIN,
  values,
  resolve,
  reject,
});
