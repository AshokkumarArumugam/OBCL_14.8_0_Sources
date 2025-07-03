CREATE OR REPLACE PACKAGE olpks_udf_lcl_rep 
AS
/*------------------------------------------------------------------------------------------------
**
** File Name	: olpks_udf_lcl_rep.SPC
**
** Module	: INTERFACE
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
/*	CHANGE_HISTORY

31-DEC-2002	

07-NOV-2003	FCC4.4 DEC 2003 CITIPLC SFR PLC43040012	- New functions that were added were missing in 4.3 
						                  - retroed them(PLC40100062	New Function Added)

*/


FUNCTION FN_CHKSIREN (p_SIREN IN OLTM_UDF_LOV.KEY_VALUE%TYPE,
                      p_DD    IN OLTM_UDF_LOV.VALUE_DESC%TYPE)
RETURN BOOLEAN;

FUNCTION  FN_CUST_COUNTRY(P_CUST VARCHAR2) RETURN VARCHAR2;
--CITIPLC SFR PLC43040012
FUNCTION 	FN_DIRECTDECLARER
			(	p_SIREN 	IN	OLTM_UDF_LOV.KEY_VALUE%TYPE,
				p_ECO_CODE  IN	OLTM_UDF_LOV.KEY_VALUE%TYPE
			)	RETURN BOOLEAN;
FUNCTION  FN_CHKDD_FROM_RELCUST
		(	p_RELCUST 	IN 	oltms_customer.CUSTOMER_NO%TYPE)
RETURN BOOLEAN;
	

END olpks_udf_lcl_rep;
/
create or replace synonym olpkss_udf_lcl_rep for olpks_udf_lcl_rep
/