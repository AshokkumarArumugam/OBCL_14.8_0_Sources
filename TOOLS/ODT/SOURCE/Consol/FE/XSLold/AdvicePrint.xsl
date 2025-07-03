<?xml version="1.0"?>
<!-- XSL to Print the advices -->
<!-- @author Senthil Loganathan -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">	
	<!-- Output method is a printable HTML format -->
	<xsl:output method="html"/>

	<!-- Parameters required for the XSL -->
	<!-- Typical Parameters are like APPDATE, USERID, BRANCH_CODE etc. -->
	<xsl:param name="screen"/>
	<xsl:param name="APPDATE"/>
	<xsl:param name="USERID"/>
	<xsl:param name="BRANCH_CODE"/>

	<!-- Global Variables -->
	<xsl:variable name="gCurrentPageNo" select="1"/>
	<xsl:variable name="gTotalLinesPerPage" select="/FORM/SCREEN[@NAME=$screen]/@HEIGHT"/>
	<xsl:variable name="gCurrentLineNo">1</xsl:variable>
	<xsl:variable name="gAdviseHeader">AH</xsl:variable>
	<xsl:variable name="gAdviseFooter">AF</xsl:variable>
	<xsl:variable name="gAdvisePageHeader">PH</xsl:variable>
	<xsl:variable name="gAdvisePageFooter">PF</xsl:variable>
	<xsl:variable name="gAdviseBody">AB</xsl:variable>
	<xsl:variable name="gLineBreakChar">-</xsl:variable>    
	
    <xsl:variable name="gLineBreakSize">150</xsl:variable>

	<xsl:variable name="gSummLineBreakSize">15</xsl:variable>
	<xsl:variable name="gisAbsolute" select="/FORM/IS_ABSOLUTE"/>

	<!-- Advise Template Handlers -->

	<!-- Main  Template -->
	<xsl:template match="/">
		<xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
	</xsl:template>

	<xsl:template match="SCREEN">
	
		<STYLE>
			P { page-break-after: always } 
		</STYLE>   	
		<DIV class="divAdvice">		
			<TABLE  height = "800" width = "600" cols = "60" rows = "50" border="0">
			<!-- Call Different Handlers -->
			<xsl:call-template name="AdviseHeader">
			</xsl:call-template>

			<xsl:call-template name="AdvisePageHeader">
			<xsl:with-param name="pageNo" select="1"/>
			</xsl:call-template>

			<xsl:call-template name="AdviseBody">
			<xsl:with-param name="pageNo" select="1"/>
			</xsl:call-template>

			<xsl:call-template name="AdvisePageFooter">
			<xsl:with-param name="pageNo" select="/FORM/NO_OF_PAGES"/>
			</xsl:call-template>

			<xsl:call-template name="AdviseFooter">
			<xsl:with-param name="pageNo" select="/FORM/NO_OF_PAGES"/>
			</xsl:call-template>

			<!--/FORM/NO_OF_PAGES-->
			</TABLE>
		</DIV>

	</xsl:template>
    
	<!-- Advise Header -->
	<xsl:template name="AdviseHeader">
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseHeader]/FIELD/TYPE">
				<xsl:with-param name="pageNo" select="1"/>
			</xsl:apply-templates>
		</xsl:if>
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:call-template name="BlockHandler">
				<xsl:with-param name="startRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseHeader]/START_ROW"/>
				<xsl:with-param name="endRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseHeader]/END_ROW"/>
				<xsl:with-param name="curr_blk" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseHeader]"/>
				<xsl:with-param name="pageNo" select="1"/>
			
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- Advise Page Header -->
	<xsl:template name="AdvisePageHeader">
	<xsl:param name="pageNo"/>
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageHeader]/FIELD/TYPE">
				<xsl:with-param name="pageNo" select="1"/>
			</xsl:apply-templates>
		</xsl:if>
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:call-template name="BlockHandler">
				<xsl:with-param name="startRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageHeader]/START_ROW"/>
				<xsl:with-param name="endRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageHeader]/END_ROW"/>
				<xsl:with-param name="curr_blk" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageHeader]"/>
				<xsl:with-param name="pageNo" select="$pageNo"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- Advise Body -->
	<xsl:template name="AdviseBody">
	<xsl:param name="pageNo"/>
		<xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseBody]">
			<xsl:with-param name="pageNo" select="$pageNo"/>
		</xsl:apply-templates>
	</xsl:template>

	<!-- Advise Page Footer -->
	<xsl:template name="AdvisePageFooter">
	<xsl:param name="pageNo"/>
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageFooter]/FIELD/TYPE">
				<xsl:with-param name="pageNo" select="1"/>
			</xsl:apply-templates>
		</xsl:if>
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:call-template name="BlockHandler">
				<xsl:with-param name="startRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageFooter]/START_ROW"/>
				<xsl:with-param name="endRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageFooter]/END_ROW"/>
				<xsl:with-param name="curr_blk" select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageFooter]"/>
				<xsl:with-param name="pageNo" select="$pageNo"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- Advise Footer -->
	<xsl:template name="AdviseFooter">
	<xsl:param name="pageNo"/>
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseFooter]/FIELD/TYPE">
				<xsl:with-param name="pageNo" select="1"/>
			</xsl:apply-templates>
		</xsl:if>
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:call-template name="BlockHandler">
				<xsl:with-param name="startRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseFooter]/START_ROW"/>
				<xsl:with-param name="endRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseFooter]/END_ROW"/>
				<xsl:with-param name="curr_blk" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseFooter]"/>
				<xsl:with-param name="pageNo" select="$pageNo"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>


	<!-- Advise body Entry Handler -->
	<xsl:template match="BLOCK">
	<xsl:param name="pageNo"/>
		<xsl:if test="@TYPE != 'Multiple Entry'">
			<xsl:if test="$gisAbsolute = 'Y'">
				<xsl:apply-templates select="FIELD/TYPE">
					<xsl:with-param name="pageNo" select="$pageNo"/>
				</xsl:apply-templates>
			</xsl:if>
			<xsl:if test="$gisAbsolute = 'N'">
				<xsl:call-template name="BlockHandler">
					<xsl:with-param name="startRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseBody]/START_ROW"/>
					<xsl:with-param name="endRowNo" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseBody]/END_ROW"/>
					<xsl:with-param name="curr_blk" select="/FORM/BLOCK[@DISPLEVEL=$gAdviseBody]"/>
					<xsl:with-param name="pageNo" select="$pageNo"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:if>
		<xsl:if test="@TYPE = 'Multiple Entry'">
			<xsl:call-template name="MultipleHandler">
				<xsl:with-param name="curr_blk" select="."/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- Advise Multiple Entry Handler -->
	<xsl:template name="MultipleHandler">
	<xsl:param name="curr_blk" select="."/>
	
		<xsl:variable name="row" select="substring-before($curr_blk/ROW_COL, ',')"/>
		<xsl:variable name="col"  select="substring-after($curr_blk/ROW_COL, ',')"/>

		<xsl:variable name="left" select="substring-before($curr_blk/ABS_POS, ',')"/>
		<xsl:variable name="top"  select="substring-after($curr_blk/ABS_POS, ',')"/>
		<TR CLASS="colTDLabel">
		<TD CLASS="colTDLabel">
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:attribute name="COLSPAN">
			<xsl:value-of select="$col"/>
			</xsl:attribute>
		</xsl:if>
		</TD>
		<TD CLASS="colTDLabel">
		<xsl:if test="$gisAbsolute = 'N'">
			<xsl:attribute name="COLSPAN">
			<xsl:value-of select="80 - $col"/>
			</xsl:attribute>
		</xsl:if>
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:attribute name="COLSPAN">
			<xsl:value-of select="120"/>
			</xsl:attribute>
		</xsl:if>
	
		<DIV CLASS="DIVAdviseMultiple" NAME="DATACONTAINER" ID="SYS_{$curr_blk/ID}" STYLE="overflow:scroll;width:{$curr_blk/WIDTH};">
		<xsl:if test="$gisAbsolute = 'Y'">
			<xsl:attribute name="STYLE">
				<xsl:text>position:absolute;left:</xsl:text>
				<xsl:value-of select="$left"/>
				<xsl:text>px;top:</xsl:text>
				<xsl:value-of select="$top"/>
				<xsl:text>px;</xsl:text>
			</xsl:attribute>
		</xsl:if>
		<xsl:text disable-output-escaping="yes">
		&lt;TABLE CLASS="TBLMultipleAdvise" ID="{$curr_blk/ID}" STYLE="tableLayout:fixed;border-collapse:collapse;" cellpadding="2" cellspacing="1" border="1" &gt;
		</xsl:text>
		<xsl:variable name="countCols" select="count($curr_blk/FIELD[TYPE='LABEL'])"></xsl:variable>
		<!-- Display Start Line, Table Header and End Line -->
                <THEAD id="downTblHead">
			<!-- Display the Start Line Break For Table Header -->
			<xsl:call-template name="Print_Table_Break">
				<xsl:with-param name="countCols" select="$countCols"/>
			</xsl:call-template>
                </THEAD>
                <TBODY CLASS="THEADMultipleAdvise" id="downTblBody">
			<!-- Display the Table Headers -->
			<xsl:call-template name="Print_Table_Header">
				<xsl:with-param name="curr_blk" select="$curr_blk"/>
			</xsl:call-template>
			<!-- Display the End Line Break For Table Header -->
			<xsl:call-template name="Print_Table_Break">
				<xsl:with-param name="countCols" select="$countCols"/>
			</xsl:call-template>
                </TBODY>
		<!-- Display Records for this table -->
		<xsl:variable name="rowCount">0</xsl:variable>
		<xsl:variable name="countRows" select="count($curr_blk/ROW)"/>
		<xsl:variable name="breakColumn" select="$curr_blk/SMRYDTLS/BREAKS/BREAK/NAME"/>
		<xsl:if test="$countRows &gt; 0">
			<TBODY CLASS="TBODYMultipleAdvise">
				<xsl:if test="$countRows &gt; 0 ">
					<xsl:call-template name="Print_Record">
						<xsl:with-param name="count" select="$rowCount"/>
						<xsl:with-param name="curr_row" select="$curr_blk/ROW[position()=0]"/>
						<xsl:with-param name="curr_blk" select="$curr_blk"/>
						<xsl:with-param name="breakColumn" select="$breakColumn"/>
						<xsl:with-param name="countRows" select="$countRows"/>
						<xsl:with-param name="countCols" select="$countCols"/>
					</xsl:call-template>
				</xsl:if>
			</TBODY>
		</xsl:if>
		<xsl:text disable-output-escaping="yes">
		&lt;/TABLE&gt;
		</xsl:text>
		</DIV>
		</TD></TR>
	</xsl:template>
    
	<!-- Print Record Handler -->
	<xsl:template name="Print_Record">
	<xsl:param name="count"/>
	<xsl:param name="curr_row"/>
	<xsl:param name="curr_blk"/>
	<xsl:param name="breakColumn"/>
	<xsl:param name="countRows"/>
	<xsl:param name="countCols"/>

		<xsl:if test="$count &lt;= $countRows">
			<TR CLASS="TBODYTRMultipleAdvise">
			<xsl:for-each select="$curr_row/*">
				<xsl:if test="$gisAbsolute = 'N'">
					<xsl:if test="$curr_row/TYPE ='PAGEBRK'">
						<xsl:if test="position() &gt; 1">
							<xsl:call-template name="BreakPage">
								<xsl:with-param name="pageNo" select="$curr_row/PAGEBRK"/>
								<xsl:with-param name="countCols" select="$countCols"/>
								<xsl:with-param name="curr_blk" select="$curr_blk"/>
							</xsl:call-template>
						</xsl:if>
					</xsl:if>
				</xsl:if>
				<xsl:if test="$curr_row/TYPE = 'SUMMARY'">
					<xsl:if test="position() &gt; 1">
						<xsl:variable name="summName" select="name()"/>
						<xsl:variable name="summValue" select="text()"/>
						<xsl:variable name="summaryColumn" select="./@NAME"/>
				
						<xsl:call-template name="Print_Summary">
							<xsl:with-param name="curr_blk" select="$curr_blk"/>
							<xsl:with-param name="summName" select="$summName"/>
							<xsl:with-param name="summValue" select="$summValue"/>
							<xsl:with-param name="summaryColumn" select="$summaryColumn"/>
						</xsl:call-template>
					</xsl:if>
				</xsl:if>
				
				<xsl:if test="$curr_row/TYPE = 'LABEL'">
					<xsl:if test="position() &gt; 1">
						<xsl:variable name="nodeName" select="name()"/>
						<xsl:variable name="nodeValue" select="text()"/>
						<xsl:variable name="align" select="$curr_blk/FIELD[NAME=concat('LBL_', $nodeName)]/ALIGN"/>
						<!-- if there are no breaks define-->
						<!--<xsl:if test="not($breakColumn)">
							<xsl:call-template name="Print_TDValue">
								<xsl:with-param name="nodeValue" select="$nodeValue"/>
								<xsl:with-param name="align" select="$align"/>
							</xsl:call-template>
						</xsl:if>-->
						<!--<xsl:if test="$breakColumn = $nodeName">
							<xsl:variable name="prevRowNodeValue" select="$curr_blk/ROW[position() = ($count - 1)]/DUE_DATE"></xsl:variable>
							<xsl:value-of select="$prevRowNodeValue"/>-->

							<!-- First time the prevRowNodeValue will be blank, Print the nodeValue -->
							<!--<xsl:if test="string-length($prevRowNodeValue) = 0 ">-->
								<xsl:call-template name="Print_TDValue">
									<xsl:with-param name="nodeValue" select="$nodeValue"/>
									<xsl:with-param name="align" select="$align"/>
								</xsl:call-template>
							<!--</xsl:if>-->
					
							<!-- If the values are equal then print a space -->
							<!--<xsl:if test="$prevRowNodeValue = $nodeValue">
								<xsl:call-template name="Print_TDValue">
									<xsl:with-param name="nodeValue"> </xsl:with-param>
									<xsl:with-param name="align" select="$align"/>
								</xsl:call-template>
							</xsl:if>-->

							<!--<xsl:if test="$prevRowNodeValue != 'LABEL'">
								<xsl:call-template name="Print_TDValue">
									<xsl:with-param name="nodeValue" select="$nodeValue"/>
									<xsl:with-param name="align" select="$align"/>
								</xsl:call-template>
							</xsl:if>-->

						<!--</xsl:if>
						<xsl:if test="$breakColumn != $nodeName">
							<xsl:call-template name="Print_TDValue">
								<xsl:with-param name="nodeValue" select="$nodeValue"/>
								<xsl:with-param name="align" select="$align"/>
							</xsl:call-template>
						</xsl:if>-->
					</xsl:if>
				</xsl:if>
			</xsl:for-each>
			</TR>
			<!-- Print the record recursively -->
			<xsl:call-template name="Print_Record">
				<xsl:with-param name="count" select="$count + 1"/>
				<xsl:with-param name="curr_row" select="$curr_blk/ROW[position()=$count + 1]"/>
				<xsl:with-param name="curr_blk" select="$curr_blk"/>
				<xsl:with-param name="breakColumn" select="$breakColumn"/>
				<xsl:with-param name="countRows" select="$countRows"/>
				<xsl:with-param name="countCols" select="$countCols"/>
			</xsl:call-template>
		</xsl:if>	
	</xsl:template>
	
	<!-- Print_Summary -->
	<xsl:template name="Print_Summary">
		<xsl:param name="curr_blk"/>
		<xsl:param name="summName"/>
		<xsl:param name="summValue"/>
		<xsl:param name="summaryColumn"/>

		<!-- Process all the summary details -->
		<!--<xsl:for-each select="$curr_blk/SMRYDTLS/BREAKS">-->
			
		<xsl:variable name="breakColumn" select="$curr_blk/SMRYDTLS/BREAKS/BREAK/NAME"/>
		<xsl:variable name="breakColumnPos" select="$curr_blk/FIELD[NAME=concat('LBL_', $summaryColumn)]/COLIDX"/>
		<xsl:variable name="summaryAlign" select="$curr_blk/FIELD[NAME=concat('LBL_', $summaryColumn)]/ALIGN"/>
		

		<!-- Print the TD's with space -->
		<xsl:call-template name="Empty_TD">
			<xsl:with-param name="count" select="$breakColumnPos - 1"/>
		</xsl:call-template>
		
		<!-- Print the TD with Line -->
		<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$summaryAlign}">
			<xsl:call-template name="Print_Summary_Break_Line">
				<xsl:with-param name="count" select="$gSummLineBreakSize"/>
			</xsl:call-template>
		</TD>
		<!-- <xsl:text>&lt;/TR&gt;</xsl:text> -->
		<TR CLASS="TBODYTRMultipleAdvise">
	
			<!-- Print the TD's with space -->
			<xsl:call-template name="Empty_TD">
				<xsl:with-param name="count" select="$breakColumnPos - 1"/>
			</xsl:call-template>
			<xsl:call-template name="Print_Summary_Record">
				<xsl:with-param name="summName" select="$summName"/>
				<xsl:with-param name="summValue" select="$summValue"/>
				<xsl:with-param name="summaryColumn" select="$summaryColumn"/>
				<xsl:with-param name="align" select="$summaryAlign"/>
			</xsl:call-template>
		</TR>
		<TR CLASS="TBODYTRMultipleAdvise">
			<xsl:call-template name="Empty_TD">
				<xsl:with-param name="count" select="$breakColumnPos - 1"/>
			</xsl:call-template>
			<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$summaryAlign}">
				<xsl:call-template name="Print_Summary_Break_Line">
					<xsl:with-param name="count" select="$gSummLineBreakSize"/>
				</xsl:call-template>
			</TD>
		</TR>
		<!--</xsl:for-each>-->
	</xsl:template>
	
	<!-- Print Summary Break Line -->
	<xsl:template name="Print_Summary_Break_Line">
	<xsl:param name="count"/>
		<xsl:call-template name="Line_Break">
			<xsl:with-param name="count" select="$count"/>
		</xsl:call-template>
	</xsl:template>
	
	<!-- Print the Summary record -->
	<xsl:template name="Print_Summary_Record">
	<xsl:param name="summName"/>
	<xsl:param name="summValue"/>
	<xsl:param name="summaryColumn"/>
	<xsl:param name="align"/>
		<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$align}">
			<xsl:value-of select="$summName"/>
			<xsl:text> : </xsl:text>
			<xsl:value-of select="$summValue"/>
		</TD>
	</xsl:template>
    
	<!-- Print Column Value -->
	<xsl:template name="Print_TDValue">
	<xsl:param name="nodeValue"/>
	<xsl:param name="align"/>
		<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$align}">
			<xsl:value-of select="$nodeValue"/>
		</TD>
	</xsl:template>
    
	<!-- Handler for Print Table Break Line -->
	<xsl:template name="Print_Table_Break">
	<xsl:param name="countCols"/>
		<TR CLASS="THEADTRMultipleAdvise">
			<TD  CLASS="TBODYTDMultipleAdvise" COLSPAN="{$countCols}">
				<xsl:call-template name="Line_Break">
					<xsl:with-param name="count" select="$gLineBreakSize"/>
				</xsl:call-template>
			</TD>
		</TR>
	</xsl:template>

	<!-- Handler for Print Table Header -->
	<xsl:template name="Print_Table_Header">
	<xsl:param name="curr_blk" select="."/>
		<TR CLASS="THEADTRMultipleAdvise">
			<xsl:for-each select="$curr_blk/FIELD[TYPE='LABEL']">
				<xsl:variable name="width" select="./WIDTH"/>
				<xsl:variable name="align" select="./ALIGN"/>
				<TD CLASS="THEADTDMultipleAdvise" WIDTH="{$width}%" ALIGN="{$align}">
					<xsl:value-of select="./LABEL"></xsl:value-of>
				</TD>
			</xsl:for-each>
		</TR>
	</xsl:template>

    <!-- Label Handlers -->
	<xsl:template match="FIELD/TYPE[text()='LABEL']">
	<xsl:param name="pageNo"/>
		<TR  CLASS="TBODYTDMultipleAdvise">
			<TD  CLASS="TBODYTDMultipleAdvise">
				<SPAN class="spanAdviseLabel">
					<xsl:call-template name="Pos_Handler">
						<xsl:with-param name="curr_fld" select=".."/>
						<xsl:with-param name="pageNo" select="$pageNo"/>
					</xsl:call-template>
					<xsl:call-template name="dispLabelField"/>
				</SPAN>
			</TD>
		</TR>
	</xsl:template>
    
    <!-- Line Break Handlers -->
	<xsl:template match="FIELD/TYPE[text()='LINE']">
	<xsl:param name="pageNo"/>
		<TR  CLASS="TBODYTDMultipleAdvise">
			<TD  CLASS="TBODYTDMultipleAdvise">
				<SPAN CLASS="spanAdviseLabel">
					<xsl:call-template name="Pos_Handler">
						<xsl:with-param name="curr_fld" select=".."/>
						<xsl:with-param name="pageNo" select="$pageNo"/>
					</xsl:call-template>
					<xsl:call-template name="dispLineBreak"/>
				</SPAN>
			</TD>
		</TR>
	</xsl:template>

    <!-- page break handler -->
   <!-- <xsl:template match="FIELD/TYPE[text()='PAGEBRK']">
      <xsl:param name="pageNo"/>
		<xsl:call-template name="BreakPageSingle">
			<xsl:with-param name="pageNo" select="/FORM/BLOCK/FIELD/PAGEBRK"/>
		</xsl:call-template>
    </xsl:template>-->
    
	<!-- Display Line Break -->
	<xsl:template name="dispLineBreak">
		<NOBR>
			<LABEL CLASS="lblAdvise">
				<xsl:call-template name="Attr_Handler">
					<xsl:with-param name="curr_fld" select=".."/>
				</xsl:call-template>
				<xsl:call-template name="Line_Break">
					<xsl:with-param name="count" select="$gLineBreakSize"/>
				</xsl:call-template>
			</LABEL>
		</NOBR>
	</xsl:template>

	<!-- Display Label Handler -->
	<xsl:template name="dispLabelField">
		<NOBR>
			<LABEL CLASS="lblAdvise">
				<xsl:call-template name="Attr_Handler">
					<xsl:with-param name="curr_fld" select=".."/>
				</xsl:call-template>
				<xsl:call-template name="dispLabelCaption">
					<xsl:with-param name="curr_fld" select=".."/>
				</xsl:call-template>
			</LABEL>
		</NOBR>
	</xsl:template>

	<!-- Label Caption display hanlder -->
	<xsl:template name="dispLabelCaption">
	<xsl:param name="curr_fld" select="."/>
		<xsl:value-of select="$curr_fld/LABEL"/>
	</xsl:template>

	<!-- Position Handler -->
	<xsl:template name="Pos_Handler">
	<xsl:param name="curr_fld" select="."/>
	<xsl:param name="pageNo"/>
		<xsl:if test="count($curr_fld/ABS_POS) &gt; 0">
			<xsl:attribute name="STYLE">
				<xsl:variable name="left" select="substring-before($curr_fld/ABS_POS, ',')"/>
				<xsl:variable name="top" select="substring-after($curr_fld/ABS_POS, ',')"/>
				<xsl:if test="$pageNo = 1">
					<xsl:text>{position:absolute;left:</xsl:text>
					<xsl:value-of select="$left"/>
					<xsl:text>px;top:</xsl:text>
					<xsl:value-of select="$top"/>
					<xsl:text>px;}</xsl:text>
				</xsl:if>
				<xsl:if test="$pageNo &gt; 1">
					<xsl:variable name="height" select="/FORM/ADVICE_HIGHT"/>
					<xsl:text>{position:absolute;left:</xsl:text>
					<xsl:value-of select="$left"/>
					<xsl:text>px;top:</xsl:text>
					<xsl:value-of select="$top + ($height * ($pageNo - 1))"/>
					<xsl:text>px;}</xsl:text> 
				</xsl:if>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<!-- Attribute Handler -->
	<xsl:template name="Attr_Handler">
	<xsl:param name="curr_fld" select="."/>
		<xsl:attribute name="NAME">
			<xsl:value-of select="$curr_fld/NAME"/>
		</xsl:attribute>
	</xsl:template>
    
	<!-- Print Line Breaks -->
	<xsl:template name="Line_Break">
	<xsl:param name="count" select="1"/>
		<xsl:if test="$count &gt; 0">
			<xsl:value-of select="$gLineBreakChar"/>
			<xsl:call-template name="Line_Break">
				<xsl:with-param name="count" select="$count - 1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<!-- Put Empty TD Handler -->
	<xsl:template name="Empty_TD">
	<xsl:param name="count" select="1"/>
		<xsl:if test="$count &gt; 0">
			<TD CLASS="TBODYTDMultipleAdvise">
				<xsl:text></xsl:text>
			</TD>
			<xsl:call-template name="Empty_TD">
				<xsl:with-param name="count" select="$count -1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>    

	<!-- insert page breaks for multiple entry blocks-->
	<xsl:template name="BreakPage">
	<xsl:param name="pageNo"/>
	<xsl:param name="countCols"/>
	<xsl:param name="curr_blk"/>	
		
		<xsl:text disable-output-escaping="yes">
		&lt;/TABLE&gt;
		&lt;/TD&gt;
		&lt;/TR&gt;
		</xsl:text>
		<xsl:call-template name="AdvisePageFooter">
			<xsl:with-param name="pageNo" select="$pageNo"/>
		</xsl:call-template>

		<TR CLASS="colTRLabel"><TD CLASS="colTDLabel"><P></P></TD></TR>
		<xsl:call-template name="AdvisePageHeader">
			<xsl:with-param name="pageNo" select="$pageNo + 1"/>
		</xsl:call-template>
		<xsl:variable name="col"  select="substring-after($curr_blk/ROW_COL, ',')"/>
		<xsl:text disable-output-escaping="yes">
		&lt;TR CLASS="colTRLabel"&gt;
		&lt;TD CLASS="colTDLabel" COLSPAN= 
		</xsl:text>
		<xsl:value-of select="$col"/>
		<xsl:text disable-output-escaping="yes">
		 &gt; &lt;/TD&gt;
		&lt;TD CLASS="colTDLabel" COLSPAN=
		</xsl:text>
		<xsl:value-of select="80 - $col"/>
		<xsl:text disable-output-escaping="yes">
		&gt;
		</xsl:text>
		<xsl:text disable-output-escaping="yes">
		&lt;TABLE CLASS="TBLMultipleAdvise" ID="{$curr_blk/ID}" STYLE="tableLayout:fixed;border-collapse:collapse;" cellpadding="2" cellspacing="1" border="1" &gt;
		</xsl:text>
		<THEAD id="downTblHead">
			<!-- Display the Start Line Break For Table Header -->
			<xsl:call-template name="Print_Table_Break">
				<xsl:with-param name="countCols" select="$countCols"/>
			</xsl:call-template>
		</THEAD>
		<TBODY CLASS="THEADMultipleAdvise" id="downTblBody">
			<!-- Display the Table Headers -->
			<xsl:call-template name="Print_Table_Header">
				<xsl:with-param name="curr_blk" select="$curr_blk"/>
			</xsl:call-template>

			<!-- Display the End Line Break For Table Header -->
			<xsl:call-template name="Print_Table_Break">
				<xsl:with-param name="countCols" select="$countCols"/>
			</xsl:call-template>
		</TBODY>
	</xsl:template>

	<!-- insert page breaks for single entry blocks-->
	<xsl:template name="BreakPageSingle">
	<xsl:param name="pageNo"/>
		<xsl:call-template name="AdvisePageFooter">
			<xsl:with-param name="pageNo" select="$pageNo"/>
		</xsl:call-template>

		<P>breaks</P>
		<xsl:call-template name="AdvisePageHeader">
			<xsl:with-param name="pageNo" select="$pageNo + 1"/>
		</xsl:call-template>
	</xsl:template>


	<!-- templates for row-column positioning -->
	<xsl:template name="BlockHandler">
	<xsl:param name="startRowNo"/>
	<xsl:param name="endRowNo"/>
	<xsl:param name="curr_blk"/>
	<xsl:param name="pageNo"/>	

	<xsl:if test="$startRowNo &lt;= $endRowNo">
		<xsl:for-each select="$curr_blk/FIELD">
			<xsl:sort select="../@ROW" data-type="number" order="ascending"/>
			<xsl:variable name="field" select="."/>
			<xsl:if test="$field[@ROW = $startRowNo]">
				<xsl:call-template name="BlockRowHandler">
					<xsl:with-param name="rowNo" select="$startRowNo"/>
					<xsl:with-param name="curr_blk" select="$curr_blk"/>
					<xsl:with-param name="curr_field_no" select="position()"/>
					<xsl:with-param name="pageNo" select="$pageNo"/>
				</xsl:call-template> 
			</xsl:if>
			<xsl:if test="$field/TYPE[text() = 'PAGEBRK']">
				<xsl:if test="$startRowNo = position()">
				<xsl:call-template name="BreakHandler">
					<xsl:with-param name="pageNo" select="$pageNo"/>
				</xsl:call-template>
				</xsl:if>
			</xsl:if>
		</xsl:for-each>	 
		<xsl:variable name="no_rows" select="count($curr_blk/FIELD[@ROW = $startRowNo])"/>
		<xsl:if test="$no_rows = 0">
			<xsl:call-template name="Empty_TR">
			<xsl:with-param name="row_no" select="$startRowNo"/>
			</xsl:call-template>
		</xsl:if>
		<xsl:call-template name="BlockHandler">
		<xsl:with-param name="startRowNo" select="$startRowNo + 1"/>
		<xsl:with-param name="endRowNo" select="$endRowNo"/>
		<xsl:with-param name="curr_blk" select="$curr_blk"/>
		<xsl:with-param name="pageNo" select="$pageNo"/>
		
		</xsl:call-template>
	</xsl:if>
    </xsl:template>


	<xsl:template name="Empty_TR">
	<xsl:param name="row_no"/>
		<TR CLASS="colTRLabel">
		<TD CLASS="colTDLabel" COLSPAN="80"></TD>
		</TR>
	</xsl:template>

    <!-- Advise Header -->
  <xsl:template name="BlockRowHandler">
    <xsl:param name="rowNo"/>
    <xsl:param name="curr_blk"/>
    <xsl:param name="curr_field_no"/>
    <xsl:param name="pageNo"/>
       <xsl:variable name="curr_row" select="$curr_blk/FIELD[position() = $curr_field_no]/@ROW"/>
       <xsl:if test="$curr_field_no = 1">
       <xsl:call-template name="ColumnHandler">
		    <xsl:with-param name="curr_row" select="$curr_row"/>
		    <xsl:with-param name="curr_blk" select="$curr_blk"/>
		     <xsl:with-param name="pageNo" select="$pageNo"/>	
		</xsl:call-template>
	</xsl:if>
       <xsl:if test="$curr_field_no &gt; 1">
	<xsl:variable  name="prev_row" select="$curr_blk/FIELD[position() = $curr_field_no - 1]/@ROW"/>
	<xsl:if test="$curr_row != $prev_row">
			<!-- Handle all rows within a page -->
		<xsl:call-template name="ColumnHandler">
		    <xsl:with-param name="curr_row" select="$curr_row"/>
		    <xsl:with-param name="curr_blk" select="$curr_blk"/>
		    <xsl:with-param name="pageNo" select="$pageNo"/>
		</xsl:call-template>
	</xsl:if>
	</xsl:if>
	 
    </xsl:template>
	
	<!-- Row Handler -->
