export const checkEmail = (email) => {
  // eslint-disable-next-line
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let result = true;
  if (email) {
    result = email.match(mailFormat);
  }
  return result;
};

export const checkPassword = (password) => {
  let result = true;
  if (password) {
    result = password.length >= 4;
  }
  return result;
};
