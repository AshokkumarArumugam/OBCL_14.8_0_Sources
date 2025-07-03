CREATE OR REPLACE PACKAGE olpks_date AS

-- OBJECT : olpks_date               DATE /TIME : 19-NOV-96

			   /********************  CHANGE_HISTORY   *******************************
			   * Date of change  :14/12/99				                   *
			   * Release number  :1.2 					                         *
		 	   * AEDADCB Til 58  :Added New Function to get spot date given currency *
			   *			    and date			                         *
			   **********************************************************************/
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_date.SPC
**
** Module       : CORE SERVICES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
  
       Changed By         : ANUSHA K
       Date               : 27-Feb-2019
       Change Description : Penal Batch taking long time(FWD PORT OF 29367843)
       Search String      : OBCL_14.2_SUPP_#29415669   Changes
       
        **Changed By         : Kavitha N
        **Date               : 17-Dec-2019
        **Change Description : Changes done for Finnacial Centre Holiday Treatment
        **Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes  
  ----------------------------------------------------------------------------------------------------
  */

  --OBCL_14.2_SUPP_#29415669   Changes
  TYPE Ty_Date_List IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
  g_Date_List Ty_Date_List;
  --OBCL_14.2_SUPP_#29415669   Changes

---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getcurrwday(
			fpBranch		IN VARCHAR2
		)
RETURN DATE;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getprevwday(
			fpBranch		IN VARCHAR2
		)
RETURN DATE;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getnextwday(
			fpBranch		IN VARCHAR2
		)
RETURN DATE;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_days_in_year(
			year		IN NUMBER
		)
RETURN NUMBER;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_days_in_month(
			p_year		IN NUMBER,
			p_month 	IN NUMBER
		)
RETURN NUMBER;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_isleapyear(
			p_year		IN NUMBER
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_isholiday(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
			test_date	IN DATE,
			result		OUT VARCHAR2
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_isholidaylist
(				p_calendar_type		IN VARCHAR2,
				p_calendar_key_list	IN VARCHAR2,
				p_basis_date		IN DATE,
				p_result		IN OUT VARCHAR2
)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_formdate(
			day		IN NUMBER,
			month		IN NUMBER,
			year		IN NUMBER,
			formed_date	OUT DATE
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_isvalidperiod(
			period		IN VARCHAR2
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getperiod(
			period		IN VARCHAR2
		)
RETURN NUMBER;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_splitdate(
			test_date	IN DATE,
			day		OUT NUMBER,
			month		OUT NUMBER,
			year		OUT NUMBER
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getworkingday(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
			src_date	IN DATE,
			next_prev	IN VARCHAR2 DEFAULT 'N',
			offset		IN NUMBER DEFAULT 1
		)
RETURN DATE;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getworkingday
			(
			calendar_type		IN 	VARCHAR2,
			calendar_key		IN 	VARCHAR2,
			src_date			IN 	DATE,
			next_prev			IN 	VARCHAR2 DEFAULT 'N',
			offset				IN 	NUMBER DEFAULT 1,
			lower_limit_date	IN	DATE,
			upper_limit_date	IN	DATE,
			past_limit			OUT	BOOLEAN
			)
RETURN DATE;

--------------------------------------------------------------------------------------------------------------------------
 --OBCL_12.5.0.0.0 Interest Method start
FUNCTION fn_get_working_Days(calendar_type		IN	VARCHAR2,
					                   calendar_key		IN	VARCHAR2,
                               p_from_date    IN DATE
                              ,p_to_date      IN DATE
                              ,p_working_days OUT NUMBER) RETURN BOOLEAN;
 --OBCL_12.5.0.0.0 Interest Method end
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_addperiod(
			src_date	IN DATE,
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
			period		IN VARCHAR2,
			units		IN NUMBER,
			anniv_day	IN NUMBER DEFAULT 0,
       		       	next_prev	IN VARCHAR2 DEFAULT 'S' ,
			month_boundary	IN VARCHAR2 DEFAULT 'N',
   		   	resultant_date	IN OUT DATE
		)
RETURN BOOLEAN;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_isweop(
			calendar_type   IN VARCHAR2,
			calendar_key	IN VARCHAR2,
	               	p_in_dt		IN DATE,
		  	p_period	IN VARCHAR2
		)
RETURN boolean;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_iswbop(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
	   		p_in_dt		IN DATE,
			p_period	IN VARCHAR2
		)
RETURN boolean;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION 	fn_isceop(
			p_in_dt		IN DATE,
			p_period	IN VARCHAR2
		)
RETURN boolean;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION 	fn_iscbop(
			p_in_dt		IN DATE,
			p_period	IN VARCHAR2
		)
RETURN boolean;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION 	fn_getweop(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
			p_in_dt		IN DATE,
			p_period	IN VARCHAR2
		)
RETURN date;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION 	fn_getwbop(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
			p_in_dt		IN DATE,
			p_period	IN VARCHAR2
		)
RETURN date;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION 	fn_getceop(
			p_in_dt		IN DATE,
			tmp_period	IN VARCHAR2
		)
RETURN date;
---------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_getcbop(
			p_in_dt		IN DATE,
			tmp_period	IN VARCHAR2
		)
RETURN date;
---------------------------------------------------------------------------------------------------------------------------

-- AEDADCB TIL 58: Added New Function to get spot date given currency and date

FUNCTION FN_SPOT_DATE(
			P_CCY VARCHAR2,
			P_DATE DATE
		)
RETURN DATE;
-- AEDADCB TIL 58: End of Changes.

-- FCC 4.5 LOT1 FAST CHANGES STARTS
---------------------------------------------------------------------------------------------------------------------------

FUNCTION	fn_get_period_end_date
	(
	p_application_date   IN       DATE,
	p_period_end_date    OUT      DATE,
	p_error_code         IN OUT   VARCHAR2
	)
RETURN BOOLEAN;

-- FCC 4.5 LOT1 FAST CHANGES ENDS

-- FCC 4.6.2 CITI LS CHANGES START BY KISHORE ON 03.07.05

FUNCTION fn_getworkingday_mccy
				(

				calendar_type		IN	VARCHAR2,
				p_ccy_list		IN	VARCHAR2,
				p_branch_holiday	IN	VARCHAR2,
				src_date		IN	DATE,
				next_prev		IN	VARCHAR2 DEFAULT 'N',
				offset			IN	NUMBER DEFAULT 1,
				lower_limit_date	IN	DATE,
				upper_limit_date	IN	DATE,
				past_limit		OUT	BOOLEAN
				--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
				,p_fincentre     IN VARCHAR2 DEFAULT NULL
				--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
				)

				RETURN DATE ;

FUNCTION fn_isholiday_mccy	(
				calendar_type		IN 	VARCHAR2,
				p_ccy_list		IN 	VARCHAR2,
				p_branch_holiday	IN  	VARCHAR2,
				test_date		IN 	DATE,
				p_result		OUT 	VARCHAR2
                                --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
				,p_fincentre     IN VARCHAR2 DEFAULT NULL
				--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
				)
				RETURN BOOLEAN ;
-- FCC 4.6.2 CITI LS CHANGES END BY KISHORE ON 03.07.05
--Bug#31517149 start
FUNCTION	fn_ismonthlastworkingday(
			calendar_type	IN VARCHAR2,
			calendar_key	IN VARCHAR2,
            src_date			IN	DATE
		)
RETURN boolean;
--Bug#31517149 End

---------------------------------------------------------------------------------------------------------------------------
END olpks_date;
/
---------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE SYNONYM olpkss_date FOR olpks_date
/