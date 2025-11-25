import {
  WebViewData,
  WebViewMessage,
  WebViewMessageType
} from "@/types/WebViewType";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    receiveReactNativeMessage?: (message: string) => void;
  }
}

export const isWebView = (): boolean => {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
};

export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isSafari = (): boolean => {
  return (
    /Safari/i.test(navigator.userAgent) &&
    !/Chrome|Edg/i.test(navigator.userAgent)
  );
};

export const isEdge = (): boolean => {
  return /Edg(e|A|iOS)?\/\d+/.test(navigator.userAgent);
};

export const isiOS = (): boolean => {
  return /(iPhone|iPad)/i.test(navigator.userAgent);
};

export const handleOpenWindowCallApp = async (
  webViewData: WebViewData
): Promise<Boolean> => {
  if (isWebView()) {
    const message: WebViewMessage = {
      type: WebViewMessageType.Enum.OPEN_WINDOW,
      data: webViewData
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
    return true;
  }
  return false;
};

export const handleCloseWindowCallApp = async (): Promise<Boolean> => {
  if (isWebView()) {
    const message: WebViewMessage = {
      type: WebViewMessageType.Enum.CLOSE_WINDOW
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
    return true;
  }
  return false;
};

export const handleFileDownload = async (
  blob: Blob,
  filename: string,
  contentType: string
): Promise<void> => {
  if (isWebView()) {
    // 웹뷰
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const message: WebViewMessage = {
          type: WebViewMessageType.Enum.DOWNLOAD,
          data: {
            content: reader.result as string,
            filename: filename,
            contentType: contentType
          } as WebViewData
        };

        window.ReactNativeWebView?.postMessage(JSON.stringify(message));
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("파일 저장 처리 중 오류:", error);
      toast({
        title: "파일 저장 처리 오류",
        description: "파일이 유효하지 않습니다."
      });
    }
  } else {
    // 브라우저
    try {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 저장 처리 중 오류:", error);
      toast({
        title: "파일 저장 처리 오류",
        description: "파일이 유효하지 않습니다."
      });
    }
  }
};

export const handleLoginRoleCallApp = async (
  webViewData: WebViewData
): Promise<Boolean> => {
  if (isWebView()) {
    const message: WebViewMessage = {
      type: WebViewMessageType.Enum.LOGIN_ROLE,
      data: webViewData
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
    return true;
  }
  return false;
};
