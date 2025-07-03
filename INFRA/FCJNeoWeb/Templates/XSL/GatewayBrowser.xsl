<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html'/>
 <xsl:param name="collapsed"/>
 <xsl:param name="noScript"/>
 <xsl:param name="gateway_browser"/>
   <xsl:template match="*">
	<xsl:call-template name="functions"/>
	<html>
   <head>
    <title><xsl:value-of select="gateway_browser"/></title>
   </head>
   <body onLoad="fnLoad()" style="font-family:Ms Sans Serif; font-size:100%;"
         bgcolor="#E7F3FF">
    <table border="0" cellspacing="0" cellpadding="0" summary="">
		<tr>
			<td>
       <div onClick="showBranch('{generate-id(current())}');swapFolder('F{generate-id(current())}')"
            style="cursor:hand">
        <img name="imgNode" class="triggerImg" src="./Images/collapsed.gif"
             id="F{generate-id(current())}" alt="{$collapsed}"/>
					<xsl:text disable-output-escaping="yes">&#160;&#160;&#160;</xsl:text>
        <font color="blue" size="4pt">
         <xsl:text>&lt;</xsl:text>
        </font>
        <font color="#990000">
         <xsl:value-of select="name()"/>
        </font>
        <font color="blue" size="4pt">
         <xsl:text>&gt;</xsl:text>
        </font>
				</div>
				<span id="{generate-id(current())}">
					<xsl:for-each select="*">
						<xsl:call-template name="child"/>
					</xsl:for-each>
        <table style="width:100%;" cellspacing="0" cellpadding="0" summary="">
         <tr style="height:0px;">
          <td width="20px"></td>
					<td>
           <font color="blue" size="4pt">
            <xsl:text>&lt;/</xsl:text>
           </font>
           <font color="#990000">
            <xsl:value-of select="name()"/>
           </font>
           <font color="blue" size="4pt">
            <xsl:text>&gt;</xsl:text>
           </font>
					</td>
         </tr>
        </table>
				</span>
			</td>
		</tr>
	</table>
   </body>
  </html>
   </xsl:template>

   <xsl:template name="child">
  <table border="0" cellspacing="0" cellpadding="1" summary="">
		<tr>
			<td>
				<xsl:attribute name="style">
					<xsl:text>position:relative;left:10px;</xsl:text>
				</xsl:attribute>
				<xsl:if test="count(child::*) = 0">
					<xsl:attribute name="style">
						<xsl:text>position:relative;left:30px;</xsl:text>
					</xsl:attribute>
      <font color="blue" size="4pt">
       <xsl:text>&lt;</xsl:text>
      </font>
      <font color="#990000">
       <xsl:value-of select="name()"/>
      </font>
      <font color="blue" size="4pt">
       <xsl:text>&gt;</xsl:text>
      </font>
      <b>
       <xsl:value-of select="."/>
      </b>
      <font color="blue" size="4pt">
       <xsl:text>&lt;/</xsl:text>
      </font>
      <font color="#990000">
       <xsl:value-of select="name()"/>
      </font>
      <font color="blue" size="4pt">
       <xsl:text>&gt;</xsl:text>
      </font>
				</xsl:if>
     <xsl:if test="count(child::*) > 0">
      <div onClick="showBranch('{generate-id(current())}');swapFolder('F{generate-id(current())}')"
           style="cursor:hand">
       <img name="imgNode" class="triggerImg" src="./Images/collapsed.gif"
            id="F{generate-id(current())}" alt="{$collapsed}"/>
						<xsl:text disable-output-escaping="yes">&#160;&#160;&#160;</xsl:text>
       <font color="blue" size="4pt">
        <xsl:text>&lt;</xsl:text>
       </font>
       <font color="#990000">
        <xsl:value-of select="name()"/>
       </font>
       <font color="blue" size="4pt">
        <xsl:text>&gt;</xsl:text>
       </font>
					</div>
					<span id="{generate-id(current())}">
						<xsl:for-each select="*">
							<xsl:call-template name="child"/>
						</xsl:for-each>
       <table style="width:100%;" cellspacing="0" cellpadding="0" summary="">
        <tr style="height:0px;">
         <td width="20px"></td>
						<td>
          <font color="blue" size="4pt">
           <xsl:text>&lt;/</xsl:text>
          </font>
          <font color="#990000">
           <xsl:value-of select="name()"/>
          </font>
          <font color="blue" size="4pt">
           <xsl:text>&gt;</xsl:text>
          </font>
						</td>
        </tr>
       </table>
					</span>
				</xsl:if>
			</td>
		</tr>
	</table>
   </xsl:template>

   <xsl:template name="functions">
	<script language="javascript" DEFER="DEFER">	
		var openImg				= new Image();
		openImg.src				= "./Images/Flexblue/Icons/addrow.gif"; /*SFR#17255494 : Fix for 16811945*/

		var closedImg			= new Image();
		closedImg.src			=  "./Images/Flexblue/Icons/deleterow.gif"; /*SFR#17255494 : Fix for 16811945*/

		function fnLoad(){
			var obj = document.all;
        for(var objCnt=0; obj.length&gt;objCnt; objCnt++){
				if(obj[objCnt].tagName.toUpperCase() == 'IMG')
					obj[objCnt].click();
			}
			return true;
    } 
		function showBranch(branch){
			var objBranch = document.getElementById(branch).style;
			if(objBranch.display=="block"){		
				//collapse(branch);	
            objBranch.display="none";
            //uncomment this if the abovestatement is commented 
			}else{
				objBranch.display="block";
				//alert(document.getElementById(branch).offsetHeight)
				//expand(branch);
			}	
		}

		function swapFolder(img){
			objImg = document.getElementById(img);
			 /*SFR#17255494 : Fix for 16811945*/
			if(objImg.src.indexOf('deleterow')&gt;-1)
				objImg.src = openImg.src;
			else
				objImg.src = closedImg.src;
		}
	</script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
   </xsl:template>

</xsl:stylesheet>


<!--
				<xsl:if test="count(child::*) = 0">
					<b><xsl:value-of select="."/></b>
					<font color="blue"><xsl:text>&lt;/</xsl:text></font><font color="#990000"><xsl:value-of select="name()"/></font><font color="blue"><xsl:text>&gt;</xsl:text></font>
				</xsl:if>
				<xsl:if test="count(child::*) &gt; 0">
					<span id="{generate-id(current())}">
						<xsl:for-each select="*">
							<xsl:call-template name="child"/>
						</xsl:for-each>
						<font color="blue"><xsl:text>&lt;/</xsl:text></font><font color="#990000"><xsl:value-of select="name()"/></font><font color="blue"><xsl:text>&gt;</xsl:text></font>
					</span>
				</xsl:if> -->
