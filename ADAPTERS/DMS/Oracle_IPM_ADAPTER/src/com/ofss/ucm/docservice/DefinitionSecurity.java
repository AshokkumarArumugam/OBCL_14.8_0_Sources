
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DefinitionSecurity complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DefinitionSecurity">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}BaseSecurity">
 *       &lt;sequence>
 *         &lt;element name="permissions" type="{http://imaging.oracle/}DefinitionPermissions" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DefinitionSecurity", propOrder = {
    "permissions"
})
public class DefinitionSecurity
    extends BaseSecurity
{

    protected DefinitionPermissions permissions;

    /**
     * Gets the value of the permissions property.
     * 
     * @return
     *     possible object is
     *     {@link DefinitionPermissions }
     *     
     */
    public DefinitionPermissions getPermissions() {
        return permissions;
    }

    /**
     * Sets the value of the permissions property.
     * 
     * @param value
     *     allowed object is
     *     {@link DefinitionPermissions }
     *     
     */
    public void setPermissions(DefinitionPermissions value) {
        this.permissions = value;
    }

}
