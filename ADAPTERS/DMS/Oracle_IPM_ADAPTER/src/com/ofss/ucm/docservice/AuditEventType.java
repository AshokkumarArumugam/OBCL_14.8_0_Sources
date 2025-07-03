
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AuditEventType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="AuditEventType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="DOCUMENT_COPY"/>
 *     &lt;enumeration value="DOCUMENT_CREATE"/>
 *     &lt;enumeration value="DOCUMENT_DELETE"/>
 *     &lt;enumeration value="DOCUMENT_MIGRATE"/>
 *     &lt;enumeration value="DOCUMENT_MODIFY_METADATA"/>
 *     &lt;enumeration value="DOCUMENT_MOVE"/>
 *     &lt;enumeration value="DOCUMENT_RETRIEVE"/>
 *     &lt;enumeration value="DOCUMENT_VERSION"/>
 *     &lt;enumeration value="SUPPORTING_CONTENT_CREATE"/>
 *     &lt;enumeration value="DEFINITION_CREATE"/>
 *     &lt;enumeration value="DEFINITION_DELETE"/>
 *     &lt;enumeration value="DEFINITION_MODIFY"/>
 *     &lt;enumeration value="SEARCH_EXECUTE"/>
 *     &lt;enumeration value="SYSTEM_SECURITY_MODIFY"/>
 *     &lt;enumeration value="ANNOTATION_MODIFIED"/>
 *     &lt;enumeration value="MBEAN_MODIFIED"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "AuditEventType")
@XmlEnum
public enum AuditEventType {

    DOCUMENT_COPY,
    DOCUMENT_CREATE,
    DOCUMENT_DELETE,
    DOCUMENT_MIGRATE,
    DOCUMENT_MODIFY_METADATA,
    DOCUMENT_MOVE,
    DOCUMENT_RETRIEVE,
    DOCUMENT_VERSION,
    SUPPORTING_CONTENT_CREATE,
    DEFINITION_CREATE,
    DEFINITION_DELETE,
    DEFINITION_MODIFY,
    SEARCH_EXECUTE,
    SYSTEM_SECURITY_MODIFY,
    ANNOTATION_MODIFIED,
    MBEAN_MODIFIED;

    public String value() {
        return name();
    }

    public static AuditEventType fromValue(String v) {
        return valueOf(v);
    }

}
