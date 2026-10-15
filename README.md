# 주니어 개발자 오신희 포트폴리오

프로젝트 case study와 공부·실험·디버깅 기록을 연결하는 개인 개발 허브입니다.
Astro 정적 출력과 Markdown Content Collections를 사용합니다.

## 현재 단계

P0 화면과 콘텐츠 경로를 구현했습니다. Home, Projects 갤러리와 상세, Blog 목록과 상세,
404를 사용할 수 있습니다. 공통 메뉴는 Home / Projects / Blog / GitHub입니다.
About 페이지 파일은 보존하며 헤더와 푸터 메뉴에서는 제외했습니다.
Project↔Blog 연결, 목차, 읽기 시간, 코드 강조,
테마 전환과 기본 페이지 metadata도 포함했습니다.
RSS/sitemap, category filtering과 검색은 후속 단계입니다.

현재 공개 대상 콘텐츠는 ‘Arduino 기반 스마트 주차장’ 프로젝트 1개와 실제 개발 기록 1편입니다.
프로젝트 파일은 `src/content/projects/arduino-smart-parking.md`이며,
상세 경로는 `/projects/arduino-smart-parking/`입니다. 팀 최종 저장소의 README와
시스템 설명서를 바탕으로 구조, 입차 흐름, 통신 설계와 문서에 기록된 이슈를 정리했습니다.
기간(2026.08.13–08.28), 인원(5명), 개인 기여는 본인이 확인한 내용을 반영했습니다.
개인 기여는 주차 로직 설계, 다중 Arduino 식별·통합, 서보 제어 안정화 검토와 발표입니다.
팀원별 PC에서 개별 시험하던 구성을 단일 서버에 연결하는 과정에서 보드별 장치 식별자(`DEVICE_ID`) 설정과
펌웨어 업로드를 수행했다는 본인 확인을 반영했습니다. 공통 전원으로 다섯 대를 구동한
실제 하드웨어 모형의 구현·시연 범위이며, 현장 설치·운영 경험으로 표현하지 않습니다.
최종 코드의 `DEVICE_ID`(`P1`~`P5`), 서버의 `devid`, 상태 프레임과 명령 대상 조회를 확인해
프로젝트의 통신 설명에 반영했습니다. 팀 전체 구현 구조와 본인의 참여 범위는 구분합니다.
팀 발표자료의 실제 모형 사진을 결과 자료로 포함했습니다. 시연 영상과 반복 시험 결과는 추가 확인이 필요합니다.
최종 시연에서 전체 주차 흐름이 원활하게 동작했고 서보 떨림이 나타나지 않았다는 본인 확인을 반영했습니다.
Smart Parking thumbnail은 문서에 근거해 작성한 SVG 구성도이며 실제 장치 사진이 아닙니다.

Air Canvas·YOLO 프로젝트와 초기 Sample 블로그 글 3개는 `draft: true`로 보존합니다.
작성 템플릿 2개도 비공개입니다. 첫 공개 글은 `arduino-multi-board-integration.md`이며,
본인이 확인한 다중 Arduino 통합 과정과 팀 최종 코드의 장치 식별 흐름을 구분해 정리했습니다.
이 글의 날짜는 프로젝트 수행일이 아닌 회고 글의 작성일입니다.
확인한 실제 본문과 이미지를 넣은 뒤 `sample: false`, `draft: false`로 공개합니다.
`site.url`은 확정한 배포 주소인 `https://chipmunk-git.github.io`로 설정했습니다.
공개 대상 페이지는 검색 엔진 색인을 허용하며 Sample 상세 페이지와 404는 `noindex`로 표시합니다.

Node.js 24용 설정과 `package-lock.json`이 있습니다. 콘텐츠나 설정을 변경한 뒤에는
`npm run build`로 타입, 빌드, 내부 링크를 다시 확인합니다.
로컬 Git 저장소의 현재 브랜치는 `master`입니다. remote와 commit은 없습니다.

