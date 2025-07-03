<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : Detail.xsl
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
	$Log: Detail.xsl.v $
	Revision 1.0  2005/04/15 10:28:05  IDTAZNEEM
	Unit Creation

	********************************** END   OF LOG HISTORY **************************************

-->


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="GlobalCoreRAD.xsl"/>
<xsl:import href="GlobalInputRAD.xsl"/>

<xsl:output method='html' />

<!-- Get parameters passed from ShowXML() -->
<xsl:param name="screen" />

<xsl:variable name="gPosition" select="/FORM/SCREEN[@NAME=$screen]/@POSITION" />

<!-- Main template -->
<xsl:template match="/">
	<xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]" />
</xsl:template>

<xsl:template match="SCREEN">
	<!-- Display the Headers i.e content on top of tabs -->
	<xsl:apply-templates select="HEADER/PAGE"></xsl:apply-templates>

	<!-- Display the Tabs and fields in those tabs -->
    <xsl:if test="count(TAB/PAGE) &gt; 0">

		<!-- Display the the tabs -->
	    <TABLE CLASS="TABLETab" cellpadding="0" cellspacing="0" >
	    	<TR CLASS="TRTab" id="TRTab">

				<xsl:apply-templates select="TAB/PAGE"></xsl:apply-templates>

				<!-- The following TD is required to ensure that above tabs don't occupy full screen width -->
				<TD width="100%"></TD>
			</TR>
		</TABLE>

		<!-- Display the fields in those tabs -->
	 	<xsl:apply-templates select="TAB/PAGE" mode="content"/>
	</xsl:if> <!-- Display the Tabs and process fields in those tabs -->

   	<!-- Call page handler hardcoded as "All" that displays fields in all tab pages ex: Audit Info -->
   	<xsl:if test="$gPosition='absolute'">
       <DIV CLASS="absDIVPage" id="TBLPageAll">
	   		<xsl:call-template name="AbsolutePageHandler" >
		    	<xsl:with-param name="curr_page">All</xsl:with-param>
	       	</xsl:call-template>
       	</DIV>
   	</xsl:if>

   	<xsl:if test="$gPosition!='absolute'">
       <TABLE CLASS="colTABLEPage" cellpadding="0" cellspacing="0" id="TBLPageAll">
	   		<xsl:call-template name="ColumnPageHandler" >
		    	<xsl:with-param name="curr_page">All</xsl:with-param>
	       	</xsl:call-template>
       	</TABLE>
   	</xsl:if>

	<!-- Generate Audit Entry -->
	<xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry" />

	<!-- Generate Script Block -->
	<xsl:call-template name="generateScript" />
</xsl:template>

<!-- Template to handle a page -->
<xsl:template match="PAGE" mode="content">
	<xsl:if test="$gPosition='absolute'">
       <DIV CLASS="absDIVPage" ID="TBLPage{@ID}">
            <!-- Display first tab page contents and other tab pages are not displayed -->
            <xsl:if test="position()!=1">
                <xsl:attribute name="style">
                    <xsl:text>display:none</xsl:text>
                </xsl:attribute>
	    	</xsl:if>

           	<!-- Call Page Handler based on absolute/column positioning -->
	   		<xsl:call-template name="AbsolutePageHandler" >
               <xsl:with-param name="curr_page" select="@NAME"/>
           	</xsl:call-template>
       	</DIV>
	</xsl:if>
	<xsl:if test="$gPosition!='absolute'">
       <TABLE CLASS="colTABLEPage" ID="TBLPage{@ID}" cellpadding="0" cellspacing="0">
            <!-- Display first tab page contents and other tab pages are not displayed -->
            <xsl:if test="position()!=1">
                <xsl:attribute name="style">
                    <xsl:text>display:none</xsl:text>
                </xsl:attribute>
	    	</xsl:if>

	   		<xsl:call-template name="ColumnPageHandler" >
               <xsl:with-param name="curr_page" select="@NAME"/>
           	</xsl:call-template>
       	</TABLE>

	</xsl:if>
</xsl:template>


<!-- Page Handler for Absolute Positioning -->
<xsl:template name="AbsolutePageHandler">
    <xsl:param name="curr_page" select="." />

 	<xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE !='Audit Entry']" >
        <xsl:with-param name="curr_page" select="$curr_page"/>
 	</xsl:apply-templates>
</xsl:template>

