export class Dayx {
  day: Date;
  private constructor(day: Date) {
    this.day = day;
  }

  static today(): Dayx {
    const day = new Date();
    return new Dayx(day);
  }
  static setYearMonthDate(year: number, month: number, date: number): Dayx {
    const day = new Date(year, month, date);
    return new Dayx(day);
  }
  year(): number {
    return this.day.getFullYear();
  }
  month(): number {
    return this.day.getMonth();
  }
  yearMonthStr(): string {
    //return this.day.format('YYYY-MM');
    return Utilities.formatDate(this.day, "JST", "yyyy-MM");
  }
  dayStr(): string {
    // return this.day.format('YYYY-MM-DD');
    return Utilities.formatDate(this.day, "JST", "yyyy-MM-dd");
  }
}

// export default Dayx;