PROMPT PROCESSING FOR OLZB_FPML_CHILD_MAPPING_001

BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Agnt.fpml:party',
'Agnt.fpml:partyId~Agnt.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Agnt.qfn:party',
'Agnt.fpml:partyId~Agnt.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Borr.fpml:party',
'Borr.fpml:partyId~Borr.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Borr.qfn:party',
'Borr.fpml:partyId~Borr.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Lend.fpml:party',
'Lend.fpml:partyId~Lend.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('Lend.qfn:party',
'Lend.fpml:partyId~Lend.fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('expiryDate.fpml:adjustableDate',
'expiryDate.fpml:unadjustedDate~expiryDate.fpml:dateAdjustments'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('expiryDate.fpml:businessCenters',
'expiryDate.fpml:businessCenter'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('expiryDate.fpml:dateAdjustments',
'fpml:businessDayConvention~expiryDate.fpml:businessCenters'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('facilitySummary.fpml:originalCommitmentAmount',
'originalCommitmentAmount.fpml:currency~originalCommitmentAmount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:FpML',
'fpml:header~qfn:messageTotal'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:accrualAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:availableAmount',
'fpml:globalAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:currentAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:currentInterestRatePeriod',
'fpml:rateFixingDate~fpml:startDate~fpml:endDate~fpml:floatingRateIndex~fpml:indexTenor~fpml:interestRate~fpml:margin~fpml:allInRate~fpml:interestDayBasis~fpml:tenor~fpml:projectedInterestAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:dealSummary',
'dealSummary.fpml:instrumentId~dealSummary.fpml:description~dealSummary.fpml:creditAgreementDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:drawdownPayment',
'fpml:paymentDate~fpml:shareLoanContractAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:facilityCommitmentPosition',
'fpml:currentAmount~fpml:priorAmount~fpml:loanContractPosition'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:facilityRepayment',
'fpml:refusalAllowed~fpml:adjustsCommitment~fpml:repaymentDate~repayment.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:facilitySummary',
'facilitySummary.fpml:instrumentId~facilitySummary.fpml:description~facilitySummary.fpml:originalCommitmentAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:feeAccrualPeriod',
'fpml:startDate~fpml:endDate~fpml:accrualAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:feeRatePeriod',
'fpml:startDate~fpml:endDate~fpml:rate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:fxRate',
'fpml:quotedCurrencyPair~fpml:rate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:fxTerms',
'fpml:fxRate~fpml:fixingDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:fxTermsSchedule',
'fpml:startDate~fpml:endDate~fpml:fxTerms'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:globalAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:header',
'fpml:conversationId~fpml:messageId~fpml:sentBy~fpml:sendTo~fpml:creationTimestamp'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:identifier',
'fpml:partyReference~fpml:contractId'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:indexTenor',
'fpml:periodMultiplier~fpml:period'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:interestAccrualPeriod',
'fpml:startDate~fpml:endDate~fpml:shareInterestAccrualAmount~fpml:sharePikAccrualAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:interestPaymentTenor',
'fpml:periodMultiplier~fpml:period'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:interestRatePeriod',
'fpml:rateFixingDate~fpml:startDate~fpml:endDate~fpml:floatingRateIndex~fpml:indexTenor~fpml:interestRate~fpml:margin~fpml:allInRate~fpml:interestDayBasis~fpml:tenor~fpml:projectedInterestAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lcBalancePeriod',
'fpml:startDate~fpml:endDate~fpml:positionAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lcSummary',
'fpml:identifier'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lenderCommitmentPeriod',
'fpml:startDate~fpml:endDate~fpml:positionAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lenderLoanContractPeriod',
'fpml:startDate~fpml:endDate~fpml:shareCommitmentAmount~fpml:shareLoanContractAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lenderUnutilizedPeriod',
'fpml:startDate~fpml:endDate~fpml:positionAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:lenderUtilizationPeriod',
'fpml:startDate~fpml:endDate~fpml:positionAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:loanContract',
'fpml:loanContractSummary~fpml:borrowerPartyReference~fpmlloanContract.fpml:amount~fpml:effectiveDate~fpml:conditionsPrecedentMet~fpml:conditionsPrecedentComment~fpml:fxTermsSchedule~fpml:currentInterestRatePeriod~fpml:interestPaymentTenor~fpml:nextInterestPaymentDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:loanContractPosition',
'fpml:loanContractSummary~fpml:currentAmount~fpml:priorAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:loanContractRepayment',
'fpml:loanContractSummary~repayment.fpml:amount~fpml:interestPaidWithRepayment'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:loanContractSummary',
'loanContractSummary.fpml:identifier~loanContractSummary.fpml:originalAmount~loanContractSummary.fpml:participationAmount~loanContractSummary.fpml:maturityDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:maturingLoanContract',
'fpml:loanContractSummary'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:maturingLoanContracts',
'fpml:maturingLoanContract'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:newLoanContracts',
'fpml:loanContract'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:originalCommitmentAmount',
'originalCommitmentAmount.fpml:currency~originalCommitmentAmount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:participationAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:party',
'fpml:partyId~fpml:partyName'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:pikPeriod',
'fpml:startDate~fpml:endDate~fpml:pikPercentage'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:positionAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:priorAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:projectedInterestAmount',
'projIntAmount.fpml:globalAmount~projIntAmount.fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:quotedCurrencyPair',
'fpml:currency1~fpml:currency2~fpml:quoteBasis'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:repayment',
'fpml:facilityRepayment~fpml:loanContractRepayment'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:shareAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:shareCommitmentAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:shareInterestAccrualAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:shareLoanContractAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:sharePikAccrualAmount',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:sublimitParticipation',
'fpml:sublimitSummary~sublimitParticipation.fpml:amount~fpml:usedAmount~fpml:availableAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:sublimitSummary',
'sublimitSummary.fpml:sublimitId~sublimitSummary.fpml:description~sublimitSummary.fpml:originalLimitAmount~sublimitSummary.fpml:currentLimitAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:tenor',
'fpml:periodMultiplier~fpml:period'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpml:usedAmount',
'fpml:globalAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpmlloanContract.fpml:amount',
'fpmlloanContract.fpmlamount.fpml:currency~fpmlloanContract.fpmlamount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpmlsublimit.SS.fpml:currentLimitAmount',
'fpmlsublimit.SS.CLA.fpml:currency~fpmlsublimit.SS.CLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpmlsublimit.SS.fpml:originalLimitAmount',
'fpmlsublimit.SS.OLA.fpml:currency~fpmlsublimit.SS.OLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('fpmlsublimit.fpml:sublimitSummary',
'fpmlsublimit.SS.fpml:sublimitId~fpmlsublimit.SS.fpml:description~fpmlsublimit.SS.fpml:originalLimitAmount~fpmlsublimit.SS.fpml:currentLimitAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('interestPayment.fpml:amount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('loanContractSummary.fpml:identifier',
'loanContractSummary.fpml:partyReference~loanContractSummary.fpml:contractId'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('loanContractSummary.fpml:originalAmount',
'loanContractSummary.OA.fpml:currency~loanContractSummary.OA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('loanContractSummary.fpml:participationAmount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('masterFxRate.fpml:quotedCurrencyPair',
'masterFxRate.fpml:currency1~masterFxRate.fpml:currency2~fpml:quoteBasis'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('maturityDate.fpml:adjustableDate',
'maturityDate.fpml:unadjustedDate~maturityDate.fpml:dateAdjustments'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('maturityDate.fpml:businessCenters',
'maturityDate.fpml:businessCenter'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('maturityDate.fpml:dateAdjustments',
'fpml:businessDayConvention~maturityDate.fpml:businessCenters'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('projIntAmount.fpml:globalAmount',
'projIntAmount.GA.fpml:currency~projIntAmount.GA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('projIntAmount.fpml:shareAmount',
'projIntAmount.SA.fpml:currency~projIntAmount.SA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:ContractIdentifier',
'fpml:partyReference~fpml:contractId'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:LetterOfCreditLimit',
'fpml:standaloneLimit~fpml:revolving'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:Sublimit',
'fpml:sublimitSummary'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:agentSpecifications',
'qfn:feeRules~qfn:creditContacts~qfn:allocateInterest'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:amendContractNotice',
'fpml:header~fpml:noticeDate~fpml:agentBankPartyReference~fpml:borrowerPartyReference~fpml:lenderPartyReference~fpml:dealSummary~fpml:facilitySummary~fpml:facilityCommitmentPosition~fpml:exceptionFlag~fpml:loanContract~qfn:amendmentDate~Agnt.qfn:party~Borr.qfn:party~Lend.qfn:party'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:amount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:committedPosition',
'qfn:committedPosition.fpml:currency~qfn:committedPosition.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:committedTransferAmount',
'qfn:committedTransferAmount.fpml:currency~qfn:committedTransferAmount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:contractPositions',
'qfn:ContractIdentifier~qfn:committedPosition~qfn:fundedPosition~qfn:transferAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:contracts',
'qfncontracts.qfn:contract'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:creditContacts',
'qfn:contactName~qfn:contactRole~qfn:contactId'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:currentCommitment',
'currentCommitment.fpml:currency~currentCommitment.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:dealDefinition',
'qfn:dealSummary~qfn:borrowerPartyReference~qfn:agentPartyReference~qfn:originalCommitment~qfn:restriction~qfn:agentSpecifications~qfn:facilities~qfn:service'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:dealSummary',
'dealSummary.fpml:instrumentId~dealSummary.fpml:description~dealSummary.fpml:creditAgreementDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:discountedFee',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:discounts',
'qfn:knockInNumber~qfn:discountedFee'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:existingDetails',
'qfn:currentCommitment~qfn:contracts'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:expiryDate',
'expiryDate.fpml:adjustableDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:facilities',
'qfn:revolverFacility~qfn:termFacility~qfn:lcFacility~qfn:swingLineFacility~qfn:delayedDrawFacility'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:facilityPortfolioPositions',
'qfn:tradeId~qfn:contractPositions~qfn:facilitySummary~qfn:committedPosition~qfn:fundedPosition~qfn:committedTransferAmount~qfn:transferAmount~qfn:changeEvent~qfn:additionalInfo~qfn:counterParty'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:facilitySummary',
'facilitySummary.fpml:instrumentId~facilitySummary.fpml:description~facilitySummary.fpml:originalCommitmentAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:feeAccrualSchedule',
'fpml:lenderCommitmentPeriod~fpml:lenderUtilizationPeriod~fpml:lenderUnutilizedPeriod~fpml:lcBalancePeriod~fpml:feeRatePeriod~fpml:feeAccrualPeriod'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:feePayment',
'qfn:feeType~qfn:effectiveDate~fpml:startDate~fpml:endDate~qfn:feeDayBasis~qfn:paymentDate~qfn:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:feeRules',
'qfn:transferFee~qfn:discounts'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:fundedPosition',
'qfn:fundedPosition.fpml:currency~qfn:fundedPosition.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:fxRate',
'fpml:quotedCurrencyPair~fpml:rate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:interestAccrualSchedule',
'fpml:interestRatePeriod~fpml:pikPeriod~fpml:lenderLoanContractPeriod~fpml:interestAccrualPeriod'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:interestPayment',
'fpml:calculationMethod~fpml:paymentDate~interestPayment.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:interestRateSummary',
'qfn:rateFixingDate~qfn:interestRate~qfn:margin~qfn:mandatoryCostRate~qfn:allInRate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:lcFacility',
'fpml:instrumentId~fpml:description~qfn:originalCommitment~qfn:masterCurrency~qfn:masterFxRate~qfn:drawCurrencies~facilities.qfn:effectiveDate~qfn:maturityDate~qfn:expiryDate~qfn:terminationDate~qfn:descriptor~qfn:borrowerPartyReference~qfn:coBorrowerPartyReference~qfn:performingStatus~qfn:restrictions~qfn:contracts~qfn:existingDetails~qfn:rules~qfn:parentFacilitySummary~qfn:sublimit~qfn:limit~qfn:LetterOfCreditLimit~qfn:lcPurpose'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:lcSummary',
'fpml:identifier'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:limit',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:loanContractSummary',
'loanContractSummary.fpml:identifier~loanContractSummary.fpml:originalAmount~loanContractSummary.fpml:participationAmount~loanContractSummary.fpml:maturityDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:masterFxRate',
'masterFxRate.fpml:quotedCurrencyPair~masterFxRate.fpml:rate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:maturityDate',
'maturityDate.fpml:adjustableDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:minimumAssignment',
'minimumAssignment.fpml:currency~minimumAssignment.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:minimumHolding',
'minimumHolding.fpml:currency~minimumHolding.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:originalCommitment',
'originalCommitment.fpml:currency~originalCommitment.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:parentFacilitySummary',
'fpml:instrumentId~fpml:description~fpml:originalCommitmentAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:performingStatus',
'performingStatus.qfn:date~performingStatus.qfn:performing'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:proRata',
'qfn:facilitySummary~qfn:partyType'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:restriction',
'qfn:proRata~qfn:industry~qfn:jurisdiction~qfn:assignmentOnly~qfn:primaryConsent'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:restrictions',
'qfn:proRata~qfn:industry~qfn:jurisdiction~qfn:assignmentOnly~qfn:primaryConsent'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:revolverFacility',
'fpml:instrumentId~fpml:description~qfn:originalCommitment~qfn:masterCurrency~qfn:masterFxRate~qfn:drawCurrencies~facilities.qfn:effectiveDate~qfn:maturityDate~qfn:expiryDate~qfn:terminationDate~qfn:descriptor~qfn:borrowerPartyReference~qfn:coBorrowerPartyReference~qfn:performingStatus~qfn:restrictions~qfn:existingDetails~qfn:rules~qfn:parentFacilitySummary'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:rules',
'qfn:minimumAssignment~qfn:minimumExceptions~qfn:minimumHolding~qfn:consents~qfn:minimumAssignmentContext~qfn:minimumHoldContext'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:service',
'qfn:id~qfn:status'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:sublimit',
'qfnsublimit.fpml:sublimitSummary~qfnsublimit.fpml:sublimit'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:swingLineFacility',
'fpml:instrumentId~fpml:description~qfn:originalCommitment~qfn:masterCurrency~qfn:masterFxRate~qfn:drawCurrencies~facilities.qfn:effectiveDate~qfn:maturityDate~qfn:expiryDate~qfn:terminationDate~qfn:descriptor~qfn:borrowerPartyReference~qfn:coBorrowerPartyReference~qfn:performingStatus~qfn:restrictions~qfn:contracts~qfn:existingDetails~qfn:rules~qfn:parentFacilitySummary~qfn:sublimit'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:takeOnFacilities',
'qfn:revolverFacility~qfn:termFacility'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:termFacility',
'fpml:instrumentId~fpml:description~qfn:originalCommitment~qfn:masterCurrency~qfn:masterFxRate~qfn:drawCurrencies~facilities.qfn:effectiveDate~qfn:maturityDate~qfn:expiryDate~qfn:terminationDate~qfn:descriptor~qfn:borrowerPartyReference~qfn:coBorrowerPartyReference~qfn:performingStatus~qfn:restrictions~qfn:existingDetails~qfn:rules'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:terminationDate',
'terminationDate.fpml:adjustableDate'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:tradeId',
'tradeId.fpml:partyReference~tradeId.fpml:tradeId'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:transferAmount',
'qfn:transferAmount.fpml:currency~qfn:transferAmount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfn:transferFee',
'fpml:currency~fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfncontract.fpml:amount',
'qfncontract.fpmlamount.fpml:currency~qfncontract.fpmlamount.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfncontracts.qfn:contract',
'fpml:loanContractSummary~fpml:borrowerPartyReference~qfncontract.fpml:amount~fpml:effectiveDate~fpml:conditionsPrecedentMet~fpml:conditionsPrecedentComment~fpml:fxTermsSchedule~fpml:currentInterestRatePeriod~fpml:interestPaymentTenor~fpml:nextInterestPaymentDate~qfn:loanType'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfnsublimit.SS.fpml:currentLimitAmount',
'qfnsublimit.SS.CLA.fpml:currency~qfnsublimit.SS.CLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfnsublimit.SS.fpml:originalLimitAmount',
'qfnsublimit.SS.OLA.fpml:currency~qfnsublimit.SS.OLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfnsublimit.fpml:sublimit',
'fpmlsublimit.fpml:sublimitSummary~fpmlsublimit.fpml:lcPurpose~fpmlsublimit.fpml:lcType'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('qfnsublimit.fpml:sublimitSummary',
'qfnsublimit.SS.fpml:sublimitId~qfnsublimit.SS.fpml:description~qfnsublimit.SS.fpml:originalLimitAmount~qfnsublimit.SS.fpml:currentLimitAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('repayment.fpml:amount',
'fpml:globalAmount~fpml:shareAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('sublimitParticipation.fpml:amount',
'fpml:globalAmount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('sublimitSummary.fpml:currentLimitAmount',
'sublimitSummary.CLA.fpml:currency~sublimitSummary.CLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('sublimitSummary.fpml:originalLimitAmount',
'sublimitSummary.OLA.fpml:currency~sublimitSummary.OLA.fpml:amount'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('terminationDate.fpml:adjustableDate',
'terminationDate.fpml:unadjustedDate~terminationDate.fpml:dateAdjustments'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('terminationDate.fpml:businessCenters',
'terminationDate.fpml:businessCenter'
)
;
END;
/
BEGIN
INSERT INTO OLZB_FPML_CHILD_MAPPING
(TAG_NAME,TAG_TS_FORMAT)
 VALUES 
('terminationDate.fpml:dateAdjustments',
'fpml:businessDayConvention~terminationDate.fpml:businessCenters'
)
;
END;
/



commit;
