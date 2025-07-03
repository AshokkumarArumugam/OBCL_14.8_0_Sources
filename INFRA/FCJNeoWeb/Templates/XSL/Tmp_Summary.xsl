<?xml version="1.0"?>
<!--
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 08-May-2023
**  Change Description   : Check box values not displaying properly
**  Search String        : REDWOOD_35239225
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!--
       <xsl:import href="Tmp_Labels.xsl"/>       
       <xsl:import href="Tmp_Summary_Audit.xsl" />       
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
       <xsl:param name="mediumScreenWidth"/><!-- 12.1 screen height change -->
	   <xsl:variable name ="screenWidth">
		    <xsl:value-of select="number($mediumScreenWidth)"></xsl:value-of>
	   </xsl:variable>
	   <xsl:variable name ="labelWidth">
		    <xsl:value-of select="0.40 * (number($screenWidth) div 2) "></xsl:value-of>
	   </xsl:variable><!-- 12.1 screen height change -->
        <!-- bug id 14842317 change starts  -->
    
   <!-- bug id 14842317 change ends  -->
       <xsl:param name="oldTheme"/>
        <!--For export option in the summary screen-->
       <xsl:param name="exportReq"/>
       <xsl:param name="imgPath"/>
       <xsl:param name="dateFormat"/>
       <xsl:param name="functionId"/>
        <xsl:param name="uiXML"/>
    <xsl:variable name="uixml">
        <xsl:if test="$uiXML != ''">
            <xsl:value-of select="$uiXML"/>
        </xsl:if>
        <xsl:if test="$uiXML = ''">
            <xsl:value-of select="$functionId"/>
        </xsl:if>
    </xsl:variable>
       <xsl:param name="select_all_rows"/>
	   <xsl:param name="dateDelimiterReqd"/> <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes-->
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
       <!-- Main template1 -->
        <xsl:template match="/">
        <div class="oj-flex-bar">
    <div class="oj-flex-bar-start">
       <!--<div class="DIVHeaderBodyContainer" style="overflow:auto" id = "DIVMainTmp">
	<div class="DIVTwoColSectionContainer" id = "ScrollYes" style="overflow-x:hidden; overflow-y:auto;">  -->
    <oj-conveyor-belt id="toolbarSummary" class="convyorBeltContainer oj-sm-margin-2x-vertical">
            <!-- <div id="toolbarSummary" class="DIVnav" style="display: block;"> -->
            <oj-button chroming="borderless"  id="SaveCriteria" name="SaveCriteria" style="display: none;"  on-oj-action="[[fnOpenCriteriaScr.bind(null)]]">
                        <xsl:value-of select="$saveCriteria_SummaryAudit"/> 
                        <span slot='startIcon' class="oj-ux-ico-save"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="SavedQry" name="SavedQry" style="display: flex; "  on-oj-action="[[fnQueryCriteria.bind(null,'QUERYCRITERIA',event)]]">
                         <xsl:value-of select="$savedQry_SummaryAudit"/>
                         <span slot='startIcon' class="oj-ux-ico-save-as"></span>
                    </oj-button> 
                     <!--<oj-button chroming="borderless"  id="Export" name="Export" style="display: none;"  on-oj-action="[[fnExportToExcel(null)]]">
                        <xsl:value-of select="$export_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-export-excel-data"></span>
                    </oj-button>--> 
                     <oj-button chroming="borderless" id="Search" name="Search" on-oj-action="[[fnExecuteQuery_sum.bind(null,event)]]" style="display: flex;">
                         <xsl:value-of select="$search_SummaryAudit"/>
                         <span slot='startIcon' class="oj-ux-ico-create-options"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="AdvSearch" name="AdvSearch" style="display: flex;"  on-oj-action="[[fnOpenAdvanced.bind(null)]]">
                        <xsl:value-of select="$advanced_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-content-item-search"></span>
                    </oj-button>
                     <oj-button chroming="borderless"  id="ResetQry" name="ResetQry" style="display: flex;" on-oj-action="[[fnResetQry.bind(event)]]" >
                        <xsl:value-of select="$reset_SummaryAudit"/>
                       <span slot='startIcon' class="oj-ux-ico-reset-variable"></span>
                    </oj-button> 
                 </oj-conveyor-belt>
        </div>
        <div class="oj-flex-bar-end ">
                <oj-label-value label-edge="start" label-width="{$labelWidth}px" class="oj-sm-margin-top-2x" >
                
                <oj-label  slot="label"  style="width:{$labelWidth}px;" title="{$recordsPerPage_SummaryAudit}" for="">
                <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                
                </oj-label> 
                <!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--> 
               <oj-select-single  slot="value" name="Records"  style="width:100px;padding-top:5px;padding-right:25px"  >
                <xsl:attribute name="value">
                    <xsl:text>[[recordsPerPage]]</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="data">
                    <xsl:text>{{recordsPerPageDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
                
                </oj-label-value>
                </div>
                </div>
        
        <div id="ScrollYes">
            <div id="PageHead">
            <div id="TblQuery">
               <xsl:call-template name="QueryContent"/>
            </div>

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
                <div  id="ScrollNo" class="DIVfooter">
                    <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
                    
                    <xsl:call-template name="Sum_Custom_Btn"/>
                    <!--<div class="DIVAudit" id="DIVAudit">
                        <xsl:call-template name="Sum_Custom_Btn"/>
                    </div>-->
                </div>                                    
              <xsl:call-template name="generateScript"> 
              </xsl:call-template> 
        </xsl:template>
        
        <xsl:template name="Sum_Custom_Btn">
        <div class="convyorBeltContainer">
                <!--30620131 Added id attribute to ul-->
                <div class="oj-flex-bar oj-sm-align-items-center">
                 <xsl:if test="(//FORM/SUMMARY/TYPE = 'B' or //FORM/SUMMARY/TYPE = 'Q' or //FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) > 0)">
					<xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
					<xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>
                <oj-conveyor-belt id="subSystemConveyorBelt" class="oj-sm-padding-4x-start oj-md-9 oj-sm-12 oj-flex-bar-start" arrow-visibility="visible" data-oj-binding-provider="none">
				
                   <xsl:for-each select="//SUMBUTTONS/BUTTON">
				   <xsl:variable name="custlbl" select="BUTTON_LABEL"/>
				            <oj-button class="conveyorBeltItem oj-sm-margin-1x" id="{@id}" label="{$custlbl}" >
							<xsl:if test="BUTTON_EVENT != ''">
										<xsl:attribute name="onclick">
											<xsl:value-of select="BUTTON_EVENT"/>
										</xsl:attribute>
									</xsl:if>
                                <span onkeydown="return fnhandleSubScrBtn(event)">
								<xsl:value-of select="BUTTON_LBL"/>								
                                </span>
								
                            </oj-button>
                </xsl:for-each>
                </oj-conveyor-belt>
                </xsl:if>
                <div class="footer-btn-container oj-flex-bar-end">
                     <xsl:call-template name="disp_Exit_Btn"/>
                </div>
                </div>
         
        </div>

    
    </xsl:template>

        <xsl:template name="QueryContent">   
        <xsl:if test="count(@CRITERIA_SRCH)= 0 or @CRITERIA_SRCH = 'N'">
        <oj-collapsible class="oj-sm-margin-1x-horizontal oj-sm-padding-4x-start" expand-area="header" expanded="true" id="queryCollapsible">
             <h4 slot="header">
               <xsl:value-of select="$search_SummaryAudit"/> <xsl:text> (</xsl:text>  <xsl:value-of select="$search_CaseSensitive"/><xsl:text>) </xsl:text>
             
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblOptionlQuery">    
                    <div class="partitionPanel oj-flex">
                    <xsl:call-template name="DIVThreeColSectionHandler">
                         <xsl:with-param name="currNode" select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE"/>
                    </xsl:call-template>                        
                </div>            
                </div>  
                </oj-collapsible>
        </xsl:if>
        <!--<div id="DIVQuery">
            <TABLE id="TblQuery" cellspacing="0" cellpadding="0" border="0" width="99%" summary="{$summary}">
                <TBODY>-->
              <!-- bug id 14842317 change starts  --><!--
        <xsl:if test="count(@CRITERIA_SRCH) &gt; 0 and @CRITERIA_SRCH = 'Y'">
            <fieldset class="FSTdlg">
                <legend><xsl:value-of select="$recommended_field"/></legend>
                <div class="DIVThreeColSectionContainer" id="TblRcmndedQuery">
                    <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)&gt;0 and MIN_CHAR!=''])"/>
                    <xsl:if test="$no_Of_flds > 0">
                        <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN' and (count(MIN_CHAR)&gt;0 and MIN_CHAR!='')]/TYPE"/>
                        </xsl:call-template>
                    </xsl:if>                    
                </div>
            </fieldset>
            <fieldset class="FSTdlg">
                <legend><xsl:value-of select="$optional_field "/></legend>
                <div class="DIVThreeColSectionContainer" id="TblOptionlQuery">    
                    <xsl:variable name="NoOfFlds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)= 0 or MIN_CHAR=''])"/>
                    <xsl:if test="$NoOfFlds > 0">                        
                        <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'and (count(MIN_CHAR)= 0 or MIN_CHAR='')]/TYPE"/>
                        </xsl:call-template>                        
                    </xsl:if>                    
                </div>            
            </fieldset>
        </xsl:if>-->
			  <!-- bug id 14842317 change ends  -->
              <xsl:variable name="noOfRows" select="//SUMBUTTONS/BUTTON_ROWS"></xsl:variable>   
              <!--<div class="DIVbar1" id ="button_row">             
                    <BUTTON class="BTNhide" NAME = "Export" title="{$exp_SummaryAudit}" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnExportToExcel()" onkeydown="return fnhandleSubScrBtn(event)">            
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <xsl:value-of select="$exp_SummaryAudit"/>
                     </BUTTON>
                     <BUTTON class="BTNtext" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" title="{$search_SummaryAudit}" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnExecuteQuery(event)" onkeydown="return fnhandleSubScrBtn(event)" >
                       <span class="ICOsearch">
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <span class = "LBLinv"><xsl:value-of select = "$search_SummaryAudit"/></span>
                        </span>         
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <xsl:value-of select="$search_SummaryAudit"/>
                     </BUTTON>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <BUTTON class="BTNtext" title="{$advanced_SummaryAudit}"  onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnOpenAdvanced()" onkeydown="return fnhandleSubScrBtn(event)">
                        <xsl:value-of select="$advanced_SummaryAudit"/>
                     </BUTTON>  
                     
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     <BUTTON class="BTNtext" title="{$reset_SummaryAudit}" onblur="this.className='BTNtext'" onmouseover="this.className='BTNtextH'" onfocus="this.className='BTNtextH'" onmouseout="this.className='BTNtext'" onclick="fnResetQry(event)" onkeydown="return fnhandleSubScrBtn(event)">
                        <xsl:value-of select="$reset_SummaryAudit"/>
                     </BUTTON>     
                </div>
            -->
       </xsl:template>

       <xsl:template name="DIVThreeColSectionHandler">   
        <xsl:param name="currNode"/>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
            <xsl:call-template name="AuditFields">
                                                    <xsl:with-param name="fromQry" select="'Y'"/>
                                                    <xsl:with-param name="DBT" select="$currNode[1]/../DBT"/>
                                                    <xsl:with-param name="auditField" select="'AUTH_STAT'"/>
                                                </xsl:call-template>
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../DBT"/>
                    <xsl:variable name="dbc" select="../DBC"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <!--<xsl:if test="$pos mod 3 = 1"> -->
                    
                     <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                     <xsl:if test="$pos mod 3 = 2">
                                                <xsl:call-template name="typeHandler">
                                                    <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                                </xsl:call-template>
                                                </xsl:if>
                                                
                                            </xsl:if>
                                            <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                            <xsl:if test="$pos mod 3 = 1">
                                                <xsl:call-template name="typeHandler">
                                                   <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select=".."/>
                                                </xsl:call-template>
                                                </xsl:if>
                                            </xsl:if>
                    <!-- </xsl:if> -->
                 </xsl:for-each>
                 </oj-form-layout>
            </fieldset>
        </div>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
            <xsl:call-template name="AuditFields">
                                                    <xsl:with-param name="fromQry" select="'Y'"/>
                                                    <xsl:with-param name="DBT" select="$currNode[1]/../DBT"/>
                                                    <xsl:with-param name="auditField" select="'RECORD_STAT'"/>
                                                </xsl:call-template>
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../DBT"/>
                    <xsl:variable name="dbc" select="../DBC"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                   <!-- <xsl:if test="$pos mod 3 = 2"> -->
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                        <xsl:if test="$pos mod 3 = 0">
                                                <xsl:call-template name="typeHandler">
                                                    <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                                </xsl:call-template>
                                                </xsl:if>
                                            </xsl:if>
                                            <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                            <xsl:if test="$pos mod 3 = 2">
                                                <xsl:call-template name="typeHandler">
                                                    <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select=".."/>
                                                </xsl:call-template>
                                                </xsl:if>
                                            </xsl:if>
                    <!-- </xsl:if> -->
                 </xsl:for-each>
                 </oj-form-layout>
            </fieldset>
        </div>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../DBT"/>
                    <xsl:variable name="dbc" select="../DBC"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <!-- <xsl:if test="$pos mod 3 = 0"> -->
                       <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                       <xsl:if test="$pos mod 3 = 1">
                                                <xsl:call-template name="typeHandler">
                                                    <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                                </xsl:call-template>
                                                </xsl:if>
                                            </xsl:if>
                                            <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                            <xsl:if test="$pos mod 3 = 0">
                                                <xsl:call-template name="typeHandler">
                                                    <xsl:with-param name="fType" select="."/>
                                                    <xsl:with-param name="fldNode" select=".."/>
                                                </xsl:call-template>
                                                </xsl:if>
                                            </xsl:if>
                    <!--</xsl:if> -->
                 </xsl:for-each>
                 </oj-form-layout>
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
    </xsl:template>
       <xsl:template name="generateScript">
        <script type="text/javascript" DEFER="DEFER">
          gscrPos = "<xsl:value-of select="$gPosition"/>";      
          var imgpath = "<xsl:value-of select="$imgPath_XSL"/>";
          l_tmp_scr_type = "medium";
          <xsl:if test="count(//SUMMARY[@TMP_SCR_TYPE]) &gt; 0 and //SUMMARY[@TMP_SCR_TYPE = 'large']">
            l_tmp_scr_type = "large";
          </xsl:if>
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
                <xsl:value-of select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
            <xsl:variable name="vam">
                <xsl:value-of select="//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[1]/DBT"/>
            </xsl:variable>
             <xsl:call-template name="generateMEHeaderScript">
                <xsl:with-param name="multipleEntryNode" select="//SUMBLOCK[@TABPAGE = 'RESULT']"/>
                
         </xsl:call-template>
            <div class="oj-sm-margin-1x-horizontal oj-sm-padding-4x-start">
            <div class="oj-sm-width-full sectionPanel">
            <div class="partitionPanel">
            <fieldset class="oj-sm-padding-2x-top">
            <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
             
            <div id="summaryDataContainer">
            <div id="auditLegend">
               <xsl:call-template name="Audit_Legends"/>
            </div>
            <div id="Table_NavOptions" class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-2x-start oj-sm-margin-4x-end" onkeydown="return handleSumkeys(event)"><!--HTML5 Changes-->
                <div class="oj-flex-bar-start">
                
             <h4 slot="header">
                <xsl:value-of select="$search_results"/>
             </h4>

                 <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px" >
                
                <oj-label  slot="label"   title="{$lockColumns}" for="">
                <xsl:value-of select="$search_results"/>
                
                </oj-label> 
                
                </oj-label-value>-->
                <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                <oj-label  slot="label"   title="{$lockColumns}" for="">
                <xsl:value-of select="$lockColumns"/>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </oj-label> 
                --><!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--><!-- 
               <oj-select-single slot="value" name="Locks" style="width:100px"  on-value-changed="[[lockColumnChangedHandler]]" tableName ="{SUMMARY_DATA_BLK}" >
                <xsl:attribute name="value">
                    <xsl:text>[[lockColumn]]</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="data">
                    <xsl:text>{{lockColumnDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
              </oj-label-value>-->
               
                <!-- 12.1 summary performance changes new start -->
                </div>
                <div class="oj-flex-bar-end">
                <!--<div id="nav1" style="display:flex;">
                    <div class="oj-pagingcontrol-nav-input-section">               
                        <oj-label for="goto"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$page_SummaryAudit"/>&#160;</oj-label>                
                        <oj-input-text id="goto"  class="oj-sm-align-items-center" size="1" value="1" onChange="goToPage(event)" title="{$gotoPage_SummaryAudit}"></oj-input-text>
                        <oj-label id="ofLabel"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$of_SummaryAudit"/>&#160;</oj-label>
                        <oj-label id="TotPgCnt"  class="oj-sm-align-items-center" name="TotPgCnt">1</oj-label>                
                    </div>
                    <oj-button  slot="end"  display="icons" chroming="borderless" title="{$first_SummaryAudit}" name="navFirst" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_FIRST, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
                    <oj-button  slot="end"  display="icons" chroming="borderless" title="{$previous_SummaryAudit}" name="navPrev" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_PREVIOUS, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                    <div class="oj-flex oj-sm-align-items-center">
                        <span id="CurPage" name="CurPage">1</span>
                    </div>
                    <oj-button  slot="end"  display="icons" chroming="borderless" title="{$next_SummaryAudit}" name="navNext" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_NEXT, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
                    <oj-button  slot="end"  display="icons" chroming="borderless" title="{$last_SummaryAudit}" name="navLast" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_LAST, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                </div>-->
                  <oj-label-value label-edge="start" label-width="{$labelWidth}px" >
              
                <oj-label  slot="label"  title="{$lockColumns}" for="">
                <xsl:value-of select="$lockColumns"/>
                
                </oj-label> 
               <oj-select-single  slot="value" user-assistance-density="compact" name="Records" style="width:100px"  on-value-changed="[[lockColumnChangedHandler]]" tableName ="{$vam}" >
                <xsl:attribute name="value">
                    <xsl:text>[[lockColumn]]</xsl:text>
                </xsl:attribute>
               
                 <xsl:attribute name="data">
                    <xsl:text>{{lockColumnDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
               
                </oj-label-value>
               
                <!--<oj-button  slot="end"  display="icons" chroming="borderless"   title="{$first}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
                <oj-button  slot="end"  display="icons" chroming="borderless"   title="{$previous}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                <div class="oj-flex oj-sm-align-items-center">
                <span id="CurPage" name="CurPage">1</span>
                <span id="ofLabel">
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                   <xsl:value-of select="$of_SummaryAudit"/>
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </span>
                <span id="TotPgCnt" name="TotPgCnt">1</span>                
                </div>
                <oj-button  slot="end"  display="icons" chroming="borderless"    title="{$next}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
                <oj-button  slot="end"  display="icons" chroming="borderless"    title="{$last}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text><label class="LBLinv" for="goto" ><xsl:value-of select="$gotoPage_SummaryAudit"/></label>--><!-- 12.1 summary performance changes new start --><!--
                <input id="goto" name="gotopage" READONLY="true" size="1" type="text" title="{$gotoPage_SummaryAudit}"></input>--><!--HTML5 changes 24/OCT/2016 Fix for 24904397--><!--
                <oj-button title="{$gotoPage_SummaryAudit}" onclick="goToPage(event)" disabled="true" name="go"><xsl:value-of select="$gotoPage_SummaryAudit"/></oj-button>--><!--HTML5 Changes--><!--HTML5 changes 24/OCT/2016 Fix for 24904397-->
                </div>
              </div>
               
                  
            <DIV id="QryRslts" onkeydown="return handleSumkeys(event)" >
                       
                    
                      <oj-table ID="TBL_QryRslts" aria-label="{$vam}" caption="{$vam}" type="ME" display="grid" 
                              summary="{$vam}" role="presentation" class="oj-sm-width-full oj-sm-margin-2x-vertical"  style="max-height:350px">
                        <xsl:attribute name="selection-mode">
                                                    <xsl:text>{"row": "multiple"}</xsl:text>
                                            </xsl:attribute>
                        <xsl:attribute name="columns">
                                                    <xsl:text>{{</xsl:text>
                                                      <xsl:value-of select="$vam"/>
                                                    <xsl:text>columnArray}}</xsl:text>  
                                                     
                                            </xsl:attribute>
                        <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="$vam"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                        <xsl:attribute name="DBT">
                            <xsl:value-of select="$vam"/>
                        </xsl:attribute>
                        <xsl:attribute name="pgsize">
                            <xsl:if test="count(./PGSIZE) = 0">
                                <xsl:value-of select="15"/>
                            </xsl:if>
                            <xsl:if test="count(./PGSIZE) != 0">
                                <xsl:value-of select="./PGSIZE"/>
                            </xsl:if>
                        </xsl:attribute>
                        <!--<template_tmp slot='rowTemplate' data-oj-as='row' >
                            <tr ondblclick="fnDetailScreen(event)" onkeydown="return fnHandleSumRslt(event)">
                                 <xsl:call-template name="TRLOOP"/>
                            </tr>
                        </template_tmp>-->
                        <template slot='rowTemplate' data-oj-as='row' >
                             <tr ondblclick="fnDetailScreen(event)" onkeydown="return fnHandleSumRslt(event)" > 
                                 <xsl:call-template name="TRLOOP"/>
                            </tr>
                        </template>
                          <!--<oj-paging-control id="paging_{./BLOCK}"   page-size="{./PGSIZE}" slot="bottom" onclick="handleOjetMEPagination(event,{./BLOCK})">
                 <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./BLOCK"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                  </oj-paging-control>-->
                    </oj-table>
                  
            </DIV>
        <div class="oj-flex-bar oj-sm-align-items-center oj-sm-justify-content-flex-start oj-sm-margin-2x-start oj-sm-margin-4x-end">
            <div class="oj-flex-bar-start">
                <div class="oj-pagingcontrol-nav-input-section">               
                    <oj-label for="goto"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$page_SummaryAudit"/>&#160;</oj-label>                
                    <oj-input-text id="goto"  class="oj-sm-align-items-center" size="1" value="1" onChange="goToPage(event)" title="{$gotoPage_SummaryAudit}"></oj-input-text>
                    <oj-label id="ofLabel"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$of_SummaryAudit"/>&#160;</oj-label>
                    <oj-label id="TotPgCnt"  class="oj-sm-align-items-center" name="TotPgCnt">1</oj-label>                
                </div>                
                <div class="oj-divider-end oj-sm-margin-2x-start"></div>
            </div>               
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$first_SummaryAudit}" name="navFirst" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_FIRST, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$previous_SummaryAudit}" name="navPrev" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_PREVIOUS, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                <div class="oj-flex oj-sm-align-items-center">
                <span id="CurPage" name="CurPage">1</span>
                </div>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$next_SummaryAudit}" name="navNext" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_NEXT, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$last_SummaryAudit}" name="navLast" tabindex="-1" on-oj-action="[[doNavigate.bind(gcNAV_LAST, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                </div>
            </div>
            </oj-form-layout>
            </fieldset>
            </div>
            </div>
            </div>
    </xsl:template>
    
        <xsl:template name="TRLOOP">
		<xsl:variable name="l_audit_type" select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/TYPE)" />
		<xsl:if test="$l_audit_type = 'M'">
                         <TD  name="AUTH_STATM" type="TEXT"  >
                                                <xsl:call-template name="dispAuditFields">
                                                    <xsl:with-param name="fromQry" select="'N'"/>
                                                    <xsl:with-param name="DBT" select="//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[1]/DBT"/>
                                                    <xsl:with-param name="DBC" select="'AUTH_STAT'"/>
                                                </xsl:call-template>
                                                </TD>
                                                <TD  name="RECORD_STATM" type="TEXT"  >
                                                <xsl:call-template name="dispAuditFields">
                                                    <xsl:with-param name="fromQry" select="'N'"/>
                                                    <xsl:with-param name="DBT" select="//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[1]/DBT"/>
                                                    <xsl:with-param name="DBC" select="'RECORD_STAT'"/>
                                                </xsl:call-template>
                                                </TD>
        </xsl:if>
     <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="./NAME"/>
                        <xsl:variable name="fldType" select="./TYPE"/>
                         <xsl:if test="TYPE = 'HIDDEN'">
                               <TD  name="{$fldName}" type="{$fldType}"  style="display:none">
                               
                               <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                                                <xsl:call-template name="typeHandlerResultProcess">
                                                    <xsl:with-param name="fType" select="./TYPE"/>
                                                    <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = ./DBT][DBC = ./DBC][NAME = $fldName]"/>
                                                </xsl:call-template>
                                                
                                            </xsl:if>
                                            <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                                <xsl:call-template name="typeHandlerResultProcess">
                         <xsl:with-param name="fType" select="./TYPE"/>
                         <xsl:with-param name="fldNode" select="."/>
                         </xsl:call-template>
                                            </xsl:if>
                               
                            
                         <!--<xsl:call-template name="typeHandlerResultProcess">
                         <xsl:with-param name="fType" select="./TYPE"/>
                         <xsl:with-param name="fldNode" select="."/>
                         </xsl:call-template>-->
                   </TD>
                         </xsl:if>
                            <xsl:if test="TYPE != 'HIDDEN'">
                  <TD  name="{$fldName}" type="{$fldType}"  >
                         <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                         
                                                <xsl:call-template name="typeHandlerResultProcess">
                                                    <xsl:with-param name="fType" select="./TYPE"/>
													<!--Bug35953436-->
						    <!--<xsl:with-param name="fldNode" select="."/>-->
                                                    <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = ./DBT][DBC = ./DBC][NAME = $fldName]"/>
												   <!--Bug35953436-->
                                                </xsl:call-template><!--
                                                <xsl:call-template name="dispAuditFields">
                                                    <xsl:with-param name="fromQry" select="'N'"/>
                                                    <xsl:with-param name="DBT" select="./DBT"/>
                                                    <xsl:with-param name="DBC" select="./DBC"/>
                                                </xsl:call-template>-->
                                            </xsl:if>
                                            <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                                <xsl:call-template name="typeHandlerResultProcess">
                         <xsl:with-param name="fType" select="./TYPE"/>
                         <xsl:with-param name="fldNode" select="."/>
                         </xsl:call-template>
                                            </xsl:if>
                   </TD>
                   </xsl:if>
                   </xsl:for-each>
                   
