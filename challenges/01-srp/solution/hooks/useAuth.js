import { useState, useEffect } from 'react';
import userService from '../api/userService';

/**
 * 인증 관련 로직을 관리하는 커스텀 훅
 * - 단일 책임 원칙: 인증 관련 로직만 담당
 */
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 가져오기
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          return;
        }
        
        // 토큰 유효성 검증 (실제로는 API 호출)
        await userService.validateToken(token);
        
        setAuthToken(token);
        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        setIsAuthenticated(false);
        setAuthToken('');
        setError(err.message);
        localStorage.removeItem('auth_token');
      }
    };
    
    checkAuth();
  }, []);
  
  /**
   * 로그아웃 처리
   */
  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setAuthToken('');
    setError(null);
  };
  
  return {
    isAuthenticated,
    authToken,
    error,
    logout
  };
}

export default useAuth;