## Tech Stack

- Astro 7.3.5: 서버 없는 정적 HTML 빌드
- TypeScript: strict 설정
- npm: `package-lock.json`을 포함해 의존성 버전 관리
- Astro 기본 Markdown 처리와 Shiki syntax highlighting
- Node.js 24 LTS: `.nvmrc`에 실행 버전 지정

## Directory Structure

```text
src/
  config/site.ts        사이트와 배포 URL의 공통 설정
  config/profile.ts     본인 정보·학력·자격증·교육·병역·Skills·활동
  content.config.ts     Project / Blog front matter 스키마
  content/projects/     프로젝트 Markdown
  content/blog/         기술 기록 Markdown
  assets/projects/     프로젝트 사진·결과·구조도
  assets/blog/         글 이미지
  lib/content.ts        공개 콘텐츠와 양방향 관계 조회
  lib/urls.ts           base를 반영하는 내부 경로·절대 URL
  components/          Header, Footer, Card, Metadata, TOC, 테마 변경
  layouts/             공통, Project, Blog 상세 layout
  styles/              공통 반응형 스타일과 Markdown 본문 스타일
  pages/
    index.astro         Home
    projects/           갤러리와 [...id].astro 상세 route
    blog/               목록과 [...id].astro 상세 route
    about.astro
    404.astro
public/favicon.svg
scripts/check-links.mjs  빌드 결과의 링크·자산·목차 검사
.github/workflows/deploy.yml
astro.config.ts         정적 빌드·코드 강조 설정
```

참고 PDF는 이 저장소 밖의 `../reference-materials/portfolio-examples/`에 유지합니다.
PDF의 개인정보나 다른 사람의 프로젝트 내용을 콘텐츠에 복사하지 않습니다.

## Page Structure

- Home: 소개·프로필 사진 자리·Projects/Blog 바로가기 → 프로필 → 학력·자격증·교육·병역·기술 → Projects → Blog
- Projects: 이미지, 설명, 기술, 기간·유형·참여 범위가 있는 갤러리
- Project 상세: 제목·요약 → metadata → 접을 수 있는 목차 → Markdown 본문
- Blog: 공개 글 목록 → 글 상세 → 관련 프로젝트

헤더와 푸터는 `site.navigation`의 같은 항목과 순서를 사용합니다.
Home의 Projects와 Blog에는 각각 해당 목록으로 이동하는 ‘전체 보기’ 링크가 있습니다.
‘기술’에는 카테고리별 기술명만 표시합니다. 기술별 경험 설명, 활동, Currently Learning은
현재 표시하지 않으며 관련 데이터는 설정 파일에 보존합니다.

프로젝트 본문은 개요, 개인 참여 범위, 시스템 구성, 기술 선택, 주요 구현, 문제 해결,
결과와 회고 순서로 작성할 수 있습니다. 확인한 내용이 없는 항목은 생략합니다.
사진·구성도·실행 화면은 해당 내용을 설명하는 본문 위치에 넣습니다.
Blog와 About의 경로와 콘텐츠 관리 방식은 유지합니다.

## Edit Profile

### 프로필 사진

Home 제목 아래에 왼쪽 원형 사진과 오른쪽 소개를 배치했습니다.
모바일에서도 사진과 소개를 나란히 두고 사진 크기를 줄입니다. 링크는 그 아래에 표시합니다.
사진이 없을 때는 ‘프로필 사진 준비 중’이라는 임시 표시를 보여 줍니다.
현재는 본인 선택에 따라 사진 자리를 유지합니다.

사진을 `src/assets/profile/portrait.jpg`에 추가한 뒤 `src/config/profile.ts` 상단에
`import portrait from '../assets/profile/portrait.jpg';`를 추가하고,
`photo: undefined`를 `photo: { src: portrait, alt: '본인 프로필 사진' }`로 바꿉니다.
PNG도 같은 방식으로 사용할 수 있습니다. 사진은 원형 프레임에 맞춰 가운데를 기준으로 잘립니다.

