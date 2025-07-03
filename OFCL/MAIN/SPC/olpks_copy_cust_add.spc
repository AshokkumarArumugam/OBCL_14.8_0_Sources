CREATE OR REPLACE PACKAGE olpks_copy_cust_add
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_copy_cust_add.SPC
**
** Module		: MIS
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
29-JAN-2003 APR 2003 LS changes. Added another paramter 'ENTITY'in the fuction call to FN_INS_CUST_ADD_ON_AUTH 
14-Apr-2003 FCC 4.2 Apr 2003 ITR1 fixes. added default value to entity
20-Apr-2003 FCC 4.2 Apr 2003 ITR1 fixes. added entity in call to function FN_INS_MSG_ADD_ON_AUTH
18-JUN-2003 FCC4.3 AUG 2003 VERSION NO CHANGES
*/


FUNCTION FN_INS_CUST_ADD_ON_AUTH (P_CUSTOMER IN  VARCHAR2,
				P_MEDIA IN VARCHAR2,
				P_LOCATION IN VARCHAR2,
				p_errcode out varchar2,
				P_ENTITY IN VARCHAR2 := '$$$', -- FCC 4.2  APR 2003 LS changes
				P_VERSION_NO IN NUMBER)	--FCC4.3 AUG 2003 VERSION NO CHANGES
RETURN boolean;

FUNCTION FN_INS_MSG_ADD_ON_AUTH (P_CUSTOMER IN  VARCHAR2,
				 P_MEDIA IN VARCHAR2,
				 P_LOCATION IN VARCHAR2,
				 p_errcode out varchar2,
				 P_ENTITY IN VARCHAR2 := '$$$',--FCC 4.2 Apr 2003 ITR1 fixes.
				 P_VERSION_NO IN NUMBER) --FCC4.3 AUG 2003 VERSION NO CHANGES
RETURN boolean;
END;


/
CREATE or replace SYNONYM olpkss_copy_cust_add FOR olpks_copy_cust_add
/