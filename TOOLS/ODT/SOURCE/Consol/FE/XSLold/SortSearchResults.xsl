<?xml version="1.0" encoding="UTF-8"?>
<!--====================================================================================================
**
** File Name    : SortSearchResults.xsl
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from i-flex
** solutions limited.

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2006 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.
   	
	********************************** START OF LOG HISTORY **************************************
	$Log: SortSearchResults.xsl.v $
	Revision 1.0  2005/07/08 12:13:18  IDVINITHAN
	Unit Creation
 
	********************************** END   OF LOG HISTORY **************************************

-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
  <xsl:template match="/">
          <xsl:for-each select="SUMMARY/HELPDEFN">
            <xsl:sort select="SEARCHRANK" data-type='number' order="descending"/>
            <HELPDEFN ID="{@ID}">
              <SEARCHSTRING HREF="GlobalAuditEntry.xml"><xsl:value-of select="SEARCHSTRING" /></SEARCHSTRING>
              <SEARCHXML><xsl:value-of select="SEARCHXML" /></SEARCHXML>
              <SEARCHRANK><xsl:value-of select="SEARCHRANK" /></SEARCHRANK>
            </HELPDEFN>
          </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
