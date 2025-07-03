<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : GlobalInput.xsl
**
** Module       : FCJToolsWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from i-flex
** solutions limited.

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2005 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.
   	
	********************************** START OF LOG HISTORY **************************************
	$Log: GlobalInput.xsl.v $
	Revision 1.0  2005/04/15 10:29:39  IDTAZNEEM
	Unit Creation
 
	********************************** END   OF LOG HISTORY **************************************

-->


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- Text, Amount and Date Entity Handler -->
<xsl:template match="FIELD/TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVText" ID="{../ID}" >
            	<xsl:if test="count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1">
                    <xsl:attribute name="CLASS">
                        <xsl:text>hidden</xsl:text>
                    </xsl:attribute>
            	</xsl:if>
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
			   	<xsl:call-template name="dispEntityField">
			   		<xsl:with-param name="EntityType" select="../TYPE" />	
			   	</xsl:call-template>
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDText" >
       		<NOBR>
			   	<xsl:call-template name="dispEntityField">
			   		<xsl:with-param name="EntityType" select="../TYPE" />	
			   	</xsl:call-template>
    		</NOBR>
	    </TD>
   	</xsl:if>
</xsl:template>


<!-- Generic Entity Handler -->
<xsl:template name="dispEntityField">
    <xsl:param name="EntityType"/>

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
		<xsl:otherwise>
		   	<xsl:call-template name="dispTextField" />
		</xsl:otherwise>
   </xsl:choose>

</xsl:template>

<!-- Takes care of features common in Amount Field of Absolute/Column Positioning -->
<xsl:template name="dispAmountField">

	<!-- Display Text box for Amount -->
	<INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{../RELATED_FIELD}')">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
	</INPUT>

    <!-- Display Required Flag -->
	<xsl:call-template name="RequiredFieldHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
	
	<INPUT TYPE="TEXT" CLASS="TextAmount" style="text-align:right" onactivate="acceptInputAmount('{../NAME}', '{../RELATED_FIELD}')" onbeforedeactivate="validateInputAmount('{../NAME}', '{../RELATED_FIELD}')" >
        <xsl:call-template name="ATTR_InputEntity_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
   	   	
		<!-- Set the maximum number of characters user can enter -->
	    <xsl:attribute name="MAXLENGTH">
        	<xsl:if test="count(../MAXLENGTH) != 0">
		    	<xsl:value-of select="../MAXLENGTH" />
		    </xsl:if>
		    
        	<xsl:if test="count(../MAXLENGTH) = 0">
        		<xsl:if test="count(../SIZE) != 0">
		    		<xsl:value-of select="../SIZE" />
		    	</xsl:if>
		    </xsl:if>
	    </xsl:attribute>
    </INPUT>
	<xsl:call-template name="LovHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
</xsl:template>


<!-- Takes care of features common in Date Field of Absolute/Column Positioning -->
<xsl:template name="dispDateField">

	<!-- Display Text box for Date -->
	<INPUT TYPE="HIDDEN" onpropertychange="displayDate(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
	</INPUT>

    <!-- Display Required Flag -->
	<xsl:call-template name="RequiredFieldHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
	
	<INPUT TYPE="TEXT" CLASS="TextDate" onactivate="acceptInputDate('{../NAME}')" onbeforedeactivate="validateInputDate('{../NAME}')" >
        <xsl:call-template name="ATTR_InputEntity_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
   	   	
		<!-- Set the maximum number of characters user can enter -->
	    <xsl:attribute name="MAXLENGTH">
        	<xsl:if test="count(../MAXLENGTH) != 0">
		    	<xsl:value-of select="../MAXLENGTH" />
		    </xsl:if>
		    
        	<xsl:if test="count(../MAXLENGTH) = 0">
        		<xsl:if test="count(../SIZE) != 0">
		    		<xsl:value-of select="../SIZE" />
		    	</xsl:if>
	    		<xsl:if test="count(../SIZE) = 0">
		    		<xsl:text>16</xsl:text>
		    	</xsl:if>
		    </xsl:if>
	    </xsl:attribute>

		<!-- Display Calendar Button  -->
	    <BUTTON CLASS="ButtonLov" onclick="disp_cal('{../NAME}', '{../NAME}I')">
	        <xsl:if test="count(../HIDDEN) &gt; 0 and ../HIDDEN = -1">
	  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
	        </xsl:if>
            <IMG CLASS="IMGLov" SRC="Images/Calendar.gif"/>
	    </BUTTON>
    </INPUT>
	<xsl:call-template name="LovHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
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

    <!-- Display Required Flag -->
	<xsl:call-template name="RequiredFieldHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
	
	<!-- Display Text box -->
    <INPUT TYPE="TEXT" CLASS="TextNormal" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');">
        <xsl:call-template name="ATTR_InputEntity_Handler">
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

     	<xsl:if test="count(../TEXT-ALIGN) &gt; 0">
      	    <xsl:attribute name="STYLE">
				<xsl:text>{TEXT-ALIGN:</xsl:text>
				<xsl:value-of select="../TEXT-ALIGN" />
				<xsl:text>;}</xsl:text>
	        </xsl:attribute>
        </xsl:if>
    </INPUT>
	<xsl:call-template name="LovHandler">
		 <xsl:with-param name="curr_fld" select=".." />
	     <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>

    <xsl:if test="count(../POPUPEDIT) &gt; 0 ">
		<!-- Display Button -->
	    <BUTTON CLASS="BTNPopupEdit" >
	        <xsl:if test="count(../HIDDEN) &gt; 0 and ../HIDDEN = -1">
	  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
	        </xsl:if>
            <xsl:call-template name="Popup_Handler" />
            <IMG CLASS="IMGPopupEdit" SRC="Images/Editor2.gif"/>
	    </BUTTON>
    </xsl:if>
