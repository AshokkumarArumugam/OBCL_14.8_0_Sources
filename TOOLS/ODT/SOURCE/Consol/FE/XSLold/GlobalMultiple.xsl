<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <!--  <xsl:template name="MultipleHandler_column -->
  
  <xsl:template name="MultipleHandler_column_FS">
        <xsl:variable name = "Blk_Fs_Lbl" select = "LABEL"/>
        <xsl:variable name = "BlkId" select = "ID"/>
    
  
       <xsl:if test = "$Blk_Fs_Lbl != ''"> 
          <FIELDSET CLASS="FieldsetNormal" ID = "FLDSET__{$BlkId}">    
            <b><LEGEND><LABEL ID = "LBL_FLDSET_{$BlkId}" value = "{$Blk_Fs_Lbl}" > <xsl:value-of select = "$Blk_Fs_Lbl"/> </LABEL></LEGEND></b>       
                  <xsl:call-template name = "MultipleHandler_column">
                      <xsl:with-param name = "topPadding" select = "0"/>
                      <xsl:with-param name = "bottomPadding" select = "0"/>
                  </xsl:call-template>      
           </FIELDSET>       
          </xsl:if>                
    
    
  
  
  	<xsl:if test = "$Blk_Fs_Lbl = ''">
        <xsl:call-template name = "MultipleHandler_column">
                      <xsl:with-param name = "topPadding" select = "10"/>
                      <xsl:with-param name = "bottomPadding" select = "10"/>
        
      </xsl:call-template>        
  </xsl:if>
  </xsl:template>
  
  <xsl:template name="MultipleHandler_column">
    <xsl:variable name="halfWidth" select="$gWidth*(1 div 2)"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>
    <xsl:variable name="multipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="HEIGHT"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <TABLE border="0" style="margin-top:10px;margin-bottom:10px;wdith:100%;">
      <TR>
        <TD>
          <xsl:if test="($multipleWidth &gt; $twoThirdWidth) or ($multipleWidth = $twoThirdWidth)">
            <xsl:attribute name="STYLE">
              <xsl:text>width:10px;</xsl:text>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="$multipleWidth &lt; $twoThirdWidth">
            <xsl:attribute name="STYLE">
              <xsl:text>width:20%;</xsl:text>
            </xsl:attribute>
          </xsl:if>
        </TD>
        <TD>
          <TABLE class="MultipleEntryContainer" border="0" cellpadding="0"
                 cellspacing="0" summary="">
            <TR>
              <TD valign="bottom" align="left">
                <xsl:call-template name="MultipleHandler">
                  <xsl:with-param name="curr_blk" select="."/>
                  <xsl:with-param name="mWidth" select="$multipleWidth"/>
                  <xsl:with-param name="mHeight" select="$multipleHeight"/>
                </xsl:call-template>
              </TD>
