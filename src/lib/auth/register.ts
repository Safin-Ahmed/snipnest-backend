import bcrypt from "bcryptjs";
import { User } from "../../model";
const registerUser = async ({ username, email, password }) => {
  // generating salt
  const salt = await bcrypt.genSalt(10);

  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  //
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

export default registerUser;
