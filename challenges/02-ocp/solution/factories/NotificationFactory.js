import EmailNotification from '../notifications/EmailNotification';
import SMSNotification from '../notifications/SMSNotification';
import PushNotification from '../notifications/PushNotification';
import SlackNotification from '../notifications/SlackNotification';

/**
 * 알림 팩토리 클래스
 * - 알림 객체 생성을 담당
 * - 개방-폐쇄 원칙을 적용하여 새 알림 유형을 추가할 때 기존 코드 수정 없이 확장 가능
 */
class NotificationFactory {
  constructor() {
    // 등록된 알림 타입을 저장하는 맵
    this.notificationTypes = new Map();
    
    // 기본 알림 타입 등록
    this.registerType('email', EmailNotification);
    this.registerType('sms', SMSNotification);
    this.registerType('push', PushNotification);
    this.registerType('slack', SlackNotification);
  }

  /**
   * 새로운 알림 유형 등록
   * @param {string} type - 알림 유형 이름
   * @param {class} notificationClass - 알림 클래스
   */
  registerType(type, notificationClass) {
    if (this.notificationTypes.has(type)) {
      console.warn(`알림 유형 '${type}'은(는) 이미 등록되어 있습니다. 덮어쓰기 됩니다.`);
    }
    
    this.notificationTypes.set(type, notificationClass);
    return this; // 메서드 체이닝 지원
  }

  /**
   * 알림 유형 제거
   * @param {string} type - 알림 유형 이름
   */
  unregisterType(type) {
    if (!this.notificationTypes.has(type)) {
      console.warn(`알림 유형 '${type}'은(는) 등록되어 있지 않습니다.`);
      return false;
    }
    
    this.notificationTypes.delete(type);
    return true;
  }

  /**
   * 알림 객체 생성
   * @param {string} type - 알림 유형
   * @param {object} data - 알림 데이터
   * @returns {BaseNotification} - 생성된 알림 객체
   */
  createNotification(type, data) {
    const NotificationClass = this.notificationTypes.get(type);
    
    if (!NotificationClass) {
      throw new Error(`지원하지 않는 알림 유형입니다: ${type}`);
    }
    
    return new NotificationClass(data);
  }

  /**
   * 등록된 알림 유형 목록 조회
   * @returns {string[]} - 등록된 알림 유형 배열
   */
  getRegisteredTypes() {
    return Array.from(this.notificationTypes.keys());
  }
}

// 싱글톤 인스턴스 생성하여 내보내기
const notificationFactory = new NotificationFactory();
export default notificationFactory;