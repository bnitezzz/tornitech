import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadEnv(path = resolve(root, '.env.local')) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      })
  );
}

export function maskSecret(value, visible = 4) {
  if (!value) return '(vacío)';
  if (value.length <= visible * 2) return '***';
  return `${value.slice(0, visible)}...${value.slice(-visible)}`;
}

export function isPlaceholder(value) {
  if (!value) return true;
  return /your-|re_xxxx|SG\.xxxx|xxxxxxxx|example\.com|your-project/i.test(value);
}

export const PROJECT_ROOT = root;
