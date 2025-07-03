<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="GlobalCore.xsl"/>


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
		<INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{../RELATED_FIELD}')">
    -->
		<INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">    
			<xsl:call-template name="ATTR_HiddenEntity_Handler">
				<xsl:with-param name="curr_fld" select=".." />
   	   		</xsl:call-template>
		</INPUT>

		<!-- Display Required Flag 
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              -->
		<INPUT TYPE="TEXT" CLASS="TextAmount" onactivate="acceptInputAmount('{../NAME}', '{$relatedFld}')" onbeforedeactivate="validateInputAmount('{../NAME}', '{$relatedFld}')" >
			
			<xsl:call-template name="ATTR_InputEntity_Handler">
				<xsl:with-param name="curr_fld" select=".." />
   	   		</xsl:call-template>

			<xsl:attribute name="style">
				<xsl:text>{text-align:</xsl:text>
				<xsl:text>right;}</xsl:text>
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

<!--      <xsl:if test="../MIN_VAL != '' or ../MAX_VAL != ''"> -->
<!--Reddy prasad commented this not required for RAD -->
        <!-- <xsl:attribute name = "onblur">
          <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute> -->
<!--      </xsl:if> -->
	        
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
		</xsl:call-template>
              -->
		<INPUT TYPE="TEXT" CLASS="TextDate"  onactivate="acceptInputDate('{../NAME}')" onbeforedeactivate="validateInputDate('{../NAME}')" >
        
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
			
			<!-- Kals  Feb 4 Changing to REF_FIELD 
			<xsl:if test="../REFER_FIELD !=''">
  				<xsl:attribute name="REFER_FIELD">
					<xsl:value-of select="../REFER_FIELD" />
   				</xsl:attribute>
			</xsl:if>
			-->
      <!-- sundar ...May 8..the REF_FIELD value should be only DBC..
			<xsl:if test="../REF_FIELD !=''">
  				<xsl:attribute name="REF_FIELD">
					<xsl:value-of select="../REF_FIELD" />
   				</xsl:attribute>
			</xsl:if>
			-->
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
          <BUTTON CLASS="ButtonLov" TABINDEX="{../TABINDEX}" onclick="disp_cal('{../NAME}', '{../NAME}I')">
            <IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Calendar.gif" title="Calendar"/>
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

		<!-- Display Required Flag 
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              -->
              
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

          <!-- sundar May 10...for Text Align Attribute -->
      <!--
        <xsl:if test="$Brn_Neo = ''">        
          <xsl:if test="count(../TEXT-ALIGN) &gt; 0">
                <xsl:attribute name="STYLE">
            <xsl:text>{TEXT-ALIGN:</xsl:text>
            <xsl:value-of select="../TEXT-ALIGN" />
            <xsl:text>;}</xsl:text>
              </xsl:attribute>
            </xsl:if>
          </xsl:if> -->
                     
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
			<xsl:attribute name="MAXLENGTH">
        <xsl:if test="count(../MAXLENGTH) != 0">
          <xsl:value-of select="../MAXLENGTH" />
				</xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
          <xsl:value-of select="../SIZE" />
				</xsl:if>
			</xsl:attribute>

      <!-- sundar May 10...for Text Align Attribute 
    <xsl:if test="$Brn_Neo = ''">      
      <xsl:if test="count(../TEXT-ALIGN) &gt; 0">
        <xsl:attribute name="STYLE">
          <xsl:text>{TEXT-ALIGN:</xsl:text>
          <xsl:value-of select="../TEXT-ALIGN" />
          <xsl:text>;}</xsl:text>
        </xsl:attribute>
      </xsl:if>
    </xsl:if> -->

			<!-- Yugandhar added satrts -->	
			<xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
<!--
				<xsl:call-template name="UPPERCASE">
					<xsl:with-param name="event_func">fnToUppercase(this)</xsl:with-param>
				</xsl:call-template>		-->
       <!--  <xsl:attribute name="onkeyup">fnToUppercase(this)</xsl:attribute> Kals On June 6, Making UpperCase on onFocusOut -->
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
            <BUTTON CLASS="ButtonLov" TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
              <xsl:call-template name="Popup_Handler" />
                      <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
            </BUTTON>
          </xsl:if>
        </xsl:if>
      </xsl:if>
      <xsl:if test="$Brn_Neo = ''">   
        <xsl:if test="count(../POPUPEDIT) &gt; 0">
          <BUTTON CLASS="ButtonLov" TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
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

		<!-- Display Required Flag 
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              -->
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
			<xsl:attribute name="MAXLENGTH">
        			<xsl:if test="count(../MAXLENGTH) != 0">
		    			<xsl:value-of select="../MAXLENGTH" />
				</xsl:if>
		    
        			<xsl:if test="count(../MAXLENGTH) = 0">
		    			<xsl:value-of select="../SIZE" />
				</xsl:if>
			</xsl:attribute>

      <!-- sundar May 10...for Text Align Attribute -->     
