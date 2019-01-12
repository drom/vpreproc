{
  "targets": [
    {
      "target_name": "vpreproc",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      "sources": [
        "vpreproc.cpp",
        "Verilog-Perl/Preproc/VFileLine.cpp",
        # "Verilog-Perl/Preproc/VPreProc.cpp",
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "./Verilog-Perl/Preproc/"
      ],
      "libraries": [],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"]
    }
  ]
}
