"use strict";document.addEventListener("DOMContentLoaded",function(){var a=function(a,b){var c=document.createElement("a");return c.setAttribute("href",a),c.textContent=b,c},b=function getSettings(){var a=document.getElementById("category-settings"),b={};return b.delimiter=a?a.dataset.delimiter:"__",b}();(function rebuildSidebarCategory(b){var c=document.querySelector("div.hatena-module-category > div.hatena-module-body");if(c){var d=c.querySelectorAll("ul > li > a");if(d.length){var e=c.querySelector("ul.hatena-urllist");if(e){e.parentNode.removeChild(e);var f=document.createElement("ul");f.className="hatena-urllist",c.appendChild(f),d.forEach(function(c){var d=c.getAttribute("href"),e=c.textContent.trim().split(b.delimiter),g=null;e.forEach(function(b,c){var h=b.replace(/\s+/g,"").replace(/\(\d+\)/g,""),i="category-".concat(h),j="category-level-".concat(c),k=c+1===e.length,l=f.querySelector(".".concat(j,".").concat(i));if(l){if(k){var m=l.querySelector("ul");l.textContent="",l.appendChild(a(d,b)),l.appendChild(m)}g=l}else{var n=document.createElement("li");if(n.classList.add(j,i),k?n.appendChild(a(d,b)):n.textContent=b,0===c)f.appendChild(n);else{var o=g.querySelector("ul");if(o)o.appendChild(n);else{var p=document.createElement("ul");p.appendChild(n),g.appendChild(p)}}g=n}})}),f.querySelectorAll("li").forEach(function(a,b){if(a.querySelector("ul")){var c=document.createElement("label");c.setAttribute("for","category-toggle-checkbox-".concat(b)),c.classList.add("category-toggle-checkbox-label","category-li-label"),a.insertBefore(c,a.firstElementChild);var d=document.createElement("input");d.setAttribute("type","checkbox"),d.setAttribute("id","category-toggle-checkbox-".concat(b)),d.classList.add("category-toggle-checkbox"),a.insertBefore(d,a.firstElementChild)}else{var e=document.createElement("label");e.classList.add("category-not-to-toggle","category-li-label"),a.insertBefore(e,a.firstElementChild)}})}}}})(b),function rebuildEntryCategory(a){var b=document.querySelectorAll("header.entry-header a.entry-category-link");b.length&&b.forEach(function(b){b.textContent=b.textContent.split(a.delimiter).pop()})}(b)});