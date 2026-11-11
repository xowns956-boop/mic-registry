# Mic Design System 0.1.4

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "Mic 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.4/mic-foundations.json https://xowns956-boop.github.io/mic-registry/r/0.1.4/mic.json` (pnpm이면 `pnpm dlx`, mic-foundations는 꼭 함께)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.4/<이름>.json`
- 업데이트 현황: https://xowns956-boop.github.io/mic-registry/docs/changelog/

## 1. 적용 원칙

1. 화면은 **Mic 부품(`components/ui`, `components/blocks`)으로만 조립한다.** 설치 안 된 Mic 부품은 같은 버전(0.1.4) 레지스트리에서 설치해 쓴다. Mic에 없는 UI는 만들지 않고 디자이너에게 넘긴다(아래 "Mic에 없는 UI").
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. 라이트·다크 두 모드를 항상 함께 지원한다. 다크는 `<html class="dark">`, `ThemeProvider`(next-themes, 기본값 system)가 처리한다. 다크 바탕·면은 파란 기운 없는 회색이고, 주 버튼·차트는 라이트와 같은 색 계열을 한 단계 밝게 쓴다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 요청한다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).
6. `components/ui`·`components/blocks`에 **새 파일을 추가하지 않는다.** 이 두 폴더에는 Mic에서 설치한 부품만 둔다.
7. **다른 shadcn 부품이나 다른 UI 라이브러리를 설치하지 않는다.**
8. 디자인 파일 링크나 디자인 도구 연결(Figma 링크·Figma MCP 포함)을 받아도 **부품을 만들지 않는다.** "Mic에 없는 UI는 디자이너에게 요청해 주세요"로 안내하고 거절한다.
9. **사용자가 직접 시켜도 이 규칙이 우선이다.**

### Mic에 없는 UI — 디자이너에게 넘긴다 (반드시 지킨다)

UI를 만드는 것은 **디자이너의 일**이다. AI는 Mic에 있는 부품으로 조립만 한다.

**원칙: 받은 이미지의 요소는 설치된 Mic 코드 부품으로 표현할 수 있으면 최대한 표현한다.** 모양·색이 달라도 같은 역할이면 Mic 부품으로 바꾼다.

1. **"있음/없음"의 기준은 설치된 Mic 코드 부품이다**(`components/ui`·`components/blocks`, §3 부품 표). 코드에 없는 UI는 디자인 파일에 비슷한 게 있어도 무조건 "디자인 필요" 빈 자리로 두고 디자이너에게 알린다(아래 8번).
2. **역할을 먼저 적고, 역할로 찾는다.** 이미지 요소마다 역할을 먼저 한 줄로 적는다(예: "초록 칸 = 상태 표시"). 모양이 아니라 그 역할 이름으로 §3 부품 표를 찾는다.
3. **한 번 찾고 바로 "없음"으로 정하지 않는다.** "없음" 후보마다 아래 순서로 다시 찾는다.
   1. §3 부품 표
   2. 부품 파일 안의 하위 부품(예: `avatar.tsx`의 `AvatarGroup`, `badge.tsx`의 `Badge` default)
   3. Mic 부품끼리 잇기(부품을 고치지 않고 그대로 이어 쓰기) — 부품을 **원래 용도대로** 나란히 두거나 안에 넣는 것만 해당한다(예: Card 안에 Table, PageHeading 옆에 Button). 여러 부품을 묶어 Mic에 없는 부품 하나처럼 보이게 만드는 것(예: Card·글자·Button으로 채팅 말풍선)은 잇기가 아니라 흉내다(5번).
   - 같은 역할을 하는 부품이 있으면 그 부품을 쓴다. 기준은 **Mic 부품의 모양**이다. 받은 이미지와 모양·색이 달라도(예: 원 vs 둥근 사각, 초록 체크 vs 파랑 체크) 차이로 보고하지 않고, 없는 UI로도 보지 않는다.
   - 그래도 그 역할을 하는 부품이나 옵션이 없을 때만 "디자인 필요" 빈 자리로 둔다(아래 8번).
