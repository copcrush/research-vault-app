const paths = {
  vault: "M5 3h14v18H5z M9 7h6v10H9z M3 7h4 M3 17h4 M12 10v4",
  shield: "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z M9 12l2 2 4-4",
  lock: "M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v11H5z M12 14v3",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  folder: "M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3z",
  file: "M5 3h9l5 5v13H5z M14 3v6h5 M9 13h6 M9 17h4",
  book: "M12 5v16 M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
  activity: "M3 12h4l3-8 4 16 3-8h4",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z",
  search: "M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15 M16 16l5 5",
  chevron: "m9 5 7 7-7 7",
  plus: "M12 5v14 M5 12h14",
  arrow: "M12 19V5 M6 11l6-6 6 6",
  right: "M4 12h16 M14 6l6 6-6 6",
  quote: "M4 5h6v8H5v5H3v-7z M15 5h6v8h-5v5h-2v-7z",
  check: "m5 12 4 4L19 6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2",
  branch: "M6 3v12a4 4 0 0 0 4 4h8 M6 9h8a4 4 0 0 0 4-4V3 M15 16l3 3-3 3",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20 }: { name: IconName; size?: number; }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
