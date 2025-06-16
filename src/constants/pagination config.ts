export const paginationConfig = {
  DEFAULT_TASKS_PER_PAGE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,
  MAX_VISIBLE_PAGES: 5,
} as const;