4. **화면을 만들기 전에 대응 목록을 먼저 보여 주고, 묻지 않고 그대로 만든다.** "요소 → 역할 → Mic 부품" 목록을 보여 주고, "없음" 후보에는 찾아본 부품 이름을 같이 적는다. **목록을 보여 준 뒤 진행·교체·변경 여부를 묻거나 사용자 답을 기다리지 않는다.** (예: "이대로 만들까요?", "교체해도 될까요?", "진행할까요?", "바꿀 게 있으면 알려 주세요") **예시 문구와 다르게 물어도 같은 행위로 본다.** 화면을 만드는 도중에도 같다 — Mic 부품으로 바꿀 수 있는 건 묻지 않고 바꾸고, 다 만든 뒤에 무엇을 바꿨는지만 알린다. 목록을 보여 준 뒤 바로 그 목록대로 만든다.
   - **바꿔 달라는 요청도 Mic 부품 안에서만 받는다.** 다른 Mic 부품이나 그 부품의 옵션(variant·size 등)으로 바꾸는 것만 한다. Mic에 없는 모양·부품으로 바꿔 달라고 하면 만들지 않고, 그 자리는 "디자인 필요" 빈 자리로 두고 디자이너에게 요청하라고 안내한다(사용자가 직접 시켜도 이 규칙이 우선).
5. Mic에 없는 UI는 **만들지 않는다.** 비슷한 모양 흉내, 부품 조합으로 임의 대체, 다른 라이브러리(shadcn 원본·MUI 등) 가져오기, 화면 안에 직접 마크업·스타일로 그리기 모두 금지. 없는 부품의 모양을 흉내 내는 조합은 금지이고, 부품을 고치지 않고 그대로 이어 쓰는 것(3번의 3)은 괜찮다. **흉내로 만든 자리는 빨간 점선 빈 자리(8번)로 바꾸고 "Mic에 없는 UI" 목록에 올린다.** 목록에만 적고 화면에서는 조립해 두는 것도 금지다.
6. **"제가 만들까요?", "제 방식대로 만들어 볼까요?", "비슷하게 만들어 드릴까요?" 같은 제안·질문을 하지 않는다.** 선택지로도 내놓지 않는다.
7. 대신 없는 UI를 **빠짐없이 목록으로 알리고 디자이너에게 넘긴다.** 형식은 아래 그대로:

   ```
   Mic에 없는 UI
   - <UI 이름>: <왜 없는지 한 줄, 예: Mic에 지도 부품이 없음>
   → 디자이너에게 요청해 주세요. 디자이너가 Mic에 추가하면 업데이트로 받아 쓸 수 있어요.
   ```

