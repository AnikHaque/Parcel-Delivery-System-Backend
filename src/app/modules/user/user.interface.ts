import { Types } from "mongoose";

export enum IUserRole {
  Admin = "Admin",
  Sender = "Sender",
  Receiver = "Receiver",
}

export enum IUserStatus {
  Active = "Active",
  Blocked = "Blocked"
}

export interface IAuthProvider {
  provider: "Google" | "Credential",
  providerId: string
}

// ✅ Include _id in the interface
export interface IUser {
  _id: Types.ObjectId; // ✅ Add this line
  name: string;
  email: string;
  password?: string; 
  role: IUserRole;
  phone?: string;
  address?: string;
  status: IUserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
