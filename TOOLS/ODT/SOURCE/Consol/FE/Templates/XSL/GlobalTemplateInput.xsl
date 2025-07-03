<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="Tmp_Labels.xsl"/>
<xsl:param name="summaryLabels"/>
<xsl:template name="dispEntityField_tmp" >
    <xsl:param name="EntityType" />
    <xsl:choose>
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField_tmp" />
        </xsl:when>   
        <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
            <xsl:call-template name="dispRestrictedTextField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DESCRIPTION'">
            <xsl:call-template name="dispDescriptionField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField_tmp" />
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
    
    
    <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    
    <!--<INPUT TYPE="TEXT" class="TextNormal numeric" title="{../LABEL}" onblur="validateInputAmount('{../NAME}', '{$relatedFld}')" >-->
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
            <xsl:attribute name="class">
                <xsl:text>LABELNormal</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LABEL"/>
        </xsl:if>
    </label>
  <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <xsl:call-template name="dispSpanFlag_tmp" />
    </xsl:if>
    <INPUT TYPE="TEXT" class="TextNormal numeric" title="{../LABEL}">
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    
    <!--<xsl:attribute name="style">
        <xsl:text>{text-align:</xsl:text>
        <xsl:text>right;}</xsl:text>
    </xsl:attribute>-->
    
    <xsl:attribute name="MAXLENGTH1">
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
    <xsl:attribute name = "onblur">
        <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
        <xsl:value-of select="../NAME"/>
        <xsl:text disable-output-escaping="yes">', '</xsl:text>
        <xsl:value-of select="$relatedFld"/>
        <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this)</xsl:text>
    </xsl:attribute>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if>
    </INPUT>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
</xsl:template>

<xsl:template name="ATTR_HiddenEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
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

    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template"/>
    <xsl:if  test="($curr_fld/../../@TYPE = 'Multiple Entry') and ($curr_fld/../../@VIEW = 'Single Entry')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../../ID"/></xsl:attribute>
    </xsl:if>  
</xsl:template>


<xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <!-- 11.0 Help File Fix Starts -->
    <xsl:attribute name="HELPBID">
        <xsl:value-of select="$curr_fld/../../ID" />
    </xsl:attribute>
    <!-- 11.0 Help File Fix Ends -->
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">        
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:if test="number($curr_fld/SIZE) > 20">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="20"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="number($curr_fld/SIZE) &lt; 23">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT'">
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
    <xsl:attribute name="{./NAME}">
        <xsl:if test="$funcId != 'C' or ($funcId = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($funcId = 'C' and count(../NAME) = 0)">
            <!--<xsl:value-of select="./FUNCTION" />-->
            <xsl:variable name="exitEvent">
            <xsl:value-of select="./FUNCTION" />
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
   <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)"> 
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        </INPUT>    
    <!--<input type="text" class="TXTro" onactivate="acceptInputNumber('{../NAME}')" onbeforedeactivate="validateInputNumber('{../NAME}')">-->
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
            <xsl:attribute name="class">
                <xsl:text>LABELNormal</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LABEL"/>
        </xsl:if>
    </label>
    <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <xsl:call-template name="dispSpanFlag_tmp" />
    </xsl:if>
    <input type="text" class="TextNormal numeric" title="{../LBL}" onblur="validateInputNumber(this)">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <!--<xsl:attribute name="readOnly">true</xsl:attribute>-->
        <!--<xsl:if test="../TYPE = 'RESTRICTED_TEXT'">
            <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
        </xsl:if>-->
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
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
    </input>
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>
        <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
            <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <xsl:call-template name="Popup_Handler_tmp" />
                <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
</xsl:template>

<xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>

    <input type="text" class="TextNormal" >
	<xsl:attribute name="viewMode">Y</xsl:attribute>
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>

    <xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
            <xsl:if test="normalize-space(../MAX_DECIMAL) != ''  and normalize-space(../MAX_DECIMAL) > 0">
                <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
            </xsl:if>
            <xsl:if test="normalize-space(../MAX_DECIMAL) = ''">
                <xsl:value-of select="number(../MAXLENGTH)" />
            </xsl:if>
        </xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
            <xsl:value-of select="../SIZE" />
        </xsl:if>
    </xsl:attribute>
    <!-- Conditions for Auto-Lov starts -->
    <xsl:if test="(count(../LOV) &gt; 0) and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
            <!--<xsl:attribute name="onblur">fnTest()</xsl:attribute>-->
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
    
    <xsl:if test="(count(../LOV) &lt; 1) and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
            <xsl:attribute name="onblur">fnToUppercase(this,event);</xsl:attribute>
    </xsl:if>
    
    <xsl:if test="(count(../LOV) &gt; 0) and ((count(../UPPERCASE) &lt; 1 or ../UPPERCASE != -1) and (count(../CASE) &lt; 1 or ../CASE != 'UPPER'))">
            <!--Fix for 16785126 -->
 			<xsl:attribute name="onchange">
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
    <!-- Conditions for Auto-Lov ends -->
    <!--
    <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
        <xsl:attribute name="onblur">fnToUppercase(this,event)</xsl:attribute>       
    </xsl:if>
    -->
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if>
    </input>
    
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>

    <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count(../LOV) = 0 ">
            <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
                <BUTTON class="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                    <xsl:call-template name="Popup_Handler_tmp" />
                    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
                </BUTTON>
            </xsl:if>
        </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">   
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
        </BUTTON>
    </xsl:if>
    </xsl:if>
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
        <xsl:attribute name="ID">        
            <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />        
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
		
    <xsl:attribute name="DTYPE">
        <xsl:value-of select="$curr_fld/DTYPE" />
    </xsl:attribute>

    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
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
          <xsl:if test="count(../POPUPEDIT) &gt;0 and count(curr_fld/LOV) &gt;0">
                <xsl:attribute name="SIZE">
                  <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../POPUPEDIT) = 0 or count(curr_fld/LOV) = 0">
              <xsl:attribute name="SIZE">
                  <xsl:value-of select="23"/>
              </xsl:attribute>
            </xsl:if>
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
            <xsl:attribute name="class">TextReadonly</xsl:attribute>       	     
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="class">TextReadonly</xsl:attribute>       	     
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
            </xsl:if>        
            <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
                <xsl:attribute name="class">TextAreaReadonly</xsl:attribute>
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
            <xsl:attribute name="class">TextDisabled</xsl:attribute>
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
        
        <xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute>
    
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
      <BUTTON class="BUTTONInline" title="{$lov_SummaryAudit}" tabindex="-1">
            <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>
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
        <xsl:if test="count($curr_fld/INPUT_LOV) = 0">
            <span tabindex="-1" class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
        </xsl:if>     
        <xsl:if test="count($curr_fld/INPUT_LOV) != 0">
            <span class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
        </xsl:if>          
       </BUTTON>
        </xsl:if>
    </xsl:if>

    <xsl:if test="$Brn_Neo = ''">
        <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
            <!-- 10.2sp1 security related changes.-->
            <BUTTON class="BUTTONInline" tabindex="-1" title="{$lov_SummaryAudit}">
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="containerId" select="$containerId"/>
                </xsl:call-template>
                <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                    <xsl:attribute name="DISABLED"/>
                </xsl:if>
                <span tabindex="0" class="BTNLov" onMouseOver="this.className='BTNLovHover'" onMouseOut="this.className='BTNLov'" onFocus="this.className='BTNLovHover'" onBlur="this.className='BTNLov'"></span>
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON class="BUTTONInline" tabindex="-1" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BUTTONInline" tabindex="-1" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BUTTONInline" tabindex="-1" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BUTTONInline" tabindex="-1" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Icons/Lov.gif"  title="{$lov_SummaryAudit}" alt="{$lov_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>
</xsl:template>

