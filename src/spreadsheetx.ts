import { SSheet } from "./ssheet"
import { Util } from "./util"


export class SpreadSheetx {
  ss_id: string
  ss_url: string
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet | null
  s_sheet_assoc: { [index: string]: SSheet }
  constructor(ss_id: string) {
    this.ss_id = ss_id;
    this.ss_url = "";
    this.ss = null
    let xstr = "";
    let xstr2 = "";
    if (ss_id != "") {
      this.ss = SpreadsheetApp.openById(ss_id); //IDから取得
      if (typeof (this.ss) === "string") {
        xstr = "null";
      }
      else {
        xstr = "valid";
      }
      if (typeof (this.ss_id) === "string") {
        xstr2 = this.ss_id;
      }
      else {
        xstr2 = "";
      }
      Util.log(`##################### SpreadSheetx constructor T ss=${xstr} ss_id=${xstr2}`)
    }
    else {
      if (this.ss !== null) {
        xstr = "valid";
      }
      else {
        xstr = "null";
      }
      xstr2 = "null"
      Util.log(`##################### SpreadSheetx constructor F ss=${xstr} ss_id=${xstr2}`)
    }
    this.s_sheet_assoc = {};
  }
  openByUrl(url: string): void {
    let xstr = "";
    this.ss_url = url
    if (this.ss_url != null) {
      this.ss = SpreadsheetApp.openByUrl(this.ss_url); //URLから取得
      xstr = this.ss == null ? "null" : "valid";
      Util.log(`##################### SpreadSheetx constructor openByUrl T this.ss_url=${this.ss_url} ss=${xstr}`)
    }
    else {
      xstr = this.ss == null ? "null" : "valid";
      Util.log(`##################### SpreadSheetx constructor openByUrl F this.ss_url=null ss=${xstr}`)
    }
  }
  getSheet(sheet_name: string): SSheet {
    let s_sheet = this.s_sheet_assoc[sheet_name]
    let xstr = "";
    if (s_sheet === undefined) {
      if (this.ss != null) {
        const sheet = this.ss.getSheetByName(sheet_name);
        s_sheet = new SSheet(sheet, sheet_name);
        Util.log(`SpreadSheetx getSheet 0 sheet_name=${sheet_name}`);
        xstr = this.ss_id == null ? "" : this.ss_id;
        Util.log(`SpreadSheetx getSheet 0 this.ss_id=${xstr}`);
        xstr = this.ss_url == null ? "" : this.ss_url;
        Util.log(`SpreadSheetx getSheet 0 this.ss_url=${xstr}`);
        this.s_sheet_assoc[sheet_name] = s_sheet;
      }
      else {
        xstr = "null"
        Util.log(`##################### SpreadSheetx error!! this.ss=${xstr} s_sheet=undefined`)
      }
    }
    else {
      xstr = s_sheet == null ? xstr = "not null" : "valid";
      Util.log(`SpreadSheetx getSheet 2 sheet_name=${sheet_name} s_sheet=${xstr}`);
      xstr = this.ss_id == null ? "" : this.ss_id;
      Util.log(`SpreadSheetx getSheet 2 this.ss_id=${xstr}`);
      xstr = this.ss_url == null ? "" : this.ss_url;
      Util.log(`SpreadSheetx getSheet 2 this.ss_url=${xstr}`);
    }
    return s_sheet;
  }
}
// export default SpreadSheetx;
