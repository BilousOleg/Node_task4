export const createFormData = values => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return formData;
};
