<data>
{
	"urlName": "setting-up",
  "date": "February 3, 2013",
  "title": "Getting Started With Node",
  "synopsis": "",
  "tags": ["ssc"]
}
</data>

This is the second post in a series about building a static site compiler in NodeJS. If you want to view the rest, visit the [Static Site Compiler](~tags/ssc) tag. This post will go through: setting up the project with NPM, go over the overall structure of the program, build a simple command line interface, and a task registration system.

If you want to view the finished code, you can grab it from the GitHub project. **FIX: Bad repo and bad wording**

    git clone https://github.com/kaw2k/ssc-start.git ~/Development/sc
    cd ~/Development/sc
    git checkout -f step-1

## Setting Up the Project

Now that we have a basic idea of what we want to accomplish and learn, lets get started with our project! First, make sure you have `grunt` installed globally with `sudo npm install -g grunt`. Now, lets generate our project, All the defaults should be fine, we can change them down the road. 

    mkdir ~/Development/ssc
    cd ~/Development/ssc
    grunt init:node

This gave us a bunch of default files and folders. We wont go into depth about each individual file, however you can read up about the `package.json` file [here](http://package.json.nodejitsu.com) and the `grunt.js` file [here](https://github.com/gruntjs/grunt/wiki).

Lets start by getting a simple "Hello World" client up. In the root of the project, make a new folder called `bin`, and inside of it make a file called `ssc` without any file extension and the following contents. 

    #!/usr/bin/env node
    var cwd = process.cwd();
    console.log('Hello World! We are in the directory: ' + cwd)

The first line of the file is a shebang which tells the operating system what compiler we want the code to run in; in this case it is the node compiler. We then grab the current directory the script was run in via the [process](http://nodejs.org/api/process.html) object. Lastly we print out a simple message to the console.

You can execute this directly via `node bin/ssc` at this time and watch it output your message. For convenience, we are going to make a [symbolic link](http://en.wikipedia.org/wiki/Symbolic_link) between this file and our local scripts.

    ln -s /usr/local/bin/ssc ./bin/ssc
    chmod 755 bin/ssc

After restarting your terminal you can run `ssc` and the compiler will run from the directory you are at.
