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
	<!-- 120_SCRNVB_16295416 Starts -->
	<!--
	<xsl:variable name="gLineBreakChar">-</xsl:variable>    
	<xsl:variable name="gLineBreakSize">150</xsl:variable> -->
	<xsl:variable name="gLineBreakChar"></xsl:variable>  
	<xsl:variable name="gLineBreakSize">30</xsl:variable>
	<!-- 120_SCRNVB_16295416 Ends-->
	<xsl:variable name="gSummLineBreakSize">15</xsl:variable>

    <!-- Advise Template Handlers -->

    <!-- Main  Template -->
    <xsl:template match="/">
        <xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
    </xsl:template>

    <xsl:template match="SCREEN">
        <!-- Call Different Handlers -->
            <DIV class="divAdvice">
            
            <xsl:call-template name="AdviseHeader">
            </xsl:call-template>

            <xsl:call-template name="AdvisePageHeader">
            </xsl:call-template>

            <xsl:call-template name="AdviseBody">
            </xsl:call-template>

            <xsl:call-template name="AdvisePageFooter">
            </xsl:call-template>

            <xsl:call-template name="AdviseFooter">
            </xsl:call-template>
            </DIV>

    </xsl:template>
    
    <!-- Advise Header -->
    <xsl:template name="AdviseHeader">
        <xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseHeader]/FIELD/TYPE"/>
    </xsl:template>

    <!-- Advise Page Header -->
    <xsl:template name="AdvisePageHeader">
        <xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageHeader]/FIELD/TYPE"/>
    </xsl:template>

    <!-- Advise Body -->
    <xsl:template name="AdviseBody">
        <xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseBody]"/>
    </xsl:template>

    <!-- Advise Page Footer -->
    <xsl:template name="AdvisePageFooter">
        <xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdvisePageFooter]/FIELD/TYPE"/>
    </xsl:template>

    <!-- Advise Footer -->
    <xsl:template name="AdviseFooter">
        <xsl:apply-templates select="/FORM/BLOCK[@DISPLEVEL=$gAdviseFooter]/FIELD/TYPE"/>
    </xsl:template>


    <!-- Advise Single Entry Handler -->
    <xsl:template match="BLOCK">
        <xsl:if test="@TYPE != 'Multiple Entry'">
            <xsl:apply-templates select="FIELD/TYPE"/>
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
        <xsl:param name="left" select="substring-before($curr_blk/ABS_POS, ',')"/>
        <xsl:param name="top"  select="substring-after($curr_blk/ABS_POS, ',')"/>
        <DIV CLASS="DIVAdviseMultiple" NAME="DATACONTAINER" ID="SYS_{$curr_blk/ID}" STYLE="overflow:hidden;width:{$curr_blk/WIDTH};">
			<xsl:attribute name="STYLE">
				<xsl:text>position:absolute;width:100%;left:</xsl:text>
				<xsl:value-of select="$left"/>
				<xsl:text>px;top:</xsl:text>
				<xsl:value-of select="$top"/>
				<xsl:text>px;</xsl:text>
			</xsl:attribute>
            <TABLE CLASS="TBLMultipleAdvise" ID="{$curr_blk/ID}" STYLE="tableLayout:auto;border-collapse:collapse;" cellpadding="2" cellspacing="1" summary="">
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
		<xsl:variable name="browId">1</xsl:variable>
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
								<xsl:with-param name="browId" select="$browId"/>
							</xsl:call-template>
							<xsl:call-template name="Print_Summary">
								<xsl:with-param name="curr_blk" select="$curr_blk"/>
								<xsl:with-param name="browId" select="$browId"/>
							</xsl:call-template>
						</xsl:if>
                </TBODY>
                </xsl:if>
            </TABLE>
        </DIV>
    </xsl:template>
    
    <!-- Print Record Handler -->
    <xsl:template name="Print_Record">
		<xsl:param name="count"/>
		<xsl:param name="curr_row"/>
		<xsl:param name="curr_blk"/>
		<xsl:param name="breakColumn"/>
		<xsl:param name="countRows"/> 
		<xsl:param name="browId"/>

        <xsl:if test="$count &lt;= $countRows">
	    	<TR CLASS="TBODYTRMultipleAdvise">
			<xsl:for-each select="$curr_row/*">
				<xsl:if test="position() &gt; 0">
					<xsl:variable name="nodeName" select="name()"/>
					<xsl:variable name="nodeValue" select="text()"/>
					<xsl:variable name="align" select="$curr_blk/FIELD[NAME=concat('LBL_', $nodeName)]/ALIGN"/>
					<xsl:if test="$breakColumn = $nodeName">
						<xsl:variable name="prevRowNodeValue" select="$curr_blk/ROW[position() = ($count - 1)]/DUE_DATE"></xsl:variable>
						<!-- First time the prevRowNodeValue will be blank, Print the nodeValue -->
						<xsl:if test="string-length($prevRowNodeValue) = 0 ">
							<xsl:call-template name="Print_TDValue">
								<xsl:with-param name="nodeValue" select="$nodeValue"/>
								<xsl:with-param name="align" select="$align"/>
							</xsl:call-template>
						</xsl:if>
					
						<!-- If the values are equal then print a space -->
						<xsl:if test="$prevRowNodeValue = $nodeValue">
							<xsl:call-template name="Print_TDValue">
								<xsl:with-param name="nodeValue"> </xsl:with-param>
								<xsl:with-param name="align" select="$align"/>
							</xsl:call-template>
							
						</xsl:if>
					
						<!-- If the values change then break it, print summary and then continue with next -->
						<xsl:if test="$prevRowNodeValue != $nodeValue">
							<xsl:call-template name="Print_Summary">
								<xsl:with-param name="curr_blk" select="$curr_blk"/>
								<xsl:with-param name="browId" select="$browId"/>
							</xsl:call-template>
							<xsl:call-template name="Print_TDValue">
								<xsl:with-param name="nodeValue" select="$nodeValue"/>
								<xsl:with-param name="align" select="$align"/>
							</xsl:call-template>
						</xsl:if>
					</xsl:if>
					<xsl:if test="$breakColumn != $nodeName">
						<xsl:call-template name="Print_TDValue">
							<xsl:with-param name="nodeValue" select="$nodeValue"/>
							<xsl:with-param name="align" select="$align"/>
						</xsl:call-template>
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
				<xsl:with-param name="browId" select="$browId"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<!-- Print_Summary -->
	<xsl:template name="Print_Summary">
		<xsl:param name="curr_blk"/>
		<xsl:param name="browId"/>
		<!-- Process all the summary details -->
		<xsl:for-each select="$curr_blk/SMRYDTLS/BREAKS">
			<xsl:variable name="breakId" select="./BREAK/@ID"/>
			<xsl:variable name="breakColumn" select="./BREAK/NAME"/>
			<xsl:variable name="breakColumnPos" select="./BREAK/@COL"/>
			<xsl:variable name="summaryColumn" select="./BREAK/COMPUTE/@NAME"/>
			<xsl:variable name="summaryExpr" select="./BREAK/COMPUTE"/>
			<xsl:variable name="summaryAlign" select="$curr_blk/FIELD[NAME=concat('LBL_', $summaryColumn)]/ALIGN"/>
			

			<!-- Print the TD's with space -->
			<xsl:call-template name="Empty_TD">
				<xsl:with-param name="count" select="$breakColumnPos"/>
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
					<xsl:with-param name="count" select="$breakColumnPos"/>
				</xsl:call-template>
					<xsl:call-template name="Print_Summary_Record">
					<xsl:with-param name="breakRowId" select="$breakId"/>
					<xsl:with-param name ="browId" select="$browId"/>
					<xsl:with-param name="curr_blk" select="$curr_blk"/>
					<xsl:with-param name="align" select="$summaryAlign"/>
				</xsl:call-template>
			</TR>
			<TR CLASS="TBODYTRMultipleAdvise">
				<xsl:call-template name="Empty_TD">
					<xsl:with-param name="count" select="$breakColumnPos"/>
				</xsl:call-template>
				<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$summaryAlign}">
					<xsl:call-template name="Print_Summary_Break_Line">
						<xsl:with-param name="count" select="$gSummLineBreakSize"/>
					</xsl:call-template>
				</TD>
			</TR>
		</xsl:for-each>
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
		<xsl:param name="breakRowId"/>
		<xsl:param name ="browId"/>
		<xsl:param name="curr_blk"/>
		<xsl:param name="align"/> 
		<xsl:variable name="calcValue" select="$curr_blk/SMRYRSLT/BREAKS[@BID=$breakRowId]/BROW[@ID=$browId]/SUM"/>
		<TD CLASS="TBODYTDMultipleAdvise" ALIGN="{$align}">
		<xsl:value-of select="$calcValue"/>
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
			<TD COLSPAN="{$countCols}">
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
					<FONT SIZE="3em"><B><!-- 120_SCRNVB_16295416 added -->
					<xsl:value-of select="./LABEL"></xsl:value-of>
				</B></FONT> <!-- 120_SCRNVB_16295416 added -->
				</TD>
            </xsl:for-each>
        </TR>
	</xsl:template>

    <!-- Label Handlers -->
    <xsl:template match="FIELD/TYPE[text()='LABEL']">
        <SPAN class="spanAdviseLabel">
            <xsl:call-template name="Pos_Handler">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            <xsl:call-template name="dispLabelField"/>
        </SPAN>
    </xsl:template>
    
    <!-- Line Break Handlers -->
    <xsl:template match="FIELD/TYPE[text()='LINE']">
		<SPAN CLASS="spanAdviseLabel">
			<xsl:call-template name="Pos_Handler">
				<xsl:with-param name="curr_fld" select=".."/>
			</xsl:call-template>
			<xsl:call-template name="dispLineBreak"/>
		</SPAN>
    </xsl:template>
    
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
        <xsl:if test="count($curr_fld/ABS_POS) &gt; 0">
            <xsl:attribute name="STYLE">
                <xsl:variable name="left" select="substring-before($curr_fld/ABS_POS, ',')"/>
                <xsl:variable name="top" select="substring-after($curr_fld/ABS_POS, ',')"/>
                <xsl:text>left:</xsl:text>
                <xsl:value-of select="$left"/>
                <xsl:text>px;top:</xsl:text>
                <xsl:value-of select="$top"/>
                <xsl:text>px;</xsl:text>
                <xsl:text>position:absolute;</xsl:text>
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
				<xsl:text> </xsl:text>
			</TD>
			<xsl:call-template name="Empty_TD">
				<xsl:with-param name="count" select="$count -1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>    
</xsl:stylesheet>
    
