
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getAnnotationsResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getAnnotationsResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="annotationData" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getAnnotationsResponse", propOrder = {
    "annotationData"
})
public class GetAnnotationsResponse {

    protected byte[] annotationData;

    /**
     * Gets the value of the annotationData property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getAnnotationData() {
        return annotationData;
    }

    /**
     * Sets the value of the annotationData property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setAnnotationData(byte[] value) {
        this.annotationData = ((byte[]) value);
    }

}
