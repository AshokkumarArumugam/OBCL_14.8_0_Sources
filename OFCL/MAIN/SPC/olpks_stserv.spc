CREATE OR REPLACE package olpks_stserv
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_stserv.SPC
**
** Module		: CORE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/

Procedure Pr_Stserv_Trans
(
	pFrectype	IN		Varchar2,	-- this specifies the full rectype eg: for FT: UPLOAD_CUSTDETAILS>MISDETAILS>UDFDETAILS
	pVal		IN    	Varchar2,	-- the data in the TS format and '>' separated format
	pdtf		IN		Varchar2,	-- this specifies the data format ,if null then considered to be 'RRRRMMDD'
	pProc		IN		Varchar2,	-- this specifies whether it is a straight thru processing
	pIdentifier	OUT		Varchar2,	-- this specifies all the key parameters
	pFlag		OUT		Number,  	-- this specifies the status of the flag
	pErr		IN OUT	Varchar2,	-- this specifies the error code
	pPrms		IN OUT	Varchar2	-- this returns the error params
);

---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_Create_Data	(	ptcnt		IN		number	-- Number of fields in Cube base table.
					,	pts		IN		varchar2	-- Tag Names maintained based on Cube Base Tables.
					,	pkey		IN		varchar2	-- Tag Names received in case of Incoming messages.
					,	pdata		IN OUT	varchar2	-- Tag Data received from the subsequent tags.
					);
---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_Default	(	pValLst	IN OUT	varchar2	-- Actual Value List
				,	pDefLst	IN		varchar2	-- Default Value List
				,	pDIndLst	IN		varchar2	-- Default Indicator List
				,	pcount	IN		number	-- No of tags present
				);
---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_GetIdent	(	pKeyFlds	IN		Varchar2	-- Key Field Names maintained based on Cube Base Tables.
				,	pFldLst	IN		Varchar2	-- Tag Names received in case of Incoming messages.
				,	pValLst	IN		Varchar2	-- Tag Values received from the subsequent tags.
				,	pWhere	IN OUT	Varchar2	-- Where condition for the entire upload.
				,	pIdent	IN OUT	Varchar2	-- Identifier for the request.
				,	pErr		IN OUT	Varchar2	-- Error Code to be returned in case of no primary keys.
				,	pFlag		IN OUT	Number	-- Error Flag.
				);
---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_ProcessRow	(	pAction	 	IN		varchar2	-- This parameter contains the action code being sent. [Eg :- I, D]
				,	pValue		IN OUT	varchar2	-- This parameter contains all the values to be validated.
				,	pDataType	 	IN		varchar2	-- This parameter contains a tilda separated list of Data Type for subsequent values.
				,	pDataLength	 	IN		varchar2	-- This parameter contains a tilda separated list of Data Length for subsequent values.
				,	pMandatory	 	IN		varchar2	-- This parameter contains a tilda separated list of mandatory and non-mandatory flags for subsequent values.
				,	pCount		IN		Number	-- This is the count of the number of fields in the Cube Base Table.
				,	pFlag		 	OUT		Number  	-- This specifies the status of the flag
				,	pErr		 	OUT		Varchar2	-- This specifies the error code
				,	pPrms		 	OUT		Varchar2	-- This returns the error params
				);

---------------------------------------------------------------------------------------------------------------------------

Function Fn_CheckLength (	pValue	IN	Varchar2	-- This parameter contains the value to be checked for Length.
				,	pDLen		IN	Varchar2	-- This parameter contains the corresponding data length of the Value being passed.
				,	pDType	IN	Varchar2	-- This parameter contains the corresponding data type of the Vlaue being passed.
				)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_CheckType	(	pValue	IN	Varchar2	-- Value being Checked for Data Type.
 				,	pDType	IN	Varchar2	-- Data Type being sent.
				)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_Refcheck	(	pTS		IN		varchar2	-- Tilda Separated Tag Names.
				,	pData		IN		varchar2	-- Tilda Separated Tag Values.
				,	pRef		IN		varchar2	-- Tilda Separated Ref List.
				,	pTabName	IN		varchar2	-- Table Name of the rectype.
				,	pCount	IN		number	-- Tag Count.
				,	pPrms		IN OUT	varchar2	-- Error Params.
				,	pErr		IN OUT	varchar2	-- Error Code.
				,	pFlag		IN OUT	number	-- Status.
				);

