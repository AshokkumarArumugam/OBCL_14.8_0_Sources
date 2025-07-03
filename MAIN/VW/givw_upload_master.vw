CREATE OR REPLACE VIEW givw_upload_master AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2004 - 2010  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
-----------------------------------------------------------------------------------------*/
select "RECORD_REFERENCE","INTERFACE_CODE","FILE_NAME","EXTERNAL_SYSTEM","FUNCTION_ID","PROCESS_NO","STATUS","ACTION","TARGET_TABLE","ERROR","ERROR_PARAM","FLD1","FLD2","FLD3","FLD4","FLD5","FLD6","FLD7","FLD8","FLD9","FLD10","FLD11","FLD12","FLD13","FLD14","FLD15","FLD16","FLD17","FLD18","FLD19","FLD20","FLD21","FLD22","FLD23","FLD24","FLD25","FLD26","FLD27","FLD28","FLD29","FLD30","FLD31","FLD32","FLD33","FLD34","FLD35","FLD36","FLD37","FLD38","FLD39","FLD40","FLD41","FLD42","FLD43","FLD44","FLD45","FLD46","FLD47","FLD48","FLD49","FLD50","FLD51","FLD52","FLD53","FLD54","FLD55","FLD56","FLD57","FLD58","FLD59","FLD60","FLD61","FLD62","FLD63","FLD64","FLD65","FLD66","FLD67","FLD68","FLD69","FLD70","FLD71","FLD72","FLD73","FLD74","FLD75","FLD76","FLD77","FLD78","FLD79","FLD80","FLD81","FLD82","FLD83","FLD84","FLD85","FLD86","FLD87","FLD88","FLD89","FLD90","FLD91","FLD92","FLD93","FLD94","FLD95","FLD96","FLD97","FLD98","FLD99","FLD100","FLD101","FLD102","FLD103","FLD104","FLD105","FLD106","FLD107","FLD108","FLD109","FLD110","FLD111","FLD112","FLD113","FLD114","FLD115","FLD116","FLD117","FLD118","FLD119","FLD120","FLD121","FLD122","FLD123","FLD124","FLD125","FLD126","FLD127","FLD128","FLD129","FLD130","FLD131","FLD132","FLD133","FLD134","FLD135","FLD136","FLD137","FLD138","FLD139","FLD140","FLD141","FLD142","FLD143","FLD144","FLD145","FLD146","FLD147","FLD148","FLD149","FLD150","FLD151","FLD152","FLD153","FLD154","FLD155","FLD156","FLD157","FLD158","FLD159","FLD160","FLD161","FLD162","FLD163","FLD164","FLD165","FLD166","FLD167","FLD168","FLD169","FLD170","FLD171","FLD172","FLD173","FLD174","FLD175","FLD176","FLD177","FLD178","FLD179","FLD180","FLD181","FLD182","FLD183","FLD184","FLD185","FLD186","FLD187","FLD188","FLD189","FLD190","FLD191","FLD192","FLD193","FLD194","FLD195","FLD196","FLD197","FLD198","FLD199","FLD200","BRANCH_CODE","PHY_FILE_NAME","PROCESS_REF_NO" from GITU_UPLOAD_MASTER
/

CREATE OR REPLACE SYNONYM givws_upload_master FOR givw_upload_master
/
