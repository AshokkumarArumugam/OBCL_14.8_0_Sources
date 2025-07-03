<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!--
       <xsl:import href="Tmp_Labels.xsl"/>       
       <xsl:import href="Tmp_Summary_Audit.xsl"/>       
       <xsl:import href="Tmp_SummaryInput.xsl"/>
       <xsl:import href="Tmp_SummaryCore.xsl"/>
	   -->
       <!--<xsl:variable name="imgPath_XSL" select="'Images/Flexblue'"/>-->
       <xsl:variable name="Brn_Neo" select="''"/>
       <xsl:output method="html"/>
       <xsl:variable name="gPosition" select="'template'"/>
       <xsl:variable name="cQuery" select="'Q'"/>
       <xsl:variable name="cResult" select="'R'"/>
       <xsl:variable name="cAdvanced" select="'A'"/>
       <xsl:variable name="cAll" select="'All'"/>
       <xsl:param name="oldTheme"/>
        <!--For export option in the summary screen-->
       <xsl:param name="exportReq"/>
       <xsl:param name="imgPath"/>
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
       <!--<div class="DIVHeaderBodyContainer" style="overflow:auto" id = "DIVMainTmp">
	<div class="DIVTwoColSectionContainer" id = "ScrollYes" style="overflow-x:hidden; overflow-y:auto;">  -->
        <div id="ScrollYes"  style="overflow-y:auto; overflow-x:hidden; position:relative">
            <div id="PageHead" class="DIVTwoColLyt">
                <xsl:call-template name="QueryContent"/> 
            </div>
                <xsl:call-template name="ResultProcess"/>  
            </div>
             <!--  <div class="DIVTwoColSectionContainer" id="DIVlegend" style="display:none">               -->
             <!--
             <div class="DIVTwoColSectionContainer" id="legenddiv">
                   <xsl:variable name="tdHgt">
                    <xsl:if test="count(//LEGENDS) > 2">
                      <xsl:value-of select="90"/>
                    </xsl:if>
                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                      <xsl:value-of select="100"/>
                    </xsl:if>
                   </xsl:variable>
                   <xsl:variable name="fsHgt">
                    <xsl:if test="count(//LEGENDS) &gt; 2">
                      <xsl:value-of select="50"/>
                    </xsl:if>
                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                      <xsl:value-of select="50"/>
                    </xsl:if>
                   </xsl:variable>
                    <xsl:call-template name="Custom_Legends">
                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                    </xsl:call-template>  
                    <xsl:call-template name="Audit_Legends">
                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                    </xsl:call-template>            
                </div>
                -->
                <div class="DIVfooter" id="DIVFooter">
                    <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
                    <div class="DIVAudit" id="DIVAudit">
                        <xsl:call-template name="disp_Exit_Btn"/>
                    </div>
                </div>                                    
              <xsl:call-template name="generateScript">
              </xsl:call-template>
       </xsl:template>

       <xsl:template name="QueryContent">        
        <!--<div id="DIVQuery">
            <TABLE id="TblQuery" cellspacing="0" cellpadding="0" border="0" width="99%" summary="{$summary}">
                <TBODY>-->
            <div class="DIVTwoColSectionContainer" id="TblQuery">   
                <xsl:variable name="no_Of_flds" select="count(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD)"/>
                <xsl:variable name="no_Of_vis_flds" select="count(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'])"/>
                                         
                <xsl:if test="$no_Of_flds &gt; 0">                
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                            <xsl:call-template name="AuditFields">
                                <xsl:with-param name="auditfield" select="'authstat'"/>
                            </xsl:call-template>
                            <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
                                <xsl:variable name="pos" select="position()"/>
                                <xsl:variable name="dbt" select="../DBT"/>
                                <xsl:variable name="dbc" select="../DBC"/>
                                <xsl:variable name="fldName" select="../NAME"/>
                                    <xsl:if test="($pos mod 2 = 1) and $pos &lt; 15">
                                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                                            <xsl:call-template name="typeHandler">
                                                <xsl:with-param name="fType" select="."/>
                                                <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                            <xsl:call-template name="typeHandler">
                                                <xsl:with-param name="fType" select="."/>
                                                <xsl:with-param name="fldNode" select=".."/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </xsl:if>
                            </xsl:for-each>
                        </fieldset>
                    </div>
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                            <xsl:call-template name="AuditFields">
                                <xsl:with-param name="auditfield" select="'recordstat'"/>
                            </xsl:call-template>
                            <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
                                <xsl:variable name="pos" select="position()"/>
                                <xsl:variable name="dbt" select="../DBT"/>
                                <xsl:variable name="dbc" select="../DBC"/>
                                <xsl:variable name="fldName" select="../NAME"/>
                                <xsl:if test="($pos mod 2 = 0) and $pos &lt; 15">
                                    <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">                                        
                                        <xsl:call-template name="typeHandler">
                                            <xsl:with-param name="fType" select="."/>
                                            <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                        </xsl:call-template>
                                    </xsl:if>
                                    <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">                                
                                        <xsl:call-template name="typeHandler">
                                            <xsl:with-param name="fType" select="."/>
                                            <xsl:with-param name="fldNode" select=".."/>
                                        </xsl:call-template>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                        </fieldset>
                    </div>
                    <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE='HIDDEN']/TYPE">
                        <xsl:variable name="pos" select="position()"/>
                        <xsl:variable name="dbt" select="../DBT"/>
                        <xsl:variable name="dbc" select="../DBC"/>
                        <xsl:variable name="fldName" select="../NAME"/>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select=".."/>
                            </xsl:call-template>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:if>
              </div>
              <xsl:variable name="noOfRows" select="//SUMBUTTONS/BUTTON_ROWS"></xsl:variable>   
              <div class="DIVbar1" id ="button_row">             
                    <BUTTON class="BTNhide" NAME = "Export" title="{$exp_SummaryAudit}" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnExportToExcel()" onkeydown="return fnhandleSubScrBtn(event)">            
                        <xsl:text disable-output-escaping="yes"></xsl:text>
                        <xsl:text disable-output-escaping="yes"></xsl:text>
                        <xsl:value-of select="$exp_SummaryAudit"/>
                     </BUTTON>
                     <BUTTON class="BTNtext" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" title="{$search_SummaryAudit}" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnExecuteQuery(event)" onkeydown="return fnhandleSubScrBtn(event)" >
                       <span class="ICOsearch">
                            <xsl:text disable-output-escaping="yes"></xsl:text>
                            <xsl:text disable-output-escaping="yes"></xsl:text>
                            <xsl:text disable-output-escaping="yes"></xsl:text>
                            <xsl:text disable-output-escaping="yes"></xsl:text>
                            <span class = "LBLinv"><xsl:value-of select = "$search_SummaryAudit"/></span>
                        </span>         
                        <xsl:text disable-output-escaping="yes"></xsl:text>
                        <xsl:text disable-output-escaping="yes"></xsl:text>
                        <xsl:value-of select="$search_SummaryAudit"/>
                     </BUTTON>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <BUTTON class="BTNtext" title="{$advanced_SummaryAudit}"  onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnOpenAdvanced()" onkeydown="return fnhandleSubScrBtn(event)">
                        <xsl:value-of select="$advanced_SummaryAudit"/>
                     </BUTTON>  
                     
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <xsl:text disable-output-escaping="yes"></xsl:text>
                     <BUTTON class="BTNtext" title="{$reset_SummaryAudit}" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnResetQry(event)" onkeydown="return fnhandleSubScrBtn(event)">
                        <xsl:value-of select="$reset_SummaryAudit"/>
                     </BUTTON>     
                </div>
       </xsl:template>

       
       <xsl:template name="generateScript">
        <script type="text/javascript" DEFER="DEFER">
          gscrPos = "<xsl:value-of select="$gPosition"/>";      
          var imgpath = "<xsl:value-of select="$imgPath_XSL"/>";      

         l_LablesArr = new Array(); 
                     
                     <xsl:for-each select="//SUMBLOCK[@SCREEN='SUMMARY' and @TABPAGE='RESULT']/FIELD">
                            <xsl:variable name="fName">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fNameTmp">
                                   <xsl:value-of select="concat('&quot;', $fName , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="fLabel">
                                   <xsl:value-of select="LABEL"/>
                            </xsl:variable>
                            <xsl:variable name="fLabelTmp">
                                   <xsl:value-of select="concat('&quot;', $fLabel , '&quot;' , ';')"/>
                            </xsl:variable>
                            <xsl:variable name="ConcatStr">
                                   <xsl:value-of select="concat('l_LablesArr[',$fNameTmp, ']' , '=' , $fLabelTmp)">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$ConcatStr"/>
                     </xsl:for-each>


                    l_LablesArr['MAKER_ID'] = "<xsl:value-of select="$makerId_SummaryAudit"/>";
                    l_LablesArr['CHECKER_ID'] = "<xsl:value-of select="$checkerId_SummaryAudit"/>";
                    l_LablesArr['RECORD_STAT'] = "<xsl:value-of select="$recordStat_SummaryAudit"/>";
                    l_LablesArr['AUTH_STAT'] = "<xsl:value-of select="$authStat_SummaryAudit"/>";
      
      
      
                     <!-- Cache the Qry Order -->
                     l_QryOrdArr = new Array();
                     l_QryOrdArr[0] = 'AUTH_STAT';
                     l_QryOrdArr[1] = 'RECORD_STAT';
    
      
                     <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                            <xsl:variable name="Ord" select="position()"/>
                            <xsl:variable name="fDBC">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fDBCTmp">
                                   <xsl:value-of select="concat('&quot;', $fDBC , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="CacheConcatStr">
                                   <xsl:value-of select="concat('l_QryOrdArr[',($Ord)+1, ']' , '=' , $fDBCTmp , ';')">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$CacheConcatStr"/>
                     </xsl:for-each>
              </script>
                <noscript>
                    <xsl:value-of select="$noScript"/>
                </noscript>
       </xsl:template>


       <xsl:template name="ResultProcess">
            <xsl:variable name="spanCnt">
                <xsl:value-of select="count(/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
        <div id="PageBody">  
            <div id="TblOuterDiv" class="DIVtblbox1outer">
                <span id="TblOuterSpn" style="height:1.5em; display:block"></span>
                <DIV style="overflow-y:auto; overflow-x:auto; width: 786px; height: 200px;" class="DIVtblbox1"
								id="QryRslts" onkeydown="return handleSumkeys(event)">
                    <h2 class="hh4"></h2>
                    <TABLE class="TABLESummary" ID="TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" width = "100%" summary="{$summary}"> 
                        <colgroup span="{$spanCnt}"></colgroup>
                        <THEAD> 
                            <tr>
                                <th colspan="{$spanCnt}" scope="col" id="Table_Options"> 
                                    <div class="DIVcaption1" id="TblInnerDiv" style="width:100%">
                                        <label class="LBLnw" title="{$recordsPerPage_SummaryAudit}" for="">
                                            <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                                            <xsl:text disable-output-escaping="yes"></xsl:text>
                                        </label>                            
                                        <SELECT CLASS="SELstd" NAME="Records" onchange = "fnExecuteQuery(event)" TYPE="number" SIZE="" MAXLENGTH="3">
                                            <OPTION VALUE="15">15</OPTION>
                                            <OPTION VALUE="25">25</OPTION>
                                            <OPTION VALUE="50">50</OPTION>
                                        </SELECT> 
                                        
                                        <button class="BTNimgD" title="{$first_SummaryAudit}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><span tabindex="-1" class="ICOfirst"></span></button>
                                        <button class="BTNimgD" title="{$previous_SummaryAudit}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><span tabindex="-1" class="ICOprevious"></span></button>
                                        
                                        <span class="SPNtext" id="CurPage" name="CurPage">1</span>
                                        <span class="SPNtext" id="ofLabel">
                                            <xsl:text disable-output-escaping="yes"></xsl:text>
                                            <xsl:value-of select="$of_SummaryAudit"/>
                                            <xsl:text disable-output-escaping="yes"></xsl:text>
                                        </span>
                                        <span class="SPNtext" id="TotPgCnt" name="TotPgCnt">1</span>
                                        
                                        <button class="BTNimgD"  title="{$next_SummaryAudit}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><span tabindex="-1" class="ICOnext"></span></button>
                                        <button class="BTNimgD"  title="{$last_SummaryAudit}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><span tabindex="-1" class="ICOlast"></span></button>
                                        
                                        <label class="LBLstd" for="goto"></label>
                                        <input class="TXTstd" id="goto" name="gotopage" READONLY="true" size="1" type="text"></input>
                                        <button class="BTNtextD" onclick="goToPage(event)" disabled="true" name="go" onkeydown="return fnhandleSubScrBtn(event)"><xsl:value-of select="$gotoPage_SummaryAudit"/></button>
                                    </div>
                                </th>
                            </tr>
                            <TR onkeydown="return fnHandleSumTH(event)">
                               <xsl:if test="/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'U' or $exportReq = 'Y'">
                                    <th class="THgrid1" scope="col" nowrap="nowrap">
                                      <label class="LBLauto" for=""><INPUT TYPE="CHECKBOX" NAME = "RSLT_CHKBOX"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll(event)"/></label>
                                    </th>
                                </xsl:if>                    

                                <xsl:call-template name = "AuditResult"/>
                      
                              <xsl:for-each select="/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                <xsl:variable name="dbt" select="DBT"/>
                                <xsl:variable name="dbc" select="DBC"/>
                                <xsl:variable name="fldName" select="NAME"/>
                                <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                                    <!-- THE BELOW CHOOSE IS USED TO VERIFY IF THE APPLICATION IS "FCIS" AND IF SO, TO CHECK IF THE FIELDS ALREADY HAVE THE AUDIT FIELDS -->
                                    <xsl:choose>
                                        <xsl:when test="$applicationName = 'FCIS'">
                                            <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                                    <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>                            
                                    <TH TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!-- SNORAS#001517-->
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="NAME">
                                        <xsl:value-of select="$fldName"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DBT">
                                        <xsl:value-of select="$dbt"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DBC">
                                        <xsl:value-of select="$dbc"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DTYPE">
                                        <xsl:value-of select="$fldNode/DTYPE"/>
                                      </xsl:attribute>
                                      <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                        <xsl:attribute name="RELATED_FIELD">
                                            <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                        </xsl:attribute>
                                      </xsl:if>
                                      <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </TH>
                                </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>                            
                                            <TH TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="NAME">
                                                <xsl:value-of select="$fldName"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DBT">
                                                <xsl:value-of select="$dbt"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DBC">
                                                <xsl:value-of select="$dbc"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DTYPE">
                                                <xsl:value-of select="$fldNode/DTYPE"/>
                                              </xsl:attribute>
                                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                                <xsl:attribute name="RELATED_FIELD">
                                                    <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                                </xsl:attribute>
                                              </xsl:if>
                                              <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </TH>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                                <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                    <xsl:choose>
                                        <xsl:when test="$applicationName = 'FCIS'">
                                            <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                                    <xsl:variable name="fldNode" select="."/>                            
                                    <TH TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="NAME">
                                        <xsl:value-of select="$fldName"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DBT">
                                        <xsl:value-of select="$dbt"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DBC">
                                        <xsl:value-of select="$dbc"/>
                                      </xsl:attribute>
                                      <xsl:attribute name="DTYPE">
                                        <xsl:if test="normalize-space($fldNode/DTYPE) != ''">
                                        <xsl:value-of select="$fldNode/DTYPE"/>
                                        </xsl:if>
                                        <xsl:if test="normalize-space($fldNode/DTYPE) = ''">
                                            <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) != ''">
                                                <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE"/>
                                            </xsl:if>
                                            <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) = ''">
                                                <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/DTYPE"/>
                                            </xsl:if>
                                        </xsl:if>
                                      </xsl:attribute>
                                      <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                        <xsl:attribute name="RELATED_FIELD">
                                            <xsl:if test="normalize-space($fldNode/RELATED_FIELD) != ''">
                                                <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                            </xsl:if>
                                            <xsl:if test="normalize-space($fldNode/RELATED_FIELD) = ''">
                                                <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) != ''">
                                                    <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD"/>
                                                </xsl:if>
                                                <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) = ''">
                                                    <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/RELATED_FIELD"/>
                                                </xsl:if>
                                            </xsl:if>
                                        </xsl:attribute>
                                      </xsl:if>
                                      <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </TH>
                                            </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="."/>                            
                                            <TH TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="NAME">
                                                <xsl:value-of select="$fldName"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DBT">
                                                <xsl:value-of select="$dbt"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DBC">
                                                <xsl:value-of select="$dbc"/>
                                              </xsl:attribute>
                                              <xsl:attribute name="DTYPE">
                                                <xsl:if test="normalize-space($fldNode/DTYPE) != ''">
                                                <xsl:value-of select="$fldNode/DTYPE"/>
                                                </xsl:if>
                                                <xsl:if test="normalize-space($fldNode/DTYPE) = ''">
                                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) != ''">
                                                        <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE"/>
                                                    </xsl:if>
                                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) = ''">
                                                        <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/DTYPE"/>
                                                    </xsl:if>
                                                </xsl:if>
                                              </xsl:attribute>
                                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                                <xsl:attribute name="RELATED_FIELD">
                                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) != ''">
                                                        <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                                    </xsl:if>
                                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) = ''">
                                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) != ''">
                                                            <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD"/>
                                                        </xsl:if>
                                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) = ''">
                                                            <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/RELATED_FIELD"/>
                                                        </xsl:if>
                                                    </xsl:if>
                                                </xsl:attribute>
                                              </xsl:if>
                                              <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </TH>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                              </xsl:for-each>                      
                              <xsl:if test="$applicationName = 'FCIS'">
                                <xsl:call-template name="AuditResultFCIS"/>
                              </xsl:if>
                              <TH width="99%" scope="col"><xsl:text disable-output-escaping="yes"></xsl:text></TH> 
                            </TR>
                        </THEAD>                  
                        <TBODY>
                          <TR>
                              <TD>
                                  <!-- <xsl:text disable-output-escaping="yes"></xsl:text>                            -->
                              </TD>
                          </TR>
                    </TBODY> 
               </TABLE>
            </DIV>
            </div>
            <!-- Newly added DIV ends here -->
        </div>
          <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">
           <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
           <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>

                <div class="DIVSubSystem" id="SUM_CUST_BTNS" style="padding-left:2px;">
          <ul id="CUST_BTNS">
            <xsl:for-each select="//SUMBUTTONS/BUTTON">
                <li >
                    <a href="#" class="BUTTONSubSystem" NAME="{BUTTON_NAME}" id="{BUTTON_NAME}">
                        <xsl:if test="BUTTON_EVENT != ''">
                          <xsl:attribute name="onClick"><xsl:value-of select="BUTTON_EVENT"/></xsl:attribute>
                        </xsl:if>
                    <span><xsl:value-of select="BUTTON_LABEL"/></span>
                    </a>
                </li>
            </xsl:for-each>
        </ul>
        </div>
            

        </xsl:if>         
       </xsl:template> 
		<!-- start of Tmp_Labels.xsl -->
   <xsl:variable name="exp_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_EXPORT~~'), '@@')" />
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
		<!-- end of Tmp_Labels.xsl -->
		<!-- start of Tmp_Summary_Audit.xsl -->
