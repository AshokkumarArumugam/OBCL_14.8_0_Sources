CREATE OR REPLACE PACKAGE Ovpks AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
   ----------------------------------------------------------------------------------------------------*/

    /*   ----------------------------------------------------------------------------------------------------
       Change History
       
   17-NOV-2010 FCUBS11.2 ITR1 SFR#820 CHANGES DONE TO SHOW THE ERROR PARAM MORE THAN 128 CHAR LENGTH
               Search String  : FCUBS11.2 ITR1 SFR#820
            Modified By         : MURALIRAJ 
            
        Created By             : Ajai
        Created On             : 15-Jan-2014
        Create Description     : Extensibility Hook changes
        Search String          : [SITECODE: 12.0.3,IUSDWFDP, BugDB ID:19149124]         
            
         Changed By              : Pankaj Sharma
         Changed On             : 19-May-2015
         Change Description     : The last parameter Preterrcode is changed as IN OUT from OUT in Do_It function.
                                  So that the error code passed to it from Fn_Upmsg (last parameter Preterrcode  IN OUT VARCHAR2) will not 
                                  become NULL                                 
         Search string          : 9NT1620#1210#BANK AUDI#21064312   
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp         
   ----------------------------------------------------------------------------------------------------
*/
   TYPE Rec_Error IS RECORD(
      Err_Code Ertbs_Msgs.Err_Code%TYPE,
      --Params   VARCHAR2(256), --FCUBS11.2 ITR1 SFR#820
	  Params   VARCHAR2(1000), --Common_Entity_Length_Changes
      Amt      NUMBER, -- 14-OCT-2005 KERNEL 7.1 CL Integration changes
      Reqid    VARCHAR2(255) -- 11.1
      );

   TYPE Tbl_Error IS TABLE OF Rec_Error INDEX BY BINARY_INTEGER;

   Gl_Tblerror Tbl_Error;
    --[SITECODE: 12.0.3,IUSDWFDP, BugDB ID:19149124]     Hook changes starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --[SITECODE: 12.0.3,IUSDWFDP, BugDB ID:19149124]   Hook changes ends

   --Standalone12.3 Cleanup Start
   /*
   FUNCTION Do_It(Pcontractref  IN VARCHAR2 --Cstbs_Contract.Contract_Ref_No%TYPE --Standalone12.3 CleanUp
                 ,Peventseqno   IN NUMBER --Cstbs_Contract.Latest_Event_Seq_No%TYPE --Standalone12.3 CleanUp
                 ,Perrorcodes   IN VARCHAR2
                 ,Pparamlist    IN VARCHAR2
                 ,Pamounts      IN VARCHAR2
                 ,Pmodule       IN VARCHAR2
                 ,Pdisplayreqd  IN CHAR
                 ,Pupdatereqd   IN CHAR
                 ,Psep          IN CHAR
                 ,Plangcode     IN Smtbs_Language.Lang_Code%TYPE
                 ,Pbatch_Online IN CHAR
                 ,Pmsgs         OUT VARCHAR2
                 ,Pmsgtypes     OUT VARCHAR2
                 ,Pamount       OUT NUMBER
                 ,Pcount        OUT NUMBER
                 ,Ptype         OUT VARCHAR2
                 --,Preterrcode   OUT VARCHAR2) RETURN BOOLEAN; --commented 9NT1620#1210#BANK AUDI#21064312
                 ,Preterrcode   IN OUT VARCHAR2) RETURN BOOLEAN; --added 9NT1620#1210#BANK AUDI#21064312
    */
	--Standalone12.3 Cleanup End	

   FUNCTION Fn_Countptrn(Pstring IN VARCHAR2
                        ,Psep    IN CHAR) RETURN NUMBER;

   FUNCTION Fn_Gettype(Perrorcode IN Ertbs_Msgs.Err_Code%TYPE) RETURN CHAR;

   FUNCTION Fn_Getmsgandtype(Perrorcode IN Ertbs_Msgs.Err_Code%TYPE
                            ,Plangcode  IN Smtbs_Language.Lang_Code%TYPE
                            ,Perrormsg  OUT Ertbs_Msgs.Message%TYPE
                            ,Perrortype OUT CHAR
                            ,Pconfirm   OUT CHAR
                            ,Pformula   OUT Ertbs_Msgs.Derived_Msg%TYPE) --Added the formula column
    RETURN BOOLEAN;
   --Sitaram begin
   --Added the following function to caleculate the value of the formula
   FUNCTION Fn_Evalformula(Pformula   IN Ertbs_Msgs.Derived_Msg%TYPE
                          ,Pparamlist IN VARCHAR2
                          ,Pvalue     OUT VARCHAR2) RETURN BOOLEAN;
   --sitaram end
   FUNCTION Fn_Embedstr(Perrmsg    IN VARCHAR2
                       ,Pparamlist IN VARCHAR2
                       ,Psep       IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;

   FUNCTION Fn_Codes_By_Type(Pfunctionid IN VARCHAR2
                            ,Ptype       IN CHAR) RETURN VARCHAR2;

   FUNCTION Fn_Formmsg(Perrcode  IN Ertbs_Msgs.Err_Code%TYPE
                      ,Pparam    IN VARCHAR2
                      ,Plangcode IN Smtbs_Language.Lang_Code%TYPE
                      ,Pconf     OUT VARCHAR2) RETURN VARCHAR2;

   --Standalone12.3 CleanUp Start
   /*
   FUNCTION Fn_Deleteovds(Pcontrefno  IN Cstbs_Contract.Contract_Ref_No%TYPE
                         ,Peventseqno IN Cstbs_Contract.Latest_Event_Seq_No%TYPE) RETURN BOOLEAN;
   */
   --Standalone12.3 CleanUp End
   			 
   --Standalone12.3 CleanUp Start
   /* 
   FUNCTION Fn_Upmsg(Pcontractref IN VARCHAR2--Cstbs_Contract.Contract_Ref_No%TYPE  --Standalone12.3 CleanUp
                    ,Peventseqno  IN NUMBER--Cstbs_Contract.Latest_Event_Seq_No%TYPE --Standalone12.3 CleanUp
                    ,Perrorcodes  IN VARCHAR2
                    ,Pparamlist   IN VARCHAR2
                    ,Pmodule      IN VARCHAR2
                    ,Plangcode    IN Smtbs_Language.Lang_Code%TYPE
                    ,Preterrcode  IN OUT VARCHAR2) RETURN BOOLEAN;
   */
   --Standalone12.3 CleanUp End
   

   --Standalone12.3 CleanUp Start
   /*
   FUNCTION Fn_Updauth(Pcontractref IN Cstbs_Contract.Contract_Ref_No%TYPE
                      ,Peventseqno  IN Cstbs_Contract.Latest_Event_Seq_No%TYPE
                      ,Puserid      IN VARCHAR2) RETURN BOOLEAN;
   */
   --Standalone12.3 CleanUp End		      

   PROCEDURE Pr_Initerrtbl;

   PROCEDURE Pr_Appendtbl(Perrcode IN Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2);

   -- 14-OCT-2005 KERNEL 7.1 CL Integration changes STARTS
   PROCEDURE Pr_Appendtbl(Perrcode IN Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2
                         ,Pamt     IN NUMBER);
   --14-OCT-2005 KERNEL 7.1 CL Integration changes ENDS

   PROCEDURE Pr_Readtbl(Perrcodes IN OUT VARCHAR2
                       ,Pparams   IN OUT VARCHAR2);

END Ovpks;
/
Drop Synonym Ovpkss
/
CREATE Synonym Ovpkss FOR Ovpks
/