<!--      
    <xsl:if test="$Brn_Neo = ''">
      <xsl:if test="count(../TEXT-ALIGN) &gt; 0">
            <xsl:attribute name="STYLE">
        <xsl:text>{TEXT-ALIGN:</xsl:text>
        <xsl:value-of select="../TEXT-ALIGN" />
        <xsl:text>;}</xsl:text>
          </xsl:attribute>
        </xsl:if>
      </xsl:if> -->

			<!-- Yugandhar added satrts -->	
			<xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
      <!--
				<xsl:call-template name="UPPERCASE">
					<xsl:with-param name="event_func">fnToUppercase(this)</xsl:with-param>
				</xsl:call-template>		-->
       <!--  <xsl:attribute name="onkeyup">fnToUppercase(this)</xsl:attribute> June 6 Kals , Making UperCasseOn  -->
         <xsl:attribute name="onFocusOut">fnToUppercase(this)</xsl:attribute>       
       
			</xsl:if>

                     <!-- for multiple entry text fields needs add title and * !--> 
                     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                            <xsl:attribute name="title">
                                   <xsl:value-of select="../LABEL"/>
                                   <xsl:if test="../REQUIRED='-1'"> * </xsl:if>
                            </xsl:attribute>
                     </xsl:if>
                                          

<!--			<xsl:if test="count(../LOV) &gt; 0 "> -->
				<xsl:call-template name="LovHandler">
					<xsl:with-param name="curr_fld" select=".." />
					<xsl:with-param name="EntityType" select="$EntityType" />
				</xsl:call-template>
<!--			</xsl:if> -->

<!-- sundar added for NEO...for a text field, both lov & popup can appear -->
    <xsl:if test="$Brn_Neo != ''">
			<xsl:if test="count(../LOV) = 0 ">
				<xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
					<BUTTON CLASS="ButtonLov" TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
						<xsl:call-template name="Popup_Handler" />
                		<IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
					</BUTTON>
				</xsl:if>
			</xsl:if>
    </xsl:if>
    <xsl:if test="$Brn_Neo = ''">   
      <xsl:if test="count(../POPUPEDIT) &gt; 0">
        <BUTTON CLASS="ButtonLov" TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
          <xsl:call-template name="Popup_Handler" />
                  <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
        </BUTTON>
      </xsl:if>
    </xsl:if>
		</INPUT>
	</xsl:template>


	<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
	<xsl:template name="dispSelectField">
		
              <!--
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              !-->
	
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
    
              <!--
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              !-->

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
    
              <!--
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              !-->

		<!-- Display Textarea -->
              <!-- ROWS="{$curr_fld/CUSTOM/ROWS}" COLS="{$curr_fld/CUSTOM/COLS}" -->
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
<!--                     <xsl:if test="(count(../HEIGHT) &gt; 0 and  ../HEIGHT != '') or (count(../WIDTH) &gt; 0 and ../WIDTH != '')">  -->
                        <xsl:attribute name="STYLE">
                           <xsl:text>{width:</xsl:text>
                           <xsl:value-of select="../WIDTH"/>
                           <xsl:text>px;height:</xsl:text>
                           <xsl:value-of select="../HEIGHT"/>
                           <xsl:text>px;}</xsl:text>
                        </xsl:attribute>
<!--                    </xsl:if>    -->
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
					<BUTTON CLASS="ButtonLov"  TABINDEX="{../TABINDEX}" onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'">
						<xsl:call-template name="Popup_Handler" />
              <IMG CLASS="IMGPopupEdit" SRC="{$imgPath_XSL}/narrative.gif" title="narrative"/>
					</BUTTON>
				</xsl:if>

	</xsl:template>


	<!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
	<xsl:template name="dispFileField">

		<!-- Display Required Flag 
		<xsl:call-template name="RequiredFieldHandler">
			<xsl:with-param name="curr_fld" select=".." />
		</xsl:call-template>
              -->
              
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
        <!--Reddy Prasad Added Here -->
                <xsl:attribute name="LABEL_VALUE">
		    <xsl:value-of select="$curr_fld/LABEL" />
        </xsl:attribute>
        <!--Reddy Prasad -->
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
    
