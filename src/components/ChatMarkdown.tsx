"use client";
// Rendu des reponses de l'assistant : listes a puces, gras, liens internes cliquables.
// Mini-markdown volontairement limite (pas de HTML brut) : titres, listes, **gras**,
// [texte](lien), adresses neofidu.ch/... et chemins /xxx. Les tirets longs sont neutralises.

import Link from "next/link";
import type { ReactNode } from "react";

const SITE = /^(?:https?:\/\/)?(?:www\.)?neofidu\.ch/i;

function cleanText(t: string): string {
  return t
    .replace(/\s+[—–]\s+/g, ", ") // tiret long entre deux mots -> virgule
    .replace(/[—–]/g, "-")
    .replace(/\r/g, "");
}

function toHref(raw: string): { href: string; internal: boolean } {
  const u = raw.trim().replace(/[.,;:!?)]+$/, "");
  if (u.startsWith("/")) return { href: u, internal: true };
  if (SITE.test(u)) {
    const path = u.replace(SITE, "") || "/";
    return { href: path.startsWith("/") ? path : `/${path}`, internal: true };
  }
  if (/^https?:\/\//i.test(u)) return { href: u, internal: false };
  return { href: `https://${u}`, internal: false };
}

function LinkEl({ href, children }: { href: string; children: ReactNode }) {
  const { href: h, internal } = toHref(href);
  const cls = "text-primary underline underline-offset-2 hover:no-underline break-words";
  return internal ? (
    <Link href={h} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={h} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

// Gras, liens markdown, liens nus (neofidu.ch/..., https://...)
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re =
    /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|((?:https?:\/\/)?(?:www\.)?neofidu\.ch(?:\/[\w\-./#?=&%]*)?|https?:\/\/[^\s)]+)/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${k++}`;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold">
          {inline(m[1], key)}
        </strong>
      );
    } else if (m[2] !== undefined) {
      out.push(
        <LinkEl key={key} href={m[3]}>
          {m[2]}
        </LinkEl>
      );
    } else {
      // lien nu : on retire la ponctuation finale du lien
      const raw = m[4];
      const trail = raw.match(/[.,;:!?)]+$/)?.[0] ?? "";
      const url = trail ? raw.slice(0, -trail.length) : raw;
      out.push(
        <LinkEl key={key} href={url}>
          {url.replace(/^https?:\/\/(www\.)?/i, "")}
        </LinkEl>
      );
      if (trail) out.push(trail);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  // Asterisques orphelins restants
  return out.map((n) => (typeof n === "string" ? n.replace(/\*\*/g, "") : n));
}

export function ChatMarkdown({ text }: { text: string }) {
  const lines = cleanText(text).split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const key = `l${blocks.length}`;
    const items = list.items.map((it, i) => <li key={i}>{inline(it, `${key}-${i}`)}</li>);
    blocks.push(
      list.ordered ? (
        <ol key={key} className="list-decimal pl-5 space-y-1">
          {items}
        </ol>
      ) : (
        <ul key={key} className="list-disc pl-5 space-y-1">
          {items}
        </ul>
      )
    );
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || /^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flush();
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const num = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || num) {
      const ordered = Boolean(num);
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? num)![1]);
      continue;
    }
    flush();
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    const key = `p${blocks.length}`;
    blocks.push(
      heading ? (
        <p key={key} className="font-semibold">
          {inline(heading[1].replace(/\*\*/g, ""), key)}
        </p>
      ) : (
        <p key={key}>{inline(line, key)}</p>
      )
    );
  }
  flush();
  return <div className="space-y-2">{blocks}</div>;
}
