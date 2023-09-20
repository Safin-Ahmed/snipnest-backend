import { checkTokenValidity } from "../../../../lib/auth";

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const isValid = await checkTokenValidity(token);

    if (!isValid) {
      return res.status(400).json({
        code: 400,
        message: "The token is invalid",
        data: {
          refresh_token: token,
          validity: isValid,
        },
        links: {
          self: `${process.env.ROOT}/public/auth/token/validate`,
          refresh: `${process.env.ROOT}/public/auth/token/refresh`,
          revoke: `${process.env.ROOT}/public/auth/token/revoke`,
        },
      });
    }

    return res.status(200).json({
      code: 200,
      message: "The token is valid",
      data: {
        refresh_token: token,
        validity: isValid,
      },
      links: {
        self: `${process.env.ROOT}/public/auth/token/validate`,
        refresh: `${process.env.ROOT}/public/auth/token/refresh`,
        revoke: `${process.env.ROOT}/public/auth/token/revoke`,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default validateToken;
