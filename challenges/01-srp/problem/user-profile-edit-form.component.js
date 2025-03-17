import React, { useState } from 'react';
import useValidateForm from "./use-validate-form.hook";

export default function UserProfileEditForm({ finishEdit, user, update }) {
  const { formErrors, validateField, validateForm } = useValidateForm();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    location: user.location || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 실시간 유효성 검사
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    await update(formData);
    finishEdit();
  };

  return (
    <div className="profile-container">
      <h2>프로필 편집</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <div className="error">{formErrors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">자기소개</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
          {formErrors.bio && <div className="error">{formErrors.bio}</div>}
          <div className="char-count">{formData.bio.length}/200</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={Object.keys(formErrors).length > 0}>
            저장
          </button>
          <button type="button" onClick={finishEdit}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}