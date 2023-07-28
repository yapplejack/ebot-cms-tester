import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { saveAs } from 'file-saver';
import '/cropper-plugin/ReactCrop.css';

//ImporterV3 is written terribly, the 2nd iteration was cleaner but lacked features, in adding the new features I should have started from scratch but was lazy, this needs to eventually be cleaned up 
//GL following the regex :?

function Importerv3() {
    const [files, setFiles] = useState([]);
    const [importedHTML, setHTML] = useState([]);
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

    //if performance was a concern then all for loops for the image handling should be combined (would be better written too)
    const modifyImageTag = (index, imageIndex) => {
        let newHTML = "";
        let splitHTML = importedHTML[index].split(/<div style={{overflow/);
        //console.log(splitHTML);
        for (let i = 0; i < splitHTML.length; i++) {
            if (splitHTML[i].match('.png"')) {
                outputImages[imageIndex] = files[parseInt(splitHTML[i].split("images/")[1].split('\"')[0].split('image')[1].split('\.png')[0])];
                outputImageText[imageIndex] = splitHTML[i].split("images/")[1].split('\"')[0].split('image')[1];
                setOutputImages(outputImages);
                setOUtputImageText(outputImageText)
                let htmlText = splitHTML[i].split('<img')[1].split('\.png\" ')[1];
                let mdText = importMD[imageIndex].split('default\}')[0];
                //console.log(index)
                //console.log('<div style={{overflow' + splitHTML[i].split('<img')[0] + mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1]);
                newHTML += '<div style={{overflow' + splitHTML[i].split('<img')[0] + mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1];
                imageIndex += 1;
                //return mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1];
            }
            else if (splitHTML[i].match('.jpg"')) {
                outputImages[imageIndex] = files[parseInt(splitHTML[i].split("images/")[1].split('\"')[0].split('image')[1].split('\.jpg')[0])];
                outputImageText[imageIndex] = splitHTML[i].split("images/")[1].split('\"')[0].split('image')[1];
                setOutputImages(outputImages);
                setOUtputImageText(outputImageText)
                let htmlText = splitHTML[i].split('<img')[1].split('\.jpg\" ')[1];
                let mdText = importMD[imageIndex].split('default\}')[0];
                newHTML += '<div style={{overflow' + splitHTML[i].split('<img')[0] + mdText + 'default\} ' + htmlText.split('\}\}')[0] + ', maxWidth: "none"\}\}' + htmlText.split('\}\}')[1];
                imageIndex += 1;
            }
            else {
                newHTML += splitHTML[i];
            }
        }
        return newHTML;
    }

    //If more than one image is floated then the last floated one will be the closest to the page edge, this needs to be fixed
    //Somewhere the image width should be check to ensure that when margins are added to images they do not overflow.
    const modifySpanTag = (newHTML, imageIndex) => {
        let splitHTML = newHTML.split(/<div style={{overflow/);
        newHTML = '';
        for (let i = 0; i < splitHTML.length; i++) {
            if (splitHTML[i].match(/^: 'hidden'/)) {
                if (importMD[imageIndex].match(/left=\"-?(\d+)/i)) {
                    //console.log(parseFloat(importMD[imageIndex].match(/left=\"-?(\d+)/i)[1]));
                    if (parseFloat(importMD[imageIndex].match(/left=\"-?(\d+)/i)[1]) > 375) {
                        //floatPosition = importedHTML[index][1].split('width')[0] + 'float: \'right\', ' + 'width' + importedHTML[index][1].split('width')[1].split('\}\}')[0];
                        newHTML += '<div style={{overflow: \'hidden\', ' + 'float: \'right\', ' + splitHTML[i].split(': \'hidden\', ')[1].split(/overflow/)[0] +
                            'float: \'right\', overflow: \'hidden\', ' + splitHTML[i].split(/overflow: 'hidden', /)[1];
                    }
                    else {
                        newHTML += '\n\n<div style={{overflow: \'hidden\', ' + 'float: \'left\', ' + splitHTML[i].split(': \'hidden\', ')[1].split(/overflow/)[0] +
                            'float: \'left\', overflow: \'hidden\', ' + splitHTML[i].split(/overflow: 'hidden', /)[1] + '\n\n';
                    }
                }
                else
                {
                    newHTML += '<div style={{overflow' + splitHTML[i]
                }
                imageIndex += 1;
            }
            else if (splitHTML[i].match(/: 'hidden'/)) {
                throw new Error('I thought that overflow hidden would only exist with images or perhaps the image was not wrapped with a span. Please let Jack know you encounter this error.');
            }
            else {
                newHTML += splitHTML[i];
            }
        }
        return [newHTML, imageIndex]
    }

    //this function does not currently work with V3
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
                saveAs(content, "images.zip");
            });
        }
    }

    const modifyFiles = () => {
        let imageIndex = 0;
        //importedHTML.length
        for (let i = 0; i < importedHTML.length; i++) {
            if (importedHTML[i].match(/<div style={{overflow:/)) {
                let newHTML = modifyImageTag(i, imageIndex);
                [exportText[i], imageIndex] = modifySpanTag(newHTML, imageIndex);
            }
            else {
                exportText[i] = importedHTML[i];
            }
            setExportText(exportText);
        }
        console.log(exportText);
        console.log(outputImageText);
        //upscaleFromHMTL();
        createMarkdownFile();
        //generateFiles();
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

                res = frontTag + "<span style={{" + res + "</img></span></div>";
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

                        res = frontTag + "<span style={{" + res + "</img></span></div>";
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
            setHTML(importedHTML);

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
        console.log('in');
        let numSpaces = 0;
        let newHTML = [];
        let newIndex = 0;
        for (let i = 0; i < importedHTML.length; i++) {
            if (importedHTML[i] == '') {
                numSpaces += 1;
            }
            else if (importedHTML[i].match(/(?!.*img)(?!.*pageBreakAfter)(?!.*>[^<]+?<)^<.*?></)) {
                numSpaces += 1;
                //if things are being erased it is probably the regex above
            }
            else {
                if (numSpaces > 0) {
                    let space = "<p>";
                    for (let j = 0; j < numSpaces; j++) {
                        space += '<br /> '
                    }
                    space += '</p>'
                    numSpaces = 0;
                    newHTML[newIndex] = space;
                    newIndex += 1;
                }
                newHTML[newIndex] = importedHTML[i];
                newIndex += 1;
            }
        }
        //why this
        for (let i = 0; i < newHTML.length; i++) {
            importedHTML[i] = newHTML[i];
        }
        importedHTML.length = newHTML.length;
        setHTML(importedHTML);
        console.log(importedHTML);
    }

    const setupProgram = async (file) => {
        let mdText = await file[0].text();
        setFiles(file);
        let htmlContent = await file[file.length - 1].text();
        setupStyles(htmlContent.split('/head>')[0]);
        setupHTML(htmlContent);
        setupMD(mdText);
        resolveSpace();
        setSorting(true);
        console.log('here');
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
                    setHTML(importedHTML);
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