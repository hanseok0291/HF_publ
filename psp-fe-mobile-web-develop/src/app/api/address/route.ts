import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // URL 인코딩된 데이터 처리 (UTF-8)
    const text = await req.text();
    const searchParams = new URLSearchParams(decodeURIComponent(text));

    // searchParams를 객체로 변환
    const data: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      data[key] = decodeURIComponent(value);
    });

    // 주소 데이터 검증
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    // 부모 창으로 전달할 데이터 구성
    const responseScript = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <script>
            const data = ${JSON.stringify(data, null, 2)};
            if (window.opener) {
              window.opener.postMessage(data, "${process.env.NEXT_PUBLIC_BASE_URL || "*"}");
              window.close();
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(responseScript, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8"
      }
    });
  } catch (error) {
    console.error("Address processing error:", error);
    return NextResponse.json(
      {
        error: "Failed to process address",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const data: Record<string, string> = {};

    // 모든 검색 파라미터를 객체로 변환 (UTF-8)
    searchParams.forEach((value, key) => {
      data[key] = decodeURIComponent(value);
    });

    // 파라미터 검증
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // 주소 팝업에서 돌아왔을 때 처리할 HTML 반환
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <script>
            const data = ${JSON.stringify(data, null, 2)};
            if (window.opener) {
              window.opener.postMessage(data, "${process.env.NEXT_PUBLIC_BASE_URL || "*"}");
              window.close();
            }
          </script>
        </body>
      </html>
    `;

    // UTF-8 설정과 함께 응답 반환
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8"
      }
    });
  } catch (error) {
    console.error("Address processing error:", error);
    return NextResponse.json(
      {
        error: "Failed to process address",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
