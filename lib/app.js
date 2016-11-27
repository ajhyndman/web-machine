/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Program = function () {
	  function Program(_ref) {
	    var init = _ref.init,
	        subscriptions = _ref.subscriptions,
	        update = _ref.update,
	        view = _ref.view;

	    _classCallCheck(this, Program);

	    this.dispatch = this.dispatch.bind(this);
	    this.fireCommand = this.fireCommand.bind(this);

	    var _init = _slicedToArray(init, 2),
	        firstState = _init[0],
	        firstCommand = _init[1];

	    this.state = firstState;
	    this.subscriptions = subscriptions;
	    this.update = update;
	    this.view = view;

	    this.view(firstState, this.dispatch);

	    this.fireCommand(firstCommand);
	  }

	  _createClass(Program, [{
	    key: "dispatch",
	    value: function dispatch(action) {
	      var _update = this.update(action, this.state),
	          _update2 = _slicedToArray(_update, 2),
	          nextState = _update2[0],
	          nextCommand = _update2[1];

	      this.state = nextState;

	      this.view(this.state, this.dispatch);

	      this.fireCommand(nextCommand);
	    }
	  }, {
	    key: "fireCommand",
	    value: function fireCommand(command) {
	      var _this = this;

	      this.subscriptions.forEach(function (subscription) {
	        if (!command) return;
	        subscription(command, _this.dispatch);
	      });
	    }
	  }]);

	  return Program;
	}();

	exports.default = Program;

/***/ }
/******/ ]);