import { ID, IResponseFields, ICreatedOn } from "./core.types";
import { USER_ROLES } from "data/salesPortal/userRoles";

export interface IUser extends ID, ICreatedOn {
  username: string;
  firstName: string;
  lastName: string;
  roles: USER_ROLES[];
}
