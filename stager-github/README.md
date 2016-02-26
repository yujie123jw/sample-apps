### stager-github

This is an example stager that shows how to stage an app using source code from
GitHub rather than local resources.

The github stager pulls down resources from the GitHub repository
you specify.  By prepending this GitHub stager to a language specific staging
pipeline (provided by Apcera), your apps can be fully deployed without even
cloning the repo locally.

**This example uses the recommended [Ruby stager API](https://github.com/apcera/stager-api-ruby).**

## Loading the Stager

To load the stager, use the `apc stager create` command, specify that our stager
requires the ruby staging pipeline, specify the start command, and add the
`--allow-egress` flag to give the stager connectivity to the outside internet.
After creating our stager, we need to add the `git` dependency so that our
stager can run git commands.

_Run from the ./stager directory_
```console
$ apc stager create github --staging=/apcera::ruby --start-cmd=./stager.rb --allow-egress --batch
$ apc job update github --pkg-add /apcera/pkg/packages::git-2.3.1 --batch
```

## Example - Deploying a bash app

For any app you wish you can quickly create a GitHub-enabled staging pipeline by
chaining the github stager and a language-specific stager together.

_Run from the ./example directory_
```console
$ apc staging pipeline create github --name gh-bash --batch
$ apc staging pipeline append gh-bash /apcera/stagers::bash
$ apc app create my-bash-app --staging=gh-bash --start --batch
```

## Specifying GitHub details

You specify the GitHub repository URL, subdirectory (if you wish to only deploy
a small part of the repo as an app), and even username and password via a json
file named github.conf:

```json
{
	"https_url":"Required: HTTPS URL for repo without username/password",
	"repo_directory":"Optional: only stage this subdirectory of the repo",
	"user":"Optional: Needed only if the repo requires auth",
	"password":"Optional: Needed only if the repo requires auth",
}
```

>Note: `apc` uploads the entire code path you give it (defaults to current
directory) so it is recommended that you place the github.conf file in its own
directory.`
