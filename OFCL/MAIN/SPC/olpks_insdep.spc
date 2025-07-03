CREATE OR REPLACE PACKAGE olpks_insdep AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_insdep.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/
/*					CHANGE HISTORY

16/MAY/2002 FCC4.0 JUNE 2002 ASPAC CHANGES Added a new function for manual payment of drawdown schedule 

*/

  FUNCTION Fn_Process_Manager(pProcessTillDate IN    DATE,
                              pCommitFrequency IN    NUMBER, 
                              pErrCode         OUT   VARCHAR2,
                              pErrParam        OUT   VARCHAR2
                              )
  RETURN BOOLEAN;
  FUNCTION FnUpdateInterestAmt( pContractRefNo IN  VARCHAR2,
                                pMainComp      IN  VARCHAR2,
                                pErrCode       OUT VARCHAR2,
                                pErrParam      OUT VARCHAR2    
                             )
  RETURN BOOLEAN;
  
  FUNCTION	Fn_ManualInsdepSchPay (	pContractRefNo    IN       	VARCHAR2,
				  		pContractDiffAmt  IN	   	NUMBER,
			  	  		pmaincomp		IN	   	VARCHAR2,
						PLatestVersionNo	IN		NUMBER,
						pAmenddate		IN		DATE,
						poldmaturitydate	IN		DATE,
						pmaturitydate	OUT		DATE,	
						pErrCode          OUT		VARCHAR2,
                       			pErrParam         OUT      	VARCHAR2
				)
  RETURN Boolean;

  FUNCTION Fn_ValidateScheduleAmt ( pContractRefNo    IN       	VARCHAR2,
						pContractDiffAmt  IN	   	NUMBER,
						pValueDate		IN		Date,
						perr_code		OUT	VARCHAR2			  	  	
				)
  RETURN Boolean; 

END olpks_insdep;
/
CREATE or replace SYNONYM olpkss_insdep FOR olpks_insdep
/