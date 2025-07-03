
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getSupportingContentResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getSupportingContentResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="supportingContentData" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getSupportingContentResponse", propOrder = {
    "supportingContentData"
})
public class GetSupportingContentResponse {

    protected byte[] supportingContentData;

    /**
     * Gets the value of the supportingContentData property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getSupportingContentData() {
        return supportingContentData;
    }

    /**
     * Sets the value of the supportingContentData property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setSupportingContentData(byte[] value) {
        this.supportingContentData = ((byte[]) value);
    }

}
