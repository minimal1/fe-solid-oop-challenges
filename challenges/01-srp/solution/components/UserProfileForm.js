import React, { useEffect } from 'react';
import useForm from '../hooks/useForm';
import { validateField, isValid } from '../validators/profileValidator';

/**
 * 사용자 프로필 폼 컴포넌트
 * - 단일 책임 원칙: 프로필 편집 UI만 담당
 */
function UserProfileForm({ user, onSubmit, onCancel }) {
  // 폼 상태 관리는 useForm 훅으로 분리
  const { 
    values, 
    errors, 
    handleChange, 
    validateForm, 
    resetForm, 
    setValues 
  } = useForm(
    {
      name: '',
      email: '',
      bio: '',
      location: ''
    },
    validateField
  );
  
  // 초기 사용자 데이터 설정
  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || ''
      });
    }
  }, [user, setValues]);
  
  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!validateForm() || !isValid(errors)) {
      return;
    }
    
    // 상위 컴포넌트의 onSubmit 호출
    onSubmit(values);
  };
  
  return (
    <div className="profile-form-container">
      <h2>프로필 편집</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">자기소개</label>
          <textarea
            id="bio"
            name="bio"
            value={values.bio}
            onChange={handleChange}
          />
          {errors.bio && <div className="error">{errors.bio}</div>}
          <div className="char-count">{values.bio.length}/200</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            name="location"
            value={values.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={!isValid(errors)}
          >
            저장
          </button>
          <button 
            type="button" 
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileForm;