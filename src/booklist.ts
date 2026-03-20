import { Infox } from "./infox";
import { SpreadSheetx } from "./spreadsheetx";
import { SSheet } from "./ssheet";
import { StringMessage } from "./stringmessage";
import { Util } from "./util";

export class Booklist {
    private static readonly LOG_PREFIX = "############### Booklist getVlues";
    private static readonly MSG_SSHEET_UNDEFINED = "s_sheet is undefined, fetchAndSetDataRange cannot be called";
    infox: Infox
    param: InfoParam | null
    ss_id: string
    sheet_name: string
    ss: SpreadSheetx | null
    s_sheet: SSheet | undefined
    values: string[][]
    error: { history: string[] }

    constructor(infox: Infox) {
        this.infox = infox
        this.param = null;
        this.ss_id = ""
        this.ss = null
        this.s_sheet = undefined
        this.sheet_name = ""
        this.values = [["BookInfo"]]
        this.error = { history: ["Booklist-A-1 init"] }
    }

    getValues(param: InfoParam, sheet_name: string): string[][] {
        let xstr: string = "";
        this.sheet_name = sheet_name
        this.values = [["empty"]]
        this.ss_id = this.infox.getSSId(param);
        StringMessage.addMessage(
            `Booklist getValues0: this.ss_id=${this.ss_id} this.sheet_name=${this.sheet_name} ${Booklist.MSG_SSHEET_UNDEFINED}`
        )
        xstr = this.ss_id == null ? "(null)" : this.ss_id
        Logger.log(`${Booklist.LOG_PREFIX} (from getSSId()) this.ss_id=${xstr}`)
        this.ss = new SpreadSheetx(this.ss_id)
        xstr = this.sheet_name == null ? "" : this.sheet_name;
        Logger.log(`${Booklist.LOG_PREFIX} this.sheet_name=${xstr}`)
        this.s_sheet = this.ss.getSheet(this.sheet_name)
        if (this.s_sheet === undefined) {
            StringMessage.addMessage(
                `Booklist getValues: this.ss_id=${this.ss_id} this.sheet_name=${this.sheet_name} ${Booklist.MSG_SSHEET_UNDEFINED}`
            )
            return [StringMessage.getMessages()]
        }
        if (this.s_sheet.sheet === null) {
            StringMessage.addMessage(
                "Booklist getValues: s_sheet.sheet is null, fetchAndSetDataRange cannot be called properly"
            )
            return [StringMessage.getMessages()]
        }
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
    getAsJsonWithError(): string {
        const payload = {
            values: this.values,
            messages: StringMessage.getMessages()
        };
        return JSON.stringify(payload);
    }
    getAsJson(): string {
        const payload = this.values
        return JSON.stringify(payload);
    }
    getAsHtmlWithError(): string {
        // htmlの中にはjsonを埋め込めないので、jsonを文字列に変換して埋め込む
        const json = this.getAsJsonWithError();
        return `<pre>${json}</pre>`;
    }
    getAsHtml(): string {
        // htmlの中にはjsonを埋め込めないので、jsonを文字列に変換して埋め込む
        const json = this.getAsJson();
        return `<pre>${json}</pre>`;
    }
}
