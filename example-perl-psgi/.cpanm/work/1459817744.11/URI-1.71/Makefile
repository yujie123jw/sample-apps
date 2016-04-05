# This Makefile is for the URI extension to perl.
#
# It was generated automatically by MakeMaker version
# 7.0401 (Revision: 70401) from the contents of
# Makefile.PL. Don't edit this file, edit Makefile.PL instead.
#
#       ANY CHANGES MADE HERE WILL BE LOST!
#
#   MakeMaker ARGV: ()
#

#   MakeMaker Parameters:

#     ABSTRACT_FROM => q[lib/URI.pm]
#     AUTHOR => [q[Gisle Aas <gisle@activestate.com>]]
#     BUILD_REQUIRES => {  }
#     CONFIGURE_REQUIRES => { ExtUtils::MakeMaker=>q[0] }
#     LICENSE => q[perl_5]
#     META_ADD => { prereqs=>{ configure=>{ requires=>{ ExtUtils::MakeMaker=>q[0] } }, runtime=>{ recommends=>{ Business::ISBN=>q[0] }, requires=>{ Exporter=>q[5.57], MIME::Base64=>q[2], Scalar::Util=>q[0], parent=>q[0], perl=>q[5.008001], utf8=>q[0] } }, test=>{ requires=>{ File::Temp=>q[0], Test::More=>q[0.96] } } } }
#     META_MERGE => { dynamic_config=>q[0], meta-spec=>{ version=>q[2] }, resources=>{ bugtracker=>{ mailto=>q[bug-URI@rt.cpan.org], web=>q[https://rt.cpan.org/Public/Dist/Display.html?Name=URI] }, repository=>{ type=>q[git], url=>q[https://github.com/libwww-perl/uri.git], web=>q[https://github.com/libwww-perl/uri] }, x_IRC=>q[irc://irc.perl.org/#lwp], x_MailingList=>q[mailto:libwww@perl.org] }, x_authority=>q[cpan:GAAS], x_contributors=>[q[Gisle Aas <gisle@aas.no>], q[Karen Etheridge <ether@cpan.org>], q[Ville Skytt\x{00e4} <ville.skytta@iki.fi>], q[Mark Stosberg <mark@stosberg.com>], q[Michael G. Schwern <schwern@pobox.com>], q[Olaf Alders <olaf@wundersolutions.com>], q[Slaven Rezic <slaven@rezic.de>], q[Matt Lawrence <matthewlawrence@venda.com>], q[Peter Rabbitson <ribasushi@cpan.org>], q[Piotr Roszatycki <piotr.roszatycki@gmail.com>], q[Salvatore Bonaccorso <carnil@launchpad.net>], q[Tatsuhiko Miyagawa <miyagawa@bulknews.net>], q[Torsten F\x{00f6}rtsch <torsten.foertsch@gmx.net>], q[Adam Herzog <adam@adamherzog.com>], q[gerard <gerard@tty.nl>], q[Alex Kapranoff <kapranoff@gmail.com>], q[Brendan Byrd <Perl@ResonatorSoft.org>], q[David Schmidt <davewood@gmx.at>], q[Jan Dubois <jand@activestate.com>], q[John Miller <john@rimmkaufman.com>], q[Kenichi Ishigaki <ishigaki@cpan.org>], q[Kent Fredric <kentfredric@gmail.com>], q[Masahiro Honma <hiratara@cpan.org>]] }
#     MIN_PERL_VERSION => q[5.008001]
#     NAME => q[URI]
#     PREREQ_PM => { Exporter=>q[5.57], File::Temp=>q[0], MIME::Base64=>q[2], Scalar::Util=>q[0], Test::More=>q[0.96], parent=>q[0], utf8=>q[0] }
#     TEST_REQUIRES => { File::Temp=>q[0], Test::More=>q[0.96] }
#     VERSION_FROM => q[lib/URI.pm]

# --- MakeMaker post_initialize section:


# --- MakeMaker const_config section:

# These definitions are from config.sh (via /opt/apcera/perl-5.22.1/lib/5.22.1/x86_64-linux/Config.pm).
# They may have been overridden via Makefile.PL or on the command line.
AR = ar
CC = cc
CCCDLFLAGS = -fPIC
CCDLFLAGS = -Wl,-E
DLEXT = so
DLSRC = dl_dlopen.xs
EXE_EXT = 
FULL_AR = /usr/bin/ar
LD = cc
LDDLFLAGS = -shared -O2 -L/usr/local/lib -fstack-protector
LDFLAGS =  -fstack-protector -L/usr/local/lib
LIBC = libc-2.19.so
LIB_EXT = .a
OBJ_EXT = .o
OSNAME = linux
OSVERS = 3.13.0-83.127-generic
RANLIB = :
SITELIBEXP = /opt/apcera/perl-5.22.1/lib/site_perl/5.22.1
SITEARCHEXP = /opt/apcera/perl-5.22.1/lib/site_perl/5.22.1/x86_64-linux
SO = so
VENDORARCHEXP = 
VENDORLIBEXP = 


