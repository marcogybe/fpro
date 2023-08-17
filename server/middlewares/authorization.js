import jwt from "jsonwebtoken";

export const authorizationHandler = (req, res, next) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;

    if (!token) {
      const error = new Error("Sorry, you are not Authorized.");
      error.statusCode = 401;
      throw error;
    }

    if (token && isCustomAuth) {
      //if it is our token

      const localData = jwt.verify(token, JWT_SECRET_KEY, (err, result) => {
        if (err) {
          const err = new Error(
            "You are not authorized to login to that page."
          );
          err.status = 400;
          throw err;
        } else return result;
      });
     
      req.localData = {
        email: localData.email,
        userId: localData.userId,
      };
    } else {
      //if it is GOOGLE token
      const googleData = jwt.decode(token);
     


      req.googleData = {
        name: googleData.name,
        email: googleData.email,
        userId: googleData.sub,
        picture: googleData.picture,
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};
