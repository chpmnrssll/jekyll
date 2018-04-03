#!/bin/bash
echo "Counting lines of code in repo..."
touch _data/linesOfCode.json
cloc --by-percent c --exclude-dir=vendor,_site --json --report-file=_data/linesOfCode.json *
