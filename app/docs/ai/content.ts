// "AI로 설치하기" 페이지 글·프롬프트. 문구를 고칠 때는 이 파일만 연다.

export const VERSION = "0.1.0"

// 배포 때 워크플로가 NEXT_PUBLIC_REGISTRY_BASE를 넣는다. 로컬은 미리보기 주소.
export const REGISTRY_BASE = process.env.NEXT_PUBLIC_REGISTRY_BASE ?? "https://xowns956-boop.github.io/mic-registry"

export const itemUrl = (name: string) => `${REGISTRY_BASE}/r/${VERSION}/${name}.json`

export const installCommand = `npx shadcn@latest add ${itemUrl("mic-foundations")} ${itemUrl("mic")}`

export const rulesBlock = `## Design system: Mic v${VERSION}

사용자가 "디자인 시스템 써", "Mic 써", "Mic 디자인 시스템 써", "use the design system"이라고 하면 docs/mic.md를 먼저 읽고 그 규칙대로 만든다.

- 설치된 부품(\`components/ui\`, \`components/blocks\`)만 조립한다. Mic에 없는 부품은 새로 만들지 말고 없다고 알린다.
- 색·간격·둥글기는 토큰 클래스만 쓴다. hex·px 값을 직접 쓰지 않는다.
- 새 화면은 \`app/<이름>/page.tsx\`로 만들고, 라이트/다크를 바꿔 볼 수 있게 테마 전환 버튼을 둔다.
- 부품 파일(\`components/\`)은 고치지 않는다. 고쳐야 하면 먼저 알린다.`

export const setupPrompt = `Mic 디자인 시스템(v${VERSION})을 이 프로젝트에 설치해 줘.
나는 개발을 잘 모르니까 필요한 건 알아서 진행하고, 끝나면 쉬운 말로 알려 줘.

## 1. 프로젝트 확인
- 이 폴더에 package.json이 없으면: Next.js(App Router · TypeScript · Tailwind CSS v4 · ESLint, src 폴더 없이) 프로젝트를 이 폴더에 새로 만들고 \`npx shadcn@latest init\`으로 shadcn을 초기화해. 아이콘은 lucide.
- React + Tailwind CSS v4 프로젝트인데 components.json이 없으면 \`npx shadcn@latest init\`만 해.
- Tailwind CSS v3 이하이거나 React 프로젝트가 아니면 설치하지 말고, 왜 안 되는지 알려 줘.
- Node.js가 없어서 npx가 안 되면 멈추고, https://nodejs.org 에서 LTS 버전을 설치하라고 알려 줘.

## 2. 설치
아래 명령을 그대로 실행해. mic-foundations(색·글자 토큰)는 꼭 같이 설치해야 해.

${installCommand}

- 기존 파일을 덮어쓸지 물어보면: shadcn 기본 상태 그대로인 파일은 덮어써도 돼. 누가 손댄 흔적이 있는 파일이면 덮어쓰기 전에 나한테 물어봐.

## 3. 앱에 연결
app/layout.tsx를 이렇게 맞춰 줘.
- <html lang="ko" suppressHydrationWarning>
- <body className="bg-page-background text-foreground">
- 화면 전체를 ThemeProvider(@/components/theme-provider) → TooltipProvider(@/components/ui/tooltip) 순서로 감싸고, 그 안 맨 아래에 <Toaster />(@/components/ui/sonner)를 둬.

## 4. AI 규칙 저장
프로젝트 맨 위 CLAUDE.md에 아래 블록을 추가해 줘(없으면 파일을 만들어). AGENTS.md가 있으면 거기에도 똑같이 추가해.

${rulesBlock}

## 5. 확인 화면
app/mic-check/page.tsx에 확인용 화면을 만들어 줘. Mic 부품만 써서:
- PageHeading(제목 "Mic 설치 확인") + 테마 전환 버튼(해/달 아이콘)
- Card 안에 주 버튼 1개, outline 버튼 1개, Badge 1개
그다음 개발 서버를 켜고 열어 볼 주소(예: http://localhost:3000/mic-check)를 알려 줘.

## 6. 끝나면 알려 줄 것
- 무엇을 설치·변경했는지 3줄 이내로
- 앞으로 이렇게 말하면 된다는 예시 2개 (예: "Mic 써서 설정 화면 만들어 줘")`

