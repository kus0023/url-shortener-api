const userService = require("../service/UserService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    if (!token) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    return res.status(200).json({
      token,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userData = await userService.register({ name, email, password });

    if (!userData.user) {
      return res.status(400).json({
        message: userData.message,
      });
    }

    return res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};
