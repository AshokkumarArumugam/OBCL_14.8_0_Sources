<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:variable name="Brn_Neo" select="''"/>
  <xsl:output method="html"/>
  <xsl:variable name="gPosition" select="'template'"/>
  <xsl:variable name="cQuery" select="'Q'"/>
  <xsl:variable name="cResult" select="'R'"/>
  <xsl:variable name="cAdvanced" select="'A'"/>
  <xsl:variable name="cAll" select="'All'"/>
  <xsl:param name="imgPath"/>
  <xsl:param name="oldTheme"/>

  <xsl:variable  name="imgPath_XSL">
    <xsl:choose>
         <xsl:when test="$imgPath != ''">
                <xsl:value-of select="$imgPath"/>
         </xsl:when>
         <xsl:otherwise>
                <xsl:value-of select = "'Images'"/>
         </xsl:otherwise>
    </xsl:choose>        
    </xsl:variable> 
 <xsl:param name="summaryLabels"/>       
  <xsl:param name="applicationName"/>
  <!-- Main template -->
  <xsl:template match="/">
  <body >
    <!--  <TABLE style="width:100%;" summary="" cellpadding="0" cellspacing="0" border="0">
      <TR>
        <TD>
            <TABLE border="0" cellpadding="0" cellspacing="0" id="Adv" summary="" width="100%">-->
              <!--<xsl:variable name="no_Of_flds"
                            select="count(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/TYPE)"/>
              <xsl:if test="no_Of_flds &lt; 2">
                <xsl:text disable-output-escaping="yes">&#60;TR&#62;</xsl:text>
              </xsl:if> -->
           <!--   <TR>
                <TD>-->
                <xsl:call-template name = "Advanced_Summary"/>                                   
            <!--    </TD>
              </TR>
              <xsl:if test="no_Of_flds &lt; 2">
                <xsl:text disable-output-escaping="yes">&#60;/TR&#62;</xsl:text>
              </xsl:if>
            </TABLE>
        </TD>
      </TR>
    </TABLE>-->
      <xsl:call-template name = "dispButtonField"/>
    </body>
    <xsl:call-template name ="generateScript"/>
  </xsl:template>  
  <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispButtonField">
    <div id="PageFoot" style="width:50em">
    <div class="DIVfooter">
    <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
    <div class="DIVAudit">
        <TABLE class="TABLEAudit" width="92%" border="0" cellspacing="0" cellpadding="0" role="presentation" >
        <tbody>
        <TR>
        <td width="10%"></td>
       <!-- <TD width = "100%"></TD>
                <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">-->
                <td rowspan="2" class="TDAuditButton" valign="center" width="90%">
                  <input onclick="fnPaintAdv_Sum_Resp('',event)" type="button"
                         class="BUTTONOk"
                         onMouseOver="this.className='BUTTONOkHover'"
                         onMouseOut="this.className='BUTTONOk'"
                         onFocus="this.className='BUTTONOkHover'"
                         onBlur="this.className='BUTTONOk'"
                         value="{$ok_SummaryAudit}"/>
                  <IMG id="BTN_OK_IMG'" SRC="Images/Ok.gif" NAME="BTN_OK"
                       style="display:none" alt="{$ok_SummaryAudit}"></IMG>
                  <input onClick="fnCloseSumary()" type="button"
                         class="BUTTONExit" id="BTN_EXIT_IMG"
                         onMouseOver="this.className='BUTTONExitHover'"
                         onMouseOut="this.className='BUTTONExit'"
                         onFocus="this.className='BUTTONExitHover'"
                         onBlur="this.className='BUTTONExit'"
                         value="{$cancle_SummaryAudit}" onkeydown="return fnHandleSumBtn(event)"/>
                  <IMG id="BTN_EXIT_IMG'" SRC="Images/Cancel.gif"
                       NAME="BTN_EXIT" style="display:none"
                       alt="{$exit_SummaryAudit}"></IMG>
                </td>
        </TR>      
        </tbody>
        </TABLE>
    </div>
    </div>
    </div>
  </xsl:template>
  <xsl:template name ="Advanced_Summary">
    <DIV ID="TBLPageidAdvanced" style="width:50em; overflow-x: auto; overflow-y: auto;">
          <xsl:variable name = "AuditBlk" select = "//BLOCK[ID ='BLK_AUDIT']"/>
      <TABLE ID="TblAdvanced" width="100%" border="0" cellspacing="2" cellpadding="0" role="presentation">
     <!--   <caption class="HeaderMultiple">
          <span class="SPANHeaderMultiple">
            <xsl:value-of select="$advanced_SummaryAudit"/>
            <img src="{$imgPath_XSL}/star_disabled.gif" alt=""/>
          </span>
        </caption>-->
	<TR>
          <!--  <TD align="left" valign="top" class="TDFirstColumn" width="5%">-->
          <td width="5%" valign="top">
          <!-- bug id 14842317 change starts  -->
         <!--    <fieldset class="FSTdlg"><legend><xsl:value-of select="$fields_SummaryAudit"/></legend>-->
            <fieldset class="FSTdlg"><legend><xsl:value-of select="$search_CaseSensitive"/></legend>
            <!-- bug id 14842317 change ends  -->
           
            <!--  <TABLE border="0" cellspacing="0" cellpadding="3" width="100%" summary="">
                <TR>
                    <TD CLASS="THEADTHMultiple">
                      <xsl:value-of select="$fields_SummaryAudit"/>
                    </TD>
                </TR>
                <TR>
                    <TD >-->
                        <label class="LBLinv" for="idSelectField"><xsl:value-of select="$fields_SummaryAudit"/></label>
                        <SELECT SIZE="32" id="idSelectField" class="SELECTNormal" onChange="fnFillOperators() ">
                        <xsl:variable name="mstrDataSrc_temp" select="normalize-space(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/DBT)"/>
                        <xsl:variable name="mstrDataSrc"><xsl:if test="$mstrDataSrc_temp != ''">
                            <xsl:value-of select="$mstrDataSrc_temp"/>
                        </xsl:if>
                        <xsl:if test="$mstrDataSrc_temp = ''">
                            <xsl:value-of select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/DBT)"/>
                        </xsl:if>
                        </xsl:variable>
                        <xsl:if test="$AuditBlk != '' and $AuditBlk/TYPE = 'M'">
                            <OPTION value="{$mstrDataSrc}.AUTH_STAT" DTYPE="CHAR">
                                <xsl:value-of select="$authStat_SummaryAudit"/>
                            </OPTION>
                            <OPTION value="{$mstrDataSrc}.RECORD_STAT" DTYPE="CHAR">
                                <xsl:value-of select="$recordStat_SummaryAudit"/>
                            </OPTION>
                        </xsl:if>
                        <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                            <xsl:if test="count(DBT) > 0">
                              <xsl:variable name="tDataSrc" select="DBT" />
                              <xsl:variable name="A_DBC" select="DBC" /> 
                              <xsl:variable name ="DType_Qry" select = "DTYPE"/>
                              <xsl:variable name="A_Dtype">
                                  <xsl:if test = "normalize-space($DType_Qry) != ''">
                                    <xsl:value-of select = "$DType_Qry"/>
                                  </xsl:if>    
                                  <xsl:if test = "normalize-space($DType_Qry) = ''">                                
                                      <xsl:value-of select="//BLOCK//FIELD[DBT=$tDataSrc][DBC=$A_DBC]/DTYPE" /> 
                                  </xsl:if>    
                              </xsl:variable>
                              <xsl:variable name="dType" select="DTYPE" />
                              <xsl:variable name="labelLink" select="LABEL_LINK"/>
                              <OPTION value="{$tDataSrc}.{DBC}" DTYPE="{$A_Dtype}">
                                    <xsl:value-of select="LABEL"/>
                              </OPTION>
                            </xsl:if>
                            <xsl:if test="count(DBT) &lt; 1">
                                <xsl:variable name="tDataSrc" select="../DBT" />
                                <xsl:variable name="dType" select="DTYPE" />
                                <OPTION value="{$tDataSrc}.{DBC}" DTYPE="{$dType}">
                                     <xsl:value-of select="LABEL"/>
                                </OPTION>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="$applicationName = 'FCIS'">
                            <xsl:if test="$AuditBlk != '' and $AuditBlk/TYPE = 'M'">
                            <OPTION value="{$mstrDataSrc}.MAKER_ID" DTYPE="CHAR">
                                <xsl:value-of select="$makerId_SummaryAudit"/>
                            </OPTION>
                            <OPTION value="{$mstrDataSrc}.MAKER_DT_STAMP" DTYPE="DATE">
                                <xsl:value-of select="$makerDate_SummaryAudit"/>
                            </OPTION>
                            <OPTION value="{$mstrDataSrc}.CHECKER_ID" DTYPE="CHAR">
                                <xsl:value-of select="$checkerId_SummaryAudit"/>
                            </OPTION>
                            <OPTION value="{$mstrDataSrc}.CHECKER_DT_STAMP" DTYPE="DATE">
                                <xsl:value-of select="$checkerDate_SummaryAudit"/>
                            </OPTION>
                            </xsl:if>
                        </xsl:if>
                    </SELECT>
                   <!-- </TD>
                    </TR>
                </TABLE>-->
                </fieldset>
                </td>
              <!--  <TD align="left" valign="top" width="99%">
                    <TABLE width="100%" border="0" cellspacing="0" cellpadding="3" summary="">
			<TR>
                            <TD CLASS="TDHighlightOne">
                                <xsl:value-of select="$operator_SummaryAudit"/>
                            </TD>
                            <TD CLASS="TDHighlightOne">
                                <xsl:value-of select="$value_SummaryAudit"/>
                            </TD>
                            <TD CLASS="TDHighlightOne">
                                <xsl:value-of select="$to_SummaryAudit"/>
                            </TD>
			</TR>
			<TR>
                            <TD >-->
                <td width="95%" valign="top">
                    <fieldset class="FSTdlg" style="width:36em"><legend><xsl:value-of select="$query_SummaryAudit"/></legend>
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
                                <INPUT TYPE="TEXT" id="idTextFieldValue" name="idTextFieldValue" class="TextNormal"></INPUT>
                                <BUTTON id="cmdLOV" CLASS="BUTTONInline" onClick="fnShowValues(event)" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                                  <img class="IMGInline" src="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/></BUTTON>
                            </span>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <span id="to">
                                <label for="idTextFieldValue2"><xsl:value-of select="$to_SummaryAudit"/></label>
                                <INPUT TYPE="TEXT" id="idTextFieldValue2" name="idTextFieldValue2" readonly="readonly" class="TEXTDisabled"></INPUT>
                                  <BUTTON id="cmdLOV" onClick="fnShowValues2(event)" disabled="disabled" class="BUTTONInline">
                                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/></BUTTON>
                            </span>
                        </div>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        
                        <div class="DIVpage"  style="margin:5px 0px 5px 0px; width:99%">
                            <span class="Fleft">
                                <button onClick="fnAcceptQuery('AND')" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                    <xsl:value-of select="$and_SummaryAudit"/>
                                </button>
                                <button onClick="fnAcceptQuery('OR')" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                    <xsl:value-of select="$or_SummaryAudit"/>
                                </button>
                                <button onClick="fnAcceptQuery('(')" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    (
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </button>
                                <button onClick="fnAcceptQuery(')')" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                     )
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                              </button>
                              <button onClick="fnAcceptQuery('')" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                <xsl:value-of select="$accept_SummaryAudit"/>                                
                              </button>
                          </span>
                        </div>
                        
                        <div class="DIVMultipleMedium" style="margin-left:0px; margin-right:0px; margin-top:1.1em; width:35em">
                            <div class="DIVMultipleMediumInner" style=" width:35em; height:6em; min-height:6em; overflow-y:scroll; overflow-x:auto">
                                <table summary="{$accept_SummaryAudit}" class="TABLEMultiple" id="idadvQuryTable" readonly="true" border="0" cellpadding="0" cellspacing="0" style="width:33.8em">
                                    <colgroup span="4"></colgroup>
                                    <thead>
                                        <tr>
                                            <td colspan="4">
                                                <div class="HeaderMultiple" style="width:34.8em">
                                                    <span class="Fleft"><h2 class="hh4" style="margin:0px"><xsl:value-of select="$query_SummaryAudit"/></h2></span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col" class="TBODYTDMultipleCheckbox">
                                                <input title="{$select_all_rows}" class="CHKstd" type="checkbox" id="QUERY_CHKBOX" onclick="fnCheckUncheckAllAdv(event)">
                                                    <span class="LBLinv"> <xsl:value-of select="$select_all_rows"/> </span> 
                                                </input>
                                            </th>
                                            <th scope="col" class="THEADTHMultiple"><span style="white-space: nowrap;"><xsl:value-of select="$fields_SummaryAudit"/></span></th>						
                                            <th scope="col" class="THEADTHMultiple"><span style="white-space: nowrap;"><xsl:value-of select="$operator_SummaryAudit"/></span></th>
                                            <th scope="col" class="THEADTHMultiple"><span style="white-space: nowrap;"><xsl:value-of select="$value_SummaryAudit" /></span></th>                                                        
                                            <th class="THEADTHMultiple" width="100%"><span style="white-space: nowrap;"></span></th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>                           
                      </div>  
                       <div class="DIVText">
                            <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" class="BTNtext" onclick="fnClearQuery()">
                                <xsl:value-of select="$clearQuery_SummaryAudit"/>
                            </button>
                        </div>
                    </fieldset>
                    <fieldset style="width: 36em;" class="FSTdlg"><legend><xsl:value-of select="$orderBy_SummaryAudit"/></legend>
                        <div class="DIVpage" style="margin:0px 0px 5px 0px; width:99%">
                            <span class="Fleft">
                                <label class="LBLauto" for="idSelectSortDirection"><xsl:value-of select="$orderBy_SummaryAudit"/></label>
                                <SELECT name="select3" class="SELECTNormal"  id="idSelectSortDirection" title="{$orderBy_SummaryAudit}">    
                                    <OPTION VALUE=" ASC " SELECTED="SELECTED"><xsl:value-of select="$ascending_SummaryAudit"/></OPTION>
                                    <OPTION VALUE=" DESC "><xsl:value-of select="$descending_SummaryAudit"/></OPTION>
                                </SELECT>                            
                                <button onclick="fnAcceptOrderBy()" class="BTNtext" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                    <xsl:value-of select="$accept_SummaryAudit"/>
                               </button>
                            </span>
                       </div>
                        
                        <div class="DIVMultipleMedium" style="margin-left:0px; margin-right:0px; margin-top:1.1em; width:35em">
                            <div class="DIVMultipleMediumInner" style=" width:35em; height:6em; min-height:6em; overflow-y:scroll; overflow-x:auto" >
                                <table summary="{$accept_SummaryAudit}" class="TABLEMultiple" id="idadvOrderTable" readonly="true" border="0" cellpadding="0" cellspacing="0" style="width:33.8em">
                                    <colgroup span="4"></colgroup>
                                    <thead>
                                        <tr>
                                            <td colspan="4">
                                                <div class="HeaderMultiple" style="width:34.8em">
                                                    <span class="Fleft"><h2 class="hh4" style="margin:0px"><xsl:value-of select="$query_SummaryAudit"/></h2></span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col" class="TBODYTDMultipleCheckbox">
                                                <input title="{$select_all_rows}" class="CHKstd" type="checkbox" id="ORDER_CHKBOX" onclick="fnCheckUncheckAllAdv(event)">
                                                    <span class="LBLinv"> <xsl:value-of select="$select_all_rows"/> </span> 
                                                </input>
                                            </th>
                                            <th scope="col" class="THEADTHMultiple"><span style="white-space: nowrap;"><xsl:value-of select="$fields_SummaryAudit"/> </span></th>
                                            <th scope="col" class="THEADTHMultiple"><span style="white-space: nowrap;"><xsl:value-of select="$value_SummaryAudit" /> </span></th>           
                                            <th class="THEADTHMultiple" width="100%"><span style="white-space: nowrap;"></span></th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>                                
                            </div>
                        </div>
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
	<script language="javascript" DEFER="DEFER">
  		document.title = "<xsl:value-of select="$advanced_SummaryAudit" />";
  		var gMasterDS = "<xsl:value-of select="substring-after(/FORM/SUMMARY/ADVANCED/DBT,'#')" />";
	</script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
