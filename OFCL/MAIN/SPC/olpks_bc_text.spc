CREATE OR REPLACE PACKAGE olpks_bc_text AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_bc_text.SPC
**
** Module       : BC
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
TYPE text_out_table is TABLE of Varchar2(32000) INDEX BY BINARY_INTEGER;

FUNCTION fn_get_text_lines	(
				p_in_string		IN OUT	Varchar2,
				p_length		IN	Number,
				p_no_of_lines		IN	Number,
				p_out_table		IN OUT	olpks_bc_text.text_out_table,
				p_err_code		OUT	ERTBS_MSGS.err_code%type,
				p_err_code_params	OUT	Varchar2
				) RETURN BOOLEAN ;

END olpks_bc_text;
/
CREATE or replace SYNONYM olpkss_bc_text for olpks_bc_text
/