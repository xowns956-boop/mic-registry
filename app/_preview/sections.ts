// 미리보기 목차 (레지스트리에 들어가지 않음)
// 왼쪽 메뉴와 검색이 이 목록을 쓴다. batch-*.tsx에 Section을 추가하면 여기에도 같은 id로 추가한다.
// label: 목차·검색에 보이는 한글 대표 이름 / title: 부품 이름(검색어로도 쓰임) / keywords: 그 밖의 검색어

export type PreviewSection = { id: string; label: string; title: string; keywords?: string }

export const PREVIEW_GROUPS: { label: string; items: PreviewSection[] }[] = [
  {
    label: "입력",
    items: [
      { id: "button", label: "버튼", title: "Button · ButtonGroup · MenuTile", keywords: "버튼 버튼그룹 눌림 pressed 메뉴 타일 태블릿" },
      { id: "input", label: "입력칸", title: "Input · Textarea · InputGroup · NumberInput · NumberStepper", keywords: "입력 텍스트 숫자 증감 스테퍼" },
      { id: "select", label: "선택 목록", title: "Select · DropdownMenu · Autocomplete · MultiSelect", keywords: "선택 드롭다운 자동완성" },
      { id: "checkbox", label: "체크박스·스위치", title: "Checkbox · Radio · Switch · Label · FilterChip", keywords: "체크박스 라디오 스위치 라벨 칩" },
    ],
  },
  {
    label: "표시",
    items: [
      { id: "badge", label: "배지·아바타", title: "Badge · Avatar · Tooltip · Separator · Skeleton", keywords: "배지 아바타 툴팁 구분선 스켈레톤" },
      { id: "card", label: "카드", title: "Card · StatCard · SectionCards", keywords: "카드 통계 강조 tone emphasis" },
      { id: "tabs", label: "탭", title: "Tabs", keywords: "탭" },
      { id: "overlay", label: "팝업", title: "Popover · Dialog · AlertDialog · Sheet · DialogBody", keywords: "팝오버 팝업 다이얼로그 모달 시트 팝업내용" },
    ],
  },
  {
    label: "탐색 · 데이터",
    items: [
      { id: "breadcrumb", label: "경로·페이지 이동", title: "Breadcrumb · Pagination · Stepper", keywords: "경로 페이지 스텝" },
      { id: "alert", label: "알림", title: "Alert · Sonner", keywords: "알림 토스트" },
      { id: "date", label: "날짜 선택", title: "Calendar · DatePicker · Command · Combobox", keywords: "달력 날짜 커맨드 콤보" },
      { id: "sidebar", label: "사이드바", title: "Sidebar · SidebarBrand · NavUser", keywords: "사이드바 메뉴 사용자" },
      { id: "table", label: "표", title: "DataTable · Table", keywords: "표 테이블 그리드" },
      { id: "form", label: "입력 양식", title: "Form (Field)", keywords: "폼 필드 입력양식" },
      { id: "chart", label: "차트", title: "Charts", keywords: "차트 그래프" },
      { id: "toggle", label: "진행·토글", title: "Progress · Toggle · Spinner · Kbd", keywords: "진행 토글 로딩 키" },
      { id: "tree", label: "트리·화면 탭", title: "Tree · FilterChip · PageTabs · Toolbar · Accordion · Resizable", keywords: "트리 칩 화면탭 툴바 아코디언 스플리터 분할 크기조절 리사이즈" },
      { id: "patterns", label: "화면 패턴", title: "Patterns", keywords: "패턴 헤더 필터바 페이지제목 정보표 조건표 SiteHeader FilterBar PageHeading FormActionBar FormTable" },
    ],
  },
]

export const PREVIEW_SECTIONS = PREVIEW_GROUPS.flatMap((g) => g.items)
