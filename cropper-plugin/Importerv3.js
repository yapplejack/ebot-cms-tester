import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { saveAs } from 'file-saver';
import '/cropper-plugin/ReactCrop.css';

//Notes on LocalCrop.css in relation to google doc importing
//96 px = 1 inch in google docs, doc is 8.5" long so google doc length is 816 px and images from default margin to margin is 720px
//images will be imported larger
//currently the docs pages are 990pxs meaning images can be upscaled by 1.375
// 958 is current size of unmodified doc column, so from 531 to 958 is a resize of 1.8 however the html size is not refecltive of the size in google docs
// we are using 1.35 as the conversion factor rn but we should do the math and not be lazy

//structure: doStuff, readInput, writeOutput, low level implement


//Revalations: currently our md export is not putting images in the correct locations or order. HMTL appears to always have the image in the ideal location. Text must be read in from HMTL to ensure correct image locations.
//MD must be rewritten to always have images in correct order as we still need to know the float location from the images.

//New style will be as follows: each line of HMTL is its own line in markdown, therefore we will basically be covnerting from markdown to HMTL, this will make debugging easier as the program will better reflect the file generated


//Current bugs: lists, images are too big, positioned images are pain, fucked margins when there are rotations

//Where to find bugs:
//lists: required tools
//margins: Wheel Assembly, specifically happens with rotated images
//must add space in the header when deleting images
//page breaks will break things, test superstructure machining vs gearbox-assembly for chassis
//need to be able to deal with raw spans

