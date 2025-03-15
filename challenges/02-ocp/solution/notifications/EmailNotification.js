import BaseNotification from './BaseNotification';

/**
 * 이메일 알림 클래스
 * - 이메일 알림 관련 로직 담당
 */
class EmailNotification extends BaseNotification {
  // 알림 유형 정의 (static 속성)
  static TYPE = 'email';
  
  /**
   * 이메일 알림 데이터 유효성 검사
   * @param {object} data - 알림 데이터
   */
  validate(data) {
    if (!data.to || !data.subject) {
      throw new Error('이메일 알림은 수신자(to)와 제목(subject)이 필요합니다');
    }
    
    // 이메일 형식 검사 (간단한 예시)
    if (!/\S+@\S+\.\S+/.test(data.to)) {
      throw new Error('유효한 이메일 주소 형식이 아닙니다');
    }
  }

  /**
   * 이메일 알림 데이터 생성
   * @param {object} data - 알림 데이터
   * @returns {object} - 가공된 알림 데이터
   */
  createNotificationData(data) {
    return {
      to: data.to,
      subject: data.subject,
      body: data.body || '',
      cc: data.cc || [],
      bcc: data.bcc || [],
      attachments: data.attachments || []
    };
  }

  /**
   * 이메일 전송 로직
   */
  async send() {
    console.log(`이메일 전송: ${this.data.to}, 제목: ${this.data.subject}`);
    
    try {
      // 실제로는 여기서 이메일 API를 호출
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

export default EmailNotification;