# --- MakeMaker constants section:
AR_STATIC_ARGS = cr
DIRFILESEP = /
DFSEP = $(DIRFILESEP)
NAME = URI
NAME_SYM = URI
VERSION = 1.71
VERSION_MACRO = VERSION
VERSION_SYM = 1_71
DEFINE_VERSION = -D$(VERSION_MACRO)=\"$(VERSION)\"
XS_VERSION = 1.71
XS_VERSION_MACRO = XS_VERSION
XS_DEFINE_VERSION = -D$(XS_VERSION_MACRO)=\"$(XS_VERSION)\"
INST_ARCHLIB = blib/arch
INST_SCRIPT = blib/script
INST_BIN = blib/bin
INST_LIB = blib/lib
INST_MAN1DIR = blib/man1
INST_MAN3DIR = blib/man3
MAN1EXT = 0
MAN3EXT = 0
INSTALLDIRS = site
INSTALL_BASE = /app/.perl
DESTDIR = 
PREFIX = $(INSTALL_BASE)
INSTALLPRIVLIB = $(INSTALL_BASE)/lib/perl5
DESTINSTALLPRIVLIB = $(DESTDIR)$(INSTALLPRIVLIB)
INSTALLSITELIB = $(INSTALL_BASE)/lib/perl5
DESTINSTALLSITELIB = $(DESTDIR)$(INSTALLSITELIB)
INSTALLVENDORLIB = $(INSTALL_BASE)/lib/perl5
DESTINSTALLVENDORLIB = $(DESTDIR)$(INSTALLVENDORLIB)
INSTALLARCHLIB = $(INSTALL_BASE)/lib/perl5/x86_64-linux
DESTINSTALLARCHLIB = $(DESTDIR)$(INSTALLARCHLIB)
INSTALLSITEARCH = $(INSTALL_BASE)/lib/perl5/x86_64-linux
DESTINSTALLSITEARCH = $(DESTDIR)$(INSTALLSITEARCH)
INSTALLVENDORARCH = $(INSTALL_BASE)/lib/perl5/x86_64-linux
DESTINSTALLVENDORARCH = $(DESTDIR)$(INSTALLVENDORARCH)
INSTALLBIN = $(INSTALL_BASE)/bin
DESTINSTALLBIN = $(DESTDIR)$(INSTALLBIN)
INSTALLSITEBIN = $(INSTALL_BASE)/bin
DESTINSTALLSITEBIN = $(DESTDIR)$(INSTALLSITEBIN)
INSTALLVENDORBIN = $(INSTALL_BASE)/bin
DESTINSTALLVENDORBIN = $(DESTDIR)$(INSTALLVENDORBIN)
INSTALLSCRIPT = $(INSTALL_BASE)/bin
DESTINSTALLSCRIPT = $(DESTDIR)$(INSTALLSCRIPT)
INSTALLSITESCRIPT = $(INSTALL_BASE)/bin
DESTINSTALLSITESCRIPT = $(DESTDIR)$(INSTALLSITESCRIPT)
INSTALLVENDORSCRIPT = $(INSTALL_BASE)/bin
DESTINSTALLVENDORSCRIPT = $(DESTDIR)$(INSTALLVENDORSCRIPT)
INSTALLMAN1DIR = $(INSTALL_BASE)/man/man1
DESTINSTALLMAN1DIR = $(DESTDIR)$(INSTALLMAN1DIR)
INSTALLSITEMAN1DIR = $(INSTALL_BASE)/man/man1
DESTINSTALLSITEMAN1DIR = $(DESTDIR)$(INSTALLSITEMAN1DIR)
INSTALLVENDORMAN1DIR = $(INSTALL_BASE)/man/man1
DESTINSTALLVENDORMAN1DIR = $(DESTDIR)$(INSTALLVENDORMAN1DIR)
INSTALLMAN3DIR = $(INSTALL_BASE)/man/man3
DESTINSTALLMAN3DIR = $(DESTDIR)$(INSTALLMAN3DIR)
INSTALLSITEMAN3DIR = $(INSTALL_BASE)/man/man3
DESTINSTALLSITEMAN3DIR = $(DESTDIR)$(INSTALLSITEMAN3DIR)
INSTALLVENDORMAN3DIR = $(INSTALL_BASE)/man/man3
DESTINSTALLVENDORMAN3DIR = $(DESTDIR)$(INSTALLVENDORMAN3DIR)
PERL_LIB = /opt/apcera/perl-5.22.1/lib/5.22.1
PERL_ARCHLIB = /opt/apcera/perl-5.22.1/lib/5.22.1/x86_64-linux
PERL_ARCHLIBDEP = /opt/apcera/perl-5.22.1/lib/5.22.1/x86_64-linux
LIBPERL_A = libperl.a
FIRST_MAKEFILE = Makefile
MAKEFILE_OLD = Makefile.old
MAKE_APERL_FILE = Makefile.aperl
PERLMAINCC = $(CC)
PERL_INC = /opt/apcera/perl-5.22.1/lib/5.22.1/x86_64-linux/CORE
PERL_INCDEP = /opt/apcera/perl-5.22.1/lib/5.22.1/x86_64-linux/CORE
PERL = "/opt/apcera/perl-5.22.1/bin/perl"
FULLPERL = "/opt/apcera/perl-5.22.1/bin/perl"
ABSPERL = $(PERL)
PERLRUN = $(PERL)
FULLPERLRUN = $(FULLPERL)
ABSPERLRUN = $(ABSPERL)
PERLRUNINST = $(PERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
FULLPERLRUNINST = $(FULLPERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
ABSPERLRUNINST = $(ABSPERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
PERL_CORE = 0
PERM_DIR = 755
PERM_RW = 644
PERM_RWX = 755

MAKEMAKER   = /opt/apcera/perl-5.22.1/lib/5.22.1/ExtUtils/MakeMaker.pm
MM_VERSION  = 7.0401
MM_REVISION = 70401

# FULLEXT = Pathname for extension directory (eg Foo/Bar/Oracle).
# BASEEXT = Basename part of FULLEXT. May be just equal FULLEXT. (eg Oracle)
# PARENT_NAME = NAME without BASEEXT and no trailing :: (eg Foo::Bar)
# DLBASE  = Basename part of dynamic library. May be just equal BASEEXT.
MAKE = make
FULLEXT = URI
BASEEXT = URI
PARENT_NAME = 
DLBASE = $(BASEEXT)
VERSION_FROM = lib/URI.pm
OBJECT = 
LDFROM = $(OBJECT)
LINKTYPE = dynamic
BOOTDEP = 

# Handy lists of source code files:
XS_FILES = 
C_FILES  = 
O_FILES  = 
H_FILES  = 
MAN1PODS = 
MAN3PODS = lib/URI.pm \
	lib/URI/Escape.pm \
	lib/URI/Heuristic.pm \
	lib/URI/QueryParam.pm \
	lib/URI/Split.pm \
	lib/URI/URL.pm \
	lib/URI/WithBase.pm \
	lib/URI/_punycode.pm \
	lib/URI/data.pm \
	lib/URI/file.pm \
	lib/URI/ldap.pm

# Where is the Config information that we are using/depend on
CONFIGDEP = $(PERL_ARCHLIBDEP)$(DFSEP)Config.pm $(PERL_INCDEP)$(DFSEP)config.h

# Where to build things
INST_LIBDIR      = $(INST_LIB)
INST_ARCHLIBDIR  = $(INST_ARCHLIB)

INST_AUTODIR     = $(INST_LIB)/auto/$(FULLEXT)
INST_ARCHAUTODIR = $(INST_ARCHLIB)/auto/$(FULLEXT)

INST_STATIC      = 
INST_DYNAMIC     = 
INST_BOOT        = 

# Extra linker info
EXPORT_LIST        = 
PERL_ARCHIVE       = 
PERL_ARCHIVEDEP    = 
PERL_ARCHIVE_AFTER = 


TO_INST_PM = lib/URI.pm \
	lib/URI/Escape.pm \
	lib/URI/Heuristic.pm \
	lib/URI/IRI.pm \
	lib/URI/QueryParam.pm \
	lib/URI/Split.pm \
	lib/URI/URL.pm \
	lib/URI/WithBase.pm \
	lib/URI/_foreign.pm \
	lib/URI/_generic.pm \
	lib/URI/_idna.pm \
	lib/URI/_ldap.pm \
	lib/URI/_login.pm \
	lib/URI/_punycode.pm \
	lib/URI/_query.pm \
	lib/URI/_segment.pm \
	lib/URI/_server.pm \
	lib/URI/_userpass.pm \
	lib/URI/data.pm \
	lib/URI/file.pm \
	lib/URI/file/Base.pm \
	lib/URI/file/FAT.pm \
	lib/URI/file/Mac.pm \
	lib/URI/file/OS2.pm \
	lib/URI/file/QNX.pm \
	lib/URI/file/Unix.pm \
	lib/URI/file/Win32.pm \
	lib/URI/ftp.pm \
	lib/URI/gopher.pm \
	lib/URI/http.pm \
	lib/URI/https.pm \
	lib/URI/ldap.pm \
	lib/URI/ldapi.pm \
	lib/URI/ldaps.pm \
	lib/URI/mailto.pm \
	lib/URI/mms.pm \
	lib/URI/news.pm \
	lib/URI/nntp.pm \
	lib/URI/pop.pm \
	lib/URI/rlogin.pm \
	lib/URI/rsync.pm \
	lib/URI/rtsp.pm \
	lib/URI/rtspu.pm \
	lib/URI/sftp.pm \
	lib/URI/sip.pm \
	lib/URI/sips.pm \
	lib/URI/snews.pm \
	lib/URI/ssh.pm \
	lib/URI/telnet.pm \
	lib/URI/tn3270.pm \
	lib/URI/urn.pm \
	lib/URI/urn/isbn.pm \
	lib/URI/urn/oid.pm

PM_TO_BLIB = lib/URI.pm \
	blib/lib/URI.pm \
	lib/URI/Escape.pm \
	blib/lib/URI/Escape.pm \
	lib/URI/Heuristic.pm \
	blib/lib/URI/Heuristic.pm \
	lib/URI/IRI.pm \
	blib/lib/URI/IRI.pm \
	lib/URI/QueryParam.pm \
	blib/lib/URI/QueryParam.pm \
	lib/URI/Split.pm \
	blib/lib/URI/Split.pm \
	lib/URI/URL.pm \
	blib/lib/URI/URL.pm \
	lib/URI/WithBase.pm \
	blib/lib/URI/WithBase.pm \
	lib/URI/_foreign.pm \
	blib/lib/URI/_foreign.pm \
	lib/URI/_generic.pm \
	blib/lib/URI/_generic.pm \
	lib/URI/_idna.pm \
	blib/lib/URI/_idna.pm \
	lib/URI/_ldap.pm \
	blib/lib/URI/_ldap.pm \
	lib/URI/_login.pm \
	blib/lib/URI/_login.pm \
	lib/URI/_punycode.pm \
	blib/lib/URI/_punycode.pm \
	lib/URI/_query.pm \
	blib/lib/URI/_query.pm \
	lib/URI/_segment.pm \
	blib/lib/URI/_segment.pm \
	lib/URI/_server.pm \
	blib/lib/URI/_server.pm \
	lib/URI/_userpass.pm \
	blib/lib/URI/_userpass.pm \
	lib/URI/data.pm \
	blib/lib/URI/data.pm \
	lib/URI/file.pm \
	blib/lib/URI/file.pm \
	lib/URI/file/Base.pm \
	blib/lib/URI/file/Base.pm \
	lib/URI/file/FAT.pm \
	blib/lib/URI/file/FAT.pm \
	lib/URI/file/Mac.pm \
	blib/lib/URI/file/Mac.pm \
	lib/URI/file/OS2.pm \
	blib/lib/URI/file/OS2.pm \
	lib/URI/file/QNX.pm \
	blib/lib/URI/file/QNX.pm \
	lib/URI/file/Unix.pm \
	blib/lib/URI/file/Unix.pm \
	lib/URI/file/Win32.pm \
	blib/lib/URI/file/Win32.pm \
	lib/URI/ftp.pm \
	blib/lib/URI/ftp.pm \
	lib/URI/gopher.pm \
	blib/lib/URI/gopher.pm \
	lib/URI/http.pm \
	blib/lib/URI/http.pm \
	lib/URI/https.pm \
	blib/lib/URI/https.pm \
	lib/URI/ldap.pm \
	blib/lib/URI/ldap.pm \
	lib/URI/ldapi.pm \
	blib/lib/URI/ldapi.pm \
	lib/URI/ldaps.pm \
	blib/lib/URI/ldaps.pm \
	lib/URI/mailto.pm \
	blib/lib/URI/mailto.pm \
	lib/URI/mms.pm \
	blib/lib/URI/mms.pm \
	lib/URI/news.pm \
	blib/lib/URI/news.pm \
	lib/URI/nntp.pm \
	blib/lib/URI/nntp.pm \
	lib/URI/pop.pm \
	blib/lib/URI/pop.pm \
	lib/URI/rlogin.pm \
	blib/lib/URI/rlogin.pm \
	lib/URI/rsync.pm \
	blib/lib/URI/rsync.pm \
	lib/URI/rtsp.pm \
	blib/lib/URI/rtsp.pm \
	lib/URI/rtspu.pm \
	blib/lib/URI/rtspu.pm \
	lib/URI/sftp.pm \
	blib/lib/URI/sftp.pm \
	lib/URI/sip.pm \
	blib/lib/URI/sip.pm \
	lib/URI/sips.pm \
	blib/lib/URI/sips.pm \
	lib/URI/snews.pm \
	blib/lib/URI/snews.pm \
	lib/URI/ssh.pm \
	blib/lib/URI/ssh.pm \
	lib/URI/telnet.pm \
	blib/lib/URI/telnet.pm \
	lib/URI/tn3270.pm \
	blib/lib/URI/tn3270.pm \
	lib/URI/urn.pm \
	blib/lib/URI/urn.pm \
	lib/URI/urn/isbn.pm \
	blib/lib/URI/urn/isbn.pm \
	lib/URI/urn/oid.pm \
	blib/lib/URI/urn/oid.pm


# --- MakeMaker platform_constants section:
MM_Unix_VERSION = 7.0401
PERL_MALLOC_DEF = -DPERL_EXTMALLOC_DEF -Dmalloc=Perl_malloc -Dfree=Perl_mfree -Drealloc=Perl_realloc -Dcalloc=Perl_calloc


# --- MakeMaker tool_autosplit section:
# Usage: $(AUTOSPLITFILE) FileToSplit AutoDirToSplitInto
AUTOSPLITFILE = $(ABSPERLRUN)  -e 'use AutoSplit;  autosplit($$$$ARGV[0], $$$$ARGV[1], 0, 1, 1)' --



# --- MakeMaker tool_xsubpp section:


# --- MakeMaker tools_other section:
SHELL = /bin/sh
CHMOD = chmod
CP = cp
MV = mv
NOOP = $(TRUE)
NOECHO = @
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = $(ABSPERLRUN) -MExtUtils::Command -e 'mkpath' --
EQUALIZE_TIMESTAMP = $(ABSPERLRUN) -MExtUtils::Command -e 'eqtime' --
FALSE = false
TRUE = true
ECHO = echo
ECHO_N = echo -n
UNINST = 0
VERBINST = 0
MOD_INSTALL = $(ABSPERLRUN) -MExtUtils::Install -e 'install([ from_to => {@ARGV}, verbose => '\''$(VERBINST)'\'', uninstall_shadows => '\''$(UNINST)'\'', dir_mode => '\''$(PERM_DIR)'\'' ]);' --
DOC_INSTALL = $(ABSPERLRUN) -MExtUtils::Command::MM -e 'perllocal_install' --
UNINSTALL = $(ABSPERLRUN) -MExtUtils::Command::MM -e 'uninstall' --
WARN_IF_OLD_PACKLIST = $(ABSPERLRUN) -MExtUtils::Command::MM -e 'warn_if_old_packlist' --
MACROSTART = 
MACROEND = 
USEMAKEFILE = -f
FIXIN = $(ABSPERLRUN) -MExtUtils::MY -e 'MY->fixin(shift)' --
CP_NONEMPTY = $(ABSPERLRUN) -MExtUtils::Command::MM -e 'cp_nonempty' --


# --- MakeMaker makemakerdflt section:
makemakerdflt : all
	$(NOECHO) $(NOOP)


# --- MakeMaker dist section:
TAR = tar
TARFLAGS = cvf
ZIP = zip
ZIPFLAGS = -r
COMPRESS = gzip --best
SUFFIX = .gz
SHAR = shar
PREOP = $(NOECHO) $(NOOP)
POSTOP = $(NOECHO) $(NOOP)
TO_UNIX = $(NOECHO) $(NOOP)
CI = ci -u
RCS_LABEL = rcs -Nv$(VERSION_SYM): -q
DIST_CP = best
DIST_DEFAULT = tardist
DISTNAME = URI
DISTVNAME = URI-1.71


# --- MakeMaker macro section:


# --- MakeMaker depend section:


# --- MakeMaker cflags section:


# --- MakeMaker const_loadlibs section:


# --- MakeMaker const_cccmd section:


# --- MakeMaker post_constants section:


# --- MakeMaker pasthru section:

PASTHRU = LIBPERL_A="$(LIBPERL_A)"\
	LINKTYPE="$(LINKTYPE)"\
	PREFIX="$(PREFIX)"\
	INSTALL_BASE="$(INSTALL_BASE)"


# --- MakeMaker special_targets section:
.SUFFIXES : .xs .c .C .cpp .i .s .cxx .cc $(OBJ_EXT)

.PHONY: all config static dynamic test linkext manifest blibdirs clean realclean disttest distdir



# --- MakeMaker c_o section:


# --- MakeMaker xs_c section:


# --- MakeMaker xs_o section:


# --- MakeMaker top_targets section:
all :: pure_all manifypods
	$(NOECHO) $(NOOP)


pure_all :: config pm_to_blib subdirs linkext
	$(NOECHO) $(NOOP)

subdirs :: $(MYEXTLIB)
	$(NOECHO) $(NOOP)

config :: $(FIRST_MAKEFILE) blibdirs
	$(NOECHO) $(NOOP)

help :
	perldoc ExtUtils::MakeMaker


# --- MakeMaker blibdirs section:
blibdirs : $(INST_LIBDIR)$(DFSEP).exists $(INST_ARCHLIB)$(DFSEP).exists $(INST_AUTODIR)$(DFSEP).exists $(INST_ARCHAUTODIR)$(DFSEP).exists $(INST_BIN)$(DFSEP).exists $(INST_SCRIPT)$(DFSEP).exists $(INST_MAN1DIR)$(DFSEP).exists $(INST_MAN3DIR)$(DFSEP).exists
	$(NOECHO) $(NOOP)

# Backwards compat with 6.18 through 6.25
blibdirs.ts : blibdirs
	$(NOECHO) $(NOOP)

$(INST_LIBDIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_LIBDIR)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_LIBDIR)
	$(NOECHO) $(TOUCH) $(INST_LIBDIR)$(DFSEP).exists

