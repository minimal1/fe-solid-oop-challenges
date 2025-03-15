import React from 'react';

/**
 * 오류 메시지 표시 컴포넌트
 * - 단일 책임 원칙: 오류 메시지 표시만 담당
 */
function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-text">{message}</div>
    </div>
  );
}

export default ErrorMessage;