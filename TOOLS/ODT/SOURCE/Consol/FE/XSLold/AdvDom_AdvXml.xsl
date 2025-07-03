<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xml:space="default">
	<xsl:output method="xml" indent="yes"/>
	<xsl:template match="/ADVICE">
		<FORM TITLE="ADVICE">
			<SCREEN NAME="CVS_MAIN" TITLE="{ADV_DESC}" POSITION="{SEL_POSITION}" HEIGHT="{TXT_ADVHGT}" WIDTH="{TXT_ADVWDT}" MODULE="{ADV_NAME}"/>
			<LINES_PERPAGE><xsl:value-of select="TXT_LINES"/></LINES_PERPAGE>
			<ADVICE_HEIGHT><xsl:value-of select="TXT_ADVHGT"/></ADVICE_HEIGHT>
			<ADVICE_WIDTH><xsl:value-of select="TXT_ADVWDT"/></ADVICE_WIDTH>
    
			<IS_ABSOLUTE>
				<xsl:if test="SEL_POSITION = 'absolute'">
					<xsl:text>Y</xsl:text>
				</xsl:if>
				<xsl:if test="SEL_POSITION = 'column'">
					<xsl:text>N</xsl:text>
				</xsl:if>
			</IS_ABSOLUTE>

			<!--calling template to create block with dispay level Advice header -->
			<xsl:if test="count(BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AH']) &gt; 0">
				<BLOCK TYPE="Single Entry" VIEW="Single Entry" DISPLEVEL="AH">
					<START_ROW></START_ROW>
					<xsl:apply-templates select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AH']">
						<xsl:with-param name="level">
							<xsl:text>AH</xsl:text>
						</xsl:with-param>
					</xsl:apply-templates>					
					<END_ROW></END_ROW>
				</BLOCK>				
			</xsl:if>

			<!--calling template to create block with dispay level Page header -->
			<xsl:if test="count(BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'PH']) &gt; 0">
				<BLOCK TYPE="Single Entry" VIEW="Single Entry" DISPLEVEL="PH">
					<START_ROW></START_ROW>
					<xsl:apply-templates select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'PH']">
						<xsl:with-param name="level">
							<xsl:text>PH</xsl:text>
						</xsl:with-param>
					</xsl:apply-templates>					
					<END_ROW></END_ROW>
				</BLOCK>				
			</xsl:if>
			
			<!--calling template to create Multiple Entry blocks with dispay level Advice Body -->						
			<xsl:apply-templates select="BLOCKS[SEL_ENTRYTYPE = 'ME' and SEL_DISPLEVEL_ME_BLK = 'AB']"/>

			<!--calling template to create Single Entry block with dispay level Advice Body -->
			<xsl:if test="count(BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AB']) &gt; 0">
				<BLOCK TYPE="Single Entry" VIEW="Single Entry" DISPLEVEL="AB">
					<START_ROW></START_ROW>
					<xsl:apply-templates select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AB']">
						<xsl:with-param name="level">
							<xsl:text>AB</xsl:text>
						</xsl:with-param>
					</xsl:apply-templates>					
					<END_ROW></END_ROW>
				</BLOCK>				
			</xsl:if>
			
			<!--calling template to create block with dispay level Page Footer -->
			<xsl:if test="count(BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'PF']) &gt; 0">
				<BLOCK TYPE="Single Entry" VIEW="Single Entry" DISPLEVEL="PF">
					<START_ROW></START_ROW>
					<xsl:apply-templates select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'PF']">
						<xsl:with-param name="level">
							<xsl:text>PF</xsl:text>
						</xsl:with-param>
					</xsl:apply-templates>					
					<END_ROW></END_ROW>
				</BLOCK>				
			</xsl:if>
			
			<!--calling template to create block with dispay level Advice Footer -->
			<xsl:if test="count(BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AF']) &gt; 0">
				<BLOCK TYPE="Single Entry" VIEW="Single Entry" DISPLEVEL="AF">
					<START_ROW></START_ROW>
					<xsl:apply-templates select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS[SEL_DISPLEVEL = 'AF']">
						<xsl:with-param name="level">
							<xsl:text>AF</xsl:text>
						</xsl:with-param>
					</xsl:apply-templates>					
					<END_ROW></END_ROW>
				</BLOCK>				
			</xsl:if>
		
		</FORM>
	</xsl:template>
		
	<xsl:template match="FIELDS">
		<xsl:param name="level" select="."/>	
		
		<xsl:variable name="fName" select="TXT_FLDNAME"/>
		<xsl:variable name="fType" select="SEL_FLDTYPE"/>
		<xsl:variable name="block" select="../TXT_BLOCKID"/>

		<!--
		<xsl:variable name="fPosNode" select="//ADVICE_SECTION[TXT_DISPID = $level]/FIELDS_POS[TXT_FLDPOS_FLDNAME = $fName and TXT_DBT = $block and TXT_TYPE = $fType]"/>
		-->
		<xsl:if test="$fType != 'LINE'">
			<xsl:variable name="lblNode" select="//BLOCKS[SEL_ENTRYTYPE = 'SE']/FIELDS_LABEL[TXT_LBLFLDNAME = $fName]"/>
			<xsl:if test="$lblNode != '' and $lblNode/CHK_LBL = 'Y' and $lblNode/SEL_LBLDISPLEVEL = $level">
				<xsl:variable name="lName" select="concat('LBL_',$fName)"/>
				<xsl:variable name="lPosNode" select="//ADVICE_SECTION[TXT_DISPID = $level]/FIELDS_POS[TXT_FLDPOS_FLDNAME = $lName and TXT_DBT = $block and TXT_TYPE = 'Label']"/>
				<FIELD TABPAGE="All" ROW="" COL="">
					<xsl:if test="$lPosNode != ''">
						<xsl:attribute name="ROW">
							<xsl:value-of select="$lPosNode/TXT_ROW"/>
						</xsl:attribute>
						<xsl:attribute name="COL">
							<xsl:value-of select="$lPosNode/TXT_COL"/>
						</xsl:attribute>
					</xsl:if>
					<ABS_POS><xsl:value-of select="$lPosNode/TXT_ABS_POS"/></ABS_POS>
					<NAME><xsl:value-of select="$lName"/></NAME>
					<ID></ID>
					<TYPE>LABEL</TYPE>
					<LABEL><xsl:value-of select="$lblNode/TXT_LBLFLDVALUE"/></LABEL>
					<ALIGN>Left</ALIGN>
					<WIDTH>10</WIDTH>
				</FIELD>
			</xsl:if>
		</xsl:if>
		
		<FIELD TABPAGE="All" ROW="" COL="">
      <!--comment this one after changing field types from LABEL to Field..-->
			<xsl:if test="$fType = 'LABEL'">        
				<xsl:variable name="fPosNode" select="//ADVICE_SECTION[TXT_DISPID = $level]/FIELDS_POS[TXT_FLDPOS_FLDNAME = $fName and TXT_DBT = $block and TXT_TYPE = 'Field']"/>
				<xsl:if test="$fPosNode != ''">          
					<xsl:attribute name="ROW">
						<xsl:value-of select="$fPosNode/TXT_ROW"/>
					</xsl:attribute>
					<xsl:attribute name="COL">
						<xsl:value-of select="$fPosNode/TXT_COL"/>
					</xsl:attribute>
          <ABS_POS><xsl:value-of select="$fPosNode/TXT_ABS_POS"/></ABS_POS>
				</xsl:if>
			</xsl:if>
			<xsl:if test="$fType = 'LINE'">
				<xsl:variable name="fPosNode" select="//ADVICE_SECTION[TXT_DISPID = $level]/FIELDS_POS[TXT_FLDPOS_FLDNAME = $fName and TXT_DBT = $block and TXT_TYPE = 'Line']"/>
				<xsl:if test="$fPosNode != ''">
					<xsl:attribute name="ROW">
						<xsl:value-of select="$fPosNode/TXT_ROW"/>
					</xsl:attribute>
					<xsl:attribute name="COL">
						<xsl:value-of select="$fPosNode/TXT_COL"/>
					</xsl:attribute>
          <ABS_POS><xsl:value-of select="$fPosNode/TXT_ABS_POS"/></ABS_POS>
				</xsl:if>
			</xsl:if>
			<!--
			<xsl:if test="$fPosNode != ''">
				<xsl:attribute name="ROW">
					<xsl:value-of select="$fPosNode/TXT_ROW"/>
				</xsl:attribute>
				<xsl:attribute name="COL">
					<xsl:value-of select="$fPosNode/TXT_COL"/>
				</xsl:attribute>
        <ABS_POS><xsl:value-of select="$fPosNode/TXT_ABS_POS"/></ABS_POS>
			</xsl:if>
			-->			
			<NAME><xsl:value-of select="TXT_FLDNAME"/></NAME>
			<ID></ID>
			<TYPE><xsl:value-of select="SEL_FLDTYPE"/></TYPE>
			<LABEL></LABEL>
			<DBT><xsl:value-of select="$block"/></DBT>
			<DBC><xsl:value-of select="TXT_FLDNAME"/></DBC>
			<ALIGN>Left</ALIGN>
			<WIDTH>10</WIDTH>				
		</FIELD>		
	</xsl:template>
	
	<xsl:template match="BLOCKS">
		<xsl:if test="count(FIELDS) &gt; 0">
			<xsl:variable name="block" select="TXT_BLOCKID"/>
			<xsl:variable name="bPosNode" select="//ADVICE_SECTION[TXT_DISPID = 'AB']/FIELDS_POS[TXT_FLDPOS_FLDNAME = $block and TXT_TYPE = 'Block']"/>
			<BLOCK TYPE="Multiple Entry" VIEW="Multiple Entry" DISPLEVEL="AB">
				<DBT><xsl:value-of select="$block"/></DBT>
				<ROW_COL>
					<xsl:value-of select="concat($bPosNode/TXT_ROW,',',$bPosNode/TXT_COL)"/>
				</ROW_COL>
				<ABS_POS><xsl:value-of select="$bPosNode/TXT_ABS_POS"/></ABS_POS>
				<xsl:apply-templates select="FIELDS" mode="ME_Fields"/>									
			</BLOCK>
		</xsl:if>
	</xsl:template>

	<xsl:template match="FIELDS" mode="ME_Fields">		
		<xsl:variable name="fName" select="TXT_FLDNAME"/>
		<xsl:variable name="blkId" select="../TXT_BLOCKID"/>
		<xsl:variable name="fLabel" select="../FIELDS_LABEL[TXT_LBLFLDNAME = $fName]"/>	
		<xsl:variable name="fOrder" select="//ADVICE_SECTION[TXT_DISPID = 'AB']/FIELDS_POS[TXT_FLDPOS_FLDNAME = $blkId and TXT_TYPE = 'Block']/ORDER_ME_FIELDS[TXT_FIELD_NAME = $fName]"/>
		<FIELD>	
			<ABS_POS></ABS_POS>
			<NAME><xsl:value-of select="$fName"/></NAME>
			<ID></ID>
			<TYPE>LABEL</TYPE>
			<LABEL><xsl:value-of select="$fLabel/TXT_LBLFLDVALUE"/></LABEL>
			<ALIGN/>
			<WIDTH/>
			<COLIDX>
				<xsl:if test="$fOrder != ''">
					<xsl:value-of select="$fOrder/TXT_FIELD_POS"/>
				</xsl:if>
				<xsl:if test="$fOrder = ''">
					<xsl:value-of select="position()"/>
				</xsl:if>
			</COLIDX>
		</FIELD>
	</xsl:template>
</xsl:stylesheet>