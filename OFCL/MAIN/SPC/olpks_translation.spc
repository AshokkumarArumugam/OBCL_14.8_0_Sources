CREATE OR REPLACE PACKAGE olpks_translation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_translation
**
** Module       : INTERFACE
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
CHANGE_HISTORY
05-FEB-02 FCC3.9 PLNCITI SFR NO 3437 	In XCUP Upload for 9 index ACCOUNTS, translation should be done based on Branch codes
							fn_translate is being overloaded.	
22-NOV-04 FCC 4.6.1 JAN 2005 ISRCITI TIL#49 Added function fn_translate1 to accept ext_branch_code							
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
*/


FUNCTION fn_translate
	(
	p_source_code		IN  		oltms_translation_type.source_code%TYPE,
	p_translation_type  	IN  		oltms_translation_type.translation_type%TYPE,
	p_external_value  	IN 		oltms_translation.external_value%TYPE,
	p_unable_to_assign 	OUT  		boolean,
	p_internal_value  	IN OUT  	oltms_translation.internal_value%TYPE,
	p_error_code  		IN OUT 		varchar2,
	p_error_parameter 	IN OUT 		varchar2
	)
	RETURN boolean;

FUNCTION fn_get_internal_value
	(
	p_source_code 		IN 		oltms_translation_type.source_code%TYPE,
	p_translation_type 	IN 		oltms_translation_type.translation_type%TYPE,
	p_external_value 	IN		oltms_translation.external_value%TYPE,
	p_unable_to_assign	OUT 		boolean,
	p_internal_value 	IN OUT 		oltms_translation.internal_value%TYPE,
	p_error_code		IN OUT		varchar2,
	p_error_parameter	IN OUT		varchar2
	)
	RETURN boolean;

FUNCTION fn_translate_internal_value
	(
	p_source_code 		IN 		oltms_translation_type.source_code%TYPE,
	p_translation_type 	IN 		oltms_translation_type.translation_type%TYPE,
	p_external_value 	IN OUT		oltms_translation.external_value%TYPE,
	p_unable_to_assign	OUT 		boolean,
	p_internal_value 	IN 		oltms_translation.internal_value%TYPE,
	p_error_code		IN OUT		varchar2,
	p_error_parameter	IN OUT		varchar2
	)
	RETURN boolean;

FUNCTION fn_translate_internal_value
	(
	p_source_code 		IN 		oltms_translation_type.source_code%TYPE,
	p_translation_type 	IN 		oltms_translation_type.translation_type%TYPE,
	p_branch_code		IN		oltms_branch.branch_code%type,
	p_external_value 	IN OUT		oltms_translation.external_value%TYPE,
	p_unable_to_assign	OUT 		boolean,
	p_internal_value 	IN 		oltms_translation.internal_value%TYPE,
	p_error_code		IN OUT		varchar2,
	p_error_parameter	IN OUT		varchar2
	)
	RETURN boolean;

FUNCTION fn_translate_internal_value
	(
	p_source_code 		IN 		oltms_translation_type.source_code%TYPE,
	p_translation_type 	IN 		oltms_translation_type.translation_type%TYPE,
	p_int_branch_code	IN		oltms_branch.branch_code%type,
	p_ext_branch_code	IN		oltms_branch.branch_code%type,
	p_external_value 	IN OUT		oltms_translation.external_value%TYPE,
	p_unable_to_assign	OUT 		boolean,
	p_internal_value 	IN 		oltms_translation.internal_value%TYPE,
	p_error_code		IN OUT		varchar2,
	p_error_parameter	IN OUT		varchar2
	)
	RETURN boolean;

--FCC3.9 PLNCITI SFR No 3437 starts
FUNCTION fn_translate
	(
	p_source_code		IN  		oltms_translation_type.source_code%TYPE,
	p_translation_type  	IN  		oltms_translation_type.translation_type%TYPE,
	p_external_value  	IN 		oltms_translation.external_value%TYPE,
	p_unable_to_assign 	OUT  		boolean,
	p_internal_value  	IN OUT  	oltms_translation.internal_value%TYPE,
	p_error_code  		IN OUT 		varchar2,
	p_error_parameter 	IN OUT 		varchar2,
	p_branch_code		IN		varchar2
	)
	RETURN boolean;
--FCC3.9 PLNCITI SFR No 3437 ends

--FCC 4.6.1 JAN 2005 ISRCITI Til#49 changes starts here…
FUNCTION fn_translate1
	(
	p_source_code 		IN 		oltms_translation_type.source_code%TYPE,
	p_translation_type 	IN 		oltms_translation_type.translation_type%TYPE,
	p_external_value 	IN		oltms_translation.external_value%TYPE,
	p_unable_to_assign	OUT 		boolean,
	p_internal_value 	IN OUT 		oltms_translation.internal_value%TYPE,
	p_error_code		IN OUT		varchar2,
	p_error_parameter	IN OUT		varchar2,
	p_branch_code		IN		varchar2,
	p_ext_branch		IN		varchar2
	)
	RETURN boolean;
--FCC 4.6.1 JAN 2005 ISRCITI Til#49 changes ends here…

END olpks_translation;
/
CREATE or replace SYNONYM olpkss_translation FOR olpks_translation
/