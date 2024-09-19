// import { content } from "googleapis/build/src/apis/content";
import { Infox } from "./infox"
import { Booklist } from "./booklist"
import { Util } from "./util"
import { Datax } from "./datax"
import { Appenv } from "./appenv"
import { Item } from "./item"
// import { Dayx } from "./dayx"
import { BookmarkTable } from "./bookmarktable"
import { Listapp } from "./listapp"

export class Webapp {
    CONST_SS_ID: string
    CONST_SHEET_NAME: string
    ss_id: string
    sheet_name: string
    datax: Datax

    constructor() {
        this.CONST_SS_ID = "1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs";
        this.CONST_SHEET_NAME = "ss2";
        this.ss_id = this.CONST_SS_ID
        this.sheet_name = this.CONST_SHEET_NAME
        this.datax = new Datax();
    }

    // POSTリクエストに対する処理
    doPostx(e: GoogleAppsScript.Events.DoPost): GASHtmlTextOutputType {
        return this.do_post(e)
    }

    getOrCreateSheet(ss_id: string, sheetName: string): GoogleAppsScript.Spreadsheet.Sheet | null {
        const ss = SpreadsheetApp.openById(ss_id)
        let sheet: GoogleAppsScript.Spreadsheet.Sheet | null = ss.getSheetByName(sheetName);
        if (sheet === null) {
            const templateSheet: GoogleAppsScript.Spreadsheet.Sheet | null = ss.getSheetByName("none");
            let sheet_u: GoogleAppsScript.Spreadsheet.Sheet | undefined;
            if (templateSheet !== null) {
                sheet_u = ss.insertSheet({ template: templateSheet });
            }
            if (sheet_u === undefined) {
                sheet = null;
            }
            else {
                sheet = sheet_u;
                sheet.setName(sheetName);
            }
        }
        return sheet;
    }
    getSheetFromBaseSS(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet | null {
        const base_ss_id = "1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs";
        Logger.log(`base_ss_id=${base_ss_id}`);
        return this.getOrCreateSheet(base_ss_id, sheetName)
    }

    getValueInSheet_1(sheet: GoogleAppsScript.Spreadsheet.Sheet | null): void {
        if (sheet === null) {
            return;
        }
        const lastRow: number = sheet.getLastRow()
        // const values = sheet.getDataRange(1, 1, lastRow, 6).getValues();
        const values = sheet.getDataRange().getValues();

        this.datax.ss_id = values[0][4] as string;
        this.datax.lastRow = lastRow;
    }
    getValueInSheet_2(sheet: GoogleAppsScript.Spreadsheet.Sheet | null): void {
        if (sheet === null) {
            return;
        }
        const lastRow = sheet.getLastRow()
        const values = sheet.getRange(1, 1, lastRow, 6).getValues();

        this.datax.ss_id = values[0][4] as string;
        this.datax.lastRow = lastRow;
    }
    getValueInSheet_3(sheet: GoogleAppsScript.Spreadsheet.Sheet | null): void {
        let xstr = "";
        if (sheet === null) {
            return;
        }
        const headerRowNum: number = this.getHeaderRowNumx(sheet);
        Logger.log(`headerRowNum=${headerRowNum}`)
        const headerRow = sheet.getDataRange().getValues()[headerRowNum - 1] as [StringOrNull];
        const target_ss_id: string | null = headerRow.find(element => (element != null && element != "")) as StringOrNull
        // const target_ss_id = headerRow[4];
        if (typeof headerRow === "string") {
            xstr = headerRow;
        }
        else {
            xstr = "";
        }
        Logger.log(`headerRow=${xstr}`)
        this.datax.ss_id = target_ss_id;
    }

    getHeaderRowNumx(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        const frozen: number = sheet.getFrozenRows()
        if (frozen == 0) {
            return 1
        } else {
            return frozen
        }
    }
    getSsidFromBaseSS(sheetName: string): StringOrNull {
        const sheet = this.getSheetFromBaseSS(sheetName);
        this.datax.sheet = sheet;
        if (sheetName == "ss2") {
            this.getValueInSheet_1(sheet)
        }
        else if (sheetName == "ss3") {
            this.getValueInSheet_2(sheet)
        }
        else if (sheetName == "ss4") {
            this.getValueInSheet_3(sheet)
        }
        return this.datax.ss_id;
    }
    mainx(ss_id: string, message: string): void {
        let xstr = "";
        const json_root = JSON.parse(message);
        const sheetName: string = json_root.sheetName;
        const json = json_root.data as Record<string,string>;
        const sheet = this.getOrCreateSheet(ss_id, sheetName);
        if (sheet !== null) {
            const lastRow = sheet.getLastRow() + 1
            const array:[string, string][] = Object.keys(json).map(
                (key) =>
                    [key, json[key]]
            )
            const size = array.length

            let rowIndex = lastRow;
            rowIndex = 1;
            const xIdNum = 1;
            Logger.log(array)
            xstr = rowIndex === null ? "" : `${rowIndex}`;
            Logger.log(`xIdNum=${xIdNum} rowIndex=${xstr}`)
            sheet.getRange(xIdNum, rowIndex, size, 2).setValues(array)
        }
    }
    do_post(e: GoogleAppsScript.Events.DoPost): GASHtmlTextOutputType {
        // do_post(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent): GASHtmlTextOutputType {
        const postContent: string = e.postData.contents;
        const sheetName = "ss4";
        const ss_id: StringOrNull = this.getSsidFromBaseSS(sheetName);
        let ss_idx: string = "";
        if (ss_id !== null) {
            ss_idx = ss_id;
        }
        this.mainx(ss_idx, postContent)
        const output = ContentService.createTextOutput();
        output.setMimeType(ContentService.MimeType.JSON);
        output.setContent(JSON.stringify({ message: "success" }));
        return output;
    }
    doGetx(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent): GASHtmlTextOutputType {
        return this.do_x(e)
    }
    // GETリクエストに対する処理
    do_x(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent): GASHtmlTextOutputType {
        const kind: StringOrNull = e.parameter.kind
        const kind0: StringOrNull = e.parameter.kind0
        const kind1: StringOrNull = e.parameter.kind1
        const kind2: StringOrNull = e.parameter.kind2
        const year: StringOrNull = e.parameter.year
        const format: StringOrNull = e.parameter.format
        const cmd: StringOrNull = e.parameter.cmd
        // return HtmlService.createTemplateFromFile("zhome.html").evaluate();
        // var payload = JSON.stringify(getData());
        const param: InfoParam = {
            sheet_name: kind0,
            kind: kind,
            kind2: kind1,
            year: year
        }
        Util.log(`########### Webapp do_x kind=${kind} kind0=${kind0} kind1=${kind1} kind2=${kind2} year=${year} format=${format} cmd=${cmd}`);
        return this.do_x_0(param, kind2, format, cmd);
    }
    // GETリクエストに対する処理
    do_x_0(param: InfoParam, kind2: StringOrNull, format: StringOrNull, cmd: StringOrNull): GASHtmlTextOutputType {
        let content: GASHtmlTextOutputType;

        let str: string = "";
        switch (cmd) {
            case "a":
                str = "a"
                content = this.outputAsText(str);
                break;
            case "b":
                str = "b"
                content = this.outputAsText(str);
                break;
            case "c":{
                const infox = new Infox("ss2");

                const booklist = new Booklist(infox)
                let kind2_str: string;
                if (kind2 === null) {
                    kind2_str = "";
                }
                else {
                    kind2_str = kind2;
                }
                Logger.log(`########################## Webapp do_x_0 call booklist.getValues kind2=${kind2_str}`)
                booklist.getValues(param, kind2_str)
                if (format == "json") {
                    str = booklist.getAsJson()
                    Util.log(`Webapp do_x_0 1 str=${str}`)
                }
                else {
                    str = booklist.getAsHtml()
                    Util.log(`Webapp do_x_0 1 str=${str}`)
                }
                content = this.outputAsText(str);
                break;
            }
            case "d":
                str = "d"
                content = this.outputAsText(str);
                break;
            case "e":
                str = "e"
                content = this.outputAsText(str);
                break;

            default:
                content = HtmlService.createTemplateFromFile("zhome.html").evaluate();
                break;
        }
        return content;
    }
    outputAsText(str: string): GASHtmlTextOutputType {
        const output = ContentService.createTextOutput();
        output.setMimeType(ContentService.MimeType.JSON);
        output.setContent(str);
        // return response-data
        return output;
    }
    testGetData(): GASHtmlTextOutputType {
    // testGetData(): void {
        const listapp = new Listapp();
        const str = JSON.stringify(listapp.getData());
        // const str = "testGetData";
        Logger.log('=======================');
        Logger.log(str);
        return this.outputAsText(str);
    }
    testDataX(): GASHtmlTextOutputType {
        const info_sheet_name = "ss2";
        const kind = "kindle";
        const kind0 = info_sheet_name
        const kind1 = "book";
        const kind2 = "book";
        const year = "2000";
        const format = "json";
        const cmd = "c";
        const param: InfoParam = {
            sheet_name: kind0,
            kind: kind,
            kind2: kind1,
            year: year
        }
        const output = this.do_x_0(param, kind2, format, cmd);
        return output;
    }
    testData2(): GASHtmlTextOutputType {
        const info_sheet_name = "ss2";
        const kind = "api";
        const kind0 = info_sheet_name;
        const kind1 = "book";
        const kind2: StringOrNull = "amazon";
        const year: StringOrNull = "2023";
        const format: StringOrNull = "json";
        const cmd: StringOrNull = "c"
        const param: InfoParam = {
            sheet_name: kind0,
            kind: kind,
            kind2: kind1,
            year: year
        }
        const output = this.do_x_0(param, kind2, format, cmd);
        return output;
    }
    // testData3(): GASHtmlTextOutputType {
    testData3(): void {
        const appEnv = new Appenv();
        // get_list_from_bookmarktable(item: Item, appEnv: Appenv): void {
        // const dayx = Dayx.today();
        const item = new Item({name: "", url: ""});
        // get_list_from_bookmarktable(item, appEnv)
        const bkurl = appEnv.getBookmarkListUrl();
        const sheetName = appEnv.getBookmarkListSheetName();
        const bt = new BookmarkTable(bkurl, sheetName);
        item.add(sheetName, bkurl);

        const values = bt.getValues();

        // Util.log(`testData3 value.size=${values.size}`)

        if (values !== null) {
            for (const elem of values) {
                let name: string = elem[0] === null ? "" : elem[0];
                let url: StringOrNull = elem[1];

                if (name === null) {
                    name = "";
                }
                if (url === null) {
                    url = "";
                }
                item.add(name, url);
            }
        }
        // const output = this.do_x_0(param, kind2, format, cmd);
        // return output;
    }
    testData4(): string {
        const appEnv = new Appenv();
        // get_list_from_bookmarktable(item: Item, appEnv: Appenv): void {
        // const dayx = Dayx.today();
        const item = new Item( {name: "", url: ""} );
        // get_list_from_bookmarktable(item, appEnv)
        const bkurl = appEnv.getBookmarkListUrl();
        const sheetName = appEnv.getBookmarkListSheetName();
        const bt = new BookmarkTable(bkurl, sheetName);
        item.add(sheetName, bkurl);

        const values = bt.getValues();

        // Util.log(`testData3 value.size=${values.size}`)

        if (values !== null) {
            for (const elem of values) {
                let name: StringOrNull = elem[0];
                let url: StringOrNull = elem[1];

                if (name === null) {
                    name = "";
                }
                if (url === null) {
                    url = "";
                }
                item.add(name, url);
            }
        }
        const output = item.getAsJson();

        // const output = this.do_x_0(param, kind2, format, cmd);
        return output;
    }

}
