# Getting Started with React Native

## Install Node.js, JDK, Python 2, expo-cli & react-native-cli
1. [Node.js](https://nodejs.org/en/).
2. Install JDK and Python 2 using [Chocolatey](https://chocolatey.org/).
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
choco install -y python2 jdk8
```
3. Install expo-cli & react-native-cli
```
npm install -g expo-cli
npm install -g react-native-cli
```
4. Install [Android Studio](https://developer.android.com/studio/) following the instructions [Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started) documentation.
5. On phone download 'Expo' app.
6. Add the ANDROID_HOME path variable
```
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
```

## Setting up a new project
1.
```
react-native init myapp
```
2. Open the android folder in Android Studio
3. Open Tools > Android > AVD Manager
4. Create new Virtual Device
5. Launch virtual device
![alt text](virtual-device.jpg "Virtual Device")
6. In terminal run the following command
```
cd myapp
react-native run-android
```

## Authors

* **David Ikin**