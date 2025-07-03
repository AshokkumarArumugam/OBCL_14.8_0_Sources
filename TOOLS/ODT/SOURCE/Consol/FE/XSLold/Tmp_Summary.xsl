<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <xsl:import href="Tmp_Summary_Audit.xsl"/>       
       <xsl:import href="Tmp_SummaryInput.xsl"/>
       <xsl:import href="Tmp_SummaryCore.xsl"/>
       <!-- To access the value of the "application name", the below parameter is declared - sampath -->
       <xsl:param name="appName"/>
       <xsl:variable name="imgPath_XSL" select="'Images/Flexblue'"/>
       <xsl:variable name="Brn_Neo" select="''"/>
       <xsl:output method="html"/>
       <xsl:variable name="gPosition" select="'template'"/>
       <xsl:variable name="cQuery" select="'Q'"/>
       <xsl:variable name="cResult" select="'R'"/>
       <xsl:variable name="cAdvanced" select="'A'"/>
       <xsl:variable name="cAll" select="'All'"/>

       <!-- Main template -->
       <xsl:template match="/">
              <TABLE cellspacing="0" cellpadding="0" border="0" style="margin-top:10px">
                    <TR><td> </td></TR>
                    <TR >
                        <TD>
                            <xsl:call-template name="QueryContent"/>
                        </TD>
                    </TR>
                     <TR>   
                            <TD width="99%" class="TDHighlightOne">
                                   <TABLE id="SUMMARY_BTNS" class="" border="0" cellspacing="0" cellpadding="0" style="padding-left:1px;">
                                          <TR>

                        <td><button onClick="fnOpenAdvanced()" class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" title="Advanced"><sup>Advanced</sup></button></td>
			<td><button onClick="fnResetQry()"  class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" title="Reset"><sup>Reset</sup></button></td>
			<td><button onClick="fnExecuteQuery()"  class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" title="Query"><sup>Query</sup></button></td>
			<td><button onClick="fnRefresSum()"  class="BUTTONInlineText" onMouseOver="this.className='BUTTONInlineTextHover'" onMouseOut="this.className='BUTTONInlineText'" onFocus="this.className='BUTTONInlineTextHover'" onBlur="this.className='BUTTONInlineText'" title="Refresh"><sup>Refresh</sup></button></td>
                                          </TR>
                                   </TABLE>
                            </TD>
                     </TR>
                     <TR>
                        <TD align="left" valign="top">
                          <xsl:call-template name="ResultProcess"/>
                        </TD>
                     </TR>
                     <TR> <td>

                              <div class="DIVFooter" id="DIVFooter" style="width:790px">
                                  <div class="DIVAudit" >  
                                   
                                            <TABLE width="99%" class="TABLEAudit" border="0" cellspacing="0" cellpadding="0" style="margin-top:0px;margin-bottom:0px;">
                                                <TR>
                                                <td width="90%"  align="left">
	<div style="overflow-x:auto; display:block;width:700px;padding-bottom:12px">
	
<TABLE class="TABLEAudit" border="0" cellspacing="0" cellpadding="0" style="margin-top:0px;margin-bottom:0px;">
<TR>
                                                   <xsl:variable name="tdHgt">
                                                    <xsl:if test="count(//LEGENDS) > 2">
                                                      <xsl:value-of select="90"/>
                                                    </xsl:if>
                                                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                                                      <xsl:value-of select="100"/>
                                                    </xsl:if>
                                                   </xsl:variable>
                                                   <xsl:variable name="fsHgt">
                                                    <xsl:if test="count(//LEGENDS) &gt; 2">
                                                      <xsl:value-of select="50"/>
                                                    </xsl:if>
                                                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                                                      <xsl:value-of select="50"/>
                                                    </xsl:if>
                                                   </xsl:variable>
                                                    <xsl:call-template name="Custom_Legends">
                                                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                                                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                                                    </xsl:call-template>  
                                                    <xsl:call-template name="Audit_Legends">
                                                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                                                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                                                    </xsl:call-template>
                                                    <TD width="99%"></TD>

