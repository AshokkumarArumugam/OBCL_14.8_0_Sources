<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="GlobalTemplateInput.xsl"/>
    <xsl:import href="Tmp_GlobalInput.xsl"/>
    <xsl:import href="GlobalMultiple_Template.xsl"/>
    
  <xsl:template match="HEADER/PAGE" mode="template">
        <xsl:variable name="tabId" select="@ID"/>
        <xsl:variable name="secCount" select="count(SECTION)" />
        <xsl:variable name="partCount" select="count(SECTION/PARTITION)" />
        
        <div class="DIVHeader" ID="TBLPage{@ID}">
        <xsl:variable name="pagId" select="@ID"/>
        <xsl:for-each select="SECTION">
            <!-- <div class="DivSection"> -->
            <div class="DIVThreeColSectionContainer">
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
                <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>
                
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
                                <xsl:value-of select="'DIVThreeColSectionContainer'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                            <xsl:attribute name="class">
                                <xsl:value-of select="'DIVColumnDouble'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="$partWidth = '66'"> 
                            <xsl:attribute name="class">
                                <!-- <xsl:value-of select="'DivPart2'" /> -->
                                <xsl:value-of select="'DIVColumnDouble'" />
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">
                                <!-- <xsl:value-of select="'DivPart3'" /> -->
                                <xsl:value-of select="'DIVColumnOne'" />
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:choose>
                        <xsl:when test="FSREQ = 'Y' ">
                            <fieldset class="FIELDSETNormal"><legend><xsl:value-of select="LABEL"/></legend>
                            <xsl:call-template name="SectionHandler_Header">
                                <xsl:with-param name="secId" select="$secId" />
                                <xsl:with-param name="partId" select="$partId" />
                                <xsl:with-param name="tabId" select="$tabId" />
                                <xsl:with-param name="pagId" select="$pagId" />
                                <xsl:with-param name="partWidth" select="$partWidth" />
                            </xsl:call-template>
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
                    </xsl:choose>
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

    <div class="DIVTabPageContent" id="tabcontentcontainer">
        <xsl:variable name="sc" >
            <xsl:number value="position()" format="1"  />
        </xsl:variable>
        <div class="DIVTabPage" id="TBLPage{@ID}">
            <xsl:variable name="pagId" select="@ID" />
            <xsl:for-each select="SECTION">

                <!-- <div class="DivSection"> -->
                <div class="DIVThreeColSectionContainer">
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
                <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:variable name="secId" select="@ID"/>
                
                <xsl:variable name="meBlkSeView" select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]/FIELD[@TABPAGE = $tabId])"/>
                <xsl:if test="$meBlkSeView &gt; 0">             
                    <DIV>
                        <xsl:variable name="blk" select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]"/>
                        <xsl:attribute name="ID"><xsl:value-of select="$blk/ID"/></xsl:attribute>
                        <xsl:attribute name="VIEW"><xsl:value-of select="$blk/@VIEW"/></xsl:attribute>
                        <xsl:call-template name="PartitionHandler">
                            <xsl:with-param name="secId" select="$secId" />
                            <xsl:with-param name="tabId" select="$tabId" />
                            <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                            <xsl:with-param name="pagId" select="$pagId" />
                            
                        </xsl:call-template>
                    </DIV>
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

        <div class="DIVHeader" ID="TBLPage{@ID}">
        <xsl:variable name="pagId" select="@ID"/>

        <xsl:for-each select="SECTION">
            <!-- <div class="DivSection"> -->
            <div class="DIVThreeColSectionContainer">
                <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
                <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'TwoColSectionContainer'"/>
                    </xsl:attribute>
                </xsl:if>
            
            <xsl:variable name="secId" select="@ID"/>
