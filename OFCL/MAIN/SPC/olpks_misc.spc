CREATE OR REPLACE PACKAGE olpks_misc AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_misc.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History
04-04-2002 ASPAC FCC 4.0 june 2002	Holiday Handling to include Branch Holiday Checking.
						Added a function called fn_isholiday.The function determines whether the given date 
						is a holiday or not based on the holiday_check ie the holiday can be currency holiday 
						or the branch holiday or  both.
						Added a function fn_get_workingday to the working day based on the holiday_check.
12-MAR-2003 FCC 4.2 Apr 2003 LS changes for holiday treatment. Added an overloaded function fn_isholiday.
21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag5 Changes, holiday currency changes for deposits
17-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#17 Changes, settlement days changes for TD
27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5180 Changes : New function fn_apply_settle_Days is added.
27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5195 Changes : New function fn_validate_rate_code is added.
30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes ADDED NEW overloaded function  fn_apply_settle_Days 
--06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
  **Changed By         : Kavitha N
  **Date               : 17-Dec-2019
  **Change Description : Changes done for Finnacial Centre Holiday Treatment
  **Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes  
  **Changed By         : Mohan Pal/Navoneel Nandan
  **Date               : 18-Jul-2023
  **Change Description : FWDPORT of Bug#34818977 Changes done for Non STANDARD Currency Exchange Rates
  **Search String      : Bug#35572733
------------------------------------------------------------------------------------------------------------------
*/



Function fn_amt1_to_amt2
						(
						PBRANCH		IN			oltms_branch.BRANCH_CODE%TYPE,
						PCCY1			IN			CYTMS_CCY_DEFN.CCY_CODE%TYPE,
						PCCY2			IN			CYTMS_CCY_DEFN.CCY_CODE%TYPE,
						PAMOUNT1		IN			NUMBER,
						PROUNDING	IN			CHAR, 
						PAMOUNT2		OUT		NUMBER,
						PRATE			IN	OUT	CYTMS_RATES.MID_RATE%TYPE,
						PERRORCODE	IN	OUT	ERTBS_MSGS.ERR_CODE%TYPE
						) Return Boolean;
--Bug#35572733 starts
FUNCTION fn_amt1_to_amt2(p_ref_no   IN oltbs_contract.contract_ref_no%TYPE
                        ,pccy1      IN cytms_ccy_defn.ccy_code%TYPE
                        ,pccy2      IN cytms_ccy_defn.ccy_code%TYPE
                        ,pamount1   IN NUMBER
                        ,prate      IN cytms_rates.mid_rate%TYPE
                        ,prounding  IN CHAR
                        ,pamount2   OUT NUMBER
                        ,perrorcode IN OUT ertbs_msgs.err_code%TYPE
                        ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will send prate as null, if N it will use the one sent as param
                        )
  RETURN BOOLEAN;

FUNCTION fn_amt1_to_amt2(p_ref_no   IN oltbs_contract.contract_ref_no%TYPE
                        ,pbranch    IN sttms_core_branch.branch_code%TYPE
                        ,pccy1      IN cytms_ccy_defn.ccy_code%TYPE
                        ,pccy2      IN cytms_ccy_defn.ccy_code%TYPE
                        ,pamount1   IN NUMBER
                        ,prounding  IN CHAR
                        ,pamount2   OUT NUMBER
                        ,prate      IN OUT cytms_rates.mid_rate%TYPE
                        ,perrorcode IN OUT ertbs_msgs.err_code%TYPE
                        ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will send prate as null, if N it will use the one sent as param
                        )
  RETURN BOOLEAN;

