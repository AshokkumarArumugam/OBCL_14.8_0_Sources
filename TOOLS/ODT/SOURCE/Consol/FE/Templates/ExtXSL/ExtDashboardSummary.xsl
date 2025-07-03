<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:variable name="Brn_Neo" select="''"/>
    <xsl:output method="html"/>
    <xsl:variable name="gPosition" select="'template'"/>
    <xsl:variable name="cQuery" select="'Q'"/>
    <xsl:variable name="cResult" select="'R'"/>
    <xsl:variable name="cAdvanced" select="'A'"/>
    <xsl:variable name="cAll" select="'All'"/>
    <xsl:param name="funcId"/>
    <xsl:param name="tablename"/>
    <xsl:param name="fetchSize"/>
    <xsl:param name="imgPath"/>
    <xsl:variable name="imgPath_XSL">
        <xsl:choose>
            <xsl:when test="$imgPath != ''">
                <xsl:value-of select="$imgPath"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="'Images'"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:param name="functionId"/>
    <xsl:param name="uiXML"/>
    <xsl:variable name="uixml">
        <xsl:if test="$uiXML != ''">
            <xsl:value-of select="$uiXML"/>
        </xsl:if>
        <xsl:if test="$uiXML = ''">
            <xsl:value-of select="$functionId"/>
        </xsl:if>
    </xsl:variable>
    <xsl:param name="XslLabels"/>
    <xsl:param name="applicationName"/>
    
    <xsl:param name="scrTitle"/>
    <!-- Main template -->
    <xsl:template match="/">
        <xsl:apply-templates select="FORM/SUMMARY"/>
    </xsl:template>
	 
    <xsl:template match="SUMMARY">
        <xsl:apply-templates select="SUMBLOCK[@TABPAGE='RESULT']"/>
    </xsl:template>
    
    <xsl:template match="SUMBLOCK[@TABPAGE='RESULT']">
        <xsl:call-template name="MEHandler"/> 
        <xsl:call-template name="generateScript"/>
    </xsl:template>
    
    <xsl:template name="MEHandler">
        <xsl:variable name="scrType" select="../@TYPE"/>
        <div name="dataContainer" id="dataContainer" style="width:790px;height:200px;overflow:scroll">
            <xsl:choose>
                <xsl:when test="count(@HIDDEN) &gt; 0 and @HIDDEN='Y'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'dispNone'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$scrType='L'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleBig'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$scrType='M'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMedium'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleSmall'" />
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            <div id = "multipleboxDiv" class="DIVmultiplebox">
                <h2 class="hh4dash" id="heading"><xsl:value-of select= "$scrTitle"/></h2>
                    <div id="btnDiv" style="float:right; padding-bottom: 3px">
                        <BUTTON id="btnprev" class="Abut" disabled="disabled" onclick="fnNavigate('PREVIOUS')">
                            <IMG alt="Previous" src="Images/widgetonePrevious.gif"></IMG>
                        </BUTTON>
                        <BUTTON  id="btnnext" class="Abut" disabled="disabled" onclick="fnNavigate('NEXT')">
                            <IMG alt="Next" src="Images/widgetoneNext.gif"></IMG>
                        </BUTTON>
                        <BUTTON class="Abut" id="btnrefreshd" onclick="fnRefreshData()">
                            <IMG alt="Refresh" src="Images/widgetoneRefresh.gif"></IMG>
                        </BUTTON>                       
                        <!--<A id="btnprev" class="Afoot" onfocus="if(!this.disabled) this.className='Afoothover'" onmouseover="if(!this.disabled) this.className='Afoothover'" onmouseout="this.className='Afoot'" onclick="fnNavigate('PREVIOUS')"  href="#"><xsl:value-of select="$previous"/></A><xsl:text>&#160;</xsl:text><xsl:text>&#160;</xsl:text>
                        <A id="btnnext" class="Afoot" onfocus="if(!this.disabled) this.className='Afoothover'" onmouseover="if(!this.disabled) this.className='Afoothover'" onmouseout="this.className='Afoot'" onclick="fnNavigate('NEXT')"  href="#"><xsl:value-of select="$next"/></A><xsl:text>&#160;</xsl:text><xsl:text>&#160;</xsl:text>
                        <A class="Afoot" onfocus="if(!this.disabled) this.className='Afoothover'" onmouseover="if(!this.disabled) this.className='Afoothover'" onmouseout="this.className='Afoot'" onclick="fnRefreshData()"  href="#"><xsl:value-of select="$refresh_SummaryAudit"/></A><xsl:text>&#160;</xsl:text><xsl:text>&#160;</xsl:text>-->
                        <A id="btnmore" class="Afoot" onfocus="if(!this.disabled) this.className='Afoothover'" onmouseover="if(!this.disabled) this.className='Afoothover'" onmouseout="if(!this.disabled) this.className='Afoot'" href="#" onclick="fnLaunchMainSumScr()">more...</A>
                    </div>
	            <div id="tableContainer" style="overflow: auto; clear: both">
	                <xsl:choose>
	                    <xsl:when test="$scrType='L'"> 
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleBigInner'" />
	                        </xsl:attribute>
	                    </xsl:when>
	                    <xsl:when test="$scrType='M'"> 
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleMediumInner'" />
	                        </xsl:attribute>
	                    </xsl:when>
	                    <xsl:otherwise>
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleSmallInner'" />
	                        </xsl:attribute>
	                    </xsl:otherwise>
	                </xsl:choose>
                        <table id="{$tablename}" style="width:780px;" border="0" cellspacing="0" cellpadding="0" role="presentation" class="TBLgrid" type="ME" onkeydown="return addRowShortcut(this, event);">
                            <xsl:attribute name="DBT">
                                <xsl:value-of select="//SUMMARY_DATA_BLK"/>
                            </xsl:attribute>
                            <xsl:call-template name="MultipleHandler_tmp" />							
                        </table>						
	            </div>
                    <xsl:if test="$functionId = 'ITDREMNB'  or $functionId = 'ITSREMNB' ">      
                        <div id="divBtnDismiss" class="DIVLinkBar" style="display:block">
                            <input class="BTNtext" type="button" onclick="fnDismissReminders()">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="$dismiss"/>
                                </xsl:attribute>
                            </input>
                        </div>
                    </xsl:if>
            </div>
        </div>        
    </xsl:template>
    
    <xsl:template name="MultipleHandler_tmp">
        <xsl:variable name="spanCnt">
            <xsl:value-of select="count(FIELD)"/>
        </xsl:variable>
        <colgroup span="{$spanCnt}"></colgroup>
        <thead>
            <tr>
                <xsl:for-each select="FIELD">
                    <xsl:variable name="dbt" select="../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="NAME"/>
                    <xsl:variable name="fldName" select="NAME"/>
                    <xsl:variable name="fldNode" select="."/>      
                    <xsl:if test="(count($fldNode/HIDDEN) &gt;= 1 and $fldNode/HIDDEN = -1) or ($fldNode/TYPE = 'HIDDEN')">
                        <th  class="TDnone"></th>
                    </xsl:if>
                    <xsl:if test="((count($fldNode/HIDDEN) = 1 and $fldNode/HIDDEN = 0) or count($fldNode/HIDDEN) = 0) and ($fldNode/TYPE != 'HIDDEN')">
                        <th TYPE="{$fldNode/TYPE}"  name="{$fldName}" class="THgrid"  scope="col"> 
                            <span class="SPNtext"><xsl:value-of select="$fldNode/LBL"/></span>
                        </th>
                    </xsl:if>
                </xsl:for-each>
            </tr>
        </thead>
        <tbody>
            <xsl:call-template name="TRLOOP">
                <xsl:with-param name="count" select="0"/>
            </xsl:call-template>
        </tbody>
   </xsl:template>
   
    <xsl:template name="TRLOOP">
        <xsl:param name="count" select="."/>
            <xsl:if test="$count &lt; $fetchSize">
                <xsl:variable name="modval" select="($count mod 2)" />    
                <tr class="TBLoneTR">
                    <xsl:if test="$modval = 1">
                        <xsl:attribute name="class">
                            <xsl:text>TBLoneTRalt</xsl:text>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:for-each select="FIELD">
                        <!--<xsl:if test="count(LINK) &gt; 0 and (LINK/TYPE = 'C')">
                            <xsl:attribute name="onclick">
                                <xsl:text>fnShowDashboardRow(this,event)</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="onmouseover">
                                <xsl:text>this.className = 'TBLoneTRhover'</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="onmouseout">
                                <xsl:if test="$modval = 0">
                                    <xsl:text>this.className = 'TBLoneTR'</xsl:text>
                                </xsl:if>
                                <xsl:if test="$modval = 1">
                                    <xsl:text>this.className = 'TBLoneTRalt'</xsl:text>
                                </xsl:if>
                            </xsl:attribute>
                        </xsl:if>-->
                        <xsl:apply-templates select="TYPE" mode="template"/>
                    </xsl:for-each>
                </tr>
                <xsl:call-template name="TRLOOP">
                    <xsl:with-param name="count" select="$count + 1">
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:if>
    </xsl:template>
   
   <xsl:template match="TYPE[text()='TEXT' or text()='LINK' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT' or text()='DATETIME' or text()='DISPMASK']" mode="template">
        
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispHiddenLabel_tmp"/>
                <xsl:choose>
                    <xsl:when test="count(../LINK) &gt; 0 and (../LINK/TYPE = 'S')">
                        <xsl:call-template name="dispLinkField_tmp" />
                    </xsl:when> 
                     <xsl:when test="count(../LINK) &gt; 0 and (../LINK/TYPE = 'C')">
                        <xsl:call-template name="dispLinkROWField_tmp" />
                    </xsl:when> 
                    <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC') and count(../LINK) = 0">
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="../TYPE"/>
                        </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
       
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">              
            <td class="TDnone">
                <label class="LBLinv" for=""></label>
                <INPUT TYPE="HIDDEN">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                </INPUT>
            </td>
        </xsl:if>
    
    </xsl:template>
   
    <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template">
        <td class="TDgrid" nowrap="nowrap">
            <xsl:call-template name="dispCheckboxField_tmp"/>
        </td>
    </xsl:template>
   
   <xsl:template name="dispNormalLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">        
            <xsl:if test="../LBL != ''">
                <label class="LBLstd">
                    <xsl:attribute name="FOR">
                        <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:attribute>
                    <xsl:value-of select="../LBL"/>
                </label>
            </xsl:if>
            <xsl:if test="../LBL = ''">
                <label class="LBLstd LBLinv2">
                    <xsl:attribute name="FOR">
                        <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:attribute>
                    <xsl:value-of select="../../LBL"/>
                </label>                
            </xsl:if>
        </xsl:if>
        
      <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <label class="LBLstd star">
                <xsl:attribute name="FOR">
                    <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:attribute>
                <xsl:value-of select="../LBL"/>
            </label>
        </xsl:if> 
    </xsl:template> 
    
   <xsl:template name="dispHiddenLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
        <label class="LBLinv">
            <xsl:attribute name="FOR">
                <xsl:value-of select="../NAME"></xsl:value-of>
            </xsl:attribute>
        </label>
        </xsl:if>
        
       <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <label class="LBLinv">
                <xsl:attribute name="FOR">
                    <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:attribute>
            </label>
        </xsl:if> 
    </xsl:template> 
    
    <xsl:template name="dispEntityField_tmp" >
    <xsl:param name="EntityType" />
    <xsl:choose>
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField_tmp" />
        </xsl:when>   
        <xsl:when test="$EntityType = 'DATETIME'">
            <xsl:call-template name="dispDateTimeField_tmp" />
        </xsl:when>   
      <!-- <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DISPMASK'">
            <xsl:call-template name="dispMaskingField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DESCRIPTION'">
            <xsl:call-template name="dispDescriptionField_tmp" /> 
        </xsl:when>  -->
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField_tmp" />
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="dispTextField_tmp" />
        </xsl:otherwise>
    </xsl:choose>

