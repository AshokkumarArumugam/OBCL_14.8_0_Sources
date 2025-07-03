<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!--<xsl:import href="Tmp_Detail.xsl"/>-->
       <!--<xsl:import href="GlobalTemplateTabs.xsl"/>-->
       <!--<xsl:import href="Tmp_GlobalAudit.xsl"/>-->
       <!--<xsl:import href="Col_Detail.xsl"/>-->
       <!--
       <xsl:import href="Abs_Detail.xsl"/>
       !-->
       <!--<xsl:import href="GlobalAudit.xsl"/>-->
       <!--<xsl:import href="GlobalTabs.xsl"/>-->
       <xsl:output method="html"/>
       <xsl:param name="screen"/>
       <xsl:param name="isChildFunc"/>
       <xsl:param name="funcId"/>
<!--
       <xsl:param name="gTheme"/> -->
       <xsl:param name="imgPath"/> 
       <xsl:param name="typeString"/> 

       <xsl:param name="makerId"/>
       <xsl:param name="checkerId"/>
       <xsl:param name="DtStamp"/>
       <xsl:param name="modNo"/>
       <xsl:param name="recStat"/>
       <xsl:param name="authStat"/>
       <xsl:param name="contractStat"/>

<!-- Saidul Added to get the label desc for online Audit block -->
       <xsl:param name="paymentStat"/>
       <xsl:param name="collectionStat"/>
       <xsl:param name="dealStat"/>
       <xsl:param name="processStat"/>
       <xsl:param name="reversal"/>
       <xsl:param name="exit"/>
       <xsl:param name="cancel"/>
       <xsl:param name="ok"/>
       <!-- 10.2sp1 security related changes.-->
       <xsl:param name="containerId"/>
       <!-- <xsl:param name="remarks"/> -->
       <xsl:param name="audit"/>
       <xsl:param name="accept"/>
       <xsl:param name="vernoOfLbl"/>
       
       <xsl:param name="mandatory"/>
       <xsl:param name="collapsed"/>
       <xsl:param name="add_row"/>
       <xsl:param name="delete_row"/>
       <xsl:param name="single_rec_view"/>
       <xsl:param name="noScript"/>
       <xsl:param name="gateway_browser"/>
       <xsl:param name="select_all_rows"/>
       <xsl:param name="select_row"/>
        
       <!-- ctcb 3.0 changes by ranju -->
       <xsl:param name="priority"/>
       <xsl:param name="high"/>
       <xsl:param name="normal"/>
       <xsl:param name="showErr"/>
       <xsl:param name="remarks"/>
       <xsl:param name="getPriority"/>
       <xsl:param name="end_table"/>
       <!-- Added for  17388325 start-->
       <xsl:param name="current_version"/>
       <xsl:param name="total_version"/>
       <!-- Added for  17388325 end-->
       <!--
       <xsl:param name="audit_au"/>
       !-->
       <!-- ctcb 3.0 changes by ranju -->

       <xsl:param name="displaySize"/>
	   <!-- Added for pagination of multiple entry block -->
       <xsl:param name="paginationReq"/>
	   <xsl:param name="langCode"/>
       <xsl:param name="browser"/>
       <xsl:param name="oldTheme"/>
	   <xsl:param name="dateDelimiterReqd"/> <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes-->
	   <xsl:param name="summaryLabels"/> <!-- From Tmp_Labels.xsl and Tmp_Detail.xsl -->
	   	<xsl:param name="largeScreenWidth"/> <!-- 12.1 screen height change start -->
		<xsl:param name="mediumScreenWidth"/>
		<xsl:param name="screenHeight"/>
		<xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
	    <xsl:variable name ="screenWidth">
		<xsl:choose>
          <xsl:when test="$l_scr_type = 'large'">
			<xsl:value-of select="number($largeScreenWidth) - 14"></xsl:value-of>
		  </xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="number($mediumScreenWidth) "></xsl:value-of>
		</xsl:otherwise>
		</xsl:choose>
		</xsl:variable>
		<xsl:variable name ="labelWidth">
	 	<xsl:choose>
        <xsl:when test="$l_scr_type = 'large'">
			<xsl:value-of select="0.40 * (number($screenWidth) div 3 )"></xsl:value-of>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="0.40 * (number($screenWidth) div 2) "></xsl:value-of>
		</xsl:otherwise>
	 	</xsl:choose>
		</xsl:variable><!-- 12.1 screen height change end-->
       <!-- reading the screen and tabpage attributes !-->
       <xsl:variable name="gPosition" select="/FORM/SCREEN[@NAME=$screen]/@POSITION"/>
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
      
      <!-- sundar added...May 11..to differentiate Branch and Neo Uixml -->
       <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> 
       
       <xsl:variable name="gHeight_temp" select="/FORM/SCREEN[@NAME=$screen]/@HEIGHT"/>
       
        <xsl:variable name="buttonRows">
            <xsl:if test="count(/FORM/SCREEN[@NAME=$screen]/SUBSCREEN) &gt; 0">
              <xsl:if test="count(/FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS) &gt; 0 and /FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS > 1">
                <xsl:value-of select="/FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS"/>
              </xsl:if>
              <xsl:if test="count(/FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS) = 0 or /FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS = 1 or normalize-space(/FORM/SCREEN[@NAME=$screen]/CS_BUTTON_ROWS) = ''">
                <xsl:value-of select="1"/>
              </xsl:if>
            </xsl:if>
            <xsl:if test="count(/FORM/SCREEN[@NAME=$screen]/SUBSCREEN) = 0">            
                <xsl:value-of select="0"/>
            </xsl:if>
        </xsl:variable>

       <xsl:variable name="gWidth" select="/FORM/SCREEN[@NAME=$screen]/@WIDTH"/>
       <xsl:variable name="gHdrHeight"
                     select="/FORM/SCREEN[@NAME=$screen]/HEADER/PAGE/@HEIGHT"/>
       <xsl:variable name="gAllTabHgt_temp"
                     select="/FORM/SCREEN[@NAME=$screen]/TABPAGE_ALL/@HEIGHT"/>
        <xsl:variable name="fldCnt">
            <xsl:for-each select="/FORM/BLOCK[@SCREEN = $screen and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS' and ID != 'BLK_CST_BUTTONS']">
                <xsl:if test="(@TYPE = 'Multiple Entry' and @VIEW != 'Single Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)">
                    <xsl:if test="@TABPAGE = 'All'">
                        <xsl:value-of select="1"/>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="(@TYPE != 'Multiple Entry' or @VIEW = 'Single Entry')">
                    <xsl:if test="count(.//FIELD[@TABPAGE = 'All' and TYPE != 'HIDDEN' and HIDDEN != -1]) &gt; 0">
                        <xsl:value-of select="1"/>
                    </xsl:if>
                </xsl:if>
            </xsl:for-each>
        </xsl:variable>
       <xsl:variable name="gAllTabHgt">
            <xsl:if test="$fldCnt = ''">
                <xsl:value-of select="0"/>
            </xsl:if>
            <xsl:if test="$fldCnt != ''">
                <xsl:value-of select="$gAllTabHgt_temp"/>
            </xsl:if>
       </xsl:variable> 
       <xsl:variable name="gHeight">
            <xsl:choose>
                <xsl:when test="number($gHeight_temp) = 550">
                    <xsl:value-of select="$gHeight_temp - ($buttonRows * 35) + ($buttonRows * 2)"/>
                </xsl:when>
                <xsl:otherwise> 
                    <xsl:value-of select="$gHeight_temp"/>            
                </xsl:otherwise>
            </xsl:choose>
       </xsl:variable>
       <!--<xsl:variable name="gContexHgt" select="35"/>-->
       <xsl:variable name="gContexHgt" select="0"/>
       <xsl:variable name="gHdrHgt">
              <xsl:choose>
                     <xsl:when test="$gHdrHeight &gt; 0">
                            <xsl:value-of select="$gHdrHeight"/>
                     </xsl:when>
                     <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                     </xsl:otherwise>
              </xsl:choose>
       </xsl:variable>
       <xsl:variable name="gTabAllHgt">
              <xsl:choose>
                     <xsl:when test="$gAllTabHgt &gt; 0">
                            <xsl:value-of select="$gAllTabHgt"/>
                     </xsl:when>
                     <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                     </xsl:otherwise>
              </xsl:choose>
       </xsl:variable>
       <xsl:variable name="gBlkButCount"
                     select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']/FIELD)"/>
       <xsl:variable name="gBlkButImgCount"
                     select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']/FIELD)"/>
       <xsl:template match="/">
              <xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
       </xsl:template>
       <xsl:template match="SCREEN">
              <!-- Column position case !-->
              <xsl:if test="$gPosition='column'">
                     <!-- 
                     <DIV class="DivContext"
                          style="position:{$gPosition};top:0px;left:0px;width:{$gWidth}px; height:{$gContexHgt}px;">
                     </DIV>
                      -->
                     <xsl:if test="count(TAB/PAGE) &gt; 0">
                            <DIV id="ask" CLASS="DivMAIN"
                                 style="overflow:auto;display:block;width:780px;height:526px;padding-top:20px">
                                   <TABLE class="TableLayout"
                                          style="table-layout:fixed;width:100%;height:100%;"
                                          cellpadding="0" cellspacing="0"
                                          summary="" border="0">
                                              <!--  style="margin-bottom:10px;background-color:#E7F3FF;"> moving inline style to css .. kals -->
                                          
                                          <!-- <TR valign="top" style="background-color:#E7F3FF;"> Kals Changing the bgColor-->
                                              <TR valign="top">
                                                 <TD>
                                                        <DIV id="ask1"
                                                             style="overflow-y:auto;">
                                                               <xsl:apply-templates select="HEADER/PAGE"
                                                                                    mode="column">
                                                               </xsl:apply-templates>
                                                        </DIV>
                                                 </TD>
                                          </TR>
                                          <xsl:if test="count(TAB/PAGE) &gt; 0">
                                                 <TR class="TrTabButtns"
                                                     valign="bottom">
                                                        <TD class="TdTabButtns">
                                                               <xsl:call-template name="DisplayTabs"/>
                                                        </TD>
                                                 </TR>
                                                 <TR valign="top">
                                                        <TD>
                                                               <DIV id="ask1"
                                                                    CLASS="DivTabPageCont"
                                                                    style="overflow-y:auto;">
                                                                      <xsl:apply-templates select="TAB/PAGE"
                                                                                           mode="col_content"/>
                                                               </DIV>
                                                        </TD>
                                                 </TR>
                                                 <TR >
                                                        <TD>
                                                               <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                        </TD>
                                                 </TR>
                                          </xsl:if>
                                   </TABLE>
                            </DIV>
                     </xsl:if>
                     <xsl:call-template name="AllContent_column"/>
                     <xsl:call-template name="Audit"/>
                     <xsl:call-template name="generateScript"/>
              </xsl:if>
        <!-- Added By Murali for Template position-->
            <xsl:if test="$gPosition='template'">
            

                <div id="DIVMainTmp" class="DIVHeaderBodyContainer" style="overflow:auto"> 
					<!--<xsl:attribute name="style">
						<xsl:text>width:</xsl:text>
						<xsl:value-of select="$screenWidth"/>
						<xsl:text>px</xsl:text>
					</xsl:attribute> -->
                    <xsl:variable name="l_ver_reqd" select="/FORM/SCREEN[@NAME=$screen]/@VERSION_BTN_REQD" />
                    <xsl:if test="$l_ver_reqd = 'Y'">
                        <xsl:call-template name="version_button_required_tmp"/>
                    </xsl:if>
                    <xsl:apply-templates select="HEADER/PAGE" mode="template" />
                    <xsl:if test="count(TAB/PAGE[@ID != 'All']) &gt; 0">
                        <xsl:call-template name="DisplayTemplateTabs" />
                        <div id="mainTabContainer" tabindex="-1"><!--style="overflow:auto; float:left; position:relative;"> static header change -->
                        <xsl:apply-templates select="TAB/PAGE[@ID != 'All']" mode="tmp_content"/>
                        </div>
                    </xsl:if>
                    <xsl:apply-templates select="TAB/PAGE[@ID = 'All']" mode="tmp_all_content"/>  
                 
                    <xsl:call-template name="Audit_tmp"/>
                </div>
                
              <!--  <div class="DIVFooter" id="DIVFooter">
                    <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2> 
                    <xsl:call-template name="Audit_tmp"/>
                </div>-->
                <xsl:call-template name="CallButton_tmp"/>
                <xsl:call-template name="generateScript"/> 
            </xsl:if>
        <!-- Added By Murali End -->
        
       </xsl:template>
       <xsl:template name="generateScript">
        <xsl:variable name="contractStatus_Temp" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus_Temp" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus_Temp" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus_Temp" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus_Temp" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>       
          <script type="text/javascript" DEFER="DEFER">
          <!--Reddy prasad added to change the stylesheet dynamically based on screen position-->
          gscrPos = "<xsl:value-of select="$gPosition"/>";      
          var imgpath = "<xsl:value-of select="$imgPath_XSL"/>";      
          var strTheme = "<xsl:value-of select="$oldTheme"/>";
         <!--Reddy prasad -->
            <xsl:if test="$gPosition='template'">
                 <xsl:for-each select="/FORM/SCREEN[@NAME=$screen]">
                    <xsl:variable name="l_tmp_scr_type" select="@TMP_SCR_TYPE" />
                     l_tmp_scr_type = '<xsl:value-of select="$l_tmp_scr_type"/>';
                </xsl:for-each>            
            </xsl:if>            
          </script>
          <noscript>
            <xsl:value-of select="$noScript"/>
          </noscript>
       </xsl:template>
	   <!-- Start of Tmp_Detail.xsl -->
    <!--<xsl:import href="GlobalTemplateInput.xsl"/>-->
    <!--<xsl:import href="Tmp_GlobalInput.xsl"/>-->
    <!--<xsl:import href="GlobalMultiple_Template.xsl"/>-->
    <!--<xsl:import href="Tmp_Labels.xsl"/> Already imported as part of GlobalTemplateInput.xsl-->
    <!--<xsl:param name="summaryLabels"/> Added to Detail.xsl -->
  <xsl:template match="HEADER/PAGE" mode="template">
        <xsl:variable name="tabId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)" />
        <xsl:variable name="partCount" select="count(SECTION/PARTITION)" />
        
       <!-- <div class="DIVHeader" ID="TBLPage{@ID}" name="DivHeader"> Sudipta -->
        <div ID="TBLPage{@ID}" name="DivHeader" >
        <xsl:variable name="pagId" select="@ID"/>
        <xsl:for-each select="SECTION">
            <!-- <div class="DivSection"> -->
          <!--  <div class="DIVThreeColSectionContainer">-->
            <div class="oj-flex oj-sm-margin-1x-horizontal oj-sm-padding-4x-start">
            
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
            <!--    <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>-->
                
                <xsl:variable name="secId" select="@ID"/>
                
                <xsl:for-each select="//SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION" >
                    <xsl:variable name="cnt">
                        <xsl:number value="position()" format="1"  />
                    </xsl:variable>
                    <xsl:variable name="partId" select="@ID" />
                    <xsl:variable name="partWidth" select="@WIDTH" />
                    
                    <div>
                    <xsl:choose>
                        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
                            <xsl:attribute name="class">
                                <!-- <xsl:value-of select="'DivPart1'" /> -->
                                <xsl:value-of select="'oj-sm-width-full sectionPanel'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'oj-sm-width-full sectionPanel'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '66'"> 
                            <xsl:attribute name="class">
                                <!-- <xsl:value-of select="'DivPart2'" /> -->
                                <xsl:value-of select="'oj-sm-width-2/3 sectionPanel'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">
                                <!-- <xsl:value-of select="'DivPart3'" /> -->
                                <!--<xsl:value-of select="'DIVColumnOne'" />Sudipta-->
                                <xsl:value-of select="'oj-sm-width-1/3 sectionPanel'" />
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
					<!--<xsl:attribute name="style">
						<xsl:text>width:</xsl:text>
						<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"></xsl:value-of>
						<xsl:text>px</xsl:text>
					</xsl:attribute>-->
                  
                    <div class="partitionPanel oj-sm-padding-5x-horizontal partitionRightMargin">
                    <xsl:choose>
                  
                        <xsl:when test="FSREQ = 'Y' ">
                           <!-- <fieldset class="FIELDSETNormal"><legend><xsl:value-of select="LABEL"/></legend>-->
                            <fieldset>
                            <div class="oj-flex-item">
                                <h4 class="">
                                    <xsl:value-of select="LABEL"/>
                                </h4>
                            <xsl:call-template name="SectionHandler_Header">
                                <xsl:with-param name="secId" select="$secId" />
                                <xsl:with-param name="partId" select="$partId" />
                                <xsl:with-param name="tabId" select="$tabId" />
                                <xsl:with-param name="pagId" select="$pagId" />
                                <xsl:with-param name="partWidth" select="$partWidth" />
                            </xsl:call-template>
                            </div>
                            </fieldset>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:call-template name="SectionHandler_Header">
                                <xsl:with-param name="secId" select="$secId" />
                                <xsl:with-param name="partId" select="$partId" />
                                <xsl:with-param name="tabId" select="$tabId" />
                                <xsl:with-param name="pagId" select="$pagId" />
                                <xsl:with-param name="partWidth" select="$partWidth" />
                            </xsl:call-template>
                        </xsl:otherwise>
                      <!--  </div> -->
                        
                    </xsl:choose>
                   </div>
                     </div> 
                    
                </xsl:for-each>
            </div>
        </xsl:for-each>
        </div>
  </xsl:template>
  


  
  <xsl:template name="TemplatePageHandler">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="subpartCount" select="." />    
    <xsl:param name="subPartNode" select="." />
    <xsl:param name="loc" select="." />
        <xsl:if test="$subpartCount > 0 ">

            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry') and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$tabId and @SECTION = $secId and @PARTITION = $partId and NAME != 'VERNO' and NAME != 'LATEST_VERNO']/TYPE" mode="template">
                <xsl:with-param name="subPartNode" select="$subPartNode"/>
                <xsl:with-param name="subpartCount" select="$subpartCount"/>
                <xsl:sort select="../@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>

        </xsl:if>
        
        <xsl:if test="$subpartCount = 0 ">
            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry') and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$tabId and @SECTION = $secId and @PARTITION = $partId and NAME != 'VERNO' and NAME != 'LATEST_VERNO']/TYPE" mode="template">
                <xsl:with-param name="subpartCount" select="0"/>
                <xsl:sort select="../@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </xsl:if>
        <xsl:for-each select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW != 'Single Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and @SCREEN=$screen and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']"> 
        
            <xsl:call-template name="MultipleHandler_template">
                <xsl:with-param name="secId" select="$secId" />
                <xsl:with-param name="partId" select="$partId" />
                <xsl:with-param name="tabId" select="$tabId" />
                <xsl:with-param name="loc" select="$loc" />
            </xsl:call-template>
        </xsl:for-each>
  </xsl:template>


<xsl:template match="PAGE" mode="tmp_content">
    <xsl:variable name="tabId" select="@ID"/>
    <xsl:variable name="tabSecCount" select="count(SECTION)" />
    <xsl:variable name="tabpartCount" select="count(SECTION/PARTITION)" />

   <!-- <div class="DIVTabPageContent" id="tabcontentcontainer">-->
    <div class="oj-sm-width-full" id="tabcontentcontainer" >
        <xsl:variable name="sc" >
            <xsl:number value="position()" format="1"  />
        </xsl:variable>
        <div class="oj-sm-width-full" id="TBLPage{@ID}" style="display:none;">
            <xsl:variable name="pagId" select="@ID" />
            <xsl:for-each select="SECTION">

                <!-- <div class="DivSection"> -->
                <!--<div class="DIVThreeColSectionContainer">-->
                <div class="oj-flex oj-sm-margin-1x-horizontal oj-sm-padding-4x-start">
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
               <!-- <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>-->
                <xsl:variable name="secId" select="@ID"/>
                
                <xsl:variable name="meBlkSeView" select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]/FIELD[@TABPAGE = $tabId])"/>
                <xsl:if test="$meBlkSeView &gt; 0">             
                  <!--  <DIV>-->
                        <xsl:variable name="blk" select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]"/>
                        <xsl:attribute name="ID"><xsl:value-of select="$blk/ID"/></xsl:attribute>
                        <xsl:attribute name="VIEW"><xsl:value-of select="$blk/@VIEW"/></xsl:attribute>
                        <xsl:call-template name="PartitionHandler">
                            <xsl:with-param name="secId" select="$secId" />
                            <xsl:with-param name="tabId" select="$tabId" />
                            <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                            <xsl:with-param name="pagId" select="$pagId" />
                            
                        </xsl:call-template>
                  <!--  </DIV>-->
                </xsl:if> 
                <xsl:if test="$meBlkSeView = 0">
                    <xsl:call-template name="PartitionHandler">
                        <xsl:with-param name="secId" select="$secId" />
                        <xsl:with-param name="tabId" select="$tabId" />
                        <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                        <xsl:with-param name="pagId" select="$pagId" />
                    </xsl:call-template>
                </xsl:if>
                </div>
            </xsl:for-each>
    </div>
    </div>

</xsl:template>
  <xsl:template match="TAB/PAGE" mode="tmp_all_content">
      <xsl:variable name="tabId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)" />
        <xsl:variable name="partCount" select="count(SECTION/PARTITION)" />
 <div id="mainTabContainer" tabindex="-1">
        <!--<div class="DIVHeader" ID="TBLPage{@ID}" name="DivHeader">-->
        <div ID="TBLPage{@ID}" name="DivHeader" >
        <xsl:variable name="pagId" select="@ID"/>

        <xsl:for-each select="SECTION">
            <!-- <div class="DivSection"> -->
            <!--<div class="DIVThreeColSectionContainer"> -->
            <div class="oj-flex oj-sm-margin-1x-horizontal oj-sm-padding-4x-start"> 
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
              <!--  <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>-->
            
            <xsl:variable name="secId" select="@ID"/>

                <xsl:call-template name="PartitionHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                    <xsl:with-param name="pagId" select="$pagId" />
                </xsl:call-template>
            <!--</xsl:if> -->

            </div>
        </xsl:for-each>
        </div>
        </div>
  </xsl:template>

<xsl:template name="PartitionHandler">
    <xsl:param name="secId" select="." />
    <xsl:param name="l_scr_type" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="pagId" select="." />
    
    <xsl:for-each select="//SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION" >    
        <xsl:variable name="partId" select="@ID"/>
        <xsl:variable name="meBlkSeView" select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId]/FIELD[@TABPAGE = $tabId])"/>
        <xsl:if test="$meBlkSeView &gt; 0">             
           <!-- <DIV>-->
                <xsl:variable name="blk" select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId]"/>
              <!--  <xsl:attribute name="ID"><xsl:value-of select="$blk/ID"/></xsl:attribute>
                <xsl:attribute name="VIEW"><xsl:value-of select="$blk/@VIEW"/></xsl:attribute>-->
                <xsl:call-template name="PartitionBodyHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                    <xsl:with-param name="pagId" select="$pagId" />
                    <xsl:with-param name="partId" select="$partId" />
                </xsl:call-template>
           <!-- </DIV>-->
        </xsl:if>     
    
        <xsl:if test="$meBlkSeView = 0">
            <xsl:call-template name="PartitionBodyHandler">
                <xsl:with-param name="secId" select="$secId" />
                <xsl:with-param name="tabId" select="$tabId" />
                <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                <xsl:with-param name="pagId" select="$pagId" />
                <xsl:with-param name="partId" select="$partId" />
            </xsl:call-template>
        </xsl:if>
    </xsl:for-each>
</xsl:template>


<xsl:template name="PartitionBodyHandler">
    <xsl:param name="secId" select="." />
    <xsl:param name="l_scr_type" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="pagId" select="." />
    <xsl:param name="partId" select="." />

        <xsl:variable name="cnt">
            <xsl:number value="position()" format="1"  />
        </xsl:variable>
        <!--<xsl:variable name="partId" select="@ID" />-->
        <xsl:variable name="partWidth" select="@WIDTH" />
		<div>
		
        <xsl:choose>
            <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
                <xsl:attribute name="class">
                    <!-- <xsl:value-of select="'DivPart1'" /> -->
                   <!-- <xsl:value-of select="'DIVThreeColSectionContainer'" />-->
                   <xsl:value-of select="'oj-sm-width-full sectionPanel'" />
                </xsl:attribute>
                 <xsl:if test="contains($browser,'opera')">
			<xsl:attribute name="style">
                    <xsl:value-of select="'height:300px'" />
             </xsl:attribute>			
		</xsl:if>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                <xsl:attribute name="class">
                    <xsl:value-of select="'oj-sm-width-full sectionPanel'" />
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '66'"> 
                <xsl:attribute name="class">
                    <!-- <xsl:value-of select="'DivPart2'" /> -->
                    <xsl:value-of select="'oj-sm-width-2/3 sectionPanel'" />
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <!-- <xsl:value-of select="'DivPart3'" /> -->
                    <xsl:value-of select="'oj-sm-width-1/3 sectionPanel'" />
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
		<!--<xsl:attribute name="style">
			<xsl:text>width:</xsl:text>
			<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"></xsl:value-of>
			<xsl:text>px</xsl:text>
		</xsl:attribute>--><!-- 12.1 screen height change end-->
        <xsl:call-template name="multipleEntrySingleViewBtns">
            <xsl:with-param name="secId" select="$secId" />
            <xsl:with-param name="partId" select="$partId" />
            <xsl:with-param name="tabId" select="$tabId" />
            <xsl:with-param name="pagId" select="$pagId" />
            <xsl:with-param name="partWidth" select="$partWidth" />
        </xsl:call-template>
        <div class="partitionPanel oj-sm-padding-5x-horizontal partitionRightMargin">
        <xsl:choose>
            <xsl:when test="FSREQ = 'Y' ">
               <!-- <fieldset class="FIELDSETNormal"><legend><xsl:value-of select="LABEL"/></legend>-->
               <fieldset>
                    <div class="oj-flex-item">
                        <h4 class="">
                            <xsl:value-of select="LABEL"/>
                        </h4>
                <xsl:call-template name="SectionHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="partId" select="$partId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="pagId" select="$pagId" />
                    <xsl:with-param name="partWidth" select="$partWidth" />
                </xsl:call-template>
                </div>
                </fieldset>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="SectionHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="partId" select="$partId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="pagId" select="$pagId" />
                    <xsl:with-param name="partWidth" select="$partWidth" />
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
        </div>
         </div> 
</xsl:template>


<xsl:template name="SectionHandler">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="pagId" select="." />
    <xsl:param name="partWidth" select="." />
            <xsl:variable name="subpartCount" select="count(//SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS)"/>
            <xsl:if test="$subpartCount > 0">
                <xsl:call-template name="TemplatePageHandler">
                        <xsl:with-param name="secId" select="$secId" />
                        <xsl:with-param name="partId" select="$partId" />
                        <xsl:with-param name="tabId" select="$tabId" />
                        <xsl:with-param name="subpartCount" select="$subpartCount" />
                        <xsl:with-param name="subPartNode" select="//SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS" />
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$subpartCount = 0">
                <xsl:call-template name="TemplatePageHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="partId" select="$partId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="subpartCount" select="$subpartCount" />
                </xsl:call-template>
            </xsl:if>
    
</xsl:template>


<xsl:template name="SectionHandler_Header">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="pagId" select="." />
    <xsl:param name="partWidth" select="." />
    <xsl:variable name="loc" select="'header'" />
    <!-- pat3 -> 100 , par2 -> 66, part1 -> 33 !-->
    
            <xsl:variable name="subpartCount" select="count(//SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS)"/>
            
            <xsl:if test="$subpartCount > 0">
                <xsl:call-template name="TemplatePageHandler">
                        <xsl:with-param name="secId" select="$secId" />
                        <xsl:with-param name="partId" select="$partId" />
                        <xsl:with-param name="tabId" select="$tabId" />
                        <xsl:with-param name="subpartCount" select="$subpartCount" />
                        <xsl:with-param name="subPartNode" select="//SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $pagId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS" />
                        <xsl:with-param name="loc" select="$loc" />
                </xsl:call-template>
            </xsl:if>
            
            <xsl:if test="$subpartCount = 0">
                <xsl:call-template name="TemplatePageHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="partId" select="$partId" />
                    <xsl:with-param name="subpartCount" select="$subpartCount" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="loc" select="$loc" />
                </xsl:call-template>
            </xsl:if>


</xsl:template>


<xsl:template name="version_button_required_tmp">
    <xsl:variable name="l_fccver" select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='VERNO']/DBT" />
    <xsl:variable name="l_fccver_dbc" select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='VERNO']/DBC" />
    <xsl:variable name="l_latestverno" select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='LATEST_VERNO']/DBT" />
    <xsl:variable name="l_latestverno_dbc" select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='LATEST_VERNO']/DBC" />

    <!--<div class="DIVPagingContainerMESV" id="DIVVerisonBtns">-->
     <div class=" oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end" id="DIVVerisonBtns">
   
        <xsl:choose>
            <xsl:when test="$langCode = 'ARB'">
                <button class="BUTTONInline" onclick="fnOnClick_BTN_LAST_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_LAST_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$last_SummaryAudit}"><span class="IMGInline BTNLastGIF" title="{$last_SummaryAudit}"></span></button>
                
                <button class="BUTTONInline" onclick="fnOnClick_BTN_NEXT_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$next_SummaryAudit}">
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNNext.gif" alt="{$next_SummaryAudit}"/>-->
                <SPAN class="IMGInline ImgNext" title="{$next_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
                </button><!--<img height="1" width="10" src="{$imgPath_XSL}/spacer.gif" alt=""/>-->
                <span style="height:1px;width:10px;" class="ImgSpacer"></span><!--Data Uri Changes -->
                <label class="LABELNormal LBLinv" for="{$l_fccver}__{$l_fccver_dbc}">VERNO</label><!--Fix for 17155663-->
                <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{$l_fccver}__{$l_fccver_dbc}" DBT="{$l_fccver}" DBC="{$l_fccver_dbc}" NAME="VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                    <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='VERNO']/READ_ONLY) = -1">
                        <xsl:attribute name="READONLY">true</xsl:attribute>
                        <xsl:attribute name="READONLY1">true</xsl:attribute>
                    </xsl:if>
                    <!-- Added for  17388325-->
                        <xsl:attribute name="TITLE">
                           <xsl:value-of select = "$total_version"/>
                        </xsl:attribute>
                </input>
                <span class="SPANText">
                    <xsl:value-of select = "$vernoOfLbl"/>
                </span>
                <label class="LABELNormal LBLinv" for="{$l_latestverno}__{$l_latestverno_dbc}">LATEST_VERNO</label><!--Fix for 17155663-->
                <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{$l_latestverno}__{$l_latestverno_dbc}" DBT="{$l_latestverno}" DBC="{$l_latestverno_dbc}" NAME="LATEST_VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                    <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='LATEST_VERNO']/READ_ONLY) = -1">
                        <xsl:attribute name="READONLY">true</xsl:attribute>
                        <xsl:attribute name="READONLY1">true</xsl:attribute>
                    </xsl:if>
                    <!-- Added for  17388325 -->
                    <xsl:attribute name="TITLE">
                           <xsl:value-of select = "$current_version"/>
                        </xsl:attribute>
                </input>
                <button class="BUTTONInline" onclick="fnOnClick_BTN_PREV_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_PREV_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$previous_SummaryAudit}">
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNPrevious.gif" alt="{$previous_SummaryAudit}"/>-->
                <SPAN class="IMGInline ImgPrev" title="{$previous_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
                </button>
                <button class="BUTTONInline" onclick="fnOnClick_BTN_FIRST_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_FIRST_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$first_SummaryAudit}"><span class="IMGInline BTNFirstGIF" title="{$first_SummaryAudit}"></span></button>               
            </xsl:when>
            <xsl:otherwise>
                <oj-button  slot="end"  display="icons" chroming="borderless" onclick="fnOnClick_BTN_FIRST_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_FIRST_VER"  title="{$first_SummaryAudit}"><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon" title="{$first_SummaryAudit}"></span></oj-button>
                <oj-button slot="end"  display="icons" chroming="borderless" onclick="fnOnClick_BTN_PREV_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_PREV_VER"  title="{$previous_SummaryAudit}">
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNPrevious.gif" alt="{$previous_SummaryAudit}"/>-->
                <SPAN slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon" title="{$previous_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
                </oj-button>
                <oj-label style="display:none;" for="{$l_fccver}__{$l_fccver_dbc}">&#160;VERNO&#160;</oj-label><!--Fix for 17155663-->
                <oj-input-text type="text" class="oj-flex oj-sm-align-items-center" LABEL_VALUE="" ID="{$l_fccver}__{$l_fccver_dbc}" DBT="{$l_fccver}" DBC="{$l_fccver_dbc}" NAME="VERNO" DTYPE="VARCHAR2"  size="1">
                    <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='VERNO']/READ_ONLY) = -1">
                        <xsl:attribute name="READONLY">true</xsl:attribute>
                        <xsl:attribute name="READONLY1">true</xsl:attribute>
                    </xsl:if>
                    <!-- Added for  17388325 -->
                    <xsl:attribute name="TITLE">
                           <xsl:value-of select = "$current_version"/>
                        </xsl:attribute>
                </oj-input-text>
              <div class="oj-flex oj-sm-align-items-center">
                   &#160;<xsl:value-of select = "$vernoOfLbl"/>&#160;
               </div>
                <oj-label  style="display:none;" for="{$l_latestverno}__{$l_latestverno_dbc}">&#160;LATEST_VERNO&#160;</oj-label><!--Fix for 17155663-->
                <oj-input-text type="text" class="oj-flex oj-sm-align-items-center" LABEL_VALUE="" ID="{$l_latestverno}__{$l_latestverno_dbc}" DBT="{$l_latestverno}" DBC="{$l_latestverno_dbc}" NAME="LATEST_VERNO" DTYPE="VARCHAR2"  size="1">
                    <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='LATEST_VERNO']/READ_ONLY) = -1">
                        <xsl:attribute name="READONLY">true</xsl:attribute>
                        <xsl:attribute name="READONLY1">true</xsl:attribute>
                    </xsl:if>
                    <!-- Added for  17388325 -->
                    <xsl:attribute name="TITLE">
                           <xsl:value-of select = "$total_version"/>
                        </xsl:attribute>
                </oj-input-text>
                <oj-button  slot="end"  display="icons" chroming="borderless" onclick="fnOnClick_BTN_NEXT_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER"  title="{$next_SummaryAudit}">
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNNext.gif" alt="{$next_SummaryAudit}"/>-->
                <SPAN slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon" title="{$next_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
                </oj-button><!--<img height="1" width="10" src="{$imgPath_XSL}/spacer.gif" alt=""/>-->
               <!-- <span style="height:1px;width:10px" class="ImgSpacer"></span>--><!--Data Uri Changes -->
                <oj-button  slot="end"  display="icons" chroming="borderless"  onclick="fnOnClick_BTN_LAST_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_LAST_VER"  title="{$last_SummaryAudit}">
                <span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon" title="{$last_SummaryAudit}"></span></oj-button>
            </xsl:otherwise>
        </xsl:choose>
	<oj-label style="display:none;" for="Goto_version">Goto_version</oj-label><!--Fix for 17155663-->
        <oj-input-text id="Goto_version" type="text" size="1" class="oj-flex oj-sm-align-items-center oj-inputtext" name = "Goto_version"/>
        <oj-button slot="end" class="" onclick="fnOnClick_goToPage()" LABEL_VALUE="GOTO" ID="" DBT="" DBC="" DTYPE="" name ="BTN_GO_VER"  title="{$gotoPage_SummaryAudit}" value="{$gotoPage_SummaryAudit}" alt="{$gotoPage_SummaryAudit}">
        <xsl:value-of select="$gotoPage_SummaryAudit"/></oj-button><!--HTML5 Changes -->
        <!--<img height="1" width="25" src="{$imgPath_XSL}/spacer.gif" alt=""/>--><!--fix for 17235409 -->
        <span style="height:1px;width:25px" class="ImgSpacer"></span><!--Data Uri Changes -->
    </div>
</xsl:template>


<xsl:template name="multipleEntrySingleViewBtns" >
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="pagId" select="." />
    <xsl:param name="partWidth" select="." />

    <xsl:variable name="l_sec1" select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry')) and @SCREEN=$screen and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/@SECTION"/>
    <xsl:variable name="l_par1" select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry')) and @SCREEN=$screen and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/@PARTITION"/>
    
    <xsl:if test="$l_sec1 = $secId and $l_par1 = $partId" >
        <xsl:variable name="blkId" select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry')) and @SCREEN=$screen and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId]/ID" />
        <xsl:variable name="blockId">
            <xsl:if test="contains($blkId,'_TMP')">
                <xsl:value-of select="substring-before($blkId,'_TMP')"/>
            </xsl:if>
            <xsl:if test="not(contains($blkId,'_TMP'))">
                <xsl:value-of select="$blkId"/>
            </xsl:if>
        </xsl:variable>
       <!-- <div class="DIVPagingContainerMESV" id="MESV_{$blockId}">-->
       <div class=" oj-flex oj-sm-flex-items-initial oj-sm-justify-content-flex-end" id="MESV_{$blockId}">
			<!--<xsl:attribute name="style">--><!-- 12.1 screen height change start-->
				<!-- <xsl:text>width:</xsl:text>
			<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"></xsl:value-of>
			<xsl:text>px</xsl:text>
		</xsl:attribute>--><!-- 12.1 screen height change end-->
            <oj-button slot="end" display="icons" chroming="borderless" title="{$previous_SummaryAudit}" name="BTN_PREV_{$blockId}" onClick="fnMovePrev_{$blockId}()" disabled="disabled">
            
            <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNPrevious.gif" alt="{$previous_SummaryAudit}"/>-->
            <SPAN class="oj-ux-ico-triangle-left-s" title="{$previous_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
             </oj-button>
            <oj-button slot="end"  display="icons" chroming="borderless" title="{$next_SummaryAudit}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNext_{$blockId}()" disabled="disabled">
           
            <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNNext.gif" alt="{$next_SummaryAudit}"/>-->
            <SPAN class="oj-ux-ico-triangle-right-s" title="{$next_SummaryAudit}"></SPAN><!-- Data Uri Changes -->
            </oj-button>
            <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg"  title="{$add_row}" name="BTN_ADD_{$blockId}" onClick="fnAddRow_{$blockId}()" disabled="true">
            <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNAddrow.gif" alt="{$add_row}"/>-->
            <SPAN class="oj-ux-ico-plus" title="{$add_row}"></SPAN><!-- Data Uri Changes -->
            </oj-button>
            <oj-button slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg"  title="{$delete_row}" name="BTN_REMOVE_{$blockId}" onClick="fnDelRow_{$blockId}()" disabled="true">
            <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNRemoveRow.gif" alt="{$delete_row}"/>-->
            <SPAN class="oj-ux-ico-minus" title="{$delete_row}"></SPAN><!-- Data Uri Changes -->
           </oj-button>
        </div>
    </xsl:if>
    
    

</xsl:template>	   
	   <!-- End of Tmp_Detail.xsl -->
	   <!-- Start of GlobalTemplateInput.xsl -->
<!--<xsl:import href="Tmp_Labels.xsl"/>-->
<!--<xsl:param name="summaryLabels"/> Added to Detail.xsl -->
<xsl:template name="dispEntityField_tmp" >
    <xsl:param name="EntityType" />
    <xsl:choose>
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DESCRIPTION'">
            <xsl:call-template name="dispDescriptionField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField_tmp" >
            <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="dispTextField_tmp" />
        </xsl:otherwise>
    </xsl:choose>

</xsl:template>

<xsl:template name="dispAmountField_tmp">
    <xsl:variable name="relFld" select="../RELATED_FIELD"/>
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
    
    
   <!-- <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>-->
    
    <!--<INPUT TYPE="TEXT" class="TextNormal numeric" title="{../LABEL}" onblur="validateInputAmount('{../NAME}', '{$relatedFld}')" >-->
   <!-- <label class="LBLinv">-->
    <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">  
    <oj-label slot="label">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            <!--<xsl:text>I</xsl:text>-->
        </xsl:attribute>
		<!--Fix for 17155663 start-->
		<xsl:choose>
		<xsl:when test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <!--<xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">-->
            <xsl:if test="../LABEL != ''">
                <xsl:attribute name="class">
                <xsl:text>oj-flex-item</xsl:text>
                    <!--<xsl:text>LABELNormal</xsl:text>-->
                </xsl:attribute>   
				<!--<xsl:attribute name="style">
					<xsl:text>width:</xsl:text>
					<xsl:value-of select="$labelWidth"/>
					<xsl:text>px;</xsl:text>
				</xsl:attribute>--><!-- 12.1 screen height change end-->
                <xsl:value-of select="../LABEL"/>
            </xsl:if>
           <!-- <xsl:if test="../LABEL = ''">
                <xsl:attribute name="class">
		  <xsl:choose>
                    <xsl:when test="../../HREQ = '-1'">
                        <xsl:value-of select="'LABELNormal LABELNormalHF'" />
                        </xsl:when>
                    <xsl:otherwise>
                       <xsl:value-of select="'LABELNormal LBLinv2'" />
                    </xsl:otherwise>
                  </xsl:choose>
                    <xsl:if  test="../../HREQ != '-1'">
                         <xsl:attribute name="style">
						 <xsl:text>width:</xsl:text>
						<xsl:value-of select="$labelWidth"/>
						<xsl:text>px;</xsl:text>
						 </xsl:attribute>
                        </xsl:if>
                </xsl:attribute>
                <xsl:value-of select="../../LABEL"/>
            </xsl:if>-->
        <!--</xsl:if>-->
		</xsl:when>
		<xsl:otherwise>
            <xsl:value-of select="../LABEL"/>
        </xsl:otherwise>
		</xsl:choose>
		<!--Fix for 17155663 end-->
    </oj-label>
        </xsl:if>
   <!-- <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <xsl:call-template name="dispSpanFlag_tmp" />
    </xsl:if>-->
    <oj-input-text slot="value"   related_field="{../RELATED_FIELD}" >
       <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
                <xsl:attribute name="class">oj-form-control-text-align-right</xsl:attribute>
            </xsl:if>
             <xsl:if test="(../../@TYPE = 'Multiple Entry' or ../../@VIEW != 'Single Entry')">
                <xsl:attribute name="class">oj-helper-text-align-end</xsl:attribute>
            </xsl:if>
    <!--<INPUT TYPE="TEXT" class="TextNormal numeric" title="{../LABEL}">-->
    <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    
    <!--<xsl:attribute name="style">
        <xsl:text>{text-align:</xsl:text>
        <xsl:text>right;}</xsl:text>
    </xsl:attribute>-->
    
    <!--<xsl:attribute name="MAXLENGTH1">-->
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
    
    <!--<xsl:attribute name = "onblur">
        <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
    </xsl:attribute>-->
   <!-- <xsl:attribute name = "onblur">
        <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
        <xsl:value-of select="../NAME"/>
        <xsl:text disable-output-escaping="yes">', '</xsl:text>
        <xsl:value-of select="$relatedFld"/>
        <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this);</xsl:text>--> <!-- Fix for 19813552 - added semicolon -->
        <!-- Fix for 19813552 - starts -->
        <!--<xsl:if test="count(../EVENT) &gt; 0 and normalize-space(../EVENT/NAME) = 'onblur'">
            <xsl:call-template name="addOnblurEvent">
                <xsl:with-param name="curr_node" select=".."/>
            </xsl:call-template>
        </xsl:if>-->
        <!-- Fix for 19813552 - ends -->
   <!-- </xsl:attribute> -->

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
        <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../DBC"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
    </xsl:if>
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                <xsl:attribute name="readonly">true</xsl:attribute>
            </xsl:if>
			<!--REDWOOD_35850089 - amount not validate if ccy not available start-->
		<xsl:attribute name="onfocusout">		
                    <xsl:text disable-output-escaping="yes">checkCurrencyValue('</xsl:text>
                    <xsl:value-of select="concat(../DBT,'__',../DBC)"/>		
                    <xsl:text disable-output-escaping="yes">', '</xsl:text>
                    <xsl:value-of select="$relFld"/>
                    <xsl:text disable-output-escaping="yes">', event);</xsl:text>					
                </xsl:attribute>
		<!--REDWOOD_35850089 - amount not validate if ccy not available end-->
        
             <xsl:attribute name="converter">
				<xsl:text>{{amountConverter</xsl:text>
                                <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                                <xsl:value-of select="../../DBT"/>
                                </xsl:if>
                                <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
                                <xsl:value-of select="../DBT"/>
                                </xsl:if>
                                <xsl:text>__</xsl:text>
                                <xsl:value-of select="../DBC"/>
                                <xsl:text>}}</xsl:text>
                               <!--<xsl:text>{{amtConverter}}</xsl:text>-->
                </xsl:attribute>
                 
    </oj-input-text>
        <xsl:call-template name="generateAmountScript" >
             <xsl:with-param name="amountNode" select=".."></xsl:with-param>
        </xsl:call-template>

    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
</xsl:template>
<xsl:template name="generateAmountScript">
    <xsl:param name="amountNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">

          <xsl:if test="($amountNode/../@TYPE = 'Multiple Entry' and $amountNode/../@VIEW != 'Single Entry') or ($amountNode/../@TYPE = 'Multiple Entry' and count($amountNode/../@VIEW) = 0)">
             <xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/DBC"/>=getDefaultAmountConverter('<xsl:value-of select="$amountNode/../DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/DBC"/>',  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true,true);
         </xsl:if>
         <xsl:if test="($amountNode/../@TYPE != 'Multiple Entry' or $amountNode/../@VIEW = 'Single Entry')">
         <xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/DBC"/>=getDefaultAmountConverter('<xsl:value-of select="$amountNode/DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/DBC"/>',  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true,false);
         </xsl:if>
<!--<xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>= getFormattedAmount(this,  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true);-->    

</script>
</xsl:template>
<xsl:template name="ATTR_HiddenEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/VALUE) &gt; 0 and $curr_fld/VALUE != ''">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:attribute name="HIDDEN_TYPE">
           <xsl:text>Y</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <!-- 11.0 Help File Fix Starts -->
    <xsl:attribute name="HELPBID">
        <xsl:value-of select="$curr_fld/../../ID" />
    </xsl:attribute>
    <!-- 11.0 Help File Fix Ends -->
    <xsl:attribute name="DBT">
        <xsl:value-of select="$curr_fld/DBT" />
    </xsl:attribute>
    <xsl:attribute name="DBC">
        <xsl:value-of select="$curr_fld/DBC" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/@CONTROL) > 0 and $curr_fld/@CONTROL = 'Y'">
        <xsl:attribute name="CONTROL_DBT">
           <xsl:text>UIBLOCK</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:if test="($curr_fld/../@TYPE = 'Multiple Entry' and $curr_fld/../@VIEW != 'Single Entry') and   $curr_fld/TYPE!='SELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../DBT,'__',$curr_fld/DBC)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
     <xsl:if test="($curr_fld/../@TYPE != 'Multiple Entry' or $curr_fld/../@VIEW = 'Single Entry' or $curr_fld/TYPE ='SELECT')">
  
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
    </xsl:attribute>
    </xsl:if>
     <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED ='-1'">
    <xsl:attribute name="REQUIRED">
       <!-- <xsl:value-of select="$curr_fld/REQUIRED" />-->
        <xsl:text>true</xsl:text>
    </xsl:attribute>
     </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED ='-1'">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LABEL" />
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
    <xsl:if test="count($curr_fld/READ_ONLY) > 0 and $curr_fld/READ_ONLY = -1 and ($curr_fld/../@TYPE != 'Multiple Entry')">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>        
    </xsl:if>
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template"/>
    <xsl:if  test="($curr_fld/../../@TYPE = 'Multiple Entry') and ($curr_fld/../../@VIEW = 'Single Entry')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../../ID"/></xsl:attribute>
    </xsl:if>  
