create or replace view olvw_ext_contract_stat as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_ext_contract_stat.vw
**
** Module	: OL
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product.   Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
SFR                    :Bug#36057728 
Created by             :Arunprasath
Created On             :29-Nov-2023
Change Description     :New view introduced based on oltbs_ext_contract_stat and oltbs_ext_contract_stat_arc tables for OLDUPLMT screen display
----------------------------------------------------------------------------------------------------
*/
SELECT
	branch_code
	,source
	,product_code
	,counterparty
	,external_init_date
	,module
	,external_ref_no
	,import_status
	,citicube_ref_no
	,post_import_status
	,export_status
	,upload_ref
	,department_code
	,treasury_source
	,err_code
	,err_msg
	,trans_ouc
	,seq_no
	,external_seq_no
	,function_id
	,jobno
	,contract_ref_no
	,user_id
	,upload_id
	,action_code
FROM oltbs_ext_contract_stat
UNION ALL
SELECT
    branch_code
	,source
	,product_code
	,counterparty
	,external_init_date
	,module
	,external_ref_no
	,import_status
	,citicube_ref_no
	,post_import_status
	,export_status
	,upload_ref
	,department_code
	,treasury_source
	,err_code
	,err_msg
	,trans_ouc
	,seq_no
	,external_seq_no
	,function_id
	,jobno
	,contract_ref_no
	,user_id
	,upload_id
	,action_code
FROM oltbs_ext_contract_stat_arc
/
CREATE OR REPLACE SYNONYM olvws_ext_contract_stat FOR olvw_ext_contract_stat
/