// analytics.js — Google Analytics 4 (속성: testlab-b8c90)
// 측정 ID는 Firebase 설정(firebase-init.js)의 measurementId와 같다. 바꿀 때는 여기 한 곳만 고치면 된다.
//
// - 운영 도메인(tmhub.co.kr)에서만 전송한다. 로컬 개발·미리보기 배포는 통계에 섞이지 않는다.
// - 어떤 페이지에서든 window.trackEvent(이름, 파라미터)를 안전하게 호출할 수 있다(비운영 환경에서는 아무 일도 안 한다).
// - 주소 뒤에 ?ga_debug=1 을 붙이면 GA4 DebugView에서 이 접속의 이벤트를 실시간으로 볼 수 있다.
// - 이름·생년월일 같은 입력값은 이벤트에 담지 않는다.
(function () {
  var GA_ID = 'G-R3VPKKZ9FH';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  window.trackEvent = function () {};          // 기본은 아무것도 하지 않음

  if (!/(^|\.)tmhub\.co\.kr$/.test(location.hostname)) return;

  window.trackEvent = function (name, params) {
    try { window.gtag('event', name, params || {}); } catch (_) {}
  };

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  window.gtag('js', new Date());
  var cfg = {};
  if (/[?&]ga_debug=1(&|$)/.test(location.search)) cfg.debug_mode = true;
  window.gtag('config', GA_ID, cfg);
})();
