/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function (t, e) {
   true ? module.exports = e() : 0;
}(this, function () {
  "use strict";

  var t = 1e3,
    e = 6e4,
    n = 36e5,
    r = "millisecond",
    i = "second",
    s = "minute",
    u = "hour",
    a = "day",
    o = "week",
    c = "month",
    f = "quarter",
    h = "year",
    d = "date",
    l = "Invalid Date",
    $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    M = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function ordinal(t) {
        var e = ["th", "st", "nd", "rd"],
          n = t % 100;
        return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
      }
    },
    m = function m(t, e, n) {
      var r = String(t);
      return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
    },
    v = {
      s: m,
      z: function z(t) {
        var e = -t.utcOffset(),
          n = Math.abs(e),
          r = Math.floor(n / 60),
          i = n % 60;
        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
      },
      m: function t(e, n) {
        if (e.date() < n.date()) return -t(n, e);
        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
          i = e.clone().add(r, c),
          s = n - i < 0,
          u = e.clone().add(r + (s ? -1 : 1), c);
        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
      },
      a: function a(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
      },
      p: function p(t) {
        return {
          M: c,
          y: h,
          w: o,
          d: a,
          D: d,
          h: u,
          m: s,
          s: i,
          ms: r,
          Q: f
        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
      },
      u: function u(t) {
        return void 0 === t;
      }
    },
    g = "en",
    D = {};
  D[g] = M;
  var p = function p(t) {
      return t instanceof b;
    },
    S = function t(e, n, r) {
      var i;
      if (!e) return g;
      if ("string" == typeof e) {
        var s = e.toLowerCase();
        D[s] && (i = s), n && (D[s] = n, i = s);
        var u = e.split("-");
        if (!i && u.length > 1) return t(u[0]);
      } else {
        var a = e.name;
        D[a] = e, i = a;
      }
      return !r && i && (g = i), i || !r && g;
    },
    w = function w(t, e) {
      if (p(t)) return t.clone();
      var n = "object" == typeof e ? e : {};
      return n.date = t, n.args = arguments, new b(n);
    },
    O = v;
  O.l = S, O.i = p, O.w = function (t, e) {
    return w(t, {
      locale: e.$L,
      utc: e.$u,
      x: e.$x,
      $offset: e.$offset
    });
  };
  var b = function () {
      function M(t) {
        this.$L = S(t.locale, null, !0), this.parse(t);
      }
      var m = M.prototype;
      return m.parse = function (t) {
        this.$d = function (t) {
          var e = t.date,
            n = t.utc;
          if (null === e) return new Date(NaN);
          if (O.u(e)) return new Date();
          if (e instanceof Date) return new Date(e);
          if ("string" == typeof e && !/Z$/i.test(e)) {
            var r = e.match($);
            if (r) {
              var i = r[2] - 1 || 0,
                s = (r[7] || "0").substring(0, 3);
              return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
            }
          }
          return new Date(e);
        }(t), this.$x = t.x || {}, this.init();
      }, m.init = function () {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, m.$utils = function () {
        return O;
      }, m.isValid = function () {
        return !(this.$d.toString() === l);
      }, m.isSame = function (t, e) {
        var n = w(t);
        return this.startOf(e) <= n && n <= this.endOf(e);
      }, m.isAfter = function (t, e) {
        return w(t) < this.startOf(e);
      }, m.isBefore = function (t, e) {
        return this.endOf(e) < w(t);
      }, m.$g = function (t, e, n) {
        return O.u(t) ? this[e] : this.set(n, t);
      }, m.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, m.valueOf = function () {
        return this.$d.getTime();
      }, m.startOf = function (t, e) {
        var n = this,
          r = !!O.u(e) || e,
          f = O.p(t),
          l = function l(t, e) {
            var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
            return r ? i : i.endOf(a);
          },
          $ = function $(t, e) {
            return O.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
          },
          y = this.$W,
          M = this.$M,
          m = this.$D,
          v = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case h:
            return r ? l(1, 0) : l(31, 11);
          case c:
            return r ? l(1, M) : l(0, M + 1);
          case o:
            var g = this.$locale().weekStart || 0,
              D = (y < g ? y + 7 : y) - g;
            return l(r ? m - D : m + (6 - D), M);
          case a:
          case d:
            return $(v + "Hours", 0);
          case u:
            return $(v + "Minutes", 1);
          case s:
            return $(v + "Seconds", 2);
          case i:
            return $(v + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m.endOf = function (t) {
        return this.startOf(t, !1);
      }, m.$set = function (t, e) {
        var n,
          o = O.p(t),
          f = "set" + (this.$u ? "UTC" : ""),
          l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o],
          $ = o === a ? this.$D + (e - this.$W) : e;
        if (o === c || o === h) {
          var y = this.clone().set(d, 1);
          y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
        } else l && this.$d[l]($);
        return this.init(), this;
      }, m.set = function (t, e) {
        return this.clone().$set(t, e);
      }, m.get = function (t) {
        return this[O.p(t)]();
      }, m.add = function (r, f) {
        var d,
          l = this;
        r = Number(r);
        var $ = O.p(f),
          y = function y(t) {
            var e = w(l);
            return O.w(e.date(e.date() + Math.round(t * r)), l);
          };
        if ($ === c) return this.set(c, this.$M + r);
        if ($ === h) return this.set(h, this.$y + r);
        if ($ === a) return y(1);
        if ($ === o) return y(7);
        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1,
          m = this.$d.getTime() + r * M;
        return O.w(m, this);
      }, m.subtract = function (t, e) {
        return this.add(-1 * t, e);
      }, m.format = function (t) {
        var e = this,
          n = this.$locale();
        if (!this.isValid()) return n.invalidDate || l;
        var r = t || "YYYY-MM-DDTHH:mm:ssZ",
          i = O.z(this),
          s = this.$H,
          u = this.$m,
          a = this.$M,
          o = n.weekdays,
          c = n.months,
          f = n.meridiem,
          h = function h(t, n, i, s) {
            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
          },
          d = function d(t) {
            return O.s(s % 12 || 12, t, "0");
          },
          $ = f || function (t, e, n) {
            var r = t < 12 ? "AM" : "PM";
            return n ? r.toLowerCase() : r;
          };
        return r.replace(y, function (t, r) {
          return r || function (t) {
            switch (t) {
              case "YY":
                return String(e.$y).slice(-2);
              case "YYYY":
                return O.s(e.$y, 4, "0");
              case "M":
                return a + 1;
              case "MM":
                return O.s(a + 1, 2, "0");
              case "MMM":
                return h(n.monthsShort, a, c, 3);
              case "MMMM":
                return h(c, a);
              case "D":
                return e.$D;
              case "DD":
                return O.s(e.$D, 2, "0");
              case "d":
                return String(e.$W);
              case "dd":
                return h(n.weekdaysMin, e.$W, o, 2);
              case "ddd":
                return h(n.weekdaysShort, e.$W, o, 3);
              case "dddd":
                return o[e.$W];
              case "H":
                return String(s);
              case "HH":
                return O.s(s, 2, "0");
              case "h":
                return d(1);
              case "hh":
                return d(2);
              case "a":
                return $(s, u, !0);
              case "A":
                return $(s, u, !1);
              case "m":
                return String(u);
              case "mm":
                return O.s(u, 2, "0");
              case "s":
                return String(e.$s);
              case "ss":
                return O.s(e.$s, 2, "0");
              case "SSS":
                return O.s(e.$ms, 3, "0");
              case "Z":
                return i;
            }
            return null;
          }(t) || i.replace(":", "");
        });
      }, m.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m.diff = function (r, d, l) {
        var $,
          y = this,
          M = O.p(d),
          m = w(r),
          v = (m.utcOffset() - this.utcOffset()) * e,
          g = this - m,
          D = function D() {
            return O.m(y, m);
          };
        switch (M) {
          case h:
            $ = D() / 12;
            break;
          case c:
            $ = D();
            break;
          case f:
            $ = D() / 3;
            break;
          case o:
            $ = (g - v) / 6048e5;
            break;
          case a:
            $ = (g - v) / 864e5;
            break;
          case u:
            $ = g / n;
            break;
          case s:
            $ = g / e;
            break;
          case i:
            $ = g / t;
            break;
          default:
            $ = g;
        }
        return l ? $ : O.a($);
      }, m.daysInMonth = function () {
        return this.endOf(c).$D;
      }, m.$locale = function () {
        return D[this.$L];
      }, m.locale = function (t, e) {
        if (!t) return this.$L;
        var n = this.clone(),
          r = S(t, e, !0);
        return r && (n.$L = r), n;
      }, m.clone = function () {
        return O.w(this.$d, this);
      }, m.toDate = function () {
        return new Date(this.valueOf());
      }, m.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, m.toISOString = function () {
        return this.$d.toISOString();
      }, m.toString = function () {
        return this.$d.toUTCString();
      }, M;
    }(),
    _ = b.prototype;
  return w.prototype = _, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t) {
    _[t[1]] = function (e) {
      return this.$g(e, t[0], t[1]);
    };
  }), w.extend = function (t, e) {
    return t.$i || (t(e, b, w), t.$i = !0), w;
  }, w.locale = S, w.isDayjs = p, w.unix = function (t) {
    return w(1e3 * t);
  }, w.en = D[g], w.Ls = D, w.p = {}, w;
});

