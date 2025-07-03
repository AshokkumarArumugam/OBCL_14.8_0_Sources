CREATE OR REPLACE PACKAGE olpks_loss_reserve_0

/*----------------------------------------------------------------------------------------------------
**
** File Name		: olpks_loss_reserve_0
**
** Module			: Loans
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
/*--------------------------------------------------------------------------------------------------
CHANGE HISTORY
20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,Added changes in order to allow increase in contra balance on the loan without liquidating the interest accruals

----------------------------------------------------------------------------------------------------
*/
IS


FUNCTION	fn_save
	(
		p_contract_ref_no	IN		VARCHAR2,
		p_event_seq_no		IN		NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)
RETURN  BOOLEAN;


FUNCTION Fn_Update_MIS_Vdbal_Reserve
			   (
			    pContractRefNo            oltbs_contract.contract_ref_no%TYPE,
			    p_currency 	     	      oltbs_contract_master.currency%TYPE,
		   	    p_dc_ind   	     	      VARCHAR2,
			    p_res_ind  	     	      VARCHAR2,
			    p_amt      	     	      oltbs_contract_master.amount%TYPE,
			    pValueDate 	     	      DATE,
			    pErrorCode 	   IN OUT   VARCHAR2,
			    pParam           IN OUT   VARCHAR2
			   )
RETURN BOOLEAN;

--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes start
FUNCTION fn_reserve_accounting
			(
			p_contract_ref_no	IN	VARCHAR2
			,p_event_seq_no		IN	VARCHAR2
			,p_value_date		IN	DATE
			,p_contra_amt		IN	NUMBER
			,p_error_code		IN OUT	VARCHAR2
			,p_error_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes end

END olpks_loss_reserve_0;
/
CREATE or replace SYNONYM	olpkss_loss_reserve_0
FOR 			olpks_loss_reserve_0
/