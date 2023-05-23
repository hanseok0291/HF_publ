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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 334);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(19);
	var hide = __webpack_require__(11);
	var redefine = __webpack_require__(12);
	var ctx = __webpack_require__(20);
	var PROTOTYPE = 'prototype';
	
	var $export = function (type, name, source) {
		var IS_FORCED = type & $export.F;
		var IS_GLOBAL = type & $export.G;
		var IS_STATIC = type & $export.S;
		var IS_PROTO = type & $export.P;
		var IS_BIND = type & $export.B;
		var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
		var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
		var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
		var key, own, out, exp;
		if (IS_GLOBAL) source = name;
		for (key in source) {
			// contains in native
			own = !IS_FORCED && target && target[key] !== undefined;
			// export native or passed
			out = (own ? target : source)[key];
			// bind timers to global for call from export context
			exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
			// extend global
			if (target) redefine(target, key, out, type & $export.U);
			// export
			if (exports[key] != out) hide(exports, key, exp);
			if (IS_PROTO && expProto[key] != out) expProto[key] = out;
		}
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var isObject = __webpack_require__(4);
	module.exports = function (it) {
		if (!isObject(it)) throw TypeError(it + ' is not an object!');
		return it;
	};
	
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
		? window : typeof self != 'undefined' && self.Math == Math ? self
		// eslint-disable-next-line no-new-func
		: Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {
	
	module.exports = function (exec) {
		try {
			return !!exec();
		} catch (e) {
			return true;
		}
	};
	
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {
	
	module.exports = function (it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var store = __webpack_require__(50)('wks');
	var uid = __webpack_require__(41);
	var Symbol = __webpack_require__(2).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function (name) {
		return store[name] || (store[name] =
			USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;
	
	
	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(22);
	var min = Math.min;
	module.exports = function (it) {
		return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};
	
	
	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(3)(function () {
		return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});
	
	
	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var anObject = __webpack_require__(1);
	var IE8_DOM_DEFINE = __webpack_require__(103);
	var toPrimitive = __webpack_require__(26);
	var dP = Object.defineProperty;
	
	exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
		anObject(O);
		P = toPrimitive(P, true);
		anObject(Attributes);
		if (IE8_DOM_DEFINE) try {
			return dP(O, P, Attributes);
		} catch (e) { /* empty */ }
		if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
		if ('value' in Attributes) O[P] = Attributes.value;
		return O;
	};
	
	
	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(24);
	module.exports = function (it) {
		return Object(defined(it));
	};
	
	
	/***/ }),
	/* 10 */
	/***/ (function(module, exports) {
	
	module.exports = function (it) {
		if (typeof it != 'function') throw TypeError(it + ' is not a function!');
		return it;
	};
	
	
	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var dP = __webpack_require__(8);
	var createDesc = __webpack_require__(37);
	module.exports = __webpack_require__(7) ? function (object, key, value) {
		return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
		object[key] = value;
		return object;
	};
	
	
	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var hide = __webpack_require__(11);
	var has = __webpack_require__(14);
	var SRC = __webpack_require__(41)('src');
	var $toString = __webpack_require__(138);
	var TO_STRING = 'toString';
	var TPL = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(19).inspectSource = function (it) {
		return $toString.call(it);
	};
	
	(module.exports = function (O, key, val, safe) {
		var isFunction = typeof val == 'function';
		if (isFunction) has(val, 'name') || hide(val, 'name', key);
		if (O[key] === val) return;
		if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
		if (O === global) {
			O[key] = val;
		} else if (!safe) {
			delete O[key];
			hide(O, key, val);
		} else if (O[key]) {
			O[key] = val;
		} else {
			hide(O, key, val);
		}
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
		return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	
	
	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var fails = __webpack_require__(3);
	var defined = __webpack_require__(24);
	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
		var S = String(defined(string));
		var p1 = '<' + tag;
		if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
		return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function (NAME, exec) {
		var O = {};
		O[NAME] = exec(createHTML);
		$export($export.P + $export.F * fails(function () {
			var test = ''[NAME]('"');
			return test !== test.toLowerCase() || test.split('"').length > 3;
		}), 'String', O);
	};
	
	
	/***/ }),
	/* 14 */
	/***/ (function(module, exports) {
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
		return hasOwnProperty.call(it, key);
	};
	
	
	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var pIE = __webpack_require__(49);
	var createDesc = __webpack_require__(37);
	var toIObject = __webpack_require__(17);
	var toPrimitive = __webpack_require__(26);
	var has = __webpack_require__(14);
	var IE8_DOM_DEFINE = __webpack_require__(103);
	var gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
		O = toIObject(O);
		P = toPrimitive(P, true);
		if (IE8_DOM_DEFINE) try {
			return gOPD(O, P);
		} catch (e) { /* empty */ }
		if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};
	
	
	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(14);
	var toObject = __webpack_require__(9);
	var IE_PROTO = __webpack_require__(84)('IE_PROTO');
	var ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
		O = toObject(O);
		if (has(O, IE_PROTO)) return O[IE_PROTO];
		if (typeof O.constructor == 'function' && O instanceof O.constructor) {
			return O.constructor.prototype;
		} return O instanceof Object ? ObjectProto : null;
	};
	
	
	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(48);
	var defined = __webpack_require__(24);
	module.exports = function (it) {
		return IObject(defined(it));
	};
	
	
	/***/ }),
	/* 18 */
	/***/ (function(module, exports) {
	
	var toString = {}.toString;
	
	module.exports = function (it) {
		return toString.call(it).slice(8, -1);
	};
	
	
	/***/ }),
	/* 19 */
	/***/ (function(module, exports) {
	
	var core = module.exports = { version: '2.6.11' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	
	
	/***/ }),
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function (fn, that, length) {
		aFunction(fn);
		if (that === undefined) return fn;
		switch (length) {
			case 1: return function (a) {
				return fn.call(that, a);
			};
			case 2: return function (a, b) {
				return fn.call(that, a, b);
			};
			case 3: return function (a, b, c) {
				return fn.call(that, a, b, c);
			};
		}
		return function (/* ...args */) {
			return fn.apply(that, arguments);
		};
	};
	
	
	/***/ }),
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var fails = __webpack_require__(3);
	
	module.exports = function (method, arg) {
		return !!method && fails(function () {
			// eslint-disable-next-line no-useless-call
			arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
		});
	};
	
	
	/***/ }),
	/* 22 */
	/***/ (function(module, exports) {
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
		return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
	
	
	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(20);
	var IObject = __webpack_require__(48);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(6);
	var asc = __webpack_require__(68);
	module.exports = function (TYPE, $create) {
		var IS_MAP = TYPE == 1;
		var IS_FILTER = TYPE == 2;
		var IS_SOME = TYPE == 3;
		var IS_EVERY = TYPE == 4;
		var IS_FIND_INDEX = TYPE == 6;
		var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
		var create = $create || asc;
		return function ($this, callbackfn, that) {
			var O = toObject($this);
			var self = IObject(O);
			var f = ctx(callbackfn, that, 3);
			var length = toLength(self.length);
			var index = 0;
			var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
			var val, res;
			for (;length > index; index++) if (NO_HOLES || index in self) {
				val = self[index];
				res = f(val, index, O);
				if (TYPE) {
					if (IS_MAP) result[index] = res;   // map
					else if (res) switch (TYPE) {
						case 3: return true;             // some
						case 5: return val;              // find
						case 6: return index;            // findIndex
						case 2: result.push(val);        // filter
					} else if (IS_EVERY) return false; // every
				}
			}
			return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
		};
	};
	
	
	/***/ }),
	/* 24 */
	/***/ (function(module, exports) {
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
		if (it == undefined) throw TypeError("Can't call method on  " + it);
		return it;
	};
	
	
	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(0);
	var core = __webpack_require__(19);
	var fails = __webpack_require__(3);
	module.exports = function (KEY, exec) {
		var fn = (core.Object || {})[KEY] || Object[KEY];
		var exp = {};
		exp[KEY] = exec(fn);
		$export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};
	
	
	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(4);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
		if (!isObject(it)) return it;
		var fn, val;
		if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
		if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
		if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
		throw TypeError("Can't convert object to primitive value");
	};
	
	
	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var Map = __webpack_require__(125);
	var $export = __webpack_require__(0);
	var shared = __webpack_require__(50)('metadata');
	var store = shared.store || (shared.store = new (__webpack_require__(129))());
	
	var getOrCreateMetadataMap = function (target, targetKey, create) {
		var targetMetadata = store.get(target);
		if (!targetMetadata) {
			if (!create) return undefined;
			store.set(target, targetMetadata = new Map());
		}
		var keyMetadata = targetMetadata.get(targetKey);
		if (!keyMetadata) {
			if (!create) return undefined;
			targetMetadata.set(targetKey, keyMetadata = new Map());
		} return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
		var metadataMap = getOrCreateMetadataMap(O, P, false);
		return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
		var metadataMap = getOrCreateMetadataMap(O, P, false);
		return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
		getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function (target, targetKey) {
		var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
		var keys = [];
		if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
		return keys;
	};
	var toMetaKey = function (it) {
		return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function (O) {
		$export($export.S, 'Reflect', O);
	};
	
	module.exports = {
		store: store,
		map: getOrCreateMetadataMap,
		has: ordinaryHasOwnMetadata,
		get: ordinaryGetOwnMetadata,
		set: ordinaryDefineOwnMetadata,
		keys: ordinaryOwnMetadataKeys,
		key: toMetaKey,
		exp: exp
	};
	
	
	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	if (__webpack_require__(7)) {
		var LIBRARY = __webpack_require__(30);
		var global = __webpack_require__(2);
		var fails = __webpack_require__(3);
		var $export = __webpack_require__(0);
		var $typed = __webpack_require__(64);
		var $buffer = __webpack_require__(89);
		var ctx = __webpack_require__(20);
		var anInstance = __webpack_require__(32);
		var propertyDesc = __webpack_require__(37);
		var hide = __webpack_require__(11);
		var redefineAll = __webpack_require__(38);
		var toInteger = __webpack_require__(22);
		var toLength = __webpack_require__(6);
		var toIndex = __webpack_require__(123);
		var toAbsoluteIndex = __webpack_require__(40);
		var toPrimitive = __webpack_require__(26);
		var has = __webpack_require__(14);
		var classof = __webpack_require__(43);
		var isObject = __webpack_require__(4);
		var toObject = __webpack_require__(9);
		var isArrayIter = __webpack_require__(75);
		var create = __webpack_require__(34);
		var getPrototypeOf = __webpack_require__(16);
		var gOPN = __webpack_require__(35).f;
		var getIterFn = __webpack_require__(91);
		var uid = __webpack_require__(41);
		var wks = __webpack_require__(5);
		var createArrayMethod = __webpack_require__(23);
		var createArrayIncludes = __webpack_require__(52);
		var speciesConstructor = __webpack_require__(51);
		var ArrayIterators = __webpack_require__(92);
		var Iterators = __webpack_require__(44);
		var $iterDetect = __webpack_require__(57);
		var setSpecies = __webpack_require__(39);
		var arrayFill = __webpack_require__(67);
		var arrayCopyWithin = __webpack_require__(95);
		var $DP = __webpack_require__(8);
		var $GOPD = __webpack_require__(15);
		var dP = $DP.f;
		var gOPD = $GOPD.f;
		var RangeError = global.RangeError;
		var TypeError = global.TypeError;
		var Uint8Array = global.Uint8Array;
		var ARRAY_BUFFER = 'ArrayBuffer';
		var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
		var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
		var PROTOTYPE = 'prototype';
		var ArrayProto = Array[PROTOTYPE];
		var $ArrayBuffer = $buffer.ArrayBuffer;
		var $DataView = $buffer.DataView;
		var arrayForEach = createArrayMethod(0);
		var arrayFilter = createArrayMethod(2);
		var arraySome = createArrayMethod(3);
		var arrayEvery = createArrayMethod(4);
		var arrayFind = createArrayMethod(5);
		var arrayFindIndex = createArrayMethod(6);
		var arrayIncludes = createArrayIncludes(true);
		var arrayIndexOf = createArrayIncludes(false);
		var arrayValues = ArrayIterators.values;
		var arrayKeys = ArrayIterators.keys;
		var arrayEntries = ArrayIterators.entries;
		var arrayLastIndexOf = ArrayProto.lastIndexOf;
		var arrayReduce = ArrayProto.reduce;
		var arrayReduceRight = ArrayProto.reduceRight;
		var arrayJoin = ArrayProto.join;
		var arraySort = ArrayProto.sort;
		var arraySlice = ArrayProto.slice;
		var arrayToString = ArrayProto.toString;
		var arrayToLocaleString = ArrayProto.toLocaleString;
		var ITERATOR = wks('iterator');
		var TAG = wks('toStringTag');
		var TYPED_CONSTRUCTOR = uid('typed_constructor');
		var DEF_CONSTRUCTOR = uid('def_constructor');
		var ALL_CONSTRUCTORS = $typed.CONSTR;
		var TYPED_ARRAY = $typed.TYPED;
		var VIEW = $typed.VIEW;
		var WRONG_LENGTH = 'Wrong length!';
	
		var $map = createArrayMethod(1, function (O, length) {
			return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
		});
	
		var LITTLE_ENDIAN = fails(function () {
			// eslint-disable-next-line no-undef
			return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
		});
	
		var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
			new Uint8Array(1).set({});
		});
	
		var toOffset = function (it, BYTES) {
			var offset = toInteger(it);
			if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
			return offset;
		};
	
		var validate = function (it) {
			if (isObject(it) && TYPED_ARRAY in it) return it;
			throw TypeError(it + ' is not a typed array!');
		};
	
		var allocate = function (C, length) {
			if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
				throw TypeError('It is not a typed array constructor!');
			} return new C(length);
		};
	
		var speciesFromList = function (O, list) {
			return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
		};
	
		var fromList = function (C, list) {
			var index = 0;
			var length = list.length;
			var result = allocate(C, length);
			while (length > index) result[index] = list[index++];
			return result;
		};
	
		var addGetter = function (it, key, internal) {
			dP(it, key, { get: function () { return this._d[internal]; } });
		};
	
		var $from = function from(source /* , mapfn, thisArg */) {
			var O = toObject(source);
			var aLen = arguments.length;
			var mapfn = aLen > 1 ? arguments[1] : undefined;
			var mapping = mapfn !== undefined;
			var iterFn = getIterFn(O);
			var i, length, values, result, step, iterator;
			if (iterFn != undefined && !isArrayIter(iterFn)) {
				for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
					values.push(step.value);
				} O = values;
			}
			if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
			for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
				result[i] = mapping ? mapfn(O[i], i) : O[i];
			}
			return result;
		};
	
		var $of = function of(/* ...items */) {
			var index = 0;
			var length = arguments.length;
			var result = allocate(this, length);
			while (length > index) result[index] = arguments[index++];
			return result;
		};
	
		// iOS Safari 6.x fails here
		var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });
	
		var $toLocaleString = function toLocaleString() {
			return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
		};
	
		var proto = {
			copyWithin: function copyWithin(target, start /* , end */) {
				return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
			},
			every: function every(callbackfn /* , thisArg */) {
				return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
			},
			fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
				return arrayFill.apply(validate(this), arguments);
			},
			filter: function filter(callbackfn /* , thisArg */) {
				return speciesFromList(this, arrayFilter(validate(this), callbackfn,
					arguments.length > 1 ? arguments[1] : undefined));
			},
			find: function find(predicate /* , thisArg */) {
				return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
			},
			findIndex: function findIndex(predicate /* , thisArg */) {
				return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
			},
			forEach: function forEach(callbackfn /* , thisArg */) {
				arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
			},
			indexOf: function indexOf(searchElement /* , fromIndex */) {
				return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
			},
			includes: function includes(searchElement /* , fromIndex */) {
				return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
			},
			join: function join(separator) { // eslint-disable-line no-unused-vars
				return arrayJoin.apply(validate(this), arguments);
			},
			lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
				return arrayLastIndexOf.apply(validate(this), arguments);
			},
			map: function map(mapfn /* , thisArg */) {
				return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
			},
			reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
				return arrayReduce.apply(validate(this), arguments);
			},
			reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
				return arrayReduceRight.apply(validate(this), arguments);
			},
			reverse: function reverse() {
				var that = this;
				var length = validate(that).length;
				var middle = Math.floor(length / 2);
				var index = 0;
				var value;
				while (index < middle) {
					value = that[index];
					that[index++] = that[--length];
					that[length] = value;
				} return that;
			},
			some: function some(callbackfn /* , thisArg */) {
				return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
			},
			sort: function sort(comparefn) {
				return arraySort.call(validate(this), comparefn);
			},
			subarray: function subarray(begin, end) {
				var O = validate(this);
				var length = O.length;
				var $begin = toAbsoluteIndex(begin, length);
				return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
					O.buffer,
					O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
					toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
				);
			}
		};
	
		var $slice = function slice(start, end) {
			return speciesFromList(this, arraySlice.call(validate(this), start, end));
		};
	
		var $set = function set(arrayLike /* , offset */) {
			validate(this);
			var offset = toOffset(arguments[1], 1);
			var length = this.length;
			var src = toObject(arrayLike);
			var len = toLength(src.length);
			var index = 0;
			if (len + offset > length) throw RangeError(WRONG_LENGTH);
			while (index < len) this[offset + index] = src[index++];
		};
	
		var $iterators = {
			entries: function entries() {
				return arrayEntries.call(validate(this));
			},
			keys: function keys() {
				return arrayKeys.call(validate(this));
			},
			values: function values() {
				return arrayValues.call(validate(this));
			}
		};
	
		var isTAIndex = function (target, key) {
			return isObject(target)
				&& target[TYPED_ARRAY]
				&& typeof key != 'symbol'
				&& key in target
				&& String(+key) == String(key);
		};
		var $getDesc = function getOwnPropertyDescriptor(target, key) {
			return isTAIndex(target, key = toPrimitive(key, true))
				? propertyDesc(2, target[key])
				: gOPD(target, key);
		};
		var $setDesc = function defineProperty(target, key, desc) {
			if (isTAIndex(target, key = toPrimitive(key, true))
				&& isObject(desc)
				&& has(desc, 'value')
				&& !has(desc, 'get')
				&& !has(desc, 'set')
				// TODO: add validation descriptor w/o calling accessors
				&& !desc.configurable
				&& (!has(desc, 'writable') || desc.writable)
				&& (!has(desc, 'enumerable') || desc.enumerable)
			) {
				target[key] = desc.value;
				return target;
			} return dP(target, key, desc);
		};
	
		if (!ALL_CONSTRUCTORS) {
			$GOPD.f = $getDesc;
			$DP.f = $setDesc;
		}
	
		$export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
			getOwnPropertyDescriptor: $getDesc,
			defineProperty: $setDesc
		});
	
		if (fails(function () { arrayToString.call({}); })) {
			arrayToString = arrayToLocaleString = function toString() {
				return arrayJoin.call(this);
			};
		}
	
		var $TypedArrayPrototype$ = redefineAll({}, proto);
		redefineAll($TypedArrayPrototype$, $iterators);
		hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
		redefineAll($TypedArrayPrototype$, {
			slice: $slice,
			set: $set,
			constructor: function () { /* noop */ },
			toString: arrayToString,
			toLocaleString: $toLocaleString
		});
		addGetter($TypedArrayPrototype$, 'buffer', 'b');
		addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
		addGetter($TypedArrayPrototype$, 'byteLength', 'l');
		addGetter($TypedArrayPrototype$, 'length', 'e');
		dP($TypedArrayPrototype$, TAG, {
			get: function () { return this[TYPED_ARRAY]; }
		});
	
		// eslint-disable-next-line max-statements
		module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
			CLAMPED = !!CLAMPED;
			var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
			var GETTER = 'get' + KEY;
			var SETTER = 'set' + KEY;
			var TypedArray = global[NAME];
			var Base = TypedArray || {};
			var TAC = TypedArray && getPrototypeOf(TypedArray);
			var FORCED = !TypedArray || !$typed.ABV;
			var O = {};
			var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
			var getter = function (that, index) {
				var data = that._d;
				return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
			};
			var setter = function (that, index, value) {
				var data = that._d;
				if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
				data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
			};
			var addElement = function (that, index) {
				dP(that, index, {
					get: function () {
						return getter(this, index);
					},
					set: function (value) {
						return setter(this, index, value);
					},
					enumerable: true
				});
			};
			if (FORCED) {
				TypedArray = wrapper(function (that, data, $offset, $length) {
					anInstance(that, TypedArray, NAME, '_d');
					var index = 0;
					var offset = 0;
					var buffer, byteLength, length, klass;
					if (!isObject(data)) {
						length = toIndex(data);
						byteLength = length * BYTES;
						buffer = new $ArrayBuffer(byteLength);
					} else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
						buffer = data;
						offset = toOffset($offset, BYTES);
						var $len = data.byteLength;
						if ($length === undefined) {
							if ($len % BYTES) throw RangeError(WRONG_LENGTH);
							byteLength = $len - offset;
							if (byteLength < 0) throw RangeError(WRONG_LENGTH);
						} else {
							byteLength = toLength($length) * BYTES;
							if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
						}
						length = byteLength / BYTES;
					} else if (TYPED_ARRAY in data) {
						return fromList(TypedArray, data);
					} else {
						return $from.call(TypedArray, data);
					}
					hide(that, '_d', {
						b: buffer,
						o: offset,
						l: byteLength,
						e: length,
						v: new $DataView(buffer)
					});
					while (index < length) addElement(that, index++);
				});
				TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
				hide(TypedArrayPrototype, 'constructor', TypedArray);
			} else if (!fails(function () {
				TypedArray(1);
			}) || !fails(function () {
				new TypedArray(-1); // eslint-disable-line no-new
			}) || !$iterDetect(function (iter) {
				new TypedArray(); // eslint-disable-line no-new
				new TypedArray(null); // eslint-disable-line no-new
				new TypedArray(1.5); // eslint-disable-line no-new
				new TypedArray(iter); // eslint-disable-line no-new
			}, true)) {
				TypedArray = wrapper(function (that, data, $offset, $length) {
					anInstance(that, TypedArray, NAME);
					var klass;
					// `ws` module bug, temporarily remove validation length for Uint8Array
					// https://github.com/websockets/ws/pull/645
					if (!isObject(data)) return new Base(toIndex(data));
					if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
						return $length !== undefined
							? new Base(data, toOffset($offset, BYTES), $length)
							: $offset !== undefined
								? new Base(data, toOffset($offset, BYTES))
								: new Base(data);
					}
					if (TYPED_ARRAY in data) return fromList(TypedArray, data);
					return $from.call(TypedArray, data);
				});
				arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
					if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
				});
				TypedArray[PROTOTYPE] = TypedArrayPrototype;
				if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
			}
			var $nativeIterator = TypedArrayPrototype[ITERATOR];
			var CORRECT_ITER_NAME = !!$nativeIterator
				&& ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
			var $iterator = $iterators.values;
			hide(TypedArray, TYPED_CONSTRUCTOR, true);
			hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
			hide(TypedArrayPrototype, VIEW, true);
			hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
			if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
				dP(TypedArrayPrototype, TAG, {
					get: function () { return NAME; }
				});
			}
	
			O[NAME] = TypedArray;
	
			$export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
			$export($export.S, NAME, {
				BYTES_PER_ELEMENT: BYTES
			});
	
			$export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
				from: $from,
				of: $of
			});
	
			if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
			$export($export.P, NAME, proto);
	
			setSpecies(NAME);
	
			$export($export.P + $export.F * FORCED_SET, NAME, { set: $set });
	
			$export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
			if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
	
			$export($export.P + $export.F * fails(function () {
				new TypedArray(1).slice();
			}), NAME, { slice: $slice });
	
			$export($export.P + $export.F * (fails(function () {
				return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
			}) || !fails(function () {
				TypedArrayPrototype.toLocaleString.call([1, 2]);
			})), NAME, { toLocaleString: $toLocaleString });
	
			Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
			if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
		};
	} else module.exports = function () { /* empty */ };
	
	
	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(5)('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
		ArrayProto[UNSCOPABLES][key] = true;
	};
	
	
	/***/ }),
	/* 30 */
	/***/ (function(module, exports) {
	
	module.exports = false;
	
	
	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var META = __webpack_require__(41)('meta');
	var isObject = __webpack_require__(4);
	var has = __webpack_require__(14);
	var setDesc = __webpack_require__(8).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
		return true;
	};
	var FREEZE = !__webpack_require__(3)(function () {
		return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
		setDesc(it, META, { value: {
			i: 'O' + ++id, // object ID
			w: {}          // weak collections IDs
		} });
	};
	var fastKey = function (it, create) {
		// return primitive with prefix
		if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
		if (!has(it, META)) {
			// can't set metadata to uncaught frozen object
			if (!isExtensible(it)) return 'F';
			// not necessary to add metadata
			if (!create) return 'E';
			// add missing metadata
			setMeta(it);
		// return object ID
		} return it[META].i;
	};
	var getWeak = function (it, create) {
		if (!has(it, META)) {
			// can't set metadata to uncaught frozen object
			if (!isExtensible(it)) return true;
			// not necessary to add metadata
			if (!create) return false;
			// add missing metadata
			setMeta(it);
		// return hash weak collections IDs
		} return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
		if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
		return it;
	};
	var meta = module.exports = {
		KEY: META,
		NEED: false,
		fastKey: fastKey,
		getWeak: getWeak,
		onFreeze: onFreeze
	};
	
	
	/***/ }),
	/* 32 */
	/***/ (function(module, exports) {
	
	module.exports = function (it, Constructor, name, forbiddenField) {
		if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
			throw TypeError(name + ': incorrect invocation!');
		} return it;
	};
	
	
	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var ctx = __webpack_require__(20);
	var call = __webpack_require__(106);
	var isArrayIter = __webpack_require__(75);
	var anObject = __webpack_require__(1);
	var toLength = __webpack_require__(6);
	var getIterFn = __webpack_require__(91);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
		var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
		var f = ctx(fn, that, entries ? 2 : 1);
		var index = 0;
		var length, step, iterator, result;
		if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
		// fast case for arrays with default iterator
		if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
			result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
			if (result === BREAK || result === RETURN) return result;
		} else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
			result = call(iterator, f, step.value, entries);
			if (result === BREAK || result === RETURN) return result;
		}
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	
	
	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(1);
	var dPs = __webpack_require__(112);
	var enumBugKeys = __webpack_require__(71);
	var IE_PROTO = __webpack_require__(84)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
		// Thrash, waste and sodomy: IE GC bug
		var iframe = __webpack_require__(70)('iframe');
		var i = enumBugKeys.length;
		var lt = '<';
		var gt = '>';
		var iframeDocument;
		iframe.style.display = 'none';
		__webpack_require__(73).appendChild(iframe);
		iframe.src = 'javascript:'; // eslint-disable-line no-script-url
		// createDict = iframe.contentWindow.Object;
		// html.removeChild(iframe);
		iframeDocument = iframe.contentWindow.document;
		iframeDocument.open();
		iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
		iframeDocument.close();
		createDict = iframeDocument.F;
		while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
		return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
		var result;
		if (O !== null) {
			Empty[PROTOTYPE] = anObject(O);
			result = new Empty();
			Empty[PROTOTYPE] = null;
			// add "__proto__" for Object.getPrototypeOf polyfill
			result[IE_PROTO] = O;
		} else result = createDict();
		return Properties === undefined ? result : dPs(result, Properties);
	};
	
	
	/***/ }),
	/* 35 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(114);
	var hiddenKeys = __webpack_require__(71).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
		return $keys(O, hiddenKeys);
	};
	
	
	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(114);
	var enumBugKeys = __webpack_require__(71);
	
	module.exports = Object.keys || function keys(O) {
		return $keys(O, enumBugKeys);
	};
	
	
	/***/ }),
	/* 37 */
	/***/ (function(module, exports) {
	
	module.exports = function (bitmap, value) {
		return {
			enumerable: !(bitmap & 1),
			configurable: !(bitmap & 2),
			writable: !(bitmap & 4),
			value: value
		};
	};
	
	
	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var redefine = __webpack_require__(12);
	module.exports = function (target, src, safe) {
		for (var key in src) redefine(target, key, src[key], safe);
		return target;
	};
	
	
	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var global = __webpack_require__(2);
	var dP = __webpack_require__(8);
	var DESCRIPTORS = __webpack_require__(7);
	var SPECIES = __webpack_require__(5)('species');
	
	module.exports = function (KEY) {
		var C = global[KEY];
		if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
			configurable: true,
			get: function () { return this; }
		});
	};
	
	
	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var toInteger = __webpack_require__(22);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
		index = toInteger(index);
		return index < 0 ? max(index + length, 0) : min(index, length);
	};
	
	
	/***/ }),
	/* 41 */
	/***/ (function(module, exports) {
	
	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
		return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};
	
	
	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var isObject = __webpack_require__(4);
	module.exports = function (it, TYPE) {
		if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
		return it;
	};
	
	
	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(18);
	var TAG = __webpack_require__(5)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
		try {
			return it[key];
		} catch (e) { /* empty */ }
	};
	
	module.exports = function (it) {
		var O, T, B;
		return it === undefined ? 'Undefined' : it === null ? 'Null'
			// @@toStringTag case
			: typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
			// builtinTag case
			: ARG ? cof(O)
			// ES3 arguments fallback
			: (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};
	
	
	/***/ }),
	/* 44 */
	/***/ (function(module, exports) {
	
	module.exports = {};
	
	
	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var def = __webpack_require__(8).f;
	var has = __webpack_require__(14);
	var TAG = __webpack_require__(5)('toStringTag');
	
	module.exports = function (it, tag, stat) {
		if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};
	
	
	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var defined = __webpack_require__(24);
	var fails = __webpack_require__(3);
	var spaces = __webpack_require__(87);
	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');
	
	var exporter = function (KEY, exec, ALIAS) {
		var exp = {};
		var FORCE = fails(function () {
			return !!spaces[KEY]() || non[KEY]() != non;
		});
		var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
		if (ALIAS) exp[ALIAS] = fn;
		$export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
		string = String(defined(string));
		if (TYPE & 1) string = string.replace(ltrim, '');
		if (TYPE & 2) string = string.replace(rtrim, '');
		return string;
	};
	
	module.exports = exporter;
	
	
	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(1);
	module.exports = function () {
		var that = anObject(this);
		var result = '';
		if (that.global) result += 'g';
		if (that.ignoreCase) result += 'i';
		if (that.multiline) result += 'm';
		if (that.unicode) result += 'u';
		if (that.sticky) result += 'y';
		return result;
	};
	
	
	/***/ }),
	/* 48 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(18);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
		return cof(it) == 'String' ? it.split('') : Object(it);
	};
	
	
	/***/ }),
	/* 49 */
	/***/ (function(module, exports) {
	
	exports.f = {}.propertyIsEnumerable;
	
	
	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var core = __webpack_require__(19);
	var global = __webpack_require__(2);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	
	(module.exports = function (key, value) {
		return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
		version: core.version,
		mode: __webpack_require__(30) ? 'pure' : 'global',
		copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	
	
	/***/ }),
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(1);
	var aFunction = __webpack_require__(10);
	var SPECIES = __webpack_require__(5)('species');
	module.exports = function (O, D) {
		var C = anObject(O).constructor;
		var S;
		return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};
	
	
	/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(17);
	var toLength = __webpack_require__(6);
	var toAbsoluteIndex = __webpack_require__(40);
	module.exports = function (IS_INCLUDES) {
		return function ($this, el, fromIndex) {
			var O = toIObject($this);
			var length = toLength(O.length);
			var index = toAbsoluteIndex(fromIndex, length);
			var value;
			// Array#includes uses SameValueZero equality algorithm
			// eslint-disable-next-line no-self-compare
			if (IS_INCLUDES && el != el) while (length > index) {
				value = O[index++];
				// eslint-disable-next-line no-self-compare
				if (value != value) return true;
			// Array#indexOf ignores holes, Array#includes - not
			} else for (;length > index; index++) if (IS_INCLUDES || index in O) {
				if (O[index] === el) return IS_INCLUDES || index || 0;
			} return !IS_INCLUDES && -1;
		};
	};
	
	
	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var global = __webpack_require__(2);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(12);
	var redefineAll = __webpack_require__(38);
	var meta = __webpack_require__(31);
	var forOf = __webpack_require__(33);
	var anInstance = __webpack_require__(32);
	var isObject = __webpack_require__(4);
	var fails = __webpack_require__(3);
	var $iterDetect = __webpack_require__(57);
	var setToStringTag = __webpack_require__(45);
	var inheritIfRequired = __webpack_require__(74);
	
	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
		var Base = global[NAME];
		var C = Base;
		var ADDER = IS_MAP ? 'set' : 'add';
		var proto = C && C.prototype;
		var O = {};
		var fixMethod = function (KEY) {
			var fn = proto[KEY];
			redefine(proto, KEY,
				KEY == 'delete' ? function (a) {
					return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
				} : KEY == 'has' ? function has(a) {
					return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
				} : KEY == 'get' ? function get(a) {
					return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
				} : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
					: function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
			);
		};
		if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
			new C().entries().next();
		}))) {
			// create collection constructor
			C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
			redefineAll(C.prototype, methods);
			meta.NEED = true;
		} else {
			var instance = new C();
			// early implementations not supports chaining
			var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
			// V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
			var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
			// most early implementations doesn't supports iterables, most modern - not close it correctly
			var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
			// for early implementations -0 and +0 not the same
			var BUGGY_ZERO = !IS_WEAK && fails(function () {
				// V8 ~ Chromium 42- fails only with 5+ elements
				var $instance = new C();
				var index = 5;
				while (index--) $instance[ADDER](index, index);
				return !$instance.has(-0);
			});
			if (!ACCEPT_ITERABLES) {
				C = wrapper(function (target, iterable) {
					anInstance(target, C, NAME);
					var that = inheritIfRequired(new Base(), target, C);
					if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
					return that;
				});
				C.prototype = proto;
				proto.constructor = C;
			}
			if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
				fixMethod('delete');
				fixMethod('has');
				IS_MAP && fixMethod('get');
			}
			if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
			// weak collections should not contains .clear method
			if (IS_WEAK && proto.clear) delete proto.clear;
		}
	
		setToStringTag(C, NAME);
	
		O[NAME] = C;
		$export($export.G + $export.W + $export.F * (C != Base), O);
	
		if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	
		return C;
	};
	
	
	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	__webpack_require__(126);
	var redefine = __webpack_require__(12);
	var hide = __webpack_require__(11);
	var fails = __webpack_require__(3);
	var defined = __webpack_require__(24);
	var wks = __webpack_require__(5);
	var regexpExec = __webpack_require__(82);
	
	var SPECIES = wks('species');
	
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
		// #replace needs built-in support for named groups.
		// #match works fine because it just return the exec results, even if it has
		// a "grops" property.
		var re = /./;
		re.exec = function () {
			var result = [];
			result.groups = { a: '7' };
			return result;
		};
		return ''.replace(re, '$<a>') !== '7';
	});
	
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
		// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
		var re = /(?:)/;
		var originalExec = re.exec;
		re.exec = function () { return originalExec.apply(this, arguments); };
		var result = 'ab'.split(re);
		return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();
	
	module.exports = function (KEY, length, exec) {
		var SYMBOL = wks(KEY);
	
		var DELEGATES_TO_SYMBOL = !fails(function () {
			// String methods call symbol-named RegEp methods
			var O = {};
			O[SYMBOL] = function () { return 7; };
			return ''[KEY](O) != 7;
		});
	
		var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
			// Symbol-named RegExp methods call .exec
			var execCalled = false;
			var re = /a/;
			re.exec = function () { execCalled = true; return null; };
			if (KEY === 'split') {
				// RegExp[@@split] doesn't call the regex's exec method, but first creates
				// a new one. We need to return the patched regex when creating the new one.
				re.constructor = {};
				re.constructor[SPECIES] = function () { return re; };
			}
			re[SYMBOL]('');
			return !execCalled;
		}) : undefined;
	
		if (
			!DELEGATES_TO_SYMBOL ||
			!DELEGATES_TO_EXEC ||
			(KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
			(KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
		) {
			var nativeRegExpMethod = /./[SYMBOL];
			var fns = exec(
				defined,
				SYMBOL,
				''[KEY],
				function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
					if (regexp.exec === regexpExec) {
						if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
							// The native String method already delegates to @@method (this
							// polyfilled function), leasing to infinite recursion.
							// We avoid it by directly calling the native @@method method.
							return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
						}
						return { done: true, value: nativeMethod.call(str, regexp, arg2) };
					}
					return { done: false };
				}
			);
			var strfn = fns[0];
			var rxfn = fns[1];
	
			redefine(String.prototype, KEY, strfn);
			hide(RegExp.prototype, SYMBOL, length == 2
				// 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
				// 21.2.5.11 RegExp.prototype[@@split](string, limit)
				? function (string, arg) { return rxfn.call(string, this, arg); }
				// 21.2.5.6 RegExp.prototype[@@match](string)
				// 21.2.5.9 RegExp.prototype[@@search](string)
				: function (string) { return rxfn.call(string, this); }
			);
		}
	};
	
	
	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(18);
	module.exports = Array.isArray || function isArray(arg) {
		return cof(arg) == 'Array';
	};
	
	
	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(4);
	var cof = __webpack_require__(18);
	var MATCH = __webpack_require__(5)('match');
	module.exports = function (it) {
		var isRegExp;
		return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};
	
	
	/***/ }),
	/* 57 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var ITERATOR = __webpack_require__(5)('iterator');
	var SAFE_CLOSING = false;
	
	try {
		var riter = [7][ITERATOR]();
		riter['return'] = function () { SAFE_CLOSING = true; };
		// eslint-disable-next-line no-throw-literal
		Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }
	
	module.exports = function (exec, skipClosing) {
		if (!skipClosing && !SAFE_CLOSING) return false;
		var safe = false;
		try {
			var arr = [7];
			var iter = arr[ITERATOR]();
			iter.next = function () { return { done: safe = true }; };
			arr[ITERATOR] = function () { return iter; };
			exec(arr);
		} catch (e) { /* empty */ }
		return safe;
	};
	
	
	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(30) || !__webpack_require__(3)(function () {
		var K = Math.random();
		// In FF throws only define methods
		// eslint-disable-next-line no-undef, no-useless-call
		__defineSetter__.call(null, K, function () { /* empty */ });
		delete __webpack_require__(2)[K];
	});
	
	
	/***/ }),
	/* 59 */
	/***/ (function(module, exports) {
	
	exports.f = Object.getOwnPropertySymbols;
	
	
	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var classof = __webpack_require__(43);
	var builtinExec = RegExp.prototype.exec;
	
	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	module.exports = function (R, S) {
		var exec = R.exec;
		if (typeof exec === 'function') {
			var result = exec.call(R, S);
			if (typeof result !== 'object') {
				throw new TypeError('RegExp exec method returned something other than an Object or null');
			}
			return result;
		}
		if (classof(R) !== 'RegExp') {
			throw new TypeError('RegExp#exec called on incompatible receiver');
		}
		return builtinExec.call(R, S);
	};
	
	
	/***/ }),
	/* 61 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/proposal-setmap-offrom/
	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var ctx = __webpack_require__(20);
	var forOf = __webpack_require__(33);
	
	module.exports = function (COLLECTION) {
		$export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
			var mapFn = arguments[1];
			var mapping, A, n, cb;
			aFunction(this);
			mapping = mapFn !== undefined;
			if (mapping) aFunction(mapFn);
			if (source == undefined) return new this();
			A = [];
			if (mapping) {
				n = 0;
				cb = ctx(mapFn, arguments[2], 2);
				forOf(source, false, function (nextItem) {
					A.push(cb(nextItem, n++));
				});
			} else {
				forOf(source, false, A.push, A);
			}
			return new this(A);
		} });
	};
	
	
	/***/ }),
	/* 62 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/proposal-setmap-offrom/
	var $export = __webpack_require__(0);
	
	module.exports = function (COLLECTION) {
		$export($export.S, COLLECTION, { of: function of() {
			var length = arguments.length;
			var A = new Array(length);
			while (length--) A[length] = arguments[length];
			return new this(A);
		} });
	};
	
	
	/***/ }),
	/* 63 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var toInteger = __webpack_require__(22);
	var defined = __webpack_require__(24);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
		return function (that, pos) {
			var s = String(defined(that));
			var i = toInteger(pos);
			var l = s.length;
			var a, b;
			if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
			a = s.charCodeAt(i);
			return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
				? TO_STRING ? s.charAt(i) : a
				: TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
		};
	};
	
	
	/***/ }),
	/* 64 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var hide = __webpack_require__(11);
	var uid = __webpack_require__(41);
	var TYPED = uid('typed_array');
	var VIEW = uid('view');
	var ABV = !!(global.ArrayBuffer && global.DataView);
	var CONSTR = ABV;
	var i = 0;
	var l = 9;
	var Typed;
	
	var TypedArrayConstructors = (
		'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while (i < l) {
		if (Typed = global[TypedArrayConstructors[i++]]) {
			hide(Typed.prototype, TYPED, true);
			hide(Typed.prototype, VIEW, true);
		} else CONSTR = false;
	}
	
	module.exports = {
		ABV: ABV,
		CONSTR: CONSTR,
		TYPED: TYPED,
		VIEW: VIEW
	};
	
	
	/***/ }),
	/* 65 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var navigator = global.navigator;
	
	module.exports = navigator && navigator.userAgent || '';
	
	
	/***/ }),
	/* 66 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var at = __webpack_require__(63)(true);
	
	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	module.exports = function (S, index, unicode) {
		return index + (unicode ? at(S, index).length : 1);
	};
	
	
	/***/ }),
	/* 67 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	
	var toObject = __webpack_require__(9);
	var toAbsoluteIndex = __webpack_require__(40);
	var toLength = __webpack_require__(6);
	module.exports = function fill(value /* , start = 0, end = @length */) {
		var O = toObject(this);
		var length = toLength(O.length);
		var aLen = arguments.length;
		var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
		var end = aLen > 2 ? arguments[2] : undefined;
		var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
		while (endPos > index) O[index++] = value;
		return O;
	};
	
	
	/***/ }),
	/* 68 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(134);
	
	module.exports = function (original, length) {
		return new (speciesConstructor(original))(length);
	};
	
	
	/***/ }),
	/* 69 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $defineProperty = __webpack_require__(8);
	var createDesc = __webpack_require__(37);
	
	module.exports = function (object, index, value) {
		if (index in object) $defineProperty.f(object, index, createDesc(0, value));
		else object[index] = value;
	};
	
	
	/***/ }),
	/* 70 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var isObject = __webpack_require__(4);
	var document = __webpack_require__(2).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
		return is ? document.createElement(it) : {};
	};
	
	
	/***/ }),
	/* 71 */
	/***/ (function(module, exports) {
	
	// IE 8- don't enum bug keys
	module.exports = (
		'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');
	
	
	/***/ }),
	/* 72 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var MATCH = __webpack_require__(5)('match');
	module.exports = function (KEY) {
		var re = /./;
		try {
			'/./'[KEY](re);
		} catch (e) {
			try {
				re[MATCH] = false;
				return !'/./'[KEY](re);
			} catch (f) { /* empty */ }
		} return true;
	};
	
	
	/***/ }),
	/* 73 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var document = __webpack_require__(2).document;
	module.exports = document && document.documentElement;
	
	
	/***/ }),
	/* 74 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var isObject = __webpack_require__(4);
	var setPrototypeOf = __webpack_require__(83).set;
	module.exports = function (that, target, C) {
		var S = target.constructor;
		var P;
		if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
			setPrototypeOf(that, P);
		} return that;
	};
	
	
	/***/ }),
	/* 75 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// check on default Array iterator
	var Iterators = __webpack_require__(44);
	var ITERATOR = __webpack_require__(5)('iterator');
	var ArrayProto = Array.prototype;
	
	module.exports = function (it) {
		return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};
	
	
	/***/ }),
	/* 76 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var create = __webpack_require__(34);
	var descriptor = __webpack_require__(37);
	var setToStringTag = __webpack_require__(45);
	var IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });
	
	module.exports = function (Constructor, NAME, next) {
		Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
		setToStringTag(Constructor, NAME + ' Iterator');
	};
	
	
	/***/ }),
	/* 77 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var LIBRARY = __webpack_require__(30);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(12);
	var hide = __webpack_require__(11);
	var Iterators = __webpack_require__(44);
	var $iterCreate = __webpack_require__(76);
	var setToStringTag = __webpack_require__(45);
	var getPrototypeOf = __webpack_require__(16);
	var ITERATOR = __webpack_require__(5)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';
	
	var returnThis = function () { return this; };
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
		$iterCreate(Constructor, NAME, next);
		var getMethod = function (kind) {
			if (!BUGGY && kind in proto) return proto[kind];
			switch (kind) {
				case KEYS: return function keys() { return new Constructor(this, kind); };
				case VALUES: return function values() { return new Constructor(this, kind); };
			} return function entries() { return new Constructor(this, kind); };
		};
		var TAG = NAME + ' Iterator';
		var DEF_VALUES = DEFAULT == VALUES;
		var VALUES_BUG = false;
		var proto = Base.prototype;
		var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
		var $default = $native || getMethod(DEFAULT);
		var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
		var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
		var methods, key, IteratorPrototype;
		// Fix native
		if ($anyNative) {
			IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
			if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
				// Set @@toStringTag to native iterators
				setToStringTag(IteratorPrototype, TAG, true);
				// fix for some old engines
				if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
			}
		}
		// fix Array#{values, @@iterator}.name in V8 / FF
		if (DEF_VALUES && $native && $native.name !== VALUES) {
			VALUES_BUG = true;
			$default = function values() { return $native.call(this); };
		}
		// Define iterator
		if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
			hide(proto, ITERATOR, $default);
		}
		// Plug for library
		Iterators[NAME] = $default;
		Iterators[TAG] = returnThis;
		if (DEFAULT) {
			methods = {
				values: DEF_VALUES ? $default : getMethod(VALUES),
				keys: IS_SET ? $default : getMethod(KEYS),
				entries: $entries
			};
			if (FORCED) for (key in methods) {
				if (!(key in proto)) redefine(proto, key, methods[key]);
			} else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
		}
		return methods;
	};
	
	
	/***/ }),
	/* 78 */
	/***/ (function(module, exports) {
	
	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
		// Old FF bug
		|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
		// Tor Browser bug
		|| $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
		return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;
	
	
	/***/ }),
	/* 79 */
	/***/ (function(module, exports) {
	
	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x) {
		// eslint-disable-next-line no-self-compare
		return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};
	
	
	/***/ }),
	/* 80 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var macrotask = __webpack_require__(88).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(18)(process) == 'process';
	
	module.exports = function () {
		var head, last, notify;
	
		var flush = function () {
			var parent, fn;
			if (isNode && (parent = process.domain)) parent.exit();
			while (head) {
				fn = head.fn;
				head = head.next;
				try {
					fn();
				} catch (e) {
					if (head) notify();
					else last = undefined;
					throw e;
				}
			} last = undefined;
			if (parent) parent.enter();
		};
	
		// Node.js
		if (isNode) {
			notify = function () {
				process.nextTick(flush);
			};
		// browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
		} else if (Observer && !(global.navigator && global.navigator.standalone)) {
			var toggle = true;
			var node = document.createTextNode('');
			new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
			notify = function () {
				node.data = toggle = !toggle;
			};
		// environments with maybe non-completely correct, but existent Promise
		} else if (Promise && Promise.resolve) {
			// Promise.resolve without an argument throws an error in LG WebOS 2
			var promise = Promise.resolve(undefined);
			notify = function () {
				promise.then(flush);
			};
		// for other environments - macrotask based on:
		// - setImmediate
		// - MessageChannel
		// - window.postMessag
		// - onreadystatechange
		// - setTimeout
		} else {
			notify = function () {
				// strange IE + webpack dev server bug - use .call(global)
				macrotask.call(global, flush);
			};
		}
	
		return function (fn) {
			var task = { fn: fn, next: undefined };
			if (last) last.next = task;
			if (!head) {
				head = task;
				notify();
			} last = task;
		};
	};
	
	
	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(10);
	
	function PromiseCapability(C) {
		var resolve, reject;
		this.promise = new C(function ($$resolve, $$reject) {
			if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
			resolve = $$resolve;
			reject = $$reject;
		});
		this.resolve = aFunction(resolve);
		this.reject = aFunction(reject);
	}
	
	module.exports.f = function (C) {
		return new PromiseCapability(C);
	};
	
	
	/***/ }),
	/* 82 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var regexpFlags = __webpack_require__(47);
	
	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;
	
	var patchedExec = nativeExec;
	
	var LAST_INDEX = 'lastIndex';
	
	var UPDATES_LAST_INDEX_WRONG = (function () {
		var re1 = /a/,
				re2 = /b*/g;
		nativeExec.call(re1, 'a');
		nativeExec.call(re2, 'a');
		return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();
	
	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
	
	if (PATCH) {
		patchedExec = function exec(str) {
			var re = this;
			var lastIndex, reCopy, match, i;
	
			if (NPCG_INCLUDED) {
				reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
			}
			if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
	
			match = nativeExec.call(re, str);
	
			if (UPDATES_LAST_INDEX_WRONG && match) {
				re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
			}
			if (NPCG_INCLUDED && match && match.length > 1) {
				// Fix browsers whose `exec` methods don't consistently return `undefined`
				// for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
				// eslint-disable-next-line no-loop-func
				nativeReplace.call(match[0], reCopy, function () {
					for (i = 1; i < arguments.length - 2; i++) {
						if (arguments[i] === undefined) match[i] = undefined;
					}
				});
			}
	
			return match;
		};
	}
	
	module.exports = patchedExec;
	
	
	/***/ }),
	/* 83 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(4);
	var anObject = __webpack_require__(1);
	var check = function (O, proto) {
		anObject(O);
		if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
		set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
			function (test, buggy, set) {
				try {
					set = __webpack_require__(20)(Function.call, __webpack_require__(15).f(Object.prototype, '__proto__').set, 2);
					set(test, []);
					buggy = !(test instanceof Array);
				} catch (e) { buggy = true; }
				return function setPrototypeOf(O, proto) {
					check(O, proto);
					if (buggy) O.__proto__ = proto;
					else set(O, proto);
					return O;
				};
			}({}, false) : undefined),
		check: check
	};
	
	
	/***/ }),
	/* 84 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var shared = __webpack_require__(50)('keys');
	var uid = __webpack_require__(41);
	module.exports = function (key) {
		return shared[key] || (shared[key] = uid(key));
	};
	
	
	/***/ }),
	/* 85 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(56);
	var defined = __webpack_require__(24);
	
	module.exports = function (that, searchString, NAME) {
		if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
		return String(defined(that));
	};
	
	
	/***/ }),
	/* 86 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var toInteger = __webpack_require__(22);
	var defined = __webpack_require__(24);
	
	module.exports = function repeat(count) {
		var str = String(defined(this));
		var res = '';
		var n = toInteger(count);
		if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
		for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
		return res;
	};
	
	
	/***/ }),
	/* 87 */
	/***/ (function(module, exports) {
	
	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
		'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	
	
	/***/ }),
	/* 88 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var ctx = __webpack_require__(20);
	var invoke = __webpack_require__(104);
	var html = __webpack_require__(73);
	var cel = __webpack_require__(70);
	var global = __webpack_require__(2);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
		var id = +this;
		// eslint-disable-next-line no-prototype-builtins
		if (queue.hasOwnProperty(id)) {
			var fn = queue[id];
			delete queue[id];
			fn();
		}
	};
	var listener = function (event) {
		run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
		setTask = function setImmediate(fn) {
			var args = [];
			var i = 1;
			while (arguments.length > i) args.push(arguments[i++]);
			queue[++counter] = function () {
				// eslint-disable-next-line no-new-func
				invoke(typeof fn == 'function' ? fn : Function(fn), args);
			};
			defer(counter);
			return counter;
		};
		clearTask = function clearImmediate(id) {
			delete queue[id];
		};
		// Node.js 0.8-
		if (__webpack_require__(18)(process) == 'process') {
			defer = function (id) {
				process.nextTick(ctx(run, id, 1));
			};
		// Sphere (JS game engine) Dispatch API
		} else if (Dispatch && Dispatch.now) {
			defer = function (id) {
				Dispatch.now(ctx(run, id, 1));
			};
		// Browsers with MessageChannel, includes WebWorkers
		} else if (MessageChannel) {
			channel = new MessageChannel();
			port = channel.port2;
			channel.port1.onmessage = listener;
			defer = ctx(port.postMessage, port, 1);
		// Browsers with postMessage, skip WebWorkers
		// IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
		} else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
			defer = function (id) {
				global.postMessage(id + '', '*');
			};
			global.addEventListener('message', listener, false);
		// IE8-
		} else if (ONREADYSTATECHANGE in cel('script')) {
			defer = function (id) {
				html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
					html.removeChild(this);
					run.call(id);
				};
			};
		// Rest old browsers
		} else {
			defer = function (id) {
				setTimeout(ctx(run, id, 1), 0);
			};
		}
	}
	module.exports = {
		set: setTask,
		clear: clearTask
	};
	
	
	/***/ }),
	/* 89 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var global = __webpack_require__(2);
	var DESCRIPTORS = __webpack_require__(7);
	var LIBRARY = __webpack_require__(30);
	var $typed = __webpack_require__(64);
	var hide = __webpack_require__(11);
	var redefineAll = __webpack_require__(38);
	var fails = __webpack_require__(3);
	var anInstance = __webpack_require__(32);
	var toInteger = __webpack_require__(22);
	var toLength = __webpack_require__(6);
	var toIndex = __webpack_require__(123);
	var gOPN = __webpack_require__(35).f;
	var dP = __webpack_require__(8).f;
	var arrayFill = __webpack_require__(67);
	var setToStringTag = __webpack_require__(45);
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = global[ARRAY_BUFFER];
	var $DataView = global[DATA_VIEW];
	var Math = global.Math;
	var RangeError = global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
	var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
	var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
		var buffer = new Array(nBytes);
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
		var i = 0;
		var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
		var e, m, c;
		value = abs(value);
		// eslint-disable-next-line no-self-compare
		if (value != value || value === Infinity) {
			// eslint-disable-next-line no-self-compare
			m = value != value ? 1 : 0;
			e = eMax;
		} else {
			e = floor(log(value) / LN2);
			if (value * (c = pow(2, -e)) < 1) {
				e--;
				c *= 2;
			}
			if (e + eBias >= 1) {
				value += rt / c;
			} else {
				value += rt * pow(2, 1 - eBias);
			}
			if (value * c >= 2) {
				e++;
				c /= 2;
			}
			if (e + eBias >= eMax) {
				m = 0;
				e = eMax;
			} else if (e + eBias >= 1) {
				m = (value * c - 1) * pow(2, mLen);
				e = e + eBias;
			} else {
				m = value * pow(2, eBias - 1) * pow(2, mLen);
				e = 0;
			}
		}
		for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
		e = e << mLen | m;
		eLen += mLen;
		for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
		buffer[--i] |= s * 128;
		return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var nBits = eLen - 7;
		var i = nBytes - 1;
		var s = buffer[i--];
		var e = s & 127;
		var m;
		s >>= 7;
		for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
		m = e & (1 << -nBits) - 1;
		e >>= -nBits;
		nBits += mLen;
		for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
		if (e === 0) {
			e = 1 - eBias;
		} else if (e === eMax) {
			return m ? NaN : s ? -Infinity : Infinity;
		} else {
			m = m + pow(2, mLen);
			e = e - eBias;
		} return (s ? -1 : 1) * m * pow(2, e - mLen);
	}
	
	function unpackI32(bytes) {
		return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
		return [it & 0xff];
	}
	function packI16(it) {
		return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
		return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
		return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
		return packIEEE754(it, 23, 4);
	}
	
	function addGetter(C, key, internal) {
		dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}
	
	function get(view, bytes, index, isLittleEndian) {
		var numIndex = +index;
		var intIndex = toIndex(numIndex);
		if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		var store = view[$BUFFER]._b;
		var start = intIndex + view[$OFFSET];
		var pack = store.slice(start, start + bytes);
		return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
		var numIndex = +index;
		var intIndex = toIndex(numIndex);
		if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		var store = view[$BUFFER]._b;
		var start = intIndex + view[$OFFSET];
		var pack = conversion(+value);
		for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}
	
	if (!$typed.ABV) {
		$ArrayBuffer = function ArrayBuffer(length) {
			anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
			var byteLength = toIndex(length);
			this._b = arrayFill.call(new Array(byteLength), 0);
			this[$LENGTH] = byteLength;
		};
	
		$DataView = function DataView(buffer, byteOffset, byteLength) {
			anInstance(this, $DataView, DATA_VIEW);
			anInstance(buffer, $ArrayBuffer, DATA_VIEW);
			var bufferLength = buffer[$LENGTH];
			var offset = toInteger(byteOffset);
			if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
			byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
			if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
			this[$BUFFER] = buffer;
			this[$OFFSET] = offset;
			this[$LENGTH] = byteLength;
		};
	
		if (DESCRIPTORS) {
			addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
			addGetter($DataView, BUFFER, '_b');
			addGetter($DataView, BYTE_LENGTH, '_l');
			addGetter($DataView, BYTE_OFFSET, '_o');
		}
	
		redefineAll($DataView[PROTOTYPE], {
			getInt8: function getInt8(byteOffset) {
				return get(this, 1, byteOffset)[0] << 24 >> 24;
			},
			getUint8: function getUint8(byteOffset) {
				return get(this, 1, byteOffset)[0];
			},
			getInt16: function getInt16(byteOffset /* , littleEndian */) {
				var bytes = get(this, 2, byteOffset, arguments[1]);
				return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
			},
			getUint16: function getUint16(byteOffset /* , littleEndian */) {
				var bytes = get(this, 2, byteOffset, arguments[1]);
				return bytes[1] << 8 | bytes[0];
			},
			getInt32: function getInt32(byteOffset /* , littleEndian */) {
				return unpackI32(get(this, 4, byteOffset, arguments[1]));
			},
			getUint32: function getUint32(byteOffset /* , littleEndian */) {
				return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
			},
			getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
				return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
			},
			getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
				return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
			},
			setInt8: function setInt8(byteOffset, value) {
				set(this, 1, byteOffset, packI8, value);
			},
			setUint8: function setUint8(byteOffset, value) {
				set(this, 1, byteOffset, packI8, value);
			},
			setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
				set(this, 2, byteOffset, packI16, value, arguments[2]);
			},
			setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
				set(this, 2, byteOffset, packI16, value, arguments[2]);
			},
			setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
				set(this, 4, byteOffset, packI32, value, arguments[2]);
			},
			setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
				set(this, 4, byteOffset, packI32, value, arguments[2]);
			},
			setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
				set(this, 4, byteOffset, packF32, value, arguments[2]);
			},
			setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
				set(this, 8, byteOffset, packF64, value, arguments[2]);
			}
		});
	} else {
		if (!fails(function () {
			$ArrayBuffer(1);
		}) || !fails(function () {
			new $ArrayBuffer(-1); // eslint-disable-line no-new
		}) || fails(function () {
			new $ArrayBuffer(); // eslint-disable-line no-new
			new $ArrayBuffer(1.5); // eslint-disable-line no-new
			new $ArrayBuffer(NaN); // eslint-disable-line no-new
			return $ArrayBuffer.name != ARRAY_BUFFER;
		})) {
			$ArrayBuffer = function ArrayBuffer(length) {
				anInstance(this, $ArrayBuffer);
				return new BaseBuffer(toIndex(length));
			};
			var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
			for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
				if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
			}
			if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
		}
		// iOS Safari 7.x bug
		var view = new $DataView(new $ArrayBuffer(2));
		var $setInt8 = $DataView[PROTOTYPE].setInt8;
		view.setInt8(0, 2147483648);
		view.setInt8(1, 2147483649);
		if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
			setInt8: function setInt8(byteOffset, value) {
				$setInt8.call(this, byteOffset, value << 24 >> 24);
			},
			setUint8: function setUint8(byteOffset, value) {
				$setInt8.call(this, byteOffset, value << 24 >> 24);
			}
		}, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	
	
	/***/ }),
	/* 90 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var core = __webpack_require__(19);
	var LIBRARY = __webpack_require__(30);
	var wksExt = __webpack_require__(124);
	var defineProperty = __webpack_require__(8).f;
	module.exports = function (name) {
		var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
		if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};
	
	
	/***/ }),
	/* 91 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var classof = __webpack_require__(43);
	var ITERATOR = __webpack_require__(5)('iterator');
	var Iterators = __webpack_require__(44);
	module.exports = __webpack_require__(19).getIteratorMethod = function (it) {
		if (it != undefined) return it[ITERATOR]
			|| it['@@iterator']
			|| Iterators[classof(it)];
	};
	
	
	/***/ }),
	/* 92 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var addToUnscopables = __webpack_require__(29);
	var step = __webpack_require__(107);
	var Iterators = __webpack_require__(44);
	var toIObject = __webpack_require__(17);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(77)(Array, 'Array', function (iterated, kind) {
		this._t = toIObject(iterated); // target
		this._i = 0;                   // next index
		this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
		var O = this._t;
		var kind = this._k;
		var index = this._i++;
		if (!O || index >= O.length) {
			this._t = undefined;
			return step(1);
		}
		if (kind == 'keys') return step(0, index);
		if (kind == 'values') return step(0, O[index]);
		return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');
	
	
	/***/ }),
	/* 93 */
	/***/ (function(module, exports) {
	
	var g;
	
	// This works in non-strict mode
	g = (function() {
		return this;
	})();
	
	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (1,eval)("this");
	} catch(e) {
		// This works if the window reference is available
		if(typeof window === "object")
			g = window;
	}
	
	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}
	
	module.exports = g;
	
	
	/***/ }),
	/* 94 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var cof = __webpack_require__(18);
	module.exports = function (it, msg) {
		if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
		return +it;
	};
	
	
	/***/ }),
	/* 95 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	
	var toObject = __webpack_require__(9);
	var toAbsoluteIndex = __webpack_require__(40);
	var toLength = __webpack_require__(6);
	
	module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
		var O = toObject(this);
		var len = toLength(O.length);
		var to = toAbsoluteIndex(target, len);
		var from = toAbsoluteIndex(start, len);
		var end = arguments.length > 2 ? arguments[2] : undefined;
		var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
		var inc = 1;
		if (from < to && to < from + count) {
			inc = -1;
			from += count - 1;
			to += count - 1;
		}
		while (count-- > 0) {
			if (from in O) O[to] = O[from];
			else delete O[to];
			to += inc;
			from += inc;
		} return O;
	};
	
	
	/***/ }),
	/* 96 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var forOf = __webpack_require__(33);
	
	module.exports = function (iter, ITERATOR) {
		var result = [];
		forOf(iter, false, result.push, result, ITERATOR);
		return result;
	};
	
	
	/***/ }),
	/* 97 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var aFunction = __webpack_require__(10);
	var toObject = __webpack_require__(9);
	var IObject = __webpack_require__(48);
	var toLength = __webpack_require__(6);
	
	module.exports = function (that, callbackfn, aLen, memo, isRight) {
		aFunction(callbackfn);
		var O = toObject(that);
		var self = IObject(O);
		var length = toLength(O.length);
		var index = isRight ? length - 1 : 0;
		var i = isRight ? -1 : 1;
		if (aLen < 2) for (;;) {
			if (index in self) {
				memo = self[index];
				index += i;
				break;
			}
			index += i;
			if (isRight ? index < 0 : length <= index) {
				throw TypeError('Reduce of empty array with no initial value');
			}
		}
		for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
			memo = callbackfn(memo, self[index], index, O);
		}
		return memo;
	};
	
	
	/***/ }),
	/* 98 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var aFunction = __webpack_require__(10);
	var isObject = __webpack_require__(4);
	var invoke = __webpack_require__(104);
	var arraySlice = [].slice;
	var factories = {};
	
	var construct = function (F, len, args) {
		if (!(len in factories)) {
			for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
			// eslint-disable-next-line no-new-func
			factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
		} return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /* , ...args */) {
		var fn = aFunction(this);
		var partArgs = arraySlice.call(arguments, 1);
		var bound = function (/* args... */) {
			var args = partArgs.concat(arraySlice.call(arguments));
			return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
		};
		if (isObject(fn.prototype)) bound.prototype = fn.prototype;
		return bound;
	};
	
	
	/***/ }),
	/* 99 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var dP = __webpack_require__(8).f;
	var create = __webpack_require__(34);
	var redefineAll = __webpack_require__(38);
	var ctx = __webpack_require__(20);
	var anInstance = __webpack_require__(32);
	var forOf = __webpack_require__(33);
	var $iterDefine = __webpack_require__(77);
	var step = __webpack_require__(107);
	var setSpecies = __webpack_require__(39);
	var DESCRIPTORS = __webpack_require__(7);
	var fastKey = __webpack_require__(31).fastKey;
	var validate = __webpack_require__(42);
	var SIZE = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function (that, key) {
		// fast case
		var index = fastKey(key);
		var entry;
		if (index !== 'F') return that._i[index];
		// frozen object case
		for (entry = that._f; entry; entry = entry.n) {
			if (entry.k == key) return entry;
		}
	};
	
	module.exports = {
		getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
			var C = wrapper(function (that, iterable) {
				anInstance(that, C, NAME, '_i');
				that._t = NAME;         // collection type
				that._i = create(null); // index
				that._f = undefined;    // first entry
				that._l = undefined;    // last entry
				that[SIZE] = 0;         // size
				if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
			});
			redefineAll(C.prototype, {
				// 23.1.3.1 Map.prototype.clear()
				// 23.2.3.2 Set.prototype.clear()
				clear: function clear() {
					for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
						entry.r = true;
						if (entry.p) entry.p = entry.p.n = undefined;
						delete data[entry.i];
					}
					that._f = that._l = undefined;
					that[SIZE] = 0;
				},
				// 23.1.3.3 Map.prototype.delete(key)
				// 23.2.3.4 Set.prototype.delete(value)
				'delete': function (key) {
					var that = validate(this, NAME);
					var entry = getEntry(that, key);
					if (entry) {
						var next = entry.n;
						var prev = entry.p;
						delete that._i[entry.i];
						entry.r = true;
						if (prev) prev.n = next;
						if (next) next.p = prev;
						if (that._f == entry) that._f = next;
						if (that._l == entry) that._l = prev;
						that[SIZE]--;
					} return !!entry;
				},
				// 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
				// 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
				forEach: function forEach(callbackfn /* , that = undefined */) {
					validate(this, NAME);
					var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
					var entry;
					while (entry = entry ? entry.n : this._f) {
						f(entry.v, entry.k, this);
						// revert to the last existing entry
						while (entry && entry.r) entry = entry.p;
					}
				},
				// 23.1.3.7 Map.prototype.has(key)
				// 23.2.3.7 Set.prototype.has(value)
				has: function has(key) {
					return !!getEntry(validate(this, NAME), key);
				}
			});
			if (DESCRIPTORS) dP(C.prototype, 'size', {
				get: function () {
					return validate(this, NAME)[SIZE];
				}
			});
			return C;
		},
		def: function (that, key, value) {
			var entry = getEntry(that, key);
			var prev, index;
			// change existing entry
			if (entry) {
				entry.v = value;
			// create new entry
			} else {
				that._l = entry = {
					i: index = fastKey(key, true), // <- index
					k: key,                        // <- key
					v: value,                      // <- value
					p: prev = that._l,             // <- previous entry
					n: undefined,                  // <- next entry
					r: false                       // <- removed
				};
				if (!that._f) that._f = entry;
				if (prev) prev.n = entry;
				that[SIZE]++;
				// add to index
				if (index !== 'F') that._i[index] = entry;
			} return that;
		},
		getEntry: getEntry,
		setStrong: function (C, NAME, IS_MAP) {
			// add .keys, .values, .entries, [@@iterator]
			// 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
			$iterDefine(C, NAME, function (iterated, kind) {
				this._t = validate(iterated, NAME); // target
				this._k = kind;                     // kind
				this._l = undefined;                // previous
			}, function () {
				var that = this;
				var kind = that._k;
				var entry = that._l;
				// revert to the last existing entry
				while (entry && entry.r) entry = entry.p;
				// get next entry
				if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
					// or finish the iteration
					that._t = undefined;
					return step(1);
				}
				// return step by kind
				if (kind == 'keys') return step(0, entry.k);
				if (kind == 'values') return step(0, entry.v);
				return step(0, [entry.k, entry.v]);
			}, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
	
			// add [@@species], 23.1.2.2, 23.2.2.2
			setSpecies(NAME);
		}
	};
	
	
	/***/ }),
	/* 100 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(43);
	var from = __webpack_require__(96);
	module.exports = function (NAME) {
		return function toJSON() {
			if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
			return from(this);
		};
	};
	
	
	/***/ }),
	/* 101 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var redefineAll = __webpack_require__(38);
	var getWeak = __webpack_require__(31).getWeak;
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var anInstance = __webpack_require__(32);
	var forOf = __webpack_require__(33);
	var createArrayMethod = __webpack_require__(23);
	var $has = __webpack_require__(14);
	var validate = __webpack_require__(42);
	var arrayFind = createArrayMethod(5);
	var arrayFindIndex = createArrayMethod(6);
	var id = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
		return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
		this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
		return arrayFind(store.a, function (it) {
			return it[0] === key;
		});
	};
	UncaughtFrozenStore.prototype = {
		get: function (key) {
			var entry = findUncaughtFrozen(this, key);
			if (entry) return entry[1];
		},
		has: function (key) {
			return !!findUncaughtFrozen(this, key);
		},
		set: function (key, value) {
			var entry = findUncaughtFrozen(this, key);
			if (entry) entry[1] = value;
			else this.a.push([key, value]);
		},
		'delete': function (key) {
			var index = arrayFindIndex(this.a, function (it) {
				return it[0] === key;
			});
			if (~index) this.a.splice(index, 1);
			return !!~index;
		}
	};
	
	module.exports = {
		getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
			var C = wrapper(function (that, iterable) {
				anInstance(that, C, NAME, '_i');
				that._t = NAME;      // collection type
				that._i = id++;      // collection id
				that._l = undefined; // leak store for uncaught frozen objects
				if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
			});
			redefineAll(C.prototype, {
				// 23.3.3.2 WeakMap.prototype.delete(key)
				// 23.4.3.3 WeakSet.prototype.delete(value)
				'delete': function (key) {
					if (!isObject(key)) return false;
					var data = getWeak(key);
					if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
					return data && $has(data, this._i) && delete data[this._i];
				},
				// 23.3.3.4 WeakMap.prototype.has(key)
				// 23.4.3.4 WeakSet.prototype.has(value)
				has: function has(key) {
					if (!isObject(key)) return false;
					var data = getWeak(key);
					if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
					return data && $has(data, this._i);
				}
			});
			return C;
		},
		def: function (that, key, value) {
			var data = getWeak(anObject(key), true);
			if (data === true) uncaughtFrozenStore(that).set(key, value);
			else data[that._i] = value;
			return that;
		},
		ufstore: uncaughtFrozenStore
	};
	
	
	/***/ }),
	/* 102 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var isArray = __webpack_require__(55);
	var isObject = __webpack_require__(4);
	var toLength = __webpack_require__(6);
	var ctx = __webpack_require__(20);
	var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');
	
	function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
		var targetIndex = start;
		var sourceIndex = 0;
		var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
		var element, spreadable;
	
		while (sourceIndex < sourceLen) {
			if (sourceIndex in source) {
				element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
	
				spreadable = false;
				if (isObject(element)) {
					spreadable = element[IS_CONCAT_SPREADABLE];
					spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
				}
	
				if (spreadable && depth > 0) {
					targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
				} else {
					if (targetIndex >= 0x1fffffffffffff) throw TypeError();
					target[targetIndex] = element;
				}
	
				targetIndex++;
			}
			sourceIndex++;
		}
		return targetIndex;
	}
	
	module.exports = flattenIntoArray;
	
	
	/***/ }),
	/* 103 */
	/***/ (function(module, exports, __webpack_require__) {
	
	module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
		return Object.defineProperty(__webpack_require__(70)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});
	
	
	/***/ }),
	/* 104 */
	/***/ (function(module, exports) {
	
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
		var un = that === undefined;
		switch (args.length) {
			case 0: return un ? fn()
												: fn.call(that);
			case 1: return un ? fn(args[0])
												: fn.call(that, args[0]);
			case 2: return un ? fn(args[0], args[1])
												: fn.call(that, args[0], args[1]);
			case 3: return un ? fn(args[0], args[1], args[2])
												: fn.call(that, args[0], args[1], args[2]);
			case 4: return un ? fn(args[0], args[1], args[2], args[3])
												: fn.call(that, args[0], args[1], args[2], args[3]);
		} return fn.apply(that, args);
	};
	
	
	/***/ }),
	/* 105 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(4);
	var floor = Math.floor;
	module.exports = function isInteger(it) {
		return !isObject(it) && isFinite(it) && floor(it) === it;
	};
	
	
	/***/ }),
	/* 106 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(1);
	module.exports = function (iterator, fn, value, entries) {
		try {
			return entries ? fn(anObject(value)[0], value[1]) : fn(value);
		// 7.4.6 IteratorClose(iterator, completion)
		} catch (e) {
			var ret = iterator['return'];
			if (ret !== undefined) anObject(ret.call(iterator));
			throw e;
		}
	};
	
	
	/***/ }),
	/* 107 */
	/***/ (function(module, exports) {
	
	module.exports = function (done, value) {
		return { value: value, done: !!done };
	};
	
	
	/***/ }),
	/* 108 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.16 Math.fround(x)
	var sign = __webpack_require__(79);
	var pow = Math.pow;
	var EPSILON = pow(2, -52);
	var EPSILON32 = pow(2, -23);
	var MAX32 = pow(2, 127) * (2 - EPSILON32);
	var MIN32 = pow(2, -126);
	
	var roundTiesToEven = function (n) {
		return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	module.exports = Math.fround || function fround(x) {
		var $abs = Math.abs(x);
		var $sign = sign(x);
		var a, result;
		if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
		a = (1 + EPSILON32 / EPSILON) * $abs;
		result = a - (a - $abs);
		// eslint-disable-next-line no-self-compare
		if (result > MAX32 || result != result) return $sign * Infinity;
		return $sign * result;
	};
	
	
	/***/ }),
	/* 109 */
	/***/ (function(module, exports) {
	
	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x) {
		return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};
	
	
	/***/ }),
	/* 110 */
	/***/ (function(module, exports) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
		if (
			arguments.length === 0
				// eslint-disable-next-line no-self-compare
				|| x != x
				// eslint-disable-next-line no-self-compare
				|| inLow != inLow
				// eslint-disable-next-line no-self-compare
				|| inHigh != inHigh
				// eslint-disable-next-line no-self-compare
				|| outLow != outLow
				// eslint-disable-next-line no-self-compare
				|| outHigh != outHigh
		) return NaN;
		if (x === Infinity || x === -Infinity) return x;
		return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
	};
	
	
	/***/ }),
	/* 111 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 19.1.2.1 Object.assign(target, source, ...)
	var DESCRIPTORS = __webpack_require__(7);
	var getKeys = __webpack_require__(36);
	var gOPS = __webpack_require__(59);
	var pIE = __webpack_require__(49);
	var toObject = __webpack_require__(9);
	var IObject = __webpack_require__(48);
	var $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(3)(function () {
		var A = {};
		var B = {};
		// eslint-disable-next-line no-undef
		var S = Symbol();
		var K = 'abcdefghijklmnopqrst';
		A[S] = 7;
		K.split('').forEach(function (k) { B[k] = k; });
		return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
		var T = toObject(target);
		var aLen = arguments.length;
		var index = 1;
		var getSymbols = gOPS.f;
		var isEnum = pIE.f;
		while (aLen > index) {
			var S = IObject(arguments[index++]);
			var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
			var length = keys.length;
			var j = 0;
			var key;
			while (length > j) {
				key = keys[j++];
				if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
			}
		} return T;
	} : $assign;
	
	
	/***/ }),
	/* 112 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var dP = __webpack_require__(8);
	var anObject = __webpack_require__(1);
	var getKeys = __webpack_require__(36);
	
	module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
		anObject(O);
		var keys = getKeys(Properties);
		var length = keys.length;
		var i = 0;
		var P;
		while (length > i) dP.f(O, P = keys[i++], Properties[P]);
		return O;
	};
	
	
	/***/ }),
	/* 113 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(17);
	var gOPN = __webpack_require__(35).f;
	var toString = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
		? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function (it) {
		try {
			return gOPN(it);
		} catch (e) {
			return windowNames.slice();
		}
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
		return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};
	
	
	/***/ }),
	/* 114 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var has = __webpack_require__(14);
	var toIObject = __webpack_require__(17);
	var arrayIndexOf = __webpack_require__(52)(false);
	var IE_PROTO = __webpack_require__(84)('IE_PROTO');
	
	module.exports = function (object, names) {
		var O = toIObject(object);
		var i = 0;
		var result = [];
		var key;
		for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
		// Don't enum bug & hidden keys
		while (names.length > i) if (has(O, key = names[i++])) {
			~arrayIndexOf(result, key) || result.push(key);
		}
		return result;
	};
	
	
	/***/ }),
	/* 115 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var DESCRIPTORS = __webpack_require__(7);
	var getKeys = __webpack_require__(36);
	var toIObject = __webpack_require__(17);
	var isEnum = __webpack_require__(49).f;
	module.exports = function (isEntries) {
		return function (it) {
			var O = toIObject(it);
			var keys = getKeys(O);
			var length = keys.length;
			var i = 0;
			var result = [];
			var key;
			while (length > i) {
				key = keys[i++];
				if (!DESCRIPTORS || isEnum.call(O, key)) {
					result.push(isEntries ? [key, O[key]] : O[key]);
				}
			}
			return result;
		};
	};
	
	
	/***/ }),
	/* 116 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// all object keys, includes non-enumerable and symbols
	var gOPN = __webpack_require__(35);
	var gOPS = __webpack_require__(59);
	var anObject = __webpack_require__(1);
	var Reflect = __webpack_require__(2).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
		var keys = gOPN.f(anObject(it));
		var getSymbols = gOPS.f;
		return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};
	
	
	/***/ }),
	/* 117 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $parseFloat = __webpack_require__(2).parseFloat;
	var $trim = __webpack_require__(46).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(87) + '-0') !== -Infinity ? function parseFloat(str) {
		var string = $trim(String(str), 3);
		var result = $parseFloat(string);
		return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;
	
	
	/***/ }),
	/* 118 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $parseInt = __webpack_require__(2).parseInt;
	var $trim = __webpack_require__(46).trim;
	var ws = __webpack_require__(87);
	var hex = /^[-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
		var string = $trim(String(str), 3);
		return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;
	
	
	/***/ }),
	/* 119 */
	/***/ (function(module, exports) {
	
	module.exports = function (exec) {
		try {
			return { e: false, v: exec() };
		} catch (e) {
			return { e: true, v: e };
		}
	};
	
	
	/***/ }),
	/* 120 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var newPromiseCapability = __webpack_require__(81);
	
	module.exports = function (C, x) {
		anObject(C);
		if (isObject(x) && x.constructor === C) return x;
		var promiseCapability = newPromiseCapability.f(C);
		var resolve = promiseCapability.resolve;
		resolve(x);
		return promiseCapability.promise;
	};
	
	
	/***/ }),
	/* 121 */
	/***/ (function(module, exports) {
	
	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y) {
		// eslint-disable-next-line no-self-compare
		return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};
	
	
	/***/ }),
	/* 122 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(6);
	var repeat = __webpack_require__(86);
	var defined = __webpack_require__(24);
	
	module.exports = function (that, maxLength, fillString, left) {
		var S = String(defined(that));
		var stringLength = S.length;
		var fillStr = fillString === undefined ? ' ' : String(fillString);
		var intMaxLength = toLength(maxLength);
		if (intMaxLength <= stringLength || fillStr == '') return S;
		var fillLen = intMaxLength - stringLength;
		var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
		if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
		return left ? stringFiller + S : S + stringFiller;
	};
	
	
	/***/ }),
	/* 123 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/ecma262/#sec-toindex
	var toInteger = __webpack_require__(22);
	var toLength = __webpack_require__(6);
	module.exports = function (it) {
		if (it === undefined) return 0;
		var number = toInteger(it);
		var length = toLength(number);
		if (number !== length) throw RangeError('Wrong length!');
		return length;
	};
	
	
	/***/ }),
	/* 124 */
	/***/ (function(module, exports, __webpack_require__) {
	
	exports.f = __webpack_require__(5);
	
	
	/***/ }),
	/* 125 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var strong = __webpack_require__(99);
	var validate = __webpack_require__(42);
	var MAP = 'Map';
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(53)(MAP, function (get) {
		return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
		// 23.1.3.6 Map.prototype.get(key)
		get: function get(key) {
			var entry = strong.getEntry(validate(this, MAP), key);
			return entry && entry.v;
		},
		// 23.1.3.9 Map.prototype.set(key, value)
		set: function set(key, value) {
			return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
		}
	}, strong, true);
	
	
	/***/ }),
	/* 126 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var regexpExec = __webpack_require__(82);
	__webpack_require__(0)({
		target: 'RegExp',
		proto: true,
		forced: regexpExec !== /./.exec
	}, {
		exec: regexpExec
	});
	
	
	/***/ }),
	/* 127 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 21.2.5.3 get RegExp.prototype.flags()
	if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
		configurable: true,
		get: __webpack_require__(47)
	});
	
	
	/***/ }),
	/* 128 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var strong = __webpack_require__(99);
	var validate = __webpack_require__(42);
	var SET = 'Set';
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(53)(SET, function (get) {
		return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
		// 23.2.3.1 Set.prototype.add(value)
		add: function add(value) {
			return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
		}
	}, strong);
	
	
	/***/ }),
	/* 129 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var global = __webpack_require__(2);
	var each = __webpack_require__(23)(0);
	var redefine = __webpack_require__(12);
	var meta = __webpack_require__(31);
	var assign = __webpack_require__(111);
	var weak = __webpack_require__(101);
	var isObject = __webpack_require__(4);
	var validate = __webpack_require__(42);
	var NATIVE_WEAK_MAP = __webpack_require__(42);
	var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak.ufstore;
	var InternalMap;
	
	var wrapper = function (get) {
		return function WeakMap() {
			return get(this, arguments.length > 0 ? arguments[0] : undefined);
		};
	};
	
	var methods = {
		// 23.3.3.3 WeakMap.prototype.get(key)
		get: function get(key) {
			if (isObject(key)) {
				var data = getWeak(key);
				if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
				return data ? data[this._i] : undefined;
			}
		},
		// 23.3.3.5 WeakMap.prototype.set(key, value)
		set: function set(key, value) {
			return weak.def(validate(this, WEAK_MAP), key, value);
		}
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(53)(WEAK_MAP, wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
		InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
		assign(InternalMap.prototype, methods);
		meta.NEED = true;
		each(['delete', 'has', 'get', 'set'], function (key) {
			var proto = $WeakMap.prototype;
			var method = proto[key];
			redefine(proto, key, function (a, b) {
				// store frozen objects on internal weakmap shim
				if (isObject(a) && !isExtensible(a)) {
					if (!this._f) this._f = new InternalMap();
					var result = this._f[key](a, b);
					return key == 'set' ? this : result;
				// store all the rest on native weakmap
				} return method.call(this, a, b);
			});
		});
	}
	
	
	/***/ }),
	/* 130 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _matterJs = __webpack_require__(333);
	
	var _matterJs2 = _interopRequireDefault(_matterJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BALLS_COUNT = 75;
	var BALL_RADIUS = 10;
	var CANVAS_WIDTH = 550;
	var CANVAS_HEIGHT = 550;
	
	var App = function () {
		function App() {
			_classCallCheck(this, App);
		}
	
		_createClass(App, null, [{
			key: 'init',
			value: function init() {
				var Engine = _matterJs2.default.Engine,
						Render = _matterJs2.default.Render,
						World = _matterJs2.default.World,
						Bodies = _matterJs2.default.Bodies,
						Body = _matterJs2.default.Body,
						Runner = _matterJs2.default.Runner,
						Events = _matterJs2.default.Events;
	
				var engine = Engine.create();
				var runner = Runner.run(engine);
	
				var render = Render.create({
					canvas: canvas,
					engine: engine,
					options: {
						wireframes: false,
						width: CANVAS_WIDTH,
						height: CANVAS_HEIGHT,
						background: 'transparent'
					}
				});
	
				var balls = [];
				var ballImagePaths = ['static/images/1.png', 'static/images/2.png', 'static/images/3.png', 'static/images/4.png', 'static/images/5.png', 'static/images/6.png', 'static/images/7.png', 'static/images/8.png', 'static/images/9.png', 'static/images/10.png', 'static/images/11.png', 'static/images/12.png', 'static/images/13.png', 'static/images/14.png', 'static/images/15.png', 'static/images/16.png', 'static/images/17.png', 'static/images/18.png', 'static/images/19.png', 'static/images/20.png', 'static/images/21.png', 'static/images/22.png', 'static/images/23.png', 'static/images/24.png', 'static/images/25.png', 'static/images/26.png', 'static/images/27.png', 'static/images/28.png', 'static/images/29.png', 'static/images/30.png', 'static/images/31.png', 'static/images/32.png', 'static/images/33.png', 'static/images/34.png', 'static/images/35.png', 'static/images/36.png', 'static/images/37.png', 'static/images/38.png', 'static/images/39.png', 'static/images/40.png', 'static/images/41.png', 'static/images/42.png', 'static/images/43.png', 'static/images/44.png', 'static/images/45.png', 'static/images/46.png', 'static/images/47.png', 'static/images/48.png', 'static/images/49.png', 'static/images/50.png', 'static/images/51.png', 'static/images/52.png', 'static/images/53.png', 'static/images/54.png', 'static/images/55.png', 'static/images/56.png', 'static/images/57.png', 'static/images/58.png', 'static/images/59.png', 'static/images/60.png', 'static/images/61.png', 'static/images/62.png', 'static/images/63.png', 'static/images/64.png', 'static/images/65.png', 'static/images/66.png', 'static/images/67.png', 'static/images/68.png', 'static/images/69.png', 'static/images/70.png', 'static/images/71.png', 'static/images/72.png', 'static/images/73.png', 'static/images/74.png', 'static/images/75.png'];
	
				var createBall = function createBall() {
					var ball = Bodies.circle(render.canvas.width / 2 - BALL_RADIUS, render.canvas.height / 2 - 2 * BALL_RADIUS, BALL_RADIUS, {
						restitution: 1.03,
						render: {
							sprite: {
								texture: ballImagePaths[Math.round(Math.random() * (ballImagePaths.length - 1))]
							}
						}
					});
					balls.push(ball);
					return ball;
				};
	
				var onRenderTick = function onRenderTick() {
					balls.forEach(function (ball) {
						if (ball.position.y >= render.canvas.height - 100) {
							Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.003 });
						}
						if (ball.position.y < 120) {
							Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.003, y: 0.003 });
						}
	
						if (ball.position.x < 80) {
							Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.003 });
						}
	
						if (ball.position.x > render.canvas.width - 80) {
							Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.003, y: 0.003 });
						}
					});
				};
	
				// Add the balls to the scene
				for (var i = 0; i < BALLS_COUNT; i++) {
					World.add(engine.world, createBall());
				}
	
				// Run the engine
				Engine.run(engine);
				Render.run(render);
	
				/**
				 * Build the circle bounds - BEGIN
				 * */
				var addBody = function addBody() {
					for (var _len = arguments.length, bodies = Array(_len), _key = 0; _key < _len; _key++) {
						bodies[_key] = arguments[_key];
					}
	
					World.add.apply(World, [engine.world].concat(bodies));
				};
	
				var addRect = function addRect() {
					var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
							_ref$x = _ref.x,
							x = _ref$x === undefined ? 0 : _ref$x,
							_ref$y = _ref.y,
							y = _ref$y === undefined ? 0 : _ref$y,
							_ref$w = _ref.w,
							w = _ref$w === undefined ? 10 : _ref$w,
							_ref$h = _ref.h,
							h = _ref$h === undefined ? 10 : _ref$h,
							_ref$options = _ref.options,
							options = _ref$options === undefined ? {} : _ref$options;
	
					var body = Bodies.rectangle(x, y, w, h, options);
					addBody(body);
					return body;
				};
	
				var sW = CANVAS_WIDTH;
				var sH = CANVAS_WIDTH;
				var m = Math.min(sW, sH);
				var rat = 1 / 4.5 * 2;
				var r = m * rat;
				var pegCount = 64;
				var TAU = Math.PI * 2;
				for (var _i = 0; _i < pegCount; _i++) {
					var segment = TAU / pegCount;
					var angle2 = _i / pegCount * TAU + segment / 2;
					var x2 = Math.cos(angle2);
					var y2 = Math.sin(angle2);
					var cx2 = x2 * r + sW / 2;
					var cy2 = y2 * r + sH / 2;
					addRect({
						x: cx2,
						y: cy2,
						w: 100 / 1000 * m,
						h: 3000 / 1000 * m,
						options: {
							angle: angle2,
							isStatic: true,
							density: 1,
							render: {
								fillStyle: 'transparent',
								strokeStyle: 'white',
								lineWidth: 0
							}
						}
					});
				}
				// Build the circle bounds - END
	
				// Start the blowing with X seconds delay
				setTimeout(function () {
					Events.on(runner, 'tick', onRenderTick);
				}, 3000);
			}
		}]);
	
		return App;
	}();
	
	exports.default = App;
	
	App.init();
	
	/***/ }),
	/* 131 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	/* WEBPACK VAR INJECTION */(function(global) {
	
	__webpack_require__(332);
	
	__webpack_require__(132);
	
	__webpack_require__(133);
	
	if (global._babelPolyfill) {
		throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
		O[key] || Object[DEFINE_PROPERTY](O, key, {
			writable: true,
			configurable: true,
			value: value
		});
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
		[][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))
	
	/***/ }),
	/* 132 */
	/***/ (function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
		"use strict";
	
		var Op = Object.prototype;
		var hasOwn = Op.hasOwnProperty;
		var undefined; // More compressible than void 0.
		var $Symbol = typeof Symbol === "function" ? Symbol : {};
		var iteratorSymbol = $Symbol.iterator || "@@iterator";
		var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
		var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
		var inModule = typeof module === "object";
		var runtime = global.regeneratorRuntime;
		if (runtime) {
			if (inModule) {
				// If regeneratorRuntime is defined globally and we're in a module,
				// make the exports object identical to regeneratorRuntime.
				module.exports = runtime;
			}
			// Don't bother evaluating the rest of this file if the runtime was
			// already defined globally.
			return;
		}
	
		// Define the runtime globally (as expected by generated code) as either
		// module.exports (if we're in a module) or a new, empty object.
		runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
		function wrap(innerFn, outerFn, self, tryLocsList) {
			// If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
			var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
			var generator = Object.create(protoGenerator.prototype);
			var context = new Context(tryLocsList || []);
	
			// The ._invoke method unifies the implementations of the .next,
			// .throw, and .return methods.
			generator._invoke = makeInvokeMethod(innerFn, self, context);
	
			return generator;
		}
		runtime.wrap = wrap;
	
		// Try/catch helper to minimize deoptimizations. Returns a completion
		// record like context.tryEntries[i].completion. This interface could
		// have been (and was previously) designed to take a closure to be
		// invoked without arguments, but in all the cases we care about we
		// already have an existing method we want to call, so there's no need
		// to create a new function object. We can even get away with assuming
		// the method takes exactly one argument, since that happens to be true
		// in every case, so we don't have to touch the arguments object. The
		// only additional allocation required is the completion record, which
		// has a stable shape and so hopefully should be cheap to allocate.
		function tryCatch(fn, obj, arg) {
			try {
				return { type: "normal", arg: fn.call(obj, arg) };
			} catch (err) {
				return { type: "throw", arg: err };
			}
		}
	
		var GenStateSuspendedStart = "suspendedStart";
		var GenStateSuspendedYield = "suspendedYield";
		var GenStateExecuting = "executing";
		var GenStateCompleted = "completed";
	
		// Returning this object from the innerFn has the same effect as
		// breaking out of the dispatch switch statement.
		var ContinueSentinel = {};
	
		// Dummy constructor functions that we use as the .constructor and
		// .constructor.prototype properties for functions that return Generator
		// objects. For full spec compliance, you may wish to configure your
		// minifier not to mangle the names of these two functions.
		function Generator() {}
		function GeneratorFunction() {}
		function GeneratorFunctionPrototype() {}
	
		// This is a polyfill for %IteratorPrototype% for environments that
		// don't natively support it.
		var IteratorPrototype = {};
		IteratorPrototype[iteratorSymbol] = function () {
			return this;
		};
	
		var getProto = Object.getPrototypeOf;
		var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
		if (NativeIteratorPrototype &&
				NativeIteratorPrototype !== Op &&
				hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
			// This environment has a native %IteratorPrototype%; use it instead
			// of the polyfill.
			IteratorPrototype = NativeIteratorPrototype;
		}
	
		var Gp = GeneratorFunctionPrototype.prototype =
			Generator.prototype = Object.create(IteratorPrototype);
		GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
		GeneratorFunctionPrototype.constructor = GeneratorFunction;
		GeneratorFunctionPrototype[toStringTagSymbol] =
			GeneratorFunction.displayName = "GeneratorFunction";
	
		// Helper for defining the .next, .throw, and .return methods of the
		// Iterator interface in terms of a single ._invoke method.
		function defineIteratorMethods(prototype) {
			["next", "throw", "return"].forEach(function(method) {
				prototype[method] = function(arg) {
					return this._invoke(method, arg);
				};
			});
		}
	
		runtime.isGeneratorFunction = function(genFun) {
			var ctor = typeof genFun === "function" && genFun.constructor;
			return ctor
				? ctor === GeneratorFunction ||
					// For the native GeneratorFunction constructor, the best we can
					// do is to check its .name property.
					(ctor.displayName || ctor.name) === "GeneratorFunction"
				: false;
		};
	
		runtime.mark = function(genFun) {
			if (Object.setPrototypeOf) {
				Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
			} else {
				genFun.__proto__ = GeneratorFunctionPrototype;
				if (!(toStringTagSymbol in genFun)) {
					genFun[toStringTagSymbol] = "GeneratorFunction";
				}
			}
			genFun.prototype = Object.create(Gp);
			return genFun;
		};
	
		// Within the body of any async function, `await x` is transformed to
		// `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
		// `hasOwn.call(value, "__await")` to determine if the yielded value is
		// meant to be awaited.
		runtime.awrap = function(arg) {
			return { __await: arg };
		};
	
		function AsyncIterator(generator) {
			function invoke(method, arg, resolve, reject) {
				var record = tryCatch(generator[method], generator, arg);
				if (record.type === "throw") {
					reject(record.arg);
				} else {
					var result = record.arg;
					var value = result.value;
					if (value &&
							typeof value === "object" &&
							hasOwn.call(value, "__await")) {
						return Promise.resolve(value.__await).then(function(value) {
							invoke("next", value, resolve, reject);
						}, function(err) {
							invoke("throw", err, resolve, reject);
						});
					}
	
					return Promise.resolve(value).then(function(unwrapped) {
						// When a yielded Promise is resolved, its final value becomes
						// the .value of the Promise<{value,done}> result for the
						// current iteration. If the Promise is rejected, however, the
						// result for this iteration will be rejected with the same
						// reason. Note that rejections of yielded Promises are not
						// thrown back into the generator function, as is the case
						// when an awaited Promise is rejected. This difference in
						// behavior between yield and await is important, because it
						// allows the consumer to decide what to do with the yielded
						// rejection (swallow it and continue, manually .throw it back
						// into the generator, abandon iteration, whatever). With
						// await, by contrast, there is no opportunity to examine the
						// rejection reason outside the generator function, so the
						// only option is to throw it from the await expression, and
						// let the generator function handle the exception.
						result.value = unwrapped;
						resolve(result);
					}, reject);
				}
			}
	
			if (typeof global.process === "object" && global.process.domain) {
				invoke = global.process.domain.bind(invoke);
			}
	
			var previousPromise;
	
			function enqueue(method, arg) {
				function callInvokeWithMethodAndArg() {
					return new Promise(function(resolve, reject) {
						invoke(method, arg, resolve, reject);
					});
				}
	
				return previousPromise =
					// If enqueue has been called before, then we want to wait until
					// all previous Promises have been resolved before calling invoke,
					// so that results are always delivered in the correct order. If
					// enqueue has not been called before, then it is important to
					// call invoke immediately, without waiting on a callback to fire,
					// so that the async generator function has the opportunity to do
					// any necessary setup in a predictable way. This predictability
					// is why the Promise constructor synchronously invokes its
					// executor callback, and why async functions synchronously
					// execute code before the first await. Since we implement simple
					// async functions in terms of async generators, it is especially
					// important to get this right, even though it requires care.
					previousPromise ? previousPromise.then(
						callInvokeWithMethodAndArg,
						// Avoid propagating failures to Promises returned by later
						// invocations of the iterator.
						callInvokeWithMethodAndArg
					) : callInvokeWithMethodAndArg();
			}
	
			// Define the unified helper method that is used to implement .next,
			// .throw, and .return (see defineIteratorMethods).
			this._invoke = enqueue;
		}
	
		defineIteratorMethods(AsyncIterator.prototype);
		AsyncIterator.prototype[asyncIteratorSymbol] = function () {
			return this;
		};
		runtime.AsyncIterator = AsyncIterator;
	
		// Note that simple async functions are implemented on top of
		// AsyncIterator objects; they just return a Promise for the value of
		// the final result produced by the iterator.
		runtime.async = function(innerFn, outerFn, self, tryLocsList) {
			var iter = new AsyncIterator(
				wrap(innerFn, outerFn, self, tryLocsList)
			);
	
			return runtime.isGeneratorFunction(outerFn)
				? iter // If outerFn is a generator, return the full iterator.
				: iter.next().then(function(result) {
						return result.done ? result.value : iter.next();
					});
		};
	
		function makeInvokeMethod(innerFn, self, context) {
			var state = GenStateSuspendedStart;
	
			return function invoke(method, arg) {
				if (state === GenStateExecuting) {
					throw new Error("Generator is already running");
				}
	
				if (state === GenStateCompleted) {
					if (method === "throw") {
						throw arg;
					}
	
					// Be forgiving, per 25.3.3.3.3 of the spec:
					// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
					return doneResult();
				}
	
				context.method = method;
				context.arg = arg;
	
				while (true) {
					var delegate = context.delegate;
					if (delegate) {
						var delegateResult = maybeInvokeDelegate(delegate, context);
						if (delegateResult) {
							if (delegateResult === ContinueSentinel) continue;
							return delegateResult;
						}
					}
	
					if (context.method === "next") {
						// Setting context._sent for legacy support of Babel's
						// function.sent implementation.
						context.sent = context._sent = context.arg;
	
					} else if (context.method === "throw") {
						if (state === GenStateSuspendedStart) {
							state = GenStateCompleted;
							throw context.arg;
						}
	
						context.dispatchException(context.arg);
	
					} else if (context.method === "return") {
						context.abrupt("return", context.arg);
					}
	
					state = GenStateExecuting;
	
					var record = tryCatch(innerFn, self, context);
					if (record.type === "normal") {
						// If an exception is thrown from innerFn, we leave state ===
						// GenStateExecuting and loop back for another invocation.
						state = context.done
							? GenStateCompleted
							: GenStateSuspendedYield;
	
						if (record.arg === ContinueSentinel) {
							continue;
						}
	
						return {
							value: record.arg,
							done: context.done
						};
	
					} else if (record.type === "throw") {
						state = GenStateCompleted;
						// Dispatch the exception by looping back around to the
						// context.dispatchException(context.arg) call above.
						context.method = "throw";
						context.arg = record.arg;
					}
				}
			};
		}
	
		// Call delegate.iterator[context.method](context.arg) and handle the
		// result, either by returning a { value, done } result from the
		// delegate iterator, or by modifying context.method and context.arg,
		// setting context.delegate to null, and returning the ContinueSentinel.
		function maybeInvokeDelegate(delegate, context) {
			var method = delegate.iterator[context.method];
			if (method === undefined) {
				// A .throw or .return when the delegate iterator has no .throw
				// method always terminates the yield* loop.
				context.delegate = null;
	
				if (context.method === "throw") {
					if (delegate.iterator.return) {
						// If the delegate iterator has a return method, give it a
						// chance to clean up.
						context.method = "return";
						context.arg = undefined;
						maybeInvokeDelegate(delegate, context);
	
						if (context.method === "throw") {
							// If maybeInvokeDelegate(context) changed context.method from
							// "return" to "throw", let that override the TypeError below.
							return ContinueSentinel;
						}
					}
	
					context.method = "throw";
					context.arg = new TypeError(
						"The iterator does not provide a 'throw' method");
				}
	
				return ContinueSentinel;
			}
	
			var record = tryCatch(method, delegate.iterator, context.arg);
	
			if (record.type === "throw") {
				context.method = "throw";
				context.arg = record.arg;
				context.delegate = null;
				return ContinueSentinel;
			}
	
			var info = record.arg;
	
			if (! info) {
				context.method = "throw";
				context.arg = new TypeError("iterator result is not an object");
				context.delegate = null;
				return ContinueSentinel;
			}
	
			if (info.done) {
				// Assign the result of the finished delegate to the temporary
				// variable specified by delegate.resultName (see delegateYield).
				context[delegate.resultName] = info.value;
	
				// Resume execution at the desired location (see delegateYield).
				context.next = delegate.nextLoc;
	
				// If context.method was "throw" but the delegate handled the
				// exception, let the outer generator proceed normally. If
				// context.method was "next", forget context.arg since it has been
				// "consumed" by the delegate iterator. If context.method was
				// "return", allow the original .return call to continue in the
				// outer generator.
				if (context.method !== "return") {
					context.method = "next";
					context.arg = undefined;
				}
	
			} else {
				// Re-yield the result returned by the delegate method.
				return info;
			}
	
			// The delegate iterator is finished, so forget it and continue with
			// the outer generator.
			context.delegate = null;
			return ContinueSentinel;
		}
	
		// Define Generator.prototype.{next,throw,return} in terms of the
		// unified ._invoke helper method.
		defineIteratorMethods(Gp);
	
		Gp[toStringTagSymbol] = "Generator";
	
		// A Generator should always return itself as the iterator object when the
		// @@iterator function is called on it. Some browsers' implementations of the
		// iterator prototype chain incorrectly implement this, causing the Generator
		// object to not be returned from this call. This ensures that doesn't happen.
		// See https://github.com/facebook/regenerator/issues/274 for more details.
		Gp[iteratorSymbol] = function() {
			return this;
		};
	
		Gp.toString = function() {
			return "[object Generator]";
		};
	
		function pushTryEntry(locs) {
			var entry = { tryLoc: locs[0] };
	
			if (1 in locs) {
				entry.catchLoc = locs[1];
			}
	
			if (2 in locs) {
				entry.finallyLoc = locs[2];
				entry.afterLoc = locs[3];
			}
	
			this.tryEntries.push(entry);
		}
	
		function resetTryEntry(entry) {
			var record = entry.completion || {};
			record.type = "normal";
			delete record.arg;
			entry.completion = record;
		}
	
		function Context(tryLocsList) {
			// The root entry object (effectively a try statement without a catch
			// or a finally block) gives us a place to store values thrown from
			// locations where there is no enclosing try statement.
			this.tryEntries = [{ tryLoc: "root" }];
			tryLocsList.forEach(pushTryEntry, this);
			this.reset(true);
		}
	
		runtime.keys = function(object) {
			var keys = [];
			for (var key in object) {
				keys.push(key);
			}
			keys.reverse();
	
			// Rather than returning an object with a next method, we keep
			// things simple and return the next function itself.
			return function next() {
				while (keys.length) {
					var key = keys.pop();
					if (key in object) {
						next.value = key;
						next.done = false;
						return next;
					}
				}
	
				// To avoid creating an additional object, we just hang the .value
				// and .done properties off the next function object itself. This
				// also ensures that the minifier will not anonymize the function.
				next.done = true;
				return next;
			};
		};
	
		function values(iterable) {
			if (iterable) {
				var iteratorMethod = iterable[iteratorSymbol];
				if (iteratorMethod) {
					return iteratorMethod.call(iterable);
				}
	
				if (typeof iterable.next === "function") {
					return iterable;
				}
	
				if (!isNaN(iterable.length)) {
					var i = -1, next = function next() {
						while (++i < iterable.length) {
							if (hasOwn.call(iterable, i)) {
								next.value = iterable[i];
								next.done = false;
								return next;
							}
						}
	
						next.value = undefined;
						next.done = true;
	
						return next;
					};
	
					return next.next = next;
				}
			}
	
			// Return an iterator with no values.
			return { next: doneResult };
		}
		runtime.values = values;
	
		function doneResult() {
			return { value: undefined, done: true };
		}
	
		Context.prototype = {
			constructor: Context,
	
			reset: function(skipTempReset) {
				this.prev = 0;
				this.next = 0;
				// Resetting context._sent for legacy support of Babel's
				// function.sent implementation.
				this.sent = this._sent = undefined;
				this.done = false;
				this.delegate = null;
	
				this.method = "next";
				this.arg = undefined;
	
				this.tryEntries.forEach(resetTryEntry);
	
				if (!skipTempReset) {
					for (var name in this) {
						// Not sure about the optimal order of these conditions:
						if (name.charAt(0) === "t" &&
								hasOwn.call(this, name) &&
								!isNaN(+name.slice(1))) {
							this[name] = undefined;
						}
					}
				}
			},
	
			stop: function() {
				this.done = true;
	
				var rootEntry = this.tryEntries[0];
				var rootRecord = rootEntry.completion;
				if (rootRecord.type === "throw") {
					throw rootRecord.arg;
				}
	
				return this.rval;
			},
	
			dispatchException: function(exception) {
				if (this.done) {
					throw exception;
				}
	
				var context = this;
				function handle(loc, caught) {
					record.type = "throw";
					record.arg = exception;
					context.next = loc;
	
					if (caught) {
						// If the dispatched exception was caught by a catch block,
						// then let that catch block handle the exception normally.
						context.method = "next";
						context.arg = undefined;
					}
	
					return !! caught;
				}
	
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					var record = entry.completion;
	
					if (entry.tryLoc === "root") {
						// Exception thrown outside of any try block that could handle
						// it, so set the completion value of the entire function to
						// throw the exception.
						return handle("end");
					}
	
					if (entry.tryLoc <= this.prev) {
						var hasCatch = hasOwn.call(entry, "catchLoc");
						var hasFinally = hasOwn.call(entry, "finallyLoc");
	
						if (hasCatch && hasFinally) {
							if (this.prev < entry.catchLoc) {
								return handle(entry.catchLoc, true);
							} else if (this.prev < entry.finallyLoc) {
								return handle(entry.finallyLoc);
							}
	
						} else if (hasCatch) {
							if (this.prev < entry.catchLoc) {
								return handle(entry.catchLoc, true);
							}
	
						} else if (hasFinally) {
							if (this.prev < entry.finallyLoc) {
								return handle(entry.finallyLoc);
							}
	
						} else {
							throw new Error("try statement without catch or finally");
						}
					}
				}
			},
	
			abrupt: function(type, arg) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc <= this.prev &&
							hasOwn.call(entry, "finallyLoc") &&
							this.prev < entry.finallyLoc) {
						var finallyEntry = entry;
						break;
					}
				}
	
				if (finallyEntry &&
						(type === "break" ||
						 type === "continue") &&
						finallyEntry.tryLoc <= arg &&
						arg <= finallyEntry.finallyLoc) {
					// Ignore the finally entry if control is not jumping to a
					// location outside the try/catch block.
					finallyEntry = null;
				}
	
				var record = finallyEntry ? finallyEntry.completion : {};
				record.type = type;
				record.arg = arg;
	
				if (finallyEntry) {
					this.method = "next";
					this.next = finallyEntry.finallyLoc;
					return ContinueSentinel;
				}
	
				return this.complete(record);
			},
	
			complete: function(record, afterLoc) {
				if (record.type === "throw") {
					throw record.arg;
				}
	
				if (record.type === "break" ||
						record.type === "continue") {
					this.next = record.arg;
				} else if (record.type === "return") {
					this.rval = this.arg = record.arg;
					this.method = "return";
					this.next = "end";
				} else if (record.type === "normal" && afterLoc) {
					this.next = afterLoc;
				}
	
				return ContinueSentinel;
			},
	
			finish: function(finallyLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.finallyLoc === finallyLoc) {
						this.complete(entry.completion, entry.afterLoc);
						resetTryEntry(entry);
						return ContinueSentinel;
					}
				}
			},
	
			"catch": function(tryLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc === tryLoc) {
						var record = entry.completion;
						if (record.type === "throw") {
							var thrown = record.arg;
							resetTryEntry(entry);
						}
						return thrown;
					}
				}
	
				// The context.catch method must only be called with a location
				// argument that corresponds to a known catch block.
				throw new Error("illegal catch attempt");
			},
	
			delegateYield: function(iterable, resultName, nextLoc) {
				this.delegate = {
					iterator: values(iterable),
					resultName: resultName,
					nextLoc: nextLoc
				};
	
				if (this.method === "next") {
					// Deliberately forget the last sent value so that we don't
					// accidentally pass it on to the delegate.
					this.arg = undefined;
				}
	
				return ContinueSentinel;
			}
		};
	})(
		// Among the various tricks for obtaining a reference to the global
		// object, this seems to be the most reliable technique that does not
		// use indirect eval (which violates Content Security Policy).
		typeof global === "object" ? global :
		typeof window === "object" ? window :
		typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))
	
	/***/ }),
	/* 133 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(140);
	module.exports = __webpack_require__(19).RegExp.escape;
	
	
	/***/ }),
	/* 134 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var isObject = __webpack_require__(4);
	var isArray = __webpack_require__(55);
	var SPECIES = __webpack_require__(5)('species');
	
	module.exports = function (original) {
		var C;
		if (isArray(original)) {
			C = original.constructor;
			// cross-realm fallback
			if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
			if (isObject(C)) {
				C = C[SPECIES];
				if (C === null) C = undefined;
			}
		} return C === undefined ? Array : C;
	};
	
	
	/***/ }),
	/* 135 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var fails = __webpack_require__(3);
	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;
	
	var lz = function (num) {
		return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	module.exports = (fails(function () {
		return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
		$toISOString.call(new Date(NaN));
	})) ? function toISOString() {
		if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
		var d = this;
		var y = d.getUTCFullYear();
		var m = d.getUTCMilliseconds();
		var s = y < 0 ? '-' : y > 9999 ? '+' : '';
		return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
			'-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
			'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
			':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;
	
	
	/***/ }),
	/* 136 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var anObject = __webpack_require__(1);
	var toPrimitive = __webpack_require__(26);
	var NUMBER = 'number';
	
	module.exports = function (hint) {
		if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
		return toPrimitive(anObject(this), hint != NUMBER);
	};
	
	
	/***/ }),
	/* 137 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(36);
	var gOPS = __webpack_require__(59);
	var pIE = __webpack_require__(49);
	module.exports = function (it) {
		var result = getKeys(it);
		var getSymbols = gOPS.f;
		if (getSymbols) {
			var symbols = getSymbols(it);
			var isEnum = pIE.f;
			var i = 0;
			var key;
			while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
		} return result;
	};
	
	
	/***/ }),
	/* 138 */
	/***/ (function(module, exports, __webpack_require__) {
	
	module.exports = __webpack_require__(50)('native-function-to-string', Function.toString);
	
	
	/***/ }),
	/* 139 */
	/***/ (function(module, exports) {
	
	module.exports = function (regExp, replace) {
		var replacer = replace === Object(replace) ? function (part) {
			return replace[part];
		} : replace;
		return function (it) {
			return String(it).replace(regExp, replacer);
		};
	};
	
	
	/***/ }),
	/* 140 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(0);
	var $re = __webpack_require__(139)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });
	
	
	/***/ }),
	/* 141 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(0);
	
	$export($export.P, 'Array', { copyWithin: __webpack_require__(95) });
	
	__webpack_require__(29)('copyWithin');
	
	
	/***/ }),
	/* 142 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $every = __webpack_require__(23)(4);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
		// 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
		every: function every(callbackfn /* , thisArg */) {
			return $every(this, callbackfn, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 143 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(0);
	
	$export($export.P, 'Array', { fill: __webpack_require__(67) });
	
	__webpack_require__(29)('fill');
	
	
	/***/ }),
	/* 144 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $filter = __webpack_require__(23)(2);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
		// 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
		filter: function filter(callbackfn /* , thisArg */) {
			return $filter(this, callbackfn, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 145 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(0);
	var $find = __webpack_require__(23)(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
		findIndex: function findIndex(callbackfn /* , that = undefined */) {
			return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		}
	});
	__webpack_require__(29)(KEY);
	
	
	/***/ }),
	/* 146 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(0);
	var $find = __webpack_require__(23)(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
		find: function find(callbackfn /* , that = undefined */) {
			return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		}
	});
	__webpack_require__(29)(KEY);
	
	
	/***/ }),
	/* 147 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $forEach = __webpack_require__(23)(0);
	var STRICT = __webpack_require__(21)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
		// 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
		forEach: function forEach(callbackfn /* , thisArg */) {
			return $forEach(this, callbackfn, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 148 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var ctx = __webpack_require__(20);
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var call = __webpack_require__(106);
	var isArrayIter = __webpack_require__(75);
	var toLength = __webpack_require__(6);
	var createProperty = __webpack_require__(69);
	var getIterFn = __webpack_require__(91);
	
	$export($export.S + $export.F * !__webpack_require__(57)(function (iter) { Array.from(iter); }), 'Array', {
		// 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
		from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
			var O = toObject(arrayLike);
			var C = typeof this == 'function' ? this : Array;
			var aLen = arguments.length;
			var mapfn = aLen > 1 ? arguments[1] : undefined;
			var mapping = mapfn !== undefined;
			var index = 0;
			var iterFn = getIterFn(O);
			var length, result, step, iterator;
			if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
			// if object isn't iterable or it's array with default iterator - use simple case
			if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
				for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
					createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
				}
			} else {
				length = toLength(O.length);
				for (result = new C(length); length > index; index++) {
					createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
				}
			}
			result.length = index;
			return result;
		}
	});
	
	
	/***/ }),
	/* 149 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $indexOf = __webpack_require__(52)(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
		// 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
		indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
			return NEGATIVE_ZERO
				// convert -0 to +0
				? $native.apply(this, arguments) || 0
				: $indexOf(this, searchElement, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 150 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Array', { isArray: __webpack_require__(55) });
	
	
	/***/ }),
	/* 151 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 22.1.3.13 Array.prototype.join(separator)
	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(17);
	var arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(48) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
		join: function join(separator) {
			return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
		}
	});
	
	
	/***/ }),
	/* 152 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(17);
	var toInteger = __webpack_require__(22);
	var toLength = __webpack_require__(6);
	var $native = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
		// 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
		lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
			// convert -0 to +0
			if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
			var O = toIObject(this);
			var length = toLength(O.length);
			var index = length - 1;
			if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
			if (index < 0) index = length + index;
			for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
			return -1;
		}
	});
	
	
	/***/ }),
	/* 153 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $map = __webpack_require__(23)(1);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
		// 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
		map: function map(callbackfn /* , thisArg */) {
			return $map(this, callbackfn, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 154 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var createProperty = __webpack_require__(69);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(3)(function () {
		function F() { /* empty */ }
		return !(Array.of.call(F) instanceof F);
	}), 'Array', {
		// 22.1.2.3 Array.of( ...items)
		of: function of(/* ...args */) {
			var index = 0;
			var aLen = arguments.length;
			var result = new (typeof this == 'function' ? this : Array)(aLen);
			while (aLen > index) createProperty(result, index, arguments[index++]);
			result.length = aLen;
			return result;
		}
	});
	
	
	/***/ }),
	/* 155 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $reduce = __webpack_require__(97);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
		// 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
		reduceRight: function reduceRight(callbackfn /* , initialValue */) {
			return $reduce(this, callbackfn, arguments.length, arguments[1], true);
		}
	});
	
	
	/***/ }),
	/* 156 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $reduce = __webpack_require__(97);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
		// 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
		reduce: function reduce(callbackfn /* , initialValue */) {
			return $reduce(this, callbackfn, arguments.length, arguments[1], false);
		}
	});
	
	
	/***/ }),
	/* 157 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var html = __webpack_require__(73);
	var cof = __webpack_require__(18);
	var toAbsoluteIndex = __webpack_require__(40);
	var toLength = __webpack_require__(6);
	var arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(3)(function () {
		if (html) arraySlice.call(html);
	}), 'Array', {
		slice: function slice(begin, end) {
			var len = toLength(this.length);
			var klass = cof(this);
			end = end === undefined ? len : end;
			if (klass == 'Array') return arraySlice.call(this, begin, end);
			var start = toAbsoluteIndex(begin, len);
			var upTo = toAbsoluteIndex(end, len);
			var size = toLength(upTo - start);
			var cloned = new Array(size);
			var i = 0;
			for (; i < size; i++) cloned[i] = klass == 'String'
				? this.charAt(start + i)
				: this[start + i];
			return cloned;
		}
	});
	
	
	/***/ }),
	/* 158 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $some = __webpack_require__(23)(3);
	
	$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
		// 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
		some: function some(callbackfn /* , thisArg */) {
			return $some(this, callbackfn, arguments[1]);
		}
	});
	
	
	/***/ }),
	/* 159 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var toObject = __webpack_require__(9);
	var fails = __webpack_require__(3);
	var $sort = [].sort;
	var test = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function () {
		// IE8-
		test.sort(undefined);
	}) || !fails(function () {
		// V8 bug
		test.sort(null);
		// Old WebKit
	}) || !__webpack_require__(21)($sort)), 'Array', {
		// 22.1.3.25 Array.prototype.sort(comparefn)
		sort: function sort(comparefn) {
			return comparefn === undefined
				? $sort.call(toObject(this))
				: $sort.call(toObject(this), aFunction(comparefn));
		}
	});
	
	
	/***/ }),
	/* 160 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(39)('Array');
	
	
	/***/ }),
	/* 161 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });
	
	
	/***/ }),
	/* 162 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(0);
	var toISOString = __webpack_require__(135);
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
		toISOString: toISOString
	});
	
	
	/***/ }),
	/* 163 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(26);
	
	$export($export.P + $export.F * __webpack_require__(3)(function () {
		return new Date(NaN).toJSON() !== null
			|| Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
		// eslint-disable-next-line no-unused-vars
		toJSON: function toJSON(key) {
			var O = toObject(this);
			var pv = toPrimitive(O);
			return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
		}
	});
	
	
	/***/ }),
	/* 164 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
	var proto = Date.prototype;
	
	if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(136));
	
	
	/***/ }),
	/* 165 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
		__webpack_require__(12)(DateProto, TO_STRING, function toString() {
			var value = getTime.call(this);
			// eslint-disable-next-line no-self-compare
			return value === value ? $toString.call(this) : INVALID_DATE;
		});
	}
	
	
	/***/ }),
	/* 166 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(0);
	
	$export($export.P, 'Function', { bind: __webpack_require__(98) });
	
	
	/***/ }),
	/* 167 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var isObject = __webpack_require__(4);
	var getPrototypeOf = __webpack_require__(16);
	var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
		if (typeof this != 'function' || !isObject(O)) return false;
		if (!isObject(this.prototype)) return O instanceof this;
		// for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
		while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
		return false;
	} });
	
	
	/***/ }),
	/* 168 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var dP = __webpack_require__(8).f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
		configurable: true,
		get: function () {
			try {
				return ('' + this).match(nameRE)[1];
			} catch (e) {
				return '';
			}
		}
	});
	
	
	/***/ }),
	/* 169 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(0);
	var log1p = __webpack_require__(109);
	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
		// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
		&& Math.floor($acosh(Number.MAX_VALUE)) == 710
		// Tor Browser bug: Math.acosh(Infinity) -> NaN
		&& $acosh(Infinity) == Infinity
	), 'Math', {
		acosh: function acosh(x) {
			return (x = +x) < 1 ? NaN : x > 94906265.62425156
				? Math.log(x) + Math.LN2
				: log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
		}
	});
	
	
	/***/ }),
	/* 170 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(0);
	var $asinh = Math.asinh;
	
	function asinh(x) {
		return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
	
	
	/***/ }),
	/* 171 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(0);
	var $atanh = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
		atanh: function atanh(x) {
			return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
		}
	});
	
	
	/***/ }),
	/* 172 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(0);
	var sign = __webpack_require__(79);
	
	$export($export.S, 'Math', {
		cbrt: function cbrt(x) {
			return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
		}
	});
	
	
	/***/ }),
	/* 173 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		clz32: function clz32(x) {
			return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
		}
	});
	
	
	/***/ }),
	/* 174 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(0);
	var exp = Math.exp;
	
	$export($export.S, 'Math', {
		cosh: function cosh(x) {
			return (exp(x = +x) + exp(-x)) / 2;
		}
	});
	
	
	/***/ }),
	/* 175 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(0);
	var $expm1 = __webpack_require__(78);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
	
	
	/***/ }),
	/* 176 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.16 Math.fround(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { fround: __webpack_require__(108) });
	
	
	/***/ }),
	/* 177 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(0);
	var abs = Math.abs;
	
	$export($export.S, 'Math', {
		hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
			var sum = 0;
			var i = 0;
			var aLen = arguments.length;
			var larg = 0;
			var arg, div;
			while (i < aLen) {
				arg = abs(arguments[i++]);
				if (larg < arg) {
					div = larg / arg;
					sum = sum * div * div + 1;
					larg = arg;
				} else if (arg > 0) {
					div = arg / larg;
					sum += div * div;
				} else sum += arg;
			}
			return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
		}
	});
	
	
	/***/ }),
	/* 178 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(0);
	var $imul = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(3)(function () {
		return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
		imul: function imul(x, y) {
			var UINT16 = 0xffff;
			var xn = +x;
			var yn = +y;
			var xl = UINT16 & xn;
			var yl = UINT16 & yn;
			return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
		}
	});
	
	
	/***/ }),
	/* 179 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		log10: function log10(x) {
			return Math.log(x) * Math.LOG10E;
		}
	});
	
	
	/***/ }),
	/* 180 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { log1p: __webpack_require__(109) });
	
	
	/***/ }),
	/* 181 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		log2: function log2(x) {
			return Math.log(x) / Math.LN2;
		}
	});
	
	
	/***/ }),
	/* 182 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { sign: __webpack_require__(79) });
	
	
	/***/ }),
	/* 183 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(0);
	var expm1 = __webpack_require__(78);
	var exp = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(3)(function () {
		return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
		sinh: function sinh(x) {
			return Math.abs(x = +x) < 1
				? (expm1(x) - expm1(-x)) / 2
				: (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
		}
	});
	
	
	/***/ }),
	/* 184 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(0);
	var expm1 = __webpack_require__(78);
	var exp = Math.exp;
	
	$export($export.S, 'Math', {
		tanh: function tanh(x) {
			var a = expm1(x = +x);
			var b = expm1(-x);
			return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
		}
	});
	
	
	/***/ }),
	/* 185 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		trunc: function trunc(it) {
			return (it > 0 ? Math.floor : Math.ceil)(it);
		}
	});
	
	
	/***/ }),
	/* 186 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var global = __webpack_require__(2);
	var has = __webpack_require__(14);
	var cof = __webpack_require__(18);
	var inheritIfRequired = __webpack_require__(74);
	var toPrimitive = __webpack_require__(26);
	var fails = __webpack_require__(3);
	var gOPN = __webpack_require__(35).f;
	var gOPD = __webpack_require__(15).f;
	var dP = __webpack_require__(8).f;
	var $trim = __webpack_require__(46).trim;
	var NUMBER = 'Number';
	var $Number = global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = cof(__webpack_require__(34)(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
		var it = toPrimitive(argument, false);
		if (typeof it == 'string' && it.length > 2) {
			it = TRIM ? it.trim() : $trim(it, 3);
			var first = it.charCodeAt(0);
			var third, radix, maxCode;
			if (first === 43 || first === 45) {
				third = it.charCodeAt(2);
				if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
			} else if (first === 48) {
				switch (it.charCodeAt(1)) {
					case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
					case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
					default: return +it;
				}
				for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
					code = digits.charCodeAt(i);
					// parseInt parses a string to a first unavailable symbol
					// but ToNumber should return NaN if a string contains unavailable symbols
					if (code < 48 || code > maxCode) return NaN;
				} return parseInt(digits, radix);
			}
		} return +it;
	};
	
	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
		$Number = function Number(value) {
			var it = arguments.length < 1 ? 0 : value;
			var that = this;
			return that instanceof $Number
				// check on 1..constructor(foo) case
				&& (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
					? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
		};
		for (var keys = __webpack_require__(7) ? gOPN(Base) : (
			// ES3:
			'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
			// ES6 (in case, if modules with ES6 Number statics required before):
			'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
			'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
		).split(','), j = 0, key; keys.length > j; j++) {
			if (has(Base, key = keys[j]) && !has($Number, key)) {
				dP($Number, key, gOPD(Base, key));
			}
		}
		$Number.prototype = proto;
		proto.constructor = $Number;
		__webpack_require__(12)(global, NUMBER, $Number);
	}
	
	
	/***/ }),
	/* 187 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
	
	
	/***/ }),
	/* 188 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.2 Number.isFinite(number)
	var $export = __webpack_require__(0);
	var _isFinite = __webpack_require__(2).isFinite;
	
	$export($export.S, 'Number', {
		isFinite: function isFinite(it) {
			return typeof it == 'number' && _isFinite(it);
		}
	});
	
	
	/***/ }),
	/* 189 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Number', { isInteger: __webpack_require__(105) });
	
	
	/***/ }),
	/* 190 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Number', {
		isNaN: function isNaN(number) {
			// eslint-disable-next-line no-self-compare
			return number != number;
		}
	});
	
	
	/***/ }),
	/* 191 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.5 Number.isSafeInteger(number)
	var $export = __webpack_require__(0);
	var isInteger = __webpack_require__(105);
	var abs = Math.abs;
	
	$export($export.S, 'Number', {
		isSafeInteger: function isSafeInteger(number) {
			return isInteger(number) && abs(number) <= 0x1fffffffffffff;
		}
	});
	
	
	/***/ }),
	/* 192 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
	
	
	/***/ }),
	/* 193 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
	
	
	/***/ }),
	/* 194 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var $parseFloat = __webpack_require__(117);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
	
	
	/***/ }),
	/* 195 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var $parseInt = __webpack_require__(118);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
	
	
	/***/ }),
	/* 196 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toInteger = __webpack_require__(22);
	var aNumberValue = __webpack_require__(94);
	var repeat = __webpack_require__(86);
	var $toFixed = 1.0.toFixed;
	var floor = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';
	
	var multiply = function (n, c) {
		var i = -1;
		var c2 = c;
		while (++i < 6) {
			c2 += n * data[i];
			data[i] = c2 % 1e7;
			c2 = floor(c2 / 1e7);
		}
	};
	var divide = function (n) {
		var i = 6;
		var c = 0;
		while (--i >= 0) {
			c += data[i];
			data[i] = floor(c / n);
			c = (c % n) * 1e7;
		}
	};
	var numToString = function () {
		var i = 6;
		var s = '';
		while (--i >= 0) {
			if (s !== '' || i === 0 || data[i] !== 0) {
				var t = String(data[i]);
				s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
			}
		} return s;
	};
	var pow = function (x, n, acc) {
		return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
		var n = 0;
		var x2 = x;
		while (x2 >= 4096) {
			n += 12;
			x2 /= 4096;
		}
		while (x2 >= 2) {
			n += 1;
			x2 /= 2;
		} return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
		0.00008.toFixed(3) !== '0.000' ||
		0.9.toFixed(0) !== '1' ||
		1.255.toFixed(2) !== '1.25' ||
		1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(3)(function () {
		// V8 ~ Android 4.3-
		$toFixed.call({});
	})), 'Number', {
		toFixed: function toFixed(fractionDigits) {
			var x = aNumberValue(this, ERROR);
			var f = toInteger(fractionDigits);
			var s = '';
			var m = ZERO;
			var e, z, j, k;
			if (f < 0 || f > 20) throw RangeError(ERROR);
			// eslint-disable-next-line no-self-compare
			if (x != x) return 'NaN';
			if (x <= -1e21 || x >= 1e21) return String(x);
			if (x < 0) {
				s = '-';
				x = -x;
			}
			if (x > 1e-21) {
				e = log(x * pow(2, 69, 1)) - 69;
				z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
				z *= 0x10000000000000;
				e = 52 - e;
				if (e > 0) {
					multiply(0, z);
					j = f;
					while (j >= 7) {
						multiply(1e7, 0);
						j -= 7;
					}
					multiply(pow(10, j, 1), 0);
					j = e - 1;
					while (j >= 23) {
						divide(1 << 23);
						j -= 23;
					}
					divide(1 << j);
					multiply(1, 1);
					divide(2);
					m = numToString();
				} else {
					multiply(0, z);
					multiply(1 << -e, 0);
					m = numToString() + repeat.call(ZERO, f);
				}
			}
			if (f > 0) {
				k = m.length;
				m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
			} else {
				m = s + m;
			} return m;
		}
	});
	
	
	/***/ }),
	/* 197 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $fails = __webpack_require__(3);
	var aNumberValue = __webpack_require__(94);
	var $toPrecision = 1.0.toPrecision;
	
	$export($export.P + $export.F * ($fails(function () {
		// IE7-
		return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
		// V8 ~ Android 4.3-
		$toPrecision.call({});
	})), 'Number', {
		toPrecision: function toPrecision(precision) {
			var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
			return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
		}
	});
	
	
	/***/ }),
	/* 198 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(0);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(111) });
	
	
	/***/ }),
	/* 199 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(34) });
	
	
	/***/ }),
	/* 200 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(112) });
	
	
	/***/ }),
	/* 201 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });
	
	
	/***/ }),
	/* 202 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(31).onFreeze;
	
	__webpack_require__(25)('freeze', function ($freeze) {
		return function freeze(it) {
			return $freeze && isObject(it) ? $freeze(meta(it)) : it;
		};
	});
	
	
	/***/ }),
	/* 203 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(17);
	var $getOwnPropertyDescriptor = __webpack_require__(15).f;
	
	__webpack_require__(25)('getOwnPropertyDescriptor', function () {
		return function getOwnPropertyDescriptor(it, key) {
			return $getOwnPropertyDescriptor(toIObject(it), key);
		};
	});
	
	
	/***/ }),
	/* 204 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(25)('getOwnPropertyNames', function () {
		return __webpack_require__(113).f;
	});
	
	
	/***/ }),
	/* 205 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(9);
	var $getPrototypeOf = __webpack_require__(16);
	
	__webpack_require__(25)('getPrototypeOf', function () {
		return function getPrototypeOf(it) {
			return $getPrototypeOf(toObject(it));
		};
	});
	
	
	/***/ }),
	/* 206 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(4);
	
	__webpack_require__(25)('isExtensible', function ($isExtensible) {
		return function isExtensible(it) {
			return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
		};
	});
	
	
	/***/ }),
	/* 207 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(4);
	
	__webpack_require__(25)('isFrozen', function ($isFrozen) {
		return function isFrozen(it) {
			return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
		};
	});
	
	
	/***/ }),
	/* 208 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(4);
	
	__webpack_require__(25)('isSealed', function ($isSealed) {
		return function isSealed(it) {
			return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
		};
	});
	
	
	/***/ }),
	/* 209 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(0);
	$export($export.S, 'Object', { is: __webpack_require__(121) });
	
	
	/***/ }),
	/* 210 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(9);
	var $keys = __webpack_require__(36);
	
	__webpack_require__(25)('keys', function () {
		return function keys(it) {
			return $keys(toObject(it));
		};
	});
	
	
	/***/ }),
	/* 211 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(31).onFreeze;
	
	__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
		return function preventExtensions(it) {
			return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
		};
	});
	
	
	/***/ }),
	/* 212 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(31).onFreeze;
	
	__webpack_require__(25)('seal', function ($seal) {
		return function seal(it) {
			return $seal && isObject(it) ? $seal(meta(it)) : it;
		};
	});
	
	
	/***/ }),
	/* 213 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(0);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(83).set });
	
	
	/***/ }),
	/* 214 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(43);
	var test = {};
	test[__webpack_require__(5)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
		__webpack_require__(12)(Object.prototype, 'toString', function toString() {
			return '[object ' + classof(this) + ']';
		}, true);
	}
	
	
	/***/ }),
	/* 215 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var $parseFloat = __webpack_require__(117);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
	
	
	/***/ }),
	/* 216 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var $parseInt = __webpack_require__(118);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
	
	
	/***/ }),
	/* 217 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var LIBRARY = __webpack_require__(30);
	var global = __webpack_require__(2);
	var ctx = __webpack_require__(20);
	var classof = __webpack_require__(43);
	var $export = __webpack_require__(0);
	var isObject = __webpack_require__(4);
	var aFunction = __webpack_require__(10);
	var anInstance = __webpack_require__(32);
	var forOf = __webpack_require__(33);
	var speciesConstructor = __webpack_require__(51);
	var task = __webpack_require__(88).set;
	var microtask = __webpack_require__(80)();
	var newPromiseCapabilityModule = __webpack_require__(81);
	var perform = __webpack_require__(119);
	var userAgent = __webpack_require__(65);
	var promiseResolve = __webpack_require__(120);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
	
	var USE_NATIVE = !!function () {
		try {
			// correct subclassing with @@species support
			var promise = $Promise.resolve(1);
			var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
				exec(empty, empty);
			};
			// unhandled rejections tracking support, NodeJS Promise without it fails @@species test
			return (isNode || typeof PromiseRejectionEvent == 'function')
				&& promise.then(empty) instanceof FakePromise
				// v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
				// https://bugs.chromium.org/p/chromium/issues/detail?id=830565
				// we can't detect it synchronously, so just check versions
				&& v8.indexOf('6.6') !== 0
				&& userAgent.indexOf('Chrome/66') === -1;
		} catch (e) { /* empty */ }
	}();
	
	// helpers
	var isThenable = function (it) {
		var then;
		return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
		if (promise._n) return;
		promise._n = true;
		var chain = promise._c;
		microtask(function () {
			var value = promise._v;
			var ok = promise._s == 1;
			var i = 0;
			var run = function (reaction) {
				var handler = ok ? reaction.ok : reaction.fail;
				var resolve = reaction.resolve;
				var reject = reaction.reject;
				var domain = reaction.domain;
				var result, then, exited;
				try {
					if (handler) {
						if (!ok) {
							if (promise._h == 2) onHandleUnhandled(promise);
							promise._h = 1;
						}
						if (handler === true) result = value;
						else {
							if (domain) domain.enter();
							result = handler(value); // may throw
							if (domain) {
								domain.exit();
								exited = true;
							}
						}
						if (result === reaction.promise) {
							reject(TypeError('Promise-chain cycle'));
						} else if (then = isThenable(result)) {
							then.call(result, resolve, reject);
						} else resolve(result);
					} else reject(value);
				} catch (e) {
					if (domain && !exited) domain.exit();
					reject(e);
				}
			};
			while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
			promise._c = [];
			promise._n = false;
			if (isReject && !promise._h) onUnhandled(promise);
		});
	};
	var onUnhandled = function (promise) {
		task.call(global, function () {
			var value = promise._v;
			var unhandled = isUnhandled(promise);
			var result, handler, console;
			if (unhandled) {
				result = perform(function () {
					if (isNode) {
						process.emit('unhandledRejection', value, promise);
					} else if (handler = global.onunhandledrejection) {
						handler({ promise: promise, reason: value });
					} else if ((console = global.console) && console.error) {
						console.error('Unhandled promise rejection', value);
					}
				});
				// Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
				promise._h = isNode || isUnhandled(promise) ? 2 : 1;
			} promise._a = undefined;
			if (unhandled && result.e) throw result.v;
		});
	};
	var isUnhandled = function (promise) {
		return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
		task.call(global, function () {
			var handler;
			if (isNode) {
				process.emit('rejectionHandled', promise);
			} else if (handler = global.onrejectionhandled) {
				handler({ promise: promise, reason: promise._v });
			}
		});
	};
	var $reject = function (value) {
		var promise = this;
		if (promise._d) return;
		promise._d = true;
		promise = promise._w || promise; // unwrap
		promise._v = value;
		promise._s = 2;
		if (!promise._a) promise._a = promise._c.slice();
		notify(promise, true);
	};
	var $resolve = function (value) {
		var promise = this;
		var then;
		if (promise._d) return;
		promise._d = true;
		promise = promise._w || promise; // unwrap
		try {
			if (promise === value) throw TypeError("Promise can't be resolved itself");
			if (then = isThenable(value)) {
				microtask(function () {
					var wrapper = { _w: promise, _d: false }; // wrap
					try {
						then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
					} catch (e) {
						$reject.call(wrapper, e);
					}
				});
			} else {
				promise._v = value;
				promise._s = 1;
				notify(promise, false);
			}
		} catch (e) {
			$reject.call({ _w: promise, _d: false }, e); // wrap
		}
	};
	
	// constructor polyfill
	if (!USE_NATIVE) {
		// 25.4.3.1 Promise(executor)
		$Promise = function Promise(executor) {
			anInstance(this, $Promise, PROMISE, '_h');
			aFunction(executor);
			Internal.call(this);
			try {
				executor(ctx($resolve, this, 1), ctx($reject, this, 1));
			} catch (err) {
				$reject.call(this, err);
			}
		};
		// eslint-disable-next-line no-unused-vars
		Internal = function Promise(executor) {
			this._c = [];             // <- awaiting reactions
			this._a = undefined;      // <- checked in isUnhandled reactions
			this._s = 0;              // <- state
			this._d = false;          // <- done
			this._v = undefined;      // <- value
			this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
			this._n = false;          // <- notify
		};
		Internal.prototype = __webpack_require__(38)($Promise.prototype, {
			// 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
			then: function then(onFulfilled, onRejected) {
				var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
				reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
				reaction.fail = typeof onRejected == 'function' && onRejected;
				reaction.domain = isNode ? process.domain : undefined;
				this._c.push(reaction);
				if (this._a) this._a.push(reaction);
				if (this._s) notify(this, false);
				return reaction.promise;
			},
			// 25.4.5.1 Promise.prototype.catch(onRejected)
			'catch': function (onRejected) {
				return this.then(undefined, onRejected);
			}
		});
		OwnPromiseCapability = function () {
			var promise = new Internal();
			this.promise = promise;
			this.resolve = ctx($resolve, promise, 1);
			this.reject = ctx($reject, promise, 1);
		};
		newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
			return C === $Promise || C === Wrapper
				? new OwnPromiseCapability(C)
				: newGenericPromiseCapability(C);
		};
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(45)($Promise, PROMISE);
	__webpack_require__(39)(PROMISE);
	Wrapper = __webpack_require__(19)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
		// 25.4.4.5 Promise.reject(r)
		reject: function reject(r) {
			var capability = newPromiseCapability(this);
			var $$reject = capability.reject;
			$$reject(r);
			return capability.promise;
		}
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
		// 25.4.4.6 Promise.resolve(x)
		resolve: function resolve(x) {
			return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
		}
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
		$Promise.all(iter)['catch'](empty);
	})), PROMISE, {
		// 25.4.4.1 Promise.all(iterable)
		all: function all(iterable) {
			var C = this;
			var capability = newPromiseCapability(C);
			var resolve = capability.resolve;
			var reject = capability.reject;
			var result = perform(function () {
				var values = [];
				var index = 0;
				var remaining = 1;
				forOf(iterable, false, function (promise) {
					var $index = index++;
					var alreadyCalled = false;
					values.push(undefined);
					remaining++;
					C.resolve(promise).then(function (value) {
						if (alreadyCalled) return;
						alreadyCalled = true;
						values[$index] = value;
						--remaining || resolve(values);
					}, reject);
				});
				--remaining || resolve(values);
			});
			if (result.e) reject(result.v);
			return capability.promise;
		},
		// 25.4.4.4 Promise.race(iterable)
		race: function race(iterable) {
			var C = this;
			var capability = newPromiseCapability(C);
			var reject = capability.reject;
			var result = perform(function () {
				forOf(iterable, false, function (promise) {
					C.resolve(promise).then(capability.resolve, reject);
				});
			});
			if (result.e) reject(result.v);
			return capability.promise;
		}
	});
	
	
	/***/ }),
	/* 218 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var rApply = (__webpack_require__(2).Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(3)(function () {
		rApply(function () { /* empty */ });
	}), 'Reflect', {
		apply: function apply(target, thisArgument, argumentsList) {
			var T = aFunction(target);
			var L = anObject(argumentsList);
			return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
		}
	});
	
	
	/***/ }),
	/* 219 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export = __webpack_require__(0);
	var create = __webpack_require__(34);
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var fails = __webpack_require__(3);
	var bind = __webpack_require__(98);
	var rConstruct = (__webpack_require__(2).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
		function F() { /* empty */ }
		return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
		rConstruct(function () { /* empty */ });
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
		construct: function construct(Target, args /* , newTarget */) {
			aFunction(Target);
			anObject(args);
			var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
			if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
			if (Target == newTarget) {
				// w/o altered newTarget, optimization for 0-4 arguments
				switch (args.length) {
					case 0: return new Target();
					case 1: return new Target(args[0]);
					case 2: return new Target(args[0], args[1]);
					case 3: return new Target(args[0], args[1], args[2]);
					case 4: return new Target(args[0], args[1], args[2], args[3]);
				}
				// w/o altered newTarget, lot of arguments case
				var $args = [null];
				$args.push.apply($args, args);
				return new (bind.apply(Target, $args))();
			}
			// with altered newTarget, not support built-in constructors
			var proto = newTarget.prototype;
			var instance = create(isObject(proto) ? proto : Object.prototype);
			var result = Function.apply.call(Target, instance, args);
			return isObject(result) ? result : instance;
		}
	});
	
	
	/***/ }),
	/* 220 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP = __webpack_require__(8);
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var toPrimitive = __webpack_require__(26);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(3)(function () {
		// eslint-disable-next-line no-undef
		Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
		defineProperty: function defineProperty(target, propertyKey, attributes) {
			anObject(target);
			propertyKey = toPrimitive(propertyKey, true);
			anObject(attributes);
			try {
				dP.f(target, propertyKey, attributes);
				return true;
			} catch (e) {
				return false;
			}
		}
	});
	
	
	/***/ }),
	/* 221 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export = __webpack_require__(0);
	var gOPD = __webpack_require__(15).f;
	var anObject = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {
		deleteProperty: function deleteProperty(target, propertyKey) {
			var desc = gOPD(anObject(target), propertyKey);
			return desc && !desc.configurable ? false : delete target[propertyKey];
		}
	});
	
	
	/***/ }),
	/* 222 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 26.1.5 Reflect.enumerate(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var Enumerate = function (iterated) {
		this._t = anObject(iterated); // target
		this._i = 0;                  // next index
		var keys = this._k = [];      // keys
		var key;
		for (key in iterated) keys.push(key);
	};
	__webpack_require__(76)(Enumerate, 'Object', function () {
		var that = this;
		var keys = that._k;
		var key;
		do {
			if (that._i >= keys.length) return { value: undefined, done: true };
		} while (!((key = keys[that._i++]) in that._t));
		return { value: key, done: false };
	});
	
	$export($export.S, 'Reflect', {
		enumerate: function enumerate(target) {
			return new Enumerate(target);
		}
	});
	
	
	/***/ }),
	/* 223 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD = __webpack_require__(15);
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {
		getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
			return gOPD.f(anObject(target), propertyKey);
		}
	});
	
	
	/***/ }),
	/* 224 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export = __webpack_require__(0);
	var getProto = __webpack_require__(16);
	var anObject = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {
		getPrototypeOf: function getPrototypeOf(target) {
			return getProto(anObject(target));
		}
	});
	
	
	/***/ }),
	/* 225 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD = __webpack_require__(15);
	var getPrototypeOf = __webpack_require__(16);
	var has = __webpack_require__(14);
	var $export = __webpack_require__(0);
	var isObject = __webpack_require__(4);
	var anObject = __webpack_require__(1);
	
	function get(target, propertyKey /* , receiver */) {
		var receiver = arguments.length < 3 ? target : arguments[2];
		var desc, proto;
		if (anObject(target) === receiver) return target[propertyKey];
		if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
			? desc.value
			: desc.get !== undefined
				? desc.get.call(receiver)
				: undefined;
		if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', { get: get });
	
	
	/***/ }),
	/* 226 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Reflect', {
		has: function has(target, propertyKey) {
			return propertyKey in target;
		}
	});
	
	
	/***/ }),
	/* 227 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.10 Reflect.isExtensible(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
		isExtensible: function isExtensible(target) {
			anObject(target);
			return $isExtensible ? $isExtensible(target) : true;
		}
	});
	
	
	/***/ }),
	/* 228 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Reflect', { ownKeys: __webpack_require__(116) });
	
	
	/***/ }),
	/* 229 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.12 Reflect.preventExtensions(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
		preventExtensions: function preventExtensions(target) {
			anObject(target);
			try {
				if ($preventExtensions) $preventExtensions(target);
				return true;
			} catch (e) {
				return false;
			}
		}
	});
	
	
	/***/ }),
	/* 230 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export = __webpack_require__(0);
	var setProto = __webpack_require__(83);
	
	if (setProto) $export($export.S, 'Reflect', {
		setPrototypeOf: function setPrototypeOf(target, proto) {
			setProto.check(target, proto);
			try {
				setProto.set(target, proto);
				return true;
			} catch (e) {
				return false;
			}
		}
	});
	
	
	/***/ }),
	/* 231 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = __webpack_require__(8);
	var gOPD = __webpack_require__(15);
	var getPrototypeOf = __webpack_require__(16);
	var has = __webpack_require__(14);
	var $export = __webpack_require__(0);
	var createDesc = __webpack_require__(37);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	
	function set(target, propertyKey, V /* , receiver */) {
		var receiver = arguments.length < 4 ? target : arguments[3];
		var ownDesc = gOPD.f(anObject(target), propertyKey);
		var existingDescriptor, proto;
		if (!ownDesc) {
			if (isObject(proto = getPrototypeOf(target))) {
				return set(proto, propertyKey, V, receiver);
			}
			ownDesc = createDesc(0);
		}
		if (has(ownDesc, 'value')) {
			if (ownDesc.writable === false || !isObject(receiver)) return false;
			if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
				if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
				existingDescriptor.value = V;
				dP.f(receiver, propertyKey, existingDescriptor);
			} else dP.f(receiver, propertyKey, createDesc(0, V));
			return true;
		}
		return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', { set: set });
	
	
	/***/ }),
	/* 232 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var global = __webpack_require__(2);
	var inheritIfRequired = __webpack_require__(74);
	var dP = __webpack_require__(8).f;
	var gOPN = __webpack_require__(35).f;
	var isRegExp = __webpack_require__(56);
	var $flags = __webpack_require__(47);
	var $RegExp = global.RegExp;
	var Base = $RegExp;
	var proto = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;
	
	if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
		re2[__webpack_require__(5)('match')] = false;
		// RegExp constructor can alter flags and IsRegExp works correct with @@match
		return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
		$RegExp = function RegExp(p, f) {
			var tiRE = this instanceof $RegExp;
			var piRE = isRegExp(p);
			var fiU = f === undefined;
			return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
				: inheritIfRequired(CORRECT_NEW
					? new Base(piRE && !fiU ? p.source : p, f)
					: Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
				, tiRE ? this : proto, $RegExp);
		};
		var proxy = function (key) {
			key in $RegExp || dP($RegExp, key, {
				configurable: true,
				get: function () { return Base[key]; },
				set: function (it) { Base[key] = it; }
			});
		};
		for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
		proto.constructor = $RegExp;
		$RegExp.prototype = proto;
		__webpack_require__(12)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(39)('RegExp');
	
	
	/***/ }),
	/* 233 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var anObject = __webpack_require__(1);
	var toLength = __webpack_require__(6);
	var advanceStringIndex = __webpack_require__(66);
	var regExpExec = __webpack_require__(60);
	
	// @@match logic
	__webpack_require__(54)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
		return [
			// `String.prototype.match` method
			// https://tc39.github.io/ecma262/#sec-string.prototype.match
			function match(regexp) {
				var O = defined(this);
				var fn = regexp == undefined ? undefined : regexp[MATCH];
				return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
			},
			// `RegExp.prototype[@@match]` method
			// https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
			function (regexp) {
				var res = maybeCallNative($match, regexp, this);
				if (res.done) return res.value;
				var rx = anObject(regexp);
				var S = String(this);
				if (!rx.global) return regExpExec(rx, S);
				var fullUnicode = rx.unicode;
				rx.lastIndex = 0;
				var A = [];
				var n = 0;
				var result;
				while ((result = regExpExec(rx, S)) !== null) {
					var matchStr = String(result[0]);
					A[n] = matchStr;
					if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
					n++;
				}
				return n === 0 ? null : A;
			}
		];
	});
	
	
	/***/ }),
	/* 234 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var anObject = __webpack_require__(1);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(6);
	var toInteger = __webpack_require__(22);
	var advanceStringIndex = __webpack_require__(66);
	var regExpExec = __webpack_require__(60);
	var max = Math.max;
	var min = Math.min;
	var floor = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
	
	var maybeToString = function (it) {
		return it === undefined ? it : String(it);
	};
	
	// @@replace logic
	__webpack_require__(54)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
		return [
			// `String.prototype.replace` method
			// https://tc39.github.io/ecma262/#sec-string.prototype.replace
			function replace(searchValue, replaceValue) {
				var O = defined(this);
				var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
				return fn !== undefined
					? fn.call(searchValue, O, replaceValue)
					: $replace.call(String(O), searchValue, replaceValue);
			},
			// `RegExp.prototype[@@replace]` method
			// https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
			function (regexp, replaceValue) {
				var res = maybeCallNative($replace, regexp, this, replaceValue);
				if (res.done) return res.value;
	
				var rx = anObject(regexp);
				var S = String(this);
				var functionalReplace = typeof replaceValue === 'function';
				if (!functionalReplace) replaceValue = String(replaceValue);
				var global = rx.global;
				if (global) {
					var fullUnicode = rx.unicode;
					rx.lastIndex = 0;
				}
				var results = [];
				while (true) {
					var result = regExpExec(rx, S);
					if (result === null) break;
					results.push(result);
					if (!global) break;
					var matchStr = String(result[0]);
					if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
				}
				var accumulatedResult = '';
				var nextSourcePosition = 0;
				for (var i = 0; i < results.length; i++) {
					result = results[i];
					var matched = String(result[0]);
					var position = max(min(toInteger(result.index), S.length), 0);
					var captures = [];
					// NOTE: This is equivalent to
					//   captures = result.slice(1).map(maybeToString)
					// but for some reason `nativeSlice.call(result, 1, result.length)` (called in
					// the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
					// causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
					for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
					var namedCaptures = result.groups;
					if (functionalReplace) {
						var replacerArgs = [matched].concat(captures, position, S);
						if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
						var replacement = String(replaceValue.apply(undefined, replacerArgs));
					} else {
						replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
					}
					if (position >= nextSourcePosition) {
						accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
						nextSourcePosition = position + matched.length;
					}
				}
				return accumulatedResult + S.slice(nextSourcePosition);
			}
		];
	
			// https://tc39.github.io/ecma262/#sec-getsubstitution
		function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
			var tailPos = position + matched.length;
			var m = captures.length;
			var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
			if (namedCaptures !== undefined) {
				namedCaptures = toObject(namedCaptures);
				symbols = SUBSTITUTION_SYMBOLS;
			}
			return $replace.call(replacement, symbols, function (match, ch) {
				var capture;
				switch (ch.charAt(0)) {
					case '$': return '$';
					case '&': return matched;
					case '`': return str.slice(0, position);
					case "'": return str.slice(tailPos);
					case '<':
						capture = namedCaptures[ch.slice(1, -1)];
						break;
					default: // \d\d?
						var n = +ch;
						if (n === 0) return match;
						if (n > m) {
							var f = floor(n / 10);
							if (f === 0) return match;
							if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
							return match;
						}
						capture = captures[n - 1];
				}
				return capture === undefined ? '' : capture;
			});
		}
	});
	
	
	/***/ }),
	/* 235 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var anObject = __webpack_require__(1);
	var sameValue = __webpack_require__(121);
	var regExpExec = __webpack_require__(60);
	
	// @@search logic
	__webpack_require__(54)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
		return [
			// `String.prototype.search` method
			// https://tc39.github.io/ecma262/#sec-string.prototype.search
			function search(regexp) {
				var O = defined(this);
				var fn = regexp == undefined ? undefined : regexp[SEARCH];
				return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
			},
			// `RegExp.prototype[@@search]` method
			// https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
			function (regexp) {
				var res = maybeCallNative($search, regexp, this);
				if (res.done) return res.value;
				var rx = anObject(regexp);
				var S = String(this);
				var previousLastIndex = rx.lastIndex;
				if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
				var result = regExpExec(rx, S);
				if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
				return result === null ? -1 : result.index;
			}
		];
	});
	
	
	/***/ }),
	/* 236 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	
	var isRegExp = __webpack_require__(56);
	var anObject = __webpack_require__(1);
	var speciesConstructor = __webpack_require__(51);
	var advanceStringIndex = __webpack_require__(66);
	var toLength = __webpack_require__(6);
	var callRegExpExec = __webpack_require__(60);
	var regexpExec = __webpack_require__(82);
	var fails = __webpack_require__(3);
	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;
	
	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });
	
	// @@split logic
	__webpack_require__(54)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
		var internalSplit;
		if (
			'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
			'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
			'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
			'.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
			'.'[$SPLIT](/()()/)[LENGTH] > 1 ||
			''[$SPLIT](/.?/)[LENGTH]
		) {
			// based on es5-shim implementation, need to rework it
			internalSplit = function (separator, limit) {
				var string = String(this);
				if (separator === undefined && limit === 0) return [];
				// If `separator` is not a regex, use native split
				if (!isRegExp(separator)) return $split.call(string, separator, limit);
				var output = [];
				var flags = (separator.ignoreCase ? 'i' : '') +
										(separator.multiline ? 'm' : '') +
										(separator.unicode ? 'u' : '') +
										(separator.sticky ? 'y' : '');
				var lastLastIndex = 0;
				var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
				// Make `global` and avoid `lastIndex` issues by working with a copy
				var separatorCopy = new RegExp(separator.source, flags + 'g');
				var match, lastIndex, lastLength;
				while (match = regexpExec.call(separatorCopy, string)) {
					lastIndex = separatorCopy[LAST_INDEX];
					if (lastIndex > lastLastIndex) {
						output.push(string.slice(lastLastIndex, match.index));
						if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
						lastLength = match[0][LENGTH];
						lastLastIndex = lastIndex;
						if (output[LENGTH] >= splitLimit) break;
					}
					if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
				}
				if (lastLastIndex === string[LENGTH]) {
					if (lastLength || !separatorCopy.test('')) output.push('');
				} else output.push(string.slice(lastLastIndex));
				return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
			};
		// Chakra, V8
		} else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
			internalSplit = function (separator, limit) {
				return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
			};
		} else {
			internalSplit = $split;
		}
	
		return [
			// `String.prototype.split` method
			// https://tc39.github.io/ecma262/#sec-string.prototype.split
			function split(separator, limit) {
				var O = defined(this);
				var splitter = separator == undefined ? undefined : separator[SPLIT];
				return splitter !== undefined
					? splitter.call(separator, O, limit)
					: internalSplit.call(String(O), separator, limit);
			},
			// `RegExp.prototype[@@split]` method
			// https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
			//
			// NOTE: This cannot be properly polyfilled in engines that don't support
			// the 'y' flag.
			function (regexp, limit) {
				var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
				if (res.done) return res.value;
	
				var rx = anObject(regexp);
				var S = String(this);
				var C = speciesConstructor(rx, RegExp);
	
				var unicodeMatching = rx.unicode;
				var flags = (rx.ignoreCase ? 'i' : '') +
										(rx.multiline ? 'm' : '') +
										(rx.unicode ? 'u' : '') +
										(SUPPORTS_Y ? 'y' : 'g');
	
				// ^(? + rx + ) is needed, in combination with some S slicing, to
				// simulate the 'y' flag.
				var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
				var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
				if (lim === 0) return [];
				if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
				var p = 0;
				var q = 0;
				var A = [];
				while (q < S.length) {
					splitter.lastIndex = SUPPORTS_Y ? q : 0;
					var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
					var e;
					if (
						z === null ||
						(e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
					) {
						q = advanceStringIndex(S, q, unicodeMatching);
					} else {
						A.push(S.slice(p, q));
						if (A.length === lim) return A;
						for (var i = 1; i <= z.length - 1; i++) {
							A.push(z[i]);
							if (A.length === lim) return A;
						}
						q = p = e;
					}
				}
				A.push(S.slice(p));
				return A;
			}
		];
	});
	
	
	/***/ }),
	/* 237 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	__webpack_require__(127);
	var anObject = __webpack_require__(1);
	var $flags = __webpack_require__(47);
	var DESCRIPTORS = __webpack_require__(7);
	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];
	
	var define = function (fn) {
		__webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
		define(function toString() {
			var R = anObject(this);
			return '/'.concat(R.source, '/',
				'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
		});
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
		define(function toString() {
			return $toString.call(this);
		});
	}
	
	
	/***/ }),
	/* 238 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(13)('anchor', function (createHTML) {
		return function anchor(name) {
			return createHTML(this, 'a', 'name', name);
		};
	});
	
	
	/***/ }),
	/* 239 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.3 String.prototype.big()
	__webpack_require__(13)('big', function (createHTML) {
		return function big() {
			return createHTML(this, 'big', '', '');
		};
	});
	
	
	/***/ }),
	/* 240 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(13)('blink', function (createHTML) {
		return function blink() {
			return createHTML(this, 'blink', '', '');
		};
	});
	
	
	/***/ }),
	/* 241 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(13)('bold', function (createHTML) {
		return function bold() {
			return createHTML(this, 'b', '', '');
		};
	});
	
	
	/***/ }),
	/* 242 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $at = __webpack_require__(63)(false);
	$export($export.P, 'String', {
		// 21.1.3.3 String.prototype.codePointAt(pos)
		codePointAt: function codePointAt(pos) {
			return $at(this, pos);
		}
	});
	
	
	/***/ }),
	/* 243 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	
	var $export = __webpack_require__(0);
	var toLength = __webpack_require__(6);
	var context = __webpack_require__(85);
	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(72)(ENDS_WITH), 'String', {
		endsWith: function endsWith(searchString /* , endPosition = @length */) {
			var that = context(this, searchString, ENDS_WITH);
			var endPosition = arguments.length > 1 ? arguments[1] : undefined;
			var len = toLength(that.length);
			var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
			var search = String(searchString);
			return $endsWith
				? $endsWith.call(that, search, end)
				: that.slice(end - search.length, end) === search;
		}
	});
	
	
	/***/ }),
	/* 244 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(13)('fixed', function (createHTML) {
		return function fixed() {
			return createHTML(this, 'tt', '', '');
		};
	});
	
	
	/***/ }),
	/* 245 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(13)('fontcolor', function (createHTML) {
		return function fontcolor(color) {
			return createHTML(this, 'font', 'color', color);
		};
	});
	
	
	/***/ }),
	/* 246 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(13)('fontsize', function (createHTML) {
		return function fontsize(size) {
			return createHTML(this, 'font', 'size', size);
		};
	});
	
	
	/***/ }),
	/* 247 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var toAbsoluteIndex = __webpack_require__(40);
	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
		// 21.1.2.2 String.fromCodePoint(...codePoints)
		fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
			var res = [];
			var aLen = arguments.length;
			var i = 0;
			var code;
			while (aLen > i) {
				code = +arguments[i++];
				if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
				res.push(code < 0x10000
					? fromCharCode(code)
					: fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
				);
			} return res.join('');
		}
	});
	
	
	/***/ }),
	/* 248 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	
	var $export = __webpack_require__(0);
	var context = __webpack_require__(85);
	var INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(72)(INCLUDES), 'String', {
		includes: function includes(searchString /* , position = 0 */) {
			return !!~context(this, searchString, INCLUDES)
				.indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
		}
	});
	
	
	/***/ }),
	/* 249 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(13)('italics', function (createHTML) {
		return function italics() {
			return createHTML(this, 'i', '', '');
		};
	});
	
	
	/***/ }),
	/* 250 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $at = __webpack_require__(63)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(77)(String, 'String', function (iterated) {
		this._t = String(iterated); // target
		this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
		var O = this._t;
		var index = this._i;
		var point;
		if (index >= O.length) return { value: undefined, done: true };
		point = $at(O, index);
		this._i += point.length;
		return { value: point, done: false };
	});
	
	
	/***/ }),
	/* 251 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(13)('link', function (createHTML) {
		return function link(url) {
			return createHTML(this, 'a', 'href', url);
		};
	});
	
	
	/***/ }),
	/* 252 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(17);
	var toLength = __webpack_require__(6);
	
	$export($export.S, 'String', {
		// 21.1.2.4 String.raw(callSite, ...substitutions)
		raw: function raw(callSite) {
			var tpl = toIObject(callSite.raw);
			var len = toLength(tpl.length);
			var aLen = arguments.length;
			var res = [];
			var i = 0;
			while (len > i) {
				res.push(String(tpl[i++]));
				if (i < aLen) res.push(String(arguments[i]));
			} return res.join('');
		}
	});
	
	
	/***/ }),
	/* 253 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	
	$export($export.P, 'String', {
		// 21.1.3.13 String.prototype.repeat(count)
		repeat: __webpack_require__(86)
	});
	
	
	/***/ }),
	/* 254 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.11 String.prototype.small()
	__webpack_require__(13)('small', function (createHTML) {
		return function small() {
			return createHTML(this, 'small', '', '');
		};
	});
	
	
	/***/ }),
	/* 255 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	
	var $export = __webpack_require__(0);
	var toLength = __webpack_require__(6);
	var context = __webpack_require__(85);
	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(72)(STARTS_WITH), 'String', {
		startsWith: function startsWith(searchString /* , position = 0 */) {
			var that = context(this, searchString, STARTS_WITH);
			var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
			var search = String(searchString);
			return $startsWith
				? $startsWith.call(that, search, index)
				: that.slice(index, index + search.length) === search;
		}
	});
	
	
	/***/ }),
	/* 256 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(13)('strike', function (createHTML) {
		return function strike() {
			return createHTML(this, 'strike', '', '');
		};
	});
	
	
	/***/ }),
	/* 257 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(13)('sub', function (createHTML) {
		return function sub() {
			return createHTML(this, 'sub', '', '');
		};
	});
	
	
	/***/ }),
	/* 258 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(13)('sup', function (createHTML) {
		return function sup() {
			return createHTML(this, 'sup', '', '');
		};
	});
	
	
	/***/ }),
	/* 259 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(46)('trim', function ($trim) {
		return function trim() {
			return $trim(this, 3);
		};
	});
	
	
	/***/ }),
	/* 260 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(2);
	var has = __webpack_require__(14);
	var DESCRIPTORS = __webpack_require__(7);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(12);
	var META = __webpack_require__(31).KEY;
	var $fails = __webpack_require__(3);
	var shared = __webpack_require__(50);
	var setToStringTag = __webpack_require__(45);
	var uid = __webpack_require__(41);
	var wks = __webpack_require__(5);
	var wksExt = __webpack_require__(124);
	var wksDefine = __webpack_require__(90);
	var enumKeys = __webpack_require__(137);
	var isArray = __webpack_require__(55);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var toObject = __webpack_require__(9);
	var toIObject = __webpack_require__(17);
	var toPrimitive = __webpack_require__(26);
	var createDesc = __webpack_require__(37);
	var _create = __webpack_require__(34);
	var gOPNExt = __webpack_require__(113);
	var $GOPD = __webpack_require__(15);
	var $GOPS = __webpack_require__(59);
	var $DP = __webpack_require__(8);
	var $keys = __webpack_require__(36);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
		return _create(dP({}, 'a', {
			get: function () { return dP(this, 'a', { value: 7 }).a; }
		})).a != 7;
	}) ? function (it, key, D) {
		var protoDesc = gOPD(ObjectProto, key);
		if (protoDesc) delete ObjectProto[key];
		dP(it, key, D);
		if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function (tag) {
		var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
		sym._k = tag;
		return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
		return typeof it == 'symbol';
	} : function (it) {
		return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
		if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
		anObject(it);
		key = toPrimitive(key, true);
		anObject(D);
		if (has(AllSymbols, key)) {
			if (!D.enumerable) {
				if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
				it[HIDDEN][key] = true;
			} else {
				if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
				D = _create(D, { enumerable: createDesc(0, false) });
			} return setSymbolDesc(it, key, D);
		} return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
		anObject(it);
		var keys = enumKeys(P = toIObject(P));
		var i = 0;
		var l = keys.length;
		var key;
		while (l > i) $defineProperty(it, key = keys[i++], P[key]);
		return it;
	};
	var $create = function create(it, P) {
		return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
		var E = isEnum.call(this, key = toPrimitive(key, true));
		if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
		return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
		it = toIObject(it);
		key = toPrimitive(key, true);
		if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
		var D = gOPD(it, key);
		if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
		return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
		var names = gOPN(toIObject(it));
		var result = [];
		var i = 0;
		var key;
		while (names.length > i) {
			if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
		} return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
		var IS_OP = it === ObjectProto;
		var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
		var result = [];
		var i = 0;
		var key;
		while (names.length > i) {
			if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
		} return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
		$Symbol = function Symbol() {
			if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
			var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
			var $set = function (value) {
				if (this === ObjectProto) $set.call(OPSymbols, value);
				if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
				setSymbolDesc(this, tag, createDesc(1, value));
			};
			if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
			return wrap(tag);
		};
		redefine($Symbol[PROTOTYPE], 'toString', function toString() {
			return this._k;
		});
	
		$GOPD.f = $getOwnPropertyDescriptor;
		$DP.f = $defineProperty;
		__webpack_require__(35).f = gOPNExt.f = $getOwnPropertyNames;
		__webpack_require__(49).f = $propertyIsEnumerable;
		$GOPS.f = $getOwnPropertySymbols;
	
		if (DESCRIPTORS && !__webpack_require__(30)) {
			redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
		}
	
		wksExt.f = function (name) {
			return wrap(wks(name));
		};
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var es6Symbols = (
		// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
		'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);
	
	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
		// 19.4.2.1 Symbol.for(key)
		'for': function (key) {
			return has(SymbolRegistry, key += '')
				? SymbolRegistry[key]
				: SymbolRegistry[key] = $Symbol(key);
		},
		// 19.4.2.5 Symbol.keyFor(sym)
		keyFor: function keyFor(sym) {
			if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
			for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
		},
		useSetter: function () { setter = true; },
		useSimple: function () { setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
		// 19.1.2.2 Object.create(O [, Properties])
		create: $create,
		// 19.1.2.4 Object.defineProperty(O, P, Attributes)
		defineProperty: $defineProperty,
		// 19.1.2.3 Object.defineProperties(O, Properties)
		defineProperties: $defineProperties,
		// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
		getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
		// 19.1.2.7 Object.getOwnPropertyNames(O)
		getOwnPropertyNames: $getOwnPropertyNames,
		// 19.1.2.8 Object.getOwnPropertySymbols(O)
		getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });
	
	$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
		getOwnPropertySymbols: function getOwnPropertySymbols(it) {
			return $GOPS.f(toObject(it));
		}
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
		var S = $Symbol();
		// MS Edge converts symbol values to JSON as {}
		// WebKit converts symbol values to JSON as null
		// V8 throws on boxed symbols
		return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
		stringify: function stringify(it) {
			var args = [it];
			var i = 1;
			var replacer, $replacer;
			while (arguments.length > i) args.push(arguments[i++]);
			$replacer = replacer = args[1];
			if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
			if (!isArray(replacer)) replacer = function (key, value) {
				if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
				if (!isSymbol(value)) return value;
			};
			args[1] = replacer;
			return _stringify.apply($JSON, args);
		}
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);
	
	
	/***/ }),
	/* 261 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var $typed = __webpack_require__(64);
	var buffer = __webpack_require__(89);
	var anObject = __webpack_require__(1);
	var toAbsoluteIndex = __webpack_require__(40);
	var toLength = __webpack_require__(6);
	var isObject = __webpack_require__(4);
	var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
	var speciesConstructor = __webpack_require__(51);
	var $ArrayBuffer = buffer.ArrayBuffer;
	var $DataView = buffer.DataView;
	var $isView = $typed.ABV && ArrayBuffer.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW = $typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
		// 24.1.3.1 ArrayBuffer.isView(arg)
		isView: function isView(it) {
			return $isView && $isView(it) || isObject(it) && VIEW in it;
		}
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
		return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
		// 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
		slice: function slice(start, end) {
			if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
			var len = anObject(this).byteLength;
			var first = toAbsoluteIndex(start, len);
			var fin = toAbsoluteIndex(end === undefined ? len : end, len);
			var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
			var viewS = new $DataView(this);
			var viewT = new $DataView(result);
			var index = 0;
			while (first < fin) {
				viewT.setUint8(index++, viewS.getUint8(first++));
			} return result;
		}
	});
	
	__webpack_require__(39)(ARRAY_BUFFER);
	
	
	/***/ }),
	/* 262 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	$export($export.G + $export.W + $export.F * !__webpack_require__(64).ABV, {
		DataView: __webpack_require__(89).DataView
	});
	
	
	/***/ }),
	/* 263 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Float32', 4, function (init) {
		return function Float32Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 264 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Float64', 8, function (init) {
		return function Float64Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 265 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Int16', 2, function (init) {
		return function Int16Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 266 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Int32', 4, function (init) {
		return function Int32Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 267 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Int8', 1, function (init) {
		return function Int8Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 268 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Uint16', 2, function (init) {
		return function Uint16Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 269 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Uint32', 4, function (init) {
		return function Uint32Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 270 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Uint8', 1, function (init) {
		return function Uint8Array(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	});
	
	
	/***/ }),
	/* 271 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(28)('Uint8', 1, function (init) {
		return function Uint8ClampedArray(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	}, true);
	
	
	/***/ }),
	/* 272 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var weak = __webpack_require__(101);
	var validate = __webpack_require__(42);
	var WEAK_SET = 'WeakSet';
	
	// 23.4 WeakSet Objects
	__webpack_require__(53)(WEAK_SET, function (get) {
		return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
		// 23.4.3.1 WeakSet.prototype.add(value)
		add: function add(value) {
			return weak.def(validate(this, WEAK_SET), value, true);
		}
	}, weak, false, true);
	
	
	/***/ }),
	/* 273 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
	var $export = __webpack_require__(0);
	var flattenIntoArray = __webpack_require__(102);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(6);
	var aFunction = __webpack_require__(10);
	var arraySpeciesCreate = __webpack_require__(68);
	
	$export($export.P, 'Array', {
		flatMap: function flatMap(callbackfn /* , thisArg */) {
			var O = toObject(this);
			var sourceLen, A;
			aFunction(callbackfn);
			sourceLen = toLength(O.length);
			A = arraySpeciesCreate(O, 0);
			flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
			return A;
		}
	});
	
	__webpack_require__(29)('flatMap');
	
	
	/***/ }),
	/* 274 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
	var $export = __webpack_require__(0);
	var flattenIntoArray = __webpack_require__(102);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(6);
	var toInteger = __webpack_require__(22);
	var arraySpeciesCreate = __webpack_require__(68);
	
	$export($export.P, 'Array', {
		flatten: function flatten(/* depthArg = 1 */) {
			var depthArg = arguments[0];
			var O = toObject(this);
			var sourceLen = toLength(O.length);
			var A = arraySpeciesCreate(O, 0);
			flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
			return A;
		}
	});
	
	__webpack_require__(29)('flatten');
	
	
	/***/ }),
	/* 275 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/tc39/Array.prototype.includes
	var $export = __webpack_require__(0);
	var $includes = __webpack_require__(52)(true);
	
	$export($export.P, 'Array', {
		includes: function includes(el /* , fromIndex = 0 */) {
			return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
		}
	});
	
	__webpack_require__(29)('includes');
	
	
	/***/ }),
	/* 276 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export = __webpack_require__(0);
	var microtask = __webpack_require__(80)();
	var process = __webpack_require__(2).process;
	var isNode = __webpack_require__(18)(process) == 'process';
	
	$export($export.G, {
		asap: function asap(fn) {
			var domain = isNode && process.domain;
			microtask(domain ? domain.bind(fn) : fn);
		}
	});
	
	
	/***/ }),
	/* 277 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(0);
	var cof = __webpack_require__(18);
	
	$export($export.S, 'Error', {
		isError: function isError(it) {
			return cof(it) === 'Error';
		}
	});
	
	
	/***/ }),
	/* 278 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-global
	var $export = __webpack_require__(0);
	
	$export($export.G, { global: __webpack_require__(2) });
	
	
	/***/ }),
	/* 279 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	__webpack_require__(61)('Map');
	
	
	/***/ }),
	/* 280 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	__webpack_require__(62)('Map');
	
	
	/***/ }),
	/* 281 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(0);
	
	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(100)('Map') });
	
	
	/***/ }),
	/* 282 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		clamp: function clamp(x, lower, upper) {
			return Math.min(upper, Math.max(lower, x));
		}
	});
	
	
	/***/ }),
	/* 283 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });
	
	
	/***/ }),
	/* 284 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var RAD_PER_DEG = 180 / Math.PI;
	
	$export($export.S, 'Math', {
		degrees: function degrees(radians) {
			return radians * RAD_PER_DEG;
		}
	});
	
	
	/***/ }),
	/* 285 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var scale = __webpack_require__(110);
	var fround = __webpack_require__(108);
	
	$export($export.S, 'Math', {
		fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
			return fround(scale(x, inLow, inHigh, outLow, outHigh));
		}
	});
	
	
	/***/ }),
	/* 286 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		iaddh: function iaddh(x0, x1, y0, y1) {
			var $x0 = x0 >>> 0;
			var $x1 = x1 >>> 0;
			var $y0 = y0 >>> 0;
			return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
		}
	});
	
	
	/***/ }),
	/* 287 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		imulh: function imulh(u, v) {
			var UINT16 = 0xffff;
			var $u = +u;
			var $v = +v;
			var u0 = $u & UINT16;
			var v0 = $v & UINT16;
			var u1 = $u >> 16;
			var v1 = $v >> 16;
			var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
			return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
		}
	});
	
	
	/***/ }),
	/* 288 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		isubh: function isubh(x0, x1, y0, y1) {
			var $x0 = x0 >>> 0;
			var $x1 = x1 >>> 0;
			var $y0 = y0 >>> 0;
			return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
		}
	});
	
	
	/***/ }),
	/* 289 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });
	
	
	/***/ }),
	/* 290 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var DEG_PER_RAD = Math.PI / 180;
	
	$export($export.S, 'Math', {
		radians: function radians(degrees) {
			return degrees * DEG_PER_RAD;
		}
	});
	
	
	/***/ }),
	/* 291 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { scale: __webpack_require__(110) });
	
	
	/***/ }),
	/* 292 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// http://jfbastien.github.io/papers/Math.signbit.html
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', { signbit: function signbit(x) {
		// eslint-disable-next-line no-self-compare
		return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
	} });
	
	
	/***/ }),
	/* 293 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);
	
	$export($export.S, 'Math', {
		umulh: function umulh(u, v) {
			var UINT16 = 0xffff;
			var $u = +u;
			var $v = +v;
			var u0 = $u & UINT16;
			var v0 = $v & UINT16;
			var u1 = $u >>> 16;
			var v1 = $v >>> 16;
			var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
			return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
		}
	});
	
	
	/***/ }),
	/* 294 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var aFunction = __webpack_require__(10);
	var $defineProperty = __webpack_require__(8);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
		__defineGetter__: function __defineGetter__(P, getter) {
			$defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
		}
	});
	
	
	/***/ }),
	/* 295 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var aFunction = __webpack_require__(10);
	var $defineProperty = __webpack_require__(8);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
		__defineSetter__: function __defineSetter__(P, setter) {
			$defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
		}
	});
	
	
	/***/ }),
	/* 296 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(0);
	var $entries = __webpack_require__(115)(true);
	
	$export($export.S, 'Object', {
		entries: function entries(it) {
			return $entries(it);
		}
	});
	
	
	/***/ }),
	/* 297 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export = __webpack_require__(0);
	var ownKeys = __webpack_require__(116);
	var toIObject = __webpack_require__(17);
	var gOPD = __webpack_require__(15);
	var createProperty = __webpack_require__(69);
	
	$export($export.S, 'Object', {
		getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
			var O = toIObject(object);
			var getDesc = gOPD.f;
			var keys = ownKeys(O);
			var result = {};
			var i = 0;
			var key, desc;
			while (keys.length > i) {
				desc = getDesc(O, key = keys[i++]);
				if (desc !== undefined) createProperty(result, key, desc);
			}
			return result;
		}
	});
	
	
	/***/ }),
	/* 298 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(26);
	var getPrototypeOf = __webpack_require__(16);
	var getOwnPropertyDescriptor = __webpack_require__(15).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
		__lookupGetter__: function __lookupGetter__(P) {
			var O = toObject(this);
			var K = toPrimitive(P, true);
			var D;
			do {
				if (D = getOwnPropertyDescriptor(O, K)) return D.get;
			} while (O = getPrototypeOf(O));
		}
	});
	
	
	/***/ }),
	/* 299 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(26);
	var getPrototypeOf = __webpack_require__(16);
	var getOwnPropertyDescriptor = __webpack_require__(15).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
		__lookupSetter__: function __lookupSetter__(P) {
			var O = toObject(this);
			var K = toPrimitive(P, true);
			var D;
			do {
				if (D = getOwnPropertyDescriptor(O, K)) return D.set;
			} while (O = getPrototypeOf(O));
		}
	});
	
	
	/***/ }),
	/* 300 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(0);
	var $values = __webpack_require__(115)(false);
	
	$export($export.S, 'Object', {
		values: function values(it) {
			return $values(it);
		}
	});
	
	
	/***/ }),
	/* 301 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/zenparsing/es-observable
	var $export = __webpack_require__(0);
	var global = __webpack_require__(2);
	var core = __webpack_require__(19);
	var microtask = __webpack_require__(80)();
	var OBSERVABLE = __webpack_require__(5)('observable');
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var anInstance = __webpack_require__(32);
	var redefineAll = __webpack_require__(38);
	var hide = __webpack_require__(11);
	var forOf = __webpack_require__(33);
	var RETURN = forOf.RETURN;
	
	var getMethod = function (fn) {
		return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function (subscription) {
		var cleanup = subscription._c;
		if (cleanup) {
			subscription._c = undefined;
			cleanup();
		}
	};
	
	var subscriptionClosed = function (subscription) {
		return subscription._o === undefined;
	};
	
	var closeSubscription = function (subscription) {
		if (!subscriptionClosed(subscription)) {
			subscription._o = undefined;
			cleanupSubscription(subscription);
		}
	};
	
	var Subscription = function (observer, subscriber) {
		anObject(observer);
		this._c = undefined;
		this._o = observer;
		observer = new SubscriptionObserver(this);
		try {
			var cleanup = subscriber(observer);
			var subscription = cleanup;
			if (cleanup != null) {
				if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
				else aFunction(cleanup);
				this._c = cleanup;
			}
		} catch (e) {
			observer.error(e);
			return;
		} if (subscriptionClosed(this)) cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
		unsubscribe: function unsubscribe() { closeSubscription(this); }
	});
	
	var SubscriptionObserver = function (subscription) {
		this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
		next: function next(value) {
			var subscription = this._s;
			if (!subscriptionClosed(subscription)) {
				var observer = subscription._o;
				try {
					var m = getMethod(observer.next);
					if (m) return m.call(observer, value);
				} catch (e) {
					try {
						closeSubscription(subscription);
					} finally {
						throw e;
					}
				}
			}
		},
		error: function error(value) {
			var subscription = this._s;
			if (subscriptionClosed(subscription)) throw value;
			var observer = subscription._o;
			subscription._o = undefined;
			try {
				var m = getMethod(observer.error);
				if (!m) throw value;
				value = m.call(observer, value);
			} catch (e) {
				try {
					cleanupSubscription(subscription);
				} finally {
					throw e;
				}
			} cleanupSubscription(subscription);
			return value;
		},
		complete: function complete(value) {
			var subscription = this._s;
			if (!subscriptionClosed(subscription)) {
				var observer = subscription._o;
				subscription._o = undefined;
				try {
					var m = getMethod(observer.complete);
					value = m ? m.call(observer, value) : undefined;
				} catch (e) {
					try {
						cleanupSubscription(subscription);
					} finally {
						throw e;
					}
				} cleanupSubscription(subscription);
				return value;
			}
		}
	});
	
	var $Observable = function Observable(subscriber) {
		anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
		subscribe: function subscribe(observer) {
			return new Subscription(observer, this._f);
		},
		forEach: function forEach(fn) {
			var that = this;
			return new (core.Promise || global.Promise)(function (resolve, reject) {
				aFunction(fn);
				var subscription = that.subscribe({
					next: function (value) {
						try {
							return fn(value);
						} catch (e) {
							reject(e);
							subscription.unsubscribe();
						}
					},
					error: reject,
					complete: resolve
				});
			});
		}
	});
	
	redefineAll($Observable, {
		from: function from(x) {
			var C = typeof this === 'function' ? this : $Observable;
			var method = getMethod(anObject(x)[OBSERVABLE]);
			if (method) {
				var observable = anObject(method.call(x));
				return observable.constructor === C ? observable : new C(function (observer) {
					return observable.subscribe(observer);
				});
			}
			return new C(function (observer) {
				var done = false;
				microtask(function () {
					if (!done) {
						try {
							if (forOf(x, false, function (it) {
								observer.next(it);
								if (done) return RETURN;
							}) === RETURN) return;
						} catch (e) {
							if (done) throw e;
							observer.error(e);
							return;
						} observer.complete();
					}
				});
				return function () { done = true; };
			});
		},
		of: function of() {
			for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
			return new (typeof this === 'function' ? this : $Observable)(function (observer) {
				var done = false;
				microtask(function () {
					if (!done) {
						for (var j = 0; j < items.length; ++j) {
							observer.next(items[j]);
							if (done) return;
						} observer.complete();
					}
				});
				return function () { done = true; };
			});
		}
	});
	
	hide($Observable.prototype, OBSERVABLE, function () { return this; });
	
	$export($export.G, { Observable: $Observable });
	
	__webpack_require__(39)('Observable');
	
	
	/***/ }),
	/* 302 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	// https://github.com/tc39/proposal-promise-finally
	
	var $export = __webpack_require__(0);
	var core = __webpack_require__(19);
	var global = __webpack_require__(2);
	var speciesConstructor = __webpack_require__(51);
	var promiseResolve = __webpack_require__(120);
	
	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
		var C = speciesConstructor(this, core.Promise || global.Promise);
		var isFunction = typeof onFinally == 'function';
		return this.then(
			isFunction ? function (x) {
				return promiseResolve(C, onFinally()).then(function () { return x; });
			} : onFinally,
			isFunction ? function (e) {
				return promiseResolve(C, onFinally()).then(function () { throw e; });
			} : onFinally
		);
	} });
	
	
	/***/ }),
	/* 303 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(0);
	var newPromiseCapability = __webpack_require__(81);
	var perform = __webpack_require__(119);
	
	$export($export.S, 'Promise', { 'try': function (callbackfn) {
		var promiseCapability = newPromiseCapability.f(this);
		var result = perform(callbackfn);
		(result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
		return promiseCapability.promise;
	} });
	
	
	/***/ }),
	/* 304 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var toMetaKey = metadata.key;
	var ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
		ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	} });
	
	
	/***/ }),
	/* 305 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var toMetaKey = metadata.key;
	var getOrCreateMetadataMap = metadata.map;
	var store = metadata.store;
	
	metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
		var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
		var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
		if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
		if (metadataMap.size) return true;
		var targetMetadata = store.get(target);
		targetMetadata['delete'](targetKey);
		return !!targetMetadata.size || store['delete'](target);
	} });
	
	
	/***/ }),
	/* 306 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var Set = __webpack_require__(128);
	var from = __webpack_require__(96);
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(16);
	var ordinaryOwnMetadataKeys = metadata.keys;
	var toMetaKey = metadata.key;
	
	var ordinaryMetadataKeys = function (O, P) {
		var oKeys = ordinaryOwnMetadataKeys(O, P);
		var parent = getPrototypeOf(O);
		if (parent === null) return oKeys;
		var pKeys = ordinaryMetadataKeys(parent, P);
		return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
		return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	} });
	
	
	/***/ }),
	/* 307 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(16);
	var ordinaryHasOwnMetadata = metadata.has;
	var ordinaryGetOwnMetadata = metadata.get;
	var toMetaKey = metadata.key;
	
	var ordinaryGetMetadata = function (MetadataKey, O, P) {
		var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
		if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
		var parent = getPrototypeOf(O);
		return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
		return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });
	
	
	/***/ }),
	/* 308 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var ordinaryOwnMetadataKeys = metadata.keys;
	var toMetaKey = metadata.key;
	
	metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
		return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	} });
	
	
	/***/ }),
	/* 309 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var ordinaryGetOwnMetadata = metadata.get;
	var toMetaKey = metadata.key;
	
	metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
		return ordinaryGetOwnMetadata(metadataKey, anObject(target)
			, arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });
	
	
	/***/ }),
	/* 310 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(16);
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey = metadata.key;
	
	var ordinaryHasMetadata = function (MetadataKey, O, P) {
		var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
		if (hasOwn) return true;
		var parent = getPrototypeOf(O);
		return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
		return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });
	
	
	/***/ }),
	/* 311 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey = metadata.key;
	
	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
		return ordinaryHasOwnMetadata(metadataKey, anObject(target)
			, arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });
	
	
	/***/ }),
	/* 312 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $metadata = __webpack_require__(27);
	var anObject = __webpack_require__(1);
	var aFunction = __webpack_require__(10);
	var toMetaKey = $metadata.key;
	var ordinaryDefineOwnMetadata = $metadata.set;
	
	$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
		return function decorator(target, targetKey) {
			ordinaryDefineOwnMetadata(
				metadataKey, metadataValue,
				(targetKey !== undefined ? anObject : aFunction)(target),
				toMetaKey(targetKey)
			);
		};
	} });
	
	
	/***/ }),
	/* 313 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	__webpack_require__(61)('Set');
	
	
	/***/ }),
	/* 314 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	__webpack_require__(62)('Set');
	
	
	/***/ }),
	/* 315 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(0);
	
	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(100)('Set') });
	
	
	/***/ }),
	/* 316 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(0);
	var $at = __webpack_require__(63)(true);
	
	$export($export.P, 'String', {
		at: function at(pos) {
			return $at(this, pos);
		}
	});
	
	
	/***/ }),
	/* 317 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://tc39.github.io/String.prototype.matchAll/
	var $export = __webpack_require__(0);
	var defined = __webpack_require__(24);
	var toLength = __webpack_require__(6);
	var isRegExp = __webpack_require__(56);
	var getFlags = __webpack_require__(47);
	var RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function (regexp, string) {
		this._r = regexp;
		this._s = string;
	};
	
	__webpack_require__(76)($RegExpStringIterator, 'RegExp String', function next() {
		var match = this._r.exec(this._s);
		return { value: match, done: match === null };
	});
	
	$export($export.P, 'String', {
		matchAll: function matchAll(regexp) {
			defined(this);
			if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
			var S = String(this);
			var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
			var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
			rx.lastIndex = toLength(regexp.lastIndex);
			return new $RegExpStringIterator(rx, S);
		}
	});
	
	
	/***/ }),
	/* 318 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(0);
	var $pad = __webpack_require__(122);
	var userAgent = __webpack_require__(65);
	
	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);
	
	$export($export.P + $export.F * WEBKIT_BUG, 'String', {
		padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
			return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
		}
	});
	
	
	/***/ }),
	/* 319 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(0);
	var $pad = __webpack_require__(122);
	var userAgent = __webpack_require__(65);
	
	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);
	
	$export($export.P + $export.F * WEBKIT_BUG, 'String', {
		padStart: function padStart(maxLength /* , fillString = ' ' */) {
			return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
		}
	});
	
	
	/***/ }),
	/* 320 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(46)('trimLeft', function ($trim) {
		return function trimLeft() {
			return $trim(this, 1);
		};
	}, 'trimStart');
	
	
	/***/ }),
	/* 321 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(46)('trimRight', function ($trim) {
		return function trimRight() {
			return $trim(this, 2);
		};
	}, 'trimEnd');
	
	
	/***/ }),
	/* 322 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(90)('asyncIterator');
	
	
	/***/ }),
	/* 323 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(90)('observable');
	
	
	/***/ }),
	/* 324 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://github.com/tc39/proposal-global
	var $export = __webpack_require__(0);
	
	$export($export.S, 'System', { global: __webpack_require__(2) });
	
	
	/***/ }),
	/* 325 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	__webpack_require__(61)('WeakMap');
	
	
	/***/ }),
	/* 326 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	__webpack_require__(62)('WeakMap');
	
	
	/***/ }),
	/* 327 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
	__webpack_require__(61)('WeakSet');
	
	
	/***/ }),
	/* 328 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
	__webpack_require__(62)('WeakSet');
	
	
	/***/ }),
	/* 329 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $iterators = __webpack_require__(92);
	var getKeys = __webpack_require__(36);
	var redefine = __webpack_require__(12);
	var global = __webpack_require__(2);
	var hide = __webpack_require__(11);
	var Iterators = __webpack_require__(44);
	var wks = __webpack_require__(5);
	var ITERATOR = wks('iterator');
	var TO_STRING_TAG = wks('toStringTag');
	var ArrayValues = Iterators.Array;
	
	var DOMIterables = {
		CSSRuleList: true, // TODO: Not spec compliant, should be false.
		CSSStyleDeclaration: false,
		CSSValueList: false,
		ClientRectList: false,
		DOMRectList: false,
		DOMStringList: false,
		DOMTokenList: true,
		DataTransferItemList: false,
		FileList: false,
		HTMLAllCollection: false,
		HTMLCollection: false,
		HTMLFormElement: false,
		HTMLSelectElement: false,
		MediaList: true, // TODO: Not spec compliant, should be false.
		MimeTypeArray: false,
		NamedNodeMap: false,
		NodeList: true,
		PaintRequestList: false,
		Plugin: false,
		PluginArray: false,
		SVGLengthList: false,
		SVGNumberList: false,
		SVGPathSegList: false,
		SVGPointList: false,
		SVGStringList: false,
		SVGTransformList: false,
		SourceBufferList: false,
		StyleSheetList: true, // TODO: Not spec compliant, should be false.
		TextTrackCueList: false,
		TextTrackList: false,
		TouchList: false
	};
	
	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
		var NAME = collections[i];
		var explicit = DOMIterables[NAME];
		var Collection = global[NAME];
		var proto = Collection && Collection.prototype;
		var key;
		if (proto) {
			if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
			if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
			Iterators[NAME] = ArrayValues;
			if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
		}
	}
	
	
	/***/ }),
	/* 330 */
	/***/ (function(module, exports, __webpack_require__) {
	
	var $export = __webpack_require__(0);
	var $task = __webpack_require__(88);
	$export($export.G + $export.B, {
		setImmediate: $task.set,
		clearImmediate: $task.clear
	});
	
	
	/***/ }),
	/* 331 */
	/***/ (function(module, exports, __webpack_require__) {
	
	// ie9- setTimeout & setInterval additional parameters fix
	var global = __webpack_require__(2);
	var $export = __webpack_require__(0);
	var userAgent = __webpack_require__(65);
	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap = function (set) {
		return function (fn, time /* , ...args */) {
			var boundArgs = arguments.length > 2;
			var args = boundArgs ? slice.call(arguments, 2) : false;
			return set(boundArgs ? function () {
				// eslint-disable-next-line no-new-func
				(typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
			} : fn, time);
		};
	};
	$export($export.G + $export.B + $export.F * MSIE, {
		setTimeout: wrap(global.setTimeout),
		setInterval: wrap(global.setInterval)
	});
	
	
	/***/ }),
	/* 332 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(260);
	__webpack_require__(199);
	__webpack_require__(201);
	__webpack_require__(200);
	__webpack_require__(203);
	__webpack_require__(205);
	__webpack_require__(210);
	__webpack_require__(204);
	__webpack_require__(202);
	__webpack_require__(212);
	__webpack_require__(211);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(206);
	__webpack_require__(198);
	__webpack_require__(209);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(166);
	__webpack_require__(168);
	__webpack_require__(167);
	__webpack_require__(216);
	__webpack_require__(215);
	__webpack_require__(186);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(247);
	__webpack_require__(252);
	__webpack_require__(259);
	__webpack_require__(250);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(248);
	__webpack_require__(253);
	__webpack_require__(255);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(249);
	__webpack_require__(251);
	__webpack_require__(254);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(161);
	__webpack_require__(163);
	__webpack_require__(162);
	__webpack_require__(165);
	__webpack_require__(164);
	__webpack_require__(150);
	__webpack_require__(148);
	__webpack_require__(154);
	__webpack_require__(151);
	__webpack_require__(157);
	__webpack_require__(159);
	__webpack_require__(147);
	__webpack_require__(153);
	__webpack_require__(144);
	__webpack_require__(158);
	__webpack_require__(142);
	__webpack_require__(156);
	__webpack_require__(155);
	__webpack_require__(149);
	__webpack_require__(152);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(146);
	__webpack_require__(145);
	__webpack_require__(160);
	__webpack_require__(92);
	__webpack_require__(232);
	__webpack_require__(126);
	__webpack_require__(237);
	__webpack_require__(127);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(217);
	__webpack_require__(125);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(272);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(267);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(265);
	__webpack_require__(268);
	__webpack_require__(266);
	__webpack_require__(269);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(225);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(231);
	__webpack_require__(230);
	__webpack_require__(275);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(316);
	__webpack_require__(319);
	__webpack_require__(318);
	__webpack_require__(320);
	__webpack_require__(321);
	__webpack_require__(317);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(297);
	__webpack_require__(300);
	__webpack_require__(296);
	__webpack_require__(294);
	__webpack_require__(295);
	__webpack_require__(298);
	__webpack_require__(299);
	__webpack_require__(281);
	__webpack_require__(315);
	__webpack_require__(280);
	__webpack_require__(314);
	__webpack_require__(326);
	__webpack_require__(328);
	__webpack_require__(279);
	__webpack_require__(313);
	__webpack_require__(325);
	__webpack_require__(327);
	__webpack_require__(278);
	__webpack_require__(324);
	__webpack_require__(277);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(288);
	__webpack_require__(287);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	__webpack_require__(293);
	__webpack_require__(292);
	__webpack_require__(302);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(307);
	__webpack_require__(306);
	__webpack_require__(309);
	__webpack_require__(308);
	__webpack_require__(310);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(276);
	__webpack_require__(301);
	__webpack_require__(331);
	__webpack_require__(330);
	__webpack_require__(329);
	module.exports = __webpack_require__(19);
	
	
	/***/ }),
	/* 333 */
	/***/ (function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/**
	* matter-js 0.14.2 by @liabru 2018-06-11
	* http://brm.io/matter-js/
	* License MIT
	*/
	
	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) Liam Brummitt and contributors.
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Matter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
	/**
	* The `Matter.Body` module contains methods for creating and manipulating body models.
	* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
	* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	
	* @class Body
	*/
	
	var Body = {};
	
	module.exports = Body;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Vector = _dereq_('../geometry/Vector');
	var Sleeping = _dereq_('../core/Sleeping');
	var Render = _dereq_('../render/Render');
	var Common = _dereq_('../core/Common');
	var Bounds = _dereq_('../geometry/Bounds');
	var Axes = _dereq_('../geometry/Axes');
	
	(function() {
	
			Body._inertiaScale = 4;
			Body._nextCollidingGroupId = 1;
			Body._nextNonCollidingGroupId = -1;
			Body._nextCategory = 0x0001;
	
			/**
			 * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * All properties have default values, and many are pre-calculated automatically based on other properties.
			 * Vertices must be specified in clockwise order.
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {} options
			 * @return {body} body
			 */
			Body.create = function(options) {
					var defaults = {
							id: Common.nextId(),
							type: 'body',
							label: 'Body',
							parts: [],
							plugin: {},
							angle: 0,
							vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
							position: { x: 0, y: 0 },
							force: { x: 0, y: 0 },
							torque: 0,
							positionImpulse: { x: 0, y: 0 },
							constraintImpulse: { x: 0, y: 0, angle: 0 },
							totalContacts: 0,
							speed: 0,
							angularSpeed: 0,
							velocity: { x: 0, y: 0 },
							angularVelocity: 0,
							isSensor: false,
							isStatic: false,
							isSleeping: false,
							motion: 0,
							sleepThreshold: 60,
							density: 0.001,
							restitution: 0,
							friction: 0.1,
							frictionStatic: 0.5,
							frictionAir: 0.01,
							collisionFilter: {
									category: 0x0001,
									mask: 0xFFFFFFFF,
									group: 0
							},
							slop: 0.05,
							timeScale: 1,
							render: {
									visible: true,
									opacity: 1,
									sprite: {
											xScale: 1,
											yScale: 1,
											xOffset: 0,
											yOffset: 0
									},
									lineWidth: 0
							}
					};
	
					var body = Common.extend(defaults, options);
	
					_initProperties(body, options);
	
					return body;
			};
	
			/**
			 * Returns the next unique group index for which bodies will collide.
			 * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
			 * See `body.collisionFilter` for more information.
			 * @method nextGroup
			 * @param {bool} [isNonColliding=false]
			 * @return {Number} Unique group index
			 */
			Body.nextGroup = function(isNonColliding) {
					if (isNonColliding)
							return Body._nextNonCollidingGroupId--;
	
					return Body._nextCollidingGroupId++;
			};
	
			/**
			 * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
			 * There are 32 available. See `body.collisionFilter` for more information.
			 * @method nextCategory
			 * @return {Number} Unique category bitfield
			 */
			Body.nextCategory = function() {
					Body._nextCategory = Body._nextCategory << 1;
					return Body._nextCategory;
			};
	
			/**
			 * Initialises body properties.
			 * @method _initProperties
			 * @private
			 * @param {body} body
			 * @param {} [options]
			 */
			var _initProperties = function(body, options) {
					options = options || {};
	
					// init required properties (order is important)
					Body.set(body, {
							bounds: body.bounds || Bounds.create(body.vertices),
							positionPrev: body.positionPrev || Vector.clone(body.position),
							anglePrev: body.anglePrev || body.angle,
							vertices: body.vertices,
							parts: body.parts || [body],
							isStatic: body.isStatic,
							isSleeping: body.isSleeping,
							parent: body.parent || body
					});
	
					Vertices.rotate(body.vertices, body.angle, body.position);
					Axes.rotate(body.axes, body.angle);
					Bounds.update(body.bounds, body.vertices, body.velocity);
	
					// allow options to override the automatically calculated properties
					Body.set(body, {
							axes: options.axes || body.axes,
							area: options.area || body.area,
							mass: options.mass || body.mass,
							inertia: options.inertia || body.inertia
					});
	
					// render properties
					var defaultFillStyle = (body.isStatic ? '#2e2b44' : Common.choose(['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'])),
							defaultStrokeStyle = '#000';
					body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
					body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
					body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
					body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
			};
	
			/**
			 * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
			 * Prefer to use the actual setter functions in performance critical situations.
			 * @method set
			 * @param {body} body
			 * @param {} settings A property name (or map of properties and values) to set on the body.
			 * @param {} value The value to set if `settings` is a single property name.
			 */
			Body.set = function(body, settings, value) {
					var property;
	
					if (typeof settings === 'string') {
							property = settings;
							settings = {};
							settings[property] = value;
					}
	
					for (property in settings) {
							value = settings[property];
	
							if (!settings.hasOwnProperty(property))
									continue;
	
							switch (property) {
	
							case 'isStatic':
									Body.setStatic(body, value);
									break;
							case 'isSleeping':
									Sleeping.set(body, value);
									break;
							case 'mass':
									Body.setMass(body, value);
									break;
							case 'density':
									Body.setDensity(body, value);
									break;
							case 'inertia':
									Body.setInertia(body, value);
									break;
							case 'vertices':
									Body.setVertices(body, value);
									break;
							case 'position':
									Body.setPosition(body, value);
									break;
							case 'angle':
									Body.setAngle(body, value);
									break;
							case 'velocity':
									Body.setVelocity(body, value);
									break;
							case 'angularVelocity':
									Body.setAngularVelocity(body, value);
									break;
							case 'parts':
									Body.setParts(body, value);
									break;
							default:
									body[property] = value;
	
							}
					}
			};
	
			/**
			 * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
			 * @method setStatic
			 * @param {body} body
			 * @param {bool} isStatic
			 */
			Body.setStatic = function(body, isStatic) {
					for (var i = 0; i < body.parts.length; i++) {
							var part = body.parts[i];
							part.isStatic = isStatic;
	
							if (isStatic) {
									part._original = {
											restitution: part.restitution,
											friction: part.friction,
											mass: part.mass,
											inertia: part.inertia,
											density: part.density,
											inverseMass: part.inverseMass,
											inverseInertia: part.inverseInertia
									};
	
									part.restitution = 0;
									part.friction = 1;
									part.mass = part.inertia = part.density = Infinity;
									part.inverseMass = part.inverseInertia = 0;
	
									part.positionPrev.x = part.position.x;
									part.positionPrev.y = part.position.y;
									part.anglePrev = part.angle;
									part.angularVelocity = 0;
									part.speed = 0;
									part.angularSpeed = 0;
									part.motion = 0;
							} else if (part._original) {
									part.restitution = part._original.restitution;
									part.friction = part._original.friction;
									part.mass = part._original.mass;
									part.inertia = part._original.inertia;
									part.density = part._original.density;
									part.inverseMass = part._original.inverseMass;
									part.inverseInertia = part._original.inverseInertia;
	
									delete part._original;
							}
					}
			};
	
			/**
			 * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
			 * @method setMass
			 * @param {body} body
			 * @param {number} mass
			 */
			Body.setMass = function(body, mass) {
					var moment = body.inertia / (body.mass / 6);
					body.inertia = moment * (mass / 6);
					body.inverseInertia = 1 / body.inertia;
	
					body.mass = mass;
					body.inverseMass = 1 / body.mass;
					body.density = body.mass / body.area;
			};
	
			/**
			 * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
			 * @method setDensity
			 * @param {body} body
			 * @param {number} density
			 */
			Body.setDensity = function(body, density) {
					Body.setMass(body, density * body.area);
					body.density = density;
			};
	
			/**
			 * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
			 * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
			 * @method setInertia
			 * @param {body} body
			 * @param {number} inertia
			 */
			Body.setInertia = function(body, inertia) {
					body.inertia = inertia;
					body.inverseInertia = 1 / body.inertia;
			};
	
			/**
			 * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
			 * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
			 * They are then automatically translated to world space based on `body.position`.
			 *
			 * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
			 * Vertices must form a convex hull, concave hulls are not supported.
			 *
			 * @method setVertices
			 * @param {body} body
			 * @param {vector[]} vertices
			 */
			Body.setVertices = function(body, vertices) {
					// change vertices
					if (vertices[0].body === body) {
							body.vertices = vertices;
					} else {
							body.vertices = Vertices.create(vertices, body);
					}
	
					// update properties
					body.axes = Axes.fromVertices(body.vertices);
					body.area = Vertices.area(body.vertices);
					Body.setMass(body, body.density * body.area);
	
					// orient vertices around the centre of mass at origin (0, 0)
					var centre = Vertices.centre(body.vertices);
					Vertices.translate(body.vertices, centre, -1);
	
					// update inertia while vertices are at origin (0, 0)
					Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));
	
					// update geometry
					Vertices.translate(body.vertices, body.position);
					Bounds.update(body.bounds, body.vertices, body.velocity);
			};
	
			/**
			 * Sets the parts of the `body` and updates mass, inertia and centroid.
			 * Each part will have its parent set to `body`.
			 * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
			 * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
			 * @method setParts
			 * @param {body} body
			 * @param [body] parts
			 * @param {bool} [autoHull=true]
			 */
			Body.setParts = function(body, parts, autoHull) {
					var i;
	
					// add all the parts, ensuring that the first part is always the parent body
					parts = parts.slice(0);
					body.parts.length = 0;
					body.parts.push(body);
					body.parent = body;
	
					for (i = 0; i < parts.length; i++) {
							var part = parts[i];
							if (part !== body) {
									part.parent = body;
									body.parts.push(part);
							}
					}
	
					if (body.parts.length === 1)
							return;
	
					autoHull = typeof autoHull !== 'undefined' ? autoHull : true;
	
					// find the convex hull of all parts to set on the parent body
					if (autoHull) {
							var vertices = [];
							for (i = 0; i < parts.length; i++) {
									vertices = vertices.concat(parts[i].vertices);
							}
	
							Vertices.clockwiseSort(vertices);
	
							var hull = Vertices.hull(vertices),
									hullCentre = Vertices.centre(hull);
	
							Body.setVertices(body, hull);
							Vertices.translate(body.vertices, hullCentre);
					}
	
					// sum the properties of all compound parts of the parent body
					var total = Body._totalProperties(body);
	
					body.area = total.area;
					body.parent = body;
					body.position.x = total.centre.x;
					body.position.y = total.centre.y;
					body.positionPrev.x = total.centre.x;
					body.positionPrev.y = total.centre.y;
	
					Body.setMass(body, total.mass);
					Body.setInertia(body, total.inertia);
					Body.setPosition(body, total.centre);
			};
	
			/**
			 * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
			 * @method setPosition
			 * @param {body} body
			 * @param {vector} position
			 */
			Body.setPosition = function(body, position) {
					var delta = Vector.sub(position, body.position);
					body.positionPrev.x += delta.x;
					body.positionPrev.y += delta.y;
	
					for (var i = 0; i < body.parts.length; i++) {
							var part = body.parts[i];
							part.position.x += delta.x;
							part.position.y += delta.y;
							Vertices.translate(part.vertices, delta);
							Bounds.update(part.bounds, part.vertices, body.velocity);
					}
			};
	
			/**
			 * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
			 * @method setAngle
			 * @param {body} body
			 * @param {number} angle
			 */
			Body.setAngle = function(body, angle) {
					var delta = angle - body.angle;
					body.anglePrev += delta;
	
					for (var i = 0; i < body.parts.length; i++) {
							var part = body.parts[i];
							part.angle += delta;
							Vertices.rotate(part.vertices, delta, body.position);
							Axes.rotate(part.axes, delta);
							Bounds.update(part.bounds, part.vertices, body.velocity);
							if (i > 0) {
									Vector.rotateAbout(part.position, delta, body.position, part.position);
							}
					}
			};
	
			/**
			 * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
			 * @method setVelocity
			 * @param {body} body
			 * @param {vector} velocity
			 */
			Body.setVelocity = function(body, velocity) {
					body.positionPrev.x = body.position.x - velocity.x;
					body.positionPrev.y = body.position.y - velocity.y;
					body.velocity.x = velocity.x;
					body.velocity.y = velocity.y;
					body.speed = Vector.magnitude(body.velocity);
			};
	
			/**
			 * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
			 * @method setAngularVelocity
			 * @param {body} body
			 * @param {number} velocity
			 */
			Body.setAngularVelocity = function(body, velocity) {
					body.anglePrev = body.angle - velocity;
					body.angularVelocity = velocity;
					body.angularSpeed = Math.abs(body.angularVelocity);
			};
	
			/**
			 * Moves a body by a given vector relative to its current position, without imparting any velocity.
			 * @method translate
			 * @param {body} body
			 * @param {vector} translation
			 */
			Body.translate = function(body, translation) {
					Body.setPosition(body, Vector.add(body.position, translation));
			};
	
			/**
			 * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
			 * @method rotate
			 * @param {body} body
			 * @param {number} rotation
			 * @param {vector} [point]
			 */
			Body.rotate = function(body, rotation, point) {
					if (!point) {
							Body.setAngle(body, body.angle + rotation);
					} else {
							var cos = Math.cos(rotation),
									sin = Math.sin(rotation),
									dx = body.position.x - point.x,
									dy = body.position.y - point.y;
									
							Body.setPosition(body, {
									x: point.x + (dx * cos - dy * sin),
									y: point.y + (dx * sin + dy * cos)
							});
	
							Body.setAngle(body, body.angle + rotation);
					}
			};
	
			/**
			 * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
			 * @method scale
			 * @param {body} body
			 * @param {number} scaleX
			 * @param {number} scaleY
			 * @param {vector} [point]
			 */
			Body.scale = function(body, scaleX, scaleY, point) {
					var totalArea = 0,
							totalInertia = 0;
	
					point = point || body.position;
	
					for (var i = 0; i < body.parts.length; i++) {
							var part = body.parts[i];
	
							// scale vertices
							Vertices.scale(part.vertices, scaleX, scaleY, point);
	
							// update properties
							part.axes = Axes.fromVertices(part.vertices);
							part.area = Vertices.area(part.vertices);
							Body.setMass(part, body.density * part.area);
	
							// update inertia (requires vertices to be at origin)
							Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
							Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
							Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
	
							if (i > 0) {
									totalArea += part.area;
									totalInertia += part.inertia;
							}
	
							// scale position
							part.position.x = point.x + (part.position.x - point.x) * scaleX;
							part.position.y = point.y + (part.position.y - point.y) * scaleY;
	
							// update bounds
							Bounds.update(part.bounds, part.vertices, body.velocity);
					}
	
					// handle parent body
					if (body.parts.length > 1) {
							body.area = totalArea;
	
							if (!body.isStatic) {
									Body.setMass(body, body.density * totalArea);
									Body.setInertia(body, totalInertia);
							}
					}
	
					// handle circles
					if (body.circleRadius) { 
							if (scaleX === scaleY) {
									body.circleRadius *= scaleX;
							} else {
									// body is no longer a circle
									body.circleRadius = null;
							}
					}
			};
	
			/**
			 * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
			 * @method update
			 * @param {body} body
			 * @param {number} deltaTime
			 * @param {number} timeScale
			 * @param {number} correction
			 */
			Body.update = function(body, deltaTime, timeScale, correction) {
					var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);
	
					// from the previous step
					var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
							velocityPrevX = body.position.x - body.positionPrev.x,
							velocityPrevY = body.position.y - body.positionPrev.y;
	
					// update velocity with Verlet integration
					body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
					body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;
	
					body.positionPrev.x = body.position.x;
					body.positionPrev.y = body.position.y;
					body.position.x += body.velocity.x;
					body.position.y += body.velocity.y;
	
					// update angular velocity with Verlet integration
					body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
					body.anglePrev = body.angle;
					body.angle += body.angularVelocity;
	
					// track speed and acceleration
					body.speed = Vector.magnitude(body.velocity);
					body.angularSpeed = Math.abs(body.angularVelocity);
	
					// transform the body geometry
					for (var i = 0; i < body.parts.length; i++) {
							var part = body.parts[i];
	
							Vertices.translate(part.vertices, body.velocity);
							
							if (i > 0) {
									part.position.x += body.velocity.x;
									part.position.y += body.velocity.y;
							}
	
							if (body.angularVelocity !== 0) {
									Vertices.rotate(part.vertices, body.angularVelocity, body.position);
									Axes.rotate(part.axes, body.angularVelocity);
									if (i > 0) {
											Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
									}
							}
	
							Bounds.update(part.bounds, part.vertices, body.velocity);
					}
			};
	
			/**
			 * Applies a force to a body from a given world-space position, including resulting torque.
			 * @method applyForce
			 * @param {body} body
			 * @param {vector} position
			 * @param {vector} force
			 */
			Body.applyForce = function(body, position, force) {
					body.force.x += force.x;
					body.force.y += force.y;
					var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
					body.torque += offset.x * force.y - offset.y * force.x;
			};
	
			/**
			 * Returns the sums of the properties of all compound parts of the parent body.
			 * @method _totalProperties
			 * @private
			 * @param {body} body
			 * @return {}
			 */
			Body._totalProperties = function(body) {
					// from equations at:
					// https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
					// http://output.to/sideway/default.asp?qno=121100087
	
					var properties = {
							mass: 0,
							area: 0,
							inertia: 0,
							centre: { x: 0, y: 0 }
					};
	
					// sum the properties of all compound parts of the parent body
					for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
							var part = body.parts[i],
									mass = part.mass !== Infinity ? part.mass : 1;
	
							properties.mass += mass;
							properties.area += part.area;
							properties.inertia += part.inertia;
							properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
					}
	
					properties.centre = Vector.div(properties.centre, properties.mass);
	
					return properties;
			};
	
			/*
			*
			*  Events Documentation
			*
			*/
	
			/**
			* Fired when a body starts sleeping (where `this` is the body).
			*
			* @event sleepStart
			* @this {body} The body that has started sleeping
			* @param {} event An event object
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when a body ends sleeping (where `this` is the body).
			*
			* @event sleepEnd
			* @this {body} The body that has ended sleeping
			* @param {} event An event object
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
			 *
			 * @property id
			 * @type number
			 */
	
			/**
			 * A `String` denoting the type of object.
			 *
			 * @property type
			 * @type string
			 * @default "body"
			 * @readOnly
			 */
	
			/**
			 * An arbitrary `String` name to help the user identify and manage bodies.
			 *
			 * @property label
			 * @type string
			 * @default "Body"
			 */
	
			/**
			 * An array of bodies that make up this body. 
			 * The first body in the array must always be a self reference to the current body instance.
			 * All bodies in the `parts` array together form a single rigid compound body.
			 * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
			 * Parts themselves should never be added to a `World`, only the parent body should be.
			 * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
			 *
			 * @property parts
			 * @type body[]
			 */
	
			/**
			 * An object reserved for storing plugin-specific properties.
			 *
			 * @property plugin
			 * @type {}
			 */
	
			/**
			 * A self reference if the body is _not_ a part of another body.
			 * Otherwise this is a reference to the body that this is a part of.
			 * See `body.parts`.
			 *
			 * @property parent
			 * @type body
			 */
	
			/**
			 * A `Number` specifying the angle of the body, in radians.
			 *
			 * @property angle
			 * @type number
			 * @default 0
			 */
	
			/**
			 * An array of `Vector` objects that specify the convex hull of the rigid body.
			 * These should be provided about the origin `(0, 0)`. E.g.
			 *
			 *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
			 *
			 * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
			 * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
			 *
			 * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
			 * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
			 *
			 * @property vertices
			 * @type vector[]
			 */
	
			/**
			 * A `Vector` that specifies the current world-space position of the body.
			 *
			 * @property position
			 * @type vector
			 * @default { x: 0, y: 0 }
			 */
	
			/**
			 * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
			 *
			 * @property force
			 * @type vector
			 * @default { x: 0, y: 0 }
			 */
	
			/**
			 * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
			 *
			 * @property torque
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
			 *
			 * @readOnly
			 * @property speed
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
			 *
			 * @readOnly
			 * @property angularSpeed
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
			 * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
			 *
			 * @readOnly
			 * @property velocity
			 * @type vector
			 * @default { x: 0, y: 0 }
			 */
	
			/**
			 * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
			 * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
			 *
			 * @readOnly
			 * @property angularVelocity
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
			 * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
			 *
			 * @property isStatic
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
			 *
			 * @property isSensor
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
			 * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
			 *
			 * @property isSleeping
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
			 * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
			 *
			 * @readOnly
			 * @property motion
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
			 *
			 * @property sleepThreshold
			 * @type number
			 * @default 60
			 */
	
			/**
			 * A `Number` that defines the density of the body, that is its mass per unit area.
			 * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
			 * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
			 *
			 * @property density
			 * @type number
			 * @default 0.001
			 */
	
			/**
			 * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
			 * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
			 *
			 * @property mass
			 * @type number
			 */
	
			/**
			 * A `Number` that defines the inverse mass of the body (`1 / mass`).
			 * If you modify this value, you must also modify the `body.mass` property.
			 *
			 * @property inverseMass
			 * @type number
			 */
	
			/**
			 * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
			 * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
			 * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
			 *
			 * @property inertia
			 * @type number
			 */
	
			/**
			 * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
			 * If you modify this value, you must also modify the `body.inertia` property.
			 *
			 * @property inverseInertia
			 * @type number
			 */
	
			/**
			 * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
			 * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
			 * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
			 * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
			 *
			 *     Math.max(bodyA.restitution, bodyB.restitution)
			 *
			 * @property restitution
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
			 * A value of `0` means that the body may slide indefinitely.
			 * A value of `1` means the body may come to a stop almost instantly after a force is applied.
			 *
			 * The effects of the value may be non-linear. 
			 * High values may be unstable depending on the body.
			 * The engine uses a Coulomb friction model including static and kinetic friction.
			 * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
			 *
			 *     Math.min(bodyA.friction, bodyB.friction)
			 *
			 * @property friction
			 * @type number
			 * @default 0.1
			 */
	
			/**
			 * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
			 * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
			 * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
			 * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
			 *
			 * @property frictionStatic
			 * @type number
			 * @default 0.5
			 */
	
			/**
			 * A `Number` that defines the air friction of the body (air resistance). 
			 * A value of `0` means the body will never slow as it moves through space.
			 * The higher the value, the faster a body slows when moving through space.
			 * The effects of the value are non-linear. 
			 *
			 * @property frictionAir
			 * @type number
			 * @default 0.01
			 */
	
			/**
			 * An `Object` that specifies the collision filtering properties of this body.
			 *
			 * Collisions between two bodies will obey the following rules:
			 * - If the two bodies have the same non-zero value of `collisionFilter.group`,
			 *   they will always collide if the value is positive, and they will never collide
			 *   if the value is negative.
			 * - If the two bodies have different values of `collisionFilter.group` or if one
			 *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
			 *
			 * Each body belongs to a collision category, given by `collisionFilter.category`. This
			 * value is used as a bit field and the category should have only one bit set, meaning that
			 * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
			 * different collision categories available.
			 *
			 * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
			 * the categories it collides with (the value is the bitwise AND value of all these categories).
			 *
			 * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
			 * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
			 * are both true.
			 *
			 * @property collisionFilter
			 * @type object
			 */
	
			/**
			 * An Integer `Number`, that specifies the collision group this body belongs to.
			 * See `body.collisionFilter` for more information.
			 *
			 * @property collisionFilter.group
			 * @type object
			 * @default 0
			 */
	
			/**
			 * A bit field that specifies the collision category this body belongs to.
			 * The category value should have only one bit set, for example `0x0001`.
			 * This means there are up to 32 unique collision categories available.
			 * See `body.collisionFilter` for more information.
			 *
			 * @property collisionFilter.category
			 * @type object
			 * @default 1
			 */
	
			/**
			 * A bit mask that specifies the collision categories this body may collide with.
			 * See `body.collisionFilter` for more information.
			 *
			 * @property collisionFilter.mask
			 * @type object
			 * @default -1
			 */
	
			/**
			 * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
			 * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
			 * The default should generally suffice, although very large bodies may require larger values for stable stacking.
			 *
			 * @property slop
			 * @type number
			 * @default 0.05
			 */
	
			/**
			 * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
			 *
			 * @property timeScale
			 * @type number
			 * @default 1
			 */
	
			/**
			 * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
			 *
			 * @property render
			 * @type object
			 */
	
			/**
			 * A flag that indicates if the body should be rendered.
			 *
			 * @property render.visible
			 * @type boolean
			 * @default true
			 */
	
			/**
			 * Sets the opacity to use when rendering.
			 *
			 * @property render.opacity
			 * @type number
			 * @default 1
			*/
	
			/**
			 * An `Object` that defines the sprite properties to use when rendering, if any.
			 *
			 * @property render.sprite
			 * @type object
			 */
	
			/**
			 * An `String` that defines the path to the image to use as the sprite texture, if any.
			 *
			 * @property render.sprite.texture
			 * @type string
			 */
			 
			/**
			 * A `Number` that defines the scaling in the x-axis for the sprite, if any.
			 *
			 * @property render.sprite.xScale
			 * @type number
			 * @default 1
			 */
	
			/**
			 * A `Number` that defines the scaling in the y-axis for the sprite, if any.
			 *
			 * @property render.sprite.yScale
			 * @type number
			 * @default 1
			 */
	
			 /**
				* A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
				*
				* @property render.sprite.xOffset
				* @type number
				* @default 0
				*/
	
			 /**
				* A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
				*
				* @property render.sprite.yOffset
				* @type number
				* @default 0
				*/
	
			/**
			 * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
			 * A value of `0` means no outline will be rendered.
			 *
			 * @property render.lineWidth
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
			 * It is the same as when using a canvas, so it accepts CSS style property values.
			 *
			 * @property render.fillStyle
			 * @type string
			 * @default a random colour
			 */
	
			/**
			 * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
			 * It is the same as when using a canvas, so it accepts CSS style property values.
			 *
			 * @property render.strokeStyle
			 * @type string
			 * @default a random colour
			 */
	
			/**
			 * An array of unique axis vectors (edge normals) used for collision detection.
			 * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
			 * They are constantly updated by `Body.update` during the simulation.
			 *
			 * @property axes
			 * @type vector[]
			 */
			 
			/**
			 * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
			 *
			 * @property area
			 * @type string
			 * @default 
			 */
	
			/**
			 * A `Bounds` object that defines the AABB region for the body.
			 * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
			 *
			 * @property bounds
			 * @type bounds
			 */
	
	})();
	
	},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31}],2:[function(_dereq_,module,exports){
	/**
	* The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
	* A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
	* It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
	* Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Composite
	*/
	
	var Composite = {};
	
	module.exports = Composite;
	
	var Events = _dereq_('../core/Events');
	var Common = _dereq_('../core/Common');
	var Bounds = _dereq_('../geometry/Bounds');
	var Body = _dereq_('./Body');
	
	(function() {
	
			/**
			 * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properites section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {} [options]
			 * @return {composite} A new composite
			 */
			Composite.create = function(options) {
					return Common.extend({ 
							id: Common.nextId(),
							type: 'composite',
							parent: null,
							isModified: false,
							bodies: [], 
							constraints: [], 
							composites: [],
							label: 'Composite',
							plugin: {}
					}, options);
			};
	
			/**
			 * Sets the composite's `isModified` flag. 
			 * If `updateParents` is true, all parents will be set (default: false).
			 * If `updateChildren` is true, all children will be set (default: false).
			 * @method setModified
			 * @param {composite} composite
			 * @param {boolean} isModified
			 * @param {boolean} [updateParents=false]
			 * @param {boolean} [updateChildren=false]
			 */
			Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
					composite.isModified = isModified;
	
					if (updateParents && composite.parent) {
							Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
					}
	
					if (updateChildren) {
							for(var i = 0; i < composite.composites.length; i++) {
									var childComposite = composite.composites[i];
									Composite.setModified(childComposite, isModified, updateParents, updateChildren);
							}
					}
			};
	
			/**
			 * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
			 * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
			 * @method add
			 * @param {composite} composite
			 * @param {} object
			 * @return {composite} The original composite with the objects added
			 */
			Composite.add = function(composite, object) {
					var objects = [].concat(object);
	
					Events.trigger(composite, 'beforeAdd', { object: object });
	
					for (var i = 0; i < objects.length; i++) {
							var obj = objects[i];
	
							switch (obj.type) {
	
							case 'body':
									// skip adding compound parts
									if (obj.parent !== obj) {
											Common.warn('Composite.add: skipped adding a compound body part (you must add its parent instead)');
											break;
									}
	
									Composite.addBody(composite, obj);
									break;
							case 'constraint':
									Composite.addConstraint(composite, obj);
									break;
							case 'composite':
									Composite.addComposite(composite, obj);
									break;
							case 'mouseConstraint':
									Composite.addConstraint(composite, obj.constraint);
									break;
	
							}
					}
	
					Events.trigger(composite, 'afterAdd', { object: object });
	
					return composite;
			};
	
			/**
			 * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
			 * Optionally searching its children recursively.
			 * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
			 * @method remove
			 * @param {composite} composite
			 * @param {} object
			 * @param {boolean} [deep=false]
			 * @return {composite} The original composite with the objects removed
			 */
			Composite.remove = function(composite, object, deep) {
					var objects = [].concat(object);
	
					Events.trigger(composite, 'beforeRemove', { object: object });
	
					for (var i = 0; i < objects.length; i++) {
							var obj = objects[i];
	
							switch (obj.type) {
	
							case 'body':
									Composite.removeBody(composite, obj, deep);
									break;
							case 'constraint':
									Composite.removeConstraint(composite, obj, deep);
									break;
							case 'composite':
									Composite.removeComposite(composite, obj, deep);
									break;
							case 'mouseConstraint':
									Composite.removeConstraint(composite, obj.constraint);
									break;
	
							}
					}
	
					Events.trigger(composite, 'afterRemove', { object: object });
	
					return composite;
			};
	
			/**
			 * Adds a composite to the given composite.
			 * @private
			 * @method addComposite
			 * @param {composite} compositeA
			 * @param {composite} compositeB
			 * @return {composite} The original compositeA with the objects from compositeB added
			 */
			Composite.addComposite = function(compositeA, compositeB) {
					compositeA.composites.push(compositeB);
					compositeB.parent = compositeA;
					Composite.setModified(compositeA, true, true, false);
					return compositeA;
			};
	
			/**
			 * Removes a composite from the given composite, and optionally searching its children recursively.
			 * @private
			 * @method removeComposite
			 * @param {composite} compositeA
			 * @param {composite} compositeB
			 * @param {boolean} [deep=false]
			 * @return {composite} The original compositeA with the composite removed
			 */
			Composite.removeComposite = function(compositeA, compositeB, deep) {
					var position = Common.indexOf(compositeA.composites, compositeB);
					if (position !== -1) {
							Composite.removeCompositeAt(compositeA, position);
							Composite.setModified(compositeA, true, true, false);
					}
	
					if (deep) {
							for (var i = 0; i < compositeA.composites.length; i++){
									Composite.removeComposite(compositeA.composites[i], compositeB, true);
							}
					}
	
					return compositeA;
			};
	
			/**
			 * Removes a composite from the given composite.
			 * @private
			 * @method removeCompositeAt
			 * @param {composite} composite
			 * @param {number} position
			 * @return {composite} The original composite with the composite removed
			 */
			Composite.removeCompositeAt = function(composite, position) {
					composite.composites.splice(position, 1);
					Composite.setModified(composite, true, true, false);
					return composite;
			};
	
			/**
			 * Adds a body to the given composite.
			 * @private
			 * @method addBody
			 * @param {composite} composite
			 * @param {body} body
			 * @return {composite} The original composite with the body added
			 */
			Composite.addBody = function(composite, body) {
					composite.bodies.push(body);
					Composite.setModified(composite, true, true, false);
					return composite;
			};
	
			/**
			 * Removes a body from the given composite, and optionally searching its children recursively.
			 * @private
			 * @method removeBody
			 * @param {composite} composite
			 * @param {body} body
			 * @param {boolean} [deep=false]
			 * @return {composite} The original composite with the body removed
			 */
			Composite.removeBody = function(composite, body, deep) {
					var position = Common.indexOf(composite.bodies, body);
					if (position !== -1) {
							Composite.removeBodyAt(composite, position);
							Composite.setModified(composite, true, true, false);
					}
	
					if (deep) {
							for (var i = 0; i < composite.composites.length; i++){
									Composite.removeBody(composite.composites[i], body, true);
							}
					}
	
					return composite;
			};
	
			/**
			 * Removes a body from the given composite.
			 * @private
			 * @method removeBodyAt
			 * @param {composite} composite
			 * @param {number} position
			 * @return {composite} The original composite with the body removed
			 */
			Composite.removeBodyAt = function(composite, position) {
					composite.bodies.splice(position, 1);
					Composite.setModified(composite, true, true, false);
					return composite;
			};
	
			/**
			 * Adds a constraint to the given composite.
			 * @private
			 * @method addConstraint
			 * @param {composite} composite
			 * @param {constraint} constraint
			 * @return {composite} The original composite with the constraint added
			 */
			Composite.addConstraint = function(composite, constraint) {
					composite.constraints.push(constraint);
					Composite.setModified(composite, true, true, false);
					return composite;
			};
	
			/**
			 * Removes a constraint from the given composite, and optionally searching its children recursively.
			 * @private
			 * @method removeConstraint
			 * @param {composite} composite
			 * @param {constraint} constraint
			 * @param {boolean} [deep=false]
			 * @return {composite} The original composite with the constraint removed
			 */
			Composite.removeConstraint = function(composite, constraint, deep) {
					var position = Common.indexOf(composite.constraints, constraint);
					if (position !== -1) {
							Composite.removeConstraintAt(composite, position);
					}
	
					if (deep) {
							for (var i = 0; i < composite.composites.length; i++){
									Composite.removeConstraint(composite.composites[i], constraint, true);
							}
					}
	
					return composite;
			};
	
			/**
			 * Removes a body from the given composite.
			 * @private
			 * @method removeConstraintAt
			 * @param {composite} composite
			 * @param {number} position
			 * @return {composite} The original composite with the constraint removed
			 */
			Composite.removeConstraintAt = function(composite, position) {
					composite.constraints.splice(position, 1);
					Composite.setModified(composite, true, true, false);
					return composite;
			};
	
			/**
			 * Removes all bodies, constraints and composites from the given composite.
			 * Optionally clearing its children recursively.
			 * @method clear
			 * @param {composite} composite
			 * @param {boolean} keepStatic
			 * @param {boolean} [deep=false]
			 */
			Composite.clear = function(composite, keepStatic, deep) {
					if (deep) {
							for (var i = 0; i < composite.composites.length; i++){
									Composite.clear(composite.composites[i], keepStatic, true);
							}
					}
					
					if (keepStatic) {
							composite.bodies = composite.bodies.filter(function(body) { return body.isStatic; });
					} else {
							composite.bodies.length = 0;
					}
	
					composite.constraints.length = 0;
					composite.composites.length = 0;
					Composite.setModified(composite, true, true, false);
	
					return composite;
			};
	
			/**
			 * Returns all bodies in the given composite, including all bodies in its children, recursively.
			 * @method allBodies
			 * @param {composite} composite
			 * @return {body[]} All the bodies
			 */
			Composite.allBodies = function(composite) {
					var bodies = [].concat(composite.bodies);
	
					for (var i = 0; i < composite.composites.length; i++)
							bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
	
					return bodies;
			};
	
			/**
			 * Returns all constraints in the given composite, including all constraints in its children, recursively.
			 * @method allConstraints
			 * @param {composite} composite
			 * @return {constraint[]} All the constraints
			 */
			Composite.allConstraints = function(composite) {
					var constraints = [].concat(composite.constraints);
	
					for (var i = 0; i < composite.composites.length; i++)
							constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
	
					return constraints;
			};
	
			/**
			 * Returns all composites in the given composite, including all composites in its children, recursively.
			 * @method allComposites
			 * @param {composite} composite
			 * @return {composite[]} All the composites
			 */
			Composite.allComposites = function(composite) {
					var composites = [].concat(composite.composites);
	
					for (var i = 0; i < composite.composites.length; i++)
							composites = composites.concat(Composite.allComposites(composite.composites[i]));
	
					return composites;
			};
	
			/**
			 * Searches the composite recursively for an object matching the type and id supplied, null if not found.
			 * @method get
			 * @param {composite} composite
			 * @param {number} id
			 * @param {string} type
			 * @return {object} The requested object, if found
			 */
			Composite.get = function(composite, id, type) {
					var objects,
							object;
	
					switch (type) {
					case 'body':
							objects = Composite.allBodies(composite);
							break;
					case 'constraint':
							objects = Composite.allConstraints(composite);
							break;
					case 'composite':
							objects = Composite.allComposites(composite).concat(composite);
							break;
					}
	
					if (!objects)
							return null;
	
					object = objects.filter(function(object) { 
							return object.id.toString() === id.toString(); 
					});
	
					return object.length === 0 ? null : object[0];
			};
	
			/**
			 * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
			 * @method move
			 * @param {compositeA} compositeA
			 * @param {object[]} objects
			 * @param {compositeB} compositeB
			 * @return {composite} Returns compositeA
			 */
			Composite.move = function(compositeA, objects, compositeB) {
					Composite.remove(compositeA, objects);
					Composite.add(compositeB, objects);
					return compositeA;
			};
	
			/**
			 * Assigns new ids for all objects in the composite, recursively.
			 * @method rebase
			 * @param {composite} composite
			 * @return {composite} Returns composite
			 */
			Composite.rebase = function(composite) {
					var objects = Composite.allBodies(composite)
													.concat(Composite.allConstraints(composite))
													.concat(Composite.allComposites(composite));
	
					for (var i = 0; i < objects.length; i++) {
							objects[i].id = Common.nextId();
					}
	
					Composite.setModified(composite, true, true, false);
	
					return composite;
			};
	
			/**
			 * Translates all children in the composite by a given vector relative to their current positions, 
			 * without imparting any velocity.
			 * @method translate
			 * @param {composite} composite
			 * @param {vector} translation
			 * @param {bool} [recursive=true]
			 */
			Composite.translate = function(composite, translation, recursive) {
					var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
	
					for (var i = 0; i < bodies.length; i++) {
							Body.translate(bodies[i], translation);
					}
	
					Composite.setModified(composite, true, true, false);
	
					return composite;
			};
	
			/**
			 * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
			 * @method rotate
			 * @param {composite} composite
			 * @param {number} rotation
			 * @param {vector} point
			 * @param {bool} [recursive=true]
			 */
			Composite.rotate = function(composite, rotation, point, recursive) {
					var cos = Math.cos(rotation),
							sin = Math.sin(rotation),
							bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									dx = body.position.x - point.x,
									dy = body.position.y - point.y;
									
							Body.setPosition(body, {
									x: point.x + (dx * cos - dy * sin),
									y: point.y + (dx * sin + dy * cos)
							});
	
							Body.rotate(body, rotation);
					}
	
					Composite.setModified(composite, true, true, false);
	
					return composite;
			};
	
			/**
			 * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
			 * @method scale
			 * @param {composite} composite
			 * @param {number} scaleX
			 * @param {number} scaleY
			 * @param {vector} point
			 * @param {bool} [recursive=true]
			 */
			Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
					var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									dx = body.position.x - point.x,
									dy = body.position.y - point.y;
									
							Body.setPosition(body, {
									x: point.x + dx * scaleX,
									y: point.y + dy * scaleY
							});
	
							Body.scale(body, scaleX, scaleY);
					}
	
					Composite.setModified(composite, true, true, false);
	
					return composite;
			};
	
			/**
			 * Returns the union of the bounds of all of the composite's bodies.
			 * @method bounds
			 * @param {composite} composite The composite.
			 * @returns {bounds} The composite bounds.
			 */
			Composite.bounds = function(composite) {
					var bodies = Composite.allBodies(composite),
							vertices = [];
	
					for (var i = 0; i < bodies.length; i += 1) {
							var body = bodies[i];
							vertices.push(body.bounds.min, body.bounds.max);
					}
	
					return Bounds.create(vertices);
			};
	
			/*
			*
			*  Events Documentation
			*
			*/
	
			/**
			* Fired when a call to `Composite.add` is made, before objects have been added.
			*
			* @event beforeAdd
			* @param {} event An event object
			* @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when a call to `Composite.add` is made, after objects have been added.
			*
			* @event afterAdd
			* @param {} event An event object
			* @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when a call to `Composite.remove` is made, before objects have been removed.
			*
			* @event beforeRemove
			* @param {} event An event object
			* @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when a call to `Composite.remove` is made, after objects have been removed.
			*
			* @event afterRemove
			* @param {} event An event object
			* @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
			 *
			 * @property id
			 * @type number
			 */
	
			/**
			 * A `String` denoting the type of object.
			 *
			 * @property type
			 * @type string
			 * @default "composite"
			 * @readOnly
			 */
	
			/**
			 * An arbitrary `String` name to help the user identify and manage composites.
			 *
			 * @property label
			 * @type string
			 * @default "Composite"
			 */
	
			/**
			 * A flag that specifies whether the composite has been modified during the current step.
			 * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
			 * If you need to change it manually, you should use the `Composite.setModified` method.
			 *
			 * @property isModified
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
			 *
			 * @property parent
			 * @type composite
			 * @default null
			 */
	
			/**
			 * An array of `Body` that are _direct_ children of this composite.
			 * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
			 * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
			 *
			 * @property bodies
			 * @type body[]
			 * @default []
			 */
	
			/**
			 * An array of `Constraint` that are _direct_ children of this composite.
			 * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
			 * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
			 *
			 * @property constraints
			 * @type constraint[]
			 * @default []
			 */
	
			/**
			 * An array of `Composite` that are _direct_ children of this composite.
			 * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
			 * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
			 *
			 * @property composites
			 * @type composite[]
			 * @default []
			 */
	
			/**
			 * An object reserved for storing plugin-specific properties.
			 *
			 * @property plugin
			 * @type {}
			 */
	
	})();
	
	},{"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"./Body":1}],3:[function(_dereq_,module,exports){
	/**
	* The `Matter.World` module contains methods for creating and manipulating the world composite.
	* A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
	* A `Matter.World` has a few additional properties including `gravity` and `bounds`.
	* It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
	* There are also a few methods here that alias those in `Matter.Composite` for easier readability.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class World
	* @extends Composite
	*/
	
	var World = {};
	
	module.exports = World;
	
	var Composite = _dereq_('./Composite');
	var Constraint = _dereq_('../constraint/Constraint');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @constructor
			 * @param {} options
			 * @return {world} A new world
			 */
			World.create = function(options) {
					var composite = Composite.create();
	
					var defaults = {
							label: 'World',
							gravity: {
									x: 0,
									y: 1,
									scale: 0.001
							},
							bounds: { 
									min: { x: -Infinity, y: -Infinity }, 
									max: { x: Infinity, y: Infinity } 
							}
					};
					
					return Common.extend(composite, defaults, options);
			};
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * The gravity to apply on the world.
			 *
			 * @property gravity
			 * @type object
			 */
	
			/**
			 * The gravity x component.
			 *
			 * @property gravity.x
			 * @type object
			 * @default 0
			 */
	
			/**
			 * The gravity y component.
			 *
			 * @property gravity.y
			 * @type object
			 * @default 1
			 */
	
			/**
			 * The gravity scale factor.
			 *
			 * @property gravity.scale
			 * @type object
			 * @default 0.001
			 */
	
			/**
			 * A `Bounds` object that defines the world bounds for collision detection.
			 *
			 * @property bounds
			 * @type bounds
			 * @default { min: { x: -Infinity, y: -Infinity }, max: { x: Infinity, y: Infinity } }
			 */
	
			// World is a Composite body
			// see src/module/Outro.js for these aliases:
			
			/**
			 * An alias for Composite.add
			 * @method add
			 * @param {world} world
			 * @param {} object
			 * @return {composite} The original world with the objects added
			 */
	
			/**
			 * An alias for Composite.remove
			 * @method remove
			 * @param {world} world
			 * @param {} object
			 * @param {boolean} [deep=false]
			 * @return {composite} The original world with the objects removed
			 */
	
			/**
			 * An alias for Composite.clear
			 * @method clear
			 * @param {world} world
			 * @param {boolean} keepStatic
			 */
	
			/**
			 * An alias for Composite.addComposite
			 * @method addComposite
			 * @param {world} world
			 * @param {composite} composite
			 * @return {world} The original world with the objects from composite added
			 */
			
			 /**
				* An alias for Composite.addBody
				* @method addBody
				* @param {world} world
				* @param {body} body
				* @return {world} The original world with the body added
				*/
	
			 /**
				* An alias for Composite.addConstraint
				* @method addConstraint
				* @param {world} world
				* @param {constraint} constraint
				* @return {world} The original world with the constraint added
				*/
	
	})();
	
	},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(_dereq_,module,exports){
	/**
	* The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
	*
	* @class Contact
	*/
	
	var Contact = {};
	
	module.exports = Contact;
	
	(function() {
	
			/**
			 * Creates a new contact.
			 * @method create
			 * @param {vertex} vertex
			 * @return {contact} A new contact
			 */
			Contact.create = function(vertex) {
					return {
							id: Contact.id(vertex),
							vertex: vertex,
							normalImpulse: 0,
							tangentImpulse: 0
					};
			};
			
			/**
			 * Generates a contact id.
			 * @method id
			 * @param {vertex} vertex
			 * @return {string} Unique contactID
			 */
			Contact.id = function(vertex) {
					return vertex.body.id + '_' + vertex.index;
			};
	
	})();
	
	},{}],5:[function(_dereq_,module,exports){
	/**
	* The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
	*
	* @class Detector
	*/
	
	// TODO: speculative contacts
	
	var Detector = {};
	
	module.exports = Detector;
	
	var SAT = _dereq_('./SAT');
	var Pair = _dereq_('./Pair');
	var Bounds = _dereq_('../geometry/Bounds');
	
	(function() {
	
			/**
			 * Finds all collisions given a list of pairs.
			 * @method collisions
			 * @param {pair[]} broadphasePairs
			 * @param {engine} engine
			 * @return {array} collisions
			 */
			Detector.collisions = function(broadphasePairs, engine) {
					var collisions = [],
							pairsTable = engine.pairs.table;
	
					
					for (var i = 0; i < broadphasePairs.length; i++) {
							var bodyA = broadphasePairs[i][0], 
									bodyB = broadphasePairs[i][1];
	
							if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
									continue;
							
							if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
									continue;
	
	
							// mid phase
							if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {
									for (var j = bodyA.parts.length > 1 ? 1 : 0; j < bodyA.parts.length; j++) {
											var partA = bodyA.parts[j];
	
											for (var k = bodyB.parts.length > 1 ? 1 : 0; k < bodyB.parts.length; k++) {
													var partB = bodyB.parts[k];
	
													if ((partA === bodyA && partB === bodyB) || Bounds.overlaps(partA.bounds, partB.bounds)) {
															// find a previous collision we could reuse
															var pairId = Pair.id(partA, partB),
																	pair = pairsTable[pairId],
																	previousCollision;
	
															if (pair && pair.isActive) {
																	previousCollision = pair.collision;
															} else {
																	previousCollision = null;
															}
	
															// narrow phase
															var collision = SAT.collides(partA, partB, previousCollision);
	
	
															if (collision.collided) {
																	collisions.push(collision);
															}
													}
											}
									}
							}
					}
	
					return collisions;
			};
	
			/**
			 * Returns `true` if both supplied collision filters will allow a collision to occur.
			 * See `body.collisionFilter` for more information.
			 * @method canCollide
			 * @param {} filterA
			 * @param {} filterB
			 * @return {bool} `true` if collision can occur
			 */
			Detector.canCollide = function(filterA, filterB) {
					if (filterA.group === filterB.group && filterA.group !== 0)
							return filterA.group > 0;
	
					return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
			};
	
	})();
	
	},{"../geometry/Bounds":26,"./Pair":7,"./SAT":11}],6:[function(_dereq_,module,exports){
	/**
	* The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
	*
	* @class Grid
	*/
	
	var Grid = {};
	
	module.exports = Grid;
	
	var Pair = _dereq_('./Pair');
	var Detector = _dereq_('./Detector');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Creates a new grid.
			 * @method create
			 * @param {} options
			 * @return {grid} A new grid
			 */
			Grid.create = function(options) {
					var defaults = {
							controller: Grid,
							detector: Detector.collisions,
							buckets: {},
							pairs: {},
							pairsList: [],
							bucketWidth: 48,
							bucketHeight: 48
					};
	
					return Common.extend(defaults, options);
			};
	
			/**
			 * The width of a single grid bucket.
			 *
			 * @property bucketWidth
			 * @type number
			 * @default 48
			 */
	
			/**
			 * The height of a single grid bucket.
			 *
			 * @property bucketHeight
			 * @type number
			 * @default 48
			 */
	
			/**
			 * Updates the grid.
			 * @method update
			 * @param {grid} grid
			 * @param {body[]} bodies
			 * @param {engine} engine
			 * @param {boolean} forceUpdate
			 */
			Grid.update = function(grid, bodies, engine, forceUpdate) {
					var i, col, row,
							world = engine.world,
							buckets = grid.buckets,
							bucket,
							bucketId,
							gridChanged = false;
	
	
					for (i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (body.isSleeping && !forceUpdate)
									continue;
	
							// don't update out of world bodies
							if (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x
									|| body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y)
									continue;
	
							var newRegion = Grid._getRegion(grid, body);
	
							// if the body has changed grid region
							if (!body.region || newRegion.id !== body.region.id || forceUpdate) {
	
	
									if (!body.region || forceUpdate)
											body.region = newRegion;
	
									var union = Grid._regionUnion(newRegion, body.region);
	
									// update grid buckets affected by region change
									// iterate over the union of both regions
									for (col = union.startCol; col <= union.endCol; col++) {
											for (row = union.startRow; row <= union.endRow; row++) {
													bucketId = Grid._getBucketId(col, row);
													bucket = buckets[bucketId];
	
													var isInsideNewRegion = (col >= newRegion.startCol && col <= newRegion.endCol
																									&& row >= newRegion.startRow && row <= newRegion.endRow);
	
													var isInsideOldRegion = (col >= body.region.startCol && col <= body.region.endCol
																									&& row >= body.region.startRow && row <= body.region.endRow);
	
													// remove from old region buckets
													if (!isInsideNewRegion && isInsideOldRegion) {
															if (isInsideOldRegion) {
																	if (bucket)
																			Grid._bucketRemoveBody(grid, bucket, body);
															}
													}
	
													// add to new region buckets
													if (body.region === newRegion || (isInsideNewRegion && !isInsideOldRegion) || forceUpdate) {
															if (!bucket)
																	bucket = Grid._createBucket(buckets, bucketId);
															Grid._bucketAddBody(grid, bucket, body);
													}
											}
									}
	
									// set the new region
									body.region = newRegion;
	
									// flag changes so we can update pairs
									gridChanged = true;
							}
					}
	
					// update pairs list only if pairs changed (i.e. a body changed region)
					if (gridChanged)
							grid.pairsList = Grid._createActivePairsList(grid);
			};
	
			/**
			 * Clears the grid.
			 * @method clear
			 * @param {grid} grid
			 */
			Grid.clear = function(grid) {
					grid.buckets = {};
					grid.pairs = {};
					grid.pairsList = [];
			};
	
			/**
			 * Finds the union of two regions.
			 * @method _regionUnion
			 * @private
			 * @param {} regionA
			 * @param {} regionB
			 * @return {} region
			 */
			Grid._regionUnion = function(regionA, regionB) {
					var startCol = Math.min(regionA.startCol, regionB.startCol),
							endCol = Math.max(regionA.endCol, regionB.endCol),
							startRow = Math.min(regionA.startRow, regionB.startRow),
							endRow = Math.max(regionA.endRow, regionB.endRow);
	
					return Grid._createRegion(startCol, endCol, startRow, endRow);
			};
	
			/**
			 * Gets the region a given body falls in for a given grid.
			 * @method _getRegion
			 * @private
			 * @param {} grid
			 * @param {} body
			 * @return {} region
			 */
			Grid._getRegion = function(grid, body) {
					var bounds = body.bounds,
							startCol = Math.floor(bounds.min.x / grid.bucketWidth),
							endCol = Math.floor(bounds.max.x / grid.bucketWidth),
							startRow = Math.floor(bounds.min.y / grid.bucketHeight),
							endRow = Math.floor(bounds.max.y / grid.bucketHeight);
	
					return Grid._createRegion(startCol, endCol, startRow, endRow);
			};
	
			/**
			 * Creates a region.
			 * @method _createRegion
			 * @private
			 * @param {} startCol
			 * @param {} endCol
			 * @param {} startRow
			 * @param {} endRow
			 * @return {} region
			 */
			Grid._createRegion = function(startCol, endCol, startRow, endRow) {
					return { 
							id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
							startCol: startCol, 
							endCol: endCol, 
							startRow: startRow, 
							endRow: endRow 
					};
			};
	
			/**
			 * Gets the bucket id at the given position.
			 * @method _getBucketId
			 * @private
			 * @param {} column
			 * @param {} row
			 * @return {string} bucket id
			 */
			Grid._getBucketId = function(column, row) {
					return 'C' + column + 'R' + row;
			};
	
			/**
			 * Creates a bucket.
			 * @method _createBucket
			 * @private
			 * @param {} buckets
			 * @param {} bucketId
			 * @return {} bucket
			 */
			Grid._createBucket = function(buckets, bucketId) {
					var bucket = buckets[bucketId] = [];
					return bucket;
			};
	
			/**
			 * Adds a body to a bucket.
			 * @method _bucketAddBody
			 * @private
			 * @param {} grid
			 * @param {} bucket
			 * @param {} body
			 */
			Grid._bucketAddBody = function(grid, bucket, body) {
					// add new pairs
					for (var i = 0; i < bucket.length; i++) {
							var bodyB = bucket[i];
	
							if (body.id === bodyB.id || (body.isStatic && bodyB.isStatic))
									continue;
	
							// keep track of the number of buckets the pair exists in
							// important for Grid.update to work
							var pairId = Pair.id(body, bodyB),
									pair = grid.pairs[pairId];
	
							if (pair) {
									pair[2] += 1;
							} else {
									grid.pairs[pairId] = [body, bodyB, 1];
							}
					}
	
					// add to bodies (after pairs, otherwise pairs with self)
					bucket.push(body);
			};
	
			/**
			 * Removes a body from a bucket.
			 * @method _bucketRemoveBody
			 * @private
			 * @param {} grid
			 * @param {} bucket
			 * @param {} body
			 */
			Grid._bucketRemoveBody = function(grid, bucket, body) {
					// remove from bucket
					bucket.splice(Common.indexOf(bucket, body), 1);
	
					// update pair counts
					for (var i = 0; i < bucket.length; i++) {
							// keep track of the number of buckets the pair exists in
							// important for _createActivePairsList to work
							var bodyB = bucket[i],
									pairId = Pair.id(body, bodyB),
									pair = grid.pairs[pairId];
	
							if (pair)
									pair[2] -= 1;
					}
			};
	
			/**
			 * Generates a list of the active pairs in the grid.
			 * @method _createActivePairsList
			 * @private
			 * @param {} grid
			 * @return [] pairs
			 */
			Grid._createActivePairsList = function(grid) {
					var pairKeys,
							pair,
							pairs = [];
	
					// grid.pairs is used as a hashmap
					pairKeys = Common.keys(grid.pairs);
	
					// iterate over grid.pairs
					for (var k = 0; k < pairKeys.length; k++) {
							pair = grid.pairs[pairKeys[k]];
	
							// if pair exists in at least one bucket
							// it is a pair that needs further collision testing so push it
							if (pair[2] > 0) {
									pairs.push(pair);
							} else {
									delete grid.pairs[pairKeys[k]];
							}
					}
	
					return pairs;
			};
			
	})();
	
	},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(_dereq_,module,exports){
	/**
	* The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
	*
	* @class Pair
	*/
	
	var Pair = {};
	
	module.exports = Pair;
	
	var Contact = _dereq_('./Contact');
	
	(function() {
			
			/**
			 * Creates a pair.
			 * @method create
			 * @param {collision} collision
			 * @param {number} timestamp
			 * @return {pair} A new pair
			 */
			Pair.create = function(collision, timestamp) {
					var bodyA = collision.bodyA,
							bodyB = collision.bodyB,
							parentA = collision.parentA,
							parentB = collision.parentB;
	
					var pair = {
							id: Pair.id(bodyA, bodyB),
							bodyA: bodyA,
							bodyB: bodyB,
							contacts: {},
							activeContacts: [],
							separation: 0,
							isActive: true,
							isSensor: bodyA.isSensor || bodyB.isSensor,
							timeCreated: timestamp,
							timeUpdated: timestamp,
							inverseMass: parentA.inverseMass + parentB.inverseMass,
							friction: Math.min(parentA.friction, parentB.friction),
							frictionStatic: Math.max(parentA.frictionStatic, parentB.frictionStatic),
							restitution: Math.max(parentA.restitution, parentB.restitution),
							slop: Math.max(parentA.slop, parentB.slop)
					};
	
					Pair.update(pair, collision, timestamp);
	
					return pair;
			};
	
			/**
			 * Updates a pair given a collision.
			 * @method update
			 * @param {pair} pair
			 * @param {collision} collision
			 * @param {number} timestamp
			 */
			Pair.update = function(pair, collision, timestamp) {
					var contacts = pair.contacts,
							supports = collision.supports,
							activeContacts = pair.activeContacts,
							parentA = collision.parentA,
							parentB = collision.parentB;
					
					pair.collision = collision;
					pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
					pair.friction = Math.min(parentA.friction, parentB.friction);
					pair.frictionStatic = Math.max(parentA.frictionStatic, parentB.frictionStatic);
					pair.restitution = Math.max(parentA.restitution, parentB.restitution);
					pair.slop = Math.max(parentA.slop, parentB.slop);
					activeContacts.length = 0;
					
					if (collision.collided) {
							for (var i = 0; i < supports.length; i++) {
									var support = supports[i],
											contactId = Contact.id(support),
											contact = contacts[contactId];
	
									if (contact) {
											activeContacts.push(contact);
									} else {
											activeContacts.push(contacts[contactId] = Contact.create(support));
									}
							}
	
							pair.separation = collision.depth;
							Pair.setActive(pair, true, timestamp);
					} else {
							if (pair.isActive === true)
									Pair.setActive(pair, false, timestamp);
					}
			};
			
			/**
			 * Set a pair as active or inactive.
			 * @method setActive
			 * @param {pair} pair
			 * @param {bool} isActive
			 * @param {number} timestamp
			 */
			Pair.setActive = function(pair, isActive, timestamp) {
					if (isActive) {
							pair.isActive = true;
							pair.timeUpdated = timestamp;
					} else {
							pair.isActive = false;
							pair.activeContacts.length = 0;
					}
			};
	
			/**
			 * Get the id for the given pair.
			 * @method id
			 * @param {body} bodyA
			 * @param {body} bodyB
			 * @return {string} Unique pairId
			 */
			Pair.id = function(bodyA, bodyB) {
					if (bodyA.id < bodyB.id) {
							return 'A' + bodyA.id + 'B' + bodyB.id;
					} else {
							return 'A' + bodyB.id + 'B' + bodyA.id;
					}
			};
	
	})();
	
	},{"./Contact":4}],8:[function(_dereq_,module,exports){
	/**
	* The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
	*
	* @class Pairs
	*/
	
	var Pairs = {};
	
	module.exports = Pairs;
	
	var Pair = _dereq_('./Pair');
	var Common = _dereq_('../core/Common');
	
	(function() {
			
			Pairs._pairMaxIdleLife = 1000;
	
			/**
			 * Creates a new pairs structure.
			 * @method create
			 * @param {object} options
			 * @return {pairs} A new pairs structure
			 */
			Pairs.create = function(options) {
					return Common.extend({ 
							table: {},
							list: [],
							collisionStart: [],
							collisionActive: [],
							collisionEnd: []
					}, options);
			};
	
			/**
			 * Updates pairs given a list of collisions.
			 * @method update
			 * @param {object} pairs
			 * @param {collision[]} collisions
			 * @param {number} timestamp
			 */
			Pairs.update = function(pairs, collisions, timestamp) {
					var pairsList = pairs.list,
							pairsTable = pairs.table,
							collisionStart = pairs.collisionStart,
							collisionEnd = pairs.collisionEnd,
							collisionActive = pairs.collisionActive,
							activePairIds = [],
							collision,
							pairId,
							pair,
							i;
	
					// clear collision state arrays, but maintain old reference
					collisionStart.length = 0;
					collisionEnd.length = 0;
					collisionActive.length = 0;
	
					for (i = 0; i < collisions.length; i++) {
							collision = collisions[i];
	
							if (collision.collided) {
									pairId = Pair.id(collision.bodyA, collision.bodyB);
									activePairIds.push(pairId);
	
									pair = pairsTable[pairId];
									
									if (pair) {
											// pair already exists (but may or may not be active)
											if (pair.isActive) {
													// pair exists and is active
													collisionActive.push(pair);
											} else {
													// pair exists but was inactive, so a collision has just started again
													collisionStart.push(pair);
											}
	
											// update the pair
											Pair.update(pair, collision, timestamp);
									} else {
											// pair did not exist, create a new pair
											pair = Pair.create(collision, timestamp);
											pairsTable[pairId] = pair;
	
											// push the new pair
											collisionStart.push(pair);
											pairsList.push(pair);
									}
							}
					}
	
					// deactivate previously active pairs that are now inactive
					for (i = 0; i < pairsList.length; i++) {
							pair = pairsList[i];
							if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
									Pair.setActive(pair, false, timestamp);
									collisionEnd.push(pair);
							}
					}
			};
			
			/**
			 * Finds and removes pairs that have been inactive for a set amount of time.
			 * @method removeOld
			 * @param {object} pairs
			 * @param {number} timestamp
			 */
			Pairs.removeOld = function(pairs, timestamp) {
					var pairsList = pairs.list,
							pairsTable = pairs.table,
							indexesToRemove = [],
							pair,
							collision,
							pairIndex,
							i;
	
					for (i = 0; i < pairsList.length; i++) {
							pair = pairsList[i];
							collision = pair.collision;
							
							// never remove sleeping pairs
							if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
									pair.timeUpdated = timestamp;
									continue;
							}
	
							// if pair is inactive for too long, mark it to be removed
							if (timestamp - pair.timeUpdated > Pairs._pairMaxIdleLife) {
									indexesToRemove.push(i);
							}
					}
	
					// remove marked pairs
					for (i = 0; i < indexesToRemove.length; i++) {
							pairIndex = indexesToRemove[i] - i;
							pair = pairsList[pairIndex];
							delete pairsTable[pair.id];
							pairsList.splice(pairIndex, 1);
					}
			};
	
			/**
			 * Clears the given pairs structure.
			 * @method clear
			 * @param {pairs} pairs
			 * @return {pairs} pairs
			 */
			Pairs.clear = function(pairs) {
					pairs.table = {};
					pairs.list.length = 0;
					pairs.collisionStart.length = 0;
					pairs.collisionActive.length = 0;
					pairs.collisionEnd.length = 0;
					return pairs;
			};
	
	})();
	
	},{"../core/Common":14,"./Pair":7}],9:[function(_dereq_,module,exports){
	/**
	* The `Matter.Query` module contains methods for performing collision queries.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Query
	*/
	
	var Query = {};
	
	module.exports = Query;
	
	var Vector = _dereq_('../geometry/Vector');
	var SAT = _dereq_('./SAT');
	var Bounds = _dereq_('../geometry/Bounds');
	var Bodies = _dereq_('../factory/Bodies');
	var Vertices = _dereq_('../geometry/Vertices');
	
	(function() {
	
			/**
			 * Returns a list of collisions between `body` and `bodies`.
			 * @method collides
			 * @param {body} body
			 * @param {body[]} bodies
			 * @return {object[]} Collisions
			 */
			Query.collides = function(body, bodies) {
					var collisions = [];
	
					for (var i = 0; i < bodies.length; i++) {
							var bodyA = bodies[i];
							
							if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
									for (var j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
											var part = bodyA.parts[j];
	
											if (Bounds.overlaps(part.bounds, body.bounds)) {
													var collision = SAT.collides(part, body);
	
													if (collision.collided) {
															collisions.push(collision);
															break;
													}
											}
									}
							}
					}
	
					return collisions;
			};
	
			/**
			 * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
			 * @method ray
			 * @param {body[]} bodies
			 * @param {vector} startPoint
			 * @param {vector} endPoint
			 * @param {number} [rayWidth]
			 * @return {object[]} Collisions
			 */
			Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
					rayWidth = rayWidth || 1e-100;
	
					var rayAngle = Vector.angle(startPoint, endPoint),
							rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
							rayX = (endPoint.x + startPoint.x) * 0.5,
							rayY = (endPoint.y + startPoint.y) * 0.5,
							ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
							collisions = Query.collides(ray, bodies);
	
					for (var i = 0; i < collisions.length; i += 1) {
							var collision = collisions[i];
							collision.body = collision.bodyB = collision.bodyA;            
					}
	
					return collisions;
			};
	
			/**
			 * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
			 * @method region
			 * @param {body[]} bodies
			 * @param {bounds} bounds
			 * @param {bool} [outside=false]
			 * @return {body[]} The bodies matching the query
			 */
			Query.region = function(bodies, bounds, outside) {
					var result = [];
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									overlaps = Bounds.overlaps(body.bounds, bounds);
							if ((overlaps && !outside) || (!overlaps && outside))
									result.push(body);
					}
	
					return result;
			};
	
			/**
			 * Returns all bodies whose vertices contain the given point, from the given set of bodies.
			 * @method point
			 * @param {body[]} bodies
			 * @param {vector} point
			 * @return {body[]} The bodies matching the query
			 */
			Query.point = function(bodies, point) {
					var result = [];
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
							
							if (Bounds.contains(body.bounds, point)) {
									for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
											var part = body.parts[j];
	
											if (Bounds.contains(part.bounds, point)
													&& Vertices.contains(part.vertices, point)) {
													result.push(body);
													break;
											}
									}
							}
					}
	
					return result;
			};
	
	})();
	
	},{"../factory/Bodies":23,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"./SAT":11}],10:[function(_dereq_,module,exports){
	/**
	* The `Matter.Resolver` module contains methods for resolving collision pairs.
	*
	* @class Resolver
	*/
	
	var Resolver = {};
	
	module.exports = Resolver;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Vector = _dereq_('../geometry/Vector');
	var Common = _dereq_('../core/Common');
	var Bounds = _dereq_('../geometry/Bounds');
	
	(function() {
	
			Resolver._restingThresh = 4;
			Resolver._restingThreshTangent = 6;
			Resolver._positionDampen = 0.9;
			Resolver._positionWarming = 0.8;
			Resolver._frictionNormalMultiplier = 5;
	
			/**
			 * Prepare pairs for position solving.
			 * @method preSolvePosition
			 * @param {pair[]} pairs
			 */
			Resolver.preSolvePosition = function(pairs) {
					var i,
							pair,
							activeCount;
	
					// find total contacts on each body
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
							
							if (!pair.isActive)
									continue;
							
							activeCount = pair.activeContacts.length;
							pair.collision.parentA.totalContacts += activeCount;
							pair.collision.parentB.totalContacts += activeCount;
					}
			};
	
			/**
			 * Find a solution for pair positions.
			 * @method solvePosition
			 * @param {pair[]} pairs
			 * @param {number} timeScale
			 */
			Resolver.solvePosition = function(pairs, timeScale) {
					var i,
							pair,
							collision,
							bodyA,
							bodyB,
							normal,
							bodyBtoA,
							contactShare,
							positionImpulse,
							contactCount = {},
							tempA = Vector._temp[0],
							tempB = Vector._temp[1],
							tempC = Vector._temp[2],
							tempD = Vector._temp[3];
	
					// find impulses required to resolve penetration
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
							
							if (!pair.isActive || pair.isSensor)
									continue;
	
							collision = pair.collision;
							bodyA = collision.parentA;
							bodyB = collision.parentB;
							normal = collision.normal;
	
							// get current separation between body edges involved in collision
							bodyBtoA = Vector.sub(Vector.add(bodyB.positionImpulse, bodyB.position, tempA), 
																			Vector.add(bodyA.positionImpulse, 
																					Vector.sub(bodyB.position, collision.penetration, tempB), tempC), tempD);
	
							pair.separation = Vector.dot(normal, bodyBtoA);
					}
					
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
	
							if (!pair.isActive || pair.isSensor)
									continue;
							
							collision = pair.collision;
							bodyA = collision.parentA;
							bodyB = collision.parentB;
							normal = collision.normal;
							positionImpulse = (pair.separation - pair.slop) * timeScale;
	
							if (bodyA.isStatic || bodyB.isStatic)
									positionImpulse *= 2;
							
							if (!(bodyA.isStatic || bodyA.isSleeping)) {
									contactShare = Resolver._positionDampen / bodyA.totalContacts;
									bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
									bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
							}
	
							if (!(bodyB.isStatic || bodyB.isSleeping)) {
									contactShare = Resolver._positionDampen / bodyB.totalContacts;
									bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
									bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
							}
					}
			};
	
			/**
			 * Apply position resolution.
			 * @method postSolvePosition
			 * @param {body[]} bodies
			 */
			Resolver.postSolvePosition = function(bodies) {
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							// reset contact count
							body.totalContacts = 0;
	
							if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
									// update body geometry
									for (var j = 0; j < body.parts.length; j++) {
											var part = body.parts[j];
											Vertices.translate(part.vertices, body.positionImpulse);
											Bounds.update(part.bounds, part.vertices, body.velocity);
											part.position.x += body.positionImpulse.x;
											part.position.y += body.positionImpulse.y;
									}
	
									// move the body without changing velocity
									body.positionPrev.x += body.positionImpulse.x;
									body.positionPrev.y += body.positionImpulse.y;
	
									if (Vector.dot(body.positionImpulse, body.velocity) < 0) {
											// reset cached impulse if the body has velocity along it
											body.positionImpulse.x = 0;
											body.positionImpulse.y = 0;
									} else {
											// warm the next iteration
											body.positionImpulse.x *= Resolver._positionWarming;
											body.positionImpulse.y *= Resolver._positionWarming;
									}
							}
					}
			};
	
			/**
			 * Prepare pairs for velocity solving.
			 * @method preSolveVelocity
			 * @param {pair[]} pairs
			 */
			Resolver.preSolveVelocity = function(pairs) {
					var i,
							j,
							pair,
							contacts,
							collision,
							bodyA,
							bodyB,
							normal,
							tangent,
							contact,
							contactVertex,
							normalImpulse,
							tangentImpulse,
							offset,
							impulse = Vector._temp[0],
							tempA = Vector._temp[1];
					
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
							
							if (!pair.isActive || pair.isSensor)
									continue;
							
							contacts = pair.activeContacts;
							collision = pair.collision;
							bodyA = collision.parentA;
							bodyB = collision.parentB;
							normal = collision.normal;
							tangent = collision.tangent;
	
							// resolve each contact
							for (j = 0; j < contacts.length; j++) {
									contact = contacts[j];
									contactVertex = contact.vertex;
									normalImpulse = contact.normalImpulse;
									tangentImpulse = contact.tangentImpulse;
	
									if (normalImpulse !== 0 || tangentImpulse !== 0) {
											// total impulse from contact
											impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
											impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
											
											// apply impulse from contact
											if (!(bodyA.isStatic || bodyA.isSleeping)) {
													offset = Vector.sub(contactVertex, bodyA.position, tempA);
													bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
													bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
													bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
											}
	
											if (!(bodyB.isStatic || bodyB.isSleeping)) {
													offset = Vector.sub(contactVertex, bodyB.position, tempA);
													bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
													bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
													bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
											}
									}
							}
					}
			};
	
			/**
			 * Find a solution for pair velocities.
			 * @method solveVelocity
			 * @param {pair[]} pairs
			 * @param {number} timeScale
			 */
			Resolver.solveVelocity = function(pairs, timeScale) {
					var timeScaleSquared = timeScale * timeScale,
							impulse = Vector._temp[0],
							tempA = Vector._temp[1],
							tempB = Vector._temp[2],
							tempC = Vector._temp[3],
							tempD = Vector._temp[4],
							tempE = Vector._temp[5];
					
					for (var i = 0; i < pairs.length; i++) {
							var pair = pairs[i];
							
							if (!pair.isActive || pair.isSensor)
									continue;
							
							var collision = pair.collision,
									bodyA = collision.parentA,
									bodyB = collision.parentB,
									normal = collision.normal,
									tangent = collision.tangent,
									contacts = pair.activeContacts,
									contactShare = 1 / contacts.length;
	
							// update body velocities
							bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
							bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
							bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
							bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
							bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
							bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;
	
							// resolve each contact
							for (var j = 0; j < contacts.length; j++) {
									var contact = contacts[j],
											contactVertex = contact.vertex,
											offsetA = Vector.sub(contactVertex, bodyA.position, tempA),
											offsetB = Vector.sub(contactVertex, bodyB.position, tempB),
											velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity), tempC),
											velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity), tempD), 
											relativeVelocity = Vector.sub(velocityPointA, velocityPointB, tempE),
											normalVelocity = Vector.dot(normal, relativeVelocity);
	
									var tangentVelocity = Vector.dot(tangent, relativeVelocity),
											tangentSpeed = Math.abs(tangentVelocity),
											tangentVelocityDirection = Common.sign(tangentVelocity);
	
									// raw impulses
									var normalImpulse = (1 + pair.restitution) * normalVelocity,
											normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1) * Resolver._frictionNormalMultiplier;
	
									// coulomb friction
									var tangentImpulse = tangentVelocity,
											maxFriction = Infinity;
	
									if (tangentSpeed > pair.friction * pair.frictionStatic * normalForce * timeScaleSquared) {
											maxFriction = tangentSpeed;
											tangentImpulse = Common.clamp(
													pair.friction * tangentVelocityDirection * timeScaleSquared,
													-maxFriction, maxFriction
											);
									}
	
									// modify impulses accounting for mass, inertia and offset
									var oAcN = Vector.cross(offsetA, normal),
											oBcN = Vector.cross(offsetB, normal),
											share = contactShare / (bodyA.inverseMass + bodyB.inverseMass + bodyA.inverseInertia * oAcN * oAcN  + bodyB.inverseInertia * oBcN * oBcN);
	
									normalImpulse *= share;
									tangentImpulse *= share;
	
									// handle high velocity and resting collisions separately
									if (normalVelocity < 0 && normalVelocity * normalVelocity > Resolver._restingThresh * timeScaleSquared) {
											// high normal velocity so clear cached contact normal impulse
											contact.normalImpulse = 0;
									} else {
											// solve resting collision constraints using Erin Catto's method (GDC08)
											// impulse constraint tends to 0
											var contactNormalImpulse = contact.normalImpulse;
											contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
											normalImpulse = contact.normalImpulse - contactNormalImpulse;
									}
	
									// handle high velocity and resting collisions separately
									if (tangentVelocity * tangentVelocity > Resolver._restingThreshTangent * timeScaleSquared) {
											// high tangent velocity so clear cached contact tangent impulse
											contact.tangentImpulse = 0;
									} else {
											// solve resting collision constraints using Erin Catto's method (GDC08)
											// tangent impulse tends to -tangentSpeed or +tangentSpeed
											var contactTangentImpulse = contact.tangentImpulse;
											contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -maxFriction, maxFriction);
											tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
									}
	
									// total impulse from contact
									impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
									impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
									
									// apply impulse from contact
									if (!(bodyA.isStatic || bodyA.isSleeping)) {
											bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
											bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
											bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
									}
	
									if (!(bodyB.isStatic || bodyB.isSleeping)) {
											bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
											bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
											bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
									}
							}
					}
			};
	
	})();
	
	},{"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],11:[function(_dereq_,module,exports){
	/**
	* The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
	*
	* @class SAT
	*/
	
	// TODO: true circles and curves
	
	var SAT = {};
	
	module.exports = SAT;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Vector = _dereq_('../geometry/Vector');
	
	(function() {
	
			/**
			 * Detect collision between two bodies using the Separating Axis Theorem.
			 * @method collides
			 * @param {body} bodyA
			 * @param {body} bodyB
			 * @param {collision} previousCollision
			 * @return {collision} collision
			 */
			SAT.collides = function(bodyA, bodyB, previousCollision) {
					var overlapAB,
							overlapBA, 
							minOverlap,
							collision,
							canReusePrevCol = false;
	
					if (previousCollision) {
							// estimate total motion
							var parentA = bodyA.parent,
									parentB = bodyB.parent,
									motion = parentA.speed * parentA.speed + parentA.angularSpeed * parentA.angularSpeed
												 + parentB.speed * parentB.speed + parentB.angularSpeed * parentB.angularSpeed;
	
							// we may be able to (partially) reuse collision result 
							// but only safe if collision was resting
							canReusePrevCol = previousCollision && previousCollision.collided && motion < 0.2;
	
							// reuse collision object
							collision = previousCollision;
					} else {
							collision = { collided: false, bodyA: bodyA, bodyB: bodyB };
					}
	
					if (previousCollision && canReusePrevCol) {
							// if we can reuse the collision result
							// we only need to test the previously found axis
							var axisBodyA = collision.axisBody,
									axisBodyB = axisBodyA === bodyA ? bodyB : bodyA,
									axes = [axisBodyA.axes[previousCollision.axisNumber]];
	
							minOverlap = SAT._overlapAxes(axisBodyA.vertices, axisBodyB.vertices, axes);
							collision.reused = true;
	
							if (minOverlap.overlap <= 0) {
									collision.collided = false;
									return collision;
							}
					} else {
							// if we can't reuse a result, perform a full SAT test
	
							overlapAB = SAT._overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);
	
							if (overlapAB.overlap <= 0) {
									collision.collided = false;
									return collision;
							}
	
							overlapBA = SAT._overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);
	
							if (overlapBA.overlap <= 0) {
									collision.collided = false;
									return collision;
							}
	
							if (overlapAB.overlap < overlapBA.overlap) {
									minOverlap = overlapAB;
									collision.axisBody = bodyA;
							} else {
									minOverlap = overlapBA;
									collision.axisBody = bodyB;
							}
	
							// important for reuse later
							collision.axisNumber = minOverlap.axisNumber;
					}
	
					collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
					collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
					collision.collided = true;
					collision.depth = minOverlap.overlap;
					collision.parentA = collision.bodyA.parent;
					collision.parentB = collision.bodyB.parent;
					
					bodyA = collision.bodyA;
					bodyB = collision.bodyB;
	
					// ensure normal is facing away from bodyA
					if (Vector.dot(minOverlap.axis, Vector.sub(bodyB.position, bodyA.position)) < 0) {
							collision.normal = {
									x: minOverlap.axis.x,
									y: minOverlap.axis.y
							};
					} else {
							collision.normal = {
									x: -minOverlap.axis.x,
									y: -minOverlap.axis.y
							};
					}
	
					collision.tangent = Vector.perp(collision.normal);
	
					collision.penetration = collision.penetration || {};
					collision.penetration.x = collision.normal.x * collision.depth;
					collision.penetration.y = collision.normal.y * collision.depth; 
	
					// find support points, there is always either exactly one or two
					var verticesB = SAT._findSupports(bodyA, bodyB, collision.normal),
							supports = [];
	
					// find the supports from bodyB that are inside bodyA
					if (Vertices.contains(bodyA.vertices, verticesB[0]))
							supports.push(verticesB[0]);
	
					if (Vertices.contains(bodyA.vertices, verticesB[1]))
							supports.push(verticesB[1]);
	
					// find the supports from bodyA that are inside bodyB
					if (supports.length < 2) {
							var verticesA = SAT._findSupports(bodyB, bodyA, Vector.neg(collision.normal));
									
							if (Vertices.contains(bodyB.vertices, verticesA[0]))
									supports.push(verticesA[0]);
	
							if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1]))
									supports.push(verticesA[1]);
					}
	
					// account for the edge case of overlapping but no vertex containment
					if (supports.length < 1)
							supports = [verticesB[0]];
					
					collision.supports = supports;
	
					return collision;
			};
	
			/**
			 * Find the overlap between two sets of vertices.
			 * @method _overlapAxes
			 * @private
			 * @param {} verticesA
			 * @param {} verticesB
			 * @param {} axes
			 * @return result
			 */
			SAT._overlapAxes = function(verticesA, verticesB, axes) {
					var projectionA = Vector._temp[0], 
							projectionB = Vector._temp[1],
							result = { overlap: Number.MAX_VALUE },
							overlap,
							axis;
	
					for (var i = 0; i < axes.length; i++) {
							axis = axes[i];
	
							SAT._projectToAxis(projectionA, verticesA, axis);
							SAT._projectToAxis(projectionB, verticesB, axis);
	
							overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);
	
							if (overlap <= 0) {
									result.overlap = overlap;
									return result;
							}
	
							if (overlap < result.overlap) {
									result.overlap = overlap;
									result.axis = axis;
									result.axisNumber = i;
							}
					}
	
					return result;
			};
	
			/**
			 * Projects vertices on an axis and returns an interval.
			 * @method _projectToAxis
			 * @private
			 * @param {} projection
			 * @param {} vertices
			 * @param {} axis
			 */
			SAT._projectToAxis = function(projection, vertices, axis) {
					var min = Vector.dot(vertices[0], axis),
							max = min;
	
					for (var i = 1; i < vertices.length; i += 1) {
							var dot = Vector.dot(vertices[i], axis);
	
							if (dot > max) { 
									max = dot; 
							} else if (dot < min) { 
									min = dot; 
							}
					}
	
					projection.min = min;
					projection.max = max;
			};
			
			/**
			 * Finds supporting vertices given two bodies along a given direction using hill-climbing.
			 * @method _findSupports
			 * @private
			 * @param {} bodyA
			 * @param {} bodyB
			 * @param {} normal
			 * @return [vector]
			 */
			SAT._findSupports = function(bodyA, bodyB, normal) {
					var nearestDistance = Number.MAX_VALUE,
							vertexToBody = Vector._temp[0],
							vertices = bodyB.vertices,
							bodyAPosition = bodyA.position,
							distance,
							vertex,
							vertexA,
							vertexB;
	
					// find closest vertex on bodyB
					for (var i = 0; i < vertices.length; i++) {
							vertex = vertices[i];
							vertexToBody.x = vertex.x - bodyAPosition.x;
							vertexToBody.y = vertex.y - bodyAPosition.y;
							distance = -Vector.dot(normal, vertexToBody);
	
							if (distance < nearestDistance) {
									nearestDistance = distance;
									vertexA = vertex;
							}
					}
	
					// find next closest vertex using the two connected to it
					var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
					vertex = vertices[prevIndex];
					vertexToBody.x = vertex.x - bodyAPosition.x;
					vertexToBody.y = vertex.y - bodyAPosition.y;
					nearestDistance = -Vector.dot(normal, vertexToBody);
					vertexB = vertex;
	
					var nextIndex = (vertexA.index + 1) % vertices.length;
					vertex = vertices[nextIndex];
					vertexToBody.x = vertex.x - bodyAPosition.x;
					vertexToBody.y = vertex.y - bodyAPosition.y;
					distance = -Vector.dot(normal, vertexToBody);
					if (distance < nearestDistance) {
							vertexB = vertex;
					}
	
					return [vertexA, vertexB];
			};
	
	})();
	
	},{"../geometry/Vector":28,"../geometry/Vertices":29}],12:[function(_dereq_,module,exports){
	/**
	* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
	* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
	* The stiffness of constraints can be modified to create springs or elastic.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Constraint
	*/
	
	var Constraint = {};
	
	module.exports = Constraint;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Vector = _dereq_('../geometry/Vector');
	var Sleeping = _dereq_('../core/Sleeping');
	var Bounds = _dereq_('../geometry/Bounds');
	var Axes = _dereq_('../geometry/Axes');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			Constraint._warming = 0.4;
			Constraint._torqueDampen = 1;
			Constraint._minLength = 0.000001;
	
			/**
			 * Creates a new constraint.
			 * All properties have default values, and many are pre-calculated automatically based on other properties.
			 * To simulate a revolute constraint (or pin joint) set `length: 0` and a high `stiffness` value (e.g. `0.7` or above).
			 * If the constraint is unstable, try lowering the `stiffness` value and / or increasing `engine.constraintIterations`.
			 * For compound bodies, constraints must be applied to the parent body (not one of its parts).
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {} options
			 * @return {constraint} constraint
			 */
			Constraint.create = function(options) {
					var constraint = options;
	
					// if bodies defined but no points, use body centre
					if (constraint.bodyA && !constraint.pointA)
							constraint.pointA = { x: 0, y: 0 };
					if (constraint.bodyB && !constraint.pointB)
							constraint.pointB = { x: 0, y: 0 };
	
					// calculate static length using initial world space points
					var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
							initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
							length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
			
					constraint.length = typeof constraint.length !== 'undefined' ? constraint.length : length;
	
					// option defaults
					constraint.id = constraint.id || Common.nextId();
					constraint.label = constraint.label || 'Constraint';
					constraint.type = 'constraint';
					constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
					constraint.damping = constraint.damping || 0;
					constraint.angularStiffness = constraint.angularStiffness || 0;
					constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
					constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
					constraint.plugin = {};
	
					// render
					var render = {
							visible: true,
							lineWidth: 2,
							strokeStyle: '#ffffff',
							type: 'line',
							anchors: true
					};
	
					if (constraint.length === 0 && constraint.stiffness > 0.1) {
							render.type = 'pin';
							render.anchors = false;
					} else if (constraint.stiffness < 0.9) {
							render.type = 'spring';
					}
	
					constraint.render = Common.extend(render, constraint.render);
	
					return constraint;
			};
	
			/**
			 * Prepares for solving by constraint warming.
			 * @private
			 * @method preSolveAll
			 * @param {body[]} bodies
			 */
			Constraint.preSolveAll = function(bodies) {
					for (var i = 0; i < bodies.length; i += 1) {
							var body = bodies[i],
									impulse = body.constraintImpulse;
	
							if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
									continue;
							}
	
							body.position.x += impulse.x;
							body.position.y += impulse.y;
							body.angle += impulse.angle;
					}
			};
	
			/**
			 * Solves all constraints in a list of collisions.
			 * @private
			 * @method solveAll
			 * @param {constraint[]} constraints
			 * @param {number} timeScale
			 */
			Constraint.solveAll = function(constraints, timeScale) {
					// Solve fixed constraints first.
					for (var i = 0; i < constraints.length; i += 1) {
							var constraint = constraints[i],
									fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic),
									fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);
	
							if (fixedA || fixedB) {
									Constraint.solve(constraints[i], timeScale);
							}
					}
	
					// Solve free constraints last.
					for (i = 0; i < constraints.length; i += 1) {
							constraint = constraints[i];
							fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic);
							fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);
	
							if (!fixedA && !fixedB) {
									Constraint.solve(constraints[i], timeScale);
							}
					}
			};
	
			/**
			 * Solves a distance constraint with Gauss-Siedel method.
			 * @private
			 * @method solve
			 * @param {constraint} constraint
			 * @param {number} timeScale
			 */
			Constraint.solve = function(constraint, timeScale) {
					var bodyA = constraint.bodyA,
							bodyB = constraint.bodyB,
							pointA = constraint.pointA,
							pointB = constraint.pointB;
	
					if (!bodyA && !bodyB)
							return;
	
					// update reference angle
					if (bodyA && !bodyA.isStatic) {
							Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
							constraint.angleA = bodyA.angle;
					}
					
					// update reference angle
					if (bodyB && !bodyB.isStatic) {
							Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
							constraint.angleB = bodyB.angle;
					}
	
					var pointAWorld = pointA,
							pointBWorld = pointB;
	
					if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
					if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);
	
					if (!pointAWorld || !pointBWorld)
							return;
	
					var delta = Vector.sub(pointAWorld, pointBWorld),
							currentLength = Vector.magnitude(delta);
	
					// prevent singularity
					if (currentLength < Constraint._minLength) {
							currentLength = Constraint._minLength;
					}
	
					// solve distance constraint with Gauss-Siedel method
					var difference = (currentLength - constraint.length) / currentLength,
							stiffness = constraint.stiffness < 1 ? constraint.stiffness * timeScale : constraint.stiffness,
							force = Vector.mult(delta, difference * stiffness),
							massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0),
							inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0),
							resistanceTotal = massTotal + inertiaTotal,
							torque,
							share,
							normal,
							normalVelocity,
							relativeVelocity;
	
					if (constraint.damping) {
							var zero = Vector.create();
							normal = Vector.div(delta, currentLength);
	
							relativeVelocity = Vector.sub(
									bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
									bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
							);
	
							normalVelocity = Vector.dot(normal, relativeVelocity);
					}
	
					if (bodyA && !bodyA.isStatic) {
							share = bodyA.inverseMass / massTotal;
	
							// keep track of applied impulses for post solving
							bodyA.constraintImpulse.x -= force.x * share;
							bodyA.constraintImpulse.y -= force.y * share;
	
							// apply forces
							bodyA.position.x -= force.x * share;
							bodyA.position.y -= force.y * share;
	
							// apply damping
							if (constraint.damping) {
									bodyA.positionPrev.x -= constraint.damping * normal.x * normalVelocity * share;
									bodyA.positionPrev.y -= constraint.damping * normal.y * normalVelocity * share;
							}
	
							// apply torque
							torque = (Vector.cross(pointA, force) / resistanceTotal) * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
							bodyA.constraintImpulse.angle -= torque;
							bodyA.angle -= torque;
					}
	
					if (bodyB && !bodyB.isStatic) {
							share = bodyB.inverseMass / massTotal;
	
							// keep track of applied impulses for post solving
							bodyB.constraintImpulse.x += force.x * share;
							bodyB.constraintImpulse.y += force.y * share;
							
							// apply forces
							bodyB.position.x += force.x * share;
							bodyB.position.y += force.y * share;
	
							// apply damping
							if (constraint.damping) {
									bodyB.positionPrev.x += constraint.damping * normal.x * normalVelocity * share;
									bodyB.positionPrev.y += constraint.damping * normal.y * normalVelocity * share;
							}
	
							// apply torque
							torque = (Vector.cross(pointB, force) / resistanceTotal) * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
							bodyB.constraintImpulse.angle += torque;
							bodyB.angle += torque;
					}
	
			};
	
			/**
			 * Performs body updates required after solving constraints.
			 * @private
			 * @method postSolveAll
			 * @param {body[]} bodies
			 */
			Constraint.postSolveAll = function(bodies) {
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									impulse = body.constraintImpulse;
	
							if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
									continue;
							}
	
							Sleeping.set(body, false);
	
							// update geometry and reset
							for (var j = 0; j < body.parts.length; j++) {
									var part = body.parts[j];
									
									Vertices.translate(part.vertices, impulse);
	
									if (j > 0) {
											part.position.x += impulse.x;
											part.position.y += impulse.y;
									}
	
									if (impulse.angle !== 0) {
											Vertices.rotate(part.vertices, impulse.angle, body.position);
											Axes.rotate(part.axes, impulse.angle);
											if (j > 0) {
													Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
											}
									}
	
									Bounds.update(part.bounds, part.vertices, body.velocity);
							}
	
							// dampen the cached impulse for warming next step
							impulse.angle *= Constraint._warming;
							impulse.x *= Constraint._warming;
							impulse.y *= Constraint._warming;
					}
			};
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
			 *
			 * @property id
			 * @type number
			 */
	
			/**
			 * A `String` denoting the type of object.
			 *
			 * @property type
			 * @type string
			 * @default "constraint"
			 * @readOnly
			 */
	
			/**
			 * An arbitrary `String` name to help the user identify and manage bodies.
			 *
			 * @property label
			 * @type string
			 * @default "Constraint"
			 */
	
			/**
			 * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
			 *
			 * @property render
			 * @type object
			 */
	
			/**
			 * A flag that indicates if the constraint should be rendered.
			 *
			 * @property render.visible
			 * @type boolean
			 * @default true
			 */
	
			/**
			 * A `Number` that defines the line width to use when rendering the constraint outline.
			 * A value of `0` means no outline will be rendered.
			 *
			 * @property render.lineWidth
			 * @type number
			 * @default 2
			 */
	
			/**
			 * A `String` that defines the stroke style to use when rendering the constraint outline.
			 * It is the same as when using a canvas, so it accepts CSS style property values.
			 *
			 * @property render.strokeStyle
			 * @type string
			 * @default a random colour
			 */
	
			/**
			 * A `String` that defines the constraint rendering type. 
			 * The possible values are 'line', 'pin', 'spring'.
			 * An appropriate render type will be automatically chosen unless one is given in options.
			 *
			 * @property render.type
			 * @type string
			 * @default 'line'
			 */
	
			/**
			 * A `Boolean` that defines if the constraint's anchor points should be rendered.
			 *
			 * @property render.anchors
			 * @type boolean
			 * @default true
			 */
	
			/**
			 * The first possible `Body` that this constraint is attached to.
			 *
			 * @property bodyA
			 * @type body
			 * @default null
			 */
	
			/**
			 * The second possible `Body` that this constraint is attached to.
			 *
			 * @property bodyB
			 * @type body
			 * @default null
			 */
	
			/**
			 * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
			 *
			 * @property pointA
			 * @type vector
			 * @default { x: 0, y: 0 }
			 */
	
			/**
			 * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyB` if defined, otherwise a world-space position.
			 *
			 * @property pointB
			 * @type vector
			 * @default { x: 0, y: 0 }
			 */
	
			/**
			 * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
			 * A value of `1` means the constraint should be very stiff.
			 * A value of `0.2` means the constraint acts like a soft spring.
			 *
			 * @property stiffness
			 * @type number
			 * @default 1
			 */
	
			/**
			 * A `Number` that specifies the damping of the constraint, 
			 * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
			 * Damping will only be apparent when the constraint also has a very low `stiffness`.
			 * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
			 * A value of `0` means the constraint will apply no damping.
			 *
			 * @property damping
			 * @type number
			 * @default 0
			 */
	
			/**
			 * A `Number` that specifies the target resting length of the constraint. 
			 * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
			 *
			 * @property length
			 * @type number
			 */
	
			/**
			 * An object reserved for storing plugin-specific properties.
			 *
			 * @property plugin
			 * @type {}
			 */
	
	})();
	
	},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],13:[function(_dereq_,module,exports){
	/**
	* The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
	* Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class MouseConstraint
	*/
	
	var MouseConstraint = {};
	
	module.exports = MouseConstraint;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Sleeping = _dereq_('../core/Sleeping');
	var Mouse = _dereq_('../core/Mouse');
	var Events = _dereq_('../core/Events');
	var Detector = _dereq_('../collision/Detector');
	var Constraint = _dereq_('./Constraint');
	var Composite = _dereq_('../body/Composite');
	var Common = _dereq_('../core/Common');
	var Bounds = _dereq_('../geometry/Bounds');
	
	(function() {
	
			/**
			 * Creates a new mouse constraint.
			 * All properties have default values, and many are pre-calculated automatically based on other properties.
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {engine} engine
			 * @param {} options
			 * @return {MouseConstraint} A new MouseConstraint
			 */
			MouseConstraint.create = function(engine, options) {
					var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);
	
					if (!mouse) {
							if (engine && engine.render && engine.render.canvas) {
									mouse = Mouse.create(engine.render.canvas);
							} else if (options && options.element) {
									mouse = Mouse.create(options.element);
							} else {
									mouse = Mouse.create();
									Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
							}
					}
	
					var constraint = Constraint.create({ 
							label: 'Mouse Constraint',
							pointA: mouse.position,
							pointB: { x: 0, y: 0 },
							length: 0.01, 
							stiffness: 0.1,
							angularStiffness: 1,
							render: {
									strokeStyle: '#90EE90',
									lineWidth: 3
							}
					});
	
					var defaults = {
							type: 'mouseConstraint',
							mouse: mouse,
							element: null,
							body: null,
							constraint: constraint,
							collisionFilter: {
									category: 0x0001,
									mask: 0xFFFFFFFF,
									group: 0
							}
					};
	
					var mouseConstraint = Common.extend(defaults, options);
	
					Events.on(engine, 'beforeUpdate', function() {
							var allBodies = Composite.allBodies(engine.world);
							MouseConstraint.update(mouseConstraint, allBodies);
							MouseConstraint._triggerEvents(mouseConstraint);
					});
	
					return mouseConstraint;
			};
	
			/**
			 * Updates the given mouse constraint.
			 * @private
			 * @method update
			 * @param {MouseConstraint} mouseConstraint
			 * @param {body[]} bodies
			 */
			MouseConstraint.update = function(mouseConstraint, bodies) {
					var mouse = mouseConstraint.mouse,
							constraint = mouseConstraint.constraint,
							body = mouseConstraint.body;
	
					if (mouse.button === 0) {
							if (!constraint.bodyB) {
									for (var i = 0; i < bodies.length; i++) {
											body = bodies[i];
											if (Bounds.contains(body.bounds, mouse.position) 
															&& Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
													for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
															var part = body.parts[j];
															if (Vertices.contains(part.vertices, mouse.position)) {
																	constraint.pointA = mouse.position;
																	constraint.bodyB = mouseConstraint.body = body;
																	constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
																	constraint.angleB = body.angle;
	
																	Sleeping.set(body, false);
																	Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });
	
																	break;
															}
													}
											}
									}
							} else {
									Sleeping.set(constraint.bodyB, false);
									constraint.pointA = mouse.position;
							}
					} else {
							constraint.bodyB = mouseConstraint.body = null;
							constraint.pointB = null;
	
							if (body)
									Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
					}
			};
	
			/**
			 * Triggers mouse constraint events.
			 * @method _triggerEvents
			 * @private
			 * @param {mouse} mouseConstraint
			 */
			MouseConstraint._triggerEvents = function(mouseConstraint) {
					var mouse = mouseConstraint.mouse,
							mouseEvents = mouse.sourceEvents;
	
					if (mouseEvents.mousemove)
							Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });
	
					if (mouseEvents.mousedown)
							Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });
	
					if (mouseEvents.mouseup)
							Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });
	
					// reset the mouse state ready for the next step
					Mouse.clearSourceEvents(mouse);
			};
	
			/*
			*
			*  Events Documentation
			*
			*/
	
			/**
			* Fired when the mouse has moved (or a touch moves) during the last step
			*
			* @event mousemove
			* @param {} event An event object
			* @param {mouse} event.mouse The engine's mouse instance
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when the mouse is down (or a touch has started) during the last step
			*
			* @event mousedown
			* @param {} event An event object
			* @param {mouse} event.mouse The engine's mouse instance
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when the mouse is up (or a touch has ended) during the last step
			*
			* @event mouseup
			* @param {} event An event object
			* @param {mouse} event.mouse The engine's mouse instance
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when the user starts dragging a body
			*
			* @event startdrag
			* @param {} event An event object
			* @param {mouse} event.mouse The engine's mouse instance
			* @param {body} event.body The body being dragged
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired when the user ends dragging a body
			*
			* @event enddrag
			* @param {} event An event object
			* @param {mouse} event.mouse The engine's mouse instance
			* @param {body} event.body The body that has stopped being dragged
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * A `String` denoting the type of object.
			 *
			 * @property type
			 * @type string
			 * @default "constraint"
			 * @readOnly
			 */
	
			/**
			 * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
			 *
			 * @property mouse
			 * @type mouse
			 * @default mouse
			 */
	
			/**
			 * The `Body` that is currently being moved by the user, or `null` if no body.
			 *
			 * @property body
			 * @type body
			 * @default null
			 */
	
			/**
			 * The `Constraint` object that is used to move the body during interaction.
			 *
			 * @property constraint
			 * @type constraint
			 */
	
			/**
			 * An `Object` that specifies the collision filter properties.
			 * The collision filter allows the user to define which types of body this mouse constraint can interact with.
			 * See `body.collisionFilter` for more information.
			 *
			 * @property collisionFilter
			 * @type object
			 */
	
	})();
	
	},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../core/Sleeping":22,"../geometry/Bounds":26,"../geometry/Vertices":29,"./Constraint":12}],14:[function(_dereq_,module,exports){
	(function (global){
	/**
	* The `Matter.Common` module contains utility functions that are common to all modules.
	*
	* @class Common
	*/
	
	var Common = {};
	
	module.exports = Common;
	
	(function() {
	
			Common._nextId = 0;
			Common._seed = 0;
			Common._nowStartTime = +(new Date());
	
			/**
			 * Extends the object in the first argument using the object in the second argument.
			 * @method extend
			 * @param {} obj
			 * @param {boolean} deep
			 * @return {} obj extended
			 */
			Common.extend = function(obj, deep) {
					var argsStart,
							args,
							deepClone;
	
					if (typeof deep === 'boolean') {
							argsStart = 2;
							deepClone = deep;
					} else {
							argsStart = 1;
							deepClone = true;
					}
	
					for (var i = argsStart; i < arguments.length; i++) {
							var source = arguments[i];
	
							if (source) {
									for (var prop in source) {
											if (deepClone && source[prop] && source[prop].constructor === Object) {
													if (!obj[prop] || obj[prop].constructor === Object) {
															obj[prop] = obj[prop] || {};
															Common.extend(obj[prop], deepClone, source[prop]);
													} else {
															obj[prop] = source[prop];
													}
											} else {
													obj[prop] = source[prop];
											}
									}
							}
					}
					
					return obj;
			};
	
			/**
			 * Creates a new clone of the object, if deep is true references will also be cloned.
			 * @method clone
			 * @param {} obj
			 * @param {bool} deep
			 * @return {} obj cloned
			 */
			Common.clone = function(obj, deep) {
					return Common.extend({}, deep, obj);
			};
	
			/**
			 * Returns the list of keys for the given object.
			 * @method keys
			 * @param {} obj
			 * @return {string[]} keys
			 */
			Common.keys = function(obj) {
					if (Object.keys)
							return Object.keys(obj);
	
					// avoid hasOwnProperty for performance
					var keys = [];
					for (var key in obj)
							keys.push(key);
					return keys;
			};
	
			/**
			 * Returns the list of values for the given object.
			 * @method values
			 * @param {} obj
			 * @return {array} Array of the objects property values
			 */
			Common.values = function(obj) {
					var values = [];
					
					if (Object.keys) {
							var keys = Object.keys(obj);
							for (var i = 0; i < keys.length; i++) {
									values.push(obj[keys[i]]);
							}
							return values;
					}
					
					// avoid hasOwnProperty for performance
					for (var key in obj)
							values.push(obj[key]);
					return values;
			};
	
			/**
			 * Gets a value from `base` relative to the `path` string.
			 * @method get
			 * @param {} obj The base object
			 * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
			 * @param {number} [begin] Path slice begin
			 * @param {number} [end] Path slice end
			 * @return {} The object at the given path
			 */
			Common.get = function(obj, path, begin, end) {
					path = path.split('.').slice(begin, end);
	
					for (var i = 0; i < path.length; i += 1) {
							obj = obj[path[i]];
					}
	
					return obj;
			};
	
			/**
			 * Sets a value on `base` relative to the given `path` string.
			 * @method set
			 * @param {} obj The base object
			 * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
			 * @param {} val The value to set
			 * @param {number} [begin] Path slice begin
			 * @param {number} [end] Path slice end
			 * @return {} Pass through `val` for chaining
			 */
			Common.set = function(obj, path, val, begin, end) {
					var parts = path.split('.').slice(begin, end);
					Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
					return val;
			};
	
			/**
			 * Shuffles the given array in-place.
			 * The function uses a seeded random generator.
			 * @method shuffle
			 * @param {array} array
			 * @return {array} array shuffled randomly
			 */
			Common.shuffle = function(array) {
					for (var i = array.length - 1; i > 0; i--) {
							var j = Math.floor(Common.random() * (i + 1));
							var temp = array[i];
							array[i] = array[j];
							array[j] = temp;
					}
					return array;
			};
	
			/**
			 * Randomly chooses a value from a list with equal probability.
			 * The function uses a seeded random generator.
			 * @method choose
			 * @param {array} choices
			 * @return {object} A random choice object from the array
			 */
			Common.choose = function(choices) {
					return choices[Math.floor(Common.random() * choices.length)];
			};
	
			/**
			 * Returns true if the object is a HTMLElement, otherwise false.
			 * @method isElement
			 * @param {object} obj
			 * @return {boolean} True if the object is a HTMLElement, otherwise false
			 */
			Common.isElement = function(obj) {
					if (typeof HTMLElement !== 'undefined') {
							return obj instanceof HTMLElement;
					}
	
					return !!(obj && obj.nodeType && obj.nodeName);
			};
	
			/**
			 * Returns true if the object is an array.
			 * @method isArray
			 * @param {object} obj
			 * @return {boolean} True if the object is an array, otherwise false
			 */
			Common.isArray = function(obj) {
					return Object.prototype.toString.call(obj) === '[object Array]';
			};
	
			/**
			 * Returns true if the object is a function.
			 * @method isFunction
			 * @param {object} obj
			 * @return {boolean} True if the object is a function, otherwise false
			 */
			Common.isFunction = function(obj) {
					return typeof obj === "function";
			};
	
			/**
			 * Returns true if the object is a plain object.
			 * @method isPlainObject
			 * @param {object} obj
			 * @return {boolean} True if the object is a plain object, otherwise false
			 */
			Common.isPlainObject = function(obj) {
					return typeof obj === 'object' && obj.constructor === Object;
			};
	
			/**
			 * Returns true if the object is a string.
			 * @method isString
			 * @param {object} obj
			 * @return {boolean} True if the object is a string, otherwise false
			 */
			Common.isString = function(obj) {
					return toString.call(obj) === '[object String]';
			};
			
			/**
			 * Returns the given value clamped between a minimum and maximum value.
			 * @method clamp
			 * @param {number} value
			 * @param {number} min
			 * @param {number} max
			 * @return {number} The value clamped between min and max inclusive
			 */
			Common.clamp = function(value, min, max) {
					if (value < min)
							return min;
					if (value > max)
							return max;
					return value;
			};
			
			/**
			 * Returns the sign of the given value.
			 * @method sign
			 * @param {number} value
			 * @return {number} -1 if negative, +1 if 0 or positive
			 */
			Common.sign = function(value) {
					return value < 0 ? -1 : 1;
			};
			
			/**
			 * Returns the current timestamp since the time origin (e.g. from page load).
			 * The result will be high-resolution including decimal places if available.
			 * @method now
			 * @return {number} the current timestamp
			 */
			Common.now = function() {
					if (window.performance) {
							if (window.performance.now) {
									return window.performance.now();
							} else if (window.performance.webkitNow) {
									return window.performance.webkitNow();
							}
					}
	
					return (new Date()) - Common._nowStartTime;
			};
			
			/**
			 * Returns a random value between a minimum and a maximum value inclusive.
			 * The function uses a seeded random generator.
			 * @method random
			 * @param {number} min
			 * @param {number} max
			 * @return {number} A random number between min and max inclusive
			 */
			Common.random = function(min, max) {
					min = (typeof min !== "undefined") ? min : 0;
					max = (typeof max !== "undefined") ? max : 1;
					return min + _seededRandom() * (max - min);
			};
	
			var _seededRandom = function() {
					// https://en.wikipedia.org/wiki/Linear_congruential_generator
					Common._seed = (Common._seed * 9301 + 49297) % 233280;
					return Common._seed / 233280;
			};
	
			/**
			 * Converts a CSS hex colour string into an integer.
			 * @method colorToNumber
			 * @param {string} colorString
			 * @return {number} An integer representing the CSS hex string
			 */
			Common.colorToNumber = function(colorString) {
					colorString = colorString.replace('#','');
	
					if (colorString.length == 3) {
							colorString = colorString.charAt(0) + colorString.charAt(0)
													+ colorString.charAt(1) + colorString.charAt(1)
													+ colorString.charAt(2) + colorString.charAt(2);
					}
	
					return parseInt(colorString, 16);
			};
	
			/**
			 * The console logging level to use, where each level includes all levels above and excludes the levels below.
			 * The default level is 'debug' which shows all console messages.  
			 *
			 * Possible level values are:
			 * - 0 = None
			 * - 1 = Debug
			 * - 2 = Info
			 * - 3 = Warn
			 * - 4 = Error
			 * @property Common.logLevel
			 * @type {Number}
			 * @default 1
			 */
			Common.logLevel = 1;
	
			/**
			 * Shows a `console.log` message only if the current `Common.logLevel` allows it.
			 * The message will be prefixed with 'matter-js' to make it easily identifiable.
			 * @method log
			 * @param ...objs {} The objects to log.
			 */
			Common.log = function() {
					if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
							console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
					}
			};
	
			/**
			 * Shows a `console.info` message only if the current `Common.logLevel` allows it.
			 * The message will be prefixed with 'matter-js' to make it easily identifiable.
			 * @method info
			 * @param ...objs {} The objects to log.
			 */
			Common.info = function() {
					if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
							console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
					}
			};
	
			/**
			 * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
			 * The message will be prefixed with 'matter-js' to make it easily identifiable.
			 * @method warn
			 * @param ...objs {} The objects to log.
			 */
			Common.warn = function() {
					if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
							console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
					}
			};
	
			/**
			 * Returns the next unique sequential ID.
			 * @method nextId
			 * @return {Number} Unique sequential ID
			 */
			Common.nextId = function() {
					return Common._nextId++;
			};
	
			/**
			 * A cross browser compatible indexOf implementation.
			 * @method indexOf
			 * @param {array} haystack
			 * @param {object} needle
			 * @return {number} The position of needle in haystack, otherwise -1.
			 */
			Common.indexOf = function(haystack, needle) {
					if (haystack.indexOf)
							return haystack.indexOf(needle);
	
					for (var i = 0; i < haystack.length; i++) {
							if (haystack[i] === needle)
									return i;
					}
	
					return -1;
			};
	
			/**
			 * A cross browser compatible array map implementation.
			 * @method map
			 * @param {array} list
			 * @param {function} func
			 * @return {array} Values from list transformed by func.
			 */
			Common.map = function(list, func) {
					if (list.map) {
							return list.map(func);
					}
	
					var mapped = [];
	
					for (var i = 0; i < list.length; i += 1) {
							mapped.push(func(list[i]));
					}
	
					return mapped;
			};
	
			/**
			 * Takes a directed graph and returns the partially ordered set of vertices in topological order.
			 * Circular dependencies are allowed.
			 * @method topologicalSort
			 * @param {object} graph
			 * @return {array} Partially ordered set of vertices in topological order.
			 */
			Common.topologicalSort = function(graph) {
					// https://github.com/mgechev/javascript-algorithms
					// Copyright (c) Minko Gechev (MIT license)
					// Modifications: tidy formatting and naming
					var result = [],
							visited = [],
							temp = [];
	
					for (var node in graph) {
							if (!visited[node] && !temp[node]) {
									Common._topologicalSort(node, visited, temp, graph, result);
							}
					}
	
					return result;
			};
	
			Common._topologicalSort = function(node, visited, temp, graph, result) {
					var neighbors = graph[node] || [];
					temp[node] = true;
	
					for (var i = 0; i < neighbors.length; i += 1) {
							var neighbor = neighbors[i];
	
							if (temp[neighbor]) {
									// skip circular dependencies
									continue;
							}
	
							if (!visited[neighbor]) {
									Common._topologicalSort(neighbor, visited, temp, graph, result);
							}
					}
	
					temp[node] = false;
					visited[node] = true;
	
					result.push(node);
			};
	
			/**
			 * Takes _n_ functions as arguments and returns a new function that calls them in order.
			 * The arguments applied when calling the new function will also be applied to every function passed.
			 * The value of `this` refers to the last value returned in the chain that was not `undefined`.
			 * Therefore if a passed function does not return a value, the previously returned value is maintained.
			 * After all passed functions have been called the new function returns the last returned value (if any).
			 * If any of the passed functions are a chain, then the chain will be flattened.
			 * @method chain
			 * @param ...funcs {function} The functions to chain.
			 * @return {function} A new function that calls the passed functions in order.
			 */
			Common.chain = function() {
					var funcs = [];
	
					for (var i = 0; i < arguments.length; i += 1) {
							var func = arguments[i];
	
							if (func._chained) {
									// flatten already chained functions
									funcs.push.apply(funcs, func._chained);
							} else {
									funcs.push(func);
							}
					}
	
					var chain = function() {
							// https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
							var lastResult,
									args = new Array(arguments.length);
	
							for (var i = 0, l = arguments.length; i < l; i++) {
									args[i] = arguments[i];
							}
	
							for (i = 0; i < funcs.length; i += 1) {
									var result = funcs[i].apply(lastResult, args);
	
									if (typeof result !== 'undefined') {
											lastResult = result;
									}
							}
	
							return lastResult;
					};
	
					chain._chained = funcs;
	
					return chain;
			};
	
			/**
			 * Chains a function to excute before the original function on the given `path` relative to `base`.
			 * See also docs for `Common.chain`.
			 * @method chainPathBefore
			 * @param {} base The base object
			 * @param {string} path The path relative to `base`
			 * @param {function} func The function to chain before the original
			 * @return {function} The chained function that replaced the original
			 */
			Common.chainPathBefore = function(base, path, func) {
					return Common.set(base, path, Common.chain(
							func,
							Common.get(base, path)
					));
			};
	
			/**
			 * Chains a function to excute after the original function on the given `path` relative to `base`.
			 * See also docs for `Common.chain`.
			 * @method chainPathAfter
			 * @param {} base The base object
			 * @param {string} path The path relative to `base`
			 * @param {function} func The function to chain after the original
			 * @return {function} The chained function that replaced the original
			 */
			Common.chainPathAfter = function(base, path, func) {
					return Common.set(base, path, Common.chain(
							Common.get(base, path),
							func
					));
			};
	
			/**
			 * Used to require external libraries outside of the bundle.
			 * It first looks for the `globalName` on the environment's global namespace.
			 * If the global is not found, it will fall back to using the standard `require` using the `moduleName`.
			 * @private
			 * @method _requireGlobal
			 * @param {string} globalName The global module name
			 * @param {string} moduleName The fallback CommonJS module name
			 * @return {} The loaded module
			 */
			Common._requireGlobal = function(globalName, moduleName) {
					var obj = (typeof window !== 'undefined' ? window[globalName] : typeof global !== 'undefined' ? global[globalName] : null);
					return obj || _dereq_(moduleName);
			};
	})();
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],15:[function(_dereq_,module,exports){
	/**
	* The `Matter.Engine` module contains methods for creating and manipulating engines.
	* An engine is a controller that manages updating the simulation of the world.
	* See `Matter.Runner` for an optional game loop utility.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Engine
	*/
	
	var Engine = {};
	
	module.exports = Engine;
	
	var World = _dereq_('../body/World');
	var Sleeping = _dereq_('./Sleeping');
	var Resolver = _dereq_('../collision/Resolver');
	var Render = _dereq_('../render/Render');
	var Pairs = _dereq_('../collision/Pairs');
	var Metrics = _dereq_('./Metrics');
	var Grid = _dereq_('../collision/Grid');
	var Events = _dereq_('./Events');
	var Composite = _dereq_('../body/Composite');
	var Constraint = _dereq_('../constraint/Constraint');
	var Common = _dereq_('./Common');
	var Body = _dereq_('../body/Body');
	
	(function() {
	
			/**
			 * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * All properties have default values, and many are pre-calculated automatically based on other properties.
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {object} [options]
			 * @return {engine} engine
			 */
			Engine.create = function(element, options) {
					// options may be passed as the first (and only) argument
					options = Common.isElement(element) ? options : element;
					element = Common.isElement(element) ? element : null;
					options = options || {};
	
					if (element || options.render) {
							Common.warn('Engine.create: engine.render is deprecated (see docs)');
					}
	
					var defaults = {
							positionIterations: 6,
							velocityIterations: 4,
							constraintIterations: 2,
							enableSleeping: false,
							events: [],
							plugin: {},
							timing: {
									timestamp: 0,
									timeScale: 1
							},
							broadphase: {
									controller: Grid
							}
					};
	
					var engine = Common.extend(defaults, options);
	
					// @deprecated
					if (element || engine.render) {
							var renderDefaults = {
									element: element,
									controller: Render
							};
							
							engine.render = Common.extend(renderDefaults, engine.render);
					}
	
					// @deprecated
					if (engine.render && engine.render.controller) {
							engine.render = engine.render.controller.create(engine.render);
					}
	
					// @deprecated
					if (engine.render) {
							engine.render.engine = engine;
					}
	
					engine.world = options.world || World.create(engine.world);
					engine.pairs = Pairs.create();
					engine.broadphase = engine.broadphase.controller.create(engine.broadphase);
					engine.metrics = engine.metrics || { extended: false };
	
	
					return engine;
			};
	
			/**
			 * Moves the simulation forward in time by `delta` ms.
			 * The `correction` argument is an optional `Number` that specifies the time correction factor to apply to the update.
			 * This can help improve the accuracy of the simulation in cases where `delta` is changing between updates.
			 * The value of `correction` is defined as `delta / lastDelta`, i.e. the percentage change of `delta` over the last step.
			 * Therefore the value is always `1` (no correction) when `delta` constant (or when no correction is desired, which is the default).
			 * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
			 *
			 * Triggers `beforeUpdate` and `afterUpdate` events.
			 * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
			 * @method update
			 * @param {engine} engine
			 * @param {number} [delta=16.666]
			 * @param {number} [correction=1]
			 */
			Engine.update = function(engine, delta, correction) {
					delta = delta || 1000 / 60;
					correction = correction || 1;
	
					var world = engine.world,
							timing = engine.timing,
							broadphase = engine.broadphase,
							broadphasePairs = [],
							i;
	
					// increment timestamp
					timing.timestamp += delta * timing.timeScale;
	
					// create an event object
					var event = {
							timestamp: timing.timestamp
					};
	
					Events.trigger(engine, 'beforeUpdate', event);
	
					// get lists of all bodies and constraints, no matter what composites they are in
					var allBodies = Composite.allBodies(world),
							allConstraints = Composite.allConstraints(world);
	
	
					// if sleeping enabled, call the sleeping controller
					if (engine.enableSleeping)
							Sleeping.update(allBodies, timing.timeScale);
	
					// applies gravity to all bodies
					Engine._bodiesApplyGravity(allBodies, world.gravity);
	
					// update all body position and rotation by integration
					Engine._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);
	
					// update all constraints (first pass)
					Constraint.preSolveAll(allBodies);
					for (i = 0; i < engine.constraintIterations; i++) {
							Constraint.solveAll(allConstraints, timing.timeScale);
					}
					Constraint.postSolveAll(allBodies);
	
					// broadphase pass: find potential collision pairs
					if (broadphase.controller) {
							// if world is dirty, we must flush the whole grid
							if (world.isModified)
									broadphase.controller.clear(broadphase);
	
							// update the grid buckets based on current bodies
							broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
							broadphasePairs = broadphase.pairsList;
					} else {
							// if no broadphase set, we just pass all bodies
							broadphasePairs = allBodies;
					}
	
					// clear all composite modified flags
					if (world.isModified) {
							Composite.setModified(world, false, false, true);
					}
	
					// narrowphase pass: find actual collisions, then create or update collision pairs
					var collisions = broadphase.detector(broadphasePairs, engine);
	
					// update collision pairs
					var pairs = engine.pairs,
							timestamp = timing.timestamp;
					Pairs.update(pairs, collisions, timestamp);
					Pairs.removeOld(pairs, timestamp);
	
					// wake up bodies involved in collisions
					if (engine.enableSleeping)
							Sleeping.afterCollisions(pairs.list, timing.timeScale);
	
					// trigger collision events
					if (pairs.collisionStart.length > 0)
							Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });
	
					// iteratively resolve position between collisions
					Resolver.preSolvePosition(pairs.list);
					for (i = 0; i < engine.positionIterations; i++) {
							Resolver.solvePosition(pairs.list, timing.timeScale);
					}
					Resolver.postSolvePosition(allBodies);
	
					// update all constraints (second pass)
					Constraint.preSolveAll(allBodies);
					for (i = 0; i < engine.constraintIterations; i++) {
							Constraint.solveAll(allConstraints, timing.timeScale);
					}
					Constraint.postSolveAll(allBodies);
	
					// iteratively resolve velocity between collisions
					Resolver.preSolveVelocity(pairs.list);
					for (i = 0; i < engine.velocityIterations; i++) {
							Resolver.solveVelocity(pairs.list, timing.timeScale);
					}
	
					// trigger collision events
					if (pairs.collisionActive.length > 0)
							Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });
	
					if (pairs.collisionEnd.length > 0)
							Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });
	
	
					// clear force buffers
					Engine._bodiesClearForces(allBodies);
	
					Events.trigger(engine, 'afterUpdate', event);
	
					return engine;
			};
			
			/**
			 * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
			 * @method merge
			 * @param {engine} engineA
			 * @param {engine} engineB
			 */
			Engine.merge = function(engineA, engineB) {
					Common.extend(engineA, engineB);
					
					if (engineB.world) {
							engineA.world = engineB.world;
	
							Engine.clear(engineA);
	
							var bodies = Composite.allBodies(engineA.world);
	
							for (var i = 0; i < bodies.length; i++) {
									var body = bodies[i];
									Sleeping.set(body, false);
									body.id = Common.nextId();
							}
					}
			};
	
			/**
			 * Clears the engine including the world, pairs and broadphase.
			 * @method clear
			 * @param {engine} engine
			 */
			Engine.clear = function(engine) {
					var world = engine.world;
					
					Pairs.clear(engine.pairs);
	
					var broadphase = engine.broadphase;
					if (broadphase.controller) {
							var bodies = Composite.allBodies(world);
							broadphase.controller.clear(broadphase);
							broadphase.controller.update(broadphase, bodies, engine, true);
					}
			};
	
			/**
			 * Zeroes the `body.force` and `body.torque` force buffers.
			 * @method _bodiesClearForces
			 * @private
			 * @param {body[]} bodies
			 */
			Engine._bodiesClearForces = function(bodies) {
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							// reset force buffers
							body.force.x = 0;
							body.force.y = 0;
							body.torque = 0;
					}
			};
	
			/**
			 * Applys a mass dependant force to all given bodies.
			 * @method _bodiesApplyGravity
			 * @private
			 * @param {body[]} bodies
			 * @param {vector} gravity
			 */
			Engine._bodiesApplyGravity = function(bodies, gravity) {
					var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001;
	
					if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
							return;
					}
					
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (body.isStatic || body.isSleeping)
									continue;
	
							// apply gravity
							body.force.y += body.mass * gravity.y * gravityScale;
							body.force.x += body.mass * gravity.x * gravityScale;
					}
			};
	
			/**
			 * Applys `Body.update` to all given `bodies`.
			 * @method _bodiesUpdate
			 * @private
			 * @param {body[]} bodies
			 * @param {number} deltaTime 
			 * The amount of time elapsed between updates
			 * @param {number} timeScale
			 * @param {number} correction 
			 * The Verlet correction factor (deltaTime / lastDeltaTime)
			 * @param {bounds} worldBounds
			 */
			Engine._bodiesUpdate = function(bodies, deltaTime, timeScale, correction, worldBounds) {
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (body.isStatic || body.isSleeping)
									continue;
	
							Body.update(body, deltaTime, timeScale, correction);
					}
			};
	
			/**
			 * An alias for `Runner.run`, see `Matter.Runner` for more information.
			 * @method run
			 * @param {engine} engine
			 */
	
			/**
			* Fired just before an update
			*
			* @event beforeUpdate
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after engine update and all collision events
			*
			* @event afterUpdate
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
			*
			* @event collisionStart
			* @param {} event An event object
			* @param {} event.pairs List of affected pairs
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
			*
			* @event collisionActive
			* @param {} event An event object
			* @param {} event.pairs List of affected pairs
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
			*
			* @event collisionEnd
			* @param {} event An event object
			* @param {} event.pairs List of affected pairs
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * An integer `Number` that specifies the number of position iterations to perform each update.
			 * The higher the value, the higher quality the simulation will be at the expense of performance.
			 *
			 * @property positionIterations
			 * @type number
			 * @default 6
			 */
	
			/**
			 * An integer `Number` that specifies the number of velocity iterations to perform each update.
			 * The higher the value, the higher quality the simulation will be at the expense of performance.
			 *
			 * @property velocityIterations
			 * @type number
			 * @default 4
			 */
	
			/**
			 * An integer `Number` that specifies the number of constraint iterations to perform each update.
			 * The higher the value, the higher quality the simulation will be at the expense of performance.
			 * The default value of `2` is usually very adequate.
			 *
			 * @property constraintIterations
			 * @type number
			 * @default 2
			 */
	
			/**
			 * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
			 * Sleeping can improve stability and performance, but often at the expense of accuracy.
			 *
			 * @property enableSleeping
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * An `Object` containing properties regarding the timing systems of the engine. 
			 *
			 * @property timing
			 * @type object
			 */
	
			/**
			 * A `Number` that specifies the global scaling factor of time for all bodies.
			 * A value of `0` freezes the simulation.
			 * A value of `0.1` gives a slow-motion effect.
			 * A value of `1.2` gives a speed-up effect.
			 *
			 * @property timing.timeScale
			 * @type number
			 * @default 1
			 */
	
			/**
			 * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
			 * It is incremented on every `Engine.update` by the given `delta` argument. 
			 *
			 * @property timing.timestamp
			 * @type number
			 * @default 0
			 */
	
			/**
			 * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
			 * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
			 *
			 * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
			 * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
			 *
			 * @property render
			 * @type render
			 * @deprecated see Demo.js for an example of creating a renderer
			 * @default a Matter.Render instance
			 */
	
			/**
			 * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
			 *
			 * @property broadphase
			 * @type grid
			 * @default a Matter.Grid instance
			 */
	
			/**
			 * A `World` composite object that will contain all simulated bodies and constraints.
			 *
			 * @property world
			 * @type world
			 * @default a Matter.World instance
			 */
	
			/**
			 * An object reserved for storing plugin-specific properties.
			 *
			 * @property plugin
			 * @type {}
			 */
	
	})();
	
	},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":31,"./Common":14,"./Events":16,"./Metrics":18,"./Sleeping":22}],16:[function(_dereq_,module,exports){
	/**
	* The `Matter.Events` module contains methods to fire and listen to events on other objects.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Events
	*/
	
	var Events = {};
	
	module.exports = Events;
	
	var Common = _dereq_('./Common');
	
	(function() {
	
			/**
			 * Subscribes a callback function to the given object's `eventName`.
			 * @method on
			 * @param {} object
			 * @param {string} eventNames
			 * @param {function} callback
			 */
			Events.on = function(object, eventNames, callback) {
					var names = eventNames.split(' '),
							name;
	
					for (var i = 0; i < names.length; i++) {
							name = names[i];
							object.events = object.events || {};
							object.events[name] = object.events[name] || [];
							object.events[name].push(callback);
					}
	
					return callback;
			};
	
			/**
			 * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
			 * @method off
			 * @param {} object
			 * @param {string} eventNames
			 * @param {function} callback
			 */
			Events.off = function(object, eventNames, callback) {
					if (!eventNames) {
							object.events = {};
							return;
					}
	
					// handle Events.off(object, callback)
					if (typeof eventNames === 'function') {
							callback = eventNames;
							eventNames = Common.keys(object.events).join(' ');
					}
	
					var names = eventNames.split(' ');
	
					for (var i = 0; i < names.length; i++) {
							var callbacks = object.events[names[i]],
									newCallbacks = [];
	
							if (callback && callbacks) {
									for (var j = 0; j < callbacks.length; j++) {
											if (callbacks[j] !== callback)
													newCallbacks.push(callbacks[j]);
									}
							}
	
							object.events[names[i]] = newCallbacks;
					}
			};
	
			/**
			 * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
			 * @method trigger
			 * @param {} object
			 * @param {string} eventNames
			 * @param {} event
			 */
			Events.trigger = function(object, eventNames, event) {
					var names,
							name,
							callbacks,
							eventClone;
	
					if (object.events) {
							if (!event)
									event = {};
	
							names = eventNames.split(' ');
	
							for (var i = 0; i < names.length; i++) {
									name = names[i];
									callbacks = object.events[name];
	
									if (callbacks) {
											eventClone = Common.clone(event, false);
											eventClone.name = name;
											eventClone.source = object;
	
											for (var j = 0; j < callbacks.length; j++) {
													callbacks[j].apply(object, [eventClone]);
											}
									}
							}
					}
			};
	
	})();
	
	},{"./Common":14}],17:[function(_dereq_,module,exports){
	/**
	* The `Matter` module is the top level namespace. It also includes a function for installing plugins on top of the library.
	*
	* @class Matter
	*/
	
	var Matter = {};
	
	module.exports = Matter;
	
	var Plugin = _dereq_('./Plugin');
	var Common = _dereq_('./Common');
	
	(function() {
	
			/**
			 * The library name.
			 * @property name
			 * @readOnly
			 * @type {String}
			 */
			Matter.name = 'matter-js';
	
			/**
			 * The library version.
			 * @property version
			 * @readOnly
			 * @type {String}
			 */
			Matter.version = '0.14.2';
	
			/**
			 * A list of plugin dependencies to be installed. These are normally set and installed through `Matter.use`.
			 * Alternatively you may set `Matter.uses` manually and install them by calling `Plugin.use(Matter)`.
			 * @property uses
			 * @type {Array}
			 */
			Matter.uses = [];
	
			/**
			 * The plugins that have been installed through `Matter.Plugin.install`. Read only.
			 * @property used
			 * @readOnly
			 * @type {Array}
			 */
			Matter.used = [];
	
			/**
			 * Installs the given plugins on the `Matter` namespace.
			 * This is a short-hand for `Plugin.use`, see it for more information.
			 * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
			 * Avoid calling this function multiple times unless you intend to manually control installation order.
			 * @method use
			 * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
			 */
			Matter.use = function() {
					Plugin.use(Matter, Array.prototype.slice.call(arguments));
			};
	
			/**
			 * Chains a function to excute before the original function on the given `path` relative to `Matter`.
			 * See also docs for `Common.chain`.
			 * @method before
			 * @param {string} path The path relative to `Matter`
			 * @param {function} func The function to chain before the original
			 * @return {function} The chained function that replaced the original
			 */
			Matter.before = function(path, func) {
					path = path.replace(/^Matter./, '');
					return Common.chainPathBefore(Matter, path, func);
			};
	
			/**
			 * Chains a function to excute after the original function on the given `path` relative to `Matter`.
			 * See also docs for `Common.chain`.
			 * @method after
			 * @param {string} path The path relative to `Matter`
			 * @param {function} func The function to chain after the original
			 * @return {function} The chained function that replaced the original
			 */
			Matter.after = function(path, func) {
					path = path.replace(/^Matter./, '');
					return Common.chainPathAfter(Matter, path, func);
			};
	
	})();
	
	},{"./Common":14,"./Plugin":20}],18:[function(_dereq_,module,exports){
	
	},{"../body/Composite":2,"./Common":14}],19:[function(_dereq_,module,exports){
	/**
	* The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
	*
	* @class Mouse
	*/
	
	var Mouse = {};
	
	module.exports = Mouse;
	
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Creates a mouse input.
			 * @method create
			 * @param {HTMLElement} element
			 * @return {mouse} A new mouse
			 */
			Mouse.create = function(element) {
					var mouse = {};
	
					if (!element) {
							Common.log('Mouse.create: element was undefined, defaulting to document.body', 'warn');
					}
					
					mouse.element = element || document.body;
					mouse.absolute = { x: 0, y: 0 };
					mouse.position = { x: 0, y: 0 };
					mouse.mousedownPosition = { x: 0, y: 0 };
					mouse.mouseupPosition = { x: 0, y: 0 };
					mouse.offset = { x: 0, y: 0 };
					mouse.scale = { x: 1, y: 1 };
					mouse.wheelDelta = 0;
					mouse.button = -1;
					mouse.pixelRatio = mouse.element.getAttribute('data-pixel-ratio') || 1;
	
					mouse.sourceEvents = {
							mousemove: null,
							mousedown: null,
							mouseup: null,
							mousewheel: null
					};
					
					mouse.mousemove = function(event) { 
							var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
									touches = event.changedTouches;
	
							if (touches) {
									mouse.button = 0;
									event.preventDefault();
							}
	
							mouse.absolute.x = position.x;
							mouse.absolute.y = position.y;
							mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
							mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
							mouse.sourceEvents.mousemove = event;
					};
					
					mouse.mousedown = function(event) {
							var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
									touches = event.changedTouches;
	
							if (touches) {
									mouse.button = 0;
									event.preventDefault();
							} else {
									mouse.button = event.button;
							}
	
							mouse.absolute.x = position.x;
							mouse.absolute.y = position.y;
							mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
							mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
							mouse.mousedownPosition.x = mouse.position.x;
							mouse.mousedownPosition.y = mouse.position.y;
							mouse.sourceEvents.mousedown = event;
					};
					
					mouse.mouseup = function(event) {
							var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
									touches = event.changedTouches;
	
							if (touches) {
									event.preventDefault();
							}
							
							mouse.button = -1;
							mouse.absolute.x = position.x;
							mouse.absolute.y = position.y;
							mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
							mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
							mouse.mouseupPosition.x = mouse.position.x;
							mouse.mouseupPosition.y = mouse.position.y;
							mouse.sourceEvents.mouseup = event;
					};
	
					mouse.mousewheel = function(event) {
							mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
							event.preventDefault();
					};
	
					Mouse.setElement(mouse, mouse.element);
	
					return mouse;
			};
	
			/**
			 * Sets the element the mouse is bound to (and relative to).
			 * @method setElement
			 * @param {mouse} mouse
			 * @param {HTMLElement} element
			 */
			Mouse.setElement = function(mouse, element) {
					mouse.element = element;
	
					element.addEventListener('mousemove', mouse.mousemove);
					element.addEventListener('mousedown', mouse.mousedown);
					element.addEventListener('mouseup', mouse.mouseup);
					
					element.addEventListener('mousewheel', mouse.mousewheel);
					element.addEventListener('DOMMouseScroll', mouse.mousewheel);
	
					element.addEventListener('touchmove', mouse.mousemove);
					element.addEventListener('touchstart', mouse.mousedown);
					element.addEventListener('touchend', mouse.mouseup);
			};
	
			/**
			 * Clears all captured source events.
			 * @method clearSourceEvents
			 * @param {mouse} mouse
			 */
			Mouse.clearSourceEvents = function(mouse) {
					mouse.sourceEvents.mousemove = null;
					mouse.sourceEvents.mousedown = null;
					mouse.sourceEvents.mouseup = null;
					mouse.sourceEvents.mousewheel = null;
					mouse.wheelDelta = 0;
			};
	
			/**
			 * Sets the mouse position offset.
			 * @method setOffset
			 * @param {mouse} mouse
			 * @param {vector} offset
			 */
			Mouse.setOffset = function(mouse, offset) {
					mouse.offset.x = offset.x;
					mouse.offset.y = offset.y;
					mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
					mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
			};
	
			/**
			 * Sets the mouse position scale.
			 * @method setScale
			 * @param {mouse} mouse
			 * @param {vector} scale
			 */
			Mouse.setScale = function(mouse, scale) {
					mouse.scale.x = scale.x;
					mouse.scale.y = scale.y;
					mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
					mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
			};
			
			/**
			 * Gets the mouse position relative to an element given a screen pixel ratio.
			 * @method _getRelativeMousePosition
			 * @private
			 * @param {} event
			 * @param {} element
			 * @param {number} pixelRatio
			 * @return {}
			 */
			Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
					var elementBounds = element.getBoundingClientRect(),
							rootNode = (document.documentElement || document.body.parentNode || document.body),
							scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft,
							scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop,
							touches = event.changedTouches,
							x, y;
					
					if (touches) {
							x = touches[0].pageX - elementBounds.left - scrollX;
							y = touches[0].pageY - elementBounds.top - scrollY;
					} else {
							x = event.pageX - elementBounds.left - scrollX;
							y = event.pageY - elementBounds.top - scrollY;
					}
	
					return { 
							x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
							y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
					};
			};
	
	})();
	
	},{"../core/Common":14}],20:[function(_dereq_,module,exports){
	/**
	* The `Matter.Plugin` module contains functions for registering and installing plugins on modules.
	*
	* @class Plugin
	*/
	
	var Plugin = {};
	
	module.exports = Plugin;
	
	var Common = _dereq_('./Common');
	
	(function() {
	
			Plugin._registry = {};
	
			/**
			 * Registers a plugin object so it can be resolved later by name.
			 * @method register
			 * @param plugin {} The plugin to register.
			 * @return {object} The plugin.
			 */
			Plugin.register = function(plugin) {
					if (!Plugin.isPlugin(plugin)) {
							Common.warn('Plugin.register:', Plugin.toString(plugin), 'does not implement all required fields.');
					}
	
					if (plugin.name in Plugin._registry) {
							var registered = Plugin._registry[plugin.name],
									pluginVersion = Plugin.versionParse(plugin.version).number,
									registeredVersion = Plugin.versionParse(registered.version).number;
	
							if (pluginVersion > registeredVersion) {
									Common.warn('Plugin.register:', Plugin.toString(registered), 'was upgraded to', Plugin.toString(plugin));
									Plugin._registry[plugin.name] = plugin;
							} else if (pluginVersion < registeredVersion) {
									Common.warn('Plugin.register:', Plugin.toString(registered), 'can not be downgraded to', Plugin.toString(plugin));
							} else if (plugin !== registered) {
									Common.warn('Plugin.register:', Plugin.toString(plugin), 'is already registered to different plugin object');
							}
					} else {
							Plugin._registry[plugin.name] = plugin;
					}
	
					return plugin;
			};
	
			/**
			 * Resolves a dependency to a plugin object from the registry if it exists. 
			 * The `dependency` may contain a version, but only the name matters when resolving.
			 * @method resolve
			 * @param dependency {string} The dependency.
			 * @return {object} The plugin if resolved, otherwise `undefined`.
			 */
			Plugin.resolve = function(dependency) {
					return Plugin._registry[Plugin.dependencyParse(dependency).name];
			};
	
			/**
			 * Returns a pretty printed plugin name and version.
			 * @method toString
			 * @param plugin {} The plugin.
			 * @return {string} Pretty printed plugin name and version.
			 */
			Plugin.toString = function(plugin) {
					return typeof plugin === 'string' ? plugin : (plugin.name || 'anonymous') + '@' + (plugin.version || plugin.range || '0.0.0');
			};
	
			/**
			 * Returns `true` if the object meets the minimum standard to be considered a plugin.
			 * This means it must define the following properties:
			 * - `name`
			 * - `version`
			 * - `install`
			 * @method isPlugin
			 * @param obj {} The obj to test.
			 * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
			 */
			Plugin.isPlugin = function(obj) {
					return obj && obj.name && obj.version && obj.install;
			};
	
			/**
			 * Returns `true` if a plugin with the given `name` been installed on `module`.
			 * @method isUsed
			 * @param module {} The module.
			 * @param name {string} The plugin name.
			 * @return {boolean} `true` if a plugin with the given `name` been installed on `module`, otherwise `false`.
			 */
			Plugin.isUsed = function(module, name) {
					return module.used.indexOf(name) > -1;
			};
	
			/**
			 * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
			 * If `plugin.for` is not specified then it is assumed to be applicable.
			 * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
			 * @method isFor
			 * @param plugin {} The plugin.
			 * @param module {} The module.
			 * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
			 */
			Plugin.isFor = function(plugin, module) {
					var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
					return !plugin.for || (module.name === parsed.name && Plugin.versionSatisfies(module.version, parsed.range));
			};
	
			/**
			 * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
			 * For installing plugins on `Matter` see the convenience function `Matter.use`.
			 * Plugins may be specified either by their name or a reference to the plugin object.
			 * Plugins themselves may specify further dependencies, but each plugin is installed only once.
			 * Order is important, a topological sort is performed to find the best resulting order of installation.
			 * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
			 * This function logs the resulting status of each dependency in the console, along with any warnings.
			 * - A green tick ✅ indicates a dependency was resolved and installed.
			 * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
			 * - A red cross ❌ indicates a dependency could not be resolved.
			 * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
			 * @method use
			 * @param module {} The module install plugins on.
			 * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
			 */
			Plugin.use = function(module, plugins) {
					module.uses = (module.uses || []).concat(plugins || []);
	
					if (module.uses.length === 0) {
							Common.warn('Plugin.use:', Plugin.toString(module), 'does not specify any dependencies to install.');
							return;
					}
	
					var dependencies = Plugin.dependencies(module),
							sortedDependencies = Common.topologicalSort(dependencies),
							status = [];
	
					for (var i = 0; i < sortedDependencies.length; i += 1) {
							if (sortedDependencies[i] === module.name) {
									continue;
							}
	
							var plugin = Plugin.resolve(sortedDependencies[i]);
	
							if (!plugin) {
									status.push('❌ ' + sortedDependencies[i]);
									continue;
							}
	
							if (Plugin.isUsed(module, plugin.name)) {
									continue;
							}
	
							if (!Plugin.isFor(plugin, module)) {
									Common.warn('Plugin.use:', Plugin.toString(plugin), 'is for', plugin.for, 'but installed on', Plugin.toString(module) + '.');
									plugin._warned = true;
							}
	
							if (plugin.install) {
									plugin.install(module);
							} else {
									Common.warn('Plugin.use:', Plugin.toString(plugin), 'does not specify an install function.');
									plugin._warned = true;
							}
	
							if (plugin._warned) {
									status.push('🔶 ' + Plugin.toString(plugin));
									delete plugin._warned;
							} else {
									status.push('✅ ' + Plugin.toString(plugin));
							}
	
							module.used.push(plugin.name);
					}
	
					if (status.length > 0) {
							Common.info(status.join('  '));
					}
			};
	
			/**
			 * Recursively finds all of a module's dependencies and returns a flat dependency graph.
			 * @method dependencies
			 * @param module {} The module.
			 * @return {object} A dependency graph.
			 */
			Plugin.dependencies = function(module, tracked) {
					var parsedBase = Plugin.dependencyParse(module),
							name = parsedBase.name;
	
					tracked = tracked || {};
	
					if (name in tracked) {
							return;
					}
	
					module = Plugin.resolve(module) || module;
	
					tracked[name] = Common.map(module.uses || [], function(dependency) {
							if (Plugin.isPlugin(dependency)) {
									Plugin.register(dependency);
							}
	
							var parsed = Plugin.dependencyParse(dependency),
									resolved = Plugin.resolve(dependency);
	
							if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
									Common.warn(
											'Plugin.dependencies:', Plugin.toString(resolved), 'does not satisfy',
											Plugin.toString(parsed), 'used by', Plugin.toString(parsedBase) + '.'
									);
	
									resolved._warned = true;
									module._warned = true;
							} else if (!resolved) {
									Common.warn(
											'Plugin.dependencies:', Plugin.toString(dependency), 'used by',
											Plugin.toString(parsedBase), 'could not be resolved.'
									);
	
									module._warned = true;
							}
	
							return parsed.name;
					});
	
					for (var i = 0; i < tracked[name].length; i += 1) {
							Plugin.dependencies(tracked[name][i], tracked);
					}
	
					return tracked;
			};
	
			/**
			 * Parses a dependency string into its components.
			 * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
			 * See documentation for `Plugin.versionParse` for a description of the format.
			 * This function can also handle dependencies that are already resolved (e.g. a module object).
			 * @method dependencyParse
			 * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
			 * @return {object} The dependency parsed into its components.
			 */
			Plugin.dependencyParse = function(dependency) {
					if (Common.isString(dependency)) {
							var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;
	
							if (!pattern.test(dependency)) {
									Common.warn('Plugin.dependencyParse:', dependency, 'is not a valid dependency string.');
							}
	
							return {
									name: dependency.split('@')[0],
									range: dependency.split('@')[1] || '*'
							};
					}
	
					return {
							name: dependency.name,
							range: dependency.range || dependency.version
					};
			};
	
			/**
			 * Parses a version string into its components.  
			 * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
			 * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
			 * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
			 * Only the following range types are supported:
			 * - Tilde ranges e.g. `~1.2.3`
			 * - Caret ranges e.g. `^1.2.3`
			 * - Exact version e.g. `1.2.3`
			 * - Any version `*`
			 * @method versionParse
			 * @param range {string} The version string.
			 * @return {object} The version range parsed into its components.
			 */
			Plugin.versionParse = function(range) {
					var pattern = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;
	
					if (!pattern.test(range)) {
							Common.warn('Plugin.versionParse:', range, 'is not a valid version or range.');
					}
	
					var identifiers = range.split('-');
					range = identifiers[0];
	
					var isRange = isNaN(Number(range[0])),
							version = isRange ? range.substr(1) : range,
							parts = Common.map(version.split('.'), function(part) {
									return Number(part);
							});
	
					return {
							isRange: isRange,
							version: version,
							range: range,
							operator: isRange ? range[0] : '',
							parts: parts,
							prerelease: identifiers[1],
							number: parts[0] * 1e8 + parts[1] * 1e4 + parts[2]
					};
			};
	
			/**
			 * Returns `true` if `version` satisfies the given `range`.
			 * See documentation for `Plugin.versionParse` for a description of the format.
			 * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
			 * @method versionSatisfies
			 * @param version {string} The version string.
			 * @param range {string} The range string.
			 * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
			 */
			Plugin.versionSatisfies = function(version, range) {
					range = range || '*';
	
					var rangeParsed = Plugin.versionParse(range),
							rangeParts = rangeParsed.parts,
							versionParsed = Plugin.versionParse(version),
							versionParts = versionParsed.parts;
	
					if (rangeParsed.isRange) {
							if (rangeParsed.operator === '*' || version === '*') {
									return true;
							}
	
							if (rangeParsed.operator === '~') {
									return versionParts[0] === rangeParts[0] && versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
							}
	
							if (rangeParsed.operator === '^') {
									if (rangeParts[0] > 0) {
											return versionParts[0] === rangeParts[0] && versionParsed.number >= rangeParsed.number;
									}
	
									if (rangeParts[1] > 0) {
											return versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
									}
	
									return versionParts[2] === rangeParts[2];
							}
					}
	
					return version === range || version === '*';
			};
	
	})();
	
	},{"./Common":14}],21:[function(_dereq_,module,exports){
	/**
	* The `Matter.Runner` module is an optional utility which provides a game loop, 
	* that handles continuously updating a `Matter.Engine` for you within a browser.
	* It is intended for development and debugging purposes, but may also be suitable for simple games.
	* If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
	* Instead just call `Engine.update(engine, delta)` in your own loop.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Runner
	*/
	
	var Runner = {};
	
	module.exports = Runner;
	
	var Events = _dereq_('./Events');
	var Engine = _dereq_('./Engine');
	var Common = _dereq_('./Common');
	
	(function() {
	
			var _requestAnimationFrame,
					_cancelAnimationFrame;
	
			if (typeof window !== 'undefined') {
					_requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
																				|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
		 
					_cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
																				|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
			}
	
			if (!_requestAnimationFrame) {
					var _frameTimeout;
	
					_requestAnimationFrame = function(callback){ 
							_frameTimeout = setTimeout(function() { 
									callback(Common.now()); 
							}, 1000 / 60);
					};
	
					_cancelAnimationFrame = function() {
							clearTimeout(_frameTimeout);
					};
			}
	
			/**
			 * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * @method create
			 * @param {} options
			 */
			Runner.create = function(options) {
					var defaults = {
							fps: 60,
							correction: 1,
							deltaSampleSize: 60,
							counterTimestamp: 0,
							frameCounter: 0,
							deltaHistory: [],
							timePrev: null,
							timeScalePrev: 1,
							frameRequestId: null,
							isFixed: false,
							enabled: true
					};
	
					var runner = Common.extend(defaults, options);
	
					runner.delta = runner.delta || 1000 / runner.fps;
					runner.deltaMin = runner.deltaMin || 1000 / runner.fps;
					runner.deltaMax = runner.deltaMax || 1000 / (runner.fps * 0.5);
					runner.fps = 1000 / runner.delta;
	
					return runner;
			};
	
			/**
			 * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
			 * @method run
			 * @param {engine} engine
			 */
			Runner.run = function(runner, engine) {
					// create runner if engine is first argument
					if (typeof runner.positionIterations !== 'undefined') {
							engine = runner;
							runner = Runner.create();
					}
	
					(function render(time){
							runner.frameRequestId = _requestAnimationFrame(render);
	
							if (time && runner.enabled) {
									Runner.tick(runner, engine, time);
							}
					})();
	
					return runner;
			};
	
			/**
			 * A game loop utility that updates the engine and renderer by one step (a 'tick').
			 * Features delta smoothing, time correction and fixed or dynamic timing.
			 * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
			 * Consider just `Engine.update(engine, delta)` if you're using your own loop.
			 * @method tick
			 * @param {runner} runner
			 * @param {engine} engine
			 * @param {number} time
			 */
			Runner.tick = function(runner, engine, time) {
					var timing = engine.timing,
							correction = 1,
							delta;
	
					// create an event object
					var event = {
							timestamp: timing.timestamp
					};
	
					Events.trigger(runner, 'beforeTick', event);
					Events.trigger(engine, 'beforeTick', event); // @deprecated
	
					if (runner.isFixed) {
							// fixed timestep
							delta = runner.delta;
					} else {
							// dynamic timestep based on wall clock between calls
							delta = (time - runner.timePrev) || runner.delta;
							runner.timePrev = time;
	
							// optimistically filter delta over a few frames, to improve stability
							runner.deltaHistory.push(delta);
							runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
							delta = Math.min.apply(null, runner.deltaHistory);
							
							// limit delta
							delta = delta < runner.deltaMin ? runner.deltaMin : delta;
							delta = delta > runner.deltaMax ? runner.deltaMax : delta;
	
							// correction for delta
							correction = delta / runner.delta;
	
							// update engine timing object
							runner.delta = delta;
					}
	
					// time correction for time scaling
					if (runner.timeScalePrev !== 0)
							correction *= timing.timeScale / runner.timeScalePrev;
	
					if (timing.timeScale === 0)
							correction = 0;
	
					runner.timeScalePrev = timing.timeScale;
					runner.correction = correction;
	
					// fps counter
					runner.frameCounter += 1;
					if (time - runner.counterTimestamp >= 1000) {
							runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1000);
							runner.counterTimestamp = time;
							runner.frameCounter = 0;
					}
	
					Events.trigger(runner, 'tick', event);
					Events.trigger(engine, 'tick', event); // @deprecated
	
					// if world has been modified, clear the render scene graph
					if (engine.world.isModified 
							&& engine.render
							&& engine.render.controller
							&& engine.render.controller.clear) {
							engine.render.controller.clear(engine.render); // @deprecated
					}
	
					// update
					Events.trigger(runner, 'beforeUpdate', event);
					Engine.update(engine, delta, correction);
					Events.trigger(runner, 'afterUpdate', event);
	
					// render
					// @deprecated
					if (engine.render && engine.render.controller) {
							Events.trigger(runner, 'beforeRender', event);
							Events.trigger(engine, 'beforeRender', event); // @deprecated
	
							engine.render.controller.world(engine.render);
	
							Events.trigger(runner, 'afterRender', event);
							Events.trigger(engine, 'afterRender', event); // @deprecated
					}
	
					Events.trigger(runner, 'afterTick', event);
					Events.trigger(engine, 'afterTick', event); // @deprecated
			};
	
			/**
			 * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
			 * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
			 * @method stop
			 * @param {runner} runner
			 */
			Runner.stop = function(runner) {
					_cancelAnimationFrame(runner.frameRequestId);
			};
	
			/**
			 * Alias for `Runner.run`.
			 * @method start
			 * @param {runner} runner
			 * @param {engine} engine
			 */
			Runner.start = function(runner, engine) {
					Runner.run(runner, engine);
			};
	
			/*
			*
			*  Events Documentation
			*
			*/
	
			/**
			* Fired at the start of a tick, before any updates to the engine or timing
			*
			* @event beforeTick
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after engine timing updated, but just before update
			*
			* @event tick
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired at the end of a tick, after engine update and after rendering
			*
			* @event afterTick
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired before update
			*
			* @event beforeUpdate
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after update
			*
			* @event afterUpdate
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired before rendering
			*
			* @event beforeRender
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			* @deprecated
			*/
	
			/**
			* Fired after rendering
			*
			* @event afterRender
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			* @deprecated
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * A flag that specifies whether the runner is running or not.
			 *
			 * @property enabled
			 * @type boolean
			 * @default true
			 */
	
			/**
			 * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
			 * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
			 * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
			 *
			 * @property isFixed
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * A `Number` that specifies the time step between updates in milliseconds.
			 * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
			 * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
			 *
			 * @property delta
			 * @type number
			 * @default 1000 / 60
			 */
	
	})();
	
	},{"./Common":14,"./Engine":15,"./Events":16}],22:[function(_dereq_,module,exports){
	/**
	* The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
	*
	* @class Sleeping
	*/
	
	var Sleeping = {};
	
	module.exports = Sleeping;
	
	var Events = _dereq_('./Events');
	
	(function() {
	
			Sleeping._motionWakeThreshold = 0.18;
			Sleeping._motionSleepThreshold = 0.08;
			Sleeping._minBias = 0.9;
	
			/**
			 * Puts bodies to sleep or wakes them up depending on their motion.
			 * @method update
			 * @param {body[]} bodies
			 * @param {number} timeScale
			 */
			Sleeping.update = function(bodies, timeScale) {
					var timeFactor = timeScale * timeScale * timeScale;
	
					// update bodies sleeping status
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;
	
							// wake up bodies if they have a force applied
							if (body.force.x !== 0 || body.force.y !== 0) {
									Sleeping.set(body, false);
									continue;
							}
	
							var minMotion = Math.min(body.motion, motion),
									maxMotion = Math.max(body.motion, motion);
					
							// biased average motion estimation between frames
							body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
							
							if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
									body.sleepCounter += 1;
									
									if (body.sleepCounter >= body.sleepThreshold)
											Sleeping.set(body, true);
							} else if (body.sleepCounter > 0) {
									body.sleepCounter -= 1;
							}
					}
			};
	
			/**
			 * Given a set of colliding pairs, wakes the sleeping bodies involved.
			 * @method afterCollisions
			 * @param {pair[]} pairs
			 * @param {number} timeScale
			 */
			Sleeping.afterCollisions = function(pairs, timeScale) {
					var timeFactor = timeScale * timeScale * timeScale;
	
					// wake up bodies involved in collisions
					for (var i = 0; i < pairs.length; i++) {
							var pair = pairs[i];
							
							// don't wake inactive pairs
							if (!pair.isActive)
									continue;
	
							var collision = pair.collision,
									bodyA = collision.bodyA.parent, 
									bodyB = collision.bodyB.parent;
					
							// don't wake if at least one body is static
							if ((bodyA.isSleeping && bodyB.isSleeping) || bodyA.isStatic || bodyB.isStatic)
									continue;
					
							if (bodyA.isSleeping || bodyB.isSleeping) {
									var sleepingBody = (bodyA.isSleeping && !bodyA.isStatic) ? bodyA : bodyB,
											movingBody = sleepingBody === bodyA ? bodyB : bodyA;
	
									if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
											Sleeping.set(sleepingBody, false);
									}
							}
					}
			};
		
			/**
			 * Set a body as sleeping or awake.
			 * @method set
			 * @param {body} body
			 * @param {boolean} isSleeping
			 */
			Sleeping.set = function(body, isSleeping) {
					var wasSleeping = body.isSleeping;
	
					if (isSleeping) {
							body.isSleeping = true;
							body.sleepCounter = body.sleepThreshold;
	
							body.positionImpulse.x = 0;
							body.positionImpulse.y = 0;
	
							body.positionPrev.x = body.position.x;
							body.positionPrev.y = body.position.y;
	
							body.anglePrev = body.angle;
							body.speed = 0;
							body.angularSpeed = 0;
							body.motion = 0;
	
							if (!wasSleeping) {
									Events.trigger(body, 'sleepStart');
							}
					} else {
							body.isSleeping = false;
							body.sleepCounter = 0;
	
							if (wasSleeping) {
									Events.trigger(body, 'sleepEnd');
							}
					}
			};
	
	})();
	
	},{"./Events":16}],23:[function(_dereq_,module,exports){
	/**
	* The `Matter.Bodies` module contains factory methods for creating rigid body models 
	* with commonly used body configurations (such as rectangles, circles and other polygons).
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Bodies
	*/
	
	// TODO: true circle bodies
	
	var Bodies = {};
	
	module.exports = Bodies;
	
	var Vertices = _dereq_('../geometry/Vertices');
	var Common = _dereq_('../core/Common');
	var Body = _dereq_('../body/Body');
	var Bounds = _dereq_('../geometry/Bounds');
	var Vector = _dereq_('../geometry/Vector');
	var decomp;
	
	(function() {
	
			/**
			 * Creates a new rigid body model with a rectangle hull. 
			 * The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
			 * @method rectangle
			 * @param {number} x
			 * @param {number} y
			 * @param {number} width
			 * @param {number} height
			 * @param {object} [options]
			 * @return {body} A new rectangle body
			 */
			Bodies.rectangle = function(x, y, width, height, options) {
					options = options || {};
	
					var rectangle = { 
							label: 'Rectangle Body',
							position: { x: x, y: y },
							vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
					};
	
					if (options.chamfer) {
							var chamfer = options.chamfer;
							rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, 
																			chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
							delete options.chamfer;
					}
	
					return Body.create(Common.extend({}, rectangle, options));
			};
			
			/**
			 * Creates a new rigid body model with a trapezoid hull. 
			 * The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
			 * @method trapezoid
			 * @param {number} x
			 * @param {number} y
			 * @param {number} width
			 * @param {number} height
			 * @param {number} slope
			 * @param {object} [options]
			 * @return {body} A new trapezoid body
			 */
			Bodies.trapezoid = function(x, y, width, height, slope, options) {
					options = options || {};
	
					slope *= 0.5;
					var roof = (1 - (slope * 2)) * width;
					
					var x1 = width * slope,
							x2 = x1 + roof,
							x3 = x2 + x1,
							verticesPath;
	
					if (slope < 0.5) {
							verticesPath = 'L 0 0 L ' + x1 + ' ' + (-height) + ' L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
					} else {
							verticesPath = 'L 0 0 L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
					}
	
					var trapezoid = { 
							label: 'Trapezoid Body',
							position: { x: x, y: y },
							vertices: Vertices.fromPath(verticesPath)
					};
	
					if (options.chamfer) {
							var chamfer = options.chamfer;
							trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, 
																			chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
							delete options.chamfer;
					}
	
					return Body.create(Common.extend({}, trapezoid, options));
			};
	
			/**
			 * Creates a new rigid body model with a circle hull. 
			 * The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
			 * @method circle
			 * @param {number} x
			 * @param {number} y
			 * @param {number} radius
			 * @param {object} [options]
			 * @param {number} [maxSides]
			 * @return {body} A new circle body
			 */
			Bodies.circle = function(x, y, radius, options, maxSides) {
					options = options || {};
	
					var circle = {
							label: 'Circle Body',
							circleRadius: radius
					};
					
					// approximate circles with polygons until true circles implemented in SAT
					maxSides = maxSides || 25;
					var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));
	
					// optimisation: always use even number of sides (half the number of unique axes)
					if (sides % 2 === 1)
							sides += 1;
	
					return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
			};
	
			/**
			 * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
			 * The options parameter is an object that specifies any properties you wish to override the defaults.
			 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
			 * @method polygon
			 * @param {number} x
			 * @param {number} y
			 * @param {number} sides
			 * @param {number} radius
			 * @param {object} [options]
			 * @return {body} A new regular polygon body
			 */
			Bodies.polygon = function(x, y, sides, radius, options) {
					options = options || {};
	
					if (sides < 3)
							return Bodies.circle(x, y, radius, options);
	
					var theta = 2 * Math.PI / sides,
							path = '',
							offset = theta * 0.5;
	
					for (var i = 0; i < sides; i += 1) {
							var angle = offset + (i * theta),
									xx = Math.cos(angle) * radius,
									yy = Math.sin(angle) * radius;
	
							path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
					}
	
					var polygon = { 
							label: 'Polygon Body',
							position: { x: x, y: y },
							vertices: Vertices.fromPath(path)
					};
	
					if (options.chamfer) {
							var chamfer = options.chamfer;
							polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, 
																			chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
							delete options.chamfer;
					}
	
					return Body.create(Common.extend({}, polygon, options));
			};
	
			/**
			 * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
			 * If the vertices are convex, they will pass through as supplied.
			 * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
			 * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
			 * By default the decomposition will discard collinear edges (to improve performance).
			 * It can also optionally discard any parts that have an area less than `minimumArea`.
			 * If the vertices can not be decomposed, the result will fall back to using the convex hull.
			 * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
			 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
			 * @method fromVertices
			 * @param {number} x
			 * @param {number} y
			 * @param [[vector]] vertexSets
			 * @param {object} [options]
			 * @param {bool} [flagInternal=false]
			 * @param {number} [removeCollinear=0.01]
			 * @param {number} [minimumArea=10]
			 * @return {body}
			 */
			Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
					if (!decomp) {
							decomp = Common._requireGlobal('decomp', 'poly-decomp');
					}
	
					var body,
							parts,
							isConvex,
							vertices,
							i,
							j,
							k,
							v,
							z;
	
					options = options || {};
					parts = [];
	
					flagInternal = typeof flagInternal !== 'undefined' ? flagInternal : false;
					removeCollinear = typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
					minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;
	
					if (!decomp) {
							Common.warn('Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.');
					}
	
					// ensure vertexSets is an array of arrays
					if (!Common.isArray(vertexSets[0])) {
							vertexSets = [vertexSets];
					}
	
					for (v = 0; v < vertexSets.length; v += 1) {
							vertices = vertexSets[v];
							isConvex = Vertices.isConvex(vertices);
	
							if (isConvex || !decomp) {
									if (isConvex) {
											vertices = Vertices.clockwiseSort(vertices);
									} else {
											// fallback to convex hull when decomposition is not possible
											vertices = Vertices.hull(vertices);
									}
	
									parts.push({
											position: { x: x, y: y },
											vertices: vertices
									});
							} else {
									// initialise a decomposition
									var concave = vertices.map(function(vertex) {
											return [vertex.x, vertex.y];
									});
	
									// vertices are concave and simple, we can decompose into parts
									decomp.makeCCW(concave);
									if (removeCollinear !== false)
											decomp.removeCollinearPoints(concave, removeCollinear);
	
									// use the quick decomposition algorithm (Bayazit)
									var decomposed = decomp.quickDecomp(concave);
	
									// for each decomposed chunk
									for (i = 0; i < decomposed.length; i++) {
											var chunk = decomposed[i];
	
											// convert vertices into the correct structure
											var chunkVertices = chunk.map(function(vertices) {
													return {
															x: vertices[0],
															y: vertices[1]
													};
											});
	
											// skip small chunks
											if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
													continue;
	
											// create a compound part
											parts.push({
													position: Vertices.centre(chunkVertices),
													vertices: chunkVertices
											});
									}
							}
					}
	
					// create body parts
					for (i = 0; i < parts.length; i++) {
							parts[i] = Body.create(Common.extend(parts[i], options));
					}
	
					// flag internal edges (coincident part edges)
					if (flagInternal) {
							var coincident_max_dist = 5;
	
							for (i = 0; i < parts.length; i++) {
									var partA = parts[i];
	
									for (j = i + 1; j < parts.length; j++) {
											var partB = parts[j];
	
											if (Bounds.overlaps(partA.bounds, partB.bounds)) {
													var pav = partA.vertices,
															pbv = partB.vertices;
	
													// iterate vertices of both parts
													for (k = 0; k < partA.vertices.length; k++) {
															for (z = 0; z < partB.vertices.length; z++) {
																	// find distances between the vertices
																	var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])),
																			db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));
	
																	// if both vertices are very close, consider the edge concident (internal)
																	if (da < coincident_max_dist && db < coincident_max_dist) {
																			pav[k].isInternal = true;
																			pbv[z].isInternal = true;
																	}
															}
													}
	
											}
									}
							}
					}
	
					if (parts.length > 1) {
							// create the parent body to be returned, that contains generated compound parts
							body = Body.create(Common.extend({ parts: parts.slice(0) }, options));
							Body.setPosition(body, { x: x, y: y });
	
							return body;
					} else {
							return parts[0];
					}
			};
	
	})();
	
	},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],24:[function(_dereq_,module,exports){
	/**
	* The `Matter.Composites` module contains factory methods for creating composite bodies
	* with commonly used configurations (such as stacks and chains).
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Composites
	*/
	
	var Composites = {};
	
	module.exports = Composites;
	
	var Composite = _dereq_('../body/Composite');
	var Constraint = _dereq_('../constraint/Constraint');
	var Common = _dereq_('../core/Common');
	var Body = _dereq_('../body/Body');
	var Bodies = _dereq_('./Bodies');
	
	(function() {
	
			/**
			 * Create a new composite containing bodies created in the callback in a grid arrangement.
			 * This function uses the body's bounds to prevent overlaps.
			 * @method stack
			 * @param {number} xx
			 * @param {number} yy
			 * @param {number} columns
			 * @param {number} rows
			 * @param {number} columnGap
			 * @param {number} rowGap
			 * @param {function} callback
			 * @return {composite} A new composite containing objects created in the callback
			 */
			Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
					var stack = Composite.create({ label: 'Stack' }),
							x = xx,
							y = yy,
							lastBody,
							i = 0;
	
					for (var row = 0; row < rows; row++) {
							var maxHeight = 0;
							
							for (var column = 0; column < columns; column++) {
									var body = callback(x, y, column, row, lastBody, i);
											
									if (body) {
											var bodyHeight = body.bounds.max.y - body.bounds.min.y,
													bodyWidth = body.bounds.max.x - body.bounds.min.x; 
	
											if (bodyHeight > maxHeight)
													maxHeight = bodyHeight;
											
											Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });
	
											x = body.bounds.max.x + columnGap;
	
											Composite.addBody(stack, body);
											
											lastBody = body;
											i += 1;
									} else {
											x += columnGap;
									}
							}
							
							y += maxHeight + rowGap;
							x = xx;
					}
	
					return stack;
			};
			
			/**
			 * Chains all bodies in the given composite together using constraints.
			 * @method chain
			 * @param {composite} composite
			 * @param {number} xOffsetA
			 * @param {number} yOffsetA
			 * @param {number} xOffsetB
			 * @param {number} yOffsetB
			 * @param {object} options
			 * @return {composite} A new composite containing objects chained together with constraints
			 */
			Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
					var bodies = composite.bodies;
					
					for (var i = 1; i < bodies.length; i++) {
							var bodyA = bodies[i - 1],
									bodyB = bodies[i],
									bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
									bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, 
									bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
									bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
					
							var defaults = {
									bodyA: bodyA,
									pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
									bodyB: bodyB,
									pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
							};
							
							var constraint = Common.extend(defaults, options);
					
							Composite.addConstraint(composite, Constraint.create(constraint));
					}
	
					composite.label += ' Chain';
					
					return composite;
			};
	
			/**
			 * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
			 * @method mesh
			 * @param {composite} composite
			 * @param {number} columns
			 * @param {number} rows
			 * @param {boolean} crossBrace
			 * @param {object} options
			 * @return {composite} The composite containing objects meshed together with constraints
			 */
			Composites.mesh = function(composite, columns, rows, crossBrace, options) {
					var bodies = composite.bodies,
							row,
							col,
							bodyA,
							bodyB,
							bodyC;
					
					for (row = 0; row < rows; row++) {
							for (col = 1; col < columns; col++) {
									bodyA = bodies[(col - 1) + (row * columns)];
									bodyB = bodies[col + (row * columns)];
									Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
							}
	
							if (row > 0) {
									for (col = 0; col < columns; col++) {
											bodyA = bodies[col + ((row - 1) * columns)];
											bodyB = bodies[col + (row * columns)];
											Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
	
											if (crossBrace && col > 0) {
													bodyC = bodies[(col - 1) + ((row - 1) * columns)];
													Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
											}
	
											if (crossBrace && col < columns - 1) {
													bodyC = bodies[(col + 1) + ((row - 1) * columns)];
													Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
											}
									}
							}
					}
	
					composite.label += ' Mesh';
					
					return composite;
			};
			
			/**
			 * Create a new composite containing bodies created in the callback in a pyramid arrangement.
			 * This function uses the body's bounds to prevent overlaps.
			 * @method pyramid
			 * @param {number} xx
			 * @param {number} yy
			 * @param {number} columns
			 * @param {number} rows
			 * @param {number} columnGap
			 * @param {number} rowGap
			 * @param {function} callback
			 * @return {composite} A new composite containing objects created in the callback
			 */
			Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
					return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
							var actualRows = Math.min(rows, Math.ceil(columns / 2)),
									lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
							
							if (row > actualRows)
									return;
							
							// reverse row order
							row = actualRows - row;
							
							var start = row,
									end = columns - 1 - row;
	
							if (column < start || column > end)
									return;
							
							// retroactively fix the first body's position, since width was unknown
							if (i === 1) {
									Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
							}
	
							var xOffset = lastBody ? column * lastBodyWidth : 0;
							
							return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
					});
			};
	
			/**
			 * Creates a composite with a Newton's Cradle setup of bodies and constraints.
			 * @method newtonsCradle
			 * @param {number} xx
			 * @param {number} yy
			 * @param {number} number
			 * @param {number} size
			 * @param {number} length
			 * @return {composite} A new composite newtonsCradle body
			 */
			Composites.newtonsCradle = function(xx, yy, number, size, length) {
					var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });
	
					for (var i = 0; i < number; i++) {
							var separation = 1.9,
									circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
															{ inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
									constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });
	
							Composite.addBody(newtonsCradle, circle);
							Composite.addConstraint(newtonsCradle, constraint);
					}
	
					return newtonsCradle;
			};
			
			/**
			 * Creates a composite with simple car setup of bodies and constraints.
			 * @method car
			 * @param {number} xx
			 * @param {number} yy
			 * @param {number} width
			 * @param {number} height
			 * @param {number} wheelSize
			 * @return {composite} A new composite car body
			 */
			Composites.car = function(xx, yy, width, height, wheelSize) {
					var group = Body.nextGroup(true),
							wheelBase = 20,
							wheelAOffset = -width * 0.5 + wheelBase,
							wheelBOffset = width * 0.5 - wheelBase,
							wheelYOffset = 0;
			
					var car = Composite.create({ label: 'Car' }),
							body = Bodies.rectangle(xx, yy, width, height, { 
									collisionFilter: {
											group: group
									},
									chamfer: {
											radius: height * 0.5
									},
									density: 0.0002
							});
			
					var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
							collisionFilter: {
									group: group
							},
							friction: 0.8
					});
											
					var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
							collisionFilter: {
									group: group
							},
							friction: 0.8
					});
											
					var axelA = Constraint.create({
							bodyB: body,
							pointB: { x: wheelAOffset, y: wheelYOffset },
							bodyA: wheelA,
							stiffness: 1,
							length: 0
					});
													
					var axelB = Constraint.create({
							bodyB: body,
							pointB: { x: wheelBOffset, y: wheelYOffset },
							bodyA: wheelB,
							stiffness: 1,
							length: 0
					});
					
					Composite.addBody(car, body);
					Composite.addBody(car, wheelA);
					Composite.addBody(car, wheelB);
					Composite.addConstraint(car, axelA);
					Composite.addConstraint(car, axelB);
	
					return car;
			};
	
			/**
			 * Creates a simple soft body like object.
			 * @method softBody
			 * @param {number} xx
			 * @param {number} yy
			 * @param {number} columns
			 * @param {number} rows
			 * @param {number} columnGap
			 * @param {number} rowGap
			 * @param {boolean} crossBrace
			 * @param {number} particleRadius
			 * @param {} particleOptions
			 * @param {} constraintOptions
			 * @return {composite} A new composite softBody
			 */
			Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
					particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
					constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);
	
					var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
							return Bodies.circle(x, y, particleRadius, particleOptions);
					});
	
					Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
	
					softBody.label = 'Soft Body';
	
					return softBody;
			};
	
	})();
	
	},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":23}],25:[function(_dereq_,module,exports){
	/**
	* The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
	*
	* @class Axes
	*/
	
	var Axes = {};
	
	module.exports = Axes;
	
	var Vector = _dereq_('../geometry/Vector');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Creates a new set of axes from the given vertices.
			 * @method fromVertices
			 * @param {vertices} vertices
			 * @return {axes} A new axes from the given vertices
			 */
			Axes.fromVertices = function(vertices) {
					var axes = {};
	
					// find the unique axes, using edge normal gradients
					for (var i = 0; i < vertices.length; i++) {
							var j = (i + 1) % vertices.length, 
									normal = Vector.normalise({ 
											x: vertices[j].y - vertices[i].y, 
											y: vertices[i].x - vertices[j].x
									}),
									gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y);
							
							// limit precision
							gradient = gradient.toFixed(3).toString();
							axes[gradient] = normal;
					}
	
					return Common.values(axes);
			};
	
			/**
			 * Rotates a set of axes by the given angle.
			 * @method rotate
			 * @param {axes} axes
			 * @param {number} angle
			 */
			Axes.rotate = function(axes, angle) {
					if (angle === 0)
							return;
					
					var cos = Math.cos(angle),
							sin = Math.sin(angle);
	
					for (var i = 0; i < axes.length; i++) {
							var axis = axes[i],
									xx;
							xx = axis.x * cos - axis.y * sin;
							axis.y = axis.x * sin + axis.y * cos;
							axis.x = xx;
					}
			};
	
	})();
	
	},{"../core/Common":14,"../geometry/Vector":28}],26:[function(_dereq_,module,exports){
	/**
	* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
	*
	* @class Bounds
	*/
	
	var Bounds = {};
	
	module.exports = Bounds;
	
	(function() {
	
			/**
			 * Creates a new axis-aligned bounding box (AABB) for the given vertices.
			 * @method create
			 * @param {vertices} vertices
			 * @return {bounds} A new bounds object
			 */
			Bounds.create = function(vertices) {
					var bounds = { 
							min: { x: 0, y: 0 }, 
							max: { x: 0, y: 0 }
					};
	
					if (vertices)
							Bounds.update(bounds, vertices);
					
					return bounds;
			};
	
			/**
			 * Updates bounds using the given vertices and extends the bounds given a velocity.
			 * @method update
			 * @param {bounds} bounds
			 * @param {vertices} vertices
			 * @param {vector} velocity
			 */
			Bounds.update = function(bounds, vertices, velocity) {
					bounds.min.x = Infinity;
					bounds.max.x = -Infinity;
					bounds.min.y = Infinity;
					bounds.max.y = -Infinity;
	
					for (var i = 0; i < vertices.length; i++) {
							var vertex = vertices[i];
							if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
							if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
							if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
							if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
					}
					
					if (velocity) {
							if (velocity.x > 0) {
									bounds.max.x += velocity.x;
							} else {
									bounds.min.x += velocity.x;
							}
							
							if (velocity.y > 0) {
									bounds.max.y += velocity.y;
							} else {
									bounds.min.y += velocity.y;
							}
					}
			};
	
			/**
			 * Returns true if the bounds contains the given point.
			 * @method contains
			 * @param {bounds} bounds
			 * @param {vector} point
			 * @return {boolean} True if the bounds contain the point, otherwise false
			 */
			Bounds.contains = function(bounds, point) {
					return point.x >= bounds.min.x && point.x <= bounds.max.x 
								 && point.y >= bounds.min.y && point.y <= bounds.max.y;
			};
	
			/**
			 * Returns true if the two bounds intersect.
			 * @method overlaps
			 * @param {bounds} boundsA
			 * @param {bounds} boundsB
			 * @return {boolean} True if the bounds overlap, otherwise false
			 */
			Bounds.overlaps = function(boundsA, boundsB) {
					return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
									&& boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
			};
	
			/**
			 * Translates the bounds by the given vector.
			 * @method translate
			 * @param {bounds} bounds
			 * @param {vector} vector
			 */
			Bounds.translate = function(bounds, vector) {
					bounds.min.x += vector.x;
					bounds.max.x += vector.x;
					bounds.min.y += vector.y;
					bounds.max.y += vector.y;
			};
	
			/**
			 * Shifts the bounds to the given position.
			 * @method shift
			 * @param {bounds} bounds
			 * @param {vector} position
			 */
			Bounds.shift = function(bounds, position) {
					var deltaX = bounds.max.x - bounds.min.x,
							deltaY = bounds.max.y - bounds.min.y;
							
					bounds.min.x = position.x;
					bounds.max.x = position.x + deltaX;
					bounds.min.y = position.y;
					bounds.max.y = position.y + deltaY;
			};
			
	})();
	
	},{}],27:[function(_dereq_,module,exports){
	/**
	* The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
	*
	* To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Svg
	*/
	
	var Svg = {};
	
	module.exports = Svg;
	
	var Bounds = _dereq_('../geometry/Bounds');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Converts an SVG path into an array of vector points.
			 * If the input path forms a concave shape, you must decompose the result into convex parts before use.
			 * See `Bodies.fromVertices` which provides support for this.
			 * Note that this function is not guaranteed to support complex paths (such as those with holes).
			 * You must load the `pathseg.js` polyfill on newer browsers.
			 * @method pathToVertices
			 * @param {SVGPathElement} path
			 * @param {Number} [sampleLength=15]
			 * @return {Vector[]} points
			 */
			Svg.pathToVertices = function(path, sampleLength) {
					if (typeof window !== 'undefined' && !('SVGPathSeg' in window)) {
							Common.warn('Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.');
					}
	
					// https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
					var i, il, total, point, segment, segments, 
							segmentsQueue, lastSegment, 
							lastPoint, segmentIndex, points = [],
							lx, ly, length = 0, x = 0, y = 0;
	
					sampleLength = sampleLength || 15;
	
					var addPoint = function(px, py, pathSegType) {
							// all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
							var isRelative = pathSegType % 2 === 1 && pathSegType > 1;
	
							// when the last point doesn't equal the current point add the current point
							if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
									if (lastPoint && isRelative) {
											lx = lastPoint.x;
											ly = lastPoint.y;
									} else {
											lx = 0;
											ly = 0;
									}
	
									var point = {
											x: lx + px,
											y: ly + py
									};
	
									// set last point
									if (isRelative || !lastPoint) {
											lastPoint = point;
									}
	
									points.push(point);
	
									x = lx + px;
									y = ly + py;
							}
					};
	
					var addSegmentPoint = function(segment) {
							var segType = segment.pathSegTypeAsLetter.toUpperCase();
	
							// skip path ends
							if (segType === 'Z') 
									return;
	
							// map segment to x and y
							switch (segType) {
	
							case 'M':
							case 'L':
							case 'T':
							case 'C':
							case 'S':
							case 'Q':
									x = segment.x;
									y = segment.y;
									break;
							case 'H':
									x = segment.x;
									break;
							case 'V':
									y = segment.y;
									break;
							}
	
							addPoint(x, y, segment.pathSegType);
					};
	
					// ensure path is absolute
					Svg._svgPathToAbsolute(path);
	
					// get total length
					total = path.getTotalLength();
	
					// queue segments
					segments = [];
					for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
							segments.push(path.pathSegList.getItem(i));
	
					segmentsQueue = segments.concat();
	
					// sample through path
					while (length < total) {
							// get segment at position
							segmentIndex = path.getPathSegAtLength(length);
							segment = segments[segmentIndex];
	
							// new segment
							if (segment != lastSegment) {
									while (segmentsQueue.length && segmentsQueue[0] != segment)
											addSegmentPoint(segmentsQueue.shift());
	
									lastSegment = segment;
							}
	
							// add points in between when curving
							// TODO: adaptive sampling
							switch (segment.pathSegTypeAsLetter.toUpperCase()) {
	
							case 'C':
							case 'T':
							case 'S':
							case 'Q':
							case 'A':
									point = path.getPointAtLength(length);
									addPoint(point.x, point.y, 0);
									break;
	
							}
	
							// increment by sample value
							length += sampleLength;
					}
	
					// add remaining segments not passed by sampling
					for (i = 0, il = segmentsQueue.length; i < il; ++i)
							addSegmentPoint(segmentsQueue[i]);
	
					return points;
			};
	
			Svg._svgPathToAbsolute = function(path) {
					// http://phrogz.net/convert-svg-path-to-all-absolute-commands
					// Copyright (c) Gavin Kistner
					// http://phrogz.net/js/_ReuseLicense.txt
					// Modifications: tidy formatting and naming
					var x0, y0, x1, y1, x2, y2, segs = path.pathSegList,
							x = 0, y = 0, len = segs.numberOfItems;
	
					for (var i = 0; i < len; ++i) {
							var seg = segs.getItem(i),
									segType = seg.pathSegTypeAsLetter;
	
							if (/[MLHVCSQTA]/.test(segType)) {
									if ('x' in seg) x = seg.x;
									if ('y' in seg) y = seg.y;
							} else {
									if ('x1' in seg) x1 = x + seg.x1;
									if ('x2' in seg) x2 = x + seg.x2;
									if ('y1' in seg) y1 = y + seg.y1;
									if ('y2' in seg) y2 = y + seg.y2;
									if ('x' in seg) x += seg.x;
									if ('y' in seg) y += seg.y;
	
									switch (segType) {
	
									case 'm':
											segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
											break;
									case 'l':
											segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
											break;
									case 'h':
											segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
											break;
									case 'v':
											segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
											break;
									case 'c':
											segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
											break;
									case 's':
											segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
											break;
									case 'q':
											segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
											break;
									case 't':
											segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
											break;
									case 'a':
											segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
											break;
									case 'z':
									case 'Z':
											x = x0;
											y = y0;
											break;
	
									}
							}
	
							if (segType == 'M' || segType == 'm') {
									x0 = x;
									y0 = y;
							}
					}
			};
	
	})();
	},{"../core/Common":14,"../geometry/Bounds":26}],28:[function(_dereq_,module,exports){
	/**
	* The `Matter.Vector` module contains methods for creating and manipulating vectors.
	* Vectors are the basis of all the geometry related operations in the engine.
	* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Vector
	*/
	
	// TODO: consider params for reusing vector objects
	
	var Vector = {};
	
	module.exports = Vector;
	
	(function() {
	
			/**
			 * Creates a new vector.
			 * @method create
			 * @param {number} x
			 * @param {number} y
			 * @return {vector} A new vector
			 */
			Vector.create = function(x, y) {
					return { x: x || 0, y: y || 0 };
			};
	
			/**
			 * Returns a new vector with `x` and `y` copied from the given `vector`.
			 * @method clone
			 * @param {vector} vector
			 * @return {vector} A new cloned vector
			 */
			Vector.clone = function(vector) {
					return { x: vector.x, y: vector.y };
			};
	
			/**
			 * Returns the magnitude (length) of a vector.
			 * @method magnitude
			 * @param {vector} vector
			 * @return {number} The magnitude of the vector
			 */
			Vector.magnitude = function(vector) {
					return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
			};
	
			/**
			 * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
			 * @method magnitudeSquared
			 * @param {vector} vector
			 * @return {number} The squared magnitude of the vector
			 */
			Vector.magnitudeSquared = function(vector) {
					return (vector.x * vector.x) + (vector.y * vector.y);
			};
	
			/**
			 * Rotates the vector about (0, 0) by specified angle.
			 * @method rotate
			 * @param {vector} vector
			 * @param {number} angle
			 * @param {vector} [output]
			 * @return {vector} The vector rotated about (0, 0)
			 */
			Vector.rotate = function(vector, angle, output) {
					var cos = Math.cos(angle), sin = Math.sin(angle);
					if (!output) output = {};
					var x = vector.x * cos - vector.y * sin;
					output.y = vector.x * sin + vector.y * cos;
					output.x = x;
					return output;
			};
	
			/**
			 * Rotates the vector about a specified point by specified angle.
			 * @method rotateAbout
			 * @param {vector} vector
			 * @param {number} angle
			 * @param {vector} point
			 * @param {vector} [output]
			 * @return {vector} A new vector rotated about the point
			 */
			Vector.rotateAbout = function(vector, angle, point, output) {
					var cos = Math.cos(angle), sin = Math.sin(angle);
					if (!output) output = {};
					var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
					output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
					output.x = x;
					return output;
			};
	
			/**
			 * Normalises a vector (such that its magnitude is `1`).
			 * @method normalise
			 * @param {vector} vector
			 * @return {vector} A new vector normalised
			 */
			Vector.normalise = function(vector) {
					var magnitude = Vector.magnitude(vector);
					if (magnitude === 0)
							return { x: 0, y: 0 };
					return { x: vector.x / magnitude, y: vector.y / magnitude };
			};
	
			/**
			 * Returns the dot-product of two vectors.
			 * @method dot
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @return {number} The dot product of the two vectors
			 */
			Vector.dot = function(vectorA, vectorB) {
					return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
			};
	
			/**
			 * Returns the cross-product of two vectors.
			 * @method cross
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @return {number} The cross product of the two vectors
			 */
			Vector.cross = function(vectorA, vectorB) {
					return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
			};
	
			/**
			 * Returns the cross-product of three vectors.
			 * @method cross3
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @param {vector} vectorC
			 * @return {number} The cross product of the three vectors
			 */
			Vector.cross3 = function(vectorA, vectorB, vectorC) {
					return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
			};
	
			/**
			 * Adds the two vectors.
			 * @method add
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @param {vector} [output]
			 * @return {vector} A new vector of vectorA and vectorB added
			 */
			Vector.add = function(vectorA, vectorB, output) {
					if (!output) output = {};
					output.x = vectorA.x + vectorB.x;
					output.y = vectorA.y + vectorB.y;
					return output;
			};
	
			/**
			 * Subtracts the two vectors.
			 * @method sub
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @param {vector} [output]
			 * @return {vector} A new vector of vectorA and vectorB subtracted
			 */
			Vector.sub = function(vectorA, vectorB, output) {
					if (!output) output = {};
					output.x = vectorA.x - vectorB.x;
					output.y = vectorA.y - vectorB.y;
					return output;
			};
	
			/**
			 * Multiplies a vector and a scalar.
			 * @method mult
			 * @param {vector} vector
			 * @param {number} scalar
			 * @return {vector} A new vector multiplied by scalar
			 */
			Vector.mult = function(vector, scalar) {
					return { x: vector.x * scalar, y: vector.y * scalar };
			};
	
			/**
			 * Divides a vector and a scalar.
			 * @method div
			 * @param {vector} vector
			 * @param {number} scalar
			 * @return {vector} A new vector divided by scalar
			 */
			Vector.div = function(vector, scalar) {
					return { x: vector.x / scalar, y: vector.y / scalar };
			};
	
			/**
			 * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
			 * @method perp
			 * @param {vector} vector
			 * @param {bool} [negate=false]
			 * @return {vector} The perpendicular vector
			 */
			Vector.perp = function(vector, negate) {
					negate = negate === true ? -1 : 1;
					return { x: negate * -vector.y, y: negate * vector.x };
			};
	
			/**
			 * Negates both components of a vector such that it points in the opposite direction.
			 * @method neg
			 * @param {vector} vector
			 * @return {vector} The negated vector
			 */
			Vector.neg = function(vector) {
					return { x: -vector.x, y: -vector.y };
			};
	
			/**
			 * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
			 * @method angle
			 * @param {vector} vectorA
			 * @param {vector} vectorB
			 * @return {number} The angle in radians
			 */
			Vector.angle = function(vectorA, vectorB) {
					return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
			};
	
			/**
			 * Temporary vector pool (not thread-safe).
			 * @property _temp
			 * @type {vector[]}
			 * @private
			 */
			Vector._temp = [
					Vector.create(), Vector.create(), 
					Vector.create(), Vector.create(), 
					Vector.create(), Vector.create()
			];
	
	})();
	},{}],29:[function(_dereq_,module,exports){
	/**
	* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
	* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
	* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
	*
	* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
	*
	* @class Vertices
	*/
	
	var Vertices = {};
	
	module.exports = Vertices;
	
	var Vector = _dereq_('../geometry/Vector');
	var Common = _dereq_('../core/Common');
	
	(function() {
	
			/**
			 * Creates a new set of `Matter.Body` compatible vertices.
			 * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
			 *
			 *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
			 *
			 * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
			 * but with some additional references required for efficient collision detection routines.
			 *
			 * Vertices must be specified in clockwise order.
			 *
			 * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
			 *
			 * @method create
			 * @param {vector[]} points
			 * @param {body} body
			 */
			Vertices.create = function(points, body) {
					var vertices = [];
	
					for (var i = 0; i < points.length; i++) {
							var point = points[i],
									vertex = {
											x: point.x,
											y: point.y,
											index: i,
											body: body,
											isInternal: false
									};
	
							vertices.push(vertex);
					}
	
					return vertices;
			};
	
			/**
			 * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
			 * into a `Matter.Vertices` object for the given `Matter.Body`.
			 * For parsing SVG paths, see `Svg.pathToVertices`.
			 * @method fromPath
			 * @param {string} path
			 * @param {body} body
			 * @return {vertices} vertices
			 */
			Vertices.fromPath = function(path, body) {
					var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,
							points = [];
	
					path.replace(pathPattern, function(match, x, y) {
							points.push({ x: parseFloat(x), y: parseFloat(y) });
					});
	
					return Vertices.create(points, body);
			};
	
			/**
			 * Returns the centre (centroid) of the set of vertices.
			 * @method centre
			 * @param {vertices} vertices
			 * @return {vector} The centre point
			 */
			Vertices.centre = function(vertices) {
					var area = Vertices.area(vertices, true),
							centre = { x: 0, y: 0 },
							cross,
							temp,
							j;
	
					for (var i = 0; i < vertices.length; i++) {
							j = (i + 1) % vertices.length;
							cross = Vector.cross(vertices[i], vertices[j]);
							temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
							centre = Vector.add(centre, temp);
					}
	
					return Vector.div(centre, 6 * area);
			};
	
			/**
			 * Returns the average (mean) of the set of vertices.
			 * @method mean
			 * @param {vertices} vertices
			 * @return {vector} The average point
			 */
			Vertices.mean = function(vertices) {
					var average = { x: 0, y: 0 };
	
					for (var i = 0; i < vertices.length; i++) {
							average.x += vertices[i].x;
							average.y += vertices[i].y;
					}
	
					return Vector.div(average, vertices.length);
			};
	
			/**
			 * Returns the area of the set of vertices.
			 * @method area
			 * @param {vertices} vertices
			 * @param {bool} signed
			 * @return {number} The area
			 */
			Vertices.area = function(vertices, signed) {
					var area = 0,
							j = vertices.length - 1;
	
					for (var i = 0; i < vertices.length; i++) {
							area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
							j = i;
					}
	
					if (signed)
							return area / 2;
	
					return Math.abs(area) / 2;
			};
	
			/**
			 * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
			 * @method inertia
			 * @param {vertices} vertices
			 * @param {number} mass
			 * @return {number} The polygon's moment of inertia
			 */
			Vertices.inertia = function(vertices, mass) {
					var numerator = 0,
							denominator = 0,
							v = vertices,
							cross,
							j;
	
					// find the polygon's moment of inertia, using second moment of area
					// from equations at http://www.physicsforums.com/showthread.php?t=25293
					for (var n = 0; n < v.length; n++) {
							j = (n + 1) % v.length;
							cross = Math.abs(Vector.cross(v[j], v[n]));
							numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
							denominator += cross;
					}
	
					return (mass / 6) * (numerator / denominator);
			};
	
			/**
			 * Translates the set of vertices in-place.
			 * @method translate
			 * @param {vertices} vertices
			 * @param {vector} vector
			 * @param {number} scalar
			 */
			Vertices.translate = function(vertices, vector, scalar) {
					var i;
					if (scalar) {
							for (i = 0; i < vertices.length; i++) {
									vertices[i].x += vector.x * scalar;
									vertices[i].y += vector.y * scalar;
							}
					} else {
							for (i = 0; i < vertices.length; i++) {
									vertices[i].x += vector.x;
									vertices[i].y += vector.y;
							}
					}
	
					return vertices;
			};
	
			/**
			 * Rotates the set of vertices in-place.
			 * @method rotate
			 * @param {vertices} vertices
			 * @param {number} angle
			 * @param {vector} point
			 */
			Vertices.rotate = function(vertices, angle, point) {
					if (angle === 0)
							return;
	
					var cos = Math.cos(angle),
							sin = Math.sin(angle);
	
					for (var i = 0; i < vertices.length; i++) {
							var vertice = vertices[i],
									dx = vertice.x - point.x,
									dy = vertice.y - point.y;
									
							vertice.x = point.x + (dx * cos - dy * sin);
							vertice.y = point.y + (dx * sin + dy * cos);
					}
	
					return vertices;
			};
	
			/**
			 * Returns `true` if the `point` is inside the set of `vertices`.
			 * @method contains
			 * @param {vertices} vertices
			 * @param {vector} point
			 * @return {boolean} True if the vertices contains point, otherwise false
			 */
			Vertices.contains = function(vertices, point) {
					for (var i = 0; i < vertices.length; i++) {
							var vertice = vertices[i],
									nextVertice = vertices[(i + 1) % vertices.length];
							if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
									return false;
							}
					}
	
					return true;
			};
	
			/**
			 * Scales the vertices from a point (default is centre) in-place.
			 * @method scale
			 * @param {vertices} vertices
			 * @param {number} scaleX
			 * @param {number} scaleY
			 * @param {vector} point
			 */
			Vertices.scale = function(vertices, scaleX, scaleY, point) {
					if (scaleX === 1 && scaleY === 1)
							return vertices;
	
					point = point || Vertices.centre(vertices);
	
					var vertex,
							delta;
	
					for (var i = 0; i < vertices.length; i++) {
							vertex = vertices[i];
							delta = Vector.sub(vertex, point);
							vertices[i].x = point.x + delta.x * scaleX;
							vertices[i].y = point.y + delta.y * scaleY;
					}
	
					return vertices;
			};
	
			/**
			 * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
			 * The radius parameter is a single number or an array to specify the radius for each vertex.
			 * @method chamfer
			 * @param {vertices} vertices
			 * @param {number[]} radius
			 * @param {number} quality
			 * @param {number} qualityMin
			 * @param {number} qualityMax
			 */
			Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
					if (typeof radius === 'number') {
							radius = [radius];
					} else {
							radius = radius || [8];
					}
	
					// quality defaults to -1, which is auto
					quality = (typeof quality !== 'undefined') ? quality : -1;
					qualityMin = qualityMin || 2;
					qualityMax = qualityMax || 14;
	
					var newVertices = [];
	
					for (var i = 0; i < vertices.length; i++) {
							var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
									vertex = vertices[i],
									nextVertex = vertices[(i + 1) % vertices.length],
									currentRadius = radius[i < radius.length ? i : radius.length - 1];
	
							if (currentRadius === 0) {
									newVertices.push(vertex);
									continue;
							}
	
							var prevNormal = Vector.normalise({ 
									x: vertex.y - prevVertex.y, 
									y: prevVertex.x - vertex.x
							});
	
							var nextNormal = Vector.normalise({ 
									x: nextVertex.y - vertex.y, 
									y: vertex.x - nextVertex.x
							});
	
							var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
									radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
									midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
									scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));
	
							var precision = quality;
	
							if (quality === -1) {
									// automatically decide precision
									precision = Math.pow(currentRadius, 0.32) * 1.75;
							}
	
							precision = Common.clamp(precision, qualityMin, qualityMax);
	
							// use an even value for precision, more likely to reduce axes by using symmetry
							if (precision % 2 === 1)
									precision += 1;
	
							var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
									theta = alpha / precision;
	
							for (var j = 0; j < precision; j++) {
									newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
							}
					}
	
					return newVertices;
			};
	
			/**
			 * Sorts the input vertices into clockwise order in place.
			 * @method clockwiseSort
			 * @param {vertices} vertices
			 * @return {vertices} vertices
			 */
			Vertices.clockwiseSort = function(vertices) {
					var centre = Vertices.mean(vertices);
	
					vertices.sort(function(vertexA, vertexB) {
							return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
					});
	
					return vertices;
			};
	
			/**
			 * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
			 * @method isConvex
			 * @param {vertices} vertices
			 * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
			 */
			Vertices.isConvex = function(vertices) {
					// http://paulbourke.net/geometry/polygonmesh/
					// Copyright (c) Paul Bourke (use permitted)
	
					var flag = 0,
							n = vertices.length,
							i,
							j,
							k,
							z;
	
					if (n < 3)
							return null;
	
					for (i = 0; i < n; i++) {
							j = (i + 1) % n;
							k = (i + 2) % n;
							z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
							z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);
	
							if (z < 0) {
									flag |= 1;
							} else if (z > 0) {
									flag |= 2;
							}
	
							if (flag === 3) {
									return false;
							}
					}
	
					if (flag !== 0){
							return true;
					} else {
							return null;
					}
			};
	
			/**
			 * Returns the convex hull of the input vertices as a new array of points.
			 * @method hull
			 * @param {vertices} vertices
			 * @return [vertex] vertices
			 */
			Vertices.hull = function(vertices) {
					// http://geomalgorithms.com/a10-_hull-1.html
	
					var upper = [],
							lower = [], 
							vertex,
							i;
	
					// sort vertices on x-axis (y-axis for ties)
					vertices = vertices.slice(0);
					vertices.sort(function(vertexA, vertexB) {
							var dx = vertexA.x - vertexB.x;
							return dx !== 0 ? dx : vertexA.y - vertexB.y;
					});
	
					// build lower hull
					for (i = 0; i < vertices.length; i += 1) {
							vertex = vertices[i];
	
							while (lower.length >= 2 
										 && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
									lower.pop();
							}
	
							lower.push(vertex);
					}
	
					// build upper hull
					for (i = vertices.length - 1; i >= 0; i -= 1) {
							vertex = vertices[i];
	
							while (upper.length >= 2 
										 && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
									upper.pop();
							}
	
							upper.push(vertex);
					}
	
					// concatenation of the lower and upper hulls gives the convex hull
					// omit last points because they are repeated at the beginning of the other list
					upper.pop();
					lower.pop();
	
					return upper.concat(lower);
			};
	
	})();
	
	},{"../core/Common":14,"../geometry/Vector":28}],30:[function(_dereq_,module,exports){
	var Matter = module.exports = _dereq_('../core/Matter');
	
	Matter.Body = _dereq_('../body/Body');
	Matter.Composite = _dereq_('../body/Composite');
	Matter.World = _dereq_('../body/World');
	
	Matter.Contact = _dereq_('../collision/Contact');
	Matter.Detector = _dereq_('../collision/Detector');
	Matter.Grid = _dereq_('../collision/Grid');
	Matter.Pairs = _dereq_('../collision/Pairs');
	Matter.Pair = _dereq_('../collision/Pair');
	Matter.Query = _dereq_('../collision/Query');
	Matter.Resolver = _dereq_('../collision/Resolver');
	Matter.SAT = _dereq_('../collision/SAT');
	
	Matter.Constraint = _dereq_('../constraint/Constraint');
	Matter.MouseConstraint = _dereq_('../constraint/MouseConstraint');
	
	Matter.Common = _dereq_('../core/Common');
	Matter.Engine = _dereq_('../core/Engine');
	Matter.Events = _dereq_('../core/Events');
	Matter.Mouse = _dereq_('../core/Mouse');
	Matter.Runner = _dereq_('../core/Runner');
	Matter.Sleeping = _dereq_('../core/Sleeping');
	Matter.Plugin = _dereq_('../core/Plugin');
	
	
	Matter.Bodies = _dereq_('../factory/Bodies');
	Matter.Composites = _dereq_('../factory/Composites');
	
	Matter.Axes = _dereq_('../geometry/Axes');
	Matter.Bounds = _dereq_('../geometry/Bounds');
	Matter.Svg = _dereq_('../geometry/Svg');
	Matter.Vector = _dereq_('../geometry/Vector');
	Matter.Vertices = _dereq_('../geometry/Vertices');
	
	Matter.Render = _dereq_('../render/Render');
	Matter.RenderPixi = _dereq_('../render/RenderPixi');
	
	// aliases
	
	Matter.World.add = Matter.Composite.add;
	Matter.World.remove = Matter.Composite.remove;
	Matter.World.addComposite = Matter.Composite.addComposite;
	Matter.World.addBody = Matter.Composite.addBody;
	Matter.World.addConstraint = Matter.Composite.addConstraint;
	Matter.World.clear = Matter.Composite.clear;
	Matter.Engine.run = Matter.Runner.run;
	
	},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Matter":17,"../core/Metrics":18,"../core/Mouse":19,"../core/Plugin":20,"../core/Runner":21,"../core/Sleeping":22,"../factory/Bodies":23,"../factory/Composites":24,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Svg":27,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31,"../render/RenderPixi":32}],31:[function(_dereq_,module,exports){
	/**
	* The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
	* It is intended for development and debugging purposes, but may also be suitable for simple games.
	* It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
	*
	* @class Render
	*/
	
	var Render = {};
	
	module.exports = Render;
	
	var Common = _dereq_('../core/Common');
	var Composite = _dereq_('../body/Composite');
	var Bounds = _dereq_('../geometry/Bounds');
	var Events = _dereq_('../core/Events');
	var Grid = _dereq_('../collision/Grid');
	var Vector = _dereq_('../geometry/Vector');
	var Mouse = _dereq_('../core/Mouse');
	
	(function() {
	
			var _requestAnimationFrame,
					_cancelAnimationFrame;
	
			if (typeof window !== 'undefined') {
					_requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
																				|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame
																				|| function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };
	
					_cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
																				|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
			}
	
			/**
			 * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
			 * All properties have default values, and many are pre-calculated automatically based on other properties.
			 * See the properties section below for detailed information on what you can pass via the `options` object.
			 * @method create
			 * @param {object} [options]
			 * @return {render} A new renderer
			 */
			Render.create = function(options) {
					var defaults = {
							controller: Render,
							engine: null,
							element: null,
							canvas: null,
							mouse: null,
							frameRequestId: null,
							options: {
									width: 800,
									height: 600,
									pixelRatio: 1,
									background: '#18181d',
									wireframeBackground: '#0f0f13',
									hasBounds: !!options.bounds,
									enabled: true,
									wireframes: true,
									showSleeping: true,
									showDebug: false,
									showBroadphase: false,
									showBounds: false,
									showVelocity: false,
									showCollisions: false,
									showSeparations: false,
									showAxes: false,
									showPositions: false,
									showAngleIndicator: false,
									showIds: false,
									showShadows: false,
									showVertexNumbers: false,
									showConvexHulls: false,
									showInternalEdges: false,
									showMousePosition: false
							}
					};
	
					var render = Common.extend(defaults, options);
	
					if (render.canvas) {
							render.canvas.width = render.options.width || render.canvas.width;
							render.canvas.height = render.options.height || render.canvas.height;
					}
	
					render.mouse = options.mouse;
					render.engine = options.engine;
					render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
					render.context = render.canvas.getContext('2d');
					render.textures = {};
	
					render.bounds = render.bounds || {
							min: {
									x: 0,
									y: 0
							},
							max: {
									x: render.canvas.width,
									y: render.canvas.height
							}
					};
	
					if (render.options.pixelRatio !== 1) {
							Render.setPixelRatio(render, render.options.pixelRatio);
					}
	
					if (Common.isElement(render.element)) {
							render.element.appendChild(render.canvas);
					} else if (!render.canvas.parentNode) {
							Common.log('Render.create: options.element was undefined, render.canvas was created but not appended', 'warn');
					}
	
					return render;
			};
	
			/**
			 * Continuously updates the render canvas on the `requestAnimationFrame` event.
			 * @method run
			 * @param {render} render
			 */
			Render.run = function(render) {
					(function loop(time){
							render.frameRequestId = _requestAnimationFrame(loop);
							Render.world(render);
					})();
			};
	
			/**
			 * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
			 * @method stop
			 * @param {render} render
			 */
			Render.stop = function(render) {
					_cancelAnimationFrame(render.frameRequestId);
			};
	
			/**
			 * Sets the pixel ratio of the renderer and updates the canvas.
			 * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
			 * @method setPixelRatio
			 * @param {render} render
			 * @param {number} pixelRatio
			 */
			Render.setPixelRatio = function(render, pixelRatio) {
					var options = render.options,
							canvas = render.canvas;
	
					if (pixelRatio === 'auto') {
							pixelRatio = _getPixelRatio(canvas);
					}
	
					options.pixelRatio = pixelRatio;
					canvas.setAttribute('data-pixel-ratio', pixelRatio);
					canvas.width = options.width * pixelRatio;
					canvas.height = options.height * pixelRatio;
					canvas.style.width = options.width + 'px';
					canvas.style.height = options.height + 'px';
					render.context.scale(pixelRatio, pixelRatio);
			};
	
			/**
			 * Positions and sizes the viewport around the given object bounds.
			 * Objects must have at least one of the following properties:
			 * - `object.bounds`
			 * - `object.position`
			 * - `object.min` and `object.max`
			 * - `object.x` and `object.y`
			 * @method lookAt
			 * @param {render} render
			 * @param {object[]} objects
			 * @param {vector} [padding]
			 * @param {bool} [center=true]
			 */
			Render.lookAt = function(render, objects, padding, center) {
					center = typeof center !== 'undefined' ? center : true;
					objects = Common.isArray(objects) ? objects : [objects];
					padding = padding || {
							x: 0,
							y: 0
					};
	
					// find bounds of all objects
					var bounds = {
							min: { x: Infinity, y: Infinity },
							max: { x: -Infinity, y: -Infinity }
					};
	
					for (var i = 0; i < objects.length; i += 1) {
							var object = objects[i],
									min = object.bounds ? object.bounds.min : (object.min || object.position || object),
									max = object.bounds ? object.bounds.max : (object.max || object.position || object);
	
							if (min && max) {
									if (min.x < bounds.min.x)
											bounds.min.x = min.x;
	
									if (max.x > bounds.max.x)
											bounds.max.x = max.x;
	
									if (min.y < bounds.min.y)
											bounds.min.y = min.y;
	
									if (max.y > bounds.max.y)
											bounds.max.y = max.y;
							}
					}
	
					// find ratios
					var width = (bounds.max.x - bounds.min.x) + 2 * padding.x,
							height = (bounds.max.y - bounds.min.y) + 2 * padding.y,
							viewHeight = render.canvas.height,
							viewWidth = render.canvas.width,
							outerRatio = viewWidth / viewHeight,
							innerRatio = width / height,
							scaleX = 1,
							scaleY = 1;
	
					// find scale factor
					if (innerRatio > outerRatio) {
							scaleY = innerRatio / outerRatio;
					} else {
							scaleX = outerRatio / innerRatio;
					}
	
					// enable bounds
					render.options.hasBounds = true;
	
					// position and size
					render.bounds.min.x = bounds.min.x;
					render.bounds.max.x = bounds.min.x + width * scaleX;
					render.bounds.min.y = bounds.min.y;
					render.bounds.max.y = bounds.min.y + height * scaleY;
	
					// center
					if (center) {
							render.bounds.min.x += width * 0.5 - (width * scaleX) * 0.5;
							render.bounds.max.x += width * 0.5 - (width * scaleX) * 0.5;
							render.bounds.min.y += height * 0.5 - (height * scaleY) * 0.5;
							render.bounds.max.y += height * 0.5 - (height * scaleY) * 0.5;
					}
	
					// padding
					render.bounds.min.x -= padding.x;
					render.bounds.max.x -= padding.x;
					render.bounds.min.y -= padding.y;
					render.bounds.max.y -= padding.y;
	
					// update mouse
					if (render.mouse) {
							Mouse.setScale(render.mouse, {
									x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
									y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
							});
	
							Mouse.setOffset(render.mouse, render.bounds.min);
					}
			};
	
			/**
			 * Applies viewport transforms based on `render.bounds` to a render context.
			 * @method startViewTransform
			 * @param {render} render
			 */
			Render.startViewTransform = function(render) {
					var boundsWidth = render.bounds.max.x - render.bounds.min.x,
							boundsHeight = render.bounds.max.y - render.bounds.min.y,
							boundsScaleX = boundsWidth / render.options.width,
							boundsScaleY = boundsHeight / render.options.height;
	
					render.context.scale(1 / boundsScaleX, 1 / boundsScaleY);
					render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
			};
	
			/**
			 * Resets all transforms on the render context.
			 * @method endViewTransform
			 * @param {render} render
			 */
			Render.endViewTransform = function(render) {
					render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
			};
	
			/**
			 * Renders the given `engine`'s `Matter.World` object.
			 * This is the entry point for all rendering and should be called every time the scene changes.
			 * @method world
			 * @param {render} render
			 */
			Render.world = function(render) {
					var engine = render.engine,
							world = engine.world,
							canvas = render.canvas,
							context = render.context,
							options = render.options,
							allBodies = Composite.allBodies(world),
							allConstraints = Composite.allConstraints(world),
							background = options.wireframes ? options.wireframeBackground : options.background,
							bodies = [],
							constraints = [],
							i;
	
					var event = {
							timestamp: engine.timing.timestamp
					};
	
					Events.trigger(render, 'beforeRender', event);
	
					// apply background if it has changed
					if (render.currentBackground !== background)
							_applyBackground(render, background);
	
					// clear the canvas with a transparent fill, to allow the canvas background to show
					context.globalCompositeOperation = 'source-in';
					context.fillStyle = "transparent";
					context.fillRect(0, 0, canvas.width, canvas.height);
					context.globalCompositeOperation = 'source-over';
	
					// handle bounds
					if (options.hasBounds) {
							// filter out bodies that are not in view
							for (i = 0; i < allBodies.length; i++) {
									var body = allBodies[i];
									if (Bounds.overlaps(body.bounds, render.bounds))
											bodies.push(body);
							}
	
							// filter out constraints that are not in view
							for (i = 0; i < allConstraints.length; i++) {
									var constraint = allConstraints[i],
											bodyA = constraint.bodyA,
											bodyB = constraint.bodyB,
											pointAWorld = constraint.pointA,
											pointBWorld = constraint.pointB;
	
									if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
									if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);
	
									if (!pointAWorld || !pointBWorld)
											continue;
	
									if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
											constraints.push(constraint);
							}
	
							// transform the view
							Render.startViewTransform(render);
	
							// update mouse
							if (render.mouse) {
									Mouse.setScale(render.mouse, {
											x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
											y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
									});
	
									Mouse.setOffset(render.mouse, render.bounds.min);
							}
					} else {
							constraints = allConstraints;
							bodies = allBodies;
					}
	
					if (!options.wireframes || (engine.enableSleeping && options.showSleeping)) {
							// fully featured rendering of bodies
							Render.bodies(render, bodies, context);
					} else {
							if (options.showConvexHulls)
									Render.bodyConvexHulls(render, bodies, context);
	
							// optimised method for wireframes only
							Render.bodyWireframes(render, bodies, context);
					}
	
					if (options.showBounds)
							Render.bodyBounds(render, bodies, context);
	
					if (options.showAxes || options.showAngleIndicator)
							Render.bodyAxes(render, bodies, context);
	
					if (options.showPositions)
							Render.bodyPositions(render, bodies, context);
	
					if (options.showVelocity)
							Render.bodyVelocity(render, bodies, context);
	
					if (options.showIds)
							Render.bodyIds(render, bodies, context);
	
					if (options.showSeparations)
							Render.separations(render, engine.pairs.list, context);
	
					if (options.showCollisions)
							Render.collisions(render, engine.pairs.list, context);
	
					if (options.showVertexNumbers)
							Render.vertexNumbers(render, bodies, context);
	
					if (options.showMousePosition)
							Render.mousePosition(render, render.mouse, context);
	
					Render.constraints(constraints, context);
	
					if (options.showBroadphase && engine.broadphase.controller === Grid)
							Render.grid(render, engine.broadphase, context);
	
					if (options.showDebug)
							Render.debug(render, context);
	
					if (options.hasBounds) {
							// revert view transforms
							Render.endViewTransform(render);
					}
	
					Events.trigger(render, 'afterRender', event);
			};
	
			/**
			 * Description
			 * @private
			 * @method debug
			 * @param {render} render
			 * @param {RenderingContext} context
			 */
			Render.debug = function(render, context) {
					var c = context,
							engine = render.engine,
							world = engine.world,
							metrics = engine.metrics,
							options = render.options,
							bodies = Composite.allBodies(world),
							space = "    ";
	
					if (engine.timing.timestamp - (render.debugTimestamp || 0) >= 500) {
							var text = "";
	
							if (metrics.timing) {
									text += "fps: " + Math.round(metrics.timing.fps) + space;
							}
	
	
							render.debugString = text;
							render.debugTimestamp = engine.timing.timestamp;
					}
	
					if (render.debugString) {
							c.font = "12px Arial";
	
							if (options.wireframes) {
									c.fillStyle = 'rgba(255,255,255,0.5)';
							} else {
									c.fillStyle = 'rgba(0,0,0,0.5)';
							}
	
							var split = render.debugString.split('\n');
	
							for (var i = 0; i < split.length; i++) {
									c.fillText(split[i], 50, 50 + i * 18);
							}
					}
			};
	
			/**
			 * Description
			 * @private
			 * @method constraints
			 * @param {constraint[]} constraints
			 * @param {RenderingContext} context
			 */
			Render.constraints = function(constraints, context) {
					var c = context;
	
					for (var i = 0; i < constraints.length; i++) {
							var constraint = constraints[i];
	
							if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
									continue;
	
							var bodyA = constraint.bodyA,
									bodyB = constraint.bodyB,
									start,
									end;
	
							if (bodyA) {
									start = Vector.add(bodyA.position, constraint.pointA);
							} else {
									start = constraint.pointA;
							}
	
							if (constraint.render.type === 'pin') {
									c.beginPath();
									c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
									c.closePath();
							} else {
									if (bodyB) {
											end = Vector.add(bodyB.position, constraint.pointB);
									} else {
											end = constraint.pointB;
									}
	
									c.beginPath();
									c.moveTo(start.x, start.y);
	
									if (constraint.render.type === 'spring') {
											var delta = Vector.sub(end, start),
													normal = Vector.perp(Vector.normalise(delta)),
													coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)),
													offset;
	
											for (var j = 1; j < coils; j += 1) {
													offset = j % 2 === 0 ? 1 : -1;
	
													c.lineTo(
															start.x + delta.x * (j / coils) + normal.x * offset * 4,
															start.y + delta.y * (j / coils) + normal.y * offset * 4
													);
											}
									}
	
									c.lineTo(end.x, end.y);
							}
	
							if (constraint.render.lineWidth) {
									c.lineWidth = constraint.render.lineWidth;
									c.strokeStyle = constraint.render.strokeStyle;
									c.stroke();
							}
	
							if (constraint.render.anchors) {
									c.fillStyle = constraint.render.strokeStyle;
									c.beginPath();
									c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
									c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
									c.closePath();
									c.fill();
							}
					}
			};
	
			/**
			 * Description
			 * @private
			 * @method bodyShadows
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyShadows = function(render, bodies, context) {
					var c = context,
							engine = render.engine;
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (!body.render.visible)
									continue;
	
							if (body.circleRadius) {
									c.beginPath();
									c.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
									c.closePath();
							} else {
									c.beginPath();
									c.moveTo(body.vertices[0].x, body.vertices[0].y);
									for (var j = 1; j < body.vertices.length; j++) {
											c.lineTo(body.vertices[j].x, body.vertices[j].y);
									}
									c.closePath();
							}
	
							var distanceX = body.position.x - render.options.width * 0.5,
									distanceY = body.position.y - render.options.height * 0.2,
									distance = Math.abs(distanceX) + Math.abs(distanceY);
	
							c.shadowColor = 'rgba(0,0,0,0.15)';
							c.shadowOffsetX = 0.05 * distanceX;
							c.shadowOffsetY = 0.05 * distanceY;
							c.shadowBlur = 1 + 12 * Math.min(1, distance / 1000);
	
							c.fill();
	
							c.shadowColor = null;
							c.shadowOffsetX = null;
							c.shadowOffsetY = null;
							c.shadowBlur = null;
					}
			};
	
			/**
			 * Description
			 * @private
			 * @method bodies
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodies = function(render, bodies, context) {
					var c = context,
							engine = render.engine,
							options = render.options,
							showInternalEdges = options.showInternalEdges || !options.wireframes,
							body,
							part,
							i,
							k;
	
					for (i = 0; i < bodies.length; i++) {
							body = bodies[i];
	
							if (!body.render.visible)
									continue;
	
							// handle compound parts
							for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
									part = body.parts[k];
	
									if (!part.render.visible)
											continue;
	
									if (options.showSleeping && body.isSleeping) {
											c.globalAlpha = 0.5 * part.render.opacity;
									} else if (part.render.opacity !== 1) {
											c.globalAlpha = part.render.opacity;
									}
	
									if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
											// part sprite
											var sprite = part.render.sprite,
													texture = _getTexture(render, sprite.texture);
	
											c.translate(part.position.x, part.position.y);
											c.rotate(part.angle);
	
											c.drawImage(
													texture,
													texture.width * -sprite.xOffset * sprite.xScale,
													texture.height * -sprite.yOffset * sprite.yScale,
													texture.width * sprite.xScale,
													texture.height * sprite.yScale
											);
	
											// revert translation, hopefully faster than save / restore
											c.rotate(-part.angle);
											c.translate(-part.position.x, -part.position.y);
									} else {
											// part polygon
											if (part.circleRadius) {
													c.beginPath();
													c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
											} else {
													c.beginPath();
													c.moveTo(part.vertices[0].x, part.vertices[0].y);
	
													for (var j = 1; j < part.vertices.length; j++) {
															if (!part.vertices[j - 1].isInternal || showInternalEdges) {
																	c.lineTo(part.vertices[j].x, part.vertices[j].y);
															} else {
																	c.moveTo(part.vertices[j].x, part.vertices[j].y);
															}
	
															if (part.vertices[j].isInternal && !showInternalEdges) {
																	c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
															}
													}
	
													c.lineTo(part.vertices[0].x, part.vertices[0].y);
													c.closePath();
											}
	
											if (!options.wireframes) {
													c.fillStyle = part.render.fillStyle;
	
													if (part.render.lineWidth) {
															c.lineWidth = part.render.lineWidth;
															c.strokeStyle = part.render.strokeStyle;
															c.stroke();
													}
	
													c.fill();
											} else {
													c.lineWidth = 1;
													c.strokeStyle = '#bbb';
													c.stroke();
											}
									}
	
									c.globalAlpha = 1;
							}
					}
			};
	
			/**
			 * Optimised method for drawing body wireframes in one pass
			 * @private
			 * @method bodyWireframes
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyWireframes = function(render, bodies, context) {
					var c = context,
							showInternalEdges = render.options.showInternalEdges,
							body,
							part,
							i,
							j,
							k;
	
					c.beginPath();
	
					// render all bodies
					for (i = 0; i < bodies.length; i++) {
							body = bodies[i];
	
							if (!body.render.visible)
									continue;
	
							// handle compound parts
							for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
									part = body.parts[k];
	
									c.moveTo(part.vertices[0].x, part.vertices[0].y);
	
									for (j = 1; j < part.vertices.length; j++) {
											if (!part.vertices[j - 1].isInternal || showInternalEdges) {
													c.lineTo(part.vertices[j].x, part.vertices[j].y);
											} else {
													c.moveTo(part.vertices[j].x, part.vertices[j].y);
											}
	
											if (part.vertices[j].isInternal && !showInternalEdges) {
													c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
											}
									}
	
									c.lineTo(part.vertices[0].x, part.vertices[0].y);
							}
					}
	
					c.lineWidth = 1;
					c.strokeStyle = '#bbb';
					c.stroke();
			};
	
			/**
			 * Optimised method for drawing body convex hull wireframes in one pass
			 * @private
			 * @method bodyConvexHulls
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyConvexHulls = function(render, bodies, context) {
					var c = context,
							body,
							part,
							i,
							j,
							k;
	
					c.beginPath();
	
					// render convex hulls
					for (i = 0; i < bodies.length; i++) {
							body = bodies[i];
	
							if (!body.render.visible || body.parts.length === 1)
									continue;
	
							c.moveTo(body.vertices[0].x, body.vertices[0].y);
	
							for (j = 1; j < body.vertices.length; j++) {
									c.lineTo(body.vertices[j].x, body.vertices[j].y);
							}
	
							c.lineTo(body.vertices[0].x, body.vertices[0].y);
					}
	
					c.lineWidth = 1;
					c.strokeStyle = 'rgba(255,255,255,0.2)';
					c.stroke();
			};
	
			/**
			 * Renders body vertex numbers.
			 * @private
			 * @method vertexNumbers
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.vertexNumbers = function(render, bodies, context) {
					var c = context,
							i,
							j,
							k;
	
					for (i = 0; i < bodies.length; i++) {
							var parts = bodies[i].parts;
							for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
									var part = parts[k];
									for (j = 0; j < part.vertices.length; j++) {
											c.fillStyle = 'rgba(255,255,255,0.2)';
											c.fillText(i + '_' + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
									}
							}
					}
			};
	
			/**
			 * Renders mouse position.
			 * @private
			 * @method mousePosition
			 * @param {render} render
			 * @param {mouse} mouse
			 * @param {RenderingContext} context
			 */
			Render.mousePosition = function(render, mouse, context) {
					var c = context;
					c.fillStyle = 'rgba(255,255,255,0.8)';
					c.fillText(mouse.position.x + '  ' + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
			};
	
			/**
			 * Draws body bounds
			 * @private
			 * @method bodyBounds
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyBounds = function(render, bodies, context) {
					var c = context,
							engine = render.engine,
							options = render.options;
	
					c.beginPath();
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (body.render.visible) {
									var parts = bodies[i].parts;
									for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
											var part = parts[j];
											c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
									}
							}
					}
	
					if (options.wireframes) {
							c.strokeStyle = 'rgba(255,255,255,0.08)';
					} else {
							c.strokeStyle = 'rgba(0,0,0,0.1)';
					}
	
					c.lineWidth = 1;
					c.stroke();
			};
	
			/**
			 * Draws body angle indicators and axes
			 * @private
			 * @method bodyAxes
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyAxes = function(render, bodies, context) {
					var c = context,
							engine = render.engine,
							options = render.options,
							part,
							i,
							j,
							k;
	
					c.beginPath();
	
					for (i = 0; i < bodies.length; i++) {
							var body = bodies[i],
									parts = body.parts;
	
							if (!body.render.visible)
									continue;
	
							if (options.showAxes) {
									// render all axes
									for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
											part = parts[j];
											for (k = 0; k < part.axes.length; k++) {
													var axis = part.axes[k];
													c.moveTo(part.position.x, part.position.y);
													c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
											}
									}
							} else {
									for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
											part = parts[j];
											for (k = 0; k < part.axes.length; k++) {
													// render a single axis indicator
													c.moveTo(part.position.x, part.position.y);
													c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2,
																	 (part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2);
											}
									}
							}
					}
	
					if (options.wireframes) {
							c.strokeStyle = 'indianred';
							c.lineWidth = 1;
					} else {
							c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
							c.globalCompositeOperation = 'overlay';
							c.lineWidth = 2;
					}
	
					c.stroke();
					c.globalCompositeOperation = 'source-over';
			};
	
			/**
			 * Draws body positions
			 * @private
			 * @method bodyPositions
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyPositions = function(render, bodies, context) {
					var c = context,
							engine = render.engine,
							options = render.options,
							body,
							part,
							i,
							k;
	
					c.beginPath();
	
					// render current positions
					for (i = 0; i < bodies.length; i++) {
							body = bodies[i];
	
							if (!body.render.visible)
									continue;
	
							// handle compound parts
							for (k = 0; k < body.parts.length; k++) {
									part = body.parts[k];
									c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
									c.closePath();
							}
					}
	
					if (options.wireframes) {
							c.fillStyle = 'indianred';
					} else {
							c.fillStyle = 'rgba(0,0,0,0.5)';
					}
					c.fill();
	
					c.beginPath();
	
					// render previous positions
					for (i = 0; i < bodies.length; i++) {
							body = bodies[i];
							if (body.render.visible) {
									c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
									c.closePath();
							}
					}
	
					c.fillStyle = 'rgba(255,165,0,0.8)';
					c.fill();
			};
	
			/**
			 * Draws body velocity
			 * @private
			 * @method bodyVelocity
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyVelocity = function(render, bodies, context) {
					var c = context;
	
					c.beginPath();
	
					for (var i = 0; i < bodies.length; i++) {
							var body = bodies[i];
	
							if (!body.render.visible)
									continue;
	
							c.moveTo(body.position.x, body.position.y);
							c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
					}
	
					c.lineWidth = 3;
					c.strokeStyle = 'cornflowerblue';
					c.stroke();
			};
	
			/**
			 * Draws body ids
			 * @private
			 * @method bodyIds
			 * @param {render} render
			 * @param {body[]} bodies
			 * @param {RenderingContext} context
			 */
			Render.bodyIds = function(render, bodies, context) {
					var c = context,
							i,
							j;
	
					for (i = 0; i < bodies.length; i++) {
							if (!bodies[i].render.visible)
									continue;
	
							var parts = bodies[i].parts;
							for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
									var part = parts[j];
									c.font = "12px Arial";
									c.fillStyle = 'rgba(255,255,255,0.5)';
									c.fillText(part.id, part.position.x + 10, part.position.y - 10);
							}
					}
			};
	
			/**
			 * Description
			 * @private
			 * @method collisions
			 * @param {render} render
			 * @param {pair[]} pairs
			 * @param {RenderingContext} context
			 */
			Render.collisions = function(render, pairs, context) {
					var c = context,
							options = render.options,
							pair,
							collision,
							corrected,
							bodyA,
							bodyB,
							i,
							j;
	
					c.beginPath();
	
					// render collision positions
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
	
							if (!pair.isActive)
									continue;
	
							collision = pair.collision;
							for (j = 0; j < pair.activeContacts.length; j++) {
									var contact = pair.activeContacts[j],
											vertex = contact.vertex;
									c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
							}
					}
	
					if (options.wireframes) {
							c.fillStyle = 'rgba(255,255,255,0.7)';
					} else {
							c.fillStyle = 'orange';
					}
					c.fill();
	
					c.beginPath();
	
					// render collision normals
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
	
							if (!pair.isActive)
									continue;
	
							collision = pair.collision;
	
							if (pair.activeContacts.length > 0) {
									var normalPosX = pair.activeContacts[0].vertex.x,
											normalPosY = pair.activeContacts[0].vertex.y;
	
									if (pair.activeContacts.length === 2) {
											normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
											normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
									}
	
									if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
											c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
									} else {
											c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
									}
	
									c.lineTo(normalPosX, normalPosY);
							}
					}
	
					if (options.wireframes) {
							c.strokeStyle = 'rgba(255,165,0,0.7)';
					} else {
							c.strokeStyle = 'orange';
					}
	
					c.lineWidth = 1;
					c.stroke();
			};
	
			/**
			 * Description
			 * @private
			 * @method separations
			 * @param {render} render
			 * @param {pair[]} pairs
			 * @param {RenderingContext} context
			 */
			Render.separations = function(render, pairs, context) {
					var c = context,
							options = render.options,
							pair,
							collision,
							corrected,
							bodyA,
							bodyB,
							i,
							j;
	
					c.beginPath();
	
					// render separations
					for (i = 0; i < pairs.length; i++) {
							pair = pairs[i];
	
							if (!pair.isActive)
									continue;
	
							collision = pair.collision;
							bodyA = collision.bodyA;
							bodyB = collision.bodyB;
	
							var k = 1;
	
							if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
							if (bodyB.isStatic) k = 0;
	
							c.moveTo(bodyB.position.x, bodyB.position.y);
							c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);
	
							k = 1;
	
							if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
							if (bodyA.isStatic) k = 0;
	
							c.moveTo(bodyA.position.x, bodyA.position.y);
							c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
					}
	
					if (options.wireframes) {
							c.strokeStyle = 'rgba(255,165,0,0.5)';
					} else {
							c.strokeStyle = 'orange';
					}
					c.stroke();
			};
	
			/**
			 * Description
			 * @private
			 * @method grid
			 * @param {render} render
			 * @param {grid} grid
			 * @param {RenderingContext} context
			 */
			Render.grid = function(render, grid, context) {
					var c = context,
							options = render.options;
	
					if (options.wireframes) {
							c.strokeStyle = 'rgba(255,180,0,0.1)';
					} else {
							c.strokeStyle = 'rgba(255,180,0,0.5)';
					}
	
					c.beginPath();
	
					var bucketKeys = Common.keys(grid.buckets);
	
					for (var i = 0; i < bucketKeys.length; i++) {
							var bucketId = bucketKeys[i];
	
							if (grid.buckets[bucketId].length < 2)
									continue;
	
							var region = bucketId.split(/C|R/);
							c.rect(0.5 + parseInt(region[1], 10) * grid.bucketWidth,
											0.5 + parseInt(region[2], 10) * grid.bucketHeight,
											grid.bucketWidth,
											grid.bucketHeight);
					}
	
					c.lineWidth = 1;
					c.stroke();
			};
	
			/**
			 * Description
			 * @private
			 * @method inspector
			 * @param {inspector} inspector
			 * @param {RenderingContext} context
			 */
			Render.inspector = function(inspector, context) {
					var engine = inspector.engine,
							selected = inspector.selected,
							render = inspector.render,
							options = render.options,
							bounds;
	
					if (options.hasBounds) {
							var boundsWidth = render.bounds.max.x - render.bounds.min.x,
									boundsHeight = render.bounds.max.y - render.bounds.min.y,
									boundsScaleX = boundsWidth / render.options.width,
									boundsScaleY = boundsHeight / render.options.height;
	
							context.scale(1 / boundsScaleX, 1 / boundsScaleY);
							context.translate(-render.bounds.min.x, -render.bounds.min.y);
					}
	
					for (var i = 0; i < selected.length; i++) {
							var item = selected[i].data;
	
							context.translate(0.5, 0.5);
							context.lineWidth = 1;
							context.strokeStyle = 'rgba(255,165,0,0.9)';
							context.setLineDash([1,2]);
	
							switch (item.type) {
	
							case 'body':
	
									// render body selections
									bounds = item.bounds;
									context.beginPath();
									context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3),
															 Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
									context.closePath();
									context.stroke();
	
									break;
	
							case 'constraint':
	
									// render constraint selections
									var point = item.pointA;
									if (item.bodyA)
											point = item.pointB;
									context.beginPath();
									context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
									context.closePath();
									context.stroke();
	
									break;
	
							}
	
							context.setLineDash([]);
							context.translate(-0.5, -0.5);
					}
	
					// render selection region
					if (inspector.selectStart !== null) {
							context.translate(0.5, 0.5);
							context.lineWidth = 1;
							context.strokeStyle = 'rgba(255,165,0,0.6)';
							context.fillStyle = 'rgba(255,165,0,0.1)';
							bounds = inspector.selectBounds;
							context.beginPath();
							context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y),
													 Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
							context.closePath();
							context.stroke();
							context.fill();
							context.translate(-0.5, -0.5);
					}
	
					if (options.hasBounds)
							context.setTransform(1, 0, 0, 1, 0, 0);
			};
	
			/**
			 * Description
			 * @method _createCanvas
			 * @private
			 * @param {} width
			 * @param {} height
			 * @return canvas
			 */
			var _createCanvas = function(width, height) {
					var canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					canvas.oncontextmenu = function() { return false; };
					canvas.onselectstart = function() { return false; };
					return canvas;
			};
	
			/**
			 * Gets the pixel ratio of the canvas.
			 * @method _getPixelRatio
			 * @private
			 * @param {HTMLElement} canvas
			 * @return {Number} pixel ratio
			 */
			var _getPixelRatio = function(canvas) {
					var context = canvas.getContext('2d'),
							devicePixelRatio = window.devicePixelRatio || 1,
							backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio
																				|| context.msBackingStorePixelRatio || context.oBackingStorePixelRatio
																				|| context.backingStorePixelRatio || 1;
	
					return devicePixelRatio / backingStorePixelRatio;
			};
	
			/**
			 * Gets the requested texture (an Image) via its path
			 * @method _getTexture
			 * @private
			 * @param {render} render
			 * @param {string} imagePath
			 * @return {Image} texture
			 */
			var _getTexture = function(render, imagePath) {
					var image = render.textures[imagePath];
	
					if (image)
							return image;
	
					image = render.textures[imagePath] = new Image();
					image.src = imagePath;
	
					return image;
			};
	
			/**
			 * Applies the background to the canvas using CSS.
			 * @method applyBackground
			 * @private
			 * @param {render} render
			 * @param {string} background
			 */
			var _applyBackground = function(render, background) {
					var cssBackground = background;
	
					if (/(jpg|gif|png)$/.test(background))
							cssBackground = 'url(' + background + ')';
	
					render.canvas.style.background = cssBackground;
					render.canvas.style.backgroundSize = "contain";
					render.currentBackground = background;
			};
	
			/*
			*
			*  Events Documentation
			*
			*/
	
			/**
			* Fired before rendering
			*
			* @event beforeRender
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/**
			* Fired after rendering
			*
			* @event afterRender
			* @param {} event An event object
			* @param {number} event.timestamp The engine.timing.timestamp of the event
			* @param {} event.source The source object of the event
			* @param {} event.name The name of the event
			*/
	
			/*
			*
			*  Properties Documentation
			*
			*/
	
			/**
			 * A back-reference to the `Matter.Render` module.
			 *
			 * @property controller
			 * @type render
			 */
	
			/**
			 * A reference to the `Matter.Engine` instance to be used.
			 *
			 * @property engine
			 * @type engine
			 */
	
			/**
			 * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
			 *
			 * @property element
			 * @type HTMLElement
			 * @default null
			 */
	
			/**
			 * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
			 *
			 * @property canvas
			 * @type HTMLCanvasElement
			 * @default null
			 */
	
			/**
			 * The configuration options of the renderer.
			 *
			 * @property options
			 * @type {}
			 */
	
			/**
			 * The target width in pixels of the `render.canvas` to be created.
			 *
			 * @property options.width
			 * @type number
			 * @default 800
			 */
	
			/**
			 * The target height in pixels of the `render.canvas` to be created.
			 *
			 * @property options.height
			 * @type number
			 * @default 600
			 */
	
			/**
			 * A flag that specifies if `render.bounds` should be used when rendering.
			 *
			 * @property options.hasBounds
			 * @type boolean
			 * @default false
			 */
	
			/**
			 * A `Bounds` object that specifies the drawing view region.
			 * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
			 * This allows for creating views that can pan or zoom around the scene.
			 * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
			 *
			 * @property bounds
			 * @type bounds
			 */
	
			/**
			 * The 2d rendering context from the `render.canvas` element.
			 *
			 * @property context
			 * @type CanvasRenderingContext2D
			 */
	
			/**
			 * The sprite texture cache.
			 *
			 * @property textures
			 * @type {}
			 */
	
	})();
	
	},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../geometry/Bounds":26,"../geometry/Vector":28}],32:[function(_dereq_,module,exports){
	/**
	* The `Matter.RenderPixi` module is an example renderer using pixi.js.
	* See also `Matter.Render` for a canvas based renderer.
	*
	* @class RenderPixi
	* @deprecated the Matter.RenderPixi module will soon be removed from the Matter.js core.
	* It will likely be moved to its own repository (but maintenance will be limited).
	*/
	
	var RenderPixi = {};
	
	module.exports = RenderPixi;
	
	var Bounds = _dereq_('../geometry/Bounds');
	var Composite = _dereq_('../body/Composite');
	var Common = _dereq_('../core/Common');
	var Events = _dereq_('../core/Events');
	var Vector = _dereq_('../geometry/Vector');
	
	(function() {
	
			var _requestAnimationFrame,
					_cancelAnimationFrame;
	
			if (typeof window !== 'undefined') {
					_requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
																				|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame 
																				|| function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };
		 
					_cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
																				|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
			}
			
			/**
			 * Creates a new Pixi.js WebGL renderer
			 * @method create
			 * @param {object} options
			 * @return {RenderPixi} A new renderer
			 * @deprecated
			 */
			RenderPixi.create = function(options) {
					Common.warn('RenderPixi.create: Matter.RenderPixi is deprecated (see docs)');
	
					var defaults = {
							controller: RenderPixi,
							engine: null,
							element: null,
							frameRequestId: null,
							canvas: null,
							renderer: null,
							container: null,
							spriteContainer: null,
							pixiOptions: null,
							options: {
									width: 800,
									height: 600,
									background: '#fafafa',
									wireframeBackground: '#222',
									hasBounds: false,
									enabled: false,
									wireframes: true,
									showSleeping: true,
									showDebug: false,
									showBroadphase: false,
									showBounds: false,
									showVelocity: false,
									showCollisions: false,
									showAxes: false,
									showPositions: false,
									showAngleIndicator: false,
									showIds: false,
									showShadows: false
							}
					};
	
					var render = Common.extend(defaults, options),
							transparent = !render.options.wireframes && render.options.background === 'transparent';
	
					// init pixi
					render.pixiOptions = render.pixiOptions || {
							view: render.canvas,
							transparent: transparent,
							antialias: true,
							backgroundColor: options.background
					};
	
					render.mouse = options.mouse;
					render.engine = options.engine;
					render.renderer = render.renderer || new PIXI.WebGLRenderer(render.options.width, render.options.height, render.pixiOptions);
					render.container = render.container || new PIXI.Container();
					render.spriteContainer = render.spriteContainer || new PIXI.Container();
					render.canvas = render.canvas || render.renderer.view;
					render.bounds = render.bounds || { 
							min: {
									x: 0,
									y: 0
							}, 
							max: { 
									x: render.options.width,
									y: render.options.height
							}
					};
	
					// event listeners
					Events.on(render.engine, 'beforeUpdate', function() {
							RenderPixi.clear(render);
					});
	
					// caches
					render.textures = {};
					render.sprites = {};
					render.primitives = {};
	
					// use a sprite batch for performance
					render.container.addChild(render.spriteContainer);
	
					// insert canvas
					if (Common.isElement(render.element)) {
							render.element.appendChild(render.canvas);
					} else {
							Common.warn('No "render.element" passed, "render.canvas" was not inserted into document.');
					}
	
					// prevent menus on canvas
					render.canvas.oncontextmenu = function() { return false; };
					render.canvas.onselectstart = function() { return false; };
	
					return render;
			};
	
			/**
			 * Continuously updates the render canvas on the `requestAnimationFrame` event.
			 * @method run
			 * @param {render} render
			 * @deprecated
			 */
			RenderPixi.run = function(render) {
					(function loop(time){
							render.frameRequestId = _requestAnimationFrame(loop);
							RenderPixi.world(render);
					})();
			};
	
			/**
			 * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
			 * @method stop
			 * @param {render} render
			 * @deprecated
			 */
			RenderPixi.stop = function(render) {
					_cancelAnimationFrame(render.frameRequestId);
			};
	
			/**
			 * Clears the scene graph
			 * @method clear
			 * @param {RenderPixi} render
			 * @deprecated
			 */
			RenderPixi.clear = function(render) {
					var container = render.container,
							spriteContainer = render.spriteContainer;
	
					// clear stage container
					while (container.children[0]) { 
							container.removeChild(container.children[0]); 
					}
	
					// clear sprite batch
					while (spriteContainer.children[0]) { 
							spriteContainer.removeChild(spriteContainer.children[0]); 
					}
	
					var bgSprite = render.sprites['bg-0'];
	
					// clear caches
					render.textures = {};
					render.sprites = {};
					render.primitives = {};
	
					// set background sprite
					render.sprites['bg-0'] = bgSprite;
					if (bgSprite)
							container.addChildAt(bgSprite, 0);
	
					// add sprite batch back into container
					render.container.addChild(render.spriteContainer);
	
					// reset background state
					render.currentBackground = null;
	
					// reset bounds transforms
					container.scale.set(1, 1);
					container.position.set(0, 0);
			};
	
			/**
			 * Sets the background of the canvas 
			 * @method setBackground
			 * @param {RenderPixi} render
			 * @param {string} background
			 * @deprecated
			 */
			RenderPixi.setBackground = function(render, background) {
					if (render.currentBackground !== background) {
							var isColor = background.indexOf && background.indexOf('#') !== -1,
									bgSprite = render.sprites['bg-0'];
	
							if (isColor) {
									// if solid background color
									var color = Common.colorToNumber(background);
									render.renderer.backgroundColor = color;
	
									// remove background sprite if existing
									if (bgSprite)
											render.container.removeChild(bgSprite); 
							} else {
									// initialise background sprite if needed
									if (!bgSprite) {
											var texture = _getTexture(render, background);
	
											bgSprite = render.sprites['bg-0'] = new PIXI.Sprite(texture);
											bgSprite.position.x = 0;
											bgSprite.position.y = 0;
											render.container.addChildAt(bgSprite, 0);
									}
							}
	
							render.currentBackground = background;
					}
			};
	
			/**
			 * Description
			 * @method world
			 * @param {engine} engine
			 * @deprecated
			 */
			RenderPixi.world = function(render) {
					var engine = render.engine,
							world = engine.world,
							renderer = render.renderer,
							container = render.container,
							options = render.options,
							bodies = Composite.allBodies(world),
							allConstraints = Composite.allConstraints(world),
							constraints = [],
							i;
	
					if (options.wireframes) {
							RenderPixi.setBackground(render, options.wireframeBackground);
					} else {
							RenderPixi.setBackground(render, options.background);
					}
	
					// handle bounds
					var boundsWidth = render.bounds.max.x - render.bounds.min.x,
							boundsHeight = render.bounds.max.y - render.bounds.min.y,
							boundsScaleX = boundsWidth / render.options.width,
							boundsScaleY = boundsHeight / render.options.height;
	
					if (options.hasBounds) {
							// Hide bodies that are not in view
							for (i = 0; i < bodies.length; i++) {
									var body = bodies[i];
									body.render.sprite.visible = Bounds.overlaps(body.bounds, render.bounds);
							}
	
							// filter out constraints that are not in view
							for (i = 0; i < allConstraints.length; i++) {
									var constraint = allConstraints[i],
											bodyA = constraint.bodyA,
											bodyB = constraint.bodyB,
											pointAWorld = constraint.pointA,
											pointBWorld = constraint.pointB;
	
									if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
									if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);
	
									if (!pointAWorld || !pointBWorld)
											continue;
	
									if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
											constraints.push(constraint);
							}
	
							// transform the view
							container.scale.set(1 / boundsScaleX, 1 / boundsScaleY);
							container.position.set(-render.bounds.min.x * (1 / boundsScaleX), -render.bounds.min.y * (1 / boundsScaleY));
					} else {
							constraints = allConstraints;
					}
	
					for (i = 0; i < bodies.length; i++)
							RenderPixi.body(render, bodies[i]);
	
					for (i = 0; i < constraints.length; i++)
							RenderPixi.constraint(render, constraints[i]);
	
					renderer.render(container);
			};
	
	
			/**
			 * Description
			 * @method constraint
			 * @param {engine} engine
			 * @param {constraint} constraint
			 * @deprecated
			 */
			RenderPixi.constraint = function(render, constraint) {
					var engine = render.engine,
							bodyA = constraint.bodyA,
							bodyB = constraint.bodyB,
							pointA = constraint.pointA,
							pointB = constraint.pointB,
							container = render.container,
							constraintRender = constraint.render,
							primitiveId = 'c-' + constraint.id,
							primitive = render.primitives[primitiveId];
	
					// initialise constraint primitive if not existing
					if (!primitive)
							primitive = render.primitives[primitiveId] = new PIXI.Graphics();
	
					// don't render if constraint does not have two end points
					if (!constraintRender.visible || !constraint.pointA || !constraint.pointB) {
							primitive.clear();
							return;
					}
	
					// add to scene graph if not already there
					if (Common.indexOf(container.children, primitive) === -1)
							container.addChild(primitive);
	
					// render the constraint on every update, since they can change dynamically
					primitive.clear();
					primitive.beginFill(0, 0);
					primitive.lineStyle(constraintRender.lineWidth, Common.colorToNumber(constraintRender.strokeStyle), 1);
					
					if (bodyA) {
							primitive.moveTo(bodyA.position.x + pointA.x, bodyA.position.y + pointA.y);
					} else {
							primitive.moveTo(pointA.x, pointA.y);
					}
	
					if (bodyB) {
							primitive.lineTo(bodyB.position.x + pointB.x, bodyB.position.y + pointB.y);
					} else {
							primitive.lineTo(pointB.x, pointB.y);
					}
	
					primitive.endFill();
			};
			
			/**
			 * Description
			 * @method body
			 * @param {engine} engine
			 * @param {body} body
			 * @deprecated
			 */
			RenderPixi.body = function(render, body) {
					var engine = render.engine,
							bodyRender = body.render;
	
					if (!bodyRender.visible)
							return;
	
					if (bodyRender.sprite && bodyRender.sprite.texture) {
							var spriteId = 'b-' + body.id,
									sprite = render.sprites[spriteId],
									spriteContainer = render.spriteContainer;
	
							// initialise body sprite if not existing
							if (!sprite)
									sprite = render.sprites[spriteId] = _createBodySprite(render, body);
	
							// add to scene graph if not already there
							if (Common.indexOf(spriteContainer.children, sprite) === -1)
									spriteContainer.addChild(sprite);
	
							// update body sprite
							sprite.position.x = body.position.x;
							sprite.position.y = body.position.y;
							sprite.rotation = body.angle;
							sprite.scale.x = bodyRender.sprite.xScale || 1;
							sprite.scale.y = bodyRender.sprite.yScale || 1;
					} else {
							var primitiveId = 'b-' + body.id,
									primitive = render.primitives[primitiveId],
									container = render.container;
	
							// initialise body primitive if not existing
							if (!primitive) {
									primitive = render.primitives[primitiveId] = _createBodyPrimitive(render, body);
									primitive.initialAngle = body.angle;
							}
	
							// add to scene graph if not already there
							if (Common.indexOf(container.children, primitive) === -1)
									container.addChild(primitive);
	
							// update body primitive
							primitive.position.x = body.position.x;
							primitive.position.y = body.position.y;
							primitive.rotation = body.angle - primitive.initialAngle;
					}
			};
	
			/**
			 * Creates a body sprite
			 * @method _createBodySprite
			 * @private
			 * @param {RenderPixi} render
			 * @param {body} body
			 * @return {PIXI.Sprite} sprite
			 * @deprecated
			 */
			var _createBodySprite = function(render, body) {
					var bodyRender = body.render,
							texturePath = bodyRender.sprite.texture,
							texture = _getTexture(render, texturePath),
							sprite = new PIXI.Sprite(texture);
	
					sprite.anchor.x = body.render.sprite.xOffset;
					sprite.anchor.y = body.render.sprite.yOffset;
	
					return sprite;
			};
	
			/**
			 * Creates a body primitive
			 * @method _createBodyPrimitive
			 * @private
			 * @param {RenderPixi} render
			 * @param {body} body
			 * @return {PIXI.Graphics} graphics
			 * @deprecated
			 */
			var _createBodyPrimitive = function(render, body) {
					var bodyRender = body.render,
							options = render.options,
							primitive = new PIXI.Graphics(),
							fillStyle = Common.colorToNumber(bodyRender.fillStyle),
							strokeStyle = Common.colorToNumber(bodyRender.strokeStyle),
							strokeStyleIndicator = Common.colorToNumber(bodyRender.strokeStyle),
							strokeStyleWireframe = Common.colorToNumber('#bbb'),
							strokeStyleWireframeIndicator = Common.colorToNumber('#CD5C5C'),
							part;
	
					primitive.clear();
	
					// handle compound parts
					for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
							part = body.parts[k];
	
							if (!options.wireframes) {
									primitive.beginFill(fillStyle, 1);
									primitive.lineStyle(bodyRender.lineWidth, strokeStyle, 1);
							} else {
									primitive.beginFill(0, 0);
									primitive.lineStyle(1, strokeStyleWireframe, 1);
							}
	
							primitive.moveTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);
	
							for (var j = 1; j < part.vertices.length; j++) {
									primitive.lineTo(part.vertices[j].x - body.position.x, part.vertices[j].y - body.position.y);
							}
	
							primitive.lineTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);
	
							primitive.endFill();
	
							// angle indicator
							if (options.showAngleIndicator || options.showAxes) {
									primitive.beginFill(0, 0);
	
									if (options.wireframes) {
											primitive.lineStyle(1, strokeStyleWireframeIndicator, 1);
									} else {
											primitive.lineStyle(1, strokeStyleIndicator);
									}
	
									primitive.moveTo(part.position.x - body.position.x, part.position.y - body.position.y);
									primitive.lineTo(((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2 - body.position.x), 
																	 ((part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2 - body.position.y));
	
									primitive.endFill();
							}
					}
	
					return primitive;
			};
	
			/**
			 * Gets the requested texture (a PIXI.Texture) via its path
			 * @method _getTexture
			 * @private
			 * @param {RenderPixi} render
			 * @param {string} imagePath
			 * @return {PIXI.Texture} texture
			 * @deprecated
			 */
			var _getTexture = function(render, imagePath) {
					var texture = render.textures[imagePath];
	
					if (!texture)
							texture = render.textures[imagePath] = PIXI.Texture.fromImage(imagePath);
	
					return texture;
			};
	
	})();
	
	},{"../body/Composite":2,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}]},{},[30])(30)
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93)))
	
	/***/ }),
	/* 334 */
	/***/ (function(module, exports, __webpack_require__) {
	
	__webpack_require__(131);
	module.exports = __webpack_require__(130);
	
	
	/***/ })
	/******/ ]);