/***/ }),

/***/ "./src/common/extend.ts":
/*!******************************!*\
  !*** ./src/common/extend.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_StoreItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/StoreItem */ "./src/common/models/StoreItem.ts");
/* harmony import */ var _models_PurchaseHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/PurchaseHistory */ "./src/common/models/PurchaseHistory.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('store-item', _models_StoreItem__WEBPACK_IMPORTED_MODULE_1__["default"]).add('purchase-history', _models_PurchaseHistory__WEBPACK_IMPORTED_MODULE_2__["default"])]);

/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/common/models/PurchaseHistory.ts":
/*!**********************************************!*\
  !*** ./src/common/models/PurchaseHistory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PurchaseHistory)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models
var PurchaseHistory = /*#__PURE__*/function (_Model) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PurchaseHistory, _Model);
  function PurchaseHistory() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.expire_at = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('expire_at');
    _this.user_id = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('user_id');
    _this.item_id = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('item_id');
    _this.valid = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('valid');
    _this.itemData = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('itemData');
    _this.store_item = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('store_item');
    _this.provider = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('provider');
    _this.can_use = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('can_use');
    _this.rest_cnt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('rest_cnt');
    return _this;
  }
  return PurchaseHistory;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/StoreItem.ts":
/*!****************************************!*\
  !*** ./src/common/models/StoreItem.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models
var StoreItem = /*#__PURE__*/function (_Model) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(StoreItem, _Model);
  function StoreItem() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.itemData = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('data');
    _this.type = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("type");
    _this.createdAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('createdAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.desc = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('desc');
    _this.price = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('price');
    _this.provider = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('provider');
    _this.provider_data = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('provider_data');
    _this.unavailable = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('unavailable');
    _this.valid = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('valid');
    _this.rest_cnt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('rest_cnt');
    _this.use_cnt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('use_cnt');
    _this.expire_time = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('expire_time');
    _this.can_use = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('can_use');
    return _this;
  }
  return StoreItem;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/CreateItemModal.tsx":
/*!**************************************************!*\
  !*** ./src/forum/components/CreateItemModal.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateItemModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/setRouteWithForcedRefresh */ "flarum/common/utils/setRouteWithForcedRefresh");
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8__);









