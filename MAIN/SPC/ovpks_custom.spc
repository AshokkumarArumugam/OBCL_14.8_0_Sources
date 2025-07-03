CREATE OR REPLACE PACKAGE ovpks_custom IS
/*-----------------------------------------------------------------------------------------------------
**
** File Name  : ovpks_custom.spc
**
** Module     : Core
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright © 2012, Oracle and/or its affiliates. All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any language
** or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Created By             : Anjali
Created On             : 13-Jan-2014
Create Description     : Extensibility Hook changes
Search String          : [SITECODE: 12.0.1,IUSDWFDP, BugDB ID:18026334]

       **  Modified  By :Anjali
       **  Modified On :21-Jan-2014
       **  Modified Reason :added the IN variable in function Getmsgandtype
	   **  Search String   :bug#18089420 changes
-------------------------------------------------------------------------------------------------------
*/

   FUNCTION Fn_pre_Gettype(perrcode IN   Ertbs_Msgs.Err_Code%TYPE,
							ptype IN OUT   CHAR) 
   RETURN CHAR;
   
   FUNCTION Fn_post_Gettype(perrcode IN   Ertbs_Msgs.Err_Code%TYPE,
							ptype IN OUT   CHAR) 
   RETURN CHAR;
   
   FUNCTION Fn_pre_Getmsgandtype(Perrorcode IN Ertbs_Msgs.Err_Code%TYPE
                            ,Plangcode  IN Smtbs_Language.Lang_Code%TYPE
                            ,Perrormsg  IN OUT Ertbs_Msgs.Message%TYPE--1201_18089420
                            ,Perrortype IN OUT CHAR--1201_18089420
                            ,Pconfirm   IN OUT CHAR--1201_18089420
                            ,Pformula   IN OUT Ertbs_Msgs.Derived_Msg%TYPE) --1201_18089420
    RETURN BOOLEAN;
	
	 FUNCTION Fn_post_Getmsgandtype(Perrorcode IN Ertbs_Msgs.Err_Code%TYPE
                            ,Plangcode  IN Smtbs_Language.Lang_Code%TYPE
                            ,Perrormsg  IN OUT Ertbs_Msgs.Message%TYPE--1201_18089420
                            ,Perrortype IN OUT CHAR--1201_18089420
                            ,Pconfirm   IN OUT CHAR--1201_18089420
                            ,Pformula   IN OUT Ertbs_Msgs.Derived_Msg%TYPE) --1201_18089420
    RETURN BOOLEAN;
	
	PROCEDURE Pr_pre_Appendtbl(Perrcode IN  Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2);

	PROCEDURE Pr_post_Appendtbl(Perrcode IN  Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2);						 

   PROCEDURE Pr_pre_Appendtbl(Perrcode IN  Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2
                         ,Pamt     IN NUMBER);
   PROCEDURE Pr_post_Appendtbl(Perrcode IN  Ertbs_Msgs.Err_Code%TYPE
                         ,Pparams  IN VARCHAR2
                         ,Pamt     IN NUMBER);					 
END ovpks_custom;
/
create or replace synonym ovpkss_custom for ovpks_custom
/