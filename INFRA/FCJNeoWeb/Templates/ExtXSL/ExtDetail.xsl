<?xml version="1.0"?>
<!--

Author: HITESH VERMA

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131

  **  Modified By          : Sreeni
  **  Modified On          : 16-Apr-2023
  **  Modified Reason   : 
                                      Issue: 1. F8 without doing TAB Out/Click, it is taking Old Data and Failing in STDCUSAC
												2. Ctrl + S is taking Old Data in ACDASFMT.
                                      Cause: Since REDWOOD compatible changes are missing, it is taking Old Data from the screen for an action/event F8(Execute Query) & Ctrl+S(Save) without tabout when data is modified.
                                      Fix Description: Changes made to address REDWOOD compatible issues in below screens for an action/event.
																STDCUSAC - F8(Execute Query)
																ACDASFMT - Ctrl + S (Save)
  **  Search String        : Bug#35271105_REDWOOD
  
**  Modified By          : Selvam Manickam
**  Modified On          : 30-Apr-2023
**  Change Description   : FIELD NAME IS SHOWING FOR SOME TEXT FIELDS IN SCREEN WHEN FIELD LABEL IS NOT GIVEN IN RAD XML FILE. 
**  Search String        : Redwood_35062640

**  Modified By          : Selvam Manickam
**  Modified On          : 11-May-2023
**  Change Description   : Extent conveyor-belt to show extra buttons(callform/subscreen): oj-md-9 to oj-md-10
**  Search String        : REDWOOD_35298529

**  Modified By          : Girish M
**  Modified On          : 11-May-2023
**  Change Description   : Lov field event handling.
**  Search String        : REDWOOD_35307988
 
  **  Modified By          : Selvam Manickam
  **  Modified On          : 11-Aug-2023
  **  Modified Reason      : For this bug issue no 13 only addressed for this fix.
                             13. After input of currency, amount financed, emi amount, etc, now empty the ccy field and tab to amount field and tab out no 	
				 error is thrown (there will also be an issue incase the currency is changed to 3 decimal ccy, in this case also after tab out the rounding wont work). 
  **  Search String        : REDWOOD_35057391 

**  Modified By          : Selvam Manickam
**  Modified On          : 28-Aug-2023
**  Modified Reason      : Redwood Fixes for View Changes
                           SCRIPT ERROR IN USER DEFINED ELEMENT VALUES MAINTENANCE SCREEN
**  Search String        : REDWOOD_35670751

**  Modified By          : Selvam Manickam
**  Modified On          : 31-Aug-2023
**  Change Description   : ASTERISK IS NOT DISPLAYING REQUIRED FIELDS
**  Search String        : REDWOOD_35706761

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:param name="screen"/>
    <xsl:param name="functionId"/>
    <xsl:param name="uiXML"/>
    <xsl:param name="imgPath"/>
    <xsl:param name="displaySize"/>
    <xsl:param name="thirdChar"/>
    <xsl:param name="XslLabels"/>
    <xsl:param name="globalVariables"/>
    <!--12.0.3 Defaulting global variables-->
    <xsl:param name="applicationName"/>
    <xsl:param name="noScript"/>
    <xsl:param name="CurTabId"/>
    <xsl:param name="largeScreenWidth"/>
    <xsl:param name="mediumScreenWidth"/>
    <xsl:param name="screenHeight"/>
    <xsl:param name="dateFormat"/><!--HTML5 Changes-->
	<xsl:param name="dateDelimiterReqd"/> <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes-->

    <!-- Start of ExtLabels.xsl -->
    <xsl:variable name="audit" select="substring-before(substring-after($XslLabels, 'LBL_AUDIT~~'), '@@')"/>
    <xsl:variable name="saveLbl" select="substring-before(substring-after($XslLabels, 'LBL_TOOLBAR_SAVE~~'), '@@')"/>
    <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')"/>
    <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')"/>
    <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')"/>
    <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')"/>
    <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')"/>
    <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_QRY_QUERY~~'), '@@')"/>
    <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_REFRESH~~'), '@@')"/>
    <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESULT~~'), '@@')"/>
    <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKERID~~'), '@@')"/>
    <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_ID~~'), '@@')"/>
    <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORD_STAT~~'), '@@')"/>
    <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')"/>
    <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_A~~'), '@@')"/>
    <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY_U~~'), '@@')"/>
    <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_O~~'), '@@')"/>
    <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_C~~'), '@@')"/>
    <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_UN_AUTH_FLG~~'), '@@')"/>
    <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPEN~~'), '@@')"/>
    <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLOSED~~'), '@@')"/>
    <xsl:variable name="authStat_Audit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_FIELDS~~'), '@@')"/>
    <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPERATOR~~'), '@@')"/>
    <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_VALUE~~'), '@@')"/>
    <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AND~~'), '@@')"/>
    <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ACCEPT~~'), '@@')"/>
    <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_QUERY~~'), '@@')"/>
    <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ORDER_BY~~'), '@@')"/>
    <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ASCENDING~~'), '@@')"/>
    <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DESCENDING~~'), '@@')"/>
    <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TO~~'), '@@')"/>
    <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OR~~'), '@@')"/>
    <xsl:variable name="ok" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="exit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="cancel" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="lock_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUM_LOCK~~'), '@@')"/>
    <xsl:variable name="checkboxYes" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_YES~~'), '@@')"/>
    <xsl:variable name="checkboxNo" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_NO~~'), '@@')"/>
    <xsl:variable name="mandatory" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_MANDATORY~~'), '@@')"/>
    <!--<xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" /> Already coming from parameters -->
    <xsl:variable name="summary" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY~~'), '@@')"/>
    <xsl:variable name="expand_group" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_GROUP~~'), '@@')"/>
    <xsl:variable name="lov" select="substring-before(substring-after($XslLabels, 'LBL_LIST_OF_VALUES~~'), '@@')"/>
    <xsl:variable name="previous" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')"/>
    <xsl:variable name="next" select="substring-before(substring-after($XslLabels, 'LBL_NEXT~~'), '@@')"/>
    <xsl:variable name="first" select="substring-before(substring-after($XslLabels, 'LBL_FIRST~~'), '@@')"/>
    <xsl:variable name="last" select="substring-before(substring-after($XslLabels, 'LBL_LAST~~'), '@@')"/>
    <xsl:variable name="add_row" select="substring-before(substring-after($XslLabels, 'LBL_ADDROW~~'), '@@')"/>
    <xsl:variable name="delete_row" select="substring-before(substring-after($XslLabels, 'LBL_DELETEROW~~'), '@@')"/>
    <xsl:variable name="single_rec_view" select="substring-before(substring-after($XslLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')"/>
    <xsl:variable name="lock" select="substring-before(substring-after($XslLabels, 'LBL_LOCK~~'), '@@')"/>
    <xsl:variable name="columns" select="substring-before(substring-after($XslLabels, 'LBL_COLUMNS~~'), '@@')"/>
    <xsl:variable name="narrative" select="substring-before(substring-after($XslLabels, 'LBL_NARRATIVE~~'), '@@')"/>
    <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')"/>
    <xsl:variable name="select_row" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ROW~~'), '@@')"/>
    <xsl:variable name="reject" select="substring-before(substring-after($XslLabels, 'LBL_REJECT~~'), '@@')"/>
    <xsl:variable name="calendar" select="substring-before(substring-after($XslLabels, 'LBL_CALENDAR~~'), '@@')"/>
    <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')"/>
    <xsl:variable name="empty_col" select="substring-before(substring-after($XslLabels, 'LBL_EMPTY_COLUMN~~'), '@@')"/>
    <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')"/>
    <xsl:variable name="expand_section" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_SECTION~~'), '@@')"/>
    <xsl:variable name="collapse_section" select="substring-before(substring-after($XslLabels, 'LBL_COLLAPSE_SECTION~~'), '@@')"/>
    <!-- added for 17388325 start -->
    <xsl:variable name="currentVersion" select="substring-before(substring-after($XslLabels, 'LBL_CURRENT_VERSION~~'), '@@')"/>
    <xsl:variable name="totalVersion" select="substring-before(substring-after($XslLabels, 'LBL_TOTAL_VERSION~~'), '@@')"/>
	<xsl:variable name ="screenWidth">
	 <xsl:choose>
          <xsl:when test="$l_scr_type = 'L'">
		  <xsl:value-of select="number($largeScreenWidth) - 2"></xsl:value-of><!--HTML5 Changes -->
		  </xsl:when>
		   <xsl:otherwise>
		    <xsl:value-of select="number($mediumScreenWidth) "></xsl:value-of>
			</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<xsl:variable name ="labelWidth">
	 <xsl:choose>
          <xsl:when test="$l_scr_type = 'L'">
		  <xsl:value-of select="0.40 * (number($screenWidth) div 3 )"></xsl:value-of>
		  </xsl:when>
		   <xsl:otherwise>
		    <xsl:value-of select="0.40 * (number($screenWidth) div 2) "></xsl:value-of>
			</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<!-- added for 17388325 END -->
    <!-- End of ExtLabels.xsl -->
    <!-- Start of ExtSection.xsl -->
    <!--Start of ExtSubPartition.xsl-->
    <xsl:template name="sprtHandler">
    
        <xsl:param name="subpartCount" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
        <xsl:param name="footer" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:if test="$footer != 'Y'">
        
            <xsl:if test="$SPRT_Index &lt;= $subpartCount">
                <DIV>
                <xsl:attribute name="class">
                    <xsl:if test="$partWidth = '66'">
                        <xsl:value-of select="'oj-sm-width-1/2'"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="$partWidth != '66'">
                        <xsl:value-of select="'oj-sm-width-1/3'"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
                    <!-- screen width change end -->
                    <!-- 12.0.3 Enable/Disable Screen Element starts -->
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat(../../../@ID,'__',../../@ID,'__',../@ID,'__',@ID,'__',$SPRT_Index)"/>
                    </xsl:attribute>
                    <!-- 12.0.3 Enable/Disable Screen Element ends -->
                    <xsl:call-template name="FldSetTypeHandler">
                        <xsl:with-param name="sprtReqd" select="'Y'"/>
                        <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                    </xsl:call-template>
                    </oj-form-layout>
                </DIV>
                <xsl:call-template name="sprtHandler">
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index + 1"/>
                    <xsl:with-param name="subpartCount" select="$subpartCount"/>
                    <xsl:with-param name="footer" select="'N'"/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="$footer = 'Y'">
            <xsl:if test="$SPRT_Index &lt;= $subpartCount">
                <!--<td>-->
                <div class="oj-sm-width-1/8 oj-flex-item " block="{./BLOCK}" type="{@TYPE}" view="{@VIEW}">
				    <xsl:if test="LBL != ''">
                <xsl:attribute name="class">
                    <xsl:value-of select="''"/>
                </xsl:attribute>
            </xsl:if>
                    <h4 class="">
                        <xsl:value-of select="LBL"/>
                    </h4>
                    <xsl:call-template name="FldSetTypeHandler">
                        <xsl:with-param name="sprtReqd" select="'Y'"/>
                        <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                    </xsl:call-template>
                    <!--</td>-->
                </div>
                <xsl:call-template name="sprtHandler">
                    <xsl:with-param name="footer" select="'Y'"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index + 1"/>
                    <xsl:with-param name="subpartCount" select="$subpartCount"/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:if>
        
    </xsl:template>
    <!--End of ExtSubPartition.xsl-->
    <!--Start of ExtFldsetType.xsl-->
    <!-- Start of ExtMultiple.xsl -->
    <xsl:template name="MEHandler">
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="halfWidth" select="(1 div 2)"/>
        <xsl:variable name="twoThirdWidth" select="(2 div 3)"/>
        <xsl:variable name="multipleWidth">
            <xsl:choose>
                <xsl:when test="$partWidth = '100'">
                    <xsl:value-of select="'oj-sm-width-full sectionPanel'"/>
                </xsl:when>
                <xsl:when test="$partWidth = '66'">
                    <xsl:value-of select="'oj-sm-width-2/3 sectionPanel'"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="'oj-sm-width-1/3 sectionPanel'"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="multipleHeight">
            <xsl:choose>
                <xsl:when test="normalize-space(./HEIGHT) = ''">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:when test="string(number(./HEIGHT)) = 'NaN'">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="string(number(./HEIGHT))"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
         <xsl:call-template name="generateMEHeaderScript">
                <xsl:with-param name="multipleEntryNode" select="."/>
         </xsl:call-template>
         <div name="dataContainer" id="dataContainer_{./BLOCK}">
           <div class="oj-flex-bar oj-sm-align-items-center" onkeydown="return addRowShortcut('{./BLOCK}', event);">
                <!--Fix for 18532714 starts-->
                <xsl:if test="count(./LBL) > 0 and ./LBL != ''">
                    <h4 class="oj-flex-bar-start ">
                        <xsl:value-of select="./LBL"/>
                    </h4>
                </xsl:if>
                <div class="oj-flex-bar-end">
                  <xsl:call-template name="MultipleHandler_Nav_tmp">
                    <xsl:with-param name="curr_blk" select="."/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template> 
                </div>
          </div>
          <div id="{./BLOCK}_tableContainer">
                 <oj-bind-if test="{{showTable}}">
                    <oj-table cellspacing="0"   ID="{./BLOCK}" caption="{./LBL}" type="ME"
                              summary="{./LBL}" role="presentation" display="grid" class="oj-sm-width-full oj-sm-margin-2x-vertical oj-density-compact">
                        <xsl:attribute name="selection-mode">
                                                    <xsl:text>{"row": "multiple"}</xsl:text>
                                            </xsl:attribute>
                        <!--<xsl:attribute name="scroll-policy-options">
                                                    <xsl:text>{"fetchSize": 10}</xsl:text>
                                            </xsl:attribute>-->
                        <xsl:attribute name="columns">
                                                    <xsl:text>{{</xsl:text>
                                                      <xsl:value-of select="./BLOCK"/>
                                                    <xsl:text>columnArray}}</xsl:text>  
                                                     
                                            </xsl:attribute>
                        <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./BLOCK"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                        <xsl:attribute name="DBT">
                            <xsl:value-of select="./BLOCK"/>
                        </xsl:attribute>
                        <xsl:attribute name="pgsize">
                            <xsl:if test="count(./PGSIZE) = 0">
                                <xsl:value-of select="15"/>
                            </xsl:if>
                            <xsl:if test="count(./PGSIZE) != 0">
                                <xsl:value-of select="./PGSIZE"/>
                            </xsl:if>
                        </xsl:attribute>
                        
                         <!--<xsl:if test=" (count(./READ_ONLY) > 0 and ./READ_ONLY = -1)">
                              <xsl:attribute name="READONLYME">
                                <xsl:text>Y</xsl:text>
                            </xsl:attribute>
                         </xsl:if>-->
                        
                        <!--<xsl:apply-templates select="EVENT" mode="template"/>
                            <xsl:call-template name="MultipleHandler_tmp">
                                <xsl:with-param name="curr_blk" select="."/>
                                <xsl:with-param name="mWidth" select="$multipleWidth"/>
                                <xsl:with-param name="mHeight" select="$multipleHeight"/>
                                <xsl:with-pZaram name="partWidth" select="$partWidth"/>
                            </xsl:call-template>-->
                        <template_tmp slot='rowTemplate' data-oj-as='row' >
                            <tr onclick="fnMulipleEntryRow_onClick(event)">
                                <xsl:for-each select="./FIELD"> 
                                     <xsl:apply-templates select="TYPE" mode="template"/>
                                </xsl:for-each>
                            </tr>
                        </template_tmp>
                        <template slot='rowTemplate' data-oj-as='row'>
                            <tr onclick="fnMulipleEntryRow_onClick(event)" onkeydown="return addRowShortcut('{./BLOCK}', event);">
                                <xsl:for-each select="./FIELD">
                                     <xsl:apply-templates select="TYPE" mode="template"/>
                                </xsl:for-each>
                            </tr>
                        </template>
                          <oj-paging-control id="paging_{./BLOCK}"     slot="bottom" onclick="handleOjetMEPagination(event,{./BLOCK})">
                 <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./BLOCK"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                                              <xsl:attribute name="page-size">
                                                <xsl:if test="count(./PGSIZE) = 0">
                                                    <xsl:value-of select="15"/>
                                                </xsl:if>
                                                <xsl:if test="count(./PGSIZE) != 0">
                                                    <xsl:value-of select="./PGSIZE"/>
                                                </xsl:if>
                                                </xsl:attribute>
                  </oj-paging-control>
                    </oj-table>
                
             </oj-bind-if>
          </div>
         </div>
        
      </xsl:template>
      
