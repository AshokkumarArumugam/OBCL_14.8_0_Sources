<?xml version= "1.0" encoding= "UTF-8" ?>

<!--
 * @(#)ExchangeFileResponse_AckFile.xsl
 * 
 * This source is part of the FlexNet Software System and is copyrighted by i-flex Solutions Limited. 
 * 
 * Copyright © 2005 i-flex Solutions Limited. All rights reserved. 
 * No part of this work may be reproduced, stored in a retrieval system, 
 * adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
 * graphic, optic recording or otherwise, translated in any language or computer language, 
 * without the prior written permission of i-flex Solutions Limited.
 * 
 * i-flex Solutions Limited.
 * 10-11, SDF I, SEEPZ, Andheri (East),
 * Mumbai - 400 096.
 * India
 * 
 * Modification History
 * Date	    		Version		Author			Description
 * _______________________________________________________________________________
 * Jul 20, 2005		1.0			Ashwini			Created
 * Oct 17, 2005		1.1			Ashutosh		Added exclude-result-prefixes to exclude namespace 
 * Oct 19,2005 		1.2	  		Ashutosh		Added SourceRef parameter to be set in Transaction Ref
 * Oct 20, 2005		1.3			Ashwini			Added a check for AckDescription
 * Oct 31,2005 		1.4	  		Ashwini			Modified to check for empty tags
 * Nov 09, 2005		1.5			Ashwini			Modified to process the first GblStatusAttributes only
 * Nov 14, 2005		1.6			Ashwini			Modified Parameter tag
 * Nov 17, 2005		1.7			Ashwini			Added a check for TransferRef in case of failure
 * Jul 06, 2006         1.8			Bikram			Added IssiRef	
 * Dec 11, 2006		1.9			Rishi Shah 		Modified Param IssiRef to FcssiRef
 * _______________________________________________________________________________
 -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  version="1.0" xmlns:Sw="urn:swift:snl:ns.Sw" xmlns:SwInt="urn:swift:snl:ns.SwInt" xmlns:SwGbl="urn:swift:snl:ns.SwGbl" xmlns:SwSec="urn:swift:snl:ns.SwSec" exclude-result-prefixes="SwSec SwGbl SwInt Sw" >
	
	<xsl:output method="xml" indent="yes" encoding="UTF-8" />
	
	<xsl:param name="TransactionRef"/>
	<xsl:param name="Responder"/>
	<xsl:param name="SourceRef"/>
	<xsl:param name="FcssiRef"/>
	<xsl:variable name="TransferAnswer"><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:TransferAnswer"/></xsl:variable>

	<xsl:template match="/">
		<AckFile>
			<Envelope>
				<TransactionRef><xsl:value-of select="$SourceRef"/></TransactionRef>
				<xsl:if test="$FcssiRef !=''">
					<FcssiRef><xsl:value-of select="$FcssiRef"/></FcssiRef>
				</xsl:if>
				<xsl:choose>
					<xsl:when test="/Sw:ExchangeFileResponse/SwGbl:Status[.!='']">
						<xsl:choose>
							<xsl:when test="/Sw:ExchangeFileResponse/Sw:TransferRef[.!='']">
								<TransferRef><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:TransferRef"/></TransferRef>
							</xsl:when>
							<xsl:otherwise>
								<TransferRef>Not Received</TransferRef>
							</xsl:otherwise>
						</xsl:choose>
						<Status>FAILURE</Status>
						<xsl:call-template name="GblStatus"></xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<TransferRef><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:TransferRef"/></TransferRef>
						<Status>SUCCESS</Status>
						<TransferAnswer><xsl:value-of select="$TransferAnswer"/></TransferAnswer>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:MsgId[.!='']">
							<MsgId><xsl:value-of select ="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:MsgId"/></MsgId>
						</xsl:if>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:CreationTime[.!='']">
							<CreationTime><xsl:value-of select ="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:CreationTime"/></CreationTime>
						</xsl:if>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:AckFileResponseHandle/Sw:AckDescription[.!='']">
							<AckDescription><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:AckFileResponseHandle/Sw:AckDescription"/></AckDescription>
						</xsl:if>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:RejectDescription[.!='']">
							<RejectDescription><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:RejectDescription"/></RejectDescription>
						</xsl:if>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:RejectInfo[.!='']">
							<RejectInfo><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:RejectInfo"/></RejectInfo>
						</xsl:if>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:Size[.!='']">
							<Size><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:Size"/></Size>
						</xsl:if>
						<xsl:choose>
							<xsl:when test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileOpResponseHandle/Sw:PutFileResponseHandle/Sw:Digest[.!='']">
								<DigestStatus>TRUE</DigestStatus>
							</xsl:when>
							<xsl:otherwise>
								<DigestStatus>FALSE</DigestStatus>
							</xsl:otherwise>
						</xsl:choose>
						<Responder><xsl:value-of select="$Responder"/></Responder>
						<xsl:if test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseHeader/SwInt:ResponseRef[.!='']">
							<ResponseRef><xsl:value-of select="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseHeader/SwInt:ResponseRef"/></ResponseRef>
						</xsl:if>
						<xsl:choose>
							<xsl:when test="/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:PDIndication[.!='']">
								<PdIndication>TRUE</PdIndication>
								<xsl:for-each select='/Sw:ExchangeFileResponse/Sw:FileResponseHandle/Sw:FileResponseE2EControl/Sw:PDIndication/Sw:EmissionList/Sw:EmissionTime'>
									<PdEmissionTime><xsl:value-of select= "."/></PdEmissionTime>
								</xsl:for-each>
							</xsl:when>
							<xsl:otherwise>
								<PdIndication>FALSE</PdIndication>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</Envelope>
		</AckFile>
	</xsl:template>
	
	<xsl:template name="GblStatus"> 
		<xsl:for-each select ='/Sw:ExchangeFileResponse/SwGbl:Status/SwGbl:StatusAttributes'>
			<xsl:if test='position()=1'>
				<GblStatus>
					<Severity><xsl:value-of select="SwGbl:Severity"/></Severity>
					<Code><xsl:value-of select="SwGbl:Code"/></Code>
					<xsl:for-each select='SwGbl:Parameter'>
						<Parameter></Parameter>
					</xsl:for-each>	
					<xsl:if test="SwGbl:Text[.!='']">
						<Text><xsl:value-of select= "SwGbl:Text"/></Text>
					</xsl:if>	
					<xsl:if test="SwGbl:Action[.!='']">
						<Action><xsl:value-of select= "SwGbl:Action"/></Action>
					</xsl:if>	
					<xsl:for-each select='SwGbl:Details'>
						<Details>
							<Code><xsl:value-of select= "SwGbl:Code"/></Code>
							<xsl:if test="SwGbl:Text[.!='']">
								<Text><xsl:value-of select= "SwGbl:Text"/></Text>
							</xsl:if>	
							<xsl:if test="SwGbl:Action[.!='']">
								<Action><xsl:value-of select= "SwGbl:Action"/></Action>
							</xsl:if>
						</Details>
					</xsl:for-each>			
				</GblStatus>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
