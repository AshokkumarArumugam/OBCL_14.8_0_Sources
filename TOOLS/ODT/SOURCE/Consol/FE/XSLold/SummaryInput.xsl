<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">



      <xsl:template name="typeHandler">
              <xsl:param name="fType"/>
              <xsl:param name="fldNode"/>
              <xsl:variable name="dbt" select="../DBT"/>
              <xsl:variable name="dbc" select="../DBC"/>
              <xsl:variable name="fldName" select="../NAME"/>

            <xsl:if test="$fType != 'CHECKBOX' and $fType != 'HIDDEN' and $fType != 'BUTTON'">
                <TD CLASS="colTDLabel" align="right" valign="top">
                 <xsl:if test="count($fldNode/HIDDEN) = 0 or $fldNode/HIDDEN = 0">
                    <xsl:call-template name="dispLabelField">
                      <xsl:with-param name="dbt" select="$dbt"/>
                      <xsl:with-param name="dbc" select="$dbc"/>
                      <xsl:with-param name="fldName" select="$fldName"/>
                      <xsl:with-param name="fldNode" select="$fldNode"/>
                    </xsl:call-template>
                  </xsl:if>
                </TD>
            </xsl:if>
            <xsl:if test="$fType = 'CHECKBOX' or $fType = 'BUTTON'"> 
                <TD CLASS="colTDLabel" align="right" valign="top"></TD>
             </xsl:if>   
              <TD valign="top">
                     <xsl:if test="$fType ='TEXT' or $fType='AMOUNT' or $fType='DATE' or $fType='ACCOUNT' or $fType='BRANCH' or $fType='CURRENCY' or $fType='CUSTOMER' or $fType='MASK' or $fType='RESTRICTED_TEXT'">
                            <xsl:attribute name="CLASS">colTDText</xsl:attribute>
                            <xsl:call-template name="dispEntityField">
                                   <xsl:with-param name="EntityType" select="../TYPE"/>
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
<!--                     
                          <xsl:attribute name="valign">top</xsl:attribute>
                          <xsl:attribute name="colspan">2</xsl:attribute>
-->                          
<!--
                            <xsl:call-template name="dispRadioField">
                                   <xsl:with-param name="dbt" select="../DBT"/>
                                   <xsl:with-param name="dbc" select="../DBC"/>
                                   <xsl:with-param name="fldName" select="../NAME"/>
                            </xsl:call-template>
