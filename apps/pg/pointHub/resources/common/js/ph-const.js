/**
 * Copyright (c) 2018 KT, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of KT,
 * Inc. You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with KT.
 *
 * Revision History
 * Author            Date              Description
 * ------            -----             ------------
 * lys               2018.07.07        공통상수관리 
 */
PHConst = function(){};

// 시스템
PHConst.prototype.MANUAL = "MANUAL";

//세션타임아웃 시간 설정
PHConst.prototype.SESSION_LIMIT_TIME   = (1000 * 60) * 10;
PHConst.prototype.SESSION_CONFIRM_TIME = (1000 * 60) * 8;
PHConst.prototype.SESSION_CHECK_URL = "/common/dummy.do";
PHConst.prototype.RETURN_URL_2 = "https://pg.settlebank.co.kr/point/ClipPointResult.do";

//클래스 생성
var PHConst = new PHConst();