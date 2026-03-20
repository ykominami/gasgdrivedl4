import { SpreadSheetx } from "./spreadsheetx";
import { SSheet } from "./ssheet";
import { StringMessage } from "./stringmessage";
import { Util } from "./util";
// import { Item } from "./item";
import { Itemx } from "./itemx";
import { SearchItem } from "./searchItem";
import { Itemvalue } from "./itemvalue";

type StringOrNull = string | null;


export class Infox {
    private static readonly LOG_GET_ID = "${Infox.LOG_GET_ID} ";
    private static readonly LOG_GET_SS_ID = "Infox getSSId";
    CONST_SS_ID: string
    sheet_name: string
    ssxx: SpreadSheetx
    ssheet: SSheet
    values: string[][]

    constructor(sheet_name: string) {
        this.CONST_SS_ID = "1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs";
        this.values = [[""]];
        this.sheet_name = sheet_name;
        this.ssxx = new SpreadSheetx(this.CONST_SS_ID);
        this.ssheet = new SSheet(null, this.sheet_name);
        const canGetSheet = this.sheet_name !== "" && this.ssxx.ss !== null;
        if (canGetSheet) {
            const ssheet = this.ssxx.getSheet(this.sheet_name);
            if (ssheet !== undefined && ssheet.sheet !== null && ssheet.sheet !== undefined) {
                this.ssheet = ssheet;
            }
        }
        if (this.ssheet !== undefined) {
            if (this.ssheet.sheet != null && this.ssheet.sheet !== undefined) {
                this.ssheet.fetchAndSetDataRange();
                this.values = this.ssheet.getValues();
            }
        }
    }
    getValues(): string[][] {
        // Util.log(`Infox getValues() 1`)
        if (this.values.length > 0) {
            // Util.log(`Infox getValues() 2`)
            if (this.values[0].length == 0) {
                // Util.log(`Infox getValues() 3`)
                // this.values = this.ssheet.getValues() as string[][];
                this.values = this.ssheet.getValues(); // as string[][];
            }
        }
        return this.values;
    }
    getSSId(infoparam: InfoParam): string {
        const values = this.getValues();
        StringMessage.addMessage(
            `${Infox.LOG_GET_SS_ID} values.length=${values.length}`
        );
        const year: StringOrNull = infoparam.year;
        const kind: StringOrNull = infoparam.kind;
        const kind2: StringOrNull = infoparam.kind2;
        StringMessage.addMessage(
            `${Infox.LOG_GET_SS_ID} year=${year} kind=${kind} kind2=${kind2}`
        );
        const item: SearchItem = this.make_item(
            year,
            kind,
            kind2);
        // Util.log(`Infox getSSId item=${item}`)
        // const [ss_id, sheet_name] = this.get_id_from_values(values, item);
        return this.get_id_from_values(values, item);
    }
    make_item(year_str: StringOrNull = null,
        kind_str: StringOrNull = null,
        kind2_str: StringOrNull = null): SearchItem {
        const INDEX_ID: number = 5;
        const INDEX_KIND: number = 0
        const INDEX_YEAR: number = 1
        // const INDEX_TITLE: number = 2
        const INDEX_KIND2: number = 4
        // const INDEX_URL: number = 6

        const value_item: Itemvalue = new Itemvalue({ index: INDEX_ID, value: "" });
        const search_items: Itemx[] = [];
        if (year_str != null) {
            const s1_item: Itemx = new Itemx({ index: INDEX_YEAR, name: year_str });
            search_items.push(s1_item);
        }
        if (kind_str != null) {
            const s2_item: Itemx = new Itemx({ index: INDEX_KIND, name: kind_str });
            search_items.push(s2_item);
        }
        if (kind2_str != null) {
            const s3_item: Itemx = new Itemx({ index: INDEX_KIND2, name: kind2_str });
            search_items.push(s3_item);
        }
        const searchitem: SearchItem = new SearchItem({ searches: search_items, value: value_item });
        return searchitem;
    }
    get_id_from_values(d: string[][], item: SearchItem): string {
        let result_start: string[][] = d
        let result_end: string[][] = []
        let ret_str: string = "";
        let xstr: string = "";
        const search_items = item.searches;
        const value_item = item.value;

        // Util.log(`${Infox.LOG_GET_ID} result_start=${result_start}`);
        Util.log(`${Infox.LOG_GET_ID} =1-X d d.length=${d.length}`);
        d.map(it => {
            it.map(x => {
                Util.log(`${x}, `)
            });

            Util.log("\n");
        })

        const count = search_items.length;
        for (let i = 0; i < count; i++) {
            const item = search_items[i];
            xstr = item.name == null ? "null" : "not null";
            Util.log(`${Infox.LOG_GET_ID} =4-X i=${i} item.value=${xstr} result_start.length=${result_start.length}`);
            result_end = result_start.filter((v) => {
                const cellVal = Number(v[item.index]);
                const nameNum = Number(item.name);
                const result = !Number.isNaN(cellVal) && !Number.isNaN(nameNum)
                    ? cellVal === nameNum
                    : v[item.index] == item.name;
                StringMessage.addMessage(
                    `${Infox.LOG_GET_ID} ${i}=B1 result=${result} item.index=${item.index} item.name=${item.name} v[item.index]=${v[item.index]}`
                );
                return result;
            })
            StringMessage.addMessage(
                `${Infox.LOG_GET_ID} ${i}=B2 result_end.length=${result_end.length}`
            );
            result_start = result_end;
            Util.log(`${Infox.LOG_GET_ID} =S`);
            // Util.log(result_start);
            Util.log(`${Infox.LOG_GET_ID} =E`);
        }
        Util.log(`${Infox.LOG_GET_ID} =A1`);
        if (result_start.length > 0) {
            Util.log(`${Infox.LOG_GET_ID} =A2`);
            ret_str = result_start[0][value_item.index];
            StringMessage.addMessage(
                `${Infox.LOG_GET_ID} =A2 ret_str=${ret_str}`
            );
            // Util.log(`${Infox.LOG_GET_ID} 1 ret_str=${ret_str}`);
        }
        else{
            StringMessage.addMessage(
                `${Infox.LOG_GET_ID} =A3 result_start.length=${result_start.length}`
            );
        }
        xstr = ret_str == null ? "(null)" : ret_str;
        Util.log(`${Infox.LOG_GET_ID} =A3 xstr=${xstr} value_item.index=${value_item.index}`);
        // Util.log(`${Infox.LOG_GET_ID} ret=${ret} result_start.length=${result_start.length}`);
        return ret_str;
    }
}
