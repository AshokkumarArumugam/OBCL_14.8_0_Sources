CREATE OR REPLACE force VIEW olvw_fpml_tag_idx 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_fpml_tag_idx.VW
**
** Module	: LOANS SYNDICATION
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------
---------------------------------------- CHANGE HISTORY STARTS --------------------------------------
11-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 VOL1 FS Tag 08 changes, New Unit created
------------------------------------------ CHANGE HISTORY ENDS ----------------------------------------
*/
SELECT	ROWNUM Idx,column_value tag_name
FROM	TABLE(CAST(olpkss_markit_interface.fn_tag_view AS ol_lsty_char_tbl))
/
CREATE OR REPLACE synonym olvws_fpml_tag_idx FOR olvw_fpml_tag_idx
/