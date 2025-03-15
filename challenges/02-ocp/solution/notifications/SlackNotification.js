import BaseNotification from './BaseNotification';

/**
 * Slack 알림 클래스
 * - Slack 알림 관련 로직 담당
 */
class SlackNotification extends BaseNotification {
  // 알림 유형 정의 (static 속성)
  static TYPE = 'slack';
  
  /**
   * Slack 알림 데이터 유효성 검사
   * @param {object} data - 알림 데이터
   */
  validate(data) {
    if (!data.channel || !data.text) {
      throw new Error('Slack 알림은 채널(channel)과 텍스트(text)가 필요합니다');
    }
    
    // 채널 형식 검사
    if (!data.channel.startsWith('#') && !data.channel.startsWith('@')) {
      throw new Error('Slack 채널은 #(채널) 또는 @(사용자)로 시작해야 합니다');
    }
  }

  /**
   * Slack 알림 데이터 생성
   * @param {object} data - 알림 데이터
   * @returns {object} - 가공된 알림 데이터
   */
  createNotificationData(data) {
    return {
      channel: data.channel,
      text: data.text,
      username: data.username || 'NotificationBot',
      icon_emoji: data.icon_emoji || ':bell:',
      attachments: data.attachments || [],
      blocks: data.blocks || [],
      thread_ts: data.thread_ts || null
    };
  }

  /**
   * Slack 메시지 전송 로직
   */
  async send() {
    console.log(`Slack 메시지 전송: ${this.data.channel}, 텍스트: ${this.data.text}`);
    
    try {
      // 실제로는 여기서 Slack API를 호출
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

export default SlackNotification;