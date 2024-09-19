export class Util {
    static UPPER_BLANK_LINE_RANGE = 1;
    static NOT_BLANK_LINE_RANGE = 2;
    static BOTTOM_BLANK_LINE_RANGE = 3;
      
    static BLANK_LINE = 10;
    static NOT_BLANK_LINE = 11;

    static log_init() {

    }
    static log(message: string): string {
        return message;
        // Logger.log(message)
    }
    static print_line(lines: StringOrNull[][]): void {
        let xstr: string = "";
        if (lines != null) {
            lines.map(l => {

                l.map(x => {
                    if (typeof x === "string") {
                        xstr = x;
                    }
                    else {
                        xstr = "(null)";
                    }
                    Util.log(xstr);
                });
            })
            Util.log("\n");
        }
    }
    static detect_blank_line(line: string[]): number{
      return line.indexOf('')
    }
      
    static remove_blank_line(lines: string[][]): string[][]{
        let result: string[][] = [];
        lines.forEach((line, index) => {
          if (Util.detect_blank_line(line) === -1){
            result.push(line);
          }
        });
        return result;
    }
    static remove_upper_blank_line(lines: string[][]): string[][]{
        let result:string[][] = [];
        let skip_flag = true;
        lines.forEach((line, index) => {
          if (skip_flag){
            if (Util.detect_blank_line(line) === -1){
              skip_flag = false;
              result.push(line);
            }
          }
          else{
            result.push(line);
          }
        });
        return result;
    }
      
    static get_line_state(line: string[]): number{
        if (Util.detect_blank_line(line) === -1){
          return Util.NOT_BLANK_LINE
        }
        else {
          return Util.BLANK_LINE
        }
    }
    static remove_under_the_blank_row(lines: string[][]): string[][]{
        let result: string[][] = [];
        let range_state = Util.UPPER_BLANK_LINE_RANGE;
        let line_state = Util.BLANK_LINE;
      
        lines.forEach((line, index) => {
          line_state = Util.get_line_state(line);
      
          if (range_state === Util.UPPER_BLANK_LINE_RANGE){
            result.push(line);
            if (line_state === Util.NOT_BLANK_LINE){
              range_state = Util.NOT_BLANK_LINE_RANGE
            }
          }
          else if(range_state === Util.NOT_BLANK_LINE_RANGE){
            if (line_state === Util.NOT_BLANK_LINE){
              result.push(line);
            }
            else{
              range_state = Util.BOTTOM_BLANK_LINE_RANGE
            }
          }
        });
        return result;
      }
      
    static detect_ws_level(lines: string[][]): number[]{
        let no_ws_level_list: number[] = []
        lines.forEach((line, index) => {
          line.forEach((word, i) => {
            if (word !== ''){
              no_ws_level_list.push(i)
              return
            }
          })
        })
        // console.log(`ws_level_list=${ws_level_list}`);
        return no_ws_level_list;
    }
    static remove_left_blank_cols(lines: string[][]):string[][]{
        const list = Util.detect_ws_level(lines)
        let pos = Math.min(...list)
        return Util.reform_sub(lines, pos)
    }

    static reform_sub(lines: string[][], pos:number):string[][]{
        let result:string[][] = [];
        lines.forEach((line, index) => {
          let result2:string[] = [];
          line.forEach((word, i) => {
            if (i >= pos) {
              result2.push(word);
            }
          });
          result.push(result2);
        });
        Logger.log(`reform_sub result=${result}`);
        return result;
    }
      
      
    static getAsJSON(values: string[][]): string {
        // Util.log(`Util.getAsJSON 1 values.length=${values.length} $values[0]=${values[0]}`)
        // const xarray: string[][] = [[]];
        const init_value: StringStringAssoc = {"":""};
        const xarray: StringSSA = {"":init_value};
        //先頭行にラベルがあるものとして、それ以降の行に各カラムにラベルをキーとして、カラムの値を値とする連想配列を作成
        let first_i = 0;
        let second_i_str = "";
        let index = 0;
        let index_str = "";
        for (let i = 1; i < values.length; i++) {
            // Util.log(`Util.getAsJSON 2 i=${i}`)

            index = i -1;
            index_str = index.toString();
            xarray[index_str] = {};
            for (let j = 0; j < values[0].length; j++) {
                // Util.log(`Util.getAsJSON j=${j}`)
                first_i = i - 1;
                second_i_str = values[0][j];
                xarray[first_i][second_i_str] = values[i][j];
            }
        }
        //オブジェクトの変数をJSON形式に変換
        const json = JSON.stringify(xarray);
        return json;
    }
    static son2string(sn: StringOrNull): string {
        if (typeof sn === "string") {
            return sn;
        }
        else {
            return "";
        }
    }
}