</xsl:template>


<xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="($curr_fld/../@TYPE = 'Multiple Entry' and $curr_fld/../@VIEW != 'Single Entry') and   $curr_fld/TYPE!='SELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../DBT,'__',$curr_fld/NAME)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
        </xsl:attribute>
    </xsl:if>
   <xsl:if test="($curr_fld/../@TYPE != 'Multiple Entry' or $curr_fld/../@VIEW = 'Single Entry' or $curr_fld/TYPE ='SELECT')">
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
      <!--  <xsl:text>I</xsl:text>-->
    </xsl:attribute>
    </xsl:if>
    <!-- 11.0 Help File Fix Starts -->
    <xsl:attribute name="HELPBID">
        <xsl:value-of select="$curr_fld/../../ID" />
    </xsl:attribute>
    <!-- 11.0 Help File Fix Ends -->
    <xsl:if test="count($curr_fld/VALUE) &gt; 0 and $curr_fld/TYPE != 'CHECKBOX'">        
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
       <!-- <xsl:text>I</xsl:text>-->
    </xsl:attribute>
    <xsl:if test="number($curr_fld/SIZE) &lt; 23">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Size fix starts -->
    <xsl:if test="number($curr_fld/SIZE) &gt; 23">
        <xsl:attribute name="SIZE">
            <xsl:if test="count(curr_fld/LOV) &gt;0 or $curr_fld/TYPE = 'DATE'">
                <xsl:value-of select="number($curr_fld/SIZE) - 4" />
            </xsl:if>
            <xsl:if test="count(curr_fld/LOV) = 0 and $curr_fld/TYPE != 'DATE'">
                <xsl:value-of select="$curr_fld/SIZE"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <!-- Size fix ends -->
    <!--Fix for 17639247 -->
    <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT' and normalize-space($curr_fld/DTYPE) != 'NUMBER' ">
        <xsl:attribute name="length.max">
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
    </xsl:if>
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>                
        <xsl:attribute name="class">TextReadonly</xsl:attribute>
        <!--<xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() = 'DATE']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: left;</xsl:text>
            </xsl:attribute>
        </xsl:if>-->
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']" >
            <xsl:attribute name="class">
                <xsl:text>TextReadonly numeric</xsl:text>
            </xsl:attribute>
        </xsl:if>
        <!--<xsl:if test="$curr_fld/TYPE[text() = 'MASK']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: left;</xsl:text>
            </xsl:attribute>
        </xsl:if>-->
    </xsl:if>
    <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TextDisabled</xsl:attribute>
    </xsl:if>
   
     <xsl:if test="(../TYPE = 'SELECT' or ../TYPE = 'ROSELECT' or ../TYPE= 'TEXT' or ../TYPE= 'TEXTAREA')  and ($eventname = 'onblur' or $eventname = 'onBlur')">
                <xsl:attribute name="onfocusout">
                <xsl:value-of select="./FUNCTION"/>
            </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
<!--
    <xsl:attribute name="TABINDEX">
        <xsl:value-of select="$curr_fld/TABINDEX" />
    </xsl:attribute>
-->    
    <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    <xsl:if  test="($curr_fld/../../@TYPE = 'Multiple Entry') and ($curr_fld/../../@VIEW = 'Single Entry')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../../ID"/></xsl:attribute>
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
    <xsl:if test="../TYPE != 'CHECKBOX' or (../TYPE = 'CHECKBOX' and ($eventname != 'onchange' or $eventname != 'onChange'))"> 
    
    <xsl:attribute name="{./NAME}">
        <xsl:if test="$funcId != 'C' or ($funcId = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($funcId = 'C' and count(../NAME) = 0)">
            <!--<xsl:value-of select="./FUNCTION" />-->
            <xsl:variable name="exitEvent">
            <xsl:value-of select="./FUNCTION" />
            <!--Screen Saver Changes Start -->
            <xsl:if test="../TYPE = 'BUTTON'">
        	<xsl:text>;mainWin.fnUpdateScreenSaverInterval();</xsl:text>
                </xsl:if>
            <!--Screen Saver Changes End -->
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="contains($exitEvent,'fnExit')">
                    <xsl:variable name="exitVal">
                        <xsl:value-of select="substring-before($exitEvent,'(')"/>
                    </xsl:variable>
                    <xsl:value-of select="concat($exitVal,'(event)')"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$exitEvent" />
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$funcId = 'C' and (../NAME = 'BTN_OK' or ../NAME = 'BTN_EXIT')">
            <xsl:if test="../NAME = 'BTN_OK'">
                <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>(event)</xsl:text>
            </xsl:if>
            <xsl:if test="../NAME = 'BTN_EXIT'">
                <xsl:text>fnExit_</xsl:text><xsl:value-of select="$screen"/><xsl:text>(event)</xsl:text>
            </xsl:if>
        </xsl:if>
    </xsl:attribute>
    </xsl:if>
</xsl:template>

<xsl:template match="CUSTOM" mode="template">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>



<!-- Handler for Required Flag -->
<!-- Commented by Binson
<xsl:template name="RequiredFieldHandler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="$curr_fld/REQUIRED = -1"> 
        <SPAN class="SPANFlag" title="Required Field">*</SPAN>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED != -1"> 
        <SPAN class="SPANFlag" title="Required Field" style="visibility:hidden;">*</SPAN>
    </xsl:if>

</xsl:template>
-->
<xsl:template name="dispNumberField_tmp">
    <xsl:param name="EntityType"/>
  <!-- <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)"> 
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
            </INPUT>    -->
    <!--<input type="text" class="TXTro" onactivate="acceptInputNumber('{../NAME}')" onbeforedeactivate="validateInputNumber('{../NAME}')">-->
    <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">  
    <oj-label slot="label">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
          <!--  <xsl:text>I</xsl:text>-->
        </xsl:attribute>
	     <xsl:if test="../REQUIRED = -1">
		<xsl:attribute name="show-required">true</xsl:attribute>
	    </xsl:if>
		<!--Fix for 17155663 start-->
		<xsl:choose>
		<xsl:when test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <!--<xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">-->
            <xsl:if test="../LABEL != ''">
            <xsl:attribute name="class">
            <xsl:text>oj-flex-item</xsl:text>
              <!--  <xsl:attribute name="class">
                    <xsl:text>LABELNormal</xsl:text>
                </xsl:attribute>    
				<xsl:attribute name="style">--> <!-- 12.1 screen height change start-->
					<!--<xsl:text>width:</xsl:text>
					<xsl:value-of select="$labelWidth"/>
					<xsl:text>px;</xsl:text>-->
				</xsl:attribute><!-- 12.1 screen height change end-->
                <xsl:value-of select="../LABEL"/>
            </xsl:if>
            <xsl:if test="../LABEL = ''">
               <xsl:attribute name="class">
					
                 <!-- <xsl:choose>
                    <xsl:when test="../../HREQ = '-1'">
                        <xsl:value-of select="'LABELNormal LABELNormalHF'" />
                        </xsl:when>
                    <xsl:otherwise>
                       <xsl:value-of select="'LABELNormal LBLinv2'" /> 
                    </xsl:otherwise>
                  </xsl:choose>-->
					<!--Fix For 15849112  Ends -->
            </xsl:attribute> 
           <!-- <xsl:attribute name="style">--> <!-- 12.1 screen height change start--><!--CLDCROLL fixes begin-->
		<!--<xsl:text>width:</xsl:text>
		<xsl:value-of select="$labelWidth"/>
		<xsl:text>px;</xsl:text>
            </xsl:attribute>--><!-- 12.1 screen height change end--><!--CLDCROLL fixes end-->
			
                <xsl:value-of select="../../LABEL"/>
            </xsl:if>
        <!--</xsl:if>-->
		</xsl:when>
		<xsl:otherwise>
            <xsl:value-of select="../LABEL"/>
                </xsl:otherwise>
		</xsl:choose>
		<!--Fix for 17155663 end-->
    
     </oj-label>
    </xsl:if>
    <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <xsl:call-template name="dispSpanFlag_tmp" />
    </xsl:if>
    <!-- Fix for 19813552 starts -->
    <!--<input type="text" class="TextNormal numeric" title="{../LABEL}" onblur="validateInputNumber(this)">--><!--Fix for 17235409 -->
   <!-- <input type="text" class="TextNormal numeric" title="{../LABEL}" > -->
    <oj-input-text slot="value"  >
         <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
                <xsl:attribute name="class">oj-form-control-text-align-right</xsl:attribute>
            </xsl:if>
             <xsl:if test="(../../@TYPE = 'Multiple Entry' or ../../@VIEW != 'Single Entry')">
                <xsl:attribute name="class">oj-helper-text-align-end</xsl:attribute>
            </xsl:if>
    <!-- Fix for 19813552 ends -->
	<xsl:attribute name="viewMode">Y</xsl:attribute>
         <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
            <xsl:attribute name="readonly">true</xsl:attribute>
        </xsl:if>
            <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
           </xsl:call-template>
        <!--<xsl:attribute name="readOnly">true</xsl:attribute>-->
        <!--<xsl:if test="../TYPE = 'RESTRICTED_TEXT'">
            <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
        </xsl:if>-->
      <!--  <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>-->
        
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../DBC"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
      
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
        <xsl:if test="normalize-space(../MAX_DECIMAL) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="../MAX_DECIMAL"/>
            </xsl:attribute>
        </xsl:if>
        <!--Fix for 17639247 starts -->
        <xsl:if test="normalize-space(../MAXLENGTH) != ''">                
           <!--<xsl:attribute name="MAXLENGTH1">-->
		   <xsl:attribute name="length.max">
               <xsl:value-of select="../MAXLENGTH"/>
            </xsl:attribute>
        </xsl:if>
        <!--Fix for 17639247 ends -->
         <xsl:attribute name="converter">
				<xsl:text>{{numberConverter</xsl:text>
                                 <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                                <xsl:value-of select="../../DBT"/>
                                </xsl:if>
                                <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
                                <xsl:value-of select="../DBT"/>
                                </xsl:if>
                                <xsl:text>__</xsl:text>
                                <xsl:value-of select="../DBC"/>
                                <xsl:text>}}</xsl:text>
                </xsl:attribute>
                  <!--<xsl:attribute name="on-oj-value-changed">
				<xsl:text>{{rawValueListener}}</xsl:text>
                                
                </xsl:attribute>-->
        
   <!-- <xsl:call-template name="calcTextMaxWidth">--><!-- CLDCROLL ISSUE fixes begin-->
     <!-- <xsl:with-param name="curr_fld" select=".."/>
      <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>--><!-- CLDCROLL ISSUE fixes end-->
        <!-- Fix for bug 19813552 starts -->
       <!-- <xsl:attribute name="onblur">                     
            <xsl:text>validateInputNumber(this);</xsl:text>	-->		  
            <!--<xsl:if test="count(../EVENT) &gt; 0 and normalize-space(../EVENT/NAME) = 'onblur'">
                <xsl:call-template name="addOnblurEvent">
                    <xsl:with-param name="curr_node" select=".."/>
                </xsl:call-template>
            </xsl:if>              
        </xsl:attribute>-->
        <!-- Fix for bug 19813552 ends -->
    
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>
    </oj-input-text>
        <xsl:call-template name="generateNumberScript" >
             <xsl:with-param name="numberNode" select=".."></xsl:with-param>
        </xsl:call-template>
        <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
         <xsl:call-template name="Popup_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
            <!--<BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409-->
               <!-- <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <xsl:call-template name="Popup_Handler_tmp" />-->
                <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
               <!-- <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN>--><!--Data Uri changes -->
         <!--   </BUTTON>-->
        </xsl:if>
</xsl:template>
<xsl:template name="generateNumberScript">
    <xsl:param name="numberNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     
          <xsl:if test="($numberNode/../@TYPE = 'Multiple Entry' and $numberNode/../@VIEW != 'Single Entry') or ($numberNode/../@TYPE = 'Multiple Entry' and count($numberNode/../@VIEW) = 0)">
             <xsl:text>numberConverter</xsl:text><xsl:value-of select="$numberNode/../DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/DBC"/>=getDefaultNumberConverter('<xsl:value-of select="$numberNode/../DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/DBC"/>',  true);
         </xsl:if>
         <xsl:if test="($numberNode/../@TYPE != 'Multiple Entry' or $numberNode/../@VIEW = 'Single Entry')">
         <xsl:text>numberConverter</xsl:text><xsl:value-of select="$numberNode/DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/DBC"/>=getDefaultNumberConverter('<xsl:value-of select="$numberNode/DBT"/><xsl:text>__</xsl:text> <xsl:value-of select="$numberNode/DBC"/>',  false);
         </xsl:if>
<!--<xsl:text>amountConverter</xsl:text><xsl:value-of select="$amountNode/../BLOCK"/><xsl:text>__</xsl:text> <xsl:value-of select="$amountNode/NAME"/>= getFormattedAmount(this,  '<xsl:value-of select="$amountNode/RELATED_FIELD"/>',true);-->    

</script>
</xsl:template>
<!--input text width changes start-->
<xsl:template name="calcTextMaxWidth">
  <xsl:param name="curr_fld"/>
  <xsl:param name="EntityType"/>
   <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry') and ../../HREQ != '-1'">    
    <xsl:attribute name="style">
     <xsl:text>max-width:</xsl:text>
      <xsl:variable name="screenname">
        <xsl:value-of select="../../../@SCREEN"/>
       </xsl:variable>
        <xsl:variable name="tabID">
        <xsl:value-of select="../../@TABPAGE"/>
       </xsl:variable>
        <xsl:variable name="secId">
        <xsl:value-of select="../../@SECTION"/>
       </xsl:variable>
        <xsl:variable name="partId">
        <xsl:value-of select="../../@PARTITION"/>
       </xsl:variable>
      <xsl:variable name="partWidth">
			   <xsl:choose>
			    <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
			     <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
				 </xsl:choose>
      </xsl:variable>            
      <xsl:variable name="lovWidth" > 
        <xsl:choose>
          <xsl:when test="count($curr_fld/LOV) &gt; 0">
            <xsl:value-of select="number(26)"/><!--HTML5 Changes 6/OCT/2016-->
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="number(0)"/>
          </xsl:otherwise>
          </xsl:choose>       
      </xsl:variable>
      <xsl:variable name="popUpWidth" >
        <xsl:choose>
          <xsl:when test="count($curr_fld/POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)"> 
              <xsl:value-of select="number(26)"/><!--HTML5 Changes 6/OCT/2016-->
          </xsl:when>  
          <xsl:otherwise>
            <xsl:value-of select="number(0)"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>      
      <xsl:value-of select="(((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8) - ($labelWidth  + 16)- $lovWidth - $popUpWidth)"></xsl:value-of>
     <!--<xsl:value-of select="number(0)"></xsl:value-of>-->
    <xsl:text>px</xsl:text>
  </xsl:attribute>
  </xsl:if>
</xsl:template>
<!--input text width changes end-->

<xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>

   
   <oj-input-text slot="value" type="TEXT">
    
	<xsl:attribute name="viewMode">Y</xsl:attribute>
          <!--FCUBS_12.1_CASA_Joint_Holder_Display Changes starts-->
         <xsl:if test="count(../HOTKEYREQJA) &gt; 0">        
             <xsl:attribute name="HOTKEYREQJA">
                <xsl:value-of select="../HOTKEYREQJA" />
            </xsl:attribute>
       </xsl:if>
       <!--FCUBS_12.1_CASA_Joint_Holder_Display Changes Ends-->
   <!--input text width changes start-->
    <xsl:call-template name="calcTextMaxWidth">
      <xsl:with-param name="curr_fld" select=".."/>
      <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>           
    <!--input text width changes end-->
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
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
    
    <!-- Conditions for Auto-Lov starts -->
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
           
                
    <!-- Conditions for Auto-Lov ends -->
    <!--
    <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
        <xsl:attribute name="onchange">fnToUppercase(this,event)</xsl:attribute>       
    </xsl:if>
    -->
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
        <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../DBC"/>
                    <xsl:text>}}</xsl:text> 
    </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
    </xsl:if>
   
    
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>

    <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count(../LOV) = 0 ">
            <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
<!--                <BUTTON class="ButtonLov" TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">    -->
               <!-- <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" tabindex="0" type="button" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409-->
                    <xsl:call-template name="Popup_Handler_tmp" >
                    <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                   <!-- <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN>--><!--Data Uri changes -->
               <!-- </BUTTON>-->
            </xsl:if>
        </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">   
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">        
      <!--  <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409-->
          <!--  <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>-->
            <xsl:call-template name="Popup_Handler_tmp" >
            <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
          <!--  <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}">/SPAN>--><!--Data Uri changes -->
       <!-- </BUTTON> -->
    </xsl:if>
    </xsl:if>
    </oj-input-text> 
