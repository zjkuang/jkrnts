# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

import yaml
from os import listdir
from os.path import isfile, join

print('yaml version:', yaml.__version__)

print('List yaml files:')
onlyfiles = [f for f in listdir('../yaml') if isfile(join('../yaml', f))]
for f in onlyfiles:
  print(' - ', f)
print('End of list.')

if __name__ == '__main__':
  with open ('../yaml/greetings.yaml', 'r') as foo:
    dict = yaml.safe_load(foo)

  for key, value in dict.items():
    print(key + ":" + str(value))
