CREATE OR REPLACE PACKAGE olpks_api_ubs_integration AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_api_ubs_integration.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  TYPE ty_pc_contracts IS RECORD(
    contract_ref_no VARCHAR2(30),
    currency        VARCHAR2(3),
    due_loan_amt    number);

  TYPE ty_tbl_pc_contracts IS TABLE OF ty_pc_contracts INDEX BY BINARY_INTEGER;

  TYPE ty_packing_credit_contracts IS RECORD(
    v_pc_contracts ty_tbl_pc_contracts);

  TYPE ty_tb_olvw_loan_details IS TABLE OF olvw_loan_details%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_olvw_loan_comp_details IS TABLE OF olvw_loan_comp_details%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_olvw_360_cust IS RECORD(
    v_olvw_loan_details      ty_tb_olvw_loan_details,
    v_olvw_loan_comp_details ty_tb_olvw_loan_comp_details);

  TYPE ty_product_details IS RECORD(
    PRODUCT_CODE          VARCHAR2(4),
    PRODUCT_DESCRIPTION   VARCHAR2(35),
    MODULE                VARCHAR2(2),
    PRODUCT_TYPE          VARCHAR2(2),
    NORMAL_RATE_VARIANCE  NUMBER(11, 5),
    MAXIMUM_RATE_VARIANCE NUMBER(11, 5),
    RATE_CODE_PREFERRED   VARCHAR2(1),
    RATE_TYPE_PREFERRED   VARCHAR2(8),
    STD_TENOR             NUMBER(4),
    TENOR_UNIT            CHAR(1),
    SOURCE               VARCHAR2(15),
    XREF                VARCHAR2(16),
    RECORD_STAT           CHAR(1),
    AUTH_STAT             CHAR(1));

  TYPE ty_componet_list IS RECORD(
    EVENT     VARCHAR2(4),
    COMPONENT VARCHAR2(10));

  TYPE ty_tb_componet_list IS TABLE OF ty_componet_list INDEX BY BINARY_INTEGER;

  TYPE ty_pcd_component_list IS RECORD(
    v_component_list ty_tb_componet_list);

  TYPE ty_component_detail IS RECORD(
    RATE_CODE_USAGE       CHAR(1),
    FIXED_RATE_TYPE       VARCHAR2(1),
    PRODUCT               VARCHAR2(4),
    SOURCE               VARCHAR2(15),
    COMPONENT_DESCRIPTION VARCHAR2(35),
    RATE_TYPE             CHAR(1),
    RATE_CODE             VARCHAR2(10),
    FIXED_RATE_CODE       VARCHAR2(10),
    COMPONENT             VARCHAR2(10));

  TYPE ty_tb_component_detail IS TABLE OF ty_component_detail INDEX BY BINARY_INTEGER;

  TYPE ty_pcd_component_detail IS RECORD(
    v_component_detail ty_tb_component_detail);

  TYPE ty_interest_limits IS RECORD(
    PRODUCT           VARCHAR2(4),
    COMPONENT         VARCHAR2(10),
    EVENT             VARCHAR2(4),
    CURRENCY          VARCHAR2(3),
    MINIMUM_RATE      NUMBER,
    MAXIMUM_RATE      NUMBER,
    DEFAULT_RATE      NUMBER,
    MINIMUM_SPREAD    NUMBER,
    MAXIMUM_SPREAD    NUMBER,
    INTEREST_BASIS    NUMBER(1),
    TENOR             NUMBER,
 branch_code sttm_core_branch.branch_code%TYPE,
    DEFAULT_RATE_SIGN VARCHAR2(1));

  TYPE ty_tb_interest_limits IS TABLE OF ty_interest_limits INDEX BY BINARY_INTEGER;

  TYPE ty_comp_interest_limits IS RECORD(
    v_interest_limits ty_tb_interest_limits);

END olpks_api_ubs_integration;
/