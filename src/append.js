import Libraries from 'sketch/dom'
import {rename}  from './utils'

export default function(context) {
  const doc = context.document;
  const pages = doc.pages()
  
  let LocalTextStyles = doc.documentData().layerTextStyles().sharedStyles();

  // map library styles to an object for cross references
  let LibraryStyles = {}
  // AppController.sharedInstance().librariesController().userLibraries()[10].document().documentData().layerTextStyles().sharedStyles().forEach(item=>{
  //   LibraryStyles[item.objectID()]= { name : item.name() } 
  // });
  AppController.sharedInstance().librariesController().userLibraries().forEach(library=>{
    
    console.log(library.document())
    if(library.document()!==null) {
      library.document().documentData().layerTextStyles().sharedStyles().forEach(item=>{
        LibraryStyles[item.objectID()]= { name : item.name() } 
      })
    }
});
 

  // get the library styles within this document
 let DocumentStylesFromLibrary = {}
  context.document.documentData().foreignTextStyles().forEach(style => {
     //log('local id '  + style.localShareID()) // this is what the text style in an artboard will report
     //log('remote id '  +style.remoteShareID()) // this syncs to whats in the library
     DocumentStylesFromLibrary[style.localShareID()] = {
       localID  : style.localShareID(),
       libraryID : style.remoteShareID(),
       name : (LibraryStyles[style.remoteShareID()] ? LibraryStyles[style.remoteShareID()].name : 'No matched library style')
     }
  })

   rename(pages, LocalTextStyles, DocumentStylesFromLibrary, "append");
}