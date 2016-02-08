apc app create paste2 -e SITE_NAME='http://paste.demo.apcera.net/paste' -r http://paste.demo.apcera.net --batch
apc service create mysqldatabase-paste2 -p mysqldatabase-provider -j paste2 --batch
apc app start paste2
