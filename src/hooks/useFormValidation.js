import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = e => {
    const input = e.target;
    const { name, value } = input;
    setValues({
      ...values,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: input.validationMessage
    });
    setIsValid(input.closest("form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, resetForm, errors, setErrors, setIsValid, isValid, setIsValid }
}
