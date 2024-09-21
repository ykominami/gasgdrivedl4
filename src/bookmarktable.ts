import { SpreadSheetx } from "./spreadsheetx";
import { Util } from "./util";
import { SSheet } from "./ssheet"

export class BookmarkTable {
  url: string;
  sheetName: string;
  ssx: SpreadSheetx;
  s_sheet: SSheet;
  constructor(url: string, sheetName: string) {
    this.url = url;
    this.sheetName = sheetName;
    // Logger.log("############### BookmarkTable constructor call SpreadSheetx() without arg");
    this.ssx = new SpreadSheetx("");
    this.ssx.openByUrl(this.url);
    this.s_sheet = this.ssx.getSheet(this.sheetName);
    // Util.log(`BookmarkTable url=${url}|sheetName=${sheetName}`)
  }
  reform(values: string[][]): string[][] {
    Logger.log(`X BookmarkTable reform value.size=${values.length}`)
    const values1: string[][] = Util.remove_left_blank_cols(values);
    Logger.log(`Y BookmarkTable reform value.size=${values.length}`)
    const values2: string[][] = Util.remove_under_the_blank_row(values1);
    Logger.log(`Z BookmarkTable reform value.size=${values.length}`)
    return values2;
  }
  getValues(): StringOrNull[][] {
    this.s_sheet.fetchAndSetDataRange();

    const values = this.s_sheet.getValues(); // as string[][];

    Logger.log(`A BookmarkTable getValues value.size=${values.length}`)
    Logger.log(`values=${ JSON.stringify(values) }`)
    const x: StringOrNull[][] = this.reform(values);
    Logger.log(`x=${x}`)
    // const x: string[][] = this.reform2(values);
    Logger.log(`B BookmarkTable getValues value.size=${values.length}`)

    return x
  }
}

// export default BookmarkTable;
