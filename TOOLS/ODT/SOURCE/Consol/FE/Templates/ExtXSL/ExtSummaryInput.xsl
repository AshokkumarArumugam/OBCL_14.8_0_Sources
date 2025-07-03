<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
    <xsl:template name="typeHandler">
        <xsl:param name="fType"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
        <xsl:variable name="dbc" select="$fldNode/NAME"/>
        <xsl:variable name="fldName" select="$fldNode/NAME"/>
        <div class="DIVText">
            <xsl:choose>
                <xsl:when test="$fType='AMOUNT' or $fType='DATE' or ($fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER'))">
                    <xsl:call-template name="dispLabelHidden"/>
                </xsl:when>
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
                    <b class="LBLstd"/>
                    <div class="DIVchkrad">                        
                        <xsl:call-template name="dispCheckboxField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
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
                <xsl:call-template name="dispSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'RADIO'">
                <xsl:call-template name="dispRadioToSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>           
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
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <!-- Call the appropriate template based on the entity -->
        <xsl:choose>
            <xsl:when test="$EntityType = 'AMOUNT'">
                <xsl:call-template name="dispAmountField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'ACCOUNT'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'BRANCH'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CURRENCY'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CUSTOMER'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'DATE'">
                <xsl:call-template name="dispDateField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'MASK'">
                <xsl:call-template name="dispMaskField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
                <xsl:call-template name="dispRestrictedTextField">
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
                <xsl:call-template name="dispTextField">
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
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
        <label class="LBLstd"><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$fldNode/MIN_VAL"/>
            </xsl:attribute>
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$fldNode/MAX_VAL"/>
            </xsl:attribute>
            <!--<xsl:if test="../MIN_VAL != '' and ../MAX_VAL != ''">
                <xsl:attribute name="onblur">
                    <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
            <xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
                <xsl:value-of select="$fldNode/NAME"/>
                <xsl:text disable-output-escaping="yes">', '</xsl:text>
                <xsl:value-of select="$relatedFld"/>
                <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this);</xsl:text>
            </xsl:attribute>
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$lov}" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
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
                <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>               
        </xsl:if>
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
        <label class="LBLinv" for=""></label>
        <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" onactivate="acceptInputDate('{$fldNode/NAME}', event)" onbeforedeactivate="validateInputDate('{$fldNode/NAME}', event)">-->
        <label class="LBLstd"><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd" onblur="validateInputDate('{$fldNode/NAME}', event)">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
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
            <xsl:with-param name="curr_fld" select="$fldNode"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$calendar}" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'" onclick="disp_cal('{$fldNode/NAME}', event)" >                    
                <span tabindex="-1" class="ICOcalendar">                
                <span class="LBLinv"><xsl:value-of select = "$calendar"/></span> 
                </span>
            </BUTTON>               
        </xsl:if>
    </xsl:template>
    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispMaskField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLinv" for=""></label>
        <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onactivate="acceptInputValue('{$fldNode/NAME}')" onbeforedeactivate="validateInputValue('{$fldNode/NAME}');">-->
        <label class="LBLstd" for=""></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onblur="validateInputValue('{$fldNode/NAME}');">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
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
        <!-- Changes for AUTO_LOV start-->
        <label class="LBLstd" for=""></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd">
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">        
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnToUppercase(this, event);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
            </xsl:if>
            <!-- Changes for AUTO_LOV end-->
    
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:if test="$fldNode/TYPE='RESTRICTEED_TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:attribute name="CLASS">
                    <xsl:text>TXTstd numeric</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count(../MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <BUTTON CLASS="BTNimg"
                		title="{$narrative}"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>                        
                </BUTTON>
            </xsl:if>
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
        <label class="LBLstd" for=""><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
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
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
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
                <span tabindex="-1" class="ICOlov"></span>
            </BUTTON>               
        </xsl:if>
    </xsl:template>

    <xsl:template name="dispTextField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLstd" for=""></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:if test="$fldNode/TYPE='TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:attribute name="CLASS">
                    <xsl:text>TXTstd numeric</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!-- Set the maximum number of characters user can enter -->
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>
             <!--Changes for AUTO LOV start-->
            <xsl:if test="(count($fldNode/UPPERCASE) > 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) > 0 and $fldNode/CASE = 'UPPER')">
                <xsl:attribute name="onblur">
                    <xsl:text>fnToUppercase(this,event);fnBuildAutoSummaryLOV('</xsl:text>
                    <xsl:value-of select="normalize-space(../NAME)"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="../LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="normalize-space(../DTYPE)"/>
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="(count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER')">
                <xsl:attribute name="onblur">
                    <xsl:text>fnBuildAutoSummaryLOV('</xsl:text>
                    <xsl:value-of select="normalize-space(../NAME)"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="../LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="normalize-space(../DTYPE)"/>
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--Changes for AUTO LOV end-->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <BUTTON CLASS="BTNimg" tabindex="-1"
                		title="{$narrative}"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
                </BUTTON>
            </xsl:if>
        </xsl:if>
        <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
        <xsl:if test="count($fldNode/POPUPEDIT) = 0">
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
                <BUTTON CLASS="BTNimg" tabindex="-1"
                		title="{$narrative}"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
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
        <SELECT CLASS="SELstd">
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
                <xsl:value-of select="$fldNode/LBL"/>
            </xsl:attribute>
            <xsl:if test="count($fldNode/WIDTH) > 0">
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
                        <xsl:attribute name="DEFAULT">
                            <xsl:value-of select="@VALUE"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </OPTION>
            </xsl:for-each>
            <xsl:variable name="dfltReqd">
                <xsl:for-each select="$fldNode/OPTION">
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
                <OPTION VALUE="" SELECTED="SELECTED" DEFAULT="">
                </OPTION>
            </xsl:if>
        </SELECT>
    </xsl:template>
    <!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
    <xsl:template name="dispCheckboxField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLauto" for="{$dbt}__{$dbc}">
        <INPUT TYPE="CHECKBOX" DBC="{$dbc}" DBT="{$dbt}" NAME="{$fldName}" id="{$dbt}__{$dbc}">
            <xsl:if test="count($fldNode/CHECKED) > 0 and $fldNode/CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            </xsl:if>
            <xsl:if test="count($fldNode/CUSTOM) > 0">
                <xsl:attribute name="ON">
                    <xsl:value-of select="$fldNode/CUSTOM/ON"/>
                </xsl:attribute>
                <xsl:attribute name="OFF">
                    <xsl:value-of select="$fldNode/CUSTOM/OFF"/>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
        <xsl:value-of select="$fldNode/LBL"/>
        </label>
    </xsl:template>
    <!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
    <xsl:template name="dispTextareaField">
        <xsl:param name="position" select="."/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <TEXTAREA CLASS="TXAstd">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
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
        <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
            <BUTTON CLASS="BTNimg" title="{$narrative}" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
                        <xsl:call-template name="Popup_Handler"/>
                        <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
            </BUTTON>
        </xsl:if>
    </xsl:template>
    <!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
    <xsl:template name="dispFileField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLstd" for=""></label>
        <INPUT TYPE="File" CLASS="TextFile">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
        </INPUT>
    </xsl:template>
    <!-- Display Date attribute handler -->
    <xsl:template name="ATTR_InputEntity_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME"/>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:if test="count(../SIZE) != 0">
                    <xsl:value-of select="../SIZE"/>
                </xsl:if>
                <xsl:if test="count(../SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                    <xsl:text>16</xsl:text>
                </xsl:if>
            </xsl:if>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/ACCESSKEY) > 0">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="$curr_fld/EVENT"/>
    </xsl:template>
    <!-- Hidden Date Handler -->
    <xsl:template name="ATTR_HiddenEntity_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:if test="count($curr_fld/VALUE) > 0">
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$curr_fld/VALUE"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../../SUMMARY_DATA_BLK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
        </xsl:attribute>
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQD"/>
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
    <!--<xsl:template name="RequiredFieldHandler">
        <xsl:param name="curr_fld" select="."/>
        <img src="{$imgPath_XSL}/star_disabled.gif" alt=""/>
    </xsl:template>-->
    <xsl:template name="LovHandler">
        <xsl:param name="curr_fld"/>
        <xsl:param name="EntityType"/>
        <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT'">
            <BUTTON CLASS="BTNimg" title="{$lov}" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnBuildExtSummaryLOV('</xsl:text>
                    <xsl:value-of select="$curr_fld/NAME"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="$curr_fld/LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="$curr_fld/DTYPE"/>
                    <xsl:text>', '', event)</xsl:text>
                </xsl:attribute>
                <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        <xsl:if test="count($curr_fld/LOV) = 0 ">
            <xsl:if test="$EntityType = 'ACCOUNT' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" ONCLICK="Account.show_lov()"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'BRANCH' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" ONCLICK="Branch.show_lov()"
                	onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'CURRENCY' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" ONCLICK="Currency.show_lov()"
                onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'CUSTOMER' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" ONCLICK="Customer.show_lov()" nMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    <!-- Handler for POPUP Editor -->
    <xsl:template name="Popup_Handler">
        <xsl:param name="fldNode"/>
        <xsl:attribute name="ONCLICK">
            <xsl:text>show_editor('</xsl:text>
            <xsl:value-of select="concat(../../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)"/>
            <xsl:text>','</xsl:text>
            <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                <xsl:value-of select="$fldNode/MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                <xsl:value-of select="$fldNode/SIZE"/>
            </xsl:if>
            <xsl:text>','</xsl:text>
            <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) =''">
                <xsl:call-template name="replaceApos">
                    <xsl:with-param name="inputString" select="$fldNode/LBL"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) !=''">
                <xsl:call-template name="replaceApos">
                    <xsl:with-param name="inputString" select="$fldNode/POPUPEDIT/TITLE"/>
                </xsl:call-template>
            </xsl:if>            
            <xsl:text>', event);</xsl:text>
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
        <xsl:param name="event_func" select="."/>
        <xsl:attribute name="onChange">
            <xsl:value-of select="$event_func"/>
        </xsl:attribute>
    </xsl:template>
    <xsl:template name="ATTR_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:param name="curr_fld_dbt"/>
        <xsl:param name="curr_fld_dbc"/>
        <xsl:param name="curr_fld_name"/>
        <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="$curr_fld/LBL"/>
        </xsl:attribute>
        <xsl:attribute name="title">
            <xsl:value-of select="$curr_fld/LBL"/>
        </xsl:attribute>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
        </xsl:attribute>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld_dbt"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld_dbc"/>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld_name"/>
        </xsl:attribute>
        <xsl:attribute name="DTYPE">
            <xsl:value-of select="$curr_fld/DTYPE"/>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/VALUE) > 0">
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$curr_fld/VALUE"/>
            </xsl:attribute>
        </xsl:if>
        <!-- Added By Murali, assigning the text field size to 25 & adding popup button-->
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
        <xsl:if test="$curr_fld[TYPE = 'TEXTAREA']">
            <xsl:attribute name="ROWS">
                <xsl:value-of select="$curr_fld/ROWS"/>
            </xsl:attribute>
            <xsl:attribute name="COLS">
                <xsl:value-of select="$curr_fld/COLS"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/ACCESSKEY) > 0">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="$curr_fld/EVENT"/>
        <xsl:apply-templates select="$curr_fld/CUSTOM"/>
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQUIRED"/>
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
        <xsl:if test="count($curr_fld/HIDDEN) > 0 and $curr_fld/HIDDEN = -1">
            <xsl:attribute name="CLASS">hidden</xsl:attribute>
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
            <xsl:attribute name="onblur">
                <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:template>

    <!-- Handler for Events -->
    <xsl:template match="EVENT">
        <xsl:attribute name="{./NAME}">
            <xsl:value-of select="./FUNCTION"/>
        </xsl:attribute>
    </xsl:template>

    <!-- Handler for Custom Attributes -->
    <xsl:template match="CUSTOM">
        <xsl:for-each select="*">
            <xsl:attribute name="{name()}">
                <xsl:value-of select="."/>
            </xsl:attribute>
        </xsl:for-each>
    </xsl:template>

    <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
    <xsl:template name="dispButtonField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <BUTTON CLASS="BTNtext" nMouseOver="this.className='BTNtextH'"
                        onMouseOut="this.className='BTNtext'"
                        onFocus="this.className='BTNtextH'"
                        onBlur="this.className='BTNtext'">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:value-of select="$fldNode/LBL"/>
            <xsl:if test="count($fldNode/SRC) > 0">
                <!-- Display Image -->
                <span tabindex="-1" class="{$fldNode/className}">
                <!--<IMG id="{$fldNode/NAME}_IMG" SRC="{$fldNode/SRC}">-->
                    <xsl:if test="count($fldNode/ALT) > 0">
                        <xsl:attribute name="ALT">
                            <xsl:value-of select="$fldNode/ALT"/>
                        </xsl:attribute>
                    </xsl:if>
                <!--</IMG>-->
                </span>
            </xsl:if>
        </BUTTON>
    </xsl:template>
    <xsl:template name="dispRadioField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="Left_or_Right" select="$fldNode/@COL"/>
        <xsl:variable name="radioColSpan" select="count($fldNode/OPTION)"/>
        <FIELDSET class="FSTstd">
            <legend>
                <b>
                    <xsl:call-template name="dispLabelField"/>
                </b>
            </legend>
            <table summary="" cellspacing="0" cellpadding="0" border="0"
                   style="table-layout:fixed;width:77%;">
                <xsl:if test="$Left_or_Right ='1'">
                    <xsl:attribute name="style">
                        <xsl:value-of select="'table-layout:fixed;width:79%;'"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:for-each select="$fldNode/OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number"
                              order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                    <tr>
                        <xsl:apply-templates select="$fldNode/OPTION[@ROW = $row]" mode="column">
                            <xsl:with-param name="radioColSpan" select="$radioColSpan"/>
                            <xsl:with-param name="Left_or_Right" select="$Left_or_Right"/>
                        </xsl:apply-templates>
                    </tr>
                </xsl:for-each>
            </table>
        </FIELDSET>
    </xsl:template>
    <!--radio option handler-->
    <xsl:template match="OPTION" mode="column">
        <xsl:param name="radioColSpan" select="."/>
        <xsl:param name="Left_or_Right" select="."/>
        <td WIDTH="*"></td>
        <td align="left">
            <xsl:if test="$Left_or_Right ='1'">
                <xsl:attribute name="align">
                    <xsl:value-of select="'center'"/>
                </xsl:attribute>
            </xsl:if>
            <LABEL class="LBLauto" for="">
                <INPUT TYPE="RADIO" CLASS="RADstd">
                    <xsl:attribute name="VALUE">
                        <xsl:value-of select="VALUE"/>
                    </xsl:attribute>
                    <xsl:if test="count(SELECTED) > 0 and SELECTED='-1'">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    </xsl:if>
                </INPUT>
                <xsl:value-of select="LBL"/>
            </LABEL>
        </td>
    </xsl:template>
    <xsl:template name="dispHiddenField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLinv" for=""></label>
        <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
        </INPUT>
    </xsl:template>
    <xsl:template name="dispRadioToSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <SELECT CLASS="SELstd">
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
                <xsl:value-of select="$fldNode/LBL"/>
            </xsl:attribute>
            <OPTION VALUE=""></OPTION>
            <xsl:for-each select="$fldNode/OPTION">
                <OPTION VALUE="{VALUE}">
                    <xsl:if test="@VALUE = ''">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="LBL"/>
                </OPTION>
            </xsl:for-each>
        </SELECT>
    </xsl:template>
</xsl:stylesheet>
