all: config

config:
	@sudo apt install -y nodejs npm  
	@npm install  
	@npm install mongodb
	@