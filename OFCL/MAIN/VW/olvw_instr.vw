CREATE OR REPLACE VIEW olvw_instr AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_instr.VW
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
08-Mar-2018	Masking changes OBCL14_1_MASK  
*/
SELECT * FROM OLTM_INSTR
/
create or replace synonym olvws_instr for olvw_instr 
/