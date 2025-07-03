Create or replace PACKAGE olpks_is_drcradv
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_is_drcradv.SPC
**
** Module		: SETTLEMENTS
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
CHANGE_HISTORY
	
27/03/2000  Added two new functions FN_DEBIT_CONFIRM(MT 900) AND FN_CREDIT_CONFIRM(MT 910).

CHANGE_HISTORY
*/


Function Fn_debitadv (p_modproc_rec IN oltbs_dly_msg_out%Rowtype,
			p_is_msgho_rec IN oltbs_msgho%RowType)
Return Boolean;

Function Fn_creditadv (p_modproc_rec IN oltbs_dly_msg_out%Rowtype,
			p_is_msgho_rec IN oltbs_msgho%RowType)
Return Boolean;

Function Fn_rev_debitadv (p_modproc_rec IN oltbs_dly_msg_out%Rowtype,
			p_is_msgho_rec IN oltbs_msgho%RowType)
Return Boolean;

Function Fn_rev_creditadv (p_modproc_rec IN oltbs_dly_msg_out%Rowtype,
			p_is_msgho_rec IN oltbs_msgho%RowType)
Return Boolean;

Function Fn_debit_confirm (	p_modproc_rec IN 	oltbs_dly_msg_out%Rowtype
			,p_is_msgho_rec IN oltbs_msgho%RowType
			)
Return Boolean;

Function Fn_credit_confirm (	p_modproc_rec IN 	oltbs_dly_msg_out%Rowtype
			,p_is_msgho_rec IN oltbs_msgho%RowType
			)
Return Boolean;  

END olpks_is_drcradv;
/
Create or replace Synonym olpkss_is_drcradv for olpks_is_drcradv
/