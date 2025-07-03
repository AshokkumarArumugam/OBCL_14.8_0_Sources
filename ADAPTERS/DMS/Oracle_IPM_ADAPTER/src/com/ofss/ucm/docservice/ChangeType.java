
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for changeType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="changeType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="AppendPage"/>
 *     &lt;enumeration value="InsertPage"/>
 *     &lt;enumeration value="DeletePage"/>
 *     &lt;enumeration value="MovePage"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "changeType")
@XmlEnum
public enum ChangeType {

    @XmlEnumValue("AppendPage")
    APPEND_PAGE("AppendPage"),
    @XmlEnumValue("InsertPage")
    INSERT_PAGE("InsertPage"),
    @XmlEnumValue("DeletePage")
    DELETE_PAGE("DeletePage"),
    @XmlEnumValue("MovePage")
    MOVE_PAGE("MovePage");
    private final String value;

    ChangeType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static ChangeType fromValue(String v) {
        for (ChangeType c: ChangeType.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
