CREATE OR REPLACE PACKAGE global AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------*/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Change History~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
13.04.2000  4.0 Enhancements  Added new fn split_setls to return no_of_splits
21.04.2000  4.0 Enhancements  Added new fn dtag_param to return derived tag parameter
21.04.2000  4.0 Enhancements  Added new swift_addr to return swift addresss of branch
27.04.2000  4.0 Enhancements    added two functions min_date,max_date
09.06.2000  4.0 FC40ITP -CITIPLC retro
16.06.2000  4.0 derived_tag param is commented which is retroed for CITIPLC
March'2001  4.2 ETD - Changes as part of 3T
April'2002  4.5 Online_gl_update added as a function
FCC5.0 Changes 05-06-2002 Tuning Changes

05.02.2003  5.2 FCC Gi changes - added functions interdict_check_reqd,interdict_time_out
             to get interdict required flag and interdict time out from STTM_BRANCH
13.05.2003  5.3 FCC Auto auth Changes - added functions pr_set_auto_auth_status, fn_get_auto_auth_status
                                        and pr_reset_auto_auth_status to set , retrive and reset auto_auth
                                        flag from the global package.
01-AUG-2003  FCC5.4 Staff Account Restrictions
      --Added functions user_customer_no, user_acc_restr_apply, user_prod_restr_apply.
10-feb-2004  FCC6.1 CCD-17 function fn_deferred_stmt and fn_deferred_stmt_status are added
--FCC6.2.1 changes
28-jun-2004 CADCCD00204 function cad_trncd added new function to get CADCCD specific transaction id

07/10/2005 KERNEL 7.1 CL Integration changes - added functions branch_status, country_code
to get end of input and country code values from STTM_BRANCH

02/05/2007 KERNEL 8.0 Dev  - Added a variable pkg_is_txn_via_gw whose sole purpose is to act as an indicator for identifying whether the transaction is coming from the gateway or from the FCC front end (forms)
                             By default the value of variable would be 'N' which would mean that it is not from the gateway, If IT IS coming from the gateway then in the service router pkg  this flag would be set to 'Y' .
                             This flag was added to bypass the 'COMMIT's happening in the FCC packages when the transaction IS COMING VIA GATEWAY.

27-MAR-2008  FCUBSV.UM_10.1.0.0.0.0.0  ILM Changes - added ILM_INSTALLED global variable
9NT1501 - FS_FCUBS_12.0 - Relationship Manager Enhancements - Added g_is_user_rm Parameter

          Modified ByÂ Â Â Â Â Â Â Â        : Shantnug
          Modified OnÂ  Â Â Â Â Â Â        : 25-JUL-2012
          Modified ReasonÂ Â Â Â        : Custom specific functions/variables added
          Search StringÂ Â Â Â Â Â        : Extensibility Changes

** CHANGE HISTORY
** Created  By        : Shashanka Koormachalam
** Created  Dt        : 23-Jan-2014
** Change Description : (section 2.3.8)FATCA-008 Core â€“ Extraction and Classification of Obligations of FDD-
                         FDD_CO_FCUBS_12.0.3_FATCA_PHASE_2.docx (TDD - TDD_FLEXCUBE_FATCA_PHASE_2_CORE.docx)