<xsl:template name="Audit_Legends">
	<!-- For Rec Status and Auth Status FldSets kals on June 4 -->
	<xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
	<xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
	<xsl:if test="$AuditBlk_exist != ''">
			<xsl:if test="$AuditBlk_Type = 'M'">    
        <dl class="DLlengend">
          <dt><xsl:value-of select="$authStat_SummaryAudit"/></dt>
          <dd>
            <xsl:value-of select="$lableA_SummaryAudit"/>
            -
            <xsl:value-of select="$authorized_SummaryAudit"/>
          </dd>
          <dd>
            <xsl:value-of select="$lableU_SummaryAudit"/>
            -
            <xsl:value-of select="$unauthorized_SummaryAudit"/>
          </dd>
        </dl>
			</xsl:if>
			<xsl:if test="$AuditBlk_Type = 'M'">        
        <dl class="DLlengend">
				<dt><xsl:value-of select="$recordStat_SummaryAudit"/></dt>
				<dd>
					<xsl:value-of select="$lableC_SummaryAudit"/>
					-
					<xsl:value-of select="$closed_SummaryAudit"/>
				</dd>
				<dd>
					<xsl:value-of select="$lableO_SummaryAudit"/>
					-
					<xsl:value-of select="$open_SummaryAudit"/>
				</dd>
        </dl>
			</xsl:if>
	</xsl:if>
