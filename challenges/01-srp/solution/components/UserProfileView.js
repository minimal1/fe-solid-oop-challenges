import React from 'react';

/**
 * 사용자 프로필 뷰 컴포넌트
 * - 단일 책임 원칙: 프로필 정보 표시 UI만 담당
 */
function UserProfileView({ user, onEdit, onLogout }) {
  if (!user) return null;
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user.name}의 프로필</h2>
        <div className="profile-actions">
          <button onClick={onEdit}>편집</button>
          <button onClick={onLogout}>로그아웃</button>
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
    </div>
  );
}

export default UserProfileView;