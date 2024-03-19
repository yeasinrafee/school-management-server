import { z } from "zod";

const createClassDetailsValidationSchema = z.object({
  body: z.object({
    classNo: z.enum([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
    ]),
    sectionNo: z.enum(["A", "B", "C"]),
    year: z.string(),
  }),
});

export const ClassDetailsValidations = {
  createClassDetailsValidationSchema,
};
