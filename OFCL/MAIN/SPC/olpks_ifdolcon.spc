CREATE OR REPLACE PACKAGE olpks_ifdolcon AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_ifdolcon.spc
  **
  ** Module     : Interfaces
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
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
 
**  Modified By     : Abhinav Bhasker
**  Modified On     : 07-MAR-2022
**  Modified Reason : Increasing the Counter Party field length from 12 to 20
**  Search String   : Bug#33904699
  -------------------------------------------------------------------------------------------------------
  */


--TYPE ty_tb_v_iftb_olamount_due IS TABLE OF iftb_olamount_due%ROWTYPE INDEX BY BINARY_INTEGER;
 
       

TYPE ty_iftb_olamount_due IS record(
  CONTRACT_REF_NO VARCHAR2(16),
 branch_code sttm_core_branch.branch_code%TYPE,
  COMPONENT       VARCHAR2(15),
  COMPONENT_CCY   VARCHAR2(3),
  COMPONENT_TYPE  CHAR(1),
  LATEST_INT_RATE NUMBER,
  DUE_DATE        DATE,
  AMOUNT_DUE      NUMBER,
  AMOUNT_SETTLED  NUMBER,
  EMI_AMOUNT      NUMBER,
  ACCRUED_AMOUNT  NUMBER,
  ADJUSTED_AMOUNT NUMBER,
  SCODE           VARCHAR2(15),
  XREF            VARCHAR2(16));
  

TYPE ty_iftb_olcontract_master IS RECORD(
  CONTRACT_REF_NO     VARCHAR2(16),
 branch sttm_core_branch.branch_code%TYPE,
 COUNTERPARTY VARCHAR2(20 CHAR), --Bug#33904699 --VARCHAR2(12),
  PRODUCT_CODE        VARCHAR2(4),
  BOOK_DATE           DATE,
  VALUE_DATE          DATE,
  MATURITY_DATE       DATE,
  CONTRACT_STATUS     CHAR(1),
  USER_DEFINED_STATUS VARCHAR2(4),
  CONTRACT_CCY        VARCHAR2(3),
  AMOUNT              NUMBER,
  PRODUCT_TYPE        VARCHAR2(2),
  PRODUCT_DESC        VARCHAR2(35),
  MODULE_CODE         VARCHAR2(2),
  PACKING_CREDIT      CHAR(1),
  TRADE_REF_NO        VARCHAR2(16),
  LATEST_ESN          NUMBER,
  VERSION_NO          NUMBER,
  SCODE               VARCHAR2(15 CHAR),
  XREF                VARCHAR2(16 CHAR),
  AMOUNT_DISBURSED    NUMBER,
  AMOUNT_OUTSTANDING  NUMBER);
  

TYPE ty_tb_v_iftb_olamount_due IS TABLE OF OLTB_IF_OLAMOUNT_DUE%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_iftb_olcontract_master IS TABLE OF OLTB_IF_OLCONTRACT_MASTER%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_ifdolcon IS RECORD (
     v_iftb_olcontract_master     OLTB_IF_OLCONTRACT_MASTER%ROWTYPE,
     v_iftb_olamount_due          ty_tb_v_iftb_olamount_due,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );
         


END olpks_ifdolcon;
/