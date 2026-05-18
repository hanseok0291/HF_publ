'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';

/** @typedef {{ id: string; question: string; answer: import('react').ReactNode }} FaqItem */
/** @typedef {'account' | 'pay'} FaqCategory */
/** @typedef {{ id: string; title: string; category: FaqCategory; items: FaqItem[] }} FaqSection */
/** @typedef {'all' | FaqCategory} FaqTabId */

/** 퍼블 확인용 FAQ 데이터 — 개발 연동 시 API·props로 교체 */
const FAQ_PLACEHOLDER_SECTIONS = [
  {
    id: 'identity',
    title: '본인인증',
    category: 'account',
    items: [
      {
        id: 'identity-1',
        question: '본인인증이 되지 않아요.',
        answer:
          '본인인증이 되지 않는 경우, 입력 정보가 통신사·신분증 정보와 일치하는지 확인해 주세요. 문제가 계속되면 고객센터로 문의해 주세요.',
      },
    ],
  },
  {
    id: 'account-recovery',
    title: '계정 찾기/복구',
    category: 'account',
    items: [
      {
        id: 'account-recovery-1',
        question: '이미 가입된 계정이 있다고 나와요.',
        answer:
          '가입 이력이 있는 휴대폰 번호로 안내됩니다. 계정 찾기 메뉴에서 본인인증 후 가입 정보를 확인할 수 있습니다.',
      },
      {
        id: 'account-recovery-2',
        question: '아이디/비밀번호가 기억나지 않아요.',
        answer:
          '로그인 화면의 아이디·비밀번호 찾기를 이용해 주세요. 본인인증 후 아이디 확인 및 비밀번호 재설정이 가능합니다.',
      },
      {
        id: 'account-recovery-3',
        question: '비밀번호를 여러번 틀렸어요.',
        answer:
          '일정 횟수 이상 오입력 시 보안을 위해 로그인이 제한될 수 있습니다. 비밀번호 찾기로 재설정 후 다시 시도해 주세요.',
      },
    ],
  },
  {
    id: 'device-login',
    title: '기기/로그인',
    category: 'account',
    items: [
      {
        id: 'device-login-1',
        question: '한 계정으로 여러 기기에서 사용할 수 있나요?',
        answer:
          '네, 동일 계정으로 여러 기기에서 로그인해 이용할 수 있습니다. 다만 보안을 위해 의심되는 접속은 확인 절차가 진행될 수 있습니다.',
      },
      {
        id: 'device-login-2',
        question: '기기를 변경했어요. 어떻게 해야 하나요?',
        answer:
          '새 기기에서 앱을 설치한 뒤 기존과 동일한 방법으로 로그인해 주세요. 본인인증 또는 생체인증이 요청될 수 있습니다.',
      },
      {
        id: 'device-login-3',
        question: '생체인증은 어떻게 설정하나요?',
        answer:
          '앱 설정 > 보안/인증 메뉴에서 지문·Face ID 등 기기에서 지원하는 생체인증을 등록할 수 있습니다.',
      },
      {
        id: 'device-login-4',
        question: '자동 로그아웃 기준은 무엇인가요?',
        answer:
          '일정 시간 미사용 시 또는 보안 정책에 따라 자동 로그아웃될 수 있습니다. 자세한 기준은 서비스 정책을 참고해 주세요.',
      },
    ],
  },
  {
    id: 'withdrawal',
    title: '회원탈퇴',
    category: 'account',
    items: [
      {
        id: 'withdrawal-1',
        question: '탈퇴 후 재가입이 가능한가요?',
        answer:
          '탈퇴 후에도 일정 조건 하에 재가입이 가능할 수 있습니다. 탈퇴 시점·보유 혜택 소멸 여부는 탈퇴 안내를 확인해 주세요.',
      },
      {
        id: 'withdrawal-2',
        question: '개인정보는 어떻게 관리되나요?',
        answer:
          '탈퇴 후 관련 법령에 따라 보관이 필요한 정보를 제외하고는 지체 없이 파기합니다. 자세한 내용은 개인정보 처리방침을 참고해 주세요.',
      },
    ],
  },
  {
    id: 'app',
    title: '앱 이용',
    category: 'account',
    items: [
      {
        id: 'app-1',
        question: '탈퇴 후 재가입이 가능한가요?',
        answer:
          '앱 이용 관련 재가입·복구 안내는 회원 정책에 따릅니다. 고객센터를 통해 상세 안내를 받을 수 있습니다.',
      },
    ],
  },
  {
    id: 'pay-money',
    title: '페이 머니 & 포인트',
    category: 'pay',
    items: [
      {
        id: 'pay-money-1',
        question: '머니는 어떻게 충전하나요?',
        answer:
          '연결된 계좌 또는 지원되는 결제 수단으로 충전할 수 있습니다. 앱 내 머니·충전 메뉴에서 가능한 방법을 확인해 주세요.',
      },
      {
        id: 'pay-money-2',
        question: '머니 한도가 있나요?',
        answer:
          '보유·충전·이체 한도는 서비스 정책 및 본인인증 단계에 따라 달라질 수 있습니다. 앱 내 한도 안내를 확인해 주세요.',
      },
      {
        id: 'pay-money-3',
        question: '머니 출금은 어떻게 하나요?',
        answer:
          '등록된 출금 계좌로 이체 신청이 가능합니다. 출금 가능 시간·수수료는 안내 화면을 참고해 주세요.',
      },
      {
        id: 'pay-money-4',
        question: '머니&포인트의 유효기간이 궁금합니다.',
        answer:
          '머니·포인트별로 유효기간 및 소멸 기준이 다를 수 있습니다. 적립·사용 내역에서 만료 예정일을 확인할 수 있습니다.',
      },
      {
        id: 'pay-money-5',
        question: '포인트 사용 취소 시 현금으로 환불 받을 수 있나요?',
        answer:
          '포인트 사용 취소·환불은 결제·취소 정책에 따릅니다. 현금 환불 가능 여부는 거래 유형별 안내를 확인해 주세요.',
      },
      {
        id: 'pay-money-6',
        question: '이미 지급된 포인트가 회수가 될 수 있나요?',
        answer: (
          <>
            <p>
              다음의 사유 발생 시, 이미 지급된 포인트가 회수될 수
              <br />
              있습니다.
            </p>
            <p>
              <br />
              1) 결제 취소 시
              <br />- 해당 결제 건에 대한 적립 포인트 회수
              <br />
              <br />
              2) 이벤트 참여 취소/불공정한 방법으로 참여 확인시
              <br />- 해당 이벤트에 대한 적립 포인트 회수
            </p>
          </>
        ),
      },
      {
        id: 'pay-money-7',
        question: '머니&포인트 사용법이 궁금합니다.',
        answer:
          '가맹점 결제, 송금 등 서비스에서 지원하는 범위 내에서 사용할 수 있습니다. 사용 가능처는 앱 내 안내를 확인해 주세요.',
      },
      {
        id: 'pay-money-8',
        question: '라운드페이 회원 탈퇴 시 보유 포인트는 어떻게 되나요?',
        answer:
          '탈퇴 시 미사용 포인트·머니는 정책에 따라 소멸될 수 있습니다. 탈퇴 전 잔액·유효기간을 확인해 주세요.',
      },
    ],
  },
  {
    id: 'transfer',
    title: '간편 계좌 이체',
    category: 'pay',
    items: [
      {
        id: 'transfer-1',
        question: '머니&포인트의 유효기간이 궁금합니다.',
        answer:
          '간편 이체와 별도로 머니·포인트 유효기간 정책이 적용될 수 있습니다. 상세 내용은 이용 안내를 참고해 주세요.',
      },
    ],
  },
];

