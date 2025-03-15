import axios from 'axios';

/**
 * 사용자 관련 API 서비스
 * - API 통신 관련 로직을 한 곳에서 관리
 * - 단일 책임 원칙: API 통신 책임만 담당
 */
class UserService {
  constructor(baseURL = 'https://api.example.com') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL
    });
  }

  /**
   * 헤더에 인증 토큰 설정
   */
  setAuthToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * 사용자 데이터 가져오기
   */
  async getUser(userId, token) {
    if (token) {
      this.setAuthToken(token);
    }
    
    try {
      const response = await this.client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw this._handleError(error, '사용자 정보를 가져오는 중 오류가 발생했습니다');
    }
  }

  /**
   * 사용자 데이터 업데이트
   */
  async updateUser(userId, userData, token) {
    if (token) {
      this.setAuthToken(token);
    }
    
    try {
      const response = await this.client.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw this._handleError(error, '프로필 업데이트 중 오류가 발생했습니다');
    }
  }

  /**
   * 인증 토큰 검증
   */
  async validateToken(token) {
    if (!token) {
      throw new Error('토큰이 없습니다');
    }
    
    try {
      this.setAuthToken(token);
      const response = await this.client.get('/auth/validate');
      return response.data;
    } catch (error) {
      throw this._handleError(error, '인증 검증 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 에러 처리 헬퍼 메서드
   */
  _handleError(error, defaultMessage) {
    if (error.response) {
      // 서버 응답이 있는 경우 (에러 코드)
      const serverError = error.response.data.message || error.response.data.error;
      return new Error(serverError || defaultMessage);
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      return new Error('서버에 연결할 수 없습니다');
    } else {
      // 요청 설정 중 오류가 발생한 경우
      return error;
    }
  }
}

// 싱글톤 인스턴스 생성하여 내보내기
const userService = new UserService();
export default userService;