** Search String      : 9NT1620#1203#FDD_CO_FCUBS_12.0.3_FATCA_PHASE_2

    Modified By        : Mani Megalai S
  Modified On          : 17-Oct-2012
  Modified Reason      : Introduced New Stage EOPD ( End of Previous Day) to defer some of the processes on POST BOD to improve performance.
  Search String        : 9NT1532 : POC Deferred EOD

    Modified By       : Pankaj
  Modified On       : 14-Apr-2014
  Modified Reason   : Performance Tuning : As the queries on static table is replaced with the call to FRC Wrapper functions,
                                  The pragma restrictions on few functions restrict the usage of the FRC function call..so commented the restrictions.
  Search String     : 9NT1532 : Performance Tuning With FRC

  Modified ByÂ Â Â Â Â Â Â Â      : Pallavi R
  Modified OnÂ  Â Â Â Â Â Â      : 10-Jul-2015
  Modified ReasonÂ Â Â Â    :  Added Country_Office as global parameter
  Search StringÂ Â Â Â Â Â      : Zengin Changes

   Modified ByÂ Â Â Â Â Â Â Â      : Ajai
  Modified OnÂ  Â Â Â Â Â Â      : 28-jul-2015
  Modified ReasonÂ Â Â Â    :  Added procedure to set country code
  Search StringÂ Â Â Â Â Â      :Bug#21491998

  Modified ByÂ Â Â Â Â Â Â Â    : Vinutha Kini
  Modified OnÂ  Â Â Â Â Â Â    : 18-March-2016
  Modified ReasonÂ Â Â Â    : Added new function to return Host_Code
  Search StringÂ Â Â Â Â Â    : 12.2_Host_Code_Changes

  Modified ByÂ Â Â Â Â Â Â Â    : Anil
  Modified OnÂ  Â Â Â Â Â Â    : 17-Sep-2016
  Modified ReasonÂ Â Â Â    : Standalone12.3 Changes
  Search StringÂ Â Â Â Â Â    : Standalone12.3 Changes

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
/*FCUBS11.0 14-10-2009  ADDED  FOR FCR Interface Multi Entity Changes */
gBrnRec  sttms_core_branch%rowtype ;--Standalone 12.3 Changes
gBrnSwiftRec  sttms_core_swift_address%rowtype ;--Standalone 12.3 Changes
gBrnStatusRec sttms_core_branch_status%rowtype ;--Standalone 12.3 Changes
gBrnPrefRec   sttms_core_branch_pref%rowtype ;--Standalone 12.3 Changes
--9NT1532 : POC Deferred EOD Starts >>>>
process_date date ;
function processing_date return date;
--9NT1532 : POC Deferred EOD Ends <<<<
g_application_type  varchar2(3) := 'D2K' ;
g_3t_call    varchar2(1) := 'C' ;  -- Values - C-Client(To return back string/S-Server- to insert)

procedure pr_init(pm_branch sttms_core_branch.branch_code%TYPE, pm_user varchar2);--Standalone 12.3 Changes
procedure pr_init(pm_branch sttms_core_branch.branch_code%TYPE);--Standalone 12.3 Changes
procedure set_func_type(pm_func_type varchar2);
procedure set_conversion_run (pm_conv_run varchar2);
function conversion_run return varchar2;
procedure set_conversion_gl (pm_conversion_gl varchar2);
function conversion_gl return varchar2;
function head_office return varchar2;
--function ext_bank_code return number; --Standalone12.3 Changes       --FCUBS11.0 14-10-2009  ADDED  FOR FCR Interface Multi Entity Changes
function lcy return varchar2;
function eur_lcy return varchar2;
---function interface_id return varchar2;--Standalone12.3 Changes
function user_id return varchar2;
function user_customer_no return varchar2;     -- FCC5.4 Staff Account Restrictions
function user_prod_restr_apply return varchar2;     -- FCC5.4 Staff Account Restrictions
function  user_acc_restr_apply return varchar2;     -- FCC5.4 Staff Account Restrictions
function  user_products_access_allowed return varchar2;  -- FCC5.4 Staff Account Restrictions
function current_branch return varchar2;
function debug_mode return varchar2; -- SFR#24663996 Added //25339616
function country_office return varchar2; --Zengin Changes
function host_code return varchar2; --12.2_Host_Code_Changes
function application_date return date;
function lang return varchar2;
function tid return varchar2;
function node return varchar2;
function func_type return varchar2;
function get_nls_dt_format return varchar2;
function x9$ return varchar2;
function work_area return varchar2;
--FCC6.2.1 changes
function ccd_trncd return varchar2;  --CADCCD00204 added new function to get CADCCD specific transaction id
function slash return varchar2;
function conversion_date return date;
--function fund_branch return Boolean;--Standalone12.3 Changes
function split_setls return number;
function swift_addr return varchar2;
function dtag_param return varchar2;
function min_date return date;
function max_date return date;
function conv_date return date;
--function online_gl_upd  return varchar2; --Standalone12.3 Changes
function UDF15 return varchar2;
procedure set_product_accrual (pm_prod_accr varchar2);
function get_product_accrual return varchar2;
function VDBAL_UPDATE return varchar2;

--07/10/2005 KERNEL 7.1 CL Integration changes START
function branch_status return varchar2;
function country_code return varchar2;
--07/10/2005 KERNEL 7.1 CL Integration changes END
--FC 10.1 LS Changes
FUNCTION part_bulk_insert
RETURN VARCHAR2;
--FC 10.1 LS Changes

-- FCC5.0 Changes
--pkg_bank sttms_bank%ROWTYPE;--Standalone12.3 Cleanup
pkg_bank sttms_core_bank%ROWTYPE;--Standalone12.3 Cleanup
g_ac_entry_download VARCHAR2(1);
gUserRec smtbs_user%rowtype ;
-- FCC5.0 Changes Ends