function FaqAnswerContent({ answer }) {
  if (typeof answer === 'string') {
    return <p>{answer}</p>;
  }
  return answer;
}

function FaqAccordionItem({ item, isOpen, onToggle, panelId, triggerId, showFooter = true }) {
  return (
    <li className={`terms-pub__faq-item${isOpen ? ' is-open' : ''}`}>
      <div className="terms-pub__faq-item-shell">
        <button
          type="button"
          id={triggerId}
          className="terms-pub__faq-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span className="terms-pub__faq-question">{item.question}</span>
          <Image
            src="/images/common/icon-chevron-down-muted.svg"
            alt=""
            width={16}
            height={16}
            className="terms-pub__faq-chevron"
          />
        </button>
        {isOpen ? (
          <div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className="terms-pub__faq-answer-panel"
          >
            <div className="terms-pub__faq-answer">
              <FaqAnswerContent answer={item.answer} />
            </div>
          </div>
        ) : null}
      </div>
      {showFooter ? (
        <div className="terms-pub__faq-item-footer">
          <hr className="terms-pub__faq-divider" />
        </div>
      ) : null}
    </li>
  );
}

/**
 * FAQ 아코디언 목록 + 문의하기 (Figma FAQ_list)
 * @param {object} [props]
 * @param {FaqSection[]} [props.sections]
 * @param {FaqTabId} [props.activeTab]
 */
