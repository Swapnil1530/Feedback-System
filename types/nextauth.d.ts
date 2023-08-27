import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;
type prnNumber = string;
type role = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId; 
    prnNumber: prnNumber;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      prnNumber: prnNumber;
      role : role;
    };
  }
}

declare module "next-auth" {
  interface User {
    role: string;
  }
}
