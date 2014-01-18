/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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

init();

function init()
{
	fl.outputPanel.clear();
	
	//var choice = confirm("Do you want to select automaticaly from the library the images with no source?\n\n[ OK ] for YES\n[ CANCEL ] for NO (use the current selected item(s) in library)");

	var input_folder = get_folder('Where are your .swf files?');
	var output_folder = get_folder('Where do you want to write your .png files?');
	
	fl.trace('input: ' + input_folder);
	fl.trace('output: ' + output_folder);
}

function get_folder(message){
	var folder = decodeURI(fl.browseForFolderURL(message || "Please choose a folder"));

	if( folder == "null" ) return;

	return folder + "/";
}