</xsl:template>

	<!-- Display Select List - Added by sandeep -Aug 05,2005 -->
  <xsl:template name="dispSelectField">
    <SELECT CLASS="SELECTList" TYPE="SELECT" SIZE="{SIZE}" DBT="{DBT}" DBC="{DBC}">
            <!-- In case of multiple entry, use DBT -->
        	<xsl:if test="count(DBT) = 0">
		    	<xsl:attribute name="DBT">
		    		<xsl:value-of select="../DBT" />
		    	</xsl:attribute> 
		    </xsl:if>
         <OPTION CLASS="SELECTListOption" VALUE="" SELECTED="true"></OPTION>
         <xsl:for-each select="OPTION" >
	       <OPTION CLASS="SELECTListOption" VALUE="{@VALUE}">		        
		       <xsl:value-of select="." />
		   </OPTION>
       </xsl:for-each> 
    </SELECT>
</xsl:template>
<!-- start of Tmp_Labels.xsl -->
   <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED~~'), '@@')" />
   <xsl:variable name="advance_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_ADVANCED~~'), '@@')" />
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH~~'), '@@')" />   
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
   <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
   <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OF~~'), '@@')" /> 
   <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_QRY_QUERY~~'), '@@')" />
   <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_REFRESH~~'), '@@')" />
   <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RESULT~~'), '@@')" />
   <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_MAKERID~~'), '@@')" />
   <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_ID~~'), '@@')" />
   <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RECORD_STAT~~'), '@@')" />
   <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')" />
   <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_A~~'), '@@')" />
   <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY_U~~'), '@@')" />
   <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_O~~'), '@@')" />
   <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_C~~'), '@@')" />
   <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_UN_AUTH_FLG~~'), '@@')" />
   <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OPEN~~'), '@@')" />
   <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CLOSED~~'), '@@')" />
   <xsl:variable name="authStat_Audit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_EXIT~~'), '@@')" />
   <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_FIELDS~~'), '@@')" />
   <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OPERATOR~~'), '@@')" />
   <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_VALUE~~'), '@@')" />
   <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AND~~'), '@@')" />
   <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ACCEPT~~'), '@@')" />
   <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CLEAR_QUERY~~'), '@@')" />
   <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ORDER_BY~~'), '@@')" />
   <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ASCENDING~~'), '@@')" />
   <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_DESCENDING~~'), '@@')" />
   <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_TO~~'), '@@')" />
   <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OR~~'), '@@')" />
   <xsl:variable name="calendar_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CALENDAR~~'), '@@')" />
   <xsl:variable name="narrative_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_NARRATIVE~~'), '@@')" />
   <xsl:variable name="lov_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
   <xsl:variable name="previous_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')" />
   <xsl:variable name="next_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_NEXT~~'), '@@')" />
   <xsl:variable name="first_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_FIRST~~'), '@@')" />
   <xsl:variable name="last_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_LAST~~'), '@@')" />
   <xsl:variable name="noScript" select="substring-before(substring-after($summaryLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />
   <xsl:variable name="records" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS~~'), '@@')" />   
   <xsl:variable name="taskList" select="substring-before(substring-after($summaryLabels, 'LBL_TASKLIST~~'), '@@')" />   
   <xsl:variable name="advSummary" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED_SUMMARY~~'), '@@')" />   
   <xsl:variable name="summary" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY~~'), '@@')" />   
   <xsl:variable name="page_footer" select="substring-before(substring-after($summaryLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="select_all_rows" select="substring-before(substring-after($summaryLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')" />	
    <!-- bug id 14842317 change starts  -->
   <!--Fix for 14813034 starts-->
   <xsl:variable name="search_CaseSensitive" select="substring-before(substring-after($summaryLabels, 'LBL_CASE_SENSITIVE~~'), '@@')" />  
   <!--Fix for 14813034 ends-->
    <!-- bug id 14842317 change ends  -->
   <!--<xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')" />-->
   <!-- end of Tmp_Labels.xsl -->
  </xsl:stylesheet>
