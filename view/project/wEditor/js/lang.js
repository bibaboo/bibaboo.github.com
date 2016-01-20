
var WCEditorLang;

var WCEditorLocale = iKEPLang.datepicker.langCode;


if(WCEditorLocale == "jp"){
    
    WCEditorLang = {
    
        "baseConfig" : { "fontFamily" : "ms p明朝, ms pmincho, serif",
                         "fontSize"   : "14px"
        },
    
        "buttonTitle" : { "fontname"              : "フォント",
                          "fontsize"              : "文字サイズ",
                          "copy"                  : "コピ-",
                          "redo"                  : "再実行",
                          "undo"                  : "元に戻す",
                          "cut"                   : "切り取り",
                          "paste"                 : "貼り付け",
                          "newpage"               : "新規作成",
                          "previewer"             : "プレビュー",
                          "print"                 : "印刷する",
                          "forecolor"             : "テキストの色",
                          "backcolor"             : "背景の色",
                          "bold"                  : "太字(Crtl+B}",
                          "italic"                : "斜体(Crtl+I}",
                          "underline"             : "下線(Crtl+U}",
                          "strikethrough"         : "取り消し線",
                          "table"                 : "テーブル",
                          "fieldset"              : "フィルドセット",
                          "hr"                    : "下線",
                          "justifyleft"       	  : "左揃え",
                          "justifycenter"         : "中央揃え",
                          "justifyright"          : "右揃え",
                          "justifyfull"           : "両端揃え",
                          "insertorderedlist"     : "段落番号",
                          "insertunorderedlist"   : "箇条書き",
                          "indent"                : "インデント",
                          "outdent"               : "インデント解除",
                          "emoticon"              : "emoticon",
                          "character"             : "特殊文字",
                          "link"                  : "リンクの作成",
                          "urlimage"              : "画像リンク",
                          "image"                 : "画像"
        },
        
        "iframeResize" : { "fontname" : {"width" : "180px", "height" : "255px"},
                           "fontsize" : {"width" : "280px", "height" : "165px"}
        },
        
        "iframeMiniResize" : { "fontname" : {"width" : "200px", "height" : "141px"},
                               "fontsize" : {"width" : "220px", "height" : "78px"},
                               "table"    : {"width" : "200px", "height" : "133px"},
                               "emoticon" : {"width" : "200px", "height" : "133px"},
                               "character" : {"width" : "260px", "height" : "133px"},
                               "forecolor" : {"width" : "160px", "height" : "148px"},
                               "backcolor" : {"width" : "160px", "height" : "148px"},
                               "hr" : {"width" : "160px", "height" : "148px"}
        },
    
        "message" : { "confirmChangeTextMode" : "テキストモードに転換すれば作成された内容は保持されますが、,\n\nフォントなどの編集効果と画像などの添付内容すべてなくなります。 \n\n転換しますか?",
                      "newpage" : "新しく作成しますか?",
                      "invalidUrl" : "URL情報が正しくありません。",
                      "selectImage" : "画像を選択してください。",
                      "tableRowSpan" : "テーブル行",
                      "tableColSpan" : "テーブル列",
                      "tableBorderSpan" : "境界線の太さ",
                      "tableBorderColorSpan" : "境界線の色",
                      "tableBgcolorSpan" : "表の背景色",
                      "applyButton" : "適用",
                      "newWindowSpan" : "新しいウィンドウ",
                      "height" : "高さ",
                      "align" : "ソート",
                      "left" : "左",
                      "center" : "中央",
                      "right" : "右"
        },
        
        "font" : { "name": [ {"value" : "ms p明朝, ms pmincho, serif",                    "text" : "MS P明朝 <span>(あいうえお)</span>"},
                             {"value" : "ms ゴシック, ms gothic, monospace, sans-serif",  "text" : "MS ゴシック <span>(あいうえお)</span>"},
                             {"value" : "ms 明朝, ms mincho, serif",                      "text" : "MS 明朝 <span>(あいうえお)</span>"},
                             {"value" : "arial, helvetica, sans-serif",                   "text" : "Arial <span>(abcde)</span>"},
                             {"value" : "bookman old style, new york, times, serif",      "text" : "Bookman Old Style <span>(abcde)</span>"},
                             {"value" : "comic sans ms",                                  "text" : "Comic Sans MS <span>(abcde)</span>"},
                             {"value" : "courier, monaco, monospace, sans-serif",         "text" : "Courier <span>(abcde)</span>"},
                             {"value" : "garamond, new york, times, serif",               "text" : "Garamond <span>(abcde)</span>"},
                             {"value" : "lucida console, sans-serif",                     "text" : "Lucida Console <span>(abcde)</span>"},
                             {"value" : "times new roman, new york, times, serif",        "text" : "Times New Roman<span>(abcde)</span>"},
                             {"value" : "verdana, helvetica, sans-serif",                 "text" : "verdana <span>(abcde)</span>"}
                            ],
        
                   "size" : [ {"value" : "10px",  "text" : "あいうえお(10px)"},
                              {"value" : "12px",  "text" : "あいうえお(12px)"},
                              {"value" : "14px",  "text" : "あいうえお(14px)"},
                              {"value" : "18px",  "text" : "あいうえお(18px)"},
                              {"value" : "24px",  "text" : "あいうえお(24px)"},
                              {"value" : "36px",  "text" : "あいうえ(36px)"}
                            ],
        
                    "color" : { "text" : "あいうえお",
                                "value" : ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
                              }
        },
        
        "charcter"  : { "base" : { "apply" : ["0", "1", "4"],
                                   "char" : ["一般記号", "数字と単位", "円,括弧", "ハングル文字", "ギリシャ,ラテン語", "日本語"]
                        },
                        "mini" : { "apply" : ["0", "1", "2"],
                                   "char" : ["記号1", "記号2", "記号3", "円", "括弧"]
                        }
        },
        
        "tableConfig" : ["上に行を挿入", "下に行を挿入", "左に列を挿入", "右に列を挿入", "現在の行を削除", "現在の列を削除", "右のセルと結合", "下のセルと結合", "セル結合を解除"]
    }
   
} else if (WCEditorLocale == "ko"){
	
    WCEditorLang = {

        "baseConfig" : { "fontFamily" : "돋움, dotum",
                         "fontSize"   : "9pt"
        },
    
        "buttonTitle" : { "fontname"              : "글꼴",
                          "fontsize"              : "글자크기",
                          "copy"                  : "복사하기",
                          "redo"                  : "다시실행",
                          "undo"                  : "되돌리기",
                          "cut"                   : "잘라내기",
                          "paste"                 : "붙여넣기",
                          "newpage"               : "새로열기",
                          "previewer"             : "미리보기",
                          "print"                 : "인쇄하기",
                          "forecolor"             : "글자색상",
                          "backcolor"             : "배경색상",
                          "bold"                  : "굵게(Crtl+B}",
                          "italic"                : "기울림꼴(Crtl+I}",
                          "underline"             : "글자밑줄(Crtl+U}",
                          "strikethrough"         : "취소선",
                          "table"                 : "테이블",
                          "fieldset"              : "필드셋",
                          "hr"                    : "밑줄",
                          "justifyleft"       	  : "왼쪽맞춤",
                          "justifycenter"         : "가운데맞춤",
                          "justifyright"          : "오른쪽맞츰",
                          "justifyfull"           : "전체맞춤",
                          "insertorderedlist"     : "번호매기기",
                          "insertunorderedlist"   : "글머리기호",
                          "indent"                : "들여쓰기",
                          "outdent"               : "내어쓰기",
                          "emoticon"              : "이모티콘",
                          "character"             : "특수문자",
                          "link"                  : "링크만들기",
                          "urlimage"              : "이미지링크",
                          "image"                 : "이미지"
        },
        
        "iframeResize" : {
        },
        
        "iframeMiniResize" : { "fontname" : {"width" : "120px", "height" : "141px"},
                               "fontsize" : {"width" : "240px", "height" : "130px"},
                               "table"    : {"width" : "200px", "height" : "133px"},
                               "emoticon" : {"width" : "200px", "height" : "133px"},
                               "character" : {"width" : "260px", "height" : "133px"},
                               "forecolor" : {"width" : "160px", "height" : "148px"},
                               "backcolor" : {"width" : "160px", "height" : "148px"},
                               "hr" : {"width" : "160px", "height" : "148px"}
        },
    
        "message" : { "confirmChangeTextMode" : "텍스트 모드로 전환하면 작성된 내용은 유지되나,\n\n글꼴 등의 편집효과와 이미지 등의 첨부내용이 모두 사라지게 됩니다.\n\n전환하시겠습니까?",
                      "newpage" : "새로 작성 하시겠습니까?",
                      "invalidUrl" : "URL정보가 올바르지 않습니다",
                      "selectImage" : "이미지를 선택해주세요",
                      "tableRowSpan" : "테이블 행",
                      "tableColSpan" : "테이블 열",
                      "tableBorderSpan" : "테두리 두께",
                      "tableBorderColorSpan" : "테두리 색",
                      "tableBgcolorSpan" : "표 배경색",
                      "applyButton" : "적용",
                      "newWindowSpan" : "새창",
                      "height" : "높이",
                      "align" : "정렬",
                      "left" : "왼쪽",
                      "center" : "가운데",
                      "right" : "오른쪽"
        },
        
        "font" : { "name": [ {"value" : "돋움, dotum",       "text" : "돋움 <span>(가나다라)</span>"},
                             {"value" : "돋움체, dotumche",  "text" : "돋움체 <span>(가나다라)</span>"},
                             {"value" : "굴림, gulim",       "text" : "굴림 <span>(가나다라)</span>"},
                             {"value" : "굴림체, gulimche",  "text" : "굴림체 <span>(가나다라)</span>"},
                             {"value" : "바탕, batang",      "text" : "바탕 <span>(가나다라)</span>"},
                             {"value" : "바탕체, batangche", "text" : "바탕체 <span>(가나다라)</span>"},
                             {"value" : "궁서, gungsuh",     "text" : "궁서 <span>(가나다라)</span>"},
                             {"value" : "arial",             "text" : "Arial <span>(abcde)</span>"},
                             {"value" : "tahoma",            "text" : "Tahoma <span>(abcde)</span>"},
                             {"value" : "times new roman",   "text" : "Times New Roman <span>(abcde)</span>"},
                             {"value" : "verdana",           "text" : "verdana <span>(abcde)</span>"}
                            ],
        
                   "size" : [ {"value" : "7pt",   "text" : "가나다라마(7pt)"},
                              {"value" : "8pt",   "text" : "가나다라마(8pt)"},
                              {"value" : "9pt",   "text" : "가나다라마(9pt)"},
                              {"value" : "10pt",  "text" : "가나다라마(10pt)"},
                              {"value" : "11pt",  "text" : "가나다라마(11pt)"},
                              {"value" : "12pt",  "text" : "가나다라마(12pt)"},
                              {"value" : "14pt",  "text" : "가나다라마(14pt)"},
                              {"value" : "18pt",  "text" : "가나다라마(18pt)"},
                              {"value" : "24pt",  "text" : "가나다라(24pt)"},
                              {"value" : "36pt",  "text" : "가나다(36pt)"}
                            ],
        
                    "color" : { "text"  : "가나다라마바",
                                "value" : ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
                              },
        },
        
        "charcter"  : { "base" : { "apply" : ["0", "1", "2", "3", "4", "5"],
                                   "char" : ["일반기호", "숫자와 단위", "원,괄호", "한글", "그리스,라틴어", "일본어"]
                        },
                        "mini" : { "apply" : ["0", "1", "2", "3", "4"],
                                   "char" : ["기호1", "기호2", "기호3", "원", "괄호"]
                        }
        },
        
        "tableConfig" : ["윗쪽에 행삽입", "아래쪽에 행삽입", "왼쪽에 열삽입", "오른쪽에 열삽입", "현재행 삭제", "현재열 삭제", "오른쪽셀과 병합", "아래쪽셀과 병합", "셀 병합 취소"]
    }
   
    
}    else {
	
	WCEditorLang = {

	        "baseConfig" : { "fontFamily" : "arial,helvetica,sans-serif",
	                         "fontSize"   : "9pt"
	        },
	    
	        "buttonTitle" : { "fontname"         : "fontname",
			                "fontsize"              : "fontsize",
			                "copy"                  : "copy",
			                "redo"                  : "redo",
			                "undo"                  : "undo",
			                "cut"                   : "cut",
			                "paste"                 : "paste",
			                "newpage"               : "newpage",
			                "previewer"             : "previewer",
			                "print"                 : "print",
			                "forecolor"             : "forecolor",
			                "backcolor"             : "backcolor",
			                "bold"                  : "bold",
			                "italic"                : "italic",
			                "underline"             : "underline",
			                "strikethrough"         : "strikethrough",
			                "table"                 : "table",
			                "fieldset"              : "fieldset",
			                "hr"                    : "hr",
			                "justifyleft"       	: "justifyleft",
			                "justifycenter"         : "justifycenter",
			                "justifyright"          : "justifyright",
			                "justifyfull"           : "justifyfull",
			                "insertorderedlist"     : "insertorderedlist",
			                "insertunorderedlist"   : "insertunorderedlist",
			                "indent"                : "indent",
			                "outdent"               : "outdent",
			                "emoticon"              : "emoticon",
			                "character"             : "character",
			                "link"                  : "link",
			                "urlimage"              : "urlimage",
			                "image"                 : "image"
	        },
	        
	        "iframeResize" : {
	        },
	        
	        "iframeMiniResize" : { "fontname" : {"width" : "120px", "height" : "141px"},
	                               "fontsize" : {"width" : "240px", "height" : "130px"},
	                               "table"    : {"width" : "200px", "height" : "133px"},
	                               "emoticon" : {"width" : "200px", "height" : "133px"},
	                               "character" : {"width" : "260px", "height" : "133px"},
	                               "forecolor" : {"width" : "160px", "height" : "148px"},
	                               "backcolor" : {"width" : "160px", "height" : "148px"},
	                               "hr" : {"width" : "160px", "height" : "148px"}
	        },
	    
	        "message" : { "confirmChangeTextMode" : "If you change the mode to text mode, the contents will remain, but the styles such as font and, images will be erased. Are you sure to continue?",
	                      "newpage" : "Will you create a new page?",
	                      "invalidUrl" : "Invalid URL address",
	                      "selectImage" : "Select an image",
	                      "tableRowSpan" : "Table row",
	                      "tableColSpan" : "Table column",
	                      "tableBorderSpan" : "Table border boldness",
	                      "tableBorderColorSpan" : "border color",
	                      "tableBgcolorSpan" : "Table background color",
	                      "applyButton" : "Apply",
	                      "newWindowSpan" : "New window",
	                      "height" : "Height",
	                      "align" : "Align",
	                      "left" : "Left",
	                      "center" : "Center",
	                      "right" : "Right"
	        },
	        
	        "font" : { "name": [ {"value" : "arial,helvetica,sans-serif",       "text" : "Arial <span>(ABCDE)</span>"},
	                             {"value" : "comic sans ms,cursive",  "text" : "Comic Sans MS <span>(ABCDE)</span>"},
	                             {"value" : "courier new,courier,monospace",       "text" : "Courier New <span>(ABCDE)</span>"},
	                             {"value" : "georgia,serif",  "text" : "Georgia <span>(ABCDE)</span>"},
	                             {"value" : "lucida sans unicode,lucida grande,sans-serif",      "text" : "Lucida Sans <span>(ABCDE)</span>"},
	                             {"value" : "tahoma,geneva,sans-serif", "text" : "Tahoma <span>(ABCDE)</span>"},
	                             {"value" : "times new roman,times,serif",     "text" : "Times New Roman <span>(ABCDE)</span>"},
	                             {"value" : "trebuchet ms,helvetica,sans-serif",             "text" : "Trebuchet MS <span>(ABCDE)</span>"},
	                             {"value" : "verdana,geneva,sans-serif",            "text" : "Verdana <span>(ABCDE)</span>"}
	                            ],
	        
	                   "size" : [ {"value" : "7pt",   "text" : "ABCDEF(7pt)"},
	                              {"value" : "8pt",   "text" : "ABCDEF(8pt)"},
	                              {"value" : "9pt",   "text" : "ABCDEF(9pt)"},
	                              {"value" : "10pt",  "text" : "ABCDEF(10pt)"},
	                              {"value" : "11pt",  "text" : "ABCDEF(11pt)"},
	                              {"value" : "12pt",  "text" : "ABCDEF(12pt)"},
	                              {"value" : "14pt",  "text" : "ABCDEF(14pt)"},
	                              {"value" : "18pt",  "text" : "ABCDEF(18pt)"},
	                              {"value" : "24pt",  "text" : "ABCDEF(24pt)"},
	                              {"value" : "36pt",  "text" : "ABC(36pt)"}
	                            ],
	        
	                    "color" : { "text"  : "ABCDEF",
	                                "value" : ["#000000", "#ff3300", "#ff0099", "#ff6600", "#cc00ff", "#cc9900", "#0000ff", "#33cc00", "#0099ff", "#009999"]
	                              },
	        },
	        
	        "charcter"  : { "base" : { "apply" : ["0", "1", "2", "3"],
	                                   "char" : ["Symbols", "Digits&Units", "Greek,Latin", "Japanese"]
	                        },
	                        "mini" : { "apply" : ["0", "1", "2"],
	                                   "char" : ["Symbol1", "Symbol2", "Symbol3"]
	                        }
	        },
	        
	        "tableConfig" : ["Insert row before", "Insert row after", "Insert column left", "Insert column right", "Delete current row", "Delete current column", "Merge right", "Merge down", "Cancel merge"]
	    }
}