import { useState, useCallback } from 'react';

/**
 * 폼 상태 관리 로직을 담당하는 커스텀 훅
 * - 단일 책임 원칙: 폼 상태 관리만 담당
 */
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // 입력값 변경 처리
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    
    // 필드가 수정되었음을 표시
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    
    // 유효성 검사 함수가 있으면 실행
    if (validate) {
      const fieldError = validate(name, value);
      
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: fieldError
      }));
    }
  }, [validate]);
  
  // 입력값 초기화
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  // 전체 폼 유효성 검사
  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    // 모든 필드 검사
    let isValid = true;
    const formErrors = {};
    
    // 각 필드에 대해 유효성 검사 실행
    Object.keys(values).forEach(fieldName => {
      const fieldError = validate(fieldName, values[fieldName]);
      
      if (fieldError) {
        formErrors[fieldName] = fieldError;
        isValid = false;
      }
    });
    
    setErrors(formErrors);
    
    // 모든 필드를 touched로 표시
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    return isValid;
  }, [validate, values]);
  
  return {
    values,
    errors,
    touched,
    handleChange,
    resetForm,
    validateForm,
    setValues
  };
}

export default useForm;