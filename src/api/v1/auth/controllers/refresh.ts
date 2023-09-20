import { refreshToken } from "../../../../lib/auth";

const refresh = async (req, res, next) => {
  try {
    // Extract the token from body
    const token = req.body.token;

    // Get new tokens
    const { accessToken, refreshToken: rToken } = await refreshToken(
      token,
      req.clientIp
    );

    // Send response
    return res.status(200).json({
      code: 200,
      message: "Successfully Refreshed Your Tokens",
      data: {
        access_token: accessToken,
        refresh_token: rToken,
      },
      links: {
        self: `${process.env.ROOT}/private/auth/token/refresh`,
        revoke: `${process.env.ROOT}/private/auth/token/revoke`,
        validate: `${process.env.ROOT}/private/auth/token/validate`,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default refresh;
