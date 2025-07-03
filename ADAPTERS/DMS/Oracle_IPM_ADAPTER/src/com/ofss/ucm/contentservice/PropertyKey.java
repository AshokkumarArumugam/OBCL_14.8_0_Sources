
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for propertyKey.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="propertyKey">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="ID"/>
 *     &lt;enumeration value="NAME"/>
 *     &lt;enumeration value="SECTION"/>
 *     &lt;enumeration value="PARAMETER"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "propertyKey")
@XmlEnum
public enum PropertyKey {

    ID,
    NAME,
    SECTION,
    PARAMETER;

    public String value() {
        return name();
    }

    public static PropertyKey fromValue(String v) {
        return valueOf(v);
    }

}
