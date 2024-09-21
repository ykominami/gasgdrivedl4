import { Appenv } from "./appenv"
import { Dayx } from "./dayx"
import { Infolistx } from "./infolistx"
import { Item } from "./item"
import { BookmarkTable } from "./bookmarktable"
import { Util } from "./util"

export class Listapp {
  constructor() {

  }
  getData(): { [index: string]: Item } {
    const appEnv = new Appenv();
    const dayx = Dayx.today();
    const infolistx = new Infolistx(appEnv, dayx);
    infolistx.make();

    const item = new Item( {name: "", url: "" } )

    let name: string = appEnv.getDayStr();
    let url: string = appEnv.getUrl();
    if (name != null) {
      item.add(name, url);
    }

    name = "chrom bmk";
    let xstr = "";
    const value = appEnv.getBmId();
    xstr = value == null ? "" : value;
    url = `chrome://bookmarks/?id=${xstr}`;
    item.add(name, url);

    name = `Dynalist ${appEnv.getYearMonthStr()}`;
    url = appEnv.getDynalistUrl();
    item.add(name, url);

    this.get_list_from_bookmarktable(item, appEnv)

    return item.getArray();
  }

  get_list_from_bookmarktable(item: Item, appEnv: Appenv): void {
    const bkurl = appEnv.getBookmarkListUrl();
    const sheetName = appEnv.getBookmarkListSheetName();
    const bt = new BookmarkTable(bkurl, sheetName);
    item.add(sheetName, bkurl);

    const values = bt.getValues();
    Logger.log(`bkurl=${bkurl}`);
    Logger.log(`sheetName=${sheetName}`);
    Logger.log(' | get_list_from_bookmarktable | ');
    Logger.log( JSON.stringify(values) );
    if (values !== null) {
      for (const elem of values) {
        const str_0: string = Util.son2string(elem[0]);
        const str_1: string = Util.son2string(elem[1]);
        item.add(str_0, str_1);
      }
    }
    else {
      Util.log("listapp get_list_from_bookmarktable values=null")
    }
  }
}
