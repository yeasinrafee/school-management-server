import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("classDetails");
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate("classDetails");
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
