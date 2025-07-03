CREATE OR REPLACE PACKAGE olpks_ms_adv AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ms_adv.SPC
**
** Module	: MESSAGES
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
CHANGE HISTORY
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO 30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#203 Added FUNCTION	fn_validate_swift_message
*/




function ms_advgen (p_dly_msg_out_cur IN OUT oltbs_dly_msg_out%rowtype) 
                    Return BOOLEAN;

--KWDKFC SFR no 62 This function returns the descriptions of the ICCF components
--through narrative maintenance. The p_comp_type is the ICCF type(I, C, H)
function fn_get_comp_desc
( p_module in varchar2 ,
  p_comp_type in varchar2 ,
  p_comp_val in varchar2 ,
  p_lang in varchar2) return varchar2;	
 --19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
 --30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#203 Start Here
   FUNCTION	fn_validate_swift_message
   	(
   	p_message			IN		VARCHAR2,
   	p_error_code		IN OUT	VARCHAR2,
   	p_error_parameter 	IN OUT	VARCHAR2
   	)
   RETURN BOOLEAN;
--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#203 End Here
 --19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
   --Bug#26239243 Changes STARTS
   FUNCTION Fn_Populate_Adv_Tags(p_Dcn        IN VARCHAR2
                                ,p_Err_Code   IN OUT VARCHAR2
                                ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   --Bug#26239243 Changes Ends
end olpks_ms_adv;
/
CREATE or replace SYNONYM olpkss_adv_ms FOR olpks_ms_adv
/