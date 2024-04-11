import { Basket } from "./basket";

export interface User {
  email: string;
  basket?: Basket;
  roleId: number;
}