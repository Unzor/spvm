# spvm
SPWN version manager

# Installation
First, let's install it. 

## Using NPM (recommended)
Install [Node.js](nodejs.org) if you haven't, and run this:
```
npm install -g spvm
```
## Using .exe
Click [here](https://github.com/Unzor/spvm/releases/download/v1.0.0/spvm.exe) to download. Note this does not get added to your PATH variable and you need to set it manually.

You are now ready to use SPVM!
# Usage
To start, enter an administrative command prompt (to access SPWN folder), and install a SPWN version. For example, 0.0.4...
```
spvm install 0.0.4
```
It will tell us to insert our current SPWN version. Let's say we're using 0.0.8, but if you aren't, use whatever version you are using....
Now that we have version 0.0.4, let's use it...
```
spvm use 0.0.4
```
And now that we're using it, we should write some code.

When we're done, let's uninstall it.
First, let's switch back to 0.0.8, or your own version...
```
spvm use 0.0.8
```
Now, let's uninstall 0.0.4...
```
spvm uninstall 0.0.4
```