</xsl:template>
<xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="." />

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LABEL"/>
    </xsl:attribute>
    
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LABEL"/>
    </xsl:attribute>
    
    <xsl:if test="count($curr_fld/DBT) &gt; 0">
        
        <xsl:if test="($curr_fld/../@TYPE != 'Multiple Entry' or $curr_fld/../@VIEW = 'Single Entry' or $curr_fld/TYPE ='SELECT')">
        <xsl:attribute name="ID">        
            <xsl:if test="$curr_fld/TYPE !='SELECT'">
                <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
            </xsl:if>
            <xsl:if test="$curr_fld/TYPE ='SELECT'">
                <xsl:variable name="tmpdbc1" >
                <xsl:if test="count($curr_fld/DBC) = 0 or $curr_fld/DBC = ''" >
                  <xsl:value-of select='$curr_fld/NAME'/>
                 
                 </xsl:if>
                 <xsl:if test="count($curr_fld/DBC) > 0 and $curr_fld/DBC != ''" >
                 <xsl:value-of select='$curr_fld/DBC'/>
                 
                 </xsl:if>
                </xsl:variable>
                <xsl:variable name="tmpdbt1" >
                <xsl:if test="count($curr_fld/DBT) = 0 or $curr_fld/DBT = ''" >
                <xsl:value-of select='"UIBLOCK"'/>
                 
                 </xsl:if>
                 <xsl:if test="count($curr_fld/DBT) > 0 and $curr_fld/DBT != ''" >
                 <xsl:value-of select='$curr_fld/DBT'/>
                 </xsl:if>
                </xsl:variable>
                <xsl:value-of select="concat($tmpdbt1,'__',$tmpdbc1)" />
        </xsl:if>
        </xsl:attribute> 
        
   </xsl:if>
    </xsl:if>
   <xsl:if test="($curr_fld/../@TYPE = 'Multiple Entry' and $curr_fld/../@VIEW != 'Single Entry') and   $curr_fld/TYPE!='SELECT'">
         <xsl:attribute name="MEID">
            <xsl:text>[['</xsl:text>
            <xsl:value-of select="concat($curr_fld/../DBT,'__',$curr_fld/DBC)"/>
            <xsl:text>RC'+ row.index]]</xsl:text>
    </xsl:attribute>
    </xsl:if>
    <!-- 11.0 Help File Fix Starts -->
    <xsl:attribute name="HELPBID">
        <xsl:value-of select="$curr_fld/../../ID" />
    </xsl:attribute>
    <!-- 11.0 Help File Fix Ends -->

    <xsl:attribute name="DBT">
        <xsl:if test="count($curr_fld/DBT) &gt; 0">
            <xsl:value-of select="$curr_fld/DBT" />
        </xsl:if>    
    </xsl:attribute>

    <xsl:attribute name="DBC">
        <xsl:value-of select="$curr_fld/DBC" />
    </xsl:attribute>
		
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/@CONTROL) > 0 and $curr_fld/@CONTROL = 'Y'">
        <xsl:attribute name="CONTROL_DBT">
           <xsl:text>UIBLOCK</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="DTYPE">
        <xsl:value-of select="$curr_fld/DTYPE" />
    </xsl:attribute>

    <xsl:if test="count($curr_fld/VALUE) &gt; 0 and  $curr_fld/TYPE != 'CHECKBOX'">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'SELECT' and $curr_fld/TYPE != 'CHECKBOX' and normalize-space($curr_fld/VALUE) != ''">
            <xsl:attribute name="DEFAULT">
                <xsl:value-of select="$curr_fld/VALUE" />
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
		
    <xsl:choose>
        <xsl:when test="number($curr_fld/SIZE) > 23">
        <!-- Size fix starts -->
          <xsl:choose>
                <xsl:when test="(count(../POPUPEDIT) = 0 and count(curr_fld/LOV) &gt;0) or (count(../POPUPEDIT) &gt;0 and count(curr_fld/LOV) = 0) or number($curr_fld/MAXLENGTH) &gt; $displaySize">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="(count(../POPUPEDIT) &gt; 0 and count(curr_fld/LOV) &gt;0) or (count(curr_fld/LOV) &gt;0 and number($curr_fld/MAXLENGTH) &gt; $displaySize)">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 8" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="$curr_fld/SIZE" />
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
        <!-- Size fix ends -->
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="SIZE">
                <xsl:if test="count(../POPUPEDIT) &gt; 0 or (count($curr_fld/MAXLENGTH) &gt;0 and $curr_fld/MAXLENGTH = '')">
                    <xsl:value-of select="$curr_fld/SIZE" />
                </xsl:if>
                <xsl:if test="count(../POPUPEDIT) = 0">
                    <xsl:if test="number($curr_fld/MAXLENGTH) &gt; $displaySize">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4" />
                    </xsl:if>
                    <xsl:if test="number($curr_fld/MAXLENGTH) &lt;= $displaySize">
                        <xsl:value-of select="$curr_fld/SIZE" />
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>

    <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
        <xsl:attribute name="ROWS"><xsl:value-of select="$curr_fld/ROWS"/></xsl:attribute>
        <xsl:attribute name="COLS"><xsl:value-of select="$curr_fld/COLS"/></xsl:attribute>            
    </xsl:if>

    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>  
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">   
           <!-- <xsl:attribute name="class">TextReadonly</xsl:attribute>     -->  	     
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0">
             <!--   <xsl:attribute name="class">TextReadonly</xsl:attribute>  -->     	     
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
            </xsl:if>        
            <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
              <!--  <xsl:attribute name="class">TextAreaReadonly</xsl:attribute>-->
            </xsl:if>
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <!--<xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TextDisabled</xsl:attribute>
    </xsl:if>-->
      <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">
           <!-- <xsl:attribute name="class">TextDisabled</xsl:attribute>-->
        </xsl:if>
    </xsl:if>

    <xsl:if test = "$curr_fld[TYPE = 'CHECKBOX'] or $curr_fld[TYPE = 'SELECT']">
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="DISABLED"/>
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>

	<!--Fix for 16785126 -->
    <xsl:if test="count($curr_fld/EVENT) &gt; 0 and $curr_fld/TYPE != 'TEXT'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
    <xsl:if test="count($curr_fld/EVENT) &gt; 0 and $curr_fld/TYPE = 'TEXT' and normalize-space($curr_fld/EVENT/NAME) != 'onchange'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
     <xsl:if test="count($curr_fld/EVENT) &gt; 0 and $curr_fld/TYPE = 'TEXT' and count(../LOV) &lt;= 0 and normalize-space($curr_fld/EVENT/NAME) = 'onchange'">
      <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    </xsl:if>
	<!--Fix for 16785126 -->
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template" />
     
     <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED ='-1'">
        <xsl:attribute name="REQUIRED">
            <xsl:text>true</xsl:text>
        </xsl:attribute>
        </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED ='-1'">
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

    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="class">hidden</xsl:attribute>
    </xsl:if>

<!--
    <xsl:attribute name="TABINDEX">
        <xsl:value-of select="$curr_fld/TABINDEX" />
    </xsl:attribute>
-->
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
        <xsl:if test="normalize-space($curr_fld/MIN_VAL) != ''">
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$curr_fld/MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space($curr_fld/MAX_VAL) != ''">        
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$curr_fld/MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space($curr_fld/MAX_DECIMAL) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="$curr_fld/MAX_DECIMAL"/>
            </xsl:attribute>
        </xsl:if>
        
        <!--<xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>  -->         
        <!--</xsl:attribute>-->
    
    </xsl:if>
    <xsl:if  test="($curr_fld/../../@TYPE = 'Multiple Entry') and ($curr_fld/../../@VIEW = 'Single Entry')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../../ID"/></xsl:attribute>
    </xsl:if>  
      
</xsl:template>



<xsl:template name="LovHandler_tmp">
    <xsl:param name="curr_fld" />
    <xsl:param name="EntityType" />
    <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count($curr_fld/LOV) &gt; 0 and (count($curr_fld/READ_ONLY) = 0 or $curr_fld/READ_ONLY = 0)">
       <!-- 10.2sp1 security related changes.-->
     <!-- <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="0" type="button">-->
      <oj-button slot="end" display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov_SummaryAudit}"  tabindex="0" type="button" disabled="true">
           <!-- <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
           <!-- <xsl:if test="$EntityType = 'NUMBERTEXT'">
            <xsl:attribute name="class">
            <xsl:text>inputNumLovIcon</xsl:text>
            </xsl:attribute>
            </xsl:if>-->
        <!--    <xsl:if test="$curr_fld/../@TYPE != 'ME' ">
                <xsl:attribute name="disabled">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="($curr_fld/../@TYPE = 'ME' and $curr_fld/../@VIEW != 'SE') or ($curr_fld/../@TYPE = 'ME' and count($curr_fld/../@VIEW) = 0)">
                <xsl:attribute name="disabled">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 
            </xsl:if>-->
        <xsl:call-template name="dispLov">
            <xsl:with-param name="curr_fld" select="$curr_fld"/>
            <xsl:with-param name="containerId" select="substring-before($Brn_Neo, '__')"/>
        </xsl:call-template>
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="READONLY">-1</xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
            <xsl:attribute name="READONLY">-1</xsl:attribute>
        </xsl:if>
        <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
        <span tabindex="0" class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
       </span>
        </oj-button>
        </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">
        <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
            <!-- 10.2sp1 security related changes.-->
           <!-- <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" type="button">--><!--Fix for 21627244 -->
            <oj-button slot="end" display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov_SummaryAudit}"  tabindex="0" type="button" disabled="true">
                <!--<xsl:if test="count($curr_fld/INPUT_LOV) = 0">
                    <xsl:attribute name="tabindex">
                        <xsl:text>0</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                </xsl:if>-->
          <!--  <xsl:if test="$EntityType = 'NUMBERTEXT'">
            <xsl:attribute name="class">
            <xsl:text>inputNumLovIcon</xsl:text>
            </xsl:attribute>
            </xsl:if>-->
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="containerId" select="$containerId"/>
                </xsl:call-template>
                <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                   <!-- <xsl:attribute name="DISABLED"/>-->
                </xsl:if>
                <xsl:if test="count($curr_fld/INPUT_LOV) = 0">
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                    <span tabindex="-1" class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
                    </span>
                </xsl:if>     
                <xsl:if test="count($curr_fld/INPUT_LOV) != 0">
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                    <span class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
                </span>
                </xsl:if>  
             </oj-button>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON type="button" class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="0" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
            <!--<IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
            <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="0" type="button" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
            <!--<IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
            <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="0" type="button" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
            <!--<IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
            <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="0" type="button" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
            <!--<IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>-->
            <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
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
            
    <xsl:attribute name="ONCLICK">
        <xsl:text>show_editor('</xsl:text><xsl:value-of select="$curr_fld/NAME"/><xsl:text>','</xsl:text>
        
        <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
            <xsl:value-of select="$curr_fld/MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
            <xsl:value-of select="$curr_fld/SIZE" />
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:if test="normalize-space($curr_fld/POPUPEDIT/TITLE) != ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="$curr_fld/POPUPEDIT/TITLE"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="normalize-space($curr_fld/POPUPEDIT/TITLE) = ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="$curr_fld/LABEL"/>
            </xsl:call-template>
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
    <xsl:value-of select="$curr_node/LOV/NAME"/>
    <xsl:text>.show_auto_lov('</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/LOV/RET_FLDS)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/LOV/FORM_NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/LOV/BIND_VARS)"/>
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
    <xsl:text>','</xsl:text>
    <xsl:value-of select="$containerId"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="$curr_node/LOV/NAME"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="$curr_node/LOV/EXACT_FETCH"/>
    <xsl:text>', this, event)</xsl:text>
</xsl:template>

<!--Fix for 16785126 -->
<xsl:template name="addOnchangeEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
<!--Fix for 16785126 -->
<!-- Fix for bug 19813552 starts -->
<xsl:template name="addOnblurEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
<!-- Fix for bug 19813552 ends -->

<xsl:template name="dispLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="containerId"/>
    <xsl:attribute name="onclick">
        <xsl:value-of select="$curr_fld/LOV/NAME"/>
        <xsl:text>.show_lov('</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/LOV/RET_FLDS)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/LOV/FORM_NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/LOV/BIND_VARS)"/>
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
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($containerId)"/>
        <xsl:text>','</xsl:text>
		<xsl:value-of select="$curr_fld/LOV/NAME"/>
        <xsl:text>', event)</xsl:text>
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
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">    
        <xsl:value-of select="substring-before($curr_fld/LABEL,$curr_fld/ACCESSKEY)"/>
        <U><xsl:value-of select="$curr_fld/ACCESSKEY" /></U>
        <xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or (count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) = '') or not(contains($curr_fld/LABEL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LABEL" />
    </xsl:if>
    <xsl:if test="$curr_fld/LABEL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
    
</xsl:template>
<!--HTML5 Changes Start-->
<xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'"> 
    <oj-switch slot="value"  >
      <!--  <label class="LBLChkRadSel NewChkbox">
            <xsl:attribute name="FOR">
                <xsl:if test="../DBT != ''">
                     <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../DBT = ''">
                     <xsl:value-of select="../DBC"></xsl:value-of>
                </xsl:if>-->
				 <!--9NT1606_12_4_RETRO_12_3_26230002 starts-->
               <!-- <xsl:if test="../DBC = ''">
                    <xsl:value-of select = "ID"/>
                </xsl:if>-->
				<!--9NT1606_12_4_RETRO_12_3_26230002 ends-->
          <!--  </xsl:attribute>        
            <input type="checkbox">-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
			 <!--9NT1606_12_4_RETRO_12_3_26230002 starts-->
            <xsl:if test="../DBC = ''">
                <xsl:attribute name="ID">        
                    <xsl:value-of select = "ID"/>
                </xsl:attribute>
            </xsl:if>
			<!--9NT1606_12_4_RETRO_12_3_26230002 ends-->
            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                <xsl:attribute name="value">true</xsl:attribute>
            </xsl:if>
            </oj-switch>
           <!-- <div class="DIVChkRadSel"><span></span></div>
            <xsl:if test="../LABEL != ''">
                <xsl:value-of select="../LABEL"/>
            </xsl:if>
            <xsl:if test="../LABEL = ''">
                <xsl:attribute name="class">
                    <xsl:text>LABELCheck LBLinv2</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="../../LABEL"/>
            </xsl:if>
        </label>-->
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <oj-switch slot="value"  >
       <!-- <label class="LBLChkRadSel NewChkbox">--><!--HTML5 Changes 6/OCT/2016--><!--HTML5 changes 14/NOV/2016 start-->
         <!--   <xsl:attribute name="for">
                <xsl:value-of select="concat(../../DBT,'__',../DBC)"/>
            </xsl:attribute>
            <input type="checkbox">-->
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                <xsl:attribute name="value">true</xsl:attribute>
            </xsl:if>
            <xsl:attribute name="title">
                <xsl:value-of select="../LABEL"/>
            </xsl:attribute>
            <xsl:attribute name="id">
                <xsl:value-of select="concat(../../DBT,'__',../DBC)"/>
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                   <!-- <xsl:value-of select="../NAME"/>-->
                   <xsl:value-of select="../DBC"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
                </oj-switch>
           <!-- </input>--><!--HTML5 changes 14/NOV/2016 end-->
            <!--<div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016-->
        <!--</label>-->
    </xsl:if>

</xsl:template>
<!--HTML5 Changes End-->

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

   <!-- <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
    <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    </INPUT>-->
    <xsl:if test="(count(../../HREQ) = 0 or (count(../../HREQ) > 0 and ../../HREQ != -1)) and (../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
    <oj-label slot="label">
   <!-- <label class="LBLinv">-->
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
		 <xsl:if test="../REQUIRED = -1">
		 <xsl:attribute name="show-required">true</xsl:attribute>
		 </xsl:if>
		<!--Fix for 17155663 start-->
		<xsl:choose>
		<xsl:when test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <!--<xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">-->
            <xsl:if test="../LABEL != ''">
                <xsl:attribute name="class">
                    <xsl:text>oj-flex-item</xsl:text>
                </xsl:attribute> 
				<!--<xsl:attribute name="style">--><!-- 12.1 screen height change start-->
					<!--<xsl:text>width:</xsl:text>
					<xsl:value-of select="$labelWidth"/>
					<xsl:text>px;</xsl:text>
					</xsl:attribute>--><!-- 12.1 screen height change end-->			
                <xsl:value-of select="../LABEL"/>
            </xsl:if>
            <xsl:if test="../LABEL = ''">
               <xsl:attribute name="class">
					<!--Fix For 15849112  starts -->
                <!--  <xsl:choose>
                    <xsl:when test="../../HREQ = '-1'">
                        <xsl:value-of select="'LABELNormal LABELNormalHF'" />
                        </xsl:when>
                    <xsl:otherwise>
                       <xsl:value-of select="'LABELNormal LBLinv2'" />
                    </xsl:otherwise>
                  </xsl:choose>-->
					<!--Fix For 15849112  Ends -->
            </xsl:attribute>
                <xsl:value-of select="../../LABEL"/>
            </xsl:if>
        <!--</xsl:if>-->
		</xsl:when>
		<xsl:otherwise>
            <xsl:value-of select="../LABEL"/>
        </xsl:otherwise>
		</xsl:choose>
		<!--Fix for 17155663 end-->
    </oj-label>
         </xsl:if>
   <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <!--<xsl:call-template name="dispSpanFlag_tmp" />-->
    </xsl:if>
    <!--<INPUT TYPE="TEXT" class="TextNormal" title="{../LABEL}" onblur="validateInputDate('{../NAME}', event)" >-->
     <oj-input-date slot="value" title="{../LBL}"  day-formatter="[[dayFormatter]]"  converter="[[dateConverter]]">
    <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes added if-->
    <xsl:if test="$dateDelimiterReqd = 'Y'">
        <xsl:attribute name="onkeyup">                     
            <xsl:text>autoPopSep('{../NAME}', event);</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    <xsl:attribute name="SIZE">
        <xsl:value-of select="11"/>
    </xsl:attribute>
    <!-- for multiple entry text fields needs add title and * !--> 
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
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
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                <xsl:value-of select="../DBC"/>
                <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
        </oj-input-date>
    <xsl:if test="count(../LOV) &gt; 0">
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </xsl:if>
    <!-- Display Calendar Button  -->
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">
            <!--
            <BUTTON class="ButtonLov" TABINDEX="{../TABINDEX}" onclick="disp_cal('{../NAME}', '{../NAME}I')">
                <IMG class="IMGLov" SRC="{$imgPath_XSL}/Icons/Calendar.gif" title="Calendar"/>
            </BUTTON>
            -->
          <!--  <button type="button" class="BTNImg" tabindex="0" onclick="disp_cal('{../NAME}', event)" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$calendar_SummaryAudit}">-->
            <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/calendar.gif" alt="{$calendar_SummaryAudit}"/>-->
           <!-- <SPAN class="IMGInline BtnCalender" title="{$calendar_SummaryAudit}"></SPAN>--><!-- Data Uri changes -->
           <!-- </button> Sudipta Check with Hitesh-->
        </xsl:if>
    </xsl:if>
</xsl:template>


<xsl:template name="dispTextareaField_tmp" >
    <xsl:param name="position" select="."/>

     <oj-text-area slot="value">
    
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." /> 
    </xsl:call-template>
    
    <xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
            <xsl:value-of select="../MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
            <xsl:value-of select="../SIZE" />
        </xsl:if>
    </xsl:attribute>
    
    <!-- for multiple entry text fields needs add title and * !--> 
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
        <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
        <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="../DBC"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
            <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
    </xsl:if> 
     </oj-text-area>
    
    <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
    <xsl:call-template name="Popup_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
       <!-- <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" tabindex="0" type="button" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409--> 
           <!-- <xsl:call-template name="Popup_Handler_tmp" />-->
            <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
           <!-- <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN>--><!--Data Uri changes -->
      <!--  </BUTTON>-->
    </xsl:if>
    
</xsl:template>


<xsl:template name="dispSelectField_tmp">
    
     <oj-select-single slot="value">
    <!--<SELECT class="SELECTNormal">-->
    
     <xsl:variable name="tmpdbc2" >
    <xsl:if test="count(../DBC) = 0 or ../DBC = ''" >
      <xsl:value-of select='../NAME'/>
     
     </xsl:if>
     <xsl:if test="count(../DBC) > 0 and ../DBC != ''" >
     <xsl:value-of select='../DBC'/>
     
     </xsl:if>
    </xsl:variable>
    <xsl:variable name="tmpdbt2" >
    <xsl:if test="count(../DBT) = 0 or ../DBC = ''">
    <xsl:value-of select='"UIBLOCK"'/>
     
     </xsl:if>
     <xsl:if test="count(../DBT) > 0 and ../DBT != ''" >
     <xsl:value-of select='../DBT'/>
     
     </xsl:if>
    </xsl:variable>
    
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($tmpdbt2,'__',$tmpdbc2)"></xsl:value-of>
    </xsl:attribute>
    
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
        
             <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                   <!-- <xsl:value-of select="../NAME"/>-->
                   <xsl:value-of select="../DBC"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
             <xsl:attribute name="ME">
                <xsl:text>Y</xsl:text>
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="count(../MULTIPLE) &gt; 0 and ../MULTIPLE = -1">
        <xsl:attribute name="MULTIPLE">MULTIPLE</xsl:attribute>
    </xsl:if>
    
    <!--Added by Binson -->
   <!-- <xsl:if test="count(../WIDTH) &gt; 0">
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
                <xsl:value-of select="../WIDTH" />
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
   </xsl:if>-->
	<!--Fix for 28371503-->
    <xsl:if test="count(../SIZE) = 0 or (count(../SIZE) > 0 and ../SIZE = '')">
        <xsl:attribute name="SIZE"><xsl:text>1</xsl:text></xsl:attribute>
    </xsl:if> 
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
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
    <!--<xsl:for-each select="../OPTION">
        <oj-option VALUE="{@VALUE}">
            <xsl:if test="count(@SELECTED) &gt; 0 and @SELECTED=-1">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                <xsl:attribute name="DEFAULT">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="." />
        </OPTION>
    </xsl:for-each> -->
    </oj-select-single>
    <xsl:call-template name="generateSelectScript">
                <xsl:with-param name="selectNode" select=".."/>
    </xsl:call-template>
</xsl:template>


<xsl:template name="generateSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
    <xsl:variable name="tmpdbc" >
    <xsl:if test="count($selectNode/DBC) = 0 or $selectNode/DBC = ''" >
      <xsl:value-of select='$selectNode/NAME'/>
     
     </xsl:if>
     <xsl:if test="count($selectNode/DBC) > 0 and $selectNode/DBC != ''" >
     <xsl:value-of select='$selectNode/DBC'/>
     
     </xsl:if>
    </xsl:variable>
    <xsl:variable name="tmpdbt" >
    <xsl:if test="count($selectNode/DBT) = 0 or $selectNode/DBT = ''" >
    <xsl:value-of select='"UIBLOCK"'/>
     
     </xsl:if>
     <xsl:if test="count($selectNode/DBT) > 0 and $selectNode/DBT != ''" >
     <xsl:value-of select='$selectNode/DBT'/>
     
     </xsl:if>
    </xsl:variable>
   <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
     selectControl['<xsl:value-of select="concat('UIBLOCK__',$tmpdbc)"></xsl:value-of>'] = [];
     </xsl:if>
     <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
     
     selectControl['<xsl:value-of select="concat($tmpdbt,'__',$tmpdbc)" ></xsl:value-of>'] = [];
     </xsl:if>
     
     
    <xsl:for-each select="$selectNode/OPTION">
     var obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' };
       <xsl:if test="count(@SELECTED) > 0 and @SELECTED='-1'">
       obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' ,'defaultValue':  '<xsl:value-of select="@VALUE"/>'};
       </xsl:if>
     
      <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
    selectControl['<xsl:value-of select="concat('UIBLOCK__',$tmpdbc)"></xsl:value-of>'].push(obj);
     </xsl:if>
     <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
     selectControl['<xsl:value-of select="concat($tmpdbt,'__',$tmpdbc)"></xsl:value-of>'].push(obj);
     </xsl:if>
    </xsl:for-each>
     <xsl:if test="count($selectNode/@CONTROL) > 0 and $selectNode/@CONTROL = 'Y'">
       arrProvider<xsl:value-of select="concat('UIBLOCK__',$tmpdbc)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat('UIBLOCK__',$tmpdbc)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
    </xsl:if>
 <xsl:if test="count($selectNode/@CONTROL) = 0 or $selectNode/@CONTROL = 'N'">
       arrProvider<xsl:value-of select="concat($tmpdbt,'__',$tmpdbc)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($tmpdbt,'__',$tmpdbc)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
              </xsl:if>
       
    </script>
</xsl:template>

<xsl:template name="dispButtonField_tmp">
   <!-- <BUTTON class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" type="button">--><!--Fix for 21627395 -->
    <!--<oj-button slot="value" class="oj-button-md" disabled="true"> -->
    <oj-button slot="value" class="oj-button-md" >
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
   	</xsl:call-template>
        <xsl:choose>
            <xsl:when test="contains(../NAME,'BTN_PREV') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_REMOVE')">
               <!-- <xsl:attribute name="class">BUTTONInline</xsl:attribute>
                <xsl:attribute name="onMouseOver">this.className='BUTTONInlineHover'</xsl:attribute>
                <xsl:attribute name="onMouseOut">this.className='BUTTONInline'</xsl:attribute>
                <xsl:attribute name="onFocus">this.className='BUTTONInlineHover'</xsl:attribute>
                <xsl:attribute name="onBlur">this.className='BUTTONInline'</xsl:attribute>-->
                <!--<xsl:variable name="l_btnimg">
                    <xsl:if test="contains(../NAME,'BTN_PREV')"><xsl:value-of select="'BTNPrevious.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_NEXT')"><xsl:value-of select="'BTNNext.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_ADD')"><xsl:value-of select="'BTNAddrow.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_REMOVE')"><xsl:value-of select="'BTNRemoveRow.gif'"/></xsl:if>
                </xsl:variable>-->
                <xsl:if test="count(../DBT) = 0">
                    <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                    <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                </xsl:if>
                <!--<img class="IMGInline" src="{$imgPath_XSL}/{$l_btnimg}" alt=""/>-->
                <SPAN title="">
                <xsl:if test="contains(../NAME,'BTN_ADD')"> 
                  <xsl:attribute name="class">
                      <!--<xsl:value-of select="'IMGInline ImgAddRow'" />-->
                      <xsl:value-of select="'oj-ux-ico-plus'"/>
                  </xsl:attribute>
                </xsl:if>
                <xsl:if test="contains(../NAME,'BTN_REMOVE')"> 
                  <xsl:attribute name="class">
                     <!-- <xsl:value-of select="'IMGInline ImgDelRow'" />-->
                      <xsl:value-of select="'oj-ux-ico-minus'"/>
                  </xsl:attribute>
              </xsl:if>
              <xsl:if test="contains(../NAME,'BTN_PREV')">
                <xsl:attribute name="class">
                 <!-- <xsl:value-of select="'IMGInline ImgPrev'" />-->
                  <xsl:value-of select="'oj-ux-ico-caret-left'"/>
                </xsl:attribute>
              </xsl:if>
              <xsl:if test="contains(../NAME,'BTN_NEXT')">
                <xsl:attribute name="class">
                  <!--<xsl:value-of select="'IMGInline ImgNext'" />-->
                  <xsl:value-of select="'oj-ux-ico-caret-right'"/>
                </xsl:attribute>
              </xsl:if>
              </SPAN><!--DataUri Changes -->
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="count(../SRC) &gt; 0">
                   <!-- <xsl:attribute name="class">BUTTONInline</xsl:attribute>
                    <xsl:attribute name="onMouseOver">this.className='BUTTONInlineHover'</xsl:attribute>
                    <xsl:attribute name="onMouseOut">this.className='BUTTONInline'</xsl:attribute>
                    <xsl:attribute name="onFocus">this.className='BUTTONInlineHover'</xsl:attribute>
                    <xsl:attribute name="onBlur">this.className='BUTTONInline'</xsl:attribute> -->
                    <xsl:if test="count(../DBT) = 0">
                        <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                        <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                    </xsl:if>
                    <xsl:variable name="l_srcimg" select="../SRC"/>
                   <!-- <img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}" alt=""/> -->
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:value-of select="../LABEL"/><!--HTML5 Changes -->
     </oj-button>
</xsl:template>


<xsl:template name="dispRestrictedTextField_tmp">
        <xsl:param name="EntityType"/>

	<!--<INPUT TYPE="TEXT" class="TextNormal" onblur="validateRestrictedTextValue(this)">-->
        <!--<INPUT TYPE="TEXT" class="TextNormal">-->
        <oj-input-text slot="value" type="TEXT">
        <xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>

        <!--<xsl:if test="../TYPE='RESTRICTED_TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
            <xsl:attribute name="style">
                <xsl:text>{text-align:right;}</xsl:text>
            </xsl:attribute>
        </xsl:if>-->

		<xsl:if test="normalize-space(../MAXLENGTH) = ''">
            <xsl:attribute name="MAXLENGTH">
			<xsl:value-of select="number(../MAXLENGTH)"/>
			</xsl:attribute>
	    </xsl:if>
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
          <xsl:if test="count(../MAXLENGTH) = 0">
		<xsl:attribute name="MAXLENGTH">
                <xsl:value-of select="../SIZE"/>
		</xsl:attribute>
            </xsl:if>
        <!-- Conditions for Auto-Lov starts -->
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
            <xsl:if test="count(../LOV) &gt; 0">
				<!--Fix for 16785126 -->
                <xsl:attribute name="onchange">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this,event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
					<!--Fix for 16785126 -->
                     <xsl:if test="count(../EVENT) &gt; 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) &lt; 1">
            <xsl:attribute name="onchange">validateRestrictedTextValue(this);fnToUppercase(this,event)</xsl:attribute> 
        </xsl:if>
        </xsl:if>
        <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
            <xsl:if test="count(../LOV) &gt; 0">
				<!--Fix for 16785126 -->
                <xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this,event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
				  <!--Fix for 16785126 -->
                  <xsl:if test="count(../EVENT) &gt; 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:if>
				<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) &lt; 1">
            <xsl:attribute name="onchange">fnToUppercase(this,event)</xsl:attribute> 
        </xsl:if>
        </xsl:if>
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
            <xsl:if test="count(../LOV) &gt; 0">
				<!--Fix for 16785126 -->
                <xsl:attribute name="onchange">
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
					<!--Fix for 16785126 -->
                    <xsl:if test="count(../EVENT) &gt; 0 and normalize-space(../EVENT/NAME) = 'onchange'">
                      <xsl:call-template name="addOnchangeEvent">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:if>
					<!--Fix for 16785126 -->
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) &lt; 1">
            <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
        </xsl:if>
        </xsl:if>
        <!-- Conditions for Auto-Lov ends -->
       <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
          <xsl:value-of select="../LABEL"/>
          <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
       </xsl:if>
  <!--  </INPUT>-->
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>


    <!-- For a text field, both lov & popup can appear -->
      <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count(../LOV) = 0 ">
          <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
           <!-- <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" tabindex="0" type="button" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409-->
                    <xsl:call-template name="Popup_Handler_tmp" >
                    <xsl:with-param name="curr_fld" select=".."/>
                    </xsl:call-template>
                    <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                   <!-- <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN>--><!--Data Uri changes -->
           <!-- </BUTTON>-->
          </xsl:if>
        </xsl:if>
      </xsl:if>
      
      <xsl:if test="$Brn_Neo = ''">   
        <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; 254)">
            <!--<BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">--><!--Fix for 17235409-->
               <!-- <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>-->
                <xsl:call-template name="Popup_Handler_tmp" />
                <!--<IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                <!--<SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN>--><!--Data Uri changes -->
           <!-- </BUTTON>-->
        </xsl:if>
      </xsl:if>
      </oj-input-text> 
</xsl:template>

<xsl:template name="dispFileField_tmp">
    
    <INPUT TYPE="File" class="TextNormal" >
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>

        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LABEL"/>
            </xsl:attribute>
        </xsl:if>
    </INPUT>
    
</xsl:template>

<xsl:template name="dispMaskField_tmp">
    <xsl:param name="EntityType"/>
    <OJ-INPUT-TEXT style="display:none;" onpropertychange="displayValue(this)">
   <!-- <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">-->
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
   </OJ-INPUT-TEXT>

    <!--<INPUT TYPE="TEXT" class="TextNormal" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');">-->
    <INPUT TYPE="TEXT" class="TextNormal" mask="{../MASK}" onblur="validateInputValue('{../NAME}');">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
          <xsl:if test="../REQUIRED = -1">
			 <xsl:attribute name="show-required">true</xsl:attribute>
			</xsl:if>
       </xsl:attribute>
    </xsl:if>
    
    </INPUT>
</xsl:template>

<xsl:template name="dispPasswordField_tmp">
   <!-- <Input type="PASSWORD" class="TextNormal" onpaste="return false;" >-->
      <oj-input-password slot="value" onpaste="return false;" readonly="true" mask-icon="visible">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="length.max">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
    
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LABEL"/>
                <!-- <xsl:if test="../REQUIRED='-1'"> * </xsl:if> -->
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:text>{{row.data.</xsl:text>
                    <!--<xsl:value-of select="../NAME"/>-->
                    <xsl:value-of select="../DBC"/>
                    <xsl:text>}}</xsl:text> 
            </xsl:attribute>
              <xsl:attribute name="readonly_temp">
                <xsl:text>{{row.data.readOnly}}</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="user-assistance-density">
                <xsl:text>compact</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </oj-input-password>
</xsl:template>

<xsl:template name="dispLabelOnlyField_tmp">
    <!--<label class="LABELNotes" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
    <oj-label >
       <!-- <xsl:if test="../TYPE[text()='GROUP']">
            <xsl:attribute name="class">
                <xsl:value-of select="'LABELGroup'"/>
            </xsl:attribute>
        </xsl:if> -->
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:value-of select="../LABEL" />
    </oj-label>
</xsl:template>
<xsl:template name="dispImgField_tmp">
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}" alt="">
        <!--<xsl:attribute name="STYLE">
          <xsl:text>height:</xsl:text>
          <xsl:value-of select="../HEIGHT"/>
          <xsl:text>px;width:</xsl:text>
          <xsl:value-of select="../WIDTH"/>
          <xsl:text>px;</xsl:text>
        </xsl:attribute>-->
        
        <xsl:call-template name="ATTR_Handler_tmp">
          <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../ALT) &gt; 0">
            <xsl:attribute name="ALT">
                <xsl:value-of select="../ALT" />
            </xsl:attribute>
        </xsl:if>
    </IMG>
</xsl:template>


<xsl:template name="dispDescriptionField_tmp">
    <xsl:param name="EntityType"/>

    <label class="LABELDescription" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>

    <xsl:if test="count(../VALUE) &gt; 0">
        <xsl:value-of select="../VALUE" />
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
        <span class="SPANLinkText">
        <xsl:if test="../LABEL != ''">
            <xsl:value-of select="../LABEL" />
        </xsl:if>

        <xsl:if test="../LABEL = ''">
            <xsl:value-of select="../LABEL_LINK" />
        </xsl:if>
        </span>
    </a>
    
</xsl:template>
<xsl:template name="dispCheckboxField_tmp_fldset">
    <label class="LABELCheckInline">
    <xsl:attribute name="FOR">
        <xsl:if test="../DBT != ''">
             <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
        </xsl:if>
        <xsl:if test="../DBT = ''">
             <xsl:value-of select="../DBC"></xsl:value-of>
        </xsl:if>
    </xsl:attribute>
        <input type="checkbox" class="INPUTCheckInline">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
            </xsl:if>
        </input>
        <xsl:value-of select="../LABEL"/>
    </label>
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
	   <!-- End of GlobalTemplateInput.xsl -->
	   <!-- Start of Tmp_Labels.xsl -->
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
   <!--<xsl:variable name="noScript" select="substring-before(substring-after($summaryLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />   -->
   <xsl:variable name="records" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS~~'), '@@')" />   
   <xsl:variable name="taskList" select="substring-before(substring-after($summaryLabels, 'LBL_TASKLIST~~'), '@@')" />   
   <xsl:variable name="advSummary" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED_SUMMARY~~'), '@@')" />   
   <xsl:variable name="summary" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY~~'), '@@')" />   
   <xsl:variable name="page_footer" select="substring-before(substring-after($summaryLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <!--<xsl:variable name="end_table" select="substring-before(substring-after($summaryLabels, 'LBL_END_TABLE~~'), '@@')" />-->

	   <!-- End of Tmp_Labels.xsl -->
	   <!-- Start of Tmp_GlobalInput.xsl -->
<xsl:template name="displayLabelFieldSet_tmp" >
    <xsl:value-of select="../LABEL" />
</xsl:template>

<xsl:template name="dispNormalLabel_tmp" >
    <xsl:if test="../LABEL != ''">
       <!-- <label class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
	   <!--Required Symbol Changes REDWOOD Start-->
         <xsl:if test="../REQUIRED = -1">
        <oj-label slot="label" show-required="true">
            <xsl:if test="../DBT != ''">
                <xsl:attribute name="FOR">
                    <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                </xsl:attribute>
            </xsl:if><!--HTML5 Changes Start-->
                <xsl:attribute name="class">				  
                    <xsl:text>LABELNormal reqd</xsl:text>					
                </xsl:attribute>
            <xsl:value-of select="../LABEL"/>
        </oj-label>
		</xsl:if><!--req Changes End-->
		<xsl:if test="../REQUIRED != -1"><!--req Changes End-->
		<oj-label slot="label">
            <xsl:if test="../DBT != ''">
                <xsl:attribute name="FOR">
                    <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                </xsl:attribute>
            </xsl:if><!--HTML5 Changes Start-->
            <xsl:value-of select="../LABEL"/>
        </oj-label>
		</xsl:if>
		<!--Required Symbol Changes REDWOOD End-->
    </xsl:if>
    <xsl:if test="../LABEL = ''">
    <!-- UDDEVENT Changes starts-->
  	<!--Fix For 15849112 starts -->
    <!-- <label class="LABELNormal LBLinv2">-->
      <oj-label slot="label">
            <xsl:attribute name="class" ><!-- 12.1 screen height change -->
                  <xsl:choose>
                    <xsl:when test="../../HREQ = '-1'">
                        <xsl:value-of select="'LABELNormal LABELNormalHF'" />
                        </xsl:when>
                    <xsl:otherwise>
                       <xsl:value-of select="'LABELNormal LBLinv2'" />
                    </xsl:otherwise>
                  </xsl:choose>
            </xsl:attribute>
			 <xsl:if  test="../../HREQ != '-1'">
                      <!--   <xsl:attribute name="style">
						 <xsl:text>width:</xsl:text>
						<xsl:value-of select="$labelWidth"/>
						<xsl:text>px;</xsl:text>
						 </xsl:attribute> -->
                        </xsl:if>
    <!-- UDDEVENT Changes ends-->  
	<!--Fix For 15849112 ends -->      
            <xsl:if test="../DBT != ''">
                <xsl:attribute name="FOR">
                    <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../../LABEL"/>
        </oj-label>
    </xsl:if>    
</xsl:template>

<xsl:template name="dispHiddenLabel_tmp" >
    <label class="LBLinv">
        <xsl:attribute name="FOR">
            <xsl:if test="../DBT != ''">
                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../DBT = ''">
                 <xsl:value-of select="../DBC"></xsl:value-of>
            </xsl:if>
        </xsl:attribute>
        <xsl:value-of select="../LABEL"/>
    </label>
    
</xsl:template>


<xsl:template name="dispRadioLabel_tmp" >
     <oj-label slot="label" for="ui-id-1"><!-- 12.1 screen height change -->
	    <xsl:attribute name='id'><!-- 1203 oghag fix start-->
        <xsl:if test="../DBT != ''"> 
                   <xsl:value-of select="concat('grprad_',../DBT,'__',../DBC)"></xsl:value-of>
              </xsl:if>
              <xsl:if test="../DBT = ''">
                   <xsl:value-of select="concat('grprad_',../DBC)"></xsl:value-of>
              </xsl:if>
               </xsl:attribute><!-- 1203 oghag fix end-->
        <xsl:value-of select="../LABEL"/>
    </oj-label>   
</xsl:template>

<xsl:template name="dispSpanRadioFlag_tmp" >    
    <xsl:if test="../REQUIRED = 0">
        <span class="starM_D" >
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </span>
    </xsl:if>
    <xsl:if test="../REQUIRED = -1">
       <span class="starM" >
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </span>
    </xsl:if>   
</xsl:template>

<xsl:template name="dispSpanFlag_tmp" >
  
</xsl:template>
  
<!-- Added By Murali, Horizontal Fieldset -->
<xsl:template name="HorizongalFieldSet" >
    <fieldset class="oj-flex-item">
    <oj-form-layout label-edge="start" user-assistance-density="compact">
    <xsl:if test="../LABEL = ''">
         <!--   <div class="DIVText">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody role="group" aria-labelledby="{../../ID}"> -->
                       <!-- <tr>-->
                       <!-- <div class="oj-sm-width-full">
                        <oj-label-value class="ojLabelValueClass" label-edge="start" label-width="{$labelWidth}px">
                        
                             <div slot="value" class="oj-flex-bar oj-sm-width-full">
                            <xsl:apply-templates select="../FIELD" mode="hFieldSet" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                            </div>
                            </oj-label-value>
                            </div>-->
                       <!-- </tr>
                    </tbody>
                </table>
            </div>-->
    </xsl:if>
    <xsl:if test="../LABEL != ''">
        <h4 class="">
                    <xsl:call-template name="displayLabelFieldSet_tmp"/>
        </h4>
    </xsl:if>
       <!-- <fieldset class="FIELDSETNormal">
                <legend><xsl:call-template name="displayLabelFieldSet_tmp"/></legend>-->
                <!--<div class="DIVText">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody role="group" aria-labelledby="{../../ID}">
                            <tr>-->
                             <div class="oj-sm-width-full">
                             <oj-label-value class="ojLabelValueClass" label-edge="start" label-width="{$labelWidth}px">
                                <xsl:apply-templates select="../FIELD" mode="hFieldSetLabel">
                                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                                <div slot="value" class="oj-flex-bar oj-sm-width-full">
                                <xsl:apply-templates select="../FIELD" mode="hFieldSet" >
                                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                                </div>
                                </oj-label-value>
                                </div>
                           <!-- </tr>
                        </tbody>
                    </table>
                </div>
        </fieldset>
    </xsl:if>-->
   <!-- </xsl:if>-->
    </oj-form-layout>
    </fieldset>
    
</xsl:template>
<xsl:template match="FIELD" mode="hFieldSetLabel">

        <xsl:if test="position() = 1">
        
         <!--   <xsl:if test="LABEL = ''">-->
             <xsl:if test="LABEL = ''">
                <xsl:attribute name="label-width">0px</xsl:attribute>
            </xsl:if>
        <!--<xsl:if test="./FIELD/LBL = ''">
                <xsl:attribute name="label-width">0px</xsl:attribute>
                </xsl:if>-->
        <oj-label slot="label">
		<!--REDWOOD_35706761 start-->				
				  <xsl:if test="../FIELD/REQUIRED = -1">
                  <xsl:attribute name="show-required">true</xsl:attribute>
			       </xsl:if>
		<!--REDWOOD_35706761 end-->
                                    <xsl:attribute name="FOR">
                        <xsl:if test="../DBT != ''">
                             <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="BLOCK = ''">
                             <xsl:value-of select="NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:if test="TYPE != 'BUTTON' and TYPE != 'HIDDEN'">
                        <xsl:value-of select="LABEL"/>
                    </xsl:if>
                                </oj-label>
	</xsl:if>
        </xsl:template>

<xsl:template match="FIELD" mode="hFieldSet" >
<div class="oj-flex-item hfieldset-max-width oj-sm-margin-1x-end">
    <xsl:apply-templates select="TYPE" mode="template_fldset">
        <xsl:with-param name="l_pos" select="position()"/>
    </xsl:apply-templates>
 </div>
 </xsl:template>
<!-- End By Murali -->

<xsl:template match="FIELD/TYPE[text()='FIELDSET']" mode="template" >
    <xsl:param name="subPartNode" select="." />
    <xsl:param name="subpartCount" select="." />
    <xsl:choose>
        <xsl:when test="../HREQ = '-1'">
            <xsl:call-template name="HorizongalFieldSet" />
        </xsl:when>
        <xsl:otherwise>
            <xsl:if test="../LABEL = ''">
                <fieldset class="oj-sm-padding-2x-top" >
                 <!--   <legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>-->
                    <xsl:if test="$subpartCount > 0">
                        <xsl:variable name="curNode" select="." />
                        <xsl:for-each select="$subPartNode">
                            <xsl:variable name="flag" select="'1'"/>
                            <DIV class="oj-flex">
                                <xsl:variable name="sp" select="@ID"/>
                                <xsl:apply-templates select="$curNode/../FIELD[@SUBPARTITION = $sp]" mode="withSubPart1" >
                                    <xsl:sort select="SUBPARTITION" data-type="text" order="ascending"/>
                                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                            </DIV>
                        </xsl:for-each>
                    </xsl:if>
        
                    <xsl:if test="$subpartCount = 0">
                    <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
                        <xsl:apply-templates select="../FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                        </oj-form-layout>
                    </xsl:if>
                    
                </fieldset>
            </xsl:if>
            <xsl:if test="../LABEL != ''">
                <fieldset class="oj-sm-padding-2x-top">
                   <!-- <legend>-->
                        <xsl:call-template name="displayLabelFieldSet_tmp"/>
                   <!-- </legend>-->
                    
                    <xsl:if test="$subpartCount > 0">
                        <xsl:variable name="curNode" select="." />
                        <xsl:for-each select="$subPartNode">
                            <xsl:variable name="flag" select="'1'"/>
                            <DIV class="oj-flex">
                                <xsl:variable name="sp" select="@ID"/>
                                <xsl:apply-templates select="$curNode/../FIELD[@SUBPARTITION = $sp]" mode="withSubPart1" >
                                    <xsl:sort select="SUBPARTITION" data-type="text" order="ascending"/>
                                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                            </DIV>
                        </xsl:for-each>
                    </xsl:if>
        
                    <xsl:if test="$subpartCount = 0">
                    <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
                        <xsl:apply-templates select="../FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                        </oj-form-layout>
                    </xsl:if>
                    
                    
                </fieldset>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="FIELD" mode="withoutSubPart" >
    <div class="oj-sm-width-full">
        <xsl:if test="TYPE = 'RADIO' or TYPE = 'CHECKBOX'">
           <xsl:attribute name="role">
            <xsl:text>group</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="aria-labelledby">
             <xsl:if test="TYPE = 'RADIO'">
              <xsl:if test="./DBT != ''"> <!-- 1203 oghag fix start-->
                   <xsl:value-of select="concat('grprad_',./DBT,'__',./DBC)"></xsl:value-of>
              </xsl:if>
              <xsl:if test="./DBT = ''">
                   <xsl:value-of select="concat('grprad_',./DBC)"></xsl:value-of>
              </xsl:if>
               <!--<xsl:text>groupidcomm</xsl:text> --><!-- 1203 oghag fix end-->
            </xsl:if>
            <xsl:if test="TYPE = 'CHECKBOX'">
            <xsl:if test="./DBT != ''"> <!-- 1203 oghag fix start-->
                   <xsl:value-of select="concat('grpcheck_',./DBT,'__',./DBC)"></xsl:value-of>
              </xsl:if>
              <xsl:if test="./DBT = ''">
                   <xsl:value-of select="concat('grpcheck_',./DBC)"></xsl:value-of>
              </xsl:if>
           <!--<xsl:text>groupidfm</xsl:text>-->
           <!-- 1203 oghag fix end-->
            </xsl:if>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="dispFields_tmp" />
    </div>
</xsl:template>

<xsl:template match="FIELD" mode="withSubPart1" >
    <div class="oj-sm-width-full">
        <xsl:if test="TYPE = 'RADIO' or TYPE = 'CHECKBOX'">
            <xsl:attribute name="role">
            <xsl:text>group</xsl:text>
            </xsl:attribute>
             <xsl:attribute name="aria-labelledby">
             <xsl:if test="TYPE = 'RADIO'">
                <xsl:if test="./DBT != ''"> <!-- 1203 oghag fix start-->
                   <xsl:value-of select="concat('grprad_',./DBT,'__',./DBC)"></xsl:value-of>
              </xsl:if>
              <xsl:if test="./DBT = ''">
                   <xsl:value-of select="concat('grprad_',./DBC)"></xsl:value-of>
              </xsl:if>
               <!--<xsl:text>groupidcomm</xsl:text> --><!-- 1203 oghag fix end-->
            </xsl:if>
            <xsl:if test="TYPE = 'CHECKBOX'">
              <xsl:if test="./DBT != ''"> <!-- 1203 oghag fix start-->
                   <xsl:value-of select="concat('grpcheck_',./DBT,'__',./DBC)"></xsl:value-of>
              </xsl:if>
              <xsl:if test="./DBT = ''">
                   <xsl:value-of select="concat('grpcheck_',./DBC)"></xsl:value-of>
              </xsl:if>
           <!--<xsl:text>groupidfm</xsl:text>-->
           <!-- 1203 oghag fix end-->
            </xsl:if>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="dispFields_tmp" />
    </div>
</xsl:template>

<xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template">

        <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:choose>
                <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                    <xsl:call-template name="dispHiddenLabel_tmp"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                   <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
                </xsl:otherwise>
            </xsl:choose> 
            <xsl:choose>
                <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                    <xsl:call-template name="dispEntityField_tmp" >
                        <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispEntityField_tmp" >
                        <xsl:with-param name="EntityType" select="../TYPE"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
            </oj-label-value>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
            <td ><!--class="TBODYTDMultiple" nowrap="nowrap">-->
            <div><!-- static header change-->
               <!-- <xsl:call-template name="dispHiddenLabel_tmp"/>-->
                <xsl:choose>
                        <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="../TYPE"/>
                        </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
            </div></td><!-- static header change-->
        </xsl:if>
</xsl:template>
<!-- 13/10/08 OCX Related modification starts -->
<xsl:template match="TYPE[text()='OCX']" mode="template">
    <xsl:call-template name="dispOCX"/>
</xsl:template>
<!-- 13/10/08 OCX Related modification ends -->
<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template">

    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
	<!-- <xsl:variable name="screenname">
			    <xsl:value-of select="../../../@SCREEN"/>
			   </xsl:variable>
			    <xsl:variable name="tabID">
			    <xsl:value-of select="../../@TABPAGE"/>
			   </xsl:variable>
			    <xsl:variable name="secId">
			    <xsl:value-of select="../../@SECTION"/>
			   </xsl:variable>
			    <xsl:variable name="partId">
			    <xsl:value-of select="../../@PARTITION"/>
			   </xsl:variable>
			   <xsl:variable name="partWidth">
			   <xsl:choose>
			    <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
			     <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
				 </xsl:choose>
				 </xsl:variable> -->
        <xsl:variable name="rFldNode" select=".."/>
        <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <xsl:call-template name="dispRadioLabel_tmp"/>
         <oj-radioset slot="value" type="text" >
                 <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            
       <!-- <div class="DIVMandatory">
        <xsl:call-template name="dispSpanRadioFlag_tmp"/>
        </div>   
        <div class="DIVCheckRadio" onclick="mainWin.fnUpdateScreenSaverInterval();">--><!-- 12.0.2 ScreenSaver Changes -->			
            
			
				<!-- <xsl:attribute name="style">
					 <xsl:text>width:</xsl:text>
					<xsl:value-of select="(((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8) - ($labelWidth  + 15))"></xsl:value-of>
					<xsl:text>px</xsl:text>
				</xsl:attribute>--><!-- 12.1 screen height change end-->
			<xsl:for-each select="../OPTION[@COL=1]">
                <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                <xsl:variable name="row" select="@ROW"/>
                <xsl:if test="count(SELECTED) > 0 and SELECTED=-1">
                        <xsl:attribute name="VALUE"><xsl:value-of select="VALUE"></xsl:value-of></xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </xsl:for-each>
                <!--<xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template">-->
             <xsl:apply-templates select="../OPTION" mode="template">
                    <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/> 
                    <xsl:with-param name = "row" select = "position()"/>
					<!-- <xsl:with-param name = "partWidth" select = "$partWidth"/>-->
                </xsl:apply-templates>
            </oj-radioset>
        </oj-label-value>
    </xsl:if>