<xsl:template name="ColumnHandler">
     <xsl:param name="curr_row" select="." />
     <xsl:param name="curr_blk"/>
     <xsl:param name="pageNo"/>

     <TR CLASS="colTRLabel">
     <xsl:for-each select="$curr_blk/FIELD[@ROW=$curr_row]/TYPE">
	<xsl:sort select="../@COL" data-type="number" order="ascending"/>
	<xsl:if test="text()='LABEL'">
    	<xsl:call-template name="LabelHandler">
		<xsl:with-param name="diff" select="count(/FORM/BLOCK/FIELD[@ROW=$curr_row])"/>
		<xsl:with-param name="pos" select="position()"/>
		<xsl:with-param name="curr_blk" select="$curr_blk"/>
		<xsl:with-param name="pageNo" select="$pageNo"/>
	</xsl:call-template>  
	</xsl:if>
	<xsl:if test="text()='LINE'">
	<xsl:call-template name="LineHandler"/>
	</xsl:if>
	</xsl:for-each>	
	 </TR>

</xsl:template>
   
    
	<!-- Label Handlers -->
	<xsl:template name="LabelHandler">
	    <xsl:param name="diff"/>
	    <xsl:param name="pos"/>
	    <xsl:param name="curr_blk"/>
	    <xsl:param name="pageNo"/>

		<xsl:if test="$diff &gt; 1 and $pos &gt; 1">
			<xsl:variable name="col1" select="$curr_blk/FIELD[position() = $pos]/@COL"/>
			
			<xsl:variable name="col2" select="$curr_blk/FIELD[position() = $pos - 1]/@COL"/>
			
			<xsl:variable name="width" select="$curr_blk/FIELD[position() = $pos - 1]/WIDTH"/>
			<xsl:variable name="colspan" select="$col1 - $col2 - $width"/>
			<TD CLASS="colTDLabel">
				<xsl:attribute name="COLSPAN">
				<xsl:value-of select="$colspan - 1"/> 
				</xsl:attribute>
			</TD>
		</xsl:if>

		<xsl:if test="$diff = 1 or $pos = 1">
			<TD CLASS="colTDLabel">
			<xsl:attribute name="COLSPAN">
			<xsl:value-of select="../@COL - 1"/> 
			</xsl:attribute>
			</TD>
		</xsl:if>	
		<TD CLASS="colTDLabel">
		<xsl:attribute name="ALIGN">
		<xsl:value-of select="../ALIGN"/>
		</xsl:attribute>
		<xsl:attribute name="COLSPAN">
		<xsl:value-of select="../WIDTH"/>
		</xsl:attribute>
			<xsl:if test="../NAME = 'PAGE_NO'">
				<xsl:call-template name="dispPageNo">
					<xsl:with-param name="pageNo" select="$pageNo"/>
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="../NAME != 'PAGE_NO'">
	   			<xsl:call-template name="dispLabelField" />
			</xsl:if>
   		</TD>
	
    </xsl:template>


   <!-- Line Handlers -->
    <xsl:template name="LineHandler">
	
          <!--<xsl:call-template name="RowHandler" />-->
		<xsl:if test="../@COL &gt; 1">
			<TD CLASS="colTDLabel">
				<xsl:attribute name="COLSPAN">
					<xsl:value-of select="../@COL - 1"/> 
				</xsl:attribute>
			</TD>
		</xsl:if>
		<TD CLASS="colTDLabel">
		<xsl:attribute name="COLSPAN">
		<xsl:text>80</xsl:text>
		</xsl:attribute>
	   		<xsl:call-template name="dispLineBreak" />
   		</TD>
	
    </xsl:template>	
    

    <!-- page break handler -->
    <xsl:template name="BreakHandler">
      <xsl:param name="pageNo"/>
		<xsl:call-template name="BreakPageSingle">
			<xsl:with-param name="pageNo" select="/FORM/BLOCK/FIELD/PAGEBRK"/>
		</xsl:call-template>
    </xsl:template>
	
	<xsl:template name="dispPageNo">
	<xsl:param name="pageNo"/>
		<NOBR>
			<LABEL CLASS="lblAdvise">
				<xsl:value-of select="$pageNo"/>
			</LABEL>
		</NOBR>
	</xsl:template>


</xsl:stylesheet>
    
