export function rename(pages, AllTextStyles, prepend) {
  
  pages.forEach(page => {
    page.artboards().forEach(artboard => {
      recursiveRename(artboard.layers(),AllTextStyles, prepend)
    })
  });
  
 }

function recursiveRename(layers,AllTextStyles, prepend) {
  
  process(layers, function(layer){
    
    let currentName = layer.name();
    let textLayerStyle = layer.style(); 
    let sharedID = textLayerStyle.sharedObjectID()
    let styleSearch = NSPredicate.predicateWithFormat("objectID == %@", sharedID);
    let MatchedStyleName = AllTextStyles.filteredArrayUsingPredicate(styleSearch);
    if(MatchedStyleName.length){
        if(prepend) {
          layer.setName(MatchedStyleName[0].name() +   ' - ' + currentName); 
        }  else { 
          layer.setName(MatchedStyleName[0].name());
        }
    }
  })
}

function process(layers,callback) {

  layers.forEach(layer=>{
    if (layer.class() == "MSLayerGroup") {
      process(layer.layers(), callback);
    } else if (layer.class() == "MSTextLayer") {
      callback(layer);
    }
  });
}
