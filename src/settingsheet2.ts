import { SpreadSheetx } from "./spreadsheetx";

export class SettingSheet2 {
  url: string;
  dynaList: ThreeItemsAssocArray;
  year: number;
  month: number;
  r_c: ThreeItemsOrNull;
  data: string[][] | null;
  dynalistUrl: string | null;
  bmId: string | null;
  constructor(
    url: string,
    sheetName: string,
    year: number,
    month: number,
    threeItemsAssocArray: ThreeItemsAssocArray,
    dataRange: DataRangex
  ) {
    this.url = url;
    // this.dynaList = [[]];
    this.dynaList = threeItemsAssocArray;
    this.dynalistUrl = null;
    this.bmId = null;
    this.year = year;
    this.month = month;
    // this.r_c: ThreeItemsOrNull = [null, null, null];
    this.r_c = [null, null, null];
    if (this.dynaList != null) {
      if (this.dynaList[year] != null) {
        this.r_c = this.dynaList[year][month];
      }
    }
    // Logger.log("############### SettingSheet2 constructor call SpreadSheetx() without arg")
    const ss = new SpreadSheetx("");
    ss.openByUrl(this.url);
    const sheet = ss.getSheet(sheetName);
    this.data = null;
    if (sheet != null) {
      const x: number = dataRange.x
      const y: number = dataRange.y
      const height: number = dataRange.height
      const width: number = dataRange.width
      sheet.getRange(x, y, height, width)
      this.data = sheet.getValues();
    }
  }
  getDynalistUrl(): StringOrNull {
    return this.dynalistUrl;
  }
  getBmId(): StringOrNull {
    return this.bmId;
  }
  make_sub(): void {
    const x: number | null = this.r_c[0];
    const y: number | null = this.r_c[1];
    const bmY: number | null = this.r_c[2];
    if (this.data != null) {
      if (x != null) {
        if (y != null) {
          this.dynalistUrl = this.data[x][y];
          // Util.log(
          //  `SettingSheet2 x=${x} y=${y} data[x][y]=${(this.data[x][y] as string)}`
          // );
        }
        if (bmY != null) {
          this.bmId = this.data[x][bmY];
          // Util.log(`SettingSheet2 x=${x} y=${y} bm_y=${bmY}`);
        }
      }
    }
  }
  make(): void {
    // Util.log(`SettingSheet2 this.year=${this.year} this.month=${this.month}}`);
    // Util.log(`SettingSheet2 this.r_c=${this.r_c.join('')}}`);
    if (this.r_c != null) {
      this.make_sub();
    }
  }
}

// export default SettingSheet2;