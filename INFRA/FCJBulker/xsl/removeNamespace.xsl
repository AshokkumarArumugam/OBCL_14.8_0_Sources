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
 <xsl:template match="/|comment()|processing-instruction()">
    <xsl:copy>
      <!-- go process children (applies to root node only) -->
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="*">
    <xsl:element name="{local-name()}">
      <!-- go process attributes and children -->
      <xsl:apply-templates select="@*|node()"/>
    </xsl:element>
  </xsl:template>

  <!--<xsl:template match="@*">
    <xsl:attribute name="{local-name()}">
      <xsl:value-of select="."/>
    </xsl:attribute>
  </xsl:template>-->

</xsl:stylesheet>