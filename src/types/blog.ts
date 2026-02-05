export type BlogBlock =
  | {
    id: string;
    type: 'heading';
    value: string;
    level: 'h2' | 'h3';
    color?: string;
  }
  | {
    id: string;
    type: 'paragraph';
    value: string;
    color?: string;
  }
  | {
    id: string;
    type: 'image';
    image: {
      url: string;
      imageFileId:string;
      
    }
    caption?: string;
      width?: number;
      height?: number;
      alt: string;
      aspectRatio: string
  }
  | {
    id: string;
    type: 'callout';
    value: string;
    bgColor: string;
    textColor: string;
  }
  | {
    id: string;
    type: 'quote';
    value: string;
    color?: string;
  };
