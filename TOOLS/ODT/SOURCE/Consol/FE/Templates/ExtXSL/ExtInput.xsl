<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="displayLabelFieldSet_tmp" >
    <xsl:value-of select="LBL" />
</xsl:template>

<xsl:template name="dispNormalLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">        
            <xsl:if test="../LBL != ''">
                <label class="LBLstd">
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
            </xsl:if>
            <xsl:if test="../LBL = ''">
                <label class="LBLstd LBLinv2">
                    <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:value-of select="../NAME"/>
                </label>                
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <label class="LBLstd star">
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
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="dispHiddenLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
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
        
        <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
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

<xsl:template name="dispRadioLabel_tmp" >
    <label class="LBLstd" id="groupidpercentage">
        <xsl:value-of select="../LBL"/>
    </label>
    <xsl:call-template name="dispSpanFlag_tmp" />
</xsl:template>

<xsl:template name="dispSpanFlag_tmp" >
    <xsl:if test="../REQD = 0">
        <img src="Images/star_disabled.gif" title="" ALT=""/>
    </xsl:if>
    <xsl:if test="../REQD = -1">
        <img src="Images/star.gif" title="{$mandatory}" ALT="{$mandatory}"/>
    </xsl:if>
</xsl:template>
  
<xsl:template match="FIELD" mode="hFieldSet" >
    <xsl:apply-templates select="TYPE" mode="template_fldset">
        <xsl:with-param name="l_pos" select="position()"/>
    </xsl:apply-templates>
</xsl:template>

<xsl:template match="FLDSET" mode="withoutSprt" >

    <xsl:for-each select=".">

        <xsl:if test="count(@TYPE='ME' and @VIEW='SE') &gt; 0">
            <DIV>
                <xsl:attribute name="VIEW">
                    <xsl:value-of select="@VIEW"/>
                </xsl:attribute>
                <xsl:variable name="blkId" select="BLOCK"/>
                <div class="DIVPagingContainerMESV" id="MESV_{$blkId}">
                    <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrev_{$blockId}()"><span tabindex="-1" class="ICOprevious"></span></button>
                    <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNext_{$blockId}()"><span tabindex="-1" class="ICOnext"></span></button>
                    <button class="BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" onClick="fnAddRow_{$blockId}()"><span tabindex="-1" class="ICOadd"></span></button>
                    <button class="BTNimg" title="{$delete_row}" name="BTN_REMOVE_{$blockId}" onClick="fnDelRow_{$blockId}()"><span tabindex="-1" class="ICOremove"></span></button>
                </div>
            </DIV>
        </xsl:if>
        <xsl:choose>
            <xsl:when test="HREQ = '-1'">
                <xsl:call-template name="HorzFldSet" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="LBL = ''">
                    <fieldset class="FIELDSETPlaceholder">
                        <legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>
                        <xsl:apply-templates select="FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </fieldset>
                </xsl:if>
                <xsl:if test="LBL != ''">
                    <xsl:if test="@VIEW = 'ME'">
                        <xsl:apply-templates select="./FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    <xsl:if test="count(@VIEW) = 0 or @VIEW != 'ME' or @VIEW = 'SE'">
                        <fieldset class="FIELDSETNormal">
                            <legend>
                                <xsl:call-template name="displayLabelFieldSet_tmp"/>
                            </legend>
                            <xsl:apply-templates select="./FIELD" mode="withoutSubPart" >
                                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </fieldset>
                    </xsl:if>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:for-each>
</xsl:template>

