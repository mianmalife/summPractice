(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var es_array_concat = {};

	var globalThis_1;
	var hasRequiredGlobalThis;

	function requireGlobalThis () {
		if (hasRequiredGlobalThis) return globalThis_1;
		hasRequiredGlobalThis = 1;
		var check = function (it) {
		  return it && it.Math === Math && it;
		};

		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		globalThis_1 =
		  // eslint-disable-next-line es/no-global-this -- safe
		  check(typeof globalThis == 'object' && globalThis) ||
		  check(typeof window == 'object' && window) ||
		  // eslint-disable-next-line no-restricted-globals -- safe
		  check(typeof self == 'object' && self) ||
		  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
		  check(typeof globalThis_1 == 'object' && globalThis_1) ||
		  // eslint-disable-next-line no-new-func -- fallback
		  (function () { return this; })() || Function('return this')();
		return globalThis_1;
	}

	var objectGetOwnPropertyDescriptor = {};

	var fails;
	var hasRequiredFails;

	function requireFails () {
		if (hasRequiredFails) return fails;
		hasRequiredFails = 1;
		fails = function (exec) {
		  try {
		    return !!exec();
		  } catch (error) {
		    return true;
		  }
		};
		return fails;
	}

	var descriptors;
	var hasRequiredDescriptors;

	function requireDescriptors () {
		if (hasRequiredDescriptors) return descriptors;
		hasRequiredDescriptors = 1;
		var fails = requireFails();

		// Detect IE8's incomplete defineProperty implementation
		descriptors = !fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
		});
		return descriptors;
	}

	var functionBindNative;
	var hasRequiredFunctionBindNative;

	function requireFunctionBindNative () {
		if (hasRequiredFunctionBindNative) return functionBindNative;
		hasRequiredFunctionBindNative = 1;
		var fails = requireFails();

		functionBindNative = !fails(function () {
		  // eslint-disable-next-line es/no-function-prototype-bind -- safe
		  var test = (function () { /* empty */ }).bind();
		  // eslint-disable-next-line no-prototype-builtins -- safe
		  return typeof test != 'function' || test.hasOwnProperty('prototype');
		});
		return functionBindNative;
	}

	var functionCall;
	var hasRequiredFunctionCall;

	function requireFunctionCall () {
		if (hasRequiredFunctionCall) return functionCall;
		hasRequiredFunctionCall = 1;
		var NATIVE_BIND = requireFunctionBindNative();

		var call = Function.prototype.call;

		functionCall = NATIVE_BIND ? call.bind(call) : function () {
		  return call.apply(call, arguments);
		};
		return functionCall;
	}

	var objectPropertyIsEnumerable = {};

	var hasRequiredObjectPropertyIsEnumerable;

	function requireObjectPropertyIsEnumerable () {
		if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
		hasRequiredObjectPropertyIsEnumerable = 1;
		var $propertyIsEnumerable = {}.propertyIsEnumerable;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		// Nashorn ~ JDK8 bug
		var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

		// `Object.prototype.propertyIsEnumerable` method implementation
		// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
		objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
		  var descriptor = getOwnPropertyDescriptor(this, V);
		  return !!descriptor && descriptor.enumerable;
		} : $propertyIsEnumerable;
		return objectPropertyIsEnumerable;
	}

	var createPropertyDescriptor;
	var hasRequiredCreatePropertyDescriptor;

	function requireCreatePropertyDescriptor () {
		if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
		hasRequiredCreatePropertyDescriptor = 1;
		createPropertyDescriptor = function (bitmap, value) {
		  return {
		    enumerable: !(bitmap & 1),
		    configurable: !(bitmap & 2),
		    writable: !(bitmap & 4),
		    value: value
		  };
		};
		return createPropertyDescriptor;
	}

	var functionUncurryThis;
	var hasRequiredFunctionUncurryThis;

	function requireFunctionUncurryThis () {
		if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
		hasRequiredFunctionUncurryThis = 1;
		var NATIVE_BIND = requireFunctionBindNative();

		var FunctionPrototype = Function.prototype;
		var call = FunctionPrototype.call;
		var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

		functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
		  return function () {
		    return call.apply(fn, arguments);
		  };
		};
		return functionUncurryThis;
	}

	var classofRaw;
	var hasRequiredClassofRaw;

	function requireClassofRaw () {
		if (hasRequiredClassofRaw) return classofRaw;
		hasRequiredClassofRaw = 1;
		var uncurryThis = requireFunctionUncurryThis();

		var toString = uncurryThis({}.toString);
		var stringSlice = uncurryThis(''.slice);

		classofRaw = function (it) {
		  return stringSlice(toString(it), 8, -1);
		};
		return classofRaw;
	}

	var indexedObject;
	var hasRequiredIndexedObject;

	function requireIndexedObject () {
		if (hasRequiredIndexedObject) return indexedObject;
		hasRequiredIndexedObject = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var classof = requireClassofRaw();

		var $Object = Object;
		var split = uncurryThis(''.split);

		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		indexedObject = fails(function () {
		  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
		  // eslint-disable-next-line no-prototype-builtins -- safe
		  return !$Object('z').propertyIsEnumerable(0);
		}) ? function (it) {
		  return classof(it) === 'String' ? split(it, '') : $Object(it);
		} : $Object;
		return indexedObject;
	}

	var isNullOrUndefined;
	var hasRequiredIsNullOrUndefined;

	function requireIsNullOrUndefined () {
		if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
		hasRequiredIsNullOrUndefined = 1;
		// we can't use just `it == null` since of `document.all` special case
		// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
		isNullOrUndefined = function (it) {
		  return it === null || it === undefined;
		};
		return isNullOrUndefined;
	}

	var requireObjectCoercible;
	var hasRequiredRequireObjectCoercible;

	function requireRequireObjectCoercible () {
		if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
		hasRequiredRequireObjectCoercible = 1;
		var isNullOrUndefined = requireIsNullOrUndefined();

		var $TypeError = TypeError;

		// `RequireObjectCoercible` abstract operation
		// https://tc39.es/ecma262/#sec-requireobjectcoercible
		requireObjectCoercible = function (it) {
		  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
		  return it;
		};
		return requireObjectCoercible;
	}

	var toIndexedObject;
	var hasRequiredToIndexedObject;

	function requireToIndexedObject () {
		if (hasRequiredToIndexedObject) return toIndexedObject;
		hasRequiredToIndexedObject = 1;
		// toObject with fallback for non-array-like ES3 strings
		var IndexedObject = requireIndexedObject();
		var requireObjectCoercible = requireRequireObjectCoercible();

		toIndexedObject = function (it) {
		  return IndexedObject(requireObjectCoercible(it));
		};
		return toIndexedObject;
	}

	var isCallable;
	var hasRequiredIsCallable;

	function requireIsCallable () {
		if (hasRequiredIsCallable) return isCallable;
		hasRequiredIsCallable = 1;
		// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
		var documentAll = typeof document == 'object' && document.all;

		// `IsCallable` abstract operation
		// https://tc39.es/ecma262/#sec-iscallable
		// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
		isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
		  return typeof argument == 'function' || argument === documentAll;
		} : function (argument) {
		  return typeof argument == 'function';
		};
		return isCallable;
	}

	var isObject;
	var hasRequiredIsObject;

	function requireIsObject () {
		if (hasRequiredIsObject) return isObject;
		hasRequiredIsObject = 1;
		var isCallable = requireIsCallable();

		isObject = function (it) {
		  return typeof it == 'object' ? it !== null : isCallable(it);
		};
		return isObject;
	}

	var getBuiltIn;
	var hasRequiredGetBuiltIn;

	function requireGetBuiltIn () {
		if (hasRequiredGetBuiltIn) return getBuiltIn;
		hasRequiredGetBuiltIn = 1;
		var globalThis = requireGlobalThis();
		var isCallable = requireIsCallable();

		var aFunction = function (argument) {
		  return isCallable(argument) ? argument : undefined;
		};

		getBuiltIn = function (namespace, method) {
		  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
		};
		return getBuiltIn;
	}

	var objectIsPrototypeOf;
	var hasRequiredObjectIsPrototypeOf;

	function requireObjectIsPrototypeOf () {
		if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
		hasRequiredObjectIsPrototypeOf = 1;
		var uncurryThis = requireFunctionUncurryThis();

		objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
		return objectIsPrototypeOf;
	}

	var environmentUserAgent;
	var hasRequiredEnvironmentUserAgent;

	function requireEnvironmentUserAgent () {
		if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
		hasRequiredEnvironmentUserAgent = 1;
		var globalThis = requireGlobalThis();

		var navigator = globalThis.navigator;
		var userAgent = navigator && navigator.userAgent;

		environmentUserAgent = userAgent ? String(userAgent) : '';
		return environmentUserAgent;
	}

	var environmentV8Version;
	var hasRequiredEnvironmentV8Version;

	function requireEnvironmentV8Version () {
		if (hasRequiredEnvironmentV8Version) return environmentV8Version;
		hasRequiredEnvironmentV8Version = 1;
		var globalThis = requireGlobalThis();
		var userAgent = requireEnvironmentUserAgent();

		var process = globalThis.process;
		var Deno = globalThis.Deno;
		var versions = process && process.versions || Deno && Deno.version;
		var v8 = versions && versions.v8;
		var match, version;

		if (v8) {
		  match = v8.split('.');
		  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
		  // but their correct versions are not interesting for us
		  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
		}

		// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
		// so check `userAgent` even if `.v8` exists, but 0
		if (!version && userAgent) {
		  match = userAgent.match(/Edge\/(\d+)/);
		  if (!match || match[1] >= 74) {
		    match = userAgent.match(/Chrome\/(\d+)/);
		    if (match) version = +match[1];
		  }
		}

		environmentV8Version = version;
		return environmentV8Version;
	}

	var symbolConstructorDetection;
	var hasRequiredSymbolConstructorDetection;

	function requireSymbolConstructorDetection () {
		if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
		hasRequiredSymbolConstructorDetection = 1;
		/* eslint-disable es/no-symbol -- required for testing */
		var V8_VERSION = requireEnvironmentV8Version();
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		var $String = globalThis.String;

		// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
		symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
		  var symbol = Symbol('symbol detection');
		  // Chrome 38 Symbol has incorrect toString conversion
		  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
		  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
		  // of course, fail.
		  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
		    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
		    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
		});
		return symbolConstructorDetection;
	}

	var useSymbolAsUid;
	var hasRequiredUseSymbolAsUid;

	function requireUseSymbolAsUid () {
		if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
		hasRequiredUseSymbolAsUid = 1;
		/* eslint-disable es/no-symbol -- required for testing */
		var NATIVE_SYMBOL = requireSymbolConstructorDetection();

		useSymbolAsUid = NATIVE_SYMBOL
		  && !Symbol.sham
		  && typeof Symbol.iterator == 'symbol';
		return useSymbolAsUid;
	}

	var isSymbol;
	var hasRequiredIsSymbol;

	function requireIsSymbol () {
		if (hasRequiredIsSymbol) return isSymbol;
		hasRequiredIsSymbol = 1;
		var getBuiltIn = requireGetBuiltIn();
		var isCallable = requireIsCallable();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

		var $Object = Object;

		isSymbol = USE_SYMBOL_AS_UID ? function (it) {
		  return typeof it == 'symbol';
		} : function (it) {
		  var $Symbol = getBuiltIn('Symbol');
		  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
		};
		return isSymbol;
	}

	var tryToString;
	var hasRequiredTryToString;

	function requireTryToString () {
		if (hasRequiredTryToString) return tryToString;
		hasRequiredTryToString = 1;
		var $String = String;

		tryToString = function (argument) {
		  try {
		    return $String(argument);
		  } catch (error) {
		    return 'Object';
		  }
		};
		return tryToString;
	}

	var aCallable;
	var hasRequiredACallable;

	function requireACallable () {
		if (hasRequiredACallable) return aCallable;
		hasRequiredACallable = 1;
		var isCallable = requireIsCallable();
		var tryToString = requireTryToString();

		var $TypeError = TypeError;

		// `Assert: IsCallable(argument) is true`
		aCallable = function (argument) {
		  if (isCallable(argument)) return argument;
		  throw new $TypeError(tryToString(argument) + ' is not a function');
		};
		return aCallable;
	}

	var getMethod;
	var hasRequiredGetMethod;

	function requireGetMethod () {
		if (hasRequiredGetMethod) return getMethod;
		hasRequiredGetMethod = 1;
		var aCallable = requireACallable();
		var isNullOrUndefined = requireIsNullOrUndefined();

		// `GetMethod` abstract operation
		// https://tc39.es/ecma262/#sec-getmethod
		getMethod = function (V, P) {
		  var func = V[P];
		  return isNullOrUndefined(func) ? undefined : aCallable(func);
		};
		return getMethod;
	}

	var ordinaryToPrimitive;
	var hasRequiredOrdinaryToPrimitive;

	function requireOrdinaryToPrimitive () {
		if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
		hasRequiredOrdinaryToPrimitive = 1;
		var call = requireFunctionCall();
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();

		var $TypeError = TypeError;

		// `OrdinaryToPrimitive` abstract operation
		// https://tc39.es/ecma262/#sec-ordinarytoprimitive
		ordinaryToPrimitive = function (input, pref) {
		  var fn, val;
		  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
		  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		  throw new $TypeError("Can't convert object to primitive value");
		};
		return ordinaryToPrimitive;
	}

	var sharedStore = {exports: {}};

	var isPure;
	var hasRequiredIsPure;

	function requireIsPure () {
		if (hasRequiredIsPure) return isPure;
		hasRequiredIsPure = 1;
		isPure = false;
		return isPure;
	}

	var defineGlobalProperty;
	var hasRequiredDefineGlobalProperty;

	function requireDefineGlobalProperty () {
		if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
		hasRequiredDefineGlobalProperty = 1;
		var globalThis = requireGlobalThis();

		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var defineProperty = Object.defineProperty;

		defineGlobalProperty = function (key, value) {
		  try {
		    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
		  } catch (error) {
		    globalThis[key] = value;
		  } return value;
		};
		return defineGlobalProperty;
	}

	var hasRequiredSharedStore;

	function requireSharedStore () {
		if (hasRequiredSharedStore) return sharedStore.exports;
		hasRequiredSharedStore = 1;
		var IS_PURE = requireIsPure();
		var globalThis = requireGlobalThis();
		var defineGlobalProperty = requireDefineGlobalProperty();

		var SHARED = '__core-js_shared__';
		var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

		(store.versions || (store.versions = [])).push({
		  version: '3.38.1',
		  mode: IS_PURE ? 'pure' : 'global',
		  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
		  license: 'https://github.com/zloirock/core-js/blob/v3.38.1/LICENSE',
		  source: 'https://github.com/zloirock/core-js'
		});
		return sharedStore.exports;
	}

	var shared;
	var hasRequiredShared;

	function requireShared () {
		if (hasRequiredShared) return shared;
		hasRequiredShared = 1;
		var store = requireSharedStore();

		shared = function (key, value) {
		  return store[key] || (store[key] = value || {});
		};
		return shared;
	}

	var toObject;
	var hasRequiredToObject;

	function requireToObject () {
		if (hasRequiredToObject) return toObject;
		hasRequiredToObject = 1;
		var requireObjectCoercible = requireRequireObjectCoercible();

		var $Object = Object;

		// `ToObject` abstract operation
		// https://tc39.es/ecma262/#sec-toobject
		toObject = function (argument) {
		  return $Object(requireObjectCoercible(argument));
		};
		return toObject;
	}

	var hasOwnProperty_1;
	var hasRequiredHasOwnProperty;

	function requireHasOwnProperty () {
		if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
		hasRequiredHasOwnProperty = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var toObject = requireToObject();

		var hasOwnProperty = uncurryThis({}.hasOwnProperty);

		// `HasOwnProperty` abstract operation
		// https://tc39.es/ecma262/#sec-hasownproperty
		// eslint-disable-next-line es/no-object-hasown -- safe
		hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
		  return hasOwnProperty(toObject(it), key);
		};
		return hasOwnProperty_1;
	}

	var uid;
	var hasRequiredUid;

	function requireUid () {
		if (hasRequiredUid) return uid;
		hasRequiredUid = 1;
		var uncurryThis = requireFunctionUncurryThis();

		var id = 0;
		var postfix = Math.random();
		var toString = uncurryThis(1.0.toString);

		uid = function (key) {
		  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
		};
		return uid;
	}

	var wellKnownSymbol;
	var hasRequiredWellKnownSymbol;

	function requireWellKnownSymbol () {
		if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
		hasRequiredWellKnownSymbol = 1;
		var globalThis = requireGlobalThis();
		var shared = requireShared();
		var hasOwn = requireHasOwnProperty();
		var uid = requireUid();
		var NATIVE_SYMBOL = requireSymbolConstructorDetection();
		var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

		var Symbol = globalThis.Symbol;
		var WellKnownSymbolsStore = shared('wks');
		var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

		wellKnownSymbol = function (name) {
		  if (!hasOwn(WellKnownSymbolsStore, name)) {
		    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
		      ? Symbol[name]
		      : createWellKnownSymbol('Symbol.' + name);
		  } return WellKnownSymbolsStore[name];
		};
		return wellKnownSymbol;
	}

	var toPrimitive;
	var hasRequiredToPrimitive;

	function requireToPrimitive () {
		if (hasRequiredToPrimitive) return toPrimitive;
		hasRequiredToPrimitive = 1;
		var call = requireFunctionCall();
		var isObject = requireIsObject();
		var isSymbol = requireIsSymbol();
		var getMethod = requireGetMethod();
		var ordinaryToPrimitive = requireOrdinaryToPrimitive();
		var wellKnownSymbol = requireWellKnownSymbol();

		var $TypeError = TypeError;
		var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

		// `ToPrimitive` abstract operation
		// https://tc39.es/ecma262/#sec-toprimitive
		toPrimitive = function (input, pref) {
		  if (!isObject(input) || isSymbol(input)) return input;
		  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
		  var result;
		  if (exoticToPrim) {
		    if (pref === undefined) pref = 'default';
		    result = call(exoticToPrim, input, pref);
		    if (!isObject(result) || isSymbol(result)) return result;
		    throw new $TypeError("Can't convert object to primitive value");
		  }
		  if (pref === undefined) pref = 'number';
		  return ordinaryToPrimitive(input, pref);
		};
		return toPrimitive;
	}

	var toPropertyKey;
	var hasRequiredToPropertyKey;

	function requireToPropertyKey () {
		if (hasRequiredToPropertyKey) return toPropertyKey;
		hasRequiredToPropertyKey = 1;
		var toPrimitive = requireToPrimitive();
		var isSymbol = requireIsSymbol();

		// `ToPropertyKey` abstract operation
		// https://tc39.es/ecma262/#sec-topropertykey
		toPropertyKey = function (argument) {
		  var key = toPrimitive(argument, 'string');
		  return isSymbol(key) ? key : key + '';
		};
		return toPropertyKey;
	}

	var documentCreateElement;
	var hasRequiredDocumentCreateElement;

	function requireDocumentCreateElement () {
		if (hasRequiredDocumentCreateElement) return documentCreateElement;
		hasRequiredDocumentCreateElement = 1;
		var globalThis = requireGlobalThis();
		var isObject = requireIsObject();

		var document = globalThis.document;
		// typeof document.createElement is 'object' in old IE
		var EXISTS = isObject(document) && isObject(document.createElement);

		documentCreateElement = function (it) {
		  return EXISTS ? document.createElement(it) : {};
		};
		return documentCreateElement;
	}

	var ie8DomDefine;
	var hasRequiredIe8DomDefine;

	function requireIe8DomDefine () {
		if (hasRequiredIe8DomDefine) return ie8DomDefine;
		hasRequiredIe8DomDefine = 1;
		var DESCRIPTORS = requireDescriptors();
		var fails = requireFails();
		var createElement = requireDocumentCreateElement();

		// Thanks to IE8 for its funny defineProperty
		ie8DomDefine = !DESCRIPTORS && !fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty(createElement('div'), 'a', {
		    get: function () { return 7; }
		  }).a !== 7;
		});
		return ie8DomDefine;
	}

	var hasRequiredObjectGetOwnPropertyDescriptor;

	function requireObjectGetOwnPropertyDescriptor () {
		if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
		hasRequiredObjectGetOwnPropertyDescriptor = 1;
		var DESCRIPTORS = requireDescriptors();
		var call = requireFunctionCall();
		var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();
		var toIndexedObject = requireToIndexedObject();
		var toPropertyKey = requireToPropertyKey();
		var hasOwn = requireHasOwnProperty();
		var IE8_DOM_DEFINE = requireIe8DomDefine();

		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		// `Object.getOwnPropertyDescriptor` method
		// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
		objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
		  O = toIndexedObject(O);
		  P = toPropertyKey(P);
		  if (IE8_DOM_DEFINE) try {
		    return $getOwnPropertyDescriptor(O, P);
		  } catch (error) { /* empty */ }
		  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
		};
		return objectGetOwnPropertyDescriptor;
	}

	var objectDefineProperty = {};

	var v8PrototypeDefineBug;
	var hasRequiredV8PrototypeDefineBug;

	function requireV8PrototypeDefineBug () {
		if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
		hasRequiredV8PrototypeDefineBug = 1;
		var DESCRIPTORS = requireDescriptors();
		var fails = requireFails();

		// V8 ~ Chrome 36-
		// https://bugs.chromium.org/p/v8/issues/detail?id=3334
		v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
		  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
		  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
		    value: 42,
		    writable: false
		  }).prototype !== 42;
		});
		return v8PrototypeDefineBug;
	}

	var anObject;
	var hasRequiredAnObject;

	function requireAnObject () {
		if (hasRequiredAnObject) return anObject;
		hasRequiredAnObject = 1;
		var isObject = requireIsObject();

		var $String = String;
		var $TypeError = TypeError;

		// `Assert: Type(argument) is Object`
		anObject = function (argument) {
		  if (isObject(argument)) return argument;
		  throw new $TypeError($String(argument) + ' is not an object');
		};
		return anObject;
	}

	var hasRequiredObjectDefineProperty;

	function requireObjectDefineProperty () {
		if (hasRequiredObjectDefineProperty) return objectDefineProperty;
		hasRequiredObjectDefineProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var IE8_DOM_DEFINE = requireIe8DomDefine();
		var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
		var anObject = requireAnObject();
		var toPropertyKey = requireToPropertyKey();

		var $TypeError = TypeError;
		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var $defineProperty = Object.defineProperty;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		var ENUMERABLE = 'enumerable';
		var CONFIGURABLE = 'configurable';
		var WRITABLE = 'writable';

		// `Object.defineProperty` method
		// https://tc39.es/ecma262/#sec-object.defineproperty
		objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
		  anObject(O);
		  P = toPropertyKey(P);
		  anObject(Attributes);
		  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
		    var current = $getOwnPropertyDescriptor(O, P);
		    if (current && current[WRITABLE]) {
		      O[P] = Attributes.value;
		      Attributes = {
		        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
		        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
		        writable: false
		      };
		    }
		  } return $defineProperty(O, P, Attributes);
		} : $defineProperty : function defineProperty(O, P, Attributes) {
		  anObject(O);
		  P = toPropertyKey(P);
		  anObject(Attributes);
		  if (IE8_DOM_DEFINE) try {
		    return $defineProperty(O, P, Attributes);
		  } catch (error) { /* empty */ }
		  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
		  if ('value' in Attributes) O[P] = Attributes.value;
		  return O;
		};
		return objectDefineProperty;
	}

	var createNonEnumerableProperty;
	var hasRequiredCreateNonEnumerableProperty;

	function requireCreateNonEnumerableProperty () {
		if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
		hasRequiredCreateNonEnumerableProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var definePropertyModule = requireObjectDefineProperty();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();

		createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
		  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
		} : function (object, key, value) {
		  object[key] = value;
		  return object;
		};
		return createNonEnumerableProperty;
	}

	var makeBuiltIn = {exports: {}};

	var functionName;
	var hasRequiredFunctionName;

	function requireFunctionName () {
		if (hasRequiredFunctionName) return functionName;
		hasRequiredFunctionName = 1;
		var DESCRIPTORS = requireDescriptors();
		var hasOwn = requireHasOwnProperty();

		var FunctionPrototype = Function.prototype;
		// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

		var EXISTS = hasOwn(FunctionPrototype, 'name');
		// additional protection from minified / mangled / dropped function names
		var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
		var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

		functionName = {
		  EXISTS: EXISTS,
		  PROPER: PROPER,
		  CONFIGURABLE: CONFIGURABLE
		};
		return functionName;
	}

	var inspectSource;
	var hasRequiredInspectSource;

	function requireInspectSource () {
		if (hasRequiredInspectSource) return inspectSource;
		hasRequiredInspectSource = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var isCallable = requireIsCallable();
		var store = requireSharedStore();

		var functionToString = uncurryThis(Function.toString);

		// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
		if (!isCallable(store.inspectSource)) {
		  store.inspectSource = function (it) {
		    return functionToString(it);
		  };
		}

		inspectSource = store.inspectSource;
		return inspectSource;
	}

	var weakMapBasicDetection;
	var hasRequiredWeakMapBasicDetection;

	function requireWeakMapBasicDetection () {
		if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
		hasRequiredWeakMapBasicDetection = 1;
		var globalThis = requireGlobalThis();
		var isCallable = requireIsCallable();

		var WeakMap = globalThis.WeakMap;

		weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
		return weakMapBasicDetection;
	}

	var sharedKey;
	var hasRequiredSharedKey;

	function requireSharedKey () {
		if (hasRequiredSharedKey) return sharedKey;
		hasRequiredSharedKey = 1;
		var shared = requireShared();
		var uid = requireUid();

		var keys = shared('keys');

		sharedKey = function (key) {
		  return keys[key] || (keys[key] = uid(key));
		};
		return sharedKey;
	}

	var hiddenKeys;
	var hasRequiredHiddenKeys;

	function requireHiddenKeys () {
		if (hasRequiredHiddenKeys) return hiddenKeys;
		hasRequiredHiddenKeys = 1;
		hiddenKeys = {};
		return hiddenKeys;
	}

	var internalState;
	var hasRequiredInternalState;

	function requireInternalState () {
		if (hasRequiredInternalState) return internalState;
		hasRequiredInternalState = 1;
		var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
		var globalThis = requireGlobalThis();
		var isObject = requireIsObject();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var hasOwn = requireHasOwnProperty();
		var shared = requireSharedStore();
		var sharedKey = requireSharedKey();
		var hiddenKeys = requireHiddenKeys();

		var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
		var TypeError = globalThis.TypeError;
		var WeakMap = globalThis.WeakMap;
		var set, get, has;

		var enforce = function (it) {
		  return has(it) ? get(it) : set(it, {});
		};

		var getterFor = function (TYPE) {
		  return function (it) {
		    var state;
		    if (!isObject(it) || (state = get(it)).type !== TYPE) {
		      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
		    } return state;
		  };
		};

		if (NATIVE_WEAK_MAP || shared.state) {
		  var store = shared.state || (shared.state = new WeakMap());
		  /* eslint-disable no-self-assign -- prototype methods protection */
		  store.get = store.get;
		  store.has = store.has;
		  store.set = store.set;
		  /* eslint-enable no-self-assign -- prototype methods protection */
		  set = function (it, metadata) {
		    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
		    metadata.facade = it;
		    store.set(it, metadata);
		    return metadata;
		  };
		  get = function (it) {
		    return store.get(it) || {};
		  };
		  has = function (it) {
		    return store.has(it);
		  };
		} else {
		  var STATE = sharedKey('state');
		  hiddenKeys[STATE] = true;
		  set = function (it, metadata) {
		    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
		    metadata.facade = it;
		    createNonEnumerableProperty(it, STATE, metadata);
		    return metadata;
		  };
		  get = function (it) {
		    return hasOwn(it, STATE) ? it[STATE] : {};
		  };
		  has = function (it) {
		    return hasOwn(it, STATE);
		  };
		}

		internalState = {
		  set: set,
		  get: get,
		  has: has,
		  enforce: enforce,
		  getterFor: getterFor
		};
		return internalState;
	}

	var hasRequiredMakeBuiltIn;

	function requireMakeBuiltIn () {
		if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
		hasRequiredMakeBuiltIn = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var hasOwn = requireHasOwnProperty();
		var DESCRIPTORS = requireDescriptors();
		var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
		var inspectSource = requireInspectSource();
		var InternalStateModule = requireInternalState();

		var enforceInternalState = InternalStateModule.enforce;
		var getInternalState = InternalStateModule.get;
		var $String = String;
		// eslint-disable-next-line es/no-object-defineproperty -- safe
		var defineProperty = Object.defineProperty;
		var stringSlice = uncurryThis(''.slice);
		var replace = uncurryThis(''.replace);
		var join = uncurryThis([].join);

		var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
		  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
		});

		var TEMPLATE = String(String).split('String');

		var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
		  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
		    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
		  }
		  if (options && options.getter) name = 'get ' + name;
		  if (options && options.setter) name = 'set ' + name;
		  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
		    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
		    else value.name = name;
		  }
		  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
		    defineProperty(value, 'length', { value: options.arity });
		  }
		  try {
		    if (options && hasOwn(options, 'constructor') && options.constructor) {
		      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
		    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
		    } else if (value.prototype) value.prototype = undefined;
		  } catch (error) { /* empty */ }
		  var state = enforceInternalState(value);
		  if (!hasOwn(state, 'source')) {
		    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
		  } return value;
		};

		// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
		// eslint-disable-next-line no-extend-native -- required
		Function.prototype.toString = makeBuiltIn$1(function toString() {
		  return isCallable(this) && getInternalState(this).source || inspectSource(this);
		}, 'toString');
		return makeBuiltIn.exports;
	}

	var defineBuiltIn;
	var hasRequiredDefineBuiltIn;

	function requireDefineBuiltIn () {
		if (hasRequiredDefineBuiltIn) return defineBuiltIn;
		hasRequiredDefineBuiltIn = 1;
		var isCallable = requireIsCallable();
		var definePropertyModule = requireObjectDefineProperty();
		var makeBuiltIn = requireMakeBuiltIn();
		var defineGlobalProperty = requireDefineGlobalProperty();

		defineBuiltIn = function (O, key, value, options) {
		  if (!options) options = {};
		  var simple = options.enumerable;
		  var name = options.name !== undefined ? options.name : key;
		  if (isCallable(value)) makeBuiltIn(value, name, options);
		  if (options.global) {
		    if (simple) O[key] = value;
		    else defineGlobalProperty(key, value);
		  } else {
		    try {
		      if (!options.unsafe) delete O[key];
		      else if (O[key]) simple = true;
		    } catch (error) { /* empty */ }
		    if (simple) O[key] = value;
		    else definePropertyModule.f(O, key, {
		      value: value,
		      enumerable: false,
		      configurable: !options.nonConfigurable,
		      writable: !options.nonWritable
		    });
		  } return O;
		};
		return defineBuiltIn;
	}

	var objectGetOwnPropertyNames = {};

	var mathTrunc;
	var hasRequiredMathTrunc;

	function requireMathTrunc () {
		if (hasRequiredMathTrunc) return mathTrunc;
		hasRequiredMathTrunc = 1;
		var ceil = Math.ceil;
		var floor = Math.floor;

		// `Math.trunc` method
		// https://tc39.es/ecma262/#sec-math.trunc
		// eslint-disable-next-line es/no-math-trunc -- safe
		mathTrunc = Math.trunc || function trunc(x) {
		  var n = +x;
		  return (n > 0 ? floor : ceil)(n);
		};
		return mathTrunc;
	}

	var toIntegerOrInfinity;
	var hasRequiredToIntegerOrInfinity;

	function requireToIntegerOrInfinity () {
		if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
		hasRequiredToIntegerOrInfinity = 1;
		var trunc = requireMathTrunc();

		// `ToIntegerOrInfinity` abstract operation
		// https://tc39.es/ecma262/#sec-tointegerorinfinity
		toIntegerOrInfinity = function (argument) {
		  var number = +argument;
		  // eslint-disable-next-line no-self-compare -- NaN check
		  return number !== number || number === 0 ? 0 : trunc(number);
		};
		return toIntegerOrInfinity;
	}

	var toAbsoluteIndex;
	var hasRequiredToAbsoluteIndex;

	function requireToAbsoluteIndex () {
		if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
		hasRequiredToAbsoluteIndex = 1;
		var toIntegerOrInfinity = requireToIntegerOrInfinity();

		var max = Math.max;
		var min = Math.min;

		// Helper for a popular repeating case of the spec:
		// Let integer be ? ToInteger(index).
		// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
		toAbsoluteIndex = function (index, length) {
		  var integer = toIntegerOrInfinity(index);
		  return integer < 0 ? max(integer + length, 0) : min(integer, length);
		};
		return toAbsoluteIndex;
	}

	var toLength;
	var hasRequiredToLength;

	function requireToLength () {
		if (hasRequiredToLength) return toLength;
		hasRequiredToLength = 1;
		var toIntegerOrInfinity = requireToIntegerOrInfinity();

		var min = Math.min;

		// `ToLength` abstract operation
		// https://tc39.es/ecma262/#sec-tolength
		toLength = function (argument) {
		  var len = toIntegerOrInfinity(argument);
		  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
		};
		return toLength;
	}

	var lengthOfArrayLike;
	var hasRequiredLengthOfArrayLike;

	function requireLengthOfArrayLike () {
		if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
		hasRequiredLengthOfArrayLike = 1;
		var toLength = requireToLength();

		// `LengthOfArrayLike` abstract operation
		// https://tc39.es/ecma262/#sec-lengthofarraylike
		lengthOfArrayLike = function (obj) {
		  return toLength(obj.length);
		};
		return lengthOfArrayLike;
	}

	var arrayIncludes;
	var hasRequiredArrayIncludes;

	function requireArrayIncludes () {
		if (hasRequiredArrayIncludes) return arrayIncludes;
		hasRequiredArrayIncludes = 1;
		var toIndexedObject = requireToIndexedObject();
		var toAbsoluteIndex = requireToAbsoluteIndex();
		var lengthOfArrayLike = requireLengthOfArrayLike();

		// `Array.prototype.{ indexOf, includes }` methods implementation
		var createMethod = function (IS_INCLUDES) {
		  return function ($this, el, fromIndex) {
		    var O = toIndexedObject($this);
		    var length = lengthOfArrayLike(O);
		    if (length === 0) return !IS_INCLUDES && -1;
		    var index = toAbsoluteIndex(fromIndex, length);
		    var value;
		    // Array#includes uses SameValueZero equality algorithm
		    // eslint-disable-next-line no-self-compare -- NaN check
		    if (IS_INCLUDES && el !== el) while (length > index) {
		      value = O[index++];
		      // eslint-disable-next-line no-self-compare -- NaN check
		      if (value !== value) return true;
		    // Array#indexOf ignores holes, Array#includes - not
		    } else for (;length > index; index++) {
		      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
		    } return !IS_INCLUDES && -1;
		  };
		};

		arrayIncludes = {
		  // `Array.prototype.includes` method
		  // https://tc39.es/ecma262/#sec-array.prototype.includes
		  includes: createMethod(true),
		  // `Array.prototype.indexOf` method
		  // https://tc39.es/ecma262/#sec-array.prototype.indexof
		  indexOf: createMethod(false)
		};
		return arrayIncludes;
	}

	var objectKeysInternal;
	var hasRequiredObjectKeysInternal;

	function requireObjectKeysInternal () {
		if (hasRequiredObjectKeysInternal) return objectKeysInternal;
		hasRequiredObjectKeysInternal = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var hasOwn = requireHasOwnProperty();
		var toIndexedObject = requireToIndexedObject();
		var indexOf = requireArrayIncludes().indexOf;
		var hiddenKeys = requireHiddenKeys();

		var push = uncurryThis([].push);

		objectKeysInternal = function (object, names) {
		  var O = toIndexedObject(object);
		  var i = 0;
		  var result = [];
		  var key;
		  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
		  // Don't enum bug & hidden keys
		  while (names.length > i) if (hasOwn(O, key = names[i++])) {
		    ~indexOf(result, key) || push(result, key);
		  }
		  return result;
		};
		return objectKeysInternal;
	}

	var enumBugKeys;
	var hasRequiredEnumBugKeys;

	function requireEnumBugKeys () {
		if (hasRequiredEnumBugKeys) return enumBugKeys;
		hasRequiredEnumBugKeys = 1;
		// IE8- don't enum bug keys
		enumBugKeys = [
		  'constructor',
		  'hasOwnProperty',
		  'isPrototypeOf',
		  'propertyIsEnumerable',
		  'toLocaleString',
		  'toString',
		  'valueOf'
		];
		return enumBugKeys;
	}

	var hasRequiredObjectGetOwnPropertyNames;

	function requireObjectGetOwnPropertyNames () {
		if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
		hasRequiredObjectGetOwnPropertyNames = 1;
		var internalObjectKeys = requireObjectKeysInternal();
		var enumBugKeys = requireEnumBugKeys();

		var hiddenKeys = enumBugKeys.concat('length', 'prototype');

		// `Object.getOwnPropertyNames` method
		// https://tc39.es/ecma262/#sec-object.getownpropertynames
		// eslint-disable-next-line es/no-object-getownpropertynames -- safe
		objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
		  return internalObjectKeys(O, hiddenKeys);
		};
		return objectGetOwnPropertyNames;
	}

	var objectGetOwnPropertySymbols = {};

	var hasRequiredObjectGetOwnPropertySymbols;

	function requireObjectGetOwnPropertySymbols () {
		if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
		hasRequiredObjectGetOwnPropertySymbols = 1;
		// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
		objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
		return objectGetOwnPropertySymbols;
	}

	var ownKeys;
	var hasRequiredOwnKeys;

	function requireOwnKeys () {
		if (hasRequiredOwnKeys) return ownKeys;
		hasRequiredOwnKeys = 1;
		var getBuiltIn = requireGetBuiltIn();
		var uncurryThis = requireFunctionUncurryThis();
		var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
		var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
		var anObject = requireAnObject();

		var concat = uncurryThis([].concat);

		// all object keys, includes non-enumerable and symbols
		ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
		  var keys = getOwnPropertyNamesModule.f(anObject(it));
		  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
		  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
		};
		return ownKeys;
	}

	var copyConstructorProperties;
	var hasRequiredCopyConstructorProperties;

	function requireCopyConstructorProperties () {
		if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
		hasRequiredCopyConstructorProperties = 1;
		var hasOwn = requireHasOwnProperty();
		var ownKeys = requireOwnKeys();
		var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
		var definePropertyModule = requireObjectDefineProperty();

		copyConstructorProperties = function (target, source, exceptions) {
		  var keys = ownKeys(source);
		  var defineProperty = definePropertyModule.f;
		  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
		  for (var i = 0; i < keys.length; i++) {
		    var key = keys[i];
		    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
		      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
		    }
		  }
		};
		return copyConstructorProperties;
	}

	var isForced_1;
	var hasRequiredIsForced;

	function requireIsForced () {
		if (hasRequiredIsForced) return isForced_1;
		hasRequiredIsForced = 1;
		var fails = requireFails();
		var isCallable = requireIsCallable();

		var replacement = /#|\.prototype\./;

		var isForced = function (feature, detection) {
		  var value = data[normalize(feature)];
		  return value === POLYFILL ? true
		    : value === NATIVE ? false
		    : isCallable(detection) ? fails(detection)
		    : !!detection;
		};

		var normalize = isForced.normalize = function (string) {
		  return String(string).replace(replacement, '.').toLowerCase();
		};

		var data = isForced.data = {};
		var NATIVE = isForced.NATIVE = 'N';
		var POLYFILL = isForced.POLYFILL = 'P';

		isForced_1 = isForced;
		return isForced_1;
	}

	var _export;
	var hasRequired_export;

	function require_export () {
		if (hasRequired_export) return _export;
		hasRequired_export = 1;
		var globalThis = requireGlobalThis();
		var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var defineBuiltIn = requireDefineBuiltIn();
		var defineGlobalProperty = requireDefineGlobalProperty();
		var copyConstructorProperties = requireCopyConstructorProperties();
		var isForced = requireIsForced();

		/*
		  options.target         - name of the target object
		  options.global         - target is the global object
		  options.stat           - export as static methods of target
		  options.proto          - export as prototype methods of target
		  options.real           - real prototype method for the `pure` version
		  options.forced         - export even if the native feature is available
		  options.bind           - bind methods to the target, required for the `pure` version
		  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
		  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
		  options.sham           - add a flag to not completely full polyfills
		  options.enumerable     - export as enumerable property
		  options.dontCallGetSet - prevent calling a getter on target
		  options.name           - the .name of the function if it does not match the key
		*/
		_export = function (options, source) {
		  var TARGET = options.target;
		  var GLOBAL = options.global;
		  var STATIC = options.stat;
		  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
		  if (GLOBAL) {
		    target = globalThis;
		  } else if (STATIC) {
		    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
		  } else {
		    target = globalThis[TARGET] && globalThis[TARGET].prototype;
		  }
		  if (target) for (key in source) {
		    sourceProperty = source[key];
		    if (options.dontCallGetSet) {
		      descriptor = getOwnPropertyDescriptor(target, key);
		      targetProperty = descriptor && descriptor.value;
		    } else targetProperty = target[key];
		    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
		    // contained in target
		    if (!FORCED && targetProperty !== undefined) {
		      if (typeof sourceProperty == typeof targetProperty) continue;
		      copyConstructorProperties(sourceProperty, targetProperty);
		    }
		    // add a flag to not completely full polyfills
		    if (options.sham || (targetProperty && targetProperty.sham)) {
		      createNonEnumerableProperty(sourceProperty, 'sham', true);
		    }
		    defineBuiltIn(target, key, sourceProperty, options);
		  }
		};
		return _export;
	}

	var isArray;
	var hasRequiredIsArray;

	function requireIsArray () {
		if (hasRequiredIsArray) return isArray;
		hasRequiredIsArray = 1;
		var classof = requireClassofRaw();

		// `IsArray` abstract operation
		// https://tc39.es/ecma262/#sec-isarray
		// eslint-disable-next-line es/no-array-isarray -- safe
		isArray = Array.isArray || function isArray(argument) {
		  return classof(argument) === 'Array';
		};
		return isArray;
	}

	var doesNotExceedSafeInteger;
	var hasRequiredDoesNotExceedSafeInteger;

	function requireDoesNotExceedSafeInteger () {
		if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
		hasRequiredDoesNotExceedSafeInteger = 1;
		var $TypeError = TypeError;
		var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

		doesNotExceedSafeInteger = function (it) {
		  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
		  return it;
		};
		return doesNotExceedSafeInteger;
	}

	var createProperty;
	var hasRequiredCreateProperty;

	function requireCreateProperty () {
		if (hasRequiredCreateProperty) return createProperty;
		hasRequiredCreateProperty = 1;
		var DESCRIPTORS = requireDescriptors();
		var definePropertyModule = requireObjectDefineProperty();
		var createPropertyDescriptor = requireCreatePropertyDescriptor();

		createProperty = function (object, key, value) {
		  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
		  else object[key] = value;
		};
		return createProperty;
	}

	var toStringTagSupport;
	var hasRequiredToStringTagSupport;

	function requireToStringTagSupport () {
		if (hasRequiredToStringTagSupport) return toStringTagSupport;
		hasRequiredToStringTagSupport = 1;
		var wellKnownSymbol = requireWellKnownSymbol();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');
		var test = {};

		test[TO_STRING_TAG] = 'z';

		toStringTagSupport = String(test) === '[object z]';
		return toStringTagSupport;
	}

	var classof;
	var hasRequiredClassof;

	function requireClassof () {
		if (hasRequiredClassof) return classof;
		hasRequiredClassof = 1;
		var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
		var isCallable = requireIsCallable();
		var classofRaw = requireClassofRaw();
		var wellKnownSymbol = requireWellKnownSymbol();

		var TO_STRING_TAG = wellKnownSymbol('toStringTag');
		var $Object = Object;

		// ES3 wrong here
		var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

		// fallback for IE11 Script Access Denied error
		var tryGet = function (it, key) {
		  try {
		    return it[key];
		  } catch (error) { /* empty */ }
		};

		// getting tag from ES6+ `Object.prototype.toString`
		classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
		  var O, tag, result;
		  return it === undefined ? 'Undefined' : it === null ? 'Null'
		    // @@toStringTag case
		    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
		    // builtinTag case
		    : CORRECT_ARGUMENTS ? classofRaw(O)
		    // ES3 arguments fallback
		    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
		};
		return classof;
	}

	var isConstructor;
	var hasRequiredIsConstructor;

	function requireIsConstructor () {
		if (hasRequiredIsConstructor) return isConstructor;
		hasRequiredIsConstructor = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var fails = requireFails();
		var isCallable = requireIsCallable();
		var classof = requireClassof();
		var getBuiltIn = requireGetBuiltIn();
		var inspectSource = requireInspectSource();

		var noop = function () { /* empty */ };
		var construct = getBuiltIn('Reflect', 'construct');
		var constructorRegExp = /^\s*(?:class|function)\b/;
		var exec = uncurryThis(constructorRegExp.exec);
		var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

		var isConstructorModern = function isConstructor(argument) {
		  if (!isCallable(argument)) return false;
		  try {
		    construct(noop, [], argument);
		    return true;
		  } catch (error) {
		    return false;
		  }
		};

		var isConstructorLegacy = function isConstructor(argument) {
		  if (!isCallable(argument)) return false;
		  switch (classof(argument)) {
		    case 'AsyncFunction':
		    case 'GeneratorFunction':
		    case 'AsyncGeneratorFunction': return false;
		  }
		  try {
		    // we can't check .prototype since constructors produced by .bind haven't it
		    // `Function#toString` throws on some built-it function in some legacy engines
		    // (for example, `DOMQuad` and similar in FF41-)
		    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
		  } catch (error) {
		    return true;
		  }
		};

		isConstructorLegacy.sham = true;

		// `IsConstructor` abstract operation
		// https://tc39.es/ecma262/#sec-isconstructor
		isConstructor = !construct || fails(function () {
		  var called;
		  return isConstructorModern(isConstructorModern.call)
		    || !isConstructorModern(Object)
		    || !isConstructorModern(function () { called = true; })
		    || called;
		}) ? isConstructorLegacy : isConstructorModern;
		return isConstructor;
	}

	var arraySpeciesConstructor;
	var hasRequiredArraySpeciesConstructor;

	function requireArraySpeciesConstructor () {
		if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
		hasRequiredArraySpeciesConstructor = 1;
		var isArray = requireIsArray();
		var isConstructor = requireIsConstructor();
		var isObject = requireIsObject();
		var wellKnownSymbol = requireWellKnownSymbol();

		var SPECIES = wellKnownSymbol('species');
		var $Array = Array;

		// a part of `ArraySpeciesCreate` abstract operation
		// https://tc39.es/ecma262/#sec-arrayspeciescreate
		arraySpeciesConstructor = function (originalArray) {
		  var C;
		  if (isArray(originalArray)) {
		    C = originalArray.constructor;
		    // cross-realm fallback
		    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
		    else if (isObject(C)) {
		      C = C[SPECIES];
		      if (C === null) C = undefined;
		    }
		  } return C === undefined ? $Array : C;
		};
		return arraySpeciesConstructor;
	}

	var arraySpeciesCreate;
	var hasRequiredArraySpeciesCreate;

	function requireArraySpeciesCreate () {
		if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
		hasRequiredArraySpeciesCreate = 1;
		var arraySpeciesConstructor = requireArraySpeciesConstructor();

		// `ArraySpeciesCreate` abstract operation
		// https://tc39.es/ecma262/#sec-arrayspeciescreate
		arraySpeciesCreate = function (originalArray, length) {
		  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
		};
		return arraySpeciesCreate;
	}

	var arrayMethodHasSpeciesSupport;
	var hasRequiredArrayMethodHasSpeciesSupport;

	function requireArrayMethodHasSpeciesSupport () {
		if (hasRequiredArrayMethodHasSpeciesSupport) return arrayMethodHasSpeciesSupport;
		hasRequiredArrayMethodHasSpeciesSupport = 1;
		var fails = requireFails();
		var wellKnownSymbol = requireWellKnownSymbol();
		var V8_VERSION = requireEnvironmentV8Version();

		var SPECIES = wellKnownSymbol('species');

		arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
		  // We can't use this feature detection in V8 since it causes
		  // deoptimization and serious performance degradation
		  // https://github.com/zloirock/core-js/issues/677
		  return V8_VERSION >= 51 || !fails(function () {
		    var array = [];
		    var constructor = array.constructor = {};
		    constructor[SPECIES] = function () {
		      return { foo: 1 };
		    };
		    return array[METHOD_NAME](Boolean).foo !== 1;
		  });
		};
		return arrayMethodHasSpeciesSupport;
	}

	var hasRequiredEs_array_concat;

	function requireEs_array_concat () {
		if (hasRequiredEs_array_concat) return es_array_concat;
		hasRequiredEs_array_concat = 1;
		var $ = require_export();
		var fails = requireFails();
		var isArray = requireIsArray();
		var isObject = requireIsObject();
		var toObject = requireToObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
		var createProperty = requireCreateProperty();
		var arraySpeciesCreate = requireArraySpeciesCreate();
		var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
		var wellKnownSymbol = requireWellKnownSymbol();
		var V8_VERSION = requireEnvironmentV8Version();

		var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

		// We can't use this feature detection in V8 since it causes
		// deoptimization and serious performance degradation
		// https://github.com/zloirock/core-js/issues/679
		var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
		  var array = [];
		  array[IS_CONCAT_SPREADABLE] = false;
		  return array.concat()[0] !== array;
		});

		var isConcatSpreadable = function (O) {
		  if (!isObject(O)) return false;
		  var spreadable = O[IS_CONCAT_SPREADABLE];
		  return spreadable !== undefined ? !!spreadable : isArray(O);
		};

		var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

		// `Array.prototype.concat` method
		// https://tc39.es/ecma262/#sec-array.prototype.concat
		// with adding support of @@isConcatSpreadable and @@species
		$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
		  // eslint-disable-next-line no-unused-vars -- required for `.length`
		  concat: function concat(arg) {
		    var O = toObject(this);
		    var A = arraySpeciesCreate(O, 0);
		    var n = 0;
		    var i, k, length, len, E;
		    for (i = -1, length = arguments.length; i < length; i++) {
		      E = i === -1 ? O : arguments[i];
		      if (isConcatSpreadable(E)) {
		        len = lengthOfArrayLike(E);
		        doesNotExceedSafeInteger(n + len);
		        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
		      } else {
		        doesNotExceedSafeInteger(n + 1);
		        createProperty(A, n++, E);
		      }
		    }
		    A.length = n;
		    return A;
		  }
		});
		return es_array_concat;
	}

	requireEs_array_concat();

	var es_array_indexOf = {};

	var functionUncurryThisClause;
	var hasRequiredFunctionUncurryThisClause;

	function requireFunctionUncurryThisClause () {
		if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
		hasRequiredFunctionUncurryThisClause = 1;
		var classofRaw = requireClassofRaw();
		var uncurryThis = requireFunctionUncurryThis();

		functionUncurryThisClause = function (fn) {
		  // Nashorn bug:
		  //   https://github.com/zloirock/core-js/issues/1128
		  //   https://github.com/zloirock/core-js/issues/1130
		  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
		};
		return functionUncurryThisClause;
	}

	var arrayMethodIsStrict;
	var hasRequiredArrayMethodIsStrict;

	function requireArrayMethodIsStrict () {
		if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
		hasRequiredArrayMethodIsStrict = 1;
		var fails = requireFails();

		arrayMethodIsStrict = function (METHOD_NAME, argument) {
		  var method = [][METHOD_NAME];
		  return !!method && fails(function () {
		    // eslint-disable-next-line no-useless-call -- required for testing
		    method.call(null, argument || function () { return 1; }, 1);
		  });
		};
		return arrayMethodIsStrict;
	}

	var hasRequiredEs_array_indexOf;

	function requireEs_array_indexOf () {
		if (hasRequiredEs_array_indexOf) return es_array_indexOf;
		hasRequiredEs_array_indexOf = 1;
		/* eslint-disable es/no-array-prototype-indexof -- required for testing */
		var $ = require_export();
		var uncurryThis = requireFunctionUncurryThisClause();
		var $indexOf = requireArrayIncludes().indexOf;
		var arrayMethodIsStrict = requireArrayMethodIsStrict();

		var nativeIndexOf = uncurryThis([].indexOf);

		var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
		var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

		// `Array.prototype.indexOf` method
		// https://tc39.es/ecma262/#sec-array.prototype.indexof
		$({ target: 'Array', proto: true, forced: FORCED }, {
		  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
		    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
		    return NEGATIVE_ZERO
		      // convert -0 to +0
		      ? nativeIndexOf(this, searchElement, fromIndex) || 0
		      : $indexOf(this, searchElement, fromIndex);
		  }
		});
		return es_array_indexOf;
	}

	requireEs_array_indexOf();

	var es_regexp_constructor = {};

	var functionUncurryThisAccessor;
	var hasRequiredFunctionUncurryThisAccessor;

	function requireFunctionUncurryThisAccessor () {
		if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
		hasRequiredFunctionUncurryThisAccessor = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var aCallable = requireACallable();

		functionUncurryThisAccessor = function (object, key, method) {
		  try {
		    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
		    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
		  } catch (error) { /* empty */ }
		};
		return functionUncurryThisAccessor;
	}

	var isPossiblePrototype;
	var hasRequiredIsPossiblePrototype;

	function requireIsPossiblePrototype () {
		if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
		hasRequiredIsPossiblePrototype = 1;
		var isObject = requireIsObject();

		isPossiblePrototype = function (argument) {
		  return isObject(argument) || argument === null;
		};
		return isPossiblePrototype;
	}

	var aPossiblePrototype;
	var hasRequiredAPossiblePrototype;

	function requireAPossiblePrototype () {
		if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
		hasRequiredAPossiblePrototype = 1;
		var isPossiblePrototype = requireIsPossiblePrototype();

		var $String = String;
		var $TypeError = TypeError;

		aPossiblePrototype = function (argument) {
		  if (isPossiblePrototype(argument)) return argument;
		  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
		};
		return aPossiblePrototype;
	}

	var objectSetPrototypeOf;
	var hasRequiredObjectSetPrototypeOf;

	function requireObjectSetPrototypeOf () {
		if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
		hasRequiredObjectSetPrototypeOf = 1;
		/* eslint-disable no-proto -- safe */
		var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
		var isObject = requireIsObject();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var aPossiblePrototype = requireAPossiblePrototype();

		// `Object.setPrototypeOf` method
		// https://tc39.es/ecma262/#sec-object.setprototypeof
		// Works with __proto__ only. Old v8 can't work with null proto objects.
		// eslint-disable-next-line es/no-object-setprototypeof -- safe
		objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
		  var CORRECT_SETTER = false;
		  var test = {};
		  var setter;
		  try {
		    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
		    setter(test, []);
		    CORRECT_SETTER = test instanceof Array;
		  } catch (error) { /* empty */ }
		  return function setPrototypeOf(O, proto) {
		    requireObjectCoercible(O);
		    aPossiblePrototype(proto);
		    if (!isObject(O)) return O;
		    if (CORRECT_SETTER) setter(O, proto);
		    else O.__proto__ = proto;
		    return O;
		  };
		}() : undefined);
		return objectSetPrototypeOf;
	}

	var inheritIfRequired;
	var hasRequiredInheritIfRequired;

	function requireInheritIfRequired () {
		if (hasRequiredInheritIfRequired) return inheritIfRequired;
		hasRequiredInheritIfRequired = 1;
		var isCallable = requireIsCallable();
		var isObject = requireIsObject();
		var setPrototypeOf = requireObjectSetPrototypeOf();

		// makes subclassing work correct for wrapped built-ins
		inheritIfRequired = function ($this, dummy, Wrapper) {
		  var NewTarget, NewTargetPrototype;
		  if (
		    // it can work only with native `setPrototypeOf`
		    setPrototypeOf &&
		    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
		    isCallable(NewTarget = dummy.constructor) &&
		    NewTarget !== Wrapper &&
		    isObject(NewTargetPrototype = NewTarget.prototype) &&
		    NewTargetPrototype !== Wrapper.prototype
		  ) setPrototypeOf($this, NewTargetPrototype);
		  return $this;
		};
		return inheritIfRequired;
	}

	var objectDefineProperties = {};

	var objectKeys;
	var hasRequiredObjectKeys;

	function requireObjectKeys () {
		if (hasRequiredObjectKeys) return objectKeys;
		hasRequiredObjectKeys = 1;
		var internalObjectKeys = requireObjectKeysInternal();
		var enumBugKeys = requireEnumBugKeys();

		// `Object.keys` method
		// https://tc39.es/ecma262/#sec-object.keys
		// eslint-disable-next-line es/no-object-keys -- safe
		objectKeys = Object.keys || function keys(O) {
		  return internalObjectKeys(O, enumBugKeys);
		};
		return objectKeys;
	}

	var hasRequiredObjectDefineProperties;

	function requireObjectDefineProperties () {
		if (hasRequiredObjectDefineProperties) return objectDefineProperties;
		hasRequiredObjectDefineProperties = 1;
		var DESCRIPTORS = requireDescriptors();
		var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
		var definePropertyModule = requireObjectDefineProperty();
		var anObject = requireAnObject();
		var toIndexedObject = requireToIndexedObject();
		var objectKeys = requireObjectKeys();

		// `Object.defineProperties` method
		// https://tc39.es/ecma262/#sec-object.defineproperties
		// eslint-disable-next-line es/no-object-defineproperties -- safe
		objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
		  anObject(O);
		  var props = toIndexedObject(Properties);
		  var keys = objectKeys(Properties);
		  var length = keys.length;
		  var index = 0;
		  var key;
		  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
		  return O;
		};
		return objectDefineProperties;
	}

	var html;
	var hasRequiredHtml;

	function requireHtml () {
		if (hasRequiredHtml) return html;
		hasRequiredHtml = 1;
		var getBuiltIn = requireGetBuiltIn();

		html = getBuiltIn('document', 'documentElement');
		return html;
	}

	var objectCreate;
	var hasRequiredObjectCreate;

	function requireObjectCreate () {
		if (hasRequiredObjectCreate) return objectCreate;
		hasRequiredObjectCreate = 1;
		/* global ActiveXObject -- old IE, WSH */
		var anObject = requireAnObject();
		var definePropertiesModule = requireObjectDefineProperties();
		var enumBugKeys = requireEnumBugKeys();
		var hiddenKeys = requireHiddenKeys();
		var html = requireHtml();
		var documentCreateElement = requireDocumentCreateElement();
		var sharedKey = requireSharedKey();

		var GT = '>';
		var LT = '<';
		var PROTOTYPE = 'prototype';
		var SCRIPT = 'script';
		var IE_PROTO = sharedKey('IE_PROTO');

		var EmptyConstructor = function () { /* empty */ };

		var scriptTag = function (content) {
		  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
		};

		// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
		var NullProtoObjectViaActiveX = function (activeXDocument) {
		  activeXDocument.write(scriptTag(''));
		  activeXDocument.close();
		  var temp = activeXDocument.parentWindow.Object;
		  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
		  activeXDocument = null;
		  return temp;
		};

		// Create object with fake `null` prototype: use iframe Object with cleared prototype
		var NullProtoObjectViaIFrame = function () {
		  // Thrash, waste and sodomy: IE GC bug
		  var iframe = documentCreateElement('iframe');
		  var JS = 'java' + SCRIPT + ':';
		  var iframeDocument;
		  iframe.style.display = 'none';
		  html.appendChild(iframe);
		  // https://github.com/zloirock/core-js/issues/475
		  iframe.src = String(JS);
		  iframeDocument = iframe.contentWindow.document;
		  iframeDocument.open();
		  iframeDocument.write(scriptTag('document.F=Object'));
		  iframeDocument.close();
		  return iframeDocument.F;
		};

		// Check for document.domain and active x support
		// No need to use active x approach when document.domain is not set
		// see https://github.com/es-shims/es5-shim/issues/150
		// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
		// avoid IE GC bug
		var activeXDocument;
		var NullProtoObject = function () {
		  try {
		    activeXDocument = new ActiveXObject('htmlfile');
		  } catch (error) { /* ignore */ }
		  NullProtoObject = typeof document != 'undefined'
		    ? document.domain && activeXDocument
		      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
		      : NullProtoObjectViaIFrame()
		    : NullProtoObjectViaActiveX(activeXDocument); // WSH
		  var length = enumBugKeys.length;
		  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
		  return NullProtoObject();
		};

		hiddenKeys[IE_PROTO] = true;

		// `Object.create` method
		// https://tc39.es/ecma262/#sec-object.create
		// eslint-disable-next-line es/no-object-create -- safe
		objectCreate = Object.create || function create(O, Properties) {
		  var result;
		  if (O !== null) {
		    EmptyConstructor[PROTOTYPE] = anObject(O);
		    result = new EmptyConstructor();
		    EmptyConstructor[PROTOTYPE] = null;
		    // add "__proto__" for Object.getPrototypeOf polyfill
		    result[IE_PROTO] = O;
		  } else result = NullProtoObject();
		  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
		};
		return objectCreate;
	}

	var isRegexp;
	var hasRequiredIsRegexp;

	function requireIsRegexp () {
		if (hasRequiredIsRegexp) return isRegexp;
		hasRequiredIsRegexp = 1;
		var isObject = requireIsObject();
		var classof = requireClassofRaw();
		var wellKnownSymbol = requireWellKnownSymbol();

		var MATCH = wellKnownSymbol('match');

		// `IsRegExp` abstract operation
		// https://tc39.es/ecma262/#sec-isregexp
		isRegexp = function (it) {
		  var isRegExp;
		  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
		};
		return isRegexp;
	}

	var toString;
	var hasRequiredToString;

	function requireToString () {
		if (hasRequiredToString) return toString;
		hasRequiredToString = 1;
		var classof = requireClassof();

		var $String = String;

		toString = function (argument) {
		  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
		  return $String(argument);
		};
		return toString;
	}

	var regexpFlags;
	var hasRequiredRegexpFlags;

	function requireRegexpFlags () {
		if (hasRequiredRegexpFlags) return regexpFlags;
		hasRequiredRegexpFlags = 1;
		var anObject = requireAnObject();

		// `RegExp.prototype.flags` getter implementation
		// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
		regexpFlags = function () {
		  var that = anObject(this);
		  var result = '';
		  if (that.hasIndices) result += 'd';
		  if (that.global) result += 'g';
		  if (that.ignoreCase) result += 'i';
		  if (that.multiline) result += 'm';
		  if (that.dotAll) result += 's';
		  if (that.unicode) result += 'u';
		  if (that.unicodeSets) result += 'v';
		  if (that.sticky) result += 'y';
		  return result;
		};
		return regexpFlags;
	}

	var regexpGetFlags;
	var hasRequiredRegexpGetFlags;

	function requireRegexpGetFlags () {
		if (hasRequiredRegexpGetFlags) return regexpGetFlags;
		hasRequiredRegexpGetFlags = 1;
		var call = requireFunctionCall();
		var hasOwn = requireHasOwnProperty();
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var regExpFlags = requireRegexpFlags();

		var RegExpPrototype = RegExp.prototype;

		regexpGetFlags = function (R) {
		  var flags = R.flags;
		  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
		    ? call(regExpFlags, R) : flags;
		};
		return regexpGetFlags;
	}

	var regexpStickyHelpers;
	var hasRequiredRegexpStickyHelpers;

	function requireRegexpStickyHelpers () {
		if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
		hasRequiredRegexpStickyHelpers = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		var UNSUPPORTED_Y = fails(function () {
		  var re = $RegExp('a', 'y');
		  re.lastIndex = 2;
		  return re.exec('abcd') !== null;
		});

		// UC Browser bug
		// https://github.com/zloirock/core-js/issues/1008
		var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
		  return !$RegExp('a', 'y').sticky;
		});

		var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
		  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
		  var re = $RegExp('^r', 'gy');
		  re.lastIndex = 2;
		  return re.exec('str') !== null;
		});

		regexpStickyHelpers = {
		  BROKEN_CARET: BROKEN_CARET,
		  MISSED_STICKY: MISSED_STICKY,
		  UNSUPPORTED_Y: UNSUPPORTED_Y
		};
		return regexpStickyHelpers;
	}

	var proxyAccessor;
	var hasRequiredProxyAccessor;

	function requireProxyAccessor () {
		if (hasRequiredProxyAccessor) return proxyAccessor;
		hasRequiredProxyAccessor = 1;
		var defineProperty = requireObjectDefineProperty().f;

		proxyAccessor = function (Target, Source, key) {
		  key in Target || defineProperty(Target, key, {
		    configurable: true,
		    get: function () { return Source[key]; },
		    set: function (it) { Source[key] = it; }
		  });
		};
		return proxyAccessor;
	}

	var defineBuiltInAccessor;
	var hasRequiredDefineBuiltInAccessor;

	function requireDefineBuiltInAccessor () {
		if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
		hasRequiredDefineBuiltInAccessor = 1;
		var makeBuiltIn = requireMakeBuiltIn();
		var defineProperty = requireObjectDefineProperty();

		defineBuiltInAccessor = function (target, name, descriptor) {
		  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
		  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
		  return defineProperty.f(target, name, descriptor);
		};
		return defineBuiltInAccessor;
	}

	var setSpecies;
	var hasRequiredSetSpecies;

	function requireSetSpecies () {
		if (hasRequiredSetSpecies) return setSpecies;
		hasRequiredSetSpecies = 1;
		var getBuiltIn = requireGetBuiltIn();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var wellKnownSymbol = requireWellKnownSymbol();
		var DESCRIPTORS = requireDescriptors();

		var SPECIES = wellKnownSymbol('species');

		setSpecies = function (CONSTRUCTOR_NAME) {
		  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

		  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
		    defineBuiltInAccessor(Constructor, SPECIES, {
		      configurable: true,
		      get: function () { return this; }
		    });
		  }
		};
		return setSpecies;
	}

	var regexpUnsupportedDotAll;
	var hasRequiredRegexpUnsupportedDotAll;

	function requireRegexpUnsupportedDotAll () {
		if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
		hasRequiredRegexpUnsupportedDotAll = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		regexpUnsupportedDotAll = fails(function () {
		  var re = $RegExp('.', 's');
		  return !(re.dotAll && re.test('\n') && re.flags === 's');
		});
		return regexpUnsupportedDotAll;
	}

	var regexpUnsupportedNcg;
	var hasRequiredRegexpUnsupportedNcg;

	function requireRegexpUnsupportedNcg () {
		if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
		hasRequiredRegexpUnsupportedNcg = 1;
		var fails = requireFails();
		var globalThis = requireGlobalThis();

		// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
		var $RegExp = globalThis.RegExp;

		regexpUnsupportedNcg = fails(function () {
		  var re = $RegExp('(?<a>b)', 'g');
		  return re.exec('b').groups.a !== 'b' ||
		    'b'.replace(re, '$<a>c') !== 'bc';
		});
		return regexpUnsupportedNcg;
	}

	var hasRequiredEs_regexp_constructor;

	function requireEs_regexp_constructor () {
		if (hasRequiredEs_regexp_constructor) return es_regexp_constructor;
		hasRequiredEs_regexp_constructor = 1;
		var DESCRIPTORS = requireDescriptors();
		var globalThis = requireGlobalThis();
		var uncurryThis = requireFunctionUncurryThis();
		var isForced = requireIsForced();
		var inheritIfRequired = requireInheritIfRequired();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
		var create = requireObjectCreate();
		var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
		var isPrototypeOf = requireObjectIsPrototypeOf();
		var isRegExp = requireIsRegexp();
		var toString = requireToString();
		var getRegExpFlags = requireRegexpGetFlags();
		var stickyHelpers = requireRegexpStickyHelpers();
		var proxyAccessor = requireProxyAccessor();
		var defineBuiltIn = requireDefineBuiltIn();
		var fails = requireFails();
		var hasOwn = requireHasOwnProperty();
		var enforceInternalState = requireInternalState().enforce;
		var setSpecies = requireSetSpecies();
		var wellKnownSymbol = requireWellKnownSymbol();
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

		var MATCH = wellKnownSymbol('match');
		var NativeRegExp = globalThis.RegExp;
		var RegExpPrototype = NativeRegExp.prototype;
		var SyntaxError = globalThis.SyntaxError;
		var exec = uncurryThis(RegExpPrototype.exec);
		var charAt = uncurryThis(''.charAt);
		var replace = uncurryThis(''.replace);
		var stringIndexOf = uncurryThis(''.indexOf);
		var stringSlice = uncurryThis(''.slice);
		// TODO: Use only proper RegExpIdentifierName
		var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
		var re1 = /a/g;
		var re2 = /a/g;

		// "new" should create a new object, old webkit bug
		var CORRECT_NEW = new NativeRegExp(re1) !== re1;

		var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
		var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

		var BASE_FORCED = DESCRIPTORS &&
		  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
		    re2[MATCH] = false;
		    // RegExp constructor can alter flags and IsRegExp works correct with @@match
		    // eslint-disable-next-line sonar/inconsistent-function-call -- required for testing
		    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
		  }));

		var handleDotAll = function (string) {
		  var length = string.length;
		  var index = 0;
		  var result = '';
		  var brackets = false;
		  var chr;
		  for (; index <= length; index++) {
		    chr = charAt(string, index);
		    if (chr === '\\') {
		      result += chr + charAt(string, ++index);
		      continue;
		    }
		    if (!brackets && chr === '.') {
		      result += '[\\s\\S]';
		    } else {
		      if (chr === '[') {
		        brackets = true;
		      } else if (chr === ']') {
		        brackets = false;
		      } result += chr;
		    }
		  } return result;
		};

		var handleNCG = function (string) {
		  var length = string.length;
		  var index = 0;
		  var result = '';
		  var named = [];
		  var names = create(null);
		  var brackets = false;
		  var ncg = false;
		  var groupid = 0;
		  var groupname = '';
		  var chr;
		  for (; index <= length; index++) {
		    chr = charAt(string, index);
		    if (chr === '\\') {
		      chr += charAt(string, ++index);
		    } else if (chr === ']') {
		      brackets = false;
		    } else if (!brackets) switch (true) {
		      case chr === '[':
		        brackets = true;
		        break;
		      case chr === '(':
		        result += chr;
		        // ignore non-capturing groups
		        if (stringSlice(string, index + 1, index + 3) === '?:') {
		          continue;
		        }
		        if (exec(IS_NCG, stringSlice(string, index + 1))) {
		          index += 2;
		          ncg = true;
		        }
		        groupid++;
		        continue;
		      case chr === '>' && ncg:
		        if (groupname === '' || hasOwn(names, groupname)) {
		          throw new SyntaxError('Invalid capture group name');
		        }
		        names[groupname] = true;
		        named[named.length] = [groupname, groupid];
		        ncg = false;
		        groupname = '';
		        continue;
		    }
		    if (ncg) groupname += chr;
		    else result += chr;
		  } return [result, named];
		};

		// `RegExp` constructor
		// https://tc39.es/ecma262/#sec-regexp-constructor
		if (isForced('RegExp', BASE_FORCED)) {
		  var RegExpWrapper = function RegExp(pattern, flags) {
		    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
		    var patternIsRegExp = isRegExp(pattern);
		    var flagsAreUndefined = flags === undefined;
		    var groups = [];
		    var rawPattern = pattern;
		    var rawFlags, dotAll, sticky, handled, result, state;

		    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
		      return pattern;
		    }

		    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
		      pattern = pattern.source;
		      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
		    }

		    pattern = pattern === undefined ? '' : toString(pattern);
		    flags = flags === undefined ? '' : toString(flags);
		    rawPattern = pattern;

		    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
		      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
		      if (dotAll) flags = replace(flags, /s/g, '');
		    }

		    rawFlags = flags;

		    if (MISSED_STICKY && 'sticky' in re1) {
		      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
		      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
		    }

		    if (UNSUPPORTED_NCG) {
		      handled = handleNCG(pattern);
		      pattern = handled[0];
		      groups = handled[1];
		    }

		    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

		    if (dotAll || sticky || groups.length) {
		      state = enforceInternalState(result);
		      if (dotAll) {
		        state.dotAll = true;
		        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
		      }
		      if (sticky) state.sticky = true;
		      if (groups.length) state.groups = groups;
		    }

		    if (pattern !== rawPattern) try {
		      // fails in old engines, but we have no alternatives for unsupported regex syntax
		      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
		    } catch (error) { /* empty */ }

		    return result;
		  };

		  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
		    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
		  }

		  RegExpPrototype.constructor = RegExpWrapper;
		  RegExpWrapper.prototype = RegExpPrototype;
		  defineBuiltIn(globalThis, 'RegExp', RegExpWrapper, { constructor: true });
		}

		// https://tc39.es/ecma262/#sec-get-regexp-@@species
		setSpecies('RegExp');
		return es_regexp_constructor;
	}

	requireEs_regexp_constructor();

	var es_regexp_dotAll = {};

	var hasRequiredEs_regexp_dotAll;

	function requireEs_regexp_dotAll () {
		if (hasRequiredEs_regexp_dotAll) return es_regexp_dotAll;
		hasRequiredEs_regexp_dotAll = 1;
		var DESCRIPTORS = requireDescriptors();
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var classof = requireClassofRaw();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var getInternalState = requireInternalState().get;

		var RegExpPrototype = RegExp.prototype;
		var $TypeError = TypeError;

		// `RegExp.prototype.dotAll` getter
		// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
		if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
		  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
		    configurable: true,
		    get: function dotAll() {
		      if (this === RegExpPrototype) return;
		      // We can't use InternalStateModule.getterFor because
		      // we don't add metadata for regexps created by a literal.
		      if (classof(this) === 'RegExp') {
		        return !!getInternalState(this).dotAll;
		      }
		      throw new $TypeError('Incompatible receiver, RegExp required');
		    }
		  });
		}
		return es_regexp_dotAll;
	}

	requireEs_regexp_dotAll();

	var es_regexp_exec = {};

	var regexpExec;
	var hasRequiredRegexpExec;

	function requireRegexpExec () {
		if (hasRequiredRegexpExec) return regexpExec;
		hasRequiredRegexpExec = 1;
		/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
		/* eslint-disable regexp/no-useless-quantifier -- testing */
		var call = requireFunctionCall();
		var uncurryThis = requireFunctionUncurryThis();
		var toString = requireToString();
		var regexpFlags = requireRegexpFlags();
		var stickyHelpers = requireRegexpStickyHelpers();
		var shared = requireShared();
		var create = requireObjectCreate();
		var getInternalState = requireInternalState().get;
		var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
		var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

		var nativeReplace = shared('native-string-replace', String.prototype.replace);
		var nativeExec = RegExp.prototype.exec;
		var patchedExec = nativeExec;
		var charAt = uncurryThis(''.charAt);
		var indexOf = uncurryThis(''.indexOf);
		var replace = uncurryThis(''.replace);
		var stringSlice = uncurryThis(''.slice);

		var UPDATES_LAST_INDEX_WRONG = (function () {
		  var re1 = /a/;
		  var re2 = /b*/g;
		  call(nativeExec, re1, 'a');
		  call(nativeExec, re2, 'a');
		  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
		})();

		var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

		// nonparticipating capturing group, copied from es5-shim's String#split patch.
		var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

		var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

		if (PATCH) {
		  patchedExec = function exec(string) {
		    var re = this;
		    var state = getInternalState(re);
		    var str = toString(string);
		    var raw = state.raw;
		    var result, reCopy, lastIndex, match, i, object, group;

		    if (raw) {
		      raw.lastIndex = re.lastIndex;
		      result = call(patchedExec, raw, str);
		      re.lastIndex = raw.lastIndex;
		      return result;
		    }

		    var groups = state.groups;
		    var sticky = UNSUPPORTED_Y && re.sticky;
		    var flags = call(regexpFlags, re);
		    var source = re.source;
		    var charsAdded = 0;
		    var strCopy = str;

		    if (sticky) {
		      flags = replace(flags, 'y', '');
		      if (indexOf(flags, 'g') === -1) {
		        flags += 'g';
		      }

		      strCopy = stringSlice(str, re.lastIndex);
		      // Support anchored sticky behavior.
		      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
		        source = '(?: ' + source + ')';
		        strCopy = ' ' + strCopy;
		        charsAdded++;
		      }
		      // ^(? + rx + ) is needed, in combination with some str slicing, to
		      // simulate the 'y' flag.
		      reCopy = new RegExp('^(?:' + source + ')', flags);
		    }

		    if (NPCG_INCLUDED) {
		      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
		    }
		    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

		    match = call(nativeExec, sticky ? reCopy : re, strCopy);

		    if (sticky) {
		      if (match) {
		        match.input = stringSlice(match.input, charsAdded);
		        match[0] = stringSlice(match[0], charsAdded);
		        match.index = re.lastIndex;
		        re.lastIndex += match[0].length;
		      } else re.lastIndex = 0;
		    } else if (UPDATES_LAST_INDEX_WRONG && match) {
		      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
		    }
		    if (NPCG_INCLUDED && match && match.length > 1) {
		      // Fix browsers whose `exec` methods don't consistently return `undefined`
		      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
		      call(nativeReplace, match[0], reCopy, function () {
		        for (i = 1; i < arguments.length - 2; i++) {
		          if (arguments[i] === undefined) match[i] = undefined;
		        }
		      });
		    }

		    if (match && groups) {
		      match.groups = object = create(null);
		      for (i = 0; i < groups.length; i++) {
		        group = groups[i];
		        object[group[0]] = match[group[1]];
		      }
		    }

		    return match;
		  };
		}

		regexpExec = patchedExec;
		return regexpExec;
	}

	var hasRequiredEs_regexp_exec;

	function requireEs_regexp_exec () {
		if (hasRequiredEs_regexp_exec) return es_regexp_exec;
		hasRequiredEs_regexp_exec = 1;
		var $ = require_export();
		var exec = requireRegexpExec();

		// `RegExp.prototype.exec` method
		// https://tc39.es/ecma262/#sec-regexp.prototype.exec
		$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
		  exec: exec
		});
		return es_regexp_exec;
	}

	requireEs_regexp_exec();

	var es_regexp_sticky = {};

	var hasRequiredEs_regexp_sticky;

	function requireEs_regexp_sticky () {
		if (hasRequiredEs_regexp_sticky) return es_regexp_sticky;
		hasRequiredEs_regexp_sticky = 1;
		var DESCRIPTORS = requireDescriptors();
		var MISSED_STICKY = requireRegexpStickyHelpers().MISSED_STICKY;
		var classof = requireClassofRaw();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var getInternalState = requireInternalState().get;

		var RegExpPrototype = RegExp.prototype;
		var $TypeError = TypeError;

		// `RegExp.prototype.sticky` getter
		// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
		if (DESCRIPTORS && MISSED_STICKY) {
		  defineBuiltInAccessor(RegExpPrototype, 'sticky', {
		    configurable: true,
		    get: function sticky() {
		      if (this === RegExpPrototype) return;
		      // We can't use InternalStateModule.getterFor because
		      // we don't add metadata for regexps created by a literal.
		      if (classof(this) === 'RegExp') {
		        return !!getInternalState(this).sticky;
		      }
		      throw new $TypeError('Incompatible receiver, RegExp required');
		    }
		  });
		}
		return es_regexp_sticky;
	}

	requireEs_regexp_sticky();

	var es_regexp_toString = {};

	var hasRequiredEs_regexp_toString;

	function requireEs_regexp_toString () {
		if (hasRequiredEs_regexp_toString) return es_regexp_toString;
		hasRequiredEs_regexp_toString = 1;
		var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
		var defineBuiltIn = requireDefineBuiltIn();
		var anObject = requireAnObject();
		var $toString = requireToString();
		var fails = requireFails();
		var getRegExpFlags = requireRegexpGetFlags();

		var TO_STRING = 'toString';
		var RegExpPrototype = RegExp.prototype;
		var nativeToString = RegExpPrototype[TO_STRING];

		var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
		// FF44- RegExp#toString has a wrong name
		var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

		// `RegExp.prototype.toString` method
		// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
		if (NOT_GENERIC || INCORRECT_NAME) {
		  defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
		    var R = anObject(this);
		    var pattern = $toString(R.source);
		    var flags = $toString(getRegExpFlags(R));
		    return '/' + pattern + '/' + flags;
		  }, { unsafe: true });
		}
		return es_regexp_toString;
	}

	requireEs_regexp_toString();

	var es_string_match = {};

	var fixRegexpWellKnownSymbolLogic;
	var hasRequiredFixRegexpWellKnownSymbolLogic;

	function requireFixRegexpWellKnownSymbolLogic () {
		if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
		hasRequiredFixRegexpWellKnownSymbolLogic = 1;
		// TODO: Remove from `core-js@4` since it's moved to entry points
		requireEs_regexp_exec();
		var call = requireFunctionCall();
		var defineBuiltIn = requireDefineBuiltIn();
		var regexpExec = requireRegexpExec();
		var fails = requireFails();
		var wellKnownSymbol = requireWellKnownSymbol();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

		var SPECIES = wellKnownSymbol('species');
		var RegExpPrototype = RegExp.prototype;

		fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
		  var SYMBOL = wellKnownSymbol(KEY);

		  var DELEGATES_TO_SYMBOL = !fails(function () {
		    // String methods call symbol-named RegExp methods
		    var O = {};
		    O[SYMBOL] = function () { return 7; };
		    return ''[KEY](O) !== 7;
		  });

		  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
		    // Symbol-named RegExp methods call .exec
		    var execCalled = false;
		    var re = /a/;

		    if (KEY === 'split') {
		      // We can't use real regex here since it causes deoptimization
		      // and serious performance degradation in V8
		      // https://github.com/zloirock/core-js/issues/306
		      re = {};
		      // RegExp[@@split] doesn't call the regex's exec method, but first creates
		      // a new one. We need to return the patched regex when creating the new one.
		      re.constructor = {};
		      re.constructor[SPECIES] = function () { return re; };
		      re.flags = '';
		      re[SYMBOL] = /./[SYMBOL];
		    }

		    re.exec = function () {
		      execCalled = true;
		      return null;
		    };

		    re[SYMBOL]('');
		    return !execCalled;
		  });

		  if (
		    !DELEGATES_TO_SYMBOL ||
		    !DELEGATES_TO_EXEC ||
		    FORCED
		  ) {
		    var nativeRegExpMethod = /./[SYMBOL];
		    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
		      var $exec = regexp.exec;
		      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
		        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
		          // The native String method already delegates to @@method (this
		          // polyfilled function), leasing to infinite recursion.
		          // We avoid it by directly calling the native @@method method.
		          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
		        }
		        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
		      }
		      return { done: false };
		    });

		    defineBuiltIn(String.prototype, KEY, methods[0]);
		    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
		  }

		  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
		};
		return fixRegexpWellKnownSymbolLogic;
	}

	var stringMultibyte;
	var hasRequiredStringMultibyte;

	function requireStringMultibyte () {
		if (hasRequiredStringMultibyte) return stringMultibyte;
		hasRequiredStringMultibyte = 1;
		var uncurryThis = requireFunctionUncurryThis();
		var toIntegerOrInfinity = requireToIntegerOrInfinity();
		var toString = requireToString();
		var requireObjectCoercible = requireRequireObjectCoercible();

		var charAt = uncurryThis(''.charAt);
		var charCodeAt = uncurryThis(''.charCodeAt);
		var stringSlice = uncurryThis(''.slice);

		var createMethod = function (CONVERT_TO_STRING) {
		  return function ($this, pos) {
		    var S = toString(requireObjectCoercible($this));
		    var position = toIntegerOrInfinity(pos);
		    var size = S.length;
		    var first, second;
		    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
		    first = charCodeAt(S, position);
		    return first < 0xD800 || first > 0xDBFF || position + 1 === size
		      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
		        ? CONVERT_TO_STRING
		          ? charAt(S, position)
		          : first
		        : CONVERT_TO_STRING
		          ? stringSlice(S, position, position + 2)
		          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
		  };
		};

		stringMultibyte = {
		  // `String.prototype.codePointAt` method
		  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
		  codeAt: createMethod(false),
		  // `String.prototype.at` method
		  // https://github.com/mathiasbynens/String.prototype.at
		  charAt: createMethod(true)
		};
		return stringMultibyte;
	}

	var advanceStringIndex;
	var hasRequiredAdvanceStringIndex;

	function requireAdvanceStringIndex () {
		if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
		hasRequiredAdvanceStringIndex = 1;
		var charAt = requireStringMultibyte().charAt;

		// `AdvanceStringIndex` abstract operation
		// https://tc39.es/ecma262/#sec-advancestringindex
		advanceStringIndex = function (S, index, unicode) {
		  return index + (unicode ? charAt(S, index).length : 1);
		};
		return advanceStringIndex;
	}

	var regexpExecAbstract;
	var hasRequiredRegexpExecAbstract;

	function requireRegexpExecAbstract () {
		if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
		hasRequiredRegexpExecAbstract = 1;
		var call = requireFunctionCall();
		var anObject = requireAnObject();
		var isCallable = requireIsCallable();
		var classof = requireClassofRaw();
		var regexpExec = requireRegexpExec();

		var $TypeError = TypeError;

		// `RegExpExec` abstract operation
		// https://tc39.es/ecma262/#sec-regexpexec
		regexpExecAbstract = function (R, S) {
		  var exec = R.exec;
		  if (isCallable(exec)) {
		    var result = call(exec, R, S);
		    if (result !== null) anObject(result);
		    return result;
		  }
		  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
		  throw new $TypeError('RegExp#exec called on incompatible receiver');
		};
		return regexpExecAbstract;
	}

	var hasRequiredEs_string_match;

	function requireEs_string_match () {
		if (hasRequiredEs_string_match) return es_string_match;
		hasRequiredEs_string_match = 1;
		var call = requireFunctionCall();
		var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
		var anObject = requireAnObject();
		var isNullOrUndefined = requireIsNullOrUndefined();
		var toLength = requireToLength();
		var toString = requireToString();
		var requireObjectCoercible = requireRequireObjectCoercible();
		var getMethod = requireGetMethod();
		var advanceStringIndex = requireAdvanceStringIndex();
		var regExpExec = requireRegexpExecAbstract();

		// @@match logic
		fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
		  return [
		    // `String.prototype.match` method
		    // https://tc39.es/ecma262/#sec-string.prototype.match
		    function match(regexp) {
		      var O = requireObjectCoercible(this);
		      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
		      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
		    },
		    // `RegExp.prototype[@@match]` method
		    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
		    function (string) {
		      var rx = anObject(this);
		      var S = toString(string);
		      var res = maybeCallNative(nativeMatch, rx, S);

		      if (res.done) return res.value;

		      if (!rx.global) return regExpExec(rx, S);

		      var fullUnicode = rx.unicode;
		      rx.lastIndex = 0;
		      var A = [];
		      var n = 0;
		      var result;
		      while ((result = regExpExec(rx, S)) !== null) {
		        var matchStr = toString(result[0]);
		        A[n] = matchStr;
		        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
		        n++;
		      }
		      return n === 0 ? null : A;
		    }
		  ];
		});
		return es_string_match;
	}

	requireEs_string_match();

	function compileToFunctions(template) {
	  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
	  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
	  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
	  var startTagOpen = new RegExp("^<".concat(qnameCapture));
	  var startTagClose = /^\s*(\/?)>/;
	  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
	  parseHtml(template);
	  function start(tagName, attrs) {
	    console.log(tagName, attrs, '开始标签');
	  }
	  function end(tagName, attrs) {
	    console.log(tagName, attrs, '结束标签');
	  }
	  function chars(text) {
	    console.log(text, '文本');
	  }
	  function parseHtml(html) {
	    while (html) {
	      var textEnd = html.indexOf('<');
	      // 是开始标签
	      if (textEnd == 0) {
	        // 解析开始标签
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          start(startTagMatch.tagName, startTagMatch.attrs);
	          continue;
	        }
	      }

	      // 解析结束标签
	      var endTagMatch = html.match(endTag);
	      if (endTagMatch) {
	        advance(endTagMatch[0].length);
	        end(endTagMatch[1]);
	        // parseEndTag(endTagMatch[1])
	        continue;
	      }
	      var text = void 0;
	      if (textEnd > 0) {
	        //是文本
	        text = html.substring(0, textEnd);
	      }
	      if (text) {
	        advance(text.length);
	        chars(text);
	      }
	    }
	    function advance(n) {
	      // 截掉已经解析的字符
	      html = html.substring(n);
	    }
	    function parseStartTag() {
	      var start = html.match(startTagOpen);
	      if (start) {
	        var match = {
	          tagName: start[1],
	          attrs: []
	        };
	        advance(start[0].length);
	        var _end;
	        var attrs;
	        // 不是关闭字符 > /> 并且匹配到了属性
	        while (!(_end = html.match(startTagClose)) && (attrs = html.match(attribute))) {
	          match.attrs = {
	            name: attrs[1],
	            value: attrs[3] || attrs[4] || attrs[5]
	          };
	          advance(attrs[0].length);
	        }
	        if (_end) {
	          advance(_end[0].length);
	          return match;
	        }
	      }
	    }
	  }
	}

	var es_array_forEach = {};

	var functionBindContext;
	var hasRequiredFunctionBindContext;

	function requireFunctionBindContext () {
		if (hasRequiredFunctionBindContext) return functionBindContext;
		hasRequiredFunctionBindContext = 1;
		var uncurryThis = requireFunctionUncurryThisClause();
		var aCallable = requireACallable();
		var NATIVE_BIND = requireFunctionBindNative();

		var bind = uncurryThis(uncurryThis.bind);

		// optional / simple context binding
		functionBindContext = function (fn, that) {
		  aCallable(fn);
		  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
		    return fn.apply(that, arguments);
		  };
		};
		return functionBindContext;
	}

	var arrayIteration;
	var hasRequiredArrayIteration;

	function requireArrayIteration () {
		if (hasRequiredArrayIteration) return arrayIteration;
		hasRequiredArrayIteration = 1;
		var bind = requireFunctionBindContext();
		var uncurryThis = requireFunctionUncurryThis();
		var IndexedObject = requireIndexedObject();
		var toObject = requireToObject();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var arraySpeciesCreate = requireArraySpeciesCreate();

		var push = uncurryThis([].push);

		// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
		var createMethod = function (TYPE) {
		  var IS_MAP = TYPE === 1;
		  var IS_FILTER = TYPE === 2;
		  var IS_SOME = TYPE === 3;
		  var IS_EVERY = TYPE === 4;
		  var IS_FIND_INDEX = TYPE === 6;
		  var IS_FILTER_REJECT = TYPE === 7;
		  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
		  return function ($this, callbackfn, that, specificCreate) {
		    var O = toObject($this);
		    var self = IndexedObject(O);
		    var length = lengthOfArrayLike(self);
		    var boundFunction = bind(callbackfn, that);
		    var index = 0;
		    var create = specificCreate || arraySpeciesCreate;
		    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
		    var value, result;
		    for (;length > index; index++) if (NO_HOLES || index in self) {
		      value = self[index];
		      result = boundFunction(value, index, O);
		      if (TYPE) {
		        if (IS_MAP) target[index] = result; // map
		        else if (result) switch (TYPE) {
		          case 3: return true;              // some
		          case 5: return value;             // find
		          case 6: return index;             // findIndex
		          case 2: push(target, value);      // filter
		        } else switch (TYPE) {
		          case 4: return false;             // every
		          case 7: push(target, value);      // filterReject
		        }
		      }
		    }
		    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
		  };
		};

		arrayIteration = {
		  // `Array.prototype.forEach` method
		  // https://tc39.es/ecma262/#sec-array.prototype.foreach
		  forEach: createMethod(0),
		  // `Array.prototype.map` method
		  // https://tc39.es/ecma262/#sec-array.prototype.map
		  map: createMethod(1),
		  // `Array.prototype.filter` method
		  // https://tc39.es/ecma262/#sec-array.prototype.filter
		  filter: createMethod(2),
		  // `Array.prototype.some` method
		  // https://tc39.es/ecma262/#sec-array.prototype.some
		  some: createMethod(3),
		  // `Array.prototype.every` method
		  // https://tc39.es/ecma262/#sec-array.prototype.every
		  every: createMethod(4),
		  // `Array.prototype.find` method
		  // https://tc39.es/ecma262/#sec-array.prototype.find
		  find: createMethod(5),
		  // `Array.prototype.findIndex` method
		  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
		  findIndex: createMethod(6),
		  // `Array.prototype.filterReject` method
		  // https://github.com/tc39/proposal-array-filtering
		  filterReject: createMethod(7)
		};
		return arrayIteration;
	}

	var arrayForEach;
	var hasRequiredArrayForEach;

	function requireArrayForEach () {
		if (hasRequiredArrayForEach) return arrayForEach;
		hasRequiredArrayForEach = 1;
		var $forEach = requireArrayIteration().forEach;
		var arrayMethodIsStrict = requireArrayMethodIsStrict();

		var STRICT_METHOD = arrayMethodIsStrict('forEach');

		// `Array.prototype.forEach` method implementation
		// https://tc39.es/ecma262/#sec-array.prototype.foreach
		arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
		  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		// eslint-disable-next-line es/no-array-prototype-foreach -- safe
		} : [].forEach;
		return arrayForEach;
	}

	var hasRequiredEs_array_forEach;

	function requireEs_array_forEach () {
		if (hasRequiredEs_array_forEach) return es_array_forEach;
		hasRequiredEs_array_forEach = 1;
		var $ = require_export();
		var forEach = requireArrayForEach();

		// `Array.prototype.forEach` method
		// https://tc39.es/ecma262/#sec-array.prototype.foreach
		// eslint-disable-next-line es/no-array-prototype-foreach -- safe
		$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
		  forEach: forEach
		});
		return es_array_forEach;
	}

	requireEs_array_forEach();

	var es_object_defineProperty = {};

	var hasRequiredEs_object_defineProperty;

	function requireEs_object_defineProperty () {
		if (hasRequiredEs_object_defineProperty) return es_object_defineProperty;
		hasRequiredEs_object_defineProperty = 1;
		var $ = require_export();
		var DESCRIPTORS = requireDescriptors();
		var defineProperty = requireObjectDefineProperty().f;

		// `Object.defineProperty` method
		// https://tc39.es/ecma262/#sec-object.defineproperty
		// eslint-disable-next-line es/no-object-defineproperty -- safe
		$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
		  defineProperty: defineProperty
		});
		return es_object_defineProperty;
	}

	requireEs_object_defineProperty();

	var es_object_keys = {};

	var hasRequiredEs_object_keys;

	function requireEs_object_keys () {
		if (hasRequiredEs_object_keys) return es_object_keys;
		hasRequiredEs_object_keys = 1;
		var $ = require_export();
		var toObject = requireToObject();
		var nativeKeys = requireObjectKeys();
		var fails = requireFails();

		var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

		// `Object.keys` method
		// https://tc39.es/ecma262/#sec-object.keys
		$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
		  keys: function keys(it) {
		    return nativeKeys(toObject(it));
		  }
		});
		return es_object_keys;
	}

	requireEs_object_keys();

	var es_object_toString = {};

	var objectToString;
	var hasRequiredObjectToString;

	function requireObjectToString () {
		if (hasRequiredObjectToString) return objectToString;
		hasRequiredObjectToString = 1;
		var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
		var classof = requireClassof();

		// `Object.prototype.toString` method implementation
		// https://tc39.es/ecma262/#sec-object.prototype.tostring
		objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
		  return '[object ' + classof(this) + ']';
		};
		return objectToString;
	}

	var hasRequiredEs_object_toString;

	function requireEs_object_toString () {
		if (hasRequiredEs_object_toString) return es_object_toString;
		hasRequiredEs_object_toString = 1;
		var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
		var defineBuiltIn = requireDefineBuiltIn();
		var toString = requireObjectToString();

		// `Object.prototype.toString` method
		// https://tc39.es/ecma262/#sec-object.prototype.tostring
		if (!TO_STRING_TAG_SUPPORT) {
		  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
		}
		return es_object_toString;
	}

	requireEs_object_toString();

	var web_domCollections_forEach = {};

	var domIterables;
	var hasRequiredDomIterables;

	function requireDomIterables () {
		if (hasRequiredDomIterables) return domIterables;
		hasRequiredDomIterables = 1;
		// iterable DOM collections
		// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
		domIterables = {
		  CSSRuleList: 0,
		  CSSStyleDeclaration: 0,
		  CSSValueList: 0,
		  ClientRectList: 0,
		  DOMRectList: 0,
		  DOMStringList: 0,
		  DOMTokenList: 1,
		  DataTransferItemList: 0,
		  FileList: 0,
		  HTMLAllCollection: 0,
		  HTMLCollection: 0,
		  HTMLFormElement: 0,
		  HTMLSelectElement: 0,
		  MediaList: 0,
		  MimeTypeArray: 0,
		  NamedNodeMap: 0,
		  NodeList: 1,
		  PaintRequestList: 0,
		  Plugin: 0,
		  PluginArray: 0,
		  SVGLengthList: 0,
		  SVGNumberList: 0,
		  SVGPathSegList: 0,
		  SVGPointList: 0,
		  SVGStringList: 0,
		  SVGTransformList: 0,
		  SourceBufferList: 0,
		  StyleSheetList: 0,
		  TextTrackCueList: 0,
		  TextTrackList: 0,
		  TouchList: 0
		};
		return domIterables;
	}

	var domTokenListPrototype;
	var hasRequiredDomTokenListPrototype;

	function requireDomTokenListPrototype () {
		if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
		hasRequiredDomTokenListPrototype = 1;
		// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
		var documentCreateElement = requireDocumentCreateElement();

		var classList = documentCreateElement('span').classList;
		var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

		domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
		return domTokenListPrototype;
	}

	var hasRequiredWeb_domCollections_forEach;

	function requireWeb_domCollections_forEach () {
		if (hasRequiredWeb_domCollections_forEach) return web_domCollections_forEach;
		hasRequiredWeb_domCollections_forEach = 1;
		var globalThis = requireGlobalThis();
		var DOMIterables = requireDomIterables();
		var DOMTokenListPrototype = requireDomTokenListPrototype();
		var forEach = requireArrayForEach();
		var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

		var handlePrototype = function (CollectionPrototype) {
		  // some Chrome versions have non-configurable methods on DOMTokenList
		  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
		    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
		  } catch (error) {
		    CollectionPrototype.forEach = forEach;
		  }
		};

		for (var COLLECTION_NAME in DOMIterables) {
		  if (DOMIterables[COLLECTION_NAME]) {
		    handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype);
		  }
		}

		handlePrototype(DOMTokenListPrototype);
		return web_domCollections_forEach;
	}

	requireWeb_domCollections_forEach();

	function _classCallCheck(a, n) {
	  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
	  for (var t = 0; t < r.length; t++) {
	    var o = r[t];
	    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
	  }
	}
	function _createClass(e, r, t) {
	  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
	    writable: !1
	  }), e;
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r);
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (String )(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, _typeof(o);
	}

	var es_array_isArray = {};

	var hasRequiredEs_array_isArray;

	function requireEs_array_isArray () {
		if (hasRequiredEs_array_isArray) return es_array_isArray;
		hasRequiredEs_array_isArray = 1;
		var $ = require_export();
		var isArray = requireIsArray();

		// `Array.isArray` method
		// https://tc39.es/ecma262/#sec-array.isarray
		$({ target: 'Array', stat: true }, {
		  isArray: isArray
		});
		return es_array_isArray;
	}

	requireEs_array_isArray();

	var es_object_proto = {};

	var hasRequiredEs_object_proto;

	function requireEs_object_proto () {
		if (hasRequiredEs_object_proto) return es_object_proto;
		hasRequiredEs_object_proto = 1;
		var DESCRIPTORS = requireDescriptors();
		var defineBuiltInAccessor = requireDefineBuiltInAccessor();
		var isObject = requireIsObject();
		var isPossiblePrototype = requireIsPossiblePrototype();
		var toObject = requireToObject();
		var requireObjectCoercible = requireRequireObjectCoercible();

		// eslint-disable-next-line es/no-object-getprototypeof -- safe
		var getPrototypeOf = Object.getPrototypeOf;
		// eslint-disable-next-line es/no-object-setprototypeof -- safe
		var setPrototypeOf = Object.setPrototypeOf;
		var ObjectPrototype = Object.prototype;
		var PROTO = '__proto__';

		// `Object.prototype.__proto__` accessor
		// https://tc39.es/ecma262/#sec-object.prototype.__proto__
		if (DESCRIPTORS && getPrototypeOf && setPrototypeOf && !(PROTO in ObjectPrototype)) try {
		  defineBuiltInAccessor(ObjectPrototype, PROTO, {
		    configurable: true,
		    get: function __proto__() {
		      return getPrototypeOf(toObject(this));
		    },
		    set: function __proto__(proto) {
		      var O = requireObjectCoercible(this);
		      if (isPossiblePrototype(proto) && isObject(O)) {
		        setPrototypeOf(O, proto);
		      }
		    }
		  });
		} catch (error) { /* empty */ }
		return es_object_proto;
	}

	requireEs_object_proto();

	var es_array_slice = {};

	var arraySlice;
	var hasRequiredArraySlice;

	function requireArraySlice () {
		if (hasRequiredArraySlice) return arraySlice;
		hasRequiredArraySlice = 1;
		var uncurryThis = requireFunctionUncurryThis();

		arraySlice = uncurryThis([].slice);
		return arraySlice;
	}

	var hasRequiredEs_array_slice;

	function requireEs_array_slice () {
		if (hasRequiredEs_array_slice) return es_array_slice;
		hasRequiredEs_array_slice = 1;
		var $ = require_export();
		var isArray = requireIsArray();
		var isConstructor = requireIsConstructor();
		var isObject = requireIsObject();
		var toAbsoluteIndex = requireToAbsoluteIndex();
		var lengthOfArrayLike = requireLengthOfArrayLike();
		var toIndexedObject = requireToIndexedObject();
		var createProperty = requireCreateProperty();
		var wellKnownSymbol = requireWellKnownSymbol();
		var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
		var nativeSlice = requireArraySlice();

		var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

		var SPECIES = wellKnownSymbol('species');
		var $Array = Array;
		var max = Math.max;

		// `Array.prototype.slice` method
		// https://tc39.es/ecma262/#sec-array.prototype.slice
		// fallback for not array-like ES3 strings and DOM objects
		$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
		  slice: function slice(start, end) {
		    var O = toIndexedObject(this);
		    var length = lengthOfArrayLike(O);
		    var k = toAbsoluteIndex(start, length);
		    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
		    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
		    var Constructor, result, n;
		    if (isArray(O)) {
		      Constructor = O.constructor;
		      // cross-realm fallback
		      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
		        Constructor = undefined;
		      } else if (isObject(Constructor)) {
		        Constructor = Constructor[SPECIES];
		        if (Constructor === null) Constructor = undefined;
		      }
		      if (Constructor === $Array || Constructor === undefined) {
		        return nativeSlice(O, k, fin);
		      }
		    }
		    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
		    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
		    result.length = n;
		    return result;
		  }
		});
		return es_array_slice;
	}

	requireEs_array_slice();

	var es_object_create = {};

	var hasRequiredEs_object_create;

	function requireEs_object_create () {
		if (hasRequiredEs_object_create) return es_object_create;
		hasRequiredEs_object_create = 1;
		// TODO: Remove from `core-js@4`
		var $ = require_export();
		var DESCRIPTORS = requireDescriptors();
		var create = requireObjectCreate();

		// `Object.create` method
		// https://tc39.es/ecma262/#sec-object.create
		$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
		  create: create
		});
		return es_object_create;
	}

	requireEs_object_create();

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);
	var methodsList = ['push', 'pop', 'shift',
	// 删除数据第一个元素
	'unshift',
	// 数组开头添加元素
	'splice', 'reverse', 'sort'];
	methodsList.forEach(function (method) {
	  Object.defineProperty(arrayMethods, method, {
	    value: function value() {
	      var originMethod = arrayProto[method];
	      var inserted;
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      var result = originMethod.apply(this, args);
	      var ob = this.__ob__;
	      switch (method) {
	        case 'push':
	        case 'unshift':
	          inserted = args;
	          break;
	        case 'splice':
	          inserted = args.slice(2);
	          break;
	      }
	      if (inserted) ob.observeArray(inserted);
	      return result;
	    },
	    enumerable: true,
	    writable: true,
	    configurable: true
	  });
	});

	function observe(data) {
	  if (_typeof(data) !== 'object' || data === null) return data;
	  if (data.__ob__ instanceof Observer) return data;
	  return new Observer(data);
	}
	var Observer = /*#__PURE__*/function () {
	  function Observer(value) {
	    _classCallCheck(this, Observer);
	    Object.defineProperty(value, '__ob__', {
	      value: this,
	      enumerable: false,
	      configurable: false
	    });
	    if (Array.isArray(value)) {
	      value.__proto__ = arrayMethods;
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  }
	  return _createClass(Observer, [{
	    key: "walk",
	    value: function walk(data) {
	      Object.keys(data).forEach(function (key) {
	        return defineReactive(data, key, data[key]);
	      });
	    }
	  }, {
	    key: "observeArray",
	    value: function observeArray(data) {
	      data.forEach(function (item) {
	        observe(item);
	      });
	    }
	  }]);
	}();
	function defineReactive(obj, key, val) {
	  observe(val);
	  Object.defineProperty(obj, key, {
	    get: function get() {
	      console.log('获取值');
	      return val;
	    },
	    set: function set(newValue) {
	      if (newValue === val) return;
	      observe(newValue);
	      val = newValue;
	      console.log('设置值');
	    }
	  });
	}

	function initState(vm) {
	  var opts = vm.$options;
	  if (opts.props) ;
	  if (opts.methods) ;
	  if (opts.data) {
	    initData(vm);
	  }
	  if (opts.computed) ;
	  if (opts.watch) ;
	}
	function proxy(vm, data, key) {
	  Object.defineProperty(vm, key, {
	    get: function get() {
	      return vm[data][key];
	    },
	    set: function set(newValue) {
	      vm[data][key] = newValue;
	    }
	  });
	}
	function initData(vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
	  Object.keys(data).forEach(function (key) {
	    proxy(vm, '_data', key);
	  });
	  observe(data);
	}

	function initMixin(Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    vm.$options = options;
	    initState(vm);
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	  Vue.prototype.$mount = function (el) {
	    var vm = this;
	    var opts = vm.$options;
	    el = document.querySelector(el);
	    var template = opts.template;
	    if (!template && el) {
	      template = el.outerHTML;
	    }
	    var render = compileToFunctions(template);
	    opts.render = render;
	  };
	}

	function Vue(options) {
	  this._init(options);
	}
	initMixin(Vue);

	return Vue;

}));
//# sourceMappingURL=vue.js.map
