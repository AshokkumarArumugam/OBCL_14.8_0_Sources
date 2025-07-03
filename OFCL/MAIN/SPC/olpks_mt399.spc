CREATE OR REPLACE package olpks_mt399 IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_mt399.SPC
**
** Module		: MESSAGES
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

Function fn_get_bic_addr
	( 
	 p_counterparty IN oltbs_contract_master.counterparty%type,
	 p_bic_addr	OUT oltms_bic_directory.bic_code%type
        ) RETURN BOOLEAN; 

Function fn_update_flag
	( 
	 p_customer IN oltms_customer.customer_no%type,
	 p_module	varchar2
        ) RETURN BOOLEAN;

Function fn_mt399
	(
	 p_modproc_rec IN oltbs_dly_msg_out%rowType,
	 p_module varchar2
	) RETURN BOOLEAN;

Function fn_convert
	(
	 p_module varchar2,
         p_cust_list varchar2
	) RETURN BOOLEAN; 

Function fn_gen_mt399_summary
	(
	 p_mstbs_dly_rec IN oltbs_dly_msg_out%rowType
	) RETURN BOOLEAN;

Function fn_eod_summary
	
RETURN BOOLEAN;

Function fn_mt399_reconcilement
	(
	 p_module varchar2
	) RETURN BOOLEAN;

END olpks_mt399;
/
Create or replace  synonym olpkss_mt399 for olpks_mt399
/