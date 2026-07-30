import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("renders the DABU MATH learning hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DABU MATH<\/title>/i);
  assert.match(html, /필요한 수업과 자료를/);
  assert.match(html, /최근 수업/);
  assert.match(html, /새로운 소식/);
  assert.match(html, /고3 미적분 A/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps content editable and GitHub Pages deployment ready", async () => {
  const [content, workflow, nextConfig, packageJson] = await Promise.all([
    readFile(new URL("../app/site-content.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(content, /announcements/);
  assert.match(content, /videos/);
  assert.match(content, /documents/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(packageJson, /"build:pages"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(projectRoot);
});
