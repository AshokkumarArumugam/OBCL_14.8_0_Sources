<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="displayLabelFieldSet_tmp" >
    <xsl:value-of select="../LABEL" />
</xsl:template>

<xsl:template name="dispNormalLabel_tmp" >
    <label class="LABELNormal">
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
    <label class="LABELNormal">
        <xsl:value-of select="../LABEL"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
    </label>
    
</xsl:template>

<xsl:template name="dispSpanFlag_tmp" >
    <xsl:if test="../REQUIRED = 0">
        <img src="{$imgPath_XSL}/star_disabled.gif" title=""/>
    </xsl:if>
    <xsl:if test="../REQUIRED = -1">
        <img src="{$imgPath_XSL}/star.gif" title=""/>
    </xsl:if>
</xsl:template>
  
<!-- Added By Murali, Horizontal Fieldset -->
<xsl:template name="HorizongalFieldSet" >
    <xsl:if test="../LABEL = ''">
            <div class="DIVText">
                <table border="0" cellpadding="0" cellspacing="0"><tr>
                    <xsl:apply-templates select="../FIELD" mode="hFieldSet" >
                        <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                    </xsl:apply-templates>
                </tr></table>
            </div>
    </xsl:if>
    <xsl:if test="../LABEL != ''">
        <fieldset class="FIELDSETNormal">
                <legend><xsl:call-template name="displayLabelFieldSet_tmp"/></legend>
                <div class="DIVText">
                    <table border="0" cellpadding="0" cellspacing="0"><tr>
                        <xsl:apply-templates select="../FIELD" mode="hFieldSet" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </tr></table>
                </div>
        </fieldset>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD" mode="hFieldSet" >
    <xsl:apply-templates select="TYPE" mode="template_fldset">
        <xsl:with-param name="l_pos" select="position()"/>
    </xsl:apply-templates>
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
                <fieldset class="FIELDSETPlaceholder">
                    <legend><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></legend>
                    <xsl:if test="$subpartCount > 0">
                        <xsl:variable name="curNode" select="." />
                        <xsl:for-each select="$subPartNode">
                            <xsl:variable name="flag" select="'1'"/>
                            <DIV class="DIVSubColumnOne">
                                <xsl:variable name="sp" select="@ID"/>
                                <xsl:apply-templates select="$curNode/../FIELD[@SUBPARTITION = $sp]" mode="withSubPart1" >
                                    <xsl:sort select="SUBPARTITION" data-type="text" order="ascending"/>
                                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                            </DIV>
                        </xsl:for-each>
                    </xsl:if>
        
                    <xsl:if test="$subpartCount = 0">
                        <xsl:apply-templates select="../FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    
                </fieldset>
            </xsl:if>
            <xsl:if test="../LABEL != ''">
                <fieldset class="FIELDSETNormal">
                    <legend>
                        <xsl:call-template name="displayLabelFieldSet_tmp"/>
                    </legend>
                    
                    <xsl:if test="$subpartCount > 0">
                        <xsl:variable name="curNode" select="." />
                        <xsl:for-each select="$subPartNode">
                            <xsl:variable name="flag" select="'1'"/>
                            <DIV class="DIVSubColumnOne">
                                <xsl:variable name="sp" select="@ID"/>
                                <xsl:apply-templates select="$curNode/../FIELD[@SUBPARTITION = $sp]" mode="withSubPart1" >
                                    <xsl:sort select="SUBPARTITION" data-type="text" order="ascending"/>
                                    <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                            </DIV>
                        </xsl:for-each>
                    </xsl:if>
        
                    <xsl:if test="$subpartCount = 0">
                        <xsl:apply-templates select="../FIELD" mode="withoutSubPart" >
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    
                    
                </fieldset>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>
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

<xsl:template match="TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template">

        <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispEntityField_tmp" >
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>

        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
            <td class="TBODYTDMultiple">
            <xsl:call-template name="dispEntityField_tmp" >
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
            </td>
        </xsl:if>
</xsl:template>
<!-- 13/10/08 OCX Related modification starts -->
<xsl:template match="TYPE[text()='OCX']" mode="template">
    <xsl:call-template name="dispOCX"/>