function Importerv3() {
    const [files, setFiles] = useState([]);
    const [importedHTML, setHMTL] = useState([]);
    const [importMD, setMD] = useState([]);
    const [numLines, setNumLines] = useState('');
    const [numImages, setNumImages] = useState(0);
    const [doneSorting, setSorting] = useState(false);
    const [headerStyles, setHeaderStyles] = useState({});
    const [imageLocations, setImageLocations] = useState([]);

    const [outputImages, setOutputImages] = useState([]);
    const [outputImageText, setOUtputImageText] = useState([]);
    const [outputFiles, setOutputFiles] = useState([]);
    const [exportText, setExportText] = useState([]);

    const zip = require('jszip')();

    useEffect(() => {
        if (importMD != '' && files != '' && numImages == files.length - 2 && doneSorting == true) {
            console.log("called");
            modifyFiles();
        }
    }, [importMD, files, numImages, doneSorting])

    const modifyImageTag = (index, imageIndex) => {
        if (importedHTML[index][1].match('.png')) {
            outputImages[imageIndex] = files[parseInt(importedHTML[index][1].split("images/")[1].split('\"')[0].split('image')[1].split('\.png')[0])];
            outputImageText[imageIndex] = importedHTML[index][1].split("images/")[1].split('\"')[0].split('image')[1];
            setOutputImages(outputImages);
            setOUtputImageText(outputImageText)
            let htmlText = importedHTML[index][1].split('<img')[1].split('\.png\" ')[1];
            let mdText = importMD[imageIndex].split('default\}')[0];
            console.log(index)
            console.log(importedHTML);
            return mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1];
        }
        else {
            outputImages[imageIndex] = files[parseInt(importedHTML[index][1].split("images/")[1].split('\"')[0].split('image')[1].split('\.jpg')[0])];
            outputImageText[imageIndex] = importedHTML[index][1].split("images/")[1].split('\"')[0].split('image')[1];
            setOutputImages(outputImages);
            setOUtputImageText(outputImageText)
            let htmlText = importedHTML[index][1].split('<img')[1].split('\.jpg\" ')[1];
            let mdText = importMD[imageIndex].split('default\}')[0];
            console.log(index)
            console.log(importedHTML);
            return mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1];
        }
    }

    const modifySpanTag = (index, imageIndex) => {
        console.log(importedHTML[index][1])
        let floatPosition = importedHTML[index][1].split('width')[0] + 'width' + importedHTML[index][1].split('width')[1].split('\}\}')[0];
        if (importMD[imageIndex].match(/left=\"-?(\d+)/i)) {
            console.log(parseFloat(importMD[imageIndex].match(/left=\"-?(\d+)/i)[1]));
            if (parseFloat(importMD[imageIndex].match(/left=\"-?(\d+)/i)[1]) > 375) {
                floatPosition = importedHTML[index][1].split('width')[0] + 'float: \'right\', ' + 'width' + importedHTML[index][1].split('width')[1].split('\}\}')[0];
            }
            else {
                floatPosition = importedHTML[index][1].split('width')[0] + 'float: \'left\', ' + 'width' + importedHTML[index][1].split('width')[1].split('\}\}')[0];
            }
        }
        return floatPosition + "\}\}>"
    }

    const upscaleFromHMTL = () => {
        for (let i = 0; i < exportText.length; i++) {
            if (importedHTML[i][0] == 'img') {
                let widths = exportText[i].split('width: \'');
                let heights = exportText[i].split('height: \'');
                let margTop = exportText[i].split('marginTop: \'');
                let margLeft = exportText[i].split('marginLeft: \'');
                for (let j = 1; j < 3; j++) {
                    widths[j - 1] = widths[j].split('px')[0];
                    heights[j - 1] = heights[j].split('px')[0];
                }
                margTop[0] = margTop[1].split('px')[0];
                margLeft[0] = margLeft[1].split('px')[0];
                //console.log(exportText[i]);
                //console.log(widths[0] + " converted: " + Math.round(parseFloat(widths[0]) * 1.8 * 100)/100);
                exportText[i] = exportText[i].split('width: \'')[0] + 'width: \'' + Math.round(parseFloat(widths[0]) * 1 * 100) / 100 + 'px\', height: \''
                    + Math.round(parseFloat(heights[0]) * 1 * 100) / 100 + 'px\'\}\}' + exportText[i].split('\}\}')[1].split('width: \'')[0] + 'width: \''
                    + Math.round(parseFloat(widths[1]) * 1 * 100) / 100 + 'px\', height: \''
                    + Math.round(parseFloat(heights[1]) * 1 * 100) / 100 + 'px\', marginLeft: \''
                    + Math.round(parseFloat(margLeft[1]) * 1 * 100) / 100 + 'px\', marginTop: \''
                    + Math.round(parseFloat(margTop[1]) * 1 * 100) / 100 + 'px\', transform' + exportText[i].split('\}\}')[1].split('transform')[1] + '\}\}' + exportText[i].split('\}\}')[2];
            }
        }
    }

    const createMarkdownFile = () => {
        let finalText = ""
        for (let i = 0; i < exportText.length; i++) {
            finalText += exportText[i] + "\n\n"
        }
        console.log(finalText);
    }

    const generateFiles = () => {
        if (outputImages.length > 0) {
            console.log(outputImages);
            for (let i = 0; i < outputImages.length; i++) {
                console.log(outputImageText[i])
                if (outputImageText[i].match(/.jpg/)) {
                    zip.file("image_" + i + ".jpg", outputImages[i]);
                }
                else {
                    zip.file("image_" + i + ".png", outputImages[i]);
                }
            }
            zip.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, "example.zip");
            });
        }
    }

    const modifyFiles = () => {
        let imageIndex = 0;
        for (let i = 0; i < importedHTML.length; i++) {
            if (importedHTML[i][0] == 'img') {
                exportText[i] = modifyImageTag(i, imageIndex);
                exportText[i] = modifySpanTag(i, imageIndex) + exportText[i];
                imageIndex += 1;
            }
            else {
                exportText[i] = importedHTML[i][1];
            }
            setExportText(exportText);
        }
        console.log(exportText);
        upscaleFromHMTL();
        createMarkdownFile();
        generateFiles();
    }

    //styles we need to care about: text-align:center, color, font-weight, maybe font size
    const setupStyles = function (htmlHead) {
        let tempStyles = htmlHead.split('table th')[1].match(/(?<=\}).*?(?=\})/g);
        let collectedStyles = [];
        for (let i = 0; i < tempStyles.length; i++) {
            collectedStyles[i] = tempStyles[i].split('\{')[0] + ' ';
            let len = collectedStyles[i].length;
            if (tempStyles[i].match(/text-align:center/)) {
                collectedStyles[i] += "textAlign: 'center'";
            }
            if (tempStyles[i].match(/color:/)) {
                //collectedStyles[i] += 'color: "#' + tempStyles.match(/(?<=color:#).*?(?=;)/)
            }
            if (tempStyles[i].match(/font-weight/) && !tempStyles[i].match(/font-weight:400/)) {
                if (collectedStyles[i].length != len) {
                    collectedStyles[i] += ', ';
                }
                collectedStyles[i] += 'fontWeight: "' + tempStyles[i].match(/(?<=font-weight:).*?(?=;|$|\})/) + '"';
            }
            if (tempStyles[i].match(/background-color:/) && !tempStyles[i].match(/background-color:#ffffff/)) {
                if (collectedStyles[i].length != len) {
                    collectedStyles[i] += ', ';
                }
                collectedStyles[i] += 'backgroundColor: "#' + tempStyles[i].match(/(?<=background-color:#).*?(?=;|$|\})/) + '"'
            }
            if (tempStyles[i].match(/font-size/) && !tempStyles[i].match(/font-size:11/)) {
                if (collectedStyles[i].length != len) {
                    collectedStyles[i] += ', ';
                }
                collectedStyles[i] += 'fontSize: "' + tempStyles[i].match(/(?<=font-size:).*?(?=;|$|\})/) + '"';
            }
            if (tempStyles[i].match(/text-decoration/) && !tempStyles[i].match(/text-decoration:none/)) {
                if (collectedStyles[i].length != len) {
                    collectedStyles[i] += ', ';
                }
                collectedStyles[i] += 'textDecoration: "' + tempStyles[i].match(/(?<=text-decoration:).*?(?=;|$|\})/) + '"';
            }
        }
        let goodTags = {
            "h1": true,
            "h2": true,
            "h3": true,
            "h4": true,
            "h5": true,
            "h6": true,
            "ol": true,
            "ul": true,
            "li": true,
            "a": true
        };
        for (let i = 0; i < collectedStyles.length; i++) {
            if (!collectedStyles[i].match(/\.?\w\d*?\s$/) && !goodTags.hasOwnProperty(collectedStyles[i].match(/\S+/)[0])) {
                if (collectedStyles[i].match(/\S+/)[0].match(/^\.\S+/)) {
                    headerStyles[collectedStyles[i].match(/(?<=^\.)\S+/)[0]] = collectedStyles[i].match(/(?<=\S+\s).*/)[0];
                }
                else {
                    headerStyles[collectedStyles[i].match(/\S+/)[0]] = collectedStyles[i].match(/(?<=\S+\s).*/)[0];
                }
            }

        }
        setHeaderStyles(headerStyles);
        console.log(headerStyles);
    }

    //I am so sorry, it worked the first time I used it and rewriting it is not a prio rn
    //I will use a video to explain this function as comments will not help you with this mess
    //Cannot handle tables, might want that feature
    const setupHTML = async (htmlContent) => {
        htmlContent = htmlContent.split('</head>')[1].match(/(?<=>).*/)[0];
        let numSpaces = 0;
        let currIndex = 0;
        let imageNum = 0;
        let numTagsJumped = 0;
        let topLevel = [];
        let currTopLevel = htmlContent.match(/(?<=<).*?(?=>|\s)|<^\S*?(?=>|\s)/)[0];
        let split = htmlContent.indexOf(currTopLevel);
        topLevel[currIndex] = htmlContent.slice(0, split + 1 + currTopLevel.length);
        htmlContent = htmlContent.slice(split + 1 + currTopLevel.length);
        while (htmlContent != '</html>') {
            if (currTopLevel == 'hr') {
                topLevel[currIndex] += htmlContent.slice(0, htmlContent.search('>') + 1);
                htmlContent = htmlContent.slice(htmlContent.search('>') + 1)
                currTopLevel = htmlContent.match(/(?<=<).*?(?=>|\s)|<^\S*?(?=>|\s)/)[0];
                split = htmlContent.indexOf(currTopLevel);
                currIndex += 1;
                if (htmlContent.slice(split + 1 + currTopLevel.length)[0] == '<') {
                    topLevel[currIndex] = currTopLevel + ">";
                }
                else {
                    topLevel[currIndex] = currTopLevel + " ";
                }
                topLevel[currIndex] = htmlContent.slice(0, split + 1 + currTopLevel.length);
                htmlContent = htmlContent.slice(split + 1 + currTopLevel.length);
            }
            let foundTag = false;
            let closeTag = new RegExp(`(?<=</)${currTopLevel}(?=>)`);
            let falseTagFinder = new RegExp(`(?<=<)${currTopLevel}(?=>| )`);
            //while(!foundTag)
            //{
            if (htmlContent.search(closeTag) > htmlContent.search(falseTagFinder) && htmlContent.search(falseTagFinder) != -1) {
                throw new Error("OwO what is this? I was not able to find it in my test cases but you found the something that breaks my code. Please Jack know you 'found nested HTML tags on a doc import'.");
            }
            else if (htmlContent.search(closeTag) == -1) {
                throw new Error("HMTL not correctly parsed, please contact Jack and send them the HTML with this error message :)");
            }
            else {
                topLevel[currIndex] += htmlContent.slice(0, htmlContent.search(closeTag) + 1 + currTopLevel.length);
                htmlContent = htmlContent.slice(htmlContent.search(closeTag) + 1 + currTopLevel.length);
                currTopLevel = htmlContent.match(/(?<=<).*?(?=>|\s)|<^\S*?(?=>|\s)/)[0];
                split = htmlContent.indexOf(currTopLevel);
                currIndex += 1;
                if (htmlContent.slice(split + 1 + currTopLevel.length)[0] == '<') {
                    topLevel[currIndex] = currTopLevel + ">";
                }
                else {
                    topLevel[currIndex] = currTopLevel + " ";
                }
                topLevel[currIndex] = htmlContent.slice(0, split + 1 + currTopLevel.length);
                htmlContent = htmlContent.slice(split + 1 + currTopLevel.length);
            }
            //}
            numTagsJumped += 1;
        }
        console.log(JSON.parse(JSON.stringify(topLevel)));
        let goodTags = {
            "h1": true,
            "h2": true,
            "h3": true,
            "h4": true,
            "h5": true,
            "h6": true,
            "ol": true,
            "ul": true,
            "li": true,
            "a": true,
            "hr": true
        };
        currIndex = 0;
        imageNum = 0;
        let usePageBreak = false;
        for (let i = 0; i < topLevel.length - 1; i++) {
            let headParent = topLevel[i].match(/(?<=<).*?(?=>|\s)|<^\S*?(?=>|\s)/);
            let altParent = ''
            let currentParentElement = '';
            let ignoreEndTags = {};
            let desiredTag = false;
            let elementInit = false;
            let hasContent = false;
            let endRun = false;
            usePageBreak = false
            importedHTML[currIndex] = '';
            if (topLevel[i].match(/^<[^>]*?\sclass[^>]*?>/) && !goodTags.hasOwnProperty(headParent)) {

                let classes = topLevel[i].match(/(?<=class=").*?(?=")/)[0].split(" ");
                for (let j = 0; j < classes.length; j++) {
                    if (headerStyles.hasOwnProperty(classes[j]) && desiredTag == false) {
                        importedHTML[currIndex] = "<div style={{ " + headerStyles[classes[j]];
                        altParent = 'div';
                        desiredTag = true;
                        elementInit = true;
                    }
                    else if (headerStyles.hasOwnProperty(classes[j]) && desiredTag == true) {
                        importedHTML[currIndex] += ", " + headerStyles[classes[j]];
                    }
                }
                if (desiredTag == true) {
                    importedHTML[currIndex] += '}}>';
                }
            }
            if (topLevel[i].match(/^<[^>]*?\sstyle[^>]*?>/) && headParent != 'hr') {
                desiredTag = true;
                hasContent = true;
                const reg = /-\webkit\-transform: 'rotate\(\d{1}\.\d{2}rad\) translateZ\(\d{1}px\)',/;
                let res = topLevel[i].match(/<\/span>/)[0].split('span style')[1].replaceAll(";", "',").replaceAll(": ", ": '").replaceAll('margin-left', 'marginLeft').replaceAll('margin-top', 'marginTop').replace(reg, "")

                    .replaceAll('border: 0.00px solid #000000,', '').replace('="', "").replaceAll(", -webkit-transform: 'rotate(0.00rad) translateZ(0px)',", "").replace('px,"', "px").replace('>', '}}>').replace('">', "'}}>").replace("style=", "style={{ ")
                    .replace("px',\"", "px'").replace("\" title=\"'", "").replace("\"width", 'width');


                let frontTag = "<div style={{overflow: 'hidden', display: 'inline-block', margin: '0.00px 0.00px'}}>"

                res = frontTag + "\n<span style={{" + res + "</img> </span>\n</div>";
                importedHTML[currIndex] = res;
                imageNum += 1;
                currIndex += 1;
                importedHTML[currIndex] = '';
                endRun = true;
            }
            if (goodTags.hasOwnProperty(headParent)) {
                if (headParent == 'hr') {
                    importedHTML[currIndex] = "<div style={{pageBreakAfter: 'always'}}></div>"
                    endRun = true;
                    desiredTag = true;
                }
                else {
                    importedHTML[currIndex] = '<' + headParent + '>';
                    elementInit = true;
                    desiredTag = true;
                }
            }
            if (desiredTag == false) {
                ignoreEndTags[headParent] = true;
            }
            topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
            let numRuns = 0;
            //if numRuns exceed 5000 normally I will be shocked (maybe tables could be weird)
            while (endRun == false && numRuns < 5000) {
                desiredTag = false;
                //is the next piece HTML element?
                if (topLevel[i].match(/^<[^/]/)) {
                    let currentParentElement = topLevel[i].match(/(?<=<).*?(?=>|\s)|<^\S*?(?=>|\s)/);
                    //most likely a p or span element, need to create exception for headers
                    if (topLevel[i].match(/^<[^>]*?\sclass[^>]*?>/) && !goodTags.hasOwnProperty(currentParentElement) && headParent != 'h1') {
                        let classes = topLevel[i].match(/(?<=class=").*?(?=")/)[0].split(" ");
                        for (let j = 0; j < classes.length; j++) {
                            if (headerStyles.hasOwnProperty(classes[j]) && elementInit == false) {
                                importedHTML[currIndex] = "<span style={{ " + headerStyles[classes[j]];
                                desiredTag = true;
                                elementInit = true;
                            }
                            else if (headerStyles.hasOwnProperty(classes[j]) && desiredTag == true) {
                                importedHTML[currIndex] += ", " + headerStyles[classes[j]];
                            }
                            else if (headerStyles.hasOwnProperty(classes[j])) {
                                importedHTML[currIndex] += "<span style={{ " + headerStyles[classes[j]];
                                desiredTag = true;
                            }
                        }
                        if (desiredTag == true) {
                            if (currentParentElement == 'span') {
                                ignoreEndTags[currentParentElement] = false;
                            }
                            importedHTML[currIndex] += '}}>';
                        }
                        topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                    }
                    //probably an image
                    else if (topLevel[i].match(/^<[^>]*?\sstyle[^>]*?>/) && currentParentElement != 'hr') {
                        hasContent = true;
                        desiredTag = true;
                        const reg = /-\webkit\-transform: 'rotate\(\d{1}\.\d{2}rad\) translateZ\(\d{1}px\)',/;
                        let res = topLevel[i].match('.*?(?=<\/)')[0].split('span style')[1].replaceAll(";", "',").replaceAll(": ", ": '").replaceAll('margin-left', 'marginLeft').replaceAll('margin-top', 'marginTop').replace(reg, "")

                            .replaceAll('border: 0.00px solid #000000,', '').replace('="', "").replaceAll(", -webkit-transform: 'rotate(0.00rad) translateZ(0px)',", "").replace('px,"', "px").replace('>', '}}>').replace('">', "'}}>").replace("style=", "style={{ ")
                            .replace("px',\"", "px'").replace("\" title=\"'", "").replace("\"width", 'width');


                        let frontTag = "<div style={{overflow: 'hidden', display: 'inline-block', margin: '0.00px 0.00px'}}>"

                        res = frontTag + "\n<span style={{" + res + "</img> </span>\n</div>";
                        topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                        topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                        topLevel[i] = topLevel[i].replace(/^<\/.*?>/, '');
                        importedHTML[currIndex] += res;
                        imageNum += 1;


                    }
                    //something like <a>, header: h1, h2 or list element <ol>, <li>, <ul>
                    else if (goodTags.hasOwnProperty(currentParentElement)) {
                        desiredTag = true;
                        if (currentParentElement == 'hr') {
                            //importedHTML[currIndex] += "<div style={{pageBreakAfter: 'always'}}></div>"
                            topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                            //endRun = true;
                            desiredTag = true;
                            usePageBreak = true;
                            console.warn("Please investigate pagebreaks, there may a positioned image attached to one, ask Jack how to fix.\n");
                        }
                        else if (currentParentElement == 'a') {
                            importedHTML[currIndex] += topLevel[i].match(/<a.*?<\/a>/);
                            topLevel[i] = topLevel[i].replace(/<a.*?<\/a>/, '');
                        }
                        else {
                            importedHTML[currIndex] += '<' + currentParentElement + '>';
                            topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                        }
                    }
                    else {
                        topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                    }
                    if (desiredTag == false) {
                        ignoreEndTags[currentParentElement] = true;

                    }
                }
                //is the next piece a closing element?
                else if (topLevel[i].match(/^<\//)) {

                    let closeTag = new RegExp(`(?<=^</)${headParent}(?=>)`);
                    if (topLevel[i].match(closeTag)) {

                        endRun = true;
                        if (ignoreEndTags.hasOwnProperty(headParent) && ignoreEndTags[headParent] == true) {
                            //probably do nothing
                        }
                        else if (altParent != '') {
                            importedHTML[currIndex] += '</' + altParent + '>';
                            //topLevel[i] = topLevel[i].replace(/<(?<=<).*?>/, '');
                        }
                        else {
                            importedHTML[currIndex] += '</' + headParent + '>';
                        }
                    }
                    else {
                        //good place to look for empty spans
                        if (ignoreEndTags.hasOwnProperty(topLevel[i].match(/(?<=^<\/).*?(?=>)/)) && ignoreEndTags[topLevel[i].match(/(?<=^<\/).*?(?=>)/)] == true) {
                            ignoreEndTags[currentParentElement] = false;
                            topLevel[i] = topLevel[i].replace(/^<\/.*?>/, '');
                        }
                        else {
                            importedHTML[currIndex] += topLevel[i].match(/^<\/.*?>/);
                            topLevel[i] = topLevel[i].replace(/^<\/.*?>/, '');
                        }
                    }
                }
                //otherwise the element is text
                else {
                    elementInit = true;
                    importedHTML[currIndex] += topLevel[i].match(/.*?(?=<\/)/);
                    topLevel[i] = topLevel[i].replace(/.*?(?=<\/)/, '');
                }
                numRuns += 1;
            }
            if (endRun == true) {
                currIndex += 1;
                if (usePageBreak == true) {
                    console.warn('broke page');
                    importedHTML[currIndex] = "<div style={{pageBreakAfter: 'always'}}></div>"
                    currIndex += 1;
                    usePageBreak = false;
                }
            }
            if (endRun == false) {
                throw new Error('Unable to parse HTML at top level item: ' + i);
            }
            //kill current body in topLevel
            setHMTL(importedHTML);

        }

        console.log(importedHTML);
    }

    const setupMD = function (mdText) {
        mdText = mdText.split("\n").filter(function (e) { return e })
        let i = 0;
        while (i < mdText.length && !mdText[i].match('<img src=')) {
            i += 1;
        }
        let mdImages = []
        while (i < mdText.length) {
            mdImages.push(mdText[i]);
            i += 1;
        }
        setNumImages(mdImages.length);
        setMD(mdImages);
    }

    const resolveSpace = function () {
        let numSpaces = 0;
        let newHTML = [];
        let newIndex = 0;
        for (let i = 0; i < importedHTML.length; i++) {
            if (importedHTML[i]) {
                numSpaces += 1
            }
            else if (true) {
                
            }
        }
    }

    const setupProgram = async (file) => {
        let mdText = await file[0].text();
        setFiles(file);
        let htmlContent = await file[file.length - 1].text();
        setupStyles(htmlContent.split('/head>')[0]);
        setupHTML(htmlContent);
        setupMD(mdText);
        //setSorting(true);
        //console.log(importedHTML);
    }

    const startImporting = async (file) => {
        console.log('in')
        if (file[0].name.split('.').pop() != "md") {
            throw new Error('Please attach your markdown file as the first file (rename it so that it comes first in the file directory');
        }
        if (file[file.length - 1].name.split('.').pop() != "html") {
            throw new Error('Please have your HTML file last (rename it to be last in the file directory)');
        }
        await setupProgram(file);
    }

    return (
        <div className="Importer">
            <center>
                <input multiple
                    type="file"
                    onChange={(e) => {
                        startImporting(e.target.files);
                    }}
                />

            </center>
        </div>
    );
}

export default Importerv3;



/*
const setupHTML = function (htmlContent) {
        htmlContent = htmlContent.split('</head>')[1].split('</p>');
        let numSpaces = 0;
        let currIndex = 0;
        let imageNum = 0;
        for(let i = 0; i < htmlContent.length - 1; i++)
        {
            let htmlP = htmlContent[i].split('</span>');
            let textCollection = [];
            let textIndex = 0;
            let pBreak = false;
            for(let j = 0; j < htmlP.length; j++)
            {
                if(htmlP[j] != '')
                {
                    if(htmlP[j].match(/hr\sstyle=/i))
                    {
                        pBreak = true;
                    }
                    else if(htmlP[j].split('<span')[1].match(/\d\">$/) && !htmlP[j].split('span')[1].match(/style/i))
                    {
                        numSpaces += 1;
                    }
                    else if(numSpaces > 0)
                    {
                        let space = "<p>";
                        for(let j =0; j < numSpaces; j++)
                        {
                            space += '<br /> '
                        }
                        space += '</p>'
                        numSpaces = 0;
                        importedHTML[currIndex] = ['space', space];
                        currIndex += 1;
                    }
                    if(!htmlP[j].match(/hr\sstyle=/i) && htmlP[j].split('span')[1].match(/style=\"o/i))
                    {
                        if(textCollection.length > 0)
                        {
                            for(let j = 1; j < textCollection.length; j++)
                            {
                                textCollection[0] += textCollection[j];
                            }
                            importedHTML[currIndex] = ['text', textCollection[0]];
                            currIndex += 1;
                            textCollection.length = 0;
                        }
                        const reg = /-\webkit\-transform: 'rotate\(\d{1}\.\d{2}rad\) translateZ\(\d{1}px\)',/;
                        let res = htmlP[j].split('span style')[1].replaceAll(";", "',").replaceAll(": ", ": '").replaceAll('margin-left', 'marginLeft').replaceAll('margin-top', 'marginTop').replace(reg, "")
                        
                        .replaceAll('border: 0.00px solid #000000,', '').replace('="', "").replaceAll(", -webkit-transform: 'rotate(0.00rad) translateZ(0px)',", "").replace('px,"', "px").replace('>', '}}>').replace('">', "'}}>").replace("style=", "style={{ ")
                        .replace("px',\"", "px'").replace("\" title=\"'", "").replace("\"width", 'width');
                        res = "<span style={{" + res + "</img> </span>";
                        importedHTML[currIndex] = ["img", res];
                        currIndex += 1;
                        imageNum += 1;
                    }
                    else if(!htmlP[j].match(/hr\sstyle=/i) && htmlP[j].split('span')[1].match(/<\/a>/))
                    {
                        textCollection[textIndex] = '<a' + htmlP[j].split('<a')[1].split('<\/a>')[0] + '<\/a>';
                        textIndex += 1;
                    }
                    else if(!htmlP[j].match(/hr\sstyle=/i) && numSpaces == 0)
                    {
                        textCollection[textIndex] = htmlP[j].split('span')[1].split('>')[1];
                        textIndex += 1;
                    }
                    setHMTL(importedHTML);
                    setNumLines(currIndex);
                    setNumImages(imageNum);
                }
            }
            if(textCollection.length > 0)
            {
                for(let j = 1; j < textCollection.length; j++)
                {
                    textCollection[0] += textCollection[j];
                }
                importedHTML[currIndex] = ['text', textCollection[0]];
                currIndex += 1;
            }
            if(pBreak == true)
            {
                importedHTML[currIndex] = ["break", 'pageBreak'];
                currIndex += 1;
            }
        }
    }
*/