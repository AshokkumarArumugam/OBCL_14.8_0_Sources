<?xml version= "1.0" encoding= "UTF-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:Sw="urn:swift:snl:ns.Sw" xmlns:SwInt="urn:swift:snl:ns.SwInt" xmlns:SwGbl="urn:swift:snl:ns.SwGbl" xmlns:SwSec="urn:swift:snl:ns.SwSec" xmlns:xalan="http://xml.apache.org/xalan">

	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>

	<xsl:param name="SignDN" />
	<xsl:param name="DigestRef" />
	<xsl:param name="DigestAlgorithm" />
	<xsl:param name="DigestValue" />
	<xsl:param name="ManifestNodeSet" />
	<xsl:variable name='Manifest' select="xalan:nodeset($ManifestNodeSet)" />
	
	<xsl:template match="/">
			<Sw:ExchangeFileRequest>
				<SwSec:AuthorisationContext>
					<xsl:copy-of select="/Sw:ExchangeFileRequest/SwSec:AuthorisationContext/SwSec:UserDN" />
				</SwSec:AuthorisationContext>
				<Sw:FileRequest> 
				
					<xsl:copy-of select="/Sw:ExchangeFileRequest/Sw:FileRequest/Sw:FileRequestControl" />
					<xsl:copy-of select="/Sw:ExchangeFileRequest/Sw:FileRequest/Sw:FileRequestE2EControl" />
					<xsl:copy-of select="/Sw:ExchangeFileRequest/Sw:FileRequest/Sw:FileRequestHeader" />
					<xsl:copy-of select="/Sw:ExchangeFileRequest/Sw:FileRequest/Sw:FileOpRequest" />
					<xsl:call-template name="SignatureList"></xsl:call-template>
				</Sw:FileRequest>
		</Sw:ExchangeFileRequest>
	</xsl:template>
			
	
	<xsl:template name="SignatureList">
			<SwSec:SignatureList>
				<SwSec:Signature>
				   <SwSec:KeyInfo>
					<SwSec:SignDN>cn=issacusr2,ou=paymtcoepune10,o=ptsainff,o=swift</SwSec:SignDN>
				   </SwSec:KeyInfo>
				<SwSec:Manifest>

					<Sw:Reference>
						<Sw:DigestRef>Sw.FARequestHeader</Sw:DigestRef>
					</Sw:Reference>

					<Sw:Reference>
						<Sw:DigestRef>Sw.File.Put.Request and RND</Sw:DigestRef>
					</Sw:Reference>

					<!--	<Sw:Reference>
						
						<xsl:if test="$DigestRef!=''">
						<Sw:DigestRef>
							<xsl:value-of select="$DigestRef" />
						</Sw:DigestRef>
						</xsl:if>
							
						<xsl:if test="$DigestAlgorithm!=''">
							<Sw:DigestAlgorithm>
								<xsl:value-of select="$DigestAlgorithm" />
							</Sw:DigestAlgorithm>
						</xsl:if>
						<xsl:if test="$DigestValue!=''">
							<Sw:DigestValue>
								<xsl:value-of select="$DigestValue" />
							</Sw:DigestValue>
						</xsl:if>
					</Sw:Reference>-->

				</SwSec:Manifest>
				</SwSec:Signature>
			</SwSec:SignatureList>
	</xsl:template>


</xsl:stylesheet>

