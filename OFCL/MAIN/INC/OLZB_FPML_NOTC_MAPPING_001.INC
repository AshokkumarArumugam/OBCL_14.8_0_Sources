PROMPT PROCESSING FOR OLZB_FPML_NOTC_MAPPING_001

BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('amendContract',
'Contract Amendment Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:exceptionFlag~fpml:loanContract~qfn:amendmentDate~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'VAMB, IRAM, MRFX, REVN, FRFX, CUAD',
'A',
'Y',
'N',
'FPML_AMEND_CONT'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('cancel',
'Cancel Notice',
'qfn:messageId',
'VAMC, REVP, REVC, ZAMG, CUAD, AMEI',
'B',
'N',
'Y',
'FPML_CANCEL_NTC'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('commitmentAdjustment',
'Commitment Adjustment Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:exceptionFlag~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party~qfn:effectiveDate',
'VAMB',
'A',
'Y',
'N',
'FPML_COM_ADJMNT'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('dealDefinition',
'Deal Definition Notice',
'qfn:dealDefinition~Agnt.qfn:party~Borr.qfn:party',
'VAMI',
'B',
'N',
'N',
'FPML_DEAL_DFNTN'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('drawdown',
'Drawdown Notice',
'fpml:header~fpml:noticeDate~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:loanContract~fpml:drawdownEventType~fpml:drawdownPayment~Agnt.fpml:party~Borr.fpml:party~Lend.fpml:party',
'BOOK or DNOT, VAMB, ZAMG',
'A',
'Y',
'Y',
'FPML_DRWDWN_NTC'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('interestPayment',
'Interest Payment Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:exceptionFlag~fpml:loanContractSummary~qfn:interestPayment~qfn:interestAccrualSchedule~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'LIQD, MRLQ, SPTI, ROLL',
'A',
'Y',
'N',
'FPML_INTRST_PMT'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('lcIssuance',
'LC Issuance Notice',
'fpml:header~fpml:noticeDate~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:sublimitParticipation~fpml:loanContract~fpml:drawdownEventType~fpml:drawdownPayment~Agnt.fpml:party~Borr.fpml:party~Lend.fpml:party~qfn:lcType~qfn:beneficiaryPartyReference',
'BOOK, VAMB, LIQD, MRLQ, SPTI, ROLL',
'A',
'Y',
'N',
'FPML_LC_ISSUNCE'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('lcTermination',
'LC Termination Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:lcSummary~lcTermination.fpml:effectiveDate~fpml:lcExpiryFlag~Agnt.fpml:party~Borr.fpml:party~Lend.fpml:party',
'LIQD, MRLQ, SPTI, ROLL',
'A',
'Y',
'N',
'FPML_LC_TERMNTN'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('onGoingFee',
'On Going Fee Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~qfn:loanContractSummary~qfn:feePayment~qfn:feeAccrualSchedule~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'FAMD, FLIQ, ZAMG, FRFX',
'A',
'Y',
'N',
'FPML_ON_GNG_FEE'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('oneOffFee',
'One Off Fee Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~qfn:loanContractSummary~qfn:lcSummary~qfn:feePayment~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'FLIQ',
'A',
'Y',
'N',
'FPML_ONE_OF_FEE'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('positionUpdate',
'Position Update Notice',
'fpml:header~qfn:partyReference~qfn:dealSummary~qfn:transferState~qfn:effectiveDate~qfn:knowledgeDate~qfn:facilityPortfolioPositions~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'PRAM, PAMI, ZAMG, AMEI',
'P',
'Y',
'Y',
'FPML_POSTN_UPDT'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('rateSet',
'Rate Set Notice',
'fpml:header~qfn:noticeDate~qfn:dealSummary~qfn:facilitySummary~qfn:loanContractSummary~qfn:lcSummary~qfn:effectiveDate~qfn:interestRateSummary~qfn:fxRate~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party',
'VAMB, IRAM, MRFX, REVN, FRFX, ERAM',
'A',
'Y',
'N',
'FPML_RATE_SET'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('repayment',
'Repayment (Principal) Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:repayment~Agnt.fpml:party~Borr.fpml:party~Lend.fpml:party',
'LIQD, MRLQ, SPTI, ROLL',
'A',
'Y',
'N',
'FPML_REPMNT_NTC'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('rollover',
'Rollover Notice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:exceptionFlag~fpml:comments~fpml:maturingLoanContracts~fpml:newLoanContracts~Agnt.fpml:party~Borr.fpml:party~Lend.fpml:party~qfn:type',
'ROLL, SPTI, MRGI',
'A',
'Y',
'N',
'FPML_ROLOVR_NTC'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('takeOnDealDefinition',
'Take on Deal Definition Notice',
'qfn:dealDefinition~Agnt.qfn:party~Borr.qfn:party~Coborr.qfn:party~qfn:currentCommitment~qfn:effectiveDate',
'ZAMG',
'B',
'N',
'Y',
'FPML_TAK_ON_DDF'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_NOTC_MAPPING
(NOTC_NAME,NOTC_DESC,NOTC_TS_FORMAT,ASSOCITED_EVENT
,NOTC_LEVEL,NOTC_BULK_REQD,NOTC_REGEN_REQD,MSG_TYPE)
 VALUES 
('takeOnFacility',
'Take on Facility Notice',
'qfn:dealSummary~qfn:agentPartyReference~qfn:effectiveDate~qfn:takeOnFacilities~Agnt.qfn:party~Borr.qfn:party~Coborr.qfn:party',
'ZAMG',
'B',
'N',
'Y',
'FPML_TAK_ON_FAC'
)
;
END;
/



commit;
