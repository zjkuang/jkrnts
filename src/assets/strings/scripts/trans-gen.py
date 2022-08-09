# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

from array import array
from genericpath import isdir
from tabnanny import check
import yaml
from os import listdir, mkdir
from os.path import isfile, join, isdir

print('yaml version:', yaml.__version__)

yamlDir = '../yaml'
generatedDir = '../generated'
translationsDir = '/'.join((generatedDir, 'translations'))
translationFiles = []
i18nextStringsFile = '/'.join((generatedDir, 'i18nextStrings.ts'))

EntryTypeCounted = 'counted'
EntryTypeUndefined = 'undefined'
CountZero = 'zero'
CountOne = 'one'
CountOther = 'other'
ArgTypeBoolean = 'boolean'
ArgTypeNumber = 'number'
ArgTypeString = 'string'
EntryTranslations = 'translations'

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

def checkType(v, c, errorMessage):
  if isinstance(v, c):
    return True
  print(errorMessage)
  return False

def parseEntryArgs(entry):
  entryArgs = []
  try:
    entryArgsRaw = entry['args']
  except KeyError:
    entryArgsRaw = []
  if not checkType(entryArgsRaw, list, 'Parse error: entry args should be a list.'):
    print(entry)
    return []
  entryArgs = entryArgs
  for entryArg in entryArgsRaw:
    if not checkType(entryArg, dict, 'Parse error: each entry arg should be a dict.'):
      print(entry)
      continue
    try:
      argName = entryArg['name']
    except KeyError:
      print('Parse error: "name" is missing from the entry arg.')
      print(entry)
      continue
    if not checkType(argName, str, 'Parse error: "name" of an arg should be a str.'):
      print(entry)
      continue
    argName = argName.strip()
    try:
      argType = entryArg['type']
    except KeyError:
      print('Parse error: "type" is missing from the entry arg.')
      print(entry)
      continue
    if not checkType(argType, str, 'Parse error: "type" of an arg should be a str.'):
      print(entry)
      continue
    argType = argType.strip()
    if not (argType == ArgTypeString or argType == ArgTypeNumber or argType == ArgTypeBoolean):
      print('Parse error: "type" of an arg should be "{ArgTypeString}" or "{ArgTypeNumber}" or "{ArgTypeBoolean}".')
      print(entry)
      continue
    entryArgs.append({
      'name': argName,
      'type': argType
    })
  return entries

if __name__ == '__main__':
  prepareDirectories()
  files = getFileList()
  for f in files:
    o = loadFile(f)
    if not checkType(o, dict, 'Parse error: The root should be a dict.'):
      continue
    try:
      group = o['group']
    except KeyError:
      print('Parse error: "group" is missing from the root.')
      continue
    if not checkType(group, str, 'Parse error: "group" should be a str.'):
      continue
    group = group.strip()
    print('group: ', group)
    try:
      entries = o['entries']
    except KeyError:
      print('Parse error: "entries" is missing from the root.')
      continue
    if not checkType(entries, list, 'Parse error: "entries" should be a list.'):
      continue
    for entry in entries:
      if not checkType(entry, dict, 'Parse error: each entry should be a dict.'):
        print(entry)
        continue
      try:
        entryKey = entry['key']
      except KeyError:
        print('Parse error: "key" is missing from the entry.')
        print(entry)
        continue
      if not checkType(entryKey, str, 'Parse error: "key" of an entry should be a str.'):
        print(entry)
        continue
      entryKey = entryKey.strip()
      try:
        entryType = entry['type']
      except KeyError:
        entryType = EntryTypeUndefined
      if not checkType(entryType, str, 'Parse error: "type" of an entry should be a str.'):
        print(entry)
        continue
      entryArgs = parseEntryArgs(entry)
      if entryType == EntryTypeCounted:
        print('counted')
        # 'zero', 'one', 'other'
        # ==> 'translations_zero', 'translations_one', 'translations_other',
      else:
        print('non-counted')
        # ==> 'translations'
      
      print(entry)
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