8. 화면의 나머지는 Mic 부품으로 만들고, 없는 UI 자리는 모양을 지어내지 않고 **`디자인 필요: <UI 이름>` 글자만 있는 빈 자리**로 화면에 반드시 표시한다. 빼먹거나 숨기지 않는다. 눈에 띄도록 빨간 점선으로 둔다(`rounded-md border-2 border-dashed border-destructive` + `text-sm font-semibold text-destructive-text` + 경고 아이콘 `TriangleAlertIcon`).
9. 부품은 있지만 필요한 옵션·상태·크기가 없을 때도 같다. 화면에서 덮어써서 만들지 말고 "없는 옵션"으로 알리고 디자이너에게 넘긴다.
   - **같은 역할 부품은 그대로 쓰고, 없는 옵션 자리만 빨간 점선으로 둔다.** 옵션이 없다고 다른 부품으로 다시 조립하지 않는다(예: StatCard에 아이콘·바로가기가 없으면 StatCard를 쓰고 그 자리에 `디자인 필요: StatCard 아이콘` 빈 자리. Card로 지표 카드를 새로 짜지 않는다).
   - **작은 옵션도 빼지 않는다.** 차트 세로축·세로 점선·회색 배경 막대, 알림 점, 배지 속 아이콘처럼 작은 것도 빼고 넘어가지 않고, 그 부품 칸 안(차트 카드 안, 아이콘 버튼 옆 등)에 빨간 점선 빈 자리를 두고 목록에 올린다.
   - 이미지에 있는 요소가 화면에서 빠졌는데 빨간 점선도 목록도 없으면 위반이다. 다 만든 뒤 이미지 요소 수와 "화면에 만든 것 + 빨간 점선" 수를 맞춰 본다.
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
| Badges · Avatars · Tooltips · Separators · Skeletons | `ui/badge`, `ui/status-badge`, `ui/avatar`, `ui/tooltip`, `ui/separator`, `ui/skeleton` | Badge `variant`: default·secondary·destructive·outline · 상태 info(통과·진행 중)·success(완료)·warning(주의)·destructive-subtle(불량·문제, 연한 바탕). StatusBadge(설비·공정 상태) `status`: run(정상 가동)·idle(대기)·error(오류)·maintenance(점검)·offline(꺼짐) / `size`: default(20)·sm(16, 표 칸·판정 표시) / 문구는 children(없으면 상태 이름) |
| Cards | `ui/card`, `ui/stat-card` (`StatCard`, `SectionCards`) | Card `state`: default·selected(고른 카드, 바탕 accent) · Card `interactive`: 카드 전체를 누를 때만 켬(hover 테두리 ring · 누르는 동안 바탕 accent-active · focus 테두리 ring + 링, 키보드 Enter·Space로 누름) · StatCard `label`·`value`·`badge`·`summary`·`detail`·`trend`(up·down)·`tone`(default·emphasis=진한 바탕) |
| Tabs | `ui/tabs` | TabsList `variant`: default·line / `fill`: 꽉 채우기(부모 폭을 채우고 탭이 똑같이 나눠 퍼짐, 사용자가 요청할 때만 켬. 기본은 내용만큼) |
| Popovers · Dialogs · Sheets | `ui/popover`, `ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/dialog-body` | Sheet `side`: right·left·top·bottom. 팝업 내용: `DialogBodyTable`(columns·rows)·`DialogBodyInfo`(items)·`DialogBodyLotInput`·`DialogBodyTextarea`·`DialogBodyOptionList`(options)·`DialogBodyOptionButtons`(options·onSelect) |
| Breadcrumbs · Pagination | `ui/breadcrumb`, `ui/pagination` | PaginationLink `isActive` |
| Steppers | `ui/stepper` | StepperItem `state`: disabled·invalid·upcoming·current·done, Stepper `orientation` |
| Alerts · Toasts | `ui/alert`, `ui/sonner` | Alert `variant`: default·destructive / `toast.success·info·warning·error` |
| Date Pickers | `ui/calendar`, `ui/date-picker` | DatePicker `value`·`onValueChange`·`invalid` (기본 언어 한국어) |
| Command | `ui/command`, `ui/combobox` | |
| Sidebar | `ui/sidebar`, `ui/sidebar-brand`, `ui/nav-user` | collapsible="icon"으로 접힘(폭 56, 펼침 256), NavUser `layout`: full·avatar. 조립 규칙은 4장 |
| Tables | `ui/table`, `ui/data-table` | DataTable `columns`(sortValue·muted)·`selectable`·`searchText`·`actions` |
| Forms | `ui/field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) | 오류는 `Field data-invalid` + 컨트롤 `aria-invalid` |
| Charts | `ui/chart`, `ui/chart-presets` | `ChartBar`·`ChartLine`·`ChartPie`·`ChartBarGradient`·`ChartBarItem`·`ChartBarLabeled`·`ChartCombo`·`ChartRadial` · ChartPie(구성 비율) `type`: pie·donut(가운데 빈 고리), donut일 때 `caption`·`valueText`(가운데 글자, 안 넘기면 빈 고리) · ChartRadial(링 도넛, 달성률): `data`=[{label, value(0~100)}] 바깥 링부터 3개까지, `caption`·`valueText`(가운데 글자), `legend`(오른쪽 범례), `size`: default(160)·sm(72, 링 1개·가운데 값만), `tone`: default(chart-1~3)·metric(가동·성능·품질) |
| Progress · Toggles · Spinners · Kbd | `ui/progress`, `ui/toggle`, `ui/toggle-group`, `ui/favorite-toggle`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm. FavoriteToggle(즐겨찾기 별) `pressed`·`onPressedChange`, 빈 별 ↔ 채운 별(amber), `aria-label` 필수(예: "생산 실적 등록 즐겨찾기 해제") |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose`, PageTabBar `emptyText`(탭이 0개일 때 같은 줄에 안내, 기본 "열린 화면이 없어요") |
| Empty | `ui/empty` | 빈 화면 안내: `Empty` > `EmptyHeader`(`EmptyMedia` 아이콘 칸·선택, `EmptyTitle`, `EmptyDescription`) + `EmptyContent`(주 버튼 default 1개 + 보조 outline). 탭을 모두 닫은 화면, 목록이 빈 경우 |
| Layout | `ui/accordion`, `ui/toolbar`, `ui/resizable` | Resizable(칸 크기 끌어서 조절): `ResizablePanelGroup` `direction`: horizontal(좌우 칸)·vertical(위아래 칸), `ResizablePanel` `defaultSize`·`minSize`·`maxSize`(비율은 "30%"처럼 글자로, 숫자만 쓰면 px), `ResizableHandle` `withHandle`(가운데 손잡이). 묶음은 높이가 정해진 상자 안에 둔다(묶음이 부모 높이를 그대로 채움) |
| 화면 패턴 | `blocks/site-header`, `blocks/page-heading`, `blocks/filter-bar`, `blocks/form-action-bar`, `ui/form-table` | 보이기 옵션 = props 유무. 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