var CreateItemModal = /*#__PURE__*/function (_Modal, _onsubmit, _delete2, _getProviderData) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(CreateItemModal, _Modal);
  function CreateItemModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.loading = false;
    _this.selectedProvider = "unknown";
    _this.selectedData = "unknown";
    _this.providers = {
      unknown: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans("xypp-store.forum.create-modal.providers.unknown")
    };
    _this.providerDatas = {
      unknown: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans("xypp-store.forum.create-modal.providers.unknown_data")
    };
    return _this;
  }
  var _proto = CreateItemModal.prototype;
  _proto.className = function className() {
    return 'Modal--small';
  };
  _proto.title = function title() {
    var _this$attrs;
    if ((_this$attrs = this.attrs) != null && _this$attrs.item_id) {
      var _this$attrs2;
      return flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans("xypp-store.forum.create-modal.edit-title", [(_this$attrs2 = this.attrs) == null ? void 0 : _this$attrs2.item_id]);
    }
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.title');
  };
  _proto.onupdate = function onupdate(vnode) {
    this.$("#xypp-store-create-selector-provider_data").val(this.selectedData);
    this.$("#xypp-store-create-selector-provider").val(this.selectedProvider);
  };
  _proto.oncreate = function oncreate(vnode) {
    _Modal.prototype.oncreate.call(this, vnode);
    if (this.attrs.item_id) {
      var data = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().store.getById('store-item', this.attrs.item_id);
      this.$('#xypp-store-create-ipt-name').val(data == null ? void 0 : data.attribute("name"));
      this.$('#xypp-store-create-ipt-desc').val(data == null ? void 0 : data.attribute("desc"));
      this.$('#xypp-store-create-ipt-price').val(data == null ? void 0 : data.attribute("price"));
      this.$('#xypp-store-create-ipt-provider').val(data == null ? void 0 : data.attribute("provider"));
      this.$('#xypp-store-create-ipt-provider_data').val(data == null ? void 0 : data.attribute("provider_data"));
      this.$('#xypp-store-create-ipt-expire_time').val(data == null ? void 0 : data.attribute("expire_time"));
      this.$('#xypp-store-create-ipt-rest_cnt').val(data == null ? void 0 : data.attribute("rest_cnt"));
      this.$('#xypp-store-create-ipt-use_cnt').val(data == null ? void 0 : data.attribute("use_cnt"));
    }
  };
  _proto.content = function content() {
    var that = this;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-name"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.name')), m("input", {
      id: "xypp-store-create-ipt-name",
      required: true,
      className: "FormControl",
      type: "text",
      step: "any"
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-desc"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.desc')), m("textarea", {
      id: "xypp-store-create-ipt-desc",
      required: true,
      className: "FormControl",
      step: "any"
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-price"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.price')), m("input", {
      id: "xypp-store-create-ipt-price",
      required: true,
      className: "FormControl",
      type: "number",
      step: "any"
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-use_cnt"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.use_cnt')), m("input", {
      id: "xypp-store-create-ipt-use_cnt",
      className: "FormControl",
      step: "any"
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-expire_time"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.expire_time')), m("input", {
      id: "xypp-store-create-ipt-expire_time",
      className: "FormControl",
      step: "any"
    }), m("p", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.expire_time_tip'))), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-rest_cnt"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.rest_cnt')), m("input", {
      id: "xypp-store-create-ipt-rest_cnt",
      className: "FormControl",
      step: "any"
    }), m("p", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.rest_cnt_tip'))), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-provider"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.provider')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6___default()), {
      id: "xypp-store-create-selector-provider",
      value: this.selectedProvider,
      options: this.providers,
      onchange: this.changeProvider.bind(this)
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      "for": "xypp-store-create-ipt-provider_data"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.provider_data')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6___default()), {
      id: "xypp-store-create-selector-provider_data",
      value: this.selectedData,
      options: this.providerDatas,
      onchange: this.changeProviderData.bind(this)
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      "class": "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, this.attrs.item_id ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.edit-button') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.button')), this.attrs.item_id ? m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8___default()), {
      loading: this.loading,
      disabled: this.loading,
      onclick: this["delete"].bind(this)
    }, m("i", {
      "class": "fas fa-trash"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.delete-button')) : "")));
  };
  _proto.onsubmit = function onsubmit(_x) {
    return (_onsubmit = _onsubmit || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            if (!(this.selectedData === "unknown" || this.selectedProvider === "unknown" || this.selectedProvider.startsWith("to_select_"))) {
              _context.next = 10;
              break;
            }
            if (!this.attrs.item_id) {
              _context.next = 8;
              break;
            }
            data = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().store.getById('store-item', this.attrs.item_id);
            this.selectedData = data == null ? void 0 : data.attribute("provider_data");
            this.selectedProvider = data == null ? void 0 : data.attribute("provider");
            _context.next = 10;
            break;
          case 8:
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().alerts.show({
              type: 'error'
            }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('xypp-store.forum.create-modal.provider_data_error'));
            return _context.abrupt("return");
          case 10:
            this.loading = true;
            _context.prev = 11;
            _context.next = 14;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().request({
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().forum.attribute('apiUrl') + '/store-item',
              method: 'POST',
              body: {
                attributes: {
                  id: this.attrs.item_id || undefined,
                  name: this.$('#xypp-store-create-ipt-name').val(),
                  desc: this.$('#xypp-store-create-ipt-desc').val(),
                  price: this.$('#xypp-store-create-ipt-price').val(),
                  provider: this.selectedProvider,
                  provider_data: this.selectedData,
                  rest_cnt: this.$('#xypp-store-create-ipt-rest_cnt').val(),
                  expire_time: this.$('#xypp-store-create-ipt-expire_time').val(),
                  use_cnt: this.$('#xypp-store-create-ipt-use_cnt').val()
                }
              }
            });
          case 14:
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().modal.close();
            flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route("storePage"));
            _context.next = 22;
            break;
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](11);
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().alerts.show({
              type: 'error'
            }, _context.t0.toString());
            this.loading = false;
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[11, 18]]);
    }))).apply(this, arguments);
  };
  _proto["delete"] = function _delete() {
    return (_delete2 = _delete2 || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            this.loading = true;
            m.redraw();
            _context2.prev = 2;
            _context2.next = 5;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().request({
              method: 'GET',
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().forum.attribute('apiUrl') + '/store-item/' + this.attrs.item_id + "/delete"
            });
          case 5:
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().modal.close();
            flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route("storePage"));
            _context2.next = 12;
            break;
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            this.loading = false;
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[2, 9]]);
    }))).apply(this, arguments);
  };
  _proto.getProviderData = function getProviderData(_x2) {
    return (_getProviderData = _getProviderData || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3(e) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (e == "unknown") {
              this.providerDatas = {
                unknown: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans("xypp-store.forum.create-modal.providers.unknown_data")
              };
            } else {
              this.selectedData = "to_select_" + e;
              this.providerDatas[this.selectedData] = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans("xypp-store.forum.create-modal.providers.no_select_data");
            }
            m.redraw();
            this.loading = false;
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }))).apply(this, arguments);
  };
  _proto.changeProvider = function changeProvider(e) {
    this.selectedProvider = e;
    if (e == "unknown" || e.startsWith("to_select_")) {
      return;
    }
    this.$('#xypp-store-create-ipt-provider').val(e);
    this.loading = true;
    this.providerDatas = {};
    this.getProviderData(e);
  };
  _proto.changeProviderData = function changeProviderData(e) {
    this.selectedData = e;
    if (e == "unknown" || e.startsWith("to_select_")) {
      return;
    }
    this.$('#xypp-store-create-ipt-provider_data').val(e);
    m.redraw();
  };
  return CreateItemModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/HistoryPage.tsx":
