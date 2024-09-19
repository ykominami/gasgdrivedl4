export class Item {
  name: string;
  url: string;
  itemArray: Record<string, Item>;
  constructor(options: { name: string, url: string }) {
    this.name = options.name;
    this.url = options.url;
    this.itemArray = {};
  }
  add(name: string, url: string): void {
    this.itemArray[name] = new Item({ name: name, url: url });
  }
  getArray(): Record<string, Item> {
    return this.itemArray;
  }
  getAsJson(): string {
    const marray = Object.keys(this.itemArray).map((key) => {
      const namex = this.itemArray[key].name;
      const urlx = this.itemArray[key].url;
      return [key, namex, urlx];
    });
    return JSON.stringify(marray);
  }
}
// export default Item;