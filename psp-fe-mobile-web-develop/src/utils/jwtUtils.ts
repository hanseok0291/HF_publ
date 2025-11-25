import { AccessTokenPayload } from "@/types/components/common/CommonComponents.type";
import CryptoJS from "crypto-js";

/**
 * JWT 서명 검증 함수
 * @param token - 검증할 JWT
 * @param secretKey - 서명 검증에 사용할 비밀 키
 * @returns 서명 검증 결과 (true: 유효, false: 무효)
 */
export function verifyJWT(
  token: string,
  secretKey: string
): {
  isValid: boolean;
  header: { alg: "HS512" };
  payload: AccessTokenPayload;
} {
  // 1. JWT 분리
  const splitedToken = token.split(".");
  if (splitedToken.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const [header, payload, signature] = splitedToken;

  // 2. HMAC Input: "header.payload"
  const hmacInput = `${header}.${payload}`;

  // 3. 비밀 키: Base64로 인코딩
  const base64EncodedSecretKey = Buffer.from(secretKey, "utf-8").toString(
    "base64"
  );

  // 4. HMAC-SHA512 계산
  const hmac = CryptoJS.HmacSHA512(hmacInput, base64EncodedSecretKey);
  // URL-safe Base64 변환
  const calculatedSignature = CryptoJS.enc.Base64.stringify(hmac)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // 5. 서명 비교
  const isSignatureValid = calculatedSignature === signature;

  // 6. 헤더와 페이로드 디코딩
  const decodedHeader = JSON.parse(
    Buffer.from(header, "base64").toString("utf-8")
  );
  const decodedPayload = JSON.parse(
    Buffer.from(payload, "base64").toString("utf-8")
  );

  return {
    isValid: isSignatureValid,
    header: decodedHeader,
    payload: decodedPayload
  };
}
