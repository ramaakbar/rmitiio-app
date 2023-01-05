import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useCustomForm = <T>(schema: z.ZodType<any, any, any>) => {
  return useForm<T>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });
};
