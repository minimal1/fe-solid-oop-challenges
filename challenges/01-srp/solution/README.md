# 단일 책임 원칙(SRP) 해결책

이 해결책은 원래의 `UserProfile` 컴포넌트를 다음과 같이 여러 작은 모듈로 분리했습니다:

## 디렉토리 구조

```
/solution
  ├── api/
  │   └── userService.js         # API 통신 로직
  ├── hooks/
  │   ├── useAuth.js             # 인증 관련 로직
  │   ├── useUser.js             # 사용자 데이터 관리 로직
  │   └── useForm.js             # 폼 상태 관리 로직
  ├── components/
  │   ├── UserProfileView.js     # 프로필 정보 표시 UI
  │   ├── UserProfileForm.js     # 프로필 편집 UI
  │   ├── ErrorMessage.js        # 오류 메시지 UI
  │   └── Loading.js             # 로딩 상태 UI
  ├── validators/
  │   └── profileValidator.js    # 프로필 유효성 검증 로직
  └── UserProfile.js             # 메인 컴포넌트 (조합)
```

## SRP 적용 방법

1. **관심사 분리**:
   - 데이터 패칭 로직, 인증 로직, 폼 상태 관리, UI 렌더링을 분리했습니다.

2. **재사용 가능한 모듈**:
   - `useAuth`, `useUser`, `useForm` 등의 커스텀 훅을 통해 상태 관리 로직을 재사용 가능하게 만들었습니다.

3. **집중된 컴포넌트**:
   - 각 컴포넌트는 한 가지 목적에만 집중합니다 (예: `UserProfileView`는 데이터 표시만 담당).

4. **명확한 책임**:
   - `userService.js`: API 통신을 담당
   - `profileValidator.js`: 데이터 유효성 검증을 담당
   - `UserProfileForm.js`: 폼 UI 표시 및 사용자 입력 처리를 담당

이렇게 분리함으로써 코드의 가독성, 유지보수성, 테스트 용이성이 향상되었습니다.

## 사용 방법

메인 `UserProfile` 컴포넌트는 이제 다른 모듈들을 조합하는 역할만 담당합니다. 이로써 컴포넌트의 복잡성이 크게 감소했으며, 단일 책임 원칙을 준수하게 되었습니다.