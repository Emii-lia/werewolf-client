import { z } from 'zod';

const toOptionalSchema = <T extends { [key: string]: z.ZodTypeAny }>(
  schema: T
) => {
  const resultSchema = {} as {
    [key in keyof T]: z.ZodUnion<[z.ZodOptional<T[key]>, z.ZodLiteral<''>]>;
  };
  for (const key in schema) {
    resultSchema[key] = schema[key].optional().or(z.literal(''));
  }

  return resultSchema;
};

const useZodValidation = <T extends { [key: string]: z.ZodTypeAny }>(
  fields: T
) => {
  const submitSchema = z.object(fields);
  const changeSchema = z.object(toOptionalSchema(fields));

  return {
    submitSchema,
    changeSchema,
  };
};

export default useZodValidation;
