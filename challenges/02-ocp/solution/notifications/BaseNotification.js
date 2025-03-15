/**
 * 기본 알림 클래스 (추상 클래스 역할)
 * 모든 알림 유형의 공통 인터페이스를 정의
 */
class BaseNotification {
  constructor(data) {
    if (this.constructor === BaseNotification) {
      throw new Error('BaseNotification은 직접 인스턴스화할 수 없는 추상 클래스입니다');
    }
    
    this.id = this._generateId();
    this.type = this.constructor.TYPE || 'base';
    this.createdAt = new Date();
    this.status = 'pending';
    
    // 데이터 유효성 검사
    this.validate(data);
    
    // 알림 유형별 데이터 생성
    this.data = this.createNotificationData(data);
  }

  /**
   * 알림 데이터 유효성 검사 (하위 클래스에서 구현)
   * @param {object} data - 알림 데이터
   */
  validate(data) {
    throw new Error('validate 메서드는 하위 클래스에서 구현해야 합니다');
  }

  /**
   * 알림별 데이터 생성 (하위 클래스에서 구현)
   * @param {object} data - 알림 데이터
   * @returns {object} - 가공된 알림 데이터
   */
  createNotificationData(data) {
    throw new Error('createNotificationData 메서드는 하위 클래스에서 구현해야 합니다');
  }

  /**
   * 알림 전송 (하위 클래스에서 구현)
   */
  async send() {
    throw new Error('send 메서드는 하위 클래스에서 구현해야 합니다');
  }

  /**
   * 알림 상태 정보
   * @returns {object} - 알림 상태 정보
   */
  getInfo() {
    return {
      id: this.id,
      type: this.type,
      data: this.data,
      createdAt: this.createdAt,
      status: this.status,
      sentAt: this.sentAt,
      error: this.error
    };
  }

  /**
   * 고유 ID 생성
   * @private
   */
  _generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}

export default BaseNotification;