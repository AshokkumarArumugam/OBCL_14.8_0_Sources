<?xml version="1.0" encoding="UTF-8"?>
<!--====================================================================================================
**
** File Name    : sortSearchResults.xsl
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
	$Log: sortSearchResults.xsl.v $
	Revision 1.0.1.0  2005/06/21 10:20:23  IDVINITHAN
	Unit Creation.

	Revision 1.0  2005/06/21 08:32:49  IDVINITHAN
	Unit Creation
 
	********************************** END   OF LOG HISTORY **************************************

-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html' />
	<xsl:template match="/HELP" >
		<xsl:apply-templates select="SCREEN/FIELD"/>
		</xsl:template>
	<xsl:template match="FIELD">
		<xsl:value-of disable-output-escaping="yes" select="LONG_DESC" />
	</xsl:template>
</xsl:stylesheet>
