// 미리보기 목차 (레지스트리에 들어가지 않음)
// 왼쪽 메뉴와 검색이 이 목록을 쓴다. batch-*.tsx에 Section을 추가하면 여기에도 같은 id로 추가한다.
// keywords: 제목에 없는 검색어(한글 이름 등)

export type PreviewSection = { id: string; title: string; keywords?: string }

export const PREVIEW_GROUPS: { label: string; items: PreviewSection[] }[] = [
  {
    label: "입력",
    items: [
      { id: "button", title: "Button · ButtonGroup", keywords: "버튼 버튼그룹" },
      { id: "input", title: "Input · Textarea · InputGroup · NumberInput", keywords: "입력 텍스트 숫자" },
      { id: "select", title: "Select · DropdownMenu · Autocomplete · MultiSelect", keywords: "선택 드롭다운 자동완성" },
      { id: "checkbox", title: "Checkbox · Radio · Switch · Label · FilterChip", keywords: "체크박스 라디오 스위치 라벨 칩" },
    ],
  },
  {
    label: "표시",
    items: [
      { id: "badge", title: "Badge · Avatar · Tooltip · Separator · Skeleton", keywords: "배지 아바타 툴팁 구분선 스켈레톤" },
      { id: "card", title: "Card · StatCard · SectionCards", keywords: "카드 통계" },
      { id: "tabs", title: "Tabs", keywords: "탭" },
      { id: "overlay", title: "Popover · Dialog · AlertDialog · Sheet", keywords: "팝오버 팝업 다이얼로그 모달 시트" },
    ],
  },
  {
    label: "탐색 · 데이터",
    items: [
      { id: "breadcrumb", title: "Breadcrumb · Pagination · Stepper", keywords: "경로 페이지 스텝" },
      { id: "alert", title: "Alert · Sonner", keywords: "알림 토스트" },
      { id: "date", title: "Calendar · DatePicker · Command · Combobox", keywords: "달력 날짜 커맨드 콤보" },
      { id: "sidebar", title: "Sidebar · SidebarBrand · NavUser", keywords: "사이드바 메뉴 사용자" },
      { id: "table", title: "DataTable · Table", keywords: "표 테이블 그리드" },
      { id: "form", title: "Form (Field)", keywords: "폼 필드 입력양식" },
      { id: "chart", title: "Charts", keywords: "차트 그래프" },
      { id: "toggle", title: "Progress · Toggle · Spinner · Kbd", keywords: "진행 토글 로딩 키" },
      { id: "tree", title: "Tree · FilterChip · PageTabs · Toolbar · Accordion", keywords: "트리 칩 화면탭 툴바 아코디언" },
      { id: "patterns", title: "Patterns", keywords: "패턴 헤더 필터바 페이지제목 SiteHeader FilterBar PageHeading FormActionBar" },
    ],
  },
  {
    label: "0.2.0 추가",
    items: [
      { id: "added-button", title: "Button · state=pressed", keywords: "버튼 눌림" },
      { id: "added-stat", title: "StatCard · tone", keywords: "통계 카드 강조" },
      { id: "added-stepper", title: "NumberStepper", keywords: "숫자 증감" },
      { id: "added-menu-tile", title: "MenuTile", keywords: "메뉴 타일 태블릿" },
      { id: "added-form-table", title: "FormTable", keywords: "정보 조건 표" },
      { id: "added-dialog-body", title: "DialogBody (팝업 내용)", keywords: "팝업 내용 다이얼로그" },
    ],
  },
]

export const PREVIEW_SECTIONS = PREVIEW_GROUPS.flatMap((g) => g.items)
