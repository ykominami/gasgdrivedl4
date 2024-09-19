
export class Datafolderx {
  folderId: string;
  fileName: string;
  file: GoogleAppsScript.Drive.File;
  dataFolder: GoogleAppsScript.Drive.Folder;
  constructor(folderId: string, fileName: string) {
    this.folderId = folderId;
    this.fileName = fileName;
    this.dataFolder = DriveApp.getFolderById(this.folderId);
    const it = this.dataFolder.getFilesByName(this.fileName);
    if (it.hasNext()) {
      this.file = it.next();
    } else {
      const doc = DocumentApp.create(this.fileName);
      const docId = doc.getId();
      this.file = DriveApp.getFileById(docId);
      this.file.moveTo(this.dataFolder);
    }
    // Util.log(this.file.getName());
  }
  getFileUrl(): string {
    return this.file.getUrl();
  }
}
