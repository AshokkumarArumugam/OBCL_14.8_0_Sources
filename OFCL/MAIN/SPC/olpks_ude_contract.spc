Create Or Replace PACKAGE olpks_ude_contract AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ude_contract.SPC
**
** Module		: User Defined Module
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




Function fn_copy_contract(p_new_reference_no IN Varchar2, 
		p_old_reference_no IN Varchar2, 
		p_error_code IN OUT Varchar2) 
return boolean;

FUNCTION fn_AmendBeforeFirstAuth
		(
		pContractRefNo	IN OUT					oltbs_contract.contract_ref_no%type,
		pErrorCode	IN	OUT	Varchar2,
		pErrorParams	IN	OUT	Varchar2
		)
Return Boolean ;

Function fn_AmendAfterAuth
		(
		p_new_reference_no IN Varchar2, 
		p_old_reference_no IN Varchar2, 
		p_error_code 	   IN OUT Varchar2) 
return boolean;
Function fn_copy_MODULE
		(
		p_new_MOD_no IN Varchar2, 
		p_old_MOD_no IN Varchar2, 
		p_error_code IN OUT Varchar2)
return boolean ;


End olpks_ude_contract;
/
CREATE or replace SYNONYM olpkss_udpkcons FOR olpks_ude_contract
/