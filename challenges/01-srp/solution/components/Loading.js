import React from 'react';

/**
 * 로딩 표시 컴포넌트
 * - 단일 책임 원칙: 로딩 상태 표시만 담당
 */
function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">로딩 중...</div>
    </div>
  );
}

export default Loading;