</xsl:template>

<xsl:template match="OPTION" mode="template">
    <xsl:param name = "Left_or_Right" select = "."/>
    <xsl:param name = "row" select = "."/>
	<xsl:param name="partWidth" select="."/>
   <!-- <label class="LBLChkRadSel NewRadio">--><!--HTML5 Changes-->
   <oj-option  >
	 <!--HTML5 changes 14/NOV/2016 start-->
         <!--12.1 screen height change start-->
         <!--<xsl:attribute name="style"> 
		<xsl:text>width:</xsl:text>
		<xsl:value-of select="(((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 13) - ($labelWidth  + 15))"></xsl:value-of>
		<xsl:text>px</xsl:text>
	</xsl:attribute>-->
        <!-- 12.1 screen height change end-->
        <!--HTML5 changes 14/NOV/2016 end-->
  <!--  <xsl:attribute name="FOR">
        <xsl:if test="$row != '1'">
            <xsl:if test="../DBT != ''">
                 <xsl:value-of select="concat(../DBT,'__',../DBC,$row)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../DBT = ''">
                 <xsl:value-of select="concat(../DBC,$row)"></xsl:value-of>
            </xsl:if>
        </xsl:if>
        <xsl:if test="$row = '1'">
            <xsl:if test="../DBT != ''">
                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../DBT = ''">
                 <xsl:value-of select="../DBC"></xsl:value-of>
            </xsl:if>
        </xsl:if>
		
        <xsl:if test="../DBC = ''">
                 <xsl:value-of select = "ID"/>
        </xsl:if>
		
    </xsl:attribute>
    <input type="radio"--><!--HTML5 Changes-->
    <!--<xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".."/>
    </xsl:call-template> -->
    <xsl:if test="$row != '1'">
        <xsl:attribute name="ID">
            <xsl:if test="../DBT != ''">
                <xsl:value-of select="concat(../DBT,'__',../DBC,$row)"/>
            </xsl:if>
            <xsl:if test="../DBT = ''">
                <xsl:value-of select="concat(../DBC,$row)"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
     <!--9NT1606_12_4_RETRO_12_3_26230002 starts-->
    <xsl:if test="../DBC = ''">
        <xsl:attribute name="ID">        
            <xsl:value-of select = "ID"/>
        </xsl:attribute>
    </xsl:if>
	<!--9NT1606_12_4_RETRO_12_3_26230002 ends-->
    <xsl:if test = "$Left_or_Right ='1'">
        <xsl:attribute name = "align">
          <xsl:value-of select = "'center'"/>
        </xsl:attribute>
    </xsl:if> 
    <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
    <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
    </xsl:if>    
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="LABEL"/>
    </xsl:attribute>     
    <!--</input>
    <div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
    <!--<span class="SPANRadio">--><!--HTML5 changes 14/NOV/2016-->
    <xsl:value-of select="LABEL"/>
    <!--</span>--><!--HTML5 changes 14/NOV/2016-->
    </oj-option>

</xsl:template>   

<xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template">
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
    </xsl:if>


</xsl:template>


<xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
             <xsl:call-template name="dispNormalLabel_tmp"/>
             <xsl:call-template name="dispCheckboxField_tmp"/>
         </oj-label-value>
       <!-- <label class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
       <!-- <xsl:attribute name="id">
        <xsl:if test="../DBT != ''"> 
             <xsl:value-of select="concat('grpcheck_',../DBT,'__',../DBC)"></xsl:value-of>
        </xsl:if>
        <xsl:if test="../DBT = ''">
             <xsl:value-of select="concat('grpcheck_',../DBC)"></xsl:value-of>
        </xsl:if>
        </xsl:attribute>-->
        <!-- 1203 oghag fix end-->
		<!--</label>
            <div class="DIVMandatory">
                <xsl:call-template name="dispSpanRadioFlag_tmp"/>
            </div> 
            <div class="DIVCheckRadio" onclick="mainWin.fnUpdateScreenSaverInterval();">--><!-- 12.0.2 ScreenSaver Changes -->
             <!--  <xsl:variable name="screenname">
			    <xsl:value-of select="../../../@SCREEN"/>
			   </xsl:variable>
			    <xsl:variable name="tabID">
			    <xsl:value-of select="../../@TABPAGE"/>
			   </xsl:variable>
			    <xsl:variable name="secId">
			    <xsl:value-of select="../../@SECTION"/>
			   </xsl:variable>
			    <xsl:variable name="partId">
			    <xsl:value-of select="../../@PARTITION"/>
			   </xsl:variable>
			   <xsl:variable name="partWidth">
			   <xsl:choose>
                           <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS) &gt; 0">--><!--fix for 21374053 -->
                              <!--   <xsl:variable name="subpartCount" select="count(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/SUBPARTITIONS)"/>
				 <xsl:value-of select="(number(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) div $subpartCount) -1"/>
				 </xsl:when>
			    <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/TAB/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
			     <xsl:when test="count(/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH) &gt; 0">
				 <xsl:value-of select="/FORM/SCREEN[@NAME = $screenname]/HEADER/PAGE[@NAME = $tabID]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
				 </xsl:when>
				 </xsl:choose>
				 </xsl:variable>
				 <xsl:attribute name="style">
					 <xsl:text>width:</xsl:text>
					<xsl:value-of select="(((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8) - ($labelWidth  + 15))"></xsl:value-of>
					<xsl:text>px</xsl:text>
				</xsl:attribute> --><!-- 12.1 screen height change end -->
			<!--<xsl:call-template name="dispCheckboxField_tmp"/>
            </div>-->

    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <td><!--class="TBODYTDMultiple" nowrap="nowrap">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispCheckboxField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>
    

 
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template">
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">     
    <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
        </oj-label-value>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                     
        <td ><!--class="TBODYTDMultiple" nowrap="nowrap">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>                                   
            </xsl:call-template>
        </div></td><!-- static header change-->
    </xsl:if>

</xsl:template>


<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">              
        <td class="TDnone"><div><!-- static header change-->
           <!-- <label class="LBLinv" for=""></label>-->
            <OJ-INPUT-TEXT style="display:none;">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:attribute name="value">
                            <xsl:text>{{row.data.</xsl:text>
                            <!--<xsl:value-of select="../NAME"/>-->
                            <xsl:value-of select="../DBC"/>
                            <xsl:text>}}</xsl:text>
                        </xsl:attribute>
                    </OJ-INPUT-TEXT>
        </div></td><!-- static header change-->
    </xsl:if>
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
          <!--  <label class="LBLinv" for=""></label>-->
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

<xsl:template name="RequiredFieldHandler_me">
    <xsl:param name="curr_fld" select="."/>

    <xsl:if test="$curr_fld/REQUIRED='-1'">
        <SPAN class="SPANFlag">*</SPAN>
    </xsl:if>
    <xsl:if test="$curr_fld/REQUIRED!='-1'">
        <SPAN class="SPANFlag" style="visibility:hidden;">*</SPAN>
    </xsl:if>
</xsl:template>


<xsl:template name="dispFields_tmp">
    <xsl:apply-templates select="TYPE" mode="template">
        
    </xsl:apply-templates>
</xsl:template>


<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template">
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
         <oj-label-value label-edge="start" label-width="{$labelWidth}px"><!-- 12.0.2 ScreenSaver Changes -->
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispSelectField_tmp"/>
         </oj-label-value>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <!--
        <xsl:call-template name="RequiredFieldHandler_me">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        -->
        <td ><!--class="TBODYTDMultiple" nowrap="nowrap" onclick="mainWin.fnUpdateScreenSaverInterval();">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispSelectField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>

        
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template">
<oj-label-value label-edge="start" label-width="{$labelWidth}px">
    <xsl:choose>
        <xsl:when test="contains(../NAME, 'BTN_NEXT_BLK_') or contains(../NAME, 'BTN_PREV_BLK_') or contains(../NAME, 'BTN_ADD_BLK_') or contains(../NAME, 'BTN_REMOVE_BLK_')">
        </xsl:when>
        <xsl:otherwise>
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                <td onclick="mainWin.fnUpdateScreenSaverInterval();"><!-- 12.0.2 ScreenSaver Changes -->
                <div><!-- static header change-->
                    <xsl:call-template name="dispButtonField_tmp"/>
                </div></td><!-- static header change-->
            </xsl:if>
            <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
		<!--<div class="DIVText" onclick="mainWin.fnUpdateScreenSaverInterval();"> <label class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
                 <oj-label slot="label" onclick="mainWin.fnUpdateScreenSaverInterval();"></oj-label>
    <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
    <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
    <xsl:call-template name="dispButtonField_tmp"/><!-- 12.0.2 ScreenSaver Changes -->
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>
    </oj-label-value>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
       <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
        <xsl:call-template name="dispFileField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
        <td ><!--class="TBODYTDMultiple" nowrap="nowrap">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispFileField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
      <!--  <xsl:call-template name="dispSpanFlag_tmp" />-->
        <xsl:call-template name="dispImgField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
        <td class="TBODYTDMultiple" nowrap="nowrap"><div><!-- static header change-->
            <xsl:call-template name="dispImgField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
    <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispPasswordField_tmp"/>
    </oj-label-value>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td> <!--class="TBODYTDMultiple" nowrap="nowrap">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispPasswordField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>
</xsl:template>
 
 <xsl:template match="FIELD/TYPE[text()='LINK_TYPE']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            <label class="LABELNormal" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
            <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
            <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
            <xsl:call-template name="dispLinkType_tmp"/>
            </label>            
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td class="TBODYTDMultiple" nowrap="nowrap"><div><!-- static header change-->
            <!--<xsl:call-template name="dispLinkType_tmp"/>-->
        </div></td><!-- static header change-->
    </xsl:if>    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            <!--<xsl:call-template name="dispSpanFlag_tmp" />-->
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td ><!--class="TBODYTDMultiple" nowrap="nowrap">-->
        <div><!-- static header change-->
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
        </div></td><!-- static header change-->
    </xsl:if>
</xsl:template>
 


<!-- Added By Murali for Horizontal Fieldset  -->
<xsl:template name="horizontalFieldsetPos">
    <xsl:param name="l_pos"/>
    <xsl:if test="$l_pos != 1">
        <!--<img src="{$imgPath_XSL}/spacer.gif" height="1" width="5" ALT=""/>-->
        <span style="height:1px;width:5px" class="ImgSpacer"></span><!--Data Uri Changes -->
    </xsl:if>
</xsl:template>

<xsl:template name="spacer">
    <!--<img src="{$imgPath_XSL}/spacer.gif" height="1" width="5" ALT=""/>-->
    <span style="height:1px;width:5px" class="ImgSpacer"></span><!--Data Uri Changes -->
</xsl:template>

<xsl:template name="dispNormalLabel_tmp_fldset" >
    <xsl:if test="../LABEL != ''">
    <label class="LABELNormal" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
        <xsl:attribute name="FOR">
            <xsl:if test="../DBT != ''">
                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../DBT = ''">
                 <xsl:value-of select="../DBC"></xsl:value-of>
            </xsl:if>
        </xsl:attribute>
        <xsl:value-of select="../LABEL"/>
    </label>
    </xsl:if>
</xsl:template>

<xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template_fldset">
    <xsl:param name="l_pos"/> 
   <!-- <td>-->
   <xsl:if test="$l_pos != 1 and ../LABEL != ''">   
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LABEL != ''">-->
                <xsl:choose>
                    <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                        <xsl:call-template name="dispHiddenLabel_tmp"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="dispNormalLabel_tmp"/>
                        <xsl:call-template name="dispSpanFlag_tmp" />
                    </xsl:otherwise>
                </xsl:choose> 
            <!--</xsl:if>-->
        </xsl:if>    
        <xsl:if test="count(../CALENDARTEXT) != 0">
            <!--<xsl:call-template name="dispHiddenLabel_tmp"/>-->
        </xsl:if>
       </xsl:if>
        <xsl:choose>
            <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                <xsl:call-template name="dispEntityField_tmp" >
                    <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="dispEntityField_tmp" >
                    <xsl:with-param name="EntityType" select="../TYPE"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>        
   <!-- </td>-->
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
   <!-- <td onclick="mainWin.fnUpdateScreenSaverInterval();">-->
    <xsl:call-template name="dispButtonField_tmp"/>
    <!--</td>-->
</xsl:template>        

<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <OJ-INPUT-TEXT style="display:none;">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        <xsl:attribute name="HIDDEN_TYPE">
           <xsl:text>Y</xsl:text>
        </xsl:attribute>
        </OJ-INPUT-TEXT>    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY']" mode="template_fldset">
    <xsl:param name="l_pos"/>    
    <xsl:if test="$l_pos != 1 and ../LABEL != ''">
    <xsl:if test="count(../CALENDARTEXT) = 0">
       	<oj-label slot="label" class="LBLstd">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:value-of select="../LABEL" />
            </oj-label>
    </xsl:if>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
   <!-- <td onclick="mainWin.fnUpdateScreenSaverInterval();">--><!-- 12.0.2 ScreenSaver Changes -->
       <!-- <xsl:call-template name="dispCheckboxField_tmp_fldset"/>-->
        <xsl:if test="$l_pos != 1 and ../LABEL != ''">		
          <xsl:call-template name="dispNormalLabel_tmp"/>
          </xsl:if>
         <xsl:call-template name="dispCheckboxField_tmp"/>
  <!--  </td> -->
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template_fldset">
 <xsl:param name="l_pos"/>  
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
            <xsl:if test="$l_pos != 1 and ../LABEL != ''">
                <xsl:call-template name="dispNormalLabel_tmp"/>
               <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
            </xsl:if>
        <!--</xsl:if>-->
    </xsl:if>
    
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template_fldset">
 <xsl:param name="l_pos"/>  
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
             <xsl:if test="$l_pos != 1 and ../LABEL != ''">
                <xsl:call-template name="dispNormalLabel_tmp"/>
               <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
            </xsl:if>
        <!--</xsl:if>-->
    </xsl:if>

        <xsl:call-template name="dispFileField_tmp"/>
    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
          <!--  <td>-->
                <xsl:call-template name="dispNormalLabel_tmp"/>
               <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
          <!--  </td>-->
        <!--</xsl:if>-->
    </xsl:if>
   <!-- <td>-->
        <xsl:call-template name="dispImgField_tmp"/>
  <!--  </td>-->
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template_fldset">
<xsl:param name="l_pos"/> 
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
             <xsl:if test="$l_pos != 1 and ../LABEL != ''">
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <!--<xsl:call-template name="dispSpanFlag_tmp" />-->
            </xsl:if>
        <!--</xsl:if>-->
    </xsl:if>
    
        <xsl:call-template name="dispPasswordField_tmp"/>
    
</xsl:template>    

<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template_fldset">
 <xsl:param name="l_pos"/> 
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
        <xsl:if test="$l_pos != 1 and ../LABEL != ''">
            <!--<td onclick="mainWin.fnUpdateScreenSaverInterval();">--><!-- 12.0.2 ScreenSaver Changes -->
                <xsl:call-template name="dispNormalLabel_tmp"/>
                </xsl:if>
               <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
				<xsl:call-template name="dispSelectField_tmp"/> <!--Fix For 15849112 -->
            <!--</td-->
           
        <!--</xsl:if>-->
    </xsl:if>
	<!--Fix For 15849112 -->
    <!--<td>
        <xsl:call-template name="dispSelectField_tmp"/>
    </td>-->
</xsl:template>


<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template_fldset">
 <xsl:param name="l_pos"/> 
        <xsl:variable name="rFldNode" select=".."/>
        <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
       <!--<td onclick="mainWin.fnUpdateScreenSaverInterval();">--><!-- 12.0.2 ScreenSaver Changes -->
           <!-- <label class="LABELRadioInline">
                <xsl:attribute name="FOR">
                    <xsl:if test="../DBT != ''">
                         <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../DBT = ''">
                         <xsl:value-of select="../DBC"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <xsl:for-each select="../OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                    <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template_fldset">
                        <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                    </xsl:apply-templates>
                </xsl:for-each>
            </label>
        </td> -->
         <xsl:if test="$l_pos != 1 and ../LABEL != ''">
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
</xsl:template>

<!--<xsl:template match="OPTION" mode="template_fldset">
    <xsl:param name = "Left_or_Right" select = "."/>
    <xsl:attribute name="FOR">
        <xsl:if test="../DBT != ''">
             <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
        </xsl:if>
        <xsl:if test="../DBT = ''">
             <xsl:value-of select="../DBC"></xsl:value-of>
        </xsl:if>
    </xsl:attribute>
    <input type="radio" class="INPUTRadioInline">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        <xsl:if test = "$Left_or_Right ='1'">
            <xsl:attribute name = "align">
              <xsl:value-of select = "'center'"/>
            </xsl:attribute>
        </xsl:if> 
        <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
        <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>    
        <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="LABEL"/>
        </xsl:attribute>     
    </input>
    <xsl:value-of select="LABEL"/>
</xsl:template>-->

<xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template_fldset">
<xsl:param name="l_pos"/>
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LABEL != ''">-->
          <xsl:if test="$l_pos != 1 and ../LABEL != ''">
           <!-- <td>-->
                <xsl:call-template name="dispNormalLabel_tmp"/>
               <!-- <xsl:call-template name="dispSpanFlag_tmp" />-->
          <!--  </td>-->
        <!--</xsl:if>-->
        </xsl:if>
    </xsl:if>
   <!-- <td>-->
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
  <!--  </td>-->
</xsl:template>
	   <!-- End of Tmp_GlobalInput.xsl -->
	   <!-- Start of GlobalMultiple_Template.xsl -->
           <xsl:template name="MultipleHandler_template">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="loc" select="." />
    
    <!--<xsl:variable name="partWidth" select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>-->
    <xsl:variable name="partWidth">
        <xsl:if test="$loc='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
        <xsl:if test="$loc!='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
    </xsl:variable>
        
    <xsl:variable name="halfWidth" select="$gWidth*(1 div 2)"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>
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
         <div name="dataContainer" id="dataContainer_{./ID}">
           <div class="oj-flex-bar oj-sm-align-items-center" onkeydown="return addRowShortcut('{./DBT}', event);">
                <!--Fix for 18532714 starts-->
                <xsl:if test="count(./LABEL) > 0 and ./LABEL != ''">
                    <h4 class="oj-flex-bar-start ">
                        <xsl:value-of select="./LABEL"/>
                    </h4>
                </xsl:if>
                <div class="oj-flex-bar-end">
                  <xsl:call-template name="MultipleHandler_Nav_tmp">
                  
                    <xsl:with-param name="curr_blk" select="."/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template> 
                </div>
          </div>
          <div id="{./ID}_tableContainer">
                 <oj-bind-if test="{{showTable}}">
                    <oj-table cellspacing="0"   ID="{./ID}" caption="{./LBL}" type="ME"
                              summary="{./LBL}" role="presentation" display="grid" class="oj-sm-width-full oj-sm-margin-2x-vertical">
                        <xsl:attribute name="selection-mode">
                                                    <xsl:text>{"row": "multiple"}</xsl:text>
                                            </xsl:attribute>
                        <!--<xsl:attribute name="scroll-policy-options">
                                                    <xsl:text>{"fetchSize": 10}</xsl:text>
                                            </xsl:attribute>-->
                        <xsl:attribute name="columns">
                                                    <xsl:text>{{</xsl:text>
                                                      <xsl:value-of select="./ID"/>
                                                    <xsl:text>columnArray}}</xsl:text>  
                                                     
                                            </xsl:attribute>
                        <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./ID"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                        <xsl:attribute name="DBT">
                            <xsl:value-of select="./DBT"/>
                        </xsl:attribute>
                        <xsl:attribute name="pgsize">
                            <xsl:if test="count(./PGSIZE) = 0">
                                <xsl:value-of select="15"/>
                            </xsl:if>
                            <xsl:if test="count(./PGSIZE) != 0">
                                <xsl:value-of select="./PGSIZE"/>
                            </xsl:if>
                        </xsl:attribute>
                        
                       
                        <template_tmp slot='rowTemplate' data-oj-as='row' >
                            <tr onclick="fnMulipleEntryRow_onClick(event)">
                                <xsl:for-each select="./FIELD"> 
                                     <xsl:apply-templates select="TYPE" mode="template"/>
                                </xsl:for-each>
                            </tr>
                        </template_tmp>
                        <template slot='rowTemplate' data-oj-as='row'>
                            <tr onclick="fnMulipleEntryRow_onClick(event)">
                                <xsl:for-each select="./FIELD">
                                     <xsl:apply-templates select="TYPE" mode="template"/>
                                </xsl:for-each>
                            </tr>
                        </template>
                          <oj-paging-control id="paging_{./ID}"     slot="bottom" onclick="handleOjetMEPagination(event,{./DBTs})">
                 <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./ID"/>
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
     <xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>columnArray = [];
     <xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>fieldObj= screenKo.observableArray([]); 
    
     multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>'] = {};
    <xsl:for-each select="$multipleEntryNode/FIELD">
       
             var obj = { 'headerText':  "<xsl:value-of select="LABEL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "10%",
                          maxWidth: "25%"};
        
     <xsl:if test="REQUIRED='-1'">
               var obj = { 'headerText':  "<xsl:value-of select="LABEL"/>", 'field': "<xsl:value-of select="NAME"/>" , minWidth: "10%","showRequired": true,
                          maxWidth: "25%"};
            </xsl:if>							  
             <xsl:if test="TYPE = 'HIDDEN'">
               obj = { 'headerText':  "<xsl:value-of select="LABEL"/>", 'field': "<xsl:value-of select="NAME"/>" ,'headerStyle':'display:none'};
           </xsl:if>
            <xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>columnArray.push(obj);
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] =null;
          <xsl:if test="count(VALUE) > 0 and VALUE != ''">
             multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] ='<xsl:value-of select="VALUE"/>';
          </xsl:if>
    </xsl:for-each>
    multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>']['readOnly'] = true;
    meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>'] = screenKo.observableArray([]);
    
    <xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>dataprovider=screenKo.observable( new pagingDataProviderView(new tempArrayDataProvider(meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/ID"></xsl:value-of>'])));
       
    </script>
</xsl:template>
  
<xsl:template name="MultipleHandler_template_old">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="loc" select="." />
    
    <!--<xsl:variable name="partWidth" select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>-->
    <xsl:variable name="partWidth">
        <xsl:if test="$loc='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
        <xsl:if test="$loc!='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
    </xsl:variable>
        
    <xsl:variable name="halfWidth" select="$gWidth*(1 div 2)"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>
    <xsl:variable name="multipleWidth">
    
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="string(number(HEIGHT))"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
<!--    <fieldset class="FIELDSETPlaceholder"><legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>-->
<!--    <div class="DIVMultipleSmall">  -->
    <div name="dataContainer" id="dataContainer_{ID}">
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
    
    <xsl:choose>
        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'DIVMultipleBig'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'DIVMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '66'">
            <xsl:attribute name="class">
                <xsl:value-of select="'DIVMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="class">
                <xsl:value-of select="'DIVMultipleSmall'" />
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>
	<xsl:attribute name="style"><!-- 12.1 screen height change start-->
				<xsl:text>width:</xsl:text>
				<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"></xsl:value-of>
				<xsl:text>px</xsl:text>
	</xsl:attribute><!-- 12.1 screen height change end-->
    <h2 class="hh4"><xsl:value-of select="LABEL"/></h2>
    <xsl:call-template name="MultipleHandler_Nav_tmp">
        <xsl:with-param name="curr_blk" select="."/>
        <xsl:with-param name="partWidth" select="$partWidth"/>
    </xsl:call-template>
        <div id="MEContainer">
              <div id="headerContainer">		
			  <xsl:attribute name="style"><!-- 12.1 screen height change start-->
				<xsl:text> width:</xsl:text>
				<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"/>
				<xsl:text>px</xsl:text>	
				</xsl:attribute><!-- 12.1 screen height change end-->
                    <xsl:choose>
                        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleBigInnerH DIVTblHeader'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInnerH DIVTblHeader'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '66'">
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleMediumInnerH DIVTblHeader'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVMultipleSmallInnerH DIVTblHeader'" />
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
					
                    <table border="0" cellspacing="0" cellpadding="0" ID="{ID}Header" caption="{LABEL}" class="TABLEMultiple" summary="{LABEL}Header" role="presentation" name="MEHeader">
                      <xsl:attribute name="style"><!-- 12.1 screen height change start-->
							<xsl:text> width:</xsl:text>
							<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"/>
							<xsl:text>px</xsl:text>	
						</xsl:attribute><!-- 12.1 screen height change end-->
					<xsl:attribute name="DBT">
                        <xsl:value-of select="./DBT"/>
                    </xsl:attribute>                    
                    <xsl:call-template name="MultipleHandler_Header_tmp">
                        <xsl:with-param name="curr_blk" select="."/>
                        <xsl:with-param name="mWidth" select="$multipleWidth"/>
                        <xsl:with-param name="mHeight" select="$multipleHeight"/>
                        <xsl:with-param name="partWidth" select="$partWidth"/>
                    </xsl:call-template>
                    </table>
                  </div>
                </div><!--Static header change end-->
        <div id="tableContainer" onscroll="toggleSelectBoxes(this,'{ID}Header')">
            <xsl:attribute name="style"><!-- 12.1 screen height change start-->
				<xsl:text>height:200px; overflow:scroll; width:</xsl:text>
				<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 10)"/>
				<xsl:text>px</xsl:text>	
				</xsl:attribute><!-- 12.1 screen height change end-->
			<xsl:choose>
                <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleBigInner'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMediumInner'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '66'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMediumInner'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleSmallInner'" />
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            
            <table border="0" cellspacing="0" cellpadding="0" ID="{ID}" caption="{LABEL}" class="TABLEMultiple" summary="{LABEL}" role="presentation" onkeydown="return addRowShortcut(this, event)">
		 	<xsl:attribute name="style"><!-- 12.1 screen height change start-->
				<xsl:text> width:</xsl:text>
				<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 8)"/>
				<xsl:text>px</xsl:text>	
				</xsl:attribute><!-- 12.1 screen height change end-->
		    <xsl:attribute name="DBT">
                    <xsl:value-of select="./DBT"/>
                </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
                <xsl:value-of select="./DATAPAGESIZE"/>
            </xsl:attribute>
            <xsl:apply-templates select="EVENT" mode="template"/>
            
            <xsl:call-template name="MultipleHandler_tmp">
                <xsl:with-param name="curr_blk" select="."/>
                <xsl:with-param name="mWidth" select="$multipleWidth"/>
                <xsl:with-param name="mHeight" select="$multipleHeight"/>
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
            </table>
        </div>
    </div>
<!--    </fieldset>-->
  
</xsl:template>

<!--Static header change start-->
    <xsl:template name="MultipleHandler_Header_tmp">
       <xsl:param name="curr_blk" select="."/>
        <xsl:param name="mWidth" select="."/>
        <xsl:param name="mHeight" select="."/>
        <xsl:param name="partWidth" select="."/>
       <xsl:variable name="spanCnt">
        <xsl:value-of select="count($curr_blk/FIELD)"/>
      </xsl:variable>
        <colgroup span="{$spanCnt}"></colgroup>
        <tbody>
          <tr>
            <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:attribute name="DBT">
                <xsl:value-of select="./DBT"/>
            </xsl:attribute>
            </xsl:if>        
            <td class="TBODYTDMultipleCheckbox" scope="col"><span>
            <label class="LBLChkRadSel NewChkbox" for="{$curr_blk/ID}__Checkbox_Title"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><input id="{$curr_blk/ID}__Checkbox_Title" type="checkbox" name="Checkbox_Title1" OnClick="fnToggleAllOrNoneME('{$curr_blk/ID}',this)" title="{$select_all_rows}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--Fix for 17155663--><!--HTML5 Changes -->
            </span></td>            
                <xsl:for-each select="$curr_blk/FIELD">
                    <xsl:sort select="@COL" data-type="number" order="ascending"/>
                    
                    <xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                    <td  class="TDnone"><span></span></td>
                    </xsl:if>
                    <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                       <!--Fix For Bug 17356684 Start -->
                        <td class="THEADTHMultiple"  scope="col">						
                        <!-- Added by Binson-->
                          <span  style="white-space:nowrap;">

                        <xsl:if test="./REQUIRED = 0">
                          <xsl:attribute name="class">
                          <xsl:text>stardisabled</xsl:text>
                          </xsl:attribute>
                            <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
                        <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                                <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        <xsl:if test="count(./DD) = 0">
                            <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        </xsl:if>
                        <xsl:if test="./REQUIRED = -1">
                            <!--<img src="Images/star.gif" title="{$mandatory}" ALT="{$mandatory}"/>  -->
                        <xsl:attribute name="class">
                        <xsl:text>star</xsl:text>
                        </xsl:attribute>
                        <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                                <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        <xsl:if test="count(./DD) = 0">
                            <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        
                        </xsl:if> 
						
						 </span>
                        <!-- Added by Binson - End-->
                      <!--Fix For Bug 17356684 End -->
                    </td>
                    </xsl:if>
                
                    
                </xsl:for-each>
        
        <!--<th class="THEADTHMultiple" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></th> -->
         </tr>
        </tbody>
    </xsl:template><!--Static header change end-->
  
<xsl:template name="MultipleHandler_tmp">
    <xsl:param name="curr_blk" select="."/>
    <xsl:param name="mWidth" select="."/>
    <xsl:param name="mHeight" select="."/>
    <xsl:param name="partWidth" select="."/>
    <xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')"/>

    <xsl:variable name="spanCnt">
        <xsl:value-of select="count($curr_blk/FIELD)"/>
    </xsl:variable>
    <tbody>
        <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:call-template name="detail_row_tmp">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="string('1')"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="count(./DBT) &lt;= 0">
            <xsl:call-template name="detail_row_tmp">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS"/>
            </xsl:call-template>
        </xsl:if>
    </tbody>
    <tfoot>
            <tr><td colspan="{$spanCnt}" tabindex="0"><span class="LBLinv"><xsl:value-of select = "$end_table"/></span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td></tr>
    </tfoot>
    <!-- </table> -->
</xsl:template>

<xsl:template name="detail_row_tmp">
    <xsl:param name="node_name" select="."/>
    <xsl:param name="num_rows" select="."/>
    <tr>
        <td scope="row" class="TBODYTDMultipleFirst"><div><!-- static header change-->
			 <!--Fix for 28670862 Starts-->
            <label class="LBLChkRadSel NewChkbox" for="chkDeleteRow">
            <xsl:attribute name="for">
                <xsl:value-of select="concat('chkDeleteRow__',$node_name/ID)"></xsl:value-of>
            </xsl:attribute>
            <span class="LBLinv"><xsl:value-of select="$select_row"/></span>
            <input name="chkDeleteRow" type="checkbox" id="chkDeleteRow" title="{$select_row}">
            <xsl:attribute name="id">
                <xsl:value-of select="concat('chkDeleteRow__',$node_name/ID)"></xsl:value-of>
            </xsl:attribute>
             </input>
            <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--HTML5 Changes-->
             <!--Fix for 28670862 Ends-->			
        </div></td><!-- static header change-->
        
        
        
        <xsl:for-each select="$node_name/FIELD">
            <xsl:sort select="@COL" data-type="number" order="ascending"/>
            <xsl:apply-templates select="TYPE" mode="template"/>
        </xsl:for-each>
        <!-- <th class="TBODYTDMultipleLast" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></th> -->
    </tr>
</xsl:template>
<!--
<xsl:template match="EVENT" mode="template">
    <xsl:attribute name="{./NAME}" >
      <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
-->
<xsl:template name="MultipleHandler_Nav_tmp" >
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
    <!-- <table width="100%" border="0" cellpadding="0" cellspacing="0" ID="{$curr_blk/ID}"> -->
    <!--
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
    <xsl:choose>
        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleBig'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '66'">
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleSmall'" />
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>
    -->
        <div > <!--class="HeaderMultiple">-->
		<!--<xsl:attribute name="style">--><!-- 12.1 screen height change start-->
				<!--<xsl:text>width:</xsl:text>
				<xsl:value-of select="((number($partWidth) div 100) * $screenWidth) - ((18 * (number($partWidth) div 100) )+ 12)"/>
				<xsl:text>px</xsl:text>
		</xsl:attribute>--><!-- 12.1 screen height change end-->
        <!--<caption class="HeaderMultiple" >-->
          <!--  <span class="Fleft">
           
            <xsl:if test="$paginationReq = 'Y'">
                <button class="BTNtext" title="First" name="nFirst__{$curr_blk/ID}" id="nFirst__{$curr_blk/ID}" tabindex="-1" onclick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','FIRST', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn" >
                    <xsl:value-of select="$first_SummaryAudit"/>
                </button>
                <button class="BTNtext" title="Previous" name="nPrev__{$curr_blk/ID}" id="nPrev__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','PREV', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                        <xsl:value-of select="$previous_SummaryAudit"/>
                </button>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <span id= "CurrPage__{$curr_blk/ID}" name="CurrPage__{$curr_blk/ID}" class="SPNtext"><label class="LABELSummaryHead" for="CurrPage__{$curr_blk/ID}">1</label></span> 
                <span id= "PageSize__{$curr_blk/ID}" name="PageSize__{$curr_blk/ID}" class="SPNtext" value = "15"></span>
                <label class="LABELSummaryHead" for="TotPage__{$curr_blk/ID}">
                   <xsl:value-of select="$of_SummaryAudit"/>
                </label>
                <span id ="TotPage__{$curr_blk/ID}" name="TotPage__{$curr_blk/ID}" class="SPNtext"><label class="LABELSummaryHead" for="TotPage__{$curr_blk/ID}">1</label></span>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <button class="BTNtext" title="Next" name="nNext__{$curr_blk/ID}" id="nNext__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','NEXT', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                       <xsl:value-of select="$next_SummaryAudit"/>
                </button>
                <button class="BTNtext" title="Last" name="nLast__{$curr_blk/ID}" id="nLast__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','LAST', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                        <xsl:value-of select="$last_SummaryAudit"/>
                </button>
                
               
                <span style="height:1px;width:10px" class="ImgSpacer"></span>
                <label class="LABELSummaryHead" for="GoTo__{$curr_blk/ID}"></label>
                <input id="GoTo__{$curr_blk/ID}" type="number" size="1" class="TEXTSummaryHeader" name = "gotopage" value="1"/>
                <button class="BUTTONMultiple" title="{$gotoPage_SummaryAudit}" name="GoTo__{$curr_blk/ID}" id="GoTo__{$curr_blk/ID}" 
                onClick="goToPage('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" 
                onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" 
                type="navBtn" value="{$gotoPage_SummaryAudit}">
                        
                        <xsl:value-of select="$gotoPage_SummaryAudit"/>
                </button>
                
                
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </xsl:if>
            
               
                <xsl:if test="./REQUIRED = 0">
                  
                    <SPAN class="stardisabled"></SPAN>
                </xsl:if>
                <xsl:if test="./REQUIRED = -1">
                   
                    <SPAN class="star" title="{$mandatory}"></SPAN>
                </xsl:if>                        
              
            </span>-->
            <!-- Added for pagination of multiple entry block - ends -->
            <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
               <oj-button slot="end" display="icons" chroming="borderless"   name="cmdAddRow_{$curr_blk/ID}" id="cmdAddRow_{$curr_blk/ID}" tabindex="-1" onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')" title="{$add_row}" >
              <!--  <button class="BUTTONInline" name="cmdAddRow_{$curr_blk/ID}" id="cmdAddRow_{$curr_blk/ID}" tabindex="-1" onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$add_row}">-->
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNAddrow.gif" id="imgAdd_{$curr_blk/ID}" alt="{$add_row}"/>-->
                  <!--  <SPAN class="IMGInline ImgAddRow" id="imgAdd_{$curr_blk/ID}" title="{$add_row}"></SPAN>--><!-- Data Uri Changes -->
                    <span slot='startIcon' class="oj-ux-ico-plus">
                    <span class="LBLinv">
                            <xsl:value-of select="$add_row"/>
                        </span>
                        </span>
               </oj-button>
               <oj-button slot="end"  display="icons" chroming="borderless"   name="cmdDelRow_{$curr_blk/ID}" id="cmdDelRow_{$curr_blk/ID}" tabindex="-1" onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')"  title="{$delete_row}" >
               <!-- <button class="BUTTONInline"  name="cmdDelRow_{$curr_blk/ID}" id="cmdDelRow_{$curr_blk/ID}" tabindex="-1" onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$delete_row}">-->
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNRemoveRow.gif" id="imgAdd_{$curr_blk/ID}" alt="{$delete_row}"/>-->
                  <!--  <SPAN class="IMGInline ImgDelRow" id="imgAdd_{$curr_blk/ID}" title="{$delete_row}"></SPAN>-->
                    <span slot='startIcon' class="oj-ux-ico-minus"><!-- Data Uri Changes -->
                    <span class="LBLinv">
                            <xsl:value-of select="$delete_row"/>
                        </span>
                        </span>
                </oj-button>
            </xsl:if>
            <oj-button  slot="end"  display="icons" chroming="borderless"   name="BTN_SINGLE_VIEW_{$curr_blk/ID}" id="BTN_SINGLE_VIEW_{$curr_blk/ID}" tabindex="-1" onClick="fnShowSingleViewForME('{$curr_blk/ID}')" title="{$single_rec_view}" >
          <!--  <button class="BUTTONInline" name="BTN_SINGLE_VIEW_{$curr_blk/ID}" id="BTN_SINGLE_VIEW_{$curr_blk/ID}" tabindex="-1" onClick="fnShowSingleViewForME('{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$single_rec_view}">-->
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNViewRow.gif" id="imgView_{$curr_blk/ID}" alt="{$single_rec_view}"/>-->
                 <span slot='startIcon' class="oj-ux-ico-list">
                    <span class="LBLinv">
                        <xsl:value-of select="$single_rec_view"/>
                    </span>
                </span>
            </oj-button>
        <!--</caption>-->
        </div>
    
    <!-- </table> -->
