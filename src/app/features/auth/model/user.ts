import {RoleEnum} from '../enum/role';

export interface UserModel {
  id: number;
  name: string;
  firstName: string;
  birthdate: Date;
  email: string;
  role: RoleEnum;
  isActive: boolean;
  token: string;
}
