
export declare class Item {
  itemArray?: Item[];
  constructor();
  add(name: string, url: string): void;
  getArray(): Item[];
  getAsJson(): string;
}

