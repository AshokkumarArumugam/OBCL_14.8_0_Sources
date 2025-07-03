<?xml version= "1.0" encoding= "UTF-8" ?>
<!--
*OFSS-COPYRIGHT BEGIN
*
*
*
* This source is part of the Oracle Flexcube Universal Banking Software System Software Product. 
* Copyright © 2016 , 2016, Oracle and/or its affiliates.  All rights reserved. 
*
* No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by
* any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any
* language or computer language, without the prior written permission of Oracle and/or its affiliates. 
*
* Oracle Financial Services Software Limited.
* Oracle Park, Off Western Express Highway,
* Goregaon (East), 
* Mumbai - 400 063, India.
*
*OFSS COPYRIGHT END
**      OFSS CHANGE HISTORY
**
**	Modified By   :
** 	Modified on   :
** 	Description   :
** 	Search String :
**
**       OFSS CHANGE HISTORY END

 -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>
	<xsl:param name="MsgId"/>
	<xsl:param name="TransactionRef"/>
	<xsl:param name="FcssiRef"/>
	<xsl:param name = "Description"/>
	<xsl:param name="DuplicationError"/>
	<xsl:template match="/" >
		<ErrorInfo>
			<TransactionRef><xsl:value-of select="$TransactionRef"/></TransactionRef>
			<xsl:if test="$FcssiRef!=''">
				<FcssiRef><xsl:value-of select="$FcssiRef"/></FcssiRef>
			</xsl:if>
			<IdMsg><xsl:value-of select="$MsgId"/></IdMsg>
			<Description><xsl:value-of select="$Description"/></Description>
			<xsl:if test="$DuplicationError!=''">
				<DuplicationError><xsl:value-of select="$DuplicationError"/></DuplicationError>
			</xsl:if>
		</ErrorInfo>
	</xsl:template>
</xsl:stylesheet>
