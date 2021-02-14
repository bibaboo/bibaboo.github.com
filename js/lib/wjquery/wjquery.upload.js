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
            height: "96px",
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
                "    <div class=\"wupload-header\">" +
                "    <form method=\"post\" enctype=\"multipart/form-data\" id=\"wuploadForm\">" +
                "        <input type=\"file\" name=\"files\" id=\"wuploadFile\" class=\"wupload-file\" multiple/>" +
                "        <button type=\"button\" data-action=\"add\">${add}</button>" +
                "        <button type=\"button\" data-action=\"del\">${del}</button>" +
                "        <div class=\"file-info\"><span>0</span> ${fileInfo} : <span>0MB</span> / 20MB</div>" +
                "    </form>" +
                "    </div>" +
                "    <div class=\"wupload-contents\">" +
                "        <table summary=\"file list table\">" +
                "            <thead>" +
                "                <tr>" +
                "                    <th><input type=\"checkbox\" class=\"wupload-checkAll\"></th>" +
                "                    <th>${fileName}</th>" +
                "                    <th>${fileSize}</th>" +
                "                </tr>" +
                "            </thead>" +
                "            <tbody>" +
                "            </tbody>" +
                "        </table>" +
                "    </div>" +
                "</div>",
            item: "<tr>" +
                "   <td><input type=\"checkbox\" class=\"wupload-check\"></td>" +
                "   <td>&nbsp;<img src=\"../images/file/${icon}\" /> ${name}</td>" +
                "   <td>${size}&nbsp;</td>" +
                "</tr>"
        },
        files: [],
        el: null
    }

    $.wupload.init = function ($target, options) {
        this.options = $.extend(true, {}, this.defaults, options);
        this.el = $target;
        this.options.locale = this.lang[this.options.locale] ? this.options.locale : "ko";

        $.tmpl($.wupload.tmpl.base, this.lang[this.options.locale]).appendTo($target);
        $(".wupload-contents tbody", $target).css("height", this.options.height);
        $(".wupload-header button", $target).click(function () {
            const $t = $(this);
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

        $(".wupload-contents .wupload-checkAll", $target).click(function () {
            if($(this).prop("checked")){
                $(".wupload-contents .wupload-check").prop("checked", true);
                $(".wupload-contents tbody tr").addClass("selected");
            }else{
                $(".wupload-contents .wupload-check").prop("checked", false);
                $(".wupload-contents tbody tr").removeClass("selected");
            }
        });

        $("#wuploadFile", $target).change(function (e) {
            //$.wupload.files = [];
            const $c = $(".wupload-contents table tbody", $target),
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
                const reader = new FileReader();
                reader.onload = $.proxy((e) => {
                    const $tr = $.tmpl($.wupload.tmpl.item, {
                        icon: getFileIcon(this.name),
                        name: this.name,
                        size: formatFileSize(this.size)
                    });

                    $tr.click(function () {
                        if($tr.hasClass("selected")){
                            $(this).removeClass("selected");
                            $(this).find(".wupload-check").prop("checked", false);
                        }else{
                            $(this).addClass("selected");
                            $(this).find(".wupload-check").prop("checked", true);
                        }
                        $.wupload.checkAll();
                    }).appendTo($c);
                }, this);
                reader.readAsDataURL(this);
            });
            //$(this).val("");
            $.wupload.calFileInfo();
        });
    };

    $.wupload.calFileInfo = () => {
        const $c = $(".wupload-header .file-info", $.wupload.el);
        $c.find("span:eq(0)").html($.wupload.files.length);
        $c.find("span:eq(1)").html(formatFileSize($.wupload.getTsize()));
    };

    $.wupload.deleteFile = () => {
        const $c = $(".wupload-contents table tbody tr", $.wupload.el);
        let d = [], f = [];
        $c.each(function (index) {
            const $t = $(this);
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

    $.wupload.checkAll = () => {
        const isCheckAll = $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked"),
            trCount = $(".wupload-contents tbody tr").length,
            checkedCount = $(".wupload-contents tbody tr .wupload-check:checked").length;
        if(trCount==checkedCount){
            if(!isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked", true)
        }else{
            if(isCheckAll) $(".wupload-contents .wupload-checkAll", $.wupload.el).prop("checked", false)
        }
    };

    $.wupload.reset = () => {
        $(".wupload-contents table tbody", $.wupload.el).empty();
        $.wupload.files = [];
        $.wupload.calFileInfo();
    };

    $.wupload.save = (opt={}) => {
        if($.wupload.files.length==0){
            if($.isFunction(opt.success)){
                opt.success();
            }
            return;
        }

        let formData = new FormData();
        //formData.append("files", $.wupload.files);
        //formData.append("files", $("#wuploadFile")[0].files[0]);
        for(var i=0; i<$.wupload.files.length; i++){
            formData.append("file" + i, $.wupload.files[i]);
        }

        if(opt.formData){
            $.each(opt.formData, function(key, val){
                formData.append(key, val);
            })
        }

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: opt.url,
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: opt.timeout||600000,
            success: function (result) {
                if($.isFunction(opt.success)){
                    opt.success(result);
                }else{
                    alert("upload success");
                }
            },
            error: function () {
                if($.isFunction(opt.error)){
                    opt.error();
                }else{
                    alert("upload fail");
                }
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
            if ($.wupload[arg]) {
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