/* globals Zotero, Components, OS, Uint8Array, PDFJS, logError */

'use strict';
var SUPPORTED_ANNOTS = ["Text", "Highlight", "Underline"];
var _viewMark = '';

window.addEventListener('message',function(e){
  // console.log(e);
   switch (e.data.type){
     case 'openPDF':
       if(e.data._viewMark){
         _viewMark = e.data._viewMark;
       }
       console.log(e);
       
       PdfExtractor.extractAnnotations({
         binary:e.data.data
       });

    }
});

var PdfExtractor = {

  /** Extract annotations from a single PDF.
   * @see Zotero.ZotFile.pdfAnnotations.pdfAttachmentsForExtraction (zotfile.js)
   * for documentation on args object.
   */

  extractAnnotations: function(args) {    
    // function logError(msg) {
    //  // Components.utils.reportError(msg);
    //   //Zotero.ZotFile.pdfAnnotations.errorExtractingAnnotations = true;
    // }

    // read file
    // https://developer.mozilla.org/en-US/docs/JavaScript_OS.File/OS.File_for_the_main_thread    
    //Components.utils.import("resource://gre/modules/osfile.jsm");
        // create Uint8Array from file data
        var int8View = new Uint8Array(args.binary);
        // set options for extractions
        // var removeHyphens = Zotero.ZotFile.getPref("pdfExtraction.NoteRemoveHyphens");
        // args.itemProgress.setProgress(0);
        // var progress = function(x, y) {
        //   args.itemProgress.setProgress(x*100/y);
        // };
        // extract annotations
        PDFJS.getPDFAnnotations(int8View, undefined, undefined,true).then(function(obj) {
           // args.itemProgress.setProgress(100);
           // var icon = obj.annotations.length>0 ? 'chrome://zotero/skin/tick.png' : 'chrome://zotero/skin/cross.png';
           // args.itemProgress.setIcon(icon);
           // args.callback.call(args.callbackObj, obj.annotations, args.item, args.att);
          //  console.log(obj);
         // console.log(document.getElementById('the-canvas').clientHeight,1111)
          window.parent.postMessage({
            type:"extractHighlight",
            _viewMark:_viewMark,
            annotations:obj.annotations,
            width:document.getElementById('the-canvas').clientWidth,
            height:document.getElementById('the-canvas').clientHeight
         },"*");

        }, function(error) {
            //args.itemProgress.setError();
           /// logError('error opening PDF: ' + args.url + ' ' + error);
           // args.callback.call(args.callbackObj, [], args.item, args.att);
        });

    // error handler for file promise
   // file promise

  } // extractAnnotations()

}; // Zotero.ZotFile.PdfExtractor

// starts extraction for the first PDF
// Zotero.ZotFile.pdfAnnotations.extractAnnotationsFromFiles();
