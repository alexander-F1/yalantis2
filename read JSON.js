// Import the fs module
const fs = require("fs");

// Import the axios module
const axios = require("axios");

// Import the JSON file
import * as links from "./links.json";

// Get the JSON file name without extension
const fileName = links.split(".")[0];

// Create a folder with the JSON file name and "_pages" suffix
fs.mkdir(`${fileName}_pages`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Folder created");
  }
});

// Loop through the links array in the JSON file
links.forEach((link) => {
  // Get the HTML content of the link using axios
  axios.get(link).then((response) => {
    // Get the HTML data from the response
    const html = response.data;

    // Get the link name without protocol and slashes
    const linkName = link.replace(/https?:\/\//, "").replace(/\//g, "_");

    // Save the HTML content to a file in the folder with the link name and ".html" extension
    fs.writeFile(`${fileName}_pages/${linkName}.html`, html, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File saved");
      }
    });
  });
});