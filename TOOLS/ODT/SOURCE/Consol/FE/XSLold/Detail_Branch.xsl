<?xml version="1.0"?>

<!--====================================================================================================
**
** File Name    : Detail.xsl
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
** solutions limited.

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2006 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.

	********************************** START OF LOG HISTORY **************************************
	$Log: Detail.xsl.v $
	Revision 1.10  2005/08/18 10:42:28  IDSANDEEPM
	1.10:Relesing to vercon

	Revision 1.9.1.0  2005/08/01 08:29:18  IDSANDEEPM
	Added QueryFrom select drop down in audit block

	Revision 1.9  2005/07/11 04:11:34  IDMALAIAH
	1.9:Relesing to vercon

	Revision 1.8.1.0  2005/06/30 13:08:14  IDMALAIAH
	Added button to View ME Block as ' Single Record View'. Added Check box to select all the rows in ME Block.

	Revision 1.8  2005/06/29 08:52:00  IDSANKARGANESH
	1.8:Relesing to vercon

	Revision 1.7.1.0  2005/06/29 06:33:17  IDSANKARGANESH
	Change made to support drill down feature

	Revision 1.7  2005/06/28 11:27:00  IDVINITHAN
	1.7:Relesing to vercon

	Revision 1.6.1.0  2005/06/24 12:22:16  IDVINITHAN
	Changes related to multiple Entry Block Added. display:none changed to visibility:none.

	Revision 1.6  2005/06/24 12:07:43  IDRAVIBRAMHA
	1.6:Relesing to vercon

	Revision 1.5.1.0  2005/06/24 06:38:26  IDRAVIBRAMHA
	Cosmetic Changes

	Revision 1.5  2005/06/21 09:46:02  IDMALAIAH
	1.5:Relesing to vercon

	Revision 1.4.1.0  2005/06/17 11:27:34  IDMALAIAH
	Changes made disaplay ME as SE if VIEW is SE.

	Revision 1.4  2005/04/28 13:31:25  IDRAVIBRAMHA
	1.4:Relesing to vercon

	Revision 1.3.1.0  2005/04/28 12:48:46  IDRAVIBRAMHA
	New ClassNames added in CSS

	Revision 1.3  2005/03/09 11:35:30  IDSENTHILL
	1.3:Relesing to vercon

	Revision 1.2.1.0  2005/03/09 11:35:07  IDSENTHILL
	Inclusion of ONCE_AUTH field in the Audit Block.

	Revision 1.2  2005/02/08 12:31:54  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/05 09:36:12  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.1  2004/12/10 10:40:58  ID10499
	1.1:Relesing to vercon

	Revision 1.0.1.0  2004/12/10 09:59:21  ID10499
	sending for peer review

	Revision 1.0  2004/12/09 10:59:46  ID10499
	Initial Checkin

	********************************** END   OF LOG HISTORY **************************************

