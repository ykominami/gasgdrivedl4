import { SpreadSheetx } from "./spreadsheetx";
import { SSheet } from "./ssheet";
import { StringMessage } from "./stringmessage";
import { Util } from "./util";

export class BookmarkTable {
  private static readonly LOG_REFORM = "BookmarkTable reform";
  private static readonly LOG_GET_VALUES = "BookmarkTable getValues";
  private static readonly LOG_VALUE_SIZE = " value.size=";
  private static readonly MSG_NO_WORKSHEET = "no appropriate worksheet";
  url: string;
  sheetName: string;
  ssx: SpreadSheetx;
  s_sheet: SSheet;

  constructor(url: string, sheetName: string) {
    this.url = url;
    this.sheetName = sheetName;
    this.ssx = new SpreadSheetx("");
    this.ssx.openByUrl(this.url);
    const sheetResult = this.ssx.getSheet(this.sheetName);
    if (sheetResult === undefined) {
      StringMessage.addMessage(
        `BookmarkTable constructor: ssx.getSheet returned undefined, ${BookmarkTable.MSG_NO_WORKSHEET}`
      );
      this.s_sheet = new SSheet(null, this.sheetName);
    } else if (sheetResult.sheet === null) {
      StringMessage.addMessage(
        `BookmarkTable constructor: ssx.getSheet returned SSheet with null sheet, ${BookmarkTable.MSG_NO_WORKSHEET}`
      );
      this.s_sheet = sheetResult;
    } else {
      this.s_sheet = sheetResult;
    }
  }
  reform(values: string[][]): string[][] {
    Logger.log(`X ${BookmarkTable.LOG_REFORM}${BookmarkTable.LOG_VALUE_SIZE}${values.length}`)
    const values1: string[][] = Util.remove_left_blank_cols(values);
    Logger.log(`Y ${BookmarkTable.LOG_REFORM}${BookmarkTable.LOG_VALUE_SIZE}${values.length}`)
    const values2: string[][] = Util.remove_under_the_blank_row(values1);
    Logger.log(`Z ${BookmarkTable.LOG_REFORM}${BookmarkTable.LOG_VALUE_SIZE}${values.length}`)
    return values2;
  }
  getValues(): StringOrNull[][] {
    this.s_sheet.fetchAndSetDataRange();

    const values = this.s_sheet.getValues(); // as string[][];

    Logger.log(`A ${BookmarkTable.LOG_GET_VALUES}${BookmarkTable.LOG_VALUE_SIZE}${values.length}`)
    Logger.log(`values=${ JSON.stringify(values) }`)
    const x: StringOrNull[][] = this.reform(values);
    Logger.log(`x=${x}`)
    // const x: string[][] = this.reform2(values);
    Logger.log(`B ${BookmarkTable.LOG_GET_VALUES}${BookmarkTable.LOG_VALUE_SIZE}${values.length}`)

    return x
  }
}

// export default BookmarkTable;