</xsl:template>

    <xsl:template name="dispLinkField_tmp">
        <a class="Afoot" href="#;return false" tabindex ='0'>
            <xsl:attribute name="onclick">
                <xsl:text>fnShowDashboardCol(this,'</xsl:text>
                    <xsl:value-of select="../LINK/FID"/>
                <xsl:text>', event)</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="NAME">
               <xsl:value-of select="../NAME" />
            </xsl:attribute>
             <xsl:attribute name="alt">
                <xsl:if test="../LINK/FID != ''">
                    <xsl:value-of select="../LINK/FID"/>
                </xsl:if>
                <xsl:if test="../LINK/FID = ''">
                    <xsl:value-of select="$funcId"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </a>
    </xsl:template>
    
    <xsl:template name="dispLinkROWField_tmp">
        <a class="Afoot" href="#;return false" tabindex ='0'>
            <xsl:attribute name="onclick">
                <xsl:text>fnShowDashboardRow(this,'</xsl:text>
                    <xsl:value-of select="../LINK/FID"/>
                <xsl:text>', event)</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="NAME">
               <xsl:value-of select="../NAME" />
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:if test="../LINK/FID != ''">
                    <xsl:value-of select="../LINK/FID"/>
                </xsl:if>
                <xsl:if test="../LINK/FID = ''">
                    <xsl:value-of select="$functionId"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </a>
    </xsl:template>
    
    <xsl:template name="dispCheckboxField_tmp">
        <label class="LBLinv">
            <xsl:attribute name="for">
                <xsl:value-of select="../NAME"></xsl:value-of>
            </xsl:attribute>
        </label>
        <input type="checkbox" class="CHKstd">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                <xsl:attribute name="DEFAULT">yes</xsl:attribute>
            </xsl:if>
            <xsl:attribute name="title">
                <xsl:value-of select="../NAME"/>
            </xsl:attribute>
        </input>
    </xsl:template>
   
   <xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>
    <input type="text" class="TXTroDash">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)" />
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </input> 
    <!-- <xsl:if test="count(LINK) &gt; 0">
        <a href="#;return false" tabindex ='-1'>
            <xsl:if test="LINK/TYPE = 'S'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnShowdashboardCol(this,'</xsl:text>
                    <xsl:value-of select="LINK/FID"/>
                    <xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="LINK/TYPE = 'C'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnShowDashboardRow(this,event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
        </a>
    </xsl:if>
    
    <xsl:if test="count(LINK) = 0">
    <input type="text" class="TXTro">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)" />
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </input> 
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if> 
   </xsl:if> -->
    
