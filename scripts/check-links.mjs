import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, sep, join } from 'node:path';
import { site } from '../src/config/site.ts';

// Validate generated files without a server or external network requests.
const output = resolve(process.argv[2] ?? 'dist');
const base = `/${site.base.split('/').filter(Boolean).join('/')}`;
const basePrefix = base === '/' ? '' : base;
const files = [];
function walk(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) walk(path);
    else if (item.name.endsWith('.html')) files.push(path);
  }
}
walk(output);
assert(files.length > 0, 'No generated HTML files found');
const documents = new Map(files.map((path) => [path, readFileSync(path, 'utf8')]));
const ids = new Map([...documents].map(([path, html]) => [path, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))]));
const errors = [];
let checked = 0;

for (const [file, html] of documents) {
  const localPath = `/${relative(output, file).split(sep).join('/')}`.replace(/index\.html$/, '');
  const page = new URL(`${basePrefix}${localPath}`, 'https://check.invalid');
  if ((html.match(/<h1\b/g) ?? []).length !== 1) errors.push(`${localPath}: expected one h1`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${localPath}: missing title`);
  if (!/name="description"/.test(html)) errors.push(`${localPath}: missing description`);

  for (const tag of html.matchAll(/<(?:a|link|img|script|source)\b[^>]*>/g)) {
    for (const match of tag[0].matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;
      const url = new URL(value, page);
      if (url.origin !== page.origin) continue;
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { errors.push(`${localPath}: invalid URL ${value}`); continue; }
      if (basePrefix && pathname !== basePrefix && !pathname.startsWith(`${basePrefix}/`)) {
        errors.push(`${localPath}: path is outside base: ${value}`);
        continue;
      }
      const internal = pathname.slice(basePrefix.length) || '/';
      let target = resolve(output, `.${internal}`);
      if (!target.startsWith(`${output}${sep}`) && target !== output) { errors.push(`${localPath}: path escapes output: ${value}`); continue; }
      if (internal.endsWith('/') || !existsSync(target)) {
        const index = join(target, 'index.html');
        if (existsSync(index)) target = index;
      }
      checked++;
      if (!existsSync(target)) { errors.push(`${localPath}: missing target ${value}`); continue; }
      if (url.hash && documents.has(target)) {
        const anchor = decodeURIComponent(url.hash.slice(1));
        if (!ids.get(target)?.has(anchor)) errors.push(`${localPath}: missing anchor ${value}`);
      }
      if (tag[0].startsWith('<img') && !/\balt="[^"]+"/.test(tag[0])) errors.push(`${localPath}: image requires descriptive alt text`);
    }
  }
}

assert(!existsSync(join(output, 'projects/sample-project/index.html')), 'Draft project was published');
assert(!existsSync(join(output, 'blog/sample-note/index.html')), 'Draft post was published');
assert(existsSync(join(output, '404.html')), '404.html was not generated');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} pages and ${checked} local links/assets (base: ${basePrefix || '/'}).`);
}