<xsl:template match="FLDSET" mode="withSprt" >

    <xsl:param name="subpartCount" select="."/>
    <xsl:for-each select=".">
        <xsl:if test="count(@TYPE='ME' and @VIEW='SE') &gt; 0">
            <DIV>
                <xsl:attribute name="VIEW">
                    <xsl:value-of select="@VIEW"/>
                </xsl:attribute>
                <xsl:variable name="blkId" select="BLOCK"/>
                <div class="DIVPagingContainerMESV" id="MESV_{$blkId}">
                    <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrev_{$blockId}()"><span tabindex="-1" class="ICOprevious"></span></button>
                    <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNext_{$blockId}()"><span tabindex="-1" class="ICOnext"></span></button>
                    <button class="BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" onClick="fnAddRow_{$blockId}()"><span tabindex="-1" class="ICOadd"></span></button>
                    <button class="BTNimg" title="{$delete_row}" name="BTN_REMOVE_{$blockId}" onClick="fnDelRow_{$blockId}()"><span tabindex="-1" class="ICOremove"></span></button>
                </div>
            </DIV>
        </xsl:if>
        <xsl:choose>
            <xsl:when test="HREQ = '-1'">
                <xsl:call-template name="HorzFldSet" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="LBL = ''">
                    <fieldset class="FIELDSETPlaceholder">
                        <legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>
                        <xsl:variable name="curNode" select="." />
                        <xsl:variable name="count" select="1"/>
                        <xsl:call-template name="dispSprtFlds">
                            <xsl:with-param name="count" select="$count"/>
                            <xsl:with-param name="subpartCount" select="$subpartCount"/>
                        </xsl:call-template>
                    </fieldset>
                </xsl:if>
                <xsl:if test="LBL != ''">
                    <xsl:if test="@VIEW = 'ME'">
                        <xsl:variable name="curNode" select="." />
                        <xsl:variable name="count" select="1"/>
                        <xsl:call-template name="dispSprtFlds">
                            <xsl:with-param name="count" select="$count"/>
                            <xsl:with-param name="subpartCount" select="$subpartCount"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="count(@VIEW) = 0 or @VIEW != 'ME' or @VIEW = 'SE'">
                        <fieldset class="FIELDSETNormal">
                            <legend>
                                <xsl:call-template name="displayLabelFieldSet_tmp"/>
                            </legend>
                            <xsl:variable name="curNode" select="." />
                            <xsl:variable name="count" select="1"/>
                            <xsl:call-template name="dispSprtFlds">
                                <xsl:with-param name="count" select="$count"/>
                                <xsl:with-param name="subpartCount" select="$subpartCount"/>
                            </xsl:call-template>
                        </fieldset>
                    </xsl:if>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:for-each>
</xsl:template>



<xsl:template match="FIELD" mode="withoutSubPart" >
    <div class="DIVText">
        <xsl:call-template name="dispFields_tmp" />
    </div>
</xsl:template>

<xsl:template match="FIELD" mode="withSubPart1" >
    <div class="DIVText">
        <xsl:call-template name="dispFields_tmp" />
    </div>
</xsl:template>

    <!-- MASK ENHANCEMENT CHANGES -->
    <xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT' or text()='DATETIME' or text()='DISPMASK']" mode="template">
    <!-- MASK ENHANCEMENT CHANGES -->
    
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:choose>
                <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or ../TYPE = 'DATETIME' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                    <xsl:call-template name="dispHiddenLabel_tmp"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </xsl:otherwise>
            </xsl:choose>
            <!--<xsl:call-template name="dispNormalLabel_tmp"/>-->
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
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispHiddenLabel_tmp"/>
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
            </td>
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
        <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
        <xsl:call-template name="dispRadioLabel_tmp"/>
        <div class="DIVCheckRadio">
            <xsl:for-each select="../OPTION[@COL=1]">
                <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                <xsl:variable name="row" select="@ROW"/>
                <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template">
                    <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                </xsl:apply-templates>
            </xsl:for-each>
        </div>
    </xsl:if>
</xsl:template>

<xsl:template match="OPTION" mode="template">
    <xsl:param name = "Left_or_Right" select = "."/>
    <label class="LBLstd">
        <xsl:attribute name="for">
            <xsl:if test="../../BLOCK != ''">
                 <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../BLOCK = ''">
                 <xsl:value-of select="../NAME"></xsl:value-of>
            </xsl:if>
        </xsl:attribute>
        <input type="radio" class="RADstd" disabled="true">
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
            <xsl:value-of select="LBL"/>
        </xsl:attribute>     
        </input>
        <span class="SPNradio">
            <xsl:value-of select="LBL"/>
        </span>
    </label>

</xsl:template>   

<xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template">
    
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
    </xsl:if>


</xsl:template>


<xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">

        <label class="LBLstd"><img src="Images/star_disabled.gif" title="" ALT=""/><xsl:text disable-output-escaping="yes">&#160;</xsl:text></label>
            <div class="DIVCheckRadio">
                <xsl:call-template name="dispCheckboxField_tmp"/>
            </div>

    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <td class="TDgrid">
            <xsl:call-template name="dispCheckboxField_tmp"/>
        </td>
    </xsl:if>
    

 
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template">
    
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                     
        <td class="TDgrid">
            <xsl:call-template name="dispHiddenLabel_tmp"/>
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>                                   
            </xsl:call-template>
        </td>
    </xsl:if>

</xsl:template>


<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">              
        <td class="TDnone">
            <label class="LBLinv" for=""></label>
            <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            </INPUT>
        </td>
    </xsl:if>
    
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            <label class="LBLinv" for=""></label>
            <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            </INPUT>
        
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


<xsl:template name="dispFields_tmp">
    <xsl:apply-templates select="TYPE" mode="template">
        
    </xsl:apply-templates>
</xsl:template>


