export interface FileDataType {
  id: number;
  size: string;
  downloadCount: number;
  filename: string;
}

export interface uploadedFileDataType {
  filename: string;
  originalFilename: string;
  fileSize: number;
  contentType: string;
}

export interface Register {
  id: number;
  title: string;
  content: string;
  view: number;
  attachedFile: { id: number; attachedFileInfos: Array<FileDataType> };
}

export interface ListDataType {
  id: number;
  title: string;
  view: number;
}

export interface subMenuDataType {
  menuName: string;
  url: string;
  subMenu: Array<string>;
}

export interface menuDataType {
  menuName: string;
  url: string;
  subMenu: Array<subMenuDataType>;
}
