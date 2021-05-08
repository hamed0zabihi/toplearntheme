const courseIdValidator = (id) => {
  const isValid = new RegExp("^[0-9a-zA-Z]{24}$");
  return isValid.test(id);
};

export default courseIdValidator;
