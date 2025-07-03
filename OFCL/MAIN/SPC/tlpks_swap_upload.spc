CREATE OR REPLACE PACKAGE tlpks_swap_upload AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_swap_upload.SPC
**
** Module       : SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
15-06-2008 -FLEXCUBE V.CL Release 7.4 - New object created for LQT-Interface with FLEXCUBE for LT Module.
26-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#133 SWAP update status to be called as the swap is processed in the Draft Layer
*/

TYPE p_Rec_Upl_Error_log IS TABLE OF tltbs_contract_exception%ROWTYPE INDEX BY BINARY_INTEGER;
lTbl_Upl_error_log p_Rec_Upl_Error_log;


Procedure pr_Process_Upload
(
		p_Source_Code		IN	oltbs_lt_trade.Source_Code%type
	,	p_Error_Code		IN OUT	Varchar2
	,	p_Error_Param		IN OUT	Varchar2
);

FUNCTION fn_Upload_Swap
(
		p_Source_Code		IN	oltbs_lt_swapalloc_master.Source_Code%type
	,	p_Trans_Id		IN	oltbs_lt_swapalloc_master.Trans_id%type
	,	p_Error_Code		IN OUT	Varchar2
	,	p_Error_Param		IN OUT	Varchar2
)
RETURN BOOLEAN ;
FUNCTION fn_Obtain_Trans_Lock
(
		p_Trans_Id		IN	oltbs_lt_trade.Trans_Id%TYPE
	,	p_Err_Code		IN OUT	ERTBS_MSGS.Err_Code%Type
	,	p_Err_Param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

--26-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#133 Starts
PROCEDURE pr_UPDATE_Status
(
		p_Source_Code	IN	oltbs_lt_trade.Source_Code%type
	,	p_Trans_Id		IN	oltbs_lt_trade.Trans_Id%type
	,	p_Ticket_Id		IN	oltbs_lt_swap_link.Ticket_ID%Type
	,	p_Cusip_No		IN	oltbs_lt_swap_link.Cusip_No%Type
	,	p_Trade_ID		IN	oltbs_lt_swap_link.Trade_Id%Type
	,	p_Status		IN	oltbs_lt_trade.Upload_Status%type
	,	p_Error_Code	IN OUT	VARCHAR2
	,	p_Error_Param	IN OUT	VARCHAR2
);
-- 26-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#133 Ends

END tlpks_swap_upload;
/
CREATE or replace Synonym tlpkss_swap_upload for tlpks_swap_upload
/