// import * as Webappxy from './webapp';
// Code.js
import { Webapp } from "./webapp";
import { Listapp } from "./listapp";
import { Item } from "./item";

// import { GIO } from './giojs';
export function doGet(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent): GASHtmlTextOutputType {
    // return Webapp.dogetx(e);
    // return Webapp.doGet_0(e);
    // 12345
    // return Webapp.doGet_1(e);
    const webapp = new Webapp();
    return webapp.doGetx(e);
}
export function doPost(e: GoogleAppsScript.Events.DoPost): GASHtmlTextOutputType {
    const webapp = new Webapp();
    return webapp.doPostx(e);
}
export function getData(): { [index: string]: Item } {
    const listapp = new Listapp();
    return listapp.getData();
}
export function testGetData(): GASHtmlTextOutputType {
    const webapp = new Webapp();
    return webapp.testGetData();
}
export function testDataX(): GASHtmlTextOutputType {
    const webapp = new Webapp();
    return webapp.testDataX();
}
export function testData2(): GASHtmlTextOutputType {
    const webapp = new Webapp();
    return webapp.testData2();
}
export function testData3(): void {
    const webapp = new Webapp();
    webapp.testData3();
}
export function testData4(): string {
    const webapp = new Webapp();
    return webapp.testData4();
}
