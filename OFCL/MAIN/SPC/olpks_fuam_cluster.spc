CREATE OR REPLACE PACKAGE olpks_fuam_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_fuam_cluster.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	FUNCTION fn_pre_future_dated_amds (p_branch		IN		oltms_branch.branch_code%TYPE,
			p_mod		IN			oltms_product.module%TYPE,
			p_proc_date	IN			DATE,
			p_prod		IN			oltms_product.product_code%TYPE,
			p_com_freq	IN			NUMBER,
			p_err_code	IN	OUT		VARCHAR2,
			p_err_param	IN	OUT		VARCHAR2)
	RETURN BOOLEAN;
	
	FUNCTION fn_post_future_dated_amds (p_branch		IN		oltms_branch.branch_code%TYPE,
		p_mod		IN			oltms_product.module%TYPE,
		p_proc_date	IN			DATE,
		p_prod		IN			oltms_product.product_code%TYPE,
		p_com_freq	IN			NUMBER,
		p_err_code	IN	OUT		VARCHAR2,
		p_err_param	IN	OUT		VARCHAR2)
	RETURN BOOLEAN;

END olpks_fuam_cluster;
/


CREATE or replace SYNONYM olpkss_fuam_cluster FOR olpks_fuam_cluster
/