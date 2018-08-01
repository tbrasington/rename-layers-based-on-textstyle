import {rename}  from './utils'

export default function(context) {

  const doc = context.document;
  const pages = doc.pages()
  let AllTextStyles = doc.documentData().layerTextStyles().sharedStyles()
 
  rename(pages, AllTextStyles, false);
}