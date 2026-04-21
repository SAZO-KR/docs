/**
 * SAZO Design System — UI 텍스트 한국어화
 * Mintlify가 레포 루트의 .js 파일을 자동 로드합니다.
 */
(function () {
  const translations = {
    'Was this page helpful?': '이 페이지가 도움이 되었나요?',
    'Yes': '예',
    'No': '아니오',
    'Log Out': '로그아웃',
    'Dashboard': '대시보드',
    'On this page': '이 페이지 내용',
    'Search or ask...': '검색 또는 질문...',
    'Search...': '검색...',
    'No results found': '검색 결과가 없습니다',
    'Last modified on': '최종 수정일:',
    'Previous': '이전',
    'Next': '다음',
    'Copy': '복사',
    'Copied': '복사됨',
    'Table of Contents': '목차',
  };

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      var text = node.textContent.trim();
      if (text && translations[text]) {
        node.textContent = node.textContent.replace(text, translations[text]);
      }
    }
  }

  function translateAll() {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    while (walker.nextNode()) {
      translateNode(walker.currentNode);
    }
    // placeholder 속성도 번역
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      var ph = el.getAttribute('placeholder');
      if (ph && translations[ph]) {
        el.setAttribute('placeholder', translations[ph]);
      }
    });
    // aria-label도
    document.querySelectorAll('[aria-label]').forEach(function (el) {
      var label = el.getAttribute('aria-label');
      if (label && translations[label]) {
        el.setAttribute('aria-label', translations[label]);
      }
    });
  }

  // 초기 실행 + DOM 변화 감시 (SPA 네비게이션 대응)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translateAll);
  } else {
    translateAll();
  }

  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        if (added[j].nodeType === Node.ELEMENT_NODE) {
          translateAll();
          return;
        }
      }
    }
  });
  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
