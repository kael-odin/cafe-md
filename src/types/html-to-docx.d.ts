declare module 'html-to-docx' {
  interface TableOptions {
    row?: {
      cantSplit?: boolean;
    };
  }

  interface HTMLtoDOCXOptions {
    orientation?: 'portrait' | 'landscape';
    margins?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    title?: string;
    table?: TableOptions;
    footer?: boolean;
    header?: boolean;
  }

  function HTMLtoDOCX(
    htmlString: string,
    headerHTMLString?: string | null,
    options?: HTMLtoDOCXOptions,
    footerHTMLString?: string | null
  ): Promise<Blob>;
  
  export default HTMLtoDOCX;
}
