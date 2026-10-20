# Mic Design System v0.1 — shadcn 레지스트리

Figma `Mic-Design-system v0.1` (fileKey `Q1cGtxx0jsnSwfaPnJloYg`)을 React + Tailwind CSS v4 + shadcn 부품으로 옮긴 레지스트리.

## 설치 (React + Tailwind v4 + shadcn 초기화된 프로젝트)

```bash
npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.0/mic-foundations.json https://xowns956-boop.github.io/mic-registry/r/0.1.0/mic.json
```

- `mic-foundations.json`을 **꼭 함께** 적는다. 빠뜨리면 shadcn 기본 색이 남는다.
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/mic-registry/r/0.1.0/button.json`
- 앱 최상위를 `ThemeProvider`(`components/theme-provider`)로 감싼다. 토스트를 쓰면 `<Toaster />`도 둔다.
- AI 규칙과 부품 목록: 설치 후 `docs/mic.md`

## 이 저장소에서 할 일

| 할 일 | 명령 |
|---|---|
| 미리보기 화면 | `npm run dev` |
| Figma 변수가 바뀌었을 때 | `tokens/figma/*.txt` 갱신 → `npm run tokens` |
| 레지스트리 파일 만들기 | `node scripts/build-registry.mjs && npx shadcn build -o public/r/0.1.0` |
| 배포 | `main`에 올리면 GitHub Actions가 GitHub Pages로 배포 |
