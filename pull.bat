@echo off
ssh -i main-key.pem admin@3.228.84.140 "cd /var/www && git pull"