<!--            <xsl:variable name="meBlkSeView" select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]/FIELD[@TABPAGE = $tabId])"/>
            <xsl:if test="$meBlkSeView &gt; 0">             
                <DIV>
                    <xsl:variable name="blk" select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId]"/>
                    <xsl:attribute name="ID"><xsl:value-of select="$blk/ID"/></xsl:attribute>
                    <xsl:attribute name="VIEW"><xsl:value-of select="$blk/@VIEW"/></xsl:attribute>
                    <xsl:call-template name="PartitionHandler">
                        <xsl:with-param name="secId" select="$secId" />
                        <xsl:with-param name="tabId" select="$tabId" />
                        <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                        <xsl:with-param name="pagId" select="$pagId" />
                        
                    </xsl:call-template>
                </DIV>
            </xsl:if> 
            <xsl:if test="$meBlkSeView = 0">  -->
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
            <DIV>
                <xsl:variable name="blk" select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and @TABPAGE=$tabId  and @SECTION = $secId and @PARTITION = $partId]"/>
                <xsl:attribute name="ID"><xsl:value-of select="$blk/ID"/></xsl:attribute>
                <xsl:attribute name="VIEW"><xsl:value-of select="$blk/@VIEW"/></xsl:attribute>
                <xsl:call-template name="PartitionBodyHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="l_scr_type" select="$l_scr_type" />
                    <xsl:with-param name="pagId" select="$pagId" />
                    <xsl:with-param name="partId" select="$partId" />
                </xsl:call-template>
            </DIV>
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
                    <xsl:value-of select="'DIVThreeColSectionContainer'" />
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnDouble'" />
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '66'"> 
                <xsl:attribute name="class">
                    <!-- <xsl:value-of select="'DivPart2'" /> -->
                    <xsl:value-of select="'DIVColumnDouble'" />
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <!-- <xsl:value-of select="'DivPart3'" /> -->
                    <xsl:value-of select="'DIVColumnOne'" />
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:call-template name="multipleEntrySingleViewBtns">
            <xsl:with-param name="secId" select="$secId" />
            <xsl:with-param name="partId" select="$partId" />
            <xsl:with-param name="tabId" select="$tabId" />
            <xsl:with-param name="pagId" select="$pagId" />
            <xsl:with-param name="partWidth" select="$partWidth" />
        </xsl:call-template>

        <xsl:choose>
            <xsl:when test="FSREQ = 'Y' ">
                <fieldset class="FIELDSETNormal"><legend><xsl:value-of select="LABEL"/></legend>
                <xsl:call-template name="SectionHandler">
                    <xsl:with-param name="secId" select="$secId" />
                    <xsl:with-param name="partId" select="$partId" />
                    <xsl:with-param name="tabId" select="$tabId" />
                    <xsl:with-param name="pagId" select="$pagId" />
                    <xsl:with-param name="partWidth" select="$partWidth" />
                </xsl:call-template>
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

    <div class="DIVPagingContainerMESV" id="DIVVerisonBtns">
        <button class="BUTTONInline" onclick="fnOnClick_BTN_PREV_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_PREV_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Previous"><img class="IMGInline" src="{$imgPath_XSL}/BTNPrevious.gif"/></button>
        <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{$l_fccver}__{$l_fccver_dbc}" DBT="{$l_fccver}" DBC="{$l_fccver_dbc}" NAME="VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
            <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='VERNO']/READ_ONLY) = -1">
                <xsl:attribute name="READONLY">true</xsl:attribute>
                <xsl:attribute name="READONLY1">true</xsl:attribute>
            </xsl:if>
        </input>
        of
        <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{$l_latestverno}__{$l_latestverno_dbc}" DBT="{$l_latestverno}" DBC="{$l_latestverno_dbc}" NAME="LATEST_VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
            <xsl:if test="normalize-space(/FORM/BLOCK[@SCREEN=$screen]/FIELD[NAME='LATEST_VERNO']/READ_ONLY) = -1">
                <xsl:attribute name="READONLY">true</xsl:attribute>
                <xsl:attribute name="READONLY1">true</xsl:attribute>
            </xsl:if>
        </input>
        <button class="BUTTONInline" onclick="fnOnClick_BTN_NEXT_VER()" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Next"><img class="IMGInline" src="{$imgPath_XSL}/BTNNext.gif"/></button>
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
        <div class="DIVPagingContainerMESV">
            <button class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Previous" name="BTN_PREV_{$blockId}" onClick="fnMovePrev_{$blockId}()"><img class="IMGInline" src="{$imgPath_XSL}/BTNPrevious.gif"/></button>
            <button class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Next" name="BTN_NEXT_{$blockId}" onClick="fnMoveNext_{$blockId}()"><img class="IMGInline" src="{$imgPath_XSL}/BTNNext.gif"/></button>
            <button class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Add Row" name="BTN_ADD_{$blockId}" onClick="fnAddRow_{$blockId}()"><img class="IMGInline" src="{$imgPath_XSL}/BTNAddrow.gif"/></button>
            <button class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Remove Row" name="BTN_REMOVE_{$blockId}" onClick="fnDelRow_{$blockId}()"><img class="IMGInline" src="{$imgPath_XSL}/BTNRemoveRow.gif"/></button>
        </div>
    </xsl:if>
    
    

</xsl:template>

</xsl:stylesheet>
