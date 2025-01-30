import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  platform: Yup.string()
    .required('Platform is required'),
  module: Yup.string()
    .required('Module is required'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  tags: Yup.array()
    .min(1, 'Select at least one tag')
    .of(Yup.string()),
  attachments: Yup.array()
    .nullable()
    .of(
      Yup.mixed()
    )
});