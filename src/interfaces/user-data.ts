export interface UserData {
  id?: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  created_At: string;
  establishments: Establishments[];
}

export interface Establishments {
  id?: string;
  matrix_Id?: string;
  type: string;
  name: string;
  phoneNumber: string;
  created_At: Date;
}
