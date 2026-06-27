import { User } from "./user.types";

export interface AuthContextType {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (user: User, token: string) => Promise<void>;

  logout: () => Promise<void>;
}
