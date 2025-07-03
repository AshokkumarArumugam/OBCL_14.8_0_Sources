<!--
  **
  **
  ** File Name  : RadCopyright.jsp
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
  ** Copyright   2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  

-->
<%@page import="com.ofss.odt.util.ODTUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <%
String js_parser ="";
boolean bowserVer  = false; 
String userAgent = request.getHeader("USER-AGENT").toUpperCase();
if(userAgent.contains("MSIE") || (userAgent.contains("TRIDENT") && userAgent.contains("RV"))) {//ie11 changes
    js_parser = "BROWSER_IE.js";
    bowserVer = true;
} else {
    js_parser = "BROWSER_NonIE.js";
}
%>
<html lang="en" >
   <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content=0>
        <link type="text/css" rel="stylesheet" href="Theme/RAD.css"></link>  
        <link type="text/css" rel="stylesheet" href="Theme/ODTExten.css"></link>
        <link type="text/css" rel="stylesheet" href="Theme/ODTExtFlexblue.css"></link>
		<title><%=ODTUtils.stripXSS(request.getParameter("title"))%></title>
		<script type="text/javascript" src="Script/JS/<%=js_parser%>"></script>
		<script type="text/javascript" src="Script/JS/RadUtil.js"></script>
		<script type="text/javascript" src="Script/JS/Extensible.js"></script>
        <script type="text/javascript" type="text/javascript">
        
				var g_scrType ="C";                
				 var mainWin  = parent;    
				//var scrht = 900;
				// var scrwdt= 900;			


				 var scrht = (screen.availHeight/1);
				var scrwdt= (screen.availWidth/1);				
                 var seqNo  = parent.funcGenSeqNo;                 
                 window.frameElement.name = seqNo;
				 if(parent.document.getElementById("testwin"))
                 parent.document.getElementById("testwin").id = seqNo;   
            function fnLoad()
            {
                mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
                fnCalcHgt();
				document.getElementById("Cancel").focus(); 
            } 
</script> 
</head>
<body class="BODYDetails" onload="fnLoad()" onkeydown="fnAccessChildScreens(event)" >
<div class="WNDcontainer" id="DIVWNDContainer">
    <div class="WNDtitlebar" id="WNDtitlebar" >
        <div class="WNDtitle" id="wndtitle" onmousedown="startDrag(seqNo, event)"> <h1 class="WNDtitletxt">FAQ's</h1>
            <div class="WNDbuttons">
				<a class="WNDcls" href="#nogo" onblur="this.className='WNDcls'" onmouseover="this.className='WNDclsH'" onfocus="this.className='WNDclsH'" onmouseout="this.className='WNDcls'" title="Close" id="WINCLOSE" NAME="WINCLOSE"  onclick="if(this.disabled) return false; fnRADExitAll(seqNo, event)">
					<span class="LBLinv">Close</span>
				</a>
				<a class="WNDmin" href="#nogo" onblur="this.className='WNDmin'" onmouseover="this.className='WNDminH'" onfocus="this.className='WNDminH'" onmouseout="this.className='WNDmin'" title="Minimize" onclick="parent.fnMinimize(seqNo, event)">
					<span class="LBLinv">Minimize</span>
				</a>
            </div>
        </div>
    </div>
<div>
<form> 

<div class="DIVMultipleBigInner">
<div style="BORDER:#b9ccf6 1px solid; BACKGROUND-COLOR:#ffffff; MARGIN-TOP:15px; margin-left:25px;margin-right:25px;WIDTH:auto;DISPLAY: block;height:750px;overflow:AUTO">

<div align="center" ><img src="Images/title.gif" height="50" width="315" alt="ORACLE FLEXCUBE - Development Workbench for Universal Banking">
<h3>Version : 12.5</h3>
<p style="font:Arial, Helvetica, sans-serif; font-size:.75em ">Copyright &copy; 2017, Oracle and/or its affiliates. All rights reserved.</p>
</div>
<div style="padding-left:10px;">
<p style="font:Arial, Helvetica, sans-serif; font-size:.75em ">  
Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.