<!-- Template to handle a block -->
<xsl:template match="BLOCK">
    <xsl:param name="curr_page" select="." />

	<xsl:if test="@TYPE != 'Multiple Entry'">
	 	<xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE" />
    </xsl:if>
    
    <!-- Added By Senthil. -->
    <xsl:if test="@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry'">
            <xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE" />

    </xsl:if>
   
    <xsl:if test="((@TYPE = 'Multiple Entry' and @VIEW = 'Multiple Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and  @TABPAGE=$curr_page">
       	<xsl:call-template name="MultipleHandler">
            <xsl:with-param name="curr_blk" select="."/>
        </xsl:call-template>
    </xsl:if>
</xsl:template>

<!-- Page Handler for Column Positioning -->

<xsl:template name="ColumnPageHandler">
    <xsl:param name="curr_page" select="." />

    <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen]">
    
    	<xsl:if test="@TYPE != 'Multiple Entry'">
		    <!-- Handle all rows in the page -->
		    <!-- RBHCHK - If a row with col=1 doesn't exist, it will not display that row -->
		    <xsl:for-each select="./FIELD[@TABPAGE=$curr_page and @COL=1]">
		        <xsl:sort select="@ROW" data-type="number" order="ascending"/>
		
				<!-- Handle all rows within a page -->
		        <xsl:call-template name="RowHandler">
		            <xsl:with-param name="curr_page" select="$curr_page"/>
		            <xsl:with-param name="curr_row" select="@ROW"/>
		        </xsl:call-template>
		    </xsl:for-each>
        </xsl:if>

    	<xsl:if test="@TYPE = 'Multiple Entry' and @TABPAGE=$curr_page">
		    <TR CLASS="colTRRow">
		    	<TD COLSPAN="4">
        			<xsl:call-template name="MultipleHandler"/>
        		</TD>
		    </TR>
        </xsl:if>
    </xsl:for-each>

</xsl:template>


<!-- Row Handler -->
<xsl:template name="RowHandler">
    <xsl:param name="curr_page" select="." />
    <xsl:param name="curr_row" select="." />

    <TR CLASS="colTRRow">
    	<xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE != 'Multiple Entry']/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row]/TYPE">
		        <xsl:sort select="../@COL" data-type="number" order="ascending"/>
		</xsl:apply-templates>
    </TR>
</xsl:template>

