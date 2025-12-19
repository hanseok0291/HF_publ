# Figma MCP 서버 설정 가이드

## 📋 개요

Figma Desktop App과 Cursor AI를 연동하여 Figma 디자인을 자동으로 코드로 변환하기 위한 MCP(Model Context Protocol) 서버 설정 방법입니다.

---

## 🔧 사전 준비사항

### 필수 요구사항
- ✅ **Figma Desktop App** 설치 (웹 버전 불가)
- ✅ **Cursor IDE** 설치
- ✅ **Figma Dev Mode 계정** (권장, 일부 기능에 필요)

### 확인 사항
- Figma Desktop App 최신 버전 사용 권장
- Cursor IDE 최신 버전 사용 권장

---

## 📝 Step 1: Figma Desktop App에서 MCP 서버 활성화

### 1-1. Figma Desktop App 실행
- 웹 버전이 아닌 **데스크톱 앱**을 실행해야 합니다.
- Figma Desktop App이 설치되어 있지 않다면 [Figma 공식 사이트](https://www.figma.com/downloads/)에서 다운로드

### 1-2. Preferences(기본 설정) 열기

**방법 A: 메뉴 사용**
1. Figma Desktop App 실행
2. 왼쪽 상단의 **Figma 로고** 클릭 (메인 메뉴)
3. 메뉴 하단의 **"Preferences"** 또는 **"설정"** 클릭

**방법 B: 단축키 사용**
- **Mac**: `Cmd + ,` (Command + 쉼표)
- **Windows**: `Ctrl + ,` (Control + 쉼표)

### 1-3. MCP 서버 활성화 옵션 찾기
1. Preferences 창이 열리면
2. 설정 목록에서 **"Enable Dev Mode MCP Server"** 또는 **"Dev Mode MCP 서버 활성화"** 옵션 찾기
3. 해당 옵션의 **체크박스를 활성화** ✅

### 1-4. 확인
- MCP 서버가 활성화되면 Figma Desktop App이 `http://127.0.0.1:3845/mcp` 주소에서 서버를 실행합니다.
- 별도의 설치 파일이나 추가 설정은 필요 없습니다.

---

## 📝 Step 2: Cursor IDE에서 MCP 서버 연결 설정

### 2-1. Cursor 설정 파일 위치 확인

Cursor의 MCP 설정은 **전역 설정 파일**에 저장됩니다.

**파일 경로:**
- **Windows**: `C:\Users\[사용자명]\.cursor\mcp.json`
- **Mac**: `~/.cursor/mcp.json`
- **Linux**: `~/.cursor/mcp.json`

> 💡 **참고**: `.cursor` 폴더는 숨김 폴더일 수 있습니다. 파일 탐색기에서 "숨김 파일 표시" 옵션을 활성화해야 할 수 있습니다.

### 2-2. mcp.json 파일 생성/수정

**방법 A: 직접 파일 생성/수정 (권장)**

1. **파일 탐색기 열기**
   - Windows: `Win + R` → `%USERPROFILE%` 입력 → Enter
   - Mac: Finder에서 `Cmd + Shift + G` → `~` 입력

2. **`.cursor` 폴더 확인/생성**
   - `.cursor` 폴더가 없으면 생성
   - 숨김 폴더이므로 "숨김 파일 표시" 옵션 활성화 필요

3. **`mcp.json` 파일 생성/열기**
   - `.cursor` 폴더 안에 `mcp.json` 파일이 없으면 새로 생성
   - 파일이 있으면 기존 내용 확인 후 수정

4. **다음 내용 입력/수정**

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

5. **파일 저장**
   - `Ctrl + S` (Windows) 또는 `Cmd + S` (Mac)

**방법 B: Cursor 설정 UI 사용 (선택사항)**

일부 Cursor 버전에서는 설정 UI를 통해 MCP 서버를 추가할 수 있습니다:

1. Cursor 설정 열기
   - `Ctrl/Cmd + ,` (설정 단축키)
   - 또는 메뉴: `File` → `Preferences` → `Settings`

2. MCP 설정 찾기
   - 설정 검색창에 **"MCP"** 입력
   - **"MCP Servers"** 또는 **"Model Context Protocol"** 섹션 찾기

3. MCP 서버 추가
   - **"Add Custom MCP"** 또는 **"새로운 MCP 추가"** 버튼 클릭
   - **서버 이름**: `figma-desktop`
   - **서버 URL**: `http://127.0.0.1:3845/mcp`
   - **저장**

---

## 📝 Step 3: 설정 확인 및 테스트

### 3-1. Cursor 재시작
- MCP 설정을 적용하려면 **Cursor를 완전히 종료 후 재시작**해야 합니다.
- 단순히 창을 닫는 것이 아니라 **프로세스를 종료**하고 다시 실행

### 3-2. 연결 상태 확인

**방법 A: Cursor 설정에서 확인**
1. Cursor 설정 열기 (`Ctrl/Cmd + ,`)
2. MCP 설정 섹션으로 이동
3. `figma-desktop` 서버 상태 확인
   - ✅ 연결됨 (Connected)
   - ❌ 연결 실패 (Connection Failed)

**방법 B: Cursor 하단 상태바 확인**
- Cursor 하단 상태바에서 MCP 연결 상태 아이콘 확인

**방법 C: 실제 사용 테스트**
1. Figma Desktop App에서 디자인 프레임 선택
2. Cursor에서 AI에게 요청:
   ```
   "선택한 페이지를 구현해줘"
   ```
3. AI가 Figma 디자인을 인식하고 코드를 생성하는지 확인

---

## 🔍 문제 해결 (Troubleshooting)

### 문제 1: MCP 서버 연결 실패

**증상**: Cursor에서 `figma-desktop` 서버가 연결되지 않음

**해결 방법**:
1. **Figma Desktop App 실행 확인**
   - Figma Desktop App이 실행 중인지 확인
   - 웹 버전이 아닌 데스크톱 앱인지 확인

2. **Figma MCP 서버 활성화 확인**
   - Figma Preferences에서 "Enable Dev Mode MCP Server" 옵션이 체크되어 있는지 확인

3. **포트 충돌 확인**
   - 다른 프로그램이 `3845` 포트를 사용 중인지 확인
   - 필요시 Figma Desktop App 재시작

4. **Cursor 재시작**
   - Cursor를 완전히 종료 후 재시작

### 문제 2: mcp.json 파일을 찾을 수 없음

**해결 방법**:
1. **숨김 폴더 표시**
   - Windows: 파일 탐색기 → 보기 → "숨김 항목" 체크
   - Mac: Finder → `Cmd + Shift + .` (점)

2. **폴더 직접 생성**
   - `.cursor` 폴더가 없으면 직접 생성
   - `mcp.json` 파일도 직접 생성

3. **파일 경로 확인**
   - Windows: `%USERPROFILE%\.cursor\mcp.json`
   - Mac: `~/.cursor/mcp.json`

### 문제 3: JSON 형식 오류

**증상**: mcp.json 파일을 저장했는데 Cursor에서 인식하지 못함

**해결 방법**:
1. **JSON 형식 확인**
   - JSON 문법이 올바른지 확인 (쉼표, 중괄호 등)
   - 온라인 JSON 검증 도구 사용 권장

2. **인코딩 확인**
   - 파일 인코딩이 **UTF-8**인지 확인
   - BOM(Byte Order Mark) 없이 저장

3. **파일 확장자 확인**
   - 파일명이 정확히 `mcp.json`인지 확인 (`.txt` 등이 아님)

### 문제 4: Figma에서 MCP 옵션이 보이지 않음

**해결 방법**:
1. **Figma Desktop App 버전 확인**
   - 최신 버전으로 업데이트
   - 구버전에서는 MCP 기능이 없을 수 있음

2. **Dev Mode 계정 확인**
   - 일부 기능은 Dev Mode 계정이 필요할 수 있음
   - Figma 계정 설정에서 Dev Mode 활성화 확인

---

## ✅ 설정 완료 체크리스트

설정이 완료되었는지 확인하기 위한 체크리스트:

- [ ] Figma Desktop App 설치 및 실행
- [ ] Figma Preferences에서 "Enable Dev Mode MCP Server" 활성화
- [ ] `.cursor` 폴더 확인/생성
- [ ] `mcp.json` 파일 생성 및 설정 내용 입력
- [ ] JSON 형식이 올바른지 확인
- [ ] Cursor 완전히 재시작
- [ ] Cursor에서 MCP 서버 연결 상태 확인
- [ ] 실제 사용 테스트 (Figma 디자인 선택 → AI에게 구현 요청)

---

## 📚 참고 자료

### 관련 문서
- [Figma Desktop App 다운로드](https://www.figma.com/downloads/)
- [Cursor IDE 공식 사이트](https://cursor.sh/)
- [Model Context Protocol (MCP) 문서](https://modelcontextprotocol.io/)

### 설정 파일 예시

**전역 설정 파일 위치:**
```
Windows: C:\Users\[사용자명]\.cursor\mcp.json
Mac: ~/.cursor/mcp.json
```

**설정 파일 내용:**
```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

---

## 💡 추가 팁

### 팁 1: 여러 MCP 서버 추가
다른 MCP 서버를 추가하려면 `mcp.json` 파일에 추가하면 됩니다:

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    },
    "other-server": {
      "url": "http://127.0.0.1:8080/mcp"
    }
  }
}
```

### 팁 2: 프로젝트별 설정
프로젝트 루트에 `.cursor/mcp.json` 파일을 생성하면 프로젝트별로 다른 MCP 설정을 사용할 수 있습니다.

### 팁 3: 설정 백업
`mcp.json` 파일을 백업해두면 다른 컴퓨터에서도 동일한 설정을 빠르게 적용할 수 있습니다.

---

**설정이 완료되면 Figma 디자인을 선택하고 Cursor AI에게 "구현해줘"라고 요청하면 자동으로 코드가 생성됩니다!** 🚀

