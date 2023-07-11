!function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){return function(e){if(Array.isArray(e))return e}(t)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}}(t,n)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=window.wp.element,i=window.wp.hooks,c=window.wp.i18n,a=window.wp.blocks,l=window.wp.compose,u=window.wp.blockEditor,s=window.wp.components,d=window.wp.primitives,p=(0,o.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(d.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),w=(0,o.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(d.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})),b=(0,o.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(d.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})),h=window.wp.plugins,m=window.wp.editPost;function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e){return(0,a.hasBlockSupport)(e,"customClassName",!0)}var y=[{name:"mobile",label:"Mobile",icon:p},{name:"tablet",label:"Tablet",icon:w},{name:"desktop",label:"Desktop",icon:b}];var O=(0,l.createHigherOrderComponent)((function(e){return function(t){var r=t.name,i=t.attributes;if(g(r)&&i.hideOn.length){var c=t.wrapperProps;return c=v(v({},c),{},{"data-hide-on":i.hideOn.join(" ")}),(0,o.createElement)(e,n({},t,{wrapperProps:c}))}return(0,o.createElement)(e,t)}})),k=(0,l.createHigherOrderComponent)((function(e){return function(t){if(g(t.name)&&t.isSelected){var n=(0,i.applyFilters)("wp-gutenberg-hidden-blocks.screenSizes",y);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(e,t),(0,o.createElement)(u.InspectorAdvancedControls,null,(0,o.createElement)(s.BaseControl,{id:"hide-on",label:(0,c.__)("Hide on screens")},(0,o.createElement)("div",null,(0,o.createElement)(s.ButtonGroup,null,n.map((function(e){var n,r,i=e.name,c=e.label,a=e.icon;return(0,o.createElement)(s.Button,{icon:a,label:c,isSecondary:!0,isSmall:!0,isPressed:null===(n=t.attributes.hideOn)||void 0===n||null===(r=n.includes)||void 0===r?void 0:r.call(n,i),onClick:function(){var e=t.attributes.hideOn||[];t.setAttributes({hideOn:e.includes(i)?e.filter((function(e){return e!==i})):e.concat([i])})}})})))))))}return(0,o.createElement)(e,t)}}),"withInspectorControl");(0,h.registerPlugin)("wp-gutenberg-hidden-blocks",{render:function(){var e=t((0,o.useState)(!1),2),n=e[0],r=e[1];return(0,o.createElement)(m.PluginMoreMenuItem,{icon:p,onClick:function(){n?(delete document.body.dataset.previewHiddenBlocks,r(!1)):(document.body.dataset.previewHiddenBlocks="true",r(!0))}},n?(0,c.__)("Show all hidden blocks"):(0,c.__)("Preview hiding screen specific blocks"))}}),(0,i.addFilter)("blocks.registerBlockType","wp-gutenberg-hidden-blocks/attribute",(function(e){return g(e.name)&&(e.attributes=v(v({},e.attributes),{},{hideOn:{type:"array",items:{type:"string"},default:[]}})),e})),(0,i.addFilter)("editor.BlockListBlock","wp-gutenberg-hidden-blocks/with-data-attributes",O),(0,i.addFilter)("editor.BlockEdit","wp-gutenberg-hidden-blocks/with-inspector-control",k),(0,i.addFilter)("blocks.getSaveContent.extraProps","wp-gutenberg-hidden-blocks/save-props",(function(e,t,n){return g(t)&&n.hideOn.length&&(e["data-hide-on"]=n.hideOn.join(" ")),e}))}();