<xsl:template name="generateMEHeaderScript">
    <xsl:param name="multipleEntryNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     <xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>columnArray = [];
     <xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>fieldObj= screenKo.observableArray([]); 
    
     multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>'] = {};
    <xsl:for-each select="$multipleEntryNode/FIELD">
         <xsl:variable name="colName" select="NAME"/>
      <xsl:variable name="maxLength" select="number(SIZE)"/>
          
        <xsl:if test="TYPE != 'DATE' and count(SIZE) != 0">
      var obj = {
          'headerText': "<xsl:value-of select="LBL"/>",
          'field': "<xsl:value-of select="NAME"/>",
          'minWidth': "<xsl:value-of select="string($maxLength)"/>px",
		   'resizable': "enabled"
        };
      </xsl:if>
      <xsl:if test="TYPE = 'DATE'">
        var obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "10%"};
          </xsl:if>
         <xsl:if test="TYPE= 'SELECT'">
        var obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "18%"};
          </xsl:if>

           <xsl:if test="REQD='-1'">
           var obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "10%","showRequired": true,
                          maxWidth: "25%"};
            </xsl:if>	
             <xsl:if test="TYPE = 'HIDDEN'">
               obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" ,'headerStyle':'display:none'};
           </xsl:if>
            <xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>columnArray.push(obj);
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] =null;
        <xsl:if test="(TYPE = 'TEXT' or TYPE = 'TEXTAREA' or TYPE = 'SELECT' or TYPE = 'ROSELECT' ) and DTYPE != 'NUMBER'">
            <xsl:if test="count(VALUE) = 0 or VALUE = ''">
                multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] = '';
            </xsl:if>
        </xsl:if>
          <xsl:if test="count(VALUE) > 0 and VALUE != ''">
           <xsl:variable name="trimmedValue" select="normalize-space(VALUE)"/>
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] ='<xsl:value-of select="$trimmedValue"/>';
          </xsl:if>
           <xsl:if test="TYPE = 'CHECKBOX' and count(CHECKED) > 0 and CHECKED != ''">
            <xsl:if test="CHECKED = 'Y'">
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] =true;
            </xsl:if>
             <xsl:if test="CHECKED = 'N'">
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] =false;
            </xsl:if>
           </xsl:if>
        </xsl:for-each>
    multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>']['readOnly'] = true;
    meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>'] = screenKo.observableArray([]);
    
    <xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>dataprovider=screenKo.observable( new pagingDataProviderView(new tempArrayDataProvider(meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/BLOCK"></xsl:value-of>'])));
       
    </script>
</xsl:template>
  
      
    <xsl:template name="MEHandler_OLD">
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="halfWidth" select="(1 div 2)"/>
        <xsl:variable name="twoThirdWidth" select="(2 div 3)"/>
        <xsl:variable name="multipleWidth">
            <xsl:value-of select="$twoThirdWidth"/>
        </xsl:variable>
        <xsl:variable name="multipleHeight">
            <xsl:choose>
                <xsl:when test="normalize-space(./HEIGHT) = ''">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:when test="string(number(./HEIGHT)) = 'NaN'">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="string(number(./HEIGHT))"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div name="dataContainer" id="dataContainer_{./BLOCK}">
            <!--<xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />-->
            <xsl:choose>
                <xsl:when test="count(@HIDDEN) > 0 and @HIDDEN='Y'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'dispNone'"/>
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleBig'"/>
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMedium'"/>
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '66'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMedium'"/>
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleSmall'"/>
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            <!--Changes for header in ME screen-->
            <div class="DIVmultiplebox" onkeydown="return addRowShortcut('{./BLOCK}', event);">
                <!--Fix for 18532714 starts-->
                <xsl:if test="count(./LBL) > 0 and ./LBL != ''">
                    <h2>
                        <xsl:value-of select="./LBL"/>
                    </h2>
                </xsl:if>
                <!--Fix for 18532714 ends-->
                <!-- Changes for header in ME screen start-->
                <xsl:call-template name="MultipleHandler_Nav_tmp">
                    <xsl:with-param name="curr_blk" select="."/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template>
                <!-- Changes for header in ME screen end-->
                <!--Static header change start-->
                <div name="MEContainer" class="MEContainer">
                    <div name="headerContainer" style="overflow-x:hidden;overflow-y:scroll;"> <!--9NT1606_14_0_RETRO_12_3_27491027 added style-->
					   
                        <xsl:choose>
                            <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleBigInnerH DIVTblHeader'"/>
                            </xsl:attribute>
                        </xsl:when>
                            <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInnerH DIVTblHeader'"/>
                            </xsl:attribute>
                        </xsl:when>
                            <xsl:when test="$partWidth = '66'">
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInnerH DIVTblHeader'"/>
                            </xsl:attribute>
                        </xsl:when>
                            <xsl:otherwise>
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleSmallInnerH DIVTblHeader'"/>
                            </xsl:attribute>
                        </xsl:otherwise>
                        </xsl:choose>
                        <table border="0" cellspacing="0" cellpadding="0" ID="{./BLOCK}Header" caption="{./LBL}" class="TBLgrid" type="ME" name="MEHeader" summary="{./LBL}" role="presentation">
                            <xsl:attribute name="DBT">
                        <xsl:value-of select="./BLOCK"/>
                    </xsl:attribute>
                            <xsl:call-template name="MultipleHandler_Header_tmp">
                                <xsl:with-param name="curr_blk" select="."/>
                                <xsl:with-param name="mWidth" select="$multipleWidth"/>
                                <xsl:with-param name="mHeight" select="$multipleHeight"/>
                                <xsl:with-param name="partWidth" select="$partWidth"/>
                            </xsl:call-template>
                        </table>
                    </div>
                </div>
                <!--Static header change end-->
                <div id="{./BLOCK}_tableContainer" style="Height:{$multipleHeight}px;" onscroll="toggleSelectBoxes(this,'{./BLOCK}Header')"><!--Fix for 21619139 -->
                    <xsl:choose>
                        <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleBigInner'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInner'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '66'">
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInner'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleSmallInner'"/>
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                    <!--Change for header in ME screen-->
                    <oj-bind-if test="{{showTable}}">
                     <oj-table cellpadding="0" ID="{./BLOCK}"       caption="{./LBL}"   type="ME" summary="{./LBL}" role="presentation">
					<!--<xsl:attribute name="style">
						<xsl:text>width:</xsl:text>
						<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 10)"/>
						<xsl:text>px;Height:</xsl:text>
						<xsl:value-of select="$multipleHeight"/>
						<xsl:text>px</xsl:text>
					</xsl:attribute> -->
					<xsl:attribute name="selection-mode">
						<xsl:text>{"row": "multiple"}</xsl:text>
					</xsl:attribute>
					<!--<xsl:attribute name="scroll-policy-options">
						<xsl:text>{"fetchSize": 10}</xsl:text>
					</xsl:attribute>-->
					<xsl:attribute name="columns">
						<xsl:text>{{</xsl:text>
						  <xsl:value-of select="./BLOCK"/>
						<xsl:text>columnArray}}</xsl:text>  
						 
					</xsl:attribute>
					<xsl:attribute name="data">
						<xsl:text>[[</xsl:text>
						<xsl:value-of select="./BLOCK"/>
						<xsl:text>dataprovider]]</xsl:text> 
					</xsl:attribute>
					
                        <xsl:attribute name="DBT">
                        <xsl:value-of select="./BLOCK"/>
                    </xsl:attribute>
                        <xsl:attribute name="pgsize">
                        <xsl:if test="count(./PGSIZE) = 0">
                            <xsl:value-of select="15"/>
                        </xsl:if>
                        <xsl:if test="count(./PGSIZE) != 0">
                            <xsl:value-of select="./PGSIZE"/>
                        </xsl:if>
                    </xsl:attribute>
                        <xsl:apply-templates select="EVENT" mode="template"/>
                        <xsl:call-template name="MultipleHandler_tmp">
                            <xsl:with-param name="curr_blk" select="."/>
                            <xsl:with-param name="mWidth" select="$multipleWidth"/>
                            <xsl:with-param name="mHeight" select="$multipleHeight"/>
                            <xsl:with-param name="partWidth" select="$partWidth"/>
                        </xsl:call-template>
                    </oj-table>
                    </oj-bind-if>
                </div>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="MultipleHandler_Nav_tmp">
        <xsl:param name="curr_blk" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="mHgt">
          <xsl:choose>
                <xsl:when test="normalize-space($curr_blk/HEIGHT) = ''">
              <xsl:value-of select="150"/>
            </xsl:when>
                <xsl:when test="string(number($curr_blk/HEIGHT)) = 'NaN'">
              <xsl:value-of select="150"/>
            </xsl:when>
                <xsl:otherwise>
              <xsl:value-of select="normalize-space($curr_blk/HEIGHT)"/>
            </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <!--Pagination of ME -->
        <!--<div class="DIVpage">
            <span class="DIVpageH">-->
        <!-- Changes for Header in ME screen start-->
        <div onkeydown="return addRowShortcut('{./BLOCK}', event);">
            <!-- Fix for 19463838 -->
            <!--<xsl:choose>
                <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
                  <xsl:attribute name="class">
                      <xsl:value-of select="'DIVGridME DIVGridBigInner'"/>
                  </xsl:attribute>
              </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
              </xsl:when>
                <xsl:when test="$partWidth = '66'">
              </xsl:when>
                <xsl:otherwise>
                <xsl:attribute name="class">
                  <xsl:value-of select="'DIVGridME DIVGridSmallInner'"/>
                </xsl:attribute>
              </xsl:otherwise>
            </xsl:choose>-->
            <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) > 0 and $curr_blk/READ_ONLY != -1)">
               <oj-button slot="end" display="icons" chroming="borderless"  name="cmdAddRow_{$curr_blk/BLOCK}" id="cmdAddRow_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnAddRow('{$curr_blk/BLOCK}')" title="{$add_row}" disabled="true">
                    <span slot='startIcon' class="oj-ux-ico-plus">
                        <span class="LBLinv">
                            <xsl:value-of select="$add_row"/>
                        </span>
                    </span>
                </oj-button>
                <oj-button slot="end"  display="icons" chroming="borderless"   name="cmdDelRow_{$curr_blk/BLOCK}" id="cmdDelRow_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnDeleteRow('{$curr_blk/BLOCK}')" title="{$delete_row}" disabled="true">
                    <span slot='startIcon' class="oj-ux-ico-minus">
                        <span class="LBLinv">
                            <xsl:value-of select="$delete_row"/>
                        </span>
                    </span>
                </oj-button>
            </xsl:if>
            <oj-button  slot="end"  display="icons" chroming="borderless"   name="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" id="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnShowSingleViewForME('{$curr_blk/BLOCK}')" title="{$single_rec_view}" disabled="true">
                <span slot='startIcon' class="oj-ux-ico-list">
                    <span class="LBLinv">
                        <xsl:value-of select="$single_rec_view"/>
                    </span>
                </span>
            </oj-button>
        </div>
    </xsl:template>
    <!--Static header change start-->
    <xsl:template name="MultipleHandler_Header_tmp">
       <xsl:param name="curr_blk" select="."/>
        <xsl:param name="mWidth" select="."/>
        <xsl:param name="mHeight" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="spanCnt">
            <xsl:value-of select="count($curr_blk/FIELD)+2"/>
        </xsl:variable>
        <colgroup span="{$spanCnt}"></colgroup>
        <tbody>
            <tr>
                <xsl:if test="count(./BLOCK) >= 1">
                <xsl:attribute name="DBT">
                    <xsl:value-of select="./BLOCK"/>
                </xsl:attribute>
            </xsl:if>
                <td class="THgrid1" scope="col">
                    <div>
                        <!--Change for ME screen--><!--HTML5 Changes Start-->
                        <label for="{./BLOCK}Header_CHK_ME" class="LBLChkRadSel NewChkbox">
                            <span class="LBLinv">
                                <xsl:value-of select="$select_all_rows"/>
                            </span>
                            <input type="checkbox" id="{./BLOCK}Header_CHK_ME" OnClick="fnToggleAllOrNoneME('{./BLOCK}',this, event)" title="{$select_all_rows}"/>
                            <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016-->
                        </label><!--HTML5 Changes End-->
                    </div>
                </td>
                <xsl:for-each select="$curr_blk/FIELD">
                <xsl:if test="(count(./HIDDEN) >= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                    <td class="TDnone">
                            <div></div>
                        </td>
                </xsl:if>
                <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                    <td class="THgrid" scope="col">
                            <xsl:if test="count(./DD) > 0 and ./DD = -1">
                                    <xsl:if test="count(./REQD) = 0 or ./REQD != -1">
                                        <div>
                                        <span class="SPNtext">
                                            <xsl:value-of select="./LBL"/>
                                        </span>
                                    </div><!--static header change -->
                                    </xsl:if>
                                    <xsl:if test="./REQD = -1">
                                        <div>
                                        <span class="SPNtext star">
                                            <xsl:value-of select="./LBL"/>
                                        </span>
                                    </div><!--static header change -->
                                    </xsl:if>                      
                            </xsl:if>
                            <xsl:if test="count(./DD) = 0">
                                    <xsl:if test="count(./REQD) = 0 or ./REQD != -1">
                                        <div>
                                        <span class="SPNtext">
                                            <xsl:value-of select="./LBL"/>
                                        </span>
                                    </div><!--static header change -->
                                    </xsl:if>
                                    <xsl:if test="./REQD = -1">
                                        <div>
                                        <span class="SPNtext star">
                                            <xsl:value-of select="./LBL"/>
                                        </span>
                                    </div><!--static header change -->
                                    </xsl:if>                      
                            </xsl:if>
                        </td>
                </xsl:if>
            </xsl:for-each>
                <td class="THgrid" width="99%">
                  <div></div>
                </td>
            </tr>
        </tbody>
    </xsl:template>
    <!--Static header change end-->
    <xsl:template name="MultipleHandler_tmp">
        <xsl:param name="curr_blk" select="."/>
        <xsl:param name="mWidth" select="."/>
        <xsl:param name="mHeight" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="spanCnt">
            <xsl:value-of select="count($curr_blk/FIELD)+2"/>
        </xsl:variable>
        <tbody>
            <tr style="vertical-align:middle">
                <td class="TDgrid1" scope="row"><div>
                        <label class="LBLChkRadSel NewChkbox"><!--HTML5 Changes-->
                            <xsl:attribute name="for">
                        <xsl:value-of select="concat('chkDeleteRow__',./BLOCK)"></xsl:value-of>
                    </xsl:attribute>
                            <span class="LBLinv">
                                <xsl:value-of select="$select_row"/>
                            </span>
                            <input name="chkDeleteRow" type="checkbox" parentDBT="{./BLOCK}" onclick="fnMulipleEntryRow_onClick(event)" title="{$select_row}">
                                <xsl:attribute name="id">
                            <xsl:value-of select="concat('chkDeleteRow__',./BLOCK)"></xsl:value-of>
                        </xsl:attribute>
                            </input>
                            <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
                        </label>
                    </div>
                </td>
                <xsl:for-each select="./FIELD">
                    <xsl:apply-templates select="TYPE" mode="template"/>
                </xsl:for-each>
                <td ><div><xsl:text disable-output-escaping="yes">&#160;</xsl:text></div></td>
                <!--Static header change-->
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="{$spanCnt}" ><a class="vHidden" href="#"><xsl:value-of select="$end_table"/></a><!--HTML5 changes 2/NOV/2016 fix for 24940888-->
                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </td>
            </tr> <!-- Fix for 19463838 -->
        </tfoot>
    </xsl:template>
    <!-- End of ExtMultiple.xsl -->
    <xsl:template name="FldSetTypeHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
         <!--<oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" >-->
        <xsl:if test="@TYPE = 'SE'">
            <xsl:call-template name="SEHandler">
                <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
            </xsl:call-template>
        </xsl:if>
        
        <xsl:if test="@TYPE = 'ME' and @VIEW='ME'">
            <xsl:call-template name="MEHandler">
                <xsl:with-param name="partWidth" select="../@WIDTH"/>
            </xsl:call-template>
        </xsl:if>
        
        <xsl:if test="@TYPE = 'ME' and @VIEW='SE'">
                <xsl:call-template name="MESVHandler">
                <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
            </xsl:call-template>
            </xsl:if>
        
        <xsl:if test="@TYPE = 'VC'">
            <xsl:call-template name="VCHandler"/>
        </xsl:if>
         <!--</oj-form-layout>        -->
    </xsl:template>
    <xsl:template name="SEHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/> <!-- Count will indicate the current sp no!-->
        <xsl:if test="$sprtReqd = 'N'">
            <xsl:apply-templates select="FIELD" mode="withoutSubPart">
                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </xsl:if>
        <xsl:if test="$sprtReqd = 'Y'">
            <xsl:apply-templates select="FIELD[@SPRT = $SPRT_Index]" mode="withSubPart">
                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </xsl:if>
    </xsl:template>
    <xsl:template name="MESVHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
        <xsl:variable name="blkId" select="./BLOCK"/>
        <xsl:variable name="blockId">
            <xsl:if test="contains($blkId,'_TMP')">
                <xsl:value-of select="substring-before($blkId,'_TMP')"/>
            </xsl:if>
            <xsl:if test="not(contains($blkId,'_TMP'))">
                <xsl:value-of select="$blkId"/>
            </xsl:if>
        </xsl:variable>
        <DIV ID="" type="ME" VIEW="SE">
            <xsl:if test="count(./NAV_BTN_REQ) > 0 and ./NAV_BTN_REQ = 'Y'">
                <xsl:if test="$sprtReqd = 'Y'">
                    <xsl:if test="$SPRT_Index = 1">
                        <xsl:if test="count(./READ_ONLY) > 0 and ./READ_ONLY = -1">
                            <div id="MESV_{$blockId}" class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end">
                               <oj-button slot="end"  display="icons" chroming="borderless" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-triangle-left-s">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$previous"/>
                                        </span>
                                    </span>
                                </oj-button>
                                <div class="oj-flex oj-sm-align-items-center">
                                <span id="CurrPageSV__{$blockId}" name="CurrPage__{$blockId}">
                                    1
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </span>
                                <span>
                                    <xsl:value-of select="$of_SummaryAudit"/>
                                </span>
                                <span id="TotPageSV__{$blockId}" name="TotPage__{$blockId}">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    1
                                </span>
                                </div>
                                <oj-button slot="end"  display="icons" chroming="borderless" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-triangle-right-s">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$next"/>
                                        </span>
                                    </span>
                                </oj-button>
                            </div>
                        </xsl:if>
                        <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                            <div id="MESV_{$blockId}" class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end">
                                <oj-button slot="end"  display="icons" chroming="borderless" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-triangle-left-s">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$previous"/>
                                        </span>
                                    </span>
                                </oj-button>
                                <div class="oj-flex oj-sm-align-items-center">
                                <span id="CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}">
                                    1
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </span>
                                <span>
                                    <xsl:value-of select="$of_SummaryAudit"/>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </span>
                                <span id="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}">1</span>
                                </div>
                                <oj-button slot="end"  display="icons" chroming="borderless" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-triangle-right-s">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$next"/>
                                        </span>
                                    </span>
                                </oj-button>
                                <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" disabled="true" onClick="fnAddRowMESV('{$blockId}')">
                                    <span slot='startIcon' class="oj-ux-ico-plus">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$add_row"/>
                                        </span>
                                    </span>
                                </oj-button>
                                <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$delete_row}" name="BTN_REMOVE_{$blockId}" disabled="true" onClick="fnDelRowMESV('{$blockId}')">
                                    <span slot='startIcon' class="oj-ux-ico-minus">
                                        <span class="LBLinv">
                                            <xsl:value-of select="$delete_row"/>
                                        </span>
                                    </span>
                                </oj-button>
                            </div>
                        </xsl:if>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="$sprtReqd != 'Y'">
                    <xsl:if test="count(./READ_ONLY) > 0 and ./READ_ONLY = -1">
                        <div id="MESV_{$blockId}" class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end">
                            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                <span slot="startIcon" class="oj-ux-ico-triangle-left-s">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$previous"/>
                                    </span>
                                </span>
                            </oj-button>
                            <div class="flex oj-sm-align-items-center">
                            <span id="CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}">
                                1
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </span>
                            <span>
                                <xsl:value-of select="$of_SummaryAudit"/>
                            </span>
                            <span id="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}">
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                1
                            </span>
                            </div>
                            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                <span slot="startIcon" class="oj-ux-ico-triangle-right-s">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$next"/>
                                    </span>
                                </span>
                            </oj-button>
                        </div>
                    </xsl:if>
                    <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                        <div id="MESV_{$blockId}" class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end">
                            <oj-button slot="end"  display="icons" chroming="borderless" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                <span slot="startIcon" class="oj-ux-ico-triangle-left-s">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$previous"/>
                                    </span>
                                </span>
                            </oj-button>
                            <div class="oj-flex oj-sm-align-items-center">
                            <span id="CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}">
                                1
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </span>
                            <span>
                                <xsl:value-of select="$of_SummaryAudit"/>
                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </span>
                            <span id="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}">1</span>
                            </div>
                            <oj-button slot="end"  display="icons" chroming="borderless" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                <span slot="startIcon" class="oj-ux-ico-triangle-right-s">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$next"/>
                                    </span>
                                </span>
                            </oj-button>
                           <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" disabled="true" onClick="fnAddRowMESV('{$blockId}')">
                                <span slot="startIcon" class="oj-ux-ico-plus">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$add_row"/>
                                    </span>
                                </span>
                            </oj-button>
                            <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$delete_row}" name="BTN_REMOVE_{$blockId}" disabled="true" onClick="fnDelRowMESV('{$blockId}')">
                                <span slot="startIcon" class="oj-ux-ico-minus">
                                    <span class="LBLinv">
                                        <xsl:value-of select="$delete_row"/>
                                    </span>
                                </span>
                            </oj-button>
                        </div>
                    </xsl:if>
                </xsl:if>
                <xsl:call-template name="SEHandler">
                    <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="count(./NAV_BTN_REQ) = 0 or ./NAV_BTN_REQ != 'Y'">
                <xsl:call-template name="SEHandler">
                    <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                </xsl:call-template>
            </xsl:if>
        </DIV>
    </xsl:template>
    <xsl:template name="VCHandler">
        <div id="DIVVerisonBtns">
            <button class="BTNicon2D" tabindex="-1" onclick="fnChangeVersion('First')" LABEL_VALUE="" ID="BTN_FIRST_VER" DBT="" DBC="" DTYPE="" name="BTN_FIRST_VER" title="{$first}" disabled="true" version_control="Y">
                <span tabindex="-1" class="ICOfirst">
                    <span class="LBLinv">
                        <xsl:value-of select="$first"/>
                    </span>
                </span>
            </button>
            <button class="BTNicon2D" tabindex="-1" onclick="fnChangeVersion('Previous')" LABEL_VALUE="" ID="BTN_PREV_VER" DBT="" DBC="" DTYPE="" name="BTN_PREV_VER" title="{$previous}" disabled="true" version_control="Y">
                <span tabindex="-1" class="oj-ux-ico-caret-left">
                    <span class="LBLinv">
                        <xsl:value-of select="$previous"/>
                    </span>
                </span>
            </button>
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'VERNO'">
                    <oj-label slot="label" class="LBLstd" for="{../BLOCK}__{./NAME}"></oj-label>
                    <input type="text" class="TXTro" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <!--<label class="LBLstd" for="" style="width:{$labelWidth}px;"></label>--> 
            <span class="SPNtext" id="gotooflabel">
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                   <xsl:value-of select="$vernoOfLbl"/>
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </span>
            <!--<input type="text" class="TXTro" value="{$vernoOfLbl}" size="1" READONLY="true" READONLY1="true"/>-->
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'LASTVERNO'">
                    <oj-label slot="label" class="LBLstd" for="{../BLOCK}__{./NAME}"></oj-label>
                    <input type="text" class="TXTro" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="LASTVERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <button class="BTNicon2D" tabindex="-1" onclick="fnChangeVersion('Next')" LABEL_VALUE="" ID="BTN_NEXT_VER" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER" title="{$next}" disabled="true" version_control="Y">
                <span class="oj-ux-ico-caret-right">
                    <span class="LBLinv">
                        <xsl:value-of select="$next"/>
                    </span>
                </span>
            </button>
            <button class="BTNicon2D" tabindex="-1" onclick="fnChangeVersion('Last')" LABEL_VALUE="" ID="BTN_LAST_VER" DBT="" DBC="" DTYPE="" name="BTN_LAST_VER" title="{$last}" disabled="true" version_control="Y">
                <span class="ICOlast">
                    <span class="LBLinv">
                        <xsl:value-of select="$last"/>
                    </span>
                </span>
            </button>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <oj-label slot="label"></oj-label>
            <input id="Goto_version" type="text" size="1" class="TXTstd" value="" disabled="true"/>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <button class="BTNtextD" title="{$gotoPage_SummaryAudit}" ID="BTN_GO_VER" name="BTN_GO_VER" value="Go" onclick="fnChangeVersion('GOTO')" disabled="true" version_control="Y">
                <xsl:value-of select="$gotoPage_SummaryAudit"/>
            </button>
        </div>
    </xsl:template>
    <!--End of ExtFldsetType.xsl-->
    <!--Start of ExtFields.xsl-->
     <xsl:template match="FIELD" mode="hFieldSetLabel">
        <xsl:if test="position() = 1">
            <xsl:if test="LBL = '' or TYPE='HIDDEN' or TYPE='BUTTON'">
                <xsl:attribute name="label-width">0px</xsl:attribute>
            </xsl:if>
        <!--<xsl:if test="./FIELD/LBL = ''">
                <xsl:attribute name="label-width">0px</xsl:attribute>
                </xsl:if>-->
            <xsl:if test="TYPE != 'BUTTON'">
                <oj-label slot="label"> 
				<!--REDWOOD_35706761 start-->				
				  <xsl:if test="count(../FIELD/REQD) > 0 and ../FIELD/REQD = '-1'">
                  <xsl:attribute name="show-required">true</xsl:attribute>
			       </xsl:if>
				<!--REDWOOD_35706761 end-->
                    <xsl:attribute name="FOR">
                        <xsl:if test="../BLOCK != ''">
                             <xsl:value-of select="concat(../BLOCK,'__',NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="BLOCK = ''">
                             <xsl:value-of select="NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:if test="TYPE != 'BUTTON' and TYPE != 'HIDDEN'">
                        <xsl:value-of select="LBL"/>
                    </xsl:if>
						
					
					
                </oj-label>
            </xsl:if>
	</xsl:if>
    </xsl:template>
    <xsl:template match="FIELD" mode="hFieldSet">
            <!--<xsl:if test="position() = 1">
	<xsl:attribute name="style">
			<xsl:text>margin:0px;</xsl:text>
	</xsl:attribute>
	</xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
        <xsl:if test="TYPE = 'HIDDEN'">
            <xsl:attribute name="class"></xsl:attribute>
        </xsl:if>-->
        <xsl:apply-templates select="TYPE" mode="template_fldset">
            <xsl:with-param name="l_pos" select="position()"/>
        </xsl:apply-templates>
        <!--</div>-->
    </xsl:template>
    <xsl:template match="FIELD" mode="withoutSubPart">
        <xsl:if test="./TYPE != 'CHECKBOX' and ./TYPE != 'RADIO'">
            <div class="oj-sm-width-full" onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'RADIO'">
            <div class="oj-sm-width-full" role="group" onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!--Radio changes -->
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:attribute name="aria-labelledby"><!--1203 oghag fix start -->
                 <xsl:if test="./../BLOCK != ''">
                         <xsl:value-of select="concat('grprad_',./../BLOCK,'__',./NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="./../BLOCK = ''">
                         <xsl:value-of select="concat('grprad_',./../NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <!--1203 oghag fix end -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'CHECKBOX'">
            <div class="oj-sm-width-full" role="group" onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!--Checkbox changes -->
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:attribute name="aria-labelledby"><!--1203 oghag fix start -->
                 <xsl:if test="./../BLOCK != ''">
                         <xsl:value-of select="concat('grpcheck_',./../BLOCK,'__',./NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="./../BLOCK = ''">
                         <xsl:value-of select="concat('grpcheck_',./../NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <!--1203 oghag fix end -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD" mode="withSubPart">
        <xsl:if test="./TYPE != 'CHECKBOX' and ./TYPE != 'RADIO'">
            <div onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'RADIO'">
            <div class="oj-sm-width-full" role="group" onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:attribute name="aria-labelledby"><!--1203 oghag fix start -->
                 <xsl:if test="./../BLOCK != ''">
                         <xsl:value-of select="concat('grprad_',./../BLOCK,'__',./NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="./../BLOCK = ''">
                         <xsl:value-of select="concat('grprad_',./NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <!--1203 oghag fix end -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'CHECKBOX'">
            <div role="group" onclick="mainWin.fnUpdateScreenSaverInterval();">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:attribute name="aria-labelledby"><!--1203 oghag fix start -->
                 <xsl:if test="./../BLOCK != ''">
                         <xsl:value-of select="concat('grpcheck_',./../BLOCK,'__',./NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="./../BLOCK = ''">
                         <xsl:value-of select="concat('grpcheck_',./NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <!--1203 oghag fix end -->
                <xsl:call-template name="dispFields_tmp"/>
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="dispFields_tmp">
        <xsl:apply-templates select="TYPE" mode="template"/>
    </xsl:template>
    <xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='PRODUCT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT' or text()='DATETIME' or text()='DISPMASK']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:choose>
                <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or ../TYPE = 'DATETIME' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                    <xsl:call-template name="dispHiddenLabel_tmp"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </xsl:otherwise>
            </xsl:choose> 
            <xsl:choose>
                <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                    <xsl:call-template name="dispEntityField_tmp">
                        <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispEntityField_tmp">
                        <xsl:with-param name="EntityType" select="../TYPE"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
            </oj-label-value>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td ><div>
                    <!--Static header change 1707-->
                    <xsl:choose>
                        <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                        <xsl:call-template name="dispEntityField_tmp">
                                <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                            </xsl:call-template>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:call-template name="dispEntityField_tmp">
                                <xsl:with-param name="EntityType" select="../TYPE"/>
                            </xsl:call-template>
                    </xsl:otherwise>
                    </xsl:choose>
                </div>
            </td><!--Static header change-->
        </xsl:if>
    </xsl:template>
    <!-- 13/10/08 OCX Related modification starts -->
    <xsl:template match="TYPE[text()='OCX']" mode="template">
        <xsl:call-template name="dispOCX"/>
    </xsl:template>
    <!-- 13/10/08 OCX Related modification ends -->
    <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:variable name="rFldNode" select=".."/>
            <xsl:variable name="Left_or_Right" select="$rFldNode/@COL"/>
            <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:call-template name="dispRadioLabel_tmp"/>
                <oj-radioset slot="value" type="text" disabled="true">
                 <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
                <xsl:for-each select="../OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                     <xsl:if test="count(SELECTED) > 0 and SELECTED=-1">
                        <xsl:attribute name="value"><xsl:value-of select="VALUE"></xsl:value-of></xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </xsl:for-each>
                    <xsl:apply-templates select="../OPTION" mode="template">
                        <xsl:with-param name="Left_or_Right" select="$Left_or_Right"/>
                        <xsl:with-param name="row" select="position()"/>
                    </xsl:apply-templates>
                </oj-radioset>
        </oj-label-value>
        </xsl:if>
    </xsl:template>
    <xsl:template match="OPTION" mode="template">
        <xsl:param name="Left_or_Right" select="."/>
        <xsl:param name="row" select="."/>
            <oj-option  >
            <!--HTML5 Changes-->
           
                <xsl:if test="$row != '1'">
                    <xsl:attribute name="ID">
                        <xsl:if test="../../BLOCK != ''">
                            <xsl:value-of select="concat(../../BLOCK,'__',../NAME,$row)"/>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                            <xsl:value-of select="concat(../NAME,$row)"/>
                        </xsl:if>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$Left_or_Right ='1'">
                    <xsl:attribute name="align">
                      <xsl:value-of select="'center'"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="VALUE"><xsl:value-of select="VALUE"/></xsl:attribute>
                <xsl:if test="count(SELECTED) > 0 and SELECTED=-1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="LABEL_VALUE">
                    <xsl:value-of select="LBL"/>
                </xsl:attribute>
            <xsl:value-of select="LBL"/>
        </oj-option>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispEntityField_tmp">
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
         <xsl:call-template name="dispNormalLabel_tmp"/>
         <xsl:call-template name="dispCheckboxField_tmp"/>
         </oj-label-value>
        <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px">
             <xsl:if test="../../@ID != 'FLD_AUDIT1'">
                <oj-label slot="label">
                    --><!--Checkbox changes--><!--
                    --><!--1203 oghag fix start --><!--
                    <xsl:attribute name="id">
                 <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat('grpcheck_',../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="concat('grpcheck_',../NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                    --><!--1203 oghag fix end --><!--
                    <xsl:text disable-output-escaping="yes"> </xsl:text>
                    --><!--<img src="{$imgPath_XSL}/star_disabled.gif" title=""/>--><!--
                </oj-label>
             </xsl:if>
                <xsl:call-template name="dispCheckboxField_tmp"/>
             
            --><!--    <oj-checkboxset slot="value" disabled="true">
                    <xsl:call-template name="dispCheckboxField_tmp"/>
                </oj-checkboxset>  --><!--
                </oj-label-value>-->
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td >
                <div>
                    <!--static header change-->
                    <xsl:call-template name="dispCheckboxField_tmp"/>
                </div>
            </td><!--static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispTextareaField_tmp">
                    <xsl:with-param name="position">column</xsl:with-param>
                </xsl:call-template>
            </oj-label-value>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                     
            <td >
                <div>
                    <!--static header change-->
                    <!--<xsl:call-template name="dispHiddenLabel_tmp"/>-->
                    <xsl:call-template name="dispTextareaField_tmp">
                        <xsl:with-param name="position">column</xsl:with-param>
                    </xsl:call-template>
                </div>
            </td><!--static header change-->
        </xsl:if>
    
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">              
            <td class="TDnone">
                <div>
                    <!--21352866 -->
                    <!--<label class="LBLinv" for=""></label>-->
                  
                    <OJ-INPUT-TEXT style="display:none;">
						<xsl:call-template name="ATTR_Handler_tmp">
							<xsl:with-param name="curr_fld" select=".."/>
						</xsl:call-template>
                        <xsl:attribute name="value">
                            <xsl:text>{{row.data.</xsl:text>
                            <xsl:value-of select="../NAME"/>
                            <xsl:text>}}</xsl:text>
                        </xsl:attribute>
                    </OJ-INPUT-TEXT>
				</div>
            </td>
        </xsl:if>
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            
                <!--<label class="LBLinv" for=""></label>-->
                <OJ-INPUT-TEXT style="display:none;">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                 <xsl:attribute name="HIDDEN_TYPE">
                    <xsl:text>Y</xsl:text>
                </xsl:attribute>
            </OJ-INPUT-TEXT>
            
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='ROSELECT']" mode="template">
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                     
          <td ><div>      
                    <xsl:call-template name="dispSelectField_tmp" />
                </div>
            </td>
           <!-- <td ><div>      
          <div class="invisible">-->
                        <!--<xsl:call-template name="dispSelectField_tmp"/>-->
         <!-- </div>  
          <LABEL class="LBLinv" >
              <xsl:attribute name="for">
                  <xsl:value-of select="../NAME"></xsl:value-of>
                  <xsl:text>I</xsl:text>
              </xsl:attribute>
              <xsl:value-of select="../LBL"/>
          </LABEL>-->
          <!--<INPUT class="TXTro" tabIndex="-1" viewMode="Y" INPUT_LOV="N">-->
          <!--<INPUT tabIndex="-1" viewMode="Y" INPUT_LOV="N">
              <xsl:attribute name="title">
                  <xsl:value-of select="../LBL"/>
              </xsl:attribute>
              <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
                  <xsl:with-param name="curr_fld" select=".."/>
              </xsl:call-template>
              <xsl:attribute name="SIZE">
                  <xsl:variable name="strSize">
                      <xsl:for-each select="../OPTION">
                          <xsl:sort select="string-length(.)" order="descending" data-type="number"/>
                          <xsl:if test="position() = 1">
                              <xsl:value-of select="string-length(.)"/>
                          </xsl:if>                        
                      </xsl:for-each>
                  </xsl:variable>
                  <xsl:value-of select="$strSize"/>
              </xsl:attribute>
          </INPUT>
          </div></td>-->
        </xsl:if>
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">          
          <!--<div class="invisible">-->
          <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:call-template name="dispNormalLabel_tmp"/>
              <xsl:call-template name="dispSelectField_tmp"/>
            </oj-label-value>
               
            <!--</div>--><!--  
         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
          <oj-label slot="label">
                --><!--21238112 starts--><!--
 <xsl:if test="../../../../../../TAB[@ID ='TAB_FOOTER']">
 </xsl:if>
                --><!--21238112 ends--><!--
              <xsl:attribute name="for">
                  <xsl:value-of select="../NAME"></xsl:value-of>
                  <xsl:text>I</xsl:text>
              </xsl:attribute>
              <xsl:value-of select="../LBL"/>
            </oj-label>
          <oj-input-text slot="value" tabIndex="-1" viewMode="Y" INPUT_LOV="N" type="TEXT">
              <xsl:attribute name="title">
                  <xsl:value-of select="../LBL"/>
              </xsl:attribute>
              <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
                  <xsl:with-param name="curr_fld" select=".."/>
              </xsl:call-template>
            </oj-input-text>
            </oj-label-value>-->
        </xsl:if>
    </xsl:template>
    <xsl:template name="RequiredFieldHandler_me">
        <xsl:param name="curr_fld" select="."/>
        <xsl:if test="$curr_fld/REQD='-1'">
            <SPAN class="SPANFlag">*</SPAN>
        </xsl:if>
        <xsl:if test="$curr_fld/REQD!='-1'">
            <SPAN class="SPANFlag" style="visibility:hidden;">*</SPAN>
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                <!-- 12.0.2 ScreenSaver Changes -->
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSelectField_tmp"/>
            </oj-label-value>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td ><div>
                    <!--Static header change 1707-->
                    <xsl:call-template name="dispSelectField_tmp"/>
                </div>
            </td><!--Static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template">
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <xsl:choose>
            <xsl:when test="contains(../NAME, 'BTN_NEXT_BLK_') or contains(../NAME, 'BTN_PREV_BLK_') or contains(../NAME, 'BTN_ADD_BLK_') or contains(../NAME, 'BTN_REMOVE_BLK_')">
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
                    <td onclick="mainWin.fnUpdateScreenSaverInterval();"><div>
                            <!--static header change 1707-->
                            <xsl:call-template name="dispButtonField_tmp"/>
                        </div>
                        <!--static header change-->
                    </td>
                </xsl:if>
                <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
                        <oj-label slot="label" onclick="mainWin.fnUpdateScreenSaverInterval();"></oj-label>
                        <!-- 12.0.2 ScreenSaver Changes -->
                        <xsl:call-template name="dispButtonField_tmp"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        </oj-label-value>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='FILE']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispFileField_tmp"/>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td >
                <div>
                    <!--static header change-->
                    <!-- change for file type label setup -->
                    <xsl:call-template name="dispHiddenLabel_tmp"/>
                    <xsl:call-template name="dispFileField_tmp"/>
                </div>
            </td><!--static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='IMG']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispImgField_tmp"/>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                            
            <td >
                <div>
                    <!--static header change-->
                    <xsl:call-template name="dispImgField_tmp"/>
                </div>
            </td><!--static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispPasswordField_tmp"/>
        </oj-label-value>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td >
                <div>
                    <!--static header change-->
                   <!-- <xsl:call-template name="dispHiddenLabel_tmp"/>-->
                    <xsl:call-template name="dispPasswordField_tmp"/>
                </div>
            </td><!--static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='LINK_TYPE']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <oj-label slot="label"></oj-label>
            <xsl:call-template name="dispLinkType_tmp"/>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td >
                <div></div>
                <!--static header change-->
            </td>
        </xsl:if>    
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td >
                <div>
                    <!--static header change-->
                    <xsl:call-template name="dispLabelOnlyField_tmp"/>
                </div>
            </td><!--static header change-->
        </xsl:if>
    </xsl:template>
    <xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='PRODUCT' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template_fldset">
        <xsl:param name="l_pos"/>   
       <!--fcis CHANGE-->
            <xsl:if test="$l_pos != 1 and ../LBL != ''">             
            <xsl:if test="count(../CALENDARTEXT) = 0">
                <!--<xsl:if test="../LBL != ''">-->
                <div class="hfieldset-max-width oj-sm-margin-1x-end">
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </div>
            </xsl:if>
            <!--change for holiday maint screen fields alignment -->
            <xsl:if test="count(../CALENDARTEXT) > 0">
           
                 
                  </xsl:if>
                  </xsl:if>
            <!-- FCIS change for label in number text combination start-->
            <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
                <xsl:choose>
                    <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                        <xsl:call-template name="dispEntityField_tmp">
                            <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="dispEntityField_tmp">
                            <xsl:with-param name="EntityType" select="../TYPE"/>
                        </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <!-- FCIS change for label in number text combination ends-->
        
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
		 
            <!-- 12.0.2 ScreenSaver Changes -->
        <div class="hfieldset-max-width oj-sm-margin-1x-end">
         <xsl:call-template name="dispButtonField_tmp"/>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template_fldset">
        <xsl:param name="l_pos"/>
        <div>
            <label class="LBLinv" for=""></label>
           <OJ-INPUT-TEXT style="display:none;">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
             <xsl:attribute name="HIDDEN_TYPE">
           <xsl:text>Y</xsl:text>
        </xsl:attribute>
        </OJ-INPUT-TEXT>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <xsl:if test="$l_pos != 1 and ../LBL != ''">
                <div class="hfieldset-max-width oj-sm-margin-1x-end">
                    <oj-label slot="label" class="oj-sm-align-items-center">
                        <xsl:call-template name="ATTR_Handler_tmp">
                            <xsl:with-param name="curr_fld" select=".."/>
                        </xsl:call-template>
                        <xsl:value-of select="../LBL"/>
                    </oj-label>
                </div>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
            <!-- 12.0.2 ScreenSaver Changes -->
	<xsl:if test="$l_pos != 1 and ../LBL != ''">
            <div class="hfieldset-max-width oj-sm-margin-1x-end">
                <xsl:call-template name="dispNormalLabel_tmp"/>
            </div>
        </xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
            <xsl:call-template name="dispCheckboxField_tmp"/>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template_fldset">
        <xsl:param name="l_pos"/> 
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
		<xsl:if test="$l_pos != 1 and ../LBL != ''">
                <div class="hfieldset-max-width oj-sm-margin-1x-end">
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </div>
                </xsl:if>
            <!--</xsl:if>-->
        </xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>
            </xsl:call-template>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='FILE']" mode="template_fldset">
        <xsl:param name="l_pos"/> 
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
               <xsl:if test="$l_pos != 1 and ../LBL != ''">
               <div class="hfieldset-max-width oj-sm-margin-1x-end">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                </div>
                </xsl:if>
            <!--</xsl:if>-->
        </xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
            <xsl:call-template name="dispFileField_tmp"/>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='IMG']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <xsl:call-template name="dispNormalLabel_tmp"/>
            <!--</xsl:if>-->
        </xsl:if>
            <xsl:call-template name="dispImgField_tmp"/>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template_fldset">
        <xsl:param name="l_pos"/> 
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
               <xsl:if test="$l_pos != 1 and ../LBL != ''">
                <div class="hfieldset-max-width oj-sm-margin-1x-end">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                </div>
                </xsl:if>
            <!--</xsl:if>-->
        </xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
            <xsl:call-template name="dispPasswordField_tmp"/>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template_fldset">
        <xsl:param name="l_pos"/> 
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <!-- 12.0.2 ScreenSaver Changes -->
                 <xsl:if test="$l_pos != 1 and ../LBL != ''">
                <div class="hfieldset-max-width oj-sm-margin-1x-end">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                </div>
                </xsl:if>
            <!--</xsl:if>-->
        </xsl:if>
        <div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
            <xsl:call-template name="dispSelectField_tmp"/>
        </div>
    </xsl:template>
    <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template_fldset">
            <xsl:param name="l_pos"/> 
            <xsl:variable name="rFldNode" select=".."/>
            <xsl:variable name="Left_or_Right" select="$rFldNode/@COL"/>
            <xsl:if test="$l_pos != 1 and ../LBL != ''">
             <xsl:call-template name="dispRadioLabel_tmp"/>
            </xsl:if>    
                <oj-radioset slot="value" type="text" disabled="true">
                 <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
                    <xsl:for-each select="../OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                     <xsl:if test="count(SELECTED) > 0 and SELECTED=-1">
                        <xsl:attribute name="value"><xsl:value-of select="VALUE"></xsl:value-of></xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template">
                            <xsl:with-param name="Left_or_Right" select="$Left_or_Right"/>
                            <xsl:with-param name="row" select="position()"/>
                        </xsl:apply-templates>
                         
                </xsl:for-each>
                </oj-radioset>
            <!-- 12.0.2 ScreenSaver Changes --><!--
            <label class="LBLauto">
                <xsl:attribute name="for">
                        <xsl:if test="../../BLOCK != ''">
                            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                            <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                <xsl:for-each select="../OPTION[@COL=1]">
                        <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                        <xsl:variable name="row" select="@ROW"/>
                        <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template_fldset">
                        <xsl:with-param name="Left_or_Right" select="$Left_or_Right"/>
                    </xsl:apply-templates>
                    </xsl:for-each>
        </label>-->
    </xsl:template>
    <!--<xsl:template match="OPTION" mode="template_fldset">
        <xsl:param name="Left_or_Right" select="."/>
        <label class="LBLauto" for="">
            <xsl:attribute name="for">
            <xsl:if test="../../BLOCK != ''">
                <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../BLOCK = ''">
                <xsl:value-of select="../NAME"></xsl:value-of>
            </xsl:if>
        </xsl:attribute>
            <input type="radio" class="LBLauto" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                <xsl:if test="$Left_or_Right ='1'">
            <xsl:attribute name="align">
              <xsl:value-of select="'center'"/>
            </xsl:attribute>
        </xsl:if>
                <xsl:attribute name="VALUE"><xsl:value-of select="VALUE"/></xsl:attribute>
                <xsl:if test="count(SELECTED) > 0 and SELECTED=-1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>
                <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="LBL"/>
        </xsl:attribute>
            </input>
            <xsl:value-of select="LBL"/>
        </label>
    </xsl:template>-->
    <xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template_fldset">
        <xsl:param name="l_pos"/>
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                     <xsl:if test="$l_pos != 1 and ../LBL != ''">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                    </xsl:if>
            <!--</xsl:if>-->
        </xsl:if>
            <xsl:call-template name="dispEntityField_tmp">
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
    </xsl:template>
    <xsl:template name="dispNormalLabel_tmp">
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">        
            <xsl:if test="../LBL != ''">