<!--                       <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" -->
                       <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')"
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
<!--         <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}', '{$curr_fld/LOV/TITLE}', '{$curr_fld/LOV/COL_HEADING}', '{$curr_fld/LOV/REDUCTION_FLD_LABELS}')" -->
         <BUTTON CLASS="ButtonLov" TABINDEX="{$curr_fld/TABINDEX}" ONCLICK="{normalize-space($curr_fld/LOV/NAME)}.show_lov('{normalize-space($curr_fld/LOV/RET_FLDS)}','{normalize-space($curr_fld/LOV/FORM_NAME)}','{normalize-space($curr_fld/LOV/BIND_VARS)}', '{normalize-space($curr_fld/LOV/TITLE)}', '{normalize-space($curr_fld/LOV/COL_HEADING)}', '{normalize-space($curr_fld/LOV/REDUCTION_FLD_LABELS)}')"
                       onmouseover="this.className='ButtonLovOver'" onmouseout="this.className='ButtonLov'" >
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                   <xsl:attribute name="DISABLED"/>
            </xsl:if>
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"/>
				</BUTTON>
			</xsl:if>
    </xsl:if>

		<xsl:if test="count($curr_fld/LOV) = 0 ">
			
			<xsl:if test="$EntityType = 'ACCOUNT' ">
				<BUTTON CLASS="ButtonLov" ONCLICK="Account.show_lov()">
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"  />
				</BUTTON>
			</xsl:if>
	    
			<xsl:if test="$EntityType = 'BRANCH' ">
				<BUTTON CLASS="ButtonLov" ONCLICK="Branch.show_lov()">
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"  />
				</BUTTON>
			</xsl:if>

			<xsl:if test="$EntityType = 'CURRENCY' ">
				<BUTTON CLASS="ButtonLov" ONCLICK="Currency.show_lov()">
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"  />
				</BUTTON>
			</xsl:if>
	    
			<xsl:if test="$EntityType = 'CUSTOMER' ">
				<BUTTON CLASS="ButtonLov" ONCLICK="Customer.show_lov()">
					<IMG CLASS="IMGLov" SRC="{$imgPath_XSL}/Lov.gif"  />
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
                     
                     <!-- Kals On June 15 
			<xsl:if test="count(../DBT) &lt; 1">
				    <xsl:value-of select="concat(../../DBT,'__',$curr_fld/DBC)" />
			</xsl:if>
                     -->
		</xsl:attribute>

		<xsl:attribute name="DBT">
              
        <xsl:if test="count($curr_fld/DBT) &gt; 0">
            <xsl:value-of select="$curr_fld/DBT" />
        </xsl:if>    
        <!--
        <xsl:if test="count(../DBT) &lt; 1">
          <xsl:value-of select="../../DBT" />
        </xsl:if>            
        !-->
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

		<xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = '-1'">
                     <xsl:attribute name="READONLY">true</xsl:attribute>
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
    
		<xsl:attribute name="REQUIRED">
			<xsl:value-of select="$curr_fld/REQUIRED" />
		</xsl:attribute>
    

		<!--   Kals CHanging to REF_FIELD on Feb4 
		<xsl:if test="$curr_fld/REFER_FIELD !=''">
			<xsl:attribute name="REFER_FIELD">
				<xsl:value-of select="$curr_fld/REFER_FIELD" />
			</xsl:attribute>
		</xsl:if>
		-->
    <!-- sundar added May 8...REF_FIELD should have only DBC
		<xsl:if test="$curr_fld/REF_FIELD !=''">
			<xsl:attribute name="REF_FIELD">
				<xsl:value-of select="$curr_fld/REF_FIELD" />
			</xsl:attribute>
		</xsl:if>
		-->
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
<!--      <xsl:if test="$curr_fld/TYPE != 'RADIO'"> -->
        <xsl:attribute name="TABINDEX">
          <xsl:value-of select="$curr_fld/TABINDEX" />
        </xsl:attribute>
<!--      </xsl:if> --> 
      
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
        <!-- Default the MIN_VAL Kals on June 14 -->
        <!--
        <xsl:attribute name ="VALUE">
          <xsl:value-of select = "$curr_fld/MIN_VAL"/>
        </xsl:attribute>
        -->
<!--      <xsl:if test="../MIN_VAL != '' or ../MAX_VAL != ''">         -->
    <!--Reddy Prasad commented this for RAD -->
        <!-- <xsl:attribute name = "onblur"><xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>           
        </xsl:attribute> -->
<!--      </xsl:if> -->
      </xsl:if>
      
      
	</xsl:template>

<!-- sundar added -->
	<!-- Takes care of features common in Group Field of Absolute/Column Positioning -->
	<xsl:template name="dispGroupField">
		<NOBR>
			<LABEL>
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

		<INPUT TYPE="PASSWORD" CLASS="TextNormal" >

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
			<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
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
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_NEXT')">
        <xsl:attribute name="CLASS">BtnNextRow</xsl:attribute>
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_ADD')">
        <xsl:attribute name="CLASS">BtnAddRow</xsl:attribute>
      </xsl:if>
      <xsl:if test="contains(../NAME,'BTN_REMOVE')">
        <xsl:attribute name="CLASS">BtnDelRow</xsl:attribute>
      </xsl:if>
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
</xsl:stylesheet>