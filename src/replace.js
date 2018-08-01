import {rename}  from './utils'

export default function(context) {

  const doc = context.document;
  let AllTextStyles = doc.documentData().layerTextStyles().sharedStyles()
  rename(doc.currentPage(), AllTextStyles, false);
}