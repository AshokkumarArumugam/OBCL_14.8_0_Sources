Create Or Replace PACKAGE olpks_ud_event AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ud_event.SPC
**
** Module	: UD
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




FUNCTION fn_save_event
		(
		pContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		pEvent		IN	oltbs_contract.curr_event_code%Type,
		PValueDate		IN	Date,
		pEsn			IN	oltbs_contract.latest_event_seq_no%TYPE,
		pErrCode		IN	OUT	varchar2,
		pErrParams		IN	OUT	Varchar2
		)
Return Boolean;


FUNCTION fn_delete
	(
	pContractRefNo	IN	OUT	oltbs_contract.contract_ref_no%type,
	pErrorCode		IN	OUT	Varchar2,
	pErrorParams	IN	OUT	Varchar2
	)
   	Return Boolean ;


Function fn_authorise
   (
    pContractRefNo	IN		oltbs_contract.contract_ref_no%type,
    pErrorCode		IN	OUT	Varchar2,
    pErrorParams		IN	OUT	Varchar2
    )
Return Boolean;


FUNCTION fn_Populate_event_amttags	
        (
   	   p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
         p_EventCode		IN    oltms_product_event_acct_entry.event_code%type,
	   p_ESN			IN    OLTB_CONTRACT_LIQ_UD.EVENT_SEQ_NO%Type
	  )	
RETURN boolean;

FUNCTION fn_reverse_event
		(
		pContractRefNo	IN		oltbs_contract.contract_ref_no%Type,
		pCurrEsn		IN		oltbs_contract.latest_event_seq_no%Type,
		pRevEsn		IN		oltbs_contract.latest_event_seq_no%Type,
		pErrCode		IN	OUT	Varchar2,
		pErrPArams		IN	OUT	Varchar2
		)
Return Boolean;


End olpks_ud_event;
/
CREATE or replace SYNONYM olpkss_ud_event FOR olpks_ud_event
/