---------------------------------------------------------------------------------------------------------------------------

Function Fn_MakeStmt	(	pFldLst	IN	Varchar2	-- Field List to be selected.
				,	pTabName	IN	Varchar2	-- Table Name from which the fields are to be selected.
				,	pFldSep	IN	Varchar2	-- Field Separator.
				,	pReqType	IN	Varchar2	-- Indicates the type of the request.[Insert and Modify]
				)
Return Varchar2;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_GetRecords	(	pSql		IN	Varchar2	-- Sql Select Statement to be executed.
				,	pRecSep	IN	Varchar2	-- Record Separator.
				)
Return Varchar2;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Extract	(	pType			IN	Varchar2	-- Indicator for Master or Detail. 	
				,	pAction		IN	Varchar2	-- Action Code of the record.
				,	pTabName		IN	Varchar2	-- Table Name to which the record is to be inserted.
				,	pFldLst		IN	Varchar2	-- The Field List of the table.
				,	pDTLst		IN	Varchar2	-- The subsequent data type list of the fields.
				,	pTrackLst		IN	Varchar2	-- The track list of each field.
				,	pModIndLst		IN	Varchar2	-- The modification indicator list.
				,	pOldValue		IN	Varchar2	-- Old value list in case of modify.
				,	pNewValue		IN	Varchar2	-- New values list being inserted.
				,	pIndicator		IN	Varchar2	-- Key Field List.
				,	pCount		IN	Number	-- Total number of fields.
				)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Post	(	pAction	IN	Varchar2	-- Action Code of the request.
			,	pTabName	IN	Varchar2	-- Table Name for the request.
			,	pOValLst	IN	Varchar2	-- New Value List.
			,	pNValLst	IN	Varchar2	-- Old Value List.
			)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Insert_Rec_Log	(	pTabName	IN	Varchar2 	-- Table Name for which the record is being inserted.
					)
return Number;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Insert_Field_Log	(	pTabName	IN	Varchar2	-- Table Name for which the record is being inserted.
					,	pFldName	IN	Varchar2	-- Field Name being tracked.
					,	pOldVal	IN	Varchar2	-- Old Value being passed in case of any modifications.
					,	pNewVal	IN	Varchar2	-- New Value being inserted.
					,	pItemNo	IN	Number	-- Item number.
					)
return Number;

---------------------------------------------------------------------------------------------------------------------------

Function	Fn_Call_Auth	(	pTabName	IN	Varchar2	-- Table Name to be updated for authorizing.
					,	pWhere	IN	Varchar2	-- Where Condition.
					)	
Return Number;

---------------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_Str_Occr_Cnt	(	pstr	IN	Varchar2
					,	pkey	IN	Varchar2
					) 
