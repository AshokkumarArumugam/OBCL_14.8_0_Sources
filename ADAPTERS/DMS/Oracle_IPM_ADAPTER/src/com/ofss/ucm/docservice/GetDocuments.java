
package com.ofss.ucm.docservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getDocuments complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getDocuments">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="arg0" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
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
@XmlType(name = "getDocuments", propOrder = {
    "arg0",
    "sectionSet"
})
public class GetDocuments {

    @XmlElement(nillable = true)
    protected List<String> arg0;
    protected DocumentSectionSet sectionSet;

    /**
     * Gets the value of the arg0 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the arg0 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getArg0().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getArg0() {
        if (arg0 == null) {
            arg0 = new ArrayList<String>();
        }
        return this.arg0;
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
