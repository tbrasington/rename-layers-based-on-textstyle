export function getLibraryStyles(){
 // map library styles to an object for cross references
 let LibraryStyles = {}
 AppController.sharedInstance().librariesController().userLibraries().forEach(library=>{
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

 return DocumentStylesFromLibrary;
}

export function rename(pages, LocalTextStyles,LibraryStyles,   prepend) {
  
  pages.forEach(page => {
    page.artboards().forEach(artboard => {
      recursiveRename(artboard.layers(),LocalTextStyles, LibraryStyles, prepend)
    })
  });
 }

function recursiveRename(layers,LocalTextStyles,LibraryStyles, action) {
 
  getTextLayers(layers, function(layer){

    let currentName = layer.name();
    let textLayerStyle = layer.style(); 
    //log('layer id ' + textLayerStyle.sharedObjectID())
    let sharedID = textLayerStyle.sharedObjectID()
    
    // local document first
    let styleSearch = NSPredicate.predicateWithFormat("objectID == %@", sharedID);
    let MatchedStyleName = LocalTextStyles.filteredArrayUsingPredicate(styleSearch);

     // check libraries next
     let newName='';

     if(MatchedStyleName.length){
      newName =  MatchedStyleName[0].name()
     }

     Object.keys(LibraryStyles).forEach(item=>{
      if(String(item)===String(sharedID)){
       newName = LibraryStyles[item].name 
      }
    });
    
         if(action==="prepend") {
          layer.setName(newName +   ' - ' + currentName); 
        } else if (action==="append") {
          layer.setName(currentName + ' - ' + newName ); 
        } else { 
          layer.setName(newName);
      }
    
   
  })
}

function getTextLayers(layers,callback) {

  layers.forEach(layer=>{
    if (layer.class() === MSLayerGroup) {
      getTextLayers(layer.layers(), callback);
    } else if (layer.class() === MSTextLayer) {
      callback(layer);
    }
  });
}