RETURN integer;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_ExecuteQuery	(	pSql	IN	Varchar2	-- Sql Statement to be executed.
					)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_Upload_Customer	(	pValue	IN OUT	Varchar2	-- Value List being passed.
						,	pTag		IN OUT	Varchar2	-- Tag List being passed.
						,	pMis		IN OUT	Varchar2	-- Key Value for MIS.
						,	pBrn		IN OUT	Varchar2	-- Branch Code to be retrieved.
						,	pXRef		IN OUT	Varchar2	-- Xref to be sent.
						,	pProcTag	IN 		Varchar2	-- Process Tags stored in the Table.
						,	pFlag		IN OUT	Number	-- Error Flag.
						,	pErr		IN OUT	Varchar2	-- Error Code in  case of any error.
						,	pPrms		IN OUT	Varchar2	-- Error Params in case of any error.
						);

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_CustAdd_Mod	(	pValue	IN OUT	Varchar2	-- Value list being passed.
					,	pTag		IN OUT	Varchar2	-- Tag list being passed.
					,	pProcTag	IN OUT	Varchar2	-- Tags to be Processed.
					,	pAuthFlag	IN OUT	Boolean	-- Authorising Status.
					,	pFlag		IN OUT	Number	-- Error Flag.
					,	pErr		IN OUT	Varchar2	-- Error Code.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_CustMis		(	pValue	IN OUT	Varchar2	-- Value list being passed.
					,	pTag		IN OUT	Varchar2	-- Tag list being passed.
					,	pMisKey	IN 		Varchar2	-- Key Value obtained from Master record.
					,	pXREF		IN OUT	Varchar2	-- Xref being sent for the error params.
					,	pProcTag	IN OUT	Varchar2	-- Tags to be processed.
					,	pFlag		IN OUT	Varchar2	-- Error Flag.
					,	pErr		IN OUT	Varchar2	-- Error Code.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_UdfDetails	(	pValue	IN OUT	Varchar2	-- Value list being passed.
					,	pTag		IN OUT	Varchar2	-- Tag list being passed.
					,	pKey		IN 		Varchar2	-- Key Value obtained from Master record.
					,	pFuncId	IN		Varchar2	-- Function Id for the UDF.
					,	pXREF		IN		Varchar2	-- The corresponding Xref sent.
					,	pProcTag	IN OUT	Varchar2	-- Tags to be processed.
					,	pFlag		IN OUT	Varchar2	-- Error Flag.
					,	pErr		IN OUT	Varchar2	-- Error Code.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);

---------------------------------------------------------------------------------------------------------------------------

/*Procedure	Pr_Account_Upld	(	pValue	IN OUT	Varchar2	-- Value list being passed.
					,	pTag		IN OUT	Varchar2	-- Tag list being passed.
					,	pXref		IN OUT	Varchar2	-- Xref being sent.
					,	pBrn		IN OUT	Varchar2	-- Branch being sent.
					,	pMis		IN OUT	Varchar2	-- Key values for MIS.
					,	pProcTag	IN OUT	Varchar2	-- Tags to be Processed.
					,	pFlag		IN OUT	Number	-- Error Flag.
					,	pErr		IN OUT	Varchar2	-- Error Code.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);*/ -- OFCL12.2 Not reqd

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_Upload_AccMis		(	pValue	IN OUT	Varchar2	-- Value List being passed.
						,	pTag		IN OUT	Varchar2	-- Tag List being passed.
						,	pKeyVal	IN OUT	Varchar2	-- Key Values being passed.
						,	pProcTag	IN 		Varchar2	-- Process Tags stored in the Table.
						,	pFlag		IN OUT	Number	-- Error Flag.
						,	pErr		IN OUT	Varchar2	-- Error Code in  case of any error.
						,	pPrms		IN OUT	Varchar2	-- Error Params in case of any error.
						);

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_Upload_Branch		(	pValue	IN OUT	Varchar2	-- Value List being passed.
						,	pTag		IN OUT	Varchar2	-- Tag List being passed.
						,	pXRef		IN OUT	Varchar2	-- Xref to be sent.
						,	pProcTag	IN 		Varchar2	-- Process Tags stored in the Table.
						,	pFlag		IN OUT	Number	-- Error Flag.
						,	pErr		IN OUT	Varchar2	-- Error Code in  case of any error.
						,	pPrms		IN OUT	Varchar2	-- Error Params in case of any error.
						);

---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_Upload_MisClass	(	pValue	IN OUT	Varchar2	-- Value List being passed.
						,	pTag		IN OUT	Varchar2	-- Tag List being passed.
						,	pXRef		IN OUT	Varchar2	-- Xref to be sent.
						,	pKey		IN OUT	Varchar2	-- Mis Class being Sent
						,	pProcTag	IN 		Varchar2	-- Process Tags stored in the Table.
						,	pFlag		IN OUT	Number	-- Error Flag.
						,	pErr		IN OUT	Varchar2	-- Error Code in  case of any error.
						,	pPrms		IN OUT	Varchar2	-- Error Params in case of any error.
						);


Function Fn_Initialise_Globals	(	pBrn		IN OUT	Varchar2	-- Branch Code for initialising global params.
						,	pUser		IN OUT	Varchar2	-- User Id for initialising global params.
						)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_CheckXRef	(	pXref	IN	Varchar2	-- External Reference Number being sent for the request type.
				)
Return Number;

---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_gen_cifno	(	pcifno	OUT	Varchar2
				,	pFlag		OUT	Number
				,	pErr		OUT	Varchar2
				,	pprms		OUT	Varchar2
				);

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Create_Rec_Key	(	pFunction		Varchar2	-- Function Id
					,	pField		Varchar2	-- Key Field Name
					,	pVal			Varchar2	-- Key Field Value
					,	pCount		Number	-- Count
					)
Return Varchar2;

---------------------------------------------------------------------------------------------------------------------------

Function Fn_Post_Cif_Auth	(	pCustNo	Varchar2	-- Customer Number being authorised
					)
Return Boolean;

---------------------------------------------------------------------------------------------------------------------------
-- OFCL12.2 Not required
/*Procedure Pr_Post_AccUpld	(	pKey		IN OUT	Varchar2	-- Key Values[Branch Code and Account Number].
					,	pMis		IN OUT	Varchar2	-- MIS flag.
					,	pAction	IN OUT	Varchar2	-- Action Code.
					,	pXref		IN OUT	Varchar2	-- Xref for the upload.
					,	pFlag		IN OUT	Number	-- Error Flag.
					,	pErr		IN OUT	Varchar2	-- Error code.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);*/

-- OFCL12.2 Not required
---------------------------------------------------------------------------------------------------------------------------

Procedure	Pr_Post_BrnUpld	(	pBrn		IN OUT	Varchar2	-- New Branch being uploaded.
					,	pErr		IN OUT	Varchar2	-- Error Code.
					,	pFlag		IN OUT	Number	-- Error Flag.
					,	pPrms		IN OUT	Varchar2	-- Error Params.
					);

---------------------------------------------------------------------------------------------------------------------------

Procedure Pr_Post_Fltrate_Upld	(	pRateCode	IN		Varchar2	-- Rate Code being uploaded
						,	pBrn		IN		Varchar2	-- Branch Code for which the float rate is being uploaded.
						,	pFlag		IN OUT	Number	-- Error Flag
						,	pErr		IN OUT	Varchar2	-- Error Code
						,	pPrms		IN OUT	Varchar2	-- Error Params
						);

---------------------------------------------------------------------------------------------------------------------------
/*
Variable	DataLength			Description								Default Value	[Initialised In]
--------	----------			-----------								-------------	----------------
*/
gmaker smtb_user.user_id%TYPE; -- Specifies the default maker/user id maintained for IFACE.Value:- 'SYSTEM' [Package]
gAuth		Varchar2(30);	-- Specifies the default authorizer id maintained for IFACE.Value:- 'SYSTEMAU'[Package]
gParSep	Varchar2(1);	-- Specifies the delimiter between two parent tags.		Value:- '>'		[Package]
gTagSep	Varchar2(1);	-- Specifies the delimiter between two child tags.		Value:- '~'		[Package]
gIdentSep	Varchar2(1);	-- Specifies the delimiter between two identifiers.		Value:- '^'		[Package]
gMntSep	Varchar2(1);	-- Specifies the delimiter between two fields.			Value:- '*'		[Package]
gMntRSep	Varchar2(1);	-- Specifies the delimiter between two records.			Value:- '^'		[Package]
gModNo	Number;		-- Specifies the modification number.							[Fn_Post]
gOperation	Varchar2(1);	-- Specifies the operation being performed.						[Fn_Post]
gFuncId	varchar2(30);	-- Specifies the function id of the upload.						[Pr_Stserv_Trans]
gKeyId	Varchar2(100);	-- Specifies the key identifier.								[Fn_Post]
gDtStp	Varchar2(20);	-- Specifies the date when the upload is being made.					[Fn_Initialise_Globals]
gcurbrn sttm_core_branch.branch_code%TYPE; -- Specifies the current branch. [Fn_Initialise_Globals]
gDtFmt	Varchar2(10);	-- Specifies the date format for the upload.						[Fn_Initialise_Globals]
gWhere	Varchar2(500);	-- Specifies the Where condition.								[Pr_GetIdent]
gBnkCode	Varchar2(5);	-- Specifies the current bank.								[Fn_Initialise_Globals]
gNode		Varchar2(10);	-- Specifies the Node.										[Fn_Initialise_Globals]
gLang		Varchar2(3);	-- Specifies the language for the branch.							[Fn_Initialise_Globals]
gCcy		Varchar2(3);	-- Specifies the Currency for the branch.							[Fn_Initialise_Globals]
gXRFlg	Boolean;		-- Flag to check X-ref.							Value:- False
gFlg		Boolean;		-- Flag to initialise global variables.				Value:- False
gTagFlg	Boolean;		-- Flag to replace gTagSep to gMntSep.				Value:- False


End olpks_stserv;
/
CREATE or replace SYNONYM olpkss_stserv FOR olpks_stserv
/