<!--
              <xsl:if test="count(./READ_ONLY) =0">
                <TD valign="top" align="center">
                  <xsl:call-template name="MultipleHandler_1"/>
                </TD>
              </xsl:if>

              <xsl:if test="count(./READ_ONLY) = 1 ">
                <xsl:if test="./READ_ONLY &gt; -1">
                  <TD valign="top" align="center">
                    <xsl:call-template name="MultipleHandler_1"/>
                  </TD>
                </xsl:if>
                <xsl:if test="./READ_ONLY = -1">
                  <TD valign="top" style="padding-left: 10px;width:18px;">
                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                  </TD>
                </xsl:if>
              </xsl:if> -->
              <!-- sundar added -->
              <TD valign="top" align="center">
                <xsl:call-template name="MultipleHandler_1">
                  <xsl:with-param name="curr_blk" select="."/>
                </xsl:call-template>
              </TD>
            </TR>
          </TABLE>
        </TD>
      </TR>
    </TABLE>
  </xsl:template>
  
  
 
 <xsl:template name="MultipleHandler_absolute_FS">  
    <xsl:variable name = "Blk_Fs_Lbl" select = "normalize-space(LABEL)"/>
    <xsl:variable name = "FldSetHt" select = "HEIGHT"/>  
    <xsl:variable name = "FldSetWdt" select = "WIDTH"/>
    <xsl:variable name = "BlkId" select = "ID"/>
    <xsl:variable name="FldSetrow" select="substring-before(ABS_POS,',')"/>
    <xsl:variable name="FldSetcol" select="substring-after(ABS_POS,',')"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    
    <xsl:variable name="FldSetmultipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $FldSetWdt">
          <xsl:value-of select="$FldSetWdt"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $FldSetWdt">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    
 
 
  <xsl:if test = "$Blk_Fs_Lbl != ''">
   <!--
    <FIELDSET class = "FieldsetNormal" ID = "FLDSET__{$BlkId}" style="position:absolute;left:0px;top:{$FldSetrow}px;width:{$FldSetmultipleWidth + 40}px;height:{$FldSetHt + 40}px;">
   -->
   <FIELDSET class = "FieldsetNormal" ID = "FLDSET__{$BlkId}" style="position:absolute;left:{$FldSetcol}px;top:{$FldSetrow}px;width:{$FldSetmultipleWidth + 40}px;height:{$FldSetHt + 40}px;z-index:1">
   <xsl:if test="normalize-space(HEIGHT) = 0 or normalize-space(WIDTH) = 0">
    <xsl:attribute name="style">
        <xsl:text>position:absolute;left:0px;top:0px;width:0px;height:0px;z-index:1</xsl:text>
    </xsl:attribute>
   </xsl:if>
   <xsl:if test="normalize-space(HEIGHT) != 0 and normalize-space(WIDTH) != 0">   
    <LEGEND>
        <b>
          <NOBR>
            <LABEL class="LABELNormal"  value = "{$Blk_Fs_Lbl}" ID = "LBL_FLDSET_{$BlkId}" >
              <xsl:value-of select = "$Blk_Fs_Lbl"/>
              <xsl:if test="count(REQUIRED) = 0 or REQUIRED = -1">
                <SPAN class="SPANFlag" title="Required Field">*</SPAN>
              </xsl:if>
            </LABEL>
          </NOBR>
          </b>
    </LEGEND>    
    </xsl:if>
      <xsl:call-template name = "MultipleHandler_absolute">
        <xsl:with-param name = "divLeft" select = "2"/>
        <xsl:with-param name = "divTop" select = "15"/>
      </xsl:call-template>      
    </FIELDSET>
    
  </xsl:if>
  
  <xsl:if test = "$Blk_Fs_Lbl = ''">
        <xsl:call-template name = "MultipleHandler_absolute">
          <xsl:with-param name = "divLeft" select = "$FldSetcol"/>
          <xsl:with-param name = "divTop" select = "$FldSetrow"/>
      </xsl:call-template>        
  </xsl:if>
  
  
 </xsl:template>
 
 
 
  <xsl:template name="MultipleHandler_absolute">
    <xsl:variable name="row" select="substring-before(ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after(ABS_POS,',')"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>    
    
    
    <xsl:variable name="multipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="normalize-space(HEIGHT)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
<!--    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$col}px;top:{$row}px;width:{$multipleWidth + 35}px;height:{HEIGHT}px;"> -->
    <DIV class="MultipleEntryContainer" ID="SYS_{ID}"
         style="position:absolute;left:{$col}px;top:{$row}px;width:{$multipleWidth + 35}px;height:{$multipleHeight}px;">
   <xsl:if test="normalize-space(HEIGHT) = 0 or normalize-space(WIDTH) = 0">
    <xsl:attribute name="style">
        <xsl:text>position:absolute;left:0px;top:0px;width:0px;height:0px;</xsl:text>
    </xsl:attribute>
    <xsl:attribute name="class">
        <xsl:text></xsl:text>
    </xsl:attribute>
   </xsl:if>         
    
      <xsl:call-template name="MultipleHandler">
        <xsl:with-param name="curr_blk" select="."/>
        <xsl:with-param name="mWidth" select="$multipleWidth"/>
        <xsl:with-param name="mHeight" select="$multipleHeight"/>        
      </xsl:call-template>
      
<!--      <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY != -1"> -->
        <xsl:call-template name="MultipleHandler_1">
          <xsl:with-param name="curr_blk" select="."/>
        </xsl:call-template>
<!--      </xsl:if> -->
    </DIV>
    
  </xsl:template>
  <xsl:template name="MultipleHandler">
    <xsl:param name="curr_blk" select="."/>
    <xsl:param name="mWidth" select="."/>
    <xsl:param name="mHeight" select="."/>
    <xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')"/>
