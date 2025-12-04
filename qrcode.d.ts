declare module 'qrcode' {
  export function toDataURL(
    data: string | any[],
    options?: any
  ): Promise<string>
  
  export function toString(
    data: string | any[],
    options?: any
  ): Promise<string>
  
  export function toCanvas(
    canvas: any,
    data: string | any[],
    options?: any
  ): Promise<void>
}
