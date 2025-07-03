Create or replace PACKAGE olpks_browse IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_browse.SPC
**
** Module		: MESSAGES
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


 Procedure Insert_Into_Undo_Table (Pl_Dcn varchar2,Pl_Branch varchar2,Pl_Option varchar2);
 Procedure Insert_Record_New_Branch (Pl_Dcn varchar2,Pl_Branch varchar2,Pl_OthBrn varchar2);
 Procedure Undo_Previous_Operation (Pl_Branch varchar2, Pl_Dcn varchar2,Pl_Count Number);
 Procedure Put_Message_Into_Auth_Status (Pl_Branch varchar2,Pl_Dcn varchar2,Pl_User varchar2,Pl_Othbrn varchar2,Pl_error OUT varchar2);
 Procedure Erase_Undo_Table (Pl_Branch varchar2,Pl_Dcn varchar2);
  Function  fn_get_date_time             RETURN date;
  Function  Get_User_Rights              (Pl_Option varchar2,Pl_Role Varchar2) Return Varchar2;
 Function Get_Auth_Status (Pl_Option varchar2,Pl_Branch varchar2) Return char; 
 Function Group_Operation (Pl_Option varchar2,Pl_Dcn varchar2,Pl_Count Number,Pl_Branch varchar2,Pl_Maker varchar2) Return Char;
 Function Copy_Record (Pl_ODcn varchar2,Pl_NDcn varchar2,Pl_Branch varchar2,Pl_maker varchar2) return boolean;
  Function  fn_spool_advice              (p_dcn	IN varchar2, p_spool IN varchar2,p_count IN number) return boolean;
--OFCL
  Function Copy_Anymsg(
                       Pl_ODcn     varchar2,
                       Pl_NDcn     varchar2,
 Pl_Branch varchar2,
 Pl_Maker varchar2,
                       Pl_Media    varchar2,
                       Pl_reciever varchar2,
                       pl_name     varchar2,
                       Pl_Add1     varchar2,
                       Pl_Add2     varchar2,
                       Pl_Add3     varchar2,
                       Pl_Add4     varchar2
                       ) return boolean ;
--OFCL
END olpks_browse;
/
create or replace synonym olpkss_browse for olpks_browse
/