</xsl:template>


<xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:if test="count(//SUMMARY_DATA_BLK) &gt; 0">
            <xsl:value-of select="concat(//SUMMARY_DATA_BLK,'__',$curr_fld/NAME)" />
        </xsl:if>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/@UDF) != 0 or $curr_fld/@UDF = 'Y'">
        <xsl:attribute name="onbeforedeactivate">
            <xsl:text>fnUpdateUDFDBField(this)</xsl:text>
        </xsl:attribute>
    </xsl:if>
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
    <!-- <xsl:choose>
        <xsl:when test="number($curr_fld/SIZE) > 23">
       
            <xsl:choose>
                <xsl:when test="(count(../POPUPEDIT) = 0 and count(curr_fld/LOV) &gt;0) or (count(../POPUPEDIT) &gt;0 and count(curr_fld/LOV) = 0) or number($curr_fld/MAXLENGTH) &gt; $displaySize">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="(count(../POPUPEDIT) &gt; 0 and count(curr_fld/LOV) &gt;0) or (count(curr_fld/LOV) &gt;0 and number($curr_fld/MAXLENGTH) &gt; $displaySize)">
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="number($curr_fld/SIZE) - 8" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="SIZE">
                        <xsl:value-of select="$curr_fld/SIZE" />
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
        
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="SIZE">
                <xsl:if test="count(../POPUPEDIT) &gt; 0 or (count($curr_fld/MAXLENGTH) &gt;0 and $curr_fld/MAXLENGTH = '')">
                    <xsl:value-of select="$curr_fld/SIZE" />
                </xsl:if>
                <xsl:if test="count(../POPUPEDIT) = 0">
                    <xsl:if test="number($curr_fld/MAXLENGTH) &gt; $displaySize">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4" />
                    </xsl:if>
                    <xsl:if test="number($curr_fld/MAXLENGTH) &lt;= $displaySize">
                        <xsl:value-of select="$curr_fld/SIZE" />
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose> -->
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>  
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX' and $curr_fld/TYPE != 'TEXTAREA'">   
            <xsl:attribute name="class">TXTroDash</xsl:attribute>       	     
            <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0 and $curr_fld/TYPE != 'TEXTAREA'">
                <xsl:attribute name="class">TXTroDash</xsl:attribute>       	     
                <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
            </xsl:if>        
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

      <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">
            <xsl:attribute name="class">TXTroDash</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test = "$curr_fld[TYPE = 'CHECKBOX'] or $curr_fld[TYPE = 'SELECT']">
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="DISABLED"/>
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>

    <!-- <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/> 
    
    <xsl:attribute name="REQUIRED">
        <xsl:if test="count($curr_fld/REQD) &gt; 0">
            <xsl:value-of select="$curr_fld/REQD" />
        </xsl:if>
    </xsl:attribute> -->
    
    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="class">hidden</xsl:attribute>
    </xsl:if>
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
   
   <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="//SUMMARY_DATA_BLK"/></xsl:attribute>
    </xsl:if>  
  </xsl:template>
  
  
  <xsl:template name="dispDateTimeField_tmp">
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="fnFormatTimeStamp(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="class">
                <xsl:text>LBLstd</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTroDash">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="20"/>
        </xsl:attribute>
    </INPUT>
