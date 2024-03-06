"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(electron.ipcRenderer));
function withPrototype(obj) {
  const protos = Object.getPrototypeOf(obj);
  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      continue;
    if (typeof value === "function") {
      obj[key] = function(...args) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  }
};
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);
window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};
setTimeout(removeLoading, 4999);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vZWxlY3Ryb24vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJ1xuXG4vLyAtLS0tLS0tLS0gRXhwb3NlIHNvbWUgQVBJIHRvIHRoZSBSZW5kZXJlciBwcm9jZXNzIC0tLS0tLS0tLVxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnaXBjUmVuZGVyZXInLCB3aXRoUHJvdG90eXBlKGlwY1JlbmRlcmVyKSlcblxuLy8gYGV4cG9zZUluTWFpbldvcmxkYCBjYW4ndCBkZXRlY3QgYXR0cmlidXRlcyBhbmQgbWV0aG9kcyBvZiBgcHJvdG90eXBlYCwgbWFudWFsbHkgcGF0Y2hpbmcgaXQuXG5mdW5jdGlvbiB3aXRoUHJvdG90eXBlKG9iajogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICBjb25zdCBwcm90b3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHByb3RvcykpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgY29udGludWVcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFNvbWUgbmF0aXZlIEFQSXMsIGxpa2UgYE5vZGVKUy5FdmVudEVtaXR0ZXJbJ29uJ11gLCBkb24ndCB3b3JrIGluIHRoZSBSZW5kZXJlciBwcm9jZXNzLiBXcmFwcGluZyB0aGVtIGludG8gYSBmdW5jdGlvbi5cbiAgICAgIG9ialtrZXldID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueSkge1xuICAgICAgICByZXR1cm4gdmFsdWUuY2FsbChvYmosIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9ialxufVxuXG4vLyAtLS0tLS0tLS0gUHJlbG9hZCBzY3JpcHRzIGxvYWRpbmcgLS0tLS0tLS0tXG5mdW5jdGlvbiBkb21SZWFkeShjb25kaXRpb246IERvY3VtZW50UmVhZHlTdGF0ZVtdID0gWydjb21wbGV0ZScsICdpbnRlcmFjdGl2ZSddKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBpZiAoY29uZGl0aW9uLmluY2x1ZGVzKGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XG4gICAgICByZXNvbHZlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb24uaW5jbHVkZXMoZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5jb25zdCBzYWZlRE9NID0ge1xuICBhcHBlbmQocGFyZW50OiBIVE1MRWxlbWVudCwgY2hpbGQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKCFBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmluZChlID0+IGUgPT09IGNoaWxkKSkge1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH1cbiAgfSxcbiAgcmVtb3ZlKHBhcmVudDogSFRNTEVsZW1lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmluZChlID0+IGUgPT09IGNoaWxkKSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgIH1cbiAgfSxcbn1cblxuLyoqXG4gKiBodHRwczovL3RvYmlhc2FobGluLmNvbS9zcGlua2l0XG4gKiBodHRwczovL2Nvbm5vcmF0aGVydG9uLmNvbS9sb2FkZXJzXG4gKiBodHRwczovL3Byb2plY3RzLmx1a2VoYWFzLm1lL2Nzcy1sb2FkZXJzXG4gKiBodHRwczovL21hdGVqa3VzdGVjLmdpdGh1Yi5pby9TcGluVGhhdFNoaXRcbiAqL1xuZnVuY3Rpb24gdXNlTG9hZGluZygpIHtcbiAgY29uc3QgY2xhc3NOYW1lID0gYGxvYWRlcnMtY3NzX19zcXVhcmUtc3BpbmBcbiAgY29uc3Qgc3R5bGVDb250ZW50ID0gYFxuQGtleWZyYW1lcyBzcXVhcmUtc3BpbiB7XG4gIDI1JSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApOyB9XG4gIDUwJSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDE4MGRlZyk7IH1cbiAgNzUlIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSByb3RhdGVZKDE4MGRlZyk7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgcm90YXRlWSgwKTsgfVxufVxuLiR7Y2xhc3NOYW1lfSA+IGRpdiB7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGFuaW1hdGlvbjogc3F1YXJlLXNwaW4gM3MgMHMgY3ViaWMtYmV6aWVyKDAuMDksIDAuNTcsIDAuNDksIDAuOSkgaW5maW5pdGU7XG59XG4uYXBwLWxvYWRpbmctd3JhcCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiAjMjgyYzM0O1xuICB6LWluZGV4OiA5O1xufVxuICAgIGBcbiAgY29uc3Qgb1N0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBjb25zdCBvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBvU3R5bGUuaWQgPSAnYXBwLWxvYWRpbmctc3R5bGUnXG4gIG9TdHlsZS5pbm5lckhUTUwgPSBzdHlsZUNvbnRlbnRcbiAgb0Rpdi5jbGFzc05hbWUgPSAnYXBwLWxvYWRpbmctd3JhcCdcbiAgb0Rpdi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjxkaXY+PC9kaXY+PC9kaXY+YFxuXG4gIHJldHVybiB7XG4gICAgYXBwZW5kTG9hZGluZygpIHtcbiAgICAgIHNhZmVET00uYXBwZW5kKGRvY3VtZW50LmhlYWQsIG9TdHlsZSlcbiAgICAgIHNhZmVET00uYXBwZW5kKGRvY3VtZW50LmJvZHksIG9EaXYpXG4gICAgfSxcbiAgICByZW1vdmVMb2FkaW5nKCkge1xuICAgICAgc2FmZURPTS5yZW1vdmUoZG9jdW1lbnQuaGVhZCwgb1N0eWxlKVxuICAgICAgc2FmZURPTS5yZW1vdmUoZG9jdW1lbnQuYm9keSwgb0RpdilcbiAgICB9LFxuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgeyBhcHBlbmRMb2FkaW5nLCByZW1vdmVMb2FkaW5nIH0gPSB1c2VMb2FkaW5nKClcbmRvbVJlYWR5KCkudGhlbihhcHBlbmRMb2FkaW5nKVxuXG53aW5kb3cub25tZXNzYWdlID0gZXYgPT4ge1xuICBldi5kYXRhLnBheWxvYWQgPT09ICdyZW1vdmVMb2FkaW5nJyAmJiByZW1vdmVMb2FkaW5nKClcbn1cblxuc2V0VGltZW91dChyZW1vdmVMb2FkaW5nLCA0OTk5KVxuIl0sIm5hbWVzIjpbImNvbnRleHRCcmlkZ2UiLCJpcGNSZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7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
