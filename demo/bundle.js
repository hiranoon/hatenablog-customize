'use strict';document.addEventListener('DOMContentLoaded',function(){var a=function(a,b){var c=document.createElement('a');return c.setAttribute('href',a),c.textContent=b,c},b=document.getElementById('category-consts'),c={};c.DELIMITER=b?b.dataset.delimiter:'-';var d=document.querySelector('div.hatena-module-category > div.hatena-module-body');if(d){var e=d.querySelectorAll('ul > li > a');if(e.length){var f=d.querySelector('ul.hatena-urllist');if(f){f.parentNode.removeChild(f);var g=document.createElement('ul');g.className='hatena-urllist',d.appendChild(g),e.forEach(function(b){var d=b.getAttribute('href'),e=b.textContent.trim().split(c.DELIMITER),f=null;e.forEach(function(b,c){var h=b.replace(/\s+/g,'').replace(/\(\d+\)/g,''),i='category-'+h,j='category-level-'+c,k=c+1===e.length,l=g.querySelector('.'+j+'.'+i);if(l){if(k){var m=l.querySelector('ul');l.textContent='',l.appendChild(a(d,b)),l.appendChild(m)}f=l}else{var n=document.createElement('li');if(n.classList.add(j,i),k?n.appendChild(a(d,b)):n.textContent=b,0===c)g.appendChild(n);else{var o=f.querySelector('ul');if(o)o.appendChild(n);else{var p=document.createElement('ul');p.appendChild(n),f.appendChild(p)}}f=n}})}),g.querySelectorAll('li').forEach(function(a,b){if(a.querySelector('ul')){var c=document.createElement('label');c.setAttribute('for','category-toggle-checkbox-'+b),c.classList.add('category-toggle-checkbox-label','category-li-label'),a.insertBefore(c,a.firstElementChild);var d=document.createElement('input');d.setAttribute('type','checkbox'),d.setAttribute('id','category-toggle-checkbox-'+b),d.classList.add('category-toggle-checkbox'),a.insertBefore(d,a.firstElementChild)}else{var e=document.createElement('label');e.classList.add('category-not-to-toggle','category-li-label'),a.insertBefore(e,a.firstElementChild)}});var h=document.querySelectorAll('a.entry-category-link');h.length&&h.forEach(function(a){a.textContent=a.textContent.split(c.DELIMITER).pop()})}}}});
"use strict";document.addEventListener("DOMContentLoaded",function(){var a=JSON.parse(document.querySelectorAll("head script[type=\"application/ld+json\"]")[0].innerText),b=a.datePublished,c=a.dateModified,d=document.querySelector("header.entry-header .entry-date");if(a&&b&&c&&d){var e=document.createElement("span");e.innerText=c.substr(0,10),e.className="modified-date",b.substr(0,10)!==c.substr(0,10)&&d.appendChild(e)}});
