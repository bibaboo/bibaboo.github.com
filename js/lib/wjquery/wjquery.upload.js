/*
 * wjquery.upload 0.2.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.2.0 : 기본기능 완성
 0.1.0 : 최초작성 작업중...
*/

(function ($) {
    "use strict";
    if ($.wupload) {
        return;
    }

    $.wupload = {
        $t: null,
        tmp: {
            removeFiles: [],
            files: []
        },
        defaultOptions: {
            excludeExts: "*.ext;*.bat;*.jsp;*.js;*.com;*.php;*.jspx;*.phps;*.bin;*.sh;*.class;*.java;*.war;*.cgi;*.jspx;",
            icons: "bmp,jpg,gif,png,doc,docx,ppt,pptx,xls,xlsx,txt,hwp,zip",
            keys: ["contentsType" ,"extension" ,"name" ,"path" ,"realName" ,"size"],
            locale: "ko",
            height: "96px",
            showProgress: true,
            showDblArea: true,
            showTitle: true,
            showUpload: true,
            showLog: true,
            files: [],
            maxCount: 10, //0 unlimit
            maxSizeMb: 20 //0 unlimit
        },
        lang: {
            ko: {
                add: "추가",
                del: "삭제",
                fileInfo: "개체, 첨부 파일 총 용량",
                fileName: "파일명",
                fileSize: "용량",
                title: "파일 업로드",
                uploadStatus: "업로드 상태",
                registedFile: "등록된 파일입니다.",
                maxCount: "개 까지 등록 할 수 있습니다.",
                maxSizeMb: "MB 까지 등록 할 수 있습니다.",
                deleteFile: "삭제할 파일을 선택해 주세요!",
                excludeExt: "업로드 할 수 없는 파일입니다!",
                dblclickArea: "이곳을 더블클릭 해주세요!"
            }
        },
        tmpl: {
            base: "<div class=\"wupload-wrap\">" +
                "    <div class=\"wupload-title${showTitle}${showUpload1}\"><h3>${title}</h3><div></div></div>" +
                "    <div class=\"wupload-area${showUpload2}\">" +
                "       <div class=\"wupload-header\">" +
                "       <form method=\"post\" enctype=\"multipart/form-data\" id=\"wuploadForm\">" +
                "           <input type=\"file\" name=\"files\" id=\"wuploadFile\" class=\"wupload-file\" multiple/>" +
                "           <button type=\"button\" data-action=\"add\">${add}</button>" +
                "           <button type=\"button\" data-action=\"del\">${del}</button>" +
                "           <div class=\"file-info\"><span>0</span> ${fileInfo} : <span>0MB</span> / <span>${maxSize}MB</span></div>" +
                "       </form>" +
                "       </div>" +
                "       <div class=\"wupload-contents\">" +
                "           <table summary=\"file list table\">" +
                "               <thead>" +
                "                   <tr>" +
                "                       <th><input type=\"checkbox\" class=\"wupload-checkAll\"></th>" +
                "                       <th>${fileName}</th>" +
                "                       <th>${fileSize}</th>" +
                "                   </tr>" +
                "               </thead>" +
                "               <tbody class=\"none\">" +
                "               </tbody>" +
                "               <tfoot>" +
                "                   <tr><td colspan=\"3\">${dblclickArea}</td></tr>" +
                "               </tfoot>" +
                "           </table>" +
                "       </div>" +
                "   </div>" +
                "   <div class=\"wupload-progressBar\"><progress id=\"wuploadProgressBar\" value=\"0\" max=\"100\" /></div>" +
                "   <div class=\"wupload-overlay\"></div>" +
                "</div>",
            item: "<tr{{if className!=''}} class=\"${className}\"{{/if}}>" +
                "   <td><input type=\"checkbox\" class=\"wupload-check\"></td>" +
                "   <td><span class=\"wicon ${icon}\"></span> ${name}</td>" +
                "   <td>${size} </td>" +
                "</tr>"
        },

        core: {},
        api: {},
        util: {}
    };

    $.wupload.core.init = function ($target, options) {
        $.wupload.options = $.extend(true, {}, $.wupload.defaultOptions, options);
        $.wupload.$t = $target;
        $.wupload.options.locale = $.wupload.lang[$.wupload.options.locale] ? $.wupload.options.locale : "ko";

        $.tmpl($.wupload.tmpl.base,
            $.extend({
                maxSize: $.wupload.options.maxSizeMb,
                showTitle: $.wupload.options.showTitle ? "" : " wupload-none",
                showUpload1: $.wupload.options.showUpload ? "" : " close",
                showUpload2: $.wupload.options.showUpload ? "" : " wupload-none"
            }, $.wupload.lang[$.wupload.options.locale])
        ).appendTo($target);

        $.wupload.core.reset(false);

        if ($.wupload.options.showDblArea) {
            $(".wupload-contents tfoot", $target).on("dblclick", function (e) {
                $(".wupload-header button[data-action='add']", $.wupload.$t).click();
            });
        } else {
            $.wupload.core.shoWhideDblArea(false);
        }

        $(".wupload-title>div", $target).click(function () {
            const $p = $(this).parent();
            if ($p.hasClass("close")) {
                $p.removeClass("close");
                $p.next().removeClass("wupload-none");
            } else {
                $p.addClass("close");
                $p.next().addClass("wupload-none");
            }
        });

        $(".wupload-contents tbody, .wupload-contents tfoot", $target).css("height", $.wupload.options.height);
        $(".wupload-header button", $target).click(function () {
            const $t = $(this);
            switch ($t.attr("data-action")) {
                case "add":
                    $(".wupload-file", $.wupload.$t).trigger('click');
                    break;
                case "del":
                    $.wupload.core.remove();
                    break;
                default:
                    break;
            }
        });

        $(".wupload-contents .wupload-checkAll", $target).click(function () {
            if ($(this).prop("checked")) {
                $(".wupload-contents .wupload-check").prop("checked", true);
                $(".wupload-contents tbody tr").addClass("selected");
            } else {
                $(".wupload-contents .wupload-check").prop("checked", false);
                $(".wupload-contents tbody tr").removeClass("selected");
            }
        });

        $("#wuploadFile", $target).change(function (e) {
            $.wupload.core.add(Array.prototype.slice.call(e.target.files));
        });
    };

    $.wupload.core.add = files => {
        $.each(files, function () {
            $.wupload.core.render(this);
        });
    };

    $.wupload.core.render = item => {
        const ext = getLastValue(item.name, ".").toLowerCase();
        if (!$.hasValue(ext) || $.hasString($.wupload.options.excludeExts, ext)) {
            alert($.wupload.util.getLang("excludeExt"));
            return false;
        }

        if ($.wupload.core.exist(item.name, item.size)) {
            alert(item.name + $.wupload.util.getLang("registedFile"));
            return false;
        }

        if ($.wupload.options.maxCount != 0 && $.wupload.options.maxCount <= $.wupload.tmp.files.length) {
            alert($.wupload.options.maxCount + $.wupload.util.getLang("maxCount"));
            return false;
        }

        if ($.wupload.options.maxSizeMb != 0 && ($.wupload.options.maxSizeMb * 1024 * 1024) <= ($.wupload.util.getTsize() + item.size)) {
            alert($.wupload.options.maxSizeMb + $.wupload.util.getLang("maxSizeMb"));
            return false;
        }

        $.wupload.tmp.files.push(item);

        const $c = $(".wupload-contents table tbody", $.wupload.$t),
            $tr = $.tmpl($.wupload.tmpl.item, {
                className: item.fileId ? "registed" : "",
                icon: $.wupload.util.getExt(item.name),
                name: item.name,
                size: formatFileSize(item.size)
            });

        $tr.click(function () {
            if ($tr.hasClass("selected")) {
                $(this).removeClass("selected");
                $(this).find(".wupload-check").prop("checked", false);
            } else {
                $(this).addClass("selected");
                $(this).find(".wupload-check").prop("checked", true);
            }
            $.wupload.core.checkAll();
        }).appendTo($c);

        $.wupload.core.calculate();
        $.wupload.core.toggleDblArea();
        return true;
    };

    $.wupload.core.remove = () => {
        const $c = $(".wupload-contents table tbody tr", $.wupload.$t);
        let d = [],
            f = [];
        $c.each(function (index) {
            const $t = $(this);
            if ($t.hasClass("selected")) {
                $t.remove();
                d.push(index);
                if ($.wupload.tmp.files[index].fileId) {
                    $.wupload.tmp.removeFiles.push($.wupload.tmp.files[index]);
                }
            } else {
                f.push($.wupload.tmp.files[index]);
            }
        });

        if (d.length == 0) {
            alert($.wupload.util.getLang("deleteFile"));
        } else {
            $.wupload.tmp.files = null;
            $.wupload.tmp.files = f;
            $.wupload.core.calculate();
        }

        $.wupload.core.toggleDblArea();
    };

    $.wupload.core.exist = (name, size) => {
        for (let i in $.wupload.tmp.files) {
            if ($.wupload.tmp.files[i].name == name && $.wupload.tmp.files[i].size == size) {
                return true;
            }
        }
        return false;
    };

    $.wupload.core.calculate = () => {
        const $c = $(".wupload-header .file-info", $.wupload.$t);
        $c.find("span:eq(0)").html($.wupload.tmp.files.length);
        $c.find("span:eq(1)").html(formatFileSize($.wupload.util.getTsize()));
    };

    $.wupload.core.reset = (all = true) => {
        $(".wupload-contents table tbody", $.wupload.$t).empty();
        $.wupload.tmp.files = [];
        $.wupload.tmp.removeFiles = [];

        if (all == false && $.wupload.options.files.length > 0) {
            $.wupload.core.add($.wupload.options.files);
        } else {
            $.wupload.core.calculate();
        }
    };

    $.wupload.core.save = (opt = {}) => {
        let removeFileCount = $.wupload.tmp.removeFiles.length,
            saveFileCount = 0,
            formData = new FormData(),
            returnData = {
                existFileIds : [],
                removeFileIds : [],
                savedFiles : null
            }

        if ($.wupload.tmp.files.length > 0) {
            for (let i = 0; i < $.wupload.tmp.files.length; i++) {
                if (!$.hasValue($.wupload.tmp.files[i].fileId)) {
                    $.wupload.util.log($.wupload.tmp.files[i].name, "save : new");
                    formData.append("file" + (saveFileCount++), $.wupload.tmp.files[i]);
                } else {
                    $.wupload.util.log($.wupload.tmp.files[i].name, "save : exist");
                    returnData.existFileIds.push($.wupload.tmp.files[i].fileId);
                }
            }
        }

        $.wupload.util.log(removeFileCount, "save : removeFileCount");
        $.wupload.util.log(saveFileCount, "save : saveFileCount");

        if (removeFileCount == 0 && saveFileCount == 0) {
            $.wupload.util.log("", "save : nothing");
            if ($.isFunction(opt.success)) {
                returnData.savedFiles = [];
                opt.success(returnData);
            }
            return;
        }

        for (let i = 0; i < $.wupload.tmp.removeFiles.length; i++) {
            $.wupload.util.log($.wupload.tmp.removeFiles[i], "save : remove");
            returnData.removeFileIds.push($.wupload.tmp.removeFiles[i].fileId);
        }
        
        if (opt.formData) {
            $.each(opt.formData, function (key, val) {
                $.wupload.util.log(key + " : " + val, "save : formData");
                formData.append(key, val);
            })
        }

        $.wupload.core.toggleProgress(true);
        
        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: opt.url,
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: opt.timeout || 600000,
            success: function (result) {
                $.wupload.util.log(result, "save : success");
                if ($.isFunction(opt.success)) {
                    returnData.savedFiles = wJson.choose(result, $.wupload.options.keys);
                    opt.success(returnData);
                } else {
                    alert("upload success");
                }
            },
            xhr: function () {
                try {
                    if (!$.wupload.options.showProgress) return false;
                    const xhr = $.ajaxSettings.xhr();
                    xhr.upload.onprogress = function (e) {
                        const percent = e.loaded * 100 / e.total;
                        $.wupload.util.log(percent + "%", "upload percent");
                        $("#wuploadProgressBar").val(percent);
                    };
                    return xhr;
                } catch (e) {}
            },
            error: function (request) {
                var result = {code:request.status, message:request.responseText};
                $.wupload.util.log(result, "save : error");
                if ($.isFunction(opt.error)) {
                    opt.error(result);
                } else {
                    alert("upload fail");
                }
            },
            complete: function () {
                $.wupload.core.toggleProgress(false);
            }
        });
    };

    $.wupload.core.checkAll = () => {
        const isCheckAll = $(".wupload-contents .wupload-checkAll", $.wupload.$t).prop("checked"),
            trCount = $(".wupload-contents tbody tr").length,
            checkedCount = $(".wupload-contents tbody tr .wupload-check:checked").length;
        if (trCount == checkedCount) {
            if (!isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.$t).prop("checked", true)
        } else {
            if (isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.$t).prop("checked", false)
        }
    };

    $.wupload.core.toggleProgress = b => {
        if ($.wupload.options.showProgress) {
            if (b) {
                $(".wupload-progressBar", $.wupload.$t).show();
                $(".wupload-overlay", $.wupload.$t).show();
                
            } else {
                $(".wupload-progressBar", $.wupload.$t).hide();
                $(".wupload-overlay", $.wupload.$t).hide();
            }
        }
    };

    $.wupload.core.toggleDblArea = () => {
        if ($.wupload.options.showDblArea) {
            $.wupload.core.shoWhideDblArea($(".wupload-contents table tbody", $.wupload.$t).find("tr").length == 0);
        }
    };

    $.wupload.core.shoWhideDblArea = b => {
        const $t = $(".wupload-contents table tbody", $.wupload.$t),
            $f = $(".wupload-contents table tfoot", $.wupload.$t);
        if (b) {
            if (!$t.hasClass("none")) $t.addClass("none");
            if ($f.hasClass("none")) $f.removeClass("none");
        } else {
            if ($t.hasClass("none")) $t.removeClass("none");
            if (!$f.hasClass("none")) $f.addClass("none");
        }
    };

    $.wupload.util.log = (value, tag) => {
        if ($.wupload.options.showLog) $.wLog(value, tag);
    };

    $.wupload.util.getLang = (code) => $.wupload.lang[$.wupload.options.locale][code];

    $.wupload.util.getTsize = () => {
        let tSize = 0;
        $.wupload.tmp.files.forEach((f) => tSize += f.size);
        return tSize;
    };

    $.wupload.util.getExt = fileName => {
        const ext = getLastValue(fileName, ".").toLowerCase();
        return $.hasString($.wupload.options.icons, ext) ? ext : "etc";
    };

    $.wupload.api.save = opt => $.wupload.core.save(opt);
    $.wupload.api.reset = all => $.wupload.core.reset(all);

    $.fn.wupload = function (arg) {
        const args = Array.prototype.slice.call(arguments, 1),
            isMethod = (typeof arg === 'string');
        let result = null;

        if (!(this.length == 1 && this.prop("tagName").toLowerCase() == "div")) {
            return;
        }

        if (isMethod) {
            if ($.wupload.api[arg]) {
                result = $.wupload.api[arg].apply(this, args);
            } else {
                $.alert("Method " + arg + " does not exist");
            }
        } else {
            $.wupload.core.init(this, arg || {});
        }
        return result !== null && result !== undefined ? result : this;
    };

})(jQuery);