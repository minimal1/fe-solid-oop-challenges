import BaseNotification from './BaseNotification';

/**
 * 푸시 알림 클래스
 * - 푸시 알림 관련 로직 담당
 */
class PushNotification extends BaseNotification {
  // 알림 유형 정의 (static 속성)
  static TYPE = 'push';
  
  /**
   * 푸시 알림 데이터 유효성 검사
   * @param {object} data - 알림 데이터
   */
  validate(data) {
    if (!data.deviceToken || !data.title) {
      throw new Error('푸시 알림은 디바이스 토큰(deviceToken)과 제목(title)이 필요합니다');
    }
    
    // 디바이스 토큰 검사
    if (typeof data.deviceToken !== 'string' || data.deviceToken.length < 10) {
      throw new Error('유효한 디바이스 토큰이 아닙니다');
    }
  }

  /**
   * 푸시 알림 데이터 생성
   * @param {object} data - 알림 데이터
   * @returns {object} - 가공된 알림 데이터
   */
  createNotificationData(data) {
    return {
      deviceToken: data.deviceToken,
      title: data.title,
      body: data.body || '',
      payload: data.payload || {},
      badge: data.badge || 0,
      sound: data.sound || 'default',
      category: data.category || null,
      ttl: data.ttl || 3600 // 기본 유효 시간: 1시간
    };
  }

  /**
   * 푸시 알림 전송 로직
   */
  async send() {
    console.log(`푸시 알림 전송: ${this.data.deviceToken.substring(0, 10)}..., 제목: ${this.data.title}`);
    
    try {
      // 실제로는 여기서 푸시 알림 API를 호출 (Firebase, APNs 등)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.status = 'sent';
      this.sentAt = new Date();
    } catch (error) {
      this.status = 'failed';
      this.error = error.message;
      throw error;
    }
  }
}

export default PushNotification;