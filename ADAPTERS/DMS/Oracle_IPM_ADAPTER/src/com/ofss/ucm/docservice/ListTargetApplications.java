
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for listTargetApplications complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="listTargetApplications">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ability" type="{http://imaging.oracle/}DocumentAbility" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "listTargetApplications", propOrder = {
    "ability"
})
public class ListTargetApplications {

    protected DocumentAbility ability;

    /**
     * Gets the value of the ability property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentAbility }
     *     
     */
    public DocumentAbility getAbility() {
        return ability;
    }

    /**
     * Sets the value of the ability property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentAbility }
     *     
     */
    public void setAbility(DocumentAbility value) {
        this.ability = value;
    }

}
