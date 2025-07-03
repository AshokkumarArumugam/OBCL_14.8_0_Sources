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
        <xsl:when test="$EntityType = 'DATETIME'">
            <xsl:call-template name="dispDateTimeField_tmp" />
        </xsl:when>   
        <!--<xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
            <xsl:call-template name="dispRestrictedTextField_tmp" />
        </xsl:when>-->
        <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp" />
        </xsl:when>
	<!-- MASK ENHANCEMENT CHANGES -->
        <xsl:when test="$EntityType = 'DISPMASK'">
            <xsl:call-template name="dispMaskingField_tmp" />
        </xsl:when>
        <!-- MASK ENHANCEMENT CHANGES -->
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
    <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')" related_ccy = "{$relatedFld}">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>                
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro numeric" title="{../LBL}" readOnly="true">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
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
            <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
            <xsl:value-of select="../NAME"/>
            <xsl:text disable-output-escaping="yes">', '</xsl:text>
            <xsl:value-of select="$relatedFld"/>
            <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this)</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
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
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK" />
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
    </xsl:attribute>
    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQD" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL" />
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
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>


<xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">        
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
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
        <xsl:attribute name="class">TXTro</xsl:attribute>
        <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
        <!--<xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() = 'DATE']" >
            <xsl:attribute name="style">
                <xsl:text>text-align: left;</xsl:text>
            </xsl:attribute>
        </xsl:if>-->
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']" >
            <xsl:attribute name="class">
                <xsl:text>TXTro numeric</xsl:text>
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
        <xsl:attribute name="class">TXTro</xsl:attribute>
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
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  

</xsl:template>


<xsl:template match="EVENT" mode="template">
    <xsl:attribute name="{./NAME}">
        <xsl:if test="$thirdChar != 'C' or ($thirdChar = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($thirdChar = 'C' and count(../NAME) = 0)">
            <xsl:value-of select="./FUNCTION" />
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
    <xsl:if test="$curr_fld/REQD = -1"> 
        <SPAN class="SPANFlag" title="Required Field">*</SPAN>
    </xsl:if>
    
    <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD != -1"> 
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
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <input type="text" class="TXTro numeric" title="{../LBL}" onblur="validateInputNumber(this)">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
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
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </input>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" title="{$narrative}" oldClassName = "BTNimg" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if>
</xsl:template>

<xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>
    <input type="text" class="TXTro">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
				<!--Fix for 16785126 -->
                <xsl:attribute name="onchange">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
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
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
				<!--Fix for 16785126 -->
                <xsl:attribute name="onchange">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
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
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
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
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
            <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
        </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
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
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)" />
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <xsl:attribute name="SIZE">		
            <xsl:value-of select="../SIZE" />
    	</xsl:attribute>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
    </input>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if>
        <!--</xsl:if>-->
        <!--HOTKEY-->
    <xsl:if test="count(../@HOTKEY) &gt; 0 and ../@HOTKEY = 'Y'">
        <xsl:attribute name="onkeydown">
            <xsl:text>fnLaunchHotkyFunc(true,'</xsl:text><xsl:value-of select="../@FUNCTIONID"/><xsl:text>')</xsl:text>
        </xsl:attribute>
        <BUTTON class="BTNimg" title="{$narrative}" disabled="true" onclick="fnLaunchHotkyFunc(false,'{../@FUNCTIONID}')">
            <span tabindex="-1" class="ICOcustinfo"><span class="LBLinv"><xsl:value-of select = "$narrative"/></span></span> 
        </BUTTON>
    </xsl:if>
        <!-- HOTKEY  END-->
</xsl:template>

