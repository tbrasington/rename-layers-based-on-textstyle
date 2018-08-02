export function rename(pages, AllTextStyles, prepend) {
  
  pages.forEach(page => {
    page.artboards().forEach(artboard => {
      recursiveRename(artboard.layers(),AllTextStyles, prepend)
    })
  });
 }

function recursiveRename(layers,AllTextStyles, action) {
  
  getTextLayers(layers, function(layer){
    
    let currentName = layer.name();
    let textLayerStyle = layer.style(); 
    let sharedID = textLayerStyle.sharedObjectID()
    let styleSearch = NSPredicate.predicateWithFormat("objectID == %@", sharedID);
    let MatchedStyleName = AllTextStyles.filteredArrayUsingPredicate(styleSearch);
    if(MatchedStyleName.length){
        if(action==="prepend") {
          layer.setName(MatchedStyleName[0].name() +   ' - ' + currentName); 
        } else if (action==="append") {
          layer.setName(currentName + ' - ' + MatchedStyleName[0].name() ); 
        } else { 
          layer.setName(MatchedStyleName[0].name());
      }
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
