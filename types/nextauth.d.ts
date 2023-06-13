import { User } from "next-auth";
import { JWT } from "next-auth/jwt";


type UserId = string;
type prnNumber = string;

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
    };
  }
}
