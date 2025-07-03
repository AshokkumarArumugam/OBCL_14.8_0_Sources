<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">





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
    
    <INPUT TYPE="TEXT" class="TextNormal" onactivate="acceptInputAmount('{../NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{../NAME}', '{$relatedFld}')" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    
    <xsl:attribute name="style">
        <xsl:text>{text-align:</xsl:text>
        <xsl:text>right;}</xsl:text>
    </xsl:attribute>
    
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
    
    <xsl:attribute name = "onblur">
        <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
    </xsl:attribute>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if>
    
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    
    </INPUT>
</xsl:template>

<xsl:template name="ATTR_HiddenEntity_Handler_tmp">
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
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="SIZE">
        <xsl:value-of select="$curr_fld/SIZE" />
    </xsl:attribute>
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
            <xsl:value-of select="./FUNCTION" />
        </xsl:if>
        <xsl:if test="$funcId = 'C' and (../NAME = 'BTN_OK' or ../NAME = 'BTN_EXIT')">
            <xsl:if test="../NAME = 'BTN_OK'">
                <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
            </xsl:if>
            <xsl:if test="../NAME = 'BTN_EXIT'">
                <xsl:text>fnExit_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
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

<xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>

    <input type="text" class="TextNormal" >
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>

    <xsl:if test="../TYPE='TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
        <xsl:attribute name="style">
            <xsl:text>{text-align:right;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
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
    
    <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
        <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute>       
    </xsl:if>
    
    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
            <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
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
                <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                    <xsl:call-template name="Popup_Handler_tmp" />
                    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" />
                </BUTTON>
            </xsl:if>
        </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">   
    <xsl:if test="count(../POPUPEDIT) &gt; 0">
    <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
    <xsl:call-template name="Popup_Handler_tmp" />
    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" />
    </BUTTON>
    </xsl:if>
    </xsl:if>
    
    </input>

</xsl:template>




<xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="." />

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LABEL"/>
    </xsl:attribute>
    
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
		
    <xsl:attribute name="SIZE">
        <xsl:value-of select="$curr_fld/SIZE" />
    </xsl:attribute>

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

    <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template" />
    
    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQUIRED" />
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
    
            <BUTTON class="BUTTONInline" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                <xsl:attribute name="READONLY">-1</xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
                <xsl:attribute name="READONLY">-1</xsl:attribute>
            </xsl:if>
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>

    <xsl:if test="$Brn_Neo = ''">
        <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
            <BUTTON class="BUTTONInline" ONCLICK="{normalize-space($curr_fld/LOV/NAME)}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON class="BUTTONInline" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BUTTONInline" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BUTTONInline" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BUTTONInline" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <IMG class="IMGInline" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
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
        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
    </xsl:if>
    
</xsl:template>

<xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'"> 
        <label class="LABELCheck">
        <input type="checkbox" class="INPUTCheck">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>
        <span class="SPANCheck"><xsl:value-of select="../LABEL"/></span>
        </input>
        </label>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <input type="checkbox" class="INPUTCheck">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>
        </input>
        <xsl:attribute name="title">
            <xsl:value-of select="../LABEL"/>
        </xsl:attribute>
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
    
    <INPUT TYPE="TEXT" class="TextNormal"  onactivate="acceptInputDate('{../NAME}')" onbeforedeactivate="validateInputDate('{../NAME}')" >
    
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
    
    <!-- Display Calendar Button  -->
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">
            <!--
            <BUTTON class="ButtonLov" TABINDEX="{../TABINDEX}" onclick="disp_cal('{../NAME}', '{../NAME}I')">
                <IMG class="IMGLov" SRC="{$imgPath_XSL}/Calendar.gif" title="Calendar"/>
            </BUTTON>
            -->
            <button class="BUTTONInline" onclick="disp_cal('{../NAME}', '{../NAME}I')" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" title="Calendar">
            <img class="IMGInline" src="{$imgPath_XSL}/calendar.gif"/>
            </button>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count(../LOV) &gt; 0">
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </xsl:if>
    </INPUT>
</xsl:template>


<xsl:template name="dispTextareaField_tmp" >
    <xsl:param name="position" select="."/>

    <TEXTAREA class="TextNormal">
    
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
    
    <xsl:if test="$position = 'absolute'">                     
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
            <xsl:value-of select="../WIDTH"/>
            <xsl:text>px;height:</xsl:text>
            <xsl:value-of select="../HEIGHT"/>
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
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
        <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
            <xsl:call-template name="Popup_Handler_tmp" />
            <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" />
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
    
    <!--
    <xsl:if test="count(../WIDTH) &gt; 0">
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
                <xsl:value-of select="../WIDTH" />
            <xsl:text>;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    -->
    
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
                <img class="IMGInline" src="{$imgPath_XSL}/{$l_btnimg}"/>
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
                    <img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        <sup><xsl:value-of select="../LABEL"/></sup>
    </BUTTON>
</xsl:template>


<xsl:template name="dispRestrictedTextField_tmp">
        <xsl:param name="EntityType"/>

	<INPUT TYPE="TEXT" class="TextNormal" onblur="validateRestrictedTextValue(this)">
	
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>

        <xsl:if test="../TYPE='RESTRICTED_TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
            <xsl:attribute name="style">
                <xsl:text>{text-align:right;}</xsl:text>
            </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>

            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>

        <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
            <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute> 
        </xsl:if>

       <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
          <xsl:value-of select="../LABEL"/>
          <!--<xsl:if test="../REQUIRED='-1'"> * </xsl:if>-->
        </xsl:attribute>
       </xsl:if>
                                          
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
            <xsl:with-param name="EntityType" select="$EntityType" />
        </xsl:call-template>


    <!-- For a text field, both lov & popup can appear -->
      <xsl:if test="$Brn_Neo != ''">
        <xsl:if test="count(../LOV) = 0 ">
          <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
            <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                    <xsl:call-template name="Popup_Handler_tmp" />
                    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" />
            </BUTTON>
          </xsl:if>
        </xsl:if>
      </xsl:if>
      
      <xsl:if test="$Brn_Neo = ''">   
        <xsl:if test="count(../POPUPEDIT) &gt; 0">
            <BUTTON class="BUTTONInline" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                    <xsl:call-template name="Popup_Handler_tmp" />
                    <IMG class="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" />
            </BUTTON>
        </xsl:if>
      </xsl:if>
    </INPUT>
    
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

    <INPUT TYPE="TEXT" class="TextNormal" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');">
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
    <Input type="PASSWORD" class="TextNormal" >
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
    <IMG CLASS="IMGButton" SRC="{../SRC}">
        <xsl:attribute name="STYLE">
          <xsl:text>height:</xsl:text>
          <xsl:value-of select="../HEIGHT"/>
          <xsl:text>px;width:</xsl:text>
          <xsl:value-of select="../WIDTH"/>
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
        
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
        <span class="SPANText">
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
        <input type="checkbox" class="INPUTCheckInline">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LABEL"/>
        </input>
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