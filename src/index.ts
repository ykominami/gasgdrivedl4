import { 
  doGet, 
  doPost, 
  testDataX, 
  getData,
  testGetData, 
  testData4,
  testData3,
  testData2
} from './Code';

declare const global: {
  [x: string]: unknown;
};

global.doGet = doGet;
global.doPost = doPost;
global.testDataX = testDataX;
global.getData = getData;
global.testGetData = testGetData;
global.testData4 = testData4;
global.testData3 = testData3;
global.testData2 = testData2;
