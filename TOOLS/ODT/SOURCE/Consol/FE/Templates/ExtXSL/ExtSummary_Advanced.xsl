<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- <xsl:import href="GlobalCore.xsl"/> -->
  <!--<xsl:import href="GlobalCore_RAD.xsl"/>-->
  <!--<xsl:variable name="imgPath_XSL" select="'Images/Flexblue'"/>-->
  <!--<xsl:import href="ExtLabels.xsl"/>-->
  <!-- Start of ExtLabels.xsl -->
   <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')" />
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')" />   
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
   <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
   <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" /> 
   <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_QRY_QUERY~~'), '@@')" />
   <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_REFRESH~~'), '@@')" />
   <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESULT~~'), '@@')" />
   <!-- bug id 14842317 change starts  -->
    <xsl:variable name="search_CaseSensitive" select="substring-before(substring-after($XslLabels, 'LBL_CASE_SENSITIVE~~'), '@@')" />  
   <!-- bug id 14842317 change ends  -->
   <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKERID~~'), '@@')" />
   <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_ID~~'), '@@')" />
   <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORD_STAT~~'), '@@')" />
   <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')" />
   <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_A~~'), '@@')" />
   <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY_U~~'), '@@')" />
   <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_O~~'), '@@')" />
   <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_C~~'), '@@')" />
   <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_UN_AUTH_FLG~~'), '@@')" />
   <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPEN~~'), '@@')" />
   <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLOSED~~'), '@@')" />
   <xsl:variable name="authStat_Audit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />

   <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_FIELDS~~'), '@@')" />
   <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPERATOR~~'), '@@')" />
   <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_VALUE~~'), '@@')" />
   <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AND~~'), '@@')" />
   <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ACCEPT~~'), '@@')" />
   <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_QUERY~~'), '@@')" />
   <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ORDER_BY~~'), '@@')" />
   <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ASCENDING~~'), '@@')" />
   <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DESCENDING~~'), '@@')" />
   <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TO~~'), '@@')" />
   <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OR~~'), '@@')" />
 
 
   <xsl:variable name="ok" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="exit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />
   <xsl:variable name="cancel" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" />
   <xsl:variable name="lock_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUM_LOCK~~'), '@@')" />
   <xsl:variable name="checkboxYes" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_YES~~'), '@@')" />
   <xsl:variable name="checkboxNo" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_NO~~'), '@@')" />
   
   <xsl:variable name="mandatory" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_MANDATORY~~'), '@@')" />
   <xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />
   <xsl:variable name="summary" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY~~'), '@@')" />
   <xsl:variable name="expand_group" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_GROUP~~'), '@@')" />
   <xsl:variable name="lov" select="substring-before(substring-after($XslLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
   <xsl:variable name="previous" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')" />
   <xsl:variable name="next" select="substring-before(substring-after($XslLabels, 'LBL_NEXT~~'), '@@')" />
   <xsl:variable name="first" select="substring-before(substring-after($XslLabels, 'LBL_FIRST~~'), '@@')" />
   <xsl:variable name="last" select="substring-before(substring-after($XslLabels, 'LBL_LAST~~'), '@@')" />
   <xsl:variable name="add_row" select="substring-before(substring-after($XslLabels, 'LBL_ADDROW~~'), '@@')" />
   <xsl:variable name="delete_row" select="substring-before(substring-after($XslLabels, 'LBL_DELETEROW~~'), '@@')" />
   <xsl:variable name="single_rec_view" select="substring-before(substring-after($XslLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')" />
   <xsl:variable name="lock" select="substring-before(substring-after($XslLabels, 'LBL_LOCK~~'), '@@')" />
   <xsl:variable name="columns" select="substring-before(substring-after($XslLabels, 'LBL_COLUMNS~~'), '@@')" />
   <xsl:variable name="narrative" select="substring-before(substring-after($XslLabels, 'LBL_NARRATIVE~~'), '@@')" />
   <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')" />
   <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')" />
  <!-- End of ExtLabels.xsl -->
  <xsl:variable name="Brn_Neo" select="''"/>
  <xsl:output method="html"/>
  <xsl:variable name="gPosition" select="'template'"/>
  <xsl:variable name="cQuery" select="'Q'"/>
  <xsl:variable name="cResult" select="'R'"/>
  <xsl:variable name="cAdvanced" select="'A'"/>
  <xsl:variable name="cAll" select="'All'"/>
  <xsl:param name="imgPath"/>
  <xsl:variable name="imgPath_XSL">
    <xsl:choose>
      <xsl:when test="$imgPath != ''">
        <xsl:value-of select="$imgPath"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'Images'"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:param name="XslLabels"/>
  <xsl:param name="applicationName"/>
  <!-- Main template -->
  <xsl:template match="/">
    <body>     
        <xsl:variable name="no_Of_flds" select="count(//SUMMARY/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/TYPE)"/>
        <xsl:if test="no_Of_flds &lt; 2">
            <xsl:text disable-output-escaping="yes">&#60;TR&#62;</xsl:text>
        </xsl:if>
        <xsl:call-template name="Advanced_Summary"/>
        <xsl:if test="no_Of_flds &lt; 2">
            <xsl:text disable-output-escaping="yes">&#60;/TR&#62;</xsl:text>
        </xsl:if>       
        <xsl:call-template name="dispButtonField"/>      
    </body>
    <xsl:call-template name="generateScript"/>
  </xsl:template>
  <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispButtonField">
    <div id="PageFoot" style="width:50em">
        <div class="DIVfooter">
            <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
            <div class="DIVAudit">          
            <TABLE class="TABLEAudit" width="92%" border="0" cellspacing="0" cellpadding="0" role="presentation" >
                <TR>
                <TD width="10%"></TD>
                <TD class="TDAuditButton" width="90%" rowspan="2" valign="center">
                    <button id="BTN_OK" onclick="fnSave_sum('CVS_ADVANCED', event)" class="BTNfooter" onblur="this.className='BTNfooter'" 
                            onmouseover="this.className='BTNfooterH'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
                            <xsl:value-of select="$ok_SummaryAudit"/>
                    </button>                
                    <button id="BTN_EXIT" onClick="fnExit_sum('CVS_ADVANCED')" class="BTNfooter" onblur="this.className='BTNfooter'"
                            onmouseover="this.className='BTNfooterH'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" onkeydown="return fnHandleSumBtn(event)">
                            <xsl:value-of select="$cancle_SummaryAudit"/>
                    </button>			
                </TD>
              </TR>
            </TABLE>         
        </div>
      </div>
    </div>
  </xsl:template>
  
  