</xsl:template>

<xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:attribute name="ID">
        <xsl:value-of select="concat(//SUMMARY_DATA_BLK,'__',$curr_fld/NAME)" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">        
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
    </xsl:attribute>
   <!-- <xsl:if test="number($curr_fld/SIZE) &lt; 23">
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="number($curr_fld/SIZE) &gt; 23">
        <xsl:attribute name="SIZE">
            <xsl:if test="count(curr_fld/LOV) &gt;0 or $curr_fld/TYPE = 'DATE'">
                <xsl:value-of select="number($curr_fld/SIZE) - 4" />
            </xsl:if>
            <xsl:if test="count(curr_fld/LOV) = 0 and $curr_fld/TYPE != 'DATE'">
                <xsl:value-of select="$curr_fld/SIZE"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    -->
    <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT'">
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
                <xsl:value-of select="$curr_fld/MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
                <xsl:if test="count($curr_fld/SIZE) != 0">
                    <xsl:value-of select="$curr_fld/SIZE" />
                </xsl:if>
                <xsl:if test="count($curr_fld/SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                    <xsl:text>16</xsl:text>
                </xsl:if>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>                
        <xsl:attribute name="class">TXTroDash</xsl:attribute>
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']" >
            <xsl:attribute name="class">
                <xsl:text>TXTroDash numeric</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TXTroDash</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="//SUMMARY_DATA_BLK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>

