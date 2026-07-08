#!/usr/bin/env node
/**
 * Syncs types/database.ts with the local SQL schema when Supabase CLI
 * is unavailable (remote generation requires `supabase login`).
 *
 * Usage: node scripts/generate-supabase-types.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, '..', 'types', 'database.ts');

const header = `/**
 * Supabase database types — synced from supabase/schema.sql + migrations 002/003.
 * Regenerate remotely: npm run db:types (requires \`supabase login\`).
 */
`;

let content = readFileSync(target, 'utf8');
content = content.replace(/^\/\*\*[\s\S]*?\*\/\n?/, '');
content = header + content.trimStart();

if (!content.includes('Relationships:')) {
  content = content.replace(
    /(\s+Update: \{[\s\S]*?\n\s+\};\n)(\s+\};)/g,
    '$1        Relationships: [];\n$2'
  );
}

if (!content.includes('applications: string | null')) {
  content = content.replace(
    /(products: \{\s+Row: \{[\s\S]*?)          display_order: number;\n          created_at: string;/,
    `$1          applications: string | null;
          sectors: string | null;
          display_order: number;
          created_at: string;`
  );
  content = content.replace(
    /(products: \{\s+Row:[\s\S]*?Insert: \{[\s\S]*?)          display_order\?: number;\n          created_at\?: string;/,
    `$1          applications?: string | null;
          sectors?: string | null;
          display_order?: number;
          created_at?: string;`
  );
  content = content.replace(
    /(products: \{\s+Row:[\s\S]*?Update: \{[\s\S]*?)          display_order\?: number;\n          created_at\?: string;/,
    `$1          applications?: string | null;
          sectors?: string | null;
          display_order?: number;
          created_at?: string;`
  );
}

const addColumn = (marker, rowField, rowAfter, insertField, updateField) => {
  if (content.includes(rowField.trim())) return;
  const start = content.indexOf(marker);
  if (start === -1) return;

  const rowIdx = content.indexOf(rowAfter, start);
  if (rowIdx !== -1) content = content.slice(0, rowIdx + rowAfter.length) + rowField + content.slice(rowIdx + rowAfter.length);

  const insertIdx = content.indexOf('Insert: {', start);
  const insertClose = content.indexOf('};', insertIdx);
  content = content.slice(0, insertClose) + insertField + content.slice(insertClose);

  const updateIdx = content.indexOf('Update: {', start);
  const updateClose = content.indexOf('};', updateIdx);
  content = content.slice(0, updateClose) + updateField + content.slice(updateClose);
};

addColumn(
  'leads: {',
  '          updated_at: string;\n',
  '          created_at: string;\n',
  '          updated_at?: string;\n',
  '          updated_at?: string;\n'
);

addColumn(
  'contact_submissions: {',
  '          lead_id: string | null;\n          updated_at: string;\n',
  '          status: string;\n',
  '          lead_id?: string | null;\n          updated_at?: string;\n',
  '          lead_id?: string | null;\n          updated_at?: string;\n'
);

addColumn(
  'quote_requests: {',
  '          lead_id: string | null;\n          updated_at: string;\n',
  '          source: string;\n',
  '          lead_id?: string | null;\n          updated_at?: string;\n',
  '          lead_id?: string | null;\n          updated_at?: string;\n'
);

addColumn(
  'newsletter_subscribers: {',
  '          lead_id: string | null;\n',
  '          company: string | null;\n',
  '          lead_id?: string | null;\n',
  '          lead_id?: string | null;\n'
);

addColumn(
  'site_config: {',
  '          created_at: string;\n',
  '          is_public: boolean;\n',
  '          created_at?: string;\n',
  '          created_at?: string;\n'
);

if (!content.includes('product_sectors:')) {
  const junctionTables = `      product_sectors: {
        Row: {
          id: string;
          product_id: string;
          sector_id: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          sector_id: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          sector_id?: string;
        };
        Relationships: [];
      };
      product_certifications: {
        Row: {
          id: string;
          product_id: string;
          certification_id: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          certification_id: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          certification_id?: string;
        };
        Relationships: [];
      };
`;
  content = content.replace(/(\s+products: \{)/, `\n${junctionTables}$1`);
}

if (!content.includes('v_leads_with_downloads')) {
  content = content.replace(
    /Views: \{\};/,
    `Views: {
      v_leads_with_downloads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string;
          accepts_marketing: boolean;
          source: string;
          created_at: string;
          total_downloads: number | null;
          downloaded_documents: string[] | null;
        };
        Relationships: [];
      };
    };`
  );
}

content = content.replace(
  /Functions: \{[\s\S]*?\};\s*(?=Enums:)/,
  `Functions: {
      increment_download_count: {
        Args: { catalog_id: string };
        Returns: undefined;
      };
      set_updated_at: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
`
);

if (!content.includes('CompositeTypes:')) {
  content = content.replace(/Enums: \{\};/, `Enums: {};
    CompositeTypes: {};`);
}

writeFileSync(target, content);
console.log('Updated', target);
