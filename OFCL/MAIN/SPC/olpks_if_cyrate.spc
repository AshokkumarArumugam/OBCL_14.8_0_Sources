CREATE OR REPLACE PACKAGE olpks_if_cyrate IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_if_cyrate.SPC
**
** Module	: INTERFACE
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


FUNCTION fn_propagate_rates
RETURN boolean ;

END olpks_if_cyrate ;
/
CREATE or replace SYNONYM olpkss_if_cyrate FOR olpks_if_cyrate
/