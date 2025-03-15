import BaseNotification from './BaseNotification';

/**
 * SMS 알림 클래스
 * - SMS 알림 관련 로직 담당
 */
class SMSNotification extends BaseNotification {
  // 알림 유형 정의 (static 속성)
  static TYPE = 'sms';
  
  /**
   * SMS 알림 데이터 유효성 검사
   * @param {object} data - 알림 데이터
   */
  validate(data) {
    if (!data.phoneNumber || !data.message) {
      throw new Error('SMS 알림은 전화번호(phoneNumber)와 메시지(message)가 필요합니다');
    }
    
    // 전화번호 형식 검사 (간단한 예시)
    if (!/^\+?[0-9]{10,15}$/.test(data.phoneNumber.replace(/[\s-]/g, ''))) {
      throw new Error('유효한 전화번호 형식이 아닙니다');
    }
    
    // 메시지 길이 검사
    if (data.message.length > 160) {
      throw new Error('SMS 메시지는 160자를 초과할 수 없습니다');
    }
  }

  /**
   * SMS 알림 데이터 생성
   * @param {object} data - 알림 데이터
   * @returns {object} - 가공된 알림 데이터
   */
  createNotificationData(data) {
    return {
      phoneNumber: data.phoneNumber.replace(/[\s-]/g, ''), // 공백과 하이픈 제거
      message: data.message,
      senderId: data.senderId || null
    };
  }

  /**
   * SMS 전송 로직
   */
  async send() {
    console.log(`SMS 전송: ${this.data.phoneNumber}, 메시지: ${this.data.message}`);
    
    try {
      // 실제로는 여기서 SMS API를 호출
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

export default SMSNotification;