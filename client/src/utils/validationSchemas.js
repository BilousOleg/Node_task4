import * as yup from 'yup';

const textValidationSchema = fieldName =>
  yup
    .string()
    .typeError(`${fieldName} must be a string`)
    .min(1, `${fieldName} must not be empty`)
    .max(100, `${fieldName} must not exceed 100 characters`)
    .trim();

const yearValidationSchema = fieldName =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .integer(`${fieldName} must be an integer`)
    .min(1970, `${fieldName} must be at least 1970`)
    .max(
      new Date().getFullYear(),
      `${fieldName} must not exceed ${new Date().getFullYear()}`
    );

const positiveIntegerValidationSchema = (fieldName, defaultValue) =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .integer(`${fieldName} must be an integer`)
    .min(1, `${fieldName} must be greater than 0`)
    .default(defaultValue);

const numberValidationSchema = fieldName =>
  yup
    .number()
    .typeError(`${fieldName} must be a number`)
    .min(1, `${fieldName} must be at least 1`)
    .max(99.9, `${fieldName} must not exceed 99.9`);

const booleanValidationSchema = fieldName =>
  yup.boolean().typeError(`${fieldName} must be a boolean`);

export const CREATE_PHONE_VALIDATION_SCHEMA = yup.object({
  model: textValidationSchema('Model').required('Model is required'),
  brand: textValidationSchema('Brand').required('Brand is required'),
  manufacturedYear: yearValidationSchema('Manufactured year').required(
    'Manufactured year is required'
  ),
  ramSize: positiveIntegerValidationSchema('RAM size').required(
    'RAM size is required'
  ),
  cpu: textValidationSchema('CPU').required('CPU is required'),
  screenDiagonal: numberValidationSchema('Screen diagonal').required(
    'Screen diagonal is required'
  ),
  hasNfc: booleanValidationSchema('NFC').default(false),
});

export const UPDATE_PHONE_VALIDATION_SCHEMA = yup.object({
  model: textValidationSchema('Model'),
  brand: textValidationSchema('Brand'),
  manufacturedYear: yearValidationSchema('Manufactured year'),
  ramSize: positiveIntegerValidationSchema('RAM size'),
  cpu: textValidationSchema('CPU'),
  screenDiagonal: numberValidationSchema('Screen diagonal'),
  hasNfc: booleanValidationSchema('NFC'),
});
