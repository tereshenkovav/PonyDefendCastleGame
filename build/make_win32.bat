@echo off

mkdir ..\build-Release-manual
cd ..\build-Release-manual
C:\Qt\Qt5.14.1\5.14.1\mingw73_32\bin\qmake ..\PonyDefendCastleGame
make