</xsl:template>
	   <!-- End of GlobalMultiple_Template.xsl -->
	   <!-- Start of GlobalTemplateTabs.xsl -->
   <xsl:template name="DisplayTemplateTabs">
        <!--<div class="DIVThreeColSectionContainer">-->
          <!--  <div class="DIVThreeColSectionContainer">-->
            <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
            <!--<xsl:if test="$l_scr_type != 'large'">
                <xsl:attribute name="class">
                  <xsl:value-of select="'TwoColSectionContainer'"/>
                    
                </xsl:attribute>
            </xsl:if>-->
            <div class="oj-sm-width-full oj-flex-item">
          <!--  <div class="DIVColumnTripple">
			<xsl:attribute name="style">
		 			<xsl:text>width:</xsl:text>
					<xsl:value-of select="$screenWidth - 4"></xsl:value-of>
					<xsl:text>px</xsl:text>
				</xsl:attribute>
                <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVColumnDouble'"/>
                    </xsl:attribute>
					<xsl:attribute name="style">
		 			<xsl:text>width:</xsl:text>
					<xsl:value-of select="$screenWidth - 4"></xsl:value-of>
					<xsl:text>px</xsl:text>
				</xsl:attribute>
                </xsl:if>-->

                <div id="SYS_TBL_TABS" >
				<!--<xsl:attribute name="style">
		 			<xsl:text>width:</xsl:text>
					<xsl:value-of select="$screenWidth "></xsl:value-of>
					<xsl:text>px</xsl:text>
				</xsl:attribute>-->
                                <oj-conveyor-belt class="convyorBeltContainer oj-sm-padding-4x-start oj-flex-item oj-sm-12" arrow-visibility="visible" data-oj-binding-provider="none">
                                <oj-navigation-list drill-mode="none" selection="" edge="top">
                    <ul id="tablist">
                        <!-- TODO: ? Infra added mode=template in xsl tag -->
                        <xsl:apply-templates select="TAB/PAGE[@ID != 'All']" mode="template"/>
                    </ul>
                    </oj-navigation-list>
                    </oj-conveyor-belt>
            </div>
        </div>
   </xsl:template>

<!-- TODO: ? Infra added mode in xsl tag -->       
<xsl:template match="TAB/PAGE" mode="template">
    <li >

        <!-- <a href="#" onclick="changeTabPage(this)" onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}"> -->
            <xsl:variable name="tpage">
                <xsl:value-of select="concat('TBLPage', @ID)" />
            </xsl:variable>
            <a href="#" class="oj-sm-margin-2x-start"  onkeydown="return handleTabKeys(this,event)" >
            <xsl:variable name="sc" >
                <xsl:text>'</xsl:text>
            </xsl:variable>
            <xsl:attribute name="id">
                <xsl:value-of select="@ID"/>
            </xsl:attribute>
            <xsl:attribute name="onClick">
                <!-- My Output : return expandcontent('TABPageCVS_BASIC', this) -->
                <!-- <xsl:value-of select="concat('return expandcontent('&quot;'&quot;$tpage&quot;'&quot;', this)')" /> -->
                <xsl:value-of select="concat('return expandcontent(', $sc, $tpage, $sc, ', this)')" />
                
                
            </xsl:attribute>
           <!-- <span>-->
            <xsl:if test="count(LABEL) &gt; 0">
                <xsl:call-template name="dispLabelCaption_tmp">
                    <xsl:with-param name="curr_fld" select="."/>
                </xsl:call-template>
            </xsl:if>
           <!-- </span>-->
        </a>
        

    </li>

</xsl:template>
	   <!-- End of GlobalTemplateTabs.xsl -->
	   <!-- Start of Tmp_GlobalAudit.xsl -->
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <!--<xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> -->
       
    <xsl:template name="Audit_tmp">
        <xsl:variable name="auditId" select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>

     <!--   <xsl:if test = "$Brn_Neo = ''">
            <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                <xsl:call-template name = "showCallFormButtons_tmp"></xsl:call-template>
            </xsl:if>
        </xsl:if>-->
        
        <div ID="TBLPage{@ID}" >
        <oj-popup id="auditPop" class="oj-sm-width-full oj-sm-margin-1x demo-popup" auto-dismiss="none" modality="modal"
                     position.my.horizontal="left" position.my.vertical="bottom"
                      position.at.horizontal="left" position.at.vertical="bottom"
                      position.of="window" tail="none">
                <div class="demo-popup-body">
                       <div class="demo-popup-header oj-flex oj-sm-justify-content-flex-end">
                    <oj-button id="BTN_AUDIT_CLOSE" class="oj-button-sm" display="icons" 
                               on-oj-action="[[cancelListener.bind('', event)]]">
                            <span slot='startIcon' class="oj-ux-ico-close"></span>
                        </oj-button>
                    </div>
                    <div class="demo-popup-content oj-sm-padding-2x" id="DIV_{$auditId}">
            <!--            <xsl:apply-templates select="SECTION" mode="footer"/>
                    </div>
                </div>
            </oj-popup>
        </div>-->
        
       <!-- <div class="DIVAudit" id="DIV_{$auditId}">-->
            <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($gBlkButCount &gt; 0 or $gBlkButImgCount &gt; 0)">
                <xsl:attribute name="id"><xsl:text>DIV_AUDIT_BUTTONS</xsl:text></xsl:attribute>                        
            </xsl:if>
            
            <!--<table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0" DBT="{/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DBT}" summary="Audit information">-->
           <!-- <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="99%" >    -->                    
                <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                    <xsl:if test = "$Brn_Neo = ''"> 
                        <xsl:variable name = "AuditType">
                            <xsl:value-of select = "/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE"/>
                        </xsl:variable>
                                          
                        <xsl:if test = "($AuditType = 'M' and ($typeString != 'T' and $typeString != 'P'))">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_tmp"/>
                        </xsl:if>                           
                        <xsl:if test = "($AuditType = 'T' and ($typeString != 'T' and $typeString != 'P'))">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_Online_tmp"/> 
                        </xsl:if>                           
                                                                             
                    </xsl:if>
                </xsl:if>
                <xsl:if test="($typeString = 'T' or $typeString = 'P' )"> 
                    <xsl:if test=" (  $isChildFunc='N' )">
                        <!-- Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 Start -->
			<!--<td CLASS="THEADAudit" style="width:95%">-->
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_Online_tmp_bpel"/>                                                
                            <!-- Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 End -->	
                            <xsl:call-template name="AuditEntry_Neo_Process_tmp"/>
			<!--</td>       Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0  -->                                                                                           
                    </xsl:if>
                   <!-- <xsl:if test="($isChildFunc!='N' )">
                        <xsl:call-template name="StdBtnEntry_tmp"/> 
                    </xsl:if>-->
                </xsl:if>
                <xsl:if test="(count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($typeString != 'T' and $typeString != 'P'))">
                    <xsl:call-template name="Without_AuditEntry_tmp"/>
                </xsl:if>
                                
              <!--  <xsl:if test = "$Brn_Neo != ''"> 
                    <xsl:call-template name="StdBtnEntry_tmp"/> 
                </xsl:if>-->
            <!--</table>   -->                     
                </div>
                </div>
            </oj-popup>
        </div>        <xsl:if test = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE = 'T'">
            <xsl:call-template name = "CacheAuditValues_tmp"/>
        </xsl:if>
    </xsl:template>
    
    
       <xsl:template name="CallButton_tmp">
       <!-- Sudipta -->
        <div class="DIVfooter" id="DIVFooter">
        <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
      <!--  <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/>
         <xsl:if test = "$Brn_Neo = ''">
            <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">-->
                <xsl:call-template name = "showCallFormButtons_tmp"></xsl:call-template>
           <!-- </xsl:if>
        </xsl:if>-->
        </div>
       </xsl:template>
    <xsl:template name = "showCallFormButtons_tmp">
        <xsl:variable name="noOfRows">
            <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
                <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
                    <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
                </xsl:if>
                <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
                    <xsl:value-of select="1"/>
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
                <xsl:value-of select="1"/>
            </xsl:if>
        </xsl:variable>

        <xsl:variable name="noOfButtons" select="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM)"/>
        <xsl:variable name="buttonsPerRow" select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTONS_PER_ROW"/>
        
     <!--   <div class="subSystemContainer DIVSubSystem"> 
        <div class="DIVSubSystem" id="DIVSubSystem" style="width:98%">
            
            <ul-->
            <div>
            <div class="oj-flex-bar oj-sm-align-items-center">
               <!-- <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) > 0">-->
                <oj-conveyor-belt id="subSystemConveyorBelt" class="convyorBeltContainer oj-sm-padding-4x-start oj-md-9 oj-sm-12 oj-flex-bar-start" arrow-visibility="visible" data-oj-binding-provider="none">
                
                <xsl:for-each select = "//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM">    
                
                    <xsl:variable name = "fnc" select = "FUNCTION"></xsl:variable>
                    <xsl:variable name = "lbl" select = "LABEL"></xsl:variable>
                  <!--  <span><li id="{@id}">
                        <a href="#" onclick = "{$fnc}" class="BUTTONSubSystem" onkeydown="return fnhandleSubScrBtn(event)"><span><xsl:value-of select = "$lbl" /></span></a>
                       
                       -->
                          <oj-button class="conveyorBeltItem oj-sm-margin-1x" id="{@id}" onclick="{$fnc}">
                                <span onkeydown="return fnhandleSubScrBtn(event)"  >
                         <!--<xsl:choose>
                          <xsl:when test="position() != last()">
                            <a class="BUTTONSubSystem">|</a>ix for 21627033-->
                         <!-- </xsl:when>
                        </xsl:choose>
                    </li>-->
                    <xsl:value-of select="$lbl"/>
                    </span>
                    </oj-button>
                </xsl:for-each>  
            <!--</ul>
-->
 </oj-conveyor-belt>
              <!--  </xsl:if>-->
                <div class="footer-btn-container oj-flex-bar-end">
                   
                 <!--   <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN = 'Y' and count(/FORM/SCREEN[@NAME = $screen]/FOOTER/TAB/SECTION) > 0">-->
                 <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                        <oj-button id="BTN_AUDIT" class=" oj-sm-margin-1x" chroming="solid" on-oj-action='[[displayAuditSection]]' label="{$audit}">
                            <!--<xsl:value-of select="$audit"/>-->
                    </oj-button>
                </xsl:if>
                     <xsl:call-template name="StdBtnEntry_tmp"/>
                </div></div>
       <!-- <div  id="DIVSubSystemController" style="width:2%;">
              <button class="BTNicon" title="$expand_section" id="BtnSubSysNav" onclick="fnExpandCollapseSubSys(this);" onkeydown="return fnhandleSubScrBtn(event)"><span class="subSystemExpand"></span></button> -Fix for 21611806-->
      <!--  </div>-->
        </div>
    </xsl:template>


    <xsl:template match="BLOCK" mode="AuditEntry_Neo_tmp">
   <!-- <div class="demo-popup-content oj-sm-padding-2x">-->
     <fieldset class="oj-sm-padding-2x-top"> 
    <oj-form-layout label-edge="start" user-assistance-density="compact">
               <!-- <div class="demo-popup-content oj-sm-padding-2x">-->
       <!-- <tr>            
            <td width="98%" valign="top">-->
               <!-- <fieldset class="oj-sm-padding-2x-top">--> <!--class="FSTcell">-->
                   <!-- <legend>Untitled group</legend>-->
                   <div class="oj-flex oj-sm-width-full">
                    <div class="oj-sm-width-1/4 oj-flex-item ">
                    <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                        <oj-label slot="label">
                            <xsl:value-of select="$makerId" />
                       <!-- <label for="{DBT}__MAKER_ID" class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
                           <!-- <xsl:value-of select="$makerId" />
			</label>-->
                        </oj-label>
                        <oj-input-text slot="value" type="TEXT" name="MAKER_ID" id="{DBT}__MAKER_ID" tabindex="-1" dbt="{DBT}" dbc="MAKER_ID" readonly="readonly">
			<!--<input type="TEXT" class="TEXTAudit1" name="MAKER_ID" id="{DBT}__MAKER_ID" tabindex="-1" dbt="{DBT}" dbc="MAKER_ID" readonly="readonly" maxlength="12" size="12"/>-->
                   <!-- </div>-->
                   </oj-input-text>

                        </oj-label-value>
                    <!--<div class="DIVText">-->
                        <!--<label for="{DBT}__MAKER_DT_STAMP" class="LABELNormal">-->
                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                        <oj-label slot="label">
						<!--<label for="MAKER_DT_STAMPI" class="LABELNormal" style="width:{$labelWidth}px;">--><!-- fix for 17048174 --><!-- 12.1 screen height change -->
                            <xsl:value-of select="$DtStamp" />
			</oj-label>
			<!--<INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>-->
			<!--<input type="TEXT" class="TEXTAudit1" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" tabindex="-1" readonly="readonly" maxlength="19" size="22"/>-->
                  <!-- <oj-input-text slot="value" type="TEXT" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" tabindex="-1" readonly="readonly" >-->
                    <oj-input-date-time slot="value"  name ="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" readonly="true" day-formatter="[[dayFormatter]]">
                  <!-- </oj-input-text>-->
                  </oj-input-date-time>
                   </oj-label-value>    
                    </div>
		<!--</fieldset>-->
		<!--<fieldset class="oj-sm-padding-2x-top">--><!--class="FSTcell">-->
                   <!-- <legend>Untitled group</legend>-->
                    <div class="oj-sm-width-1/4 oj-flex-item ">
                    <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                        <oj-label slot="label">
                        <!--<label for="{DBT}__CHECKER_ID" class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
                            <xsl:value-of select="$checkerId" />
			<!--</label>-->
                        </oj-label>
                        <oj-input-text slot="value" type="TEXT" name="CHECKER_ID" id="{DBT}__CHECKER_ID" tabindex="-1" dbt="{DBT}" dbc="CHECKER_ID" readonly="readonly">
			<!--<input type="TEXT" class="TEXTAudit1" name="CHECKER_ID" id="{DBT}__CHECKER_ID" tabindex="-1" dbt="{DBT}" dbc="CHECKER_ID" readonly="readonly" maxlength="12" size="12"/>-->
                  <!--  </div>-->
                  </oj-input-text>
                  </oj-label-value>
                    <!--<div class="DIVText">-->
                        <!--<label for="CHECKER_DT_STAMPI" class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
                            <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                            <oj-label slot="label">
                            <xsl:value-of select="$DtStamp" />
                            </oj-label>
			<!--</label>-->
			<!--<input TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>-->
			<!--<input type="TEXT" class="TEXTAudit1" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" tabindex="-1" readonly="readonly" maxlength="19" size="22"/>-->
                  <!-- <oj-input-text slot="value" type="TEXT" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" tabindex="-1" readonly="readonly">-->
                    <oj-input-date-time slot="value"  name ="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" readonly="true" day-formatter="[[dayFormatter]]">
                    </oj-input-date-time>
                   <!-- </oj-input-text>-->
                    </oj-label-value>
                    </div>
		<!--</fieldset>-->
		<!--<fieldset class="oj-sm-padding-2x-top">--><!--class="FSTcell">-->
                   <!-- <legend>Untitled group</legend>-->
                    
                    <div class="oj-sm-width-1/4 oj-flex-item ">
                        <!--<label for="{DBT}__MOD_NO" class="LABELNormal" style="width:{$labelWidth}px;">--><!-- 12.1 screen height change -->
                            <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                            <oj-label slot="label">
                            <xsl:value-of select="$modNo" />
                            </oj-label>
			<!--</label>-->
                        <oj-input-text slot="value" type="TEXT" name="MOD_NO" id="{DBT}__MOD_NO" tabindex="-1" dbt="{DBT}" dbc="MOD_NO" readonly="readonly">
                        </oj-input-text>
                        </oj-label-value>
			<!--<input type="TEXT" class="TEXTAudit1 numeric" name="MOD_NO" id="{DBT}__MOD_NO" tabindex="-1" dbt="{DBT}" dbc="MOD_NO" readonly="readonly" maxlength="4" size="3"/>-->
                   </div>
		<!--</fieldset>-->
		<!--<fieldset class="oj-sm-padding-2x-top">--><!--class="FSTcell">-->
                  <!--  <legend>Untitled group</legend>-->
                  <div>
                  <oj-input-text style="display:none;"   name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/>
                  </div>
                  
                    <div class="oj-sm-width-1/4 oj-flex-item ">
						<!--HTML5 Changes Start-->
                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                            <oj-label slot="label">
                                <xsl:value-of select="$authStat" />
                            </oj-label>
                              <oj-switch slot="value"  disabled="true" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" onclick="fnWhenAuditChange()">
                            </oj-switch>
                    </oj-label-value>
                       <!-- <label class="LBLChkRadSel NewChkbox" for="{DBT}__AUTH_STAT" >
                            <input type="checkbox" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                            <div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016-->
                           <!-- <xsl:value-of select="$authStat" />
                        </label>-->
			<!--<oj-input-text style="display:none;"   name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/>-->
                  <!--  </div>
                    <div class="DIVText">-->
                    <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                            <oj-label slot="label">
                                <xsl:value-of select="$recStat" />
                            </oj-label>
                             <oj-switch slot="value"  disabled="true" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" onclick="fnWhenAuditChange()">
                            </oj-switch>
                            </oj-label-value>
                        <!--<label class="LBLChkRadSel NewChkbox" for="{DBT}__RECORD_STAT">
                            <input TYPE="CHECKBOX" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                            <div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016-->
                           <!-- <xsl:value-of select="$recStat" />-->
                       <!-- </label>-->
						<!--HTML5 Changes End-->
                   </div>	<!--</fieldset>-->
           <!-- </td>-->
            <!--<td class="TDbtnfooter">-->
                <input Type="reset" value="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/><!-- Fix for 17155663 -->
		<xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                  <!--  <xsl:call-template name="dispStdButtonField_img_tmp"/>-->
		</xsl:for-each>
           <!-- </td>-->
	<!--</tr> -->
        </div>
        </oj-form-layout>
        </fieldset>
      <!--  </div>-->
    </xsl:template>       
       <!-- Added By Fahad as part of Process Screens -->
       
       <!-- Added By Fahad as part of Process Screens -->
       
    <xsl:template name="AuditEntry_Neo_Process_tmp">
     <oj-form-layout label-edge="start" user-assistance-density="compact">
                <div class="oj-flex oj-sm-width-full">
        <td CLASS="THEADAudit" style="width:95%">
            <TABLE CLASS="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                <TR CLASS="TRAudit">
                    <TD CLASS="TDAudit" style="vertical-align:top" >
                        <NOBR>
                            <LABEL CLASS="LABELAudit" style="margin-top:0px;"><xsl:value-of select="$remarks" /></LABEL>
                        </NOBR>                        
                    </TD>
                    <TD CLASS="fieldAudit">
                        <NOBR>
                            <TEXTAREA CLASS="TEXTAREASmall" name="AUDIT_FIELD" ROWS="2" COLS="35" id="AUDIT_FIELD" READONLY="false"/>
                        </NOBR>
                    </TD>
                    <TD CLASS="TDAudit" style="vertical-align:top" >
                        <NOBR>
                            <LABEL CLASS="LABELAudit" style="margin-top:0px;"><xsl:value-of select="$priority" /></LABEL>
                        </NOBR>                        
                    </TD>
                    <TD CLASS="fieldAudit" >
                        <NOBR>
                            <SELECT CLASS="SELECTList" ID="DROP_PRIORITYLIST" STYLE="width:70px;">
                                <OPTION CLASS="SELECTListOption" VALUE="0" DEFAULT="0"></OPTION>
				<OPTION CLASS="SELECTListOption" VALUE="1"><xsl:value-of select="$normal" /></OPTION>
                                <OPTION CLASS="SELECTListOption" VALUE="2"><xsl:value-of select="$high" /></OPTION>
                            </SELECT>
                        </NOBR>
                    </TD>
                    <TD CLASS="TDAudit" STYLE="display: none;">
                        <NOBR>
                            <BUTTON CLASS="INPUTButton" ID="BTN_GETPRIORITY" NAME="BTN_GETPRIORITY" STYLE="width:85px;" onclick="fnShowGetPriority()" title="$getPriority"><xsl:value-of select="$getPriority" /></BUTTON><!--Fix for 17235409-->
                        </NOBR>
                    </TD>
                               
                    <TD CLASS="TDAudit">
                        <NOBR>
                            <BUTTON CLASS="INPUTButton" ID="BTN_ERRSCR" NAME="BTN_ERRSCR" STYLE="width:70px;" onclick="fnShowErrorScreen()" title="$showErr"><xsl:value-of select="$showErr" /></BUTTON><!--Fix for 17235409-->
                        </NOBR>
                    </TD>                                  
                    <TD CLASS="TDAudit">
                        <NOBR>
                            <BUTTON CLASS="INPUTButton" ID="BTN_AUDIT" NAME="BTN_AUDIT" onclick="fnBpelAudit()" title="$audit"><xsl:value-of select="$audit" /></BUTTON><!--Fix for 17235409-->
                        </NOBR>
                    </TD>                               
                               
                    <TD CLASS="fieldAudit">
                        <NOBR>    
                            <SELECT CLASS="SELECTList" ID="PROCESS_ACTIONS" STYLE="width:200px;">
                                <OPTION CLASS="SELECTListOption" VALUE="ACCEPT"><xsl:value-of select="$accept" /></OPTION>                                                    
                            </SELECT>                                                
                        </NOBR>
                    </TD>
                    <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                     <!--   <td class="TDAuditButton" rowspan="2" valign="middle">
                            <xsl:call-template name="dispStdButtonField_img_tmp"/>
                        </td>-->
                    </xsl:for-each>
                </TR>
            </TABLE>
        </td>
        </div>
                </oj-form-layout>
    </xsl:template>


    <xsl:template name="StdBtnEntry_tmp">
      <!--  <table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tr>
                <td class="TDAuditButton" width="90%" rowspan="2" valign="middle"></td>-->
                <xsl:if test="$gBlkButCount &gt; 0">
                 <!--   <TD class="TableTdAuditMain" align="right">-->
                    <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']" mode="BlockStdButtons_tmp"/>
                 <!--   </TD>-->
                </xsl:if>
                <xsl:if test="$gBlkButImgCount &gt; 0">
                   <!-- <TD class="TableTdAuditMain" align="right">-->
                        <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']" mode="BlockStdButtonsImg_tmp"/>
                   <!-- </TD>-->
                </xsl:if>
          <!--  </tr>-->
       <!-- </table>-->
    </xsl:template>

    <xsl:template match="BLOCK" mode="BlockStdButtonsImg_tmp">
       <!-- <TD>-->
            <input Type="reset" value="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/><!-- Fix for 17155663 -->
      <!--  </TD>-->
        <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
           <!-- <TD CLASS="TDstdButtonImg" align="right">-->
                <xsl:call-template name="dispStdButtonField_img_tmp"/>
           <!-- </TD>-->
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="dispStdButtonField_img_tmp">   
        <xsl:if test="normalize-space(../NAME) = 'BTN_EXIT'">
          <!--  <input type="button" class="BUTTONExit" onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BUTTONExitHover'" onblur="this.className='BUTTONExit'" onfocus="this.className='BUTTONExitHover'" onmouseout="this.className='BUTTONExit'">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:attribute name="ID">
                    <xsl:value-of select="concat(../NAME,'_IMG')"/>
                </xsl:attribute>
                <xsl:attribute name="VALUE">
                    <xsl:value-of select="$exit"/>
                </xsl:attribute>
            </input> -->
            <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT_IMG" name="BTN_EXIT"  label="{$exit}">
           <xsl:attribute name="onclick">
          <xsl:text>fnExit(event)</xsl:text>
          </xsl:attribute>
               </oj-button>
        </xsl:if>
        
        <xsl:if test="normalize-space(../NAME) = 'BTN_OK'"> 
          <!--  <input type="button" class="BUTTONOk" >
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:attribute name="ID">
                    <xsl:value-of select="concat(../NAME,'_IMG')"/>
                </xsl:attribute>
                <xsl:attribute name="VALUE">
                    <xsl:value-of select="$ok"/>
                </xsl:attribute>
            </input>-->
           <oj-button class="action-button-primary oj-sm-margin-1x" chroming="solid" name="BTN_OK" ID="BTN_OK_IMG" label="{$ok}">
            
              <xsl:attribute name="onclick">
                    <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
                </xsl:attribute>
            
            <!--<xsl:value-of select="$ok"/>-->
       </oj-button>
        </xsl:if>        
    </xsl:template>


    <xsl:template name="Without_AuditEntry_tmp">        
        <tr>
            <td class="THEADAudit" style="width:95%">
                <table class="TABLEAudit" role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                    <tr>            
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><input value="" Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>
                        <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                       <!--    <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                <xsl:call-template name="dispStdButtonField_img_tmp"/>
                            </td> -->
                        </xsl:for-each>
                    </tr>
                    <tr>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                    </tr>
                </table>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
        
        <fieldset class="oj-sm-padding-2x-top"> 
            <oj-form-layout label-edge="start" user-assistance-density="compact">
           <!-- <tr><td width="98%" valign="top">
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
                        <div class="oj-flex oj-sm-width-full">
                                <div class="oj-sm-width-1/4 oj-flex-item ">
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                            <oj-label slot="label">
                                                <xsl:value-of select="$makerId"/>
                                            </oj-label>
                                            <oj-input-text slot="value" type="TEXT" name="MAKERID" id="{DBT}__MAKERID" tabindex="-1" DBT="{DBT}" DBC="MAKERID" readonly="readonly">
                                            </oj-input-text>
						<!--<label class="LABELNormal" for="{DBT}__MAKERID" style="width:{$labelWidth}px;"><xsl:value-of select="$makerId"/></label>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERID" id="{DBT}__MAKERID" tabindex="-1" DBT="{DBT}" DBC="MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
                                        </oj-label-value>
					<!--</div>
					<div class="DIVText">-->
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                            <oj-label slot="label">
                                                <xsl:value-of select="$DtStamp"/>
                                            </oj-label>
                                            <oj-input-date-time slot="value"  id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" name="MAKERSTAMPI" readonly="true" tabindex="-1" day-formatter="[[dayFormatter]]">
						<!--<LABEL CLASS="LABELNormal" for="MAKERSTAMPI" style="width:{$labelWidth}px;"><xsl:value-of select="$DtStamp"/></LABEL>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERSTAMPI" id="MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>-->
					</oj-input-date-time>
                                        </oj-label-value>
                                        </div>
				<!--</fieldset>-->
				<!--<fieldset class="FSTcell">-->
                                <div class="oj-sm-width-1/4 oj-flex-item ">
					<!--<legend>Untitled group</legend>-->
					<!--<div class="DIVText">-->
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                                            <oj-label slot="label">
                                             <xsl:value-of select="$checkerId"/>
                                            </oj-label>
                                            <oj-input-text slot="value" type="TEXT" name="CHECKERID" id="{DBT}__CHECKERID" tabindex="-1" DBT="{DBT}" DBC="CHECKERID" READONLY="true">
						<!--<label class="LABELNormal" for="{DBT}__CHECKERID" style="width:{$labelWidth}px;"><xsl:value-of select="$checkerId"/></label>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERID" id="{DBT}__CHECKERID" tabindex="-1" DBT="{DBT}" DBC="CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
					<!--</div>
                                        
					<div class="DIVText">-->
                                        </oj-input-text>
                                        </oj-label-value>
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">

                                            <oj-label slot="label">
                                             <xsl:value-of select="$DtStamp"/>
                                            </oj-label>
                                            <oj-input-date-time slot="value"  name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" day-formatter="[[dayFormatter]]">
                                            </oj-input-date-time>
						<!--<LABEL CLASS="LABELNormal" for="CHECKERSTAMPI" style="width:{$labelWidth}px;"><xsl:value-of select="$DtStamp"/></LABEL>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/> 
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERSTAMPI" id="CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>-->
					</oj-label-value>
                                        </div>
				<!--</fieldset>-->
				<!--<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">
						<xsl:if test = "$contractStatus = -1">
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$contractStat"/></LABEL>                                          
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$collectionStat"/></LABEL>                                          
						</xsl:if>                                          
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$collectionStat"/></LABEL>                                          
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$paymentStat"/></LABEL>                                          
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$processStat"/></LABEL>                                          
						</xsl:if> 
						<xsl:if test = "$dealStatus = -1">
						  <LABEL CLASS="LABELNormal"><xsl:value-of select="$dealStat"/></LABEL>                                          
						</xsl:if>
					</div>
				</fieldset>-->
                                <!--<fieldset class="FSTcell">
                                    <legend>Untitled group</legend>-->
                                     <div class="oj-sm-width-1/4 oj-flex-item ">
                                     
                                        <xsl:if test = "$contractStatus = -1">
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                         <xsl:value-of select="$contractStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT"  name="CONTSTAT" tabindex="-1" DBT="{DBT}" DBC="CONTSTAT" id="{DBT}__CONTSTAT" readonly="true">
                                          <!-- <LABEL CLASS="LABELAudit1" for="{DBT}__CONTSTAT"><xsl:value-of select="$contractStat"/></LABEL>
                                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="CONTSTAT" tabindex="-1" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                       -->
                                       </oj-input-text>
                                        </oj-label-value>
                                        </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                         <xsl:value-of select="$collectionStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" readonly="readonly">
                                           <!-- <LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"><xsl:value-of select="$collectionStat"/></LABEL>
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
                                        </oj-input-text>
                                        </oj-label-value>
                                        </xsl:if>                                            
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                         <xsl:value-of select="$collectionStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" readonly="readonly">
                                            <!--<LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"><xsl:value-of select="$collectionStat"/></LABEL>
                                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
                                            </oj-input-text>
                                            </oj-label-value>
                                        </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                         <xsl:value-of select="$paymentStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" readonly="readonly">
                                           <!-- <LABEL CLASS="LABELAudit1" for="{DBT}__PAYMENT_STATUS"><xsl:value-of select="$paymentStat"/></LABEL>
                                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
                                            </oj-input-text>
                                            </oj-label-value>
                                        </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                            <xsl:value-of select="$processStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" readonly="readonly">
                                         <!--   <LABEL CLASS="LABELAudit1" for="{DBT}__PROCESSTAT"><xsl:value-of select="$processStat"/></LABEL>
                                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>-->
                                       </oj-input-text>
                                       </oj-label-value>
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                         <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                         <oj-label slot="label">
                                         <xsl:value-of select="$dealStat"/>
                                         </oj-label>
                                          <oj-input-text slot="value" type="TEXT" name="DEAL_STATUS" tabindex="-1" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" readonly="readonly">
                                           <!-- <LABEL CLASS="LABELAudit1" for="{DBT}__DEAL_STATUS"><xsl:value-of select="$dealStat"/></LABEL>
                                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="DEAL_STATUS" tabindex="-1" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>-->
                                        </oj-input-text>
                                      </oj-label-value>
                                        </xsl:if>
                                       <!-- <xsl:text disable-output-escaping="yes">&#160;</xsl:text>-->
                                        
                                   <!-- </div>
                                </fieldset>
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
						<xsl:if test = "$authStatus = -1">
							<!--<label class="LBLChkRadSel NewChkbox" for="{DBT}__AUTHSTAT">--><!--HTML5 Changes-->
							<!--<INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
							<div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
                                                       <!-- <xsl:value-of select="$authStat" />
							</label>-->
                                                        
                                                 <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$authStat" />
                                                    </oj-label>
                                                      <oj-switch slot="value"  disabled="true" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  >
                                                    </oj-switch>
                                                 </oj-label-value>
                                                 
						</xsl:if> 
						<xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$collectionStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;"><xsl:value-of select="$collectionStat"/></LABEL> --> <!-- 12.1 screen height change -->                                      
						</xsl:if>

						<xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$paymentStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" readonly="readonly"/>
                                                    </oj-label-value>
                                               <!-- <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;"><xsl:value-of select="$paymentStat"/></LABEL> -->         <!-- 12.1 screen height change -->                              
						</xsl:if>

						<xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$processStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" readonly="readonly"/>
                                                    </oj-label-value>
                                               <!-- <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;"><xsl:value-of select="$processStat"/></LABEL>-->      <!-- 12.1 screen height change -->                                  
						</xsl:if>
						<!--<xsl:text disable-output-escaping="yes">&#160;</xsl:text>-->
					</div>
				<!--</fieldset>				
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
                                       <!--<div class="oj-sm-width-1/4 oj-flex-item ">
						<xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
							<LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
						 </xsl:if>
						 <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
							<LABEL CLASS="LABELAudit1" for="{DBT}__PAYMENT_STATUS"></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
						 </xsl:if>
						 <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
							<LABEL CLASS="LABELAudit1" for="{DBT}___PROCESSTAT"></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
						 </xsl:if>
						 <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
					</div>-->
				<!--</fieldset>-->
            <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>
			<xsl:if test = "$Reversal = -1">
			<!--<fieldset class="AuditFIELDSET" style="clear:both">
				<legend><xsl:value-of select="$reversal"/></legend>
				<fieldset class="FSTcell">
					<div class="DIVText">-->
                        <fieldset class="oj-sm-padding-2x-top"> 
                            <oj-form-layout label-edge="start" user-assistance-density="compact">
                            <div class="oj-flex oj-sm-width-full">
                                <div class="oj-sm-width-1/4 oj-flex-item ">
                                
                                <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$makerId" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID" tabindex="-1" DBT="{DBT}" DBC="REVR_MAKERID" readonly="readonly"/>
                                                </oj-label-value>
						<!--<LABEL CLASS="LABELNormal" for="{DBT}__MAKERID" style="width:{$labelWidth}px;"><xsl:value-of select="$makerId"/></LABEL>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID" tabindex="-1" DBT="{DBT}" DBC="REVR_MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->					
					<!--</div>
					<div class="DIVText">-->
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$DtStamp" />
                                                    </oj-label>
                                                     <oj-input-date-time slot="value"   name="MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" readonly="readonly" day-formatter="[[dayFormatter]]">
                                             </oj-input-date-time>
                                            </oj-label-value>
						<!--<LABEL CLASS="LABELNormal" for="REVR_MAKERSTAMPI" style="width:{$labelWidth}px;"><xsl:value-of select="$DtStamp"/></LABEL>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
						<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>-->
					</div>
				<!--</fieldset>
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
                                        <div class="oj-sm-width-1/4 oj-flex-item ">
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$checkerId" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" tabindex="-1" DBT="{DBT}" DBC="REVR_CHECKERID"  readonly="readonly"/>
                                                </oj-label-value>
                                                
						<!--<label class="LABELNormal" for="{DBT}__REVR_CHECKERID" style="width:{$labelWidth}px;"><xsl:value-of select="$checkerId"/></label>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" tabindex="-1"
												DBT="{DBT}" DBC="REVR_CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>-->
					<!--</div>
					<div class="DIVText">-->
                                        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$DtStamp" />
                                                    </oj-label>
                                                     <oj-input-date-time slot="value"   name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP"  readonly="readonly" day-formatter="[[dayFormatter]]">
                                             </oj-input-date-time>
                                            </oj-label-value>
						<!--<LABEL CLASS="LABELNormal" for="REVR_CHECKERSTAMPI" style="width:{$labelWidth}px;"><xsl:value-of select="$DtStamp"/></LABEL>--><!-- 12.1 screen height change -->
						<!--<INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
						<INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>-->
					</div>
				<!--</fieldset>
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
                                        <div class="oj-sm-width-1/4 oj-flex-item ">
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$collectionStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>    -->                                      
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$paymentStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS"   readonly="readonly"/>
                                                </oj-label-value>
                                                <!--<LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>   -->                                       
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$paymentStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>  -->                                        
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$paymentStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS"   readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>      -->                                    
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$processStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT"   readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>    -->                                      
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
						<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                                                    <oj-label slot="label">
                                                        <xsl:value-of select="$processStat" />
                                                    </oj-label>
                                                    <oj-input-text slot="value" type="TEXT" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT"  readonly="readonly"/>
                                                </oj-label-value>
                                               <!-- <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>   -->                                       
						</xsl:if>
					</div>
				<!--</fieldset>
				<fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">-->
                                       <!--  <div class="oj-sm-width-1/4 oj-flex-item ">
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
						</xsl:if>  
						<xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
						</xsl:if>  
						<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
							<<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
						</xsl:if>
					</div>-->
				<!--</fieldset>-->
                                </div>
                                </oj-form-layout>
			</fieldset>
			</xsl:if>
			<!--</td>
			<td>-->
				<input Type="reset" value="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/><!-- Fix for 17155663 -->
				<xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
						<!--<xsl:call-template name="dispStdButtonField_img_tmp"/>-->
				</xsl:for-each>
           <!-- </td></tr>-->
           </div>
        </oj-form-layout>
        </fieldset>
       </xsl:template>
       
       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp_bpel">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
                <div style="position:absolute;background-color:cornsilk;visibility:hidden">
                <TABLE  summary="" cellpadding="0" cellspacing="0" border="0" >
                            <TR>
                                     <TD><xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                                   <TD>
                                                 <label class="LABELAudit1" ><xsl:value-of select="$makerId"/></label>
                                   </TD>
                                   
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$DtStamp"/></LABEL>
                                   </TD>
                          
                                    <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$checkerId"/></LABEL>
                                   </TD>
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$DtStamp"/></LABEL>
                                   </TD>
                                <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$contractStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                        </xsl:if>                                          
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$dealStat"/></LABEL>                                          
                                        </xsl:if> 
                                 </TD>
                                      
                                   <TD>
                                     <xsl:if test = "$authStatus = -1">
                                            <label class="LBLChkRadSel NewChkbox" for="{DBT}__AUTHSTAT"><!--HTML5 Changes-->
                                            <INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            <div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes-->
                                            <xsl:value-of select="$authStat" />
                                            </label>
                                     </xsl:if> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                        
                                     </xsl:if>
                                     
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                        
                                     </xsl:if>

                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                        
                                     </xsl:if>
                                    </TD>
                                   
				</TR>
				<TR>
                           <TD> <xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                             <TD>
                                   <INPUT TYPE="TEXT"
                                      CLASS="TEXTAudit1"
                                      name="MAKERID"
                                      id="{DBT}__MAKERID"
                                      tabindex="-1"
                                      DBT="{DBT}"
                                      DBC="MAKERID"
                                      READONLY="true"
                                      MAXLENGTH="12" SIZE="12"/>
                               </TD>
                               <TD>
                                      <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                      <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERSTAMPI" id="MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                </TD>
                                <TD>
                                       <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERID" id="{DBT}__CHECKERID" tabindex="-1" DBT="{DBT}"
                                          DBC="CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                 </TD>
                                 <TD>
                                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERSTAMPI" id="CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="CONTSTAT" tabindex="-1" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if>                                            
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="DEAL_STATUS" tabindex="-1" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>
                                    </TD>
                                    <TD> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                     </xsl:if>

									 <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    </TD>                                    
					</TR>
                <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>

                    <TR>                            
                             <TD STYLE = "color:#CCCCCC;">
                                  <xsl:if test = "$Reversal = -1">                             
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$reversal"/></LABEL>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                              </TD>
                             <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID"  tabindex="-1"
                                            DBT="{DBT}" DBC="REVR_MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>           
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                               </TD>
                               <TD>
                                  <xsl:if test = "$Reversal = -1">
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                </TD>
                                <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" tabindex="-1"
                                            DBT="{DBT}" DBC="REVR_CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                 <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                          <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                                                                 
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                      </xsl:if>  
                                      
                                  </TD>
                                    <TD> 
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
										<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
                                    </TD>   
                                
                                <td>
                                <input Type="reset" value="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td><!-- Fix for 17155663 -->

                 </TR>
              </TABLE>
				</div>
       </xsl:template>

    <xsl:template name = "CacheAuditValues_tmp">
    <script type = "text/javascript"  DEFER="DEFER"> 
        //Added By Saidul;Label desc has been extracted for the contract status.
        /*
        var LBL_CONSTAT_ACTIVE  = mainWin.getItemDesc("LBL_CONSTAT_ACTIVE");
        var LBL_CONSTAT_CLOSED  = mainWin.getItemDesc("LBL_CONSTAT_CLOSED");
        var LBL_CONSTAT_EXERCISED  = mainWin.getItemDesc("LBL_CONSTAT_EXERCISED");
        var LBL_CONSTAT_HOLD  = mainWin.getItemDesc("LBL_CONSTAT_HOLD");
        var LBL_CONSTAT_KNOCKEDIN  = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDIN");
        var LBL_CONSTAT_CANCELLED  = mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
        var LBL_CONSTAT_LIQUIDATED  = mainWin.getItemDesc("LBL_CONSTAT_LIQUIDATED");
        var LBL_CONSTAT_REVERSED  = mainWin.getItemDesc("LBL_CONSTAT_REVERSED");
        var LBL_CONSTAT_KNOCKEDOUT  = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDOUT");
        var LBL_CONSTAT_EXPIRED  = mainWin.getItemDesc("LBL_CONSTAT_EXPIRED");
        var LBL_CONSTAT_UNINITIATED  = mainWin.getItemDesc("LBL_CONSTAT_UNINITIATED");
        var LBL_CONSTAT_OPEN  = mainWin.getItemDesc("LBL_CONSTAT_OPEN");
        var LBL_CONSTAT_REV_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_REV_INITIATED");
        var LBL_CONSTAT_REV_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_REV_PARTIALLY");
        var LBL_CONSTAT_LAUNCH_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCH_INITIATED");
        var LBL_CONSTAT_LAUNCHED_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED_PARTIALLY");
        var LBL_CONSTAT_CAN_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_CAN_INITIATED");
        var LBL_CONSTAT_CAN_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_CAN_PARTIALLY");
        var LBL_CONSTAT_LAUNCHED  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED");
        var LBL_CONSTAT_TERMINATED  = mainWin.getItemDesc("LBL_CONSTAT_TERMINATED");
        var LBL_CONSTAT_REDEEMED  = mainWin.getItemDesc("LBL_CONSTAT_REDEEMED");
        var LBL_CONSTAT_CLOSED_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_CLOSED_PARTIALLY");
        var LBL_CONSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
        var LBL_CONSTAT_SUGGESTED = mainWin.getItemDesc("LBL_CONSTAT_SUGGESTED");
        var LBL_CONSTAT_RESIDUED = mainWin.getItemDesc("LBL_CONSTAT_RESIDUED");
        */
        
    l_OnlineAuditVals["A"]=LBL_CONSTAT_ACTIVE;
	l_OnlineAuditVals["C"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["E"]=LBL_CONSTAT_EXERCISED;
	l_OnlineAuditVals["H"]=LBL_CONSTAT_HOLD;
	l_OnlineAuditVals["I"]=LBL_CONSTAT_KNOCKEDIN;
	l_OnlineAuditVals["K"]=LBL_CONSTAT_CANCELLED;
	l_OnlineAuditVals["L"]=LBL_CONSTAT_LIQUIDATED;
	l_OnlineAuditVals["R"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["S"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["V"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["W"]=LBL_CONSTAT_KNOCKEDOUT;
	l_OnlineAuditVals["X"]=LBL_CONSTAT_EXPIRED;
	l_OnlineAuditVals["Y"]=LBL_CONSTAT_UNINITIATED;
	l_OnlineAuditVals["O"]=LBL_CONSTAT_OPEN;
	l_OnlineAuditVals["T"]= LBL_CONSTAT_TERMINATED;
        
        // Start Cont Stat Vaules are added by Saidul For TN Team.        
        l_OnlineAuditVals["F"]=LBL_CONSTAT_REV_INITIATED;
        l_OnlineAuditVals["J"]=LBL_CONSTAT_REV_PARTIALLY;
        l_OnlineAuditVals["B"]=LBL_CONSTAT_LAUNCH_INITIATED;
        l_OnlineAuditVals["G"]=LBL_CONSTAT_LAUNCHED_PARTIALLY;
        l_OnlineAuditVals["D"]=LBL_CONSTAT_CAN_INITIATED;
        l_OnlineAuditVals["Z"]=LBL_CONSTAT_CAN_PARTIALLY;
        l_OnlineAuditVals["Q"]=LBL_CONSTAT_LAUNCHED;
        // End Cont Stat Vaules are added by Saidul For TN Team.
        l_OnlineAuditVals["N"] = LBL_CONSTAT_REDEEMED;
        l_OnlineAuditVals["M"] = LBL_CONSTAT_CLOSED_PARTIALLY;
        l_OnlineAuditVals["P"] = LBL_CONSTAT_PROCESSED;        
        l_OnlineAuditVals["s"]=LBL_CONSTAT_SUGGESTED;
        l_OnlineAuditVals["r"]=LBL_CONSTAT_RESIDUED;
        
        
        l_OnlineAuditDesc[LBL_CONSTAT_ACTIVE]="A";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="C";
	l_OnlineAuditDesc[LBL_CONSTAT_EXERCISED]="E";
	l_OnlineAuditDesc[LBL_CONSTAT_HOLD]="H";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDIN]="I";
	l_OnlineAuditDesc[LBL_CONSTAT_CANCELLED]="K";
	l_OnlineAuditDesc[LBL_CONSTAT_LIQUIDATED]="L";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="R";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="S";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="V";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDOUT]="W";
	l_OnlineAuditDesc[LBL_CONSTAT_EXPIRED]="X";
	l_OnlineAuditDesc[LBL_CONSTAT_UNINITIATED]="Y";
	l_OnlineAuditDesc[LBL_CONSTAT_OPEN]="O"; 
        l_OnlineAuditDesc[LBL_CONSTAT_TERMINATED]="T"; 

        // Start Cont Stat  Vaules are added by Saidul For TN Team.
	l_OnlineAuditDesc[LBL_CONSTAT_REV_INITIATED]="F";
	l_OnlineAuditDesc[LBL_CONSTAT_REV_PARTIALLY]="J";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCH_INITIATED]="B";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED_PARTIALLY]="G";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_INITIATED]="D";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_PARTIALLY]="Z";
        l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED]="Q";
        
        // End Cont Stat  Vaules are added by Saidul For TN Team.
        l_OnlineAuditDesc[LBL_CONSTAT_REDEEMED] = "N";
        l_OnlineAuditDesc[LBL_CONSTAT_CLOSED_PARTIALLY] = "M";
        l_OnlineAuditDesc[LBL_CONSTAT_PROCESSED] = "P";
        l_OnlineAuditDesc[LBL_CONSTAT_SUGGESTED]="s";
        l_OnlineAuditDesc[LBL_CONSTAT_RESIDUED]="r";
        
        
        //Added By Saidul;Label desc has been extracted for the process status.
        /*
        var LBL_PROCESSTAT_PEND_AUTH  = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
        var LBL_PROCESSTAT_PEND_RELEASE  = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
        var LBL_PROCESSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
        var LBL_PROCESSTAT_FAILED_VERIFICATION  = mainWin.getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
        var LBL_PROCESSTAT_HOLD  = mainWin.getItemDesc("LBL_PROCESSTAT_HOLD");
        var LBL_PROCESSTAT_SUPPRESSED	= mainWin.getItemDesc("LBL_PROCESSTAT_SUPPRESSED"); 
        var LBL_PROCESSTAT_CANCELLED	= mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
        */
        
        l_OnlineProcessStatusVals["N"] = LBL_PROCESSTAT_PEND_AUTH;
        l_OnlineProcessStatusVals["A"] = LBL_PROCESSTAT_PEND_RELEASE;
        l_OnlineProcessStatusVals["P"] = LBL_PROCESSTAT_PROCESSED;
        l_OnlineProcessStatusVals["F"] = LBL_PROCESSTAT_FAILED_VERIFICATION;
        l_OnlineProcessStatusVals["H"] = LBL_PROCESSTAT_HOLD;
        l_OnlineProcessStatusVals["V"] = LBL_PROCESSTAT_SUPPRESSED;
        l_OnlineProcessStatusVals["C"] = LBL_CONSTAT_CANCELLED;
        
        
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_AUTH]="N";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_RELEASE]="A";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PROCESSED]="P";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_FAILED_VERIFICATION]="F";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_HOLD]="H";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_SUPPRESSED]="V";
        l_OnlineProcessStatusDesc[LBL_CONSTAT_CANCELLED]="C";

  </script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
    </xsl:template>
	   <!-- End of Tmp_GloablAudit.xsl -->
	  <!-- Start of Col_Detail.xsl -->
	  <!-- <xsl:import href="GlobalMultiple.xsl"/> -->
  <!-- <xsl:import href="Col_GlobalInput.xsl"/> -->
  <!-- Template to display HEADER fields above tabs -->
  <xsl:template match="HEADER/PAGE" mode="column">
      <!-- sundar added for ME blk with SE View -->
      <xsl:variable name="tabId" select="@ID"/>
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = $tabId])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
      <!-- sundar ends -->
    <TABLE CLASS="colTABLEHdr" ID="TBLPage{@ID}"
           style="table-layout:fixed;width:100%;" summary="Tab Group headers"
           cellpadding="0" cellspacing="0" border="0">
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">top</xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="ColumnPageHandler">
        <xsl:with-param name="curr_page">
          <xsl:value-of select="@NAME"/>
        </xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">bottom</xsl:with-param>
      </xsl:call-template>
    </TABLE>
   </DIV>
  </xsl:template>
  <!-- Template to handle a page -->
  <xsl:template match="PAGE" mode="col_content">
      <!-- sundar added for ME blk with SE View -->
      <xsl:variable name="tabId" select="@ID"/>
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = $tabId])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
      <!-- sundar ends -->
    <TABLE CLASS="colTABLEPage" ID="TBLPage{@ID}"
           style="table-layout:fixed;width:100%;" summary="" cellpadding="0"
           cellspacing="0" border="0">
      <xsl:if test="position()!=1">
        <xsl:attribute name="style">
          <xsl:text>table-layout:fixed;width:100%;display:none;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!-- Ashok added the fix !-->
      <TR CLASS="colTRRow" style="height:0px;">
        <TD CLASS="colTDLabel" valign="top">
          <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </TD>
        <TD CLASS="colTDText" align="left" valign="top">
          <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </TD>
        <TD CLASS="colTDLabel" valign="top">
          <xsl:text disable-output-escaping="yes">&#160;</xsl:text>        
        </TD>
        <TD CLASS="colTDText" align="left" valign="top">
          <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </TD>
      </TR>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">top</xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="ColumnPageHandler">
        <xsl:with-param name="curr_page" select="@NAME"/>
      </xsl:call-template>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">bottom</xsl:with-param>
      </xsl:call-template>
    </TABLE>
   </DIV>
  </xsl:template>
  <!-- Page Handler for Column Positioning -->
  <xsl:template name="ColumnPageHandler">
    <xsl:param name="curr_page" select="."/>
    <!--
              <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']">
                     <xsl:if test="@TYPE = 'Single Entry'">              
                            <xsl:for-each select="./FIELD[@TABPAGE=$curr_page and @COL=1]">
                                   <xsl:sort select="@ROW" data-type="number"
                                             order="ascending"/>
              
                                   <xsl:call-template name="RowHandler">
                                          <xsl:with-param name="curr_page"
                                                          select="$curr_page"/>
                                          <xsl:with-param name="curr_row"
                                                          select="@ROW"/>
                                   </xsl:call-template>
                            </xsl:for-each>
                     </xsl:if>
                     <xsl:if test="@TYPE = 'Multiple Entry' and @TABPAGE=$curr_page">
                            <TR CLASS="colTRRow">
                                   <TD COLSPAN="4">
                                          <xsl:call-template name="MultipleHandler_column"/>
                                   </TD>
                            </TR>
                     </xsl:if>
              </xsl:for-each>-->
    <!--yugandhar added-->
    <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Single Entry' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$curr_page and @COL=1]">
      <xsl:sort select="@ROW" data-type="number" order="ascending"/>
      <xsl:call-template name="RowHandler">
        <xsl:with-param name="curr_page" select="$curr_page"/>
        <xsl:with-param name="curr_row" select="@ROW"/>
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW != 'Single Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and @SCREEN=$screen and @TABPAGE=$curr_page and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']"> 
      <TR CLASS="colTRRow">
      <!-- Kals for FieldSet on Col Pos <xsl:call-template name="MultipleHandler_column -->
        <TD COLSPAN="4">
          <xsl:call-template name="MultipleHandler_column_FS"/>
        </TD>
      </TR>
    </xsl:for-each>
    <!-- added by sundar -->
    <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$curr_page and @COL=1]"> 
      <xsl:sort select="@ROW" data-type="number" order="ascending"/>
        <xsl:call-template name="RowHandler">
          <xsl:with-param name="curr_page" select="$curr_page"/>
          <xsl:with-param name="curr_row" select="@ROW"/>
        </xsl:call-template>
    </xsl:for-each>
  </xsl:template>
  <!-- Row Handler -->
  <xsl:template name="RowHandler">
    <xsl:param name="curr_page" select="."/>
    <xsl:param name="curr_row" select="."/>
    <TR CLASS="colTRRow">
