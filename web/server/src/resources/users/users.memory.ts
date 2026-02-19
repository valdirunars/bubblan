export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IDataRepository<T> {
  getById(id: string): Promise<T | null>;
  getAll(params?: PaginationParams): Promise<PaginatedResult<T>>;
  create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(
    id: string,
    item: Partial<Omit<T, "createdAt" | "updatedAt">>,
  ): Promise<T>;
  delete(id: string): Promise<void>;
}

import { User } from "./users.schema";

let users: User[] = [
  {
    id: "1",
    name: "Þorvaldur Rúnarsson",
    role: "admin",
    contactInfo: {
      email: "valdirunars@gmail.com",
    },
    preferredLanguage: "en",
    createdAt: new Date("2026-02-18"),
    updatedAt: new Date("2026-02-18"),
  },
];

export const usersMemoryRepository: IDataRepository<User> = {
  getById: async (id: string) => {
    return users.find((user) => user.id === id) || null;
  },
  getAll: async (params?: PaginationParams) => {
    return {
      items: users,
      total: users.length,
      page: params?.page || 1,
      limit: params?.limit || 10,
      totalPages: Math.ceil(users.length / (params?.limit || 10)),
    };
  },
  create: async (item) => {
    const now = new Date();
    const user: User = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    return user;
  },
  update: async (id: string, item) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error(`User not found: ${id}`);
    const now = new Date();
    const user: User = {
      ...users[index],
      ...item,
      id,
      createdAt: users[index].createdAt,
      updatedAt: now,
    };
    users[index] = user;
    return user;
  },
  delete: async (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  },
};
