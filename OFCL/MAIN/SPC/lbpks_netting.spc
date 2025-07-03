CREATE OR REPLACE PACKAGE lbpks_netting AS 
  /*--------------------------------------------------------------------------------------------------
  **
  ** File Name : lbpks_netting.SPC
  **
  ** Module : LS (Loan Syndication)
  
 	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */
/*------------------------------------------CHANGE HISTORY----------------------------------
04-JAN-2006  By S. V. Shirguppe  Flexcube V CL Release 7.1           Participant netting uncommented. 
                                                                     Componentwise building of netting . 
28-JUL-2006	FCC V.CL Release 7.1 changes outflow record in amount_due will not be inserted.
								using new view lbvws_cashflow_amount_due
24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 change
        A new function fn_populate_Part_outflow is added to insert outflow details
        into lbtbs_outflow_amount_due during VAMB
28-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 change
        Two new functions added. 
        1)FN_UPDATE_NETTING_FOR_RENEWALS - This will be called from Rollover and Reprice authorization
          which check whether netting exists. If yes, fn_populate_netting will be called for
          both Borrower and Participant netting.
        2)FN_REPRICE_EXIST
          This function will find whether a reprice instruction exists for a contract

*/


  -- OBJECT : lbpks_netting               DATE /TIME : 04-AUG-2005
  
  
  TYPE tableAmtDue 
  IS 
  TABLE OF --OLTB_AMOUNT_DUE_CS%ROWTYPE;
  lbvws_cashflow_amount_due%ROWTYPE --28-JUL-2006	FCC V.CL Release 7.1 changes
  INDEX BY BINARY_INTEGER;
  ----------------------------------------------------------------
  --1. FUNCTION to check if a master record exists
  --****************************************************************************************************
  -- This FUNCTION is overloaded. This FUNCTION takes the tranche_ref_no, customer no, currency, 
  -- value date and SSI Mnemonic as IN parameters. The corresponding record is searched and if found, 
  -- the Netting ref no is assigned to the OUT parameter. The FUNCTION RETURNs TRUE if found, 
  -- FALSE if not found. The parameters are :-
  --
  --   p_tranche_ref_no(IN)   : This is IN parameter that takes the tranche ref no.
  --   p_customer_no(IN)      : The counterparty of the tranche/Drawdown contract is passed here.
  --   p_ccy_code(IN)         : Currency of the contract.
  --   p_value_date(IN)       : Value date of the contract.
  --   p_ssi_mnemonic(IN)     : SSI Mnemonic for the contract.
  --   p_netting_ref_no(OUT)  : If the record is found, this parameter contains the netting ref of the 
  --                            corresponding record found in the ,aster table. If not found, 
  --                            then it has NULL.
  --*****************************************************************************************************
  FUNCTION fn_master_exists(p_tranche_ref_no     IN  VARCHAR2, 
                            p_customer_no        IN  VARCHAR2, 
                            p_ccy_code           IN  VARCHAR2, 
                            p_value_date         IN  VARCHAR2, 
                            p_ssi_mnemonic       IN  VARCHAR2,   -- Flexcube V CL Release 7.1 ssi_mnemonic uncommented by svs on 10/01/2006 .
                            p_netting_ref_no     OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --1(a). FUNCTION to check if a master record exists
  --****************************************************************************************************
  -- This FUNCTION is overloaded. This FUNCTION takes the tranche_ref_no or contract ref no or 
  -- netting ref no as IN parameters. The corresponding record is searched and if found, the FUNCTION 
  -- RETURNs TRUE otherwise it RETURNs FALSE. The parameters are :-
  --
  --   p_ref_no(IN)          : This is IN parameter that takes the tranche or netting ref no.
  --   p_contract_type(IN)   : A flag to describe the ref no passed as first parameter. The possible 
  --                           values are
  --                           'N'  - Netting ref No is passed in the first parameter.
  --                           'T'  - Tranche ref No is passed in the first parameter.
  --   p_netting_status(IN)  : This is a flag to check for the various netting status values. 
  --                           Netting status can be one of U, Y, W and P that stand for Not netted, 
  --                           Netted, Resolved but not authorised and Processed. This flag has a DEFAULT 
  --                           value C. The possible values that can be sent to this parameter are as follows:
  --                           A - All, 
  --                           C - Processed(both W and P),
  --                           N - Not in W and P, 
  --                           P - Processed, 
  --                           W - Processed but not authorised, 
  --                           U - Not netted, 
  --                           Y - Netted but not resolved
  --****************************************************************************************************
  FUNCTION fn_master_exists(p_ref_no               IN  VARCHAR2, 
                            p_contract_type        IN  VARCHAR2, 
                            p_netting_status_flag  IN  VARCHAR2 DEFAULT 'C') RETURN BOOLEAN;
  ----------------------------------------------------------------
  --2. FUNCTION to check if a detail record exists
  --****************************************************************************************************
  -- This FUNCTION is overloaded. This FUNCTION takes the tranche_ref_no, customer no, currency, value date 
  -- and SSI Mnemonic as IN parameters. The corresponding record is searched and if found, the Netting ref no 
  -- is assigned to the OUT parameter. The FUNCTION RETURNs TRUE if found, FALSE if not found. 
  -- The parameters are :-
  --
  --   p_tranche_ref_no(IN)      : This is IN parameter that takes the tranche ref no.
  --   p_customer_no(IN)         : The counterparty of the tranche/Drawdown contract is passed here.
  --   p_ccy_code(IN)            : Currency of the contract.
  --   p_value_date(IN)          : Value date of the contract.
  --   p_ssi_mnemonic(IN)        : SSI Mnemonic for the contract.
  --   p_netting_ref_no(OUT)     : If the record is found, this parameter contains the netting ref of the 
  --                               corresponding record found in the ,aster table. If not found, 
  --                               then it has NULL.
  --****************************************************************************************************
  FUNCTION fn_detail_exists(p_tranche_ref_no     IN  VARCHAR2, 
                            p_customer_no        IN  VARCHAR2, 
                            p_ccy_code           IN  VARCHAR2,
                            p_value_date         IN  DATE, 
                            p_ssi_mnemonic       IN  VARCHAR2,      -- Flexcube V CL Release 7.1 ssi_mnemonic uncommented by svs on 10/01/2006 .
                            p_netting_ref_no     OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --2(a). FUNCTION to check if a detail record exists
  --****************************************************************************************************
  -- This FUNCTION is overloaded. This FUNCTION takes the tranche_ref_no or contract ref no or netting ref no 
  -- as IN parameters. The corresponding record is searched and if found, the FUNCTION RETURNs TRUE otherwise 
  -- it RETURNs FALSE. The parameters are :-
  --
  --   p_ref_no(IN)         : This is IN parameter that takes the tranche or netting ref no.
  --   p_contract_type(IN)  : A flag to describe the ref no passed as first parameter. The possible values are
  --                          'C'  - Contract ref No is passed in the first parameter.
  --                          'N'  - Netting ref No is passed in the first parameter.
  --                          'T'  - Tranche ref No is passed in the first parameter.
  --   p_netting_status(IN) : This is a flag to check for the various netting status values. Netting status 
  --                          can be one of U, Y, W and P that stand for Not netted, Netted, Resolved but 
  --                          not authorised and Processed. This flag has a DEFAULT value C. 
  --                          The possible values that can be sent to this parameter are as follows:
  --                          A - All, 
  --                          C - Processed(both W and P),
  --                          N - Not in W and P, 
  --                          P - Processed, 
  --                          W - Processed but not authorised, 
  --                          U - Not netted, 
  --                          Y - Netted but not resolved
  --****************************************************************************************************
  FUNCTION fn_detail_exists(p_ref_no               IN  VARCHAR2, 
                            p_contract_type        IN  VARCHAR2, 
                            p_netting_status_flag  IN VARCHAR2 DEFAULT 'C') RETURN BOOLEAN;
  ----------------------------------------------------------------
  --3. FUNCTION to check if netting is required for a given borrower contract
  --****************************************************************************************************
  -- The FUNCTION requires either a drawdown or a tranche contract ref no as parameter. It checks the 
  -- Netting pref field of the tranche from the lbtbs_contract_borrowers under which the current drawdown
  -- is made. The Netting pref may be one of Y, P or N for borrower contracts. 
  -- Based on this, all, Principal or no components are considered for netting. The FUNCTION RETURNs TRUE 
  -- when the netting is required. Else it RETURNs FALSE. The FUNCTION could also RETURN FALSE, if an error 
  -- occurs in the FUNCTION. The parameters are:
  -- 
  --p_contract_ref_no(IN)           : The borrower drawdown/tranche ref no for which the check is to be made.
  --p_components_to_be_netted(OUT)  : This is OUT parameter that contains the components to be netted. 
  --                                  This is a parameter to the  fn_INSERT_detail_records FUNCTION. 
  --                                  This fuction RETURNs
  --                                  ALL       - If all the components must be considered for netting.
  --                                  PRINCIPAL - If only Principal component must be netted.
  --****************************************************************************************************
  FUNCTION is_borrower_netting_req(p_contract_ref_no          IN  VARCHAR2, 
                                   p_components_to_be_netted  OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --4. FUNCTION to check if netting is required for a given participant contract
  --****************************************************************************************************
  -- The FUNCTION requires either a drawdown or a tranche contract ref no as parameter. It checks the 
  -- Netting pref field of the tranche from the lbtbs_contract_participant under which the current 
  -- drawdown is made. The Netting pref may be Y or N for participant contracts. Based on this, all or no 
  -- components are considered for netting. The FUNCTION RETURNs TRUE when the netting is required. 
  -- Else it RETURNs FALSE. The FUNCTION could also RETURN FALSE, if an error occurs in the FUNCTION. 
  -- The parameters are:
  -- 
  -- p_contract_ref_no(IN)          : The borrower drawdown/tranche ref no for which the check is to be made.
  -- p_components_to_be_netted(OUT) : This is OUT parameter that contains the components to be netted. 
  --                                  This is a parameter to the  fn_INSERT_detail_records FUNCTION. 
  --                                  This fuction RETURNs
  --                                  ALL- If all the components must be considered for netting.
  --****************************************************************************************************
  FUNCTION is_participant_netting_req(p_contract_ref_no         IN  VARCHAR2, 
                                      p_components_to_be_netted OUT VARCHAR2) RETURN BOOLEAN;  -- Flexcube V CL Release 7.1 uncommented by svs on 10/01/2006 .
  ----------------------------------------------------------------
  --5. FUNCTION to check if a contract is netted or not
  --****************************************************************************************************
  -- The FUNCTION checks if a particular contract has already been netted. It RETURNs TRUE if the contract 
  -- has been netted. Else it RETURNs FALSE. The FUNCTION could also RETURN FALSE, if an error occurs in 
  -- the FUNCTION. The parameters are:
  -- 
  --   p_contract_ref_no(IN)  : The borrower drawdown/tranche ref no for which the check is to be made.
  --   p_already_netted(OUT)  : This is OUT parameter that contains the records that are netted. This is a 
  --                            record of table oltbs_amount_due_cs.
  --****************************************************************************************************
  FUNCTION is_netted(p_contract_ref_no   IN  VARCHAR2, 
                     p_already_netted    IN  OUT tableAmtDue) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --6. FUNCTION to INSERT INTO lbtbs_cashflow_netting_detail
  --****************************************************************************************************
  -- The FUNCTION INSERTs INTO the lbtbs_cashflow_netting_detail based on the components passed as tilda(~) 
  -- separated values. Also, details must be provided as to the counterparty type. Whether the record being 
  -- INSERTed is a borrower or participant. Two OUT parameters that RETURN error and the parameters required 
  -- to show the error are RETURNed in case of any exceptions occured. 
  -- The parameters are:
  -- 
  --   p_contract_ref_no(IN)   : The drawdown/tranche ref no for which the record is to be INSERTed. 
  --                             The contract could be a borrower contract or a participant contract.
  --   p_counterparty_type(IN) : Whether the contract is for a borrower or a participant or Lead agent. 
  --                             The possible values are -
  --                             B - Borrower
  --                             P - Participant
  --                             L - Lead Agent
  --   p_components(IN)        : A tilda(~) separated list of components to be netted. THe components can 
  --                             be any of the components that appear in the component column of the
  --                             OLTB_AMOUNT_DUE_CS table.
  --   p_err(OUT)              : This is OUT parameter that contains the error code that may occur in the 
  --                             FUNCTION. This contains the error_code defined in the ERTBS_MSGS table. 
  --                             The length of this must at least be one greater than the column length in ERTBS_MSGS.
  --   p_err_params(OUT)       : THis field contains the parameters for the error code occured. THis variable 
  --                             must be sufficiently Large to accomodate oracle errors. VARCHAR2(1000) or 
  --                             more would be apt.
  --****************************************************************************************************
  FUNCTION fn_INSERT_detail_records(p_contract_ref_no   IN  VARCHAR2, 
                                    p_components        IN  VARCHAR2 DEFAULT 'ALL', 
                                    p_err               OUT VARCHAR2, 
                                    p_err_params        OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --7. FUNCTION to INSERT INTO lbtbs_cashflow_netting_master. THis must be called after populating 
  --   lbtbs_cashflow_netting_detail.
  --****************************************************************************************************
  -- The FUNCTION INSERTs INTO the lbtbs_cashflow_netting_master for the given contract. For this to happen, 
  -- the detail records MUST HAVE BEEN ALREADY POPULATED. Otherwise, the master will not get populated. 
  -- A cursor SELECTs all the distinct records based on Customer no, tranche ref no, Currency, value date and 
  -- SSI mnemonic where the netting ref no column is NULL for the current contract ref no. For all the records 
  -- fetched by the cursor, netting ref is generated if there is no existing record matching the same columns. 
  -- If a record exists, the same netting ref no is UPDATEd in the detail table for all the matching records. 
  -- Two OUT parameters that RETURN error and the parameters required to show the error are RETURNed in case 
  -- of any exceptions occured. The parameters are:
  -- 
  --   p_contract_ref_no(IN) : The drawdown/tranche ref no for which the record is to be INSERTed. 
  --                           The contract could be a borrower contract or a participant contract.
  --   p_err(OUT)            : This is OUT parameter that contains the error code that may occur in the 
  --                           FUNCTION. This contains the error_code defined in the ERTBS_MSGS table. The 
  --                           length of this must at least be one greater than the column length in ERTBS_MSGS.
  --   p_err_params(OUT)     : This field contains the parameters for the error code occured. THis variable 
  --                           must be sufficiently large to accomodate oracle errors. 
  --                           VARCHAR2(1000) or more would be apt.
  --****************************************************************************************************
  FUNCTION fn_INSERT_Netting_master(p_contract_ref_no    IN  VARCHAR2, 
                                    p_err                OUT VARCHAR2, 
                                    p_err_params         OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --8. FUNCTION to UPDATE the netting ref no INTO lbtbs_cashflow_netting_detail
  --****************************************************************************************************
  -- The FUNCTION UPDATEs the netting ref no in lbtbs_cashflow_netting_detail for a set of customer no, 
  -- tranche ref no, currency, value date and SSI Mnemonic. The netting ref no is UPDATEd for all the matching 
  -- records. The parameters are:
  -- 
  --   p_counterparty(IN)   : The customer no for which the netting ref no must be UPDATEd.
  --   p_tranche_ref_no(IN) : The tranche ref no in the detail table.
  --   p_CCY_code(IN)      : Currency code.
  --   p_value_date(IN)     : Value date of the contract.
  --   p_SSI_mnemonic(IN)   : SSI mnemonic for the contract.
  --   p_netting_ref_no(IN) : The netting ref of the master with which the detail records must be UPDATEd.
  --****************************************************************************************************
  FUNCTION fn_UPDATE_detail_netting_ref(p_counterparty     IN  VARCHAR2, 
                                        p_tranche_ref_no   IN  VARCHAR2, 
                                        p_CCY_code         IN  VARCHAR2, 
                                        p_value_date       IN  DATE,
                                        p_SSI_mnemonic     IN  VARCHAR2,   -- Flexcube V CL Release 7.1 ssi_mnemonic uncommented by svs on 10/01/2006 .
                                        p_netting_ref_no   IN  VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --9. FUNCTION to UPDATE lbtbs_cashflow_netting_master. 
  --****************************************************************************************************
  -- Updating the fields total cash flows, confirmed and unconfirmed cashflow amounts in the 
  -- lbtbs_cashflow_netting_master table are done by this FUNCTION. Once INSERTed and the neting ref no in 
  -- the detail table are UPDATEd. Alternatively, this FUNCTION can be called to recalculate the cash flows 
  -- after an UPDATE. But make sure the new rows in the detail table are UPDATEd with the netting ref no.
  -- The parameters are:
  -- 
  --   p_netting_ref_no(IN) : The netting ref no for which the cash dlows must be recalculated. 
  --   p_err(OUT)           : This is OUT parameter that contains the error code that may occur in the FUNCTION. 
  --                          This contains the error_code defined in the ERTBS_MSGS table. The length of this 
  --                          must at least be one greater than the column length in ERTBS_MSGS.
  --   p_err_params(OUT)    : This field contains the parameters for the error code occured. THis variable must 
  --                          be sufficiently large to accomodate oracle errors. VARCHAR2(1000) or more would be apt.
  --****************************************************************************************************
  FUNCTION fn_refresh_master_cashflows(p_ref_no         IN   VARCHAR2, 
                                       p_contract_type  IN   VARCHAR2,
                                       p_err            OUT  VARCHAR2, 
                                       p_err_params     OUT  VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  FUNCTION fn_refresh_master_cashflows(p_netting_ref_no   IN  VARCHAR2, 
                                       p_err              OUT VARCHAR2, 
                                       p_err_params       OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --10. FUNCTION fn_populate_netting
  --****************************************************************************************************
  -- FUNCTION fn_populate_netting populates the LSTBS_NETTING_MASTER and LSTBS_NETTING_DETAIL tables for 
  -- future nettings required under the tranche and across drawdowns. This package internally calls 
  -- fn_INSERT_netting or fn_DELETE_netting_details which are internal private FUNCTIONs to the package. 
  -- This FUNCTION must be called after saving the LS contract and OLTB_AMOUNT_DUE_CS is populated. 
  -- Otherwise nothing will be INSERTed INTO the netting tables. 
  -- Parameters this FUNCTION accepts are:
  --   1. p_contract_ref_no(IN) : The drawdown contract reference NUMBER which has just been saved.
  --   2. p_ins_amnd_dele(IN)   : Flag for INSERTing, amending or deleting the netting information.
  --                              This parameter can have 'I' for INSERT, 'A' for Amend and 
  --                              'D' for DELETE options.
  --   3. p_component           : Component name from oltbs_amount_due_cs . 
  --   4. p_component_type      : Component type from oltbs_amount_due_cs .       
  --   5. p_err(OUT)            : RETURNs the error encountered within the FUNCTION. This error code 
  --                              is the err_code of ERTBS_MSGS and not Oracle error code.
  --   6. p_err_params(OUT)     : This parameter must be sufficiently large. VARCHAR2(500) or more would 
  --                              be ideal. Here the parameters for the ERTBS_MSGS is passed. In case of 
  --                              oracle errors, this parameter contains the error information 
  --                              viz. SQLCODE and SQLERRM.
  --****************************************************************************************************
  FUNCTION fn_populate_netting(p_contract_ref_no   IN  VARCHAR2, 
                               p_Ins_Amnd_Dele     IN  VARCHAR2,
                               P_COMPONENT         IN  VARCHAR2     DEFAULT 'ALL',   -- Flexcube V CL Release 7.1 addition for componentwise netting by svs . 
                               P_COMPONENT_TYPE    IN  VARCHAR2     DEFAULT NULL,    -- Flexcube V CL Release 7.1 addition for componentwise netting by svs . 
                               p_err               OUT VARCHAR2, 
                               p_err_params        OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --11. FUNCTION to confirm the cash flows in lbtbs_cashflow_netting_detail and OLTB_AMOUNT_DUE_CS
  --****************************************************************************************************
  -- This FUNCTION is called after the cashflow confirmation is done on the OLTB_AMOUNT_DUE_CS side from the 
  -- front-end. First the PAY_CONF_STATUS in OLTB_AMOUNT_DUE_CS is UPDATEd to either W or V(from N to Y is W, 
  -- from Y to N is V) and then this FUNCTION is called. This FUNCTION takes all the records with 
  -- pay_conf_status as W or V and UPDATE to Y or N respectively. Also, the CFLOW_CONFIRMED_STATUS for the 
  -- corresponding record in lbtbs_cashflow_netting_detail is UPDATEd to the same flag as that of OLTB_AMOUNT_DUE_CS. 
  -- Another FUNCTION FN_CONFIRM_CASHFLOW_NETTING does the reverse of this FUNCTION.
  -- Parameters this FUNCTION accepts are:
  --   1. p_contract_ref_no(IN) : The drawdown contract reference NUMBER which has just been saved.
  --   2. p_err(OUT)            : RETURNs the error encountered within the FUNCTION. This error code is 
  --                              the err_code of ERTBS_MSGS and not Oracle error code.
  --   3. p_err_params(OUT)     : This parameter must be sufficiently large. VARCHAR2(500) or more would be 
  --                              ideal. Here the parameters for the ERTBS_MSGS is passed. In case of 
  --                              oracle errors, this parameter contains the error information 
  --                              viz. SQLCODE and SQLERRM.
  --****************************************************************************************************
  FUNCTION fn_confirm_cashflow_amtdue(p_contract_ref_no   IN  VARCHAR2,
                                      p_err               OUT VARCHAR2,
                                      p_err_params        OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --12. FUNCTION to confirm the cash flows in lbtbs_cashflow_netting_detail and OLTB_AMOUNT_DUE_CS
  --****************************************************************************************************
  -- This FUNCTION is called after the cashflow confirmation is done on the lbtbs_cashflow_netting_detail 
  -- side from the front-end. First the CFLOW_CONFIRMED_STATUS in lbtbs_cashflow_netting_detail is UPDATEd 
  -- to either W or V(from N to Y is W, from Y to N is V) and then this FUNCTION is called. This FUNCTION 
  -- takes all the records with CFLOW_CONFIRMED_STATUS as W or V and UPDATE to Y or N respectively. 
  -- Also, the PAY_CONF_STATUS for the corresponding record in OLTB_AMOUNT_DUE_CS is UPDATEd to the same flag 
  -- as that of lbtbs_cashflow_netting_detail. Another FUNCTION FN_CONFIRM_CASHFLOW_AMTDUE does the reverse 
  -- of this FUNCTION.Parameters this FUNCTION accepts are:
  --   1. p_tranche_ref_no(IN) : The tranche reference NUMBER.
  --   2. p_err(OUT)         : RETURNs the error encountered within the FUNCTION. This error code is the 
  --                             err_code of ERTBS_MSGS and not Oracle error code.
  --   3. p_err_params(OUT)    : This parameter must be sufficiently large. VARCHAR2(500) or more would be 
  --                             ideal. Here the parameters for the ERTBS_MSGS is passed. In case of oracle 
  --                             errors, this parameter contains the error information viz. SQLCODE and SQLERRM.
  --****************************************************************************************************
  FUNCTION fn_confirm_cashflow_netting(p_tranche_ref_no   IN  VARCHAR2,
                                       p_err              OUT VARCHAR2,
                                       p_err_params OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  --13. FUNCTION to UPDATE the netting status in lbtbs_cashflow_netting_detail and lbtbs_cashflow_netting_master
  --****************************************************************************************************
  -- This FUNCTION is called after the cashflows are resolved/authorised. Once the cash flows are resolved, 
  -- the netting status in the detail is changed to W and the corresponding NETTING_STATUS column in 
  -- OLTB_AMOUNT_DUE_CS is changed to W. Once the resolved cash flow is confirmed, the status is changed to P.
  -- Parameters this FUNCTION accepts are:
  --   1. p_ref_no(IN)      : The tranche reference NUMBER.
  --   2. p_ref_no_type(IN) : This is a flag that can contain one of the following values -
  --                          N - Netting_ref_no is passed in p_ref_no
  --                          C - Contract_ref_no is passed in p_ref_no
  --                          T - Tranche_ref_no is passed in p_ref_no.
  --   3. p_flag_to_UPDATE  : This is a flag that informs the FUNCTION whether specific flags must be picked 
  --                          for UPDATE or all records under the given reference NUMBER must be picked up. 
  --                          NULL can also be passed. The possible values are -
  --                          NULL - All the records under the reference NUMBER must be taken. 
  --                          This will consider the flags U, N, Y, W and P.
  --                            U - Records with only U as Netting status are picked and UPDATEd in the 
  --                                OLTB_AMOUNT_DUE_CS table.
  --                            N - Records for the given reference NUMBER which have the Netting 
  --                                status as N are picked up. Only the corresponding records in 
  --                                OLTB_AMOUNT_DUE_CS are UPDATEd.
  --                            Y - Records with only Y are picked up.
  --                            W - Records with netting status W(i.e., Resolved but not authorised) 
  --                                are picked up.
  --                            P - Only processed records(Netting status as P) are picked and UPDATEd.
  --   4. p_err(OUT)        : RETURNs the error encountered within the FUNCTION. This error code is the 
  --                          err_code of ERTBS_MSGS and not Oracle error code.
  --   5. p_err_params(OUT) : This parameter must be sufficiently large. VARCHAR2(500) or more would be 
  --                          ideal. Here the parameters for the ERTBS_MSGS is passed. In case of oracle 
  --                          errors, this parameter contains the error information viz. SQLCODE and SQLERRM.
  --****************************************************************************************************
  FUNCTION fn_UPDATE_netting_status(p_ref_no          IN  VARCHAR2, 
                                    p_ref_no_type     IN  VARCHAR2, 
                                    p_flag_to_UPDATE  IN  VARCHAR2, 
                                    p_err             OUT VARCHAR2, 
                                    p_err_params      OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  FUNCTION fn_get_settle_msg_date(p_netting_ref_no    IN  VARCHAR2) RETURN DATE;
  ----------------------------------------------------------------
  FUNCTION fn_UPDATE_settled_amountDue(p_contract_ref_no  IN  VARCHAR2, 
                                       p_err              OUT VARCHAR2, 
                                       p_err_params       OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------
  FUNCTION fn_borr_part_master_exists(p_ref_no               IN  VARCHAR2, 
                                      p_contract_type        IN  VARCHAR2, 
                                      p_netting_status_flag  IN  VARCHAR2 DEFAULT 'C') RETURN BOOLEAN;
  ----------------------------------------------------------------
  FUNCTION fn_borr_part_detail_exists(p_ref_no              IN  VARCHAR2, 
                                      p_contract_type       IN  VARCHAR2, 
                                      p_netting_status_flag IN  VARCHAR2 DEFAULT 'C') RETURN BOOLEAN;
  ----------------------------------------------------------------
--24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 changes start
FUNCTION fn_populate_Part_outflow(
		p_borrow_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		p_err_code 		 IN OUT VARCHAR2,
		p_err_params		 IN OUT VARCHAR2
		)
RETURN BOOLEAN; 
--24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 change end
--28-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 change start
FUNCTION fn_reprice_exist
        (
           P_Contract_ref_no    IN oltbs_contract_master.CONTRACT_REF_NO%TYPE,
           p_version_no         IN oltbs_contract_master.VERSION_NO%TYPE
        )
RETURN varchar2;
FUNCTION fn_update_netting_for_renewals
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT		VARCHAR2,
	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN ;
--28-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#110 change end
END lbpks_netting;
/
CREATE or replace SYNONYM lbpkss_netting FOR lbpks_netting
/