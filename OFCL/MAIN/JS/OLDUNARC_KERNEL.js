/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLCARCVW_KERNEL.js
**  Purpose            : 
**  Called From        : 
****************************************************************************************************************************/
function SingleCheck()
  {
   var selected_row = 0 ;
   var msob_tchk = 0 ;
   currRowIndex = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
   temp = 0 ;


     for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
          {
            msob_tchk = msob_tchk +1;
            selected_row = i ;
            temp=i ;
            }
         }
        else
          break;
       }

                 if (msob_tchk > 1 ) {                  
				  showErrorAlerts('IN-HEAR-205');
                  return false ;
                  }
                 else if (msob_tchk == 0 ) {                  
				  showErrorAlerts('IN-HEAR-206');
                  return false ;  }
                 else {
                  currRowIndex = selected_row +1 ;  }
  }
function FNVIEW()
{
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[1]);
     screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
	 screenArgs['OPERATION']='View';
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('OLCARCVW', seqNo);  
	 parent.screenArgs=screenArgs;       
 return true;

}