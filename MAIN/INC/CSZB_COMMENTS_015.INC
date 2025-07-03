PROMPT PROCESSING FOR CSZB_COMMENTS_015

BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRYDT',
'Indicates Retry Date.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRYMOD',
'Indicates Collection Mode' || chr(10) || '	P - Collect Partial' || chr(10) || '	F - Collect Full',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRYSEQNO',
'Indicates Retry Sequence Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRYSTDT',
'Indicates Retry Start Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRYTILLDT',
'Indicates Retry Till Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRY_COUNT',
'Indicates Retry Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRY_COUNT_ADV',
'Indicates Retry Count for Advice',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETRY_EXT_KYC',
'Indicates Retry External KYC' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETURNVAL',
'Indicates Return Value' || chr(10) || '	Y - WITHHOLD' || chr(10) || '	N - NO WITHHOLD' || chr(10) || '	R - REFER',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RETURN_DATE',
'Indicates Return Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV',
'Indicates Revaluation Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAL',
'Indicates Revaluation' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALATPRD',
'Indicates Revaluation At Product' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALCOLLAT',
'Indicates Revaluate Collateral' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALFLG',
'Indicates Revaluation of Settled Positions' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALFREQ',
'Indicates Revaluation Frequency' || chr(10) || '	D - Daily' || chr(10) || '	W - Weekly' || chr(10) || '	M - Monthly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALFREQ1',
'Indicates Revaluation Frequency' || chr(10) || '' || chr(10) || 'Daily       : D' || chr(10) || 'Monthly     : M' || chr(10) || 'Quarterly   : Q' || chr(10) || 'Half Yearly : H' || chr(10) || 'Yearly      : Y',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALFREQ2',
'Indicates the Revaluation Frequency.D - Daily, M - Monthly, Q - Quarterly, H - Half Yearly,A - Annually',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALGL',
'Indicates Revalue into GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALGLDESC',
'Indicates Revalue into GL Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALLEVEL',
'Indicates Revaluation Level' || chr(10) || '	D - Deal' || chr(10) || '	P - Position',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALLEVEL1',
'Indicates the Revaluation Level. P - Position, D - Deal Matching',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALLVL',
'Indicates Revaluation Level' || chr(10) || '	P - Portfolio' || chr(10) || '	H - Holding',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALMETH',
'Indicates Revaluation Method' || chr(10) || '	M - MTM-BV' || chr(10) || '	L - LOCOM' || chr(10) || '	E - MTM-EIM',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALMETHD',
'Indicates Revaluation Method' || chr(10) || '	C - Contract Rates' || chr(10) || '	F - Fair Value' || chr(10) || '	B - Branch Rates',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALNETTINGREQ',
'Indicates Revaluation Netting Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALRCD',
'Indicates Revaluation Rate Code' || chr(10) || '	M - Mid' || chr(10) || '	B - Buy' || chr(10) || '	S - Sell',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALREQ',
'Indicates Reval Reqd' || chr(10) || '' || chr(10) || 'Yes : Y' || chr(10) || 'No  : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALREVPREF',
'Indicates Revaluation Reversal' || chr(10) || '	A - Account Revaluation' || chr(10) || '	D - Deal Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALRTCD',
'Indicates Revaluation Exchange Rate Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALSATRTMNTH',
'Indicates Revaluation Start Month' || chr(10) || '	1 - January' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALSTARTDAY',
'Indicates Revaluation Start Day',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALSTARTMON',
'Indicates Revaluation Start Month' || chr(10) || '	1 - June' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALSTARTWEEKDAY',
'Indicates Revaluation Start Weekday' || chr(10) || '	MON - Monday' || chr(10) || '	TUE - Tuesday' || chr(10) || '	WED - Wednesday' || chr(10) || '	THU - Thursday' || chr(10) || '	FRI - Friday' || chr(10) || '	SAT - Saturday' || chr(10) || '	SUN - Sunday',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALSTDT',
'Indicates Revaluation Start Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALTNRATCD',
'Indicates Revaluation Rate Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALTNRATTYP',
'Indicates Revaluation Rate Type' || chr(10) || '	M - Mid' || chr(10) || '	B - Buy' || chr(10) || '	S - Sell',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATION',
'Indicates Revaluation' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATIONMETHOD',
'Indicates Method' || chr(10) || '	N - NPV' || chr(10) || '	R - Rebate' || chr(10) || '	S - Straight Line' || chr(10) || '	D - Discounted Straight Line',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATIONREQUIRED',
'Indicates Revaluation' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATION_FLAG',
'Indicates Revaluation Of Settled Positions' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATION_FREQUENCY',
'Indicates Revaluation Frequency' || chr(10) || '	M - Monthly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	D - Daily' || chr(10) || '	A - Annual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATION_METHOD',
'Indicates Revaluation Method' || chr(10) || '	L - Locom' || chr(10) || '	E - MTM-EIM' || chr(10) || '	M - MTM-BV',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUATION_START_MONTH',
'Indicates Revaluation Start Month' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	1 - January' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVALUSETTLEPOSIT',
'Indicates the Revaluation of Settled Positions.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAL_FREQ',
'Indicates Frequency' || chr(10) || 'Daily	     "D"' || chr(10) || 'Monthly	     "M"' || chr(10) || 'Quarterly	     "Q"' || chr(10) || 'Half Yearly     "H"' || chr(10) || 'Yearly	     "Y"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAL_REQ',
'Indicates Reval Reqd (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAL_RTTYPE',
'Indicates Exchange Rate Type' || chr(10) || '' || chr(10) || 'Mid : M' || chr(10) || 'Buy : B' || chr(10) || 'Sell : S',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAL_ST_MON',
'Indcaites Start Month' || chr(10) || 'Jan        "1"' || chr(10) || 'Feb        "2"' || chr(10) || 'Mar        "3"' || chr(10) || 'Apr        "4"' || chr(10) || 'May        "5"' || chr(10) || 'Jun        "6"' || chr(10) || 'Jul        "7"' || chr(10) || 'Aug        "8"' || chr(10) || 'Sep        "9"' || chr(10) || 'Oct        "10"' || chr(10) || 'Nov        "11"' || chr(10) || 'Dec        "12"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVAlLEVEL',
'Indicates Revaluation Level' || chr(10) || '	C - Contract' || chr(10) || '	P - Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVBASEFREQ',
'Indicates Base Frequency' || chr(10) || '' || chr(10) || 'WEEKLY   : W' || chr(10) || 'MONTHLY   : 1M' || chr(10) || 'BI-MONTHLY   : 2M' || chr(10) || 'QUARTERLY    : 3M' || chr(10) || 'ONCE IN 4 MONTHS : 4M' || chr(10) || 'ONCE IN 5 MONTHS : 5M' || chr(10) || 'SEMI-ANNUALLY   : 6M' || chr(10) || 'ONCE IN 7 MONTHS : 7M' || chr(10) || 'ONCE IN 8 MONTHS : 8M' || chr(10) || 'ONCE IN 9 MONTHS : 9M' || chr(10) || 'ONCE IN 10 MONTHS :10M' || chr(10) || 'ONCE IN 11 MONTHS :11M' || chr(10) || 'ANNUALLY   : 12M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCCY',
'Indicates Revaluation Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCHECKERID',
'Indicates Reversal Checker ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a reverse MO Adhoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCFSFSRES_FCUBSBODY',
'This XSD gives the message format for a response to create a Reverse MO(Mortgages) Adhoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCIO',
'Indicates Reverse CL Adhoc IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a reverse CL Adhoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to create a Reverse MO(Mortgages) Adhoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCIOPKRES_FCUBSBODY1',
'This XSD gives the message format for a request to create a Reverse CL(Retail Lending) Adhoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCPK',
'Indicates Reverse CL Adhoc PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCLADHOCRES',
'Indicates CL Ad-hoc Payment Reversal Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCOMM',
'Indicates Revolving Commitment' || chr(10) || '' || chr(10) || 'Revolving        : Y' || chr(10) || 'Non Revolving : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCONREF',
'Indicates Reverse Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCONREF_NUM',
'Indicates Reversal Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVCONTREF',
'Indicates Reverse Contract Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVDATE',
'Indicates Revaluation Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVDETAILS',
'it indicates reversal details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVDREFNO',
'Indicates Reversed Contract Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVDT',
'Indicates Reversal Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVENDT',
'Indicates Revision End Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSAL_CAL_BASIS',
'Indicates Reversal Calendar Basis' || chr(10) || '	B - Branch Calendar' || chr(10) || '	C - Currency Calendar',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEACCRUALS',
'Indicates Reverse Accruals' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECLUDEVENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse a CL(Retail Lending) User Defined Event',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECLUDEVENTIOPKRES_FCUBSBODY',
'This XSD gives the message format for response for reverse of CL(Retail Lending) User Defined Event Trigerring',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECORPMANUALACTIONFSFSREQ_FCUBSBODY',
'This XSD gives the message format for providing Full information of the AM Corporation Manual Action Contract details that is to be successfully reversed in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECORPMANUALACTIONFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the AMContract details that  are successfully Reversed in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECORPMANUALACTIONIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Reverse Request for AM Corporate Manual Action Contract.This is the normal request which has Input only fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSECORPMANUALACTIONIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the AM Corporate Manual Action Contract that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED',
'Indicates Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED1',
'Indicates Reversed.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED2',
'Indicate reversed' || chr(10) || '										Y:yes' || chr(10) || '										N:no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED3',
'Indicates Reversed.' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED4',
'Indicates Reversed Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEDISBURSEMENT',
'Indicates Disbursement Reverse type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEDISBURSEMENTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a revr dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEDISBURSEMENTFULL',
'Indicates Disbursement Reverse IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEDISBURSEMENTRESPONSE',
'Indicates Disbursement Reverse Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEDISBURSEMENTRESPONSEFULL',
'Indicates Reverse Disbursement Response Full  type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSED_EVENT_SEQ_NO',
'Indicates Reversed Event Sequence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEFEEACCRUALLDCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Fee Accrual has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEFEEACCRUALLDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full responce information relating the Fee Accrual that has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEFEEACCRUALLDCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for detailing the information relating the Fee Accrual has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEFEEACCRUALLDCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the information relating the Fee Accrual that has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHG',
'Include reverse Inst Stat Change details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHGIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse MO(Mortgages) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHGIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to reverse CL(Retail Lending) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHGIOPKRES_FCUBSBODY',
'This XSD gives the message format for a response to reverse MO(Mortgages) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHGIOPKRES_FCUBSBODY1',
'This XSD gives the message format for a response to reverse CL(Retail Lending) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEINSTSTATCHGRESPONSEPK',
'Include reverse Inst Stat Change response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELDCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a Request to Reverse LD Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for a Response to Reverse the LD Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELDCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a Request to Reverse the LD Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELDPAYMENTFSFSREQ_FCUBSBODY',
'This XSD gives the format in which the Flexcube has to send a request for Reversal of LDContract. This request is a full screen request which includes even input only fields and the display fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELDPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the Flexcube has to send a request for Reverse of LDContract. This request is a full screen request which includes even input only fields and the display fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELQLIQFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the full request information relating the Charge Receivable Component that is being requested for reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELQLIQFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the full response information relating the Charge Receivable Component that has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELQLIQIOPKREQ_FCUBSBODY',
'This XSD gives the message format for detailing the input-only request information relating the Charge Receivable Component that is being requested for reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSELQLIQIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the input-only response information relating the Charge Receivable Component that has been successfully reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEPAYMENTFSFSREQ_FCUBSBODY',
'This.xsd gives the message format for detailing the Full responce information relating the BC Contract for which interest paid is reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSERENOG',
'Indicates Renegotiation Reverse type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSERENOGFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse a Renog Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSERENOGFSRESPONCE',
'Indicates Renegotiation Reverse FS Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSERENOGPK',
'Indicates Renegotiation Reverse PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEROLLOVER',
'Indicates Reverse Rollover type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEROLLOVERFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse a Rollover Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEROLLOVERFSRESPONCE',
'Indicates Reverse Rollover-FS Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEROLLOVERPK',
'Indicates Reverse Rollover-PK type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSESEBLOCKDEALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Blockdeal that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSESEBLOCKDEALIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Contract that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSESFCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse an SF contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSESFCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse a new SF contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONFSFSREQ_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        information relating to the' || chr(10) || '                                        Clearing Transaction that has to be' || chr(10) || '                                        Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for Full Screen information relating to the Retail Teller Transaction that has to be Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONFSFSREQ_FCUBSBODY2',
'This XSD gives the message format for' || chr(10) || '                                        Input Only information relating to the' || chr(10) || '                                        Instruments Transaction that has to be' || chr(10) || '                                        Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONFSFSRES_FCUBSBODY',
'This XSD gives the message format for Full Screen information relating to the Retail Teller Transaction that has been Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONFSFSRES_FCUBSBODY1',
'This XSD gives the message format for' || chr(10) || '                                        Full Response information relating to' || chr(10) || '                                        the Instruments Transaction that has' || chr(10) || '                                        been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONIOPKREQ_FCUBSBODY',
'This XSD gives the message format for IO information relating to the Retail Teller Transaction that has to be Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for' || chr(10) || '                                        Input Only Request information relating' || chr(10) || '                                        to the Instruments Transaction that has' || chr(10) || '                                        to be Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONIOPKRES_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        Input Only information relating to the' || chr(10) || '                                        Clearing Transaction that has to be' || chr(10) || '                                        Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONIOPKRES_FCUBSBODY1',
'This XSD gives the message format for Primary Key information relating to the Retail Teller Transaction that has been Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSETRANSACTIONIOPKRES_FCUBSBODY2',
'This XSD gives the message format for detailing the primary information relating to the instrument transaction that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUDEVENTREQUESTPK',
'Indicates Primary Key Details of User Defined Event Reversal Request',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUDEVENTRESPONSEPK',
'Indicates Primary Key Details of User Defined Event Reversal Response',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUPTRANSACTIONFSFSREQ_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        Full Screen information relating to the' || chr(10) || '                                        Utility Payment Transaction that has to be' || chr(10) || '                                        Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUPTRANSACTIONFSFSRES_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        Full Response information relating to' || chr(10) || '                                        the Utility Payments Transaction that has' || chr(10) || '                                        been Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUPTRANSACTIONIOPKREQ_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        Input Only information relating to the' || chr(10) || '                                        Utility Payment Transaction that has to be' || chr(10) || '                                        Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEUPTRANSACTIONIOPKRES_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        PK information relating to' || chr(10) || '                                        the Utility Payments Transaction that has' || chr(10) || '                                        been Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEVPPAYMENTFSFSREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Reverse request for VPPayment.This is the normal request which has Input fields only',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEVPPAYMENTFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the VPPayment details that  are successfully Reversed in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEVPPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Reverse Request for VP Payment.This is the normal request which has Input only fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEVPPAYMENTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the VP Payment that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEXPCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Reverse request for XP Contract.This is the normal request which has all fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEXPCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Reverse Request for XP Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSEXPCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the XP Contract that has been successfully Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_ACCOUNT_RES_FULL',
'Indicates Reverse-Account Response PK type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_AM_REQ_IO_TYPE',
'Asset Management Corporate Manual Action Reverse Request IO Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_AM_RES_PK_TYPE',
'Asset Management Corporate Manual Action Reverse PK Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_DETAILS',
'Reverse Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_INSTSTATCHG_RES_PK',
'Reversal of Mortgages Installment Status Change Response PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_MM_PK_RES_TYPE',
'Includes Money Market Reverse PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVERSE_RES_PK',
'Includes the Primary information regarding the Reversal of Securities Repo Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVESN',
'Indicates Reversal Event Sequence',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVESN1',
'Indicate Rev. Event Sequence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVESN2',
'Indicates Reverse Event Sequence Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVFCCREF',
'Reversed Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVFREQ',
'Indicates Revision Frequency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISION',
'Indicates Revision',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISIONDATETYPE',
'Includes Revision Date details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISIONS',
'Revision Schedules',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISIONSCHED_BREVTYPE',
'Indicates Discrete/Continuous' || chr(10) || '	D - Discrete' || chr(10) || '	C - Continuous',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISION_DATE',
'Indicates Revision Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISION_DATE_MASTER',
'Includes  Revision Date Master details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISION_RATE',
'Indicates Revision Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVISION_SCHED',
'Includes  Revision Schedules details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLFREQ',
'Indicates Revaluation Frequency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLINE',
'Indicates Revolving Line' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLINE1',
'Indicates whether Reveling Line',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLINE2',
'Indicates Revolving Line' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLLOSSGL',
'Indicates Loss GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLMETH',
'Indicates Revaluation Method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLPRFTGL',
'Indicates Profit GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLREQ',
'Indicates Revaluation Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLTXNCD',
'Indicates Revaluation Transaction Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLVL',
'Indicates Revaluation level' || chr(10) || '	P -' || chr(10) || '	C -',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLVL1',
'Revaluation Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVLVNG',
'Indicates Revolving' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVMAKER',
'Indicates Reversal Maker ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVMOADHOCIO',
'Indicates Reverse MO Adhoc IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVMOADHOCPK',
'Indicates Reverse MO Adhoc PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVMOADHOCRES',
'Indicates Reverse MO Adhoc Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNFRQ',
'Indicates Revision Frequency' || chr(10) || 'WEEKLY : W' || chr(10) || 'MONTHLY: 1M' || chr(10) || 'BI - MONTHLY:2M' || chr(10) || 'QUARTERLY:3M' || chr(10) || 'ONCE IN 4  MONTHS:4M' || chr(10) || 'ONCE IN 5  MONTHS:5M' || chr(10) || 'HALF - YEARLY:6M' || chr(10) || 'ONCE IN 7  MONTHS:7M' || chr(10) || 'ONCE IN 8  MONTHS:8M' || chr(10) || 'ONCE IN 9  MONTHS:9M' || chr(10) || 'ONCE IN 10 MONTHS:10M' || chr(10) || 'ONCE IN 11 MONTHS:11M' || chr(10) || 'ANNUALLY:12M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNSCHEDULE',
'Includes the Revisions Schedule details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNSCHEDULE_APPLIEDFLAG',
'Indicates Applied Flag value' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNSCHEDULE_APPLIEDFLAG1',
'Applied Flag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNSCHEDULE_SCHEDULELINKAGE',
'Indicates the Schedule Linkage of Revisions.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVNWEKDY',
'Indicates Weekday of Revision' || chr(10) || 'MONDAY : 1' || chr(10) || 'TUESDAY : 2' || chr(10) || 'WEDNESDAY : 3' || chr(10) || 'THURSDAY :4' || chr(10) || 'FRIDAY :5' || chr(10) || 'SATURDAY : 6' || chr(10) || 'SUNDAY : 7',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVN_DET',
'Include REVN Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVN_MASTER_FULL',
'Include revn master full details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVN_MASTER_IO',
'Include Revn master IO type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVN_MASTER_PK',
'Include Revn master PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOKABLE',
'Indicates Revokable' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOKEDT',
'Indicates Revoke Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOLVE',
'Indicates Revolves in' || chr(10) || '	T - Time' || chr(10) || '	V - Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOLVING',
'Indicates Revolving',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOLVINGLINE',
'Indicates Revolving Line' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOLVING_TYPE',
'Indicates Revolving Type' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVOROS',
'Indicates Recivable or Outstanding',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to reverse a new LS(Loan Syndication) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to reverse a new MO(Mortgages) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTIOPKREQ_FCUBSBODY2',
'This XSD gives the message format for a request to reverse a new LE(Retail Lending) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to reverse a new LE(Leasing) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTPK',
'Include reverse payement PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTPK1',
'Indicates Payment Reverse PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTREQUESTIO',
'Include Reverse Payment Request IO type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTREQUESTIO1',
'Indicates Payment Reverse Request IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTRESPONSEPK',
'Include Reverse Payment Request PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPAYMENTRESPONSEPK1',
'Indicates Payment Reverse Response PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVPRICODE',
'Indicates Revaluation Price Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR',
'Indicates Reversed or Not' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVREF',
'Indicates Reversed Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVREFNO1',
'Indicates Reversal reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVREPO_DETAIL',
'Repo Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVRMDTSTMP',
'Indicates Reversal Maker Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVRSEACCRU',
'Indicates Reverse Accrual' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_AUTHSTAT',
'Indicates Auth Status Of reversed contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_CHECKERID',
'Indicate reversed checker ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_CHECKERSTAMP',
'Indicate reversed checkerstamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_CONTSTAT',
'Indicates Contract status of reversed contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_MAKERID',
'Indicate reversed makerID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_MAKERSTAMP',
'Indicate reversed makerstamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVR_WITHOUT_MATCHING',
'Indicates Reversal Without Matching' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVSETLEGL',
'Indicates Reversal Settlement General Ledger',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVSFCONTRACTREQFULL_LNTDAMT',
'Indicates Amount On Launch Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVSTDT',
'Indicates Revision Start Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVTYPE',
'Indicates Discrete/Continuous',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REVWEEK',
'Indicates Week Day' || chr(10) || '	1 - Monday' || chr(10) || '	2 - Tuesday' || chr(10) || '	3 - Wednesday' || chr(10) || '	4 - Thursday' || chr(10) || '	5 - Friday' || chr(10) || '	6 - Saturday' || chr(10) || '	7 - Sunday',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_CODE',
'Indicates Reverse Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_COD_ADD',
'Indicates Reverse Code Additional',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_DET',
'Indicates Reverse Detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_INC_UNITS',
'Indicates Unit' || chr(10) || '	D - Days' || chr(10) || '	M - Months' || chr(10) || '	Y - Years' || chr(10) || '	F - Current Financial Year',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_MAT_AMT',
'Indicates New Maturity Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_ORG_BNK',
'Indicates Reverse Originator Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_ORG_NAM',
'Indicates Reverse Originator Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_SUS_ENTRY_DAYS',
'Indicates Reverse Suspense Entry Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_REV_SWEEP_REQD',
'Indicates Reverse Sweep' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFDPART',
'Indicates Request For Debit Participation' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFDTYPETYPE',
'Indicates RFD Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFD_TYPE',
'Indicates Rfd Type' || chr(10) || '	N - No Tracking' || chr(10) || '	F - Full Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFEXPAMT',
'Indicates Risk Free Exposed Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFNDINT',
'Indicates Refund Interest' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RFNDPRF',
'Indicates Refund Profit' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RGUNTNOMNL',
'Indicates Basis Type' || chr(10) || 'Unit Base "U"' || chr(10) || 'Nominal Based "B"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIGBAS',
'Indicates Right Basis' || chr(10) || 'POSITIONS : P' || chr(10) || 'HOLDINGS : H',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIGHTS',
'Indicates the Rights.M - Market Value, B - Book Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIGHTSDUE',
'Indicates Rights Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIGHTSEXRCSD',
'Indicates Rights Exercised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIGHTS_BASIS',
'Indicates Right Basis' || chr(10) || '	P - Positions' || chr(10) || '	H - Holdings',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKCATEG',
'Indicates Risk Category',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKCATEGORYTYPE',
'Indicates Risk Category Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKFAC',
'Indicates Risk Factor',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKNETTINGTYP',
'Indicates Risk Netting Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKPRFL',
'Indicates Risk Profile',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKRAT',
'Indicates Risk Rating' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKRATE',
'Risk Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKWHTLMTTRACK',
'Indicates Risk Weighted Limits Tracking' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISKWHTLMTTRACK1',
'Risk weighted Limit Track',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISLINCDE',
'Indicates Risk Weighted Line Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISPER',
'Indicates Risk Percentage',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RISRATE',
'Indicates Risk Percent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RITBASIS',
'Indicates Rights Basis' || chr(10) || '	P - Position' || chr(10) || '	H - Holdings',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RITBASIS1',
'Indicates Rights Basis' || chr(10) || '' || chr(10) || 'POSITION : P' || chr(10) || 'HOLDINGS : H',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RIWGTAMT',
'Indicates Risk Weighted Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKEYCUST',
'Indicates Customers' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKEYEXPDT',
'Indicates Expiry Date' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYAMT',
'Indicates Rekey of Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYCCY',
'Indicates Rekey of Currency' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYCNTRCTAMT',
'Indicates Contract Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYCPRTY',
'Indicates Counterparty' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYPFOLIOCCY',
'Indicates Portfolio Currency' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYPFOLIOCUST',
'Indicates Portfolio Customer' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYRATAMT',
'Indicates Interest Rate / Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RKYREQDFLG',
'Indicates Required' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLIMTRK',
'Indicates Risk Weighted Limit Tracking' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLOVRICCFFRM',
'Indicates ICCF Rollover' || chr(10) || '	P - Product' || chr(10) || '	C - Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLOVRMECHNSM',
'Indicates Rollover Mechanism' || chr(10) || '	V - New Version' || chr(10) || '	C - Spawn Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLOVRMTHD',
'Indicates Rollover Method' || chr(10) || '	N - Normal' || chr(10) || '	S - Split' || chr(10) || '	C - Consolidated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLOVRWITHINT',
'Indicates Rollover With Interest' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLTDINTRNLACTID',
'Indicates Related internal Action Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLZDREVLFLG',
'Indicates Realized Revaluation' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RLZDREVLMETH',
'Indicates Revaluation Method' || chr(10) || '	M - MTM' || chr(10) || '	L - LOCOM' || chr(10) || '	X - MTM-LOCOM',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMAMEND_STATUS',
'Indicates Status' || chr(10) || '	N - Not Started' || chr(10) || '	C - Completed' || chr(10) || '	F - Failed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMETHOD',
'Indicates Revaluation Method' || chr(10) || '	F - Fair Value' || chr(10) || '	C - Contract Specific Rate' || chr(10) || '	B - Branch Specific Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMID',
'Indicates RM ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK1',
'Indicates Remark 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK10',
'Indicates Remark 10',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK2',
'Indicates Remark 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK3',
'Indicates Remark 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK4',
'Indicates Remark 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK5',
'Indicates Remark 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK6',
'Indicates Remark 6',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK7',
'Indicates Remark 7',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK8',
'Indicates Remark 8',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMK9',
'Indicates Remark 9',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RML',
'Indicates Reverse Mortgage Loan' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RMNAME',
'Indicates RM Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNCBLE',
'Indicates Renounceable' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDBASIS',
'Indicates Rounding Basis' || chr(10) || '	U - Per Unit' || chr(10) || '	N - Per Nominal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDBASIS1',
'Indicates Rounding Basis' || chr(10) || '' || chr(10) || 'PER UNIT  : U' || chr(10) || 'PER NOMINAL : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDDIFF',
'Indicates Rounding Difference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDNGREQ',
'Indicates Rounding Required' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDPER',
'Indicates Rounding Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDRAT',
'Indicates Rounding Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDUPDWN',
'Indicates Round Up/Down (decimal)' || chr(10) || '	D - Down' || chr(10) || '	U - Up',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNDUPTO',
'Indicates Rounding Factor(decimal)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNOG_NO',
'Indicates Renegotiation No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNTDUEDT',
'Indicates Rental Due Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNTFREQ',
'Indicates Rental Frequency' || chr(10) || '	M - Monthly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	A - Annual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNW_FLG',
'Indicates Renew TOD' || chr(10) || '	Y - On' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RNW_FREQ',
'Indicates Renew Frequency' || chr(10) || '	M - Months' || chr(10) || '	D - Days' || chr(10) || '	Y - Years',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RN_FLG',
'Indicates Renew TOD' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RN_FREQ',
'Indicates Renew Frequency' || chr(10) || '	D - Days' || chr(10) || '	M - Months' || chr(10) || '	Y - Years',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RN_UN',
'Indicates Renew Unit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLDESC',
'Indicates Role Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLEFUN',
'Indicates Role Function',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEAD',
'Indicates Role To Head',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADCLASS',
'Indicates the Role to Head Class details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADDESC',
'Indicates Role Head Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADDESC1',
'Indicates Role To Head Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADDESCCLASS',
'Indicates the Role to Head Description Class.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADDESCDET',
'Indicates the Role to head Additional description details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADDET',
'Indicates the Role to Head Additional details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADMAP2TYPE',
'Includes Role To Head Map details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETOHEADMAPTYPE',
'Includes the Role to Head Map Type details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLETYPE',
'Indicates Settlement' || chr(10) || '	Y - Yes' || chr(10) || '	N - No' || chr(10) || '	R - Reimbursement',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLE_TO_HEAD_1',
'Includes Role To Head Mapping 1 details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLE_TO_HEAD_2',
'Includes the Role to Head detail.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLE_TO_HEAD_3',
'Includes the Role to Head Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLALLOWED',
'Indicates Allow Rollover' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLALLW',
'Indicates Rollover' || chr(10) || '' || chr(10) || 'Yes : Y' || chr(10) || 'No  : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLAMT',
'Indicates Rollover Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLAMT1',
'Indicates Principal INCR Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLAMT2',
'Indicates the Principal Increase Amount of Component Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLAMT3',
'Indicates Treat Special Amount as Rollover Amount (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLAMTTYP',
'Indicates Rollover Amount' || chr(10) || '' || chr(10) || 'Principal                    : P' || chr(10) || 'Principal + Interest         : I' || chr(10) || 'Principal + (Interest - Tax) : T',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLBY',
'Indicates Roll By' || chr(10) || '	D - Days' || chr(10) || '	M - Months' || chr(10) || '	Q - Quarters' || chr(10) || '	S - Semi Annual' || chr(10) || '	Y - Years',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLBY1',
'Indicates Roll By' || chr(10) || '' || chr(10) || 'Days        : D' || chr(10) || 'Months      : M' || chr(10) || 'Quarters    : Q' || chr(10) || 'SemiAnnuals : S' || chr(10) || 'Years       : Y',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLBY2',
'Indicates Roll By' || chr(10) || 'Day  "D"' || chr(10) || 'Month  "M"' || chr(10) || 'Quarter "Q"' || chr(10) || 'Annual "A"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMP',
'Indicates Rollover Component details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPDET',
'It includes Mortgages   Rollover components Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPDET_AMTOUT',
'Indicated Amount Outstanding Amount to be paid.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPDET_AMTOUT1',
'Indicates the Amount Outstanding of Component Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPDET_LIQDAMT',
'Indicates the Liquidation Amount of Component Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPDET_WAIVEAMT',
'Indicates the Waive Amount of Component Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPONENT',
'Indicates Rollover Componenent details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLCOMPPMNTDET',
'Indicates Rollover Component Payment details for Credit mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLEDOVERFLG',
'Indicates Rollover Over',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLEXRATE',
'Indicates Rollover Exchange Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLICCFFROM',
'Indicates ICCF Rollover' || chr(10) || '' || chr(10) || 'Product  : P' || chr(10) || 'Contract : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLINTST',
'Indicates Rollover Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLCYE',
'Indicates Rollover Local Currency Equivalent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET',
'Indicates Mortgages  Rollover Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ADVSUPPRESS',
'Mortgages  Advice Supress Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ADVSUPPRESS1',
'Consumer Lending  Advice Supress Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ALIQREVERSEDPMT',
'Indicates Auto Liqd Reversed Payment.' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ALLOWBULKPAYMENT',
'Indicates Bulk Payment Allowed.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ALLOWBULKPAYMENT1',
'Indicates Bulk Payment Allowed' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_AMOUNTBLOCKFLAG',
'Indicates Partial Release block.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_AUTHSTAT1',
'Indicates authorisation status' || chr(10) || '' || chr(10) || 'Authorised     : A' || chr(10) || 'Unauthorised : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_AUTOMANROLLOVER',
'Indicates Rollover Mode' || chr(10) || '' || chr(10) || 'Auto    : A' || chr(10) || 'Manual : M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_CLGBKDR',
'Indicates the Clearing Bank of Debit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_CLGBRNDR',
'Indicates the Clearing Branch of Debit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_COMMITUTILS',
'Mortgages Commit Utilities',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_COMMITUTILS1',
'Consumer Lending Commit Utilities',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_CUTOFFTRN',
'Indicates Transaction Cutoff' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_EVENTADVICES',
'Mortgages Event Advice Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_EVENTADVICES1',
'Consumer Lending Event Advice Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_EXTACNMDR',
'Indicates External Account Name to be debited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_EXTACNODR',
'Indicates External Account Number to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_FUNDEDSTATUS',
'Indicates Status.' || chr(10) || 'Yes "Y"; No N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_GIROMODECR',
'Indicates the GIRO MODE CR of Credit Settlement Mode' || chr(10) || 'Auto GIRO : A' || chr(10) || 'Manual GIRO :M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_GIROMODEDR',
'Indicates the GIRO MODE DR of Debit Settlement Mode.' || chr(10) || 'Auto GIRO : A' || chr(10) || 'Manual GIRO :M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_GIROSERVICECR',
'Indicates the GIRO SERVICE CR of Credit Settlement Mode' || chr(10) || 'Bank GIRO :B' || chr(10) || 'Plus GIRO :P',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_HOLIDAYPRD',
'Holiday Period Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_INTSTMT',
'Indicates Interest Statement' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_MISMASTER',
'Mortgages  MIS Master',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_MISMASTER1',
'Consumer Lending  MIS Master.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_OTHAPPLCNT',
'Mortgages Other Application Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_OTHAPPLCNT1',
'Consumer Lending Other Application Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERACCNOCR',
'Indicates the Payer Account Number of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERACCNODR',
'Indicates the Payer Account Number of Debit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS1CR',
'Indicates Payer Bank Address 1 to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS1CR1',
'Indicates the Payer Bank Address1 of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS2CR',
'Indicates Payer Bank Address 2 to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS2CR1',
'Indicates the Payer Bank Address2 of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS3CR',
'Indicates Payer Bank Address 3 to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS3CR1',
'Indicates the Payer Bank Address3 of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS4CR',
'Indicates Payer Bank Address4 to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERADDRESS4CR1',
'Indicates the Payer Bank Address4 of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERBANKCODECR',
'Indicates the Payer Bank of Credit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PAYERBANKCODEDR',
'Indicates the Payer Bank of Debit Settlement Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_PCCATCR',
'Indicates Product Category to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ROLLCOMP',
'Mortgages Rollover Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ROLLCOMP1',
'Consumer Lending Rollover Component.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_ROLLOVERALLOWED',
'Indicates Allow Rollover' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_STOPACCRUALS',
'Indicates Stop Accrual.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_TRKRECIALIQ',
'Indicates Auto Liquidation of Track Receivable' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_TRKRECIMLIQ',
'Indicates Manual Liquidation of Track Receivable' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_UDEDET',
'Indicates User Defined Expression Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_UDEROLLBASIS',
'Indicates UDE Rollover basis' || chr(10) || 'Product  : P' || chr(10) || 'Contract : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_UDERTPLAN',
'It indicates User defined rate plan',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_USGTSTATUS',
'Indictaes USGT status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLLOANDET_USGTSTATUS1',
'Indicates User Group Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLMATDT',
'Indicates Rollover Maturity Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLMATTYPE',
'Indicates Rollover Maturity Type' || chr(10) || '' || chr(10) || 'Fixed  : F' || chr(10) || 'Notice : N' || chr(10) || 'Call   : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLMECH',
'Indicates Mechanism' || chr(10) || '' || chr(10) || 'New Version     : V' || chr(10) || 'Spawn Contract  : C' || chr(10) || 'Linked Contract : L',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLMETHD',
'Indicates Rollover Method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLNOTDAYS',
'Indicates Rollover Notice Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOIFROM',
'Indicates Rollover ICCF From (Basis)' || chr(10) || '' || chr(10) || 'Product    : P' || chr(10) || 'Contract  : C' || chr(10) || 'User Rate : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER',
'Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERALLOWED',
'Indicates Rollover Allowed' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERDETAILS_RLOVRMECHNSM',
'Indicates Rollover Mechanism' || chr(10) || '	V - New Version' || chr(10) || '	C - Spawn Contract' || chr(10) || '	L - Linked Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERDETAILS_RLOVRMECHNSM1',
'Indicates Rollover Mechanism' || chr(10) || '	V - New Version' || chr(10) || '	L - Linked Contract' || chr(10) || '	C - Spawn Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERLDCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a Request to Rollover the LD Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERLDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for a Response to LD Contract Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERLDCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for Rollover the primary information relating the LD Contract that has been successfully created',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERREQD',
'Indicates Rollover Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERSEDEALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for request of SE Deal contract Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERSEDEALFSFSRES_FCUBSBODY',
'This XSD gives the message format for Response of SE Deal contract Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERSEDEALIOPKRES_FCUBSBODY',
'This XSD gives the message format for Primary Key Response for SE Deal Contract  Contract Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYP',
'Indicates Rollover Type' || chr(10) || '	S - Special' || chr(10) || '	C - Custom',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE',
'Includes Rollover details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12',
'Include rollover type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12_ROLLAMTTYP',
'Indicates Rollover Amount Type' || chr(10) || ' Principal : P' || chr(10) || 'Principal + Interest : I' || chr(10) || 'Principal + (Interest - Tax) : T',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12_ROLLMECH',
'Indicates Rollover Mechanism' || chr(10) || 'New Version : V' || chr(10) || 'Spawn Contract : C' || chr(10) || 'Linked Contract : L',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12_ROLLMETHD',
'Indicates Rollover Method' || chr(10) || ' Normal : N' || chr(10) || 'Split : S' || chr(10) || ' Consolidated : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12_TRESPLAMT',
'Indicates Treat Special Amount As Rollover' || chr(10) || 'Amount :A' || chr(10) || 'Liquidation Amount : L' || chr(10) || ' Maximum Rollover Amount : M' || chr(10) || ' Ignore : I',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE12_UPDATEUTIL',
'Indicates Update Limits Utilisation' || chr(10) || ' Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE2_DRAWDOWNNO',
'Indicates Drawdown Sch Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE2_ROLLINTST',
'Indicates Roll Inst. Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_APPCHG',
'Indicates Apply charge on Rollover Amount (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_APPROLLTAX',
'Indicates Apply Tax On Rollover Amount (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_LIQDODSCHD',
'Indicates Liquidate Overdue Schedules (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_ROLLAMTTYP',
'Indicates Rollover Amount' || chr(10) || 'Principal  "P";' || chr(10) || 'Principal + Interest "I";' || chr(10) || 'Principal + (Interest - Tax)  "T".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_ROLLICCFFROM',
'Indicates ICCF Rollover Product "P"/ Contract "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_ROLLMECH',
'Indicates Rollover Mechanism',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_ROLLMETHD',
'Indicates Rollover Method' || chr(10) || 'Normal   "N"' || chr(10) || 'Consolidated  "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_TRESPLAMT',
'Indicates Treat Special Amount As' || chr(10) || 'Rollover Amount  "R"' || chr(10) || 'Liquidation Amount "L"' || chr(10) || 'Maximum Rollover Amount "M"' || chr(10) || 'Ignore "I"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVERTYPE6_UPDATEUTIL',
'Indicates Update Limits Utilisation (yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_ALLOWED',
'Indicates Rollover Allowed.' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_AMT',
'Indicates Rollover Amount' || chr(10) || '	P - Principal' || chr(10) || '	I - Principal + Interest' || chr(10) || '	T - Principal +(Interest-Tax)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_AUTH_RES_PK',
'It indicates Rollover Authorize PK Response details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_COUNT',
'Indicates Rollover Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_DATE',
'Indicates Rollover Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_DEL_RES',
'Indicates Rollover Delete Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_DETAILS',
'Indicates Rollover Details' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_INTEREST_RATES',
'Rollover Interest Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_MM_PK_RES_TYPE',
'Includes Money Market Rollover PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_QRY_RES_FULL',
'Indicates Rollover-Query-Response Full type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_RES_FULL',
'Indicates Rollover-Response full type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_RES_PK',
'Indicates Rollover Response-PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_REV_RES',
'Indicates Rollover-Reverse Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_STATUS',
'Indicates Rollover Status' || chr(10) || '	C - Completed' || chr(10) || '	I - Incomplete',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_TYPE',
'Indicates Rollover Type' || chr(10) || '	P - Principal' || chr(10) || '	I - Principal/Interest' || chr(10) || '	S - Special Amount' || chr(10) || '	T - Interest',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVER_TYPE1',
'This specifies Rollover Type.' || chr(10) || '							P- Principal' || chr(10) || '							T-Interest' || chr(10) || '							I - Principal + Interest' || chr(10) || '							S-Special Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVRIND',
'Indicates Rollover Details' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVRMODE',
'Indicates Rollover Mode' || chr(10) || 'Daily                      "D"' || chr(10) || 'Monthly               "M"' || chr(10) || 'Yearly                    "Y"' || chr(10) || 'Quarters              "Q"' || chr(10) || 'Semi Annual       "S"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLOVRTYPE',
'Incidcates Rollover type' || chr(10) || 'Special "S"' || chr(10) || 'Custom "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPENALRATE',
'Mortgages Rollover penal rate Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPENALRATE_EFFDT',
'Indicate effective day',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPENALRATE_UDENM',
'Indicates User Data Elements Name.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPREF_INTLIQDMOD',
'Indicates Interest Liquidation Mode' || chr(10) || '	D - Deferred' || chr(10) || '	I - Immediate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPREF_INTLIQDMOD1',
'Indicates Profit Liquidation Mode' || chr(10) || '	D - Deferred' || chr(10) || '	I - Immediate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLPREMDIS',
'Indicates Rollover Premium Discount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLSPOTRT',
'Indicates Rollover Spot Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTENOR',
'Indicates Rollover Tenor' || chr(10) || '	L - Account Class Tenor' || chr(10) || '	A - Account Tenor' || chr(10) || '	I - Independent Tenor',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE',
'Indicates Rollover Type' || chr(10) || '	I - Principal + Interest' || chr(10) || '	P - Principal' || chr(10) || '	S - Special Amount' || chr(10) || '	T - Interest',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE1',
'Indicates Rollover Type' || chr(10) || 'Principal : P' || chr(10) || 'Principal+Interest : I' || chr(10) || 'Special Amount : S',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE2',
'Indicates Rollover type Auto (A)/Manual (M)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE3',
'Indicates Roll Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE4',
'Indicates rollover type' || chr(10) || '' || chr(10) || 'Auto   : A' || chr(10) || 'Manual : M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLTYPE5',
'Indicates Rollover Type' || chr(10) || 'Principal : P' || chr(10) || 'Principal+Interest : I' || chr(10) || 'Special Amount : S' || chr(10) || 'Interest : T',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLWINT',
'Indicates Rollover Type' || chr(10) || '	C - Custom' || chr(10) || '	S - Special',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLLWITHPR',
'Indicates Rollover With Profit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLOVR',
'Indicates Rollover' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLTOHD',
'Role to Head',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLTOHDMAP',
'Role to Head Mapping',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLTP',
'Indicates Role Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROLTYP',
'Indicates Settlement',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROOTINTM',
'Indicates Root Intermediary' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUNDING_REQUIRED',
'Indicates Rounding Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUNDING_RULE',
'Indicates Rounding Rule' || chr(10) || '	T - Truncate' || chr(10) || '	U - Up' || chr(10) || '	D - Down' || chr(10) || '	R - Round Near',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUNDPARTICIP',
'Indicates Rounding Participant',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTBNKNAM',
'Indicates Routing Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTBRNNAM',
'Indicates Routing Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTECODE',
'Indicates Route Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTECODE1',
'Indicates the route code of the transaction.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTING',
'Indicates Direct/Indirect' || chr(10) || '	D - Direct' || chr(10) || '	I - Indirect',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTING1',
'Indicates the Routing Number of Debit Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTING2',
'Indicates the Routing Number of Credit Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTINGBANKCODE',
'Indicates Direct Bank Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTINGCR',
'Indicates Credit Routing  Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTINGDR',
'Indicates Debit Routing  Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTINGNO',
'Indicates the routing number of the transaction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTING_NO',
'Indicates Rounting Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTNO',
'Indicates Routing No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTSECTDISC',
'Indicates Routing Sector Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROUTTYPE',
'Routing Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ROW_NUM',
'Indicates Row Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPBENPLAN_FULL_TYPE',
'Indicates Pricing Benefit Plan full type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPBENPLAN_IO_TYPE',
'Indicates Pricing Benefit Plan-IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPBENPLAN_MODIFY_IO_TYPE',
'Indicates Pricing Benefit Plan-Modify-IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPBENPLAN_PK_ACR_TYPE',
'Indicates Pricing Benefit Plan-Primary key-ACR type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPBENPLAN_PK_TYPE',
'Indicates Pricing Benefit Plan-Primary key type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPCUSTOMER',
'Indicates RP Customer' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPCUSTOMER1',
'Indicates the RP Customer flag.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPCUSTOMERTYPE',
'Indicates RP Customer Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPELPLAN_FULL_TYPE',
'Indicates Pricing Eligibility Plan-full type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPELPLAN_IO_TYPE',
'Indicates Pricing Eligibility Plan-IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPELPLAN_MODIFY_IO_TYPE',
'Indicates Pricing Eligibility Plan-Modify IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPELPLAN_PK_ACR_TYPE',
'Indicates Pricing Eligibility Plan-Primary key-ACR type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPELPLAN_PK_TYPE',
'Indicates Pricing Eligibility Plan-Primary key type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPNAM',
'Indicates Report Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPR_ACCRUAL_METHOD',
'Indicates Accrual Method' || chr(10) || '	B - 30(US)/360' || chr(10) || '	A - 30-Euro / 360' || chr(10) || '	C - Actual/360' || chr(10) || '	D - 30(Euro)/365' || chr(10) || '	E - 30-US/365' || chr(10) || '	F - Actual/365' || chr(10) || '	G - 30(Euro)/Actual' || chr(10) || '	H - 30(US)/Actual' || chr(10) || '	I - Actual/Actual' || chr(10) || '	X - 30(Euro)/364' || chr(10) || '	Y - 30-US/364' || chr(10) || '	Z - Actual/364',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPR_ACCRUAL_START_MONTH',
'Indicates Accrual Start Month' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	1 - January' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHEMEDESC',
'Indicates Scheme Advice Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNTIOTYPE_RECSTAT',
'Indicates Record Status' || chr(10) || 'Open   : O' || chr(10) || 'Closed : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNT_FULL_TYPE',
'Indicates Full Screen Details of Relationship Pricing Scheme Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNT_IO_TYPE',
'Indicates Input Only Details of Relationship Pricing Scheme Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNT_MODIFY_IO_TYPE',
'Indicates Input Only Details of Relationship Pricing Scheme Modification Action',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNT_PK_ACR_TYPE',
'Indicates Primary Key Details of Relationship Pricing Scheme Amendment, Close and Reopen Actions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPSCHMNT_PK_TYPE',
'Indicates Primary Key Details of Relationship Pricing Scheme Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPTCCY',
'Indicates Report Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RPTRATTYP',
'Indicates Reporting Rate Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_BEN_DET',
'Includes Pricing Benefit Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_BEN_PLAN_FULL',
'Includes Pricing Benefit Plan Authorization details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_BEN_PLAN_IO',
'Includes Pricing Benefit Plan Authorization-IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_BEN_PLAN_PK',
'Includes Pricing Benefit Plan Authorization-Primary key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_ELIGIBILITY_RDE',
'Includes Relationship Data Element details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_EL_PLAN_FULL',
'Includes Pricing Eligibility Plan Authorization details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_EL_PLAN_IO',
'Includes Pricing Eligibility Plan Authorization-IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_EL_PLAN_PK',
'Includes Pricing Eligibility Plan Authorization-Primary key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_SCHEME_MASTER_FULL',
'Includes Pricing Scheme Authorization details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_SCHEME_MASTER_IO',
'Includes Pricing Scheme Authorization-IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RP_SCHEME_MASTER_PK',
'Includes Pricing Scheme Authorization-Primary key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSKDEPASSES',
'Indicates Risk Department Assessment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSKDEPTMIT',
'Indicates Risk Department Mitigants',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSKEXPAMT',
'Indicates Risk Free Exposure Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSKID',
'Indicates Risk Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSKMIT',
'Indicates Risk and Mitigants',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSLTCMP',
'Indicates Resultant Charge Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSLTDT',
'Indicates Result Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RSLVVAL',
'Indicates Main Interest Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCALCTYP',
'Indicates Rate Calculation Type' || chr(10) || '	D - Down' || chr(10) || '	I - Interpolate' || chr(10) || '	R - Round Off' || chr(10) || '	U - Up',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCALCTYP1',
'Indicates the Interest Rate Calculation type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCD',
'Indicates Rate As Of',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCDCHN',
'Indicates RATE CODE CHANGE',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCDUSE',
'Indicates the Interest rate code usage.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCHGRES',
'Indicates Rate Change Restricted' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTCODEPRFERD',
'Indicates Rate Code' || chr(10) || '	M - Mid Rate' || chr(10) || '	B - Buy /Sell Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTDEBAS',
'Indicates Rate Denominator Basis' || chr(10) || '	A - Per Annum' || chr(10) || '	C - Per Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTDEBAS1',
'Indicates the rate denominator basis applicable for interest payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTDENMBS',
'Indicates Rate Denominator Basis' || chr(10) || '	C - Per Period' || chr(10) || '	A - Per Annum',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTFLAG',
'Indicates Rate At' || chr(10) || 'Pool Code         : P' || chr(10) || 'Contract Level  : R',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGSNW',
'Indicates Real Time Gross Settlement Network',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGSPAYMENT',
'Indicates RTGS Payment' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGSPMNT',
'Indicates RTGS Payment' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGSPMNT1',
'Indicates Real Time Gross Settlement payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGSPRD',
'Indicates RTGS Product' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGS_NETWORK',
'Indicates RTGS Network',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGS_NETWORK1',
'Indicates RGTS Network.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGS_PAYMENT',
'Indicates Rtgs Payment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGS_PAYMENT1',
'Indicates RTGS Payment.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTGS_PAYMENT2',
'Indicates RGTS Payment.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTHC',
'Indicates Fund Role To Head Class',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTHCLASS',
'Indicates Role to Head Class',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTLPRODUCTCODE',
'Indicates Retail Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTNGNO',
'Indicates Routing Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTNGNO1',
'Indicates Clearing Routing Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTPICKDT',
'Indicates Rate Pickup Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTREFRS',
'Indicates After Rate Refresh' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTTYP',
'Indicates Rate Type' || chr(10) || '	F - Floating' || chr(10) || '	X - Fixed' || chr(10) || '	S - Special',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTVARMAXLMT',
'Indicates Maximum Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RTYP',
'Indicates Rate Type' || chr(10) || '	F - Floating' || chr(10) || '	S - Special' || chr(10) || '	X - Fixed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RT_CHARGE_PRODUCT',
'Indicates RT-Charge Product for Passbook Issue',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RT_PRODUCT_FULL',
'Include RT product full type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RT_PRODUCT_IO',
'Include RT Product IO type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RT_PRODUCT_PREFERENCE',
'Include RT Product Preference  details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RUL',
'Indicates Tax Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE',
'Indicates Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE1',
'Indicates Interest Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE2',
'This identifies the basic nature of a brokerage component. Each brokerage rule is defined by a ten-character code, called the Rule ID.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULECATG',
'Indicates Rule Category',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULEDESC',
'Indicates Rule Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULEEXP',
'Indicates Rule Expression',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULEFRM_TAXCALCCCY',
'Indicates Tax Calculation in Local Curreny Basis.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULEID',
'Indicates Rule Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULEID1',
'Indicates Rule Identification',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULENAME',
'Indicates Rule Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULENARRATIVE',
'Indicates Rule Narrative',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULETYPE',
'Indicates Rule Type' || chr(10) || '	P - Payment' || chr(10) || '	C - Collection',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_CODE',
'Indicates Rule Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_DETAILS',
'Rule Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_EXPRESSION',
'Indicates Rule Condition',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_FRM',
'Rule Formula Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_FULL',
'Includes the information regarding the Authorisation of Interest and Charges Rule maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_IDENT',
'Indicates Rule ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_IO',
'Includes the IO information regarding the Authorisation of Interest and Charges Rule maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_METHOD',
'Indicates Rule Method' || chr(10) || '	1 - Flat' || chr(10) || '	2 - Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_PK',
'Includes the primary key information regarding the Authorisation of Interest and Charges Rule maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_SDE',
'Rule System Elements Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_TRSH_VAL',
'Indicates Threshold Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_TYP',
'Indicates Type' || chr(10) || '	W - Withholding' || chr(10) || '	E - Expense',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULE_UDE',
'Rule UDE Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RULFEE',
'Indicates Fee Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RUL_NO',
'Indicates Rule Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RUN_DATE',
'Indicates Run Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVFINCTR',
'Indicates The Revision Finance centre.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVHCASAL',
'Indicates The Revision cascade',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVHMVMNT',
'Indicates The Revision Holiday Movement.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVHOLCCY',
'Indicates The Revision Holiday Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVHOLTRT',
'Indicates The Revision Holiday treatment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVMVAMNT',
'Indicates The Revision Movement.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNAPLYCONTHOLCCY',
'Indicates Apply Contract Holiday Currency on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNAPLYFACLTYHOLCCY',
'Indicates Apply Facility Holiday Currency on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNAPLYLCLHOLCCY',
'Indicates Apply Local Holiday Currency on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNCASCSCHD',
'Indicates Cascade Schedules on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNCCY',
'Indicates Currency on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNCONSBRNHOL',
'Indicates Consider Branch Holiday on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNIGHOL',
'Indicates Ignore Holidays on Rate Revision Schedule' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNINDHOLTREAT',
'Indicates Independent Holiday on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNMOVEACROSSMNTH',
'Indicates Move Across Month on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNRATE',
'Indicates Rate Revision.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVNSCHDMOVE',
'Indicates Schedule Movement on Rate Revision Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVRINTRATES',
'Includes Rollover Interest Rates details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVRINTRATES_DEFFROM',
'Indicates Basis' || chr(10) || '' || chr(10) || 'Product   : P' || chr(10) || 'Contract  : C' || chr(10) || 'User Rate : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_RVRSD',
'Indicates Reversed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAFEKEEPLOC2TYPE',
'Includes Safe Keeping Location 2 Type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAFEKEEPLOCTYPE',
'Includes the Safe Keep Location Type details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALARY',
'Indicates Salary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALARY_ACCOUNT',
'Indicates Salary Account' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALARY_APPLICANT',
'Indicates Salary Income of Applicant',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALARY_CREDIT',
'Indicates Salary Credit' || chr(10) || '	N -' || chr(10) || '	Y - Normal Salary' || chr(10) || '	B - Bulk Salary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALEAMT',
'Indicates Sale Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALECONF',
'Indicates Sale Confirmation Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALEDT',
'Indicates Sale Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALERATE',
'Indicates Sale Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALESPRD',
'Indicates Sell Spread',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALEVARIANCE',
'Indicates Sale Variance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALEWROF',
'Indicates Sale Write off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALSPRD',
'It indicates the sale spread for a currency pair.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SALUT',
'Indicates Salutation' || chr(10) || '	Miss - Miss' || chr(10) || '	Dr - Dr' || chr(10) || '	Mr - Mr.' || chr(10) || '	Mrs - Mrs.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAL_BLK_DAYS',
'Indicates No of Days For Salary Block',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAME_CORR_ADDR',
'Indicates Same as Correspondence Address' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAME_PERM_ADDR',
'Indicates Same as Permanent Address' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAMT',
'Indicates Subscription Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SANCTIONED',
'Indicates Sanctioned',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNT',
'Indicates Consumer Lending Save Account details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNT1',
'Indicates Leasing Save Account details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTACTIVATEFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to activate MO account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTACTIVATEIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to activate CL account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTACTIVATEIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to activate LE account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new Drawdown Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTFULLRESPONSE',
'Indicates Consumer Lending Save Account Full Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTFULLRESPONSE1',
'Indicates Leasing Save Account Full Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTIO',
'Indicates Consumer Lending Save Account IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTIO1',
'Indicates Leasing Save Account IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new LS(Drawdown) Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTPKRESPONSE',
'Indicates Consumer Lending Save Account PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNTPKRESPONSE1',
'Indicates Leasing Save Account PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNT_LASTINTRADAYACCRDT',
'Indicates Last Intraday Accural Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNT_OTHAPPLCNT',
'Indicates Other Applicants block',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCOUNT_PAYERBANKCODECR',
'Indicates Payer Bank Code to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM',
'Indicates Mortgages Save Account Simulation details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM1',
'Indicates Consumer Lending Save Account Simulation details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM2',
'Indicates Leasing Save Account Simulation details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) AccSim',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL(Retail Lending) AccSim',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFSFSREQ_FCUBSBODY2',
'This XSD gives the message format for a request to create a new LE(Leasing) AccSim',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE',
'Indicates Mortgages Save Account Simulation full Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE1',
'Indicates Consumer Lending Save Account Simulation full Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE2',
'Indicates Leasing Save Account Simulation full Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_AUTOLIQRVPMNT',
'It indicates Auto Liquidate Reverse Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLCHARGES',
'It indicates MO module Charge details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLCHARGES1',
'It indicates CL module Charge details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLCOMPDET',
'It indicates MO Components details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLCOMPDET1',
'It indicates CL Components details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLTAXES',
'It indicates MO Tax details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_CLTAXES1',
'It indicates CL Tax details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_EVENTS',
'It indicates Events detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_FULLYPAIDINSTCNT',
'It indicates Fully Paid Installment Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_MATNOTIND',
'It indicates Mandatory Indicator' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMFULLRESPONSE_TOTCONDONEAMT',
'It indicates Total Contract Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIO',
'Indicates Mortgages Save Account Simulation IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIO1',
'Indicates Consumer Lending Save Account Simulation IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIO2',
'Indicates Leasing Save Account Simulation IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new CL(Retail Lending) Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIORESPONSE',
'Indicates Mortgages Save Account Simulation IO Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIORESPONSE1',
'Indicates Consumer Lending Save Account Simulation IO Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIMIORESPONSE2',
'Indicates Leasing Save Account Simulation IO Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM_EXTACNMDR',
'Indicates External Account Name to be credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM_GIROMODECR',
'Indicates GIRO Mode to be Credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEACCSIM_GIROSERVICECR',
'Indicates GIRO Service to be Credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) ALiqdSusp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL(Retail Lending) ALiqdSusp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPFSRESPONSE',
'Indicates Save Auto liquidation Suspense Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPIO',
'Indicates Save Auto liquidation Suspense type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPIORESPONSE',
'Indicates Save Auto liquidation Suspense IO Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEALIQDSUSPPKRESPONSE',
'Indicates Save Auto liquidation Suspense PK Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOC',
'Consumer Lending Adhoc Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to upload adhoc charges',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCIO',
'Consumer Lending Adhoc Charge - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCIOPKRES_FCUBSBODY',
'Mortgages Adhoc Change Reqeust PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCIOPKRES_FCUBSBODY1',
'Consumer Lending Adhoc Change Reqeust PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCIORESPONSE',
'Consumer Lending Adhoc Charge - IO Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLADHOCRESPONSE',
'Consumer Lending Adhoc Charge - Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECLPKADHOCRESPONSE',
'Consumer Lending Adhoc Charge - PK response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECOMMITFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new Tranche Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVECOMMITIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to create a new LS(Tranche) Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENT',
'Consumer Lending Disbursement Save Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENT1',
'Leasing Disbursement Save Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new LE(Retail Lending) dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTIO',
'Consumer Lending Disbursement - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTIO1',
'Leasing Disbursement - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTIO_STTLMNTS',
'Consumer Lending Disbursement Settlement Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTIO_STTLMNTS1',
'Leasing Disbursement Settlement Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTRESPONSE',
'Consumer Lending Disbursement Save response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTRESPONSE1',
'Leasing Disbursement Save response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTRESPONSEPK',
'Consumer Lending Disbursement PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTRESPONSEPK1',
'Leasing Disbursement PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENTRESPONSE_EVENTUSERDEF',
'Leasing Disbursement User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEDISBURSEMENT_CHARGES',
'Leasing Disbursement Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE',
'Mortgagges Save Inactive Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE1',
'Consumer Lending Save Inactive Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE',
'Mortgagges Save Inactive Full response.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE1',
'Consumer Lending Save Inactive Full response.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_AUTHSTAT1',
'Indicates Authorization Status of contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_COMMITUTILS',
'Mortgagges Commit Utilities',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_EVENTADVICES',
'Mortgagges Event Advice Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_MISMASTER',
'Mortgagges  MIS Master.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_ROLLCOMP',
'Mortgagges Rollover Component.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEFULLRESPONSE_ROLLOVRTYPE',
'Indicates Rollover type' || chr(10) || 'Special "S"' || chr(10) || 'Custom "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEIO',
'Mortgagges Save Inactive IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEIO1',
'Consumer Lending Save Inactive IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEPKRESPONSE',
'Mortgagges Account Inactive Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVEPKRESPONSE1',
'Consumer Lending Account Inactive Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_ADVSUPPRESS',
'Mortgagges  Advice Supress Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_CALCREQD',
'ndicates Calculation Required' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_EVENTREMK',
'Mortgagges Event Remarks.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_EVENTREMK1',
'Consumer Lending Event Remarks.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_FUNDEDSTATUS',
'Indicates Fund Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_OTHAPPLCNT',
'Mortgagges Other Application Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_PARTLIQ',
'Incicates Partial Liquidation.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINACTIVE_UDFDETAILS',
'Mortgagges  UDF Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHG',
'Mortgages Installment Status Change Save Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to do MO(Mortgages) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to do CL(Retail Lending) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGFSFSRES_FCUBSBODY',
'This XSD gives the message format for a response to do MO(Mortgages) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGFSFSRES_FCUBSBODY1',
'This XSD gives the message format for a response to do CL(Retail Lending) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGIO',
'Mortgages Installment Status Change Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGIOPKRES_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL(Retail Lending) install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGRESPONSE',
'Mortgages Installment Status Change Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGRESPONSEIO',
'Mortgages Installment Status Change Response IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHGRESPONSE_ACCSTSHCHARGES',
'Indicates Account STSH Charges.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHG_ACCSTSHCHARGES',
'Account Settlement Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEINSTSTATCHG_CLEVTUDF',
'Consumer Loan Event User Defined Field.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOADHOC',
'Mortgages Adhoc Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOADHOCIO',
'Mortgages Adhoc Charge - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOADHOCIORESPONSE',
'Mortgages Adhoc Charge - IO Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOADHOCRESPONSE',
'Mortgages Adhoc Charge - Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOADHOCRESPONSE_AMT',
'Indicates Amont.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEMOPKADHOCRESPONSE',
'Mortgages Adhoc Charge - PK response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENT',
'Include Save Payment details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENT1',
'Mortgages Payment save details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENT2',
'Leasing Payment save details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new LS(Loan Syndication) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new MO(Mortgages) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTFSFSREQ_FCUBSBODY2',
'This XSD gives the message format for a request to create a new LE(Leasing) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTFSFSRES_FCUBSBODY',
'This XSD gives the message format for a request to create a new LE(Retail Lending) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIO',
'Include Save Payment IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIO1',
'Mortgages Payment - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIO2',
'Leasing Payment - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to save a new LS(Loan Syndication) payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to save a new MO(Mortgages) payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIOPKREQ_FCUBSBODY2',
'This XSD gives the message format for a request to save a new LE(Leasing) payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTIO_PAIDDET',
'Indicates Paid Detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSE',
'Include Save Payment Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSE1',
'Mortgages Payment Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSE2',
'Leasing Payment Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEIO',
'Include Save Payment Response IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEIO1',
'Mortgages Payment -IO Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEIO2',
'Leasing Payment -IO Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEIO_INSTALLMENTPAYMENT',
'Indicates Installment(s) Payments.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEPK',
'Indicate save Payment Response PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEPK1',
'Mortgages Payment PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENTRESPONSEPK2',
'Leasing Payment PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEPAYMENT_XREFTYPE',
'Indicates External reference Type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREASSIGNIO',
'Indicates Save Reassign IO type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFS',
'Mortgages Account Rollover FS Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFS1',
'Consumer Lending Account Rollover FS Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO Renog Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL Renog Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSRESPONSE',
'Mortgages Account Rollover FS save  response  Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSRESPONSE1',
'Consumer Lending Account Rollover FS save  response  Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSRESPONSE_ISAVAIL',
'Indicated Rollover Status.' || chr(10) || 'Yes "Y";No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFSRESPONSE_ROLLPENALRATE',
'Consumer Lending Rollover penal rate Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFS_CRROLLSETT',
'Indicates Credit Rollover settlement details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFS_DRROLLSETT',
'Indicates Debit Rollover settlement details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGFS_ROLLPENALRATE',
'Indicates Rollover penalty rates',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGIO',
'Mortgages Account RolloverIO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGIO1',
'Consumer Lending Account RolloverIO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGIORESPONSE',
'Mortgages Account Rollover IO response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGIORESPONSE1',
'Consumer Lending Account Rollover IO response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGIO_ISAVAIL',
'Indicates isavailable',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGPK',
'Mortgages Account Rollover PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVERENOGPKRESPONSE',
'Mortgages Account Rollover PK response  Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALFS',
'Indicates Save Reversal-FS type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) Reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL(Retail Lending) Reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALFSFSREQ_FCUBSBODY2',
'This XSD gives the message format for a request to create a new LE(Leasing) Reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALFSRESPONSE',
'Indicates Save Reversal-FS Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALIO',
'Indicates Save Reversal-IO type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEREVERSALPKRESPONSE',
'Indicates Save Reversal-IO Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFS',
'Indicates Save Rollover-FS type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSFSREQ_FCUBSBODY',
'This.xsd gives the message format for a request to create a new MO Rollover Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSFSREQ_FCUBSBODY1',
'This.xsd gives the message format for a request to create a new CL Rollover Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSRESPONSE',
'Indicates Save Rollover-FS Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSRESPONSE_CRROLLSETT',
'Indicates the Credit Settlement Details of Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSRESPONSE_DRROLLSETT',
'Indicates the Debit Settlement Details of Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFSRESPONSE_ROLLPENALRATE',
'Indicates Rollover Penalty Rate details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERFS_CRROLLSETT',
'Indicates Rollover Credit details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERIO',
'Indicates Save Rollover-IO type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERIORESPONSE',
'Indicates Save Rollover-IO Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERIORESPONSE_DRROLLSETT',
'Indicates Rollover Debit details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERIO_CRROLLSETT',
'Indicates Credit Details of Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERIO_DRROLLSETT',
'Indicates Debit Details of Rollover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERPK',
'Indicates Save Rollover-PK type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEROLLOVERPKRESPONSE',
'Indicates Save Rollover-PK Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFSFSREQ_FCUBSBODY',
'Consumer Lending Save Status Change Request Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new LE(Leasing) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFSFSRES_FCUBSBODY',
'Mortgages Save Status Change Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFSFSRES_FCUBSBODY1',
'Consumer Lending Save Status Change Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL',
'Mortgages Account Status Change Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL1',
'Consumer Lending Account Status Change Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL2',
'Leasing Account Status Change Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL_ACCEVENTUSERDEF',
'Mortgages Account Status Change - User Defined Evevnt Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL_ACCEVENTUSERDEF1',
'Consumer Lending Account Status Change - User Defined Evevnt Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL_ACCEVENTUSERDEF2',
'Leasing Account Status Change - User Defined Evevnt Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL_ACCSTCHCHARGES',
'Consumer Lending Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEFULL_ACCSTCHCHARGES1',
'Leasing Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEIO',
'Mortgages Account Status Change - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEIO1',
'Consumer Lending Account Status Change - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEIO2',
'Leasing Account Status Change - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGEIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new CL(Retail Lending) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEFULL',
'Mortgages Account Status Change - Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEFULL1',
'Consumer Lending Account Status Change - Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEFULL2',
'Leasing Account Status Change - Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEFULL_ACCEVENTUSERDEF',
'Consumer Lending Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEFULL_ACCEVENTUSERDEF1',
'Leasing Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEPK',
'Mortgages Account Status Change -  Response PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEPK1',
'Consumer Lending Account Status Change -  Response PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVESTATUSCHANGERESPONSEPK2',
'Leasing Account Status Change -  Response PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) Vami',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new LE(Leasing) Vami',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIFSFSRES_FCUBSBODY',
'This XSD gives the format of response message for a new MO(Mortgages) Vami',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIFSFSRES_FCUBSBODY1',
'This XSD gives the format of response message for a new LE(Leasing) Vami',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIPK',
'Leasing Value Dated Amendments - PK Detsils',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES',
'Leasing Value Dated Amendments Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRESIO',
'Leasing Value Dated Amendments - IO Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRESPK',
'Leasing Value Dated Amendments -PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_CLCOMPDET',
'Leasing Component Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_CLVWSOTHAPPLCNT',
'Leasing Value Dated Amendments Other Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_COMMITMENTTYPE',
'ndicates Commitment Type.' || chr(10) || 'Revolving        : R' || chr(10) || 'Non Revolving : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_COMMITUTILS',
'Leasing Commit Utilities Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_EVENTS',
'Leasing Value Dated Amendments event details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_INSTLDETS',
'Leasing Value Dated Amendments Instalment Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_OTHAPPLCNT',
'Leasing Other Application Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMIRES_UDFDETAILS',
'Leasing  UDF Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_ADVSUPPRESS',
'Leasing  Advice Supress Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_ALIQREVERSEDPMT',
'Indicates Allow Retry Revaluation Auto Liquidation. Yes Y; No N.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_ARVNAPPLIED',
'Indicates Automatic Rate Revision Applied.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_CHARGEDET',
'Leasing Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_EVENTREMK',
'Leasing Event Remarks.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR1',
'Indicates Field Character 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR10',
'Indicates Field Character 10',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR11',
'Indicates Field Character 11',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR12',
'Indicates Field Character 12',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR13',
'Indicates Field Character 13',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR14',
'Indicates Field Character 14',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR15',
'Indicates Field Character 15',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR16',
'Indicates Field Character 16',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR17',
'Indicates Field Character 17',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR18',
'Indicates Field Character 18',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR19',
'Indicates Field Character 19',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR2',
'Indicates Field Character 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR20',
'Indicates Field Character 20',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR3',
'Indicates Field Character 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR4',
'Indicates Field Character 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR5',
'Indicates Field Character 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR6',
'Indicates Field Character 6',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR7',
'Indicates Field Character 7',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR8',
'Indicates Field Character 8',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDCHAR9',
'Indicates Field Character 9',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_FIELDNUMBER1',
'Indicates Field number 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_NOOFINST',
'Indicates Number Of Instalment.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_PAYERADDRESS1CR',
'DR Indicates Credit Payer Address Line 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_PAYERADDRESS2CR',
'DR Indicates Credit Payer Address Line 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_PAYERADDRESS3CR',
'DR Indicates Credit Payer Address Line 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVEVAMI_PAYERADDRESS4CR',
'DR Indicates Credit Payer Address Line 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_ADHOCCHG_RES_FULL',
'Mortgages Adhoc Change Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_ADHOCCHG_RES_PK',
'It indicates Save Adhoc Change PK Response details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_INSTSTATCHG_RES_FULL',
'Mortgages Installment Status Change Response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_INSTSTATCHG_RES_PK',
'Mortgages Installment Status Change Save Response PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_REASSIGN_RES_PK',
'Indicates MO Save Reassign Response-PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVE_REVERSAL_RES',
'Save reversal response message',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAVING_BRN',
'Indicates Savings Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SAV_ACC_CCY',
'Indicates Savings Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SBMTAGEPROOF',
'Indicates Submit Age Proof' || chr(10) || '	P - Pending' || chr(10) || '	N - Not Required' || chr(10) || '	V - Verified',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCALE',
'Indicates Scale',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCDA_STATS',
'Indicates Status' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHAFF',
'Indicates Schedule Affected.' || chr(10) || 'Yes "Y; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHAMOUNTDUETYPE_SCHEDULEDUEDATE',
'Indicates Schedules Due Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHBASIS',
'Indicates Schedule Basis' || chr(10) || '	P - Product' || chr(10) || '	C - Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHBASIS1',
'Indicates Schedule Basis.' || chr(10) || 'Product "P"' || chr(10) || 'Contract "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHBASIS2',
'Indicates Schedule Basis' || chr(10) || 'Product  : P' || chr(10) || 'Contract : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHCASAL',
'Indicates The Schedule Cascade',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHCONBRNHOL',
'Indicates Holiday Treatment For Schedules --' || chr(10) || 'Include Branch Holiday (yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDBASIS',
'Indicates Schedule Basis  Product "P"/ Contract "C"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDDEFNBAS',
'Indicate Schedule Definition Basis',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDESC',
'Indicates Schema Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDLDUDT',
'Indicates Schedule Due Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDLEMVMNT',
'Indicates Schedule Movement' || chr(10) || '	N - Move Forward' || chr(10) || '	P - Move Backward',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDMOVE',
'Indicates Schedule Movement' || chr(10) || '' || chr(10) || 'Move Forward : F' || chr(10) || 'Move Backward : B',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDMOVEMENT',
'Indicates Holiday Treatment For Schedules -- Move Forward "F"' || chr(10) || 'Move BackWard "B"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDMVMT',
'Indicate Schedule Movement',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDSTR',
'Indicates Schedule Structure' || chr(10) || '	N - Non Frequency Based' || chr(10) || '	Y - Frequency Based',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDUEDT',
'Indicates Schedule Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDUEDT1',
'Indicate Schedule Due Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDUEDT2',
'It indicates Due Date of the Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHDUEDT3',
'It indicates Due Date of Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDBYDUEDT',
'Indicates Schedule details by due date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE',
'Product Schedules',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE1',
'Mortgages Schedule Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE2',
'Consumer Lending Schedule Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE3',
'It indicates Schedules detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULEDETAILS_AMTDUE',
'Indicates Amunt Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULEDETAILS_CCYAMTDUE',
'Indicates Amount Due In Local Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULEDETAILS_SCHEDULETYP',
'Indicates Schedule Method' || chr(10) || '	P - Principal' || chr(10) || '	R - Revision' || chr(10) || '	I - Profit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULEDETAILS_SCOMP',
'Indicates Schedule Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULEPRDT',
'Indicates Schedule Process Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULES',
'Includes Limit Schedules details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULETYP',
'Indicates Schedule Method' || chr(10) || '	P - Principal' || chr(10) || '	I - Interest' || chr(10) || '	R - Revision',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_ACCOUNTGL',
'Indicates Account GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_ADJSETTLED',
'Indicates Adjusted Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_AMORTPRINC',
'Indicates Amort Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_DATES',
'Schedue Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_DUE_DATE',
'Indicates the Schedule Due Date of Revisions.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_FLAG',
'Indicates Schedule Flag' || chr(10) || 'Normal     : N' || chr(10) || 'Moratorium : M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_HISTORY_DETAILS',
'Schecdule details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_IRRAPPLICABLE',
'ndicates IRR applicable.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_ISCAP',
'It indicates Capititalized' || chr(10) || '' || chr(10) || '					  Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_ISWAIVE',
'Indicates Wavier Yes/No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LASTREADJXRATE',
'Indicates Readjusted Exchange rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LASTREADJXRATE1',
'Indicates Latest  readjusted Exchange Rate.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LASTSUSPXRATE',
'Indicates Latest Suspense Exchange Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LINKAGE',
'Indicates the Schedule Linkage of Disbursals.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LISTAVGAMT',
'Indicates List Avg. Amount.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_LISTDAYS',
'Indicates Listed Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_MORAINT',
'Indicates the Mora int.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_READJSETTLED',
'Indicates ReAdjustment Settled Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_READJSETTLED1',
'Indicates Readjusted Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SCHEDULEFLAG',
'Indicate Schedule Flag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SCHEDULESTDATE',
'Indicates Schedule Start Date of Schedule details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SETTLEMENTCCY',
'Indicates Aettlement Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_ST_DATE',
'Indicates the Schedule Start Date of Revisions.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUMM',
'Includes Scedules Summary details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUMMARY',
'Schedule Summary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUSPAMTDUE',
'Indicatess Suspense  Amount Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUSPAMTLCY',
'Indicates Suspense  Amount in Load Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUSPAMTLCY1',
'Indicates Suspense  Amount in Loan Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUSPAMTSETTLED',
'Indicatess Suspense  Amount Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_SUSPREADSETTLED',
'Indicates Suspense Readjusted Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_TYPE',
'Indicates Schedule Type' || chr(10) || '	P - Payment' || chr(10) || '	R - Rate Revision' || chr(10) || '	D - Disbursement',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_TYPE1',
'Indicates Schedule Type of Schedule details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_TYPE2',
'Indicates Schedule Type' || chr(10) || 'Revision     : R' || chr(10) || 'Payment      : P' || chr(10) || 'Disbursement : D',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEDULE_WRITEOFFAMT',
'Indicates Write of amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMECCY',
'Currency used in margin settlement',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEDESC',
'Indicates Scheme Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEDESC1',
'Indicates Pricing Scheme ID Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEDESC2',
'Indicates the Margin Scheme Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEDESC3',
'Indicates the scheme description for which margin settlement will be processed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEID',
'Indicates Pricing Scheme ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEREF',
'Specifies the Scheme Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMETYP',
'Indicates Scheme Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMETYPE',
'Indicates the ID of the scheme type for which margin settlement will be processed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEMEVNT',
'Specifies the Scheme Event.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_1',
'Indicates Scheme' || chr(10) || '	S - Sweep',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_CODE',
'Indicates Scheme Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_MAINTENANCE_FULL',
'Includes ETD Scheme Maintenance Full Type Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_MAINTENANCE_IO',
'Includes ETD Scheme Maintenance Primary Key details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_MAINTENANCE_PK',
'Includes Scheme Maintenance Primary Key Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHEME_TAX',
'Indicates Scheme',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHENDT',
'Indicates Schedule End Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHFINCN',
'Indicates The Schedule Holiday Financial centre.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHFINCTR',
'Indicates Financial Center',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHFLAG',
'Indicates Schedules Flag' || chr(10) || '' || chr(10) || 'Normal        : N' || chr(10) || 'Moratorium : M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHFLG',
'Indicates Schedule Flag' || chr(10) || '	N - Normal' || chr(10) || '	M - Moratorium',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHHOLMMNT',
'Indicates Schedule Movement' || chr(10) || '	P - Move Backward' || chr(10) || '	N - Move Forward',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHHOLTRMNT',
'Indicates Holiday Treatment' || chr(10) || '	L - Local' || chr(10) || '	C - Currency' || chr(10) || '	F - Financial Center' || chr(10) || '	I - Ignore',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_SCHLINK',
'Indicates Schedule Linkage',
'ENG'
)
;
END;
/



commit;
