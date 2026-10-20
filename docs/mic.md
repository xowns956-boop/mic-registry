# Mic Design System v0.1

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "Mic 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 원본: Figma `Mic-Design-system v0.1` (fileKey `Q1cGtxx0jsnSwfaPnJloYg`)
- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.0/mic.json` (pnpm이면 `pnpm dlx`)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.0/<이름>.json`

## 1. 적용 원칙

1. 화면을 만들 때 **설치된 부품(`components/ui`, `components/blocks`)을 먼저 쓴다.** 비슷한 모양을 새로 만들지 않는다. 없는 부품은 같은 버전(0.1.0) 레지스트리에서 추가한다.
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. 라이트·다크 두 모드를 항상 함께 지원한다. 다크는 `<html class="dark">`, `ThemeProvider`(next-themes, 기본값 system)가 처리한다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 확인하고 Figma와 함께 고친다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).

## 2. 토큰

Figma 변수 이름에서 `/`를 `-`로 바꾼 이름이다. 의미 색은 그룹명이 겹치면 그룹을 뗀다 (`primary/primary` → `primary`, `base/background` → `background`, `border/ring` → `ring`). `alpha/` 그룹은 `alpha-`를 붙인다.

### 색 역할 (Tailwind 클래스로 그대로 사용: `bg-*`, `text-*`, `border-*`, `ring-*`)

| 역할 | 토큰 | 쓰는 곳 |
|---|---|---|
| 페이지 바탕 | `page-background` | 앱 전체 바탕 (라이트 slate-100) |
| 기본 면 | `background` / `foreground` | 팝업·시트·입력 바탕, 기본 글자 |
| 카드 | `card` / `card-foreground` | 카드·표 바탕 |
| 주 동작 | `primary`, `primary-hover`, `primary-active`, `primary-text`, `primary-foreground` | 주요 버튼(화면당 1개), 선택 상태, 링크 글자 |
| 보조 | `secondary`, `secondary-hover`, `secondary-foreground` | 보조 버튼 |
| 강조 면 | `accent`, `accent-hover`, `accent-foreground` | hover·선택된 목록 항목, 오늘 날짜 |
| 흐림 | `muted`, `muted-foreground` | 비활성 면, 설명 글자 |
| 경계 | `border`, `input`, `ring` | 테두리, 입력 테두리, 포커스 |
| 상태 | `destructive*`, `success*`, `warning*`, `info*`, `tertiary*`, `neutral*`, `dark*`, `light*`, `inverse*` | 각 계열마다 기본·`-hover`·`-active`·`-emphasis`·`-text`·`-foreground`·`-subtle`·`-subtle-hover`·`-subtle-active`·`-subtle-foreground` |
| 투명도 | `alpha-*` (예: `alpha-ring-50`, `alpha-overlay`, `alpha-field`, `alpha-outline`, `alpha-row-hover`, `alpha-list-hover`) | 포커스 링, 덮개, 입력 바탕, 행 hover |
| 차트 | `chart-1`~`chart-6` (+ `-bold`·`-bolder`·`-subtle`·`-subtler`), `chart-electricity`·`chart-gas`·`chart-operation`·`chart-performance`·`chart-production`·`chart-quality` | 차트 계열 |
| 사이드바 | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` | 사이드바 |
| 업무 | `ees-maintenance*` | 보전(설비) 상태 표시 |

상태 표현 규칙: 진한 바탕 = 기본 토큰 + `-foreground` 글자, 연한 바탕 = `-subtle` + `-subtle-foreground` 글자, 글자만 = `-text`.

### 간격·글자·둥글기·그림자

- 간격: 4px 단위 (`p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24 …). Figma `spacing/N` = Tailwind `N`.
- 글자: Pretendard Variable. `text-2xs`(10) · `text-xs`(12/16) · `text-sm`(14/20, 기본) · `text-base`(16/24) · `text-lg`(18/28) · `text-xl`(20/28) · `text-2xl`(24/32) · `text-3xl`(30/36) · `text-4xl`(36/40), 큰 제목 `text-h1`~`text-h6`, `text-display-1`~`4`. 굵기 `font-normal`·`font-medium`·`font-semibold`·`font-bold`.
- Figma 글자 스타일 `text-sm/medium` = `text-sm font-medium`.
- 둥글기: `rounded-3xs`(2) · `rounded-2xs`(4) · `rounded-xs`(6) · `rounded-sm`(8) · `rounded-md`(10, 버튼·입력) · `rounded-lg`(12, 탭 바·팝업) · `rounded-xl`(16, 카드) · `rounded-full`.
- 그림자: `shadow-2xs` · `shadow-xs`(버튼·입력) · `shadow-sm`(카드) · `shadow-md`(드롭다운) · `shadow-lg`(팝업·시트) · `shadow-xl`(차트 툴팁).
- 최대 폭: `max-w-layout` (1440).

## 3. 부품 (Figma 페이지 → 파일)