export default function FaqAccordionList({
  sections = FAQ_PLACEHOLDER_SECTIONS,
  activeTab = 'all',
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState(null);

  const visibleSections = useMemo(
    () =>
      activeTab === 'all'
        ? sections
        : sections.filter((section) => section.category === activeTab),
    [sections, activeTab],
  );

  useEffect(() => {
    setOpenId(null);
  }, [activeTab]);

  const toggleItem = useCallback((itemId) => {
    setOpenId((prev) => (prev === itemId ? null : itemId));
  }, []);

  return (
    <>
      <div className="terms-pub__faq-sections">
        {visibleSections.map((section, sectionIndex) => {
          const isLastSection = sectionIndex === visibleSections.length - 1;

          return (
            <section
              key={section.id}
              className="terms-pub__faq-section"
              aria-labelledby={`${baseId}-${section.id}-title`}
            >
              <h2 id={`${baseId}-${section.id}-title`} className="terms-pub__faq-section-title">
                {section.title}
              </h2>
              <ul className="terms-pub__faq-list">
                {section.items.map((item, itemIndex) => {
                  const isOpen = openId === item.id;
                  const isLastItem = itemIndex === section.items.length - 1;
                  const panelId = `${baseId}-${item.id}-panel`;
                  const triggerId = `${baseId}-${item.id}-trigger`;

                  return (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      isOpen={isOpen}
                      onToggle={toggleItem}
                      panelId={panelId}
                      triggerId={triggerId}
                      showFooter={!(isLastSection && isLastItem)}
                    />
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="terms-pub__faq-inquiry-divider" role="presentation" />

      <section className="terms-pub__faq-inquiry" aria-labelledby={`${baseId}-inquiry-title`}>
        <div className="terms-pub__faq-inquiry-head">
          <h2 id={`${baseId}-inquiry-title`} className="terms-pub__faq-inquiry-title">
            문의하기
          </h2>
          <p className="terms-pub__faq-inquiry-hours">
            <span className="terms-pub__faq-inquiry-hours-label">운영시간</span>
            <span>평일 09:00 ~ 18:00</span>
          </p>
        </div>
        <div className="terms-pub__faq-inquiry-actions">
          <button type="button" className="terms-pub__faq-inquiry-btn">
            카카오톡 문의하기
          </button>
          <button type="button" className="terms-pub__faq-inquiry-btn">
            고객센터 연결하기
          </button>
        </div>
      </section>
    </>
  );
}
