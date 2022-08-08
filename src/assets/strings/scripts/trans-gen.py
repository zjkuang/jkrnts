# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

import yaml
from os import listdir
from os.path import isfile, join

print('yaml version:', yaml.__version__)

yamldir = '../yaml'

def getFileList():
  onlyfiles = [f for f in listdir(yamldir) if isfile(join(yamldir, f))]
  return onlyfiles

def testGetFileList(filelist):
  print('List yaml files:')
  for f in filelist:
    print(' - ', f)
  print('End of list.')

def loadFile(file):
  with open(join(yamldir, file), 'r') as f:
    o = yaml.safe_load(f)
    return o

if __name__ == '__main__':
  files = getFileList()
  for f in files:
    o = loadFile(f)
    print('Contents in ', f)
    print(type(o))
    if isinstance(o, dict):
      print('Is dict')
    print(o)
    for key, value in o.items():
      if isinstance(value, list):
        print('Is list')
      elif isinstance(value, dict):
        print('Is dict')
      print(type(value))
