document.addEventListener("DOMContentLoaded", function () {
    "use strict";
  
    const PDT_NAME = "HONOR Magic7 Lite";
  
    const HTML = document.documentElement,
      MAIN = document.body.querySelector("main");
  
    let screenWidth = HTML.clientWidth,
      screenHeight = HTML.clientHeight,
      isMob =
        window.matchMedia("(max-aspect-ratio: 660/758)").matches &&
        screenWidth < 1026,
      navHeight = 52,
      scrubTime = isMob ? 0.5 : 0.7,
      touchMoving = false;
  
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  
    const Support = (function () {
      const UA = navigator.userAgent.toLowerCase(),
        isUC = UA.indexOf('ucbrowser') !== -1,
        isWeChat = UA.indexOf('micromessenger') !== -1,
        isIOS = UA.indexOf('safari') !== -1 && UA.indexOf('chrome') < 1 && UA.indexOf('android') < 1,
        isNatural = UA.indexOf('huaweibrowser') !== -1,
        isChrome = UA.indexOf('chrome') !== -1,
        isFirefox = UA.indexOf('firefox') !== -1,
        isHonor = UA.indexOf('honorbrowser') !== -1,
        isBaidu = UA.indexOf('baidu') !== -1;
        
  
      return {
        inlineVideo: !(isUC || isWeChat || isHonor || isBaidu),
        isUC: isUC,
        isWeChat: isWeChat,
        isIOS: isIOS,
        isNatural: isNatural,
        isChrome: isChrome,
        isFirefox: isFirefox,
      };
    })();
  
    const Common = (function () {
      gsap.config({
        nullTargetWarn: false,
      });
  
      gsap.defaults({
        duration: 1,
      });
  
      function unUseHandle() {
        let doms;
        if (isMob) doms = MAIN.querySelectorAll(".pc-show");
        else doms = MAIN.querySelectorAll(".mob-show");
        doms.forEach(function (dom) {
          dom.remove();
        });
      }
  
      function browserHandle() {
        if (Support.isUC) MAIN.classList.add("is-uc");
        if (Support.isWeChat) MAIN.classList.add("is-wechat");
        if (Support.isIOS) MAIN.classList.add("is-ios");
        if (Support.isNatural) MAIN.classList.add("is-natural");
        if (Support.isFirefox) MAIN.classList.add("is-firefox");
        if (Support.isChrome) MAIN.classList.add("is-chrome");
      }
  
      function buyButtonHrefHandle() {
  
        let
  
          kvBuyBtn = MAIN.querySelector('.kvBuyBtn'),
  
          navBuyBtn = screenWidth < 841
  
            ? document.querySelector('.btn-buy-mob') || document.querySelector('.btn-buy')
  
            : document.querySelector('.btn-buy-pc') || document.querySelector('.btn-buy'),
  
          navBuyBtnTag = navBuyBtn?.tagName.toLowerCase(),
  
          style = navBuyBtn
  
            ? window.getComputedStyle(navBuyBtn)
  
            : null,
  
          timeout = null;
  
  
  
        if (!kvBuyBtn) return;
  
        if (!navBuyBtn) return kvBuyBtn.style.display = 'none';
  
  
  
        function initKvBuyBtn() {
  
          kvBuyBtn.style.display = 'inline-block';
  
          kvBuyBtn.style.opacity = '0';
  
          if (style?.display == 'none') kvBuyBtn.style.display = 'none';
  
  
  
          if (navBuyBtnTag == 'a') {
  
            let
  
              name = navBuyBtn.innerHTML,
  
              href = navBuyBtn.getAttribute('href'),
  
              target = navBuyBtn.getAttribute('target');
  
  
  
            kvBuyBtn.innerHTML = name;
  
            kvBuyBtn.setAttribute('href', href);
  
            kvBuyBtn.setAttribute('target', target);
  
  
  
            timeout = setTimeout(function () {
  
              kvBuyBtn.style.opacity = '1';
  
              clearTimeout(timeout);
  
              timeout = null;
  
            }, 300)
  
            return false;
  
          } else {
  
            let name = navBuyBtn.innerHTML;
  
  
  
            kvBuyBtn.innerHTML = name;
  
            kvBuyBtn.setAttribute('href', 'javascript:void(0)');
  
  
  
            timeout = setTimeout(function () {
  
              kvBuyBtn.style.opacity = '1';
  
              clearTimeout(timeout);
  
              timeout = null;
  
            }, 300)
  
            return true;
  
          }
  
        }
  
  
  
        let observer = new MutationObserver(function (mutations) {
  
          mutations.forEach(function (mutationRecord) {
  
            if (timeout) clearTimeout(timeout), timeout = null;
  
            if (style?.display == 'none') kvBuyBtn.style.display = 'none';
  
            else return initKvBuyBtn();
  
          });
  
        });
  
        const config = { attributes: true };
  
        observer.observe(navBuyBtn, config);
  
  
  
        return initKvBuyBtn();
  
      }
  
      function removeClassesStartingWith(element, prefix) {
        element.classList.forEach(function (className) {
          if (className.startsWith(prefix)) element.classList.remove(className);
        });
      }
  
      function loadVideo(video) {
        let id = video.getAttribute("id"),
          path = video.getAttribute("data-path"),
          color = video.getAttribute("data-color") || "";
  
        if (Support.inlineVideo) {
          let poster, src;
          let suffix = isMob ? "-mob" : "-pc";
          poster = path + id + suffix + ".jpg";
          src = path + id + suffix + ".mp4";
          video.setAttribute("poster", poster);
          video.setAttribute("src", src);
          video.load();
        } else {
          let imageEl = document.createElement("img");
          imageEl.setAttribute("id", id);
          imageEl.setAttribute("data-color", color);
          imageEl.classList = video.classList;
          imageEl.setAttribute("src", path + id + "-wx.jpg");
          video.parentNode.insertBefore(imageEl, video.nextSibling);
          video.parentNode.removeChild(video);
        }
      }
  
  
      function backToTop() {
        const button = document.querySelector('.pdp-backToTopBtn'),
          $footer = document.querySelector('.footer');
        button.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        window.addEventListener('scroll', function () {
          let footerTop = $footer?.getBoundingClientRect().top || 0; if (window.scrollY > 200 && footerTop > screenHeight) button.classList.add('is-active');
          else button.classList.remove('is-active');
        })
      }
  
      function point_click() {
        // if (!isMob) {
        var honorPointLinks = MAIN.querySelectorAll(".point-item");
        honorPointLinks.forEach(function (item) {
          item.onclick = function (e) {
            var id = item.getAttribute("data-id");
            var position =
              document
                .querySelector('.point-part[data-id="' + id + '"]')
                .getBoundingClientRect().top +
              window.scrollY;
  
            if (!isMob) {
              if (id == 1) position += screenHeight * 1.01;
              if (id == 2) position += screenHeight * 0.1;
              if (id == 3) position += screenHeight * 0;
              if (id == 4) position += screenHeight * 0.1;
              if (id == 5) position += screenHeight * 0;
              if (id == 6) position -= screenHeight * 0.04;
            } else {
              if (id == 1) position -= screenHeight * 0.05;
              if (id == 2) position -= screenHeight * 0.05;
              if (id == 3) position -= screenHeight * 0.05;
              if (id == 4) position -= screenHeight * 0.05;
              if (id == 5) position -= screenHeight * 0.05;
              if (id == 6) position -= screenHeight * 0.05;
            }
  
  
  
            window.scrollTo({
              top: position,
              left: 0,
              behavior: "auto",
            });
            e.preventDefault();
          };
        });
  
      }
  
      return {
        point_click: point_click(),
        // backToTop: backToTop(),
        unUseHandle: unUseHandle(),
        browserHandle: browserHandle(),
        buyButtonHrefHandle: buyButtonHrefHandle(),
        removeClassesStartingWith,
        loadVideo,
      };
    })();
  
  
  
    const setCssVar = function (elName, varName, varVal) {
      const el = document.querySelector(elName)
      el.style.setProperty(varName, varVal)
    }
  
  
  
    const Animation = (function () {
  
  
  
      const sec4Video1 = MAIN.querySelector('.section4 .sec4-video1')
      const sec4Video2 = MAIN.querySelector('.section4 .sec4-video2')
      var sec4_video_isLoad1 = false
      var sec4_video_isLoad2 = false
  
      if (!sec4_video_isLoad1) {
        sec4_video_isLoad1 = true;
        Common.loadVideo(sec4Video1);
      }
      if (!sec4_video_isLoad2) {
        sec4_video_isLoad2 = true;
        Common.loadVideo(sec4Video2);
      }
  
  
  
      function sec3() {
        const sec7Video = MAIN.querySelector('.section7 .sec7-video')
        var sec7_video_isLoad = false

  
        const sec12Video = MAIN.querySelector('.section12 .sec12-video')
        var sec12_video_isLoad = false
  
  
        const sec16Video1 = MAIN.querySelector('.section16 .sec16-video1')
        const sec16Video2 = MAIN.querySelector('.section16 .sec16-video2')
        var sec16_video_isLoad1 = false
        var sec16_video_isLoad2 = false
  
        if (!isMob) {
          let sec3_pc1 = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec3-trigger1',
              start: 'top 0%',
              end: '+=100%',
              scrub: 0.5,
              // markers: true,
            }
          });
  
          sec3_pc1.to('.section3 .sec3-tit-wrapper .sec3-title', 1, {
            "background-position-x": "0%"
          })
  
          sec3_pc1.to('.section3', 1, {
            onStart: function () {
              $('.section3').addClass('is-active-txt')
            },
            onReverseComplete: function () {
              $('.section3').removeClass('is-active-txt')
            }
          })
  
          sec3_pc1.to('.section3', 1, {
            onStart: function () {
              $('.section3').addClass('is-active1')
  
              if (!sec7_video_isLoad) {
                sec7_video_isLoad = true;
                Common.loadVideo(sec7Video);
              }
  
  
              if (!sec12_video_isLoad) {
                sec12_video_isLoad = true;
                Common.loadVideo(sec12Video);
              }
  
              if (!sec16_video_isLoad1) {
                sec16_video_isLoad1 = true;
                Common.loadVideo(sec16Video1);
              }
  
              if (!sec16_video_isLoad2) {
                sec16_video_isLoad2 = true;
                Common.loadVideo(sec16Video2);
              }
  
  
            },
            onReverseComplete: function () {
              $('.section3').removeClass('is-active1')
            }
          })
  
  
          
  
          const $cmf = MAIN.querySelector('.section3 .cmf-wrapper')
          var currentColor = 'purple';
          const colorBtns = $cmf.querySelectorAll('.every-btn');
          colorBtns.forEach(function (button, i) {
            button.addEventListener('click', function () {
              let color = this.getAttribute('data-color');
              console.log(currentColor)
              if (currentColor == color) return;
              currentColor = color;
              Common.removeClassesStartingWith($cmf, 'is-color');
              $cmf.classList.add('is-color-' + currentColor);
            })
          })
  
  
        } else {
          let sec3_pc1 = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec3-trigger1',
              start: 'top 0%',
              end: '+=100%',
              scrub: 0.5,
              // markers: true,
            }
          });
  
          sec3_pc1.to('.section3 .sec3-tit-wrapper .sec3-title', 1, {
            "background-position-x": "0%"
          })
  
          sec3_pc1.to('.section3', 1, {
            onStart: function () {
              $('.section3').addClass('is-active-txt')
            },
            onReverseComplete: function () {
              $('.section3').removeClass('is-active-txt')
            }
          })
  
          sec3_pc1.to('.section3', 1, {
            onStart: function () {
              $('.section3').addClass('is-active1')
  
              if (!sec7_video_isLoad) {
                sec7_video_isLoad = true;
                Common.loadVideo(sec7Video);
              }

              if (!sec12_video_isLoad) {
                sec12_video_isLoad = true;
                Common.loadVideo(sec12Video);
              }
  
              if (!sec16_video_isLoad1) {
                sec16_video_isLoad1 = true;
                Common.loadVideo(sec16Video1);
              }
  
              if (!sec16_video_isLoad2) {
                sec16_video_isLoad2 = true;
                Common.loadVideo(sec16Video2);
              }
            },
            onReverseComplete: function () {
              $('.section3').removeClass('is-active1')
            }
          })
  
          const $cmf = MAIN.querySelector('.section3 .cmf-wrapper')
          var currentColor = 'purple';
          const colorBtns = $cmf.querySelectorAll('.every-btn');
          colorBtns.forEach(function (button, i) {
            button.addEventListener('click', function () {
              let color = this.getAttribute('data-color');
              console.log(currentColor)
              if (currentColor == color) return;
              currentColor = color;
              Common.removeClassesStartingWith($cmf, 'is-color');
              $cmf.classList.add('is-color-' + currentColor);
            })
          })
  
        }
      }
  
  
      function sec4() {
        const sec4Video1 = MAIN.querySelector('.section4 .sec4-video1')
        const sec4Video2 = MAIN.querySelector('.section4 .sec4-video2')
        const $cmf = MAIN.querySelector('.section3 .cmf-wrapper')
        const colorBtns = $cmf.querySelectorAll('.every-btn');
  
  
        if (!isMob) {
  
  
          let sec4Alpha = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec4-trigger3',
              start: 'top 0%',
              end: 'top 0%',
              scrub: 0,
              // markers: true,
            }
          });
          sec4Alpha.to('.section4', 1, {
            onStart: function () {
              $('.section4').addClass('is-sec4-alpha')
              colorBtns.forEach(function (button, i) {
                button.style.pointerEvents = 'none'
              })
            },
            onReverseComplete: function () {
              $('.section4').removeClass('is-sec4-alpha')
              colorBtns.forEach(function (button, i) {
                button.style.pointerEvents = 'all'
              })
            }
          })
  
  
  
          let sec4_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec4-trigger1',
              start: 'top 30%',
              end: '+=140%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec4_pc.to('.section4', 1, {
            onStart: function () {
              $('.section4').addClass('is-active1')
              sec4Video1.play()
            },
            onReverseComplete: function () {
              $('.section4').removeClass('is-active1')
            }
          })
  
          sec4_pc.to('.section4', 1, {
            onStart: function () {
              $('.section4').addClass('is-active2')
              sec4Video2.play()
  
            },
            onReverseComplete: function () {
              $('.section4').removeClass('is-active2')
            }
          }, '+=1')
  
  
        } else {
          let sec4_mob1 = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec4-trigger1',
              start: 'top 55%',
              end: 'top 55%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec4_mob1.to('.section4', 1, {
            onStart: function () {
              $('.section4').addClass('is-active1-mob')
              sec4Video1.play()
            },
            onReverseComplete: function () {
              $('.section4').removeClass('is-active1-mob')
            }
          })
  
  
          let sec4_mob2 = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec4-trigger2',
              start: 'top 0%',
              end: 'top 0%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec4_mob2.to('.section4', 1, {
            onStart: function () {
              $('.section4').addClass('is-active2-mob')
              sec4Video2.play()
            },
            onReverseComplete: function () {
              $('.section4').removeClass('is-active2-mob')
            }
          })
  
        }
      }
  
  
      function sec5() {
        if (!isMob) {
          let sec5_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec5-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec5_pc.to('.section5', 1, {
            onStart: function () {
              $('.section5').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section5').removeClass('is-active1')
            }
          })
  
  
        } else {
          let sec5_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec5-trigger1',
              start: 'top 50%',
              end: '+=110%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec5_pc.to('.section5', 1, {
            onStart: function () {
              $('.section5').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section5').removeClass('is-active1')
            }
          })
  
          sec5_pc.to('.section5', 1, {
            onStart: function () {
              $('.section5').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section5').removeClass('is-active2')
            }
          })
        }
      }
  
  
  
      function sec67() {
  
        const sec7Video = MAIN.querySelector('.section7 .sec7-video')
  
        if (!isMob) {
  
          const scaleNum = (screenWidth / 1920)
          setCssVar('.sec7-svg', '--scale7', scaleNum)
  
          let sec6_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec67-trigger1',
              start: 'top 30%',
              end: '+=180%',
              scrub: 0,
              // markers: true,
            }
          });
  
  
          sec6_pc.to('.section6', 1, {
            onStart: function () {
              $('.section6').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section6').removeClass('is-active1')
            }
          })
  
          sec6_pc.to('.section6', 1, {
            onStart: function () {
              $('.section6').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section6').removeClass('is-active2')
            }
          })
  
          sec6_pc.to('.section6', 1, {
            onStart: function () {
              $('.section6').addClass('is-active3')
            },
            onReverseComplete: function () {
              $('.section6').removeClass('is-active3')
            }
          })
  
          sec6_pc.to('.section6', 1, {
            onStart: function () {
              $('.section6').addClass('is-active4')
            },
            onReverseComplete: function () {
              $('.section6').removeClass('is-active4')
            }
          })
  
          sec6_pc.to('.section7', 1, {
            onStart: function () {
              $('.section7').addClass('is-active1')
  
              setTimeout(() => {
                sec7Video.play()
              }, 1100)
  
            },
            onReverseComplete: function () {
              $('.section7').removeClass('is-active1')
            }
          }, '-=1')
  
          sec6_pc.to('.section7', 1, {
            onStart: function () {
              $('.section7').addClass('is-active2')
  
            },
            onReverseComplete: function () {
              $('.section7').removeClass('is-active2')
            }
          })
  
        } else {
  
          let sec6_mob = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec67-trigger1',
              start: 'top 50%',
              end: '+=180%',
              scrub: 0,
              // markers: true,
            }
          });
  
  
          sec6_mob.to('.section6', 1, {
            onStart: function () {
              $('.section6').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section6').removeClass('is-active1')
            }
          })
  
  
  
          const scaleNum = (screenWidth / 375)
          setCssVar('.sec7-svg', '--scale7', scaleNum)
  
          let sec7_mob = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec7-trigger1',
              start: 'top 50%',
              end: '+=110%',
              scrub: 0.2,
              // markers: true,
            }
          });
  
  
  
          sec7_mob.to('.section7.section7-mob', 1, {
            onStart: function () {
              $('.section7.section7-mob').addClass('is-active1')
              sec7Video.play()
            },
            onReverseComplete: function () {
              $('.section7.section7-mob').removeClass('is-active1')
            }
          })
  
          sec7_mob.to('.section7.section7-mob .sec7-phone-wrapper', 1, {
            'transform': 'translate(calc(-50% - 0vw), 0%) scale(1)'
          },"-=1")
  
          sec7_mob.to('.section7.section7-mob', 1, {
            onStart: function () {
              $('.section7.section7-mob').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section7.section7-mob').removeClass('is-active2')
            }
          },"-=0.3")
  
        }
      }
  
  
  
      function sec8() {
        if (!isMob) {
          let sec8_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec8-trigger1',
              start: 'top 50%',
              end: '+=50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec8_pc.to('.section8', 1, {
            onStart: function () {
              $('.section8').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section8').removeClass('is-active1')
            }
          })
  
          sec8_pc.to('.section8', 1, {
            onStart: function () {
              $('.section8').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section8').removeClass('is-active2')
            }
          })
  
  
        } else {
  
          let sec8_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec8-trigger1',
              start: 'top 50%',
              end: '+=110%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec8_pc.to('.section8', 1, {
            onStart: function () {
              $('.section8').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section8').removeClass('is-active1')
            }
          })
  
          sec8_pc.to('.section8', 1, {
            onStart: function () {
              $('.section8').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section8').removeClass('is-active2')
            }
          })
  
        }
      }
  
  
      function sec9() {
        if (!isMob) {
          let sec9_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec9-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec9_pc.to('.section9', 1, {
            onStart: function () {
              $('.section9').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section9').removeClass('is-active1')
            }
          })
  
  
  
        } else {
  
          let sec9_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec9-trigger1',
              start: 'top 50%',
              end: '+=110%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec9_pc.to('.section9', 1, {
            onStart: function () {
              $('.section9').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section9').removeClass('is-active1')
            }
          })
  
          sec9_pc.to('.section9', 1, {
            onStart: function () {
              $('.section9').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section9').removeClass('is-active2')
            }
          })
  
        }
      }
  
      function sec10() {
        if (!isMob) {
          let sec10_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec10-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec10_pc.to('.section10', 1, {
            onStart: function () {
              $('.section10').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section10').removeClass('is-active1')
            }
          })
  
  
  
        } else {
  
          let sec10_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec10-trigger1',
              start: 'top 50%',
              end: '+=110%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec10_pc.to('.section10', 1, {
            onStart: function () {
              $('.section10').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section10').removeClass('is-active1')
            }
          })
  
          sec10_pc.to('.section10', 1, {
            onStart: function () {
              $('.section10').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section10').removeClass('is-active2')
            }
          })
  
        }
      }
  
      function sec11() {
        if (!isMob) {
          let sec11_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec11-trigger1',
              start: 'top 0%',
              end: '+=50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec11_pc.to('.section11', 1, {
            onStart: function () {
              $('.section11').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section11').removeClass('is-active1')
            }
          })
  
          sec11_pc.to('.section11', 1, {
            onStart: function () {
              $('.section11').addClass('is-active2')
            },
            onReverseComplete: function () {
              $('.section11').removeClass('is-active2')
            }
          }, '+=1.8')
  
  
        } else {
  
          let sec11_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec11-trigger1',
              start: 'top 0%',
              end: '+=100%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec11_pc.to('.section11', 1, {
            onStart: function () {
              $('.section11').addClass('is-active1-mob')
            },
            onReverseComplete: function () {
              $('.section11').removeClass('is-active1-mob')
            }
          })
  
          sec11_pc.to('.section11', 1, {
            onStart: function () {
              $('.section11').addClass('is-active2-mob')
            },
            onReverseComplete: function () {
              $('.section11').removeClass('is-active2-mob')
            }
          }, '+=1.5')
  
        }
      }
  
  
  
      function sec12() {
        const sec12Video = MAIN.querySelector('.section12 .sec12-video')
        if (!isMob) {
          let sec12_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec12-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec12_pc.to('.section12', 1, {
            onStart: function () {
              $('.section12').addClass('is-active1')
              sec12Video.play()
            },
            onReverseComplete: function () {
              $('.section12').removeClass('is-active1')
            }
          })
  
        } else {
  
          let sec12_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec12-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec12_pc.to('.section12', 1, {
            onStart: function () {
              $('.section12').addClass('is-active1')
              sec12Video.play()
            },
            onReverseComplete: function () {
              $('.section12').removeClass('is-active1')
            }
          })
  
        }
      }
  
      function sec13() {
        if (!isMob) {
          let sec13_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec13-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec13_pc.to('.section13', 1, {
            onStart: function () {
              $('.section13').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section13').removeClass('is-active1')
            }
          })
  
        } else {
  
          let sec13_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec13-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec13_pc.to('.section13', 1, {
            onStart: function () {
              $('.section13').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section13').removeClass('is-active1')
            }
          })
  
        }
      }
  
  
      function sec14() {
        if (!isMob) {
          let sec14_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec14-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec14_pc.to('.section14', 1, {
            onStart: function () {
              $('.section14').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section14').removeClass('is-active1')
            }
          })
  
        } else {
  
          let sec14_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec14-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec14_pc.to('.section14', 1, {
            onStart: function () {
              $('.section14').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section14').removeClass('is-active1')
            }
          })
  
        }
      }
  
  
      function sec15() {
        if (!isMob) {
          let sec15_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec15-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec15_pc.to('.section15', 1, {
            onStart: function () {
              $('.section15').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section15').removeClass('is-active1')
            }
          })
  
        } else {
  
          let sec15_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec15-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec15_pc.to('.section15', 1, {
            onStart: function () {
              $('.section15').addClass('is-active1')
            },
            onReverseComplete: function () {
              $('.section15').removeClass('is-active1')
            }
          })
  
        }
      }
  
  
      function sec16() {
        const sec16Video1 = MAIN.querySelector('.section16 .sec16-video1')
        const sec16Video2 = MAIN.querySelector('.section16 .sec16-video2')
        if (!isMob) {
          let sec16_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec16-trigger1',
              start: 'top 40%',
              end: 'top 40%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec16_pc.to('.section16', 1, {
            onStart: function () {
              $('.section16').addClass('is-active1')
              sec16Video1.play()
              sec16Video2.play()
  
            },
            onReverseComplete: function () {
              $('.section16').removeClass('is-active1')
            }
          })
  
        } else {
  
          let sec16_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#sec16-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec16_pc.to('.section16', 1, {
            onStart: function () {
              $('.section16').addClass('is-active1')
              sec16Video1.play()
              sec16Video2.play()
            },
            onReverseComplete: function () {
              $('.section16').removeClass('is-active1')
            }
          })
  
        }
      }
  
  
      function secMusic() {
        if (!isMob) {
          let sec11_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#music-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec11_pc.to('.section-music', 1, {
            onStart: function () {
              $('.section-music').addClass('is-active')
            },
            onReverseComplete: function () {
              $('.section-music').removeClass('is-active')
            }
          })
  

  
  
        } else {
  
          let sec11_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#music-trigger1',
              start: 'top 50%',
              end: 'top 50%',
              scrub: 0,
              // markers: true,
            }
          });
  
          sec11_pc.to('.section-music', 1, {
            onStart: function () {
              $('.section-music').addClass('is-active')
            },
            onReverseComplete: function () {
              $('.section-music').removeClass('is-active')
            }
          })
  
  
  
  
        }
      }
  
  
      function secOs() {
  
        const secOsNextWrapper = MAIN.querySelector('.section-os .os-next')
        const secOsNext = MAIN.querySelector('.section-os .os-next-img')
        const secOsPrevWrapper = MAIN.querySelector('.section-os .os-prev')
        const secOsPrev = MAIN.querySelector('.section-os .os-prev-img')
  
  
        const osImgWrapper = MAIN.querySelector('.section-os .pc-os-wrapper')
        const osImgSlide = MAIN.querySelectorAll('.section-os .pc-os-wrapper .os-img-wrapper')
        if (!isMob) {
          let indexDown
          let index = 0;
          var timeOutStop;
          var timeOutStop2;
          // let timeout = null;
          // let interval = null
  
  
          // 节流
          function throttle(fn, delay) {
            let lastTime = 0;
            return function (...args) {
              const now = Date.now();
              if (now - lastTime >= delay) {
                fn.apply(this, args);
                lastTime = now;
              }
            }
          }
  
          function timeOut() {
            timeOutStop = setInterval(() => {
              secOsNext.click();
            }, 2100)
          }
  
  
          function timeOut2() {
            timeOutStop2 = setTimeout(() => {
              secOsNext.click();
            }, 200)
          }
  
          secOsPrevWrapper.addEventListener('click', throttle(function () {
            clearInterval(timeOutStop)
            clearTimeout(timeOutStop2)
            timeOut()
  
            index--;
            if (index < 0) {
              index = osImgSlide.length - 1
            }
            Common.removeClassesStartingWith(osImgWrapper, "is-active-reverse-")
            Common.removeClassesStartingWith(osImgWrapper, "is-active-forward-")
            osImgWrapper.classList.add(`is-active-reverse-${index}`)
  
  
            osImgSlide.forEach((item, index2) => {
              Common.removeClassesStartingWith(item, "index-down")
              osImgSlide[index].classList.add('index-down')
            })
          }, 600))
  
  
          secOsNextWrapper.addEventListener('click', throttle(function () {
            clearInterval(timeOutStop)
            clearTimeout(timeOutStop2)
            timeOut()
  
  
            index++;
            if (index > osImgSlide.length - 1) {
              index = 0
            }
            Common.removeClassesStartingWith(osImgWrapper, "is-active-forward-")
            Common.removeClassesStartingWith(osImgWrapper, "is-active-reverse-")
            osImgWrapper.classList.add(`is-active-forward-${index}`)
  
            if (index == 0) {
              indexDown = 2
            } else {
              indexDown = index - 1
            }
  
            osImgSlide.forEach((item, index2) => {
              Common.removeClassesStartingWith(item, "index-down")
              osImgSlide[indexDown].classList.add('index-down')
            })
  
          }, 600))
  
  
          let secOs_pc = gsap.timeline({
            scrollTrigger: {
              trigger: '#os-trigger1',
              start: 'top 10%',
              end: 'top 10%',
              scrub: 0,
              // markers: true,
            }
          });
  
          secOs_pc.to('.section-os', 1, {
            onStart: function () {
              timeOut()
              timeOut2()
            },
            onReverseComplete: function () {
              clearInterval(timeOutStop)
              clearTimeout(timeOutStop2)
            }
          })
  
  
        } else {
  
  
        }
      }
  
  
  
  
      return {
  
        sec3: sec3(),
        sec4: sec4(),
        sec5: sec5(),
        sec6: sec67(),
        sec8: sec8(),
        sec9: sec9(),
        sec10: sec10(),
        sec11: sec11(),
        sec12: sec12(),
        sec13: sec13(),
        sec14: sec14(),
        sec15: sec15(),
        sec16: sec16(),
        secOs: secOs(),
        secMusic: secMusic(),
  
  
      };
    })();
  
  
  
    // ga
    const GA = function () {
      let
        productName = PDT_NAME,
        sections = document.querySelectorAll('.ga-section'),
        currentVideoName,
        lang = HTML.getAttribute('lang'),
        objs = [],
        pageScrolling = false,
        touchMoving = false;
  
  
      function findParentWithClass(element, className) {
        let current = element.parentElement;
        while (current) {
          if (current.classList.contains(className)) return current;
          current = current.parentElement;
        }
      }
  
      function screen_swipe() {
        sections.forEach(function (section, index) {
          let position = index + 1;
          const title = section.querySelectorAll('.ga-title')[0] || productName;
          let titleName = title.innerHTML || productName;
          titleName = titleName.trim().replace(/&nbsp;/g, ' ').replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
          const trigger = section.querySelector('#trigger-ga') || section;
          let
            sectionTop = section.offsetTop,
            sectionHeight = section.offsetHeight,
            triggerTop = trigger?.offsetTop || 0,
            step = sectionTop + triggerTop;
          if (section.classList.contains('ga-section-kv')) titleName += ' KV', step = 0;
          if (section.classList.contains('ga-section-os')) titleName = ' MagicOS, Experiência Inteligente';
          if (section.classList.contains('sec-bottom-nodes')) titleName = 'Notas';
  
          if (section.classList.contains('ga-section-6')){
            step = MAIN.querySelector('.section67').offsetTop + MAIN.querySelector('.section6').offsetHeight*0.6 + triggerTop
          }
  
          if (section.classList.contains('ga-section-7')){
            step = document.querySelector('.section67').offsetTop + MAIN.querySelector('.section7').offsetHeight*0.6 + triggerTop
          }
  
          
  
          objs.push({
            position: position,
            titleName: titleName,
            sectionHeight: sectionHeight,
            step: step,
            flag: false
          })
  
          ScrollTrigger.create({
            trigger: trigger,
            start: 'top',
            end: '+=30%',
            // markers: true,
            onUpdate: function () {
              if (objs[index].flag || pageScrolling) return;
              objs[index].flag = true;
              // console.log(objs[index].step)
              // console.log(objs[index - 1].step)
              const step =
                index > 0
                  ? objs[index].step - objs[index - 1].step
                  : 0;
  
                  
              console.log(`${productName}_${objs[index].position}_${objs[index].titleName}_${Math.floor(step)}px`)
              
              try {
                if (lang == 'zh-CN') {
                  window.sendDapData({
                    'actionCode': 'screen_swipe',
                    'eventType': '2',
                    'content': {
                      'event_name': 'screen_swipe',
                      'eventLabel': `${productName}_${objs[index].position}_${objs[index].titleName}_${Math.floor(step)}px`,
                    }
                  })
                } else {
                  window.dataLayer.push({
                    'event': 'screen_swipe',
                    'position': objs[index].position,
                    'product_name': productName,
                    'title_name': objs[index].titleName,
                    'step': Math.floor(step) + 'px'
                  })
                }
              } catch (e) { }
            },
          });
        });
      }
  
      function video_interaction() {
        let videoDuration = 0;
  
        function sendData(videoName, videoStep, position) {
          try {
            if (lang == 'zh-CN') {
              window.sendDapData({
                'actionCode': 'video_interaction',
                'eventType': '2',
                'content': {
                  'event_name': 'video_interaction',
                  'eventLabel': `${videoStep}_${productName}_${position}_${videoName}_${videoDuration}s`
                }
              })
            } else {
              window.dataLayer.push({
                'event': 'video_interaction',
                'product_name': productName,
                'position': position,
                'step': videoStep,
                'video_name': videoName,
                'video_duration': videoDuration + 's'
              })
            }
          } catch (e) { }
        }
  
        function videoStep(video, videoName, position, percent) {
          const progress = Math.floor(video.currentTime * 100 / videoDuration);
  
          if (progress >= 0 && progress < 25 && !percent._0) {
            sendData(videoName, 'play', position);
            sendData(videoName, '0%-24%', position);
            percent._0 = true;
          } else if (progress >= 25 && progress < 50 && !percent._25) {
            sendData(videoName, '25%-49%', position);
            percent._25 = true;
          } else if (progress >= 50 && progress < 75 && !percent._50) {
            sendData(videoName, '50%-74%', position);
            percent._50 = true;
          } else if (progress >= 75 && progress < 100 && !percent._75) {
            sendData(videoName, '75%-100%', position);
            percent._75 = true;
          }
        }
  
        function videoStatus(video, videoName, position) {
          video.addEventListener('loadedmetadata', function () {
            videoDuration = parseInt(video.duration);
  
            let percent = {
              _0: false,
              _25: false,
              _50: false,
              _75: false,
              _100: false,
            };
            video.onpause = function () {
              if (video.currentTime == 0 || video.currentTime == videoDuration) return false;
              if (!video.classList.contains('close')) sendData(videoName, 'pause', position);
            };
  
            video.ontimeupdate = function () {
              videoStep(video, videoName, position, percent);
            };
          })
        }
  
        function videoClick(buttonEl, modalEl) {
          const
            buttons = MAIN.querySelectorAll(buttonEl),
            modal = MAIN.querySelector(modalEl),
            video = modal.querySelector('video'),
            close = modal.querySelector('.popupcloseBtn.is-video') || null;
  
          let position;
          buttons.forEach(function (button) {
            button.addEventListener('click', function () {
              const parent = findParentWithClass(button, 'ga-section');
              position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1;
              currentVideoName = button.getAttribute('data-ga-video-name');
              videoStatus(video, currentVideoName, position);
            });
          })
  
          close.addEventListener('click', function () {
            sendData(currentVideoName, 'close', position);
          });
        }
  
        videoClick('.playBtn', '.popup .videoWrapper');
      }
  
      function gaBtn_click() {
        const buttons = MAIN.querySelectorAll('.gaBtn');
        buttons.forEach(function (button, index) {
          button.addEventListener('click', function () {
            let
              buttonName = this.getAttribute('data-btn-name') || this.innerHTML.trim().replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, ''),
              parent = findParentWithClass(this, 'ga-section'),
              position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1,
              title = parent.querySelectorAll('.ga-title')[0] || this.getAttribute('data-title') || PDT_NAME,
              titleName = title.innerHTML || title;
              // console.log(title)
            titleName = titleName.trim().replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
  
            pageScrolling = true;
            setTimeout(() => { pageScrolling = false }, 1000);
  
  
            if(position == 18 ){
              titleName = 'MagicOS, Experiência Inteligente'
            }
            // console.log(`${productName}_${position}_${titleName}_${buttonName}`)
            try {
              if (lang == 'zh-CN') {
                window.sendDapData({
                  'actionCode': 'screen_click',
                  'eventType': '2',
                  'content': {
                    'event_name': 'screen_click',
                    'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
                  }
                })
              } else {
                window.dataLayer.push({
                  'event': 'screen_click',
                  'position': position,
                  'title_name': titleName,
                  'product_name': productName,
                  'button_name': buttonName
                })
              }
            } catch (e) { }
          });
        })
      }
  
      function kvBuyBtn_click() {
        const button = MAIN.querySelector('.kvBuyBtn');
        if (!button) return;
        button.addEventListener('click', function (e) {
          e.stopPropagation();
  
          if (Common.buyButtonHrefHandle) {
            const $wrapper = document.querySelector('.width-container'),
              malls = $wrapper.querySelectorAll('.mall-img');
  
            if (malls?.length > 0) {
              malls.forEach(function (mall) {
                let img = mall.querySelector('img'),
                  src = img.getAttribute('flag');
                img.setAttribute('src', src);
              });
            }
            $wrapper.style.display = 'flex';
          }
  
          let
            buttonName = this.innerHTML
              .trim()
              .replace(/<\/?.+?>/g, '')
              .replace(/\s+/g, ' ')
              .replace(/^\s*|\s*$/g, ''),
            parent = findParentWithClass(this, 'ga-section'),
            position =
              Array.prototype.indexOf.call(
                MAIN.querySelectorAll('.ga-section'),
                parent
              ) + 1,
            _productName = this.getAttribute('data-product-name') || productName;
  
          try {
            if (lang == 'zh-CN') {
              window.sendDapData({
                actionCode: 'buy',
                eventType: '2',
                content: {
                  event_name: 'buy',
                  eventLabel: `${buttonName}_${position}_${_productName}`,
                },
              });
            } else {
              window.dataLayer.push({
                event: 'buy',
                button_name: buttonName,
                position: position,
                product_name: _productName,
              });
            }
          } catch (e) { }
        });
      }
  
      function cmfBtn_click() {
        const buttons = MAIN.querySelectorAll('.cmfBtn');
        buttons.forEach(function (button, index) {
          button.addEventListener('click', function () {
            let
              buttonName = this.getAttribute('data-buttonname'),
              parent = findParentWithClass(this, 'ga-section'),
              position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1,
              titleName = `${productName} CMF`;
  
            try {
              if (lang == 'zh-CN') {
                window.sendDapData({
                  'actionCode': 'screen_click',
                  'eventType': '2',
                  'content': {
                    'event_name': 'screen_click',
                    'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
                  }
                })
              } else {
                window.dataLayer.push({
                  event: 'screen_click',
                  position: position,
                  title_name: titleName,
                  product_name: productName,
                  button_name: buttonName,
                });
              }
            } catch (e) { }
          });
        })
      }
  
      function highlightsBtn_click() {
        const buttons = MAIN.querySelectorAll('.highlightsBtn');
        buttons.forEach(function (button, index) {
          button.addEventListener('click', function (e) {
            e.stopPropagation();
  
            let
              buttonName = this.querySelectorAll('.subtitle')[0].innerHTML.trim().replace(/<sup>.*?<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, ''),
              parent = findParentWithClass(this, 'ga-section'),
              position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1,
              title = parent.querySelectorAll('.ga-title')[0] || this.getAttribute('data-title') || PDT_NAME,
              titleName = title.innerHTML || title;
            titleName = titleName.trim().replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
  
            pageScrolling = true;
            setTimeout(() => { pageScrolling = false }, 1000);
            const section = this.getAttribute('data-section');
            let offsetTop = MAIN.querySelector('.' + section).offsetTop - navHeight - 20;
            if (MAIN.querySelector('.' + section).classList.contains('section-snapdragon') && !isMob) offsetTop += screenHeight * 0.9;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
  
            try {
              if (lang == 'zh-CN') {
                window.sendDapData({
                  'actionCode': 'screen_click',
                  'eventType': '2',
                  'content': {
                    'event_name': 'screen_click',
                    'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
                  }
                })
              } else {
                window.dataLayer.push({
                  'event': 'screen_click',
                  'position': position,
                  'title_name': titleName,
                  'product_name': productName,
                  'button_name': buttonName
                })
              }
            } catch (e) { }
          });
        })
      }
  
      function swiper_touch(section, direction) {
        let
          position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), section) + 1,
          title = section.querySelectorAll('.ga-title')[0] || section.getAttribute('data-title') || PDT_NAME,
          titleName = title.innerHTML || title;
        titleName = titleName.trim().replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
  
        try {
          if (lang == 'zh-CN') {
            let _direction = direction === 'next' ? '向后' : '向前';
  
            window.sendDapData({
              'actionCode': 'screen_click',
              'eventType': '2',
              'content': {
                'event_name': 'screen_click',
                'eventLabel': `${productName}_${position}_${titleName}_拖拽${_direction}`
              }
            })
          } else {
            let _direction = direction === 'next' ? 'Next' : 'Prev';
  
            // console.log(position ,titleName, productName, _direction)
            window.dataLayer.push({
              'event': 'screen_click',
              'position': position,
              'title_name': titleName,
              'product_name': productName,
              'button_name': 'Swipe ' + _direction
            })
          }
        } catch (e) { }
      }
  
      return {
        screen_swipe: screen_swipe(),
        // video_interaction: video_interaction(),
        gaBtn_click: gaBtn_click(),
        kvBuyBtn_click: kvBuyBtn_click(),
        // cmfBtn_click: cmfBtn_click(),
        // highlightsBtn_click: highlightsBtn_click(),
        // swiper_touch,
      };
    }();
  
  
  });