<!-- MASK ENHANCEMENT CHANGES -->
<xsl:template name="dispMaskingField_tmp">
    <xsl:param name="EntityType"/>    
    <input type="text" class="TXTro">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <!--<xsl:if test="../TYPE='TEXT'and (../DTYPE='NUMERIC' or ../DTYPE='NUMBER')">
            <xsl:attribute name="style">
                <xsl:text>{text-align:right;}</xsl:text>
            </xsl:attribute>
        </xsl:if>-->
        
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
            
	<xsl:attribute name="SIZE">		
            <xsl:choose>
		<xsl:when test="(../NAME = 'MAKER' or  ../NAME = 'CHECKER') and ../SIZE &lt; ../MAXLENGTH">
                    <xsl:text>12</xsl:text>
                </xsl:when>				
		<xsl:otherwise>				
                    <xsl:value-of select="../SIZE" />
		</xsl:otherwise>				
            </xsl:choose>
        </xsl:attribute>
    
        <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
            <xsl:if test="count(../MASK_ID) &gt; 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event);fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID" /></xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../MASK_ID) = 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        </xsl:if>
        <xsl:if test="(count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER')">
            <xsl:if test="count(../MASK_ID) &gt; 0">
                <xsl:attribute name="onBlur">fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID" /></xsl:attribute>
            </xsl:if>
        </xsl:if>
        
        <!--<xsl:call-template name="DISPMASK_Handler_tmp">
                <xsl:with-param name="cntMask" select="count(../MASK_ID)" />
        </xsl:call-template>-->
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
    </input>    
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if>
</xsl:template>

<!--<xsl:template name="DISPMASK_Handler_tmp">
    <xsl:param name="cntMask" />
    <xsl:if test="$cntMask &gt; 0">
            <xsl:attribute name="onBlur">fnFormatUnmask(this)</xsl:attribute>
            <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID" /></xsl:attribute>
        </xsl:if>

</xsl:template>-->
<!-- MASK ENHANCEMENT CHANGES -->


<xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="." />

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:if test="count($curr_fld/../BLOCK) &gt; 0">
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
        </xsl:if>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK" />
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME" />
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/@UDF) != 0 or $curr_fld/@UDF = 'Y'">
        <xsl:attribute name="onbeforedeactivate">
            <xsl:text>fnUpdateUDFDBField(this)</xsl:text>
        </xsl:attribute>
    </xsl:if>
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

    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>  
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX' and $curr_fld/TYPE != 'TEXTAREA'">   
            <xsl:attribute name="class">TXTro</xsl:attribute>       	     
            <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0 and $curr_fld/TYPE != 'TEXTAREA'">
                <xsl:attribute name="class">TXTro</xsl:attribute>       	     
                <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
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
            <xsl:attribute name="class">TXTro</xsl:attribute>
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
        <xsl:value-of select="$curr_fld/REQD" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
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
    
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
      
</xsl:template>


<xsl:template name="LovHandler_tmp">
    <xsl:param name="curr_fld" />
    <xsl:param name="EntityType" />
    
    <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" disabled="true" tabindex="-1">
            <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:call-template name="dispLov">
                <xsl:with-param name="curr_fld" select="$curr_fld"/>
                <xsl:with-param name="functionName" select="'disp_lov'"/>
            </xsl:call-template>
            
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
            <span tabindex="-1" class="ICOlov">
            <span class="LBLinv"><xsl:value-of select = "$lov"/></span>
            </span>
        </BUTTON>
    </xsl:if>

    <!-- FCUBS10.3_WebBranch Changes chandra starts-->

    <xsl:if test="count($curr_fld/OFFLINE_LOV) &gt; 0 ">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" disabled="true" tabindex="-1">
            <xsl:call-template name="dispOfflineLov">
                <xsl:with-param name="curr_fld" select="$curr_fld"/>
                <xsl:with-param name="functionName" select="'disp_offlinelov'"/>
            </xsl:call-template>
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
            <span tabindex="-1" class="ICOlov">
             <span class="LBLinv"><xsl:value-of select = "$lov"/></span></span>
        </BUTTON>
    </xsl:if>
    <!-- FCUBS10.3_WebBranch Changes chandra ends-->
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" ONCLICK="Account.show_lov()" disabled="true" tabindex="-1">
              <span tabindex="-1" class="ICOlov">
               <span class="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg"  title="{$lov}" ONCLICK="Branch.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov">
             <span class="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BTNhide"  oldClassName = "BTNimg" title="{$lov}" ONCLICK="Currency.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov">
             <span class="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" ONCLICK="Customer.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov"> <span class="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
    </xsl:if>
</xsl:template>

