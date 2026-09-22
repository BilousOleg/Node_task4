import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PhoneForm from '../../components/forms/PhoneForm';
import { UPDATE_PHONE_VALIDATION_SCHEMA } from '../../utils/validationSchemas';
import { createFormData } from '../../utils/formData';
import {
  getPhoneByIdThunk,
  updatePhoneThunk,
} from '../../store/slices/phonesSlice';

function UpdatePhonePage () {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    phones,
    phone: fetchedPhone,
    isFetching,
  } = useSelector(state => state.phones);

  const phoneFromList = phones.find(phone => phone.id === Number(id));

  useEffect(() => {
    if (!phoneFromList) {
      dispatch(getPhoneByIdThunk(id));
    }
  }, [dispatch, id, phoneFromList]);

  const phone =
    phoneFromList || (fetchedPhone?.id === Number(id) ? fetchedPhone : null);

  if (!phone || isFetching) {
    return <p>Loading...</p>;
  }

  const initialValues = {
    model: phone.model,
    brand: phone.brand,
    manufacturedYear: phone.manufacturedYear,
    ramSize: phone.ramSize,
    cpu: phone.cpu,
    screenDiagonal: phone.screenDiagonal,
    hasNfc: phone.hasNfc,
    image: null,
  };

  const handleSubmit = values => {
    const formData = createFormData(values);

    dispatch(updatePhoneThunk({ id: phone.id, data: formData }));
  };

  return (
    <section>
      <PhoneForm
        mode='update'
        initialValues={initialValues}
        validationSchema={UPDATE_PHONE_VALIDATION_SCHEMA}
        submitHandler={handleSubmit}
        phoneImage={phone.image}
      />
    </section>
  );
}

export default UpdatePhonePage;
