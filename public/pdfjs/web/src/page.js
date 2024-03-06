function Page(originalPage) {
    this.originalPage = originalPage;
    this.pageIndex = originalPage.id - 1;

    let canvas = document.createElement('canvas');
    canvas.width = this.originalPage.canvas?.width;
    canvas.height = this.originalPage.canvas?.height;
    this.originalCanvas = canvas;
    this.originalContext = canvas.getContext('2d');
    this.originalContext.drawImage(this.originalPage.canvas, 0, 0);
    this.actualContext = this.originalPage.canvas.getContext('2d');
}


Page.prototype.transform = function () {
    let scale = parseFloat(this.originalCanvas.width) / this.originalPage.viewport.width;
    let scaleTransform = [scale, 0, 0, scale, 0, 0];
    return transform(scaleTransform, this.originalPage.viewport.transform);
}

Page.prototype.scale = function () {
    let [a, b] = this.transform();
    return Math.hypot(a, b);
}


Page.prototype.p2v = function (position) {

    let transform = this.transform();
    if (position.rects) {
        if (position.nextPageRects && position.pageIndex + 1 === this.pageIndex) {
            return {
                pageIndex: position.pageIndex,
                nextPageRects: position.nextPageRects.map((rect) => {
                    let [x1, y2] = applyTransform(rect, transform);
                    let [x2, y1] = applyTransform(rect.slice(2, 4), transform);
                    return [
                        Math.min(x1, x2),
                        Math.min(y1, y2),
                        Math.max(x1, x2),
                        Math.max(y1, y2)
                    ];
                })
            };
        }
        else {
            let position2 = {
                pageIndex: position.pageIndex,
                rects: position.rects.map((rect) => {
                    let [x1, y2] = applyTransform(rect, transform);
                    let [x2, y1] = applyTransform(rect.slice(2, 4), transform);
                    return [
                        Math.min(x1, x2),
                        Math.min(y1, y2),
                        Math.max(x1, x2),
                        Math.max(y1, y2)
                    ];
                })
            };

            if (position.fontSize) {
                position2.fontSize = position.fontSize * this.scale();
            }
            if (position.rotation) {
                position2.rotation = position.rotation;
            }
            return position2;
        }
    }
    else if (position.paths) {
        return {
            pageIndex: position.pageIndex,
            width: position.width * this.scale(),
            paths: position.paths.map((path) => {
                let vpath = [];
                for (let i = 0; i < path.length - 1; i += 2) {
                    let x = path[i];
                    let y = path[i + 1];
                    vpath.push(...applyTransform([x, y], transform));
                }
                return vpath;
            })
        };
    }
}

// 转换两个点 points: [x0,y0,x1,y1]
Page.prototype.p2vPoint = function (points) {
    let transform = this.transform();
    let vpath = [];
    for (let i = 0; i < points.length - 1; i += 2) {
        let x = points[i];
        let y = points[i + 1];
        vpath.push(...applyTransform([x, y], transform));
    }
    return vpath;
}

Page.prototype.render = function () {

    var annotations = this._annotations.filter(
        x => x.position.pageIndex === this.pageIndex
            || x.position.nextPageRects && x.position.pageIndex + 1 === this.pageIndex
    );

    this.actualContext.save();
    this.actualContext.drawImage(this.originalCanvas, 0, 0);

    for (let annotation of annotations) {
        if (annotation.type == 'highlight') {
            this._renderHighlight(annotation);
        }
        if (annotation.type == 'underline') {
            this._renderUnderline(annotation);
        }

        if (annotation.type == 'strokeout') {
            this._renderStrokeout(annotation);
        }

        if (annotation.type == 'ink') {
            this._renderInk(annotation);
        }

        if (annotation.type == 'image') {
            this._renderRect(annotation);
        }

        if (annotation.comments) {
            this._renderNoteImage(annotation);
        }
    }
}


Page.prototype._renderRect = function (annotation) {
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    this.actualContext.strokeStyle = annotation.color;
    this.actualContext.lineWidth = 2 * devicePixelRatio;
    let rect = position.rects[0];
    this.actualContext.strokeRect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]);
    this.actualContext.restore();
}

