import { Itemx } from "./itemx";
import { Itemvalue } from "./itemvalue";

export class SearchItem {
  searches: Itemx[];
  value: Itemvalue;
  constructor(options: { searches: Itemx[], value: Itemvalue }) {
    this.searches = options.searches;
    this.value = options.value;
  }
};