</xsl:template>
  <xsl:template name="Custom_Legends">
    <xsl:if test="count(//LEGENDS) > 0">
      <xsl:for-each select="//LEGENDS">
        <dl class="DLlengend">
          <dt><xsl:value-of select="LABEL"/></dt>
          <xsl:for-each select="OPTION">
            <dd><xsl:value-of select="@VALUE"/> - <xsl:value-of select="(.)"/></dd>						
          </xsl:for-each>
        </dl>        
      </xsl:for-each>
    </xsl:if>
  </xsl:template>
  <xsl:template name="AuditFields">
    <xsl:param name="auditfield" select="."/>
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
    <xsl:if test="$AuditBlk_exist != ''">
        <xsl:if test="$AuditBlk_Type = 'M'">
            <xsl:if test="$auditfield='authstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="AUTH_STAT">
                  <xsl:value-of select="$authStat_SummaryAudit"/>
                  <img src="{$imgPath_XSL}/star_disabled.gif" ALT=""/>
                </LABEL>
                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1"
                        DBT="{DBT}" DBC="AUTH_STAT" NAME="AUTH_STAT" id="AUTH_STAT">
                  <OPTION VALUE="" SELECTED="true"></OPTION>
                  <OPTION VALUE="A">
                    <xsl:value-of select="$authStat_Audit"/>
                  </OPTION>
                  <OPTION VALUE="U">
                    <xsl:value-of select="$unauthorized_SummaryAudit"/>
                  </OPTION>
                </SELECT>
              </div>
            </xsl:if>
        </xsl:if>
        <!-- For Maintenance add the Record Status!-->
        <xsl:if test="$AuditBlk_Type = 'M'">
            <xsl:if test="$auditfield='recordstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="RECORD_STAT">
                  <xsl:value-of select="$recordStat_SummaryAudit"/>
                  <img src="{$imgPath_XSL}/star_disabled.gif" title="" ALT=""/>
                </LABEL>
                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1"
                        DBT="{DBT}" DBC="RECORD_STAT" NAME="RECORD_STAT" id="RECORD_STAT">
                  <OPTION VALUE="" SELECTED="true"></OPTION>
                  <OPTION VALUE="O">
                    <xsl:value-of select="$open_SummaryAudit"/>
                  </OPTION>
                  <OPTION VALUE="C">
                    <xsl:value-of select="$closed_SummaryAudit"/>
                  </OPTION>
                </SELECT>
              </div>
          </xsl:if>
        </xsl:if>
    </xsl:if>
  </xsl:template>
  <xsl:template name="disp_Exit_Btn">
    <TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="98%"
           border="0" summary="">
        <TBODY>
      <TR>
        <td valign="top" width="90%">
          <div id="legenddiv" style="height:7em; overflow-y:auto; overflow-x:hidden">
            <xsl:call-template name="Custom_Legends">
            </xsl:call-template>
            <xsl:call-template name="Audit_Legends">
            </xsl:call-template>
          </div>
        </td>
        <TD class="TDAuditButton" vAlign="top" width="90%">
          <INPUT class="BUTTONExit" id="BTN_EXIT"
                 onblur="this.className='BUTTONExit'"
                 onmouseover="this.className='BUTTONExitHover'"
                 onfocus="this.className='BUTTONExitHover'" onclick="fnExit(event)"
                 onmouseout="this.className='BUTTONExit'" type="button"
                 value="{$exit_SummaryAudit}"
                 onkeydown="return fnHandleSumBtn(event)"/>
          <IMG id="BTN_EXIT_IMG'" style="display:none" src="Images/Exit2.gif"
               name="BTN_EXIT_IMG" ALT="{$exit_SummaryAudit}"/>
        </TD>
      </TR>
      </TBODY>
    </TABLE>

  </xsl:template>
  <!-- Kals June 15 Audit Results -->
  <xsl:template name="AuditResult">
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$AuditBlk_exist != ''">
      <xsl:if test="$AuditBlk_Type = 'M'">    
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$authStat_SummaryAudit"/>
            </a>
        </TH>
      </xsl:if>
      <xsl:if test="$AuditBlk_Type = 'M'">        
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$recordStat_SummaryAudit"/>
            </a>
        </TH>
      </xsl:if>      
    </xsl:if>
  </xsl:template>
  <xsl:template name="AuditResultFCIS">
    <xsl:variable name="lAuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="lAuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$lAuditBlk_exist != ''">
      <xsl:if test="$lAuditBlk_Type = 'M'">    
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$makerId_SummaryAudit"/>
            </a>
        </TH>
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$makerDate_SummaryAudit"/>
            </a>
        </TH>
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$checkerId_SummaryAudit"/>
            </a>
        </TH>
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$checkerDate_SummaryAudit"/>
            </a>
        </TH>
      </xsl:if>      
    </xsl:if>
  </xsl:template>
		<!-- end of Tmp_Summary_Audit.xsl -->
		<!-- start of Tmp_SummaryInput.xsl -->
