// @packages
import * as Yup from 'yup';
import { t } from 'i18next';

export const schema = Yup.object().shape({
  id: Yup.string().required('Esto es requerido pai').nullable(),
  name: Yup.string().required('Esto es requerido pai').nullable(),
  shortPrice: Yup.object().shape({
    while: Yup.number()
      .transform((value) => (!value || Number.isNaN(value) ? undefined : value))
      .required('Esto es requerido pai')
      .nullable(),
    sunrise: Yup.number().transform((value) => (!value || Number.isNaN(value) ? undefined : value))
      .required('Esto es requerido pai').nullable(),
  }).required('Esto es requerido pai'),
  longPrice: Yup.object().shape({
    while: Yup.number()
      .transform((value) => (!value || Number.isNaN(value) ? undefined : value))
      .required('Esto es requerido pai')
      .nullable(),
    sunrise: Yup.number().transform((value) => (!value || Number.isNaN(value) ? undefined : value))
      .required('Esto es requerido pai').nullable(),
  }).required('Esto es requerido pai').nullable(),
  type: Yup.string().required('Esto es requerido pai'),
  additions: Yup.array().min(1).of(Yup.string()).required('Esto es requerido pai')
    .nullable(),
});
