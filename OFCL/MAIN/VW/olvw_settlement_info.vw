CREATE OR REPLACE FORCE VIEW olvw_settlement_info ( 
ROW_ID, 
CHANGE_AC, CHANGE_RATE, PARTY_INFO_ALLOWED, COVER_REQUIRED, 
NETTING_INDICATOR, CHARGES_DETAILS, OUR_CORRESPONDENT, RECEIVER, 
INT_REIM_INST1, INT_REIM_INST2, INT_REIM_INST3, INT_REIM_INST4, 
RCVR_CORRESP1, RCVR_CORRESP2, RCVR_CORRESP3, RCVR_CORRESP4, 
INTERMEDIARY1, INTERMEDIARY2, INTERMEDIARY3, INTERMEDIARY4, 
ACC_WITH_INSTN1, ACC_WITH_INSTN2, ACC_WITH_INSTN3, ACC_WITH_INSTN4, 
PAYMENT_DETAILS1, PAYMENT_DETAILS2, PAYMENT_DETAILS3, PAYMENT_DETAILS4, 
SNDR_TO_RCVR_INFO1, SNDR_TO_RCVR_INFO2, SNDR_TO_RCVR_INFO3, SNDR_TO_RCVR_INFO4, 
SNDR_TO_RCVR_INFO5, SNDR_TO_RCVR_INFO6, ORDERING_INSTITUTION1, ORDERING_INSTITUTION2, 
ORDERING_INSTITUTION3, ORDERING_INSTITUTION4, ORDERING_CUSTOMER1, ORDERING_CUSTOMER2, 
ORDERING_CUSTOMER3, ORDERING_CUSTOMER4, BENEF_INSTITUTION1, BENEF_INSTITUTION2, 
BENEF_INSTITUTION3, BENEF_INSTITUTION4, ULT_BENEFICIARY1, ULT_BENEFICIARY2, 
ULT_BENEFICIARY3, CONTRACT_REF_NO, EVENT_SEQ_NO, AMOUNT_TAG, 
VERSION_FLAG, TAG_CCY, ACC_BRANCH, ACCOUNT, 
ACC_CCY, CCY_RESTRICTION, EX_RATE, VALUE_DATE, 
SETTLEMENT_AMT, PAY_RECEIVE, PAYMENT_BY, TRANSFER_TYPE, 
INSTRUMENT_TYPE, INSTRUMENT_NO, ULT_BENEFICIARY4, EX_RATE_FLAG, 
ERI_CCY, ERI_AMOUNT, GEN_MESSAGE, RATE_CODE_PREFERRED, 
ACC_WITH_INSTN5, BENEF_INSTITUTION5, INTERMEDIARY5, INT_REIM_INST5, 
ORDERING_CUSTOMER5, ORDERING_INSTITUTION5, RCVR_CORRESP5, ULT_BENEFICIARY5, 
SEND_MESG, IBAN_AC_NO, MIN_EVENT_SEQ_NO, EXT_PARTY_BIC, 
EXT_PARTY_NAME, EXT_PARTY_ACCOUNT, AMOUNT_TAG_TYPE ) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_settlement_info.VW
**
** Module	: LD
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
**--------------------------------------------------------------------------------------------------
**----------------------------------------------------------------------------------------------------
**CHANGE HISTORY
**09-Oct-2002 FCC 4.1 Oct 2002 Change for ITR1 SFR no 131
**				     File was in WORD format and was not able to compile
**08-Apr-2004 FCC 4.5 Lot2 Retro Changes added missed out retro PLC40100055 Module Code is hardcoded to "LD", 
**				Thus incorrect records shown in IS Info in Auth. Of  MMContracts
**22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO
**		  UNIT Has Been Added As Part Of UK-BLR CONSOLIDATION
**06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UK RETRO<CITIUPG73100387> ,For participant contracts when we visit settlement screen ISSETMVW from message 
**			    	  					summary screen settlement details are not appeared
**01-OCT-2009 CITIUS-LS Till#6415(JIRA#1155),Tax component is not getting displayed in the settlement screen during authorisation related fixes
**05-OCT-2009 CITIUS-LS#6734 To allow tax compoent
**23-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS-LS#6782 COMM_FLAT is not displayed in the settlment info screen.
**23-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO EURCITIPLC#19587 changes to display assignment fee tags in settlement details.
**13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS vol1 Tag06 SLT Combined Ticket settlement changes
**
**Changed By         : Rajni Kumari
**Changed On         : 14-Mar-2022
**Search String      : OBCL_14.4_SMTB_#33955860 Changes
**Change Reason      : Bug 33955860 - TLDSETTL : DURING AUTHORISING A SETTLEMENT, "SETTLEMENT INFO" POPUP IS BLANK 
***************************************************************************************************************/ 	
 SELECT a.Rowid,
       a.Change_Ac,
       a.Change_Rate,
       a.Party_Info_Allowed,
       a.Cover_Required,
       a.Netting_Indicator,
       a.Charges_Details,
       a.Our_Correspondent,
       a.Receiver,
       a.Int_Reim_Inst1,
       a.Int_Reim_Inst2,
       a.Int_Reim_Inst3,
       a.Int_Reim_Inst4,
       a.Rcvr_Corresp1,
       a.Rcvr_Corresp2,
       a.Rcvr_Corresp3,
       a.Rcvr_Corresp4,
       a.Intermediary1,
       a.Intermediary2,
       a.Intermediary3,
       a.Intermediary4,
       a.Acc_With_Instn1,
       a.Acc_With_Instn2,
       a.Acc_With_Instn3,
       a.Acc_With_Instn4,
       a.Payment_Details1,
       a.Payment_Details2,
       a.Payment_Details3,
       a.Payment_Details4,
       a.Sndr_To_Rcvr_Info1,
       a.Sndr_To_Rcvr_Info2,
       a.Sndr_To_Rcvr_Info3,
       a.Sndr_To_Rcvr_Info4,
       a.Sndr_To_Rcvr_Info5,
       a.Sndr_To_Rcvr_Info6,
       a.Ordering_Institution1,
       a.Ordering_Institution2,
       a.Ordering_Institution3,
       a.Ordering_Institution4,
       a.Ordering_Customer1,
       a.Ordering_Customer2,
       a.Ordering_Customer3,
       a.Ordering_Customer4,
       a.Benef_Institution1,
       a.Benef_Institution2,
       a.Benef_Institution3,
       a.Benef_Institution4,
       a.Ult_Beneficiary1,
       a.Ult_Beneficiary2,
       a.Ult_Beneficiary3,
       a.Contract_Ref_No,
       a.Event_Seq_No,
       a.Amount_Tag,
       a.Version_Flag,
       a.Tag_Ccy,
       a.Acc_Branch,
       a.Account,
       a.Acc_Ccy,
       a.Ccy_Restriction,
       a.Ex_Rate,
       a.Value_Date,
       a.Settlement_Amt,
       a.Pay_Receive,
       a.Payment_By,
       a.Transfer_Type,
       a.Instrument_Type,
       a.Instrument_No,
       a.Ult_Beneficiary4,
       a.Ex_Rate_Flag,
       a.Eri_Ccy,
       a.Eri_Amount,
       a.Gen_Message,
       a.Rate_Code_Preferred,
       a.Acc_With_Instn5,
       a.Benef_Institution5,
       a.Intermediary5,
       a.Int_Reim_Inst5,
       a.Ordering_Customer5,
       a.Ordering_Institution5,
       a.Rcvr_Corresp5,
       a.Ult_Beneficiary5,
       a.Send_Mesg,
       a.Iban_Ac_No,
       a.Min_Event_Seq_No,
       a.Ext_Party_Bic,
       a.Ext_Party_Name,
       a.Ext_Party_Account,
       b.Amount_Tag_Type
  FROM Oltbs_Settlements a, Oltbs_Amount_Tag b, Oltb_Contract c
 WHERE a.Contract_Ref_No = c.Contract_Ref_No
   AND a.Amount_Tag = Decode(Module_Code,
                             'TL',
                             Decode(Substr(b.Amount_Tag, 1, 2),
                                    'AS',
                                    Decode(Instr(a.Amount_Tag, Tag_Ccy),
                                           0,
                                           b.Amount_Tag,
                                           b.Amount_Tag || '-' || Tag_Ccy),
                                    b.Amount_Tag /*||'-'||tag_ccy*/),
                             b.Amount_Tag) --OBCL_14.4_SMTB_#33955860 Changes
   AND b.Amount_Tag =
       Decode(Module_Code,
              'LP',
              Substr(b.Amount_Tag, 1, Instr(b.Amount_Tag, '_')) ||
              Decode(b.Amount_Tag_Type, 'T', 'AMT', 'PAY'),
              b.Amount_Tag)
   AND b.Module = c.Module_Code
/