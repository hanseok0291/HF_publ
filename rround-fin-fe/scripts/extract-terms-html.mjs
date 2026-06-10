import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function normalizeHtmlIndent(text) {
  return text
    .split('\n')
    .map((line) => (line.startsWith('            ') ? line.slice(12) : line))
    .join('\n')
    .trim();
}

function jsxToHtml(jsx) {
  return normalizeHtmlIndent(
    jsx
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/className=/g, 'class=')
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&')
      .replace(/\{['"`]([^'"`]*?)['"`]\}/g, '$1')
      .replace(/\s+$/gm, '')
      .trim(),
  );
}

function extractFromComponent(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const marker = '<div className="terms-pub terms-legal-html">';
  const start = src.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find legal html marker in ${filePath}`);
  }

  let depth = 0;
  let i = start;
  let started = false;

  while (i < src.length) {
    if (src.slice(i, i + 4) === '<div') {
      depth += 1;
      started = true;
    } else if (src.slice(i, i + 6) === '</div>') {
      depth -= 1;
      if (started && depth === 0) {
        const block = src.slice(start + marker.length, i);
        return jsxToHtml(block);
      }
      i += 6;
      continue;
    }
    i += 1;
  }

  throw new Error(`Could not extract legal html block from ${filePath}`);
}

const outDir = path.join(root, 'src', 'content', 'terms');
fs.mkdirSync(outDir, { recursive: true });

const mappings = [
  ['src/components/pub/terms/AdvertisingConsent.js', 'phone-advertising-info-reception.html'],
  ['src/components/pub/terms/PersonalizedAdConsent.js', 'phone-personalized-ad-personal-info.html'],
  ['src/components/pub/terms/ServiceTerms.js', 'hecto-financial-service-terms.html'],
];

for (const [srcFile, outFile] of mappings) {
  const html = extractFromComponent(path.join(root, srcFile));
  fs.writeFileSync(path.join(outDir, outFile), `${html}\n`, 'utf8');
  console.log(`Wrote ${outFile} (${html.length} chars)`);
}
