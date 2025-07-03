
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtUIUtil.js
**
** Module       : FCJWeb
**

This source is part of the Oracle Flexcube Universal Banking Software Product. 
Copyright ? 2004 , 2016, Oracle and/or its affiliates.  All rights reserved.

No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

**Modified By             : Sriraam S
**Modified On             : 22-FEB-2013
**Modified Reason         : Transaction and Stage status set in the TXNDOCWrapper which in turn is used to enable Generate Button from Workflow
** Search String          : 1201_16386475 

**Modified On			  : 14-Aug-2013
**Search String			  : SFR#17299223
**Modified Reason		  : Custom Lov changes

**Modified On			  : 20-Mar-2014
**Search String			  : SFR#18417732 
**Modified Reason		  : Custom Lov changes

**Modified On			  : 21-Mar-2014
**Search String			  : SFR#18433743 
**Modified Reason		  : Custom Lov changes

** 	Modified By         :  TEJA
** 	Modified On         :  08-May-2015
** 	Modified Reason     :  REVERSAL ADVICE CHANGE
** 	Search String       :  FCUBS_121DEV_REVERSAL_ADV_RED

**  Modified By         :  Mantinder Kaur
**  Modified On         :  15-May-2015
**  Modified Reason     :  12.1_sell_cash_to_teller
**  Search String       :  FCUBS_12.1_SCTT

**  Modified By         :  Ankit
**  Modified On         :  15-Jun-2015
**  Modified Reason     :  Code has been modified
**  Search String       :  12.1_IQA_21254445

**  Modified By         :  Mantinder Kaur
**  Modified On         :  07-July-2015
**  Modified Reason     :  disabling save and delete for sctt.
**  Search String       :  12.1_ITR_21381519
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

**  Modified By          : Neethu Sreedharan
**  Modified On          : 21-Sep-2016
**  Modified Reason      : In INFRA, for readability, text fields with lengthy values are converted to 
                           text area fields. When User edits the record, the same will converted back 
                           In INFRA, for readability, text fields with lengthy values are converted to 
                           to text field. Issue is when we do operation on same ME block when 
                           text area fields. When User edits the record, the same will converted back 
                           the records having  text to text area converted fields and normal fields, 
                           to text field. Issue is when we do operation on same ME block when 
                           the text area field is not getting converted to text field if subsequent 
                           the records having  text to text area converted fields and normal fields, 
                           row having normal field is selected. Changes done to convert the textarea 
                           the text area field is not getting converted to text field if subsequent 
                           field to text field during row/tab navigation 
                           row having normal field is selected. Changes done to convert the textarea 
**  Retro Source         : 9NT1606_12_0_1_WELLS_FARGO_BANK_NATIONAL_ASSOCIATION
**  Search String        : 9NT1606_12_2_RETRO_12_0_1_23652286


  **  Modified By          : Rishabh Gupta
  **  Modified On          : 22-Sept-2016
  **  Modified Reason      : Code modified to fetch auto lov results for an offline lov field.
  **  Search String        : 12_1_RETRO_12_2_23664574
  **  SFR No    		   : 23664574
  
  **  Modified By          : Rishabh Gupta
  **  Modified On          : 26-Sept-2016
  **  Modified Reason      : Changes done to retain the selected LOV value in the summary screen.
  **  Search String        : 12_0_3_RETRO_12_2_23651706
  **  SFR No    		   : 23651706
  
  **  Modified By          : Rishabh Gupta
  **  Modified On          : 27-Sept-2016
  **  Modified Reason      : Changes done to pass the UINAME instead of functionID in case of branch screen
  **  Search String        : 12_0_3_RETRO_12_2_23654200
  **  SFR No    		   : 23654200
  **
  Changed By         : Vinutha Kini
  Changed On         : 12-Oct-2016
  Change Description : 12.3Payments UDF changes
  Search String      : FCUBS_12.3Payments_UDF_Changes
  
  Changed By         : Nitish Priyaranjan
  Change Description : Udf Changes based on new maintenance
  Search String      : FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
  
  Changed By         : Shishirkumar Aithal
  Change Description : Calendar Changes 
  Search String      : //Bug No 25153773 Changes 
  
  Changed By         : Shishirkumar Aithal
  Change Description : Calendar Changes Reverted
  Search String      : //Bug No 25174018 Changes
  
  Changed By         : Shishirkumar Aithal
  Change Description : Commented Bug No 25174018 Changes
  Search String      : //Bug No 25174018 Changes
  
    **  Modified By          : Neethu Sreedharan
  **  Modified On          : 27-Sep-2016
  **  Modified Reason      : Changes done to create DBC/DBT attribute only for DB fields and not for 
                             UI fields in case of converting text to text area in view mode
  **  Retro Source         : 9NT1606_12_0_2_SPITAMEN_CAPITAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_2_23654180
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 28-Sep-2016
  **  Modified Reason      : For screens like 1401 where UDF appears to be as a subsystem, multiple entry table in 
                             UDF call form is converted to be displayed as single entry fields. 
  **  Retro Source         : 9NT1606_12_1_METROPOLITAN_BANK_&_TRUST_CO 
  **  Search String        : 9NT1606_12_2_RETRO_12_1_23664151
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 28-Sep-2016
  **  Modified Reason      : While fetching a screen xml, code modifled to cache xml string allowing 
                             further modifications on the xml when a new screen is loaded. 
  **  Retro Source         : 9NT1606_12_0_3_BANK_AL_HABIB_LIMITED 
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23656169
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 28-Sep-2016
  **  Modified Reason      : Changing to rebuilt the XML/HTML in case of Two-stage branch UDF as the same 
                             is required for conversion of Multiple entry to single entry fields.
  **  Retro Source         : 9NT1606_12_0_3_AZERTURK_BANK 
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23656256
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 07-Oct-2016
  **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
  **  Retro Source         : 9NT1606_12_0_3_INTERNAL
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 18-Oct-2016
  **  Modified Reason      : Changes done to modify the dbIndexarray when user clicks on the Multiple 
                             entry LOV .
  **  Retro Source         : 9NT1606_12_0_3_HEARTLAND_BANK_LIMITED
  **  Search String        : 9NT1606_12_2_RETRO_12_0_3_23654682
  
  **  Modified By          : Mantinder Kaur
  **  Modified On          : 21-Oct-2016
  **  Modified Reason      : RT UDF and MIS callforms not launching.Commented the RETRO done as part of bug 23656169.
  **  Search String        : 9NT1606_122_NZASSOCIATION_23656169
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 01-Feb-2017
  **  Modified Reason      : Changes done to enable multiple buttons attached to a field when the field is enabled. 
  **  Retro Source         : 9NT1606_12_1_LIEN_VIET_POST_BANK
  **  Search String        : 9NT1606_12_2_RETRO_12_1_25436204
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 21-Feb-2017
  **  Modified Reason      : The Hash(#) character is used as fragment identifier in URI so the same 
                             cannot be passed/Used in the request URI. Code added to handle "#" character 
                             encountered in LOV ID 
  **  Retro Source         : 9NT1606_12_0_3_BANK_OF_PUNJAB
  **  Search String        : 9NT1606_12_3_RETRO_12_0_3_25402719
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 16-Jun-2017
  **  Modified Reason      : Code correction done to display single view screen for ME block in branch 
                             call form screens
  **  Retro Source         : 9NT1606_12_1_MKB_BANK_ZRT
  **  Search String        : 9NT1606_12_4_RETRO_12_1_26230934
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 05-Jul-2017
  **  Modified Reason      : ModuleId variable was not declared for the sub screen. Fix provided to declare ModuleId 
                             for subscreen. Changes done to operate F6 in subscreen call form screens
  **  Retro Source         : 9NT1606_12_1_BANK_AUDI
  **  Search String        : 9NT1606_12_4_RETRO_12_1_26230724
  
  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 11-Jul-2017 
  **  Modified Reason      : Changes done to handle popup editor operation in Single view screen of ME block  
  **  Retro Source         : 9NT1606_12_2_INTERNAL	
  **  Search String        : 9NT1606_12_4_RETRO_12_2_26230337
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 27-Jul-2017
  **  Modified Reason      : Amount Format Changes
  **  Search String        : 9NT1606_12_4_RETRO_12_1_26231984
  
  **  Modified By         :  Vipan Kumar
  **  Modified On         :  28-Jul-2017
  **  Modified Reason     :  NOT ABLE TO ASSIGN USER TO AN UNASSIGNED TRANSACTION 
  **  Search String       :  9NT1606_12_4_RETRO_12_1_26195245
  
  **  Modified By   	   : Ambika Selvaraj
  **  Modified On   	   : 03-Oct-2017
  **  Description    	   : Code changes done to accomodate special characters() used in reduction fields and bind variables of LOV. 
							 '_OPARAN_' and '_CPARAN_' are the notations used to identify '(' and ')' respectively. 
  **  Retro Source         : 9NT1606_12_0_3_BANK_AUDI
  **  Search String        : 9NT1606_12_4_RETRO_12_0_3_26861671
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 09-Oct-2017
  **  Modified Reason      : Changes done to display UDFs in single entry view in Brnach screens.
  **  Search String        : 9NT1606_12_4_RETRO_12_3_26913081
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 10-Nov-2017
  **  Modified Reason      : Enabling generate button for offline transactions for tanked status.
  **  Search String        : 9NT1606_12_4_RETRO_12_2_27074493
  **
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 22-Nov-2017
  **  Modified Reason      : Changes done to handle LOV in Single view screen of Multi-entry in screen child function IDs 
  **  Search String        : 9NT1606_12_4_RETRO_12_0_3_27143186
  **
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 03-Jan-2018
  **  Modified Reason      : Code changes done to get the field object by using fieldname "ONCEAUTH" 
                             and to enable delete button for tanking modifications
  **  Search String        : 9NT1606_14_0_RETRO_12_2_27297039
  **
  **  Modified By          : Ambika Selvaraj
  **  Modified On          : 10-Jan-2018
  **  Modified Reason      : Code changes done to call LOV handler after row Index is set.
  **  Search String        : 9NT1606_14_0_RETRO_12_3_27342859
  **
  ** 	Modified By        : Ambika S
  ** 	Modified On        : 24-Jan-2018
  ** 	Modified Reason    : Fix given to enable generate button when advice required is checked for function id at STDBRFUN.						   
  ** 	Search String      : 9NT1606_14_0_RETRO_12_3_27392995
  **
  **	Modified By        : Ambika S
  ** 	Modified on        : 31-Jan-2018
  ** 	Modified Reason    : Changes done to auto fill Date Separator on inputting value on Date fields.
                             The Date separator should be based on Date format configured in User Settings.
  ** 	Search String      : 9NT1606_14_0_RETRO_12_0_3_27393036
  ** 
  **	Modified By        : Ambika S
  ** 	Modified on        : 13-Feb-2018
  ** 	Modified Reason    : Code Changes done to increase the length of field name(Label), Value and
                             Description
  ** 	Search String      : 9NT1606_14_0_RETRO_12_4_27532102
  **
  **	Modified By        : Ambika S
  ** 	Modified on        : 13-Feb-2018
  ** 	Modified Reason    : Code Changes done to disable the calendar icon when the date field is disabled. 
  ** 	Search String      : 9NT1606_14_0_RETRO_12_3_27532057
  **
  **  Modified By          : Ambika S
  **  Modified On          : 23-Feb-2018
  **  Modified Reason      : The delete and save button getting shown in auth history queue for SCTT after the 
                             authorization has been done for first step.Due to which the authorizer is able to take 
                             action on the transaction and his till is getting updated with the amount to be sent to a diffrent
                             till.Fix given to disable save and delete button if the logged in user is the authoizer.
  **  Search String        : 9NT1606_14_0_RETRO_12_1_27297102 
  **
  **  Modified By          : Ambika S
  **  Modified On          : 04-Jul-2018
  **  Modified Reason      : Fix provided to encrypt the Web-service password provided in CSDEXTWS screen
  **  Search String        : 9NT1606_14_1_RETRO_12_1_28117823 
  **
  **  Modified By          : Ambika S
  **  Modified On          : 04-Jul-2018
  **  Modified Reason      : Added code to fetch the field name value, when the value for LOV field was 
                             entered manually. 
  **  Search String        : 9NT1606_14_1_RETRO_12_3_28117810
  
  **  Modified By          : Vignesh MG
  **  Modified On          : 23-Jan-2020
  **  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
  **  Search String        : 30620131
  
  **  Modified By          : Saloni Rai
  **  Modified On          : 31-Jul-2020
  **  Modified Reason      : Changes to distinguish date field value when the same value is provided in
                             bind variable and reduction field. Additional changes done to distinguish
                             date field in case of UI bind variable. (Retro of 26939841)
  **  Search String        : Bug_31534120
  
  **  Modified By          : Abhik Das
  **  Modified On          : 23-Oct-2021
  **  Modified Reason      : Changes to enable hotkey for field counterparty
  **  Search String        : OBCL_14.4_Support_Bug#32370893_Changes
  
  **  Modified By          : Ajeet Kumar
  **  Modified On          : 26-Jul-2022
  **  Modified Reason      : Changes to retain the theme changes done in user 	setting option.
  **  Search String        : Bug_34565991
  
  **  Modified By          : Ajeet Kumar
  **  Modified On          : 03-Jan-2023
  **  Modified Reason      : Changes to disable unlock button for rejected record if tanking is enabled.
  **  Search String        : Bug_34942797 
 
  **  Modified By          : GIRISH/MANOJ
  **  Modified On          : 07-MAR-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35009460
                             REDWOOD_35129997

  **  Modified By       : Girish/Manoj
  **  Modified On       : 24-Mar-2023
  **  Modified Reason   : Redwood multi entries Disable Enable Fixes
  **  Search String     : REDWOOD_35159306

  **  Modified By          : GIRISH/MANOJ
  **  Modified On          : 31-MAR-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35096240
                             REDWOOD_35159306
                             REDWOOD_35040420
                             redwood_35040403
							 
  **  Modified By         :  Nagendra Satrasala
  **  Modified On         :  15-Apr-2023
  **  Modified Reason     :  Enabling amendable fields in subscreens.
  **  Search String       :  Bug_35239058_Redwood

  **  Modified By          : GIRISH
  **  Modified On          : 17-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : redwood_35254128
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 18-Apr-2023
  **  Modified Reason      : Used tagName instead of getAttribute type
  **  Search String        : REDWOOD_35268666
  

  **  Modified By          : GIRISH
  **  Modified On          : 24-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : redwood_35278374 
  **  
  **  Modified By          : Bhawana Mishra
  **  Modified On          : 25-Apr-2023
  **  Modified Reason      : Removed 0.00 from the value list as this amount is disappering even when 0 is explicitly mentioned as the minimum balance
  **  Search String        : redwood_35148585 
  **
  **  Modified By          : Shayam Sundar Ragunathan
  **  Modified On          : 21-Apr-2023
  **  Modified Reason      : Changes done to call amount converter during onblur event of amount fields
  **  Search String        : REDWOOD_35238456
  
  **  Modified By          : GIRISH
  **  Modified On          : 29-Apr-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35340100
                             REDWOOD_35322675 
							 
  **  Modified By          : GIRISH
  **  Modified On          : 02-May-2023
  **  Modified Reason      : Redwood Fixes
  **  Search String        : REDWOOD_35328171 
  **
  **  Modified By          : Selvam Manickam
  **  Modified On          : 02-May-2023
  **  Modified Reason      : Changes done to assign default value if tagName equal to OJ-INPUT-DATE
  **  Search String        : Redwood_35336052   
  **
  **  Modified By          : Selvam Manickam
  **  Modified On          : 03-May-2023
  **  Modified Reason      : SINGLE RECORD VIEW SCREEN IS NOT DISPLAYING PROPERLY IN MULTI ENTITY
  **  Search String        : REDWOOD_35352601    
  
  **  Modified By          : MANOJ S
  **  Modified On          : 04-05-2023
  **  Modified Reason      : 1.Value should pick from text when click the Lov BUTTON
							 2.Redwood Fixes - validating select value from the lov results before assign
  **  Search String        : redwood_35354040 
							 REDWOOD_35335422
  **
  **  Modified By          : Selvam Manickam
  **  Modified On          : 06-May-2023
  **  Modified Reason      : USER IS ABLE TO SELECT VALUES FROM SUBSCREEN'S LOV EVEN IN READONLY MODE
  **  Search String        : REDWOOD_35357326	
  
  **  Modified By          : GIRISH
  **  Modified On          : 08-May-2023
  **  Modified Reason      : PK fields in java screens are not getting focus on enter query.
  **  Search String        : REDWOOD_35301776 
 
   **  Modified By         : GIRISH
  **  Modified On          : 09-May-2023
  **  Modified Reason      : REDWOOD FIXES
  **  Search String        : REDWOOD_35372195 
  
**  Modified By          : Selvam Manickam
**  Modified On          : 10-May-2023
**  Change Description   : Clear all button is not clearing status in search criteria
**  Search String        : Redwood_35230953 
  
**  Modified By          : GIRISH
**  Modified On          : 11-May-2023
**  Change Description   : LOV was returning wrong amount field value.
                           SE view type was not returning value from lov.
**  Search String        : REDWOOD_35363187 
                           REDWOOD_35307988 
**
**  Modified By          : Chandrashekar N
**  Modified On          : 12-May-2023
**  Modified Reason      : Single view button is not enabled on execute query
**  Search String        : REDWOOD_35366805

  **  Modified By          : GIRISH
  **  Modified On          : 13-May-2023
  **  Modified Reason      : REDWOOD FIXES
  **  Search String        : REDWOOD_35386345
  
  **  Modified By          : GIRISH
  **  Modified On          : 16-May-2023
  **  Modified Reason      : Reverted fix provided as part of Bug 35238456 as it was causing screen hanging issue for callforms.
  **  Search String        : REDWOOD_35390011
  
**  Modified By          : Selvam Manickam
**  Modified On          : 17-May-2023
**  Change Description   : auto lov populate fields not working in Multi Entry if ME have hiddent variables
**  Search String        : Redwood_35390185 
  
**  Modified By          : Selvam Manickam
**  Modified On          : 18-May-2023
**  Change Description   : auto lov populate fields not working in Multi Entry if ME have hiddent variables
**  Search String        : Redwood_changes_lot1  
  
**  Modified By          : Selvam Manickam
**  Modified On          : 19-May-2023
**  Change Description   : Change password under user settings gives continuous messages on doing cancel 
**  Search String        : Redwood_35208714 

  **  Modified By          : GIRISH
  **  Modified On          : 02-June-2023
  **  Modified Reason      : Code changes provided for handling Amount validation 
  **  Search String        : REDWOOD_35410761 
  
  **  Modified By          : GIRISH
  **  Modified On          : 23-June-2023
  **  Modified Reason      : Code changes provided for handling TAB change on screen when no operation is performed.
  **  Search String        : REDWOOD_35467020  
  
**  Modified By    		 : Ramalingam R
**  Modified On          : 14-June-2023
**  Modified Reason      : Checkbox/Switch fields are not getting disabled in multi entry block on querying the record.
						   Upon unlocking and closing the record, LOV button is not getting disabled in multin entry block.
**  Search String        : REDWOOD_35498061 

  **  Modified By          : Meenakshi/ Girish
  **  Modified On          : 23-June-2023
  **  Modified Reason      : Code changes provided for handling amount formatting during query operation.
  **  Search String        : REDWOOD_35457875
 
  **  Modified By          : Selvam Manickam
  **  Modified On          : 11-Aug-2023
  **  Modified Reason      : For this bug issue no 13 only addressed for this fix.
							 13. After input of currency, amount financed, emi amount, etc, now empty the ccy field and tab to amount field and tab out no 	
							 error is thrown (there will also be an issue incase the currency is changed to 3 decimal ccy, in this case also after tab out the rounding wont work). 
  **  Search String        : REDWOOD_35057391 
 
  **  Modified By          : Selvam Manickam
  **  Modified On          : 04-Sep-2023
  **  Modified Reason      : Code changes done to accomodate special characters() used in rednFldval of LOV. 
							 '_OPARAN_' and '_CPARAN_' are the notations used to identify '(' and ')' respectively. 
  **  Search String        : REDWOOD_35691870 
  
  **  Modified By          : Selvam Manickam
  **  Modified On          : 04-Oct-2023
  **  Modified Reason      : Code changes provided for handling skip ccy validation for first time before OjTable prepare
  **  Search String        : REDWOOD_35840645
  
  **  Modified By          : Manoj S
  **  Modified On          : 17-11-2023
  **  Modified Reason      : 1. Code changes provided for handling order wise function of disable_MESV field
							 2. add setTimeout for setting the current data when the Tab change.
  **  Search String        : redwood_35997951
							 redwood_35803564
               
  **  Modified By          : Girish M
  **  Modified On          : 29-Nov-2023
  **  Modified Reason      : Password Change handling.
  **  Search String        : redwood_36011742
                
  **  Modified By          : Manoj
  **  Modified On          : 24-Jan-2024
  **  Modified Reason      : Append Bindfield values with an additional table check condition.
  **  Search String        : redwood_36190964
  
  **  Modified By          : Girish M
  **  Modified On          : 23-Jan-2023
  **  Modified Reason      : Amount field handling when characters are provided like 1t, 1m
  **  Search String        : REDWOOD_36180842 
 
  **  Modified By          : Girish M
  **  Modified On          : 20-Feb-2024
  **  Modified Reason      : Issue while uploading file 
  **  Search String        : REDWOOD_36276232
 
  **  Modified By          : Girish M
  **  Modified On          : 21-Mar-2024
  **  Modified Reason      : Issue while maintaining amount format as comma dot.
  **  Search String        : REDWOOD_36396834  
  
 
  **  Modified By          : Manoj/Girish
  **  Modified On          : 16-Apr-2024
  **  Modified Reason      : Local ccy was taking precedence even if settlement ccy is provided.
  **  Search String        : REDWOOD_36419564
  
  **  Modified By          : Girish
  **  Modified On          : 02-May-2024
  **  Modified Reason      : Amount conversion assignment was happening multiple times, handled the same.
  **  Search String        : redwood_35278374   
  
  **  Modified By          : Girish
  **  Modified On          : 14-May-2024
  **  Modified Reason      : OJ-Table was not getting enabled during modify operation. Handled the same.
  **  Search String        : REDWOOD_36562638
  
  **  Modified By          : Manoj S
  **  Modified On          : 30-May-2024
  **  Modified Reason      : due to Response xml value are default to encrypt, we reverting the current changes. 
  **  Search String        : REDWOOD_36646544
 
  **  Modified By          : Girish M
  **  Modified On          : 19-Aug-2024
  **  Modified Reason      : Auto default from lov was not working when selected from LOV.
  **  Search String        : REDWOOD_36877104

  **  Modified By          : Manoj S
  **  Modified On          : 17-Dec-2024
  **  Modified Reason      : Changes done to access the Lov from Single view.
  **  Search String        : Redwood_37129372
  
  **  Modified By          : Chaitanya Pundlik
  **  Modified On          : 17-Dec-2024
  **  Change Description   : Enable Hotkeys for pps (non-codeployed setups) 
  **  Search String        : Bug_36924146
  
*/

var gcNAV_FIRST = 0;
var gcNAV_PREVIOUS = 1;
var gcNAV_GOTO = 2;
var gcNAV_NEXT = 3;
var gcNAV_LAST = 4;
var gcNUM_NAV_BUTTONS = 5;
var tab_arr = new Array();
var tab_ids = new Array();
var tablist_curr_id = 0;
var funcErrList = new Array();
var checkViewMode = false;
var gSeparator = ",";
var parentWinParams = new Object();
var isAutoLOVOpened = false;
var alertAction = "";
var customAlertAction = "";
var fileNameArray = new Array();
var attachmentData = new Array();
var lovScreenArgs= new Array(); //12.0.2 SFR#17194334 
var isAlertOpen=false; //9NT1490_11.4P01_SFR#13803679  //FCUBS_12.0_PS_01 
/* variables required for focusing on particular elements after closing alerts */
var focusReqd = true;
var focusField = null;
var sigView = false; 
var multiBrnScrOpened = false;
    var isSubScreen = false;
//30620131 -- start
var subScr_arr = new Array();
var subScrlist_curr_id = -1;
var closeScrFlag = false; //redwood_36011742
var product_Default= false; //REDWOOD_36877104

function fnSubScreenDetails() {
    var subScr_obj = document.getElementById("subscrlist");
    if (document.getElementById("subscrlist")) {
        if (subScr_obj.childNodes.length > 0) {
            for (var i = 0; i < subScr_obj.childNodes.length; i++) {
                if (subScr_obj.childNodes[i].nodeName.toUpperCase() == "SPAN") {
                    for (var j = 0; j < subScr_obj.childNodes[i].childNodes[0].childNodes.length; j++) {
                        if (subScr_obj.childNodes[i].childNodes[0].childNodes[j].nodeName.toUpperCase() == "A" && subScr_obj.childNodes[i].childNodes[0].childNodes[j].hasAttribute("onclick")) {
                            subScr_arr[subScr_arr.length] = subScr_obj.childNodes[i].childNodes[0].childNodes[j];
                        }
                    }
                }
            }
        }
    }
}
//30620131 -- end	

//Bug_36924146 Starts
function isRofcFunctionId() {
	/*Code to get the function id on which Hotkey is pressed.
	  If its a callform then parent function is taken */
	
	var funId = functionId;
	if(!!funId && funId.substr(2,1) == "C") {
        funId = parent.functionId;
    }
	
	if(!!funId && mainWin.rofcInstalled == "Y"){
		if(!!(mainWin.g_functionModuleMap[funId]) && 
			 mainWin.g_functionModuleMap[funId].moduleGroupId == "FCROFC"
		){
			return true;
		}else {
			return false;
		}	
	}else {
	    return false;	
	}	
}	
//Bug_36924146 Ends

/* security fixes for WF starts */
function replaceTilde(data){
    if (typeof(data) != "undefined" && data != null ) {
        if(data.indexOf("~")!=-1){
            var re = new RegExp("~", "g");
            data = data.replace(re, "|");
        }
    }
  return data;   
}

function replaceChar(data){
    if (typeof(data) != "undefined" && data != null) {
        if(data.indexOf("%")!=-1){
            var re = new RegExp("%", "g");
        data = data.replace(re, "_PCT_");
        }
    }
    return data;   
}

/* security fixes for WF ends */
function fnChangeLabelToText(type, obj) {
    var elements;
    if (typeof (obj) != "undefined") {
        elements = obj.getElementsByTagName(type);
    } else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var object = elements[loopIndex];
        if (!object.getAttribute("oldInnerHTML")) continue;
        else {
            var oldInnerHTML = object.getAttribute("oldInnerHTML");
			//Fix for bug 19522104 starts
			if (oldInnerHTML.indexOf("&amp;") != -1) {
                var re = new RegExp('&amp;', "g");
                oldInnerHTML = oldInnerHTML.replace(re, "&");
            }            
            if (oldInnerHTML.indexOf("&lt;") != -1) {
                var re = new RegExp('&lt;', "g");
                oldInnerHTML = oldInnerHTML.replace(re, "<");
            } 
            if (oldInnerHTML.indexOf("&gt;") != -1) {
                var re = new RegExp('&gt;', "g");
                oldInnerHTML = oldInnerHTML.replace(re, ">");
            }
			//Fix for bug 19522104 ends
            var parentDIV = object.parentNode;
            var labelElements = parentDIV.getElementsByTagName("TEXTAREA");
            for (var cnt = 0; cnt < labelElements.length; cnt++) {
                if (!labelElements[cnt].getAttribute("oldInnerHTML")) {
                    continue;
                } else {
                    var tempId = labelElements[cnt].id;
                    setOuterHTML_TXADisp(labelElements[cnt], oldInnerHTML);
                    if (tempId != "" && tempId != "undefined") {
                        var tempObject = document.getElementById(tempId);
                        if (tempObject) {
                            if (tempObject.value == "") {
                                if (tempObject.getAttribute("DEFAULT")) {
                                    tempObject.value = tempObject.getAttribute("DEFAULT");
                                }
                            }
                        }
                    }
                    loopIndex--;
                    break;
                }
            }
            if (gAction == "NEW" || gAction == "ENTERQUERY") {
                if (parentDIV.getElementsByTagName("INPUT")[0]) parentDIV.getElementsByTagName("INPUT")[0].value = "";
            }
        }
    }
}

function resetAllElements(type, obj) {
    var elements;
    if (typeof obj != "undefined" && obj!=null) {  //REDWOOD_CHANGES
        elements = obj.getElementsByTagName(type);
    } else {
        elements = document.getElementById('ResTree').getElementsByTagName(type);
    }
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex]; 
//REDWOOD_CHANGES
		if(tmpElem.tagName.toUpperCase() == "OJ-INPUT-DATE-TIME" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-DATE" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-TEXT" || tmpElem.tagName.toUpperCase() == "OJ-SELECT-SINGLE"|| tmpElem.tagName.toUpperCase() == "OJ-SWITCH" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-PASSWORD" ){//OJET Migration
			tmpElem.type = "text";
		}
        if (  (tmpElem.tagName.toUpperCase() == "OJ-INPUT-PASSWORD" ||tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" || tmpElem.tagName.toUpperCase() == "OJ-INPUT-TEXT") && tmpElem.id.toLowerCase().indexOf( 'oj-searchselect-filter') == -1 ) {//OJET Migration
            if (tmpElem.type.toUpperCase() == "TEXT" || tmpElem.type.toUpperCase() == "HIDDEN" || tmpElem.type.toUpperCase() == "PASSWORD") {
                if (tmpElem.getAttribute("DEFAULT") ){
                    if(tmpElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER" ){ //OJET Migration
                        tmpElem.value = Number(tmpElem.getAttribute("DEFAULT"));
                    }else{
                    tmpElem.value = tmpElem.getAttribute("DEFAULT");
                    }
                
                }
                    
                else{
					if(tmpElem.parentNode.getElementsByTagName("OJ-INPUT-NUMBER").length>0){//OJET-Arun //need to remove this code after removing resetAllElements('INPUT')
					   tmpElem.value = null;
					}else{
                      tmpElem.value = "";
                      tmpElem.setAttribute("value","");//OJET Migration
					}
				}
                if (tmpElem.getAttribute("pickup_product"))
                    tmpElem.setAttribute("pickup_product", "")
            }
           
         
            if (tmpElem.type.toUpperCase() == "RADIO") {  
//REDWOOD_CHANGES
                var elemName = tmpElem.name;
                if (elemName) {
                    var radioElem = document.getElementsByName(elemName);
                    if (radioElem.length > 0) {
                        for (var elemCnt = 0; elemCnt < radioElem.length; elemCnt++) {
                            if (radioElem[elemCnt].getAttribute("DEFAULT") == "yes") { //REDWOOD_CHANGES
                                radioElem[elemCnt].checked = true;
                                break;
                            }
                        }
                    } else {
                        radioElem.checked = false;
                    }
                } else {
                    tmpElem.checked = false;
                }
            }
        } 

               //REDWOOD_35009460 
   if (tmpElem.tagName.toUpperCase() == "OJ-RADIOSET") {
         var elemDefault = tmpElem.getAttribute('default');
		 var radioElem   = tmpElem.getAttribute('id');
		 if (elemDefault == "yes") {
             document.getElementById(radioElem).value = tmpElem.getAttribute('value');
         }
    }
               //REDWOOD_35009460 	
//REDWOOD_CHANGES
         if (tmpElem.tagName.toUpperCase() == "OJ-SWITCH"){
                if (tmpElem.getAttribute("DEFAULT") == "yes")
                    tmpElem.value = true;
                else
                    tmpElem.value = false;
            }
        if (tmpElem.tagName.toUpperCase() == "SELECT") {  
//REDWOOD_CHANGES
            var selOptions = tmpElem.options;
            var anySelected = false;
            for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++)  //REDWOOD_CHANGES
                if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
                    anySelected = true;		
//REDWOOD_CHANGES
                    tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT")
                }
            if (!anySelected)
                if (selOptions.length != 0)
                    tmpElem.value = selOptions[0].value
        }
         if (tmpElem.tagName.toUpperCase() == "OJ-SELECT-SINGLE") { //OJET Migration
            var selOptions = tmpElem.getAttribute('DEFAULTSEL');
            if(selOptions!=null){
                tmpElem.value = selOptions;
            }else{
                var options = selectControl[tmpElem.id];
				if (isDetailed) { //redwood_35230953 added
                if(options&& options[0] && typeof(options[0].value) != "undefined"){
                    tmpElem.value =options[0].value;
                }				
				//redwood_35230953 start
				}
				else if (tmpElem.getAttribute('id') != "oj-selectsingle-1" && tmpElem.getAttribute('id') != "oj-selectsingle-2")
				{
					tmpElem.value = null;
				}
				//redwood_35230953 end 
            }
            
            
            /*else{
                var selValue = selectControl[tmpElem.id];
                if(selValue !=null){
                    tmpElem.value =  selValue[0]["value'"];
                }
                
            }*/
          
            /*var anySelected = false;
            for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++)
                if (selOptions[optnCnt].getAttribute("DEFAULT") || selOptions[optnCnt].getAttribute("DEFAULT") == "") {
                    anySelected = true;
                    tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT")
                }
            if (!anySelected)
                if (selOptions.length != 0)
                    tmpElem.value = selOptions[0].value */
        }
         if (tmpElem.tagName.toUpperCase() ==  "OJ-INPUT-DATE" || tmpElem.tagName.toUpperCase() ==  "OJ-INPUT-DATE-TIME" ) {
                //Redwood_35336052 start
					//tmpElem.value = "";
					if (tmpElem.getAttribute("DEFAULT"))
						tmpElem.value = tmpElem.getAttribute("DEFAULT");
					else
						tmpElem.value = ""	
			   //Redwood_35336052 end  
         }
        
        if (tmpElem.tagName.toUpperCase() == "OJ-TEXT-AREA")  //OJET Migration
            if (tmpElem.getAttribute("DEFAULT"))
                tmpElem.value = tmpElem.getAttribute("DEFAULT");
            else
                tmpElem.value = ""	
//REDWOOD_CHANGES
    }
}

function fnEnablePKOnlyFields() {
    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++) {
        var CurrentPK = pkFields[loopIndex];
        var currObject = document.getElementById(CurrentPK);
        if (currObject && getCurrentStyle(currObject, "visibility").toUpperCase() == "HIDDEN") continue;
        var objType = currObject.getAttribute("type");
        var type = "";
        if (objType != undefined && objType != null) type = objType.toUpperCase();
        if (type == "HIDDEN") {
            currObject = document.getElementById(CurrentPK + "I");
            if (currObject != null) {
                fnEnableElement(document.getElementById(CurrentPK + "I"));
                document.getElementById(CurrentPK + "I").readOnly = false;
            } else continue;
        } else {
            var l_FieldType = "";
            if (currObject) l_FieldType = currObject.getAttribute("type");
            l_FldDataType = currObject.getAttribute("data_type");
            if (l_FldDataType && l_FldDataType.toUpperCase() == "DATE") {
                getNextSibling(document.getElementById(CurrentPK + "I")).disabled = false;
            }
            if (l_FieldType && l_FieldType.toUpperCase() == "RADIO") {
                var l_FieldName = "";
                l_FieldName = currObject.name
                var l_RdoFlds = document.getElementsByName(l_FieldName);
                for (var l_Cnt = 0; l_Cnt < l_RdoFlds.length; l_Cnt++) {
                    fnEnableElement(l_RdoFlds[l_Cnt]);
                    l_RdoFlds[l_Cnt].readOnly = false;
                } //for
            } //if Radio                
            if (mainWin.applicationName == "FCIS" && CurrentPK.indexOf("AUTH_STAT") != -1) {
                document.getElementById(CurrentPK).disabled = false;
            }
            else 
                fnEnableElement(document.getElementById(CurrentPK));
            if ((document.getElementById(CurrentPK).getAttribute("READONLY1")) && gAction == "ENTERQUERY") {
                if (document.getElementById(CurrentPK).getAttribute("INPUT_LOV") == 'Y')//Fix for 19426248
                    ;
            } else{
				//document.getElementById(CurrentPK).readOnly = false	//REDWOOD_CHANGES
			document.getElementById(CurrentPK).setAttribute('readOnly', false); //REDWOOD_CHANGES
            }
            
        }
    }
}

function fnSetFocusOnMasterPKField() {
    if (pkFields && pkFields.length > 0) {
     //   var l_SortedPkFlds = fnGetPkFieldOrderby_TabIdx(); //REDWOOD_CHANGES
        var l_SortedPkFlds = pkFields;	//REDWOOD_CHANGES
        for (var l_PkCount = 0; l_PkCount < l_SortedPkFlds.length; l_PkCount++) {
            var l_PkElement = document.getElementById(l_SortedPkFlds[l_PkCount]);
          //  var l_PkElement_Misc = document.getElementById(l_SortedPkFlds[l_PkCount] + "I"); //REDWOOD_CHANGES
           // if (l_PkElement_Misc != null) l_PkElement = l_PkElement_Misc;//REDWOOD_CHANGES
            try {
                if (l_PkElement) {
                   // if ((l_PkElement.className && l_PkElement.className.toUpperCase() == "HIDDEN") || l_PkElement.type.toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "visibility").toUpperCase() == "HIDDEN" || l_PkElement.readOnly == true || l_PkElement.disabled == true) { //REDWOOD_CHANGES
                     // if ((l_PkElement.className && l_PkElement.classList.contains("HIDDEN")) || l_PkElement.getAttribute('type').toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "visibility").toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "display").toUpperCase() == "NONE" || l_PkElement.getAttribute('readOnly') == 'true' || l_PkElement.getAttribute('readOnly') == true || l_PkElement.getAttribute('disabled') == 'true' || l_PkElement.getAttribute('disabled') == true ) { //REDWOOD_CHANGES
					         if ((l_PkElement.className && l_PkElement.classList.contains("HIDDEN")) || l_PkElement.type.toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "visibility").toUpperCase() == "HIDDEN" || getCurrentStyle(l_PkElement, "display").toUpperCase() == "NONE" || l_PkElement.getAttribute('readOnly') == 'true' || l_PkElement.getAttribute('readOnly') == true || l_PkElement.getAttribute('disabled') == 'true' || l_PkElement.getAttribute('disabled') == true ) { //REDWOOD_35301776 
                        if ((l_PkCount == l_SortedPkFlds.length - 1) && (document.getElementById("BTN_EXIT"))) {
                            document.getElementById("BTN_EXIT_IMG").focus();
                        }
                        continue;
                    } else {
                        if (l_PkElement.type.toUpperCase() != "OJ-RADIOSET") {	//REDWOOD_CHANGES
                            l_PkElement.focus();
                            return;
                        }
                        if (l_PkElement.type.toUpperCase() == "OJ-RADIOSET") {	//REDWOOD_CHANGES
                            fnEnableRadioField(l_PkElement);
                            return;
                        }
                    }
                }
            } catch (e) {}
        }
    } //if  
} //fnc 
function fnEnableRadioField(v_PkElement) {
    var l_FldName = v_PkElement.name;
    var l_RDOFlds = document.getElementsByName(l_FldName);
    if (l_RDOFlds.length > 0) l_RDOFlds[0].focus();
}

function fnGetPkFieldOrderby_TabIdx() {
    var count = 0;
    var l_PkFieldSoretedArr = new Array();
    for (var l_Itr = 0; l_Itr < pkFields.length; l_Itr++)
    l_PkFieldSoretedArr[l_Itr] = pkFields[l_Itr];
    for (var l_TabCnt = 0; l_TabCnt < l_PkFieldSoretedArr.length; l_TabCnt++) {
        var l_TbIdxTemp = document.getElementById(l_PkFieldSoretedArr[l_TabCnt]).tabIndex;
        if (isNaN(parseInt(l_TbIdxTemp)) || parseInt(l_TbIdxTemp) == 0) {
            return l_PkFieldSoretedArr;
        }
    }
    for (var l_Cnt = 0; l_Cnt < l_PkFieldSoretedArr.length; l_Cnt++) {
        var l_OuterPkField = document.getElementById(l_PkFieldSoretedArr[l_Cnt]);
        var l_TabIdxOuter = l_OuterPkField.tabIndex;
        for (Idx = 0; Idx < l_PkFieldSoretedArr.length; Idx++) {
            var l_InnerPkField = document.getElementById(l_PkFieldSoretedArr[Idx]);
            var l_TabIdxInner = l_InnerPkField.tabIndex;
            if (parseInt(l_TabIdxOuter) <= parseInt(l_TabIdxInner)) {
                var l_Temp = l_PkFieldSoretedArr[l_Cnt];
                l_PkFieldSoretedArr[l_Cnt] = l_PkFieldSoretedArr[Idx];
                l_PkFieldSoretedArr[Idx] = l_Temp;
                count++;
            }
        } //For Inner    
    } //for Outer         
    return l_PkFieldSoretedArr;
}

function fnSetFocusOnQueryField() {
    if (queryAmendArr && queryAmendArr.length > 0) {
        var l_SortedQryFlds = fnGetQryFieldOrderby_TabIdx();
        for (var l_QryCount = 0; l_QryCount < l_SortedQryFlds.length; l_QryCount++) {
            var l_QryElement = document.getElementById(l_SortedQryFlds[l_QryCount]);
            var l_QryElement_Misc = document.getElementById(l_SortedQryFlds[l_QryCount] + "I");
            if (l_QryElement_Misc != null) l_QryElement = l_QryElement_Misc;
            try {
                if (l_QryElement) {
                    if ((l_QryElement.className && l_QryElement.className.toUpperCase() == "HIDDEN") || l_QryElement.tagName.toUpperCase() == "HIDDEN" || getCurrentStyle(l_QryElement, "visibility").toUpperCase() == "HIDDEN" || l_QryElement.readOnly == true || l_QryElement.disabled == true) {
                        if ((l_QryCount == l_SortedQryFlds.length - 1) && (document.getElementById("BTN_EXIT"))) {
                            if (queryAmendArr.length == 0) document.getElementById("BTN_EXIT_IMG").focus();
                            else fnSetFocusOnQueryField();
                        }
                        continue;
                    } else {
                        if (l_QryElement.type.toUpperCase() != "RADIO") {
                            l_QryElement.focus();
                            return;
                        }
                        if (l_QryElement.type.toUpperCase() == "RADIO") {
                            fnEnableRadioField(l_QryElement);
                            return;
                        }
                    }
                }
            } catch (e) {}
        }
    }
}

function fnGetQryFieldOrderby_TabIdx() {
    var count = 0;
    var l_QryFieldSoretedArr = new Array();
    for (var l_Itr = 0; l_Itr < queryAmendArr.length; l_Itr++)
    l_QryFieldSoretedArr[l_Itr] = queryAmendArr[l_Itr];
    for (var l_TabCnt = 0; l_TabCnt < l_QryFieldSoretedArr.length; l_TabCnt++) {
        if (document.getElementById(l_QryFieldSoretedArr[l_TabCnt])) {
            var l_TbIdxTemp = document.getElementById(l_QryFieldSoretedArr[l_TabCnt]).tabIndex;
            if (isNaN(parseInt(l_TbIdxTemp)) || parseInt(l_TbIdxTemp) == 0) {
                return l_QryFieldSoretedArr;
            }
        }
    }
    for (var l_Cnt = 0; l_Cnt < l_QryFieldSoretedArr.length; l_Cnt++) {
        var l_OuterQryField = document.getElementById(l_QryFieldSoretedArr[l_Cnt]);
        if (l_OuterQryField) {
            var l_TabIdxOuter = l_OuterQryField.tabIndex;
            for (Idx = 0; Idx < l_QryFieldSoretedArr.length; Idx++) {
                var l_InnerQryField = document.getElementById(l_QryFieldSoretedArr[Idx]);
                if (l_InnerQryField) var l_TabIdxInner = l_InnerQryField.tabIndex;
                if (parseInt(l_TabIdxOuter) <= parseInt(l_TabIdxInner)) {
                    var l_Temp = l_QryFieldSoretedArr[l_Cnt];
                    l_QryFieldSoretedArr[l_Cnt] = l_QryFieldSoretedArr[Idx];
                    l_QryFieldSoretedArr[Idx] = l_Temp;
                    count++;
                }
            } //For Inner    
        }
    } //for Outer         
    return l_QryFieldSoretedArr;
}

function validateRestrictedTextValue(elem) {
    var val = elem.rawValue; //REDWOOD_CHANGES
    if (gAction == 'QUERY' || gAction == 'EXECUTEQUERY' || gAction == 'ENTERQUERY' || gAction == "") {
        
        if (/[^A-z|0-9|%]/.test(val)) {	 //REDWOOD_CHANGES
            elem.value = "";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    } else {
        if (/[^A-z|0-9]/.test(val)) {	 //REDWOOD_CHANGES
            elem.value = "";
            alert(mainWin.getItemDesc("LBL_SPECIAL_CHAR_NOT_ALLOWED"));
            elem.focus();
            return;
        }
    }
}

function enableForm(obj) {

    if (typeof (obj) != "undefined") {	
//REDWOOD_CHANGES
        //fnChangeLabelToText("TEXTAREA", obj);
        //enableAllElements("INPUT", obj);
        enableAllElements("OJ-INPUT-TEXT", obj); //OJET Migration
	enableAllElements("OJ-INPUT-NUMBER", obj); //OJET Migration
        enableAllElements("OJ-SELECT-SINGLE", obj); //OJET Migration
        enableAllElements("OJ-SWITCH", obj); //OJET Migration
        enableAllElements("OJ-INPUT-PASSWORD", obj); //OJET Migration
        enableAllElements("OJ-RADIOSET", obj); //OJET Migration
        enableAllElements("OJ-TEXT-AREA", obj); //OJET Migration
        enableAllElements("OJ-INPUT-DATE", obj); //OJET Migration
        enableAllElements("OJ-INPUT-DATE-TIME", obj); //OJET Migration
        //enableAllElements("BUTTON", obj);
         enableAllElements("OJ-BUTTON", obj);
        //enableAllElements("SELECT", obj);
        //enableAllElements("TEXTAREA", obj); 
//REDWOOD_CHANGES
    } else {				
//REDWOOD_CHANGES
        //fnChangeLabelToText("TEXTAREA");
        //enableAllElements("INPUT");
	enableAllElements("OJ-INPUT-TEXT"); //OJET Migration
	enableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        enableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
        enableAllElements("OJ-SWITCH"); //OJET Migration
         enableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        enableAllElements("OJ-RADIOSET"); //OJET Migration
        enableAllElements("OJ-TEXT-AREA"); //OJET Migration
        enableAllElements("OJ-INPUT-DATE"); //OJET Migration
        enableAllElements("OJ-INPUT-DATE-TIME"); //OJET Migration
        enableAllElements("BUTTON");
        enableAllElements("OJ-BUTTON");
       // enableAllElements("SELECT");
       // enableAllElements("TEXTAREA"); 
//REDWOOD_CHANGES
    }
}

function fnValidateOnF8(event) {//changed start
    var event = window.event || event;
    var elem = getEventSourceElement(event);
    if (elem) {
        var elemName = elem.name;
        if (elemName) {
            if (getPreviousSibling(elem)) {
                if (getPreviousSibling(getPreviousSibling(elem))) {
                    if (getPreviousSibling(getPreviousSibling(elem)).name) {
                        if (getPreviousSibling(getPreviousSibling(elem)).name == elemName.substring(0, elemName.length - 1)) {
                            if (elem.blur) {
                                fireHTMLEvent(elem, "onblur", event);
                                if (!gIsValid) {
                                        return false;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (elem.blur) {
          //Fix for 20797908,20771102
          fireHTMLEvent(elem, "onblur", event);
          if (!gIsValid) {
                  return false;
          }
        }
    }
    return true;
}//changed ends

function fnEnableBlockCheckBox() {
    var CurrentMultipleBlock;
    var CurrentMultipleBlockHeader;//static header change
    if (multipleEntryIDs.length > 0) {
        for (var idIndex = 0; idIndex < multipleEntryIDs.length; idIndex++) {
            CurrentMultipleBlock = getTableObjForBlock(multipleEntryIDs[idIndex]);
            if (document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]) {
                fnEnableElement(document.getElementsByName("BTN_SINGLE_VIEW_" + multipleEntryIDs[idIndex])[0]);
            }
            if (CurrentMultipleBlock && CurrentMultipleBlockHeader!=null) { //REDWOOD_35372195 
                CurrentMultipleBlockHeader = document.getElementById(CurrentMultipleBlock.id+"Header");//static header change
                fnEnableElement(CurrentMultipleBlockHeader.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0]);//static header change
                var tableSize = CurrentMultipleBlock.tBodies[0].rows.length;
                for (var rowIndex = 0; rowIndex < tableSize; rowIndex++) {
                    var currentRow = CurrentMultipleBlock.tBodies[0].rows[rowIndex];
                    fnEnableElement(currentRow.cells[0].getElementsByTagName("INPUT")[0]);
                }
            }
        }
    }
}

function fnGetSubScreenTitle(xmlFile, scrnName) {
    if (getXMLString(getUIXML(xmlFile)) == "") {
        return "";
    } else {
        var xmlDoc = getUIXML(xmlFile);
        var screenNode = selectSingleNode(xmlDoc, "//SCREEN[@NAME='" + scrnName + "']/@TITLE");
        if (screenNode) {
            return getNodeText(screenNode);
        } else {
            return "";
        }
    }
}

function fnSetReferenceFiledValueAsDefaultVal(rowCell) {
    var refField = "";
    if (rowCell.getElementsByTagName("INPUT")[0] != undefined) refField = rowCell.getElementsByTagName("INPUT")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("CHECKBOX")[0] != undefined) refField = rowCell.getElementsByTagName("CHECKBOX")[0].getAttribute("REF_FIELD");
    else if (rowCell.getElementsByTagName("SELECT")[0] != undefined) refField = rowCell.getElementsByTagName("SELECT")[0].getAttribute("REF_FIELD");
    if (refField != null) {
        if (refField != "") rowCell.getElementsByTagName("INPUT")[0].value = document.getElementById(refField).value;
    }
}

function cursorEOT(isField) {
    isRange = isField.createTextRange();
    isRange.move('textedit');
    isRange.select();
    testOverflow = isField.scrollTop;
    if (testOverflow != 0) {
        return true
    } else {
        return false
    }
}

function adjustRows(isField) {
    //var TEXTAREA_LINE_HEIGHT = 13;//Bug 17371588 Changes
    var textarea = isField;
    var newHeight = 0;
    var prevScrollHeight = 0;
    while ((newHeight = textarea.scrollHeight) != prevScrollHeight) {
        prevScrollHeight = newHeight;
        var currentHeight = textarea.clientHeight;
        if (newHeight > currentHeight) {
			textarea.style.whiteSpace = "pre-wrap"; //Fix for 19060304
            textarea.style.height = newHeight +1 + 'px';//Bug 17371588 Changes
        }
    }
}

function toggleSelectBoxes(tableDivContainer, tableHeader) {
//Static Header change start
		var divElem = document.getElementById(tableHeader).parentNode;
    	var scrollDiv = getNextSibling(divElem.parentNode);
		divElem.scrollLeft = scrollDiv.scrollLeft;//Static Header change end
   
}

function replaceAllChar(str, searchChar, replaceChar) {
    var retStr = "";
    for (var loopIndex = 0; loopIndex < str.length; loopIndex++) {
        if (str.substr(loopIndex, 1) == searchChar) retStr += replaceChar;
        else retStr += str.substr(loopIndex, 1);
    }
    return retStr;
}

function isNumericValidation(AStr) {
    if (typeof (gSummaryOpened) != 'undefined' && gSummaryOpened) inTheStr = "1234567890.-,%";
    else inTheStr = "1234567890.-,";
    tempChar = "";
    if (getLength(trim(AStr)) <= 0) return true;
    for (i = 0; i < AStr.length; i++) {
        if (AStr.charAt(i) != 0) {
            tempChar = AStr.charAt(i);
            if ((inTheStr.indexOf(tempChar)) < 0) {
                return false;
            }
        }
    }
    return true;
}

function disableTabs(idTabs, strSeparator) {
    if (arguments.length < 2) {
        strSeparator = gSeparator;
    }
    setTabDisabledProp(idTabs, strSeparator, true);
}

function enableTabs(idTabs, strSeparator) {
    if (arguments.length < 2) {
        strSeparator = gSeparator;
    }
    setTabDisabledProp(idTabs, strSeparator, false);
}

function setTabDisabledProp(idTabs, strSeparator, styleValue) {
    var arrTabs = idTabs.split(strSeparator);
    for (var loopIndex = 0; loopIndex < arrTabs.length; loopIndex++) {
        if (arrTabs[loopIndex] != null && arrTabs[loopIndex] != "") {
            var elem = document.getElementById(arrTabs[loopIndex]);
            elem.disabled = styleValue;
            elem.parentNode.disabled = styleValue;
            if (styleValue) {
                if (elem.getAttribute("onblur")) {
                    elem.setAttribute("onblur_old", elem.getAttribute("onblur"));
                    elem.removeAttribute("onblur");
                    elem.setAttribute("onblur", "");//Fix for 17043855
                }
                if (elem.getAttribute("onfocus")) {
                    elem.setAttribute("onfocus_old", elem.getAttribute("onfocus"));
                    elem.removeAttribute("onfocus");
                    elem.setAttribute("onfocus", "");//Fix for 17043855
                }
                if (elem.getAttribute("onmouseout")) {
                    elem.setAttribute("onmouseout_old", elem.getAttribute("onmouseout"));
                    elem.removeAttribute("onmouseout");
                    elem.setAttribute("onmouseout", "");//Fix for 17043855
                }
                if (elem.getAttribute("onmouseover")) {
                    elem.setAttribute("onmouseover_old", elem.getAttribute("onmouseover"));
                    elem.removeAttribute("onmouseover");
                    elem.setAttribute("onmouseover", "");//Fix for 17043855
                }
                if (elem.getAttribute("onclick")) {
                    elem.setAttribute("onclick_old", elem.getAttribute("onclick"));
                    elem.removeAttribute("onclick");
                    elem.setAttribute("onclick", "");//Fix for 17043855
                }
             //   addEvent(elem, "class", "Htabdsb");  //REDWOOD_CHANGES
 //36195165 Starts
				if (elem.parentElement != null){
					elem.parentElement.classList.add("oj-disabled");
					elem.parentElement.classList.remove("oj-navigationlist-item-element");
					}
//36195165 Ends
           } else {
                if (elem.getAttribute("onblur_old")) {
                    elem.setAttribute("onblur", elem.getAttribute("onblur_old"));
                    elem.removeAttribute("onblur_old");
                }
                if (elem.getAttribute("onfocus_old")) {
                    elem.setAttribute("onfocus", elem.getAttribute("onfocus_old"));
                    elem.removeAttribute("onfocus_old");
                }
                if (elem.getAttribute("onmouseout_old")) {
                    elem.setAttribute("onmouseout", elem.getAttribute("onmouseout_old"));
                    elem.removeAttribute("onmouseout_old");
                }
                if (elem.getAttribute("onmouseover_old")) {
                    elem.setAttribute("onmouseover", elem.getAttribute("onmouseover_old"));
                    elem.removeAttribute("onmouseover_old");
                }
                if (elem.getAttribute("onclick_old")) {
                    elem.setAttribute("onclick", elem.getAttribute("onclick_old"));
                    elem.removeAttribute("onclick_old");
                }
                //addEvent(elem, "class", "Htaball");  //REDWOOD_CHANGES
//36195165 Starts
				if (elem.parentElement != null){
					elem.parentElement.classList.remove("oj-disabled");
					elem.parentElement.classList.add("oj-navigationlist-item-element");
					}
//36195165 Ends			 
            }
        }
    }
}

function fnGetRef(tagName, objElemRef) {
    while (objElemRef.tagName != tagName) {
        objElemRef = objElemRef.parentNode;
    }
    return objElemRef;
}

function fnSetFocusOnFirstEnabledField() {
    var textFields = document.getElementsByTagName("input");
    try {
        for (var fieldCount = 0; fieldCount < textFields.length; fieldCount++) {
            var textField = textFields[fieldCount];
            if (textField.type.toUpperCase() == "TEXT" && (!textField.readOnly)) {
                textField.focus();
                return;
            } else continue;
        }
    } catch (e) {
        alert(e.message);
    }
}

function getCurrentRow(e) {
    var event = window.event || e;
    var objTR;
    if (event != null) {
        objTR = getEventSourceElement(event);
        try {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
        } catch (e) {}
    }
    return objTR;
}

function disableForm(obj) {//Fix for 2125450
    //Fix for 21254503 start
    if (typeof (obj) != "undefined") {	   
//REDWOOD_CHANGES
       // disableAllElements("INPUT", obj);
        disableAllElements("OJ-INPUT-TEXT", obj); //OJET Migration
	    disableAllElements("OJ-INPUT-NUMBER", obj); //OJET Migration
        disableAllElements("OJ-SELECT-SINGLE",obj); //OJET Migration
      setTimeout( function () {disableAllElements("OJ-SWITCH",obj)},25); //OJET Migration //REDWOOD_35498061 added setTimeout
        disableAllElements("OJ-INPUT-PASSWORD", obj); //OJET Migration
        disableAllElements("OJ-RADIOSET", obj); //OJET Migration
        disableAllElements("OJ-INPUT-DATE", obj); //OJET Migration
        disableAllElements("OJ-INPUT-DATE-TIME", obj); //OJET Migration
       // disableAllElements("BUTTON", obj);
      //  disableAllElements("SELECT", obj);
        disableAllElements("OJ-TEXT-AREA", obj); //OJET Migration
         disableAllElements("OJ-BUTTON",obj);
        fnEnableBlockCheckBox();		//REDWOOD_35366805 Uncommented
//REDWOOD_CHANGES
        fnEnableSubSysButtons();
    } else { //Fix for 21254503 end		  
//REDWOOD_CHANGES
        //disableAllElements("INPUT");
		disableAllElements("OJ-INPUT-TEXT");//OJET Migration  
		disableAllElements("OJ-INPUT-NUMBER"); //OJET Migration
        disableAllElements("OJ-SELECT-SINGLE"); //OJET Migration
    setTimeout( function () {disableAllElements("OJ-SWITCH")},25); //OJET Migration //REDWOOD_35498061 added setTimeout
   // disableAllElements("OJ-SWITCH"); //OJET Migration
        disableAllElements("OJ-INPUT-PASSWORD"); //OJET Migration
        disableAllElements("OJ-RADIOSET"); //OJET Migration
        disableAllElements("OJ-INPUT-DATE"); //OJET Migration
	//disableAllElements("BUTTON");
        disableAllElements("OJ-BUTTON");
        disableAllElements("OJ-TEXT-AREA"); //OJET Migration
          disableAllElements("OJ-INPUT-DATE-TIME"); //OJET Migration
       // disableAllElements("SELECT");
       // disableAllElements("TEXTAREA");
        fnEnableBlockCheckBox();	  //REDWOOD_35366805 Uncommented
//REDWOOD_CHANGES
        fnEnableSubSysButtons();
        fnEnableVerFldSet();//version control changes
    }    
    if (document.getElementById('BTN_EXIT_IMG')) {
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
    }							 
//REDWOOD_CHANGES
    if (document.getElementById('BTN_AUDIT')) {
	fnEnableElement(document.getElementById('BTN_AUDIT'));
    }
    if (document.getElementById('BTN_AUDIT_CLOSE')) {
            fnEnableElement(document.getElementById('BTN_AUDIT_CLOSE'));
    }	   
//REDWOOD_CHANGES
}

function fnToggleSubsystemButton(btnId, flag) {
    var btnElem = document.getElementById(btnId);  //REDWOOD_CHANGES
    if (btnElem) {		 //REDWOOD_CHANGES
    if (typeof(flag) != "undefined" && flag == true) fnEnableSubSysButtons(btnElem);
    if (typeof(flag) != "undefined" && flag == false) fnDisableSubSysButtons(btnElem);
}
}
   //REDWOOD_CHANGES
function fnEnableSubSysButtons(btnElem) {
    if(btnElem){
        btnElem.disabled = false;
    }else{
    if(document.getElementById('subSystemConveyorBelt')){
        var subSysButtons = document.getElementById('subSystemConveyorBelt').getElementsByTagName('OJ-BUTTON');
        for(var i =0;i<subSysButtons.length;i++){
            subSysButtons[i].setAttribute('disabled','false');
        }
    }
      
    }
}
function fnEnableSubSysButtons_old(anchorElem) {   
//REDWOOD_CHANGES
    if (anchorElem) {
        if (anchorElem.getAttribute("onclick_old") != null && anchorElem.getAttribute("onclick_old") != "") {
            anchorElem.disabled = false;
            fnSetElemAttribute(anchorElem, "onmouseover", "", "onmouseover_old", true);
            fnSetElemAttribute(anchorElem, "onfocus", "", "onfocus_old", true);
            fnSetElemAttribute(anchorElem, "onmouseout", "", "onmouseout_old", true);
            fnSetElemAttribute(anchorElem, "onblur", "", "onblur_old", true);
            fnSetElemAttribute(anchorElem, "onkeydown", "", "onkeydown_old", true);
            fnSetElemAttribute(anchorElem, "onclick", "", "onclick_old", true);
            anchorElem.className = 'Abutton';
        }
    } else {
        var subSysButtons = document.getElementById("DIVSubSystem");
        if (subSysButtons) {
            var subSysElem = subSysButtons.getElementsByTagName("A");
            for (var elemLength = 0; elemLength < subSysElem.length; elemLength++) {
                if (subSysElem[elemLength].getAttribute("onclick_old") != null && subSysElem[elemLength].getAttribute("onclick_old") != "") {
                    subSysElem[elemLength].disabled = false;
                    fnSetElemAttribute(subSysElem[elemLength], "onmouseover", "", "onmouseover_old", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onfocus", "", "onfocus_old", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onmouseout", "", "onmouseout_old", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onblur", "", "onblur_old", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onkeydown", "", "onkeydown_old", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onclick", "", "onclick_old", true);
                    subSysElem[elemLength].className = 'Abutton';
                }
            }
        }
    }
}
   //REDWOOD_CHANGES
function fnDisableSubSysButtons(btnElem){
    if(btnElem){
        btnElem.disabled = true;
    }else{
      if(document.getElementById('subSystemConveyorBelt')){
           var subSysButtons = document.getElementById('subSystemConveyorBelt').getElementsByTagName('OJ-BUTTON');
        for(var i =0;i<subSysButtons.length;i++){
            subSysButtons[i].disabled = true;
        }
      }
       
    }
}
function fnDisableSubSysButtons_old(anchorElem) {	  
//REDWOOD_CHANGES
    if (anchorElem) {
        if (anchorElem.getAttribute("onclick") != null && anchorElem.getAttribute("onclick") != "") {
            anchorElem.disabled = true;
            fnSetElemAttribute(anchorElem, "onmouseover_old", "", "onmouseover", true);
            fnSetElemAttribute(anchorElem, "onfocus_old", "", "onfocus", true);
            fnSetElemAttribute(anchorElem, "onmouseout_old", "", "onmouseout", true);
            fnSetElemAttribute(anchorElem, "onblur_old", "", "onblur", true);
            fnSetElemAttribute(anchorElem, "onkeydown_old", "", "onkeydown", true);
            fnSetElemAttribute(anchorElem, "onclick_old", "", "onclick", true);
            anchorElem.className = 'AbuttonD';
        }
    } else {
        var subSysButtons = document.getElementById("DIVSubSystem");
        if (subSysButtons) {
            var subSysElem = subSysButtons.getElementsByTagName("A");
            for (var elemLength = 0; elemLength < subSysElem.length; elemLength++) {
                if (subSysElem[elemLength].getAttribute("onclick") != null && subSysElem[elemLength].getAttribute("onclick") != "") {
                    subSysElem[elemLength].disabled = true;
                    fnSetElemAttribute(subSysElem[elemLength], "onmouseover_old", "", "onmouseover", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onfocus_old", "", "onfocus", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onmouseout_old", "", "onmouseout", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onblur_old", "", "onblur", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onkeydown_old", "", "onkeydown", true);
                    fnSetElemAttribute(subSysElem[elemLength], "onclick_old", "", "onclick", true);
                    subSysElem[elemLength].className = 'AbuttonD';
                }
            }
        }   
    }
}

function fnSetElemAttribute(elem, attributeNameOld, attributeValue, attributeName, flag) {
    elem.setAttribute(attributeNameOld, elem.getAttribute(attributeName));
    if (typeof(flag) != "undefined" && flag != "" && flag == true) {
        elem.setAttribute(attributeName, "");
    }
}

function fnDisableElement(object) {
    if (object == null) return;
    if (object && object.style && (object.style.visibility.toUpperCase() == "HIDDEN" || object.className.toUpperCase() == "HIDDEN")) return;
//REDWOOD_CHANGES
    var tagName = object.tagName.toUpperCase();//OJET Migration
    if(tagName == "OJ-BUTTON" || tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER"  ||tagName == "OJ-SELECT-SINGLE" ||tagName == "OJ-SWITCH" ||tagName == "OJ-RADIOSET" || tagName=="OJ-TEXT-AREA"|| tagName=="OJ-INPUT-PASSWORD" || tagName=="OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") {//OJET Migration
        object.type ='TEXT';
    }					  
//REDWOOD_CHANGES
    var type = object.type.toUpperCase();
    if (object) {
        if (type == 'HIDDEN') {
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
			var indexRate = getOuterHTML(object).indexOf("displayRate");//Changes_prefix_rateType_Fields
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0 || indexRate > 0) {//Changes_prefix_rateType_Fields
                var inputObj = getNextSibling(getNextSibling(object));
                if (inputObj) {
                    var entityDBC = object.getAttribute("DBC");
                    var entityDBT = object.getAttribute("DBT");
                    if (entityDBC) {
                        if (entityDBT) {
                            inputObj.readOnly = true;
                            inputObj.className = "TXTro";
                            if (indexDate > 0) {
                                //9NT1606_14_0_RETRO_12_3_27532057 starts
                                if (getNextSibling(inputObj)) {
                                    getNextSibling(inputObj).className = "BTNhide";
                                    getNextSibling(inputObj).disabled = true;
                                }
								//9NT1606_14_0_RETRO_12_3_27532057 ends
                                if (getNextSibling(inputObj) && getNextSibling(getNextSibling(inputObj))) getNextSibling(getNextSibling(inputObj)).disabled = true;
                            }
                        } else {}
                    }
                }
            }
//REDWOOD_CHANGES
        } else if ( tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER") {//OJET Migration
            if (type == "TEXT") {
                if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0 || getOuterHTML(object).indexOf("processAmount") > 0) {
                    //object.readOnly = true;
					object.setAttribute("readOnly",true);
                        object.disabled = false;
                    //object.className = "TXTro numeric"
                } else if (object.parentNode.className != "FleftBtns" && object.parentNode.className.indexOf("DIVGridME") == -1 && object.parentNode.className != "Fleft") {
                    //object.readOnly = true;
                            object.disabled = false;
                    //object.className = "TXTro"
					object.setAttribute("readOnly",true);
                }
//                    if (gAction == 'EXECUTEQUERY' || (viewModeAction && viewModeAction == true) || (gAction == "" && ShowSummary && ShowSummary == "TRUE") || gAction == "AUTHQUERY") {
//                        if (object.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'TABLEFooter') return;
//                        var fieldValue = object.value;
//                        var fieldId = object.id;
//                        var fieldName = object.name;
//                        var fleldDBC = object.getAttribute("DBC");
//						var fieldDBT = object.getAttribute("DBT"); //Fix for 18311938 
//                        var fleldTitle = object.getAttribute("title");//Fix for 21828386
//                        var fieldSize;
//						//Fixes for BUG#18053476  Starts.
//                        if (object.size) {
//                            fieldSize = object.size;
//                        } else {
//                            fieldSize = object.getAttribute("size");                        
//                        }//Fixes for BUG#18053476 ends.
//                        var parentDIV = object.parentNode;
//                        //Fix for bug 19522104 starts
//                        var tempVal = parentDIV.getElementsByTagName("INPUT")[0].value;
//                        var tempValBefReplace = parentDIV.getElementsByTagName("INPUT")[0].value;
//                        if (tempVal.indexOf("<") != -1) {
//                            var re = new RegExp('<', "g");
//                            tempVal = tempVal.replace(re, "&lt;");
//                        } 
//                        if (tempVal.indexOf(">") != -1) {
//                            var re = new RegExp('>', "g");
//                            tempVal = tempVal.replace(re, "&gt;");
//                        }
//                        parentDIV.getElementsByTagName("INPUT")[0].setAttribute("value", tempVal);
//                        //Fix for bug 19522104 ends
//                        var oldInnerHTML = getOuterHTML(parentDIV.getElementsByTagName("INPUT")[0]);
//                        //oldInnerHTML = setValueOfTextBox(oldInnerHTML, parentDIV.getElementsByTagName("INPUT")[0]);  //Fix for bug 19522104 commented code
//                        var dNumber = getOuterHTML(object).indexOf("validateInputNumber");
//                        var dAmount = getOuterHTML(object).indexOf("validateInputAmount");
//                        if (fieldSize != "") {
//                            if (fieldValue.length > fieldSize && fieldValue.length > 3 && dNumber < 0 && dAmount < 0) {
//                                if (object.getAttribute("viewMode")) {
//                                    if (getNextSibling(object)) {
//                                        if (getNextSibling(object).tagName) {
//                                            if (getNextSibling(object).tagName.toUpperCase() == 'BUTTON') {
//                                                getNextSibling(object).disabled = true;
//                                                if (getNextSibling(object).className != 'BUTTONMultiple') {
//                                                    if (getNextSibling(object).className != 'BTNhide') {
//                                                        getNextSibling(object).setAttribute("oldClassName", getNextSibling(object).className);
//                                                        getNextSibling(object).className = 'BTNhide';
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                    var textareaNode = document.createElement("TEXTAREA");
//                                    textareaNode.setAttribute("id", fieldId);
//									if(fleldDBC != null && fieldDBT != null){ //9NT1606_12_2_RETRO_12_0_2_23654180 added
//                                    textareaNode.setAttribute("DBC", fleldDBC);
//									textareaNode.setAttribute("DBT", fieldDBT);//Fix for 18311938
//									} //9NT1606_12_2_RETRO_12_0_2_23654180 added 
//                                    textareaNode.setAttribute("title", fleldTitle);//Fix for 21828386
//                                    addEvent(textareaNode, "class", "TXAro");
//                                    textareaNode.setAttribute("name", fieldName);
//									//fix for : bug id 17667748 //
//									textareaNode.setAttribute("COLS", fieldSize);
//                                    textareaNode.setAttribute("value", fieldValue);
//                                    textareaNode.setAttribute("oldInnerHTML", oldInnerHTML);
//                                    if(object.getAttribute("MEBLOCKID")) textareaNode.setAttribute("MEBLOCKID", object.getAttribute("MEBLOCKID")); //Fix for 20459186
//									var fieldValueBefReplace = fieldValue; /*Fix for bug 18883813 - added*/
//                                    if (fieldValue.indexOf("<") != -1) {
//                                        var re = new RegExp('<', "g");
//                                        fieldValue = fieldValue.replace(re, "&lt;");
//                                    } 
//                                    if (fieldValue.indexOf(">") != -1) { //Fix for bug 19522104 modified else if to if
//                                        var re = new RegExp('>', "g");
//                                        fieldValue = fieldValue.replace(re, "&gt;");
//                                    }
//                                    textareaNode.innerHTML = fieldValue;
//									/*Fix for bug 18883813 starts*/
//									//setInnerText(textareaNode,fieldValue); /*Fix for 16816970*/
//									setInnerText(textareaNode,fieldValueBefReplace); 
//									/*Fix for bug 18883813 ends*/
//                                    parentDIV.getElementsByTagName("INPUT")[0].name = textareaNode.name;
//                                    parentDIV.getElementsByTagName("INPUT")[0].value = textareaNode.value;
//                                    var finalOuterHTML = getOuterHTML_TXADisp(textareaNode);
//                                    if (finalOuterHTML.indexOf("<TEXTAREA") == -1) {
//                                        finalOuterHTML = finalOuterHTML.replace("<textarea", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                        finalOuterHTML = finalOuterHTML.replace("</textarea>", "</TEXTAREA>");
//                                    } else {
//                                        finalOuterHTML = finalOuterHTML.replace("<TEXTAREA", "<TEXTAREA name=\"" + fieldName + "\" value=\"" + fieldValue + "\"");
//                                    }
//                                    setOuterHTML_TXADisp(parentDIV.getElementsByTagName("INPUT")[0], finalOuterHTML);
//                                    parentDIV.getElementsByTagName("TEXTAREA")[0].readOnly = true;
//                                    adjustRows(parentDIV.getElementsByTagName("TEXTAREA")[0]);
//									if(viewMnt){ /*Fix for 19767144 starts*/
//                                        document.getElementById(object.id).style.color = object.style.color;
//                                        document.getElementById(object.id).title = object.title;
//                                    }/*Fix for 19767144 ends*/
//                                    checkViewMode = true;
//                                }
//                            } 
//							//Fix for bug 19522104 starts
//							else { 
//                                parentDIV.getElementsByTagName("INPUT")[0].setAttribute("value", tempValBefReplace); 
//                            } 
//							//Fix for bug 19522104 ends
//                        }
//                    }
            }
                /*} else if (type == "RADIO") {
//REDWOOD_CHANGES
                    object.disabled = true;
                } else if (type == "CHECKBOX") {
                    object.disabled = true;
                } else if (type == "PASSWORD") {
                    object.readOnly = true;
                    object.className = "TXTro";
                } else if (type == "BUTTON") {
                    object.disabled = true;
                } else if (type == "FILE") {
                    object.readOnly = true;
                    object.className = "TXTro";
                } else {
                    object.readOnly = true;	 
//REDWOOD_CHANGES START
                }*/
        } else if (tagName == "OJ-TEXT-AREA" || tagName == "OJ-INPUT-PASSWORD" || tagName == "OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") {//OJET Migration
                object.readOnly = true;
            object.setAttribute("readOnly",true);
           /* if (!object.getAttribute("oldInnerHTML"))
                    object.className = "TXAro";
            else {
                    object.setAttribute("onpropertychange", "", 0);
                object.className = "TXAro"
            }*/
        } else if (type == "OJ-RADIOSET"){
                            object.disabled = true;
        }
//        else if (tagName == "BUTTON"){
//            if (object.parentNode.className != "FleftBtns" && object.parentNode.className.indexOf("DIVGridME") == -1 && object.parentNode.className != "Fleft")
//                if (object.children[0])
//                    if (object.children[0].className == "IMGPopupEdit")
//                        object.disabled = false;
//                    else {
//                        object.disabled = true;
//                        if (object.name.indexOf("BTN_ADD_") != -1 || object.name.indexOf("BTN_REMOVE_") != -1)
//                            object.className = "BTNhide"
//                    }
//                else
//                    object.disabled = true;
//            else {
//                if (object.name.indexOf("cmdAddRow_") != -1 || object.name.indexOf("cmdDelRow_") != -1 || object.name.indexOf("BTN_SINGLE_VIEW_") != -1) {
//                    object.disabled = true;
//                    object.className = "BTNimgD"
//                }
//            }}
        else if (tagName == "OJ-SELECT-SINGLE") { //OJET Migration
            //object.disabled = true;
            //object.className = "SELro"
            object.setAttribute("readOnly",true);
               object.removeAttribute("disabled");
        } else if (tagName == "OJ-BUTTON") { //OJET Migration
            //object.disabled = true;
            //object.className = "SELro"
            object.setAttribute("disabled","true");	  
//REDWOOD_CHANGES Ends
             
                    } else {
                        object.disabled = true;
        }
        var nextSibling = getNextSibling(object);
        if (nextSibling) {
            if (nextSibling.tagName) {
                if (nextSibling.tagName.toUpperCase() == 'BUTTON') {
                    if (nextSibling.name.indexOf("cmdAddRow_") != -1 || nextSibling.name.indexOf("cmdDelRow_") != -1 || nextSibling.name.indexOf("BTN_SINGLE_VIEW_") != -1) {
                        nextSibling.disabled = true;
                        nextSibling.className = "BTNimgD";
                    }
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft" && object.parentNode.className.indexOf("DIVGridME")== -1 && nextSibling.name != 'BTN_NEXT_VER' && object && nextSibling.name.indexOf('BTN_ADD_') == -1  && nextSibling.name.indexOf('BTN_REMOVE_') == -1) {//static header change, Fix for 22988973 
                        if (object.parentNode.parentNode.parentNode.className.indexOf("DIVGridME")== -1) {//static header change
                            if (nextSibling.className != "BTNhide") {
                                nextSibling.setAttribute("oldClassName", getNextSibling(object).className);
                                nextSibling.className = 'BTNhide';
                            }
                        }
                    }
                }
            }
        } else if (getPreviousSibling(object)) {
            if (getPreviousSibling(object).tagName) {
                if (getPreviousSibling(object).tagName.toUpperCase() == 'BUTTON') {
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft") getPreviousSibling(object).disabled = true;
                    if (object.parentNode.className != "FleftBtns" && object.parentNode.className != "Fleft" && object.parentNode.className.indexOf("DIVGridME")== -1 && getPreviousSibling(object).name != 'BTN_NEXT_VER' && object && getPreviousSibling(object).name.indexOf('BTN_ADD_') == -1  && getPreviousSibling(object).name.indexOf('BTN_REMOVE_') == -1) {//static header change, Fix for 22988973 
                        if (object.parentNode.parentNode.parentNode.className.indexOf("DIVGridME")== -1) {//static header change
                            if (getPreviousSibling(object).className != "BTNhide") {
                                getPreviousSibling(object).setAttribute("oldClassName", getPreviousSibling(object).className);
                                getPreviousSibling(object).className = 'BTNhide';
                            }
                        }
                    }
                }
            }
        }
    }
	//if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].disabled =true;//35264798
	if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].setAttribute("disabled","");	//REDWOOD_35357326
    return;
}

function fnEnableElement(object) {
    if (object == null) return;
    if (object && object.style && object.style.visibility.toUpperCase() == "HIDDEN" && object.className.toUpperCase() == "HIDDEN")
        return;						   
//REDWOOD_CHANGES
	var tagName = object.tagName.toUpperCase();
        if(tagName == "BUTTON" || tagName == "OJ-BUTTON" || tagName == "OJ-INPUT-TEXT" || tagName == "OJ-INPUT-NUMBER"  ||tagName == "OJ-SELECT-SINGLE" ||tagName == "OJ-SWITCH" ||tagName == "OJ-RADIOSET" || tagName=="OJ-TEXT-AREA"|| tagName=="OJ-INPUT-PASSWORD" || tagName=="OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") {//OJET Migration
			object.type ='TEXT';
	}  
//REDWOOD_CHANGES
        
    var type = object.type.toUpperCase();
    
    if (object) {
        if (type == 'HIDDEN') {
            var entityName = object.name;
            var indexDate = getOuterHTML(object).indexOf("displayDate");
            var indexAmount = getOuterHTML(object).indexOf("displayAmount");
            var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
			var indexRate = getOuterHTML(object).indexOf("displayRate");//Changes_prefix_rateType_Fields
            if (indexDate > 0 || indexAmount > 0 || indexNumber > 0 || indexRate > 0) {//Changes_prefix_rateType_Fields
                var entityDBC = object.getAttribute("DBC");
                var entityDBT = object.getAttribute("DBT");
                if (entityDBC) {
                    if (entityDBT) {
                        entityName = entityDBT + "__" + entityDBC + "I";
                        var nextSibling = getNextSibling(getNextSibling(object));
                        if (nextSibling) {
                            //if(nextSibling.id == entityName) {
                            if (nextSibling.name == object.name + "I") {
                                if (nextSibling.getAttribute("READONLY1")) {
                                   // nextSibling.readOnly = true;//REDWOOD_CHANGES
                                   // nextSibling.className = "TXTro numeric" //REDWOOD_CHANGES
                                    nextSibling.setAttribute("readOnly",true);//REDWOOD_CHANGES
                                } else {
                                    nextSibling.disabled = false;
                                    nextSibling.setAttribute("readOnly",false);//REDWOOD_CHANGES
                                    //nextSibling.readOnly = false;	  //REDWOOD_CHANGES
                                    //nextSibling.className = "TXTstd numeric" //REDWOOD_CHANGES
                                }
                                if (indexDate > 0) {
                                    var nextSibling1 = getNextSibling(nextSibling);
                                    if (nextSibling1) {
                                        nextSibling1.className = "BTNimg";
                                        nextSibling1.disabled = false;
                                    }
                                }
                                var nextSibling1 = getNextSibling(nextSibling);
                                if (nextSibling1) {
                                    if (nextSibling1.tagName.toUpperCase() == "BUTTON") {
                                        nextSibling1.disabled = false;
                                        if (nextSibling1.className == 'BTNhide' && indexDate > 0) nextSibling1.className = getNextSibling(getNextSibling(object)).getAttribute("oldClassName");
                                        else nextSibling1.className = nextSibling1.getAttribute("oldClassName");
                                    }
                                }
                            }
                        }
                    } else {}
                }
            }
        } else {
            if ( tagName == 'OJ-INPUT-TEXT' || tagName == "OJ-INPUT-NUMBER" || tagName == "OJ-INPUT-DATE" || tagName == "OJ-INPUT-DATE-TIME") { //REDWOOD_CHANGES
                if (type == 'TEXT') {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        //object.readOnly = true;        //REDWOOD_CHANGES
                        object.setAttribute("readOnly",true);//REDWOOD_CHANGES
                        if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0){
                            //object.className = "TXTro numeric";
                              object.setAttribute("readOnly",true);//REDWOOD_CHANGES
                        }else{
                           // object.className = "TXTro";	//REDWOOD_CHANGES
                             object.setAttribute("readOnly",true);//REDWOOD_CHANGES
                        }
                        
                    } else {
                        //if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0) {
                        if (getOuterHTML(object).indexOf("validateInputAmount") > 0 || getOuterHTML(object).indexOf("validateInputNumber") > 0 || getOuterHTML(object).indexOf("processAmount") > 0 || getOuterHTML(object).indexOf("processNumber") > 0 || getOuterHTML(object).indexOf("displayRate") > 0) {//added for Amount/Exchange Rate patterns //Changes_prefix_rateType_Fields
                          //REDWOOD_CHANGES
                            /*object.disabled = false;
                            object.readOnly = false;
                            object.className = "TXTstd numeric";*/
                            object.setAttribute("readOnly",false); 
                          //REDWOOD_CHANGES
                        } else if (object.id && object.id.indexOf("goto__") != -1) {
                            object.readOnly = true;
                            object.className = "TXTro";
                        }
                        else {
                            if (object.getAttribute("INPUT_LOV") == "Y") {//Fix for n 19426248.
                             //REDWOOD_CHANGES
                                if(object.getElementsByTagName("OJ-BUTTON")[0]){
                                   object.getElementsByTagName("OJ-BUTTON")[0].setAttribute("disabled",false); 
                                }
                             //REDWOOD_CHANGES
                            }
                            else {					
                          //REDWOOD_CHANGES
                               /* object.disabled = false;
                                object.readOnly = false;
                                object.tabIndex = "0";
                                object.className = "TXTstd";*/
                                if(tagName == 'OJ-INPUT-TEXT'){
                                 var len = object.getElementsByTagName("OJ-BUTTON").length;
                                 for(i=0;i<len;i++){
                                      if( object.getElementsByTagName("OJ-BUTTON")[i]){
                                         object.getElementsByTagName("OJ-BUTTON")[i].setAttribute("disabled",false);
                                    }
                                 }
                                   
                                }
                                object.setAttribute("readOnly",false);
                                object.setAttribute("tabIndex",0); 
                           //REDWOOD_CHANGES
                            }
                        }
                    }
                } else if (type == "PASSWORD") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TXTro";
                    } else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TXTstd";
                    }
                } else if (type == "FILE") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.readOnly = true;
                        object.className = "TXTro";
                    } else {
                        object.disabled = false;
                        object.readOnly = false;
                        object.className = "TXTstd";
                    }
                    } else {
                        object.disabled = false;
                }
            } else if (tagName == 'OJ-TEXT-AREA' || tagName == 'OJ-INPUT-PASSWORD'  ) {//REDWOOD_CHANGES
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
//REDWOOD_CHANGES
                  object.setAttribute("readOnly", true);
                   // object.readOnly = true;
                    //object.className = "TXAro"; 
//REDWOOD_CHANGES
                    } else {
                    object.readOnly = false;	
//REDWOOD_CHANGES
                    object.setAttribute("readOnly", false);
                   // object.className = "TXAstd";
                }
            }else if ( tagName == 'OJ-INPUT-DATE'  || tagName == 'OJ-INPUT-DATE-TIME' ) {
                    object.readOnly = false;
                    object.setAttribute("readOnly", false);
               
            }   else if (tagName == "OJ-RADIOSET") {		  
//REDWOOD_CHANGES
                if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                        object.disabled = true;	 //REDWOOD_CHANGES
                       
                        //object.readOnly = true; //REDWOOD_CHANGES
                    } else {		 
//REDWOOD_CHANGES
                        object.disabled = false;
                         object.removeAttribute("disabled");
                         
                    }
                }else if (tagName == "OJ-SWITCH") {
                    if (object.getAttribute("READONLY1") && gAction != "ENTERQUERY") {
                       // object.disabled = true;
                        //object.readOnly = true;
                        // object.setAttribute("disabled","true");
                          object.disabled = true;
                    } else {
                        //object.disabled = false;
                        //object.readOnly = false;
                        //object.setAttribute("disabled","false");
                         object.disabled = false;
                    }
                } else if (tagName == 'SELECT' || tagName == 'OJ-SELECT-SINGLE') { 
//REDWOOD_CHANGES

                if (object.getAttribute("READONLY1")) {	 
//REDWOOD_CHANGES
                   // object.disabled = true;
                    //object.className = "SELro";
                    object.setAttribute("readonly",true); 
                    object.readonly = true;	   
//REDWOOD_CHANGES
                    object.disabled = false;  
//REDWOOD_CHANGES
                } else {
                    //object.disabled = false;
                    //object.className = "SELstd";
                    object.setAttribute("readonly",false); 
                      object.readonly = false;
                        object.disabled = false;
                    //object.removeAttribute("disabled"); //OJET Migration
                    //object.refresh();
                }
            } else if ( tagName == 'OJ-BUTTON') {
                   // object.disabled = false;
                    //object.setAttribute("disabled","false"); 
                    object.removeAttribute("disabled");
                  
//                if (object.name.indexOf("go__") != 0) {
//                    if (object.name.indexOf("cmdAddRow_") != -1 || object.name.indexOf("cmdDelRow_") != -1 || object.name.indexOf("BTN_SINGLE_VIEW_") != -1) {
//                        object.disabled = false;
//                        object.className = "BTNimg";
//                    } else {
//                        object.disabled = false;
//                    }
//                } else {
//                    object.disabled = false;
//                }	 
//REDWOOD_CHANGES
            }
        }
        var nextSibling = getNextSibling(object);
        if (nextSibling) {
            if (nextSibling.tagName) {
                if (nextSibling.tagName.toUpperCase() == "BUTTON") {
                    if (nextSibling.name.indexOf("go__") != 0) nextSibling.disabled = false;
                    if (nextSibling.className == 'BTNhide') nextSibling.className = nextSibling.getAttribute("oldClassName");
					/*9NT1606_12_2_RETRO_12_1_25436204 Starts*/
					try{
					if(getNextSibling(nextSibling) && getNextSibling(nextSibling).tagName) {
						if (getNextSibling(nextSibling).tagName.toUpperCase() == "BUTTON") {
							if (getNextSibling(nextSibling).className == 'BTNhide') {
								getNextSibling(nextSibling).disabled = false;
								getNextSibling(nextSibling).className = getNextSibling(nextSibling).getAttribute("oldClassName");
							}
						}
					}
					}catch(excp){}
					/*9NT1606_12_2_RETRO_12_1_25436204 Ends*/
                }
            }
        }
    }
   // fnHover(object); //REDWOOD_CHANGES
  //if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].disabled =false;//35264798
    if(object.getElementsByTagName("OJ-BUTTON")[0])	object.getElementsByTagName("OJ-BUTTON")[0].removeAttribute("disabled");//REDWOOD_35357326
	return;
}

function fnHover(object) {
    var last_char = object.className.charAt(object.className.length - 1);
    //Fix for 18432970 Start
    if(object.className != "Abut"){
    if (last_char != "D" && last_char != "H") {
        if (object.tagName.toUpperCase() == "BUTTON" || object.type.toUpperCase() == "BUTTON") {
            object.onmouseover = function () {
                setHoverClass(object, object.className, 'onmouseover')
            }
            object.onblur = function () {
                setHoverClassOut(object, object.className, 'onblur')
            }
            object.onfocus = function () {
                setHoverClass(object, object.className, 'onfocus')
            }
            object.onmouseout = function () {
                setHoverClassOut(object, object.className, 'onmouseout')
            }
        }
     }    
    }
    //Fix for 18432970 End
}
//Fix for disable
function fnRemoveHover(object) {
    object.setAttribute("onmouseover", "");
    object.setAttribute("onmouseout", "");
    object.removeAttribute("onmouseout");
    object.removeAttribute("onmouseover");
}

function setHoverClass(object, tempHover, event_type) {
    var last_char = object.className.charAt(object.className.length - 1);
    if (last_char != "H") {
        object.className = tempHover + 'H';
    }
}

function setHoverClassOut(object, tempHover, event_type) {
    var last_char = object.className.charAt(object.className.length - 1);
    if (last_char == "H") {
        object.className = object.className.substring(0, object.className.length - 1);
    }
}

function disableRowElements(row) {
    var numElem = row.children.length;
    var tmpElem;
    for (var loopIndex = 1; loopIndex < numElem; loopIndex++) {
        var lChildRow = row.children[loopIndex];
        for (lcount = 0; lcount < lChildRow.children.length; lcount++) {
            tmpElem = lChildRow.children[lcount];
            var queryMode = "";
            if (tmpElem.getAttribute("queryMode")) {
                queryMode = isNull(tmpElem.getAttribute("queryMode"));
            }
            switch (tmpElem.tagName.toUpperCase()) {
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
            case "INPUT":
                if (queryMode != 'E') fnDisableElement(tmpElem);
                break;
            }
        }
    }
}

function enableRowElements(row) {
    var numElem = row.children.length;
    var tmpElem;
    for (var loopIndex = 0; loopIndex < numElem; loopIndex++) {
        var lChildRow = row.children[loopIndex];
        if(lChildRow.children.length > 0 && lChildRow.children[0].tagName == "DIV"){ //Static fix start
          lChildRow = lChildRow.children[0];
        } //Static fix end
        for (lcount = 0; lcount < lChildRow.children.length; lcount++) {
            tmpElem = lChildRow.children[lcount];
            if (tmpElem.children[1] && tmpElem.children[1].type == "checkbox") { //Static fix start
                tmpElem = tmpElem.children[1];//Static fix start
            }
            var queryMode = "";
            if (tmpElem.getAttribute("queryMode")) {
                queryMode = isNull(tmpElem.getAttribute("queryMode"));
            }
            switch (tmpElem.tagName.toUpperCase()) {  
//REDWOOD_CHANGES
            case "OJ-BUTTON":
            case "OJ-SELECT-SINGLE": //OJET Migration
                fnEnableElement(tmpElem);
                break;
            case "OJ-TEXT-AREA":  //OJET Migration
            case "OJ-INPUT-TEXT":
            case "OJ-INPUT-NUMBER":
             case "OJ-INPUT-DATE":
            case "OJ-SWITCH":		 
//REDWOOD_CHANGES
                fnEnableElement(tmpElem);
                break;
            }
        }
    }
}

function ShowXML(xmlFile, xslName, scrnName) {
    var imagePath = 'Images/Ext' + strTheme.substring(0, strTheme.indexOf('.css'));
    var html;
    strScreenName = scrnName;
   // var xmlDoc = loadXMLFile(xmlFile);
   if(typeof(screenType) == "undefined")
        screenType = "";
   var xmlDoc = null;
     xmlDoc = getUIXML(xmlFile, screenType);//Caching changes start
  //if (screenType != "WB" && xmlFile.indexOf("EXTAUTHORIZE") == -1) {
  /*if (typeof(screenType) != "undefined" && screenType != "WB") { caching change start
	  xmlDoc = getUIXML(xmlFile);
    }
    else{
       xmlDoc = loadXMLFile(xmlFile);
    } caching change end*/
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    } else {
        g_scrType = "M";
    }
    if (mainWin.cacheContent == 'E') {
        try {
            html = mainWin.HTMLCache[functionId + scrnName + xslName].cloneNode(true);
        } catch (e) {}

        if (typeof (html) != 'undefined') return html;
    }
    var applicationName = mainWin.applicationName;
    var dispSize = mainWin.dispSize;
    var XslLabels = fnBuildXslLabels();
	var globalVariables = fnBuildGlobalVar(); //Fix for 19579126
     if(typeof(mainWin.screenHtmlCache[xslName]) == "undefined") { //12.1 Caching Tab load start
        mainWin.screenHtmlCache[xslName] = loadXSLFile(mainWin.loadXSL(xslName))
     }
    xslDoc = mainWin.screenHtmlCache[xslName];//12.1 Caching Tab load end
    if (html == null || mainWin.cacheContent == 'D') {
        /* Caching changes start if (typeof (screenType) != "undefined") {
            if (screenType == "WB") {
                var xmlDoc = embeddcall(xmlDoc);
                xmlDoc = fnModifyMISSubScreenXml(xmlDoc);//Changes for 17359563                           
    
            } else {
                if (typeof (callformTabArray) != "undefined") {
                    for (var i in callformTabArray) {
                        xmlDoc = insertCallFormXmlToTab(xmlDoc, i, callformTabArray[i]);
                    }
                }
                //12.0.2 udf changes for CSCTRUDF start				
                if (functionId == "CSCFNUDF" || functionId == "CSCTRUDF") 
				{				
                    xmlDoc = convertUDFToSE(xmlDoc);
                }				
                //12.0.2 udf changes for CSCTRUDF end 
            }
        }
		Caching changes end*/
        var params = new Array();
        params["screen"] = scrnName;
        params["uiXML"] = uiXML;
        params["imgPath"] = imagePath;
        params["displaySize"] = dispSize;
        params["thirdChar"] = thirdChar;
        params["XslLabels"] = XslLabels;
        params["globalVariables"] = globalVariables; //Fix for 19579126
        params["applicationName"] = applicationName;
        params["largeScreenWidth"] = mainWin.scrWidth; //REDWOOD_CHANGES
        params["mediumScreenWidth"] = mainWin.dashBoardWidth;
        if(isSubScreen  == true){
            params["largeScreenWidth"] = mainWin.scrWidth; //REDWOOD_CHANGES
        }
        params["screenHeight"] = mainWin.y;
                params["dateFormat"] = mainWin.systemDateFormat;//HTML5 Changes
        params["dateDelimiterReqd"] = mainWin.dateDelimiterReqd; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
        if (thirdChar == "S") params["functionId"] = parentFunc;
        else params["functionId"] = functionId;
        params["CurTabId"] = subScrBodyTabId;
        try {
            getDashboardParams(params);
        } catch (e) {}
        html = transform(xmlDoc, xslDoc, params);
        try {
            if (mainWin.cacheContent == 'E') {
                mainWin.HTMLCache[functionId + scrnName + xslName] = html.cloneNode(true);
            }
        } catch (e) {}

        gXmlFileName = xmlFile;
        gScreenName = scrnName;
        gXslFileName = xslName;

    }
    return html;
}

function insertCallFormXmlToTab(currXmlDoc, callformInfo, callformName) {
    var callformXmlPath = mainWin.UIXmlPath + "/" + langCode + "/" + callformName + ".xml";
    var callformXmlDoc = loadXMLFile(callformXmlPath);
    var parentTabId = callformInfo.substring(callformInfo.lastIndexOf("__") + 2, callformInfo.length);
    var parentScrName = callformInfo.substring(0, callformInfo.lastIndexOf("__"));
    var callformSecNodes = selectNodes(callformXmlDoc, "//BODY/TAB/SECTION");
    var currSecNodes = selectNodes(currXmlDoc, "//SCREEN[@NAME='" + parentScrName + "']/BODY/TAB[@ID='" + parentTabId + "']/SECTION");
    if(currSecNodes.length > 0){//12.2 callform change 
    for (var i = 0; i < currSecNodes.length; i++) {
        currSecNodes[i].parentNode.removeChild(currSecNodes[i]);
    }
    for (var j = 0; j < callformSecNodes.length; j++) {
        selectSingleNode(currXmlDoc, "//SCREEN[@NAME='" + parentScrName + "']/BODY/TAB[@ID='" + parentTabId + "']").appendChild(callformSecNodes[j]);
    }
    }//12.2 callform change
    return currXmlDoc;
}

//Fix for 14321478 -UDF update issue starts
function convertUDFToSE(xmlDocUDF) {
    selectSingleNode(xmlDocUDF, "//FLDSET[@VIEW='ME'][@TYPE='ME']").setAttribute("HIDDEN","Y");
    //Udf fld desc change
    //12.0.2 udf changes for CSCTRUDF
    var udfNodes;
    var block_name="BLK_UDF_DETAILS";
    /*Fix for 16976058 Start*/
    var fldNode ="FLDNAM";
    var dateTypeNode ="DATATYP";
    //if(functionId =='CSCTRUDF' || functionId =='PXCTRUDF') //FCUBS_12.3Payments_UDF_Changes  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430 commenting
	if(functionId =='CSCTRUDF')  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
    {
        block_name ="BLK_TXN_UDF_DETAILS";
        fldNode ="FLDNAME";
        dateTypeNode ="DATTYP";
    }
   var udfStr = '<SECTION><PART WIDTH="100">';
    if (dbDataDOM != null && (selectNodes(dbDataDOM, "//BLK_UDF_DETAILS").length > 0 || selectNodes(dbDataDOM, "//BLK_TXN_UDF_DETAILS").length > 0)) 
	{
         udfNodes = selectNodes(dbDataDOM, "//" + block_name);
         var reqd = "";
         var lblVal ="";//Fix for 30358469
         var fldVal = "";//Fix for 30358469
         var fldValDesc = "";//Fix for 30358469
         //12.0.2 udf changes for CSCTRUDF
        for(var i=0;i<udfNodes.length;i++)
        {
            if(getNodeText(selectSingleNode(udfNodes[i], "MANDATORY")) == "Y") 
                reqd = "<REQD>-1</REQD>";
            else
                reqd = "<REQD>0</REQD>";
            udfStr += '<FLDSET VIEW="SE" TYPE="SE" INDEX=""><BLOCK>BLK_UDF_DETAILS_VIEW</BLOCK><HREQ>-1</HREQ>';
            //Fix for 30358469 Starts
            lblVal = getNodeText(selectSingleNode(udfNodes[i], fldNode)); 
            fldVal = getNodeText(selectSingleNode(udfNodes[i], "FLDVAL"));
            fldValDesc = getNodeText(selectSingleNode(udfNodes[i], "FLDVALDESC"));
            if(parent.viewMnt){
                if (lblVal.lastIndexOf("_OB_") >= 0) lblVal = lblVal.substring(0, lblVal.lastIndexOf("_OB_"));
                //if (fldVal.lastIndexOf("_OB_") >= 0) fldVal = fldVal.substring(0, fldVal.lastIndexOf("_OB_"));
                //if (fldValDesc.lastIndexOf("_OB_") >= 0) fldValDesc = fldValDesc.substring(0, fldValDesc.lastIndexOf("_OB_"));
            }
            //Fix for 30358469 Ends
            if (getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "D"){
                /*Fix for 17849401*/
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>DATE</TYPE><LBL><![CDATA['+ lblVal +']]></LBL><MAXLENGTH>11</MAXLENGTH><DTYPE>DATE</DTYPE><SIZE></SIZE><CHECKED>N</CHECKED>'+reqd+'<VALUE><![CDATA['+ fldVal +']]></VALUE>'; //Fix for 30358469
            } else if(getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "N"){
                /*Fix for 17849401*/
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>TEXT</TYPE>'+reqd+'<LBL><![CDATA['+ lblVal +']]></LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>NUMBER</DTYPE><SIZE>50</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA['+ fldVal +']]></VALUE>';  //9NT1606_14_0_RETRO_12_4_27532102 - changed size to 50 //Fix for 30358469
            }else{
                /*Fix for 17849401*/
                udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>TEXT</TYPE>'+reqd+'<LBL><![CDATA['+ lblVal +']]></LBL>+""+<MAXLENGTH>150</MAXLENGTH><DTYPE>VARCHAR2</DTYPE><SIZE>50</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA['+ fldVal +']]></VALUE>';	//9NT1606_14_0_RETRO_12_4_27532102 - changed size to 50 //Fix for 30358469
            }
            /*Fix for 16976058 End*/
            //if ((getNodeText(selectSingleNode(udfNodes[i], "VALTYP")) == "V") || (getNodeText(selectSingleNode(udfNodes[i], "DATATYP")) == "C")) Fix for 17331773 
			if ((getNodeText(selectSingleNode(udfNodes[i], "VALTYP")) == "V") || (getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "C"))
                udfStr += '<LOV><NAME>LOV_UDF</NAME></LOV>';
                udfStr += '</FIELD>';
            if (getNodeText(selectSingleNode(udfNodes[i], "VALTYP")) == "V")
            /* 12.0.2 infra change for lov type fields start*/
            udfStr += '<FIELD INDEX="" CONTROL="Y"><NAME>FLDVALDESC'+i+'</NAME><TYPE>TEXT</TYPE><LBL></LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>VARCHAR2</DTYPE><SIZE>50</SIZE><READ_ONLY>-1</READ_ONLY><CHECKED>N</CHECKED><VALUE><![CDATA['+ fldValDesc +']]></VALUE></FIELD>'; //Fix for 19472941 ,27452978 - changed size to 50 //Fix for 30358469
            /* 12.0.2 infra change for lov type fields ends*/
            udfStr += '</FLDSET>';
        }
        udfStr += '</PART></SECTION>'; 
		//Udf fld desc change 
        var udfSEDom = loadXMLDoc(udfStr);        
        setNodeText(selectSingleNode(xmlDocUDF, "//PGSIZE"), "1000"); // SE UDF size increased
        multipleEntryPageSize[block_name] = "1000";
        selectSingleNode(xmlDocUDF, "//BODY/TAB").appendChild(getCloneDocElement(selectSingleNode(udfSEDom, "//SECTION")));
    }
    return xmlDocUDF;
}
//Fix for 14321478 -UDF update issue ends

/*Fix for 19698809 Starts*/ 
function convertWBUDFToSE(xmlDocUDF) {
        selectSingleNode(xmlDocUDF, "//FLDSET[@VIEW='ME'][@TYPE='ME']").setAttribute("HIDDEN","Y");
        if (functionId != "UDCD") { //9NT1606_12_2_RETRO_12_1_23664151 changes 
		try {
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);      
            if (typeof (pureXMLDOM) != "undefined") {
                    setDataXML(getXMLString(pureXMLDOM));
            }
        } catch (e) {}
		} //9NT1606_12_2_RETRO_12_1_23664151 changes 
        var udfNodes;
        var block_name  ="BLK_UDF_DETAILS";
        var fldNode     ="FIELD_NAME";
        var dateTypeNode="DATATYP";
        var udfStr = '<SECTION><PART WIDTH="100">';
        if (dbDataDOM != null && (selectNodes(dbDataDOM, "//BLK_UDF_DETAILS").length > 0 || selectNodes(dbDataDOM, "//BLK_TXN_UDF_DETAILS").length > 0)) {
            udfNodes = selectNodes(dbDataDOM, "//" + block_name);
            var reqd = "";
            for(var i=0;i<udfNodes.length;i++){
                try{
                    if(getNodeText(selectSingleNode(udfNodes[i], "MANDATORY")) == "Y") 
                        reqd = "<REQD>-1</REQD>";
                    else
                        reqd = "<REQD>0</REQD>";
                }catch(ex){}
                udfStr += '<FLDSET VIEW="SE" TYPE="SE" INDEX=""><BLOCK>BLK_UDF_DETAILS_VIEW</BLOCK><HREQ>-1</HREQ>';
                if (getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "D"){
                    udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>DATE</TYPE><LBL><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], fldNode)) +']]></LBL><MAXLENGTH>11</MAXLENGTH><DTYPE>DATE</DTYPE><SIZE></SIZE><CHECKED>N</CHECKED>'+reqd+'<VALUE><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], "FIELD_VALUE")) +']]></VALUE>';
                } else if(getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "N"){
                    udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>TEXT</TYPE>'+reqd+'<LBL><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], fldNode)) +']]></LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>NUMBER</DTYPE><SIZE>50</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], "FIELD_VALUE")) +']]></VALUE>'; //9NT1606_14_0_RETRO_12_4_27532102 - changed size to 50
                }else{
                    udfStr += '<FIELD INDEX="" CONTROL="Y" UDF="Y"><NAME>FLDVAL'+i+'</NAME><TYPE>TEXT</TYPE>'+reqd+'<LBL><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], fldNode)) +']]></LBL><MAXLENGTH>150</MAXLENGTH><DTYPE>VARCHAR2</DTYPE><SIZE>50</SIZE><CHECKED>N</CHECKED><VALUE><![CDATA['+ getNodeText(selectSingleNode(udfNodes[i], "FIELD_VALUE")) +']]></VALUE>'; //9NT1606_14_0_RETRO_12_4_27532102	- changed size to 50
                }
                if ((getNodeText(selectSingleNode(udfNodes[i], "VAL_TYPE")) == "V") || (getNodeText(selectSingleNode(udfNodes[i], dateTypeNode)) == "C"))
                    udfStr += '<LOV><NAME>LOV_UDF</NAME></LOV>';
                udfStr += '</FIELD>';
                udfStr += '</FLDSET>';
            }
            udfStr += '</PART></SECTION>'; 
            var udfSEDom = loadXMLDoc(udfStr);        
            setNodeText(selectSingleNode(xmlDocUDF, "//PGSIZE"), "1000"); 
            multipleEntryPageSize[block_name] = "1000";
			 //9NT1606_12_2_RETRO_12_1_23664151 starts
			if (functionId == "UDCD") {
				selectSingleNode(xmlDocUDF, "//BODY/TAB").appendChild(getCloneDocElement(selectSingleNode(udfSEDom, "//SECTION")));
			} else { //9NT1606_12_2_RETRO_12_1_23664151 ends
            xmlDocUDF.appendChild(getCloneDocElement(selectSingleNode(udfSEDom, "//SECTION")));
			} //9NT1606_12_2_RETRO_12_1_23664151 changes 
        }
        return xmlDocUDF;
}
/*Fix for 19698809 Ends*/

function fnBuildXslLabels() {

    var labels = "@@LBL_ADVANCED~~" + mainWin.getItemDesc("LBL_ADVANCED");
    labels += "@@LBL_RESET~~" + mainWin.getItemDesc("LBL_RESET");
    labels += "@@LBL_QRY_QUERY~~" + mainWin.getItemDesc("LBL_QRY_QUERY");
    labels += "@@LBL_REFRESH~~" + mainWin.getItemDesc("LBL_REFRESH");
    labels += "@@LBL_RESULT~~" + mainWin.getItemDesc("LBL_RESULT");
    labels += "@@LBL_MAKERID~~" + mainWin.getItemDesc("LBL_MAKERID");
    labels += "@@LBL_CHECKER_ID~~" + mainWin.getItemDesc("LBL_CHECKER_ID");
    labels += "@@LBL_MAKER_DT_STAMP~~" + mainWin.getItemDesc("LBL_MAKER_DT_STAMP");
    labels += "@@LBL_CHECKER_DT_STAMP~~" + mainWin.getItemDesc("LBL_CHECKER_DT_STAMP");
    labels += "@@LBL_RECORD_STAT~~" + mainWin.getItemDesc("LBL_RECORD_STAT");
    labels += "@@LBL_AUTHORISATION_STATUS~~" + mainWin.getItemDesc("LBL_AUTHORISATION_STATUS");
    labels += "@@LBL_A~~" + mainWin.getItemDesc("LBL_A");
    labels += "@@LBL_SUMMARY_U~~" + mainWin.getItemDesc("LBL_SUMMARY_U");
    labels += "@@LBL_UN_AUTH_FLG~~" + mainWin.getItemDesc("LBL_UN_AUTH_FLG");
    labels += "@@LBL_O~~" + mainWin.getItemDesc("LBL_O");
    labels += "@@LBL_OPEN~~" + mainWin.getItemDesc("LBL_OPEN");
    labels += "@@LBL_C~~" + mainWin.getItemDesc("LBL_C");
    labels += "@@LBL_CLOSED~~" + mainWin.getItemDesc("LBL_CLOSED");
    labels += "@@LBL_EXIT~~" + mainWin.getItemDesc("LBL_EXIT");
    labels += "@@LBL_OK~~" + mainWin.getItemDesc("LBL_OK");
    labels += "@@LBL_CANCEL~~" + mainWin.getItemDesc("LBL_CANCEL");
    labels += "@@LBL_FIELDS~~" + mainWin.getItemDesc("LBL_FIELDS");
    labels += "@@LBL_OPERATOR~~" + mainWin.getItemDesc("LBL_OPERATOR");
    labels += "@@LBL_VALUE~~" + mainWin.getItemDesc("LBL_VALUE");
    labels += "@@LBL_AND~~" + mainWin.getItemDesc("LBL_AND");
    labels += "@@LBL_CLEAR_QUERY~~" + mainWin.getItemDesc("LBL_CLEAR_QUERY");
    labels += "@@LBL_ORDER_BY~~" + mainWin.getItemDesc("LBL_ORDER_BY");
    labels += "@@LBL_ASCENDING~~" + mainWin.getItemDesc("LBL_ASCENDING");
    labels += "@@LBL_DESCENDING~~" + mainWin.getItemDesc("LBL_DESCENDING");
    labels += "@@LBL_ACCEPT~~" + mainWin.getItemDesc("LBL_ACCEPT");
    labels += "@@LBL_TO~~" + mainWin.getItemDesc("LBL_TO");
    labels += "@@LBL_OR~~" + mainWin.getItemDesc("LBL_OR");
    labels += "@@LBL_SEARCH~~" + mainWin.getItemDesc("LBL_SEARCH");
    labels += "@@LBL_RECORDS_PER_PAGE~~" + mainWin.getItemDesc("LBL_RECORDS_PER_PAGE");
    labels += "@@LBL_GOTO_PAGE~~" + mainWin.getItemDesc("LBL_GOTO_PAGE");
    labels += "@@LBL_PAGE~~" + mainWin.getItemDesc("LBL_PAGE");	//REDWOOD_CHANGES
    labels += "@@LBL_OF~~" + mainWin.getItemDesc("LBL_OF");
    labels += "@@LBL_AUTHORIZED~~" + mainWin.getItemDesc("LBL_AUTHORIZED");
    labels += "@@LBL_INPUT_BY~~" + mainWin.getItemDesc("LBL_INPUT_BY");
    labels += "@@LBL_AUTH_BY~~" + mainWin.getItemDesc("LBL_AUTH_BY");
    labels += "@@LBL_DATE_TIME~~" + mainWin.getItemDesc("LBL_DATE_TIME");
    labels += "@@LBL_MOD_NO~~" + mainWin.getItemDesc("LBL_MOD_NO");
    labels += "@@LBL_OPEN~~" + mainWin.getItemDesc("LBL_OPEN");
    labels += "@@LBL_CONTRACT_STATUS~~" + mainWin.getItemDesc("LBL_CONTRACT_STATUS");
    labels += "@@LBL_PAYMENT_STATUS~~" + mainWin.getItemDesc("LBL_PAYMENT_STATUS");
    labels += "@@LBL_COLLECTION_STATUS~~" + mainWin.getItemDesc("LBL_COLLECTION_STATUS");
    labels += "@@LBL_DEAL_STATUS~~" + mainWin.getItemDesc("LBL_DEAL_STATUS");
    labels += "@@LBL_PROCESS_STATUS~~" + mainWin.getItemDesc("LBL_PROCESS_STATUS");
    labels += "@@LBL_REVERSAL~~" + mainWin.getItemDesc("LBL_REVERSAL");
    labels += "@@LBL_REMARKS~~" + mainWin.getItemDesc("LBL_REMARKS");
    labels += "@@LBL_AUDIT~~" + mainWin.getItemDesc("LBL_AUDIT");
    //ctcb 3.0 bpel audit blk changes
    labels += "@@LBL_PRIORITY_AUDIT~~" + mainWin.getItemDesc("LBL_PRIORITY_AUDIT");
    labels += "@@LBL_HIGH~~" + mainWin.getItemDesc("LBL_HIGH");
    labels += "@@LBL_NORMAL~~" + mainWin.getItemDesc("LBL_NORMAL");
    labels += "@@LBL_SHOWERR~~" + mainWin.getItemDesc("LBL_SHOWERR");
    labels += "@@LBL_REMARKS~~" + mainWin.getItemDesc("LBL_REMARKS");
    labels += "@@LBL_GETPRIORITY~~" + mainWin.getItemDesc("LBL_GETPRIORITY");
    labels += "@@LBL_SUM_LOCK~~" + mainWin.getItemDesc("LBL_SUM_LOCK");
    labels += "@@LBL_CHECKBOX_YES~~" + mainWin.getItemDesc("LBL_CHECKBOX_YES");
    labels += "@@LBL_CHECKBOX_NO~~" + mainWin.getItemDesc("LBL_CHECKBOX_NO");
    labels += "@@LBL_INFRA_MANDATORY~~" + mainWin.getItemDesc("LBL_INFRA_MANDATORY");
    labels += "@@LBL_NOSCRIPT_LABEL~~" + mainWin.getItemDesc("LBL_NOSCRIPT_LABEL");
    labels += "@@LBL_SUMMARY~~" + mainWin.getItemDesc("LBL_SUMMARY");
    labels += "@@LBL_EXPAND_GROUP~~" + mainWin.getItemDesc("LBL_EXPAND_GROUP");
    labels += "@@LBL_LIST_OF_VALUES~~" + mainWin.getItemDesc("LBL_LIST_OF_VALUES");
    labels += "@@LBL_INFRA_PREVIOUS~~" + mainWin.getItemDesc("LBL_INFRA_PREVIOUS");
    labels += "@@LBL_NEXT~~" + mainWin.getItemDesc("LBL_NEXT");
    labels += "@@LBL_FIRST~~" + mainWin.getItemDesc("LBL_FIRST");
    labels += "@@LBL_LAST~~" + mainWin.getItemDesc("LBL_LAST");
    labels += "@@LBL_ADDROW~~" + mainWin.getItemDesc("LBL_ADDROW");
    labels += "@@LBL_DELETEROW~~" + mainWin.getItemDesc("LBL_DELETEROW");
    labels += "@@LBL_SINGLE_REC_VIEW~~" + mainWin.getItemDesc("LBL_SINGLE_REC_VIEW");
    labels += "@@LBL_LOCK~~" + mainWin.getItemDesc("LBL_LOCK");
    labels += "@@LBL_COLUMNS~~" + mainWin.getItemDesc("LBL_COLUMNS");
    labels += "@@LBL_NARRATIVE~~" + mainWin.getItemDesc("LBL_NARRATIVE");
    labels += "@@LBL_SELECT_ALL_ROWS~~" + mainWin.getItemDesc("LBL_SELECT_ALL_ROWS");
    labels += "@@LBL_SELECT_ROW~~" + mainWin.getItemDesc("LBL_SELECT_ROW");
    labels += "@@LBL_REJECT~~" + mainWin.getItemDesc("LBL_REJECT");
    labels += "@@LBL_EXPORT~~" + mainWin.getItemDesc("LBL_EXPORT");
    labels += "@@LBL_PAGE_FOOTER~~" + mainWin.getItemDesc("LBL_PAGE_FOOTER");
    labels += "@@LBL_EMPTY_COLUMN~~" + mainWin.getItemDesc("LBL_EMPTY_COLUMN");
    labels += "@@LBL_CALENDAR~~" + mainWin.getItemDesc("LBL_CALENDAR");
    labels += "@@LBL_MAIN~~" + mainWin.getItemDesc("LBL_MAIN");
    labels += "@@LBL_END_TABLE~~" + mainWin.getItemDesc("LBL_END_TABLE");
    labels += "@@LBL_DISMISS~~" + mainWin.getItemDesc("LBL_DISMISS");
    labels += "@@LBL_CASE_SENSITIVE~~" + mainWin.getItemDesc("LBL_CASE_SENSITIVE");
    labels += "@@LBL_OPTIONAL~~" +  mainWin.getItemDesc("LBL_OPTIONAL");//12.1 summary performance changes new 
    labels += "@@LBL_RECOMMENDED~~" +  mainWin.getItemDesc("LBL_RECOMMENDED");//12.1 summary performance changes new start
    labels += "@@LBL_TOOLBAR_SAVE~~" + mainWin.getItemDesc("LBL_TOOLBAR_SAVE");
    labels += "@@LBL_SAVED_QUERY~~" + mainWin.getItemDesc("LBL_SAVED_QUERY");
    labels += "@@LBL_EXEC_QUERY~~" + mainWin.getItemDesc("LBL_EXEC_QUERY");
    labels += "@@LBL_CLEAR_ALL~~" + mainWin.getItemDesc("LBL_CLEAR_ALL");
    //MAR19
    labels += "@@LBL_EXPAND_SECTION~~" + mainWin.getItemDesc("LBL_EXPAND_SECTION");
    labels += "@@LBL_COLLAPSE_SECTION~~" + mainWin.getItemDesc("LBL_COLLAPSE_SECTION");   
	labels += "@@LBL_CURRENT_VERSION~~" + mainWin.getItemDesc("LBL_CURRENT_VERSION");//added for 17388325 
    labels += "@@LBL_TOTAL_VERSION~~" + mainWin.getItemDesc("LBL_TOTAL_VERSION");  //added for 17388325  
	//12.0.3 Summary to detail changes starts
    labels += "@@LBL_DETAIL~~" + mainWin.getItemDesc("LBL_DETAIL");
    //12.0.3 Summary to detail changes ends  
    //12.0.4 Summary performace changes starts
    labels += "@@LBL_RECOMMENDED_CRITERIA~~"+ mainWin.getItemDesc("LBL_RCMNDED_CRITERIA");      
    //12.0.4 Summary performace changes ends 
    labels += "@@LBL_LOCK_COLUMNS~~"+ mainWin.getItemDesc("LBL_LOCK_COLUMNS");  //12.1 lock column changes
    labels += "@@LBL_SEARCH_RESULT~~"+ mainWin.getItemDesc("LBL_SEARCH_RESULT"); //REDWOOD_CHANGES 
    labels += "@@LBL_SEARCH_CRITERIA~~"+ mainWin.getItemDesc("LBL_SEARCH_CRITERIA"); //REDWOOD_CHANGES 
    labels += "@@LBL_EXPORT_ALL~~" + mainWin.getItemDesc("LBL_EXPORT_ALL"); // Bug 19609280 - Asynchronous summary export changes 
	labels += "@@LBL_MORE~~" + mainWin.getItemDesc("LBL_MORE"); //HTML5 changes 24/OCT/2016 Fix for 24904397
	labels += "@@";
    return labels;
}

function fnGetUixmlForFunction(vFunctionId) {
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + vFunctionId + "']");
    var uiName = vFunctionId;
    if (uiNameNode) {
        for (var i = 0; i < uiNameNode.attributes.length; i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    return uiName;
}

function fnGetSubScrDlgArgs(screenArgs) {
    var dlgArgs = new Object();
    dlgArgs.openerDoc = document;
    dlgArgs.mainWin = dlgArg.mainWin;
    dlgArgs.parentWin = window;
    dlgArgs.dbDataDOM = dbDataDOM.cloneNode(true);
    dlgArgs.dbIndexArray = dbIndexArray;
    dlgArgs.gAction = gAction;
    if (screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O') {
        dlgArgs.exitOnlineAuth = true;
    }
    if (screenArgs["AUTHORIZE_SCREEN_TYPE"] != 'O') {
        dlgArgs.dataSrcLocationArray = dataSrcLocationArray;
        dlgArgs.relationArray = relationArray;
    }
    return dlgArgs;
}

function loadSubScreenDIV(divId, src) {
    src = mainWin.addIframeReqParam(src); //session expiry change 
    src = encodeURI(src);
    var customWin = document.createElement("div");
    customWin.id = divId;
    //customWin.className = "dhtmlwindow"; //REDWOOD_CHANGES
    customWin.style.position = "absolute";
//   customWin.style.zIndex= 2000;	//REDWOOD_CHANGES
    var customWinData = '<iframe id="ifrSubScreen" title="" src="' + src + '" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';//REDWOOD_CHANGES
    customWin.innerHTML = customWinData;
    document.getElementById("Div_ChildWin").appendChild(customWin);
    document.getElementById("Div_ChildWin").style.display = "block";
    var winObj = document.getElementById(divId);
    winObj.style.visibility = "visible";
    winObj.style.display = "block";
}

function fnPopulateScrArgs(screenArgs, scrName, funcId) {
    if (typeof (scrArgName) != "undefined") {
        if (scrArgName[scrName]) {
            var screenArgName = scrArgName[scrName].split("~");
            var screenArgDest = scrArgDest[scrName].split("~");
            for (var i = 0; i < screenArgName.length; i++) {
                if (screenArgName[i] == "ACTION_CODE") continue;
                document.getElementById(screenArgDest[i]).value = screenArgs[screenArgName[i]];
				fireHTMLEvent(document.getElementById(screenArgDest[i]), "onpropertychange"); //Fix for 19246676
            }
        }
    }
}

function fnLoadSubScreen(xmlFileName, xslFileName, screenName) {
    g_txnBranch = txnBranch;
    //txnBranchUC = parent.txnBranchUC;
    fnBuildFullDOM();/*12.0.4 UI performance changes */
    if (parent.screenArgs["AUTHORIZE_SCREEN_TYPE"] == 'O') {
        exitOnlineAuth = true;
    } else {
        exitOnlineAuth = true;
    }
    var funcId = xmlFileName.substring(xmlFileName.lastIndexOf("/") + 1, xmlFileName.lastIndexOf(".xml"));
    debugs("xmlFileName", funcId);
    debugs("xslFileName", xslFileName);
    if(funcId == 'EXTAUTHORIZE'){
      var t = getDateObject();
      var startjsTime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    }
    if (parent.dbDataDOM != null) 
        dbDataDOM = loadXMLDoc(getXMLString(parent.dbDataDOM));
    
    dbIndexArray = parent.dbIndexArray;
    gAction = parent.gAction;
    if (parent.screenArgs["AUTHORIZE_SCREEN_TYPE"] != 'O') {
        if (parent.relationArray) {
            relationArray = parent.relationArray;
        }
        if (parent.dataSrcLocationArray) {
            dataSrcLocationArray = parent.dataSrcLocationArray;
        }
    }
	isSubScreen = true;
    var html = ShowXML(xmlFileName, xslFileName, screenName);
    if (getBrowser().indexOf("IE") != -1) {//ie11 changes
        document.getElementById("ResTree").insertAdjacentHTML("beforeEnd", html);
    } else {
        document.getElementById("ResTree").appendChild(html);
    }
    debugs("InnerHTML", document.getElementById("ResTree").innerHTML);

 //REDWOOD_CHANGES   
    if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
          
    }else{
         document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
   document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
  // var htmlContent = document.getElementById("ResTree").innerHTML;
   
   var  footerContent = document.getElementById("DIVFooter");
   if(footerContent!=null){
   footerContent.classList.remove("DIVfooter");
   document.getElementById("subscreenFooter").innerHTML = footerContent.outerHTML;
   footerContent.parentNode.removeChild(footerContent);
   }  
//REDWOOD_CHANGES
    if (tab_arr.length == 0 || tab_ids.length == 0) {
        fnTabDetails();
    }
    for (var i = 0; i < tab_arr.length; i++) {
        if (document.getElementById("TBLPage" + tab_arr[i].id).innerHTML == "") {
            html = ShowXMLTabNew(xmlFileName, 'ExtDetailTab.xsl', strScreenName, tab_arr[i].id); //12.1 Caching Tab load
            debugs("tabsContent=", html);
            //if (getBrowser().indexOf("IE") != -1) {//12.1 Caching Tab load  
//REDWOOD_CHANGES
            if (getBrowser().indexOf("FIREFOX") !=  - 1) {
                     html = html.replace(new RegExp("template_tmp", 'g'), "template");
            }		
//REDWOOD_CHANGES
                document.getElementById("TBLPage" + tab_arr[i].id).innerHTML = html;
            //} else {//12.1 Caching Tab load
               // document.getElementById("TBLPage" + tab_arr[i].id).appendChild(html);
           // }
        }
    }
     fnBindScreenElements();//REDWOOD_CHANGES
  //static header change start	
//REDWOOD_CHANGES
  /*if (g_scrType != 'L') {
	//document.getElementById("ResTree").className = "DIVTwoColLyt";
	//if (g_scrType == "M")
	document.getElementById("DIVScrContainer").className = "WNDcontent mediumwin";
	//else
	//document.getElementById("DIVScrContainer").className = "WNDcontent smallwin";
    } else {
	//document.getElementById("ResTree").className = "DIVThreeColLyt";
	document.getElementById("DIVScrContainer").className = "WNDcontent bigwin";
    }*/	   
//REDWOOD_CHANGES
  //static header change end
   //fnBuildMultipleEntryArray(); //changes for ME in Subscreen
    //mainWin.showToolbar('', '', '');
    if (xslFileName == "ExtSummary_Advanced.xsl") {
        var advTblObj = document.getElementById("TblAdvanced");
         //12.1 summary performance changes new start
        if(parent.document.getElementById("TblRcmndedQuery") != null){
		   //Fix for 21118575
           /* setInnerText(document.getElementById("lblAdvFldSet"),mainWin.getItemDesc("LBL_OPTIONAL"));
            var rcmndedTblObj = parent.document.getElementById("TblRcmndedQuery");
            var inputObj = rcmndedTblObj.getElementsByTagName("INPUT");
            
            for (var j = 0; j <inputObj.length; j++) {
                document.getElementById('idRecommendedField').options[j].text =document.getElementById('idRecommendedField').options[j].text + "("+parent.document.getElementsByName(inputObj[j].name)[0].getAttribute("MIN_CHAR")+")" ;
            }*/
        }else{
            document.getElementById("idRecommendedFieldFldSet").style.display  = "none";
//REDWOOD_CHANGES
//            document.getElementById("lblRcmndedFieldFldSet").style.display  = "none";
          //  document.getElementById("idRecommendedFieldFldSet").size  = 0;
            //document.getElementById("idSelectField").size  = 30;
        }
       // lovHtml = advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[1].innerHTML;  //revisit
        //lovHtml1 = advTblObj.getElementsByTagName("FIELDSET")[2].children[1].children[2].innerHTML;
		//12.1 summary performance changes end
//        document.getElementById("idTextFieldValue").disabled = true;
//        document.getElementById("idTextFieldValue").className = 'TXTro';
//        getNextSibling(document.getElementById("idTextFieldValue")).className = 'BTNhide';
//       // fnCalcHgt(true);
       //fnCalcHgtAdvScr();
       setTimeout(function(){fnCalcHgtSubScreen();
        addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExit_sum('" + screenName + "')");
      //  document.getElementById('BTN_EXIT').focus();
//        if (parent.screenArg["ACTION"] == "EDITQUERY") {
//            fnPopulateAdvQueryData();
//            parent.screenArg["ACTION"] = "";
//        }
       },0);	
//REDWOOD_CHANGES
//12.1 summary performance changes new end
       
        return;
    }
    
    strHeaderTabId = subScrHeaderTabId;
    strCurrentTabId = subScrBodyTabId;
    expandContentLoad(strCurrentTabId);
    //fnCalcHgtSubScreen();
    //changes for ME in Subscreen start
    for (var l = 0; l < tab_arr.length; l++) { //Static header change
        document.getElementById("TBLPage"+tab_ids[l]).style.display = "block";
     }
   // fnBuildMultipleEntryArray(); //REDWOOD_CHANGES
    for (var l = 0; l < tab_arr.length; l++) { //Static header change
     if(tab_ids[l]==strCurrentTabId)continue;
        document.getElementById("TBLPage"+tab_ids[l]).style.display = "none";
     }
     //changes for ME in Subscreen end
    fnExpandCollapseSubSys();
    addEvent(document.getElementById("WNDbuttons"), "onclick", "fnExitAll('" + screenName + "', event)");
	try {
		fnPopulateScrArgs(parent.screenArgs, screenName, funcId);
	} catch (e) {}
    debugs("gAction=", gAction);    
    if (gAction == '' || gAction == 'EXECUTEQUERY' || parent.viewMnt == true) {
		setTimeout( function(){ //REDWOOD_35357326
        if (parent.viewMnt) 
            viewMnt = true;
    
        debugs("calling showData", "");    
        showData();
        viewModeAction = true;
       // disableAllElements("INPUT"); //REDWOOD_CHANGES
	    disableAllElements("OJ-INPUT-TEXT"); //REDWOOD_35357326
        viewModeAction = false;
        fnEnableBlockCheckBox();
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
		},0); //REDWOOD_35357326
        fnDisableElement(document.getElementById('BTN_OK'));		
    } else if (gAction == 'MODIFY' || gAction == "ROLLOVER" || gAction == "LIQUIDATE") {
        if (gAction == 'MODIFY' && onceAuthObj) {
            if (onceAuthObj.value == 'Y') {
                disableForm();
                debugs("calling showData", "");    
                showData();
                fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId); //21461697
				setTimeout( function(){ //Bug_35239058_Redwood
					fnEnableAmendFields(gAction.toLowerCase());
          setTimeout( function(){ //redwood_35997951_Redwood
                disableMESVFields();//redwood_35997951
           },0); //redwood_35997951_Redwood
				},200); //Bug_35239058_Redwood //REDWOOD_36562638 

            } else {
                debugs("calling showData", "");    
                showData();
                enableForm();
                disableMESVFields();
            }
        } else {
            disableForm();
            debugs("calling showData", "");    
            showData();
            fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId); //21461697
            fnEnableAmendFields(gAction.toLowerCase());
            disableMESVFields();
        }
        fnEnableElement(document.getElementById('BTN_OK'));
        fnSetExitButton();
    } else {
        debugs("calling showData", "");    
         if (functionId != "EXTAUTHORIZE") { //REDWOOD_CHANGES
        showData();
         }	  //REDWOOD_CHANGES
        enableForm();
        disableMESVFields();
        fnSetExitButton();
    }
    
    try {
		debugs("calling fnCalcHgtSubScreen", ""); 
		setTimeout(function(){fnCalcHgtSubScreen();},0); //21232462	//REDWOOD_CHANGES
        debugs("calling fnPopulateScrArgs", ""); 
        fnPopulateScrArgs(parent.screenArgs, screenName, funcId);
        //Ashok this needs to be send as part of bellow else case. 
//REDWOOD_CHANGES
     /*   if (functionId == "EXTAUTHORIZE") {
            var texecStart = getDateObject();
            var execStartTime = (texecStart.getHours() * (3600 * 1000)) + (texecStart.getMinutes() * (60 * 1000)) + (texecStart.getSeconds() * 1000) + texecStart.getMilliseconds();
            if (!fnPostLoad_CVS_AUTHORIZE(parent.screenArgs)) {                 
                disableForm();
                fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
                //document.getElementById('BTN_EXIT_IMG').focus();
                setTimeout(function(){document.getElementById("BTN_EXIT_IMG").focus();},0);
                gAction = '';
                fnSetExitButton();
                parent.mask();
                return;
            }           
            
        } else {
            if (!fnEventsHandlerSubScreen('fnPostLoad', screenName, functionId, parent.screenArgs)) {
                disableForm();
                fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
                //document.getElementById('BTN_EXIT_IMG').focus();
                setTimeout(function(){document.getElementById("BTN_EXIT_IMG").focus();},0);
                gAction = '';
                fnSetExitButton();
                parent.mask();
                return;
            }
        }*/		
//REDWOOD_CHANGES
    } catch (e) {}
   /* if (funcId  == "EXTAUTHORIZE") {
      var texecEnd = getDateObject();
      var execEndTime = (texecEnd.getHours() * (3600 * 1000)) + (texecEnd.getMinutes() * (60 * 1000)) + (texecEnd.getSeconds() * 1000) + texecEnd.getMilliseconds();
      var dbtime = 0;
      var servertime = 0;
      var jstime = parseFloat(parseFloat(execStartTime) - parseFloat(startjsTime)) ;
      totaltime = parseFloat(parseFloat(texecEnd.getTime()) - parseFloat(inLoadTime)) ;
      startDate = new Date(parseFloat(inLoadTime));
      startTime = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate() + " " + startDate.getHours() + ':' + startDate.getMinutes() + ':' + startDate.getSeconds();
      endTime = texecEnd.getFullYear() + '-' + texecEnd.getMonth() + '-' + texecEnd.getDate() + " " + texecEnd.getHours() + ':' + texecEnd.getMinutes() + ':' + texecEnd.getSeconds();
      var executeQueryTime = mainWin.loadTimeArray[parent.seqNo];
      jstime = parseFloat(parseFloat(jstime) + parseFloat(executeQueryTime.split("~")[0]));
      dbtime = Math.round(parseFloat(parseFloat(dbtime) + parseFloat(executeQueryTime.split("~")[1])) * 100) / 100;
      servertime = Math.round(parseFloat(parseFloat(servertime) + parseFloat(executeQueryTime.split("~")[2])) * 100) / 100;
      databaseSessionID = executeQueryTime.split("~")[5];
      loginSeqNo = executeQueryTime.split("~")[6];
      actionSeqno = executeQueryTime.split("~")[7];
      mainWin.loadTimeArray[parent.seqNo] = 0;
      //fnPostActionLog(jstime, dbtime, servertime, startTime, endTime, totaltime, "", "", "", actionSeqno, databaseSessionID, loginSeqNo, parent.seqNo, "AUTHQUERY");
      //fnPopulateTimes(loginSeqNo,parent.seqNo,actionSeqno,jstime,dbtime,servertime,startTime,endTime,totaltime);
    }*/
   
    //Fix for 21531356 start
    if (getBrowser().indexOf("IE") != -1 && getIEVersionNumber() == 10) {
        document.getElementById('WNDbuttons').focus();
    }//Fix for 21531356 end
    fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
   // setTimeout(function(){ appendData();document.getElementById("BTN_EXIT_IMG").focus();},0); //REDWOOD_CHANGES
    //document.getElementById('BTN_EXIT_IMG').focus();
   // parent.mask();
}

function embeddcall(xmlDoc) {
    var xmlDOMtest1;
    var xmlDOMfile2;
    var arr2 = new Array();
    var i = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM").length;
    var fid = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM/FUNCTION").length;
    if (fid > 0) {
        for (var loopIndex = 0; loopIndex < i; loopIndex++) {
            xmlDOMtest1 = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex];
            arr2[loopIndex] = new Array();
            arr2[loopIndex]["SEQ"] = selectNodes(xmlDoc, "//FORM/SCREEN/CALLFORMS/FORM")[loopIndex].getAttribute("SEQ");
            arr2[loopIndex]["DISP_TAB"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TAB"));
            arr2[loopIndex]["DISP_TYPE"] = getNodeText(selectSingleNode(xmlDOMtest1, "DISP_TYPE"));
            arr2[loopIndex]["FUNCTION"] = getNodeText(selectSingleNode(xmlDOMtest1, "FUNCTION"));
        }
        for (var loopIndex = 0; loopIndex < arr2.length; loopIndex++) {
            if (arr2[loopIndex]["DISP_TYPE"] == 'TAB') {
                if (arr2[loopIndex]["DISP_TAB"] == "TAB_MIS" && arr2[loopIndex]["FUNCTION"] == "CMIS") {
                    if (fcjResponseDOM && selectNodes(fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']").length > 0) xmlDOMfile2 = fnModifyMISXml(arr2[loopIndex]);
                } else {
                   xmlDOMfile2 = getUIXML("UIXML/" + langCode + "/" + arr2[loopIndex]["FUNCTION"] + ".xml", screenType); //caching changes
                   // xmlDOMfile2 = loadXMLFile("UIXML/" + langCode + "/" + arr2[loopIndex]["FUNCTION"] + ".xml"); //caching changes
                }
                if (typeof (xmlDOMfile2) != "undefined") {
                    /*Fix for 19698809 Starts*/
                    if (arr2[loopIndex]["DISP_TAB"] == "TAB_UDF" && arr2[loopIndex]["FUNCTION"] == "CUDF") {
                        xmlDOMtest1 = convertWBUDFToSE(getCloneDocElement(selectSingleNode(xmlDOMfile2,  "//SCREEN/BODY/TAB[@ID = '"+arr2[loopIndex]["DISP_TAB"]+"']")));
                        var secNodes = selectNodes(xmlDOMtest1, "//SECTION");
                        for (var secCnt = 0; secCnt < secNodes.length; secCnt++) {                        
                            selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']").appendChild(getCloneDocElement(secNodes[secCnt]));
                        }
                        selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']").appendChild(xmlDOMtest1);
                    }else{
                        var secNodes = selectNodes(xmlDOMfile2, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']/SECTION");
                        for (var secCnt = 0; secCnt < secNodes.length; secCnt++) {                        
                            selectSingleNode(xmlDoc, "//SCREEN/BODY/TAB[@ID = '" + arr2[loopIndex]["DISP_TAB"] + "']").appendChild(getCloneDocElement(secNodes[secCnt]));
                        }
                    }
                    /*Fix for 19698809 Ends*/
                }
            }
        }
    }
    return xmlDoc;
}

function fnModifyMISXml(arrMIS) {
    var currXml = loadXMLFile("UIXML/" + langCode + "/" + arrMIS["FUNCTION"] + ".xml");
    var partNodes = selectNodes(currXml, "//PART");
    var recMIS = getNodeText(selectSingleNode(fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']/FV")).split("~");
    for (var i = 0; i < partNodes.length - 2; i++) {
        var fldNodes = selectNodes(partNodes[i + 2], "FLDSET/FIELD");
        for (var j = 0; j < fldNodes.length; j++) {
            setNodeText(selectSingleNode(fldNodes[j], "LBL"), recMIS[i * fldNodes.length + j]);
        }
    }
    return currXml;
}

var gCalBtn = null;
var gCalDSODate = null;

function disp_cal(idDate, e) {
    var event = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
   // if (!mainWin.isSessionActive()) return; session expiry change 
    var currUser = mainWin.UserId;
    gCalBtn = getEventSourceElement(event);

    if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
    } else {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
    }
    var currentBranch = mainWin.CurrentBranch;
//    //Bug No 25153773 Changes Start
//    var hostDate = mainWin.currHostDate;
//    if (hostDate != null &&  hostDate != "") 
//    {
//            var date = hostDate;	
//    }
//      //Bug No 25153773 Changes End
			    
//    /else 
    if(typeof(g_txnBranch) != "undefined" && g_txnBranch != "" ){ //Fix for 24686375
     var date = mainWin.txnBranch[g_txnBranch].AppDate;
    }else {
    var date = mainWin.AppDate;
    }
    var nCurrYear = null;
    var nCurrMonth = null;
    var nCurrDay = null;
//    if (date && date != '' && date && (date != ''))    //Bug No 25153773 Changes Start
//    {
//        var curDate = date;
//        if (gDateFormatDSO == "yyyy-MM-dd")
//        {
//            nCurrYear = curDate.substr(0, 4);
//            nCurrMonth = curDate.substr(5, 2);
//            nCurrDay  = curDate.substr(8, 2);
//        } 
//        else 
//        {
//            nCurrYear = curDate.substr(0, 4);
//            nCurrMonth = curDate.substr(4, 2);
//            nCurrDay  = curDate.substr(7, 2);
//        }
//    
//    }   //Bug No 25153773 Changes Ends
			    
   // else 
      if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != '')) {
        var curDate = gCalDSODate.value;
        if (gDateFormatDSO == "yyyy-MM-dd") {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(5, 2);
//            nCurrDay  = curDate.substr(8, 2);//Bug No 25174018 Changes
        } else {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(4, 2);
//            nCurrDay  = curDate.substr(7, 2); //Bug No 25174018 Changes
        }
    } else {
        var l_date = date.split("-");
        nCurrYear = l_date[0];
        if (parseInt(nCurrYear) < 1000) parseInt(nCurrYear) += 1900;
        nCurrMonth = l_date[1];
//        nCurrDay = l_date[2] //Bug No 25174018 Changes
    }
    var l_Params = "&Year=" + nCurrYear;
    l_Params += "&Month=" + nCurrMonth;
   // l_Params += "&Day=" + nCurrDay;     //Bug No 25153773 Changes
//     l_Params += "&Day=" + nCurrDay;     //Bug No 25174018 Changes
    l_Params += "&Brn=" + currentBranch;
    l_Params += "&currUser=" + currUser;
    if(typeof(functionId) != "undefined" ){
    l_Params += "&functionId=" + functionId;
    }
    //32572997 starts
    //l_Params += "&txnBranch=" + g_txnBranch;
    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }//32572997 ends
    l_Params += "&txnBranchDate=" + date;
    mask();
    loadSubScreenDIV("ChildWin", "ExtCalendar.jsp?" + l_Params);
}

function disp_cal_sum(idDate, e) {//Summary save - calendar changes
    var event = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var currUser = mainWin.UserId;
    gCalBtn = getEventSourceElement(event);

    if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
    } else {
        gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
    }
    var currentBranch = mainWin.CurrentBranch;
    if(typeof(g_txnBranch) != "undefined" && g_txnBranch != "" ){ //Fix for 24686375
     var date = mainWin.txnBranch[g_txnBranch].AppDate;
    }else {
    var date = mainWin.AppDate;
    }
    var nCurrYear = null;
    var nCurrMonth = null;
      if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != '')) {
        var curDate = gCalDSODate.value;
        if (gDateFormatDSO == "yyyy-MM-dd") {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(5, 2);
        } else {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(4, 2);
        }
    } else {
        var l_date = date.split("-");
        nCurrYear = l_date[0];
        if (parseInt(nCurrYear) < 1000) parseInt(nCurrYear) += 1900;
        nCurrMonth = l_date[1];
    }
    var l_Params = "&Year=" + nCurrYear;
    l_Params += "&Month=" + nCurrMonth;
    l_Params += "&Brn=" + currentBranch;
    l_Params += "&currUser=" + currUser;
    if(typeof(functionId) != "undefined" ){
    l_Params += "&functionId=" + functionId;
    }
    l_Params += "&txnBranch=" + g_txnBranch;
    l_Params += "&txnBranchDate=" + date;
    mask();
    loadSubScreenDIV("ChildWin", "ExtCalendarSum.jsp?" + l_Params);
}

//LOV specific variables Start
var bindFldsStr = "";
var returnFlds = "";
var recordNum = 0;
var lovSrcElem;
var lovBlockObj;
var redValue = ""; //for Auto LOV
var isLovOpen = false;
var strLov = "LOV_ACCOUNT_WORKFLOW_OFFLINE~LOV_BRANCH_CUSTOMER_OFFLINE~LOV_ACCOUNT_CUSTOMER_OFFLINE~LOV_CIFID_CUSTOMER_OFFLINE~LOV_CHANGE_BRANCH_CODE~LOV_TASK_COPY~LOV_CHANGE_MODULE_CODE~LOV_CHANGE_BRANCH_SESSION~LOV_DC_CHANGE_BRANCH_SESSION~LOV_CHANGE_DEPT_CODE~LOV_USRID_PREFERENCES~LOV_HOMEBRN_PREFERENCES~LOV_CIFID_CUSTOMER~LOV_BRANCHSEARCH_MAKERID~LOV_BRANCH_CUSTOMER~LOV_ACCOUNT_CUSTOMER~LOV_ACCOUNT_WORKFLOW~LOV_REASON~LOV_RESN~LOV_FILTER~LOV_PID~LOV_PID_OFFLINE~LOV_MULTI_CCY_AC_NO~LOV_FORWARD_TO~LOV_ENTITY";//12.1 Changes //fix for bug: 19060316   //SMSStandalone12.3 Changes
//[SITECODE: JCPE2 ,INTERNAL, MakerId Changes] added LOV_BRANCHSEARCH_MAKERID in strlov
//LOV specific variables End
function handleChkBoxBindVar(bindString, bindObj) {
    if (bindObj.getAttribute("ON")) {
        if (bindObj.value) bindString = bindString + bindObj.getAttribute("ON") + "~"; //REDWOOD_CHANGES
        else bindString = bindString + bindObj.getAttribute("OFF") + "~";
    } else {
        if (bindObj.value) bindString = bindString + "Y" + "~";	 //REDWOOD_CHANGES
        else bindString = bindString + "N" + "~";
    }
    return bindString;
}

function handleRadioBindVar(bindString, bindObj) {
    for (var i = 0; i < bindObj.length; i++) {
        if (bindObj[i].value) {	 //REDWOOD_CHANGES
            bindString = bindString + bindObj[i].value + "~";
            break;
        }
    }
    return bindString;
}

function getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView) {
    if (getElementsByOjName(bindFldName).length > 1) { //REDWOOD_CHANGES
        var bndRowNo = dbIndexArray[bindFldBlkName] - 1;
//REDWOOD_CHANGES
        //if (getElementsByOjName(bindFldName,null,bindFldBlkName,bndRowNo)[0].getAttribute('type').toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName,null,bindFldBlkName,bndRowNo)[0]); //OJET CHANGES
		if (getElementsByOjName(bindFldName)[0].tagName.toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName)[0]);//REDWOOD_35129997
        //else if (document.getElementsByName(bindFldName)[bndRowNo].type.toUpperCase() == "OJ-RADIOSET") bindFldsStr = handleRadioBindVar(bindFldsStr, document.getElementsByName(bindFldName));
		else if (getOuterHTML(document.getElementsByName(bindFldName)[0]).indexOf("displayDate") > 0) bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,null,bindFldBlkName,bndRowNo)[0].value + "###DATE"+"|"; //Bug_31534120 //OJET CHANGES
        else{
			 if(getTableObjForBlock(bindFldBlkName)!=null)//redwood_36190964
				bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,null,bindFldBlkName,bndRowNo)[0].value + "|";/* security fixes for WF */
			else //redwood_36190964
				bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName)[0].value + "|";/* security fixes for WF *///redwood_36190964
			}
//REDWOOD_CHANGES
    } else {
        if (typeof (document.getElementsByName(bindFldName)[0]) != "undefined") {
//REDWOOD_CHANGES
           // if (getElementsByOjName(bindFldName)[0].getAttribute('type').toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName)[0]);
              if (getElementsByOjName(bindFldName)[0].tagName.toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName)[0]);//REDWOOD_35129997
            //else if (document.getElementsByName(bindFldName)[0].type.toUpperCase() == "OJ-RADIOSET") handleRadioBindVar(bindFldsStr, document.getElementsByName(bindFldName));
			//else if (getOuterHTML(getElementsByOjName(bindFldName)[0]).indexOf("displayDate") > 0)//REDWOOD_35096240
 			else if (getElementsByOjName(bindFldName)[0].tagName.toUpperCase() == "OJ-INPUT-DATE" && getOuterHTML(getElementsByOjName(bindFldName)[0]).indexOf("displayDate") != 0 ) 
            {bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName)[0].value + "###DATE"+"|"; } //Bug_31534120 // REDWOOD_35096240
            else bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName)[0].value + "|";/* security fixes for WF */
//REDWOOD_CHANGES
        } else {
            if (getElementsByOjName(bindFldName, parent ).length > 1) { //REDWOOD_CHANGES
                var rowNo = dbIndexArray[bindFldBlkName] - 1;
//REDWOOD_CHANGES
			if(rowNo!='NAN'){//Redwood_37129372
                if (getElementsByOjName(bindFldName,parent,bindFldBlkName,rowNo)[0].getAttribute('type').toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName,parent,bindFldBlkName,rowNo)[0]); //OJET CHANGES
                //else if (parent.document.getElementsByName(bindFldName)[rowNo].type.toUpperCase() == "OJ-RADIOSET") bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
				else if (getOuterHTML(getElementsByOjName(bindFldName,parent,bindFldBlkName,rowNo)[0]).indexOf("displayDate") > 0) bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent,bindFldBlkName,rowNo)[0].value + "###DATE"+"|"; //Bug_31534120 //OJET CHANGES
                else bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent,bindFldBlkName,rowNo)[0].value + "|";/* security fixes for WF */
//REDWOOD_CHANGES
			} //Redwood_37129372
            } else {
                if (singleView == "true") {	   
//REDWOOD_CHANGES
				  if (getElementsByOjName(bindFldName,parent)[0].getAttribute('type')!=null){	//Redwood_37129372
				   if (getElementsByOjName(bindFldName,parent)[0].getAttribute('type').toUpperCase() == "OJ-SWITCH") bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName,parent)[0]);
				  }//Redwood_37129372
                    //else if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "OJ-RADIOSET") bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
					else if (getOuterHTML(getElementsByOjName(bindFldName,parent)[0]).indexOf("displayDate") > 0)  bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent)[0].value + "###DATE"+"|";//Bug_31534120
                    else bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent)[0].value + "|";/* security fixes for WF */
//REDWOOD_CHANGES
                } else {	
//REDWOOD_CHANGES
                    //if (getElementsByOjName(bindFldName,parent)[0].getAttribute('type').toUpperCase() == "OJ-SWITCH")//REDWOOD_35268666-Commented
                    if (getElementsByOjName(bindFldName,parent)[0].tagName.toUpperCase() == "OJ-SWITCH") //REDWOOD_35268666
                    bindFldsStr = handleChkBoxBindVar(bindFldsStr, getElementsByOjName(bindFldName,parent)[0]);
                    //else if (parent.document.getElementsByName(bindFldName)[0].type.toUpperCase() == "OJ-RADIOSET") bindFldsStr = handleRadioBindVar(bindFldsStr, parent.document.getElementsByName(bindFldName));
					else if (getOuterHTML(getElementsByOjName(bindFldName,parent)[0]).indexOf("displayDate") > 0)  bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent)[0].value + "###DATE"+"|";//Bug_31534120
                    else bindFldsStr = bindFldsStr + getElementsByOjName(bindFldName,parent)[0].value + "|";/* security fixes for WF */
//REDWOOD_CHANGES
                }
            }
        }
    }
    return bindFldsStr;
}
/* Changes for AUTO_LOV, autoRedCriteria parameter has been added*/
function disp_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, autoRedCriteria, e) {  
   if((typeof(callformTabArray) != "undefined") && typeof(callformTabArray[strScreenName + "__" +strCurrentTabId]) != "undefined") containerId = callformTabArray[strScreenName + "__" +strCurrentTabId];//12.2 callform change
    var t = getDateObject();
    var inTime= t.getTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (isLovOpen) return false;
    lovScreenArgs = new Array();//12.0.2 SFR#17194334
    if (typeof (scrChild) != "undefined" && scrChild == "Y") {
	    //Fix for 19636394
        if (thirdChar != "S") {		
            //containerId = parentFunction.substring(2, 0) + "S" + parentFunction.substring(3, parentFunction.length)
        //} else {
            containerId = parentFunction;
        }
    }
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);	 
   var redVal = srcElem.value; //redwood_35254128  added
//REDWOOD_CHANGES
    if (srcElem.tagName && srcElem.tagName.toUpperCase() == 'OJ-BUTTON'){ //OJET  Migration ; only for OJ-INPUT-NUMBER LOV
        var prevElem = getPreviousSibling(srcElem);
        if(prevElem && (prevElem.tagName.toUpperCase() == 'OJ-INPUT-NUMBER' || prevElem.tagName.toUpperCase() == 'OJ-TEXT-AREA')){
            srcElem = prevElem;
        }
    }
    
    while (srcElem.tagName && srcElem.tagName.toUpperCase() != 'OJ-INPUT-TEXT' && srcElem.tagName.toUpperCase() != 'OJ-INPUT-NUMBER' && srcElem.tagName.toUpperCase() != 'OJ-TEXT-AREA'){

        srcElem = srcElem.parentNode;
            }		 
//REDWOOD_CHANGES
            lovSrcElem = srcElem;  
//REDWOOD_CHANGES
//    if (srcElem.parentNode && srcElem.parentNode.tagName.toUpperCase() == 'BUTTON') {
//        lovSrcElem = getPreviousSibling(srcElem.parentNode);
//    } else {
//        if (srcElem.tagName.toUpperCase() == 'BUTTON') {
//            if (getPreviousSibling(srcElem)) {
//                lovSrcElem = getPreviousSibling(srcElem);
//            } else {
//                lovSrcElem = srcElem;
//            }
//        } else { //AutoLOV Case
//            lovSrcElem = srcElem;
//        }
//    }
//    if (lovSrcElem == null) lovSrcElem = srcElem;	 
//REDWOOD_CHANGES
    var isME = "false";
    var singleView = "false";
    var maximize=""; /*fix for bug# 19619967*/
    var customLov = "N";
    if ((containerId == "COMMON" || containerId == "SMCHGBRN") && strLov.indexOf(lovId) != -1) {   
        disp_custom_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo);
        return;
    }
    //if (!fnEventsHandler('fnPreDispLov_' + lovId, lovSrcElem)) return false; //Fix for 17040616 //Commented as part of 9NT1606_14_0_RETRO_12_3_27342859
    //12.0.2 SFR#17194334 start
    if ((lovScreenArgs['title'] != '') && (typeof(lovScreenArgs['title']) != "undefined")){
      title = lovScreenArgs['title'];
    }
    //12.0.2 SFR#17194334 end
    appendData();
   // if (!mainWin.isSessionActive()) return; session expiry change 
    var lovType = 'Y';
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) {
isME = isMultipleEntry(blockId); /*12.0.4 UI performance changes starts */
        if(isME=='true') {
            recordNum = getRowIndex(e) - 1;
            lovBlockObj = getTableObjForBlock(blockId);
            if (recordNum >= 0) fnMulipleEntryRow_onClick(event);
        }   /*12.0.4 UI performance changes ends */
       /* for (var i = 0; i < multipleEntryIDs.length; i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                if (recordNum >= 0) fnMulipleEntryRow_onClick(event);
                break;
            }
        }*/
    }
    if (!fnEventsHandler('fnPreDispLov_' + lovId, lovSrcElem)) return false; //Fix for 17040616 //9NT1606_14_0_RETRO_12_3_27342859 added	
    if (recordNum < 0) recordNum = 0;
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("VIEW")) { //REDWOOD_35307988 
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("VIEW") == "SE") { //REDWOOD_35307988 
            isME = "false";
            recordNum = 0;
        }
    }
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
        singleView = "true";
        recordNum = 0;
    }
    if (functionId == "CSCFNUDF") {
        if (blockId == "BLK_UDF_DETAILS_VIEW") {
			/*Fix for 14627783 */
            //udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='"+(Number(fieldName.substring(fieldName.length-1)) + 1) +"']/FLDNAM"));
            var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FLDNAM"));       
			/*Fix for 14627783 */
			//Udf fld desc change
            fieldNameDesc = fieldName.substring(0,fieldName.length-udfFldLength)+'DESC'+udfNo;
            //retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
           // lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~"; /*12.0.4 UI performance changes */
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1] = lovInfoFlds["BLK_UDF_DETAILS__FLDVAL__" + lovId][1];/*12.0.4 UI performance changes */
            lovKey = blockId + "__" + fieldName + "__" + lovId ;
            lovRet = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            lovBnd = lovInfoFlds["BLK_UDF_DETAILS__FLDVAL__" + lovId][1];
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
            //bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_UDF_DETAILS__FLDVAL__" + lovId];
            //Udf fld desc change
            
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        } else udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + dbIndexArray["BLK_UDF_DETAILS"] + "']/FLDNAM"));
        //12.0.2 udf changes for CSCTRUDF start
    //} else if (functionId == "CSCTRUDF" || functionId =='PXCTRUDF') { //FCUBS_12.3Payments_UDF_Changes  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430 commenting
	} else if (functionId == "CSCTRUDF") {  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
       // udfLovId = document.getElementsByName("FLDNAME")[recordNum].value;
        if (blockId == "BLK_UDF_DETAILS_VIEW") {
			/*Fix for 14627783 */
            //udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='"+(Number(fieldName.substring(fieldName.length-1)) + 1) +"']/FLDNAM"));
            var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_TXN_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FLDNAME")); //Fix for 17040414      
			/*Fix for 14627783 */
			 //Udf fld desc change
            fieldNameDesc = fieldName.substring(0,fieldName.length-udfFldLength)+'DESC'+udfNo;
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";/*12.0.4 UI performance changes */
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1] = lovInfoFlds["BLK_TXN_UDF_DETAILS__FLDVAL__" + lovId][1];/*12.0.4 UI performance changes */
            
            lovKey = blockId + "__" + fieldName + "__" + lovId ;
            lovRet = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            lovBnd = lovInfoFlds["BLK_TXN_UDF_DETAILS__FLDVAL__" + lovId][1];
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
            
            //retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            
            //bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_TXN_UDF_DETAILS__FLDVAL__" + lovId];
            //Udf fld desc change
            
            dbIndexArray["BLK_TXN_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        } else udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_TXN_UDF_DETAILS[@ID='" + dbIndexArray["BLK_TXN_UDF_DETAILS"] + "']/FLDNAME"));//Fix for 17040414
    }
    //12.0.2 udf changes for CSCTRUDF end 
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") { //Fix for bug 18872795 - added check for branch cube entity in UDF //9NT1606_12_2_RETRO_12_1_23664151 changes 
        /*Fix for 19698809 Starts*/
        if(blockId == "BLK_UDF_DETAILS_VIEW") {
            var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FIELD_NAME"));     
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6))+1;
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0] = blockId + "__" + fieldName + "~" + blockId + "__FIELD_DESC" + Number(fieldName.substring(6)) + "~";
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1] = lovInfoFlds["BLK_UDF_DETAILS__FIELD_VALUE__"+lovId][1];			
            lovKey = blockId + "__" + fieldName + "__" + lovId;
            lovRet = blockId + "__" + fieldName + "~" + blockId + "__FIELD_DESC" + Number(fieldName.substring(6)) + "~";
            lovBnd = lovInfoFlds["BLK_UDF_DETAILS__FIELD_VALUE__"+lovId][1];
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
        } 
		/*Fix for 19698809 Ends*/
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }
    //Fix for 17040616	start
    if((typeof(lovScreenArgs["CUBE_ENTITY"]) != "undefined") && (lovScreenArgs["CUBE_ENTITY"] = true)){
      var tempLovId= "";
       if (udfLovId != "") {
          tempLovId = udfLovId + "-LOV_CUBEENTITY";
       }
       else{
          tempLovId = lovId + "-LOV_CUBEENTITY";
       }
	   tempLovId = replaceAllChar(tempLovId,"#","_HASH_"); //9NT1606_12_3_RETRO_12_0_3_25402719 changes 
    }
     //Fix for 17040616	end
     FieldLabel = replaceAllChar(FieldLabel,"/","_SLH_");//Fix for 19412812 
	 //Fix for 22973701 starts
    FieldLabel = replaceAllChar(FieldLabel,"#","_HASH_");
    title = replaceAllChar(title,"#","_HASH_");
    //Fix for 22973701 ends
    /*fix for bug# 19619967 start*/
    if (typeof(lovMax)!="undefined" && typeof(lovMax[blockId + "__" + fieldName + "__" + lovId])!="undefined" && lovMax[blockId + "__" + fieldName + "__" + lovId] == "Y") {
        maximize = "Y";
    }
	 /*fix for bug# 19619967 end*/
   
   if(lovSrcElem.getAttribute("CUSTOMLOV")){
     customLov = lovSrcElem.getAttribute("CUSTOMLOV");
   }
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
   /* Fix for 17040616 start
   if (udfLovId != "") l_Params += "&lovId=" + udfLovId;
    else l_Params += "&lovId=" + lovId;
    */
    if(tempLovId != undefined)l_Params += "&lovId=" + tempLovId;
    else l_Params += "&lovId=" + lovId;
     //Fix for 17040616 end
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;
    l_Params += "&maximize=" + maximize;/*fix for bug# 19619967*/
    l_Params += "&customLov=" + customLov;

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
         l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined" && autoRedCriteria != "") {
        redValue = autoRedCriteria;
    } else { /**/
        /*Fix for 17888581 Starts*/
        if (getOuterHTML(lovSrcElem).indexOf("validateInputDate") > 0 ){
          redValue = getPreviousSibling(getPreviousSibling(lovSrcElem)).value
        }else{
        //redwood_35254128 Starts
          if (redVal!="" && redVal!=undefined){ //redwood_35354040 added undefined condition
              redValue = redVal; 
          }else{ 
           //redwood_35254128 Starts
          redValue = lovSrcElem.value;
        } //redwood_35254128 Starts
        }
        /*Fix for 17888581 Ends*/
        //redValue = "";
    }
	if(typeof (redValue) != "undefined" && redValue != null && redValue != ""){ //Fix for 18234116 start
        redValue = replaceAllChar(redValue, "/", "_SLH_");
		//REDWOOD_35691870 start
		redValue = replaceAllChar(redValue,  "#", "_HASH_");
        redValue = replaceAllChar(redValue,  "&", "_AMP_");
        redValue = replaceAllChar(redValue,  ",", "_COMMA_");
		redValue = replaceAllChar(redValue,  "(", "_OPARAN_");
		redValue = replaceAllChar(redValue,  ")", "_CPARAN_");
		redValue = replaceAllChar(redValue,  "+", "_PLUS_");
		//REDWOOD_35691870 end
    } //Fix for 18234116 end
    l_Params += "&rednFldval=" + redValue;
  
    if (blockId != '') {
        //returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
        //if(typeof(lovInfoFlds[blockId + "__" + fieldName + "__" + lovId])=="undefined")lovInfoFlds[blockId + "__" + fieldName + "__" + lovId]={};
        if(customLov == 'Y' && typeof(fromAdvanced)!='undefined' && fromAdvanced == 'true'){
           returnFlds = lovInfoFlds[lovId][0];
        }else{
          returnFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0]; /*12.0.4 UI performance changes */
        }
		
		var bindFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");/*12.0.4 UI performance changes */
		
        //var bindFlds = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0; i < bindFlds.length; i++) {
				if (bindFlds[i] != "") {// Redwood_37129372
					var bindStr = bindFlds[i].split("!");
					var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
					var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
					if (dbDataDOM != null && selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
						//bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~"; security fixes for WF 
						/*Bug_31534120 Starts*/
						if(bindStr[1] != 'DATE')
						bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
						else
							bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "###DATE"+"|";
						/*Bug_31534120 Ends*/
					} else {
						bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
					}
				}
			}//Redwood_37129372
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    } else {
        returnFlds = lovInfoFlds[lovId][0]; /*12.0.4 UI performance changes */
        //returnFlds = retflds[lovId];
    }
    
     //SFR:17439180 : Fixes for 17176008 starts
    if (typeof(bindFldsStr) != "undefined" &&bindFldsStr != null && bindFldsStr!="") {
        var tempBindFldStr = replaceAllChar(bindFldsStr, "/", "_SLH_");
        tempBindFldStr = replaceAllChar(tempBindFldStr,  "#", "_HASH_");//Fix for 17378652
        tempBindFldStr = replaceAllChar(tempBindFldStr,  "&", "_AMP_"); //Fix for 18260737
        tempBindFldStr = replaceAllChar(tempBindFldStr, ",", "_COMMA_");//Fix for 19274447
		//9NT1606_12_4_RETRO_12_0_3_26861671 Starts
		tempBindFldStr = replaceAllChar(tempBindFldStr, "(", "_OPARAN_");
		tempBindFldStr = replaceAllChar(tempBindFldStr, ")", "_CPARAN_");
		tempBindFldStr = replaceAllChar(tempBindFldStr, "+", "_PLUS_");
		//9NT1606_12_4_RETRO_12_0_3_26861671 Ends
        l_Params += "&bindFldsStr=" + tempBindFldStr;
    }
    else{
    l_Params += "&bindFldsStr=" + bindFldsStr;/* security fixes for WF */
    }
     //SFR:17439180 : Fixes for 17176008 ends
    isLovOpen = true
    l_Params += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    //l_Params += "&seqNo=" + getSeqNo();//Logging changes
    l_Params += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
    l_Params += "&inTime=" + inTime;
    l_Params += "&LOVCALL=" +mainWin.DebugWindowFlg; //External Lov Changes
    
    //mask();  //REDWOOD_CHANGES
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    fnEventsHandler('fnPostDispLov_' + lovId);
    
}

function disp_custom_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo) {
if((typeof(callformTabArray) != "undefined") && typeof(callformTabArray[strScreenName + "__" +strCurrentTabId]) != "undefined") containerId = callformTabArray[strScreenName + "__" +strCurrentTabId];//12.2 callform change
var lovType = 'Y';
    var screentype = 'M';
    recordNum = 0;
    bindFldsStr = "";
    showChgBrnLOV = true;
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    if((mainWin.brnHostLinkStatus == "OFFLINE") && (lovId == "LOV_ACCOUNT_CUSTOMER_OFFLINE" || lovId == "LOV_BRANCH_CUSTOMER_OFFLINE" || lovId == "LOV_CIFID_CUSTOMER_OFFLINE"|| lovId == "LOV_ACCOUNT_WORKFLOW_OFFLINE" )){
      lovType = 'N';
      screentype = 'WB';
    }
FieldLabel = replaceAllChar(FieldLabel,"/","_SLH_");//Fix for 19412812 
//Fix for 22973701 starts
    FieldLabel = replaceAllChar(FieldLabel,"#","_HASH_");
    title = replaceAllChar(title,"#","_HASH_");
    //Fix for 22973701 ends
    /*fix for bug# 19619967 start*/
    var maximize="";
     if (typeof(lovMax)!="undefined" && typeof(lovMax[blockId + "__" + fieldName + "__" + lovId])!="undefined" && lovMax[blockId + "__" + fieldName + "__" + lovId] == "Y") {
        maximize = "Y";
    }
	 /*fix for bug# 19619967 end*/
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screentype;
    l_Params += "&lovType=" + lovType;
    l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    l_Params += "&isME=" + "false";
    l_Params += "&singleView=" + "false";
    l_Params += "&maximize=" + maximize;/*fix for bug# 19619967*/
    l_Params += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
  
    if (typeof (istxnBrn) != 'undefined')
       l_Params += "&istxnBrn=" + istxnBrn;
    else 
       l_Params += "&istxnBrn=" + "false";
    if (blockId != '') {
        if (typeof (lovInfoFlds) != 'undefined') {//*12.0.4 UI performance changes */
            returnFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0];/*12.0.4 UI performance changes */
            bindFldsStr = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");/*12.0.4 UI performance changes */
            //returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
            //bindFldsStr = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        } else {
            //var retflds = new Array();
            //var bndFlds = new Array();
            
                var lovInfoFlds = {"BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE":["BRANCH_CODE~",""]}; /*12.0.4 UI performance changes */
                //retflds["BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE"] = "BRANCH_CODE~";
                //bndFlds["BLK_BRANCH__BRANCH_CODE__LOV_CHANGE_BRANCH_CODE"] = "";
                 //FCUBS_12.0_PS_01 Starts 
		if(containerId=="SMCHGBRN" && lovId=="LOV_TASK_COPY")
    		{
		 //retflds["BLK_BRANCH__STAGE__LOV_TASK_COPY"]="BLK_BRANCH__STAGE~";		
      		 //bndFlds["BLK_BRANCH__STAGE__LOV_TASK_COPY"]= mainWin.document.getElementById('BLK_BRANCH__STAGE').value;
                 //lovInfoFlds["BLK_BRANCH__STAGE__LOV_TASK_COPY"]=["BLK_BRANCH__STAGE~","mainWin.document.getElementById('BLK_BRANCH__STAGE').value"];	/*12.0.4 UI performance changes */
                 lovInfoFlds["BLK_BRANCH__STAGE__LOV_TASK_COPY"]=["BLK_BRANCH__STAGE~",mainWin.document.getElementById('BLK_BRANCH__STAGE').value];
	    	}
	    //FCUBS_12.0_PS_01 Ends		
		//12.0.2 Changes Starts
		if(containerId=="COMMON" && lovId=="LOV_REASON")
    		{
			//retflds["BLK_COMMENTS__REASON_CODE__LOV_REASON"]="REASON_CODE~";		
			//bndFlds["BLK_COMMENTS__REASON_CODE__LOV_REASON"]= "";
                        lovInfoFlds["BLK_COMMENTS__REASON_CODE__LOV_REASON"]=["REASON_CODE~",""];	/*12.0.4 UI performance changes */
			
		}
                if(containerId=="COMMON" && lovId=="LOV_FORWARD_TO")	//12.1 Retro_Changes Starts
    		{
                    //lovInfoFlds["BLK_COMMENTS__REASON_CODE__LOV_REASON"]=["FWD_USER_ID~",""];	/*12.0.4 UI performance changes */
                    lovInfoFlds["BLK_REMINDER__FWD_USER_ID__LOV_FORWARD_TO"]=["FWD_USER_ID~",""];	/*12.0.4 UI performance changes */
		}  //12.1 Retro_Changes Ends
		if(containerId=="COMMON" && lovId=="LOV_RESN")
    		{
                	lovInfoFlds["BLK_COMMENTS__REASON_CODE__LOV_RESN"]=["REASON_CODE~",parent.document.getElementById('BLK_APPLICATION_DETAILS__NEWSTAT').value+"|"+parent.document.getElementById('BLK_APPLICATION_DETAILS__BRN').value];		/*12.0.4 UI performance changes */
                        //retflds["BLK_COMMENTS__REASON_CODE__LOV_RESN"]="REASON_CODE~";		
			//bndFlds["BLK_COMMENTS__REASON_CODE__LOV_RESN"] = parent.document.getElementById('BLK_APPLICATION_DETAILS__NEWSTAT').value+"|"+parent.document.getElementById('BLK_APPLICATION_DETAILS__BRN').value; //SFR#17299223
		}
		if(containerId=="COMMON" && lovId=="LOV_FILTER")
    		{
			//retflds["BLK_FILTER__FILTER_ID__LOV_FILTER"]="BLK_FILTER__FILTER_ID~BLK_FILTER__FILTER_DESC~";		
			//bndFlds["BLK_FILTER__FILTER_ID__LOV_FILTER"]= "";
                        lovInfoFlds={"BLK_FILTER__FILTER_ID__LOV_FILTER":["BLK_FILTER__FILTER_ID~BLK_FILTER__FILTER_DESC~",""]};/*12.0.4 UI performance changes */
		}
		//12.0.2 Changes Ends
    /*12.0.4 UI performance changes starts*/
            lovInfoFlds["USERSEARCH__USRID__LOV_USRID_PREFERENCES"] = ["UserId~",""];
            lovInfoFlds["USERSEARCH__HOME_BRN__LOV_HOMEBRN_PREFERENCES"] = ["HomeBrn~",""];
            lovInfoFlds["CUSTSEARCH__CIF_ID__LOV_CIFID_CUSTOMER"] = ["CFid~",""];
            lovInfoFlds["CUSTSEARCH__BRANCH__LOV_BRANCH_CUSTOMER"] = ["CustBrn~",""];
            lovInfoFlds["CUSTSEARCH__CustAccountNo__LOV_ACCOUNT_CUSTOMER_OFFLINE"] = ["CustAccountNo~",""];//DC offline LOV
            lovInfoFlds["CUSTSEARCH__CIF_ID__LOV_CIFID_CUSTOMER_OFFLINE"] = ["CFid~",""];
            lovInfoFlds["CUSTSEARCH__BRANCH__LOV_BRANCH_CUSTOMER_OFFLINE"] = ["CustBrn~",""];
            lovInfoFlds["WorkflowSearch__BRANCH__LOV_BRANCH_CUSTOMER_OFFLINE"] = ["BRANCH~",""];
            lovInfoFlds["WorkflowSearch__ACCOUNT__LOV_ACCOUNT_WORKFLOW_OFFLINE"] = ["ACCOUNT~",""];
            lovInfoFlds["CUSTSEARCH__CustAccountNo__LOV_ACCOUNT_CUSTOMER"] = ["CustAccountNo~",""];
			//fix for bug: 19060316 starts 
            if(mainWin.applicationExt == "JP") {
				lovInfoFlds["CUSTSEARCH__PID__LOV_PID"] = ["Pid~",""];
				lovInfoFlds["CUSTSEARCH__PID__LOV_PID_OFFLINE"] = ["Pid~",""];
				lovInfoFlds["CUSTSEARCH__PID__LOV_CUST_PID"] = ["Pid~","Pid"];
				lovInfoFlds["CUSTSEARCH__MultiCurrAccNo__LOV_MULTI_CCY_AC_NO"] = ["MultiCurrAccNo~",""];
            }
             //fix for bug: 19060316 ends
		
            //SMSStandalone12.3 Changes starts
            lovInfoFlds["BLK_ENTITY_DETAILS__ENTITY_ID__LOV_ENTITY"]=["BLK_ENTITY_DETAILS__ENTITY_ID~BLK_ENTITY_DETAILS__ENTITY_DESCRIPTION~",""];
           //SMSStandalone12.3 Changes ends	 
			  
			
			
			//Added for FCIS change starts
            lovInfoFlds["BLK_MODULE__MODULE_CODE__LOV_CHANGE_MODULE_CODE"]=["BLK_MODULE__MODULE_CODE~~~~",""];
             //// Added for FCIS change ends
            lovInfoFlds["WorkflowSearch__BRANCH__LOV_BRANCH_CUSTOMER"] = ["BRANCH~",""];
            lovInfoFlds["WorkflowSearch__ACCOUNT__LOV_ACCOUNT_WORKFLOW"] = ["ACCOUNT~",""];
			lovInfoFlds["WorkflowSearch__MAKERID__LOV_BRANCHSEARCH_MAKERID"] = ["MAKERID~",""];
			//[SITECODE: JCPE2 ,INTERNAL, MakerId Changes]
            returnFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0];
            bindFldsStr = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");
			//SFR#18417732 starts
			if(containerId=="COMMON" && lovId=="LOV_RESN")
    		  {
				//bindFldsStr = bndFlds[blockId + "__" + fieldName + "__" + lovId];
        bindFldsStr = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1];
			  }
			  //SFR#18417732 ends
        }
    } else {
        if (typeof (retflds) != 'undefined') {
            returnFlds = lovInfoFlds[lovId][0];
        }else{
             var retflds = new Array();
             var lovInfoFlds = {};
              if(brnidentifier=='Y') {
                  lovInfoFlds["LOV_CHANGE_BRANCH_SESSION"] = ['BRANCH_CODE~'];
                  returnFlds = lovInfoFlds[lovId][0];
                  retVal[0] = ''
                //retflds["LOV_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
                //returnFlds = retflds[lovId];
                //retVal[0] = '';
                
             }else{
                lovInfoFlds["LOV_DC_CHANGE_BRANCH_SESSION"] = ['BRANCH_CODE~'];
                returnFlds = lovInfoFlds[lovId][0];
                retVal[0] = ''
/*12.0.4 UI performance changes ends*/
//                retflds["LOV_DC_CHANGE_BRANCH_SESSION"] = 'BRANCH_CODE~';
//                returnFlds = retflds[lovId];
//                retVal[0] = '';
             }
        }
        
    }
    l_Params += "&bindFldsStr=" + bindFldsStr;/* security fixes for WF */
    l_Params += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
  //  mask();//REDWOOD_CHANGES
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
}

function disp_offlinelov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, autoRedCriteria, e) {
     if((typeof(callformTabArray) != "undefined") && typeof(callformTabArray[strScreenName + "__" +strCurrentTabId]) != "undefined") containerId = callformTabArray[strScreenName + "__" +strCurrentTabId];//12.2 callform change
    var event = window.event || e;
    var srcElem = getEventSourceElement(event);
    var maximize="";/*fix for bug# 19619967*/
    lovScreenArgs =  new Array(); //12.0.2 SFR#17194334
    if (srcElem.parentNode.tagName.toUpperCase() == 'BUTTON') {
        lovSrcElem = getPreviousSibling(srcElem.parentNode);
    } else {
        lovSrcElem = getPreviousSibling(srcElem);
    }
    if (lovSrcElem == null) lovSrcElem = srcElem;
    var isME = "false";
    var singleView = "false";
    if (!fnEventsHandler('fnPreDispLov_' + lovId, lovSrcElem)) return false; //Fix for 18872795	
    //12.0.2 SFR#17194334 start
    if ((lovScreenArgs['title'] != '') && (typeof(lovScreenArgs['title']) != "undefined")){
      title = lovScreenArgs['title'];
    }
    //12.0.2 SFR#17194334 end
    appendData();
   //  if (!mainWin.isSessionActive()) return; session expiry change 
    var lovType = 'N';
	//Bug 14836553 Changes Starts
    autoRedCriteria = lovSrcElem.value; 
    var offlineLov='Y'; 
    //Bug 14836553 Changes Ends
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) {
isME = isMultipleEntry(blockId); /*12.0.4 UI performance changes starts*/
        if(isME=='true') {
            recordNum = getRowIndex(e) - 1;
            lovBlockObj = getTableObjForBlock(blockId);
			if (recordNum >= 0) fnMulipleEntryRow_onClick(event); //9NT1606_12_2_RETRO_12_0_3_23654682 changes 
        } /*12.0.4 UI performance changes ends*/
        /*for (var i = 0; i < multipleEntryIDs.length; i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }*/
    }
    if (recordNum < 0) recordNum = 0;
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW")) {
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.VIEW == "SE") {
            isME = "false";
            recordNum = 0;
        }
    }
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
        singleView = "true";
        recordNum = 0;
    }

    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }

    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
		//9NT1606_12_4_RETRO_12_1_26195245 starts
		if(containerId=='ASSIGN')
			containerId='COMMON';
		//9NT1606_12_4_RETRO_12_1_26195245 starts
    }
	 FieldLabel = 					replaceAllChar(FieldLabel,"/","_SLH_");//Fix for 19412812
	 //Fix for 22973701 starts
    FieldLabel = replaceAllChar(FieldLabel,"#","_HASH_");
    title = replaceAllChar(title,"#","_HASH_");
    //Fix for 22973701 ends
    /*fix for bug# 19619967 start*/
     if (typeof(lovMax)!="undefined" && typeof(lovMax[blockId + "__" + fieldName + "__" + lovId])!="undefined" && lovMax[blockId + "__" + fieldName + "__" + lovId] == "Y") {
        maximize = "Y";
    }
	  /*fix for bug# 19619967 end*/
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "") l_Params += "&lovId=" + udfLovId;
    else l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;
    l_Params += "&maximize=" + maximize;/*fix for bug# 19619967*/

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
        l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined") {
        redValue = autoRedCriteria;
    } else {
        redValue = "";
    }
	l_Params += "&rednFldval=" + redValue; //Bug 14836553 Changes
    if (blockId != '') {
        returnFlds = offlineLovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0];/*12.0.4 UI performance changes */
        var bindFlds = offlineLovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");/*12.0.4 UI performance changes */
//        returnFlds = offlineRetflds[blockId + "__" + fieldName + "__" + lovId];
//        var bindFlds = offlineBndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0; i < bindFlds.length; i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    //bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~"; security fixes for WF 
					/*Bug_31534120 Starts*/
                    //bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
					if(bindStr[1] != 'DATE')
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
                    else
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "###DATE"+"|";
                    /*Bug_31534120 Ends*/
                } else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    } else {
        //returnFlds = offlineRetflds[lovId];
        returnFlds = offlineLovInfoFlds[lovId][0];/*12.0.4 UI performance changes */
    }
    l_Params += "&bindFldsStr=" + bindFldsStr; /* security fixes for WF */
	//Bug 14836553 Changes  Starts 
    l_Params += "&offlineLov=" + offlineLov;
    l_Params += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
    isLovOpen = true;
    //Bug 14836553 Changes Ends
    mask();
    loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    fnEventsHandler('fnPostDispLov_' + lovId);
}

function disableAllElements(type, obj) {//Fix for 21254503 start
    //var elements = document.getElementById('ResTree').getElementsByTagName(type);
    var elements;
    if (typeof (obj) != "undefined") elements = obj.getElementsByTagName(type);
    else elements = document.getElementById('ResTree').getElementsByTagName(type);
    //Fix for 21254503 end
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex];	
//REDWOOD_CHANGES
        if(type== 'OJ-INPUT-TEXT' ||type== 'OJ-BUTTON' || type== 'BUTTON' ||type == "OJ-INPUT-NUMBER" || type == "OJ-SELECT-SINGLE" || type == "OJ-SWITCH" || type == "OJ-INPUT-PASSWORD" || type == "OJ-RADIOSET" || type == "OJ-INPUT-DATE" || type == "OJ-INPUT-DATE-TIME"){ // OJET Migration
			tmpElem.type = "text";
        }
        if(typeof(tmpElem.type) == "undefined"){
            tmpElem.type = "text";
        }		  
//REDWOOD_CHANGES
        if (tmpElem.type.toUpperCase() != 'HIDDEN' && getCurrentStyle(tmpElem, "visibility").toUpperCase() != "HIDDEN" && tmpElem.className.toUpperCase() != "HIDDEN") {
            fnDisableElement(tmpElem);
            if (checkViewMode && checkViewMode == true) loopIndex--;
            checkViewMode = false;
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
                var nextSibling = getNextSibling(tmpElem);
                if (nextSibling) {
                    if (nextSibling.tagName) {
                        if (nextSibling.tagName == 'OJ-BUTTON' && nextSibling.innerHTML) { //REDWOOD_CHANGES
                            if (nextSibling.innerHTML.indexOf('IMGPopupEdit') != -1) {
                                nextSibling.disabled = false;
                            }
                        }
                    }
                }
            }
        }
        if (type.toUpperCase() == "OJ-BUTTON") { //REDWOOD_CHANGES
            if (gAction == 'EXECUTEQUERY' || gAction == '' || ShowSummary == 'TRUE') {
                if (tmpElem.getAttribute('name')!=null &&( tmpElem.getAttribute('name').indexOf("BTN_PREV_") != -1 || tmpElem.getAttribute('name').indexOf("BTN_NEXT_") != -1)) { //REDWOOD_CHANGES
                    fnEnableElement(tmpElem);
                } else if (tmpElem.innerHTML) {
                    if ((tmpElem.innerHTML.indexOf('IMGPopupEdit') >= 0) || (getOuterHTML(tmpElem).indexOf('show_editor') >= 0)) {
                        fnEnableElement(tmpElem);
                    }
                }
            }
           if((tmpElem.id) && ((tmpElem.id == "BtnSubSysNav") || (tmpElem.id.indexOf("BtnSectionNav") != -1))){//HTML5 changes 2/NOV/2016 Fix for 24942117
                fnEnableElement(tmpElem); 
            }
        }
//REDWOOD_35159306
		var block_id= tmpElem.getAttribute("dbt");
		isME = isMultipleEntry(block_id);  
        if (isME=='true') {
            if (document.getElementById(block_id)) { 

							var elemet=document.getElementById(block_id).firstChild.content.children[0];

							for(var cellindex =0; cellindex < elemet.cells.length; cellindex++){
							var txt= elemet.cells[cellindex].getElementsByTagName(type)[0];
							if ( typeof(txt) != "undefined"  && tmpElem.getAttribute("name")==txt.getAttribute("name") && type!="OJ-SWITCH" && type!="OJ-BUTTON"){ 
								txt.setAttribute("readOnly",true);
								} 
						   if (typeof(txt) != "undefined"  && (type =="OJ-SWITCH" || type=="OJ-BUTTON") ) {
                                txt.setAttribute("disabled",true);
                               }
							}  
 
                }
            }	
//REDWOOD_35159306  
    }
}

function enableAllElements(type, obj) {
    var elements;
    if (typeof (obj) != "undefined") elements = obj.getElementsByTagName(type);
    else elements = document.getElementById('ResTree').getElementsByTagName(type);
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++) {
        var tmpElem = elements[loopIndex];		 
//REDWOOD_CHANGES
        if(type == "OJ-BUTTON" || type == "BUTTON" || type == "OJ-INPUT-TEXT" || type == "OJ-INPUT-NUMBER"  ||type == "OJ-SELECT-SINGLE" ||type == "OJ-SWITCH" ||type == "OJ-RADIOSET" || type=="OJ-TEXT-AREA"|| type=="OJ-INPUT-PASSWORD" || type=="OJ-INPUT-DATE" || type == "OJ-INPUT-DATE-TIME") {//OJET Migration
			tmpElem.type ='TEXT';
		}
        if (tmpElem.type.toUpperCase() != 'HIDDEN' ) {	  
//REDWOOD_CHANGES
            if (tmpElem.className != null && gAction == 'ENTERQUERY' && (tmpElem.className == 'BtnAddRow' || tmpElem.className == 'BtnDelRow')) {
                return;
            } else {
                if (tmpElem.readOnly && tmpElem.disabled && (!tmpElem.getAttribute("INPUT_LOV") || tmpElem.getAttribute("INPUT_LOV") == 'N')) {
                    if (tmpElem.type.toUpperCase() != 'CHECKBOX') {
                        tmpElem.className = 'TXTro';
                        tmpElem.readOnly = true;
                    }
                } else fnEnableElement(tmpElem);
            }
        }
    }
}

function alert(message) {
    mask();
    showAlerts(fnBuildAlertXML('', 'I', message), 'I');
    alertAction = "UNMASK";
}

function fnShowSingleViewForME(blockId) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
   // if (!mainWin.isSessionActive()) return; session expiry change 
    //var tableObject = document.getElementById(blockId);	  //REDWOOD_CHANGES
     var tableObject =getTableObjForBlock(blockId); //REDWOOD_CHANGES
	var tbObjLen = getOjTableRowsLength(blockId); //REDWOOD_35352601
    var scrType = screenType; //FC10.3 WB CHANGES
    var fnId = "";
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode;
    var title = mainWin.getItemDesc("LBL_SINGLE_REC_VIEW_TITLE");
    title = tableObject.summary + ' ' + title;
    var exitLabel = mainWin.getItemDesc("LBL_EXIT");
    var okLabel = mainWin.getItemDesc("LBL_OK");
    if (typeof (screenArgs) != "undefined") {
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + screenArgs['FUNCTION_ID'] + "']")
    } else {
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + mainWin.document.getElementById("fastpath").value + "']")
    }
    var uiName = "";
    if (uiNameNode) {
        for (var i = 0; i < uiNameNode.attributes.length; i++) {
            if (uiNameNode.attributes[i].nodeName == "UINAME") {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }
    if (uiNameNode && uiName != "" && uiName != "null") { //since the value of uiName will comeas "null"(String) in menu xml
        fnId = uiName;
    } else if (scrType == "WB") {
        uiName = mainWin.gActiveWindow.uiXML;
        fnId = uiName.substring(0, uiName.indexOf(".", 0)); //9NT1606_12_4_RETRO_12_1_26230934 changes 
    } else {
        fnId = functionId;
    }
    if (typeof (childFunctionOrigin) != "undefined") {
        functionOrigin = childFunctionOrigin;
        parentFunction = childParentFunction;
        parentOrigin = childParentOrigin;
    }
	//9NT1606_12_4_RETRO_12_0_3_27143186 Starts
	if (typeof (scrChild) != "undefined" && scrChild == "Y") {
		fnId = parentFunction;
    }
	//9NT1606_12_4_RETRO_12_0_3_27143186 Ends
    var l_Params = "title=" + title;
    l_Params += "&scrType=" + screenType;
    l_Params += "&ExitLabel=" + exitLabel;
    l_Params += "&OkLabel=" + okLabel;
    l_Params += "&l_strTheme=" + strTheme;
    l_Params += "&blockId=" + blockId;
    //l_Params += "&functionId=" + functionId; //12_0_3_RETRO_12_2_23654200 commented
	l_Params += "&functionId=" + fnId; //12_0_3_RETRO_12_2_23654200 added
    l_Params += "&functionOrigin=" + functionOrigin;
    l_Params += "&clusterModified=" + clusterModified;
    l_Params += "&customModified=" + customModified;
    if (mainWin.txnBranch[g_txnBranch]) {
        // l_Params += "&txnBranchUC=" + txnBranchUC; 
        l_Params += "&g_txnBranch=" + g_txnBranch;
    }

    if (tableObject) {
        //if (tableObject.tBodies[0].rows.length > 0) { //REDWOOD_35352601
		if (tbObjLen > 0) { //REDWOOD_35352601
            mask();
            loadSubScreenDIV("ChildWin", "ExtLaunchSingleViewScreen.jsp?" + l_Params);
        }
    }
}

function fnExitSingleViewScreen() {
    unmask();
    var winDivObj = document.getElementById("ChildWin");
    winDivObj.children[0].src = "";
    document.getElementById("Div_ChildWin").removeChild(winDivObj);
}

var editorSrcElem;

function show_editor(elemId, maxLength, title, e) {
    var event = window.event || e;
    var scrElem = getEventSourceElement(event);
    if (scrElem.tagName.toUpperCase() == 'OJ-BUTTON') {//REDWOOD_CHANGES
        editorSrcElem = scrElem;
    } else if (scrElem.parentNode && scrElem.parentNode.tagName.toUpperCase() == 'OJ-BUTTON') {//Fix for 21490468 //REDWOOD_CHANGES
        editorSrcElem = scrElem.parentNode;
    } else if (getNextSibling(scrElem) && getNextSibling(scrElem).tagName.toUpperCase() == 'OJ-BUTTON') { //12902575 - F4 not opening Editor in Non-IE browsers //REDWOOD_CHANGES
        editorSrcElem = getNextSibling(scrElem);
    }
    if (getPreviousSibling(scrElem) && getPreviousSibling(scrElem).getAttribute("LABEL_VALUE")) {
        title = getPreviousSibling(scrElem).getAttribute("LABEL_VALUE");
    } else {
        title = title;
    }
    var recNum = getRowIndex(event);
    if (recNum == 0 || recNum == -1) recNum = 0;
    var inputBoxName;
    if (scrElem.parentNode.tagName.toUpperCase() == 'OJ-BUTTON') { //Safari Change //REDWOOD_CHANGES
        if (getPreviousSibling(scrElem.parentNode).tagName.toUpperCase() == 'OJ-BUTTON') {//REDWOOD_CHANGES
            //inputBoxName = getPreviousSibling(getPreviousSibling(scrElem.parentNode)).name;
            inputBoxName = elemId.split("__").pop();//redwood_35040403
        } else {
            inputBoxName = getPreviousSibling(scrElem.parentNode).name;
        }
    } else {
        if (getPreviousSibling(scrElem) && getPreviousSibling(scrElem).tagName.toUpperCase() == 'OJ-BUTTON') { //REDWOOD_CHANGES
            inputBoxName =elemId.split("__").pop(); //redwood_35040403  //getPreviousSibling(getPreviousSibling(scrElem)).name;
        } else {
            inputBoxName = getPreviousSibling(scrElem) && getPreviousSibling(scrElem).name;	 //REDWOOD_CHANGES
        }
    }
    var elementsLength = document.getElementsByName(inputBoxName).length;
    if (elementsLength > 0) {
        if (document.getElementsByName(inputBoxName)[0].ownerDocument) {
            if (document.getElementsByName(inputBoxName)[0].ownerDocument.title == 'Single Record View') {
                elementsLength = 1;
            }
        }
    }
    if (elementsLength == 1 && recNum < 1) {
        recNum = 0;
    } else {
        tmpElem = scrElem;
        while (tmpElem.tagName != "TR") {
            tmpElem = tmpElem.parentNode;
            if (tmpElem == null) {
                recNum = 0;
                break;
            }
        }
        /*if (tmpElem && tmpElem.rowIndex > 0) { //Fix for 19478248
            recNum = tmpElem.rowIndex - 1;
        }*/ // 20871797
    }
    if (typeof (summaryScreen) != "undefined") recNum = 0;
    if (!maxLength) maxLength = document.getElementsByName(inputBoxName)[0].getAttribute("SIZE"); //Fix for 19478248

    var readOnlyAttr = "false";
	//SFR#17255467 : Fix for 16474495 
    //if (document.getElementById(elemId).readOnly || document.getElementById(elemId).disabled) {
//REDWOOD_CHANGES
//        if (getPreviousSibling(editorSrcElem)) {
//        if(getPreviousSibling(editorSrcElem).readOnly || getPreviousSibling(editorSrcElem).disabled){
//	//SFR#17255467 : Fix for 16474495 
//        readOnlyAttr = "true";
//        }
//        }
//REDWOOD_CHANGES	

var isME = tmpElem && tmpElem.tagName == 'TR';
    //Fix for 25805078 Starts
    var isMesv = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
        isMesv = true;
    }
    //9NT1606_12_4_RETRO_12_2_26230337 Ends
var readOnlyAttr;
    if (isME || isMesv) {
        var rcIndex;
        if (tmpElem) {
           rcIndex = tmpElem.rowIndex-1;
        } else {
            rcIndex = recNum;
        }        
        readOnlyAttr = document.getElementById(elemId+"RC"+rcIndex).readonly || document.getElementById(elemId+"RC"+rcIndex).disabled;        
    } else {
        readOnlyAttr = document.getElementById(elemId).readonly || document.getElementById(elemId).disabled;        
    }			   
//REDWOOD_CHANGES
    var l_Params = "title=" + title;
    l_Params += "&elemId=" + elemId;
    l_Params += "&maxLength=" + maxLength;
    l_Params += "&recNum=" + recNum;
    l_Params += "&readOnlyAttr=" + readOnlyAttr;
	l_Params += "&isMesv=" + isMesv; //9NT1606_12_4_RETRO_12_2_26230337 changes 
    //l_Params += "&editorSrcElem=" + editorSrcElem; /* security fixes for WF */
    mask();
    loadSubScreenDIV("ChildWin", "ExtEditor.jsp?" + l_Params);
}

function getFrmtDate(inputDate, dateFormat) {
    this.validDate = true;
    var sep = null;
    var dFormat = null
    var ddInput, mmInput, yyInput;
    if (inputDate == null || inputDate == "") {
        return;
    }
    dFormat = getInputDateFormat(dateFormat);
    sep = getSeparator(dFormat);
    var dmy = new Array();
    try {
        get_dd_mm_yy(inputDate, dFormat, sep, dmy);
        ddInput = dmy[0];
        mmInput = dmy[1];
        yyInput = dmy[2];
    } catch (e) {
        alert(mainWin.getItemDesc("LBL_EXCEPTION_PARS_DATE"));
        this.validDate = false;
    }
    this.yyyy = yyInput;
    this.mm = mmInput - 1 + '';
    this.dd = ddInput;
    this.dateInputFormat = dFormat;
    this.isValidDate = isValidDate;
    this.getShortDate = getShortDate;
    this.getDSODate = getDSODate;
    this.getInputDateFormat = getInputDateFormat;
}

function fnFormatTimeStamp(elem) {
    var objDtStamp = elem;
    if (objDtStamp && objDtStamp.value) {
        var objDtStampValue = objDtStamp.value;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO,false);//Fix for 19522233
        var formattedTS = mb3Date.getShortDate() + timePart;
        getNextSibling(getNextSibling(objDtStamp)).value = formattedTS;
        //document.getElementById(objDtStamp.id + "I").value = formattedTS;
    } else if (objDtStamp && objDtStamp.value == "") {
        //document.getElementById(objDtStamp.id + "I").value = "";
        getNextSibling(getNextSibling(objDtStamp)).value = "";
    }
    return;
}

function fnFormatTimeStampString(str) {
    if (str && (str != "")) {
        var objDtStampValue = str;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO,false);//Fix for 19522233
        var formattedTS = mb3Date.getShortDate() + timePart;
        str = formattedTS;
    }
    return str;
}

var DIGIT_KEY = '#';
var ANYTHING_KEY = '*';
var UPPERCASE_KEY = 'U';
var LOWERCASE_KEY = 'L';
var HEX_KEY = 'H';
var MASK_KEY_CHARS = DIGIT_KEY + ANYTHING_KEY + UPPERCASE_KEY + LOWERCASE_KEY + HEX_KEY;

function MB3MaskFormatter(value, mask) {
    this.mask = "";
    this.value = "";
    this.displayValue = "";
    this.valid = true;
    this.mask = mask;
    var invalidCharacters = getInvalidCharacters(mask);
    var valueIndex = 0;
    var maskSegment = "";
    var valueSegment = "";
    var nextMaskChar = "";
    var nextValueChar = "";

    for (var maskIndex = 0; maskIndex < mask.length; maskIndex++) {
        nextMaskChar = this.mask.substr(maskIndex, 1);
        if (valueIndex < value.length) {
            nextValueChar = value.substr(valueIndex, 1);
        }
        if (MASK_KEY_CHARS.indexOf(nextMaskChar) < 0) {
            var fmtSegment = formatSegment(valueSegment, maskSegment);
            if (fmtSegment.length == maskSegment.length) {
                this.value += fmtSegment;
                this.displayValue += fmtSegment;
                this.displayValue += nextMaskChar;
                valueSegment = "";
                maskSegment = "";
                if (nextValueChar == nextMaskChar) {
                    valueIndex++;
                }
            } else {
                displayMsg('ST-COM001', mask + '~');
                this.valid = false;
                break;
            }
        } else {
            maskSegment += nextMaskChar;
            if (valueIndex < value.length) {
                switch (nextMaskChar) {
                case DIGIT_KEY:
                    if ((nextValueChar >= 0) && (nextValueChar <= 9)) {
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                case ANYTHING_KEY:
                    if (invalidCharacters.indexOf(nextValueChar) < 0) {
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                case UPPERCASE_KEY:
                    if (invalidCharacters.indexOf(nextValueChar) < 0) {
                        valueSegment += nextValueChar.toUpperCase();
                        valueIndex++;
                    }
                    break;
                case LOWERCASE_KEY:
                    if (invalidCharacters.indexOf(nextValueChar) < 0) {
                        valueSegment += nextValueChar.toLowerCase();
                        valueIndex++;
                    }
                    break;
                case HEX_KEY:
                    if (((nextValueChar >= 0) && (nextValueChar <= 9)) || ((nextValueChar.toUpperCase() >= "A") && (nextValueChar.toUpperCase() <= "F"))) {
                        valueSegment += nextValueChar;
                        valueIndex++;
                    }
                    break;
                default:
                    break;
                }
            }
        }
    } //for
    if ((this.valid == true) && (maskSegment != "")) {
        var fmtSegment = formatSegment(valueSegment, maskSegment);
        if (fmtSegment.length == maskSegment.length) {
            this.value += fmtSegment;
            this.displayValue += fmtSegment;
            valueSegment = "";
            maskSegment = "";
        } else {
            displayMsg('ST-COM001', mask + '~');
            this.valid = false;
        }
    }
    if ((this.valid == true) && (valueIndex < value.length)) {
        displayMsg('ST-COM001', mask + '~');
        this.valid = false;
    }
}

MB3MaskFormatter.prototype.isValid = isValid;
MB3MaskFormatter.prototype.getDisplayValue = getDisplayValue; //When DSO value changes, this function is called by the hidden field bound to DSO 
MB3MaskFormatter.prototype.getDSOValue = getDSOValue; //When user enters a value and leaves the field, this function sets the value in DSO bound hidden field
function isValid() {
    return (this.valid);
}

function getDisplayValue() {
    return this.displayValue;
}

function getDSOValue() {
    return this.value;
}

function getInvalidCharacters(mask) {
    var retVal = "";
    var re = new RegExp("[^" + MASK_KEY_CHARS + "]", "g");
    var tmp;
    while ((tmp = re.exec(mask)) != null) {
        if (retVal.indexOf(tmp) < 0) retVal += tmp;
    }
    return retVal;
}

function formatSegment(valueSegment, maskSegment) {
    var retVal = valueSegment;
    var tmp = "";
    if ((valueSegment == null) || (valueSegment == "")) {
        retVal = zeroPrefix("", maskSegment.length);
    } else {
        var re = new RegExp("[^" + maskSegment.substr(0, 1) + "]", "g");
        if (tmp = re.exec(maskSegment) == null) {
            retVal = zeroPrefix(valueSegment, maskSegment.length);
        }
    }
    return retVal;
}

function displayValue(dataBoundElem) {
    var idDispVal = dataBoundElem.id + "I";
    var inpElem = dataBoundElem.parentNode.parentNode.parentNode[idDispVal];
    var mask = inpElem.getAttribute("mask");
    var val = dataBoundElem.value;
    if (val && val != "") {
        var mb3Value = new MB3MaskFormatter(val, mask);
        inpElem.value = mb3Value.getDisplayValue();
    } else {
        inpElem.value = "";
    }
    if ((document.getElementById('op').value != 'QUERY') && (arguments.length == 1)) {
        inpElem.fireEvent("onchange");
    }
}

var gCurDisplayMaskValue = 0;

function acceptInputValue(idVal) {
    var curInpElem = getEventSourceElement(event);
    gCurDisplayMaskValue = curInpElem.value;
}

function validateInputValue(idVal) {
    var curInpElem = getEventSourceElement(event);
    var curDataBoundElem = curInpElem.parentNode.parentNode.parentNode[idVal];
    var mask = curInpElem.getAttribute("mask");
    var inpVal = curInpElem.value;

    if (inpVal && inpVal != "") {
        var mb3Value = new MB3MaskFormatter(inpVal, mask);
        if (mb3Value.isValid()) {
            if (gCurDisplayMaskValue != inpVal) {
                curDataBoundElem.value = mb3Value.getDSOValue();
            } else {
                displayValue(curDataBoundElem, false);
            }
        } else {
            event.returnValue = false;
        }
    } else {
        if (curDataBoundElem.value != '') curDataBoundElem.value = '';
    }
}

/* ExtTabContent.js Functions Start *********************/
function expandContentLoad(cid) {
    var aobject = document.getElementById(cid);
    if (!aobject) {
        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        if (tab_arr.length == 0) {
            cid = strCurrentTabId;
        } else {
            for (var i = 0; i < tab_arr.length; i++) {
                cid = tab_ids[0];
                break;
            }
        }
        aobject = document.getElementById(cid);
    }
    if (document.getElementById("tablist")) {
      //  highlighttab(aobject);//REDWOOD_CHANGES
       // detectSourceindex(aobject); //REDWOOD_CHANGES
        document.getElementById("TBLPage" + cid).style.display = "block";
        document.getElementById(cid).parentNode.classList.add("oj-selected"); //REDWOOD_CHANGES

       
        previoustab = cid;
    }
    strCurrentTabId = cid;
}

function expandcontent(cid) {
	mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var aobject = document.getElementById(cid);
    if (!aobject) {
        if (tab_arr.length == 0 || tab_ids.length == 0) {
            fnTabDetails();
        }
        if (tab_arr.length == 0) {
            cid = strCurrentTabId;
        } else {
            for (var i = 0; i < tab_arr.length; i++) {
                cid = tab_ids[0];
                break;
            }
        }
        aobject = document.getElementById(cid);
    }
    if (document.getElementById("tablist")) {
        prevTab = strCurrentTabId;
        try {
            if (!fnTabEventsHandler("fnOutTab_" + prevTab)) return false;
        } catch (e) {}
        if (gAction != "" && gAction != "EXECUTEQUERY") appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
        if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
            var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
            var subSys = strScreenName + '__' + strCurrentTabId;
            if (statusStr!= null){ //REDWOOD_35467020
            if (statusStr.indexOf(subSys) != "-1") {
                if (typeof (tabDom) != "undefined" && tabDom != null && getXMLString(tabDom) != getXMLString(dbDataDOM)) {
                    fnSetTabSubSystem();
                    tabDom = loadXMLDoc("");
                }
            }
          } //REDWOOD_35467020
        }
        highlighttab(aobject);
        detectSourceindex(aobject);
        if (previoustab != "") {
            document.getElementById("TBLPage" + previoustab).style.display = "none";
            document.getElementById(previoustab).parentNode.classList.remove("oj-selected"); //REDWOOD_CHANGES
        }
        document.getElementById("TBLPage" + cid).style.display = "block";
        previoustab = cid;
        for (var i = 0; i < tab_arr.length; i++) {
            if (tab_ids[i] == cid) {
                tablist_curr_id = i;
                break;
            }
        }
    }
    strCurrentTabId = cid;

        var html = "";
    if (document.getElementById("TBLPage" + strCurrentTabId).innerHTML == "") {
       // if( typeof(mainWin.screenHtmlCache[functionId + strScreenName].tabHTML) == "undefined" || typeof(mainWin.screenHtmlCache[functionId + strScreenName].tabHTML[strCurrentTabId]) == "undefined"){
           html = ShowXMLTabNew(xmlFileName, 'ExtDetailTab.xsl', strScreenName, strCurrentTabId); //12.1 Caching Tab load
           //if (getBrowser().indexOf("IE") != -1) {//12.1 Caching Tab load
//REDWOOD_CHANGES
        if (arguments.callee.caller.toString()) { //OJET Migration
            if ( ShowSummary == 'TRUE' && (arguments.callee.caller.toString().indexOf("_KERNEL") !=  - 1 || arguments.callee.caller.toString().indexOf("_CLUSTER") !=  - 1 || arguments.callee.caller.toString().indexOf("_CUSTOM") !=  - 1)) {
                //compres  
//REDWOOD_CHANGES
            document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
 //REDWOOD_CHANGES               
            }
            else {
                screenKo.cleanNode(document.getElementById("TBLPage" + strCurrentTabId));
               
                  if (getBrowser().indexOf("FIREFOX") !=  - 1) {
                     html = html.replace(new RegExp("template_tmp", 'g'), "template");
                 }
                html =html.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
                document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
                fnBindScreenElements(document.getElementById("TBLPage" + strCurrentTabId));//OJET Migration
                screenKo.applyBindings( {},document.getElementById("TBLPage" + strCurrentTabId));
            }
        };//} else { //12.1 Caching Tab load  
//REDWOOD_CHANGES
           // document.getElementById("TBLPage" + strCurrentTabId).appendChild(html);
       // }
          // }
//        else {
//           html = mainWin.screenHtmlCache[functionId + strScreenName].tabHTML[strCurrentTabId];
//             document.getElementById("TBLPage" + strCurrentTabId).innerHTML = html;
//           }
        debugs("tabsContent=", html);
       //12.1 Caching Tab load end
        //fnBuildMultipleEntryArray(strCurrentTabId);//REDWOOD_CHANGES
        if (gAction == "NEW") {
            resetElements(document.getElementById("TBLPage" + strCurrentTabId));
            enableForm(document.getElementById("TBLPage" + strCurrentTabId));
            disableMESVTabFields();
        }
        if (gAction == "ENTERQUERY") {
            resetElements(document.getElementById("TBLPage" + strCurrentTabId));
            fnEnablePKOnlyFields();
            if (queryAmendArr.length != 0) fnEnableAmendFields("query");
        }

    }

     else {
		if (gAction == "NEW") { //21229657  starts
            enableForm(document.getElementById("TBLPage" + strCurrentTabId));
            disableMESVTabFields();
        }
	} //21229657  ends	  
//REDWOOD_CHANGES
//    if ((gAction == "EXECUTEQUERY" || gAction == "") && dbDataDOM != null) { /*12.0.4 UI performance changes starts*/   //OJET Migration
//        //var tabMEBlksDetails = tabMEBlks[strCurrentTabId];
//        var tabMEBlksDetails = tabMEBlks[strScreenName + '__' + strCurrentTabId];
//        if(typeof(tabMEBlksDetails) != "undefined") {
//            var tabBlks = tabMEBlksDetails.split("~");
//            for(var i = 0;i < tabBlks.length;i++ ) {
//                if( tabBlks[i] != "" && selectSingleNode(dbDataDOM, getXPathQuery(tabBlks[i])+ "[@ID= '1']" )==null ) {
//                    var qry = getXPathQuery(tabBlks[i]);
//                    fnGetPartialDataXMLFromFCJXML(0, tabBlks[i], qry, false, 0, false, '',true);
//                }
//            }
//        }
//    }/*12.0.4 UI performance changes ends*/
//    											
//REDWOOD_CHANGES
    if (document.getElementsByName('SUBSYSSTAT') && document.getElementsByName('SUBSYSSTAT').length != 0) {
        var statusStr = document.getElementsByName('SUBSYSSTAT')[0].value;
        var screenArgs = new Array();
        var subsys = strScreenName + '__' + strCurrentTabId;
        if (statusStr != "" && statusStr.indexOf(subsys) != -1) {
            fnPickUpSubSystem(subsys, strScreenName, functionId, screenArgs);
            /*Fix for 18993315 starts*/
            //tabDom = loadXMLDoc(getXMLString(dbDataDOM)); /*Fix for 17924897*/
            /*Fix for 18993315 Ends*/
        }
    }
	//fnChangeLabelToText("TEXTAREA"); //9NT1606_12_2_RETRO_12_0_1_23652286 changes //REDWOOD_CHANGES
	setTimeout(function(){ //redwood_35803564 start
	
    showTabData(strCurrentTabId);
    if (gAction == 'EXECUTEQUERY' || gAction == "") {
        var pviewmode = viewModeAction;
        viewModeAction = true;
        disableAllElements("OJ-INPUT-TEXT"); //REDWOOD_CHANGES
        fnEnableBlockCheckBox();	 //REDWOOD_CHANGES	//REDWOOD_35366805 Uncommented
        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
        viewModeAction = pviewmode;
    }
    if (gAction == "MODIFY" || gAction == "ROLLOVER" || gAction == "LIQUIDATE") {
        if (gAction == "MODIFY") {
            if (document.getElementsByName("ONCEAUTH")[0]) {
                if (document.getElementsByName("ONCEAUTH")[0].value == 'Y') {
                    fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
                }
            } else if (onceAuthObj) {
                if (onceAuthObj.value == 'Y') {
                    fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
                }
            } else {
                fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
            }
        } else {
            fnEnableTabMEAmendFields(gAction.toLowerCase(), strCurrentTabId);
        }
    }  
//REDWOOD_CHANGES
//  setTimeout(function(){
//    if (document.getElementById('TBLPage'+strCurrentTabId)) {
//        var collapsedSectionArr = document.getElementById('TBLPage'+strCurrentTabId).getElementsByTagName("BUTTON");
//        for (var cnt = 0; cnt < collapsedSectionArr.length; cnt++) {
//            var buttonName = collapsedSectionArr[cnt].getAttribute("name");
//            if (buttonName != null && buttonName != undefined && buttonName == 'BtnSectionCollapse')
//                fireHTMLEvent(collapsedSectionArr[cnt], "onclick");
//        }
//    }
//  },0);	
//REDWOOD_CHANGES
    if (document.getElementById("tablist")) {
        try {
            if (!fnTabEventsHandler("fnInTab_" + strCurrentTabId)) return false;
        } catch (e) {}
    }
	
	},0);//redwood_35803564 ends
    return false;
}

function highlighttab(aobject) {
    if (typeof (tabobjlinks) == "undefined" || typeof (tabobjlinks[0]) == "undefined" || typeof (tabobjlinks[0]) == "unknown") collecttablinks();
   // fnSetTabAttributes(aobject, tabobjlinks); //REDWOOD_CHANGES
}

function fnSetTabAttributes(aobject, tabobjlinks) { //REDWOOD_CHANGES
    for (i = 0; i < tabobjlinks.length; i++) {
        tabobjlinks[i].parentNode.id = "";
        /*Fix for 21508341 Starts*/		  
//REDWOOD_CHANGES
//		if(tabobjlinks[i].disabled)  
//            addEvent(tabobjlinks[i], "class", "Htabdsb");            
//        else
//			addEvent(tabobjlinks[i], "class", "Htaball");
		/*Fix for 21508341 Ends*/
//        tabobjlinks[i].setAttribute("objClicked", "false");
//        tabobjlinks[i].setAttribute("selected", "false");
//        tabobjlinks[i].setAttribute("title", "");
    }
    aobject.parentNode.id = "current";
//    aobject.setAttribute("objClicked", "true");
//    aobject.setAttribute("objvisited", "true");
//    aobject.setAttribute("selected", "true");
    aobject.setAttribute("title", mainWin.getItemDesc("LBL_SELECTED"));
    //aobject.setAttribute("title", "selected");
//    addEvent(aobject, "onmouseover", "setTabClass(this,'onmouseover')");
//    addEvent(aobject, "onmouseout", "setTabClass(this,'onmouseout')");
//    addEvent(aobject, "onblur", "setTabClass(this,'onblur')");
//    addEvent(aobject, "class", "Htabsel");  
//REDWOOD_CHANGES

}

function setTabClass(object, event_type) {
    if (object.getAttribute("objClicked") == "false") {
        if (event_type == "onmouseover") {
            addEvent(object, "class", "Htabover");
        } else {
            addEvent(object, "class", "Htaball");
        }
    }
}

// The following code has been copied from TabContent.js for performance tuning
function collecttablinks() {
    var tabobj = document.getElementById("tablist");
    tabobjlinks = tabobj.getElementsByTagName("A");
}

function getFirstElementToFocus(Obj) {
    if (Obj != null) {
        var objTagName = Obj.tagName.toUpperCase();
        if ((objTagName == "INPUT" || objTagName == "TEXTAREA" || objTagName == "SELECT" || objTagName == "BUTTON") && !Obj.disabled && Obj.type.toUpperCase() != "HIDDEN" && Obj.offsetWidth != 0 && Obj.offsetHeight != 0 && Obj.tabIndex != -1) return Obj;//Customer Accessibility //fix to not focus on readonly field 19/Jan/2017
        else {
            var children = Obj.children;
            for (var i = 0; i < children.length; ++i) {
                var firstElementToFocus = getFirstElementToFocus(children[i]);
                if (firstElementToFocus != null) {
                    return firstElementToFocus;
                }
            }
            return null;
        }
    } else {
        return null;
    }
}

function handleTabKeys(tabObj, e) {
    var e = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (e.shiftKey && e.keyCode == 9) {
        var headerInputElem = document.getElementById("TBLPage" + strHeaderTabId).getElementsByTagName("INPUT");
        for (var i = 0; i < headerInputElem.length; i++) {
            if (!headerInputElem[i].disabled && headerInputElem[i].type.toUpperCase() != "HIDDEN") {
                headerInputElem[i].focus();
                preventpropagate(e);
                return false;
            }
        }
    } else if (e.keyCode == 9) {
       if(tabObj.parentNode.parentNode.id == "dboardtablist"){
          if(currentTab != 'DBoardHome'){            
            if(document.getElementById("hTab_"+currentTab).getElementsByTagName("A")){
               var firstElementToFocus =  document.getElementById("hTab_"+currentTab).getElementsByTagName("A")[0]; 
            }
			}
            else{
                var firstElementToFocus = document.getElementById("MenuSearch");
            }
         }
        else if (tabObj.parentNode.parentNode.parentNode.parentNode.parentNode.id == "vTabDB_DASHBOARD"){
            var firstElementToFocus = getFirstElementToFocus(document.getElementById("DIVTabContent" + currentTab));
      }
       else{
          var firstElementToFocus = getFirstElementToFocus(document.getElementById("TBLPage" + strCurrentTabId));
        }
        if (firstElementToFocus != null) {
            firstElementToFocus.focus();
        } else if(document.getElementById("BTN_EXIT_IMG")){
            document.getElementById("BTN_EXIT_IMG").focus();
        }
        
        preventpropagate(e);
        return false;
    } 
    else if (e.keyCode == 39) {
        //Final changes begin
        var newObj;
        if (getNextSibling(tabObj.parentNode) != null) {
            newObj = getNextSibling(tabObj.parentNode);
            while (newObj.getElementsByTagName("A")[0].style.display == "none") {
                newObj = getNextSibling(newObj);
            }
            newObj=newObj.getElementsByTagName("A")[0];
            newObj.focus();
            if (tabObj.parentNode.parentNode.id == "dboardtablist" || tabObj.parentNode.parentNode.parentNode.id == "hTab_" + mainWin.currentTab) {
                if (getIEVersionNumber() > 0) {
                    fireHTMLEvent(newObj, "onclick", e);
                }
                else {
                    var fnEval = new Function("event", newObj.getAttribute("onclick"));
                    fnEval(e);
                }
            }
            else {
                expandcontent(newObj.id);
            }
            preventpropagate(e);
            return false;
        }
        //Final changes ends
    }
    else if (e.keyCode == 37) {
        //Final changes starts
        var prevObj;
        if (getPreviousSibling(tabObj.parentNode) != null) {
            prevObj = getPreviousSibling(tabObj.parentNode);
            while (prevObj.getElementsByTagName("A")[0].style.display == "none") {
                prevObj = getToolBarPreviousSibling(prevObj);
            }
            prevObj=prevObj.getElementsByTagName("A")[0];
            prevObj.focus();
            if (tabObj.parentNode.parentNode.id == "dboardtablist" || tabObj.parentNode.parentNode.parentNode.id == "hTab_" + mainWin.currentTab) {
                if (getIEVersionNumber() > 0) {
                    fireHTMLEvent(prevObj, "onclick", e);
                }
                else {
                    var fnEval = new Function("event", prevObj.getAttribute("onclick"));
                    fnEval(e);
                }

            }
            else {
                expandcontent(getToolBarPreviousSibling(tabObj.parentNode).getElementsByTagName("A")[0].id);
            }
            preventpropagate(e);
            return false;
        }
        //Final changes ends
    }
}

function handleScrObj(scrObj, e) {
    var e = window.event || e;
    if (e.keyCode == 9 && !e.shiftKey) {
        document.getElementById("WNDbuttons").focus();
        preventpropagate(e);
        return false;
    }
    return true;
}

function fnHandleScrBtn(e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(e);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (event.keyCode == 27) {
    if(document.getElementById('queryCriteria'))
        fnExitSumCriteria(event);
    else if(document.getElementById('qCriteriaName'))
        fnExitSumQueryCriteria(event);
    document.getElementById("BTN_EXIT").focus();
    return;
    }
    if (event.shiftKey && event.keyCode == 9) {
        if (srcElement.className.indexOf("WNDcls") != -1) {
            if (getOuterHTML(srcElement).indexOf("_sum") != -1)
                document.getElementById("BTN_EXIT").focus();
            else if (document.getElementById("BTN_EXIT_IMG"))
                document.getElementById("BTN_EXIT_IMG").focus();
            else
                document.getElementById("BTN_OK").focus();
        } else if (srcElement.id != "resultsLink")
            document.getElementById("WNDbuttons").focus();
        else if (srcElement.id == "resultsLink")
            document.getElementById("BTN_CANCEL").focus();
        if (srcElement.id == "criteriaName")
            document.getElementById("BTN_CANCEL").focus();
        else if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("BTN_OK"))
                document.getElementById("BTN_OK").focus();
            else if (document.getElementById("deleteCriteria"))
                document.getElementById("deleteCriteria").focus();
        } else if (srcElement.id == "BTN_OK") {
            if (document.getElementById("REMARKS"))
                document.getElementById("REMARKS").focus();
        } else if (srcElement.id == "deleteCriteria")
            document.getElementById("editCriteria").focus();
        else if (srcElement.id == "editCriteria")
            document.getElementById("resultsLink").focus();
        else if (srcElement.id == "REMARKS") {
            if(document.getElementById("criteriaName")) {
                document.getElementById("criteriaName").focus();
            }
        }
        preventpropagate(event);
        return false;
    } else if (e.keyCode == 9) {
        if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("criteriaName"))
                document.getElementById("criteriaName").focus();
            else if (document.getElementById("resultsLink"))
                document.getElementById("resultsLink").focus();
            preventpropagate(event);
            return false;
        }
    } else if (!document.getElementById('queryCriteria')) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            if (getBrowser().indexOf("IE") != -1 && getIEVersionNumber() > 0) {//12.0.3 changes 
                fireHTMLEvent(srcElement, "onclick");
            } else {
                //eval(srcElement.getAttribute("onclick"));
                var fnEval = new Function("event",srcElement.getAttribute("onclick"));  
                fnEval(event);
            }
            return false;
        }
    }
}

function fnhandleSubScrBtn(e) {
    var event = window.event || e;
    var srcElement = getEventSourceElement(event);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (event.keyCode == 9 || (event.shiftKey && event.keyCode == 9)) {
        if (srcElement.id == "enteredPwd") {
            document.getElementById("BTN_OK").focus();
            preventpropagate(event);
            return false;
            }
        else if (srcElement.id == "BTN_OK") {
            if(document.getElementById("enteredPwd"))
                document.getElementById("enteredPwd").focus();
                preventpropagate(event);
                return false;
        }
            
            return true;
        }
    if (srcElement.id != "enteredPwd") {
        if (event.keyCode == 13 || event.keyCode == 32) {
            if (getIEVersionNumber() > 0) fireHTMLEvent(srcElement, "onclick");
            else setTimeout(function () {
                //eval(srcElement.getAttribute("onclick"))
                var fnEval = new Function("event",srcElement.getAttribute("onclick"));  
                fnEval();
            }, 0); //Fix for FCIS 9.2.1 SFR 12910711
            return false;
        }
    } else if (event.keyCode == 13) { 
        fnverifyScreenSaverPwd(event);
        return false;
    }
    return true;
}

function detectSourceindex(aobject) {
    for (i = 0; i < tabobjlinks.length; i++) {
        if (aobject == tabobjlinks[i]) {
            tabsourceindex = i
            break
        }
    }
}

//Customer Accessibility
function handleTabKeysCust(tabObj, e) {
    var e = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();
    if (e.keyCode == 9) {
        var firstElementToFocus = getFirstElementToFocus(document.getElementById("Content"+tabObj.id).getElementsByTagName("IFRAME")[0].contentWindow.document.documentElement.getElementsByTagName("IFRAME")[0].contentWindow.document.getElementById("DIVMainTmp"));
    }
     if (firstElementToFocus != null) {
            firstElementToFocus.focus();
        } 
}

// The following code has been copied from TabPersist.js for performance tuning
var enablepersistence = true;
var persisttype = "local";

function get_cookie(Name) {
    var search = Name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}
/* Fix for 27959507 Start */
/*function savetabstate() {
    var cookiename = (persisttype == "sitewide") ? "tabcontent" : window.location.pathname;
    var cookievalue = (persisttype == "sitewide") ? tabsourceindex + "|" + previoustab + ";path=/" : tabsourceindex + "|" + previoustab;
    document.cookie = cookiename + "=" + cookievalue;
}*/
/* Fix for 27959507 End */
/* ExtTabContent.js Functions End*********************/

function fnLaunchHotkyFunc(keyDown, functionID) {
    var hotKey = "";
    if (keyDown) {
        if (event.ctrlKey == true && (event.keyCode == 77)) {
            hotKey = getEventSourceElement(event).value;
        } else {
            return;
        }
    } else {
        var tagName = getPreviousSibling(getEventSourceElement(event)).tagName;
        var inputElement = getPreviousSibling(getEventSourceElement(event));
        while (tagName != "INPUT") {
            inputElement = getPreviousSibling(inputElement);
            tagName = inputElement.tagName;
        }
        if (tagName == "INPUT") hotKey = inputElement.value;
    }
    if (hotKey != "") {
        dlgArg.hotKey = hotKey;
        dlgArg.mainWin.frames["FrameMenuB"].dispHref1(functionID, dlgArg);
    }
    event.returnValue = false;
}

var responseDom = "";

function fndispImage(accno, kvalue, brn) {
    var p_gAction = gAction;
    gAction = "DISPCUSTIMAGE";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + brn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>DISPCUSTIMAGE</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME>ACCNO</NAME><VALUE>' + accno + '</VALUE></PARAM><PARAM><NAME>KVALUE</NAME><VALUE>' + kvalue + '</VALUE></PARAM></ADDL>' + '</FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    responseDom = fnPost(requestDom, "FCUBSSignatureServlet", functionId);
    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            if (selectSingleNode(responseDom, "//FCUBS_BODY/REC")) {
                loadSubScreenDIV("ChildWin", "CustomerSignView.jsp?");
            } else {
                mask();
                if(kvalue == 'S')
                    showAlerts(fnBuildAlertXML('FC-MAINT54', 'E','',brn), 'E');
                else
                    showAlerts(fnBuildAlertXML('FC-MAINT55', 'E','',brn), 'E');
                alertAction = "UNMASK";
            }
        } else {
            mask();
            if(kvalue == 'S')
                showAlerts(fnBuildAlertXML('FC-MAINT56', 'E','',brn), 'E'); //Fix for 18556646
            else
                showAlerts(fnBuildAlertXML('FC-MAINT57', 'E','',brn), 'E'); //Fix for 18556646
            alertAction = "UNMASK";
        }
    }
    gAction = p_gAction;
}

function fndispCustbal(accno, brn) {
    var p_gAction = gAction;
    gAction = "CUSTACCBAL";
    var requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + brn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ADDL><PARAM><NAME>ACCNO</NAME><VALUE><![CDATA[' + accno + ']]></VALUE></PARAM></ADDL><ACTION>CUSTACCBAL</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    var requestDom = loadXMLDoc(requsetStr);
    if (typeof (dataObj) != "undefined" && dataObj.brnstat == "OFFLINE") {
        responseDom = fnPost(requestDom, "BranchServlet?msgType=NONWORKFLOW&actionType=CustBal&funcid=" + functionId + "&Brn=" + brn + "&Acc=" + accno, functionId);
    } else {
        responseDom = fnPost(requestDom, "FCClientHandler", functionId);
    }

    if (responseDom && getXMLString(responseDom) != "") {
        var msgStat = getNodeText(selectSingleNode(responseDom, "//MSGSTAT"));
        if (msgStat == "SUCCESS") {
            loadSubScreenDIV("ChildWin", "CustomerBalance.jsp?");
        }else{
            //alert(mainWin.getItemDesc("LBL_INFRA_INVACC"));  
            mask();
            showAlerts(fnBuildAlertXML('FC-MAINT58', 'E'), 'E');
            alertAction = "UNMASK";
        }
    }
    gAction = p_gAction;
}

function maskMultipleClick() { /* Mask Window Changes */  //REDWOOD_CHANGES
    var x = 0,
        y = 0;
//    if (self.innerHeight) {
//        x = self.innerWidth;
//        y = self.innerHeight;
//    } 
//    if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
//        x = document.documentElement.clientWidth;
//        y = document.documentElement.clientHeight;
//    } else
//    if (document.body) {
//        x = document.body.clientWidth;
//        y = document.body.clientHeight;
//    }
    x = document.body.parentElement.clientWidth;//Fix for 18285800 
    y = document.body.parentElement.clientHeight;//Fix for 18285800 
    var maskObj = document.getElementById("masker");
    maskObj.style.height = y + "px";
    maskObj.style.width = x + "px";
    maskObj.style.display = "block";
   
}

function unmaskMultipleClick() {//REDWOOD_CHANGES
    var maskObj;
    //HTML5 Changes Start
    if (document.getElementById("masker"))  {
        maskObj = document.getElementById("masker");
    } else {
        maskObj = parent.document.getElementById("masker");
    }
    //HTML5 Changes End
    maskObj.style.height = 0 + "px";
    maskObj.style.width = 0 + "px";
  
}

function mask(unmaskTitleBar) { /* Mask Window Changes */  
//REDWOOD_CHANGES
//    var x = 0,
//        y = 0;
////    if (self.innerHeight) {
////        x = self.innerWidth;
////        y = self.innerHeight;
////    } 
////    if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
////        x = document.documentElement.clientWidth;
////        y = document.documentElement.clientHeight;
////    } else
////    if (document.body) {
////        x = document.body.clientWidth;
////        y = document.body.clientHeight;
////    }
//    x = document.body.parentElement.clientWidth;//Fix for 18285800 
//    y = document.body.parentElement.clientHeight;//Fix for 18285800 
//    var maskObj = document.getElementById("masker");
//    maskObj.style.height = y + "px";
//    maskObj.style.width = x + "px";
//    maskObj.style.display = "block";
//    if (typeof (unmaskTitleBar) != "undefined") {
//        maskObj.style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
//        document.getElementById("WNDbuttons").disabled = true;
//        document.getElementById("WNDbuttons").removeAttribute("href");
//    }
    }

function unmask(unmaskTitleBar) {
//    var maskObj;
//    //HTML5 Changes Start
//    if (document.getElementById("masker"))  {
//        maskObj = document.getElementById("masker");
//    } else {
//        maskObj = parent.document.getElementById("masker");
//    }
//    //HTML5 Changes End
//    maskObj.style.height = 0 + "px";
//    maskObj.style.width = 0 + "px";
//    if (typeof (unmaskTitleBar) != "undefined") {
//        document.getElementById("WNDbuttons").disabled = false;
//        document.getElementById("WNDbuttons").setAttribute("href", "#");
//    }	   
//REDWOOD_CHANGES
}
/*12.0.2 Screen Saver Changes Start */
function screenSavermask(unmaskTitleBar){
    var x=0,y=0;
    if (self.innerHeight) {
        x = self.innerWidth;
        y = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    } else if (document.body) {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    var maskObj = document.getElementById("screenSavermasker");
       
    maskObj.style.height = y +"px";	
    maskObj.style.width = x +"px";
    maskObj.style.display="block";
    if (typeof(unmaskTitleBar) != "undefined") {
        maskObj.style.top = document.getElementById("WNDtitlebar").offsetHeight + "px";
        document.getElementById("WNDbuttons").disabled = true;
        document.getElementById("WNDbuttons").removeAttribute("href");
    }
}

function screenSaverunmask(unmaskTitleBar) {
    var maskObj;
    if (document.getElementById("screenSavermasker"))
        maskObj = document.getElementById("screenSavermasker");
    else
        maskObj = parent.document.getElementById("screenSavermasker");
    maskObj.style.height = 0 +"px";	
    maskObj.style.width = 0 +"px";
    if (typeof(unmaskTitleBar) != "undefined") {
        document.getElementById("WNDbuttons").disabled = false;
        document.getElementById("WNDbuttons").setAttribute("href", "#");
    }
}
/*12.0.2 Screen Saver Changes Ends */

/*17245864 bug fixes start */
function chkSavePwdScreen() {
    var oldPwd = document.getElementById("oldpwd").value;
    var newPwd = document.getElementById("newpwd").value;
    var confPwd = document.getElementById("confnew").value;
    if (fromLogin == "false") {
        parent.alertAction = "CHGPWD";
    }
    if (oldPwd == "") {
        var alertXML = fnBuildAlertXML("", "I", oldPwdMsg);
        showAlerts(alertXML, "I");
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("oldpwd")[0].focus();
        return false;
    }
    else {
        if (newPwd == "") {
            var alertXML = fnBuildAlertXML("", "I", newPwdMsg);
            showAlerts(alertXML, "I");
            parent.gAlertMessage = gAlertMessage;
            document.getElementsByName("newpwd")[0].focus();
             return false;
        }
        else {
            if (confPwd == "") {
                var alertXML = fnBuildAlertXML("", "I", newConfirmPwdMsg);
                showAlerts(alertXML, "I");
                parent.gAlertMessage = gAlertMessage;
                document.getElementsByName("confnew")[0].focus();
                 return false;
            }
            else {
                if (document.getElementById("newpwd").value != document.getElementById("confnew").value) {
                    var alertXML = fnBuildAlertXML("SM-00041", "E");
                    showAlerts(alertXML, "E");
                    parent.gAlertMessage = gAlertMessage;
                    document.getElementById("newpwd").value = "";
                    document.getElementById("confnew").value = "";
                    document.getElementById("newpwd").focus();
                     return false;
                }
                else {
                    if (document.getElementById("oldpwd").value == document.getElementById("newpwd").value) {
                        var alertXML = fnBuildAlertXML("SM-00043", "E");
                        showAlerts(alertXML, "E");
                        parent.gAlertMessage = gAlertMessage;
                        document.getElementById("newpwd").value = "";
                        document.getElementById("confnew").value = "";
                        document.getElementById("newpwd").focus();
                         return false;
                    }
                    else {
                        var newpwd = document.getElementById("newpwd").value;
                        if (newpwd == curr_user) {
                            var alertXML = fnBuildAlertXML("SM-00042", "E");
                            showAlerts(alertXML, "E");
                            parent.gAlertMessage = gAlertMessage;
                             return false;
                        }
                        if (newpwd == fnReverseStr(curr_user)) {
                            var alertXML = fnBuildAlertXML("SM-00042", "E");
                            showAlerts(alertXML, "E");
                            parent.gAlertMessage = gAlertMessage;
                            return false;
                        }                       
                    }
                }
            }
        }
    }
    if(loginEnc_Reqd == "Y"){
        document.getElementById("oldpwd").value  = AESEncrypt(oldPwd); 
        document.getElementById("newpwd").value  = AESEncrypt(newPwd); 
        document.getElementById("confnew").value  = AESEncrypt(confPwd);             
    }
}
function chkErrorOnPwdScreen(responseXML){  
    if (responseXML == "null") {
        return;
    }
	
     responseXML = AESDecrypt(responseXML);  //redwood_36011742 //REDWOOD_36646544 uncommented 
    if (responseXML == "SUCCESS" ) {
        var alertXML = fnBuildAlertXML("", "I", pwdChangedMsg);
        if (fromLogin == "false") {
            parent.alertAction = "UNMASK";
        }
        parent.chgPwd = true;
        showAlerts(alertXML, "I");
        parent.gAlertMessage = gAlertMessage;
         return ;        
    }
    else {
        //showAlerts(responseXML, "E"); //Bug_35356793 commented
		//showAlerts(fnBuildAlertXML(responseXML, "E"), "E");  //Bug_35356793 added
        showAlerts(fnBuildAlertXML(responseXML.split("!")[0], "E",'',responseXML.split("!")[1]), "E");  //Bug_35356793 added  //REDWOOD_36646544 uncommented 
        parent.gAlertMessage = gAlertMessage;
        document.getElementById("newpwd").value = "";
        document.getElementById("confnew").value = "";
        document.getElementById("newpwd").focus();
        return false;
	
 /* REDWOOD_36646544 -- ignoring below codes to encrypt
 //redwood_36011742 Starts
     var parser = new DOMParser();
     var xmlDoc = parser.parseFromString(responseXML, 'text/xml');
     var ecodeValue = xmlDoc.querySelector('ECODE').textContent;  
     var alertXML = fnBuildAlertXML(ecodeValue, "E");
     showAlerts(alertXML, "E");	 
	
 //redwood_36011742 Ends
*/
    }
}
/*17245864 bug fixes end */
function closePwdScreen() {
    unmask();	//REDWOOD_CHANGES Redwood_35208714 UNCOMMANTED
setTimeout( function(){

    try{	//REDWOOD_CHANGES
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    window.frameElement.src = ""; //REDWOOD_CHANGES
    //closeScrFlag=true;	 //REDWOOD_CHANGES  //redwood_36011742
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    if (fromLogin != "false") {
        parent.reqSignOff();
        parent.location.href = "LoginServlet";
    }  
//REDWOOD_CHANGES Redwood_35208714 UNCOMMANTED BELOW IF CONDITION
    if (fromLogin == "false") {
        parent.document.getElementById("LoggedUser_Menu").focus();
        parent.document.getElementById("LoggedUser_Menu").className == "navhover";
    }
	//Redwood_35208714
    }
    catch(e){
        console.log(e);		
//REDWOOD_CHANGES
    }
},10);
}

function fnHandleScreenBtn(e) {
   // mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if (e.shiftKey == true && e.keyCode == 9) {
        if (srcElement.id == "oldpwd" || srcElement.id == "amtFmt") {
            document.getElementById("BTN_CANCEL").focus();
            preventpropagate(e);
            return false;
        } else {
            preventpropagate(e);
            return true;
        }
    }
    if (e.keyCode == 9) {
        if (srcElement.id == "BTN_CANCEL") {
            if (document.getElementById("oldpwd")) document.getElementById("oldpwd").focus();
            else document.getElementById("amtFmt").focus();
            preventpropagate(e);
            return false;
        } else {
            preventpropagate(e);
            return true;
        }
    }
}

function add2FunctionErrorList(errCode, errDesc) {
    funcErrList[errCode] = errDesc;
    return;
}

function fnReverseStr(str) {
    var retStr = "";
    var s = new String(str);
    for (i = s.length - 1; i >= 0; i--) {
        retStr = retStr + s.charAt(i);
    }
    return retStr;
}

function appendErrorCode(code, anyArg) {
    gErrCodes += code;
    if (anyArg != null && anyArg != "") {
        replaceStr += anyArg;
        replaceStr += "~";
    } else replaceStr += "~";
    gErrCodes += "~";
}

function fnFormatUnmask(obj) {
    if (obj && obj.value != "") {
        if (obj.getAttribute("MASK_ID")) {
            //var maskId = eval(obj.getAttribute("MASK_ID"));
            var fnEval = new Function(obj.getAttribute("MASK_ID"));  
            fnEval();
            window[obj.getAttribute]("MASK_ID");   
        } else {
            //var maskId = eval(obj.MASK_ID);
            var fnEval = new Function(obj.getAttribute("MASK_ID"));  
            fnEval();
        }
        var MASK_KEY_CHARS = "";
        for (var mi = 0; mi < maskId.length; mi++) {
            var maskCh = maskId.charAt(mi);
            if (maskCh != "#") {
                if (MASK_KEY_CHARS.indexOf(maskCh) == -1) {
                    MASK_KEY_CHARS = MASK_KEY_CHARS + maskCh;
                }
            }
        }
        var txtValMask = obj.value;
        var txtRe = new RegExp("[^" + MASK_KEY_CHARS + "]", "g");
        txtValMask = txtValMask.replace(txtRe, "#");
        if (maskId == txtValMask) {
            var txtValue = obj.value;
            var txtRegExp = new RegExp("[" + MASK_KEY_CHARS + "]", "g");
            txtValue = txtValue.replace(txtRegExp, "");
            obj.value = txtValue;
        } else {
            alert(mainWin.getItemDesc("LBL_INVALID_MASK"));
            return false;
        }
    }
}

/* Changes for AUTO_LOV start */
var autoRedCriteria = "";
// Fix for 16785126 starts
// added for Amount/Exchange Rate patterns starts
function fnCheckProductPickup(elem) {
    try{// for common lov like modulecode , element will be null;so added the try and catch //REDWOOD_CHANGES
    //if (elem.getAttribute("pickup_product") != null) { //REDWOOD_36877104
     if (elem.value != null && product_Default ==true) { //REDWOOD_36877104
        if (elem.getAttribute("pickup_product") != elem.value) {
            fnProductPickup();
            elem.setAttribute("pickup_product", elem.value);
		      	product_Default =false; //REDWOOD_36877104
        }
    }
    }catch(e){	 //REDWOOD_CHANGES
    }		 //REDWOOD_CHANGES
    
}

function fnCheckLOVReferredPickup(elem) {
    try{// for common lov like modulecode , element will be null;so added the try and catch //REDWOOD_CHANGES
    if (elem.getAttribute("RNAMES") != null) {
        if (elem.getAttribute("RNAMES") != elem.value) {
            processFields("", elem);
        }
    }
    }catch(e){ //REDWOOD_CHANGES
    }	//REDWOOD_CHANGES
}
// added for Amount/Exchange Rate patterns ends
function disp_auto_lov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, exactFetch, dispField, e) {//Exact Fetch changes
 if((typeof(callformTabArray) != "undefined") && typeof(callformTabArray[strScreenName + "__" +strCurrentTabId]) != "undefined") containerId = callformTabArray[strScreenName + "__" +strCurrentTabId];//12.2 callform change
    var product_pickup = false;
	  product_Default =false; //REDWOOD_36877104
    var related_lov = false;//LOV REFERRED_FIELDS changes
    var event = window.event || e;
    //var elem = getEventSourceElement(event); //Redwood_35067564 commented
    var elem = event.target;//OJET Migration //Redwood_35067564  Changes
    var customLov = "N";
    //Fix for Added for 16906908 --start
    if((elem.outerHTML.indexOf("validateInputNumber") != -1) && (!gIsValid)){
        return;     
    }
    //Fix for Added for 16906908 --end
    autoRedCriteria = elem.value;
    // lovSrcElem = getEventSourceElement(event);//REDWOOD_CHANGES
    lovSrcElem = event.target;//REDWOOD_CHANGES
    //lov change starts
    if (elem.getAttribute("RNAMES") != null) {//LOV REFERRED_FIELDS changes
        related_lov = true;
    }
   if (gAction == "NEW") {
       //REDWOOD_35200441 
         if (elem.getAttribute("pickup_product") == null) {
          var elem1 = getEventSourceElement(event);
         
       //REDWOOD_35200441 
        if (elem1.getAttribute("pickup_product") != null) { //REDWOOD_35200441 elem1 added
            if (elem1.getAttribute("pickup_product") != elem.value) { //REDWOOD_35200441 elem1 added
                product_pickup = true;
				        product_Default =true; //REDWOOD_36877104
            }
        }
    //REDWOOD_35322675
	    } else if (elem.getAttribute("pickup_product") != null) { 
                product_pickup = true;
				        product_Default =true; //REDWOOD_36877104
		}
		//REDWOOD_35322675
    }
    //pickup_product change ends
    if (hotKeyPressed) 
    {
      hotKeyPressed = false;
      return;
    }
    if (typeof (scrChild) != "undefined" && scrChild == "Y") 
    {   
	    //Fix for 19636394
        if (thirdChar != "S") 
        {
			//Fix for 19636394
          /*containerId = parentFunction.substring(2, 0) + "S" + parentFunction.substring(3, parentFunction.length)
        } 
        else 
        {*/
          containerId = parentFunction;
        }
    }
  
    //pickup_product change starts 
    if (mainWin.autoLovReqd != 'Y') 
    {
      if(product_pickup) {
        fnProductPickup();
         elem.setAttribute("pickup_product", elem.value);
      }  
	if (related_lov) {//LOV REFERRED_FIELDS changes
            processFields(event);
        }
      return;
    }
    
    if (typeof (lovInfoFlds) != "undefined") 
    {
        var cnt = 0;
        for (var i in lovInfoFlds[blockId + "__" + fieldName + "__" + lovId]) {
            cnt++;
        }
      //if (typeof (lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][3] != "undefined")) {
      if(cnt == 4) {
        if (lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][3] == "N") {
          isAutoLOVOpened = false;
          if(product_pickup) {
            fnProductPickup();
            elem.setAttribute("pickup_product", elem.value);
           
          }
		if (related_lov) {//LOV REFERRED_FIELDS changes
            processFields(event);
        }
          return;
        }
      }
    }
    //pickup_product change ends
    if (isLovOpen) return;
    
    if(elem.getAttribute("CUSTOMLOV")){
      customLov = elem.getAttribute("CUSTOMLOV");
    }
    /* Fix for 16883299 -Adding User and Branch field in CLRU */
	
	/* 12_0_3_RETRO_12_2_23651706 commenting starts
    if ( (gAction == "") && containerId != 'CLRU' && customLov != 'Y') { //21435432
        return;
    }
	12_0_3_RETRO_12_2_23651706 commenting ends */ 
	// 12_0_3_RETRO_12_2_23651706 starts
	//if ((gAction == "") && containerId != 'CLRU') { //Fix for 23334835 //9NT1606_12_4_RETRO_12_0_3_27143186
    if ((gAction == "") && containerId != 'CLRU' && location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) { //Fix for 23334835, 9NT1606_12_4_RETRO_12_0_3_27143186
        return;
    }
	// 12_0_3_RETRO_12_2_23651706 ends
   
    // if(autoRedCriteria=="") return ; 12_1_RETRO_12_2_24344226 commented
    
   
 	/* Fix for 17216155 Commented*/
    /* if (lovSrcElem.getAttribute("PREVAUTOLOVVAL") == lovSrcElem.value) {
        if(product_pickup) {
            fnProductPickup();
            elem.setAttribute("pickup_product", elem.value);
        }  
		if (related_lov) {//LOV REFERRED_FIELDS changes
            processFields(event);
        }
      return;
    }*/
    if (lovSrcElem.readOnly == true) {
        return;
    }
    
    var isME = "false";
    var singleView = "false";
    var maximize= "";/*fix for bug# 19619967*/
    //12.0.2 SFR#17194334 start
     if (!fnEventsHandler('fnPreDispLov_' + lovId, lovSrcElem)) return false; //Fix for 19698809	
    if ((lovScreenArgs['title'] != '') && (typeof(lovScreenArgs['title']) != "undefined")){
      title = lovScreenArgs['title'];
    }
    //12.0.2 SFR#17194334 end
    appendData();
    //if (!mainWin.isSessionActive()) return; session expiry change 
    var lovType = 'Y'; 
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) {
	isME = isMultipleEntry(blockId);/*12.0.4 UI performance changes starts*/
    if(isME=='true') {
         recordNum = getRowIndex(e) - 1;
         if (recordNum >= 0) fnMulipleEntryRow_onClick(event); //Fix for 17253824 
         lovBlockObj = getTableObjForBlock(blockId);
    }    /*12.0.4 UI performance changes ends*/
    
        /*for (var i = 0; i < multipleEntryIDs.length; i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
				if (recordNum >= 0) fnMulipleEntryRow_onClick(event); //Fix for 17253824 
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }*/
    }
    if (recordNum < 0) recordNum = 0;
    //Fix for 21040572   //21455504 starts
	if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("VIEW")) { //REDWOOD_35307988 
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("VIEW") == "SE") { //REDWOOD_35307988 
            isME = "false";
            recordNum = 0;
        }
    } //21455504 ends

    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
        singleView = "true";
        recordNum = 0;
    }

    if (functionId == "CSCFNUDF") {
        if (blockId == "BLK_UDF_DETAILS_VIEW") {
			//9NT1606_14_1_RETRO_12_3_28117810 Starts
			var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FLDNAM")); 
            fieldNameDesc = fieldName.substring(0,fieldName.length-udfFldLength)+'DESC'+udfNo;
            //udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(fieldName.substring(fieldName.length - 1)) + 1) + "']/FLDNAM"));
             //Udf fld desc change
            //fieldNameDesc = fieldName.substring(0,fieldName.length-1)+'DESC'+fieldName.substring(fieldName.length-1);
			//9NT1606_14_1_RETRO_12_3_28117810 Ends
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";/*12.0.4 UI performance changes */
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1] = lovInfoFlds["BLK_UDF_DETAILS__FLDVAL__"+lovId][1];/*12.0.4 UI performance changes */
            lovKey = blockId + "__" + fieldName + "__" + lovId;
            lovRet = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            lovBnd = lovInfoFlds["BLK_UDF_DETAILS__FLDVAL__"+lovId][1];
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
            //retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            //bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_UDF_DETAILS__FLDVAL__"+lovId];
           //Udf fld desc change 
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        } else udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + dbIndexArray["BLK_UDF_DETAILS"] + "']/FLDNAM"));
        //12.0.2 udf changes for CSCTRUDF start
    //} else if (functionId == "CSCTRUDF" || functionId =='PXCTRUDF') { //FCUBS_12.3Payments_UDF_Changes  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430 commenting
	} else if (functionId == "CSCTRUDF") {  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
      //  udfLovId = document.getElementsByName("FLDNAME")[recordNum].value;
       if (blockId == "BLK_UDF_DETAILS_VIEW") {
			//9NT1606_14_1_RETRO_12_3_28117810 Starts
			var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_TXN_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FLDNAME")); 
            fieldNameDesc = fieldName.substring(0,fieldName.length-udfFldLength)+'DESC'+udfNo;
            //udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_TXN_UDF_DETAILS[@ID='" + (Number(fieldName.substring(fieldName.length - 1)) + 1) + "']/FLDNAM"));
			//Udf fld desc change
            //fieldNameDesc = fieldName.substring(0,fieldName.length-1)+'DESC'+fieldName.substring(fieldName.length-1);
			//9NT1606_14_1_RETRO_12_3_28117810 Ends
           // lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~"; /*12.0.4 UI performance changes */
            //lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1] = lovInfoFlds["BLK_TXN_UDF_DETAILS__FLDVAL__"+lovId][1];/*12.0.4 UI performance changes */
            lovKey = blockId + "__" + fieldName + "__" + lovId;
            lovRet = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~"; 
            lovBnd = lovInfoFlds["BLK_TXN_UDF_DETAILS__FLDVAL__"+lovId][1];
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
            //retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~"+blockId + "__" + fieldNameDesc+"~";
            //bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_TXN_UDF_DETAILS__FLDVAL__"+lovId];
           //Udf fld desc change  
		   dbIndexArray["BLK_TXN_UDF_DETAILS"] = Number(fieldName.substring(6)) + 1;
        } else udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_TXN_UDF_DETAILS[@ID='" + dbIndexArray["BLK_TXN_UDF_DETAILS"] + "']/FLDNAM"));
    }
    //12.0.2 udf changes for CSCTRUDF end
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }

    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") { //9NT1606_12_2_RETRO_12_1_23664151 changes
        /*Fix for 19698809 Starts*/
        if(blockId == "BLK_UDF_DETAILS_VIEW") {
            var udfNo = fieldName.substring(fieldName.length-3);
            var udfFldLength = 3;
            if (isNaN(udfNo)){
                udfNo = fieldName.substring(fieldName.length-2);
                udfFldLength = 2;
            }
            if (isNaN(udfNo)) {
                udfNo = fieldName.substring(fieldName.length-1); 
                udfFldLength = 1;
            }
            udfLovId = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[@ID='" + (Number(udfNo) + 1) + "']/FIELD_NAME"));     
            dbIndexArray["BLK_UDF_DETAILS"] = Number(fieldName.substring(6))+1;
            //retflds[blockId + "__" + fieldName + "__" + lovId] = blockId + "__" + fieldName + "~" + blockId + "__FIELD_DESC" + Number(fieldName.substring(6)) + "~";
            //bndFlds[blockId + "__" + fieldName + "__" + lovId] = bndFlds["BLK_UDF_DETAILS__FIELD_VALUE__"+lovId];			
            lovKey = blockId + "__" + fieldName + "__" + lovId;
            lovRet = blockId + "__" + fieldName + "~" + blockId + "__FIELD_DESC" + Number(fieldName.substring(6)) + "~"; 
            lovBnd = lovInfoFlds["BLK_UDF_DETAILS__FIELD_VALUE__"+lovId][1]; //Fix for 30301319			
            lovInfoFlds [lovKey] = {};
            lovInfoFlds [lovKey][0] = lovRet;
            lovInfoFlds [lovKey][1] = lovBnd;
        } 
        /*Fix for 19698809 Ends*/
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
    }
    
    /*fix for bug# 19619967 start*/
    if (typeof(lovMax)!="undefined" && typeof(lovMax[blockId + "__" + fieldName + "__" + lovId])!="undefined" && lovMax[blockId + "__" + fieldName + "__" + lovId] == "Y") {
        maximize = "Y";
    }
    /*fix for bug# 19619967 end*/
    //Fix for 17040616	start
    if((typeof(lovScreenArgs["CUBE_ENTITY"]) != "undefined") && (lovScreenArgs["CUBE_ENTITY"] = true)){
      var tempLovId= "";
       if (udfLovId != "") {
          tempLovId = udfLovId + "-LOV_CUBEENTITY";
       }
       else{
          tempLovId = lovId + "-LOV_CUBEENTITY";
       }
	   tempLovId = replaceAllChar(tempLovId,"#","_HASH_"); //9NT1606_12_3_RETRO_12_0_3_25402719 changes 
    }
     //Fix for 17040616	end
    FieldLabel = replaceAllChar(FieldLabel,"/","_SLH_");//Fix for 19412812 
	//Fix for 22973701 starts
    FieldLabel = replaceAllChar(FieldLabel,"#","_HASH_");
    title = replaceAllChar(title,"#","_HASH_");
    //Fix for 22973701 ends
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
   /*Fix for 17040616	start
   if (udfLovId != "") l_Params += "&lovId=" + udfLovId;
    else l_Params += "&lovId=" + lovId;
    */
    if(tempLovId != undefined)l_Params += "&lovId=" + tempLovId;
    else l_Params += "&lovId=" + lovId;
    //Fix for 17040616	end
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;
    l_Params += "&maximize=" + maximize; /*fix for bug# 19619967*/

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
   
    if (blockId != '') {
        if(customLov == 'Y' && typeof(fromAdvanced)!='undefined' && fromAdvanced == 'true'){
          if (typeof (lovInfoFlds[lovId]) == "undefined")
            lovInfoFlds[lovId] = {};   
   
            lovInfoFlds[lovId][0] = lovSrcElem.getAttribute("id")+"~";
           returnFlds = lovInfoFlds[lovId][0];
        }else{
          returnFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0];
        }
        var bindFlds = lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");
        //returnFlds = retflds[blockId + "__" + fieldName + "__" + lovId];
        //var bindFlds = bndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        if (bindFlds[0] != "") {
            for (var i = 0; i < bindFlds.length; i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
                    //bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";/* security fixes for WF */
					/*Bug_31534120 Starts*/
                    //bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
					if(bindStr[1] != 'DATE')
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
                    else
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "###DATE"+"|";
                    /*Bug_31534120 Ends*/
                } else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    } else {
        //returnFlds = retflds[lovId];
        returnFlds = lovInfoFlds[lovId][0];/*12.0.4 UI performance changes */
        
    }
      //SFR:17439180 : SFR Fixes for 17176008 starts
    if (typeof(bindFldsStr) != "undefined" &&bindFldsStr != null && bindFldsStr!="") {
      bindFldsStr =  replaceAllChar(bindFldsStr, "/", "_SLH_");
      bindFldsStr = replaceAllChar(bindFldsStr, "#", "_HASH_");//fix for 17378652
      bindFldStr = replaceAllChar(bindFldsStr, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  bindFldsStr = replaceAllChar(bindFldsStr, "(", "_OPARAN_");
	  bindFldsStr = replaceAllChar(bindFldsStr, ")", "_CPARAN_");
	  bindFldsStr = replaceAllChar(bindFldsStr, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
    }
     //SFR:17439180 : Fixes for 17176008 ends
    var orderBy = "";
    if (typeof (autoRedCriteria) == "undefined" || autoRedCriteria == "" || autoRedCriteria == null) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0; i < field_namesArr.length - 1; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length; j++) {
                    if (getInnerText(lovBlkObj[j]) != " ") {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[0]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                } else {
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
								if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                            } else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
							//Fix for 20073044 starts
                            if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
                                lovFldObj = lovBlkObj[j].children[0].children[1];
                            }
                            //Fix for 20073044 ends
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                        }
                    }
                }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    document.getElementById(field_namesArr[i]).value = "";
                   // if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                   fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        //if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                        fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                    }
                }
            }
        }
        return false;
    }

   //Fix for 17040616 start
   // var flag = getAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, lovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME);
   if(customLov == 'Y' && typeof(fromAdvanced)!='undefined' && fromAdvanced == 'true'){
     fId_old = functionId;
     functionId = containerId;
   }
    var flag;
   if(tempLovId != undefined){
   flag = getAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, tempLovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME , "", customLov);//Exact Fetch changes
  }
  else{
   flag = getAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, lovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME, "", customLov);//Exact Fetch changes
  }
  
	/*12_1_RETRO_12_2_24444650 Starts*/
	if(flag && (functionId == "CSCFNUDF" || functionId == "CSCTRUDF"|| functionId == "UDCD")){
		getEventSourceElement(event).value ="";
	}
	/*12_1_RETRO_12_2_24444650 Ends*/
  if(customLov == 'Y' && typeof(fromAdvanced)!='undefined' && fromAdvanced == 'true'){
    functionId= fId_old;
   }
    //Fix for 17040616 end
   //pickup_product change starts
    if(!flag){
      if(product_pickup){
        fnProductPickup();
         elem.setAttribute("pickup_product", elem.value);
      }
	  if (related_lov) {//LOV REFERRED_FIELDS changes
            processFields(event);
       }
    }
    // Fix for 16785126 ends
    //pickup_product change ends
    isAutoLOVOpened = false;
    if(flag && "Y" == exactFetch){       
	    focusReqd = false;
	    focusField = dispField;
	    alert(mainWin.getItemDesc("LBL_EXACT_FETCH"));
	    dispField.value = "";    
	    return false;
    }
   //Fix for 18678458 -Exact Fetch changes ends
    if (flag) {
        redValue = autoRedCriteria;
        isAutoLOVOpened = true;
       
        if (getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")) == "") {
            l_Params += "&autoLovResp=" + "";
            l_Params += "&pageCount=" + "";
        } else {
            var intTotPgs = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//TOTALPAGES"));
            var fldList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//FLDLIST"));
            var redFldTypeList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDFLDTYPELIST"));
            var lblList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//LABELLIST"));
            var redLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDLIST"));
            var vLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//VLIST"));
			lblList = replaceAllChar(lblList, "/", "_SLH_");//Fix for 19412812 
            if (intTotPgs == 0) intTotPgs = 1;
            else intTotPgs = intTotPgs;
            l_Params += "&pageCount=" + intTotPgs;
            // l_Params+="&AUTOLovResult="+getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
/* security fixes for WF starts */
            l_Params += "&fldList=" + replaceTilde(fldList);
            l_Params += "&redFldTypeList=" + replaceTilde(redFldTypeList);
            l_Params += "&lblList=" + replaceTilde(lblList);
            l_Params += "&redLIst=" + replaceTilde(redLIst);
            l_Params += "&vLIst=" + replaceTilde(vLIst);
/* security fixes for WF Ends*/
            AUTOLovResult = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
        }
        l_Params += "&bindFldsStr=" + bindFldsStr;
        l_Params += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
        isLovOpen = true;
        mask();
        loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
        //  fnEventsHandler('fnPostDispLov_' + lovId);
    }
}

function disp_auto_offlinelov(containerId, blockId, fieldName, FieldLabel, lovId, title, columnHeaders, rednFldInfo, e) {
    if((typeof(callformTabArray) != "undefined") && typeof(callformTabArray[strScreenName + "__" +strCurrentTabId]) != "undefined") containerId = callformTabArray[strScreenName + "__" +strCurrentTabId];//12.2 callform change
    if (hotKeyPressed) {
        hotKeyPressed = false;
        return;
    }
    if (mainWin.autoLovReqd != 'Y') return;
    if (isLovOpen) return;

    if (dbDataDOM == null || gAction == "") {
        return;
    }
    var event = window.event || e;
    var elem = getEventSourceElement(event);
    autoRedCriteria = elem.value;
    lovSrcElem = getEventSourceElement(event);
	/* Fix for 17216155 Commented*/
    /*if (lovSrcElem.getAttribute("PREVAUTOLOVVAL") == lovSrcElem.value) {
        return;
    }*/
    if (lovSrcElem.readOnly == true) {
        return;
    }
    /*if (blockId != "" && selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName) != null) {
        if (getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(blockId)+"[@ID="+dbIndexArray[blockId]+"]/"+fieldName)) == lovSrcElem.value)
            return;
    }*/
    var isME = "false";
    var singleView = "false";
    var maximize="";/*fix for bug# 19619967*/
    appendData();
   // if (!mainWin.isSessionActive()) return; session expiry change 
    var lovType = 'N';
    recordNum = 0;
    bindFldsStr = "";
    var udfLovId = "";
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") == -1) {
	isME = isMultipleEntry(blockId);/*12.0.4 UI performance changes starts */
        if(isME=='true') {
            recordNum = getRowIndex(e) - 1;
            lovBlockObj = getTableObjForBlock(blockId);
        }  /*12.0.4 UI performance changes ends*/
        /*for (var i = 0; i < multipleEntryIDs.length; i++) {
            if (blockId == multipleEntryIDs[i]) {
                recordNum = getRowIndex(e) - 1;
                lovBlockObj = getTableObjForBlock(blockId);
                isME = "true";
                break;
            }
        }*/
    }
    if (recordNum < 0) recordNum = 0;

    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") != -1) {
        singleView = "true";
        recordNum = 0;
    }
    if (document.getElementById(blockId + "__" + fieldName) && document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.getAttribute("VIEW")) {
        if (document.getElementById(blockId + "__" + fieldName).parentNode.parentNode.VIEW == "SE") {
            isME = "false";
            recordNum = 0;
        }
    }
    if (title == "") {
        title = mainWin.getItemDesc("LBL_LIST_OF_VALUES") + " " + FieldLabel;
    }
    screenType = mainWin.gActiveWindow.screenType;
    if (screenType == "WB") {
        uiXML = mainWin.gActiveWindow.uiXML;
        containerId = uiXML.substring(0, uiXML.indexOf(".", 0));
		//9NT1606_12_4_RETRO_12_1_26195245 starts
		if(containerId=='ASSIGN')
			containerId='COMMON';
		//9NT1606_12_4_RETRO_12_1_26195245 starts
    }
    FieldLabel = replaceAllChar(FieldLabel,"/","_SLH_");//Fix for 19412812 
	//Fix for 22973701 starts
    FieldLabel = replaceAllChar(FieldLabel,"#","_HASH_");
    title = replaceAllChar(title,"#","_HASH_");
    //Fix for 22973701 ends
    var l_Params = "title=" + title;
    l_Params += "&SourceCode=" + "FLEXCUBE"
    l_Params += "&containerId=" + containerId;
    l_Params += "&blockId=" + blockId;
    l_Params += "&fldName=" + fieldName;
    l_Params += "&FieldLabel=" + FieldLabel;
    if (udfLovId != "") l_Params += "&lovId=" + udfLovId;
    else l_Params += "&lovId=" + lovId;
    l_Params += "&screentype=" + screenType;
    l_Params += "&lovType=" + lovType;
    l_Params += "&isME=" + isME;
    l_Params += "&singleView=" + singleView;
    l_Params += "&maximize" + maximize;/*fix for bug# 19619967*/

    if (typeof (g_txnBranch) == "undefined") {
        l_Params += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        l_Params += "&txnBranch=" + g_txnBranch;
    }
    /*if(typeof(txnBranchUC)!="undefined"){
        l_Params +="&txnBranchUC="+txnBranchUC;
    }*/
    if (typeof (autoRedCriteria) != "undefined") {
        redValue = autoRedCriteria;
    } else {
        redValue = "";
    }
    if (blockId != '') {
        //returnFlds = offlineRetflds[blockId + "__" + fieldName + "__" + lovId];
        //var bindFlds = offlineBndFlds[blockId + "__" + fieldName + "__" + lovId].split("~");
        returnFlds = offlineLovInfoFlds[blockId + "__" + fieldName + "__" + lovId][0];/*12.0.4 UI performance changes  */
        var bindFlds = offlineLovInfoFlds[blockId + "__" + fieldName + "__" + lovId][1].split("~");/*12.0.4 UI performance changes  */
        if (bindFlds[0] != "") {
            for (var i = 0; i < bindFlds.length; i++) {
                var bindStr = bindFlds[i].split("!");
                var bindFldBlkName = bindStr[0].substring(0, bindStr[0].lastIndexOf("__"));
                var bindFldName = bindStr[0].substring(bindStr[0].lastIndexOf("__") + 2, bindStr[0].length);
                if (dbDataDOM != null && selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName) != null) {
					/*Bug_31534120 Starts*/
                    //bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, "//" + bindFldBlkName + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "~";
					if(bindStr[1] != 'DATE')
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "|";
                    else
                        bindFldsStr += getNodeText(selectSingleNode(dbDataDOM, getXPathQuery(bindFldBlkName) + "[@ID=" + dbIndexArray[bindFldBlkName] + "]/" + bindFldName)) + "###DATE"+"|";
                    /*Bug_31534120 Ends*/
                } else {
                    bindFldsStr = getUIFldBindVal(bindStr, bindFldBlkName, bindFldName, bindFldsStr, singleView);
                }
            }
            bindFldsStr = bindFldsStr.substring(0, bindFldsStr.length - 1);
        }
    } else {
        //returnFlds = offlineRetflds[lovId];
        returnFlds = offlineLovInfoFlds[lovId][0];/*12.0.4 UI performance changes */
    }

    var orderBy = "";
    if (typeof (autoRedCriteria) == "undefined" || autoRedCriteria == "" || autoRedCriteria == null) {
        var field_namesArr = returnFlds.split("~");
        var field_names_recNum = parseInt(recordNum, 10);
        for (var i = 0; i < field_namesArr.length - 1; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length; j++) {
                    if (getInnerText(lovBlkObj[j]) != " ") {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[0]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                } else {
                                    lovFldObj = lovBlkObj[j].children[0].children[0];
                                }
                            } else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                        }
                    }
                }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    document.getElementById(field_namesArr[i]).value = "";
                    if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) getNextSibling(document.getElementById(field_namesArr[i])).value = "";
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        document.getElementsByName(fldName)[field_names_recNum].value = "";
                        if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = "";
                    }
                }
            }
        }
        return false;
    }
    var flag = getOfflineAutoLovResults("FLEXCUBE", functionId, blockId, fieldName, lovId, bindFldsStr, orderBy, lovType, recordNum, containerId, autoRedCriteria, isME); //12_1_RETRO_12_2_23664574
    isAutoLOVOpened = false;
    if (flag) {
        redValue = autoRedCriteria;
        isAutoLOVOpened = true;
        if (typeof (lovInfoFlds) != "undefined") {
            var cnt = 0;
            for (var i in lovInfoFlds[blockId + "__" + fieldName + "__" + lovId]) {
                cnt++;
            }
            //if (typeof (lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][3] != "undefined")) {
            if(cnt == 4) {
                if (lovInfoFlds[blockId + "__" + fieldName + "__" + lovId][3] == "N") {
                    isAutoLOVOpened = false;
                    return;
                }
            }
        }
        if (getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")) == "") {
            l_Params += "&autoLovResp=" + "";
            l_Params += "&pageCount=" + "";
        } else {
            var intTotPgs = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//TOTALPAGES"));
            var fldList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//FLDLIST"));
            var redFldTypeList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDFLDTYPELIST"));
            var lblList = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//LABELLIST"));
            var redLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//REDLIST"));
            var vLIst = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//VLIST"));

            if (intTotPgs == 0) intTotPgs = 1;
            else intTotPgs = intTotPgs;
            l_Params += "&pageCount=" + intTotPgs;
            // l_Params+="&AUTOLovResult="+getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
           /* security fixes for WF starts */
            l_Params += "&fldList=" + replaceTilde(fldList);
            l_Params += "&redFldTypeList=" + replaceTilde(redFldTypeList);
            l_Params += "&lblList=" + replaceTilde(lblList);
            l_Params += "&redLIst=" + replaceTilde(redLIst);
            l_Params += "&vLIst=" + replaceTilde(vLIst);
            l_Params += "&signonSerial=" + mainWin.SignonSerial;//Logging changes
        /* security fixes for WF Ends*/

            AUTOLovResult = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA"));
        }
        l_Params += "&bindFldsStr=" +replaceTilde(bindFldsStr);/* security fixes for WF */
        isLovOpen = true;
        //mask(); //REDWOOD_CHANGES
        loadSubScreenDIV("ChildWin", "ExtLovDef.jsp?" + l_Params);
    }
}

var AUTOLovRequestDOM = null;
var AUTOLovResponseDOM = null;

function getAutoLovResults(source, functionId, blockId, fldName, lovId, bindFlds, orderBy, lovType, recNum, containerId, redCriteria, isME,exactFetch, customLov) {//Exact Fetch changes
    inDate = setActionTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var cnt = 0;
    var serverURL = "ExtLovFetchData?";
    var labelArrLength = "1";
    serverURL += "Source=" + source;
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    serverURL += "&functionId=" + containerId;
    serverURL += "&blockId=" + blockId;
    serverURL += "&fldName=" + fldName;
    serverURL += "&lovId=" + lovId;
	
	// 12_1_RETRO_12_2_24444650 starts
	if(functionId == "CSCFNUDF" || functionId == "CSCTRUDF"|| functionId == "UDCD"){
		lovId ="LOV_UDF";
	}
	// 12_1_RETRO_12_2_24444650 ends
    redCriteria = replaceChar(redCriteria);/* security fixes for WF */
    /*SFR:17439180 : Fix for 17351640 starts*/
	//Fix for 18678458 -Index Basedsearch changes start
    var indexRequired = "";
    var minIndexLength = "";
    var filedIndexValue = "";
    var reductionValue = "";
    var countIndexField = 0;
    var firstIndexField = 0;
     //if((parent.lovInfoFlds != "undefined") && (typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    //(typeof(parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    if((lovInfoFlds != "undefined") && (typeof(lovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    (typeof(lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    //var indexFieldList= parent.lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].split("~");
    var indexFieldList= lovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].split("~");
    for(var i=0; i<1 ;i++){
      filedIndexValue=indexFieldList[i];
      var tmp_redCriteria = replaceAll(redCriteria,"_PCT_","");
      if(filedIndexValue.indexOf("!") != -1){
        indexRequired=filedIndexValue.split("!")[0];
        minIndexLength=filedIndexValue.split("!")[1];
         if("Y" == indexRequired && firstIndexField == 0){
           firstIndexField=i+1;
         }
        if("Y" == indexRequired && (tmp_redCriteria.length) < minIndexLength){
          countIndexField++;
        }else  if("Y" == indexRequired && (tmp_redCriteria.length) >= minIndexLength){
        countIndexField = 0;
        break;
        }
      }
    }
    if(countIndexField >0){
      parent.alert(parent.mainWin.getItemDesc("LBL_INDEX_ALERT_AUTOLOV"));    
      dispField.value ="";
      return false;
    }
    }
//Fix for 18678458 -Index Basedsearch changes end
    if (typeof(redCriteria) != "undefined" && redCriteria != null && redCriteria!="") {
      var tempRedCriteria = redCriteria;
      tempRedCriteria = replaceAllChar(tempRedCriteria, "/", "_SLH_");
      tempRedCriteria = replaceAllChar(tempRedCriteria, "#", "_HASH_");//fix for 17378652
      tempRedCriteria = replaceAllChar(tempRedCriteria,  "&", "_AMP_"); //fix for 18312338
      tempRedCriteria = replaceAllChar(tempRedCriteria,  ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempRedCriteria = replaceAllChar(tempRedCriteria, "(", "_OPARAN_");
	  tempRedCriteria = replaceAllChar(tempRedCriteria, ")", "_CPARAN_");
	  tempRedCriteria = replaceAllChar(tempRedCriteria, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      serverURL += "&RedFldNames=" + tempRedCriteria;
      var fldNameIndex = 0;       // Reduction fld postion change   start
      var lovParentFldID  = blockId + "__" + fldName;
      var lovInfoArr =  lovInfoFlds[lovParentFldID + "__" + lovId][0].split("~");
      for(var cnt = 0; cnt < lovInfoArr.length; cnt++){
      if(lovParentFldID == lovInfoArr[cnt]){
        fldNameIndex = cnt;
        break;
      }
    }
       serverURL += "&RedFldIndex=" + fldNameIndex; // Reduction fld postion change  end
    }
    else{
      serverURL += "&RedFldNames=" + redCriteria; 
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/
    /* security fixes for WF */
     if (typeof(orderBy) != "undefined" && orderBy != null && orderBy!="") {
        if(orderBy.indexOf(">")!=-1){
            var re = new RegExp(">", "g");
            orderBy = orderBy.replace(re, "!");
        }
    }
    serverURL += "&orderBy=" + orderBy;
     //SFR:17439180 : Fixes for 17176008 starts
    if (typeof(bindFlds) != "undefined" && bindFlds != null && bindFlds!="") {
      var tempbindFlds = replaceAllChar(replaceTilde(bindFlds), "/", "_SLH_");
      tempbindFlds = replaceAllChar(tempbindFlds, "#", "_HASH_");//fix for 17378652
      tempbindFlds = replaceAllChar(tempbindFlds, ",", "_COMMA_");//Fix for 19274447
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Starts
	  tempbindFlds = replaceAllChar(tempbindFlds, "(", "_OPARAN_");
	  tempbindFlds = replaceAllChar(tempbindFlds, ")", "_CPARAN_");
	  tempbindFlds = replaceAllChar(tempbindFlds, "+", "_PLUS_");
	  //9NT1606_12_4_RETRO_12_0_3_26861671 Ends
      serverURL += "&bndVar=" + replaceTilde(tempbindFlds);
    
    }
    else{
      serverURL += "&bndVar=" + replaceTilde(bindFlds); 
    }
     //SFR:17439180 : Fixes for 17176008 ends
    serverURL += "&fetchSize=25";
    serverURL += "&columnList=" + labelArrLength;
    serverURL += "&containerId=" + containerId;
    serverURL += "&fieldName=" + fldName;
    serverURL += "&screenType=" + mainWin.gActiveWindow.screenType;
    serverURL += "&TotalPages=";
    serverURL += "&CurPage=1";
    serverURL += "&lovType=" + lovType;
    serverURL += "&exactFetch=" + exactFetch;//Exact Fetch changes
    //serverURL += "&seqNo=" + getSeqNo();//Logging changes
    serverURL += "&isAutoLOV=Y";//Logging changes
    serverURL += "&customLov=" + customLov;//Logging changes
    if (typeof (g_txnBranch) == "undefined") {
        serverURL += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        serverURL += "&txnBranch=" + g_txnBranch;
    }
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", encodeURI(serverURL), false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    //Performance Changes  
    var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(AUTOLovRequestDOM);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 starts
    catch(exp){
          mainWin.handleNetWorkErr(exp);
        }  //9NT1606_12_2_RETRO_12_0_3_21182929 ends 
    //Performance Changes
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
    AUTOLovResponseDOM = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var field_namesArr = returnFlds.split("~");
    var field_names_recNum = parseInt(recNum, 10);
    var fieldValuesArr = new Array();
    //var resAutoValue = getNodeText(AUTOLovResponseDOM.childNodes[0]).split("!");
    var resAutoValue = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")).split("!");
   // appendDebug(AUTOLovResponseDOM); //Logging changes
    
    var resValue = resAutoValue[0].split("~");
    for (var i = 0; i < resValue.length - 1; i++) {
        var resValue = resAutoValue[0].split("~");
	
     for (var j = 0; j < resValue.length - 1; j++) {
        // changes for Desc field with & //
		/*Fix for 18018596 Starts*/
		if(resValue[j].indexOf("_EXCL_") != -1){//12.0.3 citi_dev fix start
          resValue[j] =  replaceAll(resValue[j], "_EXCL_", "!"); //	12.0.3 citi_dev fix for ME LOV issue
        }//12.0.3 citi_dev fix end
		/*Fix for 18018596 Ends*/
		fieldValuesArr[j] = resValue[j];
        //fix for bug 17908885 starts // 
        if (resValue[j].indexOf("&amp;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j], "&amp;", "&");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&apos;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j],"&apos;", "'");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&lt;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j], "&lt;", "<");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&gt;") != -1) {
            fieldValuesArr[j] = replace(resValue[j],"&gt;", ">");//	12.0.3 citi_dev fix for ME LOV issue
        }
        //fix for bug 17908885 ends // 
     }
    }
    if (resAutoValue == "" || resAutoValue.length > 2) {
        var cnt = 0;
        for (var i in lovInfoFlds[blockId + "__" + fldName + "__" + lovId]) {
            cnt++;
        }
        //if ( (typeof (lovInfoFlds) != "undefined" && typeof (lovInfoFlds[blockId + "__" + fldName + "__" + lovId][3]) == "undefined") || (typeof (lovInfoFlds) != "undefined" && typeof (lovInfoFlds[blockId + "__" + fldName + "__" + lovId][3]) != "undefined" && lovInfoFlds[blockId + "__" + fldName + "__" + lovId][3] == "Y")) {
        if ( (typeof (lovInfoFlds) != "undefined" && cnt == 4) || (typeof (lovInfoFlds) != "undefined" && cnt == 4 && lovInfoFlds[blockId + "__" + fldName + "__" + lovId][3] == "Y")) {
            for (var i = 0; i < field_namesArr.length - 1; i++) {
                var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
                if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
                if (isME == 'true') {
                    var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells; 
//REDWOOD_CHANGES
                    //for (var j = 0; j < lovBlkObj.length - 1; j++) {
                    for (var j = 0; j < lovBlkObj.length ; j++) {
                        var lovFldObj = "";
                        var tempTdElem = lovBlkObj[j]; //Static fix start
                        if(tempTdElem.children.length > 0 && tempTdElem.children[0].tagName == "DIV"){
                          tempTdElem = tempTdElem.children[0];
                        }
                        /*
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[1]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                } else {
                                    lovFldObj = lovBlkObj[j].children[0].children[1];
                                }
								if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                            } else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
							//Fix for 20073044 starts
						    if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
							    lovFldObj = lovBlkObj[j].children[0].children[1];
						    }
						    //Fix for 20073044 ends
                        }
                        */
                        if (tempTdElem.children.length > 0) { 
                                if (!tempTdElem.children[1]) {
                                    lovFldObj = tempTdElem.children[0].children[0];
                                    if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined || lovFldObj.type.toUpperCase() == "CHECKBOX") {
                                        lovFldObj = tempTdElem.children[0]; 
                                    }
                                } else {
                                    lovFldObj = tempTdElem.children[0];
                                }
                                 if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
                                    lovFldObj = tempTdElem.children[1]; 
                                }
                        }
                        var lovObjFldName = lovFldObj.getAttribute("name") || lovFldObj.name ;
                        if (lovObjFldName == fldName) {
                       // if (lovFldObj.name == fldName) { 
//REDWOOD_CHANGES
                            lovFldObj.value = "";
                            lovFldObj.refresh(); //REDWOOD_CHANGES
                            //Fix for Added for 16906908 
                            var fieldHtml = getOuterHTML(lovFldObj);
                              if ((fieldHtml.indexOf("displayAmount") != -1)  || ((fieldHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldHtml.indexOf("displayDate") != -1) )){
                                 getNextSibling(getNextSibling(lovFldObj)).value = "";
                              }
							fireHTMLEvent(lovFldObj, "onpropertychange"); //19224295
                        }
                    }
                } else {
                    if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
//REDWOOD_CHANGES
                         if( document.getElementById(field_namesArr[i]).tagName.toUpperCase()=='OJ-INPUT-NUMBER'){
                            document.getElementById(field_namesArr[i]).value = null;
                         }  
                         else if (document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SWITCH') 
                        {
                            if (typeof (document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                                if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y' ) {
                                    document.getElementById(field_namesArr[i]).value = true;
                                }
                                else {
                                    document.getElementById(field_namesArr[i]).value = false;
                                }
                            }
                            else {
                                if (fieldValuesArr[i] == 'Y') {
                                    document.getElementById(field_namesArr[i]).value = true;
                                }
                                else {
                                    document.getElementById(field_namesArr[i]).value = false;
                                }
                            }
                        } 
                         else{ 
//REDWOOD_CHANGES
                        document.getElementById(field_namesArr[i]).value = "";
                        document.getElementById(field_namesArr[i]).refresh(); //REDWOOD_CHANGES
                         }
                         
                       //Fix for Added for 16906908
						 var fieldHtml = getOuterHTML(document.getElementById(field_namesArr[i]));
                        if ((fieldHtml.indexOf("displayAmount") != -1)  || ((fieldHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldHtml.indexOf("displayDate") != -1) ))
                        {
                          getNextSibling(getNextSibling(document.getElementById(field_namesArr[i]))).value = "";
                        }
						fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                    
                    } else if (fldName != "" && document.getElementsByName(fldName)) {
                        if (document.getElementsByName(fldName).length > 0) {
                            document.getElementsByName(fldName)[field_names_recNum].value = "";
                            //Fix for Added for 16906908
                            var fieldNameHtml = getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]);
                            if ((fieldNameHtml.indexOf("displayAmount") != -1)  || ((fieldNameHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldNameHtml.indexOf("displayDate") != -1) ))
                        {
                           getNextSibling(getNextSibling(document.getElementsByName(fldName)[field_names_recNum])).value = "";
                        }
						fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                        }
                    }
                }
            }
        }
        if (resAutoValue == "") autoRedCriteria = "";
       // fnpostAction('EXTLOVDATA',AUTOLovResponseDOM);
        return true;
    } else {
        for (var i = 0; i < field_namesArr.length - 1; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
            //if (isME == 'true') { //Redwood_35390185
			  if (isME == 'true' && fldName != '' && fldName != 'undefined') { //Redwood_35390185				
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length; j++) {  //REDWOOD_CHANGES
                    var lovFldObj = "";
                    if (lovBlkObj[j].children.length > 0) {
                        if (!lovBlkObj[j].children[1]) {	 
//REDWOOD_CHANGES
//                        lovFldObj = getElementsByOjName(fldName,lovBlkObj[j])[0];
                          lovFldObj = getElementsByOjName(fldName,null,blockId,recordNum)[0];
//                            if (!lovBlkObj[j].children[0].children[1]) {
//                                lovFldObj = lovBlkObj[j].children[0];
//                            } else {
//                                lovFldObj = lovBlkObj[j].children[0].children[0];
//                            }
//	if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
//REDWOOD_CHANGES
                        } else {
                            lovFldObj = lovBlkObj[j].children[1];
                        }
						//Fix for 20073044 starts
						if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
							lovFldObj = lovBlkObj[j].children[0].children[1];
						}
						//Fix for 20073044 ends
                    }
                    if (lovFldObj.name == fldName) {
                        lovFldObj.value = fieldValuesArr[i];
                         fireHTMLEvent(lovFldObj, "onpropertychange");//19224295
                        if (lovFldObj.type && lovFldObj.type.toUpperCase() == 'CHECKBOX') {//REDWOOD_CHANGES
                            if (typeof (lovFldObj.getAttribute("ON")) != "undefined") {
                                if (lovFldObj.getAttribute("ON") == fieldValuesArr[i]) {
                                    lovFldObj.checked = true;
                                } else {
                                    lovFldObj.checked = false;
                                }
                            } else {
                                if (fieldValuesArr[i] == 'Y') {
                                    lovFldObj.checked = true;
                                } else {
                                    lovFldObj.checked = false;
                                }
                            }
                        } else if (lovFldObj.type && lovFldObj.type.toUpperCase() == 'RADIO') {	  //REDWOOD_CHANGES
                            setRadioFieldDataLOV(lovFldObj, fieldValuesArr[i]); //Fix for 19394010
                        }
                    }
                }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        if (typeof (document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                            if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i]) {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        }
                    } else if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'RADIO') {
                        setRadioFieldDataLOV(document.getElementById(field_namesArr[i]), fieldValuesArr[i]); //Fix for 19394010
                    } else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
						//17624254 Starts
                        var reg1 = new RegExp('&amp;', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg1, "&");
                        //17624254 Ends				
//REDWOOD_CHANGES
                        if( document.getElementById(field_namesArr[i]).tagName.toUpperCase()=='OJ-INPUT-NUMBER'){
                            document.getElementById(field_namesArr[i]).value = Number(fieldValuesArr[i]);
                        }
                        else if (document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SWITCH') 
                        {
                            if (typeof (document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                                if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i].toUpperCase() == 'Y' ) {
                                    document.getElementById(field_namesArr[i]).value = true;
                                }
                                else {
                                    document.getElementById(field_namesArr[i]).value = false;
                                }
                            }
                            else {
                                if (fieldValuesArr[i] == 'Y') {
                                    document.getElementById(field_namesArr[i]).value = true;
                                }
                                else {
                                    document.getElementById(field_namesArr[i]).value = false;
                                }
                            }
                        } 
						//redwood_35335422 starts
						else if (document.getElementById(field_namesArr[i]).tagName.toUpperCase() == 'OJ-SELECT-SINGLE') 
                        {			
							var selectedValue = "";
						var selectObject=document.getElementById(field_namesArr[i]);
						for (var index = 0;index < selectObject.data.data.length;index++) {
							if (selectObject.data.data[index].value==fieldValuesArr[i]) {
								selectedValue = selectObject.data.data[index].value;
								break;
							}
						}
						document.getElementById(field_namesArr[i]).value = selectedValue;
						document.getElementById(field_namesArr[i]).setAttribute('value',selectedValue) ;
					
						}	//redwood_35335422 ends		
                        else{ 
//REDWOOD_CHANGES
                        document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                        }  //REDWOOD_CHANGES
                        
                        fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                        //if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) getNextSibling(document.getElementById(field_namesArr[i])).value = fieldValuesArr[i]; //19224295
                    }
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        if (document.getElementsByName(field_namesArr[i])[field_names_recNum].type.toUpperCase() == 'CHECKBOX') {
                            if (typeof (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                                if (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                } else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            } else {
                                if (fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                } else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            }
                        } else {
                            var reg = new RegExp('<br/>', "g");
                            fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
							//17624254 Starts
                            var reg1 = new RegExp('&amp;', "g");
                            fieldValuesArr[i] = fieldValuesArr[i].replace(reg1, "&");
                            //17624254 Ends
                            document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                            /*if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = fieldValuesArr[i]; */
                            fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                        }
                    }
                }
            }
            if (fieldValuesArr[i] == "") cnt++;
        }
        if (cnt == field_namesArr.length - 1) return;
    }
    //  fnpostAction('EXTLOVDATA',AUTOLovResponseDOM);
}
/*12.0.2 Screen Saver Changes starts*/
function validateScrTimeout() {
    //fix for 17021201 starts
    var scrSaverTime = document.getElementById("scrSaverTime");
    if (Number(document.getElementById("scrSaverTime").value) > Number(scrTimeout)) {
        parent.alertAction = "USRSET";
        var alertXML = fnBuildAlertXML('', 'I', ScrSavertimeOut1);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("scrSaverTime")[0].focus();
        return;
    }
    if (Number(scrSaverTime.value) <= 0 || /[^A-z|0-9]/.test(scrSaverTime.value)) {
        parent.alertAction = "USRSET";
        var alertXML = fnBuildAlertXML('', 'I', ScrSavertimeOut2);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("scrSaverTime")[0].focus();
        return;
    }
}
/*12.0.2 Screen Saver Changes ends*/
function saveUserSettings() {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if (document.getElementById("scrSaverTime")) {
    	if (Number(document.getElementById("scrSaverTime").value) > Number(scrTimeout)) {
            return false;
        }
    }
    var amtFmt = document.getElementById("amtFmt").value;
//    var dtFmt = document.getElementById("dtFmt").value; //REDWOOD_CHANGES
    var dtFmt = mainWin.systemDateFormat; //REDWOOD_CHANGES
    var dboardReqd=document.getElementById("dboardReqd").value;
    var alertHome=document.getElementById("alertHome").value;
    var extalertReqd='N';//external alert changes
    var dateDelimiterReqd = document.getElementById("dateDelimiterReqd").value; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
    if(document.getElementById("ext_alert")) extalertReqd=document.getElementById("ext_alert").value;//external alert changes
     /*12.0.2 Screen Saver Changes Start */
    if (document.getElementById("scrSaverTime")) {
        var scrSaverTime = document.getElementById("scrSaverTime").value;
        if (scrSaverTime == "") {
        parent.alertAction = "USRSET";
        var alertXML = fnBuildAlertXML('', 'I', labelEnterScrSaver);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("scrSaverTime")[0].focus();
         return;
        } else if(isNaN(scrSaverTime)==true) {
            parent.alertAction = "USRSET";
            var alertXML = fnBuildAlertXML('', 'I', ScrSaverErrMsg);
            showAlerts(alertXML, 'I');
            parent.gAlertMessage = gAlertMessage;
            document.getElementsByName("scrSaverTime")[0].focus();
            return;
        }
    } else {
    var scrSaverTime = "";
    }
        //Changes for formatting number start
    //debugger;
    var numberFrmtMask = document.getElementById("NUM_FORMAT_MASK").value; //REDWOOD_CHANGES
    var strFormData = 'numberFrmtMask=' +numberFrmtMask+'&amtFmt=' + amtFmt + '&dtFmt=' + dtFmt + '&theme=L'+'&dboardReqd=' + dboardReqd + '&alertHome=' + alertHome +'&scrSaverTime=' + scrSaverTime + '&extalertReqd=' + extalertReqd + '&font=M' ;//external alert changes //REDWOOD_CHANGES
    //Changes for formatting number end
    var objHTTP = createHTTPActiveXObject();
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.open("POST", "UserSettingsServlet?login=true&actionType=UsrSet", false);
    objHTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(strFormData);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 starts
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 ends
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
   }//session expiry change  end
    var resp = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var alertXML = "";
	//fix for 17021201
	var respNode =null;
    if(resp)
        respNode = selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT");
	//fix for 17021201
    if (respNode == null || getNodeText(selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == "FAILURE") {
        userSettingsChangedMsg = mainWin.getItemDesc("LBL_USER_SETTINGS_NOT_UPDATED");
        alertXML = fnBuildAlertXML('', 'E', userSettingsChangedMsg);
        parent.alertAction = "USRSET";
        showAlerts(alertXML, 'E');
        parent.gAlertMessage = gAlertMessage;
    } else if (getNodeText(selectSingleNode(resp, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT")) == "SUCCESS") {
        userSettingsChangedMsg = mainWin.getItemDesc("LBL_USER_SETTINGS_UPDATED");

        var RecnodeList = selectNodes(resp, "//PARAM");
        if (RecnodeList.length >= 2) {
            mainWin.systemDateFormat = getNodeText(RecnodeList[0].childNodes[1]);
            mainWin.nlsAmtFmt = getNodeText(RecnodeList[1].childNodes[1]);
            mainWin.dashboardReqd = getNodeText(RecnodeList[2].childNodes[1]);
            mainWin.alerthomeReqd = getNodeText(RecnodeList[3].childNodes[1]);
            mainWin.scrSaverTime = getNodeText(RecnodeList[4].childNodes[1]);
            mainWin.screenSaverTimeOut =getNodeText(RecnodeList[4].childNodes[1]);//Fix for 17035773
            mainWin.gDecimalSymbol = getNodeText(RecnodeList[1].childNodes[1]).substring(0, 1);
            mainWin.extalertReqd = getNodeText(RecnodeList[6].childNodes[1]);//external alert changes
            mainWin.gDigitGroupingSymbol = getNodeText(RecnodeList[1].childNodes[1]).substring(1);
			mainWin.gNumberFormatMask =  getNodeText(RecnodeList[5].childNodes[1]).substring(0, 1);//Changes for formatting number
			mainWin.dateDelimiterReqd = getNodeText(RecnodeList[6].childNodes[1]); //9NT1606_14_0_RETRO_12_0_3_27393036 changes
        }
         /*12.0.2 Screen Saver Changes End*/
        alertXML = fnBuildAlertXML('', 'I', userSettingsChangedMsg);
		//Bug_34565991  STARTS
        /* if (RecnodeList.length == 1 || RecnodeList.length == 8) { *//*HTML5 Changes Start*/
		if (RecnodeList.length == 1 || RecnodeList.length == 9) { //Bug_34565991  ENDS
            if (typeof(Storage) !== "undefined") {
                localStorage.logintheme = theme;
                localStorage.loginfont = font;
            }/*HTML5 Changes End*/
            parent.alertAction = "USERSET";
            showAlerts(alertXML, 'I');
        } else {
            parent.alertAction = "UNMASK";
            showAlerts(alertXML, 'I');
            parent.alertAction = "";
        }
        parent.gAlertMessage = gAlertMessage;
        //}
    }
    //mainWin.document.getElementById("treemenu4").getElementsByTagName("A")[2].focus();
}
//fix for 17021201 ends

function closeUserSettings() {
   // unmask();	//REDWOOD_CHANGES
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    //mainWin.document.getElementById("treemenu4").getElementsByTagName("A")[2].focus();
}

function fnGetParentWin() {
    var parentWin = "";
    if (parentSeqNo && parentSeqNo != "") {
        for (var i = 0; i < mainWin.arrChildWindows.length; i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
    }
    return parentWin;
}

//function fndispInstr(fieldValue, fieldName, fieldId, brnFldValue) { //Bug_36924146
  function fndispInstrCore(fieldValue, fieldName, fieldId, brnFldValue) {//Bug_36924146   
   parentWinParams = new Object();
		//9NT1606_12_4_RETRO_12_1_26230724 starts 
	if (typeof (seqNo) == "undefined") {
        seqNo = parent.seqNo;
	}
	//9NT1606_12_4_RETRO_12_1_26230724 ends 
    if (typeof (fieldName) != "undefined" && fieldName.indexOf("REF") != -1) {
        if (fieldValue != "") {
            parentWinParams.contrefno = fieldValue;
			parentWinParams.moduleid = moduleid;//FCUBS_CL_15_0003
            //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
			   mainWin.dispHref1("CSDINSTQ", seqNo);
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends   
        }
    } else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            parentWinParams.accno = fieldValue;
            parentWinParams.branch = brnFldValue;
			parentWinParams.moduleid = moduleid; //FCUBS_CL_15_0003
            //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
			  mainWin.dispHref1("CSDINSTQ", seqNo);
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends 
        }
    } else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CST") != -1 || fieldName.indexOf("CUST") != -1 || fieldName.indexOf("CIF") != -1 /*fieldName.indexOf("CIF")!= -1 Added*/
        || fieldName.indexOf("COUNTERPARTY") != -1 || fieldName.indexOf("CPTY") != -1)) {//OBCL_14.4_Support_Bug#32370893_Changes
		if (fieldValue != "") {
            parentWinParams.custno = fieldValue;
			parentWinParams.moduleid = moduleid;//FCUBS_CL_15_0003
           //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
		       mainWin.dispHref1("CSDINSTQ", seqNo);
		    //Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
        }
    }
}

function fndispJointAcc(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && fieldName.indexOf("REF") != -1) {
        if (fieldValue != "") {
            parent.parentWinParams.contrefno = fieldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    } else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            parent.parentWinParams.accno = fieldValue;
            parent.parentWinParams.branch = brnFldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    } else if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CST") != -1 || fieldName.indexOf("CUST") != -1 || fieldName.indexOf("CIF") != -1)) { /*fieldName.indexOf("CIF")!= -1 Added*/
        if (fieldValue != "") {
            parent.parentWinParams.custno = fieldValue;
            mainWin.dispHref1("CSDJNTHD", parent.seqNo);
        }
    }
}

function fndispNotepadDet(fieldValue, fieldName, fieldId, brnFldValue) {
    parent.parentWinParams = new Object();
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("ACC") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            parent.parent.parentWinParams.accno = fieldValue;
            parent.parent.parentWinParams.branch = brnFldValue;
            //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends
			  mainWin.dispHref1("CSDINSTQ", seqNo);
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
			
        }
    }
}

function fnOpenTxnBrnScreen(brnCode, funcid, uiName, finalRights, drillDownQry) {
    if (mainWin.multiBranchOperation == 'Y') {
        var currBrn = mainWin.CurrentBranch;
        var istxnBrn = true;
        var l_Params = "currBrn=" + currBrn;
        l_Params += "&istxnBrn=" + istxnBrn;
        if (typeof (funcid) != "undefined") {
            l_Params += "&funcid=" + funcid;
            l_Params += "&uiName=" + uiName;
            l_Params += "&finalRights=" + finalRights;
            l_Params += "&drillDownQry=" + drillDownQry;
        } else {
            l_Params += "&funcid=NONWB";
            l_Params += "&uiName=NONWB";
            l_Params += "&finalRights=NONWB";
            l_Params += "&drillDownQry=NONWB";
        }
        //mask();//REDWOOD_CHANGES
        loadSubScreenDIV("ChildWin", "TxnBranch.jsp?" + l_Params);
    }
    return;
}

function fnShowTxnBrnScreen(brnCode) {
    return true;
}

function fnTxnBranch(retVal,funcid) {//Bug 17803337 Changes
    //var isUCAvailable = false;
    if (retVal != "") {
        g_txnBranch = retVal;
        if (!mainWin.txnBranch[g_txnBranch]) {
            if (!fnUpdateTxnBrnVariables(retVal,funcid))//Bug 17803337 Changes
                return false;
        }
        if (typeof (functionId) != 'undefined') {
            var title = document.title;
            if (title.indexOf(":::") != -1) {
                var titleBeforeBranch = title.split(":::")[0];
                var scrTitle = titleBeforeBranch + " ::: " + retVal;
            } else {
                var scrTitle = document.title + " - " + mainWin.getItemDesc("LBL_TXN_BRANCH") + " ::: " + retVal;
            }
            document.title = scrTitle;
            setInnerText(document.getElementsByTagName("H1")[0], scrTitle);
        }
    }
    return true;
}

function fnSetTxnBranch(brnCode) {
    return true;
}

function fnUpdateTxnBrnVariables(txnBrn,funcid) {//Bug 17803337 Changes
		mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
	    if (!mainWin.txnBranch[g_txnBranch]) {
		var requsetStr = "";
	    var responseDOM = null;
	    var requestDom = null;
	    if (typeof (functionId) != 'undefined') {
	        requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + txnBrn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>' + functionId + '</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>' + '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
	        requestDom = loadXMLDoc(requsetStr);
	        responseDom = fnPost(requestDom, "MultiBranchUCFetchServlet", functionId);
	    } else {
                //Bug 17803337 Changes Starts
                if(typeof(funcid) == 'undefined' ){
               //Bug 17803337 Changes  Ends
				requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>' + mainWin.UserId + '</USERID><BRANCH>' + txnBrn + '</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>CLRU</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>' + '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
				//Bug 17803337 Changes Starts
               } else{        
                requsetStr = '<?xml version="1.0"?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>'+mainWin.UserId+'</USERID><BRANCH>'
                +txnBrn+'</BRANCH><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID>'+funcid+'</FUNCTIONID><ACTION>UCTXNBRANCH</ACTION><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/>'+
                '<ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY="0" PARENT="" RELATION="" TYPE=""/></FLD><REC TYPE=""/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>';
             
                }
                //Bug 17803337 Changes Ends
                requestDom = loadXMLDoc(requsetStr);
	       /* if (!mainWin.isSessionActive()) { //session expiry change  start
	            event.returnValue = false;
	            responseDOM = loadXMLDoc("<SESSION>EXPIRED</SESSION>");
	            return responseDOM;
	        } *///session expiry change  end
	        var strFormData = getXMLString(requestDom);
	        var objHTTP = createHTTPActiveXObject();
			try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
	        objHTTP.open("POST", "MultiBranchUCFetchServlet", false);
	        objHTTP.setRequestHeader("Content-Type", "application/xml");
	        objHTTP.setRequestHeader("charset", "utf-8");
	        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
	        objHTTP.setRequestHeader("TXNBRANCH", txnBrn);
	        if (typeof (seqNo) != 'undefined') {
	            objHTTP.setRequestHeader("SEQNO", seqNo);
	        }
	        objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
	        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
	        objHTTP.send(strFormData);
			} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
            catch(exp){
              mainWin.handleNetWorkErr(exp);
            } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
	        if (objHTTP.status != 200) {
	            mask();
	            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText), "I");
	            alertAction = "UNMASK";
	        } 
          else {
	            mainWin.inactiveTime = 0;
	            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
	            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
	                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
	            } else if(selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                  mainWin.mask(); 
                  mainWin.sessionTimeOut = true;
                  mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                  return false;
              }//session expiry change  end
              else {
	                responseDom = objHTTP.responseXML;
	            }
	        }
	    }
	    if (responseDom && getXMLString(responseDom) != "") {
	        var msgStat = getNodeText(selectSingleNode(responseDom, "//FCUBS_HEADER/MSGSTAT"));
	        if (msgStat == "SUCCESS") {
	            var ucVarNames = getNodeText(selectSingleNode(responseDom, "//PARAM/NAME")).split("~");
	            var ucVarValues = getNodeText(selectSingleNode(responseDom, "//PARAM/VALUE")).split("~");
	            mainWin.txnBranch[txnBrn] = new setTxnBrnInfo(ucVarNames, ucVarValues);
	        } else {
	            alertAction = "TXNBRANERROR";
	            showAlerts(getXMLString(selectSingleNode(responseDom, "//FCUBS_ERROR_RESP")), 'E');
	            return false;
	        }
	
	    }
	    return true;
	} else {
            return true;
        }
}


function setTxnBrnInfo(ucVarNames, ucVarValues) {
    /*for (var i=0;i<ucVarNames.length;i++) {
        eval("var ucVarNames["+i+"] = ucVarValues["+i+"]");
    }*/
    if (typeof (ucVarValues) == "undefined") {
        this.Lcy = mainWin.Lcy;
        this.AppDate = mainWin.AppDate;
        this.dsnName = mainWin.dsnName;
        this.CurrentBranchName = mainWin.CurrentBranchName;
        this.CurrentCycle = mainWin.CurrentCycle;
        this.CurrentPeriod = mainWin.CurrentPeriod;
        this.BankCode = mainWin.BankCode;
        this.BranchEoi = mainWin.BranchEoi;
        return;
    }
    this.Lcy = ucVarValues[0];
    this.AppDate = ucVarValues[1];
    this.dsnName = ucVarValues[2];
    this.CurrentBranchName = ucVarValues[3];
    this.CurrentCycle = ucVarValues[4];
    this.CurrentPeriod = ucVarValues[5];
    this.BankCode = ucVarValues[6];
    this.BranchEoi = ucVarValues[7];
}

function fnExitTxnBranch(funcid, uiName, finalRights, drillDownQry) {
    unmask();    
	var childDivObj = document.getElementById("ChildWin");  
    iFrameObj = childDivObj.getElementsByTagName("IFRAME")[0];
    if (getBrowser().indexOf("OPERA") != -1){//ie11 changes 
      try{
         childDivObj.parentNode.removeChild(childDivObj);
         //iFrameObj.contentWindow.document.documentElement.outerHTML="";
      }catch(e){
        iFrameObj.style.display='none';
        iFrameObj.id='newiframe';
      }
    }else{
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    if (typeof (alertAction) != "undefined" && alertAction != "TXNBRANERROR") {
        try {
            fnPostCloseTxnBranch();
        } catch (e) {}
        multiBrnScrOpened = true;
        if (typeof (funcid) == "undefined" || (typeof (funcid) != "undefined" && funcid == "NONWB")) 
            fnNew();
        else 
            dispHref(funcid, uiName, finalRights, drillDownQry);
    }
}

function EnableToolbar_buttons(type) {
    switch (type.toUpperCase()) {
    case 'NEW':
        enablebutton('New', 'actions0');
        break;
    case 'COPY':
        enablebutton('Copy', 'actions1');
        break;
    case 'DELETE':
        enablebutton('Delete', 'actions7');
        break;
    case 'CLOSE':
        enablebutton('Close', 'actions5');
        break;
    case 'UNLOCK':
        enablebutton('Unlock', 'actions2');
        break;
    case 'REOPEN':
        enablebutton('Reopen', 'actions6');
        break;
    case 'PRINT':
        enablebutton('Print', 'actions9');
        break;
    case 'AUTHORIZE':
        enablebutton('Authorize', 'actions8');
        break;
    case 'REVERSE':
        enablebutton('Reverse', 'operation3');
        break;
    case 'ROLLOVER':
        enablebutton('Rollover', 'operation2');
        break;
    case 'CONFIRM':
        enablebutton('Confirm', 'operation0');
        break;
    case 'LIQUIDATE':
        enablebutton('Liquidate', 'operation1');
        break;
    case 'HOLD':
        enablebutton('Hold', 'actions3');
        break;
	/*Fix for BugNo:17755434 Starts*/    
    case 'ENTERQUERY':
        enablebutton('EnterQuery', '');
    case 'EXECUTEQUERY':
        enablebutton('ExecuteQuery','');
    /*Fix for BugNo:17755434 Ends*/ 
    default:
        enablebutton('Save', 'actions4');
        break;
    }
}

function DisableToolbar_buttons(type) {
    switch (type.toUpperCase()) {
    case 'NEW':
        disablebutton('New', 'actions0');
        break;
    case 'COPY':
        disablebutton('Copy', 'actions1');
        break;
    case 'DELETE':
        disablebutton('Delete', 'actions7');
        break;
    case 'CLOSE':
        disablebutton('Close', 'actions5');
        break;
    case 'UNLOCK':
        disablebutton('Unlock', 'actions2');
        break;
    case 'REOPEN':
        disablebutton('Reopen', 'actions6');
        break;
    case 'PRINT':
        disablebutton('Print', 'actions9');
        break;
    case 'AUTHORIZE':
        disablebutton('Authorize', 'actions8');
        break;
    case 'REVERSE':
        disablebutton('Reverse', 'operation3');
        break;
    case 'ROLLOVER':
        disablebutton('Rollover', 'operation2');
        break;
    case 'CONFIRM':
        disablebutton('Confirm', 'operation0');
        break;
    case 'LIQUIDATE':
        disablebutton('Liquidate', 'operation1');
        break;
    case 'HOLD':
        disablebutton('Hold', 'actions3');
        break;
	/*Fix for BugNo:17947164 starts*/    
    case 'ENTERQUERY':
        disablebutton('EnterQuery', '');
		break;
    case 'EXECUTEQUERY':
        disablebutton('ExecuteQuery','');
		break;
    /*Fix for BugNo:17947164 Ends*/
    default:
        disablebutton('Save', 'actions4');
        break;
    }
}

/*12.3_SUPPORT_RETRO_ 25399948  Starts*/
/*function enablebutton(type, action) {
    mainWin.document.getElementById(type).disabled = false;
    mainWin.document.getElementById(type).className = "BTNicon";
}

function disablebutton(type, action) {
    mainWin.document.getElementById(type).disabled = true;
    mainWin.document.getElementById(type).className = "BTNiconD";
}*/
/*12.3_SUPPORT_RETRO_ 25399948  Ends*/
function enablebutton(type, action) {
    document.getElementById(type).style.display = 'block';//Fix for IUT 153
    document.getElementById(type).disabled = false;
}

function disablebutton(type, action) {
    document.getElementById(type).disabled = true; //Fix for IUT 153
    document.getElementById(type).style.display = 'none'; 
}

function ShowXMLTabNew(xmlFile, xslName, scrnName, cid) {
  var xmlDoc = null;
  var xslDoc = null;
  var tmpFnid = functionId;
  /* 9NT1606_12_2_RETRO_12_0_3_23656256 starts */
  //xmlDoc = getUIXML(xmlFile, screenType); //Caching changes start
   
    if(typeof(screenType)!= "undefined" && screenType=="WB" && cid =='TAB_UDF'){
        var tempXmlName = xmlFile.replace(/[^a-zA-Z0-9]/g, "");
        mainWin.screenHtmlCache[tempXmlName] =  new Object();
        mainWin.screenHtmlCache[tempXmlName] = getXMLString(loadXMLFile(xmlFileName)); 
        mainWin.screenHtmlCache[tempXmlName] = getXMLString(embeddcall(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName]))); 
        xmlDoc = loadXMLDoc(mainWin.screenHtmlCache[tempXmlName]);        
    }else{
        xmlDoc = getUIXML(xmlFile);//Caching changes start
    }
    /* 9NT1606_12_2_RETRO_12_0_3_23656256 ends */
   
 /* if (screenType == "WB") {
      xmlDoc = loadXMLFile(xmlFile);
  }
  else{
      
	  xmlDoc = getUIXML(xmlFile);
  }
   if (typeof (screenType) != "undefined") {
            if (screenType == "WB") {
                xmlDoc = embeddcall(xmlDoc);
            }
        }*///Caching changes end
    if (scrnName != "CVS_ADVANCED") {
        g_scrType = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/@TMP_SCR_TYPE"));
        subScrHeaderTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/HEADER/TAB/@ID"));
        subScrBodyTabId = getNodeText(selectSingleNode(xmlDoc, "FORM/SCREEN[@NAME='" + scrnName + "']/BODY/TAB/@ID"));
    } else {
        g_scrType = "M";
    }
	if (screenType == "WB") {//Caching changes start
      if (xmlFileName.indexOf("ASSIGN.xml") ==  - 1) {
	    //12.1_Decentralized_Changes starts
		try{
			if(typeof (dataObj) == 'undefined')
			{
				dataObj = parent.dataObj;
			}
		}catch(e){}
		//12.1_Decentralized_Changes ends
        var tmpxml = dataObj.uiXml.substring(0, dataObj.uiXml.indexOf(".", 0));
        tmpFnid = tmpxml;
      }
      else {
        tmpFnid = "ASSIGN.xml";
      }
    }
    if(typeof(mainWin.screenHtmlCache[tmpFnid + scrnName]) != "undefined" && typeof(mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML) == "undefined"){ //12.1 Caching Tab load start
         mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML =  new Object();
    }       
    if(( typeof(mainWin.screenHtmlCache[tmpFnid + scrnName]) == "undefined" )||( typeof(mainWin.screenHtmlCache[tmpFnid + scrnName]) != "undefined" && typeof(mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid]) == "undefined") ||  ( xmlFile.indexOf("EXTAUTHORIZE") > -1)){
        var imagePath = 'Images/Ext' + strTheme.substring(0, strTheme.indexOf('.css'));
        var html;
        var applicationName = mainWin.applicationName;
        var dispSize = mainWin.dispSize;
        var XslLabels = fnBuildXslLabels();
        var globalVariables = fnBuildGlobalVar();//12.0.3 Defaulting global variables        
       
         if(typeof(mainWin.screenHtmlCache[xslName]) == "undefined"){
            mainWin.screenHtmlCache[xslName] = loadXSLFile(mainWin.loadXSL(xslName)); //12.1 Caching Tab load
            }  
          xslDoc =  mainWin.screenHtmlCache[xslName];
        var params = new Array();
        params["screen"] = scrnName;
        params["uiXML"] = uiXML;
        params["imgPath"] = imagePath;
        params["displaySize"] = dispSize;
        params["thirdChar"] = thirdChar;
        params["XslLabels"] = XslLabels;
        params["globalVariables"] = globalVariables;//12.0.3 Defaulting global variables
        params["applicationName"] = applicationName;
		params["largeScreenWidth"] = mainWin.scrWidth;//REDWOOD_CHANGES
        params["mediumScreenWidth"] = mainWin.dashBoardWidth;
        if(isSubScreen == true){
			params["largeScreenWidth"] = mainWin.scrWidth;	//REDWOOD_CHANGES
        }
        params["screenHeight"] = mainWin.y;
        params["dateFormat"] = mainWin.systemDateFormat;        //HTML5 Changes
        params["dateDelimiterReqd"] = mainWin.dateDelimiterReqd; //9NT1606_14_0_RETRO_12_0_3_27393036 changes
        if (thirdChar == "S") params["functionId"] = parentFunc;
        else params["functionId"] = functionId;
        params["CurTabId"] = cid;
        try {
            getDashboardParams(params);
        } catch (e) {} 
        html = transform(xmlDoc,   xslDoc, params); //12.1 Caching Tab load
         
        if (xmlFile.indexOf("EXTAUTHORIZE") == -1 && ( typeof(mainWin.screenHtmlCache[tmpFnid + scrnName]) != "undefined" )) {         
        if (getBrowser().indexOf("IE") != -1) {
            mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid] =   html;
        }
        else{
       //REDWOOD_CHANGES 
         if (getBrowser().indexOf("FIREFOX") != -1) {
              html.querySelectorAll('template').forEach((elem) => elem.remove());
              
         }else{
              html.querySelectorAll('template_tmp').forEach((elem) => elem.remove());
         }
            mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid] =   getXMLString(html).replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
             if (getBrowser().indexOf("FIREFOX") != -1) {
                mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid] =mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid].replace(new RegExp("template_tmp", 'g'), "template");
             } 
//REDWOOD_CHANGES
            html =  mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid];
        }
        }
        else{
           if (getBrowser().indexOf("IE") == -1) {	   
//REDWOOD_CHANGES
                if (getBrowser().indexOf("FIREFOX") != -1) {
                  html.querySelectorAll('template').forEach((elem) => elem.remove());
                  
                 }else{
                      html.querySelectorAll('template_tmp').forEach((elem) => elem.remove());
                 }
              html = getXMLString(html).replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
//REDWOOD_CHANGES
           }
        }
     }
      else{
         html =   mainWin.screenHtmlCache[tmpFnid + scrnName].tabHTML[cid];
      }
	  //Caching changes end
    gXmlFileName = xmlFile;
    gScreenName = scrnName;
    gXslFileName = xslName;
    return html;
}

function fnLaunchLinkWindow(anchorTag, paramList) {
    var paramListArray = new Array();
    var paramName = '';
    fieldName = '';
    queryString = '';
    if (paramList != '') {
        paramListArray = paramList.split('&');
        for (var index = 0; index < paramListArray.length - 1; ++index) {
            paramName = paramListArray[index].split('=')[0];
            fieldName = paramListArray[index].split('=')[1];
            if (document.getElementById(fieldName) && document.getElementById(fieldName).value != '') queryString += paramName + '=' + document.getElementById(fieldName).value + '&';
        }
        if (queryString != '') {
            if (anchorTag.href.indexOf('?') == -1) anchorTag.href += '?';
            else anchorTag.href += '&';
            anchorTag.href += queryString.substring(0, queryString.length - 1);
        }
    }
}

/*Used for BPEL*/
function getXmlHttpObj(serverUrl, funcId, operation) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var objHttp = createHTTPActiveXObject();
    objHttp.open("POST", serverUrl, false);
    objHttp.setRequestHeader("Content-Type", "application/xml");
	objHttp.setRequestHeader("accept-encoding", "gzip");
    objHttp.setRequestHeader("charset", "utf-8");
    objHttp.setRequestHeader("FUNCTIONID", funcId);
    objHttp.setRequestHeader("OPERATION", operation);
    objHttp.setRequestHeader("DBUPLOAD", "FALSE");
    //12.0.2 SOATEAM Starts
    if (typeof (g_txnBranch) == "undefined") {
        objHttp.setRequestHeader("TXNBRANCH", mainWin.CurrentBranch);
    } else {
    objHttp.setRequestHeader("TXNBRANCH", g_txnBranch);
    } //12.0.2 SOATEAM Ends   
    objHttp.setRequestHeader("HASATTACHMENTS", "FALSE");
    objHttp.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    if (getBrowser().indexOf("SAFARI") != -1) {
        objHttp.setRequestHeader("SAFARIREQ","TRUE");
    } else {
        objHttp.setRequestHeader("SAFARIREQ","FALSE");
    }	
    if (typeof(safariReqSentOnce)!= "undefined" && safariReqSentOnce == true) {
        objHttp.setRequestHeader("SAFARIREQSENTONCE","TRUE");
    } else {
        objHttp.setRequestHeader("SAFARIREQSENTONCE","FALSE");
    }
    safariReqSentOnce = false;
    //Performance Changes  
    var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    var clientTime = (t.getHours() * (3600)) + (t.getMinutes() * (60)) + t.getSeconds();
    objHttp.setRequestHeader("CLIENTTIME",clientTime);	
    return objHttp;
}

function getCalcAmount(amount) {
    amount = amount.replace(gDecimalSymbol, ".");
	amount = amount.replace(/[.](?=.*[.])/g, ",");    //9NT1606_12_4_RETRO_12_1_26231984 added
    return amount;
}

function getIEVersionNumber() {//ie11 changes
//debugger;
    var ua = (navigator.userAgent).toUpperCase();
    var MSIEOffset = ua.indexOf("MSIE ");
    if (MSIEOffset == -1) {
     if(ua.indexOf("TRIDENT") != -1 && ua.indexOf("RV:")!= -1){
        var rv=ua.indexOf("RV:");
        return parseFloat(ua.substring(rv+3 ,ua.indexOf(")", rv)));
        }
      
    } else {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}

function disableCommonKeys(event) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
	/*Fix for 16654918 and 16785077  Starts*/
	var srcElem = getEventSourceElement(event);
    var type = srcElem.type;
    if (event.keyCode == 8) {
        if (typeof (type) == "undefined") {
            return false;
        } else if ((type.toUpperCase() != "TEXT" && type.toUpperCase() != "TEXTAREA" && type.toUpperCase() != "PASSWORD") || srcElem.readOnly) {
            return false;
        }
    }
    /*Fix for 16654918 and 16785077Ends*/
    switch (event.keyCode) {//FCUBS_12.0_PS_01 Starts
	  //9NT1490_11.4P02_SFR#13897908
	  /*Fix for 16654918 and 16785077 Commented*/
	  /*case 8:
		return false;  */
     //9NT1490_11.4P02_SFR#13897908 //FCUBS_12.0_PS_01 Ends
    case 112://F1 = Help
    case 114://F3 = Search
    case 115://F4 = Address History
    case 116://F5 = Refresh
    case 117://F6 = Move to next Frame in FF
    case 118://F7 = Caret Browsing in FF
    case 122://F11 = Full Screen Mode
        fnDisableBrowserKey(event);
        preventpropagate(event);
        try {
            event.keyCode = 0;
        } catch (e) {}
        return false;
    }
//FCUBS_12.0_PS_01 Starts
    //9NT1490_11.4P02_SFR#13897908
    if (event.altKey == true && event.ctrlKey == false){ //Fix for 23006946
      switch(event.keyCode) {
	case 37:
		return false;
	case 39:
		return false;
	}
    }
    //9NT1490_11.4P02_SFR#13897908
//FCUBS_12.0_PS_01 Ends
    if (event.ctrlKey == true && event.altKey == false) { //Fix for 23006946
        switch (event.keyCode) {
        case 66:
            //B = Organize Favourities in IE
        case 68:
            //D = Add a Favouritie in IE
        case 69:
            //E = Search Web in IE
        case 70:
            //F = Find in IE
        case 72:
            //H = History in IE
        case 73:
            //I = Manage Favourities in IE
        case 74:
            //J = Manage Feeds in IE
        case 76:
            //L = Open in IE
        case 78:
            //N = Open in IE
        case 79:
            //O = Open in IE
        case 80:
            //P = Print in IE
        case 81:
            //Q = Quick Tab View
        case 82:
            //R = Refresh in IE
        case 84:
            //T = New Tab
        case 87:
            //W = Close window in IE
        case 112:
            //F1 = Help
        case 114:
            //F3 = Search
        case 115:
            //F4 = Close Tab in FF
        case 116:
            //F5 = Refresh
            fnDisableBrowserKey(event);
            preventpropagate(event);
       
            try {
                document.getElementById("fastpath").focus(); //Fix for 23006946
                event.keyCode = 0;
            } catch (e) {}
            return false;
        }
    }
}
//9NT1466 Customer Signature and Image Upload changes starts
function fnPopulateAttachMent(pkColName, pkColValues) {
    fileNameArray = new Array();
    if (fcjResponseDOM) {
        pkColArray = pkColName.split("~");
        pkValArray = pkColValues.split("~");
        if (getXMLString(fcjResponseDOM).length > 0) {
            if (selectNodes(fcjResponseDOM, "//ATTACHMENTS/ATTACHMENT")) {
                var attachmentNodes = selectNodes(fcjResponseDOM, "//ATTACHMENTS/ATTACHMENT");
                for (var i = 0; i < attachmentNodes.length; i++) {
                    var node = attachmentNodes[i];
                    var attachMentString = "";
                    attachMentString = "<ATTACHMENT>";
                    for (var pk = 0; pk < pkColArray.length; pk++) {
                        if (pkColArray[pk] == "") continue;
                        attachMentString += "<" + pkColArray[pk] + ">" + pkValArray[pk] + "</" + pkColArray[pk] + ">";
                    } //Changes  for image upload 10.4
                    attachMentString += "<PKVALUES>" + getNodeText(selectSingleNode(node, "PKVALUES")) + "</PKVALUES>";
                    attachMentString += "<PKFIELDS>" + getNodeText(selectSingleNode(node, "PKFIELDS")) + "</PKFIELDS>";
                    //changes end
                    if(selectSingleNode(node, "IMGFIELDNAME"))
                        attachMentString += "<IMGFIELDNAME>" + getNodeText(selectSingleNode(node, "IMGFIELDNAME")) + "</IMGFIELDNAME>";
                    attachMentString += "<SEQNO>" + getNodeText(selectSingleNode(node, "SEQNO")) + "</SEQNO>";
                    attachMentString += "<VALUE><![CDATA[" + getNodeText(selectSingleNode(node, "FTYPE")) + "]]></VALUE><FTYPE>" + getNodeText(selectSingleNode(node, "FTYPE")) + "</FTYPE>";
                    attachMentString += "</ATTACHMENT>";
                    attachmentData[i] = attachMentString;
                    fileNameArray[i] = getNodeText(selectSingleNode(node, "FTYPE"));
                    if (getNodeText(selectSingleNode(node, "FTYPE")) == "" || getNodeText(selectSingleNode(node, "FTYPE")) == null) {
                        attachmentData[i] = "";
                        fileNameArray[i] = "";
                    }
                }
            }
        }
    }
}

function fnImageUpload(pkColName, pkColValues, imgFldName, seqNo, e) {
    var imageName = "";
    var rowIndex = getRowIndex(e);
    var functionId = mainWin.document.getElementById("fastpath").value;
    if (rowIndex == 'undefined' || rowIndex < 0) {
        rowIndex = 1;
    }
    var pkNameforFile = "";
    var title = mainWin.getItemDesc("LBL_IMG_UPLOAD");
    var upload = mainWin.getItemDesc("LBL_UPLOAD");
    pkNameforFile = replaceAllChar(pkColValues, "~", "_");
    pkNameforFile = pkNameforFile;
    if (attachmentData.length > 0) {
        imageName = fileNameArray[rowIndex - 1];
    }
    var l_Params = "keyName=" + pkNameforFile;
    /* security fixes for WF starts */
	l_Params += "&pkColName=" + replaceTilde(pkColName);
    l_Params += "&pkColVal=" + replaceTilde(pkColValues);
	/* security fixes for WF ends */
    l_Params += "&seqNo=" + seqNo;
    l_Params += "&image=" + imageName;
    l_Params += "&action=" + gAction;
    l_Params += "&title=" + title;
    l_Params += "&upload=" + upload;
    l_Params += "&imgFieldName=" + imgFldName;
    l_Params += "&rowIndex=" + rowIndex;
    l_Params += "&functionId=" + functionId;
    loadSubScreenDIV("ChildWin", "ImageUpload.jsp?" + l_Params);
}

//9NT1466 Customer Signature and Image Upload changes ends
function fndispCustomer(fieldValue, fieldName, fieldId, brnFldValue) {
    parentWinParams = new Object();
    //9nt1466 changes for iut sfr 584 starts
    if (typeof (seqNo) == "undefined") {
        seqNo = parent.seqNo;
    }
    //9nt1466 changes for iut sfr 584 ends
    if (typeof (fieldName) != "undefined" && (fieldName.indexOf("CUS") != -1 || fieldName.indexOf("AC") != -1)) {
        if (fieldValue != "") {
            parentWinParams.custno = fieldValue;
            parentWinParams.branch = brnFldValue;
            //Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends
			  mainWin.dispHref1("CSDINSTQ", seqNo);
			//Bug_36924146 Changes Starts 
			}else{
			   mainWin.dispHref1("CSDCOINS",getSeqNo());
			}	
			//Bug_36924146 Changes Ends
        }
    }
}

/*Fix for 16353987 */
function fndispAccDetails(fieldValue,fieldName,fieldId,brnFldValue){  
    if (typeof(seqNo)=="undefined"){   //21434122 starts
        if (typeof(parent.seqNo)=="undefined"){
          parent.parent.parentWinParams = new Object();
          parent.parent.parentWinParams.accno =  fieldValue;
          parent.parent.parentWinParams.branch = brnFldValue;
        }else { 
             parent.parentWinParams = new Object(); 
             parent.parentWinParams.accno = fieldValue;    
             parent.parentWinParams.branch = brnFldValue;
        }
    } else {
        parentWinParams = new Object();
        parentWinParams.accno = fieldValue;           
        parentWinParams.branch = brnFldValue;
    }

   if(typeof(fieldName) !="undefined" && (fieldName.indexOf("ACC")!= -1 ||fieldName.indexOf("AC")!= -1)) {
        if(fieldValue !="") {   
       // parentWinParams.accno =  fieldValue;
       // parentWinParams.branch = brnFldValue;
			//Bug_36924146 Changes Starts
			if(isRofcFunctionId()){
			//Bug_36924146 Changes Ends	
				mainWin.dispHref1("STDCUSBL",getSeqNo()); 
			//Bug_36924146 Changes Starts 
			}else{
				mainWin.dispHref1("STDCOSBL",getSeqNo());
			}	
			//Bug_36924146 Changes Ends	
        }
    } //21434122 ends
}
/*Fix for 16353987 */

/****************************/
function showToolbar(funcid, txnstat, authstat, showExecute) {
    //12012012
    //hideTooolbarIcons();
    /*
    11012012
    if (gActiveWindow || gNumChildWindows > 0){
    } else {
    	return;
    }
    */
    //11012012
    //if (gActiveWindow && gActiveWindow.routingType == "X") {
    if (typeof (routingType) != "undefined" && routingType == "X") {
        ExtshowToolbar(funcid, txnstat, authstat, showExecute);
        return;
    }
    if (funcid == "" || funcid.substring(2, 3) == "S") {
        //fnDisableAllActions();
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            //FCIS10.3 Changes
            if (applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        /* along with save, the remainting 2 buttons have to be disabled */
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
        /* along with save, the remainting 2 buttons have to be disabled */
        if (gActiveWindow.gAction == "ENTERQUERY") {
            /*
            12012012
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").className = 'BTNicon';
            */
        }

        fnSetImgSrc(actions_arr);
        return;
    }

    var l_Txn_Auth_Stat = "";
    //11012012
    //if (gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") || (gActiveWindow.screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    if ((gAction == "NEW" || gAction == "MODIFY") || (screenType == "WB")) //FCUBS 10.3 WEBBRANCH CHANGES
    {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else {
        var l_Txn_Auth_Stat = gnGetTxnAuthStat();
    }
    /*If txnstat and authstat are passed from FID.js*/
    if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
        txnstat = l_Txn_Auth_Stat.split("~")[0];
    }
    if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
        authstat = l_Txn_Auth_Stat.split("~")[1];
    }
    var l_OnceAuth = "N";
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }

    var objRights = new Array();
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;
    } catch (e) {
        // do nothing if the user doesn't have rights for the branch
    }

    var finalRightsStr = ""
    /*if (objRights[funcid] != "") 
        finalRightsStr = objRights[funcid];
    */
    var funcidPos = objRights.indexOf(funcid);
    if (funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos) + 1, objRights.indexOf(";", funcidPos));
    }
    if (!finalRightsStr) {
        // If it's an invalid function id then return.
        finalRightsStr = "";
    } else if (showExecute) {
        // If Enter Query button is pressed, show the Execute Query button.
        // Don't hide all the buttons. RightsString for ExecuteQuery is 65536~ 
        //finalRightsStr = "65536~"; 
    }

    var j = finalarr.length;
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            finalarr.pop();
        }
        var finalcnt = 0;
        t1 = t[txnstat + '+' + authstat];
        var finalActions = new Array();
        var i = 0,
            k = 0;
        var addIndex = 0;
        var l_Testing = "";
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    if (t1 != null) { //Kals Comenting .. APr 30
                        for (z = 0; z < t1.length; z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                                    continue;
                                }
                                /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                                    continue;
                                }*/
                                finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    } else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') {
                            continue;
                        }
                        /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && isSameMakerId()) {
                            continue;
                        }*/
                        finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
                } else l_Testing = l_Testing + "0";

                i++;
            }

            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }

        var lastAction = "";
        var pDoc = gActiveWindow.document;
        var auth_stat = typeof (pDoc.getElementsByName("AUTH_STAT")[0]) != 'undefined' ? pDoc.getElementsByName("AUTH_STAT")[0] : pDoc.getElementsByName("AUTHSTAT")[0];
        var rec_stat = typeof (pDoc.getElementsByName("RECORD_STAT")[0]) != 'undefined' ? pDoc.getElementsByName("RECORD_STAT")[0] : pDoc.getElementsByName("TXNSTAT")[0];
        if (isSameMakerId()) {
            if (finalarr.length > 0) {
                for (var j = 0; j < finalarr.length; j++) {
                    if (finalarr[j]) {
                        if (finalarr[j].toUpperCase() == 'DELETE') {
                            finalarr.splice(j, 1);
                        }
                    }
                    //Doesn't enable the unlock button before authrorization
                    if (authstat) {
                        if (authstat == "U") {
                            if (finalarr[j]) {
                                if (finalarr[j].toUpperCase() == 'UNLOCK') {
                                    finalarr.splice(j, 1);
                                }
                            }
                        }
                    } else if (auth_stat) {
                        if (auth_stat.checked == false) {
                            if (finalarr[j]) {
                                if (finalarr[j].toUpperCase() == 'UNLOCK') {
                                    finalarr.splice(j, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
        for (i = 0; i < finalarr.length; i++) {
            if (finalarr[i] == lastAction) {
                var temp = finalarr[i + 1];
                finalarr[i + 1] = finalarr[lastElement];
                for (j = i + 2; j < finalarr.length; j++) {
                    temp1 = finalarr[j];
                    finalarr[j] = temp;
                    temp = temp1;
                }
            }
            if (finalarr[i]) {
                document.getElementById(finalarr[i]).disabled = false;
                document.getElementById(finalarr[i]).style.display = "flex"; //REDWOOD_CHANGES
                //document.getElementById(finalarr[i]).className = 'BTNicon';
            }
        }
    }

    fnEnableAcns_OnActionCode(funcid); // action code based
    //If New is enabled then save shud be disabled
    var l_SaveBtn = document.getElementById("Save");
    var l_NewBtn = document.getElementById("New");
    //hOLD Related Code
    if (gNumChildWindows != 0 && gActiveWindow && (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY")) {
        disableAllTBButtons(); //added
        for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++) {
            if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((gActiveWindow.screenType == "P" || gActiveWindow.screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
                continue;
            }
            document.getElementById(actions_arr[l_Cnt]).disabled = true;
            document.getElementById(actions_arr[l_Cnt]).style.display = "none";
            //document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = 'BTNicon';
    }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById("Hold").className = 'BTNiconD';
            if (gNumChildWindows != 0 && gActiveWindow) {
                if (gActiveWindow.gAction == "NEW") {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                    //document.getElementById("Hold").className = 'BTNicon';
                } else {
                    var l_txnval = getTxnVal_Mapping("CONTSTAT");
                    if (typeof (gActiveWindow.holdStatus) != "undefined") if (gActiveWindow.gAction == "MODIFY" && (l_txnval == "H" || gActiveWindow.holdStatus.toUpperCase() == "HOLD")) {
                        document.getElementById("Hold").disabled = false;
                        document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById("Hold").className = 'BTNicon';
                    }
                }
            }
        }
    }

    //lIQUIDATE case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "LIQUIDATE") {
        if (finalarr) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //Rollover case
    if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "ROLLOVER") {
        if (finalarr) {
            for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "none";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }
        }
        enableSave();
    }

    //fcis Delegate case
    if (applicationName == "FCIS") {
        if (gNumChildWindows != 0 && gActiveWindow && gActiveWindow.gAction == "DELEGATE") {
            if (finalarr) {
                for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                    document.getElementById(finalarr[l_Itr]).disabled = true;
                    document.getElementById(finalarr[l_Itr]).style.display = "flex";//REDWOOD_CHANGES
                    //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
                }
            }
            enableSave();
        }
    }
    fnSetImgSrc(actions_arr);
    //FCUBS10.3_WebBranch Changes
    //11012012
    //if (gActiveWindow && gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction != "REVERSE") && (gActiveWindow.gAction != "VIEW") && (gActiveWindow.gAction != "REMOTEAUTH") && (gActiveWindow.gAction != "GENERATE") && (gActiveWindow.gAction != "AUTH")) {
    if (screenType == 'WB' && (gAction != "REVERSE") && (gAction != "VIEW") && (gAction != "REMOTEAUTH") && (gAction != "GENERATE") && (gAction != "AUTH")) {
        fnEnableHoldButton();
    }
    //11012012
    //if (gActiveWindow.screenType == 'WB' && (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH")) {
    if (screenType == 'WB' && (gAction == "REMOTEAUTH" || gAction == "AUTH")) {
        fnEnableAuth();
    }
    //for enabling reverse in WB 
    //FCUBS10.3_WebBranch Changes
    if (gActiveWindow) {
        if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
            fnEnableReverseButton();
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
            //fnEnableGenerateButton();
            if (typeof (mainWin.functionDef[funcid]) != "undefined") {
                if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                    fnEnableGenerateButton();
                }
            } else {
                fnEnableGenerateButton();
            }
            //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
        }
    }
}

// Reddy Prasad added
function fnSetImgSrc(actions_arr) {
    for (var l_idx = 0; l_idx < actions_arr.length; l_idx++) {
        var l_str;
        var l_temp = actions_arr[l_idx];
        l_str = InitCap(l_temp);

        //Murali Preformance tunning
        //while(!parent.frames['Global']){}
        // fnWaitProcess(); TODO
        if (mainWin.applicationName == "FCIS" && actions_arr[l_idx] == "ROLLOVER") {
            actions_arr[l_idx] = "DELEGATE";
        }
        if (document.getElementById(actions_arr[l_idx]).disabled) {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + "_D.gif";
            document.getElementById(actions_arr[l_idx]).disabled = true;
            document.getElementById(actions_arr[l_idx]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNiconD";
        } else {
            //document.getElementById(actions_arr[l_idx]).firstChild.src = theme_imagesPath + "/Toolbar/ic" + l_str + ".gif";
            document.getElementById(actions_arr[l_idx]).disabled = false;
            document.getElementById(actions_arr[l_idx]).style.display = "flex";//REDWOOD_CHANGES
            //12012012
            //document.getElementById(actions_arr[l_idx]).className = "BTNicon";
        }
    }

    if (document.getElementById("Save").disabled) {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";        
    } else {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }
}

function hideTooolbarIcons() {
    //11012012
    document.getElementById("TlBarOper").className = "TBgp1";
}

//JS Segregation changes starts.
function getDefaultRightsStr(funcid) {
    var finalRightsStr = "";
    //var objRights = new Array();//Array used to store menu rights
    var objRights = "";
    try {
        //objRights = new fnGetFinalRights();
        objRights = mainWin.document.getElementById("finalFunctionRights").value;

    } catch (e) {
        // do nothing if the user doesn't have rights for the branch
        return;
    }
    /*
    if(objRights[funcid] != "") {
        finalRightsStr = objRights[funcid];
    }
    */
	//change for bug id 14294364 : 11.2 version STDCIF -PROBLEM WITH ROLE RIGHTS [funcid changed to funcid+"+"]
    var funcidPos = objRights.indexOf(funcid+"=");
    if(funcidPos >= 0) {
        finalRightsStr = objRights.substring(objRights.indexOf("=", funcidPos)+1, objRights.indexOf(";", funcidPos));
    }
    return finalRightsStr;
}
//JS Segregation changes ends.

// returns the final rights array based on function rights
function finalarrBasedOnFuncRights(funcid, txnstat, authstat) {
	//JS Segregation changes starts.
    var finalRightsStr = getDefaultRightsStr(funcid);
	//JS Segregation changes ends.
    var j = mainWin.finalarr.length;
    l_OnceAuth = getOnceAuth();
    if (funcid && funcid != "") {
        for (i = 0; i < j; i++) {
            mainWin.finalarr.pop();
        }
        var finalcnt = 0;
        var finalActions = new Array();
        var i = 0,
            k = 0;
        var addIndex = 0;
        var l_Testing = "";
        var finalRights = "";
		t1 = mainWin.t[txnstat + '+' + authstat]; //Fix for SFR 14783869 
        while (finalRightsStr.indexOf('~') != -1) {
            finalRights = finalRightsStr.substring(0, finalRightsStr.indexOf('~'));
            for (temp = finalRights; temp != 0; temp = temp >>> 1) {
                if (temp % 2 != 0) {
                    l_Testing = l_Testing + "1";
                    //Fix for SFR 14783869 
                    /*if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y') continue;
                    mainWin.finalarr[k] = actions_arr[i + addIndex];
                    k++;*/
					if (t1 != null) { 
                        for (z = 0; z < t1.length; z++) {
                            if (t1[z].toUpperCase() == actions_arr[i + addIndex].toUpperCase()) {
                                if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y' && typeof (tankModifications) != "undefined" && tankModifications == "N") { //9NT1606_14_0_RETRO_12_2_27297039
                                    i++;//Fix for 17030176
                                    continue;
                                }                               
                                mainWin.finalarr[k] = actions_arr[i + addIndex];
                                k++;
                                break;
                            }
                        }
                    } else {
                        if (actions_arr[i + addIndex].toUpperCase() == 'DELETE' && l_OnceAuth == 'Y' && typeof (tankModifications) != "undefined" && tankModifications == "N") { //9NT1606_14_0_RETRO_12_2_27297039
                            i++;//Fix for 17030176
                            continue;
                        }                       
                        mainWin.finalarr[k] = actions_arr[i + addIndex];
                        k++;
                    }
					 //Fix for SFR 14783869 
                } else l_Testing = l_Testing + "0";
                i++;
            }
            finalRightsStr = finalRightsStr.substring(finalRightsStr.indexOf('~') + 1);
            addIndex += 32;
            i = 0;
        }
        var lastAction = "";
        for (i = 0; i < mainWin.finalarr.length; i++) {
            if (mainWin.finalarr[i] == lastAction) {
                var temp = mainWin.finalarr[i + 1];
                mainWin.finalarr[i + 1] = mainWin.finalarr[lastElement];
                for (j = i + 2; j < mainWin.finalarr.length; j++) {
                    temp1 = mainWin.finalarr[j];
                    mainWin.finalarr[j] = temp;
                    temp = temp1;
                }
            }

            if (mainWin.finalarr[i]) {
                document.getElementById(mainWin.finalarr[i]).disabled = false;
                document.getElementById(mainWin.finalarr[i]).style.display = "none";
                //document.getElementById(mainWin.finalarr[i]).className = 'BTNicon';
            }
        }
        return mainWin.finalarr;
    }
}

function ExtfnEnableAcns_OnActionCode(funcid, finalarr, action_arr) {

    // If no windows are opened then , disable all the actions
    /*
    11012012
    if (gNumChildWindows == 0)
        return;
    */
    /*
    if (gNumChildWindows == 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "hidden";
            //document.getElementById("Save").style.visibility = "hidden";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
        return;
    }
    if (gNumChildWindows > 0)
    {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++)
        {
            //document.getElementById(actions_arr[l_Itr]).style.visibility = "";
            //document.getElementById("Save").style.visibility = "";
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById("Save").className = 'BTNiconD';
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").className = 'BTNiconD';
        }
    }
    if (funcid == "") {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className ='BTNiconD';
        }
        return;
    }
    */

    //Murali performance tunning
    //while(!parent.gActiveWindow) {}  
    //while(!parent.gActiveWindow.dbDataDOM && parent.gActiveWindow.dbDataDOM!=null){} //ctcb 10.1 lot1 fixes
    //fnWait();
    //setTimeout('fnEnableAcns_OnActionCode()',20);
    //FCJ BranchEoi will be N normal,F - end of finanical input,T - end of transaction input,..
    // in cas eof fcis --> N - Online , T - Offline.
    var l_OfflineAllowed = 'N';
    //11012012
    //var functionId = document.getElementById("fastpath").value.toUpperCase();
    var functionId = mainWin.document.getElementById("fastpath").value.toUpperCase();
    /*
    try
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.6.0');
    } catch(e)
    {
        var xmlDOM = new ActiveXObject('Msxml2.DOMDocument.4.0');
    }
    xmlDOM.loadXML(parent.gXmlMenu);
    */
    //11012012
    //var xmlDOM = loadXMLDoc(gXmlMenu);
    var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    var functionIdNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + functionId + "']");
    //Changes for new menuXML starts
    if (functionIdNode) {
        for (var i = 0; i < functionIdNode.attributes.length; i++) {
            if (functionIdNode.attributes[i].nodeName == "OFFLINEALLOWED") {
                l_OfflineAllowed = functionIdNode.getAttribute("OFFLINEALLOWED");
                break;
            }
        }
    }
    //11012011
    //if (gActiveWindow && gActiveWindow.gAction == "") {
	//jc2_Changes start
	if (typeof (screenType) != "undefined" && screenType == "WB"){
	if( typeof(mainWin.branchAvlbltyStatus) == "undefined" || mainWin.branchAvlbltyStatus == null || mainWin.branchAvlbltyStatus=="" )//jc2 changes
	  mainWin.branchAvlbltyStatus  = 'Y';
	}
	//jc2_Changes end
    if (gAction == "") {
        if (dbDataDOM == null) {
            for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {
                if (finalarr[l_Cnt].toUpperCase() == "NEW") {
					if (mainWin.BranchEoi == 'N' || mainWin.eodFunctions.indexOf(functionId) != -1 || mainWin.branchAvlbltyStatus == 'Y') { //Fix for 20553520//24X7 toolbar
                        document.getElementById(finalarr[l_Cnt]).disabled = false;
                        document.getElementById(finalarr[l_Cnt]).style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        document.getElementById("EnterQuery").disabled = false;
                        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
                        //document.getElementById("EnterQuery").className = 'BTNicon';
                    } else {
                        if (l_OfflineAllowed != "Y") {
                            document.getElementById(finalarr[l_Cnt]).disabled = true;
                            document.getElementById(finalarr[l_Cnt]).style.display = "none";
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                            disableActionsInToolbar();
                        } else {
                            document.getElementById(finalarr[l_Cnt]).disabled = false;
                            document.getElementById(finalarr[l_Cnt]).style.display = "flex";//REDWOOD_CHANGES
                            //document.getElementById(finalarr[l_Cnt]).className = 'BTNicon';
                        }
                    }
                } else {
                    document.getElementById(finalarr[l_Cnt]).disabled = true;
                    document.getElementById(finalarr[l_Cnt]).style.display = "none";
                    //document.getElementById(finalarr[l_Cnt]).className = 'BTNiconD';
                }
            }
        }
    }

    /*if ((gActiveWindow && gActiveWindow.gAction == "ENTERQUERY")) {
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
    }
    */
    //11012012
    //if (funcid.charAt(2).toUpperCase() == "S" || (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1) && gActiveWindow.l_offlineAllowed != 'Y'))
    if (funcid.charAt(2).toUpperCase() == "S" || (mainWin.BranchEoi != "N" && screenType != 'WB' && (mainWin.branchAvlbltyStatus != 'Y') && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y')) { // Summary case//24X7 toolbar
        for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
            document.getElementById(finalarr[l_Itr]).disabled = true;
            document.getElementById(finalarr[l_Itr]).style.display = "none";
            //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").children[0].className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    }
    //showtoolbar tuning
    fnSetImgSrc(action_arr);
    changeSaveImg();
} //fnc
//If the delete button is enabled and once_auth for the record is yes, 
//then disable the delete button
function gnGetOnceAuth() {
    var l_Once_Auth = 'N';
    //11012012
    //if (gNumChildWindows != 0 && gActiveWindow)
    //{
    if (document.getElementsByName("ONCEAUTH").length > 0  && screenType  == "M") { //9NT1606_14_0_RETRO_12_2_27297039
        if (document.getElementsByName("ONCEAUTH")[0].value == "Y") l_Once_Auth = 'Y'; //9NT1606_14_0_RETRO_12_2_27297039
    }
    //}
    return l_Once_Auth;
}

function ExtshowToolbar(funcid, txnstat, authstat, showExecute) {
    var txn_auth_status = new Array(); //Array used to store txn and auth status
    //User just logs in /closes all function id's and toolbar should be disabled
    /*
    11012012
    if (!gActiveWindow || gNumChildWindows == 0) {
        disableAllTBButtons();
        return;
    }*/
    // if function id is null, disable all buttons
	if(gAction == "" && mainWin.CurrentBranch != mainWin.HOBranch && typeof (hoFunction) != 'undefined' && hoFunction == 'Y' && screenType != "WB" ){
        disableAllTBButtons();
        //if (mainWin.BranchEoi == 'N') { //Fix for 19780217 
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
        //}  //Fix for 19780217 
        return;
    }
    if (typeof (funcid) == 'undefined' || funcid == '') {
        disableAllTBButtons();
        //if(gActiveWindow.gAction == "ENTERQUERY"){
        if (gAction == "ENTERQUERY") {
            document.getElementById("ExecuteQuery").disabled = false;
            document.getElementById("ExecuteQuery").style.display = "flex";//REDWOOD_CHANGES
            //setInnerText(document.getElementById("EnterQuery").children[0], mainWin.getItemDesc("LBL_EXEC_QUERY"));
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").style.display = "none";
        }
        //hideToolBar();
        return;
    }
    //disabling toolbar on launch of summary, callform, Query, batch screens
    var screenTypes = "SCQB";
    //11012012
    //if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && gActiveWindow.screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
    if (screenTypes.indexOf(funcid.substring(2, 3)) >= 0 && screenType != 'WB') { //FCUBS10.3 WEBBRANCH CHANGES
        disableAllTBButtons();
        return;
    }
    //Disabling toolbar for eod status other than N (Also applicable for host screens)
    //11012012
    //if (BranchEoi != "N" && gActiveWindow.screenType != 'WB' && (mainWin.eodFunctions.indexOf(gActiveWindow.functionId) == -1)&& gActiveWindow.l_offlineAllowed != 'Y') {
    /*Fix for 19780217 Starts*/
	var branchEoi = "";
    if (!mainWin.txnBranch[g_txnBranch]) {
        branchEoi = mainWin.BranchEoi;
    }else{        
        branchEoi = mainWin.txnBranch[g_txnBranch].BranchEoi;
    }
    if (/*branchEoi != "N"*/((branchEoi != 'N'  && mainWin.branchAvlbltyStatus !='Y') || (mainWin.branchAvlbltyStatus =='N')) && screenType != 'WB' && (mainWin.eodFunctions.indexOf(functionId) == -1) && l_offlineAllowed != 'Y') { //Fix for 19719073//24x7 toolbar
        disableAllTBButtons();
        document.getElementById("EnterQuery").disabled = false;
        document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
        return;
    }
	/*Fix for 19780217 Ends*/
    //If dbDataDOM is undefined, disable the tool bar.
    /*
    if (!gActiveWindow.dbDataDOM || typeof(gActiveWindow.dbDataDOM) == 'undefined') {
        disableAllTBButtons();
        return;
    }
    */

    // dbDataDom is empty (Screen just launched without any data)
    //11012012
    //if (gActiveWindow.dbDataDOM == null) {
    if (dbDataDOM == null) {  
        disableAllTBButtons();
        //11012012
        //finalarr = finalarrBasedOnFuncRights(funcid,'','','');
        finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        //function that enables or disables the toolbar
        //11012012
        //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
        ExtfnEnableAcns_OnActionCode(funcid, finalarr, actions_arr);
        //if (mainWin.txnBranch[g_txnBranch].BranchEoi == 'N') { //Fix for 19719073,19780217 
        if(typeof(qryReqd) != 'undefined' && qryReqd=="N"){//toolbar changes
            document.getElementById("EnterQuery").disabled = true;
            document.getElementById("EnterQuery").style.display = "none";
        }else{
            document.getElementById("EnterQuery").disabled = false;
            document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
        }//toolbar changes    
            //document.getElementById("EnterQuery").className = 'BTNicon';
        //}
        //refreshToolBar();
        return;
    } else {
        //Obtain final array based on function rights
        //
        //if (gActiveWindow.screenType != "WB") {
        if (screenType != "WB") {
            finalarr = finalarrBasedOnFuncRights(funcid, '', '', '');
        } //FC11.0 WB CHANGES
        // Getting txn and auth status
        txn_auth_status = getTxnAndAuthStatus();
        /*If txnstat and authstat are passed from FID.js*/
        if (typeof (txnstat) == "undefined" || (typeof (txnstat) != "undefined" && txnstat == "")) {
            txnstat = txn_auth_status[0];
        }
        if (typeof (authstat) == "undefined" || (typeof (authstat) != "undefined" && authstat == "")) {
            authstat = txn_auth_status[1];
        }
        if (txn_auth_status)
        //11012012
        //if (gActiveWindow.screenType == "WB") {
        if (screenType == "WB") {
            if (gAction == "NEW" || gAction == "HOLD" || gAction == "") {
                gAction = "NEW";
                disableAllTBButtons(); //fc11.1wb changes
                enableSave();

                // FCUBS 11.4 Confirmation Changes Starts             
                if (typeof (dataObj) != "undefined" && dataObj.action == "ENRICH") {
                    if (typeof (mainWin.functionDef[funcid]) != "undefined") //11.4.0 ITR2 SFR 13483671 
                    { //11.4.0 ITR2 SFR 13483671 
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            fnEnableConfirmButton();
                        }
                    }
                } //11.4.0 ITR2 SFR 13483671 
                // FCUBS 11.4 Confirmation Changes Ends
                fnEnableHoldButton();
                enableDeleteForIPR();
                   //12.0.2_single_step_process
                    if (mainWin.functionDef[funcid].twoStepProcessing == "Y" && dataObj.firstStepDone == 'Y' ) {
					//FCUBS_12.1_SCTT starts
                    msgxmlDOM = loadXMLDoc(msgxml);
					//if (msgxmlDOM.text.indexOf("BRNIBTILUPDATE")!== -1){ //12.1_IQA_21254445
					if(getXMLString(msgxmlDOM).indexOf("BRNIBTILUPDATE") !== -1 ){ //12.1_IQA_21254445
                        //9NT1606_14_0_RETRO_12_1_27297102 starts
                        //if( mainWin.UserId == dataObj.makerId){
                        if((mainWin.UserId == dataObj.makerId) ||(mainWin.UserId ==dataObj.checkerId)){
                        //9NT1606_14_0_RETRO_12_1_27297102 ends
							disableAllTBButtons();
						  }
						else{
							enableSave();
						}
					}
					else{
					//FCUBS_12.1_SCTT  ends
                     if( mainWin.UserId == dataObj.makerId){
                      disableAllTBButtons();
                          fnEnableReverseButton();
                        fnEnableGenerateButton();
                     } else{
                      disableAllTBButtons();
                        enableSave();
                        fnEnableReverseButton();
                        fnEnableGenerateButton();
                        }
                    } //FCUBS_12.1_SCTT
				}
		   //12.0.2_single_step_process

                return;
            }
            if (gAction == "VIEW") {
                disableAllTBButtons();
                //11012012
                //gActiveWindow.gAction = 'VIEW';
                gAction = 'VIEW';
                enableDeleteForIPR();
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
		//1201_16386475 starts
              //  if (mainWin.functionDef[funcid].adviceReqd == "Y") {
			//9NT1606_12_4_RETRO_12_2_27074493 starts
               //if (mainWin.functionDef[funcid].adviceReqd == "Y" && dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "COM" && dataObj.msgType =='200') { 
            //9NT1606_14_0_RETRO_12_3_27392995 starts
            //if (mainWin.functionDef[funcid].adviceReqd == "Y" && ((dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "COM" && dataObj.msgType =='200')||(dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "TNK" && dataObj.msgType =='220')) ){ 			   
            if (mainWin.functionDef[funcid].adviceReqd == "Y" && ((parent.gTxnStatus == "COM" && parent.gStageStatus == "COM" && dataObj.msgType =='200')||(dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "TNK" && dataObj.msgType =='220')) ){ 			   
            //9NT1606_14_0_RETRO_12_3_27392995 ends
			//9NT1606_12_4_RETRO_12_2_27074493 ends
	       //1201_16386475 Ends
                    fnEnableGenerateButton();
                }
				
				 //FCUBS_121DEV_REVERSAL_ADV_RED
                 if (mainWin.functionDef[funcid].reversalAdviceRequired == "Y" && dataObj.oldStageStat == "REV" && dataObj.oldTxnStat == "REV") { 
	       //1201_16386475 Ends
                    fnEnableGenerateButton();
                }         
                //FCUBS_121DEV_REVERSAL_ADV_RED
                
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
               //12.0.2_single_step_process
                    if (mainWin.functionDef[funcid].twoStepProcessing == "Y" && dataObj.firstStepDone == 'Y' && mainWin.UserId != dataObj.makerId) {
					//FCUBS_12.1_SCTT Starts
					msgxmlDOM = loadXMLDoc(msgxml);
						//if(msgxmlDOM.text.indexOf("BRNIBTILUPDATE")!== -1){ //12.1_IQA_21254445
						if(getXMLString(msgxmlDOM).indexOf("BRNIBTILUPDATE") !== -1 ){ //12.1_IQA_21254445
						//9NT1606_14_0_RETRO_12_1_27297102 starts
						//if((dataObj.oldStageStat == "DIS" && dataObj.oldTxnStat == "DIS")||(dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "COM"))//12.1_ITR_21381519  Completed status added
						if((dataObj.oldStageStat == "DIS" && dataObj.oldTxnStat == "DIS")||(dataObj.oldStageStat == "COM" && dataObj.oldTxnStat == "COM")||(mainWin.UserId == dataObj.checkerId))
						//9NT1606_14_0_RETRO_12_1_27297102 ends
							disableAllTBButtons();
							else
							enableSave();
						}
						else{
						//FCUBS_12.1_SCTT ends
                        disableAllTBButtons();
                        enableSave();
                        fnEnableReverseButton();
                        fnEnableGenerateButton();
						}//FCUBS_12.1_SCTT
					}
				//12.0.2_single_step_process
                return;
            }
            //11012012
            //if (gActiveWindow.gAction == "REMOTEAUTH" || gActiveWindow.gAction == "AUTH") {
            if (gAction == "REMOTEAUTH" || gAction == "AUTH") {
                disableAllTBButtons(); //fc11.1wb changes
                fnEnableAuth();
                fnDisableHoldButton();
                //enableDeleteForIPR(); //Fix for 19767160
                return;
                //fnDisableHoldButton();
            }
            //11012012
            //if ((gActiveWindow.gAction == "REVERSE") || (gActiveWindow.gAction == "GENERATE")) {
            if ((gAction == "REVERSE") || (gAction == "GENERATE")) {
                disableAllTBButtons(); //fc11.1wb changes
                // FCUBS 11.4 Confirmation Changes Starts
                //11012012
                //if(typeof(gActiveWindow.dataObj) != "undefined"){
                if (typeof (dataObj) != "undefined") {
                    if (dataObj.action == "ENRICH") {
                        enableSave();
                        if (mainWin.functionDef[funcid].slipReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                        if (mainWin.functionDef[funcid].confirmReqd == "Y") {
                            fnEnableConfirmButton();
                        }
                    } else {
                        fnEnableReverseButton();
                        fnEnableGenerateButton();
                        //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button starts
                        if (mainWin.functionDef[funcid].adviceReqd == "Y") {
                            fnEnableGenerateButton();
                        }
                    }
                }
                // FCUBS 11.4 Confirmation Changes Starts
                //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_Branch_Advice_Reverse_button ends
                //fnDisableHoldButton();
                return;
                //fnDisableHoldButton();
            }
            return;
        }
        // gAction == "" means Action is successfully completed & DbDataDome not=""
        //11012012
        //if ((gActiveWindow.gAction == "" || gActiveWindow.gAction == "EXECUTEQUERY" || gActiveWindow.gAction == "VIEWMNTLOG") && (gActiveWindow.dbDataDOM != null)) {
        if ((gAction == "" || gAction == "EXECUTEQUERY" || gAction == "VIEWMNTLOG") && (dbDataDOM != null)) {
            disableAllTBButtons();
            finalarr = finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat);
            //call the function that enables and disables the Tool bar based on the finalArr
            enableOrDisableBasedOnLastAction(finalarr);
            //ExtfnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            document.getElementById("ExecuteQuery").disabled = true;
            document.getElementById("ExecuteQuery").style.display = "none";
            if(typeof(qryReqd) != 'undefined' && qryReqd=="N"){//toolbar changes
                document.getElementById("EnterQuery").disabled = true;
                document.getElementById("EnterQuery").style.display = "none";
            }else{
                document.getElementById("EnterQuery").disabled = false;
                document.getElementById("EnterQuery").style.display = "flex";//REDWOOD_CHANGES
            }    
            //document.getElementById("EnterQuery").className = 'BTNicon';
			if(authstat == "R")
				DisableToolbar_buttons("UNLOCK"); //Bug_34942797 
            return;
        }
        //enable and disable buttons according to gAction
        //11012012
        //if (gActiveWindow.gAction == "NEW" || gActiveWindow.gAction == "MODIFY") {
        if (gAction == "NEW" || gAction == "MODIFY") {
            disableAllTBButtons();
            //enableDeleteForIPR(); TODO
            enableHold();
            enableSave();
            //fnEnableAcns_OnActionCode(funcid,finalarr,actions_arr);
            return;
        }
        //11012012
        //if (gActiveWindow.gAction == "LIQUIDATE" || gActiveWindow.gAction == "ROLLOVER" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
        if (gAction == "LIQUIDATE" || gAction == "ROLLOVER" || (mainWin.applicationName == "FCIS" && gAction == "DELEGATE")) {
            //if (gActiveWindow.gAction == "DELETE" || gActiveWindow.gAction == "CLOSE" ||gActiveWindow.gAction == "REOPEN" ||gActiveWindow.gAction == "REVERSE" || gActiveWindow.gAction == "ROLLOVER"|| gActiveWindow.gAction == "CONFIRM"|| gActiveWindow.gAction == "LIQUIDATE" || (applicationName == "FCIS" && gActiveWindow.gAction == "DELEGATE")) {
            // Fix for 17885372 starts
			/*for (var l_Itr = 0; l_Itr < finalarr.length; l_Itr++) {
                document.getElementById(finalarr[l_Itr]).disabled = true;
                document.getElementById(finalarr[l_Itr]).style.display = "block";
                //document.getElementById(finalarr[l_Itr]).className = 'BTNiconD';
            }*/
			disableAllTBButtons();
			// Fix for 17885372 ends
            enableSave();
            return;
        }
        // Problem in obtaining gAction. Disable the toolbar.
        else {
            disableAllTBButtons();
            //hideToolBar();
            return;
        }
    }
}

//returns onceAuth flg
function getOnceAuth() {
    var l_OnceAuth = "N";
    //11012012
    //if (applicationName == "FCJ") {
    if (mainWin.applicationName == "FCJ") {
        l_OnceAuth = gnGetOnceAuth();
    }
    return l_OnceAuth;
}

function InitCap(str) {
    var str = str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
    if (str == "Delegate") str = "Rollover";
    return str;
}

//changes the save button image
function changeSaveImg() {
    if (document.getElementById("Save").disabled) {
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //document.getElementById("Save").className = "BTNiconD";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave_D.gif";
    } else {
        document.getElementById("Save").disabled = false;
        document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES
        //document.getElementById("Save").className = "BTNicon";
        //document.getElementById("Save").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
        //parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    }

}

function disableAllTBButtons() {
    if (actions_arr) {
        for (var l_Itr = 0; l_Itr < actions_arr.length; l_Itr++) {
            if (mainWin.applicationName == "FCIS" && actions_arr[l_Itr] == "ROLLOVER") {
                actions_arr[l_Itr] = "DELEGATE";
            }
            document.getElementById(actions_arr[l_Itr]).disabled = true;
            document.getElementById(actions_arr[l_Itr]).style.display = "none";
            //12012012
            //document.getElementById(actions_arr[l_Itr]).className = 'BTNiconD';
        }
        document.getElementById("Save").disabled = true;
        document.getElementById("Save").style.display = "none";
        //12012012
        //document.getElementById("Save").className = 'BTNiconD';
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
        //document.getElementById("EnterQuery").className = 'BTNiconD';
        /*
        12012012  
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").className = 'BTNiconD';
        */
    }
    fnSetImgSrc(actions_arr);
    changeSaveImg();
}

//returns the Txn and Auth status
function getTxnAndAuthStatus() {
    var txn_auth_status = new Array();

    var l_Txn_Auth_Stat = "";
    if ((gAction == "NEW" || gAction == "MODIFY") || screenType == 'WB') {
        l_Txn_Auth_Stat = "1~2"; // paTCH fix.
    } else {
        if (routingType == "X") {
            l_Txn_Auth_Stat = fnGetExtTxnAuthStat();
        } else {
            l_Txn_Auth_Stat = gnGetTxnAuthStat();
        }
    }
    txn_auth_status[0] = l_Txn_Auth_Stat.split("~")[0];
    txn_auth_status[1] = l_Txn_Auth_Stat.split("~")[1];

    return txn_auth_status;
}

function fnGetExtTxnAuthStat() {
    //11012012
    //var authStatNode = gActiveWindow.document.getElementsByName("AUTHSTAT");
    var authStatNode = document.getElementsByName("AUTHSTAT");
    var l_AuthVal = getAuthTxnNodeValue(authStatNode);
    /*if (AuthStatNode.checked == true)
        l_AuthVal = AuthStatNode.ON;
    else
        l_AuthVal = AuthStatNode.OFF;
    */
    //11012012
    //var txnStatNode = gActiveWindow.document.getElementsByName("TXNSTAT");
    var txnStatNode = document.getElementsByName("TXNSTAT");
    if(mainWin.applicationName == 'FCIS' && screenType=='O' && txnStatNode.length == 0) l_TxnVal='_';//Fix for 19393403
    else  l_TxnVal = getAuthTxnNodeValue(txnStatNode);//Fix for 19393403
    /*if (TxnStatNode.type.toUpperCase() == 'CHECKBOX') {
        if (TxnStatNode.checked == true)
            l_TxnVal = TxnStatNode.ON;
        else
            l_TxnVal = TxnStatNode.OFF;
    } else {
        l_TxnVal = parent.gActiveWindow.document.getElementsByName("TXNSTAT")[0].value;
    }
    */
    return (l_TxnVal + "~" + l_AuthVal);
}

function getAuthTxnNodeValue(objAuthTxn) {
    var authTxnNodeValue = "";
    if (objAuthTxn.length != 0) {
        var tagName = objAuthTxn[0].tagName;
        var type = objAuthTxn[0].type;
        switch (tagName.toUpperCase()) {
        case 'OJ-SELECT-ONE': //REDWOOD_CHANGES
        case 'SELECT':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
        case 'TEXTAREA':
            {
                authTxnNodeValue = objAuthTxn[0].value;
                break;
            }
        default:
            {
                switch (tagName.toUpperCase()) {   //REDWOOD_CHANGES
                case 'OJ-SWITCH':	  //REDWOOD_CHANGES
                    {
                        if (objAuthTxn[0].checked) {
                            authTxnNodeValue = objAuthTxn[0].getAttribute("ON");
                        } else authTxnNodeValue = objAuthTxn[0].getAttribute("OFF");
                        break;
                    }
                case 'OJ-RADIO-SET'://REDWOOD_CHANGES
                    {
                        for (var i = 0; i < objAuthTxn.length; i++) {
                            if (objAuthTxn[i].checked) {
                                authTxnNodeValue = objAuthTxn[i].value;
                                break;
                            }
                        }
                        break;
                    }
                default:
                    {
                        authTxnNodeValue = objAuthTxn[0].value;
                        break;
                    }
                }
            }
        }
        return authTxnNodeValue;
    } else {
        return "1~2";
    }
}
// returns the final rights array based on Txn rights
function finalarrBasedOnTxnRights(finalarr, funcid, txnstat, authstat) {
    l_OnceAuth = getOnceAuth();
    if (finalarr) {
        var t1 = mainWin.t[txnstat + '+' + authstat];
        var j = finalarr.length;
        var i = 0,
            k = 0,
            x = 0;
        var addIndex = 0;
        var finalArray = new Array();
        if (t1 != null) {
            if (finalarr.length > t1.length) {
                for (var k = 0; k < finalarr.length; k++) {
                    for (var x = 0; x < t1.length; x++) {
                        if (finalarr[k] == t1[x]) {
                            finalArray[finalArray.length] = finalarr[k];
                        }
                    }
                }
            } else {
                for (var k = 0; k < t1.length; k++) {
                    for (var x = 0; x < finalarr.length; x++) {
                        if (t1[k] == finalarr[x]) {
                            finalArray[finalArray.length] = t1[k];
                        }
                    }
                }
            }
        } else {
            return finalarr;
        }
    }
    return finalArray;
}

function enableOrDisableBasedOnLastAction(finalarr) {
    var lastAction = "";
    for (i = 0; i < finalarr.length; i++) {
        if (finalarr[i] == lastAction) {
            var temp = finalarr[i + 1];
            finalarr[i + 1] = finalarr[lastElement];
            for (j = i + 2; j < finalarr.length; j++) {
                var temp1 = finalarr[j];
                finalarr[j] = temp;
                temp = temp1;
            }
        }

        if (finalarr[i]) {
            document.getElementById(finalarr[i]).disabled = false;
            document.getElementById(finalarr[i]).style.display = "flex";//REDWOOD_CHANGES
            //document.getElementById(finalarr[i]).className ='BTNicon';
        }
    }
}

function enableHold() {
    for (var l_Cnt = 0; l_Cnt < actions_arr.length; l_Cnt++) {
        if (actions_arr[l_Cnt].toUpperCase() == "HOLD" || ((screenType == "P" || screenType == "T") && actions_arr[l_Cnt].toUpperCase() == "ROLLOVER")) {
            continue;
        }
        document.getElementById(actions_arr[l_Cnt]).disabled = true;
        document.getElementById(actions_arr[l_Cnt]).style.display = "none";
        //document.getElementById(actions_arr[l_Cnt]).className = 'BTNiconD';
    }
    // If the LATESTVERNO is 1 and Record is UnAuthorized, and Action id Unlock
    // then Hold shud be enabled if its available in list of actions.
    for (var l_Cnt = 0; l_Cnt < finalarr.length; l_Cnt++) {

        if (finalarr[l_Cnt].toUpperCase() == "HOLD") {
            document.getElementById("Hold").disabled = true;
            document.getElementById("Hold").style.display = "none";
            //document.getElementById("Hold").className = 'BTNiconD';
            if (gAction == "NEW" || gAction == "MODIFY") {
                document.getElementById("Hold").disabled = false;
                document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                //document.getElementById("Hold").className = 'BTNicon';
            } else {
                var l_txnval = getTxnVal_Mapping("CONTSTAT");
                if (typeof (holdStatus) != "undefined") if (gAction == "MODIFY" && (l_txnval == "H" || holdStatus.toUpperCase() == "HOLD")) {
                    document.getElementById("Hold").disabled = false;
                    document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
                    //document.getElementById("Hold").className = 'BTNicon';
                }
            }
        }
    }
}

function enableDeleteForIPR() {
    if (parent.gTxn != undefined && parent.gTxn != null) {
   //     if (parent.gTxn == 'IPR' && parent.gStage == 'IPR') {    //12.0.2_single_step_process
	       if (parent.gTxn == 'IPR' && parent.gStage == 'IPR' && mainWin.UserId == dataObj.makerId) {    //12.0.2_single_step_process
            document.getElementById("Delete").disabled = false;
            document.getElementById("Delete").style.display = "flex";//REDWOOD_CHANGES
        }
    }
	    //12.0.2_single_step_process
if( dataObj.twoStepProcess =='Y' && dataObj.firstStepDone =='Y' && mainWin.UserId == dataObj.makerId ) {
    document.getElementById("Delete").disabled = true;
	    document.getElementById("Delete").style.display = "none";
}
//12.0.2_single_step_process	
//FCUBS_12.1_SCTT Starts
else if( dataObj.twoStepProcess =='Y' && dataObj.firstStepDone =='Y' && mainWin.UserId != dataObj.makerId ) {
   msgxmlDOM = loadXMLDoc(msgxml);
   //if (msgxmlDOM.text.indexOf("BRNIBTILUPDATE")!== -1){ //12.1_IQA_21254445
   if(getXMLString(msgxmlDOM).indexOf("BRNIBTILUPDATE") !== -1 ){ //12.1_IQA_21254445
           document.getElementById("Delete").disabled = false;
        document.getElementById("Delete").style.display = "flex";//REDWOOD_CHANGES
   }
}
//FCUBS_12.1_SCTT ends
    
}

function enableSave() {
    //document.getElementById("Save").className ="BTNicon";
    document.getElementById("Save").disabled = false;
    document.getElementById("Save").style.display = "flex";//REDWOOD_CHANGES

    /*document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";
    document.getElementById("buttonSave").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").disabled = false;
    parent.window.frames["FrameMenu"].document.getElementById("actions4").firstChild.src = theme_imagesPath + "/Toolbar/icSave.gif";*/

}

function fnEnableAuth() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").style.display = "none";
    //gActiveWindow.gAction ='REMOTEAUTH';
    gAction = 'REMOTEAUTH';
    document.getElementById("Authorize").disabled = false;
    document.getElementById("Authorize").style.display = "flex";//REDWOOD_CHANGES
}

function fnDoReverse() {
    document.getElementById("Save").disabled = true;
    document.getElementById("Save").style.display = "none";
    document.getElementById("Reverse").disabled = false;
    document.getElementById("Reverse").style.display = "flex";//REDWOOD_CHANGES
    //mainWin.gActiveWindow.gAction ='REVERSE';
    gAction = 'REVERSE';
}


function fnEnableReverseButton(){
    
    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";
    document.getElementById("Reverse").disabled = false;
    document.getElementById("Reverse").style.display = "flex";//REDWOOD_CHANGES
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse.gif";

}
function fnDisableReverseButton()
{
    //document.getElementById("Reverse").className ="BTNiconD";
    //document.getElementById("Reverse").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
    document.getElementById("Reverse").disabled = true;
    document.getElementById("Reverse").style.display = "none";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").disabled = true;
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.className = "BTNiconD";
    //parent.window.frames["FrameMenu"].document.getElementById("operation3").firstChild.src = theme_imagesPath + "/Toolbar/icReverse_D.gif";
}

function fnEnableGenerateButton() {
    document.getElementById("Generate").disabled = false;
    document.getElementById("Generate").style.display = "flex";//REDWOOD_CHANGES
}

function fnEnableHoldButton() {
    document.getElementById("Hold").disabled = false;
    document.getElementById("Hold").style.display = "flex";//REDWOOD_CHANGES
}

function fnDisableHoldButton() {
    document.getElementById("Hold").disabled = true;
    document.getElementById("Hold").style.display = "none";
}

function fnView() {
    mainWin.gActiveWindow.gAction = 'VIEW';
}

function fnEnableConfirmButton() {
    document.getElementById("Confirm").disabled = false;
    document.getElementById("Confirm").style.display = "flex";//REDWOOD_CHANGES
}

function disableActionsInToolbar()
{
    var jIndex = mainWin.finalarr.length;
    document.getElementById("Save").disabled = true;
    for (index = 0; index < jIndex; index++)
    {
        document.getElementById(mainWin.finalarr[index]).disabled = true;
    }
}
/*Fix for 17049206-bulk auth Changes start*/
function getActionRights(action,funcID) {
    var hasRights = false;
	var tmpfnId = functionId;
	if(typeof(funcID) != "undefined" && funcID != "")
		tmpfnId = funcID;
    var finalArr = finalarrBasedOnFuncRights(tmpfnId, '', '');
    for(var i=0; i<finalArr.length; i++){
        if (finalArr[i].toUpperCase() == action.toUpperCase()){
			hasRights = true;
			break;
		}
	}
    return hasRights;
}
/*Fix for 17049206-bulk auth Changes end*/
var headerVisited = 0;//Fix for 31066455
function  expandCollapseSection(elem, action)
{
   // for(var secCount = 1 ; secCount < secContainer.length; secCount++){
    if(action == 'COLLAPSE'){
			//Fix for 31066455 starts
		if (document.getElementsByClassName("DIVHeader") && document.getElementsByClassName("DIVHeader")[0].getAttribute("style") != null) {
			if(headerVisited > 1) {
				document.getElementsByClassName("DIVHeader")[0].style.height = document.getElementsByClassName("DIVHeader")[0].getAttribute("tempheight")+"px";
			}
			if(headerVisited == 1) {
				var styleValue = document.getElementsByClassName("DIVHeader")[0].getAttribute("style");
				document.getElementsByClassName("DIVHeader")[0].setAttribute("tempstyle", styleValue);
				document.getElementsByClassName("DIVHeader")[0].removeAttribute("style");
			}
		}
		//Fix for 31066455 ends
      elem.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';//Fix for 17233213 
     elem.parentNode.parentNode.parentNode.parentNode.children[0].style.display = 'block';//Fix for 17233213 
    }
    else{
		//Fix for 31066455 starts
		if (document.getElementsByClassName("DIVHeader") && document.getElementsByClassName("DIVHeader")[0].getAttribute("tempstyle") != null) {
			if(headerVisited == 1) {
				var tempStyleValue = document.getElementsByClassName("DIVHeader")[0].offsetHeight;
				document.getElementsByClassName("DIVHeader")[0].setAttribute("tempheight",tempStyleValue);
			}
			var styleValue = document.getElementsByClassName("DIVHeader")[0].getAttribute("tempstyle");
			document.getElementsByClassName("DIVHeader")[0].setAttribute("style", styleValue);
			//document.getElementsByClassName("DIVHeader")[0].removeAttribute("tempstyle");
		}
		headerVisited++;
		//Fix for 31066455 ends
      elem.parentNode.parentNode.parentNode.children[1].style.display = 'block';//Fix for 17233213 
        elem.parentNode.parentNode.parentNode.children[0].style.display = 'none';//Fix for 17233213 
    }
   // }
    //Fix for 31066455 starts
	if (action == "COLLAPSE" && document.getElementsByClassName("DIVHeader") && document.getElementsByClassName("DIVHeader")[0].getAttribute("style") != null) {
		fnCalcHgtTabContainer("COLLAPSE");
	} else {//Fix for 31066455 ends
    fnCalcHgtTabContainer();//change to fix tab container height while section expand/collapse 19/Jan/2017    
    }//Fix for 31066455
}

function setHorizontalPosition(elem, isMargin, position){
if((mainWin.LangCode) && (mainWin.LangCode.toUpperCase() == 'ARB')){
    if(isMargin){
        elem.style.marginRight =  position + 'px';  
    }
    else{
      elem.style.right =  position + 'px';  
    }  
  }
  else{
   if(isMargin){
      elem.style.marginLeft =  position + 'px';  
    }
    else{
      elem.style.left =  position + 'px';  
    }    
  }
}


/*12.0.2 Screen Saver Changes Start*/
function closeScreenSaverScreen() {
    unmask();
    window.frameElement.src = "";
    window.frameElement.height = 0;
    window.frameElement.width = 0;
    parent.document.getElementById("Div_AlertWin").style.display = "none";
    if (fromLogin != "false") {
        parent.reqSignOff();
        parent.location.href = "LoginServlet";
    }
    if (fromLogin == "false") {
        parent.document.getElementById("LoggedUser_Menu").focus();
        parent.document.getElementById("LoggedUser_Menu").className == "navhover";
    }
}

function saveScreenSaverTimeScreen() {
    var enterScreenSaver = document.getElementById("enterScreenSaver").value;
    if (fromLogin == "false") parent.alertAction = "CHGSCRNSAVER";
    if (enterScreenSaver == "") {
        var alertXML = fnBuildAlertXML('', 'I', enterScreenSaver);
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("enterScreenSaver")[0].focus();
    }else if(isNaN(enterScreenSaver)==true){
    var alertXML = fnBuildAlertXML('', 'I', "Only Numeric value is allowed");
        showAlerts(alertXML, 'I');
        parent.gAlertMessage = gAlertMessage;
        document.getElementsByName("enterScreenSaver")[0].focus();
    }
}
/*12.0.2 Screen Saver Changes End*/
 


//Changes for 17359563  start
function fnModifyMISSubScreenXml(currXml) {
    if(functionId == 'MDCD'){//mdcd_changes
    var partNodes = selectNodes(currXml, "//PART");
	 var misNode = selectSingleNode(parent.fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']/FV");
	if(misNode != null) {
    var recMIS = getNodeText(selectSingleNode(parent.fcjResponseDOM, "//REC[@TYPE = 'BLK_MIS_DETAILS']/FV")).split("~");
       for (var i = 0; i < partNodes.length - 2; i++) {
        var fldNodes = selectNodes(partNodes[i + 2], "FLDSET/FIELD");
        for (var j = 0; j < fldNodes.length; j++) {
            if(recMIS[i * fldNodes.length + j] != ""){
            setNodeText(selectSingleNode(fldNodes[j], "LBL"), recMIS[i * fldNodes.length + j]);
            }
            else{
              fldNodes[j].parentNode.removeChild(fldNodes[j]);
            }
        }
	   }
	 }
	} 
    return currXml;
}
//Changes for 17359563  end
//12.0.3 Defaulting global variables start
function fnBuildGlobalVar() {

    var globals = "@@global.HOBranch~~" + mainWin.HOBranch;
    globals += "@@global.BankCode~~" + mainWin.BankCode;
    globals += "@@global.Lcy~~" + mainWin.Lcy;
    globals += "@@global.countryOfficeCode~~" + mainWin.countryOfficeCode;
    globals += "@@global.CurrentBranch~~" + mainWin.CurrentBranch;
    globals += "@@global.CurrentLV~~" + mainWin.CurrentLV;
    globals += "@@global.UserId~~" + mainWin.UserId;
    globals += "@@global.AppDate~~" + mainWin.AppDate;
    globals += "@@global.LangCode~~" + mainWin.LangCode;
    globals += "@@global.BranchEoi~~" + mainWin.BranchEoi;
    globals += "@@global.countryCode~~" + mainWin.countryCode;
    globals += "@@";
    return globals;
}
//12.0.3 Defaulting global variables end

// 12.0.3 Enable/Disable Screen Element starts
 function fnDisableScreenElement(arg) {
    if (typeof(arg) != "undefined" && arg != null) {
        var obj = document.getElementById(arg);
        if (obj) disableForm(obj);
    }
}

 function fnEnableScreenElement(arg) {
    if (typeof(arg) != "undefined" && arg != null) {
        var obj = document.getElementById(arg);
        if (obj) enableForm(obj);
    }
}
// 12.0.3 Enable/Disable Screen Element ends


//12.0.3 Data entry image changes start
function showDataEntryImage(imgReferenceId, imageFldset) { 
    var oldaction = gAction;
    gAction = 'DATAENTRYIMGREAD';            
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var msg_Status = fnProcessResponse();
    if(msg_Status == "SUCCESS"){
		if(imageFldset){
			var zoomin = mainWin.getItemDesc("LBL_ZOOMIN");
			var zoomout = mainWin.getItemDesc("LBL_ZOOMOUT");
			var fldset = document.getElementById(imageFldset);
			var strPath = 'TempForward.jsp?action=DataEntryImageReaderServlet';
/* 14.1 Fortify fix */
                        var nodePath = imgReferenceId.substring(0,imgReferenceId.lastIndexOf("__")) + "/" +imgReferenceId.substring(imgReferenceId.lastIndexOf("__") + 2);
                        var imgReferenceNo = getNodeText(selectSingleNode(dbDataDOM, "//"+nodePath));
			if(!document.getElementById("dataEntryDiv_"+imgReferenceNo)){
				var imageHTML = '<div class="widgetonecontainer" style="width:99%" id="dataEntryDiv_'+imgReferenceNo+'" role="group" aria-labelledby="dataEntryDiv_'+imgReferenceNo+'">';
				imageHTML += '<div class="DIVpage" style="width:99.4%"><span class="DIVpageH">&nbsp;&nbsp;</span><span class="SPNpageH">';
				imageHTML += '<button class="BTNicon2" title="'+zoomin+'" name="incSize"  id="incSize" onClick="zoomInImage(\'imgIframe_'+imgReferenceNo+'\');"><span tabindex="-1" class="ICOzoomin"><span class="LBLinv">'+zoomin+'</span></span></button>';
				imageHTML += '<button class="BTNicon2" title="'+zoomout+'" name="decSize"  id="decSize" onClick="zoomOutImage(\'imgIframe_'+imgReferenceNo+'\');"><span tabindex="-1" class="ICOzoomout"><span class="LBLinv">'+zoomout+'</span></span></button></span></div>';
				imageHTML += '<div class="DIVText" id="IMAGEDIV_'+imgReferenceNo+'">';
				imageHTML += '<LABEL class="LABELNormal" for=""></LABEL>';
				imageHTML += '<iframe class="IMGButton" id="imgIframe_'+imgReferenceNo+'" style="border:2px solid #cccccc;min-height:11em;width:100%;overflow:hidden; src="" alt="No image"></iframe>';
				imageHTML += '</div>';
				fldset.innerHTML = fldset.innerHTML + imageHTML;
			}
			var iframeElem = document.getElementById("imgIframe_"+imgReferenceNo);
			iframeElem.style.height = fldset.parentNode.parentNode.offsetHeight - fldset.getElementsByTagName("legend")[0].offsetHeight - fldset.children[1].children[0].offsetHeight - 28 + "px";
			iframeElem.src = strPath + '&refNo=' + imgReferenceNo + '&FUNCTIONID=' + functionId + '&txnBranch=' + g_txnBranch;
		}
    }
    gAction= oldaction;
    return true;
}

function zoomInImage(imgObjName,index) {
     getUploadImageObj(imgObjName,index);  //R4Citi Signature changes    
     var imgWidth = uploadedImgObj.width;
     var imgHeight = uploadedImgObj.height;
      if (navigator.userAgent.indexOf("Opera") !=  - 1) {
          alert(mainWin.getItemDesc("LBL_NSUPPORT"))
          return;
      }
      if (navigator.userAgent.indexOf("MSIE ") ==  - 1) {
       document.getElementById(imgObjName).className = "IMGBUTTON";
       document.getElementById(imgObjName).style.display='block';
       uploadedImgObj.style.display='block';
      }
      if (parseInt(uploadedImgObj.height) < 1000) {
          uploadedImgObj.height = imgHeight + 100;
          uploadedImgObj.width= imgWidth+100;
          document.getElementById("decSize").disabled = false;
      }
      else {
          document.getElementById("incSize").disabled = true;
      }
}

function zoomOutImage(imgObjName,index) {
    getUploadImageObj(imgObjName,index); //R4Citi Signature changes
    var imgWidth = uploadedImgObj.width;
    var imgHeight = uploadedImgObj.height;
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
          alert(mainWin.getItemDesc("LBL_NSUPPORT"))
          return;
    }
    if (navigator.userAgent.indexOf("MSIE ") ==  - 1) {
     document.getElementById(imgObjName).className = "IMGBUTTON";
     document.getElementById(imgObjName).style.display='block';
     uploadedImgObj.style.display='block';
    }
    if (parseInt(uploadedImgObj.height) > 100) {
        uploadedImgObj.height = imgHeight - 100;
        uploadedImgObj.width= imgWidth - 100;
        document.getElementById("incSize").disabled = false;
    }
    else {
        document.getElementById("decSize").disabled = true;
    }
}

//12.0.3 Data entry image changes end

function getUploadImageObj(imgObjName) {
    var imgIFrame = document.getElementById(imgObjName);
		var doc = imgIFrame.contentDocument || imgIFrame.contentWindow.document;
		if(doc.getElementById('canvas'))
  			objCanvas = doc.getElementById('canvas');
		if( doc.getElementsByTagName("IMG").length> 0){
          var imgObj =  doc.getElementsByTagName("IMG")[0];
          imgObj.setAttribute("id", "displayImg"); 
    }
    uploadedImgObj= doc.getElementById("displayImg");
}

//	12.0.3 citi_dev fix for ME LOV issue start
	function replaceAll(str, searchChar, replaceChar) {
		var retStr = "";
		retStr = str.replace(new RegExp(searchChar, "g"),replaceChar);
		return retStr;
	}
//	12.0.3 citi_dev fix for ME LOV issue end


/*R4 Citi Signature Verification change start*/
function fnCrotate(imgObjName, index){
    if(document.getElementById("rotateAngle"+ index))
      angle=parseInt(document.getElementById("rotateAngle"+ index).value);    
    
    
    angle += 90;
    
    if (angle > 359){
            angle = 0;
    }
    SetRotation(imgObjName, angle, index);
    if(document.getElementById("rotateAngle"+ index))
      document.getElementById("rotateAngle"+ index).value = angle; 
}
        
function fnArotate(imgObjName, index){ 
    imgIFrame = document.getElementById(imgObjName);
    if(document.getElementById("rotateAngle"+ index))
          angle=parseInt(document.getElementById("rotateAngle"+ index).value);  
     deg2rad = Math.PI / 180;
     angle -= 90;
      if (angle < 0){
              angle = 360;
      }
      SetRotation(imgObjName, angle, index);
     if(document.getElementById("rotateAngle"+ index))
          document.getElementById("rotateAngle"+ index).value = angle; 
}

function SetRotation(imgObjName, deg, index){
    deg2rad = Math.PI / 180;
    getUploadImageObj(imgObjName, index);
    
     if(typeof(objCanvas.getContext) !="undefined" && objCanvas.getContext('2d')){
        uploadedImgObj.style.display='none';
        objCanvas.className = "";
        objCanvas.style.display='block';
        var cContext = objCanvas.getContext('2d');
        var cw = uploadedImgObj.width, ch = uploadedImgObj.height, cx = 0, cy = 0;              
        switch(deg){
            case 90:
                cw = uploadedImgObj.height;
                ch = uploadedImgObj.width;
                cy = uploadedImgObj.height * (-1);
            break;
            case 180:
                cx = uploadedImgObj.width * (-1);
                cy = uploadedImgObj.height * (-1);
            break;
            case 270:
                cw = uploadedImgObj.height;
                ch = uploadedImgObj.width;
                cx = uploadedImgObj.width * (-1);
            break;
        }                
        objCanvas.setAttribute('width', cw);
        objCanvas.setAttribute('height', ch);
        cContext.rotate(deg * deg2rad);
        cContext.drawImage(uploadedImgObj, cx, cy);
    } else {
        uploadedImgObj.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingmethod='auto expand')";
        rad = deg * deg2rad
        costheta = Math.cos(rad)
        sintheta = Math.sin(rad)
        uploadedImgObj.filters.item(0).M11 = costheta
        uploadedImgObj.filters.item(0).M12 = -sintheta
        uploadedImgObj.filters.item(0).M21 = sintheta
        uploadedImgObj.filters.item(0).M22 = costheta
    }
}

function fnFlipH(imgObjName, index) {
    getUploadImageObj(imgObjName, index);
    if(document.getElementById("hz"+ index))
          hz=parseInt(document.getElementById("hz"+ index).value);
    if (getBrowser().indexOf("OPERA") != -1) {
        alert(mainWin.getItemDesc("LBL_NSUPPORT"))
        return;
    }
    if(typeof(objCanvas.getContext) !="undefined" && objCanvas.getContext('2d')){
        var cContext = objCanvas.getContext('2d');
        uploadedImgObj.style.display = 'none';
        objCanvas.className = "";
        objCanvas.style.display = 'block';
        if (hz == 0) {
            cContext.translate(uploadedImgObj.width, 0);
            cContext.scale(1,  - 1);
            cContext.translate(uploadedImgObj.width, 0);
            cContext.scale( - 1, 1);
            cContext.translate(uploadedImgObj.width, 0);
            cContext.scale(1,  - 1);
            cContext.drawImage(uploadedImgObj, 0, 0, uploadedImgObj.width, uploadedImgObj.height);
            hz = 1;
        } else {
            if (hz == 1) {
                cContext.translate(uploadedImgObj.width, 0);
                cContext.scale( - 1, 1);
                cContext.drawImage(uploadedImgObj, 0, 0, uploadedImgObj.width, uploadedImgObj.height);
                hz = 0;
            }
        }
    } else {
        if (hz == 0) {
            document.getElementById(imgObjName).filters.fliph.enabled = false
            hz = 1
        } else {
            if (hz == 1) {
                document.getElementById(imgObjName).filters.fliph.enabled = true
                hz = 0
            }
        }
    }
    if(document.getElementById("hz"+ index))
          document.getElementById("hz"+ index).value = hz; 
}

function fnFlipV(imgObjName, index) {
    getUploadImageObj(imgObjName, index);
    if(document.getElementById("vt"+ index))
        vt=parseInt(document.getElementById("vt"+ index).value);
    if (getBrowser().indexOf("OPERA") != -1 ) {
        alert(mainWin.getItemDesc("LBL_NSUPPORT"));
        return;
    }
    if(typeof(objCanvas.getContext) !="undefined" && objCanvas.getContext('2d') && navigator.userAgent.indexOf("MSIE ") ==  - 1  ){//Fix for 21534763
        objCanvas.className = "";
        var cContext = objCanvas.getContext('2d');
        uploadedImgObj.style.display = 'none';
        objCanvas.style.display = 'block';
        if (vt == 0) {
            cContext.translate(0, uploadedImgObj.height);
            cContext.scale( - 1, 1);
            cContext.translate(0, uploadedImgObj.height);
            cContext.scale(1,  - 1);
            cContext.translate(0, uploadedImgObj.height);
            cContext.scale( - 1, 1);
            cContext.drawImage(uploadedImgObj, 0, 0, uploadedImgObj.width, uploadedImgObj.height);
            vt = 1;
        } else {
            cContext.translate(0, uploadedImgObj.height);
            cContext.scale(1,  - 1);
            cContext.drawImage(uploadedImgObj, 0, 0, uploadedImgObj.width, uploadedImgObj.height);
            vt = 0;
        }
    } else {
        if (vt == 0) {
            document.getElementById(imgObjName).filters.flipv.enabled = false
            vt = 1
        } else {
            if (vt == 1) {
                document.getElementById(imgObjName).filters.flipv.enabled = true
                vt = 0
            }
        }
    }
    if(document.getElementById("vt"+ index))
        document.getElementById("vt"+ index).value = vt; 
}
/*R4 Citi Signature Verification change ends*/

// 12.0.3 toolbar label changes starts
function fnChangeToolbarLabel(action,labelCode) {
    var labelDesc = mainWin.getItemDesc(labelCode);
   // document.getElementById(action).innerHTML =  "<a onkeydown=\"fnHandleScrBtn(event)\" class=\"TBitem\" onclick=\"doAction(\'"+action+"\',event)\" href=\"#\">"+labelDesc+"</a>";   
    document.getElementById(action).innerHTML =  '<button class="oj-button-button" aria-labelledby="Confirm_oj11|text" disabled=""><div class="oj-button-label"><span class="oj-button-icon oj-start"><span slot="startIcon" class="oj-ux-ico-completed"></span></span><span class="oj-button-text" id="Confirm_oj11|text">'+labelDesc+'\n</span></div></button>\n'; //REDWOOD_35328171
}
// 12.0.3 toolbar label changes ends


//Fix for 18678458 -Index Basedsearch changes start
function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
  var index = temp.indexOf(stringToFind);
  while(index != -1){
      temp = temp.replace(stringToFind,stringToReplace);
      index = temp.indexOf(stringToFind);
  }
  return temp;
}


function getBrowser(){//session expiry change start
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';   
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;   
    var browser = "SAFARI";
    if(isIE){
        var ie=" IE: ";
        var version=getIEVersionNumber();
        browser = ie + version;
    }               
    if (isFirefox) {
        browser = "FIREFOX";
    }
    else if (isOpera) {
        browser = "OPERA";
    }
    else if (isChrome) {
        browser = "CHROME";
    }
    else if (isSafari) {
        browser = "SAFARI";
    }
    return browser;

}//session expiry change end

function getUIXML(xmlFileName){
	var tempXmlName = xmlFileName.replace(/[^a-zA-Z0-9]/g, "");
	//if(typeof(mainWin.screenHtmlCache[tempXmlName]) == "undefined" ||  functionId == "CSCFNUDF" || functionId == "CSCTRUDF"|| functionId == "MDCD" || functionId == "PXCTRUDF"){ //21449616  //FCUBS_12.3Payments_UDF_Changes  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430 commenting
	if(typeof(mainWin.screenHtmlCache[tempXmlName]) == "undefined" ||  functionId == "CSCFNUDF" || functionId == "CSCTRUDF"|| functionId == "MDCD"|| functionId == "UDCD"){  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
	//9NT1606_12_4_RETRO_12_3_26913081 added UDCD functionid
		mainWin.screenHtmlCache[tempXmlName] =  "";//Caching changes  start
		  debugs("Before loading xml", "");
                  
		mainWin.screenHtmlCache[tempXmlName] = getXMLString(loadXMLFile(xmlFileName));
                //cachedXml = new mainWin.screenXMLCache(tempXmlName, xmlDoc);
		  debugs("After loading xml", "");
		if(typeof (screenType) != "undefined"){
			if(screenType == "WB" && functionId != "UDCD"){ //9NT1606_12_2_RETRO_12_1_23664151 changes 
				mainWin.screenHtmlCache[tempXmlName] = getXMLString(embeddcall(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName])));        
				mainWin.screenHtmlCache[tempXmlName] = getXMLString(fnModifyMISSubScreenXml(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName]))); //21449616 
			}
		else{      
                if (typeof (callformTabArray) != "undefined") {
                    for (var i in callformTabArray) {
                         mainWin.screenHtmlCache[tempXmlName]  = getXMLString(insertCallFormXmlToTab(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName]), i, callformTabArray[i]));
                    }
                }
				//if (functionId == "CSCFNUDF" || functionId == "CSCTRUDF" || functionId == "PXCTRUDF") { //FCUBS_12.3Payments_UDF_Changes  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430 commenting
				if (functionId == "CSCFNUDF" || functionId == "CSCTRUDF") {  //FCUBS_12.3_Payments_UDF_Changes_SFR#24916430
                     mainWin.screenHtmlCache[tempXmlName] = getXMLString(convertUDFToSE(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName])));
                }
				//9NT1606_12_2_RETRO_12_1_23664151 starts
                if (functionId == "UDCD") 
		        {				
                     mainWin.screenHtmlCache[tempXmlName] = getXMLString(convertWBUDFToSE(loadXMLDoc(mainWin.screenHtmlCache[tempXmlName])));
                }
				//9NT1606_12_2_RETRO_12_1_23664151 ends

      }
	}
		}//Caching changes  end
        return loadXMLDoc(mainWin.screenHtmlCache[tempXmlName]) ; 
}
//Fix for 19274435 starts.
function resizeImage(event) {
    var sourceElement = getEventSourceElement(event);
    var iframe = document.getElementById(sourceElement.id);
    try {
        //Fix for 19704795 starts
        document.getElementById(sourceElement.id).contentWindow.document.oncontextmenu = function(){return false;};; //Fix for 19435330
        var doc = iframe.contentDocument || iframe.contentWindow.document; 
        if (document.getElementById("tableImageSign1") != undefined) {
            var actualHeight = fnGetParentHTMLElement(document.getElementById("tableImageSign1")).offsetHeight - 2*(fnGetParentHTMLElement(document.getElementById("tableImageSign1")).children[0].offsetHeight);
            iframe.height = actualHeight - (document.getElementById("SignHeading").offsetHeight + getPreviousSibling(fnGetParentHTMLElement(fnGetParentHTMLElement(iframe))).offsetHeight + getNextSibling(fnGetParentHTMLElement(fnGetParentHTMLElement(iframe))).offsetHeight + 4) + "px";            
        }
        if (doc.getElementsByTagName("IMG")[0] != undefined) {
            doc.getElementsByTagName("IMG")[0].style.width = "99%";
            doc.getElementsByTagName("IMG")[0].style.height = "99%";
        }
	//Fix for 19704795 ends
    }catch(ex) {}
}//Fix for 19274435 ends. 

/*Fix for 19394010 */
function setRadioFieldDataLOV(radioObject, value) {
    var radioObjects =  document.getElementById(radioObject.id).parentNode.parentNode.getElementsByTagName("INPUT");
    for (var index = 0; index < radioObjects.length; index++) {
        if (value == radioObjects[index].value) {
            radioObjects[index].checked = true;
            break;
        }
    }
}
/*function appendDebug(fcjResponseDOM) { //Logging changes
     if(mainWin.DebugWindowFlg == "Y") {
     	if(typeof(ShowSummary)!= "undefined" && ShowSummary == 'TRUE'){
          launchWebDbg = webDbg
        }
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/WB_DEBUG"))
            webDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/WB_DEBUG"));
         else webDbg = "";
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/AP_DEBUG")) 
            appDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/AP_DEBUG"));
         else appDbg = "";debug revert
         if(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/DB_DEBUG")) 
            dbDbg = getNodeText(selectSingleNode(fcjResponseDOM,"//FCUBS_DEBUG_RESP/DB_DEBUG"));
         else dbDbg = "";
     
         //mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg+"\n\n"+dbDbg;
          //if(typeof(ShowSummary)!="undefined" && ShowSummary == 'TRUE'){
          mainWin.serverDebugStmt =dbDbg;
        //}else{
          //mainWin.serverDebugStmt = webDbg + "\n\n"+ appDbg+"\n\n"+dbDbg;
        //}
    }
}*/
function getSeqNo() {
     var parentVal = "";
     var sequenceNo ;
     if(typeof (tempSeqNo) != "undefined" && tempSeqNo != '')
        return tempSeqNo;
     if(typeof (parent.tempSeqNo) != "undefined" && parent.tempSeqNo != '')
        return parent.tempSeqNo;
    if(typeof (seqNo) != "undefined" && seqNo != '')
        return seqNo;
     
    while (typeof (sequenceNo) == "undefined") {
        parentVal += "parent."
        var fnEval = new Function("return " + parentVal + "seqNo");
        sequenceNo = fnEval();
    }
    return sequenceNo;
}
//Performance Changes
var objHTTP;
/*function fnPostActionLog(jslogTime,dblogTime,serverlogTime,startTime, endTime, netlogTime,clientLog,dbLog,serverLog,actseqno,dbSesId,loginSeqNo,scrSeqNo,action) {
    objHTTP = createHTTPActiveXObject();
    if(mainWin.mBean_required == 'Y'){
        var strActionLogData = createActionLogRequestXml(clientLog,dbLog,serverLog);
        var paramString = "&JSTIME=" + jslogTime;
            paramString += "&DBTIME=" + dblogTime;
            paramString += "&SERVTIME=" + serverlogTime;
            paramString += "&STARTTIME=" + startTime;
            paramString += "&ENDTIME=" + endTime;
            paramString += "&NETTIME=" + netlogTime;
            paramString += "&ACTSEQNO=" +actseqno;
            paramString += "&DBSESID=" +dbSesId;
            paramString += "&LOGINSEQNO=" +loginSeqNo;
            paramString += "&SCRSEQNO=" +scrSeqNo;
            paramString += "&ACTION=" +action;
            paramString += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg;
            
           var url = "FCSmsLogServlet?actionType=UPDATEACTIONLOG" + paramString;
        objHTTP.open("POST", url, true);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.onreadystatechange  = fnSetResponse;
        objHTTP.send(strActionLogData);
    }   
}*/

//REDWOOD_CHANGES
function fnFireCustomDateEvent(obj) {
    if (typeof (gAction) != 'undefined') {
        if ((gAction != 'QUERY') && (arguments.length == 1)) {
            fireHTMLEvent(obj, "onchange");
        }
    }
}


function fnRefreshFieldValue(obj, eventHandlerStr) {
    if(obj.tagName && obj.tagName.toUpperCase()!='OJ-INPUT-DATE'){
		if(obj.rawValue){ //REDWOOD_36276232
        obj.value = obj.rawValue;
		}
    }
     if (eventHandlerStr) {
        fnFireCustomElementEvent(obj, eventHandlerStr);
    }
}



function fnFireCustomElementEvent(object, eventHandlerStr) {
    if (eventHandlerStr && event) {
        if (event.srcElement && event.srcElement.tagName && event.srcElement.tagName.toUpperCase() == 'OJ-RADIOSET') {
            if (event.detail.updatedFrom == 'internal') {
                var fnEval = new Function("object", eventHandlerStr);
                fnEval(object);
                return true;
            }
        }
    }
}

 //REDWOOD_CHANGES
function fnSetResponse() {
    if (objHTTP.readyState == 4) {
        if(objHTTP.status == 200) { 
        }else {            
        }
    }
}
function createActionLogRequestXml(clientLog,dbLog,serverLog)
{    
     var clogXML           = "<?xml version='1.0' encoding='UTF-8'?>";
     clogXML               =  clogXML+"<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FCUBS</SOURCE><UBSCOMP>FCUBS</UBSCOMP><MSGID/><USERID/><ENTITY/><BRANCH/>" +
                              "<DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><CLIENTLOG><![CDATA[";
     clogXML               =  clogXML+clientLog+"]]></CLIENTLOG><SERVERLOG><![CDATA["+serverLog+"]]></SERVERLOG><DBLOG><![CDATA["+dbLog+"]]></DBLOG>";     
     clogXML       = clogXML+"</FCUBS_HEADER><FCUBS_BODY><FLD><FN ISQUERY='0' PARENT='' RELATION='' TYPE=''/></FLD><REC TYPE=''/><FV></FV></FCUBS_BODY></FCUBS_REQ_ENV>";
     return clogXML;
}
/*function setActionTime(inTime,jsTime,dbtime,servertime,functionId, action,nettime) {//Performance Changes

    if (mainWin.mBean_required == "N")
        return;
    var t = getDateObject();
    time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
        mainWin.fnPopulateMbeanData(inTime,outTime,jsTime,dbtime,servertime,functionId, action,nettime);//Performance Changes
    }
    else {
        return t;
    }
}*/
function setActionTime(inTime, functionId, action) {
    if (mainWin.mBean_required == "N") return;
    var t = getDateObject();
    var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    if (inTime) {
        var outTime = time;
        mainWin.fnPopulateMbeanData(inTime, outTime, functionId, action);
    } else {
        return t;
    }
}
/*function fnpostAction(action,responseDOM){
    var tmpRespDOM = "";
    var l_TimeLogvalue = "";
    var seqno = "";
    var scrSeqNo = "";
    var loginSeqNo = "";
    
    if(typeof(responseDOM) == "undefined") {
        tmpRespDOM = fcjResponseDOM;
    }else {
        tmpRespDOM = responseDOM;
    }

    if (mainWin.mBean_required == "Y" && getXMLString(tmpRespDOM)!="" && inDate!="") {       
        inTime = (inDate.getHours() * (3600 * 1000)) + (inDate.getMinutes() * (60 * 1000)) + (inDate.getSeconds() * 1000) + inDate.getMilliseconds();
        if(selectSingleNode(tmpRespDOM, "FCJMSG/MSG/FCUBS_HEADER")) { // For dashboard or summary
            if(selectSingleNode(tmpRespDOM, "FCJMSG/MSG/FCUBS_HEADER/TIMELOG"))
                l_TimeLogvalue = getNodeText(selectSingleNode(tmpRespDOM, "FCJMSG/MSG/FCUBS_HEADER/TIMELOG"));       
            if(selectSingleNode(tmpRespDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST")) {
                var seqListValue = getNodeText(selectSingleNode(tmpRespDOM, "FCJMSG/MSG/FCUBS_HEADER/SEQLIST"));
                seqno=seqListValue.split("~")[2];
                scrSeqNo = seqListValue.split("~")[1];
                loginSeqNo= seqListValue.split("~")[0];
            }    
            
        }else {
            if(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"))
                l_TimeLogvalue = getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/TIMELOG"));       
            if(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST")) {
                var seqListValue = getNodeText(selectSingleNode(tmpRespDOM, "FCUBS_RES_ENV/FCUBS_HEADER/SEQLIST"));
                seqno=seqListValue.split("~")[2];
                scrSeqNo = seqListValue.split("~")[1];
                loginSeqNo= seqListValue.split("~")[0];
            }    
        }
       	
       try{
            var dbnetTime=l_TimeLogvalue.split("~")[3]-l_TimeLogvalue.split("~")[2];
            var serverTime=l_TimeLogvalue.split("~")[1]-l_TimeLogvalue.split("~")[0]-dbnetTime; 
            dbnetTime=parseFloat(dbnetTime);
            serverTime=parseFloat(serverTime);
            var dbTime=l_TimeLogvalue.split("~")[4]; 
            if(dbTime == ''){
              dbTime=0;
            }       
            dbTime=parseFloat(dbTime);
            var dbSesId=l_TimeLogvalue.split("~")[5];
            if(dbSesId == ''){
              dbSesId=0;
            }
            dbSesId=parseFloat(dbSesId);
            var t = getDateObject();
            var time = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds(); 
            var jstime=parseFloat(parseFloat(posttime)-parseFloat(inTime));
            jstime=jstime+parseFloat(parseFloat(time)-parseFloat(afterposttime));
            jstime=Math.round(jstime*100)/100;
            startTime = inDate.getFullYear()+'-'+ (inDate.getMonth()+1) +'-'+inDate.getDate()+" "+inDate.getHours()+':'+inDate.getMinutes()+':'+inDate.getSeconds();
            endTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+" "+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
            var totaltime=parseFloat(parseFloat(t.getTime())-parseFloat(inDate.getTime()));
            totaltime=Math.round(totaltime*100)/100;
            var nettime=totaltime-jstime-serverTime-dbTime;
            nettime=Math.round(nettime*100)/100;        
          
         var clientLog=mainWin.DebugStmt;
         setActionTime(inTime,functionId, action); //mbean changes
         //fnPostActionLog(jstime,dbTime,serverTime,nettime,clientLog,"","",seqno,dbSesId);Changes for Total time
        if((action=="EXECUTEQUERY" && typeof(ShowSummary)!= "undefined" && ShowSummary == "TRUE") || action == "AUTHQUERY" || action == "VIEWMNTLOG"){
            mainWin.fnPopulateLoad(jstime,dbTime,serverTime,totaltime,"",scrSeqNo,dbSesId,loginSeqNo,seqno);
         }else{
           // fnPostActionLog(jstime,dbTime,serverTime,startTime, endTime, totaltime,clientLog,"","",seqno,dbSesId,loginSeqNo,scrSeqNo,action);
           fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime);
                           
                //jsTime~dbTime~serverTime~startTime~endTime~total~web
                
         }
         }catch(e){}
         inTime="";
         inDate = "";
         posttime="";
         afterposttime="";
    }
}*/

/*
function fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime){
    var seqlist = loginSeqNo+"~"+scrSeqNo+"~"+seqno;//debugger;
    if(parent.timeLogsArray) { 
        parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    } else {
        timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }
}
*/

/*function fnPopulateTimes(loginSeqNo,scrSeqNo,seqno,jstime,dbTime,serverTime,startTime,endTime,totaltime){
    var seqlist = loginSeqNo+"~"+scrSeqNo+"~"+seqno; 
    if(typeof(seqNo)!='undefined' && seqNo) { 
        timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }else if(typeof(parent.seqNo)!='undefined' && parent.seqNo) { 
        parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }else if(typeof(parent.parent.seqNo)!='undefined' && parent.parent.seqNo) { 
        parent.parent.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    } else {
        mainWin.timeLogsArray[seqlist]  = jstime+"~"+dbTime+"~"+serverTime+"~"+startTime+"~"+endTime+"~"+totaltime+"~";
    }
}*/

//Performance Changes
function isFLDRequired(funcId) {
var fldReqFuncIds = "SMDUSRDF~STDCUBAL~SMDCHPWD~STDBRREF~SVDIMGVW~CSDEXTWS";//21067609  //21262247 //21505318 //9NT1606_14_1_RETRO_12_1_28117823 - added CSDEXTWS
    if(fldReqFuncIds.indexOf(funcId)!= -1)
        return true;
    else 
        return false;
}

function fnGetParentCustWin() {
    var parentWin = "";
    if (parentSeqNo && parentSeqNo != "") {
        for (var i = 0; i < mainWin.arrCustWindows.length; i++) {
            if (mainWin.arrCustWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrCustWindows[i].children[0].contentWindow;
                break;
            }
        }
    }
    return parentWin;
}
//FCUBS_12.1_CASA_Joint_Holder_Display Changes starts
function fncallJointHolderDetails(accNo,brn){    
    if (typeof(seqNo)=="undefined"){
        if (typeof(parent.seqNo)=="undefined"){
          parent.parent.parentWinParams = new Object();
          parent.parent.parentWinParams.accNo =  accNo;
          parent.parent.parentWinParams.brn = brn;
        }else { 
             parent.parentWinParams = new Object(); 
             parent.parentWinParams.accNo = accNo;    
             parent.parentWinParams.brn = brn;
        }
    } else {
        parentWinParams = new Object();
        parentWinParams.accNo = accNo;           
        parentWinParams.brn = brn;
    }
   mainWin.dispHref1("STDJHMNT",getSeqNo());
}
//FCUBS_12.1_CASA_Joint_Holder_Display Changes ends

function fnSetDelay(milliSec) {
    var startDate = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - startDate) > milliSec) {
            break;
        }
    }
}

//12_1_RETRO_12_2_23664574 - added below function to fetch auto lov results for an offline lov field
function getOfflineAutoLovResults(source, functionId, blockId, fldName, lovId, bindFlds, orderBy, lovType, recNum, containerId, redCriteria, isME,exactFetch, customLov) {//Exact Fetch changes
    inDate = setActionTime();
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var cnt = 0;
    var serverURL = "ExtLovFetchData?";
    var labelArrLength = "1";
    serverURL += "Source=" + source;
    serverURL += "&DEBUGWINDOW=" +mainWin.DebugWindowFlg; //logging changes
    serverURL += "&functionId=" + containerId;
    serverURL += "&blockId=" + blockId;
    serverURL += "&fldName=" + fldName;
    serverURL += "&lovId=" + lovId;
    redCriteria = replaceChar(redCriteria);/* security fixes for WF */
    /*SFR:17439180 : Fix for 17351640 starts*/
	//Fix for 18678458 -Index Basedsearch changes start
    var indexRequired = "";
    var minIndexLength = "";
    var filedIndexValue = "";
    var reductionValue = "";
    var countIndexField = 0;
    var firstIndexField = 0;
     //if((parent.offlineLovInfoFlds != "undefined") && (typeof(parent.offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    //(typeof(parent.offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (parent.offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    if((offlineLovInfoFlds != "undefined") && (typeof(offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId]) != "undefined") &&
    (typeof(offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2]) != "undefined") && (offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].indexOf("Y") != -1)){
    //var indexFieldList= parent.offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].split("~");
    var indexFieldList= offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][2].split("~");
    for(var i=0; i<1 ;i++){
      filedIndexValue=indexFieldList[i];
      var tmp_redCriteria = replaceAll(redCriteria,"_PCT_","");
      if(filedIndexValue.indexOf("!") != -1){
        indexRequired=filedIndexValue.split("!")[0];
        minIndexLength=filedIndexValue.split("!")[1];
         if("Y" == indexRequired && firstIndexField == 0){
           firstIndexField=i+1;
         }
        if("Y" == indexRequired && (tmp_redCriteria.length) < minIndexLength){
          countIndexField++;
        }else  if("Y" == indexRequired && (tmp_redCriteria.length) >= minIndexLength){
        countIndexField = 0;
        break;
        }
      }
    }
    if(countIndexField >0){
      parent.alert(parent.mainWin.getItemDesc("LBL_INDEX_ALERT_AUTOLOV"));    
      dispField.value ="";
      return false;
    }
    }
//Fix for 18678458 -Index Basedsearch changes end
    if (typeof(redCriteria) != "undefined" && redCriteria != null && redCriteria!="") {
      var tempRedCriteria = redCriteria;
      tempRedCriteria = replaceAllChar(tempRedCriteria, "/", "_SLH_");
      tempRedCriteria = replaceAllChar(tempRedCriteria, "#", "_HASH_");//fix for 17378652
      tempRedCriteria = replaceAllChar(tempRedCriteria,  "&", "_AMP_"); //fix for 18312338
      tempRedCriteria = replaceAllChar(tempRedCriteria,  ",", "_COMMA_");//Fix for 19274447
      serverURL += "&RedFldNames=" + tempRedCriteria;
      var fldNameIndex = 0;       // Reduction fld postion change   start
      var lovParentFldID  = blockId + "__" + fldName;
      var lovInfoArr =  offlineLovInfoFlds[lovParentFldID + "__" + lovId][0].split("~");
      for(var cnt = 0; cnt < lovInfoArr.length; cnt++){
      if(lovParentFldID == lovInfoArr[cnt]){
        fldNameIndex = cnt;
        break;
      }
    }
       serverURL += "&RedFldIndex=" + fldNameIndex; // Reduction fld postion change  end
    }
    else{
      serverURL += "&RedFldNames=" + redCriteria; 
    }
    /*SFR:17439180 : Fix for 17351640 Ends*/
    /* security fixes for WF */
     if (typeof(orderBy) != "undefined" && orderBy != null && orderBy!="") {
        if(orderBy.indexOf(">")!=-1){
            var re = new RegExp(">", "g");
            orderBy = orderBy.replace(re, "!");
        }
    }
    serverURL += "&orderBy=" + orderBy;
     //SFR:17439180 : Fixes for 17176008 starts
    if (typeof(bindFlds) != "undefined" && bindFlds != null && bindFlds!="") {
      var tempbindFlds = replaceAllChar(replaceTilde(bindFlds), "/", "_SLH_");
      tempbindFlds = replaceAllChar(tempbindFlds, "#", "_HASH_");//fix for 17378652
      tempbindFlds = replaceAllChar(tempbindFlds, ",", "_COMMA_");//Fix for 19274447
      serverURL += "&bndVar=" + replaceTilde(tempbindFlds);
    
    }
    else{
      serverURL += "&bndVar=" + replaceTilde(bindFlds); 
    }
     //SFR:17439180 : Fixes for 17176008 ends
    serverURL += "&fetchSize=25";
    serverURL += "&columnList=" + labelArrLength;
    serverURL += "&containerId=" + containerId;
    serverURL += "&fieldName=" + fldName;
    serverURL += "&screenType=" + mainWin.gActiveWindow.screenType;
    serverURL += "&TotalPages=";
    serverURL += "&CurPage=1";
    serverURL += "&lovType=" + lovType;
    serverURL += "&exactFetch=" + exactFetch;//Exact Fetch changes
    //serverURL += "&seqNo=" + getSeqNo();//Logging changes
    serverURL += "&isAutoLOV=Y";//Logging changes
    serverURL += "&customLov=" + customLov;//Logging changes
    if (typeof (g_txnBranch) == "undefined") {
        serverURL += "&txnBranch=" + mainWin.CurrentBranch;
    } else {
        serverURL += "&txnBranch=" + g_txnBranch;
    }
    var objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", encodeURI(serverURL), false);
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    //Performance Changes  
    var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    
    objHTTP.send(AUTOLovRequestDOM);
    //Performance Changes
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
    if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
    AUTOLovResponseDOM = objHTTP.responseXML;
    mainWin.inactiveTime = 0;
    var field_namesArr = returnFlds.split("~");
    var field_names_recNum = parseInt(recNum, 10);
    var fieldValuesArr = new Array();
    //var resAutoValue = getNodeText(AUTOLovResponseDOM.childNodes[0]).split("!");
    var resAutoValue = getNodeText(selectSingleNode(AUTOLovResponseDOM, "//EXTLOVDATA")).split("!");
   // appendDebug(AUTOLovResponseDOM); //Logging changes
    
    var resValue = resAutoValue[0].split("~");
    for (var i = 0; i < resValue.length - 1; i++) {
        var resValue = resAutoValue[0].split("~");
	
     for (var j = 0; j < resValue.length - 1; j++) {
        // changes for Desc field with & //
		/*Fix for 18018596 Starts*/
		if(resValue[j].indexOf("_EXCL_") != -1){//12.0.3 citi_dev fix start
          resValue[j] =  replaceAll(resValue[j], "_EXCL_", "!"); //	12.0.3 citi_dev fix for ME LOV issue
        }//12.0.3 citi_dev fix end
		/*Fix for 18018596 Ends*/
		fieldValuesArr[j] = resValue[j];
        //fix for bug 17908885 starts // 
        if (resValue[j].indexOf("&amp;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j], "&amp;", "&");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&apos;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j],"&apos;", "'");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&lt;") != -1) {
            fieldValuesArr[j] = replaceAll(resValue[j], "&lt;", "<");//	12.0.3 citi_dev fix for ME LOV issue
        }
        if (resValue[j].indexOf("&gt;") != -1) {
            fieldValuesArr[j] = replace(resValue[j],"&gt;", ">");//	12.0.3 citi_dev fix for ME LOV issue
        }
        //fix for bug 17908885 ends // 
     }
    }
    if (resAutoValue == "" || resAutoValue.length > 2) {
        var cnt = 0;
        for (var i in offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId]) {
            cnt++;
        }
        //if ( (typeof (offlineLovInfoFlds) != "undefined" && typeof (offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][3]) == "undefined") || (typeof (offlineLovInfoFlds) != "undefined" && typeof (offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][3]) != "undefined" && offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][3] == "Y")) {
        if ( (typeof (offlineLovInfoFlds) != "undefined") || (typeof (offlineLovInfoFlds) != "undefined" && offlineLovInfoFlds[blockId + "__" + fldName + "__" + lovId][3] == "Y")) {
            for (var i = 0; i < field_namesArr.length - 1; i++) {
                var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
                if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
                if (isME == 'true') {
                    var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                    for (var j = 0; j < lovBlkObj.length - 1; j++) {
                        var lovFldObj = "";
                        if (lovBlkObj[j].children.length > 0) {
                            if (!lovBlkObj[j].children[1]) {
                                if (!lovBlkObj[j].children[0].children[1]) {
                                    lovFldObj = lovBlkObj[j].children[0];
                                } else {
                                    lovFldObj = lovBlkObj[j].children[0].children[1];
                                }
								if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                            } else {
                                lovFldObj = lovBlkObj[j].children[1];
                            }
							//Fix for 20073044 starts
						    if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
							    lovFldObj = lovBlkObj[j].children[0].children[1];
						    }
						    //Fix for 20073044 ends
                        }
                        if (lovFldObj.name == fldName) {
                            lovFldObj.value = "";
                            //Fix for Added for 16906908 
                            var fieldHtml = getOuterHTML(lovFldObj);
                              if ((fieldHtml.indexOf("displayAmount") != -1)  || ((fieldHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldHtml.indexOf("displayDate") != -1) )){
                                 getNextSibling(getNextSibling(lovFldObj)).value = "";
                              }
							fireHTMLEvent(lovFldObj, "onpropertychange"); //19224295
                        }
                    }
                } else {
                    if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
//REDWOOD_CHANGES
                     if( document.getElementById(field_namesArr[i]).tagName.toUpperCase()=='OJ-INPUT-NUMBER'){
                        document.getElementById(field_namesArr[i]).value = null;
                     }else{		 
//REDWOOD_CHANGES
                        document.getElementById(field_namesArr[i]).value = "";
                     }	 //REDWOOD_CHANGES
                        
                       //Fix for Added for 16906908
						 var fieldHtml = getOuterHTML(document.getElementById(field_namesArr[i]));
                        if ((fieldHtml.indexOf("displayAmount") != -1)  || ((fieldHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldHtml.indexOf("displayDate") != -1) ))
                        {
                          getNextSibling(getNextSibling(document.getElementById(field_namesArr[i]))).value = "";
                        }
						fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                    
                    } else if (fldName != "" && document.getElementsByName(fldName)) {
                        if (document.getElementsByName(fldName).length > 0) {
                            document.getElementsByName(fldName)[field_names_recNum].value = "";
                            //Fix for Added for 16906908
                            var fieldNameHtml = getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]);
                            if ((fieldNameHtml.indexOf("displayAmount") != -1)  || ((fieldNameHtml.indexOf("displayFormattedNumber") != -1) ) ||((fieldNameHtml.indexOf("displayDate") != -1) ))
                        {
                           getNextSibling(getNextSibling(document.getElementsByName(fldName)[field_names_recNum])).value = "";
                        }
						fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                        }
                    }
                }
            }
        }
        if (resAutoValue == "") autoRedCriteria = "";
       // fnpostAction('EXTLOVDATA',AUTOLovResponseDOM);
        return true;
    } else {
        for (var i = 0; i < field_namesArr.length - 1; i++) {
            var fldName = field_namesArr[i].substring(field_namesArr[i].lastIndexOf("__") + 2);
            if (field_namesArr[i].indexOf("__") == -1) fldName = field_namesArr[i];
            if (isME == 'true') {
                var lovBlkObj = lovBlockObj.tBodies[0].rows[recordNum].cells;
                for (var j = 0; j < lovBlkObj.length - 1; j++) {
                    var lovFldObj = "";
                    if (lovBlkObj[j].children.length > 0) {
                        if (!lovBlkObj[j].children[1]) {
                            if (!lovBlkObj[j].children[0].children[1]) {
                                lovFldObj = lovBlkObj[j].children[0];
                            } else {
                                lovFldObj = lovBlkObj[j].children[0].children[1];
                            }
							if (typeof (lovFldObj) == "undefined" || lovFldObj.type == undefined) lovFldObj = lovBlkObj[j].children[0]; //Fix for 20073044
                        } else {
                            lovFldObj = lovBlkObj[j].children[1];
                        }
						//Fix for 20073044 starts
						if (lovFldObj.tagName.toUpperCase()  =='LABEL') {
							lovFldObj = lovBlkObj[j].children[0].children[1];
						}
						//Fix for 20073044 ends
                    }
                    if (lovFldObj.name == fldName) {
                        lovFldObj.value = fieldValuesArr[i];
                         fireHTMLEvent(lovFldObj, "onpropertychange");//19224295
                        if (lovFldObj.type.toUpperCase() == 'CHECKBOX') {
                            if (typeof (lovFldObj.getAttribute("ON")) != "undefined") {
                                if (lovFldObj.getAttribute("ON") == fieldValuesArr[i]) {
                                    lovFldObj.checked = true;
                                } else {
                                    lovFldObj.checked = false;
                                }
                            } else {
                                if (fieldValuesArr[i] == 'Y') {
                                    lovFldObj.checked = true;
                                } else {
                                    lovFldObj.checked = false;
                                }
                            }
                        } else if (lovFldObj.type.toUpperCase() == 'RADIO') {
                            setRadioFieldDataLOV(lovFldObj, fieldValuesArr[i]); //Fix for 19394010
                        }
                    }
                }
            } else {
                if (field_namesArr[i] != "" && document.getElementById(field_namesArr[i])) {
                    if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'CHECKBOX') {
                        if (typeof (document.getElementById(field_namesArr[i]).getAttribute("ON")) != "undefined") {
                            if (document.getElementById(field_namesArr[i]).getAttribute("ON") == fieldValuesArr[i]) {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        } else {
                            if (fieldValuesArr[i] == 'Y') {
                                document.getElementById(field_namesArr[i]).checked = true;
                            } else {
                                document.getElementById(field_namesArr[i]).checked = false;
                            }
                        }
                    } else if (document.getElementById(field_namesArr[i]).type.toUpperCase() == 'RADIO') {
                        setRadioFieldDataLOV(document.getElementById(field_namesArr[i]), fieldValuesArr[i]); //Fix for 19394010
                    } else {
                        var reg = new RegExp('<br/>', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
						//17624254 Starts
                        var reg1 = new RegExp('&amp;', "g");
                        fieldValuesArr[i] = fieldValuesArr[i].replace(reg1, "&");
                        //17624254 Ends
                        document.getElementById(field_namesArr[i]).value = fieldValuesArr[i];
                        fireHTMLEvent(document.getElementById(field_namesArr[i]), "onpropertychange"); //19224295
                        //if (getOuterHTML(document.getElementById(field_namesArr[i])).indexOf("displayAmount") != -1) getNextSibling(document.getElementById(field_namesArr[i])).value = fieldValuesArr[i]; //19224295
                    }
                } else if (fldName != "" && document.getElementsByName(fldName)) {
                    if (document.getElementsByName(fldName).length > 0) {
                        if (document.getElementsByName(field_namesArr[i])[field_names_recNum].type.toUpperCase() == 'CHECKBOX') {
                            if (typeof (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON")) != "undefined") {
                                if (document.getElementsByName(field_namesArr[i])[field_names_recNum].getAttribute("ON") == fieldValuesArr[i] || fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                } else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            } else {
                                if (fieldValuesArr[i] == 'Y') {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = true;
                                } else {
                                    document.getElementsByName(field_namesArr[i])[field_names_recNum].checked = false;
                                }
                            }
                        } else {
                            var reg = new RegExp('<br/>', "g");
                            fieldValuesArr[i] = fieldValuesArr[i].replace(reg, "\n");
							//17624254 Starts
                            var reg1 = new RegExp('&amp;', "g");
                            fieldValuesArr[i] = fieldValuesArr[i].replace(reg1, "&");
                            //17624254 Ends
                            document.getElementsByName(fldName)[field_names_recNum].value = fieldValuesArr[i];
                            /*if (getOuterHTML(document.getElementsByName(fldName)[field_names_recNum]).indexOf("displayAmount") != -1) getNextSibling(document.getElementsByName(fldName)[field_names_recNum]).value = fieldValuesArr[i]; */
                            fireHTMLEvent(document.getElementsByName(fldName)[field_names_recNum], "onpropertychange"); //19224295
                        }
                    }
                }
            }
            if (fieldValuesArr[i] == "") cnt++;
        }
        if (cnt == field_namesArr.length - 1) return;
    }
    //  fnpostAction('EXTLOVDATA',AUTOLovResponseDOM);
}

// 12_1_RETRO_12_2_23664574 ends
//REDWOOD_CHANGES
//var amountConverter = convertAmount(ccyCode);
//blkFieldNameamtconverter = new ojconverter_number.IntlNumberConverter(getAmountFormat(refferedfld));
//


function getCurrencyValue(dataBoundElem, idCCY, isFromLaunch,amtConverter) {
// $(dataBoundElem).bind("requiredChanged disabledChanged readonlyChanged currencyChanged currencysymbolChanged displaymodeChanged", getFormattedAmount(dataBoundElem, idCCY, isFromLaunch) );

    if(isFromLaunch){
        return;
    }
    if (isformat == true && isfromscreen == true)
        return;
   // var idDispAmt = dataBoundElem.name ;
  //  var inpElem;
    //debugger;
    var tableObj = "";
	var ccyChk = false;//REDWOOD_35840645
//    if (dataBoundElem.parentNode.tagName.toUpperCase() == "NOBR" || dataBoundElem.parentNode.tagName.toUpperCase() == "DIV")
//        inpElem = getInpElem(dataBoundElem.parentNode.parentNode.parentNode, idDispAmt);
//    else 
//        inpElem = getInpElem(dataBoundElem.parentNode.parentNode, idDispAmt);
//        
    //var amt = dataBoundElem.value;
    /*Fix for 18174232 Starts*/
    var singleView = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = true;
    }
    /*Fix for 18174232 Ends*/
    
    if (dataBoundElem.parentNode !=undefined){ //redwood_35278374
        if (dataBoundElem.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElem.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
  }//redwood_35278374
   } //Fix for 21457134
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    }
    else {
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/
            
            if ((isMEBlock=='true' && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = curDataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
           if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ //REDWOOD_35340100 //REDWOOD_35386345 
              ccy = mainWin.Lcy;
               }

            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
            //redwood_35278374 Starts
             if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ //REDWOOD_cHANGES //REDWOOD_35386345
              ccy = mainWin.Lcy;
               }
               //redwood_35278374 Ends        
            }
			ccyChk = true;//REDWOOD_35840645
        }
        else {
            //Block is not part of the idCCY
			if (dataBoundElem.id!=null) { //REDWOOD_35410761 
            blockName = dataBoundElem.id.substring(0, dataBoundElem.id.lastIndexOf("__"));

            var isMEBlock = false;
//            for (var i = 0;i < multipleEntryIDs.length;++i) {
//                if (multipleEntryIDs[i] == blockName) {
//                    isMEBlock = true;
//                    break;
//                }
//            }
             isMEBlock = isMultipleEntry(blockName);/*12.0.4 UI performance changes*/

            if ((isMEBlock =='true'&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                /*Fix for 18174232 */
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
//                if (typeof (screenType) != "undefined" && screenType == 'D') {
//                    tableObj = getTableObjForBlock("Innertable_" + functionId);
//                }
//                else {
//                    tableObj = getTableObjForBlock(blockName);
//                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) { //21457134
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                    }
                }
                /* Fix for 16960456*/
                if (ccy == "") {
       if (document.getElementsByName(idCCY).length > 0 && document.getElementsByName(idCCY)[0].value!="undefined"
					&& document.getElementsByName(idCCY)[0].value!=null) {
                        /* commented for 17073111
					  var rowNo = -1;
                        var rowIndex = getRowIndex(event);
                        if (rowIndex == 0 || rowIndex == -1) rowNo = 0;
                        else rowNo = rowIndex - 1;
                        if (document.getElementsByName(idCCY)[rowNo]) ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else */
                        ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElem.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;//Fix for 21591405
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
			ccyChk = true;//REDWOOD_35840645
        }
	}
    } //REDWOOD_35410761 
//
//    if (ccy == "")
//        ccy = mainWin.Lcy;
     //REDWOOD_35340100 Moved up
    if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }
	if ((ccy == "" ||  ccy==null) && dataBoundElem.value!=null  && dataBoundElem.value != "" && gAction!="AUTH" && ccyChk == "true") { //REDWOOD_35386345 //REDWOOD_35840645 ADDED ccyChk field
        //dataBoundElem.value="";
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        
//        focusField = curInpElem;
//        alertAction = "UNMASK";
//        curInpElem.value = "";
//        getPreviousSibling(getPreviousSibling(curInpElem)).value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }
    //REDWOOD_35340100 MOVED above.
  /*  if (document.getElementsByName(idCCY).length > 0 && ccy == "") {
        ccy = mainWin.Lcy;
    }*/
    isformat = false;
    isfromscreen = false;
    var patternFormat = "###,##0.##################";
    if (mainWin.gNumberFormatMask && mainWin.gNumberFormatMask == "L") {
        patternFormat = "#,##,##0.#################";
    }
//    numberOptions = {
//        style: "currency", currency : ccy,  currencyDisplay: "code", separators :  {
//            decimal : gDecimalSymbol, group : gDigitGroupingSymbol
//        },
//        pattern : patternFormat 
//    };
    
//    numberOptions = {
//                  style: "currency",
//                  currency: ccy,
//                  currencyDisplay: "code"
//              };
  // amtConverter =  new ojconverter_number.IntlNumberConverter( numberOptions);
// amtConverter.format = function (value) {
//                if (!value) {
//                    value = 0;
//                }
//                const mb3Amount = new MB3Amount(value, true, ccy);
//                return mb3Amount.getDisplayAmount() ;
//            } 
        return ccy;
//   setTimeout(function(){ 
////   amtConverter._resolvedOptions={
////        style: "currency", currency : ccy,  currencyDisplay: "code", separators :  {
////            decimal : gDecimalSymbol, group : gDigitGroupingSymbol
////        }};
//        
//       
//    
//    dataBoundElem.refresh()},0);
    //amtConverter._options=numberOptions;
    

    
}


//REDWOOD_35057391 START
function checkCurrencyValue(dataBoundElem, idCCY, e) {
	
	var dataBoundElemObj = document.getElementById(dataBoundElem);
	
	var vblockName = dataBoundElem.substring(0, dataBoundElem.lastIndexOf("__"));
	isMEDB = isMultipleEntry(vblockName);
	if(isMEDB){
		var currw=getRowIndex(e)-1;
		dataBoundElemObj = document.getElementById(dataBoundElem+'RC'+currw);
	}
	
    if (isformat == true && isfromscreen == true)
        return;

    var tableObj = "";

    var singleView = false;
    if (location.pathname.indexOf("ExtLaunchSingleViewScreen.jsp") !=  - 1) {
        singleView = true;
    }
   
    
    if (dataBoundElemObj.parentNode !=undefined){
        if (dataBoundElemObj.parentNode.tagName.toUpperCase() == "DIV" && dataBoundElemObj.parentNode.parentNode.getAttribute("VIEW") == "SE") {
       singleView = true;
  }
   } 
    var ccy = "";
    if (idCCY == "") {
        ccy = mainWin.Lcy;
    }
    else {
        var blockName = "";
        var ccyFieldName = idCCY;
        if (idCCY.indexOf("__") > 0) {
            //Block Name is part of idCCY
            blockName = idCCY.substring(0, idCCY.lastIndexOf("__"));
            ccyFieldName = idCCY.substring(idCCY.lastIndexOf("__") + 2);
            var isMEBlock = isMultipleEntry(blockName);
            
            if ((isMEBlock=='true' && !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
                
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElemObj.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex - 2;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }

                ccy = document.getElementsByName(ccyFieldName)[rowNo].value;
           if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }

            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Block is a Single Entry
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
           
             if (ccy =="" && (gAction=="NEW" ||gAction=="COPY" ||gAction=="AUTH")){ 
              ccy = mainWin.Lcy;
               }
                   
            }
        }
        else {
            //Block is not part of the idCCY
			if (dataBoundElemObj.id!=null) { 
            blockName = dataBoundElemObj.id.substring(0, dataBoundElemObj.id.lastIndexOf("__"));

            var isMEBlock = false;

             isMEBlock = isMultipleEntry(blockName);

            if ((isMEBlock =='true'&& !singleView) || (typeof (screenType) != "undefined" && screenType == 'D' && functionId.substring(2, 3) != "D")) {
               
                //Block is a multiple entry
                var rowNo =  - 1;
                if (document.getElementsByName(idCCY).length > 1) {
                    var objTR = dataBoundElemObj.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
                    }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) {
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idCCY) {
                                ccy = inputElements[j].value;
                                break;
                            }
                        }
                    }
                }
               
                if (ccy == "") {
                    if (document.getElementsByName(idCCY).length > 0) {
                       
                        ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
            else {
                if (document.getElementById(blockName + "__" + ccyFieldName)) {
                    //Single Entry Case
                    ccy = document.getElementById(blockName + "__" + ccyFieldName).value;
                }
                else {
                    if (document.getElementsByName(idCCY).length > 0) {
                        var rowNo =  - 1;
                        if (document.getElementsByName(idCCY).length > 1) {
                            var objTR = dataBoundElemObj.parentNode;
                            while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                                objTR = objTR.parentNode;
                            }
                            if (typeof (screenType) != "undefined" && screenType == "D") {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex;
                                else 
                                    rowNo = 0;
                            }
                            else {
                                if (typeof (objTR.tagName) != "undefined")
                                    rowNo = objTR.rowIndex - 2;
                                else 
                                    rowNo = 0;
                            }
                        }
                        else {
                            rowNo = 0;
                        }

                        if (document.getElementsByName(idCCY)[rowNo])
                            ccy = document.getElementsByName(idCCY)[rowNo].value;
                        else 
                            ccy = document.getElementsByName(idCCY)[0].value;
                    }
                    else 
                        ccy = mainWin.Lcy;
                }
            }
        }
	}
    } 

	if ((ccy == "" ||  ccy==null) && dataBoundElemObj.value!=null  && dataBoundElemObj.value != "" && gAction!="AUTH") {
        showAlerts(fnBuildAlertXML('ST-COM035', 'I'), 'I');
        focusReqd = false;
        dataBoundElemObj.value = "";
        gIsValid = false;
        isfromscreen = false;
        return;
    }

}
//REDWOOD_35057391 END

                    
function getDefaultAmountConverter(dataBoundElem, idCCY, isFromLaunch,isME){
  return {
        format :function (value) {
                if (value==undefined || value==null || value=="" ){ //||value=="0.00") { //REDWOOD_35040420  //redwood_35148585 removed 0.00
                  //  value = 0;
                    return "";
                }
                var dataBoundElemObj = document.getElementById(dataBoundElem);
                var FormatValue;
                if(isME){
                if(event){
                    dataBoundElemObj = event.target;
			if(dataBoundElemObj.tagName!=null && dataBoundElemObj.tagName!=undefined){ //REDWOOD_35410761 
                      while (dataBoundElemObj.tagName && !dataBoundElemObj.tagName.toUpperCase().startsWith('OJ-') ){
                            dataBoundElemObj = dataBoundElemObj.parentNode;
                     }
					 //Redwood_changes_lot1
					var boundobjName=dataBoundElem.substr(dataBoundElem.indexOf('__')+2,dataBoundElem.length-dataBoundElem.indexOf('__')+2);
					var curnum;
					try{
					curnum=getRowIndex(event)-1;}
					catch(e){
						curnum=0;
					}
					if(dataBoundElemObj.name!=boundobjName)
					{dataBoundElemObj = document.getElementById(dataBoundElem+"RC"+curnum);}
					//Redwood_changes_lot1		
                               }	//REDWOOD_35410761 	
				}
				//REDWOOD_35390011 Commented Starts	//REDWOOD_35238456 Starts
			/*	dataBoundElemObj1 = dataBoundElemObj;
				if(dataBoundElemObj1 && dataBoundElemObj1 != window) {

					dataBoundElemObj1.addEventListener("blur", function(event) {
						var formattedValue = dataBoundElemObj1.converter.format(dataBoundElemObj1.value);
						dataBoundElemObj1.value = formattedValue;
					});
				} */ //REDWOOD_35390011 Comment Ends
                //REDWOOD_35238456 Ends
            }
            //REDWOOD_35238456 Starts
            //REDWOOD_35390011 Commented Starts
		/*	else
			{
				dataBoundElemObj1 = event.target;
				if(dataBoundElemObj1 && dataBoundElemObj1 != window) {

					dataBoundElemObj1.addEventListener("blur", function(event) {
						var formattedValue = dataBoundElemObj.converter.format(dataBoundElemObj.value);
						dataBoundElemObj.value = formattedValue; //REDWOOD_35363187 
					});
				}
			}*/  //REDWOOD_35390011 Comment Ends
            //REDWOOD_35238456 Ends
			//if(dataBoundElemObj) {
            if(dataBoundElemObj && dataBoundElemObj.tagName && dataBoundElemObj.tagName!=undefined) { //REDWOOD_36419564
                var ccy = getCurrencyValue(dataBoundElemObj, idCCY, false,isME);
                if(typeof(ccy)=='undefined' || ccy==null){
                    return "";
                }
                 var re = new RegExp(gDigitGroupingSymbol, "g");
				 if (re =="/./g"){ //REDWOOD_36396834 
	             re ="/\./g";
                 }
                value = value.replace(re, "");
                //dataBoundElemObj.value = value; //REDWOOD_36537281 
				FormatValue = value; //REDWOOD_36537281 
                const mb3Amount = new MB3Amount(value, true, ccy);
                if(!mb3Amount.valid){
                    dataBoundElemObj.value = "";
                    return "";
                }
                //REDWOOD_35457875  Starts
             else
				        {
                if(gAction=="EXECUTEQUERY" || gAction==""){
				         //dataBoundElemObj.value = mb3Amount.getInputAmount(); //REDWOOD_36537281 
						 FormatValue = mb3Amount.getInputAmount(); //REDWOOD_36537281 
                }
            //REDWOOD_36180842 Starts
               if (value.charAt(value.length-1).match(/[a-zA-Z]/)){
              // dataBoundElemObj.value = mb3Amount.getInputAmount(); //REDWOOD_36537281 
			   FormatValue = mb3Amount.getInputAmount(); //REDWOOD_36537281 
               }
            //REDWOOD_36180842 Ends
		         }
            //REDWOOD_35457875  Ends
                 if(dataBoundElemObj.getAttribute!= undefined){ //redwood_35278374
                 if(!fnValidateRange(dataBoundElemObj,mb3Amount.getDisplayAmount())){
                    dataBoundElemObj.value = "";
                    return "";
                }//redwood_35278374
              }
			  if(FormatValue!= dataBoundElemObj.value){ //REDWOOD_36537281 
				  dataBoundElemObj.value =FormatValue; //REDWOOD_36537281 
			  }
                return mb3Amount.getDisplayAmount() ;
            }else{
                return value;
            }
            
        }
    }
}

function getNumberFieldInME(numField){
    var fieldDetails = numField.split("__");
    var blockName=fieldDetails[0];
    var idNumberFld = fieldDetails[1];
       var rowNo =  - 1;
                if (document.getElementsByName(idNumberFld).length > 1) {
                    var objTR = dataBoundElem.parentNode;
                    while (typeof (objTR.tagName) != "undefined" && objTR.tagName.toUpperCase() != "TR") {
                        objTR = objTR.parentNode;
            }
                    if (typeof (screenType) != "undefined" && screenType == "D") {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;//Fix for 21591405
                        else 
                            rowNo = 0;
                    }
                    else {
                        if (typeof (objTR.tagName) != "undefined")
                            rowNo = objTR.rowIndex-1;
                        else 
                            rowNo = 0;
                    }
                }
                else {
                    rowNo = 0;
                }
//                if (typeof (screenType) != "undefined" && screenType == 'D') {
//                    tableObj = getTableObjForBlock("Innertable_" + functionId);
//                }
//                else {
//                    tableObj = getTableObjForBlock(blockName);
//                }
                tableObj = getTableObjForBlock(blockName);
                if (tableObj && tableObj.tBodies[0].rows.length > 0) { //21457134
                    for (var i = 0;i < tableObj.tBodies[0].rows[rowNo].cells.length;++i) {
                        var inputElements = tableObj.tBodies[0].rows[rowNo].cells[i].getElementsByTagName("INPUT");
                        for (var j = 0;j < inputElements.length;++j) {
                            if (inputElements[j].name == idNumberFld) {
                                return inputElements[j];
                               
                            }
                        }
                    }
        }
             
}



                    
function getDefaultNumberConverter(dataBoundElem, isME, obj) {
    return {
        format : function (value) {
            if (value==undefined || value==null ) {
                //  value = 0;
                
                return "";
            }
            var dataBoundElemObj = document.getElementById(dataBoundElem);
            try {
                if (isME) {
                    if (event) {
                        dataBoundElemObj = event.target;
						if(dataBoundElemObj.tagName!=null){ //REDWOOD_35410761 
                        while (dataBoundElemObj.tagName && !dataBoundElemObj.tagName.toUpperCase().startsWith('OJ-')) {
                            dataBoundElemObj = dataBoundElemObj.parentNode;
                        }
					//Redwood_changes_lot1
					var boundobjName=dataBoundElem.substr(dataBoundElem.indexOf('__')+2,dataBoundElem.length-dataBoundElem.indexOf('__')+2);
					var curnum=getRowIndex(event)-1;
					if(dataBoundElemObj.name!=boundobjName)
					{dataBoundElemObj = document.getElementById(dataBoundElem+"RC"+curnum);}	   
					//Redwood_changes_lot1
                    } //REDWOOD_35410761 
                    }
                    
                    else {
                        dataBoundElemObj = getNumberFieldInME(dataBoundElem);
                    }
                }
                var re = new RegExp(gDigitGroupingSymbol, "g");
				if (re =="/./g"){ //REDWOOD_36396834 
	            re ="/\./g";
                }
                value = value.replace(re, "");
                dataBoundElemObj.value = value;
                var formattedVal = value;

                formattedVal = displayFormattedNumber(dataBoundElemObj, value);

                if (typeof (formattedVal) == 'undefined' || formattedVal == null) {
                    return "";
                }
            }
            catch (e) {
                formattedVal = value;
            }

            return formattedVal;
        }
    }
}


function displayFormattedNumber(hdnNumField,value) {
    isFromDisplay = false;
    var returnVal = value;
    if (!returnVal) {
        //getNextSibling(getNextSibling(hdnNumField)).value =  null;  // ""; OJET Migration //ojet-number field will not accept string value so changing the default value to null
        return ;
    }
    var arrNumComponents = value.match(/\./g);
    if (arrNumComponents != null && (arrNumComponents.length > 1)) {
        displayMsg("ST-COM041");
        returnVal = "";
        //getNextSibling(getNextSibling(hdnNumField)).value = "";
        return ;
    }
    //FCUBS_12.0.1_RETRO_14749705 starts
    if (returnVal.indexOf('E') !=  - 1) {
        returnVal =returnVal * 1 + "";
    }
    //FCUBS_12.0.1_RETRO_14749705 ends
    if (!checkNumberValidation(returnVal) || returnVal.indexOf(" ") !=  - 1) {
        alert(mainWin.getItemDesc("LBL_VALUE_INCORRECT"));
        returnVal = "";
        //getNextSibling(getNextSibling(hdnNumField)).value = null ;//""; OJET Migration
        //getNextSibling(getNextSibling(hdnNumField)).focus();
        return ;
    }

     
    if (returnVal != "") {
        returnVal = returnVal.replace(".", gDecimalSymbol);
        //hdnNumField.value = returnVal; 
    }
    fnValidateNumberRange(hdnNumField);
    if (hdnNumField.getAttribute("FORMAT_REQD") && hdnNumField.getAttribute("FORMAT_REQD") == "Y") {
        //Changes for formatting number
      return formatNumber(hdnNumField, returnVal, isFromDisplay);
    }
    return returnVal;
}

function formatNumber(dispNumField,returnVal) {
    var numfieldVal = returnVal;
    var arrTemp = numfieldVal.split(gDecimalSymbol);
    var numBeforeDecimal = arrTemp[0];
    var replacepattern = "\\" + gDigitGroupingSymbol;
    var pattern = new RegExp(replacepattern, 'g');
    //var pattern=new RegExp(gDigitGroupingSymbol,'g');
    numBeforeDecimal = numBeforeDecimal.replace(pattern, "");
    var numAfterDecimal = arrTemp[1];
    var isNegative = false;
    if (numBeforeDecimal.indexOf("-") >  - 1) {
        isNegative = true;
        numBeforeDecimal = numBeforeDecimal.replace("-", "");
    }

    if (numAfterDecimal == undefined)
        numAfterDecimal = "";
    var maxNumDigitsAfterDecimal = dispNumField.getAttribute("MAX_DECIMALS");
    maxNumDigitsAfterDecimal = parseInt(maxNumDigitsAfterDecimal);
    if (isNaN(parseInt(maxNumDigitsAfterDecimal)))
        maxNumDigitsAfterDecimal = 0;
    var retVal = "";
    var digitPos = 0;
    for (var loopIndex = numBeforeDecimal.length - 1;loopIndex >= 0;loopIndex--) {
        switch (mainWin.gNumberFormatMask) {
            case "L":
                if ((digitPos > 1) && ((digitPos % 2) == 1)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
                break;
            default :
                if ((digitPos > 1) && ((digitPos % 3) == 0)) {
                    retVal = gDigitGroupingSymbol + retVal;
                }
                retVal = numBeforeDecimal.substr(loopIndex, 1) + retVal;
        }
        digitPos++;
    }
    if (numAfterDecimal != "" || maxNumDigitsAfterDecimal != 0) {
        retVal += gDecimalSymbol;
    }
    if (maxNumDigitsAfterDecimal > numAfterDecimal.length) {
        numAfterDecimal += "000000000000000000000000000000000000";
        retVal += numAfterDecimal.substr(0, maxNumDigitsAfterDecimal);
    }
    else {
        retVal += numAfterDecimal;
    }
	//Fix for 24659882
	if(numBeforeDecimal == "")
		 retVal = "0" + retVal;
    if (isNegative)
        retVal = "-" + retVal;	
    return retVal;

}
    
//                
//function getAmountFormat(ccyCodeFld,isME,amtBlkName,event) {
//    if (ccyCodeFld == "") {
//        var ccyCode = mainWin.lcy;
//    }
//    else {
//    if(document.getElementById(ccyCodeFld)){
//        var ccyCode = document.getElementById(ccyCodeFld).value;
//    }else{
//        if(isME){
//            
//        }
//    }
//        
//    }
//    var patternFormat = "###,##0.##################";
//    if (mainWin.gNumberFormatMask && mainWin.gNumberFormatMask == "L") {
//        patternFormat = "#,##,##0.#################";
//    }
//    return numberOptions = {
//        style : 'currency', currency : ccyCode, type : 'number', separators :  {
//            decimal : gDecimalSymbol, group : gDigitGroupingSymbol
//        },
//        pattern : patternFormat
//    };
//}
// function convertAmount (ccyCode) { debugger;
//            if(typeof(ccyCode) == "undefined") {
//                ccyCode = mainWin.lcy;
//            }
//            var patternFormat = "###,##0.##################";
//            if (mainWin.gNumberFormatMask && mainWin.gNumberFormatMask == "L") {
//                patternFormat = "#,##,##0.#################";
//            }
//            var numberOptions = {style: 'currency', currency: ccyCode, type: 'number', separators: {decimal: gDecimalSymbol,  group: gDigitGroupingSymbol}, pattern:patternFormat};
//            return  new ojconverter_number.IntlNumberConverter(numberOptions);
//            
//           // var numberConverterFactory = ojs.Validation.converterFactory("number");
//           // return numberConverterFactory.createConverter(numberOptions);
//        };

function fnReuireParentChild(mainJs, childRequireJs){
	return 'require(['+mainJs +'],function(){'+childRequireJs+'},function(err){'+childRequireJs+'});'
}

function fndefineJs(defineJs){
	return 'require(['+defineJs+'],function(){});';
}

function genFunction(arr){
	if(arr && arr.length==1){
		return fndefineJs(arr);
	}else if(arr && arr.length>1){
		var fvar=arr.splice(0,1);
		var childVar=genFunction(arr);
		return fnReuireParentChild(fvar,childVar);
	}
}	 
//REDWOOD_CHANGES


/***AU Bank Login Encryption Ends **/
var keyStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";

function encrypt(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

function decrypt(input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = utf8_decode(output);
    return output;

}

function utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

function utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

function AESEncrypt(plaintext, iteration) {
    var encrypted = plaintext;
    var count = iteration || 5;
    for (var i = 0; i < count; i++) {
        encrypted = encrypt(encrypted);
    }
    return encrypted;
}

function AESDecrypt(EncryptText, iteration) {
    var decrypted = EncryptText;
    var count = iteration || 5;
    for (var i = 0; i < count; i++) {
        decrypted = decrypt(decrypted);
    }
    return decrypted;
}

/***AU Bank Login Encryption Ends **/
