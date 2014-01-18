/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */


/*

	credit to:

	http://abitofcode.com/2011/11/export-flash-library-items-as-pngs-with-jsfl/
	
*/

/*
 .
 .	LibraryIMG2PNG
 .
 .	by dotmick (www.dotmick.com)
 .
 .	- Export image(s) from a library to PNG file(s)
 .	- Select automaticaly from the library the images with no source (OPTIONAL)
 .	- Generate a report
 .
 */

var profpath = fl.configURI + 'Publish%20Profiles/png.xml';
var input_folder = '';
var output_folder = '';
var pngsize = null;

// list of files
var swfs = [];

init();
convert();

function init(){
	fl.outputPanel.clear();

	var size = prompt("png size:");

	size = parseInt(size);
	if(isNaN(size)){
		throw new Error('png size must be a number');
	}

	pngsize = size;

	input_folder = get_folder('Where are your .swf files?');
	output_folder = get_folder('Where do you want to write your .png files?');
	
	fl.trace('input: ' + input_folder);
	fl.trace('output: ' + output_folder);

	if(!FLfile.exists(input_folder)){
		throw new Error('folder does not exist: ' + input_folder);
	}

	if(!FLfile.exists(output_folder)){
		throw new Error('folder does not exist: ' + output_folder);
	}
}

function convert(){
	swfs = listFolder(input_folder);

	for(var i=0; i<swfs.length; i++){
		var swf = swfs[i];
		fl.trace('swf: ' + swf);
		exportItemAsPng(swf);
	}
}

function get_folder(message){
	var folder = decodeURI(fl.browseForFolderURL(message || "Please choose a folder"));

	if( folder == "null" ) return;

	return folder + "/";
}


function listFolder(folder){
	return FLfile.listFolder(folder, "files");	
}

function importToLibrary(flDoc, file, name){
	var library = flDoc.library;

	if(FLfile.exists(file))
	{
		fl.trace("Importing -> " + name);
		
		flDoc.importFile(file, true);

		return true;
	}
	else
	{
		return false;	
	}
}


function exportItemAsPng(swf) {

	var doc = fl.createDocument();

	fl.trace("Importing -> " + swf);

	importToLibrary(doc, input_folder + swf, swf);

	var png = (swf.replace(/\.swf$/i, '')) + ".png";

	doc.width = pngsize;
	doc.height = pngsize;

  // selects the specified library item (true = replace current selection)
  doc.library.selectItem(swf, true);

  // gets an array of all currently selected items in the library.
  var selectedItems = doc.library.getSelectedItems();

  // Add the current library item to the stage
  doc.library.addItemToDocument({x:pngsize/2, y:pngsize/2});

	doc.selection[0].width = pngsize;
	doc.selection[0].scaleY = doc.selection[0].scaleX;

	if(doc.selection[0].height>pngsize){
	doc.selection[0].height = pngsize;
		doc.selection[0].scaleX = doc.selection[0].scaleY;
	}

	var pngName = output_folder + png;
	doc.exportPNG(pngName, true, true);
	fl.trace("Exported: " + pngName);

	doc.close(false);
	
}
 