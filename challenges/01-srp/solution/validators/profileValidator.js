/**
 * 프로필 데이터 유효성 검사 모듈
 * - 단일 책임 원칙: 데이터 유효성 검사만 담당
 */

/**
 * 특정 필드의 유효성 검사
 * @param {string} fieldName - 필드 이름
 * @param {string} value - 필드 값
 * @returns {string|null} - 에러 메시지 또는 null
 */
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'name':
      if (!value) {
        return '이름은 필수입니다';
      } else if (value.length < 2) {
        return '이름은 최소 2자 이상이어야 합니다';
      }
      return null;
      
    case 'email':
      if (!value) {
        return '이메일은 필수입니다';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return '유효한 이메일 주소가 아닙니다';
      }
      return null;
      
    case 'bio':
      if (value && value.length > 200) {
        return '자기소개는 200자 이내로 작성해주세요';
      }
      return null;
      
    default:
      return null;
  }
};

/**
 * 전체 프로필 폼 유효성 검사
 * @param {Object} formData - 폼 데이터
 * @returns {Object} - 필드별 에러 메시지
 */
export const validateProfileForm = (formData) => {
  const errors = {};
  
  // 각 필드 검사
  Object.keys(formData).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * 유효성 검사 결과가 유효한지 확인
 * @param {Object} errors - 필드별 에러 메시지
 * @returns {boolean} - 유효 여부
 */
export const isValid = (errors) => {
  return Object.keys(errors).length === 0;
};

export default {
  validateField,
  validateProfileForm,
  isValid
};