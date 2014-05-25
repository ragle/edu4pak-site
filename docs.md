##edu4pak.org

Some (very) brief docs / notes for myself, or someone else that has to come back to this in 2-6 months for revisions or to re-purpose it for the next edu4pak campaign...


### Hosting information

Contact Rob if you need to fiddle with DNS records, mail server or domain name management.

Page hosted by [github pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages) via Namecheap.

### Directory structure

```bash
├── build				#  concat / min output of gulp & associated static resources
├── images				#  static image resources
├── node_modules		#  node.js packages for gulp
└── src 				#  source for markup, JS, styles
    └── index.html 		#  source for site entry point / index
|__ index.html  		#  minified site entry point / index (created by build system)
|__ package.json 		#  details packages required for gulp (run '$ npm install' to install these)
|__ gulpfile.js 		#  front-end build system
|__ CNAME 				#  file github uses for internal DNS resolution
|__ .nojekyll 			#  tell github we aren't using jekyll for github pages
```

### Getting the build system set up

Because the chosen template loads a MST of JavaScript and CSS, gulp is used to minify and concatenate as many files as possible, bringing the number of requests on each page load down from ~30 (!) to ~4 (depending on if the client is IE).

####Installing gulp  

Run 
```
$ npm install 
```
to get gulp, the gulp modules we are using and all of their dependencies.

From there you can run `$ gulp watch` and gulp will automatically rebuild the site on changes to any html, css or js file in `src/`. 

Run `$ gulp` to manually rebuild the site at any time.

See the [gulp API documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md) for more info.

####Architecture

Generally, you edit files in `src/` and changes are writen to `index.html` in the site root or the `build/` directory. 

N.B. the chosen template uses JavaScript libraries that have tightly coupled internal static asset dependencies, and no path configuration file / variables or any other help is provided. `build/` contains a `fonts` and a `lib-img` directory that satisfy some of these dependencies. See the `fonts` and the `lib-images` tasks in the gulpfile for more information.

###Misc known issues, dirty hacks to be aware of, notes

I may or may not get to these depending on how busy I am with my senior project in the coming month, but they aren't high priority as the site works and the site is very small. If this stuff is still here, you aren't me, and you hit a wall with any of this... sorry.

*  There are a few nasty css hacks to do with video gallery positioning (see inline styles for #grid3d .content) because I rakka front-end disciprine and bring great shame to family. These appear to work for now but haven't been tested in IE < 11. In general - arbitrary, trivial style modifications can turn into time-wasting singularities as there are thousands of lines of not-very-modular CSS mashed together by the template author. Unless you're a front-end rockstar, if you get something that seems to work - that's probably fine given how small the site is. Make a note of it here and move on.
*  This goes for the donate buttons as well. The author included them as fields instead of buttons because for sure everyone would want to post data to paypal, no matter what. It looks like copying form relevant CSS to button relevant css could work, don't forget to do it for every resolution / media query. For now, very shameful onclick hack to launch link in new window without having to re-write styles
*  The "subscribe" code mailchimp generated for integrating with their mailing lists takes a big sloppy dump all over the global namespace. Fixing this looks like it's as easy as wrapping the code in a self-executing function, but I need to test it on the live site and don't have time to mess with it at the moment during low-traffic hours. I don't see any NS collisions or errors.