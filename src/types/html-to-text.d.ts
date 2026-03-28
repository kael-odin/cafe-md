declare module 'html-to-text' {
  export function htmlToText(html: string, options?: {
    wordwrap?: number | false;
    selectors?: Array<{
      selector: string;
      options?: Record<string, unknown>;
    }>;
  }): string;
}
