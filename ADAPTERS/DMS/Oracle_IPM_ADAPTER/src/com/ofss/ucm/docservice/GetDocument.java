
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getDocument complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getDocument">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="documentId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sectionSet" type="{http://imaging.oracle/}DocumentSectionSet" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getDocument", propOrder = {
    "documentId",
    "sectionSet"
})
public class GetDocument {

    protected String documentId;
    protected DocumentSectionSet sectionSet;

    /**
     * Gets the value of the documentId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentId() {
        return documentId;
    }

    /**
     * Sets the value of the documentId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentId(String value) {
        this.documentId = value;
    }

    /**
     * Gets the value of the sectionSet property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentSectionSet }
     *     
     */
    public DocumentSectionSet getSectionSet() {
        return sectionSet;
    }

    /**
     * Sets the value of the sectionSet property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentSectionSet }
     *     
     */
    public void setSectionSet(DocumentSectionSet value) {
        this.sectionSet = value;
    }

}
