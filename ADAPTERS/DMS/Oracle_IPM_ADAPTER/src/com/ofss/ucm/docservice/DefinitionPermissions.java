
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DefinitionPermissions complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DefinitionPermissions">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}BasePermissions">
 *       &lt;sequence>
 *         &lt;element name="view" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="modify" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="delete" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="grantaccess" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DefinitionPermissions", propOrder = {
    "view",
    "modify",
    "delete",
    "grantaccess"
})
public class DefinitionPermissions
    extends BasePermissions
{

    protected short view;
    protected short modify;
    protected short delete;
    protected short grantaccess;

    /**
     * Gets the value of the view property.
     * 
     */
    public short getView() {
        return view;
    }

    /**
     * Sets the value of the view property.
     * 
     */
    public void setView(short value) {
        this.view = value;
    }

    /**
     * Gets the value of the modify property.
     * 
     */
    public short getModify() {
        return modify;
    }

    /**
     * Sets the value of the modify property.
     * 
     */
    public void setModify(short value) {
        this.modify = value;
    }

    /**
     * Gets the value of the delete property.
     * 
     */
    public short getDelete() {
        return delete;
    }

    /**
     * Sets the value of the delete property.
     * 
     */
    public void setDelete(short value) {
        this.delete = value;
    }

    /**
     * Gets the value of the grantaccess property.
     * 
     */
    public short getGrantaccess() {
        return grantaccess;
    }

    /**
     * Sets the value of the grantaccess property.
     * 
     */
    public void setGrantaccess(short value) {
        this.grantaccess = value;
    }

}