This software and related documentation are provided under a license agreement containing restrictions on use and disclosure and are protected by intellectual property laws. Except as expressly permitted in your license agreement or allowed by law, you may not use, copy, reproduce, translate, broadcast, modify, license, transmit, distribute, exhibit, perform, publish or display any part, in any form, or by any means. Reverse engineering, disassembly, or decompilation of this software, unless required by law for interoperability, is prohibited.

The information contained herein is subject to change without notice and is not warranted to be error-free. If you find any errors, please report them to us in writing.
</p>
<p style="font:Arial, Helvetica, sans-serif; font-size:.75em ">  
This section acts as a developer guide which helps to understand and resolve some issues frequently encountered by developers while using ODT. 
</p>
<p style="color:red; font-weight: bold">
1. What will I do if I get a java script error or problem displaying error with ActiveX? 
</p>
<p>
Ans: This is most likely to be a problem with IE settings. Please refer to �RAD RELATED ISSUES.pdf� to do the settings which are the prerequisite to run an ODT URL. For versions older than 12.0.2, IE settings are required. Active X has to be enabled in Local Intranet Zone. In addition to that please install MSXML 4.0 and 6.0. IE settings are a prerequisite. 
Please make sure you have correct settings before even accessing the link. 
</p>
<p style="color:red; font-weight: bold">
2. When the error message that "Script is slowing down the browser" comes: </p>
<p>
To change this time-out value in Internet Explorer 4.0, 5.0, 6, 7, or 8, follow these steps: 
1. Using a Registry Editor such as Regedt32.exe, open this key: 
HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Styles 
Note If the Styles key is not present; create a new key that is called Styles. 
2. Create a new DWORD value called "MaxScriptStatements" under this key and set the value to the desired number of script statements. If you are unsure of what value you need to set this to, you can set it to a DWORD value of 0xFFFFFFFF to completely avoid the dialog. 
By default the key doesn't exist. If the key has not been added, the default threshold limit for the time-out dialog box is 5,000,000 statements for Internet Explorer 4 and later. 
Because the Internet Explorer 4.0, 5.0, 6, 7, and 8 time-out is based on the number of script statements executed, the time-out dialog box will not display during ActiveX control or database-access delays. Endless loops in script will still be detected. 
</p>
<p style="color:red; font-weight: bold">
3. Flexcube database connectivity error. ? 
</p><p>
This error is because of problems with the settings with TNS entry. If the schema password is updated but the same has not been updated for the ODT, then also database connectivity issue will come. This may come in the form of �Error 500 �Internal Server Error�. In Newer Versions of ODT (12.0.2), Error Window wills popup saying �Not Able to Connect to User Schema�. ?? 
</p>
<p style="color:red; font-weight: bold">
4. Can we make screen sections as collapsible in ODT? 
</p>
<p>
Yes, by checking the checkbox callable available in section we can make the section collapsible. 
</p>
<p style="color:red; font-weight: bold">
5. Element from previous release cannot be renamed. 
</p>
<p>
This is not a supported feature in ODT. Manual Deletion of Elements will result in error during upgrading/refresh of the RADXML in future. However if required can be resolved by the ODTsupport team. A Bug can be raised against ODT. 
</p>
<p style="color:red; font-weight: bold">
6. Issues with version conflict. 
</p>
<p>
There is always recommended that while editing a RAD XML use the particular version of ODT in which the RAD XML was created and then use the particular RAD XML across the higher versions. 
Previous Release Nodes or Data Will Not Be deleted from the current and above release as this will cause issues while refreshing. 
</p>
<p style="color:red; font-weight: bold">
7. Changes done for LOV requires application to be restarted. 
</p>
<p>Due to cache feature provided by infra team, the application server needs to be restarted after the change of LOV query. Otherwise the required changes will not get reflected in the front end. 
</p>
<p style="color:red; font-weight: bold">
8. In RAD generated main package, l_xsd_node and l_node coming as null for call form block: 
</p><p>This happens because proper data is not maintained in CSTB_CALL_FORM_NODES and SMTB_MENU for the callform. </p>
<p style="color:red; font-weight: bold">9. On trying to load RAD xml, C:\Fakepath\*.xml not found error: 
</p><p>This can be solved by adding RAD URL in Internet Options -> Security -> Trusted Sites. </p>
<p style="color:red; font-weight: bold">10. In UIXML, LBL>���</LBL> appearing instead of respective language label, say in Chinese(CHN) for instance: 
</p><p>For proper UIXML with Non-Eng labels, we need to make sure various parameters are proper. 
i) If RAD is locally deployed at Onsite, Make sure entry is there in �RDTM_LANGUAGE� table for Chinese language as � CHN Chinese. 
ii) Make sure Language is properly set in environment code page(for the environment code mapped to the release) and user preferences before generating files. 
iii) Generated UIXML are UTF-8 compliant. 
iv) RAD should be connecting to the FLEXCUBE schema which contains tables that have Chinese labels details. </p>
<p style="color:red; font-weight: bold">
11. While generating ODT files an error is displayed with the description �Failed to process Request". What could be the problem? 
</p><p>This means Processing has failed due to a design error. Below are the points which can be incorporated while designing RAD XML to address this issue: 
� Provide PK Cols in Data Source i.e. Primary key should be maintained for all data sources. 
� Provide valid PK Types. 
� Master block and data source should not have parents. 
� We recommend to put the default where clause in Upper case including the Logical Operators. All Relationships, Order by, where clause etc has to be in upper case. 
� For Branch Screens, ODT will not generate Backend Units. Only SYS and UIXML files will be created. </p>
<p style="color:red; font-weight: bold">
12. Compilation error pointing a line �If Then� (Package body generated is invalid) : 
</p><p> This is because of improper relationship of child data source with the parent data source. 
i. All data sources should have parent data source and master data source should not have parent. 
ii. All data blocks should have parent data blocks and master data block should not have parent. 
iii. Primary keys are compulsory for all data sources. 
iv. If a data source is multi record 'yes' then it should have at least one extra primary key than its parent. </p>
<p style="color:red; font-weight: bold">13. Error on Source Refresh: Only one Multiple View Type Field set is allowed for a block : 
</p><p>ODT will not allow two field sets for same block if it is multi entry. </p>
<p style="color:red; font-weight: bold">14. Tampering of RAD xml manually: ? 
</p><p>RAD XML�s should not be opened and edited manually. It can give rise to various types of issues. </p>
<p style="color:red; font-weight: bold">15. Audit fields are mandatory in master data source for maintenance screen. 
</p><p>Yes, it is mandatory for maintenance screen. </p>
<p style="color:red; font-weight: bold">16. How can we skip all kernel code in Post_Default_and_Validate for action code MODIFY from custom 
</p><p>1) In pre_default_nad_validate of custom Package set Skip Kernel to TRUE; 
IF p_action_code = Cspks_req_global.p_modify THEN 
Pr_Set_Skip_kernel; 
END IF; 
2) You need to activate the Kernel after execution of Post_Default_and_Validate. Else all Kernel code would be skipped. 
Hence in Post_Default_and_validate of Custom ; Reactivate Kernel; 
IF p_action_code = Cspks_req_global.p_modify THEN 
Pr_Set_Activate_kernel; 
END IF; </p>
<p style="color:red; font-weight: bold">
17. By the above logic, will the pre_default_and_validate of kernel package would also get skipped in addition to the post_default_and_validate of kernel package? 
</p><p>Yes , Kernel Pre default and Validate would also be skipped if skip_variable is set to true in pre_default_and_validate. 
Instead it can be skipped in post_default_and_validate of Custom and re-activated in pre_upload_db of custom 
Another approach is to write skip logic in Pr_Skip_handler function provided in custom Packages. 
?To skip, Kernel Query Logic ? 
IF p_Stage = 'PREQRY' THEN 
stpks_stdcif_main.Pr_Set_Skip_Kernel; 
END IF; 
IF p_Stage = 'POSTQRY' THEN 
stpks_stdcif_kernel.Pr_Set_Activate_Kernel; 
END IF; 
Note : It is not possible to selectively skip the validations within a hook function . All the validations written in that hook function would be skipped. 
</p>
<p style="color:red; font-weight: bold">18. Brief introduction of Notifications? 
</p><p>Notifications in FLEXCUBE can be divided in two stages 
1) Derive the events for which notifications has to be sent . 
Triggers are used for this purpose . Notification Triggers will insert data into STTB_NOTIFICATION_MASTER on trigger of required event (update/insert of particular fields in table) 
2) Processing and Creation of Notifications 
Scheduler will poll on STTB_NOTIFICATION_MASTER as process all unprocessed entries on regular intervals. 
Notification would be created based on configuration done in ODT on Notifications screen . In Notification Screen , developer can define the format of notification message. 
He can either map a gateway Service and Operation to this notification.( Normal Execute Query ) 
OR 
If the notification message is simple , then the xml tags can be defined in the screen itself 
FLEXCUBE framework would generate notification based on these maintenances 
For code u can refer - gwpks_notification_fcj and any notification package generated by ODT 
Refer ODT docs on Notification for more details 
</p>
<p style="color:red; font-weight: bold">
19. What is upload table feature introduced in ODT 12.0.2? 
</p><p>FLEXCUBE currently supports uploading of records from upload tables (through screen CVDUPLOD).This is used for bulk upload of data into the system . 
In this routine ,data will be pumped into upload tables and from the upload tables it will be processed by the system and saved in base tables . 
Previously a standard framework was not in place for this feature. Now a standard framework is introduced in FLEXCEUBE through ODT for the same . 
</p>
<p style="color:red; font-weight: bold">
20. While Developing/Designing a New Screen Using ODT (V 12.0.1) � Wants to Assign the value of Global. Variables like Global.Application_date, Global.user_id etc to the Columns available in the Front Screen Instead of using the �Default� Option in ODT . Whether the same is Possible and if so how to do the same? 
</p><p>
This feature is introduced in ODT from 12.0.2 . In earlier versions , defaulting has to be done using JavaScript . mainWin variable can used to access global parameter values in JavaScript 
Example : mainWin.CurrentBranch 
</p>
<p style="color:red; font-weight: bold">
21. Screen Arguments are not getting populated while attaching a callform to a screen.??? 
</p><p>Static Scripts for CSTB_CALL_FORM_NODES and SMTB_MENU generated by the Call Form Radxml has to be compiled in the FLEXCUBE schema before attaching that call form to any screen. Call form details are populated 
based on the maintenance in these tables. </p>
<p style="color:red; font-weight: bold">
22. Save Mode as Client as not visible in the option list. </p><p>
Client Mode is available only in Internet Explorer. If any other browsers are used, then only server/Zip mode can be used(i.e, list files and path should be present in the ODT server) 
</p><p style="color:red; font-weight: bold">23. What is the restriction of Multi record field set mapping? 
</p><p>Multi Record block can be attached to only a Single multiple view Fieldset.</p>
<p style="color:red; font-weight: bold"> 
24. Can we generate the Webservice artifacts using ODT ? </p><p>
Yes. Web services artifacts (WSDL file , IMPL file) generation feature is available from ODT 12.0 onwards. </p>
<p style="color:red; font-weight: bold">
25. Which mode should be used for Refresh? </p><p>
Save mode should either be Client or server for any type of refresh. Same can be set in Options->User Preferences ->Save mode </p>
<p style="color:red; font-weight: bold">
26. Impact of Hidden fields in the generated XSDs .
</p><p> 
Block Level hidden fields will not be considered at the time of XSD generation. Those fields won't be present in the generated XSDs. 
</p><p style="color:red; font-weight: bold">
27. Can we used KERNEL/CLUSTER Release mode for Consulting /Partners/Support development? 
</p><p>
KERNEL/CLUSTER Release type should only be used by Engineering team. 
Consulting /Partners/Support development are supposed to use only CUSTOM realese type. 
</p><p style="color:red; font-weight: bold">
28. What are the browsers supported by ODT? </p><p>
Version 12.0 onwards, ODT is supported in Internet Explorer , Mozilla ,Google Chrome But for lower versions, i.e prior to 12.0 ODT is supported in Internet Explorer only. 
</p><p style="color:red; font-weight: bold">
29. Can we use the 12.0.2 version Radxml in 11.3 ? </p><p>
No, 12.0.2 version RAD XML�s cannot be loaded/used in 11.3 or lower versions. 
</p><p style="color:red; font-weight: bold">
30. Is it Possible to convert non-extensible function id to Extensible using ODT ? </p><p>
No, non-extensible function id cannot be converted to Extensible function id using ODT. It is a manual process i.e. the screen needs to be created from scratch in extensible ODT links. 
</p><p style="color:red; font-weight: bold">
31. Is it Possible to convert UIXML to RADXML using ODT? </p><p>
No , it is not possible to convert UIXML to RADXML using ODT or any other utility of ODT. 
</p><p style="color:red; font-weight: bold">
32. What is restriction for amount fields? </p><p>
If a field is mentioned as amount field then the corresponding currency field needs to be mapped for the amount field. The field will be formatted based on the currency which it picks from related block and Related Field. 
Related block and Related Field values have to be mandatorily provided for Amount fields. 
</p><p style="color:red; font-weight: bold">
33. What are the order of amount fields & currency fields? </p><p>
If amount field and currency fields are mapped then the currency field should appear above amount field in the screen. 
</p><p style="color:red; font-weight: bold">
34. How to pass the screen arguments to Callform? </p><p>
In the callform provide value for argument name, corresponding target block and target field . Then in the screen where this callform is attached ,provide the details of parent data block, data source and the relationship then click the screen argument option. It will populate the argument names attached to the callform. Then map the source block and source field corresponding to the screen arguments. 
</p><p style="color:red; font-weight: bold">
35. What is child refresh restriction? </p><p>
For child refresh it is required to list the parent in the list of source file and base file.
</p><p style="color:red; font-weight: bold"> 
36 . Can we load the lower version of function id in Higher version of ODT ? </p><p>
Yes, lower version of function ids can be loaded in higher version of ODT. 
</p><p style="color:red; font-weight: bold">
37. How to define the description fields? </p><p>
This feature is provided to avoid Query data sources and should be used for all description Fields. Select the Item Type as Desc in block field property , a parent field should be attached and the selected parent field should have a LOV attached to it. And the current field should be one of the return fields of the attached LOV. 
</p><p style="color:red; font-weight: bold">
38. How to add the bind variable in LOVs? </p></p>
Bind variables for the LOV have to specified as �? �. Bind variables are the parameters whose values are required as input for executing the query during run time . 
Add LOV and provide the LOV query with bind variables, while attaching the LOV to a data block field go to tab bind variables and there you can specify the block name and the bind variable name. 
Examples: SELECT CUSTOMER_TYPE FROM STTM_CUSTOMER WHERE CUSTOMER_NO=? 
Here value for Customer No is to be passed as parameter. 
</p><p style="color:red; font-weight: bold">
39. How to add new Operations in existing Service for function id?</p><p> 
Load the function id and go to action and add the opertion id . it is required to be generate the WSDL , IMPL, XSD's, config file for that service and rebuild the war/ear file . 
</p><p style="color:red; font-weight: bold">
40. Can we re-order the summary query fields? </p><p>
Yes, reordering of query field is possible through ODT. In the summary , we have an option as Fields Ordering . We can manually provide the order of query fields in Fields Ordering. 
</p><p style="color:red; font-weight: bold">
41. Can we re-order the summary Result fields? </p><p>
Yes, summary result fields can be re-ordered from the Fieldsets. 
</p><p style="color:red; font-weight: bold">
42. Can we have additional fields in advance search other than summary result fields? </p><p>
No, we cannot have additional fields in advance search other than summary result fields. 
</p><p style="color:red; font-weight: bold">
43. What are Query/Normal/InOnly /Summary Data source in ODT? </p><p>
Normal: Normal data source will allow DML operations on it. Data from the screen will be persisted in the table. Code for persistence would be available in generated package 
Query: The data source can be used for only querying the data; ODT will generate packages without insert or update statements on this data source. 
InOnly: Tool will generate the packages without insert and update on this data .Request xml will contain the data source while response won�t contain it. 
Summary: This data source can be used for summary and this data source will not be considered while generating the packages. 
</p><p style="color:red; font-weight: bold">
44. Is it mandatory to select the primary key field as required in ODT? </p><p>
ODT level primary key restriction is not there but if any operation needs to be performed on the datasource then it is required to provide the field as required in ODT OR the same can be handled by writing some manual codes by the developer. 
</p><p style="color:red; font-weight: bold">
45. Can we have more than three partitions for a function id in ODT? </p><p>
No, in ODT it is not allowed to have more than three partitions. If the screen size is small/medium than maximum of two partitions are possible and if the screen size is large then maximum of three partitions are possible. 
</p><p style="color:red; font-weight: bold">
46. What is the difference between child and screen child? </p><p>
Child: This option can be selected if the screen has to be the child of another screen; i.e. inherits all the properties of another screen which will be its parent. Properties can be modified or new properties can be added in the child level. 
Screen Child: This option can be selected if the screen has to be the screen child of another screen, i.e. it inherits all properties from its parent. Only screen layout changes can be done in the screen child screen. 
</p><p style="color:red; font-weight: bold">
47. What is the significance of Global LOV�s? </p><p>
Global LOV can be maintained across function id and same can be attached to a field. This will reduce development time. LOV can be selected from list of values attached to the field. These LOV are handled by the FLEXCUBE Infra. 
Global LOVs are stored in CSTB_LOV_INFO with function id as COMMON. 
</p><p style="color:red; font-weight: bold">
48. What is active option present in screen arguments? </p><p>
Screen Arguments defined in an earlier release cannot be deleted. Instead, developer can make it as inactive which serves the same purpose. 
</p><p style="color:red; font-weight: bold">
49. Why do we get error as DB Error String index out of range: -1 while adding column to data source? </p><p>
Most of the time this error comes because some table (like: CSTB_DATA_DICTIONARY) is not present in your schema. Data in table is optional but the table should be present 
</p><p style="color:red; font-weight: bold">
50. Deletion of elements from previous release is not possible, but how can we ignore the element if it is not required? </p><p>
We can set the visibility of the element as false in block field property level in order to ignore the field.
</p><p style="color:red; font-weight: bold"> 
51. What is call forms/Launch forms/ sub screen option in events? </p><p>
Call forms: function Id�s that do processing which is common across many screens. Call forms cannot be launched independently. They need to be launched from another function Id. Third letter of the function id will be C for a call form. Examples : Settlement & Charges 
Launch Forms: Function ids which can be launched from another screen for data view purpose. No processing can be done on Launch Form screen data as done in Call form. Launch Form is like any other normal function id and it can be launched independently. 
Sub Screens: All screens other than the main screen are called sub screens. These sub screens can be launched by adding it to some events. 
 </p>
</div>
</div>
</div>
	<div style="TEXT-ALIGN: right; MARGIN-TOP: 8px; PADDING-RIGHT: 30px; CLEAR: both">
		<BUTTON style="HEIGHT: 25px" id="Cancel" class="BTNfooter" onclick="fnRADExitAll(seqNo, event)" name="Cancel">Cancel</BUTTON>
	</div>
</div>
</form>
</div>
</div>
</body>
</html>