<!--      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Single Entry']/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row]/TYPE" 
                           mode="column"> -->
      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row]/TYPE" 
                           mode="column"> 
        <xsl:sort select="../@COL" data-type="number" order="ascending"/>
      </xsl:apply-templates>
      <!-- creating emtry td if the row dosent contain col 2 !-->
      <xsl:variable name="rowFirstFld"
                    select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row and @COL = 1]"/>
      <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row] ) &lt; 2">
      <!-- if the field type is TEXTAREA then we should not add the empty td's. coz, COLSPAN=3 mentioned already for textarea field Kals , Yug March 16 -->
        <xsl:if test="$rowFirstFld/TYPE != 'FIELDSET' and $rowFirstFld/TYPE != 'TEXTAREA'">
          <TD CLASS="colTDLabel">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
          <TD CLASS="colTDText">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
        </xsl:if>
        <xsl:if test="$rowFirstFld/TYPE = 'FIELDSET' and $rowFirstFld/COLSPAN = 2">
          <TD CLASS="colTDLabel">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
          <TD CLASS="colTDText">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
        </xsl:if>
      </xsl:if>
    </TR>
  </xsl:template>
  
  <xsl:template name="AllContent_column">
  
    <!--  
    <xsl:variable name="No_Flds_TabAll"
                  select="count(//BLOCK[@SCREEN =$screen and @TYPE = 'Multiple Entry' and @TABPAGE = 'All'])   +   count(//BLOCK[@SCREEN =$screen and @TYPE = 'Single Entry']/FIELD[@TABPAGE = 'All']) ">
    </xsl:variable>
    
    <xsl:variable name="gAllTabHgt_Temp">
      <xsl:if test="$No_Flds_TabAll = 0">
        <xsl:value-of select="0"/>
      </xsl:if>
      <xsl:if test="$No_Flds_TabAll &gt; 0">
        <xsl:value-of select="$gAllTabHgt"/>
      </xsl:if>
    </xsl:variable>
    !-->
    
    <xsl:variable name="gAllTabHgt_Temp">
      <xsl:if test="count(TAB/PAGE) = 0">
        <xsl:value-of select="$gHeight"/>
      </xsl:if>
      <xsl:if test="count(TAB/PAGE) &gt; 0">
        <xsl:value-of select="$gAllTabHgt"/>
      </xsl:if>
    </xsl:variable>
    
    
    <xsl:if test="$gAllTabHgt_Temp &gt; 0"> 
    <div id="TabPageAll" class="TABLETabAll"
         style="overflow-y:scroll;height:545px;width:790px;">

      <xsl:if test="count(TAB/PAGE) = 0">
        <xsl:attribute name="style">
          <xsl:text>overflow-y:auto;width:790px;height:</xsl:text>
          <xsl:value-of select="'545'"/>
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
      </xsl:if>

      <!-- sundar added for ME blk with SE View !--> 
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = 'All'])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
       
        
      <!-- sundar ends -->
      <TABLE CLASS="colTABLEPage" id="TBLPageAll"
             style="table-layout:fixed;width:100%;" cellpadding="0"
             cellspacing="0" border="0" summary="">
            
        <xsl:if test="count(TAB/PAGE) = 0">
          <xsl:attribute name="summary">
            <xsl:text>Tab Group All</xsl:text>
          </xsl:attribute>
          <TR CLASS="colTRRow">
            <TD COLSPAN="4" style="height:15px;">
              <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </TD>
          </TR>
        </xsl:if>
        <xsl:if test="count(TAB/PAGE) &gt; 0">
          <xsl:attribute name="summary">
            <xsl:text>Tab Group Footer</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <!-- Ashok added the fix !-->
        <TR CLASS="colTRRow" style="height:0px;">
          <TD CLASS="colTDLabel" valign="top">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
          <TD CLASS="colTDText" align="left" valign="top">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
          <TD CLASS="colTDLabel" valign="top">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>        
          </TD>
          <TD CLASS="colTDText" align="left" valign="top">
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
          </TD>
        </TR>
        <xsl:call-template name="displayCustomButtons">
          <xsl:with-param name="pageId">All</xsl:with-param>
          <xsl:with-param name="vAlign">top</xsl:with-param>
        </xsl:call-template>
        <xsl:call-template name="ColumnPageHandler">
          <xsl:with-param name="curr_page">All</xsl:with-param>
        </xsl:call-template>
        <xsl:call-template name="displayCustomButtons">
          <xsl:with-param name="pageId">All</xsl:with-param>
          <xsl:with-param name="vAlign">bottom</xsl:with-param>
        </xsl:call-template>
        
         <TR style="height:100%">
                     <TD colspan="4"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
              </TR>
      </TABLE>
      </DIV>
    </div>
    </xsl:if>
  </xsl:template>
  <!-- Teplate to disply the custom buttons -->
  <xsl:template name="displayCustomButtons">
    <xsl:param name="pageId" select="."/>
    <xsl:param name="vAlign" select="."/>
    <xsl:variable name="alignWidth" select="$gWidth div 3"/>
    <xsl:variable name="vAlignBtnCnt"
                  select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign])"/>
    <xsl:if test="$vAlignBtnCnt &gt; 0">
      <TR CLASS="colTRRow">
        <TD COLSPAN="4">
          <TABLE summary="Custom Buttons" cellpadding="0" cellspacing="0"
                 border="0">
            <xsl:if test="$vAlign = 'top'">
              <xsl:attribute name="style">margin-bottom:5px</xsl:attribute>
            </xsl:if>
            <xsl:if test="$vAlign = 'bottom'">
              <xsl:attribute name="style">margin-top:5px</xsl:attribute>
            </xsl:if>            
            <xsl:variable name="leftCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'left'])"/>
            <xsl:variable name="middleCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'center'])"/>
            <xsl:variable name="rightCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'right'])"/>            
            
            <xsl:variable name="leftWidth">
              <xsl:choose>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &lt; 6 and $middleCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &lt; 6 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &gt; 6 and $middleCount = 0 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount = 0 and $middleCount &gt; 3">
                  <xsl:value-of select="'0'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
             <xsl:variable name="middleWidth">
              <xsl:choose>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &lt; 6 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &lt; 6 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &gt; 6 and $rightCount = 0 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>                 
                <xsl:when test="$middleCount = 0 and ($leftCount &gt; 3 or $rightCount &gt; 3) ">
                  <xsl:value-of select="'0'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
            <xsl:variable name="rightWidth">
              <xsl:choose>
                <xsl:when test="$rightCount &gt; 3 and $rightCount &lt; 6 and $middleCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$rightCount &gt; 3 and $rightCount &gt; 6 and $middleCount = 0 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>                        
            <TR>
              <xsl:attribute name="ugi"><xsl:value-of select="$leftWidth"/>:<xsl:value-of select="$middleWidth"/>:<xsl:value-of select="$rightWidth"/></xsl:attribute>
              <TD style="width:{$leftWidth}px;" align="right">
              <!--<TD style="width:{$alignWidth}px;" align="right">-->
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'left']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>
              <TD style="width:{$middleWidth}px;" align="center">
              <!--<TD style="width:{$alignWidth}px;" align="center">-->
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'center']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>              
              <TD style="width:{$rightWidth}px;" align="right">              
              <!--<TD style="width:{$alignWidth}px;" align="right">-->                
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'right']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>
            </TR>
          </TABLE>
        </TD>
      </TR>
    </xsl:if>
  </xsl:template>
  <xsl:template match="FIELD" mode="custButtons">
    <BUTTON CLASS="INPUTButton">
      <xsl:if test="count(./SRC) &gt; 0">
        <xsl:attribute name="CLASS">INPUTStdButton_img</xsl:attribute>
      </xsl:if>
      <xsl:call-template name="ATTR_Handler">
        <xsl:with-param name="curr_fld" select="."/>
      </xsl:call-template>
      <xsl:call-template name="dispLabelCaption">
        <xsl:with-param name="curr_fld" select="."/>
      </xsl:call-template>
      <xsl:if test="count(./SRC) &gt; 0">
        <IMG id="{./NAME}_IMG" SRC="{./SRC}">
          <xsl:if test="count(./ALT) &gt; 0">
            <xsl:attribute name="ALT">
              <xsl:value-of select="./ALT"/>
            </xsl:attribute>
          </xsl:if>
        </IMG>
      </xsl:if>
    </BUTTON>
    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
  </xsl:template>
	  <!-- End of Col_Detail.xsl -->
	  <!-- Start of GlobalMultiple.xsl" -->
  <!--  <xsl:template name="MultipleHandler_column -->
  
  <xsl:template name="MultipleHandler_column_FS">
        <xsl:variable name = "Blk_Fs_Lbl" select = "LABEL"/>
        <xsl:variable name = "BlkId" select = "ID"/>
    
  
       <xsl:if test = "$Blk_Fs_Lbl != ''"> 
          <FIELDSET CLASS="FieldsetNormal" ID = "FLDSET__{$BlkId}">    
            <b><LEGEND><LABEL ID = "LBL_FLDSET_{$BlkId}" value = "{$Blk_Fs_Lbl}" > <xsl:value-of select = "$Blk_Fs_Lbl"/> </LABEL></LEGEND></b>       
                  <xsl:call-template name = "MultipleHandler_column">
                      <xsl:with-param name = "topPadding" select = "0"/>
                      <xsl:with-param name = "bottomPadding" select = "0"/>
                  </xsl:call-template>      
           </FIELDSET>       
          </xsl:if>                
    
    
  
  
  	<xsl:if test = "$Blk_Fs_Lbl = ''">
        <xsl:call-template name = "MultipleHandler_column">
                      <xsl:with-param name = "topPadding" select = "10"/>
                      <xsl:with-param name = "bottomPadding" select = "10"/>
        
      </xsl:call-template>        
  </xsl:if>
  </xsl:template>
  
  <xsl:template name="MultipleHandler_column">
    <xsl:param name = "topPadding" select = "."/>
    <xsl:param name = "bottomPadding"/>
    
    <xsl:variable name="halfWidth" select="$gWidth*(1 div 2)"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>
    <xsl:variable name="multipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="HEIGHT"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    
     <TABLE border="0" style="margin-top:{$topPadding}px;margin-bottom:{$bottomPadding}px;wdith:100%;z-index:1"> 
      <TR>
        <TD>
          <xsl:if test="($multipleWidth &gt; $twoThirdWidth) or ($multipleWidth = $twoThirdWidth)">
            <xsl:attribute name="STYLE">
              <xsl:text>width:10px;</xsl:text>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$multipleWidth &lt; $twoThirdWidth">
            <xsl:attribute name="STYLE">
              <xsl:text>width:20%;</xsl:text>
            </xsl:attribute>
          </xsl:if>
        </TD>
        <TD>
          <TABLE class="MultipleEntryContainer" border="0" cellpadding="0"
                 cellspacing="0" summary="">
            <TR>
              <TD valign="bottom" align="left">
                <xsl:call-template name="MultipleHandler">
                  <xsl:with-param name="curr_blk" select="."/>
                  <xsl:with-param name="mWidth" select="$multipleWidth"/>
                  <xsl:with-param name="mHeight" select="$multipleHeight"/>
                </xsl:call-template>
              </TD>
              <!-- sundar added -->
              <TD valign="top" align="center">
                <xsl:call-template name="MultipleHandler_1">
                  <xsl:with-param name="curr_blk" select="."/>
                </xsl:call-template>
              </TD>
            </TR>
          </TABLE>
        </TD>
      </TR>
    </TABLE>
  </xsl:template>
  
  
 
 <xsl:template name="MultipleHandler_absolute_FS">  
    <xsl:variable name = "Blk_Fs_Lbl" select = "normalize-space(LABEL)"/>
    <xsl:variable name = "FldSetHt" select = "HEIGHT"/>  
    <xsl:variable name = "FldSetWdt" select = "WIDTH"/>
    <xsl:variable name = "BlkId" select = "ID"/>
    <xsl:variable name="FldSetrow" select="substring-before(ABS_POS,',')"/>
    <xsl:variable name="FldSetcol" select="substring-after(ABS_POS,',')"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    
    <xsl:variable name="FldSetmultipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $FldSetWdt">
          <xsl:value-of select="$FldSetWdt"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $FldSetWdt">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    
 
 
  <xsl:if test = "$Blk_Fs_Lbl != ''">
   <!--
    <FIELDSET class = "FieldsetNormal" ID = "FLDSET__{$BlkId}" style="position:absolute;left:0px;top:{$FldSetrow}px;width:{$FldSetmultipleWidth + 40}px;height:{$FldSetHt + 40}px;">
   -->
   <FIELDSET class = "FieldsetNormal" ID = "FLDSET__{$BlkId}" style="position:absolute;left:{$FldSetcol}px;top:{$FldSetrow}px;width:{$FldSetmultipleWidth + 40}px;height:{$FldSetHt + 40}px;z-index:1">
   <xsl:if test="normalize-space(HEIGHT) = 0 or normalize-space(WIDTH) = 0">
    <xsl:attribute name="style">
        <xsl:text>position:absolute;left:0px;top:0px;width:0px;height:0px;z-index:1</xsl:text>
    </xsl:attribute>
   </xsl:if>
   <xsl:if test="normalize-space(HEIGHT) != 0 and normalize-space(WIDTH) != 0">   
    <LEGEND>
        <b>
          <NOBR>
            <LABEL class="LABELNormal"  value = "{$Blk_Fs_Lbl}" ID = "LBL_FLDSET_{$BlkId}" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
              <xsl:value-of select = "$Blk_Fs_Lbl"/>
              <xsl:if test="count(REQUIRED) = 0 or REQUIRED = -1">
                <SPAN class="SPANFlag" title="Required Field">*</SPAN>
              </xsl:if>
            </LABEL>
          </NOBR>
          </b>
    </LEGEND>    
    </xsl:if>
      <xsl:call-template name = "MultipleHandler_absolute">
        <xsl:with-param name = "divLeft" select = "2"/>
        <xsl:with-param name = "divTop" select = "15"/>
      </xsl:call-template>      
    </FIELDSET>
    
  </xsl:if>
  
  <xsl:if test = "$Blk_Fs_Lbl = ''">
        <xsl:call-template name = "MultipleHandler_absolute">
          <xsl:with-param name = "divLeft" select = "$FldSetcol"/>
          <xsl:with-param name = "divTop" select = "$FldSetrow"/>
      </xsl:call-template>        
  </xsl:if>
  
  
 </xsl:template>
 
 
 
  <xsl:template name="MultipleHandler_absolute">
    <xsl:param name = "divLeft" select = "."/>
    <xsl:param name = "divTop" select = "."/>
    <xsl:variable name="row" select="substring-before(ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after(ABS_POS,',')"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>    
    
    
    <xsl:variable name="multipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="normalize-space(HEIGHT)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    
    <!-- Kals in June 12 adding FldSet to ME
    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$col}px;top:{$row}px;width:{$multipleWidth + 35}px;height:{HEIGHT}px;">
    -->
    
   <!--
    <xsl:variable name = "FldSetHt" select = "HEIGHT"/>            
    <FIELDSET class = "FieldsetNormal" style="position:absolute;left:0px;top:{$row}px;width:{$multipleWidth + 45}px;height:{$FldSetHt + 40}px;">
    <LEGEND>
          <NOBR><LABEL class="LABELNormal"  value="ME Lable Test" >Me Label Test<SPAN class="SPANFlag" title="Required Field">*</SPAN></LABEL></NOBR>
    </LEGEND>    
    -->
    
    <!--
    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$divLeft}px;top:{$divTop}px;width:{$multipleWidth + 35}px;height:{HEIGHT}px;">        
    -->         
    <!-- Kals Ends here -->
<!--
    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$divLeft}px;top:{$divTop}px;width:{$multipleWidth + 35}px;height:{HEIGHT}px;">        
-->
    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$divLeft}px;top:{$divTop}px;width:{$multipleWidth + 35}px;height:{$multipleHeight}px;">        
   <xsl:if test="normalize-space(HEIGHT) = 0 or normalize-space(WIDTH) = 0">
    <xsl:attribute name="style">
        <xsl:text>position:absolute;left:0px;top:0px;width:0px;height:0px;</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="class">
        <xsl:text></xsl:text>
    </xsl:attribute>
   </xsl:if>         
    
      <xsl:call-template name="MultipleHandler">
        <xsl:with-param name="curr_blk" select="."/>
        <xsl:with-param name="mWidth" select="$multipleWidth"/>
        <xsl:with-param name="mHeight" select="$multipleHeight"/>        
      </xsl:call-template>
      
<!--      <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY != -1"> -->
        <xsl:call-template name="MultipleHandler_1">
          <xsl:with-param name="curr_blk" select="."/>
        </xsl:call-template>
<!--      </xsl:if> -->
    </DIV>
    
  </xsl:template>
  <xsl:template name="MultipleHandler">
    <xsl:param name="curr_blk" select="."/>
    <xsl:param name="mWidth" select="."/>
    <xsl:param name="mHeight" select="."/>
    <xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')"/>
<!--    <DIV CLASS="DIVMultiple" NAME="dataContainer" STYLE="overflow-y:auto;position:inherit;width:{$mWidth - 35}px;height:{$curr_blk/HEIGHT}px;"> -->
    
    <DIV CLASS="DIVMultiple" NAME="dataContainer" STYLE="overflow-y:auto;position:inherit;width:{$mWidth - 110}px;height:{$mHeight}px;"> 
      <xsl:if test="$gPosition = 'absolute'">
        <xsl:attribute name="STYLE">
          <xsl:text>position:absolute;top:0px;left:0px;overflow-y:auto;width:</xsl:text>
          <xsl:value-of select="$mWidth"/>
          <xsl:text>px;height:</xsl:text>
<!--          <xsl:value-of select="$curr_blk/HEIGHT"/> -->
          <xsl:value-of select="$mHeight"/> 
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!--
      <DIV class="DIVMultipleInner" style="height:{$curr_blk/HEIGHT}px;">!-->
        <TABLE CLASS="TABLEMultiple" ID="{$curr_blk/ID}" cellpadding="1"
               cellspacing="1" border="0"
               summary="Editable Table for {$curr_blk/LABEL}">
          <xsl:apply-templates select="$curr_blk/EVENT"/>
          <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:attribute name="DBT">
              <xsl:value-of select="./DBT"/>
            </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
              <xsl:value-of select="$curr_blk/DATAPAGESIZE"/>
            </xsl:attribute>
          </xsl:if>
          <THEAD id="downTblHead">
            <TR>
              <TH CLASS="THEADTDMultiple" style="border:none;" align="center"
                  SCOPE="COL">
                <INPUT TYPE="CHECKBOX"
                       OnClick="fnToggleAllOrNoneME({$curr_blk/ID},this)"
                       title="Select all rows"/>
              </TH>
              <xsl:for-each select="$curr_blk/FIELD">
                <xsl:sort select="@COL" data-type="number" order="ascending"/>
                <xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                  <TH CLASS="DispNone" SCOPE="COL"> 
<!--                  <TH CLASS="hidden" SCOPE="COL"> -->
                  </TH>
                </xsl:if>
                <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                  <TH CLASS="THEADTDMultiple" SCOPE="COL" align="center">
                    <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                      <SPAN class="LABELDDLink"
                            onClick="DD_{./NAME}.showTargetFuncId()">
                        <xsl:value-of select="./LABEL"/>
                      </SPAN>
                    </xsl:if>
                    <xsl:if test="count(./DD) = 0">
                      <NOBR>
                        <SPAN CLASS="SPANFlag">
                        </SPAN>
                        <xsl:value-of select="./LABEL"/>
                      </NOBR>
                    </xsl:if>
                  </TH>
                </xsl:if>
              </xsl:for-each>
              <!--Adding a temparory TD to keep the Columns of fiedwidth !-->
              <TH CLASS="THEADTDMultiple" style="width:100%" SCOPE="COL">
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
              </TH>
            </TR>
          </THEAD>
          <TBODY>
            <xsl:if test="count(./DBT) &gt;= 1">
              <xsl:call-template name="detail_row">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="string('1')"/>
              </xsl:call-template>
            </xsl:if>
            <xsl:if test="count(./DBT) &lt;= 0">
              <xsl:call-template name="detail_row">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS"/>
              </xsl:call-template>
            </xsl:if>
          </TBODY>
        </TABLE>
      <!--</DIV>!-->
    </DIV>
    <!-- Added this div, to solve the problem :: if the last control is a me then it is not displaying till the end.!-->
    <!--
          <xsl:if test="$gPosition='absolute'">
              <DIV style="position:absolute;left:0px;top:{$row + $curr_blk/HEIGHT}px;visibility:hidden;">
                  <input type="text" id="askau"/>
              </DIV>
          </xsl:if>
          -->
  </xsl:template>
  <xsl:template name="MultipleHandler_1">
    <xsl:param name="curr_blk" select="."/>
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
    <NOBR>
      <DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}"
           id="divAddDel_{$curr_blk/ID}">
        <xsl:if test="$gPosition='absolute'">
          <xsl:attribute name="STYLE">
              <xsl:text>float:right;width:</xsl:text>
              <xsl:choose>
                <xsl:when test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:text>0px;</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>30px;</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
              <xsl:text>height:</xsl:text>
