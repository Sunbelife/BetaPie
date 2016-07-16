/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
!
function(window, undefined) {
    function isArraylike(obj) {
        var length = obj.length,
        type = jQuery.type(obj);
        return jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj)
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(core_rnotwhite) || [],
        function(_, flag) {
            object[flag] = !0
        }),
        object
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando,
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache: elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || data !== undefined || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = core_deletedIds.pop() || jQuery.guid++:internalKey),
            cache[id] || (cache[id] = isNode ? {}: {
                toJSON: jQuery.noop
            }),
            ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)),
            thisCache = cache[id],
            pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data),
            data !== undefined && (thisCache[jQuery.camelCase(name)] = data),
            "string" == typeof name ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache,
            ret
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType,
            cache = isNode ? jQuery.cache: elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" ")),
                    i = name.length;
                    for (; i--;) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return
                } (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
            }
        }
    }
    function dataAttr(elem, key, data) {
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null: +data + "" === data ? +data: rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch(e) {}
                jQuery.data(elem, key, data)
            } else data = undefined
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return ! 1;
        return ! 0
    }
    function returnTrue() {
        return ! 0
    }
    function returnFalse() {
        return ! 1
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch(err) {}
    }
    function sibling(cur, dir) {
        do cur = cur[dir];
        while (cur && 1 !== cur.nodeType);
        return cur
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements,
        function(elem, i) {
            return !! qualifier.call(elem, i, elem) !== not
        });
        if (qualifier.nodeType) return jQuery.grep(elements,
        function(elem) {
            return elem === qualifier !== not
        });
        if ("string" == typeof qualifier) {
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements,
        function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not
        })
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
        safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (; list.length;) safeFrag.createElement(list.pop());
        return safeFrag
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(1 === content.nodeType ? content: content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type,
        elem
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"),
        elem
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
            if (events) {
                delete curData.handle,
                curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
            }
            curData.data && (curData.data = jQuery.extend({},
            curData.data))
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando)
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && manipulation_rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected: ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
        }
    }
    function getAll(context, tag) {
        var elems, elem, i = 0,
        found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) ! tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
    }
    function fixDefaultChecked(elem) {
        manipulation_rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;) if (name = cssPrefixes[i] + capName, name in style) return name;
        return origName
    }
    function isHidden(elem, el) {
        return elem = el || elem,
        "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index],
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display: jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index],
        elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "": "none"));
        return elements
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border": "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2)"margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)),
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0,
        val = "width" === name ? elem.offsetWidth: elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]),
            val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border": "content"), valueIsBorderBox, styles) + "px"
    }
    function css_defaultDisplay(nodeName) {
        var doc = document,
        display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write("<!doctype html><html><body>"), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display),
        display
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
        return elem.remove(),
        display
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj,
        function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i: "") + "]", v, traditional, add)
        });
        else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
        else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0,
            dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func)) for (; dataType = dataTypes[i++];)"+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0,
            jQuery.each(structure[dataType] || [],
            function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
            }),
            selected
        }
        var inspected = {},
        seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) src[key] !== undefined && ((flatOptions[key] ? target: deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep),
        target
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents,
        dataTypes = s.dataTypes;
        "*" === dataTypes[0];) dataTypes.shift(),
        ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {},
        dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current;) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift()) if ("*" === current) current = prev;
        else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                break
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response);
            else try {
                response = conv(response)
            } catch(e) {
                return {
                    state: "parsererror",
                    error: conv ? e: "No conversion from " + prev + " to " + current
                }
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest
        } catch(e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch(e) {}
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }),
        fxNow = jQuery.now()
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }),
        tick = function() {
            if (stopped) return ! 1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]),
            1 > percent && length ? remaining: (deferred.resolveWith(elem, [animation]), !1)
        },
        animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({},
            properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            },
            options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween),
                tween
            },
            stop: function(gotoEnd) {
                var index = 0,
                length = gotoEnd ? animation.tweens.length: 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]),
                this
            }
        }),
        props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation),
        jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation),
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })),
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
            value = hooks.expand(value),
            delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
        } else specialEasing[name] = easing
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--,
                jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })),
        1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")),
        opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.always(function() {
            style.overflow = opts.overflow[0],
            style.overflowX = opts.overflow[1],
            style.overflowY = opts.overflow[2]
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide": "show")) continue;
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
        }
        if (!jQuery.isEmptyObject(orig)) {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}),
            toggle && (dataShow.hidden = !hidden),
            hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }),
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop])
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim),
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        },
        i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i],
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type),
        attrs
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem: 9 === elem.nodeType ? elem.defaultView || elem.parentWindow: !1
    }
    var readyList, rootjQuery, core_strundefined = typeof undefined,
    location = window.location,
    document = window.document,
    docElem = document.documentElement,
    _jQuery = window.jQuery,
    _$ = window.$,
    class2type = {},
    core_deletedIds = [],
    core_version = "1.10.2",
    core_concat = core_deletedIds.concat,
    core_push = core_deletedIds.push,
    core_slice = core_deletedIds.slice,
    core_indexOf = core_deletedIds.indexOf,
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty,
    core_trim = core_version.trim,
    jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery)
    },
    core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    core_rnotwhite = /\S+/g,
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    rvalidchars = /^[\],:{}\s]*$/,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function(all, letter) {
        return letter.toUpperCase()
    },
    completed = function(event) { (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), jQuery.ready())
    },
    detach = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), window.detachEvent("onload", completed))
    };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return ! context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context: document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this
                }
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    this.length = 1,
                    this[0] = elem
                }
                return this.context = document,
                this.selector = selector,
                this
            }
            return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(num) {
            return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num]
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this,
            ret.context = this.context,
            ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        ready: function(fn) {
            return jQuery.ready.promise().done(fn),
            this
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(i) {
            var len = this.length,
            j = +i + (0 > i ? len: 0);
            return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this,
            function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    },
    jQuery.fn.init.prototype = jQuery.fn,
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[1] || {},
        i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name],
        copy = options[name],
        target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src: []) : clone = src && jQuery.isPlainObject(src) ? src: {},
        target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target
    },
    jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(deep) {
            return window.$ === jQuery && (window.$ = _$),
            deep && window.jQuery === jQuery && (window.jQuery = _jQuery),
            jQuery
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++:jQuery.ready(!0)
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait: !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0,
                wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"))
            }
        },
        isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },
        isArray: Array.isArray ||
        function(obj) {
            return "array" === jQuery.type(obj)
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window
        },
        isNumeric: function(obj) {
            return ! isNaN(parseFloat(obj)) && isFinite(obj)
        },
        type: function(obj) {
            return null == obj ? String(obj) : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object": typeof obj
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return ! 1;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(e) {
                return ! 1
            }
            if (jQuery.support.ownLast) for (key in obj) return core_hasOwn.call(obj, key);
            for (key in obj);
            return key === undefined || core_hasOwn.call(obj, key)
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return ! 1;
            return ! 0
        },
        error: function(msg) {
            throw new Error(msg)
        },
        parseHTML: function(data, context, keepScripts) {
            if (!data || "string" != typeof data) return null;
            "boolean" == typeof context && (keepScripts = context, context = !1),
            context = context || document;
            var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];
            return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
        },
        parseJSON: function(data) {
            return window.JSON && window.JSON.parse ? window.JSON.parse(data) : null === data ? data: "string" == typeof data && (data = jQuery.trim(data), data && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
            } catch(e) {
                xml = undefined
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data),
            xml
        },
        noop: function() {},
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript ||
            function(data) {
                window.eval.call(window, data)
            })(data)
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var value, i = 0,
            length = obj.length,
            isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
                else for (i in obj) if (value = callback.apply(obj[i], args), value === !1) break
            } else if (isArray) for (; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
            else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), value === !1) break;
            return obj
        },
        trim: core_trim && !core_trim.call("\ufeff\xa0") ?
        function(text) {
            return null == text ? "": core_trim.call(text)
        }: function(text) {
            return null == text ? "": (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : core_push.call(ret, arr)),
            ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i: 0; len > i; i++) if (i in arr && arr[i] === elem) return i
            }
            return - 1
        },
        merge: function(first, second) {
            var l = second.length,
            i = first.length,
            j = 0;
            if ("number" == typeof l) for (; l > j; j++) first[i++] = second[j];
            else for (; second[j] !== undefined;) first[i++] = second[j++];
            return first.length = i,
            first
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [],
            i = 0,
            length = elems.length;
            for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i),
            inv !== retVal && ret.push(elems[i]);
            return ret
        },
        map: function(elems, callback, arg) {
            var value, i = 0,
            length = elems.length,
            isArray = isArraylike(elems),
            ret = [];
            if (isArray) for (; length > i; i++) value = callback(elems[i], i, arg),
            null != value && (ret[ret.length] = value);
            else for (i in elems) value = callback(elems[i], i, arg),
            null != value && (ret[ret.length] = value);
            return core_concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp),
            jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)))
            },
            proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined
        },
        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
            length = elems.length,
            bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
            } else if (value !== undefined && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                return bulk.call(jQuery(elem), value)
            })), fn)) for (; length > i; i++) fn(elems[i], key, raw ? value: value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems: bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name],
            elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret
        }
    }),
    jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready);
        else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1),
        window.addEventListener("load", completed, !1);
        else {
            document.attachEvent("onreadystatechange", completed),
            window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement
            } catch(e) {}
            top && top.doScroll && !
            function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left")
                    } catch(e) {
                        return setTimeout(doScrollCheck, 50)
                    }
                    detach(),
                    jQuery.ready()
                }
            } ()
        }
        return readyList.promise(obj)
    },
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    }),
    rootjQuery = jQuery(document),
    /*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
    function(window, undefined) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context: preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem),
                        results
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem),
                    results
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)),
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)),
                    results
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && context.parentNode || context,
                        newSelector = groups.join(",")
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)),
                        results
                    } catch(qsaError) {} finally {
                        old || context.removeAttribute("id")
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key += " ") > Expr.cacheLength && delete cache[keys.shift()],
                cache[key] = value
            }
            var keys = [];
            return cache
        }
        function markFunction(fn) {
            return fn[expando] = !0,
            fn
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !! fn(div)
            } catch(e) {
                return ! 1
            } finally {
                div.parentNode && div.parentNode.removeChild(div),
                div = null
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
        }
        function siblingCheck(a, b) {
            var cur = b && a,
            diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (; cur = cur.nextSibling;) if (cur === b) return - 1;
            return a ? 1 : -1
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument,
                markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                })
            })
        }
        function setFilters() {}
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) { (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])),
                matched = !1,
                (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) ! (match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break
            }
            return parseOnly ? soFar.length: soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        function toSelector(tokens) {
            for (var i = 0,
            len = tokens.length,
            selector = ""; len > i; i++) selector += tokens[i].value;
            return selector
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
            checkNonElements = base && "parentNode" === dir,
            doneName = done++;
            return combinator.first ?
            function(elem, context, xml) {
                for (; elem = elem[dir];) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
            }: function(elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    for (; elem = elem[dir];) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return ! 0
                } else for (; elem = elem[dir];) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), (cache = outerCache[dir]) && cache[0] === dirkey) {
                    if ((data = cache[1]) === !0 || data === cachedruns) return data === !0
                } else if (cache = outerCache[dir] = [dirkey], cache[1] = matcher(elem, context, xml) || cachedruns, cache[1] === !0) return ! 0
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ?
            function(elem, context, xml) {
                for (var i = matchers.length; i--;) if (!matchers[i](elem, context, xml)) return ! 1;
                return ! 0
            }: matchers[0]
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)),
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)),
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                postMap = [],
                preexisting = results.length,
                elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                matcherIn = !preFilter || !seed && selector ? elems: condense(elems, preMap, preFilter, context, xml),
                matcherOut = matcher ? postFinder || (seed ? preFilter: preexisting || postFilter) ? [] : results: matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut),
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
            })
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length,
            leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            },
            implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1
            },
            implicitRelative, !0), matchers = [function(elem, context, xml) {
                return ! leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
            }]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
            else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*": ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                }
                matchers.push(matcher)
            }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0,
            bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [],
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                outermost = null != expandContext,
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                for (outermost && (outermostContext = context !== document && context, cachedruns = matcherCachedRuns); null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++];) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break
                        }
                        outermost && (dirruns = dirrunsUnique, cachedruns = ++matcherCachedRuns)
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched),
                    outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup),
                unmatched
            };
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0,
            len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results
        }
        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                    selector = selector.slice(tokens.shift().value.length)
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i--&&(token = tokens[i], !Expr.relative[type = token.type]);) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed),
                    results;
                    break
                }
            }
            return compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector)),
            results
        }
        var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        hasDuplicate = !1,
        sortOrder = function(a, b) {
            return a === b ? (hasDuplicate = !0, 0) : 0
        },
        strundefined = typeof undefined,
        MAX_NEGATIVE = 1 << 31,
        hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = arr.indexOf ||
        function(elem) {
            for (var i = 0,
            len = this.length; len > i; i++) if (this[i] === elem) return i;
            return - 1
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        identifier = characterEncoding.replace("w", "w#"),
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
        pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rsibling = new RegExp(whitespace + "*[+~]"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped: 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes),
            arr[preferredDoc.childNodes.length].nodeType
        } catch(e) {
            push = {
                apply: arr.length ?
                function(target, els) {
                    push_native.apply(target, slice.call(els))
                }: function(target, els) {
                    for (var j = target.length,
                    i = 0; target[j++] = els[i++];);
                    target.length = j - 1
                }
            }
        }
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName: !1
        },
        support = Sizzle.support = {},
        setDocument = Sizzle.setDocument = function(node) {
            var doc = node ? node.ownerDocument || node: preferredDoc,
            parent = doc.defaultView;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent.attachEvent && parent !== parent.top && parent.attachEvent("onbeforeunload",
            function() {
                setDocument()
            }), support.attributes = assert(function(div) {
                return div.className = "i",
                !div.getAttribute("className")
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")),
                !div.getElementsByTagName("*").length
            }), support.getElementsByClassName = assert(function(div) {
                return div.innerHTML = "<div class='a'></div><div class='a i'></div>",
                div.firstChild.className = "i",
                2 === div.getElementsByClassName("i").length
            }), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando,
                !doc.getElementsByName || !doc.getElementsByName(expando).length
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [m] : []
                }
            },
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId
                }
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId
                }
            }), Expr.find.TAG = support.getElementsByTagName ?
            function(tag, context) {
                return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
            }: function(tag, context) {
                var elem, tmp = [],
                i = 0,
                results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                    return tmp
                }
                return results
            },
            Expr.find.CLASS = support.getElementsByClassName &&
            function(className, context) {
                return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
            },
            rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>",
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"),
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"),
                div.appendChild(input).setAttribute("t", ""),
                div.querySelectorAll("[t^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"),
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"),
                div.querySelectorAll("*,:x"),
                rbuggyQSA.push(",.*:")
            })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"),
                matches.call(div, "[s!='']:x"),
                rbuggyMatches.push("!=", pseudos)
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ?
            function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement: a,
                bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
            }: function(a, b) {
                if (b) for (; b = b.parentNode;) if (b === a) return ! 0;
                return ! 1
            },
            sortOrder = docElem.compareDocumentPosition ?
            function(a, b) {
                if (a === b) return hasDuplicate = !0,
                0;
                var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                return compare ? 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            }: function(a, b) {
                var cur, i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [a],
                bp = [b];
                if (a === b) return hasDuplicate = !0,
                0;
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                for (; ap[i] === bp[i];) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            },
            doc) : document
        },
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        },
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
            } catch(e) {}
            return Sizzle(expr, document, null, [elem]).length > 0
        },
        Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context),
            contains(context, elem)
        },
        Sizzle.attr = function(elem, name) { (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()],
            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value: null: val
        },
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        },
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [],
            j = 0,
            i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                for (; j--;) results.splice(duplicates[j], 1)
            }
            return results
        },
        getText = Sizzle.getText = function(elem) {
            var node, ret = "",
            i = 0,
            nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
            } else for (; node = elem[i]; i++) ret += getText(node);
            return ret
        },
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape),
                    match[3] = (match[4] || match[5] || "").replace(runescape, funescape),
                    "~=" === match[2] && (match[3] = " " + match[3] + " "),
                    match.slice(0, 4)
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(),
                    "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]),
                    match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null: (match[3] && match[4] !== undefined ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ?
                    function() {
                        return ! 0
                    }: function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className,
                    function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator: operator ? (result += "", "=" === operator ? result === check: "!=" === operator ? result !== check: "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice( - check.length) === check: "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-": !1) : !0
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3),
                    forward = "last" !== type.slice( - 4),
                    ofType = "of-type" === what;
                    return 1 === first && 0 === last ?
                    function(elem) {
                        return !! elem.parentNode
                    }: function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling": "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (; dir;) {
                                    for (node = elem; node = node[dir];) if (ofType ? node.nodeName.toLowerCase() === name: 1 === node.nodeType) return ! 1;
                                    start = dir = "only" === type && !start && "nextSibling"
                                }
                                return ! 0
                            }
                            if (start = [forward ? parent.firstChild: parent.lastChild], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [dirruns, nodeIndex, diff];
                                    break
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                            else for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name: 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                            return diff -= last,
                            diff === first || diff % first === 0 && diff / first >= 0
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]),
                        seed[idx] = !(matches[idx] = matched[i])
                    }) : function(elem) {
                        return fn(elem, 0, args)
                    }) : fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [],
                    results = [],
                    matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function(elem, context, xml) {
                        return input[0] = elem,
                        matcher(input, null, xml, results),
                        !results.pop()
                    }
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang),
                    lang = lang.replace(runescape, funescape).toLowerCase(),
                    function(elem) {
                        var elemLang;
                        do
                        if (elemLang = documentIsHTML ? elem.lang: elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(),
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                        while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return ! 1
                    }
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return elem.disabled === !1
                },
                disabled: function(elem) {
                    return elem.disabled === !0
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex,
                    elem.selected === !0
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return ! 1;
                    return ! 0
                },
                parent: function(elem) {
                    return ! Expr.pseudos.empty(elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type)
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0 > argument ? argument + length: argument]
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length: argument; --i >= 0;) matchIndexes.push(i);
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length: argument; ++i < length;) matchIndexes.push(i);
                    return matchIndexes
                })
            }
        },
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        setFilters.prototype = Expr.filters = Expr.pseudos,
        Expr.setFilters = new setFilters,
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--;) cached = matcherFromTokens(group[i]),
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        },
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando,
        support.detectDuplicates = hasDuplicate,
        setDocument(),
        support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"))
        }),
        assert(function(div) {
            return div.innerHTML = "<a href='#'></a>",
            "#" === div.firstChild.getAttribute("href")
        }) || addHandle("type|href|height|width",
        function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
        }),
        support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>",
            div.firstChild.setAttribute("value", ""),
            "" === div.firstChild.getAttribute("value")
        }) || addHandle("value",
        function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
        }),
        assert(function(div) {
            return null == div.getAttribute("disabled")
        }) || addHandle(booleans,
        function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : (val = elem.getAttributeNode(name)) && val.specified ? val.value: elem[name] === !0 ? name.toLowerCase() : null
        }),
        jQuery.find = Sizzle,
        jQuery.expr = Sizzle.selectors,
        jQuery.expr[":"] = jQuery.expr.pseudos,
        jQuery.unique = Sizzle.uniqueSort,
        jQuery.text = Sizzle.getText,
        jQuery.isXMLDoc = Sizzle.isXML,
        jQuery.contains = Sizzle.contains
    } (window);
    var optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({},
        options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
        stack = !options.once && [],
        fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break
            }
            firing = !1,
            list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
        },
        self = {
            add: function() {
                if (list) {
                    var start = list.length; !
                    function add(args) {
                        jQuery.each(args,
                        function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                        })
                    } (arguments),
                    firing ? firingLength = list.length: memory && (firingStart = start, fire(memory))
                }
                return this
            },
            remove: function() {
                return list && jQuery.each(arguments,
                function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1),
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                }),
                this
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
            },
            empty: function() {
                return list = [],
                firingLength = 0,
                this
            },
            disable: function() {
                return list = stack = memory = undefined,
                this
            },
            disabled: function() {
                return ! list
            },
            lock: function() {
                return stack = undefined,
                memory || self.disable(),
                this
            },
            locked: function() {
                return ! stack
            },
            fireWith: function(context, args) {
                return ! list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)),
                this
            },
            fire: function() {
                return self.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! fired
            }
        };
        return self
    },
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
            state = "pending",
            promise = {
                state: function() {
                    return state
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples,
                        function(i, tuple) {
                            var action = tuple[0],
                            fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                            })
                        }),
                        fns = null
                    }).promise()
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise
                }
            },
            deferred = {};
            return promise.pipe = promise.then,
            jQuery.each(tuples,
            function(i, tuple) {
                var list = tuple[2],
                stateString = tuple[3];
                promise[tuple[1]] = list.add,
                stateString && list.add(function() {
                    state = stateString
                },
                tuples[1 ^ i][2].disable, tuples[2][2].lock),
                deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise: this, arguments),
                    this
                },
                deferred[tuple[0] + "With"] = list.fireWith
            }),
            promise.promise(deferred),
            func && func.call(deferred, deferred),
            deferred
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0,
            resolveValues = core_slice.call(arguments),
            length = resolveValues.length,
            remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length: 0,
            deferred = 1 === remaining ? subordinate: jQuery.Deferred(),
            updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this,
                    values[i] = arguments.length > 1 ? core_slice.call(arguments) : value,
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                }
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues),
            deferred.promise()
        }
    }),
    jQuery.support = function(support) {
        var all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
        if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*") || [], a = div.getElementsByTagName("a")[0], !a || !a.style || !all.length) return support;
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option")),
        input = div.getElementsByTagName("input")[0],
        a.style.cssText = "top:1px;float:left;opacity:.5",
        support.getSetAttribute = "t" !== div.className,
        support.leadingWhitespace = 3 === div.firstChild.nodeType,
        support.tbody = !div.getElementsByTagName("tbody").length,
        support.htmlSerialize = !!div.getElementsByTagName("link").length,
        support.style = /top/.test(a.getAttribute("style")),
        support.hrefNormalized = "/a" === a.getAttribute("href"),
        support.opacity = /^0.5/.test(a.style.opacity),
        support.cssFloat = !!a.style.cssFloat,
        support.checkOn = !!input.value,
        support.optSelected = opt.selected,
        support.enctype = !!document.createElement("form").enctype,
        support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
        support.inlineBlockNeedsLayout = !1,
        support.shrinkWrapBlocks = !1,
        support.pixelPosition = !1,
        support.deleteExpando = !0,
        support.noCloneEvent = !0,
        support.reliableMarginRight = !0,
        support.boxSizingReliable = !0,
        input.checked = !0,
        support.noCloneChecked = input.cloneNode(!0).checked,
        select.disabled = !0,
        support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch(e) {
            support.deleteExpando = !1
        }
        input = document.createElement("input"),
        input.setAttribute("value", ""),
        support.input = "" === input.getAttribute("value"),
        input.value = "t",
        input.setAttribute("type", "radio"),
        support.radioValue = "t" === input.value,
        input.setAttribute("checked", "t"),
        input.setAttribute("name", "t"),
        fragment = document.createDocumentFragment(),
        fragment.appendChild(input),
        support.appendChecked = input.checked,
        support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked,
        div.attachEvent && (div.attachEvent("onclick",
        function() {
            support.noCloneEvent = !1
        }), div.cloneNode(!0).click());
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) div.setAttribute(eventName = "on" + i, "t"),
        support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === !1;
        div.style.backgroundClip = "content-box",
        div.cloneNode(!0).style.backgroundClip = "",
        support.clearCloneStyle = "content-box" === div.style.backgroundClip;
        for (i in jQuery(support)) break;
        return support.ownLast = "0" !== i,
        jQuery(function() {
            var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", body.appendChild(container).appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", jQuery.swap(body, null != body.style.zoom ? {
                zoom: 1
            }: {},
            function() {
                support.boxSizing = 4 === div.offsetWidth
            }), window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, marginDiv = div.appendChild(document.createElement("div")), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), typeof div.style.zoom !== core_strundefined && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, support.inlineBlockNeedsLayout && (body.style.zoom = 1)), body.removeChild(container), container = div = tds = marginDiv = null)
        }),
        all = select = fragment = opt = a = input = null,
        support
    } ({});
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando],
            !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data)
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name)
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0)
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0)
        },
        acceptData: function(elem) {
            if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) return ! 1;
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return ! noData || noData !== !0 && elem.getAttribute("classid") === noData
        }
    }),
    jQuery.fn.extend({
        data: function(key, value) {
            var attrs, name, data = null,
            i = 0,
            elem = this[0];
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attrs = elem.attributes; i < attrs.length; i++) name = attrs[i].name,
                    0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key)
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value)
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    }),
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks(elem, type),
            next = function() {
                jQuery.dequeue(elem, type)
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--),
            fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)),
            !startLength && hooks && hooks.empty.fire()
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"),
                    jQuery._removeData(elem, key)
                })
            })
        }
    }),
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--),
            arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this: this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type),
                "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        delay: function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time: time,
            type = type || "fx",
            this.queue(type,
            function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function() {--count || defer.resolveWith(elements, [elements])
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--;) tmp = jQuery._data(elements[i], type + "queueHooks"),
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(),
            defer.promise(obj)
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g,
    rreturn = /\r/g,
    rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = jQuery.support.getSetAttribute,
    getSetInput = jQuery.support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name,
            this.each(function() {
                try {
                    this[name] = undefined,
                    delete this[name]
                } catch(e) {}
            })
        },
        addClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0,
            len = this.length,
            proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className))
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                elem.className = jQuery.trim(cur)
            }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0,
            len = this.length,
            proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className))
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++];) for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                elem.className = value ? jQuery.trim(cur) : ""
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ?
            function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            }: function() {
                if ("string" === type) for (var className, i = 0,
                self = jQuery(this), classNames = value.match(core_rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else(type === core_strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || value === !1 ? "": jQuery._data(this, "__className__") || "")
            })
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ",
            i = 0,
            l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return ! 0;
            return ! 1
        },
        val: function(value) {
            var ret, hooks, isFunction, elem = this[0]; {
                if (arguments.length) return isFunction = jQuery.isFunction(value),
                this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "": "number" == typeof val ? val += "": jQuery.isArray(val) && (val = jQuery.map(val,
                    function(value) {
                        return null == value ? "": value + ""
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()],
                hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret: (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "": ret)
            }
        }
    }),
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val: elem.text
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options,
                    index = elem.selectedIndex,
                    one = "select-one" === elem.type || 0 > index,
                    values = one ? null: [], max = one ? index + 1 : options.length, i = 0 > index ? max: one ? index: 0; max > i; i++) if (option = options[i], !(!option.selected && i !== index || (jQuery.support.optDisabled ? option.disabled: null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value)
                    }
                    return values
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options,
                    values = jQuery.makeArray(value), i = options.length; i--;) option = options[i],
                    (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1),
                    values
                }
            }
        },
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === core_strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook: nodeHook)), value === undefined ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret: (ret = jQuery.find.attr(elem, name), null == ret ? undefined: ret) : null !== value ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret: (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0,
            attrNames = value && value.match(core_rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name,
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""),
            elem.removeAttribute(getSetAttribute ? name: propName)
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value),
                        val && (elem.value = val),
                        value
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem),
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]),
            value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret: elem[name] = value: hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret: elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                }
            }
        }
    }),
    boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0,
            name
        }
    },
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),
    function(i, name) {
        var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
        jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
        function(elem, name, isXML) {
            var fn = jQuery.expr.attrHandle[name],
            ret = isXML ? undefined: (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
            return jQuery.expr.attrHandle[name] = fn,
            ret
        }: function(elem, name, isXML) {
            return isXML ? undefined: elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
        }
    }),
    getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void(elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name)
        }
    }),
    getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)),
            ret.value = value += "",
            "value" === name || value === elem.getAttribute(name) ? value: undefined
        }
    },
    jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? undefined: (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value: null
    },
    jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value: undefined
        },
        set: nodeHook.set
    },
    jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name)
        }
    },
    jQuery.each(["width", "height"],
    function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0
            }
        }
    })),
    jQuery.support.hrefNormalized || jQuery.each(["href", "src"],
    function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4)
            }
        }
    }),
    jQuery.support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || undefined
        },
        set: function(elem, value) {
            return elem.style.cssText = value + ""
        }
    }),
    jQuery.support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex),
            null
        }
    }),
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function() {
        jQuery.propFix[this.toLowerCase()] = this
    }),
    jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"),
    jQuery.each(["radio", "checkbox"],
    function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
            }
        },
        jQuery.support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on": elem.value
        })
    });
    var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === core_strundefined || e && jQuery.event.triggered === e.type ? undefined: jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                },
                eventHandle.elem = elem), types = (types || "").match(core_rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [],
                type = origType = tmp[1],
                namespaces = (tmp[2] || "").split(".").sort(),
                type && (special = jQuery.event.special[type] || {},
                type = (selector ? special.delegateType: special.bindType) || type, special = jQuery.event.special[type] || {},
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                },
                handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0);
                elem = null
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(core_rnotwhite) || [""], t = types.length; t--;) if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {},
                    type = (selector ? special.delegateType: special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j],
                    !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"))
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
            type = core_hasOwn.call(event, "type") ? event.type: event,
            namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event: new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = undefined, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {},
            onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur),
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType: special.bindType || type,
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"),
                handle && handle.apply(cur, data),
                handle = ontype && cur[ontype],
                handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype],
                    tmp && (elem[ontype] = null),
                    jQuery.event.triggered = type;
                    try {
                        elem[type]()
                    } catch(e) {}
                    jQuery.event.triggered = undefined,
                    tmp && (elem[ontype] = tmp)
                }
                return event.result
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [],
            args = core_slice.call(arguments),
            handlers = (jQuery._data(this, "events") || {})[event.type] || [],
            special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped();) for (event.currentTarget = matched.elem, j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), ret !== undefined && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event),
                event.result
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [],
            delegateCount = handlers.delegateCount,
            cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (; cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i],
                sel = handleObj.selector + " ",
                matches[sel] === undefined && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length),
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                })
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }),
            handlerQueue
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type,
            originalEvent = event,
            fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks: rkeyEvent.test(type) ? this.keyHooks: {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i],
            event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document),
            3 === event.target.nodeType && (event.target = event.target.parentNode),
            event.metaKey = !!event.metaKey,
            fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode: original.keyCode),
                event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button,
                fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement: fromElement),
                event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0),
                event
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(),
                        !1
                    } catch(e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    event.result !== undefined && (event.originalEvent.returnValue = event.result)
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e),
            e.isDefaultPrevented() && event.preventDefault()
        }
    },
    jQuery.removeEvent = document.removeEventListener ?
    function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    }: function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === core_strundefined && (elem[name] = null), elem.detachEvent(name, handle))
    },
    jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue: returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
    },
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue,
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue,
            this.stopPropagation()
        }
    },
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                related = event.relatedTarget,
                handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix),
                ret
            }
        }
    }),
    jQuery.support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit",
            function(e) {
                var elem = e.target,
                form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form: undefined;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit",
                function(event) {
                    event._submit_bubble = !0
                }), jQuery._data(form, "submitBubbles", !0))
            })
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit")
        }
    }),
    jQuery.support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change",
            function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
            }), jQuery.event.add(this, "click._change",
            function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1),
                jQuery.event.simulate("change", this, event, !0)
            })), !1) : void jQuery.event.add(this, "beforeactivate._change",
            function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change",
                function(event) { ! this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                }), jQuery._data(elem, "changeBubbles", !0))
            })
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"),
            !rformElems.test(this.nodeName)
        }
    }),
    jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(orig, fix) {
        var attaches = 0,
        handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        };
        jQuery.event.special[fix] = {
            setup: function() {
                0 === attaches++&&document.addEventListener(orig, handler, !0)
            },
            teardown: function() {
                0 === --attaches && document.removeEventListener(orig, handler, !0)
            }
        }
    }),
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = undefined);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this
            }
            if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse;
            else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event),
                origFn.apply(this, arguments)
            },
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)),
            this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj,
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace: handleObj.origType, handleObj.selector, handleObj.handler),
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined),
            fn === !1 && (fn = returnFalse),
            this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/,
    rparentsprev = /^(?:parents|prev(?:Until|All))/,
    rneedsContext = jQuery.expr.match.needsContext,
    guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [],
            self = this,
            len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return ! 0
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret),
            ret.selector = this.selector ? this.selector + " " + selector: selector,
            ret
        },
        has: function(target) {
            var i, targets = jQuery(target, this),
            len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return ! 0
            })
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0))
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1))
        },
        is: function(selector) {
            return !! winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
        },
        closest: function(selectors, context) {
            for (var cur, i = 0,
            l = this.length,
            ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                cur = ret.push(cur);
                break
            }
            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret)
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
            all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all))
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject: this.prevObject.filter(selector))
        }
    }),
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent: null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document: jQuery.merge([], elem.childNodes)
        }
    },
    function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice( - 5) && (selector = until),
            selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)),
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())),
            this.pushStack(ret)
        }
    }),
    jQuery.extend({
        filter: function(expr, elems, not) {
            var elem = elems[0];
            return not && (expr = ":not(" + expr + ")"),
            1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems,
            function(elem) {
                return 1 === elem.nodeType
            }))
        },
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until));) 1 === cur.nodeType && matched.push(cur),
            cur = cur[dir];
            return matched
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    safeFragment = createSafeFragment(document),
    fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option,
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead,
    wrapMap.th = wrapMap.td,
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this,
            function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            },
            null, value, arguments.length)
        },
        append: function() {
            return this.domManip(arguments,
            function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments,
            function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments,
            function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
            function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
            })
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)),
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
            return this
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild;) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0)
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents,
            deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents: deepDataAndEvents,
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return jQuery.access(this,
            function(value) {
                var elem = this[0] || {},
                i = 0,
                l = this.length;
                if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if (! ("string" != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; l > i; i++) elem = this[i] || {},
                        1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                        elem = 0
                    } catch(e) {}
                }
                elem && this.empty().append(value)
            },
            null, value, arguments.length)
        },
        replaceWith: function() {
            var args = jQuery.map(this,
            function(elem) {
                return [elem.nextSibling, elem.parentNode]
            }),
            i = 0;
            return this.domManip(arguments,
            function(elem) {
                var next = args[i++],
                parent = args[i++];
                parent && (next && next.parentNode !== parent && (next = this.nextSibling), jQuery(this).remove(), parent.insertBefore(elem, next))
            },
            !0),
            i ? this: this.remove()
        },
        detach: function(selector) {
            return this.remove(selector, !0)
        },
        domManip: function(args, callback, allowIntersection) {
            args = core_concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0,
            l = this.length,
            set = this,
            iNoClone = l - 1,
            value = args[0],
            isFunction = jQuery.isFunction(value);
            if (isFunction || !(1 >= l || "string" != typeof value || jQuery.support.checkClone) && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())),
                self.domManip(args, callback, allowIntersection)
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, !allowIntersection && this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment,
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))),
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i],
                rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null
            }
            return this
        }
    }),
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0,
            ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this: this.clone(!0),
            jQuery(insert[i])[original](elems),
            core_push.apply(ret, elems.get());
            return this.pushStack(ret)
        }
    }),
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]);
            else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"),
            destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")),
            destElements = srcElements = node = null,
            clone
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
            safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
            else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !jQuery.support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp: tmp.firstChild, j = elem && elem.childNodes.length; j--;) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild;) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), jQuery.support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), i = 0; elem = nodes[i++];) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)) for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null,
            safe
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0,
            internalKey = jQuery.expando,
            cache = jQuery.cache,
            deleteExpando = jQuery.support.deleteExpando,
            special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== core_strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, core_deletedIds.push(id))
            }
        },
        _evalUrl: function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }),
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i))
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]),
                wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;) elem = elem.firstChild;
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ?
            function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            }: function() {
                var self = jQuery(this),
                contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/,
    rposition = /^(top|right|bottom|left)$/,
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rmargin = /^margin/,
    rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
    rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
    rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
    elemdisplay = {
        BODY: "block"
    },
    cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    },
    cssExpand = ["Top", "Right", "Bottom", "Left"],
    cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this,
            function(elem, name, value) {
                var len, styles, map = {},
                i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            },
            name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }),
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1": ret
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret: style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                    style[name] = value
                } catch(e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)),
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
            hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)),
            val === undefined && (val = curCSS(elem, name, styles)),
            "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]),
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
        }
    }),
    window.getComputedStyle ? (getStyles = function(elem) {
        return window.getComputedStyle(elem, null)
    },
    curCSS = function(elem, name, _computed) {
        var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
        ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
        style = elem.style;
        return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)),
        ret
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle
    },
    curCSS = function(elem, name, _computed) {
        var left, rs, rsLeft, computed = _computed || getStyles(elem),
        ret = computed ? computed[name] : undefined,
        style = elem.style;
        return null == ret && style && style[name] && (ret = style[name]),
        rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em": ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft)),
        "" === ret ? "auto": ret
    }),
    jQuery.each(["height", "width"],
    function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow,
                function() {
                    return getWidthOrHeight(elem, name, extra)
                }) : getWidthOrHeight(elem, name, extra) : void 0
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
            }
        }
    }),
    jQuery.support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter: elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": computed ? "1": ""
        },
        set: function(elem, value) {
            var style = elem.style,
            currentStyle = elem.currentStyle,
            opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")": "",
            filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1,
            (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
        }
    }),
    jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                return computed ? jQuery.swap(elem, {
                    display: "inline-block"
                },
                curCSS, [elem, "marginRight"]) : void 0
            }
        }),
        !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"],
        function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px": computed) : void 0
                }
            }
        })
    }),
    jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"))
    },
    jQuery.expr.filters.visible = function(elem) {
        return ! jQuery.expr.filters.hidden(elem)
    }),
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0,
                expanded = {},
                parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        },
        rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    });
    var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null: jQuery.isArray(val) ? jQuery.map(val,
                function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }),
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
        add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "": value,
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a,
        function() {
            add(this.name, this.value)
        });
        else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    },
    jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
    }),
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
    ajax_rquery = /\?/,
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    _load = jQuery.fn.load,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch(e) {
        ajaxLocation = document.createElement("a"),
        ajaxLocation.href = "",
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [],
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this,
        off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)),
        jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"),
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments,
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
        }).complete(callback &&
        function(jqXHR, status) {
            self.each(callback, response || [jqXHR.responseText, status, jqXHR])
        }),
        this
    },
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
    function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    }),
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent": 304 === status ? statusText = "notmodified": (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess": "ajaxError", [jqXHR, s, isSuccess ? success: error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url, url = undefined),
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({},
            options),
            callbackContext = s.context || s,
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks("once memory"),
            statusCode = s.statusCode || {},
            requestHeaders = {},
            requestHeadersNames = {},
            state = 0,
            strAbort = "canceled",
            jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return null == match ? null: match
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString: null
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value),
                    this
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type),
                    this
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [statusCode[code], map[code]];
                    else jqXHR.always(map[jqXHR.status]);
                    return this
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText),
                    done(0, finalText),
                    this
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80": "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80": "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global,
            fireGlobals && 0 === jQuery.active++&&jQuery.event.trigger("ajaxStart"),
            s.type = s.type.toUpperCase(),
            s.hasContent = !rnoContent.test(s.type),
            cacheURL = s.url,
            s.hasContent || (s.data && (cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&": "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&": "?") + "_=" + ajax_nonce++)),
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])),
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01": "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1,
                fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]),
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                },
                s.timeout));
                try {
                    state = 1,
                    transport.send(requestHeaders, done)
                } catch(e) {
                    if (! (2 > state)) throw e;
                    done( - 1, e)
                }
            } else done( - 1, "No Transport");
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        }
    }),
    jQuery.each(["get", "post"],
    function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined),
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            })
        }
    }),
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text),
                text
            }
        }
    }),
    jQuery.ajaxPrefilter("script",
    function(s) {
        s.cache === undefined && (s.cache = !1),
        s.crossDomain && (s.type = "GET", s.global = !1)
    }),
    jQuery.ajaxTransport("script",
    function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"),
                    script.async = !0,
                    s.scriptCharset && (script.charset = s.scriptCharset),
                    script.src = s.url,
                    script.onload = script.onreadystatechange = function(_, isAbort) { (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"))
                    },
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    script && script.onload(undefined, !0)
                }
            }
        }
    });
    var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[callback] = !0,
            callback
        }
    }),
    jQuery.ajaxPrefilter("json jsonp",
    function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url": "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (ajax_rquery.test(s.url) ? "&": "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"),
            responseContainer[0]
        },
        s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments
        },
        jqXHR.always(function() {
            window[callbackName] = overwritten,
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)),
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]),
            responseContainer = overwritten = undefined
        }), "script") : void 0
    });
    var xhrCallbacks, xhrSupported, xhrId = 0,
    xhrOnUnloadAbort = window.ActiveXObject &&
    function() {
        var key;
        for (key in xhrCallbacks) xhrCallbacks[key](undefined, !0)
    };
    jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    function() {
        return ! this.isLocal && createStandardXHR() || createActiveXHR()
    }: createStandardXHR,
    xhrSupported = jQuery.ajaxSettings.xhr(),
    jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported,
    xhrSupported = jQuery.support.ajax = !!xhrSupported,
    xhrSupported && jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType),
                    s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i])
                    } catch(err) {}
                    xhr.send(s.hasContent && s.data || null),
                    callback = function(_, isAbort) {
                        var status, responseHeaders, statusText, responses;
                        try {
                            if (callback && (isAbort || 4 === xhr.readyState)) if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort();
                            else {
                                responses = {},
                                status = xhr.status,
                                responseHeaders = xhr.getAllResponseHeaders(),
                                "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                try {
                                    statusText = xhr.statusText
                                } catch(e) {
                                    statusText = ""
                                }
                                status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                            }
                        } catch(firefoxAccessException) {
                            isAbort || complete( - 1, firefoxAccessException)
                        }
                        responses && complete(status, statusText, responses, responseHeaders)
                    },
                    s.async ? 4 === xhr.readyState ? setTimeout(callback) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {},
                    jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback()
                },
                abort: function() {
                    callback && callback(undefined, !0)
                }
            }
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
        "*": [function(prop, value) {
            var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "": "px"),
            start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3],
                parts = parts || [],
                start = +target || 1;
                do scale = scale || ".5",
                start /= scale,
                jQuery.style(tween.elem, prop, start + unit);
                while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]),
            tween
        }]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
            for (var prop, index = 0,
            length = props.length; length > index; index++) prop = props[index],
            tweeners[prop] = tweeners[prop] || [],
            tweeners[prop].unshift(callback)
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
        }
    }),
    jQuery.Tween = Tween,
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem,
            this.prop = prop,
            this.easing = easing || "swing",
            this.options = options,
            this.start = this.now = this.cur(),
            this.end = end,
            this.unit = unit || (jQuery.cssNumber[prop] ? "": "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent,
            this.now = (this.end - this.start) * eased + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this),
            this
        }
    },
    Tween.prototype.init.prototype = Tween.prototype,
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result: 0) : tween.elem[tween.prop]
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }
        }
    },
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    },
    jQuery.each(["toggle", "show", "hide"],
    function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }),
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            },
            speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
            optall = jQuery.speed(speed, easing, callback),
            doAnimation = function() {
                var anim = Animation(this, jQuery.extend({},
                prop), optall); (empty || jQuery._data(this, "finish")) && anim.stop(!0)
            };
            return doAnimation.finish = doAnimation,
            empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop,
                stop(gotoEnd)
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined),
            clearQueue && type !== !1 && this.queue(type || "fx", []),
            this.each(function() {
                var dequeue = !0,
                index = null != type && type + "queueHooks",
                timers = jQuery.timers,
                data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]);
                else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1)); (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
            })
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"),
            this.each(function() {
                var index, data = jQuery._data(this),
                queue = data[type + "queue"],
                hooks = data[type + "queueHooks"],
                timers = jQuery.timers,
                length = queue ? queue.length: 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish
            })
        }
    }),
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }),
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({},
        speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration: opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default,
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"),
        opt.old = opt.complete,
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this),
            opt.queue && jQuery.dequeue(this, opt.queue)
        },
        opt
    },
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return.5 - Math.cos(p * Math.PI) / 2
        }
    },
    jQuery.timers = [],
    jQuery.fx = Tween.prototype.init,
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers,
        i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i],
        timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(),
        fxNow = undefined
    },
    jQuery.fx.timer = function(timer) {
        timer() && jQuery.timers.push(timer) && jQuery.fx.start()
    },
    jQuery.fx.interval = 13,
    jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    },
    jQuery.fx.stop = function() {
        clearInterval(timerId),
        timerId = null
    },
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    jQuery.fx.step = {},
    jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers,
        function(fn) {
            return elem === fn.elem
        }).length
    }),
    jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this: this.each(function(i) {
            jQuery.offset.setOffset(this, options, i)
        });
        var docElem, win, box = {
            top: 0,
            left: 0
        },
        elem = this[0],
        doc = elem && elem.ownerDocument;
        if (doc) return docElem = doc.documentElement,
        jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== core_strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        }) : box
    },
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css(elem, "top"),
            curCSSLeft = jQuery.css(elem, "left"),
            calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
            props = {},
            curPosition = {};
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0),
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)),
            null != options.top && (props.top = options.top - curOffset.top + curTop),
            null != options.left && (props.left = options.left - curOffset.left + curLeft),
            "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }
    },
    jQuery.fn.extend({
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                },
                elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)),
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem
            })
        }
    }),
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this,
            function(elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void(win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val: jQuery(win).scrollTop()) : elem[method] = val)
            },
            method, val, arguments.length, null)
        }
    }),
    jQuery.each({
        Height: "height",
        Width: "width"
    },
    function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        },
        function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                extra = defaultExtra || (margin === !0 || value === !0 ? "margin": "border");
                return jQuery.access(this,
                function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                },
                type, chainable ? margin: undefined, chainable, null)
            }
        })
    }),
    jQuery.fn.size = function() {
        return this.length
    },
    jQuery.fn.andSelf = jQuery.fn.addBack,
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = jQuery: (window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define("jquery", [],
    function() {
        return jQuery
    }))
} (window),
function($, undefined) {
    $.rails !== undefined && $.error("jquery-ujs has already been loaded!");
    var rails, $document = $(document);
    $.rails = rails = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(xhr) {
            var token = $('meta[name="csrf-token"]').attr("content");
            token && xhr.setRequestHeader("X-CSRF-Token", token)
        },
        fire: function(obj, name, data) {
            var event = $.Event(name);
            return obj.trigger(event, data),
            event.result !== !1
        },
        confirm: function(message) {
            return confirm(message)
        },
        ajax: function(options) {
            return $.ajax(options)
        },
        href: function(element) {
            return element.attr("href")
        },
        handleRemote: function(element) {
            var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
            if (rails.fire(element, "ajax:before")) {
                if (elCrossDomain = element.data("cross-domain"), crossDomain = elCrossDomain === undefined ? null: elCrossDomain, withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType, element.is("form")) {
                    method = element.attr("method"),
                    url = element.attr("action"),
                    data = element.serializeArray();
                    var button = element.data("ujs:submit-button");
                    button && (data.push(button), element.data("ujs:submit-button", null))
                } else element.is(rails.inputChangeSelector) ? (method = element.data("method"), url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : element.is(rails.buttonClickSelector) ? (method = element.data("method") || "get", url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : (method = element.data("method"), url = rails.href(element), data = element.data("params") || null);
                options = {
                    type: method || "GET",
                    data: data,
                    dataType: dataType,
                    beforeSend: function(xhr, settings) {
                        return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script),
                        rails.fire(element, "ajax:beforeSend", [xhr, settings])
                    },
                    success: function(data, status, xhr) {
                        element.trigger("ajax:success", [data, status, xhr])
                    },
                    complete: function(xhr, status) {
                        element.trigger("ajax:complete", [xhr, status])
                    },
                    error: function(xhr, status, error) {
                        element.trigger("ajax:error", [xhr, status, error])
                    },
                    crossDomain: crossDomain
                },
                withCredentials && (options.xhrFields = {
                    withCredentials: withCredentials
                }),
                url && (options.url = url);
                var jqxhr = rails.ajax(options);
                return element.trigger("ajax:send", jqxhr),
                jqxhr
            }
            return ! 1
        },
        handleMethod: function(link) {
            var href = rails.href(link),
            method = link.data("method"),
            target = link.attr("target"),
            csrf_token = $("meta[name=csrf-token]").attr("content"),
            csrf_param = $("meta[name=csrf-param]").attr("content"),
            form = $('<form method="post" action="' + href + '"></form>'),
            metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
            csrf_param !== undefined && csrf_token !== undefined && (metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'),
            target && form.attr("target", target),
            form.hide().append(metadata_input).appendTo("body"),
            form.submit()
        },
        disableFormElements: function(form) {
            form.find(rails.disableSelector).each(function() {
                var element = $(this),
                method = element.is("button") ? "html": "val";
                element.data("ujs:enable-with", element[method]()),
                element[method](element.data("disable-with")),
                element.prop("disabled", !0)
            })
        },
        enableFormElements: function(form) {
            form.find(rails.enableSelector).each(function() {
                var element = $(this),
                method = element.is("button") ? "html": "val";
                element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")),
                element.prop("disabled", !1)
            })
        },
        allowAction: function(element) {
            var callback, message = element.data("confirm"),
            answer = !1;
            return message ? (rails.fire(element, "confirm") && (answer = rails.confirm(message), callback = rails.fire(element, "confirm:complete", [answer])), answer && callback) : !0
        },
        blankInputs: function(form, specifiedSelector, nonBlank) {
            var input, valueToCheck, inputs = $(),
            selector = specifiedSelector || "input,textarea",
            allInputs = form.find(selector);
            return allInputs.each(function() {
                if (input = $(this), valueToCheck = input.is("input[type=checkbox],input[type=radio]") ? input.is(":checked") : input.val(), !valueToCheck == !nonBlank) {
                    if (input.is("input[type=radio]") && allInputs.filter('input[type=radio]:checked[name="' + input.attr("name") + '"]').length) return ! 0;
                    inputs = inputs.add(input)
                }
            }),
            inputs.length ? inputs: !1
        },
        nonBlankInputs: function(form, specifiedSelector) {
            return rails.blankInputs(form, specifiedSelector, !0)
        },
        stopEverything: function(e) {
            return $(e.target).trigger("ujs:everythingStopped"),
            e.stopImmediatePropagation(),
            !1
        },
        disableElement: function(element) {
            element.data("ujs:enable-with", element.html()),
            element.html(element.data("disable-with")),
            element.bind("click.railsDisable",
            function(e) {
                return rails.stopEverything(e)
            })
        },
        enableElement: function(element) {
            element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), element.removeData("ujs:enable-with")),
            element.unbind("click.railsDisable")
        }
    },
    rails.fire($document, "rails:attachBindings") && ($.ajaxPrefilter(function(options, originalOptions, xhr) {
        options.crossDomain || rails.CSRFProtection(xhr)
    }), $document.delegate(rails.linkDisableSelector, "ajax:complete",
    function() {
        rails.enableElement($(this))
    }), $document.delegate(rails.linkClickSelector, "click.rails",
    function(e) {
        var link = $(this),
        method = link.data("method"),
        data = link.data("params");
        if (!rails.allowAction(link)) return rails.stopEverything(e);
        if (link.is(rails.linkDisableSelector) && rails.disableElement(link), link.data("remote") !== undefined) {
            if (! (!e.metaKey && !e.ctrlKey || method && "GET" !== method || data)) return ! 0;
            var handleRemote = rails.handleRemote(link);
            return handleRemote === !1 ? rails.enableElement(link) : handleRemote.error(function() {
                rails.enableElement(link)
            }),
            !1
        }
        return link.data("method") ? (rails.handleMethod(link), !1) : void 0
    }), $document.delegate(rails.buttonClickSelector, "click.rails",
    function(e) {
        var button = $(this);
        return rails.allowAction(button) ? (rails.handleRemote(button), !1) : rails.stopEverything(e)
    }), $document.delegate(rails.inputChangeSelector, "change.rails",
    function(e) {
        var link = $(this);
        return rails.allowAction(link) ? (rails.handleRemote(link), !1) : rails.stopEverything(e)
    }), $document.delegate(rails.formSubmitSelector, "submit.rails",
    function(e) {
        var form = $(this),
        remote = form.data("remote") !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (!rails.allowAction(form)) return rails.stopEverything(e);
        if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs])) return rails.stopEverything(e);
        if (remote) {
            if (nonBlankFileInputs) {
                setTimeout(function() {
                    rails.disableFormElements(form)
                },
                13);
                var aborted = rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs]);
                return aborted || setTimeout(function() {
                    rails.enableFormElements(form)
                },
                13),
                aborted
            }
            return rails.handleRemote(form),
            !1
        }
        setTimeout(function() {
            rails.disableFormElements(form)
        },
        13)
    }), $document.delegate(rails.formInputClickSelector, "click.rails",
    function(event) {
        var button = $(this);
        if (!rails.allowAction(button)) return rails.stopEverything(event);
        var name = button.attr("name"),
        data = name ? {
            name: name,
            value: button.val()
        }: null;
        button.closest("form").data("ujs:submit-button", data)
    }), $document.delegate(rails.formSubmitSelector, "ajax:beforeSend.rails",
    function(event) {
        this == event.target && rails.disableFormElements($(this))
    }), $document.delegate(rails.formSubmitSelector, "ajax:complete.rails",
    function(event) {
        this == event.target && rails.enableFormElements($(this))
    }), $(function() {
        var csrf_token = $("meta[name=csrf-token]").attr("content"),
        csrf_param = $("meta[name=csrf-param]").attr("content");
        $('form input[name="' + csrf_param + '"]').val(csrf_token)
    }))
} (jQuery),
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery)
} (function($) {
    function encode(s) {
        return config.raw ? s: encodeURIComponent(s)
    }
    function decode(s) {
        return config.raw ? s: decodeURIComponent(s)
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }
    function parseCookieValue(s) {
        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s = decodeURIComponent(s.replace(pluses, " ")),
            config.json ? JSON.parse(s) : s
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s: parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var pluses = /\+/g,
    config = $.cookie = function(key, value, options) {
        if (void 0 !== value && !$.isFunction(value)) {
            if (options = $.extend({},
            config.defaults, options), "number" == typeof options.expires) {
                var days = options.expires,
                t = options.expires = new Date;
                t.setTime( + t + 864e5 * days)
            }
            return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path: "", options.domain ? "; domain=" + options.domain: "", options.secure ? "; secure": ""].join("")
        }
        for (var result = key ? void 0 : {},
        cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; l > i; i++) {
            var parts = cookies[i].split("="),
            name = decode(parts.shift()),
            cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break
            }
            key || void 0 === (cookie = read(cookie)) || (result[name] = cookie)
        }
        return result
    };
    config.defaults = {},
    $.removeCookie = function(key, options) {
        return void 0 === $.cookie(key) ? !1 : ($.cookie(key, "", $.extend({},
        options, {
            expires: -1
        })), !$.cookie(key))
    }
}),
/* ===================================================
 * bootstrap-transition.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!
function($) {
    $(function() {
        "use strict";
        $.support.transition = function() {
            var transitionEnd = function() {
                var name, el = document.createElement("bootstrap"),
                transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (name in transEndEventNames) if (void 0 !== el.style[name]) return transEndEventNames[name]
            } ();
            return transitionEnd && {
                end: transitionEnd
            }
        } ()
    })
} (window.jQuery),
/* =========================================================
 * bootstrap-modal.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!
function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options,
        this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)),
        this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    Modal.prototype = {
        constructor: Modal,
        toggle: function() {
            return this[this.isShown ? "hide": "show"]()
        },
        show: function() {
            var that = this,
            e = $.Event("show");
            this.$element.trigger(e),
            this.isShown || e.isDefaultPrevented() || ($("body").addClass("modal-open"), this.isShown = !0, this.escape(), this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(document.body),
                that.$element.show(),
                transition && that.$element[0].offsetWidth,
                that.$element.addClass("in").attr("aria-hidden", !1).focus(),
                that.enforceFocus(),
                transition ? that.$element.one($.support.transition.end,
                function() {
                    that.$element.trigger("shown")
                }) : that.$element.trigger("shown")
            }))
        },
        hide: function(e) {
            e && e.preventDefault();
            e = $.Event("hide"),
            this.$element.trigger(e),
            this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, $("body").removeClass("modal-open"), this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var that = this;
            $(document).on("focusin.modal",
            function(e) {
                that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus()
            })
        },
        escape: function() {
            var that = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal",
            function(e) {
                27 == e.which && that.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var that = this,
            timeout = setTimeout(function() {
                that.$element.off($.support.transition.end),
                that.hideModal()
            },
            500);
            this.$element.one($.support.transition.end,
            function() {
                clearTimeout(timeout),
                that.hideModal()
            })
        },
        hideModal: function() {
            this.$element.hide().trigger("hidden"),
            this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(),
            this.$backdrop = null
        },
        backdrop: function(callback) {
            var animate = this.$element.hasClass("fade") ? "fade": "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body),
                "static" != this.options.backdrop && this.$backdrop.click($.proxy(this.hide, this)),
                doAnimate && this.$backdrop[0].offsetWidth,
                this.$backdrop.addClass("in"),
                doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else ! this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : callback && callback()
        }
    },
    $.fn.modal = function(option) {
        return this.each(function() {
            var $this = $(this),
            data = $this.data("modal"),
            options = $.extend({},
            $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("modal", data = new Modal(this, options)),
            "string" == typeof option ? data[option]() : options.show && data.show()
        })
    },
    $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    $.fn.modal.Constructor = Modal,
    $(function() {
        $("body").on("click.modal.data-api", '[data-toggle="modal"]',
        function(e) {
            var $this = $(this),
            href = $this.attr("href"),
            $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
            option = $target.data("modal") ? "toggle": $.extend({
                remote: !/#/.test(href) && href
            },
            $target.data(), $this.data());
            e.preventDefault(),
            $target.modal(option).one("hide",
            function() {
                $this.focus()
            })
        })
    })
} (window.jQuery);
try {
    var a = Open
} catch(e) {
    Open = {}
}
if (Open.Store = Open.Store || {},
Open.Store.update_prefix = "/sp/betaprogram", "undefined" == typeof document || "classList" in document.createElement("a") || !
function(view) {
    "use strict";
    if ("HTMLElement" in view || "Element" in view) {
        var classListProp = "classList",
        protoProp = "prototype",
        elemCtrProto = (view.HTMLElement || view.Element)[protoProp],
        objCtr = Object,
        strTrim = String[protoProp].trim ||
        function() {
            return this.replace(/^\s+|\s+$/g, "")
        },
        arrIndexOf = Array[protoProp].indexOf ||
        function(item) {
            for (var i = 0,
            len = this.length; len > i; i++) if (i in this && this[i] === item) return i;
            return - 1
        },
        DOMEx = function(type, message) {
            this.name = type,
            this.code = DOMException[type],
            this.message = message
        },
        checkTokenAndGetIndex = function(classList, token) {
            if ("" === token) throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
            if (/\s/.test(token)) throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
            return arrIndexOf.call(classList, token)
        },
        ClassList = function(elem) {
            for (var trimmedClasses = strTrim.call(elem.className), classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [], i = 0, len = classes.length; len > i; i++) this.push(classes[i]);
            this._updateClassName = function() {
                elem.className = this.toString()
            }
        },
        classListProto = ClassList[protoProp] = [],
        classListGetter = function() {
            return new ClassList(this)
        };
        if (DOMEx[protoProp] = Error[protoProp], classListProto.item = function(i) {
            return this[i] || null
        },
        classListProto.contains = function(token) {
            return token += "",
            -1 !== checkTokenAndGetIndex(this, token)
        },
        classListProto.add = function() {
            var token, tokens = arguments,
            i = 0,
            l = tokens.length,
            updated = !1;
            do token = tokens[i] + "",
            -1 === checkTokenAndGetIndex(this, token) && (this.push(token), updated = !0);
            while (++i < l);
            updated && this._updateClassName()
        },
        classListProto.remove = function() {
            var token, tokens = arguments,
            i = 0,
            l = tokens.length,
            updated = !1;
            do {
                token = tokens[i] + "";
                var index = checkTokenAndGetIndex(this, token); - 1 !== index && (this.splice(index, 1), updated = !0)
            } while (++ i < l );
            updated && this._updateClassName()
        },
        classListProto.toggle = function(token, forse) {
            token += "";
            var result = this.contains(token),
            method = result ? forse !== !0 && "remove": forse !== !1 && "add";
            return method && this[method](token),
            !result
        },
        classListProto.toString = function() {
            return this.join(" ")
        },
        objCtr.defineProperty) {
            var classListPropDesc = {
                get: classListGetter,
                enumerable: !0,
                configurable: !0
            };
            try {
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc)
            } catch(ex) { - 2146823252 === ex.number && (classListPropDesc.enumerable = !1, objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc))
            }
        } else objCtr[protoProp].__defineGetter__ && elemCtrProto.__defineGetter__(classListProp, classListGetter)
    }
} (self), document.createEvent) try {
    new window.CustomEvent("click")
} catch(err) {
    window.CustomEvent = function() {
        function CustomEvent(event, params) {
            params = params || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var evt = document.createEvent("CustomEvent");
            return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail),
            evt
        }
        return CustomEvent.prototype = window.Event.prototype,
        CustomEvent
    } ()
}
Function.prototype.bind || (Function.prototype.bind = function(originalContext) {
    if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var applicableArgs = Array.prototype.slice.call(arguments, 1),
    functionToBind = this,
    fnOriginalPrototype = function() {},
    fnBound = function() {
        return functionToBind.apply(this instanceof fnOriginalPrototype && originalContext ? this: originalContext, applicableArgs.concat(Array.prototype.slice.call(arguments)))
    };
    return fnOriginalPrototype.prototype = this.prototype,
    fnBound.prototype = new fnOriginalPrototype,
    fnBound
}),
Array.isArray || (Array.isArray = function(object) {
    return object && "object" == typeof object && "splice" in object && "join" in object
}),
Array.prototype.every || (Array.prototype.every = function(callback, thisObj) {
    var i, arrayObject = Object(this),
    len = arrayObject.length >>> 0;
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    for (i = 0; len > i; i += 1) if (i in arrayObject && !callback.call(thisObj, arrayObject[i], i, arrayObject)) return ! 1;
    return ! 0
}),
Array.prototype.filter || (Array.prototype.filter = function(callback, thisObj) {
    var i, arrayObject = Object(this),
    len = arrayObject.length >>> 0,
    results = [];
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    for (i = 0; len > i; i += 1) i in arrayObject && callback.call(thisObj, arrayObject[i], i, arrayObject) && results.push(arrayObject[i]);
    return results
}),
Array.prototype.forEach || (Array.prototype.forEach = function(callback, thisObj) {
    var i, currentValue, arrayObject = Object(this);
    if ("function" != typeof callback) throw new TypeError("No function object passed to forEach.");
    for (i = 0; i < this.length; i += 1) currentValue = arrayObject[i],
    callback.call(thisObj, currentValue, i, arrayObject)
}),
Array.prototype.indexOf || (Array.prototype.indexOf = function(searchElement, fromIndex) {
    var startIndex = fromIndex || 0,
    currentIndex = 0;
    if (0 > startIndex && (startIndex = this.length + fromIndex - 1, 0 > startIndex)) throw "Wrapped past beginning of array while looking up a negative start index.";
    for (currentIndex = 0; currentIndex < this.length; currentIndex++) if (this[currentIndex] === searchElement) return currentIndex;
    return - 1
}),
Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(value, fromIndex) {
    var i, arrayObj = Object(this),
    len = arrayObj.length >>> 0;
    if (fromIndex = parseInt(fromIndex, 10), 0 >= len) return - 1;
    for (i = "number" == typeof fromIndex ? Math.min(len - 1, fromIndex) : len - 1, i = i >= 0 ? i: len - Math.abs(i); i >= 0; i -= 1) if (i in arrayObj && value === arrayObj[i]) return i;
    return - 1
}),
Array.prototype.map || (Array.prototype.map = function(callback, thisObj) {
    var i, arrayObj = Object(this),
    len = arrayObj.length >>> 0,
    result = new Array(len);
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    for (i = 0; len > i; i += 1) i in arrayObj && (result[i] = callback.call(thisObj, arrayObj[i], i, arrayObj));
    return result
}),
Array.prototype.reduce || (Array.prototype.reduce = function(callback, initialValue) {
    var result, arrayObj = Object(this),
    len = arrayObj.length >>> 0,
    i = 0;
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    if ("undefined" == typeof initialValue) {
        if (!len) throw new TypeError("Reduce of empty array with no initial value");
        result = arrayObj[0],
        i = 1
    } else result = initialValue;
    for (; len > i;) i in arrayObj && (result = callback.call(void 0, result, arrayObj[i], i, arrayObj), i += 1);
    return result
}),
Array.prototype.reduceRight || (Array.prototype.reduceRight = function(callback, initialValue) {
    var result, arrayObj = Object(this),
    len = arrayObj.length >>> 0,
    i = len - 1;
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    if (void 0 === initialValue) {
        if (!len) throw new TypeError("Reduce of empty array with no initial value");
        result = arrayObj[len - 1],
        i = len - 2
    } else result = initialValue;
    for (; i >= 0;) i in arrayObj && (result = callback.call(void 0, result, arrayObj[i], i, arrayObj), i -= 1);
    return result
}),
Array.prototype.some || (Array.prototype.some = function(callback, thisObj) {
    var i, arrayObj = Object(this),
    len = arrayObj.length >>> 0;
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    for (i = 0; len > i; i += 1) if (i in arrayObj && callback.call(thisObj, arrayObj[i], i, arrayObj) === !0) return ! 0;
    return ! 1
}),
Date.now || (Date.now = function() {
    return (new Date).getTime()
}),
Date.prototype.toISOString || (Date.prototype.toISOString = function() {
    if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
    var prop, prefix, parts = {
        year: this.getUTCFullYear(),
        month: this.getUTCMonth() + 1,
        day: this.getUTCDate(),
        hours: this.getUTCHours(),
        minutes: this.getUTCMinutes(),
        seconds: this.getUTCSeconds(),
        mseconds: (this.getUTCMilliseconds() / 1e3).toFixed(3).substr(2, 3)
    };
    for (prop in parts) parts.hasOwnProperty(prop) && "year" !== prop && "mseconds" !== prop && (parts[prop] = 1 === String(parts[prop]).length ? "0" + String(parts[prop]) : String(parts[prop]));
    return (parts.year < 0 || parts.year > 9999) && (prefix = parts.year < 0 ? "-": "+", parts.year = prefix + String(Math.abs(parts.year / 1e6)).substr(2, 6)),
    parts.year + "-" + parts.month + "-" + parts.day + "T" + parts.hours + ":" + parts.minutes + ":" + parts.seconds + "." + parts.mseconds + "Z"
}),
Date.prototype.toJSON || (Date.prototype.toJSON = function() {
    var prim, obj = Object(this),
    isPrimitive = function(input) {
        var type = typeof input,
        types = [null, "undefined", "boolean", "string", "number"].some(function(value) {
            return value === type
        });
        return types ? !0 : !1
    },
    toPrimitive = function(input) {
        var value;
        if (isPrimitive(input)) return input;
        if (value = "function" == typeof input.valueOf ? input.valueOf() : "function" == typeof input.toString ? input.toString() : null, value && isPrimitive(value)) return value;
        throw new TypeError(input + " cannot be converted to a primitive")
    };
    if (prim = toPrimitive(obj), "number" == typeof prim && !isFinite(prim)) return null;
    if ("function" != typeof obj.toISOString) throw new TypeError("toISOString is not callable");
    return obj.toISOString.call(obj)
}),
String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
}),
Object.keys || (Object.keys = function(obj) {
    var currentKey, keysArray = [];
    if (!obj || "function" != typeof obj.hasOwnProperty) throw "Object.keys called on non-object.";
    for (currentKey in obj) obj.hasOwnProperty(currentKey) && keysArray.push(currentKey);
    return keysArray
}),
"undefined" != typeof JSON && "stringify" in JSON && "parse" in JSON || (this.JSON || (this.JSON = {}),
function() {
    function f(n) {
        return 10 > n ? "0" + n: n
    }
    function quote(string) {
        return escapable.lastIndex = 0,
        escapable.test(string) ? '"' + string.replace(escapable,
        function(a) {
            var c = meta[a];
            return "string" == typeof c ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, partial, mind = gap,
        value = holder[key];
        switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) return "null";
            if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
                for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
                return v = 0 === partial.length ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]",
                gap = mind,
                v
            }
            if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1) k = rep[i],
            "string" == typeof k && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": ": ":") + v));
            else for (k in value) Object.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": ": ":") + v));
            return v = 0 === partial.length ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}",
            gap = mind,
            v
        }
    }
    "function" != typeof String.prototype.toJSON && (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(value, replacer, space) {
        var i;
        if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " ";
        else "string" == typeof space && (indent = space);
        if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
        return str("", {
            "": value
        })
    }),
    "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && "object" == typeof value) for (k in value) Object.hasOwnProperty.call(value, k) && (v = walk(value, k), void 0 !== v ? value[k] = v: delete value[k]);
            return reviver.call(holder, key, value)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
        function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
        "function" == typeof reviver ? walk({
            "": j
        },
        "") : j;
        throw new SyntaxError("JSON.parse")
    })
} ()),
/**
	matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license
*/
window.matchMedia = window.matchMedia ||
function(doc) {
    var bool, docElem = doc.documentElement,
    refNode = docElem.firstElementChild || docElem.firstChild,
    fakeBody = doc.createElement("body"),
    div = doc.createElement("div");
    return div.id = "mq-test-1",
    div.style.cssText = "position:absolute;top:-100em",
    fakeBody.style.background = "none",
    fakeBody.appendChild(div),
    function(q) {
        return div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width:42px; }</style>',
        docElem.insertBefore(fakeBody, refNode),
        bool = 42 === div.offsetWidth,
        docElem.removeChild(fakeBody),
        {
            matches: bool,
            media: q
        }
    }
} (document),
function() {
    for (var lastTime = 0,
    vendors = ["ms", "moz", "webkit", "o"], x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"],
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
        var currTime = Date.now(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function() {
            callback(currTime + timeToCall)
        },
        timeToCall);
        return lastTime = currTime + timeToCall,
        id
    }),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
        clearTimeout(id)
    })
} (),
!
function(global) {
    "use strict";
    function getDependencies(dependencies, baseName) {
        var exports, module, deps = dependencies.map(function(dep) {
            return "exports" === dep ? exports = {}: "module" === dep ? module = {
                exports: {}
            }: "require" === dep ?
            function(name) {
                return require(normalizeName(name, baseName))
            }: (dep = normalizeName(dep, baseName), require(dep))
        });
        return {
            deps: deps,
            exports: exports,
            module: module
        }
    }
    function normalizeName(name, baseName) {
        var i, baseParts = baseName && baseName.split("/");
        if (name && "." === name.charAt(0)) if (baseName) {
            for (baseParts.pop(), name = name.split("/"), name = baseParts.concat(name), i = 0; i < name.length; i += 1) if ("." === name[i]) name.splice(i, 1),
            i -= 1;
            else if (".." === name[i]) {
                if (1 === i && (".." === name[2] || ".." === name[0])) break;
                i > 0 && (name.splice(i - 1, 2), i -= 2)
            }
            name = name.join("/")
        } else 0 === name.indexOf("./") && (name = name.substring(2));
        return name
    }
    function require(nameOrDependencies, callback) {
        var module;
        return "string" == typeof nameOrDependencies ? (nameOrDependencies = normalizeName(nameOrDependencies), module = moduleRegistry[nameOrDependencies], module || "function" != typeof otherRequire || (module = otherRequire(nameOrDependencies)), module) : "function" == typeof callback && Array.isArray(nameOrDependencies) ? callback.apply(global, getDependencies(nameOrDependencies).deps) : void 0
    }
    function define(name, dependencies, module) {
        if (!moduleRegistry[name]) if (module || (module = dependencies), "function" == typeof module && Array.isArray(dependencies)) {
            var deps = getDependencies(dependencies, name);
            moduleRegistry[name] = module.apply(module, deps.deps),
            moduleRegistry[name] || !deps.exports && !deps.module || (moduleRegistry[name] = "object" == typeof deps.exports && Object.keys(deps.exports).length ? deps.exports: deps.module.exports)
        } else moduleRegistry[name] = "function" == typeof module ? module() : module
    }
    var moduleRegistry, otherRequire;
    require.version = "1.4.0",
    require.config = function() {},
    define.amd = {},
    require._init = function() {
        moduleRegistry = {}
    },
    define.getRegisteredModules = function() {
        return Object.getOwnPropertyNames(moduleRegistry).sort()
    },
    define.getRegisteredNamespaces = function() {
        var modules = define.getRegisteredModules(),
        namespaces = {};
        return modules.forEach(function(moduleName) {
            var namespace = moduleName.split("/")[0];
            namespaces[namespace] || (namespaces[namespace] = []),
            namespaces[namespace].push(moduleName)
        }),
        namespaces
    },
    require._init(),
    "function" == typeof global.define && global.define.amd || (otherRequire = global.require, global.require = require, global.define = define)
} (this),
require = function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports,
            function(e) {
                var n = t[o][1][e];
                return s(n ? n: e)
            },
            f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require,
    o = 0; o < r.length; o++) s(r[o]);
    return s
} ({
    BZeRrQ: [function(require, module) {
        "use strict";
        var BrowserData = require("./ac-browser/BrowserData"),
        webkitRegExp = /applewebkit/i,
        IE = require("./ac-browser/IE"),
        browser = BrowserData.create();
        browser.isWebKit = function(userAgentString) {
            var userAgent = userAgentString || window.navigator.userAgent;
            return userAgent ? !!webkitRegExp.test(userAgent) : !1
        },
        browser.lowerCaseUserAgent = navigator.userAgent.toLowerCase(),
        "IE" === browser.name && (browser.IE = {
            documentMode: IE.getDocumentMode()
        }),
        module.exports = browser
    },
    {
        "./ac-browser/BrowserData": 3,
        "./ac-browser/IE": 4
    }],
    "ac-browser": [function(require, module) {
        module.exports = require("BZeRrQ")
    },
    {}],
    3 : [function(require, module) {
        "use strict";
        function BrowserData() {}
        var _data = require("./data");
        BrowserData.prototype = {
            __getBrowserVersion: function(stringToSearch, identity) {
                if (stringToSearch && identity) {
                    var filteredData = _data.browser.filter(function(item) {
                        return item.identity === identity
                    })[0],
                    versionSearchString = filteredData.versionSearch || identity,
                    index = stringToSearch.indexOf(versionSearchString);
                    return index > -1 ? parseFloat(stringToSearch.substring(index + versionSearchString.length + 1)) : void 0
                }
            },
            __getName: function(dataBrowser) {
                return this.__getIdentityStringFromArray(dataBrowser)
            },
            __getIdentity: function(item) {
                return item.string ? this.__matchSubString(item) : item.prop ? item.identity: void 0
            },
            __getIdentityStringFromArray: function(dataArray) {
                for (var identity, i = 0,
                l = dataArray.length; l > i; i++) if (identity = this.__getIdentity(dataArray[i])) return identity
            },
            __getOS: function(dataOS) {
                return this.__getIdentityStringFromArray(dataOS)
            },
            __getOSVersion: function(stringToSearch, osIdentity) {
                if (stringToSearch && osIdentity) {
                    var filteredData = _data.os.filter(function(item) {
                        return item.identity === osIdentity
                    })[0],
                    versionSearchString = filteredData.versionSearch || osIdentity,
                    regex = new RegExp(versionSearchString + " ([\\d_\\.]+)", "i"),
                    version = stringToSearch.match(regex);
                    return null !== version ? version[1].replace(/_/g, ".") : void 0
                }
            },
            __matchSubString: function(item) {
                var subString = item.subString;
                if (subString) {
                    var matches = subString.test ? !!subString.test(item.string) : item.string.indexOf(subString) > -1;
                    if (matches) return item.identity
                }
            }
        },
        BrowserData.create = function() {
            var instance = new BrowserData,
            out = {};
            return out.name = instance.__getName(_data.browser),
            out.version = instance.__getBrowserVersion(_data.versionString, out.name),
            out.os = instance.__getOS(_data.os),
            out.osVersion = instance.__getOSVersion(_data.versionString, out.os),
            out
        },
        module.exports = BrowserData
    },
    {
        "./data": 5
    }],
    4 : [function(require, module) {
        "use strict";
        module.exports = {
            getDocumentMode: function() {
                var ie;
                return document.documentMode ? ie = parseInt(document.documentMode, 10) : (ie = 5, document.compatMode && "CSS1Compat" === document.compatMode && (ie = 7)),
                ie
            }
        }
    },
    {}],
    5 : [function(require, module) {
        "use strict";
        module.exports = {
            browser: [{
                string: window.navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: window.navigator.userAgent,
                subString: /silk/i,
                identity: "Silk"
            },
            {
                string: window.navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: window.navigator.userAgent,
                subString: /mobile\/[^\s]*\ssafari\//i,
                identity: "Safari Mobile",
                versionSearch: "Version"
            },
            {
                string: window.navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: window.navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: window.navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: window.navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: window.navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {
                string: window.navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: window.navigator.userAgent,
                subString: "MSIE",
                identity: "IE",
                versionSearch: "MSIE"
            },
            {
                string: window.navigator.userAgent,
                subString: "Trident",
                identity: "IE",
                versionSearch: "rv"
            },
            {
                string: window.navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {
                string: window.navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }],
            os: [{
                string: window.navigator.platform,
                subString: "Win",
                identity: "Windows",
                versionSearch: "Windows NT"
            },
            {
                string: window.navigator.platform,
                subString: "Mac",
                identity: "OS X"
            },
            {
                string: window.navigator.userAgent,
                subString: "iPhone",
                identity: "iOS",
                versionSearch: "iPhone OS"
            },
            {
                string: window.navigator.userAgent,
                subString: "iPad",
                identity: "iOS",
                versionSearch: "CPU OS"
            },
            {
                string: window.navigator.userAgent,
                subString: /android/i,
                identity: "Android"
            },
            {
                string: window.navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }],
            versionString: window.navigator.userAgent || window.navigator.appVersion || void 0
        }
    },
    {}],
    6 : [function(require, module, exports) { !
        function(root, factory) {
            "object" == typeof exports && exports ? module.exports = factory: "function" == typeof define && define.amd ? define(factory) : root.Deferred = factory
        } (this,
        function() {
            "use strict";
            var statuses, each, CallbackContainer, funcOrEmpty, Deferred, Promise, promiseProto, passThrough, exports = {};
            statuses = {
                0 : "pending",
                1 : "resolved",
                2 : "rejected"
            },
            each = function(type, data) {
                var i, pending, length, callbackObj, callbackResult;
                if (0 !== this._status) return console && console.warn && console.warn("Trying to fulfill more than once."),
                !1;
                for (this.data = data, pending = this.pending, length = pending.length, i = 0; length > i; i++) callbackObj = pending[i],
                callbackObj[type] && (callbackResult = callbackObj[type](data)),
                "object" == typeof callbackResult && callbackResult.hasOwnProperty("then") && callbackResult.hasOwnProperty("status") ? callbackResult.then(function(data) {
                    callbackObj.deferred.resolve(data)
                },
                function(data) {
                    callbackObj.deferred.reject(data)
                },
                function(data) {
                    callbackObj.deferred.progress(data)
                }) : callbackObj.deferred[type](callbackResult || void 0);
                return "progress" !== type && (pending = []),
                !0
            },
            Promise = function(then, status) {
                this.then = then,
                this.status = status
            },
            promiseProto = Promise.prototype,
            passThrough = function(value) {
                return value
            },
            promiseProto.success = function(callback, context) {
                return this.then(callback.bind(context), passThrough, passThrough)
            },
            promiseProto.fail = function(callback, context) {
                return this.then(passThrough, callback.bind(context), passThrough)
            },
            promiseProto.progress = function(callback, context) {
                return this.then(passThrough, passThrough, callback.bind(context))
            },
            funcOrEmpty = function(func) {
                return "function" != typeof func ?
                function() {}: func
            },
            CallbackContainer = function(success, error, progress) {
                this.resolve = funcOrEmpty(success),
                this.reject = funcOrEmpty(error),
                this.progress = funcOrEmpty(progress),
                this.deferred = new Deferred
            },
            Deferred = function() {
                this.pending = [],
                this._status = 0,
                this._promise = new Promise(this.then.bind(this), this.status.bind(this))
            },
            Deferred.prototype = {
                status: function() {
                    return statuses[this._status]
                },
                promise: function() {
                    return this._promise
                },
                progress: function(update) {
                    return each.call(this, "progress", update),
                    this._promise
                },
                resolve: function(value) {
                    return each.call(this, "resolve", value),
                    0 === this._status && (this._status = 1),
                    this._promise
                },
                reject: function(error) {
                    return each.call(this, "reject", error),
                    0 === this._status && (this._status = 2),
                    this._promise
                },
                then: function(success, error, progress) {
                    var result, callbackObject;
                    return callbackObject = new CallbackContainer(success, error, progress),
                    0 === this._status ? this.pending.push(callbackObject) : 1 === this._status && "function" == typeof success ? (result = success(this.data), "object" == typeof result && result.hasOwnProperty("then") && result.hasOwnProperty("status") ? result.then(function(data) {
                        callbackObject.deferred.resolve(data)
                    },
                    function(data) {
                        callbackObject.deferred.reject(data)
                    },
                    function(data) {
                        callbackObject.deferred.progress(data)
                    }) : callbackObject.deferred.resolve(result)) : 2 === this._status && "function" == typeof error && (result = error(this.data), callbackObject.deferred.reject(result)),
                    callbackObject.deferred.promise()
                }
            };
            var when = function() {
                var values, deferred, pending, success, fail;
                return values = [].slice.call(arguments),
                deferred = new Deferred,
                pending = 0,
                success = function(value) {
                    pending--;
                    var i = values.indexOf(this);
                    values[i] = value,
                    0 === pending && deferred.resolve(values)
                },
                fail = function(error) {
                    deferred.reject(error)
                },
                values.forEach(function(value) {
                    value.then && (pending++, value.then(success.bind(value), fail))
                }),
                deferred.promise()
            };
            return Deferred.when = when,
            exports.Deferred = Deferred,
            exports
        } ())
    },
    {}],
    7 : [function(require, module) {
        "use strict";
        function Deferred() {}
        Deferred.prototype = {
            resolve: function() {
                return this._defer.resolve.apply(this._defer, Array.prototype.slice.call(arguments)),
                this.promise()
            },
            reject: function() {
                return this._defer.reject.apply(this._defer, Array.prototype.slice.call(arguments)),
                this.promise()
            },
            progress: function() {
                var message = "ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
                return console.warn(message),
                this._defer.progress.apply(this._defer, Array.prototype.slice.call(arguments)),
                this.promise()
            },
            then: function() {
                return this._defer.then.apply(this._defer, Array.prototype.slice.call(arguments)),
                this.promise()
            },
            promise: function() {
                return this._defer.promise.apply(this._defer, Array.prototype.slice.call(arguments))
            }
        },
        module.exports = Deferred
    },
    {}],
    "ac-deferred": [function(require, module) {
        module.exports = require("gpsNR2")
    },
    {}],
    gpsNR2: [function(require, module) {
        "use strict";
        function Deferred() {
            this._defer = new SmartsignDeferred
        }
        var proto = new(require("./ac-deferred/Deferred")),
        SmartsignDeferred = require("smartsign-deferred").Deferred;
        Deferred.prototype = proto,
        module.exports.join = function() {
            return SmartsignDeferred.when.apply(null, [].slice.call(arguments))
        },
        module.exports.all = function(arrayOfPromises) {
            return SmartsignDeferred.when.apply(null, arrayOfPromises)
        },
        module.exports.Deferred = Deferred
    },
    {
        "./ac-deferred/Deferred": 7,
        "smartsign-deferred": 6
    }],
    nhHP3s: [function(require, module) {
        /**
 * @module ac-event-emitter
 * @author Ronald "Doctor" Jett <rjett@apple.com>
 * @copyright 2014 Apple Inc. All rights reserved.
 */
        module.exports.EventEmitter = require("./ac-event-emitter/EventEmitter")
    },
    {
        "./ac-event-emitter/EventEmitter": 12
    }],
    "ac-event-emitter": [function(require, module) {
        module.exports = require("nhHP3s")
    },
    {}],
    12 : [function(require, module) {
        "use strict";
        var propagationName = "EventEmitter:propagation",
        EventEmitter = function(context) {
            context && (this.context = context)
        },
        proto = EventEmitter.prototype,
        getEvents = function() {
            return this.hasOwnProperty("_events") || "object" == typeof this._events || (this._events = {}),
            this._events
        },
        parseEvents = function(args, register) {
            var event = args[0],
            callback = args[1],
            context = args[2];
            if ("string" != typeof event && "object" != typeof event || null === event || Array.isArray(event)) throw new TypeError("Expecting event name to be a string or object.");
            if ("string" == typeof event && !callback) throw new Error("Expecting a callback function to be provided.");
            if (callback && "function" != typeof callback) {
                if ("object" != typeof event || "object" != typeof callback) throw new TypeError("Expecting callback to be a function.");
                context = callback
            }
            if ("object" == typeof event) for (var evt in event) register.call(this, evt, event[evt], context);
            "string" == typeof event && (event = event.split(" "), event.forEach(function(evt) {
                register.call(this, evt, callback, context)
            },
            this))
        },
        each = function(event, callback) {
            var eventsArray, i, length;
            if (eventsArray = getEvents.call(this)[event], eventsArray && 0 !== eventsArray.length) for (eventsArray = eventsArray.slice(), i = 0, length = eventsArray.length; length > i && !callback(eventsArray[i], i); i++);
        },
        removeSpecificCallback = function(events, event, callback) {
            var i = -1;
            each.call(this, event,
            function(callbackObject, index) {
                return callbackObject.callback === callback ? (i = index, !0) : void 0
            }),
            -1 !== i && events[event].splice(i, 1)
        };
        proto.on = function() {
            var events = getEvents.call(this);
            return parseEvents.call(this, arguments,
            function(event, callback, context) {
                events[event] = events[event] || (events[event] = []),
                events[event].push({
                    callback: callback,
                    context: context
                })
            }),
            this
        },
        proto.once = function() {
            return parseEvents.call(this, arguments,
            function(event, callback, context) {
                var wrapper = function(data) {
                    callback.call(context || this, data),
                    this.off(event, wrapper)
                };
                this.on(event, wrapper, this)
            }),
            this
        },
        proto.off = function(event, callback) {
            var events = getEvents.call(this);
            if (0 === arguments.length) this._events = {};
            else if (!event || "string" != typeof event && "object" != typeof event || Array.isArray(event)) throw new TypeError("Expecting event name to be a string or object.");
            if ("object" == typeof event) for (var e in event) removeSpecificCallback.call(this, events, e, event[e]);
            if ("string" == typeof event) {
                var split = event.split(" ");
                1 === split.length ? callback ? removeSpecificCallback.call(this, events, event, callback) : events[event] = [] : split.forEach(function(event) {
                    events[event] = []
                })
            }
            return this
        },
        proto.trigger = function(event, data, doNotPropagate) {
            if (!event) throw new Error("trigger method requires an event name");
            if ("string" != typeof event) throw new TypeError("Expecting event names to be a string.");
            if (doNotPropagate && "boolean" != typeof doNotPropagate) throw new TypeError("Expecting doNotPropagate to be a boolean.");
            return event = event.split(" "),
            event.forEach(function(evt) {
                each.call(this, evt,
                function(callbackObject) {
                    callbackObject.callback.call(callbackObject.context || this.context || this, data)
                }.bind(this)),
                doNotPropagate || each.call(this, propagationName,
                function(propagation) {
                    var eventName = evt;
                    propagation.prefix && (eventName = propagation.prefix + eventName),
                    propagation.emitter.trigger(eventName, data)
                })
            },
            this),
            this
        },
        proto.propagateTo = function(eventEmitter, prefix) {
            var events = getEvents.call(this);
            events[propagationName] || (this._events[propagationName] = []),
            events[propagationName].push({
                emitter: eventEmitter,
                prefix: prefix
            })
        },
        proto.stopPropagatingTo = function(eventEmitter) {
            var events = getEvents.call(this);
            if (!eventEmitter) return void(events[propagationName] = []);
            var i, propagationTargets = events[propagationName],
            length = propagationTargets.length;
            for (i = 0; length > i; i++) if (propagationTargets[i].emitter === eventEmitter) {
                propagationTargets.splice(i, 1);
                break
            }
        },
        proto.has = function(evt, callback, context) {
            var events = getEvents.call(this),
            eventsArray = events[evt];
            if (0 === arguments.length) return Object.keys(events);
            if (!callback) return eventsArray && eventsArray.length > 0 ? !0 : !1;
            for (var i = 0,
            length = eventsArray.length; length > i; i++) {
                var callbackContainer = eventsArray[i];
                if (context && callback && callbackContainer.context === context && callbackContainer.callback === callback) return ! 0;
                if (callback && !context && callbackContainer.callback === callback) return ! 0
            }
            return ! 1
        },
        module.exports = EventEmitter
    },
    {}],
    "ac-feature": [function(require, module) {
        module.exports = require("2/kcxM")
    },
    {}],
    "2/kcxM": [function(require, module) {
        "use strict";
        var feature = {
            cssPropertyAvailable: require("./ac-feature/cssPropertyAvailable"),
            localStorageAvailable: require("./ac-feature/localStorageAvailable")
        },
        hasOwnProp = Object.prototype.hasOwnProperty;
        feature.threeDTransformsAvailable = function() {
            if ("undefined" != typeof this._threeDTransformsAvailable) return this._threeDTransformsAvailable;
            var div;
            try {
                if (this._threeDTransformsAvailable = !1, hasOwnProp.call(window, "styleMedia") ? this._threeDTransformsAvailable = window.styleMedia.matchMedium("(-webkit-transform-3d)") : hasOwnProp.call(window, "media") && (this._threeDTransformsAvailable = window.media.matchMedium("(-webkit-transform-3d)")), !this._threeDTransformsAvailable) {
                    if (!document.getElementById("supportsThreeDStyle")) {
                        var style = document.createElement("style");
                        style.id = "supportsThreeDStyle",
                        style.textContent = "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }",
                        document.querySelector("head").appendChild(style)
                    } (div = document.querySelector("#supportsThreeD")) || (div = document.createElement("div"), div.id = "supportsThreeD", document.body.appendChild(div)),
                    this._threeDTransformsAvailable = 3 === div.offsetHeight
                }
                return this._threeDTransformsAvailable
            } catch(e) {
                return ! 1
            }
        },
        feature.canvasAvailable = function() {
            if ("undefined" != typeof this._canvasAvailable) return this._canvasAvailable;
            var canvas = document.createElement("canvas");
            return this._canvasAvailable = !("function" != typeof canvas.getContext || !canvas.getContext("2d")),
            this._canvasAvailable
        },
        feature.sessionStorageAvailable = function() {
            if ("undefined" != typeof this._sessionStorageAvailable) return this._sessionStorageAvailable;
            try {
                "undefined" != typeof window.sessionStorage && "function" == typeof window.sessionStorage.setItem ? (window.sessionStorage.setItem("ac_browser_detect", "test"), this._sessionStorageAvailable = !0, window.sessionStorage.removeItem("ac_browser_detect", "test")) : this._sessionStorageAvailable = !1
            } catch(e) {
                this._sessionStorageAvailable = !1
            }
            return this._sessionStorageAvailable
        },
        feature.cookiesAvailable = function() {
            return "undefined" != typeof this._cookiesAvailable ? this._cookiesAvailable: (this._cookiesAvailable = hasOwnProp.call(document, "cookie") && navigator.cookieEnabled ? !0 : !1, this._cookiesAvailable)
        },
        feature.__normalizedScreenWidth = function() {
            return "undefined" == typeof window.orientation ? window.screen.width: window.screen.width < window.screen.height ? window.screen.width: window.screen.height
        },
        feature.touchAvailable = function() {
            return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        },
        feature.isDesktop = function() {
            return this.touchAvailable() || window.orientation ? !1 : !0
        },
        feature.isHandheld = function() {
            return ! this.isDesktop() && !this.isTablet()
        },
        feature.isTablet = function() {
            return ! this.isDesktop() && this.__normalizedScreenWidth() > 480
        },
        feature.isRetina = function() {
            var i, mediaQueryStrings = ["min-device-pixel-ratio:1.5", "-webkit-min-device-pixel-ratio:1.5", "min-resolution:1.5dppx", "min-resolution:144dpi", "min--moz-device-pixel-ratio:1.5"];
            if (void 0 !== window.devicePixelRatio) {
                if (window.devicePixelRatio >= 1.5) return ! 0
            } else for (i = 0; i < mediaQueryStrings.length; i += 1) if (window.matchMedia("(" + mediaQueryStrings[i] + ")").matches === !0) return ! 0;
            return ! 1
        },
        feature.svgAvailable = function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        },
        module.exports = feature
    },
    {
        "./ac-feature/cssPropertyAvailable": 15,
        "./ac-feature/localStorageAvailable": 16
    }],
    15 : [function(require, module) {
        "use strict";
        var style = null,
        prefixes = null,
        preFixes = null,
        css = null;
        module.exports = function(property) {
            switch (null === style && (style = document.createElement("browserdetect").style), null === prefixes && (prefixes = ["-webkit-", "-moz-", "-o-", "-ms-", "-khtml-", ""]), null === preFixes && (preFixes = ["Webkit", "Moz", "O", "ms", "Khtml", ""]), null === css && (css = {}), property = property.replace(/([A-Z]+)([A-Z][a-z])/g, "$1\\-$2").replace(/([a-z\d])([A-Z])/g, "$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase()) {
            case "gradient":
                if (void 0 !== css.gradient) return css.gradient;
                property = "background-image:";
                var value1 = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                value2 = "linear-gradient(left top,#9f9, white);";
                return style.cssText = (property + prefixes.join(value1 + property) + prefixes.join(value2 + property)).slice(0, -property.length),
                css.gradient = -1 !== style.backgroundImage.indexOf("gradient"),
                css.gradient;
            case "inset-box-shadow":
                if (void 0 !== css["inset-box-shadow"]) return css["inset-box-shadow"];
                property = "box-shadow:";
                var value = "#fff 0 1px 1px inset;";
                return style.cssText = prefixes.join(property + value),
                css["inset-box-shadow"] = -1 !== style.cssText.indexOf("inset"),
                css["inset-box-shadow"];
            default:
                var Property, i, j, properties = property.split("-"),
                length = properties.length;
                if (properties.length > 0) for (property = properties[0], i = 1; length > i; i += 1) property += properties[i].substr(0, 1).toUpperCase() + properties[i].substr(1);
                if (Property = property.substr(0, 1).toUpperCase() + property.substr(1), void 0 !== css[property]) return css[property];
                for (j = preFixes.length - 1; j >= 0; j -= 1) if (void 0 !== style[preFixes[j] + property] || void 0 !== style[preFixes[j] + Property]) return css[property] = !0,
                !0;
                return ! 1
            }
        }
    },
    {}],
    16 : [function(require, module) {
        "use strict";
        var isAvailable = null;
        module.exports = function() {
            if (null !== isAvailable) return isAvailable;
            try {
                "undefined" != typeof window.localStorage && "function" == typeof window.localStorage.setItem ? (window.localStorage.setItem("ac_environment_feature", "test"), isAvailable = !0, window.localStorage.removeItem("ac_environment_feature", "test")) : isAvailable = !1
            } catch(e) {
                isAvailable = !1
            }
            return isAvailable
        }
    },
    {}],
    17 : [function(require, module, exports) {
        function promote(parent, key) {
            if (0 == parent[key].length) return parent[key] = {};
            var t = {};
            for (var i in parent[key]) hasOwnProperty.call(parent[key], i) && (t[i] = parent[key][i]);
            return parent[key] = t,
            t
        }
        function parse(parts, parent, key, val) {
            var part = parts.shift();
            if (!hasOwnProperty.call(Object.prototype, key)) if (part) {
                var obj = parent[key] = parent[key] || [];
                "]" == part ? isArray(obj) ? "" != val && obj.push(val) : "object" == typeof obj ? obj[objectKeys(obj).length] = val: obj = parent[key] = [parent[key], val] : ~indexOf(part, "]") ? (part = part.substr(0, part.length - 1), !isint.test(part) && isArray(obj) && (obj = promote(parent, key)), parse(parts, obj, part, val)) : (!isint.test(part) && isArray(obj) && (obj = promote(parent, key)), parse(parts, obj, part, val))
            } else isArray(parent[key]) ? parent[key].push(val) : parent[key] = "object" == typeof parent[key] ? val: "undefined" == typeof parent[key] ? val: [parent[key], val]
        }
        function merge(parent, key, val) {
            if (~indexOf(key, "]")) {
                {
                    var parts = key.split("[");
                    parts.length
                }
                parse(parts, parent, "base", val)
            } else {
                if (!isint.test(key) && isArray(parent.base)) {
                    var t = {};
                    for (var k in parent.base) t[k] = parent.base[k];
                    parent.base = t
                }
                set(parent.base, key, val)
            }
            return parent
        }
        function compact(obj) {
            if ("object" != typeof obj) return obj;
            if (isArray(obj)) {
                var ret = [];
                for (var i in obj) hasOwnProperty.call(obj, i) && ret.push(obj[i]);
                return ret
            }
            for (var key in obj) obj[key] = compact(obj[key]);
            return obj
        }
        function parseObject(obj) {
            var ret = {
                base: {}
            };
            return forEach(objectKeys(obj),
            function(name) {
                merge(ret, name, obj[name])
            }),
            compact(ret.base)
        }
        function parseString(str) {
            var ret = reduce(String(str).split("&"),
            function(ret, pair) {
                var eql = indexOf(pair, "="),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length),
                val = val.substr(indexOf(val, "=") + 1, val.length);
                return "" == key && (key = pair, val = ""),
                "" == key ? ret: merge(ret, decode(key), decode(val))
            },
            {
                base: {}
            }).base;
            return compact(ret)
        }
        function stringifyString(str, prefix) {
            if (!prefix) throw new TypeError("stringify expects an object");
            return prefix + "=" + encodeURIComponent(str)
        }
        function stringifyArray(arr, prefix) {
            var ret = [];
            if (!prefix) throw new TypeError("stringify expects an object");
            for (var i = 0; i < arr.length; i++) ret.push(stringify(arr[i], prefix + "[" + i + "]"));
            return ret.join("&")
        }
        function stringifyObject(obj, prefix) {
            for (var key, ret = [], keys = objectKeys(obj), i = 0, len = keys.length; len > i; ++i) key = keys[i],
            "" != key && ret.push(null == obj[key] ? encodeURIComponent(key) + "=": stringify(obj[key], prefix ? prefix + "[" + encodeURIComponent(key) + "]": encodeURIComponent(key)));
            return ret.join("&")
        }
        function set(obj, key, val) {
            var v = obj[key];
            hasOwnProperty.call(Object.prototype, key) || (void 0 === v ? obj[key] = val: isArray(v) ? v.push(val) : obj[key] = [v, val])
        }
        function lastBraceInKey(str) {
            for (var brace, c, len = str.length,
            i = 0; len > i; ++i) if (c = str[i], "]" == c && (brace = !1), "[" == c && (brace = !0), "=" == c && !brace) return i
        }
        function decode(str) {
            try {
                return decodeURIComponent(str.replace(/\+/g, " "))
            } catch(err) {
                return str
            }
        }
        var toString = Object.prototype.toString,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        indexOf = "function" == typeof Array.prototype.indexOf ?
        function(arr, el) {
            return arr.indexOf(el)
        }: function(arr, el) {
            for (var i = 0; i < arr.length; i++) if (arr[i] === el) return i;
            return - 1
        },
        isArray = Array.isArray ||
        function(arr) {
            return "[object Array]" == toString.call(arr)
        },
        objectKeys = Object.keys ||
        function(obj) {
            var ret = [];
            for (var key in obj) obj.hasOwnProperty(key) && ret.push(key);
            return ret
        },
        forEach = "function" == typeof Array.prototype.forEach ?
        function(arr, fn) {
            return arr.forEach(fn)
        }: function(arr, fn) {
            for (var i = 0; i < arr.length; i++) fn(arr[i])
        },
        reduce = function(arr, fn, initial) {
            if ("function" == typeof arr.reduce) return arr.reduce(fn, initial);
            for (var res = initial,
            i = 0; i < arr.length; i++) res = fn(res, arr[i]);
            return res
        },
        isint = /^[0-9]+$/;
        exports.parse = function(str) {
            return null == str || "" == str ? {}: "object" == typeof str ? parseObject(str) : parseString(str)
        };
        var stringify = exports.stringify = function(obj, prefix) {
            return isArray(obj) ? stringifyArray(obj, prefix) : "[object Object]" == toString.call(obj) ? stringifyObject(obj, prefix) : "string" == typeof obj ? stringifyString(obj, prefix) : prefix + "=" + encodeURIComponent(String(obj))
        }
    },
    {}],
    "ac-base": [function(require, module) {
        module.exports = require("QQX0yI")
    },
    {}],
    QQX0yI: [function(require, module) {
        "use strict";
        var globals = require("./ac-base/globals"),
        AC = globals.window.AC = globals.window.AC || {},
        ac_Environment = require("./ac-base/Environment"),
        ac_onDOMReady = require("./ac-base/Element/onDOMReady");
        ac_Environment.Browser.IE && (ac_Environment.Browser.IE.documentMode < 9 && require("./ac-base/shims/html5.js")(), ac_Environment.Browser.IE.documentMode < 8 && ac_onDOMReady(require("./ac-base/shims/ie/nonClickableImageBooster"))),
        "undefined" != typeof define && (AC.define = define, AC.require = require),
        AC.adler32 = require("./ac-base/adler32"),
        AC.Ajax = require("./ac-base/Ajax"),
        AC.Array = require("./ac-base/Array"),
        AC.bindEventListeners = require("./ac-base/bindEventListeners"),
        AC.Canvas = require("./ac-base/Canvas"),
        AC.Class = require("./ac-base/Class"),
        AC.Date = require("./ac-base/Date"),
        AC.DeferredQueue = require("./ac-base/DeferredQueue"),
        AC.EasingFunctions = require("./ac-base/EasingFunctions"),
        AC.Element = require("./ac-base/Element"),
        AC.Environment = ac_Environment,
        AC.Event = require("./ac-base/Event"),
        AC.Function = require("./ac-base/Function"),
        AC.History = require("./ac-base/History"),
        AC.log = require("./ac-base/log"),
        AC.namespace = require("./ac-base/namespace"),
        AC.NotificationCenter = require("./ac-base/NotificationCenter"),
        AC.Object = require("./ac-base/Object"),
        AC.onDOMReady = ac_onDOMReady,
        AC.onWindowLoad = require("./ac-base/Element/onWindowLoad"),
        AC.queryParameters = require("./ac-base/queryParameters"),
        AC.RegExp = require("./ac-base/RegExp"),
        AC.Registry = require("./ac-base/Registry"),
        AC.String = require("./ac-base/String"),
        AC.Synthesize = require("./ac-base/Synthesize"),
        AC.uid = require("./ac-base/uid"),
        AC.Viewport = require("./ac-base/Viewport"),
        AC.windowHasLoaded = !1,
        AC.Element.addEventListener(globals.window, "load",
        function() {
            AC.windowHasLoaded = !0
        }),
        module.exports = AC
    },
    {
        "./ac-base/Ajax": 20,
        "./ac-base/Array": 24,
        "./ac-base/Canvas": 25,
        "./ac-base/Class": 26,
        "./ac-base/Date": 27,
        "./ac-base/DeferredQueue": 28,
        "./ac-base/EasingFunctions": 29,
        "./ac-base/Element": 30,
        "./ac-base/Element/onDOMReady": 33,
        "./ac-base/Element/onWindowLoad": 34,
        "./ac-base/Environment": 36,
        "./ac-base/Event": 37,
        "./ac-base/Function": 38,
        "./ac-base/History": 39,
        "./ac-base/NotificationCenter": 40,
        "./ac-base/Object": 41,
        "./ac-base/RegExp": 42,
        "./ac-base/Registry": 43,
        "./ac-base/String": 45,
        "./ac-base/Synthesize": 46,
        "./ac-base/Viewport": 47,
        "./ac-base/adler32": 48,
        "./ac-base/bindEventListeners": 49,
        "./ac-base/globals": 50,
        "./ac-base/log": 51,
        "./ac-base/namespace": 52,
        "./ac-base/queryParameters": 53,
        "./ac-base/shims/html5.js": 54,
        "./ac-base/shims/ie/nonClickableImageBooster": 57,
        "./ac-base/uid": 58
    }],
    20 : [function(require, module) {
        "use strict";
        var ac_Ajax = {};
        require("./Ajax/ajax-tracker")(ac_Ajax),
        require("./Ajax/ajax-response")(ac_Ajax),
        require("./Ajax/ajax-request")(ac_Ajax),
        ac_Ajax.getTransport = function() {
            return new XMLHttpRequest
        },
        ac_Ajax.checkURL = function(url, callback) {
            var error = ac_Ajax.__validateArguments(url, callback);
            if (error) throw error;
            var transport = ac_Ajax.getTransport();
            this.__handleReadyStateChange(transport, callback),
            transport.open("HEAD", url, !0),
            transport.send(null)
        },
        ac_Ajax.__handleReadyStateChange = function(transport, callback) {
            transport.onreadystatechange = function() {
                4 === this.readyState && "function" == typeof callback && callback(200 === this.status)
            }
        },
        ac_Ajax.__validateArguments = function(url, callback) {
            var errors;
            return url || (errors = "Must provide a url"),
            callback || (errors = "Must provide a callback"),
            url || callback || (errors = "Must provide a url and callback"),
            errors
        },
        module.exports = ac_Ajax
    },
    {
        "./Ajax/ajax-request": 21,
        "./Ajax/ajax-response": 22,
        "./Ajax/ajax-tracker": 23
    }],
    21 : [function(require, module) {
        "use strict";
        var ac_Class = require("../Class"),
        ac_Object = require("../Object");
        module.exports = function(ac_Ajax) {
            var AjaxRequest = ac_Class();
            AjaxRequest.prototype = {
                __defaultOptions: {
                    method: "get"
                },
                initialize: function(url, options) {
                    this._transport = ac_Ajax.getTransport(),
                    this._mimeTypeOverride = null,
                    this._options = null,
                    ac_Object.synthesize(this),
                    this.setOptions(ac_Object.extend(ac_Object.clone(this.__defaultOptions), options || {})),
                    ac_Ajax.AjaxTracker.sharedInstance().addResponder(this),
                    this.__configureTransport(url)
                },
                __configureTransport: function(url) {
                    this.transport().onreadystatechange = this.__handleTransportStateChange.bind(this),
                    this.transport().open(this.options().method, url, !0),
                    this.transport().setRequestHeader("Content-Type", this.options().contentType),
                    this.transport().send(null)
                },
                __handleTransportStateChange: function() {
                    if (4 === this.transport().readyState) {
                        new ac_Ajax.AjaxResponse(this)
                    }
                },
                overrideMimeType: function(overrideMimeTypeValue) {
                    this._mimeTypeOverride = overrideMimeTypeValue,
                    this.transport().overrideMimeType && this.transport().overrideMimeType(overrideMimeTypeValue)
                },
                _overrideMimeType: null
            },
            ac_Ajax.AjaxRequest = AjaxRequest
        }
    },
    {
        "../Class": 26,
        "../Object": 41
    }],
    22 : [function(require, module) {
        "use strict";
        var ac_Class = require("../Class");
        module.exports = function(ac_Ajax) {
            var AjaxResponse = ac_Class();
            AjaxResponse.prototype = {
                _request: null,
                _transport: null,
                initialize: function(request) {
                    this._transport = request.transport(),
                    this._request = request;
                    var isComplete = !1,
                    isLoaded = 4 === this._transport.readyState;
                    isLoaded && (this.__triggerCallbacks(), isComplete = !0),
                    isComplete && (this._request.options().onComplete && this._request.options().onComplete(this), ac_Ajax.AjaxTracker.sharedInstance().removeResponder(request))
                },
                __triggerCallbacks: function() {
                    var transportStatus = this._transport.status,
                    isSuccessful = transportStatus >= 200 && 300 > transportStatus,
                    isFailure = transportStatus >= 400 && 500 > transportStatus,
                    isError = transportStatus >= 500 && 600 > transportStatus || 0 === transportStatus;
                    isSuccessful && this._request.options().onSuccess && this._request.options().onSuccess(this),
                    isFailure && this._request.options().onFailure && this._request.options().onFailure(this),
                    isError && this._request.options().onError && this._request.options().onError(this)
                },
                responseText: function() {
                    return this._transport.responseText
                },
                responseXML: function() {
                    return this._transport.responseXML
                },
                responseJSON: function() {
                    return JSON.parse(this._transport.responseText)
                }
            },
            ac_Ajax.AjaxResponse = AjaxResponse
        }
    },
    {
        "../Class": 26
    }],
    23 : [function(require, module) {
        "use strict";
        var ac_Class = require("../Class");
        module.exports = function(ac_Ajax) {
            var AjaxTracker = ac_Class();
            AjaxTracker.prototype = {
                __responders: [],
                initialize: function() {},
                addResponder: function(responder) {
                    return this.__responders.push(responder),
                    this.__responders
                },
                removeResponder: function(responder) {
                    var originalLength = this.__responders.length;
                    this.__responders = this.__responders.filter(function(value) {
                        return value !== responder
                    });
                    var newLength = this.__responders.length;
                    return originalLength > newLength ? !0 : !1
                }
            },
            ac_Ajax.AjaxTracker = AjaxTracker
        }
    },
    {
        "../Class": 26
    }],
    24 : [function(require, module) {
        "use strict";
        var browser = require("ac-browser"),
        ac_Array = {};
        ac_Array.toArray = function(arrayLike) {
            return Array.prototype.slice.call(arrayLike)
        },
        ac_Array.flatten = function(array) {
            var flattenedArray = [],
            callback = function(item) {
                Array.isArray(item) ? item.forEach(callback) : flattenedArray.push(item)
            };
            return array.forEach(callback),
            flattenedArray
        },
        ac_Array.without = function(arr, value) {
            var newArr, index = arr.indexOf(value),
            length = arr.length;
            return index >= 0 ? (index === length - 1 ? newArr = arr.slice(0, length - 1) : 0 === index ? newArr = arr.slice(1) : (newArr = arr.slice(0, index), newArr = newArr.concat(arr.slice(index + 1))), newArr) : arr
        },
        "IE" === browser.name && require("./shims/ie/Array")(ac_Array, browser),
        module.exports = ac_Array
    },
    {
        "./shims/ie/Array": 55,
        "ac-browser": "BZeRrQ"
    }],
    25 : [function(require, module) {
        "use strict";
        var ac_Element = require("./Element"),
        ac_Canvas = {};
        ac_Canvas.imageDataFromFile = function(src, callback) {
            if ("function" != typeof callback) throw new TypeError("Need callback method to call when imageData is retrieved.");
            if ("string" != typeof src || "" === src) throw new TypeError("Src for imageData must be an Image Node with a src attribute or a string.");
            var img = new Image;
            img.onload = function() {
                callback(ac_Canvas.imageDataFromNode(img))
            },
            img.src = src
        },
        ac_Canvas.imageDataFromNode = function(img) {
            if (!ac_Element.isElement(img) || "null" === img.getAttribute("src") || 0 === img.width) throw new TypeError("Source node must be an IMG tag and must have already loaded.");
            var imageData, canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");
            return canvas.width = img.width,
            canvas.height = img.height,
            context.drawImage(img, 0, 0),
            imageData = context.getImageData(0, 0, img.width, img.height)
        },
        module.exports = ac_Canvas
    },
    {
        "./Element": 30
    }],
    26 : [function(require, module) {
        "use strict";
        function ac_Class() {
            var Superclass, args = ac_Array.toArray(arguments),
            superclass = "function" == typeof args[0] ? args.shift() : null,
            prototypeObj = args.shift() || {},
            ACGeneratedClass = function() {
                var result, timeoutCallback;
                result = "function" == typeof this.initialize && ACGeneratedClass.__shouldInitialize !== !1 ? this.initialize.apply(this, arguments) : !1,
                result === ac_Class.Invalidate && (timeoutCallback = function() {
                    try {
                        this && this._parentClass && this._parentClass._sharedInstance === this && (this._parentClass._sharedInstance = null)
                    } catch(e) {
                        throw e
                    }
                },
                window.setTimeout(timeoutCallback.bind(this), 200))
            };
            return ACGeneratedClass.__superclass = superclass,
            superclass ? (Superclass = superclass.__superclass ? ac_Class(superclass.__superclass, superclass.prototype) : ac_Class(superclass.prototype), Superclass.__shouldInitialize = !1, ACGeneratedClass.prototype = new Superclass, ac_Object.extend(ACGeneratedClass.prototype, prototypeObj), ac_Class.__wrapSuperMethods(ACGeneratedClass)) : ACGeneratedClass.prototype = prototypeObj,
            ACGeneratedClass.sharedInstance = function() {
                return ACGeneratedClass._sharedInstance || (ACGeneratedClass._sharedInstance = new ACGeneratedClass, ACGeneratedClass._sharedInstance._parentClass = ACGeneratedClass),
                ACGeneratedClass._sharedInstance
            },
            ac_Object.synthesize(ACGeneratedClass.prototype),
            ACGeneratedClass.autocreate = prototypeObj.__instantiateOnDOMReady || !1,
            delete prototypeObj.__instantiateOnDOMReady,
            ACGeneratedClass.autocreate && ac_onDOMReady(function() {
                ACGeneratedClass.autocreate && ACGeneratedClass.sharedInstance()
            }),
            ACGeneratedClass
        }
        var ac_Object = require("./Object"),
        ac_Array = require("./Array"),
        ac_Function = require("./Function"),
        ac_onDOMReady = require("./Element/onDOMReady");
        ac_Class.__wrapSuperMethods = function(ACGeneratedClass) {
            var property, proto = ACGeneratedClass.prototype,
            superProto = ACGeneratedClass.__superclass.prototype;
            for (property in proto) if (proto.hasOwnProperty(property) && "function" == typeof proto[property]) {
                var nestedMethod = proto[property],
                paramNames = ac_Function.getParamNames(nestedMethod);
                "$super" === paramNames[0] && (proto[property] = function(property, nestedMethod) {
                    var $super = superProto[property];
                    return function() {
                        var args = ac_Array.toArray(arguments);
                        return nestedMethod.apply(this, [$super.bind(this)].concat(args))
                    }
                } (property, nestedMethod))
            }
            return this
        },
        ac_Class.Invalidate = function() {
            return ! 1
        },
        module.exports = ac_Class
    },
    {
        "./Array": 24,
        "./Element/onDOMReady": 33,
        "./Function": 38,
        "./Object": 41
    }],
    27 : [function(require, module) {
        "use strict";
        var ac_Date = {};
        ac_Date.isDate = function(date) {
            return ! (!date || "function" != typeof date.getTime)
        },
        module.exports = ac_Date
    },
    {}],
    28 : [function(require, module) {
        "use strict";
        var ac_Array = require("./Array"),
        ac_Class = require("./Class"),
        ac_Object = require("./Object"),
        defaultOptions = {
            autoplay: !1,
            asynchronous: !1
        },
        ac_DeferredQueue = ac_Class({
            initialize: function(options) {
                "object" != typeof options && (options = {}),
                this._options = ac_Object.extend(ac_Object.clone(defaultOptions), options),
                this._isPlaying = !1,
                this._isRunningAction = !1,
                this._queue = [],
                this.didFinish = this.__didFinish.bind(this),
                this.synthesize()
            },
            add: function(func, delay) {
                var action, options = {};
                delay > 0 && (options.delay = delay),
                action = new ac_DeferredQueue.Action(func, options),
                this.queue().push(action),
                this.isPlaying() || this._options.autoplay !== !0 || this.start()
            },
            remove: function(action) {
                this.setQueue(ac_Array.without(this.queue(), action))
            },
            start: function() {
                return this.isPlaying() ? !1 : (this.setIsPlaying(!0), void this.__runNextAction())
            },
            stop: function() {
                return this.isPlaying() ? void this.setIsPlaying(!1) : !1
            },
            clear: function() {
                this.setQueue([]),
                this.stop()
            },
            __didFinish: function() {
                this.setIsRunningAction(!1),
                this.__runNextAction()
            },
            __runNextAction: function() {
                if (!this.isPlaying()) return ! 1;
                if (this.queue().length && !this.isRunningAction()) {
                    var action = this.queue().shift();
                    if (action.run(), this._options.asynchronous === !0) return void this.setIsRunningAction(!0);
                    this.__runNextAction()
                }
            }
        }),
        actionDefaultOptions = {
            delay: 0
        };
        ac_DeferredQueue.Action = ac_Class({
            initialize: function(func, options) {
                if ("function" != typeof func) throw new TypeError("Deferred Queue func must be a function.");
                "object" != typeof options && (options = {}),
                this._options = ac_Object.extend(ac_Object.clone(actionDefaultOptions), options),
                this.__func = func,
                this.synthesize()
            },
            run: function() {
                var func = this.__func;
                "number" == typeof this._options.delay && this._options.delay > 0 ? window.setTimeout(function() {
                    func()
                },
                1e3 * this._options.delay) : func()
            }
        }),
        module.exports = ac_DeferredQueue
    },
    {
        "./Array": 24,
        "./Class": 26,
        "./Object": 41
    }],
    29 : [function(require, module) {
        "use strict";
        var ac_EasingFunctions = {
            linear: function(time, begin, change, duration) {
                return change * time / duration + begin
            },
            easeInQuad: function(time, begin, change, duration) {
                return change * (time /= duration) * time + begin
            },
            easeOutQuad: function(time, begin, change, duration) {
                return - change * (time /= duration) * (time - 2) + begin
            },
            easeInOutQuad: function(time, begin, change, duration) {
                return (time /= duration / 2) < 1 ? change / 2 * time * time + begin: -change / 2 * (--time * (time - 2) - 1) + begin
            },
            easeInCubic: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time + begin
            },
            easeOutCubic: function(time, begin, change, duration) {
                return change * ((time = time / duration - 1) * time * time + 1) + begin
            },
            easeInOutCubic: function(time, begin, change, duration) {
                return (time /= duration / 2) < 1 ? change / 2 * time * time * time + begin: change / 2 * ((time -= 2) * time * time + 2) + begin
            },
            easeInQuart: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time * time + begin
            },
            easeOutQuart: function(time, begin, change, duration) {
                return - change * ((time = time / duration - 1) * time * time * time - 1) + begin
            },
            easeInOutQuart: function(time, begin, change, duration) {
                return (time /= duration / 2) < 1 ? change / 2 * time * time * time * time + begin: -change / 2 * ((time -= 2) * time * time * time - 2) + begin
            },
            easeInQuint: function(time, begin, change, duration) {
                return change * (time /= duration) * time * time * time * time + begin
            },
            easeOutQuint: function(time, begin, change, duration) {
                return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin
            },
            easeInOutQuint: function(time, begin, change, duration) {
                return (time /= duration / 2) < 1 ? change / 2 * time * time * time * time * time + begin: change / 2 * ((time -= 2) * time * time * time * time + 2) + begin
            },
            easeInSine: function(time, begin, change, duration) {
                return - change * Math.cos(time / duration * (Math.PI / 2)) + change + begin
            },
            easeOutSine: function(time, begin, change, duration) {
                return change * Math.sin(time / duration * (Math.PI / 2)) + begin
            },
            easeInOutSine: function(time, begin, change, duration) {
                return - change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin
            },
            easeInExpo: function(time, begin, change, duration) {
                return 0 == time ? begin: change * Math.pow(2, 10 * (time / duration - 1)) + begin
            },
            easeOutExpo: function(time, begin, change, duration) {
                return time == duration ? begin + change: change * ( - Math.pow(2, -10 * time / duration) + 1) + begin
            },
            easeInOutExpo: function(time, begin, change, duration) {
                return 0 == time ? begin: time == duration ? begin + change: (time /= duration / 2) < 1 ? change / 2 * Math.pow(2, 10 * (time - 1)) + begin: change / 2 * ( - Math.pow(2, -10 * --time) + 2) + begin
            },
            easeInCirc: function(time, begin, change, duration) {
                return - change * (Math.sqrt(1 - (time /= duration) * time) - 1) + begin
            },
            easeOutCirc: function(time, begin, change, duration) {
                return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin
            },
            easeInOutCirc: function(time, begin, change, duration) {
                return (time /= duration / 2) < 1 ? -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin: change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin
            },
            easeInElastic: function(time, begin, change, duration) {
                var shootover = 1.70158,
                period = 0,
                amplitude = change;
                return 0 == time ? begin: 1 == (time /= duration) ? begin + change: (period || (period = .3 * duration), amplitude < Math.abs(change) ? (amplitude = change, shootover = period / 4) : shootover = period / (2 * Math.PI) * Math.asin(change / amplitude), -(amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin(2 * (time * duration - shootover) * Math.PI / period)) + begin)
            },
            easeOutElastic: function(time, begin, change, duration) {
                var shootover = 1.70158,
                period = 0,
                amplitude = change;
                return 0 == time ? begin: 1 == (time /= duration) ? begin + change: (period || (period = .3 * duration), amplitude < Math.abs(change) ? (amplitude = change, shootover = period / 4) : shootover = period / (2 * Math.PI) * Math.asin(change / amplitude), amplitude * Math.pow(2, -10 * time) * Math.sin(2 * (time * duration - shootover) * Math.PI / period) + change + begin)
            },
            easeInOutElastic: function(time, begin, change, duration) {
                var shootover = 1.70158,
                period = 0,
                amplitude = change;
                return 0 == time ? begin: 2 == (time /= duration / 2) ? begin + change: (period || (period = .3 * duration * 1.5), amplitude < Math.abs(change) ? (amplitude = change, shootover = period / 4) : shootover = period / (2 * Math.PI) * Math.asin(change / amplitude), 1 > time ? -.5 * amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin(2 * (time * duration - shootover) * Math.PI / period) + begin: amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin(2 * (time * duration - shootover) * Math.PI / period) * .5 + change + begin)
            },
            easeInBack: function(time, begin, change, duration, shootover) {
                return void 0 == shootover && (shootover = 1.70158),
                change * (time /= duration) * time * ((shootover + 1) * time - shootover) + begin
            },
            easeOutBack: function(time, begin, change, duration, shootover) {
                return void 0 == shootover && (shootover = 1.70158),
                change * ((time = time / duration - 1) * time * ((shootover + 1) * time + shootover) + 1) + begin
            },
            easeInOutBack: function(time, begin, change, duration, shootover) {
                return void 0 == shootover && (shootover = 1.70158),
                (time /= duration / 2) < 1 ? change / 2 * time * time * (((shootover *= 1.525) + 1) * time - shootover) + begin: change / 2 * ((time -= 2) * time * (((shootover *= 1.525) + 1) * time + shootover) + 2) + begin
            },
            easeInBounce: function(time, begin, change, duration) {
                return change - ac_EasingFunctions.easeOutBounce(duration - time, 0, change, duration) + begin
            },
            easeOutBounce: function(time, begin, change, duration) {
                return (time /= duration) < 1 / 2.75 ? 7.5625 * change * time * time + begin: 2 / 2.75 > time ? change * (7.5625 * (time -= 1.5 / 2.75) * time + .75) + begin: 2.5 / 2.75 > time ? change * (7.5625 * (time -= 2.25 / 2.75) * time + .9375) + begin: change * (7.5625 * (time -= 2.625 / 2.75) * time + .984375) + begin
            },
            easeInOutBounce: function(time, begin, change, duration) {
                return duration / 2 > time ? .5 * ac_EasingFunctions.easeInBounce(2 * time, 0, change, duration) + begin: .5 * ac_EasingFunctions.easeOutBounce(2 * time - duration, 0, change, duration) + .5 * change + begin
            }
        };
        ac_EasingFunctions.ease = function(centValue, easeType) {
            if ("ease" === easeType) easeType = "easeInOutSine";
            else if ("ease-in" === easeType) easeType = "easeInCubic";
            else if ("ease-out" === easeType) easeType = "easeOutCubic";
            else if ("ease-in-out" === easeType) easeType = "easeInOutCubic";
            else if ("linear" === easeType) easeType = "linear";
            else {
                if ("step-start" === easeType) return 0 === centValue ? 0 : 1;
                if ("step-end" === easeType) return 1 === centValue ? 1 : 0;
                if ("string" == typeof easeType && /^steps\(\d+\,\s*(start|end)\)$/.test(easeType)) {
                    var steps = parseInt(easeType.match(/\d+/)[0]),
                    direction = easeType.match(/(start|end)/)[0],
                    incrementLength = 1 / steps;
                    return Math["start" === direction ? "floor": "ceil"](centValue / incrementLength) * incrementLength
                }
            }
            if ("string" == typeof easeType) {
                if ("function" != typeof ac_EasingFunctions[easeType] || "ease" === easeType) throw new TypeError('"' + easeType + '" is not a valid easing type');
                easeType = ac_EasingFunctions[easeType]
            }
            return easeType(centValue, 0, 1, 1)
        },
        module.exports = ac_EasingFunctions
    },
    {}],
    30 : [function(require, module) {
        var ac_Viewport = require("./Viewport"),
        ac_log = require("./log"),
        events = require("./Element/events"),
        vendorTransformHelper = require("./Element/vendorTransformHelper"),
        browser = require("ac-browser"),
        ac_Element = {
            addEventListener: events.addEventListener,
            removeEventListener: events.removeEventListener,
            addVendorPrefixEventListener: events.addVendorPrefixEventListener,
            removeVendorPrefixEventListener: events.removeVendorPrefixEventListener,
            addVendorEventListener: function(element, type, listener, useCapture) {
                return ac_log("ac-base.Element.addVendorEventListener is deprecated. Please use ac-base.Element.addVendorPrefixEventListener."),
                this.addVendorPrefixEventListener(element, type, listener, useCapture)
            },
            removeVendorEventListener: function(element, type, listener, useCapture) {
                return ac_log("ac-base.Element.removeVendorEventListener is deprecated. Please use ac-base.Element.removeVendorPrefixEventListener."),
                this.removeVendorPrefixEventListener(element, type, listener, useCapture)
            }
        };
        require("./Element/EventDelegate")(ac_Element),
        ac_Element.getElementById = function(element) {
            return "string" == typeof element && (element = document.getElementById(element)),
            ac_Element.isElement(element) ? element: null
        },
        ac_Element.selectAll = function(selector, context) {
            if ("undefined" == typeof context) context = document;
            else if (!ac_Element.isElement(context) && 9 !== context.nodeType && 11 !== context.nodeType) throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType");
            if ("string" != typeof selector) throw new TypeError("ac-base.Element.selectAll: Selector must be a string");
            return Array.prototype.slice.call(context.querySelectorAll(selector))
        },
        ac_Element.select = function(selector, context) {
            if ("undefined" == typeof context) context = document;
            else if (!ac_Element.isElement(context) && 9 !== context.nodeType && 11 !== context.nodeType) throw new TypeError("ac-base.Element.select: Invalid context nodeType");
            if ("string" != typeof selector) throw new TypeError("ac-base.Element.select: Selector must be a string");
            return context.querySelector(selector)
        };
        var matches = window.Element ?
        function(proto) {
            return proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector
        } (Element.prototype) : null;
        ac_Element.matchesSelector = function(element, selector) {
            return ac_Element.isElement(element) ? matches.call(element, selector) : !1
        },
        ac_Element.matches = function(element, selector) {
            return ac_log("ac-base.Element.matches is deprecated. Use ac-base.Element.filterBySelector instead."),
            ac_Element.filterBySelector(selector, element)
        },
        ac_Element.filterBySelector = function(elements, selector) {
            for (var arr = [], i = 0, l = elements.length; l > i; i++) ac_Element.isElement(elements[i]) && matches.call(elements[i], selector) && (arr[arr.length] = elements[i]);
            return arr
        },
        ac_Element.setOpacity = function(element, value) {
            return ac_log("ac-base.Element.setOpacity is deprecated. Use ac-base.Element.setStyle instead."),
            ac_Element.setStyle(element, {
                opacity: value
            })
        },
        ac_Element.setStyle = function(element, styles) {
            if ("string" != typeof styles && "object" != typeof styles || Array.isArray(styles)) throw new TypeError("styles argument must be either an object or a string");
            element = ac_Element.getElementById(element);
            var stylesObj, camelCaseProp, prop;
            stylesObj = ac_Element.setStyle.__explodeStyleStringToObject(styles);
            for (prop in stylesObj) stylesObj.hasOwnProperty(prop) && (camelCaseProp = prop.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace), ac_Element.setStyle.__setStyle(element, camelCaseProp, stylesObj, stylesObj[prop]));
            return element
        },
        ac_Element.setStyle.__explodeStyleStringToObject = function(styles) {
            var splitStyles, colon, len, i, stylesObj = "object" == typeof styles ? styles: {};
            if ("string" == typeof styles) for (splitStyles = styles.split(";"), len = splitStyles.length, i = 0; len > i; i += 1) colon = splitStyles[i].indexOf(":"),
            colon > 0 && (stylesObj[splitStyles[i].substr(0, colon).trim()] = splitStyles[i].substr(colon + 1).trim());
            return stylesObj
        },
        ac_Element.setStyle.__setStyle = function(element, camelCaseProp, stylesObj, stylesValue) {
            "undefined" != typeof element.style[camelCaseProp] && (element.style[camelCaseProp] = stylesValue)
        },
        ac_Element.setStyle.__camelCaseReplace = function(match, group, offset, string) {
            return 0 === offset && "moz" !== string.substr(1, 3) ? group: group.toUpperCase()
        },
        ac_Element.getStyle = function(element, style, css) {
            var value;
            return style = style.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace),
            element = ac_Element.getElementById(element),
            style = "float" === style ? "cssFloat": style,
            css = css || window.getComputedStyle(element, null),
            value = css ? css[style] : null,
            "opacity" === style ? value ? parseFloat(value) : 1 : "auto" === value ? null: value
        },
        ac_Element.cumulativeOffset = function(element) {
            var box = ac_Element.getBoundingBox(element),
            scrollOffsets = ac_Viewport.scrollOffsets(),
            offset = [box.top + scrollOffsets.y, box.left + scrollOffsets.x];
            return offset.top = offset[0],
            offset.left = offset[1],
            offset
        },
        ac_Element.getBoundingBox = function(element) {
            element = ac_Element.getElementById(element);
            var rect = element.getBoundingClientRect(),
            w = rect.width || rect.right - rect.left,
            h = rect.height || rect.bottom - rect.top;
            return {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: w,
                height: h
            }
        },
        ac_Element.getInnerDimensions = function(element) {
            var style, styleValue, dims = ac_Element.getBoundingBox(element),
            w = dims.width,
            h = dims.height,
            css = window.getComputedStyle ? window.getComputedStyle(element, null) : null;
            return ["padding", "border"].forEach(function(prop) { ["Top", "Right", "Bottom", "Left"].forEach(function(side) {
                    style = "border" === prop ? prop + side + "Width": prop + side,
                    styleValue = parseFloat(ac_Element.getStyle(element, style, css)),
                    styleValue = isNaN(styleValue) ? 0 : styleValue,
                    ("Right" === side || "Left" === side) && (w -= styleValue),
                    ("Top" === side || "Bottom" === side) && (h -= styleValue)
                })
            }),
            {
                width: w,
                height: h
            }
        },
        ac_Element.getOuterDimensions = function(element) {
            var marginStyle, dims = ac_Element.getBoundingBox(element),
            w = dims.width,
            h = dims.height,
            css = window.getComputedStyle ? window.getComputedStyle(element, null) : null;
            return ["margin"].forEach(function(prop) { ["Top", "Right", "Bottom", "Left"].forEach(function(side) {
                    marginStyle = parseFloat(ac_Element.getStyle(element, prop + side, css)),
                    marginStyle = isNaN(marginStyle) ? 0 : marginStyle,
                    ("Right" === side || "Left" === side) && (w += marginStyle),
                    ("Top" === side || "Bottom" === side) && (h += marginStyle)
                })
            }),
            {
                width: w,
                height: h
            }
        },
        ac_Element.hasClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);
            return matchedElement && "" !== matchedElement.className ? new RegExp("(\\s|^)" + cls + "(\\s|$)").test(matchedElement.className) : !1
        },
        ac_Element.addClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);
            matchedElement.classList ? matchedElement.classList.add(cls) : ac_Element.hasClassName(matchedElement, cls) || (matchedElement.className += " " + cls)
        },
        ac_Element.removeClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);
            if (ac_Element.hasClassName(matchedElement, cls)) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                matchedElement.className = matchedElement.className.replace(reg, "$1").trim()
            }
        },
        ac_Element.toggleClassName = function(element, cls) {
            var matchedElement = ac_Element.getElementById(element);
            matchedElement.classList ? matchedElement.classList.toggle(cls) : ac_Element.hasClassName(matchedElement, cls) ? ac_Element.removeClassName(matchedElement, cls) : ac_Element.addClassName(matchedElement, cls)
        },
        ac_Element.isElement = function(object) {
            return ! (!object || 1 !== object.nodeType)
        },
        ac_Element.setVendorPrefixStyle = function(element, property, value) {
            if ("string" != typeof property) throw new TypeError("ac-base.Element.setVendorPrefixStyle: property must be a string");
            if ("string" != typeof value && "number" != typeof value) throw new TypeError("ac-base.Element.setVendorPrefixStyle: value must be a string or a number");
            value += "",
            element = ac_Element.getElementById(element);
            var prefixedCamelProp, prefixedValue, prefixes = ["", "webkit", "Moz", "ms", "O"];
            property = property.replace(/-(webkit|moz|ms|o)-/i, ""),
            property = property.replace(/^(webkit|Moz|ms|O)/, ""),
            property = property.charAt(0).toLowerCase() + property.slice(1),
            property = property.replace(/-(\w)/,
            function(match, group) {
                return group.toUpperCase()
            }),
            value = value.replace(/-(webkit|moz|ms|o)-/, "-vendor-"),
            prefixes.forEach(function(prefix) {
                prefixedCamelProp = "" === prefix ? property: prefix + property.charAt(0).toUpperCase() + property.slice(1),
                prefixedValue = "" === prefix ? value.replace("-vendor-", "") : value.replace("-vendor-", "-" + prefix.charAt(0).toLowerCase() + prefix.slice(1) + "-"),
                prefixedCamelProp in element.style && ac_Element.setStyle(element, prefixedCamelProp + ":" + prefixedValue)
            })
        },
        ac_Element.getVendorPrefixStyle = function(element, property) {
            if ("string" != typeof property) throw new TypeError("ac-base.Element.getVendorPrefixStyle: property must be a string");
            element = ac_Element.getElementById(element);
            var style, prefixes = ["", "webkit", "Moz", "ms", "O"];
            return property = property.replace(/-(webkit|moz|ms|o)-/i, ""),
            property = property.replace(/^(webkit|Moz|ms|O)/, "").charAt(0).toLowerCase() + property.slice(1),
            property = property.replace(/-(\w)/,
            function(match, group) {
                return group.toUpperCase()
            }),
            prefixes.some(function(prefix) {
                var prefixedCamelProp = "" === prefix ? property: prefix + property.charAt(0).toUpperCase() + property.slice(1);
                return prefixedCamelProp in element.style ? (style = ac_Element.getStyle(element, prefixedCamelProp), !0) : void 0
            }),
            style
        },
        ac_Element.insert = function(element, target, placement) {
            if (!element || 1 !== element.nodeType && 3 !== element.nodeType && 11 !== element.nodeType) throw new TypeError("ac-base.Element.insert: element must be a valid node of type element, text, or document fragment");
            if (!target || 1 !== target.nodeType && 11 !== target.nodeType) throw new TypeError("ac-base.Element.insert: target must be a valid node of type element or document fragment");
            switch (placement) {
            case "before":
                if (11 === target.nodeType) throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement \u2018before\u2019");
                target.parentNode.insertBefore(element, target);
                break;
            case "after":
                if (11 === target.nodeType) throw new TypeError("ac-base.Element.insert: target cannot be nodeType of documentFragment when using placement \u2018after\u2019");
                target.parentNode.insertBefore(element, target.nextSibling);
                break;
            case "first":
                target.insertBefore(element, target.firstChild);
                break;
            default:
                target.appendChild(element)
            }
        },
        ac_Element.insertAt = function(element, target, index) {
            var children, len, i;
            if (element = ac_Element.getElementById(element), target = ac_Element.getElementById(target), !ac_Element.isElement(element) || !ac_Element.isElement(target)) throw new TypeError("ac-base.Element.insertAt: element must be a valid DOM element");
            if (children = ac_Element.children(target), 0 > index && children.length && (index += children.length), target.contains(element) && index > children.indexOf(element) && index++, children && index <= children.length - 1) {
                for (i = 0, len = children.length; len > i; i++) if (i === index) {
                    target.insertBefore(element, children[i]);
                    break
                }
            } else target.appendChild(element)
        },
        ac_Element.children = function(element) {
            var _children, child;
            if (element = ac_Element.getElementById(element), !ac_Element.isElement(element)) throw new TypeError("ac-base.Element.children: element must be a valid DOM element");
            if (element.children) {
                _children = [];
                for (var i = 0,
                l = element.children.length; l > i; i++) child = element.children[i],
                child && 1 === child.nodeType && _children.push(child)
            }
            return _children.length ? _children: null
        },
        ac_Element.remove = function(element, retainReference) {
            if (!ac_Element.isElement(element)) throw new TypeError("ac-base.Element.remove: element must be a valid DOM element");
            if (retainReference === !0) {
                var removedNode = element.parentNode.removeChild(element);
                return removedNode
            }
            element.parentNode.removeChild(element)
        },
        ac_Element.viewportOffset = function(element) {
            var offset = ac_Element.getBoundingBox(element);
            return {
                x: offset.left,
                y: offset.top
            }
        },
        ac_Element.pixelsInViewport = function(element, elementMetrics) {
            var pixelsInView;
            if (!ac_Element.isElement(element)) throw new TypeError("ac-base.Element.pixelsInViewport : element must be a valid DOM element");
            var viewportMetrics = ac_Viewport.dimensions();
            elementMetrics = elementMetrics || ac_Element.getBoundingBox(element);
            var elementViewportOffsetY = elementMetrics.top;
            return elementViewportOffsetY >= 0 ? (pixelsInView = viewportMetrics.height - elementViewportOffsetY, pixelsInView > elementMetrics.height && (pixelsInView = elementMetrics.height)) : pixelsInView = elementMetrics.height + elementViewportOffsetY,
            0 > pixelsInView && (pixelsInView = 0),
            pixelsInView > viewportMetrics.height && (pixelsInView = viewportMetrics.height),
            pixelsInView
        },
        ac_Element.percentInViewport = function(element) {
            var elementMetrics = ac_Element.getBoundingBox(element),
            pixelsInView = ac_Element.pixelsInViewport(element, elementMetrics);
            return pixelsInView / elementMetrics.height
        },
        ac_Element.isInViewport = function(element, percentageThreshold) { ("number" != typeof percentageThreshold || percentageThreshold > 1 || 0 > percentageThreshold) && (percentageThreshold = 0);
            var percentInViewport = ac_Element.percentInViewport(element);
            return percentInViewport > percentageThreshold || 1 === percentInViewport
        };
        var eachAncestor = function(element, handler) {
            element = ac_Element.getElementById(element);
            for (var ancestor = element.parentNode; ancestor && ac_Element.isElement(ancestor) && ("function" != typeof handler || handler(ancestor) !== !1);) ancestor = ancestor !== document.body ? ancestor.parentNode: null
        };
        ac_Element.ancestors = function(element, cssSelector) {
            var elements = [];
            return eachAncestor(element,
            function(ancestor) { (void 0 === cssSelector || ac_Element.matchesSelector(ancestor, cssSelector)) && elements.push(ancestor)
            }),
            elements
        },
        ac_Element.ancestor = function(element, cssSelector) {
            element = ac_Element.getElementById(element);
            var firstMatch = null;
            return null !== element && void 0 === cssSelector ? element.parentNode: (eachAncestor(element,
            function(ancestor) {
                return ac_Element.matchesSelector(ancestor, cssSelector) ? (firstMatch = ancestor, !1) : void 0
            }), firstMatch)
        },
        ac_Element.setVendorPrefixTransform = function(element, transformFunctions) {
            if ("string" != typeof transformFunctions && "object" != typeof transformFunctions || Array.isArray(transformFunctions) || null === transformFunctions) throw new TypeError("ac-base.Element.setVendorPrefixTransform: transformFunctions argument must be either an object or a string");
            ac_Element.setVendorPrefixStyle(element, "transform", vendorTransformHelper.convert2dFunctions(transformFunctions))
        },
        "IE" === browser.name && require("./shims/ie/Element")(ac_Element, browser),
        module.exports = ac_Element
    },
    {
        "./Element/EventDelegate": 31,
        "./Element/events": 32,
        "./Element/vendorTransformHelper": 35,
        "./Viewport": 47,
        "./log": 51,
        "./shims/ie/Element": 56,
        "ac-browser": "BZeRrQ"
    }],
    31 : [function(require, module) {
        "use strict";
        module.exports = function(ac_Element) {
            function EventDelegate(element, options) {
                this.element = element,
                this.options = options || {}
            }
            EventDelegate.prototype = {
                __findMatchingTarget: function(eventTarget) {
                    var delegateTarget = null;
                    return delegateTarget = ac_Element.matchesSelector(eventTarget, this.options.selector) ? eventTarget: ac_Element.ancestor(eventTarget, this.options.selector)
                },
                __generateDelegateMethod: function() {
                    var self = this,
                    handler = self.options.handler;
                    return function(evt) {
                        var delegateEvent, eventTarget = evt.target || evt.srcElement,
                        delegateTarget = self.__findMatchingTarget(eventTarget);
                        null !== delegateTarget && (delegateEvent = new EventDelegate.Event(evt), delegateEvent.setTarget(delegateTarget), handler(delegateEvent))
                    }
                },
                attachEventListener: function() {
                    return this.__delegateMethod = this.__generateDelegateMethod(),
                    ac_Element.addEventListener(this.element, this.options.eventType, this.__delegateMethod),
                    this.__delegateMethod
                },
                unbind: function() {
                    ac_Element.removeEventListener(this.element, this.options.eventType, this.__delegateMethod),
                    this.__delegateMethod = void 0
                }
            },
            EventDelegate.instances = [],
            EventDelegate.filterInstances = function(filterMethod) {
                var matches = [];
                return EventDelegate.instances.forEach(function(eventDelegate) {
                    filterMethod(eventDelegate) === !0 && matches.push(eventDelegate)
                }),
                matches
            },
            EventDelegate.Event = function(evt) {
                this.originalEvent = evt
            },
            EventDelegate.Event.prototype.setTarget = function(target) {
                this.target = target,
                this.currentTarget = target
            },
            ac_Element.addEventDelegate = function(element, eventType, selector, handler) {
                var eventDelegate = new ac_Element.__EventDelegate(element, {
                    eventType: eventType,
                    selector: selector,
                    handler: handler
                });
                return EventDelegate.instances.push(eventDelegate),
                eventDelegate.attachEventListener()
            },
            ac_Element.removeEventDelegate = function(element, eventType, selector, handler) {
                var eventDelegates = ac_Element.__EventDelegate.filterInstances(function(eventDelegate) {
                    var options = eventDelegate.options;
                    return eventDelegate.element === element && options.selector === selector && options.eventType === eventType && options.handler === handler
                });
                eventDelegates.forEach(function(eventDelegate) {
                    eventDelegate.unbind()
                })
            },
            ac_Element.__EventDelegate = EventDelegate
        }
    },
    {}],
    32 : [function(require, module) {
        "use strict";
        var events = {};
        events.addEventListener = function(target, type, listener, useCapture) {
            return target.addEventListener ? target.addEventListener(type, listener, useCapture) : target.attachEvent ? target.attachEvent("on" + type, listener) : target["on" + type] = listener,
            target
        },
        events.dispatchEvent = function(target, type) {
            return document.createEvent ? target.dispatchEvent(new CustomEvent(type)) : target.fireEvent("on" + type, document.createEventObject()),
            target
        },
        events.removeEventListener = function(target, type, listener, useCapture) {
            return target.removeEventListener ? target.removeEventListener(type, listener, useCapture) : target.detachEvent("on" + type, listener),
            target
        },
        events.addVendorPrefixEventListener = function(element, type, listener, useCapture) {
            return type = type.match(/^webkit/i) ? type.replace(/^webkit/i, "") : type.match(/^moz/i) ? type.replace(/^moz/i, "") : type.match(/^ms/i) ? type.replace(/^ms/i, "") : type.match(/^o/i) ? type.replace(/^o/i, "") : type.charAt(0).toUpperCase() + type.slice(1),
            /WebKit/i.test(window.navigator.userAgent) ? events.addEventListener(element, "webkit" + type, listener, useCapture) : /Opera/i.test(window.navigator.userAgent) ? events.addEventListener(element, "O" + type, listener, useCapture) : /Gecko/i.test(window.navigator.userAgent) ? events.addEventListener(element, type.toLowerCase(), listener, useCapture) : (type = type.charAt(0).toLowerCase() + type.slice(1), events.addEventListener(element, type, listener, useCapture))
        },
        events.removeVendorPrefixEventListener = function(element, type, listener, useCapture) {
            return type = type.match(/^webkit/i) ? type.replace(/^webkit/i, "") : type.match(/^moz/i) ? type.replace(/^moz/i, "") : type.match(/^ms/i) ? type.replace(/^ms/i, "") : type.match(/^o/i) ? type.replace(/^o/i, "") : type.charAt(0).toUpperCase() + type.slice(1),
            events.removeEventListener(element, "webkit" + type, listener, useCapture),
            events.removeEventListener(element, "O" + type, listener, useCapture),
            events.removeEventListener(element, type.toLowerCase(), listener, useCapture),
            type = type.charAt(0).toLowerCase() + type.slice(1),
            events.removeEventListener(element, type, listener, useCapture)
        },
        module.exports = events
    },
    {}],
    33 : [function(require, module) {
        "use strict";
        function onReady(event) {
            var doc = globals.document,
            win = globals.window;
            if ("readystatechange" !== event.type || "complete" === doc.readyState) {
                for (var i = queue.length; i--;) queue.shift().call(win, event.type || event);
                events.removeEventListener(doc, "DOMContentLoaded", onReady, !1),
                events.removeEventListener(doc, "readystatechange", onReady, !1),
                events.removeEventListener(win, "load", onReady, !1),
                clearTimeout(pollId)
            }
        }
        function poll() {
            try {
                globals.document.documentElement.doScroll("left")
            } catch(e) {
                return void(pollId = setTimeout(poll, 50))
            }
            onReady("poll")
        }
        var pollId, queue, globals = require("../globals"),
        events = require("./events");
        module.exports = function(callback) {
            var doc = globals.document,
            win = globals.window;
            if ("complete" === doc.readyState) callback.call(win, "lazy");
            else {
                if ((!queue || !queue.length) && (queue = [], events.addEventListener(doc, "DOMContentLoaded", onReady, !1), events.addEventListener(doc, "readystatechange", onReady, !1), events.addEventListener(win, "load", onReady, !1), doc.createEventObject && doc.documentElement.doScroll)) try {
                    win.frameElement || poll()
                } catch(e) {}
                queue.push(callback)
            }
        }
    },
    {
        "../globals": 50,
        "./events": 32
    }],
    34 : [function(require, module) {
        "use strict";
        function onLoad() {
            for (var i = queue.length; i--;) queue.shift()();
            events.removeEventListener(globals.window, "load", onLoad)
        }
        var queue, globals = require("../globals"),
        events = require("./events");
        module.exports = function(callback) {
            "complete" === globals.document.readyState ? callback() : (queue || (queue = [], events.addEventListener(globals.window, "load", onLoad)), queue.push(callback))
        }
    },
    {
        "../globals": 50,
        "./events": 32
    }],
    35 : [function(require, module) {
        "use strict";
        var vendorTransformHelper = {
            __objectifiedFunctions: {},
            __paramMaps: {
                translate: "p1, p2, 0",
                translateX: "p1, 0, 0",
                translateY: "0, p1, 0",
                scale: "p1, p2, 1",
                scaleX: "p1, 1, 1",
                scaleY: "1, p1, 1",
                rotate: "0, 0, 1, p1",
                matrix: "p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"
            },
            convert2dFunctions: function(functions2d) {
                var values;
                this.__init(functions2d);
                for (var func in this.__objectifiedFunctions) if (this.__objectifiedFunctions.hasOwnProperty(func)) if (values = this.__objectifiedFunctions[func].replace(" ", "").split(","), func in this.__paramMaps) for (var map in this.__paramMaps) func === map && this.valuesToSet.push(this.__stripFunctionAxis(func) + "3d(" + this.__map2DTransformParams(values, this.__paramMaps[func]) + ")");
                else this.valuesToSet.push(func + "(" + this.__objectifiedFunctions[func] + ")");
                return this.valuesToSet.join(" ")
            },
            __init: function(functions2d) {
                this.valuesToSet = [],
                this.__objectifiedFunctions = "object" == typeof functions2d ? functions2d: {},
                "string" == typeof functions2d && (this.__objectifiedFunctions = this.__objectifyFunctionString(functions2d))
            },
            __map2DTransformParams: function(params2d, template3d) {
                return params2d.forEach(function(val, i) {
                    template3d = template3d.replace("p" + (i + 1), val)
                }),
                template3d
            },
            __splitFunctionStringToArray: function(functionString) {
                return functionString.match(/[\w]+\(.+?\)/g)
            },
            __splitFunctionNameAndParams: function(functionString) {
                return functionString.match(/(.*)\((.*)\)/)
            },
            __stripFunctionAxis: function(func) {
                return func.match(/([a-z]+)(|X|Y)$/)[1]
            },
            __objectifyFunctionString: function(functionString) {
                var splitMember, self = this;
                return this.__splitFunctionStringToArray(functionString).forEach(function(member) {
                    splitMember = self.__splitFunctionNameAndParams(member),
                    self.__objectifiedFunctions[splitMember[1]] = splitMember[2]
                }),
                this.__objectifiedFunctions
            }
        };
        module.exports = vendorTransformHelper
    },
    {}],
    36 : [function(require, module) {
        "use strict";
        var browser = require("ac-browser"),
        feature = require("ac-feature"),
        ac_log = require("./log");
        feature.supportsThreeD = function() {
            return ac_log("ac-base.Environment.Feature.supportsThreeD is deprecated. Please use module:ac-feature.threeDTransformsAvailable instead."),
            feature.threeDTransformsAvailable()
        },
        feature.isCSSAvailable = function(property) {
            return ac_log("ac-base.Environment.Feature.isCSSAvailable is deprecated. Please use module:ac-feature.cssPropertyAvailable instead."),
            feature.cssPropertyAvailable(property)
        },
        feature.supportsCanvas = function() {
            return ac_log("ac-base.Environment.Feature.supportsCanvas is deprecated. Please use module:ac-feature.canvasAvailable instead."),
            feature.canvasAvailable()
        },
        module.exports = {
            Browser: browser,
            Feature: feature
        }
    },
    {
        "./log": 51,
        "ac-browser": "BZeRrQ",
        "ac-feature": "2/kcxM"
    }],
    37 : [function(require, module) {
        "use strict";
        var ac_Event = {};
        ac_Event.stop = function(evt) {
            evt || (evt = window.event),
            evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = !0,
            evt.preventDefault && evt.preventDefault(),
            evt.stopped = !0,
            evt.returnValue = !1
        },
        ac_Event.target = function(evt) {
            return "undefined" != typeof evt.target ? evt.target: evt.srcElement
        },
        ac_Event.Keys = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ESC: 27,
            SPACE: 32,
            BACKSPACE: 8,
            DELETE: 46,
            END: 35,
            HOME: 36,
            PAGEDOWN: 34,
            PAGEUP: 33,
            RETURN: 13,
            TAB: 9
        },
        module.exports = ac_Event
    },
    {}],
    38 : [function(require, module) {
        "use strict";
        var ac_Array = require("./Array"),
        ac_Function = {};
        ac_Function.emptyFunction = function() {},
        ac_Function.bindAsEventListener = function(__method, obj) {
            var args = ac_Array.toArray(arguments).slice(2);
            return function(event) {
                return __method.apply(obj, [event || window.event].concat(args))
            }
        },
        ac_Function.getParamNames = function(func) {
            var funStr = func.toString();
            return funStr.slice(funStr.indexOf("(") + 1, funStr.indexOf(")")).match(/([^\s,]+)/g) || []
        },
        ac_Function.iterateFramesOverAnimationDuration = function(drawFrameFunction, duration, afterFinish) {
            var animationFrameRequestID, requestAnimationFrameIteratorFunction, startTime, percentProgress = 0;
            duration = 1e3 * duration,
            requestAnimationFrameIteratorFunction = function(t) {
                startTime = startTime || t,
                percentProgress = duration ? Math.min(Math.max(0, (t - startTime) / duration), 1) : 1,
                drawFrameFunction(percentProgress),
                1 > percentProgress ? animationFrameRequestID = window.requestAnimationFrame(requestAnimationFrameIteratorFunction) : (window.cancelAnimationFrame(animationFrameRequestID), "function" == typeof afterFinish && afterFinish())
            },
            animationFrameRequestID = window.requestAnimationFrame(requestAnimationFrameIteratorFunction)
        },
        module.exports = ac_Function
    },
    {
        "./Array": 24
    }],
    39 : [function(require, module) {
        "use strict";
        var ac_NotificationCenter = require("./NotificationCenter"),
        ac_Class = require("./Class"),
        ac_Object = require("./Object"),
        ac_Element = require("./Element"),
        ac_History = {};
        ac_History.HashChange = ac_Class({
            initialize: function(notificationString) {
                this._boundEventHandler = null,
                this._notificationString = notificationString || "ac-history-hashchange",
                this.synthesize()
            },
            __eventHandler: function(evt) {
                var hashChangeEvent = new ac_History.HashChange.Event(evt);
                ac_NotificationCenter.publish(this.notificationString(), {
                    data: hashChangeEvent
                },
                !1)
            },
            __bindWindowEvent: function() {
                this.setBoundEventHandler(this.__eventHandler.bind(this)),
                ac_Element.addEventListener(window, "hashchange", this.boundEventHandler())
            },
            __unbindWindowEvent: function() {
                ac_Element.removeEventListener(window, "hashchange", this.boundEventHandler()),
                this.setBoundEventHandler(null)
            },
            subscribe: function(callback) {
                null === this.boundEventHandler() && this.__bindWindowEvent(),
                ac_NotificationCenter.subscribe(this.notificationString(), callback)
            },
            unsubscribe: function(callback) {
                ac_NotificationCenter.unsubscribe(this.notificationString(), callback),
                ac_NotificationCenter.hasSubscribers(this.notificationString()) || this.__unbindWindowEvent()
            }
        }),
        ac_History.HashChange.Event = ac_Class({
            initialize: function(originalEvt) {
                this.event = originalEvt,
                ac_Object.extend(this, originalEvt),
                this.hasOwnProperty("oldURL") && this.oldURL.match("#") && (this.oldHash = this.oldURL.split("#")[1]),
                this.hasOwnProperty("newURL") && this.newURL.match("#") && (this.newHash = this.newURL.split("#")[1])
            }
        }),
        module.exports = ac_History
    },
    {
        "./Class": 26,
        "./Element": 30,
        "./NotificationCenter": 40,
        "./Object": 41
    }],
    40 : [function(require, module) {
        "use strict";
        var subscribers = {};
        module.exports = {
            publish: function(event, options, asynchronous) {
                options = options || {};
                var publish = function() { ! subscribers[event] || subscribers[event].length < 1 || subscribers[event].forEach(function(subscriber) {
                        "undefined" != typeof subscriber && (subscriber.target && options.target ? subscriber.target === options.target && subscriber.callback(options.data) : subscriber.callback(options.data))
                    })
                };
                asynchronous === !0 ? window.setTimeout(publish, 10) : publish()
            },
            subscribe: function(event, callback, target) {
                subscribers[event] || (subscribers[event] = []),
                subscribers[event].push({
                    callback: callback,
                    target: target
                })
            },
            unsubscribe: function(event, callback, target) {
                var subscribersForEventClone = subscribers[event].slice(0);
                subscribers[event].forEach(function(subscriber, i) {
                    "undefined" != typeof subscriber && (target ? callback === subscriber.callback && subscriber.target === target && subscribersForEventClone.splice(i, 1) : callback === subscriber.callback && subscribersForEventClone.splice(i, 1))
                }),
                subscribers[event] = subscribersForEventClone
            },
            hasSubscribers: function(event, target) {
                if (!subscribers[event] || subscribers[event].length < 1) return ! 1;
                if (!target) return ! 0;
                for (var subscriber, i = subscribers[event].length; i--;) if (subscriber = subscribers[event][i], subscriber.target && target && subscriber.target === target) return ! 0;
                return ! 1
            }
        }
    },
    {}],
    41 : [function(require, module) {
        "use strict";
        var ac_Synthesize = require("./Synthesize"),
        qs = require("qs"),
        ac_Object = {},
        hasOwnProp = Object.prototype.hasOwnProperty;
        ac_Object.extend = function() {
            var args, dest;
            return args = arguments.length < 2 ? [{},
            arguments[0]] : [].slice.call(arguments),
            dest = args.shift(),
            args.forEach(function(source) {
                for (var property in source) hasOwnProp.call(source, property) && (dest[property] = source[property])
            }),
            dest
        },
        ac_Object.clone = function(object) {
            return ac_Object.extend({},
            object)
        },
        ac_Object.getPrototypeOf = Object.getPrototypeOf ? Object.getPrototypeOf: "object" == typeof this.__proto__ ?
        function(obj) {
            return obj.__proto__
        }: function(obj) {
            var oldConstructor, constructor = obj.constructor;
            if (hasOwnProp.call(obj, "constructor")) {
                if (oldConstructor = constructor, !delete obj.constructor) return null;
                constructor = obj.constructor,
                obj.constructor = oldConstructor
            }
            return constructor ? constructor.prototype: null
        },
        ac_Object.toQueryParameters = function(object) {
            if ("object" != typeof object) throw new TypeError("toQueryParameters error: argument is not an object");
            return qs.stringify(object)
        },
        ac_Object.isEmpty = function(object) {
            var prop;
            if ("object" != typeof object) throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object");
            for (prop in object) if (hasOwnProp.call(object, prop)) return ! 1;
            return ! 0
        },
        ac_Object.synthesize = function(object) {
            if ("object" == typeof object) return ac_Object.extend(object, ac_Object.clone(ac_Synthesize)),
            object.synthesize(),
            object;
            throw new TypeError("Argument supplied was not a valid object.")
        },
        module.exports = ac_Object
    },
    {
        "./Synthesize": 46,
        qs: 17
    }],
    42 : [function(require, module) {
        "use strict";
        var ac_RegExp = {};
        ac_RegExp.isRegExp = function(obj) {
            return window.RegExp ? obj instanceof RegExp: !1
        },
        module.exports = ac_RegExp
    },
    {}],
    43 : [function(require, module) {
        "use strict";
        var ac_Class = require("./Class"),
        ac_Object = require("./Object"),
        ac_Element = require("./Element"),
        ac_Registry = ac_Class();
        ac_Registry.Component = require("./Registry/Component"),
        ac_Registry.prototype = {
            __defaultOptions: {
                contextInherits: [],
                matchCatchAll: !1
            },
            initialize: function(prefix, options) {
                if ("string" != typeof prefix) throw new Error("Prefix not defined for Component Registry");
                "object" != typeof options && (options = {}),
                this._options = ac_Object.extend(ac_Object.clone(this.__defaultOptions), options),
                this._prefix = prefix,
                this._reservedNames = [],
                this.__model = [],
                this.__lookup = {},
                ac_Object.synthesize(this)
            },
            addComponent: function(name, properties, qualifier, parentComponentName, context) {
                var component, parent = null;
                if (!this.__isReserved(name) && "string" == typeof name) {
                    if ("string" == typeof parentComponentName && (parent = this.lookup(parentComponentName)), parent || "_base" === name || (parent = this.lookup("_base") || this.addComponent("_base")), this.lookup(name)) throw new Error("Cannot overwrite existing Component: " + name);
                    return "object" != typeof context && (context = {}),
                    "undefined" == typeof context.inherits && Array.isArray(this._options.contextInherits) && (context.inherits = this._options.contextInherits),
                    component = this.__lookup[name] = new ac_Registry.Component(name, properties, qualifier, parent, context),
                    this.__addToModel(component),
                    component
                }
                return null
            },
            match: function(element) {
                var component;
                if (component = this.__matchName(element)) return component;
                if (component = this.__matchQualifier(element)) return component;
                if (this.options().matchCatchAll === !0) {
                    if ("undefined" != typeof this.__model[1]) {
                        if ("undefined" != typeof this.__model[1][0]) return this.__model[1][0];
                        throw new Error("Catchall Type not defined")
                    }
                    throw new Error("No non-_base types defined at index 1.")
                }
                return null
            },
            __matchName: function(element) {
                if (!ac_Element.isElement(element)) return null;
                var i, ii;
                for (i = this.__model.length - 1; i >= 0; i--) if (Array.isArray(this.__model[i])) for (ii = this.__model[i].length - 1; ii >= 0; ii--) if (ac_Element.hasClassName(element, this._prefix + this.__model[i][ii].name())) return this.__model[i][ii];
                return null
            },
            __matchQualifier: function(element) {
                if (!ac_Element.isElement(element)) return null;
                var i, ii;
                for (i = this.__model.length - 1; i >= 0; i--) if (Array.isArray(this.__model[i])) for (ii = this.__model[i].length - 1; ii >= 0; ii--) if ("function" == typeof this.__model[i][ii].qualifier && this.__model[i][ii].qualifier.apply(this.__model[i][ii], [element, this._prefix]) === !0) return this.__model[i][ii];
                return null
            },
            __addToModel: function(component) {
                ac_Registry.Component.isComponent(component) && ("undefined" == typeof this.__model[component.level()] && (this.__model[component.level()] = []), this.__model[component.level()].push(component))
            },
            lookup: function(name) {
                return "string" == typeof name && "undefined" != typeof this.__lookup[name] ? this.__lookup[name] : null
            },
            hasComponent: function(component) {
                var comparisionComponent;
                return "object" == typeof component && "function" == typeof component.name && (comparisionComponent = this.lookup(component.name())) ? comparisionComponent === component: !1
            },
            reserveName: function(name) {
                if ("string" != typeof name) throw new Error("Cannot reserve name: Name must be a string");
                if (null !== this.lookup(name)) throw new Error("Cannot reserve name: Component with name already exists.");
                this.__isReserved(name) || this._reservedNames.push(name)
            },
            __isReserved: function(name) {
                if ("string" == typeof name) return - 1 !== this._reservedNames.indexOf(name);
                throw new Error("Cannot check if this name is reserved because it is not a String.")
            }
        },
        module.exports = ac_Registry
    },
    {
        "./Class": 26,
        "./Element": 30,
        "./Object": 41,
        "./Registry/Component": 44
    }],
    44 : [function(require, module) {
        "use strict";
        var ac_Class = require("../Class"),
        ac_Function = require("../Function"),
        ac_Object = require("../Object"),
        ac_Registry_Component = ac_Class();
        ac_Registry_Component.prototype = {
            initialize: function(name, properties, qualifier, parent, context) {
                if ("string" != typeof name) throw new Error("Cannot create Component without a name");
                this._name = name,
                this._properties = properties || {},
                this.qualifier = "function" == typeof qualifier ? qualifier: ac_Function.emptyFunction,
                this._parent = parent,
                this._context = context || {},
                ac_Object.synthesize(this)
            },
            properties: function() {
                var parentProperties = "undefined" == typeof this._parent || null === this._parent ? {}: this._parent.properties();
                return ac_Object.extend(parentProperties, this._properties)
            },
            context: function(key) {
                return this._context[key] ? this._context[key] : Array.isArray(this._context.inherits) && -1 !== this._context.inherits.indexOf[key] && this.parent() ? this.parent().context(key) : null
            },
            level: function() {
                return "undefined" != typeof this._level ? this._level: "_base" === this._name ? 0 : "undefined" == typeof this._parent || "_base" === this._parent.name() ? 1 : this._parent.level() + 1
            }
        },
        ac_Registry_Component.isComponent = function(obj) {
            return obj instanceof ac_Registry_Component
        },
        module.exports = ac_Registry_Component
    },
    {
        "../Class": 26,
        "../Function": 38,
        "../Object": 41
    }],
    45 : [function(require, module) {
        "use strict";
        var qs = require("qs"),
        ac_String = {};
        ac_String.isString = function(object) {
            return "string" == typeof object
        },
        ac_String.toCamelCase = function(string) {
            if (!ac_String.isString(string)) throw new TypeError("Argument must be of type String.");
            return string.replace(/-+(.)?/g,
            function(match, character) {
                return character ? character.toUpperCase() : ""
            })
        },
        ac_String.queryStringToObject = function(queryString) {
            if (!ac_String.isString(queryString)) throw new TypeError("QueryStringToObject error: argument must be a string");
            return qs.parse(queryString)
        },
        ac_String.toQueryPair = function(key, value) {
            if (!ac_String.isString(key) || !ac_String.isString(value)) throw new TypeError("toQueryPair error: argument must be a string");
            return encodeURIComponent(key) + "=" + encodeURIComponent(value)
        },
        module.exports = ac_String
    },
    {
        qs: 17
    }],
    46 : [function(require, module) {
        "use strict";
        function synthesizeGetter(privateVariable, object) {
            var functionName = privateVariable.slice(1, privateVariable.length);
            "undefined" == typeof object[functionName] && (object[functionName] = function() {
                return object[privateVariable]
            })
        }
        function synthesizeSetter(privateVariable, object) {
            var functionName = privateVariable.slice(1, privateVariable.length);
            functionName = "set" + functionName.slice(0, 1).toUpperCase() + functionName.slice(1, functionName.length),
            "undefined" == typeof object[functionName] && (object[functionName] = function(value) {
                object[privateVariable] = value
            })
        }
        var ac_Synthesize = {};
        ac_Synthesize.synthesize = function(object) {
            "object" != typeof object && (object = this);
            var privateVariable;
            for (privateVariable in object) object.hasOwnProperty(privateVariable) && "_" === privateVariable.charAt(0) && "_" !== privateVariable.charAt(1) && "function" != typeof object[privateVariable] && (synthesizeGetter(privateVariable, object), synthesizeSetter(privateVariable, object))
        },
        module.exports = ac_Synthesize
    },
    {}],
    47 : [function(require, module) {
        "use strict";
        var ac_Viewport = {};
        ac_Viewport.scrollOffsets = function() {
            return {
                x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            }
        },
        ac_Viewport.dimensions = function() {
            return {
                height: window.innerHeight || document.documentElement.clientHeight,
                width: window.innerWidth || document.documentElement.clientWidth
            }
        },
        module.exports = ac_Viewport
    },
    {}],
    48 : [function(require, module) {
        "use strict";
        module.exports = function(string) {
            var unicodeValueForCurrentChar, i, adlerModulo = 65521,
            checksum16a = 1,
            checksum16b = 0;
            for (i = 0; i < string.length; i += 1) unicodeValueForCurrentChar = string.charCodeAt(i),
            checksum16a = (checksum16a + unicodeValueForCurrentChar) % adlerModulo,
            checksum16b = (checksum16b + checksum16a) % adlerModulo;
            return checksum16b << 16 | checksum16a
        }
    },
    {}],
    49 : [function(require, module) {
        "use strict";
        var ac_Element = require("./Element"),
        ac_Function = require("./Function");
        module.exports = function(object, element, handlerDictionary) {
            var aKey;
            if (element = ac_Element.getElementById(element), !ac_Element.isElement(element)) throw "Invalid or non-existent element passed to bindEventListeners.";
            for (aKey in handlerDictionary) if (handlerDictionary.hasOwnProperty(aKey)) {
                var aVal = handlerDictionary[aKey];
                "function" == typeof aVal ? ac_Element.addEventListener(element, aKey, ac_Function.bindAsEventListener(aVal, object)) : "string" == typeof aVal && ac_Element.addEventListener(element, aKey, ac_Function.bindAsEventListener(object[aVal], object))
            }
        }
    },
    {
        "./Element": 30,
        "./Function": 38
    }],
    50 : [function(require, module) {
        "use strict";
        module.exports = {
            console: window.console,
            document: document,
            window: window
        }
    },
    {}],
    51 : [function(require, module) {
        "use strict";
        var debugMessagingKey = "f7c9180f-5c45-47b4-8de4-428015f096c0",
        allowDebugMessaging = !!
        function() {
            try {
                return window.localStorage.getItem(debugMessagingKey)
            } catch(err) {}
        } ();
        module.exports = function(message) {
            window.console && "function" == typeof console.log && allowDebugMessaging && console.log(message)
        }
    },
    {}],
    52 : [function(require, module) {
        "use strict";
        module.exports = function(namespacePath) {
            var i;
            if (! (namespacePath && namespacePath.match && namespacePath.match(/\S/))) throw "Attempt to create namespace with no name.";
            var splitnamespaceArr = namespacePath.split(/\./),
            cursor = window;
            for (i = 0; i < splitnamespaceArr.length; i++) cursor[splitnamespaceArr[i]] = cursor[splitnamespaceArr[i]] || {},
            cursor = cursor[splitnamespaceArr[i]]
        }
    },
    {}],
    53 : [function(require, module) {
        "use strict";
        var ac_String = require("./String");
        module.exports = function() {
            var object = {},
            queryString = window.location.toString().split("?")[1];
            return ac_String.isString(queryString) && (object = ac_String.queryStringToObject(queryString)),
            object
        }
    },
    {
        "./String": 45
    }],
    54 : [function(require, module) {
        "use strict";
        module.exports = function() {
            var arr = ["abbr", "article", "aside", "command", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "picture", "progress", "section", "source", "summary", "time", "video"];
            arr.forEach(function(name) {
                document.createElement(name)
            })
        }
    },
    {}],
    55 : [function(require, module) {
        "use strict";
        module.exports = function(ac_Array, browser) {
            browser.IE.documentMode <= 8 && (ac_Array.toArray = function(arrayLike) {
                var i, array = [],
                len = arrayLike.length;
                if (len > 0) for (i = 0; len > i; i += 1) array.push(arrayLike[i]);
                return array
            })
        }
    },
    {}],
    56 : [function(require, module) {
        "use strict";
        var ac_Array = require("../../Array"),
        ac_sizzle = require("../../vendor/Sizzle");
        module.exports = function(ac_Element, browser, sizzle) {
            var documentMode = browser.IE.documentMode;
            sizzle = sizzle || ac_sizzle,
            8 > documentMode ? ac_Element.selectAll = function(selector, context) {
                if ("undefined" == typeof context) context = document;
                else if (!ac_Element.isElement(context) && 9 !== context.nodeType && 11 !== context.nodeType) throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType");
                if ("string" != typeof selector) throw new TypeError("ac-base.Element.selectAll: Selector must be a string");
                if (11 === context.nodeType) {
                    var childMatches, matches = [];
                    return ac_Array.toArray(context.childNodes).forEach(function(node) {
                        sizzle.matchesSelector(node, selector) && matches.push(node),
                        (childMatches = sizzle(selector, node).length > 0) && matches.concat(childMatches)
                    }),
                    matches
                }
                return sizzle(selector, context)
            }: 9 > documentMode && (ac_Element.selectAll = function(selector, context) {
                if ("undefined" == typeof context) context = document;
                else if (!ac_Element.isElement(context) && 9 !== context.nodeType && 11 !== context.nodeType) throw new TypeError("ac-base.Element.selectAll: Invalid context nodeType");
                if ("string" != typeof selector) throw new TypeError("ac-base.Element.selectAll: Selector must be a string");
                return ac_Array.toArray(context.querySelectorAll(selector))
            }),
            8 > documentMode && (ac_Element.select = function(selector, context) {
                if ("undefined" == typeof context) context = document;
                else if (!ac_Element.isElement(context) && 9 !== context.nodeType && 11 !== context.nodeType) throw new TypeError("ac-base.Element.select: Invalid context nodeType");
                if ("string" != typeof selector) throw new TypeError("ac-base.Element.select: Selector must be a string");
                if (11 === context.nodeType) {
                    var childMatches, match = [];
                    return ac_Array.toArray(context.childNodes).some(function(node) {
                        return sizzle.matchesSelector(node, selector) ? (match = node, !0) : (childMatches = sizzle(selector, node).length > 0) ? (match = childMatches[0], !0) : void 0
                    }),
                    match
                }
                return sizzle(selector, context)[0]
            }),
            9 > documentMode && (ac_Element.matchesSelector = function(element, selector) {
                return sizzle.matchesSelector(element, selector)
            },
            ac_Element.filterBySelector = function(elements, selector) {
                return sizzle.matches(selector, elements)
            }),
            9 > documentMode && "function" != typeof window.getComputedStyle && (ac_Element.getStyle = function(element, style, css) {
                element = ac_Element.getElementById(element);
                var alphaFilter, value;
                return css = css || element.currentStyle,
                css ? (style = style.replace(/-(\w)/g, ac_Element.setStyle.__camelCaseReplace), style = "float" === style ? "styleFloat": style, "opacity" === style ? (alphaFilter = element.filters["DXImageTransform.Microsoft.Alpha"] || element.filters.Alpha, alphaFilter ? parseFloat(alphaFilter.Opacity / 100) : 1) : (value = css[style] || null, "auto" === value ? null: value)) : void 0
            }),
            8 >= documentMode && (ac_Element.setStyle.__superSetStyle = ac_Element.setStyle.__setStyle, ac_Element.setStyle.__setStyle = function(element, camelCaseProp, stylesObj, stylesValue) {
                "opacity" === camelCaseProp ? ac_Element.setStyle.__setOpacity(element, stylesValue) : ac_Element.setStyle.__superSetStyle(element, camelCaseProp, stylesObj, stylesValue)
            },
            ac_Element.setStyle.__setOpacity = function(element, value) {
                value = value > 1 ? 1 : 100 * (1e-5 > value ? 0 : value);
                var alphaFilter = element.filters["DXImageTransform.Microsoft.Alpha"] || element.filters.Alpha;
                alphaFilter ? alphaFilter.Opacity = value: element.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + value + ")"
            }),
            browser.version < 8 && (ac_Element.getBoundingBox = function(element) {
                element = ac_Element.getElementById(element);
                var left = element.offsetLeft,
                top = element.offsetTop,
                w = element.offsetWidth,
                h = element.offsetHeight;
                return {
                    top: top,
                    right: left + w,
                    bottom: top + h,
                    left: left,
                    width: w,
                    height: h
                }
            })
        }
    },
    {
        "../../Array": 24,
        "../../vendor/Sizzle": 59
    }],
    57 : [function(require, module) {
        "use strict";
        function ancestorHasLayout(element, limitElement) {
            for (var hasLayout = !1,
            currentElement = element.parentNode; currentElement !== limitElement;) if (currentElement) {
                if (currentElement.currentStyle.hasLayout) {
                    hasLayout = !0;
                    break
                }
                currentElement = currentElement.parentNode
            }
            return hasLayout
        }
        var ac_Element = require("../../Element");
        module.exports = function() {
            var parent, anchor, booster, aPosition, zIdx, zIndices = [],
            baseUri = ("https:" === location.protocol ? "https://ssl": "http://images") + ".apple.com",
            g = "g",
            backgroundImage = "url(" + baseUri + "/global/elements/blank." + g + "if)";
            ac_Element.selectAll("a > * img").forEach(function(img) {
                parent = img.parentNode,
                anchor = ac_Element.ancestor(img, "a"),
                ancestorHasLayout(img, anchor) && img.height > 0 && img.width > 0 && (ac_Element.select("ieclickbooster", anchor) || (booster = document.createElement("ieclickbooster"), aPosition = ac_Element.getStyle(anchor, "position"), "static" === aPosition && ac_Element.setStyle(anchor, {
                    position: "relative"
                }), ac_Element.selectAll("> *", anchor).forEach(function(element) {
                    var elementZidx = parseInt(element.currentStyle.zIndex, 10);
                    elementZidx > 0 && zIndices.push(elementZidx)
                }), zIndices.sort(function(a, b) {
                    return b - a
                }), zIdx = zIndices[0] ? zIndices[0].toString() : "1", ac_Element.insert(booster, anchor), ac_Element.setStyle(booster, {
                    display: "block",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    background: backgroundImage,
                    cursor: "pointer",
                    zIndex: zIdx
                })))
            })
        }
    },
    {
        "../../Element": 30
    }],
    58 : [function(require, module) {
        "use strict";
        var uid = 0;
        module.exports = function() {
            return uid++
        }
    },
    {}],
    59 : [function(require, module) {
        /*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
        !
        function(window, undefined) {
            function multipleContexts(selector, contexts, results, seed) {
                for (var i = 0,
                len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results, seed)
            }
            function handlePOSGroup(selector, posfilter, argument, contexts, seed, not) {
                var results, fn = Expr.setFilters[posfilter.toLowerCase()];
                return fn || Sizzle.error(posfilter),
                (selector || !(results = seed)) && multipleContexts(selector || "*", contexts, results = [], seed),
                results.length > 0 ? fn(results, argument, not) : []
            }
            function handlePOS(selector, context, results, seed, groups) {
                for (var match, not, anchor, ret, elements, currentContexts, part, lastIndex, i = 0,
                len = groups.length,
                rpos = matchExpr.POS,
                rposgroups = new RegExp("^" + rpos.source + "(?!" + whitespace + ")", "i"), setUndefined = function() {
                    for (var i = 1,
                    len = arguments.length - 2; len > i; i++) arguments[i] === undefined && (match[i] = undefined)
                }; len > i; i++) {
                    for (rpos.exec(""), selector = groups[i], ret = [], anchor = 0, elements = seed; match = rpos.exec(selector);) lastIndex = rpos.lastIndex = match.index + match[0].length,
                    lastIndex > anchor && (part = selector.slice(anchor, match.index), anchor = lastIndex, currentContexts = [context], rcombinators.test(part) && (elements && (currentContexts = elements), elements = seed), (not = rendsWithNot.test(part)) && (part = part.slice(0, -5).replace(rcombinators, "$&*")), match.length > 1 && match[0].replace(rposgroups, setUndefined), elements = handlePOSGroup(part, match[1], match[2], currentContexts, elements, not));
                    elements ? (ret = ret.concat(elements), (part = selector.slice(anchor)) && ")" !== part ? multipleContexts(part, ret, results, seed) : push.apply(results, ret)) : Sizzle(selector, context, results, seed)
                }
                return 1 === len ? results: Sizzle.uniqueSort(results)
            }
            function tokenize(selector, context, xml) {
                for (var tokens, soFar, type, groups = [], i = 0, match = rselector.exec(selector), matched = !match.pop() && !match.pop(), selectorGroups = matched && selector.match(rgroups) || [""], preFilters = Expr.preFilter, filters = Expr.filter, checkContext = !xml && context !== document; null != (soFar = selectorGroups[i]) && matched; i++) for (groups.push(tokens = []), checkContext && (soFar = " " + soFar); soFar;) {
                    matched = !1,
                    (match = rcombinators.exec(soFar)) && (soFar = soFar.slice(match[0].length), matched = tokens.push({
                        part: match.pop().replace(rtrim, " "),
                        captures: match
                    }));
                    for (type in filters) ! (match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match, context, xml)) || (soFar = soFar.slice(match.shift().length), matched = tokens.push({
                        part: type,
                        captures: match
                    }));
                    if (!matched) break
                }
                return matched || Sizzle.error(selector),
                groups
            }
            function addCombinator(matcher, combinator, context) {
                var dir = combinator.dir,
                doneName = done++;
                return matcher || (matcher = function(elem) {
                    return elem === context
                }),
                combinator.first ?
                function(elem, context) {
                    for (; elem = elem[dir];) if (1 === elem.nodeType) return matcher(elem, context) && elem
                }: function(elem, context) {
                    for (var cache, dirkey = doneName + "." + dirruns,
                    cachedkey = dirkey + "." + cachedruns; elem = elem[dir];) if (1 === elem.nodeType) {
                        if ((cache = elem[expando]) === cachedkey) return ! 1;
                        if ("string" == typeof cache && 0 === cache.indexOf(dirkey)) {
                            if (elem.sizset) return elem
                        } else {
                            if (elem[expando] = cachedkey, matcher(elem, context)) return elem.sizset = !0,
                            elem;
                            elem.sizset = !1
                        }
                    }
                }
            }
            function addMatcher(higher, deeper) {
                return higher ?
                function(elem, context) {
                    var result = deeper(elem, context);
                    return result && higher(result === !0 ? elem: result, context)
                }: deeper
            }
            function matcherFromTokens(tokens, context, xml) {
                for (var token, matcher, i = 0; token = tokens[i]; i++) Expr.relative[token.part] ? matcher = addCombinator(matcher, Expr.relative[token.part], context) : (token.captures.push(context, xml), matcher = addMatcher(matcher, Expr.filter[token.part].apply(null, token.captures)));
                return matcher
            }
            function matcherFromGroupMatchers(matchers) {
                return function(elem, context) {
                    for (var matcher, j = 0; matcher = matchers[j]; j++) if (matcher(elem, context)) return ! 0;
                    return ! 1
                }
            }
            var cachedruns, dirruns, sortOrder, siblingCheck, assertGetIdNotName, document = window.document,
            docElem = document.documentElement,
            strundefined = "undefined",
            hasDuplicate = !1,
            baseHasDuplicate = !0,
            done = 0,
            slice = [].slice,
            push = [].push,
            expando = ("sizcache" + Math.random()).replace(".", ""),
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",
            identifier = "(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",
            operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + "+)" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + "+)|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + "+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",
            pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
            combinators = whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*",
            groups = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + attributes + "|" + pseudos.replace(2, 7) + "|[^\\\\(),])+",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcombinators = new RegExp("^" + combinators),
            rgroups = new RegExp(groups + "?(?=" + whitespace + "*,|$)", "g"),
            rselector = new RegExp("^(?:(?!,)(?:(?:^|,)" + whitespace + "*" + groups + ")*?|" + whitespace + "*(.*?))(\\)|$)"),
            rtokens = new RegExp(groups.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + combinators, "g"),
            rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rendsWithNot = /:not\($/,
            rheader = /h\d/i,
            rinputs = /input|select|textarea|button/i,
            rbackslash = /\\(?!\\)/g,
            matchExpr = {
                ID: new RegExp("^#(" + characterEncoding + "+)"),
                CLASS: new RegExp("^\\.(" + characterEncoding + "+)"),
                NAME: new RegExp("^\\[name=['\"]?(" + characterEncoding + "+)['\"]?\\]"),
                TAG: new RegExp("^(" + characterEncoding.replace("[-", "[-\\*") + "+)"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                POS: new RegExp(pos, "ig"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
            },
            classCache = {},
            cachedClasses = [],
            compilerCache = {},
            cachedSelectors = [],
            markFunction = function(fn) {
                return fn.sizzleFilter = !0,
                fn
            },
            createInputFunction = function(type) {
                return function(elem) {
                    return "input" === elem.nodeName.toLowerCase() && elem.type === type
                }
            },
            createButtonFunction = function(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return ("input" === name || "button" === name) && elem.type === type
                }
            },
            assert = function(fn) {
                var pass = !1,
                div = document.createElement("div");
                try {
                    pass = fn(div)
                } catch(e) {}
                return div = null,
                pass
            },
            assertAttributes = assert(function(div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return "boolean" !== type && "string" !== type
            }),
            assertUsableName = assert(function(div) {
                div.id = expando + 0,
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>",
                docElem.insertBefore(div, docElem.firstChild);
                var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
                return assertGetIdNotName = !document.getElementById(expando),
                docElem.removeChild(div),
                pass
            }),
            assertTagNameNoComments = assert(function(div) {
                return div.appendChild(document.createComment("")),
                0 === div.getElementsByTagName("*").length
            }),
            assertHrefNotNormalized = assert(function(div) {
                return div.innerHTML = "<a href='#'></a>",
                div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href")
            }),
            assertUsableClassName = assert(function(div) {
                return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
                div.getElementsByClassName && 0 !== div.getElementsByClassName("e").length ? (div.lastChild.className = "e", 1 !== div.getElementsByClassName("e").length) : !1
            }),
            Sizzle = function(selector, context, results, seed) {
                results = results || [],
                context = context || document;
                var match, elem, xml, m, nodeType = context.nodeType;
                if (1 !== nodeType && 9 !== nodeType) return [];
                if (!selector || "string" != typeof selector) return results;
                if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem),
                        results
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem),
                    results
                } else {
                    if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)),
                    results;
                    if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)),
                    results
                }
                return select(selector, context, results, seed, xml)
            },
            Expr = Sizzle.selectors = {
                cacheLength: 50,
                match: matchExpr,
                order: ["ID", "TAG"],
                attrHandle: {},
                createPseudo: markFunction,
                find: {
                    ID: assertGetIdNotName ?
                    function(id, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(id);
                            return m && m.parentNode ? [m] : []
                        }
                    }: function(id, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(id);
                            return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined: []
                        }
                    },
                    TAG: assertTagNameNoComments ?
                    function(tag, context) {
                        return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                    }: function(tag, context) {
                        var results = context.getElementsByTagName(tag);
                        if ("*" === tag) {
                            for (var elem, tmp = [], i = 0; elem = results[i]; i++) 1 === elem.nodeType && tmp.push(elem);
                            return tmp
                        }
                        return results
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(match) {
                        return match[1] = match[1].replace(rbackslash, ""),
                        match[3] = (match[4] || match[5] || "").replace(rbackslash, ""),
                        "~=" === match[2] && (match[3] = " " + match[3] + " "),
                        match.slice(0, 4)
                    },
                    CHILD: function(match) {
                        return match[1] = match[1].toLowerCase(),
                        "nth" === match[1] ? (match[2] || Sizzle.error(match[0]), match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * ("even" === match[2] || "odd" === match[2])), match[4] = +(match[6] + match[7] || "odd" === match[2])) : match[2] && Sizzle.error(match[0]),
                        match
                    },
                    PSEUDO: function(match) {
                        var argument, unquoted = match[4];
                        return matchExpr.CHILD.test(match[0]) ? null: (unquoted && (argument = rselector.exec(unquoted)) && argument.pop() && (match[0] = match[0].slice(0, argument[0].length - unquoted.length - 1), unquoted = argument[0].slice(0, -1)), match.splice(2, 3, unquoted || match[3]), match)
                    }
                },
                filter: {
                    ID: assertGetIdNotName ?
                    function(id) {
                        return id = id.replace(rbackslash, ""),
                        function(elem) {
                            return elem.getAttribute("id") === id
                        }
                    }: function(id) {
                        return id = id.replace(rbackslash, ""),
                        function(elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === id
                        }
                    },
                    TAG: function(nodeName) {
                        return "*" === nodeName ?
                        function() {
                            return ! 0
                        }: (nodeName = nodeName.replace(rbackslash, "").toLowerCase(),
                        function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                        })
                    },
                    CLASS: function(className) {
                        var pattern = classCache[className];
                        return pattern || (pattern = classCache[className] = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"), cachedClasses.push(className), cachedClasses.length > Expr.cacheLength && delete classCache[cachedClasses.shift()]),
                        function(elem) {
                            return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                        }
                    },
                    ATTR: function(name, operator, check) {
                        return operator ?
                        function(elem) {
                            var result = Sizzle.attr(elem, name),
                            value = result + "";
                            if (null == result) return "!=" === operator;
                            switch (operator) {
                            case "=":
                                return value === check;
                            case "!=":
                                return value !== check;
                            case "^=":
                                return check && 0 === value.indexOf(check);
                            case "*=":
                                return check && value.indexOf(check) > -1;
                            case "$=":
                                return check && value.substr(value.length - check.length) === check;
                            case "~=":
                                return (" " + value + " ").indexOf(check) > -1;
                            case "|=":
                                return value === check || value.substr(0, check.length + 1) === check + "-"
                            }
                        }: function(elem) {
                            return null != Sizzle.attr(elem, name)
                        }
                    },
                    CHILD: function(type, argument, first, last) {
                        if ("nth" === type) {
                            var doneName = done++;
                            return function(elem) {
                                var parent, diff, count = 0,
                                node = elem;
                                if (1 === first && 0 === last) return ! 0;
                                if (parent = elem.parentNode, parent && (parent[expando] !== doneName || !elem.sizset)) {
                                    for (node = parent.firstChild; node && (1 !== node.nodeType || (node.sizset = ++count, node !== elem)); node = node.nextSibling);
                                    parent[expando] = doneName
                                }
                                return diff = elem.sizset - last,
                                0 === first ? 0 === diff: diff % first === 0 && diff / first >= 0
                            }
                        }
                        return function(elem) {
                            var node = elem;
                            switch (type) {
                            case "only":
                            case "first":
                                for (; node = node.previousSibling;) if (1 === node.nodeType) return ! 1;
                                if ("first" === type) return ! 0;
                                node = elem;
                            case "last":
                                for (; node = node.nextSibling;) if (1 === node.nodeType) return ! 1;
                                return ! 0
                            }
                        }
                    },
                    PSEUDO: function(pseudo, argument, context, xml) {
                        var fn = Expr.pseudos[pseudo] || Expr.pseudos[pseudo.toLowerCase()];
                        return fn || Sizzle.error("unsupported pseudo: " + pseudo),
                        fn.sizzleFilter ? fn(argument, context, xml) : fn
                    }
                },
                pseudos: {
                    not: markFunction(function(selector, context, xml) {
                        var matcher = compile(selector.replace(rtrim, "$1"), context, xml);
                        return function(elem) {
                            return ! matcher(elem)
                        }
                    }),
                    enabled: function(elem) {
                        return elem.disabled === !1
                    },
                    disabled: function(elem) {
                        return elem.disabled === !0
                    },
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                    },
                    selected: function(elem) {
                        return elem.parentNode && elem.parentNode.selectedIndex,
                        elem.selected === !0
                    },
                    parent: function(elem) {
                        return !! elem.firstChild
                    },
                    empty: function(elem) {
                        return ! elem.firstChild
                    },
                    contains: markFunction(function(text) {
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                        }
                    }),
                    has: markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0
                        }
                    }),
                    header: function(elem) {
                        return rheader.test(elem.nodeName)
                    },
                    text: function(elem) {
                        var type, attr;
                        return "input" === elem.nodeName.toLowerCase() && "text" === (type = elem.type) && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === type)
                    },
                    radio: createInputFunction("radio"),
                    checkbox: createInputFunction("checkbox"),
                    file: createInputFunction("file"),
                    password: createInputFunction("password"),
                    image: createInputFunction("image"),
                    submit: createButtonFunction("submit"),
                    reset: createButtonFunction("reset"),
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && "button" === elem.type || "button" === name
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName)
                    },
                    focus: function(elem) {
                        var doc = elem.ownerDocument;
                        return ! (elem !== doc.activeElement || doc.hasFocus && !doc.hasFocus() || !elem.type && !elem.href)
                    },
                    active: function(elem) {
                        return elem === elem.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function(elements, argument, not) {
                        return not ? elements.slice(1) : [elements[0]]
                    },
                    last: function(elements, argument, not) {
                        var elem = elements.pop();
                        return not ? elements: [elem]
                    },
                    even: function(elements, argument, not) {
                        for (var results = [], i = not ? 1 : 0, len = elements.length; len > i; i += 2) results.push(elements[i]);
                        return results
                    },
                    odd: function(elements, argument, not) {
                        for (var results = [], i = not ? 0 : 1, len = elements.length; len > i; i += 2) results.push(elements[i]);
                        return results
                    },
                    lt: function(elements, argument, not) {
                        return not ? elements.slice( + argument) : elements.slice(0, +argument)
                    },
                    gt: function(elements, argument, not) {
                        return not ? elements.slice(0, +argument + 1) : elements.slice( + argument + 1)
                    },
                    eq: function(elements, argument, not) {
                        var elem = elements.splice( + argument, 1);
                        return not ? elements: elem
                    }
                }
            };
            Expr.setFilters.nth = Expr.setFilters.eq,
            Expr.filters = Expr.pseudos,
            assertHrefNotNormalized || (Expr.attrHandle = {
                href: function(elem) {
                    return elem.getAttribute("href", 2)
                },
                type: function(elem) {
                    return elem.getAttribute("type")
                }
            }),
            assertUsableName && (Expr.order.push("NAME"), Expr.find.NAME = function(name, context) {
                return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) : void 0
            }),
            assertUsableClassName && (Expr.order.splice(1, 0, "CLASS"), Expr.find.CLASS = function(className, context, xml) {
                return typeof context.getElementsByClassName === strundefined || xml ? void 0 : context.getElementsByClassName(className)
            });
            try {
                slice.call(docElem.childNodes, 0)[0].nodeType
            } catch(e) {
                slice = function(i) {
                    for (var elem, results = []; elem = this[i]; i++) results.push(elem);
                    return results
                }
            }
            var isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? "HTML" !== documentElement.nodeName: !1
            },
            contains = Sizzle.contains = docElem.compareDocumentPosition ?
            function(a, b) {
                return !! (16 & a.compareDocumentPosition(b))
            }: docElem.contains ?
            function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement: a,
                bup = b.parentNode;
                return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup))
            }: function(a, b) {
                for (; b = b.parentNode;) if (b === a) return ! 0;
                return ! 1
            },
            getText = Sizzle.getText = function(elem) {
                var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
                if (nodeType) {
                    if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                        if ("string" == typeof elem.textContent) return elem.textContent;
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                    } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                } else for (; node = elem[i]; i++) ret += getText(node);
                return ret
            };
            Sizzle.attr = function(elem, name) {
                var attr, xml = isXML(elem);
                return xml || (name = name.toLowerCase()),
                Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : assertAttributes || xml ? elem.getAttribute(name) : (attr = elem.getAttributeNode(name), attr ? "boolean" == typeof elem[name] ? elem[name] ? name: null: attr.specified ? attr.value: null: null)
            },
            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
            },
            [0, 0].sort(function() {
                return baseHasDuplicate = 0
            }),
            docElem.compareDocumentPosition ? sortOrder = function(a, b) {
                return a === b ? (hasDuplicate = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
            }: (sortOrder = function(a, b) {
                if (a === b) return hasDuplicate = !0,
                0;
                if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                var al, bl, ap = [],
                bp = [],
                aup = a.parentNode,
                bup = b.parentNode,
                cur = aup;
                if (aup === bup) return siblingCheck(a, b);
                if (!aup) return - 1;
                if (!bup) return 1;
                for (; cur;) ap.unshift(cur),
                cur = cur.parentNode;
                for (cur = bup; cur;) bp.unshift(cur),
                cur = cur.parentNode;
                al = ap.length,
                bl = bp.length;
                for (var i = 0; al > i && bl > i; i++) if (ap[i] !== bp[i]) return siblingCheck(ap[i], bp[i]);
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
            },
            siblingCheck = function(a, b, ret) {
                if (a === b) return ret;
                for (var cur = a.nextSibling; cur;) {
                    if (cur === b) return - 1;
                    cur = cur.nextSibling
                }
                return 1
            }),
            Sizzle.uniqueSort = function(results) {
                var elem, i = 1;
                if (sortOrder && (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate)) for (; elem = results[i]; i++) elem === results[i - 1] && results.splice(i--, 1);
                return results
            };
            var compile = Sizzle.compile = function(selector, context, xml) {
                var tokens, group, i, cached = compilerCache[selector];
                if (cached && cached.context === context) return cached.dirruns++,
                cached;
                for (group = tokenize(selector, context, xml), i = 0; tokens = group[i]; i++) group[i] = matcherFromTokens(tokens, context, xml);
                return cached = compilerCache[selector] = matcherFromGroupMatchers(group),
                cached.context = context,
                cached.runs = cached.dirruns = 0,
                cachedSelectors.push(selector),
                cachedSelectors.length > Expr.cacheLength && delete compilerCache[cachedSelectors.shift()],
                cached
            };
            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements)
            },
            Sizzle.matchesSelector = function(elem, expr) {
                return Sizzle(expr, null, null, [elem]).length > 0
            };
            var select = function(selector, context, results, seed, xml) {
                selector = selector.replace(rtrim, "$1");
                var elements, matcher, i, len, elem, token, type, findContext, notTokens, match = selector.match(rgroups),
                tokens = selector.match(rtokens),
                contextNodeType = context.nodeType;
                if (matchExpr.POS.test(selector)) return handlePOS(selector, context, results, seed, match);
                if (seed) elements = slice.call(seed, 0);
                else if (match && 1 === match.length) {
                    if (tokens.length > 1 && 9 === contextNodeType && !xml && (match = matchExpr.ID.exec(tokens[0]))) {
                        if (context = Expr.find.ID(match[1], context, xml)[0], !context) return results;
                        selector = selector.slice(tokens.shift().length)
                    }
                    for (findContext = (match = rsibling.exec(tokens[0])) && !match.index && context.parentNode || context, notTokens = tokens.pop(), token = notTokens.split(":not")[0], i = 0, len = Expr.order.length; len > i; i++) if (type = Expr.order[i], match = matchExpr[type].exec(token)) {
                        if (elements = Expr.find[type]((match[1] || "").replace(rbackslash, ""), findContext, xml), null == elements) continue;
                        token === notTokens && (selector = selector.slice(0, selector.length - notTokens.length) + token.replace(matchExpr[type], ""), selector || push.apply(results, slice.call(elements, 0)));
                        break
                    }
                }
                if (selector) for (matcher = compile(selector, context, xml), dirruns = matcher.dirruns, null == elements && (elements = Expr.find.TAG("*", rsibling.test(selector) && context.parentNode || context)), i = 0; elem = elements[i]; i++) cachedruns = matcher.runs++,
                matcher(elem, context) && results.push(elem);
                return results
            };
            document.querySelectorAll && !
            function() {
                var disconnectedMatch, oldSelect = select,
                rescape = /'|\\/g,
                rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                rbuggyQSA = [],
                rbuggyMatches = [":active"],
                matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
                assert(function(div) {
                    div.innerHTML = "<select><option selected></option></select>",
                    div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                    div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
                }),
                assert(function(div) {
                    div.innerHTML = "<p test=''></p>",
                    div.querySelectorAll("[test^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"),
                    div.innerHTML = "<input type='hidden'>",
                    div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled")
                }),
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")),
                select = function(selector, context, results, seed, xml) {
                    if (! (seed || xml || rbuggyQSA && rbuggyQSA.test(selector))) if (9 === context.nodeType) try {
                        return push.apply(results, slice.call(context.querySelectorAll(selector), 0)),
                        results
                    } catch(qsaError) {} else if (1 === context.nodeType && "object" !== context.nodeName.toLowerCase()) {
                        var old = context.getAttribute("id"),
                        nid = old || expando,
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        old ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid);
                        try {
                            return push.apply(results, slice.call(newContext.querySelectorAll(selector.replace(rgroups, "[id='" + nid + "'] $&")), 0)),
                            results
                        } catch(qsaError) {} finally {
                            old || context.removeAttribute("id")
                        }
                    }
                    return oldSelect(selector, context, results, seed, xml)
                },
                matches && (assert(function(div) {
                    disconnectedMatch = matches.call(div, "div");
                    try {
                        matches.call(div, "[test!='']:sizzle"),
                        rbuggyMatches.push(Expr.match.PSEUDO)
                    } catch(e) {}
                }), rbuggyMatches = new RegExp(rbuggyMatches.join("|")), Sizzle.matchesSelector = function(elem, expr) {
                    if (expr = expr.replace(rattributeQuotes, "='$1']"), !(isXML(elem) || rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                        var ret = matches.call(elem, expr);
                        if (ret || disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                    } catch(e) {}
                    return Sizzle(expr, null, null, [elem]).length > 0
                })
            } (),
            "object" == typeof module && module.exports ? module.exports = Sizzle: window.Sizzle = Sizzle
        } (window)
    },
    {}]
},
{},
["QQX0yI"]),
require("ac-base"),
function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports,
            function(e) {
                var n = t[o][1][e];
                return s(n ? n: e)
            },
            f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require,
    o = 0; o < r.length; o++) s(r[o]);
    return s
} ({
    1 : [function(require, module) {
        "use strict";
        var FeatureDetect = require("../shared/feature-detect"),
        Main = function() {
            return {
                initialize: function() {
                    return FeatureDetect.htmlClass(),
                    this
                }
            }
        } ();
        module.exports = Main.initialize()
    },
    {
        "../shared/feature-detect": 2
    }],
    2 : [function(require, module) {
        "use strict";
        var AC_Element = require("ac-base").Element,
        AC_Browser = require("ac-base").Environment.Browser,
        AC_Feature = require("ac-base").Environment.Feature,
        FeatureDetect = function() {
            var target = document.documentElement,
            tests = {
                touch: AC_Feature.touchAvailable,
                svg: AC_Feature.svgAvailable,
                oldie: "IE" === AC_Browser.name && AC_Browser.version < 9
            };
            return {
                htmlClass: function() {
                    var key;
                    AC_Element.removeClassName(target, "no-js"),
                    AC_Element.addClassName(target, "js");
                    for (key in tests) this._addClass(key)
                },
                _supports: function(feature) {
                    return "undefined" == typeof tests[feature] ? !1 : ("function" == typeof tests[feature] && (tests[feature] = tests[feature]()), tests[feature])
                },
                _addClass: function(feature, failure_prefix) {
                    failure_prefix = failure_prefix || "no-",
                    this._supports(feature) ? AC_Element.addClassName(target, feature) : AC_Element.addClassName(target, failure_prefix + feature)
                }
            }
        } ();
        module.exports = FeatureDetect
    },
    {
        "ac-base": !1
    }]
},
{},
[1]);
try {
    var a = Open
} catch(e) {
    Open = {}
}
Open.Tenten = Open.Tenten || {},
Open.Tenten.Utils = Open.Tenten.Utils || {},
Open.Tenten.Utils.displayUnenrollModalDialog = function() {
    var $uninroll_modal_dialog = $(".unenroll.modal");
    $uninroll_modal_dialog.attr("tabIndex", -1),
    $uninroll_modal_dialog.modal()
};