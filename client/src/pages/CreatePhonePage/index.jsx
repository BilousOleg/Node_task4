import { useDispatch } from 'react-redux';
import { CREATE_PHONE_VALIDATION_SCHEMA } from '../../utils/validationSchemas';
import { createPhoneThunk } from '../../store/slices/phonesSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import { createFormData } from '../../utils/formData';
import PhoneForm from '../../components/forms/PhoneForm';
import CONSTANTS from '../../constants';

const { EMPTY_PHONE } = CONSTANTS;

function CreatePhonePage () {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const formData = createFormData(values);
    try {
      await dispatch(createPhoneThunk(formData)).unwrap();

      resetForm();

      dispatch(
        showNotification({
          message: 'Phone created successfully',
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: err.errors[0].title,
          type: 'error',
        })
      );
    }
  };

  return (
    <section>
      <PhoneForm
        mode='create'
        initialValues={EMPTY_PHONE}
        validationSchema={CREATE_PHONE_VALIDATION_SCHEMA}
        submitHandler={handleSubmit}
      />
    </section>
  );
}

export default CreatePhonePage;
