import classNames from 'classnames';
import { Field } from 'formik';

function Input (props) {
  const { name, label, classes, ...restProps } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        const inputClassNames = classNames(classes.input, {
          [classes.valid]: !meta.error && meta.touched,
          [classes.invalid]: meta.error && meta.touched,
        });

        return (
          <label className={classes.label}>
            <span>{label}</span>
            <input className={inputClassNames} {...restProps} {...field} />
            {meta.error && meta.touched && (
              <span className={classes.error}>{meta.error}</span>
            )}
          </label>
        );
      }}
    </Field>
  );
}

export default Input;
