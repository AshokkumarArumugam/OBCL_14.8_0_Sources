Create or replace package olpks_incoming_generic
As
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_incoming_generic.SPC
**
** Module	: INTERFACE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

Procedure pr_Stringtrans (	pSource	IN		Varchar2,
					pIntfCode	IN		Varchar2,   --Service to be sent by XML Parser
					pBranch	IN		Varchar2,
					pIntfType	IN		Varchar2,	--Interface type (XML/ASCII) to be sent by C
					pReclist	IN OUT	Varchar2,
					pTaglist	IN OUT	Varchar2,
					pVallist	IN OUT	Varchar2,
					pDir		IN		Varchar2,	-- Direction In/Out
					pFlag		IN OUT	Number,
					pErrcode	IN OUT	Varchar2,
					pErrparams	IN OUT	Varchar2
				);
PROCEDURE	pr_MainWrapper(	pSource		IN OUT		VARCHAR2,
					pRectype		IN OUT		VARCHAR2,
					pKey			IN OUT		VARCHAR2,
					pData			IN OUT		VARCHAR2,
					pDtformat		IN OUT		VARCHAR2,
					pStproc		IN OUT		VARCHAR2,
					pXmlroot		IN OUT		VARCHAR2,
					pDtdOrXsd		IN OUT		VARCHAR2,
					pXmlinfo		IN OUT		VARCHAR2,
					pQname		IN OUT		VARCHAR2,
					pEmptyTags		IN OUT		VARCHAR2,
					pIdentifier		IN OUT		VARCHAR2,
					pFlag			IN OUT		VARCHAR2,
					pErr			IN OUT		VARCHAR2,
					pPrms			IN OUT		VARCHAR2
				);
End olpks_incoming_generic;
/