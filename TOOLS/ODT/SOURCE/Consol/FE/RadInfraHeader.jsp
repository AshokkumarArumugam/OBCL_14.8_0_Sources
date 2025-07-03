<!--
  **
  **
  ** File Name  : RadInfraHeader.jsp
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
        <title>RadInfraHeader</title>
         </head>
<body class="BODYTop">
    <!--Action Buttons-->
<div  class="Actionbuttons">
<fieldset class="FSTdiv" style="height:21px;overflow:hidden;" id="RadInfraHeaderButtons">
<legend>Tool Bar</legend>
<span>
<BUTTON class="BUTTONToolbarD" title="New"  name="new"  id="new" onclick="fnNew()"><img src="Images/New_enable.gif" alt="New" ></BUTTON>
</span>
<span style="vertical-align:middle;"><img src="Images/seperator.gif" width="1px" height="13px" alt=""></span>
<span>
<BUTTON class="BUTTONToolbarD" title="Save" name="save" id="save" onclick="fnSave()"><img  src="Images/Save.gif" alt="Save"></BUTTON>
</span>
<span>
<BUTTON class="BUTTONToolbarD" title="Cancel"  name="close" id="close" onclick="winrtn()"><img  src="Images/Cancel2.gif" alt="Cancel"></BUTTON>
</span>
<span style="vertical-align: middle;"><img src="Images/seperator.gif" width="1px"  alt=""></span>
<span>
<BUTTON class="BUTTONToolbarD" title="EnterQuery"  name="enqry"  id="enqry" onclick="fnEnterQuery()"><img src="Images/entrqry.gif" alt="Enter Query"></BUTTON>
</span>
<span>
<BUTTON class="BUTTONToolbarD" title="ExecuteQuery"  name="exqry"  id="exqry" onclick="fnExecuteQuery()" ><img src="Images/execqry.gif" alt="Execute Query"></BUTTON>
</span>
<span style="vertical-align:middle;"><img src="Images/seperator.gif" width="1px" height="13px" alt=""></span>
<span>
<BUTTON class="BUTTONToolbarD" title="UnLock"  name="UnLck"  id="UnLck" onclick="fnUnlock()"><img src="Images/Unlock.gif" alt="Unlock" ></BUTTON>
</span>
<span>
<BUTTON class="BUTTONToolbarD" title="Close Record"  name="CloseRecord"  id="CloseRecord" onclick="fnCloseRecord()" disabled="true"><img src="Images/Close1.gif" alt="Close Record"></BUTTON>
</span>
&nbsp;&nbsp;
</fieldset>
</div> 
<!--End of Action Buttons-->
</body>
</html>

