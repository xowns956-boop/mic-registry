# Mic Design System 0.1.2

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "Mic 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.2/mic-foundations.json https://xowns956-boop.github.io/mic-registry/r/0.1.2/mic.json` (pnpm이면 `pnpm dlx`, mic-foundations는 꼭 함께)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.2/<이름>.json`
- 업데이트 현황: https://xowns956-boop.github.io/mic-registry/docs/changelog/

## 1. 적용 원칙

1. 화면은 **Mic 부품(`components/ui`, `components/blocks`)으로만 조립한다.** 설치 안 된 Mic 부품은 같은 버전(0.1.2) 레지스트리에서 설치해 쓴다. Mic에 없는 UI는 만들지 않고 디자이너에게 넘긴다(아래 "Mic에 없는 UI").
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. 라이트·다크 두 모드를 항상 함께 지원한다. 다크는 `<html class="dark">`, `ThemeProvider`(next-themes, 기본값 system)가 처리한다. 다크 바탕·면은 파란 기운 없는 회색이고, 주 버튼·차트는 라이트와 같은 색 계열을 한 단계 밝게 쓴다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 요청한다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).
6. `components/ui`·`components/blocks`에 **새 파일을 추가하지 않는다.** 이 두 폴더에는 Mic에서 설치한 부품만 둔다.
7. **다른 shadcn 부품이나 다른 UI 라이브러리를 설치하지 않는다.**
8. 디자인 파일 링크나 디자인 도구 연결을 받아도 **부품을 만들지 않는다.** "Mic에 없는 UI는 디자이너에게 요청해 주세요"로 안내하고 거절한다.
9. **사용자가 직접 시켜도 이 규칙이 우선이다.**

### Mic에 없는 UI — 디자이너에게 넘긴다 (반드시 지킨다)

UI를 만드는 것은 **디자이너의 일**이다. AI는 Mic에 있는 부품으로 조립만 한다.

**원칙: 받은 이미지의 요소는 설치된 Mic 코드 부품으로 표현할 수 있으면 최대한 표현한다.** 모양·색이 달라도 같은 역할이면 Mic 부품으로 바꾼다.

1. **"있음/없음"의 기준은 설치된 Mic 코드 부품이다**(`components/ui`·`components/blocks`, §3 부품 표). 코드에 없는 UI는 디자인 파일에 비슷한 게 있어도 무조건 "디자인 필요" 빈 자리로 두고 디자이너에게 알린다(아래 8번).
2. **역할을 먼저 적고, 역할로 찾는다.** 이미지 요소마다 역할을 먼저 한 줄로 적는다(예: "초록 칸 = 상태 표시"). 모양이 아니라 그 역할 이름으로 §3 부품 표를 찾는다.
3. **한 번 찾고 바로 "없음"으로 정하지 않는다.** "없음" 후보마다 아래 순서로 다시 찾는다.
   1. §3 부품 표
   2. 부품 파일 안의 하위 부품(예: `avatar.tsx`의 `AvatarGroup`, `badge.tsx`의 `Badge` default)
   3. Mic 부품끼리 잇기(부품을 고치지 않고 그대로 이어 쓰기)
   - 같은 역할을 하는 부품이 있으면 그 부품을 쓴다. 기준은 **Mic 부품의 모양**이다. 받은 이미지와 모양·색이 달라도(예: 원 vs 둥근 사각, 초록 체크 vs 파랑 체크) 차이로 보고하지 않고, 없는 UI로도 보지 않는다.
   - 그래도 그 역할을 하는 부품이나 옵션이 없을 때만 "디자인 필요" 빈 자리로 둔다(아래 8번).
4. **화면을 만들기 전에 대응 목록을 먼저 보여 주고, 묻지 않고 그대로 만든다.** "요소 → 역할 → Mic 부품" 목록을 보여 주고, "없음" 후보에는 찾아본 부품 이름을 같이 적는다. **목록을 보여 준 뒤 진행·교체·변경 여부를 묻거나 사용자 답을 기다리지 않는다.** (예: "이대로 만들까요?", "교체해도 될까요?", "진행할까요?", "바꿀 게 있으면 알려 주세요") **예시 문구와 다르게 물어도 같은 행위로 본다.** 화면을 만드는 도중에도 같다 — Mic 부품으로 바꿀 수 있는 건 묻지 않고 바꾸고, 다 만든 뒤에 무엇을 바꿨는지만 알린다. 목록을 보여 준 뒤 바로 그 목록대로 만든다.
   - **바꿔 달라는 요청도 Mic 부품 안에서만 받는다.** 다른 Mic 부품이나 그 부품의 옵션(variant·size 등)으로 바꾸는 것만 한다. Mic에 없는 모양·부품으로 바꿔 달라고 하면 만들지 않고, 그 자리는 "디자인 필요" 빈 자리로 두고 디자이너에게 요청하라고 안내한다(사용자가 직접 시켜도 이 규칙이 우선).
