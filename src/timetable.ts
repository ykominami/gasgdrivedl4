
export class TimeTable {
  startPointOfYear: StartPointOfYearArray;
  threeItemsAssocArray: ThreeItemsAssocArray;
  constructor(startPointOfYear: StartPointOfYearArray) {
    this.startPointOfYear = startPointOfYear;
    this.threeItemsAssocArray = this.makeAsoc();
  }
  makeAsoc(): ThreeItemsAssocArray {
    const threeItemsAssocArray: ThreeItemsAssocArray = {};
    for (const [key, value] of Object.entries(this.startPointOfYear)) {
      let valuex: number = 0;
      if (typeof value === "string"){
        valuex = Number(value);
      } 

      const asoc: [ThreeItemsOrNull] = [[null, null, null]];
      for (let i = 1; i <= 12; i += 1) {
        asoc[i] = [i + valuex, 2, 8];
      }
      const year = parseInt(key, 10);
      // Util.log(`not number | ${typeof key}`);
      // Util.log(`makeAsoc key=${key}`);
      threeItemsAssocArray[year] = asoc;
    }
    // Util.log(`TimeTable makeAsoc asocTop=${threeItemsAssocArray}`);
    return threeItemsAssocArray;
  }
  getThreeItemsAssocArray(): ThreeItemsAssocArray {
    return this.threeItemsAssocArray;
  }
}

// export default TimeTable;