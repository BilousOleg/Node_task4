import { Field, Form, Formik } from 'formik';
import Input from '../Input';
import styles from './PhoneForm.module.sass';
import CONSTANTS from '../../../constants';

const { EMPTY_PHONE } = CONSTANTS;

function PhoneForm ({
  initialValues = EMPTY_PHONE,
  validationSchema,
  submitHandler,
  mode = 'create',
  phoneImage,
}) {
  const classes = {
    input: styles.input,
    label: styles.label,
    valid: styles.valid,
    invalid: styles.invalid,
    error: styles.error,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <Input
            name='brand'
            label='Brand'
            classes={classes}
            type='text'
            placeholder='Apple'
          />

          <Input
            name='model'
            label='Model'
            classes={classes}
            type='text'
            placeholder='iPhone 12'
          />

          <Input
            name='manufacturedYear'
            label='Manufactured year'
            classes={classes}
            type='number'
            placeholder='2020'
          />

          <Input
            name='ramSize'
            label='RAM (MB)'
            classes={classes}
            type='number'
            placeholder='4000'
          />

          <Input
            name='cpu'
            label='CPU'
            classes={classes}
            type='text'
            placeholder='Apple A14 Bionic'
          />

          <Input
            name='screenDiagonal'
            label='Screen diagonal'
            classes={classes}
            type='number'
            step='0.1'
            placeholder='6.1'
          />

          <label className={styles.checkbox}>
            <Field type='checkbox' name='hasNfc' />
            <span>Has NFC</span>
          </label>

          <span>Image</span>
          <label className={styles.fileField}>
            {mode === 'update' && phoneImage && (
              <div>
                <span>Current image</span>
                <img
                  src={`http://localhost:5000/images/${phoneImage}`}
                  alt='Current phone'
                />
              </div>
            )}
            <input
              type='file'
              name='image'
              accept='image/jpeg,image/png,image/jpg'
              onChange={e => {
                setFieldValue('image', e.target.files[0] || null);
              }}
            />
          </label>
          <button type='submit' className={styles.submitBtn}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PhoneForm;
