"use strict";document.addEventListener("DOMContentLoaded",function(){var a=function(a,b){var c=document.createElement("a");return c.setAttribute("href",a),c.textContent=b,c},b=document.querySelector("div.hatena-module-category > div.hatena-module-body");if(b){var c=b.querySelectorAll("ul > li > a");if(c.length){var d=b.querySelector("ul.hatena-urllist");if(d){d.parentNode.removeChild(d);var e=document.createElement("ul");e.className="hatena-urllist",b.appendChild(e),c.forEach(function(b){var c=b.getAttribute("href"),d=b.textContent.trim().split("-"),f=null;d.forEach(function(b,g){var h=b.replace(/\s+/g,"").replace(/\(\d+\)/g,""),i="category-"+h,j="category-level-"+g,k=g+1===d.length,l=e.querySelector("."+j+"."+i);if(l){if(k){var m=l.querySelector("ul");l.textContent="",l.appendChild(a(c,b)),l.appendChild(m)}f=l}else{var n=document.createElement("li");if(n.classList.add(j,i),k?n.appendChild(a(c,b)):n.textContent=b,0===g)e.appendChild(n);else{var o=f.querySelector("ul");if(o)o.appendChild(n);else{var p=document.createElement("ul");p.appendChild(n),f.appendChild(p)}}f=n}})}),e.querySelectorAll("li").forEach(function(a,b){if(a.querySelector("ul")){var c=document.createElement("label");c.setAttribute("for","category-toggle-checkbox-"+b),c.classList.add("category-toggle-checkbox-label","category-li-label"),a.insertBefore(c,a.firstElementChild);var d=document.createElement("input");d.setAttribute("type","checkbox"),d.setAttribute("id","category-toggle-checkbox-"+b),d.classList.add("category-toggle-checkbox"),a.insertBefore(d,a.firstElementChild)}else{var e=document.createElement("label");e.classList.add("category-not-to-toggle","category-li-label"),a.insertBefore(e,a.firstElementChild)}})}}}});
"use strict";document.addEventListener("DOMContentLoaded",function(){var a=JSON.parse(document.querySelectorAll("head script[type=\"application/ld+json\"]")[0].innerText),b=a.datePublished,c=a.dateModified,d=document.querySelector("header.entry-header .entry-date");if(a&&b&&c&&d){var e=document.createElement("span");e.innerText=c.substr(0,10),e.className="modified-date",b.substr(0,10)!==c.substr(0,10)&&d.appendChild(e)}});