-->                            
                            <xsl:call-template name="dispRadioToSelectField">
                                   <xsl:with-param name="dbt" select="$dbt"/>
                                   <xsl:with-param name="dbc" select="$dbc"/>
                                   <xsl:with-param name="fldName" select="$fldName"/>
                                   <xsl:with-param name="fldNode" select="$fldNode"/>
                            </xsl:call-template>
                     </xsl:if>
                     <xsl:if test="$fType = 'CHECKBOX'">
                            <xsl:call-template name="dispCheckboxField">
                                   <xsl:with-param name="dbt" select="$dbt"/>
                                   <xsl:with-param name="dbc" select="$dbc"/>
                                   <xsl:with-param name="fldName" select="$fldName"/>
                                   <xsl:with-param name="fldNode" select="$fldNode"/>
                            </xsl:call-template>
                            <NOBR>
                              <xsl:call-template name="dispLabelField">
                                <xsl:with-param name="dbt" select="$dbt"/>
                                <xsl:with-param name="dbc" select="$dbc"/>
                                <xsl:with-param name="fldName" select="$fldName"/>
                                <xsl:with-param name="fldNode" select="$fldNode"/>
                              </xsl:call-template>                              
                            </NOBR>
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
                            <xsl:attribute name="CLASS">DispNone</xsl:attribute>
                            <xsl:call-template name="dispHiddenField">
                                   <xsl:with-param name="dbt" select="$dbt"/>
                                   <xsl:with-param name="dbc" select="$dbc"/>
                                   <xsl:with-param name="fldName" select="$fldName"/>
                                   <xsl:with-param name="fldNode" select="$fldNode"/>
                            </xsl:call-template>
                     </xsl:if>
              </TD>
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
    <!-- <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
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

    <!--<xsl:call-template name="RequiredFieldHandler">
             <xsl:with-param name="curr_fld" select="$fldNode" />
      </xsl:call-template>
      !-->

		<INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
			<xsl:call-template name="ATTR_HiddenEntity_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
   	   		</xsl:call-template>
		</INPUT>

		<INPUT TYPE="TEXT" CLASS="TextAmount" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}')" >
			
			<xsl:call-template name="ATTR_InputEntity_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
   	  </xsl:call-template>
   	   	
			<xsl:attribute name="style">
				<xsl:text>{text-align:</xsl:text>
				<xsl:text>right;}</xsl:text>
			</xsl:attribute>
      
      <!-- sundar added May 14...for MIN_VAL and MAX_VAL -->
      <xsl:attribute name="MIN_VAL">
        <xsl:value-of select="$fldNode/MIN_VAL"/>
      </xsl:attribute>
      <xsl:attribute name="MAX_VAL">
        <xsl:value-of select="$fldNode/MAX_VAL"/>
      </xsl:attribute>
      <!--Reddy Prasad commented this for RAD -->
      <!-- <xsl:if test="../MIN_VAL != '' and ../MAX_VAL != ''">
        <xsl:attribute name = "onblur">
          <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute>
      </xsl:if> -->
	        
			<xsl:call-template name="LovHandler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
			</xsl:call-template>
                            
		</INPUT>
	</xsl:template>


	<!-- Takes care of features common in Date Field of Absolute/Column Positioning -->
	<xsl:template name="dispDateField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
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

      <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
      </xsl:call-template>
      <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
        <BUTTON CLASS="ButtonLov" onclick="disp_cal('{$fldNode/NAME}', '{$fldNode/NAME}I')">
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Calendar.gif" title="Calendar"/>
        </BUTTON>
      </xsl:if>
			
	    </INPUT>
	</xsl:template>


	<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
	<xsl:template name="dispMaskField">
		
		<xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->

		<!-- Display Text box for Date -->
		<INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
			<xsl:call-template name="ATTR_HiddenEntity_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
   	  </xsl:call-template>
                     
                     
		</INPUT>

		<INPUT TYPE="TEXT" CLASS="TextNormal" mask="{$fldNode/MASK}" onactivate="acceptInputValue('{$fldNode/NAME}')" onbeforedeactivate="validateInputValue('{$fldNode/NAME}');">
			
			<xsl:call-template name="ATTR_InputEntity_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
   	  </xsl:call-template>