-- FCC 5.2 Gi Changes starts
--FUNCTION interdict_check_reqd RETURN VARCHAR2;--Standalone12.3 Changes
--FUNCTION interdict_timeout RETURN number; --Standalone12.3 Changes
-- FCC 5.2 Gi Changes ends
-- FCC 5.3 Auto Auth Changes
procedure Pr_set_auto_auth_status(puser in varchar2,pfunc in varchar2,pbranc in sttm_core_branch.branch_code%type);
function fn_get_auto_auth_status return varchar2;
--function deferred_stmt return varchar2;  --Standalone12.3 Changes     --FCC6.1 CCD-17 Changes
--function deferred_stmt_status return varchar2; --Standalone12.3 Changes   --FCC6.1 CCD-17 Changes
procedure pr_reset_auto_auth_status;
--27-MAR-2008  FCUBSV.UM_10.1.0.0.0.0.0  ILM Changes  start
--function ilm_installed return varchar2;  --Standalone12.3 Changes
--27-MAR-2008  FCUBSV.UM_10.1.0.0.0.0.0  ILM Changes  end
-- FCC 5.3 Auto auth changes Ends;
function bal_log_reqd  return varchar2;  --11.2 itr1 sfr 189


pkg_is_txn_via_gw VARCHAR2(1) := 'N' ; --Kernel 8.0 Dev
--9NT1501 - FS_FCUBS_12.0 - Relationship Manager Enhancements - Begin
--g_is_user_rm             char(1):='N'; --Standalone12.3 Changes
g_other_rm_cust_restrict smtb_user.OTHER_RM_CUST_RESTRICT%type;
--9NT1501 - FS_FCUBS_12.0 - Relationship Manager Enhancements - End
--R4 CITI MFA Changes
/* global parametr to access the mfa_authenticated flag */
function fn_is_mfa_authenticated return varchar2;

/** This procedure to be called only from App layer after Reset Package variables.
  During pr_init , this value value would be set to global parameter  mf_authenticated
  which can be accessed throughout the session */
procedure pr_set_mfa_flag(mfa_flag varchar2 );

function fn_is_mfa_limit_check_reqd return boolean;
function fn_get_module_id return varchar2;

/* Function IDs need to call this procedure to set the MFA LIMTT CHECK REQD Flag*/
procedure pr_set_mfa_limit_check_reqd (p_mfa_limit_check_reqd boolean);
procedure pr_set_module_id(p_module_id smtb_modules.module_id%type);

--R4 CITI MFA Changes
--9NT1532 : Performance Tuning With FRC starts
/*PRAGMA RESTRICT_REFERENCES (UDF15, WNDS,WNPS);
PRAGMA RESTRICT_REFERENCES (get_product_accrual, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (current_branch, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (head_office, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (lcy, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (interface_id, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (user_id, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (application_date, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (lang, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (node, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (tid, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (func_type, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (get_nls_dt_format, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (x9$, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (work_area, WNDS, WNPS);
--FCC6.2.1 changes
PRAGMA RESTRICT_REFERENCES (ccd_trncd, WNDS, WNPS);  --CADCCD00204 added new function to get CADCCD specific transaction id
PRAGMA RESTRICT_REFERENCES (slash, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (fund_branch, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (eur_lcy, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (swift_addr, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (split_setls, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (dtag_param, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (min_date, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (max_date, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (conv_date, WNDS, WNPS);
--07/10/2005 KERNEL 7.1 CL Integration changes START
PRAGMA RESTRICT_REFERENCES (branch_status, WNDS, WNPS);
PRAGMA RESTRICT_REFERENCES (country_code, WNDS, WNPS);*/
--9NT1532 : Performance Tuning With FRC ends
--07/10/2005 KERNEL 7.1 CL Integration changes END
-- Extensibility Changes Start
g_skip_kernel BOOLEAN := FALSE;
TYPE ty_tb_custom_data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
TYPE ty_tb_cluster_data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
PROCEDURE pr_set_skip_kernel;
PROCEDURE pr_reset_skip_kernel;
-- Extensibility Changes End

--grndfthrd_obg_cutoff_date DATE;  --Standalone12.3 Changes --added 9NT1620#1203#FDD_CO_FCUBS_12.0.3_FATCA_PHASE_2

--FCIS Notif Changes Starts Here
function fn_get_fcis_module_id return varchar2;
procedure pr_set_fcis_module_id(p_module_id VARCHAR2);
--FCIS Notif Changes Ends Here
--Bug#21491998 starts
procedure  pr_set_Country_code(p_brn  IN varchar) ;
--Bug#21491998 ends
END Global;
/
create or replace synonym Globals for Global
/