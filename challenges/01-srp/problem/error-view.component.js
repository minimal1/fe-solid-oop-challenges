import React from 'react';

export default function ErrorView({ error }) {
  return (
    <div className="profile-container">
      <div className="error-message">{error}</div>
      <button onClick={() => (window.location.href = "/login")}>
        로그인하기
      </button>
    </div>
  );
}