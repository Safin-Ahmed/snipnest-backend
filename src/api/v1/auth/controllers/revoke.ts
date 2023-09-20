import { revokeToken } from "../../../../lib/auth";

const revoke = async (req, res, next) => {
  try {
    const { token } = req.body;
    const revokedToken = await revokeToken(token, req.clientIp);
    return res.status(200).json({
      code: 200,
      message: "Successfully Revoked Your Token",
      data: {
        refresh_token: revokedToken.token,
      },
      links: {
        self: `${process.env.ROOT}/private/auth/token/revoke`,
        login: `${process.env.ROOT}/public/auth/login`,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default revoke;
