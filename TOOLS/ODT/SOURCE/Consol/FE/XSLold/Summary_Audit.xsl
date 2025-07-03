<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

      <xsl:template name="Audit_Legends">
        <xsl:param name="fsHeight"/>
        <xsl:param name="tdHeight"/>
           <!-- For Rec Status and Auth Status FldSets kals on June 4 -->
           <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>                   
            <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE">
            </xsl:variable>
           
           <!--
           <xsl:variable name="AuthStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'AUTH_STAT'])"/>
           <xsl:variable name="RecordStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'RECORD_STAT'])"/>
           <xsl:variable name="ContractStatusCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'CONTRACT_STATUS'])"/>           
           -->
           <xsl:if test="$AuditBlk_exist != ''">
                <xsl:if test="$AuditBlk_Type = 'M'">
                  <TD style="height:{$tdHeight}px;width:150px;" align="left" valign="top"> 
                         <FIELDSET CLASS="FieldsetNormal" style="height:{$fsHeight}px;width:140px;border:1px solid red;">
                                <LEGEND>
                                       <b>Authorization Status</b>
                                </LEGEND>
                                <TABLE border="0" cellspacing="0" cellpadding="0" style="margin-left:8px;margin-top:5px;">
                                       <TR>   
                                              <TD align="left">A - Authorized</TD>
                                       </TR>
                                       <TR>
                                              <TD align="left"><NOBR>U - UnAuthorized</NOBR></TD>
                                       </TR>
                                       <!--<TR>
                                          <TD style="height:100%"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                                       </TR>
                                       !-->
                                </TABLE>
                         </FIELDSET>
                  </TD>
                </xsl:if>
<!--                                     <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text> -->
                <xsl:if test="$AuditBlk_Type = 'M'">
                  <TD style="height:{$tdHeight}px;width:150px;" align="left" valign="top"> 
                         <FIELDSET CLASS="FieldsetNormal" style="overflow-y:auto;height:{$fsHeight}px;width:140px;border:1px solid red;">
                                <LEGEND>
                                       <b> Record Status </b>
                                </LEGEND>
                                <TABLE border="0" cellspacing="0" cellpadding="0" style="margin-left:8px;margin-top:5px;">
                                       <TR>
                                              <TD>C - Close</TD>
                                       </TR>
                                       <TR>
                                              <TD>O - Open</TD>
                                       </TR>
                                </TABLE>
                         </FIELDSET>
                  </TD>
                </xsl:if>
<!--                
                <xsl:if test="$AuditBlk_Type = 'T'">
                  <TD style="height:{$tdHeight}px;width:150px;" align="left" valign="top"> 
                         <FIELDSET CLASS="FieldsetNormal" style="overflow-y:auto;height:{$fsHeight}px;width:140px;border:1px solid red;">
                                <LEGEND>
                                       <b> Contract Status </b>
                                </LEGEND>
                                <TABLE border="0" cellspacing="0" cellpadding="0" style="margin-left:8px;margin-top:5px;">
                                       <TR>
                                              <TD>C - Close</TD>
                                       </TR>
                                       <TR>
                                              <TD>O - Open</TD>
                                       </TR>
                                       <TR>
                                              <TD>L - Liquidated</TD>
                                       </TR>
                                </TABLE>
                         </FIELDSET>
                  </TD>
                </xsl:if> -->
           </xsl:if>
      </xsl:template>
      <xsl:template name="Custom_Legends">    
        <xsl:param name="fsHeight"/>
        <xsl:param name="tdHeight"/>
        <xsl:if test="count(//LEGENDS) > 0">
          <xsl:for-each select="//LEGENDS">
            <xsl:variable name="width">
              <xsl:if test="normalize-space(WIDTH) != ''">
                <xsl:value-of select="normalize-space(WIDTH)"/>
              </xsl:if>
              <xsl:if test="normalize-space(WIDTH) = ''">
                <xsl:value-of select="150"/>
              </xsl:if>
            </xsl:variable>
             <TD style="height:{$tdHeight}px;width:{$width}px;" align="left" valign="top"> 
