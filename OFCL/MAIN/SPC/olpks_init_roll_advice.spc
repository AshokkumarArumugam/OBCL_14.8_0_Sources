CREATE OR REPLACE PACKAGE olpks_init_roll_advice
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_init_roll_advice.SPC
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
/*					Change History

15-MAY-2002 FCC4.0 JUNE 2002 ASPAC CHANGES INSTALLMENT DEPOSIT
		Added a new function called fn_drawdown_schedules for getting tags FOR drawdown schedules
24-JUN-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 06 Risk E-mail changes : added new function  fn_get_outstanding_bal
18-Dec-2017	FLEXCUBE 12_3.0.0.0 SUPPORT : Added new function fn_refund_advice Search string OFCL_12.3_SUPPORT BUG#26413141  
  07-MAR-2018 OBCL 27461829 OFCL_12.3_27421818   Added code to Pass the date format maintained in param table to spc
8-mar-2018 OBCL 14.0 27428384 OFCL_12.3_27412439  Added code to move the charge pickup to a function fn_charge_info

  **Changed By         : VigneshRam Subramanian
  **Date               : 24-Apr-2018
  **Change Description : Added code for Loan Simulations advices
  **Search String      : 14.1_LOAN_SIMULATION
  20-DEC-2018 27522989 - HOOKS FOR OL ADVICES Hooks given SEARCH STRING 29051908
  
  **Changed By         : Gomathi G
  **Date               : 24-OCT-2019
  **Change Description : HOOKS FOR OL ADVICES
  **Search String      : OBCL_14.3_BUG#29583867

  **Changed By         : VigneshRam Subramanian
  **Date               : 13-Nov-2019
  **Change Description : Added code for Split/Consolidate advices
  **Search String      : 14.4_Split_Consol_Adv
  

*/

--OBCL_14.3_BUG#29583867 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--OBCL_14.3_BUG#29583867 changes end
--OBCL 27461829 OFCL_12.3_27421818 starts
FUNCTION 	fn_date_format
				(
				cCstbParamName 	IN	VARCHAR2
				)
				RETURN VARCHAR2;
--OBCL 27461829 OFCL_12.3_27421818 ends 
FUNCTION fn_init_roll_advice
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

-- START USDFBME UPGRADE 10-SEP-1999 SUNNY

-- FUNCTIONS BELOW HAVE BEEN MOVED FROM BODY TO SPEC SO THAT 
-- MM FUNCTION CAN REUSE THE CODE
-- USDFBME 15/AUG/1998

FUNCTION fn_contract_info
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_value_date		IN OUT	date,
	p_maturity_date		IN OUT	date,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_component_info
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	p_value_date		IN	date,
	p_maturity_date		IN 	date,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

--FCL_12.3_SUPPORT BUG#26413141  
FUNCTION fn_refund_advice(p_out_dlymsg_record IN oltbs_dly_msg_out%ROWTYPE,
                            p_err_code          IN OUT ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--FCL_12.3_SUPPORT BUG#26413141  

FUNCTION fn_payment_on_initroll
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_payment_on_maturity
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	---PHPCBC Product Type added to handle MATAMT tag  --- karuna 6/Aug/99 
	p_product_type		IN		oltbs_contract.product_type%Type,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

--15.05.2002 FCC4.0 JUNE 2002 ASPAC CHANGES INSTALLMENT DEPOSIT

FUNCTION fn_drawdown_schedules
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	p_product_type		IN		oltbs_contract.product_type%Type,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

--15.05.2002 FCC4.0 JUNE 2002 ASPAC CHANGES INSTALLMENT DEPOSIT


FUNCTION fn_settlement_info
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

-- END USDFBME UPGRADE 10-SEP-1999 SUNNY

--24-jun-2010 flexcube v.cl release 7.7 vol2 fs tag 06 risk e-mail changes start
FUNCTION	fn_get_outstanding_bal
				(
			   	   p_linked_ref_no	IN		oltbs_contract_linkages.contract_ref_no%TYPE
				 , p_loan_os		IN OUT	oltbs_contract_master.amount%TYPE
				 , p_comm_avail	IN OUT	oltbs_contract_master.amount%TYPE
				 , p_lc_loan_os	IN OUT	oltbs_contract_master.amount%TYPE
				 , p_error_code	IN OUT	ertbs_msgs.err_code%TYPE
				)
RETURN BOOLEAN; 
--24-JUN-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 06 Risk E-mail changes end
   --OBCL 14.0 27428384 OFCL_12.3_27412439 starts
FUNCTION fn_charge_info(p_dcn  IN oltbs_dly_msg_out.dcn%type,
                              p_contract_reference_no IN oltbs_dly_msg_out.reference_no%type,
                              p_event_sequence_no  IN oltbs_dly_msg_out.esn%type,
							   p_receiver           IN oltbs_dly_msg_out.receiver%type,
                              p_err_code			IN OUT ertbs_msgs.err_code%TYPE
                             )
        RETURN BOOLEAN;	 
	  --OBCL 14.0 27428384 OFCL_12.3_27412439 ends
      --14.1_LOAN_SIUMLATION start
FUNCTION fn_loan_simulation
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	p_product_type		IN		oltbs_contract.product_type%Type,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;
      --14.1_LOAN_SIUMLATION end    
      --14.4_Split_Consol_Adv start
FUNCTION Fn_Split_Consol_Adv
	(
	p_out_dlymsg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_transaction_date	IN		date,
	p_product_type		IN		oltbs_contract.product_type%Type,
	p_rollover_method   IN      VARCHAR2,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;
      --14.4_Split_Consol_Adv end    	  

END;
/
CREATE or replace SYNONYM olpkss_init_roll_advice FOR olpks_init_roll_advice
/