<!--UDF Changes Start -->
            <xsl:choose>
                    <!-- udf change for function CSCTRUFDF -->
                    <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
  <!--UDF Changes UDF label Start -->
     <label class="LBLUdf">
                            <!--UDF Changes UDF label End -->
                            <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                            <xsl:value-of select="../LBL"/>
                        </label>
  </xsl:when>
                    <xsl:otherwise>
                      <xsl:choose><!--21238112 starts-->
                      <xsl:when test="../../../../../../TAB[@ID ='TAB_FOOTER']">
                        <oj-label slot="label">
                            <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                            <xsl:value-of select="../LBL"/>
                                </oj-label>
                      </xsl:when>
                      <xsl:otherwise>
     <oj-label slot="label">
        <xsl:if test="../../HREQ = '-1'">
            <xsl:attribute name="class">oj-sm-align-items-center</xsl:attribute>
            
        </xsl:if>
                            <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                            <xsl:value-of select="../LBL"/>
                                </oj-label>
                        </xsl:otherwise>
                        </xsl:choose><!--21238112 ends-->
  </xsl:otherwise>
                </xsl:choose>
            <!--UDF Changes End -->   
            </xsl:if>
            <xsl:if test="../LBL = ''">
                <oj-label slot="label">
                        <xsl:choose>
                            <xsl:when test="../../HREQ = '-1'">
							<xsl:attribute name="class">
                                <xsl:value-of select="'LBLstd LBLinvHF'"/>
								</xsl:attribute>
                            </xsl:when>
                            <xsl:otherwise>
							<xsl:attribute name="class">
                                <xsl:value-of select="'LBLstd LBLinv2'"/>
								</xsl:attribute>
                            </xsl:otherwise>
                        </xsl:choose>
                    <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != '' and ../../HREQ != '-1'"><!--HTML5 changes 2/NOV/2016 Fix for 24963474-->
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = '' or ../../HREQ = '-1'"><!--HTML5 changes 2/NOV/2016 Fix for 24963474-->
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                   <!-- <xsl:value-of select="../NAME"/>-->
                </oj-label>                
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
<!--UDF Changes Start -->
           <xsl:choose>
                <!-- change for udf CSCTRUDF-->
                <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
            <!--UDF Changes UDF label Start -->
                       <label class="LBLUdf star">
                        <!--UDF Changes UDF label End -->
                        <xsl:attribute name="FOR">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                        <xsl:value-of select="../LBL"/>
                    </label>
  </xsl:when>
                <xsl:otherwise>
    <oj-label slot="label" show-required="true">
        <xsl:if test="../../HREQ = '-1'">
            <xsl:attribute name="class">oj-sm-align-items-center</xsl:attribute>
        </xsl:if>
                        <xsl:attribute name="FOR">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                        <xsl:value-of select="../LBL"/>
                    </oj-label>
  </xsl:otherwise>
            </xsl:choose>
            <!--UDF Changes End -->
        </xsl:if>
    </xsl:template>
    <xsl:template name="dispHiddenLabel_tmp">
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
        <label>
                <!--change for holiday maint screen fields alignment -->
                <xsl:attribute name="class">
                <xsl:choose>
                        <xsl:when test="../../HREQ = '-1'">
                        <xsl:if test="count(../CALENDARTEXT) > 0">
                            <xsl:value-of select="'LBLstd LBLinvHF LBLinvCal'"/>
                        </xsl:if>
                        <xsl:if test="count(../CALENDARTEXT) = 0">
							<!--Fix for 16945317 start-->
							<xsl:if test="../../FIELD[position()=1]/TYPE = 'DATE'">
								<xsl:value-of select="'LBLinv'"/>
							</xsl:if>
							<xsl:if test="../../FIELD[position()=1]/TYPE != 'DATE'">
                            <!--Fix for 17060769 start-->
								<!--<xsl:choose>
									<xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'"> --><!--Fix for 17060873 -->
										<xsl:if test="../../FIELD[position()=1]/DTYPE = 'NUMBER' or (../../FIELD[position()=1]/TYPE = 'AMOUNT')">
											<xsl:value-of select="'LBLinv'"/>
										</xsl:if>
                                    <!--</xsl:when>
									<xsl:otherwise>-->
									<xsl:if test="../../FIELD[position()=1]/DTYPE != 'NUMBER' and (../../FIELD[position()=1]/TYPE != 'AMOUNT')"><!--Fix for 17060873 -->
										<xsl:value-of select="'LBLstd LBLinvHF'"/>
									</xsl:if><!--</xsl:otherwise>
                                </xsl:choose>--><!--Fix for 17060873 -->
                            </xsl:if> 
                         <!--Fix for 16945317 end-->
                         <!--Fix for 17060769 end-->
                        </xsl:if>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:value-of select="'LBLinv'"/>
                    </xsl:otherwise>
                    </xsl:choose>
            </xsl:attribute>
                <xsl:attribute name="FOR">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            </label>
        </xsl:if>
        
        <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
            <label class="LBLinv">
                <xsl:attribute name="FOR">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
            </label>
        </xsl:if>
    </xsl:template>
    <xsl:template name="dispRadioLabel_tmp">
        <!--<xsl:if test="count(../REQD) = 0 or ../REQD = '0'">-->
        <oj-label slot="label" for="ui-id-1">
                <!--Radio changes -->
                <xsl:attribute name="id"><!--1203 oghag fix start -->
                 <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat('grprad_',../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="concat('grprad_',../NAME)"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <!--1203 oghag fix end -->
                <xsl:value-of select="../LBL"/>
            </oj-label>
        <!--</xsl:if>
        <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
            <b class="LBLstd star">
                <xsl:value-of select="../LBL"/>
            </b>
        </xsl:if>-->
    </xsl:template>
    <!--End of ExtFields.xsl-->
    <xsl:template match="FLDSET">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="subpartCount" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:choose>
            <xsl:when test="HREQ = '-1'">
                <xsl:call-template name="HorzFldSet"/>
            </xsl:when>
            <xsl:otherwise>
            <!--<div class="oj-flex">-->
            
                <fieldset block="{./BLOCK}" type="{./@TYPE}" view="{./@VIEW}">
                    <!-- 12.0.3 Enable/Disable Screen Element starts -->
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat(../../../@ID,'__',../../@ID,'__',../@ID,'__',@ID)"/>
                    </xsl:attribute>
                    <!-- 12.0.3 Enable/Disable Screen Element ends -->
                    <xsl:if test="@TYPE = 'ME' and @VIEW = 'SE'">
                        <xsl:attribute name="MESVNODE">
                            <xsl:text>false</xsl:text>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="(LBL != '') and (@TYPE = 'SE' or @VIEW = 'SE')">
                        <xsl:attribute name="class">oj-flex-item </xsl:attribute>
                        <h4 class="">
                            <xsl:value-of select="LBL"/>
                        </h4>
                    </xsl:if>
                    <xsl:if test="$sprtReqd = 'Y'">
                        <div class="oj-flex">
                        <xsl:call-template name="sprtHandler">
                            <xsl:with-param name="SPRT_Index" select="1"/>
                            <xsl:with-param name="subpartCount" select="$subpartCount"/>
                                <xsl:with-param name="partWidth" select="$partWidth"/>
                                <xsl:with-param name="footer" select="'N'"/>
                        </xsl:call-template>
                        </div>
                    </xsl:if>
                    <xsl:if test="$sprtReqd = 'N'">
                        <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
                        <xsl:call-template name="FldSetTypeHandler">
                            <xsl:with-param name="SPRT_Index" select="0"/>
                            <xsl:with-param name="sprtReqd" select="'N'"/>
                        </xsl:call-template>
                        </oj-form-layout>
                    </xsl:if>
                    
                </fieldset>
                <!--</div>-->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="FLDSET" mode="footer">
        <xsl:param name="partWidth" select="."/>
        <fieldset block="{./BLOCK}" type="{./@TYPE}" view="{./@VIEW}">
        <xsl:if test="count(../SPRTCNT) = 0 or ../SPRTCNT = '0'">
            <xsl:call-template name="FldSetTypeHandler">
                <xsl:with-param name="sprtReqd" select="'N'"/>
                <xsl:with-param name="SPRT_Index" select="0"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="count(../SPRTCNT) > 0 and ../SPRTCNT != '0'">
            
            <oj-form-layout label-edge="start" user-assistance-density="compact">
                <div class="oj-flex oj-sm-width-full">
            <xsl:call-template name="sprtHandler">
                <xsl:with-param name="footer" select="'Y'"/>
                <xsl:with-param name="SPRT_Index" select="1"/>
                <xsl:with-param name="subpartCount" select="../SPRTCNT"/>
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
            </div>
                </oj-form-layout>
                
        </xsl:if>
        </fieldset>
    </xsl:template>
    <xsl:template name="HorzFldSet">
    
     
        <fieldset class="oj-flex-item" block="{./BLOCK}" type="{@TYPE}" view="{@VIEW}">
         <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
            <!--change for holiday maint screen fields alignment-->
            <!--<xsl:attribute name="class">
				<xsl:if test="count(./FIELD[position()=1]/CALENDARTEXT) > 0">
					<xsl:value-of select="'FSTCal'"/>
				</xsl:if>
				<xsl:if test="count(./FIELD[position()=1]/CALENDARTEXT) = 0">
					<xsl:value-of select="''"/>
				</xsl:if>
			</xsl:attribute>-->
            <xsl:if test="LBL != ''">
                <xsl:attribute name="class">
                    <!--change for holiday maint screen fields alignment -->
                    <xsl:if test="count(./FIELD[position()=1]/CALENDARTEXT) > 0">
                        <xsl:value-of select="' FSTCal'"/>
                    </xsl:if>
                    <xsl:if test="count(./FIELD[position()=1]/CALENDARTEXT) = 0">
                        <xsl:value-of select="''"/>
                    </xsl:if>
                </xsl:attribute>
                <h4 class="">
                <xsl:value-of select="LBL"/>
            </h4>
            </xsl:if>
            
            <div class="oj-sm-width-full" onclick="mainWin.fnUpdateScreenSaverInterval();">
               <!-- <table border="0" cellpadding="0" cellspacing="0" summary="" style="display:inline-block;" class="hfieldSetTable">
                    <tbody role="group" aria-labelledby="{./BLOCK}"> -->
                        <!--FCIS change for horizonatal fields-->
                       <!-- <tr style="vertical-align:middle"> -->
                <oj-label-value class="ojLabelValueClass" label-edge="start" label-width="{$labelWidth}px">
                <xsl:apply-templates select="./FIELD" mode="hFieldSetLabel">
                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                </xsl:apply-templates>
                <div slot="value" class="oj-flex-bar oj-sm-width-full">
                            <xsl:apply-templates select="./FIELD" mode="hFieldSet">
                                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                   </div>
                </oj-label-value>
             
                </div>
                       <!-- </tr>
                    </tbody>
                </table> -->
                </oj-form-layout>
        </fieldset>
         
    </xsl:template>
    <!-- End of ExtFldset.xsl -->
    <xsl:template match="PART">
        <xsl:variable name="partWidth" select="@WIDTH"/>
    <xsl:if test="count(./FLDSET) !=0">
        <div>
            <xsl:call-template name="parDivHandler">
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
            <div>
            
                <xsl:if test="position()!=last()">
                    <xsl:attribute name="class">partitionPanel oj-sm-padding-5x-horizontal partitionRightMargin </xsl:attribute>
                </xsl:if>
                <xsl:if test="position()=last()">
                    <xsl:attribute name="class">partitionPanel oj-sm-padding-5x-horizontal </xsl:attribute>
                </xsl:if>
                <xsl:if test="./FLDSET[@HIDDEN = 'Y']">
                    <xsl:attribute name="style">display:none</xsl:attribute>
                </xsl:if>

			 <!--	<xsl:variable name="partitionWidth">
       <xsl:choose>
            <xsl:when test="$partWidth = '100' and $l_scr_type='L'">
				<xsl:value-of select="$screenWidth - 14"/>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='L'">
					<xsl:value-of select="(0.77 * $screenWidth) - 14"/>
            </xsl:when>
            <xsl:when test="$partWidth = '66' and $l_scr_type != 'L'">
				<xsl:value-of select="((2 * (0.77 * $screenWidth)) div 3) - 14"/>
            </xsl:when>
			  <xsl:when test="$partWidth = '66' and $l_scr_type = 'L'">
				<xsl:value-of select="((2 * $screenWidth) div 3) - 14"/>
            </xsl:when>
            <xsl:otherwise>
			<xsl:if test="$l_scr_type = 'L'">
			<xsl:value-of select="($screenWidth div 3) - 14"/>
			</xsl:if>
			<xsl:if test="$l_scr_type != 'L'">
			<xsl:value-of select="(0.77 * $screenWidth div 3) - 14"/>
			</xsl:if>
			</xsl:otherwise>
        </xsl:choose> 
		</xsl:variable>-->
            <!--<xsl:attribute name="style">
				 <xsl:text>width:</xsl:text>
			<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"></xsl:value-of>
			<xsl:text>px</xsl:text>
		</xsl:attribute>-->
            <!-- 12.0.3 Enable/Disable Screen Element starts -->
            <xsl:attribute name="id">
                <xsl:value-of select="concat(../../@ID,'__',../@ID,'__',@ID)"/>
            </xsl:attribute>
            <!-- 12.0.3 Enable/Disable Screen Element ends -->
            <xsl:choose>
                <xsl:when test="FSREQ = 'Y'">
                <fieldset>
                    <div class="oj-flex-item">
                        <h4 class="">
                            <xsl:value-of select="LBL"/>
                        </h4>
                        <!-- partition without sub partition !-->
                        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'N'"/>
                                <xsl:with-param name="subpartCount" select="'0'"/>
                                <xsl:with-param name="partWidth" select="$partWidth"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                        <!-- partition with sub partition !-->
                        <xsl:if test="count(./SPRTCNT) > 0 and ./SPRTCNT != '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'Y'"/>
                                <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                                <xsl:with-param name="partWidth" select="$partWidth"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                    </div>
                    </fieldset>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'N'"/>
                            <xsl:with-param name="subpartCount" select="'0'"/>
                            <xsl:with-param name="partWidth" select="$partWidth"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    <xsl:if test="count(./SPRTCNT) > 0 and ./SPRTCNT != '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'Y'"/>
                            <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                            <xsl:with-param name="partWidth" select="$partWidth"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                </xsl:otherwise>
            </xsl:choose>
        </div>
        </div>
    </xsl:if>
    </xsl:template>
    <!--Partition handler for footer !-->
    <xsl:template match="PART" mode="footer">
        
        <xsl:variable name="partWidth" select="@WIDTH"/>
        <xsl:if test="count(./SPRTCNT) > 0 and ./SPRTCNT != '0'">
            <xsl:apply-templates select="FLDSET" mode="footer">
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:apply-templates>
        </xsl:if>
        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
            <xsl:if test="@WIDTH != '66'">
                <xsl:apply-templates select="FLDSET" mode="footer">
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:apply-templates>
            </xsl:if>
            <xsl:if test="@WIDTH = '66'">
                <xsl:apply-templates select="FLDSET" mode="footer">
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:apply-templates>
            </xsl:if>
        </xsl:if>
        
    </xsl:template>
    <!-- Choosing Partition Div CSS class!-->
    <xsl:template name="parDivHandler">
        <xsl:param name="partWidth" select="."/>
        <xsl:choose>
            <xsl:when test="$partWidth = '100' and $l_scr_type='L'">
            <xsl:if test="count(./FLDSET) != 0">
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-full sectionPanel'"/>
                </xsl:attribute>
            </xsl:if>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-full sectionPanel'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '66'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-2/3 sectionPanel'"/>
                </xsl:attribute>
            </xsl:when>
            <!--<xsl:when test="$partWidth = '50'  and $l_scr_type='L'">-->
             <xsl:when test="$partWidth = '50' ">
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-1/2 sectionPanel'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-1/3 sectionPanel'"/>
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- End of ExtPartition.xsl -->
    <xsl:template match="SECTION">
          <xsl:variable name="section_class">
            <xsl:choose>
                <xsl:when test="$l_scr_type = 'L'">
           <xsl:text>oj-flex oj-sm-margin-1x-horizontal</xsl:text>
          </xsl:when>
                <xsl:otherwise>
               <xsl:text>oj-flex oj-sm-margin-1x-horizontal</xsl:text>
          </xsl:otherwise>
            </xsl:choose>
    </xsl:variable>
        <div>
            <!-- 12.0.3 Enable/Disable Screen Element starts -->
            <xsl:attribute name="id">
                <xsl:value-of select="concat(../@ID,'__',@ID)"/>
            </xsl:attribute>
            <!-- 12.0.3 Enable/Disable Screen Element ends-->
            <!--<xsl:attribute name="class">
             <xsl:value-of select="$section_class"/>
            </xsl:attribute>-->
            <!--<xsl:if test="(count(@COLLAPSE) > 0 and @COLLAPSE = 'Y')">
            <div>
                    <xsl:attribute name="class">
					<xsl:value-of disable-output-escaping="yes" select="concat($section_class, ' ', 'toggleDivHeader')"/>
                </xsl:attribute>
                    --><!--  Fix for 17233213 start--><!--
                    <xsl:attribute name="style">
                    <xsl:text>display:none;</xsl:text>
                    </xsl:attribute>
                    --><!--  Fix for 17233213 start--><!--
                    <span class="sectionToggle">
                        --><!--  Fix for 17233213 start--><!--
                        <button class="BTNicon" title="{$expand_section}" id="BtnSectionNav{@ID}Expand" name="BtnSectionExpand" onclick="expandCollapseSection(this, 'Expand');">
                            --><!--HTML5 changes 2/NOV/2016 Fix for 24942117--><!--
                            <span class="sectionExpand"></span>
                        </button>
                        --><!--  Fix for 17233213 end--><!--
                    </span>
                </div>   
             </xsl:if>-->
            <xsl:choose>
                <xsl:when test="(count(@COLLAPSE) > 0 and @COLLAPSE = 'Y')">
             <oj-collapsible class="oj-sm-padding-5x-horizontal" id="BtnSectionNav{@ID}Expand">
             <h4 slot="header">
                <xsl:value-of select="LBL"/>
             </h4>
                <!--<xsl:attribute name="class">
                  <xsl:value-of select="$section_class"/>
                </xsl:attribute>-->
                        <!--  Fix for 17233213
                <xsl:attribute name="style">
                    <xsl:text>display:none;</xsl:text>
                    </xsl:attribute>-->
                        <!--<div>
                            <xsl:attribute name="class">
                  <xsl:value-of disable-output-escaping="yes" select="concat($section_class, ' ', 'toggleDivHeader')"/>
				</xsl:attribute>
                            <span class="sectionToggle">
                                --><!--  Fix for 17233213 start--><!--
                                <button class="BTNicon" title='{$collapse_section}' id="BtnSectionNav{@ID}Expand" name="BtnSectionCollapse" onclick="expandCollapseSection(this, 'COLLAPSE');">
                                    --><!--HTML5 changes 2/NOV/2016 Fix for 24942117--><!--
                                    <span class="sectionCollapse"></span>
                                </button>
                                --><!--  Fix for 17233213 end--><!--
                            </span>
                            <fieldset  style="border:none;">
                                <h4>
                                    <xsl:value-of select="LBL"/>
                                </h4>
                            </fieldset>
                        </div>-->
                        <div>
                         <xsl:if test="count(./PART) > 1">
                    <xsl:attribute name="class">oj-flex oj-sm-margin-1x-horizontal oj-sm-padding-4x-start</xsl:attribute>
                </xsl:if>
                <xsl:if test="count(./PART) = 1">
                    <xsl:attribute name="class">oj-sm-margin-1x-horizontal oj-sm-padding-4x-start</xsl:attribute>
                </xsl:if>
                        <xsl:apply-templates select="PART"></xsl:apply-templates>
                        </div>
                         
                    </oj-collapsible>
            </xsl:when>
                <xsl:otherwise>
                <xsl:if test="count(./PART) > 1">
                    <xsl:attribute name="class">oj-flex</xsl:attribute>
                </xsl:if>
                <xsl:if test="count(./PART) = 1">
                    <xsl:attribute name="class"></xsl:attribute>
                </xsl:if>
            <xsl:apply-templates select="PART"></xsl:apply-templates>
            </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    <!-- Section handler for footer !-->
    <xsl:template match="SECTION" mode="footer">
        <xsl:apply-templates select="PART" mode="footer"/>
    </xsl:template>
    <!-- End of ExtSection.xsl -->
    <!-- Start of ExtCore.xsl -->
    <xsl:template name="dispEntityField_tmp">
    <xsl:param name="EntityType"/>
    <xsl:choose>
            <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'DATETIME'">
            <xsl:call-template name="dispDateTimeField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'DISPMASK'">
            <xsl:call-template name="dispMaskingField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'DESCRIPTION'">
            <xsl:call-template name="dispDescriptionField_tmp"/>
        </xsl:when>
            <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField_tmp">
            <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
        </xsl:when>
            <xsl:when test="$EntityType = 'PRODUCT'">
            <xsl:call-template name="dispProductField_tmp">
                <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
        </xsl:when>
            <xsl:otherwise>
            <xsl:call-template name="dispTextField_tmp"/>
        </xsl:otherwise>
        </xsl:choose>

</xsl:template>
    <xsl:template name="dispAmountField_tmp">
    <xsl:variable name="relFld" select="../RELATED_FIELD"/>
	<xsl:variable name="blkFld" select="../../BLOCK"/> <!--REDWOOD_35057391 added-->
	<xsl:variable name="nameFld" select="../NAME"/> <!--REDWOOD_35057391 added-->
    <!--<INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relFld}')" related_ccy="{$relFld}">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>-->
         
   <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'ME' or ../../@VIEW = 'SE')">  
    <oj-label slot="label">
            <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <!--<xsl:text>I</xsl:text>-->
        </xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf CSCTRUDF -->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                        <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf</xsl:text>
                        <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                <xsl:attribute name="class">
                    <xsl:text>oj-flex-item</xsl:text>
							</xsl:attribute>
                            <!-- Fix for 21309476 start-->
                            <!-- Fix for 21309476  end -->
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
             <xsl:attribute name="show-required">true</xsl:attribute>
             <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf for function CSCTRUDF-->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                            <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf star</xsl:text>
                             <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''"><!--
                <xsl:attribute name="class">
                    <xsl:text>star </xsl:text>
                            </xsl:attribute>-->
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
        </oj-label>
        </xsl:if>
      <oj-input-text slot="value"   related_field="{../RELATED_FIELD}" >
       <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
                <xsl:attribute name="class">oj-form-control-text-align-right</xsl:attribute>
            </xsl:if>
             <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE')">
                <xsl:attribute name="class">oj-helper-text-align-end</xsl:attribute>
            </xsl:if>
            <!--Added for 17388325 -->
            <!--Fix for 21499059 start-->
    <xsl:if test="../LBL != ''">
            <xsl:attribute name="title">
           <xsl:value-of select="../LBL"/>
      </xsl:attribute>
      </xsl:if>
      <xsl:if test="../LBL = ''">
        <xsl:attribute name="title">
           <xsl:value-of select="../NAME"/>
        </xsl:attribute>
      </xsl:if>
       <!--Fix for 21499059 end-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        <!--xsl:attribute name="MAXLENGTH1"-->
		<xsl:attribute name="length.max">
            <xsl:if test="not(contains(../MAXLENGTH,','))">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="contains(../MAXLENGTH,',')">
                <xsl:value-of select="substring-before(../MAXLENGTH,',') - substring-after(../MAXLENGTH,',')"/>
            </xsl:if>
        </xsl:attribute>
            <xsl:if test="normalize-space(../MIN_VAL) != ''">      
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="../MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
            <xsl:if test="normalize-space(../MAX_VAL) != ''">    
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="../MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
            <!-- added for Amount/Exchange Rate patterns starts -->
            <xsl:if test="count(../REFERRED_FIELDS) != 0">
                <xsl:attribute name="RNAMES">
                    <xsl:variable name="rNamesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rnamedata">
                                <xsl:value-of select="concat(RNAME,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rnamedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rNamesValue"/>
                </xsl:attribute>
                <xsl:attribute name="RTYPES">
                    <xsl:variable name="rTypesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rtypedata">
                                <xsl:value-of select="concat(RTYPE,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rtypedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rTypesValue"/>
                </xsl:attribute>
                <xsl:attribute name="onchange">
                    <xsl:text disable-output-escaping="yes">fnRefreshFieldValue(this);processAmount('</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text disable-output-escaping="yes">', '</xsl:text>
                    <xsl:value-of select="$relFld"/>
                    <xsl:text disable-output-escaping="yes">', event,this);</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:if test="count(../REFERRED_FIELDS) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text disable-output-escaping="yes">', '</xsl:text>
                    <xsl:value-of select="$relFld"/>
                    <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this)</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
            <!-- added for Amount/Exchange Rate patterns ends -->
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
             <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
        </xsl:if>
        
         <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
                <xsl:attribute name="readonly">true</xsl:attribute>
            </xsl:if>
            <!--Fix for 14321478 -UDF update issue starts-->
            <xsl:if test="count(../@UDF) != 0 and (../@UDF) = 'Y'">
			<xsl:attribute name="onbeforedeactivate">
				<xsl:text>fnUpdateUDFDBField(this);</xsl:text>
			</xsl:attribute>
		</xsl:if>
		<!--REDWOOD_35057391 - amount not validate if ccy not available start-->
		<xsl:attribute name="onfocusout">		
                    <xsl:text disable-output-escaping="yes">checkCurrencyValue('</xsl:text>
                    <xsl:value-of select="concat($blkFld,'__',$nameFld)"/>		
                    <xsl:text disable-output-escaping="yes">', '</xsl:text>
                    <xsl:value-of select="$relFld"/>
                    <xsl:text disable-output-escaping="yes">', event);</xsl:text>					
                </xsl:attribute>
		<!--REDWOOD_35057391 - amount not validate if ccy not available end-->
                <xsl:attribute name="converter">
				<xsl:text>{{amountConverter</xsl:text>
                                <xsl:value-of select="../../BLOCK"/>
                                <xsl:text>__</xsl:text>
                                <xsl:value-of select="../NAME"/>
                                <xsl:text>}}</xsl:text>
                               <!--<xsl:text>{{amtConverter}}</xsl:text>-->
                </xsl:attribute>
                 <!--<xsl:attribute name="onchange">
                <xsl:text> getFormattedAmount(this,'</xsl:text>
                <xsl:value-of select="../RELATED_FIELD"/>
                <xsl:text>' ,false,</xsl:text>
				<xsl:text>amountConverter</xsl:text>
                                <xsl:value-of select="../../BLOCK"/>
                                <xsl:text>__</xsl:text>
                                <xsl:value-of select="../NAME"/>
                                <xsl:text>);</xsl:text>
                </xsl:attribute>-->                
            <!--Fix for 14321478 -UDF update issue ends-->
        </oj-input-text>
        <xsl:call-template name="generateAmountScript" >
             <xsl:with-param name="amountNode" select=".."></xsl:with-param>
        </xsl:call-template>
       
    <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
</xsl:template>
<xsl:template name="generateAmountScript">
    <xsl:param name="amountNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">

          <xsl:if test="($amountNode/../@TYPE = 'ME' and $amountNode/../@VIEW != 'SE') or ($amountNode/../@TYPE = 'ME' and count($amountNode/../@VIEW) = 0)">
             <xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>=getDefaultAmountConverter('<xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>',  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true,true);
         </xsl:if>
         <xsl:if test="($amountNode/../@TYPE != 'ME' or $amountNode/../@VIEW = 'SE')">
         <xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>=getDefaultAmountConverter('<xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>',  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true,false);
         </xsl:if>
<!--<xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>= getFormattedAmount(this,  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true);-->    

</script>
</xsl:template>
<xsl:template name="generateNumberScript">
    <xsl:param name="numberNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     
          <xsl:if test="($numberNode/../@TYPE = 'ME' and $numberNode/../@VIEW != 'SE') or ($numberNode/../@TYPE = 'ME' and count($numberNode/../@VIEW) = 0)">
             <xsl:text>numberConverter</xsl:text><xsl:value-of select="$numberNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/NAME"/>=getDefaultNumberConverter('<xsl:value-of select="$numberNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/NAME"/>',  true);
         </xsl:if>
         <xsl:if test="($numberNode/../@TYPE != 'ME' or $numberNode/../@VIEW = 'SE')">
         <xsl:text>numberConverter</xsl:text><xsl:value-of select="$numberNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/NAME"/>=getDefaultNumberConverter('<xsl:value-of select="$numberNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/NAME"/>',  false);
         </xsl:if>
<!--<xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>= getFormattedAmount(this,  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true);-->    

</script>
</xsl:template>
    <xsl:template name="ATTR_HiddenEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="."/>
    <xsl:if test="count($curr_fld/VALUE) > 0 and $curr_fld/VALUE != ''">
      <!--12.0.3 Defaulting global variables start-->
      <!--xsl:if test="contains($curr_fld/VALUE, 'global.')" 29742379 -->
      <xsl:if test="contains($curr_fld/VALUE, 'global.') and contains($globalVariables,$curr_fld/VALUE)">
      <xsl:attribute name="VALUE">
            <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
        </xsl:attribute>    
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
        </xsl:attribute>
          <xsl:attribute name="HIDDEN_TYPE">
           <xsl:text>Y</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!--12.0.3 Defaulting global variables end-->
      <!--xsl:if test="not(contains($curr_fld/VALUE, 'global.'))" 29742379 -->
      <xsl:if test="not(contains($curr_fld/VALUE, 'global.')) or not(contains($globalVariables,$curr_fld/VALUE)) and $curr_fld/VALUE!= '' ">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE"/>
        </xsl:attribute>
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE"/>
        </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
    </xsl:if>
     <xsl:if test="count($curr_fld/@CONTROL) > 0 and $curr_fld/@CONTROL = 'Y'">
        <xsl:attribute name="CONTROL_DBT">
           <xsl:text>UIBLOCK</xsl:text>
        </xsl:attribute>
    </xsl:if>
 
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME"/>
    </xsl:attribute>
     <xsl:if test="($curr_fld/../@TYPE = 'ME' and $curr_fld/../@VIEW != 'SE') and   $curr_fld/TYPE!='SELECT' and  $curr_fld/TYPE!='ROSELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
     <xsl:if test="($curr_fld/../@TYPE != 'ME' or $curr_fld/../@VIEW = 'SE' or $curr_fld/TYPE ='SELECT' or  $curr_fld/TYPE='ROSELECT')">
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
    </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/REQD) > 0 and $curr_fld/REQD = -1">
    <xsl:attribute name="REQUIRED">
        <xsl:text>true</xsl:text>
    </xsl:attribute>
    </xsl:if>
     
    <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) > 0 and $curr_fld/REQD = -1">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <!-- -->
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="$refFld != ''">
            <xsl:if test="contains($refFld,'__')">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($refFld,'__'))">
                <xsl:value-of select="$refFld"/>
            </xsl:if>
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
    <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1 and ($curr_fld/../@TYPE != 'ME')">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>        
    </xsl:if>
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template"/>
    <xsl:if test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>
    <xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="."/>
    <!--<xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>--><!--
        <xsl:text>I</xsl:text>--><!--
    </xsl:attribute>-->
    
    <xsl:if test="($curr_fld/../@TYPE = 'ME' and $curr_fld/../@VIEW != 'SE') and   $curr_fld/TYPE!='SELECT' and   $curr_fld/TYPE!='ROSELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
     <xsl:if test="($curr_fld/../@TYPE != 'ME' or $curr_fld/../@VIEW = 'SE' or $curr_fld/TYPE ='SELECT' or $curr_fld/TYPE ='ROSELECT') ">
    <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
    </xsl:attribute>
    </xsl:if>
    <!--12.0.3 Defaulting global variables start-->
    <xsl:if test="count($curr_fld/VALUE) > 0"> 
      <!--xsl:if test="contains($curr_fld/VALUE, 'global.')" 29742379 -->
      <xsl:if test="contains($curr_fld/VALUE, 'global.') and contains($globalVariables,$curr_fld/VALUE)">
      <xsl:attribute name="VALUE">
            <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
        </xsl:attribute>
    <!--Fix for 14321478 -UDF update issue ends-->    
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
        </xsl:attribute>
      </xsl:if>
      <!--12.0.3 Defaulting global variables end-->
      <!--xsl:if test="not(contains($curr_fld/VALUE, 'global.'))" 29742379  -->
      <xsl:if test="not(contains($curr_fld/VALUE, 'global.')) or not(contains($globalVariables,$curr_fld/VALUE))">
    <!--Fix for 14321478 -UDF update issue starts-->
         <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE"/>
        </xsl:attribute>
    <!--Fix for 14321478 -UDF update issue ends-->    
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE"/>
        </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME"/>
        <!--<xsl:text>I</xsl:text>-->
    </xsl:attribute>
    <!--<xsl:if test="number($curr_fld/SIZE) > 20">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="20"/>
        </xsl:attribute>
    </xsl:if>-->
    <xsl:if test="number($curr_fld/SIZE) &lt; 23">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
    </xsl:if>
	<xsl:if test="count($curr_fld/REQD) > 0 and $curr_fld/REQD = -1"><!-- fix for 18416245  start-->
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if><!-- fix for 18416245 end -->
    <!-- Size fix starts -->
    <xsl:if test="number($curr_fld/SIZE) > 23">
        <xsl:attribute name="SIZE">
            <xsl:if test="count(curr_fld/LOV) >0 or $curr_fld/TYPE = 'DATE'">
                <xsl:value-of select="number($curr_fld/SIZE) - 4"/>
            </xsl:if>
            <xsl:if test="count(curr_fld/LOV) = 0 and $curr_fld/TYPE != 'DATE'">
                <xsl:value-of select="$curr_fld/SIZE"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <!-- Size fix ends -->
	<!-- Bug 14502312 TIME STAMP IS NOT PROPER Changes Starts -->
	<xsl:if test="$curr_fld/TYPE= 'DATETIME' and number($curr_fld/SIZE) &lt;18">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="18"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Bug 14502312 TIME STAMP IS NOT PROPER Changes Ends -->
    <!--Fix for 17639247 -->
    <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT' and normalize-space($curr_fld/DTYPE) != 'NUMBER' ">
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
                <xsl:value-of select="$curr_fld/MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
                <xsl:if test="count($curr_fld/SIZE) != 0">
                    <xsl:value-of select="$curr_fld/SIZE"/>
                </xsl:if>
                <xsl:if test="count($curr_fld/SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                    <xsl:text>16</xsl:text>
                </xsl:if>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>                
        <xsl:attribute name="class">TXTro</xsl:attribute>
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']">
            <xsl:attribute name="class">
                <xsl:text>TXTro numeric</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count($curr_fld/DISABLED) > 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TXTro</xsl:attribute>
    </xsl:if>
   
    
    <xsl:if test="count($curr_fld/ACCESSKEY) > 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY"/>
        </xsl:attribute>
    </xsl:if>
		<!--Fix for 18319977 Start-->
		<!--<xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>-->
    <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE != 'TEXT'">
		<xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
    <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE = 'TEXT' and normalize-space($curr_fld/EVENT/NAME) != 'onchange'">
		<xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
     <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE = 'TEXT' and count(../LOV) &lt;= 0 and normalize-space($curr_fld/EVENT/NAME) = 'onchange'">
		<xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
	<!--Fix for 18319977 End-->
    <xsl:if test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>
    <xsl:template match="EVENT" mode="template">
    <xsl:variable name="eventname" select="./NAME">
     </xsl:variable>
    
    <xsl:if test="../TYPE = 'CHECKBOX' and ($eventname = 'onchange' or $eventname = 'onChange')">
        <xsl:attribute name="onclick">
            <xsl:value-of select="./FUNCTION"/>
        </xsl:attribute>
    </xsl:if>
    
   <xsl:if test="(../TYPE = 'SELECT' or ../TYPE = 'ROSELECT' or ../TYPE= 'TEXT' or ../TYPE= 'TEXTAREA')  and ($eventname = 'onblur' or $eventname = 'onBlur') and count(../LOV) = 0"><!--REDWOOD_35307988-->
                <xsl:attribute name="onchange">
                <xsl:value-of select="./FUNCTION"/>
            </xsl:attribute>
        </xsl:if>
