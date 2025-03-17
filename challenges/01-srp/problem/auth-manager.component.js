import React, { useState, useEffect } from 'react';

export default function AuthManager({ children }) {
  // 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setAuthToken("");
    setError("로그아웃 되었습니다");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // 토큰 검증
        const token = localStorage.getItem("auth_token");
        if (!token) {
          throw new Error("인증이 필요합니다");
        }

        setAuthToken(token);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return children({
    isAuthenticated,
    loading,
    error,
    authToken,
    logout,
  });
}