# spvm
SPWN version manager

# Usage
To start, enter an administrative command prompt (to access SPWN folder), and install a SPWN version. For example, 0.0.4...
```
spvm install 0.0.4
```
It will tell us to insert our current SPWN version. Let's say we're using 0.0.8.

Now that we have version 0.0.4, let's use it...
```
spvm use 0.0.4
```
And now that we're using it, we should write some code.

When we're done, let's uninstall it.
First, let's switch back to 0.0.8...

```
spvm use 0.0.8
```
Now, let's uninstall 0.0.4...
```
spvm uninstall 0.0.4
```
