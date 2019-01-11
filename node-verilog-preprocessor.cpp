// #include <stdio.h>
#include <napi.h>
#include <VPreProc.h>

class VFileLineNode;

class VPreProcNode : public VPreProc {
public:
  VPreProcNode() : VPreProc() {}
  virtual ~VPreProcNode();
};

class VFileLineNode : public VFileLine {
};

Napi::String GetVersion(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "0.1.0");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(
    Napi::String::New(env, "version"),
    Napi::Function::New(env, GetVersion)
  );
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