<xsl:template name="Popup_Handler_tmp">
    <xsl:attribute name="ONCLICK">
        <xsl:text>show_editor('</xsl:text>
        <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"/>
        <xsl:text>','</xsl:text>
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
            <!--<xsl:value-of select="../POPUPEDIT/TITLE" />-->
        </xsl:if>
        <xsl:if test="normalize-space(../POPUPEDIT/TITLE) = ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="../LBL"/>
            </xsl:call-template>
            <!--<xsl:value-of select="../LBL" />-->
        </xsl:if>        
        <xsl:text>', event);</xsl:text>
    </xsl:attribute>
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
    <xsl:text>', event);</xsl:text>
    <!--Fix for 16785126 -->
</xsl:template>

<xsl:template name="dispLov">
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
    </xsl:attribute>
</xsl:template>

<!--Fix for 16785126 -->
<xsl:template name="addOnchangeEvent">
    <xsl:param name="curr_node"/>
    <xsl:value-of select="normalize-space($curr_node/EVENT/FUNCTION)"/>      
</xsl:template>
<!--Fix for 16785126 -->

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
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">    
        <xsl:value-of select="substring-before($curr_fld/LBL,$curr_fld/ACCESSKEY)"/>
        <U><xsl:value-of select="$curr_fld/ACCESSKEY" /></U>
        <xsl:value-of select="substring-after($curr_fld/LBL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or (count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) = '') or not(contains($curr_fld/LBL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:if>
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
    
</xsl:template>

<xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'"> 
        <xsl:if test="../LBL != ''">
            <label class="LBLauto">
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
                        <xsl:with-param name="curr_fld" select=".." />
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </input>
                <xsl:value-of select="../LBL"/>
            </label>
        </xsl:if>
        <xsl:if test="../LBL = ''">
            <label class="LBLauto LBLinv2">
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
                        <xsl:with-param name="curr_fld" select=".." />
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </input>
                <xsl:value-of select="../../LBL"/>
            </label>
        </xsl:if>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <label class="LBLauto">
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
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="title">
                    <xsl:value-of select="../LBL"/>
                </xsl:attribute>
            </input>
            <!--<xsl:value-of select="../LBL"/>-->
        </label>
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
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro" title="{../LBL}"  onblur="validateInputDate('{../NAME}', event)" readOnly="true" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
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
    </INPUT>
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">            
            <button class="BTNhide" oldClassName = "BTNimg" title="{$calendar}" onclick="disp_cal('{../NAME}', event)" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOcalendar"> 
            <span class="LBLinv"><xsl:value-of select = "$calendar"/></span> 
            </span>
            </button>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count(../LOV) &gt; 0">
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </xsl:if>
</xsl:template>

<xsl:template name="dispDateTimeField_tmp">
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="fnFormatTimeStamp(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="class">
                <xsl:text>LBLstd</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="20"/>
        </xsl:attribute>
    </INPUT>
</xsl:template>

<xsl:template name="dispTextareaField_tmp" >
    <xsl:param name="position" select="."/>

    <TEXTAREA class="TXAro" tabindex="0">
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
        <xsl:with-param name="curr_fld" select=".." /> 
    </xsl:call-template>
    <xsl:attribute name="readOnly">true</xsl:attribute>
    <xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
            <xsl:value-of select="../MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
            <xsl:value-of select="../SIZE" />
        </xsl:if>
    </xsl:attribute>
    
    <!-- for ME text fields needs add title and * !--> 
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
        <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if> 
    </TEXTAREA>
    
    <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
         <BUTTON class="BTNhide" oldClassName = "BTNimg"  disabled="true" tabindex="-1">
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative" tabindex="-1"><span class="LBLinv"><xsl:value-of select = "$narrative"/></span></span>
        </BUTTON>
    </xsl:if>
    
</xsl:template>


<xsl:template name="dispSelectField_tmp">
    
    <SELECT class="SELro">
        <xsl:if test="../TYPE = 'ROSELECT'">
            <xsl:attribute name="ROSELECT">true</xsl:attribute>
            <xsl:attribute name="onpropertychange">fnShowROSelectValue(this)</xsl:attribute>
        </xsl:if>
        <xsl:if test="../TYPE != 'ROSELECT'">
            <xsl:attribute name="disabled">true</xsl:attribute>
        </xsl:if>
    
    <xsl:attribute name="ID">
        <xsl:value-of select="concat(../BLOCK,'__',../NAME)"></xsl:value-of>
    </xsl:attribute>
    
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
            <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
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
    <BUTTON class="BTNtext" disabled = "true">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
   	</xsl:call-template>
        <xsl:choose>
            <xsl:when test="contains(../NAME,'BTN_PREV') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_REMOVE')">
                <xsl:attribute name="class">BTNimg</xsl:attribute>
                <xsl:variable name="l_btnimg">
                    <xsl:if test="contains(../NAME,'BTN_PREV')"><xsl:value-of select="'ICOprevious'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_NEXT')"><xsl:value-of select="'ICOnext'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_ADD')"><xsl:value-of select="'ICOadd'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_REMOVE')"><xsl:value-of select="'ICOremove'"/></xsl:if>
                </xsl:variable>
                <xsl:if test="count(../../BLOCK) = 0">
                    <xsl:attribute name="ID"><xsl:value-of select="../ID" /></xsl:attribute>
                    <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                </xsl:if>
                 <span tabindex="-1" class="{$l_btnimg}"></span>                   
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="count(../SRC) &gt; 0">
                    <xsl:attribute name="class">BTNtext</xsl:attribute>                   
                    <xsl:if test="count(../../BLOCK) = 0">
                        <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                        <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                    </xsl:if>
                    <xsl:variable name="l_srcimg" select="../className"/>
                    <span tabindex="-1" class="{$l_srcimg}"></span>  
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}"/>-->
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
       <xsl:value-of select="../LBL"/>
    </BUTTON>