<xsl:template name="dispDateField_tmp">
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
    </label>
    <INPUT TYPE="TEXT" class="TXTroDash" title="{../LBL}"  onblur="validateInputDate('{../NAME}', event)" readOnly="true" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    <xsl:attribute name="SIZE">
        <xsl:value-of select="11"/>
    </xsl:attribute>
    <xsl:attribute name="title">
        <xsl:value-of select="../LBL"/>
    </xsl:attribute>
    
   <!-- <xsl:if test="$refFld !=''">
        <xsl:attribute name="REF_FIELD">
            <xsl:if test="contains($referFld,'__')">
                <xsl:value-of select="substring-after($referFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($referFld,'__'))">
                <xsl:value-of select="$referFld"/>
            </xsl:if>
        </xsl:attribute>
    </xsl:if> -->
    </INPUT>
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">            
            <button class="BTNhide" oldClassName = "BTNimg" title="{$calendar}" onclick="disp_cal('{../NAME}', event)" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOcalendar">             
            <span class="LBLinv"><xsl:value-of select = "$calendar"/></span>
            </span>
            </button>
        </xsl:if>
    </xsl:if>
    <!-- <xsl:if test="count(../LOV) &gt; 0">
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </xsl:if> -->
</xsl:template>

<xsl:template name="ATTR_HiddenEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="DBT">
        <xsl:value-of select="//SUMMARY_DATA_BLK" />
    </xsl:attribute>
    <xsl:attribute name="DBC">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:value-of select="concat(//SUMMARY_DATA_BLK,'__',$curr_fld/NAME)" />
    </xsl:attribute>
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:attribute>
    <!-- <xsl:variable name="refFld">
        <xsl:if test="count($curr_fld/REF_FIELD) &gt; 0 and normalize-space($curr_fld/REF_FIELD) != ''">
            <xsl:value-of select="$curr_fld/REF_FIELD" />
        </xsl:if>
    </xsl:variable>
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
    </xsl:if> -->
    
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="//SUMMARY_DATA_BLK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>