<xsl:template name="Advanced_Summary">
    <!-- Display the content of advanced tab -->    
    <!-- <DIV ID="PageHead" style="width:50em; overflow-x:auto; overflow-y:hidden">-->
    <DIV id="PageHead" style="overflow: auto; display: block; width: 47em; position: relative;">
      <!--<xsl:variable name = "AuditBlk" select = "//BLOCK[ID ='BLK_AUDIT']"/>-->
        <TABLE class ="TBLone" ID="TblAdvanced" border="0" cellspacing="7" cellpadding="0" role="presentation" width="100%">
            <TR>                   
                <td width="5%" valign="top">
                  <!-- bug id 14842317 change starts  -->
                   <!-- <fieldset class="FSTdlg"><legend><xsl:value-of select="$fields_SummaryAudit"/></legend>-->
                     <fieldset class="FSTdlg"><legend><xsl:value-of select="$search_CaseSensitive"/></legend>
                      <!-- bug id 14842317 change ends  -->
                        <label class="LBLinv" for="idSelectField"><xsl:value-of select="$fields_SummaryAudit"/></label>
                        <SELECT name="select" SIZE="32" id="idSelectField" title="{$fields_SummaryAudit}" class="SELstd" onChange="fnFillOperators(event) ">
                            <xsl:variable name="mstrDataSrc" select="normalize-space(//SUMMARY/SUMMARY_DATA_BLK)"/>
                            <xsl:for-each select="//SUMMARY/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                <xsl:variable name="A_DBC" select="NAME"/>
                                <xsl:variable name="A_Dtype" select="DTYPE"/>
                                <xsl:variable name="A_fldType" select="TYPE"/>
                                <xsl:variable name="labelLink" select="LABEL_LINK"/>
                                <OPTION value="{NAME}" DTYPE="{$A_Dtype}" TYPE ="{$A_fldType}"  blk_name ="{$mstrDataSrc}__{NAME}" >
                                    <xsl:value-of select="LBL"/>
                                </OPTION>
                            </xsl:for-each>                   
                        </SELECT>
                    </fieldset>
                </td>
                <td width="95%" valign="top">
                    <fieldset class="FSTdlg" style="width:35em"><legend><xsl:value-of select="$query_SummaryAudit"/></legend>
                        <div class="DIVText">
                            <span id="operator">
                                <label class="LBLauto" for="idSelectOp"><xsl:value-of select="$operator_SummaryAudit"/></label>
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                <SELECT name="select2" class="SELstd"  id="idSelectOp" title="{$operator_SummaryAudit}" onchange="fnCheckOperator()"></SELECT>
                            </span>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <span id="fieldValue">
                                <label for="idTextFieldValue"><xsl:value-of select="$value_SummaryAudit" /></label>
                                <INPUT TYPE="TEXT" id="idTextFieldValue" name="idTextFieldValue" title="{$value_SummaryAudit}" class="TXTstd"></INPUT>
                                
                                <BUTTON id="cmdLOV" onClick="fnBuildAdvLOV('idTextFieldValue', event)" title="{$lov}" class="BTNimg" 
                                      onblur="this.className='BTNimg'" onmouseover="this.className='BTNimgH'" onfocus="this.className='BTNimgH'" 
                                      onmouseout="this.className='BTNimg'">
                                      <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                                </BUTTON>  
                            </span>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <span id="to">
                                <label for="idTextFieldValue2"><xsl:value-of select="$to_SummaryAudit"/></label>
                                <INPUT TYPE="TEXT" id="idTextFieldValue2" name="idTextFieldValue2" readonly="readonly" title="{$to_SummaryAudit}" class="TXTro"></INPUT>
                                
                                <BUTTON id="cmdLOV" onClick="fnBuildAdvLOV('idTextFieldValue2', event)" disabled="disabled" title="{$lov}" class="BTNhide">
                                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                                </BUTTON>
                            </span>
                        </div>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <!--Murali <div class="DIVText"> Murali-->
                        <div class="DIVText"  style="margin:5px 0px 5px 0px; width:99%">
                            <span class="Fleft">
                                <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnAcceptQuery('AND')">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                        <xsl:value-of select="$and_SummaryAudit"/>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </button>
                                <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnAcceptQuery('OR')">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                        <xsl:value-of select="$or_SummaryAudit"/>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </button>
                                 <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnAcceptQuery('(')">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                       (
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </button>
                                <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnAcceptQuery(')')">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                       )
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </button>
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnAcceptQuery('')">
                                    <xsl:value-of select="$accept_SummaryAudit"/>
                                </button>
                            </span>
                        </div>

                        <div class="DIVMultipleBig" style="margin-left:0px; margin-right:0px; width:35em" >
                            <div class="DIVmultiplebox">
                                <div class="DIVGridME" style="width:35em">
                                    <span class="Fleft"><h2 class="hh4" style="margin:0px"><xsl:value-of select="$query_SummaryAudit"/></h2></span>
                                </div>
                                <div class="DIVMultipleSmallInner" style=" width:35em; height:7em; min-height:6em" >
                                    <table summary="{$accept_SummaryAudit}" class="TBLone" id="idadvQuryTable" readonly="true" border="0" cellpadding="0" cellspacing="0" style="width:33.8em">
                                        <colgroup span="6"></colgroup>
                                        <thead>
                                            <tr>
                                                <td id="Table_Options" class="Textleft" colspan="5">
                                                    <div></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="THgrid1">
                                                    <input title="{$select_all_rows}" type="checkbox" id="QUERY_CHKBOX" onclick="fnCheckUncheckAll(event)">
                                                        <span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span> 
                                                    </input>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$fields_SummaryAudit"/></span>
                                                </th>						
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$operator_SummaryAudit"/></span>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$value_SummaryAudit" /></span>
                                                </th>              
                                                <th class="THgrid" width="100%"> <span class="LBLinv"></span></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <div class="DIVText">
                            <button onclick="fnClearQuery()" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">   
                                <xsl:value-of select="$clearQuery_SummaryAudit"/>                   
                            </button>
                        </div>
                    </fieldset>    
                        
                    <fieldset class="FSTdlg" style="width:35em"><legend><xsl:value-of select="$orderBy_SummaryAudit"/></legend>
                        <div class="DIVText">
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>  
                            <label class="LBLauto" for="idSelectSortDirection"><xsl:value-of select="$orderBy_SummaryAudit"/></label>
                            <SELECT name="select3" class="SELstd"  id="idSelectSortDirection" title="{$orderBy_SummaryAudit}">    
                                <OPTION VALUE=" ASC " SELECTED="SELECTED"><xsl:value-of select="$ascending_SummaryAudit"/></OPTION>
                                <OPTION VALUE=" DESC "><xsl:value-of select="$descending_SummaryAudit"/></OPTION>
                            </SELECT>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                   
                            <button onclick="fnAcceptOrderBy()" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">                   
                                <xsl:value-of select="$accept_SummaryAudit"/>
                            </button>
                        </div>
                        <div class="DIVMultipleBig" style="margin-left:0px; margin-right:0px; width:35em" >
                            <div class="DIVmultiplebox">
                                <div class="DIVGridME" style="width:35em">
                                    <span class="Fleft"><h2 class="hh4" style="margin:0px"><xsl:value-of select="$query_SummaryAudit"/></h2></span>
                                </div>
                                <div class="DIVMultipleSmallInner" style=" width:35em; height:6em; min-height:6em" >
                                    <table summary="{$accept_SummaryAudit}" class="TBLone" id="idadvOrderTable" readonly="true" border="0" cellpadding="0" cellspacing="0" style="width:33.8em">
                                        <colgroup span="6"></colgroup>
                                        <thead>
                                            <tr>
                                                <td id="Table_Options" class="Textleft" colspan="4">
                                                    <div></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="THgrid1">
                                                    <input title="{$select_all_rows}" type="checkbox" id="ORDER_CHKBOX" onclick="fnCheckUncheckAll(event)">
                                                        <span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span> 
                                                    </input>
                                                </th>
                                              			
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$fields_SummaryAudit"/></span>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$value_SummaryAudit" /></span>
                                                </th> 
                                                 <th class="THgrid" width="100%"> <span class="LBLinv"></span></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                       <!-- <div class="DIVText">
                            <TEXTAREA name="textarea" rows="5" class="TXAstd" id="idTAOrderBy" style="width:99%"></TEXTAREA>
                        </div>-->
                        <div class="DIVText">
                            <button onCLick="fnClearOrderBy()" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">                
                                <xsl:value-of select="$clearQuery_SummaryAudit"/>                   
                            </button>
                        </div>
                    </fieldset>
                </td>
            </TR>
        </TABLE>   
    </DIV>
</xsl:template>

  <xsl:template name="generateScript">
    <!-- Script to be run for summary screens -->   
    <script type="text/javascript" DEFER="DEFER">   
        document.title = "<xsl:value-of select="$advanced_SummaryAudit"/>"
        var gMasterDS = "<xsl:value-of select="substring-after(/FORM/SUMMARY/ADVANCED/DBT,'#')"/>";
    </script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
  </xsl:template>
</xsl:stylesheet>