<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template">
    
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
        <div class="DIVList" >
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispSelectField_tmp"/>
        </div>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <!--
        <xsl:call-template name="RequiredFieldHandler_me">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        -->
        <td>
            <xsl:call-template name="dispSelectField_tmp"/>
        </td>
    </xsl:if>

        
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template">
    <xsl:choose>
        <xsl:when test="contains(../NAME, 'BTN_NEXT_BLK_') or contains(../NAME, 'BTN_PREV_BLK_') or contains(../NAME, 'BTN_ADD_BLK_') or contains(../NAME, 'BTN_REMOVE_BLK_')">
        </xsl:when>
        <xsl:otherwise>
            <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
                <td class="TDgrid">
                    <xsl:call-template name="dispButtonField_tmp"/>
                </td>
            </xsl:if>
            <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
		<div class="DIVText" > <label class="LBLstd"></label><img src="Images/star_disabled.gif" title="" ALT=""/>
                    <xsl:call-template name="dispButtonField_tmp"/>
                </div>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>
    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispFileField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <td class="TDgrid">
            <xsl:call-template name="dispFileField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispImgField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                            
        <td class="TDgrid">
            <xsl:call-template name="dispImgField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispPasswordField_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
        <td class="TDgrid">
            <xsl:call-template name="dispHiddenLabel_tmp"/>
            <xsl:call-template name="dispPasswordField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>
 
 <xsl:template match="FIELD/TYPE[text()='LINK_TYPE']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <label class="LBLstd"></label>
            <img src="Images/star_disabled.gif" title="" ALT=""/>
            <xsl:call-template name="dispLinkType_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
        <td class="TDgrid">
            <!--<xsl:call-template name="dispLinkType_tmp"/>-->
        </td>
    </xsl:if>    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template">
    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <!--<xsl:call-template name="dispSpanFlag_tmp" />-->
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
        <td class="TDgrid">
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>
 


<!-- Added By Murali for Horizontal Fieldset  -->
<xsl:template name="horizontalFieldsetPos">
    <xsl:param name="l_pos"/>
    <xsl:if test="$l_pos != 1">
        <img src="{$imgPath_XSL}/spacer.gif" height="1" width="5" ALT=""/>
    </xsl:if>
</xsl:template>

<xsl:template name="spacer">
    <img src="{$imgPath_XSL}/spacer.gif" height="1" width="5" ALT=""/>
</xsl:template>

<xsl:template name="dispNormalLabel_tmp_fldset" >
    <xsl:if test="../LBL != ''">
    <label class="LBLstd">
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
    </xsl:if>
</xsl:template>

<xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp" />
                    <xsl:call-template name="dispSpanFlag_tmp" />
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
        </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <td>
    <xsl:call-template name="dispButtonField_tmp"/>
    </td>
</xsl:template>        

<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <td>
        <label class="LBLinv" for=""></label>
        <INPUT TYPE="HIDDEN">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        </INPUT>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <td>
            <label >
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:value-of select="../LBL" />
            </label>
        </td>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <td>
        <xsl:call-template name="dispCheckboxField_tmp_fldset"/>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispFileField_tmp"/>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispImgField_tmp"/>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispPasswordField_tmp"/>
    </td>
</xsl:template>    

<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispSelectField_tmp"/>
    </td>
</xsl:template>


<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template_fldset">
        <xsl:variable name="rFldNode" select=".."/>
        <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
        <td>
            <label class="LBLauto">
                <xsl:for-each select="../OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                    <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template_fldset">
                        <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                    </xsl:apply-templates>
                </xsl:for-each>
            </label>
        </td>
</xsl:template>

<xsl:template match="OPTION" mode="template_fldset">
    <xsl:param name = "Left_or_Right" select = "."/>
    <label class="LBLauto" for="">
    <input type="radio" class="LBLauto" disabled="true">
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
        <xsl:value-of select="LBL"/>
    </xsl:attribute>     
    </input>
    <xsl:value-of select="LBL"/>
    </label>
</xsl:template>   

<xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <!--<xsl:if test="../LBL != ''">-->
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        <!--</xsl:if>-->
    </xsl:if>
    <td>
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
    </td>
</xsl:template>


<xsl:template name="dispSprtFlds">
    <xsl:param name="count" select="."/>
    <xsl:param name="subpartCount" select="."/>
    <xsl:if test="$count &lt;= $subpartCount">
        <DIV class="DIVSubColumnOne">
            <xsl:apply-templates select="FIELD[@SPRT = $count]" mode="withSubPart1" >
                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </DIV>
        <xsl:call-template name="dispSprtFlds">
            <xsl:with-param name="count" select="$count + 1"/>
            <xsl:with-param name="subpartCount" select="$subpartCount"/>
        </xsl:call-template>
    </xsl:if>
</xsl:template>

</xsl:stylesheet>
