
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DocumentAbility.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="DocumentAbility">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="VIEWDOCUMENT"/>
 *     &lt;enumeration value="CREATEDOCUMENT"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "DocumentAbility")
@XmlEnum
public enum DocumentAbility {

    VIEWDOCUMENT,
    CREATEDOCUMENT;

    public String value() {
        return name();
    }

    public static DocumentAbility fromValue(String v) {
        return valueOf(v);
    }

}