<xsl:template name="dispAmountField_tmp">
    <xsl:variable name="relFld">
        <xsl:value-of select="../RELATED_FIELD" />
    </xsl:variable>
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
    <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')" related_ccy = "{$relatedFld}">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
    </label>
    <INPUT TYPE="TEXT" class="TXTroDash numeric" title="{../LBL}" readOnly="true">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="MAXLENGTH1">
            <xsl:if test="not(contains(../MAXLENGTH,','))">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="contains(../MAXLENGTH,',')">
                <xsl:value-of select="substring-before(../MAXLENGTH,',') - substring-after(../MAXLENGTH,',')"/>
            </xsl:if>
        </xsl:attribute>
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
        <xsl:attribute name = "onblur">
            <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
            <xsl:value-of select="../NAME"/>
            <xsl:text disable-output-escaping="yes">', '</xsl:text>
            <xsl:value-of select="$relatedFld"/>
            <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this)</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
        </xsl:attribute>
    </INPUT> 
</xsl:template>

<xsl:template name="dispNumberField_tmp">
    <xsl:param name="EntityType"/>
    <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>    
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="../NAME"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
    </label>
    <input type="text" class="TXTroDash numeric" title="{../LBL}" onblur="validateInputNumber(this)">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
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
        <xsl:if test="normalize-space(../MAX_DECIMALS) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="../MAX_DECIMALS"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
        </xsl:attribute>
    </input>
