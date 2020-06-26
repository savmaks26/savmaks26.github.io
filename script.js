let a1,
  a2,
  a3,
  a4 = 1,
  a5 = 1;
let queryString0;
let g = true;
let mu = false;
let region = "BY";
let b, a, nick;

window.onload = function() {
  queryString0 = window.location + "";
  let queryString = queryString0.split("?")[1];
  a1 = getCookie("a1");
  a2 = getCookie("a2");
  a3 = getCookie("a3");
  a4 = getCookie("a4");
  a5 = getCookie("a5");
  if (a1 != undefined) {
    document.getElementById("nick").value = a1;
    document.getElementById("interval").value = a2;
    document.getElementById("time").value = a3;
  }
  if (a4 == undefined) a4 = 0;
  document.getElementById("cb1").checked = a4 - 0;
  if (a4 == undefined) a5 = 0;
  document.getElementById("cb2").checked = a5 - 0;
  if (queryString == "reload") {
    mu = true;
    start();
  }
};
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

let r = false;

function start() {
  if (r) {
    document.getElementById("message").style = "color: red";
    document.getElementById("message").innerHTML =
      "Bots have already been launching!";
    return 2;
  }
  b = document.getElementById("interval").value;
  a = document.getElementById("time").value;
  nick = document.getElementById("nick").value;
  if (b == "" || a == "" || nick == "") {
    document.getElementById("message").style = "color: red";
    document.getElementById("message").innerHTML = "Please fill in all fields!";
    return 1;
  }
  document.getElementById("message").style = "color: green";
  document.getElementById("message").innerHTML = "Bots have been launching!";
  setCookie("a1", nick, { secure: true, "max-age": 9999999999 });
  setCookie("a2", b, { secure: true, "max-age": 9999999999 });
  setCookie("a3", a, { secure: true, "max-age": 9999999999 });
  setCookie("a4", document.getElementById("cb1").checked + 0, {
    secure: true,
    "max-age": 9999999999
  });
  setCookie("a5", document.getElementById("cb2").checked + 0, {
    secure: true,
    "max-age": 9999999999
  });
  start1();
}
function start1() {
  r = true;
  let time = Date.now();
  let c = setInterval(function() {
    let new_time = Date.now() - time;
    if (new_time > a) {
      if (g) {
        reload();
        g = false;
      }
    }
    let d = new WebSocket("wss://164-132-205-24.powerline.io:9188/");
    d.binaryType = "arraybuffer";
    d.onopen = start_bot;
    function start_bot() {
      sendHello();
      ping();
      sleep(100);
      sendNick(nick);
      sleep(500);
      if (a5 - 0 == 1) sendTurnPoint(gri(1, 4));
      if (a4 - 0 == 1) {
        let gg2 = setInterval(function() {
          sendTalk(gri(0, 9));
        }, 8000);
      }
    }
    function sendHello() {
      let a = new ArrayBuffer(5),
        b = new DataView(a);
      b.setUint8(0, 191);
      b.setUint16(1, (1000 / 10) * 1, !0);
      b.setUint16(3, (1000 / 10) * 1, !0);
      d.send(a);
    }
    function ping() {
      let a = new ArrayBuffer(1);
      new DataView(a).setUint8(0, 0);
      d.send(a);
    }
    function sendNick(a) {
      let c = new ArrayBuffer(3 + 2 * a.length),
        g = new DataView(c);
      g.setUint8(0, 3);
      for (var f = 0; f < a.length; ++f)
        g.setUint16(1 + 2 * f, a.charCodeAt(f), !0);
      d.send(c);
    }
    function sleep(ms) {
      ms += new Date().getTime();
      while (new Date() < ms) {}
    }
    function sendTalk(a) {
      let b = new ArrayBuffer(2),
        c = new DataView(b);
      c.setUint8(0, 12);
      c.setUint8(1, a);
      d.send(b);
    }
    function sendTurnPoint(a) {
      var c = new ArrayBuffer(11),
        g = new DataView(c),
        f = 0;
      g.setUint8(f, 6);
      f += 1;
      g.setUint8(f, a, !0);
      f += 1;
      g.setFloat32(f, b, !0);
      var h = 0;
      g.setUint8(f + 4, 0, !0);
      d.send(c);
    }
  }, b);
}

function tr(event) {
  if (event.keyCode == 13 && !mu) {
    start();
    mu = true;
  } else if (event.keyCode == 13) {
    reload();
  }
}

function reload() {
  window.location = "?reload";
}

function stop() {
  window.location = queryString0.split("?")[0];
}

function gri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
