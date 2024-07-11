import { useState } from 'react';

const useFormData = (initialValue) => {
  const [formData, setFormData] = useState(initialValue);

  const onChangeFormData = (e) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  return [formData, onChangeFormData];
};

export default useFormData;