</xsl:template>

<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispTextField">
    <xsl:param name="EntityType"/>

    <!-- Display Required Flag -->
	<xsl:call-template name="RequiredFieldHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
	
	<!-- Display Text box -->
    <INPUT TYPE="TEXT" CLASS="TextNormal">
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

     	<xsl:if test="count(../TEXT-ALIGN) &gt; 0">
      	    <xsl:attribute name="STYLE">
				<xsl:text>{TEXT-ALIGN:</xsl:text>
				<xsl:value-of select="../TEXT-ALIGN" />
				<xsl:text>;}</xsl:text>
	        </xsl:attribute>
        </xsl:if>
    </INPUT>
	<xsl:call-template name="LovHandler">
		 <xsl:with-param name="curr_fld" select=".." />
	     <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>

    <xsl:if test="count(../POPUPEDIT) &gt; 0 ">
		<!-- Display Button -->
	    <BUTTON CLASS="BTNPopupEdit" >
	        <xsl:if test="count(../HIDDEN) &gt; 0 and ../HIDDEN = -1">
	  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
	        </xsl:if>
            <xsl:call-template name="Popup_Handler" />
            <IMG CLASS="IMGPopupEdit" SRC="Images/Editor2.gif"/>
	    </BUTTON>
    </xsl:if>
</xsl:template>

<!-- SELECT List Text Handler -->
<xsl:template match="FIELD/TYPE[text()='SELECT']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVList" ID="{../ID}" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispSelectField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDList" >
    		<NOBR> 
	   		<xsl:call-template name="dispSelectField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
<xsl:template name="dispSelectField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Select List -->
    <SELECT CLASS="SELECTList">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
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
		        </xsl:if>
		       <xsl:value-of select="." />
		   </OPTION>
       </xsl:for-each>
    </SELECT>
</xsl:template>

<!-- Radio Handler -->
<xsl:template match="FIELD/TYPE[text()='RADIO']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVRadio" ID="{../ID}" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispRadioField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDRadio" >
    		<NOBR> 
	   		<xsl:call-template name="dispRadioField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Radio Field of Absolute/Column Positioning -->
<xsl:template name="dispRadioField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Radio Button -->
    <INPUT TYPE="RADIO" CLASS="INPUTRadio">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
   	   	
        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
      	    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
        </xsl:if>
    </INPUT>
</xsl:template>

<!-- Checkbox Handler -->
<xsl:template match="FIELD/TYPE[text()='CHECKBOX']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVCheckbox" ID="{../ID}" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispCheckboxField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDCheckbox" >
    		<NOBR> 
	   		<xsl:call-template name="dispCheckboxField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
<xsl:template name="dispCheckboxField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Checkbox -->
    <INPUT TYPE="CHECKBOX" CLASS="INPUTCheckbox">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>

        <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
      	    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
        </xsl:if>
    </INPUT>
</xsl:template>

<!-- TEXTAREA Handler -->
<xsl:template match="FIELD/TYPE[text()='TEXTAREA']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVTextarea" ID="{../ID}" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispTextareaField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDTextarea" COLSPAN="{../COLSPAN}">
    		<NOBR> 
	   		<xsl:call-template name="dispTextareaField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
<xsl:template name="dispTextareaField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	
	<!-- Display Textarea -->
    <TEXTAREA CLASS="TEXTAREASmall" ROWS="{../ROWS}" COLS="{../COLS}">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
    </TEXTAREA>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 ">
		<!-- Display Button -->
	    <BUTTON CLASS="BTNPopupEdit" >
	        <xsl:if test="count(../HIDDEN) &gt; 0 and ../HIDDEN = -1">
	  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
	        </xsl:if>
            <xsl:call-template name="Popup_Handler" />
            <IMG CLASS="IMGPopupEdit" SRC="Images/Editor2.gif"/>
	    </BUTTON>
    </xsl:if>
    
</xsl:template>

<!-- HIDDEN field Handler -->
<xsl:template match="FIELD/TYPE[text()='HIDDEN']">
	<!-- Display HIDDEN field -->
    <INPUT TYPE="HIDDEN">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
    </INPUT>
</xsl:template>

