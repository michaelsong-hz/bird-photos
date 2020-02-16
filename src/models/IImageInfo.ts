export interface IImageInfo {
  url: string;
  metadata: IImageInfoMeta;
}

export interface IImageInfoMeta {
  date: string;
  fNum: string;
  fDen: string;
  eNum: string;
  eDen: string;
  ISO: string;
}
