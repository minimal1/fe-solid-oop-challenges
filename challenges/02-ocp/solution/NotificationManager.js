import notificationFactory from './factories/NotificationFactory';

/**
 * 알림 관리자 클래스 (OCP 준수 버전)
 * - 알림 생성 및 전송을 조정하는 역할
 * - 구체적인 알림 타입 구현에 의존하지 않음
 */
class NotificationManager {
  constructor() {
    this.notifications = [];
    this.factory = notificationFactory; // 알림 팩토리 주입
  }

  /**
   * 새로운 알림 유형 등록 (확장 지점)
   * @param {string} type - 알림 유형 이름
   * @param {class} notificationClass - 알림 클래스
   */
  registerNotificationType(type, notificationClass) {
    this.factory.registerType(type, notificationClass);
    return this;
  }

  /**
   * 새로운 알림 생성
   * @param {string} type - 알림 유형
   * @param {object} data - 알림 데이터
   * @returns {object} - 생성된 알림 정보
   */
  createNotification(type, data) {
    // 팩토리를 통해 적절한 알림 객체 생성
    const notification = this.factory.createNotification(type, data);
    
    // 알림 저장
    this.notifications.push(notification);
    
    // 알림 정보 반환
    return notification.getInfo();
  }

  /**
   * 알림 전송
   * @param {string} id - 알림 ID
   * @returns {object} - 전송된 알림 정보
   */
  async sendNotification(id) {
    const notification = this.notifications.find(n => n.id === id);
    
    if (!notification) {
      throw new Error(`ID가 ${id}인 알림을 찾을 수 없습니다`);
    }
    
    try {
      // 알림 전송 (각 알림 유형별 구현에 위임)
      await notification.send();
      
      // 전송된 알림 정보 반환
      return notification.getInfo();
    } catch (error) {
      // 에러 발생 시 알림 상태 변경은 notification 객체 내에서 처리
      throw error;
    }
  }

  /**
   * 알림 목록 조회
   * @param {string} type - 알림 유형 (선택 사항)
   * @param {string} status - 알림 상태 (선택 사항)
   * @returns {array} - 알림 정보 목록
   */
  getNotifications(type, status) {
    let filtered = [...this.notifications];
    
    if (type) {
      filtered = filtered.filter(n => n.type === type);
    }
    
    if (status) {
      filtered = filtered.filter(n => n.status === status);
    }
    
    // 알림 정보만 반환
    return filtered.map(notification => notification.getInfo());
  }
  
  /**
   * 등록된 알림 유형 목록 조회
   * @returns {string[]} - 등록된 알림 유형 목록
   */
  getRegisteredNotificationTypes() {
    return this.factory.getRegisteredTypes();
  }
}

export default NotificationManager;