<!-- Display Date attribute handler -->
<xsl:template name="ATTR_InputEntity_Handler">
<xsl:param name="curr_fld" select="." />
        <xsl:attribute name="SIZE">
		    <xsl:value-of select="$curr_fld/SIZE" />
	    </xsl:attribute>
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
      	    <xsl:attribute name="READONLY">true</xsl:attribute>
      	    <xsl:attribute name="CLASS">TextReadonly</xsl:attribute> 
        </xsl:if>
        <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
      	    <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
      	    <xsl:attribute name="CLASS">TextDisabled</xsl:attribute> 
        </xsl:if>
        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
        </xsl:if>
     	<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
  		    <xsl:attribute name="ACCESSKEY">
	          	<xsl:value-of select="$curr_fld/ACCESSKEY" />
	        </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="NAME">
		    <xsl:value-of select="$curr_fld/NAME" />
             <xsl:text>I</xsl:text>
	    </xsl:attribute>
        <xsl:attribute name="ID">
		    <xsl:value-of select="$curr_fld/NAME" />
             <xsl:text>I</xsl:text>
	    </xsl:attribute>
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
        <xsl:attribute name="DATASRC">
            <xsl:value-of select="$curr_fld/DATASRC" />
        </xsl:attribute>
     	<xsl:attribute name="DATAFLD">
          	<xsl:value-of select="$curr_fld/DATAFLD" />
        </xsl:attribute>
        <xsl:attribute name="NAME">
		    <xsl:value-of select="$curr_fld/NAME" />
	    </xsl:attribute>
        <xsl:attribute name="ID">
		    <xsl:value-of select="$curr_fld/NAME" />
	    </xsl:attribute>
		<xsl:apply-templates select="$curr_fld/CUSTOM"/>
</xsl:template>

<!-- Handler for Required Flag -->
<xsl:template name="RequiredFieldHandler">
	<xsl:param name="curr_fld" select="." />

    <!-- Display Required Flag -->
	<xsl:if test="$curr_fld/REQUIRED='-1' and (count($curr_fld/HIDDEN) &lt; 0 or $curr_fld/HIDDEN != -1)"> 
    	<SPAN CLASS="SPANFlag" title="Required Field">*</SPAN>
	</xsl:if>
	<xsl:if test="$curr_fld/REQUIRED!='-1' or (count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1)"> 
	    <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
	</xsl:if>
</xsl:template>

<!-- Handler for LOV -->
<xsl:template name="LovHandler">
	<xsl:param name="curr_fld" />
	<xsl:param name="EntityType" />

    <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
		<!-- Display Button -->
	    <BUTTON id="btnLov" CLASS="ButtonLov" TABINDEX="-1" ONCLICK="{$curr_fld/LOV/NAME}.show_lov('{$curr_fld/LOV/RET_FLDS}','{$curr_fld/LOV/FORM_NAME}','{$curr_fld/LOV/BIND_VARS}')">
	    
	        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
	  		    <xsl:attribute name="DISABLED">true</xsl:attribute>
	        </xsl:if>

	        <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
	  		    <xsl:attribute name="DISABLED">true</xsl:attribute>
	        </xsl:if>

	        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
	  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
	        </xsl:if>
	        
            <IMG CLASS="IMGLov" SRC="Images/Lov.gif"/>
	    </BUTTON>
    </xsl:if>

    <xsl:if test="count($curr_fld/LOV) &lt; 1 ">
	    <xsl:if test="$EntityType = 'ACCOUNT' ">
		    <BUTTON CLASS="ButtonLov" ONCLICK="Account.show_lov()">
		    
		        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
		  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
		        </xsl:if>
		        
	            <IMG CLASS="IMGLov" SRC="Images/Lov.gif"/>
		    </BUTTON>
		</xsl:if>
	    <xsl:if test="$EntityType = 'BRANCH' ">
		    <BUTTON CLASS="ButtonLov" ONCLICK="Branch.show_lov()">
		    
		        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
		  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
		        </xsl:if>
		        
	            <IMG CLASS="IMGLov" SRC="Images/Lov.gif"/>
		    </BUTTON>
		</xsl:if>
	    <xsl:if test="$EntityType = 'CURRENCY' ">
		    <BUTTON CLASS="ButtonLov" ONCLICK="Currency.show_lov()">
		    
		        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
		  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
		        </xsl:if>
		        
	            <IMG CLASS="IMGLov" SRC="Images/Lov.gif"/>
		    </BUTTON>
		</xsl:if>
	    <xsl:if test="$EntityType = 'CUSTOMER' ">
		    <BUTTON CLASS="ButtonLov" ONCLICK="Customer.show_lov()">
		    
		        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
		  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
		        </xsl:if>
		        
	            <IMG CLASS="IMGLov" SRC="Images/Lov.gif"/>
		    </BUTTON>
		</xsl:if>
	</xsl:if>
</xsl:template>

<!-- INPUT TYPE=FILE Handler -->
<xsl:template match="FIELD/TYPE[text()='FILE']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVFile" ID="{../ID}" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispFileField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDFile" >
    		<NOBR> 
	   		<xsl:call-template name="dispFileField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
<xsl:template name="dispFileField">
    <!-- Display Required Flag -->
	<xsl:call-template name="RequiredFieldHandler">
		 <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
	
	<!-- Display File -->
    <INPUT TYPE="File" CLASS="TextFile" >
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
    </INPUT>
</xsl:template>

</xsl:stylesheet>
