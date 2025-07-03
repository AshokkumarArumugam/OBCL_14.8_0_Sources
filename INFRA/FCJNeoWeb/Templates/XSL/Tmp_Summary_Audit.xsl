<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template name="Audit_Legends">
	<!-- For Rec Status and Auth Status FldSets kals on June 4 -->
	<xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
	<xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
	<xsl:if test="$AuditBlk_exist != ''">
			<xsl:if test="$AuditBlk_Type = 'M'">    
        <dl class="DLlengend">
          <dt><xsl:value-of select="$authStat_SummaryAudit"/></dt>
          <dd>
            <xsl:value-of select="$lableA_SummaryAudit"/>
            -
            <xsl:value-of select="$authorized_SummaryAudit"/>
          </dd>
          <dd>
            <xsl:value-of select="$lableU_SummaryAudit"/>
            -
            <xsl:value-of select="$unauthorized_SummaryAudit"/>
          </dd>
        </dl>
			</xsl:if>
			<xsl:if test="$AuditBlk_Type = 'M'">        
        <dl class="DLlengend">
				<dt><xsl:value-of select="$recordStat_SummaryAudit"/></dt>
				<dd>
					<xsl:value-of select="$lableC_SummaryAudit"/>
					-
					<xsl:value-of select="$closed_SummaryAudit"/>
				</dd>
				<dd>
					<xsl:value-of select="$lableO_SummaryAudit"/>
					-
					<xsl:value-of select="$open_SummaryAudit"/>
				</dd>
        </dl>
			</xsl:if>
	</xsl:if>
</xsl:template>
 <xsl:template name="Custom_Legends">
    <xsl:if test="count(//LEGENDS) > 0">
      <xsl:for-each select="//LEGENDS">
        <dl class="DLlengend">
          <dt><xsl:value-of select="LABEL"/></dt>
          <xsl:for-each select="OPTION">
            <dd><xsl:value-of select="@VALUE"/> - <xsl:value-of select="(.)"/></dd>						
          </xsl:for-each>
        </dl>        
      </xsl:for-each>
    </xsl:if>
  </xsl:template>
  <xsl:template name="AuditFields">
    <xsl:param name="auditfield" select="."/>
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
    <xsl:if test="$AuditBlk_exist != ''">
        <xsl:if test="$AuditBlk_Type = 'M'">
            <xsl:if test="$auditfield='authstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="AUTH_STAT">
                  <xsl:value-of select="$authStat_SummaryAudit"/>
                  <!--<img src="Images/star_disabled.gif" ALT=""/>-->
                  <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
                </LABEL>
                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1"
                        DBT="{DBT}" DBC="AUTH_STAT" NAME="AUTH_STAT" id="AUTH_STAT">
                  <OPTION VALUE="" SELECTED="true"></OPTION>
                  <OPTION VALUE="A">
                    <xsl:value-of select="$authStat_Audit"/>
                  </OPTION>
                  <OPTION VALUE="U">
                    <xsl:value-of select="$unauthorized_SummaryAudit"/>
                  </OPTION>
                </SELECT>
              </div>
            </xsl:if>
        </xsl:if>
        <!-- For Maintenance add the Record Status!-->
        <xsl:if test="$AuditBlk_Type = 'M'">
            <xsl:if test="$auditfield='recordstat'">
              <div class="DIVText">
                <LABEL class="LABELNormal" for="RECORD_STAT">
                  <xsl:value-of select="$recordStat_SummaryAudit"/>
                  <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
                  <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
                </LABEL>
                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1"
                        DBT="{DBT}" DBC="RECORD_STAT" NAME="RECORD_STAT" id="RECORD_STAT">
                  <OPTION VALUE="" SELECTED="true"></OPTION>
                  <OPTION VALUE="O">
                    <xsl:value-of select="$open_SummaryAudit"/>
                  </OPTION>
                  <OPTION VALUE="C">
                    <xsl:value-of select="$closed_SummaryAudit"/>
                  </OPTION>
                </SELECT>
              </div>
          </xsl:if>
        </xsl:if>
    </xsl:if>
  </xsl:template>
  <xsl:template name="disp_Exit_Btn">
    <TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="99%"
           border="0" role="presentation" >
        <TBODY>
      <TR>
        <TD vAlign="top">
          <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </TD>        
        <TD class="TDAuditButton" vAlign="top" width="90%">
          <INPUT class="BUTTONExit" id="BTN_EXIT"
                 onblur="this.className='BUTTONExit'"
                 onmouseover="this.className='BUTTONExitHover'"
                 onfocus="this.className='BUTTONExitHover'" onclick="fnExit(event)"
                 onmouseout="this.className='BUTTONExit'" type="button"
                 value="{$exit_SummaryAudit}" onkeydown="return fnHandleSumBtn(event)"/>
          <IMG id="BTN_EXIT_IMG'" style="display:none" src=""
               name="BTN_EXIT_IMG" ALT="{$exit_SummaryAudit}"/><!--Data Uri change -->
        </TD>
      </TR>
      </TBODY>
    </TABLE>
    
  </xsl:template>
  <!-- Kals June 15 Audit Results -->
  <xsl:template name="AuditResult">
    <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$AuditBlk_exist != ''">
      <xsl:if test="$AuditBlk_Type = 'M'">    
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs(event)' order = "asc">
                <xsl:value-of select="$authStat_SummaryAudit"/>
            </a>
        </TH>
      </xsl:if>
      <xsl:if test="$AuditBlk_Type = 'M'">        
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
            <a href="#" onclick='fnSortRecs(event)' order = "asc">
                <xsl:value-of select="$recordStat_SummaryAudit"/>
            </a>
        </TH>
      </xsl:if>      
    </xsl:if>
  </xsl:template>
  <xsl:template name="AuditResultFCIS">
    <xsl:variable name="lAuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
    <xsl:variable name="lAuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>
    <xsl:if test="$lAuditBlk_exist != ''">
      <xsl:if test="$lAuditBlk_Type = 'M'">    
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
			<a href="#" onclick='fnSortRecs()' order = "asc">
          <xsl:value-of select="$makerId_SummaryAudit"/>
			</a>
        </TH>
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
			<a href="#" onclick='fnSortRecs()' order = "asc">
          <xsl:value-of select="$makerDate_SummaryAudit"/>
			</a>
        </TH>
        <TH onclick = 'fnSortRecs(event)' scope="col" order = "asc"><!--SNORAS#001517 -->
			<a href="#" onclick='fnSortRecs()' order = "asc">
          <xsl:value-of select="$checkerId_SummaryAudit"/>
			</a>
        </TH>
        <TH ondblClick = 'fnSortRecs(event)' scope="col" order = "asc">
			<a href="#" onclick='fnSortRecs()' order = "asc">
          <xsl:value-of select="$checkerDate_SummaryAudit"/>
			</a>
        </TH>
      </xsl:if>      
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
