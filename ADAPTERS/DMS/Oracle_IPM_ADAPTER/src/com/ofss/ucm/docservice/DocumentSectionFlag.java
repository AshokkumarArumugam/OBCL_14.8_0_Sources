
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DocumentSectionFlag.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="DocumentSectionFlag">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="PROPERTIES"/>
 *     &lt;enumeration value="FIELDVALUES"/>
 *     &lt;enumeration value="PERMISSIONS"/>
 *     &lt;enumeration value="HISTORY"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "DocumentSectionFlag")
@XmlEnum
public enum DocumentSectionFlag {

    PROPERTIES,
    FIELDVALUES,
    PERMISSIONS,
    HISTORY;

    public String value() {
        return name();
    }

    public static DocumentSectionFlag fromValue(String v) {
        return valueOf(v);
    }

}
