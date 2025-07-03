cd /data5/DEMO
zip /data1/Install_er/TT/system01.dbf.zip system01.dbf
zip /data1/Install_er/TT/sysaux01.dbf.zip sysaux01.dbf
zip /data1/Install_er/TT/users01.dbf.zip users01.dbf
zip /data1/Install_er/TT/fcj103_01.dbf.zip fcj103_01.dbf
zip /data1/Install_er/TT/undotbs02.dbf.zip undotbs02.dbf
cd /data1/Install_er/TT
touch Install_dbf.tar
tar rvf Install_dbf.tar system01.dbf.zip
tar rvf Install_dbf.tar sysaux01.dbf.zip
tar rvf Install_dbf.tar users01.dbf.zip
tar rvf Install_dbf.tar fcj103_01.dbf.zip
tar rvf Install_dbf.tar undotbs02.dbf.zip
