create or replace PACKAGE olpks_product_accrual  AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_product_accrual.SPC
**
** Module		: MIS
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking     
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or 
** computer language, without the prior written permission  from iflex 
** solutions limited.
	
**  i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 1997-2001 by i-flex solutions limited.
----------------------------------------------------------------------------------------------------

19-sep-2016 OFCL12.2 changes MIS Refinancing.Unit has been taken
*/

function fn_misupdate(pm_branch oltbs_class_mapping.branch_code%type)
	   return integer;
end olpks_product_accrual;
/