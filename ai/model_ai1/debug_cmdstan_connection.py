import os
import sys
import logging

# Ensure RTools/Mingw compilers are in PATH
rtools_path = r"C:\Users\nirmi\.cmdstan\RTools40"
mingw64_bin = os.path.join(rtools_path, "mingw64", "bin")
usr_bin = os.path.join(rtools_path, "usr", "bin")
if os.path.exists(mingw64_bin):
    os.environ["PATH"] = f"{mingw64_bin};{usr_bin};" + os.environ["PATH"]

# Set logger
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("cmdstanpy")

import cmdstanpy
print(f"CmdStanPy version: {cmdstanpy.__version__}")

path = cmdstanpy.cmdstan_path()
print(f"CmdStan path: {path}")

try:
    from cmdstanpy.model import CmdStanModel
    print("Trying to compile a simple model...")
    stan_file = "check_model.stan"
    with open(stan_file, "w") as f:
        f.write("parameters { real y; } model { y ~ normal(0,1); }")
    
    model = CmdStanModel(stan_file=stan_file)
    model.compile()
    print("[OK] Model compiled successfully!")
except Exception as e:
    print(f"[FAIL] Model compilation failed: {e}")

print("Importing Prophet...")
try:
    from prophet import Prophet
    m = Prophet()
    print("[OK] Prophet initialized successfully")
except Exception as e:
    print(f"[FAIL] Prophet initialization failed: {e}")