/*!**********************************************!*\
  !*** ./src/forum/components/HistoryPage.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HistoryPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _PurchaseHistoryComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PurchaseHistoryComponent */ "./src/forum/components/PurchaseHistoryComponent.tsx");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");









var HistoryPage = /*#__PURE__*/function (_UserPage, _loadData) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(HistoryPage, _UserPage);
  function HistoryPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _UserPage.call.apply(_UserPage, [this].concat(args)) || this;
    _this.loading = false;
    _this.record = null;
    _this.filters = {};
    _this.currentFilter = "all";
    return _this;
  }
  var _proto = HistoryPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _UserPage.prototype.oninit.call(this, vnode);
    this.loadUser(m.route.param('username'));
    _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_8__["default"].getInstance().getFilterProviderDict(this.filters);
  };
  _proto.show = function show(user) {
    _UserPage.prototype.show.call(this, user);
    this.loadData();
  };
  _proto.content = function content() {
    var _this$record;
    return m("div", {
      className: "store-history-page-container"
    }, m("div", {
      "class": "store-history-page-title"
    }, m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default()), {
      options: this.filters,
      value: this.currentFilter,
      onchange: this.changeFilter.bind(this)
    })), m("div", {
      className: "store-history-page"
    }, this.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default()), {
      display: "block"
    }) : (_this$record = this.record) == null ? void 0 : _this$record.map(function (item, index) {
      return m(_PurchaseHistoryComponent__WEBPACK_IMPORTED_MODULE_6__["default"], {
        item: item
      });
    })));
  };
  _proto.changeFilter = function changeFilter(e) {
    this.currentFilter = e;
    this.record = null;
    this.loadData();
  };
  _proto.loadData = function loadData() {
    return (_loadData = _loadData || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var _this$user, _this$user2;
      var type;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(this.record != null)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if ((_this$user = this.user) != null && _this$user.id()) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return");
          case 4:
            if (!this.loading) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return");
          case 6:
            this.loading = true;
            m.redraw();
            type = undefined;
            if (this.currentFilter != "all") {
              type = this.currentFilter;
            }
            _context.next = 12;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_5___default().store.find("purchase-history", {
              id: (_this$user2 = this.user) == null ? void 0 : _this$user2.id(),
              type: type
            });
          case 12:
            this.record = _context.sent;
            this.loading = false;
            m.redraw();
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }))).apply(this, arguments);
  };
  return HistoryPage;
}((flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/PurchaseHistoryComponent.tsx":
/*!***********************************************************!*\
  !*** ./src/forum/components/PurchaseHistoryComponent.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PurchaseHistoryComponent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/setRouteWithForcedRefresh */ "flarum/common/utils/setRouteWithForcedRefresh");
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/NodeUtil */ "./src/forum/utils/NodeUtil.ts");
/* harmony import */ var _utils_TimeUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/TimeUtils */ "./src/forum/utils/TimeUtils.ts");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_11__);












var PurchaseHistoryComponent = /*#__PURE__*/function (_Component, _use, _delete2) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PurchaseHistoryComponent, _Component);
  function PurchaseHistoryComponent() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.loading = false;
    _this.isConfirm = false;
    return _this;
  }
  var _proto = PurchaseHistoryComponent.prototype;
  _proto.view = function view(vnode) {
    var item = this.attrs.item;
    var storeItem = item.store_item();
    return m("div", {
      className: "store-item" + (item.valid() ? "" : " invalid")
    }, m("h3", null, storeItem.name()), m("div", {
      "class": "store-item-showcase"
    }, m("div", {
      className: "store-item-showcase-tip"
    }, _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().getProviderName(storeItem.provider())), (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(this.loading, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_11___default()), null), _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().createItemShowCase(storeItem, item))), m("div", {
      "class": "store-item-description"
    }, storeItem.desc()), m("div", {
      "class": "store-item-info"
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(!!item.can_use(), m("span", {
      className: ""
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(item.rest_cnt() !== null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.rest_cnt', [item.rest_cnt()]), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.infinit'))), m("span", null)), m("span", null, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(!!item.expire_at(), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.expire', [(0,_utils_TimeUtils__WEBPACK_IMPORTED_MODULE_9__.expireTimeFormat)(item.expire_at())]), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.forever')))), m("span", {
      className: "text-separate store-item-bottom"
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(!!item.can_use() || !!this.attrs.alwaysShowBtn, [m("span", null), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "store-item-button Button Button--primary",
      onclick: this.use.bind(this),
      loading: this.loading,
      disabled: this.loading
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(this.isConfirm, flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.confirm_use'), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.use')))])),
    // 删除按钮（右上角）
    (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_8__.showIf)(!this.attrs.noDelete, m("div", {
      "class": "delete-history",
      onclick: this["delete"].bind(this)
    }, m("i", {
      "class": "fas fa-times",
      "aria-label": flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.delete_button')
    }))));
  };
  _proto.use = function use() {
    return (_use = _use || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (this.isConfirm) {
              _context.next = 4;
              break;
            }
            this.isConfirm = true;
            setTimeout(this.resetConfirm.bind(this), 6000);
            return _context.abrupt("return");
          case 4:
            if (!this.attrs.onUse) {
              _context.next = 7;
              break;
            }
            this.attrs.onUse();
            return _context.abrupt("return");
          case 7:
            this.loading = true;
            m.redraw();
            _context.next = 11;
            return _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().use(this.attrs.item);
          case 11:
            this.loading = false;
            m.redraw();
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().alerts.show((flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_10___default()), {
              type: "success"
            }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.use_result.success'));
            flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().route('user.purchase_history', {
              username: flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().current.data.user.slug()
            }));
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }))).apply(this, arguments);
  };
  _proto["delete"] = function _delete() {
    return (_delete2 = _delete2 || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!confirm(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.confirm_delete'))) {
              _context2.next = 13;
              break;
            }
            this.loading = true;
            _context2.prev = 2;
            _context2.next = 5;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().request({
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().forum.attribute('apiUrl') + '/purchase-history/' + this.attrs.item.id() + '/delete'
            });
          case 5:
            _context2.next = 9;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](2);
          case 9:
            ;
            this.loading = false;
            m.redraw();
            flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().route('user.purchase_history', {
              username: flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().current.data.user.slug()
            }));
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[2, 7]]);
    }))).apply(this, arguments);
  };
  _proto.resetConfirm = function resetConfirm() {
    if (this.isConfirm) {
      this.isConfirm = false;
      m.redraw();
    }
  };
  return PurchaseHistoryComponent;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/QueryModal.tsx":