Page.prototype.getImageByAnnotation = function (annotation, cb) {

    var canvas = document.createElement('canvas');
    // if (annotation.type == 'image' || annotation.type == 'ink') {
    var box = getPositionBoundingRect(annotation.position);
    //  let position = this.p2v(annotation.position);
    //   var r = position.rects[0];
    var r = this.p2vPoint(box);
    if (r && r.length == 4) {
        var ctx = canvas.getContext('2d')
        ctx.save();

        var w = Math.abs(r[2] - r[0]);
        var h = Math.abs(r[3] - r[1]);
        canvas.width = w;
        canvas.height = h;

        var dx = annotation.type == 'image' ? 2 : 0;

        ctx.drawImage(this.originalPage.canvas, r[0] + dx, r[1] - h + dx, w - dx * 2, h - dx * 2, 0, 0, w - dx * 2, h - dx * 2);
        var data = canvas.toDataURL('image/png', 1);

        return {
            data,
            width: w,
            height: h
        }

    }
    // }

    return null;
}

Page.prototype._renderHighlight = function (annotation) {
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    this.actualContext.globalAlpha = 1;
    this.actualContext.globalCompositeOperation = 'multiply';
    this.actualContext.fillStyle = annotation.color;

    let rects = position.rects;
    if (position.nextPageRects && position.pageIndex + 1 === this.pageIndex) {
        rects = position.nextPageRects;
    }

    for (let rect of rects) {
        this.actualContext.fillRect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]);
    }
    this.actualContext.restore();
}

Page.prototype._renderStrokeout = function (annotation) {
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    // this.actualContext.globalAlpha = 0.8;
    // this.actualContext.globalCompositeOperation = 'multiply';
    this.actualContext.fillStyle = annotation.color;

    let rects = position.rects;
    if (position.nextPageRects && position.pageIndex + 1 === this.pageIndex) {
        rects = position.nextPageRects;
    }

    let width = 1;
    width *= this.scale();

    for (let rect of rects) {
        this.actualContext.fillRect(rect[0], rect[1] + (rect[3] - rect[1] - width) / 2 - 1, rect[2] - rect[0], width);
    }

    this.actualContext.restore();
}

Page.prototype._renderUnderline = function (annotation) {
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    // this.actualContext.globalAlpha = 0.8;
    // this.actualContext.globalCompositeOperation = 'multiply';
    this.actualContext.fillStyle = annotation.color;

    let rects = position.rects;
    if (position.nextPageRects && position.pageIndex + 1 === this.pageIndex) {
        rects = position.nextPageRects;
    }

    let width = 1;
    width *= this.scale();

    for (let rect of rects) {
        this.actualContext.fillRect(rect[0], rect[3] - width / 2, rect[2] - rect[0], width);
    }

    this.actualContext.restore();
}

Page.prototype.renderStroke = function (annotation) {
    let points = this.p2vPoint(annotation.points);
    this.actualContext.save();
    this.actualContext.beginPath();
    this.actualContext.strokeStyle = annotation.color;
    this.actualContext.lineWidth = annotation.width;
    this.actualContext.lineCap = 'round';
    this.actualContext.lineJoin = 'round';

    // for (let path of position.paths) {
    //     this.actualContext.moveTo(...path.slice(0, 2));
    //     for (let i = 0; i < path.length - 1; i += 2) {
    //         let x = path[i];
    //         let y = path[i + 1];
    //         if (i === 0) {
    //             this.actualContext.moveTo(x, y);
    //         }
    //         this.actualContext.lineTo(x, y);
    //     }
    // }

    this.actualContext.moveTo(...points.slice(0, 2));
    this.actualContext.lineTo(...points.slice(2, 4));

    this.actualContext.stroke();
    this.actualContext.restore();
}

Page.prototype._renderNoteImage = function (annotation) {
    if (annotation && !annotation.position.rects) return
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    let rects = position.rects;
    var rect = rects[0];
    this.actualContext.drawImage(this._noteImage, rect[0] - 8, rect[1] - 8, 14, 10);
}

Page.prototype._renderInk = function (annotation) {
    let w = annotation.position.width;
    let position = this.p2v(annotation.position);
    this.actualContext.save();
    this.actualContext.beginPath();
    this.actualContext.strokeStyle = annotation.color;
    this.actualContext.lineWidth = w;
    this.actualContext.lineCap = 'round';
    this.actualContext.lineJoin = 'round';


    for (let path of position.paths) {
        this.actualContext.moveTo(...path.slice(0, 2));
        for (let i = 0; i < path.length - 1; i += 2) {
            let x = path[i];
            let y = path[i + 1];
            if (i === 0) {
                this.actualContext.moveTo(x, y);
            }

            this.actualContext.lineTo(x, y);
        }
    }
    this.actualContext.stroke();
    this.actualContext.restore();


}
