export type DolarRange = {
  id: number;
  date: string;
  value: number;
};

export type DailyStars = {
  date: Date;
  value: number;
};

export enum TypeSelectionDate {
  START = "start",
  END = "end",
}

export enum TypeInputHandle {
  SEARCH_DATE = 'searchDate',
  EDIT_CELL = 'editCell',
  SEARCH_VALUE = 'searchValue'
}