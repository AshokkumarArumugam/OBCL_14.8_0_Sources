create or replace package olpk_iban
as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpk_iban
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
Copyright © 1997-2001 by i-flex solutions limited.
----------------------------------------------------------------------------------------------------
  
/*
CHANGE_HISTORY

30-Oct-2001, Flexcube v3.8, 	IBAN Changes for CITI-Poland, Added function to compute check digit for IBAN. Input will
					be bank code || account number.
  Changed By         : Revathi Dharmalingam
  Changed On         : 28-Oct-2024
  Search String      : OBCL_14.7_Support_Bug#37061922_Changes     
  Change Reason      : Added code to validate the ultimate benficiary 1 has valid IBAN format before passing in the SPS request.
CHANGE_HISTORY
*/


FUNCTION fn_gen_account_no_validation(
					p_account_no	IN		 VARCHAR2,		
					p_err_code		IN OUT ertb_msgs.err_code%TYPE  	
					   	  )
RETURN boolean;

-- 30-Oct-2001, Flexcube v3.8, IBAN Changes for CITI-Poland, Start

Function Fn_IBAN_Check_Digit_Gen(
						p_AccountNo 	In 	 Varchar2,
						p_CheckDigit 	In Out Varchar2,
						p_ErrCode   	In Out Varchar2
					  )
Return Boolean;

-- 30-Oct-2001, Flexcube v3.8, IBAN Changes for CITI-Poland, End
--OBCL_14.7_Support_Bug#37061922_Changes Starts
g_swift_2013 VARCHAR2(1) :='N';
FUNCTION fn_validate_checksum(
						p_iban_no			IN 	   VARCHAR2,
						P_swift_iban_plus 	IN 	   VARCHAR2,
						p_ErrCode   		IN OUT VARCHAR2,
						p_err_param 		IN OUT VARCHAR2
					  )
RETURN BOOLEAN;

FUNCTION fn_validate_national_id(
						p_iban_no	IN 	   VARCHAR2,
						p_ErrCode   IN OUT VARCHAR2,
						p_err_param IN OUT VARCHAR2
					  )
RETURN BOOLEAN;

FUNCTION fn_validate_iban(p_iban_no					IN		VARCHAR2,
						  p_validate_checksum		IN  	VARCHAR2,
						  p_validate_national_id	IN		VARCHAR2,
						  p_err_code 				IN OUT 	VARCHAR2,
						  p_err_param				IN OUT 	VARCHAR2
						)
RETURN BOOLEAN;
--OBCL_14.7_Support_Bug#37061922_Changes Ends
end olpk_iban;
/
create or replace synonym olpks_iban for olpk_iban
/
