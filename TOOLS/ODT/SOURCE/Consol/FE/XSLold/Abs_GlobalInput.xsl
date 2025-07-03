<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : GlobalInput.xsl
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from i-flex
** solutions limited.;

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2006 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.

	********************************** START OF LOG HISTORY **************************************
	$Log: GlobalInput.xsl.v $
	Revision 1.2  2005/02/08 12:32:12  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/05 09:41:12  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.1  2004/12/10 10:58:16  ID10499
	1.1:Relesing to vercon

	Revision 1.0.1.0  2004/12/10 10:47:03  ID10499
	sending for peer review

	Revision 1.0  2004/12/09 11:00:39  ID10499
	Initial Checkin

	********************************** END   OF LOG HISTORY **************************************

-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="GlobalInput.xsl"/>


	<!-- Text, Amount and Date Entity Handler -->
	<xsl:template match="FIELD/TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="absolute">		

		<NOBR> 
			<DIV CLASS="absDIVText" ID="{../ID}">				

				<xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
        <xsl:if test="count(../CALENDARTEXT) = 0">
  				<xsl:call-template name="dispLabelField" />
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
        </xsl:if>
				<xsl:call-template name="dispEntityField">
   					<xsl:with-param name="EntityType" select="../TYPE" />	
				</xsl:call-template>
				
			</DIV>
		</NOBR>

	</xsl:template>
	
	
	<xsl:template match="FIELD/TYPE[text()='SELECT']" mode="absolute">
		<NOBR> 
			<DIV CLASS="absDIVList" ID="{../ID}">

				<xsl:call-template name="pos_handler">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
        <xsl:if test="count(../CALENDARTEXT) = 0">
          <xsl:call-template name="dispLabelField" />
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
        </xsl:if>
		   	<xsl:call-template name="dispSelectField" />
			</DIV>
		</NOBR>

	</xsl:template>
	

	<!-- Radio Handler -->
	<xsl:template match="FIELD/TYPE[text()='RADIO']" mode="absolute">
   		
              <xsl:param name="layout" select="."/>
              
		<!--<FIELDSET CLASS="FieldSet" ID="{../ID}">-->
		<FIELDSET CLASS="absFIELDSET" ID="{../ID}">
              
                     <xsl:if test="$layout = 'uidesign'">
                            <xsl:attribute name="CLASS">
                                   <xsl:text>absFIELDSET_rad</xsl:text>       
                            </xsl:attribute>
                     </xsl:if>
                     
			<xsl:attribute name="style">
				<xsl:text>width:</xsl:text>
				<xsl:value-of select="../WIDTH"/>
				<xsl:text>px;height:</xsl:text>
				<xsl:value-of select="../HEIGHT"/>
				<xsl:text>px;</xsl:text>
			</xsl:attribute>
			<xsl:call-template name="pos_handler">
				<xsl:with-param name="curr_fld" select=".." />
			</xsl:call-template>
			<legend><b><xsl:call-template name="dispLabelField" /></b></legend>
			<NOBR> 
				<xsl:apply-templates select="../OPTION" mode="absolute"/>
			</NOBR>
		</FIELDSET>   	
	</xsl:template>

	
	<!-- option handler for the radio button -->
	<xsl:template match="OPTION" mode="absolute">
		<!--<xsl:variable name="radId" select="concat(../ID,position())"/>
		<DIV CLASS="absDIVRadio" ID="{$radId}">-->
		<DIV CLASS="absDIVRadio" ID="{ID}">
			<xsl:call-template name="pos_handler">
				<xsl:with-param name="curr_fld" select="."/>
			</xsl:call-template>

			<INPUT TYPE="RADIO" CLASS="INPUTRadio">
				<xsl:call-template name="ATTR_Handler">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>				
        <!-- Sundar on May 15 For Option Value -->
        <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
        <!-- sundar ends -->
				<xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
					<xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                                        <!-- sundar added on jul 22 for default selection -->
                                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
				</xsl:if>
        <!-- Kals on June 9 for Lable Err prompt -->
        <xsl:attribute name="LABEL_VALUE">
              <xsl:value-of select="LABEL"/>
        </xsl:attribute>
        <!-- kals ends here -->        
			</INPUT>
			<xsl:value-of select="LABEL"/>

		</DIV>
		<!--<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>!-->
		
	</xsl:template>


	<!-- Checkbox Handler -->
	<xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="absolute">
   	
		<NOBR> 
			<DIV CLASS="absDIVCheckbox" ID="{../ID}">
				<xsl:call-template name="pos_handler">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
				    
				<xsl:call-template name="dispCheckboxField" />
        <xsl:if test="count(../CALENDARTEXT) = 0">
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
          <xsl:call-template name="dispLabelField" />
        </xsl:if>
			</DIV>
		</NOBR>
   	
	</xsl:template>

  <!-- INPUT TYPE=FILE Handler -->
	<xsl:template match="FIELD/TYPE[text()='FILE']" mode="absolute">
      <!--<xsl:if test="../../@TYPE != 'Multiple Entry'">
        <TD CLASS="colTDLabel" valign="top">
          <xsl:call-template name="dispLabelField" />
        </TD>
      </xsl:if>-->		    
      <NOBR> 
        <DIV CLASS="absDIVFile" ID="{../ID}" >
          <xsl:call-template name="pos_handler">
            <xsl:with-param name="curr_fld" select=".."/>
          </xsl:call-template>
        <xsl:if test="count(../CALENDARTEXT) = 0">
          <xsl:call-template name="dispLabelField" />
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
        </xsl:if>
          <xsl:call-template name="dispFileField" />
        </DIV>
    	</NOBR>
	</xsl:template>
  
       <!-- TextArea Handler -->
	<xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="absolute">
		<NOBR> 
			<DIV CLASS="absDIVTextarea" ID="{../ID}">

				<xsl:call-template name="pos_handler">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
        <xsl:if test="count(../CALENDARTEXT) = 0">          
          <xsl:call-template name="dispLabelField" />
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
        </xsl:if>
		   		<xsl:call-template name="dispTextareaField">
            <xsl:with-param name="position">absolute</xsl:with-param>                                   
          </xsl:call-template>
			</DIV>
		</NOBR>
	</xsl:template>

	
	<!-- INPUT TYPE=FILE Handler -->
	<xsl:template match="FIELD/TYPE[text()='FIELDSET']" mode="absolute">

		 <xsl:param name="layout" select="."/>
               
              <FIELDSET CLASS="absFIELDSET" ID="{../ID}" z-index="-1">
              
                     <xsl:if test="$layout = 'uidesign'">
                     
                            <xsl:attribute name="CLASS">
                                   <xsl:text>absFIELDSET_rad</xsl:text>       
                            </xsl:attribute>
                           
                     </xsl:if>
              
                     <xsl:attribute name="style">
				<xsl:text>width:</xsl:text>
				<xsl:value-of select="../WIDTH"/>
				<xsl:text>px;height:</xsl:text>
				<xsl:value-of select="../HEIGHT"/>
				<xsl:text>px;</xsl:text>
			</xsl:attribute>
                     
			<xsl:call-template name="pos_handler">
				<xsl:with-param name="curr_fld" select=".." />
			</xsl:call-template>
                     
			<LEGEND><b><xsl:call-template name="dispLabelField" /></b></LEGEND>
			
			<xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
				<xsl:apply-templates select="../FIELD/TYPE" mode="absolute">
          <xsl:with-param name="layout" select="$layout"/>
        </xsl:apply-templates>
			</xsl:if>
			
			<!-- Added By Senthil.
			<xsl:if test="@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and count(FIELD[@TABPAGE=$curr_page]) &gt; 0">
				<DIV id="{ID}" VIEW="{@VIEW}">
					<xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE" />
				</DIV>
			</xsl:if>
			<xsl:if test="((@TYPE = 'Multiple Entry' and @VIEW = 'Multiple Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and  @TABPAGE=$curr_page">
				<xsl:call-template name="MultipleHandler">
					<xsl:with-param name="curr_blk" select="."/>
				</xsl:call-template>
			</xsl:if>
			!--> 
		</FIELDSET>

	</xsl:template>

	<!-- HIDDEN field Handler -->
	<xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="absolute">	
		<INPUT TYPE="HIDDEN">
			<xsl:call-template name="ATTR_Handler">
				<xsl:with-param name="curr_fld" select=".." />
   	   		</xsl:call-template>
		</INPUT>
	</xsl:template>

	<xsl:template match="FIELD/TYPE[text()='BUTTON']" mode='absolute'>  		   	
    		<NOBR> 
	        	<DIV CLASS="absDIVButton" ID="{../ID}">
			    	<xsl:call-template name="pos_handler">
				    	<xsl:with-param name="curr_fld" select=".." />
			    	</xsl:call-template>			    
		   			<xsl:call-template name="dispButtonField"/>
	        	</DIV>
        	</NOBR>
	</xsl:template>
  
  <!-- sundar retroved GROUP, IMG types handler from FCJRadTool -->
  <!-- Group Handler -->
  <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY' ]" mode="absolute">
    <NOBR> 
      <DIV  CLASS="absSPANGroup" ID="{../ID}">
        <xsl:if test = "../TYPE = 'LABEL_ONLY'">
          <xsl:attribute name = "CLASS">absSPANLabel</xsl:attribute>          
        </xsl:if>
        <xsl:call-template name="pos_handler">
           <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
  
        <xsl:call-template name="dispGroupField" />
      </DIV>
    </NOBR>
  </xsl:template>
	
