
BEGIN {
  unless ($ENV{AUTHOR_TESTING}) {
    require Test::More;
    Test::More::plan(skip_all => 'these tests are for testing by the author');
  }
}

use strict;
use warnings;

# this test was generated with Dist::Zilla::Plugin::Test::EOL 0.18

use Test::More 0.88;
use Test::EOL;

my @files = (
    'lib/Devel/StackTrace.pm',
    'lib/Devel/StackTrace/Frame.pm',
    't/00-report-prereqs.dd',
    't/00-report-prereqs.t',
    't/01-basic.t',
    't/02-bad-utf8.t',
    't/03-message.t',
    't/04-indent.t',
    't/05-back-compat.t',
    't/06-dollar-at.t',
    't/07-no-args.t',
    't/08-filter-early.t',
    't/09-skip-frames.t',
    't/10-set-frames.t',
    't/author-00-compile.t',
    't/author-eol.t',
    't/author-mojibake.t',
    't/author-no-tabs.t',
    't/author-pod-spell.t',
    't/author-pod-syntax.t',
    't/author-test-version.t',
    't/release-cpan-changes.t',
    't/release-meta-json.t',
    't/release-pod-coverage.t',
    't/release-pod-linkcheck.t',
    't/release-pod-no404s.t',
    't/release-portability.t',
    't/release-synopsis.t',
    't/release-tidyall.t'
);

eol_unix_ok($_, { trailing_whitespace => 1 }) foreach @files;
done_testing;
