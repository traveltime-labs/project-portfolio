declare module 'jsvectormap' {
    interface VectorMapOptions {
      selector: string | HTMLElement;
      map: string;
      [key: string]: any;
    }
  
    export default class VectorMap {
      constructor(options: VectorMapOptions);
    }
  }
  