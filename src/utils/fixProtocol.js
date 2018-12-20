"use strict";

if(window.document.location.protocol === "http:"
  && window.document.location.port !== "3000")
  window.document.location.replace(window.document.location.href.replace("http", "https"));
