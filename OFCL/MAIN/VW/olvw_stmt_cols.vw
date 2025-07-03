CREATE OR REPLACE force VIEW olvw_stmt_cols ( COL_NO, 
MODULE_CODE, LANG_CODE,PROMPT_CODE, DESCRIPTION, ORDER_NO 
--,AMOUNT_TAG --#OBCL_14.3_BUG#29582125 changes
) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_stmt_cols.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
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
Modified By         : Ravi
Modified On         : 02-Feb-2018
Modified Reason     : Narrative changes
Search String : 	: #Narrative
Modified By         : Gomathi G
Modified On         : 18-SEP-2018
Search String : 	: #OBCL_14.3_BUG#29582125
*/
Select  DISTINCT
                a.col_no,
                a.module_code,
                b.lang_code,
                a.prompt_code, --#Narrative changes
                b.description,
                c.order_no
                --,d.amount_tag--#OBCL_14.3_BUG#29582125 changes
        from  OLTB_STMT_COLS         a,
              OLTM_NARRATIVE_DETAIL  b,
                OLTM_NARRATIVE_MASTER  c
               --,OLTB_STMT_COLS_DETAIL  d --#OBCL_14.3_BUG#29582125 changes
        where   c.narrative_type = 'NARRATIVE'
       --and     a.module_code    = d.module_code--#OBCL_14.3_BUG#29582125 changes
        --and     d.prompt_code   = a.prompt_code--#OBCL_14.3_BUG#29582125 changes
        and   c.narrative_code = a.prompt_code
        and   a.module_code    = c.module
        and   b.module         = c.module
        and   b.narrative_type = c.narrative_type
        and   b.narrative_code = c.narrative_code
/
create or replace synonym olvws_stmt_cols for olvw_stmt_cols
/