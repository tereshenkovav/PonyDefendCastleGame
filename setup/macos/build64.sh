for i in `git tag --list --sort=v:refname`; do BUILDTAG=$i; done

for i in `git rev-parse HEAD`; do BUILDCOMMIT=$i; done
BUILDCOMMIT=${BUILDCOMMIT:0:8}

for i in `git rev-parse --abbrev-ref HEAD`; do BUILDBRANCH=$i; done

echo $BUILDTAG $BUILDCOMMIT $BUILDBRANCH

VERSION=${BUILDTAG:1}

echo {  > ../../data/version.json
echo \"tag\":\"$BUILDTAG\", >> ../../data/version.json
echo \"commit\":\"$BUILDCOMMIT\", >> ../../data/version.json
echo \"branch\":\"$BUILDBRANCH\" >> ../../data/version.json
echo }  >> ../../data/version.json

QTDIR=~/Qt5.10.1/5.10.1/clang_64

appdir=/tmp/PonyDefendCastleGame.app
mkdir $appdir
mkdir $appdir/Contents
mkdir $appdir/Contents/MacOS
mkdir $appdir/Contents/Frameworks
mkdir $appdir/Contents/Resources

cp Info.plist $appdir/Contents
cp Pkginfo $appdir/Contents

cp PonyDefendCastleGame.icns $appdir/Contents/Resources

cp ../../bin/PonyDefendCastleGame.app/Contents/MacOS/PonyDefendCastleGame $appdir/Contents/MacOS
cp -r ../../data $appdir/Contents/MacOS

cp -R /usr/local/lib/libcsfml*.dylib $appdir/Contents/Frameworks
cp -R /usr/local/lib/libsfml*.dylib $appdir/Contents/Frameworks

cp -R /Library/Frameworks/FLAC.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/freetype.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/ogg.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/OpenAL.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/vorbis.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/vorbisenc.framework $appdir/Contents/Frameworks
cp -R /Library/Frameworks/vorbisfile.framework $appdir/Contents/Frameworks
cp -R $QTDIR/lib/QtCore.framework $appdir/Contents/Frameworks
cp -R $QTDIR/lib/QtScript.framework $appdir/Contents/Frameworks

cd /tmp 

echo "\"en\"" > $appdir/Contents/MacOS/data/deflang.json
zip -r9 PonyDefendCastleGame-EN-$VERSION-MacOS.app.zip PonyDefendCastleGame.app
hdiutil create -srcfolder $appdir -volname "PonyDefendCastleGame" -fs HFS+ -fsargs "-c c=64,a=16,e=16" -format UDZO -size 40000k -imagekey zlib-level=9 PonyDefendCastleGame-EN-$VERSION-MacOS.dmg

echo "\"ru\"" > $appdir/Contents/MacOS/data/deflang.json
zip -r9 PonyDefendCastleGame-RU-$VERSION-MacOS.app.zip PonyDefendCastleGame.app
hdiutil create -srcfolder $appdir -volname "PonyDefendCastleGame" -fs HFS+ -fsargs "-c c=64,a=16,e=16" -format UDZO -size 40000k -imagekey zlib-level=9 PonyDefendCastleGame-RU-$VERSION-MacOS.dmg
