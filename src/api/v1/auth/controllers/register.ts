import { registerUser } from "../../../../lib/auth";

const register = async (req, res, next) => {
  try {
    // Created User
    const user: any = await registerUser(req.body);
    res.status(201).json({
      code: 201,
      message: "Registration Successfull",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      links: {
        self: `${process.env.ROOT}/admin/users/${user.id}`,
        profile: `${process.env.ROOT}/public/profiles/${user.id}`,
        login: `${process.env.ROOT}/auth/login`,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export default register;