</xsl:template>

<xsl:template name="typeHandlerResultProcess">
        <xsl:param name="fType"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="dbt" select="./DBT"/>
        <xsl:variable name="dbc" select="$fldNode/NAME"/>
        <xsl:variable name="fldName" select="$fldNode/NAME"/>        
            <xsl:if test="$fType = 'CHECKBOX'">
                <xsl:call-template name="dispCheckboxField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="($fType ='TEXT' and normalize-space($fldNode/DTYPE) != 'NUMERIC' and normalize-space($fldNode/DTYPE) != 'NUMBER') or $fType='AMOUNT' or $fType='DATE' or $fType='ACCOUNT' or $fType='BRANCH' or $fType='CURRENCY' or $fType='CUSTOMER' or $fType='MASK' or $fType='RESTRICTED_TEXT'">
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="$fType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType ='TEXT' and (normalize-space($fldNode/DTYPE)='NUMERIC' or normalize-space($fldNode/DTYPE) = 'NUMBER')">
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'SELECT'">
                <xsl:call-template name="dispSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'RADIO'">
                <xsl:call-template name="dispRadioToSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>           
            <xsl:if test="$fType = 'TEXTAREA'">
                <xsl:call-template name="dispTextareaField">
                    <xsl:with-param name="position">column</xsl:with-param>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'FILE'">
                <xsl:call-template name="dispFileField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'BUTTON'">
                <xsl:call-template name="dispButtonField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'HIDDEN'">                
                <xsl:call-template name="dispHiddenField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
            