<xsl:template name="typeHandler">
    <xsl:param name="fType"/>
    <xsl:param name="fldNode"/>
    <xsl:variable name="dbt" select="$fldNode/DBT"/>
    <xsl:variable name="dbc" select="$fldNode/DBC"/>
    <xsl:variable name="fldName" select="$fldNode/NAME"/>
    <div class="DIVText">
        <xsl:choose>
            <xsl:when test="$fType='AMOUNT' or $fType='DATE' or ($fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER'))">
                <xsl:call-template name="dispLabelHidden"/>
            </xsl:when>  
            <xsl:when test="$fType = 'CHECKBOX' or $fType = 'BUTTON'">
                <div class="DIVText"></div>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="dispLabelField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose> 
        
        <xsl:if test="($fType ='TEXT' and $fldNode/DTYPE != 'NUMERIC' and $fldNode/DTYPE != 'NUMBER') or $fType='AMOUNT' or $fType='DATE' or $fType='ACCOUNT' or $fType='BRANCH' or $fType='CURRENCY' or $fType='CUSTOMER' or $fType='MASK' or $fType='RESTRICTED_TEXT'">
            <xsl:call-template name="dispEntityField">
                <xsl:with-param name="EntityType" select="$fType"/>
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
            <xsl:call-template name="dispEntityField">
                <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'SELECT'">
            <xsl:call-template name="dispSelectField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'RADIO'">
            <xsl:call-template name="dispRadioToSelectField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'CHECKBOX'">
            <label class="LABELCheckSummary" style="float:left" for="">
            <xsl:call-template name="dispCheckboxField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
            <xsl:value-of select="$fldNode/LABEL"/>
            </label>
        </xsl:if>
        <xsl:if test="$fType = 'TEXTAREA'">
            <xsl:call-template name="dispTextareaField">
                <xsl:with-param name="position">column</xsl:with-param>
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'FILE'">
            <xsl:call-template name="dispFileField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'BUTTON'">
            <xsl:call-template name="dispButtonField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'HIDDEN'">
            <xsl:attribute name="CLASS">DispNone</xsl:attribute>
            <xsl:call-template name="dispHiddenField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if>
    </div>
