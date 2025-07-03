
package com.ofss.ucm.docservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ValidationFaultInfo complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ValidationFaultInfo">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}ImagingFaultInfo">
 *       &lt;sequence>
 *         &lt;element name="validationErrors" type="{http://imaging.oracle/}validationError" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ValidationFaultInfo", propOrder = {
    "validationErrors"
})
public class ValidationFaultInfo
    extends ImagingFaultInfo
{

    @XmlElement(nillable = true)
    protected List<ValidationError> validationErrors;

    /**
     * Gets the value of the validationErrors property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the validationErrors property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getValidationErrors().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ValidationError }
     * 
     * 
     */
    public List<ValidationError> getValidationErrors() {
        if (validationErrors == null) {
            validationErrors = new ArrayList<ValidationError>();
        }
        return this.validationErrors;
    }

}
