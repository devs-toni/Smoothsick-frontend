import { useState } from 'react';


export const useForm = (initialForm) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = (form) => {
    let errors = {};
    errors.name = validateName(form.name);
    errors.username = validateUsername(form.username);
    errors.email = validateEmail(form.email);
    errors.password = validatePassword(form.password, form.repeatPassword);
    return errors;
  }

  const handleBlur = ({ target }) => {
    const { name, value } = target;
    let error = '';
    if (name === 'password') {
      error = validateField(name, value, form.repeatPassword);
    } else if (name === 'repeatPassword') {
      error = validateField(name, form.password, value);
    } else {
      error = validateField(name, value);
    }
    if (name === "password" || name === "repeatPassword") {
      setErrors({ ...errors, password: error });
      return;
    }
    setErrors({ ...errors, [name]: error });
  }

  const validateField = (field, value1, value2) => {
    switch (field) {
      case "name":
        return validateName(value1)
      case "email":
        return validateEmail(value1)
      case "username":
        return validateUsername(value1)
      case "password":
      case "repeatPassword":
        return validatePassword(value1, value2)
      default:
        break;
    }
  }

  const validate = () => {
    const totalErrors = validateForm(form);
    setErrors(totalErrors);
    return errors;
  }

  return {
    form, handleChange, handleBlur, validate, errors
  }
}


const validateName = (value) => {
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let error = '';
  if (!regexName.test(value.trim()) && value.length > 0) {
    error = 'Only accepts letters and whitespace';
  }
  return error;
}

const validateUsername = (value) => {
  let error = '';
  return error;
}

const validateEmail = (value) => {
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let error = '';
  if (!regexEmail.test(value.trim()) && value.length > 0) {
    error = 'The email entered is not valid';
  }
  return error;
}

const validatePassword = (value1, value2) => {
  let regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
  let error = '';
  if (value1 !== value2) {
    error = 'Passwords do not match'
  } else if (!regexPassword.test(value1.trim()) && value1.length > 0) {
    error = " Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long"
  }
  return error;
}