</xsl:template>

	<!-- Generic Entity Handler -->
<xsl:template name="dispEntityField">
    
    <xsl:param name="EntityType" />
    <xsl:param name="dbt" />
    <xsl:param name="dbc" />
    <xsl:param name="fldName" />
    <xsl:param name="fldNode" />

    <!-- Call the appropriate template based on the entity --> 
    <xsl:choose>
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'ACCOUNT'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'BRANCH'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'CURRENCY'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:when test="$EntityType = 'CUSTOMER'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
	</xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
	</xsl:when>
        <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
            <xsl:call-template name="dispRestrictedTextField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
    
<!-- Takes care of features common in Amount Field of Absolute/Column Positioning -->
<xsl:template name="dispAmountField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <xsl:variable name="relFld" select="$fldNode/RELATED_FIELD"/>
    <xsl:variable name="relatedFld1">
        <xsl:if test="contains($relFld,'__')">
            <xsl:value-of select="substring-after($relFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($relFld,'__'))">
            <xsl:value-of select="$relFld"/>
        </xsl:if>
    </xsl:variable> 
    <xsl:variable name="relatedFld">
        <xsl:if test="contains($relatedFld1,'__')">
            <xsl:value-of select="substring-after($relatedFld1,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($relatedFld1,'__'))">
            <xsl:value-of select="$relatedFld1"/>
        </xsl:if>
    </xsl:variable> 
    
    <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
    </INPUT>
    
    <LABEL CLASS="LABELNormal" for=""><xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>
    <INPUT TYPE="TEXT" CLASS="TextAmount" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}')" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
    </xsl:call-template>
    
    <xsl:attribute name="style">
        <xsl:text>{text-align:</xsl:text>
        <xsl:text>right;}</xsl:text>
    </xsl:attribute>
    
    <xsl:attribute name="MIN_VAL">
        <xsl:value-of select="$fldNode/MIN_VAL"/>
    </xsl:attribute>
    <xsl:attribute name="MAX_VAL">
        <xsl:value-of select="$fldNode/MAX_VAL"/>
    </xsl:attribute>
    
    <xsl:if test="$fldNode/MIN_VAL != '' and $fldNode/MAX_VAL != ''">
        <xsl:attribute name = "onblur">
            <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute>
    </xsl:if>
    </INPUT>
    
    <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
    </xsl:call-template>
    
</xsl:template>


<!-- Takes care of features common in Date Field of Absolute/Column Positioning -->
<xsl:template name="dispDateField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <xsl:variable name="refFld" select="$fldNode/REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
    </xsl:variable>
    
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
    </INPUT>
    <LABEL CLASS="LABELNormal" for=""><xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>
    <INPUT TYPE="TEXT" CLASS="TextDate"  onactivate="acceptInputDate('{$fldNode/NAME}')" onbeforedeactivate="validateInputDate('{$fldNode/NAME}')" >
        <xsl:call-template name="ATTR_InputEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
        <xsl:if test="$refFld !=''">
            <xsl:attribute name="REF_FIELD">
                <xsl:if test="contains($referFld,'__')">
                    <xsl:value-of select="substring-after($referFld,'__')"/>
                </xsl:if>
                <xsl:if test="not(contains($referFld,'__'))">
                    <xsl:value-of select="$referFld"/>
                </xsl:if>
            </xsl:attribute>
        </xsl:if>
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" onclick="disp_cal('{$fldNode/NAME}', event)" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/calendar.gif" ALT="{$calendar_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    
</xsl:template>

<xsl:template name="dispNumberField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
        <xsl:with-param name="curr_fld" select="$fldNode"/>
    </xsl:call-template>
    </INPUT>
    <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
    <LABEL CLASS="LABELNormal" for=""><xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>
    <input type="text" class="TXTstd numeric" onblur="validateInputNumber(this)">
        <xsl:call-template name="ATTR_InputEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
        <xsl:if test="normalize-space($fldNode/MIN_VAL) != ''">
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$fldNode/MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space($fldNode/MAX_VAL) != ''">        
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$fldNode/MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space($fldNode/MAX_DECIMALS) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="$fldNode/MAX_DECIMALS"/>
            </xsl:attribute>
        </xsl:if>
    </input>
    <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
    </xsl:call-template>
</xsl:template>


<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispMaskField">
    
    <xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
    </INPUT>
    <INPUT TYPE="TEXT" CLASS="TextNormal" mask="{$fldNode/MASK}" onactivate="acceptInputValue('{$fldNode/NAME}')" onbeforedeactivate="validateInputValue('{$fldNode/NAME}');">
        <xsl:call-template name="ATTR_InputEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
    </INPUT>
