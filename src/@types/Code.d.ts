interface StartPointOfYearArray {
  [index: string]: number;
}

type DataRangex = { x: number; y: number; height: number; width: number };

type AssocValue = null | string;
interface AssocArray {
  [index: string]: AssocValue;
}
type StringOrNull = string | null;

//interface StartPointOfYearArray {
//  [index: number]: number;
//}
type ThreeItemsOrNull = [number, number, number] | [null, null, null];

type ThreeItemsAssocArr = [ThreeItemsOrNull];
type ThreeItemsAssocArray = Record<number, ThreeItemsAssocArr>;

type GASHtmlTextOutputType = GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput;

interface InfoParam {
  sheet_name: StringOrNull;
  kind: StringOrNull;
  kind2: StringOrNull;
  year: StringOrNull;
}
/*
type StringStringAssoc = Record<string,string>;
type StringSSA= Record<string,StringStringAssoc>;
*/