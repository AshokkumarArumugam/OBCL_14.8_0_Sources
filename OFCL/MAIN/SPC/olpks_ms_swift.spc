create or replace package olpks_ms_swift as  
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ms_swift.SPC
**
** Module		: MESSAGES
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


	type	rec_msg_field is RECORD
	(
	field		varchar2(5),
	field_name	varchar2(30),
	value		varchar2(35),
	modifiable	varchar2(1)
	);
	type msg_array is table of rec_msg_field INDEX BY BINARY_INTEGER;

	function fn_swift_decompose(	p_message in varchar2,
						p_type varchar2,
						p_msg_array out olpks_ms_swift.msg_array) 
	return boolean;

	function fn_swift_recompose(	p_message in varchar2,
					p_type varchar2,
					p_msg_array  olpks_ms_swift.msg_array,
					p_final_message out varchar2) 
	return boolean;

end;
/