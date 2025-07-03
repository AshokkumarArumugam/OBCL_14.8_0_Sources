CREATE OR REPLACE PACKAGE olpks_reprice_hoff IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_reprice_hoff.SPC
**
** Module		: LOANS AND DEPOSIT
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
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION

------------------------------------END CHANGE HISTORY-----------------------------------------------------------
*/



  PROCEDURE Pr_Reprice_Contract_Upload;
  PROCEDURE Pr_Reprice_Payment_Upload;
  FUNCTION Fn_Process_Ld_Deals(Direction IN VARCHAR2
                              ,p_Module  IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Process_Ld_Deals_In_Cube(p_Module IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Process_Ld_Pmnts_In_Cube(p_Module IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Insert_Error_Log(Modulecode   IN VARCHAR2
                              ,Eventcode    IN VARCHAR2
                              ,Mmrefno      IN VARCHAR2
                              ,Cuberefno    IN VARCHAR2
                              ,SOURCE       IN VARCHAR2
                              ,Statuscode   IN VARCHAR2
                              ,Errormessage IN VARCHAR2) RETURN BOOLEAN;
END olpks_reprice_hoff;
/
CREATE or replace SYNONYM olpkss_reprice_hoff FOR olpks_reprice_hoff
/