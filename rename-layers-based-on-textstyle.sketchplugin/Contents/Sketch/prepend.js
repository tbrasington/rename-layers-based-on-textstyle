var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/prepend.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/prepend.js":
/*!************************!*\
  !*** ./src/prepend.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = context.document;
  var pages = doc.pages();
  var LocalTextStyles = doc.documentData().layerTextStyles().sharedStyles();
  var DocumentStylesFromLibrary = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getLibraryStyles"])();
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["rename"])(pages, LocalTextStyles, DocumentStylesFromLibrary, 'prepend');
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getLibraryStyles, rename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLibraryStyles", function() { return getLibraryStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rename", function() { return rename; });
function getLibraryStyles() {
  // map library styles to an object for cross references
  var LibraryStyles = {};
  AppController.sharedInstance().librariesController().userLibraries().forEach(function (library) {
    if (library.document() !== null) {
      library.document().documentData().layerTextStyles().sharedStyles().forEach(function (item) {
        LibraryStyles[item.objectID()] = {
          name: item.name()
        };
      });
    }
  }); // get the library styles within this document

  var DocumentStylesFromLibrary = {};
  context.document.documentData().foreignTextStyles().forEach(function (style) {
    //log('local id '  + style.localShareID()) // this is what the text style in an artboard will report
    //log('remote id '  +style.remoteShareID()) // this syncs to whats in the library
    DocumentStylesFromLibrary[style.localShareID()] = {
      localID: style.localShareID(),
      libraryID: style.remoteShareID(),
      name: LibraryStyles[style.remoteShareID()] ? LibraryStyles[style.remoteShareID()].name : 'No matched library style'
    };
  });
  return DocumentStylesFromLibrary;
}
function rename(pages, LocalTextStyles, LibraryStyles, prepend) {
  pages.forEach(function (page) {
    page.artboards().forEach(function (artboard) {
      recursiveRename(artboard.layers(), LocalTextStyles, LibraryStyles, prepend);
    });
  });
}

function recursiveRename(layers, LocalTextStyles, LibraryStyles, action) {
  getTextLayers(layers, function (layer) {
    var currentName = layer.name();
    var textLayerStyle = layer.style(); //log('layer id ' + textLayerStyle.sharedObjectID())

    var sharedID = textLayerStyle.sharedObjectID(); // local document first

    var styleSearch = NSPredicate.predicateWithFormat("objectID == %@", sharedID);
    var MatchedStyleName = LocalTextStyles.filteredArrayUsingPredicate(styleSearch); // check libraries next

    var newName = '';

    if (MatchedStyleName.length) {
      newName = MatchedStyleName[0].name();
    }

    Object.keys(LibraryStyles).forEach(function (item) {
      if (String(item) === String(sharedID)) {
        newName = LibraryStyles[item].name;
      }
    });

    if (action === "prepend") {
      layer.setName(newName + ' - ' + currentName);
    } else if (action === "append") {
      layer.setName(currentName + ' - ' + newName);
    } else {
      layer.setName(newName);
    }
  });
}

function getTextLayers(layers, callback) {
  layers.forEach(function (layer) {
    if (layer.class() === MSLayerGroup) {
      getTextLayers(layer.layers(), callback);
    } else if (layer.class() === MSTextLayer) {
      callback(layer);
    }
  });
}

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=prepend.js.map