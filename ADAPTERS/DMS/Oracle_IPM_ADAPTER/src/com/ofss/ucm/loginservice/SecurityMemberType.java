
package com.ofss.ucm.loginservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for SecurityMemberType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="SecurityMemberType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="USER"/>
 *     &lt;enumeration value="GROUP"/>
 *     &lt;enumeration value="ROLE"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "SecurityMemberType")
@XmlEnum
public enum SecurityMemberType {

    USER,
    GROUP,
    ROLE;

    public String value() {
        return name();
    }

    public static SecurityMemberType fromValue(String v) {
        return valueOf(v);
    }

}
