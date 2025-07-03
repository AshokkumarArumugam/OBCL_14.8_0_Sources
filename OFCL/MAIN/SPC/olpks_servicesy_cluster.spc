create or replace PACKAGE olpks_servicesy_cluster AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_servicesy_cluster.spc
  **
  ** Module    : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or     otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ------------------------------CHANGE HISTORY--------------------------------------------------------

  Change History

  ** Modified By       : Kavitha Asokan
  ** Modified On       : 12-OCT-2022
  ** Modified Reason   : OL Loan account is tracked for receivable, the corresponding ECA requests sent from 
						 OBCL to FCUBS will be enhanced to be sent with track receivables data. 
						 Hook to to capture various custom details of the operation on the contracts.	
  ** Search String     : BUG#34685139

  **Changed By         : Navoneel Nandan
  **Date               : 06-Jun-2023
  **Change Description : Added function fn_COSA_reqd
  **Search String      : Bug#35599082
  ------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_Pre_authorise(Pontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              Perrorcode     IN OUT VARCHAR2,
                              Perrorparams   IN OUT VARCHAR2,
                              p_Gen_Settlmsg IN VARCHAR2 DEFAULT 'Y') 
    RETURN BOOLEAN;
  FUNCTION fn_Post_authorise(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              Perrorcode     IN OUT VARCHAR2,
                              Perrorparams   IN OUT VARCHAR2,
                              p_Gen_Settlmsg IN VARCHAR2 DEFAULT 'Y') 
    RETURN BOOLEAN;
--Bug#35599082 starts
FUNCTION fn_pre_COSA_reqd(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                      p_component       IN lftms_product_iccf.component%TYPE,
                      p_esn             IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                      p_prepmt          IN NUMBER DEFAULT 0,
					  p_process_cosa    IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_post_COSA_reqd(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                      p_component       IN lftms_product_iccf.component%TYPE,
                      p_esn             IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                      p_prepmt          IN NUMBER DEFAULT 0,
					  p_process_cosa    IN OUT VARCHAR2) RETURN BOOLEAN;
--Bug#35599082 ends


END olpks_servicesy_cluster;
/
CREATE OR REPLACE SYNONYM olpkss_servicesy_cluster FOR olpks_servicesy_cluster
/