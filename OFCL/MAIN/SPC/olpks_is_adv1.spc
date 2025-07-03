CREATE OR REPLACE PACKAGE olpks_is_adv1
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_is_adv1.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
/*
Change History
16-apr-2002 function fn_mt103p is added for generating MT103+
27-May-2002 FCC4.0 June-2002 new functions fn_validate_103,fn_validate_103+,fn_check_103p_reqd ,fn_check_prod_103p_reqd added  
16-June-2002 FCC4.0 June-2002 ITR1 fix - resolve receiver address
18-02-2003 FCC4.2 April 2003 A New message type RQST_FOR_CANC added to generate 192/292 Swift message on reversal of the contract.
				     A new function fn_mtn92 is added to generate above message type.
				     A global variable g_generate_n92_msg  is added .
				     Functions fn_reset_n92_gen_flag and fn_set_n92_gen_flag added to update value of global variable g_generate_n92_msg.
15-aug-2003 fcc 4.3 aug 2003 changes 

21-JUN-2004 FCC 4.6 SEP 2004 HUFCITI TIL#1052 NEW FN ADDED THIS IS REQUIRED IN COVER FN AS WELL
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO MOVED 
            MOVED CREATE COMMAND BELOW CHANGE HISTORY AND CHANGED COPYRIGHT CLAUSE
06-NOV-2008 CITIUS-LS#SRT1451 PLC46120040,STP Consolidation,By Swapnasish,Missing retro PLC40706004 added
					15-DEC-2004	PLC40706004
					1. Changes related to Charges in the SPGT, TEI handoffs.  When Charge is borne by the Beneficiary,
					the Cr Amount should be reduced by Charge + Tax rather than by just the Charge Amount.
					For this change, a generic function to compute Tax is added in olpks_is_adv1 (isadv2.sql).  As well,
					a change is made in the current MT103 function to use the new fn_compute_taxes function to
					get the tax amount rather than doing a separate select.
					2. Added Sho err at the end of the package body
					3. Moved the Create or Replace Package clause before the COPYRIGHT clause and CHANGE HISTORY.
					4. All occurences of Ampersand replaced by AND

06-NOV-2008 CITIUS-LS#SRT1451 PLC46020120,STP Consolidation,By Swapnasish,Included a new function to move the call to the server side rather than at the client side.
					Moved the call fn_validate_msg_gen from client side to the server side,

26-FEB-2009 FCC V.CL Release 7.5  CITIUS RETRO  CITIUS-LS#5337, Invalid correction
	  SFR Number         :29959798
	  Changed By         :Jayaram Namburaj
	  Change Description :SLT-ClearPar_Reference_in_Trades
	  Search String      :Bug#29959798
*/				     		


FUNCTION Fn_mt100 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT 	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;

FUNCTION Fn_mt200 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;

FUNCTION Fn_mt202 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;

-- FCC3.7 Changes Srihari

FUNCTION Fn_mt103 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_istbs_msgho_rec IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;
		
