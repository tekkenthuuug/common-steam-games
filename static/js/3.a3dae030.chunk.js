(this["webpackJsonpcommon-steam-games"]=this["webpackJsonpcommon-steam-games"]||[]).push([[3],{25:function(e,a,t){},26:function(e,a,t){},27:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(5);t(25);function m(e){var a=e.game,t=Object(n.useState)(""),m=Object(r.a)(t,2),o=m[0],l=m[1];return function(e,a,t){var n=new Image;n.onload=function(){t(e)},n.onerror=function(){t(a)},n.src=e}("http://cdn.akamai.steamstatic.com/steam/apps/".concat(a.appID,"/header_292x136.jpg"),a.logoURL,l),c.a.createElement("div",{className:"card-container"},c.a.createElement("div",{className:"menu"},c.a.createElement("div",{className:"center-all"},a.name),c.a.createElement("div",{className:"center-all"},c.a.createElement("span",null,c.a.createElement("a",{href:"steam://run/".concat(a.appID),target:"_blank",rel:"noopener noreferrer"},"Run"))),c.a.createElement("div",{className:"center-all"},c.a.createElement("span",null,c.a.createElement("a",{href:"https://steamcommunity.com/app/".concat(a.appID),target:"_blank",rel:"noopener noreferrer"},"Steam Store")))),c.a.createElement("img",{src:o,alt:"Game logo",title:a.name,className:"card"}))}t(26);function o(e){var a=e.setCommonGames,t=e.commonGames;return t=t.filter((function(e){return!e.name.toLowerCase().split(" ").includes("test")})),c.a.createElement(c.a.Fragment,null,c.a.createElement("button",{onClick:function(){return a([])},className:"back-button"},"Go Back"),c.a.createElement("div",{className:"dgrid"},t.map((function(e,a){return c.a.createElement(m,{key:a,game:e,className:"card"})}))))}t.d(a,"default",(function(){return o}))}}]);
//# sourceMappingURL=3.a3dae030.chunk.js.map