PROMPT PROCESSING FOR OLZM_MESSAGE_TEMPLATE_001

BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ADVANCEUNU_P',
'*****' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'APPU12',
TO_DATE('04/06/2012','DD/MM/YYYY'),'APPU11',
TO_DATE('04/06/2012','DD/MM/YYYY'),'NOTC',
'advance unutilised participant fee',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ADVFEEPART',
'*****' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'APPU11',
TO_DATE('04/06/2012','DD/MM/YYYY'),'APPU12',
TO_DATE('04/06/2012','DD/MM/YYYY'),'NOTC',
'Advance fee for participant',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ADV_BORR_LC',
'ode #  :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '	      ' || chr(10) || '	          Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '' || chr(10) || '	          Ref                  :  _FACILITY-NAME_' || chr(10) || '' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '' || chr(10) || '	          Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>CONTACT</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ 2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'APPU11',
TO_DATE('02/07/2012','DD/MM/YYYY'),'APPU12',
TO_DATE('02/07/2012','DD/MM/YYYY'),'NOTC',
'Advance message for borrower LC fee',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ADV_STDNBY_P',
'*******' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'APPU12',
TO_DATE('02/07/2012','DD/MM/YYYY'),'APPU11',
TO_DATE('02/07/2012','DD/MM/YYYY'),'NOTC',
'Message for advance fee - standby comp for participant',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BABRPRE',
'' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ 2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE 19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'FAX NO: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('01/05/2009','DD/MM/YYYY'),'VF92373',
TO_DATE('01/05/2009','DD/MM/YYYY'),'NOTC',
'Borrower ABR Prepayment Notice',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BFEDPAY',
'TLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('19/10/2009','DD/MM/YYYY'),'TN13474',
TO_DATE('19/10/2009','DD/MM/YYYY'),'NOTC',
'Borrower Fed Fund Paydown Notice',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BORDEALCLOSE',
'r use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'VF92373',
TO_DATE('28/08/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('28/08/2008','DD/MM/YYYY'),'NOTC',
'Borrower Deal Closing Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BPRIINT',
'9' || chr(10) || '#ENDIF' || chr(10) || '#IF _NON-USD-CCY_' || chr(10) || '' || chr(10) || '                            Bank Code #          :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '		  ' || chr(10) || '	          Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '		    ' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '		    ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '		   ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '		   ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL    :   _ADMIN-EMAIL_' || chr(10) || 'FAX NO  :  _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
26,'DM02665',
TO_DATE('19/10/2009','DD/MM/YYYY'),'TN13474',
TO_DATE('19/10/2009','DD/MM/YYYY'),'NOTC',
'Borrwer Prime Interest Due Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BPRIPAY',
'ASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
27,'DM02665',
TO_DATE('19/10/2009','DD/MM/YYYY'),'TN13474',
TO_DATE('19/10/2009','DD/MM/YYYY'),'NOTC',
'Borrower Prime Paydown Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BRK_FEE_B',
'sip   : _CUSIP-NO_' || chr(10) || '  ' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_             ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'NOTC',
'Borrower Breakage Fee Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BRK_FEE_P',
'e transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'NOTC',
'Participant Breakage Fee Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BSWINGINT',
'************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
14,'VF92373',
TO_DATE('14/05/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('14/05/2008','DD/MM/YYYY'),'NOTC',
'Borrower Swing Interest Due Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BSWINGPAY',
'MIN-EMAIL_' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
18,'PB68632',
TO_DATE('02/05/2007','DD/MM/YYYY'),'AH59340',
TO_DATE('02/05/2007','DD/MM/YYYY'),'NOTC',
'Borrower Swing Line Paydown Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'BSWINGPIN',
'LE_   ' || chr(10) || '#IF _USD-CCY_' || chr(10) || ' ' || chr(10) || '   Bank Code #          :  021000089' || chr(10) || '#ENDIF' || chr(10) || '#IF _NON-USD-CCY_' || chr(10) || '' || chr(10) || '                            Bank Code #          :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '		 ' || chr(10) || '	          Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '		 ' || chr(10) || '	          Account Name         :  Agency/Medium Term Finance' || chr(10) || '		 ' || chr(10) || '	          Ref                  :  _FACILITY-NAME_' || chr(10) || '		 ' || chr(10) || '	          Attn                 :  Global Loans / Agency' || chr(10) || '		 ' || chr(10) || '	          Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*************************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_.' || chr(10) || '' || chr(10) || 'Regards' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_     ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE 19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'FAX NO: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
15,'PB68632',
TO_DATE('02/05/2007','DD/MM/YYYY'),'AH59340',
TO_DATE('02/05/2007','DD/MM/YYYY'),'NOTC',
'Borrower Swing Line Paydown with Interest Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'B_COMM_FEE',
'#RH' || chr(10) || 'Date : _TDATE_' || chr(10) || '#SC' || chr(10) || '_ENTITY-NAME_' || chr(10) || '_RECVRNAME_' || chr(10) || '_RECVRADDRLINE1_' || chr(10) || ' ' || chr(10) || '#EC' || chr(10) || '#EH' || chr(10) || '#PH' || chr(10) || '#EH' || chr(10) || '#B' || chr(10) || ' ' || chr(10) || 'Please be advised that Commitment fees fall due for' || chr(10) || 'payment value  _BILL-UPTO-DATE_' || chr(10) || ' ' || chr(10) || 'Borrower             : _CUSTNAME_' || chr(10) || ' ' || chr(10) || 'Tranche Name         : _TRANCHE-NAME_' || chr(10) || ' ' || chr(10) || '#IF _CUSIP-NO_' || chr(10) || 'ISIN                 : _CUSIP-NO_' || chr(10) || '#ENDIF' || chr(10) || ' ' || chr(10) || '#IF  _$FEECOMP-UNUTIL$_' || chr(10) || ' ' || chr(10) || 'Calculated as follows:' || chr(10) || ' ' || chr(10) || 'Effective date       :  _BILL-UPTO-DATE_' || chr(10) || ' ' || chr(10) || 'Billing Period       :  _FROM-DATE_  to  _ENDDATE_    ' || chr(10) || ' ' || chr(10) || 'Commitment Currency  :  _CONCCY_' || chr(10) || ' ' || chr(10) || 'Commitment Fee Due   :  _TOT-COMP-AMOUNT_       ' || chr(10) || ' ' || chr(10) || 'Detailed Calculations :' || chr(10) || '=============================================================================== ' || chr(10) || ' ' || chr(10) || '  Total          Fee          Day           From         To        No of   Fees ' || chr(10) || '  Unused         Rate        Basis          Date        Date       days    Due           ' || chr(10) || '------------------------------------------------------------------------------- ' || chr(10) || ' ' || chr(10) || '#LOOP   ' || chr(10) || '_BASIS-AMOUNT_  _CRATE_  _FEE-BASIS_    _FROM-DATE_  _TO-DATE_    _DYS__CALCAMNT_' || chr(10) || '#ENDLOOP ===============================================================================' || chr(10) || ' ' || chr(10) || 'Therefore, please remit a total of _CONCCY_ _$L$TOT-COMP-AMOUNT_to:' || chr(10) || '#ENDIF' || chr(10) || ' ' || chr(10) || '#SC' || chr(10) || '_STTLINSTR-1_' || chr(10) || '_STTLINSTR-2_' || chr(10) || '_STTLINSTR-3_' || chr(10) || '_STTLINSTR-4_' || chr(10) || '#EC' || chr(10) || ' ' || chr(10) || 'Regards' || chr(10) || '_ADMIN-NAME_' || chr(10) || 'Citibank International Plc' || chr(10) || 'Tel/Fax: _ADMIN-PHONE-NO_' || chr(10) || 'Email: _ADMIN-FAX-NO_' || chr(10) || '#EB' || chr(10) || '#RF' || chr(10) || '#EF',
'O',
'U',
'N',
1,'RESHMA',
TO_DATE('08/08/2012','DD/MM/YYYY'),'','','NOTC',
'Borrwer Prime Interest Due Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'B_DURFEE',
'   Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '' || chr(10) || '	          Ref                  :  _FACILITY-NAME_' || chr(10) || '' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '' || chr(10) || '	          Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>CONTACT</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_  ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DM02665',
TO_DATE('08/12/2008','DD/MM/YYYY'),'VF92373',
TO_DATE('08/12/2008','DD/MM/YYYY'),'NOTC',
'BORROWER DURATION FEE FAX',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'COMM_FACILIT',
'redit your account for the following:' || chr(10) || '' || chr(10) || 'Facility Fees: _TOT-COMP-AMOUNT_' || chr(10) || '' || chr(10) || '#END IF' || chr(10) || '#END IF' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONTACT' || chr(10) || '*************************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_ .' || chr(10) || '' || chr(10) || 'Regards' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || 'CITIBANK' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 200' || chr(10) || 'NEWCASTLE, DE 19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'FAX NO: 212-994-0961' || chr(10) || '#EB' || chr(10) || '</pre>' || chr(10) || '</td></tr>' || chr(10) || '</table>' || chr(10) || '' || chr(10) || '</body>' || chr(10) || '' || chr(10) || '</html>',
'C',
'A',
'Y',
6,'VIJAY',
TO_DATE('24/01/2007','DD/MM/YYYY'),'PB68632',
TO_DATE('24/01/2007','DD/MM/YYYY'),'NOTC',
'','','MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'COM_FEE_BORR',
'Code #      :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '                           ' || chr(10) || '              Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '                           ' || chr(10) || '              Account Name         :  _SETL-ACCOUNT-NAME_' || chr(10) || '                             ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '                           ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '                           ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_      ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
35,'VF92373',
TO_DATE('14/05/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('14/05/2008','DD/MM/YYYY'),'NOTC',
'Borrower Commitment Fee Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'COM_FEE_PART',
'E 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
27,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Commitment Fee Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'CURTAXMS',
'#B' || chr(10) || '' || chr(10) || 'Dear _CONTACT-ENTITY-NAME_                                                                              ' || chr(10) || '' || chr(10) || 'Our records indicate that the tax form we have on file for the below referenced customer has expired on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Generatlly a Form W-8 will expire at the end of the third succeeding calendar year from instructions below to replace' || chr(10) || 'the expired forms.Failure to submit new Forms W-8 will result in maximum US tax withholding being applied on income ' || chr(10) || 'paid as of _NEXT-YEAR-STARTDAT_. 1.The Form W-8 that had been provided to us for the below referenced customer has expired on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Please complete and return to us the new Forms W-8 as soon as possible. For forms expiring on _EXPIRY-DATE_' || chr(10) || ',Please ensure that the new form is signed on or prior to _NEXT-YEAR-STARTDAT_.        ' || chr(10) || '' || chr(10) || '2.Please mail all tax forms to the address listed below.' || chr(10) || '' || chr(10) || 'Attn: Tax Team- Expired Forms' || chr(10) || 'Citi Global Loans' || chr(10) || '1615 Brett Road, OPS III' || chr(10) || 'New Castle, DE 19720' || chr(10) || '' || chr(10) || 'Thank you for your prompt attention to this matter.' || chr(10) || 'For a copy of the latest W-8 tax form, please refer' || chr(10) || 'to the IRS''s website at <B>www.IRS.gov</B> or consult' || chr(10) || 'with your internal tax counsel' || chr(10) || '' || chr(10) || 'Thank you,' || chr(10) || 'Citi Global Loans Tax Team' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'SHREE01',
TO_DATE('09/08/2012','DD/MM/YYYY'),'SHREE02',
TO_DATE('09/08/2012','DD/MM/YYYY'),'NOTC',
'Current Tax Documentation Expiration',
'C',
'MAIL',
'','N'
)
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'DEALCLOSEFAX',
'thorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'VF92373',
TO_DATE('28/08/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('28/08/2008','DD/MM/YYYY'),'NOTC',
'Deal Closing Fax for Investor',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'FAC_FEE_BORR',
'Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '                           ' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '                             ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '                           ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '                           ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_     ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE 19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'FAX NO: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
20,'PB68632',
TO_DATE('02/05/2007','DD/MM/YYYY'),'AH59340',
TO_DATE('02/05/2007','DD/MM/YYYY'),'NOTC',
'Borrower Facility Fee Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'FAC_FEE_PART',
'***************************************************' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '1615 Brett Road' || chr(10) || 'OPS III' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
24,'VF92373',
TO_DATE('18/03/2011','DD/MM/YYYY'),'DM02665',
TO_DATE('18/03/2011','DD/MM/YYYY'),'NOTC',
'Participant Facility Fee Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'FUTTAXMS',
'#B' || chr(10) || '' || chr(10) || 'Dear _CONTACT-ENTITY-NAME_                                                                              ' || chr(10) || '' || chr(10) || 'Our records indicate that the tax form we have on file for the below referenced customer will expire on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Generatlly a Form W-8 will expire at the end of the third succeeding calendar year from instructions below to replace' || chr(10) || 'the expiring forms.Failure to submit new Forms W-8 will result in maximum US tax withholding being applied on income ' || chr(10) || 'paid as of _NEXT-YEAR-STARTDAT_. 1.The Form W-8 that had been provided to us for the below referenced customer is expiring on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Please complete and return to us the new Forms W-8 as soon as possible. For forms expiring on _EXPIRY-DATE_' || chr(10) || ',Please ensure that the new form is signed on or prior to _NEXT-YEAR-STARTDAT_.        ' || chr(10) || '' || chr(10) || '2.Please mail all tax forms to the address listed below.' || chr(10) || '' || chr(10) || 'Attn: Tax Team- Expired Forms' || chr(10) || 'Citi Global Loans' || chr(10) || '1615 Brett Road, OPS III' || chr(10) || 'New Castle, DE 19720' || chr(10) || '' || chr(10) || 'Thank you for your prompt attention to this matter.' || chr(10) || 'For a copy of the latest W-8 tax form, please refer' || chr(10) || 'to the IRS''s website at <B>www.IRS.gov</B> or consult' || chr(10) || 'with your internal tax counsel' || chr(10) || '' || chr(10) || 'Thank you,' || chr(10) || 'Citi Global Loans Tax Team' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'SHREE01',
TO_DATE('09/08/2012','DD/MM/YYYY'),'SHREE02',
TO_DATE('09/08/2012','DD/MM/YYYY'),'NOTC',
'Future dated Tax documentation expiration message',
'C',
'MAIL',
'','N'
)
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'IABRPRE',
'our information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DM02665',
TO_DATE('01/05/2009','DD/MM/YYYY'),'VF92373',
TO_DATE('01/05/2009','DD/MM/YYYY'),'NOTC',
'Investor ABR Prepayment Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'IFEDPAY',
'E  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor Fed Fund Paydown Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ILIBPRE',
' to a representative' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
26,'APPU01',
TO_DATE('24/08/2012','DD/MM/YYYY'),'APPU02',
TO_DATE('24/08/2012','DD/MM/YYYY'),'NOTC',
'Investor Libor Prepayment Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'IPRIPAY',
'DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
23,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor Prime Paydown Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ISWINGINT',
'he' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
11,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor Swing Line Interest Due Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ISWINGPAY',
'nteraction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
10,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor Swing Line Paydown Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ISWINGPIN',
'dit Principal     :  _COMP-PRINC-AMOUNT_' || chr(10) || '		 ' || chr(10) || '	          Credit Interest      :  _TOT-COMP-AMOUNT_' || chr(10) || '		' || chr(10) || '    Less:Tax Withholding      :  _TOT-TAX-AMOUNT_' || chr(10) || '		' || chr(10) || '	          Total Credit Amount  :  _TOT-PI-AMOUNT_' || chr(10) || '		               ' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
13,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor Swing Paydown with Interest',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'LCFEE_BORR',
'RECV-BIC_' || chr(10) || '' || chr(10) || '	          Account #                 :  _SETL-RECV-ACCOUNT_' || chr(10) || '' || chr(10) || '	          Account Name              :  _SETL-ACCOUNT-NAME_' || chr(10) || '' || chr(10) || '	          Ref                       :  _FACILITY-NAME_' || chr(10) || '' || chr(10) || '	          Attn                      :  Global Loans / Agency' || chr(10) || '' || chr(10) || '	          Ref Cusip                 :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
27,'VF92373',
TO_DATE('14/05/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('14/05/2008','DD/MM/YYYY'),'NOTC',
'Borrower LC Fee Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'LCFEE_PART',
'Fee Due  :  _TOT-LCD-AMT_' || chr(10) || '#ENDIF #IF _FEE-TAX-AMT_' || chr(10) || '       Less: Tax Withholding      :  _FEE-TAX-AMT_' || chr(10) || '#ENDIF  ' || chr(10) || '' || chr(10) || '' || chr(10) || '            Total LC Fee Credit   :  _TOT-ICCF-AMOUNT_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
17,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant LC FEE Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'LC_DD_PART',
' whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
14,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'DNOT',
'LC Investor Drawdown Notification Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'MARGIN_FAX_B',
'sclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'MFAX',
'MARGIN REVISION FAX FOR BORROWER',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'MARGIN_FAX_P',
'ized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'MFAX',
'MARGIN REVISION FOR PARTICIPANT',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'OVL_BPRIIIN',
' 021000089' || chr(10) || '#ENDIF' || chr(10) || '#IF _NON-USD-CCY_' || chr(10) || '' || chr(10) || '                            Bank Code #          :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '		  ' || chr(10) || '	          Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '		    ' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '		    ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '		   ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '		   ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL    :   _ADMIN-EMAIL_' || chr(10) || 'FAX NO  :  _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
4,'DM02665',
TO_DATE('19/10/2009','DD/MM/YYYY'),'TN13474',
TO_DATE('19/10/2009','DD/MM/YYYY'),'NOTC',
'OVL Interim Interest Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'OVL_BPRIPAY',
'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('19/10/2009','DD/MM/YYYY'),'TN13474',
TO_DATE('19/10/2009','DD/MM/YYYY'),'NOTC',
'OVL Paydown Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'OVL_IPRIPAY',
'W CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'OVL Paydown Fax_Participant',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACNOVLIPRII',
'LOOP' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '#IF _TOT-COMP-AMOUNT_' || chr(10) || '' || chr(10) || '              Due Currency         :  _DCCY_' || chr(10) || '' || chr(10) || '              Total Interest Due   :  _TOT-COMP-AMOUNT_' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '<B>Funds Movement</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'We will credit your account with your share of the Interest Due based on the' || chr(10) || 'following details :' || chr(10) || '' || chr(10) || '              Credit Date          :  _BTILLDATE_' || chr(10) || '' || chr(10) || '              Credit Currency      :  _DCCY_' || chr(10) || '' || chr(10) || '              Credit Amount        :  _TOT-COMP-AMOUNT_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '1615 BRETT ROAD' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'NOTC',
'Participated OVL Interim Interest Fax_Participant',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACNOVLIPRIP',
' _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'NOTC',
'Participated OVL Paydown Fax_Participant',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_BRKFE_B',
'sip   : _CUSIP-NO_' || chr(10) || '  ' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_             ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'NOTC',
'Participated Borrower Breakage Fee',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_BRKFE_P',
'cure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DI81166',
TO_DATE('18/05/2009','DD/MM/YYYY'),'AH99777',
TO_DATE('18/05/2009','DD/MM/YYYY'),'NOTC',
'PARTICIPATED INVESTOR BREAKAGE FEE',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_COMFEE',
'9720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Commitment fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_FACFEE',
'***************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'DM02665',
TO_DATE('01/04/2011','DD/MM/YYYY'),'VF92373',
TO_DATE('01/04/2011','DD/MM/YYYY'),'NOTC',
'Participant Facitlity fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_IFEDIIN',
'_' || chr(10) || '' || chr(10) || '              Due Currency         :  _DCCY_' || chr(10) || '' || chr(10) || '              Total Interest Due :  _TOT-COMP-AMOUNT_' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '<B>Funds Movement</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'We will credit your account with your share of the Interest Due based on the' || chr(10) || 'following details :' || chr(10) || '' || chr(10) || '              Credit Date          :  _BTILLDATE_' || chr(10) || '' || chr(10) || '              Credit Currency      :  _DCCY_' || chr(10) || '' || chr(10) || '              Credit Amount        :  _TOT-COMP-AMOUNT_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '1615 BRETT ROAD' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'NOTC',
'Participated Fed Fund Interest Due Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_IFEDPAY',
'IL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'UPLOAD',
TO_DATE('21/10/2011','DD/MM/YYYY'),'NOTC',
'Participated Fed Fund Paydown Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_ILIBPRE',
'tion with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Libor Prepayment Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_IPRIPAY',
'IN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Prime Paydown Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_LCFEE',
'****************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant LC Fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_SYNLCFE',
'********************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Synthetic LC Fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PACN_UTILFEE',
'IL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Utilisation Fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PART_ADVOUT',
'*****' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'APPU11',
TO_DATE('02/07/2012','DD/MM/YYYY'),'APPU12',
TO_DATE('02/07/2012','DD/MM/YYYY'),'NOTC',
'Advance fee processing changes',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PART_DD_DET',
'IELD-VAL-10_' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
4,'APPU02',
TO_DATE('24/08/2012','DD/MM/YYYY'),'APPU01',
TO_DATE('24/08/2012','DD/MM/YYYY'),'NOTC',
'Participant Drawdown Details',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PASTAXMS',
'#B' || chr(10) || '' || chr(10) || 'Dear _CONTACT-ENTITY-NAME_                                                                              ' || chr(10) || '' || chr(10) || 'Our records indicate that the tax form we have on file for the below referenced customer has expired on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Generatlly a Form W-8 will expire at the end of the third succeeding calendar year from instructions below to replace' || chr(10) || 'the expired forms.Failure to submit new Forms W-8 will result in maximum US tax withholding being applied on income ' || chr(10) || 'paid as of _NEXT-YEAR-STARTDAT_ .         ' || chr(10) || '' || chr(10) || '1.The Form W-8 that had been provided to us for the below referenced customer has expired on _EXPIRY-DATE_' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || 'Please complete and return to us the new Forms W-8 as soon as possible. For forms expiring on _EXPIRY-DATE_' || chr(10) || ',Please ensure that the new form is signed on or prior to _NEXT-YEAR-STARTDAT_ .        ' || chr(10) || '' || chr(10) || '2.Please mail all tax forms to the address listed below.' || chr(10) || '' || chr(10) || 'Attn: Tax Team- Expired Forms' || chr(10) || 'Citi Global Loans' || chr(10) || '1615 Brett Road, OPS III' || chr(10) || 'New Castle, DE 19720' || chr(10) || '' || chr(10) || 'Thank you for your prompt attention to this matter.' || chr(10) || 'For a copy of the latest W-8 tax form, please refer' || chr(10) || 'to the IRS''s website at <B>www.IRS.gov</B> or consult' || chr(10) || 'with your internal tax counsel' || chr(10) || '' || chr(10) || 'Thank you,' || chr(10) || 'Citi Global Loans Tax Team' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'SHREE01',
TO_DATE('09/08/2012','DD/MM/YYYY'),'SHREE02',
TO_DATE('09/08/2012','DD/MM/YYYY'),'NOTC',
'Past Tax Documentation Expiration',
'C',
'MAIL',
'','N'
)
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PAYOFF01',
'sessed if the current regular' || chr(10) || 'payment is received after the grace period as specified in your mortgage documents.' || chr(10) || '' || chr(10) || 'The figures on this statement must be verified by the Payoff Department 24 hours prior ' || chr(10) || 'to remittance of payoff funds. Failure to do so may result in an accrual of additional ' || chr(10) || 'per diem interest should you attempt to satisfy this obligation with an insufficient ' || chr(10) || 'payoff amount.	' || chr(10) || '' || chr(10) || '*** Release documents will be prepared and recorded by Citibank once final payoff ' || chr(10) || 'funds are processed.' || chr(10) || '' || chr(10) || 'Check Payments: Only CERTIFIED funds will be accepted, and may be sent to address ' || chr(10) || 'above.' || chr(10) || '	' || chr(10) || 'Wire Payments:											' || chr(10) || '												' || chr(10) || 'Citibank, NA REQUIRES 24-hour notice prior to receipt of wired funds in excess of $250,000.00' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'Payoff funds must be received by 3:00PM, Pacific Time.      ' || chr(10) || 'Funds received after 3:00PM, will be processed the next   ' || chr(10) || 'business day and interest will  continue to accrue.' || chr(10) || '							 ABA# 3211-7118-4		' || chr(10) || '							 *Credit to Account # 056-4000172*' || chr(10) || '							 *Attn: Commercial Loan Service**' || chr(10) || '							 ' || chr(10) || '				      Ref: Please indicate Loan Number**' || chr(10) || '				      ' || chr(10) || '				                         ' || chr(10) || 'Payoff funds CANNOT be accepted at BRANCH OFFICES.       Borrowers Name :.................................		' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'JIGAR01',
TO_DATE('02/05/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('02/05/2012','DD/MM/YYYY'),'PNTC',
'PAY OFF NOTICE 01',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PAYOFF03',
'ments.' || chr(10) || '' || chr(10) || 'The figures on this statement must be verified by the Payoff Department 24 ' || chr(10) || 'hours prior to remittance of payoff funds. Failure to do so may result in an' || chr(10) || 'accrual of additional per diem interest should you attempt to satisfy this ' || chr(10) || 'obligation with an insufficient payoff amount.	' || chr(10) || '' || chr(10) || '*** Release documents will be prepared and recorded by Citibank once final ' || chr(10) || 'payoff funds are processed.' || chr(10) || '' || chr(10) || 'Check Payments: Only CERTIFIED funds will be accepted, and may be sent to ' || chr(10) || 'address above.' || chr(10) || '	' || chr(10) || 'Wire Payments:											' || chr(10) || '												' || chr(10) || 'Citibank, NA REQUIRES 24-hour notice prior to receipt of wired funds in excess of $250,000.00' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'Payoff funds must be received by 3:00PM, Pacific Time.      ' || chr(10) || 'Funds received after 3:00PM, will be processed the next   ' || chr(10) || 'business day and interest will  continue to accrue.' || chr(10) || '							 ' || chr(10) || '					 ABA# 3211-7118-4		' || chr(10) || '					 *Credit to Account # 056-4000172*' || chr(10) || '					 *Attn: Commercial Loan Service**' || chr(10) || '							 ' || chr(10) || '				      Ref: Please indicate Loan Number**' || chr(10) || '				      ' || chr(10) || '				                         ' || chr(10) || 'Payoff funds CANNOT be accepted at BRANCH OFFICES.       Borrowers Name :......' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'JIGAR01',
TO_DATE('02/05/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('02/05/2012','DD/MM/YYYY'),'PNTC',
'PAY OFF NOTICE 03',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PAYOFF04',
'ortg-' || chr(10) || 'age documents.' || chr(10) || '' || chr(10) || 'The figures on this statement must be verified by the Payoff Department 24 ' || chr(10) || 'hours prior to remittance of payoff funds. Failure to do so may result in an' || chr(10) || 'accrual of additional per diem interest should you attempt to satisfy this ' || chr(10) || 'obligation with an insufficient payoff amount.	' || chr(10) || '' || chr(10) || '*** Release documents will be prepared and recorded by ABC Bank once final ' || chr(10) || 'payoff funds are processed.' || chr(10) || '' || chr(10) || 'Check Payments: Only CERTIFIED funds will be accepted, and may be sent to ' || chr(10) || 'address above.' || chr(10) || '	' || chr(10) || 'Wire Payments:											' || chr(10) || '												' || chr(10) || 'Citibank, NA REQUIRES 24-hour notice prior to receipt of wired funds in excess ' || chr(10) || 'of $250,000.00' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'Payoff funds must be received by 3:00PM, Pacific Time.      ' || chr(10) || 'Funds received after 3:00PM, will be processed the next   ' || chr(10) || 'business day and interest will  continue to accrue.' || chr(10) || '							 ' || chr(10) || '			 ABA# 3211-7118-4		' || chr(10) || '			*Credit to Account # 056-4000172*' || chr(10) || '			*Attn: Commercial Loan Service**' || chr(10) || '							 ' || chr(10) || '		      	Ref: Please indicate Loan Number**' || chr(10) || '				      ' || chr(10) || '				                         ' || chr(10) || 'Payoff funds CANNOT be accepted at BRANCH OFFICES.       Borrowers Name :............' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'JIGAR01',
TO_DATE('04/06/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('04/06/2012','DD/MM/YYYY'),'PNTC',
'PAY OFF NOTICE 04',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PAYRECV_B',
'       Remittance Currency  :  _DCCY_' || chr(10) || ' Remittance Amount    :  _NETPAYRECV-AMT_' || chr(10) || '' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
17,'PR58483',
TO_DATE('17/04/2007','DD/MM/YYYY'),'PB68632',
TO_DATE('17/04/2007','DD/MM/YYYY'),'PRLQ',
'Payable Receivable Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PAYRECV_P',
'*******************************************************' || chr(10) || '' || chr(10) || 'Please arrange to Remit the below specified amount due to the above specified' || chr(10) || 'changes occured to the contract :' || chr(10) || '' || chr(10) || '              Remittance Currency  :  _DCCY_' || chr(10) || '              ' || chr(10) || '              Remittance Amount    :  _NETPAYRECV-AMT_' || chr(10) || '' || chr(10) || '#ENDIF' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
8,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'PRLQ',
'Participant Payable Receivable Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PLB_COMFEE_B',
'D-CCY_' || chr(10) || '' || chr(10) || '               Bank Code #      :  _SETL-RECV-BIC_' || chr(10) || '#ENDIF' || chr(10) || '                           ' || chr(10) || '              Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '                           ' || chr(10) || '              Account Name         :  _SETL-ACCOUNT-NAME_' || chr(10) || '                             ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '                           ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '                           ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_      ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'PRIYA02',
TO_DATE('28/03/2012','DD/MM/YYYY'),'PRIYA01',
TO_DATE('28/03/2012','DD/MM/YYYY'),'NOTC',
'Commitment fee for Borrower for Pvt Lbl facility',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PLB_COMFEE_P',
'E 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'PRIYA02',
TO_DATE('28/03/2012','DD/MM/YYYY'),'PRIYA01',
TO_DATE('28/03/2012','DD/MM/YYYY'),'NOTC',
'Pvt Lbl Participant Commitment Fee Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PLB_FAC_FEEB',
'    Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '                           ' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '                             ' || chr(10) || '              Ref                  :  _FACILITY-NAME_' || chr(10) || '                           ' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '                           ' || chr(10) || '              Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_     ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE 19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'FAX NO: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'PRIYA01',
TO_DATE('01/08/2012','DD/MM/YYYY'),'PRIYA02',
TO_DATE('01/08/2012','DD/MM/YYYY'),'NOTC',
'Borrower Facility Fee Fax for PLB',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PLB_FAC_FEEP',
'************************************************************' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '1615 Brett Road' || chr(10) || 'OPS III' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'PRIYA01',
TO_DATE('01/08/2012','DD/MM/YYYY'),'PRIYA02',
TO_DATE('01/08/2012','DD/MM/YYYY'),'NOTC',
'Participant Facility Fee Fax for PLB',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT01',
'- 				    ' || chr(10) || 'Payment Received	:_ESC-PPMT-RECD_' || chr(10) || 'Past Due Amount         :_PAST-DUE-AMT_     Current Amount- ' || chr(10) || '				                  			    Due		     :_CURR-AMT-DUE_' || chr(10) || 'Default Interest        :_DFLT-INT_	' || chr(10) || '				' || chr(10) || '							    Total Payment Due:_TOTAL-DUE_' || chr(10) || '							    Payment Due Date :_DUE-DATE_ ' || chr(10) || '	' || chr(10) || '' || chr(10) || '' || chr(10) || '				Transactions	' || chr(10) || '	' || chr(10) || 'Tran  Description        Tran     Principal Interest  Escrow 	 Late       Ending Principal Balance ' || chr(10) || 'Date       	        Amount			    		 		charge 	' || chr(10) || '' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_ _PRN-AMT_ _INT-AMT_ _ESC-AMT_ _LTCHG-AMT_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '#LOOP' || chr(10) || 'Ending Principal Balance ' || chr(10) || '_END-PRIN-BAL_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '	' || chr(10) || '	' || chr(10) || '	' || chr(10) || 'IMPORTANT MESSAGES	' || chr(10) || '	' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your ' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to ' || chr(10) || 'discuss your loan	' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'JIGAR01',
TO_DATE('02/05/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('02/05/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 01',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT02',
'T-RECD_' || chr(10) || 'Past Due Amount :_PAST-DUE-AMT_Current Amount- ' || chr(10) || '				                  			  Due		     :_CURR-AMT-DUE_' || chr(10) || 'Default Interest        :_DFLT-INT_	' || chr(10) || '				' || chr(10) || '							    Total Payment Due:_TOTAL-DUE_' || chr(10) || '							    Payment Due Date :_DUE-DATE_ ' || chr(10) || '	' || chr(10) || '' || chr(10) || '' || chr(10) || '				Transactions	' || chr(10) || '	' || chr(10) || 'Tran  Description        Tran     Principal Interest  Escrow 	 Late       Ending   ' || chr(10) || 'Date       	                  Amount			    		 	charge  Principal' || chr(10) || '												      Balance	' || chr(10) || '' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_ _PRN-AMT_ _INT-AMT_ _ESC-AMT_ _LTCHG-AMT_' || chr(10) || '#ENDLOOP' || chr(10) || '#LOOP' || chr(10) || '_END-PRIN-BAL_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '	' || chr(10) || '	' || chr(10) || '	' || chr(10) || 'IMPORTANT MESSAGES	' || chr(10) || '	' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your ' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to ' || chr(10) || 'discuss your loan	' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'JIGAR02',
TO_DATE('02/05/2012','DD/MM/YYYY'),'JIGAR01',
TO_DATE('02/05/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 02',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT04',
'T-RECD_' || chr(10) || 'Past Due Amount :_PAST-DUE-AMT_Current Amount- ' || chr(10) || '				                  			  Due		     :_CURR-AMT-DUE_' || chr(10) || 'Default Interest        :_DFLT-INT_	' || chr(10) || '				' || chr(10) || '							    Total Payment Due:_TOTAL-DUE_' || chr(10) || '							    Payment Due Date :_DUE-DATE_ ' || chr(10) || '	' || chr(10) || '' || chr(10) || '' || chr(10) || '				Transactions	' || chr(10) || '	' || chr(10) || 'Tran  Description        Tran     Principal Interest  Escrow 	 Late       Ending   ' || chr(10) || 'Date       	                  Amount			    		 	charge  Principal' || chr(10) || '												      Balance	' || chr(10) || '' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_ _PRN-AMT_ _INT-AMT_ _ESC-AMT_ _LTCHG-AMT_' || chr(10) || '#ENDLOOP' || chr(10) || '#LOOP' || chr(10) || '_END-PRIN-BAL_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '	' || chr(10) || '	' || chr(10) || '	' || chr(10) || 'IMPORTANT MESSAGES	' || chr(10) || '	' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your ' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to ' || chr(10) || 'discuss your loan	' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'JIGAR02',
TO_DATE('02/05/2012','DD/MM/YYYY'),'JIGAR01',
TO_DATE('02/05/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 04',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT05',
'nt Due             :_CURR-MISC-DUE_' || chr(10) || 'Less Partial-' || chr(10) || 'Payment Received  :_ESC-PPMT-RECD_' || chr(10) || '' || chr(10) || 'Past Due Amount   :_PAST-DUE-AMT_   Current Amount-' || chr(10) || '                                    Due      :_CURR-AMT-DUE_' || chr(10) || 'Default Interest  :_DFLT-INT_' || chr(10) || '' || chr(10) || '				                    *********************************************' || chr(10) || '                         	       Total Payment Due      :_TOTAL-DUE_' || chr(10) || '         		                   Payment Due Date       :_DUE-DATE_' || chr(10) || '				                    *********************************************' || chr(10) || '' || chr(10) || '*********************************************************************************' || chr(10) || '            		  Transactions' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'Tran Description   	 Tran     Principal  Interest   Escrow   Late    Ending' || chr(10) || 'Date                     Amount                                 charge  Principal ' || chr(10) || '									                                 Bal' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_  _PRN-AMT_  _INT-AMT_ _ESC-AMT_  _LTCHG-AMT_' || chr(10) || '													 	             _END-PRIN-BAL_' || chr(10) || '									             			        ' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '' || chr(10) || 'IMPORTANT MESSAGES' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
17,'JIGAR01',
TO_DATE('02/07/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('02/07/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 05',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT06',
'ption Tran Principal Interest Escrow Late         Ending' || chr(10) || 'Date              Amount                              charge  Principal Bal' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_ _PRN-AMT_ _INT-AMT_ _ESC-AMT_ _LTCHG-AMT_' || chr(10) || '	             				             _END-PRIN-BAL_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '' || chr(10) || 'IMPORTANT MESSAGES' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
3,'JIGAR01',
TO_DATE('02/07/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('02/07/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 06',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT07',
't Misc-' || chr(10) || 'Amount            : _PAST-DUE-MISC_  Amount Due             : _CURR-MISC-DUE_' || chr(10) || 'Less Partial-' || chr(10) || 'Payment Received  : _ESC-PPMT-RECD_' || chr(10) || '' || chr(10) || 'Past Due Amount   : _PAST-DUE-AMT_   Current Amount-' || chr(10) || '                                    Due                    : _CURR-AMT-DUE_' || chr(10) || 'Default Interest  : _DFLT-INT_' || chr(10) || '' || chr(10) || '				                    *********************************************' || chr(10) || '                         	       Total Payment Due      : _TOTAL-DUE_' || chr(10) || '         		                   Payment Due Date       : _DUE-DATE_' || chr(10) || '				                    *********************************************' || chr(10) || '' || chr(10) || '*********************************************************************************' || chr(10) || ' Transactions' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'Tran  Description   	 Tran     Principal  Interest   Escrow   Late    Ending' || chr(10) || 'Date                     Amount                                 charge  Principal ' || chr(10) || '									                                 Bal' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_  _PRN-AMT_  _INT-AMT_ _ESC-AMT_  _LTCHG-AMT_' || chr(10) || '													 	             _END-PRIN-BAL_' || chr(10) || '									             			        ' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '' || chr(10) || 'IMPORTANT MESSAGES' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
8,'JIGAR02',
TO_DATE('02/07/2012','DD/MM/YYYY'),'JIGAR01',
TO_DATE('02/07/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 07',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT08',
'nt Due             :_CURR-MISC-DUE_' || chr(10) || 'Less Partial-' || chr(10) || 'Payment Received  :_ESC-PPMT-RECD_' || chr(10) || '' || chr(10) || 'Past Due Amount   :_PAST-DUE-AMT_   Current Amount-' || chr(10) || '                                    Due      :_CURR-AMT-DUE_' || chr(10) || 'Default Interest  :_DFLT-INT_' || chr(10) || '		                    ' || chr(10) || '			            *********************************************' || chr(10) || '                         	     Total Payment Due      :_TOTAL-DUE_' || chr(10) || '         		             Payment Due Date       :_DUE-DATE_' || chr(10) || '		                    *********************************************' || chr(10) || '' || chr(10) || '*********************************************************************************' || chr(10) || '            		  Transactions' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || 'Tran Description   	 Tran     Principal  Interest   Escrow   Late    Ending' || chr(10) || 'Date                     Amount                                 charge  Principal ' || chr(10) || '									 Bal' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_  _PRN-AMT_  _INT-AMT_ _ESC-AMT_  _LTCHG-AMT_' || chr(10) || '	     					 	             _END-PRIN-BAL_' || chr(10) || '									             			        ' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '' || chr(10) || 'IMPORTANT MESSAGES' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'JIGAR01',
TO_DATE('01/08/2012','DD/MM/YYYY'),'JIGAR02',
TO_DATE('01/08/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 08',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT09',
'     Current Misc-' || chr(10) || 'Amount :_PAST-DUE-MISC_  Amount Due             :_CURR-MISC-DUE_' || chr(10) || 'Less Partial-' || chr(10) || 'Payment Received  :_ESC-PPMT-RECD_' || chr(10) || '<B>' || chr(10) || 'Past Due Amount   :_PAST-DUE-AMT_   Current Amount-' || chr(10) || '                                    Due                    :_CURR-AMT-DUE_   </B>' || chr(10) || 'Default Interest  :_DFLT-INT_' || chr(10) || '<B>' || chr(10) || '				                    *********************************************' || chr(10) || '                         	       Total Payment Due      :_TOTAL-DUE_' || chr(10) || '         		                   Payment Due Date       :_DUE-DATE_' || chr(10) || '				             *********************************************' || chr(10) || '</B>' || chr(10) || '*********************************************************************************' || chr(10) || '            		  <B>Transactions</B>' || chr(10) || '*********************************************************************************' || chr(10) || '<body>' || chr(10) || '<font size=2> ' || chr(10) || '' || chr(10) || 'Tran  Description   	 Tran     Principal  Interest   Escrow   Late    Ending' || chr(10) || 'Date                     Amount                                 charge  Principal ' || chr(10) || '									                                 Bal' || chr(10) || '#LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_ _TRN-AMT_  _PRN-AMT_  _INT-AMT_ _ESC-AMT_  _LTCHG-AMT_ _END-PRIN-BAL_' || chr(10) || '													 	             ' || chr(10) || '									             			        ' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '</font>' || chr(10) || '</body>' || chr(10) || '<B>IMPORTANT MESSAGES</B>' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '</HTML>' || chr(10) || '#EB',
'O',
'A',
'Y',
10,'JIGAR02',
TO_DATE('01/08/2012','DD/MM/YYYY'),'JIGAR01',
TO_DATE('01/08/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 09',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'PMNT10',
'  Current Misc-' || chr(10) || 'Amount :_PAST-DUE-MISC_  Amount Due             :_CURR-MISC-DUE_' || chr(10) || 'Less Partial-' || chr(10) || 'Payment Received  :_ESC-PPMT-RECD_' || chr(10) || '<B>' || chr(10) || 'Past Due Amount   :_PAST-DUE-AMT_   Current Amount-' || chr(10) || '                                    Due                    :_CURR-AMT-DUE_   </B>' || chr(10) || 'Default Interest  :_DFLT-INT_' || chr(10) || '<B>' || chr(10) || '				                    *********************************************' || chr(10) || '                         	       Total Payment Due      :_TOTAL-DUE_' || chr(10) || '         		                   Payment Due Date       :_DUE-DATE_' || chr(10) || '				             *********************************************' || chr(10) || '</B>' || chr(10) || '*********************************************************************************' || chr(10) || '            		  <B>Transactions</B>' || chr(10) || '*********************************************************************************' || chr(10) || '' || chr(10) || '' || chr(10) || 'Tran Date  Description   	     Tran Amount    Principal      Interest       Escrow         Late charge    Ending Principal' || chr(10) || '                     	                                 				              	        Balance	' || chr(10) || '									                        #LOOP' || chr(10) || '_TRN-DATE_ _EVNT-DESC_               _TRN-AMT_      _PRN-AMT_      _INT-AMT_      _ESC-AMT_      _LTCHG-AMT_    _END-PRIN-BAL_ ' || chr(10) || '													 	             ' || chr(10) || '									             			        ' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '<B>IMPORTANT MESSAGES</B>' || chr(10) || '' || chr(10) || 'Our records indicate that your loan is PAST DUE. Legal and default expenses may' || chr(10) || 'be due in addition to the amount shown on this statement. Please contact your' || chr(10) || 'account representative or our collection department at 1 (800> 972-9669 to' || chr(10) || 'discuss your loan' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'JIGAR02',
TO_DATE('01/08/2012','DD/MM/YYYY'),'JIGAR01',
TO_DATE('01/08/2012','DD/MM/YYYY'),'PNTC',
'PAYMENT NOTICE 10',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'P_AMDPC_NOTC',
'-VEHICLE_ 2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Amendment Fee Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'P_AMEND_NOTC',
'-VEHICLE_ 2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Amendment Fee Fax',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'P_DURFEE',
' ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'PARTICIPANT DURATION FEE',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'ROLL_ROIX_P',
'send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
5,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Rollover Rate Setting Notice',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'SLC_FEE_BORR',
'   :  _SETL-RECV-ACCOUNT_' || chr(10) || '' || chr(10) || '	 Account Name            :  Agency/Medium Term Finance' || chr(10) || '' || chr(10) || '	          Ref                     :  _FACILITY-NAME_' || chr(10) || '' || chr(10) || '	          Attn                    :  Global Loans / Agency' || chr(10) || '' || chr(10) || '	          Ref Cusip               :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>Contact</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
2,'AH99777',
TO_DATE('01/06/2009','DD/MM/YYYY'),'GV87380',
TO_DATE('01/06/2009','DD/MM/YYYY'),'NOTC',
'SYNTHETIC LC PARTICIPATION FEE BORR',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'SLC_FEE_PART',
'********************************************************************' || chr(10) || 'If you have any questions on the above, please speak to a representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
4,'AH99777',
TO_DATE('01/06/2009','DD/MM/YYYY'),'GV87380',
TO_DATE('01/06/2009','DD/MM/YYYY'),'NOTC',
'SYNTHETIC LC PARTICIPATION FEE',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'SWINGPAY_B',
'st importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
13,'VF92373',
TO_DATE('14/05/2008','DD/MM/YYYY'),'DM02665',
TO_DATE('14/05/2008','DD/MM/YYYY'),'NOTC',
'Borrower Swingline Paydown Notification',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'SWINGPAY_P',
'ing and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
11,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Investor SwingLine Paydown Notification',
'P',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'TAXRATEMSG',
'#B' || chr(10) || '' || chr(10) || '_BILLDATE_' || chr(10) || '' || chr(10) || '_CUSTOMER-NAME_' || chr(10) || '' || chr(10) || '_CONTACT-ENTITY-NAME_' || chr(10) || '' || chr(10) || 'RE: TAX WITHHOLDING RATE CONFIRMATION' || chr(10) || '' || chr(10) || 'Based on the current IRS tax Form on file for the above referenced customer please be' || chr(10) || 'adviced that the below withholding rate are in effect.if you feel an adjustment should' || chr(10) || 'be made please contact our tax department at tax.processing@citi.com' || chr(10) || '' || chr(10) || '<B>INTEREST INCOME</B>' || chr(10) || '' || chr(10) || 'Tax Type    		Tax rate' || chr(10) || '****************************************************' || chr(10) || '#LOOP' || chr(10) || '_TAX-TYPE_      	_DEFTAXRATE_' || chr(10) || '#ENDLOOP ' || chr(10) || '' || chr(10) || '<B>FEE INCOME</B>' || chr(10) || '' || chr(10) || 'Tax Type   		Tax rate' || chr(10) || '****************************************************' || chr(10) || '#LOOP' || chr(10) || '_TAX-TYPE_      	_LCYTAXRATE_' || chr(10) || '#ENDLOOP' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
1,'SHREE01',
TO_DATE('09/08/2012','DD/MM/YYYY'),'SHREE02',
TO_DATE('09/08/2012','DD/MM/YYYY'),'NOTC',
'Current Tax Rate Information',
'C',
'MAIL',
'','N'
)
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'UTI_FEE_BORR',
'DIF' || chr(10) || '	    Account #            :  _SETL-RECV-ACCOUNT_' || chr(10) || '' || chr(10) || '              Account Name         :  Agency/Medium Term Finance' || chr(10) || '' || chr(10) || '	          Ref                  :  _FACILITY-NAME_' || chr(10) || '' || chr(10) || '              Attn                 :  Global Loans / Agency' || chr(10) || '' || chr(10) || '	          Ref Cusip            :  _CUSIP-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '<B>CONTACT</B>' || chr(10) || '*********************************************************************************' || chr(10) || 'If you have any questions on the above, please call me at _ADMIN-PHONE-NO_' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || '_ADMIN-NAME_' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_  ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'EMAIL: _ADMIN-EMAIL_' || chr(10) || 'Fax No: _ADMIN-FAX-NO_' || chr(10) || '' || chr(10) || '' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '#EB',
'O',
'A',
'Y',
21,'PB68632',
TO_DATE('02/05/2007','DD/MM/YYYY'),'AH59340',
TO_DATE('02/05/2007','DD/MM/YYYY'),'NOTC',
'Borrower Utilization Fee Fax',
'B',
'MAIL',
'','')
;
END;
/
BEGIN
INSERT INTO OLZM_MESSAGE_TEMPLATE
(MESSAGE_TYPE,MESSAGE_CODE,MESSAGE,RECORD_STAT
,AUTH_STAT,ONCE_AUTH,MOD_NO,MAKER_ID,MAKER_DT_STAMP
,CHECKER_ID,CHECKER_DT_STAMP,REL_EVENT,TEMPLATE_DESC,B_OR_P
,MEDIA,MAPPED_FAX_TEMPLATE,ADV_LANG_TYPE)
 VALUES 
('C',
'UTI_FEE_PART',
'representative ' || chr(10) || 'at 302-894-6010.' || chr(10) || '' || chr(10) || 'Regards,' || chr(10) || '' || chr(10) || 'Investor Relations' || chr(10) || '' || chr(10) || '_AGENTNAME-LEGAL-VEHICLE_ ' || chr(10) || '2 PENNS WAY' || chr(10) || 'SUITE 100' || chr(10) || 'NEW CASTLE, DE  19720' || chr(10) || 'Fax No:_ADMIN-FAX-NO_' || chr(10) || 'Email: global.loans.support@citi.com' || chr(10) || '' || chr(10) || 'CONFIDENTIALITY NOTICE: The confidentiality of customer information is of the' || chr(10) || 'utmost importance to Citigroup. Our ongoing interaction with you involves the' || chr(10) || 'transmission of confidential information via facsimile. You are aware that' || chr(10) || 'facsimile transmission is not secure and has risks of unauthorized access,' || chr(10) || 'tampering and disclosure of your information. Therefore, your continuing to send' || chr(10) || 'facsimile messages to us or providing your facsimile transmission number to us' || chr(10) || 'for our use constitutes consent to our use of this method of data transmission.' || chr(10) || 'Accordingly, we do not assume any liability whatsoever for breaches of' || chr(10) || 'confidentiality, tampering, or non-receipt of your data for any reason, and you' || chr(10) || 'agree to assume the risk of unauthorized access, tampering and disclosure of' || chr(10) || 'your information' || chr(10) || '' || chr(10) || '' || chr(10) || '#EB',
'O',
'A',
'Y',
19,'DM02665',
TO_DATE('26/12/2008','DD/MM/YYYY'),'AH59340',
TO_DATE('26/12/2008','DD/MM/YYYY'),'NOTC',
'Participant Utilization Fee Fax',
'P',
'MAIL',
'','')
;
END;
/



commit;
