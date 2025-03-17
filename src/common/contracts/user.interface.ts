export interface IUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nickName?: string;
  emailIsVerified: boolean;
  gender: string;
  dob: string;
  phoneNumber: string;
  phoneNumberIsVerified: boolean;
  createdAt: string;
}
