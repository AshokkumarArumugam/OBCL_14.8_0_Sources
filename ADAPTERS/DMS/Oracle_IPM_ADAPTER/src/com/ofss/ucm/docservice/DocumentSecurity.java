
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DocumentSecurity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DocumentSecurity">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}BaseSecurity">
 *       &lt;sequence>
 *         &lt;element name="permissions" type="{http://imaging.oracle/}DocumentPermissions" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DocumentSecurity", propOrder = {
    "permissions"
})
public class DocumentSecurity
    extends BaseSecurity
{

    protected DocumentPermissions permissions;

    /**
     * Gets the value of the permissions property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentPermissions }
     *     
     */
    public DocumentPermissions getPermissions() {
        return permissions;
    }

    /**
     * Sets the value of the permissions property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentPermissions }
     *     
     */
    public void setPermissions(DocumentPermissions value) {
        this.permissions = value;
    }

}
