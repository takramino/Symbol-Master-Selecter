import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  const doc = sketch.getSelectedDocument()

  const selectedLayers = doc.selectedLayers
  if(selectedLayers.length == 1) {
    // check selected layer is symbol instance or not
    var layer = selectedLayers.layers[0]

    if(layer.symbolId == undefined) {
      sketch.UI.message(`selected layer is not a symbol.`)
    } else {
      gotoSymbolPage(doc)
      selectMaster(doc, layer.master)
      // zoom to artboard
      zoomToArtboard(doc, layer.master)
    }
  } else if(selectedLayers.length > 1) {
    sketch.UI.message(`multiple selection not supported.`)
  } else {
    sketch.UI.message(`No layers are selected.`)
  }
}

function gotoSymbolPage(document) {
  const pages = document.pages
  const pageCount = pages.length
  for(var i = 0; i < pageCount; i++) {
    if(pages[i].name == "Symbols") {
      pages[i].selected = true
    }
  }
}

function selectMaster(document, master) {
  // clear selection before select
  document.selectedLayers.clear()

  // get layers of master
  const layers = master.layers
  if(layers.length > 0) {
    // select front layer
    var layer = layers[layers.length - 1]
    layer.selected = true

    // centerize
    //document.centerOnLayer(layer)
  }
}

function zoomToArtboard(document, master) {
  // access obj-c api from js to zoom to master
  // see: https://sketchplugins.com/d/1054-how-to-view-a-layer-s-attributes/3
  var layer = master.sketchObject
  var rect = layer.absoluteRect().rect()
  var doc = document.sketchObject
  doc.contentDrawView().zoomToFitRect(rect)
}
