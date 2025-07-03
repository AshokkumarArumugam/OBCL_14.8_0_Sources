CREATE OR REPLACE PACKAGE olpks_new_archive
AS
      /*----------------------------------------------------------------------------------------------------
      **----------------------------------------------------------------------------------------------------
      ** File Name    : olpks_new_archive.SPC
      **
      ** Module       :
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

      ----------------------------------------------------------------------------------------------------
	  */

      
/*

CHANGE HISTORY

24-02-2004 FCC 4.5 APRIL 2004 CREATION OF PACKAGE



CHANGES HISTORY

*/
-----------------------------------------------------------------------------------------------------
      FUNCTION fn_archival (
            p_branch             IN          oltms_branch.branch_code%TYPE,
            p_action_code        IN          VARCHAR2,
            p_user_id               IN          VARCHAR2,
            p_module             IN          VARCHAR2,
            p_archival_date      IN          DATE,
            p_errorcode          IN OUT      VARCHAR2,
            p_params             IN OUT      VARCHAR2
      )
            RETURN BOOLEAN;

---------------------------------------------------------------------------------------------------
      FUNCTION fn_validate (
            p_ct_dtls            IN          oltbs_contract%ROWTYPE,
            p_module             IN          oltbs_contract.module_code%TYPE,
            p_version_no         IN          oltbs_contract.latest_version_no%TYPE,
            p_archival_date      IN          DATE,
            p_errorcode          IN OUT      VARCHAR2,
            p_params             IN OUT      VARCHAR2
      )
            RETURN BOOLEAN;

-----------------------------------------------------------------------------------------------------
      FUNCTION fn_check_linkages (
            p_ct_dtls              IN          oltbs_contract%ROWTYPE,
            p_module               IN          oltbs_contract.module_code%TYPE,
            p_version_no           IN          oltbs_contract.latest_version_no%TYPE,
            p_archival_date        IN          DATE,
            p_error_code           IN OUT      VARCHAR2,
            p_error_parameter      IN OUT      VARCHAR2
      )
            RETURN BOOLEAN;
-----------------------------------------------------------------------------------------------------

            FUNCTION fn_check_rollover (
	                p_ct_dtls            IN          oltbs_contract%ROWTYPE,
	                p_ldtbs_dtls         IN          oltbs_contract_master%ROWTYPE,
	                p_version_no         IN          oltbs_contract.latest_version_no%TYPE,
	                p_module             IN          oltbs_contract.module_code%TYPE,
	                p_archival_date      IN          DATE,
	                p_errorcode          IN OUT      VARCHAR2,
	                p_params             IN OUT      VARCHAR2
	          )
            RETURN BOOLEAN;

-----------------------------------------------------------------------------------------------------
      FUNCTION fn_call_archival (
            p_contract_ref_no      IN          oltbs_contract.contract_ref_no%TYPE,
            p_action_code          IN          VARCHAR2,
            p_archival_date        IN          DATE,
            p_branch               IN          oltms_branch.branch_code%TYPE,
            p_module               IN          VARCHAR2,
            p_errorcode            IN OUT      VARCHAR2,
            p_params               IN OUT      VARCHAR2
      )
            RETURN BOOLEAN;

-----------------------------------------------------------------------------------------------------
      FUNCTION fn_get_contract (
            p_contract_ref_no      IN          oltbs_contract.contract_ref_no%TYPE,
            p_ldtbs_dtls           IN OUT      oltbs_contract_master%ROWTYPE,
            p_errorcode            IN OUT      VARCHAR2,
            p_params               IN OUT      VARCHAR2
      )
            RETURN BOOLEAN;

-----------------------------------------------------------------------------------------------------
     
      FUNCTION fn_archive_to_temp (
            p_branch               IN          oltms_branch.branch_code%TYPE,
            p_user_id              IN          smtbs_user.user_id%TYPE,
            p_archival_date        IN          DATE,
            p_action_code          IN          VARCHAR2,
            p_module               IN          VARCHAR2,
            p_error_code           OUT         VARCHAR2,
            p_error_parameter      OUT         VARCHAR2
      )
            RETURN BOOLEAN;

----------------------------------------------------------------------------------------------------
      FUNCTION fn_ld_hard_purge (
            p_branch               IN          oltms_branch.branch_code%TYPE,
            p_user_id              IN          smtbs_user.user_id%TYPE,
            p_archival_date        IN          DATE,
            p_action_code          IN          VARCHAR2,
            p_module               IN          VARCHAR2,
            p_error_code           OUT         VARCHAR2,
            p_error_parameter      OUT         VARCHAR2
      )
            RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
      FUNCTION fn_temp_to_purge (
            p_branch               IN          oltms_branch.branch_code%TYPE,
            p_user_id              IN          smtbs_user.user_id%TYPE,
            p_archival_date        IN          DATE,
            p_action_code          IN          VARCHAR2,
            p_module               IN          VARCHAR2,
            p_error_code           OUT         VARCHAR2,
            p_error_parameter      OUT         VARCHAR2
      )
            RETURN BOOLEAN;
END olpks_new_archive;
/
create or replace synonym olpkss_new_archive for olpks_new_archive
/