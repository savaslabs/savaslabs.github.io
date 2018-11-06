require 'html-proofer'

task :test do
  HTMLProofer.check_directories(
    ["./_site"], {
      :allow_hash_href => true,
      :parallel => {:in_processes => 4},
      :only_4xx => true,
      :url_ignore => [/drupal.org/,
                      /linkedin.com/,
                      /fldrupal.camp/,
                      /huffingtonpost.com/,
                      /#.*/,
                      ],
      :empty_alt_ignore => false,
      :verbose => true,
      :typhoeus => {
        :timeout => 3 }
    }).run
end
