//-----------------------------------------------
// Proxy to access current tab recorder instance
// ----------------------------------------------
function RecorderProxy() {
  this.active = null;
}

RecorderProxy.prototype.start = function(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.runtime.sendMessage({
      action: "start",
      recorded_tab: tab.id,
      start_url: url
    });
  });
};

RecorderProxy.prototype.stop = function() {
  chrome.runtime.sendMessage({ action: "stop" });
};

RecorderProxy.prototype.open = function(url, callback) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { action: "open", url: url }, callback);
  });
};

RecorderProxy.prototype.addComment = function(text, callback) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(
      tab.id,
      { action: "addComment", text: text },
      callback
    );
  });
};

//-----------------------------------------------
// UI
//----------------------------------------------
function RecorderUI() {
  this.recorder = new RecorderProxy();
  chrome.runtime.sendMessage({ action: "get_status" }, function(response) {
    if (response.active) {
      ui.set_started();
    } else {
      if (!response.empty) {
        ui.set_stopped();
      }
      chrome.tabs.getSelected(null, function(tab) {
        document.forms[0].elements["url"].value = tab.url;
      });
    }
  });
}

RecorderUI.prototype.start = function() {
  var url = document.forms[0].elements["url"].value;
  if (url == "") {
    return false;
  }
  if (url.indexOf("http://") == -1 && url.indexOf("https://")) {
    url = "http://" + url;
  }
  ui.set_started();
  ui.recorder.start(url);

  return false;
};

RecorderUI.prototype.set_started = function() {
  var e = document.getElementById("bstop");
  e.style.display = "";
  e.onclick = ui.stop;
  e.value = "Stop Recording";
  e = document.getElementById("bgo");
  e.style.display = "none";
  e = document.getElementById("bcomment");
  e.style.display = "";
  e = document.getElementById("bexport");
  e.style.display = "none";
  e = document.getElementById("bexportxy");
  e.style.display = "none";
  e = document.getElementById("bdoc");
  e.style.display = "none";
};

RecorderUI.prototype.stop = function() {
  ui.set_stopped();
  ui.recorder.stop();
  return false;
};

RecorderUI.prototype.set_stopped = function() {
  var e = document.getElementById("bstop");
  e.style.display = "none";
  e = document.getElementById("bgo");
  e.style.display = "";
  e = document.getElementById("bcomment");
  e.style.display = "none";
  e = document.getElementById("bexport");
  e.style.display = "";
  e = document.getElementById("bexportxy");
  e.style.display = "";
  e = document.getElementById("bdoc");
  e.style.display = "";
};

RecorderUI.prototype.showcomment = function() {
  var e = document.getElementById("bcomment");
  e.style.display = "none";
  e = document.getElementById("comment");
  e.style.display = "";
  e = document.getElementById("ctext");
  e.focus();
  return false;
};

RecorderUI.prototype.hidecomment = function(bsave) {
  var e = document.getElementById("bcomment");
  e.style.display = "";
  e = document.getElementById("comment");
  e.style.display = "none";
  e = document.getElementById("ctext");
  if (bsave) {
    var txt = e.value;
    if (txt && txt.length > 0) {
      this.recorder.addComment(e.value, null);
    }
  }
  e.value = "";
  return false;
};

RecorderUI.prototype.export = function(options) {
  if (options && options.xy) {
    chrome.tabs.create({ url: "./public/views/nightwatch.html?xy=true" });
  } else {
    chrome.tabs.create({ url: "./public/views/nightwatch.html" });
  }
};
RecorderUI.prototype.exportdoc = function(bexport) {
  chrome.tabs.create({ url: "./public/views/doc.html" });
};

var ui;

// bind events to ui elements
window.onload = function() {
  document.querySelector("input#bgo").onclick = function() {
    ui.start();
    return false;
  };
  document.querySelector("input#bstop").onclick = function() {
    ui.stop();
    return false;
  };
  document.querySelector("input#bcomment").onclick = function() {
    ui.showcomment();
    return false;
  };
  document.querySelector("input#bexport").onclick = function() {
    ui.export();
    return false;
  };
  document.querySelector("input#bexportxy").onclick = function() {
    ui.export({ xy: true });
    return false;
  };
  document.querySelector("input#bdoc").onclick = function() {
    ui.exportdoc();
    return false;
  };
  document.querySelector("input#bsavecomment").onclick = function() {
    ui.hidecomment(true);
    return false;
  };
  document.querySelector("input#bcancelcomment").onclick = function() {
    ui.hidecomment(false);
    return false;
  };
  document.querySelector("#tagline").onclick = function() {
    this.innerText = "Omne phantasma resurrectionem suam promit.";
  };
  ui = new RecorderUI();
};
