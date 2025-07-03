CREATE OR REPLACE PACKAGE olpks_string_services
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_string_services.SPC
**
** Module		: INTERFACES
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
Change History
05-dec-2003 FCC 4.4 itr1 SFR 110  conversion problems
*/

TYPE		table_type
IS			TABLE
OF			VARCHAR2(4000)
INDEX BY	BINARY_INTEGER;

TYPE		tab_table_type
IS			TABLE
OF			table_type
INDEX BY	BINARY_INTEGER;

FUNCTION fn_tokenize_into_table
	(
		p_value_list			IN		VARCHAR2,
		p_value_separator		IN		VARCHAR2,
		p_record_separator		IN		VARCHAR2,
		p_value_list_table		OUT		tab_table_type,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_tokenize
	(
		p_valuelist			IN		VARCHAR2,
		p_separator			IN		VARCHAR2,
		p_tab_values		OUT		table_type,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END olpks_string_services;
/
CREATE or replace SYNONYM olpkss_string_services FOR olpks_string_services
/