<!--              <xsl:value-of select="$curr_blk/HEIGHT"/> -->
              <xsl:value-of select="$mHgt"/> 
              <xsl:text>px;</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <TABLE CLASS="TABLEAddDelRow" cellspacing="0" cellpadding="0" border="0"
               summary="">
          <!-- sundar added -->
          <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnAddRow" title="Add"  name="cmdAddRow_{$curr_blk/ID}" tabindex="-1"
                      id="cmdAddRow_{$curr_blk/ID}"
                      onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')"><!--Fix for 17235409-->
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$curr_blk/READ_ONLY != '0'">
                  <xsl:attribute name="disabled">true</xsl:attribute>
                </xsl:if>
                <IMG id="imgAdd_{$curr_blk/ID}" SRC="{$imgPath_XSL}/Icons/Addrow.gif"
                     alt="Add Row"/>
              </BUTTON>
            </TD>
          </TR>
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnDelRow" title="Delete" name="cmdDelRow_{$curr_blk/ID}" tabindex="-1"
                      id="cmdDelRow_{$curr_blk/ID}"
                      onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')"><!--Fix for 17235409-->
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$curr_blk/READ_ONLY != '0'">
                  <xsl:attribute name="disabled">true</xsl:attribute>
                </xsl:if>
                <IMG id="imgAdd_{$curr_blk/ID}" SRC="{$imgPath_XSL}/Delrow.gif"
                     alt="Delete Row"/>
              </BUTTON>
            </TD>
          </TR>
        </xsl:if>
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnSingleView" title="SingleView" tabindex="-1"
                      name="BTN_SINGLE_VIEW_{$curr_blk/ID}"
                      id="BTN_SINGLE_VIEW_{$curr_blk/ID}"
                      onClick="fnShowSingleViewForME('{$curr_blk/ID}')"><!--Fix for 17235409-->
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <IMG id="imgView_{$curr_blk/ID}" SRC="{$imgPath_XSL}/SingleView.gif"
                     alt="Single Record View"/>
              </BUTTON>
            </TD>
          </TR>
        </TABLE>
      </DIV>
    </NOBR>
  </xsl:template>
  <!--
       <xsl:template name="MultipleHandler_2">
              <xsl:param name="curr_blk" select="."/>
              <xsl:variable name="row"
                            select="substring-before($curr_blk/ABS_POS,',')"/>
              <xsl:variable name="col"
                            select="substring-after($curr_blk/ABS_POS,',')"/>
              <NOBR>
                     <DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}"
                          id="divAddDel_{$curr_blk/ID}" STYLE="width:28px;">
                            <xsl:if test="$gPosition='absolute'">
                                   <xsl:attribute name="STYLE">
                                          <xsl:text>position:absolute;left:</xsl:text>
                                          <xsl:value-of select="$col + $curr_blk/WIDTH + 5"/>
                                          <xsl:text>px;top:</xsl:text>
                                          <xsl:value-of select="$row"/>
                                          <xsl:text>px;width:28px;</xsl:text>
                                   </xsl:attribute>
                            </xsl:if>
                     </DIV>
              </NOBR>
       </xsl:template>
       -->
  <!-- Now declare a template to get the reqd. no. of detail rows.
       	 Since XSL does'nt support iteration, use recursion -->
  <xsl:template name="detail_row">
    <xsl:param name="node_name" select="."/>
    <xsl:param name="num_rows" select="."/>
    <TR CLASS="TBODYTRMultiple" valign="middle">
      <TD CLASS="TBODYTDMultiple" align="center" valign="middle" scope="row">
        <label class="LBLauto" for="chkDeleteRow"><INPUT type="checkbox" name="chkDeleteRow" id="chkDeleteRow" onclick="fnMulipleEntryRow_onClick()"
               title="Select this rows"/></label>
      </TD>
      <xsl:for-each select="$node_name/FIELD">
        <xsl:sort select="@COL" data-type="number" order="ascending"/>
        <xsl:apply-templates select="TYPE" mode="column"/>
      </xsl:for-each>
      <!--Adding a temparory TD to keep the Columns of fiedwidth !-->
      <TD CLASS="TBODYTDMultiple" style="width:100%">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
      </TD>
    </TR>
    <xsl:if test="$num_rows &gt; 1">
      <xsl:call-template name="detail_row">
        <xsl:with-param name="node_name" select="$node_name"/>
        <xsl:with-param name="num_rows" select="$num_rows - 1"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  
  <!-- sundar added for blk event handler -->
  <xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
      <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
  </xsl:template>
	  <!-- End of GlobalMultiple.xsl" -->
	<!-- Start of Col_GlobalInput.xsl" -->
       <!--<xsl:import href="GlobalInput.xsl"/>-->
       <!-- Text, Amount and Date Entity Handler -->
       <xsl:template match="FIELD/TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']"
                     mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                     <TD CLASS="colTDLabel" align="right" valign="top">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              
              <TD valign="top">
                     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                            <xsl:attribute name="CLASS">colTDText</xsl:attribute>
                     </xsl:if>

                     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
                            <xsl:attribute name="align">center</xsl:attribute>
                     </xsl:if>
                     <NOBR>
                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispEntityField">
                                   <xsl:with-param name="EntityType"
                                                   select="../TYPE"/>
                            </xsl:call-template>
                     </NOBR>
              </TD>
       </xsl:template>
      <!-- 
       <xsl:template name="RequiredFieldHandler_me">
              <xsl:param name="curr_fld" select="."/>
              <xsl:if test="$curr_fld/REQUIRED='-1'">
                     <SPAN CLASS="SPANFlag">*</SPAN>
              </xsl:if>
              <xsl:if test="$curr_fld/REQUIRED!='-1'">
                     <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
              </xsl:if>
       </xsl:template>
		-->
       <!-- SELECT List Text Handler -->
       <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <TD CLASS="colTDLabel" valign="top" align="right">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDList" valign="top">
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispSelectField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="column">
              
              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <xsl:variable name="rFldNode" select=".."/>
                     <TD CLASS="colTDRadio" colspan="2">
                            <!--if the parant is not a FS. !-->
                            <xsl:if test="../../TYPE != 'FIELDSET'">
                                   <xsl:if test="$rFldNode/@COL = '1' ">
                                          <xsl:if test="count($rFldNode/OPTION) &gt; 2">
                                                 <xsl:attribute name="colspan">4</xsl:attribute>
                                          </xsl:if>
                                   </xsl:if>
                            </xsl:if>
                            <!--if the parant is a FS. !-->
                            <xsl:if test="../../TYPE = 'FIELDSET'">
                                   <xsl:attribute name="colspan">
                                          <xsl:value-of select="../../COLSPAN"/>
                                   </xsl:attribute>
                            </xsl:if>
                            <FIELDSET class="FieldsetNormal">
                                   <legend>
                                          <b>
                                                 <xsl:call-template name="dispLabelField"/>
                                          </b>
                                   </legend>
                                   <table summary="" cellspacing="0"
                                          cellpadding="0" border="0"
                                          style="table-layout:fixed;width:100%;">
                                          <xsl:for-each select="../OPTION[@COL=1]">
                                                 <xsl:sort select="@ROW"
                                                           data-type="number"
                                                           order="ascending"/>
                                                 <xsl:variable name="row"
                                                               select="@ROW"/>
                                                 <tr>
                                                        <xsl:apply-templates select="../OPTION[@ROW = $row]"
                                                                             mode="column"/>
                                                 </tr>
                                          </xsl:for-each>
                                   </table>
                            </FIELDSET>
                     </TD>
              </xsl:if>

              <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                     <TD CLASS="colTDRadio">
                            <NOBR>
                                   <xsl:call-template name="RequiredFieldHandler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                                   <INPUT TYPE="RADIO" TABINDEX="../TABINDEX" CLASS="INPUTRadio">
                                          <xsl:call-template name="ATTR_Handler">
                                                 <xsl:with-param name="curr_fld"
                                                                 select=".."/>
                                          </xsl:call-template>
                                          <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
                                                 <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                                                 <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                                          </xsl:if>
                                   </INPUT>
                            </NOBR>
                     </TD>
              </xsl:if>
       </xsl:template>
       <!--option handler-->
       <xsl:template match="OPTION" mode="column">
              <td style="padding-left:15px;" align="left">
                     <LABEL>
                            <INPUT TYPE="RADIO" CLASS="INPUTRadio">
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                                  <!-- Sundar on May 15 For Option Value -->
                                  <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
                                  <!-- sundar ends -->                                   
                                   <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
                                          <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                                   </xsl:if>
                            <!-- Kals on June 9 for Lable Err prompt -->
                            <xsl:attribute name="LABEL_VALUE">
                                  <xsl:value-of select="LABEL"/>
                            </xsl:attribute>                            
                            <!-- kals ends here -->        
                                   
                            </INPUT>
                            <xsl:value-of select="LABEL"/>
                            
                     </LABEL>
              </td>
       </xsl:template>
       <!-- Checkbox Handler -->
       <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="column">
                  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <TD CLASS="colTDLabel" valign="top">
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                     </TD>
                     <!--</xsl:if>!-->
                     <TD CLASS="colTDCheckbox" align="left" valign="top">
                            <xsl:call-template name="dispCheckboxField"/>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>

                  <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                     <TD CLASS="colTDCheckbox" align="center">
                            <xsl:attribute name="CLASS">colTDTextmultiple</xsl:attribute>
                            <NOBR>

                                   <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                                   
                                          <xsl:call-template name="RequiredFieldHandler_me">
                                                 <xsl:with-param name="curr_fld"
                                                                 select=".."/>
                                          </xsl:call-template>
                                   </xsl:if>
                                   <xsl:call-template name="dispCheckboxField"/>
                            </NOBR>
                     </TD>
              </xsl:if>
       </xsl:template>
       <!-- TEXTAREA Handler -->
       <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                     <TD CLASS="colTDLabel" valign="top" align="right">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD valign="top">

                     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">                     
                            <xsl:attribute name="CLASS">colTDTextarea</xsl:attribute>
                            <xsl:attribute name="COLSPAN">3</xsl:attribute>
                     </xsl:if>
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                     
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispTextareaField">
                                   <!--<xsl:with-param name="curr_fld" select = "./.."/>!-->
                                   <xsl:with-param name="position">column</xsl:with-param>                                   
                            </xsl:call-template>
                            <!-- kallu  parameterising the abv templte-->
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- HIDDEN field Handler -->
       <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="column">

              <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">              
                     <TD CLASS="DispNone">
                            <INPUT TYPE="HIDDEN">
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </INPUT>
                     </TD>
              </xsl:if>

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                  <TD CLASS="DispNone">
                     <INPUT TYPE="HIDDEN">
                            <xsl:call-template name="ATTR_Handler">
                                   <xsl:with-param name="curr_fld" select=".."/>
                            </xsl:call-template>
                     </INPUT>
                  </TD>
              </xsl:if>
       </xsl:template>
       <!-- INPUT TYPE=FILE Handler -->
       <xsl:template match="FIELD/TYPE[text()='FILE']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                     <TD CLASS="colTDLabel" valign="top">
                            <xsl:attribute name="align">right</xsl:attribute>
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDFile" valign="top">
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispFileField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- INPUT TYPE=FILE Handler -->
       <xsl:template match="FIELD/TYPE[text()='FIELDSET']" mode="column">
              <TD CLASS="colTDFieldSet" valign="top">
                     <!-- if the Field of type=fieldset have column="2" , it is assumed that it spans 2 cols ie., 3,4.!-->
                     <!-- if the Field of type=fieldset have column="1" , it can span 2 or 4 cols.   
                     				if the colspan=2, then there will be ONE FIELD per row.
                     				if the colspan=4, then there will be TWO FIELD per row.
                     
                     				This assuption needs to be keep in mind while generating the UIxml.
                     			!-->
                     <xsl:if test="../@COL = 2">
                            <xsl:attribute name="COLSPAN">
                                   <xsl:text>2</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
                     <xsl:if test="../@COL = 1">
                            <xsl:attribute name="COLSPAN">
                                   <xsl:value-of select="../COLSPAN"/>
                            </xsl:attribute>
                     </xsl:if>
                     <FIELDSET CLASS="FieldsetNormal" style="Margin-right:10px;">
                            <LEGEND>
                                   <b>
                                          <xsl:call-template name="dispLabelField"/>
                                   </b>
                            </LEGEND>
                            <TABLE summary="" border="0" cellpadding="1"
                                   cellspacing="0"
                                   style="table-layout:fixed;width:100%;">
                                   <!-- Handle all rows in the page , RBHCHK - If a row with col=1 doesn't exist, it will not display that row -->
                                   <xsl:for-each select="../FIELD[@COL=1]">
                                          <xsl:sort select="@ROW"
                                                    data-type="number"
                                                    order="ascending"/>
                                          <!-- Handle all rows within a page !-->
                                          <xsl:call-template name="RowHandler_fs">
                                                 <xsl:with-param name="curr_row"
                                                                 select="@ROW"/>
                                          </xsl:call-template>
                                   </xsl:for-each>
                            </TABLE>
                     </FIELDSET>
              </TD>
       </xsl:template>
       <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="column">
              <xsl:variable name="test">
                     <xsl:value-of select="../@COL"/>
              </xsl:variable>
              <xsl:variable name="btnAlign">
                     <xsl:if test="$test= '1'">left</xsl:if>
                     <xsl:if test="$test = '2'">left</xsl:if>
              </xsl:variable>

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                     <TD CLASS="colTDButtonblank">
                            <NOBR>
                                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </NOBR>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDButton" align="{$btnAlign}">

			<xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                     		<xsl:attribute name="align">center</xsl:attribute>
			</xsl:if>
                     <NOBR>
                            <xsl:call-template name="dispButtonField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- Row Handler -->
       <xsl:template name="RowHandler_fs">
              <xsl:param name="curr_row" select="."/>
              <TR CLASS="colTRRow">
                     <xsl:apply-templates select="../FIELD[@ROW=$curr_row]/TYPE"
                                          mode="column">
                            <xsl:sort select="../@COL" data-type="number"
                                      order="ascending"/>
                     </xsl:apply-templates>
              </TR>
       </xsl:template>
       
  <!-- sundar retroved GROUP, IMG, PASSWORD type handler from FCJRadTool -->
  <!-- Group Handler -->
  <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY' ]" mode="column">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
     <TD CLASS="colTDGroupblank">
      <NOBR>
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
      </NOBR>
     </TD>
    </xsl:if>
    <TD valign="top">
       <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
          <xsl:attribute name="CLASS">colTDGroup</xsl:attribute>
          <xsl:if test = "../TYPE = 'LABEL_ONLY'">
              <xsl:attribute name="CLASS">colTDLabel</xsl:attribute>
          </xsl:if>
       </xsl:if>
       <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
          <xsl:attribute name="align">center</xsl:attribute>
       </xsl:if>
      <NOBR> 
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
           <xsl:call-template name="RequiredFieldHandler_me">
              <xsl:with-param name="curr_fld" select=".."/>
           </xsl:call-template>
        </xsl:if>
        <xsl:call-template name="dispGroupField" />
      </NOBR> 
    </TD>
  </xsl:template>
  
<!-- IMG Handler -->
<xsl:template match="FIELD/TYPE[text()='IMG']" mode="column">
  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
   <TD CLASS="colTDImgblank">
    <NOBR>
      <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </NOBR>
   </TD>
  </xsl:if>
  <TD valign="top">
     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
        <xsl:attribute name="CLASS">colTDImg</xsl:attribute>
     </xsl:if>
     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="align">center</xsl:attribute>
     </xsl:if>
    <NOBR> 
      <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
         <xsl:call-template name="RequiredFieldHandler_me">
            <xsl:with-param name="curr_fld" select=".."/>
         </xsl:call-template>
      </xsl:if>
      <xsl:call-template name="dispImgField" />
    </NOBR> 
  </TD>
</xsl:template>

<!-- PASSWORD Handler -->
<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="column">
  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
     <TD CLASS="colTDLabel" align="right" valign="top">
        <xsl:call-template name="dispLabelField"/>
     </TD>
  </xsl:if>
  <TD valign="top">
     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
        <xsl:attribute name="CLASS">colTDText</xsl:attribute>
     </xsl:if>
     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="align">center</xsl:attribute>
     </xsl:if>
     <NOBR>
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
           <xsl:call-template name="RequiredFieldHandler_me">
              <xsl:with-param name="curr_fld" select=".."/>
           </xsl:call-template>
        </xsl:if>
        <xsl:call-template name="dispPasswordField"/>
     </NOBR>
  </TD>