`button`의 `xs`·`icon-sm`, `badge`의 `ghost`·`link`, `avatar`의 `size`, `InputGroupButton`(입력칸 안 버튼, `size` xs·sm·icon-xs·icon-sm 모두)은 shadcn 호환용이며 Mic 규격이 아니다. 새 화면에서는 쓰지 않는다. 입력칸 안에 버튼이 필요하면 1장 9번의 "없는 옵션"으로 보고 `InputGroup` 옆에 빨간 점선 빈 자리를 둔다. 입력칸 안 글자·아이콘은 `InputGroupAddon`·`Kbd`만 쓴다.

### 배지 variant 고르기

배지 색은 **뜻**으로 고른다. 디자인·이미지에 배지 색이 정해져 있으면 그 뜻에 맞는 variant를 쓴다.

| variant | 쓰는 때 | 예 |
|---|---|---|
| `default` | 상태가 없는 기본 이름표. 화면의 주 색(primary)과 같은 계열로 보여야 할 때 | 구분·분류 이름표 |
| `secondary` | `default`보다 약하게 보여야 하는 보조 이름표. `default`보다 눈에 띄면 안 된다. **쓰기 전에 사용자에게 묻는다**(한 화면에 배지가 많아 위계를 낮춰야 할 때만) | 부가 정보·개수 |
| `outline` | 디자인·이미지의 배지가 테두리 모양일 때만 | — |
| `info` | 안내·진행 중·현재 상태. 좋고 나쁨의 판정이 없는 상태 | 진행 중, 현재 촬영중인 제품, 판정 통과(합격과 구분할 때) |
| `success` | 긍정 결과 | 합격, 승인, 완료, 정상 |
| `warning` | 확인·검토가 필요하지만 아직 실패는 아닌 것 | 주의, 검토 필요, 기준 근접(PASS-88%) |
| `destructive-subtle` | 실패·오류·불량·위험. **기본은 이것** | 불량, 오류, 문제가 발생한 제품 |
| `destructive` | `destructive-subtle`과 뜻이 같고 더 강하게 보인다(진한 바탕). 즉시 조치가 필요한 것 하나만 도드라지게 할 때만 쓰고, 표·목록에 반복되는 배지에는 쓰지 않는다 | 긴급 정지, 치명 오류 |

