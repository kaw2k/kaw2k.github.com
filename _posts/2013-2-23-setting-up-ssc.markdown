---
  title: "Getting Started with Node"
  layout: post
  published: false
---

This is the second post in a series about building a static site compiler in NodeJS. If you want to view the rest, visit the [Static Site Compiler](~tags/ssc) tag. This post will go through: setting up the project with NPM, go over the overall structure of the program, build a simple command line interface, and a task registration system.

If you want to view the finished code, you can grab it from the GitHub project. **FIX: Bad repo and bad wording**

    git clone https://github.com/kaw2k/ssc-start.git ~/Development/sc
    cd ~/Development/sc
    git checkout -f part-1

## Setting Up the Project

Now that we have a basic idea of what we want to accomplish and learn, lets get started with our project! First, make sure you have `grunt` installed globally with `sudo npm install -g grunt`. Now, lets generate our project, All the defaults should be fine, we can change them down the road.

**UPDATE FOR GRUNT V0.4.0**

    mkdir ~/Development/ssc
    cd ~/Development/ssc
    grunt init:node

This gave us a bunch of default files and folders. We wont go into depth about each individual file, however you can read up about the `package.json` file [here](http://package.json.nodejitsu.com) and the `grunt.js` file [here](https://github.com/gruntjs/grunt/wiki).

Lets start by getting a simple "Hello World" client up. In the root of the project, make a new folder called `bin`, and inside of it make a file called `ssc` without any file extension and the following contents.

    #!/usr/bin/env node
    var cwd = process.cwd();
    console.log('Hello World! We are in the directory: ' + cwd)

The first line of the file is a [shebang](http://en.wikipedia.org/wiki/Shebang_\(Unix\)) which tells the operating system what compiler we want the code to run in; in this case it is the node compiler. We then grab the current directory the script was run in via the [process](http://nodejs.org/api/process.html) object. Lastly we print out a simple message to the console.

You can execute this directly via `node bin/ssc` at this time and watch it output your message. For convenience, we are going to make a [symbolic link](http://en.wikipedia.org/wiki/Symbolic_link) between this file and our local scripts.

    ln -s /usr/local/bin/ssc ./bin/ssc
    chmod 755 bin/ssc

After restarting your terminal you can run `ssc` and the compiler will run from the directory you are at.

## Step 1: Initialization

Cool, so now we have the starting point for our application hooked up to our system. Now, let's start fleshing out the skeleton of the compiler. Referring back to the [planing post](~posts/planning-ssc), we are about to implement step 1, the initialization stage. We want to:

0. Initialize the compiler
1. Parse the command line options
2. Read in the user settings
3. Load in all the tasks that are required
4. Set up our `site` object
5. Execute the user specified command

**REWORD THIS PARAGRAPH**

Just a quick note about the above steps. Our goal is to make this compiler **simple** and at the same time extendible. We want the end product to have a few built in tasks like building and deploying, however we do *not* want to limit ourselves to only these tasks. As a result, every task the compiler does will be broken into modules that can be replaced and tested individually. If you are not happy with the module for compiling markdown, you should be able to swap in your own custom implementation.

Now, let's make new folders for our tasks and libs, as well as a few new files. Remember, tasks can be hot swapped and libs are core functionality.

  cd ~/Development/ssc
  mkdir tasks
  mkdir lib
  touch lib/cli.js lib/utils.js lib/ssc.js

Notice how we made a `ssc.js` file. The file `ssc` in the `bin/` directory is the entry shell script to our application. It's purpose is to call our initialization file which kicks off our application (which is `ssc.js`). Open up this file and enter the following code.

**CODE FOR SSC.JS**

**STEP TO INCLUDE OUR OTHER LIBRARIES**

The first few lines of code pull in our required libraries. We use underscore for some functional goodness, colors for pretty text output in terminals, and grunt.js's [findup](#) file for recursive searching. We then set up a shell compiler object and set it to our `module.exports` attribute. This allows other files to require the compiler.


**INCLUDE LIBRARY IMPORT**

Next, we start to define our compiler object. The compiler object will house the user settings, custom and core tasks, and the site object itself. Here, we are simply pulling in core libs that the compiler needs in order to function.

**INCLUDE LIBS IMPORT**

With our basic compiler functional, we can now parse the command line. It is important to note that we are parsing the command line before we even think about interacting with the folder the user is in. The user could be initializing a new site, in which case there is no site or settings file to work with. We build up our basic compiler, then we defer future actions to the user.

**INCLUDE COMMAND LINE CALLS**

These lines of code parse the command line (which we will implement shortly). If a match was found, we call the appropriate task with the correct context. **EXPLAIN MORE ABOUT APPLY HERE**

### The Command Line

For the sake of science, we are going to build our own simple options parser for this compiler. You could simply use a library such as [optimist](https://github.com/substack/node-optimist) or [nopt](https://github.com/isaacs/nopt) which would alleviate a bit of complexity.

**INCLUDE COMMAND LINE FULL CODE**

There is a fair bit going on here


