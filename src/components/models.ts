export interface FileDataType {
  id: Number;
  size: String;
  downloadCount: Number;
  filename: String;
}

export interface Register {
  id: Number;
  title: String;
  content: String;
  view: number;
  attachedFile: { id: Number; attachedFileInfos: Array<FileDataType> };
}

export interface ListDataType {
  id: Number;
  title: String;
  view: Number;
}

export interface subMenuDataType {
  menuName: String;
  url: String;
  subMenu: Array<String>;
}

export interface menuDataType {
  menuName: String;
  url: String;
  subMenu: Array<subMenuDataType>;
}
