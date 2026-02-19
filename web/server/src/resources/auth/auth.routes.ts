import { NextFunction, Request, Response, Router } from "express";
import { signIn, signOut, signUp } from "./auth.controller";
import { SignInPayloadSchema, SignUpPayloadSchema } from "./auth.schema";
import { schemaValidate } from "../../middlewares/schema-validate";

export const authRouter = Router();

const handleErrors =
  <R extends Request>(handler: (req: R, res: Response) => Promise<void>) =>
  async (req: R, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };

authRouter.post(
  "/sign-in",
  schemaValidate(SignInPayloadSchema)(handleErrors(signIn)),
);
authRouter.post(
  "/sign-up",
  schemaValidate(SignUpPayloadSchema)(handleErrors(signUp)),
);
authRouter.post("/sign-out", handleErrors(signOut));
