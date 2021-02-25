for srcfile in $( ls ./src/html ); do
  echo "build ${srcfile}"
  inliner -n ./src/html/${srcfile} > dist/html/${srcfile}
done
