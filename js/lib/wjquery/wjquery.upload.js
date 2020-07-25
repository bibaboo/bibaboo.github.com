/*
 * wjquery.upload 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성 작업중...
*/

(function ($) {
    "use strict";
    if ($.wupload) {
        return;
    }

    $.wupload = {
        version: "0.1.0",
        showLog: false,
        defaults: {
            locale: "ko",
            height: "98px",
            maxCount: 0, //0 unlimit
            maxSizeMb: 20 //0 unlimit
        },
        lang: {
            ko: {
                add: "추가",
                del: "삭제",
                fileInfo: "개체, 첨부 파일 총 용량",
                fileName: "파일명",
                uploadStatus: "업로드 상태",
                fileSize: "용량",
                registedFile: "등록된 파일입니다.",
                maxCount: "개 까지 등록 할 수 있습니다.",
                maxSizeMb: "MB 까지 등록 할 수 있습니다.",
                deleteFile: "삭제할 파일을 선택해 주세요!"
            }
        },
        tmpl: {
            base: "<div class=\"wupload-wrap\">" +
                "    <div class=\"header-area\">" +
                "        <input type=\"file\" class=\"wupload-file\" multiple/>" +
                "        <button typ=\"button\" data-action=\"add\">${add}</button>" +
                "        <button typ=\"button\" data-action=\"del\">${del}</button>" +
                "        <div class=\"file-info\"><span>0</span> ${fileInfo} : <span>0MB</span> / 20MB</div>" +
                "    </div>" +
                "    <div class=\"contents-area\">" +
                "        <table summary=\"file list table\">" +
                "            <colgroup>" +
                "                <col width=\"25px\">" +
                "                <col width=\"*\">" +
                "                <col width=\"150px\">" +
                "                <col width=\"100px\">" +
                "            </colgroup>" +
                "            <thead>" +
                "                <tr>" +
                "                    <th scope=\"col\"></th>" +
                "                    <th scope=\"col\">${fileName}</th>" +
                "                    <th scope=\"col\">${uploadStatus}</th>" +
                "                    <th scope=\"col\">${fileSize}</th>" +
                "                </tr>" +
                "            </thead>" +
                "            <tbody>" +
                "            </tbody>" +
                "        </table>" +
                "    </div>" +
                "</div>",
            item: "<tr>" +
                "   <td><img src=\"../images/file/${icon}\" /></td>" +
                "   <td>${name}</td>" +
                "   <td>.....</td>" +
                "   <td>${size}</td>" +
                "</tr>"
        },
        files: [],
        el: null
    }

    $.wupload.init = function ($target, options) {
        this.options = $.extend(true, {}, this.defaults, options);
        this.el = $target;
        this.options.locale = this.lang[this.options.locale] ? this.options.locale : "ko";

        $.tmpl($.wupload.tmpl.base, this.lang[this.options.locale]).appendTo(this.el);
        $(".contents-area", $target).css("height", this.options.height);
        $(".header-area button", $target).click(function () {
            let $t = $(this);
            switch ($t.attr("data-action")) {
                case "add":
                    $(".wupload-file", $target).trigger('click');
                    break;
                case "del":
                    $.wupload.deleteFile();
                    break;
                default:
                    break;
            }
        });

        $(".wupload-file", $target).change(function (e) {
            //$.wupload.files = [];
            let $c = $(".contents-area table tbody", $target),
                files = Array.prototype.slice.call(e.target.files);

            //base64 e.target.result
            $.each(files, function () {
                if ($.wupload.isDuplicate(this.name, this.size)) {
                    alert(this.name + $.wupload.getLang("registedFile"));
                    return;
                }

                if ($.wupload.options.maxCount != 0 && $.wupload.options.maxCount <= $.wupload.files.length) {
                    alert($.wupload.options.maxCount + $.wupload.getLang("maxCount"));
                    return false;
                }

                if ($.wupload.options.maxSizeMb != 0 && ($.wupload.options.maxSizeMb * 1024 * 1024) <= ($.wupload.getTsize() + this.size)) {
                    alert($.wupload.options.maxSizeMb + $.wupload.getLang("maxSizeMb"));
                    return false;
                }

                $.wupload.files.push(this);
                let reader = new FileReader();
                reader.onload = $.proxy((e) => {
                    let $tr = $.tmpl($.wupload.tmpl.item, {
                        icon: getFileIcon(this.name),
                        name: this.name,
                        size: formatFileSize(this.size)
                    });

                    $tr.click(function () {
                        $(this).toggleClass("selected");
                    }).appendTo($c);
                }, this);
                reader.readAsDataURL(this);
            });

            $.wupload.calFileInfo();
        });
    };

    $.wupload.calFileInfo = () => {
        let $c = $(".header-area .file-info", $.wupload.el);
        $c.find("span:eq(0)").html($.wupload.files.length);
        $c.find("span:eq(1)").html(formatFileSize($.wupload.getTsize()));
    };

    $.wupload.deleteFile = () => {
        let $c = $(".contents-area table tbody tr", $.wupload.el),
            d = [],
            f = [];
        $c.each(function (index) {
            let $t = $(this);
            if ($t.hasClass("selected")) {
                $t.remove();
                d.push(index)
            } else {
                f.push($.wupload.files[index]);
            }
        });

        if (d.length == 0) {
            alert($.wupload.getLang("deleteFile"));
        } else {
            $.wupload.files = null;
            $.wupload.files = f;
            $.wupload.calFileInfo();
        }
    };

    $.wupload.isDuplicate = (name, size) => {
        for (let i in $.wupload.files) {
            if ($.wupload.files[i].name == name && $.wupload.files[i].size == size) {
                return true;
            }
        }
        return false;
    };

    $.wupload.getTsize = () => {
        let tSize = 0;
        $.wupload.files.forEach((f) => tSize += f.size);
        return tSize;
    };

    $.wupload.getLang = (code) => $.wupload.lang[$.wupload.options.locale][code];

    $.fn.wupload = function (arg) {
        let args = Array.prototype.slice.call(arguments, 1),
            isMethod = (typeof arg === 'string'),
            result = null;

        if (!(this.length == 1 && this.prop("tagName").toLowerCase() == "div")) {
            return;
        }

        if (isMethod) {
            if ($.wupload.interface[arg]) {
                result = $.wupload.interface[arg].apply(this, args);
            } else {
                $.alert("Method " + arg + " does not exist");
            }
        } else {
            $.wupload.init(this, arg || {});
        }
        return result !== null && result !== undefined ? result : this;
    };
})(jQuery);