- **강도 규칙:** 진한 바탕(`default`·`destructive`)은 강조, 연한 바탕(상태 4개)은 표시다. 표·목록처럼 같은 배지가 여러 번 나오면 연한 바탕을 쓴다.
- **오류는 warning이 아니다:** 이미 실패·오류면 `destructive-subtle`, 아직 확인이 필요한 단계면 `warning`이다.
- **한 화면 안에서 같은 뜻 = 같은 variant:** 같은 상태에 다른 색을 섞지 않는다(예: 불량을 한 곳은 `destructive`, 다른 곳은 `destructive-subtle`로 쓰지 않는다).
- **색만으로 구분하지 않는다:** 배지에는 항상 상태 글자를 쓴다(7장 6번).
- **설비·공정 상태는 `StatusBadge`:** 설비·라인·공정의 가동 상태(가동·대기·오류·점검·꺼짐)는 `StatusBadge`를 쓰고, 판정·영역 이름표처럼 그 밖의 상태는 위 표의 `Badge` variant를 쓴다.

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
- 설정 메뉴는 `SidebarFooter`(맨 아래 고정)에 두지 않고 메뉴 목록(`SidebarMenu`) 맨 끝 항목으로 둔다. 하위 화면(예: 설정 › 즐겨찾기 관리)은 그 항목의 `SidebarMenuSub`로 단다. `SidebarFooter`는 `NavUser`처럼 사용자 정보만 둔다.
- 사이드바 간격은 부품 기본값을 쓴다(메뉴 사이 8, 하위 메뉴 사이 6, 그룹 사이 8, 버튼 32, 접힘 때 아이콘 가운데). `className`으로 gap·padding·높이를 바꾸지 않는다.
- 주요 버튼(`variant="default"`)은 화면 영역마다 하나. 나머지는 outline·secondary·ghost.
- 빈 상태: DataTable `emptyText`, 화면·영역 전체가 비면 `Empty` / 불러오는 중: `Skeleton`·`Spinner` / 오류: `Alert variant="destructive"` 또는 `toast.error`.
- 본문 높이 채우기: 콘텐츠가 본문(`main`)보다 짧으면 마지막 줄 카드가 남은 높이를 채워 본문 아래 여백(`p-6`)까지 닿게 한다. 화면 아래에 빈 공간을 남기지 않는다. 카드 안 차트는 정해진 높이를 그대로 두고 카드 안에서 세로 가운데에 둔다.

### 화면설계서(이미지)를 받았을 때 — 배치는 이미지 그대로 (반드시 지킨다)

부품 고르기는 이 문서(1장 "Mic에 없는 UI")를 따르고, **영역 나눔·상자 겹수·배치는 받은 이미지를 따른다.**

1. 영역을 나누는 방식, 상자 겹수, 배치 순서는 이미지 그대로 만든다. AI가 자기 판단으로 구조를 바꾸거나 상자를 덧씌우지 않는다. (예: "페이지 바탕이 회색이니 흰 판에 올린다"는 이유로 `Card`를 씌우지 않는다.)
2. **이미지에서 상자가 한 겹이면 화면에서도 한 겹이다.** 아래 부품은 이미 자체 테두리·바탕이 있으므로 `Card`로 다시 감싸지 않는다.
   - `DataTable`, `FormTable` (테두리 + 바탕)
   - `Card`, `StatCard`, `MenuTile` (카드 자체)
   - `FormActionBar` (위 테두리 + 바탕)
   - 상자가 하나 더 생기면 사용자는 다른 영역으로 읽는다. 묶음 단위와 위계가 흐려진다.
3. 대응 목록(1장 "Mic에 없는 UI" 4번)을 만들 때 부품마다 자체 테두리·바탕이 있는지 적고, 겹쳐 감싸는 곳이 없는지 확인한다. (예: "사용자 정보 표 → FormTable (자체 테두리, Card 안 씀)")
4. 이 문서의 UX 원칙(4장·7장)과 이미지 배치가 다르면 **배치·구조는 이미지가 우선**이다. UX·UI를 고치는 것은 사용자가 정해서 따로 요청한다. AI가 먼저 고치지 않는다.
5. 1장의 규칙은 그대로다. 설치된 Mic 부품만 쓰고, 없는 UI는 빨간 점선 빈 자리로 두고, 없는 옵션은 `className`으로 덮어써 만들지 않는다.

### 화면 크기 (데스크톱 전용)

