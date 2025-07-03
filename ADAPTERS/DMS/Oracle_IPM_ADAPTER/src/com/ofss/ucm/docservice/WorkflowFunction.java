
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for workflowFunction.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="workflowFunction">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="DocId"/>
 *     &lt;enumeration value="DocName"/>
 *     &lt;enumeration value="Version"/>
 *     &lt;enumeration value="CreateBy"/>
 *     &lt;enumeration value="CreateDate"/>
 *     &lt;enumeration value="ModifyBy"/>
 *     &lt;enumeration value="ModifyDate"/>
 *     &lt;enumeration value="MimeType"/>
 *     &lt;enumeration value="DocUrl"/>
 *     &lt;enumeration value="DocUrlRoot"/>
 *     &lt;enumeration value="DocSize"/>
 *     &lt;enumeration value="VolumeDate"/>
 *     &lt;enumeration value="Volume"/>
 *     &lt;enumeration value="AppId"/>
 *     &lt;enumeration value="AppName"/>
 *     &lt;enumeration value="BatchId"/>
 *     &lt;enumeration value="FieldValue"/>
 *     &lt;enumeration value="SupportingContent"/>
 *     &lt;enumeration value="True"/>
 *     &lt;enumeration value="False"/>
 *     &lt;enumeration value="FormatValue"/>
 *     &lt;enumeration value="PolicyOverride"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "workflowFunction")
@XmlEnum
public enum WorkflowFunction {

    @XmlEnumValue("DocId")
    DOC_ID("DocId"),
    @XmlEnumValue("DocName")
    DOC_NAME("DocName"),
    @XmlEnumValue("Version")
    VERSION("Version"),
    @XmlEnumValue("CreateBy")
    CREATE_BY("CreateBy"),
    @XmlEnumValue("CreateDate")
    CREATE_DATE("CreateDate"),
    @XmlEnumValue("ModifyBy")
    MODIFY_BY("ModifyBy"),
    @XmlEnumValue("ModifyDate")
    MODIFY_DATE("ModifyDate"),
    @XmlEnumValue("MimeType")
    MIME_TYPE("MimeType"),
    @XmlEnumValue("DocUrl")
    DOC_URL("DocUrl"),
    @XmlEnumValue("DocUrlRoot")
    DOC_URL_ROOT("DocUrlRoot"),
    @XmlEnumValue("DocSize")
    DOC_SIZE("DocSize"),
    @XmlEnumValue("VolumeDate")
    VOLUME_DATE("VolumeDate"),
    @XmlEnumValue("Volume")
    VOLUME("Volume"),
    @XmlEnumValue("AppId")
    APP_ID("AppId"),
    @XmlEnumValue("AppName")
    APP_NAME("AppName"),
    @XmlEnumValue("BatchId")
    BATCH_ID("BatchId"),
    @XmlEnumValue("FieldValue")
    FIELD_VALUE("FieldValue"),
    @XmlEnumValue("SupportingContent")
    SUPPORTING_CONTENT("SupportingContent"),
    @XmlEnumValue("True")
    TRUE("True"),
    @XmlEnumValue("False")
    FALSE("False"),
    @XmlEnumValue("FormatValue")
    FORMAT_VALUE("FormatValue"),
    @XmlEnumValue("PolicyOverride")
    POLICY_OVERRIDE("PolicyOverride");
    private final String value;

    WorkflowFunction(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static WorkflowFunction fromValue(String v) {
        for (WorkflowFunction c: WorkflowFunction.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
