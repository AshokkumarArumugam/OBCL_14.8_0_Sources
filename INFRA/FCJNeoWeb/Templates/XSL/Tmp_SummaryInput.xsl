<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">



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
            <xsl:when test="$fType = 'BUTTON'">
                <div class="DIVText"></div>
            </xsl:when>
            <xsl:when test="$fType = 'CHECKBOX'">
                <label class="LABELNormal"></label>
                <div class="DIVCheckRadio" style="width:9em">
                    <xsl:call-template name="dispCheckboxField">
                        <xsl:with-param name="dbt" select="$dbt"/>
                        <xsl:with-param name="dbc" select="$dbc"/>
                        <xsl:with-param name="fldName" select="$fldName"/>
                        <xsl:with-param name="fldNode" select="$fldNode"/>
                    </xsl:call-template>                        
                </div>
            </xsl:when>
            <!--<xsl:when test="$fType = 'CHECKBOX' or $fType = 'BUTTON'">
                <div class="DIVText"></div>
            </xsl:when>-->
            <xsl:when test="$fType = 'SELECT' or $fType = 'RADIO'">            
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
            <table summary="" width="99.9%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="10%">   
                        <xsl:call-template name="dispLabelField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    </td>
                    <td>
                        <xsl:call-template name="dispSelectField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    </td>
                </tr>
            </table>
        </xsl:if>
        <xsl:if test="$fType = 'RADIO'">
            <table summary="" width="99.9%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="10%">   
                        <xsl:call-template name="dispLabelField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    </td>
                    <td>
                        <xsl:call-template name="dispRadioToSelectField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    </td>
                </tr>
            </table>            
        </xsl:if>
        <!--<xsl:if test="$fType = 'CHECKBOX'">
            <label class="LABELCheckSummary" style="float:left">
            <xsl:call-template name="dispCheckboxField">
                <xsl:with-param name="dbt" select="$dbt"/>
                <xsl:with-param name="dbc" select="$dbc"/>
                <xsl:with-param name="fldName" select="$fldName"/>
                <xsl:with-param name="fldNode" select="$fldNode"/>
            </xsl:call-template>
            <xsl:value-of select="$fldNode/LABEL"/>
            </label>
        </xsl:if>-->
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
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Icons/calendar.gif" ALT="{$calendar_SummaryAudit}"/>-->
                <SPAN class="IMGInline BtnCalender" title="{$calendar_SummaryAudit}"></SPAN><!-- Data Uri changes -->
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
                <!--<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    
    <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
    <xsl:if test="count($fldNode/POPUPEDIT) = 0" >
        <xsl:if test="number($fldNode/SIZE) &gt; 25">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'" >
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <!--IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/Icons/narrative.gif" alt="{$narrative_SummaryAudit}"/>-->
                    <SPAN class="IMGPopupEdit BtnNarrative" title="{$narrative_SummaryAudit}"></SPAN><!--Data Uri changes -->
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

    <label class="LABELCheckSummary" for="{$dbt}__{$dbc}">
        <INPUT TYPE="CHECKBOX" DBC ="{$dbc}" DBT = "{$dbt}" NAME = "{$fldName}">
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
    </label>
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
                <!--<IMG CLASS="IMGInline" title="{$lov_SummaryAudit}" SRC="{$imgPath_XSL}/Lov.gif"  alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
    </xsl:if>
    
    <xsl:if test="$Brn_Neo = ''">
        <!--<xsl:if test="count($curr_fld/LOV) &gt; 0 "> if $curr_fld/TYPE = TEXT-->
        <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT'" >
            <BUTTON CLASS="BUTTONInline" tabindex="-1" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
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
                <!--<IMG CLASS="IMGInline" SRC="{$imgPath_XSL}/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
       <!-- </xsl:if>-->
    </xsl:if>    
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Account.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" title="{$lov_SummaryAudit}" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Branch.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" title="{$lov_SummaryAudit}" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Currency.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" title="{$lov_SummaryAudit}" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
                <SPAN class="IMGInline BTNLov" title="{$lov_SummaryAudit}"></SPAN><!--Data Uri -->
            </BUTTON>
        </xsl:if>
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON CLASS="BUTTONInline" tabindex="-1" ONCLICK="Customer.show_lov()" onMouseOver="this.className='BUTTONInlineHover'" onMouseOut="this.className='BUTTONInline'" onFocus="this.className='BUTTONInlineHover'" onBlur="this.className='BUTTONInline'">
                <!--<IMG CLASS="IMGInline" title="{$lov_SummaryAudit}" SRC="{$imgPath_XSL}/Icons/Lov.gif" alt="{$lov_SummaryAudit}"/>-->
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
        <xsl:if test="number($curr_fld/SIZE) &gt; 25">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="25" />
        </xsl:attribute>
        </xsl:if>
        <xsl:if test="number($curr_fld/SIZE) &lt; 25">
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
        <LABEL>
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
       
</xsl:stylesheet>