FUNCTION fn_amt1_to_amt2(p_ref_no       IN oltbs_contract.contract_ref_no%TYPE
                        ,pbranch        IN sttms_core_branch.branch_code%TYPE
                        ,pccy1          IN cytms_ccy_defn.ccy_code%TYPE
                        ,pccy2          IN cytms_ccy_defn.ccy_code%TYPE
                        ,pratetype      IN cytms_rate_type.ccy_rate_type%TYPE
                        ,prateindicator IN VARCHAR2
                        ,pamount1       IN NUMBER
                        ,prounding      IN CHAR
                        ,pamount2       OUT NUMBER
                        ,prate          IN OUT cytms_rates.mid_rate%TYPE
                        ,perrorcode     IN OUT ertbs_msgs.err_code%TYPE
                        ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
  RETURN BOOLEAN;

FUNCTION fn_amt1_to_amt2(p_ref_no       IN oltbs_contract.contract_ref_no%TYPE
                        ,pbranch        IN sttms_core_branch.branch_code%TYPE
                        ,pccy1          IN cytms_ccy_defn.ccy_code%TYPE
                        ,pccy2          IN cytms_ccy_defn.ccy_code%TYPE
                        ,pratetype      IN cytms_rate_type.ccy_rate_type%TYPE
                        ,prateindicator IN VARCHAR2
                        ,pamount1       IN NUMBER
                        ,prounding      IN CHAR
                        ,pratedate      IN DATE
                        ,pratesrno      IN cytms_rates.rate_serial%TYPE
                        ,pamount2       OUT NUMBER
                        ,prate          IN OUT cytms_rates.mid_rate%TYPE
                        ,perrorcode     IN OUT ertbs_msgs.err_code%TYPE
                        ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
  RETURN BOOLEAN;
  FUNCTION fn_getRate(p_ref_no    IN oltbs_contract.contract_ref_no%TYPE
                     ,pBranch    IN sttms_core_branch.BRANCH_CODE%TYPE,
                      pCcy1      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pCcy2      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pRate      IN OUT CYTMS_RATES.MID_RATE%TYPE,
                      pRateFlag  IN OUT NUMBER,
                      pErrorCode IN OUT ERTBS_MSGS.ERR_CODE%TYPE
                      ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
    return BOOLEAN;
FUNCTION fn_getRate(p_ref_no    IN oltbs_contract.contract_ref_no%TYPE
                     ,pBranch    IN sttms_core_branch.BRANCH_CODE%TYPE,
                      pCcy1      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pCcy2      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pRateType  IN CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
                      pIndicator IN CHAR,
                      pRate      IN OUT CYTMS_RATES.MID_RATE%TYPE,
                      pRateFlag  IN OUT NUMBER,
                      pErrorCode IN OUT ERTBS_MSGS.ERR_CODE%TYPE
                      ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
    return BOOLEAN;
  

  FUNCTION fn_getRate(p_ref_no    IN oltbs_contract.contract_ref_no%TYPE
                     ,pBranch     IN sttms_core_branch.BRANCH_CODE%TYPE,
                      pCcy1       IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pCcy2       IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pDate       IN DATE,
                      pBranchDate IN DATE,
                      pRate       IN OUT CYTMS_RATES.MID_RATE%TYPE,
                      pRateFlag   IN OUT NUMBER,
                      pErrorCode  IN OUT ERTBS_MSGS.ERR_CODE%TYPE
                      ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
    return BOOLEAN;
  FUNCTION fn_getRate(p_ref_no    IN oltbs_contract.contract_ref_no%TYPE
                     ,pBranch     IN sttms_core_branch.BRANCH_CODE%TYPE,
                      pCcy1       IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pCcy2       IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                      pRateType   IN CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
                      pIndicator  IN CHAR,
                      pDate       IN DATE,
                      pBranchDate IN DATE,
                      pRate       IN OUT CYTMS_RATES.MID_RATE%TYPE,
                      pRateFlag   IN OUT NUMBER,
                      pErrorCode  IN OUT ERTBS_MSGS.ERR_CODE%TYPE
                      ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
    return BOOLEAN;
FUNCTION fn_getrate(p_ref_no    IN oltbs_contract.contract_ref_no%TYPE
                   ,pbranch     IN sttms_core_branch.branch_code%TYPE
                   ,pccy1       IN cytms_ccy_defn.ccy_code%TYPE
                   ,pccy2       IN cytms_ccy_defn.ccy_code%TYPE
                   ,pratetype   IN cytms_rate_type.ccy_rate_type%TYPE
                   ,pindicator  IN CHAR
                   ,pdate       IN DATE
                   ,pbranchdate IN DATE
                   ,pratesrno   IN cytms_rates.rate_serial%TYPE
                   ,prate       IN OUT cytms_rates.mid_rate%TYPE
                   ,prateflag   IN OUT NUMBER
                   ,perrorcode  IN OUT ertbs_msgs.err_code%TYPE
                   ,poverrideparams IN BOOLEAN DEFAULT TRUE--if Y then system will fetch the rate type and indicator from product, if N it will use the one sent as param
                        )
  RETURN BOOLEAN ;

--Bug#35572733 ends

Function fn_GetAvlBal
						(
						pAccBr	IN		oltms_branch.branch_code%Type,
						pAcc		IN		oltb_account.ac_gl_no%Type,
						pBal		OUT	number
						) Return Boolean; 


Function  fn_isholiday
						(
						p_HolidayCheck   	IN  CHAR, 
						p_CalendarKey	IN  VARCHAR2,
						p_TestDate		IN  DATE,
						p_Result		OUT VARCHAR2,
						P_Errcode		OUT 	ERTBS_MSGS.ERR_CODE%TYPE	 		
                                                --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
						,p_fincentre     IN VARCHAR2 DEFAULT NULL
						--OBCL 14.4 Financial Centre based holiday treatment Changes  - Ends
						)Return  Boolean;
-- FCC 4.2 Apr 2003 LS changes start
Function  fn_isholiday
						(
						p_HolidayCheck   	IN  CHAR, 
						p_CalendarKey	IN  VARCHAR2,
						p_CalendarKey1	IN  VARCHAR2,
						p_CalendarKey2	IN  VARCHAR2,
						p_CalendarKey3	IN  VARCHAR2,
						p_TestDate		IN  DATE,
						p_Result		OUT VARCHAR2,
						P_Errcode		OUT 	ERTBS_MSGS.ERR_CODE%TYPE	 		
                                               --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
						,p_fincentre     IN VARCHAR2 DEFAULT NULL
					       --OBCL 14.4 Financial Centre based holiday treatment Changes  - Ends
						)Return  Boolean;

-- FCC 4.2 Apr 2003 LS changes end

FUNCTION fn_getworkingday
						(
						p_HolidayCheck		IN	CHAR,
						p_CalendarKey		IN	VARCHAR2,
						p_SrcDate			IN	DATE,
						p_NextPrev			IN	VARCHAR2 DEFAULT 'N',
						p_offset			IN	NUMBER DEFAULT 1
                                                --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
						,p_fincentre     IN VARCHAR2 DEFAULT NULL
						--OBCL 14.4 Financial Centre based holiday treatment Changes  - Ends
						)Return Date;

FUNCTION fn_getworkingday
						(
						p_HolidayCheck		IN    CHAR, 
						p_CalendarKey		IN	VARCHAR2,
						p_SrcDate			IN	DATE,
						p_NextPrev			IN	VARCHAR2 DEFAULT 'N',
						p_Offset			IN	NUMBER DEFAULT 1,
						p_LowerLimitDate		IN	DATE,
						p_UpperLimitDate		IN	DATE,
						p_PastLimit			OUT	BOOLEAN	
                                                --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
						,p_fincentre     IN VARCHAR2 DEFAULT NULL
						--OBCL 14.4 Financial Centre based holiday treatment Changes  - Ends
						) Return Date;

--21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag5 Changes - Start
FUNCTION fn_getworkingday
				(
				p_HolidayCheck		IN    CHAR,
				p_CalendarKey		IN	VARCHAR2,
				p_SrcDate			IN	DATE,
				p_NextPrev			IN	VARCHAR2 DEFAULT 'N',
				p_Offset			IN	NUMBER DEFAULT 1,
				p_LowerLimitDate		IN	DATE,
				p_UpperLimitDate		IN	DATE,
				p_settle_day_ccy		IN	VARCHAR2,--17-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#17 Changes
				p_contract_ccy		IN	VARCHAR2,
				p_local_ccy			IN	VARCHAR2,
				p_PastLimit			OUT	BOOLEAN
                                --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
				,p_fincentre     IN VARCHAR2 DEFAULT NULL
				--OBCL 14.4 Financial Centre based holiday treatment Changes  - Ends
				)
RETURN DATE;
--21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag5 Changes - End
--27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5180 Changes START
FUNCTION fn_apply_settle_Days
				(
				 p_contract_Ref_no   IN     oltbs_contract.contract_ref_no%type,
				 p_ccy       	     IN     VARCHAR2
				)
RETURN DATE;
--27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5180 Changes END

--27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5195 Changes START
FUNCTION fn_validate_rate_code
			(p_ratecode IN LFTM_PRODUCT_ICCF.fixed_rate_code%TYPE)
RETURN BOOLEAN;
--27-JAN-2011 Flexcube V.CL Release 7.9, CITIPBG Retro, TILL#5195 Changes END

--30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes start
FUNCTION fn_apply_settle_Days
	(
	 p_book_Date   		IN     Date,
	 p_ccy       		IN     VARCHAR2
	)

RETURN Date;
--30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes end

END olpks_misc;

/
create or replace synonym olpkss_misc for olpks_misc
/