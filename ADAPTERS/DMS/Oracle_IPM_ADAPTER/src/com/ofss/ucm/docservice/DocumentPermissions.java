
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DocumentPermissions complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DocumentPermissions">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}BasePermissions">
 *       &lt;sequence>
 *         &lt;element name="view" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="write" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="delete" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="grantaccess" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="lockAdministrator" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="standard" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="restricted" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *         &lt;element name="hidden" type="{http://www.w3.org/2001/XMLSchema}short"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DocumentPermissions", propOrder = {
    "view",
    "write",
    "delete",
    "grantaccess",
    "lockAdministrator",
    "standard",
    "restricted",
    "hidden"
})
public class DocumentPermissions
    extends BasePermissions
{

    protected short view;
    protected short write;
    protected short delete;
    protected short grantaccess;
    protected short lockAdministrator;
    protected short standard;
    protected short restricted;
    protected short hidden;

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
     * Gets the value of the write property.
     * 
     */
    public short getWrite() {
        return write;
    }

    /**
     * Sets the value of the write property.
     * 
     */
    public void setWrite(short value) {
        this.write = value;
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

    /**
     * Gets the value of the lockAdministrator property.
     * 
     */
    public short getLockAdministrator() {
        return lockAdministrator;
    }

    /**
     * Sets the value of the lockAdministrator property.
     * 
     */
    public void setLockAdministrator(short value) {
        this.lockAdministrator = value;
    }

    /**
     * Gets the value of the standard property.
     * 
     */
    public short getStandard() {
        return standard;
    }

    /**
     * Sets the value of the standard property.
     * 
     */
    public void setStandard(short value) {
        this.standard = value;
    }

    /**
     * Gets the value of the restricted property.
     * 
     */
    public short getRestricted() {
        return restricted;
    }

    /**
     * Sets the value of the restricted property.
     * 
     */
    public void setRestricted(short value) {
        this.restricted = value;
    }

    /**
     * Gets the value of the hidden property.
     * 
     */
    public short getHidden() {
        return hidden;
    }

    /**
     * Sets the value of the hidden property.
     * 
     */
    public void setHidden(short value) {
        this.hidden = value;
    }

}
