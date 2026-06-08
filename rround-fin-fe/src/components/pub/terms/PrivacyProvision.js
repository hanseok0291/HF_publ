'use client';

import TermsDetail from '@/components/pub/terms/TermsDetail';
import PrivacyProvisionContent from '@/components/pub/terms/PrivacyProvisionContent';

const PAGE_TITLE = '휴대폰 인증 개인정보 제공·위탁';

/** @type {{ id: string; label: string; html: string }[]} */
const VERSION_LIST = [{ id: 'default', label: '2024. 04. 03', html: '' }];

export default function PrivacyProvision() {
  return (
    <TermsDetail brandTitle={PAGE_TITLE} versions={VERSION_LIST}>
      <PrivacyProvisionContent />
    </TermsDetail>
  );
}
