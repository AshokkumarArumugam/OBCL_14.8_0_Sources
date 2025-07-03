create or replace package olpks_flex_limits AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_flex_limits
**
** Module       : CORE SERVICES
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

/* change history

Version	Date		Site		Fix
1.2		31-jan-2000	fc33stp	Added a few more functions to utilize commonality bet.
						sec XXLIMITS and other module XXLIMITS.

*/

function fn_pop_flex_limits
			(
			pbranch	in	oltms_branch.branch_code%type,
			prun_date	in	date,
			perrcode	out ertbs_msgs.err_code%type,
			pparam	out varchar2
			)
return boolean;

--fc33stp1 til 41 - added function to create the queue automatically
function fn_build_branch_queue
			(
			p_branch		IN		oltms_branch.branch_code%type,
			p_processing_date	IN		Date,
			p_err_code		IN OUT	ertbs_msgs.err_code%type,
			p_err_param		IN OUT	Varchar2
			)
return boolean ;

function fn_get_limit_basis_amt (	prun_date 			in	date,
						p_limit_basis_flag	in	varchar2,
						p_limit_basis		in	varchar2,
						p_limit_basis_amt 	out	number,
						p_limit_ref			in	Varchar2
					   )
return boolean ;

function fn_get_curr_period (	prun_date		in	date,
					pperiod		in	varchar2,
					pper_start		in	varchar2,
					l_per_start_dt	out	date,
					l_per_end_dt	out	date)
return boolean ;


end;
/
create or replace synonym olpkss_flex_limits for olpks_flex_limits
/