### 이력 내용

Home의 이력 항목은 `src/config/profile.ts` 한 파일에서 관리합니다.
`birthDate`, `email`은 문자열로 입력하며, 나머지 항목은 배열에 아래 형태의 객체를 추가합니다.

```ts
{
  title: '항목 이름',
  organization: '학교·발급 기관·교육 기관·활동 기관', // 선택
  period: '실제 기간 또는 취득 시기', // 선택
  description: '확인된 내용 또는 직접 한 일', // 선택
}
```

배열 이름은 `education`(학력), `certifications`(자격증), `training`(교육),
`military`(병역), `skills`(Skills), `activities`(활동)입니다.
Skills의 기술명은 줄바꿈되는 라벨로 표시합니다. `description`은 사용 경험을 보관하는 필드이며,
현재 화면에는 표시하지 않습니다. 다시 표시하려면 본인 의사를 확인한 뒤 컴포넌트를 수정합니다.
Skills 항목에는 `category`를 함께 적습니다. 같은 카테고리끼리 자동으로 묶으며,
카테고리와 기술의 표시 순서는 `skills` 배열에 처음 등장하는 순서입니다.

```ts
{ title: 'Python', category: '프로그래밍 언어' }
```

현재 분류는 임베디드·로보틱스, 프로그래밍 언어, 라이브러리·실행환경,
데이터베이스·캐시, 개발환경·도구, 개발 영역·개념입니다.
기존 사람인에 등록한 기술 10개와 본인이 선택한 Python, Git, Ubuntu, Arduino,
PyQt, ROS2를 합쳐 16개를 표시합니다. C++과 ESP8266은 Skills에서 제외했습니다.
사용 경험에는 직접 사용·구현·테스트한 사실만 적습니다.
공부 중인 주제는 `site.ts`의 `learning`에 별도로 유지합니다.

제공받은 개인 정보와 학력을 반영했습니다. 자격증·운전면허 3개의 취득 연월과 발급기관을 기재했으며, 연월은 `YYYY.MM` 형식으로 표시합니다.
드론 자격의 세부 종류, 교육의 정식 과정명, 병역과 복무 기간도 본인 확인을 반영했습니다.
교육 기간은 본인이 확인한 `2026.07 – 2027.01`을 반영했습니다. 수강·수료 상태는 별도로 표시하지 않습니다.
활동과 Currently Learning은 현재 표시하지 않습니다.
Arduino의 `description`에는 주차 로직 설계, 장치 식별자(`DEVICE_ID`) 설정과 펌웨어 업로드를 통한
보드 통합, 서보 제어 안정화 검토 내용을 보관합니다. 이 설명도 화면에는 표시하지 않습니다.
파일별 코드 작성 범위와 구체적인 시험 결과는 별도 확인이 필요합니다.
표시 중인 이력 항목이 비어 있으면 ‘입력 예정’이 나올 수 있으므로 공개 전에 확인합니다.

## Local Development

먼저 터미널에서 환경을 확인합니다.

```sh
node --version
npm --version
git --version
xcode-select -p
```

