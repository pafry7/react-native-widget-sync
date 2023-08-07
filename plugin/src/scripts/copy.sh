#!/bin/bash

# ios files
for FILE in ./plugin/src/ios/static
do
        cp -R $FILE ./plugin/build/ios/static/
done

# android files
for FILE in ./plugin/src/android/static
do
        cp -R $FILE ./plugin/build/android/static/
done