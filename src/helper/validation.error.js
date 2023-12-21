exports.validationErrorResponse = (validationResult) => {
  const errors = validationResult.map((er) => {
    return er.msg;
  });

  return { errors };
};
