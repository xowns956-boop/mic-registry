// registry.json 생성: components/ui · components/blocks · theme-provider · hooks 를 읽어
// 각 파일의 import에서 npm 의존성(설치된 정확한 버전)과 레지스트리 의존성을 자동으로 채운다.
// 사용: REGISTRY_BASE=https://<주소> node scripts/build-registry.mjs  (기본값 http://localhost:3200)
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const VERSION = "0.1.0"
const BASE = (process.env.REGISTRY_BASE || "http://localhost:3200").replace(/\/$/, "")
const url = (name) => `${BASE}/r/${VERSION}/${name}.json`

const pkgVersion = (name) => JSON.parse(readFileSync(join(root, "node_modules", name, "package.json"), "utf8")).version
const NOT_DEPS = new Set(["react", "react-dom", "next"])

const sources = [
  ...readdirSync(join(root, "components/ui")).filter((f) => f.endsWith(".tsx")).map((f) => ({ path: `components/ui/${f}`, kind: "ui" })),
  ...readdirSync(join(root, "components/blocks")).filter((f) => f.endsWith(".tsx")).map((f) => ({ path: `components/blocks/${f}`, kind: "block" })),
  { path: "components/theme-provider.tsx", kind: "component" },
  { path: "hooks/use-mobile.ts", kind: "hook" },
]
const nameOf = (p) => basename(p).replace(/\.(tsx|ts)$/, "")

const items = sources.map(({ path, kind }) => {
  const src = readFileSync(join(root, path), "utf8")
  const imports = [...src.matchAll(/from "([^"]+)"/g)].map((m) => m[1])
  const pkgs = [...new Set(imports.filter((i) => !i.startsWith(".") && !i.startsWith("@/")).map((i) => (i.startsWith("@") ? i.split("/").slice(0, 2).join("/") : i.split("/")[0])))]
    .filter((p) => !NOT_DEPS.has(p))
  const local = [...new Set(imports.filter((i) => i.startsWith("@/components/") || i.startsWith("@/hooks/")).map(nameOf))]
  const figma = (src.match(/\/\/ (Mic v0\.1 · Figma[^\n]*)/) || [])[1]
  const name = nameOf(path)
  return {
    name,
    type: kind === "ui" ? "registry:ui" : kind === "hook" ? "registry:hook" : kind === "block" ? "registry:block" : "registry:component",
    title: name,
    description: figma ?? "Mic Design System v0.1",
    dependencies: pkgs.map((p) => `${p}@${pkgVersion(p)}`),
    registryDependencies: [url("mic-foundations"), ...local.map(url)],
    files: [
      {
        path,
        type: kind === "ui" ? "registry:ui" : kind === "hook" ? "registry:hook" : "registry:component",
        ...(kind === "block" ? { target: `components/blocks/${basename(path)}` } : {}),
      },
    ],
  }
})

const regPath = join(root, "registry.json")
const registry = JSON.parse(readFileSync(regPath, "utf8"))
const foundations = registry.items.find((i) => i.name === "mic-foundations")
foundations.files = [{ path: "docs/mic.md", type: "registry:file", target: "~/docs/mic.md" }]

const bundle = {
  name: "mic",
  type: "registry:block",
  title: "Mic Design System",
  description: `Mic Design System v${VERSION} 전체 — 토큰 + 부품 ${items.length}개 + AI 규칙 문서(docs/mic.md)`,
  registryDependencies: [url("mic-foundations"), ...items.map((i) => url(i.name))],
  files: [{ path: "docs/mic.md", type: "registry:file", target: "~/docs/mic.md" }],
}

registry.homepage = BASE
registry.items = [foundations, bundle, ...items]
writeFileSync(regPath, JSON.stringify(registry, null, 2) + "\n")
console.log(`${registry.items.length} items · base ${BASE}/r/${VERSION}/`)
