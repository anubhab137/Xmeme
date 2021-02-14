wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get update
sudo apt-get install -y node
sudo apt-get install -y npm
sudo apt-get install -y nodemon
sudo apt-get install -y express
sudo apt-get install -y mongodb
sudo apt-get install -y pug
sudo apt-get install -y debug
sudo apt-get install -y cookie-parser
sudo apt-get install -y morgan
sudo apt-get install -y http-errors



