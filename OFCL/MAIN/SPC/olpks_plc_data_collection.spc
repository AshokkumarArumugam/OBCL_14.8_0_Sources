CREATE OR REPLACE PACKAGE olpks_plc_data_collection AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_plc_data_collection
**
** Module		: MI
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



/*
change history
27/01/2002 CITIPLC FCC4.0 SFR PLC4007036 New CITIPLC site specific MIS data collection and refin calc program
*/

FUNCTION fn_new_main	(	in_branch	oltbs_class_mapping.branch_code%type
			)
RETURN INTEGER;

END olpks_plc_data_collection;
/
CREATE or replace SYNONYM olpkss_plc_data_collection FOR olpks_plc_data_collection
/