$(INST_ARCHLIB)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_ARCHLIB)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_ARCHLIB)
	$(NOECHO) $(TOUCH) $(INST_ARCHLIB)$(DFSEP).exists

$(INST_AUTODIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_AUTODIR)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_AUTODIR)
	$(NOECHO) $(TOUCH) $(INST_AUTODIR)$(DFSEP).exists

$(INST_ARCHAUTODIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_ARCHAUTODIR)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_ARCHAUTODIR)
	$(NOECHO) $(TOUCH) $(INST_ARCHAUTODIR)$(DFSEP).exists

$(INST_BIN)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_BIN)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_BIN)
	$(NOECHO) $(TOUCH) $(INST_BIN)$(DFSEP).exists

$(INST_SCRIPT)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_SCRIPT)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_SCRIPT)
	$(NOECHO) $(TOUCH) $(INST_SCRIPT)$(DFSEP).exists

$(INST_MAN1DIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_MAN1DIR)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_MAN1DIR)
	$(NOECHO) $(TOUCH) $(INST_MAN1DIR)$(DFSEP).exists

$(INST_MAN3DIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_MAN3DIR)
	$(NOECHO) $(CHMOD) $(PERM_DIR) $(INST_MAN3DIR)
	$(NOECHO) $(TOUCH) $(INST_MAN3DIR)$(DFSEP).exists