<xsl:template name="MultipleHandler">
<xsl:param name="curr_blk" select="." />
	<xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')" />
	<xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')" />

	<!-- Change for supporting Layout Editor -->
    <!--  <DIV CLASS="DIVMultiple" id="dataContainer" STYLE="overflow:scroll;width:{$curr_blk/WIDTH};height:{$curr_blk/HEIGHT};"> -->

    <DIV CLASS="DIVMultiple" NAME="dataContainer" ID="SYS_{$curr_blk/ID}"  STYLE="overflow:scroll;width:{$curr_blk/WIDTH};height:{$curr_blk/HEIGHT};">
   		<xsl:if test="$gPosition='absolute'">
			<xsl:attribute name="STYLE">
				<xsl:text>{overflow:scroll;position:absolute;left:</xsl:text>
				<xsl:value-of select="$col" />
				<xsl:text>px;top:</xsl:text>
				<xsl:value-of select="$row" />
				<xsl:text>px;width:</xsl:text>
				<xsl:value-of select="$curr_blk/WIDTH" />
				<xsl:text>;height:</xsl:text>
				<xsl:value-of select="$curr_blk/HEIGHT" />
				<xsl:text>}</xsl:text>
			</xsl:attribute>
		</xsl:if>

	    <TABLE CLASS="TABLEMultiple" cellspacing="0" ID="{$curr_blk/ID}" STYLE="tableLayout:fixed;">
			<xsl:apply-templates select="$curr_blk/EVENT"/>

           	<xsl:if test="count(./DATASRC) &gt;= 1">
	     	    <xsl:attribute name="DATASRC">
	           	    <xsl:value-of select="./DATASRC" />
	            </xsl:attribute>

	            <xsl:attribute name="DATAPAGESIZE">
	                <xsl:value-of select="$curr_blk/DATAPAGESIZE" />
	            </xsl:attribute>

	           	<xsl:if test="count(./DATAFLD) &gt;= 1">
		     	    <xsl:attribute name="DATAFLD">
		           	    <xsl:value-of select="./DATAFLD" />
		            </xsl:attribute>
		        </xsl:if>
	        </xsl:if>

            <THEAD CLASS="THEADMultiple" id="downTblHead">
            	<TR CLASS="THEADTRMultiple">
	        	<!-- Now define block field headers -->
	            <xsl:for-each select="$curr_blk/FIELD[TYPE!='LABEL']">
                    <TH CLASS="THEADTDMultiple" SCOPE="COL">
                    	<xsl:if test="count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1">
		                    <xsl:attribute name="CLASS">
		                        <xsl:text>hidden</xsl:text>
		                    </xsl:attribute>
                    	</xsl:if>
        				<xsl:value-of select="./LABEL" />
                    </TH>
	            </xsl:for-each>
	            </TR>
	        </THEAD>
			<TBODY CLASS="TBODYMultiple">
		        <!-- Now show the actual fields -->
      			<xsl:if test="count(./DATASRC) &gt;= 1">
			        <xsl:call-template name="detail_row">
			 	        <xsl:with-param name="node_name" select="$curr_blk" />
			        	<xsl:with-param name="num_rows" select="string('1')" />
			        </xsl:call-template>
		        </xsl:if>
      			<xsl:if test="count(./DATASRC) &lt;= 0">
			        <xsl:call-template name="detail_row">
			 	        <xsl:with-param name="node_name" select="$curr_blk" />
			        	<xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS" />
			        </xsl:call-template>
		        </xsl:if>
		    </TBODY>
		    <!--
           	<xsl:if test="count(./DATASRC) &gt;= 1">
	            <TFOOT CLASS="TFOOTMultiple">
	                <TR CLASS="TFOOTTRMultiple">
	                    <TD CLASS="TFOOTTDMultiple" COLSPAN="2">
	                    	<input CLASS="ButtonMultiple" type="Button" onclick="{$curr_blk/ID}.nextPage()" name="next" value="Next" />

	                    	<input CLASS="ButtonMultiple" type="Button" onclick="{$curr_blk/ID}.previousPage()" name="prev" value="Prev" />
	                    </TD>
	                </TR>
	            </TFOOT>
	         </xsl:if>
	         -->
	    </TABLE>
    </DIV>
    <NOBR>
		<DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}" id="divAddDel_{$curr_blk/ID}" style="width:20px">
   			<xsl:if test="$gPosition='absolute'">
				<xsl:attribute name="STYLE">
					<xsl:text>position:absolute;left:</xsl:text>
					<xsl:value-of select="$col + $curr_blk/WIDTH" />
					<xsl:text>px;top:</xsl:text>
					<xsl:value-of select="$row" />
					<xsl:text>px;width:20px</xsl:text>
				</xsl:attribute>
			</xsl:if>
		
			<TABLE CLASS="TABLEAddDelRow" cellspacing="0" STYLE="tableLayout:fixed;">
				<TR CLASS="TRAddDelRow">
					<TD CLASS="TDAddDelRow">
						<BUTTON CLASS="BtnAddRow" name="cmdAddRow_{$curr_blk/ID}" id="cmdAddRow_{$curr_blk/ID}" onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')"><IMG id="imgAdd_{$curr_blk/ID}" SRC="Images/Addrow.gif" alt="Add Row"/></BUTTON>
					</TD>
				</TR>
				<TR CLASS="TRAddDelRow">
					<TD CLASS="TDAddDelRow">
						<BUTTON CLASS="BtnDelRow" name="cmdDelRow_{$curr_blk/ID}" id="cmdDelRow_{$curr_blk/ID}" onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')"><IMG id="imgAdd_{$curr_blk/ID}" SRC="Images/Delrow.gif" alt="Delete Row"/></BUTTON>
					</TD>          
				</TR>
        <!-- Button Single View Added By Malaiah on June 28, 2005 -->
  			<TR CLASS="TRAddDelRow">
					<TD CLASS="TDAddDelRow">
						<BUTTON CLASS="BtnSingleView" name="BTN_SINGLE_VIEW_{$curr_blk/ID}" id="BTN_SINGLE_VIEW_{$curr_blk/ID}" onClick="fnShowSingleViewForME('{$curr_blk/ID}')"><IMG id="imgView_{$curr_blk/ID}" SRC="Images/SingleView.gif" alt="Single Record View"/></BUTTON>
					</TD>          
				</TR>
			</TABLE>
		</DIV>
    </NOBR>
</xsl:template>

<!-- Now declare a template to get the reqd. no. of detail rows.
     Since XSL does'nt support iteration, use recursion -->
<xsl:template name="detail_row">
<xsl:param name="node_name" select="." />
<xsl:param name="num_rows" select="." />
    <TR CLASS="TBODYTRMultiple">
	    <xsl:for-each select="$node_name/FIELD[TYPE!='LABEL']">
   			<xsl:if test="$gPosition='absolute'">
     			<TD CLASS="TBODYTDMultiple">
                	<xsl:if test="count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1">
	                    <xsl:attribute name="CLASS">
	                        <xsl:text>hidden</xsl:text>
	                    </xsl:attribute>
                	</xsl:if>
    				<xsl:apply-templates select="TYPE" />
		    	</TD>
		    </xsl:if>

   			<xsl:if test="$gPosition!='absolute'">
   				<xsl:apply-templates select="TYPE" />
		    </xsl:if>
		</xsl:for-each>
    </TR>
    <xsl:if test="$num_rows &gt; 1">
    	<xsl:call-template name="detail_row">
    		<xsl:with-param name="node_name" select="$node_name" />
    		<xsl:with-param name="num_rows" select="$num_rows - 1" />
    	</xsl:call-template>
	</xsl:if>
