import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TTeacher = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  academicSubject: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};

// Crating custom static methods
export interface TeacherModel extends Model<TTeacher> {
  // eslint-disable-next-line no-unused-vars
  isTeacherExists(id: string): Promise<TTeacher | null>;
}