<!--    <DIV CLASS="DIVMultiple" NAME="dataContainer" STYLE="overflow-y:auto;position:inherit;width:{$mWidth - 35}px;height:{$curr_blk/HEIGHT}px;"> -->
    <DIV CLASS="DIVMultiple" NAME="dataContainer" STYLE="overflow-y:auto;position:inherit;width:{$mWidth - 35}px;height:{$mHeight}px;"> 
      <xsl:if test="$gPosition = 'absolute'">
        <xsl:attribute name="STYLE">
          <xsl:text>position:absolute;top:0px;left:0px;overflow-y:auto;width:</xsl:text>
          <xsl:value-of select="$mWidth"/>
          <xsl:text>px;height:</xsl:text>
<!--          <xsl:value-of select="$curr_blk/HEIGHT"/> -->
          <xsl:value-of select="$mHeight"/> 
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!--
      <DIV class="DIVMultipleInner" style="height:{$curr_blk/HEIGHT}px;">!-->
        <TABLE CLASS="TABLEMultiple" ID="{$curr_blk/ID}" cellpadding="1"
               cellspacing="1" border="0"
               summary="Editable Table for {$curr_blk/LABEL}">
          <xsl:apply-templates select="$curr_blk/EVENT"/>
          <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:attribute name="DBT">
              <xsl:value-of select="./DBT"/>
            </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
              <xsl:value-of select="$curr_blk/DATAPAGESIZE"/>
            </xsl:attribute>
          </xsl:if>
          <THEAD id="downTblHead">
            <TR>
              <TH CLASS="THEADTDMultiple" style="border:none;" align="center"
                  SCOPE="COL">
                <INPUT TYPE="CHECKBOX"
                       OnClick="fnToggleAllOrNoneME({$curr_blk/ID},this)"
                       title="Select all rows"/>
              </TH>
              <xsl:for-each select="$curr_blk/FIELD">
                <xsl:sort select="@COL" data-type="number" order="ascending"/>
                <xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                  <TH CLASS="DispNone" SCOPE="COL"> 
<!--                  <TH CLASS="hidden" SCOPE="COL"> -->
                  </TH>
                </xsl:if>
                <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                  <TH CLASS="THEADTDMultiple" SCOPE="COL" align="center">
                    <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                      <SPAN class="LABELDDLink"
                            onClick="DD_{./NAME}.showTargetFuncId()">
                        <xsl:value-of select="./LABEL"/>
                      </SPAN>
                    </xsl:if>
                    <xsl:if test="count(./DD) = 0">
                      <NOBR>
                        <SPAN CLASS="SPANFlag">
                        </SPAN>
                        <xsl:value-of select="./LABEL"/>
                      </NOBR>
                    </xsl:if>
                  </TH>
                </xsl:if>
              </xsl:for-each>
              <!--Adding a temparory TD to keep the Columns of fiedwidth !-->
              <TH CLASS="THEADTDMultiple" style="width:100%" SCOPE="COL">
                <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
              </TH>
            </TR>
          </THEAD>
          <TBODY>
            <xsl:if test="count(./DBT) &gt;= 1">
              <xsl:call-template name="detail_row">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="string('1')"/>
              </xsl:call-template>
            </xsl:if>
            <xsl:if test="count(./DBT) &lt;= 0">
              <xsl:call-template name="detail_row">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS"/>
              </xsl:call-template>
            </xsl:if>
          </TBODY>
        </TABLE>
      <!--</DIV>!-->
    </DIV>
    <!-- Added this div, to solve the problem :: if the last control is a me then it is not displaying till the end.!-->
    <!--
          <xsl:if test="$gPosition='absolute'">
              <DIV style="position:absolute;left:0px;top:{$row + $curr_blk/HEIGHT}px;visibility:hidden;">
                  <input type="text" id="askau"/>
              </DIV>
          </xsl:if>
          -->
  </xsl:template>
  <xsl:template name="MultipleHandler_1">
    <xsl:param name="curr_blk" select="."/>
    <xsl:variable name="mHgt">
      <xsl:choose>
        <xsl:when test="normalize-space($curr_blk/HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number($curr_blk/HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="normalize-space($curr_blk/HEIGHT)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <NOBR>
      <DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}"
           id="divAddDel_{$curr_blk/ID}">
        <xsl:if test="$gPosition='absolute'">
          <xsl:attribute name="STYLE">
              <xsl:text>float:right;width:</xsl:text>
              <xsl:choose>
                <xsl:when test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:text>0px;</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>30px;</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
              <xsl:text>height:</xsl:text>
