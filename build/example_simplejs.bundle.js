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
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/src/example_simplejs.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/src/config.ts":
/*!********************************!*\
  !*** ./examples/src/config.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n * Copyright (C) 2017-2019 HERE Europe B.V.\n * Licensed under Apache 2.0, see full license in LICENSE\n * SPDX-License-Identifier: Apache-2.0\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/** @hidden */\nexports.accessToken = \"AYlqpxvwl7C8tSVG22lX2lg\";\n/** @hidden */\nexports.styleSetName = \"tilezen\";\n/** @hidden */\nexports.decoderPath = \"./build/decoder.bundle.js\";\n\n\n//# sourceURL=webpack:///./examples/src/config.ts?");

/***/ }),

/***/ "./examples/src/example_simplejs.ts":
/*!******************************************!*\
  !*** ./examples/src/example_simplejs.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/*\n * Copyright (C) 2017-2019 HERE Europe B.V.\n * Licensed under Apache 2.0, see full license in LICENSE\n * SPDX-License-Identifier: Apache-2.0\n */\nconst config = __importStar(__webpack_require__(/*! ./config */ \"./examples/src/config.ts\"));\n// @ts-ignore\nconst LE = L;\nconst map = LE.map(\"map\", {\n// wheelDebounceTime: 10\n}).setView([38.912753, -77.032194], 15);\nLE.marker([38.912753, -77.032194])\n    .bindPopup(\"Hello <b>Harp GL</b>!<br>Whoa, it works!\")\n    .addTo(map)\n    .openPopup();\nconst harpGL = new LE.HarpGL({\n    theme: \"resources/harp-map-theme/berlin_tilezen_night_reduced.json\"\n}).addTo(map);\nconst dataSource = new harp.OmvDataSource({\n    baseUrl: \"https://xyz.api.here.com/tiles/osmbase/512/all\",\n    apiFormat: harp.APIFormat.XYZMVT,\n    styleSetName: config.styleSetName,\n    maxZoomLevel: 17,\n    authenticationCode: config.accessToken,\n    concurrentDecoderScriptUrl: config.decoderPath\n});\nharpGL.mapView.addDataSource(dataSource);\nharpGL.mapView.lookAt(new harp.GeoCoordinates(16, -4), 6000000);\n\n\n//# sourceURL=webpack:///./examples/src/example_simplejs.ts?");

/***/ })

/******/ });