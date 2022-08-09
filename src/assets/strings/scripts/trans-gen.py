# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

from array import array
from genericpath import isdir
import yaml
from os import listdir, mkdir
from os.path import isfile, join, isdir

print('yaml version:', yaml.__version__)

yamlDir = '../yaml'
generatedDir = '../generated'
translationsDir = '/'.join((generatedDir, 'translations'))
translationFiles = []
i18nextStringsFile = '/'.join((generatedDir, 'i18nextStrings.ts'))

def getFileList():
  onlyfiles = [f for f in listdir(yamlDir) if isfile(join(yamlDir, f))]
  return onlyfiles

def loadFile(file):
  with open(join(yamlDir, file), 'r') as f:
    o = yaml.safe_load(f)
    f.close()
    return o

def prepareDirectories():
  if not isdir(generatedDir):
    mkdir(generatedDir)
  if not isdir(translationsDir):
    mkdir(translationsDir)

if __name__ == '__main__':
  prepareDirectories()
  files = getFileList()
  for f in files:
    o = loadFile(f)
    if not isinstance(o, dict):
      continue
    try:
      group = o['group']
    except KeyError:
      continue
    if not isinstance(group, str):
      continue
    print(group)
    try:
      entries = o['entries']
    except KeyError:
      continue
    if not isinstance(entries, list):
      continue
    print(entries)
    # print('Contents in ', f)
    # print(type(o))
    # if isinstance(o, dict):
    #   print('Is dict')
    # print(o)
    # for key, value in o.items():
    #   if isinstance(value, list):
    #     print('Is list')
    #   elif isinstance(value, dict):
    #     print('Is dict')
    #   print(type(value))
