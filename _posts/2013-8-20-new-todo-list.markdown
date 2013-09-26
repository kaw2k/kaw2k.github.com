---
layout: post
title: "A New Todo List"
category: warbling
---

After reading [Zach Holman](http://zachholman.com/)'s article on his bare minimal todo list, I thought I would give it a shot. It resonated with me for no other reason than messy desktops drive me bonkers. The closest analog I could think of was just slapping postit notes on my monitor. After using the basic principle for a while, I have settled down on some small tweaks / additions to the system. If you haven't read the original article, head on over to his [post](http://zachholman.com/posts/inbox-zero-everything-zero/).


### Cron script to update labels

It would be really nice to automate this setup a little. Given time I would love to experiment with a cron script that would scan the desktop and update labels on the todos based on certain characteristics. If the file name or contents mentions a date, the cron would update the color to green, yellow, red depending on how close you are. Similarly, the longer the item has been on the desktop corresponds to the color of the label.

### Dropbox to sync tasks

One small issue I had when first adopting this was the problem of syncing my todos. Having my todos litter my desktop was an absolute necessity (otherwise out of sight, out of mind). An easy solution turned out to be syncing the Desktop with Dropbox. Simply replacing your original Desktop folder with a symbolic link to a folder in Dropbox does the trick. Now your todos follow you everywhere you have Dropbox running.

### File contents to take notes

Another big need of mine was the ability to subtask and take nodes on todos. I try to keep my tasks small, however sometimes something comes up that *can't* be broken down further. Even if it could be broken up, littering the desktop with related todos interspersed with other todos got confusing. Having the ability to quickly opening a todo just by double clicking on it and listing some details turned out to be very helpful.

Thinking about this further, it would be nice to have another script to list details of todos. This script would just scan the desktop, print out the name and label of a todo, and underneath print out the contents of the todo.

### Quick access to todos

Lastly, I needed a quick way to access these todos. Yes, the fastest way to get to them would be to just click on one, but that requires using the mouse and thats lame. I set up a system wide visor with iTerm2 that starts in my synced todo folder. This way, whenever I need to take notes, add a todo, or remove a todo, I can just tap the hotkey and all my todos are there waiting for me.

## Wrap up

The beauty of this system is in its simplicity. There is nothing terribly complex about riddling your desktop with empty files of things you need to do. There is so much room for growth, but how do you do it without ruining the simplicty of the system? We will see how this system holds up in the long run :)
