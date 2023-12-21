const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {}

  async login(email, password) {
    //check if user if already present in Db
    const existingUser = await User.findOne({ email: email });

    if (!existingUser || !existingUser.validPassword(password)) {
      return null;
    }

    //create a new token
    const userPayload = {
      id: existingUser.id,
      role: existingUser.role,
    };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    return token;
  }

  async register(userDetail) {
    const { name, email, password } = userDetail;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return {
        message: "Account Already created with this email.",
      };
    }

    const hashedPassword = User.generateHash(password);

    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    userData.password = undefined;
    userData.__v = undefined;

    return {
      message: "created",
      user: userData,
    };
  }
}

module.exports = new UserService();
