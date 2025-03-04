import { userSchema, type User, type LoginCredentials } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  authenticateUser(credentials: LoginCredentials): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;

    // Add some test users
    this.users.set(1, {
      id: 1,
      email: "test@bestelectricianbirminghamal.com",
      site: "bestelectricianbirminghamal",
      name: "Best Electrician Birmingham",
      role: "provider",
      createdAt: new Date().toISOString()
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async authenticateUser(credentials: LoginCredentials): Promise<User | undefined> {
    const user = await this.getUserByEmail(credentials.email);
    // Check if the user exists and the password matches their site name
    if (user && credentials.password === user.site) {
      return user;
    }
    return undefined;
  }
}

export const storage = new MemStorage();