-- HUFCITI TIL#1052 CHANGES START
FUNCTION fn_get_charges
		(
		p_istbs_msgho_rec	IN		oltbs_msgho%Rowtype,
		p_type		IN		VARCHAR2,
		p_chg			OUT		oltbs_daily_log_ac.LCY_AMOUNT%TYPE,
		p_err_code 		IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;
-- HUFCITI TIL#1052 CHANGES END	
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46120040 Start By Swapnasish
/*
FUNCTION	fn_get_taxes
			(
			p_istbs_msgho_rec		IN          oltbs_msgho%ROWTYPE,
			p_component			IN		txtbs_txnrule.basis_amount_tag%TYPE,
			p_tax_amount		OUT         txtbs_txnrule_detail.amount%TYPE,
			p_err_code			IN OUT      VARCHAR2
			)
			RETURN BOOLEAN;
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46120040 End By Swapnasish
*/
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
g_allow71F 			NUMBER(1);
g_allow71G 			NUMBER(1);
g_allow33B 			NUMBER(1);
g_allow56A 			NUMBER(1);
g_allow23E 			NUMBER(1);
g_allow59A 			NUMBER(1);
g_allow77T 			NUMBER(1);
g_allow70  			NUMBER(1);
g_allow53A 			NUMBER(1);
g_allow54A 			NUMBER(1);
g_allow57A 			NUMBER(1);

-- FCC3.7 Changes Ends Srihari
		-- fcc4.0 changes, added function for mt103+
FUNCTION Fn_mt103p
		(
		p_modproc_rec 	IN 	oltbs_dly_msg_out%ROWTYPE,
		p_istbs_msgho_rec IN 	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;
-- 27-May-2002 FCC4.0 June-2002 new functions fn_validate_103,fn_validate_103+,fn_check_103p_reqd added ..STARTS
FUNCTION fn_check_prod_103p_reqd
		(
		p_contract_ref_no IN	oltbs_settlements.contract_ref_no%TYPE,
		p_error_code	OUT   VARCHAR2,
		P_error_param	OUT   VARCHAR2
		)
		RETURN BOOLEAN;

/*FUNCTION fn_check_103p_reqd
		(
		p_istbs_contis 	IN	oltbs_settlements%ROWTYPE,
		p_error_code 	OUT  	VARCHAR2,
		p_error_param  	OUT  	VARCHAR2
		)
		RETURN BOOLEAN;*/ -- OFCL12.2 Not reqd

FUNCTION fn_validate_103p
		(
		p_istbs_contis 	IN	oltbs_settlements%ROWTYPE,
		p_error_code 	OUT  	VARCHAR2,	  
		p_error_param  	OUT  	VARCHAR2
		)
		RETURN BOOLEAN;
FUNCTION fn_validate_103
		(
		p_istbs_contis 	IN OUT  	oltbs_settlements%ROWTYPE, -- 16-June-2002 FCC4.0 June-2002 ITR1 fix for resolving receiver address
		p_error_code 	OUT  		VARCHAR2,
		p_error_param  	OUT  		VARCHAR2
		)
		RETURN BOOLEAN;
FUNCTION fn_get_address
		(
		p_branch  		IN		VARCHAR2, 
		p_module		IN  		VARCHAR2,
		p_msg_type		IN  		VARCHAR2,
		p_receiver  	IN		VARCHAR2,
		p_cust_ac_no 	IN 		VARCHAR2,
		p_swift_addr 	OUT 		VARCHAR2
		)
RETURN BOOLEAN;

-- 27-May-2002 FCC4.0 June-2002 new functions fn_validate_103,fn_validate_103+,fn_check_103p_reqd added ..ENDS

FUNCTION fn_mtn92 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE
		) --18-02-2003 FCC4.2 April 2003
		RETURN BOOLEAN ;
 
FUNCTION fn_reset_n92_gen_flag 
RETURN BOOLEAN;			   --18-02-2003 FCC4.2 April 2003

FUNCTION fn_set_n92_gen_flag 
RETURN BOOLEAN;			   --18-02-2003 FCC4.2 April 2003

g_generate_n92_msg 	VARCHAR2(1);					   --18-02-2003 FCC4.2 April 2003
--
-- FCC 42 OPS Changes Starts
--
FUNCTION Fn_reverse_mt100 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;
FUNCTION Fn_reverse_mt202 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN;
FUNCTION fn_append_sortcode
		(	
		p_sortcode 		IN		VARCHAR2,
		p_field_value	IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;	
--
-- FCC 42 OPS Changes Ends
--
--fcc 4.3 aug 2003 changes 
FUNCTION fn_revmt103 (
   p_modproc_rec              IN       oltbs_dly_msg_out%ROWTYPE
,  p_istbs_msgho_rec          IN OUT   oltbs_msgho%ROWTYPE
)
   RETURN BOOLEAN;
--fcc 4.3 aug 2003 changes 
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46020120 Start By Swapnasish
-- PLC46020120 Changes Starts
FUNCTION fn_msg_gen_serv_1(
	p_contract_ref_no		IN		oltbs_settlements.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_settlements.event_seq_no%TYPE,
	p_amount_tag		IN		oltbs_settlements.amount_tag%TYPE,
	p_msg_type			IN		VARCHAR2,
	p_msgtype_out		IN OUT	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

   
FUNCTION fn_msg_gen_serv_2(
	p_contract_ref_no		IN		oltbs_settlements.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_settlements.event_seq_no%TYPE,
	p_amount_tag		IN		oltbs_settlements.amount_tag%TYPE,
	p_msgtype_out		IN OUT	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
)
   RETURN BOOLEAN;   

-- PLC46020120 Changes Starts
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46020120 End By Swapnasish
--26-FEB-2009 FCC V.CL Release 7.5  CITIUS RETRO  CITIUS-LS#5337, Invalid correction Starts
--14-JAN-2005 PLC46120040 - START
--15-DEC-2004 PLC40706004 CHANGES - START
FUNCTION	fn_get_taxes
			(
			p_istbs_msgho_rec		IN          oltbs_msgho%ROWTYPE,
			p_component			IN		txtbs_txnrule.basis_amount_tag%TYPE,
			p_tax_amount		OUT         txtbs_txnrule_detail.amount%TYPE,
			p_err_code			IN OUT      VARCHAR2
			)
			RETURN BOOLEAN;
--15-DEC-2004 PLC40706004 CHANGES - END
--14-JAN-2005 PLC46120040 - END
--26-FEB-2009 FCC V.CL Release 7.5  CITIUS RETRO  CITIUS-LS#5337, Invalid correction Ends

-- Bug#29959798 Changes starts here
FUNCTION fn_append_clearparid
		(
		p_module		IN  	oltbs_contract.module_code%type,
		p_user_ref_no  	IN		oltbs_contract.user_ref_no%type,
        p_custom_ref_no IN		oltbs_contract.custom_ref_no%type,
        p_external_ref_no IN	oltbs_contract.external_ref_no%type,
        p_latest_esn 	IN 		oltbs_contract.latest_event_seq_no%type,
        p_curr_event_code IN 	oltbs_contract.curr_event_code%type,
	    p_facility_name		IN OUT 	VARCHAR2	)
        RETURN BOOLEAN;     
-- Bug#29959798 Changes ends here
END olpks_is_adv1;
/
CREATE or replace SYNONYM olpkss_adv1 FOR olpks_is_adv1
/