<!--REDWOOD_35307988-->
 <xsl:if test="(../TYPE = 'SELECT' or ../TYPE = 'ROSELECT' or ../TYPE= 'TEXT' or ../TYPE= 'TEXTAREA')  and ($eventname = 'onblur' or $eventname = 'onBlur') and count(../LOV) > 0">
                <xsl:attribute name="onfocusout">
                <xsl:value-of select="./FUNCTION"/>
            </xsl:attribute>
        </xsl:if>
<!--REDWOOD_35307988-->
        
   <xsl:if test="(../TYPE != 'CHECKBOX' and ../TYPE != 'SELECT' and ../TYPE != 'ROSELECT' ) or ((../TYPE = 'CHECKBOX' and ($eventname != 'onchange' and $eventname != 'onChange')) or ( (../TYPE = 'SELECT'  or ../TYPE = 'ROSELECT' ) and ($eventname != 'onblur' and $eventname != 'onBlur')) )">
    <xsl:attribute name="{./NAME}">
        <xsl:if test="$thirdChar != 'C' or ($thirdChar = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($thirdChar = 'C' and count(../NAME) = 0)">
            <xsl:if test="($eventname = 'onchange'  or $eventname = 'onChange' ) and (../TYPE!= 'SELECT' and ../TYPE!= 'ROSELECT' and ../TYPE!= 'RADIO' )">
                <xsl:text>fnRefreshFieldValue(this);</xsl:text>
            </xsl:if>
             <xsl:if test="(../TYPE!= 'RADIO' ) or ((../TYPE = 'RADIO' ) and ($eventname != 'onchange'  and $eventname != 'onChange' ))">
                <xsl:value-of select="./FUNCTION"/>
              </xsl:if>
             <xsl:if test="($eventname = 'onchange'  or $eventname = 'onChange' ) and (../TYPE= 'RADIO' )">
                <xsl:text>fnRefreshFieldValue(this,'</xsl:text>
                 <xsl:value-of select="./FUNCTION"/>
                 <xsl:text>')</xsl:text>
              </xsl:if>
            <!--<xsl:value-of select="./FUNCTION"/>-->
            <!--Screen Saver Changes Start -->
            <xsl:if test="../TYPE = 'BUTTON'">
        	<xsl:text>;mainWin.fnUpdateScreenSaverInterval();</xsl:text>
                </xsl:if>
            <!--Screen Saver Changes End-->
        </xsl:if>
        <xsl:if test="$thirdChar = 'C' and (../NAME = 'BTN_OK' or ../NAME = 'BTN_EXIT')">
            <xsl:if test="../NAME = 'BTN_OK'">
                <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
            </xsl:if>
            <xsl:if test="../NAME = 'BTN_EXIT'">
                <xsl:text>fnExit_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
            </xsl:if>
        </xsl:if>
    </xsl:attribute>
    </xsl:if>
</xsl:template>
    <xsl:template match="CUSTOM" mode="template">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}">
            <xsl:value-of select="."/>
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>
    <xsl:template name="dispNumberField_tmp">
    <xsl:param name="EntityType"/>
    <!--<INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>    -->
     <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'ME' or ../../@VIEW = 'SE')">  
    <oj-label slot="label">
            <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <!--<xsl:text>I</xsl:text>-->
        </xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf CSCTRUDF -->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                        <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf</xsl:text>
                        <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                            <xsl:attribute name="class">
                            <xsl:text>oj-flex-item</xsl:text>
							</xsl:attribute>
                            <!-- Fix for 21309476 start-->
                            <!-- Fix for 21309476  end -->
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
			 <xsl:attribute name="show-required">true</xsl:attribute>
             <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf for function CSCTRUDF-->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                            <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf star</xsl:text>
                             <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''"><!--
                            <xsl:attribute name="class">
                                <xsl:text>star </xsl:text>
                            </xsl:attribute>-->
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
        </oj-label>
        </xsl:if>
    <!-- added for Amount/Exchange Rate patterns starts -->
    
        <oj-input-text slot="value"  >
         <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
                <xsl:attribute name="class">oj-form-control-text-align-right</xsl:attribute>
            </xsl:if>
             <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE')">
                <xsl:attribute name="class">oj-helper-text-align-end</xsl:attribute>
            </xsl:if>
            <!-- added for 17388325 start -->
            <xsl:attribute name="TITLE">
            <xsl:value-of select="../LBL"/>
           </xsl:attribute>
           <!--Fix for 21499059 start-->
           <xsl:if test="../LBL = ''">
                <xsl:attribute name="title">
                   <xsl:value-of select="../NAME"/>
                </xsl:attribute>
            </xsl:if>
            <!--Fix for 21499059 end-->
            <xsl:if test="../NAME = 'VERNO'">
            <xsl:attribute name="TITLE">
              <xsl:value-of select="$currentVersion"/>
            </xsl:attribute>
           </xsl:if>
            <xsl:if test="../NAME = 'LATVERNO'">
            <xsl:attribute name="TITLE">
              <xsl:value-of select="$totalVersion"/>
            </xsl:attribute>
           </xsl:if>
      
              <xsl:attribute name="converter">
				<xsl:text>{{numberConverter</xsl:text>
                                <xsl:value-of select="../../BLOCK"/>
                                <xsl:text>__</xsl:text>
                                <xsl:value-of select="../NAME"/>
                                <xsl:text>}}</xsl:text>
                </xsl:attribute>
                  <!--<xsl:attribute name="on-oj-value-changed">
				<xsl:text>{{rawValueListener}}</xsl:text>
                                
                </xsl:attribute>-->
               
                 
                
            <!-- added for 17388325 end -->
            <xsl:if test="count(../REFERRED_FIELDS) != 0">
                <xsl:attribute name="RNAMES">
                    <xsl:variable name="rNamesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rnamedata">
                                <xsl:value-of select="concat(RNAME,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rnamedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rNamesValue"/>
                </xsl:attribute>
                <xsl:attribute name="RTYPES">
                    <xsl:variable name="rTypesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rtypedata">
                                <xsl:value-of select="concat(RTYPE,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rtypedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rTypesValue"/>
                </xsl:attribute>
                <xsl:attribute name="onchange">
                    <xsl:text disable-output-escaping="yes">fnRefreshFieldValue(this);processNumber(this,event);</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--Changes for formatting number start-->
            <xsl:if test="count(../FORMAT_REQD) >  0 and (../FORMAT_REQD) = 'Y'">
            <xsl:attribute name="FORMAT_REQD">  
            <xsl:value-of select="../FORMAT_REQD"/>
            </xsl:attribute>
            </xsl:if>
            <!--Changes for formatting number end-->
            <xsl:if test="count(../REFERRED_FIELDS) = 0">
					<!-- Added for 16906908 -->
					<!--Bug id : 17298502 changes for changing onblur event to onchange event for lov    -->
                      <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
						<xsl:attribute name="onchange">                     
							<!--<xsl:text>validateInputNumber(this, event);</xsl:text>-->
							<xsl:call-template name="dispAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
							<!--Fix for 18319977 Start-->
							<xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onchange'">
								<xsl:call-template name="addOnchangeEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
							</xsl:if>
							<!--Fix for 18319977 End-->
						</xsl:attribute>
                      </xsl:if>
					  <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
						<!--<xsl:attribute name="onblur">                     
							<xsl:text>validateInputNumber(this, event);</xsl:text>
							--><!-- Fix for bug 17780454 starts --><!--
							<xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onblur'">
								<xsl:call-template name="addOnblurEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
							</xsl:if>	
						</xsl:attribute>-->
					  </xsl:if>
            </xsl:if>
            <!-- added for Amount/Exchange Rate patterns ends-->
            <xsl:attribute name="viewMode">Y</xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="readonly">true</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="normalize-space(../MIN_VAL) != ''">
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="../MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
            <xsl:if test="normalize-space(../MAX_VAL) != ''">        
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="../MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
            <xsl:if test="normalize-space(../MAX_DECIMALS) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="../MAX_DECIMALS"/>
            </xsl:attribute>
        </xsl:if>
            <!--Fix for 17639247 starts-->
            <xsl:if test="normalize-space(../MAXLENGTH) != ''">                
            <xsl:attribute name="length.max">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:attribute>
        </xsl:if>
            <!--Fix for 17639247 ends -->
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
            <!--Fix for 14321478 -UDF update issue-->
            <xsl:if test="count(../@UDF) != 0 and (../@UDF) = 'Y'">
			<xsl:attribute name="onbeforedeactivate">
				<xsl:text>fnUpdateUDFDBField(this);</xsl:text>
			</xsl:attribute>
		</xsl:if>
            <!--Fix for 14321478 -UDF update issue-->
    <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
    
    </oj-input-text>
    <xsl:call-template name="generateNumberScript" >
             <xsl:with-param name="numberNode" select=".."></xsl:with-param>
        </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) > 0 or (number(../MAXLENGTH) > $displaySize)">
        <xsl:call-template name="Popup_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        <!--
        <BUTTON class="BTNImg" title="{$narrative}" oldClassName="BTNimg" disabled="true" type="button">
                --><!-- 1203 JAWS change --><!--
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">0</xsl:attribute>--><!-- 1203 JAWS change --><!--
            </xsl:if>
                <xsl:call-template name="Popup_Handler_tmp"/>
                <span class="ICOnarrative">
                    <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                    <span class="LBLinv">
                        <xsl:value-of select="$narrative"/>
                    </span>
                </span>
            </BUTTON>-->
    </xsl:if>
    