<!-- IMG Handler -->
<xsl:template match="FIELD/TYPE[text()='IMG']" mode="absolute">
    	<NOBR> 
	        <DIV CLASS="absDIVImg" ID="{../ID}">
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispImgField" />
	        </DIV>
        </NOBR>
</xsl:template>

<!-- PASSWORD Handler -->
<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="absolute">
    	<NOBR> 
	        <DIV CLASS="absDIVText" ID="{../ID}">
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
        <xsl:if test="count(../CALENDARTEXT) = 0">  	
    			<xsl:call-template name="dispLabelField" />
    			<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
        </xsl:if>
		   		<xsl:call-template name="dispPasswordField" />
	        </DIV>
        </NOBR>
</xsl:template>
<!-- sundar ends here -->

	<!-- Named template to Handle field positioning -->
	<xsl:template name="pos_handler">
		
		<xsl:param name="curr_fld" />

		<xsl:choose>
			<xsl:when test="count($curr_fld/REL_POS) &gt; 0"> <!-- Relative position Specified -->
				<xsl:attribute name="STYLE">
					<xsl:variable name="row" select="substring-before($curr_fld/REL_POS,',')" />
					<xsl:variable name="col" select="substring-after($curr_fld/REL_POS,',')" />
					<xsl:text>{position:relative;left:</xsl:text>
					<xsl:value-of select="$col" />
					<xsl:text>;top:</xsl:text>
				    <xsl:value-of select="$row" />
					<xsl:text>;}</xsl:text>
				</xsl:attribute>
			</xsl:when>
			<xsl:when test="count($curr_fld/ABS_POS) &gt; 0"> <!-- Absolute position Specified -->
				<xsl:attribute name="STYLE">
					<xsl:variable name="row" select="substring-before($curr_fld/ABS_POS,',')" />
					<xsl:variable name="col" select="substring-after($curr_fld/ABS_POS,',')" />
					<xsl:text>{position:absolute</xsl:text>
                                        <xsl:if test="normalize-space($curr_fld/TYPE) = 'FIELDSET'">
                                            <xsl:text>;z-index:-1</xsl:text>
                                        </xsl:if>
                                        <xsl:text>;left:</xsl:text>
					<xsl:value-of select="$col" />
					<xsl:text>px;top:</xsl:text>
					<xsl:value-of select="$row" />
					<xsl:text>px;}</xsl:text>
				</xsl:attribute>
			</xsl:when>
		</xsl:choose>
	</xsl:template>


</xsl:stylesheet>
