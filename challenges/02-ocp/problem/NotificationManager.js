/**
 * 알림 관리자 클래스
 * 다양한 유형의 알림을 생성하고 전송하는 기능을 담당
 * 
 * 문제점: OCP 위반
 * - 새로운 알림 유형을 추가하려면 이 클래스를 직접 수정해야 함
 * - 각 알림 유형에 대한 조건문으로 인해 코드가 복잡해짐
 */
class NotificationManager {
  constructor() {
    this.notifications = [];
  }

  /**
   * 새로운 알림을 생성
   * @param {string} type - 알림 유형 (email, sms, push, slack)
   * @param {object} data - 알림 데이터
   */
  createNotification(type, data) {
    // 알림 유형에 따라 다른 로직을 수행 (OCP 위반)
    if (type === 'email') {
      if (!data.to || !data.subject) {
        throw new Error('이메일 알림은 수신자와 제목이 필요합니다');
      }
      
      const notification = {
        id: this._generateId(),
        type: 'email',
        to: data.to,
        subject: data.subject,
        body: data.body || '',
        createdAt: new Date(),
        status: 'pending'
      };
      
      this.notifications.push(notification);
      return notification;
    } 
    else if (type === 'sms') {
      if (!data.phoneNumber || !data.message) {
        throw new Error('SMS 알림은 전화번호와 메시지가 필요합니다');
      }
      
      const notification = {
        id: this._generateId(),
        type: 'sms',
        phoneNumber: data.phoneNumber,
        message: data.message,
        createdAt: new Date(),
        status: 'pending'
      };
      
      this.notifications.push(notification);
      return notification;
    } 
    else if (type === 'push') {
      if (!data.deviceToken || !data.title) {
        throw new Error('푸시 알림은 디바이스 토큰과 제목이 필요합니다');
      }
      
      const notification = {
        id: this._generateId(),
        type: 'push',
        deviceToken: data.deviceToken,
        title: data.title,
        body: data.body || '',
        data: data.payload || {},
        createdAt: new Date(),
        status: 'pending'
      };
      
      this.notifications.push(notification);
      return notification;
    } 
    else if (type === 'slack') {
      if (!data.channel || !data.text) {
        throw new Error('Slack 알림은 채널과 텍스트가 필요합니다');
      }
      
      const notification = {
        id: this._generateId(),
        type: 'slack',
        channel: data.channel,
        text: data.text,
        attachments: data.attachments || [],
        createdAt: new Date(),
        status: 'pending'
      };
      
      this.notifications.push(notification);
      return notification;
    } 
    else {
      throw new Error(`지원하지 않는 알림 유형입니다: ${type}`);
    }
  }

  /**
   * 알림 전송
   * @param {string} id - 알림 ID
   */
  async sendNotification(id) {
    const notification = this.notifications.find(n => n.id === id);
    
    if (!notification) {
      throw new Error(`ID가 ${id}인 알림을 찾을 수 없습니다`);
    }
    
    // 알림 유형에 따라 다른 전송 로직을 수행 (OCP 위반)
    try {
      if (notification.type === 'email') {
        await this._sendEmail(notification);
      } 
      else if (notification.type === 'sms') {
        await this._sendSMS(notification);
      } 
      else if (notification.type === 'push') {
        await this._sendPush(notification);
      } 
      else if (notification.type === 'slack') {
        await this._sendSlack(notification);
      } 
      else {
        throw new Error(`지원하지 않는 알림 유형입니다: ${notification.type}`);
      }
      
      notification.status = 'sent';
      notification.sentAt = new Date();
      
      return notification;
    } catch (error) {
      notification.status = 'failed';
      notification.error = error.message;
      throw error;
    }
  }

  /**
   * 알림 목록 조회
   * @param {string} type - 알림 유형 (선택 사항)
   * @param {string} status - 알림 상태 (선택 사항)
   */
  getNotifications(type, status) {
    let filtered = [...this.notifications];
    
    if (type) {
      filtered = filtered.filter(n => n.type === type);
    }
    
    if (status) {
      filtered = filtered.filter(n => n.status === status);
    }
    
    return filtered;
  }

  /**
   * 이메일 전송 로직
   * @private
   */
  async _sendEmail(notification) {
    console.log(`이메일 전송: ${notification.to}, 제목: ${notification.subject}`);
    // 실제로는 여기서 이메일 API를 호출
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * SMS 전송 로직
   * @private
   */
  async _sendSMS(notification) {
    console.log(`SMS 전송: ${notification.phoneNumber}, 메시지: ${notification.message}`);
    // 실제로는 여기서 SMS API를 호출
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * 푸시 알림 전송 로직
   * @private
   */
  async _sendPush(notification) {
    console.log(`푸시 알림 전송: ${notification.deviceToken}, 제목: ${notification.title}`);
    // 실제로는 여기서 푸시 알림 API를 호출
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * Slack 메시지 전송 로직
   * @private
   */
  async _sendSlack(notification) {
    console.log(`Slack 메시지 전송: ${notification.channel}, 텍스트: ${notification.text}`);
    // 실제로는 여기서 Slack API를 호출
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * 고유 ID 생성
   * @private
   */
  _generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}

export default NotificationManager;