</xsl:template>
    <xsl:template name="dispProductField_tmp">
    <xsl:param name="EntityType"/>
    <oj-input-text type="text" slot="value"   pickup_product="">
            <xsl:attribute name="viewMode">Y</xsl:attribute>
            <xsl:attribute name="readonly">true</xsl:attribute>
            <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                   
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                   
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0">
                <xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this, event);fnProductPickup();</xsl:text>
                   
                   
                </xsl:attribute>
            </xsl:if>
            <!-- Changes for AUTO_LOV end-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1"/>                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)"/>
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE"/>
            </xsl:if>
        </xsl:attribute>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        </oj-input-text>

            <!--</xsl:if>-->
        <!--HOTKEY-->
    <xsl:if test="count(../@HOTKEY) > 0 and ../@HOTKEY = 'Y'">
        <xsl:attribute name="onkeydown">
            <xsl:text>fnLaunchHotkyFunc(true,'</xsl:text><xsl:value-of select="../@FUNCTIONID"/><xsl:text>')</xsl:text>
        </xsl:attribute>
        <BUTTON class="BTNimg" title="{$narrative}" disabled="true" onclick="fnLaunchHotkyFunc(false,'{../@FUNCTIONID}')">
                <span tabindex="-1" class="ICOcustinfo">
                    <span class="LBLinv">
                        <xsl:value-of select="$narrative"/>
                    </span>
                </span>
            </BUTTON>
    </xsl:if>
        <!-- HOTKEY  END-->
