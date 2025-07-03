create or replace package olpks_os as
--	olpks_os.spc - Routines allowing access to os level commands such as
--				 move, copy etc
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_os
**
** Module       : CORE SERVICES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------

**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes
*/




-- Package level Variables. 

os_name  varchar2(60); -- name of the operating system. Should be in global.
FLEX_HOST_PIPE constant char(14) := 'FLEX_HOST_PIPE'; 
MAX_PIPE_SIZE constant integer := 51200; -- 1/2 MB.  
ret_pipe_name varchar2(255); -- Session specific Pipe - Responses sent here

PIPE_TIMED_OUT    exception;
MESSAGE_TOO_BIG   exception;
INTERRUPT_OCCURED exception;

pragma exception_init(PIPE_TIMED_OUT,-20000);
pragma exception_init(MESSAGE_TOO_BIG,-20001);
pragma exception_init(INTERRUPT_OCCURED,-20002);


-- Execute any OS command
function fn_host(cmd_string varchar2) return number;

function fn_host_pipe_based(cmd_string varchar2) return number; -- fcc 3.8 retro (SFR 2020)made this funciton public


/* -- Copy file to a directory
function fn_copy(src_file varchar2,dest varchar2) return number;

-- Move file to a directory
function fn_move(src_file varchar2,dest varchar2) return number;

-- Delete file
function fn_delete(src_file varchar2) return number;

-- Create a directory
function fn_mkdir(dir_name varchar2) return number;

-- Remove a directory
function fn_rmdir(dir_name varchar2,forcible boolean := false) return number;
*/

-- pr_get_cmd_string is a routine used by proc to get the command string
-- and the return pipe name

--AutonomousDB_Changes start
/*
procedure pr_get_cmd_string(cmd_string out varchar2, ret_pipe out varchar2,
							cmd_type out varchar2, 
						    time_out in number := dbms_pipe.MAXWAIT); 

procedure pr_init_host_server; -- startup server
procedure pr_shutdown_host_server;
-- tuning
procedure pr_host(cmd_string varchar2);

procedure pr_cleanup; -- Remove session specific pipe.

procedure pr_reply(i integer,ret_pipe varchar2); -- return status of os cmd.
*/
--AutonomousDB_Changes end

end olpks_os;
/

create or replace synonym olpkss_os for olpks_os
/