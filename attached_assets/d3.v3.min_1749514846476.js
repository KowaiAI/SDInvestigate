d3 = (function () {
  /**
   * Returns the target property of the given object.
   */
  function t(t) {
    return t.target;
  }
  /**
   * Returns the source property of the given object.
   */
  function n(t) {
    return t.source;
  }
  /**
   * Copies properties from one object to another's prototype.
   */
  function e(t, n) {
    try {
      for (var e in n)
        Object.defineProperty(t.prototype, e, { value: n[e], enumerable: !1 });
    } catch (r) {
      t.prototype = n;
    }
  }
  /**
   * Copies an array by iterating through its elements and pushing them to a new array.
   */
  function r(t) {
    for (var n = -1, e = t.length, r = []; e > ++n; ) r.push(t[n]);
    return r;
  }
  /**
   * Converts an array-like object to a true array.
   */
  function u(t) {
    return Array.prototype.slice.call(t);
  }
  /**
   * Function i does nothing.
   */
  function i() {}
  /**
   * Returns the input value as is.
   */
  function a(t) {
    return t;
  }
  /**
   * Returns true.
   */
  function o() {
    return !0;
  }
  /**
   * Returns the input if it's a function, otherwise returns a function that returns the input.
   */
  function c(t) {
    return "function" == typeof t
      ? t
      : function () {
          return t;
        };
  }
  /**
   * Wraps a function and returns a new function that applies context to it.
   */
  function l(t, n, e) {
    return function () {
      var r = e.apply(n, arguments);
      return r === n ? t : r;
    };
  }
  /**
   * Checks if the input is neither null nor NaN.
   */
  function f(t) {
    return null != t && !isNaN(t);
  }
  /**
   * Returns the length of the input string.
   */
  function s(t) {
    return t.length;
  }
  /**
   * Trims and normalizes whitespace in the input string.
   */
  function h(t) {
    return t.trim().replace(/\s+/g, " ");
  }
  /**
   * Multiplies a number by powers of 10 until the product is an integer.
   */
  function g(t) {
    for (var n = 1; (t * n) % 1; ) n *= 10;
    return n;
  }
  /**
   * Returns a function that applies the input function `t` to `null` if `n` is falsy, otherwise returns `e`.
   */
  function p(t) {
    return 1 === t.length
      ? function (n, e) {
          t(null == n ? e : null);
        }
      : t;
  }
  /**
   * Returns the response text from the given object.
   */
  function d(t) {
    return t.responseText;
  }
  /**
   * Parses the response text from a given object to JSON.
   */
  function m(t) {
    return JSON.parse(t.responseText);
  }
  /**
   * Creates a contextual fragment from the response text and selects it.
   */
  function v(t) {
    var n = Li.createRange();
    return n.selectNode(Li.body), n.createContextualFragment(t.responseText);
  }
  /**
   * Returns the responseXML property of the given object.
   */
  function y(t) {
    return t.responseXML;
  }
  /**
   * Function M does nothing.
   */
  function M() {}
  /**
   * Creates a function `n` that manages event listeners and triggers them with provided arguments.
   *
   * The function `b` initializes an empty array `e` to store event handlers and a map-like object `r`.
   * It returns the function `n`, which has an `on` method. The `on` method can either add or remove
   * event listeners based on the number of arguments passed. If two arguments are provided, it adds
   * a listener; if fewer than two, it removes the existing listener.
   *
   * @param {any} t - A value that is returned by both the main function and its `on` method.
   */
  function b(t) {
    /**
     * Calls `on` method on each element of array `r`.
     */
    function n() {
      for (var n, r = e, u = -1, i = r.length; i > ++u; )
        (n = r[u].on) && n.apply(this, arguments);
      return t;
    }
    var e = [],
      r = new i();
    return (
      (n.on = function (n, u) {
        var i,
          a = r.get(n);
        return 2 > arguments.length
          ? a && a.on
          : (a &&
              ((a.on = null),
              (e = e.slice(0, (i = e.indexOf(a))).concat(e.slice(i + 1))),
              r.remove(n)),
            u && e.push(r.set(n, { on: u })),
            t);
      }),
      n
    );
  }
  /**
   * Calculates a value based on the logarithm of t and n.
   */
  function x(t, n) {
    return n - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1);
  }
  /**
   * Converts input to a string.
   */
  function _(t) {
    return t + "";
  }
  /**
   * Creates a scaling function based on the input parameters.
   */
  function w(t, n) {
    var e = Math.pow(10, 3 * Math.abs(8 - n));
    return {
      scale:
        n > 8
          ? function (t) {
              return t / e;
            }
          : function (t) {
              return t * e;
            },
      symbol: t,
    };
  }
  /**
   * Clamps a value between 0 and 1 using a custom function if outside this range.
   */
  function S(t) {
    return function (n) {
      return 0 >= n ? 0 : n >= 1 ? 1 : t(n);
    };
  }
  /**
   * Creates a function that inverts the output of the provided function `t`.
   */
  function k(t) {
    return function (n) {
      return 1 - t(1 - n);
    };
  }
  /**
   * Creates a function that applies a transformation to input values based on a threshold.
   */
  function E(t) {
    return function (n) {
      return 0.5 * (0.5 > n ? t(2 * n) : 2 - t(2 - 2 * n));
    };
  }
  /**
   * Squares the input value.
   */
  function A(t) {
    return t * t;
  }
  /**
   * Cubes the input value.
   */
  function N(t) {
    return t * t * t;
  }
  /**
   * Computes a value based on the input parameter t.
   * The function returns 0 if t is less than or equal to 0,
   * and 1 if t is greater than or equal to 1. For values of t
   * between 0 and 1, it calculates a cubic polynomial expression
   * that smoothly transitions from 0 to 1.
   *
   * @param {number} t - The input parameter, expected to be in the range [0, 1].
   */
  function T(t) {
    if (0 >= t) return 0;
    if (t >= 1) return 1;
    var n = t * t,
      e = n * t;
    return 4 * (0.5 > t ? e : 3 * (t - n) + e - 0.75);
  }
  /**
   * Returns a function that raises a number to the power of `t`.
   */
  function q(t) {
    return function (n) {
      return Math.pow(n, t);
    };
  }
  /**
   * Calculates a value based on the cosine of the input.
   */
  function C(t) {
    return 1 - Math.cos((t * Ti) / 2);
  }
  /**
   * Calculates 2 raised to the power of 10 times (t - 1).
   */
  function z(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  /**
   * Calculates the square root of a modified input value.
   */
  function D(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  /**
   * Generates an easing function based on given parameters.
   */
  function L(t, n) {
    var e;
    return (
      2 > arguments.length && (n = 0.45),
      arguments.length
        ? (e = (n / (2 * Ti)) * Math.asin(1 / t))
        : ((t = 1), (e = n / 4)),
      function (r) {
        return 1 + t * Math.pow(2, 10 * -r) * Math.sin((2 * (r - e) * Ti) / n);
      }
    );
  }
  /**
   * Creates and returns a cubic easing function with a given tension parameter.
   */
  function F(t) {
    return (
      t || (t = 1.70158),
      function (n) {
        return n * n * ((t + 1) * n - t);
      }
    );
  }
  /**
   * Calculates a value based on a series of conditional checks and mathematical operations.
   */
  function H(t) {
    return 1 / 2.75 > t
      ? 7.5625 * t * t
      : 2 / 2.75 > t
        ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        : 2.5 / 2.75 > t
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
  /**
   * Stops event propagation and prevents default action.
   */
  function j() {
    Ci.event.stopPropagation(), Ci.event.preventDefault();
  }
  /**
   * Traces and returns the original source event from a series of nested events.
   */
  function P() {
    for (var t, n = Ci.event; (t = n.sourceEvent); ) n = t;
    return n;
  }
  /**
   * Initializes and returns an event handler object with custom methods.
   */
  function R(t) {
    for (var n = new M(), e = 0, r = arguments.length; r > ++e; )
      n[arguments[e]] = b(n);
    return (
      (n.of = function (e, r) {
        return function (u) {
          try {
            var i = (u.sourceEvent = Ci.event);
            (u.target = t), (Ci.event = u), n[u.type].apply(e, r);
          } finally {
            Ci.event = i;
          }
        };
      }),
      n
    );
  }
  /**
   * Initializes a transformation object based on input parameters.
   *
   * This function calculates various transformation properties such as rotation,
   * translation, scale, and skew. It uses helper functions `U`, `Y`, and `I` to perform
   * intermediate calculations. The function adjusts the sign of certain values based on
   * specific conditions to ensure correct transformations.
   */
  function O(t) {
    var n = [t.a, t.b],
      e = [t.c, t.d],
      r = U(n),
      u = Y(n, e),
      i = U(I(e, n, -u)) || 0;
    n[0] * e[1] < e[0] * n[1] &&
      ((n[0] *= -1), (n[1] *= -1), (r *= -1), (u *= -1)),
      (this.rotate =
        (r ? Math.atan2(n[1], n[0]) : Math.atan2(-e[0], e[1])) * Di),
      (this.translate = [t.e, t.f]),
      (this.scale = [r, i]),
      (this.skew = i ? Math.atan2(u, i) * Di : 0);
  }
  /**
   * Multiplies corresponding elements of two arrays and returns their sum.
   */
  function Y(t, n) {
    return t[0] * n[0] + t[1] * n[1];
  }
  /**
   * Calculates the magnitude of a 2D vector and normalizes it if non-zero.
   */
  function U(t) {
    var n = Math.sqrt(Y(t, t));
    return n && ((t[0] /= n), (t[1] /= n)), n;
  }
  /**
   * Updates a vector by adding a scaled vector to it.
   */
  function I(t, n, e) {
    return (t[0] += e * n[0]), (t[1] += e * n[1]), t;
  }
  /**
   * Returns an interpolation function based on the input type.
   */
  function V(t) {
    return "transform" == t ? Ci.interpolateTransform : Ci.interpolate;
  }
  /**
   * Creates a linear interpolation function based on start and end values.
   */
  function Z(t, n) {
    return (
      (n = n - (t = +t) ? 1 / (n - t) : 0),
      function (e) {
        return (e - t) * n;
      }
    );
  }
  /**
   * Creates a clamped linear interpolation function between two values.
   */
  function X(t, n) {
    return (
      (n = n - (t = +t) ? 1 / (n - t) : 0),
      function (e) {
        return Math.max(0, Math.min(1, (e - t) * n));
      }
    );
  }
  /**
   * Function B does nothing.
   */
  function B() {}
  /**
   * Creates a new instance of J with the provided parameters.
   */
  function $(t, n, e) {
    return new J(t, n, e);
  }
  /**
   * Initializes a new color object with red, green, and blue components.
   */
  function J(t, n, e) {
    (this.r = t), (this.g = n), (this.b = e);
  }
  /**
   * Converts a number to a two-character hexadecimal string.
   */
  function G(t) {
    return 16 > t
      ? "0" + Math.max(0, t).toString(16)
      : Math.min(255, t).toString(16);
  }
  /**
   * Converts a color string to RGB format using provided conversion functions.
   *
   * This function first checks if the input color string matches a known pattern or is a hex code.
   * It then parses the components of the color and converts them to RGB values, which are passed to the appropriate callback function.
   * The function supports HSL, RGB, and Hex color formats.
   *
   * @param t - The color string to convert.
   * @param n - A callback function for converting RGB values.
   * @param e - A callback function for converting HSL values.
   * @returns The result of calling the appropriate callback function with the parsed color components.
   */
  function K(t, n, e) {
    var r,
      u,
      i,
      a = 0,
      o = 0,
      c = 0;
    if ((r = /([a-z]+)\((.*)\)/i.exec(t)))
      switch (((u = r[2].split(",")), r[1])) {
        case "hsl":
          return e(
            parseFloat(u[0]),
            parseFloat(u[1]) / 100,
            parseFloat(u[2]) / 100,
          );
        case "rgb":
          return n(nn(u[0]), nn(u[1]), nn(u[2]));
      }
    return (i = oa.get(t))
      ? n(i.r, i.g, i.b)
      : (null != t &&
          "#" === t.charAt(0) &&
          (4 === t.length
            ? ((a = t.charAt(1)),
              (a += a),
              (o = t.charAt(2)),
              (o += o),
              (c = t.charAt(3)),
              (c += c))
            : 7 === t.length &&
              ((a = t.substring(1, 3)),
              (o = t.substring(3, 5)),
              (c = t.substring(5, 7))),
          (a = parseInt(a, 16)),
          (o = parseInt(o, 16)),
          (c = parseInt(c, 16))),
        n(a, o, c));
  }
  /**
   * Converts RGB color values to HSL representation.
   *
   * This function takes three parameters representing the red, green, and blue components of a color,
   * normalizes them to the range [0, 1], and calculates the corresponding hue, saturation, and lightness.
   * The hue is determined based on which component is the maximum, with adjustments for each case.
   * Saturation is calculated differently depending on whether the lightness is above or below 0.5.
   * If the RGB components are all equal (i.e., grayscale), both hue and saturation are set to 0.
   *
   * @param {number} t - The red component of the color, ranging from 0 to 255.
   * @param {number} n - The green component of the color, ranging from 0 to 255.
   * @param {number} e - The blue component of the color, ranging from 0 to 255.
   */
  function W(t, n, e) {
    var r,
      u,
      i = Math.min((t /= 255), (n /= 255), (e /= 255)),
      a = Math.max(t, n, e),
      o = a - i,
      c = (a + i) / 2;
    return (
      o
        ? ((u = 0.5 > c ? o / (a + i) : o / (2 - a - i)),
          (r =
            t == a
              ? (n - e) / o + (e > n ? 6 : 0)
              : n == a
                ? (e - t) / o + 2
                : (t - n) / o + 4),
          (r *= 60))
        : (u = r = 0),
      en(r, u, c)
    );
  }
  /**
   * Converts RGB values to CIELAB color space coordinates.
   */
  function Q(t, n, e) {
    (t = tn(t)), (n = tn(n)), (e = tn(e));
    var r = pn((0.4124564 * t + 0.3575761 * n + 0.1804375 * e) / sa),
      u = pn((0.2126729 * t + 0.7151522 * n + 0.072175 * e) / ha),
      i = pn((0.0193339 * t + 0.119192 * n + 0.9503041 * e) / ga);
    return ln(116 * u - 16, 500 * (r - u), 200 * (u - i));
  }
  /**
   * Converts a linear RGB value to an sRGB value.
   */
  function tn(t) {
    return 0.04045 >= (t /= 255)
      ? t / 12.92
      : Math.pow((t + 0.055) / 1.055, 2.4);
  }
  /**
   * Converts a percentage string to a decimal or returns the number as is.
   */
  function nn(t) {
    var n = parseFloat(t);
    return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * n) : n;
  }
  /**
   * Creates and returns a new instance of rn with the provided arguments.
   */
  function en(t, n, e) {
    return new rn(t, n, e);
  }
  /**
   * Initializes a new color object with hue, saturation, and lightness values.
   */
  function rn(t, n, e) {
    (this.h = t), (this.s = n), (this.l = e);
  }
  /**
   * Convert an HSL color to RGB format.
   *
   * This function takes in hue, saturation, and lightness values and converts them to red, green, and blue values.
   * The conversion involves multiple conditional checks and calculations based on the hue value.
   *
   * @param t - Hue value (0-360 degrees).
   * @param n - Saturation value (0-1).
   * @param e - Lightness value (0-1).
   * @returns An object containing RGB values.
   */
  function un(t, n, e) {
    /**
     * Adjusts an angle value to a range between 0 and 360 degrees.
     *
     * This function normalizes the input angle by reducing it within one full rotation (0 to 360 degrees).
     * It then maps the normalized angle to a specific color gradient defined by variables `i` and `a`.
     * The logic branches based on the quarter of the circle the angle falls into, adjusting the return value accordingly.
     */
    function r(t) {
      return (
        t > 360 ? (t -= 360) : 0 > t && (t += 360),
        60 > t
          ? i + ((a - i) * t) / 60
          : 180 > t
            ? a
            : 240 > t
              ? i + ((a - i) * (240 - t)) / 60
              : i
      );
    }
    /**
     * Rounds a value to the nearest integer after scaling it by 255.
     */
    function u(t) {
      return Math.round(255 * r(t));
    }
    var i, a;
    return (
      (t %= 360),
      0 > t && (t += 360),
      (n = 0 > n ? 0 : n > 1 ? 1 : n),
      (e = 0 > e ? 0 : e > 1 ? 1 : e),
      (a = 0.5 >= e ? e * (1 + n) : e + n - e * n),
      (i = 2 * e - a),
      $(u(t + 120), u(t), u(t - 120))
    );
  }
  /**
   * Creates and returns a new instance of the class `on`.
   */
  function an(t, n, e) {
    return new on(t, n, e);
  }
  /**
   * Initializes a new object with properties h, c, and l.
   */
  function on(t, n, e) {
    (this.h = t), (this.c = n), (this.l = e);
  }
  /**
   * Calculates a point on a circle given an angle and radius.
   */
  function cn(t, n, e) {
    return ln(e, Math.cos((t *= zi)) * n, Math.sin(t) * n);
  }
  /**
   * Creates and returns a new instance of fn with the provided arguments.
   */
  function ln(t, n, e) {
    return new fn(t, n, e);
  }
  /**
   * Initializes a new object with properties l, a, and b.
   */
  function fn(t, n, e) {
    (this.l = t), (this.a = n), (this.b = e);
  }
  /**
   * Converts color values from a specific space to RGB.
   */
  function sn(t, n, e) {
    var r = (t + 16) / 116,
      u = r + n / 500,
      i = r - e / 200;
    return (
      (u = gn(u) * sa),
      (r = gn(r) * ha),
      (i = gn(i) * ga),
      $(
        dn(3.2404542 * u - 1.5371385 * r - 0.4985314 * i),
        dn(-0.969266 * u + 1.8760108 * r + 0.041556 * i),
        dn(0.0556434 * u - 0.2040259 * r + 1.0572252 * i),
      )
    );
  }
  /**
   * Converts polar coordinates to a specific angle and radius transformation.
   */
  function hn(t, n, e) {
    return an(180 * (Math.atan2(e, n) / Ti), Math.sqrt(n * n + e * e), t);
  }
  /**
   * Applies a transformation to the input value based on its threshold.
   * @param {number} t - The input value.
   */
  function gn(t) {
    return t > 0.206893034 ? t * t * t : (t - 4 / 29) / 7.787037;
  }
  /**
   * Applies a transformation to the input value based on a threshold.
   */
  function pn(t) {
    return t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29;
  }
  /**
   * Converts a linear RGB value to an sRGB value.
   */
  function dn(t) {
    return Math.round(
      255 * (0.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055),
    );
  }
  /**
   * Processes and returns the input object.
   */
  function mn(t) {
    return Vi(t, ba), t;
  }
  /**
   * Returns a function that calls `da` with the provided argument and `this`.
   */
  function vn(t) {
    return function () {
      return da(t, this);
    };
  }
  /**
   * Creates a function that invokes `ma` with the given argument and the context of `this`.
   */
  function yn(t) {
    return function () {
      return ma(t, this);
    };
  }
  /**
   * Determines and returns an attribute modification function based on the input parameters.
   *
   * This function evaluates the provided namespace (`t`) and value (`n`) to determine which
   * method should be used to either set or remove attributes, potentially using namespaces.
   * It handles cases where the value is a static string, null, or a function that returns a value.
   */
  function Mn(t, n) {
    /**
     * Removes an attribute from the current element.
     */
    function e() {
      this.removeAttribute(t);
    }
    /**
     * Removes an attribute with a specified namespace and local name from the element.
     */
    function r() {
      this.removeAttributeNS(t.space, t.local);
    }
    /**
     * Sets an attribute on the current object.
     */
    function u() {
      this.setAttribute(t, n);
    }
    /**
     * Sets an attribute with a namespace and local name.
     */
    function i() {
      this.setAttributeNS(t.space, t.local, n);
    }
    /**
     * Sets or removes an attribute based on the value of `e`.
     */
    function a() {
      var e = n.apply(this, arguments);
      null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
    }
    /**
     * Sets or removes an attribute based on the provided value.
     */
    function o() {
      var e = n.apply(this, arguments);
      null == e
        ? this.removeAttributeNS(t.space, t.local)
        : this.setAttributeNS(t.space, t.local, e);
    }
    return (
      (t = Ci.ns.qualify(t)),
      null == n
        ? t.local
          ? r
          : e
        : "function" == typeof n
          ? t.local
            ? o
            : a
          : t.local
            ? i
            : u
    );
  }
  /**
   * Creates a regular expression to match a word boundary of the given term.
   */
  function bn(t) {
    return RegExp("(?:^|\\s+)" + Ci.requote(t) + "(?:\\s+|$)", "g");
  }
  /**
   * Processes a list of callback functions and a value, applying each function to the value.
   */
  function xn(t, n) {
    /**
     * Iterates over a range and calls a function with specific arguments.
     */
    function e() {
      for (var e = -1; u > ++e; ) t[e](this, n);
    }
    /**
     * Executes a series of functions on the result of `n` applied to the arguments.
     */
    function r() {
      for (var e = -1, r = n.apply(this, arguments); u > ++e; ) t[e](this, r);
    }
    t = t.trim().split(/\s+/).map(_n);
    var u = t.length;
    return "function" == typeof n ? r : e;
  }
  /**
   * Creates and returns a function that toggles a class on an element.
   *
   * This function uses a regular expression to check if the class already exists
   * on the element's className or baseVal property. It adds or removes the class
   * based on the second parameter `r`.
   *
   * @param t - A string representing the class name to toggle.
   * @returns A function that takes an element and a boolean as parameters. The function will add the class if the boolean is true, otherwise it will remove the class.
   */
  function _n(t) {
    var n = bn(t);
    return function (e, r) {
      if ((u = e.classList)) return r ? u.add(t) : u.remove(t);
      var u = e.className,
        i = null != u.baseVal,
        a = i ? u.baseVal : u;
      r
        ? ((n.lastIndex = 0),
          n.test(a) ||
            ((a = h(a + " " + t)), i ? (u.baseVal = a) : (e.className = a)))
        : a &&
          ((a = h(a.replace(n, " "))), i ? (u.baseVal = a) : (e.className = a));
    };
  }
  /**
   * Returns a function to set or remove a CSS property based on input parameters.
   */
  function wn(t, n, e) {
    /**
     * Removes a property from the element's style.
     */
    function r() {
      this.style.removeProperty(t);
    }
    /**
     * Sets a CSS property on the current element.
     */
    function u() {
      this.style.setProperty(t, n, e);
    }
    /**
     * Applies a style property or removes it if the value is null.
     */
    function i() {
      var r = n.apply(this, arguments);
      null == r
        ? this.style.removeProperty(t)
        : this.style.setProperty(t, r, e);
    }
    return null == n ? r : "function" == typeof n ? i : u;
  }
  /**
   * Returns a function to set, delete, or apply a value based on the input parameters.
   */
  function Sn(t, n) {
    /**
     * Deletes a property from the current object using a key stored in `t`.
     */
    function e() {
      delete this[t];
    }
    /**
     * Assigns a value to a property of the current object.
     */
    function r() {
      this[t] = n;
    }
    /**
     * Updates a property in the current context with a value from `n` or deletes it if `n` returns null.
     */
    function u() {
      var e = n.apply(this, arguments);
      null == e ? delete this[t] : (this[t] = e);
    }
    return null == n ? e : "function" == typeof n ? u : r;
  }
  /**
   * Wraps the input data in an object with a `__data__` property.
   */
  function kn(t) {
    return { __data__: t };
  }
  /**
   * Wraps a function call with a given context.
   */
  function En(t) {
    return function () {
      return Ma(this, t);
    };
  }
  /**
   * Creates a comparator function based on the provided sorting order.
   */
  function An(t) {
    return (
      arguments.length || (t = Ci.ascending),
      function (n, e) {
        return !n - !e || t(n.__data__, e.__data__);
      }
    );
  }
  /**
   * Manages event listeners by adding or removing them based on the provided parameters.
   *
   * This function either adds an event listener to an object or removes one, depending on whether a handler is provided.
   * It uses a unique identifier for each event type to track and manage listeners efficiently.
   * If a handler is provided, it sets up the listener with the given context and options.
   * If no handler is provided, it removes any existing listener associated with the event type.
   *
   * @param {string} t - The event type to listen for or remove.
   * @param {Function} n - The event handler function to attach (if present).
   * @param {boolean|AddEventListenerOptions} e - Options for adding the event listener.
   */
  function Nn(t, n, e) {
    /**
     * Removes an event listener and deletes a property from the object.
     */
    function r() {
      var n = this[i];
      n && (this.removeEventListener(t, n, n.$), delete this[i]);
    }
    /**
     * Attaches an event listener to the current object and applies a function with given arguments.
     */
    function u() {
      /**
       * Updates the event context and executes a function with provided arguments.
       */
      function u(t) {
        var e = Ci.event;
        (Ci.event = t), (o[0] = a.__data__);
        try {
          n.apply(a, o);
        } finally {
          Ci.event = e;
        }
      }
      var a = this,
        o = Ui(arguments);
      r.call(this),
        this.addEventListener(t, (this[i] = u), (u.$ = e)),
        (u._ = n);
    }
    var i = "__on" + t,
      a = t.indexOf(".");
    return a > 0 && (t = t.substring(0, a)), n ? u : r;
  }
  /**
   * Iterates over each element in a 2D array and applies a function to non-falsy elements.
   */
  function Tn(t, n) {
    for (var e = 0, r = t.length; r > e; e++)
      for (var u, i = t[e], a = 0, o = i.length; o > a; a++)
        (u = i[a]) && n(u, a, e);
    return t;
  }
  /**
   * Calls function Vi with arguments t and _a, then returns t.
   */
  function qn(t) {
    return Vi(t, _a), t;
  }
  /**
   * Assigns a new ID to an object and validates it.
   */
  function Cn(t, n) {
    return Vi(t, Sa), (t.id = n), t;
  }
  /**
   * Initiates a transition on an element with specified parameters.
   *
   * This function manages transitions by creating and scheduling them based on the provided parameters.
   * It handles tweening, timing, and event dispatching for the transition.
   *
   * @param t - The target element to apply the transition to.
   * @param n - Additional data associated with the target element.
   * @param e - A unique identifier for the transition.
   * @param r - An object containing transition configuration such as time, ease, delay, and duration.
   * @returns The transition object that was created or retrieved.
   */
  function zn(t, n, e, r) {
    var u = t.__transition__ || (t.__transition__ = { active: 0, count: 0 }),
      a = u[e];
    if (!a) {
      var o = r.time;
      return (
        (a = u[e] =
          {
            tween: new i(),
            event: Ci.dispatch("start", "end"),
            time: o,
            ease: r.ease,
            delay: r.delay,
            duration: r.duration,
          }),
        ++u.count,
        Ci.timer(
          function (r) {
            /**
             * Determines whether to proceed with a timer or start an animation sequence based on active state.
             *
             * The function checks if the `active` property of `u` is greater than `e`. If true, it calls `l()`.
             * Otherwise, it sets `u.active` to `e`, starts a timer using `h.start.call(t, f, n)`,
             * processes each tween in `a.tween`, and schedules a new timer if the condition `c(r)` is false.
             *
             * @param {any} r - A parameter passed to the function, used in conditional checks and scheduling.
             */
            function i(r) {
              return u.active > e
                ? l()
                : ((u.active = e),
                  h.start.call(t, f, n),
                  a.tween.forEach(function (e, r) {
                    (r = r.call(t, f, n)) && d.push(r);
                  }),
                  c(r) || Ci.timer(c, 0, o),
                  1);
            }
            /**
             * Evaluates a condition and performs actions based on it.
             *
             * This function checks if `u.active` is not equal to `e`. If true, it calls `l()` and exits.
             * Otherwise, it calculates a value `i` based on the input `r`, `g`, and `p`.
             * It then iterates over an array `d`, calling each function in reverse order with the calculated value `a`.
             * If `i` is greater than or equal to 1, it calls `l()`, invokes `h.end` with parameters `f` and `n`, and returns 1.
             */
            function c(r) {
              if (u.active !== e) return l();
              for (var i = (r - g) / p, a = s(i), o = d.length; o > 0; )
                d[--o].call(t, a);
              return i >= 1 ? (l(), h.end.call(t, f, n), 1) : void 0;
            }
            /**
             * Decrements the count and deletes properties based on conditions.
             */
            function l() {
              return --u.count ? delete u[e] : delete t.__transition__, 1;
            }
            var f = t.__data__,
              s = a.ease,
              h = a.event,
              g = a.delay,
              p = a.duration,
              d = [];
            return r >= g ? i(r) : Ci.timer(i, g, o), 1;
          },
          0,
          o,
        ),
        a
      );
    }
  }
  /**
   * Creates a function to set an element's text content.
   */
  function Dn(t) {
    return (
      null == t && (t = ""),
      function () {
        this.textContent = t;
      }
    );
  }
  /**
   * Updates the tween of a transition for a given property and function/effect.
   */
  function Ln(t, n, e, r) {
    var u = t.id;
    return Tn(
      t,
      "function" == typeof e
        ? function (t, i, a) {
            t.__transition__[u].tween.set(n, r(e.call(t, t.__data__, i, a)));
          }
        : ((e = r(e)),
          function (t) {
            t.__transition__[u].tween.set(n, e);
          }),
    );
  }
  /**
   * Executes a series of scheduled tasks based on their delays and flushes them when due.
   *
   * This function iterates through a linked list of scheduled tasks, checking if each task's delay has elapsed.
   * If a task's delay has passed, it calls the task's callback with the elapsed time. After processing all tasks,
   * it calculates the remaining time until the next execution and either sets a timeout or schedules an immediate re-execution
   * based on whether the remaining time exceeds 24 milliseconds.
   */
  function Fn() {
    for (var t, n = Date.now(), e = Ca; e; )
      (t = n - e.then), t >= e.delay && (e.flush = e.callback(t)), (e = e.next);
    var r = Hn() - n;
    r > 24
      ? (isFinite(r) && (clearTimeout(Na), (Na = setTimeout(Fn, r))), (Aa = 0))
      : ((Aa = 1), za(Fn));
  }
  /**
   * Processes a linked list of tasks and returns the minimum delay before any task is due.
   */
  function Hn() {
    for (var t = null, n = Ca, e = 1 / 0; n; )
      n.flush
        ? (delete qa[n.callback.id],
          (n = t ? (t.next = n.next) : (Ca = n.next)))
        : ((e = Math.min(e, n.then + n.delay)), (n = (t = n).next));
    return e;
  }
  /**
   * Transforms mouse event coordinates to SVG element coordinates.
   *
   * This function calculates the precise location of a mouse event within an SVG element,
   * accounting for scrolling and different browser behaviors. It uses SVGPoint for accurate
   * transformation when available, otherwise falls back to bounding client rectangle calculations.
   *
   * @param {SVGElement} t - The SVG element or its owner SVG element where the event occurred.
   * @param {MouseEvent} n - The mouse event containing screen or client coordinates.
   * @returns {[number, number]} - An array representing the [x, y] coordinates within the SVG element.
   */
  function jn(t, n) {
    var e = t.ownerSVGElement || t;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      if (0 > Da && (Fi.scrollX || Fi.scrollY)) {
        e = Ci.select(Li.body)
          .append("svg")
          .style("position", "absolute")
          .style("top", 0)
          .style("left", 0);
        var u = e[0][0].getScreenCTM();
        (Da = !(u.f || u.e)), e.remove();
      }
      return (
        Da
          ? ((r.x = n.pageX), (r.y = n.pageY))
          : ((r.x = n.clientX), (r.y = n.clientY)),
        (r = r.matrixTransform(t.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    var i = t.getBoundingClientRect();
    return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
  }
  /**
   * Empty function without any implementation.
   */
  function Pn() {}
  /**
   * Returns a sorted array containing the first and last elements of the input array.
   */
  function Rn(t) {
    var n = t[0],
      e = t[t.length - 1];
    return e > n ? [n, e] : [e, n];
  }
  /**
   * Returns the extent of the range if available, otherwise returns the range itself.
   */
  function On(t) {
    return t.rangeExtent ? t.rangeExtent() : Rn(t.range());
  }
  /**
   * Adjusts array elements based on a provided function.
   */
  function Yn(t, n) {
    var e,
      r = 0,
      u = t.length - 1,
      i = t[r],
      a = t[u];
    return (
      i > a && ((e = r), (r = u), (u = e), (e = i), (i = a), (a = e)),
      (n = n(a - i)) && ((t[r] = n.floor(i)), (t[u] = n.ceil(a))),
      t
    );
  }
  /**
   * Returns the Math object.
   */
  function Un() {
    return Math;
  }
  /**
   * Creates a linear interpolation function between two domains and ranges.
   *
   * This function sets up an interpolation mechanism that maps values from one domain to another,
   * using specified parameters for clamping, interpolation method, and rounding. It provides methods
   * to manipulate the domain, range, clamp setting, interpolation type, generate ticks, format tick values,
   * and create a copy of the interpolator.
   *
   * @param {number[]} t - The input domain array.
   * @param {any[]} n - The output range array.
   * @param {Function} e - The interpolation function.
   * @param {boolean} r - The clamp setting, whether to restrict values to the domain's extent.
   */
  function In(t, n, e, r) {
    /**
     * Compares two arrays using a specified comparator and returns a result based on conditions.
     */
    function u() {
      var u = Math.min(t.length, n.length) > 2 ? Gn : Jn,
        c = r ? X : Z;
      return (a = u(t, n, c, e)), (o = u(n, t, c, Ci.interpolate)), i;
    }
    /**
     * Calls function a with the provided argument t.
     */
    function i(t) {
      return a(t);
    }
    var a, o;
    return (
      (i.invert = function (t) {
        return o(t);
      }),
      (i.domain = function (n) {
        return arguments.length ? ((t = n.map(Number)), u()) : t;
      }),
      (i.range = function (t) {
        return arguments.length ? ((n = t), u()) : n;
      }),
      (i.rangeRound = function (t) {
        return i.range(t).interpolate(Ci.interpolateRound);
      }),
      (i.clamp = function (t) {
        return arguments.length ? ((r = t), u()) : r;
      }),
      (i.interpolate = function (t) {
        return arguments.length ? ((e = t), u()) : e;
      }),
      (i.ticks = function (n) {
        return Bn(t, n);
      }),
      (i.tickFormat = function (n) {
        return $n(t, n);
      }),
      (i.nice = function () {
        return Yn(t, Zn), u();
      }),
      (i.copy = function () {
        return In(t, n, e, r);
      }),
      u()
    );
  }
  /**
   * Binds specified methods from one object to another.
   */
  function Vn(t, n) {
    return Ci.rebind(t, n, "range", "rangeRound", "interpolate", "clamp");
  }
  /**
   * Rounds a number down to the nearest power of ten and provides floor and ceil functions.
   */
  function Zn(t) {
    return (
      (t = Math.pow(10, Math.round(Math.log(t) / Math.LN10) - 1)),
      t && {
        floor: function (n) {
          return Math.floor(n / t) * t;
        },
        ceil: function (n) {
          return Math.ceil(n / t) * t;
        },
      }
    );
  }
  /**
   * Adjusts the range and step of a given array based on input parameters.
   */
  function Xn(t, n) {
    var e = Rn(t),
      r = e[1] - e[0],
      u = Math.pow(10, Math.floor(Math.log(r / n) / Math.LN10)),
      i = (n / r) * u;
    return (
      0.15 >= i ? (u *= 10) : 0.35 >= i ? (u *= 5) : 0.75 >= i && (u *= 2),
      (e[0] = Math.ceil(e[0] / u) * u),
      (e[1] = Math.floor(e[1] / u) * u + 0.5 * u),
      (e[2] = u),
      e
    );
  }
  /**
   * Applies a range operation using provided arguments.
   */
  function Bn(t, n) {
    return Ci.range.apply(Ci, Xn(t, n));
  }
  /**
   * Formats a number based on its value and precision.
   */
  function $n(t, n) {
    return Ci.format(
      ",." +
        Math.max(0, -Math.floor(Math.log(Xn(t, n)[2]) / Math.LN10 + 0.01)) +
        "f",
    );
  }
  /**
   * Composes two functions and returns a new function that applies them in sequence.
   */
  function Jn(t, n, e, r) {
    var u = e(t[0], t[1]),
      i = r(n[0], n[1]);
    return function (t) {
      return i(u(t));
    };
  }
  /**
   * Generates a function that interpolates values between two arrays based on a given input.
   */
  function Gn(t, n, e, r) {
    var u = [],
      i = [],
      a = 0,
      o = Math.min(t.length, n.length) - 1;
    for (
      t[o] < t[0] && ((t = t.slice().reverse()), (n = n.slice().reverse()));
      o >= ++a;

    )
      u.push(e(t[a - 1], t[a])), i.push(r(n[a - 1], n[a]));
    return function (n) {
      var e = Ci.bisect(t, n, 1, o) - 1;
      return i[e](u[e](n));
    };
  }
  /**
   * Creates a transformed scale function based on the provided base scale and transformation functions.
   *
   * This function `Kn` takes two parameters: `t` (a base scale function) and `n` (a transformation object).
   * It returns a new scale function that applies the transformation `n.pow` to the input and output of the base scale `t`.
   * The returned scale function includes additional methods like `invert`, `domain`, `nice`, `ticks`, `tickFormat`, and `copy`,
   * which are modified to work with the transformed values.
   *
   * @param t - A base scale function that defines the domain and range mapping.
   * @param n - A transformation object with methods `pow`, `ceil`, and `floor` for mathematical operations.
   * @returns A new scale function with transformations applied to its input and output.
   */
  function Kn(t, n) {
    /**
     * Processes input through a series of functions and returns the result.
     */
    function e(e) {
      return t(n(e));
    }
    var r = n.pow;
    return (
      (e.invert = function (n) {
        return r(t.invert(n));
      }),
      (e.domain = function (u) {
        return arguments.length
          ? ((n = 0 > u[0] ? Qn : Wn), (r = n.pow), t.domain(u.map(n)), e)
          : t.domain().map(r);
      }),
      (e.nice = function () {
        return t.domain(Yn(t.domain(), Un)), e;
      }),
      (e.ticks = function () {
        var e = Rn(t.domain()),
          u = [];
        if (e.every(isFinite)) {
          var i = Math.floor(e[0]),
            a = Math.ceil(e[1]),
            o = r(e[0]),
            c = r(e[1]);
          if (n === Qn)
            for (u.push(r(i)); a > i++; )
              for (var l = 9; l > 0; l--) u.push(r(i) * l);
          else {
            for (; a > i; i++) for (var l = 1; 10 > l; l++) u.push(r(i) * l);
            u.push(r(i));
          }
          for (i = 0; o > u[i]; i++);
          for (a = u.length; u[a - 1] > c; a--);
          u = u.slice(i, a);
        }
        return u;
      }),
      (e.tickFormat = function (t, u) {
        if ((2 > arguments.length && (u = La), !arguments.length)) return u;
        var i,
          a = Math.max(0.1, t / e.ticks().length),
          o = n === Qn ? ((i = -1e-12), Math.floor) : ((i = 1e-12), Math.ceil);
        return function (t) {
          return a >= t / r(o(n(t) + i)) ? u(t) : "";
        };
      }),
      (e.copy = function () {
        return Kn(t.copy(), n);
      }),
      Vn(e, t)
    );
  }
  /**
   * Calculates the logarithm base 10 of a non-negative number.
   */
  function Wn(t) {
    return Math.log(0 > t ? 0 : t) / Math.LN10;
  }
  /**
   * Computes the negative logarithm base 10 of the absolute value of t.
   */
  function Qn(t) {
    return -Math.log(t > 0 ? 0 : -t) / Math.LN10;
  }
  /**
   * Creates a transformed scale with an exponent applied to its domain and range.
   */
  function te(t, n) {
    /**
     * Processes input through two functions and returns the result.
     */
    function e(n) {
      return t(r(n));
    }
    var r = ne(n),
      u = ne(1 / n);
    return (
      (e.invert = function (n) {
        return u(t.invert(n));
      }),
      (e.domain = function (n) {
        return arguments.length ? (t.domain(n.map(r)), e) : t.domain().map(u);
      }),
      (e.ticks = function (t) {
        return Bn(e.domain(), t);
      }),
      (e.tickFormat = function (t) {
        return $n(e.domain(), t);
      }),
      (e.nice = function () {
        return e.domain(Yn(e.domain(), Zn));
      }),
      (e.exponent = function (t) {
        if (!arguments.length) return n;
        var i = e.domain();
        return (r = ne((n = t))), (u = ne(1 / n)), e.domain(i);
      }),
      (e.copy = function () {
        return te(t.copy(), n);
      }),
      Vn(e, t)
    );
  }
  /**
   * Returns a function that raises a number to the power of `t`.
   */
  function ne(t) {
    return function (n) {
      return 0 > n ? -Math.pow(-n, t) : Math.pow(n, t);
    };
  }
  /**
   * Creates a scale function that maps a domain to a range with various modes and options.
   *
   * This function initializes an empty array `t` for the domain values and a map-like object `u` to track unique domain entries.
   * It defines several methods to set the domain, calculate ranges in different modes (points, bands), and retrieve properties like band width and extent.
   * The function supports chaining by returning itself after setting properties or methods.
   *
   * @param {Array} t - Initial array of domain values.
   * @param {Object} n - Configuration object for the scale function.
   * @returns {Function} The configured scale function with various methods to manipulate its range and properties.
   */
  function ee(t, n) {
    /**
     * Retrieves an element from array `a` based on a computed index related to input `n`.
     */
    function e(n) {
      return a[((u.get(n) || u.set(n, t.push(n))) - 1) % a.length];
    }
    /**
     * Maps a range of numbers based on the given parameters.
     */
    function r(n, e) {
      return Ci.range(t.length).map(function (t) {
        return n + e * t;
      });
    }
    var u, a, o;
    return (
      (e.domain = function (r) {
        if (!arguments.length) return t;
        (t = []), (u = new i());
        for (var a, o = -1, c = r.length; c > ++o; )
          u.has((a = r[o])) || u.set(a, t.push(a));
        return e[n.t].apply(e, n.a);
      }),
      (e.range = function (t) {
        return arguments.length
          ? ((a = t), (o = 0), (n = { t: "range", a: arguments }), e)
          : a;
      }),
      (e.rangePoints = function (u, i) {
        2 > arguments.length && (i = 0);
        var c = u[0],
          l = u[1],
          f = (l - c) / (Math.max(1, t.length - 1) + i);
        return (
          (a = r(2 > t.length ? (c + l) / 2 : c + (f * i) / 2, f)),
          (o = 0),
          (n = { t: "rangePoints", a: arguments }),
          e
        );
      }),
      (e.rangeBands = function (u, i, c) {
        2 > arguments.length && (i = 0), 3 > arguments.length && (c = i);
        var l = u[1] < u[0],
          f = u[l - 0],
          s = u[1 - l],
          h = (s - f) / (t.length - i + 2 * c);
        return (
          (a = r(f + h * c, h)),
          l && a.reverse(),
          (o = h * (1 - i)),
          (n = { t: "rangeBands", a: arguments }),
          e
        );
      }),
      (e.rangeRoundBands = function (u, i, c) {
        2 > arguments.length && (i = 0), 3 > arguments.length && (c = i);
        var l = u[1] < u[0],
          f = u[l - 0],
          s = u[1 - l],
          h = Math.floor((s - f) / (t.length - i + 2 * c)),
          g = s - f - (t.length - i) * h;
        return (
          (a = r(f + Math.round(g / 2), h)),
          l && a.reverse(),
          (o = Math.round(h * (1 - i))),
          (n = { t: "rangeRoundBands", a: arguments }),
          e
        );
      }),
      (e.rangeBand = function () {
        return o;
      }),
      (e.rangeExtent = function () {
        return Rn(n.a[0]);
      }),
      (e.copy = function () {
        return ee(t, n);
      }),
      e.domain(t)
    );
  }
  /**
   * Constructs a function that maps quantiles to values within a specified range.
   *
   * This function creates an interpolator based on given input arrays `t` and `n`.
   * It defines two inner functions: `e` for calculating quantile positions,
   * and `r` for finding the value corresponding to a given quantile. The outer
   * function provides methods to set and get the domain and range, as well as to
   * retrieve the calculated quantiles and create a copy of the interpolator.
   *
   * @param {Array} t - Array of input values for which quantiles are calculated.
   * @param {Array} n - Array of output values corresponding to the quantiles.
   */
  function re(t, n) {
    /**
     * Computes quantiles based on input length and returns result.
     */
    function e() {
      var e = 0,
        i = n.length;
      for (u = []; i > ++e; ) u[e - 1] = Ci.quantile(t, e / i);
      return r;
    }
    /**
     * Converts input to a number and returns a value from an array based on binary search index.
     */
    function r(t) {
      return isNaN((t = +t)) ? 0 / 0 : n[Ci.bisect(u, t)];
    }
    var u;
    return (
      (r.domain = function (n) {
        return arguments.length
          ? ((t = n
              .filter(function (t) {
                return !isNaN(t);
              })
              .sort(Ci.ascending)),
            e())
          : t;
      }),
      (r.range = function (t) {
        return arguments.length ? ((n = t), e()) : n;
      }),
      (r.quantiles = function () {
        return u;
      }),
      (r.copy = function () {
        return re(t, n);
      }),
      e()
    );
  }
  /**
   * Creates a linear interpolation function between given domain and range.
   */
  function ue(t, n, e) {
    /**
     * Retrieves an element from array `e` based on a calculated index.
     */
    function r(n) {
      return e[Math.max(0, Math.min(a, Math.floor(i * (n - t))))];
    }
    /**
     * Calculates a value based on array length and two indices.
     */
    function u() {
      return (i = e.length / (n - t)), (a = e.length - 1), r;
    }
    var i, a;
    return (
      (r.domain = function (e) {
        return arguments.length
          ? ((t = +e[0]), (n = +e[e.length - 1]), u())
          : [t, n];
      }),
      (r.range = function (t) {
        return arguments.length ? ((e = t), u()) : e;
      }),
      (r.copy = function () {
        return ue(t, n, e);
      }),
      u()
    );
  }
  /**
   * Creates a scale function that maps domain values to range values.
   */
  function ie(t, n) {
    /**
     * Retrieves an element from array `n` using a binary search index determined by `t`.
     */
    function e(e) {
      return n[Ci.bisect(t, e)];
    }
    return (
      (e.domain = function (n) {
        return arguments.length ? ((t = n), e) : t;
      }),
      (e.range = function (t) {
        return arguments.length ? ((n = t), e) : n;
      }),
      (e.copy = function () {
        return ie(t, n);
      }),
      e
    );
  }
  /**
   * Creates a scale function with invert, domain, range, ticks, tickFormat, and copy methods.
   */
  function ae(t) {
    /**
     * Converts a value to a number.
     */
    function n(t) {
      return +t;
    }
    return (
      (n.invert = n),
      (n.domain = n.range =
        function (e) {
          return arguments.length ? ((t = e.map(n)), n) : t;
        }),
      (n.ticks = function (n) {
        return Bn(t, n);
      }),
      (n.tickFormat = function (n) {
        return $n(t, n);
      }),
      (n.copy = function () {
        return ae(t);
      }),
      n
    );
  }
  /**
   * Returns the inner radius of the given object.
   */
  function oe(t) {
    return t.innerRadius;
  }
  /**
   * Returns the outer radius of the given object.
   */
  function ce(t) {
    return t.outerRadius;
  }
  /**
   * Returns the start angle of a given object.
   */
  function le(t) {
    return t.startAngle;
  }
  /**
   * Returns the end angle of a given object.
   */
  function fe(t) {
    return t.endAngle;
  }
  /**
   * Creates a line generator function that generates SVG path data for a given set of points.
   *
   * The function `se` creates a line generator with configurable x, y, defined, interpolate, and tension settings.
   * It processes the input array `n`, which contains objects representing points. For each point, it checks if it is defined
   * using the `defined` function. If defined, it calculates the x and y values using the provided functions and adds them to an array.
   * The points are then interpolated using the specified interpolation method and tension value to generate a smooth path.
   *
   * @param t - An object containing configuration options for the line generator.
   * @returns A function that generates SVG path data for a given set of points.
   */
  function se(t) {
    /**
     * Processes an input array and generates a formatted string based on certain conditions.
     *
     * The function iterates over each element in the input array `n`, using callback functions
     * `u`, `p`, and `d` to determine how to process elements. It collects processed data into
     * arrays `s` and `f`. If a condition specified by `u` is met, it pushes formatted strings
     * into `f`. The final result is a joined string from `f` or null if no valid entries are found.
     *
     * @param {Array} n - The input array to be processed.
     */
    function n(n) {
      /**
       * Pushes a formatted string to array `f`.
       */
      function a() {
        f.push("M", i(t(s), l));
      }
      for (
        var o, f = [], s = [], h = -1, g = n.length, p = c(e), d = c(r);
        g > ++h;

      )
        u.call(this, (o = n[h]), h)
          ? s.push([+p.call(this, o, h), +d.call(this, o, h)])
          : s.length && (a(), (s = []));
      return s.length && a(), f.length ? f.join("") : null;
    }
    var e = he,
      r = ge,
      u = o,
      i = pe,
      a = i.key,
      l = 0.7;
    return (
      (n.x = function (t) {
        return arguments.length ? ((e = t), n) : e;
      }),
      (n.y = function (t) {
        return arguments.length ? ((r = t), n) : r;
      }),
      (n.defined = function (t) {
        return arguments.length ? ((u = t), n) : u;
      }),
      (n.interpolate = function (t) {
        return arguments.length
          ? ((a = "function" == typeof t ? (i = t) : (i = Ya.get(t) || pe).key),
            n)
          : a;
      }),
      (n.tension = function (t) {
        return arguments.length ? ((l = t), n) : l;
      }),
      n
    );
  }
  /**
   * Returns the first element of the array.
   */
  function he(t) {
    return t[0];
  }
  /**
   * Retrieves the second element from an array.
   */
  function ge(t) {
    return t[1];
  }
  /**
   * Joins elements of an array with "L".
   */
  function pe(t) {
    return t.join("L");
  }
  /**
   * Appends 'Z' to the result of pe function called with t.
   */
  function de(t) {
    return pe(t) + "Z";
  }
  /**
   * Constructs a string from an array of tuples, encoding position changes.
   */
  function me(t) {
    for (var n = 0, e = t.length, r = t[0], u = [r[0], ",", r[1]]; e > ++n; )
      u.push("V", (r = t[n])[1], "H", r[0]);
    return u.join("");
  }
  /**
   * Processes an array of points and generates a string representation.
   */
  function ve(t) {
    for (var n = 0, e = t.length, r = t[0], u = [r[0], ",", r[1]]; e > ++n; )
      u.push("H", (r = t[n])[0], "V", r[1]);
    return u.join("");
  }
  /**
   * Processes an array `t` and a value `n`, returning a computed result based on its length.
   */
  function ye(t, n) {
    return 4 > t.length ? pe(t) : t[1] + xe(t.slice(1, t.length - 1), _e(t, n));
  }
  /**
   * Returns a value based on the length of the input array `t`.
   */
  function Me(t, n) {
    return 3 > t.length
      ? pe(t)
      : t[0] +
          xe((t.push(t[0]), t), _e([t[t.length - 2]].concat(t, [t[1]]), n));
  }
  /**
   * Returns a processed string based on input length and conditions.
   */
  function be(t, n) {
    return 3 > t.length ? pe(t) : t[0] + xe(t, _e(t, n));
  }
  /**
   * Generates a string representing cubic Bezier curve commands based on input arrays.
   *
   * This function processes two arrays, `t` and `n`, to construct a series of SVG path
   * data commands. It checks the lengths of the arrays and constructs quadratic or
   * cubic Bezier segments accordingly. The logic involves conditional branching and
   * loop iterations to append appropriate command strings to the result.
   *
   * @param {Array} t - An array representing control points for the Bezier curve.
   * @param {Array} n - Another array of control points, used in conjunction with `t`.
   */
  function xe(t, n) {
    if (1 > n.length || (t.length != n.length && t.length != n.length + 2))
      return pe(t);
    var e = t.length != n.length,
      r = "",
      u = t[0],
      i = t[1],
      a = n[0],
      o = a,
      c = 1;
    if (
      (e &&
        ((r +=
          "Q" +
          (i[0] - (2 * a[0]) / 3) +
          "," +
          (i[1] - (2 * a[1]) / 3) +
          "," +
          i[0] +
          "," +
          i[1]),
        (u = t[1]),
        (c = 2)),
      n.length > 1)
    ) {
      (o = n[1]),
        (i = t[c]),
        c++,
        (r +=
          "C" +
          (u[0] + a[0]) +
          "," +
          (u[1] + a[1]) +
          "," +
          (i[0] - o[0]) +
          "," +
          (i[1] - o[1]) +
          "," +
          i[0] +
          "," +
          i[1]);
      for (var l = 2; n.length > l; l++, c++)
        (i = t[c]),
          (o = n[l]),
          (r +=
            "S" +
            (i[0] - o[0]) +
            "," +
            (i[1] - o[1]) +
            "," +
            i[0] +
            "," +
            i[1]);
    }
    if (e) {
      var f = t[c];
      r +=
        "Q" +
        (i[0] + (2 * o[0]) / 3) +
        "," +
        (i[1] + (2 * o[1]) / 3) +
        "," +
        f[0] +
        "," +
        f[1];
    }
    return r;
  }
  /**
   * Processes an array of points to calculate intermediate values based on a given factor.
   */
  function _e(t, n) {
    for (
      var e, r = [], u = (1 - n) / 2, i = t[0], a = t[1], o = 1, c = t.length;
      c > ++o;

    )
      (e = i),
        (i = a),
        (a = t[o]),
        r.push([u * (a[0] - e[0]), u * (a[1] - e[1])]);
    return r;
  }
  /**
   * Processes an array of tuples to generate a formatted string based on specific rules.
   *
   * The function checks the length of the input array `t`. If its length is less than 3, it calls `pe(t)`
   * and returns the result. Otherwise, it initializes several arrays and variables to process the input
   * data in a loop. It uses the helper function `Ne` to update these arrays based on the current tuple
   * being processed. Finally, it joins the elements of one of the arrays into a string and returns it.
   *
   * @param {Array<Array<any>>} t - An array of tuples to be processed.
   */
  function we(t) {
    if (3 > t.length) return pe(t);
    var n = 1,
      e = t.length,
      r = t[0],
      u = r[0],
      i = r[1],
      a = [u, u, u, (r = t[1])[0]],
      o = [i, i, i, r[1]],
      c = [u, ",", i];
    for (Ne(c, a, o); e > ++n; )
      (r = t[n]), a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), Ne(c, a, o);
    for (n = -1; 2 > ++n; )
      a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), Ne(c, a, o);
    return c.join("");
  }
  /**
   * Processes an array of tuples and generates a string based on specific logic.
   *
   * The function first checks if the length of the input array is less than 4.
   * If so, it returns the result of calling `pe` with the input array.
   * Otherwise, it initializes arrays and variables to track elements and their indices,
   * iterates through the input array, updates these arrays, and constructs a string
   * using helper functions `Ae`, `Va`, and `Ne`.
   *
   * @param {Array<Array<number>>} t - The input array of tuples to be processed.
   */
  function Se(t) {
    if (4 > t.length) return pe(t);
    for (var n, e = [], r = -1, u = t.length, i = [0], a = [0]; 3 > ++r; )
      (n = t[r]), i.push(n[0]), a.push(n[1]);
    for (e.push(Ae(Va, i) + "," + Ae(Va, a)), --r; u > ++r; )
      (n = t[r]), i.shift(), i.push(n[0]), a.shift(), a.push(n[1]), Ne(e, i, a);
    return e.join("");
  }
  /**
   * Processes an array of tuples to generate a formatted string.
   */
  function ke(t) {
    for (var n, e, r = -1, u = t.length, i = u + 4, a = [], o = []; 4 > ++r; )
      (e = t[r % u]), a.push(e[0]), o.push(e[1]);
    for (n = [Ae(Va, a), ",", Ae(Va, o)], --r; i > ++r; )
      (e = t[r % u]),
        a.shift(),
        a.push(e[0]),
        o.shift(),
        o.push(e[1]),
        Ne(n, a, o);
    return n.join("");
  }
  /**
   * Interpolates points in an array based on a given factor and returns processed data.
   */
  function Ee(t, n) {
    var e = t.length - 1;
    if (e)
      for (
        var r,
          u,
          i = t[0][0],
          a = t[0][1],
          o = t[e][0] - i,
          c = t[e][1] - a,
          l = -1;
        e >= ++l;

      )
        (r = t[l]),
          (u = l / e),
          (r[0] = n * r[0] + (1 - n) * (i + u * o)),
          (r[1] = n * r[1] + (1 - n) * (a + u * c));
    return we(t);
  }
  /**
   * Calculates the dot product of two 4-dimensional vectors.
   */
  function Ae(t, n) {
    return t[0] * n[0] + t[1] * n[1] + t[2] * n[2] + t[3] * n[3];
  }
  /**
   * Appends specific formatted values to the input array.
   */
  function Ne(t, n, e) {
    t.push(
      "C",
      Ae(Ua, n),
      ",",
      Ae(Ua, e),
      ",",
      Ae(Ia, n),
      ",",
      Ae(Ia, e),
      ",",
      Ae(Va, n),
      ",",
      Ae(Va, e),
    );
  }
  /**
   * Calculates the slope between two points.
   */
  function Te(t, n) {
    return (n[1] - t[1]) / (n[0] - t[0]);
  }
  /**
   * Computes a sequence of values based on input array elements.
   */
  function qe(t) {
    for (
      var n = 0,
        e = t.length - 1,
        r = [],
        u = t[0],
        i = t[1],
        a = (r[0] = Te(u, i));
      e > ++n;

    )
      r[n] = (a + (a = Te((u = i), (i = t[n + 1])))) / 2;
    return (r[n] = a), r;
  }
  /**
   * Applies a smoothing algorithm to a series of points.
   *
   * This function processes an array of points `t` and applies a smoothing algorithm to it.
   * It iterates through the points, calculating distances and adjusting weights accordingly.
   * After processing, it calculates control points for each segment and returns them as an array.
   *
   * @param {Array<Array<number>>} t - An array of points where each point is represented by an array of numbers (e.g., [x, y]).
   */
  function Ce(t) {
    for (var n, e, r, u, i = [], a = qe(t), o = -1, c = t.length - 1; c > ++o; )
      (n = Te(t[o], t[o + 1])),
        1e-6 > Math.abs(n)
          ? (a[o] = a[o + 1] = 0)
          : ((e = a[o] / n),
            (r = a[o + 1] / n),
            (u = e * e + r * r),
            u > 9 &&
              ((u = (3 * n) / Math.sqrt(u)),
              (a[o] = u * e),
              (a[o + 1] = u * r)));
    for (o = -1; c >= ++o; )
      (u =
        (t[Math.min(c, o + 1)][0] - t[Math.max(0, o - 1)][0]) /
        (6 * (1 + a[o] * a[o]))),
        i.push([u || 0, a[o] * u || 0]);
    return i;
  }
  /**
   * Returns a value based on the length of the input array.
   */
  function ze(t) {
    return 3 > t.length ? pe(t) : t[0] + xe(t, Ce(t));
  }
  /**
   * Transforms polar coordinates to Cartesian coordinates in an array of points.
   */
  function De(t) {
    for (var n, e, r, u = -1, i = t.length; i > ++u; )
      (n = t[u]),
        (e = n[0]),
        (r = n[1] + Ra),
        (n[0] = e * Math.cos(r)),
        (n[1] = e * Math.sin(r));
    return t;
  }
  /**
   * Generates a path string based on input data and configuration options.
   *
   * The function processes an array of data points, applying transformations and interpolations to generate SVG path commands.
   * It supports various configurations such as x and y accessors, tension settings, and custom interpolation functions.
   *
   * @param t - Configuration object containing the data and transformation/accessor functions.
   * @returns A string representing the SVG path or null if no valid segments are generated.
   */
  function Le(t) {
    /**
     * Processes an array and generates a string based on certain conditions.
     *
     * This function iterates over the input array, applies transformations to each element,
     * and constructs a string based on specific logic involving conditional checks and callbacks.
     * It uses helper functions and closures to manage intermediate results and state.
     *
     * @param n - The input array to be processed.
     * @returns A string constructed from the processed elements or null if no valid data is found.
     */
    function n(n) {
      /**
       * Pushes values to array `m` based on transformations of other variables.
       */
      function o() {
        m.push("M", l(t(y), g), h, s(t(v.reverse()), g), "Z");
      }
      for (
        var f,
          p,
          d,
          m = [],
          v = [],
          y = [],
          M = -1,
          b = n.length,
          x = c(e),
          _ = c(u),
          w =
            e === r
              ? function () {
                  return p;
                }
              : c(r),
          S =
            u === i
              ? function () {
                  return d;
                }
              : c(i);
        b > ++M;

      )
        a.call(this, (f = n[M]), M)
          ? (v.push([(p = +x.call(this, f, M)), (d = +_.call(this, f, M))]),
            y.push([+w.call(this, f, M), +S.call(this, f, M)]))
          : v.length && (o(), (v = []), (y = []));
      return v.length && o(), m.length ? m.join("") : null;
    }
    var e = he,
      r = he,
      u = 0,
      i = ge,
      a = o,
      l = pe,
      f = l.key,
      s = l,
      h = "L",
      g = 0.7;
    return (
      (n.x = function (t) {
        return arguments.length ? ((e = r = t), n) : r;
      }),
      (n.x0 = function (t) {
        return arguments.length ? ((e = t), n) : e;
      }),
      (n.x1 = function (t) {
        return arguments.length ? ((r = t), n) : r;
      }),
      (n.y = function (t) {
        return arguments.length ? ((u = i = t), n) : i;
      }),
      (n.y0 = function (t) {
        return arguments.length ? ((u = t), n) : u;
      }),
      (n.y1 = function (t) {
        return arguments.length ? ((i = t), n) : i;
      }),
      (n.defined = function (t) {
        return arguments.length ? ((a = t), n) : a;
      }),
      (n.interpolate = function (t) {
        return arguments.length
          ? ((f = "function" == typeof t ? (l = t) : (l = Ya.get(t) || pe).key),
            (s = l.reverse || l),
            (h = l.closed ? "M" : "L"),
            n)
          : f;
      }),
      (n.tension = function (t) {
        return arguments.length ? ((g = t), n) : g;
      }),
      n
    );
  }
  /**
   * Returns the radius of a given object.
   */
  function Fe(t) {
    return t.radius;
  }
  /**
   * Extracts and returns an array containing the x and y properties of the input object.
   */
  function He(t) {
    return [t.x, t.y];
  }
  /**
   * Returns a function that calculates polar coordinates based on input parameters.
   */
  function je(t) {
    return function () {
      var n = t.apply(this, arguments),
        e = n[0],
        r = n[1] + Ra;
      return [e * Math.cos(r), e * Math.sin(r)];
    };
  }
  /**
   * Returns a constant value of 64.
   */
  function Pe() {
    return 64;
  }
  /**
   * Returns a string representing a circle shape.
   */
  function Re() {
    return "circle";
  }
  /**
   * Generates a SVG path string for an ellipse based on input value t.
   */
  function Oe(t) {
    var n = Math.sqrt(t / Ti);
    return (
      "M0," +
      n +
      "A" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      -n +
      "A" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      n +
      "Z"
    );
  }
  /**
   * Sets the transform attribute of elements to translate them horizontally.
   */
  function Ye(t, n) {
    t.attr("transform", function (t) {
      return "translate(" + n(t) + ",0)";
    });
  }
  /**
   * Applies a translation transformation to SVG elements based on a provided function.
   */
  function Ue(t, n) {
    t.attr("transform", function (t) {
      return "translate(0," + n(t) + ")";
    });
  }
  /**
   * Generates a list of interpolated values within a specified range based on input parameters.
   *
   * This function calculates interpolated values between elements of an array `n` using a step count `e`.
   * It checks if the domain of `t` is valid and processes the interpolation logic accordingly.
   * The function returns an array of interpolated values or an empty array if conditions are not met.
   */
  function Ie(t, n, e) {
    if (((r = []), e && n.length > 1)) {
      for (
        var r,
          u,
          i,
          a = Rn(t.domain()),
          o = -1,
          c = n.length,
          l = (n[1] - n[0]) / ++e;
        c > ++o;

      )
        for (u = e; --u > 0; ) (i = +n[o] - u * l) >= a[0] && r.push(i);
      for (--o, u = 0; e > ++u && (i = +n[o] + u * l) < a[1]; ) r.push(i);
    }
    return r;
  }
  /**
   * Finds the common ancestor of two nodes and returns the path from the source node to the common ancestor, followed by the path from the target node to the common ancestor.
   */
  function Ve(t) {
    for (var n = t.source, e = t.target, r = Xe(n, e), u = [n]; n !== r; )
      (n = n.parent), u.push(n);
    for (var i = u.length; e !== r; ) u.splice(i, 0, e), (e = e.parent);
    return u;
  }
  /**
   * Traces and returns an array of ancestors from a given node up to its root parent.
   */
  function Ze(t) {
    for (var n = [], e = t.parent; null != e; )
      n.push(t), (t = e), (e = e.parent);
    return n.push(t), n;
  }
  /**
   * Finds the last common element between two arrays.
   */
  function Xe(t, n) {
    if (t === n) return t;
    for (
      var e = Ze(t), r = Ze(n), u = e.pop(), i = r.pop(), a = null;
      u === i;

    )
      (a = u), (u = e.pop()), (i = r.pop());
    return a;
  }
  /**
   * Sets a flag in the fixed property of the input object.
   */
  function Be(t) {
    t.fixed |= 2;
  }
  /**
   * Modifies the fixed property of the input object by performing a bitwise AND operation with -7.
   */
  function $e(t) {
    t.fixed &= -7;
  }
  /**
   * Sets the fixed flag and copies x, y to px, py properties of the object.
   */
  function Je(t) {
    (t.fixed |= 4), (t.px = t.x), (t.py = t.y);
  }
  /**
   * Modifies the fixed property of an object by applying a bitwise AND operation with -5.
   */
  function Ge(t) {
    t.fixed &= -5;
  }
  /**
   * Recursively calculates and updates the charge, center of mass, and position of nodes in a quadtree.
   *
   * This function traverses the quadtree structure starting from the given node `t`. It accumulates
   * the total charge and the weighted sum of coordinates (`cx` and `cy`) for all descendant nodes.
   * If the node contains a point, it adjusts its position slightly by adding a small random offset,
   * calculates its charge based on the strength function `e`, and updates the total charge and center
   * of mass accordingly. Finally, it computes the average center of mass (`cx` and `cy`) for the node.
   *
   * @param {Object} t - The current node in the quadtree.
   * @param {number} n - A scaling factor for point charges.
   * @param {Function} e - A function that determines the charge of a point based on its index.
   */
  function Ke(t, n, e) {
    var r = 0,
      u = 0;
    if (((t.charge = 0), !t.leaf))
      for (var i, a = t.nodes, o = a.length, c = -1; o > ++c; )
        (i = a[c]),
          null != i &&
            (Ke(i, n, e),
            (t.charge += i.charge),
            (r += i.charge * i.cx),
            (u += i.charge * i.cy));
    if (t.point) {
      t.leaf ||
        ((t.point.x += Math.random() - 0.5),
        (t.point.y += Math.random() - 0.5));
      var l = n * e[t.point.index];
      (t.charge += t.pointCharge = l),
        (r += l * t.point.x),
        (u += l * t.point.y);
    }
    (t.cx = r / t.charge), (t.cy = u / t.charge);
  }
  /**
   * Returns the x property of the input object.
   */
  function We(t) {
    return t.x;
  }
  /**
   * Returns the property 'y' of the given object.
   */
  function Qe(t) {
    return t.y;
  }
  /**
   * Sets the initial and current values of an object property.
   */
  function tr(t, n, e) {
    (t.y0 = n), (t.y = e);
  }
  /**
   * Generates a range array of numbers from 0 to t.length - 1.
   */
  function nr(t) {
    return Ci.range(t.length);
  }
  /**
   * Initializes an array of zeros with length equal to the length of the first element in the input array.
   */
  function er(t) {
    for (var n = -1, e = t[0].length, r = []; e > ++n; ) r[n] = 0;
    return r;
  }
  /**
   * Finds the index of the element with the highest second value in an array of arrays.
   */
  function rr(t) {
    for (var n, e = 1, r = 0, u = t[0][1], i = t.length; i > e; ++e)
      (n = t[e][1]) > u && ((r = e), (u = n));
    return r;
  }
  /**
   * Reduces an array using the `ir` function starting from an initial value of 0.
   */
  function ur(t) {
    return t.reduce(ir, 0);
  }
  /**
   * Returns the sum of the first parameter and the second element of the second parameter array.
   */
  function ir(t, n) {
    return t + n[1];
  }
  /**
   * Calls `or` with the given arguments after calculating a length-based value.
   */
  function ar(t, n) {
    return or(t, Math.ceil(Math.log(n.length) / Math.LN2 + 1));
  }
  /**
   * Generates an array of linearly spaced numbers between two values.
   */
  function or(t, n) {
    for (var e = -1, r = +t[0], u = (t[1] - r) / n, i = []; n >= ++e; )
      i[e] = u * e + r;
    return i;
  }
  /**
   * Returns an array containing the minimum and maximum values from the input array.
   */
  function cr(t) {
    return [Ci.min(t), Ci.max(t)];
  }
  /**
   * Rebinds and initializes properties on a target object.
   */
  function lr(t, n) {
    return (
      Ci.rebind(t, n, "sort", "children", "value"),
      (t.nodes = t),
      (t.links = gr),
      t
    );
  }
  /**
   * Returns the children of a given node.
   */
  function fr(t) {
    return t.children;
  }
  /**
   * Returns the value of the input object.
   */
  function sr(t) {
    return t.value;
  }
  /**
   * Compares two values by subtracting the first from the second.
   */
  function hr(t, n) {
    return n.value - t.value;
  }
  /**
   * Merges and maps child nodes to create a source-target relationship array.
   */
  function gr(t) {
    return Ci.merge(
      t.map(function (t) {
        return (t.children || []).map(function (n) {
          return { source: t, target: n };
        });
      }),
    );
  }
  /**
   * Compares two objects by their value properties.
   */
  function pr(t, n) {
    return t.value - n.value;
  }
  /**
   * Updates linked list pointers to insert a node after another.
   */
  function dr(t, n) {
    var e = t._pack_next;
    (t._pack_next = n),
      (n._pack_prev = t),
      (n._pack_next = e),
      (e._pack_prev = n);
  }
  /**
   * Links two nodes in a pack structure.
   */
  function mr(t, n) {
    (t._pack_next = n), (n._pack_prev = t);
  }
  /**
   * Determines if two circles with given positions and radii overlap.
   */
  function vr(t, n) {
    var e = n.x - t.x,
      r = n.y - t.y,
      u = t.r + n.r;
    return u * u - e * e - r * r > 0.001;
  }
  /**
   * Performs a complex packing algorithm on a set of circular nodes within a parent node.
   *
   * This function calculates the positions and sizes of child nodes to pack them efficiently within a given parent node.
   * It iterates through the children, adjusting their positions and ensuring no overlaps using various helper functions like Mr, _r, dr, and br.
   * The final step centers the packed nodes within the bounds of the parent node and updates the radius of the parent node.
   *
   * @param t - The parent node containing an array of child nodes to be packed.
   */
  function yr(t) {
    /**
     * Updates bounding box coordinates based on circle position and radius.
     */
    function n(t) {
      (f = Math.min(t.x - t.r, f)),
        (s = Math.max(t.x + t.r, s)),
        (h = Math.min(t.y - t.r, h)),
        (g = Math.max(t.y + t.r, g));
    }
    if ((e = t.children) && (l = e.length)) {
      var e,
        r,
        u,
        i,
        a,
        o,
        c,
        l,
        f = 1 / 0,
        s = -1 / 0,
        h = 1 / 0,
        g = -1 / 0;
      if (
        (e.forEach(Mr),
        (r = e[0]),
        (r.x = -r.r),
        (r.y = 0),
        n(r),
        l > 1 && ((u = e[1]), (u.x = u.r), (u.y = 0), n(u), l > 2))
      )
        for (
          i = e[2],
            _r(r, u, i),
            n(i),
            dr(r, i),
            r._pack_prev = i,
            dr(i, u),
            u = r._pack_next,
            a = 3;
          l > a;
          a++
        ) {
          _r(r, u, (i = e[a]));
          var p = 0,
            d = 1,
            m = 1;
          for (o = u._pack_next; o !== u; o = o._pack_next, d++)
            if (vr(o, i)) {
              p = 1;
              break;
            }
          if (1 == p)
            for (
              c = r._pack_prev;
              c !== o._pack_prev && !vr(c, i);
              c = c._pack_prev, m++
            );
          p
            ? (m > d || (d == m && u.r < r.r) ? mr(r, (u = o)) : mr((r = c), u),
              a--)
            : (dr(r, i), (u = i), n(i));
        }
      var v = (f + s) / 2,
        y = (h + g) / 2,
        M = 0;
      for (a = 0; l > a; a++)
        (i = e[a]),
          (i.x -= v),
          (i.y -= y),
          (M = Math.max(M, i.r + Math.sqrt(i.x * i.x + i.y * i.y)));
      (t.r = M), e.forEach(br);
    }
  }
  /**
   * Initializes the _pack_next and _pack_prev properties of the object to itself.
   */
  function Mr(t) {
    t._pack_next = t._pack_prev = t;
  }
  /**
   * Removes _pack_next and _pack_prev properties from the given object.
   */
  function br(t) {
    delete t._pack_next, delete t._pack_prev;
  }
  /**
   * Recursively scales and translates tree nodes.
   */
  function xr(t, n, e, r) {
    var u = t.children;
    if (((t.x = n += r * t.x), (t.y = e += r * t.y), (t.r *= r), u))
      for (var i = -1, a = u.length; a > ++i; ) xr(u[i], n, e, r);
  }
  /**
   * Adjusts the position of point `e` based on its radius and the positions of points `t` and `n`.
   */
  function _r(t, n, e) {
    var r = t.r + e.r,
      u = n.x - t.x,
      i = n.y - t.y;
    if (r && (u || i)) {
      var a = n.r + e.r,
        o = u * u + i * i;
      (a *= a), (r *= r);
      var c = 0.5 + (r - a) / (2 * o),
        l =
          Math.sqrt(Math.max(0, 2 * a * (r + o) - (r -= o) * r - a * a)) /
          (2 * o);
      (e.x = t.x + c * u + l * i), (e.y = t.y + c * i - l * u);
    } else (e.x = t.x + r), (e.y = t.y);
  }
  /**
   * Adds one to the maximum y value in an array of objects.
   */
  function wr(t) {
    return (
      1 +
      Ci.max(t, function (t) {
        return t.y;
      })
    );
  }
  /**
   * Calculates the average of the 'x' property values in an array of objects.
   */
  function Sr(t) {
    return (
      t.reduce(function (t, n) {
        return t + n.x;
      }, 0) / t.length
    );
  }
  /**
   * Recursively finds and returns the first leaf node in a tree structure.
   */
  function kr(t) {
    var n = t.children;
    return n && n.length ? kr(n[0]) : t;
  }
  /**
   * Recursively finds and returns the last child of a given node.
   */
  function Er(t) {
    var n,
      e = t.children;
    return e && (n = e.length) ? Er(e[n - 1]) : t;
  }
  /**
   * Compares parent properties of two objects and returns a number.
   */
  function Ar(t, n) {
    return t.parent == n.parent ? 1 : 2;
  }
  /**
   * Retrieves the first child or the threaded element from a given node.
   */
  function Nr(t) {
    var n = t.children;
    return n && n.length ? n[0] : t._tree.thread;
  }
  /**
   * Retrieves the last child of a tree node or its thread if no children exist.
   */
  function Tr(t) {
    var n,
      e = t.children;
    return e && (n = e.length) ? e[n - 1] : t._tree.thread;
  }
  /**
   * Recursively traverses a tree structure, applying a visitor function to each node.
   *
   * This function processes each child of the given node `t` by recursively calling itself,
   * and applies the visitor function `n` to each node. If the visitor function returns a value
   * greater than 0 when applied to a child node, that child node becomes the new current node.
   *
   * @param {Object} t - The current node in the tree structure.
   * @param {Function} n - The visitor function to apply to each node.
   */
  function qr(t, n) {
    var e = t.children;
    if (e && (u = e.length))
      for (var r, u, i = -1; u > ++i; ) n((r = qr(e[i], n)), t) > 0 && (t = r);
    return t;
  }
  /**
   * Compares two objects' x properties and returns the difference.
   */
  function Cr(t, n) {
    return t.x - n.x;
  }
  /**
   * Calculates the difference in the 'x' property between two objects.
   */
  function zr(t, n) {
    return n.x - t.x;
  }
  /**
   * Compares the depth of two nodes.
   */
  function Dr(t, n) {
    return t.depth - n.depth;
  }
  /**
   * Recursively traverses a tree structure and applies a function to each node.
   */
  function Lr(t, n) {
    /**
     * Recursively processes children of a given node and updates references.
     */
    function e(t, r) {
      var u = t.children;
      if (u && (a = u.length))
        for (var i, a, o = null, c = -1; a > ++c; )
          (i = u[c]), e(i, o), (o = i);
      n(t, r);
    }
    e(t, null);
  }
  /**
   * Adjusts preliminary and modifier values of tree nodes.
   */
  function Fr(t) {
    for (var n, e = 0, r = 0, u = t.children, i = u.length; --i >= 0; )
      (n = u[i]._tree),
        (n.prelim += e),
        (n.mod += e),
        (e += n.shift + (r += n.change));
  }
  /**
   * Adjusts change, shift, prelim, and mod properties of tree nodes.
   */
  function Hr(t, n, e) {
    (t = t._tree), (n = n._tree);
    var r = e / (n.number - t.number);
    (t.change += r),
      (n.change -= r),
      (n.shift += e),
      (n.prelim += e),
      (n.mod += e);
  }
  /**
   * Returns the ancestor of `t` if its parent matches `n.parent`, otherwise returns `e`.
   */
  function jr(t, n, e) {
    return t._tree.ancestor.parent == n.parent ? t._tree.ancestor : e;
  }
  /**
   * Creates a new object with properties x, y, dx, and dy from the input object t.
   */
  function Pr(t) {
    return { x: t.x, y: t.y, dx: t.dx, dy: t.dy };
  }
  /**
   * Adjusts position and size based on input parameters.
   */
  function Rr(t, n) {
    var e = t.x + n[3],
      r = t.y + n[0],
      u = t.dx - n[1] - n[3],
      i = t.dy - n[0] - n[2];
    return (
      0 > u && ((e += u / 2), (u = 0)),
      0 > i && ((r += i / 2), (i = 0)),
      { x: e, y: r, dx: u, dy: i }
    );
  }
  /**
   * Generates a CSV parser and formatter based on the provided delimiter.
   *
   * The function creates an object with methods to parse and format CSV data.
   * It includes parsing logic that handles quoted fields, newlines within quotes,
   * and different newline characters. The formatting method converts an array of objects
   * back into a CSV string using the specified delimiter.
   *
   * @param {string} t - The delimiter character used in the CSV.
   * @param {object} n - Additional configuration options (not used in this snippet).
   * @returns {Object} An object with `parse` and `format` methods for CSV operations.
   */
  function Or(t, n) {
    /**
     * Makes an XMLHttpRequest and returns the response.
     */
    function e(t, e) {
      return Ci.xhr(t, n, e).response(r);
    }
    /**
     * Parses the response text from a given object.
     */
    function r(t) {
      return e.parse(t.responseText);
    }
    /**
     * Maps an array and joins the elements into a string.
     */
    function u(n) {
      return n.map(i).join(t);
    }
    /**
     * Tests if a string contains a match with a regex and formats it accordingly.
     */
    function i(t) {
      return a.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t;
    }
    var a = RegExp('["' + t + "\n]"),
      o = t.charCodeAt(0);
    return (
      (e.parse = function (t) {
        var n;
        return e.parseRows(t, function (t) {
          return n
            ? n(t)
            : ((n = Function(
                "d",
                "return {" +
                  t
                    .map(function (t, n) {
                      return JSON.stringify(t) + ": d[" + n + "]";
                    })
                    .join(",") +
                  "}",
              )),
              void 0);
        });
      }),
      (e.parseRows = function (t, n) {
        /**
         * Processes a string to extract and return a substring based on certain conditions.
         *
         * The function checks if the current index `f` is greater than or equal to `l`, returning `a` if true.
         * If `u` is truthy, it returns `i` after setting `u` to false.
         * It then searches for a double-quoted string starting at index `n`.
         * If found, it skips over escaped quotes and updates the index `f`.
         * If no closing quote is found, it continues searching until it reaches the end of the string or encounters a newline.
         *
         * @returns The extracted substring after processing.
         */
        function e() {
          if (f >= l) return a;
          if (u) return (u = !1), i;
          var n = f;
          if (34 === t.charCodeAt(n)) {
            for (var e = n; l > e++; )
              if (34 === t.charCodeAt(e)) {
                if (34 !== t.charCodeAt(e + 1)) break;
                ++e;
              }
            f = e + 2;
            var r = t.charCodeAt(e + 1);
            return (
              13 === r
                ? ((u = !0), 10 === t.charCodeAt(e + 2) && ++f)
                : 10 === r && (u = !0),
              t.substring(n + 1, e).replace(/""/g, '"')
            );
          }
          for (; l > f; ) {
            var r = t.charCodeAt(f++),
              c = 1;
            if (10 === r) u = !0;
            else if (13 === r) (u = !0), 10 === t.charCodeAt(f) && (++f, ++c);
            else if (r !== o) continue;
            return t.substring(n, f - c);
          }
          return t.substring(n);
        }
        for (
          var r, u, i = {}, a = {}, c = [], l = t.length, f = 0, s = 0;
          (r = e()) !== a;

        ) {
          for (var h = []; r !== i && r !== a; ) h.push(r), (r = e());
          (!n || (h = n(h, s++))) && c.push(h);
        }
        return c;
      }),
      (e.format = function (t) {
        return t.map(u).join("\n");
      }),
      e
    );
  }
  /**
   * Calls a handler function based on the type of the input object.
   */
  function Yr(t, n) {
    oo.hasOwnProperty(t.type) && oo[t.type](t, n);
  }
  /**
   * Iterates over points in a path and updates their positions.
   */
  function Ur(t, n, e) {
    var r,
      u = -1,
      i = t.length - e;
    for (n.lineStart(); i > ++u; ) (r = t[u]), n.point(r[0], r[1]);
    n.lineEnd();
  }
  /**
   * Starts a polygon, iterates through points, and ends the polygon.
   */
  function Ir(t, n) {
    var e = -1,
      r = t.length;
    for (n.polygonStart(); r > ++e; ) Ur(t[e], n, 1);
    n.polygonEnd();
  }
  /**
   * Calculates the polar coordinates from Cartesian coordinates.
   */
  function Vr(t) {
    return [Math.atan2(t[1], t[0]), Math.asin(Math.max(-1, Math.min(1, t[2])))];
  }
  /**
   * Checks if both elements of vector t are within a distance qi from vector n's corresponding elements.
   */
  function Zr(t, n) {
    return qi > Math.abs(t[0] - n[0]) && qi > Math.abs(t[1] - n[1]);
  }
  /**
   * Converts spherical coordinates to Cartesian coordinates.
   */
  function Xr(t) {
    var n = t[0],
      e = t[1],
      r = Math.cos(e);
    return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)];
  }
  /**
   * Calculates the dot product of two 3-dimensional vectors.
   */
  function Br(t, n) {
    return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
  }
  /**
   * Computes the cross product of two 3D vectors.
   */
  function $r(t, n) {
    return [
      t[1] * n[2] - t[2] * n[1],
      t[2] * n[0] - t[0] * n[2],
      t[0] * n[1] - t[1] * n[0],
    ];
  }
  /**
   * Adds corresponding elements of two arrays in place.
   */
  function Jr(t, n) {
    (t[0] += n[0]), (t[1] += n[1]), (t[2] += n[2]);
  }
  /**
   * Multiplies each element of a 3D vector by a scalar.
   */
  function Gr(t, n) {
    return [t[0] * n, t[1] * n, t[2] * n];
  }
  /**
   * Normalizes a 3D vector to have a unit length.
   */
  function Kr(t) {
    var n = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
    (t[0] /= n), (t[1] /= n), (t[2] /= n);
  }
  /**
   * Wraps a given transformation function to create a projection wrapper.
   *
   * This function initializes a projection wrapper that applies a transformation to geographical coordinates before rendering them as points on a map.
   * It handles line start, line end, polygon start, and polygon end events, ensuring smooth transitions between points and correctly handling complex geometries.
   *
   * The `Wr` function also provides a precision method to adjust the resolution of the projection.
   */
  function Wr(t) {
    /**
     * Initializes a geometry processor with point handling functions.
     */
    function n(n) {
      /**
       * Transforms and sets a point using provided coordinates.
       */
      function r(e, r) {
        (e = t(e, r)), n.point(e[0], e[1]);
      }
      /**
       * Initializes point and starts a new line.
       */
      function i() {
        (f = 0 / 0), (d.point = a), n.lineStart();
      }
      /**
       * Updates point coordinates and triggers an event with calculated values.
       */
      function a(r, i) {
        var a = Xr([r, i]),
          o = t(r, i);
        e(
          f,
          s,
          l,
          h,
          g,
          p,
          (f = o[0]),
          (s = o[1]),
          (l = r),
          (h = a[0]),
          (g = a[1]),
          (p = a[2]),
          u,
          n,
        ),
          n.point(f, s);
      }
      /**
       * Assigns `r` to `d.point` and calls `n.lineEnd`.
       */
      function o() {
        (d.point = r), n.lineEnd();
      }
      /**
       * Sets up the point and line end functions for an object `d`.
       */
      function c() {
        var t, r, c, m, v, y, M;
        i(),
          (d.point = function (n, e) {
            a((t = n), (r = e)),
              (c = f),
              (m = s),
              (v = h),
              (y = g),
              (M = p),
              (d.point = a);
          }),
          (d.lineEnd = function () {
            e(f, s, l, h, g, p, c, m, t, v, y, M, u, n), (d.lineEnd = o), o();
          });
      }
      var l,
        f,
        s,
        h,
        g,
        p,
        d = {
          point: r,
          lineStart: i,
          lineEnd: o,
          polygonStart: function () {
            n.polygonStart(), (d.lineStart = c);
          },
          polygonEnd: function () {
            n.polygonEnd(), (d.lineStart = i);
          },
        };
      return d;
    }
    /**
     * Recursively divides a path into smaller segments and applies point calculations.
     *
     * This function calculates the distance between two points and checks if it exceeds a threshold.
     * If it does, it further subdivides the path by calculating midpoints and angles,
     * then recursively calls itself to process these new segments. Points are added to
     * the provided geometry object `m` as part of this process.
     *
     * @param {number} n - The x-coordinate of the starting point.
     * @param {number} u - The y-coordinate of the starting point.
     * @param {number} i - An angle parameter used in calculations.
     * @param {number} a - Another coordinate or offset value.
     * @param {number} o - Another coordinate or offset value.
     * @param {number} c - Another coordinate or offset value.
     * @param {number} l - The x-coordinate of the ending point.
     * @param {number} f - The y-coordinate of the ending point.
     * @param {number} s - Another angle parameter used in calculations.
     * @param {number} h - Another coordinate or offset value.
     * @param {number} g - Another coordinate or offset value.
     * @param {number} p - Another coordinate or offset value.
     * @param {number} d - A counter for recursive depth, decremented with each call.
     * @param {object} m - The geometry object to which points are added.
     */
    function e(n, u, i, a, o, c, l, f, s, h, g, p, d, m) {
      var v = l - n,
        y = f - u,
        M = v * v + y * y;
      if (M > 4 * r && d--) {
        var b = a + h,
          x = o + g,
          _ = c + p,
          w = Math.sqrt(b * b + x * x + _ * _),
          S = Math.asin((_ /= w)),
          k = qi > Math.abs(Math.abs(_) - 1) ? (i + s) / 2 : Math.atan2(x, b),
          E = t(k, S),
          A = E[0],
          N = E[1],
          T = A - n,
          q = N - u,
          C = y * T - v * q;
        ((C * C) / M > r || Math.abs((v * T + y * q) / M - 0.5) > 0.3) &&
          (e(n, u, i, a, o, c, A, N, k, (b /= w), (x /= w), _, d, m),
          m.point(A, N),
          e(A, N, k, b, x, _, l, f, s, h, g, p, d, m));
      }
    }
    var r = 0.5,
      u = 16;
    return (
      (n.precision = function (t) {
        return arguments.length
          ? ((u = (r = t * t) > 0 && 16), n)
          : Math.sqrt(r);
      }),
      n
    );
  }
  /**
   * Calculates and returns a function to compute coordinates based on given parameters.
   */
  function Qr(t, n) {
    /**
     * Calculates coordinates based on given parameters.
     */
    function e(t, n) {
      var e = Math.sqrt(i - 2 * u * Math.sin(n)) / u;
      return [e * Math.sin((t *= u)), a - e * Math.cos(t)];
    }
    var r = Math.sin(t),
      u = (r + Math.sin(n)) / 2,
      i = 1 + r * (2 * u - r),
      a = Math.sqrt(i) / u;
    return (
      (e.invert = function (t, n) {
        var e = a - n;
        return [
          Math.atan2(t, e) / u,
          Math.asin((i - (t * t + e * e) * u * u) / (2 * u)),
        ];
      }),
      e
    );
  }
  /**
   * Processes geographical data to determine bounding box coordinates.
   *
   * This function initializes a stream processor that calculates the minimum and maximum latitude and longitude
   * values from the input geometries. It uses helper functions to update these bounds as it processes points, lines,
   * and polygons. The final result is an array of two coordinate pairs representing the bottom-left and top-right
   * corners of the bounding box.
   *
   * @param {Object} t - A configuration object that defines how the stream should be processed.
   */
  function tu(t) {
    /**
     * Updates the minimum and maximum values for two variables based on input parameters.
     *
     * This function compares the input parameters `t` and `n` with the current minimum (`r`, `u`)
     * and maximum (`i`, `a`) values. It updates the respective minimum or maximum variable if
     * the input parameter is outside the current range.
     */
    function n(t, n) {
      r > t && (r = t), t > i && (i = t), u > n && (u = n), n > a && (a = n);
    }
    /**
     * Sets both `point` and `lineEnd` properties of `o` to `Pn`.
     */
    function e() {
      o.point = o.lineEnd = Pn;
    }
    var r,
      u,
      i,
      a,
      o = {
        point: n,
        lineStart: Pn,
        lineEnd: Pn,
        polygonStart: function () {
          o.lineEnd = e;
        },
        polygonEnd: function () {
          o.point = n;
        },
      };
    return function (n) {
      return (
        (a = i = -(r = u = 1 / 0)),
        Ci.geo.stream(n, t(o)),
        [
          [r, u],
          [i, a],
        ]
      );
    };
  }
  /**
   * Updates trigonometric averages based on input parameters t and n.
   */
  function nu(t, n) {
    if (!fo) {
      ++so, (t *= zi);
      var e = Math.cos((n *= zi));
      (ho += (e * Math.cos(t) - ho) / so),
        (go += (e * Math.sin(t) - go) / so),
        (po += (Math.sin(n) - po) / so);
    }
  }
  /**
   * Sets up point and line end functions for mo object.
   */
  function eu() {
    var t, n;
    (fo = 1), ru(), (fo = 2);
    var e = mo.point;
    (mo.point = function (r, u) {
      e((t = r), (n = u));
    }),
      (mo.lineEnd = function () {
        mo.point(t, n), uu(), (mo.lineEnd = uu);
      });
  }
  /**
   * Updates internal state based on spherical coordinates and recalculates angles.
   */
  function ru() {
    /**
     * Updates global variables based on trigonometric calculations involving input parameters t and u.
     */
    function t(t, u) {
      t *= zi;
      var i = Math.cos((u *= zi)),
        a = i * Math.cos(t),
        o = i * Math.sin(t),
        c = Math.sin(u),
        l = Math.atan2(
          Math.sqrt(
            (l = e * c - r * o) * l +
              (l = r * a - n * c) * l +
              (l = n * o - e * a) * l,
          ),
          n * a + e * o + r * c,
        );
      (so += l),
        (ho += l * (n + (n = a))),
        (go += l * (e + (e = o))),
        (po += l * (r + (r = c)));
    }
    var n, e, r;
    fo > 1 ||
      (1 > fo && ((fo = 1), (so = ho = go = po = 0)),
      (mo.point = function (u, i) {
        u *= zi;
        var a = Math.cos((i *= zi));
        (n = a * Math.cos(u)),
          (e = a * Math.sin(u)),
          (r = Math.sin(i)),
          (mo.point = t);
      }));
  }
  /**
   * Sets `mo.point` to `nu`.
   */
  function uu() {
    mo.point = nu;
  }
  /**
   * Generates a function to plot points on a curve defined by trigonometric functions.
   *
   * This function calculates the cosine and sine of an angle `t`, then returns another function
   * that plots points along a curve based on parameters `u`, `i`, `a`, and `o`. It adjusts the
   * starting point `u` if necessary and iterates to plot points using a loop until a condition is met.
   *
   * @param {number} t - The initial angle in radians.
   * @param {number} n - A multiplier for calculating the step size in the loop.
   */
  function iu(t, n) {
    var e = Math.cos(t),
      r = Math.sin(t);
    return function (u, i, a, o) {
      null != u
        ? ((u = au(e, u)),
          (i = au(e, i)),
          (a > 0 ? i > u : u > i) && (u += 2 * a * Ti))
        : ((u = t + 2 * a * Ti), (i = t));
      for (var c, l = a * n, f = u; a > 0 ? f > i : i > f; f -= l)
        o.point((c = Vr([e, -r * Math.cos(f), -r * Math.sin(f)]))[0], c[1]);
    };
  }
  /**
   * Adjusts an angle based on input parameters and returns a normalized angle value.
   */
  function au(t, n) {
    var e = Xr(n);
    (e[0] -= t), Kr(e);
    var r = Math.acos(Math.max(-1, Math.min(1, -e[1])));
    return ((0 > -e[2] ? -r : r) + 2 * Math.PI - qi) % (2 * Math.PI);
  }
  /**
   * Creates a function that processes geometric shapes and applies transformations.
   *
   * This function takes three parameters: `t`, `n`, and `e`. It returns another function that handles point and line processing,
   * using internal functions like `u`, `i`, `a`, `o`, `c`, `l`, and `f` to manage different states of the geometric transformation.
   *
   * @param t - A callback function used to check conditions for points.
   * @param n - A function that processes paths, likely related to SVG path rendering.
   * @param e - A parameter passed to the internal processing functions, possibly a context or configuration object.
   * @returns A function that manages geometric transformations based on the provided parameters.
   */
  function ou(t, n, e) {
    return function (r) {
      /**
       * Calls `t` with `n` and `e`, and if true, calls `r.point` with `n` and `e`.
       */
      function u(n, e) {
        t(n, e) && r.point(n, e);
      }
      /**
       * Calls the point method of m with t and n as arguments.
       */
      function i(t, n) {
        m.point(t, n);
      }
      /**
       * Sets the point and starts a line.
       */
      function a() {
        (v.point = i), m.lineStart();
      }
      /**
       * Sets `v.point` to `u` and calls `m.lineEnd`.
       */
      function o() {
        (v.point = u), m.lineEnd();
      }
      /**
       * Records a point and adds it to the data array.
       */
      function c(t, n) {
        M.point(t, n), d.push([t, n]);
      }
      /**
       * Initializes line start and resets data array.
       */
      function l() {
        M.lineStart(), (d = []);
      }
      /**
       * Handles the main processing of data points and updates global state.
       *
       * This function processes an array of data `d`, cleans it, and performs operations
       * based on the cleaning result. It updates global variables such as `h` and `g`,
       * and modifies the rendering context `r`. The function also filters and stores
       * processed data in arrays `s` and potentially handles edge cases where data is
       * empty or needs reordering.
       */
      function f() {
        c(d[0][0], d[0][1]), M.lineEnd();
        var t,
          n = M.clean(),
          e = y.buffer(),
          u = e.length;
        if (!u) return (p = !0), (g += gu(d, -1)), (d = null), void 0;
        if (((d = null), 1 & n)) {
          (t = e[0]), (h += gu(t, 1));
          var i,
            u = t.length - 1,
            a = -1;
          for (r.lineStart(); u > ++a; ) r.point((i = t[a])[0], i[1]);
          return r.lineEnd(), void 0;
        }
        u > 1 && 2 & n && e.push(e.pop().concat(e.shift())),
          s.push(e.filter(su));
      }
      var s,
        h,
        g,
        p,
        d,
        m = n(r),
        v = {
          point: u,
          lineStart: a,
          lineEnd: o,
          polygonStart: function () {
            (v.point = c),
              (v.lineStart = l),
              (v.lineEnd = f),
              (p = !1),
              (g = h = 0),
              (s = []),
              r.polygonStart();
          },
          polygonEnd: function () {
            (v.point = u),
              (v.lineStart = a),
              (v.lineEnd = o),
              (s = Ci.merge(s)),
              s.length
                ? cu(s, e, r)
                : (-qi > h || (p && -qi > g)) &&
                  (r.lineStart(), e(null, null, 1, r), r.lineEnd()),
              r.polygonEnd(),
              (s = null);
          },
          sphere: function () {
            r.polygonStart(),
              r.lineStart(),
              e(null, null, 1, r),
              r.lineEnd(),
              r.polygonEnd();
          },
        },
        y = hu(),
        M = n(y);
      return v;
    };
  }
  /**
   * Processes a set of line segments and generates paths using the provided context.
   *
   * This function iterates over each segment, checks if it forms a simple path,
   * and if not, splits it into points with entry/exit information. It then sorts
   * these points and processes them to generate lines based on their properties.
   *
   * @param t - An array of line segments, where each segment is an array of points.
   * @param n - A function used to calculate intersections between line segments.
   * @param e - A context object with methods `lineStart`, `point`, and `lineEnd`.
   */
  function cu(t, n, e) {
    var r = [],
      u = [];
    if (
      (t.forEach(function (t) {
        if (!(1 >= (n = t.length))) {
          var n,
            i = t[0],
            a = t[n - 1];
          if (Zr(i, a)) {
            e.lineStart();
            for (var o = 0; n > o; ++o) e.point((i = t[o])[0], i[1]);
            return e.lineEnd(), void 0;
          }
          var c = {
              point: i,
              points: t,
              other: null,
              visited: !1,
              entry: !0,
              subject: !0,
            },
            l = {
              point: i,
              points: [i],
              other: c,
              visited: !1,
              entry: !1,
              subject: !1,
            };
          (c.other = l),
            r.push(c),
            u.push(l),
            (c = {
              point: a,
              points: [a],
              other: null,
              visited: !1,
              entry: !1,
              subject: !0,
            }),
            (l = {
              point: a,
              points: [a],
              other: c,
              visited: !1,
              entry: !0,
              subject: !1,
            }),
            (c.other = l),
            r.push(c),
            u.push(l);
        }
      }),
      u.sort(fu),
      lu(r),
      lu(u),
      r.length)
    )
      for (var i, a, o, c = r[0]; ; ) {
        for (i = c; i.visited; ) if ((i = i.next) === c) return;
        (a = i.points), e.lineStart();
        do {
          if (((i.visited = i.other.visited = !0), i.entry)) {
            if (i.subject)
              for (var l = 0; a.length > l; l++) e.point((o = a[l])[0], o[1]);
            else n(i.point, i.next.point, 1, e);
            i = i.next;
          } else {
            if (i.subject) {
              a = i.prev.points;
              for (var l = a.length; --l >= 0; ) e.point((o = a[l])[0], o[1]);
            } else n(i.point, i.prev.point, -1, e);
            i = i.prev;
          }
          (i = i.other), (a = i.points);
        } while (!i.visited);
        e.lineEnd();
      }
  }
  /**
   * Links elements in an array to form a circular doubly linked list.
   */
  function lu(t) {
    if ((n = t.length)) {
      for (var n, e, r = 0, u = t[0]; n > ++r; )
        (u.next = e = t[r]), (e.prev = u), (u = e);
      (u.next = e = t[0]), (e.prev = u);
    }
  }
  /**
   * Calculates a difference based on point coordinates and constants Ti, qi.
   */
  function fu(t, n) {
    return (
      (0 > (t = t.point)[0] ? t[1] - Ti / 2 - qi : Ti / 2 - t[1]) -
      (0 > (n = n.point)[0] ? n[1] - Ti / 2 - qi : Ti / 2 - n[1])
    );
  }
  /**
   * Checks if the length of the input is greater than 1.
   */
  function su(t) {
    return t.length > 1;
  }
  /**
   * Creates a line drawing utility with methods to start and end lines, add points, and retrieve the buffer.
   */
  function hu() {
    var t,
      n = [];
    return {
      lineStart: function () {
        n.push((t = []));
      },
      point: function (n, e) {
        t.push([n, e]);
      },
      lineEnd: Pn,
      buffer: function () {
        var e = n;
        return (n = []), (t = null), e;
      },
    };
  }
  /**
   * Calculates a value based on an array of coordinates and a parameter n.
   *
   * The function iterates over the input array `t`, performing trigonometric calculations
   * involving sine, cosine, and atan2 functions. It accumulates a result `a` based on conditions
   * related to the differences between calculated values and constants `qi` and `Ti`.
   *
   * @param t - An array of coordinate pairs [angle, distance].
   * @param n - A scaling parameter.
   * @returns The accumulated value `a` after processing all coordinates.
   */
  function gu(t, n) {
    if (!(e = t.length)) return 0;
    for (
      var e,
        r,
        u,
        i = 0,
        a = 0,
        o = t[0],
        c = o[0],
        l = o[1],
        f = Math.cos(l),
        s = Math.atan2(n * Math.sin(c) * f, Math.sin(l)),
        h = 1 - n * Math.cos(c) * f,
        g = s;
      e > ++i;

    )
      (o = t[i]),
        (f = Math.cos((l = o[1]))),
        (r = Math.atan2(n * Math.sin((c = o[0])) * f, Math.sin(l))),
        (u = 1 - n * Math.cos(c) * f),
        (qi > Math.abs(h - 2) && qi > Math.abs(u - 2)) ||
          (qi > Math.abs(u) ||
            qi > Math.abs(h) ||
            (qi > Math.abs(Math.abs(r - s) - Ti)
              ? u + h > 2 && (a += 4 * (r - s))
              : (a +=
                  qi > Math.abs(h - 2)
                    ? 4 * (r - g)
                    : (((3 * Ti + r - s) % (2 * Ti)) - Ti) * (h + u))),
          (g = s),
          (s = r),
          (h = u));
    return a;
  }
  /**
   * Initializes a path generator with specific logic to handle line starts, points, and ends.
   * Manages internal state to ensure proper path transitions and calculations based on input coordinates.
   *
   * @param {Object} t - An object providing methods `lineStart`, `point`, `lineEnd` for drawing paths.
   */
  function pu(t) {
    var n,
      e = 0 / 0,
      r = 0 / 0,
      u = 0 / 0;
    return {
      lineStart: function () {
        t.lineStart(), (n = 1);
      },
      point: function (i, a) {
        var o = i > 0 ? Ti : -Ti,
          c = Math.abs(i - e);
        qi > Math.abs(c - Ti)
          ? (t.point(e, (r = (r + a) / 2 > 0 ? Ti / 2 : -Ti / 2)),
            t.point(u, r),
            t.lineEnd(),
            t.lineStart(),
            t.point(o, r),
            t.point(i, r),
            (n = 0))
          : u !== o &&
            c >= Ti &&
            (qi > Math.abs(e - u) && (e -= u * qi),
            qi > Math.abs(i - o) && (i -= o * qi),
            (r = du(e, r, i, a)),
            t.point(u, r),
            t.lineEnd(),
            t.lineStart(),
            t.point(o, r),
            (n = 0)),
          t.point((e = i), (r = a)),
          (u = o);
      },
      lineEnd: function () {
        t.lineEnd(), (e = r = 0 / 0);
      },
      clean: function () {
        return 2 - n;
      },
    };
  }
  /**
   * Calculates an angle based on given trigonometric values.
   */
  function du(t, n, e, r) {
    var u,
      i,
      a = Math.sin(t - e);
    return Math.abs(a) > qi
      ? Math.atan(
          (Math.sin(n) * (i = Math.cos(r)) * Math.sin(e) -
            Math.sin(r) * (u = Math.cos(n)) * Math.sin(t)) /
            (u * i * a),
        )
      : (n + r) / 2;
  }
  /**
   * Draws a point or a set of points based on input parameters.
   */
  function mu(t, n, e, r) {
    var u;
    if (null == t)
      (u = (e * Ti) / 2),
        r.point(-Ti, u),
        r.point(0, u),
        r.point(Ti, u),
        r.point(Ti, 0),
        r.point(Ti, -u),
        r.point(0, -u),
        r.point(-Ti, -u),
        r.point(-Ti, 0),
        r.point(-Ti, u);
    else if (Math.abs(t[0] - n[0]) > qi) {
      var i = (t[0] < n[0] ? 1 : -1) * Ti;
      (u = (e * i) / 2), r.point(-i, u), r.point(0, u), r.point(i, u);
    } else r.point(n[0], n[1]);
  }
  /**
   * Generates a function that determines if a point is within a certain angular distance from the north pole.
   *
   * The function `vu` creates a clipper object with methods to handle line starts, points, and line ends.
   * It uses helper functions `n` and `r` to determine the angular distance and calculate intersections.
   * The clipper object also provides a method to clean up its state.
   *
   * @param t - The angular threshold in radians for determining proximity to the north pole.
   * @returns A function that clips paths based on the specified angular threshold.
   */
  function vu(t) {
    /**
     * Checks if the product of cosines of two angles is greater than a constant.
     */
    function n(t, n) {
      return Math.cos(t) * Math.cos(n) > i;
    }
    /**
     * Creates a line segment generator with methods to start lines, handle points, and end lines.
     *
     * This function returns an object with methods to manage the state of line segments,
     * including starting new lines, adding points to lines, ending lines, and determining
     * the cleanliness of the line segment based on its state.
     *
     * The `lineStart` method initializes a new line segment.
     * The `point` method adds a point to the current line segment, adjusting it if necessary.
     * The `lineEnd` method finalizes the current line segment.
     * The `clean` method returns an integer indicating the cleanliness of the line segments.
     *
     * @param t - A context object with methods `lineStart`, `point`, and `lineEnd`.
     * @returns An object with methods to manage line segments.
     */
    function e(t) {
      var e, u, i, a;
      return {
        lineStart: function () {
          (i = u = !1), (a = 1);
        },
        point: function (o, c) {
          var l,
            f = [o, c],
            s = n(o, c);
          !e && (i = u = s) && t.lineStart(),
            s !== u &&
              ((l = r(e, f)),
              (Zr(e, l) || Zr(f, l)) &&
                ((f[0] += qi), (f[1] += qi), (s = n(f[0], f[1])))),
            s !== u &&
              ((a = 0),
              (u = s)
                ? (t.lineStart(), (l = r(f, e)), t.point(l[0], l[1]))
                : ((l = r(e, f)), t.point(l[0], l[1]), t.lineEnd()),
              (e = l)),
            !s || (e && Zr(e, f)) || t.point(f[0], f[1]),
            (e = f);
        },
        lineEnd: function () {
          u && t.lineEnd(), (e = null);
        },
        clean: function () {
          return a | ((i && u) << 1);
        },
      };
    }
    /**
     * Rotates a vector t by an angle n around a specified axis.
     */
    function r(t, n) {
      var e = Xr(t, 0),
        r = Xr(n, 0),
        u = [1, 0, 0],
        a = $r(e, r),
        o = Br(a, a),
        c = a[0],
        l = o - c * c;
      if (!l) return t;
      var f = (i * o) / l,
        s = (-i * c) / l,
        h = $r(u, a),
        g = Gr(u, f),
        p = Gr(a, s);
      Jr(g, p);
      var d = h,
        m = Br(g, d),
        v = Br(d, d),
        y = Math.sqrt(m * m - v * (Br(g, g) - 1)),
        M = Gr(d, (-m - y) / v);
      return Jr(M, g), Vr(M);
    }
    var u = t * zi,
      i = Math.cos(u),
      a = iu(u, 6 * zi);
    return ou(n, e, a);
  }
  /**
   * Combines two functions with optional inversion capability.
   */
  function yu(t, n) {
    /**
     * Processes input with functions t and n.
     */
    function e(e, r) {
      return (e = t(e, r)), n(e[0], e[1]);
    }
    return (
      t.invert &&
        n.invert &&
        (e.invert = function (e, r) {
          return (e = n.invert(e, r)), e && t.invert(e[0], e[1]);
        }),
      e
    );
  }
  /**
   * Returns an array containing two elements: t and n.
   */
  function Mu(t, n) {
    return [t, n];
  }
  /**
   * Generates a mapping function for a given range and value.
   */
  function bu(t, n, e) {
    var r = Ci.range(t, n - qi, e).concat(n);
    return function (t) {
      return r.map(function (n) {
        return [t, n];
      });
    };
  }
  /**
   * Maps a range of numbers to pairs with a given value.
   */
  function xu(t, n, e) {
    var r = Ci.range(t, n - qi, e).concat(n);
    return function (t) {
      return r.map(function (n) {
        return [n, t];
      });
    };
  }
  /**
   * Calculates a transformed sine value.
   */
  function _u(t) {
    return (t = Math.sin(t / 2)) * t;
  }
  /**
   * Calculates spherical coordinates and distance based on given parameters.
   */
  function wu(t, n, e, r) {
    var u = Math.cos(n),
      i = Math.sin(n),
      a = Math.cos(r),
      o = Math.sin(r),
      c = u * Math.cos(t),
      l = u * Math.sin(t),
      f = a * Math.cos(e),
      s = a * Math.sin(e),
      h = 2 * Math.asin(Math.sqrt(_u(r - n) + u * a * _u(e - t))),
      g = 1 / Math.sin(h),
      p = h
        ? function (t) {
            var n = Math.sin((t *= h)) * g,
              e = Math.sin(h - t) * g,
              r = e * c + n * f,
              u = e * l + n * s,
              a = e * i + n * o;
            return [
              Math.atan2(u, r) * Di,
              Math.atan2(a, Math.sqrt(r * r + u * u)) * Di,
            ];
          }
        : function () {
            return [t * Di, n * Di];
          };
    return (p.distance = h), p;
  }
  /**
   * Calculates and returns an array based on input parameters t and n.
   */
  function Su(t, n) {
    return [
      t / (2 * Ti),
      Math.max(
        -0.5,
        Math.min(0.5, Math.log(Math.tan(Ti / 4 + n / 2)) / (2 * Ti)),
      ),
    ];
  }
  /**
   * Generates a string representing SVG path data for a specific shape.
   */
  function ku(t) {
    return (
      "m0," +
      t +
      "a" +
      t +
      "," +
      t +
      " 0 1,1 0," +
      -2 * t +
      "a" +
      t +
      "," +
      t +
      " 0 1,1 0," +
      2 * t +
      "z"
    );
  }
  /**
   * Scales and transforms input coordinates using provided functions.
   */
  function Eu(t) {
    var n = Wr(function (n, e) {
      return t([n * Di, e * Di]);
    });
    return function (t) {
      return (
        (t = n(t)),
        {
          point: function (n, e) {
            t.point(n * zi, e * zi);
          },
          sphere: function () {
            t.sphere();
          },
          lineStart: function () {
            t.lineStart();
          },
          lineEnd: function () {
            t.lineEnd();
          },
          polygonStart: function () {
            t.polygonStart();
          },
          polygonEnd: function () {
            t.polygonEnd();
          },
        }
      );
    };
  }
  /**
   * Initializes and returns an object with methods to generate SVG path data.
   */
  function Au() {
    /**
     * Adds formatted string to array a.
     */
    function t(t, n) {
      a.push("M", t, ",", n, i);
    }
    /**
     * Adds a point to the array and updates the current point reference.
     */
    function n(t, n) {
      a.push("M", t, ",", n), (o.point = e);
    }
    /**
     * Pushes a formatted string to array `a`.
     */
    function e(t, n) {
      a.push("L", t, ",", n);
    }
    /**
     * Sets the point property of object o to value t.
     */
    function r() {
      o.point = t;
    }
    /**
     * Pushes "Z" to the array `a`.
     */
    function u() {
      a.push("Z");
    }
    var i = ku(4.5),
      a = [],
      o = {
        point: t,
        lineStart: function () {
          o.point = n;
        },
        lineEnd: r,
        polygonStart: function () {
          o.lineEnd = u;
        },
        polygonEnd: function () {
          (o.lineEnd = r), (o.point = t);
        },
        pointRadius: function (t) {
          return (i = ku(t)), o;
        },
        result: function () {
          if (a.length) {
            var t = a.join("");
            return (a = []), t;
          }
        },
      };
    return o;
  }
  /**
   * Creates a drawing context with methods for moving, drawing arcs, lines, and closing paths.
   */
  function Nu(t) {
    /**
     * Draws an arc centered at (n, e) with radius a.
     */
    function n(n, e) {
      t.moveTo(n, e), t.arc(n, e, a, 0, 2 * Ti);
    }
    /**
     * Moves to a specified point and sets the current point.
     */
    function e(n, e) {
      t.moveTo(n, e), (o.point = r);
    }
    /**
     * Moves the drawing cursor to the specified coordinates.
     */
    function r(n, e) {
      t.lineTo(n, e);
    }
    /**
     * Sets the point property of object o to variable n.
     */
    function u() {
      o.point = n;
    }
    /**
     * Closes a path in the current graphics context.
     */
    function i() {
      t.closePath();
    }
    var a = 4.5,
      o = {
        point: n,
        lineStart: function () {
          o.point = e;
        },
        lineEnd: u,
        polygonStart: function () {
          o.lineEnd = i;
        },
        polygonEnd: function () {
          (o.lineEnd = u), (o.point = n);
        },
        pointRadius: function (t) {
          return (a = t), o;
        },
        result: Pn,
      };
    return o;
  }
  /**
   * Initializes and configures point processing functions.
   */
  function Tu() {
    /**
     * Updates xo and reassigns r and u based on input values t and n.
     */
    function t(t, n) {
      (xo += u * t - r * n), (r = t), (u = n);
    }
    var n, e, r, u;
    (_o.point = function (i, a) {
      (_o.point = t), (n = r = i), (e = u = a);
    }),
      (_o.lineEnd = function () {
        t(n, e);
      });
  }
  /**
   * Updates counters and totals if a condition is met.
   */
  function qu(t, n) {
    fo || ((ho += t), (go += n), ++po);
  }
  /**
   * Initializes a point handling function for coordinate calculations.
   */
  function Cu() {
    /**
     * Updates cumulative distances and positions based on current and previous points.
     */
    function t(t, r) {
      var u = t - n,
        i = r - e,
        a = Math.sqrt(u * u + i * i);
      (ho += (a * (n + t)) / 2),
        (go += (a * (e + r)) / 2),
        (po += a),
        (n = t),
        (e = r);
    }
    var n, e;
    if (1 !== fo) {
      if (!(1 > fo)) return;
      (fo = 1), (ho = go = po = 0);
    }
    wo.point = function (r, u) {
      (wo.point = t), (n = r), (e = u);
    };
  }
  /**
   * Sets the point property of the wo object to the value of qu.
   */
  function zu() {
    wo.point = qu;
  }
  /**
   * Updates point coordinates and accumulates geometric calculations.
   */
  function Du() {
    /**
     * Updates internal state based on input values.
     */
    function t(t, n) {
      var e = u * t - r * n;
      (ho += e * (r + t)), (go += e * (u + n)), (po += 3 * e), (r = t), (u = n);
    }
    var n, e, r, u;
    2 > fo && ((fo = 2), (ho = go = po = 0)),
      (wo.point = function (i, a) {
        (wo.point = t), (n = r = i), (e = u = a);
      }),
      (wo.lineEnd = function () {
        t(n, e);
      });
  }
  /**
   * Updates the point and line end positions based on given coordinates.
   */
  function Lu() {
    /**
     * Updates rotation and position based on input values.
     */
    function t(t, n) {
      (t *= zi), (n = (n * zi) / 2 + Ti / 4);
      var e = t - r,
        a = Math.cos(n),
        o = Math.sin(n),
        c = i * o,
        l = ko,
        f = Eo,
        s = u * a + c * Math.cos(e),
        h = c * Math.sin(e);
      (ko = l * s - f * h), (Eo = f * s + l * h), (r = t), (u = a), (i = o);
    }
    var n, e, r, u, i;
    (Ao.point = function (a, o) {
      (Ao.point = t),
        (r = (n = a) * zi),
        (u = Math.cos((o = ((e = o) * zi) / 2 + Ti / 4))),
        (i = Math.sin(o));
    }),
      (Ao.lineEnd = function () {
        t(n, e);
      });
  }
  /**
   * Returns the result of invoking a function that returns the input value.
   */
  function Fu(t) {
    return Hu(function () {
      return t;
    })();
  }
  /**
   * Configures and returns a projection function for mapping geographical coordinates to screen coordinates.
   *
   * This function initializes several internal transformation functions and variables, including scaling, translating,
   * centering, and rotating the map. It also defines methods to set and get various projection properties such as
   * scale, translate, center, and rotate. The main logic involves applying transformations to input coordinates
   * and returning the projected screen coordinates.
   *
   * @param t - A function that likely initializes or updates the underlying projection model.
   * @returns A configured projection function with methods to adjust its parameters and apply transformations.
   */
  function Hu(t) {
    /**
     * Transforms input coordinates and applies scaling and translation.
     */
    function n(t) {
      return (t = a(t[0] * zi, t[1] * zi)), [t[0] * f + o, c - t[1] * f];
    }
    /**
     * Converts input coordinates using an inversion formula and scales them.
     */
    function e(t) {
      return (
        (t = a.invert((t[0] - o) / f, (c - t[1]) / f)),
        t && [t[0] * Di, t[1] * Di]
      );
    }
    /**
     * Updates variables and returns a value based on input parameters.
     */
    function r() {
      a = yu((i = Pu(d, m, v)), u);
      var t = u(g, p);
      return (o = s - t[0] * f), (c = h + t[1] * f), n;
    }
    var u,
      i,
      a,
      o,
      c,
      l = Wr(function (t, n) {
        return (t = u(t, n)), [t[0] * f + o, c - t[1] * f];
      }),
      f = 150,
      s = 480,
      h = 250,
      g = 0,
      p = 0,
      d = 0,
      m = 0,
      v = 0,
      y = vo,
      M = null;
    return (
      (n.stream = function (t) {
        return ju(i, y(l(t)));
      }),
      (n.clipAngle = function (t) {
        return arguments.length
          ? ((y = null == t ? ((M = t), vo) : vu((M = +t))), n)
          : M;
      }),
      (n.scale = function (t) {
        return arguments.length ? ((f = +t), r()) : f;
      }),
      (n.translate = function (t) {
        return arguments.length ? ((s = +t[0]), (h = +t[1]), r()) : [s, h];
      }),
      (n.center = function (t) {
        return arguments.length
          ? ((g = (t[0] % 360) * zi), (p = (t[1] % 360) * zi), r())
          : [g * Di, p * Di];
      }),
      (n.rotate = function (t) {
        return arguments.length
          ? ((d = (t[0] % 360) * zi),
            (m = (t[1] % 360) * zi),
            (v = t.length > 2 ? (t[2] % 360) * zi : 0),
            r())
          : [d * Di, m * Di, v * Di];
      }),
      Ci.rebind(n, l, "precision"),
      function () {
        return (u = t.apply(this, arguments)), (n.invert = u.invert && e), r();
      }
    );
  }
  /**
   * Wraps a projection object to transform coordinates and handle spherical geometry.
   */
  function ju(t, n) {
    return {
      point: function (e, r) {
        (r = t(e * zi, r * zi)),
          (e = r[0]),
          n.point(e > Ti ? e - 2 * Ti : -Ti > e ? e + 2 * Ti : e, r[1]);
      },
      sphere: function () {
        n.sphere();
      },
      lineStart: function () {
        n.lineStart();
      },
      lineEnd: function () {
        n.lineEnd();
      },
      polygonStart: function () {
        n.polygonStart();
      },
      polygonEnd: function () {
        n.polygonEnd();
      },
    };
  }
  /**
   * Determines the output based on the provided arguments.
   *
   * This function checks if `t` is truthy. If it is, it further checks if either `n`
   * or `e` is truthy. If so, it returns the result of `yu(Ou(t), Yu(n, e))`.
   * Otherwise, it returns the result of `Ou(t)`. If `t` is falsy, it checks if either
   * `n` or `e` is truthy and returns the result of `Yu(n, e)` in that case.
   * If both `t`, `n`, and `e` are falsy, it returns `Mu`.
   *
   * @param {*} t - The first input parameter.
   * @param {*} n - The second input parameter.
   * @param {*} e - The third input parameter.
   */
  function Pu(t, n, e) {
    return t ? (n || e ? yu(Ou(t), Yu(n, e)) : Ou(t)) : n || e ? Yu(n, e) : Mu;
  }
  /**
   * Adjusts a value by adding an offset and ensures it wraps within a specific range.
   */
  function Ru(t) {
    return function (n, e) {
      return (n += t), [n > Ti ? n - 2 * Ti : -Ti > n ? n + 2 * Ti : n, e];
    };
  }
  /**
   * Creates and returns an object with inverted properties based on input.
   */
  function Ou(t) {
    var n = Ru(t);
    return (n.invert = Ru(-t)), n;
  }
  /**
   * Calculates the transformation of coordinates based on spherical trigonometry.
   */
  function Yu(t, n) {
    /**
     * Calculates and returns an array of two angles based on input parameters t and n.
     */
    function e(t, n) {
      var e = Math.cos(n),
        o = Math.cos(t) * e,
        c = Math.sin(t) * e,
        l = Math.sin(n),
        f = l * r + o * u;
      return [
        Math.atan2(c * i - f * a, o * r - l * u),
        Math.asin(Math.max(-1, Math.min(1, f * i + c * a))),
      ];
    }
    var r = Math.cos(t),
      u = Math.sin(t),
      i = Math.cos(n),
      a = Math.sin(n);
    return (
      (e.invert = function (t, n) {
        var e = Math.cos(n),
          o = Math.cos(t) * e,
          c = Math.sin(t) * e,
          l = Math.sin(n),
          f = l * i - c * a;
        return [
          Math.atan2(c * i + l * a, o * r + f * u),
          Math.asin(Math.max(-1, Math.min(1, f * r - o * u))),
        ];
      }),
      e
    );
  }
  /**
   * Defines a function that calculates spherical coordinates based on input functions and parameters.
   */
  function Uu(t, n) {
    /**
     * Computes a transformed vector based on input angles and a transformation function t.
     */
    function e(n, e) {
      var r = Math.cos(n),
        u = Math.cos(e),
        i = t(r * u);
      return [i * u * Math.sin(n), i * Math.sin(e)];
    }
    return (
      (e.invert = function (t, e) {
        var r = Math.sqrt(t * t + e * e),
          u = n(r),
          i = Math.sin(u),
          a = Math.cos(u);
        return [Math.atan2(t * i, r * a), Math.asin(r && (e * i) / r)];
      }),
      e
    );
  }
  /**
   * Determines if a point is to the left of an edge defined by two points.
   */
  function Iu(t, n, e, r) {
    var u, i, a, o, c, l, f;
    return (
      (u = r[t]),
      (i = u[0]),
      (a = u[1]),
      (u = r[n]),
      (o = u[0]),
      (c = u[1]),
      (u = r[e]),
      (l = u[0]),
      (f = u[1]),
      (f - a) * (o - i) - (c - a) * (l - i) > 0
    );
  }
  /**
   * Determines if a point t is to the left of the line segment from n to e.
   */
  function Vu(t, n, e) {
    return (e[0] - n[0]) * (t[1] - n[1]) < (e[1] - n[1]) * (t[0] - n[0]);
  }
  /**
   * Calculates the intersection point of two lines in 2D space.
   */
  function Zu(t, n, e, r) {
    var u = t[0],
      i = e[0],
      a = n[0] - u,
      o = r[0] - i,
      c = t[1],
      l = e[1],
      f = n[1] - c,
      s = r[1] - l,
      h = (o * (c - l) - s * (u - i)) / (s * a - o * f);
    return [u + h * a, c + h * f];
  }
  /**
   * This function implements a Voronoi diagram algorithm to process an array of points and generate half-edges.
   *
   * It initializes structures to manage sites, edges, and events, then iteratively processes each site,
   * calculating bisectors and intersections. The function updates half-edge lists and handles edge endpoints,
   * ultimately invoking a callback `n` for each final edge.
   *
   * @param t - An array of points where each point is represented as an array `[x, y]`.
   * @param n - A callback function invoked with the final edges after processing.
   */
  function Xu(t, n) {
    var e = {
        list: t
          .map(function (t, n) {
            return { index: n, x: t[0], y: t[1] };
          })
          .sort(function (t, n) {
            return t.y < n.y
              ? -1
              : t.y > n.y
                ? 1
                : t.x < n.x
                  ? -1
                  : t.x > n.x
                    ? 1
                    : 0;
          }),
        bottomSite: null,
      },
      r = {
        list: [],
        leftEnd: null,
        rightEnd: null,
        init: function () {
          (r.leftEnd = r.createHalfEdge(null, "l")),
            (r.rightEnd = r.createHalfEdge(null, "l")),
            (r.leftEnd.r = r.rightEnd),
            (r.rightEnd.l = r.leftEnd),
            r.list.unshift(r.leftEnd, r.rightEnd);
        },
        createHalfEdge: function (t, n) {
          return { edge: t, side: n, vertex: null, l: null, r: null };
        },
        insert: function (t, n) {
          (n.l = t), (n.r = t.r), (t.r.l = n), (t.r = n);
        },
        leftBound: function (t) {
          var n = r.leftEnd;
          do n = n.r;
          while (n != r.rightEnd && u.rightOf(n, t));
          return (n = n.l);
        },
        del: function (t) {
          (t.l.r = t.r), (t.r.l = t.l), (t.edge = null);
        },
        right: function (t) {
          return t.r;
        },
        left: function (t) {
          return t.l;
        },
        leftRegion: function (t) {
          return null == t.edge ? e.bottomSite : t.edge.region[t.side];
        },
        rightRegion: function (t) {
          return null == t.edge ? e.bottomSite : t.edge.region[To[t.side]];
        },
      },
      u = {
        bisect: function (t, n) {
          var e = { region: { l: t, r: n }, ep: { l: null, r: null } },
            r = n.x - t.x,
            u = n.y - t.y,
            i = r > 0 ? r : -r,
            a = u > 0 ? u : -u;
          return (
            (e.c = t.x * r + t.y * u + 0.5 * (r * r + u * u)),
            i > a
              ? ((e.a = 1), (e.b = u / r), (e.c /= r))
              : ((e.b = 1), (e.a = r / u), (e.c /= u)),
            e
          );
        },
        intersect: function (t, n) {
          var e = t.edge,
            r = n.edge;
          if (!e || !r || e.region.r == r.region.r) return null;
          var u = e.a * r.b - e.b * r.a;
          if (1e-10 > Math.abs(u)) return null;
          var i,
            a,
            o = (e.c * r.b - r.c * e.b) / u,
            c = (r.c * e.a - e.c * r.a) / u,
            l = e.region.r,
            f = r.region.r;
          l.y < f.y || (l.y == f.y && l.x < f.x)
            ? ((i = t), (a = e))
            : ((i = n), (a = r));
          var s = o >= a.region.r.x;
          return (s && "l" === i.side) || (!s && "r" === i.side)
            ? null
            : { x: o, y: c };
        },
        rightOf: function (t, n) {
          var e = t.edge,
            r = e.region.r,
            u = n.x > r.x;
          if (u && "l" === t.side) return 1;
          if (!u && "r" === t.side) return 0;
          if (1 === e.a) {
            var i = n.y - r.y,
              a = n.x - r.x,
              o = 0,
              c = 0;
            if (
              ((!u && 0 > e.b) || (u && e.b >= 0)
                ? (c = o = i >= e.b * a)
                : ((c = n.x + n.y * e.b > e.c),
                  0 > e.b && (c = !c),
                  c || (o = 1)),
              !o)
            ) {
              var l = r.x - e.region.l.x;
              (c =
                e.b * (a * a - i * i) < l * i * (1 + (2 * a) / l + e.b * e.b)),
                0 > e.b && (c = !c);
            }
          } else {
            var f = e.c - e.a * n.x,
              s = n.y - f,
              h = n.x - r.x,
              g = f - r.y;
            c = s * s > h * h + g * g;
          }
          return "l" === t.side ? c : !c;
        },
        endPoint: function (t, e, r) {
          (t.ep[e] = r), t.ep[To[e]] && n(t);
        },
        distance: function (t, n) {
          var e = t.x - n.x,
            r = t.y - n.y;
          return Math.sqrt(e * e + r * r);
        },
      },
      i = {
        list: [],
        insert: function (t, n, e) {
          (t.vertex = n), (t.ystar = n.y + e);
          for (var r = 0, u = i.list, a = u.length; a > r; r++) {
            var o = u[r];
            if (
              !(t.ystar > o.ystar || (t.ystar == o.ystar && n.x > o.vertex.x))
            )
              break;
          }
          u.splice(r, 0, t);
        },
        del: function (t) {
          for (var n = 0, e = i.list, r = e.length; r > n && e[n] != t; ++n);
          e.splice(n, 1);
        },
        empty: function () {
          return 0 === i.list.length;
        },
        nextEvent: function (t) {
          for (var n = 0, e = i.list, r = e.length; r > n; ++n)
            if (e[n] == t) return e[n + 1];
          return null;
        },
        min: function () {
          var t = i.list[0];
          return { x: t.vertex.x, y: t.ystar };
        },
        extractMin: function () {
          return i.list.shift();
        },
      };
    r.init(), (e.bottomSite = e.list.shift());
    for (var a, o, c, l, f, s, h, g, p, d, m, v, y, M = e.list.shift(); ; )
      if (
        (i.empty() || (a = i.min()),
        M && (i.empty() || M.y < a.y || (M.y == a.y && M.x < a.x)))
      )
        (o = r.leftBound(M)),
          (c = r.right(o)),
          (h = r.rightRegion(o)),
          (v = u.bisect(h, M)),
          (s = r.createHalfEdge(v, "l")),
          r.insert(o, s),
          (d = u.intersect(o, s)),
          d && (i.del(o), i.insert(o, d, u.distance(d, M))),
          (o = s),
          (s = r.createHalfEdge(v, "r")),
          r.insert(o, s),
          (d = u.intersect(s, c)),
          d && i.insert(s, d, u.distance(d, M)),
          (M = e.list.shift());
      else {
        if (i.empty()) break;
        (o = i.extractMin()),
          (l = r.left(o)),
          (c = r.right(o)),
          (f = r.right(c)),
          (h = r.leftRegion(o)),
          (g = r.rightRegion(c)),
          (m = o.vertex),
          u.endPoint(o.edge, o.side, m),
          u.endPoint(c.edge, c.side, m),
          r.del(o),
          i.del(c),
          r.del(c),
          (y = "l"),
          h.y > g.y && ((p = h), (h = g), (g = p), (y = "r")),
          (v = u.bisect(h, g)),
          (s = r.createHalfEdge(v, y)),
          r.insert(l, s),
          u.endPoint(v, To[y], m),
          (d = u.intersect(l, s)),
          d && (i.del(l), i.insert(l, d, u.distance(d, h))),
          (d = u.intersect(s, f)),
          d && i.insert(s, d, u.distance(d, h));
      }
    for (o = r.right(r.leftEnd); o != r.rightEnd; o = r.right(o)) n(o.edge);
  }
  /**
   * Initializes a new object with default properties.
   */
  function Bu() {
    return { leaf: !0, nodes: [], point: null };
  }
  /**
   * Recursively applies a predicate function to sub-nodes of a given node.
   *
   * This function checks if the predicate `t` returns false for the current node
   * and its children. If false, it calculates midpoints and recursively calls itself
   * on each child node with updated bounds.
   *
   * @param {function} t - The predicate function to apply.
   * @param {Object} n - The current node being processed.
   * @param {number} e - The minimum x-coordinate of the bounding box.
   * @param {number} r - The minimum y-coordinate of the bounding box.
   * @param {number} u - The maximum x-coordinate of the bounding box.
   * @param {number} i - The maximum y-coordinate of the bounding box.
   */
  function $u(t, n, e, r, u, i) {
    if (!t(n, e, r, u, i)) {
      var a = 0.5 * (e + u),
        o = 0.5 * (r + i),
        c = n.nodes;
      c[0] && $u(t, c[0], e, r, a, o),
        c[1] && $u(t, c[1], a, r, u, o),
        c[2] && $u(t, c[2], e, o, a, i),
        c[3] && $u(t, c[3], a, o, u, i);
    }
  }
  /**
   * Initializes a date object using either a timestamp or UTC arguments.
   */
  function Ju() {
    this._ = new Date(
      arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0],
    );
  }
  /**
   * Function Gu performs pattern matching on input strings with support for wildcards.
   *
   * It iterates through each character of the string `n`, checking for matches against the string `e`.
   * If a wildcard '%' is encountered in `n`, it delegates to the function `$o[n.charAt(a++)]` to handle the wildcard logic.
   * If any mismatch occurs or if the end of `e` is reached without matching all of `n`, it returns -1.
   *
   * @param t - The first input string (unused in the provided code).
   * @param n - The pattern string containing characters and wildcards ('%').
   * @param e - The target string to match against.
   * @param r - The current position index in the target string `e`.
   * @returns The updated position index `r` if all characters in `n` are matched successfully, otherwise -1.
   */
  function Gu(t, n, e, r) {
    for (var u, i, a = 0, o = n.length, c = e.length; o > a; ) {
      if (r >= c) return -1;
      if (((u = n.charCodeAt(a++)), 37 === u)) {
        if (((i = $o[n.charAt(a++)]), !i || 0 > (r = i(t, e, r)))) return -1;
      } else if (u != e.charCodeAt(r++)) return -1;
    }
    return r;
  }
  /**
   * Creates a case-insensitive regular expression matching any of the given strings.
   */
  function Ku(t) {
    return RegExp("^(?:" + t.map(Ci.requote).join("|") + ")", "i");
  }
  /**
   * Constructs a map from lowercased keys to their original indices.
   */
  function Wu(t) {
    for (var n = new i(), e = -1, r = t.length; r > ++e; )
      n.set(t[e].toLowerCase(), e);
    return n;
  }
  /**
   * Pads a string with a specified character to reach a minimum length.
   */
  function Qu(t, n, e) {
    t += "";
    var r = t.length;
    return e > r ? Array(e - r + 1).join(n) + t : t;
  }
  /**
   * Executes a regular expression on a substring of `n` starting from index `e`.
   */
  function ti(t, n, e) {
    Yo.lastIndex = 0;
    var r = Yo.exec(n.substring(e));
    return r ? (e += r[0].length) : -1;
  }
  /**
   * Executes a regular expression on a substring of `n` starting at index `e`.
   */
  function ni(t, n, e) {
    Oo.lastIndex = 0;
    var r = Oo.exec(n.substring(e));
    return r ? (e += r[0].length) : -1;
  }
  /**
   * Updates match position and token metadata based on regex execution.
   */
  function ei(t, n, e) {
    Vo.lastIndex = 0;
    var r = Vo.exec(n.substring(e));
    return r ? ((t.m = Zo.get(r[0].toLowerCase())), (e += r[0].length)) : -1;
  }
  /**
   * Executes a regular expression on a substring and updates the match index.
   */
  function ri(t, n, e) {
    Uo.lastIndex = 0;
    var r = Uo.exec(n.substring(e));
    return r ? ((t.m = Io.get(r[0].toLowerCase())), (e += r[0].length)) : -1;
  }
  /**
   * Calls Gu with specific arguments.
   */
  function ui(t, n, e) {
    return Gu(t, "" + Bo.c, n, e);
  }
  /**
   * Calls Gu with specific arguments.
   */
  function ii(t, n, e) {
    return Gu(t, "" + Bo.x, n, e);
  }
  /**
   * Calls the Gu function with specific arguments.
   */
  function ai(t, n, e) {
    return Gu(t, "" + Bo.X, n, e);
  }
  /**
   * Parses a substring to extract a numeric value and updates the index.
   */
  function oi(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 4));
    return r ? ((t.y = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Processes a substring to extract and set year information.
   */
  function ci(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.y = li(+r[0])), (e += r[0].length)) : -1;
  }
  /**
   * Adjusts the input year by adding a century value based on its magnitude.
   */
  function li(t) {
    return t + (t > 68 ? 1900 : 2e3);
  }
  /**
   * Updates match index and advances position if pattern is found.
   */
  function fi(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.m = r[0] - 1), (e += r[0].length)) : -1;
  }
  /**
   * Updates position and date object based on substring match.
   */
  function si(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.d = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Updates the object H with a parsed value from the substring and advances the index.
   */
  function hi(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.H = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Parses a substring to extract a numeric value and updates the index.
   */
  function gi(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.M = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Updates S property and advances index if a match is found.
   */
  function pi(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 2));
    return r ? ((t.S = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Parses a numeric value from a substring and updates the offset.
   */
  function di(t, n, e) {
    Jo.lastIndex = 0;
    var r = Jo.exec(n.substring(e, e + 3));
    return r ? ((t.L = +r[0]), (e += r[0].length)) : -1;
  }
  /**
   * Retrieves a value from Go based on a substring of n, updates t.p, and returns the updated index e.
   */
  function mi(t, n, e) {
    var r = Go.get(n.substring(e, (e += 2)).toLowerCase());
    return null == r ? -1 : ((t.p = r), e);
  }
  /**
   * Converts a timezone offset to a string in GMT format.
   */
  function vi(t) {
    var n = t.getTimezoneOffset(),
      e = n > 0 ? "-" : "+",
      r = ~~(Math.abs(n) / 60),
      u = Math.abs(n) % 60;
    return e + Qu(r, "0", 2) + Qu(u, "0", 2);
  }
  /**
   * Converts a date to an ISO string.
   */
  function yi(t) {
    return t.toISOString();
  }
  /**
   * Modifies a date-like object to provide custom rounding, flooring, and other operations.
   *
   * This function extends the functionality of a date-like object `t` by adding methods for
   * custom rounding (`round`), flooring (`floor`), ceiling (`ceil`), offsetting (`offset`),
   * and generating ranges (`range`). It uses helper functions `r`, `u`, `i`, `a`, and `o`
   * to implement these operations. The function also temporarily changes the behavior of a
   * global object `qo` (presumably `Date`) during its execution.
   *
   * @param {Object} t - The date-like object to be extended with new methods.
   * @param {Function} n - A helper function that modifies the state of `t`.
   * @param {Function} e - A function that checks a condition on elements in a range.
   */
  function Mi(t, n, e) {
    /**
     * Determines the closest value to `n` that is a power of two.
     */
    function r(n) {
      var e = t(n),
        r = i(e, 1);
      return r - n > n - e ? e : r;
    }
    /**
     * Adjusts and returns a value after processing it through specific functions.
     */
    function u(e) {
      return n((e = t(new qo(e - 1))), 1), e;
    }
    /**
     * Processes and returns a modified timestamp object.
     */
    function i(t, e) {
      return n((t = new qo(+t)), e), t;
    }
    /**
     * Generates an array of dates based on given parameters.
     *
     * This function iterates from a start date up to a specified end date,
     * adding dates to the result array either by checking if they meet a certain
     * condition (if `i > 1`) or simply incrementing without checks. The iteration
     * uses helper functions `u`, `e`, and `n` to manage date conversion and
     * conditional logic.
     *
     * @param {any} t - The starting value used to initialize the start date.
     * @param {number} r - The end date limit for the iteration.
     * @param {number} i - A condition factor that determines if a date should be
     *                      checked before adding it to the result array.
     * @returns {Date[]} An array of Date objects generated within the specified range.
     */
    function a(t, r, i) {
      var a = u(t),
        o = [];
      if (i > 1) for (; r > a; ) e(a) % i || o.push(new Date(+a)), n(a, 1);
      else for (; r > a; ) o.push(new Date(+a)), n(a, 1);
      return o;
    }
    /**
     * Initializes a new Ju object and processes it with given parameters.
     */
    function o(t, n, e) {
      try {
        qo = Ju;
        var r = new Ju();
        return (r._ = t), a(r, n, e);
      } finally {
        qo = Date;
      }
    }
    (t.floor = t), (t.round = r), (t.ceil = u), (t.offset = i), (t.range = a);
    var c = (t.utc = bi(t));
    return (
      (c.floor = c),
      (c.round = bi(r)),
      (c.ceil = bi(u)),
      (c.offset = bi(i)),
      (c.range = o),
      t
    );
  }
  /**
   * Creates a function that applies a given transformation to an object and returns the result.
   */
  function bi(t) {
    return function (n, e) {
      try {
        qo = Ju;
        var r = new Ju();
        return (r._ = n), t(r, e)._;
      } finally {
        qo = Date;
      }
    };
  }
  /**
   * Creates a custom scale function with additional methods for domain manipulation and tick generation.
   *
   * This function wraps an existing scale `t` and extends it with methods to invert values, set and get the domain,
   * make the domain "nice", generate ticks, format tick marks, and create copies of the scale. It leverages helper
   * functions and arrays like `wi`, `Yn`, `_i`, `Ci.bisect`, `Wo`, `n.year`, `e[0].range`, and others to perform
   * these operations efficiently.
   *
   * @param {Function} t - The base scale function to be extended.
   * @param {Object} n - An object containing methods for different time scales (e.g., year, month).
   * @param {Function} e - A function used to format tick marks.
   */
  function xi(t, n, e) {
    /**
     * Returns the result of calling function t with the given argument n.
     */
    function r(n) {
      return t(n);
    }
    return (
      (r.invert = function (n) {
        return wi(t.invert(n));
      }),
      (r.domain = function (n) {
        return arguments.length ? (t.domain(n), r) : t.domain().map(wi);
      }),
      (r.nice = function (t) {
        return r.domain(
          Yn(r.domain(), function () {
            return t;
          }),
        );
      }),
      (r.ticks = function (e, u) {
        var i = _i(r.domain());
        if ("function" != typeof e) {
          var a = i[1] - i[0],
            o = a / e,
            c = Ci.bisect(Wo, o);
          if (c == Wo.length) return n.year(i, e);
          if (!c) return t.ticks(e).map(wi);
          Math.log(o / Wo[c - 1]) < Math.log(Wo[c] / o) && --c,
            (e = n[c]),
            (u = e[1]),
            (e = e[0].range);
        }
        return e(i[0], new Date(+i[1] + 1), u);
      }),
      (r.tickFormat = function () {
        return e;
      }),
      (r.copy = function () {
        return xi(t.copy(), n, e);
      }),
      Ci.rebind(r, t, "range", "rangeRound", "interpolate", "clamp")
    );
  }
  /**
   * Returns a sorted array containing the first and last elements of the input array.
   */
  function _i(t) {
    var n = t[0],
      e = t[t.length - 1];
    return e > n ? [n, e] : [e, n];
  }
  /**
   * Converts a timestamp to a Date object.
   */
  function wi(t) {
    return new Date(t);
  }
  /**
   * Creates a function that processes input through a series of conditions and corresponding actions.
   */
  function Si(t) {
    return function (n) {
      for (var e = t.length - 1, r = t[e]; !r[1](n); ) r = t[--e];
      return r[0](n);
    };
  }
  /**
   * Sets the year of a date object to the given year and returns it.
   */
  function ki(t) {
    var n = new Date(t, 0, 1);
    return n.setFullYear(t), n;
  }
  /**
   * Calculates a value based on the given date and its position between two fiscal years.
   */
  function Ei(t) {
    var n = t.getFullYear(),
      e = ki(n),
      r = ki(n + 1);
    return n + (t - e) / (r - e);
  }
  /**
   * Creates a date object representing the first day of the given year in UTC.
   */
  function Ai(t) {
    var n = new Date(Date.UTC(t, 0, 1));
    return n.setUTCFullYear(t), n;
  }
  /**
   * Calculates a normalized year value based on the given date.
   */
  function Ni(t) {
    var n = t.getUTCFullYear(),
      e = Ai(n),
      r = Ai(n + 1);
    return n + (t - e) / (r - e);
  }
  var Ti = Math.PI,
    qi = 1e-6,
    Ci = { version: "3.0.8" },
    zi = Ti / 180,
    Di = 180 / Ti,
    Li = document,
    Fi = window,
    Hi = ".",
    ji = ",",
    Pi = [3, 3];
  Date.now ||
    (Date.now = function () {
      return +new Date();
    });
  try {
    Li.createElement("div").style.setProperty("opacity", 0, "");
  } catch (Ri) {
    var Oi = Fi.CSSStyleDeclaration.prototype,
      Yi = Oi.setProperty;
    Oi.setProperty = function (t, n, e) {
      Yi.call(this, t, n + "", e);
    };
  }
  var Ui = u;
  try {
    Ui(Li.documentElement.childNodes)[0].nodeType;
  } catch (Ii) {
    Ui = r;
  }
  var Vi = [].__proto__
    ? function (t, n) {
        t.__proto__ = n;
      }
    : function (t, n) {
        for (var e in n) t[e] = n[e];
      };
  (Ci.map = function (t) {
    var n = new i();
    for (var e in t) n.set(e, t[e]);
    return n;
  }),
    e(i, {
      has: function (t) {
        return Zi + t in this;
      },
      get: function (t) {
        return this[Zi + t];
      },
      set: function (t, n) {
        return (this[Zi + t] = n);
      },
      remove: function (t) {
        return (t = Zi + t), t in this && delete this[t];
      },
      keys: function () {
        var t = [];
        return (
          this.forEach(function (n) {
            t.push(n);
          }),
          t
        );
      },
      values: function () {
        var t = [];
        return (
          this.forEach(function (n, e) {
            t.push(e);
          }),
          t
        );
      },
      entries: function () {
        var t = [];
        return (
          this.forEach(function (n, e) {
            t.push({ key: n, value: e });
          }),
          t
        );
      },
      forEach: function (t) {
        for (var n in this)
          n.charCodeAt(0) === Xi && t.call(this, n.substring(1), this[n]);
      },
    });
  var Zi = "\0",
    Xi = Zi.charCodeAt(0);
  (Ci.functor = c),
    (Ci.rebind = function (t, n) {
      for (var e, r = 1, u = arguments.length; u > ++r; )
        t[(e = arguments[r])] = l(t, n, n[e]);
      return t;
    }),
    (Ci.ascending = function (t, n) {
      return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0;
    }),
    (Ci.descending = function (t, n) {
      return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0;
    }),
    (Ci.mean = function (t, n) {
      var e,
        r = t.length,
        u = 0,
        i = -1,
        a = 0;
      if (1 === arguments.length)
        for (; r > ++i; ) f((e = t[i])) && (u += (e - u) / ++a);
      else
        for (; r > ++i; ) f((e = n.call(t, t[i], i))) && (u += (e - u) / ++a);
      return a ? u : void 0;
    }),
    (Ci.median = function (t, n) {
      return (
        arguments.length > 1 && (t = t.map(n)),
        (t = t.filter(f)),
        t.length ? Ci.quantile(t.sort(Ci.ascending), 0.5) : void 0
      );
    }),
    (Ci.min = function (t, n) {
      var e,
        r,
        u = -1,
        i = t.length;
      if (1 === arguments.length) {
        for (; i > ++u && (null == (e = t[u]) || e != e); ) e = void 0;
        for (; i > ++u; ) null != (r = t[u]) && e > r && (e = r);
      } else {
        for (; i > ++u && (null == (e = n.call(t, t[u], u)) || e != e); )
          e = void 0;
        for (; i > ++u; ) null != (r = n.call(t, t[u], u)) && e > r && (e = r);
      }
      return e;
    }),
    (Ci.max = function (t, n) {
      var e,
        r,
        u = -1,
        i = t.length;
      if (1 === arguments.length) {
        for (; i > ++u && (null == (e = t[u]) || e != e); ) e = void 0;
        for (; i > ++u; ) null != (r = t[u]) && r > e && (e = r);
      } else {
        for (; i > ++u && (null == (e = n.call(t, t[u], u)) || e != e); )
          e = void 0;
        for (; i > ++u; ) null != (r = n.call(t, t[u], u)) && r > e && (e = r);
      }
      return e;
    }),
    (Ci.extent = function (t, n) {
      var e,
        r,
        u,
        i = -1,
        a = t.length;
      if (1 === arguments.length) {
        for (; a > ++i && (null == (e = u = t[i]) || e != e); ) e = u = void 0;
        for (; a > ++i; )
          null != (r = t[i]) && (e > r && (e = r), r > u && (u = r));
      } else {
        for (; a > ++i && (null == (e = u = n.call(t, t[i], i)) || e != e); )
          e = void 0;
        for (; a > ++i; )
          null != (r = n.call(t, t[i], i)) &&
            (e > r && (e = r), r > u && (u = r));
      }
      return [e, u];
    }),
    (Ci.random = {
      normal: function (t, n) {
        var e = arguments.length;
        return (
          2 > e && (n = 1),
          1 > e && (t = 0),
          function () {
            var e, r, u;
            do
              (e = 2 * Math.random() - 1),
                (r = 2 * Math.random() - 1),
                (u = e * e + r * r);
            while (!u || u > 1);
            return t + n * e * Math.sqrt((-2 * Math.log(u)) / u);
          }
        );
      },
      logNormal: function () {
        var t = Ci.random.normal.apply(Ci, arguments);
        return function () {
          return Math.exp(t());
        };
      },
      irwinHall: function (t) {
        return function () {
          for (var n = 0, e = 0; t > e; e++) n += Math.random();
          return n / t;
        };
      },
    }),
    (Ci.sum = function (t, n) {
      var e,
        r = 0,
        u = t.length,
        i = -1;
      if (1 === arguments.length)
        for (; u > ++i; ) isNaN((e = +t[i])) || (r += e);
      else for (; u > ++i; ) isNaN((e = +n.call(t, t[i], i))) || (r += e);
      return r;
    }),
    (Ci.quantile = function (t, n) {
      var e = (t.length - 1) * n + 1,
        r = Math.floor(e),
        u = +t[r - 1],
        i = e - r;
      return i ? u + i * (t[r] - u) : u;
    }),
    (Ci.shuffle = function (t) {
      for (var n, e, r = t.length; r; )
        (e = 0 | (Math.random() * r--)), (n = t[r]), (t[r] = t[e]), (t[e] = n);
      return t;
    }),
    (Ci.transpose = function (t) {
      return Ci.zip.apply(Ci, t);
    }),
    (Ci.zip = function () {
      if (!(r = arguments.length)) return [];
      for (var t = -1, n = Ci.min(arguments, s), e = Array(n); n > ++t; )
        for (var r, u = -1, i = (e[t] = Array(r)); r > ++u; )
          i[u] = arguments[u][t];
      return e;
    }),
    (Ci.bisector = function (t) {
      return {
        left: function (n, e, r, u) {
          for (
            3 > arguments.length && (r = 0),
              4 > arguments.length && (u = n.length);
            u > r;

          ) {
            var i = (r + u) >>> 1;
            e > t.call(n, n[i], i) ? (r = i + 1) : (u = i);
          }
          return r;
        },
        right: function (n, e, r, u) {
          for (
            3 > arguments.length && (r = 0),
              4 > arguments.length && (u = n.length);
            u > r;

          ) {
            var i = (r + u) >>> 1;
            t.call(n, n[i], i) > e ? (u = i) : (r = i + 1);
          }
          return r;
        },
      };
    });
  var Bi = Ci.bisector(function (t) {
    return t;
  });
  (Ci.bisectLeft = Bi.left),
    (Ci.bisect = Ci.bisectRight = Bi.right),
    (Ci.nest = function () {
      /**
       * Recursively groups elements of an array based on a series of transformation functions.
       *
       * This function takes an array `n` and a list of transformation functions `a`. It applies each
       * transformation in sequence to group the elements of `n`. If all transformations have been applied,
       * it sorts or processes the array using optional callbacks `e` or `r`.
       *
       * @param {Array} n - The array to be processed.
       * @param {number} o - The index of the current transformation function in list `a`.
       */
      function t(n, o) {
        if (o >= a.length) return r ? r.call(u, n) : e ? n.sort(e) : n;
        for (
          var c, l, f, s = -1, h = n.length, g = a[o++], p = new i(), d = {};
          h > ++s;

        )
          (f = p.get((c = g((l = n[s]))))) ? f.push(l) : p.set(c, [l]);
        return (
          p.forEach(function (n, e) {
            d[n] = t(e, o);
          }),
          d
        );
      }
      /**
       * Recursively processes an object and returns a sorted array of key-value pairs.
       *
       * This function traverses the input object `t` recursively, applying sorting based on the comparator function at index `e`
       * in the global array `a`. It constructs an array of objects containing keys and their corresponding processed values.
       * If no comparator is available or all elements are processed, it returns the constructed array.
       *
       * @param {Object} t - The input object to process.
       * @param {number} e - The current index in the global array `a` used for sorting.
       */
      function n(t, e) {
        if (e >= a.length) return t;
        var r,
          u = [],
          i = o[e++];
        for (r in t) u.push({ key: r, values: n(t[r], e) });
        return (
          i &&
            u.sort(function (t, n) {
              return i(t.key, n.key);
            }),
          u
        );
      }
      var e,
        r,
        u = {},
        a = [],
        o = [];
      return (
        (u.map = function (n) {
          return t(n, 0);
        }),
        (u.entries = function (e) {
          return n(t(e, 0), 0);
        }),
        (u.key = function (t) {
          return a.push(t), u;
        }),
        (u.sortKeys = function (t) {
          return (o[a.length - 1] = t), u;
        }),
        (u.sortValues = function (t) {
          return (e = t), u;
        }),
        (u.rollup = function (t) {
          return (r = t), u;
        }),
        u
      );
    }),
    (Ci.keys = function (t) {
      var n = [];
      for (var e in t) n.push(e);
      return n;
    }),
    (Ci.values = function (t) {
      var n = [];
      for (var e in t) n.push(t[e]);
      return n;
    }),
    (Ci.entries = function (t) {
      var n = [];
      for (var e in t) n.push({ key: e, value: t[e] });
      return n;
    }),
    (Ci.permute = function (t, n) {
      for (var e = [], r = -1, u = n.length; u > ++r; ) e[r] = t[n[r]];
      return e;
    }),
    (Ci.merge = function (t) {
      return Array.prototype.concat.apply([], t);
    }),
    (Ci.range = function (t, n, e) {
      if (
        (3 > arguments.length &&
          ((e = 1), 2 > arguments.length && ((n = t), (t = 0))),
        1 / 0 === (n - t) / e)
      )
        throw Error("infinite range");
      var r,
        u = [],
        i = g(Math.abs(e)),
        a = -1;
      if (((t *= i), (n *= i), (e *= i), 0 > e))
        for (; (r = t + e * ++a) > n; ) u.push(r / i);
      else for (; n > (r = t + e * ++a); ) u.push(r / i);
      return u;
    }),
    (Ci.requote = function (t) {
      return t.replace($i, "\\$&");
    });
  var $i = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  (Ci.round = function (t, n) {
    return n ? Math.round(t * (n = Math.pow(10, n))) / n : Math.round(t);
  }),
    (Ci.xhr = function (t, n, e) {
      /**
       * Evaluates the HTTP response status and calls either the load or error method on the 'i' object.
       *
       * This function checks the HTTP status of a request stored in 'l'. If the status is within the 200-299 range,
       * or if it is exactly 304, it calls the 'load' method on 'i', passing the result of 'c.call(u, l)'. Otherwise,
       * it calls the 'error' method on 'i', passing 'l'.
       */
      function r() {
        var t = l.status;
        (!t && l.responseText) || (t >= 200 && 300 > t) || 304 === t
          ? i.load.call(u, c.call(u, l))
          : i.error.call(u, l);
      }
      var u = {},
        i = Ci.dispatch("progress", "load", "error"),
        o = {},
        c = a,
        l = new (
          Fi.XDomainRequest && /^(http(s)?:)?\/\//.test(t)
            ? XDomainRequest
            : XMLHttpRequest
        )();
      return (
        "onload" in l
          ? (l.onload = l.onerror = r)
          : (l.onreadystatechange = function () {
              l.readyState > 3 && r();
            }),
        (l.onprogress = function (t) {
          var n = Ci.event;
          Ci.event = t;
          try {
            i.progress.call(u, l);
          } finally {
            Ci.event = n;
          }
        }),
        (u.header = function (t, n) {
          return (
            (t = (t + "").toLowerCase()),
            2 > arguments.length
              ? o[t]
              : (null == n ? delete o[t] : (o[t] = n + ""), u)
          );
        }),
        (u.mimeType = function (t) {
          return arguments.length ? ((n = null == t ? null : t + ""), u) : n;
        }),
        (u.response = function (t) {
          return (c = t), u;
        }),
        ["get", "post"].forEach(function (t) {
          u[t] = function () {
            return u.send.apply(u, [t].concat(Ui(arguments)));
          };
        }),
        (u.send = function (e, r, i) {
          if (
            (2 === arguments.length &&
              "function" == typeof r &&
              ((i = r), (r = null)),
            l.open(e, t, !0),
            null == n || "accept" in o || (o.accept = n + ",*/*"),
            l.setRequestHeader)
          )
            for (var a in o) l.setRequestHeader(a, o[a]);
          return (
            null != n && l.overrideMimeType && l.overrideMimeType(n),
            null != i &&
              u.on("error", i).on("load", function (t) {
                i(null, t);
              }),
            l.send(null == r ? null : r),
            u
          );
        }),
        (u.abort = function () {
          return l.abort(), u;
        }),
        Ci.rebind(u, i, "on"),
        2 === arguments.length &&
          "function" == typeof n &&
          ((e = n), (n = null)),
        null == e ? u : u.get(p(e))
      );
    }),
    (Ci.text = function () {
      return Ci.xhr.apply(Ci, arguments).response(d);
    }),
    (Ci.json = function (t, n) {
      return Ci.xhr(t, "application/json", n).response(m);
    }),
    (Ci.html = function (t, n) {
      return Ci.xhr(t, "text/html", n).response(v);
    }),
    (Ci.xml = function () {
      return Ci.xhr.apply(Ci, arguments).response(y);
    });
  var Ji = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
  };
  (Ci.ns = {
    prefix: Ji,
    qualify: function (t) {
      var n = t.indexOf(":"),
        e = t;
      return (
        n >= 0 && ((e = t.substring(0, n)), (t = t.substring(n + 1))),
        Ji.hasOwnProperty(e) ? { space: Ji[e], local: t } : t
      );
    },
  }),
    (Ci.dispatch = function () {
      for (var t = new M(), n = -1, e = arguments.length; e > ++n; )
        t[arguments[n]] = b(t);
      return t;
    }),
    (M.prototype.on = function (t, n) {
      var e = t.indexOf("."),
        r = "";
      return (
        e > 0 && ((r = t.substring(e + 1)), (t = t.substring(0, e))),
        2 > arguments.length ? this[t].on(r) : this[t].on(r, n)
      );
    }),
    (Ci.format = function (t) {
      var n = Gi.exec(t),
        e = n[1] || " ",
        r = n[2] || ">",
        u = n[3] || "",
        i = n[4] || "",
        a = n[5],
        o = +n[6],
        c = n[7],
        l = n[8],
        f = n[9],
        s = 1,
        h = "",
        g = !1;
      switch (
        (l && (l = +l.substring(1)),
        (a || ("0" === e && "=" === r)) &&
          ((a = e = "0"), (r = "="), c && (o -= Math.floor((o - 1) / 4))),
        f)
      ) {
        case "n":
          (c = !0), (f = "g");
          break;
        case "%":
          (s = 100), (h = "%"), (f = "f");
          break;
        case "p":
          (s = 100), (h = "%"), (f = "r");
          break;
        case "b":
        case "o":
        case "x":
        case "X":
          i && (i = "0" + f.toLowerCase());
        case "c":
        case "d":
          (g = !0), (l = 0);
          break;
        case "s":
          (s = -1), (f = "r");
      }
      "#" === i && (i = ""), "r" != f || l || (f = "g"), (f = Ki.get(f) || _);
      var p = a && c;
      return function (t) {
        if (g && t % 1) return "";
        var n = 0 > t || (0 === t && 0 > 1 / t) ? ((t = -t), "-") : u;
        if (0 > s) {
          var d = Ci.formatPrefix(t, l);
          (t = d.scale(t)), (h = d.symbol);
        } else t *= s;
        (t = f(t, l)), !a && c && (t = Wi(t));
        var m = i.length + t.length + (p ? 0 : n.length),
          v = o > m ? Array((m = o - m + 1)).join(e) : "";
        return (
          p && (t = Wi(v + t)),
          Hi && t.replace(".", Hi),
          (n += i),
          ("<" === r
            ? n + t + v
            : ">" === r
              ? v + n + t
              : "^" === r
                ? v.substring(0, (m >>= 1)) + n + t + v.substring(m)
                : n + (p ? t : v + t)) + h
        );
      };
    });
  var Gi =
      /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,
    Ki = Ci.map({
      b: function (t) {
        return t.toString(2);
      },
      c: function (t) {
        return String.fromCharCode(t);
      },
      o: function (t) {
        return t.toString(8);
      },
      x: function (t) {
        return t.toString(16);
      },
      X: function (t) {
        return t.toString(16).toUpperCase();
      },
      g: function (t, n) {
        return t.toPrecision(n);
      },
      e: function (t, n) {
        return t.toExponential(n);
      },
      f: function (t, n) {
        return t.toFixed(n);
      },
      r: function (t, n) {
        return (t = Ci.round(t, x(t, n))).toFixed(
          Math.max(0, Math.min(20, x(t * (1 + 1e-15), n))),
        );
      },
    }),
    Wi = a;
  if (Pi) {
    var Qi = Pi.length;
    Wi = function (t) {
      for (
        var n = t.lastIndexOf("."),
          e = n >= 0 ? "." + t.substring(n + 1) : ((n = t.length), ""),
          r = [],
          u = 0,
          i = Pi[0];
        n > 0 && i > 0;

      )
        r.push(t.substring((n -= i), n + i)), (i = Pi[(u = (u + 1) % Qi)]);
      return r.reverse().join(ji || "") + e;
    };
  }
  var ta = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ].map(w);
  Ci.formatPrefix = function (t, n) {
    var e = 0;
    return (
      t &&
        (0 > t && (t *= -1),
        n && (t = Ci.round(t, x(t, n))),
        (e = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10)),
        (e = Math.max(
          -24,
          Math.min(24, 3 * Math.floor((0 >= e ? e + 1 : e - 1) / 3)),
        ))),
      ta[8 + e / 3]
    );
  };
  var na = function () {
      return a;
    },
    ea = Ci.map({
      linear: na,
      poly: q,
      quad: function () {
        return A;
      },
      cubic: function () {
        return N;
      },
      sin: function () {
        return C;
      },
      exp: function () {
        return z;
      },
      circle: function () {
        return D;
      },
      elastic: L,
      back: F,
      bounce: function () {
        return H;
      },
    }),
    ra = Ci.map({
      in: a,
      out: k,
      "in-out": E,
      "out-in": function (t) {
        return E(k(t));
      },
    });
  (Ci.ease = function (t) {
    var n = t.indexOf("-"),
      e = n >= 0 ? t.substring(0, n) : t,
      r = n >= 0 ? t.substring(n + 1) : "in";
    return (
      (e = ea.get(e) || na),
      (r = ra.get(r) || a),
      S(r(e.apply(null, Array.prototype.slice.call(arguments, 1))))
    );
  }),
    (Ci.event = null),
    (Ci.transform = function (t) {
      var n = Li.createElementNS(Ci.ns.prefix.svg, "g");
      return (Ci.transform = function (t) {
        n.setAttribute("transform", t);
        var e = n.transform.baseVal.consolidate();
        return new O(e ? e.matrix : ua);
      })(t);
    }),
    (O.prototype.toString = function () {
      return (
        "translate(" +
        this.translate +
        ")rotate(" +
        this.rotate +
        ")skewX(" +
        this.skew +
        ")scale(" +
        this.scale +
        ")"
      );
    });
  var ua = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  (Ci.interpolate = function (t, n) {
    for (
      var e, r = Ci.interpolators.length;
      --r >= 0 && !(e = Ci.interpolators[r](t, n));

    );
    return e;
  }),
    (Ci.interpolateNumber = function (t, n) {
      return (
        (n -= t),
        function (e) {
          return t + n * e;
        }
      );
    }),
    (Ci.interpolateRound = function (t, n) {
      return (
        (n -= t),
        function (e) {
          return Math.round(t + n * e);
        }
      );
    }),
    (Ci.interpolateString = function (t, n) {
      var e,
        r,
        u,
        i,
        a,
        o = 0,
        c = 0,
        l = [],
        f = [];
      for (ia.lastIndex = 0, r = 0; (e = ia.exec(n)); ++r)
        e.index && l.push(n.substring(o, (c = e.index))),
          f.push({ i: l.length, x: e[0] }),
          l.push(null),
          (o = ia.lastIndex);
      for (
        n.length > o && l.push(n.substring(o)), r = 0, i = f.length;
        (e = ia.exec(t)) && i > r;
        ++r
      )
        if (((a = f[r]), a.x == e[0])) {
          if (a.i)
            if (null == l[a.i + 1])
              for (l[a.i - 1] += a.x, l.splice(a.i, 1), u = r + 1; i > u; ++u)
                f[u].i--;
            else
              for (
                l[a.i - 1] += a.x + l[a.i + 1], l.splice(a.i, 2), u = r + 1;
                i > u;
                ++u
              )
                f[u].i -= 2;
          else if (null == l[a.i + 1]) l[a.i] = a.x;
          else
            for (
              l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1), u = r + 1;
              i > u;
              ++u
            )
              f[u].i--;
          f.splice(r, 1), i--, r--;
        } else a.x = Ci.interpolateNumber(parseFloat(e[0]), parseFloat(a.x));
      for (; i > r; )
        (a = f.pop()),
          null == l[a.i + 1]
            ? (l[a.i] = a.x)
            : ((l[a.i] = a.x + l[a.i + 1]), l.splice(a.i + 1, 1)),
          i--;
      return 1 === l.length
        ? null == l[0]
          ? f[0].x
          : function () {
              return n;
            }
        : function (t) {
            for (r = 0; i > r; ++r) l[(a = f[r]).i] = a.x(t);
            return l.join("");
          };
    }),
    (Ci.interpolateTransform = function (t, n) {
      var e,
        r = [],
        u = [],
        i = Ci.transform(t),
        a = Ci.transform(n),
        o = i.translate,
        c = a.translate,
        l = i.rotate,
        f = a.rotate,
        s = i.skew,
        h = a.skew,
        g = i.scale,
        p = a.scale;
      return (
        o[0] != c[0] || o[1] != c[1]
          ? (r.push("translate(", null, ",", null, ")"),
            u.push(
              { i: 1, x: Ci.interpolateNumber(o[0], c[0]) },
              { i: 3, x: Ci.interpolateNumber(o[1], c[1]) },
            ))
          : c[0] || c[1]
            ? r.push("translate(" + c + ")")
            : r.push(""),
        l != f
          ? (l - f > 180 ? (f += 360) : f - l > 180 && (l += 360),
            u.push({
              i: r.push(r.pop() + "rotate(", null, ")") - 2,
              x: Ci.interpolateNumber(l, f),
            }))
          : f && r.push(r.pop() + "rotate(" + f + ")"),
        s != h
          ? u.push({
              i: r.push(r.pop() + "skewX(", null, ")") - 2,
              x: Ci.interpolateNumber(s, h),
            })
          : h && r.push(r.pop() + "skewX(" + h + ")"),
        g[0] != p[0] || g[1] != p[1]
          ? ((e = r.push(r.pop() + "scale(", null, ",", null, ")")),
            u.push(
              { i: e - 4, x: Ci.interpolateNumber(g[0], p[0]) },
              { i: e - 2, x: Ci.interpolateNumber(g[1], p[1]) },
            ))
          : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"),
        (e = u.length),
        function (t) {
          for (var n, i = -1; e > ++i; ) r[(n = u[i]).i] = n.x(t);
          return r.join("");
        }
      );
    }),
    (Ci.interpolateRgb = function (t, n) {
      (t = Ci.rgb(t)), (n = Ci.rgb(n));
      var e = t.r,
        r = t.g,
        u = t.b,
        i = n.r - e,
        a = n.g - r,
        o = n.b - u;
      return function (t) {
        return (
          "#" +
          G(Math.round(e + i * t)) +
          G(Math.round(r + a * t)) +
          G(Math.round(u + o * t))
        );
      };
    }),
    (Ci.interpolateHsl = function (t, n) {
      (t = Ci.hsl(t)), (n = Ci.hsl(n));
      var e = t.h,
        r = t.s,
        u = t.l,
        i = n.h - e,
        a = n.s - r,
        o = n.l - u;
      return (
        i > 180 ? (i -= 360) : -180 > i && (i += 360),
        function (t) {
          return un(e + i * t, r + a * t, u + o * t) + "";
        }
      );
    }),
    (Ci.interpolateLab = function (t, n) {
      (t = Ci.lab(t)), (n = Ci.lab(n));
      var e = t.l,
        r = t.a,
        u = t.b,
        i = n.l - e,
        a = n.a - r,
        o = n.b - u;
      return function (t) {
        return sn(e + i * t, r + a * t, u + o * t) + "";
      };
    }),
    (Ci.interpolateHcl = function (t, n) {
      (t = Ci.hcl(t)), (n = Ci.hcl(n));
      var e = t.h,
        r = t.c,
        u = t.l,
        i = n.h - e,
        a = n.c - r,
        o = n.l - u;
      return (
        i > 180 ? (i -= 360) : -180 > i && (i += 360),
        function (t) {
          return cn(e + i * t, r + a * t, u + o * t) + "";
        }
      );
    }),
    (Ci.interpolateArray = function (t, n) {
      var e,
        r = [],
        u = [],
        i = t.length,
        a = n.length,
        o = Math.min(t.length, n.length);
      for (e = 0; o > e; ++e) r.push(Ci.interpolate(t[e], n[e]));
      for (; i > e; ++e) u[e] = t[e];
      for (; a > e; ++e) u[e] = n[e];
      return function (t) {
        for (e = 0; o > e; ++e) u[e] = r[e](t);
        return u;
      };
    }),
    (Ci.interpolateObject = function (t, n) {
      var e,
        r = {},
        u = {};
      for (e in t) e in n ? (r[e] = V(e)(t[e], n[e])) : (u[e] = t[e]);
      for (e in n) e in t || (u[e] = n[e]);
      return function (t) {
        for (e in r) u[e] = r[e](t);
        return u;
      };
    });
  var ia = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  (Ci.interpolators = [
    Ci.interpolateObject,
    function (t, n) {
      return n instanceof Array && Ci.interpolateArray(t, n);
    },
    function (t, n) {
      return (
        ("string" == typeof t || "string" == typeof n) &&
        Ci.interpolateString(t + "", n + "")
      );
    },
    function (t, n) {
      return (
        ("string" == typeof n
          ? oa.has(n) || /^(#|rgb\(|hsl\()/.test(n)
          : n instanceof B) && Ci.interpolateRgb(t, n)
      );
    },
    function (t, n) {
      return !isNaN((t = +t)) && !isNaN((n = +n)) && Ci.interpolateNumber(t, n);
    },
  ]),
    (B.prototype.toString = function () {
      return this.rgb() + "";
    }),
    (Ci.rgb = function (t, n, e) {
      return 1 === arguments.length
        ? t instanceof J
          ? $(t.r, t.g, t.b)
          : K("" + t, $, un)
        : $(~~t, ~~n, ~~e);
    });
  var aa = (J.prototype = new B());
  (aa.brighter = function (t) {
    t = Math.pow(0.7, arguments.length ? t : 1);
    var n = this.r,
      e = this.g,
      r = this.b,
      u = 30;
    return n || e || r
      ? (n && u > n && (n = u),
        e && u > e && (e = u),
        r && u > r && (r = u),
        $(
          Math.min(255, Math.floor(n / t)),
          Math.min(255, Math.floor(e / t)),
          Math.min(255, Math.floor(r / t)),
        ))
      : $(u, u, u);
  }),
    (aa.darker = function (t) {
      return (
        (t = Math.pow(0.7, arguments.length ? t : 1)),
        $(
          Math.floor(t * this.r),
          Math.floor(t * this.g),
          Math.floor(t * this.b),
        )
      );
    }),
    (aa.hsl = function () {
      return W(this.r, this.g, this.b);
    }),
    (aa.toString = function () {
      return "#" + G(this.r) + G(this.g) + G(this.b);
    });
  var oa = Ci.map({
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
  });
  oa.forEach(function (t, n) {
    oa.set(t, K(n, $, un));
  }),
    (Ci.hsl = function (t, n, e) {
      return 1 === arguments.length
        ? t instanceof rn
          ? en(t.h, t.s, t.l)
          : K("" + t, W, en)
        : en(+t, +n, +e);
    });
  var ca = (rn.prototype = new B());
  (ca.brighter = function (t) {
    return (
      (t = Math.pow(0.7, arguments.length ? t : 1)),
      en(this.h, this.s, this.l / t)
    );
  }),
    (ca.darker = function (t) {
      return (
        (t = Math.pow(0.7, arguments.length ? t : 1)),
        en(this.h, this.s, t * this.l)
      );
    }),
    (ca.rgb = function () {
      return un(this.h, this.s, this.l);
    }),
    (Ci.hcl = function (t, n, e) {
      return 1 === arguments.length
        ? t instanceof on
          ? an(t.h, t.c, t.l)
          : t instanceof fn
            ? hn(t.l, t.a, t.b)
            : hn((t = Q((t = Ci.rgb(t)).r, t.g, t.b)).l, t.a, t.b)
        : an(+t, +n, +e);
    });
  var la = (on.prototype = new B());
  (la.brighter = function (t) {
    return an(
      this.h,
      this.c,
      Math.min(100, this.l + fa * (arguments.length ? t : 1)),
    );
  }),
    (la.darker = function (t) {
      return an(
        this.h,
        this.c,
        Math.max(0, this.l - fa * (arguments.length ? t : 1)),
      );
    }),
    (la.rgb = function () {
      return cn(this.h, this.c, this.l).rgb();
    }),
    (Ci.lab = function (t, n, e) {
      return 1 === arguments.length
        ? t instanceof fn
          ? ln(t.l, t.a, t.b)
          : t instanceof on
            ? cn(t.l, t.c, t.h)
            : Q((t = Ci.rgb(t)).r, t.g, t.b)
        : ln(+t, +n, +e);
    });
  var fa = 18,
    sa = 0.95047,
    ha = 1,
    ga = 1.08883,
    pa = (fn.prototype = new B());
  (pa.brighter = function (t) {
    return ln(
      Math.min(100, this.l + fa * (arguments.length ? t : 1)),
      this.a,
      this.b,
    );
  }),
    (pa.darker = function (t) {
      return ln(
        Math.max(0, this.l - fa * (arguments.length ? t : 1)),
        this.a,
        this.b,
      );
    }),
    (pa.rgb = function () {
      return sn(this.l, this.a, this.b);
    });
  var da = function (t, n) {
      return n.querySelector(t);
    },
    ma = function (t, n) {
      return n.querySelectorAll(t);
    },
    va = Li.documentElement,
    ya =
      va.matchesSelector ||
      va.webkitMatchesSelector ||
      va.mozMatchesSelector ||
      va.msMatchesSelector ||
      va.oMatchesSelector,
    Ma = function (t, n) {
      return ya.call(t, n);
    };
  "function" == typeof Sizzle &&
    ((da = function (t, n) {
      return Sizzle(t, n)[0] || null;
    }),
    (ma = function (t, n) {
      return Sizzle.uniqueSort(Sizzle(t, n));
    }),
    (Ma = Sizzle.matchesSelector));
  var ba = [];
  (Ci.selection = function () {
    return xa;
  }),
    (Ci.selection.prototype = ba),
    (ba.select = function (t) {
      var n,
        e,
        r,
        u,
        i = [];
      "function" != typeof t && (t = vn(t));
      for (var a = -1, o = this.length; o > ++a; ) {
        i.push((n = [])), (n.parentNode = (r = this[a]).parentNode);
        for (var c = -1, l = r.length; l > ++c; )
          (u = r[c])
            ? (n.push((e = t.call(u, u.__data__, c))),
              e && "__data__" in u && (e.__data__ = u.__data__))
            : n.push(null);
      }
      return mn(i);
    }),
    (ba.selectAll = function (t) {
      var n,
        e,
        r = [];
      "function" != typeof t && (t = yn(t));
      for (var u = -1, i = this.length; i > ++u; )
        for (var a = this[u], o = -1, c = a.length; c > ++o; )
          (e = a[o]) &&
            (r.push((n = Ui(t.call(e, e.__data__, o)))), (n.parentNode = e));
      return mn(r);
    }),
    (ba.attr = function (t, n) {
      if (2 > arguments.length) {
        if ("string" == typeof t) {
          var e = this.node();
          return (
            (t = Ci.ns.qualify(t)),
            t.local ? e.getAttributeNS(t.space, t.local) : e.getAttribute(t)
          );
        }
        for (n in t) this.each(Mn(n, t[n]));
        return this;
      }
      return this.each(Mn(t, n));
    }),
    (ba.classed = function (t, n) {
      if (2 > arguments.length) {
        if ("string" == typeof t) {
          var e = this.node(),
            r = (t = t.trim().split(/^|\s+/g)).length,
            u = -1;
          if ((n = e.classList)) {
            for (; r > ++u; ) if (!n.contains(t[u])) return !1;
          } else
            for (
              n = e.className, null != n.baseVal && (n = n.baseVal);
              r > ++u;

            )
              if (!bn(t[u]).test(n)) return !1;
          return !0;
        }
        for (n in t) this.each(xn(n, t[n]));
        return this;
      }
      return this.each(xn(t, n));
    }),
    (ba.style = function (t, n, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof t) {
          2 > r && (n = "");
          for (e in t) this.each(wn(e, t[e], n));
          return this;
        }
        if (2 > r)
          return Fi.getComputedStyle(this.node(), null).getPropertyValue(t);
        e = "";
      }
      return this.each(wn(t, n, e));
    }),
    (ba.property = function (t, n) {
      if (2 > arguments.length) {
        if ("string" == typeof t) return this.node()[t];
        for (n in t) this.each(Sn(n, t[n]));
        return this;
      }
      return this.each(Sn(t, n));
    }),
    (ba.text = function (t) {
      return arguments.length
        ? this.each(
            "function" == typeof t
              ? function () {
                  var n = t.apply(this, arguments);
                  this.textContent = null == n ? "" : n;
                }
              : null == t
                ? function () {
                    this.textContent = "";
                  }
                : function () {
                    this.textContent = t;
                  },
          )
        : this.node().textContent;
    }),
    (ba.html = function (t) {
      return arguments.length
        ? this.each(
            "function" == typeof t
              ? function () {
                  var n = t.apply(this, arguments);
                  this.innerHTML = null == n ? "" : n;
                }
              : null == t
                ? function () {
                    this.innerHTML = "";
                  }
                : function () {
                    this.innerHTML = t;
                  },
          )
        : this.node().innerHTML;
    }),
    (ba.append = function (t) {
      /**
       * Appends a new element to the current node.
       */
      function n() {
        return this.appendChild(Li.createElementNS(this.namespaceURI, t));
      }
      /**
       * Appends a new element to the current node.
       */
      function e() {
        return this.appendChild(Li.createElementNS(t.space, t.local));
      }
      return (t = Ci.ns.qualify(t)), this.select(t.local ? e : n);
    }),
    (ba.insert = function (t, n) {
      /**
       * Inserts a new element before a reference node.
       */
      function e() {
        return this.insertBefore(
          Li.createElementNS(this.namespaceURI, t),
          da(n, this),
        );
      }
      /**
       * Inserts a new element before a specified reference node.
       */
      function r() {
        return this.insertBefore(
          Li.createElementNS(t.space, t.local),
          da(n, this),
        );
      }
      return (t = Ci.ns.qualify(t)), this.select(t.local ? r : e);
    }),
    (ba.remove = function () {
      return this.each(function () {
        var t = this.parentNode;
        t && t.removeChild(this);
      });
    }),
    (ba.data = function (t, n) {
      /**
       * Compares two arrays and updates their mappings based on a key function.
       *
       * This function processes two input arrays, `t` and `e`, to find matches based on a key function `n`.
       * It creates three arrays: `g` for matched elements from `e`, `p` for new elements from `e`, and `d` for unmatched elements from `t`.
       * If a key function is provided (`n`), it uses this function to compare elements; otherwise, it directly compares the elements.
       *
       * @param t - The first array of elements.
       * @param e - The second array of elements.
       */
      function e(t, e) {
        var r,
          u,
          a,
          o = t.length,
          s = e.length,
          h = Math.min(o, s),
          g = Array(s),
          p = Array(s),
          d = Array(o);
        if (n) {
          var m,
            v = new i(),
            y = new i(),
            M = [];
          for (r = -1; o > ++r; )
            (m = n.call((u = t[r]), u.__data__, r)),
              v.has(m) ? (d[r] = u) : v.set(m, u),
              M.push(m);
          for (r = -1; s > ++r; )
            (m = n.call(e, (a = e[r]), r)),
              (u = v.get(m))
                ? ((g[r] = u), (u.__data__ = a))
                : y.has(m) || (p[r] = kn(a)),
              y.set(m, a),
              v.remove(m);
          for (r = -1; o > ++r; ) v.has(M[r]) && (d[r] = t[r]);
        } else {
          for (r = -1; h > ++r; )
            (u = t[r]),
              (a = e[r]),
              u ? ((u.__data__ = a), (g[r] = u)) : (p[r] = kn(a));
          for (; s > r; ++r) p[r] = kn(e[r]);
          for (; o > r; ++r) d[r] = t[r];
        }
        (p.update = g),
          (p.parentNode = g.parentNode = d.parentNode = t.parentNode),
          c.push(p),
          l.push(g),
          f.push(d);
      }
      var r,
        u,
        a = -1,
        o = this.length;
      if (!arguments.length) {
        for (t = Array((o = (r = this[0]).length)); o > ++a; )
          (u = r[a]) && (t[a] = u.__data__);
        return t;
      }
      var c = qn([]),
        l = mn([]),
        f = mn([]);
      if ("function" == typeof t)
        for (; o > ++a; ) e((r = this[a]), t.call(r, r.parentNode.__data__, a));
      else for (; o > ++a; ) e((r = this[a]), t);
      return (
        (l.enter = function () {
          return c;
        }),
        (l.exit = function () {
          return f;
        }),
        l
      );
    }),
    (ba.datum = function (t) {
      return arguments.length
        ? this.property("__data__", t)
        : this.property("__data__");
    }),
    (ba.filter = function (t) {
      var n,
        e,
        r,
        u = [];
      "function" != typeof t && (t = En(t));
      for (var i = 0, a = this.length; a > i; i++) {
        u.push((n = [])), (n.parentNode = (e = this[i]).parentNode);
        for (var o = 0, c = e.length; c > o; o++)
          (r = e[o]) && t.call(r, r.__data__, o) && n.push(r);
      }
      return mn(u);
    }),
    (ba.order = function () {
      for (var t = -1, n = this.length; n > ++t; )
        for (var e, r = this[t], u = r.length - 1, i = r[u]; --u >= 0; )
          (e = r[u]) &&
            (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i),
            (i = e));
      return this;
    }),
    (ba.sort = function (t) {
      t = An.apply(this, arguments);
      for (var n = -1, e = this.length; e > ++n; ) this[n].sort(t);
      return this.order();
    }),
    (ba.on = function (t, n, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof t) {
          2 > r && (n = !1);
          for (e in t) this.each(Nn(e, t[e], n));
          return this;
        }
        if (2 > r) return (r = this.node()["__on" + t]) && r._;
        e = !1;
      }
      return this.each(Nn(t, n, e));
    }),
    (ba.each = function (t) {
      return Tn(this, function (n, e, r) {
        t.call(n, n.__data__, e, r);
      });
    }),
    (ba.call = function (t) {
      var n = Ui(arguments);
      return t.apply((n[0] = this), n), this;
    }),
    (ba.empty = function () {
      return !this.node();
    }),
    (ba.node = function () {
      for (var t = 0, n = this.length; n > t; t++)
        for (var e = this[t], r = 0, u = e.length; u > r; r++) {
          var i = e[r];
          if (i) return i;
        }
      return null;
    }),
    (ba.transition = function () {
      var t,
        n,
        e = wa || ++ka,
        r = [],
        u = Object.create(Ea);
      u.time = Date.now();
      for (var i = -1, a = this.length; a > ++i; ) {
        r.push((t = []));
        for (var o = this[i], c = -1, l = o.length; l > ++c; )
          (n = o[c]) && zn(n, c, e, u), t.push(n);
      }
      return Cn(r, e);
    });
  var xa = mn([[Li]]);
  (xa[0].parentNode = va),
    (Ci.select = function (t) {
      return "string" == typeof t ? xa.select(t) : mn([[t]]);
    }),
    (Ci.selectAll = function (t) {
      return "string" == typeof t ? xa.selectAll(t) : mn([Ui(t)]);
    });
  var _a = [];
  (Ci.selection.enter = qn),
    (Ci.selection.enter.prototype = _a),
    (_a.append = ba.append),
    (_a.insert = ba.insert),
    (_a.empty = ba.empty),
    (_a.node = ba.node),
    (_a.select = function (t) {
      for (var n, e, r, u, i, a = [], o = -1, c = this.length; c > ++o; ) {
        (r = (u = this[o]).update),
          a.push((n = [])),
          (n.parentNode = u.parentNode);
        for (var l = -1, f = u.length; f > ++l; )
          (i = u[l])
            ? (n.push((r[l] = e = t.call(u.parentNode, i.__data__, l))),
              (e.__data__ = i.__data__))
            : n.push(null);
      }
      return mn(a);
    });
  var wa,
    Sa = [],
    ka = 0,
    Ea = { ease: T, delay: 0, duration: 250 };
  (Sa.call = ba.call),
    (Sa.empty = ba.empty),
    (Sa.node = ba.node),
    (Ci.transition = function (t) {
      return arguments.length ? (wa ? t.transition() : t) : xa.transition();
    }),
    (Ci.transition.prototype = Sa),
    (Sa.select = function (t) {
      var n,
        e,
        r,
        u = this.id,
        i = [];
      "function" != typeof t && (t = vn(t));
      for (var a = -1, o = this.length; o > ++a; ) {
        i.push((n = []));
        for (var c = this[a], l = -1, f = c.length; f > ++l; )
          (r = c[l]) && (e = t.call(r, r.__data__, l))
            ? ("__data__" in r && (e.__data__ = r.__data__),
              zn(e, l, u, r.__transition__[u]),
              n.push(e))
            : n.push(null);
      }
      return Cn(i, u);
    }),
    (Sa.selectAll = function (t) {
      var n,
        e,
        r,
        u,
        i,
        a = this.id,
        o = [];
      "function" != typeof t && (t = yn(t));
      for (var c = -1, l = this.length; l > ++c; )
        for (var f = this[c], s = -1, h = f.length; h > ++s; )
          if ((r = f[s])) {
            (i = r.__transition__[a]),
              (e = t.call(r, r.__data__, s)),
              o.push((n = []));
            for (var g = -1, p = e.length; p > ++g; )
              zn((u = e[g]), g, a, i), n.push(u);
          }
      return Cn(o, a);
    }),
    (Sa.filter = function (t) {
      var n,
        e,
        r,
        u = [];
      "function" != typeof t && (t = En(t));
      for (var i = 0, a = this.length; a > i; i++) {
        u.push((n = []));
        for (var e = this[i], o = 0, c = e.length; c > o; o++)
          (r = e[o]) && t.call(r, r.__data__, o) && n.push(r);
      }
      return Cn(u, this.id, this.time).ease(this.ease());
    }),
    (Sa.attr = function (t, n) {
      /**
       * Removes an attribute from the current element.
       */
      function e() {
        this.removeAttribute(i);
      }
      /**
       * Removes an attribute from the element using a namespace and local name.
       */
      function r() {
        this.removeAttributeNS(i.space, i.local);
      }
      if (2 > arguments.length) {
        for (n in t) this.attr(n, t[n]);
        return this;
      }
      var u = V(t),
        i = Ci.ns.qualify(t);
      return Ln(this, "attr." + t, n, function (t) {
        /**
         * Checks an attribute and returns a function to update it if necessary.
         */
        function n() {
          var n,
            e = this.getAttribute(i);
          return (
            e !== t &&
            ((n = u(e, t)),
            function (t) {
              this.setAttribute(i, n(t));
            })
          );
        }
        /**
         * Returns a function to set an attribute if its current value is not equal to t.
         */
        function a() {
          var n,
            e = this.getAttributeNS(i.space, i.local);
          return (
            e !== t &&
            ((n = u(e, t)),
            function (t) {
              this.setAttributeNS(i.space, i.local, n(t));
            })
          );
        }
        return null == t ? (i.local ? r : e) : ((t += ""), i.local ? a : n);
      });
    }),
    (Sa.attrTween = function (t, n) {
      /**
       * Processes attributes and returns a function to set an attribute.
       */
      function e(t, e) {
        var r = n.call(this, t, e, this.getAttribute(u));
        return (
          r &&
          function (t) {
            this.setAttribute(u, r(t));
          }
        );
      }
      /**
       * Processes and sets an attribute based on input values.
       */
      function r(t, e) {
        var r = n.call(this, t, e, this.getAttributeNS(u.space, u.local));
        return (
          r &&
          function (t) {
            this.setAttributeNS(u.space, u.local, r(t));
          }
        );
      }
      var u = Ci.ns.qualify(t);
      return this.tween("attr." + t, u.local ? r : e);
    }),
    (Sa.style = function (t, n, e) {
      /**
       * Removes a specified CSS property from the current element's style.
       */
      function r() {
        this.style.removeProperty(t);
      }
      var u = arguments.length;
      if (3 > u) {
        if ("string" != typeof t) {
          2 > u && (n = "");
          for (e in t) this.style(e, t[e], n);
          return this;
        }
        e = "";
      }
      var i = V(t);
      return Ln(this, "style." + t, n, function (n) {
        /**
         * Checks if computed style property is different from a given value and returns a function to update it.
         */
        function u() {
          var r,
            u = Fi.getComputedStyle(this, null).getPropertyValue(t);
          return (
            u !== n &&
            ((r = i(u, n)),
            function (n) {
              this.style.setProperty(t, r(n), e);
            })
          );
        }
        return null == n ? r : ((n += ""), u);
      });
    }),
    (Sa.styleTween = function (t, n, e) {
      return (
        3 > arguments.length && (e = ""),
        this.tween("style." + t, function (r, u) {
          var i = n.call(
            this,
            r,
            u,
            Fi.getComputedStyle(this, null).getPropertyValue(t),
          );
          return (
            i &&
            function (n) {
              this.style.setProperty(t, i(n), e);
            }
          );
        })
      );
    }),
    (Sa.text = function (t) {
      return Ln(this, "text", t, Dn);
    }),
    (Sa.remove = function () {
      return this.each("end.transition", function () {
        var t;
        !this.__transition__ && (t = this.parentNode) && t.removeChild(this);
      });
    }),
    (Sa.ease = function (t) {
      var n = this.id;
      return 1 > arguments.length
        ? this.node().__transition__[n].ease
        : ("function" != typeof t && (t = Ci.ease.apply(Ci, arguments)),
          Tn(this, function (e) {
            e.__transition__[n].ease = t;
          }));
    }),
    (Sa.delay = function (t) {
      var n = this.id;
      return Tn(
        this,
        "function" == typeof t
          ? function (e, r, u) {
              e.__transition__[n].delay = 0 | t.call(e, e.__data__, r, u);
            }
          : ((t |= 0),
            function (e) {
              e.__transition__[n].delay = t;
            }),
      );
    }),
    (Sa.duration = function (t) {
      var n = this.id;
      return Tn(
        this,
        "function" == typeof t
          ? function (e, r, u) {
              e.__transition__[n].duration = Math.max(
                1,
                0 | t.call(e, e.__data__, r, u),
              );
            }
          : ((t = Math.max(1, 0 | t)),
            function (e) {
              e.__transition__[n].duration = t;
            }),
      );
    }),
    (Sa.each = function (t, n) {
      var e = this.id;
      if (2 > arguments.length) {
        var r = Ea,
          u = wa;
        (wa = e),
          Tn(this, function (n, r, u) {
            (Ea = n.__transition__[e]), t.call(n, n.__data__, r, u);
          }),
          (Ea = r),
          (wa = u);
      } else
        Tn(this, function (r) {
          r.__transition__[e].event.on(t, n);
        });
      return this;
    }),
    (Sa.transition = function () {
      for (
        var t, n, e, r, u = this.id, i = ++ka, a = [], o = 0, c = this.length;
        c > o;
        o++
      ) {
        a.push((t = []));
        for (var n = this[o], l = 0, f = n.length; f > l; l++)
          (e = n[l]) &&
            ((r = Object.create(e.__transition__[u])),
            (r.delay += r.duration),
            zn(e, l, i, r)),
            t.push(e);
      }
      return Cn(a, i);
    }),
    (Sa.tween = function (t, n) {
      var e = this.id;
      return 2 > arguments.length
        ? this.node().__transition__[e].tween.get(t)
        : Tn(
            this,
            null == n
              ? function (n) {
                  n.__transition__[e].tween.remove(t);
                }
              : function (r) {
                  r.__transition__[e].tween.set(t, n);
                },
          );
    });
  var Aa,
    Na,
    Ta = 0,
    qa = {},
    Ca = null;
  (Ci.timer = function (t, n, e) {
    if (3 > arguments.length) {
      if (2 > arguments.length) n = 0;
      else if (!isFinite(n)) return;
      e = Date.now();
    }
    var r = qa[t.id];
    r && r.callback === t
      ? ((r.then = e), (r.delay = n))
      : (qa[(t.id = ++Ta)] = Ca = { callback: t, then: e, delay: n, next: Ca }),
      Aa || ((Na = clearTimeout(Na)), (Aa = 1), za(Fn));
  }),
    (Ci.timer.flush = function () {
      for (var t, n = Date.now(), e = Ca; e; )
        (t = n - e.then), e.delay || (e.flush = e.callback(t)), (e = e.next);
      Hn();
    });
  var za =
    Fi.requestAnimationFrame ||
    Fi.webkitRequestAnimationFrame ||
    Fi.mozRequestAnimationFrame ||
    Fi.oRequestAnimationFrame ||
    Fi.msRequestAnimationFrame ||
    function (t) {
      setTimeout(t, 17);
    };
  Ci.mouse = function (t) {
    return jn(t, P());
  };
  var Da = /WebKit/.test(Fi.navigator.userAgent) ? -1 : 0;
  (Ci.touches = function (t, n) {
    return (
      2 > arguments.length && (n = P().touches),
      n
        ? Ui(n).map(function (n) {
            var e = jn(t, n);
            return (e.identifier = n.identifier), e;
          })
        : []
    );
  }),
    (Ci.scale = {}),
    (Ci.scale.linear = function () {
      return In([0, 1], [0, 1], Ci.interpolate, !1);
    }),
    (Ci.scale.log = function () {
      return Kn(Ci.scale.linear(), Wn);
    });
  var La = Ci.format(".0e");
  (Wn.pow = function (t) {
    return Math.pow(10, t);
  }),
    (Qn.pow = function (t) {
      return -Math.pow(10, -t);
    }),
    (Ci.scale.pow = function () {
      return te(Ci.scale.linear(), 1);
    }),
    (Ci.scale.sqrt = function () {
      return Ci.scale.pow().exponent(0.5);
    }),
    (Ci.scale.ordinal = function () {
      return ee([], { t: "range", a: [[]] });
    }),
    (Ci.scale.category10 = function () {
      return Ci.scale.ordinal().range(Fa);
    }),
    (Ci.scale.category20 = function () {
      return Ci.scale.ordinal().range(Ha);
    }),
    (Ci.scale.category20b = function () {
      return Ci.scale.ordinal().range(ja);
    }),
    (Ci.scale.category20c = function () {
      return Ci.scale.ordinal().range(Pa);
    });
  var Fa = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
    ],
    Ha = [
      "#1f77b4",
      "#aec7e8",
      "#ff7f0e",
      "#ffbb78",
      "#2ca02c",
      "#98df8a",
      "#d62728",
      "#ff9896",
      "#9467bd",
      "#c5b0d5",
      "#8c564b",
      "#c49c94",
      "#e377c2",
      "#f7b6d2",
      "#7f7f7f",
      "#c7c7c7",
      "#bcbd22",
      "#dbdb8d",
      "#17becf",
      "#9edae5",
    ],
    ja = [
      "#393b79",
      "#5254a3",
      "#6b6ecf",
      "#9c9ede",
      "#637939",
      "#8ca252",
      "#b5cf6b",
      "#cedb9c",
      "#8c6d31",
      "#bd9e39",
      "#e7ba52",
      "#e7cb94",
      "#843c39",
      "#ad494a",
      "#d6616b",
      "#e7969c",
      "#7b4173",
      "#a55194",
      "#ce6dbd",
      "#de9ed6",
    ],
    Pa = [
      "#3182bd",
      "#6baed6",
      "#9ecae1",
      "#c6dbef",
      "#e6550d",
      "#fd8d3c",
      "#fdae6b",
      "#fdd0a2",
      "#31a354",
      "#74c476",
      "#a1d99b",
      "#c7e9c0",
      "#756bb1",
      "#9e9ac8",
      "#bcbddc",
      "#dadaeb",
      "#636363",
      "#969696",
      "#bdbdbd",
      "#d9d9d9",
    ];
  (Ci.scale.quantile = function () {
    return re([], []);
  }),
    (Ci.scale.quantize = function () {
      return ue(0, 1, [0, 1]);
    }),
    (Ci.scale.threshold = function () {
      return ie([0.5], [0, 1]);
    }),
    (Ci.scale.identity = function () {
      return ae([0, 1]);
    }),
    (Ci.svg = {}),
    (Ci.svg.arc = function () {
      /**
       * Generates a path string based on input parameters and conditions.
       * The function calculates various trigonometric values and conditional logic to determine the final SVG path.
       * It uses helper functions `n`, `e`, `r`, and `u` to get input values, adjusts them with `Ra`, and compares them.
       * Depending on the comparison result, it constructs an SVG path string using these values and returns it.
       */
      function t() {
        var t = n.apply(this, arguments),
          i = e.apply(this, arguments),
          a = r.apply(this, arguments) + Ra,
          o = u.apply(this, arguments) + Ra,
          c = (a > o && ((c = a), (a = o), (o = c)), o - a),
          l = Ti > c ? "0" : "1",
          f = Math.cos(a),
          s = Math.sin(a),
          h = Math.cos(o),
          g = Math.sin(o);
        return c >= Oa
          ? t
            ? "M0," +
              i +
              "A" +
              i +
              "," +
              i +
              " 0 1,1 0," +
              -i +
              "A" +
              i +
              "," +
              i +
              " 0 1,1 0," +
              i +
              "M0," +
              t +
              "A" +
              t +
              "," +
              t +
              " 0 1,0 0," +
              -t +
              "A" +
              t +
              "," +
              t +
              " 0 1,0 0," +
              t +
              "Z"
            : "M0," +
              i +
              "A" +
              i +
              "," +
              i +
              " 0 1,1 0," +
              -i +
              "A" +
              i +
              "," +
              i +
              " 0 1,1 0," +
              i +
              "Z"
          : t
            ? "M" +
              i * f +
              "," +
              i * s +
              "A" +
              i +
              "," +
              i +
              " 0 " +
              l +
              ",1 " +
              i * h +
              "," +
              i * g +
              "L" +
              t * h +
              "," +
              t * g +
              "A" +
              t +
              "," +
              t +
              " 0 " +
              l +
              ",0 " +
              t * f +
              "," +
              t * s +
              "Z"
            : "M" +
              i * f +
              "," +
              i * s +
              "A" +
              i +
              "," +
              i +
              " 0 " +
              l +
              ",1 " +
              i * h +
              "," +
              i * g +
              "L0,0" +
              "Z";
      }
      var n = oe,
        e = ce,
        r = le,
        u = fe;
      return (
        (t.innerRadius = function (e) {
          return arguments.length ? ((n = c(e)), t) : n;
        }),
        (t.outerRadius = function (n) {
          return arguments.length ? ((e = c(n)), t) : e;
        }),
        (t.startAngle = function (n) {
          return arguments.length ? ((r = c(n)), t) : r;
        }),
        (t.endAngle = function (n) {
          return arguments.length ? ((u = c(n)), t) : u;
        }),
        (t.centroid = function () {
          var t = (n.apply(this, arguments) + e.apply(this, arguments)) / 2,
            i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + Ra;
          return [Math.cos(i) * t, Math.sin(i) * t];
        }),
        t
      );
    });
  var Ra = -Ti / 2,
    Oa = 2 * Ti - 1e-6;
  Ci.svg.line = function () {
    return se(a);
  };
  var Ya = Ci.map({
    linear: pe,
    "linear-closed": de,
    "step-before": me,
    "step-after": ve,
    basis: we,
    "basis-open": Se,
    "basis-closed": ke,
    bundle: Ee,
    cardinal: be,
    "cardinal-open": ye,
    "cardinal-closed": Me,
    monotone: ze,
  });
  Ya.forEach(function (t, n) {
    (n.key = t), (n.closed = /-closed$/.test(t));
  });
  var Ua = [0, 2 / 3, 1 / 3, 0],
    Ia = [0, 1 / 3, 2 / 3, 0],
    Va = [0, 1 / 6, 2 / 3, 1 / 6];
  (Ci.svg.line.radial = function () {
    var t = se(De);
    return (t.radius = t.x), delete t.x, (t.angle = t.y), delete t.y, t;
  }),
    (me.reverse = ve),
    (ve.reverse = me),
    (Ci.svg.area = function () {
      return Le(a);
    }),
    (Ci.svg.area.radial = function () {
      var t = Le(De);
      return (
        (t.radius = t.x),
        delete t.x,
        (t.innerRadius = t.x0),
        delete t.x0,
        (t.outerRadius = t.x1),
        delete t.x1,
        (t.angle = t.y),
        delete t.y,
        (t.startAngle = t.y0),
        delete t.y0,
        (t.endAngle = t.y1),
        delete t.y1,
        t
      );
    }),
    (Ci.svg.chord = function () {
      /**
       * Constructs an SVG path string based on input parameters.
       */
      function e(t, n) {
        var e = r(this, o, t, n),
          c = r(this, l, t, n);
        return (
          "M" +
          e.p0 +
          i(e.r, e.p1, e.a1 - e.a0) +
          (u(e, c)
            ? a(e.r, e.p1, e.r, e.p0)
            : a(e.r, e.p1, c.r, c.p0) +
              i(c.r, c.p1, c.a1 - c.a0) +
              a(c.r, c.p1, e.r, e.p0)) +
          "Z"
        );
      }
      /**
       * Computes and returns a set of geometric properties based on input parameters.
       */
      function r(t, n, e, r) {
        var u = n.call(t, e, r),
          i = f.call(t, u, r),
          a = s.call(t, u, r) + Ra,
          o = h.call(t, u, r) + Ra;
        return {
          r: i,
          a0: a,
          a1: o,
          p0: [i * Math.cos(a), i * Math.sin(a)],
          p1: [i * Math.cos(o), i * Math.sin(o)],
        };
      }
      /**
       * Checks if two objects have equal properties a0 and a1.
       */
      function u(t, n) {
        return t.a0 == n.a0 && t.a1 == n.a1;
      }
      /**
       * Concatenates and formats input values into a specific string pattern.
       */
      function i(t, n, e) {
        return "A" + t + "," + t + " 0 " + +(e > Ti) + ",1 " + n;
      }
      /**
       * Constructs a string in the format "Q 0,0 {r}".
       */
      function a(t, n, e, r) {
        return "Q 0,0 " + r;
      }
      var o = n,
        l = t,
        f = Fe,
        s = le,
        h = fe;
      return (
        (e.radius = function (t) {
          return arguments.length ? ((f = c(t)), e) : f;
        }),
        (e.source = function (t) {
          return arguments.length ? ((o = c(t)), e) : o;
        }),
        (e.target = function (t) {
          return arguments.length ? ((l = c(t)), e) : l;
        }),
        (e.startAngle = function (t) {
          return arguments.length ? ((s = c(t)), e) : s;
        }),
        (e.endAngle = function (t) {
          return arguments.length ? ((h = c(t)), e) : h;
        }),
        e
      );
    }),
    (Ci.svg.diagonal = function () {
      /**
       * Generates a cubic Bezier path string from two points.
       */
      function e(t, n) {
        var e = r.call(this, t, n),
          a = u.call(this, t, n),
          o = (e.y + a.y) / 2,
          c = [e, { x: e.x, y: o }, { x: a.x, y: o }, a];
        return (
          (c = c.map(i)), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]
        );
      }
      var r = n,
        u = t,
        i = He;
      return (
        (e.source = function (t) {
          return arguments.length ? ((r = c(t)), e) : r;
        }),
        (e.target = function (t) {
          return arguments.length ? ((u = c(t)), e) : u;
        }),
        (e.projection = function (t) {
          return arguments.length ? ((i = t), e) : i;
        }),
        e
      );
    }),
    (Ci.svg.diagonal.radial = function () {
      var t = Ci.svg.diagonal(),
        n = He,
        e = t.projection;
      return (
        (t.projection = function (t) {
          return arguments.length ? e(je((n = t))) : n;
        }),
        t
      );
    }),
    (Ci.svg.symbol = function () {
      /**
       * Retrieves a value from Za or defaults to Oe, then applies e with the given arguments.
       */
      function t(t, r) {
        return (Za.get(n.call(this, t, r)) || Oe)(e.call(this, t, r));
      }
      var n = Re,
        e = Pe;
      return (
        (t.type = function (e) {
          return arguments.length ? ((n = c(e)), t) : n;
        }),
        (t.size = function (n) {
          return arguments.length ? ((e = c(n)), t) : e;
        }),
        t
      );
    });
  var Za = Ci.map({
    circle: Oe,
    cross: function (t) {
      var n = Math.sqrt(t / 5) / 2;
      return (
        "M" +
        -3 * n +
        "," +
        -n +
        "H" +
        -n +
        "V" +
        -3 * n +
        "H" +
        n +
        "V" +
        -n +
        "H" +
        3 * n +
        "V" +
        n +
        "H" +
        n +
        "V" +
        3 * n +
        "H" +
        -n +
        "V" +
        n +
        "H" +
        -3 * n +
        "Z"
      );
    },
    diamond: function (t) {
      var n = Math.sqrt(t / (2 * Ba)),
        e = n * Ba;
      return "M0," + -n + "L" + e + ",0" + " 0," + n + " " + -e + ",0" + "Z";
    },
    square: function (t) {
      var n = Math.sqrt(t) / 2;
      return (
        "M" +
        -n +
        "," +
        -n +
        "L" +
        n +
        "," +
        -n +
        " " +
        n +
        "," +
        n +
        " " +
        -n +
        "," +
        n +
        "Z"
      );
    },
    "triangle-down": function (t) {
      var n = Math.sqrt(t / Xa),
        e = (n * Xa) / 2;
      return "M0," + e + "L" + n + "," + -e + " " + -n + "," + -e + "Z";
    },
    "triangle-up": function (t) {
      var n = Math.sqrt(t / Xa),
        e = (n * Xa) / 2;
      return "M0," + -e + "L" + n + "," + e + " " + -n + "," + e + "Z";
    },
  });
  Ci.svg.symbolTypes = Za.keys();
  var Xa = Math.sqrt(3),
    Ba = Math.tan(30 * zi);
  Ci.svg.axis = function () {
    /**
     * Processes each element to update ticks and domains based on specified orientation and configuration.
     *
     * This function updates minor and major ticks, as well as the domain path, based on the orientation (bottom, top, left, right)
     * and applies transformations or styling as needed. It handles transitions for entering, updating, and exiting elements
     * to ensure smooth animations and visual consistency.
     *
     * @param t - The context or selection of elements to process.
     */
    function t(t) {
      t.each(function () {
        var t,
          s = Ci.select(this),
          h = null == l ? (e.ticks ? e.ticks.apply(e, c) : e.domain()) : l,
          g =
            null == n ? (e.tickFormat ? e.tickFormat.apply(e, c) : String) : n,
          p = Ie(e, h, f),
          d = s.selectAll(".tick.minor").data(p, String),
          m = d
            .enter()
            .insert("line", ".tick")
            .attr("class", "tick minor")
            .style("opacity", 1e-6),
          v = Ci.transition(d.exit()).style("opacity", 1e-6).remove(),
          y = Ci.transition(d).style("opacity", 1),
          M = s.selectAll(".tick.major").data(h, String),
          b = M.enter()
            .insert("g", "path")
            .attr("class", "tick major")
            .style("opacity", 1e-6),
          x = Ci.transition(M.exit()).style("opacity", 1e-6).remove(),
          _ = Ci.transition(M).style("opacity", 1),
          w = On(e),
          S = s.selectAll(".domain").data([0]),
          k =
            (S.enter().append("path").attr("class", "domain"),
            Ci.transition(S)),
          E = e.copy(),
          A = this.__chart__ || E;
        (this.__chart__ = E), b.append("line"), b.append("text");
        var N = b.select("line"),
          T = _.select("line"),
          q = M.select("text").text(g),
          C = b.select("text"),
          z = _.select("text");
        switch (r) {
          case "bottom":
            (t = Ye),
              m.attr("y2", i),
              y.attr("x2", 0).attr("y2", i),
              N.attr("y2", u),
              C.attr("y", Math.max(u, 0) + o),
              T.attr("x2", 0).attr("y2", u),
              z.attr("x", 0).attr("y", Math.max(u, 0) + o),
              q.attr("dy", ".71em").style("text-anchor", "middle"),
              k.attr("d", "M" + w[0] + "," + a + "V0H" + w[1] + "V" + a);
            break;
          case "top":
            (t = Ye),
              m.attr("y2", -i),
              y.attr("x2", 0).attr("y2", -i),
              N.attr("y2", -u),
              C.attr("y", -(Math.max(u, 0) + o)),
              T.attr("x2", 0).attr("y2", -u),
              z.attr("x", 0).attr("y", -(Math.max(u, 0) + o)),
              q.attr("dy", "0em").style("text-anchor", "middle"),
              k.attr("d", "M" + w[0] + "," + -a + "V0H" + w[1] + "V" + -a);
            break;
          case "left":
            (t = Ue),
              m.attr("x2", -i),
              y.attr("x2", -i).attr("y2", 0),
              N.attr("x2", -u),
              C.attr("x", -(Math.max(u, 0) + o)),
              T.attr("x2", -u).attr("y2", 0),
              z.attr("x", -(Math.max(u, 0) + o)).attr("y", 0),
              q.attr("dy", ".32em").style("text-anchor", "end"),
              k.attr("d", "M" + -a + "," + w[0] + "H0V" + w[1] + "H" + -a);
            break;
          case "right":
            (t = Ue),
              m.attr("x2", i),
              y.attr("x2", i).attr("y2", 0),
              N.attr("x2", u),
              C.attr("x", Math.max(u, 0) + o),
              T.attr("x2", u).attr("y2", 0),
              z.attr("x", Math.max(u, 0) + o).attr("y", 0),
              q.attr("dy", ".32em").style("text-anchor", "start"),
              k.attr("d", "M" + a + "," + w[0] + "H0V" + w[1] + "H" + a);
        }
        if (e.ticks)
          b.call(t, A),
            _.call(t, E),
            x.call(t, E),
            m.call(t, A),
            y.call(t, E),
            v.call(t, E);
        else {
          var D = E.rangeBand() / 2,
            L = function (t) {
              return E(t) + D;
            };
          b.call(t, L), _.call(t, L);
        }
      });
    }
    var n,
      e = Ci.scale.linear(),
      r = $a,
      u = 6,
      i = 6,
      a = 6,
      o = 3,
      c = [10],
      l = null,
      f = 0;
    return (
      (t.scale = function (n) {
        return arguments.length ? ((e = n), t) : e;
      }),
      (t.orient = function (n) {
        return arguments.length ? ((r = n in Ja ? n + "" : $a), t) : r;
      }),
      (t.ticks = function () {
        return arguments.length ? ((c = arguments), t) : c;
      }),
      (t.tickValues = function (n) {
        return arguments.length ? ((l = n), t) : l;
      }),
      (t.tickFormat = function (e) {
        return arguments.length ? ((n = e), t) : n;
      }),
      (t.tickSize = function (n, e) {
        if (!arguments.length) return u;
        var r = arguments.length - 1;
        return (
          (u = +n), (i = r > 1 ? +e : u), (a = r > 0 ? +arguments[r] : u), t
        );
      }),
      (t.tickPadding = function (n) {
        return arguments.length ? ((o = +n), t) : o;
      }),
      (t.tickSubdivide = function (n) {
        return arguments.length ? ((f = +n), t) : f;
      }),
      t
    );
  };
  var $a = "bottom",
    Ja = { top: 1, right: 1, bottom: 1, left: 1 };
  Ci.svg.brush = function () {
    /**
     * Updates and manages brush elements within a selection.
     *
     * This function iterates over each element in the provided selection `i`,
     * updating various SVG elements such as backgrounds, extents, and resize handles.
     * It sets up event listeners for mouse and touch events, manages DOM entries and exits,
     * and applies styles based on the state of the brush (empty or not).
     *
     * The function leverages D3.js methods to manipulate SVG elements and their attributes.
     */
    function t(i) {
      i.each(function () {
        var i,
          a = Ci.select(this),
          f = a.selectAll(".background").data([0]),
          s = a.selectAll(".extent").data([0]),
          h = a.selectAll(".resize").data(l, String);
        a
          .style("pointer-events", "all")
          .on("mousedown.brush", u)
          .on("touchstart.brush", u),
          f
            .enter()
            .append("rect")
            .attr("class", "background")
            .style("visibility", "hidden")
            .style("cursor", "crosshair"),
          s
            .enter()
            .append("rect")
            .attr("class", "extent")
            .style("cursor", "move"),
          h
            .enter()
            .append("g")
            .attr("class", function (t) {
              return "resize " + t;
            })
            .style("cursor", function (t) {
              return Ga[t];
            })
            .append("rect")
            .attr("x", function (t) {
              return /[ew]$/.test(t) ? -3 : null;
            })
            .attr("y", function (t) {
              return /^[ns]/.test(t) ? -3 : null;
            })
            .attr("width", 6)
            .attr("height", 6)
            .style("visibility", "hidden"),
          h.style("display", t.empty() ? "none" : null),
          h.exit().remove(),
          o &&
            ((i = On(o)), f.attr("x", i[0]).attr("width", i[1] - i[0]), e(a)),
          c &&
            ((i = On(c)), f.attr("y", i[0]).attr("height", i[1] - i[0]), r(a)),
          n(a);
      });
    }
    /**
     * Updates the transformation attribute of resize elements based on specific conditions.
     */
    function n(t) {
      t.selectAll(".resize").attr("transform", function (t) {
        return (
          "translate(" + f[+/e$/.test(t)][0] + "," + f[+/^s/.test(t)][1] + ")"
        );
      });
    }
    /**
     * Updates the x attribute and width of selected elements in a d3 selection.
     */
    function e(t) {
      t.select(".extent").attr("x", f[0][0]),
        t.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1][0] - f[0][0]);
    }
    /**
     * Sets the y attribute of ".extent" and updates the height of ".extent,.e>rect,.w>rect".
     */
    function r(t) {
      t.select(".extent").attr("y", f[0][1]),
        t
          .selectAll(".extent,.e>rect,.w>rect")
          .attr("height", f[1][1] - f[0][1]);
    }
    /**
     * Handles brush events and updates the selection accordingly.
     *
     * This function manages various brush interactions including touch, mouse,
     * and keyboard events. It adjusts the brush position based on user input,
     * ensuring that constraints are respected and events are properly emitted.
     *
     * @returns void
     */
    function u() {
      /**
       * Retrieves touch or mouse event details based on available touches.
       */
      function u() {
        var t = Ci.event.changedTouches;
        return t ? Ci.touches(v, t)[0] : Ci.mouse(v);
      }
      /**
       * Handles a key event, adjusting position and state if necessary.
       */
      function l() {
        32 == Ci.event.keyCode &&
          (S || ((d = null), (k[0] -= f[1][0]), (k[1] -= f[1][1]), (S = 2)),
          j());
      }
      /**
       * Updates coordinates and resets state on specific key event.
       */
      function s() {
        32 == Ci.event.keyCode &&
          2 == S &&
          ((k[0] += f[1][0]), (k[1] += f[1][1]), (S = 0), j());
      }
      /**
       * Function `h` updates a brush state based on various conditions and events.
       *
       * It initializes variables, adjusts coordinates based on global state `m`, and checks for alternate key events.
       * It then determines if the brush should be moved or resized, updating its position accordingly.
       * Finally, it emits an event to notify of the brush's updated state.
       *
       * @returns void
       */
      function h() {
        var t = u(),
          i = !1;
        m && ((t[0] += m[0]), (t[1] += m[1])),
          S ||
            (Ci.event.altKey
              ? (d || (d = [(f[0][0] + f[1][0]) / 2, (f[0][1] + f[1][1]) / 2]),
                (k[0] = f[+(t[0] < d[0])][0]),
                (k[1] = f[+(t[1] < d[1])][1]))
              : (d = null)),
          _ && g(t, o, 0) && (e(b), (i = !0)),
          w && g(t, c, 1) && (r(b), (i = !0)),
          i && (n(b), M({ type: "brush", mode: S ? "move" : "resize" }));
      }
      /**
       * Adjusts and validates a range based on input parameters and existing state.
       *
       * This function calculates new bounds `r` and `u` for a given dimension `e` using inputs `t`, `n`, and `e`.
       * It considers global variables like `S`, `d`, `f`, `k`, and helper functions `On` and `Math.max/Math.min`.
       * The function updates the range if necessary and returns true if changes are made, otherwise void.
       *
       * @param {Array} t - Input array used to calculate new bounds.
       * @param {number} n - Parameter used in conjunction with `On` function to determine initial bounds.
       * @param {number} e - Dimension index for which the range is being adjusted.
       */
      function g(t, n, e) {
        var r,
          u,
          a = On(n),
          o = a[0],
          c = a[1],
          l = k[e],
          s = f[1][e] - f[0][e];
        return (
          S && ((o -= l), (c -= s + l)),
          (r = Math.max(o, Math.min(c, t[e]))),
          S
            ? (u = (r += l) + s)
            : (d && (l = Math.max(o, Math.min(c, 2 * d[e] - r))),
              r > l ? ((u = r), (r = l)) : (u = l)),
          f[0][e] !== r || f[1][e] !== u
            ? ((i = null), (f[0][e] = r), (f[1][e] = u), !0)
            : void 0
        );
      }
      /**
       * Ends the brushing process and cleans up event listeners.
       */
      function p() {
        h(),
          b
            .style("pointer-events", "all")
            .selectAll(".resize")
            .style("display", t.empty() ? "none" : null),
          Ci.select("body").style("cursor", null),
          E.on("mousemove.brush", null)
            .on("mouseup.brush", null)
            .on("touchmove.brush", null)
            .on("touchend.brush", null)
            .on("keydown.brush", null)
            .on("keyup.brush", null),
          M({ type: "brushend" }),
          j();
      }
      var d,
        m,
        v = this,
        y = Ci.select(Ci.event.target),
        M = a.of(v, arguments),
        b = Ci.select(v),
        x = y.datum(),
        _ = !/^(n|s)$/.test(x) && o,
        w = !/^(e|w)$/.test(x) && c,
        S = y.classed("extent"),
        k = u(),
        E = Ci.select(Fi)
          .on("mousemove.brush", h)
          .on("mouseup.brush", p)
          .on("touchmove.brush", h)
          .on("touchend.brush", p)
          .on("keydown.brush", l)
          .on("keyup.brush", s);
      if (S) (k[0] = f[0][0] - k[0]), (k[1] = f[0][1] - k[1]);
      else if (x) {
        var A = +/w$/.test(x),
          N = +/^n/.test(x);
        (m = [f[1 - A][0] - k[0], f[1 - N][1] - k[1]]),
          (k[0] = f[A][0]),
          (k[1] = f[N][1]);
      } else Ci.event.altKey && (d = k.slice());
      b
        .style("pointer-events", "none")
        .selectAll(".resize")
        .style("display", null),
        Ci.select("body").style("cursor", y.style("cursor")),
        M({ type: "brushstart" }),
        h(),
        j();
    }
    var i,
      a = R(t, "brushstart", "brush", "brushend"),
      o = null,
      c = null,
      l = Ka[0],
      f = [
        [0, 0],
        [0, 0],
      ];
    return (
      (t.x = function (n) {
        return arguments.length ? ((o = n), (l = Ka[(!o << 1) | !c]), t) : o;
      }),
      (t.y = function (n) {
        return arguments.length ? ((c = n), (l = Ka[(!o << 1) | !c]), t) : c;
      }),
      (t.extent = function (n) {
        var e, r, u, a, l;
        return arguments.length
          ? ((i = [
              [0, 0],
              [0, 0],
            ]),
            o &&
              ((e = n[0]),
              (r = n[1]),
              c && ((e = e[0]), (r = r[0])),
              (i[0][0] = e),
              (i[1][0] = r),
              o.invert && ((e = o(e)), (r = o(r))),
              e > r && ((l = e), (e = r), (r = l)),
              (f[0][0] = 0 | e),
              (f[1][0] = 0 | r)),
            c &&
              ((u = n[0]),
              (a = n[1]),
              o && ((u = u[1]), (a = a[1])),
              (i[0][1] = u),
              (i[1][1] = a),
              c.invert && ((u = c(u)), (a = c(a))),
              u > a && ((l = u), (u = a), (a = l)),
              (f[0][1] = 0 | u),
              (f[1][1] = 0 | a)),
            t)
          : ((n = i || f),
            o &&
              ((e = n[0][0]),
              (r = n[1][0]),
              i ||
                ((e = f[0][0]),
                (r = f[1][0]),
                o.invert && ((e = o.invert(e)), (r = o.invert(r))),
                e > r && ((l = e), (e = r), (r = l)))),
            c &&
              ((u = n[0][1]),
              (a = n[1][1]),
              i ||
                ((u = f[0][1]),
                (a = f[1][1]),
                c.invert && ((u = c.invert(u)), (a = c.invert(a))),
                u > a && ((l = u), (u = a), (a = l)))),
            o && c
              ? [
                  [e, u],
                  [r, a],
                ]
              : o
                ? [e, r]
                : c && [u, a]);
      }),
      (t.clear = function () {
        return (i = null), (f[0][0] = f[0][1] = f[1][0] = f[1][1] = 0), t;
      }),
      (t.empty = function () {
        return (o && f[0][0] === f[1][0]) || (c && f[0][1] === f[1][1]);
      }),
      Ci.rebind(t, a, "on")
    );
  };
  var Ga = {
      n: "ns-resize",
      e: "ew-resize",
      s: "ns-resize",
      w: "ew-resize",
      nw: "nwse-resize",
      ne: "nesw-resize",
      se: "nwse-resize",
      sw: "nesw-resize",
    },
    Ka = [
      ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
      ["e", "w"],
      ["n", "s"],
      [],
    ];
  (Ci.behavior = {}),
    (Ci.behavior.drag = function () {
      /**
       * Attaches event listeners for "mousedown.drag" and "touchstart.drag" events to the current object.
       */
      function t() {
        this.on("mousedown.drag", n).on("touchstart.drag", n);
      }
      /**
       * Handles drag events on an element.
       *
       * This function manages the drag interaction, including starting, moving, and ending the drag.
       * It uses event listeners to track mouse or touch movements and updates the position accordingly.
       * If a drag starts without movement, it handles click events to prevent unintended interactions.
       *
       * @param e - The initial event object triggering the drag operation.
       */
      function n() {
        /**
         * Retrieves touch or mouse event data based on the presence of a specific identifier.
         */
        function t() {
          var t = o.parentNode;
          return null != f
            ? Ci.touches(t).filter(function (t) {
                return t.identifier === f;
              })[0]
            : Ci.mouse(t);
        }
        /**
         * Handles drag event and updates position data.
         */
        function n() {
          if (!o.parentNode) return u();
          var n = t(),
            e = n[0] - s[0],
            r = n[1] - s[1];
          (h |= e | r),
            (s = n),
            j(),
            c({ type: "drag", x: n[0] + a[0], y: n[1] + a[1], dx: e, dy: r });
        }
        /**
         * Triggers a drag end event and cleans up drag-related event listeners.
         *
         * This function dispatches a "dragend" event using `c`. If `h` is true, it calls `j()` and checks if the target of the event matches `l`.
         * If they match, it attaches a one-time click listener to `g` with `i`. It then removes existing drag-related mouse or touch move and end
         * event listeners from `g`, based on whether `f` is defined.
         */
        function u() {
          c({ type: "dragend" }),
            h && (j(), Ci.event.target === l && g.on("click.drag", i, !0)),
            g
              .on(null != f ? "touchmove.drag-" + f : "mousemove.drag", null)
              .on(null != f ? "touchend.drag-" + f : "mouseup.drag", null);
        }
        /**
         * Calls function j and unbinds the 'click.drag' event on g.
         */
        function i() {
          j(), g.on("click.drag", null);
        }
        var a,
          o = this,
          c = e.of(o, arguments),
          l = Ci.event.target,
          f = Ci.event.touches ? Ci.event.changedTouches[0].identifier : null,
          s = t(),
          h = 0,
          g = Ci.select(Fi)
            .on(null != f ? "touchmove.drag-" + f : "mousemove.drag", n)
            .on(null != f ? "touchend.drag-" + f : "mouseup.drag", u, !0);
        r
          ? ((a = r.apply(o, arguments)), (a = [a.x - s[0], a.y - s[1]]))
          : (a = [0, 0]),
          null == f && j(),
          c({ type: "dragstart" });
      }
      var e = R(t, "drag", "dragstart", "dragend"),
        r = null;
      return (
        (t.origin = function (n) {
          return arguments.length ? ((r = n), t) : r;
        }),
        Ci.rebind(t, e, "on")
      );
    }),
    (Ci.behavior.zoom = function () {
      /**
       * Binds various zoom-related event listeners to an object.
       */
      function t() {
        this.on("mousedown.zoom", o)
          .on("mousemove.zoom", l)
          .on(to + ".zoom", c)
          .on("dblclick.zoom", f)
          .on("touchstart.zoom", s)
          .on("touchmove.zoom", h)
          .on("touchend.zoom", s);
      }
      /**
       * Calculates normalized coordinates based on input point and constants.
       */
      function n(t) {
        return [(t[0] - b[0]) / x, (t[1] - b[1]) / x];
      }
      /**
       * Applies a linear transformation to the input vector.
       */
      function e(t) {
        return [t[0] * x + b[0], t[1] * x + b[1]];
      }
      /**
       * Adjusts the value of `x` to be within the range defined by `_`.
       */
      function r(t) {
        x = Math.max(_[0], Math.min(_[1], t));
      }
      /**
       * Updates vector b by subtracting vector n from vector t and adds the result to b.
       */
      function u(t, n) {
        (n = e(n)), (b[0] += t[0] - n[0]), (b[1] += t[1] - n[1]);
      }
      /**
       * Updates domains of m and y based on range mappings and inversion.
       */
      function i() {
        m &&
          m.domain(
            d
              .range()
              .map(function (t) {
                return (t - b[0]) / x;
              })
              .map(d.invert),
          ),
          y &&
            y.domain(
              v
                .range()
                .map(function (t) {
                  return (t - b[1]) / x;
                })
                .map(v.invert),
            );
      }
      /**
       * Triggers an event with zoom details and prevents default action.
       */
      function a(t) {
        i(),
          Ci.event.preventDefault(),
          t({ type: "zoom", scale: x, translate: b });
      }
      /**
       * Handles zoom events and updates mouse interactions.
       */
      function o() {
        /**
         * Sets mouse state and updates elements.
         */
        function t() {
          (l = 1), u(Ci.mouse(i), s), a(o);
        }
        /**
         * Handles mouse events and conditionally attaches click event listener.
         */
        function e() {
          l && j(),
            f.on("mousemove.zoom", null).on("mouseup.zoom", null),
            l && Ci.event.target === c && f.on("click.zoom", r, !0);
        }
        /**
         * Triggers function j and removes the 'click.zoom' event listener from f.
         */
        function r() {
          j(), f.on("click.zoom", null);
        }
        var i = this,
          o = w.of(i, arguments),
          c = Ci.event.target,
          l = 0,
          f = Ci.select(Fi).on("mousemove.zoom", t).on("mouseup.zoom", e),
          s = n(Ci.mouse(i));
        Fi.focus(), j();
      }
      /**
       * Updates global variable `g` if not set, calculates and applies scaling factor, updates mouse position, and calls function `a`.
       */
      function c() {
        g || (g = n(Ci.mouse(this))),
          r(Math.pow(2, 0.002 * Wa()) * x),
          u(Ci.mouse(this), g),
          a(w.of(this, arguments));
      }
      /**
       * Resets the variable `g` to null.
       */
      function l() {
        g = null;
      }
      /**
       * Calculates and processes mouse event data.
       */
      function f() {
        var t = Ci.mouse(this),
          e = n(t),
          i = Math.log(x) / Math.LN2;
        r(
          Math.pow(2, Ci.event.shiftKey ? Math.ceil(i) - 1 : Math.floor(i) + 1),
        ),
          u(t, e),
          a(w.of(this, arguments));
      }
      /**
       * Handles touch events and performs actions based on the number of touches and timing.
       */
      function s() {
        var t = Ci.touches(this),
          e = Date.now();
        if (
          ((p = x),
          (g = {}),
          t.forEach(function (t) {
            g[t.identifier] = n(t);
          }),
          j(),
          1 === t.length)
        ) {
          if (500 > e - M) {
            var i = t[0],
              o = n(t[0]);
            r(2 * x), u(i, o), a(w.of(this, arguments));
          }
          M = e;
        }
      }
      /**
       * Handles touch events to calculate and update positions and scale.
       */
      function h() {
        var t = Ci.touches(this),
          n = t[0],
          e = g[n.identifier];
        if ((i = t[1])) {
          var i,
            o = g[i.identifier];
          (n = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2]),
            (e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2]),
            r(Ci.event.scale * p);
        }
        u(n, e), (M = null), a(w.of(this, arguments));
      }
      var g,
        p,
        d,
        m,
        v,
        y,
        M,
        b = [0, 0],
        x = 1,
        _ = Qa,
        w = R(t, "zoom");
      return (
        (t.translate = function (n) {
          return arguments.length ? ((b = n.map(Number)), i(), t) : b;
        }),
        (t.scale = function (n) {
          return arguments.length ? ((x = +n), i(), t) : x;
        }),
        (t.scaleExtent = function (n) {
          return arguments.length
            ? ((_ = null == n ? Qa : n.map(Number)), t)
            : _;
        }),
        (t.x = function (n) {
          return arguments.length
            ? ((m = n), (d = n.copy()), (b = [0, 0]), (x = 1), t)
            : m;
        }),
        (t.y = function (n) {
          return arguments.length
            ? ((y = n), (v = n.copy()), (b = [0, 0]), (x = 1), t)
            : y;
        }),
        Ci.rebind(t, w, "on")
      );
    });
  var Wa,
    Qa = [0, 1 / 0],
    to =
      "onwheel" in document
        ? ((Wa = function () {
            return -Ci.event.deltaY * (Ci.event.deltaMode ? 120 : 1);
          }),
          "wheel")
        : "onmousewheel" in document
          ? ((Wa = function () {
              return Ci.event.wheelDelta;
            }),
            "mousewheel")
          : ((Wa = function () {
              return -Ci.event.detail;
            }),
            "MozMousePixelScroll");
  (Ci.layout = {}),
    (Ci.layout.bundle = function () {
      return function (t) {
        for (var n = [], e = -1, r = t.length; r > ++e; ) n.push(Ve(t[e]));
        return n;
      };
    }),
    (Ci.layout.chord = function () {
      /**
       * Generates a complex data structure based on input parameters and sorts it according to provided comparison functions.
       *
       * The function initializes various arrays and objects, iterates through nested loops to calculate values,
       * applies sorting based on optional comparison functions, and finally constructs an array of connections between elements.
       *
       * @returns void
       */
      function t() {
        var t,
          l,
          s,
          h,
          g,
          p = {},
          d = [],
          m = Ci.range(i),
          v = [];
        for (e = [], r = [], t = 0, h = -1; i > ++h; ) {
          for (l = 0, g = -1; i > ++g; ) l += u[h][g];
          d.push(l), v.push(Ci.range(i)), (t += l);
        }
        for (
          a &&
            m.sort(function (t, n) {
              return a(d[t], d[n]);
            }),
            o &&
              v.forEach(function (t, n) {
                t.sort(function (t, e) {
                  return o(u[n][t], u[n][e]);
                });
              }),
            t = (2 * Ti - f * i) / t,
            l = 0,
            h = -1;
          i > ++h;

        ) {
          for (s = l, g = -1; i > ++g; ) {
            var y = m[h],
              M = v[y][g],
              b = u[y][M],
              x = l,
              _ = (l += b * t);
            p[y + "-" + M] = {
              index: y,
              subindex: M,
              startAngle: x,
              endAngle: _,
              value: b,
            };
          }
          (r[y] = { index: y, startAngle: s, endAngle: l, value: (l - s) / t }),
            (l += f);
        }
        for (h = -1; i > ++h; )
          for (g = h - 1; i > ++g; ) {
            var w = p[h + "-" + g],
              S = p[g + "-" + h];
            (w.value || S.value) &&
              e.push(
                w.value < S.value
                  ? { source: S, target: w }
                  : { source: w, target: S },
              );
          }
        c && n();
      }
      /**
       * Sorts array `e` based on the average of source and target values.
       */
      function n() {
        e.sort(function (t, n) {
          return c(
            (t.source.value + t.target.value) / 2,
            (n.source.value + n.target.value) / 2,
          );
        });
      }
      var e,
        r,
        u,
        i,
        a,
        o,
        c,
        l = {},
        f = 0;
      return (
        (l.matrix = function (t) {
          return arguments.length
            ? ((i = (u = t) && u.length), (e = r = null), l)
            : u;
        }),
        (l.padding = function (t) {
          return arguments.length ? ((f = t), (e = r = null), l) : f;
        }),
        (l.sortGroups = function (t) {
          return arguments.length ? ((a = t), (e = r = null), l) : a;
        }),
        (l.sortSubgroups = function (t) {
          return arguments.length ? ((o = t), (e = null), l) : o;
        }),
        (l.sortChords = function (t) {
          return arguments.length ? ((c = t), e && n(), l) : c;
        }),
        (l.chords = function () {
          return e || t(), e;
        }),
        (l.groups = function () {
          return r || t(), r;
        }),
        l
      );
    }),
    (Ci.layout.force = function () {
      /**
       * Creates a function that calculates the repulsion force between two points and updates their positions.
       *
       * This inner function takes four parameters: `n`, `e`, `r`, and `u`. It checks if the point of `n` is not equal to `t`.
       * If so, it calculates the distance between the two points and determines if the charge effect should be applied.
       * The function updates the position of `t` based on the calculated force and returns a boolean indicating whether
       * the repulsion was significant enough to modify `t`'s position.
       *
       * @param {Object} t - The target point object containing properties like `point`, `x`, `y`, `charge`, `px`, and `py`.
       */
      function t(t) {
        return function (n, e, r, u) {
          if (n.point !== t) {
            var i = n.cx - t.x,
              a = n.cy - t.y,
              o = 1 / Math.sqrt(i * i + a * a);
            if (m > (u - e) * o) {
              var c = n.charge * o * o;
              return (t.px -= i * c), (t.py -= a * c), !0;
            }
            if (n.point && isFinite(o)) {
              var c = n.pointCharge * o * o;
              (t.px -= i * c), (t.py -= a * c);
            }
          }
          return !n.charge;
        };
      }
      /**
       * Updates event coordinates and resumes a process.
       */
      function n(t) {
        (t.px = Ci.event.x), (t.py = Ci.event.y), c.resume();
      }
      var e,
        r,
        u,
        i,
        o,
        c = {},
        l = Ci.dispatch("start", "tick", "end"),
        f = [1, 1],
        s = 0.9,
        h = no,
        g = eo,
        p = -30,
        d = 0.1,
        m = 0.8,
        v = [],
        y = [];
      return (
        (c.tick = function () {
          if (0.005 > (r *= 0.99))
            return l.end({ type: "end", alpha: (r = 0) }), !0;
          var n,
            e,
            a,
            c,
            h,
            g,
            m,
            M,
            b,
            x = v.length,
            _ = y.length;
          for (e = 0; _ > e; ++e)
            (a = y[e]),
              (c = a.source),
              (h = a.target),
              (M = h.x - c.x),
              (b = h.y - c.y),
              (g = M * M + b * b) &&
                ((g = (r * i[e] * ((g = Math.sqrt(g)) - u[e])) / g),
                (M *= g),
                (b *= g),
                (h.x -= M * (m = c.weight / (h.weight + c.weight))),
                (h.y -= b * m),
                (c.x += M * (m = 1 - m)),
                (c.y += b * m));
          if ((m = r * d) && ((M = f[0] / 2), (b = f[1] / 2), (e = -1), m))
            for (; x > ++e; )
              (a = v[e]), (a.x += (M - a.x) * m), (a.y += (b - a.y) * m);
          if (p)
            for (Ke((n = Ci.geom.quadtree(v)), r, o), e = -1; x > ++e; )
              (a = v[e]).fixed || n.visit(t(a));
          for (e = -1; x > ++e; )
            (a = v[e]),
              a.fixed
                ? ((a.x = a.px), (a.y = a.py))
                : ((a.x -= (a.px - (a.px = a.x)) * s),
                  (a.y -= (a.py - (a.py = a.y)) * s));
          l.tick({ type: "tick", alpha: r });
        }),
        (c.nodes = function (t) {
          return arguments.length ? ((v = t), c) : v;
        }),
        (c.links = function (t) {
          return arguments.length ? ((y = t), c) : y;
        }),
        (c.size = function (t) {
          return arguments.length ? ((f = t), c) : f;
        }),
        (c.linkDistance = function (t) {
          return arguments.length
            ? ((h = "function" == typeof t ? t : +t), c)
            : h;
        }),
        (c.distance = c.linkDistance),
        (c.linkStrength = function (t) {
          return arguments.length
            ? ((g = "function" == typeof t ? t : +t), c)
            : g;
        }),
        (c.friction = function (t) {
          return arguments.length ? ((s = +t), c) : s;
        }),
        (c.charge = function (t) {
          return arguments.length
            ? ((p = "function" == typeof t ? t : +t), c)
            : p;
        }),
        (c.gravity = function (t) {
          return arguments.length ? ((d = +t), c) : d;
        }),
        (c.theta = function (t) {
          return arguments.length ? ((m = +t), c) : m;
        }),
        (c.alpha = function (t) {
          return arguments.length
            ? ((t = +t),
              r
                ? (r = t > 0 ? t : 0)
                : t > 0 &&
                  (l.start({ type: "start", alpha: (r = t) }),
                  Ci.timer(c.tick)),
              c)
            : r;
        }),
        (c.start = function () {
          /**
           * Retrieves a numeric value from an array or generates a random number if none is found.
           */
          function t(t, r) {
            for (var u, i = n(e), a = -1, o = i.length; o > ++a; )
              if (!isNaN((u = i[a][t]))) return u;
            return Math.random() * r;
          }
          /**
           * Initializes or updates an adjacency list and returns the neighbors of a specified node.
           */
          function n() {
            if (!a) {
              for (a = [], r = 0; s > r; ++r) a[r] = [];
              for (r = 0; d > r; ++r) {
                var t = y[r];
                a[t.source.index].push(t.target),
                  a[t.target.index].push(t.source);
              }
            }
            return a[e];
          }
          var e,
            r,
            a,
            l,
            s = v.length,
            d = y.length,
            m = f[0],
            M = f[1];
          for (e = 0; s > e; ++e) ((l = v[e]).index = e), (l.weight = 0);
          for (e = 0; d > e; ++e)
            (l = y[e]),
              "number" == typeof l.source && (l.source = v[l.source]),
              "number" == typeof l.target && (l.target = v[l.target]),
              ++l.source.weight,
              ++l.target.weight;
          for (e = 0; s > e; ++e)
            (l = v[e]),
              isNaN(l.x) && (l.x = t("x", m)),
              isNaN(l.y) && (l.y = t("y", M)),
              isNaN(l.px) && (l.px = l.x),
              isNaN(l.py) && (l.py = l.y);
          if (((u = []), "function" == typeof h))
            for (e = 0; d > e; ++e) u[e] = +h.call(this, y[e], e);
          else for (e = 0; d > e; ++e) u[e] = h;
          if (((i = []), "function" == typeof g))
            for (e = 0; d > e; ++e) i[e] = +g.call(this, y[e], e);
          else for (e = 0; d > e; ++e) i[e] = g;
          if (((o = []), "function" == typeof p))
            for (e = 0; s > e; ++e) o[e] = +p.call(this, v[e], e);
          else for (e = 0; s > e; ++e) o[e] = p;
          return c.resume();
        }),
        (c.resume = function () {
          return c.alpha(0.1);
        }),
        (c.stop = function () {
          return c.alpha(0);
        }),
        (c.drag = function () {
          return (
            e ||
              (e = Ci.behavior
                .drag()
                .origin(a)
                .on("dragstart.force", Be)
                .on("drag.force", n)
                .on("dragend.force", $e)),
            arguments.length
              ? (this.on("mouseover.force", Je)
                  .on("mouseout.force", Ge)
                  .call(e),
                void 0)
              : e
          );
        }),
        Ci.rebind(c, l, "on")
      );
    });
  var no = 20,
    eo = 1;
  (Ci.layout.partition = function () {
    /**
     * Recursively calculates and assigns layout properties to a node and its children.
     *
     * The function sets the x and y positions, as well as the dx and dy dimensions,
     * of the given node based on its depth and value. It then processes each child node,
     * recursively calling itself to set their properties, adjusting the starting position
     * for subsequent siblings based on the previous sibling's value.
     *
     * @param {Object} n - The current node to process.
     * @param {number} e - The x-coordinate of the node.
     * @param {number} r - The width available for the node.
     * @param {number} u - The height per level of depth in the tree.
     */
    function t(n, e, r, u) {
      var i = n.children;
      if (
        ((n.x = e),
        (n.y = n.depth * u),
        (n.dx = r),
        (n.dy = u),
        i && (a = i.length))
      ) {
        var a,
          o,
          c,
          l = -1;
        for (r = n.value ? r / n.value : 0; a > ++l; )
          t((o = i[l]), e, (c = o.value * r), u), (e += c);
      }
    }
    /**
     * Recursively calculates the depth of a tree-like structure.
     */
    function n(t) {
      var e = t.children,
        r = 0;
      if (e && (u = e.length))
        for (var u, i = -1; u > ++i; ) r = Math.max(r, n(e[i]));
      return 1 + r;
    }
    /**
     * Processes input and returns modified result.
     */
    function e(e, i) {
      var a = r.call(this, e, i);
      return t(a[0], 0, u[0], u[1] / n(a[0])), a;
    }
    var r = Ci.layout.hierarchy(),
      u = [1, 1];
    return (
      (e.size = function (t) {
        return arguments.length ? ((u = t), e) : u;
      }),
      lr(e, r)
    );
  }),
    (Ci.layout.pie = function () {
      /**
       * Transforms an array of data into a series of arcs with calculated angles.
       *
       * This function maps input data to numerical values, calculates start and end angles for each arc,
       * and sorts the arcs based on provided comparison logic. The resulting array contains objects representing
       * each arc's data, value, and angular range.
       */
      function t(i) {
        var a = i.map(function (e, r) {
            return +n.call(t, e, r);
          }),
          o = +("function" == typeof r ? r.apply(this, arguments) : r),
          c =
            (("function" == typeof u ? u.apply(this, arguments) : u) - r) /
            Ci.sum(a),
          l = Ci.range(i.length);
        null != e &&
          l.sort(
            e === ro
              ? function (t, n) {
                  return a[n] - a[t];
                }
              : function (t, n) {
                  return e(i[t], i[n]);
                },
          );
        var f = [];
        return (
          l.forEach(function (t) {
            var n;
            f[t] = {
              data: i[t],
              value: (n = a[t]),
              startAngle: o,
              endAngle: (o += n * c),
            };
          }),
          f
        );
      }
      var n = Number,
        e = ro,
        r = 0,
        u = 2 * Ti;
      return (
        (t.value = function (e) {
          return arguments.length ? ((n = e), t) : n;
        }),
        (t.sort = function (n) {
          return arguments.length ? ((e = n), t) : e;
        }),
        (t.startAngle = function (n) {
          return arguments.length ? ((r = n), t) : r;
        }),
        (t.endAngle = function (n) {
          return arguments.length ? ((u = n), t) : u;
        }),
        t
      );
    });
  var ro = {};
  Ci.layout.stack = function () {
    /**
     * Maps and processes elements of input arrays using various helper functions.
     */
    function t(a, c) {
      var l = a.map(function (e, r) {
          return n.call(t, e, r);
        }),
        f = l.map(function (n) {
          return n.map(function (n, e) {
            return [i.call(t, n, e), o.call(t, n, e)];
          });
        }),
        s = e.call(t, f, c);
      (l = Ci.permute(l, s)), (f = Ci.permute(f, s));
      var h,
        g,
        p,
        d = r.call(t, f, c),
        m = l.length,
        v = l[0].length;
      for (g = 0; v > g; ++g)
        for (u.call(t, l[0][g], (p = d[g]), f[0][g][1]), h = 1; m > h; ++h)
          u.call(t, l[h][g], (p += f[h - 1][g][1]), f[h][g][1]);
      return a;
    }
    var n = a,
      e = nr,
      r = er,
      u = tr,
      i = We,
      o = Qe;
    return (
      (t.values = function (e) {
        return arguments.length ? ((n = e), t) : n;
      }),
      (t.order = function (n) {
        return arguments.length
          ? ((e = "function" == typeof n ? n : uo.get(n) || nr), t)
          : e;
      }),
      (t.offset = function (n) {
        return arguments.length
          ? ((r = "function" == typeof n ? n : io.get(n) || er), t)
          : r;
      }),
      (t.x = function (n) {
        return arguments.length ? ((i = n), t) : i;
      }),
      (t.y = function (n) {
        return arguments.length ? ((o = n), t) : o;
      }),
      (t.out = function (n) {
        return arguments.length ? ((u = n), t) : u;
      }),
      t
    );
  };
  var uo = Ci.map({
      "inside-out": function (t) {
        var n,
          e,
          r = t.length,
          u = t.map(rr),
          i = t.map(ur),
          a = Ci.range(r).sort(function (t, n) {
            return u[t] - u[n];
          }),
          o = 0,
          c = 0,
          l = [],
          f = [];
        for (n = 0; r > n; ++n)
          (e = a[n]),
            c > o ? ((o += i[e]), l.push(e)) : ((c += i[e]), f.push(e));
        return f.reverse().concat(l);
      },
      reverse: function (t) {
        return Ci.range(t.length).reverse();
      },
      default: nr,
    }),
    io = Ci.map({
      silhouette: function (t) {
        var n,
          e,
          r,
          u = t.length,
          i = t[0].length,
          a = [],
          o = 0,
          c = [];
        for (e = 0; i > e; ++e) {
          for (n = 0, r = 0; u > n; n++) r += t[n][e][1];
          r > o && (o = r), a.push(r);
        }
        for (e = 0; i > e; ++e) c[e] = (o - a[e]) / 2;
        return c;
      },
      wiggle: function (t) {
        var n,
          e,
          r,
          u,
          i,
          a,
          o,
          c,
          l,
          f = t.length,
          s = t[0],
          h = s.length,
          g = [];
        for (g[0] = c = l = 0, e = 1; h > e; ++e) {
          for (n = 0, u = 0; f > n; ++n) u += t[n][e][1];
          for (n = 0, i = 0, o = s[e][0] - s[e - 1][0]; f > n; ++n) {
            for (r = 0, a = (t[n][e][1] - t[n][e - 1][1]) / (2 * o); n > r; ++r)
              a += (t[r][e][1] - t[r][e - 1][1]) / o;
            i += a * t[n][e][1];
          }
          (g[e] = c -= u ? (i / u) * o : 0), l > c && (l = c);
        }
        for (e = 0; h > e; ++e) g[e] -= l;
        return g;
      },
      expand: function (t) {
        var n,
          e,
          r,
          u = t.length,
          i = t[0].length,
          a = 1 / u,
          o = [];
        for (e = 0; i > e; ++e) {
          for (n = 0, r = 0; u > n; n++) r += t[n][e][1];
          if (r) for (n = 0; u > n; n++) t[n][e][1] /= r;
          else for (n = 0; u > n; n++) t[n][e][1] = a;
        }
        for (e = 0; i > e; ++e) o[e] = 0;
        return o;
      },
      zero: er,
    });
  (Ci.layout.histogram = function () {
    /**
     * Generates an array of objects representing intervals and their associated data points.
     *
     * This function maps input data to a transformed list, filters it based on given criteria,
     * calculates interval boundaries, and assigns weights to each interval. It then iterates over the
     * original data to populate these intervals with relevant data points that fall within their bounds.
     *
     * @param {Array} t - The input data array.
     * @param {*} i - The filter criterion used in mapping and filtering operations.
     */
    function t(t, i) {
      for (
        var a,
          o,
          c = [],
          l = t.map(e, this),
          f = r.call(this, l, i),
          s = u.call(this, f, l, i),
          i = -1,
          h = l.length,
          g = s.length - 1,
          p = n ? 1 : 1 / h;
        g > ++i;

      )
        (a = c[i] = []), (a.dx = s[i + 1] - (a.x = s[i])), (a.y = 0);
      if (g > 0)
        for (i = -1; h > ++i; )
          (o = l[i]),
            o >= f[0] &&
              f[1] >= o &&
              ((a = c[Ci.bisect(s, o, 1, g) - 1]), (a.y += p), a.push(t[i]));
      return c;
    }
    var n = !0,
      e = Number,
      r = cr,
      u = ar;
    return (
      (t.value = function (n) {
        return arguments.length ? ((e = n), t) : e;
      }),
      (t.range = function (n) {
        return arguments.length ? ((r = c(n)), t) : r;
      }),
      (t.bins = function (n) {
        return arguments.length
          ? ((u =
              "number" == typeof n
                ? function (t) {
                    return or(t, n);
                  }
                : c(n)),
            t)
          : u;
      }),
      (t.frequency = function (e) {
        return arguments.length ? ((n = !!e), t) : n;
      }),
      t
    );
  }),
    (Ci.layout.hierarchy = function () {
      /**
       * Recursively processes nodes to build a hierarchical structure with depth and value calculations.
       *
       * This function traverses a tree-like structure, assigning depths to each node and calculating their values.
       * It also manages the parent-child relationships between nodes.
       *
       * @param {Object} n - The current node being processed.
       * @param {number} a - The current depth level of the node.
       * @param {Array} o - An array used to accumulate processed nodes.
       */
      function t(n, a, o) {
        var c = u.call(e, n, a);
        if (((n.depth = a), o.push(n), c && (l = c.length))) {
          for (
            var l, f, s = -1, h = (n.children = []), g = 0, p = a + 1;
            l > ++s;

          )
            (f = t(c[s], p, o)), (f.parent = n), h.push(f), (g += f.value);
          r && h.sort(r), i && (n.value = g);
        } else i && (n.value = +i.call(e, n, a) || 0);
        return n;
      }
      /**
       * Recursively calculates the sum of values from child nodes.
       *
       * This function traverses through the children of the given node `t` and recursively sums up their values.
       * If a node has no children, it calls the function `i` to get its value. The result is accumulated in `a`.
       * Finally, if `i` is defined, it updates the value of `t` with the calculated sum.
       *
       * @param {Object} t - The current node being processed.
       * @param {number} r - The index or position of the current node.
       */
      function n(t, r) {
        var u = t.children,
          a = 0;
        if (u && (o = u.length))
          for (var o, c = -1, l = r + 1; o > ++c; ) a += n(u[c], l);
        else i && (a = +i.call(e, t, r) || 0);
        return i && (t.value = a), a;
      }
      /**
       * Initializes an array and populates it using a helper function `t`.
       */
      function e(n) {
        var e = [];
        return t(n, 0, e), e;
      }
      var r = hr,
        u = fr,
        i = sr;
      return (
        (e.sort = function (t) {
          return arguments.length ? ((r = t), e) : r;
        }),
        (e.children = function (t) {
          return arguments.length ? ((u = t), e) : u;
        }),
        (e.value = function (t) {
          return arguments.length ? ((i = t), e) : i;
        }),
        (e.revalue = function (t) {
          return n(t, 0), t;
        }),
        e
      );
    }),
    (Ci.layout.pack = function () {
      /**
       * Processes and modifies an object based on given parameters.
       */
      function t(t, u) {
        var i = n.call(this, t, u),
          a = i[0];
        (a.x = 0),
          (a.y = 0),
          Lr(a, function (t) {
            t.r = Math.sqrt(t.value);
          }),
          Lr(a, yr);
        var o = r[0],
          c = r[1],
          l = Math.max((2 * a.r) / o, (2 * a.r) / c);
        if (e > 0) {
          var f = (e * l) / 2;
          Lr(a, function (t) {
            t.r += f;
          }),
            Lr(a, yr),
            Lr(a, function (t) {
              t.r -= f;
            }),
            (l = Math.max((2 * a.r) / o, (2 * a.r) / c));
        }
        return xr(a, o / 2, c / 2, 1 / l), i;
      }
      var n = Ci.layout.hierarchy().sort(pr),
        e = 0,
        r = [1, 1];
      return (
        (t.size = function (n) {
          return arguments.length ? ((r = n), t) : r;
        }),
        (t.padding = function (n) {
          return arguments.length ? ((e = +n), t) : e;
        }),
        lr(t, n)
      );
    }),
    (Ci.layout.cluster = function () {
      /**
       * Adjusts node positions within a tree structure based on specified dimensions and alignment rules.
       *
       * This function processes each node in the provided tree, calculating its x and y coordinates
       * based on its children or position relative to previous nodes. It then scales these coordinates
       * according to given dimensions. The function leverages helper functions like `n`, `Lr`, `Sr`,
       * `wr`, `kr`, `Er`, and `e` for various calculations and iterations.
       *
       * @param {any} t - The root node or tree structure to be processed.
       * @param {any} u - Additional parameters required by the function `n`.
       */
      function t(t, u) {
        var i,
          a = n.call(this, t, u),
          o = a[0],
          c = 0;
        Lr(o, function (t) {
          var n = t.children;
          n && n.length
            ? ((t.x = Sr(n)), (t.y = wr(n)))
            : ((t.x = i ? (c += e(t, i)) : 0), (t.y = 0), (i = t));
        });
        var l = kr(o),
          f = Er(o),
          s = l.x - e(l, f) / 2,
          h = f.x + e(f, l) / 2;
        return (
          Lr(o, function (t) {
            (t.x = ((t.x - s) / (h - s)) * r[0]),
              (t.y = (1 - (o.y ? t.y / o.y : 1)) * r[1]);
          }),
          a
        );
      }
      var n = Ci.layout.hierarchy().sort(null).value(null),
        e = Ar,
        r = [1, 1];
      return (
        (t.separation = function (n) {
          return arguments.length ? ((e = n), t) : e;
        }),
        (t.size = function (n) {
          return arguments.length ? ((r = n), t) : r;
        }),
        lr(t, n)
      );
    }),
    (Ci.layout.tree = function () {
      /**
       * Reorders and positions nodes in a tree structure based on given parameters.
       *
       * This function recursively processes each node, calculating preliminary positions,
       * modifying them based on sibling relationships, and finally adjusting the coordinates
       * to fit within specified bounds. It uses helper functions to traverse and manipulate
       * the tree's structure.
       *
       * @param t - The root node of the tree.
       * @param u - Additional parameters or options for processing the tree.
       * @returns An array containing the processed nodes with updated positions.
       */
      function t(t, u) {
        /**
         * Recursively calculates and assigns preliminary positions for nodes in a tree structure.
         *
         * This function traverses the children of a given node, recursively applying the same logic to each child,
         * adjusting their preliminary positions based on sibling relationships and parent-child distances.
         * After processing all children, it updates the current node's preliminary position and modulation.
         * If there are no children, it sets the preliminary position based on the parent node.
         *
         * @param {Object} t - The current node in the tree structure.
         * @param {Object} n - The previous sibling node, used to calculate relative positions.
         */
        function i(t, n) {
          var r = t.children,
            u = t._tree;
          if (r && (a = r.length)) {
            for (var a, c, l, f = r[0], s = f, h = -1; a > ++h; )
              (l = r[h]), i(l, c), (s = o(l, c, s)), (c = l);
            Fr(t);
            var g = 0.5 * (f._tree.prelim + l._tree.prelim);
            n
              ? ((u.prelim = n._tree.prelim + e(t, n)), (u.mod = u.prelim - g))
              : (u.prelim = g);
          } else n && (u.prelim = n._tree.prelim + e(t, n));
        }
        /**
         * Adjusts the x position of nodes and recursively processes their children.
         */
        function a(t, n) {
          t.x = t._tree.prelim + n;
          var e = t.children;
          if (e && (r = e.length)) {
            var r,
              u = -1;
            for (n += t._tree.mod; r > ++u; ) a(e[u], n);
          }
        }
        /**
         * Adjusts the positions of nodes in a tree structure to ensure proper alignment and spacing.
         * Iterates through sibling nodes, updating their preliminary positions based on their modifiers.
         * Handles threading when necessary to maintain the hierarchical layout.
         *
         * @param {Object} t - The current node in the iteration.
         * @param {Object} n - The next sibling node to process.
         * @param {Object} r - A reference point for alignment adjustments.
         * @returns {Object} - The adjusted reference point after processing all nodes.
         */
        function o(t, n, r) {
          if (n) {
            for (
              var u,
                i = t,
                a = t,
                o = n,
                c = t.parent.children[0],
                l = i._tree.mod,
                f = a._tree.mod,
                s = o._tree.mod,
                h = c._tree.mod;
              (o = Tr(o)), (i = Nr(i)), o && i;

            )
              (c = Nr(c)),
                (a = Tr(a)),
                (a._tree.ancestor = t),
                (u = o._tree.prelim + s - i._tree.prelim - l + e(o, i)),
                u > 0 && (Hr(jr(o, t, r), t, u), (l += u), (f += u)),
                (s += o._tree.mod),
                (l += i._tree.mod),
                (h += c._tree.mod),
                (f += a._tree.mod);
            o && !Tr(a) && ((a._tree.thread = o), (a._tree.mod += s - f)),
              i &&
                !Nr(c) &&
                ((c._tree.thread = i), (c._tree.mod += l - h), (r = t));
          }
          return r;
        }
        var c = n.call(this, t, u),
          l = c[0];
        Lr(l, function (t, n) {
          t._tree = {
            ancestor: t,
            prelim: 0,
            mod: 0,
            change: 0,
            shift: 0,
            number: n ? n._tree.number + 1 : 0,
          };
        }),
          i(l),
          a(l, -l._tree.prelim);
        var f = qr(l, zr),
          s = qr(l, Cr),
          h = qr(l, Dr),
          g = f.x - e(f, s) / 2,
          p = s.x + e(s, f) / 2,
          d = h.depth || 1;
        return (
          Lr(l, function (t) {
            (t.x = ((t.x - g) / (p - g)) * r[0]),
              (t.y = (t.depth / d) * r[1]),
              delete t._tree;
          }),
          c
        );
      }
      var n = Ci.layout.hierarchy().sort(null).value(null),
        e = Ar,
        r = [1, 1];
      return (
        (t.separation = function (n) {
          return arguments.length ? ((e = n), t) : e;
        }),
        (t.size = function (n) {
          return arguments.length ? ((r = n), t) : r;
        }),
        lr(t, n)
      );
    }),
    (Ci.layout.treemap = function () {
      /**
       * Updates the area property of each element in an array based on a given multiplier.
       *
       * The function iterates over each element in the input array `t`. For each element,
       * it calculates the product of the element's value and the multiplier `n`. If the
       * result is NaN or non-positive, the area is set to 0; otherwise, the calculated
       * value is assigned to the area property of the element.
       *
       * @param {Array} t - An array of objects with a 'value' property.
       * @param {number} n - A multiplier used to calculate the area.
       */
      function t(t, n) {
        for (var e, r, u = -1, i = t.length; i > ++u; )
          (r = (e = t[u]).value * (0 > n ? 0 : n)),
            (e.area = isNaN(r) || 0 >= r ? 0 : r);
      }
      /**
       * Recursively processes each child node of a given element to arrange them in a layout based on specified parameters.
       *
       * This function calculates the dimensions and arrangement of child elements within a parent element. It uses different tiling methods like slice, dice, slice-dice, or squarify to optimize the space utilization. The function iteratively processes each child, updating the layout until all children are arranged.
       *
       * @param e - The parent element containing child nodes to be processed.
       */
      function n(e) {
        var i = e.children;
        if (i && i.length) {
          var a,
            o,
            c,
            l = s(e),
            f = [],
            h = i.slice(),
            p = 1 / 0,
            d =
              "slice" === g
                ? l.dx
                : "dice" === g
                  ? l.dy
                  : "slice-dice" === g
                    ? 1 & e.depth
                      ? l.dy
                      : l.dx
                    : Math.min(l.dx, l.dy);
          for (t(h, (l.dx * l.dy) / e.value), f.area = 0; (c = h.length) > 0; )
            f.push((a = h[c - 1])),
              (f.area += a.area),
              "squarify" !== g || p >= (o = r(f, d))
                ? (h.pop(), (p = o))
                : ((f.area -= f.pop().area),
                  u(f, d, l, !1),
                  (d = Math.min(l.dx, l.dy)),
                  (f.length = f.area = 0),
                  (p = 1 / 0));
          f.length && (u(f, d, l, !0), (f.length = f.area = 0)), i.forEach(n);
        }
      }
      /**
       * Processes and recursively computes layout for a node's children.
       *
       * This function handles the hierarchical layout of child nodes within a given parent node `n`.
       * It calculates dimensions, areas, and recursively applies the same logic to each child.
       * The function uses auxiliary functions like `s`, `t`, and `u` to perform specific calculations
       * related to positioning and area management. It ensures that each child's layout is computed
       * based on its parent's value and dimensions.
       *
       * @param {Object} n - The parent node containing children to be processed.
       */
      function e(n) {
        var r = n.children;
        if (r && r.length) {
          var i,
            a = s(n),
            o = r.slice(),
            c = [];
          for (t(o, (a.dx * a.dy) / n.value), c.area = 0; (i = o.pop()); )
            c.push(i),
              (c.area += i.area),
              null != i.z &&
                (u(c, i.z ? a.dx : a.dy, a, !o.length),
                (c.length = c.area = 0));
          r.forEach(e);
        }
      }
      /**
       * Calculates a ratio based on areas and a constant factor.
       *
       * This function iterates over an array of objects, each with an 'area' property,
       * to find the maximum and minimum areas. It then computes a ratio involving these
       * extreme areas, the square of the input parameters `t` and `n`, and a constant `p`.
       * If `t.area` is zero, it returns Infinity.
       *
       * @param {Object[]} t - An array of objects, each with an 'area' property.
       * @param {number} n - A numerical value used in the ratio calculation.
       */
      function r(t, n) {
        for (
          var e, r = t.area, u = 0, i = 1 / 0, a = -1, o = t.length;
          o > ++a;

        )
          (e = t[a].area) && (i > e && (i = e), e > u && (u = e));
        return (
          (r *= r),
          (n *= n),
          r ? Math.max((n * u * p) / r, r / (n * i * p)) : 1 / 0
        );
      }
      /**
       * Adjusts the dimensions and positions of elements in a given array based on constraints.
       *
       * This function iterates over an array of objects, adjusting their `x`, `y`, `dx`, and `dy` properties
       * based on the provided constraints. It also updates the constraint object's `x`, `y`, `dx`, and `dy`
       * values accordingly. The adjustment logic depends on whether the input parameter `n` matches `e.dx`.
       *
       * @param t - An array of objects with properties `area`, `x`, `y`, `dx`, and `dy`.
       * @param n - A numeric value that influences the calculation of element dimensions.
       * @param e - An object containing constraints for `x`, `y`, `dx`, and `dy` properties.
       * @param r - A boolean flag that affects whether certain adjustments should be made.
       */
      function u(t, n, e, r) {
        var u,
          i = -1,
          a = t.length,
          o = e.x,
          l = e.y,
          f = n ? c(t.area / n) : 0;
        if (n == e.dx) {
          for ((r || f > e.dy) && (f = e.dy); a > ++i; )
            (u = t[i]),
              (u.x = o),
              (u.y = l),
              (u.dy = f),
              (o += u.dx = Math.min(e.x + e.dx - o, f ? c(u.area / f) : 0));
          (u.z = !0), (u.dx += e.x + e.dx - o), (e.y += f), (e.dy -= f);
        } else {
          for ((r || f > e.dx) && (f = e.dx); a > ++i; )
            (u = t[i]),
              (u.x = o),
              (u.y = l),
              (u.dx = f),
              (l += u.dy = Math.min(e.y + e.dy - l, f ? c(u.area / f) : 0));
          (u.z = !1), (u.dy += e.y + e.dy - l), (e.x += f), (e.dx -= f);
        }
      }
      /**
       * Initializes and processes an object based on the provided reference.
       *
       * This function retrieves or creates an object using either the default value `a` or a custom creation method `o(r)`.
       * It then sets initial properties for the object, updates its values if `a` is defined, and applies transformations.
       * Finally, it returns the processed object.
       *
       * @param {Object} r - The reference object used to create or retrieve an object.
       * @returns {Array} - An array containing the processed object.
       */
      function i(r) {
        var u = a || o(r),
          i = u[0];
        return (
          (i.x = 0),
          (i.y = 0),
          (i.dx = l[0]),
          (i.dy = l[1]),
          a && o.revalue(i),
          t([i], (i.dx * i.dy) / i.value),
          (a ? e : n)(i),
          h && (a = u),
          u
        );
      }
      var a,
        o = Ci.layout.hierarchy(),
        c = Math.round,
        l = [1, 1],
        f = null,
        s = Pr,
        h = !1,
        g = "squarify",
        p = 0.5 * (1 + Math.sqrt(5));
      return (
        (i.size = function (t) {
          return arguments.length ? ((l = t), i) : l;
        }),
        (i.padding = function (t) {
          /**
           * Calls a function with the given node and depth, processes the result, and returns it.
           */
          function n(n) {
            var e = t.call(i, n, n.depth);
            return null == e
              ? Pr(n)
              : Rr(n, "number" == typeof e ? [e, e, e, e] : e);
          }
          /**
           * Calls the Rr function with n and t as arguments.
           */
          function e(n) {
            return Rr(n, t);
          }
          if (!arguments.length) return f;
          var r;
          return (
            (s =
              null == (f = t)
                ? Pr
                : "function" == (r = typeof t)
                  ? n
                  : "number" === r
                    ? ((t = [t, t, t, t]), e)
                    : e),
            i
          );
        }),
        (i.round = function (t) {
          return arguments.length
            ? ((c = t ? Math.round : Number), i)
            : c != Number;
        }),
        (i.sticky = function (t) {
          return arguments.length ? ((h = t), (a = null), i) : h;
        }),
        (i.ratio = function (t) {
          return arguments.length ? ((p = t), i) : p;
        }),
        (i.mode = function (t) {
          return arguments.length ? ((g = t + ""), i) : g;
        }),
        lr(i, o)
      );
    }),
    (Ci.csv = Or(",", "text/csv")),
    (Ci.tsv = Or("	", "text/tab-separated-values")),
    (Ci.geo = {}),
    (Ci.geo.stream = function (t, n) {
      ao.hasOwnProperty(t.type) ? ao[t.type](t, n) : Yr(t, n);
    });
  var ao = {
      Feature: function (t, n) {
        Yr(t.geometry, n);
      },
      FeatureCollection: function (t, n) {
        for (var e = t.features, r = -1, u = e.length; u > ++r; )
          Yr(e[r].geometry, n);
      },
    },
    oo = {
      Sphere: function (t, n) {
        n.sphere();
      },
      Point: function (t, n) {
        var e = t.coordinates;
        n.point(e[0], e[1]);
      },
      MultiPoint: function (t, n) {
        for (var e, r = t.coordinates, u = -1, i = r.length; i > ++u; )
          (e = r[u]), n.point(e[0], e[1]);
      },
      LineString: function (t, n) {
        Ur(t.coordinates, n, 0);
      },
      MultiLineString: function (t, n) {
        for (var e = t.coordinates, r = -1, u = e.length; u > ++r; )
          Ur(e[r], n, 0);
      },
      Polygon: function (t, n) {
        Ir(t.coordinates, n);
      },
      MultiPolygon: function (t, n) {
        for (var e = t.coordinates, r = -1, u = e.length; u > ++r; )
          Ir(e[r], n);
      },
      GeometryCollection: function (t, n) {
        for (var e = t.geometries, r = -1, u = e.length; u > ++r; ) Yr(e[r], n);
      },
    };
  (Ci.geo.albersUsa = function () {
    /**
     * Applies a higher-order function to its argument.
     */
    function t(t) {
      return n(t)(t);
    }
    /**
     * Determines a value based on input array elements.
     */
    function n(t) {
      var n = t[0],
        a = t[1];
      return a > 50 ? r : -140 > n ? u : 21 > a ? i : e;
    }
    var e = Ci.geo.albers(),
      r = Ci.geo.albers().rotate([160, 0]).center([0, 60]).parallels([55, 65]),
      u = Ci.geo.albers().rotate([160, 0]).center([0, 20]).parallels([8, 18]),
      i = Ci.geo.albers().rotate([60, 0]).center([0, 10]).parallels([8, 18]);
    return (
      (t.scale = function (n) {
        return arguments.length
          ? (e.scale(n),
            r.scale(0.6 * n),
            u.scale(n),
            i.scale(1.5 * n),
            t.translate(e.translate()))
          : e.scale();
      }),
      (t.translate = function (n) {
        if (!arguments.length) return e.translate();
        var a = e.scale(),
          o = n[0],
          c = n[1];
        return (
          e.translate(n),
          r.translate([o - 0.4 * a, c + 0.17 * a]),
          u.translate([o - 0.19 * a, c + 0.2 * a]),
          i.translate([o + 0.58 * a, c + 0.43 * a]),
          t
        );
      }),
      t.scale(e.scale())
    );
  }),
    ((Ci.geo.albers = function () {
      var t = 29.5 * zi,
        n = 45.5 * zi,
        e = Hu(Qr),
        r = e(t, n);
      return (
        (r.parallels = function (r) {
          return arguments.length
            ? e((t = r[0] * zi), (n = r[1] * zi))
            : [t * Di, n * Di];
        }),
        r.rotate([98, 0]).center([0, 38]).scale(1e3)
      );
    }).raw = Qr);
  var co = Uu(
    function (t) {
      return Math.sqrt(2 / (1 + t));
    },
    function (t) {
      return 2 * Math.asin(t / 2);
    },
  );
  (Ci.geo.azimuthalEqualArea = function () {
    return Fu(co);
  }).raw = co;
  var lo = Uu(function (t) {
    var n = Math.acos(t);
    return n && n / Math.sin(n);
  }, a);
  ((Ci.geo.azimuthalEquidistant = function () {
    return Fu(lo);
  }).raw = lo),
    (Ci.geo.bounds = tu(a)),
    (Ci.geo.centroid = function (t) {
      (fo = so = ho = go = po = 0), Ci.geo.stream(t, mo);
      var n;
      return so && Math.abs((n = Math.sqrt(ho * ho + go * go + po * po))) > qi
        ? [
            Math.atan2(go, ho) * Di,
            Math.asin(Math.max(-1, Math.min(1, po / n))) * Di,
          ]
        : void 0;
    });
  var fo,
    so,
    ho,
    go,
    po,
    mo = {
      sphere: function () {
        2 > fo && ((fo = 2), (so = ho = go = po = 0));
      },
      point: nu,
      lineStart: ru,
      lineEnd: uu,
      polygonStart: function () {
        2 > fo && ((fo = 2), (so = ho = go = po = 0)), (mo.lineStart = eu);
      },
      polygonEnd: function () {
        mo.lineStart = ru;
      },
    };
  Ci.geo.circle = function () {
    /**
     * Processes input to generate a polygon with transformed coordinates.
     */
    function t() {
      var t = "function" == typeof r ? r.apply(this, arguments) : r,
        n = Pu(-t[0] * zi, -t[1] * zi, 0).invert,
        u = [];
      return (
        e(null, null, 1, {
          point: function (t, e) {
            u.push((t = n(t, e))), (t[0] *= Di), (t[1] *= Di);
          },
        }),
        { type: "Polygon", coordinates: [u] }
      );
    }
    var n,
      e,
      r = [0, 0],
      u = 6;
    return (
      (t.origin = function (n) {
        return arguments.length ? ((r = n), t) : r;
      }),
      (t.angle = function (r) {
        return arguments.length ? ((e = iu((n = +r) * zi, u * zi)), t) : n;
      }),
      (t.precision = function (r) {
        return arguments.length ? ((e = iu(n * zi, (u = +r) * zi)), t) : u;
      }),
      t.angle(90)
    );
  };
  var vo = ou(o, pu, mu);
  (Ci.geo.equirectangular = function () {
    return Fu(Mu).scale(250 / Ti);
  }).raw = Mu.invert = Mu;
  var yo = Uu(function (t) {
    return 1 / t;
  }, Math.atan);
  ((Ci.geo.gnomonic = function () {
    return Fu(yo);
  }).raw = yo),
    (Ci.geo.graticule = function () {
      /**
       * Returns an object representing a MultiLineString with coordinates generated by n().
       */
      function t() {
        return { type: "MultiLineString", coordinates: n() };
      }
      /**
       * Maps ranges and concatenates results.
       */
      function n() {
        return Ci.range(Math.ceil(r / c) * c, e, c)
          .map(a)
          .concat(Ci.range(Math.ceil(i / l) * l, u, l).map(o));
      }
      var e,
        r,
        u,
        i,
        a,
        o,
        c = 22.5,
        l = c,
        f = 2.5;
      return (
        (t.lines = function () {
          return n().map(function (t) {
            return { type: "LineString", coordinates: t };
          });
        }),
        (t.outline = function () {
          return {
            type: "Polygon",
            coordinates: [
              a(r).concat(
                o(u).slice(1),
                a(e).reverse().slice(1),
                o(i).reverse().slice(1),
              ),
            ],
          };
        }),
        (t.extent = function (n) {
          return arguments.length
            ? ((r = +n[0][0]),
              (e = +n[1][0]),
              (i = +n[0][1]),
              (u = +n[1][1]),
              r > e && ((n = r), (r = e), (e = n)),
              i > u && ((n = i), (i = u), (u = n)),
              t.precision(f))
            : [
                [r, i],
                [e, u],
              ];
        }),
        (t.step = function (n) {
          return arguments.length ? ((c = +n[0]), (l = +n[1]), t) : [c, l];
        }),
        (t.precision = function (n) {
          return arguments.length
            ? ((f = +n), (a = bu(i, u, f)), (o = xu(r, e, f)), t)
            : f;
        }),
        t.extent([
          [-180 + qi, -90 + qi],
          [180 - qi, 90 - qi],
        ])
      );
    }),
    (Ci.geo.interpolate = function (t, n) {
      return wu(t[0] * zi, t[1] * zi, n[0] * zi, n[1] * zi);
    }),
    (Ci.geo.greatArc = function () {
      /**
       * Generates a LineString from two geographical points using interpolation.
       *
       * This function calculates a series of intermediate points between two given
       * geographical coordinates and returns them as a LineString. It uses the provided
       * interpolation method to determine the path between the start and end points.
       */
      function e() {
        for (
          var t = r || a.apply(this, arguments),
            n = u || o.apply(this, arguments),
            e = i || Ci.geo.interpolate(t, n),
            l = 0,
            f = c / e.distance,
            s = [t];
          1 > (l += f);

        )
          s.push(e(l));
        return s.push(n), { type: "LineString", coordinates: s };
      }
      var r,
        u,
        i,
        a = n,
        o = t,
        c = 6 * zi;
      return (
        (e.distance = function () {
          return (
            i ||
            Ci.geo.interpolate(
              r || a.apply(this, arguments),
              u || o.apply(this, arguments),
            )
          ).distance;
        }),
        (e.source = function (t) {
          return arguments.length
            ? ((a = t),
              (r = "function" == typeof t ? null : t),
              (i = r && u ? Ci.geo.interpolate(r, u) : null),
              e)
            : a;
        }),
        (e.target = function (t) {
          return arguments.length
            ? ((o = t),
              (u = "function" == typeof t ? null : t),
              (i = r && u ? Ci.geo.interpolate(r, u) : null),
              e)
            : o;
        }),
        (e.precision = function (t) {
          return arguments.length ? ((c = t * zi), e) : c / zi;
        }),
        e
      );
    }),
    (Su.invert = function (t, n) {
      return [2 * Ti * t, 2 * Math.atan(Math.exp(2 * Ti * n)) - Ti / 2];
    }),
    ((Ci.geo.mercator = function () {
      return Fu(Su).scale(500);
    }).raw = Su);
  var Mo = Uu(function () {
    return 1;
  }, Math.asin);
  ((Ci.geo.orthographic = function () {
    return Fu(Mo);
  }).raw = Mo),
    (Ci.geo.path = function () {
      /**
       * Processes a geographic object and returns the result.
       */
      function t(t) {
        return (
          t &&
            Ci.geo.stream(
              t,
              r(
                u.pointRadius(
                  "function" == typeof i ? +i.apply(this, arguments) : i,
                ),
              ),
            ),
          u.result()
        );
      }
      var n,
        e,
        r,
        u,
        i = 4.5;
      return (
        (t.area = function (t) {
          return (bo = 0), Ci.geo.stream(t, r(_o)), bo;
        }),
        (t.centroid = function (t) {
          return (
            (fo = ho = go = po = 0),
            Ci.geo.stream(t, r(wo)),
            po ? [ho / po, go / po] : void 0
          );
        }),
        (t.bounds = function (t) {
          return tu(r)(t);
        }),
        (t.projection = function (e) {
          return arguments.length
            ? ((r = (n = e) ? e.stream || Eu(e) : a), t)
            : n;
        }),
        (t.context = function (n) {
          return arguments.length
            ? ((u = null == (e = n) ? new Au() : new Nu(n)), t)
            : e;
        }),
        (t.pointRadius = function (n) {
          return arguments.length
            ? ((i = "function" == typeof n ? n : +n), t)
            : i;
        }),
        t.projection(Ci.geo.albersUsa()).context(null)
      );
    });
  var bo,
    xo,
    _o = {
      point: Pn,
      lineStart: Pn,
      lineEnd: Pn,
      polygonStart: function () {
        (xo = 0), (_o.lineStart = Tu);
      },
      polygonEnd: function () {
        (_o.lineStart = _o.lineEnd = _o.point = Pn), (bo += Math.abs(xo / 2));
      },
    },
    wo = {
      point: qu,
      lineStart: Cu,
      lineEnd: zu,
      polygonStart: function () {
        wo.lineStart = Du;
      },
      polygonEnd: function () {
        (wo.point = qu), (wo.lineStart = Cu), (wo.lineEnd = zu);
      },
    };
  Ci.geo.area = function (t) {
    return (So = 0), Ci.geo.stream(t, Ao), So;
  };
  var So,
    ko,
    Eo,
    Ao = {
      sphere: function () {
        So += 4 * Ti;
      },
      point: Pn,
      lineStart: Pn,
      lineEnd: Pn,
      polygonStart: function () {
        (ko = 1), (Eo = 0), (Ao.lineStart = Lu);
      },
      polygonEnd: function () {
        var t = 2 * Math.atan2(Eo, ko);
        (So += 0 > t ? 4 * Ti + t : t),
          (Ao.lineStart = Ao.lineEnd = Ao.point = Pn);
      },
    };
  (Ci.geo.projection = Fu), (Ci.geo.projectionMutator = Hu);
  var No = Uu(
    function (t) {
      return 1 / (1 + t);
    },
    function (t) {
      return 2 * Math.atan(t);
    },
  );
  ((Ci.geo.stereographic = function () {
    return Fu(No);
  }).raw = No),
    (Ci.geom = {}),
    (Ci.geom.hull = function (t) {
      if (3 > t.length) return [];
      var n,
        e,
        r,
        u,
        i,
        a,
        o,
        c,
        l,
        f,
        s = t.length,
        h = s - 1,
        g = [],
        p = [],
        d = 0;
      for (n = 1; s > n; ++n)
        t[n][1] < t[d][1]
          ? (d = n)
          : t[n][1] == t[d][1] && (d = t[n][0] < t[d][0] ? n : d);
      for (n = 0; s > n; ++n)
        n !== d &&
          ((u = t[n][1] - t[d][1]),
          (r = t[n][0] - t[d][0]),
          g.push({ angle: Math.atan2(u, r), index: n }));
      for (
        g.sort(function (t, n) {
          return t.angle - n.angle;
        }),
          l = g[0].angle,
          c = g[0].index,
          o = 0,
          n = 1;
        h > n;
        ++n
      )
        (e = g[n].index),
          l == g[n].angle
            ? ((r = t[c][0] - t[d][0]),
              (u = t[c][1] - t[d][1]),
              (i = t[e][0] - t[d][0]),
              (a = t[e][1] - t[d][1]),
              r * r + u * u >= i * i + a * a
                ? (g[n].index = -1)
                : ((g[o].index = -1), (l = g[n].angle), (o = n), (c = e)))
            : ((l = g[n].angle), (o = n), (c = e));
      for (p.push(d), n = 0, e = 0; 2 > n; ++e)
        -1 !== g[e].index && (p.push(g[e].index), n++);
      for (f = p.length; h > e; ++e)
        if (-1 !== g[e].index) {
          for (; !Iu(p[f - 2], p[f - 1], g[e].index, t); ) --f;
          p[f++] = g[e].index;
        }
      var m = [];
      for (n = 0; f > n; ++n) m.push(t[p[n]]);
      return m;
    }),
    (Ci.geom.polygon = function (t) {
      return (
        (t.area = function () {
          for (
            var n = 0,
              e = t.length,
              r = t[e - 1][1] * t[0][0] - t[e - 1][0] * t[0][1];
            e > ++n;

          )
            r += t[n - 1][1] * t[n][0] - t[n - 1][0] * t[n][1];
          return 0.5 * r;
        }),
        (t.centroid = function (n) {
          var e,
            r,
            u = -1,
            i = t.length,
            a = 0,
            o = 0,
            c = t[i - 1];
          for (arguments.length || (n = -1 / (6 * t.area())); i > ++u; )
            (e = c),
              (c = t[u]),
              (r = e[0] * c[1] - c[0] * e[1]),
              (a += (e[0] + c[0]) * r),
              (o += (e[1] + c[1]) * r);
          return [a * n, o * n];
        }),
        (t.clip = function (n) {
          for (
            var e, r, u, i, a, o, c = -1, l = t.length, f = t[l - 1];
            l > ++c;

          ) {
            for (
              e = n.slice(),
                n.length = 0,
                i = t[c],
                a = e[(u = e.length) - 1],
                r = -1;
              u > ++r;

            )
              (o = e[r]),
                Vu(o, f, i)
                  ? (Vu(a, f, i) || n.push(Zu(a, o, f, i)), n.push(o))
                  : Vu(a, f, i) && n.push(Zu(a, o, f, i)),
                (a = o);
            f = i;
          }
          return n;
        }),
        t
      );
    }),
    (Ci.geom.voronoi = function (t) {
      var n = t.map(function () {
          return [];
        }),
        e = 1e6;
      return (
        Xu(t, function (t) {
          var r, u, i, a, o, c;
          1 === t.a && t.b >= 0
            ? ((r = t.ep.r), (u = t.ep.l))
            : ((r = t.ep.l), (u = t.ep.r)),
            1 === t.a
              ? ((o = r ? r.y : -e),
                (i = t.c - t.b * o),
                (c = u ? u.y : e),
                (a = t.c - t.b * c))
              : ((i = r ? r.x : -e),
                (o = t.c - t.a * i),
                (a = u ? u.x : e),
                (c = t.c - t.a * a));
          var l = [i, o],
            f = [a, c];
          n[t.region.l.index].push(l, f), n[t.region.r.index].push(l, f);
        }),
        (n = n.map(function (n, e) {
          var r = t[e][0],
            u = t[e][1],
            i = n.map(function (t) {
              return Math.atan2(t[0] - r, t[1] - u);
            }),
            a = Ci.range(n.length).sort(function (t, n) {
              return i[t] - i[n];
            });
          return a
            .filter(function (t, n) {
              return !n || i[t] - i[a[n - 1]] > qi;
            })
            .map(function (t) {
              return n[t];
            });
        })),
        n.forEach(function (n, r) {
          var u = n.length;
          if (!u) return n.push([-e, -e], [-e, e], [e, e], [e, -e]);
          if (!(u > 2)) {
            var i = t[r],
              a = n[0],
              o = n[1],
              c = i[0],
              l = i[1],
              f = a[0],
              s = a[1],
              h = o[0],
              g = o[1],
              p = Math.abs(h - f),
              d = g - s;
            if (qi > Math.abs(d)) {
              var m = s > l ? -e : e;
              n.push([-e, m], [e, m]);
            } else if (qi > p) {
              var v = f > c ? -e : e;
              n.push([v, -e], [v, e]);
            } else {
              var m = (f - c) * (g - s) > (h - f) * (s - l) ? e : -e,
                y = Math.abs(d) - p;
              qi > Math.abs(y)
                ? n.push([0 > d ? m : -m, m])
                : (y > 0 && (m *= -1), n.push([-e, m], [e, m]));
            }
          }
        }),
        n
      );
    });
  var To = { l: "r", r: "l" };
  (Ci.geom.delaunay = function (t) {
    var n = t.map(function () {
        return [];
      }),
      e = [];
    return (
      Xu(t, function (e) {
        n[e.region.l.index].push(t[e.region.r.index]);
      }),
      n.forEach(function (n, r) {
        var u = t[r],
          i = u[0],
          a = u[1];
        n.forEach(function (t) {
          t.angle = Math.atan2(t[0] - i, t[1] - a);
        }),
          n.sort(function (t, n) {
            return t.angle - n.angle;
          });
        for (var o = 0, c = n.length - 1; c > o; o++)
          e.push([u, n[o], n[o + 1]]);
      }),
      e
    );
  }),
    (Ci.geom.quadtree = function (t, n, e, r, u) {
      /**
       * Updates a quadtree node with a new point and potentially splits the node if necessary.
       *
       * This function checks if the given point is valid (i.e., its coordinates are not NaN).
       * If the current node is a leaf, it either updates the existing point or replaces it
       * based on proximity. If the node is not a leaf, it directly processes the point.
       *
       * @param {object} t - The quadtree node to update.
       * @param {object} n - The new point to add to the quadtree.
       * @param {number} e - The width of the current quadtree node's bounds.
       * @param {number} r - The height of the current quadtree node's bounds.
       * @param {number} u - The x-coordinate of the current quadtree node's center.
       * @param {number} i - The y-coordinate of the current quadtree node's center.
       */
      function i(t, n, e, r, u, i) {
        if (!isNaN(n.x) && !isNaN(n.y))
          if (t.leaf) {
            var o = t.point;
            o
              ? 0.01 > Math.abs(o.x - n.x) + Math.abs(o.y - n.y)
                ? a(t, n, e, r, u, i)
                : ((t.point = null), a(t, o, e, r, u, i), a(t, n, e, r, u, i))
              : (t.point = n);
          } else a(t, n, e, r, u, i);
      }
      /**
       * Updates a node's properties and recursively processes its children.
       */
      function a(t, n, e, r, u, a) {
        var o = 0.5 * (e + u),
          c = 0.5 * (r + a),
          l = n.x >= o,
          f = n.y >= c,
          s = (f << 1) + l;
        (t.leaf = !1),
          (t = t.nodes[s] || (t.nodes[s] = Bu())),
          l ? (e = o) : (u = o),
          f ? (r = c) : (a = c),
          i(t, n, e, r, u, a);
      }
      var o,
        c = -1,
        l = t.length;
      if (5 > arguments.length)
        if (3 === arguments.length) (u = e), (r = n), (e = n = 0);
        else
          for (n = e = 1 / 0, r = u = -1 / 0; l > ++c; )
            (o = t[c]),
              n > o.x && (n = o.x),
              e > o.y && (e = o.y),
              o.x > r && (r = o.x),
              o.y > u && (u = o.y);
      var f = r - n,
        s = u - e;
      f > s ? (u = e + f) : (r = n + s);
      var h = Bu();
      return (
        (h.add = function (t) {
          i(h, t, n, e, r, u);
        }),
        (h.visit = function (t) {
          $u(t, h, n, e, r, u);
        }),
        t.forEach(h.add),
        h
      );
    }),
    (Ci.time = {});
  var qo = Date,
    Co = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  Ju.prototype = {
    getDate: function () {
      return this._.getUTCDate();
    },
    getDay: function () {
      return this._.getUTCDay();
    },
    getFullYear: function () {
      return this._.getUTCFullYear();
    },
    getHours: function () {
      return this._.getUTCHours();
    },
    getMilliseconds: function () {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function () {
      return this._.getUTCMinutes();
    },
    getMonth: function () {
      return this._.getUTCMonth();
    },
    getSeconds: function () {
      return this._.getUTCSeconds();
    },
    getTime: function () {
      return this._.getTime();
    },
    getTimezoneOffset: function () {
      return 0;
    },
    valueOf: function () {
      return this._.valueOf();
    },
    setDate: function () {
      zo.setUTCDate.apply(this._, arguments);
    },
    setDay: function () {
      zo.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function () {
      zo.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function () {
      zo.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function () {
      zo.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function () {
      zo.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function () {
      zo.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function () {
      zo.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function () {
      zo.setTime.apply(this._, arguments);
    },
  };
  var zo = Date.prototype,
    Do = "%a %b %e %X %Y",
    Lo = "%m/%d/%Y",
    Fo = "%H:%M:%S",
    Ho = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    jo = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Po = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    Ro = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  Ci.time.format = function (t) {
    /**
     * Processes a string by replacing specific characters and patterns.
     *
     * This function iterates over the input string `t` and processes it based on certain conditions.
     * It uses arrays and objects (`Xo`, `Bo`) to map and transform characters. The function handles
     * special cases where the character '37' is encountered, and it adjusts the index accordingly.
     * Finally, it returns the processed string.
     */
    function n(n) {
      for (var r, u, i, a = [], o = -1, c = 0; e > ++o; )
        37 === t.charCodeAt(o) &&
          (a.push(t.substring(c, o)),
          null != (u = Xo[(r = t.charAt(++o))]) && (r = t.charAt(++o)),
          (i = Bo[r]) && (r = i(n, null == u ? ("e" === r ? " " : "0") : u)),
          a.push(r),
          (c = o + 1));
      return a.push(t.substring(c, o)), a.join("");
    }
    var e = t.length;
    return (
      (n.parse = function (n) {
        var e = { y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 },
          r = Gu(e, t, n, 0);
        if (r != n.length) return null;
        "p" in e && (e.H = (e.H % 12) + 12 * e.p);
        var u = new qo();
        return u.setFullYear(e.y, e.m, e.d), u.setHours(e.H, e.M, e.S, e.L), u;
      }),
      (n.toString = function () {
        return t;
      }),
      n
    );
  };
  var Oo = Ku(Ho),
    Yo = Ku(jo),
    Uo = Ku(Po),
    Io = Wu(Po),
    Vo = Ku(Ro),
    Zo = Wu(Ro),
    Xo = { "-": "", _: " ", 0: "0" },
    Bo = {
      a: function (t) {
        return jo[t.getDay()];
      },
      A: function (t) {
        return Ho[t.getDay()];
      },
      b: function (t) {
        return Ro[t.getMonth()];
      },
      B: function (t) {
        return Po[t.getMonth()];
      },
      c: Ci.time.format(Do),
      d: function (t, n) {
        return Qu(t.getDate(), n, 2);
      },
      e: function (t, n) {
        return Qu(t.getDate(), n, 2);
      },
      H: function (t, n) {
        return Qu(t.getHours(), n, 2);
      },
      I: function (t, n) {
        return Qu(t.getHours() % 12 || 12, n, 2);
      },
      j: function (t, n) {
        return Qu(1 + Ci.time.dayOfYear(t), n, 3);
      },
      L: function (t, n) {
        return Qu(t.getMilliseconds(), n, 3);
      },
      m: function (t, n) {
        return Qu(t.getMonth() + 1, n, 2);
      },
      M: function (t, n) {
        return Qu(t.getMinutes(), n, 2);
      },
      p: function (t) {
        return t.getHours() >= 12 ? "PM" : "AM";
      },
      S: function (t, n) {
        return Qu(t.getSeconds(), n, 2);
      },
      U: function (t, n) {
        return Qu(Ci.time.sundayOfYear(t), n, 2);
      },
      w: function (t) {
        return t.getDay();
      },
      W: function (t, n) {
        return Qu(Ci.time.mondayOfYear(t), n, 2);
      },
      x: Ci.time.format(Lo),
      X: Ci.time.format(Fo),
      y: function (t, n) {
        return Qu(t.getFullYear() % 100, n, 2);
      },
      Y: function (t, n) {
        return Qu(t.getFullYear() % 1e4, n, 4);
      },
      Z: vi,
      "%": function () {
        return "%";
      },
    },
    $o = {
      a: ti,
      A: ni,
      b: ei,
      B: ri,
      c: ui,
      d: si,
      e: si,
      H: hi,
      I: hi,
      L: di,
      m: fi,
      M: gi,
      p: mi,
      S: pi,
      x: ii,
      X: ai,
      y: ci,
      Y: oi,
    },
    Jo = /^\s*\d+/,
    Go = Ci.map({ am: 0, pm: 1 });
  Ci.time.format.utc = function (t) {
    /**
     * Creates a new object, sets its property, and returns it.
     */
    function n(t) {
      try {
        qo = Ju;
        var n = new qo();
        return (n._ = t), e(n);
      } finally {
        qo = Date;
      }
    }
    var e = Ci.time.format(t);
    return (
      (n.parse = function (t) {
        try {
          qo = Ju;
          var n = e.parse(t);
          return n && n._;
        } finally {
          qo = Date;
        }
      }),
      (n.toString = e.toString),
      n
    );
  };
  var Ko = Ci.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
  (Ci.time.format.iso =
    Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
      ? yi
      : Ko),
    (yi.parse = function (t) {
      var n = new Date(t);
      return isNaN(n) ? null : n;
    }),
    (yi.toString = Ko.toString),
    (Ci.time.second = Mi(
      function (t) {
        return new qo(1e3 * Math.floor(t / 1e3));
      },
      function (t, n) {
        t.setTime(t.getTime() + 1e3 * Math.floor(n));
      },
      function (t) {
        return t.getSeconds();
      },
    )),
    (Ci.time.seconds = Ci.time.second.range),
    (Ci.time.seconds.utc = Ci.time.second.utc.range),
    (Ci.time.minute = Mi(
      function (t) {
        return new qo(6e4 * Math.floor(t / 6e4));
      },
      function (t, n) {
        t.setTime(t.getTime() + 6e4 * Math.floor(n));
      },
      function (t) {
        return t.getMinutes();
      },
    )),
    (Ci.time.minutes = Ci.time.minute.range),
    (Ci.time.minutes.utc = Ci.time.minute.utc.range),
    (Ci.time.hour = Mi(
      function (t) {
        var n = t.getTimezoneOffset() / 60;
        return new qo(36e5 * (Math.floor(t / 36e5 - n) + n));
      },
      function (t, n) {
        t.setTime(t.getTime() + 36e5 * Math.floor(n));
      },
      function (t) {
        return t.getHours();
      },
    )),
    (Ci.time.hours = Ci.time.hour.range),
    (Ci.time.hours.utc = Ci.time.hour.utc.range),
    (Ci.time.day = Mi(
      function (t) {
        var n = new qo(1970, 0);
        return n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), n;
      },
      function (t, n) {
        t.setDate(t.getDate() + n);
      },
      function (t) {
        return t.getDate() - 1;
      },
    )),
    (Ci.time.days = Ci.time.day.range),
    (Ci.time.days.utc = Ci.time.day.utc.range),
    (Ci.time.dayOfYear = function (t) {
      var n = Ci.time.year(t);
      return Math.floor(
        (t - n - 6e4 * (t.getTimezoneOffset() - n.getTimezoneOffset())) / 864e5,
      );
    }),
    Co.forEach(function (t, n) {
      (t = t.toLowerCase()), (n = 7 - n);
      var e = (Ci.time[t] = Mi(
        function (t) {
          return (
            (t = Ci.time.day(t)).setDate(t.getDate() - ((t.getDay() + n) % 7)),
            t
          );
        },
        function (t, n) {
          t.setDate(t.getDate() + 7 * Math.floor(n));
        },
        function (t) {
          var e = Ci.time.year(t).getDay();
          return (
            Math.floor((Ci.time.dayOfYear(t) + ((e + n) % 7)) / 7) - (e !== n)
          );
        },
      ));
      (Ci.time[t + "s"] = e.range),
        (Ci.time[t + "s"].utc = e.utc.range),
        (Ci.time[t + "OfYear"] = function (t) {
          var e = Ci.time.year(t).getDay();
          return Math.floor((Ci.time.dayOfYear(t) + ((e + n) % 7)) / 7);
        });
    }),
    (Ci.time.week = Ci.time.sunday),
    (Ci.time.weeks = Ci.time.sunday.range),
    (Ci.time.weeks.utc = Ci.time.sunday.utc.range),
    (Ci.time.weekOfYear = Ci.time.sundayOfYear),
    (Ci.time.month = Mi(
      function (t) {
        return (t = Ci.time.day(t)), t.setDate(1), t;
      },
      function (t, n) {
        t.setMonth(t.getMonth() + n);
      },
      function (t) {
        return t.getMonth();
      },
    )),
    (Ci.time.months = Ci.time.month.range),
    (Ci.time.months.utc = Ci.time.month.utc.range),
    (Ci.time.year = Mi(
      function (t) {
        return (t = Ci.time.day(t)), t.setMonth(0, 1), t;
      },
      function (t, n) {
        t.setFullYear(t.getFullYear() + n);
      },
      function (t) {
        return t.getFullYear();
      },
    )),
    (Ci.time.years = Ci.time.year.range),
    (Ci.time.years.utc = Ci.time.year.utc.range);
  var Wo = [
      1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5,
      864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6,
    ],
    Qo = [
      [Ci.time.second, 1],
      [Ci.time.second, 5],
      [Ci.time.second, 15],
      [Ci.time.second, 30],
      [Ci.time.minute, 1],
      [Ci.time.minute, 5],
      [Ci.time.minute, 15],
      [Ci.time.minute, 30],
      [Ci.time.hour, 1],
      [Ci.time.hour, 3],
      [Ci.time.hour, 6],
      [Ci.time.hour, 12],
      [Ci.time.day, 1],
      [Ci.time.day, 2],
      [Ci.time.week, 1],
      [Ci.time.month, 1],
      [Ci.time.month, 3],
      [Ci.time.year, 1],
    ],
    tc = [
      [Ci.time.format("%Y"), o],
      [
        Ci.time.format("%B"),
        function (t) {
          return t.getMonth();
        },
      ],
      [
        Ci.time.format("%b %d"),
        function (t) {
          return 1 != t.getDate();
        },
      ],
      [
        Ci.time.format("%a %d"),
        function (t) {
          return t.getDay() && 1 != t.getDate();
        },
      ],
      [
        Ci.time.format("%I %p"),
        function (t) {
          return t.getHours();
        },
      ],
      [
        Ci.time.format("%I:%M"),
        function (t) {
          return t.getMinutes();
        },
      ],
      [
        Ci.time.format(":%S"),
        function (t) {
          return t.getSeconds();
        },
      ],
      [
        Ci.time.format(".%L"),
        function (t) {
          return t.getMilliseconds();
        },
      ],
    ],
    nc = Ci.scale.linear(),
    ec = Si(tc);
  (Qo.year = function (t, n) {
    return nc.domain(t.map(Ei)).ticks(n).map(ki);
  }),
    (Ci.time.scale = function () {
      return xi(Ci.scale.linear(), Qo, ec);
    });
  var rc = Qo.map(function (t) {
      return [t[0].utc, t[1]];
    }),
    uc = [
      [Ci.time.format.utc("%Y"), o],
      [
        Ci.time.format.utc("%B"),
        function (t) {
          return t.getUTCMonth();
        },
      ],
      [
        Ci.time.format.utc("%b %d"),
        function (t) {
          return 1 != t.getUTCDate();
        },
      ],
      [
        Ci.time.format.utc("%a %d"),
        function (t) {
          return t.getUTCDay() && 1 != t.getUTCDate();
        },
      ],
      [
        Ci.time.format.utc("%I %p"),
        function (t) {
          return t.getUTCHours();
        },
      ],
      [
        Ci.time.format.utc("%I:%M"),
        function (t) {
          return t.getUTCMinutes();
        },
      ],
      [
        Ci.time.format.utc(":%S"),
        function (t) {
          return t.getUTCSeconds();
        },
      ],
      [
        Ci.time.format.utc(".%L"),
        function (t) {
          return t.getUTCMilliseconds();
        },
      ],
    ],
    ic = Si(uc);
  return (
    (rc.year = function (t, n) {
      return nc.domain(t.map(Ni)).ticks(n).map(Ai);
    }),
    (Ci.time.scale.utc = function () {
      return xi(Ci.scale.linear(), rc, ic);
    }),
    Ci
  );
})();
