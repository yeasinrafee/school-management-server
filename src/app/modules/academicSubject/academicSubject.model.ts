import { model, Schema } from "mongoose";
import { TAcademicSubject } from "./academicSubject.interface";

const academicSubjectSchema = new Schema<TAcademicSubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSubject = model<TAcademicSubject>(
  "AcademicSubject",
  academicSubjectSchema
);
