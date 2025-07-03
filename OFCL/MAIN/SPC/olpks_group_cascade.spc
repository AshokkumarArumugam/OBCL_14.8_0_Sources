CREATE OR REPLACE PACKAGE olpks_group_cascade
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_group_cascade.SPC
**
** Module		: MIS
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



TYPE		costcode_table_type	
IS	
TABLE OF 	mitms_cost_code.cost_code%TYPE
INDEX BY BINARY_INTEGER;

CURSOR		group_cur
IS
	SELECT	bas.mis_group,	bas.pool_code,
			pool_cd.calc_method,
			bas.cust_mis_1,	bas.cust_mis_2,
			bas.cust_mis_3,	bas.cust_mis_4,
			bas.cust_mis_5,	bas.cust_mis_6,
			bas.cust_mis_7,	bas.cust_mis_8,
			bas.cust_mis_9,	bas.cust_mis_10,
			bas.comp_mis_1,	bas.comp_mis_2,
			bas.comp_mis_3,	bas.comp_mis_4,
			bas.comp_mis_5,	bas.comp_mis_6,
			bas.comp_mis_7,	bas.comp_mis_8,
			bas.comp_mis_9,	bas.comp_mis_10,
			bas.txn_mis_1,	bas.txn_mis_2,
			bas.txn_mis_3,	bas.txn_mis_4,
			bas.txn_mis_5,	bas.txn_mis_6,
			bas.txn_mis_7,	bas.txn_mis_8,
			bas.txn_mis_9,	bas.txn_mis_10,
			bas.cost_code1,	bas.cost_code2,
			bas.cost_code3,	bas.cost_code4,
			bas.cost_code5
	FROM	oltws_mis_group	chg,
			mitms_mis_group	bas,
			mitms_pool_code	pool_cd
	WHERE	bas.mis_group =	chg.mis_group
	AND		bas.pool_code = pool_cd.pool_code;

CURSOR		nodes_cur
IS
	SELECT	DISTINCT
			node
	FROM	oltms_branch_node;


FUNCTION	fn_group_cascade
			return	boolean;

FUNCTION	fn_upd_cust_mis
			(p_group_rec		IN	group_cur%ROWTYPE)
			return	boolean;

FUNCTION	fn_upd_accls_mis
			(p_group_rec		IN	group_cur%ROWTYPE)
			return	boolean;

FUNCTION	fn_upd_prod_mis
			(p_group_rec		IN	group_cur%ROWTYPE)
			return	boolean;

FUNCTION	fn_upd_clsmap_mis
			(p_group_rec		IN	group_cur%ROWTYPE)
			return	boolean;

FUNCTION	fn_res_clsmap_mis
			return	boolean;

FUNCTION	fn_get_costcode_list
 			(p_costcode_tab		IN	costcode_table_type,
 			p_ccy				IN	oltbs_class_mapping.ccy%TYPE,
			p_unit_type			IN	oltbs_class_mapping.unit_type%TYPE)
 			return	costcode_table_type;

PROCEDURE	pr_call_misjobs
			(p_mis_group		IN	mitms_mis_group.mis_group%TYPE);

PROCEDURE	pr_upd_mis_wrkfil
			(p_job_id	IN integer,
			p_mis_group	IN	mitms_mis_group.mis_group%TYPE,
			p_node		IN	oltms_branch_node.node%TYPE);

END olpks_group_cascade;
/
create or replace synonym olpkss_group_cascade for olpks_group_cascade
/