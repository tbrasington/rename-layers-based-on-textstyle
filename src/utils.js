function getTextLayers(target){
    
    let textLayers = [],
        parent  = target.children();

    parent.forEach(item=>{
      if(item.class()===MSTextLayer) {
        textLayers.push(item);
      }
    });
  
    return textLayers
}

export function rename(pages, AllTextStyles, prepend) {

  let textLayers;
  for (var i = 0; i < pages.count(); i++){
    textLayers = getTextLayers(pages[i])
  }

  textLayers.forEach(item=>{
  
    let currentName = item.name();
    let textLayerStyle = item.style(); 
    let sharedID = textLayerStyle.sharedObjectID()
    let styleSearch = NSPredicate.predicateWithFormat("objectID == %@", sharedID);
    let MatchedStyleName = AllTextStyles.filteredArrayUsingPredicate(styleSearch);
    if(MatchedStyleName.length){
        if(prepend) {
            item.setName(MatchedStyleName[0].name() +   ' - ' + currentName); 
        }  else { 
            item.setName(MatchedStyleName[0].name());
        }
    }
  });
}