- Mic는 **데스크톱 대시보드용**이다. 휴대폰 화면은 대응하지 않는다. 휴대폰 너비에서 넘치거나 깨지는 것은 고칠 대상이 아니다.
- 반응형은 부품에 이미 들어 있는 기준만 쓴다(예: `SectionCards`의 `sm`·`xl` 줄바꿈, `SiteHeader`의 `md` 미만 검색칸 숨김). 화면에서 휴대폰용 배치를 새로 만들지 않는다.

## 5. 접근성

- 아이콘만 있는 버튼은 `aria-label`을 붙이고, 장식 아이콘은 `aria-hidden`.
- 포커스 링(`ring-alpha-ring-50`)·비활성(`opacity-50`)·오류(`aria-invalid`) 표시를 지우지 않는다.
- 라벨은 `Label htmlFor` 또는 `FieldLabel`로 연결한다. 표의 체크박스에는 `aria-label`.
- 대비: 본문 4.5:1 이상. `muted-foreground` 글자를 `muted` 바탕 위에 작게 쓰지 않는다.

## 6. 한글 글자·문구

### 글자 배치

1. 한글에 `break-all`을 쓰지 않는다. 글자 단위로 끊겨서 "등록했 / 어요"처럼 읽기 어려워진다.
2. LOT 번호·품목 코드·URL처럼 띄어쓰기 없이 긴 값만 칸 안에서 줄바꿈을 허용한다. 넘치는 값에만 `wrap-anywhere`를 쓴다.
3. 한글에 기울임꼴(`italic`)을 쓰지 않는다. 강조가 필요하면 굵기나 색 토큰을 쓴다.
4. 숫자는 천 단위 쉼표(1,250 EA)를 쓰고, 한 화면에서는 같은 방식으로 맞춘다. 표의 숫자 열은 `tabular-nums`를 쓴다.
5. 글자는 12px(`text-xs`)보다 작게 쓰지 않는다.
6. 버튼·배지·탭(`Button`·`Badge`·`TabsTrigger`) 글자는 항상 한 줄로 다 보여야 한다. 부품에 한 줄 고정(`whitespace-nowrap`)과 줄어들지 않음(`shrink-0`)이 들어 있다.
   - 이 부품과 바로 감싼 칸에 다음을 쓰지 않는다: `min-w-0`, `truncate`, `overflow-hidden`, `whitespace-normal`, `max-w-*`, `w-[…]`, `basis-0`, 글자 크기 덮어쓰기(`text-xs` 등).
   - 버튼을 2개 이상 가로로 둘 때 `grid-cols-2`·`grid-cols-3` 같은 같은 폭 격자나 `1fr` 칸에 넣지 않는다. 글자 길이와 상관없이 **항상** `flex flex-wrap gap-2`로 두고, 넘치면 다음 줄로 내려가게 한다.
   - 오른쪽 끝에 고정할 버튼(접기 등)이 있으면 `flex items-start gap-2` 안에 `flex flex-1 flex-wrap gap-2` 묶음과 그 버튼을 나란히 둔다.
   - 글자 내용과 글자 크기는 바꾸지 않는다. 줄임말·아이콘만 남기기·영어로 바꾸기도 하지 않는다. 디자인·이미지에 적힌 문구는 그대로다.
7. 보여 주기만 하는 글자(카드 제목·이름·표 칸)가 칸보다 길면 `truncate`로 말줄임하고, 같은 요소에 `title`로 전체 글자를 넣는다. 누르는 요소(6번)에는 이 방법을 쓰지 않는다.

### 문구

아래 규칙은 **AI가 새로 쓰는 문구에만** 적용한다(알림, 빈 화면, 오류, 확인 팝업). 디자인이나 이미지에 적힌 문구는 그대로 쓴다.

