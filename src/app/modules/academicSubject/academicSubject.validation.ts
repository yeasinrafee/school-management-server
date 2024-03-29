import { z } from "zod";

const createAcademicSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Subject must be string",
    }),
  }),
});

const updateAcademicSubjectValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Subject must be string",
      })
      .optional(),
  }),
});

export const AcademicSubjectValidation = {
  createAcademicSubjectValidationSchema,
  updateAcademicSubjectValidationSchema,
};
