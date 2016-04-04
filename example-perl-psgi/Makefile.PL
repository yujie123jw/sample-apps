#!/usr/bin/env perl
use ExtUtils::MakeMaker;
WriteMakefile(
    PREREQ_PM => {
        'DateTime'       => 0,
        'Plack::Request' => '0.9976',
        'Starman'        => 0,
    },
);
