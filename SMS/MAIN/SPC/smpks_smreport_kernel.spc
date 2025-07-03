create or replace package smpks_smreport_kernel
is
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008,2015  Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.

 Modified By        : Mantinder Kaur
 Modified On        : 09-Sep-2019
 Modified Reason    : Report generation failing when the length of user id is 12.
 Search String      : FCUBS_141_MIZUHO_30266878
------------------------------------------------------------------------------------------
 
   */

   /*BIP11g requires default DB PL/SQL Packages to initialize all the necessary
     global variables in the report which will  call through the Event Triggers
     defined in the report .xdm files.*/

 PM_branch_code sttm_core_branch.branch_code%TYPE;
  PM_BRANCH_DATE  varchar2(35); --ELCM2.0 Changes
  PM_BRANCH_DESC  varchar2(35);
  --FCUBS_141_MIZUHO_30266878 starts
 --pm_current_user smtb_user.user_id%TYPE;
  PM_CURRENT_USER SSTB_USER.USER_ID%TYPE;
  --FCUBS_141_MIZUHO_30266878 ends
  PM_MODULE       varchar2(3);
  PM_WHERE_CLAUSE varchar2(32767);
  PM_LIST_TYPE  varchar2(100);
  PM_SMS_LIST  varchar2(32767);
  PM_FROM_DATE	varchar2(100);
  PM_TO_DATE	varchar2(100);
  PM_FROM_TIME	varchar2(100);
  PM_TO_TIME	varchar2(100);
  PM_ORDER_CLAUSE varchar2(32767);
  function BeforeReport return boolean;

  /*FUNCTION Beforereport(Pm_Branch IN VARCHAR2
                         ,Pm_User   IN VARCHAR2) RETURN BOOLEAN;*/

  function AfterReport return boolean;
  /*function fn_amt1_to_amt2(
  pBranch   IN  STTMS_CORE_BRANCH.BRANCH_CODE%TYPE,
  pCcy1     IN   CYTMS_CCY_DEFN.CCY_CODE%TYPE,
  pCcy2     IN   CYTMS_CCY_DEFN.CCY_CODE%TYPE,
  pAmount1   IN   number,
  pRounding   IN   CHAR,
  pRate    IN   CYTMS_RATES.MID_RATE%TYPE
  ) return number;

  function fn_ccy1_editor(
  pCcy1     IN   CYTMS_CCY_DEFN.CCY_CODE%TYPE,
  pAmount1   IN   number
    )return varchar2;*/

END smpks_smreport_kernel;
/
CREATE OR REPLACE SYNONYM smpkss_smreport_kernel FOR smpks_smreport_kernel
/
create or replace synonym smpkss_smreport_kernel FOR smpks_smreport_kernel
/
