import { Infox } from "./infox";
import { SpreadSheetx } from "./spreadsheetx";
import { SSheet } from "./ssheet";
import { Util } from "./util";

export class Booklist {
    infox: Infox
    param: InfoParam | null
    ss_id: string
    sheet_name: string
    ss: SpreadSheetx | null
    s_sheet: SSheet | null
    values: string[][]
    error: { history: string[] }

    constructor(infox: Infox) {
        this.infox = infox
        this.param = null;
        this.ss_id = "";
        this.ss = null
        this.s_sheet = null
        this.sheet_name = ""
        this.values = [["BookInfo"]]
        this.error = { history: ["Booklist-A-1 init"] }
    }

    getValues(param: InfoParam, sheet_name: string): string[][] {
        let xstr: string = "";
        this.sheet_name = sheet_name
        this.values = [["empty"]]
        this.ss_id = this.infox.getSSId(param);
        xstr = this.ss_id == null ? "(null)" : this.ss_id
        Logger.log(`############### Booklist getVlues (from getSSId()) this.ss_id=${xstr}`)
        this.ss = new SpreadSheetx(this.ss_id)
        xstr = this.sheet_name == null ? "" : this.sheet_name;
        Logger.log(`############### Booklist getVlues this.sheet_name=${xstr}`)
        this.s_sheet = this.ss.getSheet(this.sheet_name)
        this.s_sheet.fetchAndSetDataRange();
        this.values = this.s_sheet.getValues(); //  as string[][]
        if (this.values.length <= 1) {
            // Util.log(`Booklist B-1`)
            this.error.history.push(`Booklist-A-4 get_values this.values.length=${this.values.length}`)
            return [this.error.history]
        }
        else {
            // Util.log(`Booklist B-2 get_values this.values.length=${this.values.length}`)
            return this.values
            // return [ this.error.history ]
        }
    }
    getAsJson(): string {
        // const json = Util.getAsJSON(this.values.map((item) => item.join('')).join(""));
        const json = Util.getAsJSON(this.values);
        // const json = Util.getAsJSON(Object.keys(this.itemArray).map((key) => [key, this.values[key].name, this.values[key].url]));
        return json;
    }
    getAsHtml(): string {
        // return "getAsHtml 72";
        return this.values.join("");
    }
}
