import { useEffect, useState } from 'react';

const useFormData = (initialValue) => {
  const [formData, setFormData] = useState(initialValue);
  const [checkFormData, setCheckFormData] = useState({ status: false, field: null });

  useEffect(() => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        return setCheckFormData({ status: false, field: key });
      }
    }
    setCheckFormData({ status: true, field: null });
  }, [formData]);

  const onChangeFormData = (e) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  return [formData, onChangeFormData, checkFormData];
};

export default useFormData;
