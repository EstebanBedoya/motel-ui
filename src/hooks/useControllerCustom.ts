// @packages
import { useController, useForm, Control } from 'react-hook-form';

// @types
import { IRulesParams } from '@/utils/types';

const UseControllerCustom = (controlForm: Control | undefined, name = '' as string, rules = {} as IRulesParams) => {
  const { control } = useForm();

  const { field } = useController({
    name,
    control: controlForm || control,
    rules,
  });

  return {
    field,
  };
};

export default UseControllerCustom;