</xsl:template>

<!-- Takes care of features common in RestrictedText Field of Absolute/Column Positioning -->
<xsl:template name="dispRestrictedTextField">
    
    <xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <INPUT TYPE="TEXT" CLASS="TextNormal" onblur="validateRestrictedTextValue(this)">
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
        
        <xsl:if test="$fldNode/TYPE='RESTRICTEED_TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
            <xsl:attribute name="style">
                <xsl:text>{text-align:right;}</xsl:text>
            </xsl:attribute>
        </xsl:if>
        
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                <xsl:value-of select="$fldNode/MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                <xsl:value-of select="$fldNode/SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <xsl:if test="(count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER')">
            <xsl:attribute name="onFocusOut">fnToUppercase(this,event)</xsl:attribute> 
        </xsl:if>
        </INPUT>
        
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>
        
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" >
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" alt="{$narrative_SummaryAudit}"/>
                </BUTTON>
            </xsl:if>
        </xsl:if>
    
</xsl:template>

<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispTextField">
    <xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <INPUT TYPE="TEXT" CLASS="TextNormal" >
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
    
    <xsl:if test="$fldNode/TYPE='TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
        <xsl:attribute name="style">
            <xsl:text>{text-align:right;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
    <!-- Set the maximum number of characters user can enter -->
    <xsl:attribute name="MAXLENGTH">
        <xsl:if test="count($fldNode/MAXLENGTH) != 0">
            <xsl:value-of select="$fldNode/MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count($fldNode/MAXLENGTH) = 0">
            <xsl:value-of select="$fldNode/SIZE" />
        </xsl:if>
    </xsl:attribute>
    
    <xsl:if test="(count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER')">
        <xsl:attribute name="onFocusOut">fnToUppercase(this,event)</xsl:attribute>       
    </xsl:if>
      <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
      </xsl:if>
    </INPUT>
    <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>

    <xsl:if test="count($fldNode/LOV) = 0 ">
        <xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" >
                <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" alt="{$narrative_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    
    <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
    <xsl:if test="count($fldNode/POPUPEDIT) = 0" >
        <xsl:if test="number($fldNode/SIZE) &gt; 25">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" >
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" alt="{$narrative_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>

</xsl:template>


<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispSelectField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    
    <SELECT CLASS="SELECTNormal">
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of>
        </xsl:attribute>
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
        <xsl:attribute name="title">
            <xsl:value-of select="$fldNode/LABEL"/>
        </xsl:attribute>
        
        <xsl:if test="count($fldNode/WIDTH) &gt; 0">
            <xsl:attribute name="STYLE">
                <xsl:text>{width:</xsl:text>
                <xsl:value-of select="$fldNode/WIDTH"/>
                <xsl:text>;}</xsl:text>
            </xsl:attribute>
        </xsl:if> 
        
        <xsl:for-each select="$fldNode/OPTION">
            <OPTION VALUE="{@VALUE}">
                <xsl:if test="(@VALUE)=''">
                    <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                    <xsl:attribute name="DEFAULT"><xsl:value-of select="@VALUE"/></xsl:attribute>
                </xsl:if>
                <xsl:value-of select="."/>
            </OPTION>
        </xsl:for-each>
    </SELECT>
</xsl:template>

<!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
<xsl:template name="dispCheckboxField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <INPUT TYPE="CHECKBOX" DBC ="{$dbc}" DBT = "{$dbt}" NAME = "{$fldName}" OnClick="fnVisited(this)">
        <xsl:attribute name="VISITED">N</xsl:attribute> 
        <xsl:if test="count($fldNode/CHECKED) &gt; 0 and $fldNode/CHECKED = -1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
        </xsl:if>

        <xsl:if test = "count($fldNode/CUSTOM) &gt; 0">
            <xsl:attribute name = "ON">
                <xsl:value-of select = "$fldNode/CUSTOM/ON"/>
            </xsl:attribute>
            <xsl:attribute name = "OFF">
                <xsl:value-of select = "$fldNode/CUSTOM/OFF"/>
            </xsl:attribute>                
        </xsl:if> 
    </INPUT>
</xsl:template>
	

	<!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
<xsl:template name="dispTextareaField">
    <xsl:param name="position" select="."/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <TEXTAREA CLASS="TEXTAREASmall">
    <xsl:call-template name="ATTR_Handler">
        <xsl:with-param name="curr_fld" select="$fldNode" /> 
        <xsl:with-param name="curr_fld_dbt" select="$dbt" />
        <xsl:with-param name="curr_fld_dbc" select="$dbc" />
        <xsl:with-param name="curr_fld_name" select="$fldName" />
    </xsl:call-template>
    <xsl:if test="$position = 'absolute'">                     
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
            <xsl:value-of select="$fldNode/WIDTH"/>
            <xsl:text>px;height:</xsl:text>
            <xsl:value-of select="$fldNode/HEIGHT"/>
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    </TEXTAREA>

    <xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
        <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" >
            <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
            <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" alt="{$narrative_SummaryAudit}"/>
        </BUTTON>
    </xsl:if>
</xsl:template>


<!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
<xsl:template name="dispFileField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <INPUT TYPE="File" CLASS="TextFile" >
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
    </INPUT>
</xsl:template>


<!-- Display Date attribute handler -->
<xsl:template name="ATTR_InputEntity_Handler">
    <xsl:param name="curr_fld" select="." />

    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>

    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>

    <xsl:attribute name="SIZE">
    <xsl:value-of select="$curr_fld/SIZE" />
    </xsl:attribute>


    <xsl:attribute name="MAXLENGTH">
        <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
            <xsl:value-of select="$curr_fld/MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
            <xsl:if test="count($curr_fld/SIZE) != 0">
                <xsl:value-of select="$curr_fld/SIZE" />
            </xsl:if>
            <xsl:if test="count($curr_fld/SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                <xsl:text>16</xsl:text>
            </xsl:if>
        </xsl:if>
    </xsl:attribute>

    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>

    <xsl:apply-templates select="$curr_fld/EVENT"/>
</xsl:template>

<!-- Hidden Date Handler -->
<xsl:template name="ATTR_HiddenEntity_Handler">
    <xsl:param name="curr_fld" select="." />

    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="DBT">
        <xsl:value-of select="$curr_fld/DBT" />
    </xsl:attribute>
    <xsl:attribute name="DBC">
        <xsl:value-of select="$curr_fld/DBC" />
    </xsl:attribute>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
    </xsl:attribute>
    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQUIRED" />
    </xsl:attribute>
    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="$refFld != ''">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
    </xsl:variable>
    <xsl:if test="$refFld != ''">
        <xsl:attribute name="REF_FIELD">
            <xsl:if test="contains($referFld,'__')">
                <xsl:value-of select="substring-after($referFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($referFld,'__'))">
                <xsl:value-of select="$referFld"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates select="$curr_fld/CUSTOM"/>
</xsl:template>
    
    
<!-- Handler for Required Flag -->
<xsl:template name="RequiredFieldHandler">
    <xsl:param name="curr_fld" select="." />
    <img src="{$imgPath_XSL}/star_disabled.gif" ALT=""/>
</xsl:template>
    
<xsl:template name="LovHandler">
    <xsl:param name="curr_fld" />
    <xsl:param name="EntityType" />
    
    <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count($curr_fld/LOV) &gt; 0 and (count($curr_fld/READ_ONLY) = 0 or $curr_fld/READ_ONLY = 0)">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                    <xsl:attribute name="READONLY">-1</xsl:attribute>
                </xsl:if>
                <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
                    <xsl:attribute name="READONLY">-1</xsl:attribute>
                </xsl:if>
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="$Brn_Neo = ''">
        <!--<xsl:if test="count($curr_fld/LOV) &gt; 0 "> if $curr_fld/TYPE = TEXT-->
        <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT'" >
            <BUTTON CLASS="BUTTONInline"  tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnBuildSummaryLOV('</xsl:text>
                    <xsl:value-of select="$curr_fld/DBT"/>
                    <xsl:text>.</xsl:text>
                    <xsl:value-of select="$curr_fld/DBC"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="$curr_fld/LABEL"/>
                    </xsl:call-template>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="$curr_fld/DTYPE"/>
                    <xsl:text>', event)</xsl:text>                    
                </xsl:attribute>
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
       <!-- </xsl:if>-->
    </xsl:if>    
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>
</xsl:template>


<!-- Handler for POPUP Editor -->
<xsl:template name="Popup_Handler">
    <xsl:param name="fldNode"/>
    <xsl:attribute name="ONCLICK">
        <xsl:text>show_editor('</xsl:text><xsl:value-of select="$fldNode/NAME"/><xsl:text>','</xsl:text>
        <xsl:if test="count($fldNode/MAXLENGTH) != 0">
            <xsl:value-of select="$fldNode/MAXLENGTH" />
        </xsl:if>

        <xsl:if test="count($fldNode/MAXLENGTH) = 0">
            <xsl:value-of select="$fldNode/SIZE" />
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) =''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="$fldNode/LABEL"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) !=''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="$fldNode/POPUPEDIT/TITLE"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="$fldNode/POPUPEDIT/OK_LABEL"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="$fldNode/POPUPEDIT/CANCEL_LABEL"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="$fldNode/POPUPEDIT/OK_IMG_SRC" />
        <xsl:text>','</xsl:text>
        <xsl:value-of select="$fldNode/POPUPEDIT/CANCEL_IMG_SRC" />
        <xsl:text>');</xsl:text>
    </xsl:attribute>
</xsl:template>

<xsl:template name="replaceApos">
    <xsl:param name="inputString"/>
    <xsl:variable name="apos" select='"&apos;"'/>
    <xsl:choose>
        <xsl:when test="contains($inputString,$apos)">
            <xsl:value-of select="substring-before($inputString,$apos)"/>
            <xsl:text>\'</xsl:text>
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="substring-after($inputString,$apos)"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="$inputString"/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
    
<xsl:template name="UPPERCASE">
    <xsl:param name="event_func" select="." />
        <xsl:attribute name="onChange" >
            <xsl:value-of select="$event_func" />
        </xsl:attribute>   	            
</xsl:template>


<xsl:template name="ATTR_Handler">
    <xsl:param name="curr_fld" select="." />
    <xsl:param name="curr_fld_dbt"/>
    <xsl:param name="curr_fld_dbc"/>
    <xsl:param name="curr_fld_name"/>

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LABEL"/>
    </xsl:attribute>
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LABEL"/>
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:if test="count($curr_fld/DBT) &gt; 0">
            <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
        </xsl:if>
        <xsl:if test="count($curr_fld_name/DBT) &lt; 1">
            <xsl:value-of select="concat($curr_fld_name/DBT,'__',$curr_fld/DBC)" />
        </xsl:if>
    </xsl:attribute>
    <xsl:attribute name="DBT">
        <xsl:value-of select="$curr_fld_dbt" />
    </xsl:attribute>
    <xsl:attribute name="DBC">
        <xsl:value-of select="$curr_fld_dbc" />
    </xsl:attribute>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld_name" />
    </xsl:attribute>
    <xsl:attribute name="DTYPE">
        <xsl:value-of select="$curr_fld/DTYPE" />
    </xsl:attribute>

    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    
<!-- Added By Murali, assigning the text field size to 25 & adding popup button-->
        <xsl:if test="number($curr_fld/SIZE) &gt; 23">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="23" />
        </xsl:attribute>
        </xsl:if>
        <xsl:if test="number($curr_fld/SIZE) &lt; 23">
            <xsl:attribute name="SIZE">
                <xsl:value-of select="$curr_fld/SIZE" />
            </xsl:attribute>
        </xsl:if>
        
    
    <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
        <xsl:attribute name="ROWS"><xsl:value-of select="$curr_fld/ROWS"/></xsl:attribute>
        <xsl:attribute name="COLS"><xsl:value-of select="$curr_fld/COLS"/></xsl:attribute>            
    </xsl:if>
    
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>

    <xsl:apply-templates select="$curr_fld/EVENT"/>
    <xsl:apply-templates select="$curr_fld/CUSTOM"/>

    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQUIRED" />
    </xsl:attribute>

    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="$refFld != ''">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
    </xsl:variable>
    <xsl:if test="$refFld != ''">
        <xsl:attribute name="REF_FIELD">
            <xsl:if test="contains($referFld,'__')">
                <xsl:value-of select="substring-after($referFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($referFld,'__'))">
                <xsl:value-of select="$referFld"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>

    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="CLASS">hidden</xsl:attribute>
    </xsl:if>

    <xsl:if test="count($curr_fld/AMENDABLE) &gt; 0">
        <xsl:attribute name="AMENDABLE">
            <xsl:value-of select="$curr_fld/AMENDABLE"/>
        </xsl:attribute>
    </xsl:if>

    <xsl:if test="count($curr_fld/SUBSYSTEM) &gt; 0">
        <xsl:attribute name="SUBSYSTEM">
            <xsl:value-of select="$curr_fld/SUBSYSTEM"/>
        </xsl:attribute>
    </xsl:if>

    <xsl:if test="$curr_fld/TYPE != 'AMOUNT' and $curr_fld/DTYPE = 'NUMBER'">
        <xsl:attribute name="MIN_VAL">
            <xsl:value-of select="$curr_fld/MIN_VAL"/>
        </xsl:attribute>
        <xsl:attribute name="MAX_VAL">
            <xsl:value-of select="$curr_fld/MAX_VAL"/>
        </xsl:attribute>
        <xsl:attribute name="MAX_DECIMALS">
            <xsl:value-of select="$curr_fld/MAX_DECIMAL"/>
        </xsl:attribute>
        <xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for readonly & disable-->
    <!--
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="READONLY">true</xsl:attribute>
        <xsl:attribute name="class">TextReadonly</xsl:attribute>
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() = 'DATE']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: left;</xsl:text>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: right;</xsl:text>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="$curr_fld/TYPE[text() = 'MASK']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: left;</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TextDisabled</xsl:attribute>
    </xsl:if>
    -->
</xsl:template>

<!-- Handler for Events -->
<xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
        <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
    
<!-- Handler for Custom Attributes -->
<xsl:template match="CUSTOM">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>

<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
<xsl:template name="dispButtonField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    
    <BUTTON CLASS="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'">
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
        <xsl:value-of select="$fldNode/LABEL" />
        <xsl:if test="count($fldNode/SRC) &gt; 0">
            <!-- Display Image -->
            <IMG id="{$fldNode/NAME}_IMG" SRC="{$fldNode/SRC}" ALT="">
            <xsl:if test="count($fldNode/ALT) &gt; 0">
                <xsl:attribute name="ALT">
                    <xsl:value-of select="$fldNode/ALT" />
                </xsl:attribute>
            </xsl:if>
            </IMG>
        </xsl:if>        
    </BUTTON>
</xsl:template>

<xsl:template name="dispRadioField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <xsl:variable name = "Left_or_Right" select = "$fldNode/@COL"/>
    <xsl:variable name="radioColSpan" select = "count($fldNode/OPTION)"/>
    <FIELDSET class="FieldsetNormal">
        <legend><b><xsl:call-template name="dispLabelField"/></b></legend>
        <table summary="" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;width:77%;">                                           
            <xsl:if test = "$Left_or_Right ='1'">
                <xsl:attribute name = "style">
                    <xsl:value-of select = "'table-layout:fixed;width:79%;'"/>
                </xsl:attribute>
            </xsl:if> 
            
            <xsl:for-each select="$fldNode/OPTION[@COL=1]">
                <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                <xsl:variable name="row" select="@ROW"/>
                <tr>
                    <xsl:apply-templates select="$fldNode/OPTION[@ROW = $row]" mode="column">
                        <xsl:with-param name = "radioColSpan" select = "$radioColSpan"/>
                        <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                    </xsl:apply-templates>
                </tr>
            </xsl:for-each>
        </table>
    </FIELDSET>
</xsl:template>
<!--radio option handler-->
<xsl:template match="OPTION" mode="column">
    <xsl:param name = "radioColSpan" select = "."/>
    <xsl:param name = "Left_or_Right" select = "."/>

    <td WIDTH = "*" ></td>              
    <td  align="left">      
        <xsl:if test = "$Left_or_Right ='1'">
            <xsl:attribute name = "align">
                <xsl:value-of select = "'center'"/>
            </xsl:attribute>
        </xsl:if> 
        <LABEL for="">
            <INPUT TYPE="RADIO" CLASS="INPUTRadio">
                <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
                <xsl:if test="count(SELECTED) &gt; 0 and SELECTED='-1'">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                </xsl:if>
            </INPUT>
            <xsl:value-of select="LABEL"/>
        </LABEL>
    </td>   
</xsl:template>
   
<xsl:template name="dispHiddenField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <INPUT TYPE="HIDDEN">
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
    </INPUT>
</xsl:template>
   
<xsl:template name="dispRadioToSelectField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <SELECT CLASS="SELECTNormal">
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($dbt,'__',$dbc)">
            </xsl:value-of>
        </xsl:attribute>
        <xsl:call-template name="ATTR_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="curr_fld_dbt" select="$dbt" />
            <xsl:with-param name="curr_fld_dbc" select="$dbc" />
            <xsl:with-param name="curr_fld_name" select="$fldName" />
        </xsl:call-template>
        <xsl:attribute name="title">
            <xsl:value-of select="$fldNode/LABEL"/>
        </xsl:attribute>
        <OPTION VALUE=""></OPTION>
        <xsl:for-each select="$fldNode/OPTION">
            <OPTION VALUE="{VALUE}">
                <xsl:if test="@VALUE = ''">
                    <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                </xsl:if> 
                <xsl:value-of select="LABEL"/>
            </OPTION>
        </xsl:for-each>
    </SELECT>      
</xsl:template>
		<!-- end of Tmp_SummaryInput.xsl -->
		<!-- start of Tmp_SummaryCore.xsl -->
<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
<xsl:template name="dispLabelField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

    <LABEL CLASS="LABELNormal" for=""><xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>
</xsl:template>

<xsl:template name="dispLabelHidden">
    <LABEL CLASS="LBLinv"></LABEL>
</xsl:template>

<xsl:template name="dispLabelCaption">
    <xsl:param name="curr_fld" select="." />
    
    <!-- Labels with Access Key are being underlined -->
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and contains($curr_fld/LABEL , $curr_fld/ACCESSKEY)">
        <xsl:value-of select="substring-before($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
        <U>
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </U>
        <xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or not(contains($curr_fld/LABEL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LABEL" />
    </xsl:if>
    
    <!-- if no label is present , keep &nbsp to complete the TD. !-->
    <xsl:if test="$curr_fld/LABEL = ''">
        <xsl:text disable-output-escaping="yes"></xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template name="ATTR_Handler_lbs">
    <xsl:param name="curr_fld" select="." />
    
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="CLASS">hidden</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
</xsl:template>


<!-- Handler for Events -->
<xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
        <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
    
<!-- Handler for Custom Attributes -->
<xsl:template match="CUSTOM">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>
		<!-- end of Tmp_SummaryCore.xsl -->
</xsl:stylesheet>
