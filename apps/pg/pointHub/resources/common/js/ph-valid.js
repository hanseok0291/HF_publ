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
 * lys               2018.07.07        공통 유효성 체크 
 */
PHValid = function(){};

/**
* 숫자만입력 체크
* @param
* @return boolean
* @create 2018.07.07
*/
PHValid.prototype.number = function(val) {
	var pattern = /[^0-9]/g;
	var chkVal = PHUtil.replaceAll(PHUtil.nvl(val, this.val), ',', '');
   
	if (pattern.exec(chkVal) == null) {
		return true;
	} else {
		return false;
	}
};

/**
 * 날짜 정합성체크
 * @param
 * @return boolean
 * @create 2018.07.07
 */
PHValid.prototype.date = function(val) {
    
    var pattern = /^(\d{4})(\d{2})/;
    var chkVal = PHUtil.nvl(val, this.val);
    var currDate = chkVal.split(pattern).join("-").replace("-", "");
    //PHFnc.log("[PHValid.date]currDate="+currDate);
    try {
        $.datepicker.parseDate('yy-mm-dd', currDate);
        if(chkVal.length != 8) return false;
        return true;
    } catch (error) {
    	PHFnc.log(error.message);
        return false;
    }
};


/**
* PHValid Class 생성
* @param 
* @return
*/
var PHValid = new PHValid();