/*!*********************************************!*\
  !*** ./src/forum/components/QueryModal.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QueryModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_models_StoreItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/models/StoreItem */ "./src/common/models/StoreItem.ts");
/* harmony import */ var _utils_NodeUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/NodeUtil */ "./src/forum/utils/NodeUtil.ts");
/* harmony import */ var _components_StoreItemComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/StoreItemComponent */ "./src/forum/components/StoreItemComponent.tsx");
/* harmony import */ var _components_PurchaseHistoryComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PurchaseHistoryComponent */ "./src/forum/components/PurchaseHistoryComponent.tsx");








var QueryModal = /*#__PURE__*/function (_Modal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QueryModal, _Modal);
  function QueryModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.selected = 0;
    return _this;
  }
  var _proto = QueryModal.prototype;
  _proto.className = function className() {
    return 'Modal--small';
  };
  _proto.title = function title() {
    var _attrs$items;
    var attrs = this.attrs;
    if (!((_attrs$items = attrs.items) != null && _attrs$items.length)) return "";
    if (attrs.items[0] instanceof _common_models_StoreItem__WEBPACK_IMPORTED_MODULE_4__["default"]) return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-store.forum.query-modal.purchase.title');
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-store.forum.query-modal.use.title');
  };
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.selected = 0;
  };
  _proto.content = function content() {
    var _attrs$items2, _attrs$items3;
    var attrs = this.attrs;
    if (!((_attrs$items2 = attrs.items) != null && _attrs$items2.length)) {
      return "";
    }
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "query-body"
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_5__.showIf)(!!attrs.items, attrs.items && (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_5__.showIf)(!!(attrs.items[this.selected] instanceof _common_models_StoreItem__WEBPACK_IMPORTED_MODULE_4__["default"]), m(_components_StoreItemComponent__WEBPACK_IMPORTED_MODULE_6__["default"], {
      noEdit: true,
      onBuy: this.onsubmit.bind(this),
      item: attrs.items[this.selected]
    }), m(_components_PurchaseHistoryComponent__WEBPACK_IMPORTED_MODULE_7__["default"], {
      alwaysShowBtn: true,
      noDelete: true,
      onUse: this.onsubmit.bind(this),
      item: attrs.items[this.selected]
    })))), m("div", {
      className: "query-control"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      "class": "query-control-prev Button Button--primary",
      onclick: this.prev.bind(this)
    }, m("i", {
      "class": "fas fa-chevron-left"
    })), m("span", null, this.selected + 1, "/", (_attrs$items3 = attrs.items) == null ? void 0 : _attrs$items3.length), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      "class": "query-control-after Button Button--primary",
      onclick: this.next.bind(this)
    }, m("i", {
      "class": "fas fa-chevron-right"
    }))));
  };
  _proto.prev = function prev() {
    if (this.selected > 0) {
      this.selected--;
      m.redraw();
    }
  };
  _proto.next = function next() {
    var attrs = this.attrs;
    if (attrs.items && this.selected < attrs.items.length - 1) {
      this.selected++;
      m.redraw();
    }
  };
  _proto.onsubmit = function onsubmit() {
    var attrs = this.attrs;
    if (attrs.on_submit && attrs.items) attrs.on_submit(attrs.items[this.selected]);
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.close();
  };
  _proto.onremove = function onremove() {
    var attrs = this.attrs;
    if (attrs.on_close) attrs.on_close();
  };
  return QueryModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/StoreItemComponent.tsx":
/*!*****************************************************!*\
  !*** ./src/forum/components/StoreItemComponent.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreItemComponent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/setRouteWithForcedRefresh */ "flarum/common/utils/setRouteWithForcedRefresh");
/* harmony import */ var flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_CreateItemModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/CreateItemModal */ "./src/forum/components/CreateItemModal.tsx");
/* harmony import */ var _utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/NodeUtil */ "./src/forum/utils/NodeUtil.ts");
/* harmony import */ var _utils_TimeUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/TimeUtils */ "./src/forum/utils/TimeUtils.ts");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_11__);












var StoreItemComponent = /*#__PURE__*/function (_Component, _buy) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(StoreItemComponent, _Component);
  function StoreItemComponent() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.loading = false;
    _this.isConfirm = false;
    return _this;
  }
  var _proto = StoreItemComponent.prototype;
  _proto.view = function view(vnode) {
    var item = this.attrs.item;
    var tipKey = 'xypp-store.forum.purchase';
    if (item.unavailable()) {
      tipKey = 'xypp-store.forum.unavailable.' + item.unavailable();
    } else if (this.isConfirm) {
      tipKey = 'xypp-store.forum.purchase-confirm';
    }
    return m("div", {
      className: "store-item" + (item.valid() ? "" : " invalid")
    }, m("h3", null, item.name()), m("div", {
      "class": "store-item-showcase"
    }, m("div", {
      className: "store-item-showcase-tip"
    }, _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().getProviderName(item.provider())), _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().createItemShowCase(item)), m("div", {
      "class": "store-item-description"
    }, item.desc()), m("div", {
      "class": "store-item-info"
    }, m("span", {
      className: ""
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(!!(item.rest_cnt() !== null), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.item.rest_cnt', [item.rest_cnt()]), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.infinit'))), m("span", {
      className: ""
    }, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(!!item.can_use(), (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(!!item.use_cnt(), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.item.use_cnt', [item.use_cnt()]), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.infinit')))), m("span", null, (0,_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(!!item.expire_time(), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.item.expire', [(0,_utils_TimeUtils__WEBPACK_IMPORTED_MODULE_10__.effectLengthFormat)(item.expire_time())]), flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.history.forever')))), m("span", {
      className: "text-separate store-item-bottom"
    }, m("span", {
      className: "store-item-price"
    }, m("i", {
      "class": "fas fa-coins"
    }), item.price()), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: item.unavailable() ? 'store-item-button Button' : 'store-item-button Button Button--primary',
      onclick: this.buy.bind(this),
      loading: this.loading,
      disabled: this.loading || item.unavailable()
    }, m("i", {
      "class": "fas fa-cart-plus"
    }), m("span", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans(tipKey)))), this.attrs.noEdit ? '' : m("div", {
      "class": "edit-store-item",
      onclick: this.edit.bind(this)
    }, m("i", {
      "class": "fas fa-edit",
      "aria-label": flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.edit_button')
    })));
  };
  _proto.buy = function buy() {
    return (_buy = _buy || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (this.isConfirm) {
              _context.next = 4;
              break;
            }
            this.isConfirm = true;
            setTimeout(this.resetConfirm.bind(this), 6000);
            return _context.abrupt("return");
          case 4:
            if (!this.attrs.onBuy) {
              _context.next = 7;
              break;
            }
            this.attrs.onBuy();
            return _context.abrupt("return");
          case 7:
            this.loading = true;
            m.redraw();
            _context.prev = 9;
            _context.next = 12;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().request({
              method: 'GET',
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().forum.attribute('apiUrl') + '/store-item/' + this.attrs.item.id() + '/purchase'
            });
          case 12:
            flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().alerts.show((flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_11___default()), {
              type: "success"
            }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('xypp-store.forum.purchase_result.success'));
            flarum_common_utils_setRouteWithForcedRefresh__WEBPACK_IMPORTED_MODULE_7___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().route("storePage"));
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](9);
            console.log(_context.t0);
          case 19:
            _context.prev = 19;
            this.loading = false;
            this.isConfirm = false;
            m.redraw();
            return _context.finish(19);
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[9, 16, 19, 24]]);
    }))).apply(this, arguments);
  };
  _proto.edit = function edit() {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_6___default().modal.show(_components_CreateItemModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
      item_id: this.attrs.item.id()
    });
    m.redraw();
  };
  _proto.resetConfirm = function resetConfirm() {
    if (this.isConfirm) {
      this.isConfirm = false;
      m.redraw();
    }
  };
  return StoreItemComponent;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/StorePage.tsx":
