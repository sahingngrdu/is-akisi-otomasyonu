import { z } from "zod";

export const serviceTypes = [
  "is-akisi-otomasyonu",
  "sistem-entegrasyonu",
  "surec-analizi",
  "diger",
] as const;

export const applicationSchema = z
  .object({
    name: z.string().trim().min(2, "Adınızı en az 2 karakterle yazın.").max(100, "Ad en fazla 100 karakter olabilir."),
    email: z.string().trim().email("Geçerli bir e-posta adresi yazın.").max(254, "E-posta adresi çok uzun."),
    service: z.enum(serviceTypes, { error: "Bir hizmet alanı seçin." }),
    description: z
      .string()
      .trim()
      .min(10, "İhtiyacınızı en az 10 karakterle açıklayın.")
      .max(2000, "Açıklama en fazla 2000 karakter olabilir."),
  })
  .strict();

export type ApplicationInput = z.infer<typeof applicationSchema>;
