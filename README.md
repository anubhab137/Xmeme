# X-MEME, a simple project to memeify your life.

This is a REST API server where an user can submit his/her meme and view the latest 100 memes sent by all other users including him/her.
We also provide an edit option to make changes to your previous submission and the server automatically checks for reposts during submission of a meme.
The server is built using Node.js and the express framework and the dynamic interface is provided by the pug view engine.
We have used a local Mongo DataBase that gets automatically created once you start the app on your local machine and you can view the contents of the database using a GUI like Mongo Compass.

To start the application on your local machine, first clone the repo. Make sure you have MongoDB installed on your machine and start it by running the following line of code in the terminal:

```sudo systemctl start mongod```

To know more about MongoDB installation and starting it, head over to: [Install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

The bash scripts take care of all other stuff. You just need to give permission to the server-run.sh file using the command:

```chmod +x server-run.sh```

Run the server by executing the command:

```./server-run.sh```

Head over to the 8081 port on your localhost and enjoy!
