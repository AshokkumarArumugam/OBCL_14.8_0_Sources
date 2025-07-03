CREATE OR REPLACE PACKAGE olpks_sak_upld AS

/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

FUNCTION  fn_upld_sak_rec(	p_directory	  	IN  		VARCHAR2,
					p_filename  		IN  		VARCHAR2,
					p_error_code		IN OUT		VARCHAR2,
					p_error_param		IN OUT		VARCHAR2 )
RETURN BOOLEAN ;

end olpks_sak_upld;
/