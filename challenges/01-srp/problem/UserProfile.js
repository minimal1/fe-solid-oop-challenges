import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * UserProfile 컴포넌트
 * - 사용자 정보 가져오기
 * - 사용자 프로필 표시
 * - 프로필 편집 기능
 * - 사용자 인증 확인
 * - 폼 검증
 * - API 호출
 */
function UserProfile({ userId }) {
  // 사용자 데이터 상태
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 폼 상태
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: ''
  });
  
  // 폼 유효성 검사 상태
  const [formErrors, setFormErrors] = useState({});
  
  // 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  
  // 유저 데이터 가져오기
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        // 토큰 검증
        const token = localStorage.getItem('auth_token');
        if (!token) {
          throw new Error('인증이 필요합니다');
        }
        
        setAuthToken(token);
        setIsAuthenticated(true);
        
        // 사용자 데이터 API 호출
        const response = await axios.get(`https://api.example.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio || '',
          location: response.data.location || ''
        });
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [userId]);
  
  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 실시간 유효성 검사
    validateField(name, value);
  };
  
  // 필드 유효성 검사
  const validateField = (fieldName, value) => {
    let errors = { ...formErrors };
    
    switch (fieldName) {
      case 'name':
        if (!value) {
          errors.name = '이름은 필수입니다';
        } else if (value.length < 2) {
          errors.name = '이름은 최소 2자 이상이어야 합니다';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        if (!value) {
          errors.email = '이메일은 필수입니다';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = '유효한 이메일 주소가 아닙니다';
        } else {
          delete errors.email;
        }
        break;
      case 'bio':
        if (value.length > 200) {
          errors.bio = '자기소개는 200자 이내로 작성해주세요';
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
  const validateForm = () => {
    let isValid = true;
    let errors = {};
    
    if (!formData.name) {
      errors.name = '이름은 필수입니다';
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = '이름은 최소 2자 이상이어야 합니다';
      isValid = false;
    }
    
    if (!formData.email) {
      errors.email = '이메일은 필수입니다';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '유효한 이메일 주소가 아닙니다';
      isValid = false;
    }
    
    if (formData.bio.length > 200) {
      errors.bio = '자기소개는 200자 이내로 작성해주세요';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('인증이 필요합니다');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // API 호출하여 사용자 데이터 업데이트
      const response = await axios.put(`https://api.example.com/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('프로필 업데이트 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setAuthToken('');
    setError('로그아웃 되었습니다');
  };
  
  // 로딩 중 표시
  if (loading && !user) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">로딩 중...</div>
      </div>
    );
  }
  
  // 에러 표시
  if (error && !isAuthenticated) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
        <button onClick={() => window.location.href = '/login'}>로그인하기</button>
      </div>
    );
  }
  
  // 인증 안된 경우
  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <div className="error-message">이 페이지를 보려면 로그인이 필요합니다</div>
        <button onClick={() => window.location.href = '/login'}>로그인하기</button>
      </div>
    );
  }
  
  // 사용자가 없는 경우
  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">사용자를 찾을 수 없습니다</div>
      </div>
    );
  }
  
  // 편집 폼 렌더링
  if (isEditing) {
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
            <button type="button" onClick={() => setIsEditing(false)}>
              취소
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // 프로필 정보 표시
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user.name}의 프로필</h2>
        <div className="profile-actions">
          <button onClick={() => setIsEditing(true)}>편집</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
      
      <div className="profile-info">
        <div className="info-item">
          <span className="label">이메일:</span>
          <span className="value">{user.email}</span>
        </div>
        
        {user.bio && (
          <div className="info-item">
            <span className="label">자기소개:</span>
            <span className="value">{user.bio}</span>
          </div>
        )}
        
        {user.location && (
          <div className="info-item">
            <span className="label">위치:</span>
            <span className="value">{user.location}</span>
          </div>
        )}
        
        <div className="info-item">
          <span className="label">가입일:</span>
          <span className="value">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default UserProfile;