</xsl:template>

    <xsl:template name="generateScript">
        <script type="text/javascript" DEFER="DEFER">
            summaryScreen = 'Y';
            gscrPos = 'template';
            //g_scrType = 'M';
            //imgpath = "<xsl:value-of select="$imgPath_XSL"/>";
            l_LablesArr = new Array();
            OptionValue = new Array();
            fieldType = new Array();
            relatedField   = new Array();
     
            <xsl:for-each select="SUMBLOCK[@TABPAGE='RESULT']/FIELD">
                <xsl:variable name="fName"><xsl:value-of select="NAME"/></xsl:variable>
                <xsl:variable name="fNameTmp"><xsl:value-of select="concat('&quot;', $fName , '&quot;')"/></xsl:variable>
                <xsl:if test="TYPE = 'SELECT'">
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:for-each select="$fldNode/OPTION">
                            <xsl:variable name="l_optdata">
                                <xsl:if test="@VALUE != '' or text() != ''">
                                    <xsl:value-of select="concat(@VALUE, '__', text(), '~')"/>
                                </xsl:if>
                                <xsl:if test="@VALUE = '' and text() = ''">
                                    <xsl:value-of select="concat('', '')"/>
                                </xsl:if>
                            </xsl:variable>
                            <xsl:value-of select="$l_optdata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'RADIO'">
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:for-each select="$fldNode/OPTION">
                            <xsl:variable name="l_optdata">
                                <xsl:if test="VALUE != '' or LBL != ''">
                                    <xsl:value-of select="concat(VALUE, '__', LBL, '~')"/>
                                </xsl:if>
                                <xsl:if test="VALUE = '' and LBL = ''">
                                    <xsl:value-of select="concat('', '')"/>
                                </xsl:if>
                            </xsl:variable>
                            <xsl:value-of select="$l_optdata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'CHECKBOX'">
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:variable name="l_optdata">
                            <xsl:if test="count($fldNode/CUSTOM) &gt; 0">
                                <xsl:value-of select="concat($fldNode/CUSTOM/ON, '__', $checkboxYes, '~', $fldNode/CUSTOM/OFF, '__', $checkboxNo, '~')"/>
                            </xsl:if>
                            <xsl:if test="count($fldNode/CUSTOM) = 0">
                                <xsl:value-of select="concat('', '')"/>
                            </xsl:if>
                        </xsl:variable>
                        <xsl:value-of select="$l_optdata"/>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'AMOUNT' or TYPE = 'DATE' or TYPE = 'DATETIME'">
                    <xsl:variable name="fFieldTypeTemp"><xsl:value-of select="concat('&quot;', TYPE , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="FieldType"><xsl:value-of select="concat('fieldType[',$fNameTmp, ']' , '=' , $fFieldTypeTemp)"/></xsl:variable>
                    <xsl:value-of select="$FieldType"/>
                    <xsl:text>&#xa;</xsl:text>
                </xsl:if>
                <xsl:if test="TYPE = 'AMOUNT'">
                    <xsl:variable name="rltdFld"><xsl:value-of select="concat('&quot;', RELATED_FIELD, '&quot;', ';')"/></xsl:variable>
                    <xsl:variable name="RelatedFld"><xsl:value-of select="concat('relatedField[', $fNameTmp, ']', '=', $rltdFld)"></xsl:value-of></xsl:variable>
                    <xsl:value-of select="$RelatedFld"/>
                    <xsl:text>&#xa;</xsl:text>
                </xsl:if>
            </xsl:for-each>
            <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                <xsl:variable name="Ord" select="position()"/>
                <xsl:variable name="fDBC">
                    <xsl:value-of select="NAME"/>
                </xsl:variable>
            </xsl:for-each>
        </script>
        <noscript>
            <xsl:value-of select="$noScript"/>
        </noscript>
    </xsl:template>
    
    <!-- Start of ExtLabels.xsl -->
    <xsl:variable name="export_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXPORT~~'), '@@')" />
    <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')" />
    <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')" />   
    <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')" /> 
    <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
    <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
    <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" /> 
    <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_QRY_QUERY~~'), '@@')" />
    <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_REFRESH~~'), '@@')" />
    <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESULT~~'), '@@')" />
    <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKERID~~'), '@@')" />
    <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_ID~~'), '@@')" />
    <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORD_STAT~~'), '@@')" />
    <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')" />
    <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')" />
    <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')" />
    <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_A~~'), '@@')" />
    <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY_U~~'), '@@')" />
    <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_O~~'), '@@')" />
    <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_C~~'), '@@')" />
    <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_UN_AUTH_FLG~~'), '@@')" />
    <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPEN~~'), '@@')" />
    <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLOSED~~'), '@@')" />
    <xsl:variable name="authStat_Audit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
    <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
    <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />
    <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
    <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
    <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_FIELDS~~'), '@@')" />
    <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPERATOR~~'), '@@')" />
    <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_VALUE~~'), '@@')" />
    <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AND~~'), '@@')" />
    <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ACCEPT~~'), '@@')" />
    <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_QUERY~~'), '@@')" />
    <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ORDER_BY~~'), '@@')" />
    <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ASCENDING~~'), '@@')" />
    <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DESCENDING~~'), '@@')" />
    <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TO~~'), '@@')" />
    <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OR~~'), '@@')" />
    <xsl:variable name="ok" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
    <xsl:variable name="exit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />
    <xsl:variable name="cancel" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
    <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" />
    <xsl:variable name="lock_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUM_LOCK~~'), '@@')" />
    <xsl:variable name="checkboxYes" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_YES~~'), '@@')" />
    <xsl:variable name="checkboxNo" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_NO~~'), '@@')" />
    <xsl:variable name="mandatory" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_MANDATORY~~'), '@@')" />
    <xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />
    <xsl:variable name="summary" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY~~'), '@@')" />
    <xsl:variable name="expand_group" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_GROUP~~'), '@@')" />
    <xsl:variable name="lov" select="substring-before(substring-after($XslLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
    <xsl:variable name="previous" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')" />
    <xsl:variable name="next" select="substring-before(substring-after($XslLabels, 'LBL_NEXT~~'), '@@')" />
    <xsl:variable name="first" select="substring-before(substring-after($XslLabels, 'LBL_FIRST~~'), '@@')" />
    <xsl:variable name="last" select="substring-before(substring-after($XslLabels, 'LBL_LAST~~'), '@@')" />
    <xsl:variable name="add_row" select="substring-before(substring-after($XslLabels, 'LBL_ADDROW~~'), '@@')" />
    <xsl:variable name="delete_row" select="substring-before(substring-after($XslLabels, 'LBL_DELETEROW~~'), '@@')" />
    <xsl:variable name="single_rec_view" select="substring-before(substring-after($XslLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')" />
    <xsl:variable name="lock" select="substring-before(substring-after($XslLabels, 'LBL_LOCK~~'), '@@')" />
    <xsl:variable name="columns" select="substring-before(substring-after($XslLabels, 'LBL_COLUMNS~~'), '@@')" />
    <xsl:variable name="narrative" select="substring-before(substring-after($XslLabels, 'LBL_NARRATIVE~~'), '@@')" />
    <xsl:variable name="calendar" select="substring-before(substring-after($XslLabels, 'LBL_CALENDAR~~'), '@@')" />
    <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')" />
    <xsl:variable name="select_row" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ROW~~'), '@@')" />
    <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
    <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')" />
    <xsl:variable name="dismiss" select="substring-before(substring-after($XslLabels, 'LBL_DISMISS~~'), '@@')" />
    <!-- End of ExtLabels.xsl -->
  
</xsl:stylesheet>