<xsl:template name="Popup_Handler_tmp">
    <xsl:attribute name="ONCLICK">
        <xsl:text>show_editor('</xsl:text><xsl:value-of select="../NAME"/><xsl:text>','</xsl:text>
        <xsl:if test="count(../MAXLENGTH) != 0">
            <xsl:value-of select="../MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
            <xsl:value-of select="../SIZE" />
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:if test="normalize-space(../POPUPEDIT/TITLE) != ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="../POPUPEDIT/TITLE"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="normalize-space(../POPUPEDIT/TITLE) = ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="../LABEL"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:text>', event);</xsl:text>
    </xsl:attribute>
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
    <xsl:text>', event);</xsl:text><!--Fix for 16785126 -->
</xsl:template>

<!--Fix for 16785126 -->
<xsl:template name="addOnchangeEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
<!--Fix for 16785126 -->

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

<xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'"> 
        <xsl:attribute name="FOR">
        <xsl:if test="../DBT != ''">
             <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
        </xsl:if>
        <xsl:if test="../DBT = ''">
             <xsl:value-of select="../DBC"></xsl:value-of>
        </xsl:if>
    </xsl:attribute>        
        <input type="checkbox" class="INPUTCheck">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>
        </input>
        <xsl:if test="../LABEL != ''">
            <label class="LABELCheck">
                <xsl:value-of select="../LABEL"/>
            </label>
        </xsl:if>
        <xsl:if test="../LABEL = ''">
            <label class="LABELCheck LBLinv2">
                <xsl:value-of select="../../LABEL"/>
            </label>
        </xsl:if>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <label class="LBLinv" for=""></label>
        <input type="checkbox" class="INPUTCheck">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
        </xsl:attribute>
        </input>
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

    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
    <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    </INPUT>
    
    <!-- <INPUT TYPE="TEXT" class="TextNormal" title="{../LABEL}" onactivate="acceptInputDate('{../NAME}')" onbeforedeactivate="validateInputDate('{../NAME}')" > -->
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
            <xsl:attribute name="class">
                <xsl:text>LABELNormal</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LABEL"/>
        </xsl:if>
    </label>
    <xsl:if test="(../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry')">
        <xsl:call-template name="dispSpanFlag_tmp" />
    </xsl:if>
    <INPUT TYPE="TEXT" class="TextNormal" title="{../LABEL}" onblur="validateInputDate('{../NAME}', event)" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    
    <!-- for multiple entry text fields needs add title and * !--> 
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
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
    </INPUT>
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
            <button class="BUTTONInline" tabindex="-1" onclick="disp_cal('{../NAME}', event)" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="{$calendar_SummaryAudit}">
            <img class="IMGInline" src="{$imgPath_XSL}/Icons/calendar.gif" alt="{$calendar_SummaryAudit}"/>
            </button>
        </xsl:if>
    </xsl:if>
</xsl:template>


<xsl:template name="dispTextareaField_tmp" >
    <xsl:param name="position" select="."/>

    <TEXTAREA class="TextNormal" tabindex="0">
    
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
    </xsl:if> 
    </TEXTAREA>
    
    <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
        <!-- <BUTTON class="ButtonLov"  TABINDEX="{../TABINDEX}" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'"> -->
        <BUTTON class="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <xsl:call-template name="Popup_Handler_tmp" />
            <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
        </BUTTON>
    </xsl:if>
    
</xsl:template>


<xsl:template name="dispSelectField_tmp">
    
    <SELECT class="SELECTNormal">
    
    <xsl:attribute name="ID">
        <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
    </xsl:attribute>
    
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="count(../MULTIPLE) &gt; 0 and ../MULTIPLE = -1">
        <xsl:attribute name="MULTIPLE">MULTIPLE</xsl:attribute>
    </xsl:if>
    
    <!--Added by Binson -->
    <xsl:if test="count(../WIDTH) &gt; 0">
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
                <xsl:value-of select="../WIDTH" />
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
    <xsl:for-each select="../OPTION">
        <OPTION VALUE="{@VALUE}">
            <xsl:if test="count(@SELECTED) &gt; 0 and @SELECTED=-1">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                <xsl:attribute name="DEFAULT">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="." />
        </OPTION>
    </xsl:for-each>
    </SELECT>
</xsl:template>




<xsl:template name="dispButtonField_tmp">
    <BUTTON class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
   	</xsl:call-template>
        <xsl:choose>
            <xsl:when test="contains(../NAME,'BTN_PREV') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_REMOVE')">
                <xsl:attribute name="class">BUTTONInline</xsl:attribute>
                <xsl:attribute name="onMouseOver">this.className='BUTTONInlineHover'</xsl:attribute>
                <xsl:attribute name="onMouseOut">this.className='BUTTONInline'</xsl:attribute>
                <xsl:attribute name="onFocus">this.className='BUTTONInlineHover'</xsl:attribute>
                <xsl:attribute name="onBlur">this.className='BUTTONInline'</xsl:attribute>
                <xsl:variable name="l_btnimg">
                    <xsl:if test="contains(../NAME,'BTN_PREV')"><xsl:value-of select="'BTNPrevious.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_NEXT')"><xsl:value-of select="'BTNNext.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_ADD')"><xsl:value-of select="'BTNAddrow.gif'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_REMOVE')"><xsl:value-of select="'BTNRemoveRow.gif'"/></xsl:if>
                </xsl:variable>
                <xsl:if test="count(../DBT) = 0">
                    <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                    <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                </xsl:if>
                <img class="IMGInline" src="{$imgPath_XSL}/{$l_btnimg}" alt=""/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="count(../SRC) &gt; 0">
                    <xsl:attribute name="class">BUTTONInline</xsl:attribute>
                    <xsl:attribute name="onMouseOver">this.className='BUTTONInlineHover'</xsl:attribute>
                    <xsl:attribute name="onMouseOut">this.className='BUTTONInline'</xsl:attribute>
                    <xsl:attribute name="onFocus">this.className='BUTTONInlineHover'</xsl:attribute>
                    <xsl:attribute name="onBlur">this.className='BUTTONInline'</xsl:attribute>
                    <xsl:if test="count(../DBT) = 0">
                        <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                        <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                    </xsl:if>
                    <xsl:variable name="l_srcimg" select="../SRC"/>
                    <img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}" alt=""/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        <sup><xsl:value-of select="../LABEL"/></sup>
    </BUTTON>
