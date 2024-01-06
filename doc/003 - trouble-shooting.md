(1) `pod install` shows "Ignoring ffi-1.13.1 because its extensions are not built. Try: gem pristine ffi --version 1.13.1"

// https://stackoverflow.com/a/65248326
`gem install ffi --version 1.13.1 --user-install`
Then add the installation path to mPATH variable: add this line to my ~/.zshrc:
export PATH=$HOME/.gem/ruby/2.6.0/bin:$PATH

(2) On Android device: "Unable to load script. Make sure you're either running Metro (run 'react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release."
`adb reverse tcp:8081 tcp:8081`

(3) Running on iPad only shows an iphone size screen
// https://stackoverflow.com/a/67933699/7455975
Open your YOURPROJECT.xcworkspace in xcode. Choose your target, then on "General" tab, tick the "iPad" checkbox.

(4)
error:
npm notice Beginning October 4, 2021, all connections to the npm registry - including for package installation - must use TLS 1.2 or higher. You are currently using plaintext http to connect. Please visit the GitHub blog for more information: https://github.blog/2021-08-23-npm-registry-deprecating-tls-1-0-tls-1-1/

Investigation:
`npm config get registry`
and the output was "http://registry.npmjs.org/" -- which should be "https://..."

Solution:
https://stackoverflow.com/a/70555822/7455975
`npm set registry=https://registry.npmjs.org/`

(5)
`pod install` failed at
```
Installing glog 0.3.5
```

# Solution
https://github.com/facebook/react-native/commit/4a7e4b9ca6ef4fb52611b6c3cb788f624d1f81a4

In `node_modules/react-native/scripts/ios-configure-glog.sh`, change
```
sed -i '' 's/\@ac_cv_have_libgflags\@/0/' src/glog/logging.h.in
sed -i '' 's/HAVE_LIB_GFLAGS/HAVE_LIB_GFLAGS_DISABLED/' src/config.h.in
```
to
```
sed -i.bak -e 's/\@ac_cv_have_libgflags\@/0/' src/glog/logging.h.in && rm src/glog/logging.h.in.bak
sed -i.bak -e 's/HAVE_LIB_GFLAGS/HAVE_LIB_GFLAGS_DISABLED/' src/config.h.in && rm src/config.h.in.bak
```

(6) `yarn install` failure at `@zjkuang/i18next-wizard`:
```
PythonShellError: ModuleNotFoundError: No module named 'yaml'
```
In Terminal, run
```
pip3 install pyyaml
```

(7) `yarn pod` failure
```
Could not find cocoapods-1.11.3 in any of the sources
Run `bundle install` to install missing gems.
```
In Terminal,
```
cd ios
bundle install
cd ..
yarn pod
```
