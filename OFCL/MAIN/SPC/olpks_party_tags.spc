CREATE OR REPLACE PACKAGE olpks_party_tags
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_party_tags.SPC
**
** Module	      : LOANS AND DEPOSITS
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



TYPE party_struct IS RECORD
	(
	module			oltbs_contract.module_code%TYPE,
	opt				varchar2(4), 
	tag				varchar2(4),
	code_word			varchar2(10),
	value				varchar2(2000)
	);

TYPE tbl_party_lookup IS TABLE OF party_struct INDEX BY BINARY_INTEGER;

empty_party_hoff		olpks_party_tags.tbl_party_lookup;

Function fn_get_party_tags 	(
				      p_module	IN		oltbs_contract.module_code%type,
					p_customer	IN		oltms_customer.customer_no%type,
					p_option	IN		oltms_cust_address_ms.location%type,
					p_tag		IN	OUT	VARCHAR2,
					p_parties	IN	OUT	olpks_party_tags.tbl_party_lookup,
					p_err_codes	IN	OUT	VARCHAR2,
					p_params	IN	OUT	VARCHAR2
					) RETURN BOOLEAN;

END;
/
CREATE or replace SYNONYM olpkss_party_tags FOR olpks_party_tags
/