</xsl:template>
<!-- 13/10/08 OCX Related modification ends -->
<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
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
    <label class="LABELRadio">
    <input type="radio" class="INPUTRadio">
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
    <span class="SPANRadio">
    <xsl:value-of select="LABEL"/>
    </span>
    </label>

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

        <label class="LABELNormal"><img src="{$imgPath_XSL}/star_disabled.gif" title=""/><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></label>
            <div class="DIVCheckRadio">
                <xsl:call-template name="dispCheckboxField_tmp"/>
            </div>

    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispCheckboxField_tmp"/>
        </td>
    </xsl:if>
    

 
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template">
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                     
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>                                   
            </xsl:call-template>
        </td>
    </xsl:if>

</xsl:template>


<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">              
        <td class="TBODYTDDispNone">
            <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            </INPUT>
        </td>
    </xsl:if>
    
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        
            <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            </INPUT>
        
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
        <div class="DIVList" >
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispSelectField_tmp"/>
        </div>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
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
            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                <td class="TBODYTDMultiple">
                    <xsl:call-template name="dispButtonField_tmp"/>
                </td>
            </xsl:if>
            <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
		<div class="DIVText" > <label class="LABELNormal"></label><img src="{$imgPath_XSL}/star_disabled.gif" title=""/><xsl:call-template name="dispButtonField_tmp"/></div>
            </xsl:if>
        </xsl:otherwise>
    </xsl:choose>
    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispFileField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispFileField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
        <xsl:call-template name="dispNormalLabel_tmp"/>
        <xsl:call-template name="dispSpanFlag_tmp" />
        <xsl:call-template name="dispImgField_tmp"/>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispImgField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispSpanFlag_tmp" />
            <xsl:call-template name="dispPasswordField_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispPasswordField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>
 
 <xsl:template match="FIELD/TYPE[text()='LINK_TYPE']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            <label class="LABELNormal"></label>
            <span class="SPANFlag"><img src="{$imgPath_XSL}/star_disabled.gif" title=""/></span>
            <xsl:call-template name="dispLinkType_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td class="TBODYTDMultiple">
            <!--<xsl:call-template name="dispLinkType_tmp"/>-->
        </td>
    </xsl:if>    
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY']" mode="template">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
            <!--<xsl:call-template name="dispSpanFlag_tmp" />-->
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
        <td class="TBODYTDMultiple">
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
        </td>
    </xsl:if>
</xsl:template>
 


<!-- Added By Murali for Horizontal Fieldset  -->
<xsl:template name="horizontalFieldsetPos">
    <xsl:param name="l_pos"/>
    <xsl:if test="$l_pos != 1">
        <img src="{$imgPath_XSL}/spacer.gif" height="1" width="5"/>
    </xsl:if>
</xsl:template>

<xsl:template name="spacer">
    <img src="{$imgPath_XSL}/spacer.gif" height="1" width="5"/>
</xsl:template>

<xsl:template name="dispNormalLabel_tmp_fldset" >
    <xsl:if test="../LABEL != ''">
    <label class="LABELNormal">
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
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <xsl:if test="../LABEL != ''">
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp" />
                    <xsl:call-template name="dispSpanFlag_tmp" />
                </td>
            </xsl:if>
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
        <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
        </INPUT>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY']" mode="template_fldset">
    <xsl:param name="l_pos"/>        
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <td>
            <label >
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:value-of select="../LABEL" />
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
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispTextareaField_tmp">
            <xsl:with-param name="position">column</xsl:with-param>                                   
        </xsl:call-template>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='FILE']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispFileField_tmp"/>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='IMG']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispImgField_tmp"/>
    </td>
</xsl:template>

<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispPasswordField_tmp"/>
    </td>
</xsl:template>    

<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispSelectField_tmp"/>
    </td>
</xsl:template>


<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template_fldset">
        <xsl:variable name="rFldNode" select=".."/>
        <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
        <td>
            <label class="LABELRadioInline">
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
</xsl:template>   

<xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template_fldset">
    <xsl:if test="count(../CALENDARTEXT) = 0">
        <xsl:if test="../LABEL != ''">
            <td>
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSpanFlag_tmp" />
            </td>
        </xsl:if>
    </xsl:if>
    <td>
        <xsl:call-template name="dispEntityField_tmp" >
            <xsl:with-param name="EntityType" select="../TYPE"/>
        </xsl:call-template>
    </td>
</xsl:template>

</xsl:stylesheet>
