import { Request, Response } from "express";
import { usersMemoryRepository } from "./users.memory";
import { CreateUserPayload, UpdateUserPayload } from "./users.schema";

const userRepository = usersMemoryRepository;

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.getAll();
  res.json({ data: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const user = await userRepository.getById(id);
  if (!user) {
    res.status(404).json({ error: `User not found: ${id}` });
    return;
  }
  res.json(user);
};

export const createUser = async (
  req: Request<Record<string, string>, unknown, CreateUserPayload>,
  res: Response,
) => {
  const user = await userRepository.create(req.body);
  res.status(201).json(user);
};

export const updateUser = async (
  req: Request<Record<string, string>, unknown, UpdateUserPayload>,
  res: Response,
) => {
  const id = req.params.id;
  const user = await userRepository.update(id, req.body);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await userRepository.delete(id);
  res.status(204).send();
};
