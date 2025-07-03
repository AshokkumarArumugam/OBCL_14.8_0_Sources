PROMPT PROCESSING FOR CSZB_COMMENTS_001

BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_1SLASH',
'Indicates 1/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_2SLASH',
'Indicates 2/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_3SLASH',
'Indicates 3/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_4SLASH',
'Indicates 4/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_5SLASH',
'Indicates 5/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_6SLASH',
'Indicates 6/',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_A/C_NUMBER',
'Indicates Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ABLKTYPE',
'Indicates Amount Block Type' || chr(10) || '	F - FLEXCUBE' || chr(10) || '	S - Switch' || chr(10) || '	P - Pre Auth' || chr(10) || '	E - Escrow' || chr(10) || '	A - System' || chr(10) || '	C - Account' || chr(10) || '	B - Bulk Salary' || chr(10) || '	I - P2P',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ABSOLUTE_PRICE',
'Indicates Absolute Price',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ABSWHT',
'Indicates T Bill Withholding Tax',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ABSWHT1',
'Indicates T Bill WHT',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACAUTOGENFLG',
'Indicates Auto Generate Account' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACBILAMT',
'Indicates Actual Bill Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC',
'This specifies the Account number. Account number has to be unique for a' || chr(10) || '                                            given branch code in FLEXCUBE UBS. In the case if the option to Auto' || chr(10) || '                                            Generate Customer Account is chosen in FLEXCUBE UBS, this field can be' || chr(10) || '                                            left blank. In such case, Account number will be automatically configured by' || chr(10) || '                                            the system.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRESS',
'This node indicates the Account Address information',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRMODIFYTYPE_COUNTRY',
'Indicates the Country to which the Customer belongs to.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRMODIFYTYPE_NAME',
'Indicates the name of the Customer.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRTYPE_ADDRLN2',
'Indicates the address of the Customer.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRTYPE_DEFAULTADDR',
'This indicates the default address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCADDRTYPE_SENDBYEMAIL',
'This indicates whether account statement should be sent by mail.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCAUTOGEN',
'Indicate the Auto Generation Type:' || chr(10) || 'It can be:' || chr(10) || 'Yes' || chr(10) || 'No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCBR',
'Indicates Receive Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCBRN',
'Indicates the FLEXCUBE Branch that has the account that sources funds of the deal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCCD',
'Indicates Account Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCCLASSALLOWED',
'Indicates Account Class Restriction' || chr(10) || '	A - Allowed' || chr(10) || '	D - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCCRDRLMTS',
'This Node indicates the detail of Debit and Credit limits for the customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCCY',
'Indicates Receivable A/C Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCCYTYP',
'Indicates Account Currency Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDEPRTX',
'Indicates Accumulated Depreciation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDERSTAT',
'Indicates Account Derived Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDESC',
'Indicates Asset Reference Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDETAIL',
'Account Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDISTYPE',
'Indicates T Bill Tax Accrual on Discount' || chr(10) || '' || chr(10) || 'Advance  : E' || chr(10) || 'Arrears  : A' || chr(10) || 'N/A	 : N',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCDT',
'Indicates Account Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCENDDATE',
'Indicates Account End Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCEPTED',
'Indicates Accepted' || chr(10) || '	Y - Accepted' || chr(10) || '	N - Rejected' || chr(10) || '	O -',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCEPT_DAYS_BANK',
'Indicates Acceptance Days For Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCEPT_DAYS_CUST',
'Indicates Acceptance Days For Customer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCESN',
'Indicates Accrual Event Sequnce Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCEXCEP',
'Account Exception',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCFORISB',
'Indicates Issuing Bank Acc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCFUNDING',
'This Node Provides Account Funding details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCGL',
'Indicates Account No\ GL Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCHD',
'Indicates Account Head',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCHD_DESC',
'Indicates Account Head Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCINDR',
'Indicates Account Type' || chr(10) || '	C - Child' || chr(10) || '	P - Parent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCINST',
'Indicates Account With Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCINST1',
'Indicates Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCJOINTHOLDER_JOINTHOLDER',
'Indicates Joint Holder Type' || chr(10) || '	CON - Customer Contact Person' || chr(10) || '	GUR - Guardian' || chr(10) || '	CUS - Custodian' || chr(10) || '	DEV - Developer' || chr(10) || '	GUA - Guarantor' || chr(10) || '	AUS - Authorized Signatory' || chr(10) || '	JAF - Joint and First' || chr(10) || '	JAO - Joint and Other' || chr(10) || '	JOF - Joint or First' || chr(10) || '	JOO - Joint or Other' || chr(10) || '	NOM - Nominee' || chr(10) || '	REL - Related for Enquiry' || chr(10) || '	SOL - Solicitor' || chr(10) || '	SOW - Sole Owner' || chr(10) || '	THR - Third Party' || chr(10) || '	TRU - Trustee' || chr(10) || '	VAL - Valuer' || chr(10) || '	POA - Power of Attorney',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCJOINT_MODEOFOPERATION',
'Indicates Mode of Operation' || chr(10) || '	J - Jointly' || chr(10) || '	S - Single' || chr(10) || '	E - Either Anyone or Survivor' || chr(10) || '	F - Former or Survivor' || chr(10) || '	M - Mandate Holder',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCLINE',
'Indicates Account Line',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCLS',
'Indicates Account Class',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCLSTYP',
'Indicates Account Class Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCMAINTINSTR',
'This Node has the details of account maintenance Instructions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCMETHOD',
'Indicates Accrual Method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCMIS',
'This Node indicates the MIS details for the customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCMSGDT',
'Indicates Acceptance Message Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNEW',
'Indicates New Account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNEW_DEALERDESC',
'Indicates Dealer Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNO',
'Indicates Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNO1',
'Indicates Accoount Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNO2',
'Indictaes account number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNO3',
'Indicates Acount Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNOMINEES_NOMMINOR',
'Indicates Minor' || chr(10) || '	Y - On' || chr(10) || '	N - Off' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNTNG_HEAD_DESC',
'Indicates Accounting Head Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCNTROLE',
'Indicates Accounting Role',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOFCR',
'Indicates Account Officer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOMLODGE',
'Indicates Accommodate Lodge' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOMLODGE1',
'Indicates Accompany Withdraw' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOMLODGE2',
'Indicates the Accompany Withdraw.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOMODATE',
'Indicates Accommodation' || chr(10) || '	C - Company Provided' || chr(10) || '	O - Other' || chr(10) || '	S - Self Owned',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOPENDT',
'Inidcate the Account Opening Date.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCORGL',
'Indicates Acc or GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT',
'It indictes Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTAUTOCLOSED',
'Indicates Account Auto Closed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTCLASSMASTER_ACCSTATS',
'Indicates Account Statistics' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTCLASSMASTER_BALRPTSINCE',
'Indicates Report Transactions Since' || chr(10) || '	941 - 941' || chr(10) || '	940 - 940',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTCLASSMASTER_DEPACCLASS',
'Indicates Deposit Account Class' || chr(10) || '	A - Allowed' || chr(10) || '	D - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTCLASSMASTER_PROVCCYTYP',
'Indicates Provision Currency' || chr(10) || '	L - Local' || chr(10) || '	A - Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTCOMPONENTS_COMDESC',
'Indicates Component Name Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDESCRIPTION',
'It indicates the Broker Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_CARDSTATUS',
'Indicates Card Status' || chr(10) || '	I - Issued' || chr(10) || '	Q - Requested',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_CHQBKFLG',
'Indicates Cheque Book' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_ESCROWTRN',
'Indicates Escrow Transfer Applicable' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_INTERMDRYREQD',
'Indicates Intermediary Required' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_PASSBOOKFLG',
'Indicates Passbook' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_REQUESTSTATUS',
'Indicates Request Status' || chr(10) || '	Generated - Generated' || chr(10) || '	Requested - Requested',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_SALARYACC',
'Indicates Salary Account' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTDETAILS_STMTTYPE',
'Indicates Statement Type' || chr(10) || '	N - None' || chr(10) || '	S - Summary' || chr(10) || '	D - Detailed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEMICHG_EFFDT',
'Indicates Effective date for EMI Change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENT',
'Includes Account Event details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENTSADVICES',
'Includes Account Event Advices',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENTUDFCHAR',
'Includes Account Event UDF char details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENTUDFDATE',
'Includes Account Event UDF date details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENTUDFNUM',
'Includes Account Event User Defined Number details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTEVENTUSERDEF',
'Includes Account Event User Def details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTINGENTRIES',
'Includes Accounting Entries details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTING_DATE',
'Indicates Accounting Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_EMIFREQUNIT',
'Indicates EMI Frequency Unit' || chr(10) || '	Q - Quarterly' || chr(10) || '	M - Monthly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_FREQ',
'Indicates Frequency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_FREQUNIT',
'Indicates Unit' || chr(10) || '	D - Daily' || chr(10) || '	M - Monthly' || chr(10) || '	W - Weekly' || chr(10) || '	Y - Yearly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	B - Bullet',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_LEASEPAYMENTTYPE',
'Indicates Lease Payment Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_LEASETYPE',
'Indicates Lease Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_LIQDMODE',
'Indicates Liquidation Mode' || chr(10) || '	A - Auto' || chr(10) || '	M - Manual' || chr(10) || '	C - Component' || chr(10) || '	C - Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_LIQDMODE1',
'Indicates Auto Liquidation' || chr(10) || '	A - on' || chr(10) || '	M - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_RESIDUALVALBASIS',
'Indicates Residual Value Basis',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_SECRSTATUS',
'Indicates Securitization status' || chr(10) || '	M - Marked for securitization' || chr(10) || '	S - Securitized' || chr(10) || '	E - Error',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_TXNSTAT',
'Indicates Status' || chr(10) || '	A - Active' || chr(10) || '	L - Liquidated' || chr(10) || '	V - Reversed' || chr(10) || '	H - Hold' || chr(10) || '	I - Inactive' || chr(10) || '	Y - Uninitiated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_TXNSTAT1',
'Indicates Status' || chr(10) || '	A - Active' || chr(10) || '	L - Liquidated' || chr(10) || '	V - Reversed' || chr(10) || '	H - Hold' || chr(10) || '	I - Inactive' || chr(10) || '	Y - Uninitiated' || chr(10) || '	C - Closed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTMASTER_TXNSTAT2',
'Indicates Status' || chr(10) || '	A - Active' || chr(10) || '	L - Liquidated' || chr(10) || '	V - Reversed' || chr(10) || '	H - Hold' || chr(10) || '	I - Inactive' || chr(10) || '	Y - Uninitiated' || chr(10) || '	E - EMI',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTNUMBER',
'Indicates Account Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTSTAT',
'Indicates Account Status' || chr(10) || '	N - New' || chr(10) || '	Y - Existing',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTSTAT1',
'Indicates Account Status Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTSTAT_EXPAMT',
'Indicates the Expected Amount.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNTSUMMARY_CONTSTATS',
'Indicates Account Status' || chr(10) || '	A - Authorized' || chr(10) || '	U - Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_CLASS_DESC',
'Indicates Account Class Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_EMI_CHG',
'Indicates EMI Change details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_GL',
'Indicates Accounting GL.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_MASTER_DETAILS_PK_RES',
'It indicates Save Inactive Account PK Response master details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_MASTER_DETAILS_RES',
'It indicates Save Inactive Account full Response master details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_NO',
'Indicates Account No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_NUMBER',
'This specifies the Account number. Account number has to be unique for a given branch code in FLEXCUBE UBS.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_OPENING_CHARGES',
'Indicates Account Opening Charges',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCOUNT_TYPE',
'Indicates Account Type' || chr(10) || '	N - Single' || chr(10) || '	Y - Joint',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCPRDRES',
'This node indicates the Account level Product restrictions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCPRDRES_CRTXN',
'Indicates Credit' || chr(10) || '	Y - On' || chr(10) || '	N - Off' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCPRDRES_DRTTXN',
'Indicates Debit' || chr(10) || '	Y - On' || chr(10) || '	N - Off' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRAMT',
'Indicates Accrual Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDAY',
'Indicates Accrual Day',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENBASS',
'Indicates Denominator Basis' || chr(10) || '	A - Per Annum' || chr(10) || '	C - Per Coupon Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENBASS1',
'Indicates Denominator Basis' || chr(10) || '' || chr(10) || 'PER ANNUM  : A' || chr(10) || 'PER COUPON PERIOD : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENMETH',
'Indicates Denominator Method' || chr(10) || '	360 - 360' || chr(10) || '	365 - 365' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	364 - 364',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENOMBASIS',
'Indicates Accrual Denom. Basis' || chr(10) || '	C - Per Period' || chr(10) || '	A - Per Annum',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENOMBASIS1',
'Indicates the Accrual Denominator Basis.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENOMBSIS',
'Indicates Accrual Denominator Basis' || chr(10) || '	C - Per Period' || chr(10) || '	A - Per Annum',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENOMMETHOD',
'Indicates Accrual Denom. Method' || chr(10) || '	360 - 360' || chr(10) || '	365 - 365' || chr(10) || '	ACTUAL - Actual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDENOMMTHD',
'Indicates Accrual Denominator Method' || chr(10) || '	360 - 360' || chr(10) || '	365 - 365' || chr(10) || '	ACTUAL - Actual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDISCFLG',
'Indicates Accrue Discount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRDISCMETH',
'Indicates Accrue Discount Method' || chr(10) || '	S - Straight Line' || chr(10) || '	E - Exponential' || chr(10) || '	Y - Constant Yield',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRENTHOLS',
'Indicates Accrual Entries On Holidays' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCREQD',
'Indicates Accrual Required' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCREVALSETUP_LOSSGLDESC',
'Indicates Loss GL Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCREVALSETUP_NETIND',
'Indicates Netting Indicator' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCREVALSETUP_PROFITGLDESC',
'Indicates Profit GL Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRFLG',
'Indicates Accruals Required (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRFREQ',
'Indicates Frequency' || chr(10) || '	D - Daily' || chr(10) || '	M - Monthly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Q - Quarterly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRINCLDDT',
'Indicates Accrual Include To Date' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRINCLTODT',
'Indicates Include To Date' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRINCLUDETODATE',
'Indicates Accrual Include To Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRLVL',
'Indicates Accrual Level' || chr(10) || '	P - Portfolio' || chr(10) || '	H - Holding',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRMNTH',
'Indicates Cycle' || chr(10) || '	0 - None' || chr(10) || '	1 - January' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRNUMERMETHOD',
'Indicates Accrual Numerical Method' || chr(10) || '	30-EURO - 30(Euro)' || chr(10) || '	30-US - 30(US)' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	30-ISDA -' || chr(10) || '	30-PSA - 30-PSA' || chr(10) || '	ACTUAL-JAPANESE - Actual-Japanese',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRNUMERMTHD',
'Indicates Accrual Numerator Method' || chr(10) || '	30-EURO - 30-Euro' || chr(10) || '	30-US - 30-US' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	30-ISDA - 30-ISDA' || chr(10) || '	30-PSA - 30-PSA' || chr(10) || '	ACTUAL-JAPANESE - Actual-Japanese',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRNUMMETH',
'Indicates Numerator Method' || chr(10) || '	30-EURO - 30 Euro' || chr(10) || '	30-US - 30-US' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	30-ISDA - 30-ISDA' || chr(10) || '	30-PSA - 30-PSA' || chr(10) || '	ACTUAL-JAPANESE - Actual-Japanese',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCROL',
'Indicates Account Role',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCROLE',
'Accounting Role',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCROLEDESC',
'Indicates Accounting Role Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRPRDLVL',
'Indicates Accrual Entries Level' || chr(10) || '	C - Contract' || chr(10) || '	P - Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRPRINC',
'Indicates Principal Accrual' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRPRMFLG',
'Indicates Accrue Premium' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRPRMMETH',
'Indicates Accrue Premium Method' || chr(10) || '	S - Straight Line' || chr(10) || '	E - Exponential' || chr(10) || '	Y - Constant Yield',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRPRODLVL',
'Indicates Product Level' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRRDMPRMFLG',
'Indicates Accrue Redemption Flag' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRREQ',
'Indicates Accrual Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRREQD',
'Indicates Accrual Required' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRTBDWTFLG',
'Indicates Accrue Withholding Tax For T Bill Disc' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFEEDETAILS_ACCRFREQ',
'Indicates Frequency' || chr(10) || '	D - Daily' || chr(10) || '	M - Monthly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFEEDETAILS_BASISAMT',
'Indicates Basis Amount' || chr(10) || '	O - Expected Out Fact' || chr(10) || '	E - Expected Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFEEDETAILS_DISCACCRAPP',
'Indicates Consider as Discount' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFREQ',
'Indicates Frequency' || chr(10) || '	D - Daily' || chr(10) || '	M - Monthly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFREQ1',
'Indicates the Accrual Frequency.D -Daily,M -Monthly,Q -Quarterly,H -Half Yearly,A -Annual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALFREQRPR',
'Indicates the Accrual Frequency.D - Daily, M - Monthly, Q - Quarterly, H - Half Yearly,A - Annually',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALMETHDPR',
'Indicates the Accrual Method.' || chr(10) || 'A - 30(Euro)/360, B - 30(US)/360, C - Actual/360, D - 30(Euro)/365, E - 30(US)/365, F - Actual/365, G - 30(Euro)/Actual, H - 30(US)/Actual,I - Actual/Actual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUALSTRTMONTH',
'Indicates Start Month' || chr(10) || '	JAN - January' || chr(10) || '	FEB - February' || chr(10) || '	MAR - March' || chr(10) || '	APR - April' || chr(10) || '	MAY - May' || chr(10) || '	JUN - June' || chr(10) || '	JUL - July' || chr(10) || '	AUG - August' || chr(10) || '	SEP - September' || chr(10) || '	OCT - October' || chr(10) || '	NOV - November' || chr(10) || '	DEC - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEDISC',
'Indicates the Accrue Discount.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEDISCMETH',
'Indicates the Accrue Discount.S - Straight Line, E - Exponential, Y - Constant Yield',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEDISCTBILL',
'Indicates Accrue Discount for T Bill' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEDISCTBILL1',
'Indicates the Accrue Discount for T-BILL.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEHOLDTAXTBILLDISC',
'Indicates Accrue Withholding Tax For T Bill Discount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEHOLDTAXTBILLDISC1',
'Indicates the Accrue Withholding Tax For T-BILL Discount.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEPREMIUM',
'Indicates the Accrue  Premium. Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEPREMMETH',
'Indicates the Accrue  Premium.S - Straight Line, E - Exponential, Y - Constant Yield',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEREDMPREM',
'Indicates the Accrue Redemption Premium.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEWITHHOLDTAXCOU',
'Indicates whether Withholding Tax on Coupon should be Accrued',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEWITHHOLDTAXCOUP',
'Indicates Accrue Withholding Tax for Coupons' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUEWITHHOLDTAXCOUP1',
'Indicates the Accrue Withholding Tax for Coupons.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUE_DISCOUNT_FLAG',
'Indicates Accrue Discount' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUE_PREMIUM_FLAG',
'Indicates Accrue Premium' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRUE_REDMPREM_FLAG',
'Indicates Accrue Redemption Premium' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCRWTHLDTXFLG',
'Indicates Accrue Withholding Tax For Coupons' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCR_CR',
'This field refers to credit interest accrued.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCR_DCOUNT_DENOMINATOR_BASIS',
'Indicates Denominator Basis' || chr(10) || '	A - Per Annum' || chr(10) || '	C - Per Coupon',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCR_DCOUNT_NUMERATOR_METHOD',
'Indicates Numerator Method' || chr(10) || '	30-EURO - 30-EURO' || chr(10) || '	30-US - 30-US' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	30-ISDA - 30-ISDA' || chr(10) || '	30-PSA - 30-PSA' || chr(10) || '	ACTUAL-JAPANESE - Actual-Japanese',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCR_DR',
'This field refers to debit interest accrued.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCR_REQ',
'Indicates Accruals Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSCHCMP_IRRAPPL',
'Indicates Internal Rate of Return Applicable',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSCHCMP_SCHFLG',
'Indicates Schedule Flag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSIGDETAILS',
'This Node indicates the Signature Details for the customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTATRETENTDAYS',
'Indicates Account Statement Retention Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTATS',
'Account Statistics',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTATUSTYPE1',
'Indicates Account Status Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTDATE',
'Indicates Account Start Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTMNTCYCL',
'Indicates Cycle' || chr(10) || '	S - Semi Annual' || chr(10) || '	Q - Quarterly' || chr(10) || '	M - Monthly' || chr(10) || '	F - Fortnightly' || chr(10) || '	W - Weekly' || chr(10) || '	D - Daily' || chr(10) || '	A - Annual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTMTTYP3',
'Indicates Type' || chr(10) || '	N - None' || chr(10) || '	S - Summary' || chr(10) || '	D - Detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTSHCHARGES_CHARGECOMPNAME',
'Indicates the Charge Component Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTSHCHARGES_CLGPRODCODE',
'Indicates Clearing Product Category.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCSTSHCHARGES_RECORDROWID',
'Indicates Record RowID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTINGASOF',
'Indicates Accounting As Of' || chr(10) || '	D - Debit Value Date' || chr(10) || '	M - Message Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTITLE1',
'Indicates Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTITLE11',
'Indicates the first line of Account title',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTITLE2',
'Indicates the second line of Account title',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTXNRES',
'This Node Indicates the Customer Account level Transaction Code restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTYP',
'Indicates Account Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCTYPE',
'Indicates Account Type' || chr(10) || '	N - Nostro' || chr(10) || '	D - Misc Dr' || chr(10) || '	C - Misc Cr' || chr(10) || '	S - Savings' || chr(10) || '	U - Current' || chr(10) || '	Y - Deposit' || chr(10) || '	L - Line Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCVAL',
'Indicates Account Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCVALDATE',
'Indicates Accounting Value Date' || chr(10) || '	I - Ignore' || chr(10) || '	F - Forward' || chr(10) || '	B - Backward',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCVALDATE1',
'Indicates Accounting Value Date' || chr(10) || '' || chr(10) || 'Ignore  : I' || chr(10) || 'Forward : F' || chr(10) || 'Backward : B',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCVDTMVACRSMNTHS',
'Indicates Accounting Value Date' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCWITHINST1',
'Indicates Account with Institution 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCWITHINST2',
'Indicates Account with Institution 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCWITHINST3',
'Indicates Account with Institution 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCWITHINST4',
'Indicates Account with Institution 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACCWITHINST5',
'Indicates Account with Institution 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_BAL',
'Account Balance Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_BRANCH',
'Indicates Account Branch Code.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_BRN',
'Indicates Account Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_CCY_AMT',
'Indicates Account Currency Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_CCY_CODE',
'Indicates Account Currency Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_CLASS_RES',
'Acc Class Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_CURRENCY',
'Indicates Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_DEL_RES_PK',
'Indicates the primary details for account delete response.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_DESC',
'Indicates Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_EVENT_USERDEF',
'Mortgages Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST1',
'The Account With Institution 1 may be a branch or affiliate of the Receiver, or of the Intermediary, or of the Beneficiary Institution, or an entirely different financial institution.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST2',
'The Account With Institution 2 may be a branch or affiliate of the Receiver, or of the Intermediary, or of the Beneficiary Institution, or an entirely different financial institution.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST3',
'The Account With Institution 3 may be a branch or affiliate of the Receiver, or of the Intermediary, or of the Beneficiary Institution, or an entirely different financial institution.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST4',
'The Account With Institution 4 may be a branch or affiliate of the Receiver, or of the Intermediary, or of the Beneficiary Institution, or an entirely different financial institution.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST5',
'The Account With Institution 5 may be a branch or affiliate of the Receiver, or of the Intermediary, or of the Beneficiary Institution, or an entirely different financial institution.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_INST6',
'Country to which the AWI belongs',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_NO',
'Indicates Parent Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_OPENING_AMT',
'Indicates Account Opening Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_STCH_CHARGES',
'Mortgages Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_STSH_CHARGES',
'Account Status Change Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_WITH_INSTN1',
'Indicates Field 1 of Account with Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_WITH_INSTN2',
'Indicates Field2 of Account with Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_WITH_INSTN3',
'Indicates Field 3 of Account with Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_WITH_INSTN4',
'Indicates Field4 of Account with Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACC_WITH_INSTN5',
'Indicates Field 5 of Account with Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACDEMED',
'Indicates the Accrual Denominator method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACDESCR',
'Indicates In Leg Currency Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACDNTDENMETBS',
'Indicates Denominator Basis' || chr(10) || 'PER ANNUM : A' || chr(10) || 'PER COUPON : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACFORREALISATION',
'Indicates Credit Account for Realization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACGL_NO',
'Indicates General Ledger Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACINST',
'Indicates Account Opening Installment Calculation Type' || chr(10) || '	S - Single Installment' || chr(10) || '	M - Multiple Installment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACKDESCRIPTION',
'It indicates the The answer of the delivery notification. Free Text.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACKFILE',
'ACK file',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACKNDT',
'Indicates Acknowledgement Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACKNREC',
'Indicates Acknowledgement Received' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACKNREVCD',
'Indicates Acknowledgement Received' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACK_STAT_US',
'Indicates Acknowledgement Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACMASK',
'Indicates Account Mask',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACMP_WDRW',
'Indicates Accompany Withdraw' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACNO',
'Indicates Account Number of Split Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACNTMASTER',
'Includes Account Master details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACNUMED',
'Indicates Numerator Method' || chr(10) || '	30-EURO - 30-Euro' || chr(10) || '	30-US - 30-US' || chr(10) || '	ACTUAL - Actual' || chr(10) || '	30-ISDA - 30-ISDA' || chr(10) || '	30-PSA - 30-PSA' || chr(10) || '	ACTUAL-JAPANESE - Actual-Japanese',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACNUMED1',
'Indicates the Accrual Numerator method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACNUMEDTYPE',
'Indicates Numerator Method.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACOPDATE',
'Indicates A/c Open Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACORGL',
'Indicates Account Or GL' || chr(10) || '	G - General Ledger' || chr(10) || '	A - Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACORGL_NO',
'Indicates Account/GL Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPCOMCOLTYPE',
'Indicates Acceptance Components To Be Collected In' || chr(10) || '	A - Advance' || chr(10) || '	R - Arrears',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPINTCOMP',
'Indicates Interest Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPPRTCOMP',
'Indicates Profit Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPTOADVFLAG',
'Indicates Acceptance To Advance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPTOADVFLG',
'Indicates Auto Change of Operation Acceptance to Advance' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPTODISFALG',
'Indicates Acceptance To Discount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACPTOFORFAITFLAG',
'Indicates Acceptance To Forfaiting' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQDT',
'Indicates Acquisition Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQRCCY',
'Indicates Accrual Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQRLVL',
'Indicates Accrual Level' || chr(10) || '	P - Product' || chr(10) || '	C - Contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQTYP',
'Indicates Acquisition Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQTYPE',
'Indicates Acquisition Type' || chr(10) || '	R - Par' || chr(10) || '	D - Par/Discount' || chr(10) || '	P - Par/Premium' || chr(10) || '	A - Par/Discount/Premium',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQUIRDAMT',
'Indicates Acquired Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQUIRER_DETAILS',
'Acquirer Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQ_BINN',
'Indicates Acquirer BIN',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACQ_DESC',
'Indicates Acquirer Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACRDAMT',
'Indicates Accrued Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACREQ',
'Indicates the Accrual Required',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACRFREQ',
'Indicates Frequency' || chr(10) || '	B - Bullet' || chr(10) || '	D - Daily' || chr(10) || '	W - Weekly' || chr(10) || '	M - Monthly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Q - Quarterly' || chr(10) || '	Y - Yearly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACRREQRD',
'Indicates Accrual Required' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSALWDFLG',
'Indicates Allowed' || chr(10) || '	N - Disallowed' || chr(10) || '	Y - Allowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATCHGAUTO',
'Indicates Account Status Status Change Automatic' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATDEPOST',
'Indicates Account Status Posting Allowed' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATDEPST',
'Indicates Posting Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATDORMANT',
'Indicates Status Dormant' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATFROZEN',
'Indicates Frozen' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATFROZEN1',
'Indicates Account Status Frozen' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNOCR',
'Indicates No Credits' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNOCR1',
'This specifies whether to stop all the credits to the customer account.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNOCR2',
'Indicates Account Status No Credit' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNODR',
'Indicates No Debits' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNODR1',
'This specifies whether to stop all the debits to the customer account.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATNODR2',
'Indicates Account Status No Debit' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATSTPAY',
'Indicates Stop Payments',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATSTPAY1',
'This specifies whether payments to the customer account to be stopped.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTATUSLINES',
'This Node defines the Status wise Reporting GL lines for the Customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTCLS',
'Indicates Account Set for Closing' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTFORMT',
'Indicates Account Statement Format',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTCYCLE',
'This species the periodicity of account statement generation.' || chr(10) || 'A - Annual' || chr(10) || 'S - Semi-Annual' || chr(10) || 'Q - Quarterly' || chr(10) || 'M - Monthly' || chr(10) || 'F - Fortnightly' || chr(10) || 'W - Weekly' || chr(10) || 'D - Daily',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTCYCLE2',
'This species the periodicity for the second account statement generation.' || chr(10) || 'A - Annual' || chr(10) || 'S - Semi-Annual' || chr(10) || 'Q - Quarterly' || chr(10) || 'M - Monthly' || chr(10) || 'F - Fortnightly' || chr(10) || 'W - Weekly' || chr(10) || 'D - Daily',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTCYCLE3',
'Indicates Cycle' || chr(10) || '	A - Annual' || chr(10) || '	S - Semiannual' || chr(10) || '	Q - Quarterly' || chr(10) || '	M - Monthly' || chr(10) || '	F - Fortnightly' || chr(10) || '	W - Weekly' || chr(10) || '	D - Daily',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTCYCLE31',
'This specifies the periodicity for the third account statement generation.' || chr(10) || 'A - Annual' || chr(10) || 'S - Semi-Annual' || chr(10) || 'Q - Quarterly' || chr(10) || 'M - Monthly' || chr(10) || 'F - Fortnightly' || chr(10) || 'W - Weekly' || chr(10) || 'D - Daily',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTDAY',
'This specifies the statement generation' || chr(10) || '- month for Annual, Semi-Annual, Quarterly' || chr(10) || '- date for monthly' || chr(10) || '- day for fortnightly, weekly.' || chr(10) || 'This field should be left blank if the statement generation cycle is daily.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTDAY2',
'This specifies the second account statement generation' || chr(10) || '- month for Annual, Semi-Annual, Quarterly' || chr(10) || '- date for monthly' || chr(10) || '- day for fortnightly, weekly.' || chr(10) || 'This field should be left blank if the statement generation cycle is daily.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTDAY3',
'This specifies the third account statement generation' || chr(10) || '- month for Annual, Semi-Annual, Quarterly' || chr(10) || '- date for monthly' || chr(10) || '- day for fortnightly, weekly.' || chr(10) || 'This field should be left blank if the statement generation cycle is daily.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTDY',
'Indicates Account Statement Day (On)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTREQD',
'Indicates account Statement Required' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTTYP',
'Indicates Account Statement Type' || chr(10) || '' || chr(10) || 'None  : N' || chr(10) || 'Summary : S' || chr(10) || 'Detail  : D',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTTYPE',
'This specifies whether a detailed or summary account statement is required for the customer account.' || chr(10) || 'D - Detailed' || chr(10) || 'S - Summary' || chr(10) || 'N - None',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTTYPE2',
'This specifies whether second account statement in detailed or summary format is required for the customer account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACSTMTTYPE3',
'This specifies whether third account statement in detailed or summary format is required for the customer account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTAF',
'Indicates Actual After',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTAMT',
'Indicates Account Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTAMT1',
'It indicates Amount in the account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTAMT2',
'Indicates the total amount that will be credited / debited  from account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTCODAMT',
'Indicates Action Code' || chr(10) || '	F - Full Pending' || chr(10) || '	P - Partial Executing' || chr(10) || '	I - Ignore' || chr(10) || '	W - Waiting' || chr(10) || '	E - Force',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTCODAMT1',
'Action Code for Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTINDT',
'Indicates Action Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION',
'Indicates Action',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION1',
'It indicates the Proposed corrective action.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION2',
'This is the action on the function being invoked. For integration scenarios this need not be sent. This is used by FLEXCUBE native user interface.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_CODE',
'Indicates Action Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_CODE_AMT',
'Indicates Action Code On Amount' || chr(10) || '	E - Force' || chr(10) || '	I - Ignore' || chr(10) || '	F - Full Pending' || chr(10) || '	W - Wait' || chr(10) || '	P - Partial Executing',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_COMP',
'Indicates Action Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_FLAG',
'Indicates Action' || chr(10) || '	E - Rollover' || chr(10) || '	R - Redemption',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_FLG',
'Indicates Action Flag' || chr(10) || '	E - Rollover' || chr(10) || '	R - Redemption',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTION_REF_NO',
'Indicates Action Ref. no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVATION_DT',
'Indicates Activation Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVATION_KEY',
'Indicates Activation Key',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVE',
'Indicates Active' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVEROLLOVER',
'Indicates Active Rollover type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVEROLLOVERFSRESPONSE',
'Indicates Active Rollover-FS Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVEROLLOVERIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to Active Rollover Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTIVEROLLOVERPK',
'Indicates Active Rollover-PK type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTM_IB_SETUP_FULL',
'This gives the Inter Branch Parameter Full response',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTM_IB_SETUP_IO',
'This gives the Inter Branch Parameter PK type request',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTNCDAMT',
'Indicates Action Code Amount' || chr(10) || '	F - Full Pending' || chr(10) || '	P - Partial Liquidation' || chr(10) || '	I - Ignore' || chr(10) || '	W - Wait Further Instructions' || chr(10) || '	E - Force',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTNCDAMT1',
'Indicates Action Code For Amendment.' || chr(10) || 'Force "E"' || chr(10) || 'Full Pending "F"' || chr(10) || 'Ignore "I"' || chr(10) || 'Partial Execution "P"' || chr(10) || 'Wait "W".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTSTATUS',
'Indicates Actual Status.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTSTATUSUNAPP',
'Indicates Active Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL',
'Indicates Actual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUALAMT',
'Indicates Actual Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUALDSTLDT',
'Indicates Actual DSTL Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL_BEFORE',
'Indicates Actual Before',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL_DATE',
'Indicates Actual Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL_FIXED_DATE',
'Indicates Actual Fixed date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL_SUBMISSION_DATE',
'Indicates Actual Date of Submission',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTUAL_SUBMISSION_DATE1',
'Actual submission date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACTVCERT',
'Indicates Active Certificates',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACUMEN_TRN_CODE',
'Indicates Acumen Transaction Code' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACVWACDAUDTR_EVENT',
'Indicates Action' || chr(10) || '	DEBK - Booking' || chr(10) || '	ILIQ - Liquidation' || chr(10) || '	IACR - Accrual' || chr(10) || '	IMAT - Rollover' || chr(10) || '	INIT - Redemption' || chr(10) || '	RDLQ - RD Payment' || chr(10) || '	REVR - RD Payment Reversal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYACCRCRIC',
'Indicates Accrued Interest Credit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYACCRDRIC',
'Indicates Accrued Interest Debit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYAVLBAL',
'Indicates Available Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYCURRBAL',
'Indicates Current Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYLCYRATE',
'Indicates Charge amount exchange rate for account currency to Local Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYLCYRATE1',
'Indicates account currency to local currenct exchange rate.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYTOTCHGAMT',
'Indicates Account Currency Total Charge Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYUNCOLL',
'Indicates Uncollected Funds',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACYUNCOLLECTED',
'Indicates ACY Uncollected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_ACCRUED_CR_IA',
'Indicates Accrued Profit (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_ACCRUED_CR_IC',
'Indicates Accrued Interest (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_ACCRUED_DR_IA',
'Indicates Accrued Profit (Dr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_ACCRUED_DR_IC',
'Indicates Accrued Interest (Dr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_AVL_BAL',
'Indicates Available',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_BKD_AMT',
'Indicates Blocked Amount in A/C Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_BLOCKED_AMOUNT',
'Indicates Blocked',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_BLOCKED_AMOUNT1',
'Indicates Blocked Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_CURR_BALANCE',
'Indicates Current (ACY)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_CURR_BALANCE1',
'Current Balance(ACY)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_MTD_TOVER_CR',
'Indicates Cr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_MTD_TOVER_CR1',
'Account Currency Method Turn Over Credit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_MTD_TOVER_DR',
'Indicates Dr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_MTD_TOVER_DR1',
'Account Currency Method Turn Over Debit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_OPENING_BAL',
'Indicates Opening',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_OPENING_BAL1',
'Account Opening balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_CR',
'Indicates Credit (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_CR1',
'Account Currency Tank Credit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_CR2',
'This field indicates the total tanked Credit Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_DR',
'Indicates Debit (Dr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_DR1',
'Account Currency Tank Debit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_DR2',
'This field indicates the total tanked Debit Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_UNCOL',
'This field indicates the Total uncollected tanked amount in Account currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_UNCOLLECTED',
'Indicates Uncollected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TANK_UNCOLLECTED1',
'Account Currency Tank Uncollected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TODAY_TOVER_CR',
'Indicates Daily Turnover (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_TODAY_TOVER_DR',
'Indicates Daily Turnover (Dr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_CR',
'Indicates  Unauthorized Credit Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_DR',
'Indicates  Unauthorized debit Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_CR',
'Indicates Unauthorized Tanked (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_CR1',
'This field indicates the total Unauthorized tanked Credit Amount in Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_DR',
'Indicates Unauthorized Tanked (Dr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_DR1',
'This field indicates the total Unauthorized tanked Debit Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_UNCOL',
'This field indicates the Total uncollected unauthorized tanked amount in Account currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_TANK_UNCOLLECTED',
'Indicates Unauthorized Tanked Uncollected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_UNCOL',
'Indicate Unauthorized Uncollected Amount in Account Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ACY_UNAUTH_UNCOLLECTED',
'Indicates Uncollected (Cr)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_CCY',
'Indicates Ac Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_CLASS',
'Account Class',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_CURR_BAL',
'Indicates Account Current Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_DESC',
'Indicates Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_ENTRY_REF_NO',
'Indicates Account Entry Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_ENTRY_SR_NO',
'Indicates Entry Serial Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_LCL_FMT',
'Indicates Account Local Clearing Format',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_OPEN_DATE',
'Indicates Account Open Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_REDIRECT',
'Indicates Account Redirect',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AC_STMT_REQUIRED',
'Indicates Statement Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADB_MEMBER',
'Indicates ADB Member' || chr(10) || '	N - No' || chr(10) || '	Y - Yes' || chr(10) || '	X - Not Applicable',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDAMTCOVERD',
'Indicates Additional Amounts Covered',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDHOLDMAIL',
'If this option is checked, then all the mail advice generated for this customer and location would have the hold mail text displayed on top of the message. As a consequence, these mail advices would not be dispatched to the customer unless required.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDID',
'Indicates Additional Identifier',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDINFO4',
'Indicates Additional information-4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDINFOSORBNET',
'Indicates Additional Information',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDITIONAL_INFORMATION',
'Includes Additional Information details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDITIONAL_REMIT_INFO',
'Indicates Additional Remittance Info',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL',
'This node is to be used for Additional information about a message.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDLINE4',
'Indicates Address4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDLN5',
'Indicates Address Line 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL_HOLDER_DOB',
'Indicates Additional Holder Date Of Birth',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL_HOLDER_ID_TYPE',
'Indicates Additional Holder ID Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL_HOLDER_RELATION',
'Indicates Additional Holder Relation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL_PARAM',
'This is the parent node for each parameter in the additional node.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDL_TEXT',
'Indicates Additional Text',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDNL1',
'Indicates Additional Information 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDNL2',
'Indicates Additional Information 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDNL3',
'Indicates Additional Information 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDR',
'Indicates Address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDR1',
'Indicates Customer Address Line 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDR2',
'Indicates Customer Address Line 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDR3',
'Indicates Customer Address Line 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDR4',
'Indicates Customer Address Line 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLINE1',
'Indicates Address Line 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLINE2',
'Indicates Address Line 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLINE3',
'Indicates Address Line 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLINE4',
'Indicates Address Line 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLN1',
'Indicates the first line of the address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLN2',
'Indicates the second line of the address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLN3',
'Indicates the third line of the address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRLN4',
'Indicates the fourth line of the address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRS5',
'Indicates Address 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDRS6',
'Indicates Address 6',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDTYPE',
'Indicates Address Type' || chr(10) || '	C - Correspondence Address' || chr(10) || '	R - Registration',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADDUSRREQ',
'Indicates Additional User Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADD_HOLDER_IDNO',
'Indicates Additional Holder ID Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADD_INSTR',
'Indicates Additional Instruction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADD_RECALL_INFORMATION',
'Indicates Additional Recall Information',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADESC',
'Indicates Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHERE',
'Indicates The Adhere to month end',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHERETOMNTHEND',
'Indicates Adhere To Month End' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCAUTHFULL',
'Includes full details about ahoc authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCAUTHIO',
'Includes information about adhoc authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCAUTHPK',
'Includes primary details about ahoc authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCDETAILS',
'Include adhoc details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCDETAILSIO',
'Include adhoc  IO type  details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCDETAILSLOG',
'Includes Adhoc details Log',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCDETAILSPK',
'Include adhoc PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCFEESCHEDULES',
'Includes Adhoc Fee Schedules details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCHOL',
'Indicates Adhoc Holiday Change' || chr(10) || '	C - Change Maturity Date And Generate Advice' || chr(10) || '	A - Generate Advice' || chr(10) || '	N - No Action',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCHOLTRREQ',
'Indicates Ad hoc Treatment Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCSCHEDULES',
'Includes Adhoc Schedules',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCSTMTREQTYPE',
'Indicates Ad-hoc Statement Request Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADHOCSTMTRESTYPE',
'Indicates Ad-hoc Statement Response Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJAMT',
'Indicates Adjustment Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJAMT1',
'Indictcates amount adjusted',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJANOUNT',
'Indicates Adjustment Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJCODE',
'Indicates Adjustment Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJCODETYPE',
'Indicates Adjustment Type' || chr(10) || '	P - Positive' || chr(10) || '	N - Negative',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJDEALPRC',
'Indicates Adjusted Price',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJDETAILS',
'Adjustment Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJDUE',
'Indicates Adjustment Amount Due.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJGL',
'Indicates Income/Expense GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJINC',
'Indicates Adjusted Income',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJSETTL',
'Indicates Adjustment Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJSTGL',
'Indicates Adjustment GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJSTKNO',
'Indicates Adjustment Stock Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJSTSIGN',
'Indicates Type' || chr(10) || '	1 - Increase' || chr(10) || '	-1 - Decrease',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJTYPE',
'Indicates Adjustment Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJUSTMENTSTOCK',
'Adjust Inventory Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJ_AMOUNT',
'Indicates Adjusted Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADJ_SETTLED',
'Indicates Adjusted Settled Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMID',
'Indicates Administrator',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMINCHGAMT',
'Indicates Admin Charge Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMINCHGPERCT',
'Indicates Admin Charge %',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMINCHGTYPE',
'Indicates Admin Charge Type' || chr(10) || '	A - Fixed' || chr(10) || '	P - Percentage',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMINID',
'Indicates Primary Administrator Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADMINNAME',
'Indicates Primary Administrator Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADRESSEE',
'Indicates Addressee',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADTN',
'Indicates Additional',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVABYFINA',
'Indicates Advance by Finance' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVABYFINANCE',
'Indicates Collateral funding by Finance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVABYLOAN',
'Indicates Collateral Funding By Loan' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVAMT',
'Indicates Advance Amount.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVANCE',
'Indicates Advance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVANCE1',
'Indicates Advance of Account Statistics',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVANCEBYLOAN',
'Indicates Advance By Loan' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVANCELIQD',
'Indicates Advance Liquidated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVA_BY_LOAN',
'Indicates Advance by Loan' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVBYFIN1',
'Indicates Advance By Finance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVCDAYS',
'Indicates Advice Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVCHRG',
'Indicates Advice Charge' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVDET',
'Advice Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVDETAILS1TYPE',
'Includes the Advice Type details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVDETAILSTYPE',
'Indicates Advice Subsystem Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVERSTYLVL',
'Indicates Adversity Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVFTACCP',
'Advice of Fate Acceptance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVFTMED',
'Indicates Advice Medium',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVFTRECPART',
'Indicates Receiver of Advice',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVFTREQDFLG',
'Indicates Advice Required' || chr(10) || '	N - Not Required' || chr(10) || '	Y - Required' || chr(10) || '	R - Till Resolved',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICE',
'Indicates Advice',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICECOUNT',
'Indicates No of Times Advice To Be Sent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEDETAILSTYPE',
'Indicates Advice details type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEDETAILS_CHGREQD',
'Indicates Charges' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEDETAILS_PRIORITY',
'Indicates Priority' || chr(10) || '	1 - Normal' || chr(10) || '	2 - Medium' || chr(10) || '	3 - High',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEDETAILS_PRIORITY1',
'Indicates Priority' || chr(10) || '	2 - Medium' || chr(10) || '	3 - High' || chr(10) || '	1 - Low',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEDETAILS_SUPRESS',
'Indicates Suppress' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICEGENRTD',
'Indicates Advice Generated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICES',
'Advice',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICES_DESC',
'Indicates Advice Name Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICES_DETAILS',
'Advices Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICES_PRIORITY',
'Indicates Priority' || chr(10) || '	1 - High' || chr(10) || '	2 - Medium' || chr(10) || '	3 - Low',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVICE_DETAILS',
'Includes Advice Master details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVINTREQD',
'Indicates Advance Interest' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVINTREQD1',
'Indicates Advance Profit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVPAYAMT',
'Indicates Advance Payment Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVPAYDT',
'Indicates Advance Payment Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVREIMCLM',
'Indicates Advice On Receiving Claim Before Reimbursement Auth' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADVSUPPRESS',
'Indicates Advices Suppress details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADV_CODE',
'Indicates Advice Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADV_DESC',
'Indicates Advice Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADV_INS_PAY',
'Indicates Advance Installment Payment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADV_PMNT',
'Advance Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADV_SUPRESS',
'Indicates Suppress',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADYTDDEPRBK',
'Indicates YTD Depreciation (Book)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ADYTDDEPRTX',
'Indicates YTD Depreciation (Tax)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGENCY',
'Indicates Agency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGENCYCD',
'Indicates Agency Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGENTBRN',
'Indicates Agent Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGENTNAME',
'Indicates Agent Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGENTSALESNAME',
'Indicates Agent Sales Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGMTID',
'Indicates Agreement ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGMTID1',
'indicates Agreement Identification.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGMT_CAN_CHG',
'Indicates Agreement Cancellation Charge' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGMT_ID',
'Indicates Agreement Identification' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGNCYNAME',
'Indicates Agency Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREDATE',
'Indicates Agreement Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREEIDREQD',
'Indicates Agreement Id Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREEMENT_ID',
'Indicates Agreemnet Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREEMENT_ID_REQD',
'Indicates Agreement Id' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREEMENT_STATUS',
'Indicates Agreement Status' || chr(10) || '	ACTIVE - Active' || chr(10) || '	USED - Used' || chr(10) || '	AUTO CANCELLED - Auto Cancelled' || chr(10) || '	FINAL - Final' || chr(10) || '	CUSTOMER CANCELLED - Customer Cancelled' || chr(10) || '	EXPIRED - Expired' || chr(10) || '	AMENDED - Amended',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREEMNTDET',
'Indicates Agreement Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREETERMS',
'Indicates Agreement Terms',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AGREMNTID',
'Indicates Agreement Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AINCGAI',
'Indicates Amortize Inception Gain' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AINCLOS',
'Indicates Amortize Inception Loss' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALERTS_ON_HOME',
'Indicates Alerts on Home' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALGID',
'Indicates Algorithm Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALIMTRK',
'Indicates Notional Limit Tracking' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALIQDSUSP_RES',
'Indicates MO Save ALiqdSusp Response type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALIQREVPMT',
'Indicates Reset Retry Count for Reversed Auto Liquidation' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALIQ_REVERSED_PMT',
'Indicates Auto Liqd Reversed Payment.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLASYNCREV',
'Indicates Allow Asynchronous Revision' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLASYNCREV1',
'Indicates Allow Asynchronous Revision' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWBACKPERIODENTRY',
'Indicates Allow Back Period Entry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWBACKPERIODENTRY1',
'Indicates Allow BAck Dated Entry.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWBLKPMT',
'Indicates Allow Bulk Payment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWCHGWHOMCHANGE',
'Indicates Allow Change in Contract' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWED',
'Indicates Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWED1',
'Indicates Allowed' || chr(10) || '' || chr(10) || 'Disallowed : N' || chr(10) || 'Allowed        : Y',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWED2',
'Indicates whether allowed or not. Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWED_REVERSAL_DAYS',
'Indicates Allowed Reversal Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWMSGBFRACCTING',
'Indicates Allow Message Before Accounting' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWPOSTCOTTXN',
'Indicates Allow Post Cutoff Transaction' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWPREPAY',
'Indicates Allow Prepayment of Interest' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWRECOMPSCH',
'Indicates Allow Re-Computation of Schedules' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWREPAY',
'Indicates Allow Prepayment' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWTHIRDPRTYCHG',
'Indicates Allow Third Party Charge' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOWVRTLACCNTS',
'Indicates Allow Virtual Accounts' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOW_BACK_PERIOD_ENTRY',
'Indicates Back Period Entry Allowed' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOW_BULK_PAYMENT',
'Indicates Bulk Payment Allowed' || chr(10) || 'Y:yes' || chr(10) || 'N:no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOW_REP_FLAG',
'Indicates Allow Transaction Repair' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOW_TENOR_CHANGE',
'Indicates Tenor Modification' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLOW_TOPUP',
'Indicates Allow Top-Up of Deposit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWBCKPRDENTRY',
'Indicates Back Period Entry Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWBKPERENTRY',
'Indicates Back Period Entry Allowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWBKPERENTRY1',
'This specifies whether any past accounting period entries can be posted to the customer account.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWBRK',
'Indicates Allow Brokerage' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWBROK',
'Indicates Allow Brokerage' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWCORPACS',
'Indicates Allow Corporate Access' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWMULTIDP',
'Indicates Multiple Down Payment Required' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWMULTIPARTY',
'Indicates Allow Multi Party' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWPREPAY',
'Indicates Allow Prepayment of Interests' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWPREPAY1',
'Indicates Allow Prepayment of Profits' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWPRTIALREDNONCMNT',
'Indicates Allow Partial Reduction' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWPRTLIQAMTBLK',
'Indicates Allow Partial Liquidation with Amount Block' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWROLLOVR',
'Indicates Allow Rollover' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWRTAMEND',
'Indicates Allow Rate Amend' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWRTCDAMEND',
'Indicates Allow Rate Code Amendment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWRTTYPAMEND',
'Indicates Allow Rate Type Amendment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWRULAMND',
'Indicates Allow Rule Amendment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALLWSCHEAMNDAFTRSGEN',
'Indicates Allow Schedule Amend after Statement Generation' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALL_ACCOUNTS',
'Indicates All Accounts/Loans' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALL_AC_ENTRIES',
'Post Dated Cheques Accounting Entries',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALL_OPTIONS',
'Indicates All Options',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALPLADJNEEDED',
'Indicates the Needed.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALRTCDAMND',
'Indicates Allow Rate Code Amendment' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALTACCNO',
'Indicates Alternate Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALTACCNO1',
'Indictaes alternate account number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALTACCNO2',
'Indicates Alternate Account Code.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALTSYSACNO',
'Indicates Alternate System Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALT_CCY_CODE',
'Indicates Alternate Currency Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALT_COUNTRY_CODE',
'Indicates Alternate Country Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALWAMTAMND',
'Indicates Allow Amount Amendment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALWD',
'Indicates Restriction Type' || chr(10) || '	Y - Allowed' || chr(10) || '	N - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALWPRPY',
'Indicates Allow Prepay' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALWRED',
'Indiates Allow Premature redemption',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ALW_EU_OR_COMM',
'Indicates Allow Euro/Commercial' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMCORPMANACTTYPE',
'Asset Management Corporate Manual Action Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMCORPMANACTTYPE_CORPACTNO',
'Indicates Corporate Action Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMDDT',
'Indicates Amendment Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMDPASTPDSCH',
'Indicates Amend Past Paid Schedule' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMDSTAT',
'Indicates Amendment Status' || chr(10) || '	C - Confirmed' || chr(10) || '	U - Unconfirmed' || chr(10) || '	R - Rejected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMD_IND',
'Indicates Amend Indicator',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDADV_PRIORITY',
'Indicates Priority' || chr(10) || '	1 - High' || chr(10) || '	2 - Normal' || chr(10) || '	3 - Low',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDDETAILS_AMDSTAT',
'Indicates Amendment Status' || chr(10) || '	U - Unconfirmed' || chr(10) || '	C - Confirmed' || chr(10) || '	R - Rejected',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDDETAILS_TXNSTAT',
'Indicates Status' || chr(10) || '	S - Closed' || chr(10) || '	A - Active' || chr(10) || '	H - Hold' || chr(10) || '	K - Cancel' || chr(10) || '	V - Reversed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDDETAIL_IO_TYPE',
'AmendDetail IO Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDMENT_REASON',
'Indicates Amendment Reason',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDPAST',
'Indicates Amend Past Paid Schedule.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDPASTPAIDSCH',
'Indicates Amend Past Paid Schedules' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSEBLOCKDEALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Blockdeal that has been successfully Confirmed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSEBLOCKDEALIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Contract that has been successfully Confirmed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSICONTRACTFSFSREQ_FCUBSHEADER',
'Indicates FCUBS Request Header.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSICONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the Standing Instruction details that are successfully Modified',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSICONTRACTIOPKREQ_FCUBSBODY',
'This XSD contains the details for modifying the SI Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSICONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Standing Instruction that has been Modified successfully',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDSICYCLEFSFSRES_FCUBSBODY',
'Indicate FCUBS Respnse Body.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDXPCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full request information relating the XP Contract that has to be modified',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDXPCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full responce information relating the XP Contract that has been successfully Modified.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDXPCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the format for primary request for modification of the XP contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMENDXPCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the XP Contract that has been successfully Modified',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMEND_TYP',
'Indicates Amend Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMFLAG',
'Indicates Auto/Manual' || chr(10) || '	A - Auto' || chr(10) || '	M - Manual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMFLG',
'Indicates Auto/Manual Flag.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMFLGTYPE',
'Indicates Mode. A - Automatic and M - Manual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMLCUSTGRP',
'Indicates AML Customer Group',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMLREQD',
'Indicates Required' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMLREQUIRED',
'Indicates the AML required flag.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMLREQUIREDTYPE',
'Indicates AML Required Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMND',
'Indicates Amend',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDAFTASSO',
'Indicates Amend After Association' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDAFTRAPPLN',
'Indicates Amend After Application' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDAFTRASSOCIAT',
'Indicates Amend After Association' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDAPPUNAPP',
'Indicates Amendment Applied',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDCHK',
'Indicates Increment Amendment Number' || chr(10) || '	Y - On' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDNO',
'Indicates Amendment Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNDSTAT',
'Indicates Amendment Status' || chr(10) || '	C - Confirmed' || chr(10) || '	U - Unconfirmed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNTORRT',
'Indicates Amount/Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNTTAG',
'Indicates Tax Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMNT_TO_BE_DISBUR',
'Indicates Amount To Be Disbursed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOCCY',
'Indicates Amortization Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORPRI',
'Indicates Amortized Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORT',
'Indicates Amortized' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTBASELEM',
'Indicates Amortization Basis Element' || chr(10) || '	PRINCIPAL - Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTINCEPTIONGAIN',
'Indicates Amortization of Inception Gain Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTINCEPTIONLOSS',
'Indicates Amortization of Inception Loss Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZATION_TYPE',
'Indicates Amortization Type' || chr(10) || '	R - Reducing Balance' || chr(10) || '	O - Rule 78',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZED',
'Indicates Amortized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZED1',
'Indicates Amortized.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZED2',
'Indicates Amortized' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZED3',
'Indicates Amortized.' || chr(10) || 'Y:yes' || chr(10) || 'N:no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTIZED4',
'Indicates value of Amortized' || chr(10) || '		  Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTPRINC',
'Indicates Amortize Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTTERMINATIONGAIN',
'Indicates Amortization of Termination Gain Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTTERMINATIONLOSS',
'Indicates Amortization of Termination Loss Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORTYPE',
'Indicates Amortisation Type' || chr(10) || '' || chr(10) || 'Reducing Balance : R' || chr(10) || 'Rule 78                 : O',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMORT_PRINC',
'Indicates the amortized principle.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT',
'Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT1',
'Indicates Amount Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT2',
'Indicates the Amount Financed of Account Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT3',
'Indicates amount of the trnsaction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT4',
'Indicates amount value.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTAR',
'Indicates AR-AP Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTBLOCKS_AMOUNTBLOCKTYPE',
'Indicates Amount Block Type' || chr(10) || '	F - FLEXCUBE' || chr(10) || '	S - Switch' || chr(10) || '	P - Pre Auth' || chr(10) || '	E - Escrow' || chr(10) || '	A - System' || chr(10) || '	C - Account' || chr(10) || '	B - Bulk Salary' || chr(10) || '	D - Discounted TD' || chr(10) || '	W - Sweep Deposit' || chr(10) || '	L - Loan',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTDATES',
'This Node contains  Balances and Turnover details of the customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTDUE',
'Indicates the Amount Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTPAID',
'Indicates Net Amount Paid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTPAIDNOW',
'Indicates Amount Paid Now',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTSETTLE_LCYEQSET',
'Indicates Local Equivalent Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTTAG',
'Indicates Amount Tag' || chr(10) || '	AMT_PURCHASED - Amount Purchased' || chr(10) || '	CNF_LIAB_AVAIL_AMT - Confirmed Amount' || chr(10) || '	UCNF_LIAB_AVAIL_AMT - Unconfirmed Amount' || chr(10) || '	BILL_OS_AMT - Bill Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTTOAMORT',
'Indicates Amount to Amortize',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNTTYPEDVINT',
'Indicates the Amount type Derivative interest.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_BLOCK',
'Amount Block',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_BLOCKS',
'Indicates Amount Block Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_BLOCK_FLAG',
'Indicates Partial Release block' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_BLOCK_REF',
'Indicates Amount Block Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_DISBURSED',
'Indicates value of Amount Disbursed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_DUE',
'Indicates Due Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_DUE_MASTER',
'Include the master record of amount due details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_DUE_MASTER_IO',
'Include the information of master record of amount due details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_DUE_MASTER_PK',
'Include the primary details of master record of amount due details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_FORMAT',
'Indicates Amount Format' || chr(10) || '	., - .,' || chr(10) || '	,. - ,.' || chr(10) || '	, - ,',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_PREPAID',
'Indicates Amount Prepaid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_REINSTATED',
'Indicates License Amount Reinstated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_SETTLE',
'Includes Amount Settlement details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_SLAB1',
'Indicates Amount Slab',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_TAG',
'Indicates the value of Amount Tag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_TAG_DESC',
'Indicates Amount Tag Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_TO_DISBR',
'Indicates the Amount To Disburse of Disbursals.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMOUNT_WAIVED',
'Indicated Amount Waived.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMRTLVL',
'Indicates Amortization Level' || chr(10) || '	C -' || chr(10) || '	P -',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMRTLVL1',
'Amortization Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMRTRESCH',
'Indicates Re-Schedule Amortization on Final Disbursement' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMRTRESCHONDSBR',
'Indicates Re-Schedule Amortization On Final Disbursement' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMRTSTRMTH',
'Indicates Amortization Start Month' || chr(10) || '	1 - June' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT',
'Indicates Amount of Split Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTAVL',
'Indicates Amount Available',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLCK',
'Indicates Amount Blocked',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLKFLG',
'Indicates Amount Blocked' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLKFORDIS',
'Indicates Amount Block for Discount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLKNO',
'Indicates Block Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLOCKNO',
'Indicates Amount Block Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTBLOCKTYPE',
'Indicates Amount Block Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTCAP',
'Indicates Amount Capitalized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTCAP1',
'Indicates Amount capitilized.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTCCY',
'Indicates Currency of Amounts',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTCCY1',
'Indicates Currency of amounts',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTCCY2',
'Indicates Amount Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTDISBURSED',
'Indicates Already Disbursed Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTDSBR',
'Indicates Amount Disbursed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTDUE',
'Indicates Amount Due of Schedule details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTDUE_DETAIL',
'Includes Amount Due details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTEXCESS',
'Indicates Amount to be paid back',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTFIN',
'Indicates Amount Fianced',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTFINANCED',
'Indicates Amount Financed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTINACCCCY',
'Indicates Amount In Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTINSURED',
'Indicates Amount Insured',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTLCY',
'Indicates Amount in Loan Currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTLEV',
'Amount Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTNAM',
'Indicates Amount Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTNOTDUE',
'Indicates Amount Not Due Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTNTDUE',
'Indicates Amount Not Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTOUT',
'Indicates Amount Outstanding Amount to be paid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTOVERDUE',
'Indicates Amount Overdue',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTPAIDBACK',
'Indicates the Excess Amount.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTPOSCCY',
'Indicates Amount In Posting Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTREADJ',
'Indicates Amount Readjusted',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTREADJUSTED',
'Indicates Amount Reajusted.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTREC',
'Indicates Amount Received',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTREINSTDY',
'Indicates Amount Reinstated Today',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTRPTCCY',
'Indicates Amount in Report Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSETTL',
'Indicates Amount Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSETTL1',
'AMTSTTL Indicates Amount Settled.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSETTL2',
'It indicatse amount settled.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSETTL3',
'Indicates the Loan Currency Equivalent of Debit Settlement Components',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSETTL4',
'Indicates the Loan Currency Equivalent of Credit Settlement Components',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSLAB',
'Indicates the Amount Slab LDMM Rate Bulk Upload',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSTTL',
'Indicates settle amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTSTTLACY',
'Indicate Loan Currency Equivalent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTAG',
'Indicates the deal amount. This is the amount that is being placed or borrowed as part for the deal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTAGTYPE',
'Indicates Split Balances' || chr(10) || '	Y - Yes' || chr(10) || '	N - No' || chr(10) || '	C - Contra' || chr(10) || '	I - Ignore',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTAGTYPE1',
'Indicates Amount Tag Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTOAMU',
'Amount to Amort',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTOBEBLOCK',
'Indicates Amount To Be Blocked',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTTYPE',
'Indicates the Amount Variable.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTUSD',
'Indicates Amount in USD',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTUTILISEDTODAY',
'Indicates Amount Utilized Today',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTUTILIZED',
'Indicates Amount Utilized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTUTILTDY',
'Indicates Amount Utilised Today',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTWAIVED',
'Indicates Amount Waived',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMTWAIVED1',
'Indicates Amount Waived Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_AVAILABLE',
'Indicates Amoutn Available.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_BLOCK_NO',
'Indicates the Amount Block Number of Linkage Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_COMP_CCY',
'Indicates Amount in Component Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_CREDITED',
'Indicates Amount Credited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_DEBITED',
'Indicates Amount Debited',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_DISBR',
'Indicates Already Disbursed Amt',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_DUE',
'Indicates Amount Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_EXECUTED_LCY',
'Indicates Amount Executed Local Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_FACILITY_CCY',
'Indicates Amount in Facility Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_PAID',
'Indicates Amount Paid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_PCY',
'Indicates Amount In Payment Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_RECVBLE',
'Indicates Amount Receivable',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_TRANSFERRED',
'Indicates Amount Transferred',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMT_UTILIZED',
'Indicates License Amount Utilized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMUAMTTDATE',
'Indicates Amount Amortization till Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AMUAMTTDATE1',
'Amort Amount Till Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANNLOAN',
'Indicates Annuity Loan' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANNLTRNOVR',
'Indicates Annual Turnover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANNOUNCEMENT_DATE',
'Indicates Announcement Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANSWER',
'Indicates Answer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANSWERBACK',
'Indicates Answerback',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANSWERBACK1',
'Indicates the answer back code for the customer. This field is applicable only if the message is transmitted through Telex',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANTI_MONEY_LAUND_REQD',
'Indicates Anti Money Laundering Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ANY',
'Indicates FLEXCUBE UBS Response Payload Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLCHGPEXC',
'Apply Charge on Partial Execution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLCHGREJT',
'Apply Charge on Rejection',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLCHGSUXS',
'Apply Charge on Success',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYCHGPEXC',
'Indicates Apply Charge On Partial Execution' || chr(10) || 'Yes "Y; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYCHGREJT',
'Indicates Apply Charge On Reject Execution' || chr(10) || 'Yes "Y; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYCHGSUXS',
'Indicates Apply Charges on Success SI' || chr(10) || 'Yes Y; No N.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYCONTHOLCCY',
'Indicates Apply Consider Branch Holiday',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYFACLTCCY',
'Indicates Apply Facility Currency' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYFACLTYHOLCCY',
'Indicates Apply Facility Currency Holiday' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYLCLHOLCCY',
'Indicates Apply Local Holiday Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APLYTAX',
'Indicates Apply Tax' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPBRN',
'Indicates Application Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPBY',
'Indicates Approved By',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPCAT',
'Indicates Application Category',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPCHG',
'Indicates Apply Charge On Rollover Amount' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPDATE',
'Indicates Application Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPICANTTYP',
'Indicates Applicant Type' || chr(10) || '	P - Primary' || chr(10) || '	C - Co Applicant',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICABLEDEPTENOR',
'Indicates Applicable Deposit Tenor' || chr(10) || '	O - Original Tenor' || chr(10) || '	D - Deposit Tenor',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICANTLIABILITY_UNADVISED',
'Indicates UnAdvised' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPPRIOR',
'Indicates Application Priority' || chr(10) || '	M - Medium' || chr(10) || '	L - Low' || chr(10) || '	H - High',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTAT',
'Indicates Application Status' || chr(10) || '	RECVAPP - CP Entry' || chr(10) || '	LPENRICH - CP Enrichment' || chr(10) || '	NEWAPP - CP Initiation' || chr(10) || '	LPAPPROVE - CP Approval' || chr(10) || '	REVSCORE - CP Scoring' || chr(10) || '	RISKEVAL - CP Risk' || chr(10) || '	SAVELIAB - Save Liability' || chr(10) || '	SAVECOLLAT - Save Collateral' || chr(10) || '	SAVEPOOL - Save Pool' || chr(10) || '	SAVEFACLT - Save Facility' || chr(10) || '	SAVECUST - Save Customer' || chr(10) || '	LPSTRUC - CP Structuring' || chr(10) || '	LPREVIEW - CP Review' || chr(10) || '	LPACCEPT - Customer Acceptance' || chr(10) || '	LPRETRY - CP Retry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTAT1',
'Indicates Application Status' || chr(10) || '	NEWCAPP - New Application' || chr(10) || '	RECCAPP - Initiation' || chr(10) || '	LPCENRICH - Enrichment' || chr(10) || '	LPCREV - Review' || chr(10) || '	LPCAPPROVE - Approval' || chr(10) || '	LPCACCEPT - Customer Acceptance' || chr(10) || '	LPCRETRY - Facility Closure Manual Retry' || chr(10) || '	CLOSEFACLT - Close Facility',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTAT2',
'Indicates Application Status' || chr(10) || '	NEWAPP - Application Entry' || chr(10) || '	APPENTRY - Application Entry' || chr(10) || '	VFYAPP - Verify Application' || chr(10) || '	INTKYC - Internal KYC' || chr(10) || '	EXTKYC - External KYC' || chr(10) || '	UNDERW - Underwriting' || chr(10) || '	UNAPPR - Loan Approval' || chr(10) || '	CHKDOC - Check Documents' || chr(10) || '	SAVECUST - Save Customer' || chr(10) || '	SAVELIAB - Save Liability' || chr(10) || '	SAVECOLL - Save Collateral' || chr(10) || '	SAVELOAN - Save Loan',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTAT3',
'Indicates Status' || chr(10) || '	RECVNVFY - Receive and Verify' || chr(10) || '	APRVACCOPEN - Approve Account Opening' || chr(10) || '	INPUTDTLS - Input Details' || chr(10) || '	VRFYDTLS - Verify Details' || chr(10) || '	MDFYDTLS - Modify Details' || chr(10) || '	CHKAVLBAL - Check Available Balance' || chr(10) || '	GENCHQBK - Generate Cheque Book' || chr(10) || '	DLVRCUSTKIT - Deliver Customer Kit' || chr(10) || '	STOREDOCS - Store Documents' || chr(10) || '	NTFYPROSP - Notify Prospect' || chr(10) || '	NTFYCUST - Notify Customer' || chr(10) || '	BLKCUST - Block Customer' || chr(10) || '	GENACC - Generate Account' || chr(10) || '	GENLTR - Generate Letter' || chr(10) || '	UPDCUSTKIT - Update Customer Kit' || chr(10) || '	SAVEACCOUNT - Save Info' || chr(10) || '	CUSTDTLS - Customer Details' || chr(10) || '	PREPRINTCHQBK - Pre-printed Cheque Book' || chr(10) || '	RECEIVENVERIFY - Receive and Verify' || chr(10) || '	INITIATEPENCRE - Penny Credit' || chr(10) || '	MODIFYPENCRE - Modify Penny Credit' || chr(10) || '	ISSDEBCARD - Issue Debit Card' || chr(10) || '	VALPENCRE - Validate Penny Credit' || chr(10) || '	MODIFYDET - Modify Application' || chr(10) || '	STOREDOC - Store Documents',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTATUS',
'Indicates Application Status' || chr(10) || '	INPUTDTLS - Input Details' || chr(10) || '	REQCHECK - Requirement Check' || chr(10) || '	IPCACHECK - IPCA Check' || chr(10) || '	NCDDCHECK - NCDD Check' || chr(10) || '	PROSPECTFIT - Prospect Fit' || chr(10) || '	CONTACTLATER - Contact Later' || chr(10) || '	RECVRESPONSE - Receive Response' || chr(10) || '	NEGOTIATION - Negotiation' || chr(10) || '	CHECKLATER - Check Later' || chr(10) || '	CUSTRLTNSHIP - Customer Relationship' || chr(10) || '	SAVECUST - Customer Details' || chr(10) || '	DTLSVERIFY - Verification' || chr(10) || '	CRDCHECK - Credit Check' || chr(10) || '	CRDREPORT - Credit Report' || chr(10) || '	BSANALYSIS - Balance Sheet Analysis' || chr(10) || '	INPRINCNOTE - InPrinciple Note' || chr(10) || '	INPRINCDCSN - InPrinciple Decision' || chr(10) || '	KYCREQCHECK - KYC Req. Check' || chr(10) || '	PROSPECTVRFY - Prospect Verification' || chr(10) || '	SDNVRFY - SDN Verification' || chr(10) || '	INTBLCHECK - Internal Blacklist Check' || chr(10) || '	CORPBLCHECK - Corp. Blacklist Check' || chr(10) || '	CONTACTVRFY - Contact Verification' || chr(10) || '	REQNOTIFY - Regulatory Notification' || chr(10) || '	OTHRKYCCHECK - Other KYC Check' || chr(10) || '	KYCDECISION - KYC Decision' || chr(10) || '	EXTKYCRETRY - External KYC Retry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_APPSTATUS1',
'Indicates Application Status' || chr(10) || '	CUSTDTLS - Customer Details' || chr(10) || '	SAVECUST - Save Info' || chr(10) || '	INPUTDTLS - Input Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_AUTODECISION',
'Indicates Auto Decision' || chr(10) || '	N - Not Required' || chr(10) || '	Y - Required',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_OPRCODE',
'Indicates Operation' || chr(10) || '	N - New' || chr(10) || '	M - Existing',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_PRIORITY',
'Indicates Priority' || chr(10) || '	HI - High' || chr(10) || '	LO - Low' || chr(10) || '	ME - Medium' || chr(10) || '	HP - Hot Prospect' || chr(10) || '	VP - Very Hot Prospect',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_PRIORITY1',
'Indicates Application Priority' || chr(10) || '	H - High' || chr(10) || '	M - Medium' || chr(10) || '	L - Low',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_PRIORITY2',
'Indicates Priority' || chr(10) || '	H - High' || chr(10) || '	M - Medium' || chr(10) || '	L - Low',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_PRIORITY3',
'Indicates Priority' || chr(10) || '	M - Medium' || chr(10) || '	L - Low' || chr(10) || '	H - High',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_SDNCHK',
'Indicates SDN Check' || chr(10) || '	N - Not Required' || chr(10) || '	Y - Required',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATIONDETAILS_STAT',
'Indicates Status' || chr(10) || '	NEWAPP - New Application' || chr(10) || '	APPENTRY - Application Entry' || chr(10) || '	VFYAPP - Verify Application' || chr(10) || '	INTKYC - Internal KYC' || chr(10) || '	EXTKYC - External KYC' || chr(10) || '	UNDERW - Underwriting' || chr(10) || '	UNAPPR - Loan Approval' || chr(10) || '	CHKDOC - Check Documents' || chr(10) || '	SAVECUST - Save Customer' || chr(10) || '	SAVELIAB - Save Liability' || chr(10) || '	SAVECOLL - Save Collateral' || chr(10) || '	SAVELOAN - Save Loan',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATION_DTLS',
'Application Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLICATION_NUM',
'Indicates value of Application Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLIED',
'Indicates Applied',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLIEDFLG',
'Indicates Applied Flag' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLIED_FLAG',
'Indicates the Applied Flag of Revisions.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLIED_TILL_DATE',
'Indicates the provisioning amount applied till date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLNO',
'Indicates Application Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLOCHOLCCY',
'Indicates Holiday Treatment For Schedules --' || chr(10) || 'Use local Currency (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLVL',
'Indicates Application Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLY',
'Indicates Apply',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLYCHG',
'Indicates Apply Charge' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLYFACHOLCCY',
'Indicates Holiday Treatment For Schedules --' || chr(10) || 'Use Facility Currency (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLYFOR',
'Indicates Apply For',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLY_CHARGE',
'Indicates Apply Charge' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLY_CHG_PEXC',
'Indicates Partial Execution' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPLY_CHG_SUXS',
'Indicates Success' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPL_CHG_ON_ROLL',
'Indicates Apply charge on Rollover Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPL_LCL_CCY',
'Indicates Apply Local Currency' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPL_TAX_ON_ROLL',
'Indicates Apply Tax on Rollover Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPMASTER_STATUS',
'Indicates Status' || chr(10) || '	RECVNVFY - Receive and Verify' || chr(10) || '	INPUTDTLS - Input Details' || chr(10) || '	VRFYDTLS - Verify Details' || chr(10) || '	MDFYDTLS - Modify Details' || chr(10) || '	APPRLIEN - Approve Closure to Lien' || chr(10) || '	ARRPAYN - Arrange Payments' || chr(10) || '	ENDORSTDR - Endorse TD Receipt' || chr(10) || '	HANDTDR - Handover TD Receipt' || chr(10) || '	STOREDOCS - Store Documents',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPMASTER_STATUS1',
'Indicates Status' || chr(10) || '	MLIQ - Manual Liquidation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPPRIOR',
'Indicates Application Priority' || chr(10) || '	L - Low' || chr(10) || '	M - Medium' || chr(10) || '	H - High',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRAISERDT',
'Indicates Appraiser Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRAISERNAME',
'Indicates Appraiser Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRAISERVAL',
'Indicates Appraiser Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRATE',
'Indicates Apply Rate' || chr(10) || '	C - Current' || chr(10) || '	N - Next',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPROLLTAX',
'Indicates Apply Tax On Rollover Amount' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPROVEDAMT',
'Indicates Approved Limit Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRSTAT',
'Indicates Approval Status' || chr(10) || '	NEWAPP - Recieve Covenant' || chr(10) || '	CVNVER - Covenant Verification' || chr(10) || '	FLWUP - Follow Up',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPRULE',
'Indicates Applicable Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPSTAT',
'Indicates Application Status' || chr(10) || '	NEWAPP - CP Initiation' || chr(10) || '	RECVAPP - CP Entry' || chr(10) || '	LPENRICH - CP Enrichment' || chr(10) || '	LPAPPROVE - CP Approval' || chr(10) || '	REVSCORE - CP Scoring' || chr(10) || '	RISKEVAL - CP Risk' || chr(10) || '	SAVELIAB - Save Liability' || chr(10) || '	SAVECOLLAT - Save Collateral' || chr(10) || '	SAVEPOOL - Save Pool' || chr(10) || '	SAVEFACLT - Save Facility' || chr(10) || '	SAVECUST - Save Customer' || chr(10) || '	LPSTRUC - CP Structuring' || chr(10) || '	LPREVIEW - CP Review' || chr(10) || '	LPACCEPT - Customer Acceptance' || chr(10) || '	LPRETRY - CP Retry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APPTYPE',
'Indicates Application Type' || chr(10) || '	RET - Retail' || chr(10) || '	COR - Corporate' || chr(10) || '	CAS - CASA' || chr(10) || '	IJA - Ijarah' || chr(10) || '	IST - Istisna' || chr(10) || '	MUD - Mudarabah' || chr(10) || '	MUR - Murabaha' || chr(10) || '	MUS - Musharaka' || chr(10) || '	TAW - Tawarooq' || chr(10) || '	TED - Term deposit' || chr(10) || '	WEL - Wealth',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APP_INT_RATE',
'Indicates Applicable Interest Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APRFAC',
'Indicates Approved Facilities',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APY',
'Indicates Annual Percentage Yield',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_APYCALC',
'Indicates Annual Percentage Yield Calculation Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AQQRDDEPR',
'Indicates Acquired Depreciation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AQRDEPR',
'Indicates Acquired Premium',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARAP',
'Indicates AR-AP Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARAPCODE',
'Indicates AR-AP Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCHIVAL_DATE',
'Indicates Archival Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCHIVAL_DAYS',
'Indicates Archival Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCHIVAL_PERIOD',
'Indicates Archival Period (in days)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCHIVAL_REF_NO',
'Indicates Archival Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCH_PERIOD',
'Indicates Archival Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARCSTAT',
'Indicates Arch. Message Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AREACODE',
'Indicates Area Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AREAINANOCOUNTRY',
'Indicates Area In Other Country',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AREAINEMIRATE',
'Indicates Area In Emirate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AREA_INT',
'Indicates Area of Interest',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARRAHNU_EXTENSION',
'Indicates Arrahnu Extension',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARRVDT',
'Indicates Goods Arrival Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARVNAPPLIED',
'Indicates Automatic Revision Applied',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ARVN_APPLIED',
'Indicates ARVN Applied',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AR_AP_TRACKING',
'Indicates Eligible for AR-AP Tracking' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASCIIHANDOFFREQD',
'Indicates ASCII Handoff Reqd' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASCII_HANDOFF_REQD',
'Indicates ASCII Handoff Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASDESC',
'Indicates Asset Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET',
'Indicates Asset' || chr(10) || '	Vehicle - Vehicle' || chr(10) || '	Home - Home' || chr(10) || '	Others - Others' || chr(10) || '	None -',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETACCBASIS',
'Indicates the Asset Accounting Basis.A - Accrual, N - Non Accrual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETACCBASIS1',
'Indicates Asset Accounting Basis' || chr(10) || '	N - Non Accrual' || chr(10) || '	A - Accrual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETADDON1',
'Indicates Additions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETBODY',
'Indicates Asset Body',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETBRN',
'Indicates Asset Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETBSVL',
'Indicates Base Retail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETCAPTAMT',
'Indicates Asset Capitalization Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETCAT',
'Indicates Asset Category',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETCCY',
'Indicates Asset Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETCD',
'Indicates Asset Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETCLASS',
'Indicates Asset Class',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETIDNO',
'Indicates Asset Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETLENGTH',
'Indicates Length',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETMAKE',
'Indicates Asset Make',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETMODEL',
'Indicates Asset Model',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETQUTPRINCIPAL',
'Indicates Asset Outstanding Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETREFNO',
'Indicates Fixed Asset Contract Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETS',
'Indicates Assets',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSCHOVD',
'Indicates Total No of Asset Schedules Overdue',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSEQNO',
'Indicates Asset Sequence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSTAT',
'Indicates Asset Status' || chr(10) || '	A - Active' || chr(10) || '	S - Settled',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSTATUS',
'Indicates Asset Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSUB',
'Indicates Asset Sub Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETSUBTYP',
'Indicates Sub Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETTOTALOVD',
'Indicates Asset Total Overdue',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETTYP',
'Indicates Type' || chr(10) || '	New - New Asset' || chr(10) || '	Used - Used Asset',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETTYPE',
'Indicates Asset Type' || chr(10) || '	H - Home' || chr(10) || '	V - Vehicle' || chr(10) || '	O - Others',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETTYPE1',
'Specifies the Asset Type for the Commodity being created',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETUDETSTAT',
'Indicates Asset User Defined Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETUSERREFNO',
'Indicates Fixed Asset User Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETVEHICLE_ASSETTYP',
'Indicates Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETVL',
'Indicates Asset Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETVLDT',
'Indicates Validation Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETWIDTH',
'Indicates Width',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSETYEAR',
'Indicates Asset Year',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_BLK',
'Asset Items',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_CAT_LIST',
'Indicate asset catagory list',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_RATIO',
'Indicates Asset Ratio',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_REFERENCE_NO',
'Indicates Asset Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_VALUATIONS',
'Asset Valuations',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSET_WORTH',
'Indicates Asset Worth',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSGTO',
'Indicates Assigned To',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSID',
'Indicates Ass. Identification',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSIGND_TO',
'Indicates Assign To',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSRMATDT',
'Indicates Asset Maturity Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTAMNT',
'Indicates Asset Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTBOOKDT',
'Indicates Asset Booking Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTCOST',
'Indicates Asset Cost',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTFINAMT',
'Indicates Asset Finance Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTPROD',
'Indicates Asset Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSTVALUEDT',
'Indicates Asset Value Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ASSUMINGFLAG',
'Indicates Assuming' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATERGAI',
'Indicates Amortize Termination Gain' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATERLOS',
'Indicates Amortize Termination Loss' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM',
'Indicates ATM' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM1',
'This specifies whether ATM facility to be provided for the account.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMACC',
'This specifies the ATM Account Number if the ATM facility to be provided for the account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMBRN',
'Indicate the ATM Branch No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMCUSTACNO',
'Indicates ATM Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMDCNTLIM',
'Indicates Daily count Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMDCNTLIM1',
'Indicate the Amount Daily count Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMDLIM',
'Indicates Daily Amount Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMDLIM1',
'This specifies the daily transaction limit through ATM.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMDLYLMTCNT',
'Indicates Daily Amount Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMFAC',
'Indicates ATM / Debit Card' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMFACILITY',
'Indicates ATM Facility' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMFLG',
'Indicates ATM Facility' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMSUSPGLDESC',
'Indicates ATM Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATMTRNSLMT',
'Indicates ATM Transaction Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_ACCOUNT_NO',
'Indicates Card Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_ACC_NO',
'Indicates Atm Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_AMOUNT_LIMIT',
'Indicates ATM Amount Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_CARD_N',
'Indicates ATM/Debit Card Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_CASH_LIMIT',
'Indicates ATM Cash Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_COUNT_LIMIT',
'Indicates ATM Count Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_DLY_CNT_LIMIT',
'Indicates ATM Daily Count Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_DLY_TXN_LIMIT',
'Indicates ATM Daily Transaction Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_LIMIT_UNIT',
'Indicates ATM Limit Unit' || chr(10) || '	Y - Yearly' || chr(10) || '	M - Monthly' || chr(10) || '	W - Weekly' || chr(10) || '	D - Daily',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_UTILIZED_COUNT',
'Indicates ATM Utilized Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATM_UTILIZED_LIMIT',
'Indicates ATM Utilized Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTFMT',
'Indicates Attribute Format' || chr(10) || '	PDF - PDF' || chr(10) || '	RTF - RTF',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTLCL',
'Indicates Attribute Locale',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRCD',
'Indicates Attribute Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRDESC',
'Indicates Attribute Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT1',
'Indicates Attribute Narrative 01',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT10',
'Indicates Attribute Narrative 10',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT2',
'Indicates Attribute Narrative 02',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT3',
'Indicates Attribute Narrative 03',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT4',
'Indicates Attribute Narrative 04',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT5',
'Indicates Attribute Narrative 05',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT6',
'Indicates Attribute Narrative 06',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT7',
'Indicates Attribute Narrative 07',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT8',
'Indicates Attribute Narrative 08',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRIBNARRAT9',
'Indicates Attribute Narrative 09',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTRVALUE',
'Indicates Attribute Value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_ATTTEMP',
'Indicates Attribute Template',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDITBLOCK_TYPE',
'OT- Contract Exercise Audit Entry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDITBLOCK_TYPE1',
'OT Contract Termination Audit Block',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDITLOG_TXNSTAT',
'Indicates Contract Status' || chr(10) || '	K - Cancel' || chr(10) || '	V - Reversed' || chr(10) || '	S - Closed' || chr(10) || '	A - Active' || chr(10) || '	H - Hold' || chr(10) || '	Y - Yet to be Initiated' || chr(10) || '	L - Liquidated' || chr(10) || '	F - Confirmed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDIT_BLOCK_TYPE',
'Includes Audit Block details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDIT_TYPE1',
'Audit Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUDIT_TYPE2',
'Asset Management Audit Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUSTAT',
'The Authorisation status of the deal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTDEPBRKMETHD',
'Indicates Break Method' || chr(10) || '	LIFO - LIFO' || chr(10) || '	FIFO - FIFO' || chr(10) || '	MAXB - Maximum Balance' || chr(10) || '	MINB - Minimum Balance',
'ENG'
)
;
END;
/



commit;
