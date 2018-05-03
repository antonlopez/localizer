
import JSZip from 'jszip';
import StreamZip from 'node-stream-zip';
import path from 'path';
import electron from 'electron';
const fs = electron.remote.require('fs');
const rimraf = require('rimraf');
const os = require('os');
const ipcRenderer  = electron.ipcRenderer;


export const unzipFile = (filePath, callback) => {
  // read a zip file
return dispatch => {
    dispatch({ type: 'LOADING' });
    const zip = new StreamZip({
      file: filePath,
      storeEntries: true
    });
    zip.on('ready', () => {
      const pathToExtract = `${__dirname}${path.sep}extracted`;

      fs.mkdirSync(pathToExtract);
      zip.extract(null, './app/extracted', (err, count) => {
        console.log(err ? 'Extract error' : `Extracted ${count} entries`);
        zip.close();
        fs.readFile(`${pathToExtract}/manifest.json`, 'utf8', (error, data) => {
          if (error) {
            console.log('invalid File');
          }
          // error handling
          const manifest = JSON.parse(data);  // json object form extracted data

          manifest.map(tk => {
            tk.img_url = `${pathToExtract}/${tk.img_url}`;
          }); // add extracted path to img

          dispatch({ type: 'FILE_EXTRACTED', manifest });

        });
      });
    });

  }
}

export const saveLanguage = (lang) => {

return {
    type: 'SAVE_LANGUAGE',
    lang
  };
}

export const saveTranslation = (devKey, text) => {
  return {
    type: 'SAVE_TRANSLATION',
    devKey,
    text
  }
};

export const generateFile = (output, language) => {
  return dispatch =>{
    dispatch({type: 'GENERATING_FILE'});
    const result = JSON.stringify(output);
    const test = os.homedir();
    let pathToSave = `${os.homedir()}${path.sep}te_language.json`;
    const date = Date.now();

    if (os.platform() === "win32"){
      pathToSave = `${os.homedir()}${path.sep}Desktop${path.sep}${language}_${date}.json`;
    }


    fs.writeFile(pathToSave, result, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    dispatch({type: 'FILE_GENERATED'});
});

  }
}

export const deletePrevious = () => {
  return dispatch => {
    dispatch({ type: 'DELETING_FILE' });
    const pathToDelete = `${__dirname}${path.sep}extracted`;
    rimraf(pathToDelete, function () { console.log('done'); });

  }

}
