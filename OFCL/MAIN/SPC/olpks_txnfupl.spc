Create or Replace Package olpks_txnfupl as
/*------------------------------------------------------------------------------------------------------------------------------------
**                                                       
** File Name	: olpks_txnfupl.SPC	                                                                   
**                                                                                                  		
** Module	: IF                                                                                  		**      
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY
06-FEB-2002	FCC3.9 PLNCITI SFR NO 3722	Added a procedure Pr_Startjob as one Cannot start and stop alerts thru front end.
20-MAY-2002 RETRO FCC4.0 JUNE 2002 PLNCITI TIL#1265  	Parameter type to be changed to IN OUT from IN.
26-AUG-2002 FCC 4.0 June 2002 DD changes adding parameter rectype to fn_dispatch
31-Aug-2016 -- OFCL12.2 Changes
*/
-- OFCL12.2 Changes
TYPE rec_dispatch IS RECORD
	(
	message		varchar2(4000)
	);
TYPE tbl_dispatch IS TABLE OF rec_dispatch INDEX BY BINARY_INTEGER;
-- OFCL12.2 Changes

Procedure pr_txnfpickup ;

Procedure pr_gen_tagbreakup (	psrc IN      Varchar2,
				pRecType   IN      Varchar2,
				pStrttag   IN  OUT  Varchar2, --RETRO FCC4.0 JUNE 2002 PLNCITI TIL#1265
				pEndtag    IN  OUT  Varchar2, --RETRO FCC4.0 JUNE 2002 PLNCITI TIL#1265
				pdata      IN  OUT Varchar2,
				pkey           OUT Varchar2,
				pflag          OUT Number,	
				perr           OUT Varchar2	) ;

Procedure pr_main_txnfprocess   ( pseq IN number) ;

Procedure pr_process_txnfkon  ( pseq IN number) ;

--FCC3.9 PLNCITI SFR NO 3722 starts

Procedure pr_startjob (pSource In Varchar2,
			     pFlag In Out Number,
			     perr Out varchar2);

--FCC3.9 PLNCITI SFR NO 3722 ends

Function fn_dispatch    (
				 rec		IN  	VARCHAR2,	-- DD CHANGES
				 pts		IN 	tbl_dispatch,--pcpks_dispatch.tbl_dispatch,-- OFCL12.2 Changes
				 pfilename 	IN 	Varchar2 ,
				 perr         OUT Varchar2,
				 pprms        OUT Varchar2	) return boolean; 

End olpks_txnfupl; 
/
create or replace synonym  olpkss_txnfupl for  olpks_txnfupl
/