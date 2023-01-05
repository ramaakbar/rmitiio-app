import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export const useCustomForm = <T extends FieldValues>(
  schema: z.ZodType<any, any, any>
) => {
  return useForm<T>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });
};
