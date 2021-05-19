/*
 * wjquery.upload 0.1.0
 * by composite (wonchu.net@gmail.com)
 * http://www.wonchu.net
 * This project licensed under a MIT License.

 0.1.0 : 최초작성 작업중...
 0.2.0 : 기본기능 완성
*/

(function ($) {
    "use strict";
    if ($.wupload) {
        return;
    }

    const allowedMethod = {
        save: "save",
        reset: "reset"
    };

    $.wupload = {
        version: "0.2.0",
        showLog: false,
        action: allowedMethod,
        defaults: {
            imagePath: "../images/file/",
            excludeExts: "*.ext;*.bat;*.jsp;*.js;*.com;*.php;*.jspx;*.phps;*.bin;*.sh;*.class;*.java;*.war;*.cgi;*.jspx;",
            icons: "bmp,jpg,gif,png,doc,docx,ppt,pptx,xls,xlsx,txt,hwp,zip",
            locale: "ko",
            height: "96px",
            showProgress: true,
            showDblArea: true,
            showTitle: true,
            showUpload: true,
            files: [],
            maxCount: 0, //0 unlimit
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
                "           <div class=\"wupload-progressBar none\"><progress id=\"wuploadProgressBar\" value=\"0\" max=\"100\" /></div>" +
                "       </div>" +
                "   </div>" +
                "</div>",
            item: "<tr{{if className!=''}} class=\"${className}\"{{/if}}>" +
                "   <td><input type=\"checkbox\" class=\"wupload-check\"></td>" +
                "   <td>&nbsp;<img src=\"${path}${icon}\" /> ${name}</td>" +
                "   <td>${size}&nbsp;</td>" +
                "</tr>"
        },
        removeFiles: [],
        files: [],
        el: null
    }

    $.wupload.init = function ($target, options) {
        this.options = $.extend(true, {}, this.defaults, options);
        this.el = $target;
        this.options.locale = this.lang[this.options.locale] ? this.options.locale : "ko";

        $.tmpl($.wupload.tmpl.base,
            $.extend({
                maxSize: this.options.maxSizeMb,
                showTitle: this.options.showTitle ? "" : " wupload-none",
                showUpload1: this.options.showUpload ? "" : " close",
                showUpload2: this.options.showUpload ? "" : " wupload-none"
            }, this.lang[this.options.locale])
        ).appendTo($target);

        $.wupload.reset();

        if($.wupload.options.showDblArea){
            $(".wupload-contents tfoot", $target).on("dblclick", function(e){
                $(".wupload-header button[data-action='add']", $.wupload.el).click();
            });
        }else{
            $.wupload.shoWhideDblArea(false);
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

        $(".wupload-contents tbody, .wupload-contents tfoot", $target).css("height", this.options.height);
        $(".wupload-header button", $target).click(function () {
            const $t = $(this);
            switch ($t.attr("data-action")) {
                case "add":
                    $(".wupload-file", $.wupload.el).trigger('click');
                    break;
                case "del":
                    $.wupload.deleteFile();
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
            const files = Array.prototype.slice.call(e.target.files);
            $.each(files, function () {
                $.wupload.drawFile(this);
                /* 
                const reader = new FileReader();
                reader.readAsDataURL(this);
                reader.onload = $.proxy((e) => {
                    $.wupload.drawFile(this);
                }, this);
                */
            });
        });
    };

    $.wupload.drawFile = item => {
        const ext = getLastValue(item.name, ".").toLowerCase();
        if(!$.hasValue(ext) || $.hasString($.wupload.options.excludeExts, ext)){
            alert($.wupload.getLang("excludeExt"));
            return false;
        }

        if ($.wupload.isDuplicate(item.name, item.size)) {
            alert(item.name + $.wupload.getLang("registedFile"));
            return false;
        }

        if ($.wupload.options.maxCount != 0 && $.wupload.options.maxCount <= $.wupload.files.length) {
            alert($.wupload.options.maxCount + $.wupload.getLang("maxCount"));
            return false;
        }

        if ($.wupload.options.maxSizeMb != 0 && ($.wupload.options.maxSizeMb * 1024 * 1024) <= ($.wupload.getTsize() + item.size)) {
            alert($.wupload.options.maxSizeMb + $.wupload.getLang("maxSizeMb"));
            return false;
        }

        $.wupload.files.push(item);
        const $c = $(".wupload-contents table tbody", $.wupload.el),
            $tr = $.tmpl($.wupload.tmpl.item, {
                className: item.fileId?"registed":"",
                path: $.wupload.options.imagePath,
                icon: $.wupload.getExt(item.name),
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
            $.wupload.checkAll();
        }).appendTo($c);

        $.wupload.calFileInfo();
        $.wupload.toggleDblArea();
        return true;
    };

    $.wupload.calFileInfo = () => {
        const $c = $(".wupload-header .file-info", $.wupload.el);
        $c.find("span:eq(0)").html($.wupload.files.length);
        $c.find("span:eq(1)").html(formatFileSize($.wupload.getTsize()));
    };

    $.wupload.deleteFile = () => {
        const $c = $(".wupload-contents table tbody tr", $.wupload.el);
        let d = [],
            f = [];
        $c.each(function (index) {
            const $t = $(this);
            if ($t.hasClass("selected")) {
                $t.remove();
                d.push(index);
                if ($.wupload.files[index].fileId) {
                    $.wupload.removeFiles.push($.wupload.files[index]);
                }
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

        $.wupload.toggleDblArea();
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

    $.wupload.getExt = fileName => {
        const ext = getLastValue(fileName, ".").toLowerCase();
        return ($.hasString($.wupload.options.icons, ext) ? ext : "etc") + ".png";
    };

    $.wupload.getLang = (code) => $.wupload.lang[$.wupload.options.locale][code];

    $.wupload.checkAll = () => {
        const isCheckAll = $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked"),
            trCount = $(".wupload-contents tbody tr").length,
            checkedCount = $(".wupload-contents tbody tr .wupload-check:checked").length;
        if (trCount == checkedCount) {
            if (!isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked", true)
        } else {
            if (isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked", false)
        }
    };

    $.wupload.reset = () => {
        $(".wupload-contents table tbody", $.wupload.el).empty();
        $.wupload.files = [];

        if ($.wupload.options.files.length > 0) {
            $.each($.wupload.options.files, function () {
                $.wupload.drawFile(this);
            });
        } else {
            $.wupload.calFileInfo();
        }
    };

    $.wupload.toggleProgress = b => {
        if($.wupload.options.showProgress){
            if(b){
                $(".wupload-progressBar", $.wupload.el).removeClass("none");
            }else{
                $(".wupload-progressBar", $.wupload.el).addClass("none");
            }
        } 
    };

    $.wupload.toggleDblArea = () => {
        if($.wupload.options.showDblArea){
            $.wupload.shoWhideDblArea($(".wupload-contents table tbody", $.wupload.el).find("tr").length==0);
        } 
    };

    $.wupload.shoWhideDblArea = b => {
        const $t = $(".wupload-contents table tbody", $.wupload.el),
            $f = $(".wupload-contents table tfoot", $.wupload.el);
        if(b){
            if(!$t.hasClass("none")) $t.addClass("none");
            if($f.hasClass("none")) $f.removeClass("none");
        }else{
            if($t.hasClass("none")) $t.removeClass("none");
            if(!$f.hasClass("none")) $f.addClass("none");
        }
    };

    $.wupload.save = (opt = {}) => {
        let removeFileCount = $.wupload.removeFiles.length,
            ignoreFileCount = 0,
            saveFileCount = 0,
            formData = new FormData();

        if ($.wupload.files.length > 0) {
            for (let i = 0; i < $.wupload.files.length; i++) {
                if (!$.hasValue($.wupload.files[i].fileId)) {
                    formData.append("file" + (saveFileCount++), $.wupload.files[i]);
                } else {
                    ignoreFileCount++;
                }
            }
        }

        if ($.wupload.showLog) {
            console.log("removeFileCount==>" + removeFileCount);
            console.log("ignoreFileCount==>" + ignoreFileCount);
            console.log("saveFileCount==>" + saveFileCount);
        }

        if (removeFileCount == 0 && saveFileCount == 0) {
            if ($.isFunction(opt.success)) {
                opt.success({});
            }
            return;
        }

        let removeFileIds = [];
        for (let i = 0; i < $.wupload.removeFiles.length; i++) {
            removeFileIds.push($.wupload.removeFiles[i].fileId);
        }
        formData.append("removeFileIds", removeFileIds.join(","));

        if (opt.formData) {
            $.each(opt.formData, function (key, val) {
                formData.append(key, val);
            })
        }

        $.wupload.toggleProgress(true);
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
                if ($.isFunction(opt.success)) {
                    opt.success(result);
                } else {
                    alert("upload success");
                }
            },
            xhr: function() { //XMLHttpRequest 재정의 가능
                try{
                    if(!$.wupload.options.showProgress) return false;
                    const xhr = $.ajaxSettings.xhr();
                    xhr.upload.onprogress = function(e) { //progress 이벤트 리스너 추가
                        var percent = e.loaded * 100 / e.total;
                        //console.log("percent : " + percent + "%");
                        $("#wuploadProgressBar").val(percent);
                    };
                    return xhr;
                }catch(e){}
            },
            error: function () {
                if ($.isFunction(opt.error)) {
                    opt.error();
                } else {
                    alert("upload fail");
                }
            },
            complete : function () {
                $.wupload.toggleProgress(false);
            }
        });
    };

    $.fn.wupload = function (arg) {
        const args = Array.prototype.slice.call(arguments, 1),
            isMethod = (typeof arg === 'string');
        let result = null;

        if (!(this.length == 1 && this.prop("tagName").toLowerCase() == "div")) {
            return;
        }

        if (isMethod) {
            if (allowedMethod[arg]) {
                result = $.wupload[arg].apply(this, args);
            } else {
                $.alert("Method " + arg + " does not exist");
            }
        } else {
            $.wupload.init(this, arg || {});
        }
        return result !== null && result !== undefined ? result : this;
    };
})(jQuery);