/*!********************************************!*\
  !*** ./src/forum/components/StorePage.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StorePage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_StoreItemComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/StoreItemComponent */ "./src/forum/components/StoreItemComponent.tsx");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _forum_components_CreateItemModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../forum/components/CreateItemModal */ "./src/forum/components/CreateItemModal.tsx");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");













var StorePage = /*#__PURE__*/function (_Page, _reloadItem) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(StorePage, _Page);
  function StorePage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Page.call.apply(_Page, [this].concat(args)) || this;
    _this.loading = false;
    _this.record = [];
    _this.filters = {};
    _this.currentFilter = "all";
    return _this;
  }
  var _proto = StorePage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_12__["default"].getInstance().getFilterProviderDict(this.filters);
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    this.reloadItem();
  };
  _proto.view = function view() {
    return m("div", null, flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.hero(), m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default()(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.sidebarItems().toArray()))), m("div", {
      "class": "StoreListPage"
    }, m("div", {
      "class": "store-list-title"
    }, m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11___default()), {
      options: this.filters,
      value: this.currentFilter,
      onchange: this.changeFilter.bind(this)
    }), !flarum_forum_app__WEBPACK_IMPORTED_MODULE_7___default().session.user.canCreateStoreItem() ? '' : m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_9___default()), {
      "class": "Button Button--primary",
      onclick: this.create.bind(this)
    }, m("i", {
      "class": "fas fa-plus"
    }), m("span", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_7___default().translator.trans('xypp-store.forum.create')))), m("div", {
      "class": "StoreListContainer"
    }, this.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default()), null) : this.record.map(function (item) {
      return m(_components_StoreItemComponent__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: item
      });
    }))))));
  };
  _proto.changeFilter = function changeFilter(e) {
    this.currentFilter = e;
    this.reloadItem();
  };
  _proto.reloadItem = function reloadItem() {
    return (_reloadItem = _reloadItem || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var type;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.loading = true;
            m.redraw();
            type = this.currentFilter;
            if (type == "all") type = undefined;
            _context.next = 6;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_7___default().store.find('store-item', {
              type: type
            });
          case 6:
            this.record = _context.sent;
            this.loading = false;
            m.redraw();
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }))).apply(this, arguments);
  };
  _proto.create = function create() {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_7___default().modal.show(_forum_components_CreateItemModal__WEBPACK_IMPORTED_MODULE_10__["default"]);
  };
  return StorePage;
}((flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/helper/PurchaseHelper.ts":
/*!********************************************!*\
  !*** ./src/forum/helper/PurchaseHelper.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PurchaseHelper: () => (/* binding */ PurchaseHelper)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_QueryModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/QueryModal */ "./src/forum/components/QueryModal.tsx");




var PurchaseHelper = /*#__PURE__*/function (_get, _purchase) {
  function PurchaseHelper(storeItem) {
    this.storeItem = void 0;
    this.storeItem = storeItem;
  }
  PurchaseHelper.get = function get(_x) {
    return (_get = _get || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(provider) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = PurchaseHelper;
            _context.next = 3;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find("store-item", {
              type: provider
            });
          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", new _context.t0(_context.t1));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))).apply(this, arguments);
  };
  var _proto = PurchaseHelper.prototype;
  _proto.filter = function filter(predicate) {
    this.storeItem = this.storeItem.filter(predicate);
    return this;
  };
  _proto.filterWithData = function filterWithData(predicate) {
    this.storeItem = this.storeItem.filter(function (d) {
      return predicate(d.attribute("data"));
    });
    return this;
  };
  _proto.filterAvailable = function filterAvailable() {
    return this.filter(function (d) {
      return d.rest_cnt() > 0;
    });
  };
  _proto.sort = function sort(predicate) {
    this.storeItem.sort(predicate);
    return this;
  };
  _proto.query = function query() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (!_this.storeItem.length) return resolve(_this);
      var items = _this.storeItem;
      _this.storeItem = [];
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_components_QueryModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
        items: items,
        on_submit: function on_submit(selected) {
          _this.storeItem = [selected];
        },
        on_close: function on_close() {
          resolve(_this);
        }
      }, true);
    });
  };
  _proto.hasItem = function hasItem() {
    return this.storeItem.length > 0;
  };
  _proto.purchase = function purchase() {
    return (_purchase = _purchase || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (this.storeItem.length) {
              _context2.next = 2;
              break;
            }
            throw new Error("no_item_to_purchase");
          case 2:
            _context2.next = 4;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
              method: 'GET',
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('apiUrl') + '/store-item/' + this.storeItem[0].id() + '/purchase'
            });
          case 4:
            return _context2.abrupt("return", _context2.sent);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }))).apply(this, arguments);
  };
  return PurchaseHelper;
}();

