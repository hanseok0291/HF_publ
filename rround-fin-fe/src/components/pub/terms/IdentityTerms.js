'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

const PAGE_TITLE = '휴대폰 본인확인 이용 약관';

/** @type {{ id: string; label: string }[]} */
const VERSION_LIST = [{ id: 'default', label: '2024. 04. 03' }];

export default function IdentityTerms() {
  const [fixed, setFixed] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState('default');
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const top = Math.floor(titleRef.current.getBoundingClientRect().top);
      setFixed(top <= 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="min-h-screen px-4 pb-10">
        <header
          className={`${styleTerms.termsHeader} fixed left-0 top-0 z-[100] flex h-[56px] w-full items-center justify-center bg-white`}
        >
          {fixed ? (
            <span className="max-w-[calc(100%-96px)] truncate text-base font-semibold text-[#151515]">
              {PAGE_TITLE}
            </span>
          ) : null}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0"
            onClick={() => window.history.back()}
            aria-label="닫기"
          >
            <Image src="/images/common/icon-close.svg" alt="" width={24} height={24} />
          </button>
        </header>

        <div className={`${styleTerms.termsPage} py-4`}>
          <div className="h-[56px]" aria-hidden="true" />
          <h4 ref={titleRef} className={`${styleTerms.termsTitle} relative z-[50]`}>
            {PAGE_TITLE}
          </h4>
          <div className="terms-pub terms-legal-html">
            <h3>[SKT] 본인확인서비스 이용약관</h3>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <h4>제1조 (목적)</h4>
            <p>이 약관은 본인확인서비스 제공자와 이용자 간 권리·의무 및 기타 필요한 사항을 정함을 목적으로 합니다.</p>
            <h4>제2조 (용어의 정의)</h4>
            <ol>
              <li>① 본인확인서비스: 휴대폰을 이용해 본인 여부를 확인하는 서비스</li>
              <li>② 이용자: 본인확인서비스를 이용하는 자</li>
            </ol>
            <div className="mt-4">
              <div className="terms-pub__detail-version">
                <TermsVersionSelect
                  versions={VERSION_LIST}
                  value={selectedVersionId}
                  onChange={setSelectedVersionId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
