import React, { useState } from "react";
import UserProfileEditForm from "./user-profile-edit-form.component";

function UserProfile({ user, logout, update }) {
  // 폼 상태
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  if (isEditing) {
    return (
      <UserProfileEditForm
        finishEdit={() => setIsEditing(false)}
        update={update}
        user={user}
      />
    );
  }

  // 프로필 정보 표시
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user.name}의 프로필</h2>
        <div className="profile-actions">
          <button onClick={() => setIsEditing(true)}>편집</button>
          <button onClick={logout}>로그아웃</button>
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