<!--               <FIELDSET CLASS="FieldsetNormal" style="overflow-y:auto;height:{$fsHeight}px;width:140px;border:1px solid red;"> -->
               <FIELDSET CLASS="FieldsetNormal" style="overflow-y:auto;height:{$fsHeight}px;width:{$width - 10}px;border:1px solid red;">
                 <LEGEND> <b> <xsl:value-of select="LABEL"/> </b> </LEGEND>
                   <TABLE border="0" cellspacing="0" cellpadding="0" style="margin-left:8px;margin-top:5px;">
                      <xsl:for-each select="OPTION">
                         <TR>
                           <TD>
                              <NOBR><xsl:value-of select="@VALUE"/> - <xsl:value-of select="(.)"/></NOBR>
                           </TD>
                         </TR>
                      </xsl:for-each>
                   </TABLE>
               </FIELDSET>
             </TD>
          </xsl:for-each>
        </xsl:if>
      </xsl:template>  
      
       <xsl:template name="AuditFields">
              <xsl:variable name="AuditBlk_exist"
                            select="//BLOCK[ID ='BLK_AUDIT']">
              </xsl:variable>
              <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE">
              </xsl:variable>
              
              <xsl:if test="$AuditBlk_exist != ''">
                     <TR>
                        <xsl:if test="$AuditBlk_Type = 'M'">                                   
                            <TD class="colTDLabel" vAlign="top" align="right">
                                   <NOBR>
                                          <LABEL class="LABELNormal">Authorization Status<SPAN class="SPANFlag"
                                                       title="Required Field"
                                                       style="VISIBILITY: hidden">*</SPAN>
                                          </LABEL>
                                   </NOBR>
                            </TD>
                            <TD CLASS="colTDText">
                                   <SELECT CLASS="SELECTList" TYPE="TEXT"
                                           SIZE="1" MAXLENGTH="1" DBT="{DBT}"
                                           DBC="AUTH_STAT" NAME="AUTH_STAT">
                                          <OPTION CLASS="SELECTListOption"
                                                  VALUE="" SELECTED="true">
                                          </OPTION>
                                          <OPTION CLASS="SELECTListOption"
                                                  VALUE="A">Authorized</OPTION>
                                          <OPTION CLASS="SELECTListOption"
                                                  VALUE="U">Unauthorized</OPTION>
                                   </SELECT>
                            </TD>
                          </xsl:if>
                            <!-- For Maintenance add the Record Status!-->
                            <xsl:if test="$AuditBlk_Type = 'M'">
                                   <TD class="colTDLabel" vAlign="top"
                                       align="right">
                                          <NOBR>
                                                 <LABEL class="LABELNormal">Record Status
                                                        
                                                        <SPAN class="SPANFlag"
                                                              title="Required Field"
                                                              style="VISIBILITY: hidden">*</SPAN>
                                                 </LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="colTDText">
                                          <SELECT CLASS="SELECTList" TYPE="TEXT"
                                                  SIZE="1" MAXLENGTH="1"
                                                  DBT="{DBT}" DBC="RECORD_STAT"
                                                  NAME="RECORD_STAT">
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE=""
                                                         SELECTED="true">
                                                 </OPTION>
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE="O">Open</OPTION>
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE="C">Closed</OPTION>
                                          </SELECT>
                                   </TD>
                            </xsl:if>
                            <!-- For Onlines add the contract Status!-->
<!--                            
                            <xsl:if test="$AuditBlk_Type = 'T'">
                                   <TD class="colTDLabel" vAlign="top"
                                       align="right">
                                          <NOBR>
                                                 <LABEL class="LABELNormal">Contract Status
                                                        
                                                        <SPAN class="SPANFlag"
                                                              title="Required Field"
                                                              style="VISIBILITY: hidden">*</SPAN>
                                                 </LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="colTDText">
                                          <SELECT CLASS="SELECTList" TYPE="TEXT"
                                                  SIZE="1" MAXLENGTH="1"
                                                  DBT="{DBT}" DBC="RECORD_STAT"
                                                  NAME="RECORD_STAT">
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE=""
                                                         SELECTED="true">
                                                 </OPTION>
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE="O">Open</OPTION>
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE="C">Closed</OPTION>
                                                 <OPTION CLASS="SELECTListOption"
                                                         VALUE="L">Liquidated</OPTION>
                                          </SELECT>
                                   </TD>
                            </xsl:if> -->
                     </TR>
              </xsl:if>
       </xsl:template>      
       
       <xsl:template name="disp_Exit_Btn">
              <TABLE style="table-layout:auto" cellspacing="2" cellpadding="0"
                     border="0">
                     <TR>
                      
                            <TD width="*" align="right">
                                   <BUTTON class="INPUTStdButton_img"
                                           onclick="fnExit()"
                                           id="BTN_EXIT">
                                          <IMG id="BTN_EXIT_IMG'"
                                               SRC="Images/Exit2.gif"
                                               name="BTN_EXIT_IMG"/>
                                   </BUTTON>
                            </TD>
                     </TR>
              </TABLE>
       </xsl:template>
       
       <!-- Kals June 15 Audit Results -->
       <xsl:template name = "AuditResult">
<!--
           <xsl:variable name="AuthStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'AUTH_STAT'])"/>
           <xsl:variable name="RecordStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'RECORD_STAT'])"/>
           <xsl:variable name="ContractStatusCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'CONTRACT_STATUS'])"/>           
           -->
          <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
          <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>

          <xsl:if test="$AuditBlk_exist != ''">
            <xsl:if test="$AuditBlk_Type = 'M'">                    
              <TH class="THEADTDMultiple">
                      <xsl:value-of select="'Authorization Status'"/>
              </TH>
            </xsl:if>
            <xsl:if test="$AuditBlk_Type = 'M'">          
             <TH class="THEADTDMultiple">
                <xsl:value-of select="'Record Status'"/>
             </TH>
            </xsl:if>
<!--            
            <xsl:if test="$AuditBlk_Type = 'T'">          
             <TH class="THEADTDMultiple">
                <xsl:value-of select="'Transaction Status'"/>
             </TH>
            </xsl:if>  -->
        </xsl:if>
       </xsl:template>
       
              
</xsl:stylesheet>
