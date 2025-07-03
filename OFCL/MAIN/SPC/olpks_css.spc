create or replace package olpks_css as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_css.SPC
**
** Module	: MESSAGING SUBSYSTEM
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*
CHANGE_HISTORY

2-4-00 : New package for FLEXCUBE-CSS Interface
30-OCT-2001 FCC3.8 PLNCITI TIL #2272 Additional parameter for filename added in fn_gen_msg_out--Bsk.
28-OCT-2003 FCC 4.4 DEC 2003 CITIPLC SFR#PLC43060022 1. DROP SYNONYM statement added before the CREATE SYNONYM statement.
					2. New line character added at the end of the CREATE SYNONYM statement.
					3. p_filename parameter removed for the fn_gen_msg_out function

26-JUN-2004 FCC 4.6 SEP 2004 HUFCITI#1210 Unable to identify as RTGS message for sender BIC with terminal indicator at 9th position in swift address.
07-NOV-2008 FLEXCUBE V.CL RELEASE 7.4 PDE RELATED ADDITIONAL CHANGES
17-FEB-2010 Flexcube V.CL 7.6, FpML changes
09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes
*/



type vc2_tbl is table of varchar2(255) index by binary_integer;

function fn_gen_msg_out(p_dcn varchar2,
			p_errcode in out varchar2,
			p_errparam in out varchar2
			-- FCC 4.4 DEC 2003 CITIPLC SFR#PLC43060022 removed the parameter
			--, P_filename in out varchar2 -- FCC3.8 PLNCITI TIL #2272
			, P_filename in out varchar2 -- FCC3.8 PLNCITI TIL #2272 -- fcc 4.4 dec2 003 changes rolled back the above retro
			) 
return boolean;

function fn_gen_msg_in(pBranch   IN     varchar2,
			     pType     IN     varchar2, -- G=GCN S=SCOPE/SWIFT
			     pMsgDir   IN     varchar2,
			     pFileName IN     varchar2,
			     pErrCode  IN OUT varchar2,
			     pErrParam IN OUT varchar2)
return boolean;

procedure pr_gen_msg_in(pBranch   IN     varchar2,
			     pType     IN     varchar2, -- G=GCN S=SCOPE/SWIFT
			     pMsgDir   IN     varchar2,
			     pFileName IN     varchar2,
			     pErrCode  IN OUT varchar2,
			     pErrParam IN OUT varchar2);

procedure pr_get_dirs(pBrnArr in out vc2_tbl,
			   pGcnArr in out vc2_tbl,
			   pScoArr in out vc2_tbl,
			   pNBrn   in out integer);


-- FCC 4.6 SEP 2004 HUFCITI#1210  Changes Starts 
FUNCTION fn_get_sender_bic
			(
			pFullsender	IN		VARCHAR2,
			pErrCodes	IN OUT		ertbs_msgs.ERR_CODE%TYPE,
			pErrParams	IN OUT		VARCHAR2,
			pSender_BIC	OUT		oltms_bic_directory.bic_code%TYPE 
			)
RETURN BOOLEAN;
--FCC 4.6 SEP 2004 HUFCITI#1210 Changes  Ends 
--07-NOV-2008 FLEXCUBE V.CL RELEASE 7.4 PDE RELATED ADDITIONAL CHANGES starts
FUNCTION fn_transfer_file(p_errcode  IN OUT VARCHAR2,
                            p_errparam IN OUT VARCHAR2) 
RETURN BOOLEAN;
FUNCTION fn_msg_pde_chk(p_dly_msg_rec IN OUT oltbs_dly_msg_out%ROWTYPE,
                          p_val_ins     IN VARCHAR2,
                          p_pde         OUT BOOLEAN) 
RETURN BOOLEAN;

FUNCTION fn_msg_pde_chk(p_dly_msg_rec IN OUT oltbs_dly_msg_out%ROWTYPE,
                          p_pde         OUT BOOLEAN)
RETURN BOOLEAN;                          
--07-NOV-2008 FLEXCUBE V.CL RELEASE 7.4 PDE RELATED ADDITIONAL CHANGES ends
--17-FEB-2010 Flexcube V.CL 7.6, FpML changes starts
FUNCTION fn_udef_fld(p_func VARCHAR2,p_fld VARCHAR2,p_key VARCHAR2)
RETURN VARCHAR2;
--17-FEB-2010 Flexcube V.CL 7.6, FpML changes ends

--09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes start here
FUNCTION fn_get_udef_fld_old_value
				( p_func	IN	VARCHAR2
				, p_fld		IN	VARCHAR2
				, p_key		IN	VARCHAR2)
RETURN VARCHAR2;
--09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes end here

end olpks_css;
/
create or replace synonym olpkss_css for olpks_css
/