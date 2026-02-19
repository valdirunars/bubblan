import { NextFunction, Request, Response, Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./users.controller";
import {
  CreateUserPayloadSchema,
  UpdateUserPayloadSchema,
} from "./users.schema";
import { schemaValidate } from "../../middlewares/schema-validate";

export const usersRouter = Router();

const handleErrors =
  <R extends Request>(handler: (req: R, res: Response) => Promise<void>) =>
  async (req: R, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };

usersRouter.get("/", handleErrors(getUsers));
usersRouter.get("/:id", handleErrors(getUserById));
usersRouter.post(
  "/",
  schemaValidate(CreateUserPayloadSchema)(handleErrors(createUser)),
);
usersRouter.put(
  "/:id",
  schemaValidate(UpdateUserPayloadSchema)(handleErrors(updateUser)),
);
usersRouter.delete("/:id", handleErrors(deleteUser));