export const steps = [
  {
    title: "AI 도구로 프로젝트 폴더 열기",
    body: "Claude Code·Cursor 같은 AI 도구에서 작업할 폴더를 열어요. 아무것도 없는 빈 폴더여도 괜찮아요. AI가 프로젝트부터 만들어요.",
  },
  {
    title: "설치 프롬프트 붙여넣기",
    body: "위 버튼으로 복사한 글을 AI 채팅창에 그대로 붙여넣고 보내요. 파일 수정·설치 허락을 물어보면 허용해요.",
  },
  {
    title: "확인 화면 열어 보기",
    body: "AI가 알려 준 주소(예: localhost:3000/mic-check)를 브라우저에서 열어요. 버튼과 카드가 보이고 해/달 버튼으로 색이 바뀌면 설치 끝이에요.",
  },
]

export const examples = [
  "Mic 써서 회원 목록 화면 만들어 줘. 검색칸, 표, 등록 버튼이 있으면 돼.",
  "Mic 써서 이 이미지처럼 대시보드 만들어 줘. (이미지 첨부)",
  "Mic 써서 설정 화면 만들어 줘. 알림 켜기/끄기 스위치랑 저장 버튼이 있어야 해.",
]

export const faqs = [
  {
    q: "“npx를 찾을 수 없다”고 나와요",
    a: "Node.js가 설치되지 않은 상태예요. nodejs.org에서 LTS 버전을 받아 설치한 뒤, AI 도구를 껐다 켜고 프롬프트를 다시 보내요.",
  },
  {
    q: "설치했는데 색이 기본 검정·회색이에요",
    a: "mic-foundations(토큰)가 빠진 경우예요. AI에게 “mic-foundations.json도 설치해 줘”라고 말해요.",
  },
  {
    q: "“파일을 덮어쓸까요?”라고 물어봐요",
    a: "처음 만든 프로젝트라면 덮어써도 괜찮아요. 이미 누가 고친 화면·부품이 있는 프로젝트라면 개발자에게 먼저 물어봐요.",
  },
  {
    q: "localhost 주소를 다른 사람에게 보냈는데 안 열린대요",
    a: "localhost는 내 컴퓨터 안에서만 열리는 주소예요. 다른 사람에게 보여 주려면 배포(Vercel 등)가 필요해요.",
  },
  {
    q: "“Tailwind v3라서 안 된다”고 해요",
    a: "Mic는 Tailwind CSS v4 전용이에요. 기존 프로젝트를 올리는 건 개발자와 상의하고, 연습용이면 빈 폴더에서 새로 시작해요.",
  },
]

export const componentGroups = [
  { name: "버튼", items: ["Button", "Button Group", "Menu Tile", "Toggle", "Toggle Group"] },
  { name: "입력", items: ["Input", "Textarea", "Input Group", "Number Input", "Number Stepper", "Checkbox", "Radio Group", "Switch", "Label", "Field"] },
  { name: "선택", items: ["Select", "Dropdown Menu", "Autocomplete", "Multi Select", "Combobox", "Command", "Date Picker", "Calendar"] },
  { name: "표시", items: ["Badge", "Avatar", "Tooltip", "Separator", "Skeleton", "Spinner", "Progress", "Kbd", "Alert", "Toast"] },
  { name: "카드·표·차트", items: ["Card", "Stat Card", "Table", "Data Table", "Form Table", "Chart", "Chart Presets"] },
  { name: "팝업", items: ["Dialog", "Alert Dialog", "Dialog Body", "Sheet", "Popover"] },
  { name: "이동", items: ["Sidebar", "Sidebar Brand", "Nav User", "Tabs", "Page Tabs", "Breadcrumb", "Pagination", "Stepper", "Tree", "Filter Chip", "Accordion", "Toolbar"] },
  { name: "화면 패턴", items: ["Site Header", "Page Heading", "Filter Bar", "Form Action Bar"] },
]
