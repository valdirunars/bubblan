import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const schemaValidate = <T extends z.ZodTypeAny>(schema: T) => {
  type Body = z.infer<T>;
  return (
    handler: (
      req: Request<Record<string, string>, unknown, Body>,
      res: Response,
      next: NextFunction
    ) => void | Promise<void>
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      req.body = result.data;
      return handler(req as Request<Record<string, string>, unknown, Body>, res, next);
    };
  };
};
