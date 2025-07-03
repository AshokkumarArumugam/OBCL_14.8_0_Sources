CREATE OR REPLACE PACKAGE olpks_upload_services
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_services.SPC
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
--------------------------------------------------------------------------------------------------------------------*/
/* Change History 
	05-dec-2003 FCC 4.4 itr1 SFR 110  conversion problems	 added synonym Creation in the package 
*/

TYPE		value_list_table_type
IS			TABLE
OF			VARCHAR2(4000)
INDEX BY	VARCHAR2(100);

TYPE		value_list_tab_table_type
IS			TABLE
OF			value_list_table_type
INDEX BY	BINARY_INTEGER;

TYPE		value_list_tab_tab_table_type
IS			TABLE
OF			value_list_tab_table_type
INDEX BY	VARCHAR2(100);

TYPE		cube_rec_record_type
IS			RECORD
			(
				rec_column			VARCHAR2(1000),
				ext_rectype			oltms_rec_details.cod_ext_rectype%TYPE,
				translation			NUMBER,
				translation_type	oltms_translation.translation_type%TYPE,
				default_value		VARCHAR2(1000)
			);

TYPE		cube_rec_table_details
IS			TABLE
OF			cube_rec_record_type
INDEX BY	VARCHAR2(100);

TYPE		cube_rec_table_type
IS			TABLE
OF			cube_rec_table_details
INDEX BY	VARCHAR2(100);

FUNCTION fn_get_values
	(
		p_rectype_list			IN		VARCHAR2,
		p_field_list			IN		VARCHAR2,
		p_value_list			IN		VARCHAR2,
		p_rectype_separator		IN		VARCHAR2,
		p_field_separator		IN		VARCHAR2,
		p_value_separator		IN		VARCHAR2,
		p_multi_rec_separator	IN		VARCHAR2,
		p_tab_values			OUT		value_list_tab_tab_table_type,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_cube_rec_details
	(
		p_module          		IN 		VARCHAR2,
		p_type_of_interface		IN		oltbs_cube_details.type_of_interface%TYPE,
		p_system				IN		oltms_rec_details.cod_system%TYPE,
		p_tbl_rec_cube_details	OUT		cube_rec_table_type,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_translate
	(
		p_system			IN		oltms_translation.source_code%TYPE,
		p_translation_type	IN		oltms_translation.translation_type%TYPE,
		p_internal_external	IN		VARCHAR2,
		p_external_branch	IN		oltms_translation.external_branch%TYPE,
		p_external_value	IN		oltms_translation.external_value%TYPE,
		p_default_value		IN		VARCHAR2,
		p_fcc_branch		IN		oltms_translation.internal_branch%TYPE,
		p_translation_mode	IN		NUMBER,
		p_out_value			OUT		oltms_translation.internal_value%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;


END olpks_upload_services;
/
CREATE or replace SYNONYM olpkss_upload_services FOR olpks_upload_services
/