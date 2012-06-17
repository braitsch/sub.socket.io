#[sub.socket.io](http://chat.braitsch.io/)

####An example of how to share a single Socket.IO instance over multiple subdomains in the form of running three independent chat servers.

## Installation

```
git clone git://github.com/braitsch/sub.socket.io.git socket-io-example
cd socket-io-example
ls -al
```

This project contains three separate applications, a root application (mydomain.com) that instantiates the Socket.IO instance and two subdomain applications that listen for incoming connections in their own namespace. 

```
mydomain.com
sub1.mydomain.com
sub2.mydomain.com
```

Note these applications can obviously be anything you like but for the purposes of this example they are just three instances of the exact same chat application running in three separate namespaces.

So to get these up and running, cd into each application and install its dependencies :

```
cd mydomain.com
npm install -d
cd ../sub1.mydomain.com
npm install -d
cd ../sub2.mydomain.com
npm install -d
cd ../mydomain.com
```

Now open your `/etc/hosts` file in your editor of choice and add the following two subdomains so we can view them in a browser. 

Somewhere after **127.0.0.1 localhost** and before **255.255.255.255 broadcasthost** add the following two lines :

```
127.0.0.1 sub1.localhost
127.0.0.1 sub2.localhost
```

Save and exit the file.
Ensure you are inside of the **mydomain.com** directory and start the root application.

```
node app
```

Now point your browser at :

```
http://localhost:8080
http://sub1.localhost:8080
http://sub1.localhost:8080
```

And you should have three isolated instances of the chat server running, all sharing the same Socket.IO instance.

[More info about how the actual chat application works on my blog](http://www.quietless.com/kitchen/building-a-node-js-chat-application-and-sharing-socket-io-across-multiple-subdomains/)