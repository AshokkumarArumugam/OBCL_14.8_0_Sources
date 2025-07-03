Create or replace package olpks_tsupl_maint as
/*------------------------------------------------------------------------------------------------------------------------------------
**                                                                                                  		
** File Name	: olpks_tsupl_maint.SPC	                                                                	**   
**                                                                                                  		
** Module	: IF                                                                                  		**      
This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.                                          	**
---------------------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY

25-JAN-2002, I-Face and FLEXML2.0  	Retro changes.
20-MAY-2002 RETRO FCC4.0 JUNE 2002 PLNCITI TIL#68 Currency, Forward and Discount Rates are not getting uploaded
20-MAY-2002 RETRO FCC4.0 JUNE 2002 PLNCITI TIL#3373 Flexcube should support the upload of interest rates from K+ 
*/



--iface changes
procedure set_online_flag(p_online_flag BOOLEAN);

function get_online_flag RETURN BOOLEAN;
--end iface

Procedure pr_tsGetRates
(
	pts       IN      Varchar2,
	pdtf      IN      Varchar2,
	pFlag	    OUT	Number,
	pCode     OUT     Varchar2,
	pDesc     OUT	Varchar2
);

Procedure pr_tsGetAmt
(
	pts       IN      Varchar2,
	pdtf      IN      Varchar2,
	pFlag	    OUT	Number,
	pCode     OUT     Varchar2,
	pDesc     OUT	Varchar2
);

Procedure pr_Tscustinfo
(	pts		IN  Varchar2,
	pdtf        IN  Varchar2,
  	pFlag		OUT Number,
	pErr	   	OUT Varchar2,
	pprms	  	OUT Varchar2
);


Procedure pr_Tscustadd
(	pts       IN  Varchar2,
	pdtf      IN  Varchar2,
  	pFlag    OUT  Number,
	pErr	   OUT  Varchar2,
	pprms	   OUT Varchar2
);

Procedure pr_Tsacstmt
(
	pts  	IN  Varchar2,
	pdtf  IN  Varchar2,
	pFlag OUT Number,
	pErr	OUT Varchar2,
	pprms	OUT Varchar2
);
Procedure pr_Tsactxn
(
	pts      IN	 Varchar2,
	pdtf     IN Varchar2,
	pFlag    OUT Number,
	pErr	   OUT Varchar2,
	pprms	   OUT Varchar2
);

/*procedure pr_tscvpks_chk_upld_rec
(
	pts	    IN  Varchar2,
	pdtf      IN  Varchar2,
 	pFlag	    OUT Number,
	pErr	    OUT Varchar2,
	pprms	    OUT Varchar2
);*/


--RETRO FCC4.0 JUNE 2002 PLNCITI TIL#68 CHANGES START

-- OFCL12.2 Not required
/*Procedure pr_tsUpl_cyrate
(	pTs   IN  VARCHAR2,
	pdtf  IN  VARCHAR2,
	pFlag OUT NUMBER,
	pErr  OUT VARCHAR2,
	pprms	OUT Varchar2
 ) ;
Procedure pr_tsUpl_discrate
(	pTs   IN  VARCHAR2,
	pdtf  IN  VARCHAR2,
	pFlag OUT NUMBER,
	pErr  OUT VARCHAR2,
	pprms	OUT Varchar2
 ) ;
Procedure pr_tsUpl_fwdrate
(	pTs   IN  VARCHAR2,
	pdtf  IN  VARCHAR2,
	pFlag OUT NUMBER,
	pErr  OUT VARCHAR2,
	pprms	OUT Varchar2
 ) ; */
 -- OFCL12.2 Not required
 
--RETRO FCC4.0 JUNE 2002 PLNCITI TIL#68 CHANGES END

--RETRO FCC4.0 JUNE 2002 PLNCITI TIL#3373 CHANGES START
Procedure pr_tsUpl_intrate
(	pTs   IN  VARCHAR2,
	pdtf  IN  VARCHAR2,
	pFlag OUT NUMBER,
	pErr  OUT VARCHAR2,
	pprms	OUT Varchar2
 ) ;  
--RETRO FCC4.0 JUNE 2002 PLNCITI TIL#3373 CHANGES END

--Flexml2.0 Changes
PROCEDURE pr_tsQryRates	(	pRectype		IN		VARCHAR2 
				,	pts      		IN		VARCHAR2
				,	pdtf     		IN		VARCHAR2
				,	pProc	  		IN		VARCHAR2
				,	pIdentifier		OUT 		VARCHAR2 
				,	pFlag    		OUT 		NUMBER
				,	pErr	   		IN OUT 	VARCHAR2
				,	pprms	   		IN OUT 	VARCHAR2
				);

PROCEDURE pr_tsQryAmt	(	pRectype		IN		VARCHAR2 
				,	pts      		IN		VARCHAR2
				,	pdtf     		IN		VARCHAR2
				,	pProc	  		IN		VARCHAR2
				,	pIdentifier		OUT 		VARCHAR2 
				,	pFlag    		OUT 		NUMBER
				,	pErr	   		IN OUT 	VARCHAR2
				,	pprms	   		IN OUT 	VARCHAR2
				);

PROCEDURE pr_TsQryacstmt	(	pRectype		IN		VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);
PROCEDURE pr_TsQryactxn	(	pRectype		IN		VARCHAR2 
				,	pts      		IN		VARCHAR2
				,	pdtf     		IN		VARCHAR2
				,	pProc	  		IN		VARCHAR2
				,	pIdentifier		OUT 		VARCHAR2 
				,	pFlag    		OUT 		NUMBER
				,	pErr	   		IN OUT 	VARCHAR2
				,	pprms	   		IN OUT 	VARCHAR2
				);

PROCEDURE pr_tsqryldcont	(	pRectype		IN		VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);

/*PROCEDURE pr_tsupl_chkbook	(	pRectype		IN		VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);*/

PROCEDURE pr_Tsupl_accservice	(	pRectype  		IN		VARCHAR2 
		  	   		,	pts  	    		IN 		VARCHAR2
				 	,	pdtf     		IN  		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pidentifier		OUT		VARCHAR2
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);

PROCEDURE pr_Tsupl_lmutil	(	pRectype  		IN		VARCHAR2 
		  	   		,	pts  	    		IN 		VARCHAR2
				 	,	pdtf      		IN  		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pidentifier		OUT		VARCHAR2
					,	pFlag     		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);
Procedure pr_Tsactxn		(	pRectype	IN	VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);

-- OFCL12.2 Not required
/*procedure pr_tsCiticard		(	pRectype	IN	VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);
procedure pr_tsuploadpin	(	pRectype		IN		VARCHAR2 
					,	pts      		IN		VARCHAR2
					,	pdtf     		IN		VARCHAR2
					,	pProc	  		IN		VARCHAR2
					,	pIdentifier		OUT 		VARCHAR2 
					,	pFlag    		OUT 		NUMBER
					,	pErr	   		IN OUT 	VARCHAR2
					,	pprms	   		IN OUT 	VARCHAR2
					);*/
-- OFCL12.2 Not required					

--End Flexml2.0 changes
End olpks_tsupl_maint;
/
create or replace synonym  olpkss_tsupl_maint for  olpks_tsupl_maint
/