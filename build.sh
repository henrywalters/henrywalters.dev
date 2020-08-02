#!/bin/sh

OUTDIR="/usr/share/nginx/html"

echo "Building HaDev.io"

cd web && npm run build

echo "Success"
echo "Syncing to outgoing dir: $OUTDIR"
  
rsync -a dist/ $OUTDIR

echo "Success"
