CREATE OR REPLACE PACKAGE olpks_mo_replication_service IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright ? 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
  
  Created By         : Sowmya Bitra
  Created On         : 24-July-2023
  Description        : Changes to replicate data to OBCLPM tables (Bug#35610618)
  
  ------------------------------------------------------------------------------------------
  */

    TYPE TY_REPL_CONTRACT IS RECORD(
    CONTRACT_REF_NO      VARCHAR2(16),
    USER_REF_NO      VARCHAR2(16),
    BOOK_DATE       DATE,
 branch sttm_core_branch.branch_code%TYPE,
 COUNTERPARTY VARCHAR2(20),
    CONTRACT_STATUS       VARCHAR2(1),
    AUTH_STATUS       VARCHAR2(1),
    PRODUCT_TYPE        VARCHAR2(1),
    PRODUCT_CODE       VARCHAR2(4),
    MODULE_CODE       VARCHAR2(2),
    USER_DEFINED_STATUS        VARCHAR2(10),
    CONTRACT_CCY        VARCHAR2(3),
    LATEST_VERSION_NO        NUMBER);

  FUNCTION fn_populate_contract(p_contract_ref_no IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_err_code  in out varchar2,
                                p_err_param in out varchar2) RETURN BOOLEAN;

  FUNCTION fn_populate_product(p_prod_code IN OLTM_PRODUCT.product_code%TYPE,
                               p_product_description IN OLTM_PRODUCT.product_description%TYPE,
                               p_product_start_date IN OLTM_PRODUCT.product_start_date%TYPE,
                               p_product_end_date IN OLTM_PRODUCT.product_end_date%TYPE,
                               p_product_group IN OLTM_PRODUCT.product_group%TYPE,
                               p_module IN OLTM_PRODUCT.module%TYPE,
                               p_record_stat IN OLTM_PRODUCT.record_stat%TYPE,
                               p_product_type IN OLTM_PRODUCT.product_type%TYPE,
                               p_mod_no IN OLTM_PRODUCT.mod_no%TYPE,
                             p_err_code  in out varchar2,
                             p_err_param in out varchar2) RETURN BOOLEAN;

  FUNCTION fn_populate_ssi_mnemonic(p_ssi_mnemonic     IN OLZM_INSTR.ssi_mnemonic%TYPE,
                               p_settlement_seq_no   IN OLZM_INSTR.settlement_seq_no%TYPE,
                               p_branch        IN OLZM_INSTR.branch%TYPE,
                               p_currency        IN OLZM_INSTR.currency%TYPE,
                               p_customer_number     IN OLZM_INSTR.counterparty%TYPE,
                               p_module              IN OLZM_INSTR.module%TYPE,
                               p_pay_ac_branch       IN OLZM_INSTR.pay_ac_branch%TYPE,
                               p_pay_account         IN OLZM_INSTR.pay_account%TYPE,
                               p_pay_account_ccy     IN OLZM_INSTR.pay_account_ccy%TYPE,
                               p_product_code        IN OLZM_INSTR.product_code%TYPE,
                               p_recv_ac_branch      IN OLZM_INSTR.recv_ac_branch%TYPE,
                               p_recv_account        IN OLZM_INSTR.recv_account%TYPE,
                               p_recv_account_ccy    IN OLZM_INSTR.recv_account_ccy%TYPE,
                               p_err_code            in out varchar2,
                               p_err_param           in out varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_populate_entity_details(p_customer_id     IN OLTM_CUSTOMER_ENTITY_DETAILS.customer_no%TYPE,
                               p_enity_name             IN OLTM_CUSTOMER_ENTITY_DETAILS.entity%TYPE,
                               p_entity_description     IN OLTM_CUSTOMER_ENTITY_DETAILS.entity_name%TYPE,
                               p_err_code            in out varchar2,
                               p_err_param           in out varchar2)
    RETURN BOOLEAN;
  FUNCTION fn_populate_administrator(p_admin_id     IN OLTM_ADMINISTRATOR.admin_id%TYPE,
                               p_admin_name             IN OLTM_ADMINISTRATOR.admin_name%TYPE,
                               p_err_code            in out varchar2,
                               p_err_param           in out varchar2)
    RETURN BOOLEAN;
END olpks_mo_replication_service;
/
CREATE or replace SYNONYM olpkss_mo_replication_service FOR olpks_mo_replication_service
/