</xsl:template>

<xsl:template name="generateMEHeaderScript">
    <xsl:param name="multipleEntryNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>columnArray =screenKo.observableArray([]); 
     <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>fieldObj= screenKo.observableArray([]); 
    
     multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>'] = {};
     	<xsl:variable name="l_audit_type" select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/TYPE)" />
		<xsl:if test="$l_audit_type = 'M'">
            
            var obj = { 'headerText':  "<xsl:value-of select="$authStat_SummaryAudit"/>", 'field': "<xsl:value-of select="'AUTH_STAT'"/>" , minWidth: "10%",
                          maxWidth: "25%"};
                          <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>columnArray.push(obj);
                          obj = { 'headerText':  "<xsl:value-of select="$recordStat_SummaryAudit"/>", 'field': "<xsl:value-of select="'RECORD_STAT'"/>" , minWidth: "10%",
                          maxWidth: "25%"};
                          <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>columnArray.push(obj);
                          
                          multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['<xsl:value-of select="'AUTH_STAT'"/>'] =null;
                          multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['<xsl:value-of select="'RECORD_STAT'"/>'] =null;
                          
     <!--     <xsl:if test="count(VALUE) > 0 and VALUE != ''">
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['<xsl:value-of select="'AUTH_STAT'"/>'] ='<xsl:value-of select="'AUTH_STAT'"/>';
          </xsl:if>-->
    </xsl:if>
    <xsl:for-each select="$multipleEntryNode/FIELD">
        var obj = { 'headerText':  "<xsl:value-of select="LABEL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "10%",
                          maxWidth: "25%"};
             <xsl:if test="TYPE = 'HIDDEN'">
               obj = { 'headerText':  "<xsl:value-of select="LABEL"/>', 'field': '<xsl:value-of select="NAME"/>" ,'headerStyle':'display:none'};
           </xsl:if><!--
       <xsl:if test="position() &lt; 5">
       obj['frozenEdge']='start';
       </xsl:if>
      
            -->
            
            <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>columnArray.push(obj);
            
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] =null;
          <xsl:if test="count(VALUE) > 0 and VALUE != ''">
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] ='<xsl:value-of select="VALUE"/>';
          </xsl:if>
    </xsl:for-each>    
    debugger;
    multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']['readOnly'] = true;
    meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>'] = screenKo.observableArray([]);
    debugger;
    <xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>dataprovider=screenKo.observable( new tempArrayDataProvider( meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/FIELD[1]/DBT"></xsl:value-of>']));
       
    </script>
</xsl:template>
       <xsl:template name="ResultProcess_old">
            <xsl:variable name="spanCnt">
                <xsl:value-of select="count(/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
        <div id="TblOuterDiv" class="DIVtblbox1outer">
          <div id="Table_NavOptions" class="DIVcaption1" style="width:100%; position:static; margin:0px">
              <label class="LBLnw" title="{$recordsPerPage_SummaryAudit}" for="Record_Per_page">
                  <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                  <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
              </label>                            
              <SELECT CLASS="SELstd" NAME="Records" id="Record_Per_page" onchange = "fnExecuteQuery(event)" TYPE="number" SIZE="" MAXLENGTH="3">
                  <OPTION VALUE="15">15</OPTION>
                  <OPTION VALUE="25">25</OPTION>
                  <OPTION VALUE="50">50</OPTION>
              </SELECT> 
              
              <button class="BTNtextD" title="{$first_SummaryAudit}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><xsl:value-of select="$first_SummaryAudit"/></button>
              <button class="BTNtextD" title="{$previous_SummaryAudit}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><xsl:value-of select="$previous_SummaryAudit"/></button>
              
              <span class="SPNtext" id="CurPage" name="CurPage">1</span>
              <span class="SPNtext" id="ofLabel">
                  <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                  <xsl:value-of select="$of_SummaryAudit"/>
                  <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
              </span>
              <span class="SPNtext" id="TotPgCnt" name="TotPgCnt">1</span>
              
              <button class="BTNtextD"  title="{$next_SummaryAudit}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><xsl:value-of select="$next_SummaryAudit"/></button>
              <button class="BTNtextD"  title="{$last_SummaryAudit}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><xsl:value-of select="$last_SummaryAudit"/></button>
              
              <label class="LBLinv" for="goto"><xsl:value-of select="$gotoPage_SummaryAudit"/></label>
              <input class="TXTstd" id="goto" name="gotopage" READONLY="true" size="1" type="text" title="{$gotoPage_SummaryAudit}"></input>
              <button class="BTNtextD" onclick="goToPage(event)" disabled="true" name="go" onkeydown="return fnhandleSubScrBtn(event)"><xsl:value-of select="$gotoPage_SummaryAudit"/></button>
              <!--static header change start-->
              <label class="LBLnw" for="" ><xsl:value-of select="$lockColumns"/></label> <!--12.1 lock column changes--> 
              <select class="SELstd" NAME="Locks" TYPE="number" SIZE="" MAXLENGTH="3" onchange="fnFreezeColumns(this.value)" disabled="true" title="{$lockColumns}">
                    <option VALUE="0" SELECTED ="SELECTED" DEFAULT= "0">0</option>
                    <option VALUE="1">1</option>
                    <option VALUE="2">2</option>                                    
                    <option VALUE="3">3</option>
                    <option VALUE="4">4</option>
                </select>
                <!--static header change end-->
          </div>
          <!--static header change start-->
         <div id="rsltsConatiner" style="width:100%">
         <div id="sumHeaderContainer" style="BACKGROUND: #f3f1ec;">
          <DIV class="DIVTblHeader" id="QryRsltsHeaderFreeze">
            <TABLE class="TABLESummaryH" ID="TBL_QryRsltsHeaderFreeze" cellspacing="0" cellpadding="0" border="0" role="presentation"><!--Fix for 21828177 -->
              <TBODY>
                <TR onkeydown="return fnHandleSumTH(event)">
                   <xsl:if test="/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'U' or $exportReq = 'Y'">
                        <td class="THgrid1" scope="col" nowrap="nowrap"><div>
                          <label class="LBLauto" for="RSLT_CHKBOXFrz"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><INPUT id="RSLT_CHKBOXFrz" TYPE="CHECKBOX" NAME = "RSLT_CHKBOXFrz"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll(event)" title="{$select_all_rows}"/></label><!--Fix for 21609922-->
                        </div></td>
                    </xsl:if>
                    
                    <xsl:call-template name = "AuditResult"/>
                    
                    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
                    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
                    <xsl:variable name="noOfCols">
                      <xsl:if test="$AuditBlk_exist != ''">
                        <xsl:if test="$AuditBlk_Type = 'M'">
                          <xsl:value-of select="2"/>
                      </xsl:if>
                      <xsl:if test="$AuditBlk_Type != 'M'">
                          <xsl:value-of select="4"/>
                      </xsl:if>
                      </xsl:if>
                      <xsl:if test="not($AuditBlk_exist)" >
                          <xsl:value-of select="4"/>
                      </xsl:if>
                    </xsl:variable>
                    <xsl:for-each select="/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                      <xsl:if test="number($noOfCols) &gt;= position()">
                                <xsl:variable name="dbt" select="DBT"/>
                                <xsl:variable name="dbc" select="DBC"/>
                                <xsl:variable name="fldName" select="NAME"/>
                                <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                                    <xsl:choose>
                                        <xsl:when test="$applicationName = 'FCIS'">
                                            <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                                    <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>                            
                                    <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc">
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat('THFrz_',$dbt,'__',$dbc)"/><!--Fix for 21609922, 21828177 -->
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
                                      <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </div></TD>
                                </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>                            
                                            <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc">
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat('THFrz_',$dbt,'__',$dbc)"/><!--Fix for 21609922, 21828177 -->
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
                                              <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </div></TD>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                                <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                    <xsl:choose>
                                        <xsl:when test="$applicationName = 'FCIS'">
                                            <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                                    <xsl:variable name="fldNode" select="."/>                            
                                    <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc">
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat('THFrz_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                      <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </div></TD>
                                            </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="."/>                            
                                            <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc">
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat('THFrz_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                              <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </div></TD>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                                </xsl:if>
                              </xsl:for-each>
                </TR>
              </TBODY>
            </TABLE>
          </DIV>
          <DIV style="width: 786px" class="DIVtblbox1 DIVTblHeader" id="QryRsltsHeader" onkeydown="return handleSumkeys(event)">
              <TABLE class="TABLESummaryH" ID="TBL_QryRsltsHeader" cellspacing="0" cellpadding="0" border="0" width = "100%" summary="{$summary}Header" role="presentation"><!--Fix for 21828177 -->
                <TBODY>
                    <TR onkeydown="return fnHandleSumTH(event)">
                               <xsl:if test="/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'U' or $exportReq = 'Y'">
                                    <td class="THgrid1" scope="col" nowrap="nowrap"><div>
                                      <label class="LBLauto" for="RSLT_CHKBOX"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><INPUT id="RSLT_CHKBOX" TYPE="CHECKBOX" NAME = "RSLT_CHKBOX"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll(event)" title="{$select_all_rows}"/></label>
                                    </div></td>
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
                                    <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!-- SNORAS#001517-->
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat('TH_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                      <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </div></TD>
                                </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>                            
                                            <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat('TH_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                              <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </div></TD>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                                <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                    <xsl:choose>
                                        <xsl:when test="$applicationName = 'FCIS'">
                                            <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                                    <xsl:variable name="fldNode" select="."/>                            
                                    <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                      <xsl:attribute name="ID">
                                        <xsl:value-of select="concat('TH_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                      <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                      <xsl:value-of select="LABEL"/>
                                      </a>
                                    </div></TD>
                                            </xsl:if>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:variable name="fldNode" select="."/>                            
                                            <TD TYPE="{$fldNode/TYPE}" onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
                                              <xsl:attribute name="ID">
                                                <xsl:value-of select="concat('TH_',$dbt,'__',$dbc)"/><!--Fix for 21828177 -->
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
                                              <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                                              <xsl:value-of select="LABEL"/>
                                              </a>
                                            </div></TD>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:if>
                              </xsl:for-each>                      
                              <xsl:if test="$applicationName = 'FCIS'">
                                <xsl:call-template name="AuditResultFCIS"/>
                              </xsl:if>
                              <TD width='99%'><div><xsl:text disable-output-escaping="yes">&#160;</xsl:text></div></TD> 
                            </TR>
                </TBODY>
              </TABLE>
          </DIV></div>
          <div id="bodyContainer">
          <DIV style="overflow:hidden;" id="QryRsltsFreeze">
            <TABLE class="TABLESummary" ID="TBL_QryRsltsFreeze" cellspacing="0" cellpadding="0" border="0" role="presentation"><!--Fix for 21828177 -->
                <TBODY>
                          <TR>
                              <TD style="padding:0px; margin:0px; border:0px"><!-- Fix for 21243231 -->
                                  
                              </TD>
                          </TR>
                    </TBODY>
            </TABLE>
          </DIV>
          <DIV style="overflow-y:auto; overflow-x:auto; width: 786px; height: 220px;" class="DIVtblbox1"
								id="QryRslts" onkeydown="return handleSumkeys(event)" onScroll="fnSyncScroll(this)">
                    <TABLE class="TABLESummary" ID="TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" width = "100%" summary="{$summary}" role="presentation"> <!--Fix for 21828177 -->
                       <TBODY>
                          <TR>
                              <TD style="padding:0px; margin:0px">
                                  <!-- <xsl:text disable-output-escaping="yes">&#160;</xsl:text>                            -->
                              </TD>
                          </TR>
                    </TBODY> 
               </TABLE>
            </DIV>
            </div>
            </div>
            <!--<div id="TblOuterDiv" class="DIVtblbox1outer">
                <span id="TblOuterSpn" style="height:1.5em; display:block"></span>
                
            </div>-->
            <!-- Newly added DIV ends here -->
        </div>
          <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">
           <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
           <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>

                <div class="DIVSubSystem" id="SUM_CUST_BTNS" style="padding-left:2px;">
          <ul id="CUST_BTNS">
            <xsl:for-each select="//SUMBUTTONS/BUTTON">
                <li >
                    <a href="#" class="BUTTONSubSystem" NAME="{BUTTON_NAME}" id="{BUTTON_NAME}" onkeydown="return fnhandleSubScrBtn(event)">
                        <xsl:if test="BUTTON_EVENT != ''">
                          <xsl:attribute name="onClick"><xsl:value-of select="BUTTON_EVENT"/></xsl:attribute>
                        </xsl:if>
                    <span><xsl:value-of select="BUTTON_LABEL"/></span>
                    </a>
                    <xsl:choose><!--HTML5 Changes Start-->
                        <xsl:when test="position() != last()">
                            <a class="Abutton">|</a><!--Fix for 21627033-->
                        </xsl:when>
                    </xsl:choose><!--HTML5 Changes End-->
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
   <!-- Changed for 17079537 -->
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH~~'), '@@')" />   
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="page_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_PAGE~~'), '@@')" /> 
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
   <xsl:variable name="recommended_field" select="substring-before(substring-after($summaryLabels, 'LBL_RECOMMENDED~~'), '@@')" />   
   <xsl:variable name="last_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_LAST~~'), '@@')" />
   <xsl:variable name="noScript" select="substring-before(substring-after($summaryLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />
   <xsl:variable name="records" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS~~'), '@@')" />   
   <xsl:variable name="taskList" select="substring-before(substring-after($summaryLabels, 'LBL_TASKLIST~~'), '@@')" />   
   <xsl:variable name="advSummary" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED_SUMMARY~~'), '@@')" />   
   <xsl:variable name="summary" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY~~'), '@@')" />   
   <xsl:variable name="page_footer" select="substring-before(substring-after($summaryLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="search_results" select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH_RESULT~~'), '@@')" />
   <xsl:variable name="search_criteria" select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH_CRITERIA~~'), '@@')" />
   <xsl:variable name="search_CaseSensitive" select="substring-before(substring-after($summaryLabels, 'LBL_CASE_SENSITIVE~~'), '@@')" />  
   <xsl:variable name="saveCriteria_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_TOOLBAR_SAVE~~'), '@@')" />
   <xsl:variable name="enterCriteria_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ENTR_QUERY~~'), '@@')" />
   <xsl:variable name="clearAll_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CLEAR_ALL~~'), '@@')" />
   <xsl:variable name="savedQry_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SAVED_QUERY~~'), '@@')" />	
   <xsl:variable name="checkboxYes" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKBOX_YES~~'), '@@')" />
   <xsl:variable name="checkboxNo" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKBOX_NO~~'), '@@')" />
   <xsl:variable name="lockColumns" select="substring-before(substring-after($summaryLabels, 'LBL_LOCK_COLUMNS~~'), '@@')" /> <!--12.1 lock column changes -->
   <xsl:variable name="lov" select="substring-before(substring-after($summaryLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
        	<!-- end of Tmp_Labels.xsl -->
		<!-- start of Tmp_Summary_Audit.xsl -->
   <xsl:template name="Audit_Legends">
                
        <xsl:call-template name="generateLegendScript">
         </xsl:call-template>
         <!--<xsl:call-template name="generatecustomLegendScript">
         </xsl:call-template>-->
         
         <!--<oj-collapsible class="oj-sm-margin-1x-horizontal oj-sm-padding-4x-start" expand-area="header" expanded="true" id="queryCollapsible">-->
             <!--<h4 slot="header">
               <xsl:value-of select="$search_criteria"/> <xsl:text> (</xsl:text>  <xsl:value-of select="$search_CaseSensitive"/><xsl:text>) </xsl:text>
             
             </h4>-->
                <div class="oj-sm-width-full sectionPanel" id="legend-container">    
                    <div>
                    <oj-legend id="legend1" style="height:30px" orientation='horizontal' data='[[arrAuditLegend]]'>
                        <xsl:attribute name="text-style">
                            <xsl:text>{"fontSize": "1rem"}</xsl:text>
                        </xsl:attribute>
                         <template slot="itemTemplate">
                        <oj-legend-item text="[[$current.data.value]]"></oj-legend-item>
              </template>
        </oj-legend>                        
                </div>            
                </div>  
                <!--</oj-collapsible>--><!--
         <div id="legend-container" class="oj-label">
        <oj-legend id="legend1" class="oj-label" orientation='horizontal' data='[[arrAuditLegend]]'>
        <template slot="itemTemplate">
                <oj-legend-item class="oj-label"
                  text="[[$current.data.value]]"></oj-legend-item>
              </template>
        </oj-legend>
        </div>-->
                </xsl:template>
<xsl:template name="Audit_Legends_Old">
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
            <xsl:value-of select="$author1ized_SummaryAudit"/>
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
    
  </xsl:template>
  <xsl:template name="Custom_Legends_old">
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
    <xsl:param name="fromQry"/>
    <xsl:param name="DBT"/>
    <xsl:param name="auditField"/>
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
    <xsl:if test="$AuditBlk_exist != ''">
        <xsl:if test="$AuditBlk_Type = 'M'">
        <xsl:if test="$auditField = 'AUTH_STAT'">
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <oj-label slot="label"  style="width:{$labelWidth}px;">
        <xsl:value-of select="$authStat_SummaryAudit"></xsl:value-of>
        </oj-label>
        <xsl:call-template name="dispAuditFields">
            <xsl:with-param name="DBT" select="$DBT"/>
            <xsl:with-param name="fromQry" select="$fromQry"/>
            <xsl:with-param name="DBC" select="'AUTH_STAT'"/>
         </xsl:call-template>
         </oj-label-value>
         </xsl:if>
         <xsl:if test="$auditField = 'RECORD_STAT'">
         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <oj-label slot="label"  style="width:{$labelWidth}px;">
        <xsl:value-of select="$recordStat_SummaryAudit"></xsl:value-of>
        </oj-label>
        <xsl:call-template name="dispAuditFields">
            <xsl:with-param name="DBT" select="$DBT"/>
            <xsl:with-param name="fromQry" select="$fromQry"/>
            <xsl:with-param name="DBC" select="'RECORD_STAT'"/>
         </xsl:call-template>
       
         </oj-label-value>
        </xsl:if>
        </xsl:if>
        </xsl:if>
    </xsl:template>
    
    
  <xsl:template name="dispAuditFields">
  <xsl:param name="fromQry"/>
    <xsl:param name="DBT"/>
    <xsl:param name="DBC"/>
  <oj-select-single  DBT="{$DBT}" DBC="{$DBC}" slot="value">
   <xsl:attribute name="ID">
              <xsl:value-of select="concat($DBT,'__',$DBC)"/>
            </xsl:attribute>
             <xsl:attribute name="NAME">
              <xsl:value-of select="$DBC"/>
            </xsl:attribute>
         <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$DBC"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
                
            </xsl:if>
         </oj-select-single>
          <xsl:call-template name="generateSelectScriptTest">
            <xsl:with-param name="DBT" select="$DBT"/>
         </xsl:call-template>
  </xsl:template>
  <xsl:template name="AuditFields2">
    <!--<xsl:param name="auditfield" select="."/> -->
    <xsl:param name="fromQry"/>
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
    <xsl:if test="$AuditBlk_exist != ''">
        <xsl:if test="$AuditBlk_Type = 'M'">
        <oj-select-single slot="value">
            <xsl:attribute name="ID">
                <xsl:value-of select="'AUTHSTAT_M'"></xsl:value-of>
            </xsl:attribute>
            <!--<xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>-->
            <xsl:attribute name="title">
                <xsl:value-of select="AUTHSTAT_M"/>
            </xsl:attribute>
            
             <!--<xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
                
            </xsl:if>-->
                       
       </oj-select-single>
               <xsl:call-template name="generateCustomLegendScript">
             </xsl:call-template>
             <!--
       
            <xsl:if test="$auditfield='authstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="AUTH_STAT" style="width:{$labelWidth}px;">
                  <xsl:value-of select="$authStat_SummaryAudit"/>
                  <SPAN class="stardisabled"></SPAN>
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
            </xsl:if>-->
        </xsl:if>
        <!--<xsl:if test="$AuditBlk_Type = 'M'">
            <xsl:if test="$auditfield='recordstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="RECORD_STAT" style="width:{$labelWidth}px;">
                  <xsl:value-of select="$recordStat_SummaryAudit"/>
                  
                  <SPAN class="stardisabled"></SPAN>
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
        </xsl:if>-->
    </xsl:if>
  </xsl:template>
  <xsl:template name="disp_Exit_Btn">
  <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT" name="BTN_EXIT" 
  on-oj-action="[[fnExit.bind(event)]]" label="{$exit_SummaryAudit}"   >
            
        </oj-button>
    <!--<TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="98%"
           border="0" summary="">
        <TBODY>
      <TR>
        <td valign="top">
        <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
        <xsl:if test="count(//LEGENDS) > 0 or $AuditBlk_exist != ''">
          <div id="legenddiv" style="max-height:7em; overflow-y:auto; overflow-x:hidden"> 12.1 screen height change 
            <xsl:call-template name="Custom_Legends">
            </xsl:call-template>
            <xsl:call-template name="Audit_Legends">
            </xsl:call-template>
          </div>
         </xsl:if>
        </td>
        <TD class="TDAuditButton" vAlign="top" width="90%">
          <INPUT class="BUTTONExit" id="BTN_EXIT"
                 onblur="this.className='BUTTONExit'"
                 onmouseover="this.className='BUTTONExitHover'"
                 onfocus="this.className='BUTTONExitHover'" onclick="fnExit(event)"
                 onmouseout="this.className='BUTTONExit'" type="button"
                 value="{$exit_SummaryAudit}"
                 onkeydown="return fnHandleSumBtn(event)"/>
          <IMG id="BTN_EXIT_IMG'" style="display:none" src=""
               name="BTN_EXIT_IMG" ALT="{$exit_SummaryAudit}"/>Data Uri change
        </TD>
      </TR>
      </TBODY>
    </TABLE>-->

  </xsl:template>
  <!-- Kals June 15 Audit Results -->
  <xsl:template name="AuditResult">
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$AuditBlk_exist != ''">
      <xsl:if test="$AuditBlk_Type = 'M'">    
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$authStat_SummaryAudit"/>
            </a></div>
        </TD>
      </xsl:if>
      <xsl:if test="$AuditBlk_Type = 'M'">        
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <div><a href="#" onclick='fnSortRecs(event)' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$recordStat_SummaryAudit"/>
            </a></div>
        </TD>
      </xsl:if>      
    </xsl:if>
  </xsl:template>
  <xsl:template name="AuditResultFCIS">
    <xsl:variable name="lAuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="lAuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$lAuditBlk_exist != ''">
      <xsl:if test="$lAuditBlk_Type = 'M'">    
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <div><a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$makerId_SummaryAudit"/>
            </a></div>
        </TD>
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
           <div> <a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$makerDate_SummaryAudit"/>
            </a></div>
        </TD>
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <div><a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$checkerId_SummaryAudit"/>
            </a></div>
        </TD>
        <TD onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <div><a href="#" onclick='fnSortRecs()' order = "asc" onkeydown="return fnhandleSubScrBtn(event)">
                <xsl:value-of select="$checkerDate_SummaryAudit"/>
            </a></div>
        </TD>
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
    <div>
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <xsl:choose>
            <xsl:when test="$fType = 'BUTTON'">
                <div class="DIVText"></div>
            </xsl:when>
            <xsl:when test="$fType = 'HIDDEN'">
            	<xsl:attribute name="class">
                	<xsl:text>DispNone</xsl:text>
                </xsl:attribute>
                <xsl:call-template name="dispLabelHidden"/>
            </xsl:when>
            <xsl:when test="$fType = 'CHECKBOX'">
            <xsl:attribute name="class">
                        <xsl:text>DIVCheck</xsl:text>
                    </xsl:attribute>
                    <b class="LBLstd" style="width:{$labelWidth}px;"/>
                    <div class="DIVchkrad">                        
                        <xsl:call-template name="dispCheckboxField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                            <xsl:with-param name="fromQry" select="Y"/>
                        </xsl:call-template>
                    </div>
                
            </xsl:when>
            <xsl:otherwise>
            <xsl:if test="$fType = 'SELECT' or $fType = 'RADIO'">
                        <xsl:attribute name="class">
                            <xsl:text>DIVList</xsl:text>
                        </xsl:attribute>
            </xsl:if>
                <xsl:call-template name="dispLabelField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                    <xsl:with-param name="fromQry" select="Y"/>
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
                <xsl:with-param name="fromQry" select="'Y'"/>
            </xsl:call-template>
            
        </xsl:if>
         <xsl:if test="$fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
         
            <xsl:call-template name="dispEntityField">
                <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="'Y'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'SELECT'">
                        <xsl:call-template name="dispSelectField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                            <xsl:with-param name="fromQry" select="'Y'"/>
                        </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'RADIO'">
         
                        <xsl:call-template name="dispRadioToSelectField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                            <xsl:with-param name="fromQry" select="'Y'"/>
                        </xsl:call-template>         
        </xsl:if>        
        <xsl:if test="$fType = 'TEXTAREA'">
            <xsl:call-template name="dispTextareaField">
                <xsl:with-param name="position">column</xsl:with-param>
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="'Y'"/>
            </xsl:call-template>
        </xsl:if>
       <!-- <xsl:if test="$fType = 'FILE'">
            <xsl:call-template name="dispFileField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:if> -->
        <xsl:if test="$fType = 'BUTTON'">
            <xsl:call-template name="dispButtonField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="'Y'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="$fType = 'HIDDEN'">
            <xsl:call-template name="dispHiddenField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="'Y'"/>
            </xsl:call-template>
        </xsl:if>
        </oj-label-value>
    </div>
</xsl:template>

	<!-- Generic Entity Handler -->
<xsl:template name="dispEntityField">
    
    <xsl:param name="EntityType" />
    <xsl:param name="dbt" />
    <xsl:param name="dbc" />
    <xsl:param name="fldName" />
    <xsl:param name="fldNode" />
    <xsl:param name="fromQry" />
    <!-- Call the appropriate template based on the entity --> 
    
    <xsl:choose>
    
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'ACCOUNT'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'BRANCH'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
	</xsl:when>
	<xsl:when test="$EntityType = 'CURRENCY'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:when test="$EntityType = 'CUSTOMER'">
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="EntityType" select="$EntityType" />	
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
	</xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
	</xsl:when>
      <!--  <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
        </xsl:when>-->
        <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
            <xsl:call-template name="dispRestrictedTextField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="dispTextField" >
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
                <xsl:with-param name="fromQry" select="$fromQry"/>
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
    <xsl:param name="fromQry"/>
    <!--

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
    </INPUT>-->
    
    <!--<LABEL CLASS="LABELNormal" for="" style="width:{$labelWidth}px;">
      <xsl:attribute name="for">
            <xsl:value-of select="concat($fldNode/DBT,'__',$fldNode/DBC)" />
            <xsl:text>I</xsl:text>
      </xsl:attribute>--><!--fix for 17235409 --><!--
      <xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>-->
    <!--Fix for 20190111 Starts-->
    <!--<INPUT TYPE="TEXT" CLASS="TextAmount" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}')" >-->
    <!--<INPUT TYPE="TEXT" CLASS="TextAmount" onblur="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" >
	--><!--Fix for 20190111 Ends--><!--
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
    </INPUT>-->
    <oj-input-text slot="value" TYPE="TEXT"  title="{$fldNode/LABEL}">
    <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
    <xsl:attribute name="ID">
              <xsl:value-of select="concat($fldNode/DBT,'__',$fldNode/NAME)"/>
            </xsl:attribute>
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="NAME">
                <xsl:value-of select="$fldNode/NAME"/>
            </xsl:attribute>
            <xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">validateSummaryNumberfield('</xsl:text>
                <xsl:value-of select="concat($fldNode/DBT,'__',$fldNode/NAME)"/>
                <xsl:text disable-output-escaping="yes">', event)</xsl:text>
            </xsl:attribute> 
            <xsl:if test="count($fldNode/LOV) > 0 ">    
               <xsl:attribute name = "onchange">
                  <xsl:call-template name="dispAutoLov">
                      <xsl:with-param name="curr_node" select="$fldNode"/>
                  </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
        <!--Fix for 18556691 start-->
        <xsl:attribute name="DBT">
        <xsl:value-of select="$fldNode/DBT"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
        <xsl:value-of select="$fldNode/NAME"/>
        </xsl:attribute>
        <!--Fix for 18556691 ends-->
            <!--Fix for 18260762 ends -->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new end -->
                         <!--<xsl:call-template name="LovHandler">
                    <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
                </xsl:call-template>-->
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
               </oj-button>
         </xsl:if>  
        </xsl:if>
        </oj-input-text>
        
    <!--<xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
    </xsl:call-template>-->
    
</xsl:template>


<!-- Takes care of features common in Date Field of Absolute/Column Positioning -->
<xsl:template name="dispDateField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <xsl:param name="fromQry"/>
    <oj-input-date slot="value" title="{./LABEL}" placeholder="{$dateFormat}"  day-formatter="[[dayFormatter]]" converter="[[dateConverter]]"><!--HTML5 Changes -->
    <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <!--<xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>-->
            <!--<xsl:attribute name="SIZE">
                <xsl:value-of select="11"/>
            </xsl:attribute>
            <xsl:attribute name="TITLE">
              <xsl:value-of select="$calendar"/>
            </xsl:attribute>-->
            <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        <!--    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
            <xsl:if test="$refFld !=''">
                <xsl:attribute name="REF_FIELD">
                    <xsl:if test="contains($refFld,'__')">
                        <xsl:value-of select="substring-after($refFld,'__')"/>
                    </xsl:if>
                    <xsl:if test="not(contains($refFld,'__'))">
                        <xsl:value-of select="$refFld"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if> -->
       </oj-input-date>

    <!--<xsl:variable name="refFld" select="$fldNode/REF_FIELD"/>
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
    <LABEL CLASS="LABELNormal" for="" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change --><!--
      <xsl:attribute name="for">
            <xsl:value-of select="concat($fldNode/DBT,'__',$fldNode/DBC)" />
            <xsl:text>I</xsl:text>
      </xsl:attribute>--><!--fix for 17235409 --><!--
      <xsl:value-of select="$fldNode/LABEL"></xsl:value-of></LABEL>
	  --><!--Fix for 20190111 Starts--><!--
    <INPUT TYPE="TEXT" CLASS="TextDate" onblur="validateInputDate('{$fldNode/NAME}')" >
	--><!--Fix for 20190111 ends--><!--
        --><!--9NT1606_14_0_RETRO_12_0_3_27393036 changes added if--><!--
        <xsl:if test="$dateDelimiterReqd = 'Y'">
            <xsl:attribute name="onkeyup">                     
                <xsl:text>autoPopSep('{../NAME}', event);</xsl:text>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="ATTR_InputEntity_Handler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="11"/>
        </xsl:attribute>	
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
                --><!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/calendar.gif" ALT="{$calendar_SummaryAudit}"/>--><!--
                <SPAN class="IMGInline BtnCalender" title="{$calendar_SummaryAudit}"></SPAN>--><!-- Data Uri changes --><!--
            </BUTTON>
        </xsl:if>-->
    
</xsl:template>

<xsl:template name="dispNumberField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <xsl:param name="fromQry"/>
    <!--<INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
        <xsl:with-param name="curr_fld" select="$fldNode"/>
    </xsl:call-template>
    </INPUT>-->
    <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
<oj-input-text slot="value" type="text" >
                <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode" />
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
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
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
             <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        </oj-input-text>
        <!--<xsl:if test="$fldNode/../@TABPAGE!='RESULT'">
        <xsl:if test="(count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1)">
          <xsl:if test="count($fldNode/LOV) =0">
             <oj-button class="inputNumLovIcon" display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                <xsl:attribute name="onclick">
                    <xsl:text>fnBuildExtSummaryLOV('</xsl:text>
                    <xsl:value-of select="$fldNode/NAME"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="$fldNode/LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="$fldNode/DTYPE"/>
                    <xsl:text>', '', event)</xsl:text>
                </xsl:attribute>
                  <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
           </oj-button>
          </xsl:if>
          <xsl:if test="count($fldNode/LOV) > 0">
           <oj-button class="inputNumLovIcon" display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$fldNode"/>
                    <xsl:with-param name="functionName" select="'disp_lov'"/>
                </xsl:call-template>
                   <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
           </oj-button>
           
          </xsl:if>
          </xsl:if>
        </xsl:if>-->
        <!--</div>-->
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
        <xsl:param name="fromQry"/>
       <oj-input-text slot="value" type="TEXT">
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute> 
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="$fldNode/TYPE = 'RESTRICTED_TEXT' and ((count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER'))">        
                <xsl:if test="count($fldNode/LOV) &gt; 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count($fldNode/LOV) = 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="$fldNode/TYPE != 'RESTRICTED_TEXT' and ((count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER'))">
                <xsl:if test="count($fldNode/LOV) &gt; 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnToUppercase(this, event);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count($fldNode/LOV) = 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="$fldNode/TYPE = 'RESTRICTED_TEXT' and ((count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER'))">
                <xsl:if test="count($fldNode/LOV) &gt; 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count($fldNode/LOV) = 0 and count($fldNode/INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="$fldNode/TYPE != 'RESTRICTED_TEXT' and ((count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER'))">
                <xsl:if test="count($fldNode/LOV) &gt; 0 and count($fldNode/INPUT_LOV) = 0">                    
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
            </xsl:if>
    
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
       <!--     <xsl:if test="$fldNode/TYPE='RESTRICTEED_TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:attribute name="CLASS">
                    <xsl:text>TXTstd numeric</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
      <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>                        
               </oj-button>
            </xsl:if>
        </xsl:if>-->
         <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        <xsl:if test="$fromQry != 'N'">       
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
            <xsl:if test="count($fldNode/LOV) = 0 ">
                <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                        <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                   </oj-button>
                </xsl:if>
            </xsl:if>
            <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
            <xsl:if test="count($fldNode/POPUPEDIT) = 0">
                <xsl:if test="number($fldNode/SIZE) > 25">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                       <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                  </oj-button>
                </xsl:if>
            </xsl:if>
        </xsl:if>
        </oj-input-text>
    </xsl:template>
    
<xsl:template name="dispRestrictedTextField_old">
    
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
                    <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                    <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
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
    <xsl:param name="fromQry"/>

    <oj-input-text slot="value" type="TEXT">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
           
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>            
            
            <!--<xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>-->
            <!--<xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>-->
           <xsl:if test="$fromQry = 'N'">
            <!-- <xsl:if test="$fldNode/../@TABPAGE='RESULT'"> -->
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                  <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
             <!--Changes for AUTO LOV start-->
            <xsl:if test="(count($fldNode/UPPERCASE) > 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) > 0 and $fldNode/CASE = 'UPPER')">
              <xsl:attribute name="onblur">
                  <xsl:text>fnToUppercase(this,event);</xsl:text>                  
              </xsl:attribute>
              <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                  <xsl:call-template name="dispAutoLov">
                    <xsl:with-param name="curr_node" select="$fldNode"/>
                  </xsl:call-template>
                </xsl:attribute>
              </xsl:if>
            </xsl:if>
            <xsl:if test="(count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER')">
                <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                    </xsl:call-template>
                </xsl:attribute>
              </xsl:if>
            </xsl:if>            
            <!--Changes for AUTO LOV end-->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new end  -->
        <xsl:if test="$fromQry = 'Y'">       
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
            <xsl:if test="count($fldNode/LOV) = 0 ">
                <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                        <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                   </oj-button>
                </xsl:if>
            </xsl:if>
            <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
            <xsl:if test="count($fldNode/POPUPEDIT) = 0">
                <xsl:if test="number($fldNode/SIZE) > 25">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                       <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                  </oj-button>
                </xsl:if>
            </xsl:if>
        </xsl:if>
        </oj-input-text>

</xsl:template>

 <xsl:template name="dispSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <xsl:param name="fromQry"/>
        <oj-select-single slot="value">
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of>
            </xsl:attribute>
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:attribute name="title">
                <xsl:value-of select="$fldNode/LABEL"/>
            </xsl:attribute>
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
             <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
                
            </xsl:if>
            <xsl:if test="count($fldNode/WIDTH) > 0">
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="$fldNode/WIDTH"/>
                    <xsl:text>;}</xsl:text>
                </xsl:attribute>
            </xsl:if>            
       </oj-select-single>
       <xsl:if test="count($fldNode/OPTION) > 0">
               <xsl:call-template name="generateSelectScript">
                <xsl:with-param name="selectNode" select="$fldNode"/>
             </xsl:call-template>
        </xsl:if>
       
    </xsl:template>
    
    <xsl:template name="generateSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
   debugger;
     selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'] = [];
     
            <xsl:variable name="dfltReqd">
                <xsl:for-each select="$selectNode/OPTION">
                    <xsl:variable name="tempDfltChk">
                        <xsl:if test="(@VALUE)=''">
                            <xsl:value-of select="'N'"/>
                        </xsl:if>
                        <xsl:if test="(@VALUE)!=''">
                            <xsl:value-of select="'Y'"/>
                        </xsl:if>
                    </xsl:variable>
                    <xsl:value-of select="$tempDfltChk"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:if test="not(contains($dfltReqd, 'N'))">
               var obj = { 'value':  '', 'label': '' };
               selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
            </xsl:if>
     
    <xsl:for-each select="$selectNode/OPTION">
      var obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' };
       <xsl:if test="count(@SELECTED) > 0 and @SELECTED=-1">
       obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' ,'defaultValue':  '<xsl:value-of select="@VALUE"/>'};
            </xsl:if>
     selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
     </xsl:for-each>
       arrProvider<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
            debugger;
    </script>
    </xsl:template>
    
    
   
    
    <xsl:template name="generateLegendScript">
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
	
    <script type="text/javascript" DEFER="DEFER" >
   
     auditControl["Audit"] = [];
	 debugger;
	 <!-- <xsl:if test="$AuditBlk_exist != ''"> -->
     <!-- var obj = { value:  'puffcorn-P'}; -->
        <!-- auditControl["Audit"].push(obj); -->
     <!-- </xsl:if> -->
     <xsl:if test="$AuditBlk_exist != ''">
        <xsl:if test="$AuditBlk_Type = 'M'">
           <xsl:variable name="authLegend">
            <xsl:value-of select="$lableA_SummaryAudit"/>
            <xsl:text> - </xsl:text>
            <xsl:value-of select="$authorized_SummaryAudit"/>
          
           <xsl:value-of select="$lableU_SummaryAudit"/>
            <xsl:text> - </xsl:text>
            <xsl:value-of select="$unauthorized_SummaryAudit"/> 
          </xsl:variable> 
		  var obj = { value:  '<xsl:value-of select="$authLegend"/>'};
        auditControl["Audit"].push(obj);
          </xsl:if>
        <!--   <xsl:if test="$AuditBlk_Type = 'M'">
          <xsl:variable name="closeOpenLegend">
          
					<xsl:value-of select="$lableC_SummaryAudit"/>
					-
					<xsl:value-of select="$closed_SummaryAudit"/>
					<xsl:value-of select="$lableO_SummaryAudit"/>
					-
					<xsl:value-of select="$open_SummaryAudit"/>
          </xsl:variable>
		  var obj = { value:  '<xsl:value-of select="$closeOpenLegend"/>'};
        auditControl["Audit"].push(obj);
          </xsl:if> -->
          </xsl:if> 
          <xsl:if test="count(//LEGENDS) > 0">
      <xsl:for-each select="//LEGENDS">
     <xsl:variable name='custLegend'>
          <xsl:value-of select="LABEL"/><xsl:text> : </xsl:text>  
          <xsl:for-each select="OPTION">
            <xsl:value-of select="@VALUE"/> - <xsl:value-of select="(.)"/>
            <xsl:text> </xsl:text>
          </xsl:for-each>
        </xsl:variable>
        var obj = { value:  '<xsl:value-of select="$custLegend"/>'};
        auditControl["Audit"].push(obj);
      </xsl:for-each>
    </xsl:if>
          
         
          debugger;
          arrAuditLegend = new arrProviderAuditLegend(auditControl["Audit"], {
                  keyAttributes: "value",
              });
              debugger;
            
    </script>
    </xsl:template>
    <xsl:template name="generatecustomLegendScript">
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
	
    </xsl:template>
    
     <xsl:template name="generateSelectScriptTest">
    <xsl:param name="DBT"></xsl:param>
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AS" select="'AUTH_STAT'"/>
    <xsl:variable name="RS" select="'RECORD_STAT'"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
    <script type="text/javascript" DEFER="DEFER">
    debugger;
     selectControl['<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of>'] = [];
     selectControl['<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of>'] = [];
     var obj = { 'value':  '', 'label': '' };
               selectControl['<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of>'].push(obj);
      obj = { 'value':  '<xsl:value-of select="$lableA_SummaryAudit"/>', 'label': '<xsl:value-of select="$authorized_SummaryAudit"/>' };
               selectControl['<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of>'].push(obj);
               var obj = { 'value':  '<xsl:value-of select="$lableU_SummaryAudit"/>', 'label': '<xsl:value-of select="$unauthorized_SummaryAudit"/>' };
               selectControl['<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of>'].push(obj);
               debugger;
               arrProvider<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of> = new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($DBT,'__',$AS)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
              debugger;
              
              var obj = { 'value':  '', 'label': '' };
              selectControl['<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of>'].push(obj);
              obj = { 'value':  '<xsl:value-of select="$lableC_SummaryAudit"/>', 'label': '<xsl:value-of select="$closed_SummaryAudit"/>' };
               selectControl['<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of>'].push(obj);
               var obj = { 'value':  '<xsl:value-of select="$lableO_SummaryAudit"/>', 'label': '<xsl:value-of select="$open_SummaryAudit"/>' };
               selectControl['<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of>'].push(obj);
                arrProvider<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of> = new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($DBT,'__',$RS)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
    </script>
    </xsl:template>

<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispSelectField_old">
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
    <xsl:param name="fromQry"/>
    
    <!--<label class="LABELCheckSummary" for="{$dbt}__{$dbc}">
        <INPUT TYPE="CHECKBOX" DBC ="{$dbc}" DBT = "{$dbt}" NAME = "{$fldName}" id="{$dbt}__{$dbc}"> 
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
        <xsl:value-of select="$fldNode/LABEL"/>
    </label>-->
    <oj-switch DBC="{$dbc}" DBT="{$dbt}" NAME="{$fldName}">
            <xsl:if test="count($fldNode/CUSTOM) > 0">
                <xsl:attribute name="ON">
                    <xsl:value-of select="$fldNode/CUSTOM/ON"/>
                </xsl:attribute>
                <xsl:attribute name="OFF">
                    <xsl:value-of select="$fldNode/CUSTOM/OFF"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="$fromQry = 'N'">
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="translations.switch-on">
                    <xsl:value-of select="$checkboxYes"/>
                </xsl:attribute>
                <xsl:attribute name="translations.switch-off">
                    <xsl:value-of select="$checkboxNo"/>
                </xsl:attribute>
                <!--REDWOOD_35239225 Starts-->
                <xsl:attribute name="value">
                    <xsl:text>{{row.data.</xsl:text>
                        <xsl:value-of select="$fldName"/>
                    <xsl:text>}}</xsl:text>
                </xsl:attribute>
                <!--REDWOOD_35239225 Ends-->
            </xsl:if>
        </oj-switch>
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
            <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
            <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
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
    <xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED = '-1'">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
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
    <!--<img src="Images/star_disabled.gif" ALT=""/>-->
    <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
</xsl:template>

    <xsl:template name="LovHandler">
        <xsl:param name="curr_fld"/>
        <xsl:param name="EntityType"/>
         <!--Fix for 16497868- Textarea support in Summary screen-->
		<!-- 12.1 summary performance changes new start -->
                <xsl:if test="$curr_fld/../@TABPAGE!='RESULT'">
                 <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT' or $curr_fld/TYPE='TEXTAREA' or $curr_fld/TYPE='AMOUNT' ">
           <!-- <xsl:if test="count($curr_fld/LOV) &gt; 0 and $curr_fld/LOV = 'Y'">-->
			<!-- 12.1 summary performance changes new end -->
          
            <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button">
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
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </oj-button>
            
            <!--<xsl:if test="count($curr_fld/LOV) > 0">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button">
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="functionName" select="'disp_lov'"/>
                </xsl:call-template>
                 <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                    <span class="LBLinv">
                        <xsl:value-of select="$lov"/>
                    </span>
                </span>
           </oj-button>
         </xsl:if>-->
        </xsl:if>
        <xsl:if test="count($curr_fld/LOV) = 0 ">
            <xsl:if test="$EntityType = 'ACCOUNT' ">
                  <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Account.show_lov()">
                       
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
               </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'BRANCH' ">
                 <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Branch.show_lov()">
                      <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'CURRENCY' ">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Currency.show_lov()">
                     <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
               </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'CUSTOMER' ">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button"  ONCLICK="Customer.show_lov()" >
                     <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </oj-button>
            </xsl:if>
            </xsl:if>
        </xsl:if>
                
       
    </xsl:template>

<xsl:template name="LovHandler_old">
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
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
                 <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="$Brn_Neo = ''">
        <!--<xsl:if test="count($curr_fld/LOV) &gt; 0 "> if $curr_fld/TYPE = TEXT-->
        <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT'" >
            <BUTTON CLASS="BUTTONInline"  tabindex="0" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" type="button"><!--21827950-->
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
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
       <!-- </xsl:if>-->
    </xsl:if>    
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif" title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
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
        <xsl:if test="count($curr_fld/DBT) = 0 and count($curr_fld_name/DBT) &lt; 1"><!--Fix for 21828177 -->
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
        <xsl:if test="number($curr_fld/SIZE) &gt; 20">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="15" />
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

    <!--<xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQUIRED" />
    </xsl:attribute>-->
<xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED = '-1'">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
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
        <xsl:param name="fromQry"/>
        <oj-select-single slot="value">
       <xsl:if test="$fromQry = 'N'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of>
            </xsl:attribute>
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:attribute name="title">
                <xsl:value-of select="$fldNode/LABEL"/>
            </xsl:attribute>
        </oj-select-single>
        <xsl:call-template name="generateRadioToSelectScript">
                <xsl:with-param name="selectNode" select="$fldNode"/>
    </xsl:call-template>
    </xsl:template>
 <xsl:template name="generateRadioToSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'] = [];
     var obj = { 'value':  '', 'label': '' };
     selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
        
    <xsl:for-each select="$selectNode/OPTION">
      var obj = { 'value':  '<xsl:value-of select="VALUE"/>', 'label': '<xsl:value-of select="LABEL"/>' };
        <xsl:if test="@VALUE = ''">
       obj = { 'value':  '<xsl:value-of select="VALUE"/>', 'label': '<xsl:value-of select="LABEL"/>' ,'defaultValue':  '<xsl:value-of select="VALUE"/>'};
       </xsl:if>
     selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
            </xsl:for-each>
       arrProvider<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($selectNode/DBT,'__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
       
    </script>
    </xsl:template>
   
<xsl:template name="dispRadioToSelectField_old">
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
    <oj-label slot="label"  style="width:{$labelWidth}px;">
        <xsl:value-of select="$fldNode/LABEL"></xsl:value-of>
        <xsl:if test="count($fldNode/MIN_CHAR) &gt; 0 and $fldNode/MIN_CHAR != ''">
            <xsl:if test="$fldNode/TYPE != 'SELECT'">
                <xsl:text>(</xsl:text>
                <xsl:value-of select="$fldNode/MIN_CHAR"></xsl:value-of>
                <xsl:text>)</xsl:text>
            </xsl:if>
        </xsl:if>
    <!--<LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change --><!--
        <xsl:attribute name="FOR">
            <xsl:value-of select="concat($fldNode/DBT,'__',$fldNode/DBC)" />
        </xsl:attribute>
        <xsl:value-of select="$fldNode/LABEL"></xsl:value-of>
    </LABEL>-->
        </oj-label>
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
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
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

<xsl:template name="dispAutoLov">
    <xsl:param name="curr_node"/>
    <xsl:text>disp_auto_lov('</xsl:text>
    <xsl:value-of select="concat(substring($functionId,1,2),'S',substring($functionId,4))"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/DBT)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LABEL)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/LOV/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/TITLE)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/COL_HEADING)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/REDUCTION_FLD_LABELS)"/>
        </xsl:call-template>
    <xsl:text>', this, event)</xsl:text>
</xsl:template>

<xsl:template name="dispLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="onclick"><!--
        <xsl:value-of select="$functionName"/>-->
        <xsl:text>disp_lov('</xsl:text>
        <!--<xsl:value-of select="substring($functionId,1,2)"/>-->
        <xsl:value-of select="concat(substring($functionId,1,2),'S',substring($functionId,4))"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/DBT)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LABEL)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/LOV/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/TITLE)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/COL_HEADING)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)"/>
            </xsl:call-template>
        <xsl:text>', '', event)</xsl:text>
    </xsl:attribute>    
</xsl:template>

		<!-- end of Tmp_SummaryCore.xsl -->
</xsl:stylesheet>