</xsl:template>

<!-- Handler for POPUP Editor -->
<xsl:template name="Popup_Handler">
<!-- <xsl:param name="lov_name" select="." /> -->
     <xsl:attribute name="ONCLICK">
         <xsl:text>show_editor('</xsl:text>
         <xsl:value-of select="../NAME" />
         <xsl:text>',</xsl:text>
    	<xsl:if test="count(../MAXLENGTH) != 0">
	    	<xsl:value-of select="../MAXLENGTH" />
	    </xsl:if>

    	<xsl:if test="count(../MAXLENGTH) = 0">
	    	<xsl:value-of select="../SIZE" />
	    </xsl:if>
         <xsl:text>,'</xsl:text>
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

<!-- Audit Handler -->
<xsl:template match="BLOCK" mode="AuditEntry">
   	<NOBR>
   		<!-- Change to support Layout Controls -->
        <!-- <DIV CLASS="DivAudit" id="DivAudit"> -->
        <DIV CLASS="DivAudit" id="SYS_{ID}">
			<xsl:attribute name="STYLE">
				<xsl:variable name="row" select="substring-before(ABS_POS,',')" />
				<xsl:variable name="col" select="substring-after(ABS_POS,',')" />
				<xsl:text>{position:absolute;left:</xsl:text>
				<xsl:value-of select="$col" />
				<xsl:text>px;top:</xsl:text>
				<xsl:value-of select="$row" />
				<xsl:text>px;}</xsl:text>
			</xsl:attribute>
	   		<xsl:call-template name="dispAuditBar" />
        </DIV>
    </NOBR>
</xsl:template>

<!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
<xsl:template name="dispAuditBar">
    <TABLE CLASS="TABLEAudit">
        <THEAD CLASS="THEADAudit">
            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_INPUT_BY">Input By</LABEL></NOBR></TH>
            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_INPUT_DATE_TIME">Date Time</LABEL></NOBR></TH>
            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_AUTH_BY">Auth By</LABEL></NOBR></TH>
            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_AUTH_DATE_TIME">Date Time</LABEL></NOBR></TH>
            <xsl:if test="TYPE='T'">
	            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_CONTRACT_STATUS">Contract Status</LABEL></NOBR></TH>
	            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_AUTH_STATUS">Auth Status</LABEL></NOBR></TH>
	            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_STATUS">Status</LABEL></NOBR></TH>
	        </xsl:if>
            <xsl:if test="TYPE!='T'">
	            <TH CLASS="THAudit"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_MOD_NO">Mod No</LABEL></NOBR></TH>
	            <TH CLASS="THAudit" colspan="2"><NOBR><LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_STATUS">Status</LABEL></NOBR></TH>
	        </xsl:if>
        </THEAD>
		<TBODY>
	        <TR CLASS="TRAudit">
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            	<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_ID" DATASRC="{DATASRC}" DATAFLD="MAKER_ID" READONLY="true" MAXLENGTH="12" SIZE="8" />
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            	<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_DT_STAMP" DATASRC="{DATASRC}" DATAFLD="MAKER_DT_STAMP" READONLY="true" MAXLENGTH="19" SIZE="20"/>
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            	<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_ID" DATASRC="{DATASRC}" DATAFLD="CHECKER_ID" READONLY="true" MAXLENGTH="12" SIZE="8" />
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            	<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_DT_STAMP" DATASRC="{DATASRC}" DATAFLD="CHECKER_DT_STAMP" READONLY="true" MAXLENGTH="19" SIZE="20"/>
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            		<xsl:if test="TYPE='T'">
		            		<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CONTRACT_STATUS" DATASRC="{DATASRC}" DATAFLD="CONTRACT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="15"/>
	            		</xsl:if>
	            		<xsl:if test="TYPE!='T'">
		            		<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MOD_NO" DATASRC="{DATASRC}" DATAFLD="MOD_NO" READONLY="true" MAXLENGTH="4" SIZE="2"/>
	            		</xsl:if>
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            		<xsl:if test="TYPE='T'">
		            		<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="AUTH_STATUS" DATASRC="{DATASRC}" DATAFLD="AUTH_STATUS" READONLY="true" MAXLENGTH="15" SIZE="15"/>
	            		</xsl:if>
	            		<xsl:if test="TYPE!='T'">
			            	<INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="RECORD_STAT" DATASRC="{DATASRC}" DATAFLD="RECORD_STAT" DISABLED="true" />
			            	<LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_OPEN">Open</LABEL>
	            		</xsl:if>
	            	</NOBR>
	            </TD>
	            <TD CLASS="TDAudit">
	            	<NOBR>
	            		<xsl:if test="TYPE='T'">
		            		<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="STATUS" DATASRC="{DATASRC}" DATAFLD="STATUS" READONLY="true" MAXLENGTH="15" SIZE="15"/>
	            		</xsl:if>
	            		<xsl:if test="TYPE!='T'">
			            	<INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTH_STAT" DATASRC="{DATASRC}" DATAFLD="AUTH_STAT" DISABLED="true" />
			            	<LABEL DATASRC="#CAPTIONS" DATAFLD="AUDIT_AUTHORIZED">Authorised</LABEL>
	            		</xsl:if>
	            	</NOBR>
	            </TD>
	        </TR>
		</TBODY>
    </TABLE>
</xsl:template>

<!-- Template to display tabs -->
<xsl:template match="TAB/PAGE">
	<!-- Known Problem: onfocus is required for supporting accesskey, but this results in 2 clicks when you select a tab using mouse -->
	<TD CLASS="TDTab" onclick="changeTabPage(this)" onfocus="this.click();" ID="{@ID}" ACCESSKEY="{ACCESSKEY}">
    	<!-- Make the first tab as selected -->
    	<xsl:if test="position()=1">
            <xsl:attribute name="CLASS">
                <xsl:text>TDTabSelected</xsl:text>
            </xsl:attribute>
		</xsl:if>

        <NOBR>
			<LABEL CLASS="LABELNormal">
		        <xsl:call-template name="ATTR_Handler">
				    <xsl:with-param name="curr_fld" select="." />
		   	   	</xsl:call-template>

		     	<xsl:if test="count(LABEL) &gt; 0">
			        <xsl:call-template name="dispLabelCaption" >
					    <xsl:with-param name="curr_fld" select="." />
			   	   	</xsl:call-template>
				</xsl:if>

		     	<xsl:if test="count(SRC) &gt; 0">
					<!-- Display Image -->
				    <IMG id="{NAME}_IMG" SRC="{SRC}" >
				     	<xsl:if test="count(ALT) &gt; 0">
				  		    <xsl:attribute name="ALT">
					          	<xsl:value-of select="ALT" />
					        </xsl:attribute>
				        </xsl:if>
				    </IMG>
				</xsl:if>

		    </LABEL>
       </NOBR>
	</TD>
</xsl:template>

<!-- Template to display HEADER fields above tabs -->
<xsl:template match="HEADER/PAGE">
   	<!-- Call page handler hardcoded as "Header" that displays fields in all tab pages as header -->
   	<xsl:if test="$gPosition='absolute'">
       <DIV CLASS="absDIVHdr" ID="TBLPage{@ID}" STYLE="HEIGHT:{@HEIGHT}">
	   		<xsl:call-template name="AbsolutePageHandler" >
		    	<xsl:with-param name="curr_page"><xsl:value-of select="@NAME"/></xsl:with-param>
	       	</xsl:call-template>
       	</DIV>
   	</xsl:if>

   	<xsl:if test="$gPosition!='absolute'">
       <TABLE CLASS="colTABLEHdr" ID="TBLPage{@ID}" cellpadding="0" cellspacing="0">
	   		<xsl:call-template name="ColumnPageHandler" >
		    	<xsl:with-param name="curr_page"><xsl:value-of select="@NAME"/></xsl:with-param>
	       	</xsl:call-template>
       	</TABLE>
   	</xsl:if>
</xsl:template>

<xsl:template name="generateScript">
	<!-- Create Script, Pre-load LOVs -->
	<script language="javascript" DEFER="DEFER">
        <xsl:for-each select="/FORM/SCREEN[@NAME=$screen]">
			window.dialogHeight = "<xsl:value-of select="@HEIGHT" />";
			window.dialogWidth = "<xsl:value-of select="@WIDTH" />";
			document.title = "<xsl:value-of select="@TITLE" />";
			<!-- fnAttachEvents(); -->
		</xsl:for-each>
	</script>
	<!--
	<script language="javascript" DEFER="DEFER" FOR="NotesUserCount" EVENT="onkeydown">
		doKeyDown();
	</script>
	-->
</xsl:template>
</xsl:stylesheet>