-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="GlobalCore_Branch.xsl"/>
	<xsl:import href="GlobalInput_Branch.xsl"/>

	<xsl:output method='html' />

	<!-- Get parameters passed from ShowXML() -->
	<xsl:param name="screen" />

	<xsl:variable name="gPosition" select="/FORM/SCREEN[@NAME=$screen]/@POSITION" />
	
	<xsl:variable name="gHt" select="10" />
	<xsl:variable name="gHeight" select="/FORM/SCREEN[@NAME=$screen]/@HEIGHT" />
	<xsl:variable name="gWidth" select="/FORM/SCREEN[@NAME=$screen]/@WIDTH" />

	<!-- Main template -->
	<xsl:template match="/">
		<xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]" />
	</xsl:template>

	<xsl:template match="SCREEN">


		<DIV id="ask" style="width:100%;height:{@HEIGHT +10}px;overflow-y:auto;">
		<xsl:element name="br" />
			<xsl:if test="$gPosition='absolute'">
				<xsl:attribute name="STYLE">
					<xsl:text>{position:</xsl:text>
					<xsl:value-of select="$gPosition"/>
					<xsl:text>;overflow-y:auto;width:98%;height:</xsl:text>
					<xsl:value-of select="$gHeight"/>
					<xsl:text>px;}</xsl:text>
				</xsl:attribute>
			</xsl:if> 

			<!-- Display the Headers i.e content on top of tabs -->	
			<xsl:apply-templates select="HEADER/PAGE"></xsl:apply-templates>
	
			<!-- Display the Tabs and fields in those tabs -->	
			
			<xsl:if test="count(TAB/PAGE) &gt; 0">
			
				<div>
				<!-- Display the the tabs -->
				<TABLE CLASS="TABLETab" id="SYS_TBL_TABS" cellpadding="2" cellspacing="2" border="0">
			    		<TR CLASS="TRTab" id="TRTab">
						<xsl:apply-templates select="TAB/PAGE"></xsl:apply-templates>
						<!-- The following TD is required to ensure that above tabs don't occupy full screen width -->
						<TD CLASS="TDTabBlank" width="100%"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
					</TR>
				</TABLE>
				</div>
				<!-- Display the fields in those tabs -->
				
	 			<xsl:apply-templates select="TAB/PAGE" mode="content"/>
				
			</xsl:if> <!-- Display the Tabs and process fields in those tabs -->
			
	
   			<!-- Call page handler hardcoded as "All" that displays fields in all tab pages ex: Audit Info -->
   			<xsl:if test="$gPosition='absolute'">
				<DIV CLASS="absDIVPage" id="TBLPageAll">
					<xsl:if test="$gPosition='absolute'">
						<xsl:attribute name="STYLE">
							<xsl:text>{position:</xsl:text>
							<xsl:value-of select="$gPosition"/>
							<xsl:text>;height:</xsl:text>
							<xsl:value-of select="$gHeight+110"/>
							<xsl:text>px;}</xsl:text>
						</xsl:attribute>
					</xsl:if> 

	   				<xsl:call-template name="AbsolutePageHandler" >
		    				<xsl:with-param name="curr_page">All</xsl:with-param>
	       				</xsl:call-template>
				</DIV>
   			</xsl:if>
   	
   			<xsl:if test="$gPosition!='absolute'">
				<TABLE CLASS="colTABLEPage" id="TBLPageAll" cellpadding="1" cellspacing="0" border="0">
	   				<xsl:call-template name="ColumnPageHandler" >
		    				<xsl:with-param name="curr_page">All</xsl:with-param>
	       				</xsl:call-template>
       				</TABLE>
   			</xsl:if>
		</DIV>

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
					<xsl:attribute name="STYLE">
						<!--<xsl:text>visibility:hidden</xsl:text> !-->
						<xsl:text>{position:absolute;display:none;}</xsl:text>
					</xsl:attribute>
	    			</xsl:if>

           			<!-- Call Page Handler based on absolute/column positioning -->
	   			<xsl:call-template name="AbsolutePageHandler" >
					<xsl:with-param name="curr_page" select="@NAME"/>
           			</xsl:call-template>
       			</DIV>
		</xsl:if>
		<xsl:if test="$gPosition!='absolute'">
		
							
			<TABLE CLASS="colTABLEPage" ID="TBLPage{@ID}" cellpadding="1" cellspacing="0" border="0">
				<!-- Display first tab page contents and other tab pages are not displayed -->

				<!--ashok  !-->
				
				<TR CLASS="colTRRow">
					<TD COLSPAN="4">
						<DIV STYLE="height:20px;"/>
					</TD>
				</TR>

				<xsl:if test="position()!=1">
					<xsl:attribute name="STYLE">
						<xsl:text>display:none;</xsl:text>
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

 		<xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE !='Audit Entry' and ID != 'BLK_BLOCK_BUTTONS' and ID != 'BLK_STD_BUTTONS']" >
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
		<xsl:if test="@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and count(FIELD[@TABPAGE=$curr_page]) &gt; 0">
			<DIV id="{ID}" VIEW="{@VIEW}">
				<xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE" />
			</DIV>
		</xsl:if>
		<xsl:if test="((@TYPE = 'Multiple Entry' and @VIEW = 'Multiple Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and  @TABPAGE=$curr_page">
			<xsl:call-template name="MultipleHandler">
				<xsl:with-param name="curr_blk" select="."/>
			</xsl:call-template>
			<xsl:call-template name="MultipleHandler_1">
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
							<DIV STYLE="height:20px;"/>
						</TD>
				</TR>
				
				<TR CLASS="colTRRow">
					<TD COLSPAN="4">
						<!-- ashok -->

						
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td width="96%">
									<xsl:call-template name="MultipleHandler"/>
								</td>
								<td valign="top" width="4%">
									<xsl:call-template name="MultipleHandler_1"/>
								</td>
							</tr>
						</table>
						
					</TD>

				</TR>
								<TR CLASS="colTRRow">
					<TD COLSPAN="4">
						<DIV STYLE="height:20px;"/>
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

		<!--<DIV CLASS="DIVMultiple" NAME="dataContainer" ID="SYS_{$curr_blk/ID}"  STYLE="overflow:scroll;width:{$curr_blk/WIDTH};height:{$curr_blk/HEIGHT};"> -->
		<DIV CLASS="DIVMultiple" NAME="dataContainer" ID="SYS_{$curr_blk/ID}"  STYLE="overflow:auto; width:97%; height:{$curr_blk/HEIGHT}; margin-left:10px;"> 
   		<xsl:if test="$gPosition='absolute'">
			<xsl:attribute name="STYLE">
				<xsl:text>overflow:scroll;position:absolute;left:</xsl:text>
				<xsl:value-of select="$col" />
				<xsl:text>px;top:</xsl:text>
				<xsl:value-of select="$row" />
				<xsl:text>px;width:</xsl:text>
				<xsl:value-of select="$curr_blk/WIDTH" />
				<xsl:text>;height:</xsl:text>
				<xsl:value-of select="$curr_blk/HEIGHT" />
				<xsl:text></xsl:text>
			</xsl:attribute>
		</xsl:if>
		
		<TABLE CLASS="TABLEMultiple" ID="{$curr_blk/ID}" STYLE="table-layout:auto;" cellpadding="1" cellspacing="2" border="0">
			<xsl:apply-templates select="$curr_blk/EVENT"/>
				            
           		<xsl:if test="count(./DBT) &gt;= 1">
	     			<xsl:attribute name="DBT">
	           			<xsl:value-of select="./DBT" />
				</xsl:attribute>
	            
				<xsl:attribute name="DATAPAGESIZE">
					<xsl:value-of select="$curr_blk/DATAPAGESIZE" />
				</xsl:attribute>
			</xsl:if>

			<THEAD CLASS="THEADMultiple" id="downTblHead">
            			<TR CLASS="THEADTRMultiple">
        				<TD CLASS="THEADTDMultiple" SCOPE="COL">
						<INPUT TYPE = "CHECKBOX" OnClick="fnToggleAllOrNoneME({$curr_blk/ID},this)"/>
        				</TD>
					<xsl:for-each select="$curr_blk/FIELD">
	            				<xsl:sort select="@COL" data-type="number" order="ascending"/>

						<xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                    					<TD CLASS="DispNone" SCOPE="COL"></TD>
						</xsl:if>
						<xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
							<TD CLASS="THEADTDMultiple" SCOPE="COL">
        							<!-- if Condition added by Sankarganesh 28/06/05 - to support Drill Down Feature-->
								<xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
									<SPAN class = "LABELDDLink" onClick = "DD_{./NAME}.showTargetFuncId()">
										<xsl:value-of select="./LABEL" />
									</SPAN>
								</xsl:if>
								<xsl:if test="count(./DD) = 0">
									<NOBR><xsl:value-of select="./LABEL" /></NOBR>									
								</xsl:if>
							</TD>

						</xsl:if>

					</xsl:for-each>
									
					
		            </TR>
		        </THEAD>
		
			<TBODY CLASS="TBODYMultiple">
			        <!-- Now show the actual fields -->
			
      				<xsl:if test="count(./DBT) &gt;= 1">
					<xsl:call-template name="detail_row">
			 			<xsl:with-param name="node_name" select="$curr_blk" />
			        		<xsl:with-param name="num_rows" select="string('1')" />
					</xsl:call-template>
				</xsl:if>
      				<xsl:if test="count(./DBT) &lt;= 0">
					<xsl:call-template name="detail_row">
			 			<xsl:with-param name="node_name" select="$curr_blk" />
				        	<xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS" />
				        </xsl:call-template>
			        </xsl:if>
			
			</TBODY>
		    </TABLE>
		</DIV>
	</xsl:template>


	<xsl:template name="MultipleHandler_1">
		<xsl:param name="curr_blk" select="." />
		<xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')" />
		<xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')" />
		
		<!-- <xsl:variable name="meWidth" select="$curr_blk/WIDTH"/>-->
		<NOBR>
			<DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}" id="divAddDel_{$curr_blk/ID}" >
				<!-- 
					<xsl:attribute name="STYLE">
						<xsl:text>position:absolute;left:</xsl:text>
						<xsl:value-of select="$col + $curr_blk/WIDTH" />
						<xsl:text>px;top:</xsl:text>
						<xsl:value-of select="$row" />
						<xsl:text>px;width:20px</xsl:text>
					</xsl:attribute>
					-->
   				<xsl:if test="$gPosition='absolute'">

					<xsl:attribute name="STYLE">
						<xsl:text>{position:absolute; left:</xsl:text>
						
						<xsl:if test="$curr_blk/WIDTH=''">							
							<xsl:value-of select="$col + 805" />
						</xsl:if>
						<xsl:if test="$curr_blk/WIDTH !=''">							
							<xsl:value-of select="$col + $curr_blk/WIDTH +5" />
						</xsl:if>
						<xsl:text>px;top:</xsl:text>
						<xsl:value-of select="$row" />						
						<xsl:text>px;width:20px;}</xsl:text>
					</xsl:attribute>
				</xsl:if>
		
				<TABLE CLASS="TABLEAddDelRow" cellspacing="0" cellpadding="0">
					<TR CLASS="TRAddDelRow">
						<TD CLASS="TDAddDelRow">
							<BUTTON CLASS="BtnAddRow" name="cmdAddRow_{$curr_blk/ID}" id="cmdAddRow_{$curr_blk/ID}" onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')">
							<!--yugandhar added starts-->
								<xsl:if test="$curr_blk/READ_ONLY != '0'">
									<xsl:attribute name="disabled">true</xsl:attribute>
								</xsl:if>
							<!-- yugandhar added ends-->
								<IMG id="imgAdd_{$curr_blk/ID}" SRC="Images/Addrow.gif" alt="Add Row"/>
							</BUTTON>
						</TD>
					</TR>
					<TR CLASS="TRAddDelRow">
						<TD CLASS="TDAddDelRow">
							<BUTTON CLASS="BtnDelRow" name="cmdDelRow_{$curr_blk/ID}" id="cmdDelRow_{$curr_blk/ID}" onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')">
							<!--yugandhar added for starts-->
								<xsl:if test="$curr_blk/READ_ONLY != '0'">
									<xsl:attribute name="disabled">true</xsl:attribute>
								</xsl:if>
							<!-- yugandhar added ends-->
								<IMG id="imgAdd_{$curr_blk/ID}" SRC="Images/Delrow.gif" alt="Delete Row"/>
							</BUTTON>
						</TD>          
					</TR>
       
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
			<TD CLASS="TBODYTDMultiple">
				<INPUT type="checkbox" name="chkDeleteRow" id="chkDeleteRow" />
			</TD>
			<xsl:for-each select="$node_name/FIELD">
	    			<xsl:sort select="@COL" data-type="number" order="ascending"/>
   				<xsl:if test="$gPosition='absolute'">

	            			<xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
     						<TD CLASS="DispNone">
    							<xsl:apply-templates select="TYPE" />
		    				</TD>
                			</xsl:if>
	            			<xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
     						<TD CLASS="TBODYTDMultiple">
    							<xsl:apply-templates select="TYPE" />
		    				</TD>
					</xsl:if>
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
		        <!-- if position is row, colum just add one blank line.. So that Audit block
				will always paste at the end of the screen
				Modified By Senthil
			-->

		<!--<xsl:if test="$gPosition!='absolute'">
			<BR></BR>
		</xsl:if> !-->
		<DIV CLASS="DivAudit" id="DIV_{ID}">
			<xsl:attribute name="STYLE">
				<!--
				<xsl:variable name="row" select="substring-before(ABS_POS,',')" />
				<xsl:variable name="col" select="substring-after(ABS_POS,',')" />
				!-->

				<!--<xsl:text>{position:absolute;left:0px;top:"{$gHeight}"</xsl:text>  !-->
				
				<xsl:text>{position:absolute;width:100%;left:0px;top:</xsl:text> 
				<xsl:value-of select="$gHt + $gHeight"/> 
				<xsl:text>px;}</xsl:text>
			</xsl:attribute>
	   		<xsl:call-template name="dispAuditBar" />
		</DIV>
	    </NOBR>
	</xsl:template>

	<!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
	<xsl:template name="dispAuditBar">
		<table CLASS="TABLEAudit" cellpadding="5" cellspacing="0" border="0" style="width:100%">
			<tr CLASS="TABLEAudit">
				<td CLASS="THEADAudit"  style="width:95%" >
					<TABLE CLASS="TABLEAudit" DBT="{DBT}" cellpadding="0" cellspacing="0" border="0" style="width:500px;">
						<TR CLASS="TRAudit">
							<TD CLASS="TDAudit"><NOBR><LABEL CLASS="LABELNormal">Input By</LABEL></NOBR></TD>
		
<TD CLASS="fieldAudit">
									<NOBR>
										<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_ID" id="{DBT}__MAKER_ID" DBT="{DBT}" DBC="MAKER_ID" READONLY="true" MAXLENGTH="12" SIZE="8" />
									</NOBR>
								</TD>					
							<TD CLASS="TDAudit"><NOBR><LABEL CLASS="LABELNormal">Auth By</LABEL></NOBR></TD>

<TD CLASS="fieldAudit">
									<NOBR>
										<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_ID" id="{DBT}__CHECKER_ID" DBT="{DBT}" DBC="CHECKER_ID" READONLY="true" MAXLENGTH="12" SIZE="8" />
									</NOBR>
								</TD>
							</TR>
							
						
							<TR CLASS="TRAudit">
								

<TD CLASS="TDAudit"><NOBR><LABEL CLASS="LABELNormal">Date Time</LABEL></NOBR></TD>
								<TD CLASS="fieldAudit">
									<NOBR>
										<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" READONLY="true" MAXLENGTH="19" SIZE="20"/>
									</NOBR>
								</TD>
								

<TD CLASS="TDAudit"><NOBR><LABEL CLASS="LABELNormal">Date Time</LABEL></NOBR></TD>
								<TD CLASS="fieldAudit">
									<NOBR>
										<INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" READONLY="true" MAXLENGTH="19" SIZE="20"/>
									</NOBR>
								</TD>
								
				   
							</TR>
						
					</TABLE>
				</td>
				<td CLASS="TDAudit" style="width:5%">
					<TABLE CLASS="TABLEAudit" DBT="{DBT}" cellpadding="0" cellspacing="0">
						<TR>
							<TD>
								<DIV>
									<table align="center">
										<xsl:apply-templates select="//BLOCK[ID='BLK_BLOCK_BUTTONS' or ID = 'BLK_STD_BUTTONS']" mode="AuditBlockButtons"/>
									</table>
								</DIV>
							</TD>
						</TR>
					</TABLE>
				</td>
			</tr>
		</table>
	</xsl:template>

	<!-- For Audit Blk Buttons Ranju -->
	<xsl:template match="BLOCK" mode="AuditBlockButtons">
		<xsl:variable name="fldCnt" select="count(./FIELD/TYPE[text()='BUTTON'])"/>
		<xsl:if test="$fldCnt &lt; 3">
			<tr CLASS="TRAudit">
				<xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
					<xsl:call-template name="AUDIT_BLK_BUTTONS"/>
				</xsl:for-each>
			</tr>
		</xsl:if>
		<xsl:if test="$fldCnt &gt; 2">
			<tr CLASS="TRAudit">
				<xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
					<xsl:if test="position() &lt; ceiling($fldCnt div 2)+1">
						<xsl:call-template name="AUDIT_BLK_BUTTONS"/>
					</xsl:if>
				</xsl:for-each>
			</tr>
			<tr CLASS="TRAudit">
				<xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
					<xsl:if test="position() &gt; ceiling($fldCnt div 2)">
						<xsl:call-template name="AUDIT_BLK_BUTTONS"/>
					</xsl:if>
				</xsl:for-each>
				<xsl:if test="$fldCnt mod 2 != 0">
					<TD CLASS="TDAudit">
						<NOBR></NOBR>
					</TD>
				</xsl:if>
			</tr>
		</xsl:if>
	</xsl:template>

	<xsl:template name="AUDIT_BLK_BUTTONS">
		
   		<!-- ashok added this 
		<xsl:if test="$gPosition!='absolute'"> !-->
			<TD CLASS="TDAudit">
    				<NOBR>
	   				<xsl:call-template name="dispButtonField" />
    				</NOBR>
			</TD>
   		<!--</xsl:if> !-->
	</xsl:template>
	<!-- End!! For Audit Blk Buttons Ranju-->

	<!-- Template to display tabs -->
	<xsl:template match="TAB/PAGE">
		<!-- Known Problem: onfocus is required for supporting accesskey, but this results in 2 clicks when you select a tab using mouse -->
		<TD CLASS="TDTab" onclick="changeTabPage(this)" onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}">
    			<!-- Make the first tab as selected -->
    			
    			<xsl:if test="position()=1">
					<xsl:attribute name="CLASS">
						<xsl:text>TDTabSelected</xsl:text>
					</xsl:attribute>
					<img src="Images/blank.gif"/>
				</xsl:if>
				
				<xsl:if test="position()!=1">
            		<img src="Images/tab_1.gif"/>
				</xsl:if>
				
			<NOBR>
			
				<!--<LABEL CLASS="LABELNormal1"> !-->
				     <LABEL CLASS="TabLABELNormal"> 
					<xsl:call-template name="ATTR_Handler">
						<xsl:with-param name="curr_fld" select="." />
					</xsl:call-template>
					
					<xsl:if test="count(LABEL) &gt; 0">
						<xsl:call-template name="dispLabelCaption" >
							<xsl:with-param name="curr_fld" select="." />
						</xsl:call-template>
					</xsl:if>        

					
					<xsl:if test="count(SRC) &gt; 0">
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
		
			<DIV CLASS="absDIVHdr" ID="TBLPage{@ID}" STYLE="HEIGHT:{@HEIGHT};"> 
			
	   			<xsl:call-template name="AbsolutePageHandler" >
		    			<xsl:with-param name="curr_page"><xsl:value-of select="@NAME"/></xsl:with-param>
	       			</xsl:call-template>
       			</DIV>
			
   		</xsl:if>

   		<xsl:if test="$gPosition!='absolute'">


			<TABLE CLASS="colTABLEHdr" ID="TBLPage{@ID}" cellpadding="1" cellspacing="0" border="0">
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
				
				<!-- ashok Adjusting the Height screen height = height + Auditblock height !-->
				<!--window.dialogHeight = "<xsl:value-of select="@HEIGHT" />"; !-->

				var l_height	= "<xsl:value-of select="@HEIGHT"/>";
				var l_width	= "<xsl:value-of select="@WIDTH"/>";
				<!-- window.dialogWidth = "900px"; -->
				window.dialogWidth =  l_width + "px";
				document.title = "<xsl:value-of select="@TITLE" />";
				
				var l_newHeight = parseInt(l_height.split("px")) + 105;
				//window.dialogHeight = l_newHeight + "px";
				
				<!-- yugandhar adding starts to set the screen height -->
				var arrHgt = l_height.split('px');
				var hgt = parseInt(arrHgt[0]);
				
				<xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE ='Audit Entry']) &gt; 0">
					var auditDivObj = document.getElementById('DIV_BLK_AUDIT');
					var auditHgt = auditDivObj.offsetHeight;
					hgt += parseInt(auditHgt)+45;				
				</xsl:if>				
				window.dialogHeight = hgt + "px";
				<!-- yugandhar added ends here -->
				<!-- fnAttachEvents(); -->
			</xsl:for-each>
		</script>		
	</xsl:template>
</xsl:stylesheet>

