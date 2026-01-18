import cmdstanpy
print(f"CmdStanPy version: {cmdstanpy.__version__}")
try:
    path = cmdstanpy.cmdstan_path()
    print(f"CmdStan path: {path}")
    import os
    if os.path.exists(path):
        print("CmdStan path exists.")
    else:
        print("CmdStan path does NOT exist.")
except Exception as e:
    print(f"Error finding cmdstan: {e}")
