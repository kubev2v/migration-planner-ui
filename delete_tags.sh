# Listar todos los tags excepto el último
TAGS_TO_DELETE=$(git tag | grep -v "^$LATEST_TAG$")

# Borrar los tags locales
if [ -n "$TAGS_TO_DELETE" ]; then
  echo "Borrando tags locales..."
  echo "$TAGS_TO_DELETE" | xargs git tag -d
fi

# Borrar los tags en el remoto
if [ -n "$TAGS_TO_DELETE" ]; then
  echo "Borrando tags remotos..."
  echo "$TAGS_TO_DELETE" | xargs -I {} git push origin :refs/tags/{}
fi