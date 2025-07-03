CREATE OR REPLACE PACKAGE olcoms
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olcoms.SPC
**
** Module		: MS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

-----------------------------------------------------------------------------------------------------------
*/
/*
Change History
10-SEP-2001 	FLEXCUBE 3.8 Citipoland 	Retroed from FCC 4.2.

*/





FUNCTION fn_validate_tags
				(	p_action_code	IN		VARCHAR2
				,	p_reference_no	IN		OLTB_COMMSG_MASTER.reference_no%TYPE
				,	p_err_codes		IN OUT	VARCHAR2
				,	p_err_params	IN OUT 	VARCHAR2
				,	p_tag			OUT		VARCHAR2
				)	RETURN BOOLEAN;

FUNCTION fn_build_message
				(	p_reference_no	IN		OLTB_COMMSG_MASTER.reference_no%TYPE
				,	p_message		OUT		LONG
				,	p_err_codes		IN OUT	VARCHAR2
				,	p_err_params	IN OUT 	VARCHAR2
				,	p_tag			OUT		VARCHAR2
				)	RETURN BOOLEAN;

END olcoms;
/
CREATE or replace SYNONYM olcomss FOR olcoms
/