import { useState } from 'react';

export default function useValidateForm() {
  const [formErrors, setFormErrors] = useState({});
  // 필드 유효성 검사
  const validateField = (fieldName, value) => {
    let errors = { ...formErrors };

    switch (fieldName) {
      case "name":
        if (!value) {
          errors.name = "이름은 필수입니다";
        } else if (value.length < 2) {
          errors.name = "이름은 최소 2자 이상이어야 합니다";
        } else {
          delete errors.name;
        }
        break;
      case "email":
        if (!value) {
          errors.email = "이메일은 필수입니다";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "유효한 이메일 주소가 아닙니다";
        } else {
          delete errors.email;
        }
        break;
      case "bio":
        if (value.length > 200) {
          errors.bio = "자기소개는 200자 이내로 작성해주세요";
        } else {
          delete errors.bio;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  // 전체 폼 유효성 검사
  const validateForm = (formData) => {
    let isValid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = "이름은 필수입니다";
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = "이름은 최소 2자 이상이어야 합니다";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "이메일은 필수입니다";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "유효한 이메일 주소가 아닙니다";
      isValid = false;
    }

    if (formData.bio.length > 200) {
      errors.bio = "자기소개는 200자 이내로 작성해주세요";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return { formErrors, validateField, validateForm };
}