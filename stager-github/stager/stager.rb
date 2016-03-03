#!/usr/bin/env ruby

require "bundler"
Bundler.setup
require "open3"
require "apcera-stager-api"
require "json"

STDOUT.sync = true
@stager = Apcera::Stager.new

# Validates multiple aspects of the url given by the user to ensure it it a git
# clonable, https URL without credientials in it.
def validateGithubUrl(val)
  begin
      valid=true
      uri = URI.parse val
      if !uri.kind_of? URI::HTTPS
          @stager.output_error "Error: URL for repo must be HTTPS"
          valid=false
      end
      if uri.userinfo
          @stager.output_error "Error: URL must not include user name or password"
          valid=false
      end
      if uri.host!="github.com"
          @stager.output_error "Error: URL host must be github.com"
          valid=false
      end
      if !uri.path.end_with? ".git"
          @stager.output_error "Error: URL path must end in .git"
          valid=false
      end
      valid
  rescue URI::InvalidURIError => e
      p e
      false
  end
end

@stager.download
@stager.extract()

file = File.open(File.join(@stager.app_path,"github.conf"), "rb")
file_hash=JSON.parse(file.read)
File.delete(file.path)

gh_url = file_hash['https_url']
gh_dir = file_hash['repo_directory']
gh_username = file_hash['user']
gh_password = file_hash['password']

if !validateGithubUrl(gh_url)
  @stager.fail
end

# Create @stager to --depends-on package.git so that git is available
puts "Cloning #{gh_url}..."
cmd = "git clone".split(' ')
gh_root = "/tmp/github"
if gh_username && gh_password
  # Have to pass user name and passwords without prompts; can set the username
  # via a config option, but the password has to be invoked as an external
  # command that puts the command into STDOUT.
  f = Tempfile.new('foo')
  begin
     File.open(f, 'w') { |file| file.write("echo #{gh_password}") }
     f.close
    `chmod +x #{f.path}`
    options="--config crediential.username=#{gh_username} --config core.askpass=#{f.path}".split(' ')
    @stager.execute(*cmd,*options, gh_url, gh_root)
    ensure
       f.close
       f.unlink
    end
else
  @stager.execute(*cmd, gh_url, gh_root)
end

if gh_dir
  gh_files = File.join(gh_root,gh_dir,"*")
else
  gh_files = File.join(gh_root,"*")
end

puts "Uploading #{gh_files}..."
@stager.execute_app("mv #{gh_files} .")
@stager.complete
