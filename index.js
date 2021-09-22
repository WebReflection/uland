self.uland = (function (exports) {
  'use strict';

  

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self = {};
  self.CustomEvent = typeof CustomEvent === 'function' ? CustomEvent : function (__p__) {
    CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
    return CustomEvent;

    function CustomEvent(type, init) {
      if (!init) init = {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
      return e;
    }
  }('prototype');
  var CustomEvent$1 = self.CustomEvent;

  /**
   * @typedef {Object} Handler an object that handle events.
   * @property {(event: Event) => void} connected an optional method triggered when node is connected.
   * @property {(event: Event) => void} disconnected an optional method triggered when node is disconnected.
   */

  /**
   * @typedef {Object} UConnect an utility to connect or disconnect nodes to observe.
   * @property {(node: Node, handler?: Handler) => void} connect a method to start observing a generic Node.
   * @property {(node: Node) => void} disconnect a method to stop observing a generic Node.
   * @property {() => void} kill a method to kill/disconnect the MutationObserver.
   */

  /**
   * Attach a MutationObserver to a generic node and returns a UConnect instance.
   * @param {Node} root a DOM node to observe for mutations.
   * @param {string} parse the kind of nodes to parse: children, by default, or childNodes.
   * @param {Event} CE an Event/CustomEvent constructor (polyfilled in SSR).
   * @param {MutationObserver} MO a MutationObserver constructor (polyfilled in SSR).
   * @returns {UConnect} an utility to connect or disconnect nodes to observe.
   */
  var observe = function observe(root, parse, CE, MO) {
    var observed = new WeakMap(); // these two should be WeakSet but IE11 happens

    var wmin = new WeakMap();
    var wmout = new WeakMap();

    var has = function has(node) {
      return observed.has(node);
    };

    var disconnect = function disconnect(node) {
      if (has(node)) {
        listener(node, node.removeEventListener, observed.get(node));
        observed["delete"](node);
      }
    };

    var connect = function connect(node, handler) {
      disconnect(node);
      if (!(handler || (handler = {})).handleEvent) handler.handleEvent = handleEvent;
      listener(node, node.addEventListener, handler);
      observed.set(node, handler);
    };

    var listener = function listener(node, method, handler) {
      method.call(node, 'disconnected', handler);
      method.call(node, 'connected', handler);
    };

    var notifyObserved = function notifyObserved(nodes, type, wmin, wmout) {
      for (var length = nodes.length, i = 0; i < length; i++) {
        notifyTarget(nodes[i], type, wmin, wmout);
      }
    };

    var notifyTarget = function notifyTarget(node, type, wmin, wmout) {
      if (has(node) && !wmin.has(node)) {
        wmout["delete"](node);
        wmin.set(node, 0);
        node.dispatchEvent(new (CE || CustomEvent)(type));
      }

      notifyObserved(node[parse || 'children'] || [], type, wmin, wmout);
    };

    var mo = new (MO || MutationObserver)(function (nodes) {
      for (var length = nodes.length, i = 0; i < length; i++) {
        var _nodes$i = nodes[i],
            removedNodes = _nodes$i.removedNodes,
            addedNodes = _nodes$i.addedNodes;
        notifyObserved(removedNodes, 'disconnected', wmout, wmin);
        notifyObserved(addedNodes, 'connected', wmin, wmout);
      }
    });
    mo.add = add;
    mo.add(root || document);
    var attachShadow = Element.prototype.attachShadow;
    if (attachShadow) Element.prototype.attachShadow = function (init) {
      var sd = attachShadow.call(this, init);
      mo.add(sd);
      return sd;
    };
    return {
      has: has,
      connect: connect,
      disconnect: disconnect,
      kill: function kill() {
        mo.disconnect();
      }
    };
  };

  function add(node) {
    this.observe(node, {
      subtree: true,
      childList: true
    });
  }

  function handleEvent(event) {
    if (event.type in this) this[event.type](event);
  }

  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0,
        value;
    fn(function ($) {
      value = $;
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn, 0, value) : queue.push(fn), this;
    }
  };

  var info = null,
      schedule = new Set();

  var invoke = function invoke(effect) {
    var $ = effect.$,
        r = effect.r,
        h = effect.h;

    if (isFunction(r)) {
      fx$1.get(h)["delete"](effect);
      r();
    }

    if (isFunction(effect.r = $())) fx$1.get(h).add(effect);
  };

  var runSchedule = function runSchedule() {
    var previous = schedule;
    schedule = new Set();
    previous.forEach(function (_ref) {
      var h = _ref.h,
          c = _ref.c,
          a = _ref.a,
          e = _ref.e;
      // avoid running schedules when the hook is
      // re-executed before such schedule happens
      if (e) h.apply(c, a);
    });
  };

  var fx$1 = new WeakMap();
  var effects = [];
  var layoutEffects = [];
  function different(value, i) {
    return value !== this[i];
  }
  var dropEffect = function dropEffect(hook) {
    var effects = fx$1.get(hook);
    if (effects) wait.then(function () {
      effects.forEach(function (effect) {
        effect.r();
        effect.r = null;
      });
      effects.clear();
    });
  };
  var getInfo = function getInfo() {
    return info;
  };
  var hasEffect = function hasEffect(hook) {
    return fx$1.has(hook);
  };
  var isFunction = function isFunction(f) {
    return typeof f === 'function';
  };
  var hooked$2 = function hooked(callback) {
    var current = {
      h: hook,
      c: null,
      a: null,
      e: 0,
      i: 0,
      s: []
    };
    return hook;

    function hook() {
      var prev = info;
      info = current;
      current.e = current.i = 0;

      try {
        return callback.apply(current.c = this, current.a = arguments);
      } finally {
        info = prev;
        if (effects.length) wait.then(effects.forEach.bind(effects.splice(0), invoke));
        if (layoutEffects.length) layoutEffects.splice(0).forEach(invoke);
      }
    }
  };
  var reschedule = function reschedule(info) {
    if (!schedule.has(info)) {
      info.e = 1;
      schedule.add(info);
      wait.then(runSchedule);
    }
  };
  var wait = new Lie(function ($) {
    return $();
  });

  var createContext = function createContext(value) {
    return {
      _: new Set(),
      provide: provide,
      value: value
    };
  };
  var useContext = function useContext(_ref) {
    var _ = _ref._,
        value = _ref.value;

    _.add(getInfo());

    return value;
  };

  function provide(newValue) {
    var _ = this._,
        value = this.value;

    if (value !== newValue) {
      this._ = new Set();
      this.value = newValue;

      _.forEach(function (_ref2) {
        var h = _ref2.h,
            c = _ref2.c,
            a = _ref2.a;
        h.apply(c, a);
      });
    }
  }

  var useCallback = function useCallback(fn, guards) {
    return useMemo(function () {
      return fn;
    }, guards);
  };
  var useMemo = function useMemo(memo, guards) {
    var info = getInfo();
    var i = info.i,
        s = info.s;
    if (i === s.length || !guards || guards.some(different, s[i]._)) s[i] = {
      $: memo(),
      _: guards
    };
    return s[info.i++].$;
  };

  var createEffect = function createEffect(stack) {
    return function (callback, guards) {
      var info = getInfo();
      var i = info.i,
          s = info.s,
          h = info.h;
      var call = i === s.length;
      info.i++;

      if (call) {
        if (!fx$1.has(h)) fx$1.set(h, new Set());
        s[i] = {
          $: callback,
          _: guards,
          r: null,
          h: h
        };
      }

      if (call || !guards || guards.some(different, s[i]._)) stack.push(s[i]);
      s[i].$ = callback;
      s[i]._ = guards;
    };
  };

  var useEffect = createEffect(effects);
  var useLayoutEffect = createEffect(layoutEffects);

  var getValue = function getValue(value, f) {
    return isFunction(f) ? f(value) : f;
  };

  var useReducer$1 = function useReducer(reducer, value, init) {
    var info = getInfo();
    var i = info.i,
        s = info.s;
    if (i === s.length) s.push({
      $: isFunction(init) ? init(value) : getValue(void 0, value),
      set: function set(value) {
        s[i].$ = reducer(s[i].$, value);
        reschedule(info);
      }
    });
    var _s$info$i = s[info.i++],
        $ = _s$info$i.$,
        set = _s$info$i.set;
    return [$, set];
  };
  var useState$1 = function useState(value) {
    return useReducer$1(getValue, value);
  };

  var useRef = function useRef(current) {
    var info = getInfo();
    var i = info.i,
        s = info.s;
    if (i === s.length) s.push({
      current: current
    });
    return s[info.i++];
  };

  /*! (c) Andrea Giammarchi - ISC */
  var h = null,
      c = null,
      a = null;
  var fx = new WeakMap();
  var states = new WeakMap();

  var set = function set(h, c, a, update) {
    var wrap = function wrap(value) {
      if (!fx.has(h)) {
        fx.set(h, 0);
        wait.then(function () {
          fx["delete"](h);
          h.apply(c, a);
        });
      }

      update(value);
    };

    states.set(update, wrap);
    return wrap;
  };

  var wrap = function wrap(h, c, a, state) {
    return h ? [state[0], states.get(state[1]) || set(h, c, a, state[1])] : state;
  };

  var hooked$1 = function hooked(callback, outer) {
    var hook = hooked$2(outer ?
    /*async*/
    function () {
      var ph = h,
          pc = c,
          pa = a;
      h = hook;
      c = this;
      a = arguments;

      try {
        return (
          /*await*/
          callback.apply(c, a)
        );
      } finally {
        h = ph;
        c = pc;
        a = pa;
      }
    } : callback);
    return hook;
  };
  var useReducer = function useReducer(reducer, value, init) {
    return wrap(h, c, a, useReducer$1(reducer, value, init));
  };
  var useState = function useState(value) {
    return wrap(h, c, a, useState$1(value));
  };

  /*! (c) Andrea Giammarchi - ISC */
  var observer = observe(document, 'children', CustomEvent$1);

  var find = function find(_ref) {
    var firstChild = _ref.firstChild;
    if (firstChild && firstChild.nodeType !== 1 && !(firstChild = firstChild.nextElementSibling)) throw 'unobservable';
    return firstChild;
  };

  var get = function get(node) {
    var nodeType = node.nodeType;
    if (nodeType) return nodeType === 1 ? node : find(node);else {
      // give a chance to facades to return a reasonable value
      var value = node.valueOf();
      return value !== node ? get(value) : find(value);
    }
  };

  var hooked = function hooked(fn, outer) {
    var hook = hooked$1(fn, outer);
    return (
      /*async*/
      function () {
        var node =
        /*await*/
        hook.apply(this, arguments);

        if (hasEffect(hook)) {
          var element = get(node);
          if (!observer.has(element)) observer.connect(element, {
            disconnected: function disconnected() {
              dropEffect(hook);
            }
          });
        }

        return node;
      }
    );
  };

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  var isArray = Array.isArray;
  var _ref = [],
      indexOf = _ref.indexOf,
      slice = _ref.slice;

  var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var node = /<[a-z][^>]+$/i;
  var notNode = />[^<>]*$/;
  var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
  var trimEnd = /\s+$/;

  var isNode = function isNode(template, i) {
    return 0 < i-- && (node.test(template[i]) || !notNode.test(template[i]) && isNode(template, i));
  };

  var regular = function regular(original, name, extra) {
    return empty.test(name) ? original : "<".concat(name).concat(extra.replace(trimEnd, ''), "></").concat(name, ">");
  };

  var instrument = (function (template, prefix, svg) {
    var text = [];
    var length = template.length;

    var _loop = function _loop(i) {
      var chunk = template[i - 1];
      text.push(attr.test(chunk) && isNode(template, i) ? chunk.replace(attr, function (_, $1, $2) {
        return "".concat(prefix).concat(i - 1, "=").concat($2 || '"').concat($1).concat($2 ? '' : '"');
      }) : "".concat(chunk, "<!--").concat(prefix).concat(i - 1, "-->"));
    };

    for (var i = 1; i < length; i++) {
      _loop(i);
    }

    text.push(template[length - 1]);
    var output = text.join('').trim();
    return svg ? output : output.replace(selfClosing, regular);
  });

  var ELEMENT_NODE = 1;
  var nodeType = 111;

  var remove = function remove(_ref) {
    var firstChild = _ref.firstChild,
        lastChild = _ref.lastChild;
    var range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };

  var diffable = function diffable(node, operation) {
    return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  };
  var persistent = function persistent(fragment) {
    var childNodes = fragment.childNodes;
    var length = childNodes.length;
    if (length < 2) return length ? childNodes[0] : fragment;
    var nodes = slice.call(childNodes, 0);
    var firstChild = nodes[0];
    var lastChild = nodes[length - 1];
    return {
      ELEMENT_NODE: ELEMENT_NODE,
      nodeType: nodeType,
      firstChild: firstChild,
      lastChild: lastChild,
      valueOf: function valueOf() {
        if (childNodes.length !== length) {
          var i = 0;

          while (i < length) {
            fragment.appendChild(nodes[i++]);
          }
        }

        return fragment;
      }
    };
  };

  /**
   * ISC License
   *
   * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  /**
   * @param {Node} parentNode The container where children live
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var udomdiff = (function (parentNode, a, b, get, before) {
    var bLength = b.length;
    var aEnd = a.length;
    var bEnd = bLength;
    var aStart = 0;
    var bStart = 0;
    var map = null;

    while (aStart < aEnd || bStart < bEnd) {
      // append head, tail, or nodes in between: fast path
      if (aEnd === aStart) {
        // we could be in a situation where the rest of nodes that
        // need to be added are not at the end, and in such case
        // the node to `insertBefore`, if the index is more than 0
        // must be retrieved, otherwise it's gonna be the first item.
        var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

        while (bStart < bEnd) {
          parentNode.insertBefore(get(b[bStart++], 1), node);
        }
      } // remove head or tail: fast path
      else if (bEnd === bStart) {
        while (aStart < aEnd) {
          // remove the node only if it's unknown or not live
          if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
          aStart++;
        }
      } // same node: fast path
      else if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
      } // same tail: fast path
      else if (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } // The once here single last swap "fast path" has been removed in v1.1.0
      // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
      // reverse swap: also fast path
      else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        // this is a "shrink" operation that could happen in these cases:
        // [1, 2, 3, 4, 5]
        // [1, 4, 3, 2, 5]
        // or asymmetric too
        // [1, 2, 3, 4, 5]
        // [1, 2, 3, 5, 6, 4]
        var _node = get(a[--aEnd], -1).nextSibling;
        parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
        parentNode.insertBefore(get(b[--bEnd], 1), _node); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
        // The main reason to do this, is that when a[aEnd] will be reached,
        // the loop will likely be on the fast path, as identical to b[bEnd].
        // In the best case scenario, the next loop will skip the tail,
        // but in the worst one, this node will be considered as already
        // processed, bailing out pretty quickly from the map index check

        a[aEnd] = b[bEnd];
      } // map based fallback, "slow" path
      else {
        // the map requires an O(bEnd - bStart) operation once
        // to store all future nodes indexes for later purposes.
        // In the worst case scenario, this is a full O(N) cost,
        // and such scenario happens at least when all nodes are different,
        // but also if both first and last items of the lists are different
        if (!map) {
          map = new Map();
          var i = bStart;

          while (i < bEnd) {
            map.set(b[i], i++);
          }
        } // if it's a future node, hence it needs some handling


        if (map.has(a[aStart])) {
          // grab the index of such node, 'cause it might have been processed
          var index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS

          if (bStart < index && index < bEnd) {
            var _i = aStart; // counts the amount of nodes that are the same in the future

            var sequence = 1;

            while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) {
              sequence++;
            } // effort decision here: if the sequence is longer than replaces
            // needed to reach such sequence, which would brings again this loop
            // to the fast path, prepend the difference before a sequence,
            // and move only the future list index forward, so that aStart
            // and bStart will be aligned again, hence on the fast path.
            // An example considering aStart and bStart are both 0:
            // a: [1, 2, 3, 4]
            // b: [7, 1, 2, 3, 6]
            // this would place 7 before 1 and, from that time on, 1, 2, and 3
            // will be processed at zero cost


            if (sequence > index - bStart) {
              var _node2 = get(a[aStart], 0);

              while (bStart < index) {
                parentNode.insertBefore(get(b[bStart++], 1), _node2);
              }
            } // if the effort wasn't good enough, fallback to a replace,
            // moving both source and target indexes forward, hoping that some
            // similar node will be found later on, to go back to the fast path
            else {
              parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
            }
          } // otherwise move the source forward, 'cause there's nothing to do
          else aStart++;
        } // this node has no meaning in the future list, so it's more than safe
        // to remove it, and check the next live node out instead, meaning
        // that only the live list index should be forwarded
        else parentNode.removeChild(get(a[aStart++], -1));
      }
    }

    return b;
  });

  var aria = function aria(node) {
    return function (values) {
      for (var key in values) {
        var name = key === 'role' ? key : "aria-".concat(key);
        var value = values[key];
        if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
      }
    };
  };
  var attribute = function attribute(node, name) {
    var oldValue,
        orphan = true;
    var attributeNode = document.createAttributeNS(null, name);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (oldValue == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;

          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };

  var _boolean = function _boolean(node, key, oldValue) {
    return function (newValue) {
      if (oldValue !== !!newValue) {
        // when IE won't be around anymore ...
        // node.toggleAttribute(key, oldValue = !!newValue);
        if (oldValue = !!newValue) node.setAttribute(key, '');else node.removeAttribute(key);
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (values) {
      for (var key in values) {
        var value = values[key];
        if (value == null) delete dataset[key];else dataset[key] = value;
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        type = name.slice(2);
    if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    var oldValue;
    return function (value) {
      if (oldValue !== value) {
        oldValue = value;
        if (typeof value === 'function') value(node);else value.current = node;
      }
    };
  };
  var setter = function setter(node, key) {
    return key === 'dataset' ? data(node) : function (value) {
      node[key] = value;
    };
  };
  var text = function text(node) {
    var oldValue;
    return function (newValue) {
      if (oldValue != newValue) {
        oldValue = newValue;
        node.textContent = newValue == null ? '' : newValue;
      }
    };
  };

  var reducePath = function reducePath(_ref, i) {
    var childNodes = _ref.childNodes;
    return childNodes[i];
  }; // this helper avoid code bloat around handleAnything() callback


  var diff = function diff(comment, oldNodes, newNodes) {
    return udomdiff(comment.parentNode, // TODO: there is a possible edge case where a node has been
    //       removed manually, or it was a keyed one, attached
    //       to a shared reference between renders.
    //       In this case udomdiff might fail at removing such node
    //       as its parent won't be the expected one.
    //       The best way to avoid this issue is to filter oldNodes
    //       in search of those not live, or not in the current parent
    //       anymore, but this would require both a change to uwire,
    //       exposing a parentNode from the firstChild, as example,
    //       but also a filter per each diff that should exclude nodes
    //       that are not in there, penalizing performance quite a lot.
    //       As this has been also a potential issue with domdiff,
    //       and both lighterhtml and hyperHTML might fail with this
    //       very specific edge case, I might as well document this possible
    //       "diffing shenanigan" and call it a day.
    oldNodes, newNodes, diffable, comment);
  }; // if an interpolation represents a comment, the whole
  // diffing will be related to such comment.
  // This helper is in charge of understanding how the new
  // content for such interpolation/hole should be updated


  var handleAnything = function handleAnything(comment) {
    var oldValue,
        text,
        nodes = [];

    var anyContent = function anyContent(newValue) {
      switch (typeof(newValue)) {
        // primitives are handled as text content
        case 'string':
        case 'number':
        case 'boolean':
          if (oldValue !== newValue) {
            oldValue = newValue;
            if (!text) text = document.createTextNode('');
            text.data = newValue;
            nodes = diff(comment, nodes, [text]);
          }

          break;
        // null, and undefined are used to cleanup previous content

        case 'object':
        case 'undefined':
          if (newValue == null) {
            if (oldValue != newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, []);
            }

            break;
          } // arrays and nodes have a special treatment


          if (isArray(newValue)) {
            oldValue = newValue; // arrays can be used to cleanup, if empty

            if (newValue.length === 0) nodes = diff(comment, nodes, []); // or diffed, if these contains nodes or "wires"
            else if (typeof(newValue[0]) === 'object') nodes = diff(comment, nodes, newValue); // in all other cases the content is stringified as is
            else anyContent(String(newValue));
            break;
          } // if the new value is a DOM node, or a wire, and it's
          // different from the one already live, then it's diffed.
          // if the node is a fragment, it's appended once via its childNodes
          // There is no `else` here, meaning if the content
          // is not expected one, nothing happens, as easy as that.


          if (oldValue !== newValue && 'ELEMENT_NODE' in newValue) {
            oldValue = newValue;
            nodes = diff(comment, nodes, newValue.nodeType === 11 ? slice.call(newValue.childNodes) : [newValue]);
          }

          break;

        case 'function':
          anyContent(newValue(comment));
          break;
      }
    };

    return anyContent;
  }; // attributes can be:
  //  * ref=${...}      for hooks and other purposes
  //  * aria=${...}     for aria attributes
  //  * ?boolean=${...} for boolean attributes
  //  * .dataset=${...} for dataset related attributes
  //  * .setter=${...}  for Custom Elements setters or nodes with setters
  //                    such as buttons, details, options, select, etc
  //  * @event=${...}   to explicitly handle event listeners
  //  * onevent=${...}  to automatically handle event listeners
  //  * generic=${...}  to handle an attribute just like an attribute


  var handleAttribute = function handleAttribute(node, name
  /*, svg*/
  ) {
    switch (name[0]) {
      case '?':
        return _boolean(node, name.slice(1), false);

      case '.':
        return setter(node, name.slice(1));

      case '@':
        return event(node, 'on' + name.slice(1));

      case 'o':
        if (name[1] === 'n') return event(node, name);
    }

    switch (name) {
      case 'ref':
        return ref(node);

      case 'aria':
        return aria(node);
    }

    return attribute(node, name
    /*, svg*/
    );
  }; // each mapped update carries the update type and its path
  // the type is either node, attribute, or text, while
  // the path is how to retrieve the related node to update.
  // In the attribute case, the attribute name is also carried along.


  function handlers(options) {
    var type = options.type,
        path = options.path;
    var node = path.reduceRight(reducePath, this);
    return type === 'node' ? handleAnything(node) : type === 'attr' ? handleAttribute(node, options.name
    /*, options.svg*/
    ) : text(node);
  }

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = ('content' in create(TEMPLATE));
    var createHTML = HAS_CONTENT ? function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } : function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;

      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }

      append(content, childNodes);
      return content;
    };
    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;

      while (length--) {
        root.appendChild(childNodes[0]);
      }
    }

    function create(element) {
      return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
    } // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE


    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);

  var isImportNodeLengthWrong = document.importNode.length != 1; // IE11 and old Edge discard empty nodes when cloning, potentially
  // resulting in broken paths to find updates. The workaround here
  // is to import once, upfront, the fragment that will be cloned
  // later on, so that paths are retrieved from one already parsed,
  // hence without missing child nodes once re-cloned.

  var createFragment = isImportNodeLengthWrong ? function (text, type, normalize) {
    return document.importNode(createContent(text, type, normalize), true);
  } : createContent; // IE11 and old Edge have a different createTreeWalker signature that
  // has been deprecated in other browsers. This export is needed only
  // to guarantee the TreeWalker doesn't show warnings and, ultimately, works

  var createWalker = isImportNodeLengthWrong ? function (fragment) {
    return document.createTreeWalker(fragment, 1 | 128, null, false);
  } : function (fragment) {
    return document.createTreeWalker(fragment, 1 | 128);
  };

  // related to its child nodes, so that it's possible
  // to retrieve later on exact node via reducePath

  var createPath = function createPath(node) {
    var path = [];
    var _node = node,
        parentNode = _node.parentNode;

    while (parentNode) {
      path.push(indexOf.call(parentNode.childNodes, node));
      node = parentNode;
      parentNode = node.parentNode;
    }

    return path;
  }; // the prefix is used to identify either comments, attributes, or nodes
  // that contain the related unique id. In the attribute cases
  // isµX="attribute-name" will be used to map current X update to that
  // attribute name, while comments will be like <!--isµX-->, to map
  // the update to that specific comment node, hence its parent.
  // style and textarea will have <!--isµX--> text content, and are handled
  // directly through text-only updates.


  var prefix = 'isµ'; // Template Literals are unique per scope and static, meaning a template
  // should be parsed once, and once only, as it will always represent the same
  // content, within the exact same amount of updates each time.
  // This cache relates each template to its unique content and updates.

  var cache$2 = umap(new WeakMap()); // a RegExp that helps checking nodes that cannot contain comments

  var textOnly = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
  var createCache$1 = function createCache() {
    return {
      stack: [],
      // each template gets a stack for each interpolation "hole"
      entry: null,
      // each entry contains details, such as:
      //  * the template that is representing
      //  * the type of node it represents (html or svg)
      //  * the content fragment with all nodes
      //  * the list of updates per each node (template holes)
      //  * the "wired" node or fragment that will get updates
      // if the template or type are different from the previous one
      // the entry gets re-created each time
      wire: null // each rendered node represent some wired content and
      // this reference to the latest one. If different, the node
      // will be cleaned up and the new "wire" will be appended

    };
  }; // the entry stored in the rendered node cache, and per each "hole"

  var createEntry = function createEntry(type, template) {
    var _mapUpdates = mapUpdates(type, template),
        content = _mapUpdates.content,
        updates = _mapUpdates.updates;

    return {
      type: type,
      template: template,
      content: content,
      updates: updates,
      wire: null
    };
  }; // a template is instrumented to be able to retrieve where updates are needed.
  // Each unique template becomes a fragment, cloned once per each other
  // operation based on the same template, i.e. data => html`<p>${data}</p>`


  var mapTemplate = function mapTemplate(type, template) {
    var text = instrument(template, prefix, type === 'svg');
    var content = createFragment(text, type); // once instrumented and reproduced as fragment, it's crawled
    // to find out where each update is in the fragment tree

    var tw = createWalker(content);
    var nodes = [];
    var length = template.length - 1;
    var i = 0; // updates are searched via unique names, linearly increased across the tree
    // <div isµ0="attr" isµ1="other"><!--isµ2--><style><!--isµ3--</style></div>

    var search = "".concat(prefix).concat(i);

    while (i < length) {
      var node = tw.nextNode(); // if not all updates are bound but there's nothing else to crawl
      // it means that there is something wrong with the template.

      if (!node) throw "bad template: ".concat(text); // if the current node is a comment, and it contains isµX
      // it means the update should take care of any content

      if (node.nodeType === 8) {
        // The only comments to be considered are those
        // which content is exactly the same as the searched one.
        if (node.data === search) {
          nodes.push({
            type: 'node',
            path: createPath(node)
          });
          search = "".concat(prefix).concat(++i);
        }
      } else {
        // if the node is not a comment, loop through all its attributes
        // named isµX and relate attribute updates to this node and the
        // attribute name, retrieved through node.getAttribute("isµX")
        // the isµX attribute will be removed as irrelevant for the layout
        // let svg = -1;
        while (node.hasAttribute(search)) {
          nodes.push({
            type: 'attr',
            path: createPath(node),
            name: node.getAttribute(search) //svg: svg < 0 ? (svg = ('ownerSVGElement' in node ? 1 : 0)) : svg

          });
          node.removeAttribute(search);
          search = "".concat(prefix).concat(++i);
        } // if the node was a style, textarea, or others, check its content
        // and if it is <!--isµX--> then update tex-only this node


        if (textOnly.test(node.tagName) && node.textContent.trim() === "<!--".concat(search, "-->")) {
          node.textContent = '';
          nodes.push({
            type: 'text',
            path: createPath(node)
          });
          search = "".concat(prefix).concat(++i);
        }
      }
    } // once all nodes to update, or their attributes, are known, the content
    // will be cloned in the future to represent the template, and all updates
    // related to such content retrieved right away without needing to re-crawl
    // the exact same template, and its content, more than once.


    return {
      content: content,
      nodes: nodes
    };
  }; // if a template is unknown, perform the previous mapping, otherwise grab
  // its details such as the fragment with all nodes, and updates info.


  var mapUpdates = function mapUpdates(type, template) {
    var _ref = cache$2.get(template) || cache$2.set(template, mapTemplate(type, template)),
        content = _ref.content,
        nodes = _ref.nodes; // clone deeply the fragment


    var fragment = document.importNode(content, true); // and relate an update handler per each node that needs one

    var updates = nodes.map(handlers, fragment); // return the fragment and all updates to use within its nodes

    return {
      content: fragment,
      updates: updates
    };
  }; // as html and svg can be nested calls, but no parent node is known
  // until rendered somewhere, the unroll operation is needed to
  // discover what to do with each interpolation, which will result
  // into an update operation.


  var unroll$1 = function unroll(info, _ref2) {
    var type = _ref2.type,
        template = _ref2.template,
        values = _ref2.values;
    var length = values.length; // interpolations can contain holes and arrays, so these need
    // to be recursively discovered

    unrollValues$1(info, values, length);
    var entry = info.entry; // if the cache entry is either null or different from the template
    // and the type this unroll should resolve, create a new entry
    // assigning a new content fragment and the list of updates.

    if (!entry || entry.template !== template || entry.type !== type) info.entry = entry = createEntry(type, template);
    var _entry = entry,
        content = _entry.content,
        updates = _entry.updates,
        wire = _entry.wire; // even if the fragment and its nodes is not live yet,
    // it is already possible to update via interpolations values.

    for (var i = 0; i < length; i++) {
      updates[i](values[i]);
    } // if the entry was new, or representing a different template or type,
    // create a new persistent entity to use during diffing.
    // This is simply a DOM node, when the template has a single container,
    // as in `<p></p>`, or a "wire" in `<p></p><p></p>` and similar cases.


    return wire || (entry.wire = persistent(content));
  }; // the stack retains, per each interpolation value, the cache
  // related to each interpolation value, or null, if the render
  // was conditional and the value is not special (Array or Hole)

  var unrollValues$1 = function unrollValues(_ref3, values, length) {
    var stack = _ref3.stack;

    for (var i = 0; i < length; i++) {
      var hole = values[i]; // each Hole gets unrolled and re-assigned as value
      // so that domdiff will deal with a node/wire, not with a hole

      if (hole instanceof Hole) values[i] = unroll$1(stack[i] || (stack[i] = createCache$1()), hole); // arrays are recursively resolved so that each entry will contain
      // also a DOM node or a wire, hence it can be diffed if/when needed
      else if (isArray(hole)) unrollValues(stack[i] || (stack[i] = createCache$1()), hole, hole.length); // if the value is nothing special, the stack doesn't need to retain data
      // this is useful also to cleanup previously retained data, if the value
      // was a Hole, or an Array, but not anymore, i.e.:
      // const update = content => html`<div>${content}</div>`;
      // update(listOfItems); update(null); update(html`hole`)
      else stack[i] = null;
    }

    if (length < stack.length) stack.splice(length);
  };
  /**
   * Holds all details wrappers needed to render the content further on.
   * @constructor
   * @param {string} type The hole type, either `html` or `svg`.
   * @param {string[]} template The template literals used to the define the content.
   * @param {Array} values Zero, one, or more interpolated values to render.
   */


  function Hole(type, template, values) {
    this.type = type;
    this.template = template;
    this.values = values;
  }

  var create$1 = Object.create,
      defineProperties = Object.defineProperties; // both `html` and `svg` template literal tags are polluted
  // with a `for(ref[, id])` and a `node` tag too

  var tag = function tag(type) {
    // both `html` and `svg` tags have their own cache
    var keyed = umap(new WeakMap()); // keyed operations always re-use the same cache and unroll
    // the template and its interpolations right away

    var fixed = function fixed(cache) {
      return function (template) {
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        return unroll$1(cache, {
          type: type,
          template: template,
          values: values
        });
      };
    };

    return defineProperties( // non keyed operations are recognized as instance of Hole
    // during the "unroll", recursively resolved and updated
    function (template) {
      for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      return new Hole(type, template, values);
    }, {
      "for": {
        // keyed operations need a reference object, usually the parent node
        // which is showing keyed results, and optionally a unique id per each
        // related node, handy with JSON results and mutable list of objects
        // that usually carry a unique identifier
        value: function value(ref, id) {
          var memo = keyed.get(ref) || keyed.set(ref, create$1(null));
          return memo[id] || (memo[id] = fixed(createCache$1()));
        }
      },
      node: {
        // it is possible to create one-off content out of the box via node tag
        // this might return the single created node, or a fragment with all
        // nodes present at the root level and, of course, their child nodes
        value: function value(template) {
          for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            values[_key3 - 1] = arguments[_key3];
          }

          return unroll$1(createCache$1(), {
            type: type,
            template: template,
            values: values
          }).valueOf();
        }
      }
    });
  }; // each rendered node gets its own cache


  var cache$1 = umap(new WeakMap()); // rendering means understanding what `html` or `svg` tags returned
  // and it relates a specific node to its own unique cache.
  // Each time the content to render changes, the node is cleaned up
  // and the new new content is appended, and if such content is a Hole
  // then it's "unrolled" to resolve all its inner nodes.

  var render$1 = function render(where, what) {
    var hole = typeof what === 'function' ? what() : what;
    var info = cache$1.get(where) || cache$1.set(where, createCache$1());
    var wire = hole instanceof Hole ? unroll$1(info, hole) : hole;

    if (wire !== info.wire) {
      info.wire = wire;
      where.textContent = ''; // valueOf() simply returns the node itself, but in case it was a "wire"
      // it will eventually re-append all nodes to its fragment so that such
      // fragment can be re-appended many times in a meaningful way
      // (wires are basically persistent fragments facades with special behavior)

      where.appendChild(wire.valueOf());
    }

    return where;
  };

  var html$1 = tag('html');
  var svg$1 = tag('svg');

  var create = Object.create;

  var html = function html(template) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    return new Hole('html', template, values);
  };

  html["for"] = createFor(html$1);

  var svg = function svg(template) {
    for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    return new Hole('svg', template, values);
  };

  svg["for"] = createFor(svg$1);
  var cache = umap(new WeakMap());

  var render = function render(where, what) {
    return (cache.get(where) || cache.set(where, {
      c: createCache(),
      h: hooked(
      /*async*/
      function (what) {
        var value = typeof what === 'function' ? what() : what;
        return render$1(where, value instanceof Hook ?
        /*await*/
        unroll(this.c, value) : (
        /*await*/
        unrollHole(this.c, value), value));
      }, where)
    })).h(what);
  };

  var createHook = function createHook(info, entry) {
    return hooked(
    /*async*/
    function () {
      var hole =
      /*await*/
      entry.f.apply(this, arguments);

      if (hole instanceof Hole) {
        /*await*/
        unrollHole(info, hole);
        entry.$ = view(entry, hole);
      } else entry.$ = hole;

      return entry.$;
    });
  };

  var createCache = function createCache() {
    return {
      s: [],
      e: null
    };
  };

  var unroll = function unroll(info, _ref) {
    var f = _ref.f,
        c = _ref.c,
        a = _ref.a;
    var e = info.e;

    if (!e || e.f !== f) {
      info.e = e = {
        f: f,
        h: null,
        $: null
      };
      e.h = createHook(createCache(), e);
    }

    return e.h.apply(c, a);
  };

  var unrollHole =
  /*async*/
  function unrollHole(info, _ref2) {
    var values = _ref2.values;

    /*await*/
    unrollValues(info, values);
  };

  var unrollValues =
  /*async*/
  function unrollValues(info, values) {
    var s = info.s,
        length = values.length;

    for (var i = 0; i < length; i++) {
      var hook =
      /*await*/
      values[i];
      if (hook instanceof Hook) values[i] =
      /*await*/
      unroll(s[i] || (s[i] = createCache()), hook);else if (hook instanceof Hole)
        /*await*/
        unrollHole(s[i] || (s[i] = createCache()), hook);else if (isArray(hook))
        /*await*/
        unrollValues(s[i] || (s[i] = createCache()), hook);else s[i] = null;
    }

    if (length < s.length) s.splice(length);
  };

  var view = function view(e, _ref3) {
    var type = _ref3.type,
        template = _ref3.template,
        values = _ref3.values;
    return (type === 'svg' ? svg$1 : html$1)["for"](e, type).apply(void 0, [template].concat(_toConsumableArray(values)));
  };

  function Component(f) {
    return function () {
      return new Hook(f, this, arguments);
    };
  }

  function Hook(f, c, a) {
    this.f = f;
    this.c = c;
    this.a = a;
  }

  function createFor(uhtml) {
    var cache = umap(new WeakMap());
    return function (e, id) {
      var store = cache.get(e) || cache.set(e, create(null));
      var info = store[id] || (store[id] = createCache());
      return (
        /*async*/
        function (template) {
          for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            values[_key3 - 1] = arguments[_key3];
          }

          /*await*/
          unrollValues(info, values);
          return uhtml["for"](e, id).apply(void 0, [template].concat(values));
        }
      );
    };
  }

  exports.Component = Component;
  exports.createContext = createContext;
  exports.html = html;
  exports.render = render;
  exports.svg = svg;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useEffect = useEffect;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;

  return exports;

})({});