<!--
      <xsl:if test="$Brn_Neo = ''">        
        <xsl:if test="count($fldNode/TEXT-ALIGN) &gt; 0">
          <xsl:attribute name="STYLE">
            <xsl:text>{TEXT-ALIGN:</xsl:text>
            <xsl:value-of select="$fldNode/TEXT-ALIGN" />
            <xsl:text>;}</xsl:text>
          </xsl:attribute>
        </xsl:if>
      </xsl:if> -->
                     
		</INPUT>
	</xsl:template>

	<!-- Takes care of features common in RestrictedText Field of Absolute/Column Positioning -->
	<xsl:template name="dispRestrictedTextField">
    
		<xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->

		<!-- Display Text box -->
		<INPUT TYPE="TEXT" CLASS="TextNormal" onblur="validateRestrictedTextValue(this)">
	
			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
   	   		</xsl:call-template>

			<xsl:if test="$fldNode/TYPE='RESTRICTEED_TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
				<xsl:attribute name="style">
					<xsl:text>{text-align:right;}</xsl:text>
				</xsl:attribute>
			</xsl:if>

			<!-- Set the maximum number of characters user can enter -->
			<xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
          <xsl:value-of select="$fldNode/MAXLENGTH" />
				</xsl:if>
        <xsl:if test="count($fldNode/MAXLENGTH) = 0">
          <xsl:value-of select="$fldNode/SIZE" />
				</xsl:if>
			</xsl:attribute>

      <!-- sundar May 10...for Text Align Attribute                      
    <xsl:if test="$Brn_Neo = ''">      
      <xsl:if test="count($fldNode/TEXT-ALIGN) &gt; 0">
        <xsl:attribute name="STYLE">
          <xsl:text>{TEXT-ALIGN:</xsl:text>
          <xsl:value-of select="$fldNode/TEXT-ALIGN" />
          <xsl:text>;}</xsl:text>
        </xsl:attribute>
      </xsl:if>
    </xsl:if>-->

			<xsl:if test="(count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER')">
        <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute> 
			</xsl:if>

      <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
        <xsl:with-param name="EntityType" select="$EntityType" />
      </xsl:call-template>


			<xsl:if test="count($fldNode/LOV) = 0 ">
				<xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
					<BUTTON CLASS="ButtonLov" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
						<xsl:call-template name="Popup_Handler" />
              <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
					</BUTTON>
				</xsl:if>
			</xsl:if>
		</INPUT>
	</xsl:template>


	<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
	<xsl:template name="dispTextField">
    
		<xsl:param name="EntityType"/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->

		<!-- Display Text box -->
		<INPUT TYPE="TEXT" CLASS="TextNormal" >
			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
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

      <!-- sundar May 10...for Text Align Attribute                      
    <xsl:if test="$Brn_Neo = ''">
      <xsl:if test="count($fldNode/TEXT-ALIGN) &gt; 0">
            <xsl:attribute name="STYLE">
        <xsl:text>{TEXT-ALIGN:</xsl:text>
        <xsl:value-of select="$fldNode/TEXT-ALIGN" />
        <xsl:text>;}</xsl:text>
          </xsl:attribute>
        </xsl:if>
    </xsl:if>-->

			<!-- Yugandhar added satrts -->	
			<xsl:if test="(count($fldNode/UPPERCASE) &gt; 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) &gt; 0 and $fldNode/CASE = 'UPPER')">
         <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute>       
			</xsl:if>

      <xsl:call-template name="LovHandler">
        <xsl:with-param name="curr_fld" select="$fldNode" />
        <xsl:with-param name="EntityType" select="$EntityType" />
      </xsl:call-template>

			<xsl:if test="count($fldNode/LOV) = 0 ">
				<xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
				
					<BUTTON CLASS="ButtonLov" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
						<xsl:call-template name="Popup_Handler" />
                		<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
					</BUTTON>
				</xsl:if>
			</xsl:if>
   
		</INPUT>
	</xsl:template>


	<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
  <xsl:template name="dispSelectField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
    <SELECT CLASS="SELECTList">
      <xsl:attribute name="ID">
        <xsl:value-of select="concat($dbt,'__',$dbc)">
        </xsl:value-of>
      </xsl:attribute>
      <xsl:call-template name="ATTR_Handler">
        <xsl:with-param name="curr_fld" select="$fldNode"/>
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
        <OPTION CLASS="SELECTListOption" VALUE="{@VALUE}">
            <!--ashok  in summary always the blank will be the default.
            <xsl:if test="count(@SELECTED) &gt; 0 and @SELECTED=-1">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
            </xsl:if>
            !-->
            <xsl:if test="(@VALUE)=''">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
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
    <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
      
    <INPUT TYPE="CHECKBOX" CLASS="INPUTCheckbox" DBC ="{$dbc}" DBT = "{$dbt}" NAME = "{$fldName}" OnClick="fnVisited(this)">
	<xsl:attribute name="VISITED">N</xsl:attribute> <!-- Rakesh on 27Mar2007-->
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
  </xsl:template>
	

	<!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
	<xsl:template name="dispTextareaField">
    <xsl:param name="position" select="."/>
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
  
    

		<!-- Display Textarea -->
              <!-- ROWS="{$curr_fld/CUSTOM/ROWS}" COLS="{$curr_fld/CUSTOM/COLS}" -->
		<TEXTAREA CLASS="TEXTAREASmall">
    
			<xsl:call-template name="ATTR_Handler">
				 <xsl:with-param name="curr_fld" select="$fldNode" /> 
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
      <!-- sundar added May 15.. popup edit for textarea -->
				<xsl:if test="count($fldNode/POPUPEDIT) &gt; 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
					<BUTTON CLASS="ButtonLov" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
						<xsl:call-template name="Popup_Handler" />
              <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
					</BUTTON>
				</xsl:if>

	</xsl:template>


	<!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
	<xsl:template name="dispFileField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->

		<!-- Display File -->
		<INPUT TYPE="File" CLASS="TextFile" >
			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select="$fldNode" />
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

		<!-- Set the maximum number of characters user can enter -->
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
<!--
		<xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
			<xsl:attribute name="READONLY">true</xsl:attribute>
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
		</xsl:if> -->
			
		<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
			    <xsl:attribute name="ACCESSKEY">
				<xsl:value-of select="$curr_fld/ACCESSKEY" />
			</xsl:attribute>
		</xsl:if>
             <!-- Sundar Jun08 .. Support for TAB INDEX Kals Removing tab index
               <xsl:attribute name="TABINDEX">
                         <xsl:value-of select="$curr_fld/TABINDEX" />
              </xsl:attribute>
              -->
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
		<!-- Jijesh added for REFFIELD  Kals Feb 4 Changing to REF_FIELD
		<xsl:attribute name="REFER_FIELD">
			<xsl:value-of select="$curr_fld/REFER_FIELD" />
		</xsl:attribute>
		-->
    <!-- sundar added May 8...REF_FIELD should have only DBC 
		<xsl:attribute name="REF_FIELD">
			<xsl:value-of select="$curr_fld/REF_FIELD" />
		</xsl:attribute>
		-->
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

		<!-- Display Required Flag -->