# --- MakeMaker linkext section:

linkext :: $(LINKTYPE)
	$(NOECHO) $(NOOP)


# --- MakeMaker dlsyms section:


# --- MakeMaker dynamic_bs section:

BOOTSTRAP =


# --- MakeMaker dynamic section:

dynamic :: $(FIRST_MAKEFILE) $(BOOTSTRAP) $(INST_DYNAMIC)
	$(NOECHO) $(NOOP)


# --- MakeMaker dynamic_lib section:


# --- MakeMaker static section:

## $(INST_PM) has been moved to the all: target.
## It remains here for awhile to allow for old usage: "make static"
static :: $(FIRST_MAKEFILE) $(INST_STATIC)
	$(NOECHO) $(NOOP)


# --- MakeMaker static_lib section:


# --- MakeMaker manifypods section:

POD2MAN_EXE = $(PERLRUN) "-MExtUtils::Command::MM" -e pod2man "--"
POD2MAN = $(POD2MAN_EXE)


manifypods : pure_all  \
	lib/URI.pm \
	lib/URI/Escape.pm \
	lib/URI/Heuristic.pm \
	lib/URI/QueryParam.pm \
	lib/URI/Split.pm \
	lib/URI/URL.pm \
	lib/URI/WithBase.pm \
	lib/URI/_punycode.pm \
	lib/URI/data.pm \
	lib/URI/file.pm \
	lib/URI/ldap.pm
	$(NOECHO) $(POD2MAN) --section=3 --perm_rw=$(PERM_RW) -u \
	  lib/URI.pm $(INST_MAN3DIR)/URI.$(MAN3EXT) \
	  lib/URI/Escape.pm $(INST_MAN3DIR)/URI::Escape.$(MAN3EXT) \
	  lib/URI/Heuristic.pm $(INST_MAN3DIR)/URI::Heuristic.$(MAN3EXT) \
	  lib/URI/QueryParam.pm $(INST_MAN3DIR)/URI::QueryParam.$(MAN3EXT) \
	  lib/URI/Split.pm $(INST_MAN3DIR)/URI::Split.$(MAN3EXT) \
	  lib/URI/URL.pm $(INST_MAN3DIR)/URI::URL.$(MAN3EXT) \
	  lib/URI/WithBase.pm $(INST_MAN3DIR)/URI::WithBase.$(MAN3EXT) \
	  lib/URI/_punycode.pm $(INST_MAN3DIR)/URI::_punycode.$(MAN3EXT) \
	  lib/URI/data.pm $(INST_MAN3DIR)/URI::data.$(MAN3EXT) \
	  lib/URI/file.pm $(INST_MAN3DIR)/URI::file.$(MAN3EXT) \
	  lib/URI/ldap.pm $(INST_MAN3DIR)/URI::ldap.$(MAN3EXT) 




# --- MakeMaker processPL section:


# --- MakeMaker installbin section:


# --- MakeMaker subdirs section:

# none

# --- MakeMaker clean_subdirs section:
clean_subdirs :
	$(NOECHO) $(NOOP)


# --- MakeMaker clean section:

# Delete temporary files but do not touch installed files. We don't delete
# the Makefile here so a later make realclean still has a makefile to use.

clean :: clean_subdirs
	- $(RM_F) \
	  $(BASEEXT).bso $(BASEEXT).def \
	  $(BASEEXT).exp $(BASEEXT).x \
	  $(BOOTSTRAP) $(INST_ARCHAUTODIR)/extralibs.all \
	  $(INST_ARCHAUTODIR)/extralibs.ld $(MAKE_APERL_FILE) \
	  *$(LIB_EXT) *$(OBJ_EXT) \
	  *perl.core MYMETA.json \
	  MYMETA.yml blibdirs.ts \
	  core core.*perl.*.? \
	  core.[0-9] core.[0-9][0-9] \
	  core.[0-9][0-9][0-9] core.[0-9][0-9][0-9][0-9] \
	  core.[0-9][0-9][0-9][0-9][0-9] lib$(BASEEXT).def \
	  mon.out perl \
	  perl$(EXE_EXT) perl.exe \
	  perlmain.c pm_to_blib \
	  pm_to_blib.ts so_locations \
	  tmon.out 
	- $(RM_RF) \
	  blib 
	  $(NOECHO) $(RM_F) $(MAKEFILE_OLD)
	- $(MV) $(FIRST_MAKEFILE) $(MAKEFILE_OLD) $(DEV_NULL)


# --- MakeMaker realclean_subdirs section:
realclean_subdirs :
	$(NOECHO) $(NOOP)


# --- MakeMaker realclean section:
# Delete temporary files (via clean) and also delete dist files
realclean purge ::  clean realclean_subdirs
	- $(RM_F) \
	  $(MAKEFILE_OLD) $(FIRST_MAKEFILE) 
	- $(RM_RF) \
	  $(DISTVNAME) 