/***/ }),

/***/ "./src/forum/helper/UseHelper.ts":
/*!***************************************!*\
  !*** ./src/forum/helper/UseHelper.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UseHelper: () => (/* binding */ UseHelper)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");
/* harmony import */ var _components_QueryModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/QueryModal */ "./src/forum/components/QueryModal.tsx");





var UseHelper = /*#__PURE__*/function (_get, _use) {
  function UseHelper(purchaseHistory) {
    this.purchaseHistory = void 0;
    this.purchaseHistory = purchaseHistory;
  }
  UseHelper.get = function get(_x) {
    return (_get = _get || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(provider) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = UseHelper;
            _context.next = 3;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find("purchase-history", {
              type: provider
            });
          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", new _context.t0(_context.t1));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))).apply(this, arguments);
  };
  var _proto = UseHelper.prototype;
  _proto.filter = function filter(predicate) {
    this.purchaseHistory = this.purchaseHistory.filter(predicate);
    return this;
  };
  _proto.filterWithData = function filterWithData(predicate) {
    this.purchaseHistory = this.purchaseHistory.filter(function (d) {
      return predicate(d.attribute("data"));
    });
    return this;
  };
  _proto.filterAvailable = function filterAvailable() {
    return this.filter(function (d) {
      return d.rest_cnt() > 0;
    });
  };
  _proto.expireTimeRev = function expireTimeRev() {
    this.purchaseHistory.sort(function (a, b) {
      if (a.expire_at() === null) {
        if (b.expire_at() === null) return 0;else return 1;
      }
      return new Date(a.expire_at()).getTime() > new Date(b.expire_at()).getTime() ? 1 : -1;
    });
    return this;
  };
  _proto.expireTime = function expireTime() {
    this.purchaseHistory.sort(function (a, b) {
      if (a.expire_at() === null) {
        if (b.expire_at() === null) return 0;else return -1;
      }
      return new Date(a.expire_at()).getTime() > new Date(b.expire_at()).getTime() ? -1 : 1;
    });
    return this;
  };
  _proto.sort = function sort(predicate) {
    this.purchaseHistory.sort(predicate);
    return this;
  };
  _proto.query = function query() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (!_this.purchaseHistory.length) return resolve(_this);
      var items = _this.purchaseHistory;
      _this.purchaseHistory = [];
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_components_QueryModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        items: items,
        on_submit: function on_submit(selected) {
          _this.purchaseHistory = [selected];
        },
        on_close: function on_close() {
          resolve(_this);
        }
      }, true);
    });
  };
  _proto.hasItem = function hasItem() {
    return this.purchaseHistory.length > 0;
  };
  _proto.use = function use(_x2) {
    return (_use = _use || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(data) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (this.purchaseHistory.length) {
              _context2.next = 2;
              break;
            }
            throw new Error("no_item_to_use");
          case 2:
            _context2.next = 4;
            return _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().useWithData(this.purchaseHistory[0], data);
          case 4:
            return _context2.abrupt("return", _context2.sent);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }))).apply(this, arguments);
  };
  return UseHelper;
}();

/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateItemModal: () => (/* reexport safe */ _components_CreateItemModal__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   PurchaseHelper: () => (/* reexport safe */ _helper_PurchaseHelper__WEBPACK_IMPORTED_MODULE_12__.PurchaseHelper),
/* harmony export */   StoreItemUtils: () => (/* reexport safe */ _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   UseHelper: () => (/* reexport safe */ _helper_UseHelper__WEBPACK_IMPORTED_MODULE_13__.UseHelper),
/* harmony export */   addFrontendProviders: () => (/* reexport safe */ _utils_FrontendApplier__WEBPACK_IMPORTED_MODULE_10__.addFrontendProviders)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_StorePage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/StorePage */ "./src/forum/components/StorePage.tsx");
/* harmony import */ var _components_HistoryPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/HistoryPage */ "./src/forum/components/HistoryPage.tsx");
/* harmony import */ var _utils_StoreItemUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/models/User */ "flarum/common/models/User");
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_User__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_CreateItemModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/CreateItemModal */ "./src/forum/components/CreateItemModal.tsx");
/* harmony import */ var _utils_FrontendApplier__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/FrontendApplier */ "./src/forum/utils/FrontendApplier.ts");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _helper_PurchaseHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helper/PurchaseHelper */ "./src/forum/helper/PurchaseHelper.ts");
/* harmony import */ var _helper_UseHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helper/UseHelper */ "./src/forum/helper/UseHelper.ts");














flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('xypp/store', function () {
  //@ts-ignore
  (flarum_common_models_User__WEBPACK_IMPORTED_MODULE_8___default().prototype).canCreateStoreItem = flarum_common_Model__WEBPACK_IMPORTED_MODULE_7___default().attribute('canCreateStoreItem');
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['storePage'] = {
    path: '/store',
    component: _components_StorePage__WEBPACK_IMPORTED_MODULE_4__["default"]
  };
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['user.purchase_history'] = {
    path: '/u/:username/purchase_history',
    component: _components_HistoryPage__WEBPACK_IMPORTED_MODULE_5__["default"]
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'navItems', function (items) {
    items.add('store_page', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default().component({
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('storePage'),
      icon: 'fas fa-store'
    }, [flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('xypp-store.forum.store')]), 10);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_11___default().prototype), 'navItems', function (items) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user) {
      var _this$user;
      items.add('purchase_history', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default().component({
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('user.purchase_history', {
          username: (_this$user = this.user) == null ? void 0 : _this$user.username()
        }),
        icon: 'fas fa-receipt'
      }, [flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('xypp-store.forum.history.title')]), 10);
    }
  });
});


/***/ }),

/***/ "./src/forum/utils/FrontendApplier.ts":
/*!********************************************!*\
  !*** ./src/forum/utils/FrontendApplier.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addFrontendProviders: () => (/* binding */ addFrontendProviders)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_CreateItemModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/CreateItemModal */ "./src/forum/components/CreateItemModal.tsx");
/* harmony import */ var _StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StoreItemUtils */ "./src/forum/utils/StoreItemUtils.tsx");





