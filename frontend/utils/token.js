const setToken = (token) => window.localStorage.setItem('token', token);

const getToken = () => window.localStorage.getItem('token');

const removeToken = () => window.localStorage.removeItem('token');

export default getToken;
export { setToken, removeToken };
