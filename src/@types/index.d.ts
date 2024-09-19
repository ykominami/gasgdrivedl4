type DataRangex = { x: number; y: number; height: number; width: number };

type StringOrNull = string | null;
type AssocArray = Record<string, StringOrNull>;
type ThreeItemsOrNull = [number, number, number] | [null, null, null];

type ThreeItemsAssocArray = Record<number, [ThreeItemsOrNull]>;

interface IItem {
  url: StringOrNull;
  name: string;
}

type ItemArray = Record<string, IItem>;

type AssocArray = Record<string, string>;
  // (文字型のキー):  string
