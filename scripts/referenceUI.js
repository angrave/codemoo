// Generated by CoffeeScript 1.6.2
(function() {
  var referencePage, root, setUpJavaSandbox;

  root = typeof exports !== "undefined" && exports !== null ? exports : referencePage = {};

  /*
  Dictionary takes a string json reference in the form of a directory path and a container DOM element to create the dictionary in.  Example .json format is in the
  config directory named dictionary.json.  The dictionary function appends a div to its container that serves the dynamic information content depending on the
  dictionary item that is clicked in the list.
  */


  window.dictionary = function(text, cont) {
    var attache, delve, info, showChildren;

    info = document.createElement("div");
    $(info).css({
      "width": "100%",
      "height": "35%",
      "position": "absolute",
      "top": "65%",
      "border-top": "1px solid black"
    });
    $(cont).append(info);
    attache = function(k, d) {
      info.innerHTML = d;
    };
    showChildren = function(nde) {
      if ($(nde).children("img").attr("src") === "img/listarrow1.png") {
        $(nde).children("img").attr({
          "src": "img/listarrow2.png"
        });
        return $(nde).children("div").css({
          "display": "block"
        });
      } else {
        $(nde).children("img").attr({
          "src": "img/listarrow1.png"
        });
        return $(nde).children("div").css({
          "display": "none"
        });
      }
    };
    delve = function(tmp, tcont) {
      var ar, data, data1, key, key1, npa;

      for (key in tmp) {
        data = tmp[key];
        if (typeof data === "string") {
          $(tcont).click((function(k, d) {
            attache(k, d);
            return false;
          }).bind(null, key, data));
        } else {
          npa = document.createElement("div");
          ar = document.createElement("img");
          $(ar).attr({
            "src": "img/listarrow1.png"
          });
          $(ar).css({
            "position": "relative",
            "left": "0",
            "top": "0"
          });
          $(npa).css({
            "margin": "4px 0 0 20px"
          });
          if (tcont !== cont) {
            $(npa).css({
              "display": "none"
            });
          } else {
            $(npa).css({
              "margin-left": "0"
            });
          }
          npa.innerHTML = key;
          $(tcont).append(npa);
          for (key1 in data) {
            data1 = data[key1];
            if (typeof data1 !== "string") {
              $(npa).prepend(ar);
              $(npa).click((function(n) {
                showChildren(n);
                return false;
              }).bind(null, npa));
              break;
            }
          }
          delve(data, npa);
        }
      }
    };
    return $.getJSON(text, function(data) {
      return delve(data, cont);
    });
  };

  /*
  InitFloat builds the floating div and appropriates its space for the java virtual console and the dictionary.  It also attaches several enlargement functions
  that allow each appropriate div to fullscreen and then shrink back
  */


  window.InitFloat = function() {
    var backFade, clClick, clHover, cllvHover, closeClick, dictionary, en1, en2, en3, enClick, enHover, input, lvHover, output, refContainer;

    backFade = document.createElement("div");
    refContainer = document.createElement("div");
    $(backFade).css({
      width: '100%',
      height: '100%',
      position: 'absolute',
      'z-index': '300',
      'background-color': '#000000',
      'opacity': '.5'
    });
    $(refContainer).css({
      width: '90%',
      height: '90%',
      left: '5%',
      top: '5%',
      position: 'absolute',
      'z-index': '301',
      'background-color': '#FFFFFF'
    });
    $("body").prepend(backFade);
    $(backFade).attr({
      id: 'bF'
    });
    $("body").prepend(refContainer);
    dictionary = document.createElement("div");
    input = document.createElement("div");
    output = document.createElement("div");
    $(dictionary).css({
      width: '35%',
      height: '90%',
      position: 'absolute',
      left: '5%',
      top: '5%',
      bottom: '80%',
      'border': '1px solid black'
    });
    $(input).css({
      width: '50%',
      height: '40%',
      position: 'absolute',
      right: '5%',
      top: '5%',
      'border': '1px solid black'
    });
    $(output).css({
      width: '50%',
      height: '45%',
      position: 'absolute',
      right: '5%',
      top: '50%',
      'border': '1px solid black',
      "overflow": "auto"
    });
    $(refContainer).prepend(dictionary);
    $(refContainer).prepend(input);
    $(refContainer).prepend(output);
    en1 = document.createElement("img");
    en2 = document.createElement("img");
    en3 = document.createElement("img");
    $(en1).attr({
      'src': 'img/enlarge1.png',
      "class": 'en'
    });
    $(en2).attr({
      'src': 'img/enlarge1.png',
      "class": 'en'
    });
    $(en3).attr({
      'src': 'img/enlarge1.png',
      "class": 'en'
    });
    $(en1).css({
      position: 'absolute',
      right: '4px',
      top: '4px',
      "z-index": "320"
    });
    $(en2).css({
      position: 'absolute',
      right: '4px',
      top: '4px',
      "z-index": "320"
    });
    $(en3).css({
      position: 'absolute',
      right: '4px',
      top: '4px',
      "z-index": "320"
    });
    $(dictionary).append(en1);
    $(input).append(en2);
    $(output).append(en3);
    enHover = function() {
      return this.src = 'img/enlarge2.png';
    };
    lvHover = function() {
      return this.src = 'img/enlarge1.png';
    };
    enClick = function() {
      $(this).unbind();
      $(this).parent().stop();
      $(this).parent().siblings().stop();
      this.src = 'img/shrink1.png';
      $(this).parent().animate({
        width: '90%',
        height: '90%',
        top: '5%'
      });
      $(this).parent().siblings().animate({
        width: '0%',
        height: '0%',
        opacity: '0'
      });
      $(".en").hover(clHover, cllvHover);
      return $(".en").click(clClick);
    };
    closeClick = function() {
      $(backFade).remove();
      $(refContainer).remove();
      return codeland.doppioAPI.abort();
    };
    clClick = function() {
      $(this).unbind();
      $(dictionary).stop();
      $(input).stop();
      $(output).stop();
      $(dictionary).animate({
        width: '35%',
        height: '90%',
        opacity: '1'
      });
      $(input).animate({
        width: '50%',
        height: '40%',
        opacity: '1'
      });
      $(output).animate({
        width: '50%',
        height: '40%',
        opacity: '1',
        top: '50%'
      });
      $(".en").hover(enHover, lvHover);
      return $(".en").click(enClick);
    };
    clHover = function() {
      return this.src = 'img/shrink2.png';
    };
    cllvHover = function() {
      return this.src = 'img/shrink1.png';
    };
    $(".en").hover(enHover, lvHover);
    $(".en").click(enClick);
    $("#bF").click(closeClick);
    window.dictionary("config/dictionary.json", dictionary);
    setUpJavaSandbox(input, output);
  };

  setUpJavaSandbox = function(input, output) {
    /*
        Sets up the code editor and the doppio api for running Java code.
    */

    var abort, log, msg, run, sandBoxEditor, stdout, textOutput;

    input = $(input);
    output = $(output);
    textOutput = $('<div></div>');
    output.append(textOutput.get(0));
    textOutput.css("white-space", "pre-line");
    input.append('<div id="javasandboxsource"></div>');
    sandBoxEditor = new PlayerCodeEditor('javasandboxsource', null, 'for (int i = 0; i < 5; i++) {\n System.out.println("Hello");\n}', false, "", "", true);
    msg = "";
    stdout = function(str) {
      msg += str;
      textOutput.text(msg);
    };
    log = console.log;
    codeland.doppioAPI.setOutputFunctions(stdout, log);
    run = jQuery('<img>', {
      id: 'runCode',
      src: '/img/freeware/button_play_green-48px.png',
      css: {
        'max-height': '19%',
        'display': 'block'
      },
      alt: 'Run Button',
      title: 'Run the program',
      click: function(e) {
        var finished_cb;

        textOutput.text('Running...');
        jQuery('#runCode').hide(2000, function() {
          return jQuery('#abortCode').show();
        });
        msg = '';
        finished_cb = function() {
          return jQuery('#abortCode').hide(500, function() {
            return jQuery('#runCode').show();
          });
        };
        codeland.doppioAPI.run(sandBoxEditor.getStudentCode(), null, finished_cb);
        e.preventDefault();
      }
    });
    abort = jQuery('<img>', {
      id: 'abortCode',
      src: '/img/freeware/button_stop_red-48px.png',
      css: {
        'max-height': '19%',
        'display': 'block'
      },
      alt: 'Abort Button',
      title: 'Stop the currently running program',
      click: function(e) {
        var aborted;

        aborted = function() {
          stdout("Stopped");
          jQuery('#runCode').show();
          return jQuery('#abortCode').hide();
        };
        codeland.doppioAPI.abort(aborted);
        e.preventDefault();
      }
    });
    abort.hide();
    input.append(run.get(0));
    input.append(abort.get(0));
  };

  window.AboutPage = function() {
    var backFade, closeClick, header, para, refContainer;

    closeClick = function() {
      $(backFade).remove();
      return $(refContainer).remove();
    };
    backFade = document.createElement("div");
    refContainer = document.createElement("div");
    $(backFade).css({
      width: '100%',
      height: '100%',
      position: 'absolute',
      'z-index': '300',
      'background-color': '#000000',
      'opacity': '.5'
    });
    $(refContainer).css({
      width: '40%',
      height: '40%',
      left: '30%',
      top: '30%',
      position: 'absolute',
      'z-index': '301',
      'background-color': '#FFFFFF'
    });
    $("body").prepend(backFade);
    $(backFade).attr({
      id: 'bF'
    });
    $("body").prepend(refContainer);
    header = document.createElement("div");
    para = document.createElement("div");
    $(header).css({
      "font-size": "26px",
      "position": "absolute",
      "width": "50%",
      "top": "5%",
      "left": "25%",
      "text-align": "center"
    });
    $(para).css({
      "font-size": "14px",
      "position": "absolute",
      "width": "90%",
      "bottom": "12%",
      "left": "5%",
      "text-align": "center"
    });
    header.innerHTML = "Legal Terms and Attributions";
    para.innerHTML = "Copyright 2013 The Board of Trustees at the University of Illinois<br />Creative Commons Licenses from openclipart.org are    licensed under <a href='http://creativecommons.org/publicdomain/zero/1.0/''>the creative commons 0 license</a>    (Spiral Bound book, star icon, cow eat grass, treasure map)<br />    <a href='https://github.com/int3/doppio/blob/master/LICENSE'>Doppio Java Virtual Machine</a><br />Original Content is licensed under MIT Expat License    <br />Creative Commons Licenses from findicons.com are licensed under <a href='http://creativecommons.org/licenses/by-nd/2.5/'>Creative Commons Attributions no Derivatives</a>";
    $(refContainer).append(header);
    $(refContainer).append(para);
    return $("#bF").click(closeClick);
  };

}).call(this);
