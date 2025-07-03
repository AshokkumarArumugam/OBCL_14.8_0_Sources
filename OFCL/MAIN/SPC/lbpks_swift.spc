CREATE OR REPLACE Package lbpks_swift
As
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_swift.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
------------------------------------END CHANGE HISTORY-------------------------------------
*/


FUNCTION fn_media_for_party
	(pReceiver 		IN oltbs_contract_event_advice.PARTY_ID%TYPE,
	pMessage_type 	IN oltbs_contract_event_advice.MSG_TYPE%TYPE,
	pbranch		IN oltms_branch.branch_code%type,
	pmedia		IN OUT oltms_cust_address_ms.media%type,	
	paddress1		IN OUT oltms_cust_address_ms.address1%type,
	paddress2		IN OUT oltms_cust_address_ms.address2%type,
	paddress3		IN OUT oltms_cust_address_ms.address3%type,
	paddress4		IN OUT oltms_cust_address_ms.address4%type) 
	return boolean;

FUNCTION fn_generate_swift_message
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE
	)
	RETURN boolean ;
end;
/
Create or replace Synonym lbpkss_swift For lbpks_swift
/