</TR>
</TABLE>	
	
	</div>
        </td>
                                                    <xsl:call-template name="disp_Exit_Btn"/>
                                                    </TR>
                                            </TABLE>
                                        
                                        </div>
                              </div>
                                    </td>
                        </TR>
              </TABLE>
              <xsl:call-template name="generateScript">
              </xsl:call-template>
       </xsl:template>

       <xsl:template name="QueryContent">
        <div id="DIVQuery" style="overflow-y:auto; WIDTH:765px;height:100px;">
            <TABLE id="TblQuery" cellspacing="0" cellpadding="0" border="0" width="100%">
                <xsl:variable name="no_Of_flds" select="count(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD)"/>
                <xsl:call-template name="AuditFields"/>
                            
                <xsl:if test="$no_Of_flds &gt; 0">
                    <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
                        <xsl:variable name="pos" select="position()"/>
                        <xsl:variable name="dbt" select="../DBT"/>
                        <xsl:variable name="dbc" select="../DBC"/>
                        <xsl:variable name="fldName" select="../NAME"/>
                        <xsl:if test="($pos mod 2 = 1 )">
                            <xsl:text disable-output-escaping="yes"> &lt;TR&gt;</xsl:text>
                        </xsl:if>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select=".."/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="($pos mod 2 = 0)">
                            <xsl:text disable-output-escaping="yes"> &lt;/TR&gt;</xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                    <TR>
                    <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE='HIDDEN']/TYPE">
                        <xsl:variable name="pos" select="position()"/>
                        <xsl:variable name="dbt" select="../DBT"/>
                        <xsl:variable name="dbc" select="../DBC"/>
                        <xsl:variable name="fldName" select="../NAME"/>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                            <xsl:call-template name="typeHandler">
                                <xsl:with-param name="fType" select="."/>
                                <xsl:with-param name="fldNode" select=".."/>
                            </xsl:call-template>
                        </xsl:if>
                    </xsl:for-each>
                    </TR>
                </xsl:if>
                
                     </TABLE>
              </div>
       </xsl:template>

       
       <xsl:template name="generateScript">
          <!-- Script to be run for summary screens -->
          <script language="javascript" DEFER="DEFER">
          var l_scrHgt = "<xsl:value-of select="640"/>";
    	  var l_scrWth = "<xsl:value-of select="790"/>";
          var gscrPos = "<xsl:value-of select="$gPosition"/>";      
          var imgpath = "<xsl:value-of select="$imgPath_XSL"/>";      
            if(gscrPos == "template"){          
                document.styleSheets[0].href = "Theme/Flexblue_LTR.css";
                document.refresh;
            } 
            else {
                document.styleSheets[0].href = "Theme/Sky.css";
                document.refresh;
            }
		 document.getElementById("ResTree").className = 'DIVTwoColLyt';
         document.getElementById("DIVFooter").style.height = '90px';
         if (document.getElementById("SUM_CUST_BTNS")) {
            self.setTimeout("fnCalcHgt()",0);
            function fnCalcHgt() {
                var sbtn_height = document.getElementById("SUM_CUST_BTNS").offsetHeight;
                var l_tmp = document.getElementById("QryRslts").offsetHeight;
                var cust_btns = document.getElementById("CUST_BTNS").offsetHeight;
                document.getElementById("QryRslts").style.height = (l_tmp - cust_btns) +'px';
            }
         }
         window.dialogWidth = parseInt(l_scrWth)+"px";
         window.dialogHeight = parseInt(l_scrHgt)+"px";

         var l_LablesArr = new Array(); 
                     
                     <xsl:for-each select="//SUMBLOCK[@SCREEN='SUMMARY' and @TABPAGE='RESULT']/FIELD">
                            <xsl:variable name="fName">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fNameTmp">
                                   <xsl:value-of select="concat('&quot;', $fName , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="fLabel">
                                   <xsl:value-of select="LABEL"/>
                            </xsl:variable>
                            <xsl:variable name="fLabelTmp">
                                   <xsl:value-of select="concat('&quot;', $fLabel , '&quot;' , ';')"/>
                            </xsl:variable>
                            <xsl:variable name="ConcatStr">
                                   <xsl:value-of select="concat('l_LablesArr[',$fNameTmp, ']' , '=' , $fLabelTmp)">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$ConcatStr"/>
                     </xsl:for-each>


                    l_LablesArr['MAKER_ID'] = 'Maker Id';
                    l_LablesArr['CHECKER_ID'] = 'Checker Id';
                    l_LablesArr['RECORD_STAT'] = 'Record Status';
                    l_LablesArr['AUTH_STAT'] = 'Authorization Status';
      
      
      
                     <!-- Cache the Qry Order -->
                     var l_QryOrdArr = new Array();
                     l_QryOrdArr[0] = 'AUTH_STAT';
                     l_QryOrdArr[1] = 'RECORD_STAT';
    
      
                     <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                            <xsl:variable name="Ord" select="position()"/>
                            <xsl:variable name="fDBC">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fDBCTmp">
                                   <xsl:value-of select="concat('&quot;', $fDBC , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="CacheConcatStr">
                                   <xsl:value-of select="concat('l_QryOrdArr[',($Ord)+1, ']' , '=' , $fDBCTmp , ';')">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$CacheConcatStr"/>
                     </xsl:for-each>
              </script>
       </xsl:template>


       <xsl:template name="ResultProcess">
         <xsl:variable name="noOfRows" select="//SUMBUTTONS/BUTTON_ROWS"></xsl:variable>
         <!--  FCUBS10ITR1 SFR 543 START -->
        <div class="DIVMultipleMedium" style="margin-left:1px">
        <div class="HeaderMultiple" style="width:770px">
        <span class="SPANHeaderMultiple">Result<img src="{$imgPath_XSL}/star.gif"/></span>
        <img src="{$imgPath_XSL}/spacer.gif" width="5" height="18"/>
        </div>	
            <DIV id="QryRslts" class="DIVMultipleMediumInner" style="OVERFLOW:auto;WIDTH:775px;HEIGHT:353px;">
        <!--  FCUBS10ITR1 SFR 543 END -->
