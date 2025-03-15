import { useState, useEffect } from 'react';
import userService from '../api/userService';

/**
 * 사용자 데이터 관리 로직을 담당하는 커스텀 훅
 * - 단일 책임 원칙: 사용자 데이터 관리만 담당
 */
function useUser(userId, authToken) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 사용자 데이터 가져오기
  useEffect(() => {
    // 인증 토큰이 없으면 API 호출하지 않음
    if (!authToken) {
      setLoading(false);
      return;
    }
    
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        
        const userData = await userService.getUser(userId, authToken);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [userId, authToken]);
  
  /**
   * 사용자 데이터 업데이트
   */
  const updateUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = await userService.updateUser(userId, userData, authToken);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    loading,
    error,
    updateUser
  };
}

export default useUser;