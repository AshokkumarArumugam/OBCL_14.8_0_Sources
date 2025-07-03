CREATE OR REPLACE PACKAGE  Olpks_Olcrores_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Olcrores_Utils.spc
  **
  ** Module     : OL
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2020 , Oracle and/or its affiliates.  All rights reserved
  ** 
  ** 
  ** No part of this work may be reproduced, stored in a retrieval system, adopted 
  ** or transmitted in any form or by any means, electronic, mechanical, 
  ** photographic, graphic, optic recording or otherwise, translated in any 
  ** language or computer language, without the prior written permission of 
  ** Oracle and/or its affiliates. 
  ** 
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East), 
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */  
  
 Function Fn_Upload(p_Source       		In Cotms_Source.Source_Code%TYPE,
					p_Function_Id      	In Varchar2,
					p_Module           	In Varchar2,
					p_Action_Code      	In Varchar2,
					p_Calling_Function 	In Varchar2,                    
					p_ConRefNo          In Varchar2,
					p_VerNo     		In Varchar2,
					P_Wrk_Olcrores     	In Out olpks_olcrores_Main.ty_olcrores,
					p_Err_Code         	In Out Varchar2,
					p_Err_Params       	In Out Varchar2) Return Boolean;
End Olpks_Olcrores_Utils;
/
Create Or Replace Synonym Olpkss_Olcrores_Utils For Olpks_Olcrores_Utils
/