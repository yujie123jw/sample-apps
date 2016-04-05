
BEGIN {
  unless ($ENV{AUTHOR_TESTING}) {
    require Test::More;
    Test::More::plan(skip_all => 'these tests are for testing by the author');
  }
}

use strict;
use warnings;

use Test::More;

BEGIN {
    $ENV{PERL_DATETIME_PP} = 1;
}

use DateTime;

ok(
    $DateTime::IsPurePerl,
    'PurePerl implementation is loaded when env var is set'
);

done_testing();
