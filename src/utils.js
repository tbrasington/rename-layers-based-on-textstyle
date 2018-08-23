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