# --- MakeMaker metafile section:
metafile : create_distdir
	$(NOECHO) $(ECHO) Generating META.yml
	$(NOECHO) $(ECHO) '---' > META_new.yml
	$(NOECHO) $(ECHO) 'abstract: '\''Uniform Resource Identifiers (absolute and relative)'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'author:' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Gisle Aas <gisle@activestate.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'build_requires:' >> META_new.yml
	$(NOECHO) $(ECHO) '  File::Temp: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  Test::More: '\''0.96'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'configure_requires:' >> META_new.yml
	$(NOECHO) $(ECHO) '  ExtUtils::MakeMaker: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'dynamic_config: 0' >> META_new.yml
	$(NOECHO) $(ECHO) 'generated_by: '\''ExtUtils::MakeMaker version 7.0401, CPAN::Meta::Converter version 2.150001'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'license: perl' >> META_new.yml
	$(NOECHO) $(ECHO) 'meta-spec:' >> META_new.yml
	$(NOECHO) $(ECHO) '  url: http://module-build.sourceforge.net/META-spec-v1.4.html' >> META_new.yml
	$(NOECHO) $(ECHO) '  version: '\''1.4'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'name: URI' >> META_new.yml
	$(NOECHO) $(ECHO) 'no_index:' >> META_new.yml
	$(NOECHO) $(ECHO) '  directory:' >> META_new.yml
	$(NOECHO) $(ECHO) '    - t' >> META_new.yml
	$(NOECHO) $(ECHO) '    - inc' >> META_new.yml
	$(NOECHO) $(ECHO) 'recommends:' >> META_new.yml
	$(NOECHO) $(ECHO) '  Business::ISBN: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'requires:' >> META_new.yml
	$(NOECHO) $(ECHO) '  Exporter: '\''5.57'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  MIME::Base64: '\''2'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  Scalar::Util: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  parent: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  perl: '\''5.008001'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  utf8: '\''0'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'resources:' >> META_new.yml
	$(NOECHO) $(ECHO) '  IRC: irc://irc.perl.org/#lwp' >> META_new.yml
	$(NOECHO) $(ECHO) '  MailingList: mailto:libwww@perl.org' >> META_new.yml
	$(NOECHO) $(ECHO) '  bugtracker: https://rt.cpan.org/Public/Dist/Display.html?Name=URI' >> META_new.yml
	$(NOECHO) $(ECHO) '  repository: https://github.com/libwww-perl/uri.git' >> META_new.yml
	$(NOECHO) $(ECHO) 'version: '\''1.71'\''' >> META_new.yml
	$(NOECHO) $(ECHO) 'x_authority: cpan:GAAS' >> META_new.yml
	$(NOECHO) $(ECHO) 'x_contributors:' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Gisle Aas <gisle@aas.no>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Karen Etheridge <ether@cpan.org>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Ville Skytt\x{00e4} <ville.skytta@iki.fi>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Mark Stosberg <mark@stosberg.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Michael G. Schwern <schwern@pobox.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Olaf Alders <olaf@wundersolutions.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Slaven Rezic <slaven@rezic.de>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Matt Lawrence <matthewlawrence@venda.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Peter Rabbitson <ribasushi@cpan.org>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Piotr Roszatycki <piotr.roszatycki@gmail.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Salvatore Bonaccorso <carnil@launchpad.net>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Tatsuhiko Miyagawa <miyagawa@bulknews.net>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Torsten F\x{00f6}rtsch <torsten.foertsch@gmx.net>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Adam Herzog <adam@adamherzog.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''gerard <gerard@tty.nl>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Alex Kapranoff <kapranoff@gmail.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Brendan Byrd <Perl@ResonatorSoft.org>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''David Schmidt <davewood@gmx.at>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Jan Dubois <jand@activestate.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''John Miller <john@rimmkaufman.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Kenichi Ishigaki <ishigaki@cpan.org>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Kent Fredric <kentfredric@gmail.com>'\''' >> META_new.yml
	$(NOECHO) $(ECHO) '  - '\''Masahiro Honma <hiratara@cpan.org>'\''' >> META_new.yml
	-$(NOECHO) $(MV) META_new.yml $(DISTVNAME)/META.yml
	$(NOECHO) $(ECHO) Generating META.json
	$(NOECHO) $(ECHO) '{' > META_new.json
	$(NOECHO) $(ECHO) '   "abstract" : "Uniform Resource Identifiers (absolute and relative)",' >> META_new.json
	$(NOECHO) $(ECHO) '   "author" : [' >> META_new.json
	$(NOECHO) $(ECHO) '      "Gisle Aas <gisle@activestate.com>"' >> META_new.json
	$(NOECHO) $(ECHO) '   ],' >> META_new.json
	$(NOECHO) $(ECHO) '   "dynamic_config" : 0,' >> META_new.json
	$(NOECHO) $(ECHO) '   "generated_by" : "ExtUtils::MakeMaker version 7.0401, CPAN::Meta::Converter version 2.150001",' >> META_new.json
	$(NOECHO) $(ECHO) '   "license" : [' >> META_new.json
	$(NOECHO) $(ECHO) '      "perl_5"' >> META_new.json
	$(NOECHO) $(ECHO) '   ],' >> META_new.json
	$(NOECHO) $(ECHO) '   "meta-spec" : {' >> META_new.json
	$(NOECHO) $(ECHO) '      "url" : "http://search.cpan.org/perldoc?CPAN::Meta::Spec",' >> META_new.json
	$(NOECHO) $(ECHO) '      "version" : "2"' >> META_new.json
	$(NOECHO) $(ECHO) '   },' >> META_new.json
	$(NOECHO) $(ECHO) '   "name" : "URI",' >> META_new.json
	$(NOECHO) $(ECHO) '   "no_index" : {' >> META_new.json
	$(NOECHO) $(ECHO) '      "directory" : [' >> META_new.json
	$(NOECHO) $(ECHO) '         "t",' >> META_new.json
	$(NOECHO) $(ECHO) '         "inc"' >> META_new.json
	$(NOECHO) $(ECHO) '      ]' >> META_new.json
	$(NOECHO) $(ECHO) '   },' >> META_new.json
	$(NOECHO) $(ECHO) '   "prereqs" : {' >> META_new.json
	$(NOECHO) $(ECHO) '      "configure" : {' >> META_new.json
	$(NOECHO) $(ECHO) '         "requires" : {' >> META_new.json
	$(NOECHO) $(ECHO) '            "ExtUtils::MakeMaker" : "0"' >> META_new.json
	$(NOECHO) $(ECHO) '         }' >> META_new.json
	$(NOECHO) $(ECHO) '      },' >> META_new.json
	$(NOECHO) $(ECHO) '      "runtime" : {' >> META_new.json
	$(NOECHO) $(ECHO) '         "recommends" : {' >> META_new.json
	$(NOECHO) $(ECHO) '            "Business::ISBN" : "0"' >> META_new.json
	$(NOECHO) $(ECHO) '         },' >> META_new.json
	$(NOECHO) $(ECHO) '         "requires" : {' >> META_new.json
	$(NOECHO) $(ECHO) '            "Exporter" : "5.57",' >> META_new.json
	$(NOECHO) $(ECHO) '            "MIME::Base64" : "2",' >> META_new.json
	$(NOECHO) $(ECHO) '            "Scalar::Util" : "0",' >> META_new.json
	$(NOECHO) $(ECHO) '            "parent" : "0",' >> META_new.json
	$(NOECHO) $(ECHO) '            "perl" : "5.008001",' >> META_new.json
	$(NOECHO) $(ECHO) '            "utf8" : "0"' >> META_new.json
	$(NOECHO) $(ECHO) '         }' >> META_new.json
	$(NOECHO) $(ECHO) '      },' >> META_new.json
	$(NOECHO) $(ECHO) '      "test" : {' >> META_new.json
	$(NOECHO) $(ECHO) '         "requires" : {' >> META_new.json
	$(NOECHO) $(ECHO) '            "File::Temp" : "0",' >> META_new.json
	$(NOECHO) $(ECHO) '            "Test::More" : "0.96"' >> META_new.json
	$(NOECHO) $(ECHO) '         }' >> META_new.json
	$(NOECHO) $(ECHO) '      }' >> META_new.json
	$(NOECHO) $(ECHO) '   },' >> META_new.json
	$(NOECHO) $(ECHO) '   "release_status" : "stable",' >> META_new.json
	$(NOECHO) $(ECHO) '   "resources" : {' >> META_new.json
	$(NOECHO) $(ECHO) '      "bugtracker" : {' >> META_new.json
	$(NOECHO) $(ECHO) '         "mailto" : "bug-URI@rt.cpan.org",' >> META_new.json
	$(NOECHO) $(ECHO) '         "web" : "https://rt.cpan.org/Public/Dist/Display.html?Name=URI"' >> META_new.json
	$(NOECHO) $(ECHO) '      },' >> META_new.json
	$(NOECHO) $(ECHO) '      "repository" : {' >> META_new.json
	$(NOECHO) $(ECHO) '         "type" : "git",' >> META_new.json
	$(NOECHO) $(ECHO) '         "url" : "https://github.com/libwww-perl/uri.git",' >> META_new.json
	$(NOECHO) $(ECHO) '         "web" : "https://github.com/libwww-perl/uri"' >> META_new.json
	$(NOECHO) $(ECHO) '      },' >> META_new.json
	$(NOECHO) $(ECHO) '      "x_IRC" : "irc://irc.perl.org/#lwp",' >> META_new.json
	$(NOECHO) $(ECHO) '      "x_MailingList" : "mailto:libwww@perl.org"' >> META_new.json
	$(NOECHO) $(ECHO) '   },' >> META_new.json
	$(NOECHO) $(ECHO) '   "version" : "1.71",' >> META_new.json
	$(NOECHO) $(ECHO) '   "x_authority" : "cpan:GAAS",' >> META_new.json
	$(NOECHO) $(ECHO) '   "x_contributors" : [' >> META_new.json
	$(NOECHO) $(ECHO) '      "Gisle Aas <gisle@aas.no>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Karen Etheridge <ether@cpan.org>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Ville Skytt\x{00e4} <ville.skytta@iki.fi>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Mark Stosberg <mark@stosberg.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Michael G. Schwern <schwern@pobox.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Olaf Alders <olaf@wundersolutions.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Slaven Rezic <slaven@rezic.de>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Matt Lawrence <matthewlawrence@venda.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Peter Rabbitson <ribasushi@cpan.org>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Piotr Roszatycki <piotr.roszatycki@gmail.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Salvatore Bonaccorso <carnil@launchpad.net>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Tatsuhiko Miyagawa <miyagawa@bulknews.net>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Torsten F\x{00f6}rtsch <torsten.foertsch@gmx.net>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Adam Herzog <adam@adamherzog.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "gerard <gerard@tty.nl>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Alex Kapranoff <kapranoff@gmail.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Brendan Byrd <Perl@ResonatorSoft.org>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "David Schmidt <davewood@gmx.at>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Jan Dubois <jand@activestate.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "John Miller <john@rimmkaufman.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Kenichi Ishigaki <ishigaki@cpan.org>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Kent Fredric <kentfredric@gmail.com>",' >> META_new.json
	$(NOECHO) $(ECHO) '      "Masahiro Honma <hiratara@cpan.org>"' >> META_new.json
	$(NOECHO) $(ECHO) '   ]' >> META_new.json
	$(NOECHO) $(ECHO) '}' >> META_new.json
	-$(NOECHO) $(MV) META_new.json $(DISTVNAME)/META.json


