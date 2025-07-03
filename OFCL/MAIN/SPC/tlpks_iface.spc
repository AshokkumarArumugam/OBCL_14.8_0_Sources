CREATE OR REPLACE PACKAGE tlpks_iface AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_iface.SPC
**
** Module       : SECONDARY LOAN TRADING
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
/*----------------------------------CHANGE HISTORY----------------------------------

15-06-2008 - FLEXCUBE V.CL 7.4 Release, this package is created newly for LQT-Interface with FLEXCUBE for LT Module.

---------------------------------------------------------------------------------------------------
*/

PROCEDURE pr_tsUpl		(	
					prectype	IN		VARCHAR2
				,	pts		IN		VARCHAR2
				,	pdtf		IN		VARCHAR2
				,	pProc		IN		VARCHAR2
				,	pidentifier	OUT		VARCHAR2
				,	pFlag		OUT 		Number
				,	perr		IN OUT 	VARCHAR2
				,	pprms		IN OUT 	VARCHAR2
				);

END tlpks_iface;
/
CREATE or replace Synonym tlpkss_iface for tlpks_iface
/