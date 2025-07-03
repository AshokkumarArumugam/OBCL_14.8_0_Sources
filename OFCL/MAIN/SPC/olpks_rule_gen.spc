create or replace package olpks_rule_gen as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rule_gen.SPC
**
** Module		: Auto FT - STP
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


function fn_gen_rule(p_msg varchar2,p_err_code in out varchar2, 
                     p_param in out varchar2) return boolean;
end olpks_rule_gen;
/

create or replace synonym olpkss_rule_gen for olpks_rule_gen
/