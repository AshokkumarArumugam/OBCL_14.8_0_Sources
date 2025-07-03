CREATE OR REPLACE package olpks_dcn as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_dcn.SPC
**
** Module		: MESSAGING SUBSYSTEM
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



	type dcn_rec is record(
				dcn_list varchar2(32767),
				n_dcn    number := 0
			      );
	type ty_dcn_tab is table of dcn_rec index by binary_integer;
	dcn_tab ty_dcn_tab;
	procedure pr_set_dcn(p_dcn_list varchar2,p_dcn_count number);
	procedure pr_reset_dcn;
end olpks_dcn;
/
create or replace synonym olpkss_dcn for olpks_dcn
/