create or replace package olpks_in_index as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_in_index.SPC
**
** Module       : IN
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


function fn_doindexation (
                         pBranch       IN      oltm_branch.branch_code%type,
                         pBranchDate   IN      date,
                         pUser         IN      smtb_user.user_id%type, 
			       pErrCode  IN OUT	 Varchar2,
                  	 pErrParam    IN OUT	 Varchar2
                        ) return boolean;
function fn_eoy_ind_processing (pBranch       IN oltm_branch.branch_code%type,
                                pBranchDate   IN      date,
                                perrcode      IN OUT varchar2,
                                perrparam     IN OUT varchar2)return boolean;
function fn_unmark_eoti
            (pBranch       IN oltms_branch.branch_code%type,
             pBranchDate   IN date,
             pErrcode      IN OUT varchar2,
             perrparam     IN OUT varchar2
              ) return boolean;
end olpks_in_index;
/
create or replace synonym olpkss_in_index for olpks_in_index
/