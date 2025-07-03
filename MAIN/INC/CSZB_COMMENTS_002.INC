PROMPT PROCESSING FOR CSZB_COMMENTS_002

BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTDEPDERRATCD',
'Indicates Def Rate Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTDEPDERRATTYP',
'Indicates Def Rate Type' || chr(10) || '	M - Mid' || chr(10) || '	B - Buy' || chr(10) || '	S - Sell',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTDSTL',
'Indicates Automatic Delivery Settlement' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTGENCCYMISM',
'Indicates Auto Generate Currency Mismatch Entries' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTGENVDMISM',
'Indicates Auto Generate Value Date Mismatch Entries' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH',
'Indicates Auth Status' || chr(10) || '	A - Authorized' || chr(10) || '	U - Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH1_END',
'Indicates Auth1 End Time(H:M)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH1_LIMIT',
'Indicates Authorization 1 Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH1_START_TIME',
'Indicates Auth1 Start Time(H:M)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH2_END',
'Indicates Auth2 End Time(H:M)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH2_LIMIT',
'Indicates Authorization 2 Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH2_START_TIME',
'Indicates Auth2 Start Time(H:M)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHACCOUNTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new LE(Leasing) product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHADHOCRESPONSE',
'Indicates Authorize Adhoc Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHADHOCRESPONSEIO',
'Indicates Authorize Adhoc Response IO type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHADHOCRESPONSEPK',
'Indicates Authorize Adhoc Response PK type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHAMCHARGEDEFINITIONFSFSREQ_FCUBSBODY',
'This XSD gives the message format Full Request Information for Authorization of AM Charge Definition.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHAMCHARGEDEFINITIONIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the Primary Information relating the Authorization of AM Charge Definition',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBCAMNDBILLAMTIOPKREQ_FCUBSBODY',
'This.xsd gives the format Primary request which has Input only  fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBCAMNDBILLAMTIOPKRES_FCUBSBODY',
'This.xsd gives the message format for detailing the primary information relating the Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBICDETAILS',
'This Node indicates the BIC code details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBRLIQFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the liquidation that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBY',
'Indicates the User ID of dual authorizer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHBYTYPE',
'Indicates Authorization By',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCLADHOC',
'Indicates Authorize CL Adhoc type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCLADHOCIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to delete AdhocChg',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCLADHOCIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to Authorize AdhocChg',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCLUDEVENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to authorize a CL(Retail Lending) User Defined Event',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCLUDEVENTIOPKRES_FCUBSBODY',
'This XSD gives the message format for response for authorize of CL(Retail Lending) User Defined Event Trigerring',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHCOMMITIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a full response of a Tranche',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDATE',
'Indicates Authorization Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSIOTYPE_REKEYDETAILS',
'Include ReKey type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSTYPE',
'Indicates Authorization details type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSTYPE_CONTRACTCHANGELOG',
'Include Contract chnage log type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSTYPE_OVERRIDES',
'Indicates Overrides Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSTYPE_REKEYDETAILS',
'Indicates Rekey Fields Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILSTYPE_REKEYDETAILS1',
'Include Loans and Deposits ReKey fields type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDETAILS_TXNSTAT',
'Indicates Status' || chr(10) || '	K - Cancel' || chr(10) || '	V - Reversed' || chr(10) || '	S - Closed' || chr(10) || '	A - Active' || chr(10) || '	H - Hold' || chr(10) || '	L - Liquidated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDISBURSEMENT',
'Indicates MO Disbursement Authorize type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDISBURSEMENT1',
'Indicates LE Disbursement Authorize type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDISBURSEMENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDISBURSEMENTIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to create a new LE(Leasing) dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDISBURSEMENTRESPONSE',
'Indicates Disbursement Authorize Response type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDT',
'Indicates Authorize Date Stamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP',
'Indicates Auth Date Stamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP1',
'Indicates the User ID with date and stamp of dual authorizer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP2',
'Indicates date and stamp when the user has authorized the booked contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP3',
'Indicates the Authorised time of the record',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP4',
'INdicates authorisation time stamp.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP5',
'Indicates date and  time when the user has authorized  the record.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP6',
'Indicates date stamp when the user has authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTAMP7',
'Indicates Authorization Date Time',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHDTSTP',
'Inidicates Auth Date Time Stamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFEEACCRUALLDCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Fee Accrual has been successfully Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFEEACCRUALLDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full responce information relating the Fee Accrual that has been successfully Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFLTRTDEFNIOPKREQ_FCUBSBODY',
'Includes the Authorisation of Floating Rate Definition IO details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFXREVNFSFSREQ_FCUBSBODY',
'This XSD Gives Information about FullRequest',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFXREVNFSFSRES_FCUBSBODY',
'This XSD Gives Information about FullResponse',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFXREVNIOPKREQ_FCUBSBODY',
'This XSD Gives Information about IORequest',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHFXREVNIOPKRES_FCUBSBODY',
'This XSD Gives Information about PKResponse',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHID',
'Indicates Authotication ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHG',
'Mortgages Installment Status Change Auth Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to authorize MO(Mortgages) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to authorize CL(Retail Lending) account install status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to authorize a new MO(Mortgages) dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGIOPKRES_FCUBSBODY1',
'This XSD gives the message format for a request to authorize a new CL(Retail Lending) dsbr',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGRESPONSE',
'Mortgages Installment Status Change Response Auth Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGRESPONSEIO',
'Mortgages Installment Status Change Response IO Auth Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGRESPONSEPK',
'Mortgages Installment Status Change Response PK Auth Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHINSTSTATCHGRESPONSE_CLEVTUDF',
'Indicates MO Event UDF details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHMCREQIOTYPE1_REKEYDETAILS',
'Indicates Rekey Fields Type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHMOADHOC',
'Indicates Authorize Mortgage Adhoc type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORISERROLE',
'Indicates Authorizer Role' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZATION',
'Indicates Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZATION_DETAILS',
'Includes the full request information relating the Charge Receivable Component that is being requested for authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZATION_DETAILS_IO',
'Includes the input-only request information relating the Charge Receivable Component that is being requested for authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZATION_DETAILS_PK',
'Includes the primary key response information relating the Charge Receivable Component that has been successfully authorized.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZECLEARINGREJECTFSFSREQ_FCUBSBODY',
'This XSD gives the request message format for authorisation of the rejected clearing contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZECLEARINGREJECTIOPKRES_FCUBSBODY',
'This XSD gives the response message format for authorisation of the rejected clearing contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEETDMRGNSETTLEFSFSRES_FCUBSBODY',
'This.xsd gives the message format for providing complete information of a Margin Scheme that are successfully defined in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEETDMRGNSETTLEIOPKRES_FCUBSBODY',
'This.xsd gives the message format for providing primary information of a commodity that are successfully defined in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEFUNDFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full request information.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEFUNDFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full response information.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the LDContract details that  are successfully Authorized in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELDCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Auth request for LD Contract.This is the normal request which has Input only fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELDCONTRACTIOPKRES_FCUBSBODY',
'This xsd gives the message format for detailing the primary information relating the LD Contract that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELLCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for a PK response of a facility',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELQLIQFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the full request information relating the Charge Receivable Component that is being requested for authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELQLIQFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the full response information relating the Charge Receivable Component that has been successfully authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELQLIQIOPKREQ_FCUBSBODY',
'This XSD gives the message format for detailing the input-only request information relating the Charge Receivable Component that is being requested for authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZELQLIQIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the input-only response information relating the Charge Receivable Component that has been successfully authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEOTCONTRACTFSFSREQ_FCUBSBODY',
'This.xsd gives the message format for detailing the Full information relating the Contract that has been successfully Created',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEPRICEDTLFSFSREQ_FCUBSBODY',
'Contains Details About the XSD',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEPRICEDTLFSFSRES_FCUBSBODY',
'This XSD Gives Information about IO and Full Response',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEPRICEDTLIOPKRES_FCUBSBODY',
'This XSD Gives Information about PK,IO and Full Response',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZERECORDFSFSRES_FCUBSBODY',
'This XSD contains response of Authorize SE Record',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESEPORTFOLIOFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Security Portfolio Authorization Request Full Done.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESEPORTFOLIOFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Security Portfolio Authorization Full Response Done.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESEPORTFOLIOIOPKREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Security Portfolio Request Done for Authorization.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESEPORTFOLIOIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full information relating the Security Portfolio Authorisation Done.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESFCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new SF contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESFCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for a request to authorise a new SF contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESFCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to authorize a new SF contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a request for Authorizing the Standing Instruction. This request is a full screen request which includes even input only fields and the display fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the Standing Instruction  details that are successfully Aurhorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICONTRACTIOPKREQ_FCUBSBODY',
'Indicate FCUBS Request Body.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the FT Contract that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICYCLEFSFSRES_FCUBSBODY',
'This XSD contains the Full Response of SI-AuthorizeSICycle.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESICYCLEIOPKREQ_FCUBSBODY',
'This XSD contains the Input Only details for authorizing the SI-SICycle.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESTOPPAYMENTFSFSREQ_FCUBSBODY',
'This XSD gives the request message format for authorisation of the Stop Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZESTOPPAYMENTIOPKRES_FCUBSBODY',
'This XSD gives the response message format for authorisation of the Stop Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSREQ_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        information relating to the' || chr(10) || '                                        Clearing Transaction that has to be' || chr(10) || '                                        Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSREQ_FCUBSBODY1',
'This XSD gives the message format for Full Screen information relating to the Retail Teller Transaction that has to be Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSREQ_FCUBSBODY2',
'This XSD gives the message format for' || chr(10) || '                                        Input Only information relating to the' || chr(10) || '                                        Instruments Transaction that has to be' || chr(10) || '                                        Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSRES_FCUBSBODY',
'This XSD gives the message format for Full Screen information relating to the Retail Teller Transaction that has been Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSRES_FCUBSBODY1',
'This XSD gives the message format for' || chr(10) || '                                        Full Response information relating to' || chr(10) || '                                        the Instruments Transaction that has' || chr(10) || '                                        been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONFSFSRES_FCUBSHEADER',
'This Header includes elelments like SOURCE, UBSCOMP, Message Id, Correlation Id, User Id, Branch, Module Id, Service,' || chr(10) || 'Operation, Source Operation, Source UserId, Destination, Multitrip Id, Function Id, Action, Message Status Type,' || chr(10) || 'Notification Reference Number, Notification Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONIOPKREQ_FCUBSBODY',
'This XSD gives the message format for' || chr(10) || '                                        Input Only information relating to the' || chr(10) || '                                        Clearing Transaction that has to be' || chr(10) || '                                        Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for IO information relating to the Retail Teller Transaction that has to be Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONIOPKREQ_FCUBSBODY2',
'This XSD gives the message format for' || chr(10) || '                                        Input Only Request information relating' || chr(10) || '                                        to the Instruments Transaction that has' || chr(10) || '                                        to be Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONIOPKRES_FCUBSBODY',
'This XSD gives the message format for Primary Key information relating to the Retail Teller Transaction that has been Authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTIONIOPKRES_FCUBSBODY1',
'This XSD gives the message format for detailing the primary information relating the instrument transaction that has been successfully Queried',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTION_FSFS_REQ',
'Root node of request XML',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZETRANSACTION_IOPK_RES',
'Root node of response XML',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEXPCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full request information for XP Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEXPCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full response information for XP Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEXPCONTRACTIOPKREQ_FCUBSBODY',
'This XSD gives the format Primary request  for XP Contract Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHORIZEXPCONTRACTIOPKRES_FCUBSBODY',
'This XSD gives the format for Primary response for XP Contract Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHOTTERMFSFSREQ_FCUBSBODY',
'This.xsd gives the message format for detailing the primary information relating the Contract that has been successfully Created',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHOTTERMFSFSRES_FCUBSBODY',
'This.xsd gives the message format for detailing the Full responce information relating the Contract that has been successfully Created',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHOTTERMIOPKREQ_FCUBSBODY',
'This.xsd gives the format for primary request for creation of Contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTFSFSREQ_FCUBSBODY',
'This.xsd gives the message format for detailing the Full information relating the Contract that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTFSFSRES_FCUBSBODY',
'This.xsd gives the message format for detailing the Full responce information relating the BC Contract Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to authorise a new LS(Loan Syndication) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTIOPKREQ_FCUBSBODY1',
'This.xsd gives the message format for detailing the Full information relating the BC Contract that is authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTIOPKREQ_FCUBSBODY2',
'This XSD gives the message format for a request to authorise a new LE(Leasing) Payment',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTIOPKRES_FCUBSBODY',
'This.xsd gives the message format for detailing the Full responce information relating the BC Contract for which interest has been paid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTPK',
'Include Auth Payment PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTPK1',
'include auth payment PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSE',
'Include Auth Payment Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSEPK',
'Indicate Aut hPayment Response PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSEPK1',
'include auth payment response PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSE_CHECKERSTAMP',
'indicate check stamp',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSE_INSTALLMENTPAYMENT',
'Indicate installment(s)' || chr(10) || 'Y:yes' || chr(10) || 'N:no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSE_REVRCHECKERSTAMP',
'Indicates the checkrstamp of  reversal of contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPAYMENTRESPONSE_REVRMAKERSTAMP',
'Indicates the makerstamp of  reversal of contract.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPROVISIONLDCONTRACTFSFSREQ_FCUBSBODY',
'This XSD gives the format for primary request for creation of' || chr(10) || '								LD Contract Provision',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHPROVISIONLDCONTRACTFSFSRES_FCUBSBODY',
'This XSD gives the message format for a Response to Authorize the LD Provision',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHQUERYSRREQTYPE_FCCREF',
'Indicates FlexCube Contract Refence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGFSRESPONSE',
'Indicates Mortgages Authorize RENOG FS details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGFSRESPONSE1',
'Indicates Consumer Lending Authorize RENOG FS details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new MO(Mortgages) product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to authorize the Renog Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGPK',
'Indicates Mortgages Authorize RENOG PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGPK1',
'Indicates Consumer Lending Authorize RENOG PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGPKRESPONSE',
'Indicates Mortgages Authorize RENOG PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRENOGPKRESPONSE1',
'Indicates Consumer Lending Authorize RENOG PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHRGHTS',
'Indicates Auth Rights' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE',
'Mortgages Account Rollover Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE1',
'Consumer Lending Account Rollover Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE_CRROLLSETT',
'Consumer Lending  Credit Rollover Settlement Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE_DRROLLSETT',
'Consumer Lending  Debit Rollover Settlement Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE_ROLLLOANDET',
'Mortgages Account Rollover Loan Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERFSRESPONSE_ROLLLOANDET1',
'Consumer Lending Account Rollover Loan Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to create a new CL(Retail Lending) product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERIOPKRES_FCUBSBODY',
'This XSD gives the message format for a request to authorize the Rollover Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERPK',
'Consumer Lending Account Rollover PK Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHROLLOVERPKRESPONSE',
'Consumer Lending Account Rollover PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEBLOCKDEALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Blockdeal that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEBLOCKDEALIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the Contract that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSECINSTRREQFULLTYPE',
'Securities Instrument Definition Auth Request Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSECINSTRRESFULLTYPE',
'Securities Instrument Definition Auth Response Full Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSECINSTRRESTYPE',
'Securities Instrument Definition Auth Response Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEDEALFSFSREQ_FCUBSBODY',
'This XSD gives the message format for authorization request of the SE Deal contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEDEALFSFSRES_FCUBSBODY',
'This XSD gives the message format for Full response of the authorization request of SE Deal contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEDEALIOPKRES_FCUBSBODY',
'This XSD gives the message format for primary key response of the authorization request SE Deal contract',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSEINSTRUMENTFSFSREQ_FCUBSBODY',
'This XSD gives the message format for Authorization Of a Instr.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSKLOCATIONCHANGEFSFSREQ_FCUBSBODY',
'This XSD gives the message format for authorization request of the SDblockrelease',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSKLOCATIONCHANGEFSFSRES_FCUBSBODY',
'This XSD gives the message format for Full response of the authorization request',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSKLOCATIONCHANGEIOPKRES_FCUBSBODY',
'This XSD gives the message format for primary key response of the authorization request',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSRPAYMENTFSFSREQ_FCUBSBODY',
'Includes the Full Request information regarding the Authorization of Securities Repo Payment.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT',
'Indicates Authorization Status' || chr(10) || '	U - Unauthorized' || chr(10) || '	A - Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT1',
'Specifies whether the record is authorized or not' || chr(10) || 'A: authorised' || chr(10) || 'U: unauthorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT10',
'Indicates the authorisation status. Values A=Authorised,U=Un authorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT11',
'Indicate authorisation statsu' || chr(10) || 'A:authorised' || chr(10) || 'U:Unauthorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT12',
'Indicates the Authorization Status of the deal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT13',
'Indicates Authorization status of the record Authorized/Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT14',
'Indicates Auth Status' || chr(10) || '' || chr(10) || 'A for Authorized; U for Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT2',
'Indicates the record Authorization status.' || chr(10) || 'Authorized : A' || chr(10) || 'UnAuthorized : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT3',
'Indicates Auth status' || chr(10) || '' || chr(10) || 'Authorised     : A' || chr(10) || 'Unauthorized : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT4',
'Indicates Authorization Status' || chr(10) || '' || chr(10) || 'A for Authorized; U for Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT5',
'Indicates Authorization Status' || chr(10) || 'Authorised : A Unauthorised : U',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT6',
'Indicates Authorization Status' || chr(10) || 'Authorised  "A"' || chr(10) || 'Unauthorised "U"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT7',
'Indicate Authorisation status.' || chr(10) || 'A:authorised' || chr(10) || 'U:unauthorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT8',
'Specifies whether the record is authorized or not',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTAT9',
'Indicate auth status' || chr(10) || '' || chr(10) || 'A authorised' || chr(10) || 'U unauthorised',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATS',
'Indicates Authorization Status' || chr(10) || '	A - Active' || chr(10) || '	L - Liquidated' || chr(10) || '	V - Reversed' || chr(10) || '	H - Hold' || chr(10) || '	I - Inactive' || chr(10) || '	Y - Uninitiated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATTYPE',
'Authorization status Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUS',
'Indicates Authorization Status' || chr(10) || '	A - Authorization Status' || chr(10) || '	U - Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEIOPKREQ_FCUBSBODY',
'This XSD gives the message format for a request to auth a MO(Mortgages) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEIOPKREQ_FCUBSBODY1',
'This XSD gives the message format for a request to auth a CL(Retail Lending) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEIOPKREQ_FCUBSBODY2',
'This XSD gives the message format for a request to auth a LE(Leasing) status change',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEPK',
'Authorization of Mortgages Account Status Change - PK Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEPK1',
'Authorization of Consumer Lending Account Status Change - PK Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGEPK2',
'Authorization of Leasing Account Status Change - PK Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEFULL',
'Authorization of Mortgages Account Status Change - response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEFULL1',
'Authorization of Consumer Lending Account Status Change - response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEFULL2',
'Authorization of Leasing Account Status Change - response Full Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEFULL_ACCESN',
'Indicates Accrual Event Sequence Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK',
'Authorization of Mortgages Account Status Change - PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK1',
'Authorization of Consumer Lending Account Status Change - PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK2',
'Authorization of Leasing Account Status Change - PK Response Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCEVENTUSERDEF',
'Authorization of Mortgages Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCEVENTUSERDEF1',
'Authorization of Consumer Lending Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCEVENTUSERDEF2',
'Authorization of Leasing Account Status Change - User Defined Event Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCSTCHCHARGES',
'Authorization of Mortgages Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCSTCHCHARGES1',
'Authorization of Consumer Lending Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHSTATUSCHANGERESPONSEPK_ACCSTCHCHARGES2',
'Authorization of Leasing Account Status Change - Charge Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHTCDENOMINATIONSFSFSREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a request for Authorization of TCDenominations. This request is a full screen request which includes even input only fields and the display fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHTCDENOMINATIONSFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the TC Denominations Query that are successfully defined in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHTCDENOMINATIONSIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Authorization request for TCDenominations.This is the normal request which has Input fields only',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHTCDENOMINATIONSIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the TC Denominations that has been successfully displayed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHUNDRLC',
'Indicates Undertake entire LC on STP' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMI',
'Indicates Consumer Lending Authorize Value Date Amendment details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMI1',
'Indicates Leasing Authorize Value Date Amendment details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIFSFSREQ_FCUBSBODY',
'This XSD gives the message format for a request for authorization of Vami',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIIO',
'Indicates Consumer Lending Authorize Value Date Amendment IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIIO1',
'Indicates Leasing Authorize Value Date Amendment IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIIOPKRES_FCUBSBODY',
'This XSD gives the format of response message for a new MO(Mortgages) Vami Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIIOPKRES_FCUBSBODY1',
'This XSD gives the format of response message for a new CL(Retail Lending) Vami Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIIOPKRES_FCUBSBODY2',
'This XSD gives the format of response message for a new LE(Leasing) Vami Authorization',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIPK',
'Indicates Consumer Lending Authorize Value Date Amendment PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIPK1',
'Indicates Leasing Authorize Value Date Amendment PK details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES',
'Indicates Consumer Lending Authorize Value Date Amendment Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES1',
'Indicates Leasing Authorize Value Date Amendment Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRESIO',
'Indicates Authorize Value Date Amendment IO Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRESPK',
'Indicates Consumer Lending Authorize Value Date Amendment PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRESPK1',
'Indicates Leasing Authorize Value Date Amendment PK Response details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES_CLCOMPDET',
'It indicates LE Components details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES_CLTAXES',
'It indicates LE Tax details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES_COMPBAL',
'It indicates Components balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES_INSTLDETS',
'It indicates Installement details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVAMIRES_VAMIACTION',
'Indicates Recomputstion Basis',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVPPAYMENTFSFSRES_FCUBSBODY',
'This XSD gives the message format for providing Full information of the VP Payment details that are successfully Authorized in FLEXCUBE UBS',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVPPAYMENTIOPKREQ_FCUBSBODY',
'This XSD gives the format in which the external system has to send a Auth request for VPPayment.This is the normal request which has Input only fields',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTHVPPAYMENTIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information relating the VPPayment that has been successfully Authorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_ADHOCCHG_RES_PK',
'It indicates Authorize Adhoc PK Response details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_AM_FULL_TYPE',
'Authorize Full Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_AM_FULL_TYPE1',
'Asset Management Authorize Full Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_BC_REQ_IO_TYPE',
'Includes the Bills and collections IO Type Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_CCY',
'Indicates Authorization Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DATE',
'Indicates Authorized Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DETAILS',
'Indicates the participants Authorization details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DETAILS_IO',
'Includes  Bills and Collections-Amount Amendment Authorization-IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DETAILS_IOTYPE',
'Include Loans and Deposits authorisation  response IO type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DETAILS_PK',
'Includes  Bills and Collections-Amount Amendment Authorization-Primary key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_DETAILS_TYPE',
'Include Loans and Deposits authorisation  type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_INSTSTATCHG_RES_PK',
'It indicates Authorize Installment Status Change PK Response details of Mortgages module',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_LD_RES_PK_TYPE',
'Include Loans and Deposits authorisation  response PK type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_MC_PK_RES_TYPE',
'Indicates Primary Key Details of Islamic Money Market Authorization Operation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_MC_REQ_IO_TYPE1',
'Indicates Input Only Details of Islamic Money Market Authorization Operation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_QUERY_SR_REQ_TYPE',
'Indicates Input Only Details Securities Repo Authorization Query Request',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_REJ_RMRKS',
'Indicates Auth Reject Remarks',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_RES',
'Authorization of Securities Instrument Definition Response Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_RES_FULL',
'Authorization of Securities Instrument Definition Full Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_SR_PK_RES_TYPE',
'Indicates Primary Key Details Securities Repo Authorization Query Response',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_SR_REQ_TYPE',
'SR Contract Authorization Response Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_STAT',
'Indicates Authorization Stauts.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTH_STATUS',
'Indicates Authorized' || chr(10) || '	A - Authorized' || chr(10) || '	U - Unauthorized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTINITNCORPACT',
'Indicates Auto Initiation of Corporate Action' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTMSTL',
'Indicates Automatic Money Settlement' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOACC',
'Indicates Auto Account' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOACPTOADVFLAG',
'Indicates Auto Change Form Acceptance To Advance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOALLOCATPARTPMNT',
'Indicates Auto Allocate Part Payment' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOAUTH',
'Indicates Auto Authorization' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOCLOSURE',
'Indicates Auto Closure' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOCNFCLSDEAL',
'Indicates Auto Confirm Continuous Linked Settlements Deals' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOCORP',
'Indicates Auto Initiation of Corporate Action' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOCREXRATEAMT',
'This specifies the limit amount for a credit transaction to the account using PC module to automatically pickup the exchange rate.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOCRSCORE',
'Indicates Automated Score',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODEALREF',
'Indicates Auto Deal Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODEBIT',
'Indicates Auto Debit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODECISION',
'Indicates Auto Decision' || chr(10) || '	Y - Required' || chr(10) || '	N - Not Required',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODECREQD',
'Indicates Auto Decision Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODEPBAL',
'Indicates Auto Deposit Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODEPDETAILS',
'This Node Indicates the Auto Deposit details for the customer Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODISPATCH',
'Indicates Auto Dispatch' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTODREXRATEAMT',
'This specifies the limit amount for a debit transaction to the account using PC module to automatically pickup the exchange rate.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOEXCHRATEREQD',
'Indicates Auto Exchange Rate' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOFRWD',
'Indicates Forward' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOGENUSRREF',
'Indicates Auto Generate User Reference' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOGEN_STMTPLAN',
'Indicates Auto Generated Statement Plan' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQ',
'Indicates Auto Liquidation.' || chr(10) || 'Yes "Y"; No "N".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQD',
'Indicates Auto Liquidation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQDNALLOWED',
'Indicates Auto Liquidation Allowed' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQFLAG',
'Indicates Auto Liquidate BC Contracts' || chr(10) || '	A - on' || chr(10) || '	M - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQFLAG1',
'Indicates Auto Liquidate IB Contracts' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQFLG',
'Indicates Auto Liquidate' || chr(10) || '	M - Off' || chr(10) || '	A - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQFORCORPACT',
'Indicates whether Corporate Actions should be Auto Liquidated',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQRETRYCNT',
'Indicates Auto Liquidation Retry Count',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOLIQRVPMNT',
'Indicates Auto Liquidation Reverse Payment.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMANDSTL',
'Indicates the Auto DSTL.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMANFLG',
'Indicates Auto Processing',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMANRLOVR',
'Indicates Rollover' || chr(10) || '	A - Auto' || chr(10) || '	M - Manual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMANROLL',
'Indicates Rollover Mode' || chr(10) || '	A - Auto' || chr(10) || '	M - Manual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMANUALPICKUP',
'Indicates Auto Manaul Pick up.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMNLPKUP',
'Indicates Auto Pickup' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMSTL',
'Indicates Auto MSTL' || chr(10) || '	A - on' || chr(10) || '	M - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMSTL1',
'Indicates Auto MSTL' || chr(10) || '' || chr(10) || 'A for On; M for Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOMSTL2',
'Indicates the Auto MSTL.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOODOVERRIDE',
'Indicates Process Overdraft for Auto Book' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOORMANUAL',
'Indicates whether Auto or Manual.A - Auto, M - Manual.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOPAY',
'Indicates Auto Payment Takedown',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOPROVREQ',
'Indicates Auto Provisioning Required',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOPROVREQ1',
'This indicates whether provisioning to be automatically done for the account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTORELALLOW',
'Indicates Auto Release Allow' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTORELALLOW1',
'Indicates Auto Release Allow' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKLVL',
'Indicates Reorder Cheque Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKLVL1',
'If the Cheque Book is to be automatically re-ordered, this element specifies the minimum number of unused cheque leaves at which automatic re-order will be triggered.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKLVS',
'Indicates Reorder No of Leaves',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKLVS1',
'If the Cheque Book is to be automatically re-ordered, this element indicates the number of leaves to be issued in the reordered Cheque Book.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKR',
'Indicates Auto Reorder Cheque Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKREQ',
'Indicates Auto Reorder of Cheque Book' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREORDERCHKREQ1',
'Indicates whether the Cheque Book is to be automatically reordered on completion of the already issued cheque book.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTORESP',
'Indicates Auto Response' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOREVERSE',
'Indicates Reverse' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOROLL',
'Indicates Auto Rollover' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOROLL1',
'Auto roll over',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOROLLEXT',
'Indicates Auto Extension' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOROLLOVER',
'Indicates Automatic Rollover' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOSERIALNO',
'Indicates Auto Serial Number' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOSTATCHANGE',
'Indicates Status Change Automatic',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTOSTATCHANGE1',
'This specifies whether the account to be automatically attributed to a better status or worst status depending on the payment history.' || chr(10) || 'Valid values are:' || chr(10) || 'Y - Yes' || chr(10) || 'N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_ACP_TO_ADV',
'Indicates Auto Change From Acceptance To Advance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_AUTH_LIQ_BILL',
'Indicates Auto Authorize Liquidated Bill' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_CHEQUE_BOOK_REQ',
'Indicates Auto Cheque Book Request' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_CLOSE_COLLATERAL',
'Indicates Close Collateral' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_CLOSE_COLLATERAL1',
'Indicates Auto Close Collateral' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_CR_POOL_LI',
'Indicates Auto Create Pool and Line' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_DEBIT_CARD_REQUEST',
'Indicates Auto Debit Card Request' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_DEPOSIT',
'Indicates Auto Deposit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_EXERCISE',
'Indicates Auto Exercise' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_LIQD',
'Indicates Auto Liquidate' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_LIQD_BASIS',
'Indicates Auto Liquidation Basis' || chr(10) || '	M - Minimum Amount Due' || chr(10) || '	A - % of Amount Due',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_MANUAL_FLAG',
'Indicates Auto/Manual Flag' || chr(10) || '	M - Manual' || chr(10) || '	A - Auto',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_MAN_ROLLOVER',
'Indicates Rollover Mode.' || chr(10) || 'Auto "A"; Manual "M"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_PROV_REQD',
'Indicates Auto Provision Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_REDISPATCH',
'Indicates Auto Redispatch' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_RESPONSE',
'Indicates Automatic Response' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTO_ROLLOVER',
'Indicates Auto Rollover' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTPROVREQD',
'Indicates Auto Provisioning' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTREJRMK',
'Indicates Authorize Reject Remarks',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTREJRMKTYPE',
'Indicates Automatic Reject Remarks',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTREORDRCHKLVLS',
'Indicates Reorder Level',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTRES',
'Indicates Auto Response' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AUTRES1',
'Indicates Auto Response.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILABLE',
'Indicates whether Credit Line is Available',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILABLE_AMOUNT',
'Indicates Available Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILDT',
'Indicates Available Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILFLG',
'Indicates Available' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILLIC_AMNT',
'Indicates Available License Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILLIM',
'Indicates Available Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILMENTS_TXNSTAT',
'Indicates Status' || chr(10) || '	V - Reversed' || chr(10) || '	S - Closed' || chr(10) || '	A - Active' || chr(10) || '	K - Cancel' || chr(10) || '	H - Hold',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILQTY',
'Indicates Available Quantity',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAILQTY_LICAMT',
'Indicates Available Qty/License amt',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVAIL_SYN_AMT',
'Indicates Available Syndication Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVALBALREQD',
'Indicates Available Balance Check Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVGBALREQD',
'Indicates Average Balance Required' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVGBALRETENTDAYS',
'Indicates MIS Average Balance Retention Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVG_BAL_REQD',
'Indicates Average Bal Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLAMT',
'Indicates Availment Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLBAL',
'Indicates Availabe Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLCR',
'This field refers to credit turnover in account currency.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLDUNDRTKGAMT',
'Indicates Availed Undertaking Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLFLG',
'Indicates Available' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLNTUNDRTKNAMT',
'Indicates Availed Not Undertaking Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLTYP',
'Indicates Availment Type' || chr(10) || '	P - Payment' || chr(10) || '	A - Acceptance' || chr(10) || '	N - Negotiation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVLUNDRTKNAMT',
'Indicates Available Undertaking Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVL_CONF_AMT',
'Indicates Available Confirmed Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVL_INFO',
'Indicates Availability Information' || chr(10) || '	I - Immediate' || chr(10) || '	V - On Value Date' || chr(10) || '	N - After Days with New Value Date' || chr(10) || '	A - After X days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AVL_UNCONF_AMT',
'Indicates Available Unconfirmed Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AWI1',
'Indicates the first line of Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AWI2',
'Indicates the second line of Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AWI3',
'Indicates the third line of Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AWI4',
'Indicates the fourth line of Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AWI5',
'Indicates the fifth line of Account with Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_AXN_DATE_TIME',
'Indicates Action Date and Time',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BACKTOBACK',
'Indicates Back To Back LC' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BACKVALEFFDT',
'Indicates Back Value Effective Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAD_DEBT_GL',
'Indicates Bad Debt expense GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAL',
'Indicates Account Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALAN',
'Indicates Balancing or Not' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCE',
'Indicates Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCE1',
'Indicates Balanace.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCE2',
'It indicates Balance of GL details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCECURRENCY',
'Indicates Balance Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCEONHAND',
'Indicates Balance On hand',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCETYPE',
'Indicates Balance Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCE_TRNSFER_LOG',
'Include Balance Trnsfer Log details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALANCING',
'Indicates Balancing' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALCHKBAT',
'Indicates Balance Check' || chr(10) || '	R - Reject' || chr(10) || '	D - Delinquency Tracking' || chr(10) || '	F - Force Debit' || chr(10) || '	P - Partial Delinquency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALLOONAMT',
'Indicates Balloon Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALLOONPRINC',
'Indicates Balloon + Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALLOONREQD',
'Indicates Balloon Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALRPTSINCE',
'Indicates Report Transactions Since' || chr(10) || '	941 - 941' || chr(10) || '	940 - 940' || chr(10) || '	950 - 950',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALRPTTYP',
'Indicates Of' || chr(10) || '	P - Primary' || chr(10) || '	S - Secondary' || chr(10) || '	T - Tertiary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALTRFRONMISRECLS',
'Indicates Transfer Balance on MIS Reclassification' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALTRNSFRLOG',
'Balance Transfer Log',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BALTYPE',
'Indicates Balance Type' || chr(10) || '	D - Debit' || chr(10) || '	C - Credit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAL_ENQUIRY',
'Balance Enquiry',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAL_TRFR_ON_MIS_RECLASS',
'Indicates Transfer Balance on MIS Reclassification' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAL_UPDATE_THRU_PPC',
'Indicates Available Balance Update Through PPC' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANCASSURANCE_NAV',
'Indicates NAV',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANC_ASSURANCE',
'Indicates Banc Assurance Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKAC',
'Indicates Bank Account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKACCCY',
'Indicates Bank Account Currency Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKACDESC',
'Indicates Bank Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKACPTN',
'Indicates Bankers Acceptance' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKADDPROFIT',
'Indicates Bank Profit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKCODE',
'Indicates Bank Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKCODE1',
'It indicates the unique code of the Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKCODETYPE',
'Bank Code Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKDIRFULLTYPE',
'Indicates Bank Directory Maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKDIRIOTYPE',
'Indicates Input Only Details of Bank Directory Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKERACCEPT',
'Indicates whether Banker Acceptance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKERSACCEPT',
'Indicates the Bankers Acceptance.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKERS_ACCEPTANCE',
'Indicates Banker''s Acceptance Issue' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKGRADE',
'Indicates Bank Grade',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKING_PRIORITY',
'Indicates Banking Priority.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKOPERCD',
'Indicates Bank Operation Code' || chr(10) || '	SPAY - SPAY' || chr(10) || '	SPRI - SPRI' || chr(10) || '	CRED - CRED' || chr(10) || '	SSTD - SSTD',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKPRIOR',
'Indicates Banking Priority' || chr(10) || '	U - Urgent Payment' || chr(10) || '	N - Normal Payment' || chr(10) || '	H - Highly Urgent Payments',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKSCORE',
'Indicates Bank Score',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANKSHAREPERC',
'Indicates Bank Share %',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_ACCOUNTS',
'Bank Accounts',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_ACCOUNTSTYPE',
'Asset Management Bank Account Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_ADDRESS1',
'Indicates Bank Address 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_ADDRESS2',
'Indicates Bank Address 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_ADDRESS3',
'Indicates Bank Address 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_NAME',
'Indicates Bank Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_OPERCD',
'Indicates Bank Operation Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_OPER_CODE',
'Indicates Bank Operation Code' || chr(10) || '	CRED - CRED' || chr(10) || '	SPAY - SPAY' || chr(10) || '	SPRI - SPRI' || chr(10) || '	SSTD - SSTD',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_REDIRECT',
'Indicates Bank Redirect',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BANK_REF_NO',
'Indicates Bank Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAREF',
'Indicates Placement/Loan Ref',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAREF1',
'Indicates BA Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAREF2',
'Indicates Placement/Loan Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARR',
'Indicates Barrier',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRALLWD',
'Barrier Allowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRERALLOW',
'Indicates Barrier Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRIERTYP',
'Indicates Barrier Type' || chr(10) || '	SKIN - Single Knock In' || chr(10) || '	SKOT - Single Knock Out' || chr(10) || '	DKIN - Double Knock In' || chr(10) || '	DKOT - Double Knock Out',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRTYPE',
'Indicates Barrier Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRTYPE1',
'Maturity Financial Center',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRWNDENDDT',
'Indicates Barrier Window End Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BARRWNDSTRTDT',
'Indicates Barrier Window Start Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BAS366',
'Indicates 366 Basis' || chr(10) || '	Y - Leap Year' || chr(10) || '	D - Leap Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASAMT',
'Indicates Basis Amount' || chr(10) || '' || chr(10) || 'Expected Outstanding Face Value : O' || chr(10) || 'Expected Balance                : E',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASDTCOD',
'Indicates Base Date Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASECCY',
'Indicates Fund Base Currency Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASECRITYFLAG',
'Indicates Upload Security' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASEDATE',
'Indicates Base Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASEDTEDESC',
'Indicates Base Date Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASEFREQ',
'Indicates Base Frequency' || chr(10) || '	W - Weekly' || chr(10) || '	1M - Monthly' || chr(10) || '	2M - Bi-monthly' || chr(10) || '	3M - Quarterly' || chr(10) || '	4M - Once in 4 Months' || chr(10) || '	5M - Once in 5 Months' || chr(10) || '	6M - Semiannually' || chr(10) || '	7M - Once in 7 Months' || chr(10) || '	8M - Once in 8 Months' || chr(10) || '	9M - Once in 9 Months' || chr(10) || '	10M - Once in 10 Months' || chr(10) || '	11M - Once in 11 Months' || chr(10) || '	12M - Anually',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASELEM',
'Indicates Basis Element',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASE_AMT',
'Indicates Base Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASE_CURRENCY',
'Indicates Base Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASE_RATE',
'Indicates Base Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASICAMNTTAG',
'Indicates Basic Amount Tag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASICAMTCATG',
'Indicates Amount Category' || chr(10) || '	D - Overdue' || chr(10) || '	X - Expected' || chr(10) || '	N - Normal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS',
'Indicates Basis' || chr(10) || '	A - Amount Financed' || chr(10) || '	P - Outstanding Principal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS366',
'Indicates Basis 366' || chr(10) || '	D - Leap Date' || chr(10) || '	Y - Leap Year',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS3661',
'Indicates the BASIS_366',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMNTAG',
'Indicates Basis Component',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMNTCATG',
'Indicates Category' || chr(10) || '	X - Expected' || chr(10) || '	D - Overdue' || chr(10) || '	N - Normal' || chr(10) || '	O - Outstanding',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMNTTAG',
'Indicates Basis Amount Tag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMNTTYP',
'Indicates Amount Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMT',
'Indicates Basis Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISAMTTAG',
'Indicates Amount Tag',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISBALTYPE',
'Indicates Basis Balance Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASISPER',
'Indicates Basis Percentage.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS_AMT_CURR',
'Indicates Basis Amount Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS_AMT_TO',
'Indicates Basis Amount To',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS_AMT_TXN_COD',
'Indicates Basis Amount Txn Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASIS_PERC',
'Indicates Basis Percent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BASKETREF',
'Indicates Basket Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATAUTH_DE_REQ_IO_TYPE',
'Includes Data Entry Batch Authorize Request Input Only details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATBROWDTLS',
'Batch Browser Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHAUTHORIZEFSFSREQ_FCUBSBODY',
'This XSD gives the message format for detailing the Full request information to Authorize a Batch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHAUTHORIZEFSFSRES_FCUBSBODY',
'This XSD gives the message format for detailing the Full response information to Authorize a Batch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHAUTHORIZEIOPKREQ_FCUBSBODY',
'This XSD gives the format Primary request which has Input only  fields to Authorize a Batch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHAUTHORIZEIOPKRES_FCUBSBODY',
'This XSD gives the message format for detailing the primary information to Authorize a Batch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHNO',
'Indicates the Batch number used to input the transaction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHNOTYPE',
'Batch Number Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHREFENUM',
'Indicates Batch Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHREFNO',
'Indicates Batch Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHSEQNO',
'Indicates Batch Sequence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHTOTAMT',
'Indicates Batch Total Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHTOTDELETEFSFSREQ_FCUBSBODY',
'This XSD gives the format Full request to Delete a Batch in Batch Browser',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHTOTDELETEFSFSRES_FCUBSBODY',
'This XSD gives the format full response to Delete a Batch in Batch Browser',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHTOTDELETEIOPKREQ_FCUBSBODY',
'This XSD gives the format Primary request which has Input only  fields To Delete a Batch in Batch Browser',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCHTOTDELETEIOPKRES_FCUBSBODY',
'This XSD gives the format Primary Response  to Delete a Batch in Batch Browser',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_AUTHORIZE',
'Includes Data Entry Batch Authorize details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_AUTHORIZE_IO',
'Includes Data Entry Batch Authorize Input Only details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_AUTHORIZE_PK',
'Includes Data Entry Batch Authorize Primary Key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_MASTER',
'Single Journal Master Type.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_NO',
'Indicates Batch Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BATCH_SEQ_NO',
'Indicates Batch Seq No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCBRANCHPARM',
'Bills  and  Collections Branch Parameters Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCCLLNK',
'BC - CL Linkage',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCCYDESC',
'Indicates Base Currency Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKCALCFLAG',
'Indicates Back Value Recalculation Flag' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKVALCHKREQD',
'Indicates Back Valued Check Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKVALDAYS',
'Indicates Back Value Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKVALDSCHDLS',
'Indicates Pay Past Schedules' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKVALDTFLG',
'Indicates Back Value Dated Entry Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCKVALLMTDAYS',
'Indicates Back Value Limit Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCK_VAL_ADJ_AMT',
'Indicates Back Value Adjustment Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCPREFDET_INTBASIS',
'Indicates Profit Basis' || chr(10) || '	1 - 30-Euro/360' || chr(10) || '	2 - 30-US/360' || chr(10) || '	3 - Actual/360' || chr(10) || '	4 - 30(Euro)/365' || chr(10) || '	5 - 30-US/365' || chr(10) || '	6 - Actual/365' || chr(10) || '	7 - 30(Euro)/Actual' || chr(10) || '	8 - 30(US)/Actual' || chr(10) || '	9 - Actual/Actual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCPREF_RATECDPREF',
'Indicates Middle Rate' || chr(10) || '	M - Middle Rate' || chr(10) || '	B - Buy /Sell Rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCREFNO',
'Indicates BC Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCREFNO1',
'Indicates BC Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCTBSINTCHGCALC_INTBASISA',
'Indicates Profit Basis' || chr(10) || '	6 - Actual/365' || chr(10) || '	0 - Actual/364' || chr(10) || '	1 - 30(Euro)/360' || chr(10) || '	2 - 30-US/360' || chr(10) || '	4 - 30-Euro/365' || chr(10) || '	3 - Actual/360' || chr(10) || '	5 - 30-US/365' || chr(10) || '	7 - 30-Euro/Actual' || chr(10) || '	8 - 30(US)/Actual' || chr(10) || '	9 - Actual/Actual' || chr(10) || '	-1 - 30(Euro)/364' || chr(10) || '	-2 - 30-US/364',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCTBSINTCHGCALC_INTBASISB',
'Indicates Profit Basis' || chr(10) || '	6 - Actual/365' || chr(10) || '	3 - Actual/360' || chr(10) || '	0 - Actual/364' || chr(10) || '	1 - 30(Euro)/360' || chr(10) || '	2 - 30-US/360' || chr(10) || '	4 - 30-Euro/365' || chr(10) || '	5 - 30-US/365' || chr(10) || '	7 - 30-Euro/Actual' || chr(10) || '	8 - 30(US)/Actual' || chr(10) || '	9 - Actual/Actual' || chr(10) || '	-1 - 30(Euro)/364' || chr(10) || '	-2 - 30-US/364',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BCTBSINTCHGCALC_INTBASISD',
'Indicates Profit Basis',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BDWACNO',
'Indicates Journal Account Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENACC',
'Indicates Beneficiary Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENACC1',
'Indicates Benificiary Account.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENACNO',
'Indicates Beneficiary Account Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENBANK',
'Indicates Beneficiary Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENBRANCH',
'Indicates Beneficiary Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENCCY',
'Indicates Benificiary Currency Code.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENCONFREQD',
'Indicates Beneficiary Confirmation Required' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENCUST',
'Indicates Benificiary Customer.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENDET1',
'Indicates Beneficiary details1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENDET2',
'Indicates Beneficiary details2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENDET3',
'Indicates Beneficiary details3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFCIF',
'Indicates the Beneficiary of Promotions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFICIARY_EMAIL_ID',
'Indicates Beneficiary Email Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFICIARY_FACEBOOK_ID',
'Indicates Beneficiary Facebook Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFICIARY_TELEPHONE',
'Indicates Beneficiary Telephone',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFINST1FORCOVER',
'Indicates Beneficiary Institution 1 For Cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFINST2FORCOVER',
'Indicates Beneficiary Institution 2 For Cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFINST3FORCOVER',
'Indicates Beneficiary Institution 3 For Cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFINST4FORCOVER',
'Indicates Beneficiary Institution 4 For Cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFINST5FORCOVER',
'Indicates Beneficiary Institution 5 For Cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEFORDERTYPE',
'Indicates Beneficiary Order',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_CTRY',
'Indicates Beneficiary Country',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST1_FOR_COVER',
'Indicates Field 1 of Beneficiary Institution for Cover in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST2_FOR_COVER',
'Indicates Field 2 of Beneficiary Institution for Cover in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST3_FOR_COVER',
'Indicates Field 3 of Beneficiary Institution for Cover in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST4_FOR_COVER',
'Indicates Field 4 of Beneficiary Institution for Cover in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST5',
'Indicates the details of the institution in favour of which the payment is made can be entered',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST5_FOR_COVER',
'Indicates Field5 of Beneficiary Institution for Cover in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INST6',
'Country to which the beneficiary institution belongs',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INSTITUTION1',
'Indicates Field 1 of Beneficiary Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INSTITUTION2',
'Indicates Field 2 of Beneficiary Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INSTITUTION3',
'Indicates Field 3 of Beneficiary Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INSTITUTION4',
'Indicates Field 4 of Beneficiary Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEF_INSTITUTION5',
'Indicates Field 5 of Beneficiary Institution in Swift Message details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENEXPIRY',
'Indicates Benefit End on Scheme Expiry' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENF',
'Indicates Beneficiary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADD1',
'Indicates Beneficiary Address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADDR1',
'Beneficiary address Line 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADDR2',
'Beneficiary address Line 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADDR3',
'Beneficiary address Line 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADDR4',
'Beneficiary address Line 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFADDR5',
'Indicates Benificiary 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFAX',
'Indicates Fax Number of Ultimate beneficiary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFNAME',
'Indicates Beneficiary Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENFNM',
'Indicates Benificiary Name.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENIBANMAND',
'Indicates Beneficiary IBAN Mandatory' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINST1',
'Indicates Beneficiary Institution 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINST2',
'Indicates Beneficiary Institution 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINST3',
'Indicates Beneficiary Institution 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINST4',
'Indicates Beneficiary Institution 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINST5',
'Indicates Beneficiary Institution 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINSTCOVR1',
'Indicates For Cover 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINSTCOVR2',
'Indicates For Cover 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINSTCOVR3',
'Indicates For Cover 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINSTCOVR4',
'Indicates For Cover 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENINSTCOVR5',
'Indicates For Cover 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENMAIL',
'Indicates Email Address of Ultimate beneficiary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENMOB',
'Indicates Mobile Number of Ultimate beneficiary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENPLANDESC',
'Indicates Benefit Plan Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENPLANID',
'Indicates Benefit Plan ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENTYPE',
'Indicates Benefit Type' || chr(10) || 'Variance : V' || chr(10) || 'Waive    : W',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENVALBASIS',
'Indicates Benefit Validity Basis' || chr(10) || 'Days   : D' || chr(10) || 'Months : M' || chr(10) || 'Years  : Y',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BENVALPD',
'Indicates Benefit Validity Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BEN_ACCOUNT',
'Indicates BEN Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BEN_ACC_BRN',
'Indicates Beneficiary A/C Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BEN_BANK',
'Indicates BEN Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BEN_CUST',
'Indicates Beneficiary Customer ID',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BEN_NAME',
'Indicates BEN Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BERMUDAN_SCHEDULE',
'Bermudan Schedule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BG_DETAILS',
'Indicates Guarantee Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BICCODEAWI',
'Indicates Account With Institution Bank Identification Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BICDESC',
'Indicates GAAP Code Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BICDESC1',
'BIC Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BICMAINT',
'BIC Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BIC_CODE',
'Includes BIC Code details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BIC_CODE1',
'Indicates BIC Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BIC_DESAC',
'BIC Code Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLAMT',
'Indicates Bill Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLAMT1',
'Indicates Billed Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLCCY',
'Indicates Bill Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLCYCLELIQNMONTH',
'Indicates Billing Cycle Liquidation Month' || chr(10) || '	1 - January' || chr(10) || '	2 - February' || chr(10) || '	3 - March' || chr(10) || '	4 - April' || chr(10) || '	5 - May' || chr(10) || '	6 - June' || chr(10) || '	7 - July' || chr(10) || '	8 - August' || chr(10) || '	9 - September' || chr(10) || '	10 - October' || chr(10) || '	11 - November' || chr(10) || '	12 - December',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLCYCLEPERIODICITY',
'Indicates Billing Cycle Periodicity' || chr(10) || '	M - Monthly' || chr(10) || '	Q - Quarterly' || chr(10) || '	H - Half Yearly' || chr(10) || '	Y - Anually',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLDDPRODCATEG',
'Indicates Demand Draft Product Category',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLDT',
'Indicates Bill Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLDUEAMT',
'Indicates Outstanding Balance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLDUEDAYS',
'Indicates Billing Due Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLINGLIQD',
'Indicates Billing Liquidation' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLINGPREFMASTER',
'This Node Indicates the Billing Preference details for  the customer account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLINVOICEDAYS',
'Indicates Invoice Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLINVOICEFREQ',
'Indicates Invoice Details' || chr(10) || '	A - Ad hoc' || chr(10) || '	P - Periodic',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLLIQD',
'Indicates Billing Liquidation' || chr(10) || '	A - Auto' || chr(10) || '	M - Manual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLLIQDGL',
'Indicates Billing Liquidation GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLNO',
'Indicates Bill Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLNOTICEDAYS',
'Indicates Notice Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLNOTICEREQDFLAG',
'Indicates Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLOS',
'Indicates Bill Outstanding Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLPRODCD',
'Indicates Billing Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLREF',
'Indicates Bill Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLREFNO',
'Indicates Trade Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLREFNO1',
'Indicates Bill Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILLS_DETAILS',
'Indicates Bills Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILL_AMT_CRYSTALLIZED',
'Indicates Bill Amount to be Crystallized',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILL_CYCLE',
'Indicates Bill Cycle',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILL_DUE_AMT',
'Indicates Bill Due Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILL_NOTICE_DAYE',
'Indicates Bill Notice Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BILL_OF_LADING_DOC',
'Indicates Bill Of Lading' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BIRTH_COUNTRY',
'Indicates Birth Country',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BIZDT',
'Business Date (Bank Date)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKACBRCH',
'Indicates Booking account Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKACC',
'Indicates Bankers Accept' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKACCTYP',
'Indicates Booking Account Type' || chr(10) || '	I - Interest' || chr(10) || '	C - Charge',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKDATE',
'BK Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKDPMETH',
'Indicates Accounting Basis' || chr(10) || '	A - Accrual' || chr(10) || '	N - Non Accrual',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKDT',
'Belongs to Booking Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKFLG',
'Indicates Book',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKKVALCONCCY',
'Indicates Contract Equiv. Book value',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKLCYEQ',
'Indicates amount in Local Currecy equivalent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKMTHD',
'Indicates Booking Menthod',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKRGHTSFLG',
'Indicates Rights' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKUNEARNEDINT',
'Indicates Book Unearned Profit' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BKWRNTIVFLG',
'Indicates Warrants' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BK_EFFDT',
'Indicates Blacklist Effective Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BK_EXPDT',
'Indicates Blacklist Expiry Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLACKLISTED',
'Indicates Blacklisted' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLACKLISTEDDRAWER',
'Indicates Drawer Black listed' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLFAILREPDT',
'Indicates Blacklist Failure Report Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLFAILREPMOD',
'Indicates Blacklist Failure Report Mode',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK',
'Indicates Blocked' || chr(10) || '' || chr(10) || 'Y for Yes; N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKAMT',
'Indicates Block Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKAMTFLG',
'Indicates Bulk Amount' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKDLSTAT',
'This field is internally used by GUI.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKISSEXP_EXPAMT',
'Indicates Exposure Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKLMTBRNREST',
'Branch Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKLMTCCYREST',
'Currency Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKPRD',
'Indicates Block Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKSIDIARYMST',
'Standing Instruction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKSTATUS',
'Indicates Block Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKTRNREFNO',
'Indicates Bulk Transaction Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKTXNREF',
'Indicates Bulk Transaction Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLKTYPE',
'Indicates Bulk Entity Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ACCPROD_STATUS_GL_DETAILS',
'General Ledgers',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ADHOC_BOOKSCH',
'Schedule For Book',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ADHOC_TAXSCH',
'Schedule For Tax',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_BILL_NOTICE',
'Billing Notice',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CFTMS_PRODUCT_CCY_RATES',
'Rates',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CFTMS_PRODUCT_CURRENCY_LIMITS',
'Currency Limits',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CFTMS_PRODUCT_DIARY_EVENT__DY',
'Product Diary Event',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CFTMS_PRODUCT_ICCF',
'ICCF',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CFVWS_ACCR_FEE',
'Accrual Fee',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_COMP_FRM_BOOK',
'Book Formula',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_COMP_FRM_INTERMEDIATE',
'Intermediate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_COMP_FRM_MORATORIUM',
'Moratorium',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_ACCPROD_STATUS_GL',
'Account Product Status GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_INS_ACCESS_FOR_DEAL_PRD__INS_ACC',
'Instrument Access',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_INS_PRD_RES_FOR_DEAL_PRD__INS_RES',
'Instrument Product Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PF_ACCESS_FOR_DEAL_PRD__PF_ACC',
'Portfolio Access',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PF_PRD_RES_FOR_DEAL_PRD__PF_RES',
'Portfolio Product Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PRODUCT',
'Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PRODUCT_CLASS_LINK',
'Product Class Linkage',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PRODUCT_STATUS_ADVICES',
'Product Status Advices',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_CSTMS_PRODUCT_STATUS_GL',
'Product Status GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_DETMS_TIL_VLT_CCY_PARAMS',
'Currency Preferences',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_EGTM_POS_DETAIL',
'Position Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_EVENT_DETAILS',
'Events',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_EVENT_RULES_ADV',
'Advice Rules',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_EXEC_LOG',
'Execution Date Detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_EXEC_LOGDTL',
'Execution Retry Detail',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_FIX_METHOD',
'Fixed Method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_FXTMS_BRANCH_PARAMETERS',
'Foreign Exchange Branch Parameters',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_HOLPERIOD_DET',
'Holiday Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ICTMS_PR_CHG_PRODS',
'Charge Products',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ICTMS_PR_CHG_SLAB',
'Slab',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ICTMS_PR_CHG_TXN',
'Transactions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ICTM_RULE_SDE',
'Indicates System Elements',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ICTM_RULE_UDE',
'Indicates User Elements',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_INSTALLMENT_CHGS',
'Installment Charges',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_INSTALL_STATUS',
'Installment Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_INTERMEDIATE_EXPR',
'Expression',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ISS_EXP',
'Includes Issuer And Exposure Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LDTMS_PRODUCT_DFLT_SCHEDULES',
'Schedules',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LDTMS_PRODUCT_GRACE_LEVELS',
'Grace Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LDTMS_PRODUCT_LIQ_ORDER',
'Liquidation Order',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LDTMS_TRS_COMPONENTS',
'TRS Components',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LSTMS_PRODUCT_CCY_DAYS',
'Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LS_CCY_DAYS',
'Currency Days',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_LS_EXRATE_CCY',
'Currencies',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_MIN_AMT_DUE_EXPR',
'Minimum Amount Due Expression',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_MIN_AMT_RULE',
'Minimum Amount Rule',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_MITMS_DEFAULT_CODES',
'Default Codes',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_MSTMS_MSG_ADDRESS',
'Message Address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_NOTCONF',
'Notary Confirmation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_OTTMS_PRODUCT_SCHEDULE',
'Schedule Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PCTMS_PRODUCTS_CHG_DETAILS',
'Charge Details 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PCTMS_PRODUCTS_CHG_DETAILS__SET2',
'Charge Details 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PCTMS_PRODUCTS_CHG_DETAILS__SET3',
'Charge Details 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PCTMS_PRODUCTS_CHG_DETAILS__SET4',
'Charge Details 4',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PCTMS_PRODUCTS_CHG_DETAILS__SET5',
'Charge Details 5',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PRODUCT_BANKS',
'Bank Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PRODUCT_DDNOTICES_DTLS',
'Instrument Notice Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PRODUCT_DELIQUENCY_DTLS',
'Delinquency Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PRODUCT_MADC',
'Product Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_PRODUCT_STATEMENTS',
'Statements',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_REKEY_DET',
'Authorization Rekey',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_RESTR_PWD',
'Restrictive Password',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_REVISION_NOTICES',
'Revision Notices',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_RLTNSHPLNK',
'Relationship Linkage',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_ROLE_TO_HEAD',
'Role To Head Mapping',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_DEALPRODUCT_RESTRICTIONS',
'Portfolio Restriction',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_DEALPROD_SECURITY_ACCESS',
'Security Access',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_PFOLIOPROD_RESTRICTIONS',
'Portfolio Restrictions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_PFOLIO_PROD_SECACCESS',
'Portfolio Product Security Access',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_PRICE_DETAIL',
'Securities Price Definition Maintenance',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_PRODUCT_VARIANCE',
'Interest Currency Limits',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_SECURITY_PRODUCT',
'Security Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SETMS_SK_ACCOUNT',
'Safe Keeping Location Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SEVWS_CERT_DETAIL__A',
'Certificates Blocking',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_QUEUE_RIGHTS',
'Queues',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_RESTRICTIVE_PASSWD',
'Restricted Password',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_ROLE_BRANCHES',
'Branches',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_ROLE_BRANCH_LIMITS',
'User Limits',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_ROLE_DETAIL__B',
'Roles',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_USER_FUNC_DISALLOW',
'Functions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_USER_LIMITS_ROLE',
'Limits Role',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_SMTB_USER_TILLS',
'Tills',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STATUS_ACCT_ENTRY',
'Accounting Entries',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STATUS_CHGS',
'Charges',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STATUS_DET',
'Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STATUS_LEVEL',
'Account Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STATUS_POLCS',
'Policies',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_AMTBLK_ORDER',
'Amount Block Order',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_INTERIM_CR_AMT',
'Credit Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_INTERIM_DR_AMT',
'Debit Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_PRODUCTS',
'Products',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_REPORT_GEN_TIME',
'Report Generation Time',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACLASS_TXNCODE',
'Transaction Codes',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_ACL_NOTICE_PREF',
'Notice Preferences',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_BRANCH_CCY',
'Branch Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_BRN_MSG_TYPE',
'Message Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_GI_FUNCTIONS',
'Global Interdict Functions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTMS_SWIFT_ADDRESS',
'SWIFT Address',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_STTM_ACC_PARAM',
'Account Parameters',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_TATMS_PRODUCT_SCHEME',
'Scheme',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_TATMS_PRODUCT_TAX',
'Tax Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_TATM_PRODUCT_CCY_TAX',
'Currency Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLK_TATM_SCHEME',
'Tax Scheme',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLNCCHK',
'Indicates Balancing Check' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCK',
'Indicates Blocked' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKDT',
'Indicates Block Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKED',
'Indicates Blocked (Yes/No)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKREF',
'Indicates Block Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKREFNO',
'Indicates Block Refernce Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKRELEASEAUTHREQTYPE_CONTRACTCHANGELOG',
'Includes Contract Change Log details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCKTYPE',
'Indicates Block Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCK_DEALREFNO',
'Indicates Block Deal Reference',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCK_DEAL_MASTER',
'Modification of Securities Block Deal Master Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCK_DEAL_MASTER_IO',
'Modification of Securities Block Deal IO Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BLOCK_OR_REDEM',
'Indicates Block' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNACODE',
'Indicates BNA',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNDANNMETH',
'Indicates Annualizing Method' || chr(10) || '' || chr(10) || 'Simple  : S' || chr(10) || 'Compound : C',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNFINSTCVR4',
'Indicates Beneficiary Institution for cover',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNFINSTUTN1',
'Indicates Beneficiary Institution',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNKCITY',
'Indicates Bank City',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNKPRIORITY',
'Indicates Banking Priority' || chr(10) || '	H - Highly Urgent' || chr(10) || '	U - Urgent' || chr(10) || '	N - Normal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNKRSACPTNCE',
'Indicates Bankers Acceptance' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNKSACPT',
'Indicates Bankers Acceptance Issue' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNK_CODE',
'Indicates Bank code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNK_VALD',
'Indicates Bank Value Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BNK_WISE_SUMMARY',
'Bank Wise Local Currency Summary',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BODY',
'Indicates Body',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BONDS',
'Indicates the Bonds. M - Market Value, B - Book Value, F - Face Value.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOND_DAY_COUNT_DR',
'Indicates Day Count Method Denominator' || chr(10) || '	L - 360' || chr(10) || '	H - 365',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOND_DAY_COUNT_NR',
'Indicates Day Count Method Numerator' || chr(10) || '	A - Actual' || chr(10) || '	E - 30-Euro' || chr(10) || '	U - 30-US',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BONUSENCASHED',
'Indicates Bonus Encashed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKACC',
'Indicates Interest Booking Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKACC1',
'Indicates Booking Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKACCBRN',
'Indicates Interest Booking Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKACCDESC',
'Indicates Interest Booking Account Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKAMT',
'Indicates Booking Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKBRN',
'Indicates Booking Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKCCY',
'Indicates Booking Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKDT',
'Indicates Book Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKDT1',
'Indicates Booked On date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKEXDT',
'Indicates Booking Exchange rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKFLG',
'Indicates Booked Flag' || chr(10) || 'Booked "B"' || chr(10) || 'Non Booked "N"' || chr(10) || 'Tax "T"',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKINGDATE',
'Indicates the Booking Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKINGDT',
'Indicates Booking Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKINGMETHOD',
'Indicates Booking Method' || chr(10) || 'Advance "1"; Arrears "2".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKING_ACC',
'Indicates Booking Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKMTHD',
'It indicates the Booking method',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKRIGHTS',
'Indicates the Book Rights.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKST',
'Indicates Booking Status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKUNEARNINT',
'Indicates Book Unearned Profit' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOKWARRANTS',
'Indicates the Book Warrants.Y - Yes, N - No.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOK_CCY',
'Indicates Book Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOK_FLAG',
'Indicates Book Flag' || chr(10) || '	B - Booked' || chr(10) || '	N - Non Booked' || chr(10) || '	T - Tax',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOK_RIGHTSIV_FLAG',
'Indicates Rights' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOK_TAX_TO_EXP_AC',
'Indicates Book Tax To Expense Account' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOOK_WARRANTSIV_FLAG',
'Indicates Warrants' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOP',
'Indicates Break Open Period',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORLENIND',
'Indicates the Borrow \ Lend Indicator',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORNBY',
'Indicates Borne By' || chr(10) || '	B - Bank' || chr(10) || '	C - Customer',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORNE_BY1',
'Indicates Borne By' || chr(10) || '	R - Remitter Account' || chr(10) || '	B - Beneficiary Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORRLEND',
'Indicates the Borrowing "B"/Lending "L"/Mid rate "M".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORRMKTPOS',
'Indicates Borrower Market Position',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER',
'Indicates Borrower',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER1',
'Indicates Borrowing Customer.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER2',
'Indicates Borrower Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERBRN',
'Indicates Borrower Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERDDENTITIES_PRIM',
'Indicate Primary' || chr(10) || 'Y:yes' || chr(10) || 'N:no',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERDDPRD_BORROWERDRAWDOWNPRODUCT',
'Indicates Drawdown Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERDDPRD_PRODUCTDESCRIPTIONDD',
'Indicates Drawdown Product Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWEREXRATECCY_DDCCY',
'Indicate DD  currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERLIABNO',
'Indicates Borrower Liability',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERNO',
'Indicates Borrower Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERTRPRD_BORROWERTRANCHEPRODUCT',
'Indicates Tranche Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWERTRPRD_PRODUCTDESCRIPTIONTR',
'Indicates Tranche Product Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_CCY_DETAILS',
'Includes Borrower Currency details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_CUSTTYP',
'Indicates Customer Type' || chr(10) || '	C - Corporate' || chr(10) || '	I - Individual' || chr(10) || '	B - Bank',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DDENTITIES',
'Includes Borrower-DDEntities details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DDENTITIES1',
'Include borrower entities',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DETAILS',
'Borrower Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DRAWDOWN_COMP',
'Indicateborrower drawdown component details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DRAWDOWN_PROD',
'Borrowers Drawdown Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_DRAWDOWN_PRODUCT',
'Drawdown Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_ENTITIES',
'Borrowers Entities.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_EVENT',
'Indicates Borrower Event',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_EVENT_DATE',
'Indicates Borrower Event  Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_EVENT_SEQ_NO',
'Indicates Borrower Event sequence Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_EXRATE_CCY',
'Include borrower EXRATE  currency details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_INTRATE_CCY',
'Include borrower INTRATE currency details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_NAME',
'Indicates Borrower Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_NOTC_CCY',
'Include borrower NOTC currency details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_REF_NO',
'Indicates Borrower Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_SAMEASCOR',
'Indicates Same as Correspondence Address' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_TRANCHE_PRODUCT',
'Tranche Product',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWER_VALUE_DATE',
'Indicates Borrower Value Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWLENDID',
'Indicates Indicator' || chr(10) || '	L - Lend' || chr(10) || '	M - Mid' || chr(10) || '	B - Borrow',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROWPRF',
'Indicates Borrower Profile',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORROW_LEND_IND',
'Indicates Borrow Lend Indicator' || chr(10) || '	L - Lend' || chr(10) || '	M - Mid' || chr(10) || '	B - Borrow',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BORR_PROD_LIMIT',
'Borrower Product Limit.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTACC',
'Indicates Bought Discount Deal Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTACCBRN',
'Indicates Bought Account Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTAMT',
'Indicates Bought Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTCCY',
'Indicates Bought Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTDEALAMT',
'Indicates Bought Discount Deal Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTFTREF',
'Indicates Fund Transfer Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTPREMDIS',
'Indicates Bought Premium Discount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTRATE',
'Indicates Bought Interest rate',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTSRCREF',
'Indicates Risk Netting Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOTVALDT',
'Indicates Bought Value date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOXCODE',
'Indicates Box Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOXDESC',
'Indicates Box Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOXDIMENSION',
'Indicates Box Dimension',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOX_DIM',
'Indicates Box dimension',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BOX_TYPE',
'Indicates Box Type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BPDRSUMMARY_TXNSTAT',
'Indicates Status' || chr(10) || '	O - Open' || chr(10) || '	C - Closed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH',
'Indicates Branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH1',
'Indicates Branch 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH2',
'Indicates Branch 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH3',
'This is the Branch of FLEXCUBE where the transaction would be recorded. This needs to be a valid Branch code as maintained in FLEXCUBE.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHCCYRESTRICTIONS_BRNLST',
'Indicates Branch Restrictions' || chr(10) || '	D - Disallowed' || chr(10) || '	A - Allowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHCCYRESTRICTIONS_CCYLST',
'Indicates Currency Restrictions' || chr(10) || '	D - Disallowed' || chr(10) || '	A - Allowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHDETAILS',
'Branch Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHDETAILS_DESCRIPTION',
'Indicates Branch Group Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHDETAILS_ENDOFINP',
'Indicates EOC Status' || chr(10) || '	N - Transaction Input' || chr(10) || '	T - End of Transaction Input' || chr(10) || '	F - End of Financial Input' || chr(10) || '	E - End of Day' || chr(10) || '	B - Beginning of Day',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHDETAILS_PROVSNGFREQ',
'Indicates Provisioning Frequency' || chr(10) || '	D - Daily' || chr(10) || '	M - Monthly',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHDETAILS_TRANSFERTYPE',
'Indicates Transfer Type' || chr(10) || '	P - Position' || chr(10) || '	R - Revaluation',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHES_LIST',
'Indicate branches list',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHGRP',
'Indicates Branch Group',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCHSWIFTADDRESS_SWFTADRSDESC',
'Indicates SWIFT Address Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_ALLOWED',
'Indicates Branch Restrictions' || chr(10) || '	A - Allow' || chr(10) || '	D - Disallow',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_CODE',
'Indicates branch code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_DATE',
'Indicates Branch Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_DATE_FULL',
'Includes Branch Sysyem Dates Querying Full type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_DATE_IO',
'Includes Branch Sysyem Dates Querying Input Only type details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_GROUP',
'Indicates ARC Branch Group',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_GROUP_DESCRIPTION',
'Indicates ARC Branch Group Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANCH_RESTRICTION',
'Indicates Branch To be Considered for Computation' || chr(10) || '	A - Allowed' || chr(10) || '	D - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRANDCODE',
'Indicates Brand Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRBROKERFULLTYPE',
'Indicates Full Screen Details of Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRBROKERFULLTYPE_RECSTAT',
'It indicates the Record status whether it is Open (O) or Closed (C)',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRBROKERIOTYPE',
'Indicates Input Only Details of Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRDEFCHG',
'Indicates Broker Modified',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BREAKOPNDT',
'Indicates Break Open Date',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BREQTYPE',
'Indicates Bulk Request Type' || chr(10) || '	R - Regular' || chr(10) || '	A - Ad hoc',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRHUSERLMT',
'Indicates User Limit',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRIDGEGL',
'Indicates Suspense General Ledger',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRIDGL',
'Indicates Bridge GL',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRK',
'Indicates Broker code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKACC',
'Indicates Broker Account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKACCCCY',
'Indicates Broker Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKACCDTLS',
'It indicates the Broker Account Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKACCREKEY',
'Indicates Broker Account Key' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKAMT',
'Indicates Broker Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKAMTACCCCY',
'Indicates Amount in Account Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKAMTCONCCY',
'Indicates Amount In Contract Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKCCY',
'Indicates Broker Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKCONFSTAT',
'Indicate broker confirmation status',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKDEPOSITFRST',
'Indicates Break Deposits First' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKDETAILS',
'Includes Broker Master details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKDETAILTYPE_BOOKAMT',
'Indicates the Booking Amount for the brokerage.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKDETAILTYPE_BOOKCCY',
'Indicates the Booking currency for the booked amount for the brokerage.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKDETAILTYPE_LREFNO',
'Indicates Latest Reference Number',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKID',
'Indicates Broker Id',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKIDREKEY',
'Indicates Broker Id Key' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKMASTERTYPE',
'Indicates Brokerage Master Information',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKMASTERTYPE_BRKAMT',
'Indicates the Brokerage Amount for the deal.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKMASTERTYPE_BRKCCY',
'Indicates the Brokerage Currency for the deal.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKPERCENT',
'Indicates Broker Percent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKRCATEG',
'It indicates Category of the Broker' || chr(10) || 'Broker "B"' || chr(10) || 'Clearing Member "C"' || chr(10) || 'Exchange "E".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKRCITY',
'It indicates City of the Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKRCNTRY',
'It indicates Country of the Broker where he is residing',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKRNAME',
'It indicates Name of the Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRKRSTRT',
'It indicates Street of the Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRK_CONF_DT',
'Indicates the Broker Reference Date.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRK_CONF_REF',
'Indicates the Broker Reference Number.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRK_CONF_REM',
'Indicates the Broker Remarks.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRLIQ',
'Includes the Full request information regarding the Deletion of Brokerage Liquidation.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRLIQ_IO',
'Includes the IO Request Information regarding the Deletion of Brokerage Liquidation.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRLIQ_PK',
'Includes the Primary key information regarding the Input of Brokerage Liquidation.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRMASTER_FULL',
'Includes the Full Request information regarding the Authorisation of Broker Master Maintenace.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRMASTER_IO',
'Includes the IO Request information regarding the Authorisation of Broker Master Maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRMASTER_PK',
'Includes the primary key information regarding the Authorisation of Broker Master Maintenance.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRN',
'Indicates Branach Code.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNADDR1',
'Indicates Branch Address Line 1',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNADDR2',
'Indicates Branch Address Line 2',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNADDR3',
'Indicates Branch Address Line 3',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNAVALSTAT',
'Indicates Branch Available Status' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNCD',
'Indicates Branch Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNCOD',
'Indicates Branch of Split Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNDD',
'Indicates the drawndown branch',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNDESC',
'Indicates Branch Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNHOLMAT',
'Indicates Include Branch Holiday' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNLCY',
'Indicates Local Currency',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNLCYDESC',
'Indicates Local Currency Description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNLIST',
'Branch List',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNLST',
'Indicates Branch Restrictions' || chr(10) || '	A - Allowed' || chr(10) || '	D - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNMOV',
'Indicates Branch Move' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNMOVAUTH',
'Indicates Auth Branch Move' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNNAME',
'Indicates Branch Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNPRDRTHDTLD',
'Role To Head Mapping Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNRES',
'Indicates Branch Restriction' || chr(10) || '	A - Allowed' || chr(10) || '	D - Disallowed',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRNTYPE',
'Branch type',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRN_RESTR',
'Branch Restrictions',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKAMT',
'Indicates Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKARAGEALLWD',
'Indicates Brokerage Allowed' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKDETAILS',
'Broker Details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER',
'Indicates Broker',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER1',
'Indicates Broker Identification',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER2',
'Indicates the Broker Code of the broker involved in the deal.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERACC',
'The Broker ID / the commission IDs Corresponding account',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERACCDESC',
'The Brokers Account description',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERAGEALLOWED',
'Indicates Brokerage Allowed' || chr(10) || '	Y - Yes' || chr(10) || '	N - No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERAGE_DETAILS',
'Indicates Brokerage details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERAGE_MASTER',
'Includes Brokerage Master details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERCMEXCHANGE',
'Indicates Category' || chr(10) || 'Broker "B"' || chr(10) || 'Clearing Member "C"' || chr(10) || 'Exchange "E".',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERCMID',
'The Broker ID / the commission ID for the Deal',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKERNAME',
'Indicates the brokers name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER_ACCOUNT_SCHEME_FULL',
'Includes Exchange Traded Derivatives- Broker Account Scheme Authorization details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER_ACCOUNT_SCHEME_IO',
'Includes Exchange Traded Derivatives- Broker Account Scheme Authorization-IO details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKER_ACCOUNT_SCHEME_PK',
'Includes Exchange Traded Derivatives- Broker Account Scheme Creation-Primary key details',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKNAME',
'Indicates Broker Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKPAID_BY_US',
'Indicates Brokerage to be paid by us' || chr(10) || '	N - Off' || chr(10) || '	Y - on',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BROKPERCENT',
'Indicates Brokerage Percent',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRWLENDIND',
'Indicates Borrow Lend Indicator' || chr(10) || '	B - Borrow' || chr(10) || '	L - Lend' || chr(10) || '	M - Mid',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BRWLENDINDCR',
'Specifies The Borrow Lend Indicator' || chr(10) || '' || chr(10) || '1 : Borrow : B' || chr(10) || '' || chr(10) || '2 : Lend : L' || chr(10) || '' || chr(10) || '3 : MID : M',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BR_BROKER_QUERY_REQ',
'Includes the request information regarding the Query of Broker Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BR_BROKER_QUERY_RES_FULL',
'Includes the Full Response Information regarding the Query of Broker Details.',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUDGETCD',
'Indicates Budget Code',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUDGETTRACKREQFLAG',
'Indicates Budget Tracking Required' || chr(10) || '	Y - on' || chr(10) || '	N - Off',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUDTRRQFLG',
'Indicates Budget Track Required' || chr(10) || 'Y for Yes;N for No',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUILDERNAME',
'Indicates Builder Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUILDINGCOMPNAME',
'Indicates Building compound Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUILDINGNAME',
'Indicates Building Name',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BUILTUPAREA',
'Indicates Built Up Area',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BULKAMTFLG',
'Indicates Bulk Amount',
'ENG'
)
;
END;
/
BEGIN
INSERT INTO CSZB_COMMENTS
(COMMENT_ID,COMMENT_TEXT,LANGUAGE_CODE)
 VALUES 
('CMT_BULKCASHLETTERDTL_PROCESSSTATUS',
'Indicates Status' || chr(10) || '	U - Unprocessed' || chr(10) || '	S - Success' || chr(10) || '	F - FAILURE' || chr(10) || '	H - Hold',
'ENG'
)
;
END;
/



commit;
