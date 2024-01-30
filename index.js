import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

var folderPathForUrl = "qr-code-urls";
var folderPathForImages = "qr-codes";
var fileNumber = 1;

inquirer
  .prompt([
    {
      name: "url",
      message: "Enter the URL",
      type: "input",
    },
  ])
  .then((answer) => {
    var url = answer.url;
    var qrCode = qr.image(url, { type: "png" });
    qrCode.pipe(
      fs.createWriteStream(path.join(folderPathForImages, fileNumber + ".png"))
    );

    if (!fs.existsSync(folderPathForUrl)) {
      fs.mkdir(folderPathForUrl, (err) => {
        if (err) {
          console.log("Error");
          return;
        }
      });
      console.log("Created the folder");
    }
    if (!fs.existsSync(folderPathForImages)) {
      fs.mkdir(folderPathForImages, (err) => {
        if (err) {
          console.log("Error");
          return;
        }
      });
      console.log("Created the folder");
    }
    fs.writeFile(
      path.join(folderPathForUrl, fileNumber + ".txt"),
      url,
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("File saved successfully!");
      }
    );
    fileNumber++;
  });