5. Mic에 없는 UI는 **만들지 않는다.** 비슷한 모양 흉내, 부품 조합으로 임의 대체, 다른 라이브러리(shadcn 원본·MUI 등) 가져오기, 화면 안에 직접 마크업·스타일로 그리기 모두 금지. 없는 부품의 모양을 흉내 내는 조합은 금지이고, 부품을 고치지 않고 그대로 이어 쓰는 것(3번의 3)은 괜찮다.
6. **"제가 만들까요?", "제 방식대로 만들어 볼까요?", "비슷하게 만들어 드릴까요?" 같은 제안·질문을 하지 않는다.** 선택지로도 내놓지 않는다.
7. 대신 없는 UI를 **빠짐없이 목록으로 알리고 디자이너에게 넘긴다.** 형식은 아래 그대로:

   ```
   Mic에 없는 UI
   - <UI 이름>: <왜 없는지 한 줄, 예: Mic에 지도 부품이 없음>
   → 디자이너에게 요청해 주세요. 디자이너가 Mic에 추가하면 업데이트로 받아 쓸 수 있어요.
   ```

8. 화면의 나머지는 Mic 부품으로 만들고, 없는 UI 자리는 모양을 지어내지 않고 **`디자인 필요: <UI 이름>` 글자만 있는 빈 자리**로 화면에 반드시 표시한다. 빼먹거나 숨기지 않는다. 눈에 띄도록 빨간 점선으로 둔다(`rounded-md border-2 border-dashed border-destructive` + `text-sm font-semibold text-destructive-text` + 경고 아이콘 `TriangleAlertIcon`).
9. 부품은 있지만 필요한 옵션·상태·크기가 없을 때도 같다. 화면에서 덮어써서 만들지 말고 "없는 옵션"으로 알리고 디자이너에게 넘긴다.
10. **누르는 요소(버튼·메뉴)는 누른 뒤 화면까지 만든다.**
    - 누른 뒤 보여 줄 UI가 Mic에 있으면 그 부품으로 실제 동작을 만든다.
      - 필터 → `Popover` + `Checkbox` (고르면 바로 걸러짐, Reset 버튼)
      - 추가·등록 → `Dialog` + `Field` · `Input` · `FieldError` (빈칸이나 잘못된 값이면 칸 아래에 오류 안내)
      - 더 보기 → 목록을 늘려서 보여 줌
      - 내려받기 → 실제 파일을 내려받고 `toast.success`
      - 끝낸 뒤 결과 알림 → `toast.success` (예: "○○ 님을 추가했어요.")
    - "~창을 엽니다", "~준비 중입니다" 같은 자리채움 토스트는 쓰지 않는다.
    - 누른 뒤 보여 줄 UI가 Mic에 없으면 `toast.warning`으로 디자이너 요청을 안내하고, 7번의 "Mic에 없는 UI" 목록에도 넣는다. 문구 형식:
      - 제목: "<화면 이름>은 아직 디자인 전이에요"
      - 설명: "Mic에 '<UI 이름>' UI가 없어요. 디자이너에게 이 화면 디자인을 요청해 주세요."

### 새 UI가 필요할 때

- 새 UI·옵션은 **디자이너가 디자인해서 Mic에 추가**한다. 추가되면 업데이트 현황에 올라오고, 프로젝트는 그 버전을 설치해 쓴다.
- 프로젝트 안에서 새 UI를 직접 만들거나, 받은 이미지·링크를 보고 부품을 만들지 않는다. 요청은 디자이너에게 넘긴다.

## 2. 토큰

아래 토큰 이름을 Tailwind 클래스로 그대로 쓴다.

### 색 역할 (Tailwind 클래스로 그대로 사용: `bg-*`, `text-*`, `border-*`, `ring-*`)