</xsl:template>


<xsl:template name="dispRestrictedTextField_tmp">
        <xsl:param name="EntityType"/>

	<!--<INPUT TYPE="TEXT" class="TextNormal" onblur="validateRestrictedTextValue(this)">-->
        <INPUT TYPE="TEXT" class="TextNormal">
        <xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>

        <!--<xsl:if test="../TYPE='RESTRICTED_TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
            <xsl:attribute name="style">
                <xsl:text>{text-align:right;}</xsl:text>
            </xsl:attribute>
        </xsl:if>-->

        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>

            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
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
            <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this,event)</xsl:attribute> 
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
            <xsl:attribute name="onblur">fnToUppercase(this,event)</xsl:attribute> 
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
    </INPUT>
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>


    <!-- For a text field, both lov & popup can appear -->
      <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count(../LOV) = 0 ">
          <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
            <BUTTON class="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                    <xsl:call-template name="Popup_Handler_tmp" />
                    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
            </BUTTON>
          </xsl:if>
        </xsl:if>
      </xsl:if>
      
      <xsl:if test="$Brn_Neo = ''">   
        <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; 254)">
            <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <xsl:call-template name="Popup_Handler_tmp" />
                <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>
            </BUTTON>
        </xsl:if>
      </xsl:if>
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
    <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>

    <!--<INPUT TYPE="TEXT" class="TextNormal" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');">-->
    <INPUT TYPE="TEXT" class="TextNormal" mask="{../MASK}" onblur="validateInputValue('{../NAME}');">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
        </xsl:attribute>
    </xsl:if>
    
    </INPUT>
</xsl:template>

<xsl:template name="dispPasswordField_tmp">
    <Input type="PASSWORD" class="TextNormal" onpaste="return false;" >
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
    
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LABEL"/>
                <!-- <xsl:if test="../REQUIRED='-1'"> * </xsl:if> -->
            </xsl:attribute>
        </xsl:if>
    </Input>
</xsl:template>

<xsl:template name="dispLabelOnlyField_tmp">
    <label class="LABELNotes">
        <xsl:if test="../TYPE[text()='GROUP']">
            <xsl:attribute name="class">
                <xsl:value-of select="'LABELGroup'"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:value-of select="../LABEL" />
    </label>
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

    <label class="LABELDescription">
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
<!-- 13/10/08 OCX Related modification ends -->
</xsl:stylesheet>