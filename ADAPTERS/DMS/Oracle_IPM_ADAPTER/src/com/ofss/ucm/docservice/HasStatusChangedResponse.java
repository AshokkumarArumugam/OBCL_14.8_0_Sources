
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for hasStatusChangedResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="hasStatusChangedResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="statusChanged" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "hasStatusChangedResponse", propOrder = {
    "statusChanged"
})
public class HasStatusChangedResponse {

    protected boolean statusChanged;

    /**
     * Gets the value of the statusChanged property.
     * 
     */
    public boolean isStatusChanged() {
        return statusChanged;
    }

    /**
     * Sets the value of the statusChanged property.
     * 
     */
    public void setStatusChanged(boolean value) {
        this.statusChanged = value;
    }

}