# --- MakeMaker signature section:
signature :
	cpansign -s


# --- MakeMaker dist_basics section:
distclean :: realclean distcheck
	$(NOECHO) $(NOOP)

distcheck :
	$(PERLRUN) "-MExtUtils::Manifest=fullcheck" -e fullcheck

skipcheck :
	$(PERLRUN) "-MExtUtils::Manifest=skipcheck" -e skipcheck

manifest :
	$(PERLRUN) "-MExtUtils::Manifest=mkmanifest" -e mkmanifest

veryclean : realclean
	$(RM_F) *~ */*~ *.orig */*.orig *.bak */*.bak *.old */*.old



# --- MakeMaker dist_core section:

dist : $(DIST_DEFAULT) $(FIRST_MAKEFILE)
	$(NOECHO) $(ABSPERLRUN) -l -e 'print '\''Warning: Makefile possibly out of date with $(VERSION_FROM)'\''' \
	  -e '    if -e '\''$(VERSION_FROM)'\'' and -M '\''$(VERSION_FROM)'\'' < -M '\''$(FIRST_MAKEFILE)'\'';' --

tardist : $(DISTVNAME).tar$(SUFFIX)
	$(NOECHO) $(NOOP)

uutardist : $(DISTVNAME).tar$(SUFFIX)
	uuencode $(DISTVNAME).tar$(SUFFIX) $(DISTVNAME).tar$(SUFFIX) > $(DISTVNAME).tar$(SUFFIX)_uu
	$(NOECHO) $(ECHO) 'Created $(DISTVNAME).tar$(SUFFIX)_uu'

$(DISTVNAME).tar$(SUFFIX) : distdir
	$(PREOP)
	$(TO_UNIX)
	$(TAR) $(TARFLAGS) $(DISTVNAME).tar $(DISTVNAME)
	$(RM_RF) $(DISTVNAME)
	$(COMPRESS) $(DISTVNAME).tar
	$(NOECHO) $(ECHO) 'Created $(DISTVNAME).tar$(SUFFIX)'
	$(POSTOP)

zipdist : $(DISTVNAME).zip
	$(NOECHO) $(NOOP)

$(DISTVNAME).zip : distdir
	$(PREOP)
	$(ZIP) $(ZIPFLAGS) $(DISTVNAME).zip $(DISTVNAME)
	$(RM_RF) $(DISTVNAME)
	$(NOECHO) $(ECHO) 'Created $(DISTVNAME).zip'
	$(POSTOP)

shdist : distdir
	$(PREOP)
	$(SHAR) $(DISTVNAME) > $(DISTVNAME).shar
	$(RM_RF) $(DISTVNAME)
	$(NOECHO) $(ECHO) 'Created $(DISTVNAME).shar'
	$(POSTOP)


# --- MakeMaker distdir section:
create_distdir :
	$(RM_RF) $(DISTVNAME)
	$(PERLRUN) "-MExtUtils::Manifest=manicopy,maniread" \
		-e "manicopy(maniread(),'$(DISTVNAME)', '$(DIST_CP)');"

distdir : create_distdir distmeta 
	$(NOECHO) $(NOOP)



# --- MakeMaker dist_test section:
disttest : distdir
	cd $(DISTVNAME) && $(ABSPERLRUN) Makefile.PL 
	cd $(DISTVNAME) && $(MAKE) $(PASTHRU)
	cd $(DISTVNAME) && $(MAKE) test $(PASTHRU)



# --- MakeMaker dist_ci section:

ci :
	$(PERLRUN) "-MExtUtils::Manifest=maniread" \
	  -e "@all = keys %{ maniread() };" \
	  -e "print(qq{Executing $(CI) @all\n}); system(qq{$(CI) @all});" \
	  -e "print(qq{Executing $(RCS_LABEL) ...\n}); system(qq{$(RCS_LABEL) @all});"


