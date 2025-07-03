Create or replace Package olgtag is
/*----------------------------------------------------------------------------------------------------
**
** File Name	:olgtag.SPC
**
** Module	: MESSAGES
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


Function fn_msg_chk (p_format_name Varchar2,p_msg_type IN Varchar2,p_msg_tag IN OUT Varchar2,p_msg_flag IN  number,p_first IN OUT Number,p_result OUT Number,p_date IN OUT Varchar2) 
Return Boolean;
function fn_msg_parse(p_format_name IN varchar2,p_format_line IN varchar2,p_pos OUT number,p_last OUT number,p_flag OUT number)
return Varchar2 ;
End;
/