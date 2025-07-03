CREATE OR REPLACE VIEW OLVW_CONTRACT_EXCEPTION 
AS
SELECT DISTINCT
/*-----------------------------------------------------------------------------------------------------
**
** File Name  : OLVW_CONTRACT_EXCEPTION.vw
**
** Module     : Oracle Lending
** 
** This source is part of the Oracle Banking Software Product.
** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
** 
** 
** No part of this work may be reproduced, stored in a retrieval system, adopted 
** or transmitted in any form or by any means, electronic, mechanical, 
** photographic, graphic, optic recording or otherwise, translated in any 
** language or computer language, without the prior written permission of 
** Oracle and/or its affiliates. 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East), 
** Mumbai - 400 063, India
** India
**-------------------------------------------------------------------------------------------------------
**CHANGE HISTORY
**
**SFR Number         :  
**Changed By         :  
**Change Description :  
**
**
**Changed By         : Yuvaraj K
**Date               : 26-Dec-2020
**Change Description : To display Contract Exception details in summary
**Search String      : 
**-------------------------------------------------------------------------------------------------------*/
    a.contract_ref_no,
    a.module,
    a.branch,
    to_char(a.branch_date, 'DD-MON-YYYY') AS branch_date,
    (SELECT sypks_utils.get_product(A.CONTRACT_REF_NO) FROM DUAL) AS product_code,
    a.event_seq_no,
    a.event_code,
    a.counterparty,
    a.error_code,
    replace(a.parameters, '~', '-') AS parameters,
    a.source,
    a.ora_error,
    a.ora_message
FROM
    oltbs_contract_exception a
WHERE
    contract_ref_no IS NOT NULL
ORDER BY
    contract_ref_no,
    branch_date ASC
	
/
CREATE OR REPLACE SYNONYM OLVWS_CONTRACT_EXCEPTION FOR OLVW_CONTRACT_EXCEPTION
/