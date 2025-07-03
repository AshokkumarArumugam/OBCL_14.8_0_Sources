CREATE OR REPLACE PACKAGE lbpks_global AS
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_global.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
23-DEC-2005 FLEXCUBE V.CL Release 7.0, Gowri, Created the package for LS module.
		Added Procedure pr_init
------------------------------------END CHANGE HISTORY-------------------------------------\
*/


g_ldcont  oltbs_contract_master%ROWTYPE;
g_cscont  oltbs_contract%ROWTYPE;
g_ldprod  oltms_product_master_ld%ROWTYPE;
g_csprod  oltms_product%ROWTYPE;

g_contract_ref_no oltbs_contract_master.contract_ref_no%TYPE;


PROCEDURE pr_cache(p_contract_ref_no IN oltbs_contract_master.contract_ref_no%TYPE,
			 p_err_code OUT ertbs_msgs.err_code%TYPE,
			 p_err_param OUT ertbs_msgs.message%TYPE);

FUNCTION fn_err_msg(p_err_code IN VARCHAR2)
RETURN VARCHAR2;

--FLEXCUBE V.CL Release 7.0, Gowri on 23-DEC-2005
PROCEDURE  PR_INIT;

END lbpks_global;
/
CREATE or replace SYNONYM lbpkss_global FOR lbpks_global
/