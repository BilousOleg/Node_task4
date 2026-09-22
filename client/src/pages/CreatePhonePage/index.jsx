import { useDispatch } from 'react-redux';
import { CREATE_PHONE_VALIDATION_SCHEMA } from '../../utils/validationSchemas';
import { createPhoneThunk } from '../../store/slices/phonesSlice';
import { createFormData } from '../../utils/formData';
import PhoneForm from '../../components/forms/PhoneForm';
import CONSTANTS from '../../constants';

const { EMPTY_PHONE } = CONSTANTS;

function CreatePhonePage () {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const formData = createFormData(values);
    dispatch(createPhoneThunk(formData));
    resetForm();
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
