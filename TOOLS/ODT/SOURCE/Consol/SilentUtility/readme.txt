  -------------------------------------------------------------------------------------------------------
  ** No part of this work may be reproduced, stored in a retrieval system, adopted 
  ** or transmitted in any form or by any means, electronic, mechanical, 
  ** photographic, graphic, optic recording or otherwise, translated in any 
  ** language or computer language, without the prior written permission of 
  ** Oracle and/or its affiliates. 
  ** 
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East), 
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  
  
  
  Silent ODT PreRequesites
  -----------------------------
  jre 1.6 or higher versions Required 
  
  Configuration in resource/SilentOdt.properties
  ---------------------------------------
  1) Maintain ODT Database schema details in resources/SilentOdt.properties 
     Sample:
	 Use ODTPassEncryption.bat to get encrypted details and use them for below property.
	 OdtJdbcUrl=hp7ejgc9K6sJv5QlICmQPJSkHzMsQVpHicWQw37cOXi+b7EJINSIKyMgGMLDbgxQ
	 OdtDbUser=ODT121
	 OdtDbPassword=yk1+u2KBSAPfS28ByFzIew==
	 SymetricKey=oraclefinancials
  2) Set Logger Properties in the same file
      Sample:
	    logreqd = Y
        logpath = D:/RADTOOL/log.txt
		level = INFO
  3) Set Sytem Properties like JAVA_HOME,WEBLOGIC_HOME and WAS_HOME. 
     These are optional and would be used for generating template Ant scripts
  
   Configuration in resource/OdtOperations.properties  
   ---------------------------------------------
   1) Configure the Operations files as per Requirement.
      Sample Operations properties files are provided; which explains the fields.
   2) Execution of Operation will be as per the sequence maintained in Operation.properties
       Example :
	       1.operation = LOGIN
		           --
		   2.operation= SETRELEASE
		         --
		   3.operation=REFRESH 
		 If sequence of operations is as above , then Login Operation , Set Release and Refresh operations would be processed in respective sequence
   3) LOGIN should always be the first Operation
   
   Operations Supported in SilentODT Tool
   --------------------------------------------------------------------------
   1) LOGIN
   2) SETRELEASE : Setting Release and Environment Details
   3) BULKGENERATION: Bulk Generation of artefacts from RADXMLs
   4) REFRESH : Bulk upgrade/refresh of RADXMLs.
   5) SXML_REFRESH : ServiceXML Upgrade Utility
   6) SXML_UPDATER : ServiceXML Auto Update utility
   7) SXML_BULKGENERATION : Generation of Web service artefacts
   8) SERVICE_DOCUMENT_GENERATION : Generation of Gateway Documents(PDF and XML)
   
   Establishing database Connections with FLEXCUBE schema
   -------------------------------------------------------------
   1) Tool Fetches Environment details as maintained in ODT database in RDTM_ENV_DETAILS table.
      jdbc thin url will be derived as : 
	    jdbc:oracle:thin:@DB_HOSTNAME:DB_PORT:DB_INSTANCE
		username : DB_SCHEMA
		password : DB_PASSWORD
   2) If data provided in RDTM_ENV_MASTER is not correct OR FLEXCUBE DB Server is a clustered database,
        jdbc thin url details can be provided in env_config.xml
		Sample Data is provided in env_config.xml provided.
		Release ID and Environment ID should match the details in ODT schema
		
    Configuration in resource/GW_CONFIG.properties 
  -----------------------------------------------------------------
    Provide Details in GW_CONFIG for generating Gateway web-services Property Files
	This has to be placed in the server in the path mentioned in property File GW_WS_PROP_FILE_PATH Parameter
	
	
	
     
	     