export class Datax {
    ss_id: string | null
    lastRow: number
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null

    constructor() {
        this.ss_id = "";
        this.lastRow = 0;
        this.sheet = null;
    }
}