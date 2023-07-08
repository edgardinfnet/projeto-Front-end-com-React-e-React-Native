import * as yup from 'yup';

export const notepadSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, 'O título precisa ter pelo menos 4 caracteres')
    .max(20, 'Título precisa ter no máximo 20 caracteres')
    .required('Título não pode ficar vazio'),
  subtitle: yup
    .string()
    .min(8, 'Subtítulo precisa ter pelo menos 8 caracteres')
    .max(32, 'Subtítulo precisa ter no máximo 32 caracteres')
    .required('Subtítulo não pode ficar vazio'),
  content: yup
    .string()
    .min(12, 'Conteúdo precisa ter pelo menos 12 caracteres')
    .max(256, 'Conteúdo precisa ter no máximo 256 caracteres')
    .required('Campo conteúdo não pode ficar vazio'),
});
