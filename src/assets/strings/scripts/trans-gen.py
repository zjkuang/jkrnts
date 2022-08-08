# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

import yaml

print('yaml version:', yaml.__version__)

if __name__ == '__main__':
  with open ("../yaml/greetings.yaml", "r") as foo:
    dict = yaml.safe_load(foo)

  for key, value in dict.items():
    print(key + ":" + str(value))
