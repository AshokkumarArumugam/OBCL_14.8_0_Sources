CREATE OR REPLACE PACKAGE olpks_copy_ccyhol
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_copy_ccyhol.SPC
**
** Module		: HOLIDAY MAINTAINANCE
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
/* CHANGE HISTORY
NEW PACKAGE IS ADDED TO COPY FROM MAINTAINANCE TABLES TO PROCESSING TABLES 
*/


FUNCTION FN_INS_CCY_HOL_MAS_ON_AUTH 			(P_CCY IN  VARCHAR2,
      	 							 P_YEAR IN NUMBER,
      								 p_errcode out varchar2)
RETURN boolean;

FUNCTION FN_INS_CCY_HOL_ON_AUTH 			(P_CCY IN  VARCHAR2,
      	 						 P_YEAR IN NUMBER,
      							 p_errcode out varchar2)
RETURN boolean;
END;


/
CREATE or replace SYNONYM olpkss_copy_ccyhol FOR olpks_copy_ccyhol
/