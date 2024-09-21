import { doGet, doPost, testDataX, getData , testGetData } from './Code';

declare const global: {
  [x: string]: unknown;
};

global.doGet = doGet;
global.doPost = doPost;
global.testDataX = testDataX;
global.getData = getData;
global.testGetData = testGetData;