8. 맞춤법을 지킨다. 돼요 / 됐어요 / 할게요 / 며칠 (✕ 되요, 됬어요, 할께요, 몇일)
9. 띄어쓰기를 지킨다. 할 수 있어요 / 등록할 때 / 작업 중이에요
10. 버튼 이름 끝에는 마침표를 찍지 않는다. "저장" (✕ "저장.")
11. 오류 문구에는 무슨 일이 생겼는지와 지금 할 일을 같이 쓴다. "LOT 번호가 이미 등록돼 있어요. 다른 번호를 입력해 주세요." (✕ "오류가 발생했습니다")
12. 버튼 이름은 누르면 일어나는 일로 쓴다. 실적 등록 / 작업 시작 / 닫기 (✕ 확인, 예)
13. 한 문장에는 한 가지 내용만 쓴다.
14. 쉬운 말로 쓴다. 금일 → 오늘, 익일 → 다음 날. 단, 공정·실적·LOT·설비 같은 업무 용어는 그대로 둔다.
15. 데이터가 아니라 사용자가 한 일로 쓴다. "실적을 등록했어요" (✕ "실적 데이터가 생성되었습니다")
16. 같은 내용이면 할 수 있는 쪽으로 쓴다. "작업 시작 후에 수정할 수 있어요" (✕ "작업 시작 전에는 수정할 수 없어요")
17. 사물은 높이지 않는다. "결과가 나왔어요" (✕ "결과가 나오셨습니다")
18. 겁주거나 탓하는 문구를 쓰지 않는다. (✕ "잘못 입력하셨습니다", "데이터가 모두 사라집니다!")
19. 느낌표는 거의 쓰지 않고, 오류 문구에는 쓰지 않는다.
20. 이미지 대체 텍스트에 "이미지", "사진"을 넣지 않는다. "설비 3호기 정면" (✕ "설비 3호기 이미지")
21. 확인 팝업의 버튼은 질문에 맞는 동작으로 쓴다. "삭제할까요?" → [취소] [삭제] (✕ [아니요] [예])

## 7. 화면 완성도

Mic로 화면을 만들 때마다 따로 시키지 않아도 이 장을 함께 지킨다. **판단 기준은 이 문서다.** 다른 디자인 점검 규칙이나 도구와 부딪히면 이 문서가 우선이고, Mic 부품의 모양·동작 자체는 고칠 대상이 아니다. 휴대폰 너비는 점검하지 않는다(4장 "화면 크기").

### 만들지 않는 것 (근거 없는 장식)

1. 장식용 그라디언트, 빛 번짐, 흐린 원, 그라디언트 글자를 넣지 않는다.
2. 제목마다 아이콘 상자를 붙이지 않는다. 카드 왼쪽 색 띠는 상태·선택을 나타낼 때만 쓴다.
3. 설명 문단을 카드 여러 개로 쪼개지 않는다. 카드 안에 카드는 받은 이미지에 그렇게 있을 때만 쓰고, 자체 테두리가 있는 부품(`DataTable`·`FormTable` 등)을 `Card`로 다시 감싸지 않는다(4장 "화면설계서(이미지)를 받았을 때"). 4장의 `SectionCards`(StatCard)·차트 카드·MenuTile처럼 Mic가 정한 카드 배치는 그대로 쓴다.
4. 순서가 없는 내용에 01·02·03 같은 번호를 붙이지 않는다.
5. 받은 자료에 없는 수치·기능·효과를 지어내지 않는다. "혁신적인", "강력한" 같은 꾸밈말을 쓰지 않는다. 예시 데이터는 실제 업무 데이터 모양(품목명·LOT·수량·날짜)으로 채운다.
6. 색은 토큰 역할대로만 쓴다. 상태 색(destructive·success 등)은 상태를 나타낼 때만 쓴다. 상태는 색만으로 구분하지 않고 글자(Badge 문구 등)를 함께 쓴다.
7. 같은 주요 버튼을 영역마다 반복하지 않는다. 버튼 이름과 누른 뒤 실제로 일어나는 일이 같아야 한다.
8. 긴 설정, 비교, 여러 단계 작업은 `Dialog`에 넣지 않고 화면으로 만든다. `Dialog`는 짧은 입력·확인에만 쓴다.

### 조작감 (화면 코드에서 직접 넣는 것만)

