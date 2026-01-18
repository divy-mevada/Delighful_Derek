import os
import sys

# Add compilers to PATH
rtools_path = r"C:\Users\nirmi\.cmdstan\RTools40"
mingw64_bin = os.path.join(rtools_path, "mingw64", "bin")
usr_bin = os.path.join(rtools_path, "usr", "bin")

os.environ["PATH"] = f"{mingw64_bin};{usr_bin};" + os.environ["PATH"]

print(f"Added to PATH: {mingw64_bin}")
print("Verifying mingw32-make availability...")
print("Verifying mingw32-make availability...")
if os.system("mingw32-make --version") == 0:
    print("[OK] mingw32-make found!")
else:
    print("[FAIL] mingw32-make NOT found in PATH")

print("\nRetrying CmdStan installation...")
from cmdstanpy import install_cmdstan
try:
    install_cmdstan()
    print("[OK] CmdStan installed successfully")
except Exception as e:
    print(f"[FAIL] CmdStan installation failed: {e}")

print("\nTesting Prophet...")
try:
    from prophet import Prophet
    m = Prophet()
    print("[OK] Prophet initialized successfully")
except Exception as e:
    print(f"[FAIL] Prophet initialization failed: {e}")
