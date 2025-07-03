CREATE OR REPLACE package olpks_tsgeneric as
/*------------------------------------------------------------------------------------------------------------------------------------
**                                                                                                  		
** File Name	: olpks_tsgeneric.SPC	                                                                	**   
**                                                                                                  			**
** Module	: IF                                                                                  		**      
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.                                            	
---------------------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY

25-JAN-2002, I-Face and FLEXML2.0  	Retro changes.
06-NOV-2003  FCC 4.4 DEC 2003 CITIPLC SFR PLC43040005	
                              FCC 4.0 SFR PLC40110089 fix was missed out - retroed the same - sender to receiver info from Trestel to be mapped to MT202 field 72
			 		multiple atttribute of the xml tags is not yet supported so going a round abt way

*/


--iface changes
	g_user_id		smtbs_user.user_id%TYPE;
	g_auth_user_id	smtbs_user.user_id%TYPE;
	g_tag_sep		oltbs_iface_params.cod_tag_sep%TYPE;
	g_ident_sep		oltbs_iface_params.cod_ident_sep%TYPE;
--end iface
      pkgData		varchar2(32767);	-- FCC 4.4 DEC 2003 CITIPLC SFR PLC40110089

Procedure pr_XMLstring_trans
(
	pSource     IN     varchar2,
	p_Rectype   IN OUT varchar2,
	p_Key 	IN OUT varchar2,
	p_Data 	IN OUT varchar2,
	pDir 		IN	 varchar2,
	pExec		IN	 varchar2,
	pFlag	      IN OUT Number,
	pErr 		IN OUT varchar2,
	pPrms		IN OUT varchar2
);
--iface overloaded
PROCEDURE pr_XMLstring_trans	(	pSource	IN		VARCHAR2
					,	p_Rectype 	IN OUT	VARCHAR2  
					,	p_Key    	IN OUT	LONG      -- TS list of Tags
					,	p_Data    	IN OUT	LONG      -- TS list of Data
					,	pDir      	IN		VARCHAR2  -- Incoming(I)/Outgoing(O)
					,	pdtf		IN		VARCHAR2
					, 	pproc		OUT		VARCHAR2
					,	pFlag	    	IN OUT	NUMBER
					,	pErr 	   	IN OUT  	VARCHAR2
					,	pprms	    	IN OUT  	VARCHAR2
					);
--end iface
procedure pr_formmsg_wrap
 (	pErrCode	IN	VARCHAR2,
 	pParam	IN	VARCHAR2,
	pLangCode	IN	VARCHAR2,
	pConf		OUT	VARCHAR2,
	pErrorOut   OUT VARCHAR2
  );

Procedure pr_Intf_translate
(	pbrn  IN     varchar2,
	psrc  IN     varchar2, 
	pintf IN     varchar2,
	pkey  IN     varchar2,
	pdata IN OUT varchar2,
	pdir  IN     varchar2,
	pflag    OUT Number
) ;

--Flexml2.0 changes
PROCEDURE pr_generic_filter	(	pBranch	IN		VARCHAR2
					,	pRecType 	IN		VARCHAR2
					,	pIdentifier	IN		VARCHAR2
					,	pSCode 	IN OUT 	VARCHAR2
					,	pFlg		IN OUT	NUMBER
					,	pErr		IN OUT	VARCHAR2
					,	pPrms		IN OUT  	VARCHAR2
					);

Function Fn_Check_UDF
	(	pScode	VARCHAR2
 , pCustomer VARCHAR2
	)
Return Boolean;
--end iface

End olpks_tsgeneric;
/
create or replace synonym olpkss_tsgeneric for olpks_tsgeneric
/