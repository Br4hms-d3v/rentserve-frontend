import {RoleEnum} from '../enum/role';

export interface UserModel {
  name: string;
  firstName: string;
  birthdate: Date;
  email: string;
  role: RoleEnum;
  isActive: boolean;
  token: string;
}
