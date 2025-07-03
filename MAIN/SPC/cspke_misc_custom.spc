CREATE OR REPLACE PACKAGE cspke_misc_custom IS
/*-----------------------------------------------------------------------------------------------------
**
** File Name  : cspke_misc_custom.spc
**
** Module     : Core
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright © 2008 - 2015, Oracle and/or its affiliates. All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any language
** or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Created By             : Anjali
Created On             : 27-Feb-2014
Create Description     : Extensibility Hook changes

-------------------------------------------------------------------------------------------------------
*/

function fn_num2words(  p_lang cstms_amtword_text.lang%type,
                p_num number,
                p_ccy cstms_amtword_ccy.ccy%type)
return varchar2;


END cspke_misc_custom;
/
create or replace synonym cspkes_misc_custom for cspke_misc_custom
/