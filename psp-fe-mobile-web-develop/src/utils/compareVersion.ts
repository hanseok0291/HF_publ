export type CompareVersionType = {
  appVersion: string; // 앱 버전
  requireVersion: string; // 요구 버전
};

export type AppInfoType = {
  osPlatform: string; // 앱 운영체제 정보
  appVersion: string; // 앱 버전 정보
};

/**
 * 두 개의 버전 문자열을 비교
 * @param compareVersion 앱 및 타겟 버전 정보
 * @returns {number} 1 : 앱 버전이 더 높은 상태, -1 : 앱 버전이 더 낮은 상태, 0 : 버전 일치
 */
export const compareVersions = (compareVersion: CompareVersionType): Number => {
  const arrAppVer = compareVersion.appVersion.split(".").map(Number);
  const arrRequireVer = compareVersion.requireVersion.split(".").map(Number);

  const maxLength = Math.max(arrAppVer.length, arrRequireVer.length);

  for (let i = 0; i < maxLength; i++) {
    const ver1 = arrAppVer[i] || 0;
    const ver2 = arrRequireVer[i] || 0;

    if (ver1 > ver2) {
      return 1;
    } else if (ver1 < ver2) {
      return -1;
    }
  }
  return 0;
};

/**
 * 두 개의 버전을 비교하여 요구하는 버전보다 낮은지 확인
 * @param compareVersion 앱 및 타겟 버전 정보
 * @returns {boolean} true : 요구하는 버전 보다 낮은 경우, false : 요구하는 버전보다 높거나 같은 경우
 */
export const isLowAppVersion = (
  compareVersion: CompareVersionType
): boolean => {
  return compareVersions(compareVersion) === -1;
};

/**
 * 앱 정보 가져오기
 * @returns {AppInfoType} 앱 OS, 버전 정보
 */
export const getAppInfo = (): AppInfoType => {
  const userAgent = navigator.userAgent;
  const versionRegex = /GreenOneApp_(android|ios)_(\d+\.\d+(\.\d+)?)/;
  let info: AppInfoType = {
    osPlatform: "",
    appVersion: ""
  };

  if (versionRegex.test(userAgent)) {
    const match = userAgent.match(versionRegex);
    if (match) {
      if (match[1]) {
        info = {
          ...info,
          osPlatform: match[1]
        };
      }

      if (match[2]) {
        info = {
          ...info,
          appVersion: match[2]
        };
      }
    }
  }
  return info;
};
