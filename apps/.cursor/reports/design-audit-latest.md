**[적용 룰]** 전사 공통 (00-core) + 30-design-guide

[CHECK RESULT]
- Status: FAIL
- Target: `d:\publishing\apps\pub-guide\pages\test3_v7.html`
- Mode: quick(auto), strict=false

[Findings]
1. [High] 20-style-convention
   - Why: flex/grid `gap` 사용
   - Fix: 관련 룰 문서를 열어 동일 패턴 제거/대체
2. [Medium] 10-a11y-semantic
   - Why: 라벨 없는 button 태그 감지: 1개
   - Fix: 관련 룰 문서를 열어 동일 패턴 제거/대체
3. [High] 30-design-guide-layout
   - Why: 고정 width(px) 사용 감지: 17건 (부모 인셋 + 자식 100% 규칙 확인 필요)
   - Fix: 관련 룰 문서를 열어 동일 패턴 제거/대체
