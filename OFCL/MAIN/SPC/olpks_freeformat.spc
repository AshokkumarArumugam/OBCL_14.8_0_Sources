CREATE OR REPLACE PACKAGE olpks_freeformat
AS
/*---------------------------------------------------------------------------------------------
**
** File Name	: olpks_freeformat.SPC
**
** Module		: MESSAGING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------
*/
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Change History~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
06-JUN-2005	FCC 4.6.2, Suraj, CITI LS changes, new package SPEC added.
		A new package being created for sending free format messages for multiple
		participants. A new form is also being developed for this purpose.
06-Jan-2006 FLEXCUBE V.CL Release 7.0 FFT changes by Aarthi 
		Added new functions fn_import_free_format, fn_gen_fft_adv and fn_adv_gen to generate normal advices
		through free format messages.
10-Mar-2006 FLEXCUBE V.CL Release 7.0 FFT Bug Fix by Aarthi
		Added a new function Fn_ffmt_auth_1 to handoff the messages at the time of authorization.
25-JUN-2007 FCC V.CL Release 7.3 tuning changes
03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas 
28-dec-2007 FCC V.CL Release 7.3 ITR2,SFR#26,retro changes,CITIUS-LS#727,On generating Free Format Message for Borrower system is generating Free format message eevnt (ZFMG) event for participants also
20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes,added 2 functions for message generation

  **  Modified By     : Pallavi R
  **  Modified On     : 28-Oct-2024
  **  Modified Reason : User was not able to capture Free Format messages for customers/Hold contracts.
  **  Search String   : OBCL_14.7_RABO_#36819729 Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
pkg_gtemp_populated	VARCHAR2(1) := 'N';--25-JUN-2007 FCC V.CL Release 7.3 tuning changes

FUNCTION fn_populate_msg_out(P_FfmtRefNo	IN		oltbs_ffmt_msg.FFMT_REF_NO%TYPE,
				     P_ContRefNo	IN		oltbs_ffmt_msg.contract_ref_no%TYPE,
				     P_ActionCode	IN		varchar2,
				     P_ErrCode	IN OUT	varchar2,
				     P_ErrParam	IN OUT	varchar2)
RETURN BOOLEAN;

FUNCTION fn_authorize_message(P_FfmtRefNo	IN		oltbs_ffmt_msg.FFMT_REF_NO%TYPE,
				     P_ContRefNo	IN		oltbs_ffmt_msg.contract_ref_no%TYPE,
				     P_AuthDate	IN		varchar2,
				     P_ErrCode	IN OUT	varchar2,
				     P_ErrParam	IN OUT	varchar2)
RETURN BOOLEAN;

FUNCTION fn_ffmt_authorize(P_FfmtRefNo	IN		oltbs_ffmt_msg.FFMT_REF_NO%TYPE,
				   P_ContRefNo	IN		oltbs_ffmt_msg.contract_ref_no%TYPE,
				   P_AuthDate	IN		varchar2,
				   P_diaesn		IN		number,
				   P_diaessn	IN		number,
				   P_ErrCode	IN OUT	varchar2,
				   P_ErrParam	IN OUT	varchar2)
RETURN BOOLEAN;

Function fn_freeformat1(p_module		IN		varchar2,
				p_ref_no 		IN 		varchar2,
				p_ffmt_ref_no	IN		varchar2,
				p_Counterparty	IN		varchar2,
				p_message 		IN OUT 	varchar2,
				p_diaesn		IN		number,
				p_diaessn		IN		number)
RETURN BOOLEAN;

--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas starts
FUNCTION Fn_Deladvfrmt

	(
		p_ffmt_ref_no     IN VARCHAR2
	)
	 
RETURN BOOLEAN ;
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas ends

FUNCTION fn_copy_ffmt_mesg(P_new_ffmt_ref_no	IN		varchar2
				  ,P_old_ffmt_ref_no	IN		varchar2
				  ,P_error_code		IN OUT	varchar2)
RETURN BOOLEAN;

FUNCTION fn_delete_ffmt_mesg(P_FfmtRefNo	IN		varchar2
				    ,P_ContRefNo	IN		varchar2)
RETURN BOOLEAN;

FUNCTION fn_trigger_ZFMG_event(P_ContRefNo	IN		oltbs_contract.contract_ref_no%TYPE
					,P_FfmtRefNo	IN		oltbs_ffmt_msg.FFMT_REF_NO%TYPE	--28-dec-2007 FCC V.CL Release 7.3 ITR2,SFR#26,retro changes,CITIUS-LS#727 
					,P_ErrCode		IN OUT	varchar2
					,P_ErrParam		IN OUT	varchar2)
RETURN BOOLEAN;


--FLEXCUBE V.CL Release 7.0 FFT changes by Aarthi start
Function fn_import_free_format(p_contract_ref_no IN varchar2,
                                 p_ffmt_ref_no     IN varchar2,
                                 p_err_code        IN OUT varchar2,
                                 p_err_params      IN OUT varchar2)
RETURN BOOLEAN;

FUNCTION fn_gen_fft_adv(P_dly_out  IN OUT oltbs_dly_msg_out%rowtype,
                          P_ErrCode  IN OUT varchar2,
                          P_ErrParam IN OUT varchar2) 
RETURN BOOLEAN;

FUNCTION fn_adv_gen(p_contract_ref_no IN varchar2,
                      p_ffmt_ref_no     IN varchar2,
                      p_action_code     IN varchar2,
                      p_esn             IN number,
                      p_dcns            OUT varchar2,
                      p_count_dcn       OUT number,
                      p_err_code        IN OUT varchar2,
                      p_err_params      IN OUT varchar2) 
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 FFT changes by Aarthi end

--FLEXCUBE V.CL Release 7.0 FFT Bug Fix by Aarthi starts
FUNCTION Fn_ffmt_auth_1 
		(p_contract_ref_no IN varchar2,
             p_ffmt_ref_no     IN varchar2,
             p_err_code        IN OUT varchar2,
             p_err_params      IN OUT varchar2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 FFT Bug Fix by Aarthi ends
--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes start
FUNCTION fn_populate_participants
							(
								p_counterparty			IN		oltbs_ffmt_msg.counterparty%TYPE	
								,p_ffmt_ref_no			IN		oltbs_ffmt_msg.ffmt_ref_no%TYPE
								,p_ref_no				IN		oltbs_ffmt_msg.contract_ref_no%TYPE
								,p_billing_date			IN		DATE
								,p_error_code	IN OUT	VARCHAR2
								,p_error_param	IN OUT	VARCHAR2
							)
RETURN BOOLEAN;
FUNCTION fn_populate_entity_details
								(	
									p_ffmt_ref_no			IN		oltbs_ffmt_msg.ffmt_ref_no%TYPE
									,p_ref_no				IN		oltbs_ffmt_msg.contract_ref_no%TYPE
									,p_receiver_type		IN 		VARCHAR2
									,p_entity_type			IN		OLTM_CUSTOMER_ENTITY_DETAILS.entity_type%TYPE
									,p_error_code			IN OUT	VARCHAR2
									,p_error_param			IN OUT	VARCHAR2
								)
RETURN BOOLEAN;
--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes end
  --OBCL_14.7_RABO_#36819729 Changes starts
  FUNCTION Fn_Backup_Restore_Hold_Zfmg(p_Contract_Ref IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.7_RABO_#36819729 Changes ends
END olpks_freeformat;
/
CREATE or replace SYNONYM olpkss_freeformat FOR olpks_freeformat
/