9. 움직임은 Mic 부품에 들어 있는 것만 쓴다. 화면 코드에서 등장 효과(차례로 나타나기, 튀기, 떠오르기)를 새로 넣지 않는다. 꼭 필요하면 `transform`·`opacity`만, 300ms 이하로 하고 `motion-reduce:` 대응을 같이 넣는다. `transition-all`은 쓰지 않는다.
10. 데이터를 보여 주는 영역은 내용이 있을 때만 만들지 않는다. 비었을 때·불러오는 중·오류 상태도 같이 만든다. 빈 화면·오류에는 다음에 할 일(버튼이나 안내)을 둔다.
11. 불러오는 중에는 모양을 아는 곳은 `Skeleton`을 쓴다. `Spinner`는 오래 걸리는 작업에만 쓴다.
12. 이미지·차트 자리는 높이나 비율을 먼저 정해 둔다. 불러온 뒤 화면이 밀리지 않게 한다.
13. 입력 검사는 칸을 벗어날 때 처음 하고, 오류가 난 칸은 고치는 즉시 오류를 지운다.
14. 삭제처럼 되돌릴 수 없는 일의 확인은 `AlertDialog`를 쓴다. 입력 중인 `Dialog`는 바깥을 눌러도 닫히지 않게 한다(`DialogContent`의 `onInteractOutside`).

### 다 만든 뒤 점검

화면을 다 만들면 결과를 알리기 전에 직접 만든 화면 코드를 아래 항목으로 **하나씩 찾아보고**, 걸린 것은 고친 뒤 알린다. 눈으로 훑고 "통과"라고 쓰지 않는다. 항목마다 실제로 코드에서 찾아본 방법(검색한 글자·클래스)을 근거로 남긴다.

1. **값 직접 쓰기 0개**: hex(`#`), `[`…`px]`·`[`…`]` 임의 값(예: `flex-[1_1_180px]`, `w-[312px]`), `style={{}}` 안 숫자
2. **부품 덮어쓰기 0개**: Mic 부품에 붙인 `className`에 크기·글자·둥글기·정렬을 바꾸는 클래스(예: `CardTitle className="text-2xl"`, `Button className="w-full justify-between"`)
3. **흉내 조립·빠진 요소 0개**: 이미지 요소 수 = 화면에 만든 것 + 빨간 점선 빈 자리 (1장 5번·9번). 차트 축·점선·알림 점처럼 작은 것 포함
4. **Mic 규격 아닌 크기 0개**: `size="xs"`·`"icon-sm"`·`"icon-xs"`, `InputGroupButton` (3장)
5. **사이드바 구조**: 설정·도움말 같은 메뉴가 `SidebarFooter`에 없음 (4장)
6. **버튼 동작**: 버튼마다 이름과 실제 동작이 같음. 복사 버튼은 실제로 복사(`navigator.clipboard`), 내려받기는 실제 파일 (7장 7번)
7. **지어낸 수치 0개**: 기간·필터를 바꿀 때 받은 데이터에 없는 숫자를 계산해 만들지 않음(예: 주간 값 ×4로 월간 만들기) (7장 5번)
8. **데이터 영역 상태**: 표뿐 아니라 지표 카드·차트·목록까지 데이터를 보여 주는 영역마다 빈·불러오는 중·오류 상태가 있음 (7장 10번)
9. **상자 겹수**: 이미지보다 상자 겹수가 많은 곳 0개 (자체 테두리 부품을 `Card`로 감싼 곳 0개)
10. **움직임·한글**: 9번(움직임)과 6장(한글) 위반 0개, 버튼·배지·탭과 바로 감싼 칸에 6장 6번의 금지 클래스 0개, 버튼 묶음은 전부 `flex-wrap`

보고 끝에는 한 줄 요약 대신 아래 형식의 점검표를 붙인다. 항목마다 **통과 / N개 고침 / 못 고침** 중 하나와 근거를 적는다.

```
점검
1. 값 직접 쓰기: 통과 — "#", "px]", "style={{" 검색 0건
2. 부품 덮어쓰기: 2개 고침 — CardTitle text-2xl 삭제, Button w-full 삭제
3. 흉내 조립·빠진 요소: 3개 고침 — 채팅 말풍선·차트 세로축·알림 점 → 빨간 점선
…
```
