CREATE OR REPLACE PACKAGE Sypks_Utils AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : sypks_utils.spc
  **
  ** Module       : LD
  **
  **This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2016 ,
  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  change history----
  
    --06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
   -- 03-OCT-2016 -- Search String : OFCL 12.3 changes
  swift_addr is changed to swift_address column fetched from sttms_core_Swift_address instead of oltms_branch
   --03-OCT-2016 -- Search String : OFCL 12.3 changes
  end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch
  --02-DEC-2016 Included type and limits_module function used in olpks_lmpks .Search string--OFCL_12.3.0.0.0 Changes
  
    change history
	
	Changed By         : Pallavi R
	Date               : 21-Jul-2017
	Change Description : Changes done for Multiple Collateral/Pool Linkages
	Search String      : OBCL_12.5.0.0.0_Multi_Linkage changes
	
	--04-JUL-2017 Serach String : OBCL_12.5_Rate_Fixing --Added AND function to retrieve rate fixing required parameter from OLTBS_LOAN_PARAM_detail
	
	**Changed By         : Shishirkumar Aithal
    **Changed On         : 30-Nov-2017
    **Change Description : Added revision schedules while contract booking.
                           At EOD because of these revisions schedules we are seeing the multiple records in OLSRATLG screen. 
                           Added code for getting the latest esn from oltbs_contract table. And doing the assignment of ESN+1
                           for avioding the multiple inserts in OLSRATLG screen.
    **Search String      : Bug#27096387

     **Changed By         : Sitaraman V
    **Changed On         : 04-Jan-2018
    **Change Description : Added new variable g_accr_entry_on_holiday
    **Search String      : SFR#27229667
	
  Changed By         : Pallavi R
  Date               : 16-Mar-2018
  Change Description : OBCL_14.0.0.0.0_External_Call Changes
  Search String      : OBCL_14.0.0.0.0_External_Call Changes  
  
  Changed By         : Ranjan Kumar
  Date               : 25-May-2018
  Change Description : block_ref_no size chnaegs increase from 30 to 50
  Search String      : 14.1_SUP_EL_BLOCK_REF_CHANGES  

  **Changed By          : ArunaDevi Rajendran
  **Change Description  : OBCL_14.4_EAC - global variable for customer status message id
  **Search String       : OBCL_14.4_EAC
  **Changed On          : 9-Oct-2020
  
