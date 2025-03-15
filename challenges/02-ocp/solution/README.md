# 개방-폐쇄 원칙(OCP) 해결책

이 해결책은 전략 패턴(Strategy Pattern)과 팩토리 패턴(Factory Pattern)을 사용하여 `NotificationManager` 클래스를 리팩토링했습니다.

## 디렉토리 구조

```
/solution
  ├── notifications/
  │   ├── BaseNotification.js         # 기본 알림 클래스 (추상 클래스 역할)
  │   ├── EmailNotification.js        # 이메일 알림 클래스
  │   ├── SMSNotification.js          # SMS 알림 클래스
  │   ├── PushNotification.js         # 푸시 알림 클래스
  │   └── SlackNotification.js        # Slack 알림 클래스
  ├── factories/
  │   └── NotificationFactory.js      # 알림 객체 생성 팩토리
  └── NotificationManager.js          # 리팩토링된 알림 관리자
```

## OCP 적용 방법

1. **추상화와 인터페이스**:
   - `BaseNotification` 추상 클래스를 만들어 모든 알림 유형에 공통된 인터페이스를 정의했습니다.
   - 각 알림 유형은 이 기본 클래스를 상속받아 자신만의 특정 동작을 구현합니다.

2. **팩토리 패턴**:
   - `NotificationFactory`를 도입하여 알림 객체 생성 로직을 분리했습니다.
   - 새로운 알림 유형을 추가할 때 기존 코드를 수정하지 않고 팩토리에 등록하기만 하면 됩니다.

3. **전략 패턴**:
   - 각 알림 유형을 전략(Strategy)으로 구현하여 다양한 알림 전송 방식을 캡슐화했습니다.
   - `NotificationManager`는 이제 구체적인 알림 구현에 의존하지 않고, 인터페이스에만 의존합니다.

4. **플러그인 시스템**:
   - 외부에서 새로운 알림 유형을 등록할 수 있는 메커니즘을 제공합니다.
   - `registerNotificationType` 메서드를 통해 런타임에 새로운 알림 유형을 추가할 수 있습니다.

## OCP 준수 방법

1. **확장에 열려 있음**:
   - 새로운 알림 유형을 추가하려면 `BaseNotification`을 상속한 새 클래스를 만들고 팩토리에 등록하기만 하면 됩니다.
   - `NotificationManager` 클래스를 수정할 필요가 없습니다.

2. **수정에 닫혀 있음**:
   - 기존 코드를 수정하지 않고도 새로운 알림 유형이나 기능을 추가할 수 있습니다.
   - 각 알림 유형 클래스는 단일 책임을 가지므로 한 클래스의 변경이 다른 클래스에 영향을 미치지 않습니다.

## 사용 예시

```javascript
// 새로운 알림 유형 추가
class WebhookNotification extends BaseNotification {
  validate(data) {
    if (!data.url || !data.payload) {
      throw new Error('Webhook 알림은 URL과 페이로드가 필요합니다');
    }
  }
  
  createNotificationData(data) {
    return {
      url: data.url,
      payload: data.payload,
      method: data.method || 'POST'
    };
  }
  
  async send() {
    console.log(`Webhook 호출: ${this.data.url}`);
    // 실제 Webhook 호출 로직
  }
}

// 팩토리에 새 알림 유형 등록
notificationFactory.registerType('webhook', WebhookNotification);

// 이제 NotificationManager는 코드 수정 없이 새로운 알림 유형을 처리할 수 있음
const webhookNotification = notificationManager.createNotification('webhook', {
  url: 'https://example.com/webhook',
  payload: { event: 'user.created' }
});
```