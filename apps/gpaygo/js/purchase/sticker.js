// 스티커 구매 신청 페이지 셀렉트박스 기능
(function() {
  'use strict';

  // 이벤트 위임을 사용한 셀렉트박스 핸들러
  function setupSelectBoxHandlers() {
    // 셀렉트박스 버튼 클릭 핸들러 (이벤트 위임)
    function handleSelectClick(e) {
      const selectButton = e.target.closest('.sticker-select');
      if (!selectButton) return;

      // 버튼 자체를 클릭한 경우에만 preventDefault (터치 이벤트가 아닐 때만)
      if (e.type !== 'touchend' && (e.target === selectButton || selectButton.contains(e.target))) {
        e.preventDefault();
      }
      e.stopPropagation();
      
      if (selectButton.disabled) return;

      const selectField = selectButton.closest('.sticker-select-field');
      const selectList = selectField?.querySelector('.sticker-select-list');
      
      if (!selectList) {
        console.warn('셀렉트박스 리스트를 찾을 수 없습니다:', selectButton);
        return;
      }

      const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
      
      // 다른 셀렉트박스 닫기
      closeAllSelects(selectButton);
      
      if (!isExpanded) {
        openSelect(selectButton, selectList);
      } else {
        closeSelect(selectButton, selectList);
      }
    }

    // 클릭 이벤트 처리
    document.addEventListener('click', handleSelectClick, true);
    
    // 터치 이벤트 처리 (모바일 대응, passive: false로 변경하여 preventDefault 가능)
    document.addEventListener('touchend', function(e) {
      const selectButton = e.target.closest('.sticker-select');
      if (selectButton) {
        // 터치 이벤트에서는 preventDefault를 호출하지 않음
        handleSelectClick(e);
      }
    }, { passive: false });

    // 리스트 아이템 클릭/터치 핸들러 (이벤트 위임, 모바일 대응)
    function handleItemClick(e) {
      const selectItem = e.target.closest('.sticker-select-item');
      if (!selectItem) return;

      // 터치 이벤트가 아닐 때만 preventDefault
      if (e.type !== 'touchend') {
        e.preventDefault();
      }
      e.stopPropagation();

      const selectList = selectItem.closest('.sticker-select-list');
      if (!selectList) return;

      const selectField = selectList.closest('.sticker-select-field');
      const selectButton = selectField?.querySelector('.sticker-select');
      
      if (!selectButton || selectButton.disabled) return;

      // 선택된 아이템 업데이트
      const text = selectItem.textContent.trim();
      const value = selectItem.getAttribute('data-value');
      
      const selectText = selectButton.querySelector('.sticker-select-text');
      if (selectText) {
        selectText.textContent = text;
      }
      selectButton.setAttribute('data-value', value || '');
      
      // 선택 상태 업데이트
      const items = selectList.querySelectorAll('.sticker-select-item');
      items.forEach(i => i.classList.remove('selected'));
      selectItem.classList.add('selected');
      
      // 리스트 닫기
      closeSelect(selectButton, selectList);
      
      // 커스텀 이벤트 발생
      selectButton.dispatchEvent(new CustomEvent('selectChange', {
        detail: { value, text }
      }));
    }

    // 클릭 이벤트 처리
    document.addEventListener('click', handleItemClick, true);
    
    // 터치 이벤트 처리 (모바일 대응, passive: false로 변경)
    document.addEventListener('touchend', function(e) {
      const selectItem = e.target.closest('.sticker-select-item');
      if (selectItem) {
        handleItemClick(e);
      }
    }, { passive: false });

    // 외부 클릭 시 모든 셀렉트박스 닫기
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.sticker-select-field')) {
        closeAllSelects();
      }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeAllSelects();
      }
    });
  }

  // 셀렉트박스 초기화 (레거시 호환성)
  function initSelectBoxes() {
    setupSelectBoxHandlers();
  }

  // 셀렉트박스 열기
  function openSelect(button, list) {
    if (!button || !list) {
      console.error('셀렉트박스 열기 실패: button 또는 list가 없습니다');
      return;
    }
    button.setAttribute('aria-expanded', 'true');
    list.classList.add('active');
  }

  // 셀렉트박스 닫기
  function closeSelect(button, list) {
    if (!button || !list) {
      console.error('셀렉트박스 닫기 실패: button 또는 list가 없습니다');
      return;
    }
    button.setAttribute('aria-expanded', 'false');
    list.classList.remove('active');
  }

  // 모든 셀렉트박스 닫기
  function closeAllSelects(exceptButton = null) {
    const selectButtons = document.querySelectorAll('.sticker-select');
    
    selectButtons.forEach(button => {
      if (button === exceptButton) return;
      
      const selectField = button.closest('.sticker-select-field');
      const selectList = selectField?.querySelector('.sticker-select-list');
      
      if (selectList) {
        closeSelect(button, selectList);
      }
    });
  }

  // 사이드바 드롭다운 초기화 (이벤트 위임 사용, 모바일 대응)
  function initSidebarDropdowns() {
    // 사이드바 드롭다운 버튼 클릭/터치 핸들러 (이벤트 위임)
    function handleSidebarClick(e) {
      const sidebarButton = e.target.closest('.sticker-sidebar-dropdown');
      if (!sidebarButton) return;

      // 터치 이벤트가 아닐 때만 preventDefault
      if (e.type !== 'touchend') {
        e.preventDefault();
      }
      e.stopPropagation();
      
      if (sidebarButton.disabled) return;

      const section = sidebarButton.closest('.sticker-sidebar-section');
      const menu = section?.querySelector('.sticker-sidebar-menu');
      
      // 메뉴가 없어도 펼침/닫힘은 작동하도록 (나중에 메뉴 추가 가능)
      const isExpanded = sidebarButton.getAttribute('aria-expanded') === 'true';
      
      if (!isExpanded) {
        openSidebarDropdown(sidebarButton, section, menu);
      } else {
        closeSidebarDropdown(sidebarButton, section, menu);
      }
    }

    // 클릭 이벤트 처리
    document.addEventListener('click', handleSidebarClick);
    
    // 터치 이벤트 처리 (모바일 대응, passive: false로 변경)
    document.addEventListener('touchend', handleSidebarClick, { passive: false });

    // 초기 상태 설정
    const sidebarSections = document.querySelectorAll('.sticker-sidebar-section');
    sidebarSections.forEach(section => {
      const button = section.querySelector('.sticker-sidebar-dropdown');
      if (!button) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        section.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // 사이드바 드롭다운 열기
  function openSidebarDropdown(button, section, menu) {
    button.setAttribute('aria-expanded', 'true');
    if (section) {
      section.setAttribute('aria-expanded', 'true');
    }
  }

  // 사이드바 드롭다운 닫기
  function closeSidebarDropdown(button, section, menu) {
    button.setAttribute('aria-expanded', 'false');
    if (section) {
      section.setAttribute('aria-expanded', 'false');
    }
  }

  // 모달이 열릴 때 셀렉트박스 재초기화
  function observeModalOpen() {
    const modalOverlay = document.getElementById('stickerModal');
    if (!modalOverlay) return;

    // :target 선택자로 모달이 열릴 때를 감지
    function checkModalOpen() {
      const isOpen = window.location.hash === '#stickerModal' || 
                     window.getComputedStyle(modalOverlay).display !== 'none';
      if (isOpen) {
        // 모달이 열렸을 때 모든 셀렉트박스 닫기
        closeAllSelects();
      }
    }

    window.addEventListener('hashchange', checkModalOpen);
    
    // 모달 오버레이 클릭 감지 (이벤트 위임)
    document.addEventListener('click', function(e) {
      if (e.target === modalOverlay || e.target.closest('.sticker-modal-overlay') === modalOverlay) {
        if (e.target === modalOverlay) {
          // 모달 배경 클릭 시 셀렉트박스 닫기
          closeAllSelects();
        }
      }
    });

    // 모달이 표시될 때를 감지하기 위한 MutationObserver (모바일 대응)
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes') {
          const isVisible = window.getComputedStyle(modalOverlay).display !== 'none';
          if (isVisible) {
            // 모달이 열렸을 때 모든 셀렉트박스 닫기
            closeAllSelects();
          }
        }
      });
    });

    observer.observe(modalOverlay, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  // 페이지 로드 시 초기화
  function init() {
    initSelectBoxes();
    initSidebarDropdowns();
    observeModalOpen();
  }

  // DOM이 준비되면 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