**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

   **Changed By          : Abhik Das
   **Date                : 24-Feb-2023
   **Change Description  : Column length has been modified for field LINE_CD in both 
                           ELCM and UBS. So, to support that modified length of 
                           linkage_ref_no field.
   **Search String       : OBCL_14.6_VAKIF_Bug#35047331_Changes
  **Changed By         : Mohan Pal/Navoneel Nandan
  **Date               : 18-Jul-2023
  **Change Description : FWDPORT of Bug#34818977 Changes done for Non STANDARD Currency Exchange Rates
  **Search String      : Bug#35572733
  
  Changed By         : Sowmya Bitra
  Changed On         : 31-Jan-2024
  Change Description : Performance Tuning Changes for Syndication Online Transactions with large number(300+) of participants 
  Search String      : Bug#36008580

  **Changed By         : Abhinav Kumar
  **Date               : 30-Apr-2024
  **Change Description : Added functions Fn_Get_Mis_Class_FRC for triggers refernce in OBCL.
  **Search String      : Bug#36511597

  **Changed By         : Baljinder Singh
  **Date               : 07-May-2024
  **Change Description : Logic introdcued to encrypt password
  **Search String      : 36543720_1
  
   **Changed By         : Vineeth T M
	**Date               : 30-Jul-2024
	**Change Description : OBCL_14.8_VER_ROL Changes
	**Search String      : OBCL_14.8_VER_ROL Changes 

 **Changed By        : Sasikumar Srinivasan
  **Date               : 31-Jul-2024
  **Change Description : g_job_mode and g_job_name is added for automation verification to capture case id during job processing.                          
  **Search String      : Bug#36900499
  
  **Changed By         : Guru
  **Date               : 10-Jul-2024
  **Change Description : Performance tuning changes for Exponential calculation by changing to collections instead of direct references to EXP tables.                          
  **Search String      : Bug#36825935
  
  **Changed By         : Chandra Achuta
  **Date               : 02-SEP-2024
  **Change Description : Introduced new function to check the events, post that should allow the FLIQ reversal.
  **Search String      : Bug#36972007

  **Changed By         : Akhila Samson
  **Date               : 05-NOV-2024
  **Change Description : Introduced new function for contract ref no generation.
  **Search String      : Bug#37178383  
	-----------------------------------------------------------------------------------------------------------------------------------*/
  g_rate_rev_esn oltbs_contract.latest_event_seq_no%TYPE;   --Bug#27096387  code added
  g_Liquidation_Flag VARCHAR2(1) := 'N';
  X9$                VARCHAR2(4) := 'OFCL';
  --Bug#36900499 Changes Starts.
  g_job_mode VARCHAR2(1) := 'N';
  g_job_name VARCHAR2(100) := 'XXX';
  --Bug#36900499 Changes Ends.
  Accouting_Mode     VARCHAR2(1) := 'E'; --E:=External;N:=Native --OBCL_14.0.0.0.0_External_Call Changes Changes
  g_ELCM_MSGID  VARCHAR2(35);   --- OBCL EOD external call changes
  g_RFR_MSGID  VARCHAR2(35);   --- OBCL_14.4_SOFR changes
  g_CUST_MSGID VARCHAR2(35);--OBCL_14.4_EAC
  g_CUSTACC_MSGID VARCHAR2(35);--OBCL_14.4_EAC
  g_Tbl_gltm__mis_class   Gltm_Mis_Class%ROWTYPE; --Bug#36511597
  
    g_events_list VARCHAR2(32767):= 'RADJ~SAMD~FREV~MRXB~CMSH~REAS~ENOT~FAMD~FELR~PMSG~IRAM~IRFX~MRFX~INOT~REVN~REVP~ZFMG~NOTC~LINK~DLNK~FRFX~FACR~ACCR~FLIQ~CAMD~GAMD~BOOK';   --Bug#36972007  Code Added								
  
  --Bug#36825935 Changes Starts
	TYPE typ_lftms_product_iccf IS TABLE OF lftms_product_iccf%ROWTYPE INDEX BY lftms_product_iccf.component%TYPE;
	g_Tbl_lftms_product_iccf typ_lftms_product_iccf;
	
	TYPE typ_lftms_product_iccf_tbl IS TABLE OF lftms_product_iccf%ROWTYPE INDEX BY BINARY_INTEGER; 
	g_Tbl_lftms_product_iccf_rec typ_lftms_product_iccf_tbl;
	
    
	TYPE tbl_oltbs_contract_preference IS TABLE OF oltbs_contract_preference%ROWTYPE INDEX BY VARCHAR2(200);
	g_tbl_oltbs_contract_preference tbl_oltbs_contract_preference;
	
	TYPE typ_lftms_product_iccf_neg IS TABLE OF lftms_product_iccf%ROWTYPE INDEX BY lftms_product_iccf.component%TYPE;
	g_Tbl_lftms_product_iccf_neg typ_lftms_product_iccf_neg;
	
	TYPE typ_lftbs_contract_interest IS TABLE OF lftbs_contract_interest%ROWTYPE INDEX BY VARCHAR2(200);
	g_Tbl_lftbs_Contract_Interest typ_lftbs_contract_interest;
	
	
	TYPE typ_olvws_derived_tag_recs IS RECORD 
    (
             derived_tag olvws_derived_tag.derived_tag%TYPE,
             based_on_tag olvws_derived_tag.based_on_tag%TYPE,
             actual_tag olvws_derived_tag.actual_tag%TYPE,
             based_on_derived olvws_derived_tag.based_on_derived%TYPE,
             based_on_penalty olvws_derived_tag.based_on_penalty%TYPE
    );
    TYPE typ_derived_tag_tbl IS TABLE OF VARCHAR2(200) INDEX BY VARCHAR2(200);
    g_Tbl_olvws_derived_tag_rc typ_derived_tag_tbl;
	           
    TYPE typ_derived_tag_row IS TABLE OF olvws_derived_tag%ROWTYPE;
    g_Tbl_olvws_derived_tag_bc typ_derived_tag_row;
	
	TYPE ty_tb_calc_schedules IS TABLE OF oltbs_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;    	
	TYPE ty_tb_amount_dues IS TABLE OF oltbs_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;    
	TYPE ty_tb_dsbr_sch IS TABLE OF oltbs_contract_dsbr_sch%ROWTYPE INDEX BY BINARY_INTEGER;
	g_Tbl_dsbr_sch ty_tb_dsbr_sch; --Bug#36825935_1 Changes
	TYPE ty_tb_contract_master IS TABLE OF oltbs_contract_master%ROWTYPE INDEX BY BINARY_INTEGER;   
	g_Tbl_contract_master ty_tb_contract_master; --Bug#36825935_1 Changes
	
	TYPE ty_tb_exp_calc IS TABLE OF oltbs_contract_iccf_exp%ROWTYPE INDEX BY BINARY_INTEGER;    
	
	TYPE ty_rc_exp_calc IS RECORD
	(		
		tbl_exp_row      oltbs_contract_iccf_exp%ROWTYPE
	);
	
	TYPE ty_tb_exp_calc_rec IS TABLE OF ty_rc_exp_calc INDEX BY VARCHAR2(1000);	
		
	TYPE ty_tb_iccf_calc_comp IS TABLE OF oltbs_contract_iccf_calc.component%TYPE INDEX BY oltbs_contract_iccf_calc.component%TYPE;
	g_ty_tb_iccf_calc_comp ty_tb_iccf_calc_comp;
	
	
    
	--Bug#36825935 Changes Ends
  
  TYPE Iccf_Rec_Type IS RECORD(
    
    Tag                     Oltbs_Amount_Tag.Amount_Tag%TYPE,
    Amt                     Lftbs_Contract_Interest.Amount%TYPE,
    Ccy                     Lftbs_Contract_Interest.Currency%TYPE,
    Lcy_Amt_Equiv           Lftbs_Contract_Interest.Amount%TYPE,
    Exch_Rate               Oltbs_Daily_Log_Ac.Exch_Rate%TYPE, ----FCC4.7 JAN 2005 PLNCITI Pl-20040726-58148E Changes
    Contract_Ccy            Lftbs_Contract_Interest.Currency%TYPE, -- 28-JULY-2004   FCC 4.6.1
    Chg_Amt_In_Contract_Ccy Lftbs_Contract_Interest.Amount%TYPE, -- 28-JULY-2004 FCC 4.6.1
    Settlement_Flag         CHAR(1),
    Tag_Type                CHAR(1),
    Vdate                   DATE,
    Account_Role_Code       Oltm_Product_Accrole.Accounting_Role%TYPE, -- 02-DEC -2004    FCC 4.6.1 BC Changes
    Norm_Or_Revr            CHAR(1) -- 04-DEC-2004    FCC 4.6.1 BC Changes
    );

  --OFCL_12.3.0.0.0 Changes starts

  TYPE Ty_Util_Details IS RECORD(
 Customer_No VARCHAR2(20), -- updated from 9 to 20
    Liability_No     VARCHAR2(20),
    Linkage_Type     CHAR(1), -- F,P, C OR L
	---OBCL_14.6_VAKIF_Bug#35047331_Changes Starts---
    --Linkage_Refno    VARCHAR2(30),
	Linkage_Refno    Oltbs_Acc_Coll_Link_Dtls.LINKED_REFERENCE_NO%TYPE,
	----OBCL_14.6_VAKIF_Bug#35047331_Changes Ends----
    Amt_Tag          VARCHAR2(25),
    --Trans_Amt        NUMBER(24,3), --Bug#33809404_DecimalChange 
    Trans_Amt        NUMBER, --Bug#33809404_DecimalChange
    Trans_Ccy        VARCHAR2(3),
    Trans_Percentage NUMBER(3),
    --Uncoll           NUMBER(24,3), --Bug#33809404_DecimalChange 
    Uncoll           NUMBER, --Bug#33809404_DecimalChange
    --Matured_Amt      NUMBER(24,3), --Bug#33809404_DecimalChange 
    Matured_Amt      NUMBER, --Bug#33809404_DecimalChange
    Remarks          VARCHAR2(255),
    Serial_No        NUMBER(4),
    Action           CHAR(1), -- N-New,A-Alter,E-Delete,I-Increase,D-Decrease,R-Reverse,M-Mature,V-Event Reversal,O-Reopen
    Cust_Exp_Id_1    VARCHAR2(255),
    Cust_Exp_Id_2    VARCHAR2(255),
    Cust_Exp_Id_3    VARCHAR2(255),
    Cust_Exp_Id_4    VARCHAR2(255),
    Cust_Exp_Id_5    VARCHAR2(255),
    Txn_Exp_Code_1   VARCHAR2(255),
    Txn_Exp_Code_2   VARCHAR2(255),
    Txn_Exp_Code_3   VARCHAR2(255),
    Txn_Exp_Code_4   VARCHAR2(255),
    Txn_Exp_Code_5   VARCHAR2(255),
    Add_Info1        VARCHAR2(255),
    Add_Info2        VARCHAR2(255),
    Add_Info3        VARCHAR2(255),
    Add_Info4        VARCHAR2(255),
    Add_Info5        VARCHAR2(255),
 Is_Account VARCHAR2(1),
    Block_Refno      VARCHAR2(50)); -- added Block Ref No -- FCUB 12.3 RABO Changes ----14.1_SUP_EL_BLOCK_REF_CHANGES

  TYPE Ty_Tb_Utils_Details IS TABLE OF Ty_Util_Details INDEX BY BINARY_INTEGER;

  TYPE Ty_Util_Master IS RECORD(
    Ref_No        VARCHAR2(30), -- contract ref no
    Trans_Date    DATE, -- transaction input date
    Value_Date    DATE, -- Transaction value date
    --Trans_Amt     NUMBER(24,3), --Bug#33809404_DecimalChange 
    Trans_Amt     NUMBER, --Bug#33809404_DecimalChange--  Txn amount -- consolidate amount or contract
    Trans_Ccy     VARCHAR2(3), -- txn ccy
 trans_brn sttm_core_branch.branch_code%TYPE, -- txn branch
    Trans_Prd     VARCHAR2(6), -- txn product
    Tenor_Basis   CHAR(1),
    Tenor         NUMBER(10), -- contract tenor
    Module        VARCHAR2(2), -- module which is sending the txn
    Maturity_Date DATE, -- contact maturity date
    Event_Code    VARCHAR2(4), -- cstbs_contract.curr_event_code%type; --FCUB 12.3 Standalone changes-- txn event code
    Event_Sq_No   NUMBER, --Cstbs_Contract.Latest_Event_Seq_No%TYPE, -- txn event seq no
    Forceprocess  CHAR(1),
    Simulation    VARCHAR2(1));

  TYPE Ty_Utils IS RECORD(
    Utils_Master  Ty_Util_Master,
    Utils_Details Ty_Tb_Utils_Details);

  --OFCL_12.3.0.0.0 Changes ends

  --OFCL12.3 changes starts

  TYPE Pctm_Chargeacmap_Rec_Type IS RECORD(
 cust_no sttm_core_customer.customer_no%TYPE,
 Cust_ac_brn sttm_core_branch.branch_code%TYPE,
 cust_ac sttm_core_account.cust_account_no%TYPE,
    Product_Code     VARCHAR2(4),
    Component        VARCHAR2(10),
    Currency         VARCHAR2(3),
 Charge_ac_brn sttm_core_branch.branch_code%TYPE,
 charge_ac sttm_core_account.cust_account_no%TYPE,
    Record_Stat      VARCHAR2(1),
    Auth_Stat        VARCHAR2(1),
    Once_Auth        VARCHAR2(1),
 maker_id smtb_user.user_id%TYPE,
    Maker_Dt_Stamp   DATE,
 checker_id smtb_user.user_id%TYPE,
    Checker_Dt_Stamp DATE,
    Mod_No           NUMBER(4),
    Module_Code      VARCHAR2(2));
  --OBCL_12.5.0.0.0_Multi_Linkage changes Starts
  TYPE Ty_Line_Id_Rec IS RECORD(
    Liab_No      VARCHAR2(20),
    Linkage_Ref  VARCHAR2(40),
    Description  VARCHAR2(1020),
    Linkage_Type VARCHAR2(1),
    Currency     VARCHAR2(12),
    Expiry_Date  DATE);
	
	--OBCL_14.8_CE_Length_Changes Start
    TYPE ty_tbl_contract_info IS TABLE OF Oltbs_Contract_Basic_Info%ROWTYPE INDEX BY Oltbs_Contract_Basic_Info.Contract_Ref_No%TYPE;
    rec_contract_info ty_tbl_contract_info;

    FUNCTION get_branch(p_contract_ref_no  IN VARCHAR2)
    RETURN VARCHAR2;

    FUNCTION get_product(p_contract_ref_no IN VARCHAR2)
    RETURN VARCHAR2;

    FUNCTION get_bookdate(p_contract_ref_no IN VARCHAR2)
    RETURN DATE;

    FUNCTION fn_get_branch_param_dets(p_branch_code VARCHAR2)
    RETURN oltms_core_branch%ROWTYPE
    RESULT_CACHE;
    --OBCL_14.8_CE_Length_Changes End
	--OBCL_14.8_VER_ROL changes start
    function fn_update_product(p_contract_ref_no in varchar2,
                             p_product         in oltb_Contract.PRODUCT_CODE%type)
    RETURN boolean;
    --OBCL_14.8_VER_ROL changes end

  TYPE Ty_Line_Id_Details IS TABLE OF Ty_Line_Id_Rec INDEX BY BINARY_INTEGER;
  --OBCL_12.5.0.0.0_Multi_Linkage changes Ends
  FUNCTION Fn_Resolve_Charge_Account(p_Custno         IN VARCHAR2,
                                     p_Custacbrn      IN VARCHAR2,
                                     p_Custacno       IN VARCHAR2,
                                     p_Module_Code    IN VARCHAR2,
                                     p_Prodcode       IN VARCHAR2,
                                     p_Component      IN VARCHAR2,
                                     p_Ccy            IN VARCHAR2,
                                     p_Chargeacmaprec OUT Pctm_Chargeacmap_Rec_Type)
    RETURN BOOLEAN;
  --OFCL12.3 changes ends
  TYPE Iccf_Tbl_Type IS TABLE OF Iccf_Rec_Type INDEX BY BINARY_INTEGER;

  TYPE Format_Rec IS RECORD(
    Tags  VARCHAR2(5),
    VALUE VARCHAR2(216));
  TYPE Lo_Data_Table IS TABLE OF Format_Rec INDEX BY BINARY_INTEGER;

  PROCEDURE Pr_Get_Ccy_Days(D1  DATE,
                            D2  DATE,
                            Ccy VARCHAR2,
                            d   OUT NUMBER,
                            m   OUT NUMBER,
                            y   OUT NUMBER);

  /*FUNCTION Fn_GetAvlBal_with_od--- OFCL12.2 Not required
        (
         pAccBr IN  sttms_account_bal_tov.branch_code%Type,
         pAcc IN  sttms_account_bal_tov.cust_ac_no%Type,
         pBal OUT sttms_account_bal_tov.acy_avl_bal%Type
        ) RETURN BOOLEAN;
  */ --- OFCL12.2 Not required

  FUNCTION Fn_Ol_Hash40(Intext IN VARCHAR2) RETURN NUMBER;

  FUNCTION Fn_Get_Date_Time(Pm_Appldate IN DATE) RETURN DATE;

  FUNCTION Branch_Walkin_Cif(p_Branch_Cif OUT Oltms_Customer.Customer_No%TYPE,
                             p_Walkin_Id  OUT Oltms_Customer.Customer_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Acnoline(Inpval IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Updauth(Pcontractref IN Oltbs_Contract.Contract_Ref_No%TYPE,
                      Peventseqno  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                      Puserid      IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Get_Branch_Paramval(p_Branch_Code IN Oltbs_Branch_Param.Branch_Code%TYPE,
                                  p_Param_Name  IN Oltbs_Branch_Param.Param_Name%TYPE)
    RETURN VARCHAR2;

  FUNCTION Do_It(Pcontractref  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                 Peventseqno   IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                 Perrorcodes   IN VARCHAR2,
                 Pparamlist    IN VARCHAR2,
                 Pamounts      IN VARCHAR2,
                 Pmodule       IN VARCHAR2,
                 Pdisplayreqd  IN CHAR,
                 Pupdatereqd   IN CHAR,
                 Psep          IN CHAR,
                 Plangcode     IN Smtbs_Language.Lang_Code%TYPE,
                 Pbatch_Online IN CHAR,
                 Pmsgs         OUT VARCHAR2,
                 Pmsgtypes     OUT VARCHAR2,
                 Pamount       OUT NUMBER,
                 Pcount        OUT NUMBER,
                 Ptype         OUT VARCHAR2,
                 Preterrcode   OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upmsg(Pcontractref IN Oltbs_Contract.Contract_Ref_No%TYPE,
                    Peventseqno  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                    Perrorcodes  IN VARCHAR2,
                    Pparamlist   IN VARCHAR2,
                    Pmodule      IN VARCHAR2,
                    Plangcode    IN Smtbs_Language.Lang_Code%TYPE,
                    Preterrcode  IN OUT VARCHAR2) RETURN BOOLEAN;
  -- OFCL12.3 changes start : fn_deleteovds moved from ovpkss
  FUNCTION Fn_Deleteovds(Pcontrefno  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         Peventseqno IN Oltbs_Contract.Latest_Event_Seq_No%TYPE)
    RETURN BOOLEAN;
  -- OFCL12.3 changes end

  TYPE Recovdsforupd IS RECORD(
    Contract_Ref_No VARCHAR2(16),
    Event_Seq_No    NUMBER,
    Ovd_Seq_No      NUMBER,
    Err_Code        Ertbs_Msgs.Err_Code%TYPE,
    View_Count      NUMBER,
    Remarks         Oltbs_Contract_Ovd.Remarks%TYPE);

  TYPE Tblovdsforupd IS TABLE OF Recovdsforupd INDEX BY BINARY_INTEGER;

  l_Ovdsforupd Tblovdsforupd;
  g_accr_entry_on_holiday   VARCHAR2(1); -- SFR#27229667 changes
  --OFCL 12.3 changes starts
  FUNCTION Fn_Get_Swift_Addr(Pbranchcode IN Oltms_Branch.Branch_Code%TYPE)
    RETURN VARCHAR2
	RESULT_CACHE; --Bug#36008580 Changes
  FUNCTION Fn_Get_End_Of_Input(Pbranchcode IN Oltms_Branch.Branch_Code%TYPE)
    RETURN VARCHAR2;
  FUNCTION Fn_Get_Row_For_Tag(p_Tag IN VARCHAR2) RETURN NUMBER;
  --OFCL 12.3 changes ends

  FUNCTION Fn_Splitrefno(Ref_No    IN VARCHAR2,
                         Branch    OUT VARCHAR2,
                         Product   OUT VARCHAR2,
                         Book_Date OUT DATE,
                         Sl_No     OUT Oltbs_Contract.Serial_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Limits_Module RETURN VARCHAR2; --OFCL_12.3.0.0.0 Changes
  FUNCTION Fn_Get_Tranche_Ref_No(p_Cusip_No            IN VARCHAR2,
                                 p_Position_Identifier IN VARCHAR2
                                 -- 24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes start
                                ,
                                 p_Branch  IN VARCHAR2 DEFAULT NULL,
                                 p_Product IN VARCHAR2 DEFAULT NULL,
                                 p_Module  IN VARCHAR2 DEFAULT NULL
                                 -- 24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes end
                                 ) RETURN VARCHAR2;

  FUNCTION Fn_Sum_Loan_Outstnd(p_Comm_Ref IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Get_Condi(p_Exp_Code IN Tltbs_Contract_Master.Expense_Code%TYPE)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Commitment_Ref(p_Position_Identifier IN Tltb_Contract_Master.Position_Identifier%TYPE,
                                 p_Cusip_No            IN Tltb_Contract_Master.Cusip_No%TYPE,
                                 p_Expense_Code        IN Tltbs_Contract_Master.Expense_Code%TYPE DEFAULT NULL --30-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7434 Changes
                                 ) RETURN VARCHAR2;

  FUNCTION Fn_Get_Orignominal_Amt(p_Position_Identifier IN Tltb_Contract_Master.Position_Identifier%TYPE,
                                  p_Cusip_No            IN Tltb_Contract_Master.Cusip_No%TYPE,
                                  p_Exp_Code            IN Tltb_Contract_Master.Expense_Code%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Get_Contract_Dtls(p_Contract_Ref_No IN VARCHAR2,
                                p_Contract_Type   IN VARCHAR2,
                                p_Field_Name      IN VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Firmacc(p_Cusip_No            IN Tltbs_Contract_Master.Cusip_No%TYPE, --16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7171
                          p_Position_Identifier IN Tltbs_Contract_Master.Position_Identifier%TYPE,
                          p_Exp_Code            IN Tltbs_Contract_Master.Expense_Code%TYPE,
                          p_Trade_Ref_No        IN Tltbs_Contract_Master.Contract_Ref_No%TYPE DEFAULT NULL --16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7171
                          ) RETURN VARCHAR2;

  FUNCTION Fn_Get_Proof(p_Pos_Id   IN VARCHAR2,
                        p_Cusip    IN VARCHAR2,
                        p_Exp_Code IN VARCHAR2 DEFAULT NULL --FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7272
                        ) RETURN VARCHAR2;

  FUNCTION Fn_Get_Exrate(
						 p_Contract_Ref_No IN oltbs_contract.contract_Ref_no%type,--Bug#35572733
						 Pbranch IN Oltms_Branch.Branch_Code%TYPE,
                         Pccy1   IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                         Pccy2   IN Cytms_Ccy_Defn.Ccy_Code%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Commitment_Transferavl(p_Ext_Contract_Ref_No IN VARCHAR2)
    RETURN NUMBER;

  FUNCTION Fn_Sum_Loan_Outstnd(p_Comm_Ref IN Oltbs_Contract.Contract_Ref_No%TYPE
                               --11-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7591,Changes Start Here
                               --CITIUS-LS#7431--CITIUS-LS#7765 commented
                               --, p_contract_type        IN        VARCHAR2 DEFAULT NULL --CITIUS-LS#7431
                              ,
                               p_Contract_Type IN VARCHAR2 --CITIUS-LS#7431 not able to compile as two declarations of fn_sum_loan_outstnd removed default word. --CITIUS-LS#7765
                               --CITIUS-LS#7431 CHANGES --CITIUS-LS#7765
                               --11-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7591, Changes Start Here
                               ) RETURN NUMBER;

  FUNCTION Fn_Get_Req_Gl(p_Cusip        IN VARCHAR2,
                         p_Pos_Id       IN VARCHAR2,
                         p_Gl_Type      IN VARCHAR2,
                         p_Product_Code IN VARCHAR2 DEFAULT NULL --13-SEP-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 Retro CITIUS#17927 Changes
                         ) RETURN VARCHAR2;

  FUNCTION Fn_Get_Trade_Details(p_Module          VARCHAR2,
                                p_Contract_Ref_No VARCHAR2,
                                p_Event_Seq_No    NUMBER,
                                p_Type            VARCHAR2 --'TICKET_ID','TRADE'
                                ) RETURN VARCHAR2;

  FUNCTION Fn_Get_Disc_Prem_Bal(p_Position_Identifier IN Tltbs_Contract_Master.Position_Identifier%TYPE,
                                p_Cusip_No            IN Tltbs_Contract_Master.Cusip_No%TYPE,
                                p_Exp_Code            IN Tltbs_Contract_Master.Expense_Code%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Get_Portfolio_Age(p_Expense_Code        IN VARCHAR2,
                                p_Position_Identifier IN VARCHAR2,
                                p_Cusip_No            IN VARCHAR2)
    RETURN NUMBER;

  FUNCTION Fn_Get_Rapid_Id(p_Contract_Ref_No IN VARCHAR2) RETURN NUMBER;

  FUNCTION Fn_Get_Outstanding_Avl(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Module_Code     IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Product_Type    IN Oltbs_Contract_Master.Product_Type%TYPE,
                                  p_Bal_Type        IN Lbtbs_Tranche_Vdbal_Master.Balance_Type%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Get_Comm_Ref(p_Position_Identifier IN Tltb_Contract_Master.Position_Identifier%TYPE,
                           p_Cusip_No            IN Tltb_Contract_Master.Cusip_No%TYPE,
                           p_Expense_Code        IN Tltb_Contract_Master.Expense_Code%TYPE)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Agency_Ref_No(p_Cusip_No            IN VARCHAR2,
                                p_Position_Identifier IN VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Rating(p_Cusip IN VARCHAR2, p_Rating IN VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Ol_Get_Part_Amt(p_Cusip_No            IN VARCHAR2,
                              p_Position_Identifier IN VARCHAR2,
                              p_Amt_Type            IN CHAR) RETURN NUMBER;

  FUNCTION Fn_Get_Maker_Id(p_Module          VARCHAR2,
                           p_Contract_Ref_No VARCHAR2,
                           p_Event_Seq_No    NUMBER,
                           p_Type            VARCHAR2) RETURN VARCHAR2;

  FUNCTION Fn_Get_Position_Detail(p_Cusip_No            IN Tltb_Position_Contract.Cusip_No%TYPE,
                                  p_Position_Identifier IN Tltb_Position_Contract.Position_Identifier%TYPE,
                                  p_Expense_Code        IN Tltb_Position_Contract.Expense_Code%TYPE,
                                  p_Balance_Type        IN VARCHAR2,
                                  p_From_Date           IN DATE DEFAULT NULL,
                                  p_To_Date             IN DATE DEFAULT NULL,
                                  p_Type                IN VARCHAR2, --originalccy/usdequal
                                  p_Ccy                 IN Tltbs_Current_Dated_Balance.Trade_Ccy%TYPE DEFAULT NULL,
                                  p_Branch              IN Tltbs_Position_Contract.Branch%TYPE DEFAULT NULL)
    RETURN NUMBER;

	--OBCL_12.5_Rate_Fixing starts
Function fn_get_proceed_with_rate_avl(p_param          IN oltbs_loan_param_detail.param%type,
                                    p_param_name     IN oltbs_loan_param_detail.param_name%type,
                                    p_proceed_with_prev_rate_avl  OUT VARCHAR2) 
                                    RETURN VARCHAR2;

--OBCL_12.5_Rate_Fixing ends

--Bug#36008580 Changes Start
FUNCTION  fn_get_cstb_param_value(p_param_name IN cstbs_param.param_name%TYPE)
RETURN VARCHAR2
RESULT_CACHE;

FUNCTION  fn_get_loan_param_value(p_param_name IN oltbs_loan_param_detail.param_name%TYPE)
RETURN VARCHAR2
RESULT_CACHE;
--Bug#36008580 Changes End
--Bug#36511597 Change starts
FUNCTION Fn_Get_Mis_Class_FRC(p_mis_type  IN Gltm_Mis_Class.Mis_Type%TYPE,
                              p_class_num Gltm_Mis_Class.Class_Num%TYPE)
  RETURN Gltm_Mis_Class%ROWTYPE RESULT_CACHE;
--Bug#36511597 Change Ends
--36543720_1 starts
g_key_to_use   VARCHAR2(1000) := 'OracleFinancialOBCL'; -- SFR#27229667 changes

FUNCTION fn_encrypt1
   (
   p_pwd             IN       VARCHAR2,
   p_key             IN       VARCHAR2,
   p_encrypted_pwd   OUT   VARCHAR2
   )RETURN BOOLEAN;
FUNCTION fn_decrypt1
   (
   p_encrypted_pwd   IN       VARCHAR2
   )RETURN VARCHAR2;
   --36543720_1 ends
   
--Bug#36825935 Changes Starts   
FUNCTION Fn_Get_Product_ICCF_FRC(
                  p_product_code  IN lftms_product_iccf.product%TYPE,
                  p_component IN lftms_product_iccf.component%TYPE
                                 )
RETURN lftms_product_iccf%ROWTYPE RESULT_CACHE;

FUNCTION Fn_Get_Product_ICCF_Rec_FRC(
										p_product_code  IN lftms_product_iccf.product%TYPE                  
									)
RETURN typ_lftms_product_iccf_tbl RESULT_CACHE;


FUNCTION Fn_Get_Contract_Preference_Rec(
											p_contract_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
											p_contract_rec     IN OUT oltbs_contract_preference%ROWTYPE											
										)
RETURN BOOLEAN;

FUNCTION Fn_Get_Product_ICCF_Neg_FRC(
										p_product_code  IN lftms_product_iccf.product%TYPE,
										p_component IN lftms_product_iccf.component%TYPE
                                 )
RETURN lftms_product_iccf%ROWTYPE RESULT_CACHE;

FUNCTION Fn_Get_Lftb_Contract_Interest(
											p_contract_ref_no  	IN lftbs_contract_interest.contract_reference_no%TYPE,
											p_component 		IN lftms_product_iccf.component%TYPE
									  )
RETURN lftbs_Contract_Interest%ROWTYPE;

FUNCTION Fn_Get_Derived_Comp_tbl_FRC (p_basis_amount_type IN lftms_product_iccf.basis_amount_type%TYPE)
RETURN typ_derived_tag_row;				

PROCEDURE pr_populate_amount_due (
											p_contract_ref_no  	IN lftbs_contract_interest.contract_reference_no%TYPE,											
											p_tb_amount_due 	OUT NOCOPY ty_tb_amount_dues
								 );

PROCEDURE pr_populate_dsbr_sch  (
											p_contract_ref_no  	IN lftbs_contract_interest.contract_reference_no%TYPE,											
											p_tb_dsbr_sch 	IN OUT NOCOPY ty_tb_dsbr_sch --Bug#36825935_1 Changes, Changed to INOUT from OUT
								);											
PROCEDURE pr_populate_contract_master (
										p_contract_ref_no  	IN lftbs_contract_interest.contract_reference_no%TYPE,
										p_tb_contract_master IN OUT NOCOPY ty_tb_contract_master
									  );   
--Bug#36825935 Changes Ends 

--Bug#37178383 Starts
 FUNCTION fn_process_tmp_Contract_refno_gen (
        p_Action_Code      IN VARCHAR2,
        P_MSGID                IN      Oltb_Req_Master.Msgid%TYPE,
        P_Function_id          IN      VARCHAR2,
		P_CONTRACT_REF_NO  IN oltbs_contract.contract_ref_no%TYPE,
        p_err_code           IN OUT  VARCHAR2,
        p_err_params         IN OUT  VARCHAR2
    ) RETURN BOOLEAN;

--Bug#37178383 Ends  
   
   
END Sypks_Utils;
/
CREATE OR REPLACE Synonym Sypkss_Utils FOR Sypks_Utils
/
