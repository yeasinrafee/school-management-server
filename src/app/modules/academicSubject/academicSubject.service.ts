import { TAcademicSubject } from "./academicSubject.interface";
import { AcademicSubject } from "./academicSubject.model";

const createAcademicSubjectIntoDB = async (payload: TAcademicSubject) => {
  const result = await AcademicSubject.create(payload);
  return result;
};

const getAllAcademicSubjectsFromDB = async () => {
  const result = await AcademicSubject.find();
  return result;
};

const getSingleAcademicSubjectFromDB = async (id: string) => {
  const result = await AcademicSubject.findById(id);
  return result;
};

const updateAcademicSubjectIntoDB = async (
  id: string,
  payload: Partial<TAcademicSubject>
) => {
  const result = await AcademicSubject.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSubjectServices = {
  createAcademicSubjectIntoDB,
  getAllAcademicSubjectsFromDB,
  getSingleAcademicSubjectFromDB,
  updateAcademicSubjectIntoDB,
};
