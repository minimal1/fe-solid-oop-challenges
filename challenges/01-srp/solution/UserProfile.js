import React, { useState } from 'react';

// 커스텀 훅 불러오기
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';

// 컴포넌트 불러오기
import UserProfileView from './components/UserProfileView';
import UserProfileForm from './components/UserProfileForm';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';

/**
 * UserProfile 컴포넌트 - 사용자 프로필 페이지의 메인 컴포넌트
 * 각 책임을 적절한 컴포넌트 및 모듈로 분리하여 관리
 */
function UserProfile({ userId }) {
  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  
  // 인증 관련 로직은 useAuth 훅으로 분리
  const { isAuthenticated, authToken, logout, error: authError } = useAuth();
  
  // 사용자 데이터 관련 로직은 useUser 훅으로 분리
  const { 
    user, 
    loading, 
    error: userError,
    updateUser 
  } = useUser(userId, authToken);

  // 에러 통합 처리
  const error = authError || userError;

  // 프로필 업데이트 핸들러
  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      // updateUser 내에서 에러 처리가 되므로 여기서는 추가 처리 없음
    }
  };

  // 로딩 중 표시
  if (loading && !user) {
    return <Loading />;
  }
  
  // 인증 안된 경우
  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <ErrorMessage message={error || "이 페이지를 보려면 로그인이 필요합니다"} />
        <button onClick={() => window.location.href = '/login'}>로그인하기</button>
      </div>
    );
  }
  
  // 사용자가 없는 경우
  if (!user && !loading) {
    return (
      <div className="profile-container">
        <ErrorMessage message="사용자를 찾을 수 없습니다" />
      </div>
    );
  }
  
  // 편집 폼 또는 프로필 정보 표시
  return (
    <div className="profile-container">
      {isEditing ? (
        <UserProfileForm 
          user={user} 
          onSubmit={handleUpdateProfile} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <UserProfileView 
          user={user} 
          onEdit={() => setIsEditing(true)} 
          onLogout={logout} 
        />
      )}
      
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default UserProfile;