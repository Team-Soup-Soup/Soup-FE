## Soup: Student & Project

### 웹 애플리케이션 레포지토리입니다.

### Structure

**FSD** 아키텍처를 적용하였습니다.

```plain text
src/
│
├── app/                   // 엔트리 포인트 및 글로벌 설정
│   ├── index.tsx
│   ├── App.tsx
│   └── providers/         // 리덕스, 라우터, i18n 등 글로벌 상태 관리 및 설정
│
├── pages/                 // 라우팅 단위의 페이지 컴포넌트
│   ├── HomePage/
│   │   ├── index.tsx
│   │   └── ui/
│   │       └── HomePageLayout.tsx
│   └── DetailPage/
│       ├── index.tsx
│       └── ui/
│           └── DetailPageLayout.tsx
│
├── widgets/               // 여러 Feature를 조합한 UI 블록
│   └── Header/
│       ├── index.tsx
│       ├── model/
│       │   └── useHeader.ts
│       └── ui/
│           └── Header.tsx
│
├── features/              // 특정 기능 담당 모듈
│   └── SearchBar/
│       ├── index.tsx
│       ├── model/
│       │   ├── useSearch.ts
│       │   └── searchSlice.ts
│       └── ui/
│           └── SearchBar.tsx
│
├── entities/              // 도메인 객체 및 관련 로직
│   └── Product/
│       ├── index.ts
│       ├── model/
│       │   └── useProduct.ts
│       └── ui/
│           └── ProductCard.tsx
│
└── shared/                // 공용 UI 컴포넌트, 스타일, 유틸리티
    ├── ui/
    │   └── Button.tsx
    ├── lib/
    │   └── api.ts
    └── config/
        └── constants.ts
```
