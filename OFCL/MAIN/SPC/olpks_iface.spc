CREATE OR REPLACE package olpks_iface
IS
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_iface.SPC
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
-------------------------------------------------------------------------------------
*/



PROCEDURE pr_tsUpl	(	prectype	IN		VARCHAR2
				,	pts		IN		VARCHAR2
				,	pdtf		IN		VARCHAR2
				,	pProc	  	IN		VARCHAR2
				,	pidentifier	OUT		VARCHAR2
				,	pFlag	   	OUT 		Number
				,	perr	  	IN OUT 	VARCHAR2
				,	pprms	   	IN OUT 	VARCHAR2
				);

End olpks_iface;
/
CREATE or replace SYNONYM olpkss_iface FOR olpks_iface
/