Node.js가 없으면 [공식 다운로드](https://nodejs.org/en/download)에서 macOS용
Node.js 24 LTS를 설치합니다. 기존 nvm을 사용하는 경우에는 사이트 폴더에서
`nvm install`과 `nvm use`로 `.nvmrc`의 버전을 선택할 수 있습니다.

Git이나 developer directory에 실제 문제가 있는 경우 Command Line Tools를 확인합니다.
일반 터미널에서도 설치가 없는 것으로 확인된다면 `xcode-select --install`을 사용합니다.
샌드박스 접근 오류만으로 재설치하지 않습니다.

사이트 폴더에서 실행합니다.

```sh
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:4321/`입니다. Project Pages용 base를 설정했다면
터미널에 표시된 base 포함 주소를 사용합니다.

검증과 production preview:

```sh
npm run build
npm run preview -- --port 4322
```

`build`는 타입 검사 → 정적 빌드 → 내부 링크/자산/목차 검사를 실행합니다.
preview는 빌드된 `dist/`를 확인하는 서버입니다. 위 명령은 개발 서버를 유지하면서
`http://localhost:4322/`에서 확인할 수 있도록 포트를 지정합니다.
타입 검사만 실행하려면 `npm run check`를 사용합니다.
기존 빌드 결과의 링크만 검사하려면 `npm run check:links`를 사용합니다.
생성된 lockfile을 버전 관리에 포함하고 이후에는 `npm ci`로 설치합니다.
lockfile은 실제 설치 결과로 생성하며 수작업으로 작성하지 않습니다.

### esbuild 설치 스크립트 경고

최초 `npm install`에서 esbuild의 postinstall이 승인되지 않았다는 경고가 있었습니다.
이 경고만으로 Node.js나 npm을 업데이트할 필요는 없습니다.
향후 binary 관련 오류가 발생하면 해당 패키지의 설치 상태와 스크립트를 확인합니다.

## Add Blog Post

`src/content/blog/<id>.md`를 추가합니다. `sample-note.md`를 복사해 시작할 수 있습니다.
파일 이름은 영문 소문자와 하이픈을 권장합니다.

```yaml
---
title: '실제 기록 제목'
description: '무엇을 확인한 기록인지 짧게 설명'
date: 2026-10-05 # 예시: 실제 작성 날짜로 변경
tags: []
draft: true
---
```

`category`는 없어도 됩니다. 관련 프로젝트가 있으면 `project: <프로젝트 파일명>`을
추가합니다. `.md` 확장자를 제외한 ID를 사용합니다.
본문은 일반 Markdown heading, 코드 블록, 표, 인용문으로 작성합니다.
실제 내용과 날짜를 확인한 뒤 `draft: false`로 변경합니다.

## Add Project

`src/content/projects/<id>.md`를 추가합니다. `sample-project.md`의 구조를 참고합니다.

```yaml
---
title: '실제 프로젝트 제목'
description: '만든 것과 범위를 한 문장으로 설명'
stack: []
role: []
featured: false
draft: true
---
```

기간, 팀 규모, 담당 역할, 결과는 확인한 내용만 넣습니다.
팀 프로젝트의 개인 기여는 `나의 참여 범위`에서 별도로 설명합니다.
모든 section을 채울 필요는 없으며 불필요한 section은 삭제합니다.

`draft: false`인 Markdown은 목록과 상세에 자동 반영됩니다.
Home에는 `featured: true`인 Project를 최대 4개, 공개 글이 있으면 최근 Blog 글을 최대 3개 표시합니다.
글의 `project` 참조만으로 Project 상세의 Related Posts와 Blog 상세의 Related Project를
함께 생성합니다. 실제 콘텐츠로 교체할 때는 `sample: false`로 지정하고 예시 안내문도 삭제합니다.

프로젝트를 비공개로 바꿀 때는 연결된 공개 글도 함께 검토합니다.
공개 글이 `draft` 프로젝트를 참조하면 빌드가 실패하도록 검증합니다.
`noindex`는 비공개 설정이 아닙니다. 목록과 상세 HTML 생성에서 제외하려면 `draft: true`를 사용합니다.

## Add Image

- Project: `src/assets/projects/<project-id>/`
- Blog: `src/assets/blog/<post-id>/`

`src/content/projects/<id>.md` 또는 `src/content/blog/<id>.md`에서 상대 경로로 참조합니다.

```md
![사진에서 확인할 수 있는 장치와 연결을 설명](../../assets/projects/<project-id>/hardware.jpg)

*Figure 1. 실제 촬영 조건과 이미지에서 확인할 내용.*
```

이 코드는 경로 예시이며 해당 이미지 파일은 제공하지 않습니다.
사진이 없으면 이미지 문법과 thumbnail 필드를 생략합니다.
실제 이미지 대신 생성한 이미지를 실행 결과처럼 사용하지 않습니다.
단순 구조도는 SVG 파일로 관리할 수 있습니다.

대표 이미지는 front matter에 `thumbnail`과 `thumbnailAlt`를 함께 작성합니다.
thumbnail은 갤러리용입니다. 상세 페이지에는 위 Markdown 문법으로 필요한 위치에 이미지를 넣습니다.
상대 경로 기준은 해당 Markdown 파일입니다. 본문 이미지에도 alt text를 작성합니다.
`src/assets/` 이미지는 Astro 처리 경로를 사용하고, public 자산은 `withBase()`로 연결합니다.

## Configuration

`src/config/site.ts`에서 다음을 관리합니다.

- title / displayName / description / 선택적인 author
- url / base
- 선택적인 githubUrl / socialLinks
- hero / navigation / language / learning / interests

GitHub 프로필은 제공받은 `https://github.com/chipmunk-git`로 설정했습니다.
배포 대상 저장소는 `https://github.com/chipmunk-git/chipmunk-git.github.io`입니다.
해당 저장소가 비어 있는 상태로 존재함을 확인했습니다.
사이트 주소는 `https://chipmunk-git.github.io`, `base`는 `/`로 설정했습니다.
설정한 주소에 실제 사이트가 공개되려면 원격 연결, push와 Pages 배포가 필요합니다.

| 형태 | url | base |
| --- | --- | --- |
| User Pages | `https://<username>.github.io` | `/` |
| Project Pages | `https://<username>.github.io` | `/<repository>/` |

`url`에는 사이트 origin을 넣고 repository 경로는 `base`에만 넣습니다.
내부 route나 public 자산에는 `src/lib/urls.ts`의 `withBase()`를 사용합니다.
canonical이나 feed URL에는 `absoluteUrl()`를 사용합니다.
각 환경에서 root와 subpath production build를 모두 검증한 뒤 배포합니다.

테스트나 CI에서는 `SITE_URL`과 `SITE_BASE` 환경 변수로 해당 값을 덮어쓸 수 있습니다.
macOS에서 Project Pages 경로를 점검하는 예:

```sh
SITE_BASE=/repository/ npm run build
SITE_BASE=/repository/ npm run preview
```

표시 이름은 `displayName`, 본문과 SEO의 작성자는 선택적인 `author`에서 관리합니다.
GitHub URL이 설정되지 않으면 관련 버튼을 표시하지 않습니다.

## Deployment

`.github/workflows/deploy.yml`이 타입 검사, production build, 링크 검사를 수행한 뒤
GitHub Pages artifact를 배포합니다. Pull request에서는 build만 실행합니다.
`master` push 또는 수동 실행에서 배포하며 다른 배포 branch를 쓰면 workflow도 변경합니다.

배포 전 준비:

1. `site.ts`의 URL, base와 GitHub 링크 확인 (현재 User Pages 값 설정 완료)
2. 확정한 `chipmunk-git/chipmunk-git.github.io` 저장소를 remote로 연결
3. GitHub 저장소 Settings → Pages → Source: GitHub Actions 설정
4. 요청된 변경을 commit/push한 뒤 Actions 결과 확인

아직 원격 저장소에서 workflow를 실행하거나 사이트를 배포하지 않았습니다.

로컬 저장소의 현재 브랜치는 `master`입니다. remote는 아직 연결하지 않았습니다.
연결할 origin 주소는 `https://github.com/chipmunk-git/chipmunk-git.github.io.git`입니다.
원격 연결에는 다음 명령을 사용합니다.

```sh
git remote add origin https://github.com/chipmunk-git/chipmunk-git.github.io.git
git remote -v
```

commit과 push는 사용자가 명시적으로 요청한 경우에만 수행합니다.

## Content Front Matter

공통 필드:

| 필드 | 규칙 |
| --- | --- |
| title / description | 필수, 빈 문자열 불가 |
| draft | 생략하면 `true`; 명시적으로 `false`를 지정해야 공개 대상 |
| sample | 기본 `false`; 제공된 예시는 `true` |
| thumbnail | 선택, Markdown 기준 로컬 이미지 경로 |
| thumbnailAlt | thumbnail이 있으면 필수 |

Project 필드:

| 필드 | 규칙 |
| --- | --- |
| date / period | 선택; date는 정렬용 날짜, period는 실제 기간 문자열 |
| type | 선택: `personal`, `team` |
| team | 선택: 양의 정수 |
| role / stack | 문자열 배열, 기본 빈 배열 |
| category | 선택, 자유 문자열 |
| repository | 선택, HTTP(S) URL |
| featured | 기본 `false` |
| status | 선택: `completed`, `in-progress`, `experiment` |

Blog 필드:

| 필드 | 규칙 |
| --- | --- |
| date | 필수 날짜 |
| updated | 선택; date보다 이전일 수 없음 |
| category | 선택, 자유 문자열 |
| tags | 문자열 배열, 기본 빈 배열 |
| project | 선택, projects collection의 ID |

YAML 날짜는 `YYYY-MM-DD` 형식을 사용합니다.
`sample-project.md`와 `sample-note.md`는 비공개 작성 템플릿입니다.
‘Arduino 기반 스마트 주차장’은 팀 최종 저장소 문서, 본인 확인 내용과 팀 발표자료에 근거한 공개 콘텐츠입니다.
`hardware-front.jpg`와 `hardware-back.jpg`는 제공받은 발표자료에 포함된 실제 모형 사진입니다.
발표자료의 팀 전체 구현 설명과 개인 기여를 구분했습니다. 서보 항목에는 원인 가설,
검토한 제어 방법과 본인이 확인한 최종 시연 결과를 구분하여 기재했습니다.
나머지 프로젝트 2개와 블로그 글 3개는 화면 검증용 Sample이며 초안 상태로 보존합니다.

공개 콘텐츠는 `getPublishedContent()`로 조회합니다. 존재하지 않는 프로젝트 참조와
공개 글에서 초안 프로젝트를 참조하는 경우에는 오류를 냅니다.
프로젝트의 관련 글은 `postsForProject()`, 글의 관련 프로젝트는 `projectForPost()`로
같은 참조에서 조회합니다. `relatedPosts`를 중복 관리하지 않습니다.

## 아직 확인할 항목

- 확정한 사이트 URL과 base가 production build에 반영되는지 확인
- 최근 변경 후 `npm run build` 성공과 내부 링크 검사 결과
- production preview의 페이지·이미지·목차·모바일·테마 전환
- 사이트용 remote 연결과 GitHub Pages workflow 실행 결과
- 최종 공개 URL에서 페이지·이미지·링크·404·metadata 확인
- 파일별 개인 코드 작성 범위, 시연 영상과 구체적인 시험 결과 확인

## Reference Principles

참고 PDF의 페이지 이미지를 직접 확인해 아래 구조를 참고했습니다.

- 3-1: 이미지 중심 프로젝트 갤러리와 큰 실행 화면
- 3-2: 목표, 대안 비교와 선택 이유, 개인 역할, 기술 이슈, 회고
- 3-3: 상단 metadata, 한 장의 architecture, 데이터 처리와 결과의 연결

개인정보, 프로젝트 내용, 성과, 문장과 이미지는 가져오지 않았습니다.
추출한 참고 이미지는 검토용 임시 경로에만 두고 사이트나 Git 저장소에 포함하지 않았습니다.
