CREATE OR REPLACE VIEW lbvw_named_agent AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_named_agent.VW
**
** Module       : LB
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
SELECT * FROM LBTM_NAMED_AGENT
/
create or replace synonym lbvws_named_agent for lbvw_named_agent 
/