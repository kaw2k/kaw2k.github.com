// The npm modules
var md = require('markdown').markdown,
    _ = require('underscore'),
    fs = require('fs');

// Other variables
var manifest = [],
    pathIn = 'assets/templates/',
    pathOut = 'assets/pages/',
    fileList = fs.readdirSync(pathIn);

// Trims the '.md' from a file name
function trimMd(str) {
    var regex = /\.md$/g;
    return str.replace(regex, '');
}

// Function to get the JSON data from a md file
function getData(fileContent) {
    var regexData = /^<data>[\s\S]+<\/data>/g, // Get the <data> tags
        regexTrim = /<data>|<\/data>|\n/g, // Trim the <data> tags
        data =  fileContent.match(regexData);

    if (data) {
        data = data[0].replace(regexTrim, '');
        data = JSON.parse(data);
        return data;
    }
    return false;
}

// Function to return the converted HTML of a markdown file
function toHTML(fileContent) {
    var regex = /<data>[\s\S]+<\/data>/g,
        clean = fileContent.replace(regex, '');

    return md.toHTML(clean);
}

// Execution
_.each(fileList, function(fileName) {
    var contents = fs.readFileSync(pathIn + fileName, 'utf8'),
        outName = trimMd(fileName) + '.html',
        json = getData(contents);

    // Add the JSON data to our manifest if there was any
    if (json) {
        manifest.push(json);
    }

    // Write to the outPath
    fs.writeFileSync(pathOut + outName, toHTML(contents), 'utf8');
});

// Write our manifest file
fs.writeFileSync(pathOut + 'manifest.json', JSON.stringify(manifest), 'utf8');