<!-- Commented on Jul 19 by sundar....to remove * for summary fields even its required field
		<xsl:if test="$curr_fld/REQUIRED = -1"> 
    			<SPAN CLASS="SPANFlag" title="Required Field">*</SPAN>
		</xsl:if>
		
		<xsl:if test="count($curr_fld/REQUIRED) = 0 or $curr_fld/REQUIRED != -1">  -->
			<SPAN CLASS="SPANFlag" title="Required Field" style="visibility:hidden;">*</SPAN>
<!--		</xsl:if> -->

	</xsl:template>



  <!-- Handler for LOV -->
<!--  
  <xsl:template name="LovHandler">
    <xsl:param name="curr_fld"/>
    <xsl:param name="EntityType"/>
    <xsl:variable name="FldDBC" select="$curr_fld/DBC"/>
    <xsl:variable name="FldDBT" select="$curr_fld/DBT"/>
    
    <xsl:variable name="LovName">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/NAME"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/NAME"/>
        </xsl:if>         
    </xsl:variable>              
    
    <xsl:variable name="LovTitle">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']/FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/TITLE"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/TITLE"/>
        </xsl:if>         
    </xsl:variable>              
    
    <xsl:variable name="LovColH">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/COL_HEADING"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/COL_HEADING"/>
        </xsl:if>         
    </xsl:variable>              
    
    <xsl:variable name="LovFormName">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/FORM_NAME"/>
        </xsl:if>                             
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/FORM_NAME"/>
        </xsl:if>         
    </xsl:variable>              
      
    <xsl:variable name="LovRet_Flds">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/RET_FLDS"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/RET_FLDS"/>
        </xsl:if>         
    </xsl:variable>              
    
    <xsl:variable name="LovBindVars">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/BIND_VARS"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/BIND_VARS"/>
        </xsl:if>         
    </xsl:variable>              
    
    <xsl:variable name="LovRed_Fld_Lbls">       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV) &gt; 0 )" >
            <xsl:value-of select="//BLOCK[@TYPE = 'Single Entry']//FIELD[DBT = $FldDBT][DBC = $FldDBC]/LOV/REDUCTION_FLD_LABELS"/>
        </xsl:if>                      
       
        <xsl:if test = "(count(//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV) &gt; 0 )">
          <xsl:value-of select = "//BLOCK[@TYPE = 'Multiple Entry'][DBT = $FldDBT]//FIELD[DBC = $FldDBC]/LOV/REDUCTION_FLD_LABELS"/>
        </xsl:if>         
    </xsl:variable>              
  
    
    
    <xsl:if test="$Brn_Neo != ''">
      <xsl:if test="($LovName != '' and  count($curr_fld/READ_ONLY) = 0 or $curr_fld/READ_ONLY = 0)"> 
    
        <BUTTON CLASS="ButtonLov" 
                ONCLICK="{$LovName}.show_lov('{$LovRet_Flds}','{$LovFormName}','{$LovBindVars}', '{$LovTitle}', '{$LovColH}', '{$LovRed_Fld_Lbls}')"        
                onmouseover="this.className='ButtonLovOver'"
                onmouseout="this.className='ButtonLov'">
          <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="READONLY">-1</xsl:attribute>
          </xsl:if>
          <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
            <xsl:attribute name="READONLY">-1</xsl:attribute>
          </xsl:if>
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"
               title="List of Values"/>
        </BUTTON>
      </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">
       <xsl:if test="$LovName != '' ">
        <BUTTON CLASS="ButtonLov" 
                ONCLICK="{$LovName}.show_lov('{$LovRet_Flds}','{$LovFormName}','{$LovBindVars}', '{$LovTitle}', '{$LovColH}', '{$LovRed_Fld_Lbls}')"                
                onmouseover="this.className='ButtonLovOver'"
                onmouseout="this.className='ButtonLov'">
          <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
            <xsl:attribute name="DISABLED"/>
          </xsl:if>
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
        </BUTTON>
      </xsl:if>
    </xsl:if>
    -->
	<xsl:template name="LovHandler">
		
		<xsl:param name="curr_fld" />
		<xsl:param name="EntityType" />

    <xsl:if test="$Brn_Neo != ''">
      <xsl:if test="count($curr_fld/LOV) &gt; 0 and (count($curr_fld/READ_ONLY) = 0 or $curr_fld/READ_ONLY = 0)">
       <!-- <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" -->
         <BUTTON CLASS="ButtonLov"  ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')"               

                     onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'" >

              <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                     <xsl:attribute name="READONLY">-1</xsl:attribute>
              </xsl:if>
              
              <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
                     <xsl:attribute name="READONLY">-1</xsl:attribute>
              </xsl:if>
                              
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"  title="List of Values"/>
        </BUTTON>
      </xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">
  		<xsl:if test="count($curr_fld/LOV) &gt; 0 ">
         <!-- <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" kals reming tabindex-->
          <BUTTON CLASS="ButtonLov" ONCLICK="{normalize-space($curr_fld/LOV/NAME)}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')"         
                       onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'" >
                       <!--
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                   <xsl:attribute name="DISABLED"/>
            </xsl:if> -->
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
				</BUTTON>
			</xsl:if>
    </xsl:if>    

    <xsl:if test="count($curr_fld/LOV) = 0 ">
      <xsl:if test="$EntityType = 'ACCOUNT' ">
        <BUTTON CLASS="ButtonLov" ONCLICK="Account.show_lov()">
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
        </BUTTON>
      </xsl:if>
      <xsl:if test="$EntityType = 'BRANCH' ">
        <BUTTON CLASS="ButtonLov" ONCLICK="Branch.show_lov()">
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
        </BUTTON>
      </xsl:if>
      <xsl:if test="$EntityType = 'CURRENCY' ">
        <BUTTON CLASS="ButtonLov" ONCLICK="Currency.show_lov()">
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
        </BUTTON>
      </xsl:if>
      <xsl:if test="$EntityType = 'CUSTOMER' ">
        <BUTTON CLASS="ButtonLov" ONCLICK="Customer.show_lov()">
          <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
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
    
    
		
		<xsl:attribute name="ID">
			<xsl:if test="count($curr_fld/DBT) &gt; 0">
				    <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
			</xsl:if>
			<xsl:if test="count(../DBT) &lt; 1">
				    <xsl:value-of select="concat(../DBT,'__',$curr_fld/DBC)" />
			</xsl:if>
		</xsl:attribute>

		<xsl:attribute name="DBT">
		    <xsl:value-of select="$curr_fld/DBT" />
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
		</xsl:if>

		<xsl:attribute name="SIZE">
			    <xsl:value-of select="$curr_fld/SIZE" />
		</xsl:attribute>


     <xsl:if test = "$curr_fld[TYPE = 'TEXTAREA']">
            <xsl:attribute name="ROWS"><xsl:value-of select="$curr_fld/ROWS"/></xsl:attribute>
            <xsl:attribute name="COLS"><xsl:value-of select="$curr_fld/COLS"/></xsl:attribute>            
     </xsl:if>
