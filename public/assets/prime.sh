#!/usr/bin/env sh

FILENAME=$1
FRAMES=$2
NUM=$3
SIZE=$4

for (( frame=0; frame<$FRAMES; frame++ ))
do
primitive -i $FILENAME.* -m 8 -n $NUM -o $FILENAME$frame.png -s $SIZE -v
done

ffmpeg -r 10 -f image2 -i $FILENAME%d.png -vcodec libx264 -crf 15 -pix_fmt yuv420p $FILENAME.mp4
