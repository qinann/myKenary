Param(
  [string]$SdkPath = "C:\Program Files\Unity\Hub\Editor\6000.0.54f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK",
  [string]$JdkPath = "C:\Program Files\Unity\Hub\Editor\6000.0.54f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK",
  [int]$MetroPort = 8081
)

$env:ANDROID_SDK_ROOT = $SdkPath
$env:JAVA_HOME = $JdkPath
$env:PATH = "$($env:JAVA_HOME)\bin;$($env:ANDROID_SDK_ROOT)\platform-tools;$env:PATH"

Write-Host "ANDROID_SDK_ROOT=" $env:ANDROID_SDK_ROOT
Write-Host "JAVA_HOME=" $env:JAVA_HOME
Write-Host "Using Metro port" $MetroPort

node node_modules/react-native/cli.js run-android --port $MetroPort
