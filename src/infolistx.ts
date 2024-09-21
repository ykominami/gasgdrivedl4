import { Appenv } from "./appenv";
import { Dayx } from "./dayx";
import { Datafolderx } from "./datafolderx";
import { TimeTable } from "./timetable";
import { SettingSheet2 } from "./settingsheet2";

export class Infolistx {
  appEnv: Appenv;
  dayx: Dayx;
  file: GoogleAppsScript.Drive.File | null;
  datafolderx: Datafolderx | null;
  timeTable: TimeTable | null;
  threeItemsAssocArray: ThreeItemsAssocArray | null;
  settingSheet2: SettingSheet2 | null;
  constructor(appEnv: Appenv, dayx: Dayx) {
    this.appEnv = appEnv;
    this.dayx = dayx;
    this.file = null;
    this.datafolderx = null;
    this.timeTable = null;
    this.threeItemsAssocArray = null;
    this.settingSheet2 = null;
  }
  make(): void {
    const dayStr = this.dayx.dayStr();
    // Util.log(`Infolistx make dayStr=${dayStr}`);
    this.appEnv.setDayStr(dayStr);
    this.appEnv.setAssocItem("year_month_str", this.dayx.yearMonthStr());

    const folderId = this.appEnv.getFolderId();
    const fileName = this.dayx.dayStr();
    this.datafolderx = new Datafolderx(folderId, fileName);
    this.appEnv.setUrl(this.datafolderx.getFileUrl());
    const spoy = this.appEnv.getStartPointOfYear();
    this.timeTable = new TimeTable(spoy);
    const threeItemsAssocArray = this.timeTable.getThreeItemsAssocArray();
    this.threeItemsAssocArray = threeItemsAssocArray;

    const year = this.dayx.year();
    // monthの値は0から始まる
    const month_s_n: number = this.dayx.month();
    const month = month_s_n + 1;

    const url = this.appEnv.getSettingSheet2Url();
    const sheetName = this.appEnv.getSheetNameOfFile();
    const dataRange = this.appEnv.getDataRange();
    this.settingSheet2 = new SettingSheet2(
      url,
      sheetName,
      year,
      month,
      this.threeItemsAssocArray,
      dataRange
    );
    this.settingSheet2.make();
    const dynalistUrl: StringOrNull = this.settingSheet2.getDynalistUrl();
    this.appEnv.setAssocItem("dynalist_url", dynalistUrl);
    this.appEnv.setAssocItem("bm_id", this.settingSheet2.getBmId());
  }
}

// export default Infolistx;