# --- MakeMaker distmeta section:
distmeta : create_distdir metafile
	$(NOECHO) cd $(DISTVNAME) && $(ABSPERLRUN) -MExtUtils::Manifest=maniadd -e 'exit unless -e q{META.yml};' \
	  -e 'eval { maniadd({q{META.yml} => q{Module YAML meta-data (added by MakeMaker)}}) }' \
	  -e '    or print "Could not add META.yml to MANIFEST: $$$${'\''@'\''}\n"' --
	$(NOECHO) cd $(DISTVNAME) && $(ABSPERLRUN) -MExtUtils::Manifest=maniadd -e 'exit unless -f q{META.json};' \
	  -e 'eval { maniadd({q{META.json} => q{Module JSON meta-data (added by MakeMaker)}}) }' \
	  -e '    or print "Could not add META.json to MANIFEST: $$$${'\''@'\''}\n"' --



# --- MakeMaker distsignature section:
distsignature : create_distdir
	$(NOECHO) cd $(DISTVNAME) && $(ABSPERLRUN) -MExtUtils::Manifest=maniadd -e 'eval { maniadd({q{SIGNATURE} => q{Public-key signature (added by MakeMaker)}}) }' \
	  -e '    or print "Could not add SIGNATURE to MANIFEST: $$$${'\''@'\''}\n"' --
	$(NOECHO) cd $(DISTVNAME) && $(TOUCH) SIGNATURE
	cd $(DISTVNAME) && cpansign -s



# --- MakeMaker install section:

install :: pure_install doc_install
	$(NOECHO) $(NOOP)

install_perl :: pure_perl_install doc_perl_install
	$(NOECHO) $(NOOP)

install_site :: pure_site_install doc_site_install
	$(NOECHO) $(NOOP)

install_vendor :: pure_vendor_install doc_vendor_install
	$(NOECHO) $(NOOP)

pure_install :: pure_$(INSTALLDIRS)_install
	$(NOECHO) $(NOOP)

doc_install :: doc_$(INSTALLDIRS)_install
	$(NOECHO) $(NOOP)

pure__install : pure_site_install
	$(NOECHO) $(ECHO) INSTALLDIRS not defined, defaulting to INSTALLDIRS=site

doc__install : doc_site_install
	$(NOECHO) $(ECHO) INSTALLDIRS not defined, defaulting to INSTALLDIRS=site

pure_perl_install :: all
	$(NOECHO) $(MOD_INSTALL) \
		read "$(PERL_ARCHLIB)/auto/$(FULLEXT)/.packlist" \
		write "$(DESTINSTALLARCHLIB)/auto/$(FULLEXT)/.packlist" \
		"$(INST_LIB)" "$(DESTINSTALLPRIVLIB)" \
		"$(INST_ARCHLIB)" "$(DESTINSTALLARCHLIB)" \
		"$(INST_BIN)" "$(DESTINSTALLBIN)" \
		"$(INST_SCRIPT)" "$(DESTINSTALLSCRIPT)" \
		"$(INST_MAN1DIR)" "$(DESTINSTALLMAN1DIR)" \
		"$(INST_MAN3DIR)" "$(DESTINSTALLMAN3DIR)"
	$(NOECHO) $(WARN_IF_OLD_PACKLIST) \
		"$(SITEARCHEXP)/auto/$(FULLEXT)"


pure_site_install :: all
	$(NOECHO) $(MOD_INSTALL) \
		read "$(SITEARCHEXP)/auto/$(FULLEXT)/.packlist" \
		write "$(DESTINSTALLSITEARCH)/auto/$(FULLEXT)/.packlist" \
		"$(INST_LIB)" "$(DESTINSTALLSITELIB)" \
		"$(INST_ARCHLIB)" "$(DESTINSTALLSITEARCH)" \
		"$(INST_BIN)" "$(DESTINSTALLSITEBIN)" \
		"$(INST_SCRIPT)" "$(DESTINSTALLSITESCRIPT)" \
		"$(INST_MAN1DIR)" "$(DESTINSTALLSITEMAN1DIR)" \
		"$(INST_MAN3DIR)" "$(DESTINSTALLSITEMAN3DIR)"
	$(NOECHO) $(WARN_IF_OLD_PACKLIST) \
		"$(PERL_ARCHLIB)/auto/$(FULLEXT)"

pure_vendor_install :: all
	$(NOECHO) $(MOD_INSTALL) \
		read "$(VENDORARCHEXP)/auto/$(FULLEXT)/.packlist" \
		write "$(DESTINSTALLVENDORARCH)/auto/$(FULLEXT)/.packlist" \
		"$(INST_LIB)" "$(DESTINSTALLVENDORLIB)" \
		"$(INST_ARCHLIB)" "$(DESTINSTALLVENDORARCH)" \
		"$(INST_BIN)" "$(DESTINSTALLVENDORBIN)" \
		"$(INST_SCRIPT)" "$(DESTINSTALLVENDORSCRIPT)" \
		"$(INST_MAN1DIR)" "$(DESTINSTALLVENDORMAN1DIR)" \
		"$(INST_MAN3DIR)" "$(DESTINSTALLVENDORMAN3DIR)"


doc_perl_install :: all
	$(NOECHO) $(ECHO) Appending installation info to "$(DESTINSTALLARCHLIB)/perllocal.pod"
	-$(NOECHO) $(MKPATH) "$(DESTINSTALLARCHLIB)"
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" $(INSTALLPRIVLIB) \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> "$(DESTINSTALLARCHLIB)/perllocal.pod"

doc_site_install :: all
	$(NOECHO) $(ECHO) Appending installation info to "$(DESTINSTALLARCHLIB)/perllocal.pod"
	-$(NOECHO) $(MKPATH) "$(DESTINSTALLARCHLIB)"
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" $(INSTALLSITELIB) \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> "$(DESTINSTALLARCHLIB)/perllocal.pod"

doc_vendor_install :: all
	$(NOECHO) $(ECHO) Appending installation info to "$(DESTINSTALLARCHLIB)/perllocal.pod"
	-$(NOECHO) $(MKPATH) "$(DESTINSTALLARCHLIB)"
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" $(INSTALLVENDORLIB) \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> "$(DESTINSTALLARCHLIB)/perllocal.pod"


uninstall :: uninstall_from_$(INSTALLDIRS)dirs
	$(NOECHO) $(NOOP)

uninstall_from_perldirs ::
	$(NOECHO) $(UNINSTALL) "$(PERL_ARCHLIB)/auto/$(FULLEXT)/.packlist"

uninstall_from_sitedirs ::
	$(NOECHO) $(UNINSTALL) "$(SITEARCHEXP)/auto/$(FULLEXT)/.packlist"

uninstall_from_vendordirs ::
	$(NOECHO) $(UNINSTALL) "$(VENDORARCHEXP)/auto/$(FULLEXT)/.packlist"


# --- MakeMaker force section:
# Phony target to force checking subdirectories.
FORCE :
	$(NOECHO) $(NOOP)


# --- MakeMaker perldepend section:


# --- MakeMaker makefile section:
# We take a very conservative approach here, but it's worth it.
# We move Makefile to Makefile.old here to avoid gnu make looping.
$(FIRST_MAKEFILE) : Makefile.PL $(CONFIGDEP)
	$(NOECHO) $(ECHO) "Makefile out-of-date with respect to $?"
	$(NOECHO) $(ECHO) "Cleaning current config before rebuilding Makefile..."
	-$(NOECHO) $(RM_F) $(MAKEFILE_OLD)
	-$(NOECHO) $(MV)   $(FIRST_MAKEFILE) $(MAKEFILE_OLD)
	- $(MAKE) $(USEMAKEFILE) $(MAKEFILE_OLD) clean $(DEV_NULL)
	$(PERLRUN) Makefile.PL 
	$(NOECHO) $(ECHO) "==> Your Makefile has been rebuilt. <=="
	$(NOECHO) $(ECHO) "==> Please rerun the $(MAKE) command.  <=="
	$(FALSE)