<!-- Sundar added on 09 Aug...to remove Readonly and disabled attributes in summary screen
		<xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
                     <xsl:attribute name="READONLY">true</xsl:attribute>
                     <xsl:attribute name="CLASS">TextReadonly</xsl:attribute>       	     
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
-->
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
    
      <!-- Kals Aprl 13 .. Support for <HIDDEN> -1</HIDDEN> -->
      <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="CLASS">hidden</xsl:attribute>
      </xsl:if>
      <!-- Kals Aprl 13 .. Support for TAB INDEX Kals July 5 Removing tabindex 
        <xsl:attribute name="TABINDEX">
		    <xsl:value-of select="$curr_fld/TABINDEX" />
	    </xsl:attribute>
      -->
      
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
        <xsl:attribute name="MIN_VAL">
          <xsl:value-of select="$curr_fld/MIN_VAL"/>
        </xsl:attribute>
        <xsl:attribute name="MAX_VAL">
          <xsl:value-of select="$curr_fld/MAX_VAL"/>
        </xsl:attribute>
        <xsl:attribute name="MAX_DECIMALS">
          <xsl:value-of select="$curr_fld/MAX_DECIMAL"/>
        </xsl:attribute>
        <!--Reddy Prasad commented this for RAD -->
        <!-- <xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute> -->
      </xsl:if>
      
      
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

    <BUTTON CLASS="INPUTButton" >
      <xsl:call-template name="ATTR_Handler">
      <xsl:with-param name="curr_fld" select="$fldNode" />
      </xsl:call-template>

      <xsl:value-of select="$fldNode/LABEL" />

     	<xsl:if test="count($fldNode/SRC) &gt; 0">
			<!-- Display Image -->
		    <IMG id="{$fldNode/NAME}_IMG" SRC="{$fldNode/SRC}" >
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
      <!-- <xsl:variable name ="rFldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc]"/> -->
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
<!--
                 <xsl:call-template name="ATTR_Handler">
                    <xsl:with-param name="curr_fld" select=".."/>
                 </xsl:call-template> -->
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
      <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
      <INPUT TYPE="HIDDEN">
             <xsl:call-template name="ATTR_Handler">
                    <xsl:with-param name="curr_fld"
                                    select="$fldNode"/>
             </xsl:call-template>
      </INPUT>
   </xsl:template>
   
  <xsl:template name="dispRadioToSelectField">
      <xsl:param name="dbt"/>
      <xsl:param name="dbc"/>
      <xsl:param name="fldName"/>
      <xsl:param name="fldNode"/>
      <!-- <xsl:variable name ="fldNode" select = "//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/> -->
      <SELECT CLASS="SELECTList">
        <xsl:attribute name="ID">
          <xsl:value-of select="concat($dbt,'__',$dbc)">
          </xsl:value-of>
        </xsl:attribute>
        <xsl:call-template name="ATTR_Handler">
          <xsl:with-param name="curr_fld" select="$fldNode"/>
        </xsl:call-template>
          <xsl:attribute name="title">
            <xsl:value-of select="$fldNode/LABEL"/>
          </xsl:attribute>
  
        <OPTION CLASS="SELECTListOption" VALUE=""></OPTION>
        <xsl:for-each select="$fldNode/OPTION">
          <OPTION CLASS="SELECTListOption" VALUE="{VALUE}">
            <!-- Ashok in case of Summary, Default always will be empty.
            <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
              <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
            </xsl:if> 
            !-->
            <xsl:if test="@VALUE = ''">
              <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
            </xsl:if> 
            <xsl:value-of select="LABEL"/>
          </OPTION>
        </xsl:for-each>
      </SELECT>      
  </xsl:template>
       
</xsl:stylesheet>