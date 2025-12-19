# Figma MCP 서버 연결 설정

## MCP 서버 주소
```
http://127.0.0.1:3845/mcp
```

## Cursor에서 MCP 서버 연결 방법

### 방법 1: Cursor 설정 UI 사용
1. Cursor를 열고 `Ctrl + ,` (또는 `Cmd + ,` on Mac)로 설정을 엽니다
2. 검색창에 "MCP" 또는 "Model Context Protocol"를 입력합니다
3. MCP 설정 섹션에서 서버 추가 버튼을 클릭합니다
4. 다음 정보를 입력합니다:
   - **이름**: Figma MCP Server
   - **URL**: http://127.0.0.1:3845/mcp
   - **Transport**: SSE (Server-Sent Events)

### 방법 2: 설정 파일 직접 수정 (Windows)
1. 다음 경로의 설정 파일을 찾습니다:
   ```
   %APPDATA%\Cursor\User\settings.json
   ```
   또는
   ```
   %APPDATA%\Cursor\User\globalStorage\mcp-settings.json
   ```

2. 다음 JSON을 추가합니다:
```json
{
  "mcp.servers": {
    "figma": {
      "url": "http://127.0.0.1:3845/mcp",
      "transport": "sse"
    }
  }
}
```

### 방법 3: 환경 변수 사용
시스템 환경 변수에 다음을 추가:
- 변수명: `MCP_FIGMA_URL`
- 변수값: `http://127.0.0.1:3845/mcp`

## Figma에서 MCP 서버 활성화
1. Figma 데스크톱 앱을 엽니다
2. Dev Mode로 전환 (`Shift + D`)
3. 검사 패널에서 "MCP 서버 활성화"를 클릭합니다
4. 서버가 `http://127.0.0.1:3845/mcp`에서 실행되는지 확인합니다

## 연결 확인
Cursor에서 MCP 서버가 연결되었는지 확인하려면:
1. Cursor 설정에서 MCP 서버 목록을 확인합니다
2. Figma 디자인 파일을 열고 Dev Mode에 있는지 확인합니다
3. Cursor에서 Figma 관련 명령어를 사용해 봅니다

