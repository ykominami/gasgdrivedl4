// import { stringify } from "ts-jest";

export class Appenv {
  program_name: string;
  bookmarkListUrl: string;
  bookmarkListSheetName: string;
  settingSheet2Url: string;
  sheetNameOfFile: string;
  assocArray: AssocArray;
  dataRange: DataRangex;
  folderId: string;
  startPointOfYear: StartPointOfYearArray;
  constructor() {
    this.program_name = "daily_log9";
    // daily_log0 URL0
    this.bookmarkListUrl =
      "https://docs.google.com/spreadsheets/d/1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs/edit#gid=1962904267";
    // daily_log5 URL0
    this.bookmarkListSheetName = "URLS0";
    // this.bookmarkListSheetName = "URLS";
    // this.bookmarkListSheetName = "URLS2";
    // sheets-setting-2
    this.settingSheet2Url =
      "https://docs.google.com/spreadsheets/d/1YzmAsCuwQq3S0KveQhSDm-WcGe6ufkFmmURhhqoa1kI/edit#gid=1674026248";
    this.sheetNameOfFile = "sheet2";
    this.assocArray = {};
    this.dataRange = { x: 15, y: 1, height: 100, width: 9 };
    // 1-dev>1-MY-DEV2>sheets-setting-2
    // 0>0-LOG>Daily-LOG
    this.folderId = "1MVQPrZiFqgTp0wCrm-29XwvjS9liMo7V";
    this.startPointOfYear = {
      2017: 0,
      2018: 13,
      2019: 26,
      2020: 39,
      2021: 52,
      2022: 65,
      2023: 78,
    };
    ///////////////////////////////////
  }
  //////////////////////////////
  getSettingSheet2Url(): string {
    return this.settingSheet2Url;
  }
  getSheetNameOfFile(): string {
    return this.sheetNameOfFile;
  }
  //
  setAssocItem(key: string, valuex: StringOrNull): void {
    this.assocArray[key] = valuex;
  }
  getAssocItem(key: string): StringOrNull {
    return this.assocArray[key];
  }
  //
  setUrl(url: string): void {
    this.setAssocItem("url", url);
  }
  getUrl(): string {
    let value = this.getAssocItem("url");
    if (value == null) {
      value = "";
    }
    return value;
  }
  getDynalistUrl(): string {
    let value = this.getAssocItem("dynalist_url");
    if (value == null) {
      value = "";
    }
    return value;
  }

  getBmId(): StringOrNull {
    return this.getAssocItem("bm_id");
  }
  setDayStr(dayStr: string): void {
    this.setAssocItem("day_str", dayStr);
    const str = this.getDayStr();
    if (str === "undefiend") {
      throw new Error("setDayStr called");
    }
  }
  getDayStr(): string {
    let value = this.getAssocItem("day_str");
    if (value == null) {
      value = "";
    }
    return value;
  }
  getYearMonthStr(): string {
    let value = this.getAssocItem("year_month_str");
    if (value == null) {
      value = "";
    }
    return value;
  }
  //
  getDataRange(): DataRangex {
    return this.dataRange;
  }
  //
  getBookmarkListUrl(): string {
    return this.bookmarkListUrl;
  }
  //
  getBookmarkListSheetName(): string {
    return this.bookmarkListSheetName;
  }
  //
  getFolderId(): string {
    return this.folderId;
  }
  //
  getStartPointOfYear(): StartPointOfYearArray {
    return this.startPointOfYear;
  }
}

// eport default Appenv;