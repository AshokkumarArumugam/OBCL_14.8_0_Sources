CREATE OR REPLACE FORCE VIEW OLVW_CONT_UDF_UPLOAD_DETAIL_NUM(
				CONTRACT_REF_NO,
				VERSION_NO,
				FIELD_NAME,
				FIELD_VAL,         
				SOURCE_CODE,
                EXTERNAL_REF_NO,
                DATA_TYPE,
                VAL_TYPE,
                EXT_SEQ_NO,
                BRANCH_CODE,
                FIELD_DESCRIPTION,
                MANDATORY,
                FIELD_VAL_DESC
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_CONT_UDF_UPLOAD_DETAIL.VW
**
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
02-JUN-2005	SFR PLC46180002 NEW VIEW
*/
			SELECT 
				CONTRACT_REF_NO,
				VERSION_NO,
				FIELD_NAME,
				cast (FIELD_VAL as NUMBER) AS FIELD_VAL ,         
				SOURCE_CODE,
                EXTERNAL_REF_NO,
                DATA_TYPE,
                VAL_TYPE,
                EXT_SEQ_NO,
                BRANCH_CODE,
                FIELD_DESCRIPTION,
                MANDATORY,
                FIELD_VAL_DESC               
			FROM
				OLTBS_CONT_UDF_UPLOAD_DETAIL
            WHERE DATA_TYPE = 'N'
/
CREATE OR REPLACE SYNONYM OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM FOR OLVW_CONT_UDF_UPLOAD_DETAIL_NUM
/