| Figma | 파일 | 주요 props (Figma variant 이름 그대로) |
|---|---|---|
| Buttons | `ui/button`, `ui/button-group`, `ui/menu-tile` | `variant`: default·destructive·outline·secondary·ghost·link / `size`: default(36)·sm(32)·lg(40)·icon(36) / 누르는 동안 pressed 색(자동). MenuTile `icon`·`children`(메뉴명) — 태블릿 메뉴용 큰 타일 |
| Inputs | `ui/input`, `ui/textarea`, `ui/input-group`, `ui/number-input`, `ui/number-stepper` | 오류는 `aria-invalid`. NumberStepper(− 값 +) `value`·`onValueChange`·`min`·`max`·`step` — 태블릿 숫자 입력 |
| Dropdowns | `ui/select`, `ui/dropdown-menu`, `ui/autocomplete`, `ui/multi-select` | Select `size`: default·sm, DropdownMenuItem `variant`: default·destructive |
| Checkboxes · Radios · Switches · Labels | `ui/checkbox`, `ui/radio-group`, `ui/switch`, `ui/label` | Label `required` (빨간 점) |
| Badges · Avatars · Tooltips · Separators · Skeletons | `ui/badge`, `ui/avatar`, `ui/tooltip`, `ui/separator`, `ui/skeleton` | Badge `variant`: default·secondary·destructive·outline |
| Cards | `ui/card`, `ui/stat-card` (`StatCard`, `SectionCards`) | StatCard `label`·`value`·`badge`·`summary`·`detail`·`trend`(up·down)·`tone`(default·emphasis=진한 바탕) |
| Tabs | `ui/tabs` | TabsList `variant`: default·line |
| Popovers · Dialogs · Sheets | `ui/popover`, `ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/dialog-body` | Sheet `side`: right·left·top·bottom. 팝업 내용: `DialogBodyTable`(columns·rows)·`DialogBodyInfo`(items)·`DialogBodyLotInput`·`DialogBodyTextarea`·`DialogBodyOptionList`(options)·`DialogBodyOptionButtons`(options·onSelect) |
| Breadcrumbs · Pagination | `ui/breadcrumb`, `ui/pagination` | PaginationLink `isActive` |
| Steppers | `ui/stepper` | StepperItem `state`: disabled·invalid·upcoming·current·done, Stepper `orientation` |
| Alerts · Toasts | `ui/alert`, `ui/sonner` | Alert `variant`: default·destructive / `toast.success·info·warning·error` |
| Date Pickers | `ui/calendar`, `ui/date-picker` | DatePicker `value`·`onValueChange`·`invalid` (기본 언어 한국어) |
| Command | `ui/command`, `ui/combobox` | |
| Sidebar | `ui/sidebar`, `ui/sidebar-brand`, `ui/nav-user` | collapsible="icon"으로 접힘, NavUser `layout`: full·avatar |
| Tables | `ui/table`, `ui/data-table` | DataTable `columns`(sortValue·muted)·`selectable`·`searchText`·`actions` |
| Forms | `ui/field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) | 오류는 `Field data-invalid` + 컨트롤 `aria-invalid` |
| Charts | `ui/chart`, `ui/chart-presets` | `ChartBar`·`ChartLine`·`ChartPie`·`ChartBarGradient`·`ChartBarItem`·`ChartBarLabeled`·`ChartCombo` |
| Progress · Toggles · Spinners · Kbd | `ui/progress`, `ui/toggle`, `ui/toggle-group`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose` |
| Layout | `ui/accordion`, `ui/toolbar` | |
| 03_Patterns | `blocks/site-header`, `blocks/page-heading`, `blocks/filter-bar`, `blocks/form-action-bar`, `ui/form-table` | Figma의 Show 옵션 = props 유무. 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

`button`의 `xs`·`icon-sm`, `badge`의 `ghost`·`link`, `avatar`의 `size`는 shadcn 호환용이며 Figma에 없다. 새 화면에서는 쓰지 않는다.

## 4. 화면 조립 패턴 (어드민)

```
SidebarProvider
├─ Sidebar (SidebarBrand · SidebarGroup · SidebarMenuButton · NavUser)
└─ SidebarInset (bg-page-background)
   ├─ SiteHeader (빵부스러기 · 검색 · 사용자)
   ├─ PageTabBar (열린 화면 탭, 선택)
   └─ main (p-6, gap-6)
      ├─ PageHeading (제목 · 설명 · 보조 버튼 · 주요 버튼 1개)
      ├─ FilterBar (검색 Input · Select · DatePicker · FilterBarReset)
      ├─ SectionCards (StatCard ×4)
      ├─ DataTable 또는 Card 안 차트
      └─ FormActionBar (등록·수정 화면 맨 아래)
```

- 주요 버튼(`variant="default"`)은 화면 영역마다 하나. 나머지는 outline·secondary·ghost.
- 빈 상태: DataTable `emptyText` / 불러오는 중: `Skeleton`·`Spinner` / 오류: `Alert variant="destructive"` 또는 `toast.error`.

## 5. 접근성

- 아이콘만 있는 버튼은 `aria-label`을 붙이고, 장식 아이콘은 `aria-hidden`.
- 포커스 링(`ring-alpha-ring-50`)·비활성(`opacity-50`)·오류(`aria-invalid`) 표시를 지우지 않는다.
- 라벨은 `Label htmlFor` 또는 `FieldLabel`로 연결한다. 표의 체크박스에는 `aria-label`.
- 대비: 본문 4.5:1 이상. `muted-foreground` 글자를 `muted` 바탕 위에 작게 쓰지 않는다.
