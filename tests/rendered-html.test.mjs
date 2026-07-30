import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the DABU MATH class-address welcome page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DABU MATH<\/title>/i);
  assert.match(html, /전달받은 수업 주소/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders a class-specific access-code gate", async () => {
  const response = await render("/common2/a");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /공통수학2 A반/);
  assert.match(html, /수업 입장 코드/);
  assert.doesNotMatch(html, /dabu-c2a-82/);
  assert.doesNotMatch(html, /WnRVWf0gHmY/);
});

test("renders a public feedback demo without an access-code gate", async () => {
  const response = await render("/demo");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /공개 데모/);
  assert.match(html, /코드 없이 체험 중/);
  assert.match(html, /최근 수업/);
  assert.match(html, /WnRVWf0gHmY/);
  assert.doesNotMatch(html, /수업 입장 코드를 입력해 주세요/);
});

test("keeps content editable and GitHub Pages deployment ready", async () => {
  const [content, routes, workflow, nextConfig, packageJson, gitignore] =
    await Promise.all([
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../app/[...classPath]/page.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
  ]);

  assert.match(content, /common2a/);
  assert.match(content, /calculus1b/);
  assert.match(content, /codeHash/);
  assert.doesNotMatch(content, /dabu-c2a-82/);
  assert.match(routes, /generateStaticParams/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(packageJson, /"build:pages"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(gitignore, /CLASS-CODES\.private\.txt/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(projectRoot);
});
