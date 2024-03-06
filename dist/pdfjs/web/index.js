


window.addEventListener('load', function () {
    const DEFAULT_SCALE_DELTA = 1.1;
    const MIN_SCALE = 0.25;
    const MAX_SCALE = 10.0;
    const DEFAULT_SCALE_VALUE = "auto";
    var isHighlighting = false;
    var highlightColor = '255,255,0';
    var annotations = [];
    var pdfName = '';
    var _viewMark = '';
    var selectAnnotate = null;
    var rangesDom = [];
    var selectColor = 'rgba(0,0,255,0.3)';
    var interval = null;
    var waitPdfId = '';
    var coordinates = [];
    var viewPoints = [];
    var doCreateRect = false;
    var _dragAnnotate = null;

    var toolType = '';

    var mdId = '';

    var isTempHighlight = false;

    var drag = false, startX = 0, startY = 0, dx = 0, dy = 0;
    var rectDom = null;
    var textLayer = null;
    var top = 0, bottom = 0;

    var path = "", basename = '', mdPath = '';

    var setTime = null;
    var openProtocol = null;
    var firstExport = 1;
    var isMobile = false;
    var isFirst = true;
    var imageFolder = '';

    var pdfFactory = null;

    var useOldVersion = false;

    var cacheRects = null, cacheRect = null, cacheOst = null, cacheCoordinates = null, cacheText = '', cacheTime = null;

    var language = '';

    var noteImage = new Image()

    noteImage.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAAAXNSR0IArs4c6QAAAWNJREFUOE+tlL1Lw1AUxc8RN/O6Fmf7Hzg0uPgCTqK4OYgfmx9NJ1Fw7Kago6mKCH5Nbjqog5DgYkT/hDhLV1M3yZUEWmpIUyu+5T3uPefH4V3eIwDYWt0AmAZwSpEXIR2KzMY9Ia/iPW8JcVx3w2VWdeEgQtSoe81aL1O3fkUbNQoVba3E8UL+FRT7qtrQAt79gIlfcgHoPsAezcDqBpM+QImUZsBc2HvjKxEOFweT/fbhE5MTQ8k53esJi83xagGqWw3s7xTb4M5eT9i/Juvn3vKSvQIY/TWMeGI5GMscQBoifmkBwHlHfZFmcJHWtWEVrR4JnDheeJaVSPyRDYC7gGzSfNvL0thaLVFkjpVxwyK5DmAqJXx2vNBMm22tfADlVP0ekWx3fUa2Ni5BKscNZ1pG21LXEAkdrzmflTD3TdpWIfkxKFFdOLAWHx33I/lN+obFBlurQwArAI4cL1zNm/Q35w3C3z6JOu0AAAAASUVORK5CYII=`



    var useTranslate,
        translateAppId,
        translateKey,
        translateType;

    var locale = {
        'zh-cn': {
            'page': '页'
        },
        'zn': {
            'page': 'Page'
        }
    };


    function stringToRaw(text) {
        let out = [];
        for (let c of text) {
            c = c.charCodeAt(0);
            out.push(String.fromCharCode(c >> 8));
            out.push(String.fromCharCode(c & 0xFF));
        }
        return 'þÿ' + out.join('');
    }


    Element.prototype.hasClass = function (str) {
        return this.classList.contains(str);
    }

    let annotateResizeIcon = '<svg t="1629004332697"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3111" width="16" height="16"><path d="M914.56 463.78z m-110.53 0q0 30.34 14.63 55.81 14.63 25.46 40.63 40.09 26 14.63 54.72 14.63t55.26-14.63q26.55-14.63 40.63-40.09 14.09-25.47 14.09-55.27 0-29.8-14.09-55.27-14.08-25.46-40.63-40.63-26.55-15.17-55.26-15.17-28.72 0-54.72 15.17t-40.63 40.63q-14.63 25.47-14.63 54.73z m110.53 358.67z m-110.53 0q0 29.26 14.63 54.72 14.63 25.47 40.63 40.63 26 15.17 54.72 15.17t55.26-15.17q26.55-15.17 40.63-40.63 14.09-25.46 14.09-55.26 0-29.8-14.09-54.73-14.08-24.92-40.63-39.55Q942.72 713 914.01 713q-28.72 0-54.72 14.63t-40.63 39.55q-14.63 24.93-14.63 55.27z m-284.99 0z m-109.44 0q0 46.6 30.88 78.02 30.88 31.42 78.55 32.51 46.6-1.09 78.03-32.51 31.42-31.42 32.5-78.02-1.08-47.68-32.5-78.56-31.43-30.88-78.03-30.88-47.67 0-78.55 30.88-30.88 30.88-30.88 78.56z m109.44-358.67z m-109.44 0q0 47.68 30.88 78.56 30.88 30.88 78.55 31.97 46.6-1.09 78.03-31.97 31.42-30.88 32.5-78.56-1.08-46.59-32.5-77.47-31.43-30.88-78.03-33.06-47.67 2.17-78.55 33.06-30.88 30.88-30.88 77.47z m504.96-353.25z m-110.53 0q0 29.25 14.63 54.72t40.63 40.63q26 15.17 54.72 15.17t55.26-15.17q26.55-15.17 40.63-40.63 14.09-25.47 14.09-55.26 0-29.8-14.09-54.72-14.08-24.93-40.63-40.09Q942.72 0.01 914.01 0.01q-28.72 0-54.72 15.17t-40.63 40.09q-14.63 24.92-14.63 55.27zM109.44 822.45zM0 822.45q1.08 29.26 15.17 54.72 14.09 25.47 40.09 40.63 26 15.17 54.72 15.17t55.27-15.17q26.55-15.17 40.63-40.63 14.09-25.46 15.17-54.72-2.16-47.68-33.05-78.56-30.88-30.88-78.56-30.88-46.59 0-77.47 30.88Q1.09 774.77 0.01 822.45z" p-id="3112"></path></svg>';
    let annotateCommentIcon = '<svg t="1632228228676"  viewBox="0 0 1214 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15810" width="12" height="12"><path d="M964.352982 196.442274H250.01744A53.575166 53.575166 0 0 0 196.442274 250.01744v339.309382A53.575166 53.575166 0 0 0 250.01744 642.901988h214.300663l117.508196 117.508197a35.716777 35.716777 0 0 0 50.717824 0L750.052319 642.901988h214.300663a53.575166 53.575166 0 0 0 53.575166-53.575166V250.01744A53.575166 53.575166 0 0 0 964.352982 196.442274z" fill="#FFC824" p-id="15811"></path><path d="M607.185211 477.53331a35.716777 35.716777 0 0 1-35.716777-35.716777v-53.575166a35.716777 35.716777 0 1 1 71.433554 0v53.575166a35.716777 35.716777 0 0 1-35.716777 35.716777zM383.955354 477.53331a35.716777 35.716777 0 0 1-35.716777-35.716777v-53.575166a35.716777 35.716777 0 1 1 71.433554 0v53.575166a35.716777 35.716777 0 0 1-35.716777 35.716777zM830.415068 477.53331a35.716777 35.716777 0 0 1-35.716777-35.716777v-53.575166a35.716777 35.716777 0 1 1 71.433554 0v53.575166a35.716777 35.716777 0 0 1-35.716777 35.716777zM361.453784 71.433554h-17.858388a35.716777 35.716777 0 0 1 0-71.433554h17.858388a35.716777 35.716777 0 0 1 0 71.433554z" fill="#6B400D" p-id="15812"></path><path d="M607.185211 1024a107.150331 107.150331 0 0 1-75.719567-31.430764l-153.224974-153.224974H142.867108a142.867108 142.867108 0 0 1-142.867108-142.867108V142.867108a142.867108 142.867108 0 0 1 142.867108-142.867108h53.575166a35.716777 35.716777 0 0 1 0 71.433554H142.867108a71.433554 71.433554 0 0 0-71.433554 71.433554v553.610046a71.433554 71.433554 0 0 0 71.433554 71.433554h250.01744a35.716777 35.716777 0 0 1 25.358912 10.357865l163.582839 163.940007a35.716777 35.716777 0 0 0 50.717824 0l163.582839-163.940007a35.716777 35.716777 0 0 1 25.358912-10.357865h250.01744a71.433554 71.433554 0 0 0 71.433554-71.433554V142.867108a71.433554 71.433554 0 0 0-71.433554-71.433554H535.751657a35.716777 35.716777 0 0 1 0-71.433554h535.751657a142.867108 142.867108 0 0 1 142.867108 142.867108v553.610046a142.867108 142.867108 0 0 1-142.867108 142.867108h-235.373562l-153.224973 153.224974a107.150331 107.150331 0 0 1-75.719568 31.430764z" fill="#6B400D" p-id="15813"></path></svg>'

    var toggleDom = document.querySelector('.icon-toggle');
    var siderDom = document.querySelector('.viewerSider');
    var zoomInDom = document.querySelector('.icon-zoomIn');
    var zoomOutDom = document.querySelector('.icon-zoomOut');
    var annotateMenu = document.querySelector('.annotate-menu');
    var annotateHighlightMenu = this.document.querySelector('.annotate-highlight');
    var annotateContainerDom = document.querySelector('.viewerSiderAnnotate');
    var createImageDom = document.querySelector('.icon-createImage');
    var infoDom = document.querySelector('.icon-info');

    let pdfContainer = document.getElementById('viewerContainer');

    var addNoteDom = document.querySelector('.add-comment');

    var textareaDom = addNoteDom.querySelector('textarea');

    var translateDom = document.querySelector('.annotate-translate');
    var translateDomContent = document.querySelector('.annotate-translate-content');

    var selectBoxDom = null;

    var lastInkAnnotation = null, waitAction = null;
    var selectWidth = 2, lastPointer = [];




    // zoomInDom.onclick=()=>{
    // 	var ticks = 1;
    // 	let newScale = pdfViewer.currentScale;
    // 	var left = pdfContainer.scrollLeft;
    // 	var top = pdfContainer.scrollTop;
    // 	do {
    // 	  newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
    // 	  newScale = Math.ceil(newScale * 10) / 10;
    // 	  newScale = Math.min(MAX_SCALE, newScale);
    // 	} while (--ticks && newScale < MAX_SCALE);
    // 	pdfViewer.currentScaleValue = newScale;
    // 	setTimeout(()=>{
    // 		pdfContainer.scrollTop = top;
    // 		pdfContainer.scrollLeft = left;
    // 	},0)
    // }

    // zoomOutDom.onclick=()=>{
    // 	var ticks = 1;
    // 	let newScale = pdfViewer.currentScale;
    // 	do {
    // 	newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
    // 	newScale = Math.floor(newScale * 10) / 10;
    // 	newScale = Math.max(MIN_SCALE, newScale);
    // 	} while (--ticks && newScale > MIN_SCALE);
    // 	pdfViewer.currentScaleValue = newScale;
    // }

    // toggleDom.onclick = ()=>{
    // 	 if(!siderDom.style.display||siderDom.style.display=='none'){
    // 		siderDom.style.display = 'flex'
    // 	 }else{
    // 		 siderDom.style.display = 'none'
    // 	 }
    // }


    $('body').on('click', '#viewThumbnail', function () {
        $('.viewerSiderAnnotate').addClass('hidden');
        $('#thumbnailView').removeClass('hidden');
        $('#outlineView').addClass('hidden');

        $('#showAnnotation').removeClass('toggled');
    });


    $('body').on('click', '#viewOutline', function () {
        $('.viewerSiderAnnotate').addClass('hidden');
        $('#thumbnailView').addClass('hidden');
        $('#outlineView').removeClass('hidden');

        $('#showAnnotation').removeClass('toggled');
    });

    $('body').on('click', '#showAnnotation', function () {
        $('.viewerSiderAnnotate').removeClass('hidden');
        $('#thumbnailView').addClass('hidden');
        $('#outlineView').addClass('hidden');

        $('#viewThumbnail').removeClass('toggled');
        $('#viewOutline').removeClass('toggled');
        $(this).addClass('toggled');

        createSiderAnnotations();

    });

    var viewerContainerDom = document.querySelector('#viewerContainer');

    var scrolling = false;

    viewerContainerDom.onscroll = function () {
        if (scrolling) return
        //if (selectAnnotation) {
        clearSelection()
        showSideAnnotation()
        //}
    }

    function showSideAnnotation(id) {
        var children = annotateContainerDom.children;
        for (let t of children) {
            t.classList.remove('active');
            if (id && t.getAttribute('data-id') == id) {
                t.classList.add('active')
            }
        }
    }

    // selectBoxDom.onmousedown = mousedown;
    // selectBoxDom.onpointerdown = mousedown;


    var direct = '', resize = false, rbox = {}, clonePaths = [];

    function mousedown(e) {

        e.stopPropagation();
        e.preventDefault();
        // console.log(e);

        // if (e.pointerType === 'mouse') {
        // 	return;
        // }

        //console.log(selectAnnotate);
        pointerDownPosition = null;

        if (selectAnnotate && selectAnnotate.type == 'ink') {
            selectBoxDom && (selectBoxDom._drag = true);
        }

        if (e.target.closest('.selectBoxRexize')) {
            resize = true;
            direct = e.target.closest('.selectBoxRexize').getAttribute('data-direct');

            rbox = {
                x: parseFloat(selectBoxDom.style.left),
                y: parseFloat(selectBoxDom.style.top),
                w: parseFloat(selectBoxDom.style.width),
                h: parseFloat(selectBoxDom.style.height)
            }
        }

        x = e.touches ? e.touches[0].clientX : e.clientX;
        y = e.touches ? e.touches[0].clientY : e.clientY;

        sx = parseFloat(selectBoxDom.style.left);
        sy = parseFloat(selectBoxDom.style.top);

        clonePaths = [];

        if (!selectAnnotate) {
            return
        }

        var paths = selectAnnotate.position.paths;
        if (paths && paths.length) {
            for (let path of paths) {
                clonePaths.push(path.slice());
            }
        }


        pdfContainer.ontouchmove = mousemove;
        pdfContainer.onmousemove = mousemove;

        pdfContainer.ontouchend = mousup
        pdfContainer.onmouseup = mousup

    }

    function mousemove(e) {
        e.preventDefault();

        if (resize) {
            annotateMenu.style.display = 'none';
            if (direct == 'up' || direct == 'bottom') {

                let clientY = e.touches ? e.touches[0].clientY : e.clientY;
                dy = clientY - y;
                if (direct == 'up') {
                    selectBoxDom.style.top = rbox.y + dy + 'px';
                    selectBoxDom.style.height = rbox.h - dy + 'px';
                } else {
                    selectBoxDom.style.height = rbox.h + dy + 'px';
                }
            } else {
                let clientX = e.touches ? e.touches[0].clientX : e.clientX;
                dx = clientX - x;
                if (direct == 'left') {
                    selectBoxDom.style.left = rbox.x + dx + 'px';
                    selectBoxDom.style.width = rbox.w - dx + 'px';
                } else {
                    selectBoxDom.style.width = rbox.w + dx + 'px';
                }
            }
        }


        if (selectBoxDom && selectBoxDom._drag) {
            e.preventDefault();
            annotateMenu.style.display = 'none';

            let clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let clientY = e.touches ? e.touches[0].clientY : e.clientY;
            dx = clientX - x;
            dy = clientY - y;


            selectBoxDom.style.left = sx + dx + 'px';
            selectBoxDom.style.top = sy + dy + 'px';
        }
    }


    function mousup(evt) {
        selectBoxDom && (selectBoxDom._drag = false);
        pdfContainer.onmousemove = null;
        pdfContainer.ontouchmove = null;

        pdfContainer.ontouchend = null
        pdfContainer.onmouseup = null

        // if (isMobile) {
        // 	document.ontouchmove = null;
        // }

        if (!selectAnnotate) return

        let page = PDFViewerApplication.pdfViewer._pages[selectAnnotate.position.pageIndex];

        //var boundRect = page.div.getBoundingClientRect();
        // resize image
        if (resize) {
            var ebox = {
                x: parseFloat(selectBoxDom.style.left),
                y: parseFloat(selectBoxDom.style.top),
                w: parseFloat(selectBoxDom.style.width),
                h: parseFloat(selectBoxDom.style.height)
            }


            let pp = {
                pageIndex: selectAnnotate.position.pageIndex,
                rects: [[ebox.x + 6, ebox.y + 6, ebox.x + 6 - 12 + ebox.w, ebox.y + 6 + ebox.h - 12]]
            };

            var r = v2p(pp, page.viewport);
            selectAnnotate.position.rects = [r.rects[0].slice()]

            direct = '';
            resize = false;



            updatePageAnnotation(selectAnnotate);

            clearSelection();

            //	createAnnotationBox(selectAnnotate, getPositionBoundingRect(selectAnnotate.position), evt)

            return
        }

        let pp = {
            pageIndex: selectAnnotate.position.pageIndex,
            rects: [[sx, sy, sx + dx, sy + dy]]
        };

        var eRect = v2p(pp, page.viewport);
        var realRect = eRect.rects[0];

        var realDx = Math.abs(realRect[2] - realRect[0]) * dx / Math.abs(dx);
        var realDy = Math.abs(realRect[3] - realRect[1]) * dy / Math.abs(dy);

        if (realDx && realDy) {
            var paths = [];
            for (let path of clonePaths) {
                var p = []

                for (let i = 0; i < path.length; i += 2) {
                    var cx = path[i] + realDx;
                    var cy = path[i + 1] - realDy;
                    p.push(cx);
                    p.push(cy);
                }
                paths.push(p)
            }
            selectAnnotate.position.paths = paths;
        }

        dx = 0;
        dy = 0;

        updatePageAnnotation(selectAnnotate);

        clearSelection();

        //createAnnotationBox(selectAnnotate, getPositionBoundingRect(selectAnnotate.position), evt)

    }

    function createAnnotationBox(annotation, evt) {

        var _page = _pages.find(x => x.pageIndex == annotation.position.pageIndex);
        if (!_page) {
            return
        }

        addNoteDom.style.display = 'none';

        //var pos = getAnnotationBox(annotation.position);

        var vpos = p2v(annotation.position);
        // console.log(vpos, annotation)

        var rbox = getAnnotationBox(vpos);


        //var rects = _page.page.p2vPoint(box);

        //let rect = _page.page.originalPage.div.getBoundingClientRect();

        if (!rbox) {
            return
        }
        selectBoxDom = document.createElement('div');
        selectBoxDom.classList.add('selectBox');

        _page.page.originalPage.div.appendChild(selectBoxDom);

        selectBoxDom.innerHTML = `
		<div class="selectBoxRexize selectBoxRexizeUp" data-direct="up">
      <svg t="1693476083793"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="8438" width="16" height="16">
        <path
          d="M759.466667 533.333333L469.333333 243.2l29.866667-29.866667 320 320-320 320-29.866667-29.866666 290.133334-290.133334z m-298.666667 0L170.666667 243.2l29.866666-29.866667 320 320L200.533333 853.333333l-29.866666-29.866666 290.133333-290.133334z"
          fill="#444444" p-id="8439"></path>
      </svg>
    </div>

    <div class="selectBoxRexize selectBoxRexizeRight" data-direct="right">
      <svg t="1693476083793"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="8438" width="16" height="16">
        <path
          d="M759.466667 533.333333L469.333333 243.2l29.866667-29.866667 320 320-320 320-29.866667-29.866666 290.133334-290.133334z m-298.666667 0L170.666667 243.2l29.866666-29.866667 320 320L200.533333 853.333333l-29.866666-29.866666 290.133333-290.133334z"
          fill="#444444" p-id="8439"></path>
      </svg>
    </div>

    <div class="selectBoxRexize selectBoxRexizeBottom" data-direct="bottom">
      <svg t="1693476083793"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="8438" width="16" height="16">
        <path
          d="M759.466667 533.333333L469.333333 243.2l29.866667-29.866667 320 320-320 320-29.866667-29.866666 290.133334-290.133334z m-298.666667 0L170.666667 243.2l29.866666-29.866667 320 320L200.533333 853.333333l-29.866666-29.866666 290.133333-290.133334z"
          fill="#444444" p-id="8439"></path>
      </svg>
    </div>

    <div class="selectBoxRexize selectBoxRexizeLeft" data-direct="left">
      <svg t="1693476083793"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="8438" width="16" height="16">
        <path
          d="M759.466667 533.333333L469.333333 243.2l29.866667-29.866667 320 320-320 320-29.866667-29.866666 290.133334-290.133334z m-298.666667 0L170.666667 243.2l29.866666-29.866667 320 320L200.533333 853.333333l-29.866666-29.866666 290.133333-290.133334z"
          fill="#444444" p-id="8439"></path>
      </svg>
    </div>
		`;



        selectBoxDom.style.left = rbox.x1 - 6 + 'px';
        selectBoxDom.style.top = rbox.y1 - 6 + 'px';
        selectBoxDom.style.width = Math.abs(rbox.x2 - rbox.x1) + 12 + 'px';
        selectBoxDom.style.height = Math.abs(rbox.y2 - rbox.y1) + 12 + 'px';
        selectBoxDom.style.display = 'block';

        if (selectBoxDom.classList.contains('resize')) {
            selectBoxDom.classList.remove('resize');
        }

        if (annotation && annotation.type == 'image') {
            selectBoxDom.classList.add('resize');
        }

        //selectBoxDom.onmousedown = mousedown;
        //selectBoxDom.onpointerdown = mousedown;

        var time = isMobile ? 400 : 0;
        setTimeout(() => {
            selectBoxDom.onmousedown = mousedown;
            selectBoxDom.ontouchstart = mousedown;
        }, time);

        // var box = {
        // 	x: parseFloat(selectBoxDom.style.left),
        // 	y: parseFloat(selectBoxDom.style.top),
        // 	w: parseFloat(selectBoxDom.style.width),
        // 	h: parseFloat(selectBoxDom.style.height)
        // }


        // if (evt) {
        // 	var x = evt.clientX;
        // 	var y = evt.clientY;
        // 	var w = document.body.clientWidth;
        // 	var h = document.body.clientHeight;

        // 	annotateMenu.style.display = 'block';

        // 	if (y > h - 80) {
        // 		annotateMenu.style.left = x - 80 + 'px';
        // 		annotateMenu.style.top = box.y + box.h + 60 + 'px';
        // 		if (x > w - 60) {
        // 			annotateMenu.style.left = x - 120 + 'px';

        // 		}
        // 	} else {
        // 		annotateMenu.style.left = x - 80 + 'px';
        // 		annotateMenu.style.top = box.y + box.h + 60 + 'px';

        // 		if (x > w - 60) {
        // 			annotateMenu.style.left = box.x - 120 + 'px';
        // 		}
        // 	}


        // 	if (useTranslate && ['highlight', 'underline', 'strokeout'].indexOf(selectAnnotate.type) > -1) {
        // 		if (translateAppId && translateKey) {
        // 			var dx = parseFloat(annotateMenu.style.left);
        // 			var dy = parseFloat(annotateMenu.style.top);

        // 			translateDom.style.left = `${dx}px`;
        // 			translateDom.style.top = `${dy + 40}px`;
        // 			translateDom.style.display = 'block';
        // 			translateDomContent.innerText = "...";

        // 			query = selectAnnotate.text;

        // 			baiduTranslate(translateAppId, translateKey, query, 'zh', function (data) {
        // 				if (data && data.trans_result && data.trans_result.length) {
        // 					translateDomContent.innerText = data.trans_result[0].dst
        // 					var h = translateDom.clientHeight;
        // 					var dis = document.body.clientHeight - y - 50 - h;
        // 					if (dis < 0) {
        // 						translateDom.style.top = `${dy - h - 20}px`;
        // 					}

        // 					// if (dx + translateDom.clientWidth > document.body.clientWidth) {
        // 					// 	translateDom.style.left = document.body.clientWidth - translateDom.clientWidth - 10 + 'px'
        // 					// }

        // 				} else {
        // 					translateDomContent.innerText = 'translate fail'
        // 				}
        // 			});
        // 		}

        // 	}
        // }
    }





    window.toggleEditor = function (e) {
        e = e || window.event;
        let target = e.target || e.srcElement;

        if (target) {

            if (target.closest('.editorBtn')) {
                var btn = target.closest('.editorBtn');

                // 选择颜色
                if (target.closest('.annoate-btn')) {
                    var color = target.closest('.annoate-btn').getAttribute('data-color');
                    btn.querySelector('span').style.backgroundColor = `rgb(${color})`;
                    btn.querySelector('ul').style.display = 'none';
                    highlightColor = color;
                    return
                }

                var parentElement = btn.parentElement;
                var nodes = parentElement.children;

                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] != btn) {
                        nodes[i].classList.remove('active');
                    }
                }

                if (btn.classList.contains('addColor')) {
                    var show = btn.querySelector('ul').style.display;
                    if (show == 'flex') {
                        btn.querySelector('ul').style.display = 'none';
                    } else {
                        btn.querySelector('ul').style.display = 'flex'
                    }
                    return
                }

                if (btn.classList.contains('active')) {
                    toolType = '';
                    btn.classList.remove('active')
                } else {
                    toolType = btn.getAttribute('data-type');
                    btn.classList.add('active');
                }

                lastInkAnnotation = null, waitAction = null;
            }
        }
    }

    var _pages = [];


    annotateHighlightMenu.onclick = function (evt) {

        var button = evt.target.closest('.annoate-btn');
        if (!button) return;
        var type = button.getAttribute('data-type');

        if (type == 'highlight' || type == 'underline' || type == 'strokeout') {
            createHighlight(type)
        }

        if (type == 'copytext') {
            if (selectAnnotate && ['highlight', 'underline', 'strokeout'].indexOf(selectAnnotate.type) > -1) {
                var text = selectAnnotate.text;
            } else {
                if (useOldVersion || isTempHighlight) {
                    var text = pointerDownPositionRef.selectText;
                } else {
                    var text = selectionRangesRef.current[0].text;
                }
            }

            window.parent.postMessage({
                type: 'copyText',
                text: text,
                _viewMark: _viewMark
            }, '*');

            clearSelection();
        }

    }


    annotateMenu.onclick = (evt) => {
        var button = evt.target.closest('.annoate-btn');
        if (!button) return;
        var title = button.getAttribute('title');

        if (title == 'highlight') {
            var c = button.getAttribute('data-color');
            if (selectAnnotate) {
                var id = selectAnnotate.id;
                selectAnnotate.color = `rgb(${c})`;
                selectAnnotate.dateModified = Date.now();

                annotations.forEach(an => {
                    if (an.id == id) {
                        an.color = `rgb(${c})`
                    }
                });

                updatePageAnnotation(selectAnnotate);

                saveAnnotations();

                clearSelection();
            } else {
                createHighlight();
            }


        } else if (title == 'comment') {

        } else if (title == 'delete annotate') {
            if (selectAnnotate) {
                deleteAnnotate();
                clearSelection();
            }
        } else if (title == 'copy text') {

            if (selectAnnotate && ['highlight', 'underline', 'strokeout'].indexOf(selectAnnotate.type) > -1) {
                var text = selectAnnotate.text;
            } else {
                if (useOldVersion || isTempHighlight) {
                    var text = pointerDownPositionRef.selectText;
                } else {
                    var text = selectionRangesRef.current[0].text;
                }
            }

            window.parent.postMessage({
                type: 'copyText',
                text: text,
                _viewMark: _viewMark
            }, '*');

            clearSelection();

        } else if (title == 'add note') {
            if (evt.touches) {
                var x = evt.touches[0].pageX;
                var y = evt.touches[0].pageY;
            } else {
                var x = evt.pageX;
                var y = evt.pageY;
            }


            if (['highlight', 'underline', 'strokeout', 'image'].indexOf(selectAnnotate.type) > -1) {

                addNoteDom.style.left = `${x - 140}px`;
                addNoteDom.style.top = `${y + 20}px`;
                addNoteDom.style.display = `block`;
                addNoteDom.selectId = selectAnnotate.id;

                annotations.forEach(an => {
                    if (an.id == addNoteDom.selectId) {
                        if (an.comments) {
                            textareaDom.value = an.comments;
                        }
                        textareaDom.focus();
                    }
                });
            }


        }

        // annotateMenu.style.display = 'none';
        // translateDom.style.display = "none";

        // selectAnnotate = null;
        // isHighlighting = false;

        // rangesDom = [];

    };


    function clearSelection() {
        annotateMenu.style.display = 'none';
        addNoteDom.style.display = "none";
        translateDom.style.display = "none";
        annotateHighlightMenu.style.display = "none";
        // selectBoxDom.style.display = 'none';
        selectAnnotate = null;
        isHighlighting = false;
        isTempHighlight = false;

        if (selectBoxDom) {
            if (selectBoxDom.parentElement) {
                selectBoxDom.parentElement.removeChild(selectBoxDom);
            }
            selectBoxDom.onmousedown = null;
            selectBoxDom.ontouchstart = null;
            selectBoxDom = null;
        }

        if (rangesDom.length) {
            rangesDom.forEach(dom => {
                if (dom.parentElement) {
                    dom.parentElement.removeChild(dom);
                }
            });
        }
        rangesDom = [];
        selectionRangesRef = {};

        selectAnnotate = null;
        isHighlighting = false;
    }




    // createImageDom.onclick = () => {
    // 	doCreateRect = !doCreateRect;

    // };

    document.onkeydown = function (e) {
        var altKey = e.altKey;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if ((ctrlKey || altKey) && (e.key == 'y' || e.key == 'Y')) {
            //highlight({r:247,g:255,b:0});
            //highlightColor = '247,255,0';
            createHighlight('', '247,255,0')
        }

        if ((ctrlKey || altKey) && (e.key == 'g' || e.key == 'G')) {
            //highlight({r:125,g:240,b:102});
            //	highlightColor = '125,240,102';
            createHighlight('', '125,240,102')
        }

        if ((ctrlKey || altKey) && (e.key == 'b' || e.key == 'B')) {
            //highlight({r:143,g:222,b:249});
            // highlightColor = '143,222,249';
            createHighlight('', '143,222,249')
        }

        if ((ctrlKey || altKey) && (e.key == 'p' || e.key == 'P')) {
            // highlight({r:247,g:153,b:209});
            //	highlightColor = '247,153,209';
            createHighlight('', '247,153,209')
        }

        if ((ctrlKey || altKey) && (e.key == 'r' || e.key == 'R')) {
            // highlight({r:253,g:73,b:73});
            //highlightColor = '253,73,73';
            createHighlight('', '253,73,73')
        }

        if ((ctrlKey || altKey) && (e.key == 'w' || e.key == 'W')) {
            btn = document.querySelector('.editorBtn.addImage');
            btn && btn.click();
        }

        if ((ctrlKey || altKey) && (e.key == 'e' || e.key == 'E')) {
            btn = document.querySelector('.editorBtn.addInk');
            btn && btn.click()
        }


        if (ctrlKey && (e.key == 'c' || e.key == 'C')) {
            if (addNoteDom.style.display == 'block') {

                return
            }
            var btn = document.querySelector('.annoate-btn.copy');
            if (btn) {
                btn.click();
            }

            var btn2 = document.querySelector('.annotate-highlight .copy2');

            if (btn2) {
                btn2.click();
            }
        }

        var key = e.key.toLowerCase();
        if ((ctrlKey || altKey) && (key == 'delete' || key == 'backspace')) {
            var btn = document.querySelector('.annoate-btn.delete');
            if (btn) {
                btn.click();
            }
        }
    }


    annotateContainerDom.onclick = (evt) => {
        var annotateItemDom = evt.target.closest('.annotate-item');
        if (annotateItemDom) {
            var id = annotateItemDom.getAttribute('data-id');
            var annoatateItem = document.querySelector('.annotate-item.active');

            if (annoatateItem) {
                if (evt.target.closest('.annotate-item-note')) {
                    return;
                }
                annoatateItem.classList.remove('active');
                annoatateItem.querySelector('.annotate-item-note').blur();
                annoatateItem.querySelector('.annotate-item-note').setAttribute('contenteditable', false);

            }

            var dom = document.querySelector(`.annotate-item[data-id="${id}"]`);
            if (dom) {
                dom.classList.add('active');
            }
            dom.querySelector('.annotate-item-note').setAttribute('contenteditable', true);


            clearSelection();

            showAnnotate(id);
        }
    }


    window.addEventListener('message', function (e) {
        switch (e.data.type) {
            case 'openPDF':
                if (e.data._viewMark) {
                    _viewMark = e.data._viewMark;
                }

                _pages = [];
                annotations = [];


                try {
                    path = e.data.pdfName;
                    basename = e.data.basename;
                    //annotations = e.data.annotations;
                    openProtocol = e.data.openProtocol;
                    waitPdfId = e.data.id;
                    isMobile = e.data.isMobile;
                    mdPath = e.data.mdPath;
                    imageFolder = e.data.imageFolder;
                    language = e.data.language;
                    mdId = e.data.mdId;

                    useTranslate = e.data.useTranslate;
                    translateAppId = e.data.translateAppId;
                    translateKey = e.data.translateKey;
                    translateType = e.data.translateType;

                    if (e.data.top) {
                        top = e.data.top;
                    }

                    if (e.data.bottom) {
                        top = e.data.bottom;
                    }

                    //createSiderAnnotations();



                    if (isFirst) {
                        if (isMobile) {

                            pdfContainer.addEventListener('touchstart', handlePointerDown);
                            pdfContainer.addEventListener('touchmove', handlePointerMove);
                            pdfContainer.addEventListener('touchend', handlePointerUp);

                            pdfContainer.addEventListener('mousedown', handlePointerDown);
                            pdfContainer.addEventListener('mousemove', handlePointerMove);
                            pdfContainer.addEventListener('mouseup', handlePointerUp);

                        } else {

                            pdfContainer.addEventListener('pointerdown', handlePointerDown);
                            pdfContainer.addEventListener('pointermove', handlePointerMove);
                            pdfContainer.addEventListener('pointerup', handlePointerUp);
                            pdfContainer.addEventListener('dragstart', (e) => { e.preventDefault(); return });

                        }

                        isFirst = false;
                    }

                    setTimeout(function () {
                        //	alert(PDFViewerApplication);  

                        if (!PDFViewerApplication) {
                            // alert('miss pdf');
                            return
                        }

                        //console.log(PDFViewerApplication);

                        PDFViewerApplication.open(e.data.data).then(() => {
                            try {
                                window.pdfViewer = PDFViewerApplication.pdfViewer;
                                window.extractor = new Extractor(pdfViewer);
                                pdfViewer._currentPage = 1;


                                setTimeout(() => {


                                    var tempAnnotations = e.data.annotations;


                                    if (tempAnnotations.length) {
                                        var annot = tempAnnotations[0];
                                        if (annot.selectText || annot.hasOwnProperty('page')) {

                                            tempAnnotations.forEach(annot => {
                                                if (annot.text) {
                                                    try {
                                                        var textJSON = JSON.parse(annot.text);
                                                        var an = {
                                                            id: annot.id,
                                                            type: annot.type == 'rect' ? 'image' : 'highlight',
                                                            position: {
                                                                pageIndex: annot.page
                                                            },
                                                            color: textJSON.color ? `rgb(${textJSON.color.r},${textJSON.color.g},${textJSON.color.b})` : '',
                                                            pdfName: annot.pdfName
                                                        }

                                                        if (textJSON.path) {
                                                            an.path = textJSON.path;
                                                        }

                                                        if (textJSON.imageAbsolutePath) {
                                                            an.imageAbsolutePath = textJSON.imageAbsolutePath;
                                                        }

                                                        if (textJSON.contents) {
                                                            an.comments = textJSON.contents;
                                                        }
                                                        if (textJSON.selectText) {
                                                            an.text = textJSON.selectText;
                                                        } else {
                                                            an.text = '';
                                                        }

                                                        if (annot.createTime) {
                                                            an.dateCreated = annot.createTime;
                                                        } else {
                                                            an.dateCreated = Date.now();
                                                        }

                                                        if (annot.commentTime) {
                                                            an.commentTime = an.commentTime
                                                        }

                                                        an.dateModified = Date.now();

                                                        if (textJSON.relateRect) {
                                                            var vrects = [];
                                                            var _page = PDFViewerApplication.pdfViewer._pages[annot.page];
                                                            if (!_page) {
                                                                return
                                                            }

                                                            textJSON.relateRect.forEach(rect => {

                                                                var pw = _page.div.clientWidth;
                                                                // var ph = _page.div.clientHeight;
                                                                var x = rect.x * pw;
                                                                var y = rect.y * pw;
                                                                var w = rect.width * pw;
                                                                var h = rect.height * pw;

                                                                var vr = [x, y, x + w, y + h]

                                                                vrects.push(vr);
                                                            });

                                                            var r = v2p({
                                                                pageIndex: annot.page,
                                                                rects: vrects
                                                            }, _page.viewport);

                                                            an.position.rects = r.rects;
                                                            annotations.push(an)
                                                        }

                                                    } catch (err) {
                                                        console.log(err)
                                                    }

                                                }
                                            });

                                            saveAnnotations();

                                        } else {
                                            annotations = tempAnnotations.slice();
                                        }
                                    }


                                    createSiderAnnotations();

                                    setTimeout(() => {

                                        _pages.forEach(p => {
                                            p.page._annotations = annotations;
                                            p.page.render();
                                        });

                                        if (e.data.id) {
                                            showAnnotate(e.data.id);
                                        }

                                    }, 200);

                                }, 1200);


                                PDFViewerApplication.pdfDocument.getData().then((d) => {
                                    if (!isMobile) {
                                        pdfFactory = new pdfAnnotate.AnnotationFactory(d);
                                    }
                                    pdfViewer.currentScaleValue = 'page-width';
                                });
                                if (e.data.id) {
                                    showAnnotate(e.data.id)
                                }


                            } catch (err) {
                                //alert(err);
                            }

                        }).catch(function (err) {
                            // alert(err);
                        })

                        PDFViewerApplication.eventBus.on('pagerendered', pageRender);

                    }, 1000);
                } catch (err) {
                    //alert(err);
                }




                break;
            case 'closePDF':


                break;
            case 'showAnnotate':
                showAnnotate(e.data.id);
                break;
            case 'showAnnotateByJson':
                var json = e.data.json;
                showAnnotateJson(json)
                break
            case 'exportAnnotatePDF':
                var pageDom = document.querySelector('#viewer .page');
                var pageWidth = pageDom.clientWidth;
                var num = 0;

                var st = +new Date();
                var pdfData = null

                setTimeout(() => {
                    annotations.forEach(row => {
                        //var json = JSON.parse(row.text);
                        if (!pdfFactory) {
                            return;
                        }
                        if (firstExport != 1) {
                            pdfFactory.deleteAnnotation(row.id);
                        }


                        //console.log(rects);

                        if (row.color && row.color.startsWith('rgb')) {
                            var rgbObj = row.color.substring(4, row.color.length - 1);
                            rgbObj = rgbObj.split(',');
                        } else {
                            //rgb(247,255,0)
                            var rgbObj = [247, 255, 0]
                        }


                        var data = {
                            page: row.position.pageIndex,
                            //rect: json.rect,
                            contents: stringToRaw(row.comments || ''),
                            author: '',
                            color: {
                                r: parseFloat(rgbObj[0]),
                                g: parseFloat(rgbObj[1]),
                                b: parseFloat(rgbObj[2])
                            },
                            opacity: 0.8,
                            id: row.id,
                            quadPoints: [],
                            fill: '',
                            font: 'Noto Sans CJK SC Medium'
                        }

                        if (row.type == 'highlight' || row.type == 'underline' || row.type == 'strokeout' || row.type == 'image') {
                            var rects = row.position.rects;
                            rects.forEach((rect) => {

                                var x0 = rect[0];
                                var y0 = rect[3];
                                var x1 = rect[2];
                                var y1 = rect[3];
                                var x3 = rect[2];
                                var y3 = rect[1];
                                var x2 = rect[0];
                                var y2 = rect[1];

                                data.quadPoints.push(x0, y0, x1, y1, x2, y2, x3, y3);

                            });

                            if (!data.rect) {
                                data.rect = data.quadPoints.slice(0, 4);
                            }
                            if (data.rect.length < 4) return;
                            if (row.type == 'highlight') {
                                pdfFactory.createHighlightAnnotation(data);
                            } else if (row.type == 'underline') {

                                pdfFactory.createUnderlineAnnotation(data);

                            } else if (row.type == 'strokeout') {
                                pdfFactory.createStrikeOutAnnotation(data);
                            } else if (row.type == 'image') {
                                //  data.fill = data.color;
                                data.opacity = 0.3;
                                //   console.log(data);
                                if (data.quadPoints.length) {
                                    data.rect = [data.quadPoints[2], data.quadPoints[3], data.quadPoints[4], data.quadPoints[5]];
                                    pdfFactory.createSquareAnnotation(data);
                                }
                            }
                        } else if (row.type == 'ink') {
                            var paths = row.position.paths;
                            data.inkList = [];
                            for (let path of paths) {
                                data.inkList.push(path.slice())
                            }

                            delete data.quadPoints;

                            if (!data.rect) {
                                data.rect = [0, 0, 0, 0]
                            }

                            pdfFactory.createInkAnnotation(data);

                        }
                    });

                    var et = +new Date();

                    pdfData = pdfFactory.write();
                    firstExport++;

                    setTimeout(function () {
                        window.parent.postMessage({
                            type: 'exportAnnotatePDF',
                            pdfData: pdfData,
                            _viewMark: _viewMark
                        }, "*")

                    }, 200)

                }, 200);
                break

            case 'getAnnotations':
                if (pdfFactory) {
                    pdfFactory.getAnnotations().then(res => {
                        window.parent.postMessage({
                            type: "gteAnnotations",
                            _viewMark: _viewMark,
                        }, "*");
                    });
                }
                break;

            case 'saveImagePath':

                var id = e.data.id;
                var imagePath = e.data.imagePath;
                annotations.forEach(an => {
                    if (an.id == id) {
                        an.imageAbsolutePath = imagePath;
                    }
                });

                saveAnnotations();

                break;
            case 'useOldVersion':
                useOldVersion = true;
                break;
            case 'useNewVersion':
                useOldVersion = false;
                break;
        }
    }, false);




    var colorObject = {
        'yellow': '247,255,0',
        'green': '125,240,102',
        'blue': '143,222,249',
        'pink': '247,153,209',
        'red': '253,73,73'
    };


    var flag = false, pointerDownPosition = null;

    function handlePointerDown(event) {

        if (event.target && event.target.closest('.selectBox')) {
            return;
        }

        clearSelection();


        let page = getPageFromElement(event.target);

        if (page) {
            var selectDom = page.node.querySelector('.selectBox');
            if (selectDom) {
                if (selectDom.parentElement) {
                    selectDom.onmousedown = null;
                    selectDom.ontouchstart = null;
                    selectDom.parentElement.removeChild(selectDom);
                }
            }
        }

        // flag = true;

        let position = pointerEventToPosition(event);

        if (!position) {
            return;
        }



        pdfViewer._currentPage = position.pageIndex + 1;
        //	pointerDownPosition = position;

        extractor.getSortIndex(position);


        handleLayerPointerDown(v2p(position), event);
    }

    var selectionRangesRef = {}, pointerDownPositionRef = {};


    function setSelectionRangesRef(ranges) {
        //setSelectionPositions(ranges.filter(x => !x.collapsed).map(x => x.position));
        selectionRangesRef.current = ranges;
    }


    function handleLayerPointerDown(position, e) {

        pointerDownPositionRef.current = position;
        pointerDownPositionRef.id = '';


        var { action, selectAnnotations } = getActionAtPosition(position);

        if (selectAnnotations && selectAnnotations.length) {

            selectAnnotate = selectAnnotations[selectAnnotations.length - 1];



            createAnnotationBox(selectAnnotate, e);

            showSideAnnotation(selectAnnotate.id);

            window.parent.postMessage({
                type: 'showNewMindmapAnnotate',
                id: selectAnnotate.id,
                data: selectAnnotate,
                annotateType: selectAnnotate.type,
                mdId: mdId,
                _viewMark: _viewMark
            }, '*');

            return;

        }

        pointerDownPosition = position;

        if (action.type == 'ink') {
            let point = position.rects[0].slice(0, 2);
            lastPointer = point;
            action.annotation = {
                id: uuid(),
                type: 'ink',
                color: `rgb(${highlightColor})`,
                position: {
                    pageIndex: position.pageIndex,
                    width: selectWidth || 2,
                    paths: [[...point]]
                },
                dateCreated: Date.now(),
                dateModified: Date.now(),
                pdfName: path
            }

            action._page = _pages.find(p => p.pageIndex == position.pageIndex);

            waitAction = action;

            return
        }

        if (action.type == 'image') {

            var clientX = e.touches ? e.touches[0].clientX : e.clientX;
            var clientY = e.touches ? e.touches[0].clientY : e.clientY;

            lastPointer = [clientX, clientY];

            action.annotation = {
                id: uuid(),
                type: 'rect',
                color: `rgb(${highlightColor})`,
                position: {
                    pageIndex: pointerDownPosition.pageIndex,
                    rects: [position.rects[0].slice()]
                },
                dateCreated: Date.now(),
                dateModified: Date.now(),
                pdfName: path
            }

            action._page = _pages.find(p => p.pageIndex == position.pageIndex);

            var rectDom = document.createElement('div');
            rectDom.style.position = 'absolute';
            rectDom.style.background = "rgba(255,171,46,0.6)";

            var rect = action._page.page.originalPage.div.getBoundingClientRect();

            var left = clientX - rect.left;
            var top = clientY - rect.top;

            dx = 0;
            dy = 0;

            rectDom.style.left = left + "px";
            rectDom.style.top = top + "px";

            var textLayerDom = e.target.closest('.textLayer');

            if (textLayerDom) {
                textLayerDom.appendChild(rectDom);
            }

            action._rectDom = rectDom;

            waitAction = action;

            return
        }

    };


    function getPageByIndex(pageIndex) {
        return _pages.find(x => x.pageIndex === pageIndex);
    }


    function _getPageAnnotations(pageIndex) {
        return annotations.filter(
            x => x.position.pageIndex === pageIndex
                || x.position.nextPageRects && x.position.pageIndex + 1 === pageIndex
        );
    }


    function getSelectableAnnotations(position) {
        let page = getPageByIndex(position.pageIndex);
        if (!page) {
            return null;
        }

        let annotations = _getPageAnnotations(position.pageIndex);
        let selectableAnnotations = [];
        for (let annotation of annotations) {
            if (annotation.type === 'text' && annotation.position.rotation) {
                let tm = getRotationTransform(annotation.position.rects[0], annotation.position.rotation);
                let rect = position.rects[0];
                let r1 = getBoundingBox(rect, inverseTransform(tm));
                let r2 = annotation.position.rects[0];
                if (quickIntersectRect(r1, r2)) {
                    selectableAnnotations.push(annotation);
                }
            }
            else {
                if (intersectAnnotationWithPoint(annotation.position, position)) {
                    selectableAnnotations.push(annotation);
                }
            }
        }

        function getAnnotationAreaSize(annotation) {
            let areaSize = 0;
            for (let rect of annotation.position.rects) {
                areaSize += (rect[2] - rect[0]) * (rect[3] - rect[1]);
            }
            return areaSize;
        }

        selectableAnnotations.sort((a, b) => {
            let aSize, bSize;

            if (a.position.rects) {
                aSize = getAnnotationAreaSize(a);
            }
            else if (a.position.paths) {
                aSize = 0;
            }

            if (b.position.rects) {
                bSize = getAnnotationAreaSize(b);
            }
            else if (b.position.paths) {
                bSize = 0;
            }

            return aSize - bSize;
        });
        return selectableAnnotations;
    }


    function getActionAtPosition(position, event) {
        // if (this._portal) {
        // 	let action = { type: 'none' };
        // 	return { action, selectAnnotations: [] };
        // }

        // if (event.shiftKey) {
        // 	return { action: { type: 'selectText' }, selectAnnotations: [] };
        // }

        if (toolType === 'ink') {
            return { action: { type: 'ink' }, selectAnnotations: [] };
        }

        if (toolType === 'image') {
            return { action: { type: 'image' }, selectAnnotations: [] };
        }


        let selectAnnotations = getSelectableAnnotations(position)
        let selectedAnnotations = selectAnnotations;
        // If single object selected, check if trying to transform it
        if (selectedAnnotations && selectedAnnotations.length === 1) {
            //let annotation = selectAnnotations[0];
            //let action = getSelectedAnnotationAction(annotation, position);
            // if (action) {
            // 	return { action, selectAnnotations: null };
            // }

            let action = { type: 'drag', annotation: selectAnnotations[0] };

            return { action, selectAnnotations: [selectAnnotations[0]] }
        }

        //	let selectableAnnotation = (getSelectableAnnotations(position) || [])[0];

        let action = null;

        selectAnnotations = [];

        action = { type: 'selectText' };

        return { action, selectAnnotations };
    }


    function handlePointerMove(event) {

        let position = pointerEventToPosition(event);

        if (!pointerDownPosition && !isMobile) {
            if (position) {
                let { action } = getActionAtPosition(v2p(position), event);
                updateCursor(action);
            } else {
                updateCursor();
            }

            return
        }


        let action = waitAction;

        if (action) {
            if (action.type == 'image') {

                event.preventDefault();

                var clientX = event.touches ? event.touches[0].clientX : event.clientX;
                var clientY = event.touches ? event.touches[0].clientY : event.clientY;

                dx = clientX - lastPointer[0];
                dy = clientY - lastPointer[1];

                action._rectDom.style.width = dx + 'px';
                action._rectDom.style.height = dy + 'px';

                return
            }

            if (action.type == 'ink') {

                event.preventDefault();

                var p = v2p(position);
                let point = p.rects[0].slice(0, 2);
                point = addPointToPath(action.annotation.position.paths[0], point);
                point = point.map(value => parseFloat(value.toFixed(3)));
                action.annotation.position.paths[0] = point;
                action.annotation.position.dateModified = Date.now();

                if (action._page) {
                    var length = point.length;
                    if (length > 2) {

                        var points = [...lastPointer, point[length - 2], point[length - 1]];

                        action._page.page.renderStroke({
                            color: action.annotation.color,
                            width: action.annotation.position.width,
                            points
                        });

                        lastPointer = [point[length - 2], point[length - 1]]
                    }
                }
                return
            }
        }

        if (useOldVersion) return;

        if (!position) {
            return;
        }

        if (pointerDownPosition) {
            handleLayerPointerMove(v2p(position), event);
        }

    };

    function updateCursor(action) {
        let cursor = 'default';
        if (action) {
            if (action.type === 'overlay') {
                cursor = 'pointer';
            }
            else if (action.type === 'updateAnnotationRange') {
                if (!action.triggered) {
                    if (action.vertical) {
                        cursor = 'ns-resize';
                    }
                    else {
                        cursor = 'ew-resize';
                    }
                }
                else {
                    cursor = 'text';
                }
            }
            else if (action.type === 'resize') {
                if (action.annotation.position.rotation) {
                    cursor = 'move';
                }
                else {
                    if (['l', 'r'].includes(action.dir)) {
                        cursor = 'ew-resize';
                    }
                    else if (['t', 'b'].includes(action.dir)) {
                        cursor = 'ns-resize';
                    }
                    else if (['tl', 'br'].includes(action.dir)) {
                        cursor = 'nwse-resize';
                    }
                    else if (['bl', 'tr'].includes(action.dir)) {
                        cursor = 'nesw-resize';
                    }
                }
            }
            else if (action.type === 'move') {
                cursor = 'grab';
            }
            else if (action.type === 'rotate') {
                cursor = 'move';
            }
            else if (action.type === 'ink') {
                cursor = 'crosshair';
            }
            else if (action.type === 'erase') {
                let transform = this._iframeWindow.PDFViewerApplication.pdfViewer._pages[0].viewport.transform;
                let [a, b] = transform;
                let scale = Math.hypot(a, b);
                let size = this._tool.size * scale;
                let adjustedSize = size * window.devicePixelRatio;
                let adjustedStrokeWidth = 1 * window.devicePixelRatio;
                let svgDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${adjustedSize} ${adjustedSize}"><circle cx="${adjustedSize / 2}" cy="${adjustedSize / 2}" r="${(adjustedSize - adjustedStrokeWidth) / 2}" stroke="black" stroke-width="${adjustedStrokeWidth}" fill="none" /></svg>`;
                cursor = `url('${svgDataUrl}') ${size / 2} ${size / 2}, auto`;
            }
            else if (['selectText'].includes(action.type)) {
                cursor = 'text';
            }
        }
        // cursor = 'move';
        let viewerContainer = document.getElementById('viewerContainer');
        viewerContainer.style.cursor = cursor;
    }



    function handleLayerPointerMove(position, event) {

        let viewer = document.getElementById('viewer');
        viewer.classList.remove('cursor-pointer');
        viewer.classList.remove('cursor-text');
        viewer.classList.remove('cursor-text-selecting');

        if (pointerDownPositionRef.current) {
            if (selectionRangesRef.current && selectionRangesRef.current.length) {
                let selectionRanges = getModifiedSelectionRanges(selectionRangesRef.current, position);
                setSelectionRangesRef(selectionRanges);
            } else {
                let selectionRanges = getSelectionRanges(pointerDownPositionRef.current, position);
                //	console.log(selectionRanges);
                setSelectionRangesRef(selectionRanges);
            }
        }


        createSelectionEle(selectionRangesRef);
        deselect();
    }

    function deselect() {
        document.selection && document.selection.empty && (document.selection.empty(), 1)
            || window.getSelection && window.getSelection().removeAllRanges();
    }



    function createSelectionEle(range) {

        if (rangesDom.length) {
            rangesDom.forEach(dom => {
                if (dom.parentElement) {
                    dom.parentElement.removeChild(dom);
                }
            });
            rangesDom = [];
        }


        if (range && range.current && range.current.length && range.current[0].position) {
            range.current[0].position = p2v(range.current[0].position);
            var rects = range.current[0].position.rects;
            range.current[0].position.rects.map(r => {
                if (r[1]) {
                    r[1] = r[1] - top;
                }
                if (r[3]) {
                    r[3] = r[3] + bottom;
                }
            });
            var pageNumber = range.current[0].position.pageIndex + 1;
            var pageDom = pdfContainer.querySelector(`[data-page-number="${pageNumber}"]`);
            var textLayerDom = pageDom.querySelector('.textLayer');

            if (!textLayerDom) {
                return;
            }

            if (textLayerDom.querySelector('.annotateLayer-extend')) {
                var annoatetLayerDom = textLayerDom.querySelector('.annotateLayer-extend');
            } else {
                var annoatetLayerDom = document.createElement('div')
                annoatetLayerDom.classList.add('annotateLayer-extend');
                textLayerDom.appendChild(annoatetLayerDom)
            }

            var text = range.current[0].text;
            var id = uuid();
            range.current[0].id = id;
            if (rects && rects.length) {
                createRangeElement(rects, annoatetLayerDom, text, id)
            }
        }

    }

    function createRangeElement(rects, annoatetLayerDom, text, id) {

        rects.forEach(rect => {
            var ele = document.createElement('div');
            ele.classList.add('mm-highlight');
            ele.classList.add('annotate');
            ele.style.left = rect[0] + 'px';
            ele.style.top = rect[1] + 'px';
            ele.style.width = (rect[2] - rect[0]) + 'px';
            ele.style.height = (rect[3] - rect[1]) + 'px';
            ele.style.backgroundColor = `rgba(0,0,255,0.3)`;
            ele.setAttribute('data-text', text);
            ele.setAttribute('data-type', 'highlight');
            ele.setAttribute('data-id', id);
            rangesDom.push(ele);
            annoatetLayerDom.appendChild(ele);
        });
    }


    function handlePointerUp(event) {


        drag = false;
        flag = false;

        pointerDownPosition = null;
        let action = waitAction;

        if (action) {
            if (action.type == 'ink' && action.annotation) {

                event.preventDefault();

                if (lastInkAnnotation) {
                    let r1 = getPositionBoundingRect(lastInkAnnotation.position);
                    let r2 = getPositionBoundingRect(action.annotation.position);
                    var dist = distanceBetweenRects(r1, r2);
                }

                if (lastInkAnnotation && lastInkAnnotation.position.pageIndex == action.annotation.position.pageIndex && Date.now() - lastInkAnnotation.dateModified < 10 * 1000 && dist < 50) {
                    let { id, position } = lastInkAnnotation;
                    let paths = lastInkAnnotation.position.paths.slice();
                    if (action.annotation.position.paths[0] && action.annotation.position.paths[0].length > 2) {
                        paths.push(action.annotation.position.paths[0]);
                        position = { ...position, paths };

                        var inkAnnotation = annotations.find(x => x.id == id);

                        if (inkAnnotation) {
                            var index = annotations.indexOf(inkAnnotation);
                            if (index > -1) {
                                annotations.splice(index, 1);
                                var newInkAnnotation = JSON.parse(JSON.stringify(inkAnnotation));
                                newInkAnnotation.position = position;
                                newInkAnnotation.dateModified = Date.now();
                                if (!annotations.find(x => x.id == newInkAnnotation.id)) {
                                    annotations.splice(index, 0, newInkAnnotation);
                                }
                                lastInkAnnotation = newInkAnnotation;


                                if (action._page) {
                                    action._page.page.render();
                                    postImageMessage(action._page, lastInkAnnotation, false, newInkAnnotation.path);
                                }
                            }
                        }
                    }
                }
                else {
                    if (action.annotation.position.paths && action.annotation.position.paths.length == 1) {
                        if (action.annotation.position.paths[0] && action.annotation.position.paths[0].length <= 2) {
                            waitAction = null
                            return
                        }
                    }
                    lastInkAnnotation = {
                        id: action.annotation.id,
                        type: 'ink',
                        color: `rgb(${highlightColor})`,
                        position: {
                            pageIndex: action.annotation.position.pageIndex,
                            width: action.annotation.position.width,
                            paths: action.annotation.position.paths.slice()
                        },
                        dateCreated: action.annotation.dateCreated,
                        dateModified: Date.now(),
                        pdfName: path
                    };

                    if (!annotations.find(x => x.id == lastInkAnnotation.id)) {
                        annotations.push(lastInkAnnotation);
                    }


                    if (action._page) {
                        action._page.page.render();
                        postImageMessage(action._page, lastInkAnnotation, true);
                    }


                }

                action.annotation = null;
                waitAction = null;

                return
            }

            if (action.type == 'image' && action.annotation) {
                var box = {
                    x: parseFloat(action._rectDom.style.left),
                    y: parseFloat(action._rectDom.style.top),
                    w: parseFloat(action._rectDom.style.width),
                    h: parseFloat(action._rectDom.style.height)
                }

                if (!box.w || !box.h) {
                    return
                }

                if (box.w < 20) {
                    box.w = 20
                }
                if (box.h < 20) {
                    box.h = 20
                }


                let pp = {
                    pageIndex: action.annotation.position.pageIndex,
                    rects: [[box.x, box.y, box.x + box.w, box.y + box.h]]
                };

                //let page = PDFViewerApplication.pdfViewer._pages[action.annotation.position.pageIndex];
                var r = v2p(pp);
                if (r && r.rects.length) {
                    var annot = {
                        id: action.annotation.id,
                        type: 'image',
                        color: `rgb(${highlightColor})`,
                        position: {
                            pageIndex: action.annotation.position.pageIndex,
                            rects: [r.rects[0].slice()]
                        },
                        dateCreated: Date.now(),
                        dateModified: Date.now(),
                        pdfName: path
                    }

                    annotations.push(annot);

                    if (action._page) {
                        action._page.page.render();
                        postImageMessage(action._page, annot, true);
                    }
                }


                action._rectDom.parentElement && action._rectDom.parentElement.removeChild(action._rectDom);
                action.annotation = null;
                waitAction = null;

                return;

            }
        }


        if (useOldVersion) {
            calcSelections(event);
            deselect();
        }

        popupMenu(event);
    }


    function calcSelections(evt, flag) {
        var selection = window.getSelection();
        if (selection.isCollapsed) return;
        var range = selection.getRangeAt(0);
        var rects = range.getClientRects();
        var selectText = '';
        var doms = range.cloneContents();
        for (var i = 0; i < doms.children.length; i++) {
            selectText += doms.children[i].textContent + ' ';
        }
        selectText = selectText.trim();

        if (!selectText) {
            selectText = selection.toString();
        }

        rects = uniqueRects(rects);
        rects = getLines(rects);
        var ost = computePageOffset()

        var doms = [];
        rects.forEach(r => {
            var x = r.x - ost.left;
            var y = r.y - ost.top;
            doms.push([x, y, x + r.width, y + r.height]);
        });


        var pageIndex = pointerDownPositionRef.current.pageIndex;
        pointerDownPositionRef.rects = doms;
        pointerDownPositionRef.id = uuid()
        pointerDownPositionRef.selectText = selectText;

        var pageNumber = pageIndex + 1;
        var pageDom = pdfContainer.querySelector(`[data-page-number="${pageNumber}"]`);
        var textLayerDom = pageDom.querySelector('.textLayer');

        if (!textLayerDom) {
            return;
        }

        if (textLayerDom.querySelector('.annotateLayer-extend')) {
            var annoatetLayerDom = textLayerDom.querySelector('.annotateLayer-extend');
        } else {
            var annoatetLayerDom = document.createElement('div')
            annoatetLayerDom.classList.add('annotateLayer-extend');
            textLayerDom.appendChild(annoatetLayerDom)
        }

        if (rangesDom.length) {
            rangesDom.forEach(dom => {
                if (dom.parentElement) {
                    dom.parentElement.removeChild(dom);
                }
            });
            rangesDom = [];
        }

        createRangeElement(doms, annoatetLayerDom, selectText, pointerDownPositionRef.id);

        if (flag) {
            isTempHighlight = true;
        }
    }


    function uniqueRects(rects) {
        var arr = [];
        for (let i = 0; i < rects.length; i++) {
            for (var j = i; j < rects.length; j++) {
                if (i != j) {
                    var r1 = rects[i];
                    var r2 = rects[j];

                    if (r1.x <= r2.x && r1.y <= r2.y && r1.bottom >= r2.bottom && r1.right >= r2.right) {
                        arr.push(j);
                    }
                }
            }
        }
        var a = []
        if (arr.length) {
            for (let i = 0; i < rects.length; i++) {
                if (arr.indexOf(i) == -1) {
                    a.push(rects[i])
                }
            }
            return a;
        } else {
            return rects;
        }

    };

    function getLines(rects) {
        var rows = {
            1: [rects[0]]
        };  //分行
        var line = 1;
        var rowBottom = rects[0].bottom;

        for (var i = 1; i < rects.length; i++) {
            if (!rows[line]) {
                rows[line] = [];
            }
            var h = rects[i].height;
            if (rects[i].top < rowBottom && rects[i].bottom < rowBottom + h / 3) {
                rows[line].push(rects[i]);
            } else {
                line++;
                if (!rows[line]) {
                    rows[line] = [];
                }
                rowBottom = rects[i].bottom;
                rows[line].push(rects[i])
            }
        }

        var rect = [];

        for (var k in rows) {
            let x, y, bottom, right;
            rows[k].forEach((r, i) => {
                if (i == 0) {
                    x = r.x;
                    y = r.y;
                    bottom = r.bottom;
                    right = r.right
                } else {
                    if (r.x < x) {
                        x = r.x
                    }
                    if (r.y < y) {
                        y = r.y
                    }
                    if (r.bottom > bottom) {
                        bottom = r.bottom;
                    }
                    if (r.right > right) {
                        right = r.right;
                    }
                }
            });

            var d = {
                x: x,
                y: y,
                top: x,
                left: y,
                bottom: bottom,
                right: right,
                width: right - x,
                height: bottom - y
            }
            rect.push(d)

        }


        return rect;

    }




    function createHighlight(type, color) {
        //var rs = [];
        if (useOldVersion || isTempHighlight) {
            var rects = pointerDownPositionRef.rects;
            var selectText = pointerDownPositionRef.selectText;
            var id = pointerDownPositionRef.id;
            var pageIndex = pointerDownPositionRef.current.pageIndex;
        } else {

            var rects = selectionRangesRef.current[0].position.rects;
            var selectText = selectionRangesRef.current[0].text;
            var id = selectionRangesRef.current[0].id;
            var pageIndex = selectionRangesRef.current[0].position.pageIndex;

        }

        if (!id) {
            return
        }

        var color = `rgb(${color || highlightColor})`;

        var r = v2p({
            pageIndex,
            rects: rects
        });


        var newAnnotate = {
            text: selectText,
            id: id,
            type: type || 'highlight',
            pdfName: path,
            color: color,
            position: {
                pageIndex,
                rects: r.rects
            },
            dateCreated: Date.now(),
            dateModified: Date.now()
        }

        annotations.push(newAnnotate);

        updatePageAnnotation(newAnnotate);

        saveAnnotations(newAnnotate);

        clearSelection();

        rangesDom = []
        selectionRangesRef = {};
        pointerDownPositionRef.id = '';
        annotateMenu.style.display = 'none';
        addNoteDom.style.display = "none";
        //selectAnnotate = null;
        isHighlighting = false;
        isTempHighlight = false;
    }

    function updatePageAnnotation(annotation) {
        var annotate = annotation || selectAnnotation;

        if (annotate) {
            var _page = _pages.find(p => p.pageIndex == annotate.position.pageIndex);
            if (_page) {
                try {
                    _page.page.render();
                    if (annotate.position.nextPageRects) {
                        _page = _pages.find(p => p.pageIndex == (annotate.position.pageIndex + 1));
                        if (_page) {
                            _page.page.render();
                        }
                    }

                } catch (err) {

                }
            }

            if (annotate.type == 'image' || annotate.type == 'ink') {
                postImageMessage(_page, annotate, false, annotate.path);
            }
        }
    }


    function postImageMessage(page, annotation, isNew, imagePath) {
        if (!imagePath) {
            var _t = +new Date();
            if (imageFolder) {
                imagePath = imageFolder + '/' + _t + '.png'
            } else {
                if (path.startsWith('file:')) {
                    var i = mdPath.lastIndexOf('/');
                    var route = mdPath.substr(0, i + 1);
                    imagePath = route + _t + '.png';
                } else {
                    var i = path.lastIndexOf('/');
                    var route = path.substr(0, i + 1);
                    imagePath = route + basename + '-' + _t + '.png';
                }
            }

            annotation.path = imagePath;
        }

        var imageData = page.page.getImageByAnnotation(annotation);
        if (imageData) {
            var base64Data = imageData.data.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = _base64ToArrayBuffer(base64Data);
            window.parent.postMessage({
                type: 'createNewRect',
                imagePath: imagePath,
                dataBuffer: dataBuffer,
                annotations: annotations,
                isNew: isNew,
                data: annotation,
                imageOptions: {
                    width: imageData.width,
                    height: imageData.height
                },
                _viewMark: _viewMark,
                mdId

            }, "*")
        }
    }


    function saveAnnotations(newAnnotate) {

        annotations.sort((a, b) => {
            return a.position?.pageIndex - b.position?.pageIndex
        });

        createSiderAnnotations();

        window.parent.postMessage({
            type: 'saveNewAnnotations',
            _viewMark: _viewMark,
            annotations: annotations,
            newAnnotate,
            mdId
        }, "*");
    };



    function createSiderAnnotations() {

        setTimeout(() => {

            if (document.querySelector('#outerContainer').classList.contains('sidebarOpen')) {
                if (document.querySelector('#showAnnotation').classList.contains('toggled')) {
                    annotateContainerDom.innerHTML = '';

                    annotations.forEach(data => {
                        var annotateItemDom = document.createElement('div');
                        annotateItemDom.classList.add('annotate-item');
                        annotateItemDom.setAttribute('data-id', data.id);

                        var annotateItemContainerDom = document.createElement('div');
                        annotateItemContainerDom.classList.add('annotate-item-container');
                        annotateItemDom.appendChild(annotateItemContainerDom);

                        var annotateItemHeadDom = document.createElement('div');
                        annotateItemHeadDom.classList.add('annotate-item-header');

                        if (language == 'zh-cn') {
                            var page = locale[language].page;
                        } else {
                            var page = locale['zn'].page;
                        }

                        annotateItemHeadDom.innerHTML = `${page} ${data.position.pageIndex + 1}`;

                        var annotateItemcontentDom = document.createElement('div');
                        annotateItemcontentDom.classList.add('annotate-item-content');
                        if (data.type == 'highlight' || data.type == 'underline' || data.type == 'strokeout') {
                            annotateItemcontentDom.innerHTML = `
								<blockquote>
									${data.text || ''}
								</blockquote>
						   `;
                        } else {
                            // var textObj = JSON.parse(data.text);
                            var img = `<img src="${data.imageAbsolutePath || data.path}"/>`;
                            annotateItemcontentDom.innerHTML = img;
                        }

                        // var textObj = JSON.parse(data.text);
                        var annotateItemNoteDom = document.createElement('div');
                        annotateItemNoteDom.classList.add('annotate-item-note');
                        annotateItemNoteDom.innerText = `${data.comments || ''}`;



                        var color = data.color;
                        //var colorString = `${color.r},${color.g},${color.b}`;
                        var className = 'mm-highlight-black'
                        for (var k in colorObject) {
                            if (color.indexOf(colorObject[k]) > -1) {
                                className = `mm-highlight-${k}`

                                break;
                            }
                        }

                        annotateItemDom.classList.add(className);

                        annotateItemContainerDom.appendChild(annotateItemHeadDom)
                        annotateItemContainerDom.appendChild(annotateItemcontentDom)
                        annotateItemContainerDom.appendChild(annotateItemNoteDom)
                        annotateContainerDom.appendChild(annotateItemDom);
                    });
                }
            }

        }, 10)

    }


    $('body').on('blur', '.annotate-item-note', (e) => {
        var target = e.target;
        var text = target.innerText;
        var id = target.closest('.annotate-item').getAttribute('data-id');
        if (id) {
            annotations.forEach(an => {
                if (an.id == id) {
                    var data = JSON.parse(an.text);
                    data.contents = text;
                    data.commentTime = +new Date();
                    an.text = JSON.stringify(data);
                }
            });

            updateHighlight(id, text);
        }
    });



    function popupMenu(evt) {

        if (evt.changedTouches) {
            var x = evt.changedTouches[0].pageX;
            var y = evt.changedTouches[0].pageY;
        } else {
            var x = evt.pageX;
            var y = evt.pageY;
        }
        if (selectAnnotate) {
            isHighlighting = false;
        } else {
            isHighlighting = true;
        }

        setTimeout(() => {
            calcSelections(evt, true);
            deselect();

            if (rangesDom.length || selectAnnotate) {
                try {
                    if (rangesDom.length) {
                        if (rangesDom[0]) {
                            var query = rangesDom[0].getAttribute('data-text');
                        }
                        annotateHighlightMenu.style = `left:${x - 100}px;top:${y + 20}px`;
                        annotateHighlightMenu.style.display = 'flex';
                    } else if (selectAnnotate) {
                        if (selectAnnotate.type == 'highlight' || selectAnnotate.type == 'underline' || selectAnnotate.type == 'strokeout') {
                            var query = selectAnnotate.text;
                        }

                        annotateMenu.style = `left:${x - 100}px;top:${y + 40}px`;
                        annotateMenu.style.display = 'flex';
                    }
                } catch (err) {
                    console.log(err);
                }


                //console.log(useTranslate);
                if (useTranslate) {

                    if (!query) return;

                    if (translateType == 'google') {

                    } else {
                        if (translateAppId && translateKey) {

                            var dx = (x - 140) > 0 ? (x - 140) : 20;

                            if (rangesDom.length) {
                                var top = parseFloat(annotateHighlightMenu.style.top);
                            } else {
                                var top = parseFloat(annotateMenu.style.top);
                            }

                            translateDom.style.left = `${dx}px`;
                            translateDom.style.top = `${top + 30}px`;
                            translateDom.style.display = 'block';
                            translateDomContent.innerText = "..."
                        }
                        //if (translateType == 'baidu') {
                        baiduTranslate(translateAppId, translateKey, query, 'zh', function (data) {
                            if (data && data.trans_result && data.trans_result.length) {
                                translateDomContent.innerText = data.trans_result[0].dst
                                var h = translateDom.clientHeight;
                                var dis = document.body.clientHeight - y - 50 - h;
                                if (dis < 0) {
                                    translateDom.style.top = `${y - h - 30}px`;
                                }

                                if (dx + translateDom.clientWidth > document.body.clientWidth) {
                                    translateDom.style.left = document.body.clientWidth - translateDom.clientWidth - 10 + 'px'
                                }

                            } else {
                                translateDomContent.innerText = 'translate fail'
                            }
                        });
                    }
                }

            }
        }, 20)



    }

    function updateHighlight(id, text) {
        var annotate = pdfContainer.querySelector(`.annotate[data-id="${id}"]`)
        if (!annotate) return;
        var commnetBar = annotate.querySelector('.comment-bar');
        if (text) {
            if (commnetBar) {
                commnetBar.setAttribute('data-title', text);
            } else {
                var commentBar = document.createElement('span');
                commentBar.classList.add('comment-bar');
                commentBar.style = `position:abaolute;left:-8px;top:-6px;z-index:120;`;
                commentBar.innerHTML = annotateCommentIcon;
                commentBar.setAttribute('data-title', text);
                annotate.appendChild(commentBar);
            }
        } else {
            var commentBar = annotate.querySelector('.comment-bar');
            if (commentBar) {
                annotate.removeChild(commentBar);
            }
        }

        saveAnnotations();

    }

    textareaDom.onblur = () => {

        var id = addNoteDom.selectId;
        var annot = null
        annotations.forEach(an => {
            if (an.id == id) {
                an.comments = textareaDom.value;
                annot = an;
                an.commentTime = Date.now();
            }
        });

        // console.log(annot);

        updatePageAnnotation(annot);

        textareaDom.value = '';
        addNoteDom.selectId = '';
        clearSelection();

        saveAnnotations();

    }



    function deleteAnnotate() {
        if (selectAnnotate) {
            var id = selectAnnotate.id;
            var annot = null;
            annotations.forEach((a, i) => {
                if (a.id == id) {
                    annotations.splice(i, 1);
                    annot = a;
                }
            });

            updatePageAnnotation(annot);
            saveAnnotations();

        }
    }




    function pointerEventToPosition(event) {

        let page = getPageFromElement(event.target);
        if (!page) {
            return null;
        }

        let rect = page.node.getBoundingClientRect();
        var clientX = event.touches ? event.touches[0].clientX : event.clientX;
        var clientY = event.touches ? event.touches[0].clientY : event.clientY;

        let x = clientX + page.node.scrollLeft - rect.left - 9;
        let y = clientY + page.node.scrollTop - rect.top - 10;



        return {
            pageIndex: page.number - 1,
            rects: [[x, y, x, y]]
        };
    }


    function getPageFromElement(target) {
        let node = target.closest('#viewer > .page') || target.closest('#viewer > .spread > .page');
        if (!node) {
            return null;
        }

        let number = parseInt(node.dataset.pageNumber);
        return { node, number };
    }



    function v2p(position) {
        let viewport = pdfViewer.getPageView(position.pageIndex).viewport;
        return v2pc(position, viewport);
    }

    function p2v(position) {
        let viewport = pdfViewer.getPageView(position.pageIndex).viewport;
        return p2vc(position, viewport);
    }


    function v2pc(position, viewport) {
        return {
            pageIndex: position.pageIndex,
            rects: position.rects.map((rect) => {
                let [x1, y2] = viewport.convertToPdfPoint(rect[0], rect[1]);
                let [x2, y1] = viewport.convertToPdfPoint(rect[2], rect[3]);
                return [
                    Math.min(x1, x2),
                    Math.min(y1, y2),
                    Math.max(x1, x2),
                    Math.max(y1, y2)
                ];
            })
        };
    }


    function p2vc(position, viewport) {
        if (position.rects) {
            return {
                pageIndex: position.pageIndex,
                rects: position.rects.map((rect) => {
                    let [x1, y2] = viewport.convertToViewportPoint(rect[0], rect[1]);
                    let [x2, y1] = viewport.convertToViewportPoint(rect[2], rect[3]);
                    return [
                        Math.min(x1, x2),
                        Math.min(y1, y2),
                        Math.max(x1, x2),
                        Math.max(y1, y2)
                    ];
                })
            };
        }
        else if (position.paths) {
            return {
                pageIndex: position.pageIndex,
                width: position.width * viewport.scale,
                paths: position.paths.map((path) => {
                    let vpath = [];
                    for (let i = 0; i < path.length - 1; i += 2) {
                        let x = path[i];
                        let y = path[i + 1];
                        vpath.push(...viewport.convertToViewportPoint(x, y));
                    }
                    return vpath;
                })
            };
        }
    }



    const NOTE_DIMENSIONS = 22;

    function getModifiedSelectionRanges(selectionRanges, modifier) {
        if (!selectionRanges.length) {
            return [];
        }

        let range = selectionRanges.find(x => x.anchor);
        let anchor = {
            pageIndex: range.position.pageIndex,
            offset: range.anchorOffset
        };

        range = selectionRanges.find(x => x.head);
        let head = {
            pageIndex: range.position.pageIndex,
            offset: range.headOffset
        };
        if (modifier === 'left') {
            head.offset--;
        }
        else if (modifier === 'right') {
            head.offset++;
        }
        else if (modifier === 'up') {
            head.offset = window.extractor.getPrevLineClosestOffset(head.pageIndex, head.offset);
            if (head.offset === null) {
                return [];
            }
        }
        else if (modifier === 'down') {
            head.offset = window.extractor.getNextLineClosestOffset(head.pageIndex, head.offset);
            if (head.offset === null) {
                return [];
            }
        }
        else if (typeof modifier === 'object') {
            let position = modifier;
            head = position;
        }
        return getSelectionRanges(anchor, head);
    }

    function getWordSelectionRanges(position) {
        let res = window.extractor.getClosestWord(position);
        if (!res) {
            return [];
        }
        let { anchorOffset, headOffset } = res;

        let anchor = {
            pageIndex: position.pageIndex,
            offset: anchorOffset
        };

        let head = {
            pageIndex: position.pageIndex,
            offset: headOffset
        };
        return getSelectionRanges(anchor, head);
    }

    function getLineSelectionRanges(position) {
        let res = window.extractor.getClosestLine(position);
        if (!res) {
            return [];
        }
        let { anchorOffset, headOffset } = res;

        let anchor = {
            pageIndex: position.pageIndex,
            offset: anchorOffset
        };

        let head = {
            pageIndex: position.pageIndex,
            offset: headOffset
        };
        return getSelectionRanges(anchor, head);
    }

    function getSelectionRanges(anchor, head) {
        let selectionRanges = [];
        let fromPageIndex = Math.min(anchor.pageIndex, head.pageIndex);
        let toPageIndex = Math.max(anchor.pageIndex, head.pageIndex);
        let reverse = anchor.pageIndex > head.pageIndex;
        for (let i = fromPageIndex; i <= toPageIndex; i++) {
            let a, h;
            if (i === anchor.pageIndex) {
                a = anchor.offset !== undefined ? anchor.offset : [anchor.rects[0][0], anchor.rects[0][1]];
            }

            if (i === head.pageIndex) {
                h = head.offset !== undefined ? head.offset : [head.rects[0][0], head.rects[0][1]];
            }

            let selectionRange = window.extractor.extractRange({
                pageIndex: i,
                anchor: a,
                head: h,
                reverse
            });

            if (!selectionRange) {
                return [];
            }

            if (i === anchor.pageIndex) {
                selectionRange.anchor = true;
            }

            if (i === head.pageIndex) {
                selectionRange.head = true;
            }

            if (!selectionRange.collapsed) {
                // We can synchronously get page viewbox from page view, because it's already loaded when selecting
                let pageHeight = pdfViewer.getPageView(selectionRange.position.pageIndex).viewport.viewBox[3];
                let top = pageHeight - selectionRange.position.rects[0][3];
                if (top < 0) {
                    top = 0;
                }

                // TODO: Unify all annotations sort index calculation
                let offset = Math.min(selectionRange.anchorOffset, selectionRange.headOffset);
                selectionRange.sortIndex = [
                    i.toString().slice(0, 5).padStart(5, '0'),
                    offset.toString().slice(0, 6).padStart(6, '0'),
                    Math.floor(top).toString().slice(0, 5).padStart(5, '0')
                ].join('|');
            }

            selectionRanges.push(selectionRange);
        }
        return selectionRanges;
    }


    function uuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + '-' + S4() + '-' + S4());
    };

    function onAttachPage(page) {

        var pageIndex = page.id - 1;
        // if (!_pdfPages[pageIndex]) {
        // 	let pageData = await PDFViewerApplication.pdfDocument.getPageData({ pageIndex });
        // 	_pdfPages[pageIndex] = pageData;
        // }

        // if (page.div) {
        // 	page.div.setAttribute('draggleb')
        // }

        onDetachPage(page);
        var p = new Page(page);
        p._annotations = annotations;
        // p._pdfPages = _pdfPages;
        p._noteImage = noteImage;

        _pages.push({
            pageIndex,
            page: p
        });

        p.render();

        if (waitPdfId) {
            clearSelection();
            showAnnotate(waitPdfId);
            waitPdfId = '';
        }

    }


    function onDetachPage(page) {
        var pageIndex = page.id - 1;
        _pages = _pages.filter(p => p.pageIndex != pageIndex);
    }

    function pageRender(evt) {
        //var pageNumber = evt.pageNumber;

        // console.log(pageNumber, evt);

        onAttachPage(evt.source)

        // setTimeout(() => {
        // 	getPdfAnnotation(pageNumber);
        // }, 10);
    };


    function getPdfAnnotation(pageNumber) {
        if (interval) {
            clearInterval(interval);
        }
        interval = null;
        if (annotations && annotations.length) {
            createPdfAnnotate(annotations, pageNumber);
        }
    }


    function createPdfAnnotate(rows, pageNumber) {
        var pageDom = document.querySelector('#viewer .page');
        var pageWidth = pageDom.clientWidth;

        //  if($(`.page[data-page-number='${pageNumber}']`).find('.annotate').length){
        //        $(`.page[data-page-number='${pageNumber}']`).find('.annotate').remove();
        //  }

        document.querySelectorAll(`.page[data-page-number='${pageNumber}'] .mm-highlight`).forEach(ele => {
            if (ele) {
                var p = ele.parentNode;
                p.removeChild(ele);
            }
        });

        var annotations = rows;

        annotations.forEach(row => {

            var json = JSON.parse(row.text)
            var rects = json.relateRect;
            var bg = `rgb(${json.color.r},${json.color.g},${json.color.b})`;
            if (json.contents) {
                var comment = json.contents;
            }

            //  if(json.pageWidth){
            //    var pw = json.pageWidth
            //  }else{
            //   var pw = pageWidth
            //  }


            if (json.page + 1 != pageNumber) return;

            if (rects.length > 1) {
                rects.forEach((rect, i) => {
                    var dom = document.createElement('div');
                    dom.classList.add('mm-highlight');
                    dom.classList.add('annotate');
                    dom.setAttribute('data-type', row.type);
                    if (row.type == 'highlight') {
                        dom.setAttribute('data-text', json.selectText || '');
                    }
                    dom.style = `background:${bg};width:${rect.width * pageWidth}px;height:${rect.height * pageWidth}px;position:absolute;cursor:pointer;left:${rect.x * pageWidth}px;top:${rect.y * pageWidth}px;`
                    dom.setAttribute('data-id', row.id)

                    var textLayer = document.querySelector(`.page[data-page-number='${pageNumber}'] .textLayer`);

                    if (textLayer.querySelector('.annotateLayer-extend')) {
                        var annoatetLayerDom = textLayer.querySelector('.annotateLayer-extend');
                    } else {
                        var annoatetLayerDom = document.createElement('div')
                        annoatetLayerDom.classList.add('annotateLayer-extend');
                        textLayer.appendChild(annoatetLayerDom)
                    }
                    annoatetLayerDom.appendChild(dom)

                    if (comment && i == 0) {
                        var commentBar = document.createElement('span');
                        commentBar.classList.add('comment-bar');
                        var color = dom.style.background;
                        commentBar.style = `position:abaolute;left:-8px;top:-6px;z-index:120;`;
                        commentBar.innerHTML = annotateCommentIcon
                        commentBar.setAttribute('data-title', comment);
                        dom.appendChild(commentBar);
                    }

                });
            } else {
                var dom = document.createElement('div');

                dom.setAttribute('data-id', json.id)
                dom.setAttribute('data-type', row.type);
                dom.classList.add('mm-highlight');
                dom.classList.add('annotate');
                if (row.type == 'highlight') {
                    dom.setAttribute('data-text', json.selectText || '');
                }
                if (row.type == 'rect') {
                    dom.setAttribute('data-path', json.path);
                    var headDom = document.createElement('div');
                    headDom.classList.add('annotate-head');
                    dom.appendChild(headDom);

                    var resizeDom = document.createElement('div');
                    resizeDom.classList.add('annotate-resize');
                    dom.appendChild(resizeDom);
                    resizeDom.innerHTML = annotateResizeIcon;

                }
                if (json.relateRect && json.relateRect.length) {
                    dom.style = `background:${bg};width:${json.relateRect[0].width * pageWidth}px;height:${json.relateRect[0].height * pageWidth}px;position:absolute;cursor:pointer;left:${json.relateRect[0].x * pageWidth}px;top:${json.relateRect[0].y * pageWidth}px;`

                    var textLayer = document.querySelector(`.page[data-page-number='${pageNumber}'] .textLayer`);
                    // textLayer.appendChild(dom);
                    if (textLayer.querySelector('.annotateLayer-extend')) {
                        var annoatetLayerDom = textLayer.querySelector('.annotateLayer-extend');
                    } else {
                        var annoatetLayerDom = document.createElement('div')
                        annoatetLayerDom.classList.add('annotateLayer-extend');
                        textLayer.appendChild(annoatetLayerDom)
                    }
                    annoatetLayerDom.appendChild(dom)
                }

                if (comment) {
                    var commentBar = document.createElement('span');
                    commentBar.classList.add('comment-bar');
                    var color = dom.style.background;
                    commentBar.style = `position:abaolute;left:-8px;top:-6px;z-index:120;`;

                    commentBar.innerHTML = annotateCommentIcon;
                    commentBar.setAttribute('data-title', comment);
                    dom.appendChild(commentBar);
                }

            }
        });

        //探测待定位的标注
        detachPdfAnnotate(pageNumber);
    };


    function detachPdfAnnotate(p) {

        var me = this, id, pageNumber;
        if (waitPdfId) {
            id = waitPdfId;
        } else {
            return;
        }

        if (!annotations || annotations.length == 0) return;

        var annotate = annotations.filter(an => {
            var json = JSON.parse(an.text);
            if (an.id == id) {
                pageNumber = parseInt(json.page) + 1;
                return true;
            } else {
                return false;
            }
        });

        if (annotate.length) {
            //$('.annotate.active').removeClass('active');
            // var dom = $('.textLayer').find(`.annotate[data-id = '${id}']`);
            var dom = document.querySelector(`.textLayer .mm-highlight[data-id = '${id}']`)

            if (dom) {
                // var page = dom.closest('.page').attr('data-page-number');
                pdfViewer.currentPageNumber = pageNumber;
                pdfViewer._currentPage = pdfViewer.currentPageNumber;
                var top = parseInt(dom.style.top)
                if (setTime) clearTimeout(setTime);
                setTime = setTimeout(() => {
                    var body = document.querySelector('#viewerContainer');
                    body.scrollTop = body.scrollTop + top - 100;

                    document.querySelectorAll(`.textLayer .mm-highlight[data-id = '${id}']`).forEach(ele => {
                        if (ele) {
                            ele.classList.add('active');
                        }
                    })

                }, 0);


            } else {
                pdfViewer.currentPageNumber = pageNumber;
                pdfViewer._currentPage = pageNumber;

                if (setTime) clearTimeout(setTime);
                me.setTime = setTimeout(() => {
                    var dom = document.querySelector(`.textLayer .mm-highlight[data-id = '${id}']`);
                    if (dom) {
                        var top = parseInt(dom.style.top);
                        setTimeout(() => {
                            var body = document.querySelector('#viewerContainer');
                            body.scrollTop = body.scrollTop + top - 100;
                        }, 30);

                        document.querySelectorAll(`.textLayer .mm-highlight[data-id = '${id}']`).forEach(ele => {
                            if (ele) {
                                ele.classList.add('active');
                            }
                        })
                    }
                }, 0);
            }
        }

        if (pageNumber == p) {
            waitPdfId = '';
        }
    };


    function showAnnotateJson(json) {

        pdfViewer.currentPageNumber = parseInt(json.position.pageIndex) + 1;

        setTimeout(() => {
            var pageDom = document.querySelector(`#viewer .page[data-page-number="${json.position.pageIndex + 1}"]`);
            var canvasDom = pageDom.querySelector('.canvasWrapper');
            var pageWidth = canvasDom.clientWidth;
            var pageHeight = canvasDom.clientHeight;
            var jPageWidth = json.pageWidth;
            var diff = pageWidth / jPageWidth;
            var rects = json.position.rects;
            var realRect = [];


            rects.forEach((r) => {
                var w = r[2] - r[0];
                var h = r[3] - r[1];

                realRect.push({
                    x: r[0] * diff,
                    y: pageHeight - (r[1] * diff) - h * diff,
                    w: w * diff,
                    h: h * diff
                });
            })

            if (realRect) {
                var tempDom = [];
                realRect.forEach(r => {
                    var dom = document.createElement('div');
                    dom.classList.add('mm-temp-highlight');
                    dom.style.left = r.x + 'px';
                    dom.style.top = r.y + 'px';
                    dom.style.width = r.w + 'px';
                    dom.style.height = r.h + 'px';
                    dom.style.backgroundColor = "rgb(247, 255, 0,0.3)";
                    dom.style.position = "absolute";
                    tempDom.push(dom);
                    canvasDom.appendChild(dom);

                })

                var top = parseInt(tempDom[0].style.top);

                setTimeout(() => {
                    var body = document.querySelector('#viewerContainer');
                    body.scrollTop = body.scrollTop + top - 60;

                    setTimeout(() => {
                        tempDom.forEach((temp) => {
                            canvasDom.removeChild(temp);
                        })
                    }, 1000)
                }, 100);
            }


        }, 30);

    }

    // function showAnnotate(id, pdfName) {

    // 	if (annotations.length) {
    // 		var annotate = null;
    // 		annotations.forEach(an => {
    // 			if (an.id == id) {
    // 				annotate = an
    // 			}
    // 		});

    // 		if (annotate) {
    // 			//  $('.annotate.active').removeClass('active');
    // 			//  var dom = $('.textLayer').find(`.annotate[data-id = '${id}']`);
    // 			document.querySelectorAll('.mm-highlight.active').forEach(ele => {
    // 				ele.classList.remove('active');
    // 			});
    // 			var dom = document.querySelector(`.mm-highlight[data-id = '${id}']`);
    // 			if (dom) {
    // 				var page = dom.closest('.page').getAttribute('data-page-number');
    // 				pdfViewer.currentPageNumber = parseInt(page);
    // 				//pdfViewer._scrollIntoView({pageDiv:dom.closest('.page'),pageSpot:null,pageNumber:parseInt(page)})
    // 				var top = parseInt(dom.style.top);

    // 				setTimeout(() => {
    // 					var body = document.querySelector('#viewerContainer');
    // 					body.scrollTop = body.scrollTop + top - 60;
    // 					isShowAnnotate = false;
    // 				}, 100);

    // 				document.querySelectorAll(`.mm-highlight[data-id = '${id}']`).forEach(ele => {
    // 					ele.classList.add('active')
    // 				});

    // 				waitPdfId = '';
    // 			} else {
    // 				waitPdfId = id;
    // 				var d = JSON.parse(annotate.text);
    // 				pdfViewer.currentPageNumber = parseInt(d.page) + 1;
    // 			}
    // 		}
    // 	}
    // };


    function showAnnotate(id) {

        clearSelection();

        if (annotations.length) {
            var annotate = null;
            annotations.forEach(an => {
                if (an.id == id) {
                    annotate = an
                }
            });


            if (annotate) {
                //  $('.annotate.active').removeClass('active');
                //  var dom = $('.textLayer').find(`.annotate[data-id = '${id}']`);

                if (pdfViewer.currentPageNumber != (annotate.position.pageIndex + 1)) {
                    if (selectBoxDom) {
                        if (selectBoxDom.parentElement) {
                            selectBoxDom.parentElement.removeChild(selectBoxDom);
                        }
                        selectBoxDom.onmousedown = null;
                        selectBoxDom.ontouchstart = null;
                        selectBoxDom = null;
                    }

                    pdfViewer.currentPageNumber = annotate.position.pageIndex + 1;
                    waitPdfId = annotate.id;
                }

                setTimeout(() => {
                    createAnnotationBox(annotate);
                    showSideAnnotation(annotate.id);

                    var rect = selectBoxDom.getBoundingClientRect();

                    var body = document.querySelector('#viewerContainer');

                    if (rect.top < 0) {
                        scrolling = true;
                        clearSelection();
                        body.scrollTop = body.scrollTop + rect.top - 100;
                        createAnnotationBox(annotate);
                        showSideAnnotation(annotate.id);
                        setTimeout(() => {
                            scrolling = false;
                        }, 10)
                    }

                    if (rect.top > body.clientHeight - 100) {
                        scrolling = true;
                        clearSelection();
                        body.scrollTop = body.scrollTop + rect.top - 100;
                        createAnnotationBox(annotate);
                        showSideAnnotation(annotate.id);
                        setTimeout(() => {
                            scrolling = false;
                        }, 10)
                    }
                }, 200);
            }
        }
    };



    function computePageOffset() {
        if (pdfViewer._currentPage >= 0) {
            var pg = document.querySelector(`.page[data-page-number="${pdfViewer._currentPage}"]`);
            if (pg) {
                var textLayer = pg.querySelector('canvas');

                var rect = textLayer.getBoundingClientRect();
                return {
                    top: rect.top,
                    left: rect.left
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        } else {
            return {
                left: 0,
                top: 0
            }
        }

    };

    function selectionCoordinates() {

        let rec = window.getSelection().getRangeAt(0).getBoundingClientRect();
        let ost = computePageOffset();
        let x_1 = rec.x - ost.left
        let y_1 = rec.y - ost.top
        let x_2 = x_1 + rec.width
        let y_2 = y_1 + rec.height

        var cache = [x_1, y_1, x_2, y_2];

        let x_1_y_1 = pdfViewer._pages[pdfViewer._currentPage - 1].viewport.convertToPdfPoint(x_1, y_1)
        x_1 = x_1_y_1[0]
        y_1 = x_1_y_1[1]
        let x_2_y_2 = pdfViewer._pages[pdfViewer._currentPage - 1].viewport.convertToPdfPoint(x_2, y_2)
        x_2 = x_2_y_2[0]
        y_2 = x_2_y_2[1]

        return [x_1, y_1, x_2, y_2].concat(cache);
    };


    function _createImage(imagePath, imageOptions, isNew, textLayer, rectDom, data) {
        var pageDom = document.querySelector('#viewer .page');
        var pageWidth = pageDom.clientWidth;
        var newCanvas = document.createElement('canvas');
        newCanvas.width = imageOptions.width;
        newCanvas.height = imageOptions.height;
        var newCtx = newCanvas.getContext('2d');

        var page = textLayer.closest('.page');
        var canvas = page.querySelector('canvas');

        let devicePixelRatio = window.devicePixelRatio || 1
        let backingStoreRatio = newCtx.webkitBackingStorePixelRatio || newCtx.mozBackingStorePixelRatio || newCtx.msBackingStorePixelRatio || newCtx.oBackingStorePixelRatio || newCtx.backingStorePixelRatio || 1
        let ratio = devicePixelRatio / backingStoreRatio;

        newCtx.drawImage(canvas, imageOptions.left * ratio, imageOptions.top * ratio, imageOptions.width * ratio, imageOptions.height * ratio, 0, 0, imageOptions.width, imageOptions.height);
        var imageData = newCanvas.toDataURL();
        var base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = _base64ToArrayBuffer(base64Data);
        var relateRect = [{
            x: imageOptions.left / pageWidth,
            y: imageOptions.top / pageWidth,
            width: imageOptions.width / pageWidth,
            height: imageOptions.height / pageWidth
        }];

        data.relateRect = relateRect || [];
        data.pdfName = path;
        data.path = imagePath;


        if (isNew) {
            rectDom.setAttribute('data-id', data.id);
            rectDom.setAttribute('data-path', imagePath);
            annotations.push({
                id: data.id,
                text: JSON.stringify(data),
                type: 'rect',
                page: data.page,
                width: imageOptions.width,
                height: imageOptions.height,
                pdfName: path
            });
        }

        window.parent.postMessage({
            type: 'createRect',
            imagePath: imagePath,
            dataBuffer: dataBuffer,
            annotations: annotations,
            isNew: isNew,
            data: data,
            relateRect: relateRect,
            imageOptions: imageOptions,
            _viewMark: _viewMark,
            mdId
        }, '*');

        setTimeout(() => {
            if (isNew) {
                rectDom = null;
            }
        }, 500);

    };


    function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }


})