import config from "../../config";
import { TClassDetails } from "../classDetails/classDetails.interface";
import { ClassDetails } from "../classDetails/classDetails.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await Student.isStudentExists(studentData.id)) {
  //     throw new Error("Student already exists!");
  //   }

  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  const classDetail = await ClassDetails.findById(payload.classDetails);

  // set manually generated id
  userData.id = await generateStudentId(classDetail);

  // create a user
  const newUser = await User.create(userData); // static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