# --- MakeMaker staticmake section:

# --- MakeMaker makeaperl section ---
MAP_TARGET    = perl
FULLPERL      = "/opt/apcera/perl-5.22.1/bin/perl"

$(MAP_TARGET) :: static $(MAKE_APERL_FILE)
	$(MAKE) $(USEMAKEFILE) $(MAKE_APERL_FILE) $@

$(MAKE_APERL_FILE) : $(FIRST_MAKEFILE) pm_to_blib
	$(NOECHO) $(ECHO) Writing \"$(MAKE_APERL_FILE)\" for this $(MAP_TARGET)
	$(NOECHO) $(PERLRUNINST) \
		Makefile.PL DIR="" \
		MAKEFILE=$(MAKE_APERL_FILE) LINKTYPE=static \
		MAKEAPERL=1 NORECURS=1 CCCDLFLAGS=


# --- MakeMaker test section:

TEST_VERBOSE=0
TEST_TYPE=test_$(LINKTYPE)
TEST_FILE = test.pl
TEST_FILES = t/*.t
TESTDB_SW = -d

testdb :: testdb_$(LINKTYPE)

test :: $(TEST_TYPE) subdirs-test

subdirs-test ::
	$(NOECHO) $(NOOP)


test_dynamic :: pure_all
	PERL_DL_NONLAZY=1 $(FULLPERLRUN) "-MExtUtils::Command::MM" "-MTest::Harness" "-e" "undef *Test::Harness::Switches; test_harness($(TEST_VERBOSE), '$(INST_LIB)', '$(INST_ARCHLIB)')" $(TEST_FILES)

testdb_dynamic :: pure_all
	PERL_DL_NONLAZY=1 $(FULLPERLRUN) $(TESTDB_SW) "-I$(INST_LIB)" "-I$(INST_ARCHLIB)" $(TEST_FILE)

test_ : test_dynamic

test_static :: test_dynamic
testdb_static :: testdb_dynamic


# --- MakeMaker ppd section:
# Creates a PPD (Perl Package Description) for a binary distribution.
ppd :
	$(NOECHO) $(ECHO) '<SOFTPKG NAME="$(DISTNAME)" VERSION="$(VERSION)">' > $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <ABSTRACT>Uniform Resource Identifiers (absolute and relative)</ABSTRACT>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <AUTHOR>Gisle Aas &lt;gisle@activestate.com&gt;</AUTHOR>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <IMPLEMENTATION>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <PERLCORE VERSION="5,008001,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <REQUIRE NAME="Exporter::" VERSION="5.57" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <REQUIRE NAME="MIME::Base64" VERSION="2" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <REQUIRE NAME="Scalar::Util" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <REQUIRE NAME="parent::" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <REQUIRE NAME="utf8::" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <ARCHITECTURE NAME="x86_64-linux-5.22" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <CODEBASE HREF="" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    </IMPLEMENTATION>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '</SOFTPKG>' >> $(DISTNAME).ppd


# --- MakeMaker pm_to_blib section:

pm_to_blib : $(FIRST_MAKEFILE) $(TO_INST_PM)
	$(NOECHO) $(ABSPERLRUN) -MExtUtils::Install -e 'pm_to_blib({@ARGV}, '\''$(INST_LIB)/auto'\'', q[$(PM_FILTER)], '\''$(PERM_DIR)'\'')' -- \
	  lib/URI.pm blib/lib/URI.pm \
	  lib/URI/Escape.pm blib/lib/URI/Escape.pm \
	  lib/URI/Heuristic.pm blib/lib/URI/Heuristic.pm \
	  lib/URI/IRI.pm blib/lib/URI/IRI.pm \
	  lib/URI/QueryParam.pm blib/lib/URI/QueryParam.pm \
	  lib/URI/Split.pm blib/lib/URI/Split.pm \
	  lib/URI/URL.pm blib/lib/URI/URL.pm \
	  lib/URI/WithBase.pm blib/lib/URI/WithBase.pm \
	  lib/URI/_foreign.pm blib/lib/URI/_foreign.pm \
	  lib/URI/_generic.pm blib/lib/URI/_generic.pm \
	  lib/URI/_idna.pm blib/lib/URI/_idna.pm \
	  lib/URI/_ldap.pm blib/lib/URI/_ldap.pm \
	  lib/URI/_login.pm blib/lib/URI/_login.pm \
	  lib/URI/_punycode.pm blib/lib/URI/_punycode.pm \
	  lib/URI/_query.pm blib/lib/URI/_query.pm \
	  lib/URI/_segment.pm blib/lib/URI/_segment.pm \
	  lib/URI/_server.pm blib/lib/URI/_server.pm \
	  lib/URI/_userpass.pm blib/lib/URI/_userpass.pm \
	  lib/URI/data.pm blib/lib/URI/data.pm \
	  lib/URI/file.pm blib/lib/URI/file.pm \
	  lib/URI/file/Base.pm blib/lib/URI/file/Base.pm \
	  lib/URI/file/FAT.pm blib/lib/URI/file/FAT.pm \
	  lib/URI/file/Mac.pm blib/lib/URI/file/Mac.pm \
	  lib/URI/file/OS2.pm blib/lib/URI/file/OS2.pm \
	  lib/URI/file/QNX.pm blib/lib/URI/file/QNX.pm \
	  lib/URI/file/Unix.pm blib/lib/URI/file/Unix.pm \
	  lib/URI/file/Win32.pm blib/lib/URI/file/Win32.pm \
	  lib/URI/ftp.pm blib/lib/URI/ftp.pm \
	  lib/URI/gopher.pm blib/lib/URI/gopher.pm \
	  lib/URI/http.pm blib/lib/URI/http.pm \
	  lib/URI/https.pm blib/lib/URI/https.pm \
	  lib/URI/ldap.pm blib/lib/URI/ldap.pm \
	  lib/URI/ldapi.pm blib/lib/URI/ldapi.pm \
	  lib/URI/ldaps.pm blib/lib/URI/ldaps.pm \
	  lib/URI/mailto.pm blib/lib/URI/mailto.pm \
	  lib/URI/mms.pm blib/lib/URI/mms.pm \
	  lib/URI/news.pm blib/lib/URI/news.pm \
	  lib/URI/nntp.pm blib/lib/URI/nntp.pm \
	  lib/URI/pop.pm blib/lib/URI/pop.pm \
	  lib/URI/rlogin.pm blib/lib/URI/rlogin.pm \
	  lib/URI/rsync.pm blib/lib/URI/rsync.pm \
	  lib/URI/rtsp.pm blib/lib/URI/rtsp.pm \
	  lib/URI/rtspu.pm blib/lib/URI/rtspu.pm \
	  lib/URI/sftp.pm blib/lib/URI/sftp.pm \
	  lib/URI/sip.pm blib/lib/URI/sip.pm \
	  lib/URI/sips.pm blib/lib/URI/sips.pm \
	  lib/URI/snews.pm blib/lib/URI/snews.pm \
	  lib/URI/ssh.pm blib/lib/URI/ssh.pm \
	  lib/URI/telnet.pm blib/lib/URI/telnet.pm \
	  lib/URI/tn3270.pm blib/lib/URI/tn3270.pm \
	  lib/URI/urn.pm blib/lib/URI/urn.pm \
	  lib/URI/urn/isbn.pm blib/lib/URI/urn/isbn.pm \
	  lib/URI/urn/oid.pm blib/lib/URI/urn/oid.pm 
	$(NOECHO) $(TOUCH) pm_to_blib


# --- MakeMaker selfdocument section:


# --- MakeMaker postamble section:


# End.
