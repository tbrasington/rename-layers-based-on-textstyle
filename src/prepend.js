import {rename,getLibraryStyles,mapLocalStyles}  from './utils'

export default function(context) {

  const doc = context.document;
  const pages = doc.pages()
  const LocalTextStyles = mapLocalStyles(doc.documentData().layerTextStyles().sharedStyles());
  const DocumentStylesFromLibrary= getLibraryStyles()

  rename(pages, LocalTextStyles, DocumentStylesFromLibrary, 'prepend');
}