</xsl:template>

<xsl:template name="dispFileField_tmp">
    
    <label class="LBLstd" for=""></label>
    <INPUT TYPE="File" class="TXTro"  size="10" readOnly="true" >
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
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
    <label class="LBLinv" for=""></label>
    <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>

    <!--<INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');" readOnly="true" >-->
    <label class="LBLstd" for=""></label><INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onblur="validateInputValue('{../NAME}');" readOnly="true" >
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'"> * </xsl:if>
        </xsl:attribute>
    </xsl:if>
    
    </INPUT>
</xsl:template>

<xsl:template name="dispPasswordField_tmp">    
    <Input type="PASSWORD" class="TXTro" onpaste="return false;" readOnly="true" >
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
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!-- <xsl:if test="../REQD='-1'"> * </xsl:if> -->
            </xsl:attribute>
        </xsl:if>
    </Input>
</xsl:template>

<xsl:template name="dispLabelOnlyField_tmp">
    <label class="LBLauto">
        <xsl:if test="../TYPE[text()='GROUP']">
            <xsl:attribute name="class">
                <xsl:value-of select="'LABELGroup'"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:value-of select="../LBL" />
    </label>
</xsl:template>
<xsl:template name="dispImgField_tmp">
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}">
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

    <label class="LBLauto">
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
        <span class="Astd">
        <xsl:if test="../LBL != ''">
            <xsl:value-of select="../LBL" />
        </xsl:if>

        <xsl:if test="../LBL = ''">
            <xsl:value-of select="../LABEL_LINK" />
        </xsl:if>
        </span>
    </a>
    
</xsl:template>
<xsl:template name="dispCheckboxField_tmp_fldset">
    <xsl:if test="../LBL != ''">
        <label class="LBLauto">
            <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            <input type="checkbox" class="INPUTCheckInline" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
            </input>
            <xsl:value-of select="../LBL"/>
        </label>
    </xsl:if>
    <xsl:if test="../LBL = ''">
        <label class="LBLauto LBLinv2">
            <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            <input type="checkbox" class="INPUTCheckInline" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
            </input>
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
        <input type="button" ID = "BTN_EXIT_IMG" name="BTN_EXIT" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event) " onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '2'">
        <input type="button" name="BTN_OK" ID = "BTN_OK" VALUE = "{$ok}" class="BTNfooter" onclick="fnSaveAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnSaveAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
        <input type="button" name="BTN_EXIT" ID = "BTN_EXIT_IMG" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event)" onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '3'">
        <input type="button" name="BTN_OK" ID = "BTN_OK" VALUE = "{$ok}" class="BTNfooter" onclick="fnSaveAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnSaveAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
	<input type="button" name="BTN_REJECT" ID = "BTN_REJECT" VALUE = "{$reject}" class="BTNfooter" onclick="fnRejectAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnRejectAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
        <input type="button" name="BTN_EXIT" ID = "BTN_EXIT_IMG" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event)" onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
</xsl:template>

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

</xsl:stylesheet>
