
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for retrieveVersionRenditionResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="retrieveVersionRenditionResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="rendition" type="{http://imaging.oracle/}rendition" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "retrieveVersionRenditionResponse", propOrder = {
    "rendition"
})
public class RetrieveVersionRenditionResponse {

    protected Rendition rendition;

    /**
     * Gets the value of the rendition property.
     * 
     * @return
     *     possible object is
     *     {@link Rendition }
     *     
     */
    public Rendition getRendition() {
        return rendition;
    }

    /**
     * Sets the value of the rendition property.
     * 
     * @param value
     *     allowed object is
     *     {@link Rendition }
     *     
     */
    public void setRendition(Rendition value) {
        this.rendition = value;
    }

}
