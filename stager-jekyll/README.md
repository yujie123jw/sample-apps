### stager-jekyll

This is an example stager that shows how to stage and run a Jekyll-based static
website. This stager takes care of generating the site with Jekyll, then the
static site stager can run to prepare it with nginx.

This example shows running a non-additive stager, where the stager has its own
dependencies and is capable of running as the first stager in the pipeline.

**This example does not use the recommended [Ruby stager API](https://github.com/apcera/stager-api-ruby).**

## Loading the Stager

To load the stager, can use the `apc stager create` command. We will specify the
start command for the stager. Next, we specify that we want to stage our stager
with the ruby pipeline. This will run `bundler` to ensure our stager's
dependencies are all fulfilled, as well as ensuring `ruby` is added as a
dependency on our stager. Finally, we specify that we want to create a new
staging pipeline with the same name and put our stager as the first stager to be
run.

We also need to make sure we use the `--allow-egress` flag to give the stager
connectivity to the outside internet.

After creating our stager, we then append the `static-site` to our new staging
pipeline.

```console
$ apc stager create jekyll --start-command="./stager.rb" --staging=/apcera::ruby --pipeline --allow-egress
$ apc staging pipeline append jekyll /apcera/stagers::static-site
```

Afterwards, should now see the new staging pipeline with the two stagers listed:

```console
$ apc staging pipeline list
Working in '/'
+-------------+------------+-------------------------------------------------------------+
| Name        | Namespace  | Stagers                                                     |
+-------------+------------+-------------------------------------------------------------+
| bash        | /apcera    | job::/apcera/stagers::bash                                  |
| compiler    | /apcera    | job::/apcera/stagers::compiler                              |
| docker      | /apcera    | job::/apcera/stagers::docker       						 |
| go          | /apcera    | job::/apcera/stagers::go                                    |
| jekyll      | <namespace>| job::<namespace>::jekyll, job::/apcera/stagers::static-site |
| java        | /apcera    | job::/apcera/stagers::java         						 |
| nodejs      | /apcera    | job::/apcera/stagers::nodejs       						 |
| perl        | /apcera    | job::/apcera/stagers::perl         						 |
| php         | /apcera    | job::/apcera/stagers::php          						 |
| python      | /apcera    | job::/apcera/stagers::python       						 |
| ruby        | /apcera    | job::/apcera/stagers::ruby         						 |
| static-site | /apcera    | job::/apcera/stagers::static-site  						 |
+-------------+------------+-------------------------------------------------------------+
```
(`<namespace>` is the namespace you were in when you created the `jekyll` stager)

## Deploying with the Stager

To deploy an application with the new stager and staging pipeline, can use the
`apc app create` command along with specifying to use the `jekyll` staging
pipeline. For instance, example-jekyll app can be deployed as follows :

```console
$ cd ../example-jekyll
$ apc app create my-jekyll-site --staging=jekyll --start
```
