CREATE OR REPLACE PACKAGE lppks_participant_job AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lppks_participant_job.SPC
**
** Module       : LOANS SYNDICATION
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
-------------------------------------------------------------------------------------------
*/




  FUNCTION Fn_Job_Start(P_branch IN oltbs_contract.branch%type,
				p_Error_Code IN OUT VARCHAR2)
  RETURN BOOLEAN ;


   FUNCTION Fn_Job_Stop(P_branch IN oltbs_contract.branch%type,
				p_Error_Code IN OUT VARCHAR2)
   RETURN BOOLEAN ;

   PROCEDURE Pr_Contract_Upload(P_branch IN oltbs_contract.branch%type);


   PROCEDURE PR_Process_Job(P_branch IN oltbs_contract.branch%type,
					P_action IN VARCHAR2,
					p_Module IN VARCHAR2) ;


   FUNCTION Fn_Insert_Error_Log(Modulecode   IN VARCHAR2
                              ,Eventcode    IN VARCHAR2
                              ,P_brrefno      IN VARCHAR2
                              ,Statuscode   IN VARCHAR2
                              ,Errormessage IN VARCHAR2)
   RETURN BOOLEAN;
      
END lppks_participant_job ;
/