<!--              <xsl:value-of select="$curr_blk/HEIGHT"/> -->
              <xsl:value-of select="$mHgt"/> 
              <xsl:text>px;</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <TABLE CLASS="TABLEAddDelRow" cellspacing="0" cellpadding="0" border="0"
               summary="">
          <!-- sundar added -->
          <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnAddRow" name="cmdAddRow_{$curr_blk/ID}"
                      id="cmdAddRow_{$curr_blk/ID}"
                      onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')">
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$curr_blk/READ_ONLY != '0'">
                  <xsl:attribute name="disabled">true</xsl:attribute>
                </xsl:if>
                <IMG id="imgAdd_{$curr_blk/ID}" SRC="{$imgPath_XSL}/Addrow.gif"
                     alt="Add Row"/>
              </BUTTON>
            </TD>
          </TR>
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnDelRow" name="cmdDelRow_{$curr_blk/ID}"
                      id="cmdDelRow_{$curr_blk/ID}"
                      onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')">
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$curr_blk/READ_ONLY != '0'">
                  <xsl:attribute name="disabled">true</xsl:attribute>
                </xsl:if>
                <IMG id="imgAdd_{$curr_blk/ID}" SRC="{$imgPath_XSL}/Delrow.gif"
                     alt="Delete Row"/>
              </BUTTON>
            </TD>
          </TR>
        </xsl:if>
          <TR CLASS="TRAddDelRow">
            <TD CLASS="TDAddDelRow">
              <BUTTON CLASS="BtnSingleView"
                      name="BTN_SINGLE_VIEW_{$curr_blk/ID}"
                      id="BTN_SINGLE_VIEW_{$curr_blk/ID}"
                      onClick="fnShowSingleViewForME('{$curr_blk/ID}')">
                <xsl:if test="normalize-space($curr_blk/WIDTH) = 0">
                    <xsl:attribute name="style">
                        <xsl:text>height:0px;width:0px;</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <IMG id="imgView_{$curr_blk/ID}" SRC="{$imgPath_XSL}/SingleView.gif"
                     alt="Single Record View"/>
              </BUTTON>
            </TD>
          </TR>
        </TABLE>
      </DIV>
    </NOBR>
  </xsl:template>
  <!--
       <xsl:template name="MultipleHandler_2">
              <xsl:param name="curr_blk" select="."/>
              <xsl:variable name="row"
                            select="substring-before($curr_blk/ABS_POS,',')"/>
              <xsl:variable name="col"
                            select="substring-after($curr_blk/ABS_POS,',')"/>
              <NOBR>
                     <DIV class="DIVAddDelRow" NAME="divAddDel_{$curr_blk/ID}"
                          id="divAddDel_{$curr_blk/ID}" STYLE="width:28px;">
                            <xsl:if test="$gPosition='absolute'">
                                   <xsl:attribute name="STYLE">
                                          <xsl:text>position:absolute;left:</xsl:text>
                                          <xsl:value-of select="$col + $curr_blk/WIDTH + 5"/>
                                          <xsl:text>px;top:</xsl:text>
                                          <xsl:value-of select="$row"/>
                                          <xsl:text>px;width:28px;</xsl:text>
                                   </xsl:attribute>
                            </xsl:if>
                     </DIV>
              </NOBR>
       </xsl:template>
       -->
  <!-- Now declare a template to get the reqd. no. of detail rows.
       	 Since XSL does'nt support iteration, use recursion -->
  <xsl:template name="detail_row">
    <xsl:param name="node_name" select="."/>
    <xsl:param name="num_rows" select="."/>
    <TR CLASS="TBODYTRMultiple" valign="middle">
      <TD CLASS="TBODYTDMultiple" align="center" valign="middle">
        <INPUT type="checkbox" name="chkDeleteRow" id="chkDeleteRow" onlclick="fnMulipleEntryRow_onClick()"
               title="Select this rows"/>
      </TD>
      <xsl:for-each select="$node_name/FIELD">
        <xsl:sort select="@COL" data-type="number" order="ascending"/>
        <xsl:apply-templates select="TYPE" mode="column"/>
      </xsl:for-each>
      <!--Adding a temparory TD to keep the Columns of fiedwidth !-->
      <TD CLASS="TBODYTDMultiple" style="width:100%">
        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
      </TD>
    </TR>
    <xsl:if test="$num_rows &gt; 1">
      <xsl:call-template name="detail_row">
        <xsl:with-param name="node_name" select="$node_name"/>
        <xsl:with-param name="num_rows" select="$num_rows - 1"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  
  <!-- sundar added for blk event handler -->
  <xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
      <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
  </xsl:template>

</xsl:stylesheet>
