if NOT "%~1" == "" goto mainproc

echo "Argument - lang code" 
exit

:mainproc

rm -f PonyDefendCastleGame-%2-%VERSION%-Win32.zip
7z a -mx9 PonyDefendCastleGame-%2-%VERSION%-Win32.zip ..\..\bin
7z a -mx9 PonyDefendCastleGame-%2-%VERSION%-Win32.zip ..\..\data

SET TMPDIR=%TEMP%\Jyf4yfaHtEoqZ
mkdir %TMPDIR%\bin
copy %QTDIR%\libgcc_s_dw2-1.dll  %TMPDIR%\bin
copy "%QTDIR%\libstdc++-6.dll"   %TMPDIR%\bin
copy %QTDIR%\libwinpthread-1.dll %TMPDIR%\bin
copy %QTDIR%\Qt5Core.dll         %TMPDIR%\bin
copy %QTDIR%\Qt5Script.dll       %TMPDIR%\bin
mkdir %TMPDIR%\data
echo "%1" > %TMPDIR%\data\deflang.json

7z a -mx9 PonyDefendCastleGame-%2-%VERSION%-Win32.zip %TMPDIR%\bin
7z a -mx9 PonyDefendCastleGame-%2-%VERSION%-Win32.zip %TMPDIR%\data
