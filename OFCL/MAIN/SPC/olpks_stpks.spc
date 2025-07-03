CREATE OR REPLACE PACKAGE olpks_stpks IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_stpks.SPC
**
** Module       : ST
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
-- OBJECT : olpks_stpks               DATE /TIME : 15-MAR-96 15:36:17


function fn_field_name_translation(
	pfunc_id in varchar2,
	pblk_name in varchar2,
	pfield_name in varchar2,
	plang_code in varchar2) return varchar2;

function fn_field_value_translation(
	pfunc_id in varchar2,
	pblk_name in varchar2,
	pfield_name in varchar2,
	pfvalue in varchar2,
	plang_code in varchar2) return varchar2;

-- trlrabo 7/5 rowid changes
-- Retro - shan - 100798

function fn_get_pk
	(pm_table	IN OUT	varchar2,
	pm_fld_lst	in out	varchar2,
	pm_type_lst	in out	varchar2,
	pm_len_lst	in out	varchar2) return boolean;

function fn_get_fldlst
	(pm_table	varchar2,
	pm_key	in out varchar2,
	pm_rowid	oltbs_rep_print_stat.row_id%type) return boolean;

END;
/
CREATE or replace SYNONYM olpkss_st FOR olpks_stpks
/