<!--
                <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">

                    <xsl:attribute name="style">
                      <xsl:text>overflow:auto;width:790px;height:</xsl:text>
                        <xsl:value-of select="335 - ($noOfRows * 30) - 2"/>
                      <xsl:text>px;background:color:#E7F3FF</xsl:text>
                    </xsl:attribute>
                </xsl:if>
-->                
            <!--  FCUBS10ITR1 SFR 543 START -->
              <table class="TABLEMultiple" ID = "TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" width="100%" style="width:760px">
            <!--  FCUBS10ITR1 SFR 543 END -->
                  <THEAD >
                    <TR>
                       <xsl:if test="/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'U'">
                        <TH class="THEADTHMultipleSummary" scope="col">
                          <INPUT TYPE="CHECKBOX" NAME = "RSLT_CHKBOX"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll()"/>
                        </TH>
                      </xsl:if>
                     

                      <xsl:call-template name = "AuditResult"/>
                      
                      <xsl:for-each select="/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="dbt" select="DBT"/>
                        <xsl:variable name="dbc" select="DBC"/>
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                        <!-- THE BELOW CHOOSE IS USED TO VERIFY IF THE APPLICATION IS "FCIS" AND IF SO, TO CHECK IF THE FIELDS ALREADY HAVE THE AUDIT FIELDS -->
                        <xsl:choose>
                        <xsl:when test="$appName = 'FCIS'">
                        <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                            <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                            <TH class="THEADTHMultipleSummary" TYPE="{$fldNode/TYPE}" scope="col" style="white-space:nowrap;">
                              <xsl:attribute name="ID">
                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                              </xsl:attribute>
                              <xsl:attribute name="NAME">
                                <xsl:value-of select="$fldName"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBT">
                                <xsl:value-of select="$dbt"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBC">
                                <xsl:value-of select="$dbc"/>
                              </xsl:attribute>
                              <xsl:attribute name="DTYPE">
                                <xsl:value-of select="$fldNode/DTYPE"/>
                              </xsl:attribute>
                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                <xsl:attribute name="RELATED_FIELD">
                                    <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                </xsl:attribute>
                              </xsl:if>
                              <xsl:value-of select="LABEL"/>
                            </TH>
                        </xsl:if>
                        </xsl:when>
                        <xsl:otherwise>
                        <xsl:variable name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                            <TH class="THEADTHMultipleSummary" TYPE="{$fldNode/TYPE}" scope="col" style="white-space:nowrap;">
                              <xsl:attribute name="ID">
                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                              </xsl:attribute>
                              <xsl:attribute name="NAME">
                                <xsl:value-of select="$fldName"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBT">
                                <xsl:value-of select="$dbt"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBC">
                                <xsl:value-of select="$dbc"/>
                              </xsl:attribute>
                              <xsl:attribute name="DTYPE">
                                <xsl:value-of select="$fldNode/DTYPE"/>
                              </xsl:attribute>
                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                <xsl:attribute name="RELATED_FIELD">
                                    <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                </xsl:attribute>
                              </xsl:if>
                              <xsl:value-of select="LABEL"/>
                            </TH>
                        </xsl:otherwise>
                    </xsl:choose>
                    </xsl:if>
                        <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                        <!-- THE BELOW CHOOSE IS USED TO VERIFY IF THE APPLICATION IS "FCIS" AND IF SO, TO CHECK IF THE FIELDS ALREADY HAVE THE AUDIT FIELDS -->
                        <xsl:choose>
                        <xsl:when test="$appName = 'FCIS'">
                        <xsl:if test="$fldName!='MAKER_ID' and $fldName!='MAKER_DT_STAMP' and $fldName!='CHECKER_ID' and $fldName!='CHECKER_DT_STAMP'">
                            <xsl:variable name="fldNode" select="."/>
                            <TH class="THEADTHMultipleSummary" TYPE="{$fldNode/TYPE}" scope="col" style="white-space:nowrap;">
                              <xsl:attribute name="ID">
                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                              </xsl:attribute>
                              <xsl:attribute name="NAME">
                                <xsl:value-of select="$fldName"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBT">
                                <xsl:value-of select="$dbt"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBC">
                                <xsl:value-of select="$dbc"/>
                              </xsl:attribute>
                              <xsl:attribute name="DTYPE">
                                <xsl:if test="normalize-space($fldNode/DTYPE) != ''">
                                <xsl:value-of select="$fldNode/DTYPE"/>
                                </xsl:if>
                                <xsl:if test="normalize-space($fldNode/DTYPE) = ''">
                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) != ''">
                                        <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE"/>
                                    </xsl:if>
                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) = ''">
                                        <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/DTYPE"/>
                                    </xsl:if>
                                </xsl:if>
                              </xsl:attribute>
                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                <xsl:attribute name="RELATED_FIELD">
                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) != ''">
                                        <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                    </xsl:if>
                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) = ''">
                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) != ''">
                                            <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD"/>
                                        </xsl:if>
                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) = ''">
                                            <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/RELATED_FIELD"/>
                                        </xsl:if>
                                    </xsl:if>
                                </xsl:attribute>
                              </xsl:if>
                              <xsl:value-of select="LABEL"/>
                            </TH>
                        </xsl:if>
		      </xsl:when>
		      <xsl:otherwise>
                            <xsl:variable name="fldNode" select="."/>
                            <TH class="THEADTHMultipleSummary" TYPE="{$fldNode/TYPE}" scope="col" style="white-space:nowrap;">
                              <xsl:attribute name="ID">
                                <xsl:value-of select="concat($dbt,'__',$dbc)"/>
                              </xsl:attribute>
                              <xsl:attribute name="NAME">
                                <xsl:value-of select="$fldName"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBT">
                                <xsl:value-of select="$dbt"/>
                              </xsl:attribute>
                              <xsl:attribute name="DBC">
                                <xsl:value-of select="$dbc"/>
                              </xsl:attribute>
                              <xsl:attribute name="DTYPE">
                                <xsl:if test="normalize-space($fldNode/DTYPE) != ''">
                                <xsl:value-of select="$fldNode/DTYPE"/>
                                </xsl:if>
                                <xsl:if test="normalize-space($fldNode/DTYPE) = ''">
                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) != ''">
                                        <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE"/>
                                    </xsl:if>
                                    <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/DTYPE) = ''">
                                        <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/DTYPE"/>
                                    </xsl:if>
                                </xsl:if>
                              </xsl:attribute>
                              <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                <xsl:attribute name="RELATED_FIELD">
                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) != ''">
                                        <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                    </xsl:if>
                                    <xsl:if test="normalize-space($fldNode/RELATED_FIELD) = ''">
                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) != ''">
                                            <xsl:value-of select="/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD"/>
                                        </xsl:if>
                                        <xsl:if test="normalize-space(/FORM/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[DBT = $dbt and DBC = $dbc and NAME = $fldName]/RELATED_FIELD) = ''">
                                            <xsl:value-of select="//BLOCK//FIELD[DBC = $dbc][NAME = $fldName]/RELATED_FIELD"/>
                                        </xsl:if>
                                    </xsl:if>
                                </xsl:attribute>
                              </xsl:if>
                              <xsl:value-of select="LABEL"/>
                            </TH>
		      </xsl:otherwise>
		      </xsl:choose>
		      </xsl:if>
                      </xsl:for-each>
                       <!-- sampath added the below code -->
                       <xsl:if test="$appName = 'FCIS'">
                        <xsl:call-template name = "AuditResultFCIS"/>
                       </xsl:if> 
                       <!-- code added by sampath ends here -->
                      <TH class="THEADTHMultipleSummary" width="99%" scope="col"><img src="{$imgPath_XSL}/spacer.gif" alt=" " width="1" height="25"/></TH>                      
                    </TR>
                  </THEAD>
                  <TBODY style='table-layout:auto;width:100%;height:100%;background-color:white'>
                      <TR>
                          <TD>
                              <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>                            
                          </TD>
                      </TR>
                  </TBODY> 
               </table>
            </DIV>
        </div>
          <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">
           <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
           <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>

        <div class="DIVSubSystem" id="SUM_CUST_BTNS" style="width:790px;padding-left:2px;">
	<ul id="CUST_BTNS">
            <xsl:for-each select="//SUMBUTTONS/BUTTON">
                <li >
                    <a href="#" class="BUTTONSubSystem">
                        <xsl:if test="BUTTON_EVENT != ''">
                          <xsl:attribute name="onClick"><xsl:value-of select="BUTTON_EVENT"/></xsl:attribute>
                        </xsl:if>
                    <span><xsl:value-of select="BUTTON_LABEL"/></span>
                    </a>
                </li>
            </xsl:for-each>
        </ul>
        </div>
            

        </xsl:if>         
       </xsl:template> 

</xsl:stylesheet>
