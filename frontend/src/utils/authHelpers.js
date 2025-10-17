export const getUserFromStorage = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

export const setUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUserFromStorage = () => {
  localStorage.removeItem('user');
};
