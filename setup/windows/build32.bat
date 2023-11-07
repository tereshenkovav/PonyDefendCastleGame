SET VERSION=1.0.0
SET QTDIR=C:\Qt\Qt5.14.1\5.14.1\mingw73_32\bin
"C:\Program Files (x86)\NSIS\makensis.exe" /DQTDIR=%QTDIR% /DVERSION=%VERSION% /DGAMELANG=ru /DUPPERLANG=RU PonyDefendCastleGame.nsi
"C:\Program Files (x86)\NSIS\makensis.exe" /DQTDIR=%QTDIR% /DVERSION=%VERSION% /DGAMELANG=en /DUPPERLANG=EN PonyDefendCastleGame.nsi

call create_zip32.bat ru RU
call create_zip32.bat en EN
