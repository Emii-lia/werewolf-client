import { z } from 'zod';

const validateForm = <T extends z.ZodRawShape>(
  data: z.infer<z.ZodObject<T>>,
  schema: z.ZodSchema
) => {
  try {
    schema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.flatten().fieldErrors;
    }
    return { form: '-' };
  }
};

export default validateForm;