</xsl:template>
<!-- sundar ends here -->
	<!-- End of Col_GlobalInput.xsl" -->
	<!-- Start of GlobalInput.xsl -->

	<!--<xsl:import href="GlobalCore.xsl"/>-->


	<!-- Generic Entity Handler -->
    <xsl:template name="dispEntityField">
        <xsl:param name="EntityType" />
        <!-- Call the appropriate template based on the entity --> 
        <xsl:choose>
            <xsl:when test="$EntityType = 'AMOUNT'">
                <xsl:call-template name="dispAmountField" />
            </xsl:when>
            <xsl:when test="$EntityType = 'ACCOUNT'">
                <xsl:call-template name="dispTextField" >
                    <xsl:with-param name="EntityType" select="$EntityType" />	
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'BRANCH'">
                <xsl:call-template name="dispTextField" >
                    <xsl:with-param name="EntityType" select="$EntityType" />	
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CURRENCY'">
                <xsl:call-template name="dispTextField" >
                    <xsl:with-param name="EntityType" select="$EntityType" />	
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CUSTOMER'">
                <xsl:call-template name="dispTextField" >
                    <xsl:with-param name="EntityType" select="$EntityType" />	
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'DATE'">
                <xsl:call-template name="dispDateField" />
            </xsl:when>
            <xsl:when test="$EntityType = 'MASK'">
                <xsl:call-template name="dispMaskField" />
            </xsl:when>
            <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
                <xsl:call-template name="dispRestrictedTextField" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="dispTextField" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Takes care of features common in Amount Field of Absolute/Column Positioning -->
    <xsl:template name="dispAmountField">
        <!-- sundar added May 8...RELATED_FIELD should have only DBC... -->
        <xsl:variable name="relFld" select="../RELATED_FIELD"/>
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
        <!-- Display Text box for Amount -->
        <!-- sundar May 8...for RELATED_FILED 
        <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{../RELATED_FIELD}')">-->
        <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
        </INPUT>

        <!-- Display Required Flag 
        <xsl:call-template name="RequiredFieldHandler">
                <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>-->
        <INPUT TYPE="TEXT" CLASS="TextAmount" onactivate="acceptInputAmount('{../NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{../NAME}', '{$relatedFld}')" >			
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:attribute name="style">
                <xsl:text>{text-align:</xsl:text>
                <xsl:text>right;}</xsl:text>
            </xsl:attribute>
                        
        <!--xsl:attribute name="MAXLENGTH1"-->
		<xsl:attribute name="length.max">
		<xsl:if test="not(contains(../MAXLENGTH,','))">
                   <xsl:value-of select="../MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="contains(../MAXLENGTH,',')">
                    <xsl:value-of select="substring-before(../MAXLENGTH,',') - substring-after(../MAXLENGTH,',')"/>
                </xsl:if>
            </xsl:attribute>

            <!-- sundar added May 14...for MIN_VAL and MAX_VAL -->
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

            <!--<xsl:if test="../MIN_VAL != '' or ../MAX_VAL != ''"> -->
          <!--  <xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
            </xsl:attribute>-->
            <!--</xsl:if> -->
	        
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
                     
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
        </INPUT>
    </xsl:template>


    <!-- Takes care of features common in Date Field of Absolute/Column Positioning -->
    <xsl:template name="dispDateField">
        <!-- sundar May 8...for REF_FIELD -->
        <xsl:variable name="refFld" select="../REF_FIELD"/>
        <xsl:variable name="referFld">
            <xsl:if test="contains($refFld,'__')">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($refFld,'__'))">
                <xsl:value-of select="$refFld"/>
            </xsl:if>
        </xsl:variable>
	<!-- Display Text box for Date -->
	<INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
	</INPUT>

        <!-- Display Required Flag 
        <xsl:call-template name="RequiredFieldHandler">
                <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>-->
        <INPUT TYPE="TEXT" CLASS="TextDate"  onactivate="acceptInputDate('{../NAME}')" onbeforedeactivate="validateInputDate('{../NAME}')" >
            <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes added if-->
            <xsl:if test="$dateDelimiterReqd = 'Y'">
                <xsl:attribute name="onkeyup">                     
                    <xsl:text>autoPopSep('{../NAME}', event);</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
   	        <xsl:attribute name="SIZE">
                <xsl:value-of select="11"/>
            </xsl:attribute>	
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
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

            <!-- Display Calendar Button  -->
            <xsl:if test="count(../LOV) = 0">      
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">
                    <BUTTON CLASS="ButtonLov" title="Calendar" tabindex="0" type="button" onclick="disp_cal('{../NAME}', '{../NAME}I')"><!--Fix for 17235409-->
                        <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Calendar.gif" title="Calendar"/> -->
                        <SPAN class="IMGLov BtnCalender" title="Calendar"></SPAN><!-- Data Uri changes -->
                    </BUTTON>
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../LOV) &gt; 0">
                <xsl:call-template name="LovHandler">
                    <xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
            </xsl:if>
	</INPUT>
    </xsl:template>

    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispMaskField">
        <xsl:param name="EntityType"/>
        <!-- Display Text box for Date -->
        <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
        </INPUT>
        <!-- Display Text box -->
        <INPUT TYPE="TEXT" CLASS="TextNormal" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
    </xsl:template>

    <!-- Takes care of features common in RestrictedText Field of Absolute/Column Positioning -->
    <xsl:template name="dispRestrictedTextField">    
        <xsl:param name="EntityType"/>
        <!-- Display Text box -->
	<INPUT TYPE="TEXT" CLASS="TextNormal" onblur="validateRestrictedTextValue(this)">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="../TYPE='RESTRICTED_TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
                <xsl:attribute name="style">
                    <xsl:text>{text-align:right;}</xsl:text>
		</xsl:attribute>
            </xsl:if>
            <!-- Set the maximum number of characters user can enter -->
        		<xsl:if test="normalize-space(../MAXLENGTH) = ''">
            <xsl:attribute name="MAXLENGTH">
			<xsl:value-of select="number(../MAXLENGTH)"/>
			</xsl:attribute>
	    </xsl:if>
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
            <xsl:if test="count(../MAXLENGTH) = 0">
		<xsl:attribute name="MAXLENGTH">
                <xsl:value-of select="../SIZE"/>
		</xsl:attribute>
            </xsl:if>
            <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
                <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute> 
            </xsl:if>
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select=".." />
		<xsl:with-param name="EntityType" select="$EntityType" />
            </xsl:call-template>
            <xsl:if test="count(../POPUPEDIT) &gt; 0">
                <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
                    <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                    </xsl:if>
                    <xsl:call-template name="Popup_Handler" />
                    <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" title="{$narrative_SummaryAudit}"/>-->
                    <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
                </BUTTON>
            </xsl:if>
	</INPUT>
    </xsl:template>

    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispTextField">
        <xsl:param name="EntityType"/>
        <!-- Display Text box -->
	<INPUT TYPE="TEXT" CLASS="TextNormal" >
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="../TYPE='TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
                <xsl:attribute name="style">
                    <xsl:text>{text-align:right;}</xsl:text>
		</xsl:attribute>
            </xsl:if>
            <!-- Set the maximum number of characters user can enter -->
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
            <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
                <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute>       
            </xsl:if>
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
            
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select=".." />
		<xsl:with-param name="EntityType" select="$EntityType" />
            </xsl:call-template>

            <!-- sundar added for NEO...for a text field, both lov & popup can appear -->
            <xsl:if test="$Brn_Neo != ''">
                <xsl:if test="count(../LOV) = 0 ">
                    <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
                        <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
                            <xsl:call-template name="Popup_Handler" />
                            <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" title="{$narrative_SummaryAudit}"/>-->
                            <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
			</BUTTON>
                    </xsl:if>
		</xsl:if>
            </xsl:if>
            <xsl:if test="$Brn_Neo = ''">   
                <xsl:if test="count(../POPUPEDIT) &gt; 0">
                    <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
                        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                            <xsl:attribute name="tabindex">-1</xsl:attribute>
                        </xsl:if>
                        <xsl:call-template name="Popup_Handler" />
                        <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" title="{$narrative_SummaryAudit}"/>-->
                        <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
                    </BUTTON>
                </xsl:if>
            </xsl:if>
        </INPUT>
    </xsl:template>


    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispSelectField">
        <!-- Display Select List -->
	<SELECT CLASS="SELECTList">
            <xsl:attribute name="ID">
                <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            </xsl:attribute>

            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
                     
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
        
            <xsl:if test="count(../MULTIPLE) &gt; 0 and ../MULTIPLE = -1">
                <xsl:attribute name="MULTIPLE">MULTIPLE</xsl:attribute>
            </xsl:if>
            
            <xsl:if test="count(../WIDTH) &gt; 0">
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="../WIDTH" />
                    <xsl:text>;}</xsl:text>
      		</xsl:attribute>
            </xsl:if>
            		
            <xsl:for-each select="../OPTION">
                <OPTION CLASS="SELECTListOption" VALUE="{@VALUE}">
                    <xsl:if test="count(@SELECTED) &gt; 0 and @SELECTED=-1">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                        <!-- Sundar added on jul 23 for DEFAULT -->
                        <xsl:attribute name="DEFAULT">
                            <xsl:value-of select="@VALUE"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="." />
		</OPTION>
            </xsl:for-each>
	</SELECT>
    </xsl:template>

    <!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
    <xsl:template name="dispCheckboxField">
    	<!-- Display Checkbox -->
        <INPUT TYPE="CHECKBOX" CLASS="INPUTCheckbox">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>

            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
            </xsl:if>
                     
             <!-- for multiple entry text fields needs add title and * !--> 
             <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
	</INPUT>
    </xsl:template>
	

	<!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
    <xsl:template name="dispTextareaField">
        <xsl:param name="position" select="."/>
        <TEXTAREA CLASS="TEXTAREASmall">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." /> 
            </xsl:call-template>
                        
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count(../MAXLENGTH) != 0">
                    <xsl:value-of select="../MAXLENGTH" />
                </xsl:if>
                <xsl:if test="count(../MAXLENGTH) = 0">
                    <xsl:value-of select="../SIZE" />
                </xsl:if>
            </xsl:attribute>
                     
            <!--<xsl:attribute name="STYLE"><xsl:text>width:90%;</xsl:text></xsl:attribute>!-->
            <xsl:if test="$position = 'absolute'">                     
            <!--<xsl:if test="(count(../HEIGHT) &gt; 0 and  ../HEIGHT != '') or (count(../WIDTH) &gt; 0 and ../WIDTH != '')">  -->
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="../WIDTH"/>
                    <xsl:text>px;height:</xsl:text>
                    <xsl:value-of select="../HEIGHT"/>
                    <xsl:text>px;}</xsl:text>
                </xsl:attribute>
            <!--</xsl:if>    -->
            </xsl:if>
                     
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if> 
	</TEXTAREA>

        <!-- sundar added May 15.. popup edit for textarea -->
	<xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
            <BUTTON class="BUTTONInline" title="{$narrative_SummaryAudit}" tabindex="0" type="button" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"><!--Fix for 17235409-->
                <xsl:call-template name="Popup_Handler" />
                <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" title="{$narrative_SummaryAudit}"/>-->
                <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
            </BUTTON>
	</xsl:if>
    </xsl:template>


    <!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
    <xsl:template name="dispFileField">
        <!-- Display File -->
	<INPUT TYPE="File" CLASS="TextFile" >
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
                     
            <!-- for multiple entry text fields needs add title and * !--> 
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                <xsl:attribute name="title">
                    <xsl:value-of select="../LABEL"/>
                    <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                </xsl:attribute>
            </xsl:if>
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

	<!-- Set the maximum number of characters user can enter -->
        <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT'">
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count(../MAXLENGTH) != 0">
                    <xsl:value-of select="../MAXLENGTH" />
                </xsl:if>
                <xsl:if test="count(../MAXLENGTH) = 0">
                    <xsl:if test="count(../SIZE) != 0">
                        <xsl:value-of select="../SIZE" />
                    </xsl:if>
                    <xsl:if test="count(../SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                        <xsl:text>16</xsl:text>
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
        </xsl:if>

	<xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
            <xsl:attribute name="CLASS">TextReadonly</xsl:attribute>
      
            <xsl:if test="$curr_fld/TYPE[text() != 'MASK']" >
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
            <xsl:attribute name="CLASS">TextDisabled</xsl:attribute>
        </xsl:if>
			
	<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY" />
            </xsl:attribute>
	</xsl:if>
             <!-- Sundar Jun08 .. Support for TAB INDEX -->
        <xsl:attribute name="TABINDEX">
            <xsl:value-of select="$curr_fld/TABINDEX" />
        </xsl:attribute>
        
	<xsl:apply-templates select="$curr_fld/EVENT"/>
    </xsl:template>

	<!-- Hidden Date Handler -->
    <xsl:template name="ATTR_HiddenEntity_Handler">
        <xsl:param name="curr_fld" select="." />
    
        <xsl:if test="count($curr_fld/VALUE) &gt; 0 and $curr_fld/TYPE != 'CHECKBOX'">
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
         <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED = '-1'">
        <xsl:attribute name="REQUIRED">
            <xsl:text>true</xsl:text>
        
        </xsl:attribute>
        </xsl:if>
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
        <!--Reddy Prasad Added Here -->
        <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="$curr_fld/LABEL" />
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
	
	<xsl:apply-templates select="$curr_fld/CUSTOM"/>
    </xsl:template>


    <!-- Handler for Required Flag -->
    <xsl:template name="RequiredFieldHandler">
        <xsl:param name="curr_fld" select="." />
        <!-- Display Required Flag -->
	<xsl:if test="$curr_fld/REQUIRED = -1"> 
            <SPAN CLASS="SPANFlag" title="Required Field">*</SPAN>
	</xsl:if>
		
	<xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED != -1"> 
            <SPAN CLASS="SPANFlag" title="Required Field" style="visibility:hidden;">*</SPAN>
	</xsl:if>

    </xsl:template>

    <!-- Handler for LOV -->
    <xsl:template name="LovHandler">
        <xsl:param name="curr_fld" />
	<xsl:param name="EntityType" />

        <xsl:if test="$Brn_Neo != ''">
            <xsl:if test="count($curr_fld/LOV) &gt; 0 and (count($curr_fld/READ_ONLY) = 0 or $curr_fld/READ_ONLY = 0)">        
                <!--<BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" -->
                <!-- 10.2sp1   Security Chnages      <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')"-->
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}','{substring-before($Brn_Neo, '__')}','{$curr_fld/LOV/NAME}')"
                        onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'" ><!--Fix for 17235409-->
                                             
                    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                        <xsl:attribute name="READONLY">-1</xsl:attribute>
                    </xsl:if>                              
                    <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
                        <xsl:attribute name="READONLY">-1</xsl:attribute>
                    </xsl:if>                              
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="List of Values"/>-->
                    <SPAN class="IMGLov BTNLov" title="List of Values"></SPAN><!--Data Uri -->
                </BUTTON>
            </xsl:if>
        </xsl:if>
        <xsl:if test="$Brn_Neo = ''">
            <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
                <!--<BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" -->
                <!--10.2 sp1 security chnages-->
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="{normalize-space($curr_fld/LOV/NAME)}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}', '{$containerId}', '{normalize-space($curr_fld/LOV/NAME)}')"
                       onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'" ><!--Fix for 17235409-->
                    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                        <xsl:attribute name="DISABLED"/>
                    </xsl:if>
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"/>-->
                    <SPAN class="IMGLov BTNLov"></SPAN><!--Data Uri -->
		</BUTTON>
            </xsl:if>
        </xsl:if>

	<xsl:if test="count($curr_fld/LOV) = 0 ">
            <xsl:if test="$EntityType = 'ACCOUNT' ">
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="Account.show_lov()"><!--Fix for 17235409-->
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"  />-->
                    <SPAN class="IMGLov BTNLov"></SPAN><!--Data Uri -->
		</BUTTON>
            </xsl:if>
	    
            <xsl:if test="$EntityType = 'BRANCH' ">
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="Branch.show_lov()"><!--Fix for 17235409-->
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"  />-->
                    <SPAN class="IMGLov BTNLov"></SPAN><!--Data Uri -->
		</BUTTON>
            </xsl:if>

            <xsl:if test="$EntityType = 'CURRENCY' ">
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="Currency.show_lov()"><!--Fix for 17235409-->
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"  />-->
                    <SPAN class="IMGLov BTNLov"></SPAN><!--Data Uri -->
		</BUTTON>
            </xsl:if>
	    
            <xsl:if test="$EntityType = 'CUSTOMER' ">
                <BUTTON CLASS="ButtonLov" title="LOV" tabindex="0" type="button" ONCLICK="Customer.show_lov()"><!--Fix for 17235409-->
                    <!--<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Icons/Lov.gif"  />-->
                    <SPAN class="IMGLov BTNLov"></SPAN><!--Data Uri -->
                </BUTTON>
            </xsl:if>
	</xsl:if>
    </xsl:template>


    <!-- Handler for POPUP Editor -->
    <xsl:template name="Popup_Handler">
        <!-- <xsl:param name="lov_name" select="." /> -->
        <xsl:attribute name="ONCLICK">
            <xsl:text>show_editor('</xsl:text><xsl:value-of select="../NAME"/><xsl:text>','</xsl:text>
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>
	    
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
            <xsl:text>','</xsl:text>
            <xsl:value-of select="../POPUPEDIT/TITLE" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="../POPUPEDIT/OK_LABEL" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="../POPUPEDIT/CANCEL_LABEL" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="../POPUPEDIT/OK_IMG_SRC" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="../POPUPEDIT/CANCEL_IMG_SRC" />
            <xsl:text>');</xsl:text>
        </xsl:attribute>
    </xsl:template>
	
    <xsl:template name="UPPERCASE">
        <xsl:param name="event_func" select="." />
        <xsl:attribute name="onChange" >
            <xsl:value-of select="$event_func" />
        </xsl:attribute>   	            
    </xsl:template>


    <xsl:template name="ATTR_Handler">
        <xsl:param name="curr_fld" select="." />
        <!-- Kals On June 9 For Err prompt of FldLabl  in err mesage --> 
	<xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="$curr_fld/LABEL"/>
	</xsl:attribute>
        <!-- Kals Ends here -->
        <xsl:variable name = "Blk_DBT">
            <xsl:if test="count($curr_fld/DBT) &lt; 1">
                <xsl:value-of select = "$curr_fld/../DBT"/>
            </xsl:if>      
        </xsl:variable>
    
	<xsl:attribute name="ID">
            <xsl:if test="count($curr_fld/DBT) &gt; 0">
                <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
            </xsl:if>
        </xsl:attribute>

	<xsl:attribute name="DBT">
            <xsl:if test="count($curr_fld/DBT) &gt; 0">
                <xsl:value-of select="$curr_fld/DBT" />
            </xsl:if>   
        </xsl:attribute>

        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/DBC" />
	</xsl:attribute>
		
	<xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME" />
        </xsl:attribute>
		
	<xsl:attribute name="DTYPE">
            <xsl:value-of select="$curr_fld/DTYPE" />
	</xsl:attribute>

        <xsl:if test="count($curr_fld/VALUE) &gt; 0 and $curr_fld/TYPE != 'CHECKBOX'">
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$curr_fld/VALUE" />
            </xsl:attribute>
            <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'SELECT' and $curr_fld/TYPE != 'CHECKBOX' and normalize-space($curr_fld/VALUE) != ''">
                <xsl:attribute name="DEFAULT">
                    <xsl:value-of select="$curr_fld/VALUE" />
                </xsl:attribute>
            </xsl:if>
	</xsl:if>

        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE" />
	</xsl:attribute>

        <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
            <xsl:attribute name="ROWS"><xsl:value-of select="$curr_fld/ROWS"/></xsl:attribute>
            <xsl:attribute name="COLS"><xsl:value-of select="$curr_fld/COLS"/></xsl:attribute>            
        </xsl:if>

	<xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
             <!-- Kals On May 28 , add make it Readonly unconditionally , FCJIssues 2 -->
             <xsl:attribute name="CLASS">TextReadonly</xsl:attribute>       	     
             <!-- kals Ends -->
             <!-- Kals June 2 adding Attribute  INPUT_LOV -->
             <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
               <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
             
                     
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0">
               <xsl:attribute name="CLASS">TextReadonly</xsl:attribute>       	     
               <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
            </xsl:if>
                  
            <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
                <xsl:attribute name="CLASS">TextAreaReadonly</xsl:attribute>
            </xsl:if>
                     
            <xsl:if test = "$curr_fld[TYPE = 'CHECKBOX']">
                <xsl:attribute name="CLASS">INPUTCheckBoxReadonly</xsl:attribute>
            </xsl:if>
	</xsl:if>

        <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
            <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
            <xsl:attribute name="CLASS">TextDisabled</xsl:attribute>
        </xsl:if>

        <xsl:if test = "$curr_fld[TYPE = 'CHECKBOX'] or $curr_fld[TYPE = 'SELECT']">
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
        </xsl:if>

	<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY" />
            </xsl:attribute>
	</xsl:if>

        <xsl:apply-templates select="$curr_fld/EVENT"/>
	<xsl:apply-templates select="$curr_fld/CUSTOM"/>
     <xsl:if test="count($curr_fld/REQUIRED) &gt; 0 and $curr_fld/REQUIRED = '-1'">
	<xsl:attribute name="REQUIRED">
            <xsl:text>true</xsl:text>
	</xsl:attribute>
        </xsl:if>
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
    
        <!-- Kals Aprl 13 .. Support for <HIDDEN> -1</HIDDEN> -->
        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
            <xsl:attribute name="CLASS">hidden</xsl:attribute>
        </xsl:if>
        <!-- Kals Aprl 13 .. Support for TAB INDEX -->
        <!--<xsl:if test="$curr_fld/TYPE != 'RADIO'"> -->
        <xsl:attribute name="TABINDEX">
          <xsl:value-of select="$curr_fld/TABINDEX" />
        </xsl:attribute>
        <!--</xsl:if> --> 
      
        <!-- sundar May 15...for AMENDABLE and SUBSYSTEM -->
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

        <!-- Sundar May 14..for MIN_VAL and MAX_VAL -->
        <xsl:if test="$curr_fld/TYPE != 'AMOUNT' and $curr_fld/DTYPE = 'NUMBER'">
            <xsl:if test="normalize-space($curr_fld/MIN_VAL) != ''">
                <xsl:attribute name="MIN_VAL">
                  <xsl:value-of select="$curr_fld/MIN_VAL"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="normalize-space($curr_fld/MAX_VAL) != ''">        
                <xsl:attribute name="MAX_VAL">
                    <xsl:value-of select="$curr_fld/MAX_VAL"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="normalize-space($curr_fld/MAX_DECIMAL) != ''">                
                <xsl:attribute name="MAX_DECIMALS">
                    <xsl:value-of select="$curr_fld/MAX_DECIMAL"/>
                </xsl:attribute>
            </xsl:if>
        
           <!-- <xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>    -->       
            <!--</xsl:attribute>-->
        </xsl:if>
    </xsl:template>

<!-- sundar added -->
    <!-- Takes care of features common in Group Field of Absolute/Column Positioning -->
    <xsl:template name="dispGroupField">
        <NOBR>
            <LABEL >
                <xsl:call-template name="ATTR_Handler">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:value-of select="../LABEL" />
            </LABEL>
	</NOBR>
    </xsl:template>

<!-- Takes care of features common in Img Field of Absolute/Column Positioning -->
<xsl:template name="dispImgField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}">
        <xsl:attribute name="STYLE">
          <xsl:text>height:</xsl:text>
          <xsl:value-of select="../HEIGHT"/>
          <xsl:text>px;width:</xsl:text>
          <xsl:value-of select="../WIDTH"/>
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
        
        <xsl:call-template name="ATTR_Handler">
          <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
        <xsl:if test="count(../ALT) &gt; 0">
  		    <xsl:attribute name="ALT">
            <xsl:value-of select="../ALT" />
	        </xsl:attribute>
        </xsl:if>
    </IMG>
</xsl:template>


<!-- Takes care of features common in Img Field of Absolute/Column Positioning -->
<xsl:template name="dispPasswordField">

		<INPUT TYPE="PASSWORD" CLASS="TextNormal"  onpaste ="return false;" >

			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select=".." />
   	  </xsl:call-template>

			<!-- Set the maximum number of characters user can enter -->
			<xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
          <xsl:value-of select="../MAXLENGTH" />
        </xsl:if>
  
        <xsl:if test="count(../MAXLENGTH) = 0">
          <xsl:value-of select="../SIZE" />
        </xsl:if>
			</xsl:attribute>
      
      <!-- Sundar May 10..for text-align 
     	<xsl:if test="count(../TEXT-ALIGN) &gt; 0">
      	    <xsl:attribute name="STYLE">
				<xsl:text>{TEXT-ALIGN:</xsl:text>
				<xsl:value-of select="../TEXT-ALIGN" />
				<xsl:text>;}</xsl:text>
	        </xsl:attribute>
        </xsl:if>-->

       <!-- for multiple entry text fields needs add title and * !--> 
      <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
         <xsl:value-of select="../LABEL"/>
         <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
        </xsl:attribute>
      </xsl:if>
		</INPUT>

</xsl:template>
<!-- sundar ends here -->

	<!-- Handler for Events -->
	<xsl:template match="EVENT">
		<xsl:attribute name="{./NAME}">
      <xsl:if test="$funcId != 'C' or ($funcId = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($funcId = 'C' and count(../NAME) = 0)">
        <xsl:value-of select="./FUNCTION" />
      </xsl:if>
      <xsl:if test="$funcId = 'C' and (../NAME = 'BTN_OK' or ../NAME = 'BTN_EXIT')">
<!--        <xsl:value-of select="concat(substring-before(./FUNCTION,'('),'_',$screen,'()')"/> -->
       <xsl:if test="../NAME = 'BTN_OK'">
              <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
       </xsl:if>
       <xsl:if test="../NAME = 'BTN_EXIT'">
              <xsl:text>fnExit_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
       </xsl:if>
      </xsl:if>
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

<!-- sundar added template of displabelfield -->
	<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
	<xsl:template name="dispLabelField">
		
		<NOBR> 
			<LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
	
				<xsl:call-template name="ATTR_Handler_lbs">
				    <xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:attribute name="FOR">
                                          <xsl:if test="../DBT != ''">
                                                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                                          </xsl:if>
                                          <xsl:if test="../DBT = ''">
                                                 <xsl:value-of select="../DBC"></xsl:value-of>
                                          </xsl:if>
				</xsl:attribute>
                         <xsl:attribute name="value"> 
                        	 <xsl:value-of select="../LABEL"></xsl:value-of>
                         </xsl:attribute>         
				<!--
				<xsl:if test="count(../HIDDEN) &gt;= 1 and ../HIDDEN = -1">
					<xsl:attribute name="CLASS">
						<xsl:text>hidden</xsl:text>
					</xsl:attribute>
				</xsl:if>
				!-->
				
				<xsl:call-template name="dispLabelCaption">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:call-template name="RequiredFieldHandler">
                                   <xsl:with-param name="curr_fld" select=".." />
                            </xsl:call-template>
			</LABEL>
		
		</NOBR>
		
	</xsl:template>

	
	<xsl:template name="dispLabelCaption">
		
		<xsl:param name="curr_fld" select="." />
	
		<!-- Labels with Access Key are being underlined -->
<!-- 		<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and contains($curr_fld/LABEL , $curr_fld/ACCESSKEY)"> -->
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">    
    			<xsl:value-of select="substring-before($curr_fld/LABEL,$curr_fld/ACCESSKEY)"/>
            <U>
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
            </U>
    			<xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
		</xsl:if>
 		<xsl:if test="count($curr_fld/ACCESSKEY) = 0 or (count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) = '') or not(contains($curr_fld/LABEL , $curr_fld/ACCESSKEY))">
			<xsl:value-of select="$curr_fld/LABEL" />
		</xsl:if>

		<!-- if no label is present , keep &nbsp to complete the TD. !-->
		<xsl:if test="$curr_fld/LABEL = ''">
			<xsl:text disable-output-escaping="yes">&#160;</xsl:text>
		</xsl:if>
              
       </xsl:template>

<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
<xsl:template name="dispButtonField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Button -->
    <BUTTON CLASS="INPUTButton" >
      <xsl:if test="contains(../NAME,'BTN_PREV')">
        <xsl:attribute name="CLASS">BtnPrevRow</xsl:attribute>
        <xsl:attribute name="title">Previous</xsl:attribute><!--Fix for 17235409-->
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_NEXT')">
        <xsl:attribute name="CLASS">BtnNextRow</xsl:attribute>
        <xsl:attribute name="title">Next</xsl:attribute><!--Fix for 17235409-->
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_ADD')">
        <xsl:attribute name="CLASS">BtnAddRow</xsl:attribute>
        <xsl:attribute name="title">Add</xsl:attribute><!--Fix for 17235409-->
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_REMOVE')">
        <xsl:attribute name="CLASS">BtnDelRow</xsl:attribute>
        <xsl:attribute name="title">Delete</xsl:attribute><!--Fix for 17235409-->
      </xsl:if>
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
<!--
        <xsl:call-template name="dispLabelCaption">
		    <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
-->
        <xsl:value-of select="../LABEL"/><!--HTML5 Changes -->
     	<xsl:if test="count(../SRC) &gt; 0">
			<!-- Display Image -->
		    <IMG id="{../NAME}_IMG" SRC="{../SRC}" >
		     	<xsl:if test="count(../ALT) &gt; 0">
		  		    <xsl:attribute name="ALT">
			          	<xsl:value-of select="../ALT" />
			        </xsl:attribute>
		        </xsl:if>
		    </IMG>
		</xsl:if>        
    </BUTTON>
</xsl:template>
	<!-- End of GlobalInput.xsl -->
	<!-- Start of GlobalCore.xsl -->
	<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
	<!--
	<xsl:template name="dispLabelField">
		
		<NOBR> 
			<LABEL CLASS="LABELNormal">
	
				<xsl:call-template name="ATTR_Handler_lbs">
				    <xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:attribute name="FOR">
                                          <xsl:if test="../DBT != ''">
                                                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                                          </xsl:if>
                                          <xsl:if test="../DBT = ''">
                                                 <xsl:value-of select="../DBC"></xsl:value-of>
                                          </xsl:if>
				</xsl:attribute>
                         <xsl:attribute name="value"> 
                        	 <xsl:value-of select="../LABEL"></xsl:value-of>
                         </xsl:attribute>         
				
				<xsl:call-template name="dispLabelCaption">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:call-template name="RequiredFieldHandler">
                                   <xsl:with-param name="curr_fld" select=".." />
                            </xsl:call-template>
			</LABEL>
		
		</NOBR>
		
	</xsl:template>
	-->
	<!--
	<xsl:template name="dispLabelCaption">
		
		<xsl:param name="curr_fld" select="." />
	
		
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

		
		<xsl:if test="$curr_fld/LABEL = ''">
			<xsl:text disable-output-escaping="yes">&#160;</xsl:text>
		</xsl:if>
              
       </xsl:template>
	-->

	<!-- Button Handler -->
  
	<xsl:template match="FIELD/TYPE[text()='BUTTON']">   
   		<xsl:if test="$gPosition='column'">
        
			<TD CLASS="colTDButton" >
    				<NOBR> 
                                   <xsl:call-template name="dispButtonField" />
    				</NOBR> 
			</TD>
   		</xsl:if>
	</xsl:template>

	<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
	<!--
	<xsl:template name="dispButtonField">
		
		
		<BUTTON CLASS="INPUTButton" >      
                     <xsl:if test="count(../SRC) &gt; 0">            
                            <xsl:attribute name="CLASS">INPUTStdButton_img</xsl:attribute>
                     </xsl:if>
			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select=".." />
   	   		</xsl:call-template>

			<xsl:call-template name="dispLabelCaption">
				<xsl:with-param name="curr_fld" select=".." />
   	   		</xsl:call-template>

                     <xsl:if test="count(../SRC) &gt; 0">            
		
				<IMG id="{../NAME}_IMG" SRC="{../SRC}" >
					<xsl:if test="count(../ALT) &gt; 0">
						<xsl:attribute name="ALT">
							<xsl:value-of select="../ALT" />
						</xsl:attribute>
					</xsl:if>
				</IMG>
			</xsl:if>        
		</BUTTON>
	</xsl:template>
	-->
	<!-- IMG Handler -->
	<xsl:template match="FIELD/TYPE[text()='IMG']">
   		
   		<xsl:if test="$gPosition!='column'">
			<TD CLASS="colTDImg" >
    				<NOBR> 
	   				<xsl:call-template name="dispImgField" />
    				</NOBR> 
			</TD>
   		</xsl:if>
	</xsl:template>

	<!-- Takes care of features common in Img Field of Absolute/Column Positioning -->
<!--
	<xsl:template name="dispImgField">
		<IMG CLASS="IMGButton" SRC="{../SRC}">
			<xsl:call-template name="ATTR_Handler">
			    <xsl:with-param name="curr_fld" select=".." />
			</xsl:call-template>
			<xsl:if test="count(../ALT) &gt; 0">
				<xsl:attribute name="ALT">
					<xsl:value-of select="../ALT" />
				</xsl:attribute>
			</xsl:if>
		</IMG>
	</xsl:template>
-->
	<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispStdButtonField">
      <!-- Display Required Flag 
      <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN> -->	
      <!-- Display Button -->
      <BUTTON CLASS="INPUTStdButton" >
          <xsl:call-template name="ATTR_Handler">
              <xsl:with-param name="curr_fld" select=".." />
          </xsl:call-template>

          <xsl:call-template name="dispLabelCaption">
              <xsl:with-param name="curr_fld" select=".." />
          </xsl:call-template>
          <xsl:if test="count(../SRC) &gt; 0">
              <!-- Display Image -->
              <IMG id="{../NAME}_IMG" SRC="{../SRC}" >
                  <xsl:if test="count(../ALT) &gt; 0">
                      <xsl:attribute name="ALT">
                          <xsl:value-of select="../ALT" />
                      </xsl:attribute>
                  </xsl:if>
              </IMG>
          </xsl:if>        
      </BUTTON>
  </xsl:template>

  <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispStdButtonField_img">    
      <!-- Display Button -->
      <BUTTON CLASS="INPUTStdButton_img" >
          <xsl:call-template name="ATTR_Handler">
              <xsl:with-param name="curr_fld" select=".." />
          </xsl:call-template>

          <xsl:call-template name="dispLabelCaption">
              <xsl:with-param name="curr_fld" select=".." />
          </xsl:call-template>

          <xsl:if test="count(../SRC) &gt; 0">
              <!-- Display Image -->
              <IMG id="{../NAME}_IMG" SRC="{../SRC}" >
                <xsl:if test="count(../ALT) &gt; 0">
                    <xsl:attribute name="ALT">
                        <xsl:value-of select="../ALT" />
                    </xsl:attribute>
                </xsl:if>
              </IMG>
          </xsl:if>        
      </BUTTON>
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
		
		<!--<xsl:apply-templates select="$curr_fld/EVENT"/>
		<xsl:apply-templates select="$curr_fld/CUSTOM"/>-->
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

	<!-- End of GlobalCore.xsl -->
	<!-- Start of GlobalAudit.xsl -->
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <!--<xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> -->
       
       
       
       <xsl:template name="Audit">
              <xsl:variable name="auditId"
                            select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
              <!--checking weather the uixml has the audit entry or not-->
              
            <!-- Kals for Call Form Buttons -->
            <xsl:if test = "$Brn_Neo = ''">
              <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                  <xsl:call-template name = "shwCallFmrsBtns"></xsl:call-template>
              </xsl:if>
            </xsl:if>
              <xsl:variable name="l_gWidth">
                <xsl:if test="$gPosition = 'column'">
                    <xsl:value-of select="'790'"/>
                </xsl:if>
                <xsl:if test="$gPosition = 'absolute'">
                    <xsl:value-of select="$gWidth"/>
                </xsl:if>                
              </xsl:variable>
              <DIV CLASS="DivAudit" id="DIV_{$auditId}" style="width:{$l_gWidth}px;">
                     
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($gBlkButCount &gt; 0 or $gBlkButImgCount &gt; 0)">
                        <xsl:attribute name="id"><xsl:text>DIV_AUDIT_BUTTONS</xsl:text></xsl:attribute>                        
                     </xsl:if>

                      <xsl:call-template name="AuditAbs_Pos_Handler"/>
                      
                     <TABLE cellpadding="1" cellspacing="0"
                            summary="Audit information" border="0"
                            style="width:100%" DBT="{/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DBT}">
                            <TR >
                                   <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                                   <!-- Kals Apr 24 .. Calling Neo template .. Shud switch to appropriate tmplt based on Brn or Neo-->
                                   <xsl:if test = "$Brn_Neo = ''"> 
                                      <xsl:variable name = "AuditType">
                                        <xsl:value-of select = "/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE"/>
                                      </xsl:variable>
                                      
                                      <xsl:if test = "($AuditType = 'M' and ($typeString != 'T' and $typeString != 'P'))">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry_Neo"/>
                                     </xsl:if>                           
                                     
                                      <xsl:if test = "($AuditType = 'T' and ($typeString != 'T' and $typeString != 'P'))">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry_Neo_Online"/>
                                     </xsl:if>                           
                                  </xsl:if>                           
                                     
                                   <!-- Kals Ends -->  
                                                               
                                   </xsl:if>
                                   <xsl:if test = "$Brn_Neo != ''">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry"/>
                                   </xsl:if>                          
                                   
                                   <xsl:if test="($typeString = 'T' or $typeString = 'P' and $isChildFunc='N')">
                                                 <xsl:call-template name="AuditEntry_Neo_Process"/>
                                   </xsl:if>

    
                                   <xsl:if test="(count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($typeString != 'T' and $typeString != 'P'))">
                                          <td CLASS="THEADAudit" style="width:95%">
                                                 <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                          </td>
                                   </xsl:if>
                                   <xsl:call-template name="StdBtnEntry"/>
                            </TR>
                     </TABLE>
              </DIV>
              
              
              <xsl:if test = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE = 'T'">
                <xsl:call-template name = "CacheAuditValues"/>
              </xsl:if>
              
              
       </xsl:template>
       
       
       <xsl:template match="BLOCK" mode="AuditEntry">
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE CLASS="TABLEAudit" DBT="{DBT}" summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:500px;">
                            <TR CLASS="TRAudit">
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Input By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_ID"
                                                        id="{DBT}__MAKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                                        <!-- Kals June 4 Making the size 13 SIZE="8" -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <!-- <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_DT_STAMP"
                                                        id="{DBT}__MAKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/> -->
                                                     <INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP"/>
												     <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>   
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
	                                   	<NOBR>
	                                   		<INPUT TYPE="HIDDEN" CLASS="TEXTAudit numeric" name="MOD_NO" id="{DBT}__MOD_NO" READONLY="true" MAXLENGTH="4" SIZE="3"/>
	                                   	</NOBR>	
                                   		<!-- <xsl:text disable-output-escaping="yes">&#160;</xsl:text> -->
                                   </TD>
                            </TR>
                            <TR CLASS="TRAudit">
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Authorized By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_ID"
                                                        id="{DBT}__CHECKER_ID" READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                                        <!-- Kals June 4 Making the size 13 SIZE="8" -->
                                                        
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <!-- <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_DT_STAMP"
                                                        id="{DBT}__CHECKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/> -->
                                                      <INPUT TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" />                                                        
     												  <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
                                   		<NOBR>
	                                   		<INPUT TYPE="CHECKBOX" style="display:none"  name="AUTH_STAT" id="{DBT}__AUTH_STAT" DISABLED="true" />
                                   		</NOBR>
	                                   	<NOBR>	
											<INPUT TYPE="CHECKBOX" style="display:none" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DISABLED="true" />
										</NOBR>	
										<NOBR>
											<INPUT TYPE="CHECKBOX" style="display:none" name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" />
										</NOBR>	
                                   		<!-- <xsl:text disable-output-escaping="yes">&#160;</xsl:text> -->
                                   </TD>
                                   
                            </TR>
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <xsl:template name="StdBtnEntry">
       
              <xsl:if test="$gBlkButCount &gt; 0">
                     <TD class="THEADAudit" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']"
                                                 mode="BlockStdButtons"/>
                     </TD>
              </xsl:if>
              <xsl:if test="$gBlkButImgCount &gt; 0">
                     <TD class="THEADAudit" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']"
                                                 mode="BlockStdButtonsImg"/>
                     </TD>
              </xsl:if>
       </xsl:template>
       
       
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtonsImg">
              <NOBR>
                     <DIV CLASS="DivStdButtonImg">
                            <TABLE border="0" cellpadding="0" cellspacing="2"
                                   summary="Button container">
                                   <TR>
                                          <TD>
                                                 <input Type="reset"
                                                        style="visibility:HIDDEN;width:1px;height:1px"
                                                        id="id_reset_1"/>
                                          </TD>
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButtonImg"
                                                     align="right">
                                                        <xsl:call-template name="dispStdButtonField_img"/>
                                                 </TD>
                                          </xsl:for-each>
                                   </TR>
                            </TABLE>
                     </DIV>
              </NOBR>
       </xsl:template>
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtons">
              <xsl:variable name="fldCnt"
                            select="count(./FIELD/TYPE[text()='BUTTON'])"/>
              <DIV CLASS="DivStdButton">
                     <TABLE CLASS="TABLEstdButton" border="0" cellpadding="1"
                            summary="Button container" cellspacing="1">
                            <xsl:if test="$fldCnt &lt; 3">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButton"
                                                     align="right">
                                                        <NOBR>
                                                               <xsl:call-template name="dispStdButtonField"/>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:for-each>
                                   </tr>
                            </xsl:if>
                            <xsl:if test="$fldCnt &gt; 2">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &lt; ceiling($fldCnt div 2)+1">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                   </tr>
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &gt; ceiling($fldCnt div 2)">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                          <xsl:if test="$fldCnt mod 2 != 0">
                                                 <TD CLASS="TDstdButton">
                                                        <NOBR>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:if>
                                   </tr>
                            </xsl:if>
                     </TABLE>
              </DIV>
       </xsl:template>
       
      <!-- kals Apr 24 .. Changed Audit for Neo -->
       <xsl:template match="BLOCK" mode="AuditEntry_Neo">        
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE CLASS="TABLEAudit" summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:500px;">
                            <TR CLASS="TRAudit">
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Input By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_ID"
                                                        id="{DBT}__MAKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                    <INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                          </NOBR>
                                   </TD>
                                      <TD CLASS="TDAudit">
                                        <NOBR>
                                          <!--<LABEL CLASS="LABELNormal">Mod NO</LABEL> Saidul Changed on 28th May-->
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Modification Number</LABEL><!-- 12.1 screen height change -->
                                        </NOBR>
                                      </TD>
                                      <TD CLASS="fieldAudit">
                                        <NOBR>
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit numeric" name="MOD_NO" id="{DBT}__MOD_NO" DBT="{DBT}" DBC="MOD_NO" READONLY="true" MAXLENGTH="4" SIZE="3"/>
                                        </NOBR>
                                      </TD>
                                   
                                   
                                  
                            </TR>
                            <TR CLASS="TRAudit">
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Authorized By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_ID"
                                                        id="{DBT}__CHECKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                                 <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                          </NOBR>
                                   </TD>
                                   
                                    <TD CLASS="fieldAudit">
                                      <NOBR>
                                        <INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                        <LABEL>Open</LABEL>
                                      </NOBR>
                                    </TD>
                                  
                                    <TD CLASS="fieldAudit">
                                      <NOBR>
                                        <INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                        <LABEL>Authorized</LABEL>
                                      </NOBR>
                                    </TD>
                                    <TD CLASS="TDAudit" align="left">
                                      <NOBR>
                                        <INPUT TYPE="HIDDEN" CLASS="CHECKBOXAudit" name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/>
                                      </NOBR>
                                    </TD>
                            </TR>
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <!-- Kals Separting the template for Maintennance and Online Screens -->
       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
        
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE  summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:700px;">
                            <TR CLASS="TRAudit">
                                     <TD CLASS="TDAudit"> <xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Input By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                          
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Authorized By</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Date Time</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                   </TD>
                                <TD CLASS="TDAudit">
                                   <NOBR>                                    
                                        <xsl:if test = "$contractStatus = -1">
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Contract Status</LABEL>  <!-- 12.1 screen height change -->                                        
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Collection Status</LABEL>    <!-- 12.1 screen height change -->                                      
                                        </xsl:if>                                          
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Collection Status</LABEL>   <!-- 12.1 screen height change -->                                       
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">payment Status</LABEL>           <!-- 12.1 screen height change -->                               
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Process  Status</LABEL>    <!-- 12.1 screen height change -->                                      
                                        </xsl:if>  
                                        <xsl:if test = "$dealStatus = -1">
                                          <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Deal Status</LABEL>     <!-- 12.1 screen height change -->                                     
                                        </xsl:if>
                                        
                                        
                                    </NOBR>
                                 </TD>
                                      
                                   <TD CLASS="TDAudit">
                                     <xsl:if test = "$authStatus = -1">
                                        <NOBR>                                              
                                            <INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </NOBR>
                                            <LABEL>Authorized</LABEL>                                        
                                     </xsl:if> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                        <LABEL>Collection Status</LABEL>                                        
                                     </xsl:if>
                                     
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                        <LABEL>Payment Status</LABEL>                                        
                                     </xsl:if>

                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                        <LABEL>Process Status</LABEL>                                        
                                     </xsl:if>
                                     
                                    </TD>
                                   
                            </TR>
                            
                            <!-- Sec Row -->
                            <TR>
                            
                           <TD CLASS="TDAudit"> <xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                             <TD CLASS="fieldAudit">
                                <NOBR>
                                   <INPUT TYPE="TEXT"
                                      CLASS="TEXTAudit"
                                      name="MAKERID"
                                      id="{DBT}__MAKERID"
                                      DBT="{DBT}"
                                      DBC="MAKERID"
                                      READONLY="true"
                                      MAXLENGTH="12" SIZE="12"/>
                                  </NOBR>
                               </TD>
                               <TD CLASS="fieldAudit">
                                  <NOBR>
                                      <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                      <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKERSTAMPI" id="MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                   </NOBR>
                                </TD>
                                <TD CLASS="fieldAudit">
                                   <NOBR>
                                       <INPUT TYPE="TEXT"
                                          CLASS="TEXTAudit"
                                          name="CHECKERID"
                                          id="{DBT}__CHECKERID"
                                          DBT="{DBT}"
                                          DBC="CHECKERID"
                                          READONLY="true"
                                          MAXLENGTH="12" SIZE="12"/>
                                    </NOBR>
                                 </TD>
                                 <TD CLASS="fieldAudit">
                                     <NOBR>
                                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKERSTAMPI" id="CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                     </NOBR>
                                 </TD>
                                 
                                    
                                  <TD CLASS="fieldAudit">
                                        
                                        <xsl:if test = "$contractStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="CONTSTAT" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if>                                            
                                       
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="DEAL_STATUS" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>
                                    </TD>
                                    <TD CLASS="fieldAudit"> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>                                     
                                     </xsl:if>
                                     
                                     <xsl:text disable-output-escaping="yes">&#160;</xsl:text>

                                    </TD>                                    
                              </TR>

          <!-- If Reversal is present in the Audit add fields for Reversal too -->
                <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>

                   <TR>                            
                             <TD STYLE = "color:#CCCCCC;">
                                  <xsl:if test = "$Reversal = -1">                             
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Reversal</LABEL><!-- 12.1 screen height change -->
                                          </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                  
                                  
                              </TD>
                              
                             <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                      <NOBR>
                                         <INPUT TYPE="TEXT"
                                            CLASS="TEXTAudit"
                                            name="REVR_MAKERID"
                                            id="{DBT}__REVR_MAKERID"
                                            DBT="{DBT}"
                                            DBC="REVR_MAKERID"
                                            READONLY="true"
                                            MAXLENGTH="12" SIZE="12"/>
                                        </NOBR>
                                  </xsl:if>           
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                  
                                        
                               </TD>
                               <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                    <NOBR>
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                     </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                     
                                </TD>
                                <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                
                                     <NOBR>
                                         <INPUT TYPE="TEXT"
                                            CLASS="TEXTAudit"
                                            name="REVR_CHECKERID"
                                            id="{DBT}__REVR_CHECKERID"
                                            DBT="{DBT}"
                                            DBC="REVR_CHECKERID"
                                            READONLY="true"
                                            MAXLENGTH="12" SIZE="12"/>
                                      </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                      
                                 </TD>
                                 <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                 
                                       <NOBR>
                                          <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                       </NOBR>
                                  </xsl:if>                                                                                 
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                  
                                 </TD>
                                  <TD CLASS="fieldAudit">
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Collection Status</LABEL>  <!-- 12.1 screen height change -->                                        
                                      </xsl:if>  
                                      
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Payment Status</LABEL>                    <!-- 12.1 screen height change -->                      
                                      </xsl:if>  
                                      
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Payment Status</LABEL>                         <!-- 12.1 screen height change -->                 
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Payment Status</LABEL>                      <!-- 12.1 screen height change -->                    
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Process Status</LABEL>                    <!-- 12.1 screen height change -->                      
                                      </xsl:if>  
                                      
                                      <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;">Process Status</LABEL>                 <!-- 12.1 screen height change -->                         
                                      </xsl:if>  
                                      
                                  </TD>
                                    <TD CLASS="fieldAudit"> 
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                    </TD>                                    
                                 
                              </TR>
                            
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <!-- Added By Fahad as part of Process Screens -->
       
       <xsl:template name="AuditEntry_Neo_Process">
          <td CLASS="THEADAudit" style="width:95%">
                 <TABLE CLASS="TABLEAudit" summary=""
                        cellpadding="0" cellspacing="0" border="0"
                        style="width:500px;">
                        <TR CLASS="TRAudit">
                               <TD CLASS="TDAudit" style="vertical-align:top">
                                      <NOBR>
                                             <LABEL CLASS="LABELAudit" style="margin-top:0px;">Remarks</LABEL>
                                      </NOBR>
                               </TD>
                               <TD CLASS="fieldAudit">
                                      <NOBR>
                                            <TEXTAREA CLASS="TEXTAREASmall"                                                    
                                                    name="AUDIT_FIELD"
                                                    ROWS="2"
                                                    COLS="35"
                                                    id="AUDIT_FIELD"
                                                    READONLY="false"/>
                                      </NOBR>
                               </TD>
                               <TD CLASS="TDAudit">
                                    <NOBR>
                                            <BUTTON CLASS="INPUTButton" TITLE="Audit" ID="BTN_AUDIT" NAME="BTN_AUDIT" onclick="fnBpelAudit()">Audit</BUTTON><!--Fix for 17235409-->
                                    </NOBR>
                               </TD>                               
                               
                               <TD CLASS="fieldAudit">
                                      <NOBR>    
                                                <SELECT CLASS="SELECTList" ID="PROCESS_ACTIONS" STYLE="width:200px;">
                                                    <OPTION CLASS="SELECTListOption" VALUE="ACCEPT">ACCEPT</OPTION>                                                    
                                                </SELECT>                                                
                                      </NOBR>
                               </TD>
                        </TR>
                 </TABLE>
          </td>
    </xsl:template>

       
       
       
       
       

<!-- Kals On June 28 Template to caceh Audit Values in case of online -->
    <xsl:template name = "CacheAuditValues">
    <script language = "javascript"  DEFER="DEFER"> 
         
        //Added By Saidul;Label desc has been extracted for the contract status.
        /*
        var LBL_CONSTAT_ACTIVE  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_ACTIVE");
        var LBL_CONSTAT_CLOSED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_CLOSED");
        var LBL_CONSTAT_EXERCISED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_EXERCISED");
        var LBL_CONSTAT_HOLD  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_HOLD");
        var LBL_CONSTAT_KNOCKEDIN  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_KNOCKEDIN");
        var LBL_CONSTAT_CANCELLED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_CANCELLED");
        var LBL_CONSTAT_LIQUIDATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_LIQUIDATED");
        var LBL_CONSTAT_REVERSED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_REVERSED");
        var LBL_CONSTAT_KNOCKEDOUT  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_KNOCKEDOUT");
        var LBL_CONSTAT_EXPIRED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_EXPIRED");
        var LBL_CONSTAT_UNINITIATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_UNINITIATED");
        var LBL_CONSTAT_OPEN  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_OPEN");
        var LBL_CONSTAT_REV_INITIATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_REV_INITIATED");
        var LBL_CONSTAT_REV_PARTIALLY  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_REV_PARTIALLY");
        var LBL_CONSTAT_LAUNCH_INITIATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_LAUNCH_INITIATED");
        var LBL_CONSTAT_LAUNCHED_PARTIALLY  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_LAUNCHED_PARTIALLY");
        var LBL_CONSTAT_CAN_INITIATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_CAN_INITIATED");
        var LBL_CONSTAT_CAN_PARTIALLY  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_CAN_PARTIALLY");
        var LBL_CONSTAT_LAUNCHED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_LAUNCHED");
	var LBL_CONSTAT_TERMINATED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_CONSTAT_TERMINATED");
        */

        l_OnlineAuditVals["A"]=LBL_CONSTAT_ACTIVE;
	l_OnlineAuditVals["C"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["E"]=LBL_CONSTAT_EXERCISED;
	l_OnlineAuditVals["H"]=LBL_CONSTAT_HOLD;
	l_OnlineAuditVals["I"]=LBL_CONSTAT_KNOCKEDIN;
	l_OnlineAuditVals["K"]=LBL_CONSTAT_CANCELLED;
	l_OnlineAuditVals["L"]=LBL_CONSTAT_LIQUIDATED;
	l_OnlineAuditVals["R"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["S"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["V"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["W"]=LBL_CONSTAT_KNOCKEDOUT;
	l_OnlineAuditVals["X"]=LBL_CONSTAT_EXPIRED;
	l_OnlineAuditVals["Y"]=LBL_CONSTAT_UNINITIATED;
	l_OnlineAuditVals["O"]=LBL_CONSTAT_OPEN;
	l_OnlineAuditVals["T"] = LBL_CONSTAT_TERMINATED;
        
        // Start Cont Stat Vaules are added by Saidul For TN Team.        
        l_OnlineAuditVals["F"]=LBL_CONSTAT_REV_INITIATED;
        l_OnlineAuditVals["J"]=LBL_CONSTAT_REV_PARTIALLY;
        l_OnlineAuditVals["B"]=LBL_CONSTAT_LAUNCH_INITIATED;
        l_OnlineAuditVals["G"]=LBL_CONSTAT_LAUNCHED_PARTIALLY;
        l_OnlineAuditVals["D"]=LBL_CONSTAT_CAN_INITIATED;
        l_OnlineAuditVals["Z"]=LBL_CONSTAT_CAN_PARTIALLY;
        l_OnlineAuditVals["Q"]=LBL_CONSTAT_LAUNCHED;
        // End Cont Stat Vaules are added by Saidul For TN Team.
        
        
        l_OnlineAuditDesc[LBL_CONSTAT_ACTIVE]="A";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="C";
	l_OnlineAuditDesc[LBL_CONSTAT_EXERCISED]="E";
	l_OnlineAuditDesc[LBL_CONSTAT_HOLD]="H";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDIN]="I";
	l_OnlineAuditDesc[LBL_CONSTAT_CANCELLED]="K";
	l_OnlineAuditDesc[LBL_CONSTAT_LIQUIDATED]="L";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="R";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="S";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="V";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDOUT]="W";
	l_OnlineAuditDesc[LBL_CONSTAT_EXPIRED]="X";
	l_OnlineAuditDesc[LBL_CONSTAT_UNINITIATED]="Y";
	l_OnlineAuditDesc[LBL_CONSTAT_OPEN]="O";
	l_OnlineAuditDesc[LBL_CONSTAT_TERMINATED]="T";
        
        // Start Cont Stat  Vaules are added by Saidul For TN Team.
	l_OnlineAuditDesc[LBL_CONSTAT_REV_INITIATED]="F";
	l_OnlineAuditDesc[LBL_CONSTAT_REV_PARTIALLY]="J";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCH_INITIATED]="B";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED_PARTIALLY]="G";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_INITIATED]="D";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_PARTIALLY]="Z";
        l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED]="Q";
        
        // End Cont Stat  Vaules are added by Saidul For TN Team.
        
        var l_OnlineProcessStatusVals = new Array();
        //Added By Saidul;Label desc has been extracted for the process status.
        /*
        var LBL_PROCESSTAT_PEND_AUTH  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
        var LBL_PROCESSTAT_PEND_RELEASE  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
        var LBL_PROCESSTAT_PROCESSED  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_PROCESSED");
        var LBL_PROCESSTAT_FAILED_VERIFICATION  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
        var LBL_PROCESSTAT_HOLD  = dlgArg.mainWin.frames["Global"].getItemDesc("LBL_PROCESSTAT_HOLD");
        */
        
        l_OnlineProcessStatusVals["N"] = LBL_PROCESSTAT_PEND_AUTH;
        l_OnlineProcessStatusVals["A"] = LBL_PROCESSTAT_PEND_RELEASE;
        l_OnlineProcessStatusVals["P"] = LBL_PROCESSTAT_PROCESSED;
        l_OnlineProcessStatusVals["F"] = LBL_PROCESSTAT_FAILED_VERIFICATION;
        l_OnlineProcessStatusVals["H"] = LBL_PROCESSTAT_HOLD;
        
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_AUTH]="N";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_RELEASE]="A";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PROCESSED]="P";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_FAILED_VERIFICATION]="F";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_HOLD]="H";
  </script>
    </xsl:template>

    <xsl:template name = "shwCallFmrsBtns">
      <xsl:variable name="noOfRows">
        <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
          <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
            <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
          </xsl:if>
          <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
            <xsl:value-of select="1"/>
          </xsl:if>
        </xsl:if>
        <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
          <xsl:value-of select="1"/>
        </xsl:if>
      </xsl:variable>
<!--      <DIV id="DIV_SUBSCR_CALLFORM" style="width:{$gWidth}px;height:{$noOfRows * 32}px;"> -->
      <DIV id="DIV_SUBSCR_CALLFORM" style="width:{$gWidth}px;">
        <xsl:if test="$gPosition = 'absolute'">      
            <xsl:attribute name="style">
                 <xsl:text>position:absolute;top:</xsl:text>
                 <xsl:if test="count(TAB/PAGE) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                 </xsl:if>
                 <xsl:if test="count(TAB/PAGE) &gt; 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt"/>
                 </xsl:if>
                 <xsl:text>px;left:0px;width:</xsl:text>
                 <xsl:value-of select="$gWidth"/>
<!--                 <xsl:text>px;overflow-y:auto;height:</xsl:text>
                 <xsl:value-of select="$noOfRows * 32"/> -->
                 <xsl:text>px;</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <xsl:variable name="noOfButtons" select="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM)"/>
        <xsl:variable name="buttonsPerRow" select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTONS_PER_ROW"/>
        <xsl:for-each select = "//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM">                    
          <xsl:variable name = "fnc" select = "FUNCTION"></xsl:variable>
          <xsl:variable name = "lbl" select = "LABEL"></xsl:variable>
          <xsl:if test="(position() = 1) or position() mod $buttonsPerRow  = 1">
            <xsl:text disable-output-escaping="yes">&lt;TABLE cellspacing=0 cellpadding=0 &gt;</xsl:text>
            <xsl:text disable-output-escaping="yes">&lt;TR&gt;</xsl:text>
          </xsl:if>
<!--          
          <xsl:if test="position() = 1 or position() mod $buttonsPerRow  = 1">          
            <TD style="width:100%"></TD>
          </xsl:if>
-->          
<!--
          <TD>
            <BUTTON onclick = "{$fnc}" class = "INPUTButtonSubSystem_sum">
              <xsl:value-of select = "$lbl" />
            </BUTTON>
          </TD>  
-->
            <TD  nowrap="yes" onclick = "{$fnc}" class = "INPUTButtonSubSystem_main">
                <xsl:value-of select = "$lbl" />
            </TD>

          <xsl:if test="position() mod $buttonsPerRow = 0 or position() = $noOfButtons">
            <TD style="width:100%"></TD>
            <xsl:text disable-output-escaping="yes"> &lt;/TR&gt;</xsl:text>
            <xsl:text disable-output-escaping="yes"> &lt;/TABLE&gt;</xsl:text>                    
          </xsl:if>
        </xsl:for-each>  
      </DIV>
    </xsl:template>
    <xsl:template name="AuditAbs_Pos_Handler">
        <xsl:variable name="noOfRows">
          <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
            <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
              <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
            </xsl:if>
            <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
              <xsl:value-of select="1"/>
            </xsl:if>
          </xsl:if>
          <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
            <xsl:value-of select="1"/>
          </xsl:if>
        </xsl:variable>
        <xsl:if test="$gPosition = 'absolute'">
            <xsl:attribute name="style">
                 <xsl:text>position:absolute;top:</xsl:text>
                 <xsl:if test="count(TAB/PAGE) = 0">
                        <!-- sundar -->
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                    </xsl:if>
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                      <xsl:if test="$noOfRows &gt; 1 or ($noOfRows = 1 and count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 1)">
                        <xsl:value-of select="$gContexHgt + $gHeight + ($noOfRows * 30) + 2"/>
                      </xsl:if>
                      <xsl:if test="$noOfRows = 1 and count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 1">
                        <xsl:value-of select="$gContexHgt + $gHeight + ($noOfRows * 30) + 4"/>
                      </xsl:if>
                    </xsl:if>
                 </xsl:if>
                 <xsl:if test="count(TAB/PAGE) &gt; 0">
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt"/>
                    </xsl:if>
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt + ($noOfRows * 30) + 2"/>
                    </xsl:if>
                 </xsl:if>
                 <xsl:text>px;left:0px;width:</xsl:text>
                 <xsl:value-of select="$gWidth"/>
<!--                 <xsl:text>px;border:2px solid #118ddc;overflow-y:auto;</xsl:text> -->
                 <xsl:text>px;overflow-y:auto;</xsl:text>
          </xsl:attribute>
        </xsl:if>
    </xsl:template>       
	<!-- End of GlobalAudit.xsl -->
	<!-- Start of GlobalTabs.xsl -->
       <xsl:template name="DisplayTabs">
              <table CLASS="TABLETab" id="SYS_TBL_TABS"
                     style="table-layout:auto;width:100%"
                     summary="Tab Group headers" border="0" cellpadding="0"
                     cellspacing="0">
                    <THEAD id="THeadTab">
                    
                      <xsl:for-each select="/FORM/SCREEN[@NAME=$screen]/TAB/PAGE">
                        <TH>
                          <xsl:if test="position()!=1">
                            <b id="b1" class="b1d"></b><b id="b2" class="b2d"></b>
                          </xsl:if>
                          <xsl:if test="position()=1">
                            <b id="b1" class="c1d"></b><b id="b2" class="c2d"></b>
                          </xsl:if>
                          <DIV></DIV>
                       </TH>
                      </xsl:for-each>
                   </THEAD>
                     <tr CLASS="TRTab" id="TRTab">
                            <xsl:apply-templates select="TAB/PAGE"/>
                            <td CLASS="TDTabBlank" style="width:100%;">
                                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </td>
                     </tr>
              </table>
       </xsl:template>
       
       <xsl:template match="TAB/PAGE">
              <td CLASS="TDTab" onclick="changeTabPage(this)"
                  onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}">
                     <xsl:if test="position()=1">
                            <xsl:attribute name="CLASS">
                                   <xsl:text>TDTabSelected</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
                     <NOBR>
                            <LABEL CLASS="LABELNormal" style="width:{$labelWidth}px;"><!-- 12.1 screen height change -->
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select="."/>
                                   </xsl:call-template>
                                   <a href="#" class="LinkTAB">
                                          <xsl:if test="count(LABEL) &gt; 0">
                                                 <xsl:call-template name="dispLabelCaption">
                                                        <xsl:with-param name="curr_fld"
                                                                        select="."/>
                                                 </xsl:call-template>
                                          </xsl:if>
                                   </a>
                            </LABEL>
                     </NOBR>
              </td>
       </xsl:template>	
	<!-- End of GlobalTabs.xsl -->
</xsl:stylesheet>
