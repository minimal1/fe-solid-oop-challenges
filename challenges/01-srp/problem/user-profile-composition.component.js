import React from 'react';
import AuthManager from "./auth-manager.component";
import LoadingView from "./loading-view.component";
import ErrorView from "./error-view.component";
import UserProfileApi from "./user-profile-api.component";
import UserProfile from "./user-profile";

export default function UserProfileComposition({ userId }) {
  return (
    <AuthManager>
      {({ isAuthenticated, loading, error, authToken, logout }) => {
        if (loading) {
          return <LoadingView />;
        }

        if (error) {
          return <ErrorView error={error} />;
        }

        if (!isAuthenticated) {
          return <ErrorView error="이 페이지를 보려면 로그인이 필요합니다" />;
        }

        return (
          <UserProfileApi userId={userId} authToken={authToken}>
            {({ loading, error, data, update }) => {
              if (loading) {
                return <LoadingView />;
              }

              if (error) {
                return <ErrorView error={error} />;
              }

              if (!data) {
                return (
                  <div className="profile-container">
                    <div className="error-message">
                      사용자를 찾을 수 없습니다
                    </div>
                  </div>
                );
              }

              return (
                <UserProfile user={data} logout={logout} update={update} />
              );
            }}
          </UserProfileApi>
        );
      }}
    </AuthManager>
  );
}