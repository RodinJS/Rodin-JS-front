! function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: !1
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "./static/js/", __webpack_require__(0)
}([function(module, exports, __webpack_require__) {
    (function(jQuery, __webpack_provided_window_dot_jQuery, $) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            }
        }
        __webpack_require__(2), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7);
        var _header = __webpack_require__(8),
            _header2 = _interopRequireDefault(_header),
            _banner = __webpack_require__(9),
            _banner2 = _interopRequireDefault(_banner),
            _features = __webpack_require__(10),
            _features2 = _interopRequireDefault(_features),
            _vision = __webpack_require__(11),
            _vision2 = _interopRequireDefault(_vision),
            _footer = __webpack_require__(12),
            _footer2 = _interopRequireDefault(_footer);
        window.RODIN = {}, __webpack_provided_window_dot_jQuery = window.$ = jQuery, RODIN = {
            landing: function() {
                this.parallaxInit(), this.verticalSlider(), this.scroll(), this.clicks(), _header2.default.stickyHeader(), _banner2.default.init(), _features2.default.init(), _vision2.default.init()
            },
            template: function() {
                this.tagsInput(), _header2.default.toggleHeaderAuth()
            },
            parallaxInit: function() {
                var scene = document.getElementById("parallax");
                if (scene) {
                    new Parallax(scene)
                }
            },
            verticalSlider: function() {
                var swiper = new Swiper("#projectSlider", {
                    pagination: "#projectSlider .swiper-pagination",
                    direction: "vertical",
                    height: $(window).height(),
                    width: $(window).width(),
                    slidesPerView: 1,
                    paginationClickable: !0,
                    spaceBetween: 100,
                    keyboardControl: !0,
                    speed: 1e3,
                    mousewheelControl: !0,
                   onTransitionEnd:function(swipe){
                        $(".slide-number").html("0"+(swipe.activeIndex+1)),
                        swipe.activeIndex + 1 === swipe.slides.length ? $(".btn-next-slide").addClass("last") : $(".btn-next-slide").removeClass("last")
                        swipe.activeIndex === 0 ?  $(".btn-next-slide").addClass("first") : $(".btn-next-slide").removeClass("first")
                    }
                });
                $(document).on("click", ".btn-next-slide:not(.last)", function(e) {
                    e.preventDefault(), swiper.slideNext()
                }), $(document).on("click", ".btn-next-slide.last", function(e) {
                    e.preventDefault(), swiper.slidePrev()
                }), this.projectSlider = swiper
            },
            tagsInput: function() {
                var input = $("#tagsInput");
                input && input.tagsInput({
                    height: "auto",
                    width: "100%",
                    interactive: !0,
                    defaultText: "Small Description",
                    placeholderColor: "#5B788E"
                })
            },
            clicks: function() {
                _footer2.default.init(), $(document).on("click", ".back-home-btn", function() {
                    var modal = $(".project-modal");
                    modal.removeClass("show animationEnd"), $(window).scrollTop($(window).scrollTop() - 10)
                })
            },
            scroll: function() {
                var win = $(window),
                    txt = $(".footer .prompt-text");
                win.scroll(function() {
                    win.scrollTop() + win.height() > $(document).height() - 74 ? txt.addClass("is-show") : txt.removeClass("is-show"), win.scrollTop() + win.height() > $(document).height() - 1 && ($(".project-modal").addClass("show"), setTimeout(function() {
                        $(".project-modal").addClass("animationEnd")
                    }, 1e3), RODIN.projectSlider.update(!0))
                })
            }
        }
    }).call(exports, __webpack_require__(1), __webpack_require__(1), __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    /*!
     * jQuery JavaScript Library v2.2.4
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2016-05-20T17:23Z
     */
    ! function(global, factory) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
            if (!w.document) throw new Error("jQuery requires a window with a document");
            return factory(w)
        } : factory(global)
    }("undefined" != typeof window ? window : this, function(window, noGlobal) {
        function isArrayLike(obj) {
            var length = !!obj && "length" in obj && obj.length,
                type = jQuery.type(obj);
            return "function" !== type && !jQuery.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj)
        }

        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            });
            if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            });
            if ("string" == typeof qualifier) {
                if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
                qualifier = jQuery.filter(qualifier, elements)
            }
            return jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) > -1 !== not
            })
        }

        function sibling(cur, dir) {
            for (;
                (cur = cur[dir]) && 1 !== cur.nodeType;);
            return cur
        }

        function createOptions(options) {
            var object = {};
            return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
                object[flag] = !0
            }), object
        }

        function completed() {
            document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), jQuery.ready()
        }

        function Data() {
            this.expando = jQuery.expando + Data.uid++
        }

        function dataAttr(elem, key, data) {
            var name;
            if (void 0 === data && 1 === elem.nodeType)
                if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) {
                    try {
                        data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data)
                    } catch (e) {}
                    dataUser.set(elem, key, data)
                } else data = void 0;
            return data
        }

        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1,
                maxIterations = 20,
                currentValue = tween ? function() {
                    return tween.cur()
                } : function() {
                    return jQuery.css(elem, prop, "")
                },
                initial = currentValue(),
                unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
                do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations)
            }
            return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), adjusted
        }

        function getAll(context, tag) {
            var ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
            return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
        }

        function setGlobalEval(elems, refElements) {
            for (var i = 0, l = elems.length; i < l; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"))
        }

        function buildFragment(elems, context, scripts, selection, ignored) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++)
                if (elem = elems[i], elem || 0 === elem)
                    if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++];)
                if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem);
                else if (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)
                for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment
        }

        function returnTrue() {
            return !0
        }

        function returnFalse() {
            return !1
        }

        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (err) {}
        }

        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) on(elem, type, selector, data, types[type], one);
                return elem
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
            else if (!fn) return elem;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments)
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        }

        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
        }

        function disableScript(elem) {
            return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem
        }

        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
        }

        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (1 === dest.nodeType) {
                if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), events = pdataOld.events)) {
                    delete pdataCur.handle, pdataCur.events = {};
                    for (type in events)
                        for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i])
                }
                dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), dataUser.set(dest, udataCur))
            }
        }

        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue)
        }

        function domManip(collection, args, callback, ignored) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0,
                l = collection.length,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
                var self = collection.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored)
            });
            if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first || ignored)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(collection[i], node, i);
                if (hasScripts)
                    for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
            }
            return collection
        }

        function remove(elem, selector, keepData) {
            for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), node.parentNode.removeChild(node));
            return elem
        }

        function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = jQuery.css(elem[0], "display");
            return elem.detach(), display
        }

        function defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
        }

        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, "" !== ret && void 0 !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), computed && !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth), void 0 !== ret ? ret + "" : ret
        }

        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
                }
            }
        }

        function vendorPropName(name) {
            if (name in emptyStyle) return name;
            for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--;)
                if (name = cssPrefixes[i] + capName, name in emptyStyle) return name
        }

        function setPositiveNumber(elem, value, subtract) {
            var matches = rcssNum.exec(value);
            return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value
        }

        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val
        }

        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
                val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
            if (val <= 0 || null == val) {
                if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
        }

        function showHide(elements, show) {
            for (var display, elem, hidden, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], elem.style && (values[index] = dataPriv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), "none" === display && hidden || dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
            for (index = 0; index < length; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
            return elements
        }

        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing)
        }

        function createFxNow() {
            return window.setTimeout(function() {
                fxNow = void 0
            }), fxNow = jQuery.now()
        }

        function genFx(type, includeWidth) {
            var which, i = 0,
                attrs = {
                    height: type
                };
            for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs
        }

        function createTween(value, prop, animation) {
            for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++)
                if (tween = collection[index].call(animation, prop, value)) return tween
        }

        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = dataPriv.get(elem, "fxshow");
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire()
            }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
                })
            })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
            }));
            for (prop in props)
                if (value = props[prop], rfxtypes.exec(value)) {
                    if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                        if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                        hidden = !0
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
                } else display = void 0;
            if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
            else {
                dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                    jQuery(elem).hide()
                }), anim.done(function() {
                    var prop;
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) jQuery.style(elem, prop, orig[prop])
                });
                for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
            }
        }

        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props)
                if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                    value = hooks.expand(value), delete props[name];
                    for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
                } else specialEasing[name] = easing
        }

        function Animation(elem, properties, options) {
            var result, stopped, index = 0,
                length = Animation.prefilters.length,
                deferred = jQuery.Deferred().always(function() {
                    delete tick.elem
                }),
                tick = function() {
                    if (stopped) return !1;
                    for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
                    return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(!0, {
                        specialEasing: {},
                        easing: jQuery.easing._default
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function(prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        return animation.tweens.push(tween), tween
                    },
                    stop: function(gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) return this;
                        for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                        return gotoEnd ? (deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation, gotoEnd])) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                    }
                }),
                props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); index < length; index++)
                if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), result;
            return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
        }

        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || ""
        }

        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func))
                    for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
            }
        }

        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
                }), selected
            }
            var inspected = {},
                seekingTransport = structure === transports;
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }

        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
            return deep && jQuery.extend(!0, target, deep), target
        }

        function ajaxHandleResponses(s, jqXHR, responses) {
            for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
                "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
            if (ct)
                for (type in contents)
                    if (contents[type] && contents[type].test(ct)) {
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
            if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]
        }

        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {},
                dataTypes = s.dataTypes.slice();
            if (dataTypes[1])
                for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
            for (current = dataTypes.shift(); current;)
                if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                    if ("*" === current) current = prev;
                    else if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                    for (conv2 in converters)
                        if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                            conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                            break
                        }
                if (conv !== !0)
                    if (conv && s.throws) response = conv(response);
                    else try {
                        response = conv(response)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: conv ? e : "No conversion from " + prev + " to " + current
                        }
                    }
            }
            return {
                state: "success",
                data: response
            }
        }

        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add)
            });
            else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
            else
                for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }

        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
        }
        var arr = [],
            document = window.document,
            slice = arr.slice,
            concat = arr.concat,
            push = arr.push,
            indexOf = arr.indexOf,
            class2type = {},
            toString = class2type.toString,
            hasOwn = class2type.hasOwnProperty,
            support = {},
            version = "2.2.4",
            jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context)
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(all, letter) {
                return letter.toUpperCase()
            };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function() {
                return slice.call(this)
            },
            get: function(num) {
                return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this)
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                return ret.prevObject = this, ret.context = this.context, ret
            },
            each: function(callback) {
                return jQuery.each(this, callback)
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(i) {
                var len = this.length,
                    j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        }, jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); i < length; i++)
                if (null != (options = arguments[i]))
                    for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target
        }, jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(msg) {
                throw new Error(msg)
            },
            noop: function() {},
            isFunction: function(obj) {
                return "function" === jQuery.type(obj)
            },
            isArray: Array.isArray,
            isWindow: function(obj) {
                return null != obj && obj === obj.window
            },
            isNumeric: function(obj) {
                var realStringObj = obj && obj.toString();
                return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0
            },
            isPlainObject: function(obj) {
                var key;
                if ("object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) return !1;
                for (key in obj);
                return void 0 === key || hasOwn.call(obj, key)
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) return !1;
                return !0
            },
            type: function(obj) {
                return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
            },
            globalEval: function(code) {
                var script, indirect = eval;
                code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
            },
            each: function(obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj))
                    for (length = obj.length; i < length && callback.call(obj[i], i, obj[i]) !== !1; i++);
                else
                    for (i in obj)
                        if (callback.call(obj[i], i, obj[i]) === !1) break;
                return obj
            },
            trim: function(text) {
                return null == text ? "" : (text + "").replace(rtrim, "")
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret
            },
            inArray: function(elem, arr, i) {
                return null == arr ? -1 : indexOf.call(arr, elem, i)
            },
            merge: function(first, second) {
                for (var len = +second.length, j = 0, i = first.length; j < len; j++) first[i++] = second[j];
                return first.length = i, first
            },
            grep: function(elems, callback, invert) {
                for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
                return matches
            },
            map: function(elems, callback, arg) {
                var length, value, i = 0,
                    ret = [];
                if (isArrayLike(elems))
                    for (length = elems.length; i < length; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
                else
                    for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
                return concat.apply([], ret)
            },
            guid: 1,
            proxy: function(fn, context) {
                var tmp, args, proxy;
                if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = slice.call(arguments, 2), proxy = function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)))
                }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy
            },
            now: Date.now,
            support: support
        }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        });
        var Sizzle =
            /*!
             * Sizzle CSS Selector Engine v2.2.1
             * http://sizzlejs.com/
             *
             * Copyright jQuery Foundation and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2015-10-17
             */
            function(window) {
                function Sizzle(selector, context, results, seed) {
                    var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument,
                        nodeType = context ? context.nodeType : 9;
                    if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
                    if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, documentIsHTML)) {
                        if (11 !== nodeType && (match = rquickExpr.exec(selector)))
                            if (m = match[1]) {
                                if (9 === nodeType) {
                                    if (!(elem = context.getElementById(m))) return results;
                                    if (elem.id === m) return results.push(elem), results
                                } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                            } else {
                                if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                                if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
                            }
                        if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (1 !== nodeType) newContext = context, newSelector = selector;
                            else if ("object" !== context.nodeName.toLowerCase()) {
                                for ((nid = context.getAttribute("id")) ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid = expando), groups = tokenize(selector), i = groups.length, nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']"; i--;) groups[i] = nidselect + " " + toSelector(groups[i]);
                                newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                            }
                            if (newSelector) try {
                                return push.apply(results, newContext.querySelectorAll(newSelector)), results
                            } catch (qsaError) {} finally {
                                nid === expando && context.removeAttribute("id")
                            }
                        }
                    }
                    return select(selector.replace(rtrim, "$1"), context, results, seed)
                }

                function createCache() {
                    function cache(key, value) {
                        return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
                    }
                    var keys = [];
                    return cache
                }

                function markFunction(fn) {
                    return fn[expando] = !0, fn
                }

                function assert(fn) {
                    var div = document.createElement("div");
                    try {
                        return !!fn(div)
                    } catch (e) {
                        return !1
                    } finally {
                        div.parentNode && div.parentNode.removeChild(div), div = null
                    }
                }

                function addHandle(attrs, handler) {
                    for (var arr = attrs.split("|"), i = arr.length; i--;) Expr.attrHandle[arr[i]] = handler
                }

                function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                    if (diff) return diff;
                    if (cur)
                        for (; cur = cur.nextSibling;)
                            if (cur === b) return -1;
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
                        return argument = +argument, markFunction(function(seed, matches) {
                            for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                        })
                    })
                }

                function testContext(context) {
                    return context && "undefined" != typeof context.getElementsByTagName && context
                }

                function setFilters() {}

                function toSelector(tokens) {
                    for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
                    return selector
                }

                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && "parentNode" === dir,
                        doneName = done++;
                    return combinator.first ? function(elem, context, xml) {
                        for (; elem = elem[dir];)
                            if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                    } : function(elem, context, xml) {
                        var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                        if (xml) {
                            for (; elem = elem[dir];)
                                if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                        } else
                            for (; elem = elem[dir];)
                                if (1 === elem.nodeType || checkNonElements) {
                                    if (outerCache = elem[expando] || (elem[expando] = {}), uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), (oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                                    if (uniqueCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0
                                }
                    }
                }

                function elementMatcher(matchers) {
                    return matchers.length > 1 ? function(elem, context, xml) {
                        for (var i = matchers.length; i--;)
                            if (!matchers[i](elem, context, xml)) return !1;
                        return !0
                    } : matchers[0]
                }

                function multipleContexts(selector, contexts, results) {
                    for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
                    return results
                }

                function condense(unmatched, map, filter, context, xml) {
                    for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++)(elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), mapped && map.push(i)));
                    return newUnmatched
                }

                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                        var temp, i, elem, preMap = [],
                            postMap = [],
                            preexisting = results.length,
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                            matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                            for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                    postFinder(null, matcherOut = [], temp, xml)
                                }
                                for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                            }
                        } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                    })
                }

                function matcherFromTokens(tokens) {
                    for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                            return elem === checkContext
                        }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                            return indexOf(checkContext, elem) > -1
                        }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                            var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                            return checkContext = null, ret
                        }]; i < len; i++)
                        if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        else {
                            if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                                for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++);
                                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                    value: " " === tokens[i - 2].type ? "*" : ""
                                })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
                            }
                            matchers.push(matcher)
                        }
                    return elementMatcher(matchers)
                }

                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        superMatcher = function(seed, context, xml, results, outermost) {
                            var elem, j, matcher, matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                setMatched = [],
                                contextBackup = outermostContext,
                                elems = seed || byElement && Expr.find.TAG("*", outermost),
                                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                                len = elems.length;
                            for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                                if (byElement && elem) {
                                    for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++];)
                                        if (matcher(elem, context || document, xml)) {
                                            results.push(elem);
                                            break
                                        }
                                    outermost && (dirruns = dirrunsUnique)
                                }
                                bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                            }
                            if (matchedCount += i, bySet && i !== matchedCount) {
                                for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                                if (seed) {
                                    if (matchedCount > 0)
                                        for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                    setMatched = condense(setMatched)
                                }
                                push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                            }
                            return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                        };
                    return bySet ? markFunction(superMatcher) : superMatcher
                }
                var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date,
                    preferredDoc = window.document,
                    dirruns = 0,
                    done = 0,
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),
                    sortOrder = function(a, b) {
                        return a === b && (hasDuplicate = !0), 0
                    },
                    MAX_NEGATIVE = 1 << 31,
                    hasOwn = {}.hasOwnProperty,
                    arr = [],
                    pop = arr.pop,
                    push_native = arr.push,
                    push = arr.push,
                    slice = arr.slice,
                    indexOf = function(list, elem) {
                        for (var i = 0, len = list.length; i < len; i++)
                            if (list[i] === elem) return i;
                        return -1
                    },
                    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    whitespace = "[\\x20\\t\\r\\n\\f]",
                    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                    pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
                    rwhitespace = new RegExp(whitespace + "+", "g"),
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                    rpseudo = new RegExp(pseudos),
                    ridentifier = new RegExp("^" + identifier + "$"),
                    matchExpr = {
                        ID: new RegExp("^#(" + identifier + ")"),
                        CLASS: new RegExp("^\\.(" + identifier + ")"),
                        TAG: new RegExp("^(" + identifier + "|[*])"),
                        ATTR: new RegExp("^" + attributes),
                        PSEUDO: new RegExp("^" + pseudos),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + booleans + ")$", "i"),
                        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                    },
                    rinputs = /^(?:input|select|textarea|button)$/i,
                    rheader = /^h\d$/i,
                    rnative = /^[^{]+\{\s*\[native \w/,
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    rsibling = /[+~]/,
                    rescape = /'|\\/g,
                    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                    funescape = function(_, escaped, escapedWhitespace) {
                        var high = "0x" + escaped - 65536;
                        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                    },
                    unloadHandler = function() {
                        setDocument()
                    };
                try {
                    push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
                } catch (e) {
                    push = {
                        apply: arr.length ? function(target, els) {
                            push_native.apply(target, slice.call(els))
                        } : function(target, els) {
                            for (var j = target.length, i = 0; target[j++] = els[i++];);
                            target.length = j - 1
                        }
                    }
                }
                support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return !!documentElement && "HTML" !== documentElement.nodeName
                }, setDocument = Sizzle.setDocument = function(node) {
                    var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
                    return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = document.documentElement, documentIsHTML = !isXML(document), (parent = document.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), support.attributes = assert(function(div) {
                        return div.className = "i", !div.getAttribute("className")
                    }), support.getElementsByTagName = assert(function(div) {
                        return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length
                    }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), support.getById = assert(function(div) {
                        return docElem.appendChild(div).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length
                    }), support.getById ? (Expr.find.ID = function(id, context) {
                        if ("undefined" != typeof context.getElementById && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m ? [m] : []
                        }
                    }, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId
                        }
                    }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                            return node && node.value === attrId
                        }
                    }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                        return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0
                    } : function(tag, context) {
                        var elem, tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);
                        if ("*" === tag) {
                            for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                            return tmp
                        }
                        return results
                    }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                        if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className)
                    }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(div) {
                        docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]")
                    }), assert(function(div) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                    })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                        support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                    }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                        var adown = 9 === a.nodeType ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                    } : function(a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1
                    }, sortOrder = hasCompare ? function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1)
                    } : function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var cur, i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                        if (aup === bup) return siblingCheck(a, b);
                        for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                        for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                        for (; ap[i] === bp[i];) i++;
                        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                    }, document) : document
                }, Sizzle.matches = function(expr, elements) {
                    return Sizzle(expr, null, null, elements)
                }, Sizzle.matchesSelector = function(elem, expr) {
                    if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                    } catch (e) {}
                    return Sizzle(expr, document, null, [elem]).length > 0
                }, Sizzle.contains = function(context, elem) {
                    return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
                }, Sizzle.attr = function(elem, name) {
                    (elem.ownerDocument || elem) !== document && setDocument(elem);
                    var fn = Expr.attrHandle[name.toLowerCase()],
                        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                    return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
                }, Sizzle.error = function(msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg)
                }, Sizzle.uniqueSort = function(results) {
                    var elem, duplicates = [],
                        j = 0,
                        i = 0;
                    if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                        for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                        for (; j--;) results.splice(duplicates[j], 1)
                    }
                    return sortInput = null, results
                }, getText = Sizzle.getText = function(elem) {
                    var node, ret = "",
                        i = 0,
                        nodeType = elem.nodeType;
                    if (nodeType) {
                        if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                            if ("string" == typeof elem.textContent) return elem.textContent;
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                        } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                    } else
                        for (; node = elem[i++];) ret += getText(node);
                    return ret
                }, Expr = Sizzle.selectors = {
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
                            return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                        },
                        CHILD: function(match) {
                            return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                        },
                        PSEUDO: function(match) {
                            var excess, unquoted = !match[6] && match[2];
                            return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                            return "*" === nodeNameSelector ? function() {
                                return !0
                            } : function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                            }
                        },
                        CLASS: function(className) {
                            var pattern = classCache[className + " "];
                            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(name, operator, check) {
                            return function(elem) {
                                var result = Sizzle.attr(elem, name);
                                return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"))
                            }
                        },
                        CHILD: function(type, what, argument, first, last) {
                            var simple = "nth" !== type.slice(0, 3),
                                forward = "last" !== type.slice(-4),
                                ofType = "of-type" === what;
                            return 1 === first && 0 === last ? function(elem) {
                                return !!elem.parentNode
                            } : function(elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = !1;
                                if (parent) {
                                    if (simple) {
                                        for (; dir;) {
                                            for (node = elem; node = node[dir];)
                                                if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                            start = dir = "only" === type && !start && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                        for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                                            if (1 === node.nodeType && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break
                                            }
                                    } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1)
                                        for (;
                                            (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [dirruns, diff]), node !== elem)););
                                    return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                                }
                            }
                        },
                        PSEUDO: function(pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                            return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
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
                                return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop()
                            }
                        }),
                        has: markFunction(function(selector) {
                            return function(elem) {
                                return Sizzle(selector, elem).length > 0
                            }
                        }),
                        contains: markFunction(function(text) {
                            return text = text.replace(runescape, funescape),
                                function(elem) {
                                    return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                                }
                        }),
                        lang: markFunction(function(lang) {
                            return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                                function(elem) {
                                    var elemLang;
                                    do
                                        if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                                    return !1
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
                            return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                        },
                        empty: function(elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                                if (elem.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(elem) {
                            return !Expr.pseudos.empty(elem)
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
                            return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                        },
                        first: createPositionalPseudo(function() {
                            return [0]
                        }),
                        last: createPositionalPseudo(function(matchIndexes, length) {
                            return [length - 1]
                        }),
                        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                            return [argument < 0 ? argument + length : argument]
                        }),
                        even: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        odd: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = argument < 0 ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = argument < 0 ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                            return matchIndexes
                        })
                    }
                }, Expr.pseudos.nth = Expr.pseudos.eq;
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
                return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                    if (cached) return parseOnly ? 0 : cached.slice(0);
                    for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                        matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        }), soFar = soFar.slice(matched.length));
                        for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        }), soFar = soFar.slice(matched.length));
                        if (!matched) break
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
                }, compile = Sizzle.compile = function(selector, match) {
                    var i, setMatchers = [],
                        elementMatchers = [],
                        cached = compilerCache[selector + " "];
                    if (!cached) {
                        for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector
                    }
                    return cached
                }, select = Sizzle.select = function(selector, context, results, seed) {
                    var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
                        match = !seed && tokenize(selector = compiled.selector || selector);
                    if (results = results || [], 1 === match.length) {
                        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                            if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                            compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length)
                        }
                        for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                            if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                                break
                            }
                    }
                    return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), results
                }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                    return 1 & div1.compareDocumentPosition(document.createElement("div"))
                }), assert(function(div) {
                    return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
                }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                    if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
                }), support.attributes && assert(function(div) {
                    return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
                }) || addHandle("value", function(elem, name, isXML) {
                    if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue
                }), assert(function(div) {
                    return null == div.getAttribute("disabled")
                }) || addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
                }), Sizzle
            }(window);
        jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
        var dir = function(elem, dir, until) {
                for (var matched = [], truncate = void 0 !== until;
                    (elem = elem[dir]) && 9 !== elem.nodeType;)
                    if (1 === elem.nodeType) {
                        if (truncate && jQuery(elem).is(until)) break;
                        matched.push(elem)
                    }
                return matched
            },
            siblings = function(n, elem) {
                for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
                return matched
            },
            rneedsContext = jQuery.expr.match.needsContext,
            rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            risSimple = /^.[^:#\[\.,]*$/;
        jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType
            }))
        }, jQuery.fn.extend({
            find: function(selector) {
                var i, len = this.length,
                    ret = [],
                    self = this;
                if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++)
                        if (jQuery.contains(self[i], this)) return !0
                }));
                for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
                return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1))
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0))
            },
            is: function(selector) {
                return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
            }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            init = jQuery.fn.init = function(selector, context, root) {
                var match, elem;
                if (!selector) return this;
                if (root = root || rootjQuery, "string" == typeof selector) {
                    if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
                    if (match[1]) {
                        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                            for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                        return this
                    }
                    return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this
                }
                return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
            };
        init.prototype = jQuery.fn, rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.fn.extend({
            has: function(target) {
                var targets = jQuery(target, this),
                    l = targets.length;
                return this.filter(function() {
                    for (var i = 0; i < l; i++)
                        if (jQuery.contains(this, targets[i])) return !0
                })
            },
            closest: function(selectors, context) {
                for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++)
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                        if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur);
                            break
                        }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
            }
        }), jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null
            },
            parents: function(elem) {
                return dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return siblings((elem.parentNode || {}).firstChild, elem)
            },
            children: function(elem) {
                return siblings(elem.firstChild)
            },
            contents: function(elem) {
                return elem.contentDocument || jQuery.merge([], elem.childNodes)
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched)
            }
        });
        var rnotwhite = /\S+/g;
        jQuery.Callbacks = function(options) {
            options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
            var firing, memory, fired, locked, list = [],
                queue = [],
                firingIndex = -1,
                fire = function() {
                    for (locked = options.once, fired = firing = !0; queue.length; firingIndex = -1)
                        for (memory = queue.shift(); ++firingIndex < list.length;) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, memory = !1);
                    options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "")
                },
                self = {
                    add: function() {
                        return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), function add(args) {
                            jQuery.each(args, function(_, arg) {
                                jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg)
                            })
                        }(arguments), memory && !firing && fire()), this
                    },
                    remove: function() {
                        return jQuery.each(arguments, function(_, arg) {
                            for (var index;
                                (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), index <= firingIndex && firingIndex--
                        }), this
                    },
                    has: function(fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0
                    },
                    empty: function() {
                        return list && (list = []), this
                    },
                    disable: function() {
                        return locked = queue = [], list = memory = "", this
                    },
                    disabled: function() {
                        return !list
                    },
                    lock: function() {
                        return locked = queue = [], memory || (list = memory = ""), this
                    },
                    locked: function() {
                        return !!locked
                    },
                    fireWith: function(context, args) {
                        return locked || (args = args || [], args = [context, args.slice ? args.slice() : args], queue.push(args), firing || fire()), this
                    },
                    fire: function() {
                        return self.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!fired
                    }
                };
            return self
        }, jQuery.extend({
            Deferred: function(func) {
                var tuples = [
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    state = "pending",
                    promise = {
                        state: function() {
                            return state
                        },
                        always: function() {
                            return deferred.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var fns = arguments;
                            return jQuery.Deferred(function(newDefer) {
                                jQuery.each(tuples, function(i, tuple) {
                                    var fn = jQuery.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function() {
                                        var returned = fn && fn.apply(this, arguments);
                                        returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                    })
                                }), fns = null
                            }).promise()
                        },
                        promise: function(obj) {
                            return null != obj ? jQuery.extend(obj, promise) : promise
                        }
                    },
                    deferred = {};
                return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add, stateString && list.add(function() {
                        state = stateString
                    }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                    }, deferred[tuple[0] + "With"] = list.fireWith
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
            },
            when: function(subordinate) {
                var progressValues, progressContexts, resolveContexts, i = 0,
                    resolveValues = slice.call(arguments),
                    length = resolveValues.length,
                    remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                    deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                    updateFunc = function(i, contexts, values) {
                        return function(value) {
                            contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                        }
                    };
                if (length > 1)
                    for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); i < length; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject) : --remaining;
                return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
            }
        });
        var readyList;
        jQuery.fn.ready = function(fn) {
            return jQuery.ready.promise().done(fn), this
        }, jQuery.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(hold) {
                hold ? jQuery.readyWait++ : jQuery.ready(!0)
            },
            ready: function(wait) {
                (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))))
            }
        }), jQuery.ready.promise = function(obj) {
            return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), window.addEventListener("load", completed))), readyList.promise(obj)
        }, jQuery.ready.promise();
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
                var i = 0,
                    len = elems.length,
                    bulk = null == key;
                if ("object" === jQuery.type(key)) {
                    chainable = !0;
                    for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw)
                } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value)
                    })), fn))
                    for (; i < len; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
            },
            acceptData = function(owner) {
                return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
            };
        Data.uid = 1, Data.prototype = {
            register: function(owner, initial) {
                var value = initial || {};
                return owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, {
                    value: value,
                    writable: !0,
                    configurable: !0
                }), owner[this.expando]
            },
            cache: function(owner) {
                if (!acceptData(owner)) return {};
                var value = owner[this.expando];
                return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, {
                    value: value,
                    configurable: !0
                }))), value
            },
            set: function(owner, data, value) {
                var prop, cache = this.cache(owner);
                if ("string" == typeof data) cache[data] = value;
                else
                    for (prop in data) cache[prop] = data[prop];
                return cache
            },
            get: function(owner, key) {
                return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][key]
            },
            access: function(owner, key, value) {
                var stored;
                return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key)
            },
            remove: function(owner, key) {
                var i, name, camel, cache = owner[this.expando];
                if (void 0 !== cache) {
                    if (void 0 === key) this.register(owner);
                    else {
                        jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length;
                        for (; i--;) delete cache[name[i]]
                    }(void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando])
                }
            },
            hasData: function(owner) {
                var cache = owner[this.expando];
                return void 0 !== cache && !jQuery.isEmptyObject(cache)
            }
        };
        var dataPriv = new Data,
            dataUser = new Data,
            rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /[A-Z]/g;
        jQuery.extend({
            hasData: function(elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem)
            },
            data: function(elem, name, data) {
                return dataUser.access(elem, name, data)
            },
            removeData: function(elem, name) {
                dataUser.remove(elem, name)
            },
            _data: function(elem, name, data) {
                return dataPriv.access(elem, name, data)
            },
            _removeData: function(elem, name) {
                dataPriv.remove(elem, name)
            }
        }), jQuery.fn.extend({
            data: function(key, value) {
                var i, name, data, elem = this[0],
                    attrs = elem && elem.attributes;
                if (void 0 === key) {
                    if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                        for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                        dataPriv.set(elem, "hasDataAttrs", !0)
                    }
                    return data
                }
                return "object" == typeof key ? this.each(function() {
                    dataUser.set(this, key)
                }) : access(this, function(value) {
                    var data, camelKey;
                    if (elem && void 0 === value) {
                        if (data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase()), void 0 !== data) return data;
                        if (camelKey = jQuery.camelCase(key), data = dataUser.get(elem, camelKey), void 0 !== data) return data;
                        if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data
                    } else camelKey = jQuery.camelCase(key), this.each(function() {
                        var data = dataUser.get(this, camelKey);
                        dataUser.set(this, camelKey, value), key.indexOf("-") > -1 && void 0 !== data && dataUser.set(this, key, value)
                    })
                }, null, value, arguments.length > 1, null, !0)
            },
            removeData: function(key) {
                return this.each(function() {
                    dataUser.remove(this, key)
                })
            }
        }), jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                if (elem) return type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []
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
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        dataPriv.remove(elem, [type + "queue", key])
                    })
                })
            }
        }), jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
                })
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type)
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
                    resolve = function() {
                        --count || defer.resolveWith(elements, [elements])
                    };
                for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = dataPriv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj)
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            isHidden = function(elem, el) {
                return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
            },
            rcheckableType = /^(?:checkbox|radio)$/i,
            rtagName = /<([\w:-]+)/,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
        var rhtml = /<|&#?\w+;/;
        ! function() {
            var fragment = document.createDocumentFragment(),
                div = fragment.appendChild(document.createElement("div")),
                input = document.createElement("input");
            input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue
        }();
        var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                if (elemData)
                    for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                            return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0
                        }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0)
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (elemData && (events = elemData.events)) {
                    for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
                        if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                            for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                            origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                        } else
                            for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                    jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events")
                }
            },
            dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i, j, ret, matched, handleObj, handlerQueue = [],
                    args = slice.call(arguments),
                    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                    for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                        (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                        for (event.currentTarget = matched.elem, j = 0;
                            (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                    return special.postDispatch && special.postDispatch.call(this, event), event.result
                }
            },
            handlers: function(event, handlers) {
                var i, matches, sel, handleObj, handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && ("click" !== event.type || isNaN(event.button) || event.button < 1))
                    for (; cur !== this; cur = cur.parentNode || this)
                        if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                            for (matches = [], i = 0; i < delegateCount; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                            matches.length && handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            })
                        }
                return delegateCount < handlers.length && handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                }), handlerQueue
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                    return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(event, original) {
                    var eventDoc, doc, body, button = original.button;
                    return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
                }
            },
            fix: function(event) {
                if (event[jQuery.expando]) return event;
                var i, prop, copy, type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];
                for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(event) {
                        return jQuery.nodeName(event.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                    }
                }
            }
        }, jQuery.removeEvent = function(elem, type, handle) {
            elem.removeEventListener && elem.removeEventListener(type, handle)
        }, jQuery.Event = function(src, props) {
            return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
        }, jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret, target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
                }
            }
        }), jQuery.fn.extend({
            on: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn)
            },
            one: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1)
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                if ("object" == typeof types) {
                    for (type in types) this.off(type, selector, types[type]);
                    return this
                }
                return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() {
                    jQuery.event.remove(this, types, fn, selector)
                })
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            rnoInnerhtml = /<script|<style|<link/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        jQuery.extend({
            htmlPrefilter: function(html) {
                return html.replace(rxhtmlTag, "<$1></$2>")
            },
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
                    inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                    for (destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
                if (dataAndEvents)
                    if (deepDataAndEvents)
                        for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]);
                    else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone
            },
            cleanData: function(elems) {
                for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++)
                    if (acceptData(elem)) {
                        if (data = elem[dataPriv.expando]) {
                            if (data.events)
                                for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                            elem[dataPriv.expando] = void 0
                        }
                        elem[dataUser.expando] && (elem[dataUser.expando] = void 0)
                    }
            }
        }), jQuery.fn.extend({
            domManip: domManip,
            detach: function(selector) {
                return remove(this, selector, !0)
            },
            remove: function(selector) {
                return remove(this, selector)
            },
            text: function(value) {
                return access(this, function(value) {
                    return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value)
                    })
                }, null, value, arguments.length)
            },
            append: function() {
                return domManip(this, arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem)
                    }
                })
            },
            prepend: function() {
                return domManip(this, arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild)
                    }
                })
            },
            before: function() {
                return domManip(this, arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this)
                })
            },
            after: function() {
                return domManip(this, arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
                })
            },
            empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = "");
                return this
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                    if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (; i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                            elem = 0
                        } catch (e) {}
                    }
                    elem && this.empty().append(value)
                }, null, value, arguments.length)
            },
            replaceWith: function() {
                var ignored = [];
                return domManip(this, arguments, function(elem) {
                    var parent = this.parentNode;
                    jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this))
                }, ignored)
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
                return this.pushStack(ret)
            }
        });
        var iframe, elemdisplay = {
                HTML: "block",
                BODY: "block"
            },
            rmargin = /^margin/,
            rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
            getStyles = function(elem) {
                var view = elem.ownerDocument.defaultView;
                return view && view.opener || (view = window), view.getComputedStyle(elem)
            },
            swap = function(elem, options, callback, args) {
                var ret, name, old = {};
                for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
                ret = callback.apply(elem, args || []);
                for (name in options) elem.style[name] = old[name];
                return ret
            },
            documentElement = document.documentElement;
        ! function() {
            function computeStyleTests() {
                div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", div.innerHTML = "", documentElement.appendChild(container);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = "2px" === divStyle.marginLeft, boxSizingReliableVal = "4px" === divStyle.width, div.style.marginRight = "50%", pixelMarginRightVal = "4px" === divStyle.marginRight, documentElement.removeChild(container)
            }
            var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"),
                div = document.createElement("div");
            div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", container.appendChild(div), jQuery.extend(support, {
                pixelPosition: function() {
                    return computeStyleTests(), pixelPositionVal
                },
                boxSizingReliable: function() {
                    return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal
                },
                pixelMarginRight: function() {
                    return null == boxSizingReliableVal && computeStyleTests(), pixelMarginRightVal
                },
                reliableMarginLeft: function() {
                    return null == boxSizingReliableVal && computeStyleTests(), reliableMarginLeftVal
                },
                reliableMarginRight: function() {
                    var ret, marginDiv = div.appendChild(document.createElement("div"));
                    return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", documentElement.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight), documentElement.removeChild(container), div.removeChild(marginDiv), ret
                }
            }))
        }();
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            cssPrefixes = ["Webkit", "O", "Moz", "ms"],
            emptyStyle = document.createElement("div").style;
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
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
                float: "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = jQuery.camelCase(name),
                        style = elem.style;
                    return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"),
                        hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), void 0)
                }
            },
            css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name);
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val
            }
        }), jQuery.each(["height", "width"], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) return rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra)
                },
                set: function(elem, value, extra) {
                    var matches, styles = extra && getStyles(elem),
                        subtract = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles);
                    return subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[name] = value, value = jQuery.css(elem, name)), setPositiveNumber(elem, value, subtract)
                }
            }
        }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
            if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                marginLeft: 0
            }, function() {
                return elem.getBoundingClientRect().left
            })) + "px"
        }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
            if (computed) return swap(elem, {
                display: "inline-block"
            }, curCSS, [elem, "marginRight"])
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded
                }
            }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
        }), jQuery.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles, len, map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                        return map
                    }
                    return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
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
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0)
                },
                set: function(tween) {
                    jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
            }
        }, jQuery.easing = {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2
            },
            _default: "swing"
        }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rrun = /queueHooks$/;
        jQuery.Animation = jQuery.extend(Animation, {
                tweeners: {
                    "*": [function(prop, value) {
                        var tween = this.createTween(prop, value);
                        return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween
                    }]
                },
                tweener: function(props, callback) {
                    jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.match(rnotwhite);
                    for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback)
                },
                prefilters: [defaultPrefilter],
                prefilter: function(callback, prepend) {
                    prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback)
                }
            }), jQuery.speed = function(speed, easing, fn) {
                var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                    complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                    duration: speed,
                    easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
                };
                return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                    jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
                }, opt
            }, jQuery.fn.extend({
                fadeTo: function(speed, to, easing, callback) {
                    return this.filter(isHidden).css("opacity", 0).show().end().animate({
                        opacity: to
                    }, speed, easing, callback)
                },
                animate: function(prop, speed, easing, callback) {
                    var empty = jQuery.isEmptyObject(prop),
                        optall = jQuery.speed(speed, easing, callback),
                        doAnimation = function() {
                            var anim = Animation(this, jQuery.extend({}, prop), optall);
                            (empty || dataPriv.get(this, "finish")) && anim.stop(!0)
                        };
                    return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
                },
                stop: function(type, clearQueue, gotoEnd) {
                    var stopQueue = function(hooks) {
                        var stop = hooks.stop;
                        delete hooks.stop, stop(gotoEnd)
                    };
                    return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                        var dequeue = !0,
                            index = null != type && type + "queueHooks",
                            timers = jQuery.timers,
                            data = dataPriv.get(this);
                        if (index) data[index] && data[index].stop && stopQueue(data[index]);
                        else
                            for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                        for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                        !dequeue && gotoEnd || jQuery.dequeue(this, type)
                    })
                },
                finish: function(type) {
                    return type !== !1 && (type = type || "fx"), this.each(function() {
                        var index, data = dataPriv.get(this),
                            queue = data[type + "queue"],
                            hooks = data[type + "queueHooks"],
                            timers = jQuery.timers,
                            length = queue ? queue.length : 0;
                        for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                        for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                        delete data.finish
                    })
                }
            }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
                var cssFn = jQuery.fn[name];
                jQuery.fn[name] = function(speed, easing, callback) {
                    return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
                }
            }), jQuery.each({
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
            }, function(name, props) {
                jQuery.fn[name] = function(speed, easing, callback) {
                    return this.animate(props, speed, easing, callback)
                }
            }), jQuery.timers = [], jQuery.fx.tick = function() {
                var timer, i = 0,
                    timers = jQuery.timers;
                for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
                timers.length || jQuery.fx.stop(), fxNow = void 0
            }, jQuery.fx.timer = function(timer) {
                jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop()
            }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
                timerId || (timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval))
            }, jQuery.fx.stop = function() {
                window.clearInterval(timerId), timerId = null
            }, jQuery.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, jQuery.fn.delay = function(time, type) {
                return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                    var timeout = window.setTimeout(next, time);
                    hooks.stop = function() {
                        window.clearTimeout(timeout)
                    }
                })
            },
            function() {
                var input = document.createElement("input"),
                    select = document.createElement("select"),
                    opt = select.appendChild(document.createElement("option"));
                input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value
            }();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1)
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name)
                })
            }
        }), jQuery.extend({
            attr: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret))
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value
                        }
                    }
                }
            },
            removeAttr: function(elem, value) {
                var name, propName, i = 0,
                    attrNames = value && value.match(rnotwhite);
                if (attrNames && 1 === elem.nodeType)
                    for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name)
            }
        }), boolHook = {
            set: function(elem, value, name) {
                return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function(elem, name, isXML) {
                var ret, handle;
                return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret
            }
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i,
            rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1)
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[jQuery.propFix[name] || name]
                })
            }
        }), jQuery.extend({
            prop: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), support.optSelected || (jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.parentNode && parent.parentNode.selectedIndex, null
            },
            set: function(elem) {
                var parent = elem.parentNode;
                parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex)
            }
        }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            jQuery.propFix[this.toLowerCase()] = this
        });
        var rclass = /[\t\r\n\f]/g;
        jQuery.fn.extend({
            addClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)))
                });
                if ("string" == typeof value && value)
                    for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                        if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                            for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                            finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue)
                        }
                return this
            },
            removeClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof value && value)
                    for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                        if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                            for (j = 0; clazz = classes[j++];)
                                for (; cur.indexOf(" " + clazz + " ") > -1;) cur = cur.replace(" " + clazz + " ", " ");
                            finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue)
                        }
                return this
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal)
                }) : this.each(function() {
                    var className, i, self, classNames;
                    if ("string" === type)
                        for (i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                    else void 0 !== value && "boolean" !== type || (className = getClass(this), className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : dataPriv.get(this, "__className__") || ""))
                })
            },
            hasClass: function(selector) {
                var className, elem, i = 0;
                for (className = " " + selector + " "; elem = this[i++];)
                    if (1 === elem.nodeType && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) return !0;
                return !1
            }
        });
        var rreturn = /\r/g,
            rspaces = /[\x20\t\r\n\f]+/g;
        jQuery.fn.extend({
            val: function(value) {
                var hooks, ret, isFunction, elem = this[0]; {
                    if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + ""
                        })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                    });
                    if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return null != val ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ")
                    }
                },
                select: {
                    get: function(elem) {
                        for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++)
                            if (option = options[i], (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                if (value = jQuery(option).val(), one) return value;
                                values.push(value)
                            }
                        return values
                    },
                    set: function(elem, value) {
                        for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                        return optionSet || (elem.selectedIndex = -1), values
                    }
                }
            }
        }), jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1
                }
            }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
            })
        });
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        jQuery.extend(jQuery.event, {
            trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
                    type = hasOwn.call(event, "type") ? event.type : event,
                    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                        tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                    }
                    for (i = 0;
                        (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
                    return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result
                }
            },
            simulate: function(type, elem, event) {
                var e = jQuery.extend(new jQuery.Event, event, {
                    type: type,
                    isSimulated: !0
                });
                jQuery.event.trigger(e, null, elem)
            }
        }), jQuery.fn.extend({
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this)
                })
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                if (elem) return jQuery.event.trigger(type, data, elem, !0)
            }
        }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            }
        }), jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
            }
        }), support.focusin = "onfocusin" in window, support.focusin || jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event))
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix);
                    attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1)
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix) - 1;
                    attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), dataPriv.remove(doc, fix))
                }
            }
        });
        var location = window.location,
            nonce = jQuery.now(),
            rquery = /\?/;
        jQuery.parseJSON = function(data) {
            return JSON.parse(data + "")
        }, jQuery.parseXML = function(data) {
            var xml;
            if (!data || "string" != typeof data) return null;
            try {
                xml = (new window.DOMParser).parseFromString(data, "text/xml")
            } catch (e) {
                xml = void 0
            }
            return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml
        };
        var rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*"),
            originAnchor = document.createElement("a");
        originAnchor.href = location.href, jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
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
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
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
                    2 !== state && (state = 2, timeoutTimer && window.clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && status < 300 || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }
                "object" == typeof url && (options = url, url = void 0), options = options || {};
                var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
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
                                if (!responseHeaders)
                                    for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                                match = responseHeaders[key.toLowerCase()]
                            }
                            return null == match ? null : match
                        },
                        getAllResponseHeaders: function() {
                            return 2 === state ? responseHeadersString : null
                        },
                        setRequestHeader: function(name, value) {
                            var lname = name.toLowerCase();
                            return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                        },
                        overrideMimeType: function(type) {
                            return state || (s.mimeType = type), this
                        },
                        statusCode: function(map) {
                            var code;
                            if (map)
                                if (state < 2)
                                    for (code in map) statusCode[code] = [statusCode[code], map[code]];
                                else jqXHR.always(map[jqXHR.status]);
                            return this
                        },
                        abort: function(statusText) {
                            var finalText = statusText || strAbort;
                            return transport && transport.abort(finalText), done(0, finalText), this
                        }
                    };
                if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain) {
                    urlAnchor = document.createElement("a");
                    try {
                        urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host
                    } catch (e) {
                        s.crossDomain = !0
                    }
                }
                if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
                strAbort = "abort";
                for (i in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) jqXHR[i](s[i]);
                if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                    if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), 2 === state) return jqXHR;
                    s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout));
                    try {
                        state = 1, transport.send(requestHeaders, done)
                    } catch (e) {
                        if (!(state < 2)) throw e;
                        done(-1, e)
                    }
                } else done(-1, "No Transport");
                return jqXHR
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            },
            getScript: function(url, callback) {
                return jQuery.get(url, void 0, callback, "script")
            }
        }), jQuery.each(["get", "post"], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url))
            }
        }), jQuery._evalUrl = function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }, jQuery.fn.extend({
            wrapAll: function(html) {
                var wrap;
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstElementChild;) elem = elem.firstElementChild;
                    return elem
                }).append(this)), this)
            },
            wrapInner: function(html) {
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                }) : this.each(function() {
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
        }), jQuery.expr.filters.hidden = function(elem) {
            return !jQuery.expr.filters.visible(elem)
        }, jQuery.expr.filters.visible = function(elem) {
            return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0
        };
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function(a, traditional) {
            var prefix, s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value)
            });
            else
                for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
            return s.join("&").replace(r20, "+")
        }, jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
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
        }), jQuery.ajaxSettings.xhr = function() {
            try {
                return new window.XMLHttpRequest
            } catch (e) {}
        };
        var xhrSuccessStatus = {
                0: 200,
                1223: 204
            },
            xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(options) {
            var callback, errorCallback;
            if (support.cors || xhrSupported && !options.crossDomain) return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr();
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
                        for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    callback = function(type) {
                        return function() {
                            callback && (callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null, "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                                binary: xhr.response
                            } : {
                                text: xhr.responseText
                            }, xhr.getAllResponseHeaders()))
                        }
                    }, xhr.onload = callback(), errorCallback = xhr.onerror = callback("error"), void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function() {
                        4 === xhr.readyState && window.setTimeout(function() {
                            callback && errorCallback()
                        })
                    }, callback = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null)
                    } catch (e) {
                        if (callback) throw e
                    }
                },
                abort: function() {
                    callback && callback()
                }
            }
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(text) {
                    return jQuery.globalEval(text), text
                }
            }
        }), jQuery.ajaxPrefilter("script", function(s) {
            void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET")
        }), jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function(_, complete) {
                        script = jQuery("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type)
                        }), document.head.appendChild(script[0])
                    },
                    abort: function() {
                        callback && callback()
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                return this[callback] = !0, callback
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments
            }, jqXHR.always(function() {
                void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0
            }), "script"
        }), jQuery.parseHTML = function(data, context, keepScripts) {
            if (!data || "string" != typeof data) return null;
            "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            return parsed ? [context.createElement(parsed[1])] : (parsed = buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
        };
        var _load = jQuery.fn.load;
        jQuery.fn.load = function(url, params, callback) {
            if ("string" != typeof url && _load) return _load.apply(this, arguments);
            var selector, type, response, self = this,
                off = url.indexOf(" ");
            return off > -1 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
                url: url,
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
            }).always(callback && function(jqXHR, status) {
                self.each(function() {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR])
                })
            }), this
        }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
            }
        }), jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        }, jQuery.offset = {
            setOffset: function(elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                    curElem = jQuery(elem),
                    props = {};
                "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }
        }, jQuery.fn.extend({
            offset: function(options) {
                if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                });
                var docElem, win, elem = this[0],
                    box = {
                        top: 0,
                        left: 0
                    },
                    doc = elem && elem.ownerDocument;
                if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (box = elem.getBoundingClientRect(), win = getWindow(doc), {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                }) : box
            },
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, elem = this[0],
                        parentOffset = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                    return offsetParent || documentElement
                })
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    return void 0 === val ? win ? win[prop] : elem[method] : void(win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val)
                }, method, val, arguments.length)
            }
        }), jQuery.each(["top", "left"], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
            })
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                        extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                    }, type, chainable ? margin : void 0, chainable, null)
                }
            })
        }), jQuery.fn.extend({
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
            },
            size: function() {
                return this.length
            }
        }), jQuery.fn.andSelf = jQuery.fn.addBack, __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return jQuery
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        var _jQuery = window.jQuery,
            _$ = window.$;
        return jQuery.noConflict = function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery
    })
}, function(module, exports, __webpack_require__) {
    __webpack_require__(3), __webpack_require__(4)
}, function(module, exports, __webpack_require__) {
    (function(jQuery) {
        "use strict";
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }; + function($) {
            function getTargetFromTrigger($trigger) {
                var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
                return $(target)
            }

            function Plugin(option) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data("bs.collapse"),
                        options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == ("undefined" == typeof option ? "undefined" : _typeof(option)) && option);
                    !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
                })
            }
            var Collapse = function Collapse(element, options) {
                this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
            };
            Collapse.VERSION = "3.3.7", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
                toggle: !0
            }, Collapse.prototype.dimension = function() {
                var hasWidth = this.$element.hasClass("width");
                return hasWidth ? "width" : "height"
            }, Collapse.prototype.show = function() {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                        var startEvent = $.Event("show.bs.collapse");
                        if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                            actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                            var dimension = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                            var complete = function() {
                                this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                            };
                            if (!$.support.transition) return complete.call(this);
                            var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                            this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
                        }
                    }
                }
            }, Collapse.prototype.hide = function() {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var startEvent = $.Event("hide.bs.collapse");
                    if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                        var dimension = this.dimension();
                        this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                        var complete = function() {
                            this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                        };
                        return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this)
                    }
                }
            }, Collapse.prototype.toggle = function() {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }, Collapse.prototype.getParent = function() {
                return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
                    var $element = $(element);
                    this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
                }, this)).end()
            }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
                var isOpen = $element.hasClass("in");
                $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen)
            };
            var old = $.fn.collapse;
            $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
                return $.fn.collapse = old, this
            }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
                var $this = $(this);
                $this.attr("data-target") || e.preventDefault();
                var $target = getTargetFromTrigger($this),
                    data = $target.data("bs.collapse"),
                    option = data ? "toggle" : $this.data();
                Plugin.call($target, option)
            })
        }(jQuery)
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function(jQuery) {
        "use strict"; + function($) {
            function getParent($this) {
                var selector = $this.attr("data-target");
                selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
                var $parent = selector && $(selector);
                return $parent && $parent.length ? $parent : $this.parent()
            }

            function clearMenus(e) {
                e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
                    var $this = $(this),
                        $parent = getParent($this),
                        relatedTarget = {
                            relatedTarget: this
                        };
                    $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget)))))
                }))
            }

            function Plugin(option) {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data("bs.dropdown");
                    data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
                })
            }
            var backdrop = ".dropdown-backdrop",
                toggle = '[data-toggle="dropdown"]',
                Dropdown = function(element) {
                    $(element).on("click.bs.dropdown", this.toggle)
                };
            Dropdown.VERSION = "3.3.7", Dropdown.prototype.toggle = function(e) {
                var $this = $(this);
                if (!$this.is(".disabled, :disabled")) {
                    var $parent = getParent($this),
                        isActive = $parent.hasClass("open");
                    if (clearMenus(), !isActive) {
                        "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                        var relatedTarget = {
                            relatedTarget: this
                        };
                        if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                        $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget))
                    }
                    return !1
                }
            }, Dropdown.prototype.keydown = function(e) {
                if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
                    var $this = $(this);
                    if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                        var $parent = getParent($this),
                            isActive = $parent.hasClass("open");
                        if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), $this.trigger("click");
                        var desc = " li:not(.disabled):visible a",
                            $items = $parent.find(".dropdown-menu" + desc);
                        if ($items.length) {
                            var index = $items.index(e.target);
                            38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).trigger("focus")
                        }
                    }
                }
            };
            var old = $.fn.dropdown;
            $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
                return $.fn.dropdown = old, this
            }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
                e.stopPropagation()
            }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown)
        }(jQuery)
    }).call(exports, __webpack_require__(1))
}, function(module, exports) {
    ! function(window, document, undefined) {
        "use strict";

        function Parallax(element, options) {
            this.element = element, this.layers = element.getElementsByClassName("layer");
            var data = {
                calibrateX: this.data(this.element, "calibrate-x"),
                calibrateY: this.data(this.element, "calibrate-y"),
                invertX: this.data(this.element, "invert-x"),
                invertY: this.data(this.element, "invert-y"),
                limitX: this.data(this.element, "limit-x"),
                limitY: this.data(this.element, "limit-y"),
                scalarX: this.data(this.element, "scalar-x"),
                scalarY: this.data(this.element, "scalar-y"),
                frictionX: this.data(this.element, "friction-x"),
                frictionY: this.data(this.element, "friction-y"),
                originX: this.data(this.element, "origin-x"),
                originY: this.data(this.element, "origin-y"),
                pointerEvents: this.data(this.element, "pointer-events"),
                precision: this.data(this.element, "precision")
            };
            for (var key in data) null === data[key] && delete data[key];
            this.extend(this, DEFAULTS, options, data), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depthsX = [], this.depthsY = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
        }
        var NAME = "Parallax",
            MAGIC_NUMBER = 30,
            DEFAULTS = {
                relativeInput: !1,
                clipRelativeInput: !1,
                calibrationThreshold: 100,
                calibrationDelay: 500,
                supportDelay: 500,
                calibrateX: !1,
                calibrateY: !0,
                invertX: !0,
                invertY: !0,
                limitX: !1,
                limitY: !1,
                scalarX: 10,
                scalarY: 10,
                frictionX: .1,
                frictionY: .1,
                originX: .5,
                originY: .5,
                pointerEvents: !0,
                precision: 1
            };
        Parallax.prototype.extend = function() {
            if (arguments.length > 1)
                for (var master = arguments[0], i = 1, l = arguments.length; i < l; i++) {
                    var object = arguments[i];
                    for (var key in object) master[key] = object[key]
                }
        }, Parallax.prototype.data = function(element, name) {
            return this.deserialize(element.getAttribute("data-" + name))
        }, Parallax.prototype.deserialize = function(value) {
            return "true" === value || "false" !== value && ("null" === value ? null : !isNaN(parseFloat(value)) && isFinite(value) ? parseFloat(value) : value)
        }, Parallax.prototype.camelCase = function(value) {
            return value.replace(/-+(.)?/g, function(match, character) {
                return character ? character.toUpperCase() : ""
            })
        }, Parallax.prototype.transformSupport = function(value) {
            for (var element = document.createElement("div"), propertySupport = !1, propertyValue = null, featureSupport = !1, cssProperty = null, jsProperty = null, i = 0, l = this.vendors.length; i < l; i++)
                if (null !== this.vendors[i] ? (cssProperty = this.vendors[i][0] + "transform", jsProperty = this.vendors[i][1] + "Transform") : (cssProperty = "transform", jsProperty = "transform"), element.style[jsProperty] !== undefined) {
                    propertySupport = !0;
                    break
                }
            switch (value) {
                case "2D":
                    featureSupport = propertySupport;
                    break;
                case "3D":
                    if (propertySupport) {
                        var body = document.body || document.createElement("body"),
                            documentElement = document.documentElement,
                            documentOverflow = documentElement.style.overflow,
                            isCreatedBody = !1;
                        document.body || (isCreatedBody = !0, documentElement.style.overflow = "hidden", documentElement.appendChild(body), body.style.overflow = "hidden", body.style.background = ""), body.appendChild(element), element.style[jsProperty] = "translate3d(1px,1px,1px)", propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty), featureSupport = propertyValue !== undefined && propertyValue.length > 0 && "none" !== propertyValue, documentElement.style.overflow = documentOverflow, body.removeChild(element), isCreatedBody && (body.removeAttribute("style"), body.parentNode.removeChild(body))
                    }
            }
            return featureSupport
        }, Parallax.prototype.ww = null, Parallax.prototype.wh = null, Parallax.prototype.wcx = null, Parallax.prototype.wcy = null, Parallax.prototype.wrx = null, Parallax.prototype.wry = null, Parallax.prototype.portrait = null, Parallax.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), Parallax.prototype.vendors = [null, ["-webkit-", "webkit"],
            ["-moz-", "Moz"],
            ["-o-", "O"],
            ["-ms-", "ms"]
        ], Parallax.prototype.motionSupport = !!window.DeviceMotionEvent, Parallax.prototype.orientationSupport = !!window.DeviceOrientationEvent, Parallax.prototype.orientationStatus = 0, Parallax.prototype.motionStatus = 0, Parallax.prototype.propertyCache = {}, Parallax.prototype.initialise = function() {
            Parallax.prototype.transform2DSupport === undefined && (Parallax.prototype.transform2DSupport = Parallax.prototype.transformSupport("2D"), Parallax.prototype.transform3DSupport = Parallax.prototype.transformSupport("3D")), this.transform3DSupport && this.accelerate(this.element);
            var style = window.getComputedStyle(this.element);
            "static" === style.getPropertyValue("position") && (this.element.style.position = "relative"), this.pointerEvents || (this.element.style.pointerEvents = "none"), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
        }, Parallax.prototype.updateLayers = function() {
            this.layers = this.element.getElementsByClassName("layer"), this.depthsX = [], this.depthsY = [];
            for (var i = 0, l = this.layers.length; i < l; i++) {
                var layer = this.layers[i];
                this.transform3DSupport && this.accelerate(layer), layer.style.position = i ? "absolute" : "relative", layer.style.display = "block", layer.style.left = 0, layer.style.top = 0;
                var depth = this.data(layer, "depth") || 0;
                this.depthsX.push(this.data(layer, "depth-x") || depth), this.depthsY.push(this.data(layer, "depth-y") || depth)
            }
        }, Parallax.prototype.updateDimensions = function() {
            this.ww = window.innerWidth, this.wh = window.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
        }, Parallax.prototype.updateBounds = function() {
            this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
        }, Parallax.prototype.queueCalibration = function(delay) {
            clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay)
        }, Parallax.prototype.enable = function() {
            this.enabled || (this.enabled = !0, !this.desktop && this.orientationSupport ? (this.portrait = null, window.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : !this.desktop && this.motionSupport ? (this.portrait = null, window.addEventListener("devicemotion", this.onDeviceMotion), setTimeout(this.onMotionTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, window.addEventListener("mousemove", this.onMouseMove)), window.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
        }, Parallax.prototype.disable = function() {
            this.enabled && (this.enabled = !1, this.orientationSupport ? window.removeEventListener("deviceorientation", this.onDeviceOrientation) : this.motionSupport ? window.removeEventListener("devicemotion", this.onDeviceMotion) : window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
        }, Parallax.prototype.calibrate = function(x, y) {
            this.calibrateX = x === undefined ? this.calibrateX : x, this.calibrateY = y === undefined ? this.calibrateY : y
        }, Parallax.prototype.invert = function(x, y) {
            this.invertX = x === undefined ? this.invertX : x, this.invertY = y === undefined ? this.invertY : y
        }, Parallax.prototype.friction = function(x, y) {
            this.frictionX = x === undefined ? this.frictionX : x, this.frictionY = y === undefined ? this.frictionY : y
        }, Parallax.prototype.scalar = function(x, y) {
            this.scalarX = x === undefined ? this.scalarX : x, this.scalarY = y === undefined ? this.scalarY : y
        }, Parallax.prototype.limit = function(x, y) {
            this.limitX = x === undefined ? this.limitX : x, this.limitY = y === undefined ? this.limitY : y
        }, Parallax.prototype.origin = function(x, y) {
            this.originX = x === undefined ? this.originX : x, this.originY = y === undefined ? this.originY : y
        }, Parallax.prototype.clamp = function(value, min, max) {
            return value = Math.max(value, min), value = Math.min(value, max)
        }, Parallax.prototype.css = function(element, property, value) {
            var jsProperty = this.propertyCache[property];
            if (!jsProperty)
                for (var i = 0, l = this.vendors.length; i < l; i++)
                    if (jsProperty = null !== this.vendors[i] ? this.camelCase(this.vendors[i][1] + "-" + property) : property, element.style[jsProperty] !== undefined) {
                        this.propertyCache[property] = jsProperty;
                        break
                    }
            element.style[jsProperty] = value
        }, Parallax.prototype.accelerate = function(element) {
            this.css(element, "transform", "translate3d(0,0,0)"), this.css(element, "transform-style", "preserve-3d"), this.css(element, "backface-visibility", "hidden")
        }, Parallax.prototype.setPosition = function(element, x, y) {
            x = x.toFixed(this.precision) + "px", y = y.toFixed(this.precision) + "px", this.transform3DSupport ? this.css(element, "transform", "translate3d(" + x + "," + y + ",0)") : this.transform2DSupport ? this.css(element, "transform", "translate(" + x + "," + y + ")") : (element.style.left = x, element.style.top = y)
        }, Parallax.prototype.onOrientationTimer = function() {
            this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
        }, Parallax.prototype.onMotionTimer = function() {
            this.motionSupport && 0 === this.motionStatus && (this.disable(), this.motionSupport = !1, this.enable())
        }, Parallax.prototype.onCalibrationTimer = function() {
            this.calibrationFlag = !0
        }, Parallax.prototype.onWindowResize = function() {
            this.updateDimensions()
        }, Parallax.prototype.onAnimationFrame = function() {
            this.updateBounds();
            var dx = this.ix - this.cx,
                dy = this.iy - this.cy;
            (Math.abs(dx) > this.calibrationThreshold || Math.abs(dy) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? dy : this.iy, this.my = this.calibrateY ? dx : this.ix) : (this.mx = this.calibrateX ? dx : this.ix, this.my = this.calibrateY ? dy : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
            for (var i = 0, l = this.layers.length; i < l; i++) {
                var layer = this.layers[i],
                    depthX = this.depthsX[i],
                    depthY = this.depthsY[i],
                    xOffset = this.vx * (depthX * (this.invertX ? -1 : 1)),
                    yOffset = this.vy * (depthY * (this.invertY ? -1 : 1));
                this.setPosition(layer, xOffset, yOffset)
            }
            this.raf = requestAnimationFrame(this.onAnimationFrame)
        }, Parallax.prototype.rotate = function(beta, gamma) {
            var x = (event.beta || 0) / MAGIC_NUMBER,
                y = (event.gamma || 0) / MAGIC_NUMBER,
                portrait = this.wh > this.ww;
            this.portrait !== portrait && (this.portrait = portrait, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = x, this.cy = y), this.ix = x, this.iy = y
        }, Parallax.prototype.onDeviceOrientation = function(event) {
            var beta = event.beta,
                gamma = event.gamma;
            this.desktop || null === beta || null === gamma || (this.orientationStatus = 1, this.rotate(beta, gamma))
        }, Parallax.prototype.onDeviceMotion = function(event) {
            var beta = event.rotationRate.beta,
                gamma = event.rotationRate.gamma;
            this.desktop || null === beta || null === gamma || (this.motionStatus = 1, this.rotate(beta, gamma))
        }, Parallax.prototype.onMouseMove = function(event) {
            var clientX = event.clientX,
                clientY = event.clientY;
            !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (clientX = Math.max(clientX, this.ex), clientX = Math.min(clientX, this.ex + this.ew), clientY = Math.max(clientY, this.ey), clientY = Math.min(clientY, this.ey + this.eh)), this.ix = (clientX - this.ex - this.ecx) / this.erx, this.iy = (clientY - this.ey - this.ecy) / this.ery) : (this.ix = (clientX - this.wcx) / this.wrx, this.iy = (clientY - this.wcy) / this.wry)
        }, window[NAME] = Parallax
    }(window, document)
}, function(module, exports, __webpack_require__) {
    (function(jQuery, __webpack_provided_window_dot_jQuery) {
        ! function() {
            "use strict";

            function addLibraryPlugin(lib) {
                lib.fn.swiper = function(params) {
                    var firstInstance;
                    return lib(this).each(function() {
                        var s = new Swiper(this, params);
                        firstInstance || (firstInstance = s)
                    }), firstInstance
                }
            }
            var $, Swiper = function(container, params) {
                function round(a) {
                    return Math.floor(a)
                }

                function autoplay() {
                    var autoplayDelay = s.params.autoplay,
                        activeSlide = s.slides.eq(s.activeIndex);
                    activeSlide.attr("data-swiper-autoplay") && (autoplayDelay = activeSlide.attr("data-swiper-autoplay") || s.params.autoplay), s.autoplayTimeoutId = setTimeout(function() {
                        s.params.loop ? (s.fixLoop(), s._slideNext(), s.emit("onAutoplay", s)) : s.isEnd ? params.autoplayStopOnLast ? s.stopAutoplay() : (s._slideTo(0), s.emit("onAutoplay", s)) : (s._slideNext(), s.emit("onAutoplay", s))
                    }, autoplayDelay)
                }

                function findElementInEvent(e, selector) {
                    var el = $(e.target);
                    if (!el.is(selector))
                        if ("string" == typeof selector) el = el.parents(selector);
                        else if (selector.nodeType) {
                        var found;
                        return el.parents().each(function(index, _el) {
                            _el === selector && (found = selector)
                        }), found ? selector : void 0
                    }
                    if (0 !== el.length) return el[0]
                }

                function initObserver(target, options) {
                    options = options || {};
                    var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver,
                        observer = new ObserverFunc(function(mutations) {
                            mutations.forEach(function(mutation) {
                                s.onResize(!0), s.emit("onObserverUpdate", s, mutation)
                            })
                        });
                    observer.observe(target, {
                        attributes: "undefined" == typeof options.attributes || options.attributes,
                        childList: "undefined" == typeof options.childList || options.childList,
                        characterData: "undefined" == typeof options.characterData || options.characterData
                    }), s.observers.push(observer)
                }

                function handleKeyboard(e) {
                    e.originalEvent && (e = e.originalEvent);
                    var kc = e.keyCode || e.charCode;
                    if (!s.params.allowSwipeToNext && (s.isHorizontal() && 39 === kc || !s.isHorizontal() && 40 === kc)) return !1;
                    if (!s.params.allowSwipeToPrev && (s.isHorizontal() && 37 === kc || !s.isHorizontal() && 38 === kc)) return !1;
                    if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                        if (37 === kc || 39 === kc || 38 === kc || 40 === kc) {
                            var inView = !1;
                            if (s.container.parents("." + s.params.slideClass).length > 0 && 0 === s.container.parents("." + s.params.slideActiveClass).length) return;
                            var windowScroll = {
                                    left: window.pageXOffset,
                                    top: window.pageYOffset
                                },
                                windowWidth = window.innerWidth,
                                windowHeight = window.innerHeight,
                                swiperOffset = s.container.offset();
                            s.rtl && (swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft);
                            for (var swiperCoord = [
                                    [swiperOffset.left, swiperOffset.top],
                                    [swiperOffset.left + s.width, swiperOffset.top],
                                    [swiperOffset.left, swiperOffset.top + s.height],
                                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                                ], i = 0; i < swiperCoord.length; i++) {
                                var point = swiperCoord[i];
                                point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight && (inView = !0)
                            }
                            if (!inView) return
                        }
                        s.isHorizontal() ? (37 !== kc && 39 !== kc || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === kc && !s.rtl || 37 === kc && s.rtl) && s.slideNext(), (37 === kc && !s.rtl || 39 === kc && s.rtl) && s.slidePrev()) : (38 !== kc && 40 !== kc || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === kc && s.slideNext(), 38 === kc && s.slidePrev())
                    }
                }

                function isEventSupported() {
                    var eventName = "onwheel",
                        isSupported = eventName in document;
                    if (!isSupported) {
                        var element = document.createElement("div");
                        element.setAttribute(eventName, "return;"), isSupported = "function" == typeof element[eventName]
                    }
                    return !isSupported && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (isSupported = document.implementation.hasFeature("Events.wheel", "3.0")), isSupported
                }

                function handleMousewheel(e) {
                    e.originalEvent && (e = e.originalEvent);
                    var delta = 0,
                        rtlFactor = s.rtl ? -1 : 1,
                        data = normalizeWheel(e);
                    if (s.params.mousewheelForceToAxis)
                        if (s.isHorizontal()) {
                            if (!(Math.abs(data.pixelX) > Math.abs(data.pixelY))) return;
                            delta = data.pixelX * rtlFactor
                        } else {
                            if (!(Math.abs(data.pixelY) > Math.abs(data.pixelX))) return;
                            delta = data.pixelY
                        }
                    else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
                    if (0 !== delta) {
                        if (s.params.mousewheelInvert && (delta = -delta), s.params.freeMode) {
                            var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity,
                                wasBeginning = s.isBeginning,
                                wasEnd = s.isEnd;
                            if (position >= s.minTranslate() && (position = s.minTranslate()), position <= s.maxTranslate() && (position = s.maxTranslate()), s.setWrapperTransition(0), s.setWrapperTranslate(position),
                                s.updateProgress(), s.updateActiveIndex(), (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) && s.updateClasses(), s.params.freeModeSticky ? (clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = setTimeout(function() {
                                    s.slideReset()
                                }, 300)) : s.params.lazyLoading && s.lazy && s.lazy.load(), s.emit("onScroll", s, e), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.stopAutoplay(), 0 === position || position === s.maxTranslate()) return
                        } else {
                            if ((new window.Date).getTime() - s.mousewheel.lastScrollTime > 60)
                                if (delta < 0)
                                    if (s.isEnd && !s.params.loop || s.animating) {
                                        if (s.params.mousewheelReleaseOnEdges) return !0
                                    } else s.slideNext(), s.emit("onScroll", s, e);
                            else if (s.isBeginning && !s.params.loop || s.animating) {
                                if (s.params.mousewheelReleaseOnEdges) return !0
                            } else s.slidePrev(), s.emit("onScroll", s, e);
                            s.mousewheel.lastScrollTime = (new window.Date).getTime()
                        }
                        return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
                    }
                }

                function normalizeWheel(event) {
                    var PIXEL_STEP = 10,
                        LINE_HEIGHT = 40,
                        PAGE_HEIGHT = 800,
                        sX = 0,
                        sY = 0,
                        pX = 0,
                        pY = 0;
                    return "detail" in event && (sY = event.detail), "wheelDelta" in event && (sY = -event.wheelDelta / 120), "wheelDeltaY" in event && (sY = -event.wheelDeltaY / 120), "wheelDeltaX" in event && (sX = -event.wheelDeltaX / 120), "axis" in event && event.axis === event.HORIZONTAL_AXIS && (sX = sY, sY = 0), pX = sX * PIXEL_STEP, pY = sY * PIXEL_STEP, "deltaY" in event && (pY = event.deltaY), "deltaX" in event && (pX = event.deltaX), (pX || pY) && event.deltaMode && (1 === event.deltaMode ? (pX *= LINE_HEIGHT, pY *= LINE_HEIGHT) : (pX *= PAGE_HEIGHT, pY *= PAGE_HEIGHT)), pX && !sX && (sX = pX < 1 ? -1 : 1), pY && !sY && (sY = pY < 1 ? -1 : 1), {
                        spinX: sX,
                        spinY: sY,
                        pixelX: pX,
                        pixelY: pY
                    }
                }

                function setParallaxTransform(el, progress) {
                    el = $(el);
                    var p, pX, pY, rtlFactor = s.rtl ? -1 : 1;
                    p = el.attr("data-swiper-parallax") || "0", pX = el.attr("data-swiper-parallax-x"), pY = el.attr("data-swiper-parallax-y"), pX || pY ? (pX = pX || "0", pY = pY || "0") : s.isHorizontal() ? (pX = p, pY = "0") : (pY = p, pX = "0"), pX = pX.indexOf("%") >= 0 ? parseInt(pX, 10) * progress * rtlFactor + "%" : pX * progress * rtlFactor + "px", pY = pY.indexOf("%") >= 0 ? parseInt(pY, 10) * progress + "%" : pY * progress + "px", el.transform("translate3d(" + pX + ", " + pY + ",0px)")
                }

                function normalizeEventName(eventName) {
                    return 0 !== eventName.indexOf("on") && (eventName = eventName[0] !== eventName[0].toUpperCase() ? "on" + eventName[0].toUpperCase() + eventName.substring(1) : "on" + eventName), eventName
                }
                if (!(this instanceof Swiper)) return new Swiper(container, params);
                var defaults = {
                        direction: "horizontal",
                        touchEventsTarget: "container",
                        initialSlide: 0,
                        speed: 300,
                        autoplay: !1,
                        autoplayDisableOnInteraction: !0,
                        autoplayStopOnLast: !1,
                        iOSEdgeSwipeDetection: !1,
                        iOSEdgeSwipeThreshold: 20,
                        freeMode: !1,
                        freeModeMomentum: !0,
                        freeModeMomentumRatio: 1,
                        freeModeMomentumBounce: !0,
                        freeModeMomentumBounceRatio: 1,
                        freeModeMomentumVelocityRatio: 1,
                        freeModeSticky: !1,
                        freeModeMinimumVelocity: .02,
                        autoHeight: !1,
                        setWrapperSize: !1,
                        virtualTranslate: !1,
                        effect: "slide",
                        coverflow: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: !0
                        },
                        flip: {
                            slideShadows: !0,
                            limitRotation: !0
                        },
                        cube: {
                            slideShadows: !0,
                            shadow: !0,
                            shadowOffset: 20,
                            shadowScale: .94
                        },
                        fade: {
                            crossFade: !1
                        },
                        parallax: !1,
                        zoom: !1,
                        zoomMax: 3,
                        zoomMin: 1,
                        zoomToggle: !0,
                        scrollbar: null,
                        scrollbarHide: !0,
                        scrollbarDraggable: !1,
                        scrollbarSnapOnRelease: !1,
                        keyboardControl: !1,
                        mousewheelControl: !1,
                        mousewheelReleaseOnEdges: !1,
                        mousewheelInvert: !1,
                        mousewheelForceToAxis: !1,
                        mousewheelSensitivity: 1,
                        mousewheelEventsTarged: "container",
                        hashnav: !1,
                        hashnavWatchState: !1,
                        history: !1,
                        replaceState: !1,
                        breakpoints: void 0,
                        spaceBetween: 0,
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerColumnFill: "column",
                        slidesPerGroup: 1,
                        centeredSlides: !1,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                        roundLengths: !1,
                        touchRatio: 1,
                        touchAngle: 45,
                        simulateTouch: !0,
                        shortSwipes: !0,
                        longSwipes: !0,
                        longSwipesRatio: .5,
                        longSwipesMs: 300,
                        followFinger: !0,
                        onlyExternal: !1,
                        threshold: 0,
                        touchMoveStopPropagation: !0,
                        touchReleaseOnEdges: !1,
                        uniqueNavElements: !0,
                        pagination: null,
                        paginationElement: "span",
                        paginationClickable: !1,
                        paginationHide: !1,
                        paginationBulletRender: null,
                        paginationProgressRender: null,
                        paginationFractionRender: null,
                        paginationCustomRender: null,
                        paginationType: "bullets",
                        resistance: !0,
                        resistanceRatio: .85,
                        nextButton: null,
                        prevButton: null,
                        watchSlidesProgress: !1,
                        watchSlidesVisibility: !1,
                        grabCursor: !1,
                        preventClicks: !0,
                        preventClicksPropagation: !0,
                        slideToClickedSlide: !1,
                        lazyLoading: !1,
                        lazyLoadingInPrevNext: !1,
                        lazyLoadingInPrevNextAmount: 1,
                        lazyLoadingOnTransitionStart: !1,
                        preloadImages: !0,
                        updateOnImagesReady: !0,
                        loop: !1,
                        loopAdditionalSlides: 0,
                        loopedSlides: null,
                        control: void 0,
                        controlInverse: !1,
                        controlBy: "slide",
                        normalizeSlideIndex: !0,
                        allowSwipeToPrev: !0,
                        allowSwipeToNext: !0,
                        swipeHandler: null,
                        noSwiping: !0,
                        noSwipingClass: "swiper-no-swiping",
                        passiveListeners: !0,
                        containerModifierClass: "swiper-container-",
                        slideClass: "swiper-slide",
                        slideActiveClass: "swiper-slide-active",
                        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                        slideVisibleClass: "swiper-slide-visible",
                        slideDuplicateClass: "swiper-slide-duplicate",
                        slideNextClass: "swiper-slide-next",
                        slideDuplicateNextClass: "swiper-slide-duplicate-next",
                        slidePrevClass: "swiper-slide-prev",
                        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                        wrapperClass: "swiper-wrapper",
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        buttonDisabledClass: "swiper-button-disabled",
                        paginationCurrentClass: "swiper-pagination-current",
                        paginationTotalClass: "swiper-pagination-total",
                        paginationHiddenClass: "swiper-pagination-hidden",
                        paginationProgressbarClass: "swiper-pagination-progressbar",
                        paginationClickableClass: "swiper-pagination-clickable",
                        paginationModifierClass: "swiper-pagination-",
                        lazyLoadingClass: "swiper-lazy",
                        lazyStatusLoadingClass: "swiper-lazy-loading",
                        lazyStatusLoadedClass: "swiper-lazy-loaded",
                        lazyPreloaderClass: "swiper-lazy-preloader",
                        notificationClass: "swiper-notification",
                        preloaderClass: "preloader",
                        zoomContainerClass: "swiper-zoom-container",
                        observer: !1,
                        observeParents: !1,
                        a11y: !1,
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                        runCallbacksOnInit: !0
                    },
                    initialVirtualTranslate = params && params.virtualTranslate;
                params = params || {};
                var originalParams = {};
                for (var param in params)
                    if ("object" != typeof params[param] || null === params[param] || (params[param].nodeType || params[param] === window || params[param] === document || "undefined" != typeof Dom7 && params[param] instanceof Dom7 || "undefined" != typeof jQuery && params[param] instanceof jQuery)) originalParams[param] = params[param];
                    else {
                        originalParams[param] = {};
                        for (var deepParam in params[param]) originalParams[param][deepParam] = params[param][deepParam]
                    }
                for (var def in defaults)
                    if ("undefined" == typeof params[def]) params[def] = defaults[def];
                    else if ("object" == typeof params[def])
                    for (var deepDef in defaults[def]) "undefined" == typeof params[def][deepDef] && (params[def][deepDef] = defaults[def][deepDef]);
                var s = this;
                if (s.params = params, s.originalParams = originalParams, s.classNames = [], "undefined" != typeof $ && "undefined" != typeof Dom7 && ($ = Dom7), ("undefined" != typeof $ || ($ = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || __webpack_provided_window_dot_jQuery : Dom7)) && (s.$ = $, s.currentBreakpoint = void 0, s.getActiveBreakpoint = function() {
                        if (!s.params.breakpoints) return !1;
                        var point, breakpoint = !1,
                            points = [];
                        for (point in s.params.breakpoints) s.params.breakpoints.hasOwnProperty(point) && points.push(point);
                        points.sort(function(a, b) {
                            return parseInt(a, 10) > parseInt(b, 10)
                        });
                        for (var i = 0; i < points.length; i++) point = points[i], point >= window.innerWidth && !breakpoint && (breakpoint = point);
                        return breakpoint || "max"
                    }, s.setBreakpoint = function() {
                        var breakpoint = s.getActiveBreakpoint();
                        if (breakpoint && s.currentBreakpoint !== breakpoint) {
                            var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams,
                                needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
                            for (var param in breakPointsParams) s.params[param] = breakPointsParams[param];
                            s.currentBreakpoint = breakpoint, needsReLoop && s.destroyLoop && s.reLoop(!0)
                        }
                    }, s.params.breakpoints && s.setBreakpoint(), s.container = $(container), 0 !== s.container.length)) {
                    if (s.container.length > 1) {
                        var swipers = [];
                        return s.container.each(function() {
                            swipers.push(new Swiper(this, params))
                        }), swipers
                    }
                    s.container[0].swiper = s, s.container.data("swiper", s), s.classNames.push(s.params.containerModifierClass + s.params.direction), s.params.freeMode && s.classNames.push(s.params.containerModifierClass + "free-mode"), s.support.flexbox || (s.classNames.push(s.params.containerModifierClass + "no-flexbox"), s.params.slidesPerColumn = 1), s.params.autoHeight && s.classNames.push(s.params.containerModifierClass + "autoheight"), (s.params.parallax || s.params.watchSlidesVisibility) && (s.params.watchSlidesProgress = !0), s.params.touchReleaseOnEdges && (s.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(s.params.effect) >= 0 && (s.support.transforms3d ? (s.params.watchSlidesProgress = !0, s.classNames.push(s.params.containerModifierClass + "3d")) : s.params.effect = "slide"), "slide" !== s.params.effect && s.classNames.push(s.params.containerModifierClass + s.params.effect), "cube" === s.params.effect && (s.params.resistanceRatio = 0, s.params.slidesPerView = 1, s.params.slidesPerColumn = 1, s.params.slidesPerGroup = 1, s.params.centeredSlides = !1, s.params.spaceBetween = 0, s.params.virtualTranslate = !0, s.params.setWrapperSize = !1), "fade" !== s.params.effect && "flip" !== s.params.effect || (s.params.slidesPerView = 1, s.params.slidesPerColumn = 1, s.params.slidesPerGroup = 1, s.params.watchSlidesProgress = !0, s.params.spaceBetween = 0, s.params.setWrapperSize = !1, "undefined" == typeof initialVirtualTranslate && (s.params.virtualTranslate = !0)), s.params.grabCursor && s.support.touch && (s.params.grabCursor = !1), s.wrapper = s.container.children("." + s.params.wrapperClass), s.params.pagination && (s.paginationContainer = $(s.params.pagination), s.params.uniqueNavElements && "string" == typeof s.params.pagination && s.paginationContainer.length > 1 && 1 === s.container.find(s.params.pagination).length && (s.paginationContainer = s.container.find(s.params.pagination)), "bullets" === s.params.paginationType && s.params.paginationClickable ? s.paginationContainer.addClass(s.params.paginationModifierClass + "clickable") : s.params.paginationClickable = !1, s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType)), (s.params.nextButton || s.params.prevButton) && (s.params.nextButton && (s.nextButton = $(s.params.nextButton), s.params.uniqueNavElements && "string" == typeof s.params.nextButton && s.nextButton.length > 1 && 1 === s.container.find(s.params.nextButton).length && (s.nextButton = s.container.find(s.params.nextButton))), s.params.prevButton && (s.prevButton = $(s.params.prevButton), s.params.uniqueNavElements && "string" == typeof s.params.prevButton && s.prevButton.length > 1 && 1 === s.container.find(s.params.prevButton).length && (s.prevButton = s.container.find(s.params.prevButton)))), s.isHorizontal = function() {
                        return "horizontal" === s.params.direction
                    }, s.rtl = s.isHorizontal() && ("rtl" === s.container[0].dir.toLowerCase() || "rtl" === s.container.css("direction")), s.rtl && s.classNames.push(s.params.containerModifierClass + "rtl"), s.rtl && (s.wrongRTL = "-webkit-box" === s.wrapper.css("display")), s.params.slidesPerColumn > 1 && s.classNames.push(s.params.containerModifierClass + "multirow"), s.device.android && s.classNames.push(s.params.containerModifierClass + "android"), s.container.addClass(s.classNames.join(" ")), s.translate = 0, s.progress = 0, s.velocity = 0, s.lockSwipeToNext = function() {
                        s.params.allowSwipeToNext = !1, s.params.allowSwipeToPrev === !1 && s.params.grabCursor && s.unsetGrabCursor()
                    }, s.lockSwipeToPrev = function() {
                        s.params.allowSwipeToPrev = !1, s.params.allowSwipeToNext === !1 && s.params.grabCursor && s.unsetGrabCursor()
                    }, s.lockSwipes = function() {
                        s.params.allowSwipeToNext = s.params.allowSwipeToPrev = !1, s.params.grabCursor && s.unsetGrabCursor()
                    }, s.unlockSwipeToNext = function() {
                        s.params.allowSwipeToNext = !0, s.params.allowSwipeToPrev === !0 && s.params.grabCursor && s.setGrabCursor()
                    }, s.unlockSwipeToPrev = function() {
                        s.params.allowSwipeToPrev = !0, s.params.allowSwipeToNext === !0 && s.params.grabCursor && s.setGrabCursor()
                    }, s.unlockSwipes = function() {
                        s.params.allowSwipeToNext = s.params.allowSwipeToPrev = !0, s.params.grabCursor && s.setGrabCursor()
                    }, s.setGrabCursor = function(moving) {
                        s.container[0].style.cursor = "move", s.container[0].style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab", s.container[0].style.cursor = moving ? "-moz-grabbin" : "-moz-grab", s.container[0].style.cursor = moving ? "grabbing" : "grab"
                    }, s.unsetGrabCursor = function() {
                        s.container[0].style.cursor = ""
                    }, s.params.grabCursor && s.setGrabCursor(), s.imagesToLoad = [], s.imagesLoaded = 0, s.loadImage = function(imgElement, src, srcset, sizes, checkForComplete, callback) {
                        function onReady() {
                            callback && callback()
                        }
                        var image;
                        imgElement.complete && checkForComplete ? onReady() : src ? (image = new window.Image, image.onload = onReady, image.onerror = onReady, sizes && (image.sizes = sizes), srcset && (image.srcset = srcset), src && (image.src = src)) : onReady()
                    }, s.preloadImages = function() {
                        function _onReady() {
                            "undefined" != typeof s && null !== s && s && (void 0 !== s.imagesLoaded && s.imagesLoaded++, s.imagesLoaded === s.imagesToLoad.length && (s.params.updateOnImagesReady && s.update(), s.emit("onImagesReady", s)))
                        }
                        s.imagesToLoad = s.container.find("img");
                        for (var i = 0; i < s.imagesToLoad.length; i++) s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute("src"), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute("srcset"), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute("sizes"), !0, _onReady)
                    }, s.autoplayTimeoutId = void 0, s.autoplaying = !1, s.autoplayPaused = !1, s.startAutoplay = function() {
                        return "undefined" == typeof s.autoplayTimeoutId && (!!s.params.autoplay && (!s.autoplaying && (s.autoplaying = !0, s.emit("onAutoplayStart", s), void autoplay())))
                    }, s.stopAutoplay = function(internal) {
                        s.autoplayTimeoutId && (s.autoplayTimeoutId && clearTimeout(s.autoplayTimeoutId), s.autoplaying = !1, s.autoplayTimeoutId = void 0, s.emit("onAutoplayStop", s))
                    }, s.pauseAutoplay = function(speed) {
                        s.autoplayPaused || (s.autoplayTimeoutId && clearTimeout(s.autoplayTimeoutId), s.autoplayPaused = !0, 0 === speed ? (s.autoplayPaused = !1, autoplay()) : s.wrapper.transitionEnd(function() {
                            s && (s.autoplayPaused = !1, s.autoplaying ? autoplay() : s.stopAutoplay())
                        }))
                    }, s.minTranslate = function() {
                        return -s.snapGrid[0]
                    }, s.maxTranslate = function() {
                        return -s.snapGrid[s.snapGrid.length - 1]
                    }, s.updateAutoHeight = function() {
                        var i, activeSlides = [],
                            newHeight = 0;
                        if ("auto" !== s.params.slidesPerView && s.params.slidesPerView > 1)
                            for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                                var index = s.activeIndex + i;
                                if (index > s.slides.length) break;
                                activeSlides.push(s.slides.eq(index)[0])
                            } else activeSlides.push(s.slides.eq(s.activeIndex)[0]);
                        for (i = 0; i < activeSlides.length; i++)
                            if ("undefined" != typeof activeSlides[i]) {
                                var height = activeSlides[i].offsetHeight;
                                newHeight = height > newHeight ? height : newHeight
                            }
                        newHeight && s.wrapper.css("height", newHeight + "px")
                    }, s.updateContainerSize = function() {
                        var width, height;
                        width = "undefined" != typeof s.params.width ? s.params.width : s.container[0].clientWidth, height = "undefined" != typeof s.params.height ? s.params.height : s.container[0].clientHeight, 0 === width && s.isHorizontal() || 0 === height && !s.isHorizontal() || (width = width - parseInt(s.container.css("padding-left"), 10) - parseInt(s.container.css("padding-right"), 10), height = height - parseInt(s.container.css("padding-top"), 10) - parseInt(s.container.css("padding-bottom"), 10), s.width = width, s.height = height, s.size = s.isHorizontal() ? s.width : s.height)
                    }, s.updateSlidesSize = function() {
                        s.slides = s.wrapper.children("." + s.params.slideClass), s.snapGrid = [], s.slidesGrid = [], s.slidesSizesGrid = [];
                        var i, spaceBetween = s.params.spaceBetween,
                            slidePosition = -s.params.slidesOffsetBefore,
                            prevSlideSize = 0,
                            index = 0;
                        if ("undefined" != typeof s.size) {
                            "string" == typeof spaceBetween && spaceBetween.indexOf("%") >= 0 && (spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * s.size), s.virtualSize = -spaceBetween, s.rtl ? s.slides.css({
                                marginLeft: "",
                                marginTop: ""
                            }) : s.slides.css({
                                marginRight: "",
                                marginBottom: ""
                            });
                            var slidesNumberEvenToRows;
                            s.params.slidesPerColumn > 1 && (slidesNumberEvenToRows = Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn ? s.slides.length : Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn, "auto" !== s.params.slidesPerView && "row" === s.params.slidesPerColumnFill && (slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn)));
                            var slideSize, slidesPerColumn = s.params.slidesPerColumn,
                                slidesPerRow = slidesNumberEvenToRows / slidesPerColumn,
                                numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
                            for (i = 0; i < s.slides.length; i++) {
                                slideSize = 0;
                                var slide = s.slides.eq(i);
                                if (s.params.slidesPerColumn > 1) {
                                    var newSlideOrderIndex, column, row;
                                    "column" === s.params.slidesPerColumnFill ? (column = Math.floor(i / slidesPerColumn), row = i - column * slidesPerColumn, (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) && ++row >= slidesPerColumn && (row = 0, column++), newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn, slide.css({
                                        "-webkit-box-ordinal-group": newSlideOrderIndex,
                                        "-moz-box-ordinal-group": newSlideOrderIndex,
                                        "-ms-flex-order": newSlideOrderIndex,
                                        "-webkit-order": newSlideOrderIndex,
                                        order: newSlideOrderIndex
                                    })) : (row = Math.floor(i / slidesPerRow), column = i - row * slidesPerRow), slide.css("margin-" + (s.isHorizontal() ? "top" : "left"), 0 !== row && s.params.spaceBetween && s.params.spaceBetween + "px").attr("data-swiper-column", column).attr("data-swiper-row", row)
                                }
                                "none" !== slide.css("display") && ("auto" === s.params.slidesPerView ? (slideSize = s.isHorizontal() ? slide.outerWidth(!0) : slide.outerHeight(!0), s.params.roundLengths && (slideSize = round(slideSize))) : (slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView, s.params.roundLengths && (slideSize = round(slideSize)), s.isHorizontal() ? s.slides[i].style.width = slideSize + "px" : s.slides[i].style.height = slideSize + "px"), s.slides[i].swiperSlideSize = slideSize, s.slidesSizesGrid.push(slideSize), s.params.centeredSlides ? (slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween, 0 === i && (slidePosition = slidePosition - s.size / 2 - spaceBetween), Math.abs(slidePosition) < .001 && (slidePosition = 0), index % s.params.slidesPerGroup === 0 && s.snapGrid.push(slidePosition), s.slidesGrid.push(slidePosition)) : (index % s.params.slidesPerGroup === 0 && s.snapGrid.push(slidePosition), s.slidesGrid.push(slidePosition), slidePosition = slidePosition + slideSize + spaceBetween), s.virtualSize += slideSize + spaceBetween, prevSlideSize = slideSize, index++)
                            }
                            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
                            var newSlidesGrid;
                            if (s.rtl && s.wrongRTL && ("slide" === s.params.effect || "coverflow" === s.params.effect) && s.wrapper.css({
                                    width: s.virtualSize + s.params.spaceBetween + "px"
                                }), s.support.flexbox && !s.params.setWrapperSize || (s.isHorizontal() ? s.wrapper.css({
                                    width: s.virtualSize + s.params.spaceBetween + "px"
                                }) : s.wrapper.css({
                                    height: s.virtualSize + s.params.spaceBetween + "px"
                                })), s.params.slidesPerColumn > 1 && (s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows, s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween, s.isHorizontal() ? s.wrapper.css({
                                    width: s.virtualSize + s.params.spaceBetween + "px"
                                }) : s.wrapper.css({
                                    height: s.virtualSize + s.params.spaceBetween + "px"
                                }), s.params.centeredSlides)) {
                                for (newSlidesGrid = [], i = 0; i < s.snapGrid.length; i++) s.snapGrid[i] < s.virtualSize + s.snapGrid[0] && newSlidesGrid.push(s.snapGrid[i]);
                                s.snapGrid = newSlidesGrid
                            }
                            if (!s.params.centeredSlides) {
                                for (newSlidesGrid = [], i = 0; i < s.snapGrid.length; i++) s.snapGrid[i] <= s.virtualSize - s.size && newSlidesGrid.push(s.snapGrid[i]);
                                s.snapGrid = newSlidesGrid, Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1 && s.snapGrid.push(s.virtualSize - s.size)
                            }
                            0 === s.snapGrid.length && (s.snapGrid = [0]), 0 !== s.params.spaceBetween && (s.isHorizontal() ? s.rtl ? s.slides.css({
                                marginLeft: spaceBetween + "px"
                            }) : s.slides.css({
                                marginRight: spaceBetween + "px"
                            }) : s.slides.css({
                                marginBottom: spaceBetween + "px"
                            })), s.params.watchSlidesProgress && s.updateSlidesOffset()
                        }
                    }, s.updateSlidesOffset = function() {
                        for (var i = 0; i < s.slides.length; i++) s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop
                    }, s.currentSlidesPerView = function() {
                        var i, j, spv = 1;
                        if (s.params.centeredSlides) {
                            var breakLoop, size = s.slides[s.activeIndex].swiperSlideSize;
                            for (i = s.activeIndex + 1; i < s.slides.length; i++) s.slides[i] && !breakLoop && (size += s.slides[i].swiperSlideSize, spv++, size > s.size && (breakLoop = !0));
                            for (j = s.activeIndex - 1; j >= 0; j--) s.slides[j] && !breakLoop && (size += s.slides[j].swiperSlideSize, spv++, size > s.size && (breakLoop = !0))
                        } else
                            for (i = s.activeIndex + 1; i < s.slides.length; i++) s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size && spv++;
                        return spv
                    }, s.updateSlidesProgress = function(translate) {
                        if ("undefined" == typeof translate && (translate = s.translate || 0), 0 !== s.slides.length) {
                            "undefined" == typeof s.slides[0].swiperSlideOffset && s.updateSlidesOffset();
                            var offsetCenter = -translate;
                            s.rtl && (offsetCenter = translate), s.slides.removeClass(s.params.slideVisibleClass);
                            for (var i = 0; i < s.slides.length; i++) {
                                var slide = s.slides[i],
                                    slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                                if (s.params.watchSlidesVisibility) {
                                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset),
                                        slideAfter = slideBefore + s.slidesSizesGrid[i],
                                        isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                                    isVisible && s.slides.eq(i).addClass(s.params.slideVisibleClass)
                                }
                                slide.progress = s.rtl ? -slideProgress : slideProgress
                            }
                        }
                    }, s.updateProgress = function(translate) {
                        "undefined" == typeof translate && (translate = s.translate || 0);
                        var translatesDiff = s.maxTranslate() - s.minTranslate(),
                            wasBeginning = s.isBeginning,
                            wasEnd = s.isEnd;
                        0 === translatesDiff ? (s.progress = 0, s.isBeginning = s.isEnd = !0) : (s.progress = (translate - s.minTranslate()) / translatesDiff, s.isBeginning = s.progress <= 0, s.isEnd = s.progress >= 1), s.isBeginning && !wasBeginning && s.emit("onReachBeginning", s), s.isEnd && !wasEnd && s.emit("onReachEnd", s), s.params.watchSlidesProgress && s.updateSlidesProgress(translate), s.emit("onProgress", s, s.progress)
                    }, s.updateActiveIndex = function() {
                        var newActiveIndex, i, snapIndex, translate = s.rtl ? s.translate : -s.translate;
                        for (i = 0; i < s.slidesGrid.length; i++) "undefined" != typeof s.slidesGrid[i + 1] ? translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2 ? newActiveIndex = i : translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] && (newActiveIndex = i + 1) : translate >= s.slidesGrid[i] && (newActiveIndex = i);
                        s.params.normalizeSlideIndex && (newActiveIndex < 0 || "undefined" == typeof newActiveIndex) && (newActiveIndex = 0), snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup), snapIndex >= s.snapGrid.length && (snapIndex = s.snapGrid.length - 1), newActiveIndex !== s.activeIndex && (s.snapIndex = snapIndex, s.previousIndex = s.activeIndex, s.activeIndex = newActiveIndex, s.updateClasses(), s.updateRealIndex())
                    }, s.updateRealIndex = function() {
                        s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr("data-swiper-slide-index") || s.activeIndex, 10)
                    }, s.updateClasses = function() {
                        s.slides.removeClass(s.params.slideActiveClass + " " + s.params.slideNextClass + " " + s.params.slidePrevClass + " " + s.params.slideDuplicateActiveClass + " " + s.params.slideDuplicateNextClass + " " + s.params.slideDuplicatePrevClass);
                        var activeSlide = s.slides.eq(s.activeIndex);
                        activeSlide.addClass(s.params.slideActiveClass), params.loop && (activeSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass));
                        var nextSlide = activeSlide.next("." + s.params.slideClass).addClass(s.params.slideNextClass);
                        s.params.loop && 0 === nextSlide.length && (nextSlide = s.slides.eq(0), nextSlide.addClass(s.params.slideNextClass));
                        var prevSlide = activeSlide.prev("." + s.params.slideClass).addClass(s.params.slidePrevClass);
                        if (s.params.loop && 0 === prevSlide.length && (prevSlide = s.slides.eq(-1), prevSlide.addClass(s.params.slidePrevClass)), params.loop && (nextSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicateNextClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicateNextClass), prevSlide.hasClass(s.params.slideDuplicateClass) ? s.wrapper.children("." + s.params.slideClass + ":not(." + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicatePrevClass) : s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr("data-swiper-slide-index") + '"]').addClass(s.params.slideDuplicatePrevClass)), s.paginationContainer && s.paginationContainer.length > 0) {
                            var current, total = s.params.loop ? Math.ceil((s.slides.length - 2 * s.loopedSlides) / s.params.slidesPerGroup) : s.snapGrid.length;
                            if (s.params.loop ? (current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup), current > s.slides.length - 1 - 2 * s.loopedSlides && (current -= s.slides.length - 2 * s.loopedSlides), current > total - 1 && (current -= total), current < 0 && "bullets" !== s.params.paginationType && (current = total + current)) : current = "undefined" != typeof s.snapIndex ? s.snapIndex : s.activeIndex || 0, "bullets" === s.params.paginationType && s.bullets && s.bullets.length > 0 && (s.bullets.removeClass(s.params.bulletActiveClass), s.paginationContainer.length > 1 ? s.bullets.each(function() {
                                    $(this).index() === current && $(this).addClass(s.params.bulletActiveClass)
                                }) : s.bullets.eq(current).addClass(s.params.bulletActiveClass)), "fraction" === s.params.paginationType && (s.paginationContainer.find("." + s.params.paginationCurrentClass).text(current + 1), s.paginationContainer.find("." + s.params.paginationTotalClass).text(total)), "progress" === s.params.paginationType) {
                                var scale = (current + 1) / total,
                                    scaleX = scale,
                                    scaleY = 1;
                                s.isHorizontal() || (scaleY = scale, scaleX = 1), s.paginationContainer.find("." + s.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(s.params.speed)
                            }
                            "custom" === s.params.paginationType && s.params.paginationCustomRender && (s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total)), s.emit("onPaginationRendered", s, s.paginationContainer[0]))
                        }
                        s.params.loop || (s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.isBeginning ? (s.prevButton.addClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.disable(s.prevButton)) : (s.prevButton.removeClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.enable(s.prevButton))), s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.isEnd ? (s.nextButton.addClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.disable(s.nextButton)) : (s.nextButton.removeClass(s.params.buttonDisabledClass), s.params.a11y && s.a11y && s.a11y.enable(s.nextButton))))
                    }, s.updatePagination = function() {
                        if (s.params.pagination && s.paginationContainer && s.paginationContainer.length > 0) {
                            var paginationHTML = "";
                            if ("bullets" === s.params.paginationType) {
                                for (var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - 2 * s.loopedSlides) / s.params.slidesPerGroup) : s.snapGrid.length, i = 0; i < numberOfBullets; i++) paginationHTML += s.params.paginationBulletRender ? s.params.paginationBulletRender(s, i, s.params.bulletClass) : "<" + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + ">";
                                s.paginationContainer.html(paginationHTML), s.bullets = s.paginationContainer.find("." + s.params.bulletClass), s.params.paginationClickable && s.params.a11y && s.a11y && s.a11y.initPagination()
                            }
                            "fraction" === s.params.paginationType && (paginationHTML = s.params.paginationFractionRender ? s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass) : '<span class="' + s.params.paginationCurrentClass + '"></span> / <span class="' + s.params.paginationTotalClass + '"></span>', s.paginationContainer.html(paginationHTML)), "progress" === s.params.paginationType && (paginationHTML = s.params.paginationProgressRender ? s.params.paginationProgressRender(s, s.params.paginationProgressbarClass) : '<span class="' + s.params.paginationProgressbarClass + '"></span>', s.paginationContainer.html(paginationHTML)), "custom" !== s.params.paginationType && s.emit("onPaginationRendered", s, s.paginationContainer[0])
                        }
                    }, s.update = function(updateTranslate) {
                        function forceSetTranslate() {
                            s.rtl ? -s.translate : s.translate;
                            newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate()), s.setWrapperTranslate(newTranslate), s.updateActiveIndex(), s.updateClasses()
                        }
                        if (s)
                            if (s.updateContainerSize(), s.updateSlidesSize(), s.updateProgress(), s.updatePagination(), s.updateClasses(), s.params.scrollbar && s.scrollbar && s.scrollbar.set(), updateTranslate) {
                                var translated, newTranslate;
                                s.controller && s.controller.spline && (s.controller.spline = void 0), s.params.freeMode ? (forceSetTranslate(), s.params.autoHeight && s.updateAutoHeight()) : (translated = ("auto" === s.params.slidesPerView || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0), translated || forceSetTranslate())
                            } else s.params.autoHeight && s.updateAutoHeight()
                    }, s.onResize = function(forceUpdatePagination) {
                        s.params.breakpoints && s.setBreakpoint();
                        var allowSwipeToPrev = s.params.allowSwipeToPrev,
                            allowSwipeToNext = s.params.allowSwipeToNext;
                        s.params.allowSwipeToPrev = s.params.allowSwipeToNext = !0, s.updateContainerSize(), s.updateSlidesSize(), ("auto" === s.params.slidesPerView || s.params.freeMode || forceUpdatePagination) && s.updatePagination(), s.params.scrollbar && s.scrollbar && s.scrollbar.set(), s.controller && s.controller.spline && (s.controller.spline = void 0);
                        var slideChangedBySlideTo = !1;
                        if (s.params.freeMode) {
                            var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                            s.setWrapperTranslate(newTranslate), s.updateActiveIndex(), s.updateClasses(), s.params.autoHeight && s.updateAutoHeight()
                        } else s.updateClasses(), slideChangedBySlideTo = ("auto" === s.params.slidesPerView || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0);
                        s.params.lazyLoading && !slideChangedBySlideTo && s.lazy && s.lazy.load(), s.params.allowSwipeToPrev = allowSwipeToPrev, s.params.allowSwipeToNext = allowSwipeToNext
                    }, s.touchEventsDesktop = {
                        start: "mousedown",
                        move: "mousemove",
                        end: "mouseup"
                    }, window.navigator.pointerEnabled ? s.touchEventsDesktop = {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    } : window.navigator.msPointerEnabled && (s.touchEventsDesktop = {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    }), s.touchEvents = {
                        start: s.support.touch || !s.params.simulateTouch ? "touchstart" : s.touchEventsDesktop.start,
                        move: s.support.touch || !s.params.simulateTouch ? "touchmove" : s.touchEventsDesktop.move,
                        end: s.support.touch || !s.params.simulateTouch ? "touchend" : s.touchEventsDesktop.end
                    }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === s.params.touchEventsTarget ? s.container : s.wrapper).addClass("swiper-wp8-" + s.params.direction), s.initEvents = function(detach) {
                        var actionDom = detach ? "off" : "on",
                            action = detach ? "removeEventListener" : "addEventListener",
                            touchEventsTarget = "container" === s.params.touchEventsTarget ? s.container[0] : s.wrapper[0],
                            target = s.support.touch ? touchEventsTarget : document,
                            moveCapture = !!s.params.nested;
                        if (s.browser.ie) touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, !1), target[action](s.touchEvents.move, s.onTouchMove, moveCapture), target[action](s.touchEvents.end, s.onTouchEnd, !1);
                        else {
                            if (s.support.touch) {
                                var passiveListener = !("touchstart" !== s.touchEvents.start || !s.support.passiveListener || !s.params.passiveListeners) && {
                                    passive: !0,
                                    capture: !1
                                };
                                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener), touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture), touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener)
                            }(params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) && (touchEventsTarget[action]("mousedown", s.onTouchStart, !1),
                                document[action]("mousemove", s.onTouchMove, moveCapture), document[action]("mouseup", s.onTouchEnd, !1))
                        }
                        window[action]("resize", s.onResize), s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.nextButton[actionDom]("click", s.onClickNext), s.params.a11y && s.a11y && s.nextButton[actionDom]("keydown", s.a11y.onEnterKey)), s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.prevButton[actionDom]("click", s.onClickPrev), s.params.a11y && s.a11y && s.prevButton[actionDom]("keydown", s.a11y.onEnterKey)), s.params.pagination && s.params.paginationClickable && (s.paginationContainer[actionDom]("click", "." + s.params.bulletClass, s.onClickIndex), s.params.a11y && s.a11y && s.paginationContainer[actionDom]("keydown", "." + s.params.bulletClass, s.a11y.onEnterKey)), (s.params.preventClicks || s.params.preventClicksPropagation) && touchEventsTarget[action]("click", s.preventClicks, !0)
                    }, s.attachEvents = function() {
                        s.initEvents()
                    }, s.detachEvents = function() {
                        s.initEvents(!0)
                    }, s.allowClick = !0, s.preventClicks = function(e) {
                        s.allowClick || (s.params.preventClicks && e.preventDefault(), s.params.preventClicksPropagation && s.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }, s.onClickNext = function(e) {
                        e.preventDefault(), s.isEnd && !s.params.loop || s.slideNext()
                    }, s.onClickPrev = function(e) {
                        e.preventDefault(), s.isBeginning && !s.params.loop || s.slidePrev()
                    }, s.onClickIndex = function(e) {
                        e.preventDefault();
                        var index = $(this).index() * s.params.slidesPerGroup;
                        s.params.loop && (index += s.loopedSlides), s.slideTo(index)
                    }, s.updateClickedSlide = function(e) {
                        var slide = findElementInEvent(e, "." + s.params.slideClass),
                            slideFound = !1;
                        if (slide)
                            for (var i = 0; i < s.slides.length; i++) s.slides[i] === slide && (slideFound = !0);
                        if (!slide || !slideFound) return s.clickedSlide = void 0, void(s.clickedIndex = void 0);
                        if (s.clickedSlide = slide, s.clickedIndex = $(slide).index(), s.params.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex) {
                            var realIndex, slideToIndex = s.clickedIndex,
                                slidesPerView = "auto" === s.params.slidesPerView ? s.currentSlidesPerView() : s.params.slidesPerView;
                            if (s.params.loop) {
                                if (s.animating) return;
                                realIndex = parseInt($(s.clickedSlide).attr("data-swiper-slide-index"), 10), s.params.centeredSlides ? slideToIndex < s.loopedSlides - slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2 ? (s.fixLoop(), slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                    s.slideTo(slideToIndex)
                                }, 0)) : s.slideTo(slideToIndex) : slideToIndex > s.slides.length - slidesPerView ? (s.fixLoop(), slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                    s.slideTo(slideToIndex)
                                }, 0)) : s.slideTo(slideToIndex)
                            } else s.slideTo(slideToIndex)
                        }
                    };
                    var isTouched, isMoved, allowTouchCallbacks, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, clickTimeout, allowMomentumBounce, formElements = "input, select, textarea, button, video",
                        lastClickTime = Date.now(),
                        velocities = [];
                    s.animating = !1, s.touches = {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    };
                    var isTouchEvent, startMoving;
                    s.onTouchStart = function(e) {
                        if (e.originalEvent && (e = e.originalEvent), isTouchEvent = "touchstart" === e.type, isTouchEvent || !("which" in e) || 3 !== e.which) {
                            if (s.params.noSwiping && findElementInEvent(e, "." + s.params.noSwipingClass)) return void(s.allowClick = !0);
                            if (!s.params.swipeHandler || findElementInEvent(e, s.params.swipeHandler)) {
                                var startX = s.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                    startY = s.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                                if (!(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold)) {
                                    if (isTouched = !0, isMoved = !1, allowTouchCallbacks = !0, isScrolling = void 0, startMoving = void 0, s.touches.startX = startX, s.touches.startY = startY, touchStartTime = Date.now(), s.allowClick = !0, s.updateContainerSize(), s.swipeDirection = void 0, s.params.threshold > 0 && (allowThresholdMove = !1), "touchstart" !== e.type) {
                                        var preventDefault = !0;
                                        $(e.target).is(formElements) && (preventDefault = !1), document.activeElement && $(document.activeElement).is(formElements) && document.activeElement.blur(), preventDefault && e.preventDefault()
                                    }
                                    s.emit("onTouchStart", s, e)
                                }
                            }
                        }
                    }, s.onTouchMove = function(e) {
                        if (e.originalEvent && (e = e.originalEvent), !isTouchEvent || "mousemove" !== e.type) {
                            if (e.preventedByNestedSwiper) return s.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(s.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                            if (s.params.onlyExternal) return s.allowClick = !1, void(isTouched && (s.touches.startX = s.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touches.startY = s.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, touchStartTime = Date.now()));
                            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop)
                                if (s.isHorizontal()) {
                                    if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate()) return
                                } else if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate()) return;
                            if (isTouchEvent && document.activeElement && e.target === document.activeElement && $(e.target).is(formElements)) return isMoved = !0, void(s.allowClick = !1);
                            if (allowTouchCallbacks && s.emit("onTouchMove", s, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                                if (s.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof isScrolling) {
                                    var touchAngle;
                                    s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX ? isScrolling = !1 : (touchAngle = 180 * Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) / Math.PI, isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle)
                                }
                                if (isScrolling && s.emit("onTouchMoveOpposite", s, e), "undefined" == typeof startMoving && s.browser.ieTouch && (s.touches.currentX === s.touches.startX && s.touches.currentY === s.touches.startY || (startMoving = !0)), isTouched) {
                                    if (isScrolling) return void(isTouched = !1);
                                    if (startMoving || !s.browser.ieTouch) {
                                        s.allowClick = !1, s.emit("onSliderMove", s, e), e.preventDefault(), s.params.touchMoveStopPropagation && !s.params.nested && e.stopPropagation(), isMoved || (params.loop && s.fixLoop(), startTranslate = s.getWrapperTranslate(), s.setWrapperTransition(0), s.animating && s.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), s.params.autoplay && s.autoplaying && (s.params.autoplayDisableOnInteraction ? s.stopAutoplay() : s.pauseAutoplay()), allowMomentumBounce = !1, !s.params.grabCursor || s.params.allowSwipeToNext !== !0 && s.params.allowSwipeToPrev !== !0 || s.setGrabCursor(!0)), isMoved = !0;
                                        var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                                        diff *= s.params.touchRatio, s.rtl && (diff = -diff), s.swipeDirection = diff > 0 ? "prev" : "next", currentTranslate = diff + startTranslate;
                                        var disableParentSwiper = !0;
                                        if (diff > 0 && currentTranslate > s.minTranslate() ? (disableParentSwiper = !1, s.params.resistance && (currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio))) : diff < 0 && currentTranslate < s.maxTranslate() && (disableParentSwiper = !1, s.params.resistance && (currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio))), disableParentSwiper && (e.preventedByNestedSwiper = !0), !s.params.allowSwipeToNext && "next" === s.swipeDirection && currentTranslate < startTranslate && (currentTranslate = startTranslate), !s.params.allowSwipeToPrev && "prev" === s.swipeDirection && currentTranslate > startTranslate && (currentTranslate = startTranslate), s.params.threshold > 0) {
                                            if (!(Math.abs(diff) > s.params.threshold || allowThresholdMove)) return void(currentTranslate = startTranslate);
                                            if (!allowThresholdMove) return allowThresholdMove = !0, s.touches.startX = s.touches.currentX, s.touches.startY = s.touches.currentY, currentTranslate = startTranslate, void(s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY)
                                        }
                                        s.params.followFinger && ((s.params.freeMode || s.params.watchSlidesProgress) && s.updateActiveIndex(), s.params.freeMode && (0 === velocities.length && velocities.push({
                                            position: s.touches[s.isHorizontal() ? "startX" : "startY"],
                                            time: touchStartTime
                                        }), velocities.push({
                                            position: s.touches[s.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), s.updateProgress(currentTranslate), s.setWrapperTranslate(currentTranslate))
                                    }
                                }
                            }
                        }
                    }, s.onTouchEnd = function(e) {
                        if (e.originalEvent && (e = e.originalEvent), allowTouchCallbacks && s.emit("onTouchEnd", s, e), allowTouchCallbacks = !1, isTouched) {
                            s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === !0 || s.params.allowSwipeToPrev === !0) && s.setGrabCursor(!1);
                            var touchEndTime = Date.now(),
                                timeDiff = touchEndTime - touchStartTime;
                            if (s.allowClick && (s.updateClickedSlide(e), s.emit("onTap", s, e), timeDiff < 300 && touchEndTime - lastClickTime > 300 && (clickTimeout && clearTimeout(clickTimeout), clickTimeout = setTimeout(function() {
                                    s && (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass) && s.paginationContainer.toggleClass(s.params.paginationHiddenClass), s.emit("onClick", s, e))
                                }, 300)), timeDiff < 300 && touchEndTime - lastClickTime < 300 && (clickTimeout && clearTimeout(clickTimeout), s.emit("onDoubleTap", s, e))), lastClickTime = Date.now(), setTimeout(function() {
                                    s && (s.allowClick = !0)
                                }, 0), !isTouched || !isMoved || !s.swipeDirection || 0 === s.touches.diff || currentTranslate === startTranslate) return void(isTouched = isMoved = !1);
                            isTouched = isMoved = !1;
                            var currentPos;
                            if (currentPos = s.params.followFinger ? s.rtl ? s.translate : -s.translate : -currentTranslate, s.params.freeMode) {
                                if (currentPos < -s.minTranslate()) return void s.slideTo(s.activeIndex);
                                if (currentPos > -s.maxTranslate()) return void(s.slides.length < s.snapGrid.length ? s.slideTo(s.snapGrid.length - 1) : s.slideTo(s.slides.length - 1));
                                if (s.params.freeModeMomentum) {
                                    if (velocities.length > 1) {
                                        var lastMoveEvent = velocities.pop(),
                                            velocityEvent = velocities.pop(),
                                            distance = lastMoveEvent.position - velocityEvent.position,
                                            time = lastMoveEvent.time - velocityEvent.time;
                                        s.velocity = distance / time, s.velocity = s.velocity / 2, Math.abs(s.velocity) < s.params.freeModeMinimumVelocity && (s.velocity = 0), (time > 150 || (new window.Date).getTime() - lastMoveEvent.time > 300) && (s.velocity = 0)
                                    } else s.velocity = 0;
                                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio, velocities.length = 0;
                                    var momentumDuration = 1e3 * s.params.freeModeMomentumRatio,
                                        momentumDistance = s.velocity * momentumDuration,
                                        newPosition = s.translate + momentumDistance;
                                    s.rtl && (newPosition = -newPosition);
                                    var afterBouncePosition, doBounce = !1,
                                        bounceAmount = 20 * Math.abs(s.velocity) * s.params.freeModeMomentumBounceRatio;
                                    if (newPosition < s.maxTranslate()) s.params.freeModeMomentumBounce ? (newPosition + s.maxTranslate() < -bounceAmount && (newPosition = s.maxTranslate() - bounceAmount), afterBouncePosition = s.maxTranslate(), doBounce = !0, allowMomentumBounce = !0) : newPosition = s.maxTranslate();
                                    else if (newPosition > s.minTranslate()) s.params.freeModeMomentumBounce ? (newPosition - s.minTranslate() > bounceAmount && (newPosition = s.minTranslate() + bounceAmount), afterBouncePosition = s.minTranslate(), doBounce = !0, allowMomentumBounce = !0) : newPosition = s.minTranslate();
                                    else if (s.params.freeModeSticky) {
                                        var nextSlide, j = 0;
                                        for (j = 0; j < s.snapGrid.length; j += 1)
                                            if (s.snapGrid[j] > -newPosition) {
                                                nextSlide = j;
                                                break
                                            }
                                        newPosition = Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || "next" === s.swipeDirection ? s.snapGrid[nextSlide] : s.snapGrid[nextSlide - 1], s.rtl || (newPosition = -newPosition)
                                    }
                                    if (0 !== s.velocity) momentumDuration = s.rtl ? Math.abs((-newPosition - s.translate) / s.velocity) : Math.abs((newPosition - s.translate) / s.velocity);
                                    else if (s.params.freeModeSticky) return void s.slideReset();
                                    s.params.freeModeMomentumBounce && doBounce ? (s.updateProgress(afterBouncePosition), s.setWrapperTransition(momentumDuration), s.setWrapperTranslate(newPosition), s.onTransitionStart(), s.animating = !0, s.wrapper.transitionEnd(function() {
                                        s && allowMomentumBounce && (s.emit("onMomentumBounce", s), s.setWrapperTransition(s.params.speed), s.setWrapperTranslate(afterBouncePosition), s.wrapper.transitionEnd(function() {
                                            s && s.onTransitionEnd()
                                        }))
                                    })) : s.velocity ? (s.updateProgress(newPosition), s.setWrapperTransition(momentumDuration), s.setWrapperTranslate(newPosition), s.onTransitionStart(), s.animating || (s.animating = !0, s.wrapper.transitionEnd(function() {
                                        s && s.onTransitionEnd()
                                    }))) : s.updateProgress(newPosition), s.updateActiveIndex()
                                }
                                return void((!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) && (s.updateProgress(), s.updateActiveIndex()))
                            }
                            var i, stopIndex = 0,
                                groupSize = s.slidesSizesGrid[0];
                            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) "undefined" != typeof s.slidesGrid[i + s.params.slidesPerGroup] ? currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup] && (stopIndex = i, groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i]) : currentPos >= s.slidesGrid[i] && (stopIndex = i, groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2]);
                            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
                            if (timeDiff > s.params.longSwipesMs) {
                                if (!s.params.longSwipes) return void s.slideTo(s.activeIndex);
                                "next" === s.swipeDirection && (ratio >= s.params.longSwipesRatio ? s.slideTo(stopIndex + s.params.slidesPerGroup) : s.slideTo(stopIndex)), "prev" === s.swipeDirection && (ratio > 1 - s.params.longSwipesRatio ? s.slideTo(stopIndex + s.params.slidesPerGroup) : s.slideTo(stopIndex))
                            } else {
                                if (!s.params.shortSwipes) return void s.slideTo(s.activeIndex);
                                "next" === s.swipeDirection && s.slideTo(stopIndex + s.params.slidesPerGroup), "prev" === s.swipeDirection && s.slideTo(stopIndex)
                            }
                        }
                    }, s._slideTo = function(slideIndex, speed) {
                        return s.slideTo(slideIndex, speed, !0, !0)
                    }, s.slideTo = function(slideIndex, speed, runCallbacks, internal) {
                        "undefined" == typeof runCallbacks && (runCallbacks = !0), "undefined" == typeof slideIndex && (slideIndex = 0), slideIndex < 0 && (slideIndex = 0), s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup), s.snapIndex >= s.snapGrid.length && (s.snapIndex = s.snapGrid.length - 1);
                        var translate = -s.snapGrid[s.snapIndex];
                        if (s.params.autoplay && s.autoplaying && (internal || !s.params.autoplayDisableOnInteraction ? s.pauseAutoplay(speed) : s.stopAutoplay()), s.updateProgress(translate), s.params.normalizeSlideIndex)
                            for (var i = 0; i < s.slidesGrid.length; i++) - Math.floor(100 * translate) >= Math.floor(100 * s.slidesGrid[i]) && (slideIndex = i);
                        return !(!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) && (!(!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate() && (s.activeIndex || 0) !== slideIndex) && ("undefined" == typeof speed && (speed = s.params.speed), s.previousIndex = s.activeIndex || 0, s.activeIndex = slideIndex, s.updateRealIndex(), s.rtl && -translate === s.translate || !s.rtl && translate === s.translate ? (s.params.autoHeight && s.updateAutoHeight(), s.updateClasses(), "slide" !== s.params.effect && s.setWrapperTranslate(translate), !1) : (s.updateClasses(), s.onTransitionStart(runCallbacks), 0 === speed || s.browser.lteIE9 ? (s.setWrapperTranslate(translate), s.setWrapperTransition(0), s.onTransitionEnd(runCallbacks)) : (s.setWrapperTranslate(translate), s.setWrapperTransition(speed), s.animating || (s.animating = !0, s.wrapper.transitionEnd(function() {
                            s && s.onTransitionEnd(runCallbacks)
                        }))), !0)))
                    }, s.onTransitionStart = function(runCallbacks) {
                        "undefined" == typeof runCallbacks && (runCallbacks = !0), s.params.autoHeight && s.updateAutoHeight(), s.lazy && s.lazy.onTransitionStart(), runCallbacks && (s.emit("onTransitionStart", s), s.activeIndex !== s.previousIndex && (s.emit("onSlideChangeStart", s), s.activeIndex > s.previousIndex ? s.emit("onSlideNextStart", s) : s.emit("onSlidePrevStart", s)))
                    }, s.onTransitionEnd = function(runCallbacks) {
                        s.animating = !1, s.setWrapperTransition(0), "undefined" == typeof runCallbacks && (runCallbacks = !0), s.lazy && s.lazy.onTransitionEnd(), runCallbacks && (s.emit("onTransitionEnd", s), s.activeIndex !== s.previousIndex && (s.emit("onSlideChangeEnd", s), s.activeIndex > s.previousIndex ? s.emit("onSlideNextEnd", s) : s.emit("onSlidePrevEnd", s))), s.params.history && s.history && s.history.setHistory(s.params.history, s.activeIndex), s.params.hashnav && s.hashnav && s.hashnav.setHash()
                    }, s.slideNext = function(runCallbacks, speed, internal) {
                        if (s.params.loop) {
                            if (s.animating) return !1;
                            s.fixLoop();
                            s.container[0].clientLeft;
                            return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
                        }
                        return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
                    }, s._slideNext = function(speed) {
                        return s.slideNext(!0, speed, !0)
                    }, s.slidePrev = function(runCallbacks, speed, internal) {
                        if (s.params.loop) {
                            if (s.animating) return !1;
                            s.fixLoop();
                            s.container[0].clientLeft;
                            return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
                        }
                        return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
                    }, s._slidePrev = function(speed) {
                        return s.slidePrev(!0, speed, !0)
                    }, s.slideReset = function(runCallbacks, speed, internal) {
                        return s.slideTo(s.activeIndex, speed, runCallbacks)
                    }, s.disableTouchControl = function() {
                        return s.params.onlyExternal = !0, !0
                    }, s.enableTouchControl = function() {
                        return s.params.onlyExternal = !1, !0
                    }, s.setWrapperTransition = function(duration, byController) {
                        s.wrapper.transition(duration), "slide" !== s.params.effect && s.effects[s.params.effect] && s.effects[s.params.effect].setTransition(duration), s.params.parallax && s.parallax && s.parallax.setTransition(duration), s.params.scrollbar && s.scrollbar && s.scrollbar.setTransition(duration), s.params.control && s.controller && s.controller.setTransition(duration, byController), s.emit("onSetTransition", s, duration)
                    }, s.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
                        var x = 0,
                            y = 0,
                            z = 0;
                        s.isHorizontal() ? x = s.rtl ? -translate : translate : y = translate, s.params.roundLengths && (x = round(x), y = round(y)), s.params.virtualTranslate || (s.support.transforms3d ? s.wrapper.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)") : s.wrapper.transform("translate(" + x + "px, " + y + "px)")), s.translate = s.isHorizontal() ? x : y;
                        var progress, translatesDiff = s.maxTranslate() - s.minTranslate();
                        progress = 0 === translatesDiff ? 0 : (translate - s.minTranslate()) / translatesDiff, progress !== s.progress && s.updateProgress(translate), updateActiveIndex && s.updateActiveIndex(), "slide" !== s.params.effect && s.effects[s.params.effect] && s.effects[s.params.effect].setTranslate(s.translate), s.params.parallax && s.parallax && s.parallax.setTranslate(s.translate), s.params.scrollbar && s.scrollbar && s.scrollbar.setTranslate(s.translate), s.params.control && s.controller && s.controller.setTranslate(s.translate, byController), s.emit("onSetTranslate", s, s.translate)
                    }, s.getTranslate = function(el, axis) {
                        var matrix, curTransform, curStyle, transformMatrix;
                        return "undefined" == typeof axis && (axis = "x"), s.params.virtualTranslate ? s.rtl ? -s.translate : s.translate : (curStyle = window.getComputedStyle(el, null), window.WebKitCSSMatrix ? (curTransform = curStyle.transform || curStyle.webkitTransform, curTransform.split(",").length > 6 && (curTransform = curTransform.split(", ").map(function(a) {
                            return a.replace(",", ".")
                        }).join(", ")), transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform)) : (transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), matrix = transformMatrix.toString().split(",")), "x" === axis && (curTransform = window.WebKitCSSMatrix ? transformMatrix.m41 : 16 === matrix.length ? parseFloat(matrix[12]) : parseFloat(matrix[4])), "y" === axis && (curTransform = window.WebKitCSSMatrix ? transformMatrix.m42 : 16 === matrix.length ? parseFloat(matrix[13]) : parseFloat(matrix[5])), s.rtl && curTransform && (curTransform = -curTransform), curTransform || 0)
                    }, s.getWrapperTranslate = function(axis) {
                        return "undefined" == typeof axis && (axis = s.isHorizontal() ? "x" : "y"), s.getTranslate(s.wrapper[0], axis)
                    }, s.observers = [], s.initObservers = function() {
                        if (s.params.observeParents)
                            for (var containerParents = s.container.parents(), i = 0; i < containerParents.length; i++) initObserver(containerParents[i]);
                        initObserver(s.container[0], {
                            childList: !1
                        }), initObserver(s.wrapper[0], {
                            attributes: !1
                        })
                    }, s.disconnectObservers = function() {
                        for (var i = 0; i < s.observers.length; i++) s.observers[i].disconnect();
                        s.observers = []
                    }, s.createLoop = function() {
                        s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove();
                        var slides = s.wrapper.children("." + s.params.slideClass);
                        "auto" !== s.params.slidesPerView || s.params.loopedSlides || (s.params.loopedSlides = slides.length), s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10), s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides, s.loopedSlides > slides.length && (s.loopedSlides = slides.length);
                        var i, prependSlides = [],
                            appendSlides = [];
                        for (slides.each(function(index, el) {
                                var slide = $(this);
                                index < s.loopedSlides && appendSlides.push(el), index < slides.length && index >= slides.length - s.loopedSlides && prependSlides.push(el), slide.attr("data-swiper-slide-index", index)
                            }), i = 0; i < appendSlides.length; i++) s.wrapper.append($(appendSlides[i].cloneNode(!0)).addClass(s.params.slideDuplicateClass));
                        for (i = prependSlides.length - 1; i >= 0; i--) s.wrapper.prepend($(prependSlides[i].cloneNode(!0)).addClass(s.params.slideDuplicateClass))
                    }, s.destroyLoop = function() {
                        s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove(), s.slides.removeAttr("data-swiper-slide-index")
                    }, s.reLoop = function(updatePosition) {
                        var oldIndex = s.activeIndex - s.loopedSlides;
                        s.destroyLoop(), s.createLoop(), s.updateSlidesSize(), updatePosition && s.slideTo(oldIndex + s.loopedSlides, 0, !1)
                    }, s.fixLoop = function() {
                        var newIndex;
                        s.activeIndex < s.loopedSlides ? (newIndex = s.slides.length - 3 * s.loopedSlides + s.activeIndex, newIndex += s.loopedSlides, s.slideTo(newIndex, 0, !1, !0)) : ("auto" === s.params.slidesPerView && s.activeIndex >= 2 * s.loopedSlides || s.activeIndex > s.slides.length - 2 * s.params.slidesPerView) && (newIndex = -s.slides.length + s.activeIndex + s.loopedSlides, newIndex += s.loopedSlides, s.slideTo(newIndex, 0, !1, !0))
                    }, s.appendSlide = function(slides) {
                        if (s.params.loop && s.destroyLoop(), "object" == typeof slides && slides.length)
                            for (var i = 0; i < slides.length; i++) slides[i] && s.wrapper.append(slides[i]);
                        else s.wrapper.append(slides);
                        s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0)
                    }, s.prependSlide = function(slides) {
                        s.params.loop && s.destroyLoop();
                        var newActiveIndex = s.activeIndex + 1;
                        if ("object" == typeof slides && slides.length) {
                            for (var i = 0; i < slides.length; i++) slides[i] && s.wrapper.prepend(slides[i]);
                            newActiveIndex = s.activeIndex + slides.length
                        } else s.wrapper.prepend(slides);
                        s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0), s.slideTo(newActiveIndex, 0, !1)
                    }, s.removeSlide = function(slidesIndexes) {
                        s.params.loop && (s.destroyLoop(), s.slides = s.wrapper.children("." + s.params.slideClass));
                        var indexToRemove, newActiveIndex = s.activeIndex;
                        if ("object" == typeof slidesIndexes && slidesIndexes.length) {
                            for (var i = 0; i < slidesIndexes.length; i++) indexToRemove = slidesIndexes[i], s.slides[indexToRemove] && s.slides.eq(indexToRemove).remove(), indexToRemove < newActiveIndex && newActiveIndex--;
                            newActiveIndex = Math.max(newActiveIndex, 0)
                        } else indexToRemove = slidesIndexes, s.slides[indexToRemove] && s.slides.eq(indexToRemove).remove(), indexToRemove < newActiveIndex && newActiveIndex--, newActiveIndex = Math.max(newActiveIndex, 0);
                        s.params.loop && s.createLoop(), s.params.observer && s.support.observer || s.update(!0), s.params.loop ? s.slideTo(newActiveIndex + s.loopedSlides, 0, !1) : s.slideTo(newActiveIndex, 0, !1)
                    }, s.removeAllSlides = function() {
                        for (var slidesIndexes = [], i = 0; i < s.slides.length; i++) slidesIndexes.push(i);
                        s.removeSlide(slidesIndexes)
                    }, s.effects = {
                        fade: {
                            setTranslate: function() {
                                for (var i = 0; i < s.slides.length; i++) {
                                    var slide = s.slides.eq(i),
                                        offset = slide[0].swiperSlideOffset,
                                        tx = -offset;
                                    s.params.virtualTranslate || (tx -= s.translate);
                                    var ty = 0;
                                    s.isHorizontal() || (ty = tx, tx = 0);
                                    var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                                    slide.css({
                                        opacity: slideOpacity
                                    }).transform("translate3d(" + tx + "px, " + ty + "px, 0px)")
                                }
                            },
                            setTransition: function(duration) {
                                if (s.slides.transition(duration), s.params.virtualTranslate && 0 !== duration) {
                                    var eventTriggered = !1;
                                    s.slides.transitionEnd(function() {
                                        if (!eventTriggered && s) {
                                            eventTriggered = !0, s.animating = !1;
                                            for (var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < triggerEvents.length; i++) s.wrapper.trigger(triggerEvents[i])
                                        }
                                    })
                                }
                            }
                        },
                        flip: {
                            setTranslate: function() {
                                for (var i = 0; i < s.slides.length; i++) {
                                    var slide = s.slides.eq(i),
                                        progress = slide[0].progress;
                                    s.params.flip.limitRotation && (progress = Math.max(Math.min(slide[0].progress, 1), -1));
                                    var offset = slide[0].swiperSlideOffset,
                                        rotate = -180 * progress,
                                        rotateY = rotate,
                                        rotateX = 0,
                                        tx = -offset,
                                        ty = 0;
                                    if (s.isHorizontal() ? s.rtl && (rotateY = -rotateY) : (ty = tx, tx = 0, rotateX = -rotateY, rotateY = 0), slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length, s.params.flip.slideShadows) {
                                        var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                                            shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                                        0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = Math.max(-progress, 0)), shadowAfter.length && (shadowAfter[0].style.opacity = Math.max(progress, 0))
                                    }
                                    slide.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)")
                                }
                            },
                            setTransition: function(duration) {
                                if (s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration), s.params.virtualTranslate && 0 !== duration) {
                                    var eventTriggered = !1;
                                    s.slides.eq(s.activeIndex).transitionEnd(function() {
                                        if (!eventTriggered && s && $(this).hasClass(s.params.slideActiveClass)) {
                                            eventTriggered = !0, s.animating = !1;
                                            for (var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < triggerEvents.length; i++) s.wrapper.trigger(triggerEvents[i])
                                        }
                                    })
                                }
                            }
                        },
                        cube: {
                            setTranslate: function() {
                                var cubeShadow, wrapperRotate = 0;
                                s.params.cube.shadow && (s.isHorizontal() ? (cubeShadow = s.wrapper.find(".swiper-cube-shadow"), 0 === cubeShadow.length && (cubeShadow = $('<div class="swiper-cube-shadow"></div>'), s.wrapper.append(cubeShadow)), cubeShadow.css({
                                    height: s.width + "px"
                                })) : (cubeShadow = s.container.find(".swiper-cube-shadow"), 0 === cubeShadow.length && (cubeShadow = $('<div class="swiper-cube-shadow"></div>'), s.container.append(cubeShadow))));
                                for (var i = 0; i < s.slides.length; i++) {
                                    var slide = s.slides.eq(i),
                                        slideAngle = 90 * i,
                                        round = Math.floor(slideAngle / 360);
                                    s.rtl && (slideAngle = -slideAngle, round = Math.floor(-slideAngle / 360));
                                    var progress = Math.max(Math.min(slide[0].progress, 1), -1),
                                        tx = 0,
                                        ty = 0,
                                        tz = 0;
                                    i % 4 === 0 ? (tx = 4 * -round * s.size, tz = 0) : (i - 1) % 4 === 0 ? (tx = 0, tz = 4 * -round * s.size) : (i - 2) % 4 === 0 ? (tx = s.size + 4 * round * s.size, tz = s.size) : (i - 3) % 4 === 0 && (tx = -s.size, tz = 3 * s.size + 4 * s.size * round), s.rtl && (tx = -tx), s.isHorizontal() || (ty = tx, tx = 0);
                                    var transform = "rotateX(" + (s.isHorizontal() ? 0 : -slideAngle) + "deg) rotateY(" + (s.isHorizontal() ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                                    if (progress <= 1 && progress > -1 && (wrapperRotate = 90 * i + 90 * progress, s.rtl && (wrapperRotate = 90 * -i - 90 * progress)), slide.transform(transform), s.params.cube.slideShadows) {
                                        var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                                            shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                                        0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = Math.max(-progress, 0)), shadowAfter.length && (shadowAfter[0].style.opacity = Math.max(progress, 0))
                                    }
                                }
                                if (s.wrapper.css({
                                        "-webkit-transform-origin": "50% 50% -" + s.size / 2 + "px",
                                        "-moz-transform-origin": "50% 50% -" + s.size / 2 + "px",
                                        "-ms-transform-origin": "50% 50% -" + s.size / 2 + "px",
                                        "transform-origin": "50% 50% -" + s.size / 2 + "px"
                                    }), s.params.cube.shadow)
                                    if (s.isHorizontal()) cubeShadow.transform("translate3d(0px, " + (s.width / 2 + s.params.cube.shadowOffset) + "px, " + -s.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + s.params.cube.shadowScale + ")");
                                    else {
                                        var shadowAngle = Math.abs(wrapperRotate) - 90 * Math.floor(Math.abs(wrapperRotate) / 90),
                                            multiplier = 1.5 - (Math.sin(2 * shadowAngle * Math.PI / 360) / 2 + Math.cos(2 * shadowAngle * Math.PI / 360) / 2),
                                            scale1 = s.params.cube.shadowScale,
                                            scale2 = s.params.cube.shadowScale / multiplier,
                                            offset = s.params.cube.shadowOffset;
                                        cubeShadow.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (s.height / 2 + offset) + "px, " + -s.height / 2 / scale2 + "px) rotateX(-90deg)")
                                    }
                                var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
                                s.wrapper.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (s.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (s.isHorizontal() ? -wrapperRotate : 0) + "deg)")
                            },
                            setTransition: function(duration) {
                                s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration), s.params.cube.shadow && !s.isHorizontal() && s.container.find(".swiper-cube-shadow").transition(duration)
                            }
                        },
                        coverflow: {
                            setTranslate: function() {
                                for (var transform = s.translate, center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2, rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate, translate = s.params.coverflow.depth, i = 0, length = s.slides.length; i < length; i++) {
                                    var slide = s.slides.eq(i),
                                        slideSize = s.slidesSizesGrid[i],
                                        slideOffset = slide[0].swiperSlideOffset,
                                        offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier,
                                        rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0,
                                        rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier,
                                        translateZ = -translate * Math.abs(offsetMultiplier),
                                        translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier,
                                        translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0;
                                    Math.abs(translateX) < .001 && (translateX = 0), Math.abs(translateY) < .001 && (translateY = 0), Math.abs(translateZ) < .001 && (translateZ = 0), Math.abs(rotateY) < .001 && (rotateY = 0), Math.abs(rotateX) < .001 && (rotateX = 0);
                                    var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
                                    if (slide.transform(slideTransform), slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1, s.params.coverflow.slideShadows) {
                                        var shadowBefore = s.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top"),
                                            shadowAfter = s.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                                        0 === shadowBefore.length && (shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "left" : "top") + '"></div>'), slide.append(shadowBefore)), 0 === shadowAfter.length && (shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? "right" : "bottom") + '"></div>'), slide.append(shadowAfter)), shadowBefore.length && (shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0), shadowAfter.length && (shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0)
                                    }
                                }
                                if (s.browser.ie) {
                                    var ws = s.wrapper[0].style;
                                    ws.perspectiveOrigin = center + "px 50%"
                                }
                            },
                            setTransition: function(duration) {
                                s.slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration)
                            }
                        }
                    }, s.lazy = {
                        initialImageLoaded: !1,
                        loadImageInSlide: function(index, loadInDuplicate) {
                            if ("undefined" != typeof index && ("undefined" == typeof loadInDuplicate && (loadInDuplicate = !0), 0 !== s.slides.length)) {
                                var slide = s.slides.eq(index),
                                    img = slide.find("." + s.params.lazyLoadingClass + ":not(." + s.params.lazyStatusLoadedClass + "):not(." + s.params.lazyStatusLoadingClass + ")");
                                !slide.hasClass(s.params.lazyLoadingClass) || slide.hasClass(s.params.lazyStatusLoadedClass) || slide.hasClass(s.params.lazyStatusLoadingClass) || (img = img.add(slide[0])), 0 !== img.length && img.each(function() {
                                    var _img = $(this);
                                    _img.addClass(s.params.lazyStatusLoadingClass);
                                    var background = _img.attr("data-background"),
                                        src = _img.attr("data-src"),
                                        srcset = _img.attr("data-srcset"),
                                        sizes = _img.attr("data-sizes");
                                    s.loadImage(_img[0], src || background, srcset, sizes, !1, function() {
                                        if (background ? (_img.css("background-image", 'url("' + background + '")'), _img.removeAttr("data-background")) : (srcset && (_img.attr("srcset", srcset), _img.removeAttr("data-srcset")), sizes && (_img.attr("sizes", sizes), _img.removeAttr("data-sizes")), src && (_img.attr("src", src), _img.removeAttr("data-src"))), _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass), slide.find("." + s.params.lazyPreloaderClass + ", ." + s.params.preloaderClass).remove(), s.params.loop && loadInDuplicate) {
                                            var slideOriginalIndex = slide.attr("data-swiper-slide-index");
                                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ")");
                                                s.lazy.loadImageInSlide(originalSlide.index(), !1)
                                            } else {
                                                var duplicatedSlide = s.wrapper.children("." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                                s.lazy.loadImageInSlide(duplicatedSlide.index(), !1)
                                            }
                                        }
                                        s.emit("onLazyImageReady", s, slide[0], _img[0])
                                    }), s.emit("onLazyImageLoad", s, slide[0], _img[0])
                                })
                            }
                        },
                        load: function() {
                            var i, slidesPerView = s.params.slidesPerView;
                            if ("auto" === slidesPerView && (slidesPerView = 0), s.lazy.initialImageLoaded || (s.lazy.initialImageLoaded = !0), s.params.watchSlidesVisibility) s.wrapper.children("." + s.params.slideVisibleClass).each(function() {
                                s.lazy.loadImageInSlide($(this).index())
                            });
                            else if (slidesPerView > 1)
                                for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) s.slides[i] && s.lazy.loadImageInSlide(i);
                            else s.lazy.loadImageInSlide(s.activeIndex);
                            if (s.params.lazyLoadingInPrevNext)
                                if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
                                    var amount = s.params.lazyLoadingInPrevNextAmount,
                                        spv = slidesPerView,
                                        maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length),
                                        minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                                    for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) s.slides[i] && s.lazy.loadImageInSlide(i);
                                    for (i = minIndex; i < s.activeIndex; i++) s.slides[i] && s.lazy.loadImageInSlide(i)
                                } else {
                                    var nextSlide = s.wrapper.children("." + s.params.slideNextClass);
                                    nextSlide.length > 0 && s.lazy.loadImageInSlide(nextSlide.index());
                                    var prevSlide = s.wrapper.children("." + s.params.slidePrevClass);
                                    prevSlide.length > 0 && s.lazy.loadImageInSlide(prevSlide.index())
                                }
                        },
                        onTransitionStart: function() {
                            s.params.lazyLoading && (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) && s.lazy.load()
                        },
                        onTransitionEnd: function() {
                            s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart && s.lazy.load()
                        }
                    }, s.scrollbar = {
                        isTouched: !1,
                        setDragPosition: function(e) {
                            var sb = s.scrollbar,
                                pointerPosition = s.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                                position = pointerPosition - sb.track.offset()[s.isHorizontal() ? "left" : "top"] - sb.dragSize / 2,
                                positionMin = -s.minTranslate() * sb.moveDivider,
                                positionMax = -s.maxTranslate() * sb.moveDivider;
                            position < positionMin ? position = positionMin : position > positionMax && (position = positionMax), position = -position / sb.moveDivider, s.updateProgress(position), s.setWrapperTranslate(position, !0)
                        },
                        dragStart: function(e) {
                            var sb = s.scrollbar;
                            sb.isTouched = !0, e.preventDefault(), e.stopPropagation(), sb.setDragPosition(e), clearTimeout(sb.dragTimeout), sb.track.transition(0), s.params.scrollbarHide && sb.track.css("opacity", 1), s.wrapper.transition(100), sb.drag.transition(100), s.emit("onScrollbarDragStart", s)
                        },
                        dragMove: function(e) {
                            var sb = s.scrollbar;
                            sb.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, sb.setDragPosition(e), s.wrapper.transition(0), sb.track.transition(0), sb.drag.transition(0), s.emit("onScrollbarDragMove", s))
                        },
                        dragEnd: function(e) {
                            var sb = s.scrollbar;
                            sb.isTouched && (sb.isTouched = !1, s.params.scrollbarHide && (clearTimeout(sb.dragTimeout), sb.dragTimeout = setTimeout(function() {
                                sb.track.css("opacity", 0), sb.track.transition(400)
                            }, 1e3)), s.emit("onScrollbarDragEnd", s), s.params.scrollbarSnapOnRelease && s.slideReset())
                        },
                        draggableEvents: function() {
                            return s.params.simulateTouch !== !1 || s.support.touch ? s.touchEvents : s.touchEventsDesktop
                        }(),
                        enableDraggable: function() {
                            var sb = s.scrollbar,
                                target = s.support.touch ? sb.track : document;
                            $(sb.track).on(sb.draggableEvents.start, sb.dragStart), $(target).on(sb.draggableEvents.move, sb.dragMove), $(target).on(sb.draggableEvents.end, sb.dragEnd)
                        },
                        disableDraggable: function() {
                            var sb = s.scrollbar,
                                target = s.support.touch ? sb.track : document;
                            $(sb.track).off(sb.draggableEvents.start, sb.dragStart), $(target).off(sb.draggableEvents.move, sb.dragMove), $(target).off(sb.draggableEvents.end, sb.dragEnd)
                        },
                        set: function() {
                            if (s.params.scrollbar) {
                                var sb = s.scrollbar;
                                sb.track = $(s.params.scrollbar), s.params.uniqueNavElements && "string" == typeof s.params.scrollbar && sb.track.length > 1 && 1 === s.container.find(s.params.scrollbar).length && (sb.track = s.container.find(s.params.scrollbar)), sb.drag = sb.track.find(".swiper-scrollbar-drag"), 0 === sb.drag.length && (sb.drag = $('<div class="swiper-scrollbar-drag"></div>'), sb.track.append(sb.drag)), sb.drag[0].style.width = "", sb.drag[0].style.height = "", sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight, sb.divider = s.size / s.virtualSize, sb.moveDivider = sb.divider * (sb.trackSize / s.size), sb.dragSize = sb.trackSize * sb.divider, s.isHorizontal() ? sb.drag[0].style.width = sb.dragSize + "px" : sb.drag[0].style.height = sb.dragSize + "px", sb.divider >= 1 ? sb.track[0].style.display = "none" : sb.track[0].style.display = "", s.params.scrollbarHide && (sb.track[0].style.opacity = 0)
                            }
                        },
                        setTranslate: function() {
                            if (s.params.scrollbar) {
                                var newPos, sb = s.scrollbar,
                                    newSize = (s.translate || 0, sb.dragSize);
                                newPos = (sb.trackSize - sb.dragSize) * s.progress, s.rtl && s.isHorizontal() ? (newPos = -newPos, newPos > 0 ? (newSize = sb.dragSize - newPos, newPos = 0) : -newPos + sb.dragSize > sb.trackSize && (newSize = sb.trackSize + newPos)) : newPos < 0 ? (newSize = sb.dragSize + newPos, newPos = 0) : newPos + sb.dragSize > sb.trackSize && (newSize = sb.trackSize - newPos), s.isHorizontal() ? (s.support.transforms3d ? sb.drag.transform("translate3d(" + newPos + "px, 0, 0)") : sb.drag.transform("translateX(" + newPos + "px)"), sb.drag[0].style.width = newSize + "px") : (s.support.transforms3d ? sb.drag.transform("translate3d(0px, " + newPos + "px, 0)") : sb.drag.transform("translateY(" + newPos + "px)"), sb.drag[0].style.height = newSize + "px"), s.params.scrollbarHide && (clearTimeout(sb.timeout), sb.track[0].style.opacity = 1, sb.timeout = setTimeout(function() {
                                    sb.track[0].style.opacity = 0, sb.track.transition(400)
                                }, 1e3))
                            }
                        },
                        setTransition: function(duration) {
                            s.params.scrollbar && s.scrollbar.drag.transition(duration)
                        }
                    }, s.controller = {
                        LinearSpline: function(x, y) {
                            this.x = x, this.y = y, this.lastIndex = x.length - 1;
                            var i1, i3;
                            this.x.length;
                            this.interpolate = function(x2) {
                                return x2 ? (i3 = binarySearch(this.x, x2), i1 = i3 - 1, (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1]) : 0
                            };
                            var binarySearch = function() {
                                var maxIndex, minIndex, guess;
                                return function(array, val) {
                                    for (minIndex = -1, maxIndex = array.length; maxIndex - minIndex > 1;) array[guess = maxIndex + minIndex >> 1] <= val ? minIndex = guess : maxIndex = guess;
                                    return maxIndex
                                }
                            }()
                        },
                        getInterpolateFunction: function(c) {
                            s.controller.spline || (s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid))
                        },
                        setTranslate: function(translate, byController) {
                            function setControlledTranslate(c) {
                                translate = c.rtl && "horizontal" === c.params.direction ? -s.translate : s.translate, "slide" === s.params.controlBy && (s.controller.getInterpolateFunction(c), controlledTranslate = -s.controller.spline.interpolate(-translate)), controlledTranslate && "container" !== s.params.controlBy || (multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate()), controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate()), s.params.controlInverse && (controlledTranslate = c.maxTranslate() - controlledTranslate), c.updateProgress(controlledTranslate), c.setWrapperTranslate(controlledTranslate, !1, s), c.updateActiveIndex()
                            }
                            var multiplier, controlledTranslate, controlled = s.params.control;
                            if (s.isArray(controlled))
                                for (var i = 0; i < controlled.length; i++) controlled[i] !== byController && controlled[i] instanceof Swiper && setControlledTranslate(controlled[i]);
                            else controlled instanceof Swiper && byController !== controlled && setControlledTranslate(controlled)
                        },
                        setTransition: function(duration, byController) {
                            function setControlledTransition(c) {
                                c.setWrapperTransition(duration, s), 0 !== duration && (c.onTransitionStart(), c.wrapper.transitionEnd(function() {
                                    controlled && (c.params.loop && "slide" === s.params.controlBy && c.fixLoop(), c.onTransitionEnd())
                                }))
                            }
                            var i, controlled = s.params.control;
                            if (s.isArray(controlled))
                                for (i = 0; i < controlled.length; i++) controlled[i] !== byController && controlled[i] instanceof Swiper && setControlledTransition(controlled[i]);
                            else controlled instanceof Swiper && byController !== controlled && setControlledTransition(controlled)
                        }
                    }, s.hashnav = {
                        onHashCange: function(e, a) {
                            var newHash = document.location.hash.replace("#", ""),
                                activeSlideHash = s.slides.eq(s.activeIndex).attr("data-hash");
                            newHash !== activeSlideHash && s.slideTo(s.wrapper.children("." + s.params.slideClass + '[data-hash="' + newHash + '"]').index())
                        },
                        attachEvents: function(detach) {
                            var action = detach ? "off" : "on";
                            $(window)[action]("hashchange", s.hashnav.onHashCange)
                        },
                        setHash: function() {
                            if (s.hashnav.initialized && s.params.hashnav)
                                if (s.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + s.slides.eq(s.activeIndex).attr("data-hash") || "");
                                else {
                                    var slide = s.slides.eq(s.activeIndex),
                                        hash = slide.attr("data-hash") || slide.attr("data-history");
                                    document.location.hash = hash || ""
                                }
                        },
                        init: function() {
                            if (s.params.hashnav && !s.params.history) {
                                s.hashnav.initialized = !0;
                                var hash = document.location.hash.replace("#", "");
                                if (hash)
                                    for (var speed = 0, i = 0, length = s.slides.length; i < length; i++) {
                                        var slide = s.slides.eq(i),
                                            slideHash = slide.attr("data-hash") || slide.attr("data-history");
                                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                                            var index = slide.index();
                                            s.slideTo(index, speed, s.params.runCallbacksOnInit, !0)
                                        }
                                    }
                                s.params.hashnavWatchState && s.hashnav.attachEvents()
                            }
                        },
                        destroy: function() {
                            s.params.hashnavWatchState && s.hashnav.attachEvents(!0)
                        }
                    }, s.history = {
                        init: function() {
                            if (s.params.history) {
                                if (!window.history || !window.history.pushState) return s.params.history = !1, void(s.params.hashnav = !0);
                                s.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit), s.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                            }
                        },
                        setHistoryPopState: function() {
                            s.history.paths = s.history.getPathValues(), s.history.scrollToSlide(s.params.speed, s.history.paths.value, !1)
                        },
                        getPathValues: function() {
                            var pathArray = window.location.pathname.slice(1).split("/"),
                                total = pathArray.length,
                                key = pathArray[total - 2],
                                value = pathArray[total - 1];
                            return {
                                key: key,
                                value: value
                            }
                        },
                        setHistory: function(key, index) {
                            if (s.history.initialized && s.params.history) {
                                var slide = s.slides.eq(index),
                                    value = this.slugify(slide.attr("data-history"));
                                window.location.pathname.includes(key) || (value = key + "/" + value), s.params.replaceState ? window.history.replaceState(null, null, value) : window.history.pushState(null, null, value)
                            }
                        },
                        slugify: function(text) {
                            return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                        },
                        scrollToSlide: function(speed, value, runCallbacks) {
                            if (value)
                                for (var i = 0, length = s.slides.length; i < length; i++) {
                                    var slide = s.slides.eq(i),
                                        slideHistory = this.slugify(slide.attr("data-history"));
                                    if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                                        var index = slide.index();
                                        s.slideTo(index, speed, runCallbacks)
                                    }
                                } else s.slideTo(0, speed, runCallbacks)
                        }
                    }, s.disableKeyboardControl = function() {
                        s.params.keyboardControl = !1, $(document).off("keydown", handleKeyboard)
                    }, s.enableKeyboardControl = function() {
                        s.params.keyboardControl = !0, $(document).on("keydown", handleKeyboard)
                    }, s.mousewheel = {
                        event: !1,
                        lastScrollTime: (new window.Date).getTime()
                    }, s.params.mousewheelControl && (s.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : isEventSupported() ? "wheel" : "mousewheel"), s.disableMousewheelControl = function() {
                        if (!s.mousewheel.event) return !1;
                        var target = s.container;
                        return "container" !== s.params.mousewheelEventsTarged && (target = $(s.params.mousewheelEventsTarged)), target.off(s.mousewheel.event, handleMousewheel), !0
                    }, s.enableMousewheelControl = function() {
                        if (!s.mousewheel.event) return !1;
                        var target = s.container;
                        return "container" !== s.params.mousewheelEventsTarged && (target = $(s.params.mousewheelEventsTarged)), target.on(s.mousewheel.event, handleMousewheel), !0
                    }, s.parallax = {
                        setTranslate: function() {
                            s.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                                setParallaxTransform(this, s.progress)
                            }), s.slides.each(function() {
                                var slide = $(this);
                                slide.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                                    var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                                    setParallaxTransform(this, progress)
                                })
                            })
                        },
                        setTransition: function(duration) {
                            "undefined" == typeof duration && (duration = s.params.speed), s.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                                var el = $(this),
                                    parallaxDuration = parseInt(el.attr("data-swiper-parallax-duration"), 10) || duration;
                                0 === duration && (parallaxDuration = 0), el.transition(parallaxDuration)
                            })
                        }
                    }, s.zoom = {
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            slide: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            image: void 0,
                            imageWrap: void 0,
                            zoomMax: s.params.zoomMax
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        },
                        getDistanceBetweenTouches: function(e) {
                            if (e.targetTouches.length < 2) return 1;
                            var x1 = e.targetTouches[0].pageX,
                                y1 = e.targetTouches[0].pageY,
                                x2 = e.targetTouches[1].pageX,
                                y2 = e.targetTouches[1].pageY,
                                distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                            return distance
                        },
                        onGestureStart: function(e) {
                            var z = s.zoom;
                            if (!s.support.gestures) {
                                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                                z.gesture.scaleStart = z.getDistanceBetweenTouches(e)
                            }
                            return z.gesture.slide && z.gesture.slide.length || (z.gesture.slide = $(this), 0 === z.gesture.slide.length && (z.gesture.slide = s.slides.eq(s.activeIndex)), z.gesture.image = z.gesture.slide.find("img, svg, canvas"), z.gesture.imageWrap = z.gesture.image.parent("." + s.params.zoomContainerClass), z.gesture.zoomMax = z.gesture.imageWrap.attr("data-swiper-zoom") || s.params.zoomMax, 0 !== z.gesture.imageWrap.length) ? (z.gesture.image.transition(0), void(z.isScaling = !0)) : void(z.gesture.image = void 0)
                        },
                        onGestureChange: function(e) {
                            var z = s.zoom;
                            if (!s.support.gestures) {
                                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                                z.gesture.scaleMove = z.getDistanceBetweenTouches(e)
                            }
                            z.gesture.image && 0 !== z.gesture.image.length && (s.support.gestures ? z.scale = e.scale * z.currentScale : z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale, z.scale > z.gesture.zoomMax && (z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, .5)), z.scale < s.params.zoomMin && (z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, .5)), z.gesture.image.transform("translate3d(0,0,0) scale(" + z.scale + ")"))
                        },
                        onGestureEnd: function(e) {
                            var z = s.zoom;
                            !s.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || z.gesture.image && 0 !== z.gesture.image.length && (z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin), z.gesture.image.transition(s.params.speed).transform("translate3d(0,0,0) scale(" + z.scale + ")"), z.currentScale = z.scale, z.isScaling = !1, 1 === z.scale && (z.gesture.slide = void 0))
                        },
                        onTouchStart: function(s, e) {
                            var z = s.zoom;
                            z.gesture.image && 0 !== z.gesture.image.length && (z.image.isTouched || ("android" === s.device.os && e.preventDefault(), z.image.isTouched = !0, z.image.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, z.image.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
                        },
                        onTouchMove: function(e) {
                            var z = s.zoom;
                            if (z.gesture.image && 0 !== z.gesture.image.length && (s.allowClick = !1, z.image.isTouched && z.gesture.slide)) {
                                z.image.isMoved || (z.image.width = z.gesture.image[0].offsetWidth, z.image.height = z.gesture.image[0].offsetHeight, z.image.startX = s.getTranslate(z.gesture.imageWrap[0], "x") || 0, z.image.startY = s.getTranslate(z.gesture.imageWrap[0], "y") || 0, z.gesture.slideWidth = z.gesture.slide[0].offsetWidth, z.gesture.slideHeight = z.gesture.slide[0].offsetHeight, z.gesture.imageWrap.transition(0), s.rtl && (z.image.startX = -z.image.startX), s.rtl && (z.image.startY = -z.image.startY));
                                var scaledWidth = z.image.width * z.scale,
                                    scaledHeight = z.image.height * z.scale;
                                if (!(scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight)) {
                                    if (z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0), z.image.maxX = -z.image.minX, z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0), z.image.maxY = -z.image.minY, z.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, z.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !z.image.isMoved && !z.isScaling) {
                                        if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x) return void(z.image.isTouched = !1);
                                        if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y) return void(z.image.isTouched = !1)
                                    }
                                    e.preventDefault(), e.stopPropagation(), z.image.isMoved = !0, z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX, z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY, z.image.currentX < z.image.minX && (z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, .8)), z.image.currentX > z.image.maxX && (z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, .8)), z.image.currentY < z.image.minY && (z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, .8)), z.image.currentY > z.image.maxY && (z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, .8)), z.velocity.prevPositionX || (z.velocity.prevPositionX = z.image.touchesCurrent.x), z.velocity.prevPositionY || (z.velocity.prevPositionY = z.image.touchesCurrent.y), z.velocity.prevTime || (z.velocity.prevTime = Date.now()), z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2, z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2, Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2 && (z.velocity.x = 0), Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2 && (z.velocity.y = 0), z.velocity.prevPositionX = z.image.touchesCurrent.x, z.velocity.prevPositionY = z.image.touchesCurrent.y, z.velocity.prevTime = Date.now(), z.gesture.imageWrap.transform("translate3d(" + z.image.currentX + "px, " + z.image.currentY + "px,0)")
                                }
                            }
                        },
                        onTouchEnd: function(s, e) {
                            var z = s.zoom;
                            if (z.gesture.image && 0 !== z.gesture.image.length) {
                                if (!z.image.isTouched || !z.image.isMoved) return z.image.isTouched = !1, void(z.image.isMoved = !1);
                                z.image.isTouched = !1, z.image.isMoved = !1;
                                var momentumDurationX = 300,
                                    momentumDurationY = 300,
                                    momentumDistanceX = z.velocity.x * momentumDurationX,
                                    newPositionX = z.image.currentX + momentumDistanceX,
                                    momentumDistanceY = z.velocity.y * momentumDurationY,
                                    newPositionY = z.image.currentY + momentumDistanceY;
                                0 !== z.velocity.x && (momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x)), 0 !== z.velocity.y && (momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y));
                                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
                                z.image.currentX = newPositionX, z.image.currentY = newPositionY;
                                var scaledWidth = z.image.width * z.scale,
                                    scaledHeight = z.image.height * z.scale;
                                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0), z.image.maxX = -z.image.minX, z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0), z.image.maxY = -z.image.minY, z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX), z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY), z.gesture.imageWrap.transition(momentumDuration).transform("translate3d(" + z.image.currentX + "px, " + z.image.currentY + "px,0)")
                            }
                        },
                        onTransitionEnd: function(s) {
                            var z = s.zoom;
                            z.gesture.slide && s.previousIndex !== s.activeIndex && (z.gesture.image.transform("translate3d(0,0,0) scale(1)"), z.gesture.imageWrap.transform("translate3d(0,0,0)"), z.gesture.slide = z.gesture.image = z.gesture.imageWrap = void 0, z.scale = z.currentScale = 1)
                        },
                        toggleZoom: function(s, e) {
                            var z = s.zoom;
                            if (z.gesture.slide || (z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex), z.gesture.image = z.gesture.slide.find("img, svg, canvas"), z.gesture.imageWrap = z.gesture.image.parent("." + s.params.zoomContainerClass)), z.gesture.image && 0 !== z.gesture.image.length) {
                                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
                                "undefined" == typeof z.image.touchesStart.x && e ? (touchX = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, touchY = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (touchX = z.image.touchesStart.x, touchY = z.image.touchesStart.y), z.scale && 1 !== z.scale ? (z.scale = z.currentScale = 1, z.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), z.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), z.gesture.slide = void 0) : (z.scale = z.currentScale = z.gesture.imageWrap.attr("data-swiper-zoom") || s.params.zoomMax, e ? (slideWidth = z.gesture.slide[0].offsetWidth, slideHeight = z.gesture.slide[0].offsetHeight, offsetX = z.gesture.slide.offset().left, offsetY = z.gesture.slide.offset().top, diffX = offsetX + slideWidth / 2 - touchX, diffY = offsetY + slideHeight / 2 - touchY, imageWidth = z.gesture.image[0].offsetWidth, imageHeight = z.gesture.image[0].offsetHeight, scaledWidth = imageWidth * z.scale, scaledHeight = imageHeight * z.scale, translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0), translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0), translateMaxX = -translateMinX, translateMaxY = -translateMinY, translateX = diffX * z.scale, translateY = diffY * z.scale, translateX < translateMinX && (translateX = translateMinX), translateX > translateMaxX && (translateX = translateMaxX), translateY < translateMinY && (translateY = translateMinY), translateY > translateMaxY && (translateY = translateMaxY)) : (translateX = 0, translateY = 0), z.gesture.imageWrap.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)"), z.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + z.scale + ")"))
                            }
                        },
                        attachEvents: function(detach) {
                            var action = detach ? "off" : "on";
                            if (s.params.zoom) {
                                var passiveListener = (s.slides, !("touchstart" !== s.touchEvents.start || !s.support.passiveListener || !s.params.passiveListeners) && {
                                    passive: !0,
                                    capture: !1
                                });
                                s.support.gestures ? (s.slides[action]("gesturestart", s.zoom.onGestureStart, passiveListener), s.slides[action]("gesturechange", s.zoom.onGestureChange, passiveListener), s.slides[action]("gestureend", s.zoom.onGestureEnd, passiveListener)) : "touchstart" === s.touchEvents.start && (s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener), s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener), s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener)), s[action]("touchStart", s.zoom.onTouchStart), s.slides.each(function(index, slide) {
                                    $(slide).find("." + s.params.zoomContainerClass).length > 0 && $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove)
                                }), s[action]("touchEnd", s.zoom.onTouchEnd), s[action]("transitionEnd", s.zoom.onTransitionEnd), s.params.zoomToggle && s.on("doubleTap", s.zoom.toggleZoom)
                            }
                        },
                        init: function() {
                            s.zoom.attachEvents()
                        },
                        destroy: function() {
                            s.zoom.attachEvents(!0)
                        }
                    }, s._plugins = [];
                    for (var plugin in s.plugins) {
                        var p = s.plugins[plugin](s, s.params[plugin]);
                        p && s._plugins.push(p)
                    }
                    return s.callPlugins = function(eventName) {
                        for (var i = 0; i < s._plugins.length; i++) eventName in s._plugins[i] && s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                    }, s.emitterEventListeners = {}, s.emit = function(eventName) {
                        s.params[eventName] && s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        var i;
                        if (s.emitterEventListeners[eventName])
                            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        s.callPlugins && s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                    }, s.on = function(eventName, handler) {
                        return eventName = normalizeEventName(eventName), s.emitterEventListeners[eventName] || (s.emitterEventListeners[eventName] = []), s.emitterEventListeners[eventName].push(handler), s
                    }, s.off = function(eventName, handler) {
                        var i;
                        if (eventName = normalizeEventName(eventName), "undefined" == typeof handler) return s.emitterEventListeners[eventName] = [], s;
                        if (s.emitterEventListeners[eventName] && 0 !== s.emitterEventListeners[eventName].length) {
                            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) s.emitterEventListeners[eventName][i] === handler && s.emitterEventListeners[eventName].splice(i, 1);
                            return s
                        }
                    }, s.once = function(eventName, handler) {
                        eventName = normalizeEventName(eventName);
                        var _handler = function() {
                            handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), s.off(eventName, _handler)
                        };
                        return s.on(eventName, _handler), s
                    }, s.a11y = {
                        makeFocusable: function($el) {
                            return $el.attr("tabIndex", "0"), $el
                        },
                        addRole: function($el, role) {
                            return $el.attr("role", role), $el
                        },
                        addLabel: function($el, label) {
                            return $el.attr("aria-label", label), $el
                        },
                        disable: function($el) {
                            return $el.attr("aria-disabled", !0), $el
                        },
                        enable: function($el) {
                            return $el.attr("aria-disabled", !1), $el
                        },
                        onEnterKey: function(event) {
                            13 === event.keyCode && ($(event.target).is(s.params.nextButton) ? (s.onClickNext(event), s.isEnd ? s.a11y.notify(s.params.lastSlideMessage) : s.a11y.notify(s.params.nextSlideMessage)) : $(event.target).is(s.params.prevButton) && (s.onClickPrev(event), s.isBeginning ? s.a11y.notify(s.params.firstSlideMessage) : s.a11y.notify(s.params.prevSlideMessage)), $(event.target).is("." + s.params.bulletClass) && $(event.target)[0].click())
                        },
                        liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                        notify: function(message) {
                            var notification = s.a11y.liveRegion;
                            0 !== notification.length && (notification.html(""), notification.html(message))
                        },
                        init: function() {
                            s.params.nextButton && s.nextButton && s.nextButton.length > 0 && (s.a11y.makeFocusable(s.nextButton), s.a11y.addRole(s.nextButton, "button"), s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage)), s.params.prevButton && s.prevButton && s.prevButton.length > 0 && (s.a11y.makeFocusable(s.prevButton), s.a11y.addRole(s.prevButton, "button"), s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage)), $(s.container).append(s.a11y.liveRegion)
                        },
                        initPagination: function() {
                            s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length && s.bullets.each(function() {
                                var bullet = $(this);
                                s.a11y.makeFocusable(bullet), s.a11y.addRole(bullet, "button"), s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1))
                            })
                        },
                        destroy: function() {
                            s.a11y.liveRegion && s.a11y.liveRegion.length > 0 && s.a11y.liveRegion.remove()
                        }
                    }, s.init = function() {
                        s.params.loop && s.createLoop(), s.updateContainerSize(), s.updateSlidesSize(), s.updatePagination(), s.params.scrollbar && s.scrollbar && (s.scrollbar.set(), s.params.scrollbarDraggable && s.scrollbar.enableDraggable()), "slide" !== s.params.effect && s.effects[s.params.effect] && (s.params.loop || s.updateProgress(), s.effects[s.params.effect].setTranslate()), s.params.loop ? s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit) : (s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit), 0 === s.params.initialSlide && (s.parallax && s.params.parallax && s.parallax.setTranslate(), s.lazy && s.params.lazyLoading && (s.lazy.load(), s.lazy.initialImageLoaded = !0))), s.attachEvents(), s.params.observer && s.support.observer && s.initObservers(), s.params.preloadImages && !s.params.lazyLoading && s.preloadImages(), s.params.zoom && s.zoom && s.zoom.init(), s.params.autoplay && s.startAutoplay(), s.params.keyboardControl && s.enableKeyboardControl && s.enableKeyboardControl(), s.params.mousewheelControl && s.enableMousewheelControl && s.enableMousewheelControl(), s.params.hashnavReplaceState && (s.params.replaceState = s.params.hashnavReplaceState), s.params.history && s.history && s.history.init(), s.params.hashnav && s.hashnav && s.hashnav.init(), s.params.a11y && s.a11y && s.a11y.init(), s.emit("onInit", s)
                    }, s.cleanupStyles = function() {
                        s.container.removeClass(s.classNames.join(" ")).removeAttr("style"), s.wrapper.removeAttr("style"), s.slides && s.slides.length && s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), s.paginationContainer && s.paginationContainer.length && s.paginationContainer.removeClass(s.params.paginationHiddenClass), s.bullets && s.bullets.length && s.bullets.removeClass(s.params.bulletActiveClass), s.params.prevButton && $(s.params.prevButton).removeClass(s.params.buttonDisabledClass), s.params.nextButton && $(s.params.nextButton).removeClass(s.params.buttonDisabledClass), s.params.scrollbar && s.scrollbar && (s.scrollbar.track && s.scrollbar.track.length && s.scrollbar.track.removeAttr("style"), s.scrollbar.drag && s.scrollbar.drag.length && s.scrollbar.drag.removeAttr("style"))
                    }, s.destroy = function(deleteInstance, cleanupStyles) {
                        s.detachEvents(), s.stopAutoplay(), s.params.scrollbar && s.scrollbar && s.params.scrollbarDraggable && s.scrollbar.disableDraggable(), s.params.loop && s.destroyLoop(), cleanupStyles && s.cleanupStyles(), s.disconnectObservers(), s.params.zoom && s.zoom && s.zoom.destroy(), s.params.keyboardControl && s.disableKeyboardControl && s.disableKeyboardControl(), s.params.mousewheelControl && s.disableMousewheelControl && s.disableMousewheelControl(), s.params.a11y && s.a11y && s.a11y.destroy(), s.params.history && !s.params.replaceState && window.removeEventListener("popstate", s.history.setHistoryPopState), s.params.hashnav && s.hashnav && s.hashnav.destroy(), s.emit("onDestroy"), deleteInstance !== !1 && (s = null)
                    }, s.init(), s
                }
            };
            Swiper.prototype = {
                isSafari: function() {
                    var ua = window.navigator.userAgent.toLowerCase();
                    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0
                }(),
                isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
                isArray: function(arr) {
                    return "[object Array]" === Object.prototype.toString.apply(arr)
                },
                browser: {
                    ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                    ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
                    lteIE9: function() {
                        var div = document.createElement("div");
                        return div.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === div.getElementsByTagName("i").length
                    }()
                },
                device: function() {
                    var ua = window.navigator.userAgent,
                        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
                        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
                        iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
                    return {
                        ios: ipad || iphone || ipod,
                        android: android
                    }
                }(),
                support: {
                    touch: window.Modernizr && Modernizr.touch === !0 || function() {
                        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                    }(),
                    transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                        var div = document.createElement("div").style;
                        return "webkitPerspective" in div || "MozPerspective" in div || "OPerspective" in div || "MsPerspective" in div || "perspective" in div
                    }(),
                    flexbox: function() {
                        for (var div = document.createElement("div").style, styles = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < styles.length; i++)
                            if (styles[i] in div) return !0
                    }(),
                    observer: function() {
                        return "MutationObserver" in window || "WebkitMutationObserver" in window
                    }(),
                    passiveListener: function() {
                        var supportsPassive = !1;
                        try {
                            var opts = Object.defineProperty({}, "passive", {
                                get: function() {
                                    supportsPassive = !0
                                }
                            });
                            window.addEventListener("testPassiveListener", null, opts)
                        } catch (e) {}
                        return supportsPassive
                    }(),
                    gestures: function() {
                        return "ongesturestart" in window
                    }()
                },
                plugins: {}
            };
            for (var Dom7 = (function() {
                    var Dom7 = function(arr) {
                            var _this = this,
                                i = 0;
                            for (i = 0; i < arr.length; i++) _this[i] = arr[i];
                            return _this.length = arr.length, this
                        },
                        $ = function(selector, context) {
                            var arr = [],
                                i = 0;
                            if (selector && !context && selector instanceof Dom7) return selector;
                            if (selector)
                                if ("string" == typeof selector) {
                                    var els, tempParent, html = selector.trim();
                                    if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                                        var toCreate = "div";
                                        for (0 === html.indexOf("<li") && (toCreate = "ul"), 0 === html.indexOf("<tr") && (toCreate = "tbody"), 0 !== html.indexOf("<td") && 0 !== html.indexOf("<th") || (toCreate = "tr"), 0 === html.indexOf("<tbody") && (toCreate = "table"), 0 === html.indexOf("<option") && (toCreate = "select"), tempParent = document.createElement(toCreate), tempParent.innerHTML = selector, i = 0; i < tempParent.childNodes.length; i++) arr.push(tempParent.childNodes[i])
                                    } else
                                        for (els = context || "#" !== selector[0] || selector.match(/[ .<>:~]/) ? (context || document).querySelectorAll(selector) : [document.getElementById(selector.split("#")[1])], i = 0; i < els.length; i++) els[i] && arr.push(els[i])
                                } else if (selector.nodeType || selector === window || selector === document) arr.push(selector);
                            else if (selector.length > 0 && selector[0].nodeType)
                                for (i = 0; i < selector.length; i++) arr.push(selector[i]);
                            return new Dom7(arr)
                        };
                    return Dom7.prototype = {
                        addClass: function(className) {
                            if ("undefined" == typeof className) return this;
                            for (var classes = className.split(" "), i = 0; i < classes.length; i++)
                                for (var j = 0; j < this.length; j++) this[j].classList.add(classes[i]);
                            return this
                        },
                        removeClass: function(className) {
                            for (var classes = className.split(" "), i = 0; i < classes.length; i++)
                                for (var j = 0; j < this.length; j++) this[j].classList.remove(classes[i]);
                            return this
                        },
                        hasClass: function(className) {
                            return !!this[0] && this[0].classList.contains(className)
                        },
                        toggleClass: function(className) {
                            for (var classes = className.split(" "), i = 0; i < classes.length; i++)
                                for (var j = 0; j < this.length; j++) this[j].classList.toggle(classes[i]);
                            return this
                        },
                        attr: function(attrs, value) {
                            if (1 === arguments.length && "string" == typeof attrs) return this[0] ? this[0].getAttribute(attrs) : void 0;
                            for (var i = 0; i < this.length; i++)
                                if (2 === arguments.length) this[i].setAttribute(attrs, value);
                                else
                                    for (var attrName in attrs) this[i][attrName] = attrs[attrName], this[i].setAttribute(attrName, attrs[attrName]);
                            return this
                        },
                        removeAttr: function(attr) {
                            for (var i = 0; i < this.length; i++) this[i].removeAttribute(attr);
                            return this
                        },
                        data: function(key, value) {
                            if ("undefined" != typeof value) {
                                for (var i = 0; i < this.length; i++) {
                                    var el = this[i];
                                    el.dom7ElementDataStorage || (el.dom7ElementDataStorage = {}), el.dom7ElementDataStorage[key] = value
                                }
                                return this
                            }
                            if (this[0]) {
                                var dataKey = this[0].getAttribute("data-" + key);
                                return dataKey ? dataKey : this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[key] : void 0
                            }
                        },
                        transform: function(transform) {
                            for (var i = 0; i < this.length; i++) {
                                var elStyle = this[i].style;
                                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
                            }
                            return this
                        },
                        transition: function(duration) {
                            "string" != typeof duration && (duration += "ms");
                            for (var i = 0; i < this.length; i++) {
                                var elStyle = this[i].style;
                                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
                            }
                            return this
                        },
                        on: function(eventName, targetSelector, listener, capture) {
                            function handleLiveEvent(e) {
                                var target = e.target;
                                if ($(target).is(targetSelector)) listener.call(target, e);
                                else
                                    for (var parents = $(target).parents(), k = 0; k < parents.length; k++) $(parents[k]).is(targetSelector) && listener.call(parents[k], e)
                            }
                            var i, j, events = eventName.split(" ");
                            for (i = 0; i < this.length; i++)
                                if ("function" == typeof targetSelector || targetSelector === !1)
                                    for ("function" == typeof targetSelector && (listener = arguments[1], capture = arguments[2] || !1), j = 0; j < events.length; j++) this[i].addEventListener(events[j], listener, capture);
                                else
                                    for (j = 0; j < events.length; j++) this[i].dom7LiveListeners || (this[i].dom7LiveListeners = []), this[i].dom7LiveListeners.push({
                                        listener: listener,
                                        liveListener: handleLiveEvent
                                    }), this[i].addEventListener(events[j], handleLiveEvent, capture);
                            return this
                        },
                        off: function(eventName, targetSelector, listener, capture) {
                            for (var events = eventName.split(" "), i = 0; i < events.length; i++)
                                for (var j = 0; j < this.length; j++)
                                    if ("function" == typeof targetSelector || targetSelector === !1) "function" == typeof targetSelector && (listener = arguments[1], capture = arguments[2] || !1), this[j].removeEventListener(events[i], listener, capture);
                                    else if (this[j].dom7LiveListeners)
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) this[j].dom7LiveListeners[k].listener === listener && this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                            return this
                        },
                        once: function(eventName, targetSelector, listener, capture) {
                            function proxy(e) {
                                listener(e), dom.off(eventName, targetSelector, proxy, capture)
                            }
                            var dom = this;
                            "function" == typeof targetSelector && (targetSelector = !1, listener = arguments[1], capture = arguments[2]), dom.on(eventName, targetSelector, proxy, capture)
                        },
                        trigger: function(eventName, eventData) {
                            for (var i = 0; i < this.length; i++) {
                                var evt;
                                try {
                                    evt = new window.CustomEvent(eventName, {
                                        detail: eventData,
                                        bubbles: !0,
                                        cancelable: !0
                                    })
                                } catch (e) {
                                    evt = document.createEvent("Event"), evt.initEvent(eventName, !0, !0), evt.detail = eventData
                                }
                                this[i].dispatchEvent(evt)
                            }
                            return this
                        },
                        transitionEnd: function(callback) {
                            function fireCallBack(e) {
                                if (e.target === this)
                                    for (callback.call(this, e), i = 0; i < events.length; i++) dom.off(events[i], fireCallBack)
                            }
                            var i, events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                dom = this;
                            if (callback)
                                for (i = 0; i < events.length; i++) dom.on(events[i], fireCallBack);
                            return this
                        },
                        width: function() {
                            return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                        },
                        outerWidth: function(includeMargins) {
                            return this.length > 0 ? includeMargins ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                        },
                        height: function() {
                            return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                        },
                        outerHeight: function(includeMargins) {
                            return this.length > 0 ? includeMargins ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                        },
                        offset: function() {
                            if (this.length > 0) {
                                var el = this[0],
                                    box = el.getBoundingClientRect(),
                                    body = document.body,
                                    clientTop = el.clientTop || body.clientTop || 0,
                                    clientLeft = el.clientLeft || body.clientLeft || 0,
                                    scrollTop = window.pageYOffset || el.scrollTop,
                                    scrollLeft = window.pageXOffset || el.scrollLeft;
                                return {
                                    top: box.top + scrollTop - clientTop,
                                    left: box.left + scrollLeft - clientLeft
                                }
                            }
                            return null
                        },
                        css: function(props, value) {
                            var i;
                            if (1 === arguments.length) {
                                if ("string" != typeof props) {
                                    for (i = 0; i < this.length; i++)
                                        for (var prop in props) this[i].style[prop] = props[prop];
                                    return this
                                }
                                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props)
                            }
                            if (2 === arguments.length && "string" == typeof props) {
                                for (i = 0; i < this.length; i++) this[i].style[props] = value;
                                return this
                            }
                            return this
                        },
                        each: function(callback) {
                            for (var i = 0; i < this.length; i++) callback.call(this[i], i, this[i]);
                            return this
                        },
                        html: function(html) {
                            if ("undefined" == typeof html) return this[0] ? this[0].innerHTML : void 0;
                            for (var i = 0; i < this.length; i++) this[i].innerHTML = html;
                            return this
                        },
                        text: function(text) {
                            if ("undefined" == typeof text) return this[0] ? this[0].textContent.trim() : null;
                            for (var i = 0; i < this.length; i++) this[i].textContent = text;
                            return this
                        },
                        is: function(selector) {
                            if (!this[0]) return !1;
                            var compareWith, i;
                            if ("string" == typeof selector) {
                                var el = this[0];
                                if (el === document) return selector === document;
                                if (el === window) return selector === window;
                                if (el.matches) return el.matches(selector);
                                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                                if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                                for (compareWith = $(selector), i = 0; i < compareWith.length; i++)
                                    if (compareWith[i] === this[0]) return !0;
                                return !1
                            }
                            if (selector === document) return this[0] === document;
                            if (selector === window) return this[0] === window;
                            if (selector.nodeType || selector instanceof Dom7) {
                                for (compareWith = selector.nodeType ? [selector] : selector, i = 0; i < compareWith.length; i++)
                                    if (compareWith[i] === this[0]) return !0;
                                return !1
                            }
                            return !1
                        },
                        index: function() {
                            if (this[0]) {
                                for (var child = this[0], i = 0; null !== (child = child.previousSibling);) 1 === child.nodeType && i++;
                                return i
                            }
                        },
                        eq: function(index) {
                            if ("undefined" == typeof index) return this;
                            var returnIndex, length = this.length;
                            return index > length - 1 ? new Dom7([]) : index < 0 ? (returnIndex = length + index, new Dom7(returnIndex < 0 ? [] : [this[returnIndex]])) : new Dom7([this[index]])
                        },
                        append: function(newChild) {
                            var i, j;
                            for (i = 0; i < this.length; i++)
                                if ("string" == typeof newChild) {
                                    var tempDiv = document.createElement("div");
                                    for (tempDiv.innerHTML = newChild; tempDiv.firstChild;) this[i].appendChild(tempDiv.firstChild)
                                } else if (newChild instanceof Dom7)
                                for (j = 0; j < newChild.length; j++) this[i].appendChild(newChild[j]);
                            else this[i].appendChild(newChild);
                            return this
                        },
                        prepend: function(newChild) {
                            var i, j;
                            for (i = 0; i < this.length; i++)
                                if ("string" == typeof newChild) {
                                    var tempDiv = document.createElement("div");
                                    for (tempDiv.innerHTML = newChild, j = tempDiv.childNodes.length - 1; j >= 0; j--) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0])
                                } else if (newChild instanceof Dom7)
                                for (j = 0; j < newChild.length; j++) this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                            else this[i].insertBefore(newChild, this[i].childNodes[0]);
                            return this
                        },
                        insertBefore: function(selector) {
                            for (var before = $(selector), i = 0; i < this.length; i++)
                                if (1 === before.length) before[0].parentNode.insertBefore(this[i], before[0]);
                                else if (before.length > 1)
                                for (var j = 0; j < before.length; j++) before[j].parentNode.insertBefore(this[i].cloneNode(!0), before[j])
                        },
                        insertAfter: function(selector) {
                            for (var after = $(selector), i = 0; i < this.length; i++)
                                if (1 === after.length) after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                                else if (after.length > 1)
                                for (var j = 0; j < after.length; j++) after[j].parentNode.insertBefore(this[i].cloneNode(!0), after[j].nextSibling)
                        },
                        next: function(selector) {
                            return new Dom7(this.length > 0 ? selector ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                        },
                        nextAll: function(selector) {
                            var nextEls = [],
                                el = this[0];
                            if (!el) return new Dom7([]);
                            for (; el.nextElementSibling;) {
                                var next = el.nextElementSibling;
                                selector ? $(next).is(selector) && nextEls.push(next) : nextEls.push(next), el = next
                            }
                            return new Dom7(nextEls)
                        },
                        prev: function(selector) {
                            return new Dom7(this.length > 0 ? selector ? this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                        },
                        prevAll: function(selector) {
                            var prevEls = [],
                                el = this[0];
                            if (!el) return new Dom7([]);
                            for (; el.previousElementSibling;) {
                                var prev = el.previousElementSibling;
                                selector ? $(prev).is(selector) && prevEls.push(prev) : prevEls.push(prev), el = prev
                            }
                            return new Dom7(prevEls)
                        },
                        parent: function(selector) {
                            for (var parents = [], i = 0; i < this.length; i++) selector ? $(this[i].parentNode).is(selector) && parents.push(this[i].parentNode) : parents.push(this[i].parentNode);
                            return $($.unique(parents))
                        },
                        parents: function(selector) {
                            for (var parents = [], i = 0; i < this.length; i++)
                                for (var parent = this[i].parentNode; parent;) selector ? $(parent).is(selector) && parents.push(parent) : parents.push(parent), parent = parent.parentNode;
                            return $($.unique(parents))
                        },
                        find: function(selector) {
                            for (var foundElements = [], i = 0; i < this.length; i++)
                                for (var found = this[i].querySelectorAll(selector), j = 0; j < found.length; j++) foundElements.push(found[j]);
                            return new Dom7(foundElements)
                        },
                        children: function(selector) {
                            for (var children = [], i = 0; i < this.length; i++)
                                for (var childNodes = this[i].childNodes, j = 0; j < childNodes.length; j++) selector ? 1 === childNodes[j].nodeType && $(childNodes[j]).is(selector) && children.push(childNodes[j]) : 1 === childNodes[j].nodeType && children.push(childNodes[j]);
                            return new Dom7($.unique(children))
                        },
                        remove: function() {
                            for (var i = 0; i < this.length; i++) this[i].parentNode && this[i].parentNode.removeChild(this[i]);
                            return this
                        },
                        add: function() {
                            var i, j, dom = this;
                            for (i = 0; i < arguments.length; i++) {
                                var toAdd = $(arguments[i]);
                                for (j = 0; j < toAdd.length; j++) dom[dom.length] = toAdd[j], dom.length++
                            }
                            return dom
                        }
                    }, $.fn = Dom7.prototype, $.unique = function(arr) {
                        for (var unique = [], i = 0; i < arr.length; i++) unique.indexOf(arr[i]) === -1 && unique.push(arr[i]);
                        return unique
                    }, $
                }()), swiperDomPlugins = ["jQuery", "Zepto", "Dom7"], i = 0; i < swiperDomPlugins.length; i++) window[swiperDomPlugins[i]] && addLibraryPlugin(window[swiperDomPlugins[i]]);
            var domLib;
            domLib = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || __webpack_provided_window_dot_jQuery : Dom7, domLib && ("transitionEnd" in domLib.fn || (domLib.fn.transitionEnd = function(callback) {
                function fireCallBack(e) {
                    if (e.target === this)
                        for (callback.call(this, e), i = 0; i < events.length; i++) dom.off(events[i], fireCallBack)
                }
                var i, events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    dom = this;
                if (callback)
                    for (i = 0; i < events.length; i++) dom.on(events[i], fireCallBack);
                return this
            }), "transform" in domLib.fn || (domLib.fn.transform = function(transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
                }
                return this
            }), "transition" in domLib.fn || (domLib.fn.transition = function(duration) {
                "string" != typeof duration && (duration += "ms");
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
                }
                return this
            }), "outerWidth" in domLib.fn || (domLib.fn.outerWidth = function(includeMargins) {
                return this.length > 0 ? includeMargins ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            })), window.Swiper = Swiper
        }(), module.exports = window.Swiper
    }).call(exports, __webpack_require__(1), __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function(jQuery) {
        ! function(a) {
            var b = new Array,
                c = new Array;
            a.fn.doAutosize = function(b) {
                var c = a(this).data("minwidth"),
                    d = a(this).data("maxwidth"),
                    e = "",
                    f = a(this),
                    g = a("#" + a(this).data("tester_id"));
                if (e !== (e = f.val())) {
                    var h = e.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    g.html(h);
                    var i = g.width(),
                        j = i + b.comfortZone >= c ? i + b.comfortZone : c,
                        k = f.width(),
                        l = k > j && j >= c || j > c && d > j;
                    l && f.width(j)
                }
            }, a.fn.resetAutosize = function(b) {
                var c = a(this).data("minwidth") || b.minInputWidth || a(this).width(),
                    d = a(this).data("maxwidth") || b.maxInputWidth || a(this).closest(".tagsinput").width() - b.inputPadding,
                    e = a(this),
                    f = a("<tester/>").css({
                        position: "absolute",
                        top: -9999,
                        left: -9999,
                        width: "auto",
                        fontSize: e.css("fontSize"),
                        fontFamily: e.css("fontFamily"),
                        fontWeight: e.css("fontWeight"),
                        letterSpacing: e.css("letterSpacing"),
                        whiteSpace: "nowrap"
                    }),
                    g = a(this).attr("id") + "_autosize_tester";
                !a("#" + g).length > 0 && (f.attr("id", g), f.appendTo("body")), e.data("minwidth", c), e.data("maxwidth", d), e.data("tester_id", g), e.css("width", c)
            }, a.fn.addTag = function(d, e) {
                return e = jQuery.extend({
                    focus: !1,
                    callback: !0
                }, e), this.each(function() {
                    var f = a(this).attr("id"),
                        g = a(this).val().split(b[f]);
                    if ("" == g[0] && (g = new Array), d = jQuery.trim(d), e.unique) {
                        var h = a(this).tagExist(d);
                        1 == h && a("#" + f + "_tag").addClass("not_valid")
                    } else var h = !1;
                    if ("" != d && 1 != h) {
                        if (a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"), a("<a>", {
                                href: "#",
                                title: "Removing tag",
                                text: "x"
                            }).click(function() {
                                return a("#" + f).removeTag(escape(d))
                            })).insertBefore("#" + f + "_addTag"), g.push(d), a("#" + f + "_tag").val(""), e.focus ? a("#" + f + "_tag").focus() : a("#" + f + "_tag").blur(), a.fn.tagsInput.updateTagsField(this, g), e.callback && c[f] && c[f].onAddTag) {
                            var i = c[f].onAddTag;
                            i.call(this, d)
                        }
                        if (c[f] && c[f].onChange) {
                            var j = g.length,
                                i = c[f].onChange;
                            i.call(this, a(this), g[j - 1])
                        }
                    }
                }), !1
            }, a.fn.removeTag = function(d) {
                return d = unescape(d), this.each(function() {
                    var e = a(this).attr("id"),
                        f = a(this).val().split(b[e]);
                    for (a("#" + e + "_tagsinput .tag").remove(), str = "", i = 0; i < f.length; i++) f[i] != d && (str = str + b[e] + f[i]);
                    if (a.fn.tagsInput.importTags(this, str), c[e] && c[e].onRemoveTag) {
                        var g = c[e].onRemoveTag;
                        g.call(this, d)
                    }
                }), !1
            }, a.fn.tagExist = function(c) {
                var d = a(this).attr("id"),
                    e = a(this).val().split(b[d]);
                return jQuery.inArray(c, e) >= 0
            }, a.fn.importTags = function(b) {
                var c = a(this).attr("id");
                a("#" + c + "_tagsinput .tag").remove(), a.fn.tagsInput.importTags(this, b)
            }, a.fn.tagsInput = function(e) {
                var f = jQuery.extend({
                        interactive: !0,
                        defaultText: "add a tag",
                        minChars: 0,
                        width: "300px",
                        height: "100px",
                        autocomplete: {
                            selectFirst: !1
                        },
                        hide: !0,
                        delimiter: ",",
                        unique: !0,
                        removeWithBackspace: !0,
                        placeholderColor: "#666666",
                        autosize: !0,
                        comfortZone: 20,
                        inputPadding: 12
                    }, e),
                    g = 0;
                return this.each(function() {
                    if ("undefined" == typeof a(this).attr("data-tagsinput-init")) {
                        a(this).attr("data-tagsinput-init", !0), f.hide && a(this).hide();
                        var e = a(this).attr("id");
                        (!e || b[a(this).attr("id")]) && (e = a(this).attr("id", "tags" + (new Date).getTime() + g++).attr("id"));
                        var h = jQuery.extend({
                            pid: e,
                            real_input: "#" + e,
                            holder: "#" + e + "_tagsinput",
                            input_wrapper: "#" + e + "_addTag",
                            fake_input: "#" + e + "_tag"
                        }, f);
                        b[e] = h.delimiter, (f.onAddTag || f.onRemoveTag || f.onChange) && (c[e] = new Array, c[e].onAddTag = f.onAddTag, c[e].onRemoveTag = f.onRemoveTag, c[e].onChange = f.onChange);
                        var i = '<div id="' + e + '_tagsinput" class="tagsinput"><div id="' + e + '_addTag">';
                        if (f.interactive && (i = i + '<input id="' + e + '_tag" value="" data-default="' + f.defaultText + '" />'), i += '</div><div class="tags_clear"></div></div>', a(i).insertAfter(this), a(h.holder).css("width", f.width), a(h.holder).css("min-height", f.height), a(h.holder).css("height", f.height), "" != a(h.real_input).val() && a.fn.tagsInput.importTags(a(h.real_input), a(h.real_input).val()), f.interactive) {
                            if (a(h.fake_input).val(a(h.fake_input).attr("data-default")), a(h.fake_input).css("color", f.placeholderColor), a(h.fake_input).resetAutosize(f), a(h.holder).bind("click", h, function(b) {
                                    a(b.data.fake_input).focus()
                                }), a(h.fake_input).bind("focus", h, function(b) {
                                    a(b.data.fake_input).val() == a(b.data.fake_input).attr("data-default") && a(b.data.fake_input).val(""), a(b.data.fake_input).css("color", "#000000")
                                }), void 0 != f.autocomplete_url) {
                                autocomplete_options = {
                                    source: f.autocomplete_url
                                };
                                for (attrname in f.autocomplete) autocomplete_options[attrname] = f.autocomplete[attrname];
                                void 0 !== jQuery.Autocompleter ? (a(h.fake_input).autocomplete(f.autocomplete_url, f.autocomplete), a(h.fake_input).bind("result", h, function(b, c, d) {
                                    c && a("#" + e).addTag(c[0] + "", {
                                        focus: !0,
                                        unique: f.unique
                                    })
                                })) : void 0 !== jQuery.ui.autocomplete && (a(h.fake_input).autocomplete(autocomplete_options), a(h.fake_input).bind("autocompleteselect", h, function(b, c) {
                                    return a(b.data.real_input).addTag(c.item.value, {
                                        focus: !0,
                                        unique: f.unique
                                    }), !1
                                }))
                            } else a(h.fake_input).bind("blur", h, function(b) {
                                var c = a(this).attr("data-default");
                                return "" != a(b.data.fake_input).val() && a(b.data.fake_input).val() != c ? b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                                    focus: !0,
                                    unique: f.unique
                                }) : (a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")), a(b.data.fake_input).css("color", f.placeholderColor)), !1
                            });
                            a(h.fake_input).bind("keypress", h, function(b) {
                                return d(b) ? (b.preventDefault(), b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                                    focus: !0,
                                    unique: f.unique
                                }), a(b.data.fake_input).resetAutosize(f), !1) : void(b.data.autosize && a(b.data.fake_input).doAutosize(f))
                            }), h.removeWithBackspace && a(h.fake_input).bind("keydown", function(b) {
                                if (8 == b.keyCode && "" == a(this).val()) {
                                    b.preventDefault();
                                    var c = a(this).closest(".tagsinput").find(".tag:last").text(),
                                        d = a(this).attr("id").replace(/_tag$/, "");
                                    c = c.replace(/[\s]+x$/, ""), a("#" + d).removeTag(escape(c)), a(this).trigger("focus")
                                }
                            }), a(h.fake_input).blur(), h.unique && a(h.fake_input).keydown(function(b) {
                                (8 == b.keyCode || String.fromCharCode(b.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,\/]+/)) && a(this).removeClass("not_valid")
                            })
                        }
                    }
                }), this
            }, a.fn.tagsInput.updateTagsField = function(c, d) {
                var e = a(c).attr("id");
                a(c).val(d.join(b[e]))
            }, a.fn.tagsInput.importTags = function(d, e) {
                a(d).val("");
                var f = a(d).attr("id"),
                    g = e.split(b[f]);
                for (i = 0; i < g.length; i++) a(d).addTag(g[i], {
                    focus: !1,
                    callback: !1
                });
                if (c[f] && c[f].onChange) {
                    var h = c[f].onChange;
                    h.call(d, d, g[i])
                }
            };
            var d = function(b) {
                var c = !1;
                return 13 == b.which || ("string" == typeof b.data.delimiter ? b.which == b.data.delimiter.charCodeAt(0) && (c = !0) : a.each(b.data.delimiter, function(a, d) {
                    b.which == d.charCodeAt(0) && (c = !0)
                }), c)
            }
        }(jQuery)
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function($) {
        "use strict";
        var header = {
            init: function() {
                this.stickyHeader(), this.toggleHeaderAuth()
            },
            stickyHeader: function() {
                var fading = $(".header-backdrop"),
                    fadeStart = 0,
                    fadeUntil = 40;
                $(window).scroll(function() {
                    var $scroll = $(window).scrollTop(),
                        opacity = 0;
                    opacity = $scroll <= fadeStart ? 0 : $scroll <= fadeUntil ? $scroll / fadeUntil : 1, fading.css("opacity", opacity), $(this).scrollTop() > 0 ? ($(".header").addClass("sticky"), $("body").addClass("sticky-header")) : ($(".header").removeClass("sticky"), $("body").removeClass("sticky-header"))
                })
            },
            toggleHeaderAuth: function() {
                $(".btn-mobile-menu").on("click", function(event) {
                    event.preventDefault(), $(this).hasClass("active") ? ($(this).removeClass("active"), $(".header-menu").slideUp(), $(".account-action").slideUp()) : ($(this).addClass("active"), $(".header-menu").slideDown(), $(".account-action").slideDown())
                })
            }
        };
        module.exports = header
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function($) {
        "use strict";
        var codeBlock = $(".code-block-wrapper"),
            code = $("#rodinCode code"),
            BANNER = {
                init: function() {
                    this.initDevicesSlider(), this.mobileMenuToggle()
                },
                initDevicesSlider: function() {
                    var options = {
                        effect: "coverflow",
                        grabCursor: !1,
                        centeredSlides: !0,
                        keyboardControl: !0,
                        slidesPerView: "auto",
                        pagination: "#devicesSlider .swiper-pagination",
                        paginationClickable: !0,
                        bulletClass: "devices-logo",
                        speed: 1200,
                        loop: !0,
                        autoplay: 3500,
                        autoplayDisableOnInteraction: !1,
                        coverflow: {
                            rotate: -5,
                            stretch: 0,
                            depth: 1e3,
                            modifier: 1,
                            slideShadows: !1
                        }
                    };
                    options = $.extend({}, options, {
                        paginationBulletRender: function(swiper, index, className) {
                            var deviceName = $(swiper.slides[index]).data("devicename");
                            return '<span class="icon-' + deviceName + " " + className + '"></span>'
                        },
                        breakpoints: {
                            767: {
                                slidesPerView: "auto",
                                effect: "slide"
                            }
                        },
                        onInit: function(slide) {
                            var devicePath = $(slide.slides[slide.activeIndex]).find(".devices-svg .deviceScreen");
                            BANNER.lastActivePath = devicePath, BANNER.showCodeBlock(codeBlock, devicePath, !0), setTimeout(function() {
                                code.scrollLeft(60), codeBlock.scrollTop(35)
                            }, 10), BANNER.wResize()
                        },
                        onSlideChangeStart: function(slide) {
                            codeBlock.animate({
                                opacity: 1
                            }, 300)
                        },
                        onSlideChangeEnd: function(slide) {
                            var slideItem = $(slide.slides[slide.activeIndex]),
                                deviceName = slideItem.data("devicename"),
                                devicePath = slideItem.find(".devices-svg .deviceScreen");
                            "vive" === deviceName || "daydream" === deviceName || "samsungGear" === deviceName ? codeBlock.addClass("round") : codeBlock.removeClass("round"), BANNER.showCodeBlock(codeBlock, devicePath), BANNER.lastActivePath = devicePath
                        },
                        onSliderMove: function() {
                            $("#plcDevice").remove()
                        },
                        onTouchEnd: function() {
                            setTimeout(function() {
                                $("#plcDevice").remove()
                            }, 10)
                        }
                    }), $(window).width() > 767 && (options.onSlideChangeStart = function(slide) {
                        codeBlock.animate({
                            opacity: 1
                        }, 300);
                        var devices = BANNER.cloneDevice(slide);
                        devices.animate({
                            opacity: 0
                        }, {
                            duration: slide.params.speed - 500,
                            easing: "swing",
                            always: function() {
                                this.remove()
                            }
                        })
                    }), window.a = BANNER.slider = new Swiper("#devicesSlider", options)
                },
                cloneDevice: function(slide) {
                    var device = $(slide.slides[slide.previousIndex]).find(".devices-svg"),
                        plcDevice = device.clone().attr("id", "plcDevice").css({
                            position: "absolute",
                            "z-index": 1030,
                            top: 0,
                            left: device.position().left,
                            width: device.outerWidth(),
                            heith: device.outerHeight()
                        });
                    return $(slide.container).append(plcDevice), plcDevice
                },
                showCodeBlock: function(block, devicePath, init) {
                    var params = {
                        width: devicePath[0].getBoundingClientRect().width - 10,
                        height: devicePath[0].getBoundingClientRect().height - 20,
                        top: devicePath.offset().top + 10,
                        left: devicePath[0].getBoundingClientRect().left + 5
                    };
                      if(codeBlock.length <= 0)
                        codeBlock = $('.code-block-wrapper')
                      if(code.length <= 0)
                         code = $('#rodinCode code');
                    init ? block.css(params) : block.animate(params), codeBlock.css({
                        opacity: 1
                    })
                },
                mobileMenuToggle: function() {
                    $("#HeaderNavber").unbind("shown.bs.collapse hidden.bs.collapse"), $("#HeaderNavber").on("shown.bs.collapse", function() {
                        BANNER.showCodeBlock(codeBlock, BANNER.lastActivePath, !0)
                    }), $("#HeaderNavber").on("hidden.bs.collapse", function() {
                        BANNER.showCodeBlock(codeBlock, BANNER.lastActivePath, !0)
                    })
                },
                wResize: function() {
                    var _this = this;
                    $(window).resize(function() {
                        _this.showCodeBlock(codeBlock, BANNER.lastActivePath, !0)
                    })
                }
            };
        window.a = BANNER, module.exports = BANNER
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function($) {
        "use strict";
        var features = {
            init: function() {
                $(document).on("mouseover", ".features-item", function() {
                    if (!$(this).hasClass("active")) {
                        var slideName = $(this).data("slidename"),
                            slideWrap = $(this).closest(".section-features").find(".features-slide-wrapper");
                        slideWrap.find("img").fadeOut(), $('img[data-name="' + slideName + '"]').fadeIn(), $(".features-item").removeClass("active"), $(this).addClass("active")
                    }
                })
            }
        };
        module.exports = features
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function($) {
        "use strict";
        var videos = {
                createProject: ["http://media.w3.org/2010/05/sintel/poster.png", "./video/createProject.mp4", "./video/createProject.webm"],
                develope: ["http://media.w3.org/2010/05/bunny/poster.png", "./video/develope.mp4", "./video/develope.webm"],
                deploy: ["http://media.w3.org/2010/05/video/poster.png", "./video/deploy.mp4", "./video/deploy.webm"]
            },
            vision = {
                video: function() {
                    return document.getElementById("rodinVision")
                },
                init: function() {
                    this.video() && (vision.playNextVideo(), $(document).on("click", ".video-play-btn", function(e) {
                        e.preventDefault();
                        var videoName = $(this).data("videoname");
                        videoName ? vision.switchVideo(videoName) : vision.playPause()
                    }), $(vision.video()).on("click", vision.playPause))
                },
                switchVideo: function(name) {
                    name || (name = "develope");
                    var mp4 = $("#mp4");
                    if (videos[name][1] === mp4.attr("src")) return void vision.playPause();
                    var webm = $("#webm");
                    mp4.parent();
                    $(vision.video()).attr("poster", videos[name][0]), $(vision.video()).attr("mediaGroup", name), mp4.attr("src", videos[name][1]), webm.attr("src", videos[name][2]), $(vision.video()).width = 0, $(vision.video()).height = 0, $(vision.video()).load(), vision.playPause()
                },
                playPause: function() {
                    var videoWrapper = $(vision.video().parentElement),
                        btn = $('.video-play-btn[data-videoname="' + $(vision.video()).attr("mediaGroup") + '"]');
                    $(".video-play-btn").removeClass("active"), vision.video().paused ? (vision.video().play(), videoWrapper.addClass("play"), btn.addClass("active playing")) : (vision.video().pause(), videoWrapper.removeClass("play"), btn.addClass("active").removeClass("playing"))
                },
                playNextVideo: function() {
                    vision.video().addEventListener("ended", function(e) {
                        var videoName = $(e.target).attr("mediagroup"),
                            currentPlayBtn = $('[data-videoname="' + videoName + '"]'),
                            nextVideoName = currentPlayBtn.next().length ? currentPlayBtn.next().data("videoname") : "createProject";
                        vision.switchVideo(nextVideoName)
                    }, !1)
                }
            };
        module.exports = vision
    }).call(exports, __webpack_require__(1))
}, function(module, exports, __webpack_require__) {
    (function($) {
        "use strict";
        var footer = {
            init: function() {
                this.toggleFooter()
            },
            toggleFooter: function() {
                $(document).on("click", ".btn-footer-expand", function(event) {
                    event.preventDefault();
                    var footer = $(this).closest(".footer");
                    $(this).hasClass("active") ? ($(this).removeClass("active"), footer.removeClass("open")) : ($(this).addClass("active"), footer.addClass("open"))
                })
            }
        };
        module.exports = footer
    }).call(exports, __webpack_require__(1))
}]);