</xsl:template>  
<!--input text width changes start-->
<xsl:template name="calcTextMaxWidth">
  <xsl:param name="curr_node"/>
   <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE') and ../../HREQ != '-1'">
  </xsl:if>
</xsl:template>
<!--input text width changes end-->
    <xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>
   <oj-input-text slot="value" type="TEXT">
    		<xsl:attribute name="viewMode">Y</xsl:attribute>
    <!--input text width changes start-->
     <xsl:if test="../../../../../../TAB[@ID !='TAB_FOOTER']"> <!--21238112-->
    <xsl:call-template name="calcTextMaxWidth">
        <xsl:with-param name="curr_node" select=".."/>
    </xsl:call-template>   
    </xsl:if>
        <!--input text width changes end-->
			 <!--fix for bug: 19060316 starts -->
       <xsl:if test="count(../HOTKEYREQ) &gt; 0">        
             <xsl:attribute name="HOTKEYREQ">
                <xsl:value-of select="../HOTKEYREQ" />
            </xsl:attribute>
       </xsl:if>
    <!--fix for bug: 19060316 ends -->
    <!--FCUBS_12.1_CASA_Joint_Holder_Display Changes starts-->
        <xsl:if test="count(../HOTKEYREQJA) &gt; 0">        
             <xsl:attribute name="HOTKEYREQJA">
                <xsl:value-of select="../HOTKEYREQJA" />
            </xsl:attribute>
        </xsl:if>
        <!--FCUBS_12.1_CASA_Joint_Holder_Display Changes Ends-->
            <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:attribute name="readonly">true</xsl:attribute>
            </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) > 0 and ../UPPERCASE = -1) or (count(../CASE) > 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
                <!--Fix for 16785126 -->
				<xsl:attribute name="onchange">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
					<!--Fix for 16785126 -->
                     <xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange"><!--Fix for 17337383 -->
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) > 0 and ../UPPERCASE = -1) or (count(../CASE) > 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
                <!--Fix for 16785126 -->
				<xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
					<!--Fix for 16785126 -->
                     <xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange"><!--Fix for 17337383 -->
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
               <!-- Bug#35271105_REDWOOD Start  -->
               <!-- <xsl:attribute name="onChange">fnToUppercase(this, event)</xsl:attribute>-->
                     <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
				<!-- Bug#35271105_REDWOOD End  -->
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
                <!--Fix for 16785126 -->
				<xsl:attribute name="onchange">
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
					<!--Fix for 16785126 -->
                     <xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange"><!--Fix for 17337383 -->
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange">validateRestrictedTextValue(this)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) > 0 and count(../INPUT_LOV) = 0">
                <!--Fix for 16785126 -->
				<xsl:attribute name="onchange">
                    <xsl:call-template name="dispAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
					<!--Fix for 16785126 -->
                     <xsl:if test="count(../EVENT) > 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                                <xsl:with-param name="curr_node" select=".."/>
                            </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) > 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange"><!--Fix for 17337383 -->
                    <xsl:call-template name="dispOfflineAutoLov">
                            <xsl:with-param name="curr_node" select=".."/>
                        </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
           <xsl:if test="normalize-space(../MAXLENGTH) = ''">
            <xsl:attribute name="MAXLENGTH">
	     <xsl:value-of select="number(../MAXLENGTH)"/>
	     </xsl:attribute>
	     </xsl:if>
		    <xsl:if test="(normalize-space(../DTYPE) != 'DATE' )">
            <xsl:if test="count(../MAXLENGTH) != 0 and normalize-space(../MAXLENGTH) != '' ">
               <xsl:attribute name="length.max">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1"/>                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)"/>
                </xsl:if>
	       </xsl:attribute>
				</xsl:if>
			</xsl:if>
		    <xsl:if test="(normalize-space(../DTYPE) = 'DATE' )">
				<xsl:if test="count(../MAXLENGTH) != 0 and normalize-space(../MAXLENGTH) != '' ">
					<xsl:attribute name="MAXLENGTH">
						<xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
						<xsl:value-of select="number(../MAXLENGTH) + 1"/>                                    
					</xsl:if>
					<xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)"/>
					</xsl:if>
					</xsl:attribute>
				</xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
		<xsl:attribute name="MAXLENGTH">
                <xsl:value-of select="../SIZE"/>
		</xsl:attribute>
            </xsl:if>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
                
            
        </xsl:if>
            <!-- added for Amount/Exchange Rate patterns starts -->
            <xsl:if test="count(../REFERRED_FIELDS) != 0">
                <xsl:attribute name="RNAMES">
                    <xsl:variable name="rNamesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rnamedata">
                                <xsl:value-of select="concat(RNAME,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rnamedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rNamesValue"/>
                </xsl:attribute>
                <xsl:attribute name="RTYPES">
                    <xsl:variable name="rTypesValue">
                        <xsl:for-each select="../REFERRED_FIELDS/RFIELD">
                            <xsl:variable name="l_rtypedata">
                                <xsl:value-of select="concat(RTYPE,'~')"/>
                            </xsl:variable>
                            <xsl:value-of select="$l_rtypedata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:value-of select="$rTypesValue"/>
                </xsl:attribute>
                <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onchange">
                    <xsl:if test="(count(../UPPERCASE) > 0 and ../UPPERCASE = -1) or (count(../CASE) > 0 and ../CASE = 'UPPER')">
                        <xsl:text disable-output-escaping="yes">fnToUppercase(this, event);processFields(event);</xsl:text>
                    </xsl:if>
                    <xsl:if test="(count(../UPPERCASE) = 0 and ../UPPERCASE = -1) or (count(../CASE) = 0 )">
                        <xsl:text disable-output-escaping="yes">processFields(event);</xsl:text>
                    </xsl:if>
                </xsl:attribute>
                </xsl:if>
            </xsl:if>
            <!-- added for Amount/Exchange Rate patterns ends -->
    <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) > 0 or (number(../MAXLENGTH) > $displaySize)">
        <!--<BUTTON class="BTNImg" oldClassName="BTNimg" disabled="true" type="button">
                --><!-- 1203 JAWS change --><!--
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">0</xsl:attribute>--><!-- 1203 JAWS change --><!--
            </xsl:if>-->
                <xsl:call-template name="Popup_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
               <!-- <span class="ICOnarrative">
                    <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                    <span class="LBLinv">
                        <xsl:value-of select="$narrative"/>
                    </span>
                </span>
            </BUTTON>-->
    </xsl:if>
        </oj-input-text> 
   
   
        <!--</xsl:if>-->
        <!--HOTKEY-->
    <xsl:if test="count(../@HOTKEY) > 0 and ../@HOTKEY = 'Y'">
        <xsl:attribute name="onkeydown">
            <xsl:text>fnLaunchHotkyFunc(true,'</xsl:text><xsl:value-of select="../@FUNCTIONID"/><xsl:text>')</xsl:text>
        </xsl:attribute>
        <BUTTON class="BTNimg" title="{$narrative}" disabled="true" onclick="fnLaunchHotkyFunc(false,'{../@FUNCTIONID}')">
                <span tabindex="-1" class="ICOcustinfo">
                    <span class="LBLinv">
                        <xsl:value-of select="$narrative"/>
                    </span>
                </span>
            </BUTTON>
    </xsl:if>
        <!-- HOTKEY  END-->
</xsl:template>
    <!-- MASK ENHANCEMENT CHANGES -->
    <xsl:template name="dispMaskingField_tmp">
    <xsl:param name="EntityType"/>
    <oj-input-text slot="value" type="TEXT">
            <xsl:attribute name="viewMode">Y</xsl:attribute>
            <xsl:attribute name="readonly">true</xsl:attribute>
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMAL) != ''  and normalize-space(../MAX_DECIMAL) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1"/>                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMAL) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)"/>
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE"/>
            </xsl:if>		
        </xsl:attribute>
            <xsl:attribute name="SIZE">		
            <xsl:choose>
                    <xsl:when test="(../NAME = 'MAKER' or  ../NAME = 'CHECKER') and ../SIZE &lt; ../MAXLENGTH">
                    <xsl:text>12</xsl:text>
                </xsl:when>
                    <xsl:otherwise>				
                    <xsl:value-of select="../SIZE"/>
		</xsl:otherwise>
                </xsl:choose>
        </xsl:attribute>
            <xsl:if test="(count(../UPPERCASE) > 0 and ../UPPERCASE = -1) or (count(../CASE) > 0 and ../CASE = 'UPPER')">
            <xsl:if test="count(../MASK_ID) > 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event);fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../MASK_ID) = 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        </xsl:if>
            <xsl:if test="(count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER')">
            <xsl:if test="count(../MASK_ID) > 0">
                <xsl:attribute name="onBlur">fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID"/></xsl:attribute>
            </xsl:if>
        </xsl:if>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
    <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) > 0 or (number(../MAXLENGTH) > $displaySize)">
        <xsl:call-template name="Popup_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        <!--<BUTTON class="BTNImg" oldClassName="BTNimg" disabled="true" type="button">
                --><!-- 1203 JAWS change --><!--
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">0</xsl:attribute>--><!-- 1203 JAWS change --><!--
            </xsl:if>
                <xsl:call-template name="Popup_Handler_tmp"/>
                <span class="ICOnarrative">
                    <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
                </span>
            </BUTTON>-->
    </xsl:if>
        </oj-input-text> 
   
</xsl:template>
    <xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="."/>

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
	<xsl:if test="$curr_fld/TYPE != 'CHECKBOX'"> <!-- Fix for  17421739	-->
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <!--Fix for 21499059 start-->
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:attribute name="title">
           <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!--Fix for 21499059 end-->
	</xsl:if><!--
    <xsl:attribute name="ID">
        <xsl:if test="count($curr_fld/../BLOCK) > 0">
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
        </xsl:if>
    </xsl:attribute>-->
    
     <xsl:if test="($curr_fld/../@TYPE = 'ME' and $curr_fld/../@VIEW != 'SE') and   $curr_fld/TYPE!='SELECT' and   $curr_fld/TYPE!='ROSELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
    </xsl:attribute>
    </xsl:if>
    
     <xsl:if test="($curr_fld/../@TYPE != 'ME' or $curr_fld/../@VIEW = 'SE' or $curr_fld/TYPE ='SELECT' or $curr_fld/TYPE ='ROSELECT')">
         <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
    </xsl:if>

     <xsl:if test="count($curr_fld/@CONTROL) > 0 and $curr_fld/@CONTROL = 'Y'">
        <xsl:attribute name="CONTROL_DBT">
           <xsl:text>UIBLOCK</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/@UDF) != 0 or $curr_fld/@UDF = 'Y'">
        <xsl:attribute name="onbeforedeactivate">
            <xsl:text>fnUpdateUDFDBField(this)</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME"/>
    </xsl:attribute>
		
    <xsl:attribute name="DTYPE">
        <xsl:value-of select="$curr_fld/DTYPE"/>
    </xsl:attribute>
    
    <xsl:if test="$curr_fld/../@TYPE != 'ME' and (($curr_fld/TYPE = 'TEXT' or $curr_fld/TYPE = 'TEXTAREA') and $curr_fld/DTYPE != 'NUMBER')">
        <xsl:if test="count($curr_fld/VALUE) = 0 or  $curr_fld/VALUE = ''">
            <xsl:attribute name="VALUE">
                <xsl:text></xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test="count($curr_fld/VALUE) > 0 and  $curr_fld/TYPE != 'CHECKBOX'">
      <!--xsl:if test="contains($curr_fld/VALUE, 'global.')" 29742379  -->
      
     <xsl:if test="contains($curr_fld/VALUE, 'global.') and contains($globalVariables,$curr_fld/VALUE) and ($curr_fld/../@TYPE != 'ME' )">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
        </xsl:attribute>
      </xsl:if>
      <!--12.0.3 Defaulting global variables end-->
      <!--xsl:if test="not(contains($curr_fld/VALUE, 'global.'))" 29742379  -->
      <xsl:if test="not(contains($curr_fld/VALUE, 'global.')) or not(contains($globalVariables,$curr_fld/VALUE))">
        <xsl:if test="$curr_fld/../@TYPE != 'ME'">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE"/>
        </xsl:attribute>
        </xsl:if>
        </xsl:if>
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'SELECT' and $curr_fld/TYPE != 'ROSELECT' and $curr_fld/TYPE != 'CHECKBOX' and normalize-space($curr_fld/VALUE) != ''">
          <!--xsl:if test="contains($curr_fld/VALUE, 'global.')" 29742379 -->
          <xsl:if test="contains($curr_fld/VALUE, 'global.') and contains($globalVariables,$curr_fld/VALUE)">
            <xsl:attribute name="DEFAULT">
              <xsl:value-of select="substring-before(substring-after($globalVariables, concat($curr_fld/VALUE,'~~')), '@@')"/>
            </xsl:attribute>
          </xsl:if>
          <!--xsl:if test="not(contains($curr_fld/VALUE, 'global.'))" 29742379 -->
          <xsl:if test="not(contains($curr_fld/VALUE, 'global.')) or not(contains($globalVariables,$curr_fld/VALUE))">
            <xsl:attribute name="DEFAULT">
                <xsl:value-of select="$curr_fld/VALUE"/>
            </xsl:attribute>
          </xsl:if>
        </xsl:if>
    </xsl:if>
    <xsl:choose>
            <xsl:when test="number($curr_fld/SIZE) > 23">
        <!-- Size fix starts -->
            <xsl:choose>
                    <xsl:when test="(count(../POPUPEDIT) = 0 and count(curr_fld/LOV) >0) or (count(../POPUPEDIT) >0 and count(curr_fld/LOV) = 0) or number($curr_fld/MAXLENGTH) > $displaySize">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4"/>
                    </xsl:attribute>
                </xsl:when>
                    <xsl:when test="(count(../POPUPEDIT) > 0 and count(curr_fld/LOV) >0) or (count(curr_fld/LOV) >0 and number($curr_fld/MAXLENGTH) > $displaySize)">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 8"/>
                    </xsl:attribute>
                </xsl:when>
                    <xsl:otherwise>
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="$curr_fld/SIZE"/>
                    </xsl:attribute>
                </xsl:otherwise>
                </xsl:choose>
        <!-- Size fix ends -->
        </xsl:when>
            <xsl:otherwise>
            <xsl:attribute name="SIZE">
                <xsl:if test="count(../POPUPEDIT) > 0 or (count($curr_fld/MAXLENGTH) >0 and $curr_fld/MAXLENGTH = '')">
                    <xsl:value-of select="$curr_fld/SIZE"/>
                </xsl:if>
                <xsl:if test="count(../POPUPEDIT) = 0">
                    <xsl:if test="number($curr_fld/MAXLENGTH) > $displaySize">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4"/>
                    </xsl:if>
                    <xsl:if test="number($curr_fld/MAXLENGTH) &lt;= $displaySize">
                        <xsl:value-of select="$curr_fld/SIZE"/>
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
        </xsl:otherwise>
        </xsl:choose>
    <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>  
        <!--fix for bug: 19060316 starts -->
        <xsl:if test="count($curr_fld/FOCUSREQ) &gt; 0 and $curr_fld/FOCUSREQ = 'Y'">
            <xsl:attribute name="TABINDEX">0</xsl:attribute>
        </xsl:if>
        <!-- fix for bug: 19060316 ends -->
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">   
            <!--<xsl:attribute name="class">TXTro</xsl:attribute>       	     
            --><!--<xsl:attribute name="disabled">true</xsl:attribute>-->
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select="'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0 and $curr_fld/TYPE != 'TEXTAREA'">
                <!--<xsl:attribute name="class">TXTro</xsl:attribute>       	     
                --><!--<xsl:attribute name="disabled">true</xsl:attribute>-->
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select="'N'"/></xsl:attribute>
            </xsl:if>  
            <xsl:if test="$curr_fld[TYPE = 'TEXTAREA']"><!--
                <xsl:attribute name="class">TXAro</xsl:attribute>-->
            </xsl:if>
			<!--Fix for 17180805 start -->
            <xsl:if test="count($curr_fld/CALENDARTEXT) > 0">
            	<!--<xsl:attribute name="class">
                	<xsl:text>TXTro TXTcal</xsl:text>
            	</xsl:attribute> -->
        	</xsl:if>
			<!--Fix for 17180805 end-->
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

      <xsl:if test="count($curr_fld/DISABLED) > 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">
            <!--<xsl:attribute name="class">TXTro</xsl:attribute>-->
        </xsl:if>
    </xsl:if>

    <xsl:if test="$curr_fld[TYPE = 'CHECKBOX'] or $curr_fld[TYPE = 'SELECT'] or $curr_fld[TYPE = 'ROSELECT']">
        <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="DISABLED"/>
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test="count($curr_fld/ACCESSKEY) > 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY"/>
        </xsl:attribute>
    </xsl:if>

	<!--Fix for 16785126 -->    
    <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE != 'TEXT'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
    <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE = 'TEXT' and normalize-space($curr_fld/EVENT/NAME) != 'onchange'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
     <xsl:if test="count($curr_fld/EVENT) > 0 and $curr_fld/TYPE = 'TEXT' and count(../LOV) &lt;= 0 and normalize-space($curr_fld/EVENT/NAME) = 'onchange'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
	<!--Fix for 16785126 -->
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template"/>
    <xsl:if test="count($curr_fld/REQD) > 0 and $curr_fld/REQD = -1">
    <xsl:attribute name="REQUIRED">
        <xsl:text>true</xsl:text>
    </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) > 0 and $curr_fld/REQD = -1">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
    <xsl:variable name="referFld">
    <xsl:if test="$refFld != ''">
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
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

    <xsl:if test="count($curr_fld/HIDDEN) > 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="class">hidden</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/AMENDABLE) > 0">
        <xsl:attribute name="AMENDABLE">
            <xsl:value-of select="$curr_fld/AMENDABLE"/>
        </xsl:attribute>
    </xsl:if>
      
    <xsl:if test="count($curr_fld/SUBSYSTEM) > 0">
        <xsl:attribute name="SUBSYSTEM">
            <xsl:value-of select="$curr_fld/SUBSYSTEM"/>
        </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
      
</xsl:template>
    <xsl:template name="LovHandler_tmp">
    <xsl:param name="curr_fld"/>
    <xsl:param name="EntityType"/>
    
    <xsl:if test="count($curr_fld/LOV) > 0">
    <!--1203 JAWS change -->
    
        <oj-button slot="end" display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" >
                <!--  <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
            <xsl:if test="$curr_fld/../@TYPE != 'ME' ">
                <xsl:attribute name="disabled">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="($curr_fld/../@TYPE = 'ME' and $curr_fld/../@VIEW != 'SE') or ($curr_fld/../@TYPE = 'ME' and count($curr_fld/../@VIEW) = 0)">
                <xsl:attribute name="disabled">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 
            </xsl:if>
            
            <!--<xsl:if test="$EntityType = 'NUMBERTEXT'">
            <xsl:attribute name="class">
            <xsl:text>inputNumLovIcon</xsl:text>
            </xsl:attribute>
            </xsl:if>-->
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="functionName" select="'disp_lov'"/>
                </xsl:call-template>
                <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <!--<xsl:attribute name="DISABLED"/>-->
            </xsl:if>
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                    <span class="LBLinv">
                        <xsl:value-of select="$lov"/>
                    </span>
                </span>
            </oj-button>
    </xsl:if>

    <!-- FCUBS10.3_WebBranch Changes chandra starts-->

    <xsl:if test="count($curr_fld/OFFLINE_LOV) > 0 ">
        <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$lov}" disabled="true" tabindex="-1">
                <xsl:call-template name="dispOfflineLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="functionName" select="'disp_offlinelov'"/>
                </xsl:call-template>
                <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
                <span tabindex="-1" class="ICOlov">
                    <span class="LBLinv">
                        <xsl:value-of select="$lov"/>
                    </span>
                </span>
            </BUTTON>
    </xsl:if>
    <!-- FCUBS10.3_WebBranch Changes chandra ends-->
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$lov}" ONCLICK="Account.show_lov()" disabled="true" tabindex="-1">
                    <span tabindex="-1" class="ICOlov">
                        <span class="LBLinv">
                            <xsl:value-of select="$lov"/>
                        </span>
                    </span>
                </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$lov}" ONCLICK="Branch.show_lov()" disabled="true" tabindex="-1">
                    <span tabindex="-1" class="ICOlov">
                        <span class="LBLinv">
                            <xsl:value-of select="$lov"/>
                        </span>
                    </span>
                </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$lov}" ONCLICK="Currency.show_lov()" disabled="true" tabindex="-1">
                    <span tabindex="-1" class="ICOlov">
                        <span class="LBLinv">
                            <xsl:value-of select="$lov"/>
                        </span>
                    </span>
                </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$lov}" ONCLICK="Customer.show_lov()" disabled="true" tabindex="-1">
                    <span tabindex="-1" class="ICOlov">
                        <span class="LBLinv">
                            <xsl:value-of select="$lov"/>
                        </span>
                    </span>
                </BUTTON>
        </xsl:if>
    </xsl:if>
</xsl:template>
    <xsl:template name="Popup_Handler_tmp">
       <xsl:param name="curr_fld"/>
        <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
        
        <xsl:if test="$curr_fld/TYPE = 'TEXTAREA'"> 
            <xsl:attribute name="class">
                    <xsl:text>inputNumLovIcon</xsl:text>
                </xsl:attribute>
        </xsl:if>
                <!--  <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
                <!--<xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="functionName" select="'disp_lov'"/>
                </xsl:call-template>-->
                <!--<xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>-->
            <xsl:attribute name="onclick">
        <xsl:text>show_editor('</xsl:text>
                <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
                <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
                    <xsl:value-of select="$curr_fld/MAXLENGTH"/>
        </xsl:if>
                <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
                    <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:if>
        <xsl:text>','</xsl:text>
                <xsl:if test="normalize-space($curr_fld/POPUPEDIT/TITLE) != ''">
            <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="$curr_fld/POPUPEDIT/TITLE"/>
                </xsl:call-template>
            <!--<xsl:value-of select="../POPUPEDIT/TITLE" />-->
        </xsl:if>
                <xsl:if test="normalize-space($curr_fld/POPUPEDIT/TITLE) = ''">
            <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="$curr_fld/LBL"/>
                </xsl:call-template>
            <!--<xsl:value-of select="../LBL" />-->
        </xsl:if>        
        <xsl:text>', event);</xsl:text>
    </xsl:attribute>
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline">
                    <!--<span class="LBLinv">
                        <xsl:value-of select="$lov"/>
                    </span>-->
                </span>
            
           
        </oj-button>
</xsl:template>
    <xsl:template name="dispAutoLov">
    <xsl:param name="curr_node"/>
    <xsl:text>disp_auto_lov('</xsl:text>
    <xsl:value-of select="$functionId"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/../BLOCK)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LBL)"/>
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
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/RED_FIELD)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/EXACT_FETCH)"/>
        </xsl:call-template>
    <xsl:text>', this, event);</xsl:text><!--Fix for 21220460-->
</xsl:template>
    <!--Fix for 16785126 -->
    <xsl:template name="addOnchangeEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
    <!--Fix for 16785126 -->
    <!-- Fix for bug 17780454 starts -->
    <xsl:template name="addOnblurEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
    <!-- Fix for bug 17780454 ends -->
    <xsl:template name="dispOfflineAutoLov">
    <xsl:param name="curr_node"/>
    <xsl:text>disp_auto_offlinelov('</xsl:text>
    <xsl:value-of select="$functionId"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/../BLOCK)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LBL)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/OFFLINE_LOV/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/TITLE)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/COL_HEADING)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/RED_FIELD)"/>
        </xsl:call-template>
    <xsl:text>', event)</xsl:text>
</xsl:template>
    <xsl:template name="dispLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="on-oj-action">
        <xsl:text>[[function() { </xsl:text>
        <xsl:value-of select="$functionName"/>
        <xsl:text>('</xsl:text>
        <xsl:value-of select="$functionId"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/../BLOCK)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LBL)"/>
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
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/RED_FIELD)"/>
            </xsl:call-template>
        <xsl:text>', '', event)</xsl:text>
        <xsl:text>}.bind(null)]] </xsl:text>
    </xsl:attribute>
</xsl:template>
    <xsl:template name="dispOfflineLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="onclick">
        <xsl:value-of select="$functionName"/>
        <xsl:text>('</xsl:text>
        <xsl:value-of select="$functionId"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/../BLOCK)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LBL)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/OFFLINE_LOV/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/TITLE)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/COL_HEADING)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/RED_FIELD)"/>
            </xsl:call-template>
        <xsl:text>', '', event)</xsl:text>
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
    <xsl:template name="dispLabelCaption_tmp">
    <xsl:param name="curr_fld" select="."/>
    <xsl:if test="count($curr_fld/ACCESSKEY) > 0 and normalize-space($curr_fld/ACCESSKEY) != ''">    
        <xsl:value-of select="substring-before($curr_fld/LBL,$curr_fld/ACCESSKEY)"/>
        <U>
                <xsl:value-of select="$curr_fld/ACCESSKEY"/>
            </U>
        <xsl:value-of select="substring-after($curr_fld/LBL,$curr_fld/ACCESSKEY)"/>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or (count($curr_fld/ACCESSKEY) > 0 and normalize-space($curr_fld/ACCESSKEY) = '') or not(contains($curr_fld/LBL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:if>
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
    
</xsl:template>
    <xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'"> 
     <!--   <xsl:if test="../LBL != ''"> -->
                     <oj-switch slot="value"  disabled="true">
                     <!--<xsl:attribute name="label-hint">  <xsl:value-of select="../LBL"/> </xsl:attribute>-->
                     
                        <xsl:call-template name="ATTR_Handler_tmp">
                            <xsl:with-param name="curr_fld" select=".."/>
                        </xsl:call-template>
                        <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                          <xsl:attribute name="value">true</xsl:attribute>
                    </xsl:if>
                   
                </oj-switch>
        <!--</xsl:if> -->
        <!--<xsl:if test="../LBL = ''">
            <label>
                    <xsl:attribute name="class">
                    <xsl:choose>
                            <xsl:when test="../../HREQ = '-1'">
                            <xsl:value-of select="'LBLChkRadSel LBLinvHF'"/>--><!--HTML5 Changes--><!--
                        </xsl:when>
                            <xsl:otherwise>
                            <xsl:value-of select="'LBLChkRadSel LBLinv2'"/>--><!--HTML5 Changes--><!--
                        </xsl:otherwise>
                        </xsl:choose>
                </xsl:attribute>
                    <xsl:attribute name="for">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                    <input type="checkbox" class="CHKstd" disabled="true">
                        <xsl:call-template name="ATTR_Handler_tmp">
                            <xsl:with-param name="curr_fld" select=".."/>
                        </xsl:call-template>
                        <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                    </input>
                    <div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes--><!--
                    <xsl:value-of select="../../LBL"/>
                </label>
        </xsl:if>-->
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
    
       <oj-switch slot="value"  >
                     <!--<xsl:attribute name="label-hint">  <xsl:value-of select="../LBL"/> </xsl:attribute>-->
                     
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                          <xsl:attribute name="value">true</xsl:attribute>
                    </xsl:if>
                     <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
              <xsl:attribute name="oj_switch_readonly">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
                </oj-switch>
    <!--
        
        <label class="LBLChkRadSel NewChkbox">
                --><!--HTML5 Changes--><!--
                <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
                --><!--<span class="LBLinv">
                    <xsl:value-of select="../NAME"></xsl:value-of>
                </span>--><!--
                 <oj-switch slot="value"  disabled="true">
                     --><!--<xsl:attribute name="label-hint">  <xsl:value-of select="../LBL"/> </xsl:attribute>--><!--
                     
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                          <xsl:attribute name="value">true</xsl:attribute>
                    </xsl:if>
                   
                </oj-switch>
                --><!--<input type="checkbox" class="CHKstd" disabled="true">
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                    <xsl:attribute name="title">
                    <xsl:value-of select="../LBL"/>
                </xsl:attribute>
                </input>--><!--
                --><!--<div class="DIVChkRadSel">
                    <span></span>
                </div>--><!--
                --><!--HTML5 changes 24/OCT/2016--><!--
                --><!--HTML5 Changes--><!--
                --><!--<xsl:value-of select="../LBL"/>--><!--
            </label>-->
    </xsl:if>

</xsl:template>
    <xsl:template name="dispDateField_tmp">
    <xsl:variable name="refFld" select="../REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
    </xsl:variable>
    <!--<INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>-->
        <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
    <oj-label slot="label">
            <xsl:attribute name="for">
           <!-- <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of> -->
            <xsl:value-of select="../NAME"></xsl:value-of><!-- Fix for 17027513 -->
            <xsl:text>I</xsl:text>
        </xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
         <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf CSCTRUDF -->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                        <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf</xsl:text>
                        <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                            <xsl:attribute name="class">
                                <xsl:text>oj-flex-item</xsl:text>
							</xsl:attribute>
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
            <xsl:attribute name="show-required">true</xsl:attribute>
             <!--UDF Changes Start --><!--    
                <xsl:choose>
                        --><!-- change for udf for function CSCTRUDF--><!--
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                            --><!--UDF Changes UDF label Start --><!--
                            <xsl:text>LBLUdf star</xsl:text>
                             --><!--UDF Changes UDF label End --><!--
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                            <xsl:attribute name="class">
                                <xsl:text>star </xsl:text>
							</xsl:attribute>
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>-->
                <!--UDF Changes End -->     
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
        </oj-label>
         </xsl:if>
    <oj-input-date slot="value" title="{../LBL}"  placeholder="{$dateFormat}" onblur="fnFireCustomDateEvent(this)" day-formatter="[[dayFormatter]]"  converter="[[dateConverter]]">
            <!--HTML5 Changes -->
	<!--9NT1606_14_0_RETRO_12_0_3_27393036 changes starts-->
    <xsl:if test="$dateDelimiterReqd = 'Y'">
        <xsl:attribute name="onkeyup">                     
            <xsl:text>autoPopSep('{../NAME}', event);</xsl:text>
        </xsl:attribute>
    </xsl:if> 
    <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes ends-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="SIZE">
        <xsl:value-of select="11"/>
    </xsl:attribute>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
        </xsl:attribute>
         <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
    </xsl:if>
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
            <!--Fix for 14321478 -UDF update issue starts-->
            <xsl:if test="count(../@UDF) != 0 and (../@UDF) = 'Y'">
			<xsl:attribute name="onbeforedeactivate">
				<xsl:text>fnUpdateUDFDBField(this);</xsl:text>
			</xsl:attribute>
		</xsl:if>
            <!--Fix for 14321478 -UDF update issue ends-->
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="readonly">true</xsl:attribute>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
        </oj-input-date><!--
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">            
            <button class="BTNImg" oldClassName="BTNimg" title="{$calendar}" onclick="disp_cal('{../NAME}', event)" disabled="true" tabindex="0" type="button">
                    --><!-- 1203 JAWS change --><!--
                    <span tabindex="-1" class="ICOcalendar">
                        <span class="LBLinv">
                            <xsl:value-of select="$calendar"/>
                        </span>
                    </span>
                </button>
        </xsl:if>
    </xsl:if>-->
    <xsl:if test="count(../LOV) > 0">
        <xsl:call-template name="LovHandler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
    </xsl:if>
</xsl:template>
<xsl:template name="dispDateField_tmp1">
    <xsl:variable name="refFld" select="../REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
    </xsl:variable>
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>
    <label class="LBLinv">
            <xsl:attribute name="for">
           <!-- <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of> -->
            <xsl:value-of select="../NAME"></xsl:value-of><!-- Fix for 17027513 -->
            <xsl:text>I</xsl:text>
        </xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
         <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <!--UDF Changes Start -->    
                <xsl:choose>
                        <!-- change for udf CSCTRUDF -->
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                        <!--UDF Changes UDF label Start -->
                            <xsl:text>LBLUdf</xsl:text>
                        <!--UDF Changes UDF label End -->
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                            <xsl:attribute name="class">
                                <xsl:text>LBLstd</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                <!--UDF Changes End -->     
            </xsl:if><!--
            <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
             --><!--UDF Changes Start --><!--    
                <xsl:choose>
                        --><!-- change for udf for function CSCTRUDF--><!--
                        <xsl:when test="$functionId='CSCFNUDF' or $functionId='CSCTRUDF'">
                        <xsl:attribute name="class">
                            --><!--UDF Changes UDF label Start --><!--
                            <xsl:text>LBLUdf star</xsl:text>
                             --><!--UDF Changes UDF label End --><!--
                        </xsl:attribute>
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:if test="../LBL != ''">
                            <xsl:attribute name="class">
                                <xsl:text>LBLstd star </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                    </xsl:otherwise>
                    </xsl:choose>
                --><!--UDF Changes End --><!--     
            </xsl:if>-->
            <xsl:value-of select="../LBL"/>
        </xsl:if>
        </label>
    <INPUT TYPE="TEXT" title="{../LBL}" onblur="validateInputDate('{../NAME}', event)" readonly="true" placeholder="{$dateFormat}">
            <!--HTML5 Changes -->
            <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes starts-->
            <xsl:if test="$dateDelimiterReqd = 'Y'">
        <xsl:attribute name="onkeyup">                     
            <xsl:text>autoPopSep('{../NAME}', event);</xsl:text>
        </xsl:attribute>
    </xsl:if>
            <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes ends-->
            <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="SIZE">
        <xsl:value-of select="11"/>
    </xsl:attribute>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
        </xsl:attribute>
    </xsl:if>
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
            <!--Fix for 14321478 -UDF update issue starts-->
            <xsl:if test="count(../@UDF) != 0 and (../@UDF) = 'Y'">
			<xsl:attribute name="onbeforedeactivate">
				<xsl:text>fnUpdateUDFDBField(this);</xsl:text>
			</xsl:attribute>
		</xsl:if>
            <!--Fix for 14321478 -UDF update issue ends-->
        </INPUT>
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">            
            <button class="BTNImg" oldClassName="BTNimg" title="{$calendar}" onclick="disp_cal('{../NAME}', event)" disabled="true" tabindex="0" type="button">
                    <!-- 1203 JAWS change -->
                    <span tabindex="-1" class="ICOcalendar">
                        <span class="LBLinv">
                            <xsl:value-of select="$calendar"/>
                        </span>
                    </span>
                </button>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count(../LOV) > 0">
        <xsl:call-template name="LovHandler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
    </xsl:if>
</xsl:template>
    <xsl:template name="dispDateTimeField_tmp">
    <!--<INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="fnFormatTimeStamp(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>-->
        <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
    <oj-label slot="label">
            <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:choose>
                    <!--21238112 starts-->
            <xsl:when test="../../../../../../TAB[@ID ='TAB_FOOTER']">
            </xsl:when>
                                                        </xsl:choose>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
        </oj-label>
        </xsl:if>
        <!--datetime-->
    <oj-input-date-time slot="value" readonly="true" day-formatter="[[dayFormatter]]">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
             <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
        </oj-input-date-time>
</xsl:template>
    <xsl:template name="dispTextareaField_tmp">
    <xsl:param name="position" select="."/>
    <!--<div slot="value">-->
    <oj-text-area slot="value">
            <xsl:attribute name="ROWS">
            <xsl:if test="../ROWS = ''">
                <xsl:text>2</xsl:text>
            </xsl:if>
            <xsl:if test="../ROWS != ''">
                <xsl:value-of select="../ROWS"/>
            </xsl:if>
        </xsl:attribute>
            <xsl:attribute name="COLS">
            <xsl:if test="../COLS = ''">
                <xsl:text>20</xsl:text>
            </xsl:if>
            <xsl:if test="../COLS != ''">
                <xsl:value-of select="../COLS"/>
            </xsl:if>
        </xsl:attribute>
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="readonly">true</xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../READ_ONLY) > 0 and ../READ_ONLY = -1">
             <xsl:attribute name="READONLY1">true</xsl:attribute> <!--21368033-->
             </xsl:if>
            <!--<xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE"/>
            </xsl:if>
        </xsl:attribute>!-->
		<!---36371242 !-->
		            <xsl:if test="count(../MAXLENGTH) != 0 and normalize-space(../MAXLENGTH) != '' ">
               <xsl:attribute name="length.max">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1"/>                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)"/>
                </xsl:if>
	       </xsl:attribute>
				</xsl:if>
            <!-- for ME text fields needs add title and * !-->
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
              <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
        </xsl:if>
        </oj-text-area>
    
    <xsl:if test="count(../POPUPEDIT) > 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
    <!-- 1203 JAWS change -->
        <xsl:call-template name="Popup_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template><!--
         <BUTTON class="BTNImg" oldClassName="BTNimg" title="{$narrative}" disabled="true" tabindex="0" type="button">
                <xsl:call-template name="Popup_Handler_tmp"/>
                <span class="ICOnarrative" tabindex="-1">
                    <span class="LBLinv">
                        <xsl:value-of select="$narrative"/>
                    </span>
                </span>
            </BUTTON>-->
    </xsl:if>
    <!--</div>-->
</xsl:template>
    <xsl:template name="dispSelectField_tmp">
    
    <oj-select-single slot="value">
            <!-- <xsl:attribute name="data">
             <xsl:text>
             selectArrayProvider['arrProvider</xsl:text>
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>']</xsl:text>
             </xsl:attribute>-->
            <!--<xsl:if test="../TYPE = 'ROSELECT'">
            <xsl:attribute name="ROSELECT">true</xsl:attribute>
            <xsl:attribute name="onpropertychange">fnShowROSelectValue(this)</xsl:attribute>
        </xsl:if>-->
         <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
             <xsl:attribute name="readonly">true</xsl:attribute>
            <xsl:attribute name="ME">
                <xsl:text>N</xsl:text>
            </xsl:attribute>
        </xsl:if>
            <xsl:attribute name="ID">
        <xsl:value-of select="concat(../BLOCK,'__',../NAME)"></xsl:value-of>
    </xsl:attribute>
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
            </xsl:attribute>
             <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
             <xsl:attribute name="ME">
                <xsl:text>Y</xsl:text>
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
            <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
    </xsl:if>
            <xsl:if test="count(../MULTIPLE) > 0 and ../MULTIPLE = -1">
        <xsl:attribute name="MULTIPLE">MULTIPLE</xsl:attribute>
    </xsl:if>
            <!--Added by Binson -->
            <!--<xsl:if test="count(../WIDTH) > 0">
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
                <xsl:value-of select="../WIDTH"/>
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
    </xsl:if>-->
	<!--Fix for 28371503-->
	<xsl:if test="count(../SIZE) = 0 or (count(../SIZE) > 0 and ../SIZE = '')">
        <xsl:attribute name="SIZE"><xsl:text>1</xsl:text></xsl:attribute>
    </xsl:if>
    
    <!--<xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'"> -->
     <xsl:variable name="dfltSelected">
     <xsl:for-each select="../OPTION">
            <xsl:variable name="tempDfltSlct">
        <xsl:if test="count(@SELECTED) > 0 and @SELECTED=-1">
                    <xsl:value-of select="'Y'"/>
                </xsl:if>
            </xsl:variable>
            <xsl:value-of select="$tempDfltSlct"/>
        </xsl:for-each>
    </xsl:variable>
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
     <xsl:for-each select="../OPTION">
        <xsl:if test="(count(@SELECTED) > 0 and @SELECTED=-1) or (not(contains($dfltSelected, 'Y')) and position() = '1')">
                <xsl:attribute name="value">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
                <xsl:attribute name="DEFAULTSEL">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
        </xsl:if>
    </xsl:for-each> 
    </xsl:if>
            
	<!--Fix for 28371503-->
         <!--   <xsl:for-each select="../OPTION">
        <oj-option VALUE="{@VALUE}">
                    <xsl:if test="count(@SELECTED) > 0 and @SELECTED=-1">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                <xsl:attribute name="DEFAULT">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
            </xsl:if>
                    <xsl:value-of select="."/>
                </oj-option>
    </xsl:for-each> -->
    </oj-select-single>
    <xsl:call-template name="generateSelectScript">
                <xsl:with-param name="selectNode" select=".."/>
    </xsl:call-template>
</xsl:template>
<xsl:template name="generateSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
   <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
     selectControl['<xsl:value-of select="concat('UIBLOCK__',$selectNode/NAME)"></xsl:value-of>'] = [];
     </xsl:if>
     <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
     selectControl['<xsl:value-of select="concat($selectNode/../BLOCK,'__',$selectNode/NAME)"></xsl:value-of>'] = [];
     </xsl:if>
    <xsl:for-each select="$selectNode/OPTION">
     var obj = { "value":  "<xsl:value-of select="@VALUE"/>", "label": "<xsl:value-of select="."/>" };
       <xsl:if test="count(@SELECTED) > 0 and @SELECTED='-1'">
       obj = { "value":  "<xsl:value-of select="@VALUE"/>", "label": "<xsl:value-of select="."/>" ,"defaultValue":  "<xsl:value-of select="@VALUE"/>"};
       </xsl:if>
     
      <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
    selectControl['<xsl:value-of select="concat('UIBLOCK__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
     </xsl:if>
     <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
     selectControl['<xsl:value-of select="concat($selectNode/../BLOCK,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
     </xsl:if>
    </xsl:for-each>
     <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
       arrProvider<xsl:value-of select="concat('UIBLOCK__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat('UIBLOCK__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
    </xsl:if>
 <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
       arrProvider<xsl:value-of select="concat($selectNode/../BLOCK,'__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($selectNode/../BLOCK,'__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
              </xsl:if>
       
    </script>
</xsl:template>
    <xsl:template name="dispButtonField_tmp">
    <oj-button slot="value" class="oj-button-md" disabled="true">
            <!-- Fix for 21627033-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:choose>
                <xsl:when test="contains(../NAME,'BTN_PREV') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_REMOVE')">
                <!--<xsl:attribute name="class">BTNimg</xsl:attribute>-->
                <xsl:variable name="l_btnimg">
                    <xsl:if test="contains(../NAME,'BTN_PREV')"><xsl:value-of select="'oj-ux-ico-caret-left'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_NEXT')"><xsl:value-of select="'oj-ux-ico-caret-right'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_ADD')"><xsl:value-of select="'oj-ux-ico-plus'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_REMOVE')"><xsl:value-of select="'oj-ux-ico-minus'"/></xsl:if>
                </xsl:variable>
                <xsl:if test="count(../../BLOCK) = 0">
                    <xsl:attribute name="ID"><xsl:value-of select="../ID"/></xsl:attribute>
                    <xsl:attribute name="NAME"><xsl:value-of select="../NAME"/></xsl:attribute>
                </xsl:if>
                 <span tabindex="-1" class="{$l_btnimg}"></span>                   
            </xsl:when>
                <xsl:otherwise>
                <xsl:if test="count(../SRC) > 0">
                    <xsl:attribute name="class">BTNtext</xsl:attribute>                   
                    <xsl:if test="count(../../BLOCK) = 0">
                        <xsl:attribute name="ID"><xsl:value-of select="../NAME"/></xsl:attribute>
                        <xsl:attribute name="NAME"><xsl:value-of select="../NAME"/></xsl:attribute>
                    </xsl:if>
                    <xsl:variable name="l_srcimg" select="../className"/>
                    <span tabindex="-1" class="{$l_srcimg}"></span>  
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}"/>-->
                </xsl:if>
            </xsl:otherwise>
            </xsl:choose>
            <xsl:value-of select="../LBL"/>
        </oj-button>
</xsl:template>
    <xsl:template name="dispFileField_tmp">
    
  <!--  <label class="LBLstd" for=""></label>-->
    <INPUT TYPE="File" class="TXTro" size="10" readonly="true">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
        </INPUT>
    
</xsl:template>
    <xsl:template name="dispMaskField_tmp">
    <xsl:param name="EntityType"/>
   <!-- <label class="LBLinv" for=""></label>-->
   <OJ-INPUT-TEXT style="display:none;" onpropertychange="displayValue(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </OJ-INPUT-TEXT>

    <!--<INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');" readonly="true" >-->
    <!--<label class="LBLstd" for=""></label><INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onblur="validateInputValue('{../NAME}');" readonly="true">-->
    <label class="LBLstd" for=""></label><INPUT TYPE="TEXT" mask="{../MASK}" onblur="validateInputValue('{../NAME}');" readonly="true">
            <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
			 <xsl:if test="count(../REQD) > 0 and ../REQD = '-1'">
			 <xsl:attribute name="show-required">true</xsl:attribute>
		     </xsl:if>
        </xsl:attribute>
    </xsl:if>
        </INPUT>
</xsl:template>
    <xsl:template name="dispPasswordField_tmp">    
    <!--<oj-input-password slot="value" onpaste="return false;" readonly="true" mask-icon="visible">-->
    <oj-input-password slot="value" onpaste="return false;"  mask-icon="visible">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE"/>
            </xsl:if>
        </xsl:attribute>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!-- <xsl:if test="../REQD='-1'"> * </xsl:if> -->
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:attribute name="readonly">true</xsl:attribute>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../NAME"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
<!--REDWOOD_35670751 starts-->
              <xsl:attribute name="viewchanges">
                 <xsl:text>[[row.data.</xsl:text>
                <xsl:value-of select="../NAME"/>
                <xsl:text>color]]</xsl:text> 
            </xsl:attribute>
<!--REDWOOD_35670751 ends-->
            <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
        </oj-input-password>
</xsl:template>
    <xsl:template name="dispLabelOnlyField_tmp">
    <oj-label  >
            <!--<xsl:if test="../TYPE[text()='GROUP']">
            <xsl:attribute name="class">
                <xsl:value-of select="'LABELGroup'"/>
            </xsl:attribute>
        </xsl:if>-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:value-of select="../LBL"/>
        </oj-label>
</xsl:template>
    <xsl:template name="dispImgField_tmp">
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="count(../ALT) > 0">
            <xsl:attribute name="ALT">
                <xsl:value-of select="../ALT"/>
            </xsl:attribute>
        </xsl:if>
        </IMG>
</xsl:template>
    <xsl:template name="dispDescriptionField_tmp">
    <xsl:param name="EntityType"/>

    <label class="LBLauto">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:if test="count(../VALUE) > 0">
        <xsl:value-of select="../VALUE"/>
    </xsl:if>
        </label>

</xsl:template>
    <xsl:template name="dispLinkType_tmp">
    <xsl:variable name="paramList">
        <xsl:for-each select="../CUSTOM/*"><xsl:value-of select="name()"/>=<xsl:value-of select="."/>&amp;</xsl:for-each>
    </xsl:variable>

    <a class="" onclick="fnLaunchLinkWindow(this,'{$paramList}');">
            <xsl:attribute name="href">
            <xsl:if test="contains(../LABEL_LINK,'http://')"><xsl:value-of select="../LABEL_LINK"/></xsl:if>
            <xsl:if test="not(contains(../LABEL_LINK,'http://'))">http://<xsl:value-of select="../LABEL_LINK"/></xsl:if>
        </xsl:attribute>
            <span class="Astd">
                <xsl:if test="../LBL != ''">
            <xsl:value-of select="../LBL"/>
        </xsl:if>
                <xsl:if test="../LBL = ''">
            <xsl:value-of select="../LABEL_LINK"/>
        </xsl:if>
            </span>
        </a>
    
</xsl:template>
    <xsl:template name="dispCheckboxField_tmp_fldset">
    <xsl:if test="../LBL != ''">
        <label class="LBLChkRadSel NewChkbox"><!--HTML5 Changes-->
                <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
                <input type="checkbox" disabled="true"><!--HTML5 Changes-->
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                </input>
                <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
                <xsl:value-of select="../LBL"/>
            </label>
    </xsl:if>
    <xsl:if test="../LBL = ''">
        <label>
                <xsl:attribute name="class">
                <xsl:choose>
                        <xsl:when test="../../HREQ = '-1'">
                        <xsl:value-of select="'LBLChkRadSel NewChkbox LBLinvHF'"/><!--HTML5 Changes-->
                    </xsl:when>
                        <xsl:otherwise>
                        <xsl:value-of select="'LBLChkRadSel NewChkbox LBLinv2'"/><!--HTML5 Changes-->
                    </xsl:otherwise>
                    </xsl:choose>
            </xsl:attribute>
                <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
                <input type="checkbox" disabled="true"><!--HTML5 Changes-->
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) > 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                </input>
                <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
                <xsl:value-of select="../../LBL"/>
            </label>
    </xsl:if>
</xsl:template>
    <!-- 13/10/08 OCX Related modification starts -->
    <xsl:template name="dispOCX">
    <xsl:variable name="fieldName" select="../NAME"/>
    <OBJECT>
            <xsl:attribute name="ID">
            <xsl:value-of select="$fieldName"/>
        </xsl:attribute>
            <xsl:attribute name="CLASSID">
            <xsl:value-of select="../OBJECT/@CLASSID"/> 
        </xsl:attribute>
        </OBJECT>
</xsl:template>
    <!-- 13/10/08 OCX Related modification ends -->
    <xsl:template name="StdBtnEntry_tmp">
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '1'">
        <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT_IMG" name="BTN_EXIT" on-oj-action="[[fnExitAll.bind(null,'')]]" label="{$exit}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnExitAll.bind(null,'</xsl:text><xsl:value-of select="$screen"/><xsl:text>')]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$exit"/>-->
        </oj-button>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '2'">
       
        <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT_IMG" name="BTN_EXIT" on-oj-action="[[fnExitAll.bind(null,'')]]" label="{$exit}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnExitAll.bind(null, '</xsl:text><xsl:value-of select="$screen"/><xsl:text>')]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$exit"/>-->
        </oj-button>
        <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid" name="BTN_OK" ID="BTN_OK" on-oj-action="[[fnSaveAll.bind('', event)]]" label="{$saveLbl}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnSaveAll.bind(null, '</xsl:text><xsl:value-of select="$screen"/><xsl:text>')]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$ok"/>-->
        </oj-button>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '3'">
        <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT_IMG" name="BTN_EXIT" on-oj-action="[[fnExitAll.bind(null,'')]]" label="{$exit}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnExitAll.bind(null, '</xsl:text><xsl:value-of select="$screen"/><xsl:text>')]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$exit"/>-->
        </oj-button>
        <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid" name="BTN_OK" ID="BTN_OK" on-oj-action="[[fnSaveAll.bind(null,'', event)]]" label="{$saveLbl}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnSaveAll.bind(null, '</xsl:text><xsl:value-of select="$screen"/><xsl:text>')]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$ok"/>-->
        </oj-button>
        <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_REJECT" name="BTN_REJECT" on-oj-action="[[fnRejectAll.bind(null,'', event)]]" label="{$reject}">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="on-oj-action">
                    <xsl:text>[[fnRejectAll.bind(null,'</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)]]</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:value-of select="$reject"/>-->
        </oj-button>
       
    </xsl:if>
</xsl:template>
    <!-- End of ExtCore.xsl -->
    <!-- Start of ExtTabs.xsl -->
    <xsl:template name="DisplayTemplateTabs">
        <!--<div class="DIVThreeColSectionContainer">-->
            <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE"/>
            <!--<xsl:if test="$l_scr_type != 'L'">
                    <xsl:attribute name="class">oj-flex-item</xsl:attribute>
                </xsl:if>
            --><div class="oj-sm-width-full oj-flex-item">
                  
                <div id="SYS_TBL_TABS"> 
                <oj-conveyor-belt class="convyorBeltContainer oj-sm-padding-5x-horizontal oj-flex-item oj-sm-12" arrow-visibility="visible" data-oj-binding-provider="none">
                                <oj-navigation-list drill-mode="none" selection="" edge="top">
                    <ul id="tablist">
                        <!-- TODO: ? Infra added mode=template in xsl tag -->
                        <xsl:apply-templates select="BODY/TAB[@ID != 'All']" mode="template"/>
                    </ul>
                    </oj-navigation-list>
                    </oj-conveyor-belt>
            </div>
        </div>
   </xsl:template>
    <xsl:template match="BODY/TAB" mode="template">
    <li>
            <xsl:variable name="tpage">
            <xsl:value-of select="@ID"/>
        </xsl:variable>
            <a href="#href{@ID}" tabindex='0' class="oj-sm-margin-2x-start" onkeydown="return handleTabKeys(this,event)" objClicked="false">
                <xsl:variable name="sc">
                <xsl:text>'</xsl:text>
            </xsl:variable>
                <xsl:attribute name="id">
                <xsl:value-of select="@ID"/>
            </xsl:attribute>
                <xsl:attribute name="onClick">
                <xsl:text>return expandcontent('</xsl:text><xsl:value-of select="$tpage"/><xsl:text>')</xsl:text>
            </xsl:attribute>
                    <xsl:if test="count(LBL) > 0">
                    <xsl:call-template name="dispLabelCaption_tmp">
                            <xsl:with-param name="curr_fld" select="."/>
                        </xsl:call-template>
                </xsl:if>
            </a>
        </li>

</xsl:template>
    <!-- End of ExtTabs.xsl -->
    <xsl:variable name="uixml">
        <xsl:if test="$uiXML != ''">
            <xsl:value-of select="$uiXML"/>
        </xsl:if>
        <xsl:if test="$uiXML = ''">
            <xsl:value-of select="$functionId"/>
        </xsl:if>
    </xsl:variable>
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE"/>
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
    <xsl:template match="/">
        <xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
    </xsl:template>
    <xsl:template match="SCREEN">
         <!-- FCUBS 11.4.1 INFRA Fix Starts -->
        
		<div class="DIVHeaderBodyContainer" id="DIVMainTmp">
            <!-- Fix for Bug 16700426 and 16785227 - removed attribute style="overflow-x:hidden" from div element -->
            <!-- FCUBS 11.4.1 INFRA Fix Ends-->
            <!-- Processing header -->
			<xsl:apply-templates select="HEADER/TAB" mode="template"/>
            <!--Processing Body  !-->
            <xsl:if test="count(BODY/TAB) > 1">
                <xsl:call-template name="DisplayTemplateTabs"/>
                <div id="mainTabContainer" tabindex="-1">
                    <!--21828010 -->
                    <xsl:apply-templates select="BODY/TAB">
                        <xsl:with-param name="tabCount" select="count(BODY/TAB)"/>
                    </xsl:apply-templates>
                </div>
            </xsl:if>
            <xsl:if test="count(BODY/TAB) = 1">
              <div id="mainTabContainer" tabindex="-1">
                    <!--21828010 -->
                    <xsl:apply-templates select="BODY/TAB">
                        <xsl:with-param name="tabCount" select="count(BODY/TAB)"/>
                    </xsl:apply-templates>
                </div>
            </xsl:if>
                    <xsl:variable name="footerId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)"/>
        <xsl:apply-templates select="FOOTER/TAB" mode="template"/>
        <!--<div class="DIVAudit" ID="TBLPage{@ID}" >
            --><!--<TABLE ID="TBLPage{@ID}" cellpadding="0" cellspacing="0" border="0" width="99%" role="presentation">
                <TR>
                    <TD width="98%" valign="top">
                        <xsl:apply-templates select="SECTION" mode="footer"/>
                    </TD>
                    <TD nowrap="nowrap" style="padding-left:10px">
                        <xsl:call-template name="StdBtnEntry_tmp"/>
                    </TD>
                </TR>
            </TABLE>--><!--
            
            <xsl:apply-templates select="FOOTER/TAB" mode="template"/>
            
            --><!--<xsl:apply-templates select="SECTION" mode="footer"/>--><!--
        </div>-->
        </div>
        
        <!-- Processing footer Section-->
        <div class="DIVfooter" id="DIVFooter">
            <h2 class="LBLinv">
                <xsl:value-of select="$page_footer"/>
            </h2>
            <!--Processing Subscreen Buttons  !-->
            <!--<xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) > 0">-->
                <xsl:call-template name="SubSysBtns_tmp"></xsl:call-template>
            <!--</xsl:if>-->
            <!--Processing Footer !-->
            <!--<xsl:apply-templates select="FOOTER/TAB" mode="template"/>-->
        </div>
    </xsl:template>
    <xsl:template match="HEADER/TAB" mode="template">
        <xsl:variable name="tabId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)"/>
        <xsl:variable name="partCount" select="count(SECTION/PART)"/>
        <!--<div class="oj-sm-padding-5x-horizontal oj-sm-width-full">-->
        <div class="oj-sm-padding-5x-horizontal">
            <div class="oj-sm-width-full" ID="TBLPage{@ID}">
                <xsl:apply-templates select="SECTION"/>
            </div>
        </div>
    </xsl:template>
    <xsl:template match="BODY/TAB">
        <xsl:param name="tabCount" select="."/>
        <xsl:variable name="tabId" select="@ID"/>
        <xsl:variable name="tabSecCount" select="count(SECTION)"/>
        <xsl:variable name="tabpartCount" select="count(SECTION/PART)"/>
        <xsl:if test="$tabCount > 1">
         <div class="oj-sm-padding-5x-horizontal">
        <!-- <div class="oj-sm-padding-5x-horizontal oj-sm-width-full">-->
                <!-- 1203 oghag fix removed ID-->
                <xsl:variable name="sc">
                    <xsl:number value="position()" format="1"/>
                </xsl:variable>
                <div class="oj-sm-width-full" id="TBLPage{@ID}">
                    <xsl:if test="@ID = $CurTabId">
                        <a name="href{@ID}"></a>
                        <xsl:apply-templates select="SECTION"/>
                    </xsl:if>
                </div>
            </div>
        </xsl:if>
        <xsl:if test="$tabCount &lt;= 1">
            <div id="TBLPage{@ID}" class="oj-sm-padding-5x-horizontal">
                <xsl:apply-templates select="SECTION"/>
            </div>
        </xsl:if>
    </xsl:template>
    <!-- Processing subsystem buttons -->
    <xsl:template name="SubSysBtns_tmp">
        <div>
				<!--30620131 Added id attribute to ul-->
                <div class="oj-flex-bar oj-sm-align-items-center oj-sm-padding-5x-horizontal">
                <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) > 0">
                <oj-conveyor-belt id="subSystemConveyorBelt" class="convyorBeltContainer oj-md-10 oj-sm-12 oj-flex-bar-start" arrow-visibility="visible" data-oj-binding-provider="none"><!--REDWOOD_35298529-->
                    <xsl:for-each select="//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM">
                    <xsl:variable name="fnc" select="FUNCTION"/>
                    <xsl:variable name="uiXml">
                        <xsl:if test="UIXML != ''">
                            <xsl:value-of select="UIXML"/>
                        </xsl:if>
                        <xsl:if test="UIXML = ''">
                            <xsl:value-of select="$fnc"/>
                        </xsl:if>
                    </xsl:variable>
                    <xsl:variable name="scr" select="SCREEN"/>
                    <xsl:variable name="lbl" select="LBL"></xsl:variable>
                            <oj-button class="conveyorBeltItem oj-sm-margin-1x" id="{@id}" onkeydown="return fnhandleSubScrBtn(event)" >
                               
                                <xsl:attribute name="onclick">
                                <xsl:if test="@TYPE = 'S'">
                                    <xsl:text>fnSubScreenMain('</xsl:text><xsl:value-of select="$functionId"/><xsl:text>','</xsl:text><xsl:value-of select="$uixml"/><xsl:text>','</xsl:text><xsl:value-of select="SCREEN"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="@TYPE = 'OB' "><!--OBIEE Changes -->
                                    <xsl:text>fnLaunchOBIEESubScreen('</xsl:text><xsl:value-of select="$fnc"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="$scr"/><xsl:text>','</xsl:text><xsl:value-of select="TITLE"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="@TYPE = 'C' and FUNCTION != 'CSCFNUDF'">
                                    <xsl:text>fnSubScreenMain('</xsl:text><xsl:value-of select="$fnc"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="$scr"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="@TYPE = 'L'">
                                    <xsl:text>fnLaunchSubfunction('</xsl:text><xsl:value-of select="$fnc"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="$scr"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="FUNCTION = 'CSCFNUDF'">
                                    <xsl:text>fnShowUDFScreen('</xsl:text><xsl:value-of select="FUNCTION"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="SCREEN"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="@TYPE = 'LF'">
                                    <xsl:text>fnShowLaunchForm('</xsl:text><xsl:value-of select="$fnc"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="$scr"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <!--Function Id as Service Call Changes-->
                                 <xsl:if test="@TYPE = 'GQ'">
                                    <xsl:text>fnShowServiceScr('</xsl:text><xsl:value-of select="$fnc"/><xsl:text>','</xsl:text><xsl:value-of select="$uiXml"/><xsl:text>','</xsl:text><xsl:value-of select="$scr"/><xsl:text>')</xsl:text>
                                </xsl:if>
                                <xsl:if test="@TYPE = 'VL'">
                                    <xsl:text>fnViewChangeLog()</xsl:text>
                                </xsl:if>
                            </xsl:attribute>
                                <xsl:value-of select="$lbl"/>
                                
                            </oj-button>
                </xsl:for-each>
                </oj-conveyor-belt>
                </xsl:if>
                <div class="footer-btn-container oj-flex-bar-end">
                    <xsl:variable name="auditBtnReqd">
                        <xsl:for-each select="/FORM/SCREEN[@NAME = $screen]/FOOTER/TAB/SECTION//*[name() ='FIELD']">
                            <xsl:if test ="./TYPE != 'HIDDEN'">
                                <xsl:text>Y</xsl:text>
                            </xsl:if>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN = 'Y' and count(/FORM/SCREEN[@NAME = $screen]/FOOTER/TAB/SECTION) > 0 and contains($auditBtnReqd,'Y')">
                        <oj-button id="BTN_AUDIT" class=" oj-sm-margin-1x" chroming="solid" on-oj-action='[[displayAuditSection]]' label="{$audit}">
                            <!--<xsl:value-of select="$audit"/>-->
                    </oj-button>
                    </xsl:if>
                     <xsl:call-template name="StdBtnEntry_tmp"/>
                </div>
            </div>
            <!--<div id="DIVSubSystemController" style="width:2%;">
                <button class="BTNicon" title="{$expand_section}" id="BtnSubSysNav" onclick="fnExpandCollapseSubSys(this);" onkeydown="return fnhandleSubScrBtn(event)">-->
                    <!--Fix for 21611806-->
                    <!--HTML5 changes 24/OCT/2016 Fix for 24942185-->
                    <!--<span class="subSystemExpand"></span>
                </button>
            </div>-->
        </div>

        
    </xsl:template>
    <xsl:template match="FOOTER/TAB" mode="template">
        <xsl:variable name="footerId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)"/>
        <div ID="TBLPage{@ID}" >
        <oj-popup id="auditPop" class="oj-sm-width-full oj-sm-margin-1x demo-popup" modality="modal"
                     position.my.horizontal="left" position.my.vertical="bottom"
                      position.at.horizontal="left" position.at.vertical="bottom"
                      position.of="window" tail="none">
                <div class="demo-popup-body">
                       <div class="demo-popup-header oj-flex oj-sm-justify-content-flex-end">
                    <oj-button chroming="borderless" id="BTN_AUDIT_CLOSE" class="oj-button-sm" display="icons" 
                               on-oj-action="[[cancelListener.bind('', event)]]">
                            <span slot='startIcon' class="oj-ux-ico-close"></span>
                        </oj-button>
                    </div>
                    <div class="demo-popup-content oj-sm-padding-2x">
                        <xsl:apply-templates select="SECTION" mode="footer"/>
                    </div>
                </div>
            </oj-popup>
        </div>
        <!--<div class="DIVAudit">
            <TABLE ID="TBLPage{@ID}" cellpadding="0" cellspacing="0" border="0" width="99%" role="presentation">
                <TR>
                    <TD width="98%" valign="top">
                        <xsl:apply-templates select="SECTION" mode="footer"/>
                    </TD>
                    <TD nowrap="nowrap" style="padding-left:10px">
                        <xsl:call-template name="StdBtnEntry_tmp"/>
                    </TD>
                </TR>
            </TABLE>
        </div>-->
        
    </xsl:template>
</xsl:stylesheet>