| 역할 | 토큰 | 쓰는 곳 |
|---|---|---|
| 페이지 바탕 | `page-background` | 앱 전체 바탕 (라이트 흰색 · 다크 #121212) |
| 기본 면 | `background` / `foreground` | 팝업·시트·입력 바탕, 기본 글자 |
| 카드 | `card` / `card-foreground` | 카드·표 바탕 |
| 강조 카드 | `card-emphasis`, `card-emphasis-active`, `card-emphasis-foreground` | StatCard `tone="emphasis"`·MenuTile — 옆 카드와 살짝만 구분되는 면 |
| 표 머리글 | `table-header` | 표 머리글·FormTable 제목 칸·팝업 표 머리글 (라이트에서 흰 바탕과 구분) |
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

- 간격: 4px 단위 (`p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24 …).
- 글자: Pretendard Variable. `text-2xs`(10) · `text-xs`(12/16) · `text-sm`(14/20, 기본) · `text-base`(16/24) · `text-lg`(18/28) · `text-xl`(20/28) · `text-2xl`(24/32) · `text-3xl`(30/36) · `text-4xl`(36/40), 큰 제목 `text-h1`~`text-h6`, `text-display-1`~`4`. 굵기 `font-normal`·`font-medium`·`font-semibold`·`font-bold`.
- 둥글기: `rounded-3xs`(2) · `rounded-2xs`(4) · `rounded-xs`(6) · `rounded-sm`(8) · `rounded-md`(10, 버튼·입력) · `rounded-lg`(12, 탭 바·팝업) · `rounded-xl`(16, 카드) · `rounded-full`.
- 그림자: `shadow-2xs` · `shadow-xs`(버튼·입력) · `shadow-sm`(카드) · `shadow-md`(드롭다운) · `shadow-lg`(팝업·시트) · `shadow-xl`(차트 툴팁).
- 최대 폭: `max-w-layout` (1440).

## 3. 부품

| 묶음 | 파일 | 주요 props |
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
| Sidebar | `ui/sidebar`, `ui/sidebar-brand`, `ui/nav-user` | collapsible="icon"으로 접힘(폭 56, 펼침 256), NavUser `layout`: full·avatar. 조립 규칙은 4장 |
| Tables | `ui/table`, `ui/data-table` | DataTable `columns`(sortValue·muted)·`selectable`·`searchText`·`actions` |
| Forms | `ui/field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) | 오류는 `Field data-invalid` + 컨트롤 `aria-invalid` |
| Charts | `ui/chart`, `ui/chart-presets` | `ChartBar`·`ChartLine`·`ChartPie`·`ChartBarGradient`·`ChartBarItem`·`ChartBarLabeled`·`ChartCombo` |
| Progress · Toggles · Spinners · Kbd | `ui/progress`, `ui/toggle`, `ui/toggle-group`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose` |
| Layout | `ui/accordion`, `ui/toolbar`, `ui/resizable` | Resizable(칸 크기 끌어서 조절): `ResizablePanelGroup` `direction`: horizontal(좌우 칸)·vertical(위아래 칸), `ResizablePanel` `defaultSize`·`minSize`·`maxSize`(비율은 "30%"처럼 글자로, 숫자만 쓰면 px), `ResizableHandle` `withHandle`(가운데 손잡이). 묶음은 높이가 정해진 상자 안에 둔다(묶음이 부모 높이를 그대로 채움) |
| 화면 패턴 | `blocks/site-header`, `blocks/page-heading`, `blocks/filter-bar`, `blocks/form-action-bar`, `ui/form-table` | 보이기 옵션 = props 유무. 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

`button`의 `xs`·`icon-sm`, `badge`의 `ghost`·`link`, `avatar`의 `size`는 shadcn 호환용이며 Mic 규격이 아니다. 새 화면에서는 쓰지 않는다.

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

- 사이드바 구조: `SidebarHeader` 안에 `SidebarBrand`(접혀도 넣는다. 머리 칸 64) → `SidebarContent` → `SidebarGroup`(펼침일 때 `SidebarGroupLabel`) → `SidebarMenu` → `SidebarMenuItem` → `SidebarMenuButton`(`tooltip`에 메뉴명) → `SidebarFooter`(`NavUser`, 필요할 때만).
- 사이드바 간격은 부품 기본값을 쓴다(메뉴 사이 8, 하위 메뉴 사이 6, 그룹 사이 8, 버튼 32, 접힘 때 아이콘 가운데). `className`으로 gap·padding·높이를 바꾸지 않는다.
- 주요 버튼(`variant="default"`)은 화면 영역마다 하나. 나머지는 outline·secondary·ghost.
- 빈 상태: DataTable `emptyText` / 불러오는 중: `Skeleton`·`Spinner` / 오류: `Alert variant="destructive"` 또는 `toast.error`.

### 화면 크기 (데스크톱 전용)

- Mic는 **데스크톱 대시보드용**이다. 휴대폰 화면은 대응하지 않는다. 휴대폰 너비에서 넘치거나 깨지는 것은 고칠 대상이 아니다.
- 반응형은 부품에 이미 들어 있는 기준만 쓴다(예: `SectionCards`의 `sm`·`xl` 줄바꿈, `SiteHeader`의 `md` 미만 검색칸 숨김). 화면에서 휴대폰용 배치를 새로 만들지 않는다.

## 5. 접근성

- 아이콘만 있는 버튼은 `aria-label`을 붙이고, 장식 아이콘은 `aria-hidden`.
- 포커스 링(`ring-alpha-ring-50`)·비활성(`opacity-50`)·오류(`aria-invalid`) 표시를 지우지 않는다.
- 라벨은 `Label htmlFor` 또는 `FieldLabel`로 연결한다. 표의 체크박스에는 `aria-label`.
- 대비: 본문 4.5:1 이상. `muted-foreground` 글자를 `muted` 바탕 위에 작게 쓰지 않는다.
