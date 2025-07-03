<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xml:space="default">
	<xsl:output method="xml" indent="yes"/>
	<xsl:template match="/FORM">
		<xsl:variable name="screen" select="SCREEN/@NAME"/>
		<ADVICE ID="1" Type="SINGLE">			
			<MODULE_TYPE><xsl:value-of select="SCREEN/@MODULE"/></MODULE_TYPE>
			<ADV_NAME><xsl:value-of select="SCREEN/@MODULE"/></ADV_NAME>
			<ADV_DESC><xsl:value-of select="SCREEN/@TITLE"/></ADV_DESC>
			<TXT_ADVHGT><xsl:value-of select="ADVICE_HEIGHT"/></TXT_ADVHGT>
			<TXT_ADVWDT><xsl:value-of select="ADVICE_WIDTH"/></TXT_ADVWDT>
			<TXT_LINES><xsl:value-of select="LINES_PERPAGE"/></TXT_LINES>
			<SEL_POSITION><xsl:value-of select="SCREEN/@POSITION"/></SEL_POSITION>
			
			<xsl:call-template name="Blocks"/>
			<xsl:call-template name="AdvPosSec"/>			
		</ADVICE>
	</xsl:template>

	<xsl:template name="Blocks">
		<!--for single entry blocks-->
		<xsl:for-each select="//BLOCK[@TYPE = 'Single Entry']/FIELD/DBT[not(.=preceding::DBT)]">
			<xsl:variable name="dbt" select="."/>
			<BLOCKS ID="{position()}" Type="MULTIPLE">
				<TXT_SLNO><xsl:value-of select="position()"/></TXT_SLNO>
				<TXT_BLOCKID><xsl:value-of select="$dbt"/></TXT_BLOCKID>
				<SEL_ENTRYTYPE>SE</SEL_ENTRYTYPE>
				<SEL_DISPLEVEL_ME_BLK/>
				<xsl:apply-templates select="//BLOCK[@TYPE='Single Entry']/FIELD[DBT = $dbt]" mode="Fields"/>
				<xsl:apply-templates select="//BLOCK[@TYPE='Single Entry']/FIELD[DBT = $dbt]" mode="Labels">
                                   <xsl:with-param name="bType">
                                          <xsl:text>Single Entry</xsl:text>
                                   </xsl:with-param>
                            </xsl:apply-templates>
			</BLOCKS>
		</xsl:for-each>
		
		<!--for multiple entry-->		
		<xsl:for-each select="//BLOCK[@TYPE = 'Multiple Entry']">
			<xsl:variable name="dbt" select="DBT"/>
			<xsl:variable name="dispLvl" select="@DISPLEVEL"/>
			<xsl:variable name="bCount" select="count(//BLOCK[@TYPE = 'Single Entry']/FIELD/DBT[not(.=preceding::DBT)])"/>
			
			<BLOCKS ID="{position()+$bCount}" Type="MULTIPLE">
				<TXT_SLNO><xsl:value-of select="position()+$bCount"/></TXT_SLNO>
				<TXT_BLOCKID><xsl:value-of select="$dbt"/></TXT_BLOCKID>
				<SEL_ENTRYTYPE>ME</SEL_ENTRYTYPE>
				<SEL_DISPLEVEL_ME_BLK><xsl:value-of select="$dispLvl"/></SEL_DISPLEVEL_ME_BLK>
				<xsl:apply-templates select="FIELD" mode="Fields"/>
				<xsl:apply-templates select="FIELD" mode="Labels">
					<xsl:with-param name="bType" select="@TYPE"/>
				</xsl:apply-templates>
			</BLOCKS>
			
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="FIELD" mode="Fields">		
		<FIELDS ID="{position()}" Type="MULTIPLE">
			<TXT_BLKFLDPOS_SLNO><xsl:value-of select="position()"/></TXT_BLKFLDPOS_SLNO>
			<TXT_FLDNAME><xsl:value-of select="NAME"/></TXT_FLDNAME>
			<TXT_DEFVALUE/>
			<SEL_DISPLEVEL><xsl:value-of select="../@DISPLEVEL"/></SEL_DISPLEVEL>
			<TXT_FLDTYPE><xsl:value-of select="TYPE"/></TXT_FLDTYPE>
			<SEL_FLDTYPE><xsl:value-of select="TYPE"/></SEL_FLDTYPE>
		</FIELDS>
	</xsl:template>

	<xsl:template match="FIELD" mode="Labels">
		<xsl:param name="bType" select="."/>
		<xsl:variable name="fName" select="NAME"/>		
		<xsl:variable name="lblId" select="concat('LBL_',$fName)"/>		
              <!--<xsl:variable name="fLableNode" select="//BLOCK[@TYPE = $bType]/FIELD[NAME = $lblId and TYPE = 'LABEL']"/>-->
              <xsl:variable name="lblNodeCount" select="count(../FIELD[NAME = $lblId])"/>
              <xsl:variable name="lblVal" select="../FIELD[NAME = $lblId]/LABEL"/>
              
		<FIELDS_LABEL ID="{position()}" Type="MULTIPLE">     
                     <ugi><xsl:value-of select="$bType"/></ugi>
			<TXT_BLKFLDLBL_SLNO><xsl:value-of select="position()"/></TXT_BLKFLDLBL_SLNO>
			<TXT_LBLFLDNAME><xsl:value-of select="$fName"/></TXT_LBLFLDNAME>
			<CHK_LBL>                            
				<xsl:if test="$bType = 'Single Entry'">                                                                     
                                   <xsl:if test="$lblNodeCount = 0">
                                          <xsl:text>N</xsl:text>
                                   </xsl:if>
                                   <xsl:if test="$lblNodeCount &gt; 0">                              
                                          <xsl:text>Y</xsl:text>
                                   </xsl:if>
				</xsl:if>
				<xsl:if test="$bType = 'Multiple Entry'">
					<xsl:text>Y</xsl:text>
				</xsl:if>
			</CHK_LBL>
			<TXT_LBLFLDVALUE>
				<xsl:if test="$bType = 'Single Entry'">                                   
                                   <xsl:if test="$lblNodeCount &gt; 0">
                                          <xsl:value-of select="$lblVal"/>
                                   </xsl:if>
				</xsl:if>
				<xsl:if test="$bType = 'Multiple Entry'">
					<xsl:value-of select="LABEL"/>
				</xsl:if>
			</TXT_LBLFLDVALUE>
			<SEL_LBLDISPLEVEL><xsl:value-of select="../@DISPLEVEL"/></SEL_LBLDISPLEVEL>
			<TXT_FLDLBL/>
		</FIELDS_LABEL>
	</xsl:template>
	
	<xsl:template name="AdvPosSec">
		<!--Advice pos section for AH-->
		<!--<xsl:if test="count(//BLOCK[@DISPLEVEL = 'AH']) &gt; 0">-->
			<ADVICE_SECTION ID="1" Type="MULTIPLE">
				<TXT_FLDPOS_SLNO>1</TXT_FLDPOS_SLNO>
				<TXT_DISPID>AH</TXT_DISPID>
				<TXT_DISPVALUE>Advice Header</TXT_DISPVALUE>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AH' and @TYPE = 'Single Entry']/FIELD" mode="AdviceSectionFields"/>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AH' and @TYPE = 'Multiple Entry']" mode="AdviceSectionBlocks">
					<xsl:with-param name="fCount" select="count(//BLOCK[@DISPLEVEL = 'AH' and @TYPE = 'Single Entry']/FIELD)"/>
				</xsl:apply-templates>
			</ADVICE_SECTION>
		<!--</xsl:if>-->
		
		<!--Advice pos section for PH-->
		<!--<xsl:if test="count(//BLOCK[@DISPLEVEL = 'PH']) &gt; 0">-->
			<ADVICE_SECTION ID="2" Type="MULTIPLE">
				<TXT_FLDPOS_SLNO>2</TXT_FLDPOS_SLNO>
				<TXT_DISPID>PH</TXT_DISPID>
				<TXT_DISPVALUE>Page Header</TXT_DISPVALUE>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'PH' and @TYPE = 'Single Entry']/FIELD" mode="AdviceSectionFields"/>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'PH' and @TYPE = 'Multiple Entry']" mode="AdviceSectionBlocks">
					<xsl:with-param name="fCount" select="count(//BLOCK[@DISPLEVEL = 'PH' and @TYPE = 'Single Entry']/FIELD)"/>
				</xsl:apply-templates>
			</ADVICE_SECTION>
		<!--</xsl:if>-->

		<!--Advice pos section for AB-->
		<!--<xsl:if test="count(//BLOCK[@DISPLEVEL = 'AB']) &gt; 0">-->
			<ADVICE_SECTION ID="3" Type="MULTIPLE">
				<TXT_FLDPOS_SLNO>3</TXT_FLDPOS_SLNO>
				<TXT_DISPID>AB</TXT_DISPID>
				<TXT_DISPVALUE>Advice Body</TXT_DISPVALUE>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AB' and @TYPE = 'Single Entry']/FIELD" mode="AdviceSectionFields"/>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AB' and @TYPE = 'Multiple Entry']" mode="AdviceSectionBlocks">
					<xsl:with-param name="fCount" select="count(//BLOCK[@DISPLEVEL = 'AB' and @TYPE = 'Single Entry']/FIELD)"/>
				</xsl:apply-templates>
			</ADVICE_SECTION>
		<!--</xsl:if>-->

		<!--Advice pos section for PF-->
		<!--<xsl:if test="count(//BLOCK[@DISPLEVEL = 'PF']) &gt; 0">-->
			<ADVICE_SECTION ID="4" Type="MULTIPLE">
				<TXT_FLDPOS_SLNO>4</TXT_FLDPOS_SLNO>
				<TXT_DISPID>PF</TXT_DISPID>
				<TXT_DISPVALUE>Page Footer</TXT_DISPVALUE>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'PF' and @TYPE = 'Single Entry']/FIELD" mode="AdviceSectionFields"/>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'PF' and @TYPE = 'Multiple Entry']" mode="AdviceSectionBlocks">
					<xsl:with-param name="fCount" select="count(//BLOCK[@DISPLEVEL = 'PF' and @TYPE = 'Single Entry']/FIELD)"/>
				</xsl:apply-templates>
			</ADVICE_SECTION>
		<!--</xsl:if>-->

		<!--Advice pos section for AF-->
		<!--<xsl:if test="count(//BLOCK[@DISPLEVEL = 'AF']) &gt; 0">-->
			<ADVICE_SECTION ID="5" Type="MULTIPLE">
				<TXT_FLDPOS_SLNO>5</TXT_FLDPOS_SLNO>
				<TXT_DISPID>AF</TXT_DISPID>
				<TXT_DISPVALUE>Advice Footer</TXT_DISPVALUE>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AF' and @TYPE = 'Single Entry']/FIELD" mode="AdviceSectionFields"/>
				<xsl:apply-templates select="//BLOCK[@DISPLEVEL = 'AF' and @TYPE = 'Multiple Entry']" mode="AdviceSectionBlocks">
					<xsl:with-param name="fCount" select="count(//BLOCK[@DISPLEVEL = 'AF' and @TYPE = 'Single Entry']/FIELD)"/>
				</xsl:apply-templates>
			</ADVICE_SECTION>
		<!--</xsl:if>-->
       
	</xsl:template>

	<xsl:template match="FIELD" mode="AdviceSectionFields">
		<FIELDS_POS ID="{position()}" Type="MULTIPLE">
			<TXT_FLD_POS_SLNO><xsl:value-of select="position()"/></TXT_FLD_POS_SLNO>
			<TXT_FLDPOS_FLDNAME><xsl:value-of select="NAME"/></TXT_FLDPOS_FLDNAME>
			<TXT_TYPE><xsl:value-of select="TYPE"/></TXT_TYPE>
			<TXT_ROW><xsl:value-of select="@ROW"/></TXT_ROW>
			<TXT_COL><xsl:value-of select="@COL"/></TXT_COL>
			<TXT_ABS_POS><xsl:value-of select="ABS_POS"/></TXT_ABS_POS>
			<TXT_DBT><xsl:value-of select="DBT"/></TXT_DBT>
		</FIELDS_POS>
	</xsl:template>

	<xsl:template match="BLOCK" mode="AdviceSectionBlocks">
		<xsl:param name="fCount" select="."/>
		<xsl:variable name="count" select="position()+$fCount"/>		
		<xsl:variable name="pos" select="ROW_COL"/>
		<FIELDS_POS ID="{$count}" Type="MULTIPLE">
			<TXT_FLD_POS_SLNO><xsl:value-of select="$count"/></TXT_FLD_POS_SLNO>
			<TXT_FLDPOS_FLDNAME><xsl:value-of select="DBT"/></TXT_FLDPOS_FLDNAME>
			<TXT_TYPE>Block</TXT_TYPE>
			<TXT_ROW><xsl:value-of select="substring-before($pos,',')"/></TXT_ROW>
			<TXT_COL><xsl:value-of select="substring-after($pos,',')"/></TXT_COL>
			<TXT_ABS_POS><xsl:value-of select="ABS_POS"/></TXT_ABS_POS>
			<TXT_DBT><xsl:value-of select="DBT"/></TXT_DBT>
			<xsl:apply-templates select="FIELD" mode="ME_Fields"/>
		</FIELDS_POS>
	</xsl:template>

	<xsl:template match="FIELD" mode="ME_Fields">
		<ORDER_ME_FIELDS ID="{position()}" Type="MULTIPLE">
			<TXT_FLD_POS_SLNO><xsl:value-of select="position()"/></TXT_FLD_POS_SLNO>
			<TXT_FIELD_NAME><xsl:value-of select="NAME"/></TXT_FIELD_NAME>
			<TXT_FIELD_POS><xsl:value-of select="COLIDX"/></TXT_FIELD_POS>
		</ORDER_ME_FIELDS>
	</xsl:template>
</xsl:stylesheet>
