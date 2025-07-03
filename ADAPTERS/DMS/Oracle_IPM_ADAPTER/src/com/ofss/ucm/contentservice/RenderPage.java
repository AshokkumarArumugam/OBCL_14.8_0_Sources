
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for renderPage complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="renderPage">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="pageData" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *         &lt;element name="resourceUrl" type="{http://www.w3.org/2001/XMLSchema}anyURI" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "renderPage", propOrder = {
    "pageData",
    "resourceUrl"
})
public class RenderPage {

    protected byte[] pageData;
    @XmlSchemaType(name = "anyURI")
    protected String resourceUrl;

    /**
     * Gets the value of the pageData property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getPageData() {
        return pageData;
    }

    /**
     * Sets the value of the pageData property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setPageData(byte[] value) {
        this.pageData = ((byte[]) value);
    }

    /**
     * Gets the value of the resourceUrl property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResourceUrl() {
        return resourceUrl;
    }

    /**
     * Sets the value of the resourceUrl property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResourceUrl(String value) {
        this.resourceUrl = value;
    }

}
