# 넷플릭스 클론코딩 프로젝트

이 프로젝트는 넷플릭스의 기본적인 UI와 기능을 클론한 리액트 기반의 웹 애플리케이션입니다. 넷플릭스의 디자인을 참고하여, 영화 목록을 보고 검색하며 즐겨찾기하는 등의 기능을 제공합니다. 이 프로젝트는 리액트의 주요 개념을 배우고 적용하는 데 중점을 두었습니다.

## 주요 기능

- **홈페이지**: 다양한 영화 리스트와 배너를 제공하며, 마우스를 올리면 상세 정보를 확인할 수 있습니다.
- **영화 검색**: 사용자가 영화 제목을 검색할 수 있는 기능을 제공합니다.
- **즐겨찾기 목록**: 사용자가 마음에 드는 영화를 즐겨찾기에 추가할 수 있습니다.
- **로그인/회원가입**: 로그인 시스템을 통해 사용자 인증을 구현합니다.
- **반응형 디자인**: 데스크탑과 모바일 모두에서 원활하게 동작하는 반응형 UI.

## 사용된 기술

- **React**: UI 구현을 위한 자바스크립트 라이브러리
- **React Router**: 페이지 간 네비게이션을 위한 라우팅 라이브러리
- **CSS**: 스타일링을 위한 스타일 시트
- **LocalStorage**: 사용자 정보를 로컬 저장소에 저장하여 로그인 상태 유지
- **Axios**: 외부 API 요청을 위한 라이브러리 (영화 데이터)

## 설치 방법

1. 이 저장소를 클론합니다.

   ```bash
   git clone https://github.com/SeungjaeLee00/Netflix_cloneCoding.git

   ```

2. 프로젝트 디렉토리로 이동합니다.

   ```bash
   cd Netflix_cloneCoding

   ```

3. 필요한 의존성 패키지를 설치합니다.

   ```bash
   npm install

   ```

4. 개발 서버를 시작합니다.

   ```bash
   npm start

   ```

   웹 브라우저에서 `http://localhost:3000` 주소를 열어 애플리케이션을 확인할 수 있습니다.

## 주요 디렉토리 구조

- `public/`: 웹 애플리케이션에서 사용하는 정적 파일들을 포함한 폴더 (이미지, 아이콘 등)
- `src/`: 리액트 컴포넌트, 스타일 시트, 유틸리티 함수 등이 포함된 폴더
  - `components/`: 재사용 가능한 리액트 컴포넌트들 (예: Header, MovieCard 등)
  - `pages/`: 각 페이지 컴포넌트 (예: HomePage, SearchPage, WishlistPage 등)
  - `styles/`: CSS 파일들

## 사용 방법

1. **로그인 기능**: 로컬 스토리지에 로그인 상태를 저장하여, 페이지를 새로고침해도 로그인 상태가 유지됩니다.
2. **영화 즐겨찾기**: 영화 카드에서 즐겨찾기 버튼을 클릭하면, 해당 영화가 즐겨찾기 목록에 추가됩니다.
3. **검색 기능**: 검색창에 영화 제목을 입력하여 실시간으로 영화 목록을 필터링할 수 있습니다.
4. **반응형 UI**: 데스크탑, 모바일 등 다양한 화면 크기에서 잘 동작하는 디자인을 제공합니다.
