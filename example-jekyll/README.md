### example-jekyll

This is a very simple sample jekyll app that serves a static website.

First, you need to create a jekyll stager using [stager-jekyll](https://github.com/apcera/sample-apps/tree/master/stager-jekyll).

After creating the jekyll stager, you can deploy this app as follows :

```cd example-jekyll
apc app create my-jekyll-site --staging=jekyll --start
```
Navigate to the URL provided from the app staging process to view the output page.
