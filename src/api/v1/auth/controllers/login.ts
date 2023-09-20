import { loginUser } from "../../../../lib/auth";

const login = async (req, res, next) => {
  try {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      clientIp: req.clientIp,
    };

    // Get tokens
    const { accessToken, refreshToken } = await loginUser(payload);

    // Send appropriate response
    return res.status(200).json({
      code: 200,
      message: "Login Successful",
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      links: {
        self: `${process.env.ROOT}/public/auth/login`,
        refresh: `${process.env.ROOT}/public/auth/token/refresh`,
        revoke: `${process.env.ROOT}/private/auth/token/revoke`,
        validate: `${process.env.ROOT}/private/auth/token/validate`,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default login;
