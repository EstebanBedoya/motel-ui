// @packages
import { z } from 'zod';

export const schema = z.object({
  id: z.string().min(1, { message: 'Este campo es requerido' }),
  name: z.string().min(1, { message: 'Este campo es requerido' }),
  shortPrice: z.object({
    while: z.string().min(1, { message: 'Este campo es requerido' }),
    sunrise: z.string().min(1, { message: 'Este campo es requerido' }),
  }),
  longPrice: z.object({
    while: z.string().min(1, { message: 'Este campo es requerido' }),
    sunrise: z.string().min(1, { message: 'Este campo es requerido' }),
  }).nullable(),
  type: z.number().min(1, { message: 'Este campo es requerido' }),
  additions: z.array(z.number()).min(1, { message: 'Este campo es requerido' }).nullable(),
});

export const addServiceSchema = z.object({
  name: z.string().min(1, { message: 'Este campo es requerido' }),
  price: z.string().min(1, { message: 'Este campo es requerido' }),
});