/**
 * implement provider's frontend part.
 * @param provider provider id
 * @param name provider name(translated)
 * @param getProviderData Function to make select in create modal. Accept an Record<string,string>, which should be filled with `provider_data:describe` after invoke.
 * @param getShowCase Function to create showcase for item box. Return Mithril.VNode/string
 * @param getUseData Function to get data that is filled to use form. Should return SERIALIZED data as string.
 */
function addFrontendProviders(provider, name, getProviderData, getShowCase, getUseData) {
  if (getProviderData) {
    var _ref;
    (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_components_CreateItemModal__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "getProviderData", function (_x, _x2) {
      return (_ref = _ref || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(_originFunc, comingProvider) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(comingProvider === provider)) {
                _context.next = 3;
                break;
              }
              _context.next = 3;
              return getProviderData(this.providerDatas);
            case 3:
              _context.next = 5;
              return _originFunc();
            case 5:
              return _context.abrupt("return", _context.sent);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }))).apply(this, arguments);
    });
  }
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)(_components_CreateItemModal__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "oninit", function () {
    this.providers[provider] = name;
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].prototype, "getFilterProviderDict", function (_originFunc, item) {
    item[provider] = name;
    _originFunc(item);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].prototype, "getProviderName", function (_originFunc, comingProvider) {
    if (provider === comingProvider) {
      return name;
    }
    return _originFunc(comingProvider);
  });
  if (getShowCase) {
    (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].prototype, "createItemShowCase", function (_originFunc, item, purchase_history) {
      if (item.provider() == provider) {
        return getShowCase(item, purchase_history);
      }
      return _originFunc(item, purchase_history);
    });
  }
  if (getUseData) {
    (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_StoreItemUtils__WEBPACK_IMPORTED_MODULE_4__["default"].prototype, "getUseData", function (_originFunc, item) {
      if (item.provider() == provider) {
        return getUseData(item);
      }
      return _originFunc(item);
    });
  }
  console.log("Provider:" + provider + "#" + name + " registered");
}

/***/ }),

/***/ "./src/forum/utils/NodeUtil.ts":
/*!*************************************!*\
  !*** ./src/forum/utils/NodeUtil.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showIf: () => (/* binding */ showIf)
/* harmony export */ });
function showIf(judgement, vnode, def) {
  return judgement ? vnode : def || "";
}

/***/ }),

/***/ "./src/forum/utils/StoreItemUtils.tsx":
/*!********************************************!*\
  !*** ./src/forum/utils/StoreItemUtils.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreItemUtils)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);

var _class;


var StoreItemUtils = /*#__PURE__*/function (_getUseData, _use, _useWithData) {
  function StoreItemUtils() {}
  StoreItemUtils.getInstance = function getInstance() {
    if (!StoreItemUtils.instance) {
      StoreItemUtils.instance = new StoreItemUtils();
    }
    return StoreItemUtils.instance;
  };
  var _proto = StoreItemUtils.prototype;
  _proto.getFilterProviderDict = function getFilterProviderDict(dict) {
    dict['all'] = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-store.forum.provider.all");
  };
  _proto.createItemShowCase = function createItemShowCase(item, purchase_history) {
    return m("div", {
      "class": "showcase-error"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-store.forum.provider.error.title'));
  };
  _proto.getUseData = function getUseData(_x) {
    return (_getUseData = _getUseData || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(item) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", "");
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))).apply(this, arguments);
  };
  _proto.use = function use(_x2) {
    return (_use = _use || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(item) {
      var data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.getUseData(item);
          case 2:
            data = _context2.sent;
            this.useWithData(item, data);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }))).apply(this, arguments);
  };
  _proto.useWithData = function useWithData(_x3, _x4) {
    return (_useWithData = _useWithData || (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(item, data) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
              method: "POST",
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute("apiUrl") + ("/purchase-history/" + item.id() + "/use"),
              body: {
                data: data
              }
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))).apply(this, arguments);
  };
  _proto.getProviderName = function getProviderName(provider) {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-store.forum.provider.error.title");
  };
  return StoreItemUtils;
}();
_class = StoreItemUtils;
StoreItemUtils.instance = void 0;


/***/ }),

/***/ "./src/forum/utils/TimeUtils.ts":
/*!**************************************!*\
  !*** ./src/forum/utils/TimeUtils.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   effectLengthFormat: () => (/* binding */ effectLengthFormat),
/* harmony export */   expireTimeFormat: () => (/* binding */ expireTimeFormat)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);


function expireTimeFormat(expire_at) {
  var d = new Date(expire_at);
  var targ = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(d);
  if (targ.year() != dayjs__WEBPACK_IMPORTED_MODULE_0___default()().year()) {
    return targ.format('YYYY-MM-DD');
  }
  if (targ.diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(), 'day') > 3) {
    return targ.format('MM-DD HH');
  }
  return targ.format('DD HH:mm');
}
function effectLengthFormat(expire_time) {
  var TIMES = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans("xypp-store.forum.time_segs")[0].split("|");
  expire_time = Math.floor(expire_time / 60);
  if (expire_time == 0) {
    return "<" + 1 + TIMES[2];
  }
  var m = expire_time % 60;
  expire_time = Math.floor(expire_time / 60);
  if (expire_time == 0) {
    return m + TIMES[2];
  }
  var h = expire_time % 60;
  var d = Math.floor(expire_time / 60);
  if (d == 0) {
    return h + TIMES[1] + " " + m + TIMES[2];
  } else {
    return d + TIMES[0] + " " + h + TIMES[1] + " " + m + TIMES[2];
  }
}

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Alert":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Alert']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Alert'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/models/User":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/models/User']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/models/User'];

/***/ }),

/***/ "flarum/common/utils/setRouteWithForcedRefresh":
/*!*******************************************************************************!*\
  !*** external "flarum.core.compat['common/utils/setRouteWithForcedRefresh']" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/setRouteWithForcedRefresh'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/IndexPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/IndexPage'];

/***/ }),

/***/ "flarum/forum/components/UserPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserPage']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/UserPage'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateItemModal: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.CreateItemModal),
/* harmony export */   PurchaseHelper: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.PurchaseHelper),
/* harmony export */   StoreItemUtils: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.StoreItemUtils),
/* harmony export */   UseHelper: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.UseHelper),
/* harmony export */   addFrontendProviders: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.addFrontendProviders),
/* harmony export */   extend: () => (/* reexport safe */ _src_common_extend__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");
/* harmony import */ var _src_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/common/extend */ "./src/common/extend.ts");


;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map