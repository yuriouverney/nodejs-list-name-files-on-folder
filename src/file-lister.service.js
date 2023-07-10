const fs = require('fs');
const path = require('path');

class FileLister {
  constructor(folderUrl) {
    this.folderUrl = folderUrl;
  }

  listFileNames() {
    if (!fs.existsSync(this.folderUrl)) {
      console.error('The folder does not exist.');
      return;
    }

    const files = fs.readdirSync(this.folderUrl);
    const filteredFiles = files.filter((fileName) =>
      fs.statSync(path.join(this.folderUrl, fileName)).isFile()
    );
    const fileNames = filteredFiles.join('\n');

    fs.writeFileSync('file_names.txt', fileNames);

    console.log('File names saved in file_names.txt.');
  }
}

// Usage of the class
const folderUrl = '../folder'; // Replace with the desired folder path
const lister = new FileLister(folderUrl);
lister.listFileNames();