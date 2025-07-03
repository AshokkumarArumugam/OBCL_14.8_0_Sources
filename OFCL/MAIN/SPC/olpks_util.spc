CREATE OR REPLACE PACKAGE olpks_util AS

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
  PROCEDURE RunCmds (p_command  IN  VARCHAR2) ;
 PROCEDURE GET_DIR_LIST(p_dir IN VARCHAR2, p_dirList OUT ol_strarray);
END olpks_util;
/