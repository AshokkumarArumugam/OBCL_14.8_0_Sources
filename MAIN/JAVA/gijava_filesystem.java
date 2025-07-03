create or replace and compile java source named gijava_filesystem as
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2010 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  Sarina Afrin
  Change Description :  FC12.0.2_Local_Clearing_Interface retroed from FC11.3.1 Vietnam Cluster
  Changed Date       :  17/05/2013
  Search String      :  FC_12.0.2_Local_Clearing_Interface
  
**  Modified By          : Neethu Sreedharan
**  Modified On          : 15-Jun-2017
**  Modified Reason      : File List length with p_filter * when exceeds 32767 system should stop and 
                           return the list. Added condtion to do the same. 
**  Retro Source         : 9NT1606_12_0_2_NATIONAL_BANK_OF_EGYPT
**  Search String        : 9NT1606_12_4_RETRO_12_0_2_26229817
  -------------------------------------------------------------------------------------------------------
  */import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.lang.*;
import java.util.*;
import java.util.regex.Pattern;

public class GIJava_FileSystem {

public static String ListFilesInFolder (String p_path,String p_Filter) {
    String list = "";
    String szF ="";
    int nFilterLen =0;
    File myFile = new File (p_path);
    String[] arrayList = myFile.list();
   
    Arrays.sort(arrayList, String.CASE_INSENSITIVE_ORDER);
    //FC_12.0.2_Local_Clearing_Interface starts
    if (p_Filter.equals("*"))
    {
       for (int i=0; i < arrayList.length; i++) {
		   if ((list.length() + arrayList[i].length() + 1) > 32767) //9NT1606_12_4_RETRO_12_0_2_26229817 changes 
           break; //9NT1606_12_4_RETRO_12_0_2_26229817 changes 
           if (!list.equals(""))
              list += "," + arrayList[i];
           else
              list += arrayList[i];

       }
	   
    }
    else
    {
    //FC_12.0.2_Local_Clearing_Interface ends
    nFilterLen = p_Filter.length();    
    for (int i=0; i < arrayList.length; i++) {
      //get the filter element from the file
      if ( arrayList[i].length() > nFilterLen )
      {
            szF = arrayList[i].substring(0,nFilterLen);
      }    
      else
          szF =""; 
      //compare with the filter
      if(szF.equals(p_Filter)) 
      {
      //if(Pattern.matches("*", szF)==true)
        if ((list.length() + arrayList[i].length() + 1) > 32767)
          break;
          
        if (!list.equals(""))
          list += "," + arrayList[i];//.substring(0,2);
        else
          list += arrayList[i];//.substring(0,2);
       }
       }
       